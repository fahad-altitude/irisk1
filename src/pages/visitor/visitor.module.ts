import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VisitorPage } from './visitor';
import { SuperTabsModule } from 'ionic2-super-tabs';
@NgModule({
  declarations: [
    VisitorPage,
  ],
  imports: [
    IonicPageModule.forChild(VisitorPage),
    SuperTabsModule
  ],
})
export class VisitorPageModule {}
