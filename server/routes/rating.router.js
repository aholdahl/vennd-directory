const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//pulls rating for the active user and business ID
router.get('/:id', (req, res) => {
    console.log(req.params.id)
    let queryText = `SELECT * FROM "ratings" WHERE "user_id" = $1 AND "business_id" = $2;`
    pool.query(queryText, [req.user.id, req.params.id])
        .then((result) => {
            res.send(result.rows)
        }).catch((error) => {
            console.log(error);
            res.sendStatus(500);
        })
})

//adds new rating
router.post('/', (req, res) => {
    let queryText = `INSERT INTO "ratings" ("user_id", "business_id", "user_rating") VALUES ($1, $2, $3);`
    pool.query(queryText, [req.user.id, req.body.business_id, req.body.user_rating])
        .then((result) => {
            res.sendStatus(200)
        }).catch((error) => {
            console.log(error);
            res.sendStatus(500);
        })
})

//updates existing rating
router.put('/', (req, res) => {
    let queryText = `UPDATE "ratings" SET "user_rating" = $1 WHERE "user_id" = $2 AND "business_id" = $3;`
    pool.query(queryText, [req.body.user_rating, req.user.id, req.body.business_id])
        .then((result) => {
            res.sendStatus(200)
        }).catch((error) => {
            console.log(error);
            res.sendStatus(500);
        })
})

module.exports = router;