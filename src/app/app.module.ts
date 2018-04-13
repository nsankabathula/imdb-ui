import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';  // replaces previous Http service
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Bootstrap
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



import { AppComponent } from './app.component';
import { AppToolbarComponent } from './basic/nav.component';

import { WikiSearchComponent } from '@imdb-wiki-module/wiki.component';
import { WikiService } from '@app-services/wiki.service';

import { ChatComponent } from '@imdb-chat-module/chat.component';
import { MessageComponent } from '@imdb-chat-module/message.component';

import { ChatService } from '@app-services/chat.service';


const SERVICE_PROVIDERS = [ChatService, WikiService];

const COMPONENTS_DECLARATIONS = [AppComponent, WikiSearchComponent, AppToolbarComponent, ChatComponent, MessageComponent];

@NgModule({
  declarations: [].concat(COMPONENTS_DECLARATIONS),
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [].concat(SERVICE_PROVIDERS),
  bootstrap: [AppComponent]
})
export class AppModule { }


