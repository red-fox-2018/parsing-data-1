"use strict"
const fs = require('fs');

class Person {
  constructor(id,first_name,last_name,email,phone,created_at){

    this.id = id
    this.first_name = first_name
    this.last_name = last_name
    this.email = email
    this.phone = phone
    this.created_at = created_at

  }
  // Look at the above CSV file
  // What attributes should a Person object have?
}

class PersonParser {

  constructor(file) {
    this._file = file
    this._people = null
  }

  readFile() {
    let peopleData = (fs.readFileSync(`./${this._file}`, 'utf8')).trim().split('\n')
    let splitted = []

    for (var i = 0; i < peopleData.length; i++) {
      splitted.push(peopleData[i].split(','));
    }

    this._people = splitted;

    return splitted
  }

  get people() {

    const obj = {
      data: this._people,
      size : this._people.length
    }

    return obj

  }



  addPerson(obj) {

    const newData = [obj.id, obj.first_name, obj.last_name, obj.email, obj.phone, obj.created_at]

    this._people.push(newData)

    return this._people

  }

  save(){

    const people = this._people
    const file = this.file
    let newFile = []

    for (var i = 0; i < people.length; i++) {
      newFile.push(people[i].join(','))
    }

    newFile = newFile.join('\n')

    fs.writeFileSync('people.csv', newFile)

  }

}

let parser = new PersonParser('people.csv')

parser.readFile()

const getId = String(+(parser.people.data[parser.people.data.length-1][0]) + 1)
const date = String(new Date)

parser.addPerson(new Person (getId,'taufik','hidayat','ovick@gmail.com','098712345678', date))

parser.save()

console.log(`There are '${parser.people.size}' people in the file '${parser._file}'.`)
