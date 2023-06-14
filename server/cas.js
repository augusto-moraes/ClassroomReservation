app = require('express')()
session = require('express-session')
CASAuthentication = require('cas-authentication')

app.listen(1234)

app.use(session( {
	secret: '12087371912',
	resave: false,
	saveUninitialized : true,
}))
  
cas = new CASAuthentication({
	cas_url: 'https://login.insa-lyon.fr/cas',
	service_url: 'http://tc405-112-02.insa-lyon.fr:1234',
	returnTo: '/'
})

app.use('/', cas.bounce, function (req, res) { res.send("Hello World");  console.log("coucou"); })
