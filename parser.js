const fs = require ('fs')

class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(id,firstname,lastname,email,phone,createdat){
    this.no=id
    this.first_name=firstname
    this.last_name=lastname
    this.email=email
    this.phone=phone
    this.created_at=createdat
  }
}


class PersonParser {

  constructor(file) {
    this._file = file
    this._people = []
  }

  readFile() {
    let readfile= fs.readFileSync(`${this._file}`,'utf-8').split('\n');
    return readfile;
  }

  convertAllPeople() {

    let data = this.readFile();

    for(var i=0; i< data.length; i++){
      var dataDetails = data[i].split(",");
      let person = new Person(dataDetails[0],dataDetails[1],dataDetails[2],dataDetails[3],dataDetails[4],dataDetails[5])
      this._people.push(person)
    }
    
  }

  get people(){
   let obj ={
     data : this._people,
     size : this._people.length
   }
    return obj
  }

  addPerson(id,firstname,lastname,email,phone,createdat) {
    this._people.push(new Person(id,firstname,lastname,email,phone,createdat))
  }

  save(){
    var str =""
    for(var i=0; i<this._people.length; i++){
      var joinValues=Object.values(this._people[i]).join(",")
      str+=joinValues+"\n"
    }

    fs.writeFileSync('people.csv',str, 'utf8')
    
  }

}

let parser = new PersonParser('people.csv');
parser.convertAllPeople()
parser.addPerson(123,"asasasas","bbbbb","sdsasda@mail.com","343423423", new Date())
console.log(parser.people.data[201])
parser.save()
// var today = new Date();
// var dd = today.getDate().toString()
// var mm = (today.getMonth()+1).toString()
// var yyyy = today.getFullYear().toString()

// parser.getPeople()
// parser.save()
// var newPerson = {
//   id: 201,
//   fir
// }
// parser.getTodayDate()
// let objPerson = new Person()
// parser.addPerson(objPerson)

console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)
