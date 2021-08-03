const { ApolloServer, AuthenticationError } = require('apollo-server');
const { ApolloServerPluginLandingPageGraphQLPlayground } = require('apollo-server-core');
const mongoose = require('mongoose');

// Authentication
const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');

const client = jwksClient({
  jwksUri: `https://dev--ukro0xw.au.auth0.com/.well-known/jwks.json`
});

function getKey(header, cb){
  client.getSigningKey(header.kid, function(err, key) {
    var signingKey = key.publicKey || key.rsaPublicKey;
    cb(null, signingKey);
  });
}

const options = {
  audience: 'acpTKviiZuelC3YWG5wP3XWcpnAMWlSP',
  issuer: `https://dev--ukro0xw.au.auth0.com/`,
  algorithms: ['RS256']
};




// Graphql
const typeDefs = require('../graphql/schema');
const resolvers = require('../graphql/resolvers');

// Security
require('dotenv').config();

// Database connection
mongoose.connect(`\mongodb+srv://pokemon_trainer_01:G5emseDk5zzDbZwE@cluster0.sp1fd.mongodb.net/pokemon?ssl=true&connectTimeoutMS=5000&retryWrites=true&w=majority`, {useNewUrlParser: true, useUnifiedTopology: true});
// Use the updated MongoDB driver
mongoose.set('useFindAndModify', false);
// Store the connection in a database variable
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Online and Ready Sir');
});

// Start the Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [
    ApolloServerPluginLandingPageGraphQLPlayground({
      // options
    })
  ],
  context: ({ req }) => ({ req })
  // context: ({ req }) => {
  //   // simple auth check on every request
  //   const token = req.headers.authorization;
  //   const user = new Promise((resolve, reject) => {
  //     jwt.verify(token, getKey, options, (err, decoded) => {
  //       if(err) {
  //         return reject(err);
  //       }
  //       resolve(decoded.email);
  //     });
  //   });

  //   return {
  //     user
  //   };
  // },
})

server
  .listen()
  .then(({ url }) =>
    console.log(`Server is running on ${url}`)
  );
  