/**
 * calculator.test.js - Unit tests for the calculator functions
 * (add, subtract, multiply, divide) in src/calculator.js.
 *
 * Base examples (from images/calc-basic-operations.png):
 *   2 + 3  = 5
 *   10 - 4 = 6
 *   45 * 2 = 90
 *   20 / 5 = 4
 *
 * Each base example is expanded with additional cases covering
 * negative numbers, decimals, zero, and other edge cases.
 */

const { add, subtract, multiply, divide, calculate } = require('../calculator');

describe('add', () => {
  test('2 + 3 = 5 (base example)', () => {
    expect(add(2, 3)).toBe(5);
  });

  test('adds two positive numbers', () => {
    expect(add(7, 8)).toBe(15);
  });

  test('adds a negative and a positive number', () => {
    expect(add(-5, 3)).toBe(-2);
  });

  test('adds two negative numbers', () => {
    expect(add(-4, -6)).toBe(-10);
  });

  test('adds decimals', () => {
    expect(add(0.1, 0.2)).toBeCloseTo(0.3);
  });

  test('adding zero returns the other operand', () => {
    expect(add(5, 0)).toBe(5);
  });
});

describe('subtract', () => {
  test('10 - 4 = 6 (base example)', () => {
    expect(subtract(10, 4)).toBe(6);
  });

  test('subtracts resulting in a negative number', () => {
    expect(subtract(4, 10)).toBe(-6);
  });

  test('subtracts two negative numbers', () => {
    expect(subtract(-5, -3)).toBe(-2);
  });

  test('subtracts decimals', () => {
    expect(subtract(5.5, 2.2)).toBeCloseTo(3.3);
  });

  test('subtracting zero returns the original number', () => {
    expect(subtract(9, 0)).toBe(9);
  });

  test('subtracting a number from itself returns zero', () => {
    expect(subtract(8, 8)).toBe(0);
  });
});

describe('multiply', () => {
  test('45 * 2 = 90 (base example)', () => {
    expect(multiply(45, 2)).toBe(90);
  });

  test('multiplies two positive numbers', () => {
    expect(multiply(6, 7)).toBe(42);
  });

  test('multiplies a positive and a negative number', () => {
    expect(multiply(-3, 4)).toBe(-12);
  });

  test('multiplies two negative numbers', () => {
    expect(multiply(-3, -4)).toBe(12);
  });

  test('multiplies by zero returns zero', () => {
    expect(multiply(123, 0)).toBe(0);
  });

  test('multiplies decimals', () => {
    expect(multiply(1.5, 2)).toBeCloseTo(3);
  });
});

describe('divide', () => {
  test('20 / 5 = 4 (base example)', () => {
    expect(divide(20, 5)).toBe(4);
  });

  test('divides two positive numbers with a remainder', () => {
    expect(divide(7, 2)).toBe(3.5);
  });

  test('divides negative numbers', () => {
    expect(divide(-10, 2)).toBe(-5);
    expect(divide(10, -2)).toBe(-5);
  });

  test('dividing zero by a number returns zero', () => {
    expect(divide(0, 5)).toBe(0);
  });

  test('throws an error when dividing by zero', () => {
    expect(() => divide(5, 0)).toThrow('Division by zero is not allowed.');
  });

  test('throws an error when dividing zero by zero', () => {
    expect(() => divide(0, 0)).toThrow('Division by zero is not allowed.');
  });
});

describe('calculate (CLI argument parsing)', () => {
  test.each([
    ['2', '+', '3', 5],
    ['10', '-', '4', 6],
    ['45', '*', '2', 90],
    ['20', '/', '5', 4],
  ])('calculate([%s, %s, %s]) = %d', (a, op, b, expected) => {
    expect(calculate([a, op, b])).toBe(expected);
  });

  test('supports word-based operation aliases', () => {
    expect(calculate(['4', 'add', '6'])).toBe(10);
    expect(calculate(['4', 'subtract', '6'])).toBe(-2);
    expect(calculate(['4', 'multiply', '6'])).toBe(24);
    expect(calculate(['4', 'divide', '2'])).toBe(2);
    expect(calculate(['4', 'x', '6'])).toBe(24);
  });

  test('throws when missing arguments', () => {
    expect(() => calculate(['2', '+'])).toThrow(
      'Usage: node src/calculator.js <num1> <operation> <num2>'
    );
  });

  test('throws for non-numeric operands', () => {
    expect(() => calculate(['foo', '+', '3'])).toThrow(
      'Both operands must be valid numbers.'
    );
  });

  test('throws for unsupported operations', () => {
    expect(() => calculate(['2', '%', '3'])).toThrow(
      /Unsupported operation/
    );
  });

  test('throws for division by zero via CLI parsing', () => {
    expect(() => calculate(['5', '/', '0'])).toThrow(
      'Division by zero is not allowed.'
    );
  });
});
