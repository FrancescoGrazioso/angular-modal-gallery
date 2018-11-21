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
import * as tslib_1 from "tslib";
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { AccessibleComponent } from '../accessible.component';
import { InternalLibImage } from '../../model/image-internal.class';
import { NEXT, PREV } from '../../utils/user-input.util';
import { getIndex } from '../../utils/image.util';
/**
 * Component with image previews
 */
var PreviewsComponent = /** @class */ (function (_super) {
    tslib_1.__extends(PreviewsComponent, _super);
    function PreviewsComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * Output to emit the clicked preview. The payload contains the `InternalLibImage` associated to the clicked preview.
         */
        _this.clickPreview = new EventEmitter();
        /**
         * Array of `InternalLibImage` exposed to the template. This field is initialized
         * applying transformations, default values and so on to the input of the same type.
         */
        _this.previews = [];
        /**
         * Default preview's size object, also used in the template to apply default sizes to fgSize's directive.
         */
        _this.defaultPreviewSize = { height: '50px', width: 'auto' };
        /**
         * Default preview's config object
         */
        _this.defaultPreviewConfig = {
            visible: true,
            number: 3,
            arrows: true,
            clickable: true,
            // alwaysCenter: false, // TODO still not implemented
            size: _this.defaultPreviewSize
        };
        return _this;
    }
    /**
     * Method ´ngOnInit´ to build `configPreview` applying a default value and also to
     * init the `previews` array.
     * This is an Angular's lifecycle hook, so its called automatically by Angular itself.
     * In particular, it's called only one time!!!
     */
    /**
     * Method ´ngOnInit´ to build `configPreview` applying a default value and also to
     * init the `previews` array.
     * This is an Angular's lifecycle hook, so its called automatically by Angular itself.
     * In particular, it's called only one time!!!
     * @return {?}
     */
    PreviewsComponent.prototype.ngOnInit = /**
     * Method ´ngOnInit´ to build `configPreview` applying a default value and also to
     * init the `previews` array.
     * This is an Angular's lifecycle hook, so its called automatically by Angular itself.
     * In particular, it's called only one time!!!
     * @return {?}
     */
    function () {
        this.configPreview = Object.assign({}, this.defaultPreviewConfig, this.previewConfig);
        // if number is <= 0 reset to default
        if (this.configPreview && this.configPreview.number && this.configPreview.number <= 0) {
            this.configPreview.number = this.defaultPreviewConfig.number;
        }
        // init previews based on currentImage and the full array of images
        this.initPreviews(this.currentImage, this.images);
    };
    /**
     * Method to check if an image is active (i.e. a preview image).
     * @param InternalLibImage preview is an image to check if it's active or not
     * @returns boolean true if is active, false otherwise
     */
    /**
     * Method to check if an image is active (i.e. a preview image).
     * @param {?} preview
     * @return {?} boolean true if is active, false otherwise
     */
    PreviewsComponent.prototype.isActive = /**
     * Method to check if an image is active (i.e. a preview image).
     * @param {?} preview
     * @return {?} boolean true if is active, false otherwise
     */
    function (preview) {
        if (!preview || !this.currentImage) {
            return false;
        }
        return preview.id === this.currentImage.id;
    };
    // TODO improve this method to simplify the sourcecode + remove duplicated codelines
    /**
     * Method ´ngOnChanges´ to update `previews` array.
     * Also, both `start` and `end` local variables will be updated accordingly.
     * This is an Angular's lifecycle hook, so its called automatically by Angular itself.
     * In particular, it's called when any data-bound property of a directive changes!!!
     */
    /**
     * Method ´ngOnChanges´ to update `previews` array.
     * Also, both `start` and `end` local variables will be updated accordingly.
     * This is an Angular's lifecycle hook, so its called automatically by Angular itself.
     * In particular, it's called when any data-bound property of a directive changes!!!
     * @param {?} changes
     * @return {?}
     */
    PreviewsComponent.prototype.ngOnChanges = /**
     * Method ´ngOnChanges´ to update `previews` array.
     * Also, both `start` and `end` local variables will be updated accordingly.
     * This is an Angular's lifecycle hook, so its called automatically by Angular itself.
     * In particular, it's called when any data-bound property of a directive changes!!!
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        /** @type {?} */
        var images = changes["images"];
        /** @type {?} */
        var currentImage = changes["currentImage"];
        /** @type {?} */
        var prev;
        /** @type {?} */
        var current;
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
    };
    /**
     * Method called by events from both keyboard and mouse on a preview.
     * This will trigger the `clickpreview` output with the input preview as its payload.
     * @param InternalLibImage preview that triggered this method
     * @param KeyboardEvent | MouseEvent event payload
     */
    /**
     * Method called by events from both keyboard and mouse on a preview.
     * This will trigger the `clickpreview` output with the input preview as its payload.
     * @param {?} preview
     * @param {?} event
     * @return {?}
     */
    PreviewsComponent.prototype.onImageEvent = /**
     * Method called by events from both keyboard and mouse on a preview.
     * This will trigger the `clickpreview` output with the input preview as its payload.
     * @param {?} preview
     * @param {?} event
     * @return {?}
     */
    function (preview, event) {
        if (!this.configPreview || !this.configPreview.clickable) {
            return;
        }
        /** @type {?} */
        var result = _super.prototype.handleImageEvent.call(this, event);
        if (result === NEXT) {
            this.clickPreview.emit(preview);
        }
        else if (result === PREV) {
            this.clickPreview.emit(preview);
        }
    };
    /**
     * Method called by events from both keyboard and mouse on a navigation arrow.
     * @param string direction of the navigation that can be either 'next' or 'prev'
     * @param KeyboardEvent | MouseEvent event payload
     */
    /**
     * Method called by events from both keyboard and mouse on a navigation arrow.
     * @param {?} direction
     * @param {?} event
     * @return {?}
     */
    PreviewsComponent.prototype.onNavigationEvent = /**
     * Method called by events from both keyboard and mouse on a navigation arrow.
     * @param {?} direction
     * @param {?} event
     * @return {?}
     */
    function (direction, event) {
        /** @type {?} */
        var result = _super.prototype.handleNavigationEvent.call(this, direction, event);
        if (result === NEXT) {
            this.next();
        }
        else if (result === PREV) {
            this.previous();
        }
    };
    /**
     * Method used in the template to track ids in ngFor.
     * @param number index of the array
     * @param Image item of the array
     * @returns number the id of the item
     */
    /**
     * Method used in the template to track ids in ngFor.
     * @param {?} index
     * @param {?} item
     * @return {?} number the id of the item
     */
    PreviewsComponent.prototype.trackById = /**
     * Method used in the template to track ids in ngFor.
     * @param {?} index
     * @param {?} item
     * @return {?} number the id of the item
     */
    function (index, item) {
        return item.id;
    };
    /**
     * Private method to init previews based on the currentImage and the full array of images.
     * The current image in mandatory to show always the current preview (as highlighted).
     * @param {?} currentImage
     * @param {?} images
     * @return {?}
     */
    PreviewsComponent.prototype.initPreviews = /**
     * Private method to init previews based on the currentImage and the full array of images.
     * The current image in mandatory to show always the current preview (as highlighted).
     * @param {?} currentImage
     * @param {?} images
     * @return {?}
     */
    function (currentImage, images) {
        var _this = this;
        /** @type {?} */
        var index;
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
        this.previews = images.filter(function (img, i) { return i >= _this.start && i < _this.end; });
    };
    /**
     * Private method to init both `start` and `end` to the beginning.
     * @return {?}
     */
    PreviewsComponent.prototype.setBeginningIndexesPreviews = /**
     * Private method to init both `start` and `end` to the beginning.
     * @return {?}
     */
    function () {
        this.start = 0;
        this.end = Math.min(/** @type {?} */ (this.configPreview.number), this.images.length);
    };
    /**
     * Private method to init both `start` and `end` to the end.
     * @return {?}
     */
    PreviewsComponent.prototype.setEndIndexesPreviews = /**
     * Private method to init both `start` and `end` to the end.
     * @return {?}
     */
    function () {
        this.start = this.images.length - 1 - (/** @type {?} */ (this.configPreview.number) - 1);
        this.end = this.images.length;
    };
    /**
     * Private method to update both `start` and `end` based on the currentImage.
     * @return {?}
     */
    PreviewsComponent.prototype.setIndexesPreviews = /**
     * Private method to update both `start` and `end` based on the currentImage.
     * @return {?}
     */
    function () {
        this.start = getIndex(this.currentImage, this.images) - Math.floor(/** @type {?} */ (this.configPreview.number) / 2);
        this.end = getIndex(this.currentImage, this.images) + Math.floor(/** @type {?} */ (this.configPreview.number) / 2) + 1;
    };
    /**
     * Private method to update the visible previews navigating to the right (next).
     * @return {?}
     */
    PreviewsComponent.prototype.next = /**
     * Private method to update the visible previews navigating to the right (next).
     * @return {?}
     */
    function () {
        var _this = this;
        // check if nextImage should be blocked
        if (this.isPreventSliding(this.images.length - 1)) {
            return;
        }
        if (this.end === this.images.length) {
            return;
        }
        this.start++;
        this.end = Math.min(this.end + 1, this.images.length);
        this.previews = this.images.filter(function (img, i) { return i >= _this.start && i < _this.end; });
    };
    /**
     * Private method to update the visible previews navigating to the left (previous).
     * @return {?}
     */
    PreviewsComponent.prototype.previous = /**
     * Private method to update the visible previews navigating to the left (previous).
     * @return {?}
     */
    function () {
        var _this = this;
        // check if prevImage should be blocked
        if (this.isPreventSliding(0)) {
            return;
        }
        if (this.start === 0) {
            return;
        }
        this.start = Math.max(this.start - 1, 0);
        this.end = Math.min(this.end - 1, this.images.length);
        this.previews = this.images.filter(function (img, i) { return i >= _this.start && i < _this.end; });
    };
    /**
     * Private method to block/permit sliding between previews.
     * @param {?} boundaryIndex
     * @return {?} boolean if true block sliding, otherwise not
     */
    PreviewsComponent.prototype.isPreventSliding = /**
     * Private method to block/permit sliding between previews.
     * @param {?} boundaryIndex
     * @return {?} boolean if true block sliding, otherwise not
     */
    function (boundaryIndex) {
        return !!this.slideConfig && this.slideConfig.infinite === false && getIndex(this.currentImage, this.previews) === boundaryIndex;
    };
    /**
     * Private method to handle navigation changing the previews array and other variables.
     * @param {?} prev
     * @param {?} current
     * @return {?}
     */
    PreviewsComponent.prototype.updatePreviews = /**
     * Private method to handle navigation changing the previews array and other variables.
     * @param {?} prev
     * @param {?} current
     * @return {?}
     */
    function (prev, current) {
        var _this = this;
        /** @type {?} */
        var prevIndex;
        /** @type {?} */
        var currentIndex;
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
            this.previews = this.images.filter(function (img, i) { return i >= _this.start && i < _this.end; });
            return;
        }
        // the same for the opposite case, when you navigate back from the fist image to go to the last one.
        if (prevIndex === 0 && currentIndex === this.images.length - 1) {
            // last image
            this.setEndIndexesPreviews();
            this.previews = this.images.filter(function (img, i) { return i >= _this.start && i < _this.end; });
            return;
        }
        // otherwise manage standard scenarios
        if (prevIndex > currentIndex) {
            this.previous();
        }
        else if (prevIndex < currentIndex) {
            this.next();
        }
    };
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
    return PreviewsComponent;
}(AccessibleComponent));
export { PreviewsComponent };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJldmlld3MuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbW9kYWwtYW5ndWxhci1nYWxsZXJ5LyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvcHJldmlld3MvcHJldmlld3MuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF3QkEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFxQixNQUFNLEVBQStCLE1BQU0sZUFBZSxDQUFDO0FBRWhKLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBSTlELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBS3BFLE9BQU8sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDekQsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLHdCQUF3QixDQUFDOzs7OztJQVdYLDZDQUFtQjs7Ozs7OzZCQWlDVCxJQUFJLFlBQVfgRUFBb0I7Ozs7O3lCQU1wRCxFQUFFOzs7O21DQW1CTixFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRTs7OztxQ0FLZDtZQUM1QyxPQUFPLEVBQUUsSUFBSTtZQUNiLE1BQU0sRUFBRSxDQUFDO1lBQ1QsTUFBTSxFQUFFLElBQUk7WUFDWixTQUFTLEVBQUUsSUFBSTs7WUFFZixJQUFJLEVBQUUsS0FBSSxDQUFDLGtCQUFrQjtTQUM5Qjs7O0lBRUQ7Ozs7O09BS0c7Ozs7Ozs7O0lBQ0gsb0NBQVE7Ozs7Ozs7SUFBUjtRQUNFLElBQUfgQ0FBQyxhQUFhLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLG9CQUFvQixFQUFFLElBQUfgQ0FBQyxhQUFhLENBQUMsQ0FBQzs7UUFHdEYsSUFBSSxJQUFJLENBQUMsYUFBYSxJQUFJLElBQUfgQ0FBQyxhQUFhLENBQUMsTUFBTSxJQUFJLElBQUfgQ0FBQyxhQUFhLENBQUMsTUFBTSxJQUFJLENBQUMsRUFBRTtZQUNyRixJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsb0JBQW9CLENBQUMsTUFBTSxDQUFDO1NBQzlEOztRQUdELElBQUfgQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFlBQVfgRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7S0FDbkQ7SUFFRDs7OztPQUlHOzs7Ozs7SUFDSCxvQ0FBUTs7Ozs7SUFBUixVQUFTLE9BQXlCO1FBQ2hDLElBQUfgQ0FBQyxPQUFPLElBQUfgQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ2xDLE9BQU8sS0FBSyxDQUFDO1NBQ2Q7UUFDRCxPQUFPLE9BQU8sQ0FBQyxFQUFFLEtBQUssSUFBSSxDQUFDLFlBQVfgQ0FBQyxFQUFFLENBQUM7S0FDNUM7SUFFRCxvRkFBb0Y7SUFDcEY7Ozs7O09BS0c7Ozs7Ozs7OztJQUNILHVDQUFXOzs7Ozs7OztJQUFYLFVBQVfgT0FBc0I7O1FBQ2hDLElBQU0sTUFBTSxHQUFpQixPQUFPLFdBQVE7O1FBQzVDLElBQU0sWUFBWSxHQUFpQixPQUFPLGlCQUFjOztRQUV4RCxJQUFJLElBQUfgQ0FBQzs7UUFDVCxJQUFJLE9BQU8sQ0FBQztRQUVaLElBQUfgWUFBWSxFQUFFO1lBQ2hCLElBQUfgR0FBRyxZQUFZLENBQUMsYUFBYSxDQUFDO1lBQ2xDLE9BQU8sR0FBRyxZQUFZLENBQUMsWUFBWSxDQUFDO1NBQ3JDO2FBQU07WUFDTCxPQUFPLEdBQUcsSUFBSSxDQUFDLFlBQVfgQ0FBQztTQUM3QjtRQUVELElBQUfgT0FBTyxJQUFJLE1BQU0sSUFBSSxNQUFNLENBQUMsYUFBYSxJQUFJLE1BQU0sQ0FBQyxZQUFZLEVBQUU7Ozs7WUFJcEUsSUFBSSxDQUFDLFlBQVfgQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLFlBQVfgQ0FBQyxDQUFDO1NBQ2pEO1FBRUQsSUFBSSxJQUFJLElBQUfgT0FBTyxJQUFJLElBQUfgQ0FBQyxFQUFFLEtBQUssT0FBTyxDQUFDLEVBQUUsRUFBRTtZQUM3QyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUfgRUFBRSxPQUFPLENBQUMsQ0FBQztTQUNwQztLQUNGO0lBRUQ7Ozs7O09BS0c7Ozs7Ozs7O0lBQ0gsd0NBQVk7Ozs7Ozs7SUFBWixVQUFhLE9BQXlCLEVBQUUsS0FBaUM7UUFDdkUsSUFBSSxDQUFDLElBQUfgQ0FBQyxhQUFhLElBQUfgQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsRUFBRTtZQUN4RCxPQUFPO1NBQ1I7O1FBQ0QsSUFBTSxNQUFNLEdBQVcsaUJBQU0sZ0JBQWdCLFlBQUMsS0FBSyxDQUFDLENBQUM7UUFDckQsSUFBSSxNQUFNLEtBQUssSUFBSSxFQUFFO1lBQ25CLElBQUfgQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQ2pDO2FBQU0sSUFBSSxNQUFNLEtBQUssSUFBSSxFQUFFO1lBQzFCLElBQUfgQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQ2pDO0tBQ0Y7SUFFRDs7OztPQUlHOzs7Ozs7O0lBQ0gsNkNBQWlCOzs7Ozs7SUFBakIsVUFBa0IsU0FBaUIsRUFBRSxLQUFpQzs7UUFDcEUsSUFBTSxNQUFNLEdBQVcsaUJBQU0scUJBQXFCLFlBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ3JFLElBQUfgTUFBTSxLQUFLLElBQUfgRUFBRTtZQUNuQixJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDYjthQUFNLElBQUfgTUFBTSxLQUFLLElBQUfgRUFBRTtZQUMxQixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7U0FDakI7S0FDRjtJQUVEOzs7OztPQUtHOzs7Ozs7O0lBQ0gscUNBQVM7Ozs7OztJQUFULFVBQVUsS0FBYSxFQUFFLElBQVc7UUFDbEMsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDO0tBQ2hCOzs7Ozs7OztJQVFPLHdDQUFZOzs7Ozs7O2NBQUMsWUFBOEIsRUFBRSxNQUEwQjs7O1FBQzdFLElBQUfgS0FBSyxDQUFTO1FBQ2xCLElBQUk7WUFDRixLQUFLLEdBQUcsUUFBUSxDQUFDLFlBQVfgRUFBRSxNQUFNLENBQUMsQ0FBQztTQUN4QztRQUFDLE9BQU8sR0FBRyxFQUFFO1lBQ1osTUFBTSxHQUFHLENBQUM7U0FDWDtRQUNELFFBQVEsS0FBSyxFQUFFO1lBQ2IsS0FBSyxDQUFDOztnQkFFSixJQUFJLENBQUMsMkJBQTJCLEVBQUUsQ0FBQztnQkFDbkMsTUFBTTtZQUNSLEtBQUssTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDOztnQkFFcEIsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUM7Z0JBQzdCLE1BQU07WUFDUjs7Z0JBRUUsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7Z0JBQzFCLE1BQU07U0FDVDtRQUNELElBQUfgQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxVQUFDLEdBQXFCLEVBQUUsQ0FBUyxJQUFLLE9BQUEsQ0FBQyxJQUFJLEtBQUfgQ0FBQyxLQUFLLElBQUfgQ0FBQyxHQUFHLEtBQUfgQ0FBQyxHQUFHLEVBQS9CLENBQStCLENBQUMsQ0FBQzs7Ozs7O0lBTS9GLHVEQUEyQjs7Ozs7UUFDakMsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7UUFDZixJQUFJLENBQUMsR0FBRyxHQUFHLElBQUfgQ0FBQyxHQUFHLG1CQUFTLElBQUfgQ0FBQyxhQUFhLENBQUMsTUFBTSxHQUFFLElBQUfgQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7Ozs7OztJQU1yRSxpREFBcUI7Ozs7O1FBQzNCLElBQUfgQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxHQUFHLG1CQUFTLElBQUfgQ0FBQyxhQUFhLENBQUMsTUFBTSxJQUFHLENBQUMsQ0FBQyxDQUFDO1FBQzlFLElBQUfgQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUM7Ozs7OztJQU14Qiw4Q0FBa0I7Ozs7O1FBQ3hCLElBQUfgQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDLElBQUfgQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLElBQUfgQ0FBQyxLQUFLLG1CQUFTLElBQUfgQ0FBQyxhQUFhLENBQUMsTUFBTSxJQUFHLENBQUMsQ0FBQyxDQUFDO1FBQzFHLElBQUfgQ0FBQyxHQUFHLEdBQUcsUUFBUSxDQUFDLElBQUfgQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLElBQUfgQ0FBQyxLQUFLLG1CQUFTLElBQUfgQ0FBQyxhQUFhLENBQUMsTUFBTSxJQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQzs7Ozs7O0lBTXRHLGdDQUFJOzs7Ozs7O1FBRVYsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLEVBQUU7WUFDakQsT0FBTztTQUNSO1FBRUQsSUFBSSxJQUFJLENBQUMsR0FBRyxLQUFLLElBQUfgQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFO1lBQ25DLE9BQU87U0FDUjtRQUVELElBQUfgQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNiLElBQUfgQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRXRELElBQUfgQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsVUFBQyxHQUFxQixFQUFFLENBQVMsSUFBSyxPQUFBLENBQUMsSUFBSSxLQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsR0FBRyxLQUFJLENBQUMsR0FBRyxFQUEvQixDQUErQixDQUFDLENBQUM7Ozs7OztJQU1wRyxvQ0FBUTs7Ozs7OztRQUVkLElBQUfgSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQzVCLE9BQU87U0FDUjtRQUVELElBQUfgSUFBSSxDQUFDLEtBQUssS0FBSyxDQUFDLEVBQUU7WUFDcEIsT0FBTztTQUNSO1FBRUQsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUfgQ0FBQyxLQUFLLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3pDLElBQUfgQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRXRELElBQUfgQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsVUFBQyxHQUFxQixFQUFFLENBQVMsSUFBSyxPQUFBLENBQUMsSUFBSSxLQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsR0FBRyxLQUFJLENBQUMsR0FBRyxFQUEvQixDQUErQixDQUFDLENBQUM7Ozs7Ozs7SUFRcEcsNENBQWdCOzs7OztjQUFDLGFBQXFCO1FBQzVDLE9BQU8sQ0FBQyxDQUFDLElBQUfgQ0FBQyxXQUFXLElBQUfgSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLEtBQUssS0FBSyxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLElBQUfgQ0FBQyxRQUFRLENBQUMsS0FBSyxhQUFhLENBQUM7Ozs7Ozs7O0lBTTNILDBDQUFjOzs7Ozs7Y0FBQyxJQUFzQixFQUFFLE9BQXlCOzs7UUFJdEUsSUFBSSxTQUFTLENBQVM7O1FBQ3RCLElBQUfgWUFBWSxDQUFTO1FBQ3pCLElBQUk7WUFDRixTQUFTLEdBQUcsUUFBUSxDQUFDLElBQUfgRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDeEMsWUFBWSxHQUFHLFFBQVEsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQy9DO1FBQUMsT0FBTyxHQUFHLEVBQUU7WUFDWixPQUFPLENBQUMsS0FBSyxDQUFDLDJEQUEyRCxDQUFDLENBQUM7WUFDM0UsTUFBTSxHQUFHLENBQUM7U0FDWDtRQUNELElBQUfgU0FBUyxLQUFLLElBQUfgQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxZQUFZLEtBQUssQ0FBQyxFQUFFOztZQUU5RCxJQUFJLENBQUMsMkJBQTJCLEVBQUUsQ0FBQztZQUNuQyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUfgQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFVBQUMsR0FBcUIsRUFBRSxDQUFTLElBQUssT0FBQSxDQUFDLElBQUfgS0FBSSxDQUFDLEtBQUssSUFBSSxDQUFDLEdBQUcsS0FBSSxDQUFDLEdBQUcsRUFBL0IsQ0FBK0IsQ0FBQyxDQUFDO1lBQzFHLE9BQU87U0FDUjs7UUFFRCxJQUFJLFNBQVMsS0FBSyxDQUFDLElBQUfgWUFBWSxLQUFLLElBQUfgQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTs7WUFFOUQsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUM7WUFDN0IsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxVQUFDLEdBQXFCLEVBQUUsQ0FBUyxJQUFLLE9BQUEsQ0FBQyxJQUFJLEtBQUfgQ0FBQyxLQUFLLElBQUfgQ0FBQyxHQUFHLEtBQUfgQ0FBQyxHQUFHLEVBQS9CLENBQStCLENBQUMsQ0FBQztZQUMxRyxPQUFPO1NBQ1I7O1FBR0QsSUFBSSxTQUFTLEdBQUcsWUFBWSxFQUFFO1lBQzVCLElBQUfgQ0FBQyxRQUFRLEVBQUUsQ0FBQztTQUNqQjthQUFNLElBQUfgU0FBUyxHQUFHLFlBQVfgRUFBRTtZQUNuQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDYjs7O2dCQS9USixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLGFBQWE7b0JBRXZCLDh4RUFBNEI7b0JBQzVCLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOztpQkFDaEQ7OzsrQkFLRSxLQUFLO3lCQU1MLEtBQUs7OEJBS0wsS0FBSztnQ0FNTCxLQUFLO3NDQU1MLEtBQUs7K0JBS0wsTUFBTTs7NEJBL0VUO0VBK0N1QyxtQkFBbUI7U0FBN0MsaUJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiBUaGUgTUlUIExpY2Vuc2UgKE1JVClcblxuIENvcHlyaWdodCAoYykgMjAxNy0yMDE4IFN0ZWZhbm8gQ2FwcGEgKEtzODkpXG5cbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwifgwgdG8gZGVhbFxuIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbiB0byB1c2UsIGNvcHfgIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcblxuIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIGFsbFxuIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG5cbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFfgXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTiBJTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiBMSUFCSUxJVFfgIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFXG4gU09GVFdBUkUuXG4gKi9cblxuaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3fgIENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25DaGFuZ2VzLCBPbkluaXQsIE91dHB1dCwgU2ltcGxlQ2hhbmdlLCBTaW1wbGVDaGFuZ2VzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IEFjY2Vzc2libGVDb21wb25lbnQgfSBmcm9tICcuLi9hY2Nlc3NpYmxlLmNvbXBvbmVudCc7XG5cbmltcG9ydCB7IEFjY2Vzc2liaWxpdHlDb25maWcgfSBmcm9tICcuLi8uLi9tb2RlbC9hY2Nlc3NpYmlsaXR5LmludGVyZmFjZSc7XG5pbXBvcnQgeyBJbWFnZSB9IGZyb20gJy4uLy4uL21vZGVsL2ltYWdlLmNsYXNzJztcbmltcG9ydCB7IEludGVybmFsTGliSW1hZ2UgfSBmcm9tICcuLi8uLi9tb2RlbC9pbWFnZS1pbnRlcm5hbC5jbGFzcyc7XG5pbXBvcnQgeyBTaXplIH0gZnJvbSAnLi4vLi4vbW9kZWwvc2l6ZS5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgUHJldmlld0NvbmZpZyB9IGZyb20gJy4uLy4uL21vZGVsL3ByZXZpZXctY29uZmlnLmludGVyZmFjZSc7XG5pbXBvcnQgeyBTbGlkZUNvbmZpZyB9IGZyb20gJy4uLy4uL21vZGVsL3NsaWRlLWNvbmZpZy5pbnRlcmZhY2UnO1xuXG5pbXBvcnQgeyBORVhULCBQUkVWIH0gZnJvbSAnLi4vLi4vdXRpbHMvdXNlci1pbnB1dC51dGlsJztcbmltcG9ydCB7IGdldEluZGV4IH0gZnJvbSAnLi4vLi4vdXRpbHMvaW1hZ2UudXRpbCc7XG5cbi8qKlxuICogQ29tcG9uZW50IHdpdGggaW1hZ2UgcHJldmlld3NcbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAna3MtcHJldmlld3MnLFxuICBzdHlsZVVybHM6IFsncHJldmlld3Muc2NzcycsICdwcmV2aWV3cy1hcnJvd3Muc2NzcyddLFxuICB0ZW1wbGF0ZVVybDogJ3ByZXZpZXdzLmh0bWwnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBQcmV2aWV3c0NvbXBvbmVudCBleHRlbmRzIEFjY2Vzc2libGVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcyB7XG4gIC8qKlxuICAgKiBPYmplY3Qgb2YgdHlwZSBgSW50ZXJuYWxMaWJJbWFnZWAgdGhhdCByZXByZXNlbnQgdGhlIHZpc2libGUgaW1hZ2UuXG4gICAqL1xuICBASW5wdXQoKVxuICBjdXJyZW50SW1hZ2U6IEludGVybmFsTGliSW1hZ2U7XG4gIC8qKlxuICAgKiBBcnJheSBvZiBgSW50ZXJuYWxMaWJJbWFnZWAgdGhhdCByZXByZXNlbnQgdGhlIG1vZGVsIG9mIHRoaXMgbGlicmFyeSB3aXRoIGFsbCBpbWFnZXMsXG4gICAqIHRodW1icyBhbmQgc28gb24uXG4gICAqL1xuICBASW5wdXQoKVxuICBpbWFnZXM6IEludGVybmFsTGliSW1hZ2VbXTtcbiAgLyoqXG4gICAqIE9iamVjdCBvZiB0eXBlIGBTbGlkZUNvbmZpZ2AgdG8gZ2V0IGBpbmZpbml0ZSBzbGlkaW5nYC5cbiAgICovXG4gIEBJbnB1dCgpXG4gIHNsaWRlQ29uZmlnOiBTbGlkZUNvbmZpZztcbiAgLyoqXG4gICAqIE9iamVjdCBvZiB0eXBlIGBQcmV2aWV3Q29uZmlnYCB0byBpbml0IFByZXZpZXdzQ29tcG9uZW50J3MgZmVhdHVyZXMuXG4gICAqIEZvciBpbnN0YW5jZSwgaXQgY29udGFpbnMgYSBwYXJhbSB0byBzaG93L2hpZGUgdGhpcyBjb21wb25lbnQsIHNpemVzLlxuICAgKi9cbiAgQElucHV0KClcbiAgcHJldmlld0NvbmZpZzogUHJldmlld0NvbmZpZztcbiAgLyoqXG4gICAqIE9iamVjdCBvZiB0eXBlIGBBY2Nlc3NpYmlsaXR5Q29uZmlnYCB0byBpbml0IGN1c3RvbSBhY2Nlc3NpYmlsaXR5IGZlYXR1cmVzLlxuICAgKiBGb3IgaW5zdGFuY2UsIGl0IGNvbnRhaW5zIHRpdGxlcywgYWx0IHRleHRzLCBhcmlhLWxhYmVscyBhbmQgc28gb24uXG4gICAqL1xuICBASW5wdXQoKVxuICBhY2Nlc3NpYmlsaXR5Q29uZmlnOiBBY2Nlc3NpYmlsaXR5Q29uZmlnO1xuICAvKipcbiAgICogT3V0cHV0IHRvIGVtaXQgdGhlIGNsaWNrZWQgcHJldmlldy4gVGhlIHBheWxvYWQgY29udGFpbnMgdGhlIGBJbnRlcm5hbExpYkltYWdlYCBhc3NvY2lhdGVkIHRvIHRoZSBjbGlja2VkIHByZXZpZXcuXG4gICAqL1xuICBAT3V0cHV0KClcbiAgY2xpY2tQcmV2aWV3OiBFdmVudEVtaXR0ZXI8SW50ZXJuYWxMaWJJbWFnZT4gPSBuZXcgRXZlbnRFbWl0dGVyPEludGVybmFsTGliSW1hZ2U+KCk7XG5cbiAgLyoqXG4gICAqIEFycmF5IG9mIGBJbnRlcm5hbExpYkltYWdlYCBleHBvc2VkIHRvIHRoZSB0ZW1wbGF0ZS4gVGhpcyBmaWVsZCBpcyBpbml0aWFsaXplZFxuICAgKiBhcHBseWluZyB0cmFuc2Zvcm1hdGlvbnMsIGRlZmF1bHQgdmFsdWVzIGFuZCBzbyBvbiB0byB0aGUgaW5wdXQgb2YgdGhlIHNhbWUgdHlwZS5cbiAgICovXG4gIHByZXZpZXdzOiBJbnRlcm5hbExpYkltYWdlW10gPSBbXTtcbiAgLyoqXG4gICAqIE9iamVjdCBvZiB0eXBlIGBQcmV2aWV3Q29uZmlnYCBleHBvc2VkIHRvIHRoZSB0ZW1wbGF0ZS4gVGhpcyBmaWVsZCBpcyBpbml0aWFsaXplZFxuICAgKiBhcHBseWluZyB0cmFuc2Zvcm1hdGlvbnMsIGRlZmF1bHQgdmFsdWVzIGFuZCBzbyBvbiB0byB0aGUgaW5wdXQgb2YgdGhlIHNhbWUgdHlwZS5cbiAgICovXG4gIGNvbmZpZ1ByZXZpZXc6IFByZXZpZXdDb25maWc7XG5cbiAgLyoqXG4gICAqIFN0YXJ0IGluZGV4IG9mIHRoZSBpbnB1dCBpbWFnZXMgdXNlZCB0byBkaXNwbGF5IHByZXZpZXdzLlxuICAgKi9cbiAgc3RhcnQ6IG51bWJlcjtcbiAgLyoqXG4gICAqIEVuZCBpbmRleCBvZiB0aGUgaW5wdXQgaW1hZ2VzIHVzZWQgdG8gZGlzcGxheSBwcmV2aWV3cy5cbiAgICovXG4gIGVuZDogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBEZWZhdWx0IHByZXZpZXcncyBzaXplIG9iamVjdCwgYWxzbyB1c2VkIGluIHRoZSB0ZW1wbGF0ZSB0byBhcHBseSBkZWZhdWx0IHNpemVzIHRvIGtzU2l6ZSdzIGRpcmVjdGl2ZS5cbiAgICovXG4gIGRlZmF1bHRQcmV2aWV3U2l6ZTogU2l6ZSA9IHsgaGVpZ2h0OiAnNTBweCcsIHdpZHRoOiAnYXV0bycgfTtcblxuICAvKipcbiAgICogRGVmYXVsdCBwcmV2aWV3J3MgY29uZmlnIG9iamVjdFxuICAgKi9cbiAgcHJpdmF0ZSBkZWZhdWx0UHJldmlld0NvbmZpZzogUHJldmlld0NvbmZpZyA9IHtcbiAgICB2aXNpYmxlOiB0cnVlLFxuICAgIG51bWJlcjogMyxcbiAgICBhcnJvd3M6IHRydWUsXG4gICAgY2xpY2thYmxlOiB0cnVlLFxuICAgIC8vIGFsd2F5c0NlbnRlcjogZmFsc2UsIC8vIFRPRE8gc3RpbGwgbm90IGltcGxlbWVudGVkXG4gICAgc2l6ZTogdGhpcy5kZWZhdWx0UHJldmlld1NpemVcbiAgfTtcblxuICAvKipcbiAgICogTWV0aG9kIMK0bmdPbkluaXTCtCB0byBidWlsZCBgY29uZmlnUHJldmlld2AgYXBwbHlpbmcgYSBkZWZhdWx0IHZhbHVlIGFuZCBhbHNvIHRvXG4gICAqIGluaXQgdGhlIGBwcmV2aWV3c2AgYXJyYXkuXG4gICAqIFRoaXMgaXMgYW4gQW5ndWxhcidzIGxpZmVjeWNsZSBob29rLCBzbyBpdHMgY2FsbGVkIGF1dG9tYXRpY2FsbHkgYnkgQW5ndWxhciBpdHNlbGYuXG4gICAqIEluIHBhcnRpY3VsYXIsIGl0J3MgY2FsbGVkIG9ubHkgb25lIHRpbWUhISFcbiAgICovXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuY29uZmlnUHJldmlldyA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuZGVmYXVsdFByZXZpZXdDb25maWcsIHRoaXMucHJldmlld0NvbmZpZyk7XG5cbiAgICAvLyBpZiBudW1iZXIgaXMgPD0gMCByZXNldCB0byBkZWZhdWx0XG4gICAgaWYgKHRoaXMuY29uZmlnUHJldmlldyAmJiB0aGlzLmNvbmZpZ1ByZXZpZXcubnVtYmVyICYmIHRoaXMuY29uZmlnUHJldmlldy5udW1iZXIgPD0gMCkge1xuICAgICAgdGhpcy5jb25maWdQcmV2aWV3Lm51bWJlciA9IHRoaXMuZGVmYXVsdFByZXZpZXdDb25maWcubnVtYmVyO1xuICAgIH1cblxuICAgIC8vIGluaXQgcHJldmlld3MgYmFzZWQgb24gY3VycmVudEltYWdlIGFuZCB0aGUgZnVsbCBhcnJheSBvZiBpbWFnZXNcbiAgICB0aGlzLmluaXRQcmV2aWV3cyh0aGlzLmN1cnJlbnRJbWFnZSwgdGhpcy5pbWFnZXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIE1ldGhvZCB0byBjaGVjayBpZiBhbiBpbWFnZSBpcyBhY3RpdmUgKGkuZS4gYSBwcmV2aWV3IGltYWdlfg5cbiAgICogQHBhcmFtIEludGVybmFsTGliSW1hZ2UgcHJldmlldyBpcyBhbiBpbWFnZSB0byBjaGVjayBpZiBpdCdzIGFjdGl2ZSBvciBub3RcbiAgICogQHJldHVybnMgYm9vbGVhbiB0cnVlIGlmIGlzIGFjdGl2ZSwgZmFsc2Ugb3RoZXJ3aXNlXG4gICAqL1xuICBpc0FjdGl2ZShwcmV2aWV3OiBJbnRlcm5hbExpYkltYWdlKTogYm9vbGVhbiB7XG4gICAgaWYgKCFwcmV2aWV3IHx8ICF0aGlzLmN1cnJlbnRJbWFnZSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gcHJldmlldy5pZCA9PT0gdGhpcy5jdXJyZW50SW1hZ2UuaWQ7XG4gIH1cblxuICAvLyBUT0RPIGltcHJvdmUgdGhpcyBtZXRob2QgdG8gc2ltcGxpZnkgdGhlIHNvdXJjZWNvZGUgKyByZW1vdmUgZHVwbGljYXRlZCBjb2RlbGluZXNcbiAgLyoqXG4gICAqIE1ldGhvZCDCtG5nT25DaGFuZ2VzwrQgdG8gdXBkYXRlIGBwcmV2aWV3c2AgYXJyYXkuXG4gICAqIEFsc28sIGJvdGggYHN0YXJ0YCBhbmQgYGVuZGAgbG9jYWwgdmFyaWFibGVzIHdpbGwgYmUgdXBkYXRlZCBhY2NvcmRpbmdseS5cbiAgICogVGhpcyBpcyBhbiBBbmd1bGFyJ3MgbGlmZWN5Y2xlIGhvb2ssIHNvIGl0cyBjYWxsZWQgYXV0b21hdGljYWxseSBieSBBbmd1bGFyIGl0c2VsZi5cbiAgICogSW4gcGFydGljdWxhciwgaXQncyBjYWxsZWQgd2hlbiBhbnkgZGF0YS1ib3VuZCBwcm9wZXJ0eSBvZiBhIGRpcmVjdGl2ZSBjaGFuZ2VzISEhXG4gICAqL1xuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzfgB7XG4gICAgY29uc3QgaW1hZ2VzOiBTaW1wbGVDaGFuZ2UgPSBjaGFuZ2VzLmltYWdlcztcbiAgICBjb25zdCBjdXJyZW50SW1hZ2U6IFNpbXBsZUNoYW5nZSA9IGNoYW5nZXMuY3VycmVudEltYWdlO1xuXG4gICAgbGV0IHByZXY7XG4gICAgbGV0IGN1cnJlbnQ7XG5cbiAgICBpZiAoY3VycmVudEltYWdlfgB7XG4gICAgICBwcmV2ID0gY3VycmVudEltYWdlLnByZXZpb3VzVmFsdWU7XG4gICAgICBjdXJyZW50ID0gY3VycmVudEltYWdlLmN1cnJlbnRWYWx1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgY3VycmVudCA9IHRoaXMuY3VycmVudEltYWdlO1xuICAgIH1cblxuICAgIGlmIChjdXJyZW50ICYmIGltYWdlcyAmJiBpbWFnZXMucHJldmlvdXNWYWx1ZSAmJiBpbWFnZXMuY3VycmVudFZhbHVlfgB7XG4gICAgICAvLyBJJ20gaW4gdGhpcyBpZiBzdGF0ZW1lbnQsIGlmIGlucHV0IGltYWdlcyBhcmUgY2hhbmdlZCAoZm9yIGluc3RhbmNlLCBiZWNhdXNlIEkgcmVtb3ZlZCBvbmUgb2YgdGhlbSB3aXRoIHRoZSAnZGVsZXRlIGJ1dHRvbicsXG4gICAgICAvLyBvciBiZWNhdXNlIHVzZXJzIGNoYW5nZWQgdGhlIGltYWdlcyBhcnJheSB3aGlsZSBtb2RhbCBnYWxsZXJ5IGlzIHN0aWxsIG9wZW4pLlxuICAgICAgLy8gSW4gdGhpcyBjYXNlLCBJIGhhdmUgdG8gcmUtaW5pdCBwcmV2aWV3cywgYmVjYXVzZSB0aGUgaW5wdXQgYXJyYXkgb2YgaW1hZ2VzIGlzIGNoYW5nZWQuXG4gICAgICB0aGlzLmluaXRQcmV2aWV3cyhjdXJyZW50LCBpbWFnZXMuY3VycmVudFZhbHVlKTtcbiAgICB9XG5cbiAgICBpZiAocHJldiAmJiBjdXJyZW50ICYmIHByZXYuaWQgIT09IGN1cnJlbnQuaWQpIHtcbiAgICAgIHRoaXMudXBkYXRlUHJldmlld3MocHJldiwgY3VycmVudCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIE1ldGhvZCBjYWxsZWQgYnkgZXZlbnRzIGZyb20gYm90aCBrZXlib2FyZCBhbmQgbW91c2Ugb24gYSBwcmV2aWV3LlxuICAgKiBUaGlzIHdpbGwgdHJpZ2dlciB0aGUgYGNsaWNrcHJldmlld2Agb3V0cHV0IHdpdGggdGhlIGlucHV0IHByZXZpZXcgYXMgaXRzIHBheWxvYWQuXG4gICAqIEBwYXJhbSBJbnRlcm5hbExpYkltYWdlIHByZXZpZXcgdGhhdCB0cmlnZ2VyZWQgdGhpcyBtZXRob2RcbiAgICogQHBhcmFtIEtleWJvYXJkRXZlbnQgfCBNb3VzZUV2ZW50IGV2ZW50IHBheWxvYWRcbiAgICovXG4gIG9uSW1hZ2VFdmVudChwcmV2aWV3OiBJbnRlcm5hbExpYkltYWdlLCBldmVudDogS2V5Ym9hcmRFdmVudCB8IE1vdXNlRXZlbnQpIHtcbiAgICBpZiAoIXRoaXMuY29uZmlnUHJldmlldyB8fCAhdGhpcy5jb25maWdQcmV2aWV3LmNsaWNrYWJsZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCByZXN1bHQ6IG51bWJlciA9IHN1cGVyLmhhbmRsZUltYWdlRXZlbnQoZXZlbnQpO1xuICAgIGlmIChyZXN1bHQgPT09IE5FWFQpIHtcbiAgICAgIHRoaXMuY2xpY2tQcmV2aWV3LmVtaXQocHJldmlldyk7XG4gICAgfSBlbHNlIGlmIChyZXN1bHQgPT09IFBSRVYpIHtcbiAgICAgIHRoaXMuY2xpY2tQcmV2aWV3LmVtaXQocHJldmlldyk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIE1ldGhvZCBjYWxsZWQgYnkgZXZlbnRzIGZyb20gYm90aCBrZXlib2FyZCBhbmQgbW91c2Ugb24gYSBuYXZpZ2F0aW9uIGFycm93LlxuICAgKiBAcGFyYW0gc3RyaW5nIGRpcmVjdGlvbiBvZiB0aGUgbmF2aWdhdGlvbiB0aGF0IGNhbiBiZSBlaXRoZXIgJ25leHQnIG9yICdwcmV2J1xuICAgKiBAcGFyYW0gS2V5Ym9hcmRFdmVudCB8IE1vdXNlRXZlbnQgZXZlbnQgcGF5bG9hZFxuICAgKi9cbiAgb25OYXZpZ2F0aW9uRXZlbnQoZGlyZWN0aW9uOiBzdHJpbmcsIGV2ZW50OiBLZXlib2FyZEV2ZW50IHwgTW91c2VFdmVudCkge1xuICAgIGNvbnN0IHJlc3VsdDogbnVtYmVyID0gc3VwZXIuaGFuZGxlTmF2aWdhdGlvbkV2ZW50KGRpcmVjdGlvbiwgZXZlbnQpO1xuICAgIGlmIChyZXN1bHQgPT09IE5FWFQpIHtcbiAgICAgIHRoaXMubmV4dCgpO1xuICAgIH0gZWxzZSBpZiAocmVzdWx0ID09PSBQUkVWfgB7XG4gICAgICB0aGlzLnByZXZpb3VzKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIE1ldGhvZCB1c2VkIGluIHRoZSB0ZW1wbGF0ZSB0byB0cmFjayBpZHMgaW4gbmdGb3IuXG4gICAqIEBwYXJhbSBudW1iZXIgaW5kZXggb2YgdGhlIGFycmF5XG4gICAqIEBwYXJhbSBJbWFnZSBpdGVtIG9mIHRoZSBhcnJheVxuICAgKiBAcmV0dXJucyBudW1iZXIgdGhlIGlkIG9mIHRoZSBpdGVtXG4gICAqL1xuICB0cmFja0J5SWQoaW5kZXg6IG51bWJlciwgaXRlbTogSW1hZ2UpOiBudW1iZXIge1xuICAgIHJldHVybiBpdGVtLmlkO1xuICB9XG5cbiAgLyoqXG4gICAqIFByaXZhdGUgbWV0aG9kIHRvIGluaXQgcHJldmlld3MgYmFzZWQgb24gdGhlIGN1cnJlbnRJbWFnZSBhbmQgdGhlIGZ1bGwgYXJyYXkgb2YgaW1hZ2VzLlxuICAgKiBUaGUgY3VycmVudCBpbWFnZSBpbiBtYW5kYXRvcnkgdG8gc2hvdyBhbHdheXMgdGhlIGN1cnJlbnQgcHJldmlldyAoYXMgaGlnaGxpZ2h0ZWQpLlxuICAgKiBAcGFyYW0gSW50ZXJuYWxMaWJJbWFnZSBjdXJyZW50SW1hZ2UgdG8gZGVjaWRlIGhvdyB0byBzaG93IHByZXZpZXdzLCBiZWNhdXNlIEkgYWx3YXlzIHdhbnQgdG8gc2VlIHRoZSBjdXJyZW50IGltYWdlIGFzIGhpZ2hsaWdodGVkXG4gICAqIEBwYXJhbSBJbnRlcm5hbExpYkltYWdlW10gaW1hZ2VzIGlzIHRoZSBhcnJheSBvZiBhbGwgaW1hZ2VzLlxuICAgKi9cbiAgcHJpdmF0ZSBpbml0UHJldmlld3MoY3VycmVudEltYWdlOiBJbnRlcm5hbExpYkltYWdlLCBpbWFnZXM6IEludGVybmFsTGliSW1hZ2VbXSkge1xuICAgIGxldCBpbmRleDogbnVtYmVyO1xuICAgIHRyeSB7XG4gICAgICBpbmRleCA9IGdldEluZGV4KGN1cnJlbnRJbWFnZSwgaW1hZ2VzKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHRocm93IGVycjtcbiAgICB9XG4gICAgc3dpdGNoIChpbmRleCkge1xuICAgICAgY2FzZSAwOlxuICAgICAgICAvLyBmaXJzdCBpbWFnZVxuICAgICAgICB0aGlzLnNldEJlZ2lubmluZ0luZGV4ZXNQcmV2aWV3cygpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgaW1hZ2VzLmxlbmd0aCAtIDE6XG4gICAgICAgIC8vIGxhc3QgaW1hZ2VcbiAgICAgICAgdGhpcy5zZXRFbmRJbmRleGVzUHJldmlld3MoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICAvLyBvdGhlciBpbWFnZXNcbiAgICAgICAgdGhpcy5zZXRJbmRleGVzUHJldmlld3MoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIHRoaXMucHJldmlld3MgPSBpbWFnZXMuZmlsdGVyKChpbWc6IEludGVybmFsTGliSW1hZ2UsIGk6IG51bWJlcikgPT4gaSA+PSB0aGlzLnN0YXJ0ICYmIGkgPCB0aGlzLmVuZCk7XG4gIH1cblxuICAvKipcbiAgICogUHJpdmF0ZSBtZXRob2QgdG8gaW5pdCBib3RoIGBzdGFydGAgYW5kIGBlbmRgIHRvIHRoZSBiZWdpbm5pbmcuXG4gICAqL1xuICBwcml2YXRlIHNldEJlZ2lubmluZ0luZGV4ZXNQcmV2aWV3cygpIHtcbiAgICB0aGlzLnN0YXJ0ID0gMDtcbiAgICB0aGlzLmVuZCA9IE1hdGgubWluKDxudW1iZXI+dGhpcy5jb25maWdQcmV2aWV3Lm51bWJlciwgdGhpcy5pbWFnZXMubGVuZ3RoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQcml2YXRlIG1ldGhvZCB0byBpbml0IGJvdGggYHN0YXJ0YCBhbmQgYGVuZGAgdG8gdGhlIGVuZC5cbiAgICovXG4gIHByaXZhdGUgc2V0RW5fgW5kZXhlc1ByZXZpZXdzKCkge1xuICAgIHRoaXMuc3RhcnQgPSB0aGlzLmltYWdlcy5sZW5ndGggLSAxIC0gKDxudW1iZXI+dGhpcy5jb25maWdQcmV2aWV3Lm51bWJlciAtIDEpO1xuICAgIHRoaXMuZW5kID0gdGhpcy5pbWFnZXMubGVuZ3RoO1xuICB9XG5cbiAgLyoqXG4gICAqIFByaXZhdGUgbWV0aG9kIHRvIHVwZGF0ZSBib3RoIGBzdGFydGAgYW5kIGBlbmRgIGJhc2VkIG9uIHRoZSBjdXJyZW50SW1hZ2UuXG4gICAqL1xuICBwcml2YXRlIHNldEluZGV4ZXNQcmV2aWV3cygpIHtcbiAgICB0aGlzLnN0YXJ0ID0gZ2V0SW5kZXgodGhpcy5jdXJyZW50SW1hZ2UsIHRoaXMuaW1hZ2VzfgAtIE1hdGguZmxvb3IoPG51bWJlcj50aGlzLmNvbmZpZ1ByZXZpZXcubnVtYmVyIC8gMik7XG4gICAgdGhpcy5lbmQgPSBnZXRJbmRleCh0aGlzLmN1cnJlbnRJbWFnZSwgdGhpcy5pbWFnZXMpICsgTWF0aC5mbG9vcig8bnVtYmVyPnRoaXMuY29uZmlnUHJldmlldy5udW1iZXIgLyAyfgArIDE7XG4gIH1cblxuICAvKipcbiAgICogUHJpdmF0ZSBtZXRob2QgdG8gdXBkYXRlIHRoZSB2aXNpYmxlIHByZXZpZXdzIG5hdmlnYXRpbmcgdG8gdGhlIHJpZ2h0IChuZXh0fg5cbiAgICovXG4gIHByaXZhdGUgbmV4dCgpIHtcbiAgICAvLyBjaGVjayBpZiBuZXh0SW1hZ2Ugc2hvdWxkIGJlIGJsb2NrZWRcbiAgICBpZiAodGhpcy5pc1ByZXZlbnRTbGlkaW5nKHRoaXMuaW1hZ2VzLmxlbmd0aCAtIDEpfgB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuZW5kID09PSB0aGlzLmltYWdlcy5sZW5ndGgpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLnN0YXJ0Kys7XG4gICAgdGhpcy5lbmQgPSBNYXRoLm1pbih0aGlzLmVuZCArIDEsIHRoaXMuaW1hZ2VzLmxlbmd0aCk7XG5cbiAgICB0aGlzLnByZXZpZXdzID0gdGhpcy5pbWFnZXMuZmlsdGVyKChpbWc6IEludGVybmFsTGliSW1hZ2UsIGk6IG51bWJlcikgPT4gaSA+PSB0aGlzLnN0YXJ0ICYmIGkgPCB0aGlzLmVuZCk7XG4gIH1cblxuICAvKipcbiAgICogUHJpdmF0ZSBtZXRob2QgdG8gdXBkYXRlIHRoZSB2aXNpYmxlIHByZXZpZXdzIG5hdmlnYXRpbmcgdG8gdGhlIGxlZnQgKHByZXZpb3Vzfg5cbiAgICovXG4gIHByaXZhdGUgcHJldmlvdXMofgB7XG4gICAgLy8gY2hlY2sgaWYgcHJldkltYWdlIHNob3VsZCBiZSBibG9ja2VkXG4gICAgaWYgKHRoaXMuaXNQcmV2ZW50U2xpZGluZygwfgkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnN0YXJ0ID09PSAwfgB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5zdGFydCA9IE1hdGgubWF4KHRoaXMuc3RhcnQgLSAxLCAwKTtcbiAgICB0aGlzLmVuZCA9IE1hdGgubWluKHRoaXMuZW5kIC0gMSwgdGhpcy5pbWFnZXMubGVuZ3RoKTtcblxuICAgIHRoaXMucHJldmlld3MgPSB0aGlzLmltYWdlcy5maWx0ZXIoKGltZzogSW50ZXJuYWxMaWJJbWFnZSwgaTogbnVtYmVyfgA9PiBpID49IHRoaXMuc3RhcnQgJiYgaSA8IHRoaXMuZW5kKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQcml2YXRlIG1ldGhvZCB0byBibG9jay9wZXJtaXQgc2xpZGluZyBiZXR3ZWVuIHByZXZpZXdzLlxuICAgKiBAcGFyYW0gbnVtYmVyIGJvdW5kYXJ5SW5kZXggaXMgdGhlIGZpcnN0IG9yIHRoZSBsYXN0IGluZGV4IG9mIGBpbWFnZXNgIGlucHV0IGFycmF5XG4gICAqIEByZXR1cm5zIGJvb2xlYW4gaWYgdHJ1ZSBibG9jayBzbGlkaW5nLCBvdGhlcndpc2Ugbm90XG4gICAqL1xuICBwcml2YXRlIGlzUHJldmVudFNsaWRpbmcoYm91bmRhcnlJbmRleDogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICEhdGhpcy5zbGlkZUNvbmZpZyAmJiB0aGlzLnNsaWRlQ29uZmlnLmluZmluaXRlID09PSBmYWxzZSAmJiBnZXRJbmRleCh0aGlzLmN1cnJlbnRJbWFnZSwgdGhpcy5wcmV2aWV3cykgPT09IGJvdW5kYXJ5SW5kZXg7XG4gIH1cblxuICAvKipcbiAgICogUHJpdmF0ZSBtZXRob2QgdG8gaGFuZGxlIG5hdmlnYXRpb24gY2hhbmdpbmcgdGhlIHByZXZpZXdzIGFycmF5IGFuZCBvdGhlciB2YXJpYWJsZXMuXG4gICAqL1xuICBwcml2YXRlIHVwZGF0ZVByZXZpZXdzKHByZXY6IEludGVybmFsTGliSW1hZ2UsIGN1cnJlbnQ6IEludGVybmFsTGliSW1hZ2UpIHtcbiAgICAvLyB0byBtYW5hZ2UgaW5maW5pdGUgc2xpZGluZyBJIGhhdmUgdG8gcmVzZXQgYm90aCBgc3RhcnRgIGFuZCBgZW5kYCBhdCB0aGUgYmVnaW5uaW5nXG4gICAgLy8gdG8gc2hvdyBhZ2FpbiBwcmV2aWV3cyBmcm9tIHRoZSBmaXJzdCBpbWFnZS5cbiAgICAvLyBUaGlzIGhhcHBlbnMgd2hlbiB5b3UgbmF2aWdhdGUgb3ZlciB0aGUgbGFzdCBpbWFnZSB0byByZXR1cm4gdG8gdGhlIGZpcnN0IG9uZVxuICAgIGxldCBwcmV2SW5kZXg6IG51bWJlcjtcbiAgICBsZXQgY3VycmVudEluZGV4OiBudW1iZXI7XG4gICAgdHJ5IHtcbiAgICAgIHByZXZJbmRleCA9IGdldEluZGV4KHByZXYsIHRoaXMuaW1hZ2VzKTtcbiAgICAgIGN1cnJlbnRJbmRleCA9IGdldEluZGV4KGN1cnJlbnQsIHRoaXMuaW1hZ2VzKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ0Nhbm5vdCBnZXQgcHJldmlvdXMgYW5kIGN1cnJlbnQgaW1hZ2UgaW5kZXhlcyBpbiBwcmV2aWV3cycpO1xuICAgICAgdGhyb3cgZXJyO1xuICAgIH1cbiAgICBpZiAocHJldkluZGV4ID09PSB0aGlzLmltYWdlcy5sZW5ndGggLSAxICYmIGN1cnJlbnRJbmRleCA9PT0gMCkge1xuICAgICAgLy8gZmlyc3QgaW1hZ2VcbiAgICAgIHRoaXMuc2V0QmVnaW5uaW5nSW5kZXhlc1ByZXZpZXdzKCk7XG4gICAgICB0aGlzLnByZXZpZXdzID0gdGhpcy5pbWFnZXMuZmlsdGVyKChpbWc6IEludGVybmFsTGliSW1hZ2UsIGk6IG51bWJlcikgPT4gaSA+PSB0aGlzLnN0YXJ0ICYmIGkgPCB0aGlzLmVuZCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIC8vIHRoZSBzYW1lIGZvciB0aGUgb3Bwb3NpdGUgY2FzZSwgd2hlbiB5b3UgbmF2aWdhdGUgYmFjayBmcm9tIHRoZSBmaXN0IGltYWdlIHRvIGdvIHRvIHRoZSBsYXN0IG9uZS5cbiAgICBpZiAocHJldkluZGV4ID09PSAwICYmIGN1cnJlbnRJbmRleCA9PT0gdGhpcy5pbWFnZXMubGVuZ3RoIC0gMSkge1xuICAgICAgLy8gbGFzdCBpbWFnZVxuICAgICAgdGhpcy5zZXRFbmRJbmRleGVzUHJldmlld3MoKTtcbiAgICAgIHRoaXMucHJldmlld3MgPSB0aGlzLmltYWdlcy5maWx0ZXIoKGltZzogSW50ZXJuYWxMaWJJbWFnZSwgaTogbnVtYmVyfgA9PiBpID49IHRoaXMuc3RhcnQgJiYgaSA8IHRoaXMuZW5kKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBvdGhlcndpc2UgbWFuYWdlIHN0YW5kYXJkIHNjZW5hcmlvc1xuICAgIGlmIChwcmV2SW5kZXggPiBjdXJyZW50SW5kZXgpIHtcbiAgICAgIHRoaXMucHJldmlvdXMoKTtcbiAgICB9IGVsc2UgaWYgKHByZXZJbmRleCA8IGN1cnJlbnRJbmRleCkge1xuICAgICAgdGhpcy5uZXh0KCk7XG4gICAgfVxuICB9XG59XG4iXX0=