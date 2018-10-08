import { Component } from '@angular/core';
import { NavController, NavParams, Platform, AlertController, LoadingController, App, ModalController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { Http} from '@angular/http';
import { LoginPage } from '../login/login';
import { EpaytabPage } from '../epaytab/epaytab';
import { DashboardPage } from '../dashboard/dashboard';
import { ServicesPage } from '../services/services';
import { BookingaddPage } from '../bookingadd/bookingadd';
import { PromoPage } from '../promo/promo';
import { Storage } from '@ionic/storage';

// @IonicPage()
@Component({
  selector: 'page-booking',
  templateUrl: 'booking.html',
})
export class BookingPage {
   public condo_id:any;
   public key:any;
   public unit_id:any;
   public resident_id:any;
   public booking_list:any;
   public url:any;
   public pagenumber:any;
   public condo_name:any;
   public headers:any;
   public noneresult:any;
   constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform,public alertCtrl: AlertController, public http:Http, public loadingCtrl: LoadingController,private app: App, private modalCtrl: ModalController, private storage: Storage) 
   {
    this.noneresult='';
    this.condo_name=window.localStorage.getItem('condo_name');
    
    this.pagenumber=0;
 
    this.url='http://staging.irisk.my/api/v3/';
    this.resident_id=window.localStorage.getItem('resident_id');
    this.key=window.localStorage.getItem('token');
    this.unit_id=window.localStorage.getItem('unit_id');
    this.condo_id=window.localStorage.getItem('condo_id');
    this.booking_list=[];
    platform.ready().then(() => {  
      this.get_all_bookings();
     
    });
   
  }
 
    get_all_bookings(){
      let loading = this.loadingCtrl.create({
        content: 'Please wait ...'
      });
      loading.present();
      var headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      return new Promise(resolve=>{
        this.http.get(this.url + 'get_my_facility_bookings_list_api/'+ this.resident_id +'/'+ this.condo_id+'/'+ this.unit_id+'/'+ this.key +'/'+ this.pagenumber).subscribe(data=>{
          console.log(data.json());
          if(data.json().errorCode==0)
          {
            console.log("SUCCESS");      
            this.booking_list=data.json().data;
            this.noneresult = false;
            loading.dismiss();
          }else if(data.json().errorCode==1){
            console.log("FAILED");    
            this.noneresult = true;
            loading.dismiss();
            console.log("No Data Found");
          }
          else if(data.json().errorCode==2){
            loading.dismiss();
            this.show_errorkey_alert("Invalid key");
            console.log("ERROR IN SERVER");
            this.noneresult = true;
          }
         else
         resolve(false);
  },
          err=>{
   
         //console.log(err);
         loading.dismiss();
         this.show_error_alert("PLease check your internet connection");
         console.log("ERROR IN SERVER");
         this.noneresult = true;
         });
   
     });
      }
      doInfinite(infiniteScroll:any) {
 
        this.pagenumber++;
 
      var headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      return new Promise(resolve=>{
        this.http.get(this.url + 'get_my_facility_bookings_list_api/'+ this.resident_id +'/'+ this.condo_id+'/'+ this.unit_id+'/'+ this.key +'/'+ this.pagenumber).subscribe(data=>{
         
          if(data.json().errorCode==0)
          {
        
            this.booking_list = (this.booking_list).concat(data.json().data);
            infiniteScroll.complete();
                  }
                  else
                     
              infiniteScroll.enable(false);
              },onerror=>{ 

          infiniteScroll.complete();
       
        });
          });
  }
      show_error_alert(des)
      {
        let alert = this.alertCtrl.create({
        message: des,
        buttons: [
               {
                 text: 'Close',
                 handler: () => {
                  window.localStorage.clear();
                  this.storage.set('email', '');
                  this.storage.set('passwordd', '');
                  this.storage.set('condo_id', '');
                  this.storage.set('unit_id', '');
                  this.navCtrl.setRoot(LoginPage);
                 }
               }
             ]
         });            
         alert.present();
      }
      show_errorkey_alert(des)
      {
        let alert = this.alertCtrl.create({ 
          message: des,
          buttons: [
               {
                 text: 'Close',
                 handler: () => {
                  window.localStorage.clear();
                  this.storage.set('email', '');
                  this.storage.set('passwordd', '');
                  this.storage.set('condo_id', '');
                  this.storage.set('unit_id', '');
                  this.navCtrl.setRoot(LoginPage);
                 }
               }
             ]
         });          
         alert.present();
      }
  dashboard(){
    this.navCtrl.setRoot(DashboardPage);
  }
  epay(){
    this.navCtrl.push(EpaytabPage);
  }
  services(){
    this.navCtrl.push(ServicesPage);
  }
  promo(){
    this.navCtrl.push(PromoPage);
  }
  gotobookingadd(){
    this.navCtrl.push(BookingaddPage); 
  }
}
