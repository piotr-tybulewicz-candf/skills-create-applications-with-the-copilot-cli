#!/usr/bin/env node

/**
 * calculator.js - A simple Node.js CLI calculator.
 *
 * Supported operations (matching the four basic math operation keys
 * shown on the calculator: ÷, ×, −, +), plus additional advanced
 * operations (modulo, exponentiation, square root):
 *   add        (+)       - Addition
 *   subtract   (-)       - Subtraction
 *   multiply   (*)       - Multiplication
 *   divide     (/)       - Division
 *   modulo     (%)       - Remainder of division (binary)
 *   power      (^ or **) - Exponentiation (binary)
 *   sqrt                 - Square root (unary)
 *
 * Usage:
 *   node src/calculator.js <num1> <operation> <num2>
 *   node src/calculator.js sqrt <num>
 *
 * Examples:
 *   node src/calculator.js 5 + 3
 *   node src/calculator.js 5 add 3
 *   node src/calculator.js 10 / 2
 *   node src/calculator.js 10 % 3
 *   node src/calculator.js 2 ^ 8
 *   node src/calculator.js sqrt 16
 */

// Addition: returns the sum of two numbers.
function add(a, b) {
  return a + b;
}

// Subtraction: returns the difference of two numbers.
function subtract(a, b) {
  return a - b;
}

// Multiplication: returns the product of two numbers.
function multiply(a, b) {
  return a * b;
}

// Division: returns the quotient of two numbers. Throws if dividing by zero.
function divide(a, b) {
  if (b === 0) {
    throw new Error('Division by zero is not allowed.');
  }
  return a / b;
}

// Modulo: returns the remainder of a divided by b. Throws if dividing by zero.
function modulo(a, b) {
  if (b === 0) {
    throw new Error('Division by zero is not allowed.');
  }
  return a % b;
}

// Power: returns base raised to the exponent.
function power(base, exponent) {
  return Math.pow(base, exponent);
}

// Square root: returns the square root of n. Throws for negative numbers.
function squareRoot(n) {
  if (n < 0) {
    throw new Error('Cannot compute the square root of a negative number.');
  }
  return Math.sqrt(n);
}

// Map of accepted binary operation aliases (symbols and words) to their functions.
const operations = {
  '+': add,
  add: add,
  '-': subtract,
  subtract: subtract,
  '*': multiply,
  x: multiply,
  multiply: multiply,
  '/': divide,
  divide: divide,
  '%': modulo,
  mod: modulo,
  modulo: modulo,
  '^': power,
  '**': power,
  power: power,
};

// Map of accepted unary operation aliases (operating on a single number).
const unaryOperations = {
  sqrt: squareRoot,
  '√': squareRoot,
  squareroot: squareRoot,
};

// Parses CLI args and computes the result, or throws a descriptive error.
// Supports both binary operations (<num1> <operation> <num2>) and the
// unary square root operation (sqrt <num>).
function calculate(args) {
  const [first, second] = args;

  // Unary form: `sqrt <num>` (operation given first, single operand).
  if (first !== undefined && unaryOperations[String(first).toLowerCase()]) {
    if (second === undefined) {
      throw new Error('Usage: node src/calculator.js sqrt <num>');
    }
    const n = Number(second);
    if (Number.isNaN(n)) {
      throw new Error('The operand must be a valid number.');
    }
    return unaryOperations[first.toLowerCase()](n);
  }

  const [rawA, rawOp, rawB] = args;

  if (rawA === undefined || rawOp === undefined || rawB === undefined) {
    throw new Error(
      'Usage: node src/calculator.js <num1> <operation> <num2>'
    );
  }

  const a = Number(rawA);
  const b = Number(rawB);

  if (Number.isNaN(a) || Number.isNaN(b)) {
    throw new Error('Both operands must be valid numbers.');
  }

  const operation = operations[rawOp.toLowerCase()];
  if (!operation) {
    throw new Error(
      `Unsupported operation "${rawOp}". Supported operations: + (add), - (subtract), * (multiply), / (divide), % (modulo), ^ (power), sqrt (square root).`
    );
  }

  return operation(a, b);
}

// Only run the CLI logic when this file is executed directly (not required as a module).
if (require.main === module) {
  try {
    const result = calculate(process.argv.slice(2));
    console.log(result);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exitCode = 1;
  }
}

module.exports = {
  add,
  subtract,
  multiply,
  divide,
  modulo,
  power,
  squareRoot,
  calculate,
};
