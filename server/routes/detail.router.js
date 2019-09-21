const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//gets the selected business details from the database
router.get('/:id', (req, res) => {
    let queryText = `SELECT "business"."id","business"."name","business"."address","business"."city","business"."state_code","business"."zip","business"."image_url","business"."business_url","business"."google_places_url","business"."verified","business"."warning","business"."category_id","categories"."description", round(avg("ratings"."user_rating"), 0) AS "avg_rating" FROM "business" JOIN "categories" ON "business"."category_id" = "categories"."id" FULL OUTER JOIN "ratings" ON "business"."id" = "ratings"."business_id" WHERE "business"."id" = $1 GROUP BY "business"."id", "categories"."id";`
    pool.query(queryText, [req.params.id])
        .then((result) => {
            res.send(result.rows)
        }).catch((error) => {
            console.log(error);
            res.sendStatus(500)
        })
})

//adds new business to table
router.post('/', (req, res) => {
    let business = req.body;
    let queryText = `INSERT INTO "business"("name","category_id","address","city","state_code","zip","image_url","business_url","google_places_url","verified","warning")VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11);`
    pool.query(queryText, [business.name, business.selectedCategoryId, business.address, business.city, business.state_code, business.zip, business.image_url, business.business_url, business.google_places_url, false, false])
        .then((result) => {
            res.sendStatus(200)
        }).catch((error) => {
            console.log(error)
            res.sendStatus(500);
        })
})

//updates existing business details to table
router.put('/', (req, res) => {
    let business = req.body;
    let queryText = `UPDATE "business" SET "name"=$1,"category_id"=$2,"address"=$3,"city"=$4,"state_code"=$5,"zip"=$6,"image_url"=$7,"business_url"=$8,"google_places_url"=$9,"verified"=$10,"warning"=$11 WHERE "id" = $12;`
    pool.query(queryText, [business.name, business.category_id, business.address, business.city, business.state_code, business.zip, business.image_url, business.business_url, business.google_places_url, business.verified, business.warning, business.id])
        .then((result) => {
            res.sendStatus(200)
        }).catch((error) => {
            console.log(error)
            res.sendStatus(500);
        })
})

//deletes the current business from the table
router.delete('/:id', (req, res) => {
    console.log(req.params.id)
    let queryText = `DELETE FROM "business" WHERE "id" = $1;`
    pool.query(queryText, [req.params.id])
        .then((result) => {
            res.sendStatus(200)
        }).catch((error) => {
            console.log(error)
            res.sendStatus(500)
        })
})

module.exports = router;