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
  title = 'angular-weather';
  weatherForm: FormGroup;
  submitted: boolean = false;
  forecast: any[] = [];

  constructor(private weatherService: WeatherService) {
    this.weatherForm = new FormGroup({
      city: new FormControl('', Validators.required),
    });
  }

  get city(): any {
    return this.weatherForm.get('city').value;
  }

  getForecast(): void {
    this.weatherService
      .getForecast(this.city)
      .toPromise()
      .then(
        // TODO res: HttpResponse<ExpectedType>
        (res: any) => {
          this.forecast = res.list;
          console.log('got weather data:', this.forecast);
        },
        (err: HttpErrorResponse) => {
          if (err.statusText === 'Not Found') {
            alert('City not found.');
          } else {
            console.error('Error getting forecast:', err);
          }
        }
      );
  }

  onSubmit(): void {
    if (this.weatherForm.valid) {
      this.submitted = true;
      this.getForecast();
    }
  }
}
