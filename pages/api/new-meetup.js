// Only runs on server, can use credentials here
// /api/new-meetup
import { MongoClient } from 'mongodb'

async function handler(req, res) {
    if (req.method === 'POST') {
        const data = req.body;

        const client = await MongoClient.connect('mongodb+srv://dbadmin:admin123@cluster0.2zys8.mongodb.net/meetups?retryWrites=true&w=majority')
        
        const db = client.db();

        const meetupsCollection = db.collection('meetups');

        const result = meetupsCollection.insertOne(data);
        
        console.log(result);

        res.status(201).json({message: 'Meetup inserted!'});
    }
}

export default handler;