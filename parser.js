"use strict"
const fs = require('fs');

class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(id, first_name, last_name, email, phone, created_at) {
    this.id = id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.phone = phone;
    this.created_at = created_at;
  }
}

class PersonParser {

  constructor(file) {
    this._file = file
    this._people = this.readFile();
  }

  get people() {
    let obj = {
      people: this._people,
      size: this._people.length - 1
    }
    return obj;
  }

  get file() {
    return this._file;
  }


  readFile() {
    let file = fs.readFileSync(this._file, 'utf8').split('\n');
    let dataPerson = [];
    let people = [];

    file.forEach(person => {
      dataPerson.push(person.split(','));
    })

    for (let i = 0; i < dataPerson.length; i++) {
      let objTemp = {};
      for (let j = 0; j < dataPerson[i].length; j++) {
        objTemp[dataPerson[0][j]] = dataPerson[i][j];
      }

      people.push(new Person(objTemp.id, objTemp.first_name, objTemp.last_name, objTemp.email, objTemp.phone, objTemp.created_at));
    }
    return people;
  }

  addPerson(obj) {
    obj.id = String(parseInt(this._people[this._people.length - 1].id) + 1);

    this._people.push(obj);
  }

  save() {
    let result = [];

    this._people.forEach((person, index) => {
      result.push([person.id, person.first_name, person.last_name, person.email, person.phone, person.created_at]);
    });

    fs.writeFileSync('people.csv', result.join('\n'));
  }
}

let parser = new PersonParser('people.csv')

parser.addPerson(new Person('', 'ihsan', 'maulana', 'ihsanmaulana5@gmail.com', '+628121506318', new Date()));
parser.save();

console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`);