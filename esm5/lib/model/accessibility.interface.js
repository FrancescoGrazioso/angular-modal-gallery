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
 * Interface `Accessibility` to config titles, alt texts, aria labels and so on
 * @record
 */
export function AccessibilityConfig() { }
/** @type {?} */
AccessibilityConfig.prototype.backgroundAriaLabel;
/** @type {?} */
AccessibilityConfig.prototype.backgroundTitle;
/** @type {?} */
AccessibilityConfig.prototype.plainGalleryContentAriaLabel;
/** @type {?} */
AccessibilityConfig.prototype.plainGalleryContentTitle;
/** @type {?} */
AccessibilityConfig.prototype.modalGalleryContentAriaLabel;
/** @type {?} */
AccessibilityConfig.prototype.modalGalleryContentTitle;
/** @type {?} */
AccessibilityConfig.prototype.loadingSpinnerAriaLabel;
/** @type {?} */
AccessibilityConfig.prototype.loadingSpinnerTitle;
/** @type {?} */
AccessibilityConfig.prototype.mainContainerAriaLabel;
/** @type {?} */
AccessibilityConfig.prototype.mainContainerTitle;
/** @type {?} */
AccessibilityConfig.prototype.mainPrevImageAriaLabel;
/** @type {?} */
AccessibilityConfig.prototype.mainPrevImageTitle;
/** @type {?} */
AccessibilityConfig.prototype.mainNextImageAriaLabel;
/** @type {?} */
AccessibilityConfig.prototype.mainNextImageTitle;
/** @type {?} */
AccessibilityConfig.prototype.dotsContainerAriaLabel;
/** @type {?} */
AccessibilityConfig.prototype.dotsContainerTitle;
/** @type {?} */
AccessibilityConfig.prototype.dotAriaLabel;
/** @type {?} */
AccessibilityConfig.prototype.previewsContainerAriaLabel;
/** @type {?} */
AccessibilityConfig.prototype.previewsContainerTitle;
/** @type {?} */
AccessibilityConfig.prototype.previewScrollPrevAriaLabel;
/** @type {?} */
AccessibilityConfig.prototype.previewScrollPrevTitle;
/** @type {?} */
AccessibilityConfig.prototype.previewScrollNextAriaLabel;
/** @type {?} */
AccessibilityConfig.prototype.previewScrollNextTitle;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjZXNzaWJpbGl0eS5pbnRlcmZhY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9tb2RhbC1hbmd1bGFyLWdhbGxlcnkvIiwic291cmNlcyI6WyJsaWIvbW9kZWwvYWNjZXNzaWJpbGl0eS5pbnRlcmZhY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gVGhlIE1JVCBMaWNlbnNlIChNSVQpXG5cbiBDb3B5cmlnaHQgKGMpIDIwMTctMjAxOCBTdGVmYW5vIENhcHBhIChLczg5KVxuXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIifgIHRvIGRlYWxcbiBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4gdG8gdXNlLCBjb3B5LCBtb2RpZnfgIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG5cbiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBhbGxcbiBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT04gSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRVxuIFNPRlRXQVJFLlxuICovXG5cbi8qKlxuICogSW50ZXJmYWNlIGBBY2Nlc3NpYmlsaXR5YCB0byBjb25maWcgdGl0bGVzLCBhbHQgdGV4dHMsIGFyaWEgbGFiZWxzIGFuZCBzbyBvblxuICovXG5leHBvcnQgaW50ZXJmYWNlIEFjY2Vzc2liaWxpdHlDb25maWcge1xuICBiYWNrZ3JvdW5kQXJpYUxhYmVsOiBzdHJpbmc7XG4gIGJhY2tncm91bmRUaXRsZTogc3RyaW5nO1xuXG4gIHBsYWluR2FsbGVyeUNvbnRlbnRBcmlhTGFiZWw6IHN0cmluZztcbiAgcGxhaW5HYWxsZXJ5Q29udGVudFRpdGxlOiBzdHJpbmc7XG5cbiAgbW9kYWxHYWxsZXJ5Q29udGVudEFyaWFMYWJlbDogc3RyaW5nO1xuICBtb2RhbEdhbGxlcnlDb250ZW50VGl0bGU6IHN0cmluZztcblxuICBsb2FkaW5nU3Bpbm5lckFyaWFMYWJlbDogc3RyaW5nO1xuICBsb2FkaW5nU3Bpbm5lclRpdGxlOiBzdHJpbmc7XG5cbiAgbWFpbkNvbnRhaW5lckFyaWFMYWJlbDogc3RyaW5nO1xuICBtYWluQ29udGFpbmVyVGl0bGU6IHN0cmluZztcbiAgbWFpblByZXZJbWFnZUFyaWFMYWJlbDogc3RyaW5nO1xuICBtYWluUHJldkltYWdlVGl0bGU6IHN0cmluZztcbiAgbWFpbk5leHRJbWFnZUFyaWFMYWJlbDogc3RyaW5nO1xuICBtYWluTmV4dEltYWdlVGl0bGU6IHN0cmluZztcblxuICBkb3RzQ29udGFpbmVyQXJpYUxhYmVsOiBzdHJpbmc7XG4gIGRvdHNDb250YWluZXJUaXRsZTogc3RyaW5nO1xuICBkb3RBcmlhTGFiZWw6IHN0cmluZztcblxuICBwcmV2aWV3c0NvbnRhaW5lckFyaWFMYWJlbDogc3RyaW5nO1xuICBwcmV2aWV3c0NvbnRhaW5lclRpdGxlOiBzdHJpbmc7XG4gIHByZXZpZXdTY3JvbGxQcmV2QXJpYUxhYmVsOiBzdHJpbmc7XG4gIHByZXZpZXdTY3JvbGxQcmV2VGl0bGU6IHN0cmluZztcbiAgcHJldmlld1Njcm9sbE5leHRBcmlhTGFiZWw6IHN0cmluZztcbiAgcHJldmlld1Njcm9sbE5leHRUaXRsZTogc3RyaW5nO1xufVxuIl19