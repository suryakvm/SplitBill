import { Http } from '@angular/http';
import { Person } from '../models/person.model';
import { Injectable } from '@angular/core';
import { Result } from '../models/result.model';
import { Headers } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()
export class SplitBillService{

url: string = "http://localhost:8081/service/calculate";
//url: string = "https://splitbillservices.run.aws-usw02-pr.ice.predix.io/service/calculate"
results: Result[];
headers: Headers;

constructor(private http: Http){}

calculate(persons: Person[]): Observable<any>{
  return this.http.post(this.url,persons)
  .map(res => res.json());
}

// private extractData(res: any) {
//    var body = res.json();  // If response is a JSON use json()
//    if (body) {
//        return body.data || body;
//     } else {
//        return {};
//     }
// }

// private handleErrorObservable (error: Response | any) {
// 	console.error(error.message || error);
// 	return Observable.throw(error.message || error);
//     }


}
