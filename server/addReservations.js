require('dotenv').config();
const { MongoClient } = require('mongodb');
const client = new MongoClient(process.env.MONGO_URL);

// Sélection de la base et la collection
const db = client.db('classroomReservation');
const collection = db.collection('reservation');



async function addResa(salle, cours, heureDebut, heureFin, utilisateur, participants, nombrePersonne, porte) {
    try {
        await client.connect();

        const reservation = {
            Salle: salle,
            Cours: cours,
            'heure debut': heureDebut,
            'heure fin': heureFin
        };

        if (utilisateur) {
            reservation.Utilisateur = utilisateur;
        }

        if (participants) {
            reservation.Participants = participants;
        }

        if (nombrePersonne) {
            reservation.NombrePersonne = nombrePersonne;
        }

        if (porte) {
            reservation.Porte = porte;
        }

        const insertData = await collection.insertOne(reservation);
        console.log(insertData);

        console.log('Réservation ajoutée:', insertData.ops);
        return 'done';
    } catch (error) {
        throw error;
    } finally {
        await client.close();
    }
}


//appel de la fonction addResa
// addResa('TD A', "LALALA", "20230529 16:00:00", "20230529 18:00:00", "toto", ['arthur', 'bastien'], 3, "INSA")
//     .then(console.log)
//     .catch(console.error)
//     .finally(client.close())


module.exports = { addResa };