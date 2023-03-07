import { NgModule } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field'
import {MatButtonModule} from '@angular/material/button'
import {MatInputModule} from '@angular/material/input'
import {MatToolbarModule} from '@angular/material/toolbar'



const importExport= [MatFormFieldModule,MatButtonModule,
                      MatInputModule, MatToolbarModule];

@NgModule({
  declarations: [],
  imports: importExport,
  exports: importExport

})
export class CrmMaterialModule { }
