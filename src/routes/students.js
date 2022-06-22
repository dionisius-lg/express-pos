const router = require('express').Router()
const _ = require('lodash')
const verify = require('./../configs/verify')
const studentsModel = require('./../models/students')
const studentsSchema = require('./../schemas/students')
const { badRequest } = require('./../helpers/response')
const { validator } = require('./../helpers/general')
const pagination = require('./../helpers/pagination')

router.get('/', verify.isLogin, async (req, res, next) => {
    const { query, params } = req
    const limitData = 20

    const conditions = {
        ...query,
        limit: limitData
    }

    const getData = {
        students: await studentsModel.getAll(conditions)
    }

    let asd = pagination({
        page: query.page || 1,
        total: getData.students.total_data,
        limit: limitData,
        paging: getData.students.paging || {}
    })

    return res.render('adminLayout', {
        pageTitle: 'Students',
        template: 'students/index.ejs',
        ...getData
    })
})

router.post('/create', async (req, res, next) => {
    const { body } = req
    const validation = validator(studentsSchema.create, body)

    if (validation.error) {
        return res.json(badRequest({
            error: validation.error
        }))
    }

    const result = await studentsModel.insert(body)

    if (result.success) {
        req.flash('success', 'Data has been saved')
    }

    return res.json(result)
})

router.get('/detail/:id', verify.isLogin, async (req, res, next) => {
    const { params } = req
    const result = await studentsModel.getDetail({
        id: params.id
    })

    return res.json(result)
})

router.post('/update/:id', async (req, res, next) => {
    const { body, params } = req
    const validation = validator(studentsSchema.update, body)

    if (validation.error) {
        return res.json(badRequest({
            error: validation.error
        }))
    }

    const result = await studentsModel.update(body, {
        id: params.id
    })

    if (result.success) {
        req.flash('success', 'Data has been updated')
    }

    return res.json(result)
})

router.get('/delete/:id', async (req, res, next) => {
    const { params } = req
    const result = await studentsModel.delete({
        id: params.id
    })

    if (result.success) {
        req.flash('success', 'Data has been deleted')
    }

    return res.json(result)
})

module.exports = router
