import { Component } from '@angular/core';
import { NavController, NavParams, Platform, AlertController, LoadingController, App, ModalController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { EpaypaymentdetailPage } from '../epaypaymentdetail/epaypaymentdetail';
import { EpayinvoicedetailPage } from '../epayinvoicedetail/epayinvoicedetail';
import { LoginPage } from '../login/login';
import { DashboardPage } from '../dashboard/dashboard';
import { ServicesPage } from '../services/services';
import { PromoPage } from '../promo/promo';
import { Storage } from '@ionic/storage';

import { Http} from '@angular/http';

// @IonicPage()
@Component({
  selector: 'page-epaytab',
  templateUrl: 'epaytab.html',
})
export class EpaytabPage {
  epay: string = "invoices";
  public condo_id:any;
  public key:any;
  public unit_id:any;
  public resident_id:any;
  public currency:any;
  public url:any;
  public noneresult: any;
  public noneresult2: any;
  public headers:any;
  public page_number:any;
  public page_number2:any;
  public invoices_list:any;
  public payments_list:any;
  public outstanding:any;

  constructor(public navCtrl: NavController, 
    private storage: Storage,
    public navParams: NavParams, public platform: Platform,public alertCtrl: AlertController, public http:Http, public loadingCtrl: LoadingController,private app: App, private modalCtrl: ModalController) 
  {
    this.page_number=0;
    this.page_number2=0;
    this.outstanding=0;
   
    this.invoices_list=[];
    this.payments_list=[];
    this.currency=window.localStorage.getItem('currency');
    this.url='http://staging.irisk.my/api/v3/';
    this.resident_id=window.localStorage.getItem('resident_id');
    this.key=window.localStorage.getItem('token');
    this.unit_id=window.localStorage.getItem('unit_id');
    this.condo_id=window.localStorage.getItem('condo_id');
    platform.ready().then(() => {  
      this.get_invoices_detail();
      this.get_payments_detail();
     
    });

   
  }
  get_invoices_detail(){
    let loading = this.loadingCtrl.create({
      content: 'Loading invoices ...'
    });
    loading.present();
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return new Promise(resolve=>{
      this.http.get(this.url + 'get_my_invoices/'+ this.resident_id+'/'+ this.condo_id+'/'+this.unit_id+'/'+this.key+'/'+this.page_number,{headers: this.headers}).subscribe(data=>{
        console.log(data.json());
        if(data.json().errorCode==0)
        {
          console.log("SUCCESS");
         
          this.invoices_list=data.json().data;
          this.outstanding=data.json().oustanding;
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
    doInfinite(infiniteScroll:any) {
        this.page_number++;
      var headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      return new Promise(resolve=>{
        this.http.get(this.url + 'get_my_invoices/'+ this.resident_id+'/'+ this.condo_id+'/'+this.unit_id+'/'+this.key+'/'+this.page_number,{headers: this.headers}).subscribe(data=>{
         
          if(data.json().errorCode==0)
          {
        
            this.invoices_list = (this.invoices_list).concat(data.json().data);
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
   
    get_payments_detail(){
      let loading = this.loadingCtrl.create({
        content: 'Loading payments ...'
      });
      loading.present();
      var headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      return new Promise(resolve=>{
        this.http.get(this.url + 'get_my_payments_list/'+ this.resident_id+'/'+ this.condo_id+'/'+this.unit_id+'/'+this.key+'/'+this.page_number2,{headers: this.headers}).subscribe(data=>{
          console.log(data.json());
          if(data.json().errorCode==0)
          {
            console.log(data.json());
            this.noneresult2 = false;
            this.payments_list=data.json().data;
            loading.dismiss();
          }else if(data.json().errorCode==1){   
            console.log(data.json().data);
            this.noneresult2 = true;
            loading.dismiss();
            console.log("No Data Found");
          }
          else if(data.json().errorCode==2){
            loading.dismiss();
            this.show_errorkey_alert("Invalid key");
            console.log("ERROR IN SERVER");
            this.noneresult2 = true;

          }
         else
         resolve(false);
  },
          err=>{
   
         //console.log(err);
         loading.dismiss();
         this.show_error_alert("PLease check your internet connection");
         console.log("ERROR IN SERVER");
         this.noneresult2 = true;
         });
   
     });
      }
      doInfinite2(infiniteScroll:any) {
        this.page_number2++;
      var headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      return new Promise(resolve=>{
        this.http.get(this.url + 'get_my_payments_list/'+ this.resident_id+'/'+ this.condo_id+'/'+this.unit_id+'/'+this.key+'/'+this.page_number2,{headers: this.headers}).subscribe(data=>{
         
          if(data.json().errorCode==0)
          {      
            this.payments_list = (this.payments_list).concat(data.json().data);
            infiniteScroll.complete();
                  }
                  else          
              infiniteScroll.enable(false);
              },onerror=>{ 
          infiniteScroll.complete(); 
        });
          });
  }
  paymentdetail(post_id){
    this.navCtrl.push(EpaypaymentdetailPage,{
      data:post_id
    });
  }
  invoicedetail(post_id){
    this.navCtrl.push(EpayinvoicedetailPage,{
      data:post_id
    });
  }
  dashboard(){
    this.navCtrl.setRoot(DashboardPage);
  }
  epay1(){
    this.navCtrl.push(EpaytabPage);
  }
  services(){
    this.navCtrl.push(ServicesPage);
  }
  promo(){
    this.navCtrl.push(PromoPage);
  }
}
