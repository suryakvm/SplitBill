import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Person } from '../../models/person.model';
import { PersonService } from '../../app/person.service';
import { CalculatorPage } from '../calculator/calculator'

/**
 * Generated class for the DetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailsPage {
  name: string ;
  amount : string;
  imgName: string;
  rangeOfNumbers: number[];
  constructor(public personService: PersonService,public navCtrl: NavController, public navParams: NavParams) {
  }


  AddtoList(){
//latestCode
    this.imgName = "assets/imgs/img"+Math.floor((Math.random() * 10) + 1)+".png";
    const person = new Person(this.name, this.amount,this.imgName);
    // console.log("Before pushing:"+this.personService.persons);
    this.personService.addPersons(person);
    // console.log("After pushing:"+this.personService.persons);
    this.navCtrl.pop();

  }

  openCalculator(){
    this.navCtrl.push(CalculatorPage);
  }

}
