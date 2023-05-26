import { Component } from '@angular/core';
import { SttService } from 'src/app/services/stt.service';
@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.css']
})
export class FileComponent {
  result: String = ""
  audioFile: any
  loading = false
  constructor(
    private sttService: SttService
  ){}


  getAudio(event: any){
    this.audioFile = event.target.files[0]
  }

  transcribe(){
    this.loading = true
    this.result = ""
    if(this.audioFile == null){
      return
    }
    this.sttService.transcribeFile(this.audioFile).subscribe(response => {
      this.result = response.result
      this.loading = false
    })
  }
}
