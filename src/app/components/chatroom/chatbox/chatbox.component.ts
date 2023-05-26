import { Component, OnInit } from '@angular/core';
import { GptService } from 'src/app/services/gpt.service';

@Component({
  selector: 'app-chatbox',
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.css']
})
export class ChatboxComponent{

  constructor(
    private gptService: GptService
  ){}

  messages: Array<String> = []
  responses: Array<String> = []

  message: string = ""

  getInput(event: Event){
    this.message = (event.target as HTMLInputElement).value
  }

  handleEnter(){
    console.log(this.message)
    this.messages.push(this.message)
    var tempMessage = this.message
    this.message = ""

    this.gptService.sendMessage(tempMessage).subscribe(response => {
      console.log(response.response)
      this.responses.push(response.response)
    })
  }
}
