import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { DetailsPage } from '../details/details';
import { Person } from '../../models/person.model';
import { Result } from '../../models/result.model'
import { PersonService } from '../../app/person.service';
import { SplitBillService } from '../../app/splitbill.service';
import { ResultService } from '../../app/result.service';
import { ResultsPage } from '../results/results';
import { Storage } from '@ionic/storage';
import { HomePage } from '../home/home';
import { CalculatorPage } from '../calculator/calculator';
/**
 * Generated class for the MainPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
})
export class MainPage {

  persons: Person[]
  loader:any;
  modifiedData: any;
  person1Img: string;
  person2Img: string;
  

  constructor(public resultService: ResultService,public loadingCtrl: LoadingController, public personService: PersonService,public splitBillService: SplitBillService,public navCtrl: NavController,public storage: Storage, public navParams: NavParams) {
    this.persons =  this.personService.getPersons();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MainPage');
  }

  openDetails(){
    this.navCtrl.push(DetailsPage);
  }

 submitData(){
   // this.presentLoading();
   // this.splitBillService.calculate(this.persons)
   // .subscribe(data =>{
   //   debugger;
   //   this.modifiedData = data;
   //   for(var i=0;i<this.modifiedData.length;i++){
   //      for(var j =0 ;j<this.persons.length;j++){
   //          if(this.modifiedData[i].person1 === this.persons[j].name){
   //            this.person1Img = this.persons[j].imgName;
   //          }else if(this.modifiedData[i].person2 === this.persons[j].name){
   //            this.person2Img = this.persons[j].imgName;
   //          }
   //      }
   //      this.modifiedData[i].person1Img = this.person1Img;
   //      this.modifiedData[i].person2Img = this.person2Img;
   //    }
   //    console.log("ModifiedData: "+this.modifiedData);
   //   this.resultService.makeResults(this.modifiedData);
   //   this.navCtrl.push(ResultsPage);
   //   this.loader.dismiss();
   // });
   debugger;
this.splitBillService.calculateBill(this.persons);
this.modifiedData = this.splitBillService.results;
for(var i=0;i<this.modifiedData.length;i++){
     for(var j =0 ;j<this.persons.length;j++){
         if(this.modifiedData[i].person1 === this.persons[j].name){
           this.person1Img = this.persons[j].imgName;
         }else if(this.modifiedData[i].person2 === this.persons[j].name){
           this.person2Img = this.persons[j].imgName;
         }
     }
     this.modifiedData[i].person1Img = this.person1Img;
     this.modifiedData[i].person2Img = this.person2Img;
   }
this.resultService.makeResults(this.modifiedData);
this.navCtrl.push(ResultsPage);
 }

 popList(value) {
   debugger;
   console.log("inside pop");
   console.log("Deleted Person:: "+JSON.stringify(this.personService.persons[value]));
   this.splitBillService.imgNumbers.push(this.splitBillService.randomNumbers[value]);
   this.splitBillService.randomNumbers.splice(value,1);
   this.personService.persons.splice(value,1);
   this.personService.personNames.splice(value,1);

}

 presentLoading() {
   this.loader = this.loadingCtrl.create({
     content: "Please wait..."
   });

   this.loader.present();

 }



}
