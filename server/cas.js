app.use(express.json());
app.use(cors());

app.listen(1234)

app.use(session( {
	secret: '12087371912',
	resave: false,
	saveUninitialized : true,
}))
  
cas = new CASAuthentication({
	cas_url: 'https://login.insa-lyon.fr/cas',
	service_url: 'http://10.10.10.10.insa-lyon.fr:1234',
	returnTo: '/'
})

app.get("/", cas.bounce, (req, resp) => {
	resp.send("App is Working");
	// You can check backend is working or not by
	// entering http://loacalhost:3001
	
	// If you see App is working means
	// backend working properly
});
