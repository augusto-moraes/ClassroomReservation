// To connect with your mongoDB database
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/', {
    dbName: 'ClassroomReservation',
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Schema for users of app
const ReservationsSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	desc: {
		type: String,
	},
	desc: {
		type: String,
		required: true,
		unique: true,
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

const User = mongoose.model('users', ReservationsSchema);
User.createIndexes();

// For backend and express
const express = require('express');
const cors = require("cors");

const session = require('express-session')
const CASAuthentication = require('cas-authentication')

const PORT = process.env.PORT || 3001;

const app = express();

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

app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
});

app.post("/register", async (req, resp) => {
	try {
		const user = new User(req.body);
		let result = await user.save();
		result = result.toObject();
		if (result) {
			delete result.password;
			resp.send(req.body);
			console.log(result);
		} else {
			console.log("User already register");
		}

	} catch (e) {
		resp.send("Something Went Wrong");
	}
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
