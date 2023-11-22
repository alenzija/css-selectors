const levels = [
  {
    id: 1,
    title: 'Select sunflowers',
    windowsill: [
      {
        name: 'sunflower',
        url: './sunflower.png',
        class: null,
        animated: true,
      },
      {
        name: 'cherry',
        url: './cherry.png',
        class: null,
      },
      {
        name: 'floral',
        url: './floral.png',
        class: null,
      },
      {
        name: 'sunflower',
        url: './sunflower.png',
        class: null,
        animated: true,
      },
    ],

    answer: 'sunflower',
    description: {
      title: 'Type element selector',
      question: 'Select elements by their type',
      type: 'A',
      help: 'Selects all elements of type <strong>A</strong>. Type refers to the type of tag, so <strong>div</strong>, <strong>p</strong> and <strong>ul</strong> are all different element types.',
      examples: ['<strong>div</strong> selects all <strong>&lt;div&gt;</strong> elements.', '<strong>p</strong> selects all <strong>&lt;p&gt;</strong> elements.'],
    },
  },
  {
    id: 2,
    title: 'Select the flowerpot with strip',
    windowsill: [
      {
        name: 'flowerpot',
        id: 'light',
        flowers: [{
          name: 'cherry',
          url: './cherry.png',
          class: null,
        }],
        animated: true,
      },
      {
        name: 'flowerpot',
        id: null,
        flowers: [{
          name: 'tulips',
          url: './tulips.png',
          class: null,
        },
        {
          name: 'tulips',
          url: './tulips.png',
          class: null,
        }],
      },
    ],
    answer: '#light',
    description: {
      title: 'Id Selector',
      question: 'Select element with an ID',
      type: '#A',
      help: 'Selects the element with a specific <strong>id</strong>. You can also combine the ID selector with the type selector.',
      examples: ['<strong>#id</strong> selects element width <strong>id="id"</strong>.', '<strong>element#id</strong> selects elements with <strong>id="id"&gt;</strong>.'],
    },
  },
  {
    id: 3,
    title: 'Select the big cherry',
    windowsill: [
      {
        name: 'flowerpot',
        id: 'light',
        flowers: [{
          name: 'sunflower',
          url: './sunflower.png',
          class: null,
        },
        {
          name: 'floral',
          url: './floral.png',
          class: null,
        },
        {
          name: 'cherry',
          url: './cherry.png',
          class: null,
        }],
      },
      {
        name: 'sunflower',
        url: './sunflower.png',
        class: null,
      },
      {
        name: 'cherry',
        url: './cherry.png',
        class: 'big',
        animated: true,
      },
    ],
    answer: '.big',
    description: {
      title: 'Class Selector',
      question: 'Select elements by their class',
      type: '.A',
      help: 'The class selector selects all elements with that class attribute. Elements can only have one ID, but many classes.',
      examples: ['<strong>.className</strong> selects all elements with <strong>class="className"</strong>'],
    },
  },
  {
    id: 4,
    title: 'Select the big floral',
    windowsill: [
      {
        name: 'flowerpot',
        id: 'light',
        flowers: [{
          name: 'floral',
          url: './floral.png',
          class: null,
        },
        {
          name: 'floral',
          url: './floral.png',
          class: 'big',
          animated: true,
        }],
      },
      {
        name: 'flowerpot',
        id: null,
        flowers: [{
          name: 'cherry',
          url: './cherry.png',
          class: null,
        },
        {
          name: 'cherry',
          url: './cherry.png',
          class: 'big',
        }],
      },
    ],
    answer: 'floral.big',
    description: {
      title: 'Class Selector',
      question: 'Combine the Class Selector',
      type: 'A.B',
      help: 'You can combine the class selector with other selectors, like the type selector.',
      examples: ['<strong>div.className</strong> selects all <strong>&lt;div class="className"&gt;</strong> elements.', '<strong>#id.className</strong> select element with <strong>id="id"</strong> and  <strong>class="className"</strong>.'],
    },
  },
  {
    id: 5,
    title: 'Select the vase and the flowerpot',
    windowsill: [
      {
        name: 'vase',
        id: null,
        flowers: [{
          name: 'sunflower',
          url: './sunflower.png',
          class: null,
        },
        {
          name: 'sunflower',
          url: './sunflower.png',
          class: null,
        }],
        animated: true,
      },
      {
        name: 'flowerpot',
        id: null,
        flowers: [{
          name: 'tulips',
          url: './tulips.png',
          class: null,
        },
        {
          name: 'tulips',
          url: './tulips.png',
          class: null,
        },
        {
          name: 'tulips',
          url: './tulips.png',
          class: null,
        }],
        animated: true,
      },
      {
        name: 'cherry',
        url: './cherry.png',
        class: null,
      }],
    answer: 'vase, flowerpot',
    description: {
      title: 'Comma Combinator',
      question: 'Combine, selectors, with... commas!',
      type: 'A, B',
      help: 'Thanks to Shatner technology, this selects all <strong>A</strong> and <strong>B</strong> elements. You can combine any selectors this way, and you can specify more than two.',
      examples: ['<strong>div, p</strong> selects all <strong>&lt;div&gt;</strong> and <strong>&lt;p&gt;</strong> elements.', '<strong>p, .className</strong> selects all <strong>&lt;p&gt;</strong> elements and elements with <strong>class="className"</strong>'],
    },
  },
  {
    id: 6,
    title: 'Select all flowers',
    windowsill: [
      {
        name: 'cherry',
        url: './cherry.png',
        class: 'big',
        animated: true,
      },
      {
        name: 'sunflower',
        url: './sunflower.png',
        class: null,
        animated: true,
      },
      {
        name: 'floral',
        url: './floral.png',
        class: null,
        animated: true,
      },
      {
        name: 'tulips',
        url: './tulips.png',
        class: 'big',
        animated: true,
      },
    ],
    answer: '*',
    description: {
      title: 'The Universal Selector',
      question: 'You can select everything!',
      type: '*',
      help: 'You can select all elements with the universal selector!',
      examples: ['<strong>div*</strong> selects all elements inside in <strong>&lt;div&gt;</strong>'],
    },
  },
  {
    id: 7,
    title: 'Select all florals in flowerpot',
    windowsill: [
      {
        name: 'flowerpot',
        id: null,
        flowers: [{
          name: 'floral',
          url: './floral.png',
          class: 'big',
          animated: true,
        },
        {
          name: 'floral',
          url: './floral.png',
          class: null,
          animated: true,
        }],
      },
      {
        name: 'floral',
        url: './floral.png',
        class: 'big',
      },
      {
        name: 'floral',
        url: './floral.png',
        class: null,
      },
      {
        name: 'vase',
        id: null,
        flowers: [{
          name: 'floral',
          url: './floral.png',
          class: null,
        },
        {
          name: 'floral',
          url: './floral.png',
          class: null,
        }],
      },
    ],
    answer: 'flowerpot floral',
    description: {
      title: 'Descendant Selector',
      question: 'Select an element inside another element',
      type: 'A B',
      help: 'Selects all <strong>B</strong> inside of <strong>A</strong>. <strong>B</strong> is called a descendant because it is inside of another element.',
      examples: ['<strong>div p</strong> selects all <strong>&lt;p&gt;</strong> elements inside <strong>&lt;div&gt;</strong>.', '<strong>p .className</strong> selects all elements with <strong>class="className"</strong> inside elements <strong>&lt;p&gt;</strong> elements inside <strong>&lt;p&gt;</strong>.'],
    },
  },
  {
    id: 8,
    title: 'Select every tulips that\'s next to vase',
    windowsill: [
      {
        name: 'vase',
        id: null,
        flowers: [
          {
            name: 'sunflower',
            url: './sunflower.png',
            class: 'big',
          }],
      },
      {
        name: 'tulips',
        url: './tulips.png',
        class: null,
        animated: true,
      },
      {
        name: 'flowerpot',
        id: null,
        flowers: [{
          name: 'floral',
          url: './floral.png',
          class: null,
        },
        {
          name: 'tulips',
          url: './tulips.png',
          class: null,
        }],
      },
      {
        name: 'tulips',
        url: './tulips.png',
        class: null,
      },
      {
        name: 'vase',
        id: null,
        flowers: [
          {
            name: 'tulips',
            url: './tulips.png',
            class: null,
          }],
      },
      {
        name: 'tulips',
        url: './tulips.png',
        class: null,
        animated: true,
      },
    ],
    answer: 'vase+tulips',
    description: {
      title: 'Adjacent Sibling Selector',
      question: 'Select an element that directly follows another element',
      type: 'A+B',
      help: 'This selects all <strong>B</strong> elements that directly follow <strong>A</strong>. Elements that follow one another are called siblings. They\'re on the same level, or depth.',
      examples: ['<strong>div+p</strong> selects first element <strong>&lt;p&gt;</strong> that directly follows a <strong>&lt;div&gt;</strong>.', '<strong>p+.className</strong> select first element with <strong>class="className"</strong> that directly follows a <strong>&lt;p&gt;</strong>..'],
    },
  },
  {
    id: 9,
    title: 'Select the sunflowers beside flowerpot',
    windowsill: [
      {
        name: 'sunflower',
        url: './sunflower.png',
        class: 'big',
      },
      {
        name: 'flowerpot',
        id: null,
        flowers: [
          {
            name: 'tulips',
            url: './tulips.png',
            class: 'big',
          }],
      },
      {
        name: 'sunflower',
        url: './sunflower.png',
        class: 'big',
        animated: true,
      },
      {
        name: 'tulips',
        url: './tulips.png',
        class: null,
      },
      {
        name: 'sunflower',
        url: './sunflower.png',
        class: 'big',
        animated: true,
      },
      {
        name: 'flowerpot',
        id: 'light',
        flowers: [{
          name: 'cherry',
          url: './cherry.png',
          class: null,
        }],
      },
    ],
    answer: 'flowerpot~sunflower',
    description: {
      title: 'General Sibling Selector',
      question: 'Select elements that follows another element',
      type: 'A~B',
      help: 'You can select all siblings of an element that follow it. This is like the Adjacent Selector (A + B) except it gets all of the following elements instead of one.',
      examples: ['<strong>div~p</strong> selects all <strong>&lt;p&gt;</strong> elements that follow a <strong>&lt;div&gt;</strong>.'],
    },
  },
  {
    id: 10,
    title: 'Select the floral directly in a vase',
    windowsill: [
      {
        name: 'flowerpot',
        id: null,
        flowers: [
          {
            name: 'floral',
            url: './floral.png',
            class: 'big',
          }],
      },
      {
        name: 'floral',
        url: './floral.png',
        class: null,
      },
      {
        name: 'tulips',
        url: './tulips.png',
        class: null,
      },
      {
        name: 'vase',
        id: null,
        flowers: [{
          name: 'floral',
          url: './floral.png',
          class: null,
          animated: true,
        }],
      },
      {
        name: 'floral',
        url: './floral.png',
        class: null,
      },
      {
        name: 'tulips',
        url: './tulips.png',
        class: null,
      },
    ],
    answer: 'vase>floral',
    description: {
      title: 'Child Selector',
      question: 'Select direct children of an element',
      type: 'A>B',
      help: 'You can select elements that are direct children of other elements. A child element is any element that is nested directly in another element.',
      examples: ['<strong>div>p</strong> selects all <strong>&lt;p&gt;</strong> elements that are a direct children <strong>&lt;div&gt;</strong>.'],
    },
  },
];

export default levels;
