import { NgModule } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field'
import {MatButtonModule} from '@angular/material/button'
import {MatInputModule} from '@angular/material/input'
import {MatToolbarModule} from '@angular/material/toolbar'
import {MatIconModule} from '@angular/material/icon'
import {MatTooltipModule} from '@angular/material/tooltip'

const importExport= [MatFormFieldModule,MatButtonModule,
                      MatInputModule, MatToolbarModule,
                      MatTooltipModule, MatIconModule];

@NgModule({
  declarations: [],
  imports: importExport,
  exports: importExport

})
export class CrmMaterialModule { }
