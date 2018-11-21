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
var ClickOutsideDirective = /** @class */ (function () {
    function ClickOutsideDirective() {
        /**
         * Output to emit an event if the clicked element class doesn't contain 'inside' or it is 'hidden'. The payload is a boolean.
         */
        this.clickOutside = new EventEmitter();
    }
    /**
     * Method called by Angular itself every click thanfg to `@HostListener`.
     * @param MouseEvent event payload received evey click
     */
    /**
     * Method called by Angular itself every click thanfg to `\@HostListener`.
     * @param {?} event
     * @return {?}
     */
    ClickOutsideDirective.prototype.onClick = /**
     * Method called by Angular itself every click thanfg to `\@HostListener`.
     * @param {?} event
     * @return {?}
     */
    function (event) {
        event.stopPropagation();
        /** @type {?} */
        var targetElement = event.target;
        if (!this.clickOutsideEnable || !targetElement) {
            return;
        }
        /** @type {?} */
        var isInside = false;
        /** @type {?} */
        var isHidden = false;
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
    };
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
    return ClickOutsideDirective;
}());
export { ClickOutsideDirective };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpY2stb3V0c2lkZS5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9tb2RhbC1hbmd1bGFyLWdhbGxlcnkvIiwic291cmNlcyI6WyJsaWIvZGlyZWN0aXZlcy9jbGljay1vdXRzaWRlLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF3QkEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozs7Ozs7Ozs7OzRCQWtCbkMsSUFBSSxZQUFZLEVBQVc7O0lBRTNFOzs7T0FHRzs7Ozs7O0lBRUgsdUNBQU87Ozs7O0lBRFAsVUFDUSxLQUFpQjtRQUN2QixLQUFLLENBQUMsZUFBZSxFQUFFLENBQUM7O1FBRXhCLElBQU0sYUFBYSxHQUFRLEtBQUssQ0FBQyxNQUFNLENBQUM7UUFFeEMsSUFBSSxDQUFDLElBQUfgQ0FBQyxrQkFBa0IsSUFBSSxDQUFDLGFBQWEsRUFBRTtZQUM5QyxPQUFPO1NBQ1I7O1FBRUQsSUFBSSxRQUFRLEdBQUcsS0FBSyxDQUFDOztRQUNyQixJQUFJLFFBQVEsR0FBRyxLQUFLLENBQUM7UUFFckIsSUFBSSxPQUFPLGFBQWEsQ0FBQyxTQUFTLEtBQUssUUFBUSxFQUFFOzs7WUFHL0MsUUFBUSxHQUFHLElBQUfgQ0FBQztTQUNqQjthQUFNOztZQUVMLFFBQVEsR0FBRyxhQUFhLENBQUMsU0FBUyxJQUFJLGFBQWEsQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ25GLFFBQVEsR0FBRyxhQUFhLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUN2RDs7Ozs7Ozs7OztRQVdELElBQUfgQ0FBQyxRQUFRLElBQUfgUUFBUSxFQUFFOztZQUV6QixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUfgQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUM5QjtLQUNGOztnQkFyREYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxrQkFBa0I7aUJBQzdCOzs7cUNBS0UsS0FBSzsrQkFJTCxNQUFNOzBCQU1OLFlBQVfgU0FBQyxPQUFPLEVBQUUsQ0FBQyxRQUFRLENBQUM7O2dDQWhEbkM7O1NBa0NhLHFCQUFxQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gVGhlIE1JVCBMaWNlbnNlIChNSVQpXG5cbiBDb3B5cmlnaHQgKGMpIDIwMTctMjAxOCBTdGVmYW5vIENhcHBhIChLczg5KVxuXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIifgIHRvIGRlYWxcbiBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4gdG8gdXNlLCBjb3B5LCBtb2RpZnfgIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG5cbiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBhbGxcbiBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT04gSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRVxuIFNPRlRXQVJFLlxuICovXG5cbmltcG9ydCB7IERpcmVjdGl2ZSwgRXZlbnRFbWl0dGVyLCBIb3N0TGlzdGVuZXIsIElucHV0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuLyoqXG4gKiBEaXJlY3RpdmUgdG8gY2xvc2UgdGhlIG1vZGFsIGdhbGxlcnkgY2xpY2tpbmcgb24gdGhlIHNlbWktdHJhbnNwYXJlbnQgYmFja2dyb3VuZC5cbiAqIEluIGZhY3QsIGl0IGxpc3RlbnMgZm9yIGEgY2xpY2sgb24gYWxsIGVsZW1lbnRzIHRoYXQgYXJlbid0ICdpbnNpZGUnIGFuZCBpdCBlbWl0c1xuICogYW4gZXZlbnQgdXNpbmcgYEBPdXRwdXQgY2xpY2tPdXRzaWRlYC5cbiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2tzQ2xpY2tPdXRzaWRlXSdcbn0pXG5leHBvcnQgY2xhc3MgQ2xpY2tPdXRzaWRlRGlyZWN0aXZlIHtcbiAgLyoqXG4gICAqIEJvb2xlYW4gdG8gZW5hYmxlIHRoaXMgZGlyZWN0aXZlLlxuICAgKi9cbiAgQElucHV0KCkgY2xpY2tPdXRzaWRlRW5hYmxlOiBib29sZWFuO1xuICAvKipcbiAgICogT3V0cHV0IHRvIGVtaXQgYW4gZXZlbnQgaWYgdGhlIGNsaWNrZWQgZWxlbWVudCBjbGFzcyBkb2Vzbid0IGNvbnRhaW4gJ2luc2lkZScgb3IgaXQgaXMgJ2hpZGRlbicuIFRoZSBwYXlsb2FkIGlzIGEgYm9vbGVhbi5cbiAgICovXG4gIEBPdXRwdXQofgBjbGlja091dHNpZGU6IEV2ZW50RW1pdHRlcjxib29sZWFuPiA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcblxuICAvKipcbiAgICogTWV0aG9kIGNhbGxlZCBieSBBbmd1bGFyIGl0c2VsZiBldmVyeSBjbGljayB0aGFua3MgdG8gYEBIb3N0TGlzdGVuZXJgLlxuICAgKiBAcGFyYW0gTW91c2VFdmVudCBldmVudCBwYXlsb2FkIHJlY2VpdmVkIGV2ZXkgY2xpY2tcbiAgICovXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJywgWyckZXZlbnQnXSlcbiAgb25DbGljayhldmVudDogTW91c2VFdmVudCkge1xuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgY29uc3QgdGFyZ2V0RWxlbWVudDogYW55ID0gZXZlbnQudGFyZ2V0O1xuXG4gICAgaWYgKCF0aGlzLmNsaWNrT3V0c2lkZUVuYWJsZSB8fCAhdGFyZ2V0RWxlbWVudCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxldCBpc0luc2lkZSA9IGZhbHNlO1xuICAgIGxldCBpc0hpZGRlbiA9IGZhbHNlO1xuXG4gICAgaWYgKHR5cGVvZiB0YXJnZXRFbGVtZW50LmNsYXNzTmFtZSAhPT0gJ3N0cmluZycpIHtcbiAgICAgIC8vIGl0IGhhcHBlbnMgd2l0aCBAZm9ydGF3ZXNvbWUvZm9udGF3ZXNvbWUgNVxuICAgICAgLy8gZm9yIHNvbWUgcmVhc29ucyBjbGFzc05hbWUgaXMgYW4gb2JqZWN0IHdpdGggMiBlbXB0eSBwcm9wZXJ0aWVzIGluc2lkZVxuICAgICAgaXNJbnNpZGUgPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBpbiBub3JtYWwgc2NlbmFyaW9zLCB1c2UgY2xhc3NuYW1lLCBiZWNhdXNlIGl0J3MgYSBzaW1wbGUgc3RyaW5nXG4gICAgICBpc0luc2lkZSA9IHRhcmdldEVsZW1lbnQuY2xhc3NOYW1lICYmIHRhcmdldEVsZW1lbnQuY2xhc3NOYW1lLnN0YXJ0c1dpdGgoJ2luc2lkZScpO1xuICAgICAgaXNIaWRkZW4gPSB0YXJnZXRFbGVtZW50LmNsYXNzTmFtZS5pbmNsdWRlcygnaGlkZGVuJyk7XG4gICAgfVxuXG4gICAgLy8gaWYgaW5zaWRlID0+IGRvbid0IGNsb3NlIG1vZGFsIGdhbGxlcnlcbiAgICAvLyBpZiBoaWRkZW4gPT4gY2xvc2UgbW9kYWwgZ2FsbGVyeVxuICAgIC8qXG4gICAgICAgIGkgaScgaCB8IGNsb3NlXG4gICAgICAgIDAgMSAgMCB8ICAgMSA9PiBjbG9zZSBtb2RhbCBnYWxsZXJ5XG4gICAgICAgIDAgMSAgMSB8ICAgMSA9PiBjbG9zZSBtb2RhbCBnYWxsZXJ5XG4gICAgICAgIDEgMCAgMCB8ICAgMFxuICAgICAgICAxIDAgIDEgfCAgIDEgPT4gY2xvc2UgbW9kYWwgZ2FsbGVyeVxuICAgICAqL1xuICAgIGlmICghaXNJbnNpZGUgfHwgaXNIaWRkZW4pIHtcbiAgICAgIC8vIGNsb3NlIG1vZGFsIGdhbGxlcnlcbiAgICAgIHRoaXMuY2xpY2tPdXRzaWRlLmVtaXQodHJ1ZSk7XG4gICAgfVxuICB9XG59XG4iXX0=