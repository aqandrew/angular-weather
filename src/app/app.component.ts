import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { WeatherService } from './weather.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  JSON: any;
  title = 'angular-weather';
  weatherForm: FormGroup;
  submitted: boolean = false;
  forecast: any;
  forecast5Days: any;

  constructor(private weatherService: WeatherService) {
    this.JSON = JSON;
    this.weatherForm = new FormGroup({
      city: new FormControl('', Validators.required),
    });
  }

  get city(): any {
    return this.weatherForm.get('city').value;
  }

  getForecast(): void {
    this.weatherService.getForecast(this.city).subscribe(
      // TODO data: HttpResponse<ExpectedType>
      (data: any) => {
        console.log('App got data:', data);
        this.forecast = data;
        this.getForecast5Days(data.list);
      },
      (error: HttpErrorResponse) => {
        if (error.statusText === 'Not Found') {
          alert('City not found.');
        } else {
          console.error('Error getting forecast:', error);
        }
      }
    );
  }

  // Massage API data into 5-day forecast
  getForecast5Days(data: any): void {
    console.log('TODO massage  forecast data:', data);

    // TODO Move this to utils and test it
    const isSameDate = (d1: Date, d2: Date): boolean =>
      d1.getDate() === d2.getDate() && d1.getMonth() === d2.getMonth();

    let now = new Date();

    // Condense 3-hour increments into data for 5 individual days
    this.forecast5Days = data.reduce((accumulator: any[], current: any) => {
      const thisDate = new Date(current.dt_txt);
      const indexWithThisDate = accumulator.findIndex((d) =>
        isSameDate(d.date, thisDate)
      );
      // Realias, using camelCase
      const {
        temp_min: currentTempMin,
        temp_max: currentTempMax,
        temp: currentTemp,
      } = current.main;

      // We also only want weather data for dates in the future
      //   (Excluding weather data for the rest of today)
      if (!isSameDate(now, thisDate)) {
        // If current's date isn't in accumulator
        if (indexWithThisDate === -1) {
          // Add it, with min/max/mean temperatures
          accumulator.push({
            date: thisDate,
            tempMin: currentTempMin,
            tempMax: currentTempMax,
            itemsWithThisDate: 1,
            tempSum: currentTemp,
            tempMean: currentTemp,
          });
        } else {
          // Otherwise, factor in current's info to this date
          const knownWeatherInfo = accumulator[indexWithThisDate];

          knownWeatherInfo.tempMin = Math.min(
            knownWeatherInfo.tempMin,
            currentTempMin
          );
          knownWeatherInfo.tempMax = Math.max(
            knownWeatherInfo.tempMax,
            currentTempMax
          );
          knownWeatherInfo.itemsWithThisDate++;
          knownWeatherInfo.tempSum += currentTemp;
          knownWeatherInfo.tempMean = (
            knownWeatherInfo.tempSum / knownWeatherInfo.itemsWithThisDate
          ).toFixed(2);
        }
      }

      return accumulator;
    }, []);
  }

  onSubmit(): void {
    if (this.weatherForm.valid) {
      this.submitted = true;
      this.getForecast();
    }
  }
}
