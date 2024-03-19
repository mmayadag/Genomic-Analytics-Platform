<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Genomic-Analytics-API
GenomicAnalyticsPlatform is a powerful tool for genomics research. It provides data retrieval, analysis, and visualization capabilities, with a user-friendly interface and advanced features for gene expression data. The API component of the platform enables seamless integration and access to genomic data for researchers and scientists.

## Description
A backend project built using Node.js and Nest.js, designed to provide a scalable and efficient server-side application framework. It utilizes **openapi**, **swc**, **jest**, **pnpm**, and **mongoose** for enhanced functionality and ease of development. This project serves as a TypeScript starter repository for the Nest framework.


[Nest](https://github.com/nestjs/nest) framework TypeScript **Backend** repository.

## 1. Installation

```bash
$ pnpm install
```

## 2. Environment

Create new environment from example file
```bash
$ cp .env.example .env
```
| Variable   | Value                                                    |
|------------|----------------------------------------------------------|
| MONGO_URL  | mongodb://sample:sample@localhost:27017/mydatabase?authSource=admin |
| API_PORT   | 8080                                                     |

Update values

## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```
## API url
API Server runs here 👉 http://localhost:8080

### Swagger
![Swagger](./docs/api-docs.png)

http://localhost:8080/api


## Test

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## License

Nest is [MIT licensed](LICENSE).

## Author

Murat Mayadağ