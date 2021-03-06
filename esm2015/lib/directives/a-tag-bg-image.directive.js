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
import { Image } from '../model/image.class';
/**
 * Directive to add an image to an `<a>` tag with some additional custom properties.
 */
export class ATagBgImageDirective {
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
     * Private method to add an image as background of an `<a>` tag.
     * @return {?}
     */
    applyStyle() {
        if (!this.image || (!this.image.plain && !this.image.modal)) {
            return;
        }
        /** @type {?} */
        const imgPath = this.image.plain && this.image.plain.img ? this.image.plain.img : this.image.modal.img;
        this.renderer.setStyle(this.el.nativeElement, 'background', `url("${imgPath}") ${this.style}`);
    }
}
ATagBgImageDirective.decorators = [
    { type: Directive, args: [{
                selector: '[fgATagBgImage]'
            },] }
];
/** @nocollapse */
ATagBgImageDirective.ctorParameters = () => [
    { type: Renderer2 },
    { type: ElementRef }
];
ATagBgImageDirective.propDecorators = {
    image: [{ type: Input }],
    style: [{ type: Input }]
};
if (false) {
    /**
     * Object of type `Image` that represents the image to add to the `<a>` tag.
     * @type {?}
     */
    ATagBgImageDirective.prototype.image;
    /**
     * Additional style to customize the background attribute.
     * Empty string by default.
     * @type {?}
     */
    ATagBgImageDirective.prototype.style;
    /** @type {?} */
    ATagBgImageDirective.prototype.renderer;
    /** @type {?} */
    ATagBgImageDirective.prototype.el;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYS10YWctYmctaW1hZ2UuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbW9kYWwtYW5ndWxhci1nYWxsZXJ5LyIsInNvdXJjZXMiOlsibGliL2RpcmVjdGl2ZXMvYS10YWctYmctaW1hZ2UuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXdCQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQXFCLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzRixPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7Ozs7QUFTN0MsTUFBTTs7Ozs7SUFXSixZQUFvQixRQUFtQixFQUFVLEVBQWM7UUFBM0MsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUFVLE9BQUUsR0FBRixFQUFFLENBQVk7S0FBSTs7Ozs7OztJQU9uRSxRQUFRO1FBQ04sSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0tBQ25COzs7Ozs7O0lBT0QsV0FBVztRQUNULElBQUfgQ0FBQyxVQUFVLEVBQUUsQ0FBQztLQUNuQjs7Ozs7SUFLTyxVQUFVO1FBQ2hCLElBQUfgQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssSUFBSSxDQUFDLElBQUfgQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDM0QsT0FBTztTQUNSOztRQUVELE1BQU0sT0FBTyxHQUE2QixJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUfgQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO1FBQ2pJLElBQUfgQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUfgQ0FBQyxFQUFFLENBQUMsYUFBYSxFQUFFLFlBQVfgRUFBRSxRQUFRLE9BQU8sTUFBTSxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQzs7OztZQTNDbEcsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxpQkFBaUI7YUFDNUI7Ozs7WUFWeUQsU0FBUztZQUEvQyxVQUFVOzs7b0JBZTNCLEtBQUs7b0JBS0wsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gVGhlIE1JVCBMaWNlbnNlIChNSVQpXG5cbiBDb3B5cmlnaHQgKGMpIDIwMTctMjAxOCBTdGVmYW5vIENhcHBhIChLczg5KVxuXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIifgIHRvIGRlYWxcbiBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4gdG8gdXNlLCBjb3B5LCBtb2RpZnfgIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG5cbiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBhbGxcbiBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT04gSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRVxuIFNPRlRXQVJFLlxuICovXG5cbmltcG9ydCB7IERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSW5wdXQsIE9uQ2hhbmdlcywgT25Jbml0LCBSZW5kZXJlcjIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgSW1hZ2UgfSBmcm9tICcuLi9tb2RlbC9pbWFnZS5jbGFzcyc7XG5pbXBvcnQgeyBTYWZlUmVzb3VyY2VVcmwgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcblxuLyoqXG4gKiBEaXJlY3RpdmUgdG8gYWRkIGFuIGltYWdlIHRvIGFuIGA8YT5gIHRhZyB3aXRoIHNvbWUgYWRkaXRpb25hbCBjdXN0b20gcHJvcGVydGllcy5cbiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2tzQVRhZ0JnSW1hZ2VdJ1xufSlcbmV4cG9ydCBjbGFzcyBBVGFnQmdJbWFnZURpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzIHtcbiAgLyoqXG4gICAqIE9iamVjdCBvZiB0eXBlIGBJbWFnZWAgdGhhdCByZXByZXNlbnRzIHRoZSBpbWFnZSB0byBhZGQgdG8gdGhlIGA8YT5gIHRhZy5cbiAgICovXG4gIEBJbnB1dCgpIGltYWdlOiBJbWFnZTtcbiAgLyoqXG4gICAqIEFkZGl0aW9uYWwgc3R5bGUgdG8gY3VzdG9taXplIHRoZSBiYWNrZ3JvdW5kIGF0dHJpYnV0ZS5cbiAgICogRW1wdHkgc3RyaW5nIGJ5IGRlZmF1bHQuXG4gICAqL1xuICBASW5wdXQofgBzdHlsZTogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMiwgcHJpdmF0ZSBlbDogRWxlbWVudFJlZikge31cblxuICAvKipcbiAgICogTWV0aG9kIMK0bmdPbkluaXTCtCB0byBhcHBseSB0aGUgc3R5bGUgb2YgdGhpcyBkaXJlY3RpdmUuXG4gICAqIFRoaXMgaXMgYW4gQW5ndWxhcidzIGxpZmVjeWNsZSBob29rLCBzbyBpdHMgY2FsbGVkIGF1dG9tYXRpY2FsbHkgYnkgQW5ndWxhciBpdHNlbGYuXG4gICAqIEluIHBhcnRpY3VsYXIsIGl0J3MgY2FsbGVkIG9ubHkgb25lIHRpbWUhISFcbiAgICovXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuYXBwbHlTdHlsZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIE1ldGhvZCDCtG5nT25DaGFuZ2VzwrQgdG8gYXBwbHkgdGhlIHN0eWxlIG9mIHRoaXMgZGlyZWN0aXZlLlxuICAgKiBUaGlzIGlzIGFuIEFuZ3VsYXIncyBsaWZlY3ljbGUgaG9vaywgc28gaXRzIGNhbGxlZCBhdXRvbWF0aWNhbGx5IGJ5IEFuZ3VsYXIgaXRzZWxmLlxuICAgKiBJbiBwYXJ0aWN1bGFyLCBpdCdzIGNhbGxlZCB3aGVuIGFueSBkYXRhLWJvdW5kIHByb3BlcnR5IG9mIGEgZGlyZWN0aXZlIGNoYW5nZXMhISFcbiAgICovXG4gIG5nT25DaGFuZ2VzKCkge1xuICAgIHRoaXMuYXBwbHlTdHlsZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFByaXZhdGUgbWV0aG9kIHRvIGFkZCBhbiBpbWFnZSBhcyBiYWNrZ3JvdW5kIG9mIGFuIGA8YT5gIHRhZy5cbiAgICovXG4gIHByaXZhdGUgYXBwbHlTdHlsZSgpIHtcbiAgICBpZiAoIXRoaXMuaW1hZ2UgfHwgKCF0aGlzLmltYWdlLnBsYWluICYmICF0aGlzLmltYWdlLm1vZGFsfgkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGltZ1BhdGg6IHN0cmluZyB8IFNhZmVSZXNvdXJjZVVybCA9IHRoaXMuaW1hZ2UucGxhaW4gJiYgdGhpcy5pbWFnZS5wbGFpbi5pbWcgPyB0aGlzLmltYWdlLnBsYWluLmltZyA6IHRoaXMuaW1hZ2UubW9kYWwuaW1nO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbC5uYXRpdmVFbGVtZW50LCAnYmFja2dyb3VuZCcsIGB1cmwoXCIke2ltZ1BhdGh9XCIpICR7dGhpcy5zdHlsZX1gKTtcbiAgfVxufVxuIl19