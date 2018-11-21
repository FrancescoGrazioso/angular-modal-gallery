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
 * Directive to customize the description.
 */
export class DescriptionDirective {
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
     * Private method to change description's style.
     * @return {?}
     */
    applyStyle() {
        if (!this.description) {
            return;
        }
        if (this.description.style) {
            this.renderer.setStyle(this.el.nativeElement, 'background', this.description.style.bgColor);
            this.renderer.setStyle(this.el.nativeElement, 'color', this.description.style.textColor);
            if (this.description.style.width) {
                this.renderer.setStyle(this.el.nativeElement, 'width', this.description.style.width);
            }
            if (this.description.style.height) {
                this.renderer.setStyle(this.el.nativeElement, 'height', this.description.style.height);
            }
            if (this.description.style.position) {
                this.renderer.setStyle(this.el.nativeElement, 'position', this.description.style.position);
            }
            if (this.description.style.top) {
                this.renderer.setStyle(this.el.nativeElement, 'top', this.description.style.top);
            }
            if (this.description.style.bottom) {
                this.renderer.setStyle(this.el.nativeElement, 'bottom', this.description.style.bottom);
            }
            if (this.description.style.left) {
                this.renderer.setStyle(this.el.nativeElement, 'left', this.description.style.left);
            }
            if (this.description.style.right) {
                this.renderer.setStyle(this.el.nativeElement, 'right', this.description.style.right);
            }
            this.renderer.setStyle(this.el.nativeElement, 'margin-top', this.description.style.marginTop ? this.description.style.marginTop : '0px');
            this.renderer.setStyle(this.el.nativeElement, 'margin-bottom', this.description.style.marginBottom ? this.description.style.marginBottom : '0px');
            this.renderer.setStyle(this.el.nativeElement, 'margin-left', this.description.style.marginLeft ? this.description.style.marginLeft : '0px');
            this.renderer.setStyle(this.el.nativeElement, 'margin-right', this.description.style.marginRight ? this.description.style.marginRight : '0px');
        }
    }
}
DescriptionDirective.decorators = [
    { type: Directive, args: [{
                selector: '[fgDescription]'
            },] }
];
/** @nocollapse */
DescriptionDirective.ctorParameters = () => [
    { type: Renderer2 },
    { type: ElementRef }
];
DescriptionDirective.propDecorators = {
    description: [{ type: Input }]
};
if (false) {
    /**
     * Object of type `Description` to resize the element.
     * @type {?}
     */
    DescriptionDirective.prototype.description;
    /** @type {?} */
    DescriptionDirective.prototype.renderer;
    /** @type {?} */
    DescriptionDirective.prototype.el;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVzY3JpcHRpb24uZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbW9kYWwtYW5ndWxhci1nYWxsZXJ5LyIsInNvdXJjZXMiOlsibGliL2RpcmVjdGl2ZXMvZGVzY3JpcHRpb24uZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXdCQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQXFCLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7OztBQVMzRixNQUFNOzs7OztJQU1KLFlBQW9CLFFBQW1CLEVBQVUsRUFBYztRQUEzQyxhQUFRLEdBQVIsUUFBUSxDQUFXO1FBQVUsT0FBRSxHQUFGLEVBQUUsQ0FBWTtLQUFJOzs7Ozs7O0lBT25FLFFBQVE7UUFDTixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7S0FDbkI7Ozs7Ozs7SUFPRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0tBQ25COzs7OztJQUtPLFVBQVU7UUFDaEIsSUFBSSxDQUFDLElBQUfgQ0FBQyxXQUFXLEVBQUU7WUFDckIsT0FBTztTQUNSO1FBRUQsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRTtZQUMxQixJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRSxZQUFZLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDNUYsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLEVBQUUsT0FBTyxFQUFFLElBQUfgQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBRXpGLElBQUfgSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFO2dCQUNoQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDdEY7WUFDRCxJQUFJLElBQUfgQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRTtnQkFDakMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLEVBQUUsUUFBUSxFQUFFLElBQUfgQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQ3hGO1lBQ0QsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUU7Z0JBQ25DLElBQUfgQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUfgQ0FBQyxFQUFFLENBQUMsYUFBYSxFQUFFLFVBQVUsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQzthQUM1RjtZQUNELElBQUfgSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFO2dCQUM5QixJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDbEY7WUFDRCxJQUFJLElBQUfgQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRTtnQkFDakMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLEVBQUUsUUFBUSxFQUFFLElBQUfgQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQ3hGO1lBQ0QsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUU7Z0JBQy9CLElBQUfgQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUfgQ0FBQyxFQUFFLENBQUMsYUFBYSxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUNwRjtZQUNELElBQUfgSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFO2dCQUNoQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDdEY7WUFFRCxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRSxZQUFZLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3pJLElBQUfgQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUfgQ0FBQyxFQUFFLENBQUMsYUFBYSxFQUFFLGVBQWUsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLElBQUfgQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLFlBQVfgQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDbEosSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLEVBQUUsYUFBYSxFQUFFLElBQUfgQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUM1SSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRSxjQUFjLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ2hKOzs7O1lBbkVKLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsaUJBQWlCO2FBQzVCOzs7O1lBUnlELFNBQVM7WUFBL0MsVUFBVTs7OzBCQWEzQixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiBUaGUgTUlUIExpY2Vuc2UgKE1JVClcblxuIENvcHlyaWdodCAoYykgMjAxNy0yMDE4IFN0ZWZhbm8gQ2FwcGEgKEtzODkpXG5cbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwifgwgdG8gZGVhbFxuIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbiB0byB1c2UsIGNvcHfgIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcblxuIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIGFsbFxuIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG5cbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFfgXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTiBJTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiBMSUFCSUxJVFfgIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFXG4gU09GVFdBUkUuXG4gKi9cblxuaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBJbnB1dCwgT25DaGFuZ2VzLCBPbkluaXQsIFJlbmRlcmVyMiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRGVzY3JpcHRpb24gfSBmcm9tICcuLi9tb2RlbC9kZXNjcmlwdGlvbi5pbnRlcmZhY2UnO1xuXG4vKipcbiAqIERpcmVjdGl2ZSB0byBjdXN0b21pemUgdGhlIGRlc2NyaXB0aW9uLlxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdba3NEZXNjcmlwdGlvbl0nXG59KVxuZXhwb3J0IGNsYXNzIERlc2NyaXB0aW9uRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMge1xuICAvKipcbiAgICogT2JqZWN0IG9mIHR5cGUgYERlc2NyaXB0aW9uYCB0byByZXNpemUgdGhlIGVsZW1lbnQuXG4gICAqL1xuICBASW5wdXQofgBkZXNjcmlwdGlvbjogRGVzY3JpcHRpb247XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLCBwcml2YXRlIGVsOiBFbGVtZW50UmVmfgB7fVxuXG4gIC8qKlxuICAgKiBNZXRob2QgwrRuZ09uSW5pdMK0IHRvIGFwcGx5IHRoZSBzdHlsZSBvZiB0aGlzIGRpcmVjdGl2ZS5cbiAgICogVGhpcyBpcyBhbiBBbmd1bGFyJ3MgbGlmZWN5Y2xlIGhvb2ssIHNvIGl0cyBjYWxsZWQgYXV0b21hdGljYWxseSBieSBBbmd1bGFyIGl0c2VsZi5cbiAgICogSW4gcGFydGljdWxhciwgaXQncyBjYWxsZWQgb25seSBvbmUgdGltZSEhIVxuICAgKi9cbiAgbmdPbkluaXQofgB7XG4gICAgdGhpcy5hcHBseVN0eWxlKCk7XG4gIH1cblxuICAvKipcbiAgICogTWV0aG9kIMK0bmdPbkNoYW5nZXPCtCB0byBhcHBseSB0aGUgc3R5bGUgb2YgdGhpcyBkaXJlY3RpdmUuXG4gICAqIFRoaXMgaXMgYW4gQW5ndWxhcidzIGxpZmVjeWNsZSBob29rLCBzbyBpdHMgY2FsbGVkIGF1dG9tYXRpY2FsbHkgYnkgQW5ndWxhciBpdHNlbGYuXG4gICAqIEluIHBhcnRpY3VsYXIsIGl0J3MgY2FsbGVkIHdoZW4gYW55IGRhdGEtYm91bmQgcHJvcGVydHkgb2YgYSBkaXJlY3RpdmUgY2hhbmdlcyEhIVxuICAgKi9cbiAgbmdPbkNoYW5nZXMofgB7XG4gICAgdGhpcy5hcHBseVN0eWxlKCk7XG4gIH1cblxuICAvKipcbiAgICogUHJpdmF0ZSBtZXRob2QgdG8gY2hhbmdlIGRlc2NyaXB0aW9uJ3Mgc3R5bGUuXG4gICAqL1xuICBwcml2YXRlIGFwcGx5U3R5bGUofgB7XG4gICAgaWYgKCF0aGlzLmRlc2NyaXB0aW9ufgB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuZGVzY3JpcHRpb24uc3R5bGUpIHtcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbC5uYXRpdmVFbGVtZW50LCAnYmFja2dyb3VuZCcsIHRoaXMuZGVzY3JpcHRpb24uc3R5bGUuYmdDb2xvcik7XG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ2NvbG9yJywgdGhpcy5kZXNjcmlwdGlvbi5zdHlsZS50ZXh0Q29sb3IpO1xuXG4gICAgICBpZiAodGhpcy5kZXNjcmlwdGlvbi5zdHlsZS53aWR0aCkge1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ3dpZHRoJywgdGhpcy5kZXNjcmlwdGlvbi5zdHlsZS53aWR0aCk7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5kZXNjcmlwdGlvbi5zdHlsZS5oZWlnaHQpIHtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICdoZWlnaHQnLCB0aGlzLmRlc2NyaXB0aW9uLnN0eWxlLmhlaWdodCk7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5kZXNjcmlwdGlvbi5zdHlsZS5wb3NpdGlvbikge1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ3Bvc2l0aW9uJywgdGhpcy5kZXNjcmlwdGlvbi5zdHlsZS5wb3NpdGlvbik7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5kZXNjcmlwdGlvbi5zdHlsZS50b3ApIHtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICd0b3AnLCB0aGlzLmRlc2NyaXB0aW9uLnN0eWxlLnRvcCk7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5kZXNjcmlwdGlvbi5zdHlsZS5ib3R0b20pIHtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICdib3R0b20nLCB0aGlzLmRlc2NyaXB0aW9uLnN0eWxlLmJvdHRvbSk7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5kZXNjcmlwdGlvbi5zdHlsZS5sZWZ0fgB7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbC5uYXRpdmVFbGVtZW50LCAnbGVmdCcsIHRoaXMuZGVzY3JpcHRpb24uc3R5bGUubGVmdCk7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5kZXNjcmlwdGlvbi5zdHlsZS5yaWdodCkge1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ3JpZ2h0JywgdGhpcy5kZXNjcmlwdGlvbi5zdHlsZS5yaWdodCk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbC5uYXRpdmVFbGVtZW50LCAnbWFyZ2luLXRvcCcsIHRoaXMuZGVzY3JpcHRpb24uc3R5bGUubWFyZ2luVG9wID8gdGhpcy5kZXNjcmlwdGlvbi5zdHlsZS5tYXJnaW5Ub3AgOiAnMHB4Jyk7XG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ21hcmdpbi1ib3R0b20nLCB0aGlzLmRlc2NyaXB0aW9uLnN0eWxlLm1hcmdpbkJvdHRvbSA/IHRoaXMuZGVzY3JpcHRpb24uc3R5bGUubWFyZ2luQm90dG9tIDogJzBweCcpO1xuICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICdtYXJnaW4tbGVmdCcsIHRoaXMuZGVzY3JpcHRpb24uc3R5bGUubWFyZ2luTGVmdCA/IHRoaXMuZGVzY3JpcHRpb24uc3R5bGUubWFyZ2luTGVmdCA6ICcwcHgnKTtcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbC5uYXRpdmVFbGVtZW50LCAnbWFyZ2luLXJpZ2h0JywgdGhpcy5kZXNjcmlwdGlvbi5zdHlsZS5tYXJnaW5SaWdodCA/IHRoaXMuZGVzY3JpcHRpb24uc3R5bGUubWFyZ2luUmlnaHQgOiAnMHB4Jyk7XG4gICAgfVxuICB9XG59XG4iXX0=