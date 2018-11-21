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
/** *
 * Keycode of the keyboard's key `space`
  @type {?} */
export const SPACE_KEY = 32;
/** *
 * Keycode of the keyboard's key `enter`
  @type {?} */
export const ENTER_KEY = 13;
/** *
 * Keycode of the main mouse button
  @type {?} */
export const MOUSE_MAIN_BUTTON_CLICK = 0;
/** *
 * Const NEXT
  @type {?} */
export const NEXT = 1;
/** *
 * Const PREV
  @type {?} */
export const PREV = -1;
/** *
 * Const NOTHING to represents a situation when it isn't both NEXT and PREV
  @type {?} */
export const NOTHING = 0;
/** *
 * Const to represent the right direction
  @type {?} */
export const DIRECTION_RIGHT = 'right';
/** *
 * Const to represent the left direction
  @type {?} */
export const DIRECTION_LEFT = 'left';

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci1pbnB1dC51dGlsLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbW9kYWwtYW5ndWxhci1nYWxsZXJ5LyIsInNvdXJjZXMiOlsibGliL3V0aWxzL3VzZXItaW5wdXQudXRpbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUEyQkEsYUFBYSxTQUFTLEdBQUcsRUFBRSxDQUFDOzs7O0FBSTVCLGFBQWEsU0FBUyxHQUFHLEVBQUUsQ0FBQzs7OztBQUk1QixhQUFhLHVCQUF1QixHQUFHLENBQUMsQ0FBQzs7OztBQUt6QyxhQUFhLElBQUfgR0FBRyxDQUFDLENBQUM7Ozs7QUFJdEIsYUFBYSxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUM7Ozs7QUFJdkIsYUFBYSxPQUFPLEdBQUcsQ0FBQyxDQUFDOzs7O0FBS3pCLGFBQWEsZUFBZSxHQUFHLE9BQU8sQ0FBQzs7OztBQUl2QyxhQUFhLGNBQWMsR0FBRyxNQUFNLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuIFRoZSBNSVQgTGljZW5zZSAoTUlUKVxuXG4gQ29weXJpZ2h0IChjfgAyMDE3LTIwMTggU3RlZmFubyBDYXBwYSAoS3M4OSlcblxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbiBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuXG4gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsXG4gY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cblxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OIElORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEVcbiBTT0ZUV0FSRS5cbiAqL1xuXG4vKipcbiAqIEtleWNvZGUgb2YgdGhlIGtleWJvYXJkJ3Mga2V5IGBzcGFjZWBcbiAqL1xuZXhwb3J0IGNvbnN0IFNQQUNFX0tFWSA9IDMyO1xuLyoqXG4gKiBLZXljb2RlIG9mIHRoZSBrZXlib2FyZCdzIGtleSBgZW50ZXJgXG4gKi9cbmV4cG9ydCBjb25zdCBFTlRFUl9LRVkgPSAxMztcbi8qKlxuICogS2V5Y29kZSBvZiB0aGUgbWFpbiBtb3VzZSBidXR0b25cbiAqL1xuZXhwb3J0IGNvbnN0IE1PVVNFX01BSU5fQlVUVE9OX0NMSUNLID0gMDtcblxuLyoqXG4gKiBDb25zdCBORVhUXG4gKi9cbmV4cG9ydCBjb25zdCBORVhUID0gMTtcbi8qKlxuICogQ29uc3QgUFJFVlxuICovXG5leHBvcnQgY29uc3QgUFJFViA9IC0xO1xuLyoqXG4gKiBDb25zdCBOT1RISU5HIHRvIHJlcHJlc2VudHMgYSBzaXR1YXRpb24gd2hlbiBpdCBpc24ndCBib3RoIE5FWFQgYW5kIFBSRVZcbiAqL1xuZXhwb3J0IGNvbnN0IE5PVEhJTkcgPSAwO1xuXG4vKipcbiAqIENvbnN0IHRvIHJlcHJlc2VudCB0aGUgcmlnaHQgZGlyZWN0aW9uXG4gKi9cbmV4cG9ydCBjb25zdCBESVJFQ1RJT05fUklHSFQgPSAncmlnaHQnO1xuLyoqXG4gKiBDb25zdCB0byByZXByZXNlbnQgdGhlIGxlZnQgZGlyZWN0aW9uXG4gKi9cbmV4cG9ydCBjb25zdCBESVJFQ1RJT05fTEVGVCA9ICdsZWZ0JztcbiJdfQ==