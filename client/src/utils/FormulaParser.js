"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FormulaParser = /** @class */ (function () {
    function FormulaParser(sheetData) {
        this.sheetData = sheetData; // Spreadsheet data (2D array)
    }
    FormulaParser.prototype.evaluateFormula = function (formula) {
        try {
            if (!formula.startsWith("="))
                return formula; // If not a formula, return as-is
            var expression = formula.substring(1); // Remove '='
            return this.evaluateExpression(expression);
        }
        catch (error) {
            return "ERROR"; // Return error if something goes wrong
        }
    };
    FormulaParser.prototype.evaluateExpression = function (expression) {
        var fnMatch = expression.match(/(SUM|AVERAGE|MAX|MIN|COUNT)\((.*?)\)/);
        if (!fnMatch)
            return "ERROR"; // If formula is invalid
        var fnName = fnMatch[1]; // Extract function name
        var args = fnMatch[2].split(",").map(function (arg) { return arg.trim(); });
        switch (fnName) {
            case "SUM":
                return this.sum(args[0]);
            case "AVERAGE":
                return this.average(args[0]);
            case "MAX":
                return this.max(args[0]);
            case "MIN":
                return this.min(args[0]);
            case "COUNT":
                return this.count(args[0]);
            default:
                return "ERROR";
        }
    };
    FormulaParser.prototype.getRangeValues = function (range) {
        var _a = range.split(":"), start = _a[0], end = _a[1];
        var _b = this.parseCell(start), startCol = _b[0], startRow = _b[1];
        var _c = this.parseCell(end), endCol = _c[0], endRow = _c[1];
        var values = [];
        for (var r = startRow; r <= endRow; r++) {
            for (var c = startCol; c <= endCol; c++) {
                var cellValue = parseFloat(this.sheetData[r][c]) || 0;
                values.push(cellValue);
            }
        }
        return values;
    };
    FormulaParser.prototype.sum = function (range) {
        return this.getRangeValues(range).reduce(function (acc, num) { return acc + num; }, 0);
    };
    FormulaParser.prototype.average = function (range) {
        var values = this.getRangeValues(range);
        return values.length ? this.sum(range) / values.length : 0;
    };
    FormulaParser.prototype.max = function (range) {
        return Math.max.apply(Math, this.getRangeValues(range));
    };
    FormulaParser.prototype.min = function (range) {
        return Math.min.apply(Math, this.getRangeValues(range));
    };
    FormulaParser.prototype.count = function (range) {
        return this.getRangeValues(range).length;
    };
    FormulaParser.prototype.parseCell = function (cell) {
        var col = cell.charCodeAt(0) - "A".charCodeAt(0);
        var row = parseInt(cell.slice(1), 10) - 1;
        return [col, row];
    };
    return FormulaParser;
}());
// ✅ Use ES Module Export
exports.default = FormulaParser;
