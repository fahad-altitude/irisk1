import { Component } from '@angular/core';
import { NavController, NavParams, Platform, AlertController, LoadingController, App, ModalController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms'
import { DepositsPage } from '../deposits/deposits';
import { RestProvider } from '../../providers/rest/rest';
import { HelpdestmytckPage } from '../helpdestmytck/helpdestmytck';
import { NoticboardPage } from '../noticboard/noticboard';
import { CommunitywallpostPage } from '../communitywallpost/communitywallpost';
import { LoginPage } from '../login/login';
import { Storage } from '@ionic/storage';

import { EpaytabPage } from '../epaytab/epaytab';
import { DashboardPage } from '../dashboard/dashboard';
import { ServicesPage } from '../services/services';
import { PromoPage } from '../promo/promo';

import { Http} from '@angular/http';

// @IonicPage()
@Component({
  selector: 'page-communitywall',
  templateUrl: 'communitywall.html',
})
export class CommunitywallPage {

  private todo : FormGroup;

  public condo_id:any;
  public key:any;
  public resident_id:any;
  public unit_id:any;
  public post_list:any;
  public url:any;
  public noneresult: any;
  public headers:any;
  public comment_name:any;
  public post_id:any;
  constructor(private formBuilder: FormBuilder,
    private storage: Storage,
    public navCtrl: NavController, public navParams: NavParams, public platform: Platform,public alertCtrl: AlertController, public http:Http, public loadingCtrl: LoadingController,private app: App, private modalCtrl: ModalController) 
  {
    this.todo = this.formBuilder.group({
      comment_name: ['', Validators.required],
    });
   
    this.key=window.localStorage.getItem('token');
    this.condo_id=window.localStorage.getItem('condo_id');
    this.resident_id=window.localStorage.getItem('resident_id');
    this.unit_id=window.localStorage.getItem('unit_id');
    this.post_list=[];
    this.url='http://staging.irisk.my/api/v3/';
    platform.ready().then(() => {
    this.getCommunityposts();  
    });

  }
  getCommunityposts(){
    let loading = this.loadingCtrl.create({
      content: 'Loading data ...'
    });
    loading.present();
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return new Promise(resolve=>{
      this.http.get(this.url + 'community_posts_list/'+ this.resident_id +'/'+ this.condo_id +'/'+ this.unit_id+'/'+ this.key,{headers: this.headers}).subscribe(data=>{
        console.log(data.json());
        if(data.json().errorCode==0)
        {
          console.log(data.json());
          this.post_list=data.json().data;
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
    postcomment(post_id){
      // this.comment_name=this.todo.value['comment_name'];
      this.post_id=post_id;
      console.log(this.comment_name);
      let loading = this.loadingCtrl.create({
        content: 'Please wait'
        });
        loading.present();
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
          var creds = {
            resident_id:this.resident_id,
            condo_id:this.condo_id,
            unit_id:this.unit_id,
            post_id:this.post_id,
            comment:this.comment_name,
            token:this.key,
        };
    return new Promise(resolve=>{
      this.http.post(this.url + 'submit_community_wall_post_comment' ,creds,this.headers).subscribe(data => {
      console.log(data.json());
      if(data.json().errorCode==0)
      {
        console.log("SUCCESS");      
        console.log(data.json().data);
      this.show_success_alert('Successfully posted');
        this.noneresult = false;
        this.comment_name='';
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
    show_success_alert(des)
{
  let alert = this.alertCtrl.create({
    
    //subTitle: "PURPOSE OF DEPOSIT",
    message: des,
  //  message: "<ion-item><p style='overflow:auto;white-space:normal;'>Test</p> <button ion-button outline item-right icon-left (click)='itemSelected()'><ion-icon name='eye'></ion-icon>View</button>",
    buttons: [
         {
           text: 'Close',
           handler: () => {
            this.post_list=[];
      this.getCommunityposts();

           }
         }
       ]
   });
                 
   alert.present();

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


gotoDeposits()
{
this.navCtrl.push(DepositsPage);
}
gotonotice(){
  this.navCtrl.push(NoticboardPage);
}
gotohelp(){
  this.navCtrl.push(HelpdestmytckPage);
}
communitypost(){
  this.navCtrl.push(CommunitywallpostPage);
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
