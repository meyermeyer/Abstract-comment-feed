const express = require('express');
require('dotenv').config();
// const pool = require('../modules/pool');
const router = express.Router();
const Abstract = require('abstract-sdk')
const client = new Abstract.Client({
});

// console.log('in comments router', process.env.ABSTRACT_TOKEN, client);

// router.get('/', async (req,res)=>{
     
// })



module.exports = router;