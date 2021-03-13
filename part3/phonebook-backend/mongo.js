const mongoose = require('mongoose');

if (process.argv.length <= 2 || process.argv.length === 4 || process.argv.length >= 6) {
  console.log('Please provide the password as an argument: node mongo.js <password>\nOptionally provide a name and number to add a person to the database: node mongo.js <password> <name> <number>');
  process.exit(1);
}

const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];

const url = `mongodb+srv://ruel:${password}@cluster0.e31yt.mongodb.net/phonebook-app?retryWrites=true&w=majority`;

mongoose
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .catch((error) => {
    console.log('Error connecting to MongoDB', error.message);
  });

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model('Person', personSchema);

if (process.argv.length === 3) {
  console.log('Phonebook:');
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(`${person.name} ${person.number}`);
    });
    mongoose.connection.close();
  });
}

if (process.argv.length === 5) {
  const person = new Person({
    name: name,
    number: number,
  });

  person.save().then(result => {
    console.log(`Added ${result.name} with number ${result.number} to the phonebook`);
    mongoose.connection.close();
  });
}



