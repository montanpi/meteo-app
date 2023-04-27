interface OpenMeteoCurrentWeather {
  temperature: number
  windspeed: number
  winddirection: number
  weathercode: number
  is_day: number
  time: number
}

interface OpenMeteoHourlyUnits {
  time: string
  temperature_2m: string
  weathercode: string
}

interface OpenMeteoHourly {
  time: number[]
  temperature_2m: number[]
  weathercode: number[]
}

interface OpenMeteoDailyUnits {
  time: string
  weathercode: string
  temperature_2m_max: string
  temperature_2m_min: string
  sunrise: string
  sunset: string
}

interface OpenMeteoDaily {
  time: number[]
  weathercode: number[]
  temperature_2m_max: number[]
  temperature_2m_min: number[]
  sunrise: number[]
  sunset: number[]
}

export interface OpenMeteoWeatherData {
  latitude: number
  longitude: number
  generationtime_ms: number
  utc_offset_seconds: number
  timezone: string
  timezone_abbreviation: string
  elevation: number
  current_weather: OpenMeteoCurrentWeather
  hourly_units: OpenMeteoHourlyUnits
  hourly: OpenMeteoHourly
  daily_units: OpenMeteoDailyUnits
  daily: OpenMeteoDaily
}
