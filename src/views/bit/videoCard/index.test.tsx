function sum3(a: any, b: any) {
  return a + b;
}

test('adds 1 + 2 to equal 3', () => {
  expect(sum3(1, 2)).toBe(3);
});
