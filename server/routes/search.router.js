const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// //pulls all businesses that match the search input
// router.get('/name/:searchInput', (req, res) => {
//     let search = `%${req.params.searchInput}%`
//     let queryText = `SELECT "business"."id", "business"."name", "business"."address","business"."city","business"."state_code", "business"."zip", "business"."image_url", "business"."verified", "business"."warning", "business"."category_id", "categories"."description", array_agg("vote") AS "votes", round(avg("ratings"."user_rating"), 0) AS "avg_rating" FROM "business" JOIN "categories" ON "business"."category_id" = "categories"."id" FULL OUTER JOIN "votes" ON "business"."id" = "votes"."business_id" FULL OUTER JOIN "favorites" ON "business"."id" = "favorites"."business_id" FULL OUTER JOIN "ratings" ON "business"."id" = "ratings"."business_id" WHERE "business"."name" ILIKE $1 GROUP BY "business"."id", "categories"."id";`
//     pool.query(queryText, [search])
//         .then((result) => {
//             res.send(result.rows)
//         }).catch((error) => {
//             console.log(error);
//             res.sendStatus(500);
//         })
// })

// //pulls all businesses that match the selected category
// router.get('/category/:id', (req, res) => {
//     let queryText = `SELECT "business"."id", "business"."name", "business"."address","business"."city","business"."state_code", "business"."zip", "business"."image_url", "business"."verified", "business"."warning", "business"."category_id", "categories"."description", array_agg("vote") AS "votes", round(avg("ratings"."user_rating"), 0) AS "avg_rating" FROM "business" JOIN "categories" ON "business"."category_id" = "categories"."id" FULL OUTER JOIN "votes" ON "business"."id" = "votes"."business_id" FULL OUTER JOIN "favorites" ON "business"."id" = "favorites"."business_id" FULL OUTER JOIN "ratings" ON "business"."id" = "ratings"."business_id" WHERE "business"."category_id" = $1 GROUP BY "business"."id", "categories"."id";`
//     pool.query(queryText, [req.params.id])
//         .then((result) => {
//             res.send(result.rows)
//         }).catch((error) => {
//             console.log(error);
//             res.sendStatus(500);
//         })
// })

// //pulls all businesses with at least one upvote for the selected demographic
// router.get('/demographic/:id', (req, res) => {
//     let queryText = `SELECT "business"."id", "business"."name", "business"."address","business"."city","business"."state_code", "business"."zip", "business"."image_url", "business"."verified", "business"."warning", "business"."category_id", "categories"."description", array_agg("vote") AS "votes", round(avg("ratings"."user_rating"), 0) AS "avg_rating" FROM "business" JOIN "categories" ON "business"."category_id" = "categories"."id" FULL OUTER JOIN "votes" ON "business"."id" = "votes"."business_id" FULL OUTER JOIN "favorites" ON "business"."id" = "favorites"."business_id" FULL OUTER JOIN "ratings" ON "business"."id" = "ratings"."business_id" WHERE "votes"."demographic_id" = $1 AND "votes"."vote" ILIKE 'up' GROUP BY "business"."id", "categories"."id";`
//     pool.query(queryText, [req.params.id])
//         .then((result) => {
//             res.send(result.rows)
//         }).catch((error) => {
//             console.log(error);
//             res.sendStatus(500);
//         })
// })

router.get('/', (req, res)=>{
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
    // let demoQuery = {
    //     text: ` "votes"."demographic_id" = $1 AND "votes"."vote" ILIKE 'up'`,
    //     value: demoArray.filter((id)=>{
    //         return id != false
    //     })
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
    // let queryPieces = [inputQuery, categoryQuery, demoQuery];
    let queryText = ()=>{
        let myQuery = ``
        for(query of queryPieces){
            if(myQuery === `` && query.value){
                myQuery+= ` WHERE` + query.text
            } else if(query.value){
                myQuery = myQuery +` AND` + query.text 
            }
        }
        return myQuery;
    }
    let fullQuery = queryStart+queryText()+queryEnd;
    let queryParams = ()=>{
        let params = (Number(req.query.selectedCategoryId) ? 
        [(inputQuery.value || '%%'), Number(req.query.selectedCategoryId)] 
        : [inputQuery.value || '%%']);
        // if(demoQuery.value !== []){
        //     params.push(demoQuery.value)
        // }
        return params
    }
    pool.query(fullQuery, queryParams())
            .then((result) => {
            res.send(result.rows)
        }).catch((error) => {
            console.log(error);
            res.sendStatus(500);
        })
})

module.exports = router;

// const express = require('express');
// // const encryptLib = require('../modules/encryption');
// const pool = require('../modules/pool');
// // const userStrategy = require('../strategies/user.strategy');

// const router = express.Router();

// router.get('/:searchInput', (req, res) => {
//     console.log(req.params.searchInput)
// });

// module.exports = router;
