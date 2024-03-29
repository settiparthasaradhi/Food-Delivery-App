const {pool}=require('../services/database');
const fs = require('fs');
const createTablesSQL = fs.readFileSync('./create_table.sql').toString();
async function createTables() {
  const client = await pool.connect();
    try {
      await client.query('BEGIN');
      await client.query(createTablesSQL);
      await client.query('COMMIT');
      
    } catch (error) {
      await client.query('ROLLBACK');
      console.error('Error creating tables:', error);
    } 
    
     
  }
  createTables();