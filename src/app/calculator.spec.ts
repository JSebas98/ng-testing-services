import { Calculator } from './calculator';

describe('Tests for Calculator', () => {
  it('#multiply should return 9', () => {
    // Arrange
    const calculator = new Calculator();
    // Act
    const result = calculator.multiply(3, 3);
    // Assert
    expect(result).toEqual(9);
  });
});