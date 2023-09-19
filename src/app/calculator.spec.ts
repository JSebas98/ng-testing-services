import { Calculator } from './calculator';

// fdescribe() to focus on this set of tests 
describe('Tests for Calculator class', () => {
  describe('Tests for multiply()', () => {
    it('should return 9', () => {
      // Arrange
      const calculator = new Calculator();
      // Act
      const result = calculator.multiply(3, 3);
      // Assert
      expect(result).toEqual(9);
    });
  });

  describe('Tests for divide()', () => {
    it('should return two on each scenario', () => {
      // Arrange
      const calculator = new Calculator();
      // Act & Assert
      expect(calculator.divide(6, 3)).toEqual(2);
      expect(calculator.divide(12, 6)).toEqual(2);
    });
  
    it('should return null if divided by 0', () => {
      // Arrange
      const calculator = new Calculator();
      // Act & Assert
      expect(calculator.divide(6, 0)).toBeNull();
    });
  });
});