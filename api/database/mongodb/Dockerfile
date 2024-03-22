FROM mongo:latest

# Set environment variables for MongoDB
ENV MONGO_INITDB_ROOT_USERNAME=${MONGO_USERNAME}
ENV MONGO_INITDB_ROOT_PASSWORD=${MONGO_PASSWORD}

RUN pwd

COPY init-mongo.js /docker-entrypoint-initdb.d/
EXPOSE ${MONGO_PORT}

