import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MyprofiledetailPage } from '../myprofiledetail/myprofiledetail';
import { ChangepasswordPage } from '../changepassword/changepassword';
import { MyprofileinvitePage } from '../myprofileinvite/myprofileinvite';
import { MyprofilesosPage } from '../myprofilesos/myprofilesos';
import { MyprofileusermanagementPage } from '../myprofileusermanagement/myprofileusermanagement';
import { MyprofileuservehiclePage } from '../myprofileuservehicle/myprofileuservehicle';
import { UpdatepasswordPage } from '../updatepassword/updatepassword';

@IonicPage()
@Component({
  selector: 'page-myprofile',
  templateUrl: 'myprofile.html',
})
export class MyprofilePage {
  public profile_image:any;
  public resident_name:any;
  public location:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
              this.profile_image=window.localStorage.getItem('image_url');
              this.location=window.localStorage.getItem('mailing_address');
              this.resident_name=window.localStorage.getItem('name');
    
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad MyprofilePage');
  }
  myprofiledetail(){
    this.navCtrl.push(MyprofiledetailPage);
  }
  changepswd(){
    this.navCtrl.push(ChangepasswordPage);
  }
  vehiclemanagement(){
    this.navCtrl.push(MyprofileuservehiclePage);
  }
  usermanagement(){
    this.navCtrl.push(MyprofileusermanagementPage);    
  }
  userinvite(){
    this.navCtrl.push(MyprofileinvitePage);    
  }
  usersos(){
    this.navCtrl.push(MyprofilesosPage);    

  }
}
