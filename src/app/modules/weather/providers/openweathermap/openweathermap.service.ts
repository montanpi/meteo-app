import { Injectable } from '@angular/core'
import { mockWeatherData } from 'src/app/modules/weather/constants'
import { WeatherData } from 'src/app/modules/weather/types/weather-data'
import { WeatherProvider } from 'src/app/modules/weather/types/weather-provider'

@Injectable({
  providedIn: 'root',
})
export class OpenweathermapService implements WeatherProvider {
  name = 'openweathermap'

  getWeatherData(): WeatherData {
    return mockWeatherData
  }
}
