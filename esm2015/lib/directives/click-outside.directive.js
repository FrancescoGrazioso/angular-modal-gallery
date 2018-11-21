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
import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';
/**
 * Directive to close the modal gallery clicking on the semi-transparent background.
 * In fact, it listens for a click on all elements that aren't 'inside' and it emits
 * an event using `\@Output clickOutside`.
 */
export class ClickOutsideDirective {
    constructor() {
        /**
         * Output to emit an event if the clicked element class doesn't contain 'inside' or it is 'hidden'. The payload is a boolean.
         */
        this.clickOutside = new EventEmitter();
    }
    /**
     * Method called by Angular itself every click thanfg to `\@HostListener`.
     * @param {?} event
     * @return {?}
     */
    onClick(event) {
        event.stopPropagation();
        /** @type {?} */
        const targetElement = event.target;
        if (!this.clickOutsideEnable || !targetElement) {
            return;
        }
        /** @type {?} */
        let isInside = false;
        /** @type {?} */
        let isHidden = false;
        if (typeof targetElement.className !== 'string') {
            // it happens with @fortawesome/fontawesome 5
            // for some reasons className is an object with 2 empty properties inside
            isInside = true;
        }
        else {
            // in normal scenarios, use classname, because it's a simple string
            isInside = targetElement.className && targetElement.className.startsWith('inside');
            isHidden = targetElement.className.includes('hidden');
        }
        // if inside => don't close modal gallery
        // if hidden => close modal gallery
        /*
                i i' h | close
                0 1  0 |   1 => close modal gallery
                0 1  1 |   1 => close modal gallery
                1 0  0 |   0
                1 0  1 |   1 => close modal gallery
             */
        if (!isInside || isHidden) {
            // close modal gallery
            this.clickOutside.emit(true);
        }
    }
}
ClickOutsideDirective.decorators = [
    { type: Directive, args: [{
                selector: '[fgClickOutside]'
            },] }
];
ClickOutsideDirective.propDecorators = {
    clickOutsideEnable: [{ type: Input }],
    clickOutside: [{ type: Output }],
    onClick: [{ type: HostListener, args: ['click', ['$event'],] }]
};
if (false) {
    /**
     * Boolean to enable this directive.
     * @type {?}
     */
    ClickOutsideDirective.prototype.clickOutsideEnable;
    /**
     * Output to emit an event if the clicked element class doesn't contain 'inside' or it is 'hidden'. The payload is a boolean.
     * @type {?}
     */
    ClickOutsideDirective.prototype.clickOutside;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpY2stb3V0c2lkZS5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9tb2RhbC1hbmd1bGFyLWdhbGxlcnkvIiwic291cmNlcyI6WyJsaWIvZGlyZWN0aXZlcy9jbGljay1vdXRzaWRlLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF3QkEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozs7OztBQVVyRixNQUFNOzs7Ozs0QkFRNEMsSUFBSSxZQUFZLEVBQVc7Ozs7Ozs7SUFPM0UsT0FBTyxDQUFDLEtBQWlCO1FBQ3ZCLEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQzs7UUFFeEIsTUFBTSxhQUFhLEdBQVEsS0FBSyxDQUFDLE1BQU0sQ0FBQztRQUV4QyxJQUFJLENBQUMsSUFBSSxDQUFDLGtCQUFrQixJQUFJLENBQUMsYUFBYSxFQUFFO1lBQzlDLE9BQU87U0FDUjs7UUFFRCxJQUFJLFFBQVEsR0FBRyxLQUFLLENBQUM7O1FBQ3JCLElBQUfgUUFBUSxHQUFHLEtBQUssQ0FBQztRQUVyQixJQUFJLE9BQU8sYUFBYSxDQUFDLFNBQVMsS0FBSyxRQUFRLEVBQUU7OztZQUcvQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1NBQ2pCO2FBQU07O1lBRUwsUUFBUSxHQUFHLGFBQWEsQ0FBQyxTQUFTLElBQUfgYUFBYSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDbkYsUUFBUSxHQUFHLGFBQWEsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQ3ZEOzs7Ozs7Ozs7O1FBV0QsSUFBSSxDQUFDLFFBQVEsSUFBSSxRQUFRLEVBQUU7O1lBRXpCLElBQUfgQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUfgQ0FBQyxDQUFDO1NBQzlCO0tBQ0Y7OztZQXJERixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGtCQUFrQjthQUM3Qjs7O2lDQUtFLEtBQUs7MkJBSUwsTUFBTTtzQkFNTixZQUFZLFNBQUMsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiBUaGUgTUlUIExpY2Vuc2UgKE1JVClcblxuIENvcHlyaWdodCAoYykgMjAxNy0yMDE4IFN0ZWZhbm8gQ2FwcGEgKEtzODkpXG5cbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwifgwgdG8gZGVhbFxuIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbiB0byB1c2UsIGNvcHfgIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcblxuIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIGFsbFxuIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG5cbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFfgXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTiBJTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiBMSUFCSUxJVFfgIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFXG4gU09GVFdBUkUuXG4gKi9cblxuaW1wb3J0IHsgRGlyZWN0aXZlLCBFdmVudEVtaXR0ZXIsIEhvc3RMaXN0ZW5lciwgSW5wdXQsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG4vKipcbiAqIERpcmVjdGl2ZSB0byBjbG9zZSB0aGUgbW9kYWwgZ2FsbGVyeSBjbGlja2luZyBvbiB0aGUgc2VtaS10cmFuc3BhcmVudCBiYWNrZ3JvdW5kLlxuICogSW4gZmFjdCwgaXQgbGlzdGVucyBmb3IgYSBjbGljayBvbiBhbGwgZWxlbWVudHMgdGhhdCBhcmVuJ3QgJ2luc2lkZScgYW5kIGl0IGVtaXRzXG4gKiBhbiBldmVudCB1c2luZyBgQE91dHB1dCBjbGlja091dHNpZGVgLlxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdba3NDbGlja091dHNpZGVdJ1xufSlcbmV4cG9ydCBjbGFzcyBDbGlja091dHNpZGVEaXJlY3RpdmUge1xuICAvKipcbiAgICogQm9vbGVhbiB0byBlbmFibGUgdGhpcyBkaXJlY3RpdmUuXG4gICAqL1xuICBASW5wdXQofgBjbGlja091dHNpZGVFbmFibGU6IGJvb2xlYW47XG4gIC8qKlxuICAgKiBPdXRwdXQgdG8gZW1pdCBhbiBldmVudCBpZiB0aGUgY2xpY2tlZCBlbGVtZW50IGNsYXNzIGRvZXNuJ3QgY29udGFpbiAnaW5zaWRlJyBvciBpdCBpcyAnaGlkZGVuJy4gVGhlIHBheWxvYWQgaXMgYSBib29sZWFuLlxuICAgKi9cbiAgQE91dHB1dCgpIGNsaWNrT3V0c2lkZTogRXZlbnRFbWl0dGVyPGJvb2xlYW4+ID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuXG4gIC8qKlxuICAgKiBNZXRob2QgY2FsbGVkIGJ5IEFuZ3VsYXIgaXRzZWxmIGV2ZXJ5IGNsaWNrIHRoYW5rcyB0byBgQEhvc3RMaXN0ZW5lcmAuXG4gICAqIEBwYXJhbSBNb3VzZUV2ZW50IGV2ZW50IHBheWxvYWQgcmVjZWl2ZWQgZXZleSBjbGlja1xuICAgKi9cbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snLCBbJyRldmVudCddKVxuICBvbkNsaWNrKGV2ZW50OiBNb3VzZUV2ZW50fgB7XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICBjb25zdCB0YXJnZXRFbGVtZW50OiBhbnkgPSBldmVudC50YXJnZXQ7XG5cbiAgICBpZiAoIXRoaXMuY2xpY2tPdXRzaWRlRW5hYmxlIHx8ICF0YXJnZXRFbGVtZW50fgB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbGV0IGlzSW5zaWRlID0gZmFsc2U7XG4gICAgbGV0IGlzSGlkZGVuID0gZmFsc2U7XG5cbiAgICBpZiAodHlwZW9mIHRhcmdldEVsZW1lbnQuY2xhc3NOYW1lICE9PSAnc3RyaW5nJykge1xuICAgICAgLy8gaXQgaGFwcGVucyB3aXRoIEBmb3J0YXdlc29tZS9mb250YXdlc29tZSA1XG4gICAgICAvLyBmb3Igc29tZSByZWFzb25zIGNsYXNzTmFtZSBpcyBhbiBvYmplY3Qgd2l0aCAyIGVtcHR5IHByb3BlcnRpZXMgaW5zaWRlXG4gICAgICBpc0luc2lkZSA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGluIG5vcm1hbCBzY2VuYXJpb3MsIHVzZSBjbGFzc25hbWUsIGJlY2F1c2UgaXQncyBhIHNpbXBsZSBzdHJpbmdcbiAgICAgIGlzSW5zaWRlID0gdGFyZ2V0RWxlbWVudC5jbGFzc05hbWUgJiYgdGFyZ2V0RWxlbWVudC5jbGFzc05hbWUuc3RhcnRzV2l0aCgnaW5zaWRlJyk7XG4gICAgICBpc0hpZGRlbiA9IHRhcmdldEVsZW1lbnQuY2xhc3NOYW1lLmluY2x1ZGVzKCdoaWRkZW4nKTtcbiAgICB9XG5cbiAgICAvLyBpZiBpbnNpZGUgPT4gZG9uJ3QgY2xvc2UgbW9kYWwgZ2FsbGVyeVxuICAgIC8vIGlmIGhpZGRlbiA9PiBjbG9zZSBtb2RhbCBnYWxsZXJ5XG4gICAgLypcbiAgICAgICAgaSBpJyBoIHwgY2xvc2VcbiAgICAgICAgMCAxICAwIHwgICAxID0+IGNsb3NlIG1vZGFsIGdhbGxlcnlcbiAgICAgICAgMCAxICAxIHwgICAxID0+IGNsb3NlIG1vZGFsIGdhbGxlcnlcbiAgICAgICAgMSAwICAwIHwgICAwXG4gICAgICAgIDEgMCAgMSB8ICAgMSA9PiBjbG9zZSBtb2RhbCBnYWxsZXJ5XG4gICAgICovXG4gICAgaWYgKCFpc0luc2lkZSB8fCBpc0hpZGRlbikge1xuICAgICAgLy8gY2xvc2UgbW9kYWwgZ2FsbGVyeVxuICAgICAgdGhpcy5jbGlja091dHNpZGUuZW1pdCh0cnVlKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==