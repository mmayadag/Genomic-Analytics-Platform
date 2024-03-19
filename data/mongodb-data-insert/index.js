const fs = require('fs');
const csv = require('csv-parser');
const { MongoClient } = require('mongodb');

require('dotenv').config();

const uri = process.env.MONGODB_URI;
const database = process.env.MONGODB_DATABASE;
const collection = process.env.MONGODB_COLLECTION;
const client = new MongoClient(uri);

async function run() {
    try {
        await client.connect();
        const database = client.db(database);
        const collection = database.collection(collection);

        const records = [];

        fs.createReadStream('../simple_demo.tsv')
            .pipe(csv({ separator: '\t' }))
            .on('data', (data) => {
                data.dataSet = 'sample_demo';
                records.push(data)
            })
            .on('end', async () => {
                await collection.insertMany(records);
                console.log('TSV data has been successfully imported into MongoDB!');
                client.close();
            });
    } catch (e) {
        console.error(e);
    }
}

run();