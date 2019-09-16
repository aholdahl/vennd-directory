const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//pulls all available demographics
router.get('/:id', (req, res) => {
    let queryText = `SELECT * FROM "votes" WHERE "user_id" = $1 AND "business_id" = $2;`
    pool.query(queryText, [req.user.id, req.params.id])
        .then((result) => {
            res.send(result.rows)
        }).catch((error) => {
            console.log(error);
            res.sendStatus(500);
        })
})

//adds a new vote
router.post('/', (req, res) => {
    let queryText = `INSERT INTO "votes" ("user_id", "business_id", "demographic_id", "vote") VALUES ($1, $2, $3, $4);`
    pool.query(queryText, [req.user.id, req.body.business_id, req.body.demographic_id, req.body.vote])
        .then((result) => {
            res.sendStatus(200)
        }).catch((error) => {
            console.log(error);
            res.sendStatus(500);
        })
})

//updates an existing vote
router.put('/', (req, res) => {
    let queryText = `UPDATE "votes" SET "vote" = $1 WHERE "user_id" = $2 AND "business_id" = $3 AND "demographic_id" = $4;`
    pool.query(queryText, [req.body.vote, req.user.id, req.body.business_id, req.body.demographic_id])
        .then((result) => {
            res.sendStatus(200)
        }).catch((error) => {
            console.log(error)
            res.sendStatus(500)
        })
})

module.exports = router;