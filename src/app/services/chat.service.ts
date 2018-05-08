declare var require: any;

import { Component, Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';








import { IMessage, IResponse, MessageType, DEFAULT_MESSAGE } from '@imdb-chat-module/chat.model';
import { HelperUtils } from '@app-basics/helper';




const COVERSATION: Array<IMessage> = [];// require('@imdb-chat-module/chat.data.json');
const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    })
};

@Injectable()
export class ChatService {

    private response: Subject<Array<IMessage>> = new Subject();

    private chatConverstation: Array<IMessage> = [];

    constructor(private http: HttpClient) {
        this.chatConverstation = [].concat(COVERSATION);
        this.emit();
    }

    send(message: IMessage): void {
        const iMessage = Object.assign(DEFAULT_MESSAGE, message);
        this.chatConverstation.push(iMessage);
        this.emit();
        this.postMessage(iMessage);


        // return this.response.asObservable();
    }

    postMessage(iMessage: any): void {
        console.log('posting...', iMessage);
        const ws_url: string = (!(iMessage.location) ? 'http://localhost:3000' : iMessage.location)
            + '/dialogflow/api';
        console.log('URL', ws_url);
        this.http.post(ws_url, iMessage, httpOptions).subscribe(
            (res: any) => {
                console.log(res);
                this.chatConverstation.push(<IMessage>res);
                // console.log('this.chatConverstation', this.chatConverstation);
                this.emit();
            }
        );
    }

    getConverstion(): Observable<Array<IMessage>> {
        return this.response.asObservable();
    }

    private emit(): void {
        console.log('emit', this.chatConverstation.length);
        this.response.next([].concat(this.chatConverstation));
    }





}
