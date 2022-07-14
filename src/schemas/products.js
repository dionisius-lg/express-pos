const Joi = require('joi').extend(require('@joi/date'))

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
        sku: Joi.string().max(100).regex(/^[a-zA-Z0-9]*$/).error(errs => {
            errs.forEach(err => {
                if (err.code === 'string.pattern.base') {
                    err.message = `"${err.local.key}" format is invalid.`
                }
            })

            return errs
        }),
        buy_price: Joi.number().min(1),
        description: Joi.string().max(255).allow(null).allow(''),
        product_category_id: Joi.string().min(1),
        product_unit_id: Joi.string().min(1),
        is_active: Joi.string().valid('0','1').allow(null).allow(''),
        created_date: Joi.any().strip(),
        // created_user_id: Joi.any().strip(),
        created_user: Joi.any().strip(),
        updated_date: Joi.any().strip(),
        // updated_user_id: Joi.number().min(1).allow(null).allow(''),
        updated_user: Joi.any().strip(),
        qty: Joi.any().strip()
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
        sku: Joi.string().max(100).regex(/^[a-zA-Z0-9]*$/).error(errs => {
            errs.forEach(err => {
                if (err.code === 'string.pattern.base') {
                    err.message = `"${err.local.key}" format is invalid.`
                }
            })

            return errs
        }),
        buy_price: Joi.number().min(1),
        description: Joi.string().max(255).allow(null).allow(''),
        product_category_id: Joi.string().min(1),
        product_unit_id: Joi.string().min(1),
        is_active: Joi.string().valid('0','1').allow(null).allow(''),
        created_date: Joi.any().strip(),
        // created_user_id: Joi.any().strip(),
        created_user: Joi.any().strip(),
        updated_date: Joi.any().strip(),
        // updated_user_id: Joi.number().min(1).allow(null).allow(''),
        updated_user: Joi.any().strip(),
        qty: Joi.any().strip()
    }),
    delete: Joi.object().keys({
        id: Joi.number().min(1),
    }),
}

module.exports = schema
