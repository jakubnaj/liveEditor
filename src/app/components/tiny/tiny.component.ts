import { Component, OnInit, ViewChild, ElementRef, HostListener, Renderer, AfterViewInit } from '@angular/core';
import { mockedData } from 'src/app/mock';
import { ParseService } from 'src/app/services/parse.service';
import { ContextMenuComponent } from 'ngx-contextmenu';
declare const tinymce: any;
@Component({
  selector: 'app-tiny',
  templateUrl: './tiny.component.html',
  styleUrls: ['./tiny.component.scss']
})
export class TinyComponent implements OnInit, AfterViewInit {
  
  public items = [
    { name: 'John', otherProperty: 'Foo' },
    { name: 'Joe', otherProperty: 'Bar' }
];
  @ViewChild(ContextMenuComponent, {static: false}) public basicMenu: ContextMenuComponent;
  blobToBase64 = function(img) { return img.hasAttribute('internal-blob') };
  @ViewChild('editor', {static: true}) editor: ElementRef<HTMLElement>;;
  public MockedData = mockedData.toString();
  constructor(private parseService: ParseService, private elem: ElementRef) { }
  

  ngOnInit() {
    this.MockedData = this.parseService.addSelectorsForAdditionalSections(this.MockedData);
  }

  ngAfterViewInit(): void {
    tinymce.init(
        {
            selector: "#mymce1",
            height: 500,
          menubar: false,
         plugins: [
          'advlist autolink lists link image charmap print preview anchor ',
          'noneditable preventdelete contextmenu',
          'searchreplace visualblocks code fullscreen',
          'insertdatetime media table paste code help wordcount'
        ],
        contextmenu: 'customItem1 | customItem2',
        content_css : 'assets/content-styles.css', 
        toolbar:
          'undo redo | formatselect | bold italic backcolor | \
          alignleft image imagetools aligncenter alignright alignjustify | \
          bullist numlist outdent indent | removeformat | help',
        paste_data_images: true,
        paste_as_text: true,
        setup : function (editor) {
          editor.addMenuItem('customItem1', {
              text: 'Menu Item 1',
              context: 'tools',
              onclick: function () {
                  this.dupa();
              }
          });
          editor.addMenuItem('customItem2', {
              text: 'Menu Item 2',
              context: 'tools',
              menu: [ {
                  text: "Sub-menu item 1",
                  onclick: function () {
                      alert('Sub-menu item 1');
                  }
              }, {
                  text: "Sub-menu item 2",
                  onclick: function () {
                      alert('Sub-menu item 2');
                  }
              }]
          });},
        images_dataimg_filter: this.blobToBase64,
        imagetools_toolbar: 'rotateleft rotateright | flipv fliph | editimage imageoptions',
        language_url: 'assets/langs/pl.js',
        language: 'pl'
        });
  }

  setUpListeners(): void {
    let iframe = this.elem.nativeElement.querySelector('iframe');
    let content = iframe.contentWindow.document.querySelectorAll(".section-btn");
    
    content.forEach(element => {
      element.addEventListener('click', (evt: MouseEvent | any) => {
        let fieldName = this.parseService.getFieldNameFromId(evt.target.id);
      })
    });
  }

  dupa(){
    console.log('pipa');
    
  }

  onEditorContentInit(): void {
    this.setUpListeners();
  }

  onRemoveContent({event: event}): void {
    if(event.lastLevel && 
      this.parseService.isNotRemovableElementDeleted(event.lastLevel.content, event.level.content)) {
        this.elem.nativeElement.querySelector('.mce-i-undo').click();
        alert('nie mozna usuwac elementow oznaczonych na czerwono');
    }
  }
}
