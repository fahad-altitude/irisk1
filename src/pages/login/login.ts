import { Component } from '@angular/core';
import { NavController, NavParams, Platform, AlertController, LoadingController, App, ModalController, MenuController } from 'ionic-angular';
import {CommunityPage} from '../community/community';
import {ForgotpasswordPage} from '../forgotpassword/forgotpassword';
import { Storage } from '@ionic/storage';
import { Events} from 'ionic-angular';
import {DashboardPage} from '../dashboard/dashboard';
import { Http} from '@angular/http';
import { SplashScreen } from '@ionic-native/splash-screen';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  // variables
  public email:any;
  public password:any;
  public result:any;
  public response: any;
  public url:any;
  public headers:any;
  public noneresult:any;
  public community:any=0;
  public condo_id;
  public unit_id;
  public unit=0;
  public modules_list:any;
  public units_list;
  public resident_id;
  public key:any;
  public condo_list;
  // variables
// constructor
  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public platform: Platform,
    public alertCtrl: AlertController, 
    public http:Http, 
    public loadingCtrl: LoadingController,
    private app: App,
    public events: Events,
    private storage: Storage,
    private menu: MenuController,
    private splashScreen: SplashScreen,
    private modalCtrl: ModalController)
  { 
    platform.ready().then(() => {
      if(window.localStorage.getItem('is_login')=="yes"){
        this.navCtrl.setRoot(DashboardPage);
      }else{
        this.splashScreen.hide();
      window.localStorage.setItem('e_module',"");
      window.localStorage.setItem('b_module',"");
      window.localStorage.setItem('d_module',"");
      window.localStorage.setItem('n_module',"");
      window.localStorage.setItem('h_module',"");
      window.localStorage.setItem('c_module',"");
      window.localStorage.setItem('u_module',"");
      window.localStorage.setItem('v_module',"");
      window.localStorage.setItem('ss_module',"");
      window.localStorage.setItem('a_module',"");
      window.localStorage.setItem('s_module',"");
      window.localStorage.setItem('o_module',"");
      window.localStorage.setItem('vv_module',"");
      window.localStorage.setItem('i_module',"");
      this.noneresult='';
      this.url='http://staging.irisk.my/api/v3/';
      this.response=[];
      }
    });
  }
  ionViewDidEnter() {
    this.menu.swipeEnable(false);
  }
  ionViewWillLeave() {
    this.menu.swipeEnable(true);
  }
// constructor
sendPostRequest(){
  let loading = this.loadingCtrl.create({
      content: 'Please wait'
  });
  loading.present();
  this.headers = new Headers();
  this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
    var creds = {
      email:this.email,
      password:this.password,
  };
  return new Promise(resolve=>{
    this.http.post(this.url + 'login' ,creds,this.headers).subscribe(data => {
    if(data.json().errorCode==0){      
        resolve(data.json().data);
        this.response=data.json();
        this.response=this.response.data[0];
        console.log('this.response',this.response); 
        window.localStorage.setItem('resident_id', this.response.resident_id);
        window.localStorage.setItem('condo_id', this.response.condo_id);
        window.localStorage.setItem('condo_name', this.response.condo_name);
        window.localStorage.setItem('image_url', this.response.image_url);
        window.localStorage.setItem('is_resident', this.response.is_resident);
        window.localStorage.setItem('mailing_address', this.response.mailing_address);
        window.localStorage.setItem('name', this.response.name);
        window.localStorage.setItem('next_step', this.response.next_step);
        window.localStorage.setItem('next_step_selection', this.response.next_step_selection);
        window.localStorage.setItem('phone_number', this.response.phone_number);
        window.localStorage.setItem('token', this.response.token);
        window.localStorage.setItem('type', this.response.type);
        window.localStorage.setItem('unit_id', this.response.unit_id);
        window.localStorage.setItem('is_switch',"");
        window.localStorage.setItem('is_login',"");
        this.noneresult = false;
        loading.dismiss();
        this.navCtrl.setRoot(CommunityPage);
      }
      else if(data.json().errorCode==1){
        console.log("FAILED");    
        this.noneresult = true;
        loading.dismiss();
        this.show_error_alert(data.json().message);
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
      loading.dismiss();
      this.show_error_alert("ERROR IN SERVER");
      console.log("ERROR IN SERVER");
      this.noneresult = true;
      });
  });
}
show_error_alert(des){
  let alert = this.alertCtrl.create({
    message: des,
    buttons: [
          {
            text: 'OK',
            handler: () => {
              window.localStorage.clear();
           
            this.navCtrl.setRoot(LoginPage);
            }
          }
        ]
    });     
    alert.present();
}
show_errorkey_alert(des){
  let alert = this.alertCtrl.create({
    message: des,
    buttons: [
          {
            text: 'ok',
            handler: () => {
              window.localStorage.clear();
          
            this.app.getRootNav().setRoot(LoginPage);
            }
          }
        ]
    });          
    alert.present();
}
go_to_forgot_password(){
  this.navCtrl.push(ForgotpasswordPage);
}
}

