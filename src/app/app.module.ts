import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ButtonComponent } from './button/button.component';
import { HistoryComponent } from './history/history.component';
import { KeypadComponent } from './keypad/keypad.component';
import { DisplayComponent } from './display/display.component';

@NgModule({
  imports: [BrowserModule, FormsModule],
  declarations: [
    AppComponent,
    ButtonComponent,
    HistoryComponent,
    KeypadComponent,
    DisplayComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
