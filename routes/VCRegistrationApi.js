// const mysql = require('mysql');



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

// var connection = mysql.createConnection({
//     host: 'localhost',
//     user: "root",
//     password: "9990",
//     database: "fyp_db",
//     port: "3306"
// })

// connection.connect((err)=>{
//     if(err){
//         throw err
//     }
//     else{
//         console.log("connected")
//     }
// })

router.get('/', function(req, res, next) {
    var sql = "SELECT * FROM vc_center";
    db.query(sql, function(err, rows, fields) {
      if (err) {
        res.status(500).send({ error: 'Something failed!' })
      }
      res.json(rows)
    })
  });

  router.get('/vcID', function(req, res, next) {
    var sql = "SELECT vc_id FROM vc_center";
    db.query(sql, function(err, rows, fields) {
      if (err) {
        res.status(500).send({ error: 'Something failed!' })
      }
      res.json(rows)
    })
  });


router.post('/', function (req, res) {
  // let vc_id = req.body.vc_id;
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

  if ( !admin_id && !name && !email && !password && !address && !phone && !reg_no && !city && !state && !zip) {
      return res.status(400).send({ error:true, message: 'Please provide Information to be add' });
  }

  db.query(`INSERT INTO vc_center (admin_id, name , email, password , address , phone , reg_no , city ,state , zip) VALUE ( "${admin_id}", "${name}",  "${email}", "${password}", "${address}", "${phone}", "${reg_no}",  "${city}", "${state}", "${zip}")`, function (error, results, fields) {
      if (error) throw error;
      return res.send({ error: false, data: results, message: 'Record has been added' });
  });
  
});


router.get('/search/:vc_id', function (req, res) {
  
  let vc_id = req.params.vc_id;

  if (!vc_id) {
      return res.status(400).send({ error: true, message: 'Please provide id' });
  }

  db.query('SELECT * FROM vc_center where vc_id=?', vc_id, function (error, results, fields) {
      if (error) throw error;
      return res.send({ error: false, data: results[0], message: 'Information by ID.' });
  });

});


router.post("/login",(req,res)=>{
  const admin_id = req.body.admin_id;
  const password = req.body.password;
  db.query(
    "SELECT * FROM vc_center WHERE vc_id = ? AND password = ? ",
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

router.delete('/delete', function (req, res, next) {
  
  let vc_id = req.body.vc_id;

  if (!vc_id) {
      return res.status(400).send({ error: true, message: 'Please provide id' });
  }
  db.query("DELETE FROM vc_center WHERE vc_id = ?",[vc_id], function (error, results, fields) {
      if (error) throw error;
      return res.send({ error: false, data: results, message: 'User Data has been deleted' });
       
      })

}); 

// router.delete('/delete', function (req, res) {
  
//   let vc_id = req.body.vc_id;

//   if (!vc_id) {
//       return res.status(400).send({ error: true, message: 'Please provide id' });
//   }
//   db.query(`DELETE FROM vc_center WHERE vc_id = ${vc_id}`, function (error, results, fields) {
//       if (error) throw error;
//       return res.send({ error: false, data: results, message: 'User Data has been deleted' });
//   });
// }); 

router.delete('/delete/:vc_id', function (req, res, next) {
  
  let vc_id = req.params.vc_id;

  if (!vc_id) {
      return res.status(400).send({ error: true, message: 'Please provide id' });
  }
  db.query("DELETE FROM vc_center WHERE vc_id = ?",[vc_id], function (error, results, fields) {
      if (error) throw error;
      return res.send({ error: false, data: results, message: 'User Data has been deleted' });
       
      })

}); 

router.get('/:vc_id', function (req, res) {
  
  let vc_id = req.params.vc_id;

  if (!vc_id) {
      return res.status(400).send({ error: true, message: 'Please provide id' });
  }

  db.query('SELECT * FROM vc_center where vc_id=?', vc_id, function (error, results, fields) {
      if (error) throw error;
      return res.send({ error: false, data: results[0], message: 'Information by ID.' });
  });

});

router.get('/vcData', function(req, res, next) {
  var sql = "SELECT vc_id FROM vc_center";
  db.query(sql, function(err, rows, fields) {
    if (err) {
      res.status(500).send({ error: 'Something failed!' })
    }
    res.json(rows)
  })
});

router.put('/updatePass', function(req, res, next) {

  let admin_id = req.body.admin_id;
  let password = req.body.password;

  if (!admin_id || !password ) {
    return res.status(400).send({ error:true, message: 'Please provide Information to be add' });
}
db.query("Update vc_center SET password,  WHERE vc_id = ?", 
[admin_id,password], function (error, results, fields) {   
if (error) throw error;
  return res.send({ error: false, data: results, message: 'Record has been added' });
})
});

router.put('/update', function(req, res, next) {

  let vc_id = req.body.vc_id;
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

  if (!vc_id || !admin_id || !name || !email || !password || !address || !phone || !reg_no || !city || !state || !zip) {
    return res.status(400).send({ error:true, message: 'Please provide Information to be add' });
}

    db.query("Update vc_center SET admin_id = ?,name = ?, email = ?, password =? , address = ?, phone = ?, reg_no = ?, city = ?, state=?, zip = ?  WHERE vc_id = ?", 
    [admin_id,name,email,password,address,phone,reg_no,city,state,zip,vc_id], function (error, results, fields) {   
  if (error) throw error;
      return res.send({ error: false, data: results, message: 'Record has been added' });
  })
});


// const port = process.env.PORT || 3001
// app.listen(port);

// console.log("App is listening on port " + port)
module.exports = router;