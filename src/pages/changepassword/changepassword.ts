import { Component } from '@angular/core';
import { NavController, NavParams, Platform, AlertController, LoadingController, App, ModalController } from 'ionic-angular';
import {CommunityPage} from '../community/community';
import { LoginPage } from '../login/login';
import { Http} from '@angular/http';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-changepassword',
  templateUrl: 'changepassword.html'
})
export class ChangepasswordPage {
  
  public new_password:any;
  public re_password:any;
  public old_password:any;
  public resident_id:any;
  public condo_id:any;
  public unit_id:any;
  public key:any;
  public url:any;
  public headers:any;
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
    this.new_password="";
    this.re_password="";
    this.old_password="";
    this.resident_id=window.localStorage.getItem('resident_id');
    this.key=window.localStorage.getItem('token');
    this.unit_id=window.localStorage.getItem('unit_id');
    this.condo_id=window.localStorage.getItem('condo_id');
    this.url='http://staging.irisk.my/api/v3/';
    

  }
 
 
  sendchangepassword(){
            let loading = this.loadingCtrl.create({
                content: 'Please wait'
              });
              loading.present();
              this.headers = new Headers();
              this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
                var creds = {
                  // business_id: parseInt(window.localStorage.getItem('uid')),
                  resident_id:this.resident_id,
                  condo_id:this.condo_id,
                  unit_id:this.unit_id,
                  current_password:this.old_password,
                  new_password:this.new_password,
                  key:this.key,
              };
        return new Promise(resolve=>{
            this.http.post(this.url + 'change_password' ,creds,this.headers).subscribe(data => {
            console.log(data.json());
            if(data.json().errorCode==0)
            {
    
             
              this.show_success_alert(data.json().message);
              loading.dismiss();
            }else if(data.json().errorCode==1){
              console.log("FAILED");    
              loading.dismiss();
              this.show_error_alert(data.json().message);
            }
            else if(data.json().errorCode==2){
              loading.dismiss();
              this.show_errorkey_alert("Invalid key");
              console.log("ERROR IN SERVER");
            }
           else
           resolve(false);
    },
            err=>{
     
           //console.log(err);
           loading.dismiss();
           this.show_error_alert("ERROR IN SERVER");
           console.log("ERROR IN SERVER");
          
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
    
                  
    
                   }
                 }
               ]
           });
                         
           alert.present();
        
        }
        show_success_alert(des)
        {
          let alert = this.alertCtrl.create({
          message: des,
          buttons: [
                 {
                   text: 'OK',
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
        show_errorkey_alert(des)
        {
          let alert = this.alertCtrl.create({
            message: des,
            buttons: [
                 {
                   text: 'ok',
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
     
}

