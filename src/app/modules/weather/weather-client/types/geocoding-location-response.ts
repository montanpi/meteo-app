import { GeocodingLocation } from 'src/app/modules/weather/weather-client/types'

export interface GeocodingLocationResponse {
  results: GeocodingLocation[]
  generationtime_ms: number
}
