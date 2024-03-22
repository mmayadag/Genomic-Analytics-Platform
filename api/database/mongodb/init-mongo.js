// init-mongo.js
db.createUser({
  user: 'mongoadmin',
  pwd: 'myTopSecret',
  roles: [
    {
      role: 'readWrite',
      db: 'mydatabase',
    },
  ],
});
