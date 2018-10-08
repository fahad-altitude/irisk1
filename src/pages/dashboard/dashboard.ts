import { Component } from '@angular/core';
import { NavController, NavParams, Platform, AlertController, LoadingController, App, ModalController,Events } from 'ionic-angular';
import { Http} from '@angular/http';
import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { SplashScreen } from '@ionic-native/splash-screen';
import { EpaytabPage } from '../epaytab/epaytab';
import { BookingPage } from '../booking/booking';
import { DepositsPage } from '../deposits/deposits';
import { NoticboardPage } from '../noticboard/noticboard';
import { HelpdestmytckPage } from '../helpdestmytck/helpdestmytck';
import { CommunitywallPage } from '../communitywall/communitywall';
import { UsefulinfotabPage } from '../usefulinfotab/usefulinfotab';
import { VisitortabPage } from '../visitortab/visitortab';
import { ServicesPage } from '../services/services';
import { PromoPage } from '../promo/promo';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html'
})
export class DashboardPage {
  public condo_id:any;
  public key:any;
  public adds_list:any='';
  public url:any;
  public condo_name:any;
  public noneresult: any;
  public headers:any;
  public epay_module:any;
  public booking_module:any;
  public deposits_module:any;
  public noticeboard_module:any;
  public helpdesk_module:any;
  public community_wall_module:any;
  public usefullink_module:any;
  public visitors_module:any;
  public sos_module:any;
  public announcement_module:any;
  public services_module:any;
  public offerspromos_module:any;
  public vehicles_module:any;
  public intercom_module:any;
  constructor(public navCtrl: NavController,
    public events: Events,private splashScreen: SplashScreen,public navParams: NavParams, public platform: Platform,public alertCtrl: AlertController, public http:Http, public loadingCtrl: LoadingController,private app: App, private modalCtrl: ModalController) 
  {
    this.key=window.localStorage.getItem('token');
    this.condo_id=window.localStorage.getItem('condo_id');
    this.adds_list=[];
    this.url='http://staging.irisk.my/api/v3/';
    platform.ready().then(() => {
      window.localStorage.setItem('is_login',"yes");
      this.events.publish('user:login');
      this.epay_module=window.localStorage.getItem('e_module');
      this.booking_module=window.localStorage.getItem('b_module');
      this.deposits_module=window.localStorage.getItem('d_module');
      this.noticeboard_module=window.localStorage.getItem('n_module');
      this.helpdesk_module=window.localStorage.getItem('h_module');
      this.community_wall_module=window.localStorage.getItem('c_module'); 
      this.usefullink_module=window.localStorage.getItem('u_module');
      this.visitors_module=window.localStorage.getItem('v_module');
      this.sos_module=window.localStorage.getItem('ss_module');
      this.announcement_module=window.localStorage.getItem('a_module');
      this.services_module=window.localStorage.getItem('s_module');
      this.offerspromos_module=window.localStorage.getItem('o_module');
      this.vehicles_module=window.localStorage.getItem('vv_module');
      this.intercom_module=window.localStorage.getItem('i_module');
      this.condo_name=window.localStorage.getItem('condo_name');
      this.getadimages();   
      this.getCommunitySettings();
      this.splashScreen.hide();
  
    });
  }
    getCommunitySettings(){
      let loading = this.loadingCtrl.create({
        content: 'Loading data ...'
      });
      loading.present();
      var headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      return new Promise(resolve=>{
        this.http.get(this.url + 'get_community_settings/'+ this.condo_id +'/'+this.key,{headers: this.headers}).subscribe(data=>{
          console.log(data.json());
          if(data.json().errorCode==0)
          {
          window.localStorage.setItem('merchant_id', data.json().data['merchant_id']);
          window.localStorage.setItem('verify_key', data.json().data['verify_key']);
          window.localStorage.setItem('invoice_notes', data.json().data['invoice_notes']);
          window.localStorage.setItem('currency', data.json().data['currency']);
          window.localStorage.setItem('country',data.json().data['country']);
          window.localStorage.setItem('community_bank_info', data.json().data['community_bank_info']);
          window.localStorage.setItem('invoice_notes', data.json().data['invoice_notes']);
          window.localStorage.setItem('address_format', data.json().data['address_format']);
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
      getadimages(){
        //let loading = this.loadingCtrl.create({
         // content: 'Loading data ...'
      //  });
      //  loading.present();
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        return new Promise(resolve=>{
          this.http.get(this.url + 'get_condo_images/'+ this.condo_id +'/2',{headers: this.headers}).subscribe(data=>{
            console.log(data.json());
            if(data.json().errorCode==0)
            {
              console.log(data.json().images_list);
              this.adds_list=data.json().images_list;
              this.noneresult = false;
            //  loading.dismiss();
            }else if(data.json().errorCode==1){
              console.log("FAILED");
              this.noneresult = true;
             // loading.dismiss();
              console.log("No Data Found");
            }
            else if(data.json().errorCode==2){
             // loading.dismiss();
              this.show_errorkey_alert("Invalid key");
              console.log("ERROR IN SERVER");
              this.noneresult = true;
            }
           else
           resolve(false);
    },
            err=>{
     
           //console.log(err);
          // loading.dismiss();
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
                this.app.getRootNav().setRoot(LoginPage);
               }
             }
           ]
       });           
       alert.present();
    }
 
  gotoepay(){
    this.navCtrl.push(EpaytabPage);
  }
  gotobooking(){
    this.navCtrl.push(BookingPage);
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
  gotocommunitywall(){
    this.navCtrl.push(CommunitywallPage);
  }
  gotousefullinks(){
    this.navCtrl.push(UsefulinfotabPage);
  }
  gotovisitor(){
    this.navCtrl.push(VisitortabPage);
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
