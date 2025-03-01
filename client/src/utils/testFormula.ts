
import FormulaParser from "./FormulaParser.js"; // ✅ Ensure .js extension for ES Module compatibility

// Sample spreadsheet data (3x3 grid)
const sampleSheet = [
  ["10", "20", "30"],
  ["40", "50", "60"],
  ["70", "80", "90"]
];

// Create an instance of the FormulaParser
const parser = new FormulaParser(sampleSheet);

// Test different formulas
console.log(parser.evaluateFormula("=SUM(A1:A3)")); // Expected: 120
console.log(parser.evaluateFormula("=AVERAGE(A1:A3)")); // Expected: 40
console.log(parser.evaluateFormula("=MAX(A1:A3)")); // Expected: 70
console.log(parser.evaluateFormula("=MIN(A1:A3)")); // Expected: 10
console.log(parser.evaluateFormula("=COUNT(A1:A3)")); // Expected: 3
