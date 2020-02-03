import { mockedData } from './mock';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CKEditorComponent } from '@ckeditor/ckeditor5-angular';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  @ViewChild( 'editor' , {static: false}) editorComponent: CKEditorComponent;
  public Editor = ClassicEditor;
  title = 'live-editor';
  MockedData = mockedData.toString();

  ngOnInit() {
    setTimeout(()=>{
      // console.log(this.Editor.model);

    },2000)
     
  }

  onChange({ editor }: any) {
    console.log(editor);
    
    const data = editor.getData();

    console.log( data );
  }

  onFocus({ editor }: any) {
    const data = editor.getData();

    // console.log( editor );
  }

  public getEditor() {
    // Warning: This may return "undefined" if the editor is hidden behind the `*ngIf` directive or
    // if the editor is not fully initialised yet.
    return this.editorComponent.editorInstance;
}
}
