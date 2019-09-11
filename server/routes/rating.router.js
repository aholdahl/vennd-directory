const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.post('/', (req, res) => {
    // console.log('in ratingRouter:', req.user.id, req.body.business_id, req.body.rating)
    let queryText = `INSERT INTO "ratings" ("user_id", "business_id", "user_rating") VALUES ($1, $2, $3);`
    pool.query(queryText, [req.user.id, req.body.business_id, req.body.rating])
        .then((result) => {
            res.sendStatus(200)
        }).catch((error) => {
            console.log(error);
            res.sendStatus(500);
        })
})

// router.put('/:id', (req, res) => {
//     let queryText = `;`
//     pool.query(queryText, [req.user.id, ])
//         .then((result) => {
//             res.sendStatus(200)
//         }).catch((error) => {
//             console.log(error);
//             res.sendStatus(500);
//         })
// })

router.get('/:id', (req, res) => {
    console.log(req.params.id)
    let queryText = `SELECT * FROM "rating" WHERE "user_id" = $1 AND "business_id" = $2;`
    pool.query(queryText, [req.user.id, req.params.id])
        .then((result) => {
            res.send(result.rows)
        }).catch((error) => {
            console.log(error);
            res.sendStatus(500);
        })
})

module.exports = router;