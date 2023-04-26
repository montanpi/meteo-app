import { ComponentFixture, TestBed } from '@angular/core/testing'

import { WeatherClientComponent } from './weather-client.component'
import { WeatherFacadeService } from 'src/app/modules/weather/weather-facade/weather-facade.service'
import { MockWeatherFacade } from 'src/app/modules/weather/constants'
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'

describe('WeatherClientComponent', () => {
  let component: WeatherClientComponent
  let fixture: ComponentFixture<WeatherClientComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WeatherClientComponent],
      providers: [
        {
          provide: WeatherFacadeService,
          useClass: MockWeatherFacade,
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents()

    fixture = TestBed.createComponent(WeatherClientComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
