/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { ButtonType } from '../../model/buttons-config.interface';
/** *
 * Default button size object
  @type {?} */
export var fg_DEFAULT_SIZE = { height: 'auto', width: '30px' };
/** *
 * Default close button object
  @type {?} */
export var fg_DEFAULT_BTN_CLOSE = {
    className: 'close-image',
    size: fg_DEFAULT_SIZE,
    type: ButtonType.CLOSE,
    title: 'Close this modal image gallery',
    ariaLabel: 'Close this modal image gallery'
};
/** *
 * Default download button object
  @type {?} */
export var fg_DEFAULT_BTN_DOWNLOAD = {
    className: 'download-image',
    size: fg_DEFAULT_SIZE,
    type: ButtonType.DOWNLOAD,
    title: 'Download the current image',
    ariaLabel: 'Download the current image'
};
/** *
 * Default exturl button object
  @type {?} */
export var fg_DEFAULT_BTN_EXTURL = {
    className: 'ext-url-image',
    size: fg_DEFAULT_SIZE,
    type: ButtonType.EXTURL,
    title: 'Navigate the current image',
    ariaLabel: 'Navigate the current image'
};
/** *
 * Default delete button object
  @type {?} */
export var fg_DEFAULT_BTN_DELETE = {
    className: 'delete-image',
    size: fg_DEFAULT_SIZE,
    type: ButtonType.DELETE,
    title: 'Delete the current image',
    ariaLabel: 'Delete the current image'
};
/** *
 * Default full-screen button object
  @type {?} */
export var fg_DEFAULT_BTN_FULL_SCREEN = {
    className: 'fullscreen-image',
    size: fg_DEFAULT_SIZE,
    type: ButtonType.FULLSCREEN,
    title: 'Switch to full-screen',
    ariaLabel: 'Switch to full-screen'
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBwZXItYnV0dG9ucy1kZWZhdWx0LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbW9kYWwtYW5ndWxhci1nYWxsZXJ5LyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvdXBwZXItYnV0dG9ucy91cHBlci1idXR0b25zLWRlZmF1bHQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBZ0IsVUFBVSxFQUFFLE1BQU0sc0NBQXNDLENBQUM7Ozs7QUFNaEYsV0FBYSxlQUFlLEdBQVMsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsQ0FBQzs7OztBQUt2RSxXQUFhLG9CQUFvQixHQUFpQjtJQUNoRCxTQUFTLEVBQUUsYUFBYTtJQUN4QixJQUFJLEVBQUUsZUFBZTtJQUNyQixJQUFJLEVBQUUsVUFBVSxDQUFDLEtBQUs7SUFDdEIsS0FBSyxFQUFFLGdDQUFnQztJQUN2QyxTQUFTLEVBQUUsZ0NBQWdDO0NBQzVDLENBQUM7Ozs7QUFLRixXQUFhLHVCQUF1QixHQUFpQjtJQUNuRCxTQUFTLEVBQUUsZ0JBQWdCO0lBQzNCLElBQUfgRUFBRSxlQUFlO0lBQ3JCLElBQUfgRUFBRSxVQUFVLENBQUMsUUFBUTtJQUN6QixLQUFLLEVBQUUsNEJBQTRCO0lBQ25DLFNBQVMsRUFBRSw0QkFBNEI7Q0FDeEMsQ0FBQzs7OztBQUtGLFdBQWEscUJBQXFCLEdBQWlCO0lBQ2pELFNBQVMsRUFBRSxlQUFlO0lBQzFCLElBQUfgRUFBRSxlQUFlO0lBQ3JCLElBQUfgRUFBRSxVQUFVLENBQUMsTUFBTTtJQUN2QixLQUFLLEVBQUUsNEJBQTRCO0lBQ25DLFNBQVMsRUFBRSw0QkFBNEI7Q0FDeEMsQ0FBQzs7OztBQWVGLFdBQWEscUJBQXFCLEdBQWlCO0lBQ2pELFNBQVMsRUFBRSxjQUFjO0lBQ3pCLElBQUfgRUFBRSxlQUFlO0lBQ3JCLElBQUfgRUFBRSxVQUFVLENBQUMsTUFBTTtJQUN2QixLQUFLLEVBQUUsMEJBQTBCO0lBQ2pDLFNBQVMsRUFBRSwwQkFBMEI7Q0FDdEMsQ0FBQzs7OztBQUtGLFdBQWEsMEJBQTBCLEdBQWlCO0lBQ3RELFNBQVMsRUFBRSxrQkFBa0I7SUFDN0IsSUFBSSxFQUFFLGVBQWU7SUFDckIsSUFBSSxFQUFFLFVBQVUsQ0FBQyxVQUFVO0lBQzNCLEtBQUssRUFBRSx1QkFBdUI7SUFDOUIsU0FBUyxFQUFFLHVCQUF1QjtDQUNuQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQnV0dG9uQ29uZmlnLCBCdXR0b25UeXBlIH0gZnJvbSAnLi4vLi4vbW9kZWwvYnV0dG9ucy1jb25maWcuaW50ZXJmYWNlJztcbmltcG9ydCB7IFNpemUgfSBmcm9tICcuLi8uLi9tb2RlbC9zaXplLmludGVyZmFjZSc7XG5cbi8qKlxuICogRGVmYXVsdCBidXR0b24gc2l6ZSBvYmplY3RcbiAqL1xuZXhwb3J0IGNvbnN0IEtTX0RFRkFVTFRfU0laRTogU2l6ZSA9IHsgaGVpZ2h0OiAnYXV0bycsIHdpZHRoOiAnMzBweCcgfTtcblxuLyoqXG4gKiBEZWZhdWx0IGNsb3NlIGJ1dHRvbiBvYmplY3RcbiAqL1xuZXhwb3J0IGNvbnN0IEtTX0RFRkFVTFRfQlROX0NMT1NFOiBCdXR0b25Db25maWcgPSB7XG4gIGNsYXNzTmFtZTogJ2Nsb3NlLWltYWdlJyxcbiAgc2l6ZTogS1NfREVGQVVMVF9TSVpFLFxuICB0eXBlOiBCdXR0b25UeXBlLkNMT1NFLFxuICB0aXRsZTogJ0Nsb3NlIHRoaXMgbW9kYWwgaW1hZ2UgZ2FsbGVyeScsXG4gIGFyaWFMYWJlbDogJ0Nsb3NlIHRoaXMgbW9kYWwgaW1hZ2UgZ2FsbGVyeSdcbn07XG5cbi8qKlxuICogRGVmYXVsdCBkb3dubG9hZCBidXR0b24gb2JqZWN0XG4gKi9cbmV4cG9ydCBjb25zdCBLU19ERUZBVUxUX0JUTl9ET1dOTE9BRDogQnV0dG9uQ29uZmlnID0ge1xuICBjbGFzc05hbWU6ICdkb3dubG9hZC1pbWFnZScsXG4gIHNpemU6IEtTX0RFRkFVTFRfU0laRSxcbiAgdHlwZTogQnV0dG9uVHlwZS5ET1dOTE9BRCxcbiAgdGl0bGU6ICdEb3dubG9hZCB0aGUgY3VycmVudCBpbWFnZScsXG4gIGFyaWFMYWJlbDogJ0Rvd25sb2FkIHRoZSBjdXJyZW50IGltYWdlJ1xufTtcblxuLyoqXG4gKiBEZWZhdWx0IGV4dHVybCBidXR0b24gb2JqZWN0XG4gKi9cbmV4cG9ydCBjb25zdCBLU19ERUZBVUxUX0JUTl9FWFRVUkw6IEJ1dHRvbkNvbmZpZyA9IHtcbiAgY2xhc3NOYW1lOiAnZXh0LXVybC1pbWFnZScsXG4gIHNpemU6IEtTX0RFRkFVTFRfU0laRSxcbiAgdHlwZTogQnV0dG9uVHlwZS5FWFRVUkwsXG4gIHRpdGxlOiAnTmF2aWdhdGUgdGhlIGN1cnJlbnQgaW1hZ2UnLFxuICBhcmlhTGFiZWw6ICdOYXZpZ2F0ZSB0aGUgY3VycmVudCBpbWFnZSdcbn07XG4vLyAvKipcbi8vICAqIERlZmF1bHQgcmVmcmVzaCBidXR0b24gb2JqZWN0XG4vLyAgKi9cbi8vIGV4cG9ydCBjb25zdCBLU19ERUZBVUxUX0JUTl9SRUZSRVNIOiBCdXR0b25Db25maWcgPSB7XG4vLyAgIGNsYXNzTmFtZTogJ3JlZnJlc2gtaW1hZ2UnLFxuLy8gICBzaXplOiBLU19ERUZBVUxUX1NJWkUsXG4vLyAgIHR5cGU6IEJ1dHRvblR5cGUuUkVGUkVTSCxcbi8vICAgdGl0bGU6ICdSZWZyZXNoIGFsbCBpbWFnZXMnLFxuLy8gICBhcmlhTGFiZWw6ICdSZWZyZXNoIGFsbCBpbWFnZXMnXG4vLyB9O1xuXG4vKipcbiAqIERlZmF1bHQgZGVsZXRlIGJ1dHRvbiBvYmplY3RcbiAqL1xuZXhwb3J0IGNvbnN0IEtTX0RFRkFVTFRfQlROX0RFTEVURTogQnV0dG9uQ29uZmlnID0ge1xuICBjbGFzc05hbWU6ICdkZWxldGUtaW1hZ2UnLFxuICBzaXplOiBLU19ERUZBVUxUX1NJWkUsXG4gIHR5cGU6IEJ1dHRvblR5cGUuREVMRVRFLFxuICB0aXRsZTogJ0RlbGV0ZSB0aGUgY3VycmVudCBpbWFnZScsXG4gIGFyaWFMYWJlbDogJ0RlbGV0ZSB0aGUgY3VycmVudCBpbWFnZSdcbn07XG5cbi8qKlxuICogRGVmYXVsdCBmdWxsLXNjcmVlbiBidXR0b24gb2JqZWN0XG4gKi9cbmV4cG9ydCBjb25zdCBLU19ERUZBVUxUX0JUTl9GVUxMX1NDUkVFTjogQnV0dG9uQ29uZmlnID0ge1xuICBjbGFzc05hbWU6ICdmdWxsc2NyZWVuLWltYWdlJyxcbiAgc2l6ZTogS1NfREVGQVVMVF9TSVpFLFxuICB0eXBlOiBCdXR0b25UeXBlLkZVTExTQ1JFRU4sXG4gIHRpdGxlOiAnU3dpdGNoIHRvIGZ1bGwtc2NyZWVuJyxcbiAgYXJpYUxhYmVsOiAnU3dpdGNoIHRvIGZ1bGwtc2NyZWVuJ1xufTtcbiJdfQ==