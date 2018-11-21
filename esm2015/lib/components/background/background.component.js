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
export class BackgroundComponent {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFja2dyb3VuZC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9tb2RhbC1hbmd1bGFyLWdhbGxlcnkvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9iYWNrZ3JvdW5kL2JhY2tncm91bmQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXdCQSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQzs7OztBQWExRSxNQUFNOzs7WUFOTCxTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGVBQWU7Z0JBRXpCLDJMQUE4QjtnQkFDOUIsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O2FBQ2hEOzs7cUJBTUUsS0FBSztrQ0FLTCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiBUaGUgTUlUIExpY2Vuc2UgKE1JVClcblxuIENvcHlyaWdodCAoYykgMjAxNy0yMDE4IFN0ZWZhbm8gQ2FwcGEgKEtzODkpXG5cbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwifgwgdG8gZGVhbFxuIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbiB0byB1c2UsIGNvcHfgIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcblxuIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIGFsbFxuIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG5cbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFfgXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTiBJTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiBMSUFCSUxJVFfgIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFXG4gU09GVFdBUkUuXG4gKi9cblxuaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3fgIENvbXBvbmVudCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgQWNjZXNzaWJpbGl0eUNvbmZpZyB9IGZyb20gJy4uLy4uL21vZGVsL2FjY2Vzc2liaWxpdHkuaW50ZXJmYWNlJztcblxuLyoqXG4gKiBDb21wb25lbnQgd2l0aCB0aGUgc2VtaS10cmFuc3BhcmVudCBiYWNrZ3JvdW5kLlxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdrcy1iYWNrZ3JvdW5kJyxcbiAgc3R5bGVVcmxzOiBbJ2JhY2tncm91bmQuc2NzcyddLFxuICB0ZW1wbGF0ZVVybDogJ2JhY2tncm91bmQuaHRtbCcsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIEJhY2tncm91bmRDb21wb25lbnQge1xuICAvKipcbiAgICogQm9vbGVhbiB0aGF0IGl0IGlzIHRydWUgaWYgdGhlIG1vZGFsIGdhbGxlcnkgaXMgdmlzaWJsZSxcbiAgICogc28gYWxzbyB0aGlzIGNvbXBvbmVudCBzaG91bGQgYmUgdmlzaWJsZS5cbiAgICovXG4gIEBJbnB1dCgpIGlzT3BlbjogYm9vbGVhbjtcbiAgLyoqXG4gICAqIE9iamVjdCBvZiB0eXBlIGBBY2Nlc3NpYmlsaXR5Q29uZmlnYCB0byBpbml0IGN1c3RvbSBhY2Nlc3NpYmlsaXR5IGZlYXR1cmVzLlxuICAgKiBGb3IgaW5zdGFuY2UsIGl0IGNvbnRhaW5zIHRpdGxlcywgYWx0IHRleHRzLCBhcmlhLWxhYmVscyBhbmQgc28gb24uXG4gICAqL1xuICBASW5wdXQofgBhY2Nlc3NpYmlsaXR5Q29uZmlnOiBBY2Nlc3NpYmlsaXR5Q29uZmlnO1xufVxuIl19