import { mockedJson } from './../mockData';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ParseService {
  private nonRemovableClass = 'mceNonEditable';
  private domParser: DOMParser;

  constructor() {
    this.domParser = new DOMParser();
   }

  addSelectorsForAdditionalSections(form: string): string {
    let doc = this.domParser.parseFromString(form, "text/xml");
    mockedJson.forEach(field => {
      
      let fieldName = Object.keys(field)[0];

      let div = document.createElement('div');
      div.className = 'section-wrapper';

      let span = document.createElement('span');
      span.innerHTML = 'Wybierz sekcje: ';
      span.className = this.nonRemovableClass;

      let btn = document.createElement('button');
      btn.innerHTML = 'Dodaj';
      btn.id = `section-${fieldName}-btn`;

      btn.className = `${this.nonRemovableClass} section-btn`;
     
      let el = this.createSelectorElement(Object.values(field)[0], `section-${fieldName}`);

      div.appendChild(span);
      div.appendChild(el);
      div.appendChild(btn);

      this.insertElementAfter(doc.querySelector(`[data-section=${fieldName}]`), div);
    })
    
    return doc.querySelector('body').outerHTML;
  }

  insertElementAfter(element: HTMLElement, newElement: HTMLElement): void {
    element.parentNode.insertBefore(newElement, element.nextSibling);
  }

  insertElementBefore(element: HTMLElement, newElement: HTMLElement): void {
    element.parentNode.insertBefore(newElement, element);
  }

  createSelectorElement(values, id: string): HTMLElement {
    let selectList = document.createElement("select");
    selectList.id = id;
    selectList.className = 'blue-selector';

    for (let i = 0; i < values.length; i++) {
        let option = document.createElement("option");
        option.value = values[i].name;
        option.text = values[i].name;
        selectList.appendChild(option);
    }

    return selectList;
  }

  getFieldNameFromId(id: string): string {
    return id.split('-')[1];
  }

  getSectionValue(element: HTMLElement | any, name: string): string {
    return element.querySelector(`#section-${name}`).value;
  }

  cleanDocBeforeSend(form: string): string {
    let doc = this.domParser.parseFromString(form, "text/xml");
    doc = this.removeElementsByClass('section-wrapper', doc);

    return doc.querySelector('body').outerHTML;
  }

  removeElementsByClass(className: string, element: Document): Document {
    let elements = element.getElementsByClassName(className);
    while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
    }

    return element;
  }

  isNotRemovableElementDeleted(lastState: string, currentState: string): boolean {
    return (currentState.match(/mceNonEditable/g) || []).length
      <  (lastState.match(/mceNonEditable/g) || []).length
  }
}
