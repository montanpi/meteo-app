import { DateTime } from 'luxon'

export function formatToLocalTime(seconds: number, zone: string, format = 'T'): string {
  return DateTime.fromSeconds(seconds).setZone(zone).toFormat(format)
}

export function formatLatitude(latitude: number): string {
  const abs = Math.abs(latitude)
  return latitude > 0 ? `${abs.toFixed(2)}N` : `${abs.toFixed(2)}S`
}

export function formatLongitude(longitude: number): string {
  const abs = Math.abs(longitude)
  return longitude > 0 ? `${abs.toFixed(2)}E` : `${abs.toFixed(2)}W`
}
