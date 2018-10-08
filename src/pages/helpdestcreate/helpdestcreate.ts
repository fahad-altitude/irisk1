import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Platform} from 'ionic-angular';
import { ImagePicker } from '@ionic-native/image-picker';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { File } from '@ionic-native/file';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Base64ToGallery } from '@ionic-native/base64-to-gallery';
import { PhotoViewer } from '@ionic-native/photo-viewer';

@IonicPage()
@Component({
  selector: 'page-helpdestcreate',
  templateUrl: 'helpdestcreate.html',
})
export class HelpdestcreatePage {
  public imageurl=[];
  slideOneForm: FormGroup;
  public burlimg: any;
  public burl: any;
  public base64Image:any;
  submitAttempt: boolean = false;
  imagebag = []; //for normal url
  imagebag64 = []; // for base64 img for front end preview
  imagebagname = []; //for image name
  subscription: any;
  slotdates:any;
  content:any;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private camera: Camera, 
    private base64ToGallery: Base64ToGallery, 
    private imagePicker: ImagePicker, 
    private file: File, 
    private photoViewer: PhotoViewer) {
    this.content = '';
	  this.base64Image = '';
	  this.burl = '';
	  this.burlimg = '';
	  this.slotdates = [];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HelpdestcreatePage');
  }
  attachfiles(){
    let n = 0;
	   let options = {
          width: 800,
          heigth: 800,
          quality: 75,
		      outputType: 1 
        }
	  this.imagePicker.getPictures(options).then((results) => {
        for (var i = 0; i < results.length; i++) {
			      n = n + 1;
            console.log('Image URI: ' + results[i]);
			      this.stagegallery(results[i], n);
        }
      }, (err) => { });
  }
  stagegallery(uri, n){
    console.log(uri);
    this.base64Image = 'data:image/jpeg;base64,' + uri;
    this.imagebag64.push(this.base64Image);
    this.base2imageV2(uri, '_img' + n);
}
base2imageV2(base64Data, x){
  //media scanner false will prevent u from seeing in gallery
  console.log(x);
  this.base64ToGallery.base64ToGallery(base64Data, {prefix: x, mediaScanner: true}).then(
    res => this.stagecamera(res),
    err => console.log('Error saving image to gallery ', err)
  );
}
stagecamera(res){
  console.log(res);
  this.imagebag.push(res);
  this.imagebagname.push(res.substring(res.lastIndexOf('/') + 1)); //grab name from path
}
}
