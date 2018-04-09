"use strict"

class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(objPerson) {
    this.id = objPerson.id
    this.firstName = objPerson.firstName
    this.lastName = objPerson.lastName
    this.email = objPerson.email
    this.phone = objPerson.phone
    this.created_at = objPerson.created_at
  }
}

class PersonParser {
  constructor(file) {
    this._file = file
    this._people = []
  }

  get file() {
    return this._file;
  }

  get people() {
    var fs = require('fs')
    var data = fs.readFileSync(this._file, 'utf-8')
    var dataPerRow = data.split('\n')
    for(var i = 1; i < dataPerRow.length; i++) {
      var arrData = dataPerRow[i].split(',')
      var objData = {
        id: arrData[0],
        firstName: arrData[1],
        lastName: arrData[2],
        email: arrData[3],
        phone: arrData[4],
        created_at: arrData[5]
      }
      var person = new Person(objData)
      this._people.push(person)
    }
    return this._people
  }

  size() {
    return this.people.length
  }

  addPerson(objNewPerson) {
    objNewPerson.id = String(parseInt(this._people[this._people.length - 1].id + 1))
    return this._people.push(objNewPerson)
  }

  save() {
    var newPeopleData = []
    for(var i = 0; i < this._people.length; i++) {
      newPeopleData.push(this._people[i].id)
      newPeopleData.push(this._people[i].firstName)
      newPeopleData.push(this._people[i].lastName)
      newPeopleData.push(this._people[i].email)
      newPeopleData.push(this._people[i].phone)
      newPeopleData.push(this._people[i].created_at)
    }
    var completeData = newPeopleData.join('\n')
    var fs = require('fs')
    var saveData = fs.writeFileSync(this._file, completeData, 'utf-8')
    return saveData
  }

}

let parser = new PersonParser('people.csv')
console.log(parser.people);
parser.addPerson(new Person({firstName: 'Jono', lastName: 'Smith', email: "jonos@umail.com", phone: '0813-1234-5678', created_at: new Date()}))
parser.save()
console.log(`There are ${parser.people.length} people in the file '${parser.file}'.`)
