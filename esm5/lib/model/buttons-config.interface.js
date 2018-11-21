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
/**
 * Interface `ButtonsConfig` to add buttons, show/hide their, and to add the strategy.
 * @record
 */
export function ButtonsConfig() { }
/** @type {?} */
ButtonsConfig.prototype.visible;
/** @type {?} */
ButtonsConfig.prototype.strategy;
/** @type {?|undefined} */
ButtonsConfig.prototype.buttons;
/**
 * Interface `ButtonConfig` to configure a single button.
 * @record
 */
export function ButtonConfig() { }
/** @type {?|undefined} */
ButtonConfig.prototype.className;
/** @type {?|undefined} */
ButtonConfig.prototype.size;
/** @type {?|undefined} */
ButtonConfig.prototype.fontSize;
/** @type {?} */
ButtonConfig.prototype.type;
/** @type {?|undefined} */
ButtonConfig.prototype.title;
/** @type {?|undefined} */
ButtonConfig.prototype.ariaLabel;
/** @type {?|undefined} */
ButtonConfig.prototype.extUrlInNewTab;
/**
 * Interface `ButtonEvent` to represent the event payload when a button is clicked.
 * @record
 */
export function ButtonEvent() { }
/** @type {?} */
ButtonEvent.prototype.button;
/** @type {?} */
ButtonEvent.prototype.image;
/** @type {?} */
ButtonEvent.prototype.action;
/** @enum {number} */
var ButtonsStrategy = {
    // don't use 0 here
    // the first index is 1 and all of the following members are auto-incremented from that point on
    DEFAULT: 1,
    SIMPLE: 2,
    ADVANCED: 3,
    FULL: 4,
    CUSTOM: 5,
};
export { ButtonsStrategy };
ButtonsStrategy[ButtonsStrategy.DEFAULT] = 'DEFAULT';
ButtonsStrategy[ButtonsStrategy.SIMPLE] = 'SIMPLE';
ButtonsStrategy[ButtonsStrategy.ADVANCED] = 'ADVANCED';
ButtonsStrategy[ButtonsStrategy.FULL] = 'FULL';
ButtonsStrategy[ButtonsStrategy.CUSTOM] = 'CUSTOM';
/** @enum {number} */
var ButtonType = {
    // don't use 0 here
    // the first index is 1 and all of the following members are auto-incremented from that point on
    // REFRESH = 1,
    DELETE: 1,
    EXTURL: 2,
    DOWNLOAD: 3,
    CLOSE: 4,
    CUSTOM: 5,
    FULLSCREEN: 6,
};
export { ButtonType };
ButtonType[ButtonType.DELETE] = 'DELETE';
ButtonType[ButtonType.EXTURL] = 'EXTURL';
ButtonType[ButtonType.DOWNLOAD] = 'DOWNLOAD';
ButtonType[ButtonType.CLOSE] = 'CLOSE';
ButtonType[ButtonType.CUSTOM] = 'CUSTOM';
ButtonType[ButtonType.FULLSCREEN] = 'FULLSCREEN';
/** *
 * Array of admitted types of buttons.
  @type {?} */
export var WHITELIST_BUTTON_TYPES = [
    // ButtonType.REFRESH,
    ButtonType.FULLSCREEN,
    ButtonType.DELETE,
    ButtonType.EXTURL,
    ButtonType.DOWNLOAD,
    ButtonType.CLOSE,
    ButtonType.CUSTOM
];

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnV0dG9ucy1jb25maWcuaW50ZXJmYWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbW9kYWwtYW5ndWxhci1nYWxsZXJ5LyIsInNvdXJjZXMiOlsibGliL21vZGVsL2J1dHRvbnMtY29uZmlnLmludGVyZmFjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFpRUUsVUFBVztJQUNYLFNBQU07SUFDTixXQUFRO0lBQ1IsT0FBSTtJQUNKLFNBQU07OztnQ0FKTixPQUFPO2dDQUNQLE1BQU07Z0NBQ04sUUFBUTtnQ0FDUixJQUFJO2dDQUNKLE1BQU07Ozs7OztJQVVOLFNBQVU7SUFDVixTQUFNO0lBQ04sV0FBUTtJQUNSLFFBQUs7SUFDTCxTQUFNO0lBQ04sYUFBVTs7O3NCQUxWLE1BQU07c0JBQ04sTUFBTTtzQkFDTixRQUFRO3NCQUNSLEtBQUs7c0JBQ0wsTUFBTTtzQkFDTixVQUFVOzs7O0FBTVosV0FBYSxzQkFBc0IsR0FBaUI7O0lBRWxELFVBQVUsQ0FBQyxVQUFVO0lBQ3JCLFVBQVUsQ0FBQyxNQUFNO0lBQ2pCLFVBQVUsQ0FBQyxNQUFNO0lBQ2pCLFVBQVUsQ0FBQyxRQUFRO0lBQ25CLFVBQVUsQ0FBQyxLQUFLO0lBQ2hCLFVBQVUsQ0FBQyxNQUFNO0NBQ2xCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuIFRoZSBNSVQgTGljZW5zZSAoTUlUKVxuXG4gQ29weXJpZ2h0IChjfgAyMDE3LTIwMTggU3RlZmFubyBDYXBwYSAoS3M4OSlcblxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbiBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuXG4gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsXG4gY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cblxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OIElORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEVcbiBTT0ZUV0FSRS5cbiAqL1xuXG5pbXBvcnQgeyBBY3Rpb24gfSBmcm9tICcuL2FjdGlvbi5lbnVtJztcbmltcG9ydCB7IEludGVybmFsTGliSW1hZ2UgfSBmcm9tICcuL2ltYWdlLWludGVybmFsLmNsYXNzJztcbmltcG9ydCB7IFNpemUgfSBmcm9tICcuL3NpemUuaW50ZXJmYWNlJztcblxuLyoqXG4gKiBJbnRlcmZhY2UgYEJ1dHRvbnNDb25maWdgIHRvIGFkZCBidXR0b25zLCBzaG93L2hpZGUgdGhlaXIsIGFuZCB0byBhZGQgdGhlIHN0cmF0ZWd5LlxuICovXG5leHBvcnQgaW50ZXJmYWNlIEJ1dHRvbnNDb25maWcge1xuICB2aXNpYmxlOiBib29sZWFuO1xuICBzdHJhdGVneTogQnV0dG9uc1N0cmF0ZWd5O1xuICBidXR0b25zPzogQnV0dG9uQ29uZmlnW107XG59XG5cbi8qKlxuICogSW50ZXJmYWNlIGBCdXR0b25Db25maWdgIHRvIGNvbmZpZ3VyZSBhIHNpbmdsZSBidXR0b24uXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgQnV0dG9uQ29uZmlnIHtcbiAgY2xhc3NOYW1lPzogc3RyaW5nO1xuICBzaXplPzogU2l6ZTtcbiAgZm9udFNpemU/OiBzdHJpbmc7XG4gIHR5cGU6IEJ1dHRvblR5cGU7XG4gIHRpdGxlPzogc3RyaW5nO1xuICBhcmlhTGFiZWw/OiBzdHJpbmc7XG4gIGV4dFVybEluTmV3VGFiPzogYm9vbGVhbjsgLy8gdG8gb3BlbiB0aGUgZXh0ZXJuYWwgdXJsIGluIGEgbmV3IHRhYiwgaW5zdGVhZCBvZiB0aGUgY3VycmVudCBvbmVcbn1cblxuLyoqXG4gKiBJbnRlcmZhY2UgYEJ1dHRvbkV2ZW50YCB0byByZXByZXNlbnQgdGhlIGV2ZW50IHBheWxvYWQgd2hlbiBhIGJ1dHRvbiBpcyBjbGlja2VkLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIEJ1dHRvbkV2ZW50IHtcbiAgYnV0dG9uOiBCdXR0b25Db25maWc7XG4gIGltYWdlOiBJbnRlcm5hbExpYkltYWdlIHwgbnVsbDtcbiAgYWN0aW9uOiBBY3Rpb247XG59XG5cbi8qKlxuICogRW51bSBgQnV0dG9uc1N0cmF0ZWd5YCB0byBjb25maWd1cmUgdGhlIGxvZ2ljIG9mIGEgYnV0dG9uLlxuICovXG5leHBvcnQgZW51bSBCdXR0b25zU3RyYXRlZ3kge1xuICAvLyBkb24ndCB1c2UgMCBoZXJlXG4gIC8vIHRoZSBmaXJzdCBpbmRleCBpcyAxIGFuZCBhbGwgb2YgdGhlIGZvbGxvd2luZyBtZW1iZXJzIGFyZSBhdXRvLWluY3JlbWVudGVkIGZyb20gdGhhdCBwb2ludCBvblxuICBERUZBVUxUID0gMSxcbiAgU0lNUExFLFxuICBBRFZBTkNFRCxcbiAgRlVMTCxcbiAgQ1VTVE9NXG59XG5cbi8qKlxuICogRW51bSBgQnV0dG9uVHlwZWAgaXMgdGhlIHR5cGUgb2YgYSBidXR0b24uXG4gKi9cbmV4cG9ydCBlbnVtIEJ1dHRvblR5cGUge1xuICAvLyBkb24ndCB1c2UgMCBoZXJlXG4gIC8vIHRoZSBmaXJzdCBpbmRleCBpcyAxIGFuZCBhbGwgb2YgdGhlIGZvbGxvd2luZyBtZW1iZXJzIGFyZSBhdXRvLWluY3JlbWVudGVkIGZyb20gdGhhdCBwb2ludCBvblxuICAvLyBSRUZSRVNIID0gMSxcbiAgREVMRVRFID0gMSxcbiAgRVhUVVJMLFxuICBET1dOTE9BRCxcbiAgQ0xPU0UsXG4gIENVU1RPTSxcbiAgRlVMTFNDUkVFTlxufVxuXG4vKipcbiAqIEFycmF5IG9mIGFkbWl0dGVkIHR5cGVzIG9mIGJ1dHRvbnMuXG4gKi9cbmV4cG9ydCBjb25zdCBXSElURUxJU1RfQlVUVE9OX1RZUEVTOiBCdXR0b25UeXBlW10gPSBbXG4gIC8vIEJ1dHRvblR5cGUuUkVGUkVTSCxcbiAgQnV0dG9uVHlwZS5GVUxMU0NSRUVOLFxuICBCdXR0b25UeXBlLkRFTEVURSxcbiAgQnV0dG9uVHlwZS5FWFRVUkwsXG4gIEJ1dHRvblR5cGUuRE9XTkxPQUQsXG4gIEJ1dHRvblR5cGUuQ0xPU0UsXG4gIEJ1dHRvblR5cGUuQ1VTVE9NXG5dO1xuIl19