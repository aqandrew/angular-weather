import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { WeatherService } from './weather.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'angular-weather';
  weatherForm: FormGroup;
  city: string = '';
  submitted: boolean = false;
  forecast: any[] = [];

  constructor(private weatherService: WeatherService) {
    this.weatherForm = new FormGroup({
      city: new FormControl(this.city, Validators.required),
    });
  }

  ngOnInit() {
    this.getForecast();
  }

  getForecast(): void {
    this.forecast = this.weatherService.getForecast(this.city);
  }

  onSubmit(): void {
    if (this.weatherForm.valid) {
      this.submitted = true;
      this.getForecast();
    }
  }
}
