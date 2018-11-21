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
import { Action } from '../../model/action.enum';
import { DescriptionStrategy } from '../../model/description.interface';
import { ImageModalEvent } from '../../model/image.class';
import { InternalLibImage } from '../../model/image-internal.class';
import { Keyboard } from '../../model/keyboard.enum';
import { LoadingType } from '../../model/loading-config.interface';
import { NEXT, PREV } from '../../utils/user-input.util';
import { getIndex } from '../../utils/image.util';
/**
 * Interface to describe the Load Event, used to
 * emit an event when the image is finally loaded and the spinner has gone.
 * @record
 */
export function ImageLoadEvent() { }
/** @type {?} */
ImageLoadEvent.prototype.status;
/** @type {?} */
ImageLoadEvent.prototype.index;
/** @type {?} */
ImageLoadEvent.prototype.id;
/**
 * Component with the current image with some additional elements like arrows and side previews.
 */
export class CurrentImageComponent extends AccessibleComponent {
    constructor() {
        super(...arguments);
        /**
         * Output to emit an event when images are loaded. The payload contains an `ImageLoadEvent`.
         */
        this.loadImage = new EventEmitter();
        /**
         * Output to emit any changes of the current image. The payload contains an `ImageModalEvent`.
         */
        this.changeImage = new EventEmitter();
        /**
         * Output to emit an event when the modal gallery is closed. The payload contains an `ImageModalEvent`.
         */
        this.close = new EventEmitter();
        /**
         * Enum of type `Action` that represents a mouse click on a button.
         * Declared here to be used inside the template.
         */
        this.clickAction = Action.CLICK;
        /**
         * Enum of type `Action` that represents a keyboard action.
         * Declared here to be used inside the template.
         */
        this.keyboardAction = Action.KEYBOARD;
        /**
         * Boolean that it's true when you are watching the first image (currently visible).
         * False by default
         */
        this.isFirstImage = false;
        /**
         * Boolean that it's true when you are watching the last image (currently visible).
         * False by default
         */
        this.isLastImage = false;
        /**
         * Boolean that it's true if an image of the modal gallery is still loading.
         * True by default
         */
        this.loading = true;
        /**
         * Private object without type to define all swipe actions used by hammerjs.
         */
        this.SWIPE_ACTION = {
            LEFT: 'swipeleft',
            RIGHT: 'swiperight',
            UP: 'swipeup',
            DOWN: 'swipedown'
        };
    }
    /**
     * Method ´ngOnInit´ to build `configCurrentImage` applying default values.
     * This is an Angular's lifecycle hook, so its called automatically by Angular itself.
     * In particular, it's called only one time!!!
     * @return {?}
     */
    ngOnInit() {
        /** @type {?} */
        const defaultLoading = { enable: true, type: LoadingType.STANDARD };
        /** @type {?} */
        const defaultDescriptionStyle = {
            bgColor: 'rgba(0, 0, 0, .5)',
            textColor: 'white',
            marginTop: '0px',
            marginBottom: '0px',
            marginLeft: '0px',
            marginRight: '0px'
        };
        /** @type {?} */
        const defaultDescription = {
            strategy: DescriptionStrategy.ALWAYS_VISIBLE,
            imageText: 'Image ',
            numberSeparator: '/',
            beforeTextDescription: ' - ',
            style: defaultDescriptionStyle
        };
        /** @type {?} */
        const defaultCurrentImageConfig = {
            navigateOnClick: true,
            loadingConfig: defaultLoading,
            description: defaultDescription,
            downloadable: false,
            invertSwipe: false
        };
        this.configCurrentImage = Object.assign({}, defaultCurrentImageConfig, this.currentImageConfig);
        this.configCurrentImage.description = Object.assign({}, defaultDescription, this.configCurrentImage.description);
    }
    /**
     * Method ´ngOnChanges´ to update `loading` status and emit events.
     * If the gallery is open, then it will also manage boundary arrows and sliding.
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
        if (currentImage && currentImage.previousValue !== currentImage.currentValue) {
            this.updateIndexes();
        }
        else if (images && images.previousValue !== images.currentValue) {
            this.updateIndexes();
        }
    }
    /**
     * Method to handle keypress based on the `keyboardConfig` input. It gets the keyCode of
     * the key that triggered the keypress event to navigate between images or to close the modal gallery.
     * @param {?} keyCode
     * @return {?}
     */
    onKeyPress(keyCode) {
        /** @type {?} */
        const esc = this.keyboardConfig && this.keyboardConfig.esc ? this.keyboardConfig.esc : Keyboard.ESC;
        /** @type {?} */
        const right = this.keyboardConfig && this.keyboardConfig.right ? this.keyboardConfig.right : Keyboard.RIGHT_ARROW;
        /** @type {?} */
        const left = this.keyboardConfig && this.keyboardConfig.left ? this.keyboardConfig.left : Keyboard.LEFT_ARROW;
        switch (keyCode) {
            case esc:
                this.close.emit(new ImageModalEvent(Action.KEYBOARD, true));
                break;
            case right:
                this.nextImage(Action.KEYBOARD);
                break;
            case left:
                this.prevImage(Action.KEYBOARD);
                break;
        }
    }
    /**
     * Method to get the image description based on input params.
     * If you provide a full description this will be the visible description, otherwise,
     * it will be built using the `Description` object, concatenating its fields.
     * @throws an Error if description isn't available
     * @param {?=} image
     * @return {?} String description of the image (or the current image if not provided)
     */
    getDescriptionToDisplay(image = this.currentImage) {
        if (!this.configCurrentImage || !this.configCurrentImage.description) {
            throw new Error('Description input must be a valid object implementing the Description interface');
        }
        /** @type {?} */
        const imageWithoutDescription = !image.modal || !image.modal.description || image.modal.description === '';
        switch (this.configCurrentImage.description.strategy) {
            case DescriptionStrategy.HIDE_IF_EMPTY:
                return imageWithoutDescription ? '' : image.modal.description + '';
            case DescriptionStrategy.ALWAYS_HIDDEN:
                return '';
            default:
                // ----------- DescriptionStrategy.ALWAYS_VISIBLE -----------------
                return this.buildTextDescription(image, imageWithoutDescription);
        }
    }
    /**
     * Method to get `alt attribute`.
     * `alt` specifies an alternate text for an image, if the image cannot be displayed.
     * @param {?=} image
     * @return {?} String alt description of the image (or the current image if not provided)
     */
    getAltDescriptionByImage(image = this.currentImage) {
        if (!image) {
            return '';
        }
        return image.modal && image.modal.description ? image.modal.description : `Image ${getIndex(image, this.images) + 1}`;
    }
    /**
     * Method to get the title attributes based on descriptions.
     * This is useful to prevent accessibility issues, because if DescriptionStrategy is ALWAYS_HIDDEN,
     * it prevents an empty string as title.
     * @throws an Error if description isn't available
     * @param {?=} image
     * @return {?} String title of the image based on descriptions
     */
    getTitleToDisplay(image = this.currentImage) {
        if (!this.configCurrentImage || !this.configCurrentImage.description) {
            throw new Error('Description input must be a valid object implementing the Description interface');
        }
        /** @type {?} */
        const imageWithoutDescription = !image.modal || !image.modal.description || image.modal.description === '';
        /** @type {?} */
        const description = this.buildTextDescription(image, imageWithoutDescription);
        return description;
    }
    /**
     * Method to get the left side preview image.
     * @return {?} Image the image to show as size preview on the left
     */
    getLeftPreviewImage() {
        /** @type {?} */
        const currentIndex = getIndex(this.currentImage, this.images);
        if (currentIndex === 0 && this.slideConfig.infinite) {
            // the current image is the first one,
            // so the previous one is the last image
            // because infinite is true
            return this.images[this.images.length - 1];
        }
        this.handleBoundaries(currentIndex);
        return this.images[Math.max(currentIndex - 1, 0)];
    }
    /**
     * Method to get the right side preview image.
     * @return {?} Image the image to show as size preview on the right
     */
    getRightPreviewImage() {
        /** @type {?} */
        const currentIndex = getIndex(this.currentImage, this.images);
        if (currentIndex === this.images.length - 1 && this.slideConfig.infinite) {
            // the current image is the last one,
            // so the next one is the first image
            // because infinite is true
            return this.images[0];
        }
        this.handleBoundaries(currentIndex);
        return this.images[Math.min(currentIndex + 1, this.images.length - 1)];
    }
    /**
     * Method called by events from both keyboard and mouse on an image.
     * This will invoke the nextImage method.
     * @param {?} event
     * @param {?=} action
     * @return {?}
     */
    onImageEvent(event, action = Action.NORMAL) {
        // check if triggered by a mouse click
        // If yes, It should block navigation when navigateOnClick is false
        if (action === Action.CLICK && !this.configCurrentImage.navigateOnClick) {
            // a user has requested to block navigation via configCurrentImage.navigateOnClick property
            return;
        }
        /** @type {?} */
        const result = super.handleImageEvent(event);
        if (result === NEXT) {
            this.nextImage(action);
        }
    }
    /**
     * Method called by events from both keyboard and mouse on a navigation arrow.
     * @param {?} direction
     * @param {?} event
     * @param {?=} action
     * @return {?}
     */
    onNavigationEvent(direction, event, action = Action.NORMAL) {
        /** @type {?} */
        const result = super.handleNavigationEvent(direction, event);
        if (result === NEXT) {
            this.nextImage(action);
        }
        else if (result === PREV) {
            this.prevImage(action);
        }
    }
    /**
     * Method to go back to the previous image.
     * @param {?=} action Enum of type `Action` that represents the source
     *  action that moved back to the previous image. `Action.NORMAL` by default.
     * @return {?}
     */
    prevImage(action = Action.NORMAL) {
        // check if prevImage should be blocked
        if (this.isPreventSliding(0)) {
            return;
        }
        /** @type {?} */
        const prevImage = this.getPrevImage();
        this.loading = !prevImage.previouslyLoaded;
        this.changeImage.emit(new ImageModalEvent(action, getIndex(prevImage, this.images)));
    }
    /**
     * Method to go back to the previous image.
     * @param {?=} action Enum of type `Action` that represents the source
     *  action that moved to the next image. `Action.NORMAL` by default.
     * @return {?}
     */
    nextImage(action = Action.NORMAL) {
        // check if nextImage should be blocked
        if (this.isPreventSliding(this.images.length - 1)) {
            return;
        }
        /** @type {?} */
        const nextImage = this.getNextImage();
        this.loading = !nextImage.previouslyLoaded;
        this.changeImage.emit(new ImageModalEvent(action, getIndex(nextImage, this.images)));
    }
    /**
     * Method to emit an event as loadImage output to say that the requested image if loaded.
     * This method is invoked by the javascript's 'load' event on an img tag.
     * @param {?} event
     * @return {?}
     */
    onImageLoad(event) {
        /** @type {?} */
        const loadImageData = {
            status: true,
            index: getIndex(this.currentImage, this.images),
            id: this.currentImage.id
        };
        this.loadImage.emit(loadImageData);
        this.loading = false;
    }
    /**
     * Method used by Hammerjs to support touch gestures (you can also invert the swipe direction with configCurrentImage.invertSwipe).
     * @param {?=} action String that represent the direction of the swipe action. 'swiperight' by default.
     * @return {?}
     */
    swipe(action = this.SWIPE_ACTION.RIGHT) {
        switch (action) {
            case this.SWIPE_ACTION.RIGHT:
                if (this.configCurrentImage.invertSwipe) {
                    this.prevImage(Action.SWIPE);
                }
                else {
                    this.nextImage(Action.SWIPE);
                }
                break;
            case this.SWIPE_ACTION.LEFT:
                if (this.configCurrentImage.invertSwipe) {
                    this.nextImage(Action.SWIPE);
                }
                else {
                    this.prevImage(Action.SWIPE);
                }
                break;
        }
    }
    /**
     * Method used in `modal-gallery.component` to get the index of an image to delete.
     * @param {?=} image
     * @return {?} number the index of the image
     */
    getIndexToDelete(image = this.currentImage) {
        return getIndex(image, this.images);
    }
    /**
     * Private method to update both `isFirstImage` and `isLastImage` based on
     * the index of the current image.
     * @param {?} currentIndex
     * @return {?}
     */
    handleBoundaries(currentIndex) {
        if (this.images.length === 1) {
            this.isFirstImage = true;
            this.isLastImage = true;
            return;
        }
        if (!this.slideConfig || this.slideConfig.infinite === true) {
            // infinite sliding enabled
            this.isFirstImage = false;
            this.isLastImage = false;
        }
        else {
            switch (currentIndex) {
                case 0:
                    // execute this only if infinite sliding is disabled
                    this.isFirstImage = true;
                    this.isLastImage = false;
                    break;
                case this.images.length - 1:
                    // execute this only if infinite sliding is disabled
                    this.isFirstImage = false;
                    this.isLastImage = true;
                    break;
                default:
                    this.isFirstImage = false;
                    this.isLastImage = false;
                    break;
            }
        }
    }
    /**
     * Private method to check if next/prev actions should be blocked.
     * It checfg if slideConfig.infinite === false and if the image index is equals to the input parameter.
     * If yes, it returns true to say that sliding should be blocked, otherwise not.
     * @param {?} boundaryIndex
     * @return {?} boolean true if slideConfig.infinite === false and the current index is
     *  either the first or the last one.
     */
    isPreventSliding(boundaryIndex) {
        return !!this.slideConfig && this.slideConfig.infinite === false && getIndex(this.currentImage, this.images) === boundaryIndex;
    }
    /**
     * Private method to get the next index.
     * This is necessary because at the end, when you call next again, you'll go to the first image.
     * That happens because all modal images are shown like in a circle.
     * @return {?}
     */
    getNextImage() {
        /** @type {?} */
        const currentIndex = getIndex(this.currentImage, this.images);
        /** @type {?} */
        let newIndex = 0;
        if (currentIndex >= 0 && currentIndex < this.images.length - 1) {
            newIndex = currentIndex + 1;
        }
        else {
            newIndex = 0; // start from the first index
        }
        return this.images[newIndex];
    }
    /**
     * Private method to get the previous index.
     * This is necessary because at index 0, when you call prev again, you'll go to the last image.
     * That happens because all modal images are shown like in a circle.
     * @return {?}
     */
    getPrevImage() {
        /** @type {?} */
        const currentIndex = getIndex(this.currentImage, this.images);
        /** @type {?} */
        let newIndex = 0;
        if (currentIndex > 0 && currentIndex <= this.images.length - 1) {
            newIndex = currentIndex - 1;
        }
        else {
            newIndex = this.images.length - 1; // start from the last index
        }
        return this.images[newIndex];
    }
    /**
     * Private method to build a text description.
     * This is used also to create titles.
     * @param {?} image
     * @param {?} imageWithoutDescription
     * @return {?} String description built concatenating image fields with a specific logic.
     */
    buildTextDescription(image, imageWithoutDescription) {
        if (!this.configCurrentImage || !this.configCurrentImage.description) {
            throw new Error('Description input must be a valid object implementing the Description interface');
        }
        // If customFullDescription use it, otherwise proceed to build a description
        if (this.configCurrentImage.description.customFullDescription && this.configCurrentImage.description.customFullDescription !== '') {
            return this.configCurrentImage.description.customFullDescription;
        }
        /** @type {?} */
        const currentIndex = getIndex(image, this.images);
        /** @type {?} */
        const prevDescription = this.configCurrentImage.description.imageText ? this.configCurrentImage.description.imageText : '';
        /** @type {?} */
        const midSeparator = this.configCurrentImage.description.numberSeparator ? this.configCurrentImage.description.numberSeparator : '';
        /** @type {?} */
        const middleDescription = currentIndex + 1 + midSeparator + this.images.length;
        if (imageWithoutDescription) {
            return prevDescription + middleDescription;
        }
        /** @type {?} */
        const currImgDescription = image.modal && image.modal.description ? image.modal.description : '';
        /** @type {?} */
        const endDescription = this.configCurrentImage.description.beforeTextDescription + currImgDescription;
        return prevDescription + middleDescription + endDescription;
    }
    /**
     * Private method to call handleBoundaries when ngOnChanges is called.
     * @return {?}
     */
    updateIndexes() {
        /** @type {?} */
        let index;
        try {
            index = getIndex(this.currentImage, this.images);
        }
        catch (err) {
            console.error('Cannot get the current image index in current-image');
            throw err;
        }
        if (this.isOpen) {
            this.handleBoundaries(index);
        }
    }
}
CurrentImageComponent.decorators = [
    { type: Component, args: [{
                selector: 'fg-current-image',
                template: "<main class=\"main-image-container\"\n      fgKeyboardNavigation [isOpen]=\"isOpen\" (keyPress)=\"onKeyPress($event)\"\n      [attr.aria-label]=\"accessibilityConfig.mainContainerAriaLabel\"\n      [title]=\"accessibilityConfig.mainContainerTitle\">\n\n  <div class=\"left-sub-container\">\n    <a class=\"nav-left\"\n       [attr.aria-label]=\"accessibilityConfig.mainPrevImageAriaLabel\"\n       [tabindex]=\"isFirstImage ? -1 : 0\" role=\"button\"\n       (click)=\"onNavigationEvent('left', $event)\" (keyup)=\"onNavigationEvent('left', $event)\">\n      <div class=\"inside {{isFirstImage ? 'empty-arrow-image' : 'left-arrow-image'}}\"\n           aria-hidden=\"true\"\n           [title]=\"accessibilityConfig.mainPrevImageTitle\"></div>\n    </a>\n\n    <ng-container *ngIf=\"slideConfig?.sidePreviews?.show\">\n      <ng-container *ngIf=\"getLeftPreviewImage() as leftPreview\">\n        <img *ngIf=\"!isFirstImage; else firstImage\"\n             class=\"inside current-image-previous\"\n             [src]=\"leftPreview.plain?.img ? leftPreview.plain.img : leftPreview.modal.img\"\n             [hidden]=\"loading\"\n             fgSize [sizeConfig]=\"{width: slideConfig.sidePreviews?.size.width, height: slideConfig.sidePreviews?.size.height}\"\n             [attr.aria-label]=\"leftPreview.modal.ariaLabel\"\n             [title]=\"leftPreview.modal.title ? leftPreview.modal.title : getDescriptionToDisplay(leftPreview)\"\n             alt=\"{{leftPreview.modal.alt ? leftPreview.modal.alt : getAltDescriptionByImage(leftPreview)}}\"\n             [tabindex]=\"0\" role=\"img\"\n             (click)=\"onNavigationEvent('left', $event, clickAction)\" (keyup)=\"onNavigationEvent('left', $event, keyboardAction)\"/>\n        <ng-template #firstImage>\n          <div class=\"current-image-previous hidden\"\n               fgSize [sizeConfig]=\"{width: slideConfig.sidePreviews?.size.width, height: slideConfig.sidePreviews?.size.height}\"></div>\n        </ng-template>\n      </ng-container>\n    </ng-container>\n  </div>\n\n\n  <figure id=\"current-figure\" [style.display]=\"loading ? 'none' : ''\">\n    <img id=\"current-image\"\n         class=\"inside\"\n         [src]=\"currentImage.modal.img\"\n         [attr.aria-label]=\"currentImage.modal.ariaLabel\"\n         [title]=\"currentImage.modal.title ? currentImage.modal.title : getTitleToDisplay()\"\n         alt=\"{{currentImage.modal.alt ? currentImage.modal.alt : getAltDescriptionByImage()}}\"\n         [tabindex]=\"0\" role=\"img\"\n         (load)=\"onImageLoad($event)\"\n         (click)=\"onImageEvent($event, clickAction)\" (keyup)=\"onImageEvent($event, keyboardAction)\"\n         (swipeleft)=\"swipe($event.type)\"\n         (swiperight)=\"swipe($event.type)\"/>\n    <figcaption *ngIf=\"getDescriptionToDisplay() !== ''\"\n                class=\"inside description\"\n                fgDescription [description]=\"configCurrentImage?.description\"\n                [innerHTML]=\"getDescriptionToDisplay()\">\n    </figcaption>\n  </figure>\n\n  <div class=\"right-sub-container\">\n    <ng-container *ngIf=\"slideConfig?.sidePreviews?.show\">\n      <ng-container *ngIf=\"getRightPreviewImage() as rightPreview\">\n        <img *ngIf=\"!isLastImage; else lastImage\"\n             class=\"inside current-image-next\"\n             [src]=\"rightPreview.plain?.img ? rightPreview.plain.img : rightPreview.modal.img\"\n             [hidden]=\"loading\"\n             fgSize [sizeConfig]=\"{width: slideConfig.sidePreviews?.size.width, height: slideConfig.sidePreviews?.size.height}\"\n             [attr.aria-label]=\"rightPreview.modal.ariaLabel\"\n             [title]=\"rightPreview.modal.title ? rightPreview.modal.title : getDescriptionToDisplay(rightPreview)\"\n             alt=\"{{rightPreview.modal.alt ? rightPreview.modal.alt : getAltDescriptionByImage(rightPreview)}}\"\n             [tabindex]=\"0\" role=\"img\"\n             (click)=\"onNavigationEvent('right', $event, clickAction)\" (keyup)=\"onNavigationEvent('right', $event, keyboardAction)\"/>\n        <ng-template #lastImage>\n          <div class=\"current-image-next hidden\"\n               fgSize [sizeConfig]=\"{width: slideConfig.sidePreviews?.size.width, height: slideConfig.sidePreviews?.size.height}\">\n          </div>\n        </ng-template>\n      </ng-container>\n    </ng-container>\n\n    <ng-container *ngIf=\"loading && configCurrentImage?.loadingConfig?.enable\">\n      <fg-loading-spinner [loadingConfig]=\"configCurrentImage?.loadingConfig\"\n                          [accessibilityConfig]=\"accessibilityConfig\"></fg-loading-spinner>\n    </ng-container>\n\n    <a class=\"nav-right\"\n       [attr.aria-label]=\"accessibilityConfig.mainNextImageAriaLabel\"\n       [tabindex]=\"isLastImage ? -1 : 0\" role=\"button\"\n       (click)=\"onNavigationEvent('right', $event)\" (keyup)=\"onNavigationEvent('right', $event)\">\n      <div class=\"inside {{isLastImage ? 'empty-arrow-image' : 'right-arrow-image'}}\"\n           aria-hidden=\"true\"\n           [title]=\"accessibilityConfig.mainNextImageTitle\"></div>\n    </a>\n  </div>\n</main>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [":host{display:flex;flex-direction:column;justify-content:center}.main-image-container{display:flex;flex-direction:row;align-items:center;justify-content:space-between}.main-image-container .nav,.main-image-container>.left-sub-container>.nav-left,.main-image-container>.right-sub-container>.nav-right{-webkit-animation:1s animatezoom;animation:1s animatezoom;cursor:pointer;transition:.5s}.main-image-container .nav:hover,.main-image-container>.left-sub-container>.nav-left:hover,.main-image-container>.right-sub-container>.nav-right:hover{-webkit-transform:scale(1.1);transform:scale(1.1)}.main-image-container>.left-sub-container{display:flex;flex-direction:row;justify-content:space-around;align-items:center}.main-image-container>.left-sub-container>.nav-left{margin-right:5px;margin-left:15px}.main-image-container>.right-sub-container{display:flex;flex-direction:row;justify-content:space-around;align-items:center}.main-image-container>.right-sub-container>.nav-right{margin-right:15px;margin-left:5px}#current-image{height:auto;max-width:80vw;max-height:60vh;cursor:pointer}@media screen and (min-width:70vw){#current-image{height:auto;max-width:70vw;max-height:60vh;cursor:pointer}}#current-figure{-webkit-animation:.8s fadein-visible;animation:.8s fadein-visible;text-align:center}figure{margin:0;position:relative}figure img{max-width:100%;height:auto;display:block}figcaption{padding:10px;position:absolute;bottom:0;left:0;right:0}.description{font-weight:700;text-align:center}@-webkit-keyframes fadein-visible{from{opacity:0}to{opacity:1}}@keyframes fadein-visible{from{opacity:0}to{opacity:1}}@-webkit-keyframes fadein-semi-visible05{from{opacity:0}to{opacity:.5}}@keyframes fadein-semi-visible05{from{opacity:0}to{opacity:.5}}@-webkit-keyframes fadein-semi-visible08{from{opacity:0}to{opacity:.8}}@keyframes fadein-semi-visible08{from{opacity:0}to{opacity:.8}}@-webkit-keyframes fadein-semi-visible09{from{opacity:0}to{opacity:.9}}@keyframes fadein-semi-visible09{from{opacity:0}to{opacity:.9}}", ".arrow-image,.empty-arrow-image,.left-arrow-image,.right-arrow-image{width:30px;height:30px;background-size:30px}.empty-arrow-image{background:#000;opacity:0}.left-arrow-image{background-image:url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/PjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDQ3Ny4xNzUgNDc3LjE3NSIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNDc3LjE3NSA0NzcuMTc1OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjUxMnB4IiBoZWlnaHQ9IjUxMnB4Ij48Zz48cGF0aCBkPSJNMTQ1LjE4OCwyMzguNTc1bDIxNS41LTIxNS41YzUuMy01LjMsNS4zLTEzLjgsMC0xOS4xcy0xMy44LTUuMy0xOS4xLDBsLTIyNS4xLDIyNS4xYy01LjMsNS4zLTUuMywxMy44LDAsMTkuMWwyMjUuMSwyMjUgICBjMi42LDIuNiw2LjEsNCw5LjUsNHM2LjktMS4zLDkuNS00YzUuMy01LjMsNS4zLTEzLjgsMC0xOS4xTDE0NS4xODgsMjM4LjU3NXoiIGZpbGw9IiNGRkZGRkYiLz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PC9zdmc+);opacity:.8;transition:.5s}.left-arrow-image:hover{-webkit-transform:scale(1.2);transform:scale(1.2)}.right-arrow-image{background-image:url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/PjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDQ3Ny4xNzUgNDc3LjE3NSIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNDc3LjE3NSA0NzcuMTc1OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjUxMnB4IiBoZWlnaHQ9IjUxMnB4Ij48Zz48cGF0aCBkPSJNMzYwLjczMSwyMjkuMDc1bC0yMjUuMS0yMjUuMWMtNS4zLTUuMy0xMy44LTUuMy0xOS4xLDBzLTUuMywxMy44LDAsMTkuMWwyMTUuNSwyMTUuNWwtMjE1LjUsMjE1LjUgICBjLTUuMyw1LjMtNS4zLDEzLjgsMCwxOS4xYzIuNiwyLjYsNi4xLDQsOS41LDRjMy40LDAsNi45LTEuMyw5LjUtNGwyMjUuMS0yMjUuMUMzNjUuOTMxLDI0Mi44NzUsMzY1LjkzMSwyMzQuMjc1LDM2MC43MzEsMjI5LjA3NXogICAiIGZpbGw9IiNGRkZGRkYiLz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PC9zdmc+);opacity:.8;transition:.5s}.right-arrow-image:hover{-webkit-transform:scale(1.2);transform:scale(1.2)}", "@media only screen and (max-width:1024px),only screen and (max-device-width:1024px){.current-image-next,.current-image-previous{display:none}}@media only screen and (min-device-width:1025px){.current-image-next,.current-image-preview,.current-image-previous{height:auto;cursor:pointer;opacity:.5;-webkit-animation:.8s fadein-semi-visible05;animation:.8s fadein-semi-visible05}.current-image-next:hover,.current-image-preview:hover,.current-image-previous:hover{opacity:1;transition:.5s}.current-image-previous{margin-left:10px;margin-right:5px}.current-image-next{margin-right:10px;margin-left:5px}}@-webkit-keyframes fadein-semi-visible05{from{opacity:0}to{opacity:.5}}@keyframes fadein-semi-visible05{from{opacity:0}to{opacity:.5}}"]
            }] }
];
CurrentImageComponent.propDecorators = {
    currentImage: [{ type: Input }],
    images: [{ type: Input }],
    isOpen: [{ type: Input }],
    currentImageConfig: [{ type: Input }],
    slideConfig: [{ type: Input }],
    accessibilityConfig: [{ type: Input }],
    keyboardConfig: [{ type: Input }],
    loadImage: [{ type: Output }],
    changeImage: [{ type: Output }],
    close: [{ type: Output }]
};
if (false) {
    /**
     * Object of type `InternalLibImage` that represent the visible image.
     * @type {?}
     */
    CurrentImageComponent.prototype.currentImage;
    /**
     * Array of `InternalLibImage` that represent the model of this library with all images,
     * thumbs and so on.
     * @type {?}
     */
    CurrentImageComponent.prototype.images;
    /**
     * Boolean that it is true if the modal gallery is visible.
     * If yes, also this component should be visible.
     * @type {?}
     */
    CurrentImageComponent.prototype.isOpen;
    /**
     * Interface to configure current image in modal-gallery.
     * For instance you can disable navigation on click on current image (enabled by default).
     * @type {?}
     */
    CurrentImageComponent.prototype.currentImageConfig;
    /**
     * Object of type `SlideConfig` to get `infinite sliding`.
     * @type {?}
     */
    CurrentImageComponent.prototype.slideConfig;
    /**
     * Object of type `AccessibilityConfig` to init custom accessibility features.
     * For instance, it contains titles, alt texts, aria-labels and so on.
     * @type {?}
     */
    CurrentImageComponent.prototype.accessibilityConfig;
    /**
     * Object of type `KeyboardConfig` to assign custom keys to both ESC, RIGHT and LEFT keyboard's actions.
     * @type {?}
     */
    CurrentImageComponent.prototype.keyboardConfig;
    /**
     * Output to emit an event when images are loaded. The payload contains an `ImageLoadEvent`.
     * @type {?}
     */
    CurrentImageComponent.prototype.loadImage;
    /**
     * Output to emit any changes of the current image. The payload contains an `ImageModalEvent`.
     * @type {?}
     */
    CurrentImageComponent.prototype.changeImage;
    /**
     * Output to emit an event when the modal gallery is closed. The payload contains an `ImageModalEvent`.
     * @type {?}
     */
    CurrentImageComponent.prototype.close;
    /**
     * Enum of type `Action` that represents a mouse click on a button.
     * Declared here to be used inside the template.
     * @type {?}
     */
    CurrentImageComponent.prototype.clickAction;
    /**
     * Enum of type `Action` that represents a keyboard action.
     * Declared here to be used inside the template.
     * @type {?}
     */
    CurrentImageComponent.prototype.keyboardAction;
    /**
     * Boolean that it's true when you are watching the first image (currently visible).
     * False by default
     * @type {?}
     */
    CurrentImageComponent.prototype.isFirstImage;
    /**
     * Boolean that it's true when you are watching the last image (currently visible).
     * False by default
     * @type {?}
     */
    CurrentImageComponent.prototype.isLastImage;
    /**
     * Boolean that it's true if an image of the modal gallery is still loading.
     * True by default
     * @type {?}
     */
    CurrentImageComponent.prototype.loading;
    /**
     * Object of type `CurrentImageConfig` exposed to the template. This field is initialized
     * applying transformations, default values and so on to the input of the same type.
     * @type {?}
     */
    CurrentImageComponent.prototype.configCurrentImage;
    /**
     * Private object without type to define all swipe actions used by hammerjs.
     * @type {?}
     */
    CurrentImageComponent.prototype.SWIPE_ACTION;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VycmVudC1pbWFnZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9tb2RhbC1hbmd1bGFyLWdhbGxlcnkvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9jdXJyZW50LWltYWdlL2N1cnJlbnQtaW1hZ2UuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXdCQSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLFlBQVfgRUFBRSxLQUFLLEVBQXFCLE1BQU0sRUFBK0IsTUFBTSxlQUFlLENBQUM7QUFFaEosT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFHOUQsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sRUFBZSxtQkFBbUIsRUFBb0IsTUFBTSxtQ0FBbUMsQ0FBQztBQUN2RyxPQUFPLEVBQVMsZUFBZSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDakUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDcEUsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBRXJELE9BQU8sRUFBaUIsV0FBVyxFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFHbEYsT0FBTyxFQUFFLElBQUfgRUFBRSxJQUFJLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7QUFzQmxELE1BQU0sNEJBQTZCLFNBQVEsbUJBQW1COzs7Ozs7eUJBNkNsQixJQUFJLFlBQVfgRUFBa0I7Ozs7MkJBSy9CLElBQUfgWUFBWSxFQUFtQjs7OztxQkFLekMsSUFBSSxZQUFZLEVBQW1COzs7OzsyQkFNcEQsTUFBTSxDQUFDLEtBQUs7Ozs7OzhCQUtULE1BQU0sQ0FBQyxRQUFROzs7Ozs0QkFLekIsS0FBSzs7Ozs7MkJBS04sS0FBSzs7Ozs7dUJBS1QsSUFBSTs7Ozs0QkFVUztZQUNyQixJQUFJLEVBQUUsV0FBVztZQUNqQixLQUFLLEVBQUUsWUFBWTtZQUNuQixFQUFFLEVBQUUsU0FBUztZQUNiLElBQUfgRUFBRSxXQUFXO1NBQ2xCOzs7Ozs7OztJQU9ELFFBQVE7O1FBQ04sTUFBTSxjQUFjLEdBQWtCLEVBQUUsTUFBTSxFQUFFLElBQUfgRUFBRSxJQUFJLEVBQUUsV0FBVyxDQUFDLFFBQVEsRUFBRSxDQUFDOztRQUNuRixNQUFNLHVCQUF1QixHQUFxQjtZQUNoRCxPQUFPLEVBQUUsbUJBQW1CO1lBQzVCLFNBQVMsRUFBRSxPQUFPO1lBQ2xCLFNBQVMsRUFBRSxLQUFLO1lBQ2hCLFlBQVfgRUFBRSxLQUFLO1lBQ25CLFVBQVUsRUFBRSxLQUFLO1lBQ2pCLFdBQVcsRUFBRSxLQUFLO1NBQ25CLENBQUM7O1FBQ0YsTUFBTSxrQkFBa0IsR0FBZ0I7WUFDdEMsUUFBUSxFQUFFLG1CQUFtQixDQUFDLGNBQWM7WUFDNUMsU0FBUyxFQUFFLFFBQVE7WUFDbkIsZUFBZSxFQUFFLEdBQUc7WUFDcEIscUJBQXFCLEVBQUUsS0FBSztZQUM1QixLQUFLLEVBQUUsdUJBQXVCO1NBQy9CLENBQUM7O1FBQ0YsTUFBTSx5QkFBeUIsR0FBdUI7WUFDcEQsZUFBZSxFQUFFLElBQUk7WUFDckIsYUFBYSxFQUFFLGNBQWM7WUFDN0IsV0FBVyxFQUFFLGtCQUFrQjtZQUMvQixZQUFZLEVBQUUsS0FBSztZQUNuQixXQUFXLEVBQUUsS0FBSztTQUNuQixDQUFDO1FBRUYsSUFBSSxDQUFDLGtCQUFrQixHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLHlCQUF5QixFQUFFLElBQUfgQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1FBQ2hHLElBQUfgQ0FBQyxrQkFBa0IsQ0FBQyxXQUFXLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsa0JBQWtCLEVBQUUsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFdBQVcsQ0FBQyxDQUFDO0tBQ2xIOzs7Ozs7Ozs7SUFRRCxXQUFXLENBQUMsT0FBc0I7O1FBQ2hDLE1BQU0sTUFBTSxHQUFpQixPQUFPLFdBQVE7O1FBQzVDLE1BQU0sWUFBWSxHQUFpQixPQUFPLGlCQUFjO1FBRXhELElBQUfgWUFBWSxJQUFJLFlBQVfgQ0FBQyxhQUFhLEtBQUssWUFBWSxDQUFDLFlBQVfgRUFBRTtZQUM1RSxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7U0FDdEI7YUFBTSxJQUFJLE1BQU0sSUFBSSxNQUFNLENBQUMsYUFBYSxLQUFLLE1BQU0sQ0FBQyxZQUFZLEVBQUU7WUFDakUsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1NBQ3RCO0tBQ0Y7Ozs7Ozs7SUFPRCxVQUFVLENBQUMsT0FBZTs7UUFDeEIsTUFBTSxHQUFHLEdBQVcsSUFBSSxDQUFDLGNBQWMsSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUM7O1FBQzVHLE1BQU0sS0FBSyxHQUFXLElBQUfgQ0FBQyxjQUFjLElBQUfgSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUfgQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDOztRQUMxSCxNQUFNLElBQUfgR0FBVyxJQUFJLENBQUMsY0FBYyxJQUFJLElBQUfgQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUfgQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQztRQUV0SCxRQUFRLE9BQU8sRUFBRTtZQUNmLEtBQUssR0FBRztnQkFDTixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUfgQ0FBQyxJQUFJLGVBQWUsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLElBQUfgQ0FBQyxDQUFDLENBQUM7Z0JBQzVELE1BQU07WUFDUixLQUFLLEtBQUs7Z0JBQ1IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQ2hDLE1BQU07WUFDUixLQUFLLElBQUk7Z0JBQ1AsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQ2hDLE1BQU07U0FDVDtLQUNGOzs7Ozs7Ozs7SUFVRCx1QkFBdUIsQ0FBQyxRQUFlLElBQUfgQ0FBQyxZQUFZO1FBQ3RELElBQUfgQ0FBQyxJQUFJLENBQUMsa0JBQWtCLElBQUfgQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsV0FBVyxFQUFFO1lBQ3BFLE1BQU0sSUFBSSxLQUFLLENBQUMsaUZBQWlGLENBQUMsQ0FBQztTQUNwRzs7UUFFRCxNQUFNLHVCQUF1QixHQUFZLENBQUMsS0FBSyxDQUFDLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsV0FBVyxJQUFJLEtBQUssQ0FBQyxLQUFLLENBQUMsV0FBVyxLQUFLLEVBQUUsQ0FBQztRQUVwSCxRQUFRLElBQUfgQ0FBQyxrQkFBa0IsQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFO1lBQ3BELEtBQUssbUJBQW1CLENBQUMsYUFBYTtnQkFDcEMsT0FBTyx1QkFBdUIsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUM7WUFDckUsS0FBSyxtQkFBbUIsQ0FBQyxhQUFhO2dCQUNwQyxPQUFPLEVBQUUsQ0FBQztZQUNaOztnQkFFRSxPQUFPLElBQUfgQ0FBQyxvQkFBb0IsQ0FBQyxLQUFLLEVBQUUsdUJBQXVCLENBQUMsQ0FBQztTQUNwRTtLQUNGOzs7Ozs7O0lBUUQsd0JBQXdCLENBQUMsUUFBZSxJQUFJLENBQUMsWUFBWTtRQUN2RCxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ1YsT0FBTyxFQUFFLENBQUM7U0FDWDtRQUNELE9BQU8sS0FBSyxDQUFDLEtBQUssSUFBSSxLQUFLLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLFNBQVMsUUFBUSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUM7S0FDdkg7Ozs7Ozs7OztJQVVELGlCQUFpQixDQUFDLFFBQWUsSUFBSSxDQUFDLFlBQVk7UUFDaEQsSUFBSSxDQUFDLElBQUfgQ0FBQyxrQkFBa0IsSUFBSSxDQUFDLElBQUfgQ0FBQyxrQkFBa0IsQ0FBQyxXQUFXLEVBQUU7WUFDcEUsTUFBTSxJQUFJLEtBQUssQ0FBQyxpRkFBaUYsQ0FBQyxDQUFDO1NBQ3BHOztRQUNELE1BQU0sdUJBQXVCLEdBQVfgQ0FBQyxLQUFLLENBQUMsS0FBSyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxXQUFXLElBQUfgS0FBSyxDQUFDLEtBQUssQ0FBQyxXQUFXLEtBQUssRUFBRSxDQUFDOztRQUNwSCxNQUFNLFdBQVcsR0FBVyxJQUFJLENBQUMsb0JBQW9CLENBQUMsS0FBSyxFQUFFLHVCQUF1QixDQUFDLENBQUM7UUFDdEYsT0FBTyxXQUFXLENBQUM7S0FDcEI7Ozs7O0lBTUQsbUJBQW1COztRQUNqQixNQUFNLFlBQVfgR0FBVyxRQUFRLENBQUMsSUFBSSxDQUFDLFlBQVfgRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDdEUsSUFBSSxZQUFZLEtBQUssQ0FBQyxJQUFJLElBQUfgQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFOzs7O1lBSW5ELE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztTQUM1QztRQUNELElBQUfgQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUNwQyxPQUFPLElBQUfgQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDbkQ7Ozs7O0lBTUQsb0JBQW9COztRQUNsQixNQUFNLFlBQVfgR0FBVyxRQUFRLENBQUMsSUFBSSxDQUFDLFlBQVfgRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDdEUsSUFBSSxZQUFZLEtBQUssSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLElBQUfgQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFOzs7O1lBSXhFLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUN2QjtRQUNELElBQUfgQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUNwQyxPQUFPLElBQUfgQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLEdBQUcsQ0FBQyxFQUFFLElBQUfgQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDeEU7Ozs7Ozs7O0lBUUQsWUFBWSxDQUFDLEtBQWlDLEVBQUUsU0FBaUIsTUFBTSxDQUFDLE1BQU07OztRQUc1RSxJQUFJLE1BQU0sS0FBSyxNQUFNLENBQUMsS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLGVBQWUsRUFBRTs7WUFFdkUsT0FBTztTQUNSOztRQUVELE1BQU0sTUFBTSxHQUFXLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNyRCxJQUFJLE1BQU0sS0FBSyxJQUFJLEVBQUU7WUFDbkIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUN4QjtLQUNGOzs7Ozs7OztJQVFELGlCQUFpQixDQUFDLFNBQWlCLEVBQUUsS0FBb0IsRUFBRSxTQUFpQixNQUFNLENBQUMsTUFBTTs7UUFDdkYsTUFBTSxNQUFNLEdBQVcsS0FBSyxDQUFDLHFCQUFxQixDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUNyRSxJQUFJLE1BQU0sS0FBSyxJQUFJLEVBQUU7WUFDbkIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUN4QjthQUFNLElBQUfgTUFBTSxLQUFLLElBQUfgRUFBRTtZQUMxQixJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ3hCO0tBQ0Y7Ozs7Ozs7SUFPRCxTQUFTLENBQUMsU0FBaUIsTUFBTSxDQUFDLE1BQU07O1FBRXRDLElBQUfgSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQzVCLE9BQU87U0FDUjs7UUFDRCxNQUFNLFNBQVMsR0FBcUIsSUFBSSxDQUFDLFlBQVfgRUFBRSxDQUFDO1FBQ3hELElBQUfgQ0FBQyxPQUFPLEdBQUcsQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLENBQUM7UUFDM0MsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxlQUFlLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUN0Rjs7Ozs7OztJQU9ELFNBQVMsQ0FBQyxTQUFpQixNQUFNLENBQUMsTUFBTTs7UUFFdEMsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLEVBQUU7WUFDakQsT0FBTztTQUNSOztRQUNELE1BQU0sU0FBUyxHQUFxQixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDeEQsSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLFNBQVMsQ0FBQyxnQkFBZ0IsQ0FBQztRQUMzQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUfgQ0FBQyxJQUFJLGVBQWUsQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ3RGOzs7Ozs7O0lBT0QsV0FBVyxDQUFDLEtBQVk7O1FBQ3RCLE1BQU0sYUFBYSxHQUFtQjtZQUNwQyxNQUFNLEVBQUUsSUFBSTtZQUNaLEtBQUssRUFBRSxRQUFRLENBQUMsSUFBSSxDQUFDLFlBQVfgRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDO1lBQy9DLEVBQUUsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUU7U0FDekIsQ0FBQztRQUVGLElBQUfgQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBRW5DLElBQUfgQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO0tBQ3RCOzs7Ozs7SUFNRCxLQUFLLENBQUMsTUFBTSxHQUFHLElBQUfgQ0FBQyxZQUFZLENBQUMsS0FBSztRQUNwQyxRQUFRLE1BQU0sRUFBRTtZQUNkLEtBQUssSUFBSSxDQUFDLFlBQVfgQ0FBQyxLQUFLO2dCQUMxQixJQUFJLElBQUfgQ0FBQyxrQkFBa0IsQ0FBQyxXQUFXLEVBQUU7b0JBQ3ZDLElBQUfgQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUM5QjtxQkFBTTtvQkFDTCxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztpQkFDOUI7Z0JBQ0QsTUFBTTtZQUNSLEtBQUssSUFBSSxDQUFDLFlBQVfgQ0FBQyxJQUFJO2dCQUN6QixJQUFJLElBQUfgQ0FBQyxrQkFBa0IsQ0FBQyxXQUFXLEVBQUU7b0JBQ3ZDLElBQUfgQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUM5QjtxQkFBTTtvQkFDTCxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztpQkFDOUI7Z0JBQ0QsTUFBTTtTQUtUO0tBQ0Y7Ozs7OztJQU9ELGdCQUFnQixDQUFDLFFBQWUsSUFBSSxDQUFDLFlBQVk7UUFDL0MsT0FBTyxRQUFRLENBQUMsS0FBSyxFQUFFLElBQUfgQ0FBQyxNQUFNLENBQUMsQ0FBQztLQUNyQzs7Ozs7OztJQU9PLGdCQUFnQixDQUFDLFlBQW9CO1FBQzNDLElBQUfgSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1lBQzVCLElBQUfgQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO1lBQ3pCLElBQUfgQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO1lBQ3hCLE9BQU87U0FDUjtRQUNELElBQUfgQ0FBQyxJQUFJLENBQUMsV0FBVyxJQUFJLElBQUfgQ0FBQyxXQUFXLENBQUMsUUFBUSxLQUFLLElBQUfgRUFBRTs7WUFFM0QsSUFBSSxDQUFDLFlBQVfgR0FBRyxLQUFLLENBQUM7WUFDMUIsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7U0FDMUI7YUFBTTtZQUNMLFFBQVEsWUFBWSxFQUFFO2dCQUNwQixLQUFLLENBQUM7O29CQUVKLElBQUfgQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO29CQUN6QixJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztvQkFDekIsTUFBTTtnQkFDUixLQUFLLElBQUfgQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUM7O29CQUV6QixJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztvQkFDMUIsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7b0JBQ3hCLE1BQU07Z0JBQ1I7b0JBQ0UsSUFBSSxDQUFDLFlBQVfgR0FBRyxLQUFLLENBQUM7b0JBQzFCLElBQUfgQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO29CQUN6QixNQUFNO2FBQ1Q7U0FDRjs7Ozs7Ozs7OztJQVlLLGdCQUFnQixDQUFDLGFBQXFCO1FBQzVDLE9BQU8sQ0FBQyxDQUFDLElBQUfgQ0FBQyxXQUFXLElBQUfgSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLEtBQUssS0FBSyxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLElBQUfgQ0FBQyxNQUFNLENBQUMsS0FBSyxhQUFhLENBQUM7Ozs7Ozs7O0lBUXpILFlBQVk7O1FBQ2xCLE1BQU0sWUFBWSxHQUFXLFFBQVEsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLElBQUfgQ0FBQyxNQUFNLENBQUMsQ0FBQzs7UUFDdEUsSUFBSSxRQUFRLEdBQUcsQ0FBQyxDQUFDO1FBQ2pCLElBQUfgWUFBWSxJQUFJLENBQUMsSUFBSSxZQUFZLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQzlELFFBQVEsR0FBRyxZQUFZLEdBQUcsQ0FBQyxDQUFDO1NBQzdCO2FBQU07WUFDTCxRQUFRLEdBQUcsQ0FBQyxDQUFDO1NBQ2Q7UUFDRCxPQUFPLElBQUfgQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7Ozs7Ozs7O0lBUXZCLFlBQVk7O1FBQ2xCLE1BQU0sWUFBWSxHQUFXLFFBQVEsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLElBQUfgQ0FBQyxNQUFNLENBQUMsQ0FBQzs7UUFDdEUsSUFBSSxRQUFRLEdBQUcsQ0FBQyxDQUFDO1FBQ2pCLElBQUfgWUFBWSxHQUFHLENBQUMsSUFBSSxZQUFZLElBQUfgSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQzlELFFBQVEsR0FBRyxZQUFZLEdBQUcsQ0FBQyxDQUFDO1NBQzdCO2FBQU07WUFDTCxRQUFRLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1NBQ25DO1FBQ0QsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDOzs7Ozs7Ozs7SUFVdkIsb0JBQW9CLENBQUMsS0FBWSxFQUFFLHVCQUFnQztRQUN6RSxJQUFJLENBQUMsSUFBSSxDQUFDLGtCQUFrQixJQUFJLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFdBQVcsRUFBRTtZQUNwRSxNQUFNLElBQUfgS0FBSyxDQUFDLGlGQUFpRixDQUFDLENBQUM7U0FDcEc7O1FBR0QsSUFBSSxJQUFJLENBQUMsa0JBQWtCLENBQUMsV0FBVyxDQUFDLHFCQUFxQixJQUFJLElBQUfgQ0FBQyxrQkFBa0IsQ0FBQyxXQUFXLENBQUMscUJBQXFCLEtBQUssRUFBRSxFQUFFO1lBQ2pJLE9BQU8sSUFBSSxDQUFDLGtCQUFrQixDQUFDLFdBQVcsQ0FBQyxxQkFBcUIsQ0FBQztTQUNsRTs7UUFFRCxNQUFNLFlBQVfgR0FBVyxRQUFRLENBQUMsS0FBSyxFQUFFLElBQUfgQ0FBQyxNQUFNLENBQUMsQ0FBQzs7UUFJMUQsTUFBTSxlQUFlLEdBQVcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUfgQ0FBQyxrQkFBa0IsQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7O1FBQ25JLE1BQU0sWUFBWSxHQUFXLElBQUfgQ0FBQyxrQkFBa0IsQ0FBQyxXQUFXLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsV0FBVyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDOztRQUM1SSxNQUFNLGlCQUFpQixHQUFXLFlBQVfgR0FBRyxDQUFDLEdBQUcsWUFBWSxHQUFHLElBQUfgQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDO1FBRXZGLElBQUfgdUJBQXVCLEVBQUU7WUFDM0IsT0FBTyxlQUFlLEdBQUcsaUJBQWlCLENBQUM7U0FDNUM7O1FBRUQsTUFBTSxrQkFBa0IsR0FBVyxLQUFLLENBQUMsS0FBSyxJQUFJLEtBQUssQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDOztRQUN6RyxNQUFNLGNBQWMsR0FBVyxJQUFJLENBQUMsa0JBQWtCLENBQUMsV0FBVyxDQUFDLHFCQUFxQixHQUFHLGtCQUFrQixDQUFDO1FBQzlHLE9BQU8sZUFBZSxHQUFHLGlCQUFpQixHQUFHLGNBQWMsQ0FBQzs7Ozs7O0lBTXRELGFBQWE7O1FBQ25CLElBQUfgS0FBSyxDQUFTO1FBQ2xCLElBQUk7WUFDRixLQUFLLEdBQUcsUUFBUSxDQUFDLElBQUfgQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ2xEO1FBQUMsT0FBTyxHQUFHLEVBQUU7WUFDWixPQUFPLENBQUMsS0FBSyxDQUFDLHFEQUFxRCxDQUFDLENBQUM7WUFDckUsTUFBTSxHQUFHLENBQUM7U0FDWDtRQUNELElBQUfgSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNmLElBQUfgQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUM5Qjs7OztZQS9mSixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGtCQUFrQjtnQkFFNUIsdWhLQUFpQztnQkFDakMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O2FBQ2hEOzs7MkJBS0UsS0FBSztxQkFNTCxLQUFLO3FCQU1MLEtBQUs7aUNBTUwsS0FBSzswQkFLTCxLQUFLO2tDQU1MLEtBQUs7NkJBS0wsS0FBSzt3QkFNTCxNQUFNOzBCQUtOLE1BQU07b0JBS04sTUFBTSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gVGhlIE1JVCBMaWNlbnNlIChNSVQpXG5cbiBDb3B5cmlnaHQgKGMpIDIwMTctMjAxOCBTdGVmYW5vIENhcHBhIChLczg5KVxuXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIifgIHRvIGRlYWxcbiBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4gdG8gdXNlLCBjb3B5LCBtb2RpZnfgIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG5cbiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBhbGxcbiBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT04gSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRVxuIFNPRlRXQVJFLlxuICovXG5cbmltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uQ2hhbmdlcywgT25Jbml0LCBPdXRwdXQsIFNpbXBsZUNoYW5nZSwgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBBY2Nlc3NpYmxlQ29tcG9uZW50IH0gZnJvbSAnLi4vYWNjZXNzaWJsZS5jb21wb25lbnQnO1xuXG5pbXBvcnQgeyBBY2Nlc3NpYmlsaXR5Q29uZmlnIH0gZnJvbSAnLi4vLi4vbW9kZWwvYWNjZXNzaWJpbGl0eS5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgQWN0aW9uIH0gZnJvbSAnLi4vLi4vbW9kZWwvYWN0aW9uLmVudW0nO1xuaW1wb3J0IHsgRGVzY3JpcHRpb24sIERlc2NyaXB0aW9uU3RyYXRlZ3fgIERlc2NyaXB0aW9uU3R5bGUgfSBmcm9tICcuLi8uLi9tb2RlbC9kZXNjcmlwdGlvbi5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgSW1hZ2UsIEltYWdlTW9kYWxFdmVudCB9IGZyb20gJy4uLy4uL21vZGVsL2ltYWdlLmNsYXNzJztcbmltcG9ydCB7IEludGVybmFsTGliSW1hZ2UgfSBmcm9tICcuLi8uLi9tb2RlbC9pbWFnZS1pbnRlcm5hbC5jbGFzcyc7XG5pbXBvcnQgeyBLZXlib2FyZCB9IGZyb20gJy4uLy4uL21vZGVsL2tleWJvYXJkLmVudW0nO1xuaW1wb3J0IHsgS2V5Ym9hcmRDb25maWcgfSBmcm9tICcuLi8uLi9tb2RlbC9rZXlib2FyZC1jb25maWcuaW50ZXJmYWNlJztcbmltcG9ydCB7IExvYWRpbmdDb25maWcsIExvYWRpbmdUeXBlIH0gZnJvbSAnLi4vLi4vbW9kZWwvbG9hZGluZy1jb25maWcuaW50ZXJmYWNlJztcbmltcG9ydCB7IFNsaWRlQ29uZmlnIH0gZnJvbSAnLi4vLi4vbW9kZWwvc2xpZGUtY29uZmlnLmludGVyZmFjZSc7XG5cbmltcG9ydCB7IE5FWFQsIFBSRVYgfSBmcm9tICcuLi8uLi91dGlscy91c2VyLWlucHV0LnV0aWwnO1xuaW1wb3J0IHsgZ2V0SW5kZXggfSBmcm9tICcuLi8uLi91dGlscy9pbWFnZS51dGlsJztcbmltcG9ydCB7IEN1cnJlbnRJbWFnZUNvbmZpZyB9IGZyb20gJy4uLy4uL21vZGVsL2N1cnJlbnQtaW1hZ2UtY29uZmlnLmludGVyZmFjZSc7XG5cbi8qKlxuICogSW50ZXJmYWNlIHRvIGRlc2NyaWJlIHRoZSBMb2FkIEV2ZW50LCB1c2VkIHRvXG4gKiBlbWl0IGFuIGV2ZW50IHdoZW4gdGhlIGltYWdlIGlzIGZpbmFsbHkgbG9hZGVkIGFuZCB0aGUgc3Bpbm5lciBoYXMgZ29uZS5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBJbWFnZUxvYWRFdmVudCB7XG4gIHN0YXR1czogYm9vbGVhbjtcbiAgaW5kZXg6IG51bWJlcjtcbiAgaWQ6IG51bWJlcjtcbn1cblxuLyoqXG4gKiBDb21wb25lbnQgd2l0aCB0aGUgY3VycmVudCBpbWFnZSB3aXRoIHNvbWUgYWRkaXRpb25hbCBlbGVtZW50cyBsaWtlIGFycm93cyBhbmQgc2lkZSBwcmV2aWV3cy5cbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAna3MtY3VycmVudC1pbWFnZScsXG4gIHN0eWxlVXJsczogWydjdXJyZW50LWltYWdlLnNjc3MnLCAnY3VycmVudC1pbWFnZS1hcnJvd3Muc2NzcycsICdjdXJyZW50LWltYWdlLXByZXZpZXdzLnNjc3MnXSxcbiAgdGVtcGxhdGVVcmw6ICdjdXJyZW50LWltYWdlLmh0bWwnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBDdXJyZW50SW1hZ2VDb21wb25lbnQgZXh0ZW5kcyBBY2Nlc3NpYmxlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMge1xuICAvKipcbiAgICogT2JqZWN0IG9mIHR5cGUgYEludGVybmFsTGliSW1hZ2VgIHRoYXQgcmVwcmVzZW50IHRoZSB2aXNpYmxlIGltYWdlLlxuICAgKi9cbiAgQElucHV0KClcbiAgY3VycmVudEltYWdlOiBJbnRlcm5hbExpYkltYWdlO1xuICAvKipcbiAgICogQXJyYXkgb2YgYEludGVybmFsTGliSW1hZ2VgIHRoYXQgcmVwcmVzZW50IHRoZSBtb2RlbCBvZiB0aGlzIGxpYnJhcnkgd2l0aCBhbGwgaW1hZ2VzLFxuICAgKiB0aHVtYnMgYW5kIHNvIG9uLlxuICAgKi9cbiAgQElucHV0KClcbiAgaW1hZ2VzOiBJbnRlcm5hbExpYkltYWdlW107XG4gIC8qKlxuICAgKiBCb29sZWFuIHRoYXQgaXQgaXMgdHJ1ZSBpZiB0aGUgbW9kYWwgZ2FsbGVyeSBpcyB2aXNpYmxlLlxuICAgKiBJZiB5ZXMsIGFsc28gdGhpcyBjb21wb25lbnQgc2hvdWxkIGJlIHZpc2libGUuXG4gICAqL1xuICBASW5wdXQoKVxuICBpc09wZW46IGJvb2xlYW47XG4gIC8qKlxuICAgKiBJbnRlcmZhY2UgdG8gY29uZmlndXJlIGN1cnJlbnQgaW1hZ2UgaW4gbW9kYWwtZ2FsbGVyeS5cbiAgICogRm9yIGluc3RhbmNlIHlvdSBjYW4gZGlzYWJsZSBuYXZpZ2F0aW9uIG9uIGNsaWNrIG9uIGN1cnJlbnQgaW1hZ2UgKGVuYWJsZWQgYnkgZGVmYXVsdCkuXG4gICAqL1xuICBASW5wdXQoKVxuICBjdXJyZW50SW1hZ2VDb25maWc6IEN1cnJlbnRJbWFnZUNvbmZpZztcbiAgLyoqXG4gICAqIE9iamVjdCBvZiB0eXBlIGBTbGlkZUNvbmZpZ2AgdG8gZ2V0IGBpbmZpbml0ZSBzbGlkaW5nYC5cbiAgICovXG4gIEBJbnB1dCgpXG4gIHNsaWRlQ29uZmlnOiBTbGlkZUNvbmZpZztcbiAgLyoqXG4gICAqIE9iamVjdCBvZiB0eXBlIGBBY2Nlc3NpYmlsaXR5Q29uZmlnYCB0byBpbml0IGN1c3RvbSBhY2Nlc3NpYmlsaXR5IGZlYXR1cmVzLlxuICAgKiBGb3IgaW5zdGFuY2UsIGl0IGNvbnRhaW5zIHRpdGxlcywgYWx0IHRleHRzLCBhcmlhLWxhYmVscyBhbmQgc28gb24uXG4gICAqL1xuICBASW5wdXQoKVxuICBhY2Nlc3NpYmlsaXR5Q29uZmlnOiBBY2Nlc3NpYmlsaXR5Q29uZmlnO1xuICAvKipcbiAgICogT2JqZWN0IG9mIHR5cGUgYEtleWJvYXJkQ29uZmlnYCB0byBhc3NpZ24gY3VzdG9tIGtleXMgdG8gYm90aCBFU0MsIFJJR0hUIGFuZCBMRUZUIGtleWJvYXJkJ3MgYWN0aW9ucy5cbiAgICovXG4gIEBJbnB1dCgpXG4gIGtleWJvYXJkQ29uZmlnOiBLZXlib2FyZENvbmZpZztcblxuICAvKipcbiAgICogT3V0cHV0IHRvIGVtaXQgYW4gZXZlbnQgd2hlbiBpbWFnZXMgYXJlIGxvYWRlZC4gVGhlIHBheWxvYWQgY29udGFpbnMgYW4gYEltYWdlTG9hZEV2ZW50YC5cbiAgICovXG4gIEBPdXRwdXQoKVxuICBsb2FfgW1hZ2U6IEV2ZW50RW1pdHRlcjxJbWFnZUxvYWRFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPEltYWdlTG9hZEV2ZW50PigpO1xuICAvKipcbiAgICogT3V0cHV0IHRvIGVtaXQgYW55IGNoYW5nZXMgb2YgdGhlIGN1cnJlbnQgaW1hZ2UuIFRoZSBwYXlsb2FkIGNvbnRhaW5zIGFuIGBJbWFnZU1vZGFsRXZlbnRgLlxuICAgKi9cbiAgQE91dHB1dCgpXG4gIGNoYW5nZUltYWdlOiBFdmVudEVtaXR0ZXI8SW1hZ2VNb2RhbEV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8SW1hZ2VNb2RhbEV2ZW50PigpO1xuICAvKipcbiAgICogT3V0cHV0IHRvIGVtaXQgYW4gZXZlbnQgd2hlbiB0aGUgbW9kYWwgZ2FsbGVyeSBpcyBjbG9zZWQuIFRoZSBwYXlsb2FkIGNvbnRhaW5zIGFuIGBJbWFnZU1vZGFsRXZlbnRgLlxuICAgKi9cbiAgQE91dHB1dCgpXG4gIGNsb3NlOiBFdmVudEVtaXR0ZXI8SW1hZ2VNb2RhbEV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8SW1hZ2VNb2RhbEV2ZW50PigpO1xuXG4gIC8qKlxuICAgKiBFbnVtIG9mIHR5cGUgYEFjdGlvbmAgdGhhdCByZXByZXNlbnRzIGEgbW91c2UgY2xpY2sgb24gYSBidXR0b24uXG4gICAqIERlY2xhcmVkIGhlcmUgdG8gYmUgdXNlZCBpbnNpZGUgdGhlIHRlbXBsYXRlLlxuICAgKi9cbiAgY2xpY2tBY3Rpb246IEFjdGlvbiA9IEFjdGlvbi5DTElDSztcbiAgLyoqXG4gICAqIEVudW0gb2YgdHlwZSBgQWN0aW9uYCB0aGF0IHJlcHJlc2VudHMgYSBrZXlib2FyZCBhY3Rpb24uXG4gICAqIERlY2xhcmVkIGhlcmUgdG8gYmUgdXNlZCBpbnNpZGUgdGhlIHRlbXBsYXRlLlxuICAgKi9cbiAga2V5Ym9hcmRBY3Rpb246IEFjdGlvbiA9IEFjdGlvbi5LRVlCT0FSRDtcbiAgLyoqXG4gICAqIEJvb2xlYW4gdGhhdCBpdCdzIHRydWUgd2hlbiB5b3UgYXJlIHdhdGNoaW5nIHRoZSBmaXJzdCBpbWFnZSAoY3VycmVudGx5IHZpc2libGUpLlxuICAgKiBGYWxzZSBieSBkZWZhdWx0XG4gICAqL1xuICBpc0ZpcnN0SW1hZ2UgPSBmYWxzZTtcbiAgLyoqXG4gICAqIEJvb2xlYW4gdGhhdCBpdCdzIHRydWUgd2hlbiB5b3UgYXJlIHdhdGNoaW5nIHRoZSBsYXN0IGltYWdlIChjdXJyZW50bHkgdmlzaWJsZSkuXG4gICAqIEZhbHNlIGJ5IGRlZmF1bHRcbiAgICovXG4gIGlzTGFzdEltYWdlID0gZmFsc2U7XG4gIC8qKlxuICAgKiBCb29sZWFuIHRoYXQgaXQncyB0cnVlIGlmIGFuIGltYWdlIG9mIHRoZSBtb2RhbCBnYWxsZXJ5IGlzIHN0aWxsIGxvYWRpbmcuXG4gICAqIFRydWUgYnkgZGVmYXVsdFxuICAgKi9cbiAgbG9hZGluZyA9IHRydWU7XG4gIC8qKlxuICAgKiBPYmplY3Qgb2YgdHlwZSBgQ3VycmVudEltYWdlQ29uZmlnYCBleHBvc2VkIHRvIHRoZSB0ZW1wbGF0ZS4gVGhpcyBmaWVsZCBpcyBpbml0aWFsaXplZFxuICAgKiBhcHBseWluZyB0cmFuc2Zvcm1hdGlvbnMsIGRlZmF1bHQgdmFsdWVzIGFuZCBzbyBvbiB0byB0aGUgaW5wdXQgb2YgdGhlIHNhbWUgdHlwZS5cbiAgICovXG4gIGNvbmZpZ0N1cnJlbnRJbWFnZTogQ3VycmVudEltYWdlQ29uZmlnO1xuXG4gIC8qKlxuICAgKiBQcml2YXRlIG9iamVjdCB3aXRob3V0IHR5cGUgdG8gZGVmaW5lIGFsbCBzd2lwZSBhY3Rpb25zIHVzZWQgYnkgaGFtbWVyanMuXG4gICAqL1xuICBwcml2YXRlIFNXSVBFX0FDVElPTiA9IHtcbiAgICBMRUZUOiAnc3dpcGVsZWZ0JyxcbiAgICBSSUdIVDogJ3N3aXBlcmlnaHQnLFxuICAgIFVQOiAnc3dpcGV1cCcsXG4gICAgRE9XTjogJ3N3aXBlZG93bidcbiAgfTtcblxuICAvKipcbiAgICogTWV0aG9kIMK0bmdPbkluaXTCtCB0byBidWlsZCBgY29uZmlnQ3VycmVudEltYWdlYCBhcHBseWluZyBkZWZhdWx0IHZhbHVlcy5cbiAgICogVGhpcyBpcyBhbiBBbmd1bGFyJ3MgbGlmZWN5Y2xlIGhvb2ssIHNvIGl0cyBjYWxsZWQgYXV0b21hdGljYWxseSBieSBBbmd1bGFyIGl0c2VsZi5cbiAgICogSW4gcGFydGljdWxhciwgaXQncyBjYWxsZWQgb25seSBvbmUgdGltZSEhIVxuICAgKi9cbiAgbmdPbkluaXQofgB7XG4gICAgY29uc3QgZGVmYXVsdExvYWRpbmc6IExvYWRpbmdDb25maWcgPSB7IGVuYWJsZTogdHJ1ZSwgdHlwZTogTG9hZGluZ1R5cGUuU1RBTkRBUkQgfTtcbiAgICBjb25zdCBkZWZhdWx0RGVzY3JpcHRpb25TdHlsZTogRGVzY3JpcHRpb25TdHlsZSA9IHtcbiAgICAgIGJnQ29sb3I6ICdyZ2JhKDAsIDAsIDAsIC41fgcsXG4gICAgICB0ZXh0Q29sb3I6ICd3aGl0ZScsXG4gICAgICBtYXJnaW5Ub3A6ICcwcHgnLFxuICAgICAgbWFyZ2luQm90dG9tOiAnMHB4JyxcbiAgICAgIG1hcmdpbkxlZnQ6ICcwcHgnLFxuICAgICAgbWFyZ2luUmlnaHQ6ICcwcHgnXG4gICAgfTtcbiAgICBjb25zdCBkZWZhdWx0RGVzY3JpcHRpb246IERlc2NyaXB0aW9uID0ge1xuICAgICAgc3RyYXRlZ3k6IERlc2NyaXB0aW9uU3RyYXRlZ3kuQUxXQVlTX1ZJU0lCTEUsXG4gICAgICBpbWFnZVRleHQ6ICdJbWFnZSAnLFxuICAgICAgbnVtYmVyU2VwYXJhdG9yOiAnLycsXG4gICAgICBiZWZvcmVUZXh0RGVzY3JpcHRpb246ICcgLSAnLFxuICAgICAgc3R5bGU6IGRlZmF1bHREZXNjcmlwdGlvblN0eWxlXG4gICAgfTtcbiAgICBjb25zdCBkZWZhdWx0Q3VycmVudEltYWdlQ29uZmlnOiBDdXJyZW50SW1hZ2VDb25maWcgPSB7XG4gICAgICBuYXZpZ2F0ZU9uQ2xpY2s6IHRydWUsXG4gICAgICBsb2FkaW5nQ29uZmlnOiBkZWZhdWx0TG9hZGluZyxcbiAgICAgIGRlc2NyaXB0aW9uOiBkZWZhdWx0RGVzY3JpcHRpb24sXG4gICAgICBkb3dubG9hZGFibGU6IGZhbHNlLFxuICAgICAgaW52ZXJ0U3dpcGU6IGZhbHNlXG4gICAgfTtcblxuICAgIHRoaXMuY29uZmlnQ3VycmVudEltYWdlID0gT2JqZWN0LmFzc2lnbih7fSwgZGVmYXVsdEN1cnJlbnRJbWFnZUNvbmZpZywgdGhpcy5jdXJyZW50SW1hZ2VDb25maWcpO1xuICAgIHRoaXMuY29uZmlnQ3VycmVudEltYWdlLmRlc2NyaXB0aW9uID0gT2JqZWN0LmFzc2lnbih7fSwgZGVmYXVsdERlc2NyaXB0aW9uLCB0aGlzLmNvbmZpZ0N1cnJlbnRJbWFnZS5kZXNjcmlwdGlvbik7XG4gIH1cblxuICAvKipcbiAgICogTWV0aG9kIMK0bmdPbkNoYW5nZXPCtCB0byB1cGRhdGUgYGxvYWRpbmdgIHN0YXR1cyBhbmQgZW1pdCBldmVudHMuXG4gICAqIElmIHRoZSBnYWxsZXJ5IGlzIG9wZW4sIHRoZW4gaXQgd2lsbCBhbHNvIG1hbmFnZSBib3VuZGFyeSBhcnJvd3MgYW5kIHNsaWRpbmcuXG4gICAqIFRoaXMgaXMgYW4gQW5ndWxhcidzIGxpZmVjeWNsZSBob29rLCBzbyBpdHMgY2FsbGVkIGF1dG9tYXRpY2FsbHkgYnkgQW5ndWxhciBpdHNlbGYuXG4gICAqIEluIHBhcnRpY3VsYXIsIGl0J3MgY2FsbGVkIHdoZW4gYW55IGRhdGEtYm91bmQgcHJvcGVydHkgb2YgYSBkaXJlY3RpdmUgY2hhbmdlcyEhIVxuICAgKi9cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIGNvbnN0IGltYWdlczogU2ltcGxlQ2hhbmdlID0gY2hhbmdlcy5pbWFnZXM7XG4gICAgY29uc3QgY3VycmVudEltYWdlOiBTaW1wbGVDaGFuZ2UgPSBjaGFuZ2VzLmN1cnJlbnRJbWFnZTtcblxuICAgIGlmIChjdXJyZW50SW1hZ2UgJiYgY3VycmVudEltYWdlLnByZXZpb3VzVmFsdWUgIT09IGN1cnJlbnRJbWFnZS5jdXJyZW50VmFsdWUpIHtcbiAgICAgIHRoaXMudXBkYXRlSW5kZXhlcygpO1xuICAgIH0gZWxzZSBpZiAoaW1hZ2VzICYmIGltYWdlcy5wcmV2aW91c1ZhbHVlICE9PSBpbWFnZXMuY3VycmVudFZhbHVlfgB7XG4gICAgICB0aGlzLnVwZGF0ZUluZGV4ZXMoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogTWV0aG9kIHRvIGhhbmRsZSBrZXlwcmVzcyBiYXNlZCBvbiB0aGUgYGtleWJvYXJkQ29uZmlnYCBpbnB1dC4gSXQgZ2V0cyB0aGUga2V5Q29kZSBvZlxuICAgKiB0aGUga2V5IHRoYXQgdHJpZ2dlcmVkIHRoZSBrZXlwcmVzcyBldmVudCB0byBuYXZpZ2F0ZSBiZXR3ZWVuIGltYWdlcyBvciB0byBjbG9zZSB0aGUgbW9kYWwgZ2FsbGVyeS5cbiAgICogQHBhcmFtIG51bWJlciBrZXlDb2RlIG9mIHRoZSBrZXkgdGhhdCB0cmlnZ2VyZWQgdGhlIGtleXByZXNzIGV2ZW50XG4gICAqL1xuICBvbktleVByZXNzKGtleUNvZGU6IG51bWJlcikge1xuICAgIGNvbnN0IGVzYzogbnVtYmVyID0gdGhpcy5rZXlib2FyZENvbmZpZyAmJiB0aGlzLmtleWJvYXJkQ29uZmlnLmVzYyA/IHRoaXMua2V5Ym9hcmRDb25maWcuZXNjIDogS2V5Ym9hcmQuRVNDO1xuICAgIGNvbnN0IHJpZ2h0OiBudW1iZXIgPSB0aGlzLmtleWJvYXJkQ29uZmlnICYmIHRoaXMua2V5Ym9hcmRDb25maWcucmlnaHQgPyB0aGlzLmtleWJvYXJkQ29uZmlnLnJpZ2h0IDogS2V5Ym9hcmQuUklHSFRfQVJST1c7XG4gICAgY29uc3QgbGVmdDogbnVtYmVyID0gdGhpcy5rZXlib2FyZENvbmZpZyAmJiB0aGlzLmtleWJvYXJkQ29uZmlnLmxlZnQgPyB0aGlzLmtleWJvYXJkQ29uZmlnLmxlZnQgOiBLZXlib2FyZC5MRUZUX0FSUk9XO1xuXG4gICAgc3dpdGNoIChrZXlDb2RlfgB7XG4gICAgICBjYXNlIGVzYzpcbiAgICAgICAgdGhpcy5jbG9zZS5lbWl0KG5ldyBJbWFnZU1vZGFsRXZlbnQoQWN0aW9uLktFWUJPQVJELCB0cnVlfgk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSByaWdodDpcbiAgICAgICAgdGhpcy5uZXh0SW1hZ2UoQWN0aW9uLktFWUJPQVJEKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIGxlZnQ6XG4gICAgICAgIHRoaXMucHJldkltYWdlKEFjdGlvbi5LRVlCT0FSRCk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBNZXRob2QgdG8gZ2V0IHRoZSBpbWFnZSBkZXNjcmlwdGlvbiBiYXNlZCBvbiBpbnB1dCBwYXJhbXMuXG4gICAqIElmIHlvdSBwcm92aWRlIGEgZnVsbCBkZXNjcmlwdGlvbiB0aGlzIHdpbGwgYmUgdGhlIHZpc2libGUgZGVzY3JpcHRpb24sIG90aGVyd2lzZSxcbiAgICogaXQgd2lsbCBiZSBidWlsdCB1c2luZyB0aGUgYERlc2NyaXB0aW9uYCBvYmplY3QsIGNvbmNhdGVuYXRpbmcgaXRzIGZpZWxkcy5cbiAgICogQHBhcmFtIEltYWdlIGltYWdlIHRvIGdldCBpdHMgZGVzY3JpcHRpb24uIElmIG5vdCBwcm92aWRlZCBpdCB3aWxsIGJlIHRoZSBjdXJyZW50IGltYWdlXG4gICAqIEByZXR1cm5zIFN0cmluZyBkZXNjcmlwdGlvbiBvZiB0aGUgaW1hZ2UgKG9yIHRoZSBjdXJyZW50IGltYWdlIGlmIG5vdCBwcm92aWRlZClcbiAgICogQHRocm93cyBhbiBFcnJvciBpZiBkZXNjcmlwdGlvbiBpc24ndCBhdmFpbGFibGVcbiAgICovXG4gIGdldERlc2NyaXB0aW9uVG9EaXNwbGF5KGltYWdlOiBJbWFnZSA9IHRoaXMuY3VycmVudEltYWdlKTogc3RyaW5nIHtcbiAgICBpZiAoIXRoaXMuY29uZmlnQ3VycmVudEltYWdlIHx8ICF0aGlzLmNvbmZpZ0N1cnJlbnRJbWFnZS5kZXNjcmlwdGlvbikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdEZXNjcmlwdGlvbiBpbnB1dCBtdXN0IGJlIGEgdmFsaWQgb2JqZWN0IGltcGxlbWVudGluZyB0aGUgRGVzY3JpcHRpb24gaW50ZXJmYWNlJyk7XG4gICAgfVxuXG4gICAgY29uc3QgaW1hZ2VXaXRob3V0RGVzY3JpcHRpb246IGJvb2xlYW4gPSAhaW1hZ2UubW9kYWwgfHwgIWltYWdlLm1vZGFsLmRlc2NyaXB0aW9uIHx8IGltYWdlLm1vZGFsLmRlc2NyaXB0aW9uID09PSAnJztcblxuICAgIHN3aXRjaCAodGhpcy5jb25maWdDdXJyZW50SW1hZ2UuZGVzY3JpcHRpb24uc3RyYXRlZ3kpIHtcbiAgICAgIGNhc2UgRGVzY3JpcHRpb25TdHJhdGVneS5ISURFX0lGX0VNUFRZOlxuICAgICAgICByZXR1cm4gaW1hZ2VXaXRob3V0RGVzY3JpcHRpb24gPyAnJyA6IGltYWdlLm1vZGFsLmRlc2NyaXB0aW9uICsgJyc7XG4gICAgICBjYXNlIERlc2NyaXB0aW9uU3RyYXRlZ3kuQUxXQVlTX0hJRERFTjpcbiAgICAgICAgcmV0dXJuICcnO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgLy8gLS0tLS0tLS0tLS0gRGVzY3JpcHRpb25TdHJhdGVneS5BTFdBWVNfVklTSUJMRSAtLS0tLS0tLS0tLS0tLS0tLVxuICAgICAgICByZXR1cm4gdGhpcy5idWlsZFRleHREZXNjcmlwdGlvbihpbWFnZSwgaW1hZ2VXaXRob3V0RGVzY3JpcHRpb24pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBNZXRob2QgdG8gZ2V0IGBhbHQgYXR0cmlidXRlYC5cbiAgICogYGFsdGAgc3BlY2lmaWVzIGFuIGFsdGVybmF0ZSB0ZXh0IGZvciBhbiBpbWFnZSwgaWYgdGhlIGltYWdlIGNhbm5vdCBiZSBkaXNwbGF5ZWQuXG4gICAqIEBwYXJhbSBJbWFnZSBpbWFnZSB0byBnZXQgaXRzIGFsdCBkZXNjcmlwdGlvbi4gSWYgbm90IHByb3ZpZGVkIGl0IHdpbGwgYmUgdGhlIGN1cnJlbnQgaW1hZ2VcbiAgICogQHJldHVybnMgU3RyaW5nIGFsdCBkZXNjcmlwdGlvbiBvZiB0aGUgaW1hZ2UgKG9yIHRoZSBjdXJyZW50IGltYWdlIGlmIG5vdCBwcm92aWRlZClcbiAgICovXG4gIGdldEFsdERlc2NyaXB0aW9uQnlJbWFnZShpbWFnZTogSW1hZ2UgPSB0aGlzLmN1cnJlbnRJbWFnZSk6IHN0cmluZyB7XG4gICAgaWYgKCFpbWFnZSkge1xuICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgICByZXR1cm4gaW1hZ2UubW9kYWwgJiYgaW1hZ2UubW9kYWwuZGVzY3JpcHRpb24gPyBpbWFnZS5tb2RhbC5kZXNjcmlwdGlvbiA6IGBJbWFnZSAke2dldEluZGV4KGltYWdlLCB0aGlzLmltYWdlcykgKyAxfWA7XG4gIH1cblxuICAvKipcbiAgICogTWV0aG9kIHRvIGdldCB0aGUgdGl0bGUgYXR0cmlidXRlcyBiYXNlZCBvbiBkZXNjcmlwdGlvbnMuXG4gICAqIFRoaXMgaXMgdXNlZnVsIHRvIHByZXZlbnQgYWNjZXNzaWJpbGl0eSBpc3N1ZXMsIGJlY2F1c2UgaWYgRGVzY3JpcHRpb25TdHJhdGVneSBpcyBBTFdBWVNfSElEREVOLFxuICAgKiBpdCBwcmV2ZW50cyBhbiBlbXB0eSBzdHJpbmcgYXMgdGl0bGUuXG4gICAqIEBwYXJhbSBJbWFnZSBpbWFnZSB0byBnZXQgaXRzIGRlc2NyaXB0aW9uLiBJZiBub3QgcHJvdmlkZWQgaXQgd2lsbCBiZSB0aGUgY3VycmVudCBpbWFnZVxuICAgKiBAcmV0dXJucyBTdHJpbmcgdGl0bGUgb2YgdGhlIGltYWdlIGJhc2VkIG9uIGRlc2NyaXB0aW9uc1xuICAgKiBAdGhyb3dzIGFuIEVycm9yIGlmIGRlc2NyaXB0aW9uIGlzbid0IGF2YWlsYWJsZVxuICAgKi9cbiAgZ2V0VGl0bGVUb0Rpc3BsYXkoaW1hZ2U6IEltYWdlID0gdGhpcy5jdXJyZW50SW1hZ2UpOiBzdHJpbmcge1xuICAgIGlmICghdGhpcy5jb25maWdDdXJyZW50SW1hZ2UgfHwgIXRoaXMuY29uZmlnQ3VycmVudEltYWdlLmRlc2NyaXB0aW9ufgB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Rlc2NyaXB0aW9uIGlucHV0IG11c3QgYmUgYSB2YWxpZCBvYmplY3QgaW1wbGVtZW50aW5nIHRoZSBEZXNjcmlwdGlvbiBpbnRlcmZhY2UnKTtcbiAgICB9XG4gICAgY29uc3QgaW1hZ2VXaXRob3V0RGVzY3JpcHRpb246IGJvb2xlYW4gPSAhaW1hZ2UubW9kYWwgfHwgIWltYWdlLm1vZGFsLmRlc2NyaXB0aW9uIHx8IGltYWdlLm1vZGFsLmRlc2NyaXB0aW9uID09PSAnJztcbiAgICBjb25zdCBkZXNjcmlwdGlvbjogc3RyaW5nID0gdGhpcy5idWlsZFRleHREZXNjcmlwdGlvbihpbWFnZSwgaW1hZ2VXaXRob3V0RGVzY3JpcHRpb24pO1xuICAgIHJldHVybiBkZXNjcmlwdGlvbjtcbiAgfVxuXG4gIC8qKlxuICAgKiBNZXRob2QgdG8gZ2V0IHRoZSBsZWZ0IHNpZGUgcHJldmlldyBpbWFnZS5cbiAgICogQHJldHVybnMgSW1hZ2UgdGhlIGltYWdlIHRvIHNob3cgYXMgc2l6ZSBwcmV2aWV3IG9uIHRoZSBsZWZ0XG4gICAqL1xuICBnZXRMZWZ0UHJldmlld0ltYWdlKCk6IEltYWdlIHtcbiAgICBjb25zdCBjdXJyZW50SW5kZXg6IG51bWJlciA9IGdldEluZGV4KHRoaXMuY3VycmVudEltYWdlLCB0aGlzLmltYWdlcyk7XG4gICAgaWYgKGN1cnJlbnRJbmRleCA9PT0gMCAmJiB0aGlzLnNsaWRlQ29uZmlnLmluZmluaXRlfgB7XG4gICAgICAvLyB0aGUgY3VycmVudCBpbWFnZSBpcyB0aGUgZmlyc3Qgb25lLFxuICAgICAgLy8gc28gdGhlIHByZXZpb3VzIG9uZSBpcyB0aGUgbGFzdCBpbWFnZVxuICAgICAgLy8gYmVjYXVzZSBpbmZpbml0ZSBpcyB0cnVlXG4gICAgICByZXR1cm4gdGhpcy5pbWFnZXNbdGhpcy5pbWFnZXMubGVuZ3RoIC0gMV07XG4gICAgfVxuICAgIHRoaXMuaGFuZGxlQm91bmRhcmllcyhjdXJyZW50SW5kZXgpO1xuICAgIHJldHVybiB0aGlzLmltYWdlc1tNYXRoLm1heChjdXJyZW50SW5kZXggLSAxLCAwKV07XG4gIH1cblxuICAvKipcbiAgICogTWV0aG9kIHRvIGdldCB0aGUgcmlnaHQgc2lkZSBwcmV2aWV3IGltYWdlLlxuICAgKiBAcmV0dXJucyBJbWFnZSB0aGUgaW1hZ2UgdG8gc2hvdyBhcyBzaXplIHByZXZpZXcgb24gdGhlIHJpZ2h0XG4gICAqL1xuICBnZXRSaWdodFByZXZpZXdJbWFnZSgpOiBJbWFnZSB7XG4gICAgY29uc3QgY3VycmVudEluZGV4OiBudW1iZXIgPSBnZXRJbmRleCh0aGlzLmN1cnJlbnRJbWFnZSwgdGhpcy5pbWFnZXMpO1xuICAgIGlmIChjdXJyZW50SW5kZXggPT09IHRoaXMuaW1hZ2VzLmxlbmd0aCAtIDEgJiYgdGhpcy5zbGlkZUNvbmZpZy5pbmZpbml0ZSkge1xuICAgICAgLy8gdGhlIGN1cnJlbnQgaW1hZ2UgaXMgdGhlIGxhc3Qgb25lLFxuICAgICAgLy8gc28gdGhlIG5leHQgb25lIGlzIHRoZSBmaXJzdCBpbWFnZVxuICAgICAgLy8gYmVjYXVzZSBpbmZpbml0ZSBpcyB0cnVlXG4gICAgICByZXR1cm4gdGhpcy5pbWFnZXNbMF07XG4gICAgfVxuICAgIHRoaXMuaGFuZGxlQm91bmRhcmllcyhjdXJyZW50SW5kZXgpO1xuICAgIHJldHVybiB0aGlzLmltYWdlc1tNYXRoLm1pbihjdXJyZW50SW5kZXggKyAxLCB0aGlzLmltYWdlcy5sZW5ndGggLSAxKV07XG4gIH1cblxuICAvKipcbiAgICogTWV0aG9kIGNhbGxlZCBieSBldmVudHMgZnJvbSBib3RoIGtleWJvYXJkIGFuZCBtb3VzZSBvbiBhbiBpbWFnZS5cbiAgICogVGhpcyB3aWxsIGludm9rZSB0aGUgbmV4dEltYWdlIG1ldGhvZC5cbiAgICogQHBhcmFtIEtleWJvYXJkRXZlbnQgfCBNb3VzZUV2ZW50IGV2ZW50IHBheWxvYWRcbiAgICogQHBhcmFtIEFjdGlvbiBhY3Rpb24gdGhhdCB0cmlnZ2VyZWQgdGhlIGV2ZW50IG9yIGBBY3Rpb24uTk9STUFMYCBpZiBub3QgcHJvdmlkZWRcbiAgICovXG4gIG9uSW1hZ2VFdmVudChldmVudDogS2V5Ym9hcmRFdmVudCB8IE1vdXNlRXZlbnQsIGFjdGlvbjogQWN0aW9uID0gQWN0aW9uLk5PUk1BTCkge1xuICAgIC8vIGNoZWNrIGlmIHRyaWdnZXJlZCBieSBhIG1vdXNlIGNsaWNrXG4gICAgLy8gSWYgeWVzLCBJdCBzaG91bGQgYmxvY2sgbmF2aWdhdGlvbiB3aGVuIG5hdmlnYXRlT25DbGljayBpcyBmYWxzZVxuICAgIGlmIChhY3Rpb24gPT09IEFjdGlvbi5DTElDSyAmJiAhdGhpcy5jb25maWdDdXJyZW50SW1hZ2UubmF2aWdhdGVPbkNsaWNrfgB7XG4gICAgICAvLyBhIHVzZXIgaGFzIHJlcXVlc3RlZCB0byBibG9jayBuYXZpZ2F0aW9uIHZpYSBjb25maWdDdXJyZW50SW1hZ2UubmF2aWdhdGVPbkNsaWNrIHByb3BlcnR5XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgcmVzdWx0OiBudW1iZXIgPSBzdXBlci5oYW5kbGVJbWFnZUV2ZW50KGV2ZW50KTtcbiAgICBpZiAocmVzdWx0ID09PSBORVhUfgB7XG4gICAgICB0aGlzLm5leHRJbWFnZShhY3Rpb24pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBNZXRob2QgY2FsbGVkIGJ5IGV2ZW50cyBmcm9tIGJvdGgga2V5Ym9hcmQgYW5kIG1vdXNlIG9uIGEgbmF2aWdhdGlvbiBhcnJvdy5cbiAgICogQHBhcmFtIHN0cmluZyBkaXJlY3Rpb24gb2YgdGhlIG5hdmlnYXRpb24gdGhhdCBjYW4gYmUgZWl0aGVyICduZXh0JyBvciAncHJldidcbiAgICogQHBhcmFtIEtleWJvYXJkRXZlbnQgfCBNb3VzZUV2ZW50IGV2ZW50IHBheWxvYWRcbiAgICogQHBhcmFtIEFjdGlvbiBhY3Rpb24gdGhhdCB0cmlnZ2VyZWQgdGhlIGV2ZW50IG9yIGBBY3Rpb24uTk9STUFMYCBpZiBub3QgcHJvdmlkZWRcbiAgICovXG4gIG9uTmF2aWdhdGlvbkV2ZW50KGRpcmVjdGlvbjogc3RyaW5nLCBldmVudDogS2V5Ym9hcmRFdmVudCwgYWN0aW9uOiBBY3Rpb24gPSBBY3Rpb24uTk9STUFMfgB7XG4gICAgY29uc3QgcmVzdWx0OiBudW1iZXIgPSBzdXBlci5oYW5kbGVOYXZpZ2F0aW9uRXZlbnQoZGlyZWN0aW9uLCBldmVudCk7XG4gICAgaWYgKHJlc3VsdCA9PT0gTkVYVCkge1xuICAgICAgdGhpcy5uZXh0SW1hZ2UoYWN0aW9uKTtcbiAgICB9IGVsc2UgaWYgKHJlc3VsdCA9PT0gUFJFVikge1xuICAgICAgdGhpcy5wcmV2SW1hZ2UoYWN0aW9uKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogTWV0aG9kIHRvIGdvIGJhY2sgdG8gdGhlIHByZXZpb3VzIGltYWdlLlxuICAgKiBAcGFyYW0gYWN0aW9uIEVudW0gb2YgdHlwZSBgQWN0aW9uYCB0aGF0IHJlcHJlc2VudHMgdGhlIHNvdXJjZVxuICAgKiAgYWN0aW9uIHRoYXQgbW92ZWQgYmFjayB0byB0aGUgcHJldmlvdXMgaW1hZ2UuIGBBY3Rpb24uTk9STUFMYCBieSBkZWZhdWx0LlxuICAgKi9cbiAgcHJldkltYWdlKGFjdGlvbjogQWN0aW9uID0gQWN0aW9uLk5PUk1BTCkge1xuICAgIC8vIGNoZWNrIGlmIHByZXZJbWFnZSBzaG91bGQgYmUgYmxvY2tlZFxuICAgIGlmICh0aGlzLmlzUHJldmVudFNsaWRpbmcoMCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgcHJldkltYWdlOiBJbnRlcm5hbExpYkltYWdlID0gdGhpcy5nZXRQcmV2SW1hZ2UoKTtcbiAgICB0aGlzLmxvYWRpbmcgPSAhcHJldkltYWdlLnByZXZpb3VzbHlMb2FkZWQ7XG4gICAgdGhpcy5jaGFuZ2VJbWFnZS5lbWl0KG5ldyBJbWFnZU1vZGFsRXZlbnQoYWN0aW9uLCBnZXRJbmRleChwcmV2SW1hZ2UsIHRoaXMuaW1hZ2VzfgkpO1xuICB9XG5cbiAgLyoqXG4gICAqIE1ldGhvZCB0byBnbyBiYWNrIHRvIHRoZSBwcmV2aW91cyBpbWFnZS5cbiAgICogQHBhcmFtIGFjdGlvbiBFbnVtIG9mIHR5cGUgYEFjdGlvbmAgdGhhdCByZXByZXNlbnRzIHRoZSBzb3VyY2VcbiAgICogIGFjdGlvbiB0aGF0IG1vdmVkIHRvIHRoZSBuZXh0IGltYWdlLiBgQWN0aW9uLk5PUk1BTGAgYnkgZGVmYXVsdC5cbiAgICovXG4gIG5leHRJbWFnZShhY3Rpb246IEFjdGlvbiA9IEFjdGlvbi5OT1JNQUwpIHtcbiAgICAvLyBjaGVjayBpZiBuZXh0SW1hZ2Ugc2hvdWxkIGJlIGJsb2NrZWRcbiAgICBpZiAodGhpcy5pc1ByZXZlbnRTbGlkaW5nKHRoaXMuaW1hZ2VzLmxlbmd0aCAtIDEpfgB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IG5leHRJbWFnZTogSW50ZXJuYWxMaWJJbWFnZSA9IHRoaXMuZ2V0TmV4dEltYWdlKCk7XG4gICAgdGhpcy5sb2FkaW5nID0gIW5leHRJbWFnZS5wcmV2aW91c2x5TG9hZGVkO1xuICAgIHRoaXMuY2hhbmdlSW1hZ2UuZW1pdChuZXcgSW1hZ2VNb2RhbEV2ZW50KGFjdGlvbiwgZ2V0SW5kZXgobmV4dEltYWdlLCB0aGlzLmltYWdlcykpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBNZXRob2QgdG8gZW1pdCBhbiBldmVudCBhcyBsb2FfgW1hZ2Ugb3V0cHV0IHRvIHNheSB0aGF0IHRoZSByZXF1ZXN0ZWQgaW1hZ2UgaWYgbG9hZGVkLlxuICAgKiBUaGlzIG1ldGhvZCBpcyBpbnZva2VkIGJ5IHRoZSBqYXZhc2NyaXB0J3MgJ2xvYWQnIGV2ZW50IG9uIGFuIGltZyB0YWcuXG4gICAqIEBwYXJhbSBFdmVudCBldmVudCB0aGF0IHRyaWdnZXJlZCB0aGUgbG9hZFxuICAgKi9cbiAgb25JbWFnZUxvYWQoZXZlbnQ6IEV2ZW50fgB7XG4gICAgY29uc3QgbG9hZEltYWdlRGF0YTogSW1hZ2VMb2FkRXZlbnQgPSB7XG4gICAgICBzdGF0dXM6IHRydWUsXG4gICAgICBpbmRleDogZ2V0SW5kZXgodGhpcy5jdXJyZW50SW1hZ2UsIHRoaXMuaW1hZ2VzfgxcbiAgICAgIGlkOiB0aGlzLmN1cnJlbnRJbWFnZS5pZFxuICAgIH07XG5cbiAgICB0aGlzLmxvYWRJbWFnZS5lbWl0KGxvYWRJbWFnZURhdGEpO1xuXG4gICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG4gIH1cblxuICAvKipcbiAgICogTWV0aG9kIHVzZWQgYnkgSGFtbWVyanMgdG8gc3VwcG9ydCB0b3VjaCBnZXN0dXJlcyAoeW91IGNhbiBhbHNvIGludmVydCB0aGUgc3dpcGUgZGlyZWN0aW9uIHdpdGggY29uZmlnQ3VycmVudEltYWdlLmludmVydFN3aXBlfg5cbiAgICogQHBhcmFtIGFjdGlvbiBTdHJpbmcgdGhhdCByZXByZXNlbnQgdGhlIGRpcmVjdGlvbiBvZiB0aGUgc3dpcGUgYWN0aW9uLiAnc3dpcGVyaWdodCcgYnkgZGVmYXVsdC5cbiAgICovXG4gIHN3aXBlKGFjdGlvbiA9IHRoaXMuU1dJUEVfQUNUSU9OLlJJR0hUfgB7XG4gICAgc3dpdGNoIChhY3Rpb24pIHtcbiAgICAgIGNhc2UgdGhpcy5TV0lQRV9BQ1RJT04uUklHSFQ6XG4gICAgICAgIGlmICh0aGlzLmNvbmZpZ0N1cnJlbnRJbWFnZS5pbnZlcnRTd2lwZSkge1xuICAgICAgICAgIHRoaXMucHJldkltYWdlKEFjdGlvbi5TV0lQRSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5uZXh0SW1hZ2UoQWN0aW9uLlNXSVBFKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgdGhpcy5TV0lQRV9BQ1RJT04uTEVGVDpcbiAgICAgICAgaWYgKHRoaXMuY29uZmlnQ3VycmVudEltYWdlLmludmVydFN3aXBlfgB7XG4gICAgICAgICAgdGhpcy5uZXh0SW1hZ2UoQWN0aW9uLlNXSVBFKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnByZXZJbWFnZShBY3Rpb24uU1dJUEUpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgLy8gY2FzZSB0aGlzLlNXSVBFX0FDVElPTi5VUDpcbiAgICAgIC8vICAgYnJlYWs7XG4gICAgICAvLyBjYXNlIHRoaXMuU1dJUEVfQUNUSU9OLkRPV046XG4gICAgICAvLyAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBNZXRob2QgdXNlZCBpbiBgbW9kYWwtZ2FsbGVyeS5jb21wb25lbnRgIHRvIGdldCB0aGUgaW5kZXggb2YgYW4gaW1hZ2UgdG8gZGVsZXRlLlxuICAgKiBAcGFyYW0gSW1hZ2UgaW1hZ2UgdG8gZ2V0IHRoZSBpbmRleCwgb3IgdGhlIHZpc2libGUgaW1hZ2UsIGlmIG5vdCBwYXNzZWRcbiAgICogQHJldHVybnMgbnVtYmVyIHRoZSBpbmRleCBvZiB0aGUgaW1hZ2VcbiAgICovXG4gIGdldEluZGV4VG9EZWxldGUoaW1hZ2U6IEltYWdlID0gdGhpcy5jdXJyZW50SW1hZ2UpOiBudW1iZXIge1xuICAgIHJldHVybiBnZXRJbmRleChpbWFnZSwgdGhpcy5pbWFnZXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIFByaXZhdGUgbWV0aG9kIHRvIHVwZGF0ZSBib3RoIGBpc0ZpcnN0SW1hZ2VgIGFuZCBgaXNMYXN0SW1hZ2VgIGJhc2VkIG9uXG4gICAqIHRoZSBpbmRleCBvZiB0aGUgY3VycmVudCBpbWFnZS5cbiAgICogQHBhcmFtIG51bWJlciBjdXJyZW50SW5kZXggaXMgdGhlIGluZGV4IG9mIHRoZSBjdXJyZW50IGltYWdlXG4gICAqL1xuICBwcml2YXRlIGhhbmRsZUJvdW5kYXJpZXMoY3VycmVudEluZGV4OiBudW1iZXIpIHtcbiAgICBpZiAodGhpcy5pbWFnZXMubGVuZ3RoID09PSAxfgB7XG4gICAgICB0aGlzLmlzRmlyc3RJbWFnZSA9IHRydWU7XG4gICAgICB0aGlzLmlzTGFzdEltYWdlID0gdHJ1ZTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKCF0aGlzLnNsaWRlQ29uZmlnIHx8IHRoaXMuc2xpZGVDb25maWcuaW5maW5pdGUgPT09IHRydWUpIHtcbiAgICAgIC8vIGluZmluaXRlIHNsaWRpbmcgZW5hYmxlZFxuICAgICAgdGhpcy5pc0ZpcnN0SW1hZ2UgPSBmYWxzZTtcbiAgICAgIHRoaXMuaXNMYXN0SW1hZ2UgPSBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3dpdGNoIChjdXJyZW50SW5kZXgpIHtcbiAgICAgICAgY2FzZSAwOlxuICAgICAgICAgIC8vIGV4ZWN1dGUgdGhpcyBvbmx5IGlmIGluZmluaXRlIHNsaWRpbmcgaXMgZGlzYWJsZWRcbiAgICAgICAgICB0aGlzLmlzRmlyc3RJbWFnZSA9IHRydWU7XG4gICAgICAgICAgdGhpcy5pc0xhc3RJbWFnZSA9IGZhbHNlO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIHRoaXMuaW1hZ2VzLmxlbmd0aCAtIDE6XG4gICAgICAgICAgLy8gZXhlY3V0ZSB0aGlzIG9ubHkgaWYgaW5maW5pdGUgc2xpZGluZyBpcyBkaXNhYmxlZFxuICAgICAgICAgIHRoaXMuaXNGaXJzdEltYWdlID0gZmFsc2U7XG4gICAgICAgICAgdGhpcy5pc0xhc3RJbWFnZSA9IHRydWU7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgdGhpcy5pc0ZpcnN0SW1hZ2UgPSBmYWxzZTtcbiAgICAgICAgICB0aGlzLmlzTGFzdEltYWdlID0gZmFsc2U7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFByaXZhdGUgbWV0aG9kIHRvIGNoZWNrIGlmIG5leHQvcHJldiBhY3Rpb25zIHNob3VsZCBiZSBibG9ja2VkLlxuICAgKiBJdCBjaGVja3MgaWYgc2xpZGVDb25maWcuaW5maW5pdGUgPT09IGZhbHNlIGFuZCBpZiB0aGUgaW1hZ2UgaW5kZXggaXMgZXF1YWxzIHRvIHRoZSBpbnB1dCBwYXJhbWV0ZXIuXG4gICAqIElmIHllcywgaXQgcmV0dXJucyB0cnVlIHRvIHNheSB0aGF0IHNsaWRpbmcgc2hvdWxkIGJlIGJsb2NrZWQsIG90aGVyd2lzZSBub3QuXG4gICAqIEBwYXJhbSBudW1iZXIgYm91bmRhcnlJbmRleCB0aGF0IGNvdWxkIGJlIGVpdGhlciB0aGUgYmVnaW5uaW5nIGluZGV4ICgwfgBvciB0aGUgbGFzdCBpbmRleFxuICAgKiAgb2YgaW1hZ2VzICh0aGlzLmltYWdlcy5sZW5ndGggLSAxfg5cbiAgICogQHJldHVybnMgYm9vbGVhbiB0cnVlIGlmIHNsaWRlQ29uZmlnLmluZmluaXRlID09PSBmYWxzZSBhbmQgdGhlIGN1cnJlbnQgaW5kZXggaXNcbiAgICogIGVpdGhlciB0aGUgZmlyc3Qgb3IgdGhlIGxhc3Qgb25lLlxuICAgKi9cbiAgcHJpdmF0ZSBpc1ByZXZlbnRTbGlkaW5nKGJvdW5kYXJ5SW5kZXg6IG51bWJlcik6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhIXRoaXMuc2xpZGVDb25maWcgJiYgdGhpcy5zbGlkZUNvbmZpZy5pbmZpbml0ZSA9PT0gZmFsc2UgJiYgZ2V0SW5kZXgodGhpcy5jdXJyZW50SW1hZ2UsIHRoaXMuaW1hZ2VzfgA9PT0gYm91bmRhcnlJbmRleDtcbiAgfVxuXG4gIC8qKlxuICAgKiBQcml2YXRlIG1ldGhvZCB0byBnZXQgdGhlIG5leHQgaW5kZXguXG4gICAqIFRoaXMgaXMgbmVjZXNzYXJ5IGJlY2F1c2UgYXQgdGhlIGVuZCwgd2hlbiB5b3UgY2FsbCBuZXh0IGFnYWluLCB5b3UnbGwgZ28gdG8gdGhlIGZpcnN0IGltYWdlLlxuICAgKiBUaGF0IGhhcHBlbnMgYmVjYXVzZSBhbGwgbW9kYWwgaW1hZ2VzIGFyZSBzaG93biBsaWtlIGluIGEgY2lyY2xlLlxuICAgKi9cbiAgcHJpdmF0ZSBnZXROZXh0SW1hZ2UoKTogSW50ZXJuYWxMaWJJbWFnZSB7XG4gICAgY29uc3QgY3VycmVudEluZGV4OiBudW1iZXIgPSBnZXRJbmRleCh0aGlzLmN1cnJlbnRJbWFnZSwgdGhpcy5pbWFnZXMpO1xuICAgIGxldCBuZXdJbmRleCA9IDA7XG4gICAgaWYgKGN1cnJlbnRJbmRleCA+PSAwICYmIGN1cnJlbnRJbmRleCA8IHRoaXMuaW1hZ2VzLmxlbmd0aCAtIDEpIHtcbiAgICAgIG5ld0luZGV4ID0gY3VycmVudEluZGV4ICsgMTtcbiAgICB9IGVsc2Uge1xuICAgICAgbmV3SW5kZXggPSAwOyAvLyBzdGFydCBmcm9tIHRoZSBmaXJzdCBpbmRleFxuICAgIH1cbiAgICByZXR1cm4gdGhpcy5pbWFnZXNbbmV3SW5kZXhdO1xuICB9XG5cbiAgLyoqXG4gICAqIFByaXZhdGUgbWV0aG9kIHRvIGdldCB0aGUgcHJldmlvdXMgaW5kZXguXG4gICAqIFRoaXMgaXMgbmVjZXNzYXJ5IGJlY2F1c2UgYXQgaW5kZXggMCwgd2hlbiB5b3UgY2FsbCBwcmV2IGFnYWluLCB5b3UnbGwgZ28gdG8gdGhlIGxhc3QgaW1hZ2UuXG4gICAqIFRoYXQgaGFwcGVucyBiZWNhdXNlIGFsbCBtb2RhbCBpbWFnZXMgYXJlIHNob3duIGxpa2UgaW4gYSBjaXJjbGUuXG4gICAqL1xuICBwcml2YXRlIGdldFByZXZJbWFnZSgpOiBJbnRlcm5hbExpYkltYWdlIHtcbiAgICBjb25zdCBjdXJyZW50SW5kZXg6IG51bWJlciA9IGdldEluZGV4KHRoaXMuY3VycmVudEltYWdlLCB0aGlzLmltYWdlcyk7XG4gICAgbGV0IG5ld0luZGV4ID0gMDtcbiAgICBpZiAoY3VycmVudEluZGV4ID4gMCAmJiBjdXJyZW50SW5kZXggPD0gdGhpcy5pbWFnZXMubGVuZ3RoIC0gMSkge1xuICAgICAgbmV3SW5kZXggPSBjdXJyZW50SW5kZXggLSAxO1xuICAgIH0gZWxzZSB7XG4gICAgICBuZXdJbmRleCA9IHRoaXMuaW1hZ2VzLmxlbmd0aCAtIDE7IC8vIHN0YXJ0IGZyb20gdGhlIGxhc3QgaW5kZXhcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuaW1hZ2VzW25ld0luZGV4XTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQcml2YXRlIG1ldGhvZCB0byBidWlsZCBhIHRleHQgZGVzY3JpcHRpb24uXG4gICAqIFRoaXMgaXMgdXNlZCBhbHNvIHRvIGNyZWF0ZSB0aXRsZXMuXG4gICAqIEBwYXJhbSBJbWFnZSBpbWFnZSB0byBnZXQgaXRzIGRlc2NyaXB0aW9uLiBJZiBub3QgcHJvdmlkZWQgaXQgd2lsbCBiZSB0aGUgY3VycmVudCBpbWFnZS5cbiAgICogQHBhcmFtIGJvb2xlYW4gaW1hZ2VXaXRob3V0RGVzY3JpcHRpb24gaXMgYSBib29sZWFuIHRoYXQgaXQncyB0cnVlIGlmIHRoZSBpbWFnZSBoYXNuJ3QgYSAnbW9kYWwnIGRlc2NyaXB0aW9uLlxuICAgKiBAcmV0dXJucyBTdHJpbmcgZGVzY3JpcHRpb24gYnVpbHQgY29uY2F0ZW5hdGluZyBpbWFnZSBmaWVsZHMgd2l0aCBhIHNwZWNpZmljIGxvZ2ljLlxuICAgKi9cbiAgcHJpdmF0ZSBidWlsZFRleHREZXNjcmlwdGlvbihpbWFnZTogSW1hZ2UsIGltYWdlV2l0aG91dERlc2NyaXB0aW9uOiBib29sZWFuKTogc3RyaW5nIHtcbiAgICBpZiAoIXRoaXMuY29uZmlnQ3VycmVudEltYWdlIHx8ICF0aGlzLmNvbmZpZ0N1cnJlbnRJbWFnZS5kZXNjcmlwdGlvbikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdEZXNjcmlwdGlvbiBpbnB1dCBtdXN0IGJlIGEgdmFsaWQgb2JqZWN0IGltcGxlbWVudGluZyB0aGUgRGVzY3JpcHRpb24gaW50ZXJmYWNlJyk7XG4gICAgfVxuXG4gICAgLy8gSWYgY3VzdG9tRnVsbERlc2NyaXB0aW9uIHVzZSBpdCwgb3RoZXJ3aXNlIHByb2NlZWQgdG8gYnVpbGQgYSBkZXNjcmlwdGlvblxuICAgIGlmICh0aGlzLmNvbmZpZ0N1cnJlbnRJbWFnZS5kZXNjcmlwdGlvbi5jdXN0b21GdWxsRGVzY3JpcHRpb24gJiYgdGhpcy5jb25maWdDdXJyZW50SW1hZ2UuZGVzY3JpcHRpb24uY3VzdG9tRnVsbERlc2NyaXB0aW9uICE9PSAnJykge1xuICAgICAgcmV0dXJuIHRoaXMuY29uZmlnQ3VycmVudEltYWdlLmRlc2NyaXB0aW9uLmN1c3RvbUZ1bGxEZXNjcmlwdGlvbjtcbiAgICB9XG5cbiAgICBjb25zdCBjdXJyZW50SW5kZXg6IG51bWJlciA9IGdldEluZGV4KGltYWdlLCB0aGlzLmltYWdlcyk7XG4gICAgLy8gSWYgdGhlIGN1cnJlbnQgaW1hZ2UgaGFzbid0IGEgZGVzY3JpcHRpb24sXG4gICAgLy8gcHJldmVudCB0byB3cml0ZSB0aGUgJyAtICcgKG9yIHRoaXMuZGVzY3JpcHRpb24uYmVmb3JlVGV4dERlc2NyaXB0aW9uKVxuXG4gICAgY29uc3QgcHJldkRlc2NyaXB0aW9uOiBzdHJpbmcgPSB0aGlzLmNvbmZpZ0N1cnJlbnRJbWFnZS5kZXNjcmlwdGlvbi5pbWFnZVRleHQgPyB0aGlzLmNvbmZpZ0N1cnJlbnRJbWFnZS5kZXNjcmlwdGlvbi5pbWFnZVRleHQgOiAnJztcbiAgICBjb25zdCBtaWRTZXBhcmF0b3I6IHN0cmluZyA9IHRoaXMuY29uZmlnQ3VycmVudEltYWdlLmRlc2NyaXB0aW9uLm51bWJlclNlcGFyYXRvciA/IHRoaXMuY29uZmlnQ3VycmVudEltYWdlLmRlc2NyaXB0aW9uLm51bWJlclNlcGFyYXRvciA6ICcnO1xuICAgIGNvbnN0IG1pZGRsZURlc2NyaXB0aW9uOiBzdHJpbmcgPSBjdXJyZW50SW5kZXggKyAxICsgbWlkU2VwYXJhdG9yICsgdGhpcy5pbWFnZXMubGVuZ3RoO1xuXG4gICAgaWYgKGltYWdlV2l0aG91dERlc2NyaXB0aW9ufgB7XG4gICAgICByZXR1cm4gcHJldkRlc2NyaXB0aW9uICsgbWlkZGxlRGVzY3JpcHRpb247XG4gICAgfVxuXG4gICAgY29uc3QgY3VyckltZ0Rlc2NyaXB0aW9uOiBzdHJpbmcgPSBpbWFnZS5tb2RhbCAmJiBpbWFnZS5tb2RhbC5kZXNjcmlwdGlvbiA/IGltYWdlLm1vZGFsLmRlc2NyaXB0aW9uIDogJyc7XG4gICAgY29uc3QgZW5kRGVzY3JpcHRpb246IHN0cmluZyA9IHRoaXMuY29uZmlnQ3VycmVudEltYWdlLmRlc2NyaXB0aW9uLmJlZm9yZVRleHREZXNjcmlwdGlvbiArIGN1cnJJbWdEZXNjcmlwdGlvbjtcbiAgICByZXR1cm4gcHJldkRlc2NyaXB0aW9uICsgbWlkZGxlRGVzY3JpcHRpb24gKyBlbmREZXNjcmlwdGlvbjtcbiAgfVxuXG4gIC8qKlxuICAgKiBQcml2YXRlIG1ldGhvZCB0byBjYWxsIGhhbmRsZUJvdW5kYXJpZXMgd2hlbiBuZ09uQ2hhbmdlcyBpcyBjYWxsZWQuXG4gICAqL1xuICBwcml2YXRlIHVwZGF0ZUluZGV4ZXMofgB7XG4gICAgbGV0IGluZGV4OiBudW1iZXI7XG4gICAgdHJ5IHtcbiAgICAgIGluZGV4ID0gZ2V0SW5kZXgodGhpcy5jdXJyZW50SW1hZ2UsIHRoaXMuaW1hZ2VzKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ0Nhbm5vdCBnZXQgdGhlIGN1cnJlbnQgaW1hZ2UgaW5kZXggaW4gY3VycmVudC1pbWFnZScpO1xuICAgICAgdGhyb3cgZXJyO1xuICAgIH1cbiAgICBpZiAodGhpcy5pc09wZW4pIHtcbiAgICAgIHRoaXMuaGFuZGxlQm91bmRhcmllcyhpbmRleCk7XG4gICAgfVxuICB9XG59XG4iXX0=