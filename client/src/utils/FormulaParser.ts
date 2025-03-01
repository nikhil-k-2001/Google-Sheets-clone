class FormulaParser {
  private sheetData: string[][];

  constructor(sheetData: string[][]) {
    this.sheetData = sheetData; // Spreadsheet data (2D array)
  }

  evaluateFormula(formula: string): number | string {
    try {
      if (!formula.startsWith("=")) return formula; // If not a formula, return as-is

      const expression = formula.substring(1); // Remove '='
      return this.evaluateExpression(expression);
    } catch (error) {
      return "ERROR"; // Return error if something goes wrong
    }
  }

  private evaluateExpression(expression: string): number | string {
    const fnMatch = expression.match(/(SUM|AVERAGE|MAX|MIN|COUNT)\((.*?)\)/);

    if (!fnMatch) return "ERROR"; // If formula is invalid

    const fnName = fnMatch[1]; // Extract function name
    const args = fnMatch[2].split(",").map((arg) => arg.trim());

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
  }

  private getRangeValues(range: string): number[] {
    const [start, end] = range.split(":");
    const [startCol, startRow] = this.parseCell(start);
    const [endCol, endRow] = this.parseCell(end);

    let values: number[] = [];
    for (let r = startRow; r <= endRow; r++) {
      for (let c = startCol; c <= endCol; c++) {
        const cellValue = parseFloat(this.sheetData[r][c]) || 0;
        values.push(cellValue);
      }
    }
    return values;
  }

  private sum(range: string): number {
    return this.getRangeValues(range).reduce((acc, num) => acc + num, 0);
  }

  private average(range: string): number {
    const values = this.getRangeValues(range);
    return values.length ? this.sum(range) / values.length : 0;
  }

  private max(range: string): number {
    return Math.max(...this.getRangeValues(range));
  }

  private min(range: string): number {
    return Math.min(...this.getRangeValues(range));
  }

  private count(range: string): number {
    return this.getRangeValues(range).length;
  }

  private parseCell(cell: string): [number, number] {
    const col = cell.charCodeAt(0) - "A".charCodeAt(0);
    const row = parseInt(cell.slice(1), 10) - 1;
    return [col, row];
  }
}

// ✅ Use ES Module Export
export default FormulaParser;
