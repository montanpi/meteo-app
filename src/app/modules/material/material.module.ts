import { NgModule } from '@angular/core'
import { MatAutocompleteModule } from '@angular/material/autocomplete'
import { MatInputModule } from '@angular/material/input'
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'
import { MatSelectModule } from '@angular/material/select'

@NgModule({
  declarations: [],
  exports: [MatAutocompleteModule, MatInputModule, MatIconModule, MatButtonModule, MatSelectModule],
})
export class MaterialModule {}
