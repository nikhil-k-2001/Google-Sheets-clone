class FormulaParser {
  private sheetData: string[][];

  constructor(sheetData: string[][]) {
    this.sheetData = sheetData; // 2D array representing spreadsheet data
  }

  evaluateFormula(formula: string): string | number {
    try {
      if (!formula.startsWith("=")) return formula; // Not a formula
      const expression = formula.substring(1); // Remove '='
      return this.evaluateExpression(expression);
    } catch (error) {
      return "ERROR";
    }
  }

  private evaluateExpression(expression: string): string | number {
    const fnMatch = expression.match(
      /(SUM|AVERAGE|MAX|MIN|COUNT|TRIM|UPPER|LOWER|FIND_AND_REPLACE)\((.*?)\)/
    );

    if (!fnMatch) return "ERROR";

    const fnName = fnMatch[1];
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
      case "TRIM":
        return args[0].trim();
      case "UPPER":
        return args[0].toUpperCase();
      case "LOWER":
        return args[0].toLowerCase();
      case "FIND_AND_REPLACE":
        return this.findAndReplace(args).join(", ");
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

  private findAndReplace([range, findText, replaceText]: string[]): string[] {
    return this.getRangeValues(range).map((val) =>
      val === parseFloat(findText) ? replaceText : val.toString()
    );
  }

  private parseCell(cell: string): [number, number] {
    const col = cell.charCodeAt(0) - "A".charCodeAt(0);
    const row = parseInt(cell.slice(1), 10) - 1;
    return [col, row];
  }
}

export default FormulaParser;
