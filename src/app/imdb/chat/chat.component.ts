declare var require: any;

import { Component, Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { IMessage, MessageType, IResponse, IImageProperties } from '@imdb-chat-module/chat.model';

import { ChatService } from '@app-services/chat.service';

import { HelperUtils } from '@app-basics/helper';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';

const imageProp: IImageProperties = {
    'height': 400,
    'width': 200,
    'url': 'https://picsum.photos/'
};

@Component({
    selector: 'app-chat-component',
    templateUrl: './chat.template.html',
    styleUrls: ['./chat.style.css']
})
export class ChatComponent implements OnInit {
    images: Array<string>;
    chatConverstation: Array<IMessage>;


    constructor(private _http: HttpClient, private chatSvc: ChatService) {
        console.log('in constructor');

        this.chatSvc.getConverstion()
            .subscribe(
            (data: Array<IMessage>) => {
                console.log('chat convestaion', data.length);
                this.chatConverstation = [].concat(data.reverse());
                this.chatConverstation.map((message: IMessage) => {
                    if (message.type === MessageType.json && !HelperUtils.isArrayOfArray(message.body)) {
                        message.body.forEach((response: IResponse) => {
                            response.poster = Math.floor(Math.random() * 100).toString();
                            response.poster =
                                //"https://images-na.ssl-images-amazon.com/images/M/MV5BMTg2MzI1MTg3OF5BMl5BanBnXkFtZTgwNTU3NDA2MTI@._V1_SX300.jpg";
                                imageProp.url + imageProp.height + '/' + imageProp.width + '/?image=' + response.poster;
                        });
                        message.body = HelperUtils.split(4, message.body);
                        return message;
                    } else {
                        return message;
                    }
                });
            }
            );
        this.chatSvc.send('Find me First Blood movie');


    }



    ngOnInit() {
        /*this._http.get('https://picsum.photos/list')
            .pipe(map((images: Array<{ id: number }>) => this._randomImageUrls(images)))
            .subscribe(images => this.images = images);
            */


    }
    /*
        private _randomImageUrls(images: Array<{ id: number }>): Array<string> {
            return [1, 2, 3].map(() => {
                const randomId = images[Math.floor(Math.random() * images.length)].id;
                return `https://picsum.photos/1200/200?image=${randomId}`;
            });
        }
        */
}
