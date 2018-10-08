import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Platform} from 'ionic-angular';
import { ImagePicker } from '@ionic-native/image-picker';

@IonicPage()
@Component({
  selector: 'page-helpdestcreate',
  templateUrl: 'helpdestcreate.html',
})
export class HelpdestcreatePage {
  public imageurl=[];
  submitAttempt: boolean = false;
  subscription: any;
  slotdates:any;
  content:any;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private imagePicker: ImagePicker) {
	  this.slotdates = [];
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad HelpdestcreatePage');
  }
  attachfiles(){
	   let options = {
          outputType: 1,
          maximumImagesCount: 5
        }
	  this.imagePicker.getPictures(options).then((results) => {
        for (var i = 0; i < results.length; i++) {
            this.imageurl[i]=results[i];
            console.log('Image URI: ' + this.imageurl[i]);
        }
      }, (err) => { });
  }
}
