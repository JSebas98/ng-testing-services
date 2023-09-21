export class Calculator {
  public multiply(a: number, b: number): number {
    return a * b;
  }

  /**
* Divides two numbers.
* 
* @param {number} a - The dividend number.
* @param {number} b - The divisor number.
* @returns {number | null} The quotient of a and b if b is not 0, otherwise null.
*/
public divide(a: number, b: number): number | null {
    if (b === 0) {
      return null;
    }

    return a / b;
  }
}