const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//checks each search query key for truthy value and sends the applicable query text to the database
//currently can only search successfully by one demographic at a time.
router.get('/', (req, res) => {
    console.log(req.query)
    let queryStart = `SELECT "business"."id", "business"."name", "business"."address","business"."city","business"."state_code", "business"."zip", "business"."image_url", "business"."verified", "business"."warning", "business"."category_id", "categories"."description", array_agg("vote") AS "votes", round(avg("ratings"."user_rating"), 0) AS "avg_rating" FROM "business" JOIN "categories" ON "business"."category_id" = "categories"."id" FULL OUTER JOIN "votes" ON "business"."id" = "votes"."business_id" FULL OUTER JOIN "favorites" ON "business"."id" = "favorites"."business_id" FULL OUTER JOIN "ratings" ON "business"."id" = "ratings"."business_id"`
    let queryEnd = ` GROUP BY "business"."id", "categories"."id";`

    let inputQuery = {
        text: ` "business"."name" ILIKE $1`,
        value: (req.query.searchInput !== '' ? `%${req.query.searchInput}%` : `%%`)
    }
    let categoryQuery = {
        text: ` "business"."category_id" = $2`,
        value: (Number(req.query.selectedCategoryId))
    }
    // let demoArray = [(req.query.lgbtqiaap == 'true' && 1), (req.query.poc == 'true' && 2), (req.query.accessible == 'true' && 3)]
    // let demoFilter = (demoArray.filter((id) => {
    //     return id != false
    // }))
    // let demoQuery = {
    //     text: ` "votes"."demographic_id" IN ($3) AND "votes"."vote" ILIKE 'up'`,
    //     value: (demoFilter !== [] && demoFilter.toString())
    // }
    let queerQuery = {
        text: ` "votes"."demographic_id" = 1 AND "votes"."vote" ILIKE 'up'`,
        value: (req.query.lgbtqiaap == 'true')
    }
    let pocQuery = {
        text: ` "votes"."demographic_id" = 2 AND "votes"."vote" ILIKE 'up'`,
        value: (req.query.poc == 'true')
    }
    let accessQuery = {
        text: ` "votes"."demographic_id" = 3 AND "votes"."vote" ILIKE 'up'`,
        value: (req.query.accessible == 'true')
    }
    let queryPieces = [inputQuery, categoryQuery, queerQuery, pocQuery, accessQuery];
    // let queryPieces = [inputQuery, demoQuery, categoryQuery];
    let queryText = () => {
        let myQuery = ``
        for (query of queryPieces) {
            if (myQuery === `` && query.value) {
                myQuery += ` WHERE` + query.text
            } else if (query.value) {
                myQuery = myQuery + ` AND` + query.text
            }
        }
        return myQuery;
    }
    let fullQuery = queryStart + queryText() + queryEnd;
    let queryParams = () => {
        let params = (Number(req.query.selectedCategoryId) ?
            [(inputQuery.value || '%%'), Number(req.query.selectedCategoryId)]
            : [(inputQuery.value || '%%')]
        );
        return params
    }
    // let queryParams = () => {
    //     let params = (Number(req.query.selectedCategoryId) ?
    //         [(inputQuery.value || '%%'), Number(req.query.selectedCategoryId)]
    //         : [(inputQuery.value || '%%')]
    //     );
    //     if (demoQuery.value) {
    //         params.push(demoQuery.value)
    //     }
    //     return params
    // }
    console.log(fullQuery, queryParams())
    pool.query(fullQuery, queryParams())
        .then((result) => {
            res.send(result.rows)
        }).catch((error) => {
            console.log(error);
            res.sendStatus(500);
        })
})

module.exports = router;
