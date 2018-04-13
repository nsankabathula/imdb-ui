import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ChatService } from '@app-services/chat.service';

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
        this.chatSvc.send(this.chatForm.value.message);
        this.chatForm.reset();
    }
    createForm() {
        this.chatForm = this.fb.group({
            message: ['', Validators.required], // <--- the FormControl called "name"
        });
    }
}
