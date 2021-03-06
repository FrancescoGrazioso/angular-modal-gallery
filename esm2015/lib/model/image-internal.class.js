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
import { Image } from './image.class';
/**
 * Internal representation of an image adding other fields
 * to the public `Image` class.
 */
export class InternalLibImage extends Image {
    /**
     * @param {?} id
     * @param {?} modal
     * @param {?=} plain
     * @param {?=} previouslyLoaded
     */
    constructor(id, modal, plain, previouslyLoaded = false) {
        super(id, modal, plain);
        this.previouslyLoaded = previouslyLoaded;
    }
}
if (false) {
    /** @type {?} */
    InternalLibImage.prototype.previouslyLoaded;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1hZ2UtaW50ZXJuYWwuY2xhc3MuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9tb2RhbC1hbmd1bGFyLWdhbGxlcnkvIiwic291cmNlcyI6WyJsaWIvbW9kZWwvaW1hZ2UtaW50ZXJuYWwuY2xhc3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBd0JBLE9BQU8sRUFBRSxLQUFLLEVBQTBCLE1BQU0sZUFBZSxDQUFDOzs7OztBQU05RCxNQUFNLHVCQUF3QixTQUFRLEtBQUs7Ozs7Ozs7SUFHekMsWUFBWSxFQUFVLEVBQUUsS0FBaUIsRUFBRSxLQUFrQixFQUFFLG1CQUE0QixLQUFLO1FBQzlGLEtBQUssQ0FBQyxFQUFFLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRXhCLElBQUfgQ0FBQyxnQkFBZ0IsR0FBRyxnQkFBZ0IsQ0FBQztLQUMxQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiBUaGUgTUlUIExpY2Vuc2UgKE1JVClcblxuIENvcHlyaWdodCAoYykgMjAxNy0yMDE4IFN0ZWZhbm8gQ2FwcGEgKEtzODkpXG5cbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwifgwgdG8gZGVhbFxuIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbiB0byB1c2UsIGNvcHfgIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcblxuIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIGFsbFxuIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG5cbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFfgXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTiBJTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiBMSUFCSUxJVFfgIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFXG4gU09GVFdBUkUuXG4gKi9cblxuaW1wb3J0IHsgSW1hZ2UsIE1vZGFsSW1hZ2UsIFBsYWluSW1hZ2UgfSBmcm9tICcuL2ltYWdlLmNsYXNzJztcblxuLyoqXG4gKiBJbnRlcm5hbCByZXByZXNlbnRhdGlvbiBvZiBhbiBpbWFnZSBhZGRpbmcgb3RoZXIgZmllbGRzXG4gKiB0byB0aGUgcHVibGljIGBJbWFnZWAgY2xhc3MuXG4gKi9cbmV4cG9ydCBjbGFzcyBJbnRlcm5hbExpYkltYWdlIGV4dGVuZHMgSW1hZ2Uge1xuICBwcmV2aW91c2x5TG9hZGVkOiBib29sZWFuO1xuXG4gIGNvbnN0cnVjdG9yKGlkOiBudW1iZXIsIG1vZGFsOiBNb2RhbEltYWdlLCBwbGFpbj86IFBsYWluSW1hZ2UsIHByZXZpb3VzbHlMb2FkZWQ6IGJvb2xlYW4gPSBmYWxzZSkge1xuICAgIHN1cGVyKGlkLCBtb2RhbCwgcGxhaW4pO1xuXG4gICAgdGhpcy5wcmV2aW91c2x5TG9hZGVkID0gcHJldmlvdXNseUxvYWRlZDtcbiAgfVxufVxuIl19