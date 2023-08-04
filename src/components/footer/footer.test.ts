import Footer from './footer';

describe('Footer:', () => {
  const footerTest = new Footer();

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('initGithubName ', () => {
    test('should initialize with right logo', () => {
      const anchorElement = document.createElement('a');
      const anchorAppendMock = jest.fn();
      anchorElement.append = anchorAppendMock;
      footerTest.githubLink = anchorElement;

      footerTest.initGithubName();
      expect(anchorElement.href).toBe('https://github.com/alenzija');
      expect(anchorElement.append).toBeCalled();
      const appendedLogo = anchorAppendMock.mock.calls[0][0];
      expect(appendedLogo.alt).toBe('github\'s logo');
      expect(appendedLogo.src).toBe('http://localhost/github.png');
    });
  });

  describe('initSchoolLogo ', () => {
    test('should initialize with right logo', () => {
      const anchorElement = document.createElement('a');
      const anchorAppendMock = jest.fn();
      anchorElement.append = anchorAppendMock;
      footerTest.schoolLogo = anchorElement;

      footerTest.initSchoolLogo();
      expect(anchorElement.href).toEqual('https://rs.school/js/');
      expect(anchorElement.append).toBeCalled();
      const appendedLogo = anchorAppendMock.mock.calls[0][0];
      expect(appendedLogo.src).toBe('http://localhost/rs_school_js.svg');
    });
  });
});
