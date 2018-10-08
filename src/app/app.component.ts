
import {Component} from '@angular/core';
import {Platform,App,Events} from 'ionic-angular';
import { MenuController } from 'ionic-angular';
import { RestProvider } from '../providers/rest/rest';
import { Http} from '@angular/http';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';



import { BookingPage } from '../pages/booking/booking';
import { CommunityPage } from '../pages/community/community';
import { CommunitywallPage } from '../pages/communitywall/communitywall';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { DepositsPage } from '../pages/deposits/deposits';
import { EpaytabPage } from '../pages/epaytab/epaytab';
import { HelpdestmytckPage } from '../pages/helpdestmytck/helpdestmytck';
import { LoginPage } from '../pages/login/login';
import { NoticboardPage } from '../pages/noticboard/noticboard';
import { PromoPage } from '../pages/promo/promo';
import { ServicesPage } from '../pages/services/services';
import { UsefulinfotabPage } from '../pages/usefulinfotab/usefulinfotab';
import { VisitortabPage } from '../pages/visitortab/visitortab';
import { MyprofilePage } from '../pages/myprofile/myprofile';
import { BookingdetailPage } from '../pages/bookingdetail/bookingdetail';
import { ForgotpasswordPage } from '../pages/forgotpassword/forgotpassword';
import { MyprofiledetailPage } from '../pages/myprofiledetail/myprofiledetail';
import { MyprofileinvitePage } from '../pages/myprofileinvite/myprofileinvite';
import { MyprofilesosPage } from '../pages/myprofilesos/myprofilesos';
import { MyprofileusermanagementPage } from '../pages/myprofileusermanagement/myprofileusermanagement';
import { MyprofileuservehiclePage } from '../pages/myprofileuservehicle/myprofileuservehicle';
import { UpdatepasswordPage } from '../pages/updatepassword/updatepassword';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  
 rootPage:any = LoginPage;
  // rootPage:any = MyprofilesosPage;  
  public url:any;
  public headers:any;
  public resident_id:any;
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
  constructor(public platform: Platform,
    public menuCtrl: MenuController,
    public http:Http,
    private app: App, 
   
    private statusBar: StatusBar, 
    public events: Events,
    private splashScreen: SplashScreen) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      this.url='http://staging.irisk.my/api/v3/';
      if(window.localStorage.getItem('is_login')=="yes"){
        // this.splashScreen.hide();
        this.app.getRootNav().setRoot(DashboardPage);
      }
    });
  }
  moduleasign(){
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
  }
  gotologout()
  {
      var headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      return new Promise(resolve => {
       this.http.get(this.url + 'logout/'+ this.resident_id ,{headers: this.headers}).subscribe(data => {
           //use either data.text() or data["_body"] or data.json()
          console.log(data.json());
           if(data.json().status=="success"){
            window.localStorage.clear();
            this.menuCtrl.close();
            this.app.getRootNav().setRoot(LoginPage);
           }
           else
           resolve(false);
       },onerror=>{ 
   console.log(onerror["data"])
     resolve('http_error')});
   });
  }
  gotobooking(){
    this.menuCtrl.close();
    this.app.getRootNav().push(BookingPage);
  }
  gotodeposits()
  {
    this.menuCtrl.close();
    this.app.getRootNav().push(DepositsPage);
  }
  gotonoticboard(){
    this.menuCtrl.close();
    this.app.getRootNav().push(NoticboardPage);
  }
  gotohelpdesk(){
    this.menuCtrl.close();
    this.app.getRootNav().push(HelpdestmytckPage);
  }
  gotohelp(){
    this.menuCtrl.close();
    this.app.getRootNav().push(HelpdestmytckPage);
  }
  gotocommunitywall(){
    this.menuCtrl.close();
    this.app.getRootNav().push(CommunitywallPage);
  }
  gotousefullinks(){
    this.menuCtrl.close();
    this.app.getRootNav().push(UsefulinfotabPage);
  }
  gotovisitor(){
    this.menuCtrl.close();
    this.app.getRootNav().push(VisitortabPage);
  }
  dashboard(){
    this.menuCtrl.close();
    this.app.getRootNav().push(DashboardPage);
  }
  gotoepay(){
    this.menuCtrl.close();
    this.app.getRootNav().push(EpaytabPage);
  }
  services(){
    this.menuCtrl.close();
    this.app.getRootNav().push(ServicesPage);
  }
  gotopromo(){
    this.menuCtrl.close();
    this.app.getRootNav().push(PromoPage);
  }
  gotoswitch(){
    this.menuCtrl.close();
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
    window.localStorage.setItem('is_switch',"yes");
    this.app.getRootNav().setRoot(CommunityPage);
  }
  gotoaccount(){
    this.menuCtrl.close();
    this.app.getRootNav().setRoot(MyprofilePage);
  }
}
