"use strict"

class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(arr) {
    this.id = arr[0];
    this.fist_name = arr[1];
    this.last_name = arr[2];
    this.email = arr[3];
    this.phone = arr[4];
    this.created_at = arr[5];
  }
}

class PersonParser {

  constructor(file) {
    this._file = file
    this._people = []
    this.arr = [];
    this.result = ''
  }

  people() {
    var fs = require('fs')
    var csv = fs.readFileSync(this._file).toString().split('\n');
    for (let i in csv) {
      this.arr.push(csv[i].split(','));
    }
    for (let i of this.arr) {
      if (i !== 0) {
        let person = new Person(i)
        this._people.push(person)
      }
    }
    return this
  }

  addPerson() { 
    this.people();
    for (let i in this._people) {
      this._people[i].created_at = new Date().toISOString()
      let str = Object.values(this._people[i]);
      let arr = []
      for (let j of str) {
        arr.push(j)
      }
      this.result+=arr.join(',') + '\n'
    }
    var fs = require('fs')
    return fs.writeFileSync(this._file, this.result);
  }
}

let parser = new PersonParser('people.csv')
console.log(parser)
parser.addPerson()

console.log(`There are ${parser._people.length} people in the file '${parser._file}'.`)
