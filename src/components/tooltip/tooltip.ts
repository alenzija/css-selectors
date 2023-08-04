import createElement from '../../dom-helper/create-element';
import './tooltip.scss';

export default class Tooltip {
  private tooltip: HTMLElement;

  constructor(private content: string, private element: HTMLElement, private topSize: number) {
    this.element = element;
    this.topSize = topSize;
    this.content = content;
    this.tooltip = createElement('div', 'tooltip');
    this.init();
  }

  private init(): void {
    this.tooltip.textContent = this.content;
  }

  public show(): void {
    const { top, left, right } = this.element.getBoundingClientRect();
    this.tooltip.style.top = `${top - this.topSize}px`;
    this.tooltip.style.left = `${left - (right - left) / 2}px`;
    document.body.append(this.tooltip);
  }

  public remove(): void {
    this.tooltip.remove();
  }
}
