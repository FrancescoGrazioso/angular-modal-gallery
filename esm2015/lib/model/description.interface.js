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
 * Interface `Description` to change the description, either with a full custom
 * description or with a small and simple customization.
 * Also, you could change margins, background style and so on.
 * @record
 */
export function Description() { }
/** @type {?} */
Description.prototype.strategy;
/** @type {?|undefined} */
Description.prototype.customFullDescription;
/** @type {?|undefined} */
Description.prototype.imageText;
/** @type {?|undefined} */
Description.prototype.numberSeparator;
/** @type {?|undefined} */
Description.prototype.beforeTextDescription;
/** @type {?|undefined} */
Description.prototype.style;
/** @enum {number} */
const DescriptionStrategy = {
    ALWAYS_HIDDEN: 1,
    ALWAYS_VISIBLE: 2,
    HIDE_IF_EMPTY: 3,
};
export { DescriptionStrategy };
DescriptionStrategy[DescriptionStrategy.ALWAYS_HIDDEN] = 'ALWAYS_HIDDEN';
DescriptionStrategy[DescriptionStrategy.ALWAYS_VISIBLE] = 'ALWAYS_VISIBLE';
DescriptionStrategy[DescriptionStrategy.HIDE_IF_EMPTY] = 'HIDE_IF_EMPTY';
/**
 * Interface to change css properties.
 * @record
 */
export function DescriptionStyle() { }
/** @type {?|undefined} */
DescriptionStyle.prototype.bgColor;
/** @type {?|undefined} */
DescriptionStyle.prototype.textColor;
/** @type {?|undefined} */
DescriptionStyle.prototype.width;
/** @type {?|undefined} */
DescriptionStyle.prototype.height;
/** @type {?|undefined} */
DescriptionStyle.prototype.position;
/** @type {?|undefined} */
DescriptionStyle.prototype.top;
/** @type {?|undefined} */
DescriptionStyle.prototype.bottom;
/** @type {?|undefined} */
DescriptionStyle.prototype.left;
/** @type {?|undefined} */
DescriptionStyle.prototype.right;
/** @type {?|undefined} */
DescriptionStyle.prototype.marginTop;
/** @type {?|undefined} */
DescriptionStyle.prototype.marginBottom;
/** @type {?|undefined} */
DescriptionStyle.prototype.marginRight;
/** @type {?|undefined} */
DescriptionStyle.prototype.marginLeft;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVzY3JpcHRpb24uaW50ZXJmYWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbW9kYWwtYW5ndWxhci1nYWxsZXJ5LyIsInNvdXJjZXMiOlsibGliL21vZGVsL2Rlc2NyaXB0aW9uLmludGVyZmFjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUEyQ0UsZ0JBQWlCO0lBQ2pCLGlCQUFjO0lBQ2QsZ0JBQWE7Ozt3Q0FGYixhQUFhO3dDQUNiLGNBQWM7d0NBQ2QsYUFBYSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gVGhlIE1JVCBMaWNlbnNlIChNSVQpXG5cbiBDb3B5cmlnaHQgKGMpIDIwMTctMjAxOCBTdGVmYW5vIENhcHBhIChLczg5KVxuXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIifgIHRvIGRlYWxcbiBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4gdG8gdXNlLCBjb3B5LCBtb2RpZnfgIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG5cbiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBhbGxcbiBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT04gSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRVxuIFNPRlRXQVJFLlxuICovXG5cbi8qKlxuICogSW50ZXJmYWNlIGBEZXNjcmlwdGlvbmAgdG8gY2hhbmdlIHRoZSBkZXNjcmlwdGlvbiwgZWl0aGVyIHdpdGggYSBmdWxsIGN1c3RvbVxuICogZGVzY3JpcHRpb24gb3Igd2l0aCBhIHNtYWxsIGFuZCBzaW1wbGUgY3VzdG9taXphdGlvbi5cbiAqIEFsc28sIHlvdSBjb3VsZCBjaGFuZ2UgbWFyZ2lucywgYmFja2dyb3VuZCBzdHlsZSBhbmQgc28gb24uXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgRGVzY3JpcHRpb24ge1xuICBzdHJhdGVneTogRGVzY3JpcHRpb25TdHJhdGVneTtcbiAgY3VzdG9tRnVsbERlc2NyaXB0aW9uPzogc3RyaW5nO1xuICBpbWFnZVRleHQ/OiBzdHJpbmc7XG4gIG51bWJlclNlcGFyYXRvcj86IHN0cmluZztcbiAgYmVmb3JlVGV4dERlc2NyaXB0aW9uPzogc3RyaW5nO1xuXG4gIHN0eWxlPzogRGVzY3JpcHRpb25TdHlsZTtcbn1cblxuLyoqXG4gKiBFbnVtIGBEZXNjcmlwdGlvblN0cmF0ZWd5YCB3aXRoIGtleXMgYW5kIHRoZWlyIHJlbGF0aXZlIGtleSBjb2Rlcy5cbiAqL1xuZXhwb3J0IGVudW0gRGVzY3JpcHRpb25TdHJhdGVneSB7XG4gIEFMV0FZU19ISURERU4gPSAxLFxuICBBTFdBWVNfVklTSUJMRSxcbiAgSElERV9JRl9FTVBUWVxufVxuXG4vKipcbiAqIEludGVyZmFjZSB0byBjaGFuZ2UgY3NzIHByb3BlcnRpZXMuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgRGVzY3JpcHRpb25TdHlsZSB7XG4gIGJnQ29sb3I/OiBzdHJpbmc7XG4gIHRleHRDb2xvcj86IHN0cmluZztcbiAgd2lkdGg/OiBzdHJpbmc7XG4gIGhlaWdodD86IHN0cmluZztcbiAgcG9zaXRpb24/OiBzdHJpbmc7XG4gIHRvcD86IHN0cmluZztcbiAgYm90dG9tPzogc3RyaW5nO1xuICBsZWZ0Pzogc3RyaW5nO1xuICByaWdodD86IHN0cmluZztcbiAgbWFyZ2luVG9wPzogc3RyaW5nO1xuICBtYXJnaW5Cb3R0b20/OiBzdHJpbmc7XG4gIG1hcmdpblJpZ2h0Pzogc3RyaW5nO1xuICBtYXJnaW5MZWZ0Pzogc3RyaW5nO1xufVxuIl19