"use strict"

class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(idNumber,firstName,lastName,email,phoneNumber,createdAt){
    this.id = idNumber
    this.first_name = firstName
    this.last_name = lastName
    this.e_mail = email
    this.phone = phoneNumber
    this.created_at = createdAt
  }
}

class PersonParser {

  constructor(file) {
    this._file = file
    this._people = []
  }

  get people() {

  }
  persons(){
    var fs = require('fs')
    var people = fs.readFileSync(this._file,'utf-8')
      .split('\n');
    for (var i = 0; i < people.length; i++) {
      let persons = people[i].split(',')
      let person = new Person(persons[0],persons[1],persons[2],persons[3],persons[4],persons[5])
      this._people.push(person)
    }
    return this._people
  }

  addPerson() {
    let addPeople = new Person
  }

}
let parser = new PersonParser('people.csv')
console.log(parser.persons()[0].id);

// console.log(`There are ${parser.people().size()} people in the file '${parser.file}'.`)
