require('dotenv').config();
const { MongoClient } = require('mongodb');
const moment = require('moment');

// Nom de la base de données
const dbName = 'classroomReservation';

// Fonction pour effectuer une recherche dans la collection "reservation"
async function getReservationRoom(salle, date) {
    // Connexion à la base de données
    const client = new MongoClient(process.env.MONGO_URL);
    try {
        await client.connect();

        // Sélection de la base de données
        const db = client.db(dbName);

        // Sélection de la collection
        const collection = db.collection('reservation');

        // Requête de recherche
        const query = {
            Salle: salle,
            'heure debut': {
                $gte: moment(date).startOf('day').format('YYYYMMDD HH:mm:ss'),
                $lt: moment(date).endOf('day').format('YYYYMMDD HH:mm:ss')
            },
        };

        const reservations = await collection.find(query).toArray();

        // Appeler la fonction pour calculer les plages de créneaux disponibles
        const availableTimeSlots = calculateAvailableTimeSlots(reservations);

        // Construire le tableau de disponibilités
        const availabilityTable = [];
        const startTime = moment('2023-06-02T08:00:00', 'YYYY-MM-DDTHH:mm:ss').toDate();
        const endTime = moment('2023-06-02T22:30:00', 'YYYY-MM-DDTHH:mm:ss').toDate();
        const timeSlotDuration = 30; // Durée du créneau en minutes

        let currentTime = startTime;

        while (currentTime <= endTime) {
            const nextTime = moment(currentTime).add(timeSlotDuration, 'minutes').toDate();
            const isAvailable = isTimeSlotAvailable(currentTime, nextTime, availableTimeSlots);
            const timeSlot = {
                time: formatTime(currentTime),
                available: isAvailable ? 'oui' : 'non',
            };
            availabilityTable.push(timeSlot);
            currentTime = nextTime;
        }

        // Renvoyer le tableau de disponibilités
        return availabilityTable;
    } finally {
        // Fermeture de la connexion à la base de données
        await client.close();
    }
}

async function getReservationHour(salle, date, heure) {
    // Connexion à la base de données
    const client = new MongoClient(process.env.MONGO_URL);
    try {
        await client.connect();

        // Sélection de la base de données
        const db = client.db(dbName);

        // Sélection de la collection
        const collection = db.collection('reservation');

        // Requête de recherche
        const query = {
            Salle: salle,
            'heure debut': {
                $gte: moment(date).startOf('day').format('YYYYMMDD ' + heure),
                $lt: moment(date).endOf('day').format('YYYYMMDD HH:mm:ss')
            },
        };

        const reservations = await collection.find(query).toArray();

        // Appeler la fonction pour calculer les plages de créneaux disponibles
        const availableTimeSlots = calculateAvailableTimeSlots(reservations);

        // Construire le tableau de disponibilités
        const availabilityTable = [];

        const startTime = moment('2023-06-02T' + heure + ':00', 'YYYY-MM-DDTHH:mm:ss').toDate();
        const endTime = moment('2023-06-02T22:30:00', 'YYYY-MM-DDTHH:mm:ss').toDate();
        const timeSlotDuration = 30; // Durée du créneau en minutes

        let currentTime = startTime;

        while (currentTime <= endTime) {
            const nextTime = moment(currentTime).add(timeSlotDuration, 'minutes').toDate();
            const isAvailable = isTimeSlotAvailable(currentTime, nextTime, availableTimeSlots);
            const timeSlot = {
                time: formatTime(currentTime),
                available: isAvailable ? 'oui' : 'non',
            };
            availabilityTable.push(timeSlot);
            currentTime = nextTime;
        }

        // Renvoyer le tableau de disponibilités
        return availabilityTable;
    } finally {
        // Fermeture de la connexion à la base de données
        await client.close();
    }
}

async function getReservationTime(salle, date, duree) {
    // Connexion à la base de données
    const client = new MongoClient(process.env.MONGO_URL);
    try {
        await client.connect();

        // Sélection de la base de données
        const db = client.db(dbName);

        // Sélection de la collection
        const collection = db.collection('reservation');

        // Requête de recherche
        const query = {
            Salle: salle,
            'heure debut': {
                $gte: moment(date).startOf('day').format('YYYYMMDD HH:mm:ss'),
                $lt: moment(date).endOf('day').format('YYYYMMDD HH:mm:ss')
            },
        };

        const reservations = await collection.find(query).toArray();

        // Appeler la fonction pour calculer les plages de créneaux disponibles
        const availableTimeSlots = calculateAvailableTimeSlots(reservations);

        // Construire le tableau de disponibilités pour la durée spécifiée
        const availabilityTable = [];
        const timeSlotDuration = moment.duration(duree).asMinutes(); // Durée du créneau en minutes

        // Parcourir les créneaux disponibles et vérifier leur durée

        for (const slot of availableTimeSlots) {
            const slotStart = moment(slot.start); // Moment de début du créneau
            const slotEnd = moment(slot.end); // Moment de fin du créneau

            // Diviser le créneau en sous-créneaux de 30 minutes
            let currentTime = slotStart.clone();
            while (currentTime.isBefore(slotEnd)) {
                const timeSlotEnd = currentTime.clone().add(30, 'minutes'); // Moment de fin du sous-créneau

                if (timeSlotEnd.isAfter(slotEnd)) {
                    break; // Arrêter si le sous-créneau dépasse le moment de fin du créneau
                }

                const timeSlot = {
                    start: formatTime(currentTime),
                    //end: formatTime(timeSlotEnd),
                    available: 'oui'
                };
                availabilityTable.push(timeSlot);

                currentTime.add(30, 'minutes'); // Passer au sous-créneau suivant
            }


        }

        // Renvoyer le tableau de disponibilités pour la durée spécifiée
        return availabilityTable;
    } finally {
        // Fermeture de la connexion à la base de données
        await client.close();
    }
}

async function getReservationHourTime(salle, date, heure, duree) {
    // Connexion à la base de données
    const client = new MongoClient(process.env.MONGO_URL);
    try {
        await client.connect();

        // Sélection de la base de données
        const db = client.db(dbName);

        // Sélection de la collection
        const collection = db.collection('reservation');

        // Requête de recherche
        const query = {
            Salle: salle,
            'heure debut': {
                $gte: moment(date).startOf('day').format('YYYYMMDD ' + heure),
                $lt: moment(date).endOf('day').format('YYYYMMDD HH:mm:ss')
            },
        };

        const reservations = await collection.find(query).toArray();

        // Appeler la fonction pour calculer les plages de créneaux disponibles
        const availableTimeSlots = calculateAvailableTimeSlots(reservations);

        // Construire le tableau de disponibilités pour la durée spécifiée
        const availabilityTable = [];
        const timeSlotDuration = moment.duration(duree).asMinutes(); // Durée du créneau en minutes

        // Convertir la chaîne de caractères en objet moment
        const heureLimite = moment(date).startOf('day').add(moment.duration(heure));

        // Parcourir les créneaux disponibles et vérifier leur durée

        for (const slot of availableTimeSlots) {
            const slotStart = moment(slot.start); // Moment de début du créneau
            const slotEnd = moment(slot.end); // Moment de fin du créneau

            // Diviser le créneau en sous-créneaux de 30 minutes
            let currentTime = slotStart.clone();
            while (currentTime.isBefore(slotEnd)) {
                if (currentTime.isSameOrAfter(heureLimite)) {


                    const timeSlotEnd = currentTime.clone().add(30, 'minutes'); // Moment de fin du sous-créneau

                    if (timeSlotEnd.isAfter(slotEnd)) {
                        break; // Arrêter si le sous-créneau dépasse le moment de fin du créneau
                    }

                    const timeSlot = {
                        start: formatTime(currentTime),
                        //end: formatTime(timeSlotEnd),
                        available: 'oui'
                    };
                    availabilityTable.push(timeSlot);
                }

                currentTime.add(30, 'minutes'); // Passer au sous-créneau suivant
            }


        }

        // Renvoyer le tableau de disponibilités pour la durée spécifiée
        return availabilityTable;
    } finally {
        // Fermeture de la connexion à la base de données
        await client.close();
    }
}

async function getReservationHourTime(salle, date, heure, duree) {
    // Connexion à la base de données
    const client = new MongoClient(process.env.MONGO_URL);
    try {
        await client.connect();

        // Sélection de la base de données
        const db = client.db(dbName);

        // Sélection de la collection
        const collection = db.collection('reservation');

        // Requête de recherche
        const query = {
            Salle: salle,
            'heure debut': {
                $gte: moment(date).startOf('day').format('YYYYMMDD ' + heure),
                $lt: moment(date).endOf('day').format('YYYYMMDD HH:mm:ss')
            },
        };

        const reservations = await collection.find(query).toArray();

        // Appeler la fonction pour calculer les plages de créneaux disponibles
        const availableTimeSlots = calculateAvailableTimeSlots(reservations);

        // Construire le tableau de disponibilités
        const availabilityTable = [];

        const startTime = moment('2023-06-02T' + heure + ':00', 'YYYY-MM-DDTHH:mm:ss').toDate();
        const endTime = moment('2023-06-02T22:30:00', 'YYYY-MM-DDTHH:mm:ss').toDate();
        const timeSlotDuration = 30; // Durée du créneau en minutes

        const heureLimite = moment(date).startOf('day').add(moment.duration(heure));
        const dureeDuration = moment.duration(duree);
        const heureLimiteFin = heureLimite.clone().add(dureeDuration);


        let currentTime = startTime;

        while (currentTime <= endTime) {
            const currentMoment = moment(currentTime);
            if (currentMoment.isSameOrAfter(heureLimite)) {
                if (currentMoment.isBefore(heureLimiteFin)) {
                    const nextTime = moment(currentMoment).add(timeSlotDuration, 'minutes').toDate();
                    const isAvailable = isTimeSlotAvailable(currentMoment, nextTime, availableTimeSlots);
                    const timeSlot = {
                        time: formatTime(currentMoment),
                        available: isAvailable ? 'oui' : 'non',
                    };
                    availabilityTable.push(timeSlot);
                    currentTime = nextTime;
                } else {
                    currentTime = moment(currentMoment).add(timeSlotDuration, 'minutes').toDate();
                }
            } else {
                currentTime = moment(currentMoment).add(timeSlotDuration, 'minutes').toDate();
            }
        }



        // Renvoyer le tableau de disponibilités
        return availabilityTable;
    } finally {
        // Fermeture de la connexion à la base de données
        await client.close();
    }
}


async function checkReservationHourTime(salle, date, heure, duree) {
    
    const availabilityTable = await getReservationHourTime(salle, date, heure, duree)
    // Vérifier si tous les éléments ont la propriété 'available' égale à 'oui'
    const allAvailable = availabilityTable.every(slot => slot.available === 'oui');

    return allAvailable;
}



// Création d'une fonction pour calculer les plages de créneaux de 30 minutes disponibles
function calculateAvailableTimeSlots(reservations) {
    const availableTimeSlots = [];
    const startTime = '20230602 08:00:00';
    const endTime = '20230602 23:00:00';
    const timeSlotDuration = 30; // Durée du créneau en minutes

    // Convertir l'heure de début et de fin en objets Date
    const startDateTime = moment(startTime, 'YYYYMMDD HH:mm:ss').toDate();
    const endDateTime = moment(endTime, 'YYYYMMDD HH:mm:ss').toDate();

    // Parcourir les réservations
    for (let i = 0; i < reservations.length; i++) {
        const reservation = reservations[i];

        // Convertir l'heure de début et de fin de la réservation en objets Date
        const reservationStart = moment(reservation['heure debut'], 'YYYYMMDD HH:mm:ss').toDate();
        const reservationEnd = moment(reservation['heure fin'], 'YYYYMMDD HH:mm:ss').toDate();

        // Vérifier s'il y a un espace disponible avant la première réservation
        if (i === 0 && reservationStart > startDateTime) {
            const availableSlot = {
                start: startDateTime,
                end: reservationStart,
                available: true,
            };
            availableTimeSlots.push(availableSlot);
        }

        // Vérifier s'il y a un espace disponible entre les réservations
        if (i < reservations.length - 1) {
            const nextReservationStart = moment(reservations[i + 1]['heure debut'], 'YYYYMMDD HH:mm:ss').toDate();
            if (reservationEnd < nextReservationStart) {
                const availableSlot = {
                    start: reservationEnd,
                    end: nextReservationStart,
                    available: true,
                };
                availableTimeSlots.push(availableSlot);
            }
        }

        // Vérifier s'il y a un espace disponible après la dernière réservation
        if (i === reservations.length - 1 && reservationEnd < endDateTime) {
            const availableSlot = {
                start: reservationEnd,
                end: endDateTime,
                available: true,
            };
            availableTimeSlots.push(availableSlot);
        }
    }

    // Filtrer les créneaux disponibles pour inclure uniquement les créneaux de 30 minutes
    const availableTimeSlotsFiltered = availableTimeSlots.filter(
        (slot) => {
            const slotDuration = moment(slot.end).diff(slot.start, 'minutes');
            return slotDuration >= timeSlotDuration;
        }
    );

    return availableTimeSlotsFiltered;
}


// Vérifier si un créneau de temps donné est disponible
function isTimeSlotAvailable(startTime, endTime, availableTimeSlots) {
    for (const slot of availableTimeSlots) {
        if (slot.start <= startTime && slot.end >= endTime) {
            return true;
        }
    }
    return false;
}



// Formater le créneau horaire au format 'HH:mm'
function formatTime(time) {
    return moment(time).format('HH[h]mm');
}

// // Appeler la fonction principale
// getReservationRoom('TD D', '2023-06-02').then((availabilityTable) => {
//     // Afficher le tableau de disponibilités
//     console.log(availabilityTable);
//     // ...
// }).catch(console.error);

// getReservationTime('TD D', '2023-06-02', '01:00').then((availabilityTable) => {
//     // Afficher le tableau de disponibilités
//     console.log(availabilityTable);
//     // ...
// }).catch(console.error);

// getReservationTime('TD D', '2023-06-02', '02:00').then((availabilityTable) => {
//     // Afficher le tableau de disponibilités pour la durée spécifiée
//     console.log(availabilityTable);
//     // ...
// }).catch(console.error);

// getReservationHourTime('TD D', '2023-06-02', '12:00', '02:00').then((availabilityTable) => {
//     // Afficher le tableau de disponibilités pour la durée spécifiée
//     console.log(availabilityTable);
//     // ...
// }).catch(console.error);

checkReservationHourTime('TD D', '2023-06-02', '08:00', '02:00').then((availabilityTable) => {
    // Afficher le tableau de disponibilités pour la durée spécifiée
    console.log(availabilityTable);
    // ...
}).catch(console.error);