const express = require('express');
const router = express.Router();
const db = require('../../db/connection');
const inputCheck = require('../../utils/inputCheck');


// Create a role record
router.post('/role', ({ body }, res) => {
    // Data validation
    const errors = inputCheck(body, 'employee_id', 'role_id');
    if (errors) {
      res.status(400).json({ error: errors });
      return;
    }
  
    const sql = `INSERT INTO role (employee_id, role_id) VALUES (?,?)`;
    const params = [body.employee_id, body.role_id];
  
    db.query(sql, params, (err, result) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({
        message: 'success',
        data: body,
        changes: result.affectedRows
      });
    });
  });

module.exports = router;