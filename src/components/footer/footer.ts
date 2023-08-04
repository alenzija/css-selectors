import createElement from '../../dom-helper/create-element';

import './footer.scss';

export default class Footer {
  public footer: HTMLElement;

  public githubLink: HTMLAnchorElement;

  public schoolLogo: HTMLAnchorElement;

  constructor() {
    this.footer = createElement('footer', 'footer');
    this.githubLink = createElement<HTMLAnchorElement>('a', 'footer__githublink');
    this.schoolLogo = createElement<HTMLAnchorElement>('a', 'footer__logolink');
    this.init();
  }

  public initGithubName(): void {
    this.githubLink.href = 'https://github.com/alenzija';
    const logo = createElement<HTMLImageElement>('img');
    logo.alt = 'github\'s logo';
    logo.src = './github.png';
    this.githubLink.append(logo);
  }

  public initSchoolLogo(): void {
    this.schoolLogo.href = 'https://rs.school/js/';
    const imgLogo = createElement<HTMLImageElement>('img', 'footer__logolink--img');
    imgLogo.src = './rs_school_js.svg';
    this.schoolLogo.append(imgLogo);
  }

  private init(): void {
    this.initGithubName();
    this.initSchoolLogo();
    const wrapper = createElement('div', 'footer__wrapper');
    wrapper.append(this.githubLink, this.schoolLogo);
    const year = createElement('div');
    year.innerHTML = '©Images from <a href="https://ru.freepik.com/free-vector/flat-design-spring-flower-collection_12556296.htm?query=flower">Freepik</a>, 2023';
    this.footer.append(wrapper, year);
  }

  public getElement(): HTMLElement {
    return this.footer;
  }
}

// Изображение от <a href="https://ru.freepik.com/free-vector/flat-design-spring-flower-collection_12556296.htm?query=flower">Freepik</a>
// <a href="https://www.flaticon.com/free-icons/flowers" title="flowers icons">Flowers icons created by Mihimihi - Flaticon</a>
