import pandas as pd

import mlx.core as mlx

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

    # Convert to mlx.core tensors
    input_tensors = mlx.Tensor(input_data, dtype=mlx.float32)
    labels_tensors = mlx.Tensor(labels, dtype=mlx.int32)

    # Create a simple neural network model
    model = mlx.Sequential([
        mlx.Dense(16, input_shape=(6,), activation='relu'),
        mlx.Dense(8, activation='relu'),
        mlx.Dense(1, activation='sigmoid')
    ])

    # Compile the model
    model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])

    # Train the model
    model.fit(input_tensors, labels_tensors, epochs=500)

    # Save the model
    model.save(model_save_path)

    print(f'Model saved to {model_save_path}.')

if __name__ == '__main__':
    run()
