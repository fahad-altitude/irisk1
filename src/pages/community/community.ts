import { Component } from '@angular/core';
import { NavController, NavParams, Platform, AlertController, LoadingController, App, ModalController, MenuController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { Http} from '@angular/http';
import {UnitsPage} from '../units/units';
import { LoginPage } from '../login/login';


// @IonicPage()
@Component({
  selector: 'page-community',
  templateUrl: 'community.html',
})
export class CommunityPage {

public resident_id:any;
public condo_id:any;
public key:any;
public url:any;
public condo_list:any;
public headers:any;
public noneresult:any;
public modules_list:any;
public qp : any;
public is_switch:any;
constructor(public navCtrl: NavController, 
  public navParams: NavParams, 
  public platform: Platform,
  public alertCtrl: AlertController, 
  public http:Http, 
  public loadingCtrl: LoadingController,
  private app: App, 

  private menu: MenuController,

  private modalCtrl: ModalController){    
    this.modules_list=[];
    this.condo_list=[];
    this.url='http://staging.irisk.my/api/v3/';
    platform.ready().then(() => {  
      this.resident_id=window.localStorage.getItem('resident_id');
     
      this.key=window.localStorage.getItem('token');
      this.is_switch=window.localStorage.getItem('is_switch');
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
      this.getCondos(); 
      });
  }
  ionViewDidEnter() {
    this.menu.swipeEnable(false);
  }
  ionViewWillLeave() {
    this.menu.swipeEnable(true);
  }
  getCondos(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait'
      });
      loading.present();
      this.headers = new Headers();
      this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
      return new Promise(resolve=>{
      this.http.get(this.url + 'get_user_condos/'+ this.resident_id +'/'+ this.key, this.headers).subscribe(data=>{
      console.log(data.json());
      if(data.json().errorCode==0)
      {
        console.log("SUCCESS");      
        this.condo_list=data.json().condos_list;
        if(this.condo_list.length==1){
          this.condo_id=window.localStorage.getItem('condo_id');
          window.localStorage.setItem('is_valid_communities','No');
          this.getModules();
         
        }
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
    getModules(){
    this.condo_id=this.condo_id;
    //  let loading = this.loadingCtrl.create({
       // content: 'Please wait'
     // });
     // loading.present();
      var headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      return new Promise(resolve=>{
        this.http.get(this.url + 'get_condo_modules/'+ this.condo_id +'/'+this.key,{headers: this.headers}).subscribe(data=>{
          console.log(data.json());
          if(data.json().errorCode==0)
          {
            this.modules_list=data.json().data;
            for(let i=0;i<this.modules_list.length;i++){
          
              if(this.modules_list[i].name=='Bills & Payments'){
          
                window.localStorage.setItem('e_module',this.modules_list[i].name);
                }
                if(this.modules_list[i].name=='Facility Booking'){
           
                window.localStorage.setItem('b_module',this.modules_list[i].name);
                }
                if(this.modules_list[i].name=='Deposits'){
            
                window.localStorage.setItem('d_module',this.modules_list[i].name);
                }
                if(this.modules_list[i].name=='Noticeboard'){
               
                window.localStorage.setItem('n_module',this.modules_list[i].name);
                }
                if(this.modules_list[i].name=='Help Desk'){
              
                window.localStorage.setItem('h_module',this.modules_list[i].name);
                }
                if(this.modules_list[i].name=='Community Wall'){
            
                window.localStorage.setItem('c_module',this.modules_list[i].name);
                }
                if(this.modules_list[i].name=='Useful Info'){
              
                window.localStorage.setItem('u_module',this.modules_list[i].name);
                }
                if(this.modules_list[i].name=='Visitors & Deliveries'){
               
                window.localStorage.setItem('v_module',this.modules_list[i].name);
                }
                if(this.modules_list[i].name=='SOS'){
            
                window.localStorage.setItem('ss_module',this.modules_list[i].name);
                }
                if(this.modules_list[i].name=='Announcements'){
            
                  window.localStorage.setItem('a_module',this.modules_list[i].name);
                  }
                  if(this.modules_list[i].name=='Services'){
                
                    window.localStorage.setItem('s_module',this.modules_list[i].name);
                    }
                    if(this.modules_list[i].name=='Offers & Promos'){
                
                      window.localStorage.setItem('o_module',this.modules_list[i].name);
                      }
                      if(this.modules_list[i].name=='Vehicles'){
                  
                        window.localStorage.setItem('vv_module',this.modules_list[i].name);
                        }
                        if(this.modules_list[i].name=='Intercom'){
                        
                          window.localStorage.setItem('i_module',this.modules_list[i].name);
                          }
                          
            }
           
           
            this.navCtrl.setRoot(UnitsPage);
            //loading.dismiss();
           
          }else if(data.json().errorCode==1){
            console.log("FAILED");
           
           // loading.dismiss();
            console.log("No Data Found");
          }
          else if(data.json().errorCode==2){
          //  loading.dismiss();
            this.show_errorkey_alert("Invalid key");
          }
         else
         resolve(false);
  },
          err=>{
   
         //console.log(err);
        // loading.dismiss();
         this.show_error_alert("PLease check your internet connection");
         console.log("ERROR IN SERVER");
         });
     });
      }
    getunits(){
      window.localStorage.setItem('is_switch',"");
      window.localStorage.setItem('condo_id',this.condo_id);
      this.getModules();
      this.navCtrl.setRoot(UnitsPage);
    }
    go_back(){
        window.localStorage.clear();
        this.navCtrl.setRoot(LoginPage); 
    }



}
