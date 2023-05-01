const express = require('express');
const router = express.Router();
const db = require('../db')

router.get('/', (req, res) => {
    try {
        db.query('SELECT * FROM impresoras', (err,result) =>{
            if(err) throw err;
            res.json(result);
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.put('/:id', (req, res) =>{
    try {
        const { negro, amarillo, cian, magenta } = req.body;
        const values = [negro, amarillo, cian, magenta, req.params.id];
        console.log(values);
        db.query('UPDATE impresoras SET negro = ?, amarillo = ?, cian = ?, magenta = ? WHERE id = ?', values, function (err, rows) {
            if (err) throw err;
            res.json(rows);
        })
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})


module.exports = router;
