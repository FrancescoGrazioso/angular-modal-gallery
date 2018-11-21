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
export class Image {
    /**
     * @param {?} id
     * @param {?} modal
     * @param {?=} plain
     */
    constructor(id, modal, plain) {
        this.id = id;
        this.modal = modal;
        this.plain = plain;
    }
}
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
export class ImageModalEvent {
    /**
     * @param {?} action
     * @param {?} result
     */
    constructor(action, result) {
        this.action = action;
        this.result = result;
    }
}
if (false) {
    /** @type {?} */
    ImageModalEvent.prototype.action;
    /** @type {?} */
    ImageModalEvent.prototype.result;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1hZ2UuY2xhc3MuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9tb2RhbC1hbmd1bGFyLWdhbGxlcnkvIiwic291cmNlcyI6WyJsaWIvbW9kZWwvaW1hZ2UuY2xhc3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWdDQSxNQUFNOzs7Ozs7SUFNSixZQUFZLEVBQVUsRUFBRSxLQUFpQixFQUFFLEtBQWtCO1FBQzNELElBQUfgQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDO1FBQ2IsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbkIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7S0FDcEI7Q0FDRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFnQ0QsTUFBTTs7Ozs7SUFJSixZQUFZLE1BQWMsRUFBRSxNQUF3QjtRQUNsRCxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUNyQixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztLQUN0QjtDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiBUaGUgTUlUIExpY2Vuc2UgKE1JVClcblxuIENvcHlyaWdodCAoYykgMjAxNy0yMDE4IFN0ZWZhbm8gQ2FwcGEgKEtzODkpXG5cbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwifgwgdG8gZGVhbFxuIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbiB0byB1c2UsIGNvcHfgIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcblxuIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIGFsbFxuIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG5cbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFfgXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTiBJTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiBMSUFCSUxJVFfgIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFXG4gU09GVFdBUkUuXG4gKi9cblxuaW1wb3J0IHsgQWN0aW9uIH0gZnJvbSAnLi9hY3Rpb24uZW51bSc7XG5pbXBvcnQgeyBTaXplIH0gZnJvbSAnLi9zaXplLmludGVyZmFjZSc7XG5pbXBvcnQgeyBTYWZlUmVzb3VyY2VVcmwgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcblxuLyoqXG4gKiBDbGFzcyBgSW1hZ2VgIHRoYXQgcmVwcmVzZW50cyBhbiBpbWFnZSB3aXRoIGJvdGggYG1vZGFsYCBhbmQgYHBsYWluYCBjb25maWd1cmF0aW9ucy5cbiAqIEJvdGggaW1hZ2UgYGlkYCBhbmQgYG1vZGFsYCBhcmUgbWFuZGF0b3J5LCBpbnN0ZWFkIGBwbGFpbmAgaXMgb3B0aW9uYWwuXG4gKi9cbmV4cG9ydCBjbGFzcyBJbWFnZSB7XG4gIGlkOiBudW1iZXI7XG5cbiAgbW9kYWw6IE1vZGFsSW1hZ2U7XG4gIHBsYWluPzogUGxhaW5JbWFnZTtcblxuICBjb25zdHJ1Y3RvcihpZDogbnVtYmVyLCBtb2RhbDogTW9kYWxJbWFnZSwgcGxhaW4/OiBQbGFpbkltYWdlfgB7XG4gICAgdGhpcy5pZCA9IGlkO1xuICAgIHRoaXMubW9kYWwgPSBtb2RhbDtcbiAgICB0aGlzLnBsYWluID0gcGxhaW47XG4gIH1cbn1cblxuLyoqXG4gKiBJbnRlcmZhY2UgYEltYWdlRGF0YWAgdG8gY29uZmlndXJlIGFuIGltYWdlLCBidXQgaXQgaXNuJ3QgdXNlZCBkaXJlY3RseS5cbiAqIFBsZWFzZSwgcmVmZXJzIHRvIGBQbGFpbkltYWdlYCBvciBgTW9kYWxJbWFnZWAuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgSW1hZ2VEYXRhIHtcbiAgaW1nOiBzdHJpbmcgfCBTYWZlUmVzb3VyY2VVcmw7XG4gIGRlc2NyaXB0aW9uPzogc3RyaW5nO1xuICB0aXRsZT86IHN0cmluZztcbiAgYWx0Pzogc3RyaW5nO1xuICBhcmlhTGFiZWw/OiBzdHJpbmc7XG59XG5cbi8qKlxuICogSW50ZXJmYWNlIGBNb2RhbEltYWdlYCB0byBjb25maWd1cmUgdGhlIG1vZGFsIGltYWdlLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIE1vZGFsSW1hZ2UgZXh0ZW5kcyBJbWFnZURhdGEge1xuICBleHRVcmw/OiBzdHJpbmc7XG4gIGRvd25sb2FkRmlsZU5hbWU/OiBzdHJpbmc7XG59XG5cbi8qKlxuICogSW50ZXJmYWNlIGBQbGFpbkltYWdlYCB0byBjb25maWd1cmUgdGhlIHBsYWluIGltYWdlLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIFBsYWluSW1hZ2UgZXh0ZW5kcyBJbWFnZURhdGEge1xuICBzaXplPzogU2l6ZTtcbn1cblxuLyoqXG4gKiBDbGFzcyBgSW1hZ2VNb2RhbEV2ZW50YCB0aGF0IHJlcHJlc2VudHMgdGhlIGV2ZW50IHBheWxvYWQgd2l0aCB0aGUgcmVzdWx0IGFuZCB0aGUgdHJpZ2dlcmVkIGFjdGlvbi5cbiAqL1xuZXhwb3J0IGNsYXNzIEltYWdlTW9kYWxFdmVudCB7XG4gIGFjdGlvbjogQWN0aW9uO1xuICByZXN1bHQ6IG51bWJlciB8IGJvb2xlYW47XG5cbiAgY29uc3RydWN0b3IoYWN0aW9uOiBBY3Rpb24sIHJlc3VsdDogbnVtYmVyIHwgYm9vbGVhbikge1xuICAgIHRoaXMuYWN0aW9uID0gYWN0aW9uO1xuICAgIHRoaXMucmVzdWx0ID0gcmVzdWx0O1xuICB9XG59XG4iXX0=