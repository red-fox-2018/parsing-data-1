/*jshint esversion:6*/
/*jshint -W097*/
/*jshint -W117*/

"use strict";
const fs = require('fs');


class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(id, first_name, last_name, email, phone, created_at) {
    this.id = id;
    this.firstName = first_name;
    this.lastName = last_name;
    this.email = email;
    this.phone = phone;
    this.createdAt = created_at;
  }
}

class PersonParser {

  constructor(file) {
    this._file = file;
    this._people = this.convert();
  }

  get people() {
    let obj = {
      people: this._people,
      size: this._people.length - 1
    };
    return obj;
  }

  convert() {
    let data = fs.readFileSync(this._file, 'utf8').trim().split('\n');
    let convert = [];
    let result = [];

    for (let i = 0; i < data.length; i++) {
      convert.push(data[i].split(','));
    }

    for (let i = 0; i < convert.length; i++) {
      let obj = {};
      for (let j = 0; j < convert[i].length; j++) {
        obj[convert[0][j]] = convert[i][j];
      }
      result.push(new Person(obj.id, obj.first_name, obj.last_name, obj.email, obj.phone, obj.created_at));
    }
    return result;
  }

  addPerson(obj) {
    obj.id = String(+(this._people[this._people.length - 1].id) + 1);
    return this._people.push(obj);
  }

  save() {
    let arr = [];
    for (let i = 0; i < this._people.length; i++) {
      arr.push(Object.values(this._people[i]).join(','));
    }

    arr = arr.join('\n');
    return fs.writeFileSync('people.csv', arr);
  }
}

let parser = new PersonParser('people.csv');

console.log(parser.people);
parser.addPerson(new Person('', 'david', 'joshua', 'davidjoshua@yahoo.com', '081295597000', new Date()));
parser.save();
console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`);
