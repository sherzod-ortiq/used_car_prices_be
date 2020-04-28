var express = require("express");
var { check, validationResult } = require("express-validator");
var { pool } = require("../config");
var router =  express.Router();

router.get("/",[
	check("manufacturer_id").isLength({ min: 1 }).isInt().escape(),
  check("model_name").isLength({ min: 1 }).escape()
], (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

	pool.query(`SELECT models.name FROM manufacturers, models WHERE (manufacturers.id = ${req.query.manufacturer_id} AND models.name LIKE '%${req.query.model_name}%')`, (error, results) => {
		if(error){
			throw error
		}
		res.status(200).json(results.rows);
	});
});

module.exports = router;