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
 * Class `Image` that represents an image with both `modal` and `plain` configurations.
 * Both image `id` and `modal` are mandatory, instead `plain` is optional.
 */
var /**
 * Class `Image` that represents an image with both `modal` and `plain` configurations.
 * Both image `id` and `modal` are mandatory, instead `plain` is optional.
 */
Image = /** @class */ (function () {
    function Image(id, modal, plain) {
        this.id = id;
        this.modal = modal;
        this.plain = plain;
    }
    return Image;
}());
/**
 * Class `Image` that represents an image with both `modal` and `plain` configurations.
 * Both image `id` and `modal` are mandatory, instead `plain` is optional.
 */
export { Image };
if (false) {
    /** @type {?} */
    Image.prototype.id;
    /** @type {?} */
    Image.prototype.modal;
    /** @type {?} */
    Image.prototype.plain;
}
/**
 * Interface `ImageData` to configure an image, but it isn't used directly.
 * Please, refers to `PlainImage` or `ModalImage`.
 * @record
 */
export function ImageData() { }
/** @type {?} */
ImageData.prototype.img;
/** @type {?|undefined} */
ImageData.prototype.description;
/** @type {?|undefined} */
ImageData.prototype.title;
/** @type {?|undefined} */
ImageData.prototype.alt;
/** @type {?|undefined} */
ImageData.prototype.ariaLabel;
/**
 * Interface `ModalImage` to configure the modal image.
 * @record
 */
export function ModalImage() { }
/** @type {?|undefined} */
ModalImage.prototype.extUrl;
/** @type {?|undefined} */
ModalImage.prototype.downloadFileName;
/**
 * Interface `PlainImage` to configure the plain image.
 * @record
 */
export function PlainImage() { }
/** @type {?|undefined} */
PlainImage.prototype.size;
/**
 * Class `ImageModalEvent` that represents the event payload with the result and the triggered action.
 */
var /**
 * Class `ImageModalEvent` that represents the event payload with the result and the triggered action.
 */
ImageModalEvent = /** @class */ (function () {
    function ImageModalEvent(action, result) {
        this.action = action;
        this.result = result;
    }
    return ImageModalEvent;
}());
/**
 * Class `ImageModalEvent` that represents the event payload with the result and the triggered action.
 */
export { ImageModalEvent };
if (false) {
    /** @type {?} */
    ImageModalEvent.prototype.action;
    /** @type {?} */
    ImageModalEvent.prototype.result;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1hZ2UuY2xhc3MuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9tb2RhbC1hbmd1bGFyLWdhbGxlcnkvIiwic291cmNlcyI6WyJsaWIvbW9kZWwvaW1hZ2UuY2xhc3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWdDQTs7OztBQUFBO0lBTUUsZUFBWSxFQUFVLEVBQUUsS0FBaUIsRUFBRSxLQUFrQjtRQUMzRCxJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQztRQUNiLElBQUfgQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ25CLElBQUfgQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO0tBQ3BCO2dCQTFDSDtJQTJDQyxDQUFBOzs7OztBQVhELGlCQVdDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWdDRDs7O0FBQUE7SUFJRSx5QkFBWSxNQUFjLEVBQUUsTUFBd0I7UUFDbEQsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDckIsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7S0FDdEI7MEJBbEZIO0lBbUZDLENBQUE7Ozs7QUFSRCwyQkFRQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gVGhlIE1JVCBMaWNlbnNlIChNSVQpXG5cbiBDb3B5cmlnaHQgKGMpIDIwMTctMjAxOCBTdGVmYW5vIENhcHBhIChLczg5KVxuXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIifgIHRvIGRlYWxcbiBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4gdG8gdXNlLCBjb3B5LCBtb2RpZnfgIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG5cbiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBhbGxcbiBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT04gSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRVxuIFNPRlRXQVJFLlxuICovXG5cbmltcG9ydCB7IEFjdGlvbiB9IGZyb20gJy4vYWN0aW9uLmVudW0nO1xuaW1wb3J0IHsgU2l6ZSB9IGZyb20gJy4vc2l6ZS5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgU2FmZVJlc291cmNlVXJsIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5cbi8qKlxuICogQ2xhc3MgYEltYWdlYCB0aGF0IHJlcHJlc2VudHMgYW4gaW1hZ2Ugd2l0aCBib3RoIGBtb2RhbGAgYW5kIGBwbGFpbmAgY29uZmlndXJhdGlvbnMuXG4gKiBCb3RoIGltYWdlIGBpZGAgYW5kIGBtb2RhbGAgYXJlIG1hbmRhdG9yeSwgaW5zdGVhZCBgcGxhaW5gIGlzIG9wdGlvbmFsLlxuICovXG5leHBvcnQgY2xhc3MgSW1hZ2Uge1xuICBpZDogbnVtYmVyO1xuXG4gIG1vZGFsOiBNb2RhbEltYWdlO1xuICBwbGFpbj86IFBsYWluSW1hZ2U7XG5cbiAgY29uc3RydWN0b3IoaWQ6IG51bWJlciwgbW9kYWw6IE1vZGFsSW1hZ2UsIHBsYWluPzogUGxhaW5JbWFnZSkge1xuICAgIHRoaXMuaWQgPSBpZDtcbiAgICB0aGlzLm1vZGFsID0gbW9kYWw7XG4gICAgdGhpcy5wbGFpbiA9IHBsYWluO1xuICB9XG59XG5cbi8qKlxuICogSW50ZXJmYWNlIGBJbWFnZURhdGFgIHRvIGNvbmZpZ3VyZSBhbiBpbWFnZSwgYnV0IGl0IGlzbid0IHVzZWQgZGlyZWN0bHkuXG4gKiBQbGVhc2UsIHJlZmVycyB0byBgUGxhaW5JbWFnZWAgb3IgYE1vZGFsSW1hZ2VgLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIEltYWdlRGF0YSB7XG4gIGltZzogc3RyaW5nIHwgU2FmZVJlc291cmNlVXJsO1xuICBkZXNjcmlwdGlvbj86IHN0cmluZztcbiAgdGl0bGU/OiBzdHJpbmc7XG4gIGFsdD86IHN0cmluZztcbiAgYXJpYUxhYmVsPzogc3RyaW5nO1xufVxuXG4vKipcbiAqIEludGVyZmFjZSBgTW9kYWxJbWFnZWAgdG8gY29uZmlndXJlIHRoZSBtb2RhbCBpbWFnZS5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBNb2RhbEltYWdlIGV4dGVuZHMgSW1hZ2VEYXRhIHtcbiAgZXh0VXJsPzogc3RyaW5nO1xuICBkb3dubG9hZEZpbGVOYW1lPzogc3RyaW5nO1xufVxuXG4vKipcbiAqIEludGVyZmFjZSBgUGxhaW5JbWFnZWAgdG8gY29uZmlndXJlIHRoZSBwbGFpbiBpbWFnZS5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBQbGFpbkltYWdlIGV4dGVuZHMgSW1hZ2VEYXRhIHtcbiAgc2l6ZT86IFNpemU7XG59XG5cbi8qKlxuICogQ2xhc3MgYEltYWdlTW9kYWxFdmVudGAgdGhhdCByZXByZXNlbnRzIHRoZSBldmVudCBwYXlsb2FkIHdpdGggdGhlIHJlc3VsdCBhbmQgdGhlIHRyaWdnZXJlZCBhY3Rpb24uXG4gKi9cbmV4cG9ydCBjbGFzcyBJbWFnZU1vZGFsRXZlbnQge1xuICBhY3Rpb246IEFjdGlvbjtcbiAgcmVzdWx0OiBudW1iZXIgfCBib29sZWFuO1xuXG4gIGNvbnN0cnVjdG9yKGFjdGlvbjogQWN0aW9uLCByZXN1bHQ6IG51bWJlciB8IGJvb2xlYW4pIHtcbiAgICB0aGlzLmFjdGlvbiA9IGFjdGlvbjtcbiAgICB0aGlzLnJlc3VsdCA9IHJlc3VsdDtcbiAgfVxufVxuIl19