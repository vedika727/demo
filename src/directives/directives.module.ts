import { NgModule } from '@angular/core';
import { HideHeaderDirective } from './hide-header/hide-header';
import { SwapSegmentDirective } from './swap-segment/swap-segment';
@NgModule({
	declarations: [HideHeaderDirective,
    SwapSegmentDirective],
	imports: [],
	exports: [HideHeaderDirective,
    SwapSegmentDirective]
})
export class DirectivesModule {}
