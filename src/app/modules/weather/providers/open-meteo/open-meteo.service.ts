import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { firstValueFrom } from 'rxjs'
import { NOT_AVAILABLE } from 'src/app/modules/weather/shared'
import { formatLatitude, formatLongitude, formatToLocalTime } from 'src/app/modules/weather/shared'
import { OpenMeteoWeatherData } from 'src/app/modules/weather/providers/open-meteo/open-meteo-weather-data'
import { WeatherData } from 'src/app/modules/weather/types'
import { WeatherProvider } from 'src/app/modules/weather/types'
import { DateTime } from 'luxon'

const apiUrl =
  'https://api.open-meteo.com/v1/forecast?hourly=temperature_2m,weathercode&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset&current_weather=true&timezone=auto&timeformat=unixtime'

@Injectable({
  providedIn: 'root',
})
export class OpenMeteoService implements WeatherProvider {
  name = 'open-meteo'

  constructor(private readonly httpClient: HttpClient) {}

  async getWeatherData(latitude: number, longitude: number): Promise<WeatherData> {
    const openMeteoWeatherData = await firstValueFrom(
      this.httpClient.get<OpenMeteoWeatherData>(`${apiUrl}&latitude=${latitude}&longitude=${longitude}`),
    )
    return weatherDataAdapter(openMeteoWeatherData)
  }
}

// https://open-meteo.com/en/docs
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
    latitude: formatLatitude(latitude),
    longitude: formatLongitude(longitude),
    timezone,
    // ideally units of measurement like meters, degrees, etc. would be formatted by pipes, not by the adapter
    elevation: `${elevation.toFixed()} m`,
    current: {
      chanceOfRain: NOT_AVAILABLE,
      feelsLike: NOT_AVAILABLE,
      humidity: NOT_AVAILABLE,
      pressure: NOT_AVAILABLE,
      sunrise: formatToLocalTime(daily.sunrise[0], timezone),
      sunset: formatToLocalTime(daily.sunset[0], timezone),
      temperature: `${temperature.toFixed()}°C`,
      weather: weatherFrom[weathercode],
      weatherImageUrl: imageUrlFrom(weathercode, !!is_day),
      windDirection: `${winddirection.toFixed()}°`,
      windSpeed: `${windspeed.toFixed()} km/h`,
    },
    daily: Array.from(new Array(5), (_, i) => ({
      max: `${daily.temperature_2m_max[i].toFixed()}°C`,
      min: `${daily.temperature_2m_min[i].toFixed()}°C`,
      weekDay: formatToLocalTime(daily.time[i], timezone, 'cccc'),
      weather: weatherFrom[daily.weathercode[i]],
      weatherImageUrl: imageUrlFrom(daily.weathercode[i], true),
    })),
    hourly: Array.from(new Array(24), (_, i) => ({
      temperature: `${hourly.temperature_2m[i + offset].toFixed()}°C`,
      time: formatToLocalTime(hourly.time[i + offset], timezone),
      weatherImageUrl: imageUrlFrom(hourly.weathercode[i + offset], isDay(daily.sunrise, hourly.time[i + offset], daily.sunset, timezone)),
    })),
  }
  return adapted
}

// https://open-meteo.com/en/docs WMO Weather interpretation codes (WW)
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

/**
 *      hourly
 *      |
 * |-------|----------|-------|-------|----------|-------|
 * |       sunrise1   sunset1 |       sunrise2   sunset2 |
 * 00:00                      00:00                      00:00
 * hourly timestamps from 00:00 to 23:00
 */
/**
 * isDay takes as input sunrise and sunset timestamps and checks if the hourly timestamp is within the daytime
 * @param sunrises number[]
 * @param hourly number[]
 * @param sunsets number[]
 * @param timezone string
 * @returns boolean
 */
function isDay(sunrises: number[], hourly: number, sunsets: number[], timezone: string): boolean {
  const hourlyTs = DateTime.fromSeconds(hourly).setZone(timezone).valueOf()
  const sunrise1Ts = DateTime.fromSeconds(sunrises[0]).setZone(timezone).valueOf()
  const sunset1Ts = DateTime.fromSeconds(sunsets[0]).setZone(timezone).valueOf()
  const sunrise2Ts = DateTime.fromSeconds(sunrises[1]).setZone(timezone).valueOf()
  const sunset2Ts = DateTime.fromSeconds(sunsets[1]).setZone(timezone).valueOf()
  return (sunrise1Ts < hourlyTs && hourlyTs < sunset1Ts) || (sunrise2Ts < hourlyTs && hourlyTs < sunset2Ts)
}

// https://openweathermap.org/weather-conditions
function imageUrlFrom(weathercode: number, is_day: boolean): string {
  return `https://openweathermap.org/img/wn/${iconFrom[weathercode]}${is_day ? 'd' : 'n'}.png`
}

// matches open-meteo weather codes to openweathermap icons
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
