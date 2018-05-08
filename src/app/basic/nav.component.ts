import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ChatService } from '@app-services/chat.service';
import { DEFAULT_MESSAGE, IMessage, MessageType } from '@imdb-chat-module/chat.model';

@Component({
    selector: 'app-toolbar',
    templateUrl: './nav.component.html',

})
export class AppToolbarComponent {

    message: string;
    chatForm: FormGroup;
    constructor(private chatSvc: ChatService, private fb: FormBuilder) {
        this.createForm();
    }
    private sendMessage($event) {
        console.log($event, this.chatForm.value);
        const iMessage: IMessage = Object.assign(DEFAULT_MESSAGE, <IMessage>{
            type: MessageType.text,
            body: this.chatForm.value.message, location: this.chatForm.value.location
        });
        this.chatSvc.send(iMessage);


        this.chatForm.reset({ location: iMessage.location });
    }
    createForm() {
        this.chatForm = this.fb.group({
            message: ['', Validators.required], // <--- the FormControl called "name"
            location: ['', Validators.required], // <--- the FormControl called "name"
        });
    }
}
