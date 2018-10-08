import { Component } from '@angular/core';
import { NavController, NavParams, Platform, AlertController, LoadingController, App, ModalController, MenuController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import {DashboardPage} from '../dashboard/dashboard';
import {CommunityPage} from '../community/community';
import { LoginPage } from '../login/login';
import { Http} from '@angular/http';
import { SplashScreen } from '@ionic-native/splash-screen';


@Component({
  selector: 'page-units',
  templateUrl: 'units.html',
})
export class UnitsPage {
  public resident_id:any;
  public condo_id:any;
  public unit_id:any;
  public key:any;
  public units_list:any;
  public headers:any;
  public noneresult:any;
  public modules_list:any;
  public url:any;
  constructor(public navCtrl: NavController, 
    private splashScreen: SplashScreen,
    public navParams: NavParams, 
    public platform: Platform,
    public alertCtrl: AlertController, 
    public http:Http, 
    public loadingCtrl: LoadingController,
    private menu: MenuController,
    private app: App, 
    private modalCtrl: ModalController)
  {
    this.modules_list=[];
    this.resident_id=window.localStorage.getItem('resident_id');
    this.key=window.localStorage.getItem('token');
    this.condo_id=window.localStorage.getItem('condo_id');
    this.units_list=[];
    this.url='http://staging.irisk.my/api/v3/';
    platform.ready().then(() => { 
      this.getUnits(); 
      
    });
  }
  ionViewDidEnter() {
    this.menu.swipeEnable(false);
  }
  ionViewWillLeave() {
    this.menu.swipeEnable(true);
  }
  getUnits(){
    let loading = this.loadingCtrl.create({
    content: 'Please wait'
    });
    loading.present();
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return new Promise(resolve=>{
    this.http.get(this.url + 'get_user_units/'+ this.resident_id +'/'+ this.condo_id+'/'+ this.key,this.headers).subscribe(data=>{
    console.log(data.json());
    if(data.json().errorCode==0)
    {
      console.log("SUCCESS");      
      this.units_list=data.json().units_list;
      if(this.units_list.length==1){
        window.localStorage.setItem('condo_name',data.json().condo_name);
        window.localStorage.setItem('is_valid_unit','No');
        this.navCtrl.setRoot(DashboardPage);
      }
      window.localStorage.setItem('condo_name',data.json().condo_name);
      this.noneresult = false;
      loading.dismiss();
    }
    else if(data.json().errorCode==1){
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
show_errorkey_alert(des)
{
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
go_to_dashboard(){
  window.localStorage.setItem('unit_id', this.unit_id);
  this.navCtrl.setRoot(DashboardPage);
  
}
go_back(){
  if(window.localStorage.getItem('is_valid_communities')){
    window.localStorage.clear();
    this.navCtrl.setRoot(LoginPage); 
  }else{
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
  this.navCtrl.push(CommunityPage);
  }
}
}
