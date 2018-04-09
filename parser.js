"use strict"
const fs = require('fs')

class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(id,first_name,last_name,email,phone,created_at){
        this.id = id
        this.first_name = first_name
        this.last_name = last_name
        this.email = email
        this.phone = phone
        this.created_at = created_at
  }
}

class PersonParser {

  constructor(file) {
    this._file = file
    this._people = []
  }

  get people() {
    const peopleRawData = fs.readFileSync(`./${this._file}`,'UTF8','\n').trim()
    let rawSplited = peopleRawData.split('\n')
    for (let i = 0; i < rawSplited.length; i++) {
        this._people.push(rawSplited[i].split(','))
    }
    return this._people
  }

  addPerson(person) {
      let peopleTmp = []
      for(var data in person){
        peopleTmp.push(person[data])
      }
      this._people.push(peopleTmp)
      return this._people
  }

  save(arr){
      let tmpStr = []
      for(let i = 0; i<arr.length;i++){
          tmpStr.push(arr[i].join(','))
      }
      fs.writeFileSync('./people.csv', tmpStr.join('\n'))
  }

}

let parser = new PersonParser('people.csv')
parser.people
let id = +parser._people[parser._people.length-1][0] +1
parser.addPerson(new Person(String(id),'John','Abraham','john@gmail.com','1-123213-4221',new Date()))
id = +parser._people[parser._people.length-1][0] +1
parser.addPerson(new Person(String(id),'Scarlett','Johansson','johansson@gmail.com','1-123213-4221',new Date()))
console.log(parser._people)
parser.save(parser._people)
console.log(`There are ${parser._people.length-1} people in the file '${parser._file}'.`)
