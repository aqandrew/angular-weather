import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { WeatherService } from './weather.service';

describe('WeatherService', () => {
  let service: WeatherService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [WeatherService],
    });
    service = TestBed.get(WeatherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
