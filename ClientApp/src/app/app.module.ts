import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ProductSectionModule } from './components/product-section.module';

import { AppComponent } from './app.component';
import { TopBarComponent } from './components/top-bar.component';
import { NotFoundComponent } from './components/not-found.component';
import { ProductSectionComponent } from './components/product-section.component';

@NgModule({
    imports: [ 
        BrowserModule, 
        FormsModule, 
        ProductSectionModule,
        RouterModule.forRoot([
            { path: '', component: ProductSectionComponent },
            { path: '**', component: NotFoundComponent }
        ]) 
    ],
    declarations: [ 
        AppComponent, 
        TopBarComponent
    ],
    bootstrap: [ 
        AppComponent
    ]
})
export class AppModule { }