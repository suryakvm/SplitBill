import { Person } from '../models/person.model';
import { EventEmitter } from '@angular/core';

export class PersonService{
persons: Person[] = [];
personNames: string[] = [];

getPersons(){
  return this.persons;
}
addPersons(person: Person){
  this.persons.push(person);
  console.log("Person was pushed inside the Person Service persons Array");
  this.personNames.push(person.name);
  console.log(this.personNames);
}
}
