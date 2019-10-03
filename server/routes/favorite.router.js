const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
// const { rejectUnauthenticated } = require('../modules/authentication-middleware');

//gets all favorites for the active user from the database
router.get('/', (req, res) => {
    let queryText = `SELECT "business_id" FROM "favorites" WHERE "user_id" = $1;`
    pool.query(queryText, [req.user.id])
        .then((result) => {
            res.send(result.rows)
        }).catch((error) => {
            console.log(error);
            res.sendStatus(500);
        })
})

//adds new favorite
router.post('/:id', (req, res) => {
    let queryText = `INSERT INTO "favorites" ("user_id", "business_id") VALUES ($1, $2);`
    pool.query(queryText, [req.user.id, req.params.id])
        .then((result) => {
            res.sendStatus(200)
        }).catch((error) => {
            console.log(error);
            res.sendStatus(500);
        })
})

//removes existing favorite
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