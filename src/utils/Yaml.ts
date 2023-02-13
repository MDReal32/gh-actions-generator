export class Yaml {
  private indentation: number = 0;
  private indentationCount: number = 2;

  static parse(json: object): string {
    return new Yaml().object(json).trimStart();
  }

  setIndent(indentation: number): this {
    this.indentation = indentation;
    return this;
  }

  parse(value: any): string {
    const type = typeof value;
    if (type === "string") {
      return this.string(value);
    } else if (type === "number") {
    } else if (type === "boolean") {
    } else if (type === "object") {
      return this.object(value);
    }

    return "";
  }

  object(data: any) {
    if (data === null) return "";
    if (Array.isArray(data)) return this.array(data);

    this.setIndent(this.indentation + this.indentationCount);
    const lines: string[] = [];
    lines.push(``);
    Object.keys(data).forEach(key => {
      lines.push(`${this.indent()}${key}: ${this.parse(data[key])}`);
    });
    this.setIndent(this.indentation - this.indentationCount);
    return lines.join("\n");
  }

  private array(values: any[]): string {
    const lines: string[] = [];
    lines.push(``);
    this.setIndent(this.indentation + this.indentationCount);
    values.forEach(value => {
      lines.push(`${this.indent()}- ${value}`);
    });
    this.setIndent(this.indentation - this.indentationCount);
    return lines.join("\n");
  }

  private string(value: string): string {
    return `"${value}"`;
  }

  private indent(): string {
    return " ".repeat(this.indentation - this.indentationCount);
  }
}
