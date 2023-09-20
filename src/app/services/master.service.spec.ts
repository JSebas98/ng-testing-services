import { TestBed } from '@angular/core/testing';
import { MasterService } from './master.service';
import { ValueService } from './value.service';

fdescribe('MasterService', () => {
  let masterService: MasterService;
  let mockValueService: jasmine.SpyObj<ValueService>;

  beforeEach(() => {
    const valueServiceSpy = jasmine.createSpyObj('ValueService', ['getValue']);
    TestBed.configureTestingModule({
      providers: [
        MasterService,
        { provide: ValueService, useValue: valueServiceSpy }
      ]
    });

    masterService = TestBed.inject(MasterService);
    mockValueService = TestBed.inject(ValueService) as jasmine.SpyObj<ValueService>;
  });

  it('should return "Fake value" from spy object', () => {    
    mockValueService.getValue.and.returnValue('Fake value');
    expect(masterService.getDependentValue()).toBe('Fake value');
  });

  it('should call getValue method of ValueService once', () => {
    masterService.getDependentValue();
    expect(mockValueService.getValue).toHaveBeenCalledTimes(1);
  });

  /**
   * Manual injection
    it('should return "Fake value" from fake service object', () => {
      const fakeValueService = { getValue: () => 'Fake value' };
      const masterService = new MasterService(fakeValueService as ValueService);
      expect(masterService.getDependentValue()).toBe('Fake value');
    });

    it('should return "Fake value" from spy object', () => {
      const valueServiceSpy = jasmine.createSpyObj('ValueService', ['getValue']);
      const masterService = new MasterService(valueServiceSpy);
      
      valueServiceSpy.getValue.and.returnValue('Fake value');
      
      expect(masterService.getDependentValue()).toBe('Fake value');
    });

    it('should call getValue method of ValueService once', () => {
      const valueServiceSpy = jasmine.createSpyObj('ValueService', ['getValue']);
      const masterService = new MasterService(valueServiceSpy);
      masterService.getDependentValue();

      expect(valueServiceSpy.getValue).toHaveBeenCalledTimes(1);
    });
  */
});
