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
    var sql = "SELECT * FROM vf_center";
    db.query(sql, function(err, rows, fields) {
      if (err) {
        res.status(500).send({ error: 'Something failed!' })
      }
      res.json(rows)
    })
  });


router.post('/', function (req, res) {
  let vfc_id = req.body.vfc_id;
  let admin_id = req.body.admin_id;
  let name = req.body.name;
  let email = req.body.email;
  let password = req.body.password;
  let address = req.body.address;
  let phone = req.body.phone;
  let reg_no = req.body.reg_no;
  let city = req.body.city;
  let state = req.body.state;
  let zip = req.body.zip;

  if (!vfc_id && !admin_id && !name && !email && !password && !address && !phone && !reg_no && !city && !state && !zip) {
      return res.status(400).send({ error:true, message: 'Please provide Information to be add' });
  }

  db.query(`INSERT INTO vf_center (vfc_id , admin_id ,name , email, password , address , phone , reg_no , city ,state , zip) value("${vfc_id}","${admin_id}", "${name}",  "${email}", "${password}", "${address}", "${phone}", "${reg_no}",  "${city}", "${state}", "${zip}") `, function (error, results, fields) {
      if (error) throw error;
      return res.send({ error: false, data: results, message: 'Record has been added' });
  });
});


router.post("/login",(req,res)=>{
  const vfc_id = req.body.vfc_id;
  const password = req.body.password;
  db.query(
    "SELECT * FROM vf_center WHERE vfc_id = ? AND password = ? ",
    [vfc_id,password],
    (err,result)=>{
      if(err){
        res.send({err: err});
      }
      if(result.length>0){
        res.send(result);
      }else {
        res.send({message: "wrong id/password"});
      }
    
    }
  );
});




module.exports = router;