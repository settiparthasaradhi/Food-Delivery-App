// insert_data.js
//run this app starting to add the data in the tables onle ones
 
const { pool } = require('./database'); 
async function insertData() {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // Sample data for 'Organization' table
    await client.query(`INSERT INTO Organization (id, name) VALUES
      ('001', 'Delicious Eats'),
      ('002', 'Quick Bites'),
      ('003', 'Gourmet Meals')`);

    // Sample data for 'Item' table
    await client.query(`INSERT INTO Item (id, type, description) VALUES
      ('101', 'perishable', 'Fresh Salad'),
      ('102', 'perishable', 'Hot Pizza'),
      ('103', 'non-perishable', 'Canned Soup'),
      ('104', 'non-perishable', 'Dried Nuts')`);

    // Sample data for 'Pricing' table
    await client.query(`INSERT INTO Pricing (organization_id, item_id, zone, base_distance_in_km, km_price, fix_price) VALUES
      ('001', '101', 'central', 5, 1.5, 10),
      ('001', '103', 'central', 5, 1, 10),
      ('002', '102', 'suburban', 5, 1.5, 12),
      ('002', '104', 'suburban', 5, 1, 12),
      ('003', '101', 'rural', 5, 2, 15),
      ('003', '103', 'rural', 5, 1.5, 15)`);

    await client.query('COMMIT');
    console.log('Data inserted successfully.');
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error inserting data:', error);
  } finally {
    client.release();
    await pool.end();
  }
}
insertData();
