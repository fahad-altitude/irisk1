import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the MyprofileusermanagementPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-myprofileusermanagement',
  templateUrl: 'myprofileusermanagement.html',
})
export class MyprofileusermanagementPage {
  public topclick:number=0;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyprofileusermanagementPage');
  }
  topclickbtn(id){
    if(this.topclick==0){
      this.topclick=id;
    }
    else{
      this.topclick=0;
    }
  }
}
