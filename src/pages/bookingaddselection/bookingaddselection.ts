import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EpaytabPage } from '../epaytab/epaytab';
import { DashboardPage } from '../dashboard/dashboard';
import { ServicesPage } from '../services/services';
import { PromoPage } from '../promo/promo';
import { BookingdetailPage } from '../bookingdetail/bookingdetail';


@IonicPage()
@Component({
  selector: 'page-bookingaddselection',
  templateUrl: 'bookingaddselection.html',
})
export class BookingaddselectionPage {
  public id:any;
  public description:any;
  public name:any;
  public terms:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.id=navParams.get('id');
    this.description=navParams.get('description');
    this.name=navParams.get('name');
    this.terms=navParams.get('terms');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BookingaddselectionPage');
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
  bookingdetail(){
    this.navCtrl.push(BookingdetailPage);
  }
}
