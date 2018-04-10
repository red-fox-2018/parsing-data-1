function data(str) {
var result=[]
var hasilAkhir=[]
for (var i = 0; i < str.length; i++) {
  var hasil=str[i].split(',')
  result.push(hasil)
}
// return result;
for (var j = 1; j < result.length; j++) {
  var obj = {}
  for (var k = 0; k < result[0].length; k++) {
    obj[result[0][k]] = result[j][k]
  }
  hasilAkhir.push(obj)
}
return hasilAkhir
}
console.log(data(['id,first_name,last_name,email,phone,created_at', '6,Marshall,Griffith,egestas.Aliquam@Proinvelnisl.edu,1-554-353-5053,2012-09-14T15:57:44-07:00',
  '7,Jonah,Deleon,Donec.tincidunt.Donec@dolor.org,1-782-671-2356,2013-12-13T15:29:38-08:00'
]));
