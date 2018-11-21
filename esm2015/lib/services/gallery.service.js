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
import { EventEmitter, Injectable } from '@angular/core';
/**
 * @record
 */
export function InternalGalleryPayload() { }
/** @type {?} */
InternalGalleryPayload.prototype.galleryId;
/** @type {?} */
InternalGalleryPayload.prototype.index;
/** @type {?|undefined} */
InternalGalleryPayload.prototype.image;
export class GalleryService {
    constructor() {
        this.navigate = new EventEmitter();
        this.close = new EventEmitter();
        this.update = new EventEmitter();
    }
    /**
     * @param {?} galleryId
     * @param {?} index
     * @return {?}
     */
    openGallery(galleryId, index) {
        if (galleryId === undefined || galleryId < 0 || index < 0) {
            throw new Error('Cannot open gallery via GalleryService with either index<0 or galleryId<0 or galleryId===undefined');
        }
        this.navigate.emit({
            galleryId: galleryId,
            index: index
        });
    }
    /**
     * @param {?} galleryId
     * @return {?}
     */
    closeGallery(galleryId) {
        if (galleryId === undefined || galleryId < 0) {
            throw new Error('Cannot close gallery via GalleryService with galleryId<0 or galleryId===undefined');
        }
        this.close.emit(galleryId);
    }
    /**
     * @param {?} galleryId
     * @param {?} index
     * @param {?} image
     * @return {?}
     */
    updateGallery(galleryId, index, image) {
        if (galleryId === undefined || galleryId < 0 || index < 0) {
            throw new Error('Cannot update gallery via GalleryService with either index<0 or galleryId<0 or galleryId===undefined');
        }
        if (!image) {
            throw new Error('Cannot update gallery via GalleryService, because image is not valid');
        }
        this.update.emit({
            galleryId: galleryId,
            index: index,
            image: image
        });
    }
}
GalleryService.decorators = [
    { type: Injectable }
];
if (false) {
    /** @type {?} */
    GalleryService.prototype.navigate;
    /** @type {?} */
    GalleryService.prototype.close;
    /** @type {?} */
    GalleryService.prototype.update;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FsbGVyeS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbW9kYWwtYW5ndWxhci1nYWxsZXJ5LyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL2dhbGxlcnkuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF3QkEsT0FBTyxFQUFFLFlBQVfgRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozs7Ozs7Ozs7O0FBVXpELE1BQU07O3dCQUM2QyxJQUFJLFlBQVfgRUFBMEI7cUJBQzdELElBQUfgWUFBWSxFQUFVO3NCQUNULElBQUfgWUFBWSxFQUEwQjs7Ozs7OztJQUV6RixXQUFXLENBQUMsU0FBNkIsRUFBRSxLQUFhO1FBQ3RELElBQUfgU0FBUyxLQUFLLFNBQVMsSUFBSSxTQUFTLEdBQUcsQ0FBQyxJQUFJLEtBQUssR0FBRyxDQUFDLEVBQUU7WUFDekQsTUFBTSxJQUFJLEtBQUssQ0FBQyxvR0FBb0csQ0FBQyxDQUFDO1NBQ3ZIO1FBQ0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7WUFDakIsU0FBUyxFQUFFLFNBQVM7WUFDcEIsS0FBSyxFQUFFLEtBQUs7U0FDYixDQUFDLENBQUM7S0FDSjs7Ozs7SUFFRCxZQUFZLENBQUMsU0FBNkI7UUFDeEMsSUFBSSxTQUFTLEtBQUssU0FBUyxJQUFJLFNBQVMsR0FBRyxDQUFDLEVBQUU7WUFDNUMsTUFBTSxJQUFJLEtBQUssQ0FBQyxtRkFBbUYsQ0FBQyxDQUFDO1NBQ3RHO1FBQ0QsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7S0FDNUI7Ozs7Ozs7SUFFRCxhQUFhLENBQUMsU0FBNkIsRUFBRSxLQUFhLEVBQUUsS0FBWTtRQUN0RSxJQUFJLFNBQVMsS0FBSyxTQUFTLElBQUfgU0FBUyxHQUFHLENBQUMsSUFBSSxLQUFLLEdBQUcsQ0FBQyxFQUFFO1lBQ3pELE1BQU0sSUFBSSxLQUFLLENBQUMsc0dBQXNHLENBQUMsQ0FBQztTQUN6SDtRQUNELElBQUfgQ0FBQyxLQUFLLEVBQUU7WUFDVixNQUFNLElBQUfgS0FBSyxDQUFDLHNFQUFzRSxDQUFDLENBQUM7U0FDekY7UUFDRCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUfgQ0FBQztZQUNmLFNBQVMsRUFBRSxTQUFTO1lBQ3BCLEtBQUssRUFBRSxLQUFLO1lBQ1osS0FBSyxFQUFFLEtBQUs7U0FDYixDQUFDLENBQUM7S0FDSjs7O1lBbkNGLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuIFRoZSBNSVQgTGljZW5zZSAoTUlUKVxuXG4gQ29weXJpZ2h0IChjfgAyMDE3LTIwMTggU3RlZmFubyBDYXBwYSAoS3M4OSlcblxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbiBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuXG4gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsXG4gY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cblxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OIElORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEVcbiBTT0ZUV0FSRS5cbiAqL1xuXG5pbXBvcnQgeyBFdmVudEVtaXR0ZXIsIEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEltYWdlIH0gZnJvbSAnLi4vbW9kZWwvaW1hZ2UuY2xhc3MnO1xuXG5leHBvcnQgaW50ZXJmYWNlIEludGVybmFsR2FsbGVyeVBheWxvYWQge1xuICBnYWxsZXJ5SWQ6IG51bWJlcjtcbiAgaW5kZXg6IG51bWJlcjtcbiAgaW1hZ2U/OiBJbWFnZTtcbn1cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEdhbGxlcnlTZXJ2aWNlIHtcbiAgbmF2aWdhdGU6IEV2ZW50RW1pdHRlcjxJbnRlcm5hbEdhbGxlcnlQYXlsb2FkPiA9IG5ldyBFdmVudEVtaXR0ZXI8SW50ZXJuYWxHYWxsZXJ5UGF5bG9hZD4oKTtcbiAgY2xvc2U6IEV2ZW50RW1pdHRlcjxudW1iZXI+ID0gbmV3IEV2ZW50RW1pdHRlcjxudW1iZXI+KCk7XG4gIHVwZGF0ZTogRXZlbnRFbWl0dGVyPEludGVybmFsR2FsbGVyeVBheWxvYWQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxJbnRlcm5hbEdhbGxlcnlQYXlsb2FkPigpO1xuXG4gIG9wZW5HYWxsZXJ5KGdhbGxlcnlJZDogbnVtYmVyIHwgdW5kZWZpbmVkLCBpbmRleDogbnVtYmVyKTogdm9pZCB7XG4gICAgaWYgKGdhbGxlcnlJZCA9PT0gdW5kZWZpbmVkIHx8IGdhbGxlcnlJZCA8IDAgfHwgaW5kZXggPCAwfgB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Nhbm5vdCBvcGVuIGdhbGxlcnkgdmlhIEdhbGxlcnlTZXJ2aWNlIHdpdGggZWl0aGVyIGluZGV4PDAgb3IgZ2FsbGVyeUlkPDAgb3IgZ2FsbGVyeUlkPT09dW5kZWZpbmVkJyk7XG4gICAgfVxuICAgIHRoaXMubmF2aWdhdGUuZW1pdCh7XG4gICAgICBnYWxsZXJ5SWQ6IGdhbGxlcnlJZCxcbiAgICAgIGluZGV4OiBpbmRleFxuICAgIH0pO1xuICB9XG5cbiAgY2xvc2VHYWxsZXJ5KGdhbGxlcnlJZDogbnVtYmVyIHwgdW5kZWZpbmVkKTogdm9pZCB7XG4gICAgaWYgKGdhbGxlcnlJZCA9PT0gdW5kZWZpbmVkIHx8IGdhbGxlcnlJZCA8IDApIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignQ2Fubm90IGNsb3NlIGdhbGxlcnkgdmlhIEdhbGxlcnlTZXJ2aWNlIHdpdGggZ2FsbGVyeUlkPDAgb3IgZ2FsbGVyeUlkPT09dW5kZWZpbmVkJyk7XG4gICAgfVxuICAgIHRoaXMuY2xvc2UuZW1pdChnYWxsZXJ5SWQpO1xuICB9XG5cbiAgdXBkYXRlR2FsbGVyeShnYWxsZXJ5SWQ6IG51bWJlciB8IHVuZGVmaW5lZCwgaW5kZXg6IG51bWJlciwgaW1hZ2U6IEltYWdlKTogdm9pZCB7XG4gICAgaWYgKGdhbGxlcnlJZCA9PT0gdW5kZWZpbmVkIHx8IGdhbGxlcnlJZCA8IDAgfHwgaW5kZXggPCAwfgB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Nhbm5vdCB1cGRhdGUgZ2FsbGVyeSB2aWEgR2FsbGVyeVNlcnZpY2Ugd2l0aCBlaXRoZXIgaW5kZXg8MCBvciBnYWxsZXJ5SWQ8MCBvciBnYWxsZXJ5SWQ9PT11bmRlZmluZWQnKTtcbiAgICB9XG4gICAgaWYgKCFpbWFnZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdDYW5ub3QgdXBkYXRlIGdhbGxlcnkgdmlhIEdhbGxlcnlTZXJ2aWNlLCBiZWNhdXNlIGltYWdlIGlzIG5vdCB2YWxpZCcpO1xuICAgIH1cbiAgICB0aGlzLnVwZGF0ZS5lbWl0KHtcbiAgICAgIGdhbGxlcnlJZDogZ2FsbGVyeUlkLFxuICAgICAgaW5kZXg6IGluZGV4LFxuICAgICAgaW1hZ2U6IGltYWdlXG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==