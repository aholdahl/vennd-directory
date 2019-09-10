const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res)=>{
    let queryText = `SELECT "business"."id","business"."name","business"."address","business"."city","business"."state_code","business"."zip","business"."image_url", "business"."business_url","business"."google_places_url","business"."verified","business"."warning","business"."category_id","categories"."description" FROM "business" JOIN "categories" ON "business"."category_id" = "categories"."id";`
    pool.query(queryText)
    .then((result)=>{
        console.log(result)
        res.send(result.rows)
    }).catch((error)=>{
        console.log(error);
        res.sendStatus(500);
    })
})

module.exports = router;