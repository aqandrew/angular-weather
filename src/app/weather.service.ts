import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private apiUrl: string = 'https://api.openweathermap.org/data/2.5/forecast';
  private apiKey: string = environment.WEATHER_API_KEY;
  private forecast: any[] = [];

  constructor(private http: HttpClient) {}

  getForecast(city: string): Observable<any> {
    let requestOptions = {
      params: {
        q: city,
        units: 'imperial',
        appid: this.apiKey,
      },
    };

    return this.http.get(this.apiUrl, requestOptions);
  }
}
