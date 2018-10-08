import { Component } from '@angular/core';
import { NavController, NavParams, Platform, AlertController, LoadingController, App, ModalController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { Http} from '@angular/http';
import { LoginPage } from '../login/login';

/**
 * Generated class for the servicesdetailvendor page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-servicesdetailvendor',
  templateUrl: 'servicesdetailvendor.html',
})
export class ServicesdetailvendorPage {
  public path:any;
  public phone:any;
  public email:any;
  public image:any;
  public address:any;
  public description:any;
  public headers:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform,public alertCtrl: AlertController, public http:Http, public loadingCtrl: LoadingController,private app: App, private modalCtrl: ModalController) 
  {  
    
    this.phone=navParams.get('phone');
    this.email=navParams.get('email');
    this.address=navParams.get('address');
    this.image=navParams.get('image');
    this.description=navParams.get('description');
    this.path=navParams.get('path');
    
 
  }


}
