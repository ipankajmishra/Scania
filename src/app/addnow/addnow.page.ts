import { Component, OnInit } from '@angular/core';
import * as firebase from 'Firebase';
import { ActivatedRoute, Router  } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators, FormArray } from '@angular/forms';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
//import { HTTP } from '@ionic-native/http/ngx';
//import { Http ,Response ,Headers, RequestOptions} from '@angular/http';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { DatePicker } from '@ionic-native/date-picker/ngx';
import { DatePipe } from '@angular/common';
import { Platform } from '@ionic/angular';
import QRCode from 'qrcode';
import { ToastController } from '@ionic/angular';
import {
  BarcodeScannerOptions,
  BarcodeScanner
} from "@ionic-native/barcode-scanner/ngx";
@Component({
  selector: 'app-addnow',
  templateUrl: './addnow.page.html',
  styleUrls: ['./addnow.page.scss'],
})
export class AddnowPage implements OnInit {
  //encodedData:string='';
  scannedData: {};
  madeData: {};
  selectedDate:string='';
  encodeData:any={};
  barcodeScannerOptions: BarcodeScannerOptions;
  code = 'some sample string';
  generated = '';
  varString:string='';
  title:string='';
  description:string='';
  lastcalib:string='';
  upcalib:string='';
  ref = firebase.database().ref('Machines/');
  infoForm: FormGroup;

  constructor(public toastController: ToastController, public datePicker: DatePicker, public datePipe: DatePipe, public platform: Platform, private http: HttpClient, private socialSharing: SocialSharing, private barcodeScanner: BarcodeScanner, private route: ActivatedRoute,
    
    public router: Router,
    private formBuilder: FormBuilder) {
      this.infoForm = this.formBuilder.group({
        'info_title' : [null, Validators.required],
        'info_description' : [null, Validators.required],
        'last_calibration' : [null, Validators.required], //this.selectedDate
        'upcoming_calibration' : [null, Validators.required],
        'image_src' : [this.generated]
      });
      //console.log(this.infoForm);
      this.barcodeScannerOptions = {
        showTorchButton: true,
        showFlipCameraButton: true
      };
      this.platform.ready().then(()=>{
        this.selectedDate = this.datePipe.transform(new Date(),"dd-MM-yyyy");
      })
    }

  ngOnInit() {
  }

  async shareWhatsApp() {
    // Text + Image or URL works
    this.socialSharing.share(null, null, this.generated).then(() => {
      // Success
    }).catch((e) => {
      // Error!
    });
  }

  selectDate()
  {
    var options={
      date: new Date(),
      mode:'date'

    }
    this.datePicker.show(options).then((date)=>{
      this.selectedDate = this.datePipe.transform(date,"dd-MM-yyyy");
    })
  }

  displayQrCode() {
    return this.generated !== '';
    
  }

  saveInfo() {
    let newInfo = firebase.database().ref('Machines/').push();
    newInfo.set(this.infoForm.value);
    //console.log(this.infoForm.value);
    console.log(newInfo.key);
    this.encodeData = newInfo.key;//"https://www.hapington.com";
      // this.barcodeScanner.encode(this.barcodeScanner.Encode.TEXT_TYPE, this.encodeData).then((encodedData) => {
      //   console.log(encodedData);
      //   this.encodeData = encodedData;
      // }, (err) => {
      //   console.log("Error occured : " + err);
      // });
      this.http.get('https://scania-8cab7.firebaseio.com/Machines/'+newInfo.key+'.json').subscribe(async (response) => {
        console.log(response['info_title']);
        this.title = response['info_title'];
        this.description = response['info_description'];
        this.lastcalib= response['last_calibration'];
        this.upcalib= response['upcoming_calibration'];
        const toast = await this.toastController.create({
          message: 'New Machine added successfully.',
          duration: 2000
        });
        toast.present();

        });
      
    const qrcode = QRCode;
    const self = this;
    qrcode.toDataURL(newInfo.key, { errorCorrectionLevel: 'H' }, function (err, url) {
      self.generated = url;
      //let newUpdate = firebase.database().ref('Machines/'+newInfo.key+"/img_src").update(this.generated);
      
    })

    let newUpdate = firebase.database().ref('Machines/'+newInfo.key).update({image_src: this.generated});
    
    //this.router.navigate(['/detail/'+newInfo.key]);
  }

  // encodedText() {
  //   this.barcodeScanner
  //     .encode(this.barcodeScanner.Encode.TEXT_TYPE, this.encodedData)
  //     .then(() => {
  //         this.encodeData = this.encod;
  //       },
  //       err => {
  //         console.log("Error occured : " + err);
  //       }
  //     );
  // }

}

//let newUpdate = firebase.database().ref('Machines/'+newInfo.key+"/img_src").update(this.generated);