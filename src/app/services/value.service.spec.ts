import { TestBed } from '@angular/core/testing';
import { ValueService } from './value.service';

describe('ValueService', () => {
  let service: ValueService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ ValueService ]
    });
    service = TestBed.inject(ValueService);

    // Manual injection
    // service = new ValueService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getValue() tests', () => {
    it('should return "Test value"', () => {
      expect(service.getValue()).toBe('Test value');
    });
  });

  describe('setValue() tests', () => {
    it('should set a new value for value property', () => {
      expect(service.getValue()).toBe('Test value');
      service.setValue('Change value');
      expect(service.getValue()).toBe('Change value');
    });
  });

  describe('getPromiseValue() tests', () => {
    it('should get value from promise with then', (doneFn) => {
      service.getPromiseValue()
        .then((value) => {
          expect(value).toBe('Test promise value');
          doneFn();
        });
    });

    it('should get value from promise with async/await', async () => {
      const value = await service.getPromiseValue();
      expect(value).toBe('Test promise value');
    });
  });

  describe('getObservable() tests', () => {
    it ('should return value from observable', (doneFn) => {
      const value$ = service.getObservableValue();
      value$.subscribe({
        next: (value) => {
          expect(value).toBe('Test observable value');
          doneFn()
        },
      });
    });
  });
});
