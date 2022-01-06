const express = require('express');
const router = express.Router();
const mysql  = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'supermarket'
});

connection.connect(function(err){
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
        }
        console.log('connected as id ' + connection.threadId);
    });


router.get('/getAllCustomers',async (req, res) => {
      connection.query('SELECT * FROM customer', (error, results, fields)=>{
        if (error){
          res.status(400).send("Something went wrong.");
        }else{
          res.status(200).send({"All Customers:" : results});
        }
      });
});

router.post('/addACustomer',async (req, res) => {
  connection.query('SELECT * FROM customer', (error, results, fields)=>{
    if (error){
      res.status(400).send("Something went wrong.");
    }else{
      Id = results[results.length-1].customer_id + 1;
      connection.query(`INSERT INTO customer VALUES (${Id}, '${req.body.firstName}', '${req.body.lastName}', '${req.body.dateofbirth}', '${req.body.store_postcode}')`, (error, results, fields)=>{
        if (error){
          console.log(error);
          res.status(400).send("Something went wrong.");
        }else{
          res.status(200).send({"Added Customer:" : req.body});
        }
      });
    }
  });
});

router.delete('/removeACustomer/:id',async (req, res) => {
  connection.query(`DELETE FROM customer WHERE customer_id=${req.params.id};`, (error, results, fields)=>{
    if (error){
      res.status(400).send("Something went wrong.");
    }else{
      res.status(200).send("Customer Removed!!");
    }
  });
});

router.put('/updateACustomer/:id',async (req, res) => {
  connection.query(`UPDATE customer SET firstName = '${req.body.firstName}', lastName = '${req.body.lastName}',dateofbirth = '${req.body.dateofbirth}', store_postcode = '${req.body.store_postcode}' WHERE customer_id=${req.params.id};`, (error, results, fields)=>{
    if (error){
      res.status(400).send("Something went wrong.");
    }else{
      res.status(200).send("Customer updated!!");
    }
  });
});

module.exports = router;