import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import * as firebase from 'firebase';

const config = {
  // apiKey: 'AIzaSyC2lj_yaQ1-OqYzxpJhjdbVRSS15p20jQM',
  // authDomain: 'bulletinboard-d4583.firebaseapp.com',
  // databaseURL: 'https://bulletinboard-d4583.firebaseio.com/',
  // projectId: 'bulletinboard-d4583',
  // storageBucket: 'gs://bulletinboard-d4583.appspot.com',
  apiKey: "AIzaSyDP1-yR0iJr_8vgzZXwVBHJf9Bo-lczgm4",
    authDomain: "scania-8cab7.firebaseapp.com",
    databaseURL: "https://scania-8cab7.firebaseio.com",
    projectId: "scania-8cab7",
    storageBucket: "scania-8cab7.appspot.com",
    messagingSenderId: "702105813463",
    appId: "1:702105813463:web:1dead23cbbd7545b"
};

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'ios-home'
    // },
    // {
    //   title: 'Reports',
    //   url: '/graph',
    //   icon: 'ios-list'
     }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
    
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleLightContent();
      this.statusBar.backgroundColorByHexString('#124191');
      this.splashScreen.hide();
    });
    firebase.initializeApp(config);
  }
}
