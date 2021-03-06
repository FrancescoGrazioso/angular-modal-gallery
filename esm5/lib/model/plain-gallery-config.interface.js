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
var /**
 * Class `LineLayout` to configure a linear plain gallery.
 */
LineLayout = /** @class */ (function () {
    function LineLayout(size, breakConfig, justify) {
        this.size = size;
        this.breakConfig = breakConfig;
        this.justify = justify;
    }
    return LineLayout;
}());
/**
 * Class `LineLayout` to configure a linear plain gallery.
 */
export { LineLayout };
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
var /**
 * Class `GridLayout` to configure a grid plain gallery.
 */
GridLayout = /** @class */ (function () {
    function GridLayout(size, breakConfig) {
        this.size = size;
        this.breakConfig = breakConfig;
    }
    return GridLayout;
}());
/**
 * Class `GridLayout` to configure a grid plain gallery.
 */
export { GridLayout };
if (false) {
    /** @type {?} */
    GridLayout.prototype.breakConfig;
    /** @type {?} */
    GridLayout.prototype.size;
}
/**
 * Class `AdvancedLayout` to configure a fully custom plain gallery.
 */
var /**
 * Class `AdvancedLayout` to configure a fully custom plain gallery.
 */
AdvancedLayout = /** @class */ (function () {
    function AdvancedLayout(modalOpenerByIndex, hideDefaultPlainGallery) {
        this.modalOpenerByIndex = modalOpenerByIndex;
        this.hideDefaultPlainGallery = hideDefaultPlainGallery;
    }
    return AdvancedLayout;
}());
/**
 * Class `AdvancedLayout` to configure a fully custom plain gallery.
 */
export { AdvancedLayout };
if (false) {
    /** @type {?} */
    AdvancedLayout.prototype.modalOpenerByIndex;
    /** @type {?} */
    AdvancedLayout.prototype.hideDefaultPlainGallery;
}
/** @enum {number} */
var PlainGalleryStrategy = {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxhaW4tZ2FsbGVyeS1jb25maWcuaW50ZXJmYWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbW9kYWwtYW5ndWxhci1nYWxsZXJ5LyIsInNvdXJjZXMiOlsibGliL21vZGVsL3BsYWluLWdhbGxlcnktY29uZmlnLmludGVyZmFjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTRDQTs7O0FBQUE7SUFLRSxvQkFBWSxJQUFVLEVBQUUsV0FBd0IsRUFBRSxPQUFlO1FBQy9ELElBQUfgQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUfgQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO1FBQy9CLElBQUfgQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO0tBQ3hCO3FCQXJESDtJQXNEQyxDQUFBOzs7O0FBVkQsc0JBVUM7Ozs7Ozs7Ozs7OztBQUtEOzs7QUFBQTtJQUlFLG9CQUFZLElBQVUsRUFBRSxXQUF3QjtRQUM5QyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUfgQ0FBQztRQUNqQixJQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztLQUNoQztxQkFsRUg7SUFtRUMsQ0FBQTs7OztBQVJELHNCQVFDOzs7Ozs7Ozs7O0FBS0Q7OztBQUFBO0lBSUUsd0JBQVfga0JBQTBCLEVBQUUsdUJBQWdDO1FBQ3RFLElBQUfgQ0FBQyxrQkFBa0IsR0FBRyxrQkFBa0IsQ0FBQztRQUM3QyxJQUFJLENBQUMsdUJBQXVCLEdBQUcsdUJBQXVCLENBQUM7S0FDeEQ7eUJBL0VIO0lBZ0ZDLENBQUE7Ozs7QUFSRCwwQkFRQzs7Ozs7Ozs7Ozs7SUFRQyxNQUFPO0lBQ1AsU0FBTTtJQUNOLE9BQUk7SUFDSixTQUFNOzs7OzBDQUhOLEdBQUc7MENBQ0gsTUFBTTswQ0FDTixJQUFJOzBDQUNKLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuIFRoZSBNSVQgTGljZW5zZSAoTUlUKVxuXG4gQ29weXJpZ2h0IChjfgAyMDE3LTIwMTggU3RlZmFubyBDYXBwYSAoS3M4OSlcblxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbiBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuXG4gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsXG4gY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cblxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OIElORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEVcbiBTT0ZUV0FSRS5cbiAqL1xuXG5pbXBvcnQgeyBTaXplIH0gZnJvbSAnLi9zaXplLmludGVyZmFjZSc7XG5cbi8qKlxuICogSW50ZXJmYWNlIGBQbGFpbkdhbGxlcnlDb25maWdgIHRvIGNvbmZpZ3VyZSBwbGFpbi1nYWxsZXJ5IGZlYXR1cmVzLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIFBsYWluR2FsbGVyeUNvbmZpZyB7XG4gIHN0cmF0ZWd5OiBQbGFpbkdhbGxlcnlTdHJhdGVneTtcbiAgbGF5b3V0OiBQbGFpbkdhbGxlcnlMYXlvdXQ7XG4gIGFkdmFuY2VkPzogQWR2YW5jZWRDb25maWc7XG59XG5cbi8qKlxuICogSW50ZXJmYWNlIGBQbGFpbkdhbGxlcnlMYXlvdXRgIHRvIGNvbmZpZ3VyZSB0aGUgbGF5b3V0LiBUaGlzIGludGVyZmFjZSBpc24ndCB1c2VkIGRpcmVjdGx5LCBpbnN0ZWFkXG4gKiByZWZlcnMgdG8gZWl0aGVyIGBMaW5lTGF5b3V0YCwgYEdyaWRMYXlvdXRgIG9yIGBBZHZhbmNlZExheW91dGAuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgUGxhaW5HYWxsZXJ5TGF5b3V0IHt9XG5cbi8qKlxuICogQ2xhc3MgYExpbmVMYXlvdXRgIHRvIGNvbmZpZ3VyZSBhIGxpbmVhciBwbGFpbiBnYWxsZXJ5LlxuICovXG5leHBvcnQgY2xhc3MgTGluZUxheW91dCBpbXBsZW1lbnRzIFBsYWluR2FsbGVyeUxheW91dCB7XG4gIGJyZWFrQ29uZmlnOiBCcmVha0NvbmZpZztcbiAganVzdGlmeTogc3RyaW5nO1xuICBzaXplOiBTaXplO1xuXG4gIGNvbnN0cnVjdG9yKHNpemU6IFNpemUsIGJyZWFrQ29uZmlnOiBCcmVha0NvbmZpZywganVzdGlmeTogc3RyaW5nfgB7XG4gICAgdGhpcy5zaXplID0gc2l6ZTtcbiAgICB0aGlzLmJyZWFrQ29uZmlnID0gYnJlYWtDb25maWc7XG4gICAgdGhpcy5qdXN0aWZ5ID0ganVzdGlmeTtcbiAgfVxufVxuXG4vKipcbiAqIENsYXNzIGBHcmlkTGF5b3V0YCB0byBjb25maWd1cmUgYSBncmlkIHBsYWluIGdhbGxlcnkuXG4gKi9cbmV4cG9ydCBjbGFzcyBHcmlkTGF5b3V0IGltcGxlbWVudHMgUGxhaW5HYWxsZXJ5TGF5b3V0IHtcbiAgYnJlYWtDb25maWc6IEJyZWFrQ29uZmlnO1xuICBzaXplOiBTaXplO1xuXG4gIGNvbnN0cnVjdG9yKHNpemU6IFNpemUsIGJyZWFrQ29uZmlnOiBCcmVha0NvbmZpZykge1xuICAgIHRoaXMuc2l6ZSA9IHNpemU7XG4gICAgdGhpcy5icmVha0NvbmZpZyA9IGJyZWFrQ29uZmlnO1xuICB9XG59XG5cbi8qKlxuICogQ2xhc3MgYEFkdmFuY2VkTGF5b3V0YCB0byBjb25maWd1cmUgYSBmdWxseSBjdXN0b20gcGxhaW4gZ2FsbGVyeS5cbiAqL1xuZXhwb3J0IGNsYXNzIEFkdmFuY2VkTGF5b3V0IGltcGxlbWVudHMgUGxhaW5HYWxsZXJ5TGF5b3V0IHtcbiAgbW9kYWxPcGVuZXJCeUluZGV4OiBudW1iZXI7XG4gIGhpZGVEZWZhdWx0UGxhaW5HYWxsZXJ5OiBib29sZWFuO1xuXG4gIGNvbnN0cnVjdG9yKG1vZGFsT3BlbmVyQnlJbmRleDogbnVtYmVyLCBoaWRlRGVmYXVsdFBsYWluR2FsbGVyeTogYm9vbGVhbikge1xuICAgIHRoaXMubW9kYWxPcGVuZXJCeUluZGV4ID0gbW9kYWxPcGVuZXJCeUluZGV4O1xuICAgIHRoaXMuaGlkZURlZmF1bHRQbGFpbkdhbGxlcnkgPSBoaWRlRGVmYXVsdFBsYWluR2FsbGVyeTtcbiAgfVxufVxuXG4vKipcbiAqIEVudW0gYFBsYWluR2FsbGVyeVN0cmF0ZWd5YCB0byBjaG9vc2UgdGhlIGJlaGF2aW91ciBvZiB0aGUgcGxhaW4gZ2FsbGVyeS5cbiAqL1xuZXhwb3J0IGVudW0gUGxhaW5HYWxsZXJ5U3RyYXRlZ3kge1xuICAvLyBkb24ndCB1c2UgMCBoZXJlXG4gIC8vIHRoZSBmaXJzdCBpbmRleCBpcyAxIGFuZCBhbGwgb2YgdGhlIGZvbGxvd2luZyBtZW1iZXJzIGFyZSBhdXRvLWluY3JlbWVudGVkIGZyb20gdGhhdCBwb2ludCBvblxuICBST1cgPSAxLFxuICBDT0xVTU4sXG4gIEdSSUQsXG4gIENVU1RPTSAvLyBmdWxsIGN1c3RvbSBzdHJhdGVneVxufVxuXG4vKipcbiAqIEludGVyZmFjZSBgQnJlYWtDb25maWdgIHRvIGxpbWl0IHRoZSBudW1iZXIgb2YgaXRlbXMgb2YgdGhlIHBsYWluIGdhbGxlcnkgb3IgdG8gZm9yY2UgaXQgdG8gZmlsbCBvdGhlciBsaW5lcy5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBCcmVha0NvbmZpZyB7XG4gIGxlbmd0aDogbnVtYmVyO1xuICB3cmFwOiBib29sZWFuO1xufVxuXG4vKipcbiAqIEludGVyZmFjZSBgQWR2YW5jZWRDb25maWdgIHRvIHVzZSBgPGE+YCB0YWdzIGluc3RlYWQgb2YgYDxpbWc+YC5cbiAqIEl0IGFsc28gY29udGFpbnMgYSBzdHJpbmcgcHJvcGVydHkgdG8gY3VzdG9taXplIHRoZSBjc3MgYmFja2dyb3VuZCBwcm9wZXJ0eS5cbiAqIEZvciBtb3JlIGluZm8gY2hlY2sgaGVyZSBodHRwczovL3d3dy53M3NjaG9vbHMuY29tL2Nzc3JlZi9jc3MzX3ByX2JhY2tncm91bmQuYXNwXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgQWR2YW5jZWRDb25maWcge1xuICBhVGFnczogYm9vbGVhbjtcbiAgYWRkaXRpb25hbEJhY2tncm91bmQ6IHN0cmluZztcbn1cbiJdfQ==