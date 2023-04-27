import { DateTime } from 'luxon'

export function formatToLocalTime(seconds: number, zone: string, format = 'T'): string {
  return DateTime.fromSeconds(seconds).setZone(zone).toFormat(format)
}
