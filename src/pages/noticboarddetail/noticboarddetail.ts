import { Component } from '@angular/core';
import { NavController, NavParams, Platform, AlertController, LoadingController, App, ModalController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { LoginPage } from '../login/login';
import { EpaytabPage } from '../epaytab/epaytab';
import { DashboardPage } from '../dashboard/dashboard';
import { ServicesPage } from '../services/services';
import { PromoPage } from '../promo/promo';
import { Http} from '@angular/http';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-noticboarddetail',
  templateUrl: 'noticboarddetail.html',
})
export class NoticboarddetailPage {
  public resident_id:any;
  public key:any;
  public url:any;
  public post_id:any;
  public notice_detail:any;
  public notice_images:any;
  public headers:any;
  public noneresult:any;
  constructor(public navCtrl: NavController, 
    private storage: Storage,
    public navParams: NavParams, public platform: Platform,public alertCtrl: AlertController, public http:Http, public loadingCtrl: LoadingController,private app: App, private modalCtrl: ModalController) 
  {
    this.noneresult='';
   this.post_id=navParams.get('data');
    this.key=window.localStorage.getItem('token');
    this.resident_id=window.localStorage.getItem('resident_id');
    this.url='http://staging.irisk.my/api/v3/';

    platform.ready().then(() => {  
      this.getsinglenoticboard();
     
    });
  }
 
  getsinglenoticboard(){
    let loading = this.loadingCtrl.create({
      content: 'Loading notice detail ...'
    });
    loading.present();
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return new Promise(resolve=>{
      this.http.get(this.url + 'get_post/'+ this.resident_id +'/'+this.post_id+'/'+this.key).subscribe(data=>{
        console.log(data.json());
        if(data.json().errorCode==0)
        {
          console.log("SUCCESS");      
          this.notice_detail=data.json().data;
          this.notice_images=data.json().post_images;
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
slideData = [{ image: "../../assets/imgs/Noticeboard1.png" },{ image: "../../assets/imgs/Noticeboard1.png" }]
}
