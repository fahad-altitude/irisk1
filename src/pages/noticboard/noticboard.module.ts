import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NoticboardPage } from './noticboard';

@NgModule({
  declarations: [
    NoticboardPage,
  ],
  imports: [
    IonicPageModule.forChild(NoticboardPage),
  ],
})
export class NoticboardPageModule {}
