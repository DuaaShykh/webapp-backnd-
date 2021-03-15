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
    var sql = "SELECT * FROM admin";
    db.query(sql, function(err, rows, fields) {
      if (err) {
        res.status(500).send({ error: 'Something failed!' })
      }
      res.json(rows)
    })
  });


  router.post("/login",(req,res)=>{
    const admin_id = req.body.admin_id;
    const password = req.body.password;
    db.query(
      "SELECT * FROM admin WHERE admin_id = ? AND password = ? ",
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
  
  

router.post('/', function (req, res) {
  
  let admin_id = req.body.admin_id ;
  let name = req.body.name;
  let email = req.body.email;
  let password = req.body.password;
  let address = req.body.address;
  let phone = req.body.phone;
  let profession = req.body.profession;
  let gender = req.body.gender;
  let dob = req.body.dob;
  let religion = req.body.religion;
  let city = req.body.city;
  let state = req.body.state;
 

  if (!admin_id  && !name && !email && !password && !address && !phone && !profession && !gender && !dob && !religion && !city && !state) {
      return res.status(400).send({ error:true, message: 'Please provide Information to be add' });
  }

  db.query(`INSERT INTO admin (admin_id  , name , email, password , address , phone , profession ,gender, dob , religion, city ,state , zip) VALUE ("${admin_id }" , "${name}", "${email}", "${password}", "${address}", "${phone}", "${profession}", "${gender}", "${dob}", "${religion}", "${city}", "${state}") `, function (error, results, fields) {
      if (error) throw error;
      return res.send({ error: false, data: results, message: 'Record has been added' });
  });
});

module.exports = router;