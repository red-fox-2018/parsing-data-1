"use strict"
let fs=require("fs");

class Person {
  constructor(id,first_name,last_name,email,phone){
    this.id = id
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.phone = phone;
    this.created_at = new Date();
  }
}

class PersonParser {

  constructor(file) {
    this._file = file;
    this._people = [];
  }

  get people() {
    let add = this.addPerson();
    return add;
  }

  writeFile(){
    let save = this.converttostring();
    let fs=require("fs");
    let added = fs.writeFile(this._file,save);
  }

  converttostring(){
    let temp = 'id,first_name,last_name,email,phone,created_at\n'
    for(let i=0;i<this._people.length;i++){
      temp += this._people[i].id + ','
      temp += this._people[i].first_name + ','
      temp += this._people[i].last_name + ','
      temp += this._people[i].email + ','
      temp += this._people[i].phone + ','
      temp += this._people[i].created_at + '\n'
    }
    return temp;
  }

  addPerson(person){
    person.id = this._people[this._people.length-1].id+1
    this._people.push(person);
    return this._people;
  }

  parsingCSVFile(){    
    let firststep = fs.readFileSync(this._file,'utf-8').trim().split('\n');
    let secondstap = '';
    
    // console.log(firststep[200]);

    for(let i=1;i<firststep.length;i++){
      secondstap = firststep[i].split(',');
      let person = new Person();
      person = new Person(i,secondstap[1],secondstap[2],secondstap[3],secondstap[4]);
      this._people.push(person);
    }
    return this._people
  }

}

//========drive code==============//
let parser = new PersonParser('people.csv');

parser.parsingCSVFile()

let person = new Person(0,'sony', 'rezki', 'jd@gmail.com', '0928383')
parser.addPerson(person)
parser.writeFile()

console.log(`There are ${parser._people.length} people in the file '${parser._file}'.`)