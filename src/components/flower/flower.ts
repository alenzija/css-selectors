import createElement from '../../dom-helper/create-element';
import EventEmitter from '../../dom-helper/event-emitter';
import { Flower } from '../../types';
import Tooltip from '../tooltip/tooltip';

import './flower.scss';

class FlowerClass {
  private flowerElement: HTMLElement;

  private url: string;

  private type: string;

  private className: string | null;

  private animated: boolean | undefined;

  private flowerHTML: HTMLElement;

  private tooltip: Tooltip;

  constructor(private flower: Flower, public eventEmitter: EventEmitter) {
    this.animated = flower?.animated;
    this.className = flower.class;
    this.url = flower.url;
    this.type = flower.name;
    this.flowerElement = flower.class
      ? createElement(this.type, flower.class) : createElement(this.type);
    this.initElement();
    this.flowerHTML = createElement('div');
    this.initHTML();
    this.eventEmitter = eventEmitter;
    this.tooltip = new Tooltip(`<${this.type}></${this.type}>`, this.flowerElement, 35);
  }

  private initElement(): void {
    if (this.animated) this.flowerElement.classList.add('animated');
    const imgFlower = createElement<HTMLImageElement>('img');
    imgFlower.src = this.url;
    imgFlower.alt = this.type;
    this.flowerElement.append(imgFlower);

    this.eventEmitter.subscribe('event: right-answer', () => {
      if (this.animated) {
        this.flowerElement.classList.add('hidden');
      }
    });

    this.eventEmitter.subscribe('event: last-level', () => {
      this.tooltip.remove();
    });

    this.flowerElement.addEventListener('mouseover', this.onHover);
    this.flowerElement.addEventListener('mouseout', this.offHover);
  }

  private onHover = (): void => {
    this.flowerElement.classList.add('hover');
    this.flowerHTML.classList.add('hover');
    this.tooltip.show();
  };

  private offHover = (): void => {
    this.flowerElement.classList.remove('hover');
    this.flowerHTML.classList.remove('hover');
    this.tooltip.remove();
  };

  private initHTML(): void {
    this.flowerHTML.style.paddingLeft = '20px';
    let content = `&lt;${this.type} `;
    if (this.className) content += `<span class="class">class=</span><span class="class-name">"${this.className}"</span>`;
    content += '/&gt;';
    this.flowerHTML.innerHTML = content;
    this.flowerHTML.addEventListener('mouseover', this.onHover);
    this.flowerHTML.addEventListener('mouseout', this.offHover);
  }

  public getElement(): HTMLElement {
    return this.flowerElement;
  }

  public getHTML(): HTMLElement {
    return this.flowerHTML;
  }
}

export default FlowerClass;
