import { WeatherData } from 'src/app/modules/weather/types/weather-data'

export interface WeatherProvider {
  name: string
  getWeatherData(latitude: number, longitude: number): Promise<WeatherData>
}
