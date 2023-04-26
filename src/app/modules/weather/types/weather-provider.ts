import { WeatherData } from 'src/app/modules/weather/types/weather-data'

export interface WeatherProvider {
  name: string
  // fetchWeatherData(coordinates: Coordinates): Promise<WeatherData>;
  getWeatherData(): WeatherData
}
