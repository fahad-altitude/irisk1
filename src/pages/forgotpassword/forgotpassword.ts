import { Component } from '@angular/core';
import { NavController, NavParams, Platform, AlertController, LoadingController, App, ModalController } from 'ionic-angular';
import { Http} from '@angular/http';
import {LoginPage} from '../login/login';
import {UpdatepasswordPage} from '../updatepassword/updatepassword';
@Component({
  selector: 'page-forgotpassword',
  templateUrl: 'forgotpassword.html'
})
export class ForgotpasswordPage {
  
  public email:any;
  public url:any;
  public headers:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform,public alertCtrl: AlertController, public http:Http, public loadingCtrl: LoadingController,private app: App, private modalCtrl: ModalController)
  { 
     this.email="";
    this.url='http://staging.irisk.my/api/v3/';
  

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
    
                //  this.navCtrl.setRoot(LoginPage);
    
                   }
                 }
               ]
           });
                         
           alert.present();
        
        }
     
}

