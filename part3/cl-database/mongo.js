const mongoose = require('mongoose');

class Args {
  constructor(password, name, number) {
    this.password = password;
    this.name = name;
    this.number = number;
  }
}

const args = new Args(...process.argv.splice(2));

const url = `mongodb+srv://daczecha:${args.password}@cluster0.vkc2e.mongodb.net/persons?retryWrites=true&w=majority`;

mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model('Person', personSchema);

if (args.password && args.name === undefined && args.number === undefined) {
  Person.find({}).then((result) => {
    console.log('phonebook');
    result.forEach((person) => console.log(`${person.name} ${person.number}`));

    mongoose.connection.close();
  });
} else if (args.password && args.name && args.number) {
  const person = new Person({
    name: args.name,
    number: args.number,
  });

  person.save().then((result) => {
    console.log(`added ${args.name} number ${args.number} to phonebook`);
    mongoose.connection.close();
  });
} else {
  console.log('unknown command');
}
