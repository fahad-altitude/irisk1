import { Component } from '@angular/core';
import { NavController, NavParams, Platform, AlertController, LoadingController, App, ModalController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { NoticboarddetailPage } from '../noticboarddetail/noticboarddetail';
import { LoginPage } from '../login/login';
import { EpaytabPage } from '../epaytab/epaytab';
import { DashboardPage } from '../dashboard/dashboard';
import { ServicesPage } from '../services/services';
import { PromoPage } from '../promo/promo';
import { Http} from '@angular/http';
import { Storage } from '@ionic/storage';

// @IonicPage()
@Component({
  selector: 'page-noticboard',
  templateUrl: 'noticboard.html',
})
export class NoticboardPage {
  public condo_id:any;
  public key:any;
  public resident_id:any;
  public notices_list:any;
  public url:any;
  public condo_name:any;
  public headers:any;
  public noneresult:any;
  
  constructor(public navCtrl: NavController,
    private storage: Storage,
    public navParams: NavParams, public platform: Platform,public alertCtrl: AlertController, public http:Http, public loadingCtrl: LoadingController,private app: App, private modalCtrl: ModalController) 
  {
    this.noneresult='';
    this.condo_name=window.localStorage.getItem('condo_name');
    this.key=window.localStorage.getItem('token');
    this.condo_id=window.localStorage.getItem('condo_id');
    this.resident_id=window.localStorage.getItem('resident_id');
    this.url='http://staging.irisk.my/api/v3/';
    this.notices_list=[];
  
    platform.ready().then(() => {  
      this.get_all_notices();
     
    });

  }
 
  
    get_all_notices(){
      let loading = this.loadingCtrl.create({
        content: 'Loading notices ...'
      });
      loading.present();
      var headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      return new Promise(resolve=>{
        this.http.get(this.url + 'notice_board/'+ this.resident_id+'/'+ this.condo_id+'/'+this.key,{headers: this.headers}).subscribe(data=>{
          console.log(data.json());
          if(data.json().errorCode==0)
          {
            console.log("SUCCESS");      
            this.notices_list=data.json().notices_list;
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
         this.show_error_alert("ERROR IN SERVER");
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
          
          //subTitle: "PURPOSE OF DEPOSIT",
          message: des,
        //  message: "<ion-item><p style='overflow:auto;white-space:normal;'>Test</p> <button ion-button outline item-right icon-left (click)='itemSelected()'><ion-icon name='eye'></ion-icon>View</button>",
          buttons: [
               {
                 text: 'Close',
                 handler: () => {
                  window.localStorage.clear();
                  this.storage.set('email', '');
                  this.storage.set('passwordd', '');
                  this.storage.set('condo_id', '');
                  this.storage.set('unit_id', '');
                  this.app.getRootNav().setRoot(LoginPage);
                 }
               }
             ]
         });
                       
         alert.present();
      
      }
gotopage(post_id){
this.navCtrl.push(NoticboarddetailPage,{
  data: post_id
});
  
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
slideData = [{ image: "../../assets/imgs/2.jpg" },{ image: "../../assets/imgs/1.jpg" }]
}
