const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');
const { findOneAndUpdate } = require('./models/Recipe.model');
// const { modelName } = require('./models/Recipe.model');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    let chocCake = {
      title:'Chocolate cake',
      level: 'Easy Peasy',
      ingredients:["1/2 cup light brown sugar",
    "1 large egg",
    "2 tablespoons milk",
    "1 1/4 teaspoons vanilla extract",
    "2 cups semisweet chocolate chips" ],
    cusine:'portuguese',
    dishType:'dessert',
    image:"https://www.istockphoto.com/de/foto/süße-hausgemachte-dunkle-schokolade-torte-gm904337728-249400791",
    duration: 30, 
    creator: "Daiany"};
  
    Recipe.create(chocCake)
    .then((result)=>{console.log(result.title)})
    .then(()=>{
      return Recipe.insertMany(data).then((allRecipe)=>{
        for(let i= 0; i < allRecipe.length; i++){
          console.log(allRecipe[i].title);
        }})
    })
    .then(() => {
      return Recipe.findOneAndUpdate({title: "Rigatoni alla Genovese"}, {duration:100});
       }).then((updated)=>{
         console.log('updated', updated) 
         return Recipe.deleteOne({title:"Carrot Cake"});
       }).then(()=> {console.log('deleted')})
       
       

  .catch(error => {
    console.error('Error connecting to the database', error);
  });
 
  
    })
  //.finally(()=>{
  //   mongoose.connection.close();
  //  }).then(()=>{
  //    console.log("closed!")
  //  })