# MONGO db data insert

# How to run
1. create .env file
```bash
cp .env.example .env
```
2. update mongo url

| Variable   | Value                                                    |
|------------|----------------------------------------------------------|
| MONGODB_URI | mongodb://localhost:27017 |
| MONGODB_DATABASE | mmydatabase |
| MONGODB_COLLECTION | datasets |



## run with docker
1. image build
```bash
docker build -t mongodb-data-insert .
```

2. container run
```bash
docker run --name mongo-data-insert-container mongodb-data-insert
```

## run locally

1. install dependencies
```bash
pnpm install
```

2. run 
```bash
node index.js
```