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
        throw new Error(`A numeric Image 'id' is mandatory`);
    }
    if (image.id < 0) {
        throw new Error(`Image 'id' must be >= 0`);
    }
    return arrayOfImages.findIndex((val) => val.id === image.id);
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1hZ2UudXRpbC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL21vZGFsLWFuZ3VsYXItZ2FsbGVyeS8iLCJzb3VyY2VzIjpbImxpYi91dGlscy9pbWFnZS51dGlsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBa0NBLE1BQU0sbUJBQW1CLEtBQVfgRUFBRSxhQUFzQjtJQUMzRCxJQUFJLENBQUMsS0FBSyxFQUFFO1FBQ1YsTUFBTSxJQUFJLEtBQUssQ0FBQyxvQ0FBb0MsQ0FBQyxDQUFDO0tBQ3ZEO0lBRUQsSUFBSSxDQUFDLGFBQWEsRUFBRTtRQUNsQixNQUFNLElBQUfgS0FBSyxDQUFDLHVDQUF1QyxDQUFDLENBQUM7S0FDMUQ7SUFFRCxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsSUFBSSxLQUFLLENBQUMsRUFBRSxLQUFLLENBQUMsRUFBRTs7UUFFL0IsTUFBTSxJQUFJLEtBQUssQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFDO0tBQ3REO0lBRUQsSUFBSSxLQUFLLENBQUMsRUFBRSxHQUFHLENBQUMsRUFBRTtRQUNoQixNQUFNLElBQUfgS0FBSyxDQUFDLHlCQUF5QixDQUFDLENBQUM7S0FDNUM7SUFFRCxPQUFPLGFBQWEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxHQUFVLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEtBQUssS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0NBQ3JFIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiBUaGUgTUlUIExpY2Vuc2UgKE1JVClcblxuIENvcHlyaWdodCAoYykgMjAxNy0yMDE4IFN0ZWZhbm8gQ2FwcGEgKEtzODkpXG5cbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwifgwgdG8gZGVhbFxuIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbiB0byB1c2UsIGNvcHfgIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcblxuIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIGFsbFxuIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG5cbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFfgXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTiBJTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiBMSUFCSUxJVFfgIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFXG4gU09GVFdBUkUuXG4gKi9cblxuaW1wb3J0IHsgSW1hZ2UgfSBmcm9tICcuLi9tb2RlbC9pbWFnZS5jbGFzcyc7XG5cbi8qKlxuICogVXRpbGl0eSBmdW5jdGlvbiB0byBnZXQgdGhlIGluZGV4IG9mIHRoZSBpbnB1dCBgaW1hZ2VgIGZyb20gYGFycmF5T2ZJbWFnZXNgXG4gKiBAcGFyYW0gSW1hZ2UgaW1hZ2UgdG8gZ2V0IHRoZSBpbmRleC4gVGhlIGltYWdlICdpZCcgbXVzdCBiZSBhIG51bWJlciA+PSAwXG4gKiBAcGFyYW0gSW1hZ2VbXSBhcnJheU9mSW1hZ2VzIHRvIHNlYXJjaCB0aGUgaW1hZ2Ugd2l0aGluIGl0XG4gKiBAcmV0dXJucyBudW1iZXIgdGhlIGluZGV4IG9mIHRoZSBpbWFnZS4gLTEgaWYgbm90IGZvdW5kLlxuICogQHRocm93cyBhbiBFcnJvciBpZiBlaXRoZXIgaW1hZ2Ugb3IgYXJyYXlPZkltYWdlcyBhcmUgbm90IHZhbGlkLFxuICogIG9yIGlmIHRoZSBpbnB1dCBpbWFnZSBkb2Vzbid0IGNvbnRhaW4gYW4gJ2lkJywgb3IgdGhlICdpZCcgaXMgPCAwXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRJbmRleChpbWFnZTogSW1hZ2UsIGFycmF5T2ZJbWFnZXM6IEltYWdlW10pOiBudW1iZXIge1xuICBpZiAoIWltYWdlfgB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdpbWFnZSBtdXN0IGJlIGEgdmFsaWQgSW1hZ2Ugb2JqZWN0Jyk7XG4gIH1cblxuICBpZiAoIWFycmF5T2ZJbWFnZXMpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2FycmF5T2ZJbWFnZXMgbXVzdCBiZSBhIHZhbGlkIEltYWdlW10nKTtcbiAgfVxuXG4gIGlmICghaW1hZ2UuaWQgJiYgaW1hZ2UuaWQgIT09IDApIHtcbiAgICAvLyBpZCA9IDAgaXMgYWRtaXR0ZWRcbiAgICB0aHJvdyBuZXcgRXJyb3IoYEEgbnVtZXJpYyBJbWFnZSAnaWQnIGlzIG1hbmRhdG9yeWApO1xuICB9XG5cbiAgaWYgKGltYWdlLmlkIDwgMCkge1xuICAgIHRocm93IG5ldyBFcnJvcihgSW1hZ2UgJ2lkJyBtdXN0IGJlID49IDBgKTtcbiAgfVxuXG4gIHJldHVybiBhcnJheU9mSW1hZ2VzLmZpbmRJbmRleCgodmFsOiBJbWFnZSkgPT4gdmFsLmlkID09PSBpbWFnZS5pZCk7XG59XG4iXX0=