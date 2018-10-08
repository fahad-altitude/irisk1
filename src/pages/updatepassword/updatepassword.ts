import { Component } from '@angular/core';
import { NavController, NavParams, Platform, AlertController, LoadingController, App, ModalController } from 'ionic-angular';
import {CommunityPage} from '../community/community';
import {ForgotpasswordPage} from '../forgotpassword/forgotpassword';
import {LoginPage} from '../login/login';
import { Http} from '@angular/http';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-updatepassword',
  templateUrl: 'updatepassword.html'
})
export class UpdatepasswordPage {
  public email:any;
  public code:any;
  public password:any;
  public re_password:any;
  public result:any;
  public response: any;
  public url:any;
  public headers:any;
  public noneresult:any;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public platform: Platform,
    public alertCtrl: AlertController, 
    public http:Http, 
    public loadingCtrl: LoadingController,
    private app: App,
    private storage: Storage,

    private modalCtrl: ModalController)
  { 
    this.email=navParams.get('email');
    this.code="";
    this.password="";
    this.re_password="";
    this.url='http://staging.irisk.my/api/v3/';
   

  }
  
 
  sendupdatepasswordRequest(){
    let loading = this.loadingCtrl.create({
        content: 'Please wait'
      });
      loading.present();
      this.headers = new Headers();
      this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
        var creds = {
          // business_id: parseInt(window.localStorage.getItem('uid')),
          email:this.email,
          code:this.code,
          new_password:this.password,
       
      };
return new Promise(resolve=>{
    this.http.post(this.url + 'update_password' ,creds,this.headers).subscribe(data => {
    console.log(data.json());
    if(data.json().errorCode==0)
    {
      this.show_success_alert(data.json().message);   
      loading.dismiss();
    }else if(data.json().errorCode==1){
      this.show_error_alert(data.json().message);
      loading.dismiss();
    }
    else if(data.json().errorCode==2){
      loading.dismiss();
      this.show_error_alert(data.json().message);
    }
   else
   resolve(false);
},
    err=>{

   //console.log(err);
   loading.dismiss();
   this.show_error_alert("ERROR IN SERVER");
   });

});

}

sendpasswordRequest(){
  let loading = this.loadingCtrl.create({
      content: 'Please wait'
    });
    loading.present();
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
      var creds = {
        // business_id: parseInt(window.localStorage.getItem('uid')),
        email:this.email,
     
    };
return new Promise(resolve=>{
  this.http.post(this.url + 'forgot' ,creds,this.headers).subscribe(data => {
  console.log(data.json());
  if(data.json().errorCode==0)
  {
    this.navCtrl.push(UpdatepasswordPage,{
      email:this.email
    });
    this.show_error_alert(data.json().message);   
    loading.dismiss();
  }else if(data.json().errorCode==1){
    this.show_error_alert(data.json().message);
    loading.dismiss();
  }
  else if(data.json().errorCode==2){
    loading.dismiss();
    this.show_error_alert(data.json().message);
  }
 else
 resolve(false);
},
  err=>{

 //console.log(err);
 loading.dismiss();
 this.show_error_alert("ERROR IN SERVER");
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
           text: 'OK',
           handler: () => {
            window.localStorage.clear();
            this.storage.set('email', '');
            this.storage.set('passwordd', '');
            this.storage.set('condo_id', '');
            this.storage.set('unit_id', '');
        //  this.navCtrl.setRoot(LoginPage);

           }
         }
       ]
   });
                 
   alert.present();

}
show_success_alert(des)
{
  let alert = this.alertCtrl.create({
    
    //subTitle: "PURPOSE OF DEPOSIT",
    message: des,
  //  message: "<ion-item><p style='overflow:auto;white-space:normal;'>Test</p> <button ion-button outline item-right icon-left (click)='itemSelected()'><ion-icon name='eye'></ion-icon>View</button>",
    buttons: [
         {
           text: 'OK',
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

