import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { firstValueFrom } from 'rxjs'
import { NOT_AVAILABLE } from 'src/app/modules/weather/shared'
import { formatToLocalTime } from 'src/app/modules/weather/shared/util'
import { OpenMeteoWeatherData } from 'src/app/modules/weather/providers/open-meteo/open-meteo-weather-data'
import { WeatherData } from 'src/app/modules/weather/types/weather-data'
import { WeatherProvider } from 'src/app/modules/weather/types/weather-provider'
import { DateTime } from 'luxon'

const baseApiUrl =
  'https://api.open-meteo.com/v1/forecast?hourly=temperature_2m,weathercode&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset&current_weather=true&timezone=auto&timeformat=unixtime'

@Injectable({
  providedIn: 'root',
})
export class OpenMeteoService implements WeatherProvider {
  name = 'open-meteo'

  constructor(private readonly httpClient: HttpClient) {}

  async getWeatherData(latitude: number, longitude: number): Promise<WeatherData> {
    const openMeteoWeatherData = await firstValueFrom(
      this.httpClient.get<OpenMeteoWeatherData>(`${baseApiUrl}&latitude=${latitude}&longitude=${longitude}`),
    )
    return weatherDataAdapter(openMeteoWeatherData)
  }
}

function weatherDataAdapter(openMeteoWeatherData: OpenMeteoWeatherData): WeatherData {
  const {
    latitude,
    longitude,
    timezone,
    elevation,
    current_weather: { weathercode, temperature, windspeed, winddirection, is_day },
    daily,
    hourly,
  } = openMeteoWeatherData
  const offset = Number(DateTime.now().setZone(timezone).toFormat('H'))
  const adapted: WeatherData = {
    latitude: latitude.toFixed(2),
    longitude: longitude.toFixed(2),
    timezone,
    elevation: elevation.toFixed(),
    current: {
      chanceOfRain: NOT_AVAILABLE,
      feelLike: NOT_AVAILABLE,
      humidity: NOT_AVAILABLE,
      pressure: NOT_AVAILABLE,
      sunrise: formatToLocalTime(daily.sunrise[0], timezone),
      sunset: formatToLocalTime(daily.sunset[0], timezone),
      temperature: temperature.toFixed(),
      weather: weatherFrom[weathercode],
      weatherImageUrl: imageUrlFrom(weathercode, is_day),
      windDirection: winddirection.toFixed(),
      windSpeed: windspeed.toFixed(),
    },
    daily: Array.from(new Array(5), (_, i) => ({
      max: daily.temperature_2m_max[i].toFixed(),
      min: daily.temperature_2m_min[i].toFixed(),
      weekDay: formatToLocalTime(daily.time[i], timezone, 'cccc'),
      weather: weatherFrom[daily.weathercode[i]],
    })),
    hourly: Array.from(new Array(24), (_, i) => ({
      temperature: hourly.temperature_2m[i + offset].toFixed(),
      time: formatToLocalTime(hourly.time[i + offset], timezone),
      weatherImageUrl: imageUrlFrom(hourly.weathercode[i + offset], is_day),
    })),
  }
  return adapted
}

// https://open-meteo.com/en/docs
const weatherFrom: { [key: number]: string } = {
  0: 'Clear sky',
  1: 'Mainly clear',
  2: 'Partly cloudy',
  3: 'Overcast',
  45: 'Fog',
  48: 'Depositing rime fog',
  51: 'Light drizzle',
  53: 'Moderate drizzle',
  55: 'Dense drizzle',
  56: 'Light freezing drizzle',
  57: 'Dense freezing drizzle',
  61: 'Slight rain',
  63: 'Moderate rain',
  65: 'Heavy rain',
  66: 'Freezing rain',
  67: 'Heavy freezing rain',
  71: 'Snow',
  73: 'Moderate snow',
  75: 'Heavy snow',
  77: 'Snow grains',
  80: 'Rain showers',
  81: 'Moderate rain showers',
  82: 'Violent rain showers',
  85: 'Snow showers',
  86: 'Heavy snow showers',
  95: 'Thunderstorm',
  96: 'Thunderstorm with slight hail',
  99: 'Thunderstorm with heavy hail',
}

function imageUrlFrom(weathercode: number, is_day: number): string {
  return `https://openweathermap.org/img/wn/${iconFrom[weathercode]}${is_day ? 'd' : 'n'}.png`
}

// https://open-meteo.com/en/docs
const iconFrom: { [key: number]: string } = {
  0: '01',
  1: '02',
  2: '03',
  3: '04',
  45: '50',
  48: '50',
  51: '09',
  53: '09',
  55: '09',
  56: '13',
  57: '13',
  61: '10',
  63: '10',
  65: '10',
  66: '13',
  67: '13',
  71: '13',
  73: '13',
  75: '13',
  77: '13',
  80: '09',
  81: '09',
  82: '09',
  85: '13',
  86: '13',
  95: '11',
  96: '11',
  99: '11',
}
