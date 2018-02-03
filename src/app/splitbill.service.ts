import { Http } from '@angular/http';
import { Person } from '../models/person.model';
import { Injectable } from '@angular/core';
import { Result } from '../models/result.model';
import { Headers } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()
export class SplitBillService{

//url: string = "http://localhost:8081/service/calculate";
url: string = "https://splitbillservices.run.aws-usw02-pr.ice.predix.io/service/calculate";
results: Result[] = [];
headers: Headers;
imgNumbers: number[] = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42];
randomNumbers: number[] = [];

constructor(private http: Http){}

calculate(persons: Person[]): Observable<any>{
  return this.http.post(this.url,persons)
  .map(res => res.json());
}

calculateBill(persons: Person[]){
  this.results = [];
  debugger;
   var total = 0;
   var avg = 0;
   var  minPerson;
   // var minValue;
//to calculate avg
  for(var i=0;i<persons.length;i++){
    total = total + persons[i].amount;
  }
  avg = total/persons.length;
  //calculated avg
  //change amounts of persons with respect to avg
  for(var i = 0;i< persons.length;i++){
    persons[i].amount =  persons[i].amount - avg;
  }
//changed persons
// minValue = -1 * this.minPerson(persons).amount;
do{
for(var i=0;i<persons.length;i++){
  minPerson = this.minPerson(persons);
  var minKey = minPerson.name;
    var minValue = -1 * minPerson.amount;
    var name = persons[i].name;
    var value = persons[i].amount;
    if(value > 0){
      if(minValue >= value){
        for(var j=0;j<persons.length;j++){
          if(persons[j].name === minKey)
            persons[j].amount = -1 * (minValue - value);
        }
        if(Math.round(value) != 0){
          var result = new Result(minKey,name,value,"","");
          this.results.push(result);
        }
        persons[i].amount = 0;
        minPerson = this.minPerson(persons);
      }
      else{
        persons[i].amount = value - minValue;
        if(Math.round(minValue) != 0){
          var result = new Result(minKey,name,minValue,"","");
          this.results.push(result);
        }
        for(var k=0;k<persons.length;k++){
          if(persons[k].name === minKey)
            persons[k].amount = 0;
        }
        minPerson = this.minPerson(persons);
      }
    }
}

}while(Math.round(minPerson.amount) != 0);

console.log(JSON.stringify(this.results));
}

minPerson(persons: Person[]): Person{
  var minValue = persons[0].amount;
  var minPerson = persons[0].name;
  var minImgName = persons[0].imgName;
  for(var i =1;i<persons.length;i++){
      if(persons[i].amount< minValue){
        minValue = persons[i].amount;
        minPerson = persons[i].name;
        minImgName = persons[i].imgName;
      }
  }
  var person = new Person(minPerson,minValue,minImgName);
  return person;
}



}
