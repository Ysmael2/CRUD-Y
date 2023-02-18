var express = require('express');
var router = express.Router();
var dbConn  = require('../lib/db');

/* Pagina Principal */
router.get('/', function(req, res, next) {

  dbConn.query('SELECT * FROM movimientos ORDER BY id desc',function(err,rows)     {

      if(err) {
          console.log(err);
          
          res.render('movimientos',{data:'error index'});
      } else {
        
          res.render('movimientos',{data:rows});
      }
  });

  
});

module.exports = router;
