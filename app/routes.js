// require express
var express = require('express');
var path = require('path');

//require nodemailer
var nodemailer = require('nodemailer');

//require bodyParser
var bodyParser = require('body-parser');

// create our router object
var router = express.Router();

// export our router
module.exports = router;

// route for our homepage
router.get('/', function(req, res) {
	res.render('pages/home');
});

// route for resume page
router.get('/resume', function(req, res) {
	res.render('pages/resume');
});

// route for videos page
router.get('/videos', function(req, res) {
  let videoLinks = [ 
    "https://www.youtube.com/embed/jg7vquqWoi4?ecver=2", 
    "https://www.youtube.com/embed/VfFNChG9_Y4?ecver=2",
    "https://www.youtube.com/embed/C1RuVzoYVKI" 
  ];
	res.render('pages/videos', { videoLinks: videoLinks });
});

// route for contact page
router.get('/contact', function(req, res) {
	res.render('pages/contact')
});

router.use(bodyParser.urlencoded({ extended: true })); 
router.use(bodyParser.json());

// route for post contact
router.post('/contact', function(req, res) {
var mailOpts, smtpTrans; 
//transport
smtpTrans = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
      user: "<myUser>",
      pass: "<myPassword>" 
  }
});
//Mail options
mailOpts = {
  from: req.query.name + ' &lt;' + req.query.email + '&gt;', //grab form data from the request body object
  to: '<other user>',
  subject: 'Website contact form',
  text: req.query.message
  };
  smtpTrans.sendMail(mailOpts, function (error, response) {
  //Email not sent
  var popup = require('window-popup');
  if (error) {
      res.end("Email send failed");
  }
  //Yay!! Email sent
  else {
      res.end("Email send successfully");
  }
  }); 
  });




