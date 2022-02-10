const express = require('express');
const { body, validationResult } = require('express-validator');
const req = require('express/lib/request');
const res = require('express/lib/response');
const router = express.Router();

const connection = require('../config/database');

/**
 * Index Posts
 */
router.get('/', function (req, res) {
    // query
    connection.query('SELECT * FROM posts ORDER BY id DESC', function (err, rows) {
        if (err) {
            return res.status(500).json({
                status: false,
                message: 'Internal Server Error',
            })
        } else {
            return res.status(200).json({
                status: true,
                message: 'List Data Posts',
                data: rows
            })
        }
    })
});

/**
 * Store Posts
 */
router.post('/store', [
    body('title').notEmpty(),
    body('content').notEmpty()
], (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({
            errors: errors.array()
        })
    }

    let formData = {
        title: req.body.title,
        content: req.body.content
    }

    connection.query('INSERT INTO posts SET ?', formData, function (err, rows) {
        if (err) {
            return res.status(500).json({
                status: false,
                message: 'Internal Server Error',
            })
        } else {
            return res.status(201).json({
                status: true,
                message: 'Insert Data Successfully',
                data: rows[0]
            })
        }
    })

});

/**
 * Show Post
 */
router.get('/:id', function (req, res) {
    let id = req.params.id;

    connection.query(`SELECT * FROM posts WHERE id=${id}`, function (err, rows) {
        if (err) {
            return res.status(500).json({
                status: false,
                message: 'Internal Server Error',
            })
        } else {
            // if post not found
            if (rows.length <= 0) {
                return res.status(404).json({
                    status: false,
                    message: 'Data Post Not Found!'
                })
            }
            // if post found
            else {
                return res.status(200).json({
                    status: true,
                    message: 'Detail Data Post',
                    data: rows[0]
                })
            }
        }
    })
})

/**
 * Update Post
 */
router.patch('/update/:id', [
    // validation
    body('title').notEmpty(),
    body('content').notEmpty()
], (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({
            errors: errors.array()
        })
    }

    let id = req.params.id

    let formData = {
        title: req.body.title,
        content: req.body.content
    }

    connection.query(`UPDATE posts SET ? WHERE id = ${id}`, formData, function (err, rows) {
        if (err) {
            return res.status(500).json({
                status: false,
                message: 'Internal Server Error'
            })
        } else {
            return res.status(200).json({
                status: true,
                message: 'Update Data Successfully'
            })
        }
    })


})

/**
 * Delete Post
 */
router.delete('/delete/:id', function (req, res) {
    let id = req.params.id;

    connection.query(`DELETE FROM posts WHERE id=${id}`, function (err, rows) {
        if (err) {
            return res.status(500).json({
                status: false,
                message: 'Internal Server Error'
            })
        } else {
            return res.status(200).json({
                status: true,
                message: 'Delete Data Successfully'
            })
        }
    })
})

module.exports = router;