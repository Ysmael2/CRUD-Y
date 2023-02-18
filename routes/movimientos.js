var express = require('express');
var router = express.Router();
var dbConn  = require('../lib/db');

// Mostrar movimientos
router.get('/', function(req, res, next) {

    dbConn.query('SELECT * FROM movimientos ORDER BY id desc',function(err,rows)     {

        if(err) {
            res.render('movimientos',{data:'error'});
        } else {
            res.render('movimientos',{data:rows});
        }
    });
});

// Mostrar pagina para agregar movimientos
router.get('/add', function(req, res, next) {
    res.render('movimientos/add', {
        descripcion: '',
        monto: '',
        destino: ''
    })
})

// Agregar nuevo movimiento
router.post('/add', function(req, res, next) {

    let descripcion = req.body.descripcion;
    let monto = req.body.monto;
    let destino = req.body.destino;
    let errors = false;

    if(descripcion.length === 0 || monto === 0 || destino.length === 0) {
        errors = true;

        
        req.render('add', {data:'error'});
        
    }

    // Si no hay errores
    if(!errors) {

        var form_data = {
            descripcion: descripcion,
            monto: monto,
            destino: destino
        }


        dbConn.query('INSERT INTO movimientos SET ?', form_data, function(err, result) {
            if (err) {
                console.log(err)

                
                res.render('movimientos/add', {
                    data: err
                })
            } else {
                res.redirect('/movimientos');
            }
        })
    }
})



// Eliminar movimiento
router.get('/delete/(:id)', function(req, res, next) {

    let id = req.params.id;

    dbConn.query('DELETE FROM movimientos WHERE id = ' + id, function(err, result) {
        if (err) {
            res.send('error')
        } else {
            res.redirect('/movimientos')
        }
    })
})

module.exports = router;