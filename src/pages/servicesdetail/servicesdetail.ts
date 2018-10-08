import { Component } from '@angular/core';
import { NavController, NavParams, Platform, AlertController, LoadingController, App, ModalController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { Http} from '@angular/http';
import { LoginPage } from '../login/login';
import { ServicesdetailvendorPage } from '../servicesdetailvendor/servicesdetailvendor';
import { Storage } from '@ionic/storage';

// @IonicPage()
@Component({
  selector: 'page-servicesdetail',
  templateUrl: 'servicesdetail.html',
})
export class ServicesdetailPage {
  public path:any;
  public key:any;
  public resident_id:any;
  public condo_id:any;
  public post_id:any;
  public url:any;
  public service_items:any;
  public noneresult: any;
  public headers:any;
  constructor(public navCtrl: NavController,
    private storage: Storage,
    public navParams: NavParams, public platform: Platform,public alertCtrl: AlertController, public http:Http, public loadingCtrl: LoadingController,private app: App, private modalCtrl: ModalController) 
  {  
    this.post_id=navParams.get('data');
    this.service_items=[];
    this.url='http://staging.irisk.my/api/v3/';
    this.resident_id=window.localStorage.getItem('resident_id');
    this.condo_id=window.localStorage.getItem('condo_id');
    this.key=window.localStorage.getItem('token');
    platform.ready().then(() => {
      this.get_service_items();
      });
 
  }

 
  get_service_items(){
      let loading = this.loadingCtrl.create({
        content: 'Please wait'
        });
        loading.present();
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
        
    return new Promise(resolve=>{
      this.http.get(this.url + 'get_services_api_cat/'+ this.resident_id +'/' + this.condo_id+'/' + this.post_id+'/' + this.key,this.headers).subscribe(data=>{
      console.log(data.json());
      if(data.json().errorCode==0)
      {
        this.service_items=data.json().data;
        this.path=data.json().url;
        console.log(this.service_items);
        this.noneresult = false;
        loading.dismiss();
      }else if(data.json().errorCode==1){
        console.log("FAILED");    
        this.noneresult = true;
        loading.dismiss();
        //this.show_error_alert(data.json().message);
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

vendordetail(address,phone,email,image,description){
  this.navCtrl.push(ServicesdetailvendorPage,{
    address:address,
    phone:phone,
    email:email,
    image:image,
    description:description,
    path:this.path
  });
}
}
