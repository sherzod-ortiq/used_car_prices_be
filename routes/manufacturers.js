var express = require("express");
var { check, validationResult } = require("express-validator");
var { pool } = require("../config");
var router =  express.Router();

router.get("/",[
	check("manufacturer_name").isLength({ min: 1 }).escape()
], (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

	pool.query(`SELECT id, name FROM manufacturers WHERE name LIKE '%${req.query.manufacturer_name}%'`, (error, results) => {
		if(error){
			throw error
		}
		res.status(200).json(results.rows);
	});

});

module.exports = router;