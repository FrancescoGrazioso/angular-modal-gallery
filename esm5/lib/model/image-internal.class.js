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
import * as tslib_1 from "tslib";
import { Image } from './image.class';
/**
 * Internal representation of an image adding other fields
 * to the public `Image` class.
 */
var /**
 * Internal representation of an image adding other fields
 * to the public `Image` class.
 */
InternalLibImage = /** @class */ (function (_super) {
    tslib_1.__extends(InternalLibImage, _super);
    function InternalLibImage(id, modal, plain, previouslyLoaded) {
        if (previouslyLoaded === void 0) { previouslyLoaded = false; }
        var _this = _super.call(this, id, modal, plain) || this;
        _this.previouslyLoaded = previouslyLoaded;
        return _this;
    }
    return InternalLibImage;
}(Image));
/**
 * Internal representation of an image adding other fields
 * to the public `Image` class.
 */
export { InternalLibImage };
if (false) {
    /** @type {?} */
    InternalLibImage.prototype.previouslyLoaded;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1hZ2UtaW50ZXJuYWwuY2xhc3MuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9tb2RhbC1hbmd1bGFyLWdhbGxlcnkvIiwic291cmNlcyI6WyJsaWIvbW9kZWwvaW1hZ2UtaW50ZXJuYWwuY2xhc3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXdCQSxPQUFPLEVBQUUsS0FBSyxFQUEwQixNQUFNLGVBQWUsQ0FBQzs7Ozs7QUFNOUQ7Ozs7QUFBQTtJQUFzQyw0Q0FBSztJQUd6QywwQkFBWSxFQUFVLEVBQUUsS0FBaUIsRUFBRSxLQUFrQixFQUFFLGdCQUFpQztRQUFqQyxpQ0FBQSxFQUFBLHdCQUFpQztRQUFoRyxZQUNFLGtCQUFNLEVBQUUsRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDLFNBR3hCO1FBREMsS0FBSSxDQUFDLGdCQUFnQixHQUFHLGdCQUFnQixDQUFDOztLQUMxQzsyQkFyQ0g7RUE4QnNDLEtBQUssRUFRMUMsQ0FBQTs7Ozs7QUFSRCw0QkFRQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gVGhlIE1JVCBMaWNlbnNlIChNSVQpXG5cbiBDb3B5cmlnaHQgKGMpIDIwMTctMjAxOCBTdGVmYW5vIENhcHBhIChLczg5KVxuXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIifgIHRvIGRlYWxcbiBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4gdG8gdXNlLCBjb3B5LCBtb2RpZnfgIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG5cbiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBhbGxcbiBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT04gSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRVxuIFNPRlRXQVJFLlxuICovXG5cbmltcG9ydCB7IEltYWdlLCBNb2RhbEltYWdlLCBQbGFpbkltYWdlIH0gZnJvbSAnLi9pbWFnZS5jbGFzcyc7XG5cbi8qKlxuICogSW50ZXJuYWwgcmVwcmVzZW50YXRpb24gb2YgYW4gaW1hZ2UgYWRkaW5nIG90aGVyIGZpZWxkc1xuICogdG8gdGhlIHB1YmxpYyBgSW1hZ2VgIGNsYXNzLlxuICovXG5leHBvcnQgY2xhc3MgSW50ZXJuYWxMaWJJbWFnZSBleHRlbmRzIEltYWdlIHtcbiAgcHJldmlvdXNseUxvYWRlZDogYm9vbGVhbjtcblxuICBjb25zdHJ1Y3RvcihpZDogbnVtYmVyLCBtb2RhbDogTW9kYWxJbWFnZSwgcGxhaW4/OiBQbGFpbkltYWdlLCBwcmV2aW91c2x5TG9hZGVkOiBib29sZWFuID0gZmFsc2UpIHtcbiAgICBzdXBlcihpZCwgbW9kYWwsIHBsYWluKTtcblxuICAgIHRoaXMucHJldmlvdXNseUxvYWRlZCA9IHByZXZpb3VzbHlMb2FkZWQ7XG4gIH1cbn1cbiJdfQ==