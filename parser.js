// import { parse } from "url";

// "use strict"

class Person {
  constructor(id,first_name,last_name,email,phone,created_at){
    this.id = id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.phone = phone;
    this.created_at = created_at;
  }
}

class PersonParser {

  constructor(file) {
    this.file = file
    this.people = []
  }

  getPeople() {
    return this.people
  }

  parsePerson() {
    const fs = require('fs');
    let peoples = fs.readFileSync(this.file).toString().split('\n')
    let data = this.getData(peoples)
    for(let i=0;i<data.length;i++){
      if(i==0){
        this.people.push(new Person('id',data[i][1],data[i][2],data[i][3],data[i][4],'created_at'))
      }
      else{
        var person = new Person(i,data[i][1],data[i][2],data[i][3],data[i][4],new Date())
        this.people.push(person)
      } 
    }
    return this
  } 

  addPerson(people){
    this.people.push(people)
    return this
  } 

  getData(peoples){
    let data = []
    for(let i=0;i<peoples.length;i++){
      data.push(peoples[i].split(','))
    }
    return data
  }

  save(){
    let str = ''
    for(let i=0;i<this.people.length;i++){
      str+=this.people[i].id + ','
      str+=this.people[i].first_name + ','
      str+=this.people[i].last_name + ','
      str+=this.people[i].email + ','
      str+=this.people[i].phone + ','
      str+=this.people[i].created_at + '\n'
    }
    const fs = require('fs');
    let write = fs.writeFileSync(this.file, str, 'utf8')
  }

}


let parser = new PersonParser('people.csv')
parser.parsePerson().getPeople()
let add_person = new Person(parser.people.length,'Renal','Apriansyah','reyapr@gmail.com',08080880008,new Date())
parser.addPerson(add_person)
parser.save()



// console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)
