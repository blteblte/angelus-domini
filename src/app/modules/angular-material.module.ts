import { NgModule } from '@angular/core';
import {
    MatButtonModule
  , MatCheckboxModule
  , MatGridListModule
  , MatMenuModule
  , MatIconModule
  , MatTabsModule
  , MatProgressSpinnerModule
  , MatListModule
  , MatTooltipModule
  , MatCardModule
} from '@angular/material';

@NgModule({
  imports: [
      MatButtonModule
    , MatCheckboxModule
    , MatGridListModule
    , MatMenuModule
    , MatIconModule
    , MatTabsModule
    , MatProgressSpinnerModule
    , MatListModule
    , MatTooltipModule
    , MatCardModule
  ],
  exports: [
      MatButtonModule
    , MatCheckboxModule
    , MatGridListModule
    , MatMenuModule
    , MatIconModule
    , MatTabsModule
    , MatProgressSpinnerModule
    , MatListModule
    , MatTooltipModule
    , MatCardModule
  ]
})
export class AngularMaterialModule { }
