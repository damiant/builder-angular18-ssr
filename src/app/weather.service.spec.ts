import { TestBed } from '@angular/core/testing';

import { WeatherService } from './weather.service';
import forecasts from '../../sample-data.json'
import { DaysWeather } from '../models/weather-info';

describe('WeatherService', () => {
  let service: WeatherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeatherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Should convert data', () => {
    const expected: DaysWeather =
    {
      'day': 'Monday', 'forecasts': [
        { 'time': '11am', 'temperature': 66, 'description': 'Few Clouds', 'icon': '02d' },
        { 'time': '2pm', 'temperature': 70, 'description': 'Few Clouds', 'icon': '02d' },
        { 'time': '5pm', 'temperature': 70, 'description': 'Few Clouds', 'icon': '02d' },
        { 'time': '8pm', 'temperature': 61, 'description': 'Clear Sky', 'icon': '01n' },
        { 'time': '11pm', 'temperature': 58, 'description': 'Clear Sky', 'icon': '01n' }
      ]
    };

    expect(service.mapForecasts(forecasts)[0]).toEqual(expected);
  });
});
