const Joi = require('joi').extend(require('@joi/date'))
const { isEmpty, isNumeric } = require('../helpers/common')

const schema = {
    detail: Joi.object().keys({
        id: Joi.number().min(1),
    }),
    create: Joi.object().keys({
        name: Joi.string().max(100).regex(/^[a-zA-Z0-9 ]*$/).error(errs => {
            errs.forEach(err => {
                if (err.code === 'string.pattern.base') {
                    err.message = `"${err.local.key}" format is invalid.`
                }
            })

            return errs
        }),
        sku: Joi.string().max(100).regex(/^[a-zA-Z0-9\-]*$/).error(errs => {
            errs.forEach(err => {
                if (err.code === 'string.pattern.base') {
                    err.message = `"${err.local.key}" format is invalid.`
                }
            })

            return errs
        }),
        buy_price: Joi.custom((value, helper) => {
            value = value.replace(/,/g, '')

            if (isEmpty(value) || value === '0') {
                return helper.error('any.required')
            }

            if (!isNumeric(value)) {
                return helper.error("any.invalid")
            }

            return value
        }),
        sell_price: Joi.custom((value, helper) => {
            value = value.replace(/,/g, '')

            if (isEmpty(value) || value === '0') {
                return helper.error('any.required')
            }

            if (!isNumeric(value)) {
                return helper.error("any.invalid")
            }

            return value
        }),
        product_category_id: Joi.string().min(1),
        product_unit_id: Joi.string().min(1),
        note: Joi.string().max(255).allow(null).allow(''),
        created_date: Joi.any().strip(),
        created_user: Joi.any().strip(),
        updated_date: Joi.any().strip(),
        updated_user: Joi.any().strip(),
        stock: Joi.any().strip(),
    }),
    update: Joi.object().keys({
        name: Joi.string().max(100).regex(/^[a-zA-Z0-9 ]*$/).error(errs => {
            errs.forEach(err => {
                if (err.code === 'string.pattern.base') {
                    err.message = `"${err.local.key}" format is invalid.`
                }
            })

            return errs
        }),
        sku: Joi.string().max(100).regex(/^[a-zA-Z0-9\-]*$/).error(errs => {
            errs.forEach(err => {
                if (err.code === 'string.pattern.base') {
                    err.message = `"${err.local.key}" format is invalid.`
                }
            })

            return errs
        }),
        buy_price: Joi.custom((value, helper) => {
            value = value.replace(/,/g, '')

            if (isEmpty(value) || value === '0') {
                return helper.error('any.required')
            }

            if (!isNumeric(value)) {
                return helper.error("any.invalid")
            }

            return value
        }),
        sell_price: Joi.custom((value, helper) => {
            value = value.replace(/,/g, '')

            if (isEmpty(value) || value === '0') {
                return helper.error('any.required')
            }

            if (!isNumeric(value)) {
                return helper.error("any.invalid")
            }

            return value
        }),
        product_category_id: Joi.string().min(1),
        product_unit_id: Joi.string().min(1),
        note: Joi.string().max(255).allow(null).allow(''),
        created_date: Joi.any().strip(),
        created_user: Joi.any().strip(),
        updated_date: Joi.any().strip(),
        updated_user: Joi.any().strip(),
        stock: Joi.any().strip(),
    }),
    delete: Joi.object().keys({
        id: Joi.number().min(1),
    }),
}

module.exports = schema
