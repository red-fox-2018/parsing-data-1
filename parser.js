"use strict"

class Person {
  constructor(id, first_name, last_name, email, phone, created_at){
    this.id = id
    this.first_name = first_name
    this.last_name = last_name
    this.email = email
    this.phone = phone
    this.created_at = created_at
  }

  get showdata(){
    return `${this.id} ${this.first_name} ${this.last_name} ${this.email} ${this.phone} ${this.created_at}`
  }
  
}

class PersonParser {

  constructor(file) {
    this._file = file
    this._people = []
  }

  get people() {
    const fs = require("fs")
    let data = fs.readFileSync(this._file).toString().split("\n");

    for (let i=0;i<data.length;i++) {
      data[i] = data[i].split(",");
    }

    for (let i=1;i<data.length;i++) {
      let persons = new Person(data[i][0], data[i][1], data[i][2], data[i][3], data[i][4], data[i][5]);
      this._people.push(persons);
    }

    return this._people
  }

  addPerson(add) {
    this._people.push(add.showdata)
    return this
  }

  save(){
    const fs = require("fs")
    let data = fs.appendFileSync(this._file,"\n"+this._people,"utf-8");
  }
}

let parser = new PersonParser('people.csv')
let tambah = new Person("201", "Soni", "Wijaya Santoso", "soniwijaya59@yahoo.co.id", "081000000", new Date())
parser.addPerson(tambah).save()

console.log(`There are ${parser.people.length-1} people in the file '${parser._file}'.`)
