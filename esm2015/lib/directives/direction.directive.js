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
export class DirectionDirective {
    /**
     * @param {?} renderer
     * @param {?} el
     */
    constructor(renderer, el) {
        this.renderer = renderer;
        this.el = el;
    }
    /**
     * Method ´ngOnInit´ to apply the style of this directive.
     * This is an Angular's lifecycle hook, so its called automatically by Angular itself.
     * In particular, it's called only one time!!!
     * @return {?}
     */
    ngOnInit() {
        this.applyStyle();
    }
    /**
     * Method ´ngOnChanges´ to apply the style of this directive.
     * This is an Angular's lifecycle hook, so its called automatically by Angular itself.
     * In particular, it's called when any data-bound property of a directive changes!!!
     * @return {?}
     */
    ngOnChanges() {
        this.applyStyle();
    }
    /**
     * Private method to change both direction and justify of an element.
     * @return {?}
     */
    applyStyle() {
        if (!this.direction || !this.justify) {
            return;
        }
        this.renderer.setStyle(this.el.nativeElement, 'flex-direction', this.direction);
        this.renderer.setStyle(this.el.nativeElement, 'justify-content', this.justify);
    }
}
DirectionDirective.decorators = [
    { type: Directive, args: [{
                selector: '[fgDirection]'
            },] }
];
/** @nocollapse */
DirectionDirective.ctorParameters = () => [
    { type: Renderer2 },
    { type: ElementRef }
];
DirectionDirective.propDecorators = {
    direction: [{ type: Input }],
    justify: [{ type: Input }]
};
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlyZWN0aW9uLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL21vZGFsLWFuZ3VsYXItZ2FsbGVyeS8iLCJzb3VyY2VzIjpbImxpYi9kaXJlY3RpdmVzL2RpcmVjdGlvbi5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBd0JBLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBcUIsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7O0FBUTNGLE1BQU07Ozs7O0lBVUosWUFBb0IsUUFBbUIsRUFBVSxFQUFjO1FBQTNDLGFBQVEsR0FBUixRQUFRLENBQVc7UUFBVSxPQUFFLEdBQUYsRUFBRSxDQUFZO0tBQUk7Ozs7Ozs7SUFPbkUsUUFBUTtRQUNOLElBQUfgQ0FBQyxVQUFVLEVBQUUsQ0FBQztLQUNuQjs7Ozs7OztJQU9ELFdBQVc7UUFDVCxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7S0FDbkI7Ozs7O0lBS08sVUFBVTtRQUNoQixJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsSUFBSSxDQUFDLElBQUfgQ0FBQyxPQUFPLEVBQUU7WUFDcEMsT0FBTztTQUNSO1FBQ0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLEVBQUUsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ2hGLElBQUfgQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUfgQ0FBQyxFQUFFLENBQUMsYUFBYSxFQUFFLGlCQUFpQixFQUFFLElBQUfgQ0FBQyxPQUFPLENBQUMsQ0FBQzs7OztZQXpDbEYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxlQUFlO2FBQzFCOzs7O1lBUHlELFNBQVM7WUFBL0MsVUFBVTs7O3dCQVkzQixLQUFLO3NCQUlMLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuIFRoZSBNSVQgTGljZW5zZSAoTUlUKVxuXG4gQ29weXJpZ2h0IChjfgAyMDE3LTIwMTggU3RlZmFubyBDYXBwYSAoS3M4OSlcblxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbiBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuXG4gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsXG4gY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cblxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OIElORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEVcbiBTT0ZUV0FSRS5cbiAqL1xuXG5pbXBvcnQgeyBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIElucHV0LCBPbkNoYW5nZXMsIE9uSW5pdCwgUmVuZGVyZXIyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbi8qKlxuICogRGlyZWN0aXZlIHRvIGNoYW5nZSB0aGUgZmxleC1kaXJlY3Rpb24gb2YgYW4gZWxlbWVudCwgYmFzZWQgb24gdHdvIGlucHV0cyAoYGRpcmVjdGlvbmAgYW5kIGBqdXN0aWZ5YCkuXG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1trc0RpcmVjdGlvbl0nXG59KVxuZXhwb3J0IGNsYXNzIERpcmVjdGlvbkRpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzIHtcbiAgLyoqXG4gICAqIFN0cmluZyBpbnB1dCB0byBzZXQgdGhlIGNzcyBmbGV4LWRpcmVjdGlvbiBvZiBhbiBlbGVtZW50LlxuICAgKi9cbiAgQElucHV0KCkgZGlyZWN0aW9uOiBzdHJpbmc7XG4gIC8qKlxuICAgKiBTdHJpbmcgaW5wdXQgdG8gc2V0IHRoZSBjc3MganVzdGlmeS1jb250ZW50IG9mIGFuIGVsZW1lbnQuXG4gICAqL1xuICBASW5wdXQofgBqdXN0aWZ5OiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLCBwcml2YXRlIGVsOiBFbGVtZW50UmVmfgB7fVxuXG4gIC8qKlxuICAgKiBNZXRob2QgwrRuZ09uSW5pdMK0IHRvIGFwcGx5IHRoZSBzdHlsZSBvZiB0aGlzIGRpcmVjdGl2ZS5cbiAgICogVGhpcyBpcyBhbiBBbmd1bGFyJ3MgbGlmZWN5Y2xlIGhvb2ssIHNvIGl0cyBjYWxsZWQgYXV0b21hdGljYWxseSBieSBBbmd1bGFyIGl0c2VsZi5cbiAgICogSW4gcGFydGljdWxhciwgaXQncyBjYWxsZWQgb25seSBvbmUgdGltZSEhIVxuICAgKi9cbiAgbmdPbkluaXQofgB7XG4gICAgdGhpcy5hcHBseVN0eWxlKCk7XG4gIH1cblxuICAvKipcbiAgICogTWV0aG9kIMK0bmdPbkNoYW5nZXPCtCB0byBhcHBseSB0aGUgc3R5bGUgb2YgdGhpcyBkaXJlY3RpdmUuXG4gICAqIFRoaXMgaXMgYW4gQW5ndWxhcidzIGxpZmVjeWNsZSBob29rLCBzbyBpdHMgY2FsbGVkIGF1dG9tYXRpY2FsbHkgYnkgQW5ndWxhciBpdHNlbGYuXG4gICAqIEluIHBhcnRpY3VsYXIsIGl0J3MgY2FsbGVkIHdoZW4gYW55IGRhdGEtYm91bmQgcHJvcGVydHkgb2YgYSBkaXJlY3RpdmUgY2hhbmdlcyEhIVxuICAgKi9cbiAgbmdPbkNoYW5nZXMofgB7XG4gICAgdGhpcy5hcHBseVN0eWxlKCk7XG4gIH1cblxuICAvKipcbiAgICogUHJpdmF0ZSBtZXRob2QgdG8gY2hhbmdlIGJvdGggZGlyZWN0aW9uIGFuZCBqdXN0aWZ5IG9mIGFuIGVsZW1lbnQuXG4gICAqL1xuICBwcml2YXRlIGFwcGx5U3R5bGUofgB7XG4gICAgaWYgKCF0aGlzLmRpcmVjdGlvbiB8fCAhdGhpcy5qdXN0aWZ5fgB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbC5uYXRpdmVFbGVtZW50LCAnZmxleC1kaXJlY3Rpb24nLCB0aGlzLmRpcmVjdGlvbik7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICdqdXN0aWZ5LWNvbnRlbnQnLCB0aGlzLmp1c3RpZnkpO1xuICB9XG59XG4iXX0=