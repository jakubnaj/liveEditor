import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { EditorModule } from '@tinymce/tinymce-angular';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TinyComponent } from './components/tiny/tiny.component';
import { ContextMenuModule } from 'ngx-contextmenu';


@NgModule({
  declarations: [
    AppComponent,
    TinyComponent
  ],
  imports: [
    BrowserModule,
    CKEditorModule,
    EditorModule,
    FormsModule,
    ContextMenuModule.forRoot() 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
