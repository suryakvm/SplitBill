import { Result } from '../models/result.model';
import { EventEmitter } from '@angular/core';

export class ResultService{
public results: Result[] = [];

getResults(){
  return this.results;
}

makeResults(results: Result[]){
  this.results = results;
}

}
