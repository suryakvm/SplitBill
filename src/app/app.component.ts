import { Component } from '@angular/core';
import { Platform, LoadingController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { PersonService } from './person.service';
import { SplitBillService } from './splitbill.service';
import { ResultService } from './result.service';
import { HomePage } from '../pages/home/home';
import { MainPage } from '../pages/main/main';
import { Storage } from '@ionic/storage';

@Component({
  templateUrl: 'app.html',
  providers: [PersonService,SplitBillService,ResultService],
})
export class MyApp {
  rootPage:any;
  loader:any;

  constructor(public storage: Storage, public loadingCtrl: LoadingController,platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    this.presentLoading();
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      // statusBar.styleDefault();
      // splashScreen.hide();
this.storage.get('introShown').then((result) => {
debugger;
if(result){
  this.rootPage = MainPage;
}
else {
         this.rootPage = HomePage;
         this.storage.set('introShown', true);
       }
       this.loader.dismiss();

});

    });
  }

  presentLoading() {

    this.loader = this.loadingCtrl.create({
      content: "Please wait..."
    });

    this.loader.present();

  }
}
