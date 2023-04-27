import { WeatherData } from 'src/app/modules/weather/types/weather-data'
import { WeatherProvider } from '../types/weather-provider'
import { WeatherFacadeService } from 'src/app/modules/weather/weather-facade/weather-facade.service'

export const mockWeatherData: WeatherData = {
  latitude: '43.05',
  longitude: '12.55',
  timezone: 'Europe/Rome',
  elevation: '199.0',
  current: {
    temperature: '15', // deg C
    weather: '100',
    weatherImageUrl: 'https://openweathermap.org/img/wn/01d.png',
    sunrise: '06:00', // in local time, hh:mm
    sunset: '20:00', // in local time, hh:mm
    feelLike: '14.0', // deg C
    chanceOfRain: '42', // %
    windSpeed: '3.4', // km/h
    windDirection: '360', // deg
    humidity: '34', // %
    pressure: '100', // hPa
  },
  daily: [
    {
      weekDay: 'Monday',
      min: '10',
      max: '20',
      weather: '100',
      weatherImageUrl: 'weatherImageUrl',
    },
  ],
  hourly: [
    {
      time: '20:00',
      temperature: '20',
      weatherImageUrl: '100',
    },
  ],
}

export class MockWeatherProvider implements WeatherProvider {
  name = 'mock'
  async getWeatherData(): Promise<WeatherData> {
    return mockWeatherData
  }
}

export class MockWeatherFacade implements Partial<WeatherFacadeService> {}
