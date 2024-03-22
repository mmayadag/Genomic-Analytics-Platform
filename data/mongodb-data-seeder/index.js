const fs = require('fs');
const csv = require('csv-parser');
const { MongoClient } = require('mongodb');

require('dotenv').config();

const uri = process.env.MONGODB_URI;
const mongoDatabase = process.env.MONGODB_DATABASE;
const mongoCollection = process.env.MONGODB_COLLECTION;
const client = new MongoClient(uri);
console.log('uri', uri);
async function run() {
    try {
        await client.connect();
        console.log('connected');

        const database = client.db(mongoDatabase);
        const collection = database.collection(mongoCollection);

        const datasetName = 'sample_demo';

        const datasetExists = await collection.findOne({ dataSet: datasetName });

        if (!datasetExists) {
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
        } else {
            client.close();
            console.log('The dataset already exists in the collection.');
        }

    } catch (e) {
        client.close();
        console.error(e);
    }
}

run();