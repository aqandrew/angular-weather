import { Injectable } from '@angular/core';

import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private apiKey: string = environment.WEATHER_API_KEY;
  private forecast: any[] = [];

  constructor() {
    console.log('weather API key:', this.apiKey);
  }

  getForecast(city: string) {
    return this.forecast;
  }
}
