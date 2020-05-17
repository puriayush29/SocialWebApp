import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NgxEmojiPickerModule } from 'ngx-emoji-picker';
import { ChatPage } from './chat';

@NgModule({
  declarations: [
    ChatPage,
  ],
  imports: [
    NgxEmojiPickerModule,
    IonicPageModule.forChild(ChatPage),
  ],
})
export class ChatPageModule {}
