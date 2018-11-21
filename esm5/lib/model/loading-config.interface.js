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
 * Interface `LoadingConfig` to configure loading icon.
 * @record
 */
export function LoadingConfig() { }
/** @type {?} */
LoadingConfig.prototype.enable;
/** @type {?} */
LoadingConfig.prototype.type;
/** @enum {number} */
var LoadingType = {
    STANDARD: 1,
    CIRCULAR: 2,
    BARS: 3,
    DOTS: 4,
    CUBE_FLIPPING: 5,
    CIRCLES: 6,
    EXPLOSING_SQUARES: 7,
};
export { LoadingType };
LoadingType[LoadingType.STANDARD] = 'STANDARD';
LoadingType[LoadingType.CIRCULAR] = 'CIRCULAR';
LoadingType[LoadingType.BARS] = 'BARS';
LoadingType[LoadingType.DOTS] = 'DOTS';
LoadingType[LoadingType.CUBE_FLIPPING] = 'CUBE_FLIPPING';
LoadingType[LoadingType.CIRCLES] = 'CIRCLES';
LoadingType[LoadingType.EXPLOSING_SQUARES] = 'EXPLOSING_SQUARES';

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9hZGluZy1jb25maWcuaW50ZXJmYWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbW9kYWwtYW5ndWxhci1nYWxsZXJ5LyIsInNvdXJjZXMiOlsibGliL21vZGVsL2xvYWRpbmctY29uZmlnLmludGVyZmFjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQW9DRSxXQUFZO0lBQ1osV0FBUTtJQUNSLE9BQUk7SUFDSixPQUFJO0lBQ0osZ0JBQWE7SUFDYixVQUFPO0lBQ1Asb0JBQWlCOzs7d0JBTmpCLFFBQVE7d0JBQ1IsUUFBUTt3QkFDUixJQUFJO3dCQUNKLElBQUk7d0JBQ0osYUFBYTt3QkFDYixPQUFPO3dCQUNQLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gVGhlIE1JVCBMaWNlbnNlIChNSVQpXG5cbiBDb3B5cmlnaHQgKGMpIDIwMTctMjAxOCBTdGVmYW5vIENhcHBhIChLczg5KVxuXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIifgIHRvIGRlYWxcbiBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4gdG8gdXNlLCBjb3B5LCBtb2RpZnfgIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG5cbiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBhbGxcbiBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT04gSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRVxuIFNPRlRXQVJFLlxuICovXG5cbi8qKlxuICogSW50ZXJmYWNlIGBMb2FkaW5nQ29uZmlnYCB0byBjb25maWd1cmUgbG9hZGluZyBpY29uLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIExvYWRpbmdDb25maWcge1xuICBlbmFibGU6IGJvb2xlYW47XG4gIHR5cGU6IExvYWRpbmdUeXBlO1xufVxuXG4vKipcbiAqIEVudW0gYExvYWRpbmdUeXBlYCB3aXRoIGEgbGlzdCBvZiBwb3NzaWJsZSB0eXBlcy5cbiAqL1xuZXhwb3J0IGVudW0gTG9hZGluZ1R5cGUge1xuICBTVEFOREFSRCA9IDEsXG4gIENJUkNVTEFSLFxuICBCQVJTLFxuICBET1RTLFxuICBDVUJFX0ZMSVBQSU5HLFxuICBDSVJDTEVTLFxuICBFWFBMT1NJTkdfU1FVQVJFU1xufVxuIl19