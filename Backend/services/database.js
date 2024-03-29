require("dotenv").config()
const {Pool} =require('pg')

const pool=new Pool({
    connectionString:process.env.Postgre_url
})
module.exports = {pool};
 
 
