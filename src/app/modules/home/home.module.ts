import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule, Routes } from '@angular/router';
import { CardModule, GridModule, SharedModule, WidgetModule } from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { DocsComponentsModule } from '@docs-components/docs-components.module';

const routes: Routes = [
  {path:'',component: HomeComponent}
];


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    GridModule,
    IconModule,
    SharedModule,
    CardModule,
    DocsComponentsModule,
    WidgetModule,

  ]
})
export class HomeModule { }
