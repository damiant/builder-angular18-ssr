export interface WeatherInfo {
    title: string,
    days: DaysWeather[]
}

export interface DaysWeather {
    day: string,
    forecasts: WeatherForecast[];
}

export interface WeatherForecast {
    time: string;
    temperature: number;
    description: string;
    icon: string;
}