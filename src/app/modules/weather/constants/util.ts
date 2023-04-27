import { DateTime } from 'luxon'

export function formatToLocalTime(seconds: number, zone: string, format = DateTime.TIME_24_SIMPLE): string {
  return DateTime.fromSeconds(seconds).setZone(zone).toLocaleString(format)
}
