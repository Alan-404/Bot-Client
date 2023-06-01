import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { TtsService } from 'src/app/services/tts.service';
@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.css']
})
export class TextComponent {
  textInput: String = ""
  audioArray: any
  urlAudio: string = ""

  loading = false
  constructor(
    private ttsService: TtsService,
    private domSanitizer: DomSanitizer
  ){}

  sanitize(url: string){
    console.log(url)
    return this.domSanitizer.bypassSecurityTrustUrl(url)
  }


  getText(event: any){
    this.textInput = event.target.value
  }

  transform(){
    if(this.textInput == ""){
      return;
    }
    this.loading = true
    this.urlAudio = ""
    this.ttsService.transform(this.textInput).subscribe(response => {
      this.urlAudio = URL.createObjectURL(response)
      this.audioArray = response
      this.loading = false
    })
  }


}
