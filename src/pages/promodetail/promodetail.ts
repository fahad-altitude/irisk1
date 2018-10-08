import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PromodetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-promodetail',
  templateUrl: 'promodetail.html',
})
export class PromodetailPage {
  public path:any;
  public image:any;
  public title:any;
  public description:any;

  constructor(public navCtrl: NavController, public navParams: NavParams)
   {
    this.title=navParams.get('title');
    this.description=navParams.get('description');
    this.image=navParams.get('image');
    this.path=navParams.get('path');
   
  }

 

}
