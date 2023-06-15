require('dotenv').config();
const { MongoClient, Collection } = require('mongodb');
const client = new MongoClient(process.env.MONGO_URL);


async function deleteResa(salle, heureDebut, heureFin) {
    try {
        await client.connect();
        const database = client.db("classroomReservation");
        const collection = database.collection("reservation");
        const query = { Salle: salle, 'heure debut': heureDebut, 'heure fin': heureFin };

        const result = await collection.deleteOne(query);
        if (result.deletedCount === 1) {
            console.log("Successfully deleted one document.");
        } else {
            console.log("No documents matched the query. Deleted 0 documents.");
        }
    } finally {
        await client.close();
    }
}

module.exports = { deleteResa };
// const test = run('TD D', '20230602 10:00:00', '20230602 12:00:00')
// console.log(test);