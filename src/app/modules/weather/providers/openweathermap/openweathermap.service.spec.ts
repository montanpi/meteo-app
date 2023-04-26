import { TestBed } from '@angular/core/testing'
import { OpenweathermapService } from 'src/app/modules/weather/providers/openweathermap/openweathermap.service'

describe('OpenMeteoService', () => {
  let service: OpenweathermapService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(OpenweathermapService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
