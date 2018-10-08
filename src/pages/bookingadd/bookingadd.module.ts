import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BookingaddPage } from './bookingadd';

@NgModule({
  declarations: [
    BookingaddPage,
  ],
  imports: [
    IonicPageModule.forChild(BookingaddPage),
  ],
})
export class BookingaddPageModule {}
