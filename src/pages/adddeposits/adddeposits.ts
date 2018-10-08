import { Component } from '@angular/core';
import {NavController, NavParams, Platform, AlertController, LoadingController, App, ModalController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { DepositsPage } from '../deposits/deposits';
import { Http} from '@angular/http';
import { ImagePicker } from '@ionic-native/image-picker';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { File } from '@ionic-native/file';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Base64ToGallery } from '@ionic-native/base64-to-gallery';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
// @IonicPage()
@Component({
  selector: 'page-adddeposits',
  templateUrl: 'adddeposits.html'
})
export class AdddepositsPage {
public myimage:any;
public url:any;
public reason:any;
public amount:any;
public headers:any;
constructor(
  public navCtrl: NavController, 
  public navParams: NavParams,
  private camera: Camera, 
  private base64ToGallery: Base64ToGallery, 
  private imagePicker: ImagePicker, 
  private file: File, 
  private photoViewer: PhotoViewer,
  public platform: Platform,
  public alertCtrl: AlertController, 
  public http:Http, 
  public loadingCtrl: LoadingController,
  private app: App, 
  private transfer: FileTransfer, 
  private modalCtrl: ModalController
  ) 
{
 
  this.url='http://staging.irisk.my/api/v3/';
  this.myimage = '';
}

save_deposit(){
  let loading = this.loadingCtrl.create({
    content: 'saving deposit...'
  });
  loading.present();
  this.headers = new Headers();
  this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
    var creds = {
          // business_id: parseInt(window.localStorage.getItem('uid')),
          deposit_reason:this.reason,
          amount:this.amount,
          condo_id:window.localStorage.getItem('condo_id'),
          resident_id:window.localStorage.getItem('resident_id'),
          unit_id:window.localStorage.getItem('unit_id'),
          payment_mode:1,
          key:window.localStorage.getItem('token'),
          receipt_url:this.myimage,
      };
    console.log(creds);
      return new Promise(resolve => {
      this.http.post(this.url + 'add_deposit' ,creds,{headers: this.headers}).subscribe(data => {
      if(data.json().status=='success'){
          loading.dismiss();
          this.showdepositalert('Deposit successfully saved');
      }
      else if(data.json().status!='success'){ 
        loading.dismiss();
        this.showdepositalert('Failed to save deposit');
      }
      else
            resolve(false)
      },onerror=>{ 
        loading.dismiss();
        
        this.showdepositalert('Please check your internet connection');
    });
      });
  
  }
  showdepositalert(des)
{
  let alert = this.alertCtrl.create({
		
   // subTitle: "Alert!",
    message: des,
  //  message: "<ion-item><p style='overflow:auto;white-space:normal;'>Test</p> <button ion-button outline item-right icon-left (click)='itemSelected()'><ion-icon name='eye'></ion-icon>View</button>",
    buttons: [
         {
           text: 'Close',
           handler: () => {
           this.navCtrl.push(DepositsPage);
           }
         }
       ]
   });
                 
   alert.present();

}
camerafn(){
  
  console.log("camera settings");
  const options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.PNG,
    mediaType: this.camera.MediaType.PICTURE,
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY, //PHOTOLIBRARY : 0, CAMERA : 1, SAVEDPHOTOALBUM : 2
    saveToPhotoAlbum: true
  }
  this.camera.getPicture(options).then((imagePath) => {
    this.myimage = imagePath;
    this.showimg=imagePath;
    this.myimage = 'data:image/jpeg;base64,' + imagePath;

  }, (err) => {
  });
}
click_on_cancel_button(){
  this.navCtrl.pop();
}

slideData = [{ image: "../../assets/imgs/1.jpg" },{ image: "../../assets/imgs/1.jpg" }] 
}
