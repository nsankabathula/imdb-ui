
// import { forkJoin as observableForkJoin } from "rxjs/observable/forkJoin";
import { forkJoin as observableForkJoin } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';



import { map, switchMap } from 'rxjs/operators';

import { Component, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';








const reducer = (accumulator, currentValue) => accumulator.concat(currentValue);
const WIKI_URL = 'https://en.wikipedia.org/w/api.php';
const PARAMS_OPENSEARCH = new HttpParams({
    fromObject: {
        action: 'opensearch',
        format: 'json',
        origin: '*'
    }
});

const PARAMS_IMAGES = new HttpParams({
    fromObject: {
        action: 'query',
        format: 'json',
        origin: '*',
        prop: 'images'


    }
});

const PARAMS_IMAGE_INFO = new HttpParams({
    fromObject: {
        action: 'query',
        format: 'json',
        origin: '*',
        prop: 'imageinfo',
        iiprop: 'url',
        list: 'allimages'
    }
});


@Injectable()
export class WikiService {
    constructor(private http: HttpClient) { }

    search(term: string) {
        if (term === '') {
            return Observable.of([]);
        }
        const handleSearchResponse = (response) => {
            if (Array.isArray(response) && response.length === 4) {
                const titles = response[1];
                const description = response[2];
                const urls = response[3];

                return titles.map((title, index) => {
                    return {
                        title: title,
                        description: description[index],
                        url: urls[index]
                    };
                });

            }
            // return response;
        };

        return this.http
            .get(WIKI_URL, { params: PARAMS_OPENSEARCH.set('search', term) }).pipe(
            map(handleSearchResponse))
            // .map(response => response[1])
            ;
    }

    imageInfo(title: string) {
        if (title === '') {
            return of([]);
        }

        const handleImageResponse = (response) => {
            if (response && response.query && response.query.pages) {
                const pages = response.query.pages;
                return Object.keys(pages).map((page) => {
                    // console.log('imageInfo pages', pages[page].imageinfo, pages[page].imageinfo.length);
                    if (pages[page] && pages[page].imageinfo && pages[page].imageinfo.length > 0) {
                        return pages[page].imageinfo;
                    } else {
                        return [];
                    }
                });
            } else {
                return [];
            }

        };

        return this.http
            .get(WIKI_URL, { params: PARAMS_IMAGE_INFO.set('titles', title) }).pipe(
            map(handleImageResponse))
            // .do(formatedResponse => console.log(formatedResponse))
            ;
    }

    joinImages(images: Array<any>) {
        let observableBatch = [];
        images.forEach(image => {
            observableBatch.push(this.imageInfo(image.title));
        });

        return observableForkJoin(observableBatch).pipe(map(
            (result) => {
                const flattenResult = (<Array<any>>result.reduce(reducer)).reduce(reducer);
                console.log(flattenResult);
                return flattenResult;
            }
        ));

    }

    images(term: string) {
        if (term === '') {
            return of([]);
        }
        const handleImageResponse = (response) => {
            console.log('images handleImageResponse', response);

            if (response && response.query && response.query.pages) {
                const pages = response.query.pages;
                const images = Object.keys(pages).map(
                    (page) => {
                        if (pages[page].images && pages[page].images.length > 0) {
                            return pages[page].images;

                        } else {
                            return [];
                        }
                    }

                ).reduce(reducer);
                return this.joinImages(images);
            } else {
                return [];
            }


        };

        return this.http
            .get(WIKI_URL, { params: PARAMS_IMAGES.set('titles', term) }).pipe(
            switchMap(handleImageResponse));
    }
}
