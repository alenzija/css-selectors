import createElement from '../../dom-helper/create-element';

import './editor.scss';

export default class Editor {
  private static buildEditorHeader(editorName: string, fileName: string): HTMLElement {
    const header = createElement('div', 'editor__header');
    const name = createElement('div', 'editor__header--name');
    name.textContent = editorName;
    const file = createElement('div', 'editor__header--file');
    file.textContent = fileName;
    header.append(name, file);
    return header;
  }

  private static buildEditorNumbers(className?: string): HTMLElement {
    const numbers = createElement('div', 'editor__numbers');
    if (className) numbers.classList.add(className);
    numbers.innerHTML = '1<br>2<br>3<br>4<br>5<br>6<br>7<br>8<br>9<br>10<br>11<br>12<br>13<br>14<br>15<br>16<br>17<br>18<br>19<br>20<br>';
    return numbers;
  }

  public static initEditor(
    editorName: string,
    fileName: string,
    content: HTMLElement,
    className?: string,
  ): HTMLElement {
    const editorElement = createElement('div', 'editor-element');
    const editorWindow = createElement('div', 'editor__window');
    if (className) editorWindow.classList.add(className);
    editorWindow.append(Editor.buildEditorNumbers(className), content);
    editorElement.append(Editor.buildEditorHeader(editorName, fileName), editorWindow);
    return editorElement;
  }
}
