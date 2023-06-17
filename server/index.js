//import { getReservationRoom } from './checkReservation';

const express = require("express");
const { getReservationRoom, getReservationHour, getReservationHourTime, getReservationTime, checkReservationHourTime, getReservationRoomSecond, getReservationUser } = require('./checkReservation');
const { addResa } = require('./addReservations');
const { deleteResa } = require('./deleteReservation');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3001;

const app = express();
app.use(bodyParser.json());
app.use(express.json()); //express.json()


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
        res.json(rooms);
    } catch (error) {
        res.status(500).send('Une erreur est survenue lors de la récupération de la réservation de chambre');
    }
});


app.get('/getReservationHour', async (req, res) => {
    try {
        const salle = req.query.salle;
        const date = req.query.date;
        const heure = req.query.heure;

        const hours = await getReservationHour(salle, date, heure);
        res.json(hours);
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
        res.json(hourTime);
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
        res.json(timeSlots);
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

app.get('/getReservationUser', async (req, res) => {
    const user = req.query.user;

    try {
        const reservations = await getReservationUser(user);
        res.status(200).json(reservations);
        logreq.body.salle
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while fetching the reservations.');
    }
});


//requete pour post une nouvelle reservation
app.post('/addResa', async (req, res) => {
    const { salle, cours, heureDebut, heureFin, utilisateur, participants, nombrePersonne, porte } = req.body;

    console.log("le body :", salle, cours, heureDebut, heureFin, utilisateur, participants, nombrePersonne, porte);

    try {
        const add = await addResa(salle, cours, heureDebut, heureFin, utilisateur, participants, nombrePersonne, porte);
        res.json(add);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Une erreur est survenue lors de l ajout de la réservation.' });
    }
});


app.delete('/deleteReservation', async (req, res) => {
    const salle = req.query.salle;
    const heureDebut = req.query.heureDebut;
    const heureFin = req.query.heureFin;

    try {
        await deleteResa(salle, heureDebut, heureFin);
        res.status(200).send('Reservation deleted successfully.');
    } catch (error) {
        console.error(error);
        res.status(404).send('An error occurred while deleting the reservation.');
    }
});

