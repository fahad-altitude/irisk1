import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BigimagePage } from './bigimage';

@NgModule({
  declarations: [
    BigimagePage,
  ],
  imports: [
    IonicPageModule.forChild(BigimagePage),
  ],
})
export class BigimagePageModule {}
