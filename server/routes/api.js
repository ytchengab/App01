var express = require('express');
var router = express.Router();
const Data = require('../data');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/getData', (req, res, next) => {
  Data.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});

/*router.get('/getData', (req, res, next) => {
    //var testJson =  {id: "1", message: "test"};
    var testJson =  [{"id": "1", "message": "test"}, {"id": "2", "message": "test2"}];
    return res.json({ success: true, data: testJson });

});*/

// this is our update method
// this method overwrites existing data in our database
router.post('/updateData', (req, res, next) => {
  console.log('node side - updateData')
  const { id, update } = req.body;
  Data.findByIdAndUpdate(id, update, (err) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

// this is our delete method
// this method removes existing data in our database
router.delete('/deleteData', (req, res, next) => {
  const { id } = req.body;
  Data.findByIdAndRemove(id, (err) => {
    if (err) return res.send(err);
    return res.json({ success: true });
  });
});

// this is our create methid
// this method adds new data in our database
router.post('/putData', (req, res, next) => {
  let data = new Data();

  const { id, message } = req.body;

  if ((!id && id !== 0) || !message) {
    return res.json({
      success: false,
      error: 'INVALID INPUTS',
    });
  }
  data.message = message;
  data.id = id;
  data.save((err) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});


module.exports = router;
