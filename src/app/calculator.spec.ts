import { Calculator } from './calculator';

// fdescribe() to focus on this set of tests 
describe('Tests for Calculator', () => {
  it('#multiply should return 9', () => {
    // Arrange
    const calculator = new Calculator();
    // Act
    const result = calculator.multiply(3, 3);
    // Assert
    expect(result).toEqual(9);
  });

  it('#divide should return two on each scenario', () => {
    const calculator = new Calculator();

    expect(calculator.divide(6, 3)).toEqual(2);
    expect(calculator.divide(12, 6)).toEqual(2);
  });

  it('#divide should return null if divided by 0', () => {
    const calculator = new Calculator();

    expect(calculator.divide(6, 0)).toBeNull();
  });
});