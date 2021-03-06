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
 * Utility function to get the index of the input `image` from `arrayOfImages`
 * @throws an Error if either image or arrayOfImages are not valid,
 *  or if the input image doesn't contain an 'id', or the 'id' is < 0
 * @param {?} image
 * @param {?} arrayOfImages
 * @return {?} number the index of the image. -1 if not found.
 */
export function getIndex(image, arrayOfImages) {
    if (!image) {
        throw new Error('image must be a valid Image object');
    }
    if (!arrayOfImages) {
        throw new Error('arrayOfImages must be a valid Image[]');
    }
    if (!image.id && image.id !== 0) {
        // id = 0 is admitted
        throw new Error("A numeric Image 'id' is mandatory");
    }
    if (image.id < 0) {
        throw new Error("Image 'id' must be >= 0");
    }
    return arrayOfImages.findIndex(function (val) { return val.id === image.id; });
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1hZ2UudXRpbC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL21vZGFsLWFuZ3VsYXItZ2FsbGVyeS8iLCJzb3VyY2VzIjpbImxpYi91dGlscy9pbWFnZS51dGlsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBa0NBLE1BQU0sbUJBQW1CLEtBQVfgRUFBRSxhQUFzQjtJQUMzRCxJQUFJLENBQUMsS0FBSyxFQUFFO1FBQ1YsTUFBTSxJQUFJLEtBQUssQ0FBQyxvQ0FBb0MsQ0FBQyxDQUFDO0tBQ3ZEO0lBRUQsSUFBSSxDQUFDLGFBQWEsRUFBRTtRQUNsQixNQUFNLElBQUfgS0FBSyxDQUFDLHVDQUF1QyxDQUFDLENBQUM7S0FDMUQ7SUFFRCxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsSUFBSSxLQUFLLENBQUMsRUFBRSxLQUFLLENBQUMsRUFBRTs7UUFFL0IsTUFBTSxJQUFJLEtBQUssQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFDO0tBQ3REO0lBRUQsSUFBSSxLQUFLLENBQUMsRUFBRSxHQUFHLENBQUMsRUFBRTtRQUNoQixNQUFNLElBQUfgS0FBSyxDQUFDLHlCQUF5QixDQUFDLENBQUM7S0FDNUM7SUFFRCxPQUFPLGFBQWEsQ0FBQyxTQUFTLENBQUMsVUFBQyxHQUFVLElBQUssT0FBQSxHQUFHLENBQUMsRUFBRSxLQUFLLEtBQUssQ0FBQyxFQUFFLEVBQW5CLENBQW1CLENBQUMsQ0FBQztDQUNyRSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gVGhlIE1JVCBMaWNlbnNlIChNSVQpXG5cbiBDb3B5cmlnaHQgKGMpIDIwMTctMjAxOCBTdGVmYW5vIENhcHBhIChLczg5KVxuXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIifgIHRvIGRlYWxcbiBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4gdG8gdXNlLCBjb3B5LCBtb2RpZnfgIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG5cbiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBhbGxcbiBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT04gSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRVxuIFNPRlRXQVJFLlxuICovXG5cbmltcG9ydCB7IEltYWdlIH0gZnJvbSAnLi4vbW9kZWwvaW1hZ2UuY2xhc3MnO1xuXG4vKipcbiAqIFV0aWxpdHkgZnVuY3Rpb24gdG8gZ2V0IHRoZSBpbmRleCBvZiB0aGUgaW5wdXQgYGltYWdlYCBmcm9tIGBhcnJheU9mSW1hZ2VzYFxuICogQHBhcmFtIEltYWdlIGltYWdlIHRvIGdldCB0aGUgaW5kZXguIFRoZSBpbWFnZSAnaWQnIG11c3QgYmUgYSBudW1iZXIgPj0gMFxuICogQHBhcmFtIEltYWdlW10gYXJyYXlPZkltYWdlcyB0byBzZWFyY2ggdGhlIGltYWdlIHdpdGhpbiBpdFxuICogQHJldHVybnMgbnVtYmVyIHRoZSBpbmRleCBvZiB0aGUgaW1hZ2UuIC0xIGlmIG5vdCBmb3VuZC5cbiAqIEB0aHJvd3MgYW4gRXJyb3IgaWYgZWl0aGVyIGltYWdlIG9yIGFycmF5T2ZJbWFnZXMgYXJlIG5vdCB2YWxpZCxcbiAqICBvciBpZiB0aGUgaW5wdXQgaW1hZ2UgZG9lc24ndCBjb250YWluIGFuICdpZCcsIG9yIHRoZSAnaWQnIGlzIDwgMFxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0SW5kZXgoaW1hZ2U6IEltYWdlLCBhcnJheU9mSW1hZ2VzOiBJbWFnZVtdKTogbnVtYmVyIHtcbiAgaWYgKCFpbWFnZSkge1xuICAgIHRocm93IG5ldyBFcnJvcignaW1hZ2UgbXVzdCBiZSBhIHZhbGlkIEltYWdlIG9iamVjdCcpO1xuICB9XG5cbiAgaWYgKCFhcnJheU9mSW1hZ2VzfgB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdhcnJheU9mSW1hZ2VzIG11c3QgYmUgYSB2YWxpZCBJbWFnZVtdJyk7XG4gIH1cblxuICBpZiAoIWltYWdlLmlkICYmIGltYWdlLmlkICE9PSAwfgB7XG4gICAgLy8gaWQgPSAwIGlzIGFkbWl0dGVkXG4gICAgdGhyb3cgbmV3IEVycm9yKGBBIG51bWVyaWMgSW1hZ2UgJ2lkJyBpcyBtYW5kYXRvcnlgKTtcbiAgfVxuXG4gIGlmIChpbWFnZS5pZCA8IDApIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYEltYWdlICdpZCcgbXVzdCBiZSA+PSAwYCk7XG4gIH1cblxuICByZXR1cm4gYXJyYXlPZkltYWdlcy5maW5fgW5kZXgoKHZhbDogSW1hZ2UpID0+IHZhbC5pZCA9PT0gaW1hZ2UuaWQpO1xufVxuIl19