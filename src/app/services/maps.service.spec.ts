import { TestBed } from '@angular/core/testing';

import { MapsService } from './maps.service';

describe('MapsService', () => {
  let mapsService: MapsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    mapsService = TestBed.inject(MapsService);
  });

  it('should be created', () => {
    expect(mapsService).toBeTruthy();
  });

  describe('Tests for getCurrentPosition', () => {
    it('should save the coords', () => {
      spyOn(navigator.geolocation, 'getCurrentPosition').and.callFake((successFn) => {
        const mockGeolocation = {
          coords: {
            accuracy: 0,
            altitude:  0,
            altitudeAccuracy:  0,
            heading:  0,
            latitude: 123,
            longitude: 2,
            speed:  0
          },
          timestamp: 0
        };  
    
        successFn(mockGeolocation);
      });

      mapsService.getCurrentPosition();

      expect(mapsService.center).toEqual({ lat: 123, lng: 2 });
    });
  });
});
