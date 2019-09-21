const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//gets the vote count by demographic for the current business from the database
router.get('/:id', (req, res) => {
    let queryText = `SELECT "demographic_id", "vote", count("vote") FROM "votes" WHERE "business_id" = $1 GROUP BY "demographic_id", "vote";`
    pool.query(queryText, [req.params.id])
        .then((result) => {
            res.send(result.rows)
        }).catch((error) => {
            console.log(error);
            res.sendStatus(500);
        })
})

module.exports = router;