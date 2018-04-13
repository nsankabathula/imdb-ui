import { Component, Injectable, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { IMessage, IMessageExtension } from '@imdb-chat-module/chat.model';
import { HelperUtils } from '@app-basics/helper';


@Component({
    selector: 'app-message-component',
    templateUrl: './message.template.html',
    styleUrls: ['./message.style.css']
})
export class MessageComponent implements OnInit {
    images: Array<string>;

    @Input()
    message: IMessage | IMessageExtension;

    private range = HelperUtils.range;

    private currentSlideIndex = 0;

    constructor(private _http: HttpClient) { }
    ngOnInit() {

    }
    /*
        ngOnInit() {
            this._http.get('https://picsum.photos/list')
                .pipe(map((images: Array<{ id: number }>) => this._randomImageUrls(images)))
                .subscribe(images => this.images = images);
        }

        private _randomImageUrls(images: Array<{ id: number }>): Array<string> {
            return [1, 2, 3].map(() => {
                const randomId = images[Math.floor(Math.random() * images.length)].id;
                console.log(randomId);
                return `https://picsum.photos/1200/200?image=${randomId}`;
            });
        }
        */

    selectTile(titles, slideIndex) {
        console.log('selectTile', slideIndex, titles);
        this.currentSlideIndex = slideIndex;

    }

    selectTitle(title) {
        console.log('selectTitle', title);
    }
}
