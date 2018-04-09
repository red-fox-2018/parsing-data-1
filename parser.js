"use strict"

class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?

  constructor(id, firstName, lastName, email, phone, createAt) {

    this._id = id
    this._firstName = firstName
    this._lastName = lastName
    this._email = email
    this._phone = phone
    this._createAt = createAt
  }
}

class PersonParser {

  constructor(file) {
    this._file = file
    this._people = []
  }

  convert() {

    let fileCSV = fs.readFileSync(this._file).toString()
    let rows = fileCSV.split('\n')
    for (let i = 1; i < rows.length-1; i++) {
      
      let dataRow = rows[i].split(',')
      
      this._people.push(dataRow)
    }

    return this._people
  }

  get people () {

    let obj = {
      people: this._people,
      size: this._people.length
    }

    return obj
  }

  addPerson(data) {

    let dataUser = []

    for (let property in data) {

      dataUser.push(data[property])  
    }

    this._people.push(dataUser)
  }

  save() {

    let result = []
    
    for (let i = 0; i < this._people.length; i++) {
      
        let dataJoin = this._people[i].join(',')
        result.push(dataJoin)
    }
    
    fs.writeFileSync('people.csv', result.join('\n'))
  }

}

const fs = require('fs')
let parser = new PersonParser('people.csv')
parser.people
let countId = parser._people.length + 1
let date = new Date()
parser.addPerson(new Person(countId, 'Si', 'Doel', 'blabla@bla.com', '08697897793', date))
// console.log(parser.readFile())
parser.save()

console.log(`There are ${parser.people.size} people in the file '${parser._file}'.`)

