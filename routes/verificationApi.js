const express = require('express');
const router = express.Router();
var db = require('../db');

var bodyParser = require('body-parser');
var cors = require('cors');

router.use(bodyParser.json());
router.use(cors());
router.use(bodyParser.urlencoded({
    extended: true
}));



router.get('/', function(req, res, next) {
    var sql = "SELECT * FROM verification";
    db.query(sql, function(err, rows, fields) {
      if (err) {
        res.status(500).send({ error: 'Something failed!' })
      }
      res.json(rows)
    })
  });


router.post('/', function (req, res) {
  let vn_id = req.body.vn_id;
  let vfc_id = req.body.vfc_id;
  let patient_id = req.body.patient_id;
  let time = req.body.time;
  let date = req.body.date;
  let result = req.body.result;
  let purpose = req.body.purpose;


  if (!vn_id , !vfc_id && !patient_id && !time && !date && !result && !purpose) {
      return res.status(400).send({ error:true, message: 'Please provide Information to be add' });
  }

  db.query(`INSERT INTO verification (vn_id , vfc_id , patient_id ,  time , date , result , purpose) VALUE ("${vn_id}" , "${vfc_id}" , "${patient_id}" , "${time}" ,"${date}" , "${result}" , "${purpose}") `, function (error, results, fields) {
      if (error) throw error;
      return res.send({ error: false, data: results, message: 'Record has been added' });
  });
});


module.exports = router;