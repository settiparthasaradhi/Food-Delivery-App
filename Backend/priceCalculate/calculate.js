 
const { pool } = require('../services/database');

const calculatePrice = async (req, res, next) => {
  const { zone, organization_id, total_distance, item_type } = req.body;

  const query = {
    text: `
      SELECT base_distance_in_km, km_price, fix_price
      FROM Pricing
      WHERE organization_id = $1 AND zone = $2
    `,
    values: [organization_id, zone],
  };

  const client = await pool.connect();
  try {
    const result = await client.query(query);

    if (result.rows.length === 0) {
      return res.status(400).json({ error: 'Pricing information not found for the specified inputs.' });
    }

    const { base_distance_in_km, km_price, fix_price } = result.rows[0];
    let totalPriceCents = fix_price * 100; 

    const distanceBeyondBase = Math.max(0, total_distance - base_distance_in_km);
    totalPriceCents += distanceBeyondBase * (item_type === 'perishable' ? km_price * 100 : (km_price - 0.5) * 100);

    const totalPriceEuros = totalPriceCents / 100;  

    res.json({ total_price: totalPriceEuros });
  } catch (error) {
    next(error);
  } finally {
    client.release();
  }
};

module.exports = { calculatePrice };
