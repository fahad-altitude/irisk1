import { Component } from '@angular/core';
import { NavController, NavParams, Platform, AlertController, LoadingController, App, ModalController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { Http} from '@angular/http';
import { LoginPage } from '../login/login';
import { ServicesdetailPage } from '../servicesdetail/servicesdetail';
import { EpaytabPage } from '../epaytab/epaytab';
import { DashboardPage } from '../dashboard/dashboard';
import { PromoPage } from '../promo/promo';
import { Storage } from '@ionic/storage';

// @IonicPage()
@Component({
  selector: 'page-services',
  templateUrl: 'services.html',
})
export class ServicesPage {
  public key:any;
  public resident_id:any;
  public url:any;
  public service_details:any;
  public noneresult: any;
  public headers:any;
  constructor(public navCtrl: NavController,
    private storage: Storage,
    public navParams: NavParams, public platform: Platform,public alertCtrl: AlertController, public http:Http, public loadingCtrl: LoadingController,private app: App, private modalCtrl: ModalController) 
  {  
    this.service_details=[];
    this.url='http://staging.irisk.my/api/v3/';
    this.resident_id=window.localStorage.getItem('resident_id');
    this.key=window.localStorage.getItem('token');
    platform.ready().then(() => {
      this.get_complete_services();
      });
  }
    get_complete_services(){
      let loading = this.loadingCtrl.create({
        content: 'Please wait'
        });
        loading.present();
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return new Promise(resolve=>{
      this.http.get(this.url + 'get_services_api/'+ this.resident_id +'/' + this.key,this.headers).subscribe(data=>{
      console.log(data.json());
      if(data.json().errorCode==0)
      {
        this.service_details=data.json().data;
        console.log(this.service_details);
        this.noneresult = false;
        loading.dismiss();
      }else if(data.json().errorCode==1){
        console.log("FAILED");    
        this.noneresult = true;
        loading.dismiss();
      }
      else if(data.json().errorCode==2){
        loading.dismiss();
        this.show_errorkey_alert(data.json().message);
        console.log("ERROR IN SERVER");
        this.noneresult = true;
      }
     else
     resolve(false);
    },
      err=>{
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
                        this.app.getRootNav().setRoot(LoginPage);
           }
         }
       ]
   });        
   alert.present();
}
servicedetail(post_id){
  this.navCtrl.push(ServicesdetailPage,{
    data:post_id
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
}
