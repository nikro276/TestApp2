import { NgModule } from '@angular/core';
import { DxDateBoxModule, DxLookupModule, DxDataGridModule } from 'devextreme-angular';

import { ProductSectionComponent } from './product-section.component';

@NgModule({
    imports: [
        DxLookupModule,
        DxDateBoxModule,
        DxDataGridModule
    ],
    declarations: [
        ProductSectionComponent
    ],
    bootstrap: [ 
        ProductSectionComponent
    ]
})
export class ProductSectionModule{

}