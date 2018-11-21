/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/*
 The MIT License (MIT)

 Copyright (c) 2017 Francesco Grazioso (fg96)

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
import { BackgroundComponent } from './background/background.component';
import { ModalGalleryComponent } from './modal-gallery/modal-gallery.component';
import { UpperButtonsComponent } from './upper-buttons/upper-buttons.component';
import { DotsComponent } from './dots/dots.component';
import { PreviewsComponent } from './previews/previews.component';
import { CurrentImageComponent } from './current-image/current-image.component';
import { LoadingSpinnerComponent } from './current-image/loading-spinner/loading-spinner.component';
import { AccessibleComponent } from './accessible.component';
import { PlainGalleryComponent } from './plain-gallery/plain-gallery.component';
export { ModalGalleryComponent } from './modal-gallery/modal-gallery.component';
/** *
 * Array of all components.
  @type {?} */
export const COMPONENTS = [
    BackgroundComponent,
    PlainGalleryComponent,
    ModalGalleryComponent,
    UpperButtonsComponent,
    DotsComponent,
    PreviewsComponent,
    CurrentImageComponent,
    LoadingSpinnerComponent,
    AccessibleComponent
];

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9uZW50cy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL21vZGFsLWFuZ3VsYXItZ2FsbGVyeS8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnRzL2NvbXBvbmVudHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBd0JBLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ3hFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBQ2hGLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBQ2hGLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUN0RCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUNsRSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUNoRixPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSwyREFBMkQsQ0FBQztBQUNwRyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUM3RCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUVoRixPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQzs7OztBQUtoRixhQUFhLFVBQVUsR0FBRztJQUN4QixtQkFBbUI7SUFDbkIscUJBQXFCO0lBQ3JCLHFCQUFxQjtJQUNyQixxQkFBcUI7SUFDckIsYUFBYTtJQUNiLGlCQUFpQjtJQUNqQixxQkFBcUI7SUFDckIsdUJBQXVCO0lBQ3ZCLG1CQUFtQjtDQUNwQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiBUaGUgTUlUIExpY2Vuc2UgKE1JVClcblxuIENvcHlyaWdodCAoYykgMjAxNyBTdGVmYW5vIENhcHBhIChLczg5KVxuXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIifgIHRvIGRlYWxcbiBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4gdG8gdXNlLCBjb3B5LCBtb2RpZnfgIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG5cbiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBhbGxcbiBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT04gSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRVxuIFNPRlRXQVJFLlxuICovXG5cbmltcG9ydCB7IEJhY2tncm91bmRDb21wb25lbnQgfSBmcm9tICcuL2JhY2tncm91bmQvYmFja2dyb3VuZC5jb21wb25lbnQnO1xuaW1wb3J0IHsgTW9kYWxHYWxsZXJ5Q29tcG9uZW50IH0gZnJvbSAnLi9tb2RhbC1nYWxsZXJ5L21vZGFsLWdhbGxlcnkuY29tcG9uZW50JztcbmltcG9ydCB7IFVwcGVyQnV0dG9uc0NvbXBvbmVudCB9IGZyb20gJy4vdXBwZXItYnV0dG9ucy91cHBlci1idXR0b25zLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBEb3RzQ29tcG9uZW50IH0gZnJvbSAnLi9kb3RzL2RvdHMuY29tcG9uZW50JztcbmltcG9ydCB7IFByZXZpZXdzQ29tcG9uZW50IH0gZnJvbSAnLi9wcmV2aWV3cy9wcmV2aWV3cy5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ3VycmVudEltYWdlQ29tcG9uZW50IH0gZnJvbSAnLi9jdXJyZW50LWltYWdlL2N1cnJlbnQtaW1hZ2UuY29tcG9uZW50JztcbmltcG9ydCB7IExvYWRpbmdTcGlubmVyQ29tcG9uZW50IH0gZnJvbSAnLi9jdXJyZW50LWltYWdlL2xvYWRpbmctc3Bpbm5lci9sb2FkaW5nLXNwaW5uZXIuY29tcG9uZW50JztcbmltcG9ydCB7IEFjY2Vzc2libGVDb21wb25lbnQgfSBmcm9tICcuL2FjY2Vzc2libGUuY29tcG9uZW50JztcbmltcG9ydCB7IFBsYWluR2FsbGVyeUNvbXBvbmVudCB9IGZyb20gJy4vcGxhaW4tZ2FsbGVyeS9wbGFpbi1nYWxsZXJ5LmNvbXBvbmVudCc7XG5cbmV4cG9ydCB7IE1vZGFsR2FsbGVyeUNvbXBvbmVudCB9IGZyb20gJy4vbW9kYWwtZ2FsbGVyeS9tb2RhbC1nYWxsZXJ5LmNvbXBvbmVudCc7XG5cbi8qKlxuICogQXJyYXkgb2YgYWxsIGNvbXBvbmVudHMuXG4gKi9cbmV4cG9ydCBjb25zdCBDT01QT05FTlRTID0gW1xuICBCYWNrZ3JvdW5kQ29tcG9uZW50LFxuICBQbGFpbkdhbGxlcnlDb21wb25lbnQsXG4gIE1vZGFsR2FsbGVyeUNvbXBvbmVudCxcbiAgVXBwZXJCdXR0b25zQ29tcG9uZW50LFxuICBEb3RzQ29tcG9uZW50LFxuICBQcmV2aWV3c0NvbXBvbmVudCxcbiAgQ3VycmVudEltYWdlQ29tcG9uZW50LFxuICBMb2FkaW5nU3Bpbm5lckNvbXBvbmVudCxcbiAgQWNjZXNzaWJsZUNvbXBvbmVudFxuXTtcbiJdfQ==