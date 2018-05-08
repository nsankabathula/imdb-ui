import { Component, Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { WikiService } from '@app-services/wiki.service';

const VALID_IMG_EXTENSION = {
    'svg': true,
    'jpg': true,
    'SVG': true,
    'JPG': true
};

const EXCLUDE_FILES = {
    'Padlock-silver.svg': true,
    'Commons-logo.svg': true,
    'Folder_Hexagonal_Icon.svg': true,
    'Steady2.svg': true
};

@Component({
    selector: 'app-wiki-search',
    templateUrl: './wiki.component.html',
    styleUrls: ['./wiki.component.css']
})
export class WikiSearchComponent {

    model: {
        title: string;
        description: string;
        url: string;
        imageLinks: Array<{
            url: string;
            descriptionurl: string;
            descriptionsorturl: string;
        }>;
    };
    searching = false;
    searchFailed = false;
    hideSearchingWhenUnsubscribed = new Observable(() => () => this.searching = false);
    searchWiki: any;
    imageLinks: Array<{
        url: string;
        descriptionurl: string;
        descriptionsorturl: string;
    }> = [];

    formatter = (x: { title: string }) => x.title;

    constructor(private wikiSvc: WikiService) {

        this.searchWiki = (text$: Observable<string>) =>
            text$
                .debounceTime(300)
                .distinctUntilChanged()
                .do(() => this.searching = true)
                .switchMap(term =>
                    this.wikiSvc.search(term)
                        .do(() => this.searchFailed = false)
                        .map((result) => { console.log(result); return result; })
                        .catch(() => {
                            this.searchFailed = true;
                            return of([]);
                        }))
                .do(() => this.searching = false)
                .merge(this.hideSearchingWhenUnsubscribed);

    }

    searchWikiImages() {
        this.wikiSvc.images(this.model.title).subscribe((data) => {
            console.log(data);
            this.model.imageLinks = [].concat(
                data.filter((image) => {
                    const extension = image.url.match(/\.([^\.]+)$/)[1];
                    const filename = image.url.substring(image.url.lastIndexOf('/') + 1);
                    console.log(filename);
                    return VALID_IMG_EXTENSION[extension] === true && !EXCLUDE_FILES[filename];
                })
            );
            this.imageLinks = this.model.imageLinks;
        });
    }


}
