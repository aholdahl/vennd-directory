const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//pulls all available categories
router.get('/', (req, res) => {
    let queryText = `SELECT * FROM "categories" ORDER BY "description";`
    pool.query(queryText)
        .then((result) => {
            res.send(result.rows)
        }).catch((error) => {
            console.log(error);
            res.sendStatus(500);
        })
})

module.exports = router;