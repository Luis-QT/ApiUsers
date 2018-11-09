const express = require('express');
const router = express.Router();

const mysqlConnection  = require('../database.js');

// GET all Users
router.get('/users', (req, res) => {
  mysqlConnection.query('SELECT * FROM users', (err, rows, fields) => {
    if(!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });  
});

// GET An User
router.get('/users/:id', (req, res) => {
  const { id } = req.params; 
  mysqlConnection.query('SELECT * FROM users WHERE id = ?', [id], (err, rows, fields) => {
    if (!err) {
      res.json(rows[0]);
    } else {
      console.log(err);
    }
  });
});

// DELETE An User
router.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  mysqlConnection.query('DELETE FROM users WHERE id = ?', [id], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'User Deleted'});
    } else {
      console.log(err);
    }
  });
});

// INSERT An Employee
router.post('/users', (req, res) => {
  const {id, name, salary} = req.body;
  console.log(id, name, salary);
  const query = `
    SET @id = ?;
    SET @name = ?;
    SET @lastName = ?;
    SET @state = ?;
    SET @instEmail = ?;
    SET @userType_id = ?;
    SET @school_id = ?;
    CALL userAddOrEdit(@id, @name, @salary,@state, @instEmail, @userType_id, @school_id);
  `;
  mysqlConnection.query(query, [id, name, salary], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'User Saved'});
    } else {
      console.log(err);
    }
  });

});

router.put('/users/:id', (req, res) => {
  const { name, salary } = req.body;
  const { id } = req.params;
  const query = `
    SET @id = ?;
    SET @name = ?;
    SET @lastName = ?;
    SET @state = ?;
    SET @instEmail = ?;
    SET @userType_id = ?;
    SET @school_id = ?;
    CALL userAddOrEdit(@id, @name, @salary,@state, @instEmail, @userType_id, @school_id);
  `;
  mysqlConnection.query(query, [id, name, salary], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'User Updated'});
    } else {
      console.log(err);
    }
  });
});

module.exports = router;
