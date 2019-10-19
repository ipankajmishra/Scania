import { Component, OnInit,ViewChild,Injectable, OnDestroy, AfterViewInit} from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';
import { Chart } from 'chart.js';
import * as moment from 'moment';
import { HttpClient } from '@angular/common/http';
import { LoadingController, Platform } from '@ionic/angular';
import { Events, ToastController } from '@ionic/angular';
@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('doughnutCanvasabb') doughnutCanvasabb;
  abbdata: any;
  sub: any;
  
  doughnutChartabb: any;
  id: any={};
  totalred:any;
  shouldHide:boolean;
  shouldHide1:boolean;
  shouldHide3:boolean;
  shouldHide4:boolean;
  shouldHide5:boolean;
  shouldHide6:boolean;
  shouldHide7:boolean;
  totalgreen:any;
  data:any={};
  begin:any='';
  end:any='';
  abbbdata:any={};
  name:any='';
  selection:any='';
  loaderToShow: Promise<void>;
  startid: any;
  endid: any;
  group: any;
  duration1: any;
  duration2: any;
  catchnearest:any;
  backButtonSubscription;
  toast: Promise<void>;
 //👋
 
  constructor(public router: Router,public http:HttpClient,public loadingCtrl: LoadingController,public platform: Platform,public events1: Events,private route: ActivatedRoute,private storage: Storage,public toastController: ToastController) { 
    /*this.events1.subscribe('my-message', (data) =>{
      console.log(data); // 👋 Hello from page1!
      this.selection = data;
      if(data=='epsondata')
    {
        
    }
    });
    //this.showLoader();
    */
   this.plot();
    
    
  }
  ngOnInit() {
    
    
  }

  plot()
  {
    this.storage.get('screwdata').then((response) => {
      //console.log(response);
      let arr:any = response;
      this.name = response[0].MachineName;
      this.startid = response[0].ID;
      this.endid = response[arr.length-1].ID;
      this.group = response[0].MachineGroup;
      this.duration1 = response[0].StartTime;
      this.duration2 = response[arr.length-1].EndTime;
    
    //this.http.get("https://scaniabackend.azurewebsites.net/api/student?MachineName=ABB%20Robot").subscribe(async (response) => {
        //console.log(response[0].StartTime);
        
        //console.log(response);
        
        this.totalred = 0;
        this.begin=response[0].StartTime;
        this.totalgreen=0;
        //console.log(this.begin);
        //var length = response.length;
        
        
        console.log("Length"+" "+arr.length);
        this.end=response[arr.length-1].StartTime;
        let datebeginObject = moment(this.begin, "YYYY-MM-DD hh:mm:ss").toDate();
        let dateenddObject = moment(this.end, "YYYY-MM-DD hh:mm:ss").toDate();
        let diff = new Date(dateenddObject).getTime() - new Date(datebeginObject).getTime();
        //console.log("Green Time (sec)"+diff/1000);
        this.totalgreen = diff/1000;

        //console.log(this.data.EndTime);
        
        //console.log("Start "+ response.StartTime);
        //console.log("End "+response.EndTime);
        
        for(var i=0;i<arr.length;i++)
        {
          let datestartString = response[i].StartTime; //whatever date string u have
          let dateendString = response[i].EndTime; //whatever date string u have
          let datestartObject = moment(datestartString, "YYYY-MM-DD hh:mm:ss").toDate();
          let dateendObject = moment(dateendString, "YYYY-MM-DD hh:mm:ss").toDate();
          let difference = new Date(dateendObject).getTime() - new Date(datestartObject).getTime();
          //console.log(difference);
          this.totalred=this.totalred+(difference/1000);
        }

        //console.log("Red Time (sec) "+ this.totalred);
        this.totalgreen = this.totalgreen-this.totalred;
        this.doughnutChartabb = new Chart(this.doughnutCanvasabb.nativeElement, {
          
          type: 'doughnut',
          data: {
            labels: ["Red"+" "+((this.totalred)/3600).toFixed(2)+" (hrs.)", "  Green"+" "+((this.totalgreen)/3600).toFixed(2)+" (hrs.)"],
              datasets: [{
                  label: '# of Votes',
                  data: [this.totalred,this.totalgreen],
                  backgroundColor: [
                    "#cc3232",
                    "#2dc937",
                    "#FFCE56",
                    "#FF6384",
                    "#36A2EB",
                    "#FFCE56"
                  ],
                  hoverBackgroundColor: [
                      
                    'rgba(204, 50, 50, 0.5)',
                    'rgba(16, 220, 96, 0.5)',
                      'rgba(255, 206, 86, 0.2)',
                      'rgba(75, 192, 192, 0.2)',
                      'rgba(153, 102, 255, 0.2)',
                      'rgba(255, 159, 64, 0.2)'
                  ]
              }]
          }
    
      }
      
      
      );
      this.shouldHide6 = true;
      
      
      //this.hideLoader();
    });
  }
 
    

      //})



showLoader() {
  this.loaderToShow = this.loadingCtrl.create({
    spinner: null,
      message: '<img src="assets/img/492.gif">',
      cssClass: 'loader'
  }).then((res) => {
    res.present();

    res.onDidDismiss().then((dis) => {
      console.log('Loading dismissed!');
    });
  });
  this.hideLoader();
}
hideLoader() {
  
    this.loadingCtrl.dismiss();
  
}

hideLoaderone() {
  setTimeout(() => {
    this.loadingCtrl.dismiss();
  }, 1000);
}



updatechart(last)
  {
    this.showLoader();
    this.storage.get('screwdata').then((data) => {
      //console.log(data);
      let arrr:any = data;
      this.name = data[0].MachineName;
      
      this.group = data[0].MachineGroup;
      
    
    this.http.get("https://scaniabackend.azurewebsites.net/api/student?"+"last="+last+"&MachineName="+this.name).subscribe(async (response) => {
        //console.log(response[0].StartTime);
        
        console.log(response);
        let arr:any = response;
        
        if(arr.length>0)
        {
          this.totalred = 0;
        this.begin=response[0].StartTime;
        this.totalgreen=0;
        this.startid = response[0].ID;
        this.endid = response[arr.length-1].ID;
        this.duration1 = response[0].StartTime;
        this.duration2 = response[arr.length-1].EndTime;
        //console.log(this.begin);
        //var length = response.length;
        
        
        //console.log("Length"+" "+arr.length);
        this.end=response[arr.length-1].StartTime;
        let datebeginObject = moment(this.begin, "YYYY-MM-DD hh:mm:ss").toDate();
        let dateenddObject = moment(this.end, "YYYY-MM-DD hh:mm:ss").toDate();
        let diff = new Date(dateenddObject).getTime() - new Date(datebeginObject).getTime();
        //console.log("Green Time (sec)"+diff/1000);
        this.totalgreen = diff/1000;

        //console.log(this.data.EndTime);
        
        //console.log("Start "+ response.StartTime);
        //console.log("End "+response.EndTime);
        
        for(var i=0;i<arr.length;i++)
        {
          let datestartString = response[i].StartTime; //whatever date string u have
          let dateendString = response[i].EndTime; //whatever date string u have
          let datestartObject = moment(datestartString, "YYYY-MM-DD hh:mm:ss").toDate();
          let dateendObject = moment(dateendString, "YYYY-MM-DD hh:mm:ss").toDate();
          let difference = new Date(dateendObject).getTime() - new Date(datestartObject).getTime();
          //console.log(difference);
          this.totalred=this.totalred+(difference/1000);
        }

        //console.log("Red Time (sec) "+ this.totalred);
        this.totalgreen = this.totalgreen-this.totalred;
        this.doughnutChartabb = new Chart(this.doughnutCanvasabb.nativeElement, {
          
          type: 'doughnut',
          data: {
            labels: ["Red"+" "+((this.totalred)/3600).toFixed(2)+" (hrs.)", "  Green"+" "+((this.totalgreen)/3600).toFixed(2)+" (hrs.)"],
              datasets: [{
                  label: '# of Votes',
                  data: [this.totalred,this.totalgreen],
                  backgroundColor: [
                    "#cc3232",
                    "#2dc937",
                    "#FFCE56",
                    "#FF6384",
                    "#36A2EB",
                    "#FFCE56"
                  ],
                  hoverBackgroundColor: [
                      
                    'rgba(204, 50, 50, 0.5)',
                    'rgba(16, 220, 96, 0.5)',
                      'rgba(255, 206, 86, 0.2)',
                      'rgba(75, 192, 192, 0.2)',
                      'rgba(153, 102, 255, 0.2)',
                      'rgba(255, 159, 64, 0.2)'
                  ]
              }]
          }
    
      }
      
      
      );
      this.hideLoader();
        this.showToast();
        }
        else{
          this.hideLoader();
          this.showToastcatchnearest();
          this.catchnearest = last+7;
          
          this.updatechart(this.catchnearest);
        }
        
      
      //this.hideLoader();
    });
  });
}

showToast() {
  this.toast = this.toastController.create({
    message: 'Data Updated',
    duration: 2000
   // position: "top"
  }).then((toastData)=>{
    console.log(toastData);
    toastData.present();
  });
}

showToastcatchnearest() {
  this.toast = this.toastController.create({
    message: 'Requested data not available. Trying to find nearest range!!',
    duration: 2000,
    position: "top"
  }).then((toastData)=>{
    console.log(toastData);
    toastData.present();
  });
}
HideToast(){
  this.toast = this.toastController.dismiss();
}

ngAfterViewInit() {
  this.backButtonSubscription = this.platform.backButton.subscribe(async () => {
    this.hideLoader();
  });
 }
ngOnDestroy() {
  this.backButtonSubscription.unsubscribe();
 }

}



