import { Component } from '@angular/core';
import { NavController, NavParams, Platform, AlertController, LoadingController, App, ModalController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { AdddepositsPage } from '../adddeposits/adddeposits';
import { DepositedetailPage } from '../depositedetail/depositedetail';
import { EpaytabPage } from '../epaytab/epaytab';
import { DashboardPage } from '../dashboard/dashboard';
import { ServicesPage } from '../services/services';
import { PromoPage } from '../promo/promo';
import { Http} from '@angular/http';
import { LoginPage } from '../login/login';
import { Storage } from '@ionic/storage';


/**
 * Generated class for the DepositsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-deposits',
  templateUrl: 'deposits.html',
})
export class DepositsPage {
  public condo_id:any;
  public key:any;
  public unit_id:any;
  public resident_id:any;
  public deposits_list:any;
  public adds_list:any;
  public currency:any;
  public url:any;
  public noneresult: any;
  deposittab: string = "deposits";
  public bankinfo:any;
  public headers:any;
  public deplist1:any;
  constructor(public navCtrl: NavController,
     public navParams: NavParams, 
     private storage: Storage,
     public platform: Platform,public alertCtrl: AlertController, public http:Http, public loadingCtrl: LoadingController,private app: App, private modalCtrl: ModalController) 
  {
    this.bankinfo=window.localStorage.getItem('community_bank_info');
    this.currency=window.localStorage.getItem('currency');
    this.url='http://staging.irisk.my/api/v3/';
    this.resident_id=window.localStorage.getItem('resident_id');
    this.key=window.localStorage.getItem('token');
    this.unit_id=window.localStorage.getItem('unit_id');
    this.condo_id=window.localStorage.getItem('condo_id');
    this.deposits_list=[];
    this.adds_list=[];
    this.noneresult='';
    platform.ready().then(() => {  
      this.getadimages();
      this.get_all_deposits();
      
      
    });
   
  }
  get_all_deposits(){
      let loading = this.loadingCtrl.create({
        content: 'Loading deposits...'
      });
      loading.present();
      this.getdepList()
        .then(data => {
          this.deplist1=data;
              if(this.deplist1.data=='http_error'){
            // this.systemerror();
            loading.dismiss();
        }else{
          console.log(this.deplist1.data);
            if(this.deplist1.data!=undefined) {
              this.noneresult = false;
              this.deposits_list=this.deplist1.data;
              loading.dismiss();
                    }else{
                console.log('sorry no records found');
              this.noneresult = true;
               loading.dismiss();
              }
        }	
       });
    }

    getdepList(){
   var headers = new Headers();
   headers.append('Content-Type', 'application/x-www-form-urlencoded');
   return new Promise(resolve => {
    this.http.get(this.url + 'get_resident_all_deposits/'+ this.resident_id +'/'+ this.condo_id+'/'+ this.unit_id+'/'+ this.key,{headers: this.headers}).subscribe(data => {
        //use either data.text() or data["_body"] or data.json()
       var deplist=data.json();
        if(data.json().status=="success"){
         resolve(deplist);
         
        }
        else
        resolve(false);
    },onerror=>{ 
console.log(onerror["data"])
  resolve('http_error')});
});
    }
    getadimages(){
      let loading = this.loadingCtrl.create({
        content: 'Loading data ...'
      });
      loading.present();
      var headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      return new Promise(resolve=>{
        this.http.get(this.url + 'get_condo_images/'+ this.condo_id +'/2',{headers: this.headers}).subscribe(data=>{
          console.log(data.json());
          if(data.json().errorCode==0)
          {
           
            this.adds_list=data.json().images_list;
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
         this.show_errorkey_alert("Invalid key");
         console.log("ERROR IN SERVER");
         this.noneresult = true;
         });
   
     });
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
    gotoadd_deposit(){
      this.navCtrl.push(AdddepositsPage);

    }
    depositedetail(post_id){
      this.navCtrl.push(DepositedetailPage,{
        data:post_id
      });
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
    slideData = [{ image: "../../assets/imgs/1.jpg" },{ image: "../../assets/imgs/1.jpg" }] 
}
