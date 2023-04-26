import { TestBed } from '@angular/core/testing'

import { WeatherFacadeService } from './weather-facade.service'
import { WEATHER_PROVIDER, MockWeatherProvider } from '../constants'

describe('WeatherFacadeService', () => {
  let service: WeatherFacadeService

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        WeatherFacadeService,
        {
          provide: WEATHER_PROVIDER,
          useClass: MockWeatherProvider,
        },
      ],
    })
    service = TestBed.inject(WeatherFacadeService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
