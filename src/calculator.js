#!/usr/bin/env node

/**
 * calculator.js - A simple Node.js CLI calculator.
 *
 * Supported operations (matching the four basic math operation keys
 * shown on the calculator: ÷, ×, −, +):
 *   add        (+)  - Addition
 *   subtract   (-)  - Subtraction
 *   multiply   (*)  - Multiplication
 *   divide     (/)  - Division
 *
 * Usage:
 *   node src/calculator.js <num1> <operation> <num2>
 *
 * Examples:
 *   node src/calculator.js 5 + 3
 *   node src/calculator.js 5 add 3
 *   node src/calculator.js 10 / 2
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

// Map of accepted operation aliases (symbols and words) to their functions.
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
};

// Parses CLI args and computes the result, or throws a descriptive error.
function calculate(args) {
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
      `Unsupported operation "${rawOp}". Supported operations: + (add), - (subtract), * (multiply), / (divide).`
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

module.exports = { add, subtract, multiply, divide, calculate };
