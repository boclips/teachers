import { generateBorderRadiusClassNames, generateUri } from './index';

describe('Border radius classnames can be generated for a grid', () => {
  const testData = [
    {
      elements: ['A'],
      columnCount: 1,
      topLeft: 'A',
      topRight: 'A',
      bottomLeft: 'A',
      bottomRight: 'A',
    },
    {
      elements: ['A', 'B', 'C'],
      columnCount: 3,
      topLeft: 'A',
      topRight: 'C',
      bottomLeft: 'A',
      bottomRight: 'C',
    },
    {
      elements: ['A', 'B', 'C'],
      columnCount: 2,
      topLeft: 'A',
      topRight: 'B',
      bottomLeft: 'C',
      bottomRight: '',
    },
    {
      elements: ['A', 'B', 'C', 'D', 'E'],
      columnCount: 3,
      topLeft: 'A',
      topRight: 'C',
      bottomLeft: 'D',
      bottomRight: '',
    },
    {
      elements: ['A', 'B', 'C', 'D', 'E', 'F'],
      columnCount: 3,
      topLeft: 'A',
      topRight: 'C',
      bottomLeft: 'D',
      bottomRight: 'F',
    },
  ];

  testData.forEach((data) => {
    it(`with ${data.elements.length} elements, and ${data.columnCount}`, () => {
      data.elements.forEach((element, index) => {
        const expectedClassnames = [];

        if (index === 0) {
          expectedClassnames.push('border-radius--first');
        }

        if (data.topLeft === element) {
          expectedClassnames.push('border-radius--top-left');
        }
        if (data.topRight === element) {
          expectedClassnames.push('border-radius--top-right');
        }
        if (data.bottomLeft === element) {
          expectedClassnames.push('border-radius--bottom-left');
        }
        if (data.bottomRight === element) {
          expectedClassnames.push('border-radius--bottom-right');
        }

        if (index === data.elements.length - 1) {
          expectedClassnames.push('border-radius--last');
        }

        const classnames = generateBorderRadiusClassNames(
          index,
          data.columnCount,
          data.elements.length,
        );

        expect(classnames).toEqual(expectedClassnames.join(' '));
      });
    });
  });
});

describe('generateUri', () => {
  const testData = [
    {
      path: null,
      query: null,
      expected: '',
    },
    {
      path: '/test',
      query: null,
      expected: '/test',
    },
    {
      path: '/test',
      query: {
        foo: 'bar',
        num: 123,
      },
      expected: '/test?foo=bar&num=123',
    },
    {
      path: '/test',
      query: {
        foo: ['bar1', 'bar2'],
        fizz: false,
      },
      expected: '/test?fizz=false&foo=bar1&foo=bar2',
    },
  ];

  testData.forEach(({ path, query, expected }, index) => {
    it(`presents the correct uri. Case ${index}`, () => {
      expect(generateUri(path, query)).toEqual(expected);
    });
  });
});
