interface OpenweathermapWeather {
  id: number
  main: string
  description: string
  icon: string
}

interface OpenweathermapHourly {
  dt: number
  temp: number
  feels_like: number
  pressure: number
  humidity: number
  dew_point: number
  uvi: number
  clouds: number
  visibility: number
  wind_speed: number
  wind_deg: number
  wind_gust: number
  weather: OpenweathermapWeather[]
  pop: number
}

interface OpenweathermapDailyTemp {
  day: number
  min: number
  max: number
  night: number
  eve: number
  morn: number
}

interface OpenweathermapDailyFeelsLike {
  day: number
  night: number
  eve: number
  morn: number
}

interface OpenweathermapDaily {
  dt: number
  sunrise: number
  sunset: number
  moonrise: number
  moonset: number
  moon_phase: number
  temp: OpenweathermapDailyTemp
  feels_like: OpenweathermapDailyFeelsLike
  pressure: number
  humidity: number
  dew_point: number
  wind_speed: number
  wind_deg: number
  wind_gust: number
  weather: OpenweathermapWeather[]
  clouds: number
  pop: number
  uvi: number
}

interface OpenweathermapCurrent {
  dt: number
  sunrise: number
  sunset: number
  temp: number
  feels_like: number
  pressure: number
  humidity: number
  dew_point: number
  uvi: number
  clouds: number
  visibility: number
  wind_speed: number
  wind_deg: number
  weather: OpenweathermapWeather[]
}

export interface OpenweathermapWeatherData {
  lat: number
  lon: number
  timezone: string
  timezone_offset: number
  current: OpenweathermapCurrent
  hourly: OpenweathermapHourly[]
  daily: OpenweathermapDaily[]
}
