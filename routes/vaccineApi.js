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
    var sql = "SELECT * FROM vaccine";
    db.query(sql, function(err, rows, fields) {
      if (err) {
        res.status(500).send({ error: 'Something failed!' })
      }
      res.json(rows)
    })
  });

  router.get('/patient', function(req, res, next) {
    var sql = "SELECT title, p_date, e_date, vc_id FROM vaccine";
    db.query(sql, function(err, rows, fields) {
      if (err) {
        res.status(500).send({ error: 'Something failed!' })
      }
      res.json(rows)
    })
  });


  router.delete('/delete/:vaccine_id', function (req, res, next) {
  
    let vaccine_id = req.params.vaccine_id;
  
    if (!vaccine_id) {
        return res.status(400).send({ error: true, message: 'Please provide id' });
    }
    db.query("DELETE FROM vaccine WHERE vaccine_id = ?",[vaccine_id], function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'User Data has been deleted' });
         
        })
  
  }); 


router.post('/', function (req, res) {
  let vaccine_id = req.body.vaccine_id;
  let vc_id = req.body.vc_id;
  let title= req.body.title;
  let  manf= req.body.manf;
  let batch = req.body.batch;
  let p_date = req.body.p_date;
  let e_date = req.body.e_date;
  let available = req.body.available;
  


  if (!vaccine_id  && !vc_id && !title && !manf && !batch && !p_date && !e_date && !available) {
      return res.status(400).send({ error:true, message: 'Please provide Information to be add' });
  }

  db.query(`INSERT INTO vaccine (vaccine_id  , vc_id , title, manf, batch , p_date , e_date , available) VALUE ("${vaccine_id}", "${vc_id}" , "${title}" ,  "${manf}" ,"${batch}" , "${p_date}" , "${e_date}" , "${available}" ) `, function (error, results, fields) {
      if (error) throw error;
      return res.send({ error: false, data: results, message: 'Record has been added' });
  });
});


router.get('/:vaccine_id', function (req, res) {
  
  let vaccine_id = req.params.vaccine_id;

  if (!vaccine_id) {
      return res.status(400).send({ error: true, message: 'Please provide id' });
  }

  db.query('SELECT * FROM vaccine where vaccine_id=?', vaccine_id, function (error, results, fields) {
      if (error) throw error;
      return res.send({ error: false, data: results[0], message: 'Information by ID.' });
  });

});


router.put('/update', function(req, res, next) {

  let vaccine_id = req.body.vaccine_id;
  let vc_id = req.body.vc_id;
  let title= req.body.title;
  let  manf= req.body.manf;
  let batch = req.body.batch;
  let p_date = req.body.p_date;
  let e_date = req.body.e_date;
  let available = req.body.available;

  if (!vaccine_id  || !vc_id || !title || !manf || !batch || !p_date || !e_date || !available) {
    return res.status(400).send({ error:true, message: 'Please provide Information to be add' });
}

    db.query("Update vaccine SET vc_id = ?, title = ? , manf = ?, batch = ?, p_date = ?, e_date = ?, available= ? WHERE vaccine_id = ?", 
    [vc_id , title , manf,batch,p_date,e_date ,available, vaccine_id], function (error, results, fields) {   
  if (error) throw error;
      return res.send({ error: false, data: results, message: 'Record has been added' });
  })
});


module.exports = router;