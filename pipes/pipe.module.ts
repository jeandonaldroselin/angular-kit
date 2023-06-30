import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccessTokenPipe } from './access-token.pipe';
import { FormatStringPipe } from './format-string.pipe';
import { FormatObjectPipe } from './format-object.pipe';

@NgModule({
  declarations: [
    AccessTokenPipe,
    FormatStringPipe,
    FormatObjectPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AccessTokenPipe,
    FormatStringPipe,
    FormatObjectPipe
  ]
})
export class PipeModule { }
