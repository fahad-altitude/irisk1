import { Component } from '@angular/core';
import { NavController, NavParams, Platform, AlertController, LoadingController, App, ModalController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { Http} from '@angular/http';
import { LoginPage } from '../login/login';
import { EpaytabPage } from '../epaytab/epaytab';
import { DashboardPage } from '../dashboard/dashboard';
import { ServicesPage } from '../services/services';
import { BookingaddselectionPage } from '../bookingaddselection/bookingaddselection';
import { PromoPage } from '../promo/promo';

// @IonicPage()
@Component({
  selector: 'page-bookingadd',
  templateUrl: 'bookingadd.html',
})
export class BookingaddPage {
   public condo_id:any;
   public key:any;
   public unit_id:any;
   public resident_id:any;
   public categories_list:any;
   public url:any;
   public condo_name:any;
   public headers:any;
   public noneresult:any;
   public img_path:any;
   constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform,public alertCtrl: AlertController, public http:Http, public loadingCtrl: LoadingController,private app: App, private modalCtrl: ModalController) 
   {
    this.noneresult='';
    this.condo_name=window.localStorage.getItem('condo_name');
    this.url='http://staging.irisk.my/api/v3/';
    this.resident_id=window.localStorage.getItem('resident_id');
    this.key=window.localStorage.getItem('token');
    this.unit_id=window.localStorage.getItem('unit_id');
    this.condo_id=window.localStorage.getItem('condo_id');
    this.categories_list=[];
    platform.ready().then(() => {  
      this.get_all_facility_categories();
     
    });
   
  }
 
    get_all_facility_categories(){
      let loading = this.loadingCtrl.create({
        content: 'Loading facilities ...'
      });
      loading.present();
      var headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      return new Promise(resolve=>{
        this.http.get(this.url + 'get_facility_categories_list_api/'+ this.resident_id +'/'+ this.condo_id+'/'+ this.unit_id+'/'+ this.key).subscribe(data=>{
          console.log(data.json());
          if(data.json().errorCode==0)
          {
            console.log("SUCCESS");      
            this.categories_list=data.json().data;
            this.img_path=data.json().base_url;
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
    
      show_error_alert(des)
      {
        let alert = this.alertCtrl.create({
          
          //subTitle: "PURPOSE OF DEPOSIT",
          message: des,
        //  message: "<ion-item><p style='overflow:auto;white-space:normal;'>Test</p> <button ion-button outline item-right icon-left (click)='itemSelected()'><ion-icon name='eye'></ion-icon>View</button>",
          buttons: [
               {
                 text: 'Close',
                 handler: () => {
  
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
          
          //subTitle: "PURPOSE OF DEPOSIT",
          message: des,
        //  message: "<ion-item><p style='overflow:auto;white-space:normal;'>Test</p> <button ion-button outline item-right icon-left (click)='itemSelected()'><ion-icon name='eye'></ion-icon>View</button>",
          buttons: [
               {
                 text: 'Close',
                 handler: () => {
                  window.localStorage.clear();
                  this.app.getRootNav().setRoot(LoginPage);
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
  gotobookingaddsel(id,description,name,terms){
    this.navCtrl.push(BookingaddselectionPage,{
      id:id,
      description:description,
      name:name,
      terms:terms
    });
  }
}
