const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//gets list of all users from the database
router.get('/', (req, res) => {
    const queryText = 'SELECT "user"."id", "user"."username", "user"."access_id", "access_type"."clearance" FROM "user" JOIN "access_type" ON "user"."access_id" = "access_type"."id";'
    pool.query(queryText)
        .then((result) => {
            res.send(result.rows)
        }).catch((error) => {
            console.log(error);
            res.sendStatus(500);
        })
})

//toggles access type of applicable user
router.put('/', (req, res) => {
    const queryText = `UPDATE "user" SET "access_id" = $1 WHERE "id" = $2;`
    pool.query(queryText, [req.body.access_id, req.body.id])
        .then((result) => {
            res.sendStatus(200)
        }).catch((error) => {
            console.log(error);
            res.sendStatus(500);
        })
})

//deletes selected user
router.delete('/:id', (req, res) => {
    const queryText = `DELETE FROM "user" WHERE "id" = $1;`
    pool.query(queryText, [req.params.id])
        .then((result) => {
            res.sendStatus(200)
        }).catch((error) => {
            console.log(error);
            res.sendStatus(500);
        })
})

module.exports = router;