const tf = require('@tensorflow/tfjs-node');
const Papa = require('papaparse');
const fs = require('fs');

function readTSVFile(filePath) {
  return new Promise((resolve, reject) => {
    const file = fs.createReadStream(filePath);
    Papa.parse(file, {
      header: true,
      delimiter: '\t',
      complete: results => {
        resolve(results.data);
      },
      error: err => reject(err)
    });
  });
}
function encodeGene(gene) {
  return gene.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
}

async function run() {
  const dataPath = '../simple_demo.tsv';
  const modelSavePath = 'models/predicts-anomaly';

  const data = await readTSVFile(dataPath);
  const controls = data.map(item => [parseFloat(item.control_rep1), parseFloat(item.control_rep2), parseFloat(item.control_rep3)]);
  const experiments = data.map(item => [parseFloat(item.exper_rep1), parseFloat(item.exper_rep2), parseFloat(item.exper_rep3)]);

  console.log({ controls: controls.length, experiments: experiments.length })

  const tensors = data.map(item => [
    parseFloat(item.control_rep1),
    parseFloat(item.control_rep2),
    parseFloat(item.control_rep3),
    parseFloat(item.exper_rep1),
    parseFloat(item.exper_rep2),
    parseFloat(item.exper_rep3)
  ]).flat();

  const inputTensors = tf.tensor2d(tensors, [data.length, 6]); // Here, "6" is the number of transformed features

  // Prepare the target values like this
  const encodedLabels = data.map(item => encodeGene(item.gene));


  // Training process
  const labelsTensor = tf.tensor1d(encodedLabels, 'int32');

  // Creating a simple neural network model
  const model = tf.sequential();
  model.add(tf.layers.dense({ units: 16, inputShape: [6], activation: 'relu' }));
  model.add(tf.layers.dense({ units: 8, activation: 'relu' }));
  model.add(tf.layers.dense({ units: 1, activation: 'sigmoid' }));

  // Compiling the model
  model.compile({ optimizer: 'adam', loss: 'binaryCrossentropy', metrics: ['accuracy'] });

  // Training the model
  await model.fit(inputTensors, labelsTensor, { epochs: 500 });

  // Save the model
  await model.save(`file://${modelSavePath}`);

  console.log(`Model saved at ${modelSavePath}.`);
}

run().catch(err => console.error(err));
