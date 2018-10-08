import { Component } from '@angular/core';
import { NavController, NavParams, Platform, AlertController, LoadingController, App, ModalController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { HelpdestindPage} from '../helpdestind/helpdestind';
import { Http} from '@angular/http';
import { LoginPage } from '../login/login';
import { HelpdestcreatePage } from '../helpdestcreate/helpdestcreate';
import { EpaytabPage } from '../epaytab/epaytab';
import { DashboardPage } from '../dashboard/dashboard';
import { ServicesPage } from '../services/services';
import { PromoPage } from '../promo/promo';
import { Storage } from '@ionic/storage';

// @IonicPage()
@Component({
  selector: 'page-helpdestmytck',
  templateUrl: 'helpdestmytck.html',
})
export class HelpdestmytckPage {
   public condo_id:any;
   public key:any;
   public unit_id:any;
   public resident_id:any;
   public tickets_list:any;
   public url:any;
   public status:any;
   public pagenumber:any;
   public condo_name:any;
   public headers:any;
   public noneresult:any;
   public mystatus:any;
   constructor(public navCtrl: NavController, 
    private storage: Storage,
    public navParams: NavParams, public platform: Platform,public alertCtrl: AlertController, public http:Http, public loadingCtrl: LoadingController,private app: App, private modalCtrl: ModalController) 
   {
    this.noneresult='';
    this.condo_name=window.localStorage.getItem('condo_name');
    this.status=0;
    this.pagenumber=0;
    this.mystatus=0;
    this.url='http://staging.irisk.my/api/v3/';
    this.resident_id=window.localStorage.getItem('resident_id');
    this.key=window.localStorage.getItem('token');
    this.unit_id=window.localStorage.getItem('unit_id');
    this.condo_id=window.localStorage.getItem('condo_id');
    this.tickets_list=[];
    platform.ready().then(() => {  
      this.get_all_tickets();
     
    });
   
  }
 
    get_all_tickets(){
     
      
      this.mystatus=this.mystatus
   if(this.mystatus!=0){
    this.status=this.mystatus;
    this.pagenumber=0;
   }else{
    this.status=this.status;
   }
      let loading = this.loadingCtrl.create({
        content: 'Loading tickets ...'
      });
      loading.present();
      var headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      return new Promise(resolve=>{
        this.http.get(this.url + 'my_helptickets/'+ this.resident_id +'/'+ this.condo_id+'/'+ this.unit_id+'/'+ this.key +'/'+ this.status+'/'+ this.pagenumber).subscribe(data=>{
          console.log(data.json());
          if(data.json().errorCode==0)
          {
            console.log("SUCCESS");      
            this.tickets_list=data.json().data;
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
      doInfinite(infiniteScroll:any) {
 
        this.pagenumber++;
 
      var headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      return new Promise(resolve=>{
        this.http.get(this.url + 'my_helptickets/'+ this.resident_id +'/'+ this.condo_id+'/'+ this.unit_id+'/'+ this.key +'/'+ this.status+'/'+ this.pagenumber).subscribe(data=>{
         
          if(data.json().errorCode==0)
          {
        
            this.tickets_list = (this.tickets_list).concat(data.json().data);
            infiniteScroll.complete();
                  }
                  else
                     
              infiniteScroll.enable(false);
              },onerror=>{ 

          infiniteScroll.complete();
       
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
  gotohelpdetail(id){
    
    this.navCtrl.push(HelpdestindPage,{
      data: id
    });
  }
  gotocreatehelp(){
    this.navCtrl.push(HelpdestcreatePage);
  }
  dashboard(){
    this.navCtrl.push(DashboardPage);
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
