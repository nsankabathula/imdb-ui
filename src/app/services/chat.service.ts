declare var require: any;

import { Component, Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/merge';
import 'rxjs/add/observable/forkJoin';
import { IMessage, IResponse, MessageType } from '@imdb-chat-module/chat.model';
import { HelperUtils } from '@app-basics/helper';
import { Subject } from 'rxjs/Subject';




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

    send(message: any): void {
        const iMessage = <IMessage>{
            type: MessageType.text,
            body: message
        };
        this.chatConverstation.push(iMessage);
        this.emit();
        this.postMessage(iMessage);


        // return this.response.asObservable();
    }

    postMessage(iMessage: any): void {
        console.log('posting...', window.location.hostname);
        const ws_url: string = ((window.location.hostname === 'localhost') ? 'http://localhost:3000' : window.location.hostname)
            + '/dialogflow/api';
        this.http.post('http://localhost:3000/dialogflow/api', iMessage, httpOptions).subscribe(
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
