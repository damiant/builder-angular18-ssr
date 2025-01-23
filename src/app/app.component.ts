import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { WeatherService } from './weather.service';
import { WeatherInfo } from '../models/weather-info';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  weatherService = inject(WeatherService);
  weatherInfo = signal<WeatherInfo>({ title: '', days: [] });
  zipCode: number | undefined;
  enteredZip: string | undefined;
  router = inject(Router);
  route = inject(ActivatedRoute);
  location = inject(Location);
  @Input()
  set zip(id: string | undefined) {
    this.zipCode = id ? parseInt(id) : 90210;
  }

  ngOnInit(): void {
    const path = this.location.path().split('=');
    if (path.length > 1) {
      this.zipCode = parseInt(path[1]);
    }
    this.update(this.zipCode);
  }

  onSubmit() {
    this.location.go(`/${this.enteredZip}`);
    this.update(parseInt(this.enteredZip!));
    this.enteredZip = '';
  }

  async update(zipCode: number | undefined) {
    if (!zipCode) return;
    this.weatherInfo.set(await this.weatherService.getWeather(zipCode));
  }
}
