"use strict"
const fs = require('fs');
// var dataSplit =data.split(',');

class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(id, first_name, last_name, email, phone, created_at) {
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
    this._file = file
    this._people = this.convert();
  }

  get people() {

    let obj = {data : this._people,
               size : this._people.length}

    return obj
  }

  convert() {
    let data = fs.readFileSync('./people.csv', 'utf8').toString().split('\n');
    let array = [];

    for (var i = 1; i < data.length - 1; i++) {
      let obj = new Person(data[i].split(',')[0], data[i].split(',')[1], data[i].split(',')[2], data[i].split(',')[3], data[i].split(',')[4], Date(data[i].split(',')[5]));
      array.push(obj);
    }
    return array
  }

  // masukkin data ke dalam array this._people (di constructor)
  addPerson(input) {

    return this._people.push(input);
  }

  save() {
    var array = [['id', 'first_name', 'last_name', 'email', 'phone', 'created_at']];
    for (var i = 0; i < this._people.length; i++) {
      let personDetail = [this._people[i].id, this._people[i].first_name, this._people[i].last_name, this._people[i].email, this._people[i].phone, this._people[i].created_at]
      // var string = this._people[i].id+ ','+ this._people[i].first_name+ ','+ this._people[i].last_name+ ','+ this._people[i].email+ ','+ this._people[i].phone+ ','+ this._people[i].created_at
      // console.log(i);
      array.push(personDetail)

    }

    console.log(array[201])
    fs.writeFile('people.csv', array.join('\n') , 'utf8', (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
    });
  }
}

let parser = new PersonParser('people.csv');



// console.log(parser.convert());
parser.addPerson(new Person('201', 'philip', 'bryan', 'cihuyman95@gmail.com', '081254535435', new Date()));
parser.save();
// console.log(parser.people)
console.log(`There are ${parser.people.size} people in the file '${parser._file}'.`)
