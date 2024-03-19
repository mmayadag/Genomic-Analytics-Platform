import pandas as pd
import tensorflow as tf

gpus = tf.config.list_physical_devices('GPU')

if gpus:
    print("GPU available.")
    print("GPU device name:", gpus[0].name)
else:
    print("GPU not available. Using TensorFlow CPU version.")

def encode_gene(gene):
    return sum(ord(char) for char in gene)


def run():
    # Data path and model save path
    data_path = '../simple_demo.tsv'
    model_save_path = './models/predicts-anomaly'

    # Read the data
    data = pd.read_csv(data_path, delimiter='\t')
    
    # Prepare the data
    input_data = data[['control_rep1', 'control_rep2', 'control_rep3', 'exper_rep1', 'exper_rep2', 'exper_rep3']].values
    labels = data['gene'].apply(encode_gene).values

    # Convert to TensorFlow tensors
    input_tensors = tf.convert_to_tensor(input_data, dtype=tf.float32)
    labels_tensors = tf.convert_to_tensor(labels, dtype=tf.int32)

    # Create a simple neural network model
    model = tf.keras.Sequential([
        tf.keras.layers.Dense(16, input_shape=(6,), activation='relu'),
        tf.keras.layers.Dense(8, activation='relu'),
        tf.keras.layers.Dense(1, activation='sigmoid')
    ])

    # Compile the model
    model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])

    # Train the model
    model.fit(input_tensors, labels_tensors, epochs=5000)

    # Save the model
    model.save(model_save_path)

    print(f'Model saved at {model_save_path}.')

if __name__ == '__main__':
    run()
