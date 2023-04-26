import { WeatherData } from 'src/app/modules/weather/types/weather-data'
import { WeatherProvider } from '../types/weather-provider'
import { WeatherFacadeService } from 'src/app/modules/weather/weather-facade/weather-facade.service'

export const mockWeatherData: WeatherData = {
  latitude: '43.05',
  longitude: '12.55',
  timezone: 'Europe/Rome',
  timezoneAbbreviation: 'CEST',
  elevation: '199.0',
  current: {
    temperature: '15', // deg C
    weatherCode: '100',
    sunrise: new Date(1682482275000), // in local time, unix ms
    sunset: new Date(1682482275000), // in local time, unix ms
    feelLike: '14.0', // deg C
    chanceOfRain: '42', // %
    windSpeed: '3.4', // km/h
    windDirection: '360', // deg
    humidity: '34', // %
    pressure: '100', // hPa
  },
  daily: [
    {
      min: '10',
      max: '20',
      weatherCode: '100',
    },
  ],
  hourly: [
    {
      temperature: '20',
      weatherCode: '100',
    },
  ],
}

export class MockWeatherProvider implements WeatherProvider {
  name = 'mock'
  getWeatherData() {
    return mockWeatherData
  }
}

export class MockWeatherFacade implements Partial<WeatherFacadeService> {}
