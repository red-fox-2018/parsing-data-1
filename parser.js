"use strict"

const fs = require("fs");

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

  addPerson(firstName, lastName, email, phone, date) {
    let id = this._getLastId();
    let person = new Person(id, firstName, lastName, email, phone, date);
    this._people.push(person);
  }

  _getLastId() {
    return Number(this._people[this.people.length - 2].id) + 1;
  }

  save() {
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

// driver code ---------------------------------------------------------------------------------

let parser = new PersonParser('people.csv')

parser.addPerson('Umam', 'Iswanul', 'umam@email.com', '123-4567-98', new Date().toISOString());

parser.save();

// console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)
