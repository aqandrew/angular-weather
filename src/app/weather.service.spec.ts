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

  it('should get 40 3-hour increments of forecast data from WeatherService', (done) => {
    // TODO How to test using AppComponent's subscribe function?
    service.getForecast('foo').subscribe((data) => {
      expect(data.list.length).toBe(40);
      done();
    });
  });
});
