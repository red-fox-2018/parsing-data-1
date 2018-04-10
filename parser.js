// "use strict"
const fs = require('fs')

class Person {
  constructor(id, first_name, last_name, email, phone, created_at) {
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
    this._people = this.parseData()
  }

  get people() {
    var obj ={size :this._people.length-1,people:this._people}
    return obj
  }

  get file() {
    return this._file
  }




  parseData() {
    var csv = fs.readFileSync(this._file, 'utf8')
    var str = csv.split('\n')
    var resultMultiDimension = []

    for (var i = 0; i < str.length-1; i++) {
      var forObj = str[i].split(',')
      var obj = new Person(forObj[0], forObj[1], forObj[2], forObj[3], forObj[4], forObj[5])
      resultMultiDimension.push(obj)
    }

    return resultMultiDimension;
  }

  addPerson(person) {
    this._people.push(person)
  }

  save() {
    var lineResult = []
    for (var i = 0; i < this._people.length; i++) {
      lineResult.push([this._people[i].id,this._people[i].first_name ,this._people[i].last_name,this._people[i].email,this._people[i].phone,this._people[i].created_at])

    }
    var finalResult = lineResult.join('\n')
    fs.writeFileSync(this._file, finalResult, 'utf8')
  }

}

let parser = new PersonParser('people.csv')
 var newId= Number(parser.people.people[parser.people.people.length-1].id)+1

parser.addPerson(new Person(newId, 'Bram', 'Prasetyo', 'bramprasetyop@gmail.com', 8786 - 9876 - 2344, new Date().toISOString()))
parser.people.people
parser.save()

console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)
