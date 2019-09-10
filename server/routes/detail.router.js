const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// router.put('/', (req, res) => {
//     console.log(req.body)
//     let queryText = `UPDATE "business" SET $1 = $2 WHERE "id" = $3`
//     pool.query(queryText, [req.body.property, req.body.newState, req.body.id])
//         .then((result) => {
//             console.log(result)
//             res.send(result.rows)
//         }).catch((error) => {
//             console.log(error);
//             res.sendStatus(500);
//         })
// })

// router.post('/:id', (req, res) => {
//     let queryText = `INSERT INTO "favorites" ("user_id","business_id") VALUES ($1, $2);`
//     pool.query(queryText, [req.user.id, req.body.id])
//         .then((result) => {
//             res.sendStatus(200)
//         }).catch((error) => {
//             console.log(error);
//             res.sendStatus(500);
//         })
// })

// router.delete('/:id', (req, res)=>{
//     let queryText = `DELETE FROM "favorites" WHERE "user_id" = $1 AND "business_id" = $1;`
//     pool.query(queryText, [req.user.id, req.body.id])
//     .then((result)=>{
//         res.sendStatus(200)
//     }).catch((error)=>{
//         console.log(error);
//         res.sendStatus(500);
//     })
// })

router.get('/:id', (req, res)=>{
    console.log(req.params.id)
    let queryText = `SELECT "business"."id","business"."name","business"."address","business"."city","business"."state_code","business"."zip","business"."image_url", "business"."business_url","business"."google_places_url","business"."verified","business"."warning","business"."category_id","categories"."description" FROM "business" JOIN "categories" ON "business"."category_id" = "categories"."id" WHERE "business"."id" = $1;`
    pool.query(queryText, [req.params.id])
    .then((result)=>{
        res.send(result.rows)
    }).catch((error)=>{
        // console.log(error);
        res.sendStatus(500)
    })
})

module.exports = router;