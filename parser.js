"use strict"
var fs = require('fs')
var data = fs.readFileSync('./people.csv','utf8')
var datas = data.split('\n')



// for (let i = 0; i < dataSplit.length; i++) {
//   //let objData= new person()
// console.log(dataSplit[i].split(','));
// }

class Person {
  constructor(id,first_name,last_name,email,phone,created_at){
    this.id = id
    this.first_name = first_name
    this.last_name = last_name
    this.email = email
    this.phone = phone
    this.created_at =created_at
  }
}

class PersonParser {

  constructor(file) {
    this._file = file
    this._people = this.readfile()
  }
//================================================
  readfile(){
    var data = fs.readFileSync('./people.csv','utf8')
    var dataSplit = data.split('\n')
    let people=[]

    for (let i = 1; i < dataSplit.length-1; i++) {

        let objData= new Person(dataSplit[i].split(',')[0],dataSplit[i].split(',')[1],dataSplit[i].split(',')[2],dataSplit[i].split(',')[3],dataSplit[i].split(',')[4],dataSplit[i].split(',')[5])
        people.push(objData)

    }
    return people
  }
//======================================================


//=======================================================================
  get people() {
    return this._people
  }

  get file(){
    return this._file
  }
//=======================================================================
  addPerson(addNew) {
  this._people.push(addNew)
  }
//========================================================================
  save(){
    let fs = require('fs');
    let data = this._people;
    let dataFile = [];
    //console.log(data[data.length-2].id);
    for(let i=0; i<data.length; i++){
      let string = '';
      string = `${data[i].id},${data[i].first_name},${data[i].last_name},${data[i].email},${data[i].phone},${data[i].created_at}`
      console.log(string);
      dataFile.push(string);
    }
    fs.writeFileSync(this._file, dataFile.join('\n') , 'utf8');
  }
//===========================================================
}

let parser = new PersonParser('people.csv')
//console.log(parser.people[parser.people.length-1].id);
parser.addPerson(new Person(Number(parser.people[parser.people.length-1].id)+1,'ardo','tompel','tompel@olympus.com','98765',new Date()))
//console.log(`There are ${parser.people.length} people in the file '${parser.file}'.`)
parser.save()
