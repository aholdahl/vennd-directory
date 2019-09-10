const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//currently written to pull the clicked business and merge with category table to get the category name
//could rewrite to loop through categoryReducer to find the match for rendering instead
router.get('/:id', (req, res)=>{
    console.log(req.params.id)
    let queryText = `SELECT "business"."id","business"."name","business"."address","business"."city","business"."state_code","business"."zip","business"."image_url","business"."business_url","business"."google_places_url","business"."verified","business"."warning","business"."category_id","categories"."description" FROM "business" JOIN "categories" ON "business"."category_id" = "categories"."id" WHERE "business"."id" = $1;`
    pool.query(queryText, [req.params.id])
    .then((result)=>{
        res.send(result.rows)
    }).catch((error)=>{
        // console.log(error);
        res.sendStatus(500)
    })
})

//adds new business to table
router.post('/', (req, res)=>{
    let business = req.body;
    console.log(business);
    let queryText = `INSERT INTO "business"("name","category_id","address","city","state_code","zip","image_url","business_url","google_places_url","verified","warning")VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11);`
    pool.query(queryText, [business.name, business.selectedCategoryId, business.address, business.city, business.state_code, business.zip, business.image_url, business.business_url, business.google_places_url, false, false])
    .then((result)=>{
        res.sendStatus(200)
    }).catch((error)=>{
        console.log(error)
        res.sendStatus(500);
    })
})

module.exports = router;