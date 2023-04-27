import { ComponentFixture, TestBed } from '@angular/core/testing'

import { LocationSearchComponent } from './location-search.component'
import { HttpClient } from '@angular/common/http'
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'

describe('LocationSearchComponent', () => {
  let component: LocationSearchComponent
  let fixture: ComponentFixture<LocationSearchComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LocationSearchComponent],
      providers: [
        {
          provide: HttpClient,
          useValue: {},
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents()

    fixture = TestBed.createComponent(LocationSearchComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
