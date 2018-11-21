/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/*
 * Public API Surface of modal-angular-gallery
 */
export { setupKeyboardService, setupGalleryService, ModalGalleryModule } from './lib/modal-gallery.module';
export { fg_DEFAULT_ACCESSIBILITY_CONFIG } from './lib/components/accessibility-default';
export { AccessibleComponent } from './lib/components/accessible.component';
export { ModalGalleryComponent, COMPONENTS } from './lib/components/components';
export { BackgroundComponent } from './lib/components/background/background.component';
export { CurrentImageComponent } from './lib/components/current-image/current-image.component';
export { DotsComponent } from './lib/components/dots/dots.component';
export { PlainGalleryComponent } from './lib/components/plain-gallery/plain-gallery.component';
export { PreviewsComponent } from './lib/components/previews/previews.component';
export { UpperButtonsComponent } from './lib/components/upper-buttons/upper-buttons.component';
export { fg_DEFAULT_SIZE, fg_DEFAULT_BTN_CLOSE, fg_DEFAULT_BTN_DOWNLOAD, fg_DEFAULT_BTN_EXTURL, fg_DEFAULT_BTN_DELETE, fg_DEFAULT_BTN_FULL_SCREEN } from './lib/components/upper-buttons/upper-buttons-default';
export { ATagBgImageDirective } from './lib/directives/a-tag-bg-image.directive';
export { ClickOutsideDirective } from './lib/directives/click-outside.directive';
export { DescriptionDirective } from './lib/directives/description.directive';
export { DirectionDirective } from './lib/directives/direction.directive';
export { DIRECTIVES } from './lib/directives/directives';
export { KeyboardNavigationDirective } from './lib/directives/keyboard-navigation.directive';
export { SizeDirective } from './lib/directives/size.directive';
export { WrapDirective } from './lib/directives/wrap.directive';
export { Action } from './lib/model/action.enum';
export { ButtonsStrategy, ButtonType, WHITELIST_BUTTON_TYPES } from './lib/model/buttons-config.interface';
export { DescriptionStrategy } from './lib/model/description.interface';
export { Image, ImageModalEvent } from './lib/model/image.class';
export { InternalLibImage } from './lib/model/image-internal.class';
export { Keyboard } from './lib/model/keyboard.enum';
export { LoadingType } from './lib/model/loading-config.interface';
export { LineLayout, GridLayout, AdvancedLayout, PlainGalleryStrategy } from './lib/model/plain-gallery-config.interface';
export { GalleryService } from './lib/services/gallery.service';
export { KEYBOARD_CONFIGURATION, KeyboardService } from './lib/services/keyboard.service';
export { getIndex } from './lib/utils/image.util';
export { SPACE_KEY, ENTER_KEY, MOUSE_MAIN_BUTTON_CLICK, NEXT, PREV, NOTHING, DIRECTION_RIGHT, DIRECTION_LEFT } from './lib/utils/user-input.util';

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVibGljX2FwaS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL21vZGFsLWFuZ3VsYXItZ2FsbGVyeS8iLCJzb3VyY2VzIjpbInB1YmxpY19hcGkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUdBLDhFQUFjLDRCQUE0QixDQUFDO0FBRTNDLGdEQUFjLHdDQUF3QyxDQUFDO0FBQ3ZELG9DQUFjLHVDQUF1QyxDQUFDO0FBQ3RELGtEQUFjLDZCQUE2QixDQUFDO0FBRTVDLG9DQUFjLGtEQUFrRCxDQUFDO0FBQ2pFLHNDQUFjLHdEQUF3RCxDQUFDO0FBQ3ZFLDhCQUFjLHNDQUFzQyxDQUFDO0FBRXJELHNDQUFjLHdEQUF3RCxDQUFDO0FBQ3ZFLGtDQUFjLDhDQUE4QyxDQUFDO0FBQzdELHNDQUFjLHdEQUF3RCxDQUFDO0FBQ3ZFLHlKQUFjLHNEQUFzRCxDQUFDO0FBRXJFLHFDQUFjLDJDQUEyQyxDQUFDO0FBQzFELHNDQUFjLDBDQUEwQyxDQUFDO0FBQ3pELHFDQUFjLHdDQUF3QyxDQUFDO0FBQ3ZELG1DQUFjLHNDQUFzQyxDQUFDO0FBQ3JELDJCQUFjLDZCQUE2QixDQUFDO0FBQzVDLDRDQUFjLGdEQUFnRCxDQUFDO0FBQy9ELDhCQUFjLGlDQUFpQyxDQUFDO0FBQ2hELDhCQUFjLGlDQUFpQyxDQUFDO0FBR2hELHVCQUFjLHlCQUF5QixDQUFDO0FBQ3hDLG9FQUFjLHNDQUFzQyxDQUFDO0FBRXJELG9DQUFjLG1DQUFtQyxDQUFDO0FBRWxELHVDQUFjLHlCQUF5QixDQUFDO0FBQ3hDLGlDQUFjLGtDQUFrQyxDQUFDO0FBQ2pELHlCQUFjLDJCQUEyQixDQUFDO0FBRzFDLDRCQUFjLHNDQUFzQyxDQUFDO0FBQ3JELDZFQUFjLDRDQUE0QyxDQUFDO0FBSzNELCtCQUFjLGdDQUFnQyxDQUFDO0FBQy9DLHdEQUFjLGlDQUFpQyxDQUFDO0FBRWhELHlCQUFjLHdCQUF3QixDQUFDO0FBQ3ZDLG9IQUFjLDZCQUE2QixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFB1YmxpYyBBUEkgU3VyZmFjZSBvZiBtb2RhbC1hbmd1bGFyLWdhbGxlcnlcbiAqL1xuZXhwb3J0ICogZnJvbSAnLi9saWIvbW9kYWwtZ2FsbGVyeS5tb2R1bGUnO1xuXG5leHBvcnQgKiBmcm9tICcuL2xpYi9jb21wb25lbnRzL2FjY2Vzc2liaWxpdHktZGVmYXVsdCc7XG5leHBvcnQgKiBmcm9tICcuL2xpYi9jb21wb25lbnRzL2FjY2Vzc2libGUuY29tcG9uZW50JztcbmV4cG9ydCAqIGZyb20gJy4vbGliL2NvbXBvbmVudHMvY29tcG9uZW50cyc7XG5cbmV4cG9ydCAqIGZyb20gJy4vbGliL2NvbXBvbmVudHMvYmFja2dyb3VuZC9iYWNrZ3JvdW5kLmNvbXBvbmVudCc7XG5leHBvcnQgKiBmcm9tICcuL2xpYi9jb21wb25lbnRzL2N1cnJlbnQtaW1hZ2UvY3VycmVudC1pbWFnZS5jb21wb25lbnQnO1xuZXhwb3J0ICogZnJvbSAnLi9saWIvY29tcG9uZW50cy9kb3RzL2RvdHMuY29tcG9uZW50JztcbmV4cG9ydCAqIGZyb20gJy4vbGliL2NvbXBvbmVudHMvbW9kYWwtZ2FsbGVyeS9tb2RhbC1nYWxsZXJ5LmNvbXBvbmVudCc7XG5leHBvcnQgKiBmcm9tICcuL2xpYi9jb21wb25lbnRzL3BsYWluLWdhbGxlcnkvcGxhaW4tZ2FsbGVyeS5jb21wb25lbnQnO1xuZXhwb3J0ICogZnJvbSAnLi9saWIvY29tcG9uZW50cy9wcmV2aWV3cy9wcmV2aWV3cy5jb21wb25lbnQnO1xuZXhwb3J0ICogZnJvbSAnLi9saWIvY29tcG9uZW50cy91cHBlci1idXR0b25zL3VwcGVyLWJ1dHRvbnMuY29tcG9uZW50JztcbmV4cG9ydCAqIGZyb20gJy4vbGliL2NvbXBvbmVudHMvdXBwZXItYnV0dG9ucy91cHBlci1idXR0b25zLWRlZmF1bHQnO1xuXG5leHBvcnQgKiBmcm9tICcuL2xpYi9kaXJlY3RpdmVzL2EtdGFnLWJnLWltYWdlLmRpcmVjdGl2ZSc7XG5leHBvcnQgKiBmcm9tICcuL2xpYi9kaXJlY3RpdmVzL2NsaWNrLW91dHNpZGUuZGlyZWN0aXZlJztcbmV4cG9ydCAqIGZyb20gJy4vbGliL2RpcmVjdGl2ZXMvZGVzY3JpcHRpb24uZGlyZWN0aXZlJztcbmV4cG9ydCAqIGZyb20gJy4vbGliL2RpcmVjdGl2ZXMvZGlyZWN0aW9uLmRpcmVjdGl2ZSc7XG5leHBvcnQgKiBmcm9tICcuL2xpYi9kaXJlY3RpdmVzL2RpcmVjdGl2ZXMnO1xuZXhwb3J0ICogZnJvbSAnLi9saWIvZGlyZWN0aXZlcy9rZXlib2FyZC1uYXZpZ2F0aW9uLmRpcmVjdGl2ZSc7XG5leHBvcnQgKiBmcm9tICcuL2xpYi9kaXJlY3RpdmVzL3NpemUuZGlyZWN0aXZlJztcbmV4cG9ydCAqIGZyb20gJy4vbGliL2RpcmVjdGl2ZXMvd3JhcC5kaXJlY3RpdmUnO1xuXG5leHBvcnQgKiBmcm9tICcuL2xpYi9tb2RlbC9hY2Nlc3NpYmlsaXR5LmludGVyZmFjZSc7XG5leHBvcnQgKiBmcm9tICcuL2xpYi9tb2RlbC9hY3Rpb24uZW51bSc7XG5leHBvcnQgKiBmcm9tICcuL2xpYi9tb2RlbC9idXR0b25zLWNvbmZpZy5pbnRlcmZhY2UnO1xuZXhwb3J0ICogZnJvbSAnLi9saWIvbW9kZWwvY3VycmVudC1pbWFnZS1jb25maWcuaW50ZXJmYWNlJztcbmV4cG9ydCAqIGZyb20gJy4vbGliL21vZGVsL2Rlc2NyaXB0aW9uLmludGVyZmFjZSc7XG5leHBvcnQgKiBmcm9tICcuL2xpYi9tb2RlbC9kb3RzLWNvbmZpZy5pbnRlcmZhY2UnO1xuZXhwb3J0ICogZnJvbSAnLi9saWIvbW9kZWwvaW1hZ2UuY2xhc3MnO1xuZXhwb3J0ICogZnJvbSAnLi9saWIvbW9kZWwvaW1hZ2UtaW50ZXJuYWwuY2xhc3MnO1xuZXhwb3J0ICogZnJvbSAnLi9saWIvbW9kZWwva2V5Ym9hcmQuZW51bSc7XG5leHBvcnQgKiBmcm9tICcuL2xpYi9tb2RlbC9rZXlib2FyZC1jb25maWcuaW50ZXJmYWNlJztcbmV4cG9ydCAqIGZyb20gJy4vbGliL21vZGVsL2tleWJvYXJkLXNlcnZpY2UtY29uZmlnLmludGVyZmFjZSc7XG5leHBvcnQgKiBmcm9tICcuL2xpYi9tb2RlbC9sb2FkaW5nLWNvbmZpZy5pbnRlcmZhY2UnO1xuZXhwb3J0ICogZnJvbSAnLi9saWIvbW9kZWwvcGxhaW4tZ2FsbGVyeS1jb25maWcuaW50ZXJmYWNlJztcbmV4cG9ydCAqIGZyb20gJy4vbGliL21vZGVsL3ByZXZpZXctY29uZmlnLmludGVyZmFjZSc7XG5leHBvcnQgKiBmcm9tICcuL2xpYi9tb2RlbC9zaXplLmludGVyZmFjZSc7XG5leHBvcnQgKiBmcm9tICcuL2xpYi9tb2RlbC9zbGlkZS1jb25maWcuaW50ZXJmYWNlJztcblxuZXhwb3J0ICogZnJvbSAnLi9saWIvc2VydmljZXMvZ2FsbGVyeS5zZXJ2aWNlJztcbmV4cG9ydCAqIGZyb20gJy4vbGliL3NlcnZpY2VzL2tleWJvYXJkLnNlcnZpY2UnO1xuXG5leHBvcnQgKiBmcm9tICcuL2xpYi91dGlscy9pbWFnZS51dGlsJztcbmV4cG9ydCAqIGZyb20gJy4vbGliL3V0aWxzL3VzZXItaW5wdXQudXRpbCc7XG5cblxuIl19