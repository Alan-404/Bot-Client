import { Component } from '@angular/core';
import * as RecordRTC from 'recordrtc'
import { DomSanitizer } from '@angular/platform-browser';
import { GptService } from 'src/app/services/gpt.service';
import { SttService } from 'src/app/services/stt.service';
import { TtsService } from 'src/app/services/tts.service';
@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent {
  messages: Array<string> = []
  responses: Array<string> = []

  message: string = ""
  response: string = ""

  record: any
  recording= false
  url: any
  error: any

  listening = false

  data: any
  transcribe: string = ''

  constructor(
    private gptService: GptService,
    private sttService: SttService,
    private ttsService: TtsService,
    private domSanitizer: DomSanitizer
  ){}

  listen(){
    this.listening = !this.listening
    if(this.listening){
      this.startRecord()
    }
    else{
      this.stopRecord()
    }
  }

  startRecord(){
    this.data = null
    this.url = null
    this.recording = true;
    let mediaConstraints = {
        video:false,
        audio: true
    }
    navigator.mediaDevices
        .getUserMedia(mediaConstraints)
        .then(this.successCallBack.bind(this), this.errorCallback.bind(this))
  }

  successCallBack(stream: any){
    var options: RecordRTC.Options = {
        mimeType: "audio/wav",
        sampleRate: 44100
    }
    this.record = new RecordRTC.StereoAudioRecorder(stream, options);

    this.record.record()
  }

  stopRecord(){
    this.recording = false
    this.record.stop(this.processRecording.bind(this))
    
  }

  async processRecording(blob: Blob){
    this.url = URL.createObjectURL(blob)
    await this.sttService.sendAudio(blob).subscribe(async(response) => {
      this.message = response.result + "?"
      this.messages.push(response.result + "?")
      await this.gptService.sendMessage(this.message).subscribe(async(rep) => {
        this.response = rep.response
        this.responses.push(rep.response)
        await this.ttsService.transform(this.response).subscribe(async(res) => {
          this.data = URL.createObjectURL(res)
        })
      })
    })
  }


  errorCallback(error :any){
    console.log(error)
    this.error = "Cannot play audio"
  }

  sanitize(url: string){
    console.log(url)
    return this.domSanitizer.bypassSecurityTrustUrl(url)
  }

}
