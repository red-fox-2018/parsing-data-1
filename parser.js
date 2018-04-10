/*jshint esversion:6*/
const fs = require('fs');

class Person {
  constructor(id,first_name,last_name,email,phone,created_at){
    this.id = id;
    this.firstName = first_name;
    this.lastName = last_name;
    this.email = email;
    this.phone = phone;
    this.created_at = created_at;
  }

}

class PersonParser {
  constructor(file) {
    this._file = file;
    this._people = this.readData();
  }

  readData(){
    let data = fs.readFileSync('./people.csv','utf8').split('\n');
    var dataOrang = [];

    for(var i = 0 ; i < data.length - 1 ;i++){
      let tmpPerson = data[i].split(',');
        var updateDataPerson = new Person(tmpPerson[0],tmpPerson[1],tmpPerson[2],tmpPerson[3],tmpPerson[4],tmpPerson[5]);
        dataOrang.push(updateDataPerson);
    }
    return dataOrang;
  }

  get people() {
    return this._people;
  }

  addPerson(obj) {
    this._people.push(obj);
  }

  save(){
    let dataPerson = [];
    for(let i = 0 ; i < this._people.length ; i++){
      let newDataPerson = [];
      newDataPerson.push(this._people[i].id);
      newDataPerson.push(this._people[i].firstName);
      newDataPerson.push(this._people[i].lastName);
      newDataPerson.push(this._people[i].email);
      newDataPerson.push(this._people[i].phone);
      newDataPerson.push(this._people[i].created_at);
      dataPerson.push(newDataPerson);
    }

    // console.log(dataPerson);
    fs.writeFileSync(this._file, dataPerson.join('\n'), 'utf8');
  }


}

let parser = new PersonParser('people.csv');

parser.addPerson(new Person(203,'James','Bond','jamesbond@email.com','08127672384',new Date()));
// parser.addPerson(new Person(204,'Joko','Bodo','jamesbond@email.com','08127672384',new Date()));
// console.log(parser.readData())
parser.save();
