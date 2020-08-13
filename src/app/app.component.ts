import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { WeatherService } from './weather.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'angular-weather';
  weatherForm: FormGroup;
  city: string = '';
  submitted: boolean = false;

  constructor(private weatherService: WeatherService) {
    this.weatherForm = new FormGroup({
      city: new FormControl(this.city, Validators.required),
    });
  }

  onSubmit(): void {
    console.log('you submitted the form!');
    this.submitted = true;
  }
}
