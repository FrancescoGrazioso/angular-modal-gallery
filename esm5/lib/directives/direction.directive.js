/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/*
 The MIT License (MIT)

 Copyright (c) 2017-2018 Francesco Grazioso (fg96)

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.
 */
import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';
/**
 * Directive to change the flex-direction of an element, based on two inputs (`direction` and `justify`).
 */
var DirectionDirective = /** @class */ (function () {
    function DirectionDirective(renderer, el) {
        this.renderer = renderer;
        this.el = el;
    }
    /**
     * Method ´ngOnInit´ to apply the style of this directive.
     * This is an Angular's lifecycle hook, so its called automatically by Angular itself.
     * In particular, it's called only one time!!!
     */
    /**
     * Method ´ngOnInit´ to apply the style of this directive.
     * This is an Angular's lifecycle hook, so its called automatically by Angular itself.
     * In particular, it's called only one time!!!
     * @return {?}
     */
    DirectionDirective.prototype.ngOnInit = /**
     * Method ´ngOnInit´ to apply the style of this directive.
     * This is an Angular's lifecycle hook, so its called automatically by Angular itself.
     * In particular, it's called only one time!!!
     * @return {?}
     */
    function () {
        this.applyStyle();
    };
    /**
     * Method ´ngOnChanges´ to apply the style of this directive.
     * This is an Angular's lifecycle hook, so its called automatically by Angular itself.
     * In particular, it's called when any data-bound property of a directive changes!!!
     */
    /**
     * Method ´ngOnChanges´ to apply the style of this directive.
     * This is an Angular's lifecycle hook, so its called automatically by Angular itself.
     * In particular, it's called when any data-bound property of a directive changes!!!
     * @return {?}
     */
    DirectionDirective.prototype.ngOnChanges = /**
     * Method ´ngOnChanges´ to apply the style of this directive.
     * This is an Angular's lifecycle hook, so its called automatically by Angular itself.
     * In particular, it's called when any data-bound property of a directive changes!!!
     * @return {?}
     */
    function () {
        this.applyStyle();
    };
    /**
     * Private method to change both direction and justify of an element.
     * @return {?}
     */
    DirectionDirective.prototype.applyStyle = /**
     * Private method to change both direction and justify of an element.
     * @return {?}
     */
    function () {
        if (!this.direction || !this.justify) {
            return;
        }
        this.renderer.setStyle(this.el.nativeElement, 'flex-direction', this.direction);
        this.renderer.setStyle(this.el.nativeElement, 'justify-content', this.justify);
    };
    DirectionDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[fgDirection]'
                },] }
    ];
    /** @nocollapse */
    DirectionDirective.ctorParameters = function () { return [
        { type: Renderer2 },
        { type: ElementRef }
    ]; };
    DirectionDirective.propDecorators = {
        direction: [{ type: Input }],
        justify: [{ type: Input }]
    };
    return DirectionDirective;
}());
export { DirectionDirective };
if (false) {
    /**
     * String input to set the css flex-direction of an element.
     * @type {?}
     */
    DirectionDirective.prototype.direction;
    /**
     * String input to set the css justify-content of an element.
     * @type {?}
     */
    DirectionDirective.prototype.justify;
    /** @type {?} */
    DirectionDirective.prototype.renderer;
    /** @type {?} */
    DirectionDirective.prototype.el;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlyZWN0aW9uLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL21vZGFsLWFuZ3VsYXItZ2FsbGVyeS8iLCJzb3VyY2VzIjpbImxpYi9kaXJlY3RpdmVzL2RpcmVjdGlvbi5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBd0JBLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBcUIsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7OztJQWtCekYsNEJBQW9CLFFBQW1CLEVBQVUsRUFBYztRQUEzQyxhQUFRLEdBQVIsUUFBUSxDQUFXO1FBQVUsT0FBRSxHQUFGLEVBQUUsQ0FBWTtLQUFJO0lBRW5FOzs7O09BSUc7Ozs7Ozs7SUFDSCxxQ0FBUTs7Ozs7O0lBQVI7UUFDRSxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7S0FDbkI7SUFFRDs7OztPQUlHOzs7Ozs7O0lBQ0gsd0NBQVc7Ozs7OztJQUFYO1FBQ0UsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0tBQ25COzs7OztJQUtPLHVDQUFVOzs7OztRQUNoQixJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsSUFBSSxDQUFDLElBQUfgQ0FBQyxPQUFPLEVBQUU7WUFDcEMsT0FBTztTQUNSO1FBQ0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLEVBQUUsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ2hGLElBQUfgQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUfgQ0FBQyxFQUFFLENBQUMsYUFBYSxFQUFFLGlCQUFpQixFQUFFLElBQUfgQ0FBQyxPQUFPLENBQUMsQ0FBQzs7O2dCQXpDbEYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxlQUFlO2lCQUMxQjs7OztnQkFQeUQsU0FBUztnQkFBL0MsVUFBVTs7OzRCQVkzQixLQUFLOzBCQUlMLEtBQUs7OzZCQXhDUjs7U0FnQ2Esa0JBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiBUaGUgTUlUIExpY2Vuc2UgKE1JVClcblxuIENvcHlyaWdodCAoYykgMjAxNy0yMDE4IFN0ZWZhbm8gQ2FwcGEgKEtzODkpXG5cbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwifgwgdG8gZGVhbFxuIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbiB0byB1c2UsIGNvcHfgIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcblxuIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIGFsbFxuIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG5cbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFfgXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTiBJTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiBMSUFCSUxJVFfgIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFXG4gU09GVFdBUkUuXG4gKi9cblxuaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBJbnB1dCwgT25DaGFuZ2VzLCBPbkluaXQsIFJlbmRlcmVyMiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG4vKipcbiAqIERpcmVjdGl2ZSB0byBjaGFuZ2UgdGhlIGZsZXgtZGlyZWN0aW9uIG9mIGFuIGVsZW1lbnQsIGJhc2VkIG9uIHR3byBpbnB1dHMgKGBkaXJlY3Rpb25gIGFuZCBganVzdGlmeWApLlxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdba3NEaXJlY3Rpb25dJ1xufSlcbmV4cG9ydCBjbGFzcyBEaXJlY3Rpb25EaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcyB7XG4gIC8qKlxuICAgKiBTdHJpbmcgaW5wdXQgdG8gc2V0IHRoZSBjc3MgZmxleC1kaXJlY3Rpb24gb2YgYW4gZWxlbWVudC5cbiAgICovXG4gIEBJbnB1dCgpIGRpcmVjdGlvbjogc3RyaW5nO1xuICAvKipcbiAgICogU3RyaW5nIGlucHV0IHRvIHNldCB0aGUgY3NzIGp1c3RpZnktY29udGVudCBvZiBhbiBlbGVtZW50LlxuICAgKi9cbiAgQElucHV0KCkganVzdGlmeTogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMiwgcHJpdmF0ZSBlbDogRWxlbWVudFJlZikge31cblxuICAvKipcbiAgICogTWV0aG9kIMK0bmdPbkluaXTCtCB0byBhcHBseSB0aGUgc3R5bGUgb2YgdGhpcyBkaXJlY3RpdmUuXG4gICAqIFRoaXMgaXMgYW4gQW5ndWxhcidzIGxpZmVjeWNsZSBob29rLCBzbyBpdHMgY2FsbGVkIGF1dG9tYXRpY2FsbHkgYnkgQW5ndWxhciBpdHNlbGYuXG4gICAqIEluIHBhcnRpY3VsYXIsIGl0J3MgY2FsbGVkIG9ubHkgb25lIHRpbWUhISFcbiAgICovXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuYXBwbHlTdHlsZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIE1ldGhvZCDCtG5nT25DaGFuZ2VzwrQgdG8gYXBwbHkgdGhlIHN0eWxlIG9mIHRoaXMgZGlyZWN0aXZlLlxuICAgKiBUaGlzIGlzIGFuIEFuZ3VsYXIncyBsaWZlY3ljbGUgaG9vaywgc28gaXRzIGNhbGxlZCBhdXRvbWF0aWNhbGx5IGJ5IEFuZ3VsYXIgaXRzZWxmLlxuICAgKiBJbiBwYXJ0aWN1bGFyLCBpdCdzIGNhbGxlZCB3aGVuIGFueSBkYXRhLWJvdW5kIHByb3BlcnR5IG9mIGEgZGlyZWN0aXZlIGNoYW5nZXMhISFcbiAgICovXG4gIG5nT25DaGFuZ2VzKCkge1xuICAgIHRoaXMuYXBwbHlTdHlsZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFByaXZhdGUgbWV0aG9kIHRvIGNoYW5nZSBib3RoIGRpcmVjdGlvbiBhbmQganVzdGlmeSBvZiBhbiBlbGVtZW50LlxuICAgKi9cbiAgcHJpdmF0ZSBhcHBseVN0eWxlKCkge1xuICAgIGlmICghdGhpcy5kaXJlY3Rpb24gfHwgIXRoaXMuanVzdGlmeSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ2ZsZXgtZGlyZWN0aW9uJywgdGhpcy5kaXJlY3Rpb24pO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbC5uYXRpdmVFbGVtZW50LCAnanVzdGlmeS1jb250ZW50JywgdGhpcy5qdXN0aWZ5KTtcbiAgfVxufVxuIl19