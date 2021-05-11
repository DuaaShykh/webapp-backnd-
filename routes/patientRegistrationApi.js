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
    var sql = "SELECT * FROM patient";
    db.query(sql, function(err, rows, fields) {
      if (err) {
        res.status(500).send({ error: 'Something failed!' })
      }
      res.json(rows)
    })
  });


router.post('/', function (req, res) {
  let patient_id = req.body.patient_id;
  let vc_id = req.body.vc_id;
  let f_name = req.body.f_name;
  let l_name = req.body.l_name;
  let father_name = req.body.father_name;
  let email = req.body.email;
  let password = req.body.password;
  let date = req.body.date;
  let address = req.body.address;
  let phone = req.body.phone;
  let qualification = req.body.qualification;
  let gender = req.body.gender;
  let dob = req.body.dob;
  let martial_status = req.body.martial_status;
  let cnic = req.body.cnic;
  let religion = req.body.religion;
  let city = req.body.city;
  let state = req.body.state;
  let zip = req.body.zip;

  if (!patient_id && !vc_id && !f_name && l_name && !father_name && !email && !password && !date && !address && !phone && !qualification && !gender && !dob && !martial_status && !cnic && !religion && !city && !state && !zip) {
      return res.status(400).send({ error:true, message: 'Please provide Information to be add' });
  }

  db.query(`INSERT INTO patient (patient_id  , vc_id ,f_name , l_name , father_name , email, password , date, address , phone , qualification ,gender, dob, martial_status , cnic , religion, city ,state , zip) VALUE ("${patient_id }" , "${vc_id}", "${f_name}", "${l_name}", "${father_name}", "${email}", "${password}","${date}", "${address}", "${phone}", "${qualification}", "${gender}", "${dob}", "${martial_status}" , "${cnic}", "${religion}", "${city}", "${state}", "${zip}") `, function (error, results, fields) {
      if (error) throw error;
      return res.send({ error: false, data: results, message: 'Record has been added' });
  });
});

router.post("/login",(req,res)=>{
  const patient_id = req.body.patient_id;
  const password = req.body.password;
  db.query(
    "SELECT * FROM patient WHERE patient_id = ? AND password = ? ",
    [patient_id,password],
    (err,result)=>{
      if(err){
        res.send({err: err});
      }
      if(result.length>0){
        res.send(result);
      }else{
        res.send({message: "wrong id/password"});
      }
    }
  );
});


router.get('/:patient_id', function (req, res) {
  
  let patient_id = req.params.patient_id;

  if (!patient_id) {
      return res.status(400).send({ error: true, message: 'Please provide id' });
  }

  db.query('SELECT * FROM patient where patient_id=?', patient_id, function (error, results, fields) {
      if (error) throw error;
      return res.send({ error: false, data: results[0], message: 'Information by ID.' });
  });

});


router.put('/update', function(req, res, next) {

  let patient_id = req.body.patient_id;
  let vc_id = req.body.vc_id;
  let f_name = req.body.f_name;
  let l_name = req.body.l_name;
  let father_name = req.body.father_name;
  let email = req.body.email;
  let password = req.body.password;
  let address = req.body.address;
  let date = req.body.date;
  let phone = req.body.phone;
  let qualification = req.body.qualification;
  let gender = req.body.gender;
  let dob = req.body.dob;
  let martial_status = req.body.martial_status;
  let cnic = req.body.cnic;
  let religion = req.body.religion;
  let city = req.body.city;
  let state = req.body.state;
  let zip = req.body.zip;

  if (!patient_id || !vc_id || !f_name || l_name || !father_name || !email || !password ||!date || !address || !phone || !qualification || !gender || !dob || !martial_status || !cnic || !religion || !city || !state || !zip) {
    return res.status(400).send({ error:true, message: 'Please provide Information to be add' });
}

    db.query("Update patient SET vc_id = ?, f_name = ?, l_name = ? ,father_name = ? , email =?, password=?, date= ?, address = ? , phone = ? , qualification =?, gender = ?, dob = ?, martial_status = ?, cnic = ?, religion = ?, city = ?, state = ?, zip = ? WHERE patient_id = ?", 
    [vc_id , f_name , l_name ,father_name , email ,password ,date, address , phone , qualification,gender,dob, martial_status, cnic, religion,city,state,zip , patient_id], function (error, results, fields) {   
  if (error) throw error;
      return res.send({ error: false, data: results, message: 'Record has been added' });
  })
});



router.delete('/delete/:patient_id', function (req, res, next) {
  
  let patient_id = req.params.patient_id;

  if (!patient_id) {
      return res.status(400).send({ error: true, message: 'Please provide id' });
  }
  db.query("DELETE FROM patient WHERE patient_id = ?",[patient_id], function (error, results, fields) {
      if (error) throw error;
      return res.send({ error: false, data: results, message: 'User Data has been deleted' });
       
      })

}); 


module.exports = router;