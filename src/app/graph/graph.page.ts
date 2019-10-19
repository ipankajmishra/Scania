import { Component, ViewChild, Injectable, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { async } from '@angular/core/testing';
//import { HttpClient } from 'selenium-webdriver/http';
import { Chart } from 'chart.js';
import * as moment from 'moment';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { LoadingController,Platform } from '@ionic/angular';
import { Events } from '@ionic/angular';
@Component({
  selector: 'app-graph',
templateUrl: './graph.page.html',
styleUrls: ['./graph.page.scss'],
})
@Injectable({
  providedIn: 'root'
})

export class GraphPage implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('doughnutCanvas') doughnutCanvas;
  @ViewChild('doughnutCanvass') doughnutCanvass;
  @ViewChild('doughnutCanvas3') doughnutCanvas3;
  @ViewChild('doughnutCanvasss') doughnutCanvasss;
  @ViewChild('doughnutCanvasdone') doughnutCanvasdone;
  @ViewChild('doughnutCanvasdtwo') doughnutCanvasdtwo;
  @ViewChild('doughnutCanvasabb') doughnutCanvasabb;
  data:any={};
  begin:any='';
  end:any='';
  abbdata:any={};
  fetchedata:boolean;
  totalred:any;
  shouldHide:boolean;
  shouldHide1:boolean;
  shouldHide3:boolean;
  shouldHide4:boolean;
  shouldHide5:boolean;
  shouldHide6:boolean;
  shouldHide7:boolean;
  totalgreen:any;
  doughnutChart: any;
  doughnutChart1: any;
  doughnutChart3: any;
  doughnutChartt: any;
  doughnutChartdone: any;
  doughnutChartdtwo: any;
  doughnutChartabb: any;
  myParam: any;
  donedata:any={};
  screwrobotdata:any={};
  epsondata: any={};
  mcidata: any={};
  uritendata: any={};
  donetwo: any={};
  backButtonSubscription;
  loaderToShow: any;
  constructor(public http:HttpClient,public events1: Events,public router: Router,public platform: Platform,private storage: Storage,public loadingCtrl: LoadingController) {
    
    this.fetchedata=true;
    this.call();

  }

  ngOnInit() {
    
    
  }
  
  call() {
    
    //this.showLoader();
    
    this.http.get("https://scaniabackend.azurewebsites.net/api/student?MachineName=Screw%20Robot").subscribe(async (response) => {
        console.log(response);
        this.screwrobotdata = response;
        //this.storage.set('screwdata', this.screwrobotdata);
        let arr:any = response;
        this.totalred = 0;
        this.begin=response[0].StartTime;
        ////console.log(this.begin);
        //var length = response.length;
        
        
        ////console.log("Length"+" "+arr.length);
        this.end=response[arr.length-1].StartTime;
        let datebeginObject = moment(this.begin, "YYYY-MM-DD hh:mm:ss").toDate();
        let dateenddObject = moment(this.end, "YYYY-MM-DD hh:mm:ss").toDate();
        let diff = new Date(dateenddObject).getTime() - new Date(datebeginObject).getTime();
        ////console.log("Green Time (sec)"+diff/1000);
        this.totalgreen = diff/1000;

        ////console.log(this.data.EndTime);
        
        ////console.log("Start "+ response.StartTime);
        ////console.log("End "+response.EndTime);
        
        for(var i=0;i<arr.length;i++)
        {
          let datestartString = response[i].StartTime; //whatever date string u have
          let dateendString = response[i].EndTime; //whatever date string u have
          let datestartObject = moment(datestartString, "YYYY-MM-DD hh:mm:ss").toDate();
          let dateendObject = moment(dateendString, "YYYY-MM-DD hh:mm:ss").toDate();
          let difference = new Date(dateendObject).getTime() - new Date(datestartObject).getTime();
          ////console.log(difference);
          this.totalred=this.totalred+(difference/1000);
        }
        this.totalgreen = this.totalgreen-this.totalred;

        ////console.log("Red Time (sec) "+ this.totalred);
        
        this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
          
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
      this.shouldHide = true;

      })


      this.http.get("https://scaniabackend.azurewebsites.net/api/student?MachineName=MCI%20Robot-1").subscribe(async (response) => {
        ////console.log(response[0].StartTime);
        this.mcidata=response;
        //this.storage.set('mcidata', this.mcidata);
        let arr:any = response;
        this.totalred = 0;
        this.begin=response[0].StartTime;
        ////console.log(this.begin);
        //var length = response.length;
        
        
        ////console.log("Length"+" "+arr.length);
        this.end=response[arr.length-1].StartTime;
        let datebeginObject = moment(this.begin, "YYYY-MM-DD hh:mm:ss").toDate();
        let dateenddObject = moment(this.end, "YYYY-MM-DD hh:mm:ss").toDate();
        let diff = new Date(dateenddObject).getTime() - new Date(datebeginObject).getTime();
        ////console.log("Green Time (sec)"+diff/1000);
        this.totalgreen = diff/1000;

        ////console.log(this.data.EndTime);
        
        ////console.log("Start "+ response.StartTime);
        ////console.log("End "+response.EndTime);
        
        for(var i=0;i<arr.length;i++)
        {
          let datestartString = response[i].StartTime; //whatever date string u have
          let dateendString = response[i].EndTime; //whatever date string u have
          let datestartObject = moment(datestartString, "YYYY-MM-DD hh:mm:ss").toDate();
          let dateendObject = moment(dateendString, "YYYY-MM-DD hh:mm:ss").toDate();
          let difference = new Date(dateendObject).getTime() - new Date(datestartObject).getTime();
          ////console.log(difference);
          this.totalred=this.totalred+(difference/1000);
        }
        this.totalgreen = this.totalgreen-this.totalred;

        ////console.log("Red Time (sec) "+ this.totalred);
        
        this.doughnutChart1 = new Chart(this.doughnutCanvass.nativeElement, {
          
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
      this.shouldHide1 = true;

      })


      this.http.get("https://scaniabackend.azurewebsites.net/api/student?MachineName=EPSON").subscribe(async (response) => {
        ////console.log(response[0].StartTime);
        this.epsondata = response;
        //this.storage.set('epsondata', this.epsondata);
        let arr:any = response;
        this.totalred = 0;
        this.begin=response[0].StartTime;
        this.totalgreen=0;
        ////console.log(this.begin);
        //var length = response.length;
        
        
        ////console.log("Length"+" "+arr.length);
        this.end=response[arr.length-1].StartTime;
        let datebeginObject = moment(this.begin, "YYYY-MM-DD hh:mm:ss").toDate();
        let dateenddObject = moment(this.end, "YYYY-MM-DD hh:mm:ss").toDate();
        let diff = new Date(dateenddObject).getTime() - new Date(datebeginObject).getTime();
        ////console.log("Green Time (sec)"+diff/1000);
        this.totalgreen = diff/1000;

        ////console.log(this.data.EndTime);
        
        ////console.log("Start "+ response.StartTime);
        ////console.log("End "+response.EndTime);
        
        for(var i=0;i<arr.length;i++)
        {
          let datestartString = response[i].StartTime; //whatever date string u have
          let dateendString = response[i].EndTime; //whatever date string u have
          let datestartObject = moment(datestartString, "YYYY-MM-DD hh:mm:ss").toDate();
          let dateendObject = moment(dateendString, "YYYY-MM-DD hh:mm:ss").toDate();
          let difference = new Date(dateendObject).getTime() - new Date(datestartObject).getTime();
          ////console.log(difference);
          this.totalred=this.totalred+(difference/1000);
        }

        ////console.log("Red Time (sec) "+ this.totalred);
        this.totalgreen = this.totalgreen-this.totalred;
        this.doughnutChart3 = new Chart(this.doughnutCanvas3.nativeElement, {
          
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
      this.shouldHide3 = true;

      })

      this.http.get("https://scaniabackend.azurewebsites.net/api/student?MachineName=UR10%20Robot").subscribe(async (response) => {
        ////console.log(response[0].StartTime);
        this.uritendata = response;
        //this.storage.set('uridata', this.uritendata);
        let arr:any = response;
        this.totalred = 0;
        this.begin=response[0].StartTime;
        this.totalgreen=0;
        ////console.log(this.begin);
        //var length = response.length;
        
        
        ////console.log("Length"+" "+arr.length);
        this.end=response[arr.length-1].StartTime;
        let datebeginObject = moment(this.begin, "YYYY-MM-DD hh:mm:ss").toDate();
        let dateenddObject = moment(this.end, "YYYY-MM-DD hh:mm:ss").toDate();
        let diff = new Date(dateenddObject).getTime() - new Date(datebeginObject).getTime();
        //console.log("Green Time (sec)"+diff/1000);
        this.totalgreen = diff/1000;

        ////console.log(this.data.EndTime);
        
        ////console.log("Start "+ response.StartTime);
        ////console.log("End "+response.EndTime);
        
        for(var i=0;i<arr.length;i++)
        {
          let datestartString = response[i].StartTime; //whatever date string u have
          let dateendString = response[i].EndTime; //whatever date string u have
          let datestartObject = moment(datestartString, "YYYY-MM-DD hh:mm:ss").toDate();
          let dateendObject = moment(dateendString, "YYYY-MM-DD hh:mm:ss").toDate();
          let difference = new Date(dateendObject).getTime() - new Date(datestartObject).getTime();
          ////console.log(difference);
          this.totalred=this.totalred+(difference/1000);
        }

        //console.log("Red Time (sec) "+ this.totalred);
        this.totalgreen = this.totalgreen-this.totalred;
        this.doughnutChartt = new Chart(this.doughnutCanvasss.nativeElement, {
          
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
      this.shouldHide4 = true;

      })


      this.http.get("https://scaniabackend.azurewebsites.net/api/student?MachineName=DELTA-1").subscribe(async (response) => {
        ////console.log(response[0].StartTime);
        this.donedata=response;
        //this.storage.set('donedata', this.donedata);
        let arr:any = response;
        this.totalred = 0;
        this.begin=response[0].StartTime;
        this.totalgreen=0;
        ////console.log(this.begin);
        //var length = response.length;
        
        
        //console.log("Length"+" "+arr.length);
        this.end=response[arr.length-1].StartTime;
        let datebeginObject = moment(this.begin, "YYYY-MM-DD hh:mm:ss").toDate();
        let dateenddObject = moment(this.end, "YYYY-MM-DD hh:mm:ss").toDate();
        let diff = new Date(dateenddObject).getTime() - new Date(datebeginObject).getTime();
        //console.log("Green Time (sec)"+diff/1000);
        this.totalgreen = diff/1000;

        ////console.log(this.data.EndTime);
        
        ////console.log("Start "+ response.StartTime);
        ////console.log("End "+response.EndTime);
        
        for(var i=0;i<arr.length;i++)
        {
          let datestartString = response[i].StartTime; //whatever date string u have
          let dateendString = response[i].EndTime; //whatever date string u have
          let datestartObject = moment(datestartString, "YYYY-MM-DD hh:mm:ss").toDate();
          let dateendObject = moment(dateendString, "YYYY-MM-DD hh:mm:ss").toDate();
          let difference = new Date(dateendObject).getTime() - new Date(datestartObject).getTime();
          ////console.log(difference);
          this.totalred=this.totalred+(difference/1000);
        }

        //console.log("Red Time (sec) "+ this.totalred);
        this.totalgreen = this.totalgreen-this.totalred;
        this.doughnutChartdone = new Chart(this.doughnutCanvasdone.nativeElement, {
          
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
      this.shouldHide5 = true;

      })


      this.http.get("https://scaniabackend.azurewebsites.net/api/student?MachineName=ABB%20Robot").subscribe(async (response) => {
        ////console.log(response[0].StartTime);
        this.abbdata = response;
        //this.storage.set('abbdata', this.abbdata);
        let arr:any = response;
        this.totalred = 0;
        this.begin=response[0].StartTime;
        this.totalgreen=0;
        ////console.log(this.begin);
        //var length = response.length;
        
        
        //console.log("Length"+" "+arr.length);
        this.end=response[arr.length-1].StartTime;
        let datebeginObject = moment(this.begin, "YYYY-MM-DD hh:mm:ss").toDate();
        let dateenddObject = moment(this.end, "YYYY-MM-DD hh:mm:ss").toDate();
        let diff = new Date(dateenddObject).getTime() - new Date(datebeginObject).getTime();
        //console.log("Green Time (sec)"+diff/1000);
        this.totalgreen = diff/1000;

        ////console.log(this.data.EndTime);
        
        ////console.log("Start "+ response.StartTime);
        ////console.log("End "+response.EndTime);
        
        for(var i=0;i<arr.length;i++)
        {
          let datestartString = response[i].StartTime; //whatever date string u have
          let dateendString = response[i].EndTime; //whatever date string u have
          let datestartObject = moment(datestartString, "YYYY-MM-DD hh:mm:ss").toDate();
          let dateendObject = moment(dateendString, "YYYY-MM-DD hh:mm:ss").toDate();
          let difference = new Date(dateendObject).getTime() - new Date(datestartObject).getTime();
          ////console.log(difference);
          this.totalred=this.totalred+(difference/1000);
        }
        this.totalgreen = this.totalgreen-this.totalred;
        //console.log("Red Time (sec) "+ this.totalred);
        
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
      

      })


      this.http.get("https://scaniabackend.azurewebsites.net/api/student?MachineName=DELTA-2").subscribe(async (response) => {
        ////console.log(response[0].StartTime);
        this.donetwo=response;
        //this.storage.set('dtwodata', this.donetwo);
        let arr:any = response;
        this.totalred = 0;
        this.begin=response[0].StartTime;
        this.totalgreen=0;
        ////console.log(this.begin);
        //var length = response.length;
        
        
        //console.log("Length"+" "+arr.length);
        this.end=response[arr.length-1].StartTime;
        let datebeginObject = moment(this.begin, "YYYY-MM-DD hh:mm:ss").toDate();
        let dateenddObject = moment(this.end, "YYYY-MM-DD hh:mm:ss").toDate();
        let diff = new Date(dateenddObject).getTime() - new Date(datebeginObject).getTime();
        //console.log("Green Time (sec)"+diff/1000);
        this.totalgreen = diff/1000;

        ////console.log(this.data.EndTime);
        
        ////console.log("Start "+ response.StartTime);
        ////console.log("End "+response.EndTime);
        
        for(var i=0;i<arr.length;i++)
        {
          let datestartString = response[i].StartTime; //whatever date string u have
          let dateendString = response[i].EndTime; //whatever date string u have
          let datestartObject = moment(datestartString, "YYYY-MM-DD hh:mm:ss").toDate();
          let dateendObject = moment(dateendString, "YYYY-MM-DD hh:mm:ss").toDate();
          let difference = new Date(dateendObject).getTime() - new Date(datestartObject).getTime();
          ////console.log(difference);
          this.totalred=this.totalred+(difference/1000);
        }

        //console.log("Red Time (sec) "+ this.totalred);
        this.totalgreen = this.totalgreen-this.totalred;
        this.doughnutChartdtwo = new Chart(this.doughnutCanvasdtwo.nativeElement, {
          
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
      this.shouldHide7 = true;
      

      })
    
      

      
  }




  updategraph(){
    this.doughnutChart.update();
    //console.log("Hello Pankaj");
  }

  abbrobot()
  {
    
    this.storage.set('screwdata', this.abbdata).then(()=>{
      this.router.navigate(['details']);
      
    });
  }

  donerobot()
  {
    
    this.storage.set('screwdata', this.donedata).then(()=>{
      this.router.navigate(['details']);
      
    });
      
    
    
  }

  screwrobot()
  {
    
    
    this.storage.set('screwdata', this.screwrobotdata).then(()=>{
      this.router.navigate(['details']);
      
    });
    
  }
  epsonrobot()
  {
    
    this.storage.set('screwdata', this.epsondata).then(()=>{
      this.router.navigate(['details']);
      
    });
    
  }

  mcirobot()
  {
    
    this.storage.set('screwdata', this.mcidata).then(()=>{
      this.router.navigate(['details']);
      
    });
  }
  urirobot()
  {
    
    this.storage.set('screwdata', this.uritendata).then(()=>{
      this.router.navigate(['details']);
      
    });
  }
  dtworobot()
  {
    
    this.storage.set('screwdata', this.donetwo).then(()=>{
      this.router.navigate(['details']);
      
    });
  }

  showLoader() {
    this.loaderToShow = this.loadingCtrl.create({
      spinner: null,
      message: '<img src="assets/img/492.gif">',
      cssClass: 'loader'
    }).then((res) => {
      res.present();
 
      res.onDidDismiss().then((dis) => {
        //console.log('Loading dismissed!');
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
    }, 500);
  }
  

  ngAfterViewInit() {
  this.backButtonSubscription = this.platform.backButton.subscribe(async () => {
    this.hideLoader();
  });
 }
    ngOnDestroy() {
  this.backButtonSubscription.unsubscribe();
  //this.router.navigateByUrl('/app');
 }
 doRefresh(event) {
  //this.shouldHide = false;
  console.log('Begin async operation');
  this.call();
  setTimeout(() => {
    console.log('Async operation has ended');
    event.target.complete();
  }, 2000);
}

}






