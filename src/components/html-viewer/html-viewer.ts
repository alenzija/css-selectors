import createElement from '../../dom-helper/create-element';

import Windowsill from '../windowsill/windowsill';

import './html-viewer.scss';

export default class HTMLViewer {
  private viewer: HTMLElement;

  constructor(public windowsill: Windowsill) {
    this.windowsill = windowsill;
    this.viewer = createElement<HTMLElement>('code', 'html-viewer');
    this.init();
  }

  private init(): void {
    const span = createElement('span');
    span.innerHTML = '&lt;div <span class="class">class=</span><span class="class-name">"windowsill"</span>>';
    this.viewer.append(span);
    this.windowsill.elements.forEach((item) => this.viewer.append(item.getHTML()));
    this.viewer.append('</div>');
  }

  public getElement(): HTMLElement {
    return this.viewer;
  }
}
