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
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
/**
 * Component with the semi-transparent background.
 */
var BackgroundComponent = /** @class */ (function () {
    function BackgroundComponent() {
    }
    BackgroundComponent.decorators = [
        { type: Component, args: [{
                    selector: 'fg-background',
                    template: "<div class=\"ng-overlay\" *ngIf=\"isOpen\"\n     [attr.aria-label]=\"accessibilityConfig?.backgroundAriaLabel\"\n     [title]=\"accessibilityConfig?.backgroundTitle\"></div>\n",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: [".ng-overlay{position:fixed;top:0;left:0;width:100vw;height:100vh;background:#000;opacity:.8;z-index:9999}"]
                }] }
    ];
    BackgroundComponent.propDecorators = {
        isOpen: [{ type: Input }],
        accessibilityConfig: [{ type: Input }]
    };
    return BackgroundComponent;
}());
export { BackgroundComponent };
if (false) {
    /**
     * Boolean that it is true if the modal gallery is visible,
     * so also this component should be visible.
     * @type {?}
     */
    BackgroundComponent.prototype.isOpen;
    /**
     * Object of type `AccessibilityConfig` to init custom accessibility features.
     * For instance, it contains titles, alt texts, aria-labels and so on.
     * @type {?}
     */
    BackgroundComponent.prototype.accessibilityConfig;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFja2dyb3VuZC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9tb2RhbC1hbmd1bGFyLWdhbGxlcnkvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9iYWNrZ3JvdW5kL2JhY2tncm91bmQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXdCQSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQzs7Ozs7Ozs7Z0JBT3pFLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsZUFBZTtvQkFFekIsMkxBQThCO29CQUM5QixlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7aUJBQ2hEOzs7eUJBTUUsS0FBSztzQ0FLTCxLQUFLOzs4QkEvQ1I7O1NBcUNhLG1CQUFtQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gVGhlIE1JVCBMaWNlbnNlIChNSVQpXG5cbiBDb3B5cmlnaHQgKGMpIDIwMTctMjAxOCBTdGVmYW5vIENhcHBhIChLczg5KVxuXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIifgIHRvIGRlYWxcbiBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4gdG8gdXNlLCBjb3B5LCBtb2RpZnfgIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG5cbiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBhbGxcbiBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT04gSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRVxuIFNPRlRXQVJFLlxuICovXG5cbmltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IEFjY2Vzc2liaWxpdHlDb25maWcgfSBmcm9tICcuLi8uLi9tb2RlbC9hY2Nlc3NpYmlsaXR5LmludGVyZmFjZSc7XG5cbi8qKlxuICogQ29tcG9uZW50IHdpdGggdGhlIHNlbWktdHJhbnNwYXJlbnQgYmFja2dyb3VuZC5cbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAna3MtYmFja2dyb3VuZCcsXG4gIHN0eWxlVXJsczogWydiYWNrZ3JvdW5kLnNjc3MnXSxcbiAgdGVtcGxhdGVVcmw6ICdiYWNrZ3JvdW5kLmh0bWwnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBCYWNrZ3JvdW5kQ29tcG9uZW50IHtcbiAgLyoqXG4gICAqIEJvb2xlYW4gdGhhdCBpdCBpcyB0cnVlIGlmIHRoZSBtb2RhbCBnYWxsZXJ5IGlzIHZpc2libGUsXG4gICAqIHNvIGFsc28gdGhpcyBjb21wb25lbnQgc2hvdWxkIGJlIHZpc2libGUuXG4gICAqL1xuICBASW5wdXQofgBpc09wZW46IGJvb2xlYW47XG4gIC8qKlxuICAgKiBPYmplY3Qgb2YgdHlwZSBgQWNjZXNzaWJpbGl0eUNvbmZpZ2AgdG8gaW5pdCBjdXN0b20gYWNjZXNzaWJpbGl0eSBmZWF0dXJlcy5cbiAgICogRm9yIGluc3RhbmNlLCBpdCBjb250YWlucyB0aXRsZXMsIGFsdCB0ZXh0cywgYXJpYS1sYWJlbHMgYW5kIHNvIG9uLlxuICAgKi9cbiAgQElucHV0KCkgYWNjZXNzaWJpbGl0eUNvbmZpZzogQWNjZXNzaWJpbGl0eUNvbmZpZztcbn1cbiJdfQ==