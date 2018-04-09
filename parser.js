"use strict"

/**
 * @author: Iswanul Umam - Red Fox
 */

// class Person ------------------------------------------------------------

class Person {
  constructor(id, firstName, lastName, email, phone, date) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phone = phone;
    this.date = date;
  }
}

// class PersonParser ---------------------------------------------------------

class PersonParser {

  constructor(file) {
    this._file = file
    this._people = this.readFile();
  }

  readFile() {
    const fs = require("fs");
    let line = fs.readFileSync(this._file, 'utf8');
    let rows = line.split("\n")

    let people = []
    for (let i = 1; i < rows.length; i++) {
      let col = rows[i].split(",");
      let obj = new Person(col[0], col[1], col[2], col[3], col[4], col[5]);
      people.push(obj)
    }
    return people;
  }

  get people() {
    return this._people;
  }

  get file() {
    return this._file;
  }

  get size() {
    // return this.length;
  }

  addPerson(person) {
    this._people.push(person);
    // console.log(this._people);
  }
  save() {
    let fs = require('fs');
    let line = ''

    for (let i = 0; i < this._people.length; i++) {
      if (this._people[i].id) {
        line += this._people[i].id + ',' +
        this._people[i].firstName + ',' +
        this._people[i].lastName + ',' +
        this._people[i].email + ',' +
        this._people[i].phone + ',' +
        this._people[i].date + '\n'
      }
    }
    fs.writeFileSync("people.csv", line, "utf8")
  }
}

let parser = new PersonParser('people.csv')

let newPerson = new Person(201, 'Umam', 'Iswanul', 'umam@email.com', '123-4567-98', new Date().toISOString());
// console.log(person);
parser.addPerson(newPerson);

parser.save();

// console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)
