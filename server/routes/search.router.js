const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//pulls all matching businesses
router.get('/name/:searchInput', (req, res) => {
    let search = `%${req.params.searchInput}%`
    let queryText = `SELECT "business"."id", "business"."name", "business"."address","business"."city","business"."state_code", "business"."zip", "business"."image_url", "business"."verified", "business"."warning", "business"."category_id", "categories"."description", array_agg("vote") AS "votes" FROM "business" JOIN "categories" ON "business"."category_id" = "categories"."id" FULL OUTER JOIN "votes" ON "business"."id" = "votes"."business_id" FULL OUTER JOIN "favorites" ON "business"."id" = "favorites"."business_id" WHERE "business"."name" ILIKE $1 GROUP BY "business"."id", "categories"."id";`
    pool.query(queryText, [search])
        .then((result) => {
            res.send(result.rows)
        }).catch((error) => {
            console.log(error);
            res.sendStatus(500);
        })
})

//pulls all matching businesses
router.get('/category/:id', (req, res) => {
    let queryText = `SELECT "business"."id", "business"."name", "business"."address","business"."city","business"."state_code", "business"."zip", "business"."image_url", "business"."verified", "business"."warning", "business"."category_id", "categories"."description", array_agg("vote") AS "votes" FROM "business" JOIN "categories" ON "business"."category_id" = "categories"."id" FULL OUTER JOIN "votes" ON "business"."id" = "votes"."business_id" FULL OUTER JOIN "favorites" ON "business"."id" = "favorites"."business_id" WHERE "business"."category_id" = $1 GROUP BY "business"."id", "categories"."id";`
    pool.query(queryText, [req.params.id])
        .then((result) => {
            res.send(result.rows)
        }).catch((error) => {
            console.log(error);
            res.sendStatus(500);
        })
})

//pulls all matching businesses
router.get('/demographic/:id', (req, res) => {
    let queryText = `SELECT "business"."id", "business"."name", "business"."address","business"."city","business"."state_code", "business"."zip", "business"."image_url", "business"."verified", "business"."warning", "business"."category_id", "categories"."description", array_agg("vote") AS "votes" FROM "business" JOIN "categories" ON "business"."category_id" = "categories"."id" FULL OUTER JOIN "votes" ON "business"."id" = "votes"."business_id" FULL OUTER JOIN "favorites" ON "business"."id" = "favorites"."business_id" WHERE "votes"."demographic_id" = $1 AND "votes"."vote" ILIKE 'up' GROUP BY "business"."id", "categories"."id";`
    pool.query(queryText, [req.params.id])
        .then((result) => {
            res.send(result.rows)
        }).catch((error) => {
            console.log(error);
            res.sendStatus(500);
        })
})

module.exports = router;