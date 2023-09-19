export class Calculator {
  public multiply(a: number, b: number): number {
    return a * b;
  }

  public divide(a: number, b: number): number | null {
    if (b === 0) {
      return null;
    }

    return a / b;
  }
}