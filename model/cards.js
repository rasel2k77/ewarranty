var dbConn = require('../config/db');

exports.getAll = (req, res, next) => {
    dbConn.query('SELECT * FROM warranty_cards ORDER BY id desc', function (err, rows) {
        if (err) {
            res.status(400).json({ error: 'something is wrong' });
        } else {
            res.status(200).json(rows);
        }
    });
}

exports.findOne = function (req, res, next) {
    let id = req.params.id;
    dbConn.query('SELECT * FROM warranty_cards WHERE id = ' + id, function (err, rows, fields) {
        if (err) throw err
        // if user not found
        if (rows.length <= 0) {
            // res.status(404).send(err);
            res.status(502).json({ status: 1 });
        }
        // if card found
        else {
            res.status(200).json(rows);
        }
    })
}

exports.create = (req, res, next) => {
    let customer_name = req.body.customer_name;
    let product_name = req.body.product_name;
    let model_no = req.body.model_no;
    let phone_no = req.body.phone_no;
    let purchase_date = req.body.purchase_date;
    let id = req.body.id;
    let isEdit = req.body.isEdit;
    let errors = false;

    if (customer_name.length === 0 || product_name.length === 0) {
        errors = true;
    }

    // if no error
    if (!errors) {

        var form_data = {
            customer_name: customer_name,
            product_name: product_name,
            model_no: model_no,
            phone_no: phone_no,
            purchase_date: purchase_date,
        }

        let query = '';

        //If set query dynamically for insert or udpate
        if (!isEdit) {
            query = 'INSERT INTO warranty_cards SET ?';
        } else {
            query = 'UPDATE warranty_cards SET ? WHERE id = ' + id
        }
        // insert query
        dbConn.query(query, form_data, function (err, result) {
            //if(err) throw err
            if (err) {
                res.status(502).json(err);
            } else {
                let response = {
                    isEdit: isEdit,
                    message: "success"
                }
                res.status(201).json(response);
            }
        })
    }
}