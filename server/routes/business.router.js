const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//gets all available businesses from the database
router.get('/', (req, res) => {
    let queryText = `SELECT "business"."id", "business"."name", "business"."address","business"."city","business"."state_code", "business"."zip", "business"."image_url", "business"."verified", "business"."warning", "business"."category_id", "categories"."description", array_agg("vote") AS "votes", round(avg("ratings"."user_rating"), 0) AS "avg_rating" FROM "business" JOIN "categories" ON "business"."category_id" = "categories"."id" FULL OUTER JOIN "votes" ON "business"."id" = "votes"."business_id" FULL OUTER JOIN "favorites" ON "business"."id" = "favorites"."business_id" FULL OUTER JOIN "ratings" ON "business"."id" = "ratings"."business_id" GROUP BY "business"."id", "categories"."id" ORDER BY "name" ASC;`
    pool.query(queryText)
        .then((result) => {
            res.send(result.rows)
        }).catch((error) => {
            console.log(error);
            res.sendStatus(500);
        })
})

module.exports = router;