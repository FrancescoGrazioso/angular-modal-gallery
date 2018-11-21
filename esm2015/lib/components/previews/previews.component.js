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
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { AccessibleComponent } from '../accessible.component';
import { InternalLibImage } from '../../model/image-internal.class';
import { NEXT, PREV } from '../../utils/user-input.util';
import { getIndex } from '../../utils/image.util';
/**
 * Component with image previews
 */
export class PreviewsComponent extends AccessibleComponent {
    constructor() {
        super(...arguments);
        /**
         * Output to emit the clicked preview. The payload contains the `InternalLibImage` associated to the clicked preview.
         */
        this.clickPreview = new EventEmitter();
        /**
         * Array of `InternalLibImage` exposed to the template. This field is initialized
         * applying transformations, default values and so on to the input of the same type.
         */
        this.previews = [];
        /**
         * Default preview's size object, also used in the template to apply default sizes to fgSize's directive.
         */
        this.defaultPreviewSize = { height: '50px', width: 'auto' };
        /**
         * Default preview's config object
         */
        this.defaultPreviewConfig = {
            visible: true,
            number: 3,
            arrows: true,
            clickable: true,
            // alwaysCenter: false, // TODO still not implemented
            size: this.defaultPreviewSize
        };
    }
    /**
     * Method ´ngOnInit´ to build `configPreview` applying a default value and also to
     * init the `previews` array.
     * This is an Angular's lifecycle hook, so its called automatically by Angular itself.
     * In particular, it's called only one time!!!
     * @return {?}
     */
    ngOnInit() {
        this.configPreview = Object.assign({}, this.defaultPreviewConfig, this.previewConfig);
        // if number is <= 0 reset to default
        if (this.configPreview && this.configPreview.number && this.configPreview.number <= 0) {
            this.configPreview.number = this.defaultPreviewConfig.number;
        }
        // init previews based on currentImage and the full array of images
        this.initPreviews(this.currentImage, this.images);
    }
    /**
     * Method to check if an image is active (i.e. a preview image).
     * @param {?} preview
     * @return {?} boolean true if is active, false otherwise
     */
    isActive(preview) {
        if (!preview || !this.currentImage) {
            return false;
        }
        return preview.id === this.currentImage.id;
    }
    /**
     * Method ´ngOnChanges´ to update `previews` array.
     * Also, both `start` and `end` local variables will be updated accordingly.
     * This is an Angular's lifecycle hook, so its called automatically by Angular itself.
     * In particular, it's called when any data-bound property of a directive changes!!!
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        /** @type {?} */
        const images = changes["images"];
        /** @type {?} */
        const currentImage = changes["currentImage"];
        /** @type {?} */
        let prev;
        /** @type {?} */
        let current;
        if (currentImage) {
            prev = currentImage.previousValue;
            current = currentImage.currentValue;
        }
        else {
            current = this.currentImage;
        }
        if (current && images && images.previousValue && images.currentValue) {
            // I'm in this if statement, if input images are changed (for instance, because I removed one of them with the 'delete button',
            // or because users changed the images array while modal gallery is still open).
            // In this case, I have to re-init previews, because the input array of images is changed.
            this.initPreviews(current, images.currentValue);
        }
        if (prev && current && prev.id !== current.id) {
            this.updatePreviews(prev, current);
        }
    }
    /**
     * Method called by events from both keyboard and mouse on a preview.
     * This will trigger the `clickpreview` output with the input preview as its payload.
     * @param {?} preview
     * @param {?} event
     * @return {?}
     */
    onImageEvent(preview, event) {
        if (!this.configPreview || !this.configPreview.clickable) {
            return;
        }
        /** @type {?} */
        const result = super.handleImageEvent(event);
        if (result === NEXT) {
            this.clickPreview.emit(preview);
        }
        else if (result === PREV) {
            this.clickPreview.emit(preview);
        }
    }
    /**
     * Method called by events from both keyboard and mouse on a navigation arrow.
     * @param {?} direction
     * @param {?} event
     * @return {?}
     */
    onNavigationEvent(direction, event) {
        /** @type {?} */
        const result = super.handleNavigationEvent(direction, event);
        if (result === NEXT) {
            this.next();
        }
        else if (result === PREV) {
            this.previous();
        }
    }
    /**
     * Method used in the template to track ids in ngFor.
     * @param {?} index
     * @param {?} item
     * @return {?} number the id of the item
     */
    trackById(index, item) {
        return item.id;
    }
    /**
     * Private method to init previews based on the currentImage and the full array of images.
     * The current image in mandatory to show always the current preview (as highlighted).
     * @param {?} currentImage
     * @param {?} images
     * @return {?}
     */
    initPreviews(currentImage, images) {
        /** @type {?} */
        let index;
        try {
            index = getIndex(currentImage, images);
        }
        catch (err) {
            throw err;
        }
        switch (index) {
            case 0:
                // first image
                this.setBeginningIndexesPreviews();
                break;
            case images.length - 1:
                // last image
                this.setEndIndexesPreviews();
                break;
            default:
                // other images
                this.setIndexesPreviews();
                break;
        }
        this.previews = images.filter((img, i) => i >= this.start && i < this.end);
    }
    /**
     * Private method to init both `start` and `end` to the beginning.
     * @return {?}
     */
    setBeginningIndexesPreviews() {
        this.start = 0;
        this.end = Math.min(/** @type {?} */ (this.configPreview.number), this.images.length);
    }
    /**
     * Private method to init both `start` and `end` to the end.
     * @return {?}
     */
    setEndIndexesPreviews() {
        this.start = this.images.length - 1 - (/** @type {?} */ (this.configPreview.number) - 1);
        this.end = this.images.length;
    }
    /**
     * Private method to update both `start` and `end` based on the currentImage.
     * @return {?}
     */
    setIndexesPreviews() {
        this.start = getIndex(this.currentImage, this.images) - Math.floor(/** @type {?} */ (this.configPreview.number) / 2);
        this.end = getIndex(this.currentImage, this.images) + Math.floor(/** @type {?} */ (this.configPreview.number) / 2) + 1;
    }
    /**
     * Private method to update the visible previews navigating to the right (next).
     * @return {?}
     */
    next() {
        // check if nextImage should be blocked
        if (this.isPreventSliding(this.images.length - 1)) {
            return;
        }
        if (this.end === this.images.length) {
            return;
        }
        this.start++;
        this.end = Math.min(this.end + 1, this.images.length);
        this.previews = this.images.filter((img, i) => i >= this.start && i < this.end);
    }
    /**
     * Private method to update the visible previews navigating to the left (previous).
     * @return {?}
     */
    previous() {
        // check if prevImage should be blocked
        if (this.isPreventSliding(0)) {
            return;
        }
        if (this.start === 0) {
            return;
        }
        this.start = Math.max(this.start - 1, 0);
        this.end = Math.min(this.end - 1, this.images.length);
        this.previews = this.images.filter((img, i) => i >= this.start && i < this.end);
    }
    /**
     * Private method to block/permit sliding between previews.
     * @param {?} boundaryIndex
     * @return {?} boolean if true block sliding, otherwise not
     */
    isPreventSliding(boundaryIndex) {
        return !!this.slideConfig && this.slideConfig.infinite === false && getIndex(this.currentImage, this.previews) === boundaryIndex;
    }
    /**
     * Private method to handle navigation changing the previews array and other variables.
     * @param {?} prev
     * @param {?} current
     * @return {?}
     */
    updatePreviews(prev, current) {
        /** @type {?} */
        let prevIndex;
        /** @type {?} */
        let currentIndex;
        try {
            prevIndex = getIndex(prev, this.images);
            currentIndex = getIndex(current, this.images);
        }
        catch (err) {
            console.error('Cannot get previous and current image indexes in previews');
            throw err;
        }
        if (prevIndex === this.images.length - 1 && currentIndex === 0) {
            // first image
            this.setBeginningIndexesPreviews();
            this.previews = this.images.filter((img, i) => i >= this.start && i < this.end);
            return;
        }
        // the same for the opposite case, when you navigate back from the fist image to go to the last one.
        if (prevIndex === 0 && currentIndex === this.images.length - 1) {
            // last image
            this.setEndIndexesPreviews();
            this.previews = this.images.filter((img, i) => i >= this.start && i < this.end);
            return;
        }
        // otherwise manage standard scenarios
        if (prevIndex > currentIndex) {
            this.previous();
        }
        else if (prevIndex < currentIndex) {
            this.next();
        }
    }
}
PreviewsComponent.decorators = [
    { type: Component, args: [{
                selector: 'fg-previews',
                template: "<nav class=\"previews-container\"\n     [attr.aria-label]=\"accessibilityConfig?.previewsContainerAriaLabel\"\n     [title]=\"accessibilityConfig?.previewsContainerTitle\">\n\n  <ng-container *ngIf=\"configPreview?.visible\">\n    <a class=\"nav-left\"\n       [attr.aria-label]=\"accessibilityConfig?.previewScrollPrevAriaLabel\"\n       [tabindex]=\"configPreview.arrows && start > 0 ? 0 : -1\" role=\"button\"\n       (click)=\"onNavigationEvent('left', $event)\" (keyup)=\"onNavigationEvent('left', $event)\">\n      <div class=\"inside {{configPreview.arrows && start > 0 ? 'left-arrow-preview-image' : 'empty-arrow-preview-image'}}\"\n           aria-hidden=\"true\"\n           [title]=\"accessibilityConfig?.previewScrollPrevTitle\"></div>\n    </a>\n\n    <ng-container *ngFor=\"let preview of previews; trackBy: trackById; let index = index\">\n      <img *ngIf=\"preview?.modal?.img\"\n           class=\"inside preview-image {{isActive(preview) ? 'active' : ''}}{{!configPreview.clickable ? ' unclickable' : ''}}\"\n           [src]=\"preview.plain?.img ? preview.plain.img : preview.modal.img\"\n           fgSize [sizeConfig]=\"{width: configPreview.size ? configPreview.size.width : defaultPreviewSize.width,\n                                 height: configPreview.size ? configPreview.size.height : defaultPreviewSize.height}\"\n           [attr.aria-label]=\"preview.modal.ariaLabel ? preview.modal.ariaLabel : ''\"\n           [title]=\"preview.modal.title ? preview.modal.title : ''\"\n           alt=\"{{preview.modal.alt ? preview.modal.alt : ''}}\"\n           [tabindex]=\"0\" role=\"img\"\n           (click)=\"onImageEvent(preview, $event)\" (keyup)=\"onImageEvent(preview, $event)\"/>\n    </ng-container>\n\n\n    <a class=\"nav-right\"\n       [attr.aria-label]=\"accessibilityConfig?.previewScrollNextAriaLabel\"\n       [tabindex]=\"configPreview.arrows && end < images.length ? 0 : -1\" role=\"button\"\n       (click)=\"onNavigationEvent('right', $event)\" (keyup)=\"onNavigationEvent('right', $event)\">\n      <div class=\"inside {{configPreview.arrows && end < images.length ? 'right-arrow-preview-image' : 'empty-arrow-preview-image'}}\"\n           aria-hidden=\"true\"\n           [title]=\"accessibilityConfig?.previewScrollNextTitle\"></div>\n    </a>\n  </ng-container>\n\n</nav>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: ["@media only screen and (max-width:767px),only screen and (max-device-width:767px){.previews-container,.previews-container>.nav-left,.previews-container>.nav-right,.previews-container>.preview-image{display:none}}@media only screen and (min-device-width:768px){.previews-container{align-items:center;-webkit-animation:.8s fadein-semi-visible08;animation:.8s fadein-semi-visible08;display:flex;flex-direction:row;justify-content:center;margin-bottom:15px}.previews-container>.preview-image{cursor:pointer;margin-left:2px;margin-right:2px;opacity:.7;height:50px}.previews-container>.preview-image.active{opacity:1}.previews-container>.preview-image.unclickable{cursor:not-allowed}.previews-container>.preview-image:hover{opacity:1;transition:opacity .5s}.previews-container .nav,.previews-container>.nav-left,.previews-container>.nav-right{color:#919191;cursor:pointer;transition:.5s}.previews-container .nav:hover,.previews-container>.nav-left:hover,.previews-container>.nav-right:hover{-webkit-transform:scale(1.1);transform:scale(1.1)}.previews-container>.nav-left{margin-right:10px}.previews-container>.nav-right{margin-left:10px}}@-webkit-keyframes fadein-visible{from{opacity:0}to{opacity:1}}@keyframes fadein-visible{from{opacity:0}to{opacity:1}}@-webkit-keyframes fadein-semi-visible05{from{opacity:0}to{opacity:.5}}@keyframes fadein-semi-visible05{from{opacity:0}to{opacity:.5}}@-webkit-keyframes fadein-semi-visible08{from{opacity:0}to{opacity:.8}}@keyframes fadein-semi-visible08{from{opacity:0}to{opacity:.8}}@-webkit-keyframes fadein-semi-visible09{from{opacity:0}to{opacity:.9}}@keyframes fadein-semi-visible09{from{opacity:0}to{opacity:.9}}", ".arrow-preview-image,.empty-arrow-preview-image,.left-arrow-preview-image,.right-arrow-preview-image{width:15px;height:15px;opacity:.5}.empty-arrow-preview-image{background:#000;opacity:0}.left-arrow-preview-image{background-image:url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/PjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDQ3Ny4xNzUgNDc3LjE3NSIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNDc3LjE3NSA0NzcuMTc1OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjUxMnB4IiBoZWlnaHQ9IjUxMnB4Ij48Zz48cGF0aCBkPSJNMTQ1LjE4OCwyMzguNTc1bDIxNS41LTIxNS41YzUuMy01LjMsNS4zLTEzLjgsMC0xOS4xcy0xMy44LTUuMy0xOS4xLDBsLTIyNS4xLDIyNS4xYy01LjMsNS4zLTUuMywxMy44LDAsMTkuMWwyMjUuMSwyMjUgICBjMi42LDIuNiw2LjEsNCw5LjUsNHM2LjktMS4zLDkuNS00YzUuMy01LjMsNS4zLTEzLjgsMC0xOS4xTDE0NS4xODgsMjM4LjU3NXoiIGZpbGw9IiNGRkZGRkYiLz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PC9zdmc+);background-size:15px;transition:.5s}.left-arrow-preview-image:hover{-webkit-transform:scale(1.2);transform:scale(1.2)}.right-arrow-preview-image{background-image:url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/PjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDQ3Ny4xNzUgNDc3LjE3NSIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNDc3LjE3NSA0NzcuMTc1OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjUxMnB4IiBoZWlnaHQ9IjUxMnB4Ij48Zz48cGF0aCBkPSJNMzYwLjczMSwyMjkuMDc1bC0yMjUuMS0yMjUuMWMtNS4zLTUuMy0xMy44LTUuMy0xOS4xLDBzLTUuMywxMy44LDAsMTkuMWwyMTUuNSwyMTUuNWwtMjE1LjUsMjE1LjUgICBjLTUuMyw1LjMtNS4zLDEzLjgsMCwxOS4xYzIuNiwyLjYsNi4xLDQsOS41LDRjMy40LDAsNi45LTEuMyw5LjUtNGwyMjUuMS0yMjUuMUMzNjUuOTMxLDI0Mi44NzUsMzY1LjkzMSwyMzQuMjc1LDM2MC43MzEsMjI5LjA3NXogICAiIGZpbGw9IiNGRkZGRkYiLz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PC9zdmc+);background-size:15px;transition:.5s}.right-arrow-preview-image:hover{-webkit-transform:scale(1.2);transform:scale(1.2)}"]
            }] }
];
PreviewsComponent.propDecorators = {
    currentImage: [{ type: Input }],
    images: [{ type: Input }],
    slideConfig: [{ type: Input }],
    previewConfig: [{ type: Input }],
    accessibilityConfig: [{ type: Input }],
    clickPreview: [{ type: Output }]
};
if (false) {
    /**
     * Object of type `InternalLibImage` that represent the visible image.
     * @type {?}
     */
    PreviewsComponent.prototype.currentImage;
    /**
     * Array of `InternalLibImage` that represent the model of this library with all images,
     * thumbs and so on.
     * @type {?}
     */
    PreviewsComponent.prototype.images;
    /**
     * Object of type `SlideConfig` to get `infinite sliding`.
     * @type {?}
     */
    PreviewsComponent.prototype.slideConfig;
    /**
     * Object of type `PreviewConfig` to init PreviewsComponent's features.
     * For instance, it contains a param to show/hide this component, sizes.
     * @type {?}
     */
    PreviewsComponent.prototype.previewConfig;
    /**
     * Object of type `AccessibilityConfig` to init custom accessibility features.
     * For instance, it contains titles, alt texts, aria-labels and so on.
     * @type {?}
     */
    PreviewsComponent.prototype.accessibilityConfig;
    /**
     * Output to emit the clicked preview. The payload contains the `InternalLibImage` associated to the clicked preview.
     * @type {?}
     */
    PreviewsComponent.prototype.clickPreview;
    /**
     * Array of `InternalLibImage` exposed to the template. This field is initialized
     * applying transformations, default values and so on to the input of the same type.
     * @type {?}
     */
    PreviewsComponent.prototype.previews;
    /**
     * Object of type `PreviewConfig` exposed to the template. This field is initialized
     * applying transformations, default values and so on to the input of the same type.
     * @type {?}
     */
    PreviewsComponent.prototype.configPreview;
    /**
     * Start index of the input images used to display previews.
     * @type {?}
     */
    PreviewsComponent.prototype.start;
    /**
     * End index of the input images used to display previews.
     * @type {?}
     */
    PreviewsComponent.prototype.end;
    /**
     * Default preview's size object, also used in the template to apply default sizes to fgSize's directive.
     * @type {?}
     */
    PreviewsComponent.prototype.defaultPreviewSize;
    /**
     * Default preview's config object
     * @type {?}
     */
    PreviewsComponent.prototype.defaultPreviewConfig;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJldmlld3MuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbW9kYWwtYW5ndWxhci1nYWxsZXJ5LyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvcHJldmlld3MvcHJldmlld3MuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXdCQSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLFlBQVfgRUFBRSxLQUFLLEVBQXFCLE1BQU0sRUFBK0IsTUFBTSxlQUFlLENBQUM7QUFFaEosT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFJOUQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFLcEUsT0FBTyxFQUFFLElBQUfgRUFBRSxJQUFJLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7Ozs7QUFXbEQsTUFBTSx3QkFBeUIsU0FBUSxtQkFBbUI7Ozs7Ozs0QkFpQ1QsSUFBSSxZQUFZLEVBQW9COzs7Ozt3QkFNcEQsRUFBRTs7OztrQ0FtQk4sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUU7Ozs7b0NBS2Q7WUFDNUMsT0FBTyxFQUFFLElBQUk7WUFDYixNQUFNLEVBQUUsQ0FBQztZQUNULE1BQU0sRUFBRSxJQUFJO1lBQ1osU0FBUyxFQUFFLElBQUk7O1lBRWYsSUFBSSxFQUFFLElBQUfgQ0FBQyxrQkFBa0I7U0FDOUI7Ozs7Ozs7OztJQVFELFFBQVE7UUFDTixJQUFJLENBQUMsYUFBYSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLElBQUfgQ0FBQyxvQkFBb0IsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7O1FBR3RGLElBQUfgSUFBSSxDQUFDLGFBQWEsSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUU7WUFDckYsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixDQUFDLE1BQU0sQ0FBQztTQUM5RDs7UUFHRCxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUfgQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0tBQ25EOzs7Ozs7SUFPRCxRQUFRLENBQUMsT0FBeUI7UUFDaEMsSUFBSSxDQUFDLE9BQU8sSUFBSSxDQUFDLElBQUfgQ0FBQyxZQUFZLEVBQUU7WUFDbEMsT0FBTyxLQUFLLENBQUM7U0FDZDtRQUNELE9BQU8sT0FBTyxDQUFDLEVBQUUsS0FBSyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQztLQUM1Qzs7Ozs7Ozs7O0lBU0QsV0FBVyxDQUFDLE9BQXNCOztRQUNoQyxNQUFNLE1BQU0sR0FBaUIsT0FBTyxXQUFROztRQUM1QyxNQUFNLFlBQVfgR0FBaUIsT0FBTyxpQkFBYzs7UUFFeEQsSUFBSSxJQUFJLENBQUM7O1FBQ1QsSUFBSSxPQUFPLENBQUM7UUFFWixJQUFJLFlBQVfgRUFBRTtZQUNoQixJQUFJLEdBQUcsWUFBWSxDQUFDLGFBQWEsQ0FBQztZQUNsQyxPQUFPLEdBQUcsWUFBWSxDQUFDLFlBQVfgQ0FBQztTQUNyQzthQUFNO1lBQ0wsT0FBTyxHQUFHLElBQUfgQ0FBQyxZQUFZLENBQUM7U0FDN0I7UUFFRCxJQUFJLE9BQU8sSUFBSSxNQUFNLElBQUfgTUFBTSxDQUFDLGFBQWEsSUFBSSxNQUFNLENBQUMsWUFBWSxFQUFFOzs7O1lBSXBFLElBQUfgQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQztTQUNqRDtRQUVELElBQUfgSUFBSSxJQUFJLE9BQU8sSUFBSSxJQUFJLENBQUMsRUFBRSxLQUFLLE9BQU8sQ0FBQyxFQUFFLEVBQUU7WUFDN0MsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7U0FDcEM7S0FDRjs7Ozs7Ozs7SUFRRCxZQUFZLENBQUMsT0FBeUIsRUFBRSxLQUFpQztRQUN2RSxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsSUFBSSxDQUFDLElBQUfgQ0FBQyxhQUFhLENBQUMsU0FBUyxFQUFFO1lBQ3hELE9BQU87U0FDUjs7UUFDRCxNQUFNLE1BQU0sR0FBVyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDckQsSUFBSSxNQUFNLEtBQUssSUFBSSxFQUFFO1lBQ25CLElBQUfgQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQ2pDO2FBQU0sSUFBSSxNQUFNLEtBQUssSUFBSSxFQUFFO1lBQzFCLElBQUfgQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQ2pDO0tBQ0Y7Ozs7Ozs7SUFPRCxpQkFBaUIsQ0FBQyxTQUFpQixFQUFFLEtBQWlDOztRQUNwRSxNQUFNLE1BQU0sR0FBVyxLQUFLLENBQUMscUJBQXFCLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ3JFLElBQUfgTUFBTSxLQUFLLElBQUfgRUFBRTtZQUNuQixJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDYjthQUFNLElBQUfgTUFBTSxLQUFLLElBQUfgRUFBRTtZQUMxQixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7U0FDakI7S0FDRjs7Ozs7OztJQVFELFNBQVMsQ0FBQyxLQUFhLEVBQUUsSUFBVztRQUNsQyxPQUFPLElBQUfgQ0FBQyxFQUFFLENBQUM7S0FDaEI7Ozs7Ozs7O0lBUU8sWUFBWSxDQUFDLFlBQThCLEVBQUUsTUFBMEI7O1FBQzdFLElBQUfgS0FBSyxDQUFTO1FBQ2xCLElBQUk7WUFDRixLQUFLLEdBQUcsUUFBUSxDQUFDLFlBQVfgRUFBRSxNQUFNLENBQUMsQ0FBQztTQUN4QztRQUFDLE9BQU8sR0FBRyxFQUFFO1lBQ1osTUFBTSxHQUFHLENBQUM7U0FDWDtRQUNELFFBQVEsS0FBSyxFQUFFO1lBQ2IsS0FBSyxDQUFDOztnQkFFSixJQUFJLENBQUMsMkJBQTJCLEVBQUUsQ0FBQztnQkFDbkMsTUFBTTtZQUNSLEtBQUssTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDOztnQkFFcEIsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUM7Z0JBQzdCLE1BQU07WUFDUjs7Z0JBRUUsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7Z0JBQzFCLE1BQU07U0FDVDtRQUNELElBQUfgQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQXFCLEVBQUUsQ0FBUyxFQUFFLEVBQUUsQ0FBQyxDQUFDLElBQUfgSUFBSSxDQUFDLEtBQUssSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDOzs7Ozs7SUFNL0YsMkJBQTJCO1FBQ2pDLElBQUfgQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO1FBQ2YsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxtQkFBUyxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sR0FBRSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDOzs7Ozs7SUFNckUscUJBQXFCO1FBQzNCLElBQUfgQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxHQUFHLG1CQUFTLElBQUfgQ0FBQyxhQUFhLENBQUMsTUFBTSxJQUFHLENBQUMsQ0FBQyxDQUFDO1FBQzlFLElBQUfgQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUM7Ozs7OztJQU14QixrQkFBa0I7UUFDeEIsSUFBSSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLFlBQVfgRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssbUJBQVMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLElBQUcsQ0FBQyxDQUFDLENBQUM7UUFDMUcsSUFBSSxDQUFDLEdBQUcsR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLFlBQVfgRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssbUJBQVMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLElBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDOzs7Ozs7SUFNdEcsSUFBSTs7UUFFVixJQUFJLElBQUfgQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsRUFBRTtZQUNqRCxPQUFPO1NBQ1I7UUFFRCxJQUFJLElBQUfgQ0FBQyxHQUFHLEtBQUssSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUU7WUFDbkMsT0FBTztTQUNSO1FBRUQsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2IsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUfgQ0FBQyxHQUFHLEdBQUcsQ0FBQyxFQUFFLElBQUfgQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFdEQsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQXFCLEVBQUUsQ0FBUyxFQUFFLEVBQUUsQ0FBQyxDQUFDLElBQUfgSUFBSSxDQUFDLEtBQUssSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDOzs7Ozs7SUFNcEcsUUFBUTs7UUFFZCxJQUFJLElBQUfgQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUM1QixPQUFPO1NBQ1I7UUFFRCxJQUFJLElBQUfgQ0FBQyxLQUFLLEtBQUssQ0FBQyxFQUFFO1lBQ3BCLE9BQU87U0FDUjtRQUVELElBQUfgQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN6QyxJQUFJLENBQUMsR0FBRyxHQUFHLElBQUfgQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUV0RCxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUfgQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBcUIsRUFBRSxDQUFTLEVBQUUsRUFBRSxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7Ozs7Ozs7SUFRcEcsZ0JBQWdCLENBQUMsYUFBcUI7UUFDNUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsS0FBSyxLQUFLLElBQUfgUUFBUSxDQUFDLElBQUfgQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLGFBQWEsQ0FBQzs7Ozs7Ozs7SUFNM0gsY0FBYyxDQUFDLElBQXNCLEVBQUUsT0FBeUI7O1FBSXRFLElBQUfgU0FBUyxDQUFTOztRQUN0QixJQUFJLFlBQVfgQ0FBUztRQUN6QixJQUFJO1lBQ0YsU0FBUyxHQUFHLFFBQVEsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3hDLFlBQVfgR0FBRyxRQUFRLENBQUMsT0FBTyxFQUFFLElBQUfgQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUMvQztRQUFDLE9BQU8sR0FBRyxFQUFFO1lBQ1osT0FBTyxDQUFDLEtBQUssQ0FBQywyREFBMkQsQ0FBQyxDQUFDO1lBQzNFLE1BQU0sR0FBRyxDQUFDO1NBQ1g7UUFDRCxJQUFJLFNBQVMsS0FBSyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUfgWUFBWSxLQUFLLENBQUMsRUFBRTs7WUFFOUQsSUFBSSxDQUFDLDJCQUEyQixFQUFFLENBQUM7WUFDbkMsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQXFCLEVBQUUsQ0FBUyxFQUFFLEVBQUUsQ0FBQyxDQUFDLElBQUfgSUFBSSxDQUFDLEtBQUssSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzFHLE9BQU87U0FDUjs7UUFFRCxJQUFJLFNBQVMsS0FBSyxDQUFDLElBQUfgWUFBWSxLQUFLLElBQUfgQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTs7WUFFOUQsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUM7WUFDN0IsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQXFCLEVBQUUsQ0FBUyxFQUFFLEVBQUUsQ0FBQyxDQUFDLElBQUfgSUFBSSxDQUFDLEtBQUssSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzFHLE9BQU87U0FDUjs7UUFHRCxJQUFJLFNBQVMsR0FBRyxZQUFZLEVBQUU7WUFDNUIsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1NBQ2pCO2FBQU0sSUFBSSxTQUFTLEdBQUcsWUFBWSxFQUFFO1lBQ25DLElBQUfgQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUNiOzs7O1lBL1RKLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsYUFBYTtnQkFFdkIsOHhFQUE0QjtnQkFDNUIsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O2FBQ2hEOzs7MkJBS0UsS0FBSztxQkFNTCxLQUFLOzBCQUtMLEtBQUs7NEJBTUwsS0FBSztrQ0FNTCxLQUFLOzJCQUtMLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuIFRoZSBNSVQgTGljZW5zZSAoTUlUKVxuXG4gQ29weXJpZ2h0IChjfgAyMDE3LTIwMTggU3RlZmFubyBDYXBwYSAoS3M4OSlcblxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbiBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuXG4gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsXG4gY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cblxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OIElORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEVcbiBTT0ZUV0FSRS5cbiAqL1xuXG5pbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkNoYW5nZXMsIE9uSW5pdCwgT3V0cHV0LCBTaW1wbGVDaGFuZ2UsIFNpbXBsZUNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgQWNjZXNzaWJsZUNvbXBvbmVudCB9IGZyb20gJy4uL2FjY2Vzc2libGUuY29tcG9uZW50JztcblxuaW1wb3J0IHsgQWNjZXNzaWJpbGl0eUNvbmZpZyB9IGZyb20gJy4uLy4uL21vZGVsL2FjY2Vzc2liaWxpdHkuaW50ZXJmYWNlJztcbmltcG9ydCB7IEltYWdlIH0gZnJvbSAnLi4vLi4vbW9kZWwvaW1hZ2UuY2xhc3MnO1xuaW1wb3J0IHsgSW50ZXJuYWxMaWJJbWFnZSB9IGZyb20gJy4uLy4uL21vZGVsL2ltYWdlLWludGVybmFsLmNsYXNzJztcbmltcG9ydCB7IFNpemUgfSBmcm9tICcuLi8uLi9tb2RlbC9zaXplLmludGVyZmFjZSc7XG5pbXBvcnQgeyBQcmV2aWV3Q29uZmlnIH0gZnJvbSAnLi4vLi4vbW9kZWwvcHJldmlldy1jb25maWcuaW50ZXJmYWNlJztcbmltcG9ydCB7IFNsaWRlQ29uZmlnIH0gZnJvbSAnLi4vLi4vbW9kZWwvc2xpZGUtY29uZmlnLmludGVyZmFjZSc7XG5cbmltcG9ydCB7IE5FWFQsIFBSRVYgfSBmcm9tICcuLi8uLi91dGlscy91c2VyLWlucHV0LnV0aWwnO1xuaW1wb3J0IHsgZ2V0SW5kZXggfSBmcm9tICcuLi8uLi91dGlscy9pbWFnZS51dGlsJztcblxuLyoqXG4gKiBDb21wb25lbnQgd2l0aCBpbWFnZSBwcmV2aWV3c1xuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdrcy1wcmV2aWV3cycsXG4gIHN0eWxlVXJsczogWydwcmV2aWV3cy5zY3NzJywgJ3ByZXZpZXdzLWFycm93cy5zY3NzJ10sXG4gIHRlbXBsYXRlVXJsOiAncHJldmlld3MuaHRtbCcsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIFByZXZpZXdzQ29tcG9uZW50IGV4dGVuZHMgQWNjZXNzaWJsZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzIHtcbiAgLyoqXG4gICAqIE9iamVjdCBvZiB0eXBlIGBJbnRlcm5hbExpYkltYWdlYCB0aGF0IHJlcHJlc2VudCB0aGUgdmlzaWJsZSBpbWFnZS5cbiAgICovXG4gIEBJbnB1dCgpXG4gIGN1cnJlbnRJbWFnZTogSW50ZXJuYWxMaWJJbWFnZTtcbiAgLyoqXG4gICAqIEFycmF5IG9mIGBJbnRlcm5hbExpYkltYWdlYCB0aGF0IHJlcHJlc2VudCB0aGUgbW9kZWwgb2YgdGhpcyBsaWJyYXJ5IHdpdGggYWxsIGltYWdlcyxcbiAgICogdGh1bWJzIGFuZCBzbyBvbi5cbiAgICovXG4gIEBJbnB1dCgpXG4gIGltYWdlczogSW50ZXJuYWxMaWJJbWFnZVtdO1xuICAvKipcbiAgICogT2JqZWN0IG9mIHR5cGUgYFNsaWRlQ29uZmlnYCB0byBnZXQgYGluZmluaXRlIHNsaWRpbmdgLlxuICAgKi9cbiAgQElucHV0KClcbiAgc2xpZGVDb25maWc6IFNsaWRlQ29uZmlnO1xuICAvKipcbiAgICogT2JqZWN0IG9mIHR5cGUgYFByZXZpZXdDb25maWdgIHRvIGluaXQgUHJldmlld3NDb21wb25lbnQncyBmZWF0dXJlcy5cbiAgICogRm9yIGluc3RhbmNlLCBpdCBjb250YWlucyBhIHBhcmFtIHRvIHNob3cvaGlkZSB0aGlzIGNvbXBvbmVudCwgc2l6ZXMuXG4gICAqL1xuICBASW5wdXQoKVxuICBwcmV2aWV3Q29uZmlnOiBQcmV2aWV3Q29uZmlnO1xuICAvKipcbiAgICogT2JqZWN0IG9mIHR5cGUgYEFjY2Vzc2liaWxpdHlDb25maWdgIHRvIGluaXQgY3VzdG9tIGFjY2Vzc2liaWxpdHkgZmVhdHVyZXMuXG4gICAqIEZvciBpbnN0YW5jZSwgaXQgY29udGFpbnMgdGl0bGVzLCBhbHQgdGV4dHMsIGFyaWEtbGFiZWxzIGFuZCBzbyBvbi5cbiAgICovXG4gIEBJbnB1dCgpXG4gIGFjY2Vzc2liaWxpdHlDb25maWc6IEFjY2Vzc2liaWxpdHlDb25maWc7XG4gIC8qKlxuICAgKiBPdXRwdXQgdG8gZW1pdCB0aGUgY2xpY2tlZCBwcmV2aWV3LiBUaGUgcGF5bG9hZCBjb250YWlucyB0aGUgYEludGVybmFsTGliSW1hZ2VgIGFzc29jaWF0ZWQgdG8gdGhlIGNsaWNrZWQgcHJldmlldy5cbiAgICovXG4gIEBPdXRwdXQoKVxuICBjbGlja1ByZXZpZXc6IEV2ZW50RW1pdHRlcjxJbnRlcm5hbExpYkltYWdlPiA9IG5ldyBFdmVudEVtaXR0ZXI8SW50ZXJuYWxMaWJJbWFnZT4oKTtcblxuICAvKipcbiAgICogQXJyYXkgb2YgYEludGVybmFsTGliSW1hZ2VgIGV4cG9zZWQgdG8gdGhlIHRlbXBsYXRlLiBUaGlzIGZpZWxkIGlzIGluaXRpYWxpemVkXG4gICAqIGFwcGx5aW5nIHRyYW5zZm9ybWF0aW9ucywgZGVmYXVsdCB2YWx1ZXMgYW5kIHNvIG9uIHRvIHRoZSBpbnB1dCBvZiB0aGUgc2FtZSB0eXBlLlxuICAgKi9cbiAgcHJldmlld3M6IEludGVybmFsTGliSW1hZ2VbXSA9IFtdO1xuICAvKipcbiAgICogT2JqZWN0IG9mIHR5cGUgYFByZXZpZXdDb25maWdgIGV4cG9zZWQgdG8gdGhlIHRlbXBsYXRlLiBUaGlzIGZpZWxkIGlzIGluaXRpYWxpemVkXG4gICAqIGFwcGx5aW5nIHRyYW5zZm9ybWF0aW9ucywgZGVmYXVsdCB2YWx1ZXMgYW5kIHNvIG9uIHRvIHRoZSBpbnB1dCBvZiB0aGUgc2FtZSB0eXBlLlxuICAgKi9cbiAgY29uZmlnUHJldmlldzogUHJldmlld0NvbmZpZztcblxuICAvKipcbiAgICogU3RhcnQgaW5kZXggb2YgdGhlIGlucHV0IGltYWdlcyB1c2VkIHRvIGRpc3BsYXkgcHJldmlld3MuXG4gICAqL1xuICBzdGFydDogbnVtYmVyO1xuICAvKipcbiAgICogRW5kIGluZGV4IG9mIHRoZSBpbnB1dCBpbWFnZXMgdXNlZCB0byBkaXNwbGF5IHByZXZpZXdzLlxuICAgKi9cbiAgZW5kOiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIERlZmF1bHQgcHJldmlldydzIHNpemUgb2JqZWN0LCBhbHNvIHVzZWQgaW4gdGhlIHRlbXBsYXRlIHRvIGFwcGx5IGRlZmF1bHQgc2l6ZXMgdG8ga3NTaXplJ3MgZGlyZWN0aXZlLlxuICAgKi9cbiAgZGVmYXVsdFByZXZpZXdTaXplOiBTaXplID0geyBoZWlnaHQ6ICc1MHB4Jywgd2lkdGg6ICdhdXRvJyB9O1xuXG4gIC8qKlxuICAgKiBEZWZhdWx0IHByZXZpZXcncyBjb25maWcgb2JqZWN0XG4gICAqL1xuICBwcml2YXRlIGRlZmF1bHRQcmV2aWV3Q29uZmlnOiBQcmV2aWV3Q29uZmlnID0ge1xuICAgIHZpc2libGU6IHRydWUsXG4gICAgbnVtYmVyOiAzLFxuICAgIGFycm93czogdHJ1ZSxcbiAgICBjbGlja2FibGU6IHRydWUsXG4gICAgLy8gYWx3YXlzQ2VudGVyOiBmYWxzZSwgLy8gVE9ETyBzdGlsbCBub3QgaW1wbGVtZW50ZWRcbiAgICBzaXplOiB0aGlzLmRlZmF1bHRQcmV2aWV3U2l6ZVxuICB9O1xuXG4gIC8qKlxuICAgKiBNZXRob2QgwrRuZ09uSW5pdMK0IHRvIGJ1aWxkIGBjb25maWdQcmV2aWV3YCBhcHBseWluZyBhIGRlZmF1bHQgdmFsdWUgYW5kIGFsc28gdG9cbiAgICogaW5pdCB0aGUgYHByZXZpZXdzYCBhcnJheS5cbiAgICogVGhpcyBpcyBhbiBBbmd1bGFyJ3MgbGlmZWN5Y2xlIGhvb2ssIHNvIGl0cyBjYWxsZWQgYXV0b21hdGljYWxseSBieSBBbmd1bGFyIGl0c2VsZi5cbiAgICogSW4gcGFydGljdWxhciwgaXQncyBjYWxsZWQgb25seSBvbmUgdGltZSEhIVxuICAgKi9cbiAgbmdPbkluaXQofgB7XG4gICAgdGhpcy5jb25maWdQcmV2aWV3ID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5kZWZhdWx0UHJldmlld0NvbmZpZywgdGhpcy5wcmV2aWV3Q29uZmlnKTtcblxuICAgIC8vIGlmIG51bWJlciBpcyA8PSAwIHJlc2V0IHRvIGRlZmF1bHRcbiAgICBpZiAodGhpcy5jb25maWdQcmV2aWV3ICYmIHRoaXMuY29uZmlnUHJldmlldy5udW1iZXIgJiYgdGhpcy5jb25maWdQcmV2aWV3Lm51bWJlciA8PSAwfgB7XG4gICAgICB0aGlzLmNvbmZpZ1ByZXZpZXcubnVtYmVyID0gdGhpcy5kZWZhdWx0UHJldmlld0NvbmZpZy5udW1iZXI7XG4gICAgfVxuXG4gICAgLy8gaW5pdCBwcmV2aWV3cyBiYXNlZCBvbiBjdXJyZW50SW1hZ2UgYW5kIHRoZSBmdWxsIGFycmF5IG9mIGltYWdlc1xuICAgIHRoaXMuaW5pdFByZXZpZXdzKHRoaXMuY3VycmVudEltYWdlLCB0aGlzLmltYWdlcyk7XG4gIH1cblxuICAvKipcbiAgICogTWV0aG9kIHRvIGNoZWNrIGlmIGFuIGltYWdlIGlzIGFjdGl2ZSAoaS5lLiBhIHByZXZpZXcgaW1hZ2UpLlxuICAgKiBAcGFyYW0gSW50ZXJuYWxMaWJJbWFnZSBwcmV2aWV3IGlzIGFuIGltYWdlIHRvIGNoZWNrIGlmIGl0J3MgYWN0aXZlIG9yIG5vdFxuICAgKiBAcmV0dXJucyBib29sZWFuIHRydWUgaWYgaXMgYWN0aXZlLCBmYWxzZSBvdGhlcndpc2VcbiAgICovXG4gIGlzQWN0aXZlKHByZXZpZXc6IEludGVybmFsTGliSW1hZ2UpOiBib29sZWFuIHtcbiAgICBpZiAoIXByZXZpZXcgfHwgIXRoaXMuY3VycmVudEltYWdlfgB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiBwcmV2aWV3LmlkID09PSB0aGlzLmN1cnJlbnRJbWFnZS5pZDtcbiAgfVxuXG4gIC8vIFRPRE8gaW1wcm92ZSB0aGlzIG1ldGhvZCB0byBzaW1wbGlmeSB0aGUgc291cmNlY29kZSArIHJlbW92ZSBkdXBsaWNhdGVkIGNvZGVsaW5lc1xuICAvKipcbiAgICogTWV0aG9kIMK0bmdPbkNoYW5nZXPCtCB0byB1cGRhdGUgYHByZXZpZXdzYCBhcnJheS5cbiAgICogQWxzbywgYm90aCBgc3RhcnRgIGFuZCBgZW5kYCBsb2NhbCB2YXJpYWJsZXMgd2lsbCBiZSB1cGRhdGVkIGFjY29yZGluZ2x5LlxuICAgKiBUaGlzIGlzIGFuIEFuZ3VsYXIncyBsaWZlY3ljbGUgaG9vaywgc28gaXRzIGNhbGxlZCBhdXRvbWF0aWNhbGx5IGJ5IEFuZ3VsYXIgaXRzZWxmLlxuICAgKiBJbiBwYXJ0aWN1bGFyLCBpdCdzIGNhbGxlZCB3aGVuIGFueSBkYXRhLWJvdW5kIHByb3BlcnR5IG9mIGEgZGlyZWN0aXZlIGNoYW5nZXMhISFcbiAgICovXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICBjb25zdCBpbWFnZXM6IFNpbXBsZUNoYW5nZSA9IGNoYW5nZXMuaW1hZ2VzO1xuICAgIGNvbnN0IGN1cnJlbnRJbWFnZTogU2ltcGxlQ2hhbmdlID0gY2hhbmdlcy5jdXJyZW50SW1hZ2U7XG5cbiAgICBsZXQgcHJldjtcbiAgICBsZXQgY3VycmVudDtcblxuICAgIGlmIChjdXJyZW50SW1hZ2UpIHtcbiAgICAgIHByZXYgPSBjdXJyZW50SW1hZ2UucHJldmlvdXNWYWx1ZTtcbiAgICAgIGN1cnJlbnQgPSBjdXJyZW50SW1hZ2UuY3VycmVudFZhbHVlO1xuICAgIH0gZWxzZSB7XG4gICAgICBjdXJyZW50ID0gdGhpcy5jdXJyZW50SW1hZ2U7XG4gICAgfVxuXG4gICAgaWYgKGN1cnJlbnQgJiYgaW1hZ2VzICYmIGltYWdlcy5wcmV2aW91c1ZhbHVlICYmIGltYWdlcy5jdXJyZW50VmFsdWUpIHtcbiAgICAgIC8vIEknbSBpbiB0aGlzIGlmIHN0YXRlbWVudCwgaWYgaW5wdXQgaW1hZ2VzIGFyZSBjaGFuZ2VkIChmb3IgaW5zdGFuY2UsIGJlY2F1c2UgSSByZW1vdmVkIG9uZSBvZiB0aGVtIHdpdGggdGhlICdkZWxldGUgYnV0dG9uJyxcbiAgICAgIC8vIG9yIGJlY2F1c2UgdXNlcnMgY2hhbmdlZCB0aGUgaW1hZ2VzIGFycmF5IHdoaWxlIG1vZGFsIGdhbGxlcnkgaXMgc3RpbGwgb3BlbikuXG4gICAgICAvLyBJbiB0aGlzIGNhc2UsIEkgaGF2ZSB0byByZS1pbml0IHByZXZpZXdzLCBiZWNhdXNlIHRoZSBpbnB1dCBhcnJheSBvZiBpbWFnZXMgaXMgY2hhbmdlZC5cbiAgICAgIHRoaXMuaW5pdFByZXZpZXdzKGN1cnJlbnQsIGltYWdlcy5jdXJyZW50VmFsdWUpO1xuICAgIH1cblxuICAgIGlmIChwcmV2ICYmIGN1cnJlbnQgJiYgcHJldi5pZCAhPT0gY3VycmVudC5pZCkge1xuICAgICAgdGhpcy51cGRhdGVQcmV2aWV3cyhwcmV2LCBjdXJyZW50KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogTWV0aG9kIGNhbGxlZCBieSBldmVudHMgZnJvbSBib3RoIGtleWJvYXJkIGFuZCBtb3VzZSBvbiBhIHByZXZpZXcuXG4gICAqIFRoaXMgd2lsbCB0cmlnZ2VyIHRoZSBgY2xpY2twcmV2aWV3YCBvdXRwdXQgd2l0aCB0aGUgaW5wdXQgcHJldmlldyBhcyBpdHMgcGF5bG9hZC5cbiAgICogQHBhcmFtIEludGVybmFsTGliSW1hZ2UgcHJldmlldyB0aGF0IHRyaWdnZXJlZCB0aGlzIG1ldGhvZFxuICAgKiBAcGFyYW0gS2V5Ym9hcmRFdmVudCB8IE1vdXNlRXZlbnQgZXZlbnQgcGF5bG9hZFxuICAgKi9cbiAgb25JbWFnZUV2ZW50KHByZXZpZXc6IEludGVybmFsTGliSW1hZ2UsIGV2ZW50OiBLZXlib2FyZEV2ZW50IHwgTW91c2VFdmVudCkge1xuICAgIGlmICghdGhpcy5jb25maWdQcmV2aWV3IHx8ICF0aGlzLmNvbmZpZ1ByZXZpZXcuY2xpY2thYmxlfgB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IHJlc3VsdDogbnVtYmVyID0gc3VwZXIuaGFuZGxlSW1hZ2VFdmVudChldmVudCk7XG4gICAgaWYgKHJlc3VsdCA9PT0gTkVYVCkge1xuICAgICAgdGhpcy5jbGlja1ByZXZpZXcuZW1pdChwcmV2aWV3KTtcbiAgICB9IGVsc2UgaWYgKHJlc3VsdCA9PT0gUFJFVikge1xuICAgICAgdGhpcy5jbGlja1ByZXZpZXcuZW1pdChwcmV2aWV3KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogTWV0aG9kIGNhbGxlZCBieSBldmVudHMgZnJvbSBib3RoIGtleWJvYXJkIGFuZCBtb3VzZSBvbiBhIG5hdmlnYXRpb24gYXJyb3cuXG4gICAqIEBwYXJhbSBzdHJpbmcgZGlyZWN0aW9uIG9mIHRoZSBuYXZpZ2F0aW9uIHRoYXQgY2FuIGJlIGVpdGhlciAnbmV4dCcgb3IgJ3ByZXYnXG4gICAqIEBwYXJhbSBLZXlib2FyZEV2ZW50IHwgTW91c2VFdmVudCBldmVudCBwYXlsb2FkXG4gICAqL1xuICBvbk5hdmlnYXRpb25FdmVudChkaXJlY3Rpb246IHN0cmluZywgZXZlbnQ6IEtleWJvYXJkRXZlbnQgfCBNb3VzZUV2ZW50fgB7XG4gICAgY29uc3QgcmVzdWx0OiBudW1iZXIgPSBzdXBlci5oYW5kbGVOYXZpZ2F0aW9uRXZlbnQoZGlyZWN0aW9uLCBldmVudCk7XG4gICAgaWYgKHJlc3VsdCA9PT0gTkVYVCkge1xuICAgICAgdGhpcy5uZXh0KCk7XG4gICAgfSBlbHNlIGlmIChyZXN1bHQgPT09IFBSRVYpIHtcbiAgICAgIHRoaXMucHJldmlvdXMoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogTWV0aG9kIHVzZWQgaW4gdGhlIHRlbXBsYXRlIHRvIHRyYWNrIGlkcyBpbiBuZ0Zvci5cbiAgICogQHBhcmFtIG51bWJlciBpbmRleCBvZiB0aGUgYXJyYXlcbiAgICogQHBhcmFtIEltYWdlIGl0ZW0gb2YgdGhlIGFycmF5XG4gICAqIEByZXR1cm5zIG51bWJlciB0aGUgaWQgb2YgdGhlIGl0ZW1cbiAgICovXG4gIHRyYWNrQnlJZChpbmRleDogbnVtYmVyLCBpdGVtOiBJbWFnZSk6IG51bWJlciB7XG4gICAgcmV0dXJuIGl0ZW0uaWQ7XG4gIH1cblxuICAvKipcbiAgICogUHJpdmF0ZSBtZXRob2QgdG8gaW5pdCBwcmV2aWV3cyBiYXNlZCBvbiB0aGUgY3VycmVudEltYWdlIGFuZCB0aGUgZnVsbCBhcnJheSBvZiBpbWFnZXMuXG4gICAqIFRoZSBjdXJyZW50IGltYWdlIGluIG1hbmRhdG9yeSB0byBzaG93IGFsd2F5cyB0aGUgY3VycmVudCBwcmV2aWV3IChhcyBoaWdobGlnaHRlZCkuXG4gICAqIEBwYXJhbSBJbnRlcm5hbExpYkltYWdlIGN1cnJlbnRJbWFnZSB0byBkZWNpZGUgaG93IHRvIHNob3cgcHJldmlld3MsIGJlY2F1c2UgSSBhbHdheXMgd2FudCB0byBzZWUgdGhlIGN1cnJlbnQgaW1hZ2UgYXMgaGlnaGxpZ2h0ZWRcbiAgICogQHBhcmFtIEludGVybmFsTGliSW1hZ2VbXSBpbWFnZXMgaXMgdGhlIGFycmF5IG9mIGFsbCBpbWFnZXMuXG4gICAqL1xuICBwcml2YXRlIGluaXRQcmV2aWV3cyhjdXJyZW50SW1hZ2U6IEludGVybmFsTGliSW1hZ2UsIGltYWdlczogSW50ZXJuYWxMaWJJbWFnZVtdfgB7XG4gICAgbGV0IGluZGV4OiBudW1iZXI7XG4gICAgdHJ5IHtcbiAgICAgIGluZGV4ID0gZ2V0SW5kZXgoY3VycmVudEltYWdlLCBpbWFnZXMpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgdGhyb3cgZXJyO1xuICAgIH1cbiAgICBzd2l0Y2ggKGluZGV4fgB7XG4gICAgICBjYXNlIDA6XG4gICAgICAgIC8vIGZpcnN0IGltYWdlXG4gICAgICAgIHRoaXMuc2V0QmVnaW5uaW5nSW5kZXhlc1ByZXZpZXdzKCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBpbWFnZXMubGVuZ3RoIC0gMTpcbiAgICAgICAgLy8gbGFzdCBpbWFnZVxuICAgICAgICB0aGlzLnNldEVuZEluZGV4ZXNQcmV2aWV3cygpO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIC8vIG90aGVyIGltYWdlc1xuICAgICAgICB0aGlzLnNldEluZGV4ZXNQcmV2aWV3cygpO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gICAgdGhpcy5wcmV2aWV3cyA9IGltYWdlcy5maWx0ZXIoKGltZzogSW50ZXJuYWxMaWJJbWFnZSwgaTogbnVtYmVyfgA9PiBpID49IHRoaXMuc3RhcnQgJiYgaSA8IHRoaXMuZW5kKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQcml2YXRlIG1ldGhvZCB0byBpbml0IGJvdGggYHN0YXJ0YCBhbmQgYGVuZGAgdG8gdGhlIGJlZ2lubmluZy5cbiAgICovXG4gIHByaXZhdGUgc2V0QmVnaW5uaW5nSW5kZXhlc1ByZXZpZXdzKCkge1xuICAgIHRoaXMuc3RhcnQgPSAwO1xuICAgIHRoaXMuZW5kID0gTWF0aC5taW4oPG51bWJlcj50aGlzLmNvbmZpZ1ByZXZpZXcubnVtYmVyLCB0aGlzLmltYWdlcy5sZW5ndGgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFByaXZhdGUgbWV0aG9kIHRvIGluaXQgYm90aCBgc3RhcnRgIGFuZCBgZW5kYCB0byB0aGUgZW5kLlxuICAgKi9cbiAgcHJpdmF0ZSBzZXRFbmRJbmRleGVzUHJldmlld3MofgB7XG4gICAgdGhpcy5zdGFydCA9IHRoaXMuaW1hZ2VzLmxlbmd0aCAtIDEgLSAoPG51bWJlcj50aGlzLmNvbmZpZ1ByZXZpZXcubnVtYmVyIC0gMSk7XG4gICAgdGhpcy5lbmQgPSB0aGlzLmltYWdlcy5sZW5ndGg7XG4gIH1cblxuICAvKipcbiAgICogUHJpdmF0ZSBtZXRob2QgdG8gdXBkYXRlIGJvdGggYHN0YXJ0YCBhbmQgYGVuZGAgYmFzZWQgb24gdGhlIGN1cnJlbnRJbWFnZS5cbiAgICovXG4gIHByaXZhdGUgc2V0SW5kZXhlc1ByZXZpZXdzKCkge1xuICAgIHRoaXMuc3RhcnQgPSBnZXRJbmRleCh0aGlzLmN1cnJlbnRJbWFnZSwgdGhpcy5pbWFnZXMpIC0gTWF0aC5mbG9vcig8bnVtYmVyPnRoaXMuY29uZmlnUHJldmlldy5udW1iZXIgLyAyKTtcbiAgICB0aGlzLmVuZCA9IGdldEluZGV4KHRoaXMuY3VycmVudEltYWdlLCB0aGlzLmltYWdlcykgKyBNYXRoLmZsb29yKDxudW1iZXI+dGhpcy5jb25maWdQcmV2aWV3Lm51bWJlciAvIDIpICsgMTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQcml2YXRlIG1ldGhvZCB0byB1cGRhdGUgdGhlIHZpc2libGUgcHJldmlld3MgbmF2aWdhdGluZyB0byB0aGUgcmlnaHQgKG5leHQpLlxuICAgKi9cbiAgcHJpdmF0ZSBuZXh0KCkge1xuICAgIC8vIGNoZWNrIGlmIG5leHRJbWFnZSBzaG91bGQgYmUgYmxvY2tlZFxuICAgIGlmICh0aGlzLmlzUHJldmVudFNsaWRpbmcodGhpcy5pbWFnZXMubGVuZ3RoIC0gMSkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5lbmQgPT09IHRoaXMuaW1hZ2VzLmxlbmd0aCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuc3RhcnQrKztcbiAgICB0aGlzLmVuZCA9IE1hdGgubWluKHRoaXMuZW5kICsgMSwgdGhpcy5pbWFnZXMubGVuZ3RoKTtcblxuICAgIHRoaXMucHJldmlld3MgPSB0aGlzLmltYWdlcy5maWx0ZXIoKGltZzogSW50ZXJuYWxMaWJJbWFnZSwgaTogbnVtYmVyfgA9PiBpID49IHRoaXMuc3RhcnQgJiYgaSA8IHRoaXMuZW5kKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQcml2YXRlIG1ldGhvZCB0byB1cGRhdGUgdGhlIHZpc2libGUgcHJldmlld3MgbmF2aWdhdGluZyB0byB0aGUgbGVmdCAocHJldmlvdXMpLlxuICAgKi9cbiAgcHJpdmF0ZSBwcmV2aW91cygpIHtcbiAgICAvLyBjaGVjayBpZiBwcmV2SW1hZ2Ugc2hvdWxkIGJlIGJsb2NrZWRcbiAgICBpZiAodGhpcy5pc1ByZXZlbnRTbGlkaW5nKDApfgB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuc3RhcnQgPT09IDApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLnN0YXJ0ID0gTWF0aC5tYXgodGhpcy5zdGFydCAtIDEsIDApO1xuICAgIHRoaXMuZW5kID0gTWF0aC5taW4odGhpcy5lbmQgLSAxLCB0aGlzLmltYWdlcy5sZW5ndGgpO1xuXG4gICAgdGhpcy5wcmV2aWV3cyA9IHRoaXMuaW1hZ2VzLmZpbHRlcigoaW1nOiBJbnRlcm5hbExpYkltYWdlLCBpOiBudW1iZXIpID0+IGkgPj0gdGhpcy5zdGFydCAmJiBpIDwgdGhpcy5lbmQpO1xuICB9XG5cbiAgLyoqXG4gICAqIFByaXZhdGUgbWV0aG9kIHRvIGJsb2NrL3Blcm1pdCBzbGlkaW5nIGJldHdlZW4gcHJldmlld3MuXG4gICAqIEBwYXJhbSBudW1iZXIgYm91bmRhcnlJbmRleCBpcyB0aGUgZmlyc3Qgb3IgdGhlIGxhc3QgaW5kZXggb2YgYGltYWdlc2AgaW5wdXQgYXJyYXlcbiAgICogQHJldHVybnMgYm9vbGVhbiBpZiB0cnVlIGJsb2NrIHNsaWRpbmcsIG90aGVyd2lzZSBub3RcbiAgICovXG4gIHByaXZhdGUgaXNQcmV2ZW50U2xpZGluZyhib3VuZGFyeUluZGV4OiBudW1iZXIpOiBib29sZWFuIHtcbiAgICByZXR1cm4gISF0aGlzLnNsaWRlQ29uZmlnICYmIHRoaXMuc2xpZGVDb25maWcuaW5maW5pdGUgPT09IGZhbHNlICYmIGdldEluZGV4KHRoaXMuY3VycmVudEltYWdlLCB0aGlzLnByZXZpZXdzfgA9PT0gYm91bmRhcnlJbmRleDtcbiAgfVxuXG4gIC8qKlxuICAgKiBQcml2YXRlIG1ldGhvZCB0byBoYW5kbGUgbmF2aWdhdGlvbiBjaGFuZ2luZyB0aGUgcHJldmlld3MgYXJyYXkgYW5kIG90aGVyIHZhcmlhYmxlcy5cbiAgICovXG4gIHByaXZhdGUgdXBkYXRlUHJldmlld3MocHJldjogSW50ZXJuYWxMaWJJbWFnZSwgY3VycmVudDogSW50ZXJuYWxMaWJJbWFnZSkge1xuICAgIC8vIHRvIG1hbmFnZSBpbmZpbml0ZSBzbGlkaW5nIEkgaGF2ZSB0byByZXNldCBib3RoIGBzdGFydGAgYW5kIGBlbmRgIGF0IHRoZSBiZWdpbm5pbmdcbiAgICAvLyB0byBzaG93IGFnYWluIHByZXZpZXdzIGZyb20gdGhlIGZpcnN0IGltYWdlLlxuICAgIC8vIFRoaXMgaGFwcGVucyB3aGVuIHlvdSBuYXZpZ2F0ZSBvdmVyIHRoZSBsYXN0IGltYWdlIHRvIHJldHVybiB0byB0aGUgZmlyc3Qgb25lXG4gICAgbGV0IHByZXZJbmRleDogbnVtYmVyO1xuICAgIGxldCBjdXJyZW50SW5kZXg6IG51bWJlcjtcbiAgICB0cnkge1xuICAgICAgcHJldkluZGV4ID0gZ2V0SW5kZXgocHJldiwgdGhpcy5pbWFnZXMpO1xuICAgICAgY3VycmVudEluZGV4ID0gZ2V0SW5kZXgoY3VycmVudCwgdGhpcy5pbWFnZXMpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgY29uc29sZS5lcnJvcignQ2Fubm90IGdldCBwcmV2aW91cyBhbmQgY3VycmVudCBpbWFnZSBpbmRleGVzIGluIHByZXZpZXdzJyk7XG4gICAgICB0aHJvdyBlcnI7XG4gICAgfVxuICAgIGlmIChwcmV2SW5kZXggPT09IHRoaXMuaW1hZ2VzLmxlbmd0aCAtIDEgJiYgY3VycmVudEluZGV4ID09PSAwfgB7XG4gICAgICAvLyBmaXJzdCBpbWFnZVxuICAgICAgdGhpcy5zZXRCZWdpbm5pbmdJbmRleGVzUHJldmlld3MoKTtcbiAgICAgIHRoaXMucHJldmlld3MgPSB0aGlzLmltYWdlcy5maWx0ZXIoKGltZzogSW50ZXJuYWxMaWJJbWFnZSwgaTogbnVtYmVyfgA9PiBpID49IHRoaXMuc3RhcnQgJiYgaSA8IHRoaXMuZW5kKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy8gdGhlIHNhbWUgZm9yIHRoZSBvcHBvc2l0ZSBjYXNlLCB3aGVuIHlvdSBuYXZpZ2F0ZSBiYWNrIGZyb20gdGhlIGZpc3QgaW1hZ2UgdG8gZ28gdG8gdGhlIGxhc3Qgb25lLlxuICAgIGlmIChwcmV2SW5kZXggPT09IDAgJiYgY3VycmVudEluZGV4ID09PSB0aGlzLmltYWdlcy5sZW5ndGggLSAxfgB7XG4gICAgICAvLyBsYXN0IGltYWdlXG4gICAgICB0aGlzLnNldEVuZEluZGV4ZXNQcmV2aWV3cygpO1xuICAgICAgdGhpcy5wcmV2aWV3cyA9IHRoaXMuaW1hZ2VzLmZpbHRlcigoaW1nOiBJbnRlcm5hbExpYkltYWdlLCBpOiBudW1iZXIpID0+IGkgPj0gdGhpcy5zdGFydCAmJiBpIDwgdGhpcy5lbmQpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIG90aGVyd2lzZSBtYW5hZ2Ugc3RhbmRhcmQgc2NlbmFyaW9zXG4gICAgaWYgKHByZXZJbmRleCA+IGN1cnJlbnRJbmRleCkge1xuICAgICAgdGhpcy5wcmV2aW91cygpO1xuICAgIH0gZWxzZSBpZiAocHJldkluZGV4IDwgY3VycmVudEluZGV4fgB7XG4gICAgICB0aGlzLm5leHQoKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==