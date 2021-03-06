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
 * Interface `PlainGalleryConfig` to configure plain-gallery features.
 * @record
 */
export function PlainGalleryConfig() { }
/** @type {?} */
PlainGalleryConfig.prototype.strategy;
/** @type {?} */
PlainGalleryConfig.prototype.layout;
/** @type {?|undefined} */
PlainGalleryConfig.prototype.advanced;
/**
 * Interface `PlainGalleryLayout` to configure the layout. This interface isn't used directly, instead
 * refers to either `LineLayout`, `GridLayout` or `AdvancedLayout`.
 * @record
 */
export function PlainGalleryLayout() { }
/**
 * Class `LineLayout` to configure a linear plain gallery.
 */
export class LineLayout {
    /**
     * @param {?} size
     * @param {?} breakConfig
     * @param {?} justify
     */
    constructor(size, breakConfig, justify) {
        this.size = size;
        this.breakConfig = breakConfig;
        this.justify = justify;
    }
}
if (false) {
    /** @type {?} */
    LineLayout.prototype.breakConfig;
    /** @type {?} */
    LineLayout.prototype.justify;
    /** @type {?} */
    LineLayout.prototype.size;
}
/**
 * Class `GridLayout` to configure a grid plain gallery.
 */
export class GridLayout {
    /**
     * @param {?} size
     * @param {?} breakConfig
     */
    constructor(size, breakConfig) {
        this.size = size;
        this.breakConfig = breakConfig;
    }
}
if (false) {
    /** @type {?} */
    GridLayout.prototype.breakConfig;
    /** @type {?} */
    GridLayout.prototype.size;
}
/**
 * Class `AdvancedLayout` to configure a fully custom plain gallery.
 */
export class AdvancedLayout {
    /**
     * @param {?} modalOpenerByIndex
     * @param {?} hideDefaultPlainGallery
     */
    constructor(modalOpenerByIndex, hideDefaultPlainGallery) {
        this.modalOpenerByIndex = modalOpenerByIndex;
        this.hideDefaultPlainGallery = hideDefaultPlainGallery;
    }
}
if (false) {
    /** @type {?} */
    AdvancedLayout.prototype.modalOpenerByIndex;
    /** @type {?} */
    AdvancedLayout.prototype.hideDefaultPlainGallery;
}
/** @enum {number} */
const PlainGalleryStrategy = {
    // don't use 0 here
    // the first index is 1 and all of the following members are auto-incremented from that point on
    ROW: 1,
    COLUMN: 2,
    GRID: 3,
    CUSTOM: 4 // full custom strategy
    ,
};
export { PlainGalleryStrategy };
PlainGalleryStrategy[PlainGalleryStrategy.ROW] = 'ROW';
PlainGalleryStrategy[PlainGalleryStrategy.COLUMN] = 'COLUMN';
PlainGalleryStrategy[PlainGalleryStrategy.GRID] = 'GRID';
PlainGalleryStrategy[PlainGalleryStrategy.CUSTOM] = 'CUSTOM';
/**
 * Interface `BreakConfig` to limit the number of items of the plain gallery or to force it to fill other lines.
 * @record
 */
export function BreakConfig() { }
/** @type {?} */
BreakConfig.prototype.length;
/** @type {?} */
BreakConfig.prototype.wrap;
/**
 * Interface `AdvancedConfig` to use `<a>` tags instead of `<img>`.
 * It also contains a string property to customize the css background property.
 * For more info check here https://www.w3schools.com/cssref/css3_pr_background.asp
 * @record
 */
export function AdvancedConfig() { }
/** @type {?} */
AdvancedConfig.prototype.aTags;
/** @type {?} */
AdvancedConfig.prototype.additionalBackground;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxhaW4tZ2FsbGVyeS1jb25maWcuaW50ZXJmYWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbW9kYWwtYW5ndWxhci1nYWxsZXJ5LyIsInNvdXJjZXMiOlsibGliL21vZGVsL3BsYWluLWdhbGxlcnktY29uZmlnLmludGVyZmFjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTRDQSxNQUFNOzs7Ozs7SUFLSixZQUFZLElBQVUsRUFBRSxXQUF3QixFQUFFLE9BQWU7UUFDL0QsSUFBSSxDQUFDLElBQUfgR0FBRyxJQUFJLENBQUM7UUFDakIsSUFBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7UUFDL0IsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7S0FDeEI7Q0FDRjs7Ozs7Ozs7Ozs7O0FBS0QsTUFBTTs7Ozs7SUFJSixZQUFZLElBQVUsRUFBRSxXQUF3QjtRQUM5QyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUfgQ0FBQztRQUNqQixJQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztLQUNoQztDQUNGOzs7Ozs7Ozs7O0FBS0QsTUFBTTs7Ozs7SUFJSixZQUFZLGtCQUEwQixFQUFFLHVCQUFnQztRQUN0RSxJQUFJLENBQUMsa0JBQWtCLEdBQUcsa0JBQWtCLENBQUM7UUFDN0MsSUFBSSxDQUFDLHVCQUF1QixHQUFHLHVCQUF1QixDQUFDO0tBQ3hEO0NBQ0Y7Ozs7Ozs7Ozs7O0lBUUMsTUFBTztJQUNQLFNBQU07SUFDTixPQUFJO0lBQ0osU0FBTTs7OzswQ0FITixHQUFHOzBDQUNILE1BQU07MENBQ04sSUFBSTswQ0FDSixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiBUaGUgTUlUIExpY2Vuc2UgKE1JVClcblxuIENvcHlyaWdodCAoYykgMjAxNy0yMDE4IFN0ZWZhbm8gQ2FwcGEgKEtzODkpXG5cbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwifgwgdG8gZGVhbFxuIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbiB0byB1c2UsIGNvcHfgIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcblxuIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIGFsbFxuIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG5cbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFfgXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTiBJTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiBMSUFCSUxJVFfgIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFXG4gU09GVFdBUkUuXG4gKi9cblxuaW1wb3J0IHsgU2l6ZSB9IGZyb20gJy4vc2l6ZS5pbnRlcmZhY2UnO1xuXG4vKipcbiAqIEludGVyZmFjZSBgUGxhaW5HYWxsZXJ5Q29uZmlnYCB0byBjb25maWd1cmUgcGxhaW4tZ2FsbGVyeSBmZWF0dXJlcy5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBQbGFpbkdhbGxlcnlDb25maWcge1xuICBzdHJhdGVneTogUGxhaW5HYWxsZXJ5U3RyYXRlZ3k7XG4gIGxheW91dDogUGxhaW5HYWxsZXJ5TGF5b3V0O1xuICBhZHZhbmNlZD86IEFkdmFuY2VkQ29uZmlnO1xufVxuXG4vKipcbiAqIEludGVyZmFjZSBgUGxhaW5HYWxsZXJ5TGF5b3V0YCB0byBjb25maWd1cmUgdGhlIGxheW91dC4gVGhpcyBpbnRlcmZhY2UgaXNuJ3QgdXNlZCBkaXJlY3RseSwgaW5zdGVhZFxuICogcmVmZXJzIHRvIGVpdGhlciBgTGluZUxheW91dGAsIGBHcmlkTGF5b3V0YCBvciBgQWR2YW5jZWRMYXlvdXRgLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIFBsYWluR2FsbGVyeUxheW91dCB7fVxuXG4vKipcbiAqIENsYXNzIGBMaW5lTGF5b3V0YCB0byBjb25maWd1cmUgYSBsaW5lYXIgcGxhaW4gZ2FsbGVyeS5cbiAqL1xuZXhwb3J0IGNsYXNzIExpbmVMYXlvdXQgaW1wbGVtZW50cyBQbGFpbkdhbGxlcnlMYXlvdXQge1xuICBicmVha0NvbmZpZzogQnJlYWtDb25maWc7XG4gIGp1c3RpZnk6IHN0cmluZztcbiAgc2l6ZTogU2l6ZTtcblxuICBjb25zdHJ1Y3RvcihzaXplOiBTaXplLCBicmVha0NvbmZpZzogQnJlYWtDb25maWcsIGp1c3RpZnk6IHN0cmluZykge1xuICAgIHRoaXMuc2l6ZSA9IHNpemU7XG4gICAgdGhpcy5icmVha0NvbmZpZyA9IGJyZWFrQ29uZmlnO1xuICAgIHRoaXMuanVzdGlmeSA9IGp1c3RpZnk7XG4gIH1cbn1cblxuLyoqXG4gKiBDbGFzcyBgR3JpZExheW91dGAgdG8gY29uZmlndXJlIGEgZ3JpZCBwbGFpbiBnYWxsZXJ5LlxuICovXG5leHBvcnQgY2xhc3MgR3JpZExheW91dCBpbXBsZW1lbnRzIFBsYWluR2FsbGVyeUxheW91dCB7XG4gIGJyZWFrQ29uZmlnOiBCcmVha0NvbmZpZztcbiAgc2l6ZTogU2l6ZTtcblxuICBjb25zdHJ1Y3RvcihzaXplOiBTaXplLCBicmVha0NvbmZpZzogQnJlYWtDb25maWcpIHtcbiAgICB0aGlzLnNpemUgPSBzaXplO1xuICAgIHRoaXMuYnJlYWtDb25maWcgPSBicmVha0NvbmZpZztcbiAgfVxufVxuXG4vKipcbiAqIENsYXNzIGBBZHZhbmNlZExheW91dGAgdG8gY29uZmlndXJlIGEgZnVsbHkgY3VzdG9tIHBsYWluIGdhbGxlcnkuXG4gKi9cbmV4cG9ydCBjbGFzcyBBZHZhbmNlZExheW91dCBpbXBsZW1lbnRzIFBsYWluR2FsbGVyeUxheW91dCB7XG4gIG1vZGFsT3BlbmVyQnlJbmRleDogbnVtYmVyO1xuICBoaWRlRGVmYXVsdFBsYWluR2FsbGVyeTogYm9vbGVhbjtcblxuICBjb25zdHJ1Y3Rvcihtb2RhbE9wZW5lckJ5SW5kZXg6IG51bWJlciwgaGlkZURlZmF1bHRQbGFpbkdhbGxlcnk6IGJvb2xlYW4pIHtcbiAgICB0aGlzLm1vZGFsT3BlbmVyQnlJbmRleCA9IG1vZGFsT3BlbmVyQnlJbmRleDtcbiAgICB0aGlzLmhpZGVEZWZhdWx0UGxhaW5HYWxsZXJ5ID0gaGlkZURlZmF1bHRQbGFpbkdhbGxlcnk7XG4gIH1cbn1cblxuLyoqXG4gKiBFbnVtIGBQbGFpbkdhbGxlcnlTdHJhdGVneWAgdG8gY2hvb3NlIHRoZSBiZWhhdmlvdXIgb2YgdGhlIHBsYWluIGdhbGxlcnkuXG4gKi9cbmV4cG9ydCBlbnVtIFBsYWluR2FsbGVyeVN0cmF0ZWd5IHtcbiAgLy8gZG9uJ3QgdXNlIDAgaGVyZVxuICAvLyB0aGUgZmlyc3QgaW5kZXggaXMgMSBhbmQgYWxsIG9mIHRoZSBmb2xsb3dpbmcgbWVtYmVycyBhcmUgYXV0by1pbmNyZW1lbnRlZCBmcm9tIHRoYXQgcG9pbnQgb25cbiAgUk9XID0gMSxcbiAgQ09MVU1OLFxuICBHUklELFxuICBDVVNUT00gLy8gZnVsbCBjdXN0b20gc3RyYXRlZ3lcbn1cblxuLyoqXG4gKiBJbnRlcmZhY2UgYEJyZWFrQ29uZmlnYCB0byBsaW1pdCB0aGUgbnVtYmVyIG9mIGl0ZW1zIG9mIHRoZSBwbGFpbiBnYWxsZXJ5IG9yIHRvIGZvcmNlIGl0IHRvIGZpbGwgb3RoZXIgbGluZXMuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgQnJlYWtDb25maWcge1xuICBsZW5ndGg6IG51bWJlcjtcbiAgd3JhcDogYm9vbGVhbjtcbn1cblxuLyoqXG4gKiBJbnRlcmZhY2UgYEFkdmFuY2VkQ29uZmlnYCB0byB1c2UgYDxhPmAgdGFncyBpbnN0ZWFkIG9mIGA8aW1nPmAuXG4gKiBJdCBhbHNvIGNvbnRhaW5zIGEgc3RyaW5nIHByb3BlcnR5IHRvIGN1c3RvbWl6ZSB0aGUgY3NzIGJhY2tncm91bmQgcHJvcGVydHkuXG4gKiBGb3IgbW9yZSBpbmZvIGNoZWNrIGhlcmUgaHR0cHM6Ly93d3cudzNzY2hvb2xzLmNvbS9jc3NyZWYvY3NzM19wcl9iYWNrZ3JvdW5kLmFzcFxuICovXG5leHBvcnQgaW50ZXJmYWNlIEFkdmFuY2VkQ29uZmlnIHtcbiAgYVRhZ3M6IGJvb2xlYW47XG4gIGFkZGl0aW9uYWxCYWNrZ3JvdW5kOiBzdHJpbmc7XG59XG4iXX0=