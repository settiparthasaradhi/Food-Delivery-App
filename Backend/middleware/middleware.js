const middleware = (req, res, next) => {
    const { zone, organization_id, total_distance, item_type } = req.body;
    if (!zone || !organization_id || !total_distance || !item_type) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }
  
    if (typeof total_distance !== 'number' || total_distance <= 0) {
      return res.status(400).json({ error: 'Invalid total_distance value' });
    }
  
    if (!['perishable', 'non-perishable'].includes(item_type)) {
      return res.status(400).json({ error: 'Invalid item_type value' });
    }
  
    next();
  };
module.exports=middleware  