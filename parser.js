"use strict"
const fs = require('fs')

class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(id, first_name, last_name, email, phone, created_at){
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

  generate_file(){
    let read_data = fs.readFileSync(this._file, 'utf8')
    let data = read_data.split('\n')

    for(let i = 0; i < data.length; i++){
      let tmp = data[i].split(',')
      let person = new Person(tmp[0], tmp[1], tmp[2], tmp[3], tmp[4], tmp[5])
      this._people.push(person)
    }
    return this
  }

  get people() {
    return this._people
  }

  get file(){
    return this._file
  }

  add_person(first_name, last_name, email, phone) {
    let id = Number(this._people[this._people.length-2].id) + 1
    let created_at = new Date()
    let new_person = new Person(id, first_name, last_name, email, phone, created_at)
    this._people.push(new_person)

  }

  save() {
    let result = []

    for(let i = 0; i < this._people.length; i++){
      let tmp = []

      tmp.push(this._people[i].id)
      tmp.push(this._people[i].first_name)
      tmp.push(this._people[i].last_name)
      tmp.push(this._people[i].email)
      tmp.push(this._people[i].phone)
      tmp.push(this._people[i].created_at)
      result.push(tmp+'\n')
    }
    let str_result = result.join('')
    fs.writeFileSync(this._file, str_result)

  }

}


let parser = new PersonParser('people.csv')
parser.generate_file()
parser.add_person('Oky' ,'Wiliarso', 'okywiliarso@gmail.com', '081293533488')
parser.save()
console.log(`There are ${parser.people.length-2} people in the file '${parser.file}'.`)
// console.log(parser.people[201]);
