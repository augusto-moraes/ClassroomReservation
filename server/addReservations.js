require('dotenv').config();
const { MongoClient, Collection } = require('mongodb');
const client = new MongoClient(process.env.MONGO_URL);

// Sélection de la base et la collection
const db = client.db('classroomReservation');
const collection = db.collection('reservation');

async function addResa(salle, cours, heureDebut, heureFin, user, participants, nb, portee) {
    try {

        await client.connect();

        console.log('connection OK !');

        const insertData = await collection.insertMany([
            {               
                Salle: salle,
                Cours: cours,
                'heure debut': heureDebut,
                'heure fin': heureFin,
                Utilisateur: user,
                Participants: participants,
                NombrePersonne: nb,
                Porte: portee
            }
        ])

        console.log('réservation ajoutée ! =>', insertData);

    } catch(e) {throw e; }
    
    return 'done !'
}

//appel de la fonction addResa
addResa ('TD A', "LALALA", "20230530 08:00:00", "20230530 10:00:00", "", ['arthur', 'bastien'], 3, "INSA")
    .then(console.log)
    .catch(console.error)
    .finally(client.close())