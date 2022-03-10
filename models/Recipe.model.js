const mongoose = require('mongoose');
const Schema = mongoose.Schema;



// function arrLengthFactory(strArray, length) {
//   for (let i = strArray.length; i < length; i++) {
//     strArray.push(defaultPadding);
//   }
//   return strArray;
// }

const recipeSchema = new Schema({
  // TODO: write the schema
  title :{
    type: String,
    required: true,
    unique: true,
  },

  level: {
    type: String,
    enum: ['Easy Peasy', 'Amateur Chef' , 'UltraPro Chef'],
    },
      ingredients: {
      type: [String],
    },
      cusine:{
      type: String,
      // required: true,
    },
  
      dishType: {
      type: String,
      enum: ["breakfast","main_course", "soup", "snack", "drink", "dessert","other"],
      //set: arrLengthFactory(enum, 7),
      // validate: {
      //   validator: (levelLength) => {
      //     return levelLength.length === 7;
      //   },
      //   message : "recipe should have 7 dish types!"
      // },
      // default: [],
      },

      image: {
        type: String,
        default: "https://images.media-allrecipes.com/images/75131.jpg",
      },

      duration: {
        type: Number,
        min: 0,
      },

      creator: {
        type: String,
      },

      created: {
        type: Date,
        default: Date.today,
      }
  
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
