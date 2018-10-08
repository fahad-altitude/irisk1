import { Component } from '@angular/core';
import { NavController, NavParams, Platform, AlertController, LoadingController, App, ModalController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { Http} from '@angular/http';
import { LoginPage } from '../login/login';
import { EpaytabPage } from '../epaytab/epaytab';
import { DashboardPage } from '../dashboard/dashboard';
import { ServicesPage } from '../services/services';
import { PromoPage } from '../promo/promo';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-usefulinfotab',
  templateUrl: 'usefulinfotab.html',
})
export class UsefulinfotabPage {
  public condo_id:any;
  public key:any;
  public unit_id:any;
  public resident_id:any;
  public url:any;
  public post_id:any;
  public topclick:number=0;
  public contact_list:any;
  public document_list:any;
  usefulinfo:string='contacts';
  public noneresult: any;
  public headers:any;
  constructor(public navCtrl: NavController,
    private storage: Storage,
    public navParams: NavParams, public platform: Platform,public alertCtrl: AlertController, public http:Http, public loadingCtrl: LoadingController,private app: App, private modalCtrl: ModalController) 
  {
    this.condo_id=window.localStorage.getItem('condo_id');
    this.resident_id=window.localStorage.getItem('resident_id');
    this.key=window.localStorage.getItem('token');
    this.url='http://staging.irisk.my/api/v3/';
  this.contact_list=[];
  this.document_list=[];
    platform.ready().then(() => {
      this.get_conatcts();
      this.get_documents();
      });
 
  }

 
  get_conatcts(){
      let loading = this.loadingCtrl.create({
        content: 'Please wait'
        });
        loading.present();
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
        
    return new Promise(resolve=>{
      this.http.get(this.url + 'get_useful_contacts/'+ this.resident_id +'/'+ this.condo_id +'/'+ this.key).subscribe(data=>{
      
      if(data.json().errorCode==0)
      {
        console.log(data.json());
        this.contact_list=data.json().data;
        this.noneresult = false;
        loading.dismiss();
      }else if(data.json().errorCode==1){
        console.log("FAILED");    
        this.noneresult = true;
        loading.dismiss();
        this.show_error_alert(data.json().message);
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
    
     //console.log(err);
     loading.dismiss();
     this.show_error_alert("PLease check your internet connection");
     console.log("ERROR IN SERVER");
     this.noneresult = true;
     });
    
    });
    
    }
    get_documents(){
      let loading = this.loadingCtrl.create({
        content: 'Please wait'
        });
        loading.present();
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
        
    return new Promise(resolve=>{
      this.http.get(this.url + 'get_useful_forms/'+ this.resident_id +'/'+ this.condo_id +'/'+ this.key).subscribe(data=>{
      
      if(data.json().errorCode==0)
      {
        console.log(data.json());
        this.document_list=data.json().data;
        this.noneresult = false;
        loading.dismiss();
      }else if(data.json().errorCode==1){
        console.log("FAILED");    
        this.noneresult = true;
        loading.dismiss();
        this.show_error_alert(data.json().message);
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
topclickbtn(id){

    this.topclick=id;
  
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
slideData = [{ image: "../../assets/imgs/1.jpg" },{ image: "../../assets/imgs/1.jpg" }] 

}
