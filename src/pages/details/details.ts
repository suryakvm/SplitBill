import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Person } from '../../models/person.model';
import { PersonService } from '../../app/person.service';
import { CalculatorPage } from '../calculator/calculator';
import {SplitBillService} from '../../app/splitbill.service';
import { AlertController } from 'ionic-angular';

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
  //randomNumbers: number[];

  constructor(private splitBillService: SplitBillService,public alertCtrl: AlertController,public personService: PersonService,public navCtrl: NavController, public navParams: NavParams) {
  }

  AddtoList(){
    debugger;
    var amntCheckForSpaces = this.amount.toString;
    if(this.name != undefined && this.amount != undefined && this.name.trim() != "" && this.amount.trim() != ""){
    if(this.personService.personNames.indexOf(this.name) === -1){
    var gotRandomNo = false;
    while(gotRandomNo === false){
        var randomNo = Math.floor((Math.random() * 42) + 1);
        if(this.splitBillService.imgNumbers.indexOf(randomNo) != -1)
        gotRandomNo = true;
    }
    console.log(randomNo);
    this.splitBillService.randomNumbers.push(randomNo);
    console.log(this.splitBillService.randomNumbers);
    //this.randomNumbers.push(randomNo);
    this.splitBillService.imgNumbers.splice(this.splitBillService.imgNumbers.indexOf(randomNo),1);
    console.log(this.splitBillService.imgNumbers);
    this.imgName = "assets/imgs/img"+randomNo+".png";
    const person = new Person(this.name, parseFloat(this.amount),this.imgName);
    // console.log("Before pushing:"+this.personService.persons);
    this.personService.addPersons(person);
    // console.log("After pushing:"+this.personService.persons);
    this.navCtrl.pop();
  }
  else{
    this.nameAlreadyAlert();
  }
}
else{
  this.emptyFieldAlert();
}
  }

  nameAlreadyAlert() {
   let alert = this.alertCtrl.create({
     title: 'Choose Another Name',
     subTitle: 'You have already entered this name. Please enter new name',
     buttons: [{
       text: 'Okay',
        role: 'cancel',
        handler: () => {
          this.name = "";
        }
     }]
   });
   alert.present();
 }

 emptyFieldAlert() {
  let alert = this.alertCtrl.create({
    title: 'Provide Details',
    subTitle: 'Person Name or Amount is empty',
    buttons: [{
      text: 'Okay',
       role: 'cancel'
      }]
  });
  alert.present();
}

  openCalculator(){
    this.navCtrl.push(CalculatorPage);
  }

}
