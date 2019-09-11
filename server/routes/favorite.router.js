const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/:id', (req, res) => {
    let queryText = `SELECT count(id) FROM "favorites" WHERE "user_id" = $1 AND "business_id" = $2;`
    pool.query(queryText, [req.user.id, req.params.id])
        .then((result) => {
            res.send(result.rows)
        }).catch((error) => {
            console.log(error);
            res.sendStatus(500);
        })
})

router.post('/:id', (req, res)=>{
    let queryText = `INSERT INTO "favorites" ("user_id", "business_id") VALUES ($1, $2);`
    pool.query(queryText, [req.user.id, req.params.id])
    .then((result)=>{
        res.sendStatus(200)
    }).catch((error) => {
        console.log(error);
        res.sendStatus(500);
    })
})

router.delete('/:id', (req, res) => {
    let queryText = `DELETE FROM "favorites" WHERE "user_id" = $1 AND "business_id" = $2;`
    pool.query(queryText, [req.user.id, req.params.id])
        .then((result) => {
            res.sendStatus(200)
        }).catch((error) => {
            console.log(error);
            res.sendStatus(500);
        })
})

module.exports = router;