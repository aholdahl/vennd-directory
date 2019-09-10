// const express = require('express');
// const pool = require('../modules/pool');
// const router = express.Router();

// router.get('/', (req, res) => {
//     let queryText = `SELECT * FROM "favorites" WHERE "user_id" = $1;`
//     pool.query(queryText, [req.user.id])
//         .then((result) => {
//             console.log(result)
//             res.send(result.rows)
//         }).catch((error) => {
//             console.log(error);
//             res.sendStatus(500);
//         })
// })

// module.exports = router;