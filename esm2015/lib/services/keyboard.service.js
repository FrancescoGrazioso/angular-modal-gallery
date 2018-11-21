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
import { Inject, Injectable, InjectionToken } from '@angular/core';
/** @type {?} */
export const KEYBOARD_CONFIGURATION = new InjectionToken('KEYBOARD_CONFIGURATION');
/**
 * Service to intercept ctrl+s (or cmd+s on macOS) using a third-party library, called Mousetrap.
 */
export class KeyboardService {
    /**
     * Constructor of `KeyboardService` to init `mousetrap` and `shortcuts` private variables.
     * @param {?} config
     */
    constructor(config) {
        // this.config is always defined, because forced by forRoot inside the module
        // when empty, it's simply an empty object: {}
        this.config = config;
        this.shortcuts = this.config && this.config.shortcuts ? this.config.shortcuts : ['ctrl+s', 'meta+s'];
        // temporary workaround to fix this issue: https://github.com/fg96/angular-modal-gallery/issues/142
        if (this.config && !this.config.disableSsrWorkaround) {
            // To prevent issues with angular-universal on server-side
            if (typeof window !== 'undefined') {
                this.mousetrap = new (/** @type {?} */ (Mousetrap))();
            }
        }
    }
    /**
     * Method to add a lister for ctrl+s/cmd+s keyboard events.
     * @param {?} onBind
     * @return {?}
     */
    add(onBind) {
        // temporary workaround to fix this issue: https://github.com/fg96/angular-modal-gallery/issues/142
        if (this.config && !this.config.disableSsrWorkaround) {
            // To prevent issues with angular-universal on server-side
            if (typeof window !== 'undefined') {
                this.mousetrap.bind(this.shortcuts, (event, combo) => {
                    if (event.preventDefault) {
                        event.preventDefault();
                    }
                    else {
                        // internet explorer
                        event.returnValue = false;
                    }
                    onBind(event, combo);
                });
            }
        }
    }
    /**
     * Method to reset all listeners. Please, call this function when needed
     * to free resources ad prevent leafg.
     * @return {?}
     */
    reset() {
        // temporary workaround to fix this issue: https://github.com/fg96/angular-modal-gallery/issues/142
        if (this.config && !this.config.disableSsrWorkaround) {
            // To prevent issues with angular-universal on server-side
            if (typeof window !== 'undefined') {
                this.mousetrap.reset();
            }
        }
    }
}
KeyboardService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
KeyboardService.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [KEYBOARD_CONFIGURATION,] }] }
];
if (false) {
    /**
     * Private Mousetrap variable to store the instance.
     * @type {?}
     */
    KeyboardService.prototype.mousetrap;
    /**
     * Private variable to store shortcuts as either Array or string.
     * @type {?}
     */
    KeyboardService.prototype.shortcuts;
    /** @type {?} */
    KeyboardService.prototype.config;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia2V5Ym9hcmQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL21vZGFsLWFuZ3VsYXItZ2FsbGVyeS8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlcy9rZXlib2FyZC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXdCQSxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxjQUFjLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBSW5FLGFBQWEsc0JBQXNCLEdBQUcsSUFBSSxjQUFjLENBQXdCLHdCQUF3QixDQUFDLENBQUM7Ozs7QUFNMUcsTUFBTTs7Ozs7SUFjSixZQUFvRCxNQUE2Qjs7O1FBQTdCLFdBQU0sR0FBTixNQUFNLENBQXVCO1FBSS9FLElBQUfgQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFDOztRQUdyRyxJQUFJLElBQUfgQ0FBQyxNQUFNLElBQUfgQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLG9CQUFvQixFQUFFOztZQUVwRCxJQUFJLE9BQU8sTUFBTSxLQUFLLFdBQVcsRUFBRTtnQkFDakMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLG1CQUFNLFNBQVMsRUFBQyxFQUFFLENBQUM7YUFDekM7U0FDRjtLQUNGOzs7Ozs7SUFNRCxHQUFHLENBQUMsTUFBd0Q7O1FBRTFELElBQUfgSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLElBQUfgQ0FBQyxNQUFNLENBQUMsb0JBQW9CLEVBQUU7O1lBRXBELElBQUfgT0FBTyxNQUFNLEtBQUssV0FBVyxFQUFFO2dCQUNqQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUfgQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUMsS0FBb0IsRUFBRSxLQUFhLEVBQUUsRUFBRTtvQkFDMUUsSUFBSSxLQUFLLENBQUMsY0FBYyxFQUFFO3dCQUN4QixLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7cUJBQ3hCO3lCQUFNOzt3QkFFTCxLQUFLLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztxQkFDM0I7b0JBQ0QsTUFBTSxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztpQkFDdEIsQ0FBQyxDQUFDO2FBQ0o7U0FDRjtLQUNGOzs7Ozs7SUFNRCxLQUFLOztRQUVILElBQUfgSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLElBQUfgQ0FBQyxNQUFNLENBQUMsb0JBQW9CLEVBQUU7O1lBRXBELElBQUfgT0FBTyxNQUFNLEtBQUssV0FBVyxFQUFFO2dCQUNqQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxDQUFDO2FBQ3hCO1NBQ0Y7S0FDRjs7O1lBaEVGLFVBQVU7Ozs7NENBZUfgTUFBTSxTQUFDLHNCQUFzQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gVGhlIE1JVCBMaWNlbnNlIChNSVQpXG5cbiBDb3B5cmlnaHQgKGMpIDIwMTctMjAxOCBTdGVmYW5vIENhcHBhIChLczg5KVxuXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIifgIHRvIGRlYWxcbiBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4gdG8gdXNlLCBjb3B5LCBtb2RpZnfgIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG5cbiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBhbGxcbiBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT04gSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRVxuIFNPRlRXQVJFLlxuICovXG5cbmltcG9ydCB7IEluamVjdCwgSW5qZWN0YWJsZSwgSW5qZWN0aW9uVG9rZW4gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgS2V5Ym9hcmRTZXJ2aWNlQ29uZmlnIH0gZnJvbSAnLi4vbW9kZWwva2V5Ym9hcmQtc2VydmljZS1jb25maWcuaW50ZXJmYWNlJztcblxuZXhwb3J0IGNvbnN0IEtFWUJPQVJEX0NPTkZJR1VSQVRJT04gPSBuZXcgSW5qZWN0aW9uVG9rZW48S2V5Ym9hcmRTZXJ2aWNlQ29uZmlnPignS0VZQk9BUkRfQ09ORklHVVJBVElPTicpO1xuXG4vKipcbiAqIFNlcnZpY2UgdG8gaW50ZXJjZXB0IGN0cmwrcyAob3IgY21kK3Mgb24gbWFjT1MpIHVzaW5nIGEgdGhpcmQtcGFydHkgbGlicmFyeSwgY2FsbGVkIE1vdXNldHJhcC5cbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEtleWJvYXJkU2VydmljZSB7XG4gIC8qKlxuICAgKiBQcml2YXRlIE1vdXNldHJhcCB2YXJpYWJsZSB0byBzdG9yZSB0aGUgaW5zdGFuY2UuXG4gICAqL1xuICBwcml2YXRlIG1vdXNldHJhcDogTW91c2V0cmFwSW5zdGFuY2U7XG4gIC8qKlxuICAgKiBQcml2YXRlIHZhcmlhYmxlIHRvIHN0b3JlIHNob3J0Y3V0cyBhcyBlaXRoZXIgQXJyYXkgb3Igc3RyaW5nLlxuICAgKi9cbiAgcHJpdmF0ZSBzaG9ydGN1dHM6IEFycmF5PHN0cmluZz4gfCBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIENvbnN0cnVjdG9yIG9mIGBLZXlib2FyZFNlcnZpY2VgIHRvIGluaXQgYG1vdXNldHJhcGAgYW5kIGBzaG9ydGN1dHNgIHByaXZhdGUgdmFyaWFibGVzLlxuICAgKiBAcGFyYW0gS2V5Ym9hcmRTZXJ2aWNlQ29uZmlnIGNvbmZpZyBvYmplY3QgcmVjZWl2ZWQgYnkgdGhlIGBmb3JSb290KClgIGZ1bmN0aW9uIHRvIGluaXQgY3VzdG9tIHNob3J0Y3V0c1xuICAgKi9cbiAgY29uc3RydWN0b3IoQEluamVjdChLRVlCT0FSRF9DT05GSUdVUkFUSU9OfgBwcml2YXRlIGNvbmZpZzogS2V5Ym9hcmRTZXJ2aWNlQ29uZmlnfgB7XG4gICAgLy8gdGhpcy5jb25maWcgaXMgYWx3YXlzIGRlZmluZWQsIGJlY2F1c2UgZm9yY2VkIGJ5IGZvclJvb3QgaW5zaWRlIHRoZSBtb2R1bGVcbiAgICAvLyB3aGVuIGVtcHR5LCBpdCdzIHNpbXBseSBhbiBlbXB0eSBvYmplY3Q6IHt9XG5cbiAgICB0aGlzLnNob3J0Y3V0cyA9IHRoaXMuY29uZmlnICYmIHRoaXMuY29uZmlnLnNob3J0Y3V0cyA/IHRoaXMuY29uZmlnLnNob3J0Y3V0cyA6IFsnY3RybCtzJywgJ21ldGErcyddO1xuXG4gICAgLy8gdGVtcG9yYXJ5IHdvcmthcm91bmQgdG8gZml4IHRoaXMgaXNzdWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9Lczg5L2FuZ3VsYXItbW9kYWwtZ2FsbGVyeS9pc3N1ZXMvMTQyXG4gICAgaWYgKHRoaXMuY29uZmlnICYmICF0aGlzLmNvbmZpZy5kaXNhYmxlU3NyV29ya2Fyb3VuZCkge1xuICAgICAgLy8gVG8gcHJldmVudCBpc3N1ZXMgd2l0aCBhbmd1bGFyLXVuaXZlcnNhbCBvbiBzZXJ2ZXItc2lkZVxuICAgICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnfgB7XG4gICAgICAgIHRoaXMubW91c2V0cmFwID0gbmV3ICg8YW55Pk1vdXNldHJhcCkoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogTWV0aG9kIHRvIGFkZCBhIGxpc3RlciBmb3IgY3RybCtzL2NtZCtzIGtleWJvYXJkIGV2ZW50cy5cbiAgICogQHBhcmFtIChlOiBFeHRlbmRlZEtleWJvYXJkRXZlbnQsIGNvbWJvOiBzdHJpbmcpID0+IGFueSBvbkJpbmQgY2FsbGJhY2sgZnVuY3Rpb24gdG8gYWRkIHNob3J0Y3V0c1xuICAgKi9cbiAgYWRkKG9uQmluZDogKGU6IEV4dGVuZGVfg2V5Ym9hcmRFdmVudCwgY29tYm86IHN0cmluZykgPT4gYW55fgB7XG4gICAgLy8gdGVtcG9yYXJ5IHdvcmthcm91bmQgdG8gZml4IHRoaXMgaXNzdWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9Lczg5L2FuZ3VsYXItbW9kYWwtZ2FsbGVyeS9pc3N1ZXMvMTQyXG4gICAgaWYgKHRoaXMuY29uZmlnICYmICF0aGlzLmNvbmZpZy5kaXNhYmxlU3NyV29ya2Fyb3VuZCkge1xuICAgICAgLy8gVG8gcHJldmVudCBpc3N1ZXMgd2l0aCBhbmd1bGFyLXVuaXZlcnNhbCBvbiBzZXJ2ZXItc2lkZVxuICAgICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnfgB7XG4gICAgICAgIHRoaXMubW91c2V0cmFwLmJpbmQodGhpcy5zaG9ydGN1dHMsIChldmVudDogS2V5Ym9hcmRFdmVudCwgY29tYm86IHN0cmluZykgPT4ge1xuICAgICAgICAgIGlmIChldmVudC5wcmV2ZW50RGVmYXVsdCkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gaW50ZXJuZXQgZXhwbG9yZXJcbiAgICAgICAgICAgIGV2ZW50LnJldHVyblZhbHVlID0gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICAgIG9uQmluZChldmVudCwgY29tYm8pO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogTWV0aG9kIHRvIHJlc2V0IGFsbCBsaXN0ZW5lcnMuIFBsZWFzZSwgY2FsbCB0aGlzIGZ1bmN0aW9uIHdoZW4gbmVlZGVkXG4gICAqIHRvIGZyZWUgcmVzb3VyY2VzIGFkIHByZXZlbnQgbGVha3MuXG4gICAqL1xuICByZXNldCgpIHtcbiAgICAvLyB0ZW1wb3Jhcnkgd29ya2Fyb3VuZCB0byBmaXggdGhpcyBpc3N1ZTogaHR0cHM6Ly9naXRodWIuY29tL0tzODkvYW5ndWxhci1tb2RhbC1nYWxsZXJ5L2lzc3Vlcy8xNDJcbiAgICBpZiAodGhpcy5jb25maWcgJiYgIXRoaXMuY29uZmlnLmRpc2FibGVTc3JXb3JrYXJvdW5kfgB7XG4gICAgICAvLyBUbyBwcmV2ZW50IGlzc3VlcyB3aXRoIGFuZ3VsYXItdW5pdmVyc2FsIG9uIHNlcnZlci1zaWRlXG4gICAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgdGhpcy5tb3VzZXRyYXAucmVzZXQoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiJdfQ==