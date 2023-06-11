//import { getReservationRoom } from './checkReservation';

const express = require("express");
const { getReservationRoom, getReservationHour, getReservationHourTime, getReservationTime, checkReservationHourTime } = require('./checkReservation');

const PORT = process.env.PORT || 3001;

const app = express();


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
