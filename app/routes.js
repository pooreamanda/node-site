// require express
var express = require('express');
var path = require('path');

//require nodemailer
var nodemailer = require('nodemailer');

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
	res.render('pages/videos');
});

// route for contact page
router.get('/contact', function(req, res) {
	res.render('pages/contact');
});

// route for post contact
router.post('/contact', function(req, res) {
	var mailOpts, smtpTrans;
	//Setup Nodemailer transport, gmail
	smtpTrans = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
          user: "me@gmail.com", //add this later
          pass: "password" //add this later
      	}
  	});
	//Mail options
	mailOpts = {
      from: req.body.name + ' &lt;' + req.body.email + '&gt;', //grab form data from the request body object
      to: 'me@gmail.com', //add this later
      subject: 'Website contact form',
      text: req.body.message
  	};
	smtpTrans.sendMail(mailOpts, function (error, response) {
    	//Email not sent
    	if (error) {
          res.render('pages/contact', { title: 'Amanda - Contact', msg: 'Error occured, message not sent.', err: true, page: 'contact' })
      	}
     	//Yay!! Email sent
     	else {
          res.render('pages/contact', { title: 'Amanda - Contact', msg: 'Message sent! Thank you.', err: false, page: 'contact' })
      	}
  	});

}); 