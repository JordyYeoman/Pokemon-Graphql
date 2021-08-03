const { AuthenticationError } = require('apollo-server');

const Pokemon = require('../models/Pokemon.model');

module.exports = {
    Query: {
      info: () => `This is the API of a Hackernews Clone`,
      feed: () => links,
      getAllPokemon: async ()=> {
        try {
            // const email = await user;
            allPokemon = await Pokemon.find().sort({ Number: -1 });
            //console.log(allPokemon[0].Name);
            return allPokemon;
        } catch (err) {
            throw new Error(err);
            //throw new AuthenticationError('You must be logged in to do this');
        }
      },
      getAllStrongPokemon: async ()=> {
        try {
          strongPokemon = await Pokemon.find({ Base_Total: { $gte: 490 } });
          //console.log(strongPokemon);
          return strongPokemon;
        }
        catch (err) {
          throw new Error(err);
        }
      },
      getAllWeakPokemon: async ()=> {
        try {
          weakPokemon = await Pokemon.find({ Base_Total: { $lte: 200 } });
          //console.log(weakPokemon);
          return weakPokemon;
        }
        catch (err) {
          throw new Error(err);
        }
      }
    },  
    Mutation: {
      createPokemon: async(parent, args, context, info) => {
        const { Name, Number, Base_Total } = args.pokemon;
        const pokemon = new Pokemon({ Name, Number, Base_Total });
        await pokemon.save();
        return pokemon;
      },
      deletePokemon: async (parent, args, context, info) => {
        const { Name } = args.pokemon;
        await Pokemon.findOneAndDelete({Name}, (err, doc) => {
          if(err) {
            console.log(error);
          } else {
            console.log(doc);
          }
        });
        return `Pokemon with the Name:${Name} has been deleted`
      },
      deleteAllPokemon: async (parent, args, context, info) => {
        let documentInfo;
        const minBaseTotal = args.pokemon.Base_Total;
        await Pokemon.deleteMany(
          // Filter Argument
          { Base_Total: { $gte: minBaseTotal } }, 
          // Log out any errors
          (err, doc) => {
            if (err) {
            console.log("Something went wrong when deleting all the data!");
            } else {
              return documentInfo =  doc;
            }
          });
        return `${documentInfo.n} Pokemon matching the criteria have been found. ${documentInfo.deleteCount} Pokemon have been deleted.`
      },
      updatePokemon: async(parent, args, context, info) => {
        const OldName = args.pokemon.Name;
        const UpdateName = args.pokemon.UpdateName;
        console.log(OldName);
        console.log(UpdateName);
        await Pokemon.findOneAndUpdate(
          // Filter Argument
          { Name: OldName }, 
          // Update Argument
          { Name: UpdateName }, 
          // Set to true to return the updated document
          { returnOriginal: true }, 
          // Log out any errors
          (err, doc) => {
            if (err) {
            console.log("Something went wrong when updating data!");
            } else {
              console.log('doc: ' + doc);
            }
          });
        return `Pokemon with the name:${ OldName } has been updated`
      },
      updateAllPokemon: async(parent, args, context, info) => {
        let documentInfo;
        const currentBaseTotal = args.pokemon.Current_Base_Total;
        const newBaseTotal = args.pokemon.New_Base_Total;
  
        await Pokemon.updateMany(
          // Filter Argument
          { Base_Total: { $gte: currentBaseTotal } }, 
          // Update Argument
          { "$set":{ "Base_Total": newBaseTotal } }, 
          // Log out any errors
          (err, doc) => {
            if (err) {
            console.log("Something went wrong when updating all the data!");
            } else {
              return documentInfo =  doc;
            }
          });
        return `${documentInfo.n} Pokemon matching the criteria have been found. ${documentInfo.nModified} Pokemon have been updated.`
      }
    },
  }