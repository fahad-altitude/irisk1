import { Component } from '@angular/core';
import { NavController, NavParams, Platform, AlertController, LoadingController, App, ModalController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { Http} from '@angular/http';
import { LoginPage } from '../login/login';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the HelpdestindPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-helpdestind',
  templateUrl: 'helpdestind.html',
})
export class HelpdestindPage {
  public condo_id:any;
  public key:any;
  public unit_id:any;
  public resident_id:any;
  public url:any;
  public post_id:any;
  public detail_ticket:any;
  public comments_list:any;
  public images_list:any;
  helpdesk:string='messages';
  public noneresult: any;
  public headers:any;
  constructor(public navCtrl: NavController,
    private storage: Storage,
    public navParams: NavParams, public platform: Platform,public alertCtrl: AlertController, public http:Http, public loadingCtrl: LoadingController,private app: App, private modalCtrl: ModalController) 
  {
    
    this.post_id=navParams.get('data');
    this.images_list=[];
    this.comments_list=[];
    this.detail_ticket=[];
    this.url='http://staging.irisk.my/api/v3/';
    this.resident_id=window.localStorage.getItem('resident_id');
    this.key=window.localStorage.getItem('token');
    platform.ready().then(() => {
      this.get_complete_tcket_details();
      });
 
  }

 
    get_complete_tcket_details(){
      let loading = this.loadingCtrl.create({
        content: 'Please wait'
        });
        loading.present();
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
        
    return new Promise(resolve=>{
      this.http.get(this.url + 'get_singleticket/'+ this.resident_id +'/'+ this.post_id +'/'+ this.key).subscribe(data=>{
      console.log(data.json());
      if(data.json().errorCode==0)
      {
        this.detail_ticket=data.json().data[0];
        this.comments_list=data.json().help_desk_comments;
        this.images_list=data.json().help_desk_images
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
            this.navCtrl.setRoot(LoginPage);
           }
         }
       ]
   });
                 
   alert.present();

}


}
