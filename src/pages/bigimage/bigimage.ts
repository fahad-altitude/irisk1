import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HelpdestindPage} from '../helpdestind/helpdestind';
/**
 * Generated class for the BigimagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-bigimage',
  templateUrl: 'bigimage.html',
})
export class BigimagePage {
public myimage:any;
public myid:any;
  constructor(public navCtrl: NavController, public navParams: NavParams)
   {
     this.myimage=navParams.get('data');
     this.myid=navParams.get('data2');
  }
  gotobackscreen()
  {
this.navCtrl.push(HelpdestindPage,{
  data:this.myid
});
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad BigimagePage');
  }

}
