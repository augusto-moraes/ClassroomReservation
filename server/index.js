//import { getReservationRoom } from './checkReservation';

const express = require("express");
const { getReservationRoom, 
    getReservationHour, 
    getReservationHourTime, 
    getReservationTime, 
    checkReservationHourTime, 
    getReservationRoomSecond 
} = require('./checkReservation');
const { addResa } = require ('./addReservations');

const app = express();
const PORT = process.env.PORT || 3001;

// Partie concernant le CAS
const session = require('express-session');
const CASAuthentication = require('cas-authentication');

app.use(session( {
	secret: '12087371912',
	resave: false,
	saveUninitialized : true,
}));
  
cas = new CASAuthentication({
	cas_url: 'https://login.insa-lyon.fr/cas',
	service_url: 'http://tc405-112-14.insa-lyon.fr:3001',
	returnTo: '/'
});

// get loged user or login 
// /!\ WARNING : Auth queries MUST be written BEFORE app.use('\', cas.bounce)
app.get('/user', cas.bounce, (req, res) => { res.send(req.session.cas_user) });

// CAS logout
app.get('/logout', cas.logout);

// requires CAS login to access all queries
app.use('/', cas.bounce);

// test api
app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});

app.get('/getRoomReservation', async (req, res) => {
    try {
        const salle = req.query.salle; // Récupérer le paramètre "salle" de l'URL
        const date = req.query.date; // Récupérer le paramètre "date" de l'URL

        // Utiliser les paramètres dans l'appel à getReservationRoom
        const rooms = await getReservationRoom(salle, date);
        const roomDetails = rooms.map(room => JSON.stringify(room));
        res.send('Réservation de la salle : ' + roomDetails.join(', '));
    } catch (error) {
        res.status(500).send('Une erreur est survenue lors de la récupération de la réservation de chambre');
    }
});


app.get('/getReservationHour', async (req, res) => {
    try {
        const salle = req.query.salle;
        const date = req.query.date;

        const hours = await getReservationHour(salle, date);

        res.send('Réservation d\'heure : ' + hours.join(', '));
    } catch (error) {
        res.status(500).send('Une erreur est survenue lors de la récupération de la réservation d\'heure');
    }
});

app.get('/getReservationHourTime', async (req, res) => {
    try {
        const salle = req.query.salle;
        const date = req.query.date;
        const heure = req.query.heure;

        const hourTime = await getReservationHourTime(salle, date, heure);

        res.send('Réservation d\'heure spécifique : ' + JSON.stringify(hourTime));
    } catch (error) {
        res.status(500).send('Une erreur est survenue lors de la récupération de la réservation d\'heure spécifique');
    }
});

app.get('/getReservationTime', async (req, res) => {
    try {
        const salle = req.query.salle;
        const date = req.query.date;
        const debut = req.query.debut;
        const fin = req.query.fin;

        const timeSlots = await getReservationTime(salle, date, debut, fin);


        res.send('Réservation dans la plage horaire : ' + JSON.stringify(timeSlots));
    } catch (error) {
        res.status(500).send('Une erreur est survenue lors de la récupération de la réservation dans la plage horaire');
    }
});

app.get('/checkReservationHourTime', async (req, res) => {
    try {
        const salle = req.query.salle;
        const date = req.query.date;
        const heure = req.query.heure;

        const isReserved = await checkReservationHourTime(salle, date, heure);
        // so what ?

        res.send('Réservation disponible pour l\'heure spécifique : ' + isReserved);
    } catch (error) {
        res.status(500).send('Une erreur est survenue lors de la vérification de disponibilité d\'heure spécifique');
    }
});

app.get('/getReservationRoomSecond', async (req, res) => {
    const { salle, date } = req.query;

    try {
        const reservationHours = await getReservationRoomSecond(salle, date);
        res.json(reservationHours);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Une erreur est survenue lors de la récupération des horaires de réservation.' });
    }
});

//requete pour post une nouvelle reservation
app.post('/addResa', async (req, res) => {
    const { salle, cours, heureDebut, heureFin, user, participants, nb, portee } = req.body;

    try {
        const add = await addResa(salle, cours, heureDebut, heureFin, user, participants, nb, portee);
        res.json(add);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Une erreur est survenue lors de l ajout de la réservation.' });
    }
});
