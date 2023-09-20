import { MasterService } from './master.service';
import { ValueService } from './value.service';

fdescribe('MasterService', () => {
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
});
