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

// post route for contact page
router.post('/contact', function(req, res) {
	var mailOpts, smtpTrans;
	//Setup Nodemailer transport, gmail
	smtpTrans = nodemailer.createTransport('SMTP', {
      service: 'Gmail',
      auth: {
          user: "amandagracehua@gmail.com",
          pass: "Doctor853" 
      	}
  	});
	//Mail options
	mailOpts = {
      from: req.body.name + ' &lt;' + req.body.email + '&gt;', //grab form data from the request body object
      to: 'amandagracehua@gmail.com',
      subject: 'Website contact form',
      text: req.body.message
  	};
	smtpTrans.sendMail(mailOpts, function (error, response) {
    	//Email not sent
    	if (error) {
          res.render('contact', { title: 'Amanda - Contact', msg: 'Error occured, message not sent.', err: true, page: 'contact' })
      	}
     	//Yay!! Email sent
     	else {
          res.render('contact', { title: 'Amanda - Contact', msg: 'Message sent! Thank you.', err: false, page: 'contact' })
      	}
  	});

}); 