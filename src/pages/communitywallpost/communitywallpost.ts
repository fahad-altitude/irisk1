import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { EpaytabPage } from '../epaytab/epaytab';
import { DashboardPage } from '../dashboard/dashboard';
import { ServicesPage } from '../services/services';
import { PromoPage } from '../promo/promo';

@IonicPage()
@Component({
  selector: 'page-communitywallpost',
  templateUrl: 'communitywallpost.html',
})
export class CommunitywallpostPage {
public myimage:any='';
  constructor(public navCtrl: NavController, public navParams: NavParams,private alertCtrl: AlertController,private camera: Camera) {
    // this.presentAlert();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CommunitywallpostPage');
  }
  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'DISCLAIMER',
      subTitle: 'Disclaimer for the use of community wall:',
      cssClass: 'alertdisclaimer',
      message:'This is a public platform and we ask that you’re respectful in your comments. ALIA and the respective management body reserves the right to remove anything that is deem to the following but not limited to: <br><br> - Abusive or personal attacks <br><br> - Material that is unlawful, obscene, defamatory, threatening, harassing, abusive, slanderous, hateful or embarrassing to any other entity <br><br> - Third party advertising <br><br> - Chain letters or spam <br><br> Although ALIA and the respective management body is not responsible for any such communications, ALIA and the respective management body reserves the right, but shall not be obligated to, delete any such communications of which ALIA and the respective management body becomes aware, at any time without notice to you. ALIA and the respective management body also reserves the right to suspend or terminate users who are involved directly or indirectly in the... post of such content....'
    });
    alert.present();
  }
  // galleryalert(){
  //   let alert = this.alertCtrl.create({
  //     title: 'Select Photo',
  //     cssClass: 'selectphoto',
  //     template: '<button (click)="opengallery();">Gallery</button>'+
  //     '<button (click)="opencamera();">Camera</button>',
      
  //     });
  //   alert.present();
  // }
  opengallery(){
    console.log("camera settings");
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: 1,
      sourceType: 0, 
    }
    this.camera.getPicture(options).then((imageData) => {
     this.myimage = 'data:image/jpeg;base64,' + imageData;
      console.log('this.imgurl', this.myimage);
    }, (err) => {
    });
  }
  opencamera(){
    console.log("camera settings");
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: 1,
      sourceType: 1,
    }
    this.camera.getPicture(options).then((imageData) => {
     this.myimage = 'data:image/jpeg;base64,' + imageData;
      console.log('this.imgurl', this.myimage);
    }, (err) => {
    });
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
  
}
