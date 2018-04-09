"use strict"

class Person {
  constructor(idParam, firstName, lastName, emailParam, phoneParam, created_atParam) {
    this.id = idParam;
    this.first_name = firstName;
    this.last_name = lastName;
    this.email = emailParam;
    this.phone = phoneParam;
    this.created_at = created_atParam;
  }
}

class PersonParser {

  constructor(file) {
    this.file = file
    this._people = [];
  }

  getPeople() {
    var fs = require('fs');
    var data = fs.readFileSync(this.file).toString().split('\n');
    for (var i = 0; i < data.length; i++) {
      data[i] = data[i].split(',');
      data[i] = new Person(data[i][0], data[i][1], data[i][2], data[i][3], data[i][4], data[i][5]);
      this._people.push(data[i])
    }
    return this
  }

  addPerson(person) {
    this._people.push(person);
    return this;
  }

  save() {
    let str = '';
    for (var i = 0; i < this._people.length; i++) {
      let obj = this._people[i];
      obj = `${obj.id},${obj.first_name},${obj.last_name},${obj.email},${obj.phone},${obj.created_at}`
      str += obj + '\n';
    }
    const fs = require('fs');
    return fs.writeFileSync(this.file, str);
  }

  get size() {
    return this._people.length - 2;
  }
}


let parser = new PersonParser('people.csv')
var initialData = parser.getPeople();
// var id = Number(initialData[initialData.length - 1].id) + 1
// var restu = new Person(id, 'restu', 'utomo', 'restu_u@outlook.com', '080989999', new Date().toISOString())
// parser.addPerson(restu).save();




console.log(`There are ${parser.size} people in the file '${parser.file}'.`)
