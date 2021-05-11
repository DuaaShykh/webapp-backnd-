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
    var sql = "SELECT * FROM vaccination";
    db.query(sql, function(err, rows, fields) {
      if (err) {
        res.status(500).send({ error: 'Something failed!' })
      }
      res.json(rows)
    })
  });


router.post('/', function (req, res) {
  let v_id = req.body.v_id;
  let patient_id = req.body.patient_id;
  let vaccine_id = req.body.vaccine_id;
  let vc_id = req.body.vc_id;
  let doctor_id = req.body.doctor_id;
  let time = req.body.time;
  let date = req.body.date;
  let result = req.body.result;
  let reason = req.body.reason;


  if (!v_id && !patient_id && !vc_id && !vaccine_id && !doctor_id && !time && !date && !result && !reason) {
      return res.status(400).send({ error:true, message: 'Please provide Information to be add' });
  }

  db.query(`INSERT INTO vaccination (v_id , patient_id , vc_id , vaccine_id, doctor_id , time , date , result , reason) VALUE ("${v_id}" , "${patient_id}" ,  "${vc_id}", "${vaccine_id}" , "${doctor_id}" , "${time}" ,"${date}" , "${result}" , "${reason}") `, function (error, results, fields) {
      if (error) throw error;
      return res.send({ error: false, data: results, message: 'Record has been added' });
  });
});





router.get('/search/:v_id', function (req, res) {
  
  let v_id = req.params.v_id;

  if (!v_id) {
      return res.status(400).send({ error: true, message: 'Please provide id' });
  }

  db.query('SELECT * FROM vaccination where v_id=?', [v_id], function (error, results, fields) {
      if (error) throw error;
      return res.send({ error: false, data: results[0], message: 'Information by ID.' });
  });

});

router.get('/:v_id', function (req, res) {
  
  let v_id = req.params.v_id;

  if (!v_id) {
      return res.status(400).send({ error: true, message: 'Please provide id' });
  }

  db.query('SELECT * FROM vaccination where v_id=?', v_id, function (error, results, fields) {
      if (error) throw error;
      return res.send({ error: false, data: results[0], message: 'Information by ID.' });
  });

});


router.put('/update', function(req, res, next) {

  let v_id = req.body.v_id;
  let patient_id = req.body.patient_id;
  let vaccine_id = req.body.vaccine_id;
  let vc_id = req.body.vc_id;
  let doctor_id = req.body.doctor_id;
  let time = req.body.time;
  let date = req.body.date;
  let result = req.body.result;
  let reason = req.body.reason;

  if (!v_id || !patient_id || !vc_id || !vaccine_id || !doctor_id || !time || !date || !result || !reason) {
    return res.status(400).send({ error:true, message: 'Please provide Information to be add' });
}

    db.query("Update vaccination SET patient_id = ?, vc_id = ?, vaccine_id = ? , doctor_id =?, time=?, date = ? , result = ? , reason =? WHERE v_id = ?", [patient_id, vc_id, vaccine_id, doctor_id , time , date , result , reason, v_id], function (error, results, fields) {   
  if (error) throw error;
      return res.send({ error: false, data: results, message: 'Record has been added' });
  })
});






router.delete('/delete/:v_id', function (req, res, next) {
  
  let v_id = req.params.v_id;

  if (!v_id) {
      return res.status(400).send({ error: true, message: 'Please provide id' });
  }
  db.query("DELETE FROM vaccination WHERE v_id = ?",[v_id], function (error, results, fields) {
      if (error) throw error;
      return res.send({ error: false, data: results, message: 'User Data has been deleted' });
       
      })

}); 


module.exports = router;