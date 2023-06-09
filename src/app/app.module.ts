import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { ChatboxComponent } from './components/chatroom/chatbox/chatbox.component';
import { MessageComponent } from './components/chatroom/message/message.component';
import { ResponseComponent } from './components/chatroom/response/response.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import { SideBarComponent } from './components/utils/side-bar/side-bar.component';
import { TranscribeComponent } from './components/stt/transcribe/transcribe.component';
import {MatTabsModule} from '@angular/material/tabs';
import { VoiceComponent } from './components/stt/voice/voice.component';
import { FileComponent } from './components/stt/file/file.component';
import { TextComponent } from './components/tts/text/text.component';
import {MatInputModule} from '@angular/material/input';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { PageComponent } from './components/voicebot/page/page.component';
import {MatTreeModule} from '@angular/material/tree';
import {MatIconModule} from '@angular/material/icon';
import { SoundWaveComponent } from './components/tts/sound-wave/sound-wave.component';
import { HomeComponent } from './components/main-page/home/home.component';
import { HeaderComponent } from './components/features/header/header.component';
import { RenderPdfComponent } from './components/documentation/render-pdf/render-pdf.component';
import { DocumentComponent } from './components/documentation/document/document.component';
import { ShowComponent } from './components/product/show/show.component';
const appRoutes: Routes = [
  {
    path: "chatbot",
    component: ChatboxComponent
  },
  {
    path: "stt",
    component: TranscribeComponent
  },
  {
    path: "tts",
    component: TextComponent
  },
  {
    path: "voicebot",
    component: PageComponent
  },
  {
    path: "documentation",
    component: DocumentComponent
  },
  {
    path: "pdf",
    component: RenderPdfComponent
  },
  {
    path: "",
    component: HomeComponent
  }
]

@NgModule({
  declarations: [
    AppComponent,
    ChatboxComponent,
    MessageComponent,
    ResponseComponent,
    SideBarComponent,
    TranscribeComponent,
    VoiceComponent,
    FileComponent,
    TextComponent,
    PageComponent,
    SoundWaveComponent,
    HomeComponent,
    HeaderComponent,
    RenderPdfComponent,
    DocumentComponent,
    ShowComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatListModule,
    MatButtonModule,
    RouterModule.forRoot(appRoutes),
    MatTabsModule,
    MatInputModule,
    MatProgressBarModule,
    MatTreeModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
