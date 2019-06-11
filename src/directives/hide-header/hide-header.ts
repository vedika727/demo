import { Input, OnInit } from "@angular/core";
import { Directive, Renderer, ElementRef } from "@angular/core";

/**
 * Generated class for the HideHeaderDirective directive.
 *
 * See https://angular.io/api/core/Directive for more info on Angular
 * Directives.
 */
@Directive({
  selector: "[hide-header]", // Attribute selector
  host: {
    "(ionScroll)": "onContentScroll($event)"
  }
})
export class HideHeaderDirective implements OnInit {
  @Input("header")
  header: HTMLElement;

  headerHeight;


  constructor(public elementRef: ElementRef, public renderer: Renderer) {
    console.log("Hello HideHeaderDirective Directive");
  }

  ngOnInit() {
    this.headerHeight = this.header.clientHeight;
    this.renderer.setElementStyle(this.header, "webkitTransition", "top 0ms");
  }

  onContentScroll(event) {
    let val:string = (-event.scrollTop)+ "px";
    console.log('-------',val);
    this.renderer.setElementStyle(this.header, "top", val);
  }
}
