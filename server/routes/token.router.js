const express = require('express');
require('dotenv').config();
// const pool = require('../modules/pool');
const router = express.Router();
const Abstract = require('abstract-sdk')
const client = new Abstract.Client({
});

console.log('in token router', process.env.ABSTRACT_TOKEN);
// router.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "YOUR-DOMAIN.TLD"); // update to match the domain you will make the request from
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });
router.get('/', (req,res)=>{
    console.log('in GET /api/token', process.env.ABSTRACT_TOKEN);
    const token = process.env.ABSTRACT_TOKEN
    res.send(token)
    
})



module.exports = router;