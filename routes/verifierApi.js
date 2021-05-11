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
    var sql = "SELECT * FROM verifier";
    db.query(sql, function(err, rows, fields) {
      if (err) {
        res.status(500).send({ error: 'Something failed!' })
      }
      res.json(rows)
    })
  });


router.post('/', function (req, res) {
  let verifier_id = req.body.verifier_id;
  let vfc_id = req.body.vfc_id;
  let f_name = req.body.f_name;
  let l_name = req.body.l_name;
  let email = req.body.email;
  let password = req.body.password;
  let address = req.body.address;
  let phone = req.body.phone;
  let qualification = req.body.qualification;
  let gender = req.body.gender;
  let dob = req.body.dob;
  let religion = req.body.religion;
  let cnic = req.body.cnic;
  let city = req.body.city;
  let state = req.body.state;
  let zip = req.body.zip;

  if (!verifier_id && !vfc_id && !f_name && l_name && !email && !password && !address && !phone && !qualification && !gender && !dob && !religion && !cnic  && !city && !state && !zip) {
      return res.status(400).send({ error:true, message: 'Please provide Information to be add' });
  }

  db.query(`INSERT INTO verifier (verifier_id , vfc_id ,f_name , l_name , email, password , address , phone , qualification ,gender, dob , religion, cnic , city ,state , zip) VALUE ( "${verifier_id}",   "${vfc_id}", "${f_name}", "${l_name}", "${email}", "${password}", "${address}", "${phone}", "${qualification}", "${gender}", "${dob}", "${religion}", "${cnic}" , "${city}", "${state}", "${zip}") `, function (error, results, fields) {
      if (error) throw error;
      return res.send({ error: false, data: results, message: 'Record has been added' });
  });
});


router.post("/login",(req,res)=>{
  const admin_id = req.body.admin_id;
  const password = req.body.password;
  db.query(
    "SELECT * FROM verifier WHERE verifier_id = ? AND password = ? ",
    [admin_id,password],
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


router.delete('/delete/:verifier_id', function (req, res, next) {
  
  let verifier_id = req.params.verifier_id;

  if (!verifier_id) {
      return res.status(400).send({ error: true, message: 'Please provide id' });
  }
  db.query("DELETE FROM verifier WHERE verifier_id = ?",[verifier_id], function (error, results, fields) {
      if (error) throw error;
      return res.send({ error: false, data: results, message: 'User Data has been deleted' });
       
      })

}); 


router.get('/:verifier_id', function (req, res) {
  
  let verifier_id = req.params.verifier_id;

  if (!verifier_id) {
      return res.status(400).send({ error: true, message: 'Please provide id' });
  }

  db.query('SELECT * FROM verifier where verifier_id=?', verifier_id, function (error, results, fields) {
      if (error) throw error;
      return res.send({ error: false, data: results[0], message: 'Information by ID.' });
  });

});


router.put('/update', function(req, res, next) {

  let verifier_id = req.body.verifier_id;
  let vfc_id = req.body.vfc_id;
  let f_name = req.body.f_name;
  let l_name = req.body.l_name;
  let email = req.body.email;
  let password = req.body.password;
  let address = req.body.address;
  let phone = req.body.phone;
  let qualification = req.body.qualification;
  let gender = req.body.gender;
  let dob = req.body.dob;
  let religion = req.body.religion;
  let cnic = req.body.cnic;
  let city = req.body.city;
  let state = req.body.state;
  let zip = req.body.zip;

  if (!verifier_id || !vfc_id || !f_name || l_name || !email || !password || !address || !phone || !qualification || !gender || !dob || !religion || !cnic  || !city || !state || !zip) {
    return res.status(400).send({ error:true, message: 'Please provide Information to be add' });
}

    db.query("Update verifier SET vfc_id = ?, f_name = ?, l_name = ? , email =?, password=?, address = ? , phone = ? , qualification =?, gender = ?, dob = ?, cnic = ?, religion = ?, city = ?, state = ?, zip = ? WHERE verifier_id = ?", 
    [vfc_id , f_name , l_name , email ,password , address , phone , qualification,gender,dob, cnic, religion,city,state,zip , patient_id], function (error, results, fields) {   
  if (error) throw error;
      return res.send({ error: false, data: results, message: 'Record has been added' });
  })
});

module.exports = router;