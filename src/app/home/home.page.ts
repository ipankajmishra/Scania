import { Component,ViewChild } from '@angular/core';
import { Platform,NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { ShareService } from "../share/share"
import { IonContent } from '@ionic/angular';
import {
  BarcodeScannerOptions,
  BarcodeScanner
} from "@ionic-native/barcode-scanner/ngx";
import { ActivatedRoute, Router  } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  providers: [ ShareService ]
})
export class HomePage implements OnInit, OnDestroy, AfterViewInit{
  @ViewChild(IonContent) content: IonContent;
  encodedData:string='';
  scannedData: {};
  encodeData:any={};
  barcodeScannerOptions: BarcodeScannerOptions;
  backButtonSubscription; 
  items:any=[];
  id:string;
  MachineName:string='';
  name:string;
  constructor(private barcodeScanner: BarcodeScanner, public router: Router,public platform: Platform, public share: ShareService, public alertController: AlertController) {
    //this.encodeData = "https://www.hapington.com";
    //Options
    this.barcodeScannerOptions = {
      showTorchButton: true,
      showFlipCameraButton: true
    };
    //this.getAll();

    
  }

  

  scanCode() {
    this.barcodeScanner
      .scan()
      .then(barcodeData => {
        alert("Voila!! Success. ");
        this.scannedData = barcodeData;
      })
      .catch(err => {
        console.log("Error", err);
      });
  }

  encodedText() {
    this.barcodeScanner
      .encode(this.barcodeScanner.Encode.TEXT_TYPE, this.encodedData)
      .then((data) => {
          this.encodeData = data;
        },
        err => {
          console.log("Error occured : " + err);
        }
      );
  }

  addNow() {
    this.router.navigate(['/addnow/']);
  }

  // ionViewDidEnter(){ 
    
    
  // } 

  // ionViewDidEnter(){ 
  //   this.subscription = this.platform.backButton.subscribe(()=>{
  //      navigator['app'].exitApp(); 
  //     }); 
  //   } 
    
  // ionViewWillLeave(){
  //    this.subscription.unsubscribe(); 
  //   }
  ngOnInit() { }
  ngAfterViewInit() {
    this.backButtonSubscription = this.platform.backButton.subscribe(async () => {
      if (this.router.isActive('/home', true) && this.router.url === '/home') {
        const alert = await this.alertController.create({
          header: 'Close app?',
          buttons: [
            {
              text: 'Cancel',
              role: 'cancel'
            }, {
              text: 'Close',
              handler: () => {
                navigator['app'].exitApp();
              }
            }
          ]
        });
    
        await alert.present();
      }
    });
   }
  ngOnDestroy() {
    this.backButtonSubscription.unsubscribe();
   }


   getAll() {
    this.items=[];
    this.share.getAll().subscribe(data=>{
      // console.log(data);
      // for(var i=0;i<data.length;i++)
      // {
      //   this.items.push(data[i]);
      // }
      console.log(data.MachineName);
      this.MachineName = data.MachineName;
      
    })
    

    
  }

   Add()
   {
     if(this.id==null)
     {
       this.share.Create(this.name).subscribe(data=>{
         this.name="";
         this.getAll();
         console.log(data);
       })
     }
     else{
      this.share.Update(this.id,this.name).subscribe(data=>{
        console.log(data);
        this.id=null;
        this.name="";
        this.getAll();
      })
     }

   }

   Edit(item)
   {
    this.id=item.id;
    this.name=item.name;
   }

   Delete(item)
   {
      this.share.Delete(item).subscribe(data=>{
        console.log(data);
        this.getAll();
      })
   }
  

   graph()
   {
    this.router.navigate(['/graph/']);
   }
   ScrollToBottom(){
    //this.content.scrollToBottom(1500);
    this.content.scrollToTop(1500);
  }

  
}

  




