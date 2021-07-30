var express = require('express');
var router = express.Router();
var connection  = require('../config/connection')


/* GET home page. */
router.get('/', function(req, res, next) {

  connection.query('SELECT * FROM persons', function (err, rows) {

    if(err) throw err;

    console.log(rows);

    res.render('index', {persons:rows} );

  });

 
});

router.post('/addUser', function(req,res) {

  const userData = {

    firstname:req.body.firstname,
    lstname:req.body.lstname,
    email:req.body.email,
    profession:req.body.profession

  };

  connection.query("INSERT INTO persons SET ?", userData, function(err, result) {

    if(err) throw err;

    res.redirect('/');

  });
  

});

router.get('/deleteUser/:id', function(req, res) {

  var userId = req.params.id;

  connection.query("DELETE FROM persons WHERE id = ? ", [userId], function(err, result) {

    if(err) throw err;
    res.redirect('/');

  })

  console.log(userId);
  res.send("Id reserved");

});

router.get('/edit/:id', function(req, res) {

  var userId = req.params.id;

  connection.query("SELECT * FROM persons WHERE id = ? ", [userId], function(err, rows) {

    if(err) throw err;

    res.render('edit',{userdata:rows});

  })

  router.post('/updateUser/:id', function(req, res) {

    var fname = req.body.firstname;
    var lname = req.body.lstname;
    var email = req.body.email;
    var prof = req.body.prof;

    var updateid = req.params.id;

    connection.query("UPDATE persons SET firstname = ?, lstname = ?, email = ?, profession = ? WHERE id = ?", [fname, lname, email, prof, updateid], function(err, result) {

      if(err) throw err;
      res.redirect('../../');
    })

  })

})

module.exports = router;
