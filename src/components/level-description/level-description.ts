import createElement from '../../dom-helper/create-element';
import { Description } from '../../types';

import './level-description.scss';

export default class LevelDescription {
  private element: HTMLElement;

  constructor(private description: Description) {
    this.description = description;
    this.element = createElement('div', 'description');
    this.init();
  }

  private init(): void {
    const title = createElement('h2', 'description__title');
    title.innerHTML = this.description.title;
    const question = createElement('div', 'description__question');
    question.innerHTML = this.description.question;
    const type = createElement('div', 'description__type');
    type.innerHTML = this.description.type;
    const help = createElement('div', 'description__help');
    help.innerHTML = this.description.help;
    const examples = createElement('div', 'description__examples');
    examples.textContent = 'Examples:';
    this.description.examples.forEach((item) => {
      const example = createElement('div', 'description__examples--item');
      example.innerHTML = item;
      examples.append(example);
    });
    this.element.append(title, question, type, help, examples);
  }

  public getElement(): HTMLElement {
    return this.element;
  }
}
