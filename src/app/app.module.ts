import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { IonicStorageModule } from '@ionic/storage';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';


import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { FormsModule } from '@angular/forms';

import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { File } from '@ionic-native/file/ngx';

import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { DatePicker } from '@ionic-native/date-picker/ngx';
import { DatePipe } from '@angular/common';

import { ShareService } from "../app/share/share";

import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule, IonicModule.forRoot(), HttpClientModule,
    HttpModule, AppRoutingModule,FormsModule,ChartsModule,IonicStorageModule.forRoot()
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ShareService,
    BarcodeScanner,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    SocialSharing,
    File,
    DatePicker,
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
