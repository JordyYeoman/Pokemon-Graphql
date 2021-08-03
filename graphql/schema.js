const { gql } = require('apollo-server');

module.exports = gql`
    type Query {
    info: String!
    feed: [Link!]!
    getAllPokemon: [Pokemon]!
    getAllStrongPokemon: [Pokemon]!
    getAllWeakPokemon: [Pokemon]!
  }

  type Pokemon {
    # id: ID!
    Number: Int!
    Name: String!
    Base_Total: Int!
  }
  
  type Mutation {
    post(url: String!, description: String!): Link! 
    createPokemon(pokemon: CreatePokemon): Pokemon
    deletePokemon(pokemon: DeletePokemon): String
    deleteAllPokemon(pokemon: DeleteAllPokemon): String
    updatePokemon(pokemon: UpdatePokemon): String
    updateAllPokemon(pokemon: UpdateAllPokemon): String
  }

  input CreatePokemon {
    # id: ID!
    Name: String!
    Number: Int!
    Base_Total: Int!
  }

  input UpdatePokemon {
    Name: String!
    UpdateName: String!
  }

  input UpdateAllPokemon {
    Current_Base_Total: Int!
    New_Base_Total: Int!
  }
  
  input DeletePokemon {
    Name: String!
  }
  input DeleteAllPokemon {
    Base_Total: Int!
  }

  type Link {
    id: ID!
    description: String!
    url: String!
  }
`