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
export var KEYBOARD_CONFIGURATION = new InjectionToken('KEYBOARD_CONFIGURATION');
/**
 * Service to intercept ctrl+s (or cmd+s on macOS) using a third-party library, called Mousetrap.
 */
var KeyboardService = /** @class */ (function () {
    /**
     * Constructor of `KeyboardService` to init `mousetrap` and `shortcuts` private variables.
     * @param KeyboardServiceConfig config object received by the `forRoot()` function to init custom shortcuts
     */
    function KeyboardService(config) {
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
     * @param (e: ExtendedKeyboardEvent, combo: string) => any onBind callback function to add shortcuts
     */
    /**
     * Method to add a lister for ctrl+s/cmd+s keyboard events.
     * @param {?} onBind
     * @return {?}
     */
    KeyboardService.prototype.add = /**
     * Method to add a lister for ctrl+s/cmd+s keyboard events.
     * @param {?} onBind
     * @return {?}
     */
    function (onBind) {
        // temporary workaround to fix this issue: https://github.com/fg96/angular-modal-gallery/issues/142
        if (this.config && !this.config.disableSsrWorkaround) {
            // To prevent issues with angular-universal on server-side
            if (typeof window !== 'undefined') {
                this.mousetrap.bind(this.shortcuts, function (event, combo) {
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
    };
    /**
     * Method to reset all listeners. Please, call this function when needed
     * to free resources ad prevent leafg.
     */
    /**
     * Method to reset all listeners. Please, call this function when needed
     * to free resources ad prevent leafg.
     * @return {?}
     */
    KeyboardService.prototype.reset = /**
     * Method to reset all listeners. Please, call this function when needed
     * to free resources ad prevent leafg.
     * @return {?}
     */
    function () {
        // temporary workaround to fix this issue: https://github.com/fg96/angular-modal-gallery/issues/142
        if (this.config && !this.config.disableSsrWorkaround) {
            // To prevent issues with angular-universal on server-side
            if (typeof window !== 'undefined') {
                this.mousetrap.reset();
            }
        }
    };
    KeyboardService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    KeyboardService.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [KEYBOARD_CONFIGURATION,] }] }
    ]; };
    return KeyboardService;
}());
export { KeyboardService };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia2V5Ym9hcmQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL21vZGFsLWFuZ3VsYXItZ2FsbGVyeS8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlcy9rZXlib2FyZC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXdCQSxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxjQUFjLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBSW5FLFdBQWEsc0JBQXNCLEdBQUcsSUFBSSxjQUFjLENBQXdCLHdCQUF3QixDQUFDLENBQUM7Ozs7O0lBZ0J4Rzs7O09BR0c7SUFDSCx5QkFBb0QsTUFBNkI7OztRQUE3QixXQUFNLEdBQU4sTUFBTSxDQUF1QjtRQUkvRSxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUfgQ0FBQyxNQUFNLElBQUfgSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUfgQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQzs7UUFHckcsSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxvQkFBb0IsRUFBRTs7WUFFcEQsSUFBSSxPQUFPLE1BQU0sS0FBSyxXQUFXLEVBQUU7Z0JBQ2pDLElBQUfgQ0FBQyxTQUFTLEdBQUcsSUFBSSxtQkFBTSxTQUFTLEVBQUMsRUFBRSxDQUFDO2FBQ3pDO1NBQ0Y7S0FDRjtJQUVEOzs7T0FHRzs7Ozs7O0lBQ0gsNkJBQUc7Ozs7O0lBQUgsVUFBSSxNQUF3RDs7UUFFMUQsSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxvQkFBb0IsRUFBRTs7WUFFcEQsSUFBSSxPQUFPLE1BQU0sS0FBSyxXQUFXLEVBQUU7Z0JBQ2pDLElBQUfgQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUfgQ0FBQyxTQUFTLEVBQUUsVUFBQyxLQUFvQixFQUFFLEtBQWE7b0JBQ3RFLElBQUfgS0FBSyxDQUFDLGNBQWMsRUFBRTt3QkFDeEIsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO3FCQUN4Qjt5QkFBTTs7d0JBRUwsS0FBSyxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7cUJBQzNCO29CQUNELE1BQU0sQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7aUJBQ3RCLENBQUMsQ0FBQzthQUNKO1NBQ0Y7S0FDRjtJQUVEOzs7T0FHRzs7Ozs7O0lBQ0gsK0JBQUs7Ozs7O0lBQUw7O1FBRUUsSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxvQkFBb0IsRUFBRTs7WUFFcEQsSUFBSSxPQUFPLE1BQU0sS0FBSyxXQUFXLEVBQUU7Z0JBQ2pDLElBQUfgQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLENBQUM7YUFDeEI7U0FDRjtLQUNGOztnQkFoRUYsVUFBVTs7OztnREFlSSxNQUFNLFNBQUMsc0JBQXNCOzswQkFoRDVDOztTQWtDYSxlQUFlIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiBUaGUgTUlUIExpY2Vuc2UgKE1JVClcblxuIENvcHlyaWdodCAoYykgMjAxNy0yMDE4IFN0ZWZhbm8gQ2FwcGEgKEtzODkpXG5cbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwifgwgdG8gZGVhbFxuIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbiB0byB1c2UsIGNvcHfgIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcblxuIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIGFsbFxuIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG5cbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFfgXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTiBJTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiBMSUFCSUxJVFfgIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFXG4gU09GVFdBUkUuXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlLCBJbmplY3Rpb25Ub2tlbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBLZXlib2FyZFNlcnZpY2VDb25maWcgfSBmcm9tICcuLi9tb2RlbC9rZXlib2FyZC1zZXJ2aWNlLWNvbmZpZy5pbnRlcmZhY2UnO1xuXG5leHBvcnQgY29uc3QgS0VZQk9BUkRfQ09ORklHVVJBVElPTiA9IG5ldyBJbmplY3Rpb25Ub2tlbjxLZXlib2FyZFNlcnZpY2VDb25maWc+KCdLRVlCT0FSRF9DT05GSUdVUkFUSU9OJyk7XG5cbi8qKlxuICogU2VydmljZSB0byBpbnRlcmNlcHQgY3RybCtzIChvciBjbWQrcyBvbiBtYWNPUykgdXNpbmcgYSB0aGlyZC1wYXJ0eSBsaWJyYXJ5LCBjYWxsZWQgTW91c2V0cmFwLlxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgS2V5Ym9hcmRTZXJ2aWNlIHtcbiAgLyoqXG4gICAqIFByaXZhdGUgTW91c2V0cmFwIHZhcmlhYmxlIHRvIHN0b3JlIHRoZSBpbnN0YW5jZS5cbiAgICovXG4gIHByaXZhdGUgbW91c2V0cmFwOiBNb3VzZXRyYXBJbnN0YW5jZTtcbiAgLyoqXG4gICAqIFByaXZhdGUgdmFyaWFibGUgdG8gc3RvcmUgc2hvcnRjdXRzIGFzIGVpdGhlciBBcnJheSBvciBzdHJpbmcuXG4gICAqL1xuICBwcml2YXRlIHNob3J0Y3V0czogQXJyYXk8c3RyaW5nPiB8IHN0cmluZztcblxuICAvKipcbiAgICogQ29uc3RydWN0b3Igb2YgYEtleWJvYXJkU2VydmljZWAgdG8gaW5pdCBgbW91c2V0cmFwYCBhbmQgYHNob3J0Y3V0c2AgcHJpdmF0ZSB2YXJpYWJsZXMuXG4gICAqIEBwYXJhbSBLZXlib2FyZFNlcnZpY2VDb25maWcgY29uZmlnIG9iamVjdCByZWNlaXZlZCBieSB0aGUgYGZvclJvb3QoKWAgZnVuY3Rpb24gdG8gaW5pdCBjdXN0b20gc2hvcnRjdXRzXG4gICAqL1xuICBjb25zdHJ1Y3RvcihASW5qZWN0KEtFWUJPQVJEX0NPTkZJR1VSQVRJT04pIHByaXZhdGUgY29uZmlnOiBLZXlib2FyZFNlcnZpY2VDb25maWcpIHtcbiAgICAvLyB0aGlzLmNvbmZpZyBpcyBhbHdheXMgZGVmaW5lZCwgYmVjYXVzZSBmb3JjZWQgYnkgZm9yUm9vdCBpbnNpZGUgdGhlIG1vZHVsZVxuICAgIC8vIHdoZW4gZW1wdHfgIGl0J3Mgc2ltcGx5IGFuIGVtcHR5IG9iamVjdDoge31cblxuICAgIHRoaXMuc2hvcnRjdXRzID0gdGhpcy5jb25maWcgJiYgdGhpcy5jb25maWcuc2hvcnRjdXRzID8gdGhpcy5jb25maWcuc2hvcnRjdXRzIDogWydjdHJsK3MnLCAnbWV0YStzJ107XG5cbiAgICAvLyB0ZW1wb3Jhcnkgd29ya2Fyb3VuZCB0byBmaXggdGhpcyBpc3N1ZTogaHR0cHM6Ly9naXRodWIuY29tL0tzODkvYW5ndWxhci1tb2RhbC1nYWxsZXJ5L2lzc3Vlcy8xNDJcbiAgICBpZiAodGhpcy5jb25maWcgJiYgIXRoaXMuY29uZmlnLmRpc2FibGVTc3JXb3JrYXJvdW5kfgB7XG4gICAgICAvLyBUbyBwcmV2ZW50IGlzc3VlcyB3aXRoIGFuZ3VsYXItdW5pdmVyc2FsIG9uIHNlcnZlci1zaWRlXG4gICAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgdGhpcy5tb3VzZXRyYXAgPSBuZXcgKDxhbnk+TW91c2V0cmFwfggpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBNZXRob2QgdG8gYWRkIGEgbGlzdGVyIGZvciBjdHJsK3MvY21kK3Mga2V5Ym9hcmQgZXZlbnRzLlxuICAgKiBAcGFyYW0gKGU6IEV4dGVuZGVfg2V5Ym9hcmRFdmVudCwgY29tYm86IHN0cmluZykgPT4gYW55IG9uQmluZCBjYWxsYmFjayBmdW5jdGlvbiB0byBhZGQgc2hvcnRjdXRzXG4gICAqL1xuICBhZGQob25CaW5kOiAoZTogRXh0ZW5kZWRLZXlib2FyZEV2ZW50LCBjb21ibzogc3RyaW5nfgA9PiBhbnkpIHtcbiAgICAvLyB0ZW1wb3Jhcnkgd29ya2Fyb3VuZCB0byBmaXggdGhpcyBpc3N1ZTogaHR0cHM6Ly9naXRodWIuY29tL0tzODkvYW5ndWxhci1tb2RhbC1nYWxsZXJ5L2lzc3Vlcy8xNDJcbiAgICBpZiAodGhpcy5jb25maWcgJiYgIXRoaXMuY29uZmlnLmRpc2FibGVTc3JXb3JrYXJvdW5kfgB7XG4gICAgICAvLyBUbyBwcmV2ZW50IGlzc3VlcyB3aXRoIGFuZ3VsYXItdW5pdmVyc2FsIG9uIHNlcnZlci1zaWRlXG4gICAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgdGhpcy5tb3VzZXRyYXAuYmluZCh0aGlzLnNob3J0Y3V0cywgKGV2ZW50OiBLZXlib2FyZEV2ZW50LCBjb21ibzogc3RyaW5nfgA9PiB7XG4gICAgICAgICAgaWYgKGV2ZW50LnByZXZlbnREZWZhdWx0fgB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBpbnRlcm5ldCBleHBsb3JlclxuICAgICAgICAgICAgZXZlbnQucmV0dXJuVmFsdWUgPSBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgb25CaW5kKGV2ZW50LCBjb21ibyk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBNZXRob2QgdG8gcmVzZXQgYWxsIGxpc3RlbmVycy4gUGxlYXNlLCBjYWxsIHRoaXMgZnVuY3Rpb24gd2hlbiBuZWVkZWRcbiAgICogdG8gZnJlZSByZXNvdXJjZXMgYWQgcHJldmVudCBsZWFrcy5cbiAgICovXG4gIHJlc2V0KCkge1xuICAgIC8vIHRlbXBvcmFyeSB3b3JrYXJvdW5kIHRvIGZpeCB0aGlzIGlzc3VlOiBodHRwczovL2dpdGh1Yi5jb20vS3M4OS9hbmd1bGFyLW1vZGFsLWdhbGxlcnkvaXNzdWVzLzE0MlxuICAgIGlmICh0aGlzLmNvbmZpZyAmJiAhdGhpcy5jb25maWcuZGlzYWJsZVNzcldvcmthcm91bmQpIHtcbiAgICAgIC8vIFRvIHByZXZlbnQgaXNzdWVzIHdpdGggYW5ndWxhci11bml2ZXJzYWwgb24gc2VydmVyLXNpZGVcbiAgICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICB0aGlzLm1vdXNldHJhcC5yZXNldCgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl19