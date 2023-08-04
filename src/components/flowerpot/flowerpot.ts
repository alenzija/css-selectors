import FlowerClass from '../flower/flower';
import createElement from '../../dom-helper/create-element';
import EventEmitter from '../../dom-helper/event-emitter';
import { Flowerpot } from '../../types';
import Tooltip from '../tooltip/tooltip';

import './flowerpot.scss';
import './vase.scss';

class FlowerpotClass {
  private flowerpotElement: HTMLElement;

  private flowerpotHTML: HTMLElement;

  private flowers: FlowerClass[];

  private id: string | null;

  private type: string;

  private animated: boolean | undefined;

  private tooltip: Tooltip;

  constructor(flowerpot: Flowerpot, public eventEmitter: EventEmitter) {
    this.type = flowerpot.name;
    this.id = flowerpot.id;
    this.animated = flowerpot.animated;
    this.flowers = flowerpot.flowers.map((item) => new FlowerClass(item, this.eventEmitter));
    this.flowerpotElement = createElement(this.type);
    this.initElement();
    this.flowerpotHTML = createElement('div');
    this.initHTML();
    this.eventEmitter = eventEmitter;
    this.tooltip = new Tooltip(`<${this.type}></${this.type}>`, this.flowerpotElement, 80);
  }

  private initElement(): void {
    if (this.id) this.flowerpotElement.setAttribute('id', this.id);
    if (this.animated) this.flowerpotElement.classList.add('animated');
    if (this.flowers) {
      this.flowers.forEach((flower) => {
        this.flowerpotElement.append(flower.getElement());
      });
    }

    this.eventEmitter.subscribe('event: right-answer', () => {
      if (this.animated) {
        this.flowerpotElement.classList.add('hidden');
      }
    });

    this.eventEmitter.subscribe('event: last-level', () => {
      this.tooltip.remove();
    });

    this.flowerpotElement.addEventListener('mouseover', (e) => {
      const target = e.target as HTMLElement;
      if (target.tagName.toLowerCase() === 'flowerpot' || target.tagName.toLowerCase() === 'vase') {
        this.onHover();
      }
    });
    this.flowerpotElement.addEventListener('mouseout', (e) => {
      const target = e.target as HTMLElement;
      if (target.tagName.toLowerCase() === 'flowerpot' || target.tagName.toLowerCase() === 'vase') {
        this.offHover();
      }
    });
  }

  private onHover = (): void => {
    this.flowerpotHTML.classList.add('hover');
    this.flowerpotElement.classList.add('hover');
    this.tooltip.show();
  };

  private offHover = (): void => {
    this.flowerpotHTML.classList.remove('hover');
    this.flowerpotElement.classList.remove('hover');
    this.tooltip.remove();
  };

  public getElement(): HTMLElement {
    return this.flowerpotElement;
  }

  private initHTML(): void {
    this.flowerpotHTML.style.paddingLeft = '10px';
    const span = createElement('span', 'id');
    const name = createElement('span', 'id-name');
    name.textContent = this.id ? `"${this.id}"` : '';
    if (this.id) {
      span.append(' id=', name);
    } else span.textContent = '';
    if (this.flowers.length > 0) {
      this.flowerpotHTML.append(`<${this.type}`, span, '>');
      this.flowers.forEach((flower) => {
        this.flowerpotHTML.append(flower.getHTML());
      });
      this.flowerpotHTML.append(`</${this.type}>`);
    } else {
      this.flowerpotHTML.append(`<${this.type} `, span, '/>');
    }
    this.flowerpotHTML.addEventListener('mouseover', (e) => {
      const target = e.target as HTMLElement;
      if (!target.textContent) throw TypeError();
      if (target.textContent.includes('flowerpot') || target.textContent.includes('vase') || target.tagName === 'SPAN') {
        this.onHover();
      }
    });
    this.flowerpotHTML.addEventListener('mouseout', (e) => {
      const target = e.target as HTMLElement;
      if (!target.textContent) throw TypeError();
      if (target.textContent.includes('flowerpot') || target.textContent.includes('vase')) {
        this.offHover();
      }
    });
  }

  public getHTML(): HTMLElement {
    return this.flowerpotHTML;
  }
}

export default FlowerpotClass;
