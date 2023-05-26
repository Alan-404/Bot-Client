import { Component } from '@angular/core';
import * as RecordRTC from 'recordrtc'
import { DomSanitizer } from '@angular/platform-browser';
import { SttService } from 'src/app/services/stt.service';

@Component({
  selector: 'app-voice',
  templateUrl: './voice.component.html',
  styleUrls: ['./voice.component.css']
})
export class VoiceComponent {
  record: any
  recording= false
  url: any
  error: any
  color: "blue"

  transcribe: string = ""

  constructor(
    private domSanitizer: DomSanitizer,
    private sstService: SttService
  ){}

  sanitize(url: string){
    console.log(url)
    return this.domSanitizer.bypassSecurityTrustUrl(url)
  }

  startRecord(){
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

  processRecording(blob: Blob){
    this.url = URL.createObjectURL(blob)
    this.sstService.sendAudio(blob).subscribe(response => {
      this.transcribe = response.result
    })
  }


  errorCallback(error :any){
    console.log(error)
    this.error = "Cannot play audio"
  }

  
}
