import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { MainPage } from '../pages/main/main';
import { DetailsPage } from '../pages/details/details';
import { CalculatorPage } from '../pages/calculator/calculator';
import { HttpModule } from '@angular/http';
import { ResultsPage } from '../pages/results/results';
import { Storage, IonicStorageModule } from '@ionic/storage';




@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MainPage,
    DetailsPage,
    ResultsPage,
    CalculatorPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    BrowserAnimationsModule,
    IonicStorageModule.forRoot()

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MainPage,
    DetailsPage,
    ResultsPage,
    CalculatorPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
