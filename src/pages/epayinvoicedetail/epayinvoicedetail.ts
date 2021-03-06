import { Component } from '@angular/core';
import { NavController, NavParams, Platform, AlertController, LoadingController, App, ModalController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { Http} from '@angular/http';
import { LoginPage } from '../login/login';
import { DashboardPage } from '../dashboard/dashboard';
import { Storage } from '@ionic/storage';
import { DocumentViewer ,DocumentViewerOptions} from '@ionic-native/document-viewer';

// @IonicPage()
@Component({
  selector: 'page-epayinvoicedetail',
  templateUrl: 'epayinvoicedetail.html',
})
export class EpayinvoicedetailPage {
  public condo_id:any;
  public key:any;
  public unit_id:any;
  public resident_id:any;
  public currency:any;
  public url:any;
  public headers:any;
  public invoice_deail:any;
  private document: DocumentViewer
  
  public item_deail:any;
  public post_id:any;
  constructor(public navCtrl: NavController, 
    private storage: Storage,
    public navParams: NavParams, public platform: Platform,public alertCtrl: AlertController, public http:Http, public loadingCtrl: LoadingController,private app: App, private modalCtrl: ModalController)
  {
   this.invoice_deail=[];
   this.item_deail=[];
    this.post_id=navParams.get('data');
    this.currency=window.localStorage.getItem('currency');
    this.url='http://staging.irisk.my/api/v3/';
    this.resident_id=window.localStorage.getItem('resident_id');
    this.key=window.localStorage.getItem('token');
    this.unit_id=window.localStorage.getItem('unit_id');
    this.condo_id=window.localStorage.getItem('condo_id');
    platform.ready().then(() => {  
      this.get_invoices_item_detail_detail();
     
    });
  }
  get_invoices_item_detail_detail(){
    let loading = this.loadingCtrl.create({
      content: 'Loading invoice deatil ...'
    });
    loading.present();
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return new Promise(resolve=>{
      this.http.get(this.url + 'get_singe_invoice/'+ this.resident_id+'/'+ this.condo_id+'/'+this.unit_id+'/'+this.post_id+'/'+this.currency+'/'+this.key,{headers: this.headers}).subscribe(data=>{
        console.log(data.json());
        if(data.json().errorCode==0)
        {
          console.log("SUCCESS");
          console.log(data.json());
          this.invoice_deail=data.json();
          this.item_deail=data.json().data;
          loading.dismiss();
        }else if(data.json().errorCode==1){
          console.log("FAILED");
          console.log(data.json());
          loading.dismiss();
          console.log("No Data Found");
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
       this.show_error_alert("PLease check your internet connection");
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
    view_pdf(path){
      const options: DocumentViewerOptions = {
        title: 'Invoice'
      }
      
      this.document.viewDocument('../../assets/imgs/123.pdf', 'application/pdf', options)
    }
}
