const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//pulls all matching businesses
router.get('/:searchInput', (req, res) => {
    let search = `%${req.params.searchInput}%`
    console.log(search)
    let queryText = `SELECT * FROM "business" WHERE "name" ILIKE $1;`
    pool.query(queryText, [search])
        .then((result) => {
            res.send(result.rows)
        }).catch((error) => {
            console.log(error);
            res.sendStatus(500);
        })
})

module.exports = router;