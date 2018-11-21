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
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, HostListener, Inject, Input, Output, PLATFORM_ID, ViewChild } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { ImageModalEvent } from '../../model/image.class';
import { Action } from '../../model/action.enum';
import { KeyboardService } from '../../services/keyboard.service';
import { GalleryService } from '../../services/gallery.service';
import { CurrentImageComponent } from '../current-image/current-image.component';
import { AdvancedLayout } from '../../model/plain-gallery-config.interface';
import { fg_DEFAULT_ACCESSIBILITY_CONFIG } from '../accessibility-default';
import { getIndex } from '../../utils/image.util';
/**
 * Main Component of this library with both the plain and modal galleries.
 */
export class ModalGalleryComponent {
    /**
     * Constructor with the injection of ´KeyboardService´ and an object to support Server-Side Rendering.
     * @param {?} keyboardService
     * @param {?} galleryService
     * @param {?} platformId
     * @param {?} changeDetectorRef
     */
    constructor(keyboardService, galleryService, platformId, changeDetectorRef) {
        this.keyboardService = keyboardService;
        this.galleryService = galleryService;
        this.platformId = platformId;
        this.changeDetectorRef = changeDetectorRef;
        /**
         * Boolean to enable modal-gallery close behaviour when clicking
         * on the semi-transparent background. Enabled by default.
         */
        this.enableCloseOutside = true;
        /**
         * Object of type `SlideConfig` to init side previews and `infinite sliding`.
         */
        this.slideConfig = {
            infinite: false,
            sidePreviews: { show: true, size: { width: '100px', height: 'auto' } }
        };
        /**
         * Object of type `AccessibilityConfig` to init custom accessibility features.
         * For instance, it contains titles, alt texts, aria-labels and so on.
         */
        this.accessibilityConfig = fg_DEFAULT_ACCESSIBILITY_CONFIG;
        /**
         * Output to emit an event when the modal gallery is closed.
         */
        this.close = new EventEmitter();
        /**
         * Output to emit an event when an image is changed.
         */
        this.show = new EventEmitter();
        /**
         * Output to emit an event when the current image is the first one.
         */
        this.firstImage = new EventEmitter();
        /**
         * Output to emit an event when the current image is the last one.
         */
        this.lastImage = new EventEmitter();
        /**
         * Output to emit an event when the modal gallery is closed.
         */
        this.hasData = new EventEmitter();
        /**
         * Output to emit an event when a button is clicked, but before that the action is triggered.
         */
        this.buttonBeforeHook = new EventEmitter();
        /**
         * Output to emit an event when a button is clicked, but after that the action is triggered.
         */
        this.buttonAfterHook = new EventEmitter();
        /**
         * Boolean that it is true if the modal gallery is visible. False by default.
         */
        this.opened = false;
        /**
         * Boolean to open the modal gallery. False by default.
         */
        this.showGallery = false;
    }
    /**
     * HostListener to catch browser's back button and destroy the gallery.
     * This prevents weired behaviour about scrolling.
     * Added to fix this issue: https://github.com/fg96/angular-modal-gallery/issues/159
     * @param {?} e
     * @return {?}
     */
    onPopState(e) {
        this.closeGallery();
    }
    /**
     * Method ´ngOnInit´ to init images calling `initImages()`.
     * This is an Angular's lifecycle hook, so its called automatically by Angular itself.
     * In particular, it's called only one time!!!
     * @return {?}
     */
    ngOnInit() {
        // id is a mandatory input and must a number > 0
        if ((!this.id && this.id !== 0) || this.id < 0) {
            throw new Error(`'[id]="a number >= 0"' is a mandatory input from 6.0.0 in angular-modal-gallery.` +
                `If you are using multiple instances of this library, please be sure to use different ids`);
        }
        // call initImages to init images and to emit `hasData` event
        this.initImages();
        this.galleryServiceNavigateSubscription = this.galleryService.navigate.subscribe((payload) => {
            if (!payload) {
                return;
            }
            // if galleryId is not valid OR galleryId is related to another instance and not this one
            if (payload.galleryId === undefined || payload.galleryId < 0 || payload.galleryId !== this.id) {
                return;
            }
            // if image index is not valid
            if (payload.index < 0 || payload.index > this.images.length) {
                return;
            }
            this.showModalGallery(payload.index, true);
        });
        this.galleryServiceCloseSubscription = this.galleryService.close.subscribe((galleryId) => {
            if (galleryId < 0 || this.id !== galleryId) {
                return;
            }
            this.closeGallery(Action.NORMAL, true);
        });
        this.galleryServiceUpdateSubscription = this.galleryService.update.subscribe((payload) => {
            if (!payload) {
                return;
            }
            // if galleryId is not valid OR galleryId is related to another instance and not this one
            if (payload.galleryId === undefined || payload.galleryId < 0 || payload.galleryId !== this.id) {
                return;
            }
            // if either image index or image are not valid
            if (payload.index < 0 || payload.index > this.images.length || !payload.image) {
                return;
            }
            /** @type {?} */
            const currentIndex = getIndex(payload.image, this.images);
            this.images = this.images.map((image, index) => {
                if (index === payload.index) {
                    return /** @type {?} */ (payload.image);
                }
                return image;
            });
            if (currentIndex === payload.index) {
                this.currentImage = this.images[payload.index];
            }
            this.changeDetectorRef.markForCheck();
        });
    }
    /**
     * Method ´ngOnChanges´ to re-init images if input is changed.
     * This is an Angular's lifecycle hook, so its called automatically by Angular itself.
     * In particular, it's called before `ngOnInit()` and whenever one or more data-bound input properties change.
     * @param {?} changes `SimpleChanges` object of current and previous property values provided by Angular.
     * @return {?}
     */
    ngOnChanges(changes) {
        /** @type {?} */
        const imagesChange = changes["modalImages"];
        /** @type {?} */
        const plainGalleryConfigChange = changes["plainGalleryConfig"];
        if (imagesChange && !imagesChange.firstChange && imagesChange.previousValue !== imagesChange.currentValue) {
            this.initImages();
        }
        if (plainGalleryConfigChange) {
            /** @type {?} */
            const currPlainGalleryConfigChange = plainGalleryConfigChange.currentValue;
            if (currPlainGalleryConfigChange.layout &&
                currPlainGalleryConfigChange.layout instanceof AdvancedLayout &&
                currPlainGalleryConfigChange.layout.modalOpenerByIndex !== -1) {
                // console.log('opening modal gallery from custom plain gallery, index: ', currPlainGalleryConfigChange);
                this.showModalGallery(currPlainGalleryConfigChange.layout.modalOpenerByIndex);
            }
        }
    }
    /**
     * Method called by custom upper buttons.
     * @param {?} event
     * @return {?}
     */
    onCustomEmit(event) {
        /** @type {?} */
        const eventToEmit = this.getButtonEventToEmit(event);
        this.buttonBeforeHook.emit(eventToEmit);
        // console.log('on onCustomEmit', eventToEmit);
        this.buttonAfterHook.emit(eventToEmit);
    }
    /**
     * Method called by the full-screen upper button.
     * @param {?} event
     * @return {?}
     */
    onFullScreen(event) {
        /** @type {?} */
        const eventToEmit = this.getButtonEventToEmit(event);
        this.buttonBeforeHook.emit(eventToEmit);
        /** @type {?} */
        const doc = /** @type {?} */ (document);
        /** @type {?} */
        const docEl = /** @type {?} */ (document.documentElement);
        /** @type {?} */
        const fullscreenDisabled = !doc.fullscreenElement && !doc.webkitFullscreenElement && !doc.mozFullScreenElement && !doc.msFullscreenElement;
        if (fullscreenDisabled) {
            if (docEl.requestFullscreen) {
                docEl.requestFullscreen();
            }
            else if (docEl.webkitRequestFullscreen) {
                docEl.webkitRequestFullscreen();
            }
            else if (docEl.mozRequestFullScreen) {
                docEl.mozRequestFullScreen();
            }
            else if (docEl.msRequestFullscreen) {
                docEl.msRequestFullscreen();
            }
        }
        else {
            if (doc.exitFullscreen) {
                doc.exitFullscreen();
            }
            else if (doc.msExitFullscreen) {
                doc.msExitFullscreen();
            }
            else if (doc.mozCancelFullScreen) {
                doc.mozCancelFullScreen();
            }
            else if (doc.webkitExitFullscreen) {
                doc.webkitExitFullscreen();
            }
        }
        this.buttonAfterHook.emit(eventToEmit);
    }
    /**
     * Method called by the delete upper button.
     * @param {?} event
     * @return {?}
     */
    onDelete(event) {
        /** @type {?} */
        const eventToEmit = this.getButtonEventToEmit(event);
        this.buttonBeforeHook.emit(eventToEmit);
        if (this.images.length === 1) {
            this.closeGallery();
        }
        /** @type {?} */
        const imageIndexToDelete = this.currentImageComponent.getIndexToDelete(event.image);
        if (imageIndexToDelete === this.images.length - 1) {
            // last image
            this.currentImageComponent.prevImage();
        }
        else {
            this.currentImageComponent.nextImage();
        }
        this.buttonAfterHook.emit(eventToEmit);
    }
    /**
     * Method called by the navigate upper button.
     * @param {?} event
     * @return {?}
     */
    onNavigate(event) {
        /** @type {?} */
        const eventToEmit = this.getButtonEventToEmit(event);
        this.buttonBeforeHook.emit(eventToEmit);
        // To support SSR
        if (isPlatformBrowser(this.platformId)) {
            if (eventToEmit.image && eventToEmit.image.modal.extUrl) {
                // where I should open this link? The current tab or another one?
                if (eventToEmit.button && eventToEmit.button.extUrlInNewTab) {
                    window.open(eventToEmit.image.modal.extUrl, '_blank');
                }
                else {
                    window.location.href = eventToEmit.image.modal.extUrl;
                }
            }
        }
        this.buttonAfterHook.emit(eventToEmit);
    }
    /**
     * Method called by the download upper button.
     * @param {?} event
     * @return {?}
     */
    onDownload(event) {
        /** @type {?} */
        const eventToEmit = this.getButtonEventToEmit(event);
        this.buttonBeforeHook.emit(eventToEmit);
        this.downloadImage();
        this.buttonAfterHook.emit(eventToEmit);
    }
    /**
     * Method called by the close upper button.
     * @param {?} event
     * @param {?=} action
     * @return {?}
     */
    onCloseGallery(event, action = Action.NORMAL) {
        /** @type {?} */
        const eventToEmit = this.getButtonEventToEmit(event);
        this.buttonBeforeHook.emit(eventToEmit);
        this.closeGallery(action);
        this.buttonAfterHook.emit(eventToEmit);
    }
    /**
     * Method to close the modal gallery specifying the action.
     * It also reset the `keyboardService` to prevent multiple listeners.
     * @param {?=} action
     * @param {?=} isCalledByService
     * @return {?}
     */
    closeGallery(action = Action.NORMAL, isCalledByService = false) {
        this.close.emit(new ImageModalEvent(action, true));
        this.opened = false;
        this.keyboardService.reset();
        // shows scrollbar
        document.body.style.overflow = 'visible';
        if (isCalledByService) {
            // the following is required, otherwise the view will not be updated
            // this happens only if called by gallery.service
            this.changeDetectorRef.markForCheck();
        }
    }
    /**
     * Method called when you click on an image of your plain (or inline) gallery.
     * @param {?} index
     * @return {?}
     */
    onShowModalGallery(index) {
        this.showModalGallery(index);
    }
    /**
     * Method to show the modal gallery displaying the image with
     * the index specified as input parameter.
     * It will also register a new `keyboardService` to catch keyboard's events to download the current
     * image with keyboard's shortcuts. This service, will be removed either when modal gallery component
     * will be destroyed or when the gallery is closed invoking the `closeGallery` method.
     * @param {?} index
     * @param {?=} isCalledByService
     * @return {?}
     */
    showModalGallery(index, isCalledByService = false) {
        // hides scrollbar
        document.body.style.overflow = 'hidden';
        this.keyboardService.add((event, combo) => {
            if (event.preventDefault) {
                event.preventDefault();
            }
            else {
                // internet explorer
                event.returnValue = false;
            }
            this.downloadImage();
        });
        this.opened = true;
        this.currentImage = this.images[index];
        // emit a new ImageModalEvent with the index of the current image
        this.show.emit(new ImageModalEvent(Action.LOAD, index + 1));
        if (isCalledByService) {
            // the following is required, otherwise the view will not be updated
            // this happens only if called by gallery.service
            this.changeDetectorRef.markForCheck();
        }
    }
    /**
     * Method called when the image changes and used to update the `currentImage` object.
     * @param {?} event
     * @return {?}
     */
    onChangeCurrentImage(event) {
        /** @type {?} */
        const newIndex = /** @type {?} */ (event.result);
        // TODO add validation
        this.currentImage = this.images[newIndex];
        // emit first/last event based on newIndex value
        this.emitBoundaryEvent(event.action, newIndex);
        // emit current visible image index
        this.show.emit(new ImageModalEvent(event.action, newIndex + 1));
    }
    /**
     * @return {?}
     */
    isPlainGalleryVisible() {
        if (this.plainGalleryConfig && this.plainGalleryConfig.layout && this.plainGalleryConfig.layout instanceof AdvancedLayout) {
            return !this.plainGalleryConfig.layout.hideDefaultPlainGallery;
        }
        return true;
    }
    /**
     * Method called when you click 'outside' (i.e. on the semi-transparent background)
     * to close the modal gallery if `enableCloseOutside` is true.
     * @param {?} event
     * @return {?}
     */
    onClickOutside(event) {
        if (event && this.enableCloseOutside) {
            this.closeGallery(Action.CLICK);
        }
    }
    /**
     * Method called when an image is loaded and the loading spinner has gone.
     * It sets the previouslyLoaded flag inside the Image to hide loading spinner when displayed again.
     * @param {?} event
     * @return {?}
     */
    onImageLoad(event) {
        // console.log('modal-image onImageLoad', event);
        // console.log('modal-image onImageLoad images before', this.images);
        // sets as previously loaded the image with index specified by `event.status`
        this.images = this.images.map((img) => {
            if (img && img.id === event.id) {
                return Object.assign({}, img, { previouslyLoaded: event.status });
            }
            return img;
        });
        // console.log('modal-image onImageLoad images after', this.images);
    }
    /**
     * Method called when a dot is clicked and used to update the current image.
     * @param {?} index
     * @return {?}
     */
    onClickDot(index) {
        this.currentImage = this.images[index];
    }
    /**
     * Method called when an image preview is clicked and used to update the current image.
     * @param {?} preview
     * @return {?}
     */
    onClickPreview(preview) {
        /** @type {?} */
        const imageFound = this.images.find((img) => img.id === preview.id);
        if (!!imageFound) {
            this.currentImage = /** @type {?} */ (imageFound);
        }
    }
    /**
     * Method to download the current image, only if `downloadable` is true.
     * It contains also a logic to enable downloading features also for IE11.
     * @return {?}
     */
    downloadImage() {
        if (this.currentImageConfig && !this.currentImageConfig.downloadable) {
            return;
        }
        // If IE11 or Microsoft Edge use msSaveBlob(...)
        if (this.isIEorEdge()) {
            // I cannot use fetch API because IE11 doesn't support it,
            // so I have to switch to XMLHttpRequest
            this.downloadImageOnlyIEorEdge();
        }
        else {
            // for all other browsers
            this.downloadImageAllBrowsers();
        }
    }
    /**
     * Method to cleanup resources. In fact, this will reset keyboard's service.
     * This is an Angular's lifecycle hook that is called when this component is destroyed.
     * @return {?}
     */
    ngOnDestroy() {
        this.keyboardService.reset();
        if (this.galleryServiceNavigateSubscription) {
            this.galleryServiceNavigateSubscription.unsubscribe();
        }
        if (this.galleryServiceCloseSubscription) {
            this.galleryServiceCloseSubscription.unsubscribe();
        }
        if (this.galleryServiceUpdateSubscription) {
            this.galleryServiceUpdateSubscription.unsubscribe();
        }
    }
    /**
     * Private method to download the current image for all browsers except for IE11.
     * @return {?}
     */
    downloadImageAllBrowsers() {
        /** @type {?} */
        const link = document.createElement('a');
        link.href = /** @type {?} */ (this.currentImage.modal.img);
        link.setAttribute('download', this.getFileName(this.currentImage));
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
    /**
     * Private method to download the current image only for IE11 using
     * custom javascript's methods available only on IE.
     * @return {?}
     */
    downloadImageOnlyIEorEdge() {
        if (isPlatformBrowser(this.platformId)) {
            /** @type {?} */
            const req = new XMLHttpRequest();
            req.open('GET', /** @type {?} */ (this.currentImage.modal.img), true);
            req.responseType = 'arraybuffer';
            req.onload = event => {
                /** @type {?} */
                const blob = new Blob([req.response], { type: 'image/png' });
                window.navigator.msSaveBlob(blob, this.getFileName(this.currentImage));
            };
            req.send();
        }
    }
    /**
     * Private method to get the `ButtonEvent` to emit, merging the input `ButtonEvent`
     * with the current image.
     * @param {?} event
     * @return {?} ButtonEvent event payload with the current image included
     */
    getButtonEventToEmit(event) {
        return Object.assign(event, { image: this.currentImage });
    }
    /**
     * Private method to get the file name from an input path.
     * This is used either to get the image's name from its path or from the Image itself,
     * if specified as 'downloadFileName' by the user.
     * @param {?} image
     * @return {?} string string file name of the input image.
     */
    getFileName(image) {
        if (!image.modal.downloadFileName || image.modal.downloadFileName.length === 0) {
            return (/** @type {?} */ (this.currentImage.modal.img)).replace(/^.*[\\\/]/, '');
        }
        else {
            return image.modal.downloadFileName;
        }
    }
    /**
     * Private method to initialize `images` as array of `Image`s.
     * Also, it will emit ImageowmodaModalEvent to say that images are loaded.
     * @return {?}
     */
    initImages() {
        this.images = /** @type {?} */ (this.modalImages);
        this.hasData.emit(new ImageModalEvent(Action.LOAD, true));
        this.showGallery = this.images.length > 0;
    }
    /**
     * Private method to emit events when either the last or the first image are visible.
     * @param {?} action Enum of type Action that represents the source of the event that changed the
     *  current image to the first one or the last one.
     * @param {?} indexToCheck is the index number of the image (the first or the last one).
     * @return {?}
     */
    emitBoundaryEvent(action, indexToCheck) {
        // to emit first/last event
        switch (indexToCheck) {
            case 0:
                this.firstImage.emit(new ImageModalEvent(action, true));
                break;
            case this.images.length - 1:
                this.lastImage.emit(new ImageModalEvent(action, true));
                break;
        }
    }
    /**
     * Private method to check if this library is running on
     * Microsoft browsers or not (i.e. it detects both IE11 and Edge)
     * supporting also Server-Side Rendering.
     * Inspired by https://msdn.microsoft.com/it-it/library/hh779016(v=vs.85).aspx
     * @return {?} any the result
     */
    isIEorEdge() {
        if (isPlatformBrowser(this.platformId)) {
            // if both Blob constructor and msSaveOrOpenBlob are supported by the current browser
            return window.Blob && window.navigator.msSaveOrOpenBlob;
        }
        if (isPlatformServer(this.platformId)) {
            // server only
            return true;
        }
    }
}
ModalGalleryComponent.decorators = [
    { type: Component, args: [{
                selector: 'fg-modal-gallery',
                exportAs: 'fgModalGallery',
                template: "<fg-plain-gallery [images]=\"images\"\n                  [showGallery]=\"showGallery && isPlainGalleryVisible()\"\n                  [plainGalleryConfig]=\"plainGalleryConfig\"\n                  [accessibilityConfig]=\"accessibilityConfig\"\n                  (show)=\"onShowModalGallery($event)\"></fg-plain-gallery>\n\n<fg-background [isOpen]=\"opened\"\n               [accessibilityConfig]=\"accessibilityConfig\"></fg-background>\n\n<div id=\"modal-gallery-wrapper\" *ngIf=\"opened\"\n     [attr.aria-label]=\"accessibilityConfig.modalGalleryContentAriaLabel\"\n     [title]=\"accessibilityConfig.modalGalleryContentTitle\"\n     fgClickOutside [clickOutsideEnable]=\"enableCloseOutside\"\n     (clickOutside)=\"onClickOutside($event)\">\n\n  <div id=\"flex-min-height-ie-fix\">\n    <div id=\"modal-gallery-container\">\n\n      <fg-upper-buttons [currentImage]=\"currentImage\"\n                        [buttonsConfig]=\"buttonsConfig\"\n                        (delete)=\"onDelete($event)\"\n                        (navigate)=\"onNavigate($event)\"\n                        (download)=\"onDownload($event)\"\n                        (close)=\"onCloseGallery($event)\"\n                        (fullscreen)=\"onFullScreen($event)\"\n                        (customEmit)=\"onCustomEmit($event)\"></fg-upper-buttons>\n\n      <fg-current-image [images]=\"images\"\n                        [currentImage]=\"currentImage\"\n                        [isOpen]=\"opened\"\n                        [slideConfig]=\"slideConfig\"\n                        [keyboardConfig]=\"keyboardConfig\"\n                        [accessibilityConfig]=\"accessibilityConfig\"\n                        [currentImageConfig]=\"currentImageConfig\"\n                        (loadImage)=\"onImageLoad($event)\"\n                        (changeImage)=\"onChangeCurrentImage($event)\"\n                        (close)=\"onCloseGallery($event)\"></fg-current-image>\n\n      <div>\n        <fg-dots [images]=\"images\"\n                 [currentImage]=\"currentImage\"\n                 [dotsConfig]=\"dotsConfig\"\n                 [accessibilityConfig]=\"accessibilityConfig\"\n                 (clickDot)=\"onClickDot($event)\"></fg-dots>\n\n        <fg-previews [images]=\"images\"\n                     [currentImage]=\"currentImage\"\n                     [previewConfig]=\"previewConfig\"\n                     [accessibilityConfig]=\"accessibilityConfig\"\n                     (clickPreview)=\"onClickPreview($event)\"></fg-previews>\n      </div>\n    </div>\n  </div>\n</div>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: ["#modal-gallery-wrapper{position:fixed;top:0;left:0;width:100vw;height:100vh;z-index:10000}#flex-min-height-ie-fix{display:flex;flex-direction:column;justify-content:center}#modal-gallery-container{display:flex;flex-direction:column;justify-content:space-between;min-height:100vh}"]
            }] }
];
/** @nocollapse */
ModalGalleryComponent.ctorParameters = () => [
    { type: KeyboardService },
    { type: GalleryService },
    { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] },
    { type: ChangeDetectorRef }
];
ModalGalleryComponent.propDecorators = {
    id: [{ type: Input }],
    modalImages: [{ type: Input }],
    buttonsConfig: [{ type: Input }],
    enableCloseOutside: [{ type: Input }],
    currentImageConfig: [{ type: Input }],
    dotsConfig: [{ type: Input }],
    previewConfig: [{ type: Input }],
    slideConfig: [{ type: Input }],
    accessibilityConfig: [{ type: Input }],
    keyboardConfig: [{ type: Input }],
    plainGalleryConfig: [{ type: Input }],
    close: [{ type: Output }],
    show: [{ type: Output }],
    firstImage: [{ type: Output }],
    lastImage: [{ type: Output }],
    hasData: [{ type: Output }],
    buttonBeforeHook: [{ type: Output }],
    buttonAfterHook: [{ type: Output }],
    currentImageComponent: [{ type: ViewChild, args: [CurrentImageComponent,] }],
    onPopState: [{ type: HostListener, args: ['window:popstate', ['$event'],] }]
};
if (false) {
    /**
     * Unique id (>=0) of the current instance of this library. This is useful when you are using
     * the service to call modal gallery without open it manually.
     * Right now is optional, but in upcoming major releases will be mandatory!!!
     * @type {?}
     */
    ModalGalleryComponent.prototype.id;
    /**
     * Array of `Image` that represent the model of this library with all images, thumbs and so on.
     * @type {?}
     */
    ModalGalleryComponent.prototype.modalImages;
    /**
     * Object of type `ButtonsConfig` to show/hide buttons.
     * @type {?}
     */
    ModalGalleryComponent.prototype.buttonsConfig;
    /**
     * Boolean to enable modal-gallery close behaviour when clicking
     * on the semi-transparent background. Enabled by default.
     * @type {?}
     */
    ModalGalleryComponent.prototype.enableCloseOutside;
    /**
     * Interface to configure current image in modal-gallery.
     * For instance you can disable navigation on click on current image (enabled by default).
     * @type {?}
     */
    ModalGalleryComponent.prototype.currentImageConfig;
    /**
     * Object of type `DotsConfig` to init DotsComponent's features.
     * For instance, it contains a param to show/hide dots.
     * @type {?}
     */
    ModalGalleryComponent.prototype.dotsConfig;
    /**
     * Object of type `PreviewConfig` to init PreviewsComponent's features.
     * For instance, it contains a param to show/hide previews.
     * @type {?}
     */
    ModalGalleryComponent.prototype.previewConfig;
    /**
     * Object of type `SlideConfig` to init side previews and `infinite sliding`.
     * @type {?}
     */
    ModalGalleryComponent.prototype.slideConfig;
    /**
     * Object of type `AccessibilityConfig` to init custom accessibility features.
     * For instance, it contains titles, alt texts, aria-labels and so on.
     * @type {?}
     */
    ModalGalleryComponent.prototype.accessibilityConfig;
    /**
     * Object of type `KeyboardConfig` to assign custom keys to ESC, RIGHT and LEFT keyboard's actions.
     * @type {?}
     */
    ModalGalleryComponent.prototype.keyboardConfig;
    /**
     * Object of type `PlainGalleryConfig` to configure the plain gallery.
     * @type {?}
     */
    ModalGalleryComponent.prototype.plainGalleryConfig;
    /**
     * Output to emit an event when the modal gallery is closed.
     * @type {?}
     */
    ModalGalleryComponent.prototype.close;
    /**
     * Output to emit an event when an image is changed.
     * @type {?}
     */
    ModalGalleryComponent.prototype.show;
    /**
     * Output to emit an event when the current image is the first one.
     * @type {?}
     */
    ModalGalleryComponent.prototype.firstImage;
    /**
     * Output to emit an event when the current image is the last one.
     * @type {?}
     */
    ModalGalleryComponent.prototype.lastImage;
    /**
     * Output to emit an event when the modal gallery is closed.
     * @type {?}
     */
    ModalGalleryComponent.prototype.hasData;
    /**
     * Output to emit an event when a button is clicked, but before that the action is triggered.
     * @type {?}
     */
    ModalGalleryComponent.prototype.buttonBeforeHook;
    /**
     * Output to emit an event when a button is clicked, but after that the action is triggered.
     * @type {?}
     */
    ModalGalleryComponent.prototype.buttonAfterHook;
    /**
     * Reference to the CurrentImageComponent to invoke methods on it.
     * @type {?}
     */
    ModalGalleryComponent.prototype.currentImageComponent;
    /**
     * Boolean that it is true if the modal gallery is visible. False by default.
     * @type {?}
     */
    ModalGalleryComponent.prototype.opened;
    /**
     * Boolean to open the modal gallery. False by default.
     * @type {?}
     */
    ModalGalleryComponent.prototype.showGallery;
    /**
     * Array of `InternalLibImage` representing the model of this library with all images, thumbs and so on.
     * @type {?}
     */
    ModalGalleryComponent.prototype.images;
    /**
     * `Image` that is visible right now.
     * @type {?}
     */
    ModalGalleryComponent.prototype.currentImage;
    /** @type {?} */
    ModalGalleryComponent.prototype.galleryServiceNavigateSubscription;
    /** @type {?} */
    ModalGalleryComponent.prototype.galleryServiceCloseSubscription;
    /** @type {?} */
    ModalGalleryComponent.prototype.galleryServiceUpdateSubscription;
    /** @type {?} */
    ModalGalleryComponent.prototype.keyboardService;
    /** @type {?} */
    ModalGalleryComponent.prototype.galleryService;
    /** @type {?} */
    ModalGalleryComponent.prototype.platformId;
    /** @type {?} */
    ModalGalleryComponent.prototype.changeDetectorRef;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwtZ2FsbGVyeS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9tb2RhbC1hbmd1bGFyLWdhbGxlcnkvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9tb2RhbC1nYWxsZXJ5L21vZGFsLWdhbGxlcnkuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXdCQSxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsWUFBWSxFQUNaLFlBQVfgRUFDWixNQUFNLEVBQ04sS0FBSyxFQUlMLE1BQU0sRUFDTixXQUFXLEVBR1gsU0FBUyxFQUNWLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBR3RFLE9BQU8sRUFBUyxlQUFlLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUNqRSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFLakQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ2xFLE9BQU8sRUFBRSxjQUFjLEVBQTBCLE1BQU0sZ0NBQWdDLENBQUM7QUFFeEYsT0FBTyxFQUFFLHFCQUFxQixFQUFrQixNQUFNLDBDQUEwQyxDQUFDO0FBRWpHLE9BQU8sRUFBRSxjQUFjLEVBQXNCLE1BQU0sNENBQTRDLENBQUM7QUFDaEcsT0FBTyxFQUFFLCtCQUErQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFHM0UsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLHdCQUF3QixDQUFDOzs7O0FBWWxELE1BQU07Ozs7Ozs7O0lBK0lKLFlBQ1UsaUJBQ0EsZ0JBQ3FCLFVBQWtCLEVBQ3ZDO1FBSEEsb0JBQWUsR0FBZixlQUFlO1FBQ2YsbUJBQWMsR0FBZCxjQUFjO1FBQ08sZUFBVSxHQUFWLFVBQVUsQ0FBUTtRQUN2QyxzQkFBaUIsR0FBakIsaUJBQWlCOzs7OztrQ0E1SE4sSUFBSTs7OzsyQkF1QkU7WUFDekIsUUFBUSxFQUFFLEtBQUs7WUFDZixZQUFZLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUfgRUFBRSxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxFQUFFO1NBQ3ZFOzs7OzttQ0FNMEMsK0JBQStCOzs7O3FCQWdCbkMsSUFBSSxZQUFZLEVBQW1COzs7O29CQUtwQyxJQUFJLFlBQVfgRUFBbUI7Ozs7MEJBSzdCLElBQUfgWUFBWSxFQUFtQjs7Ozt5QkFLcEMsSUFBSSxZQUFZLEVBQW1COzs7O3VCQUtyQyxJQUFJLFlBQVfgRUFBbUI7Ozs7Z0NBSzlCLElBQUfgWUFBWSxFQUFlOzs7OytCQUtoQyxJQUFJLFlBQVfgRUFBZTs7OztzQkFXbkUsS0FBSzs7OzsyQkFJQSxLQUFLO0tBZ0NmOzs7Ozs7OztJQVpKLFVBQVUsQ0FBQyxDQUFRO1FBQ2pCLElBQUfgQ0FBQyxZQUFZLEVBQUUsQ0FBQztLQUNyQjs7Ozs7OztJQWlCRCxRQUFROztRQUVOLElBQUfgQ0FBQyxDQUFDLElBQUfgQ0FBQyxFQUFFLElBQUfgSUFBSSxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsRUFBRSxHQUFHLENBQUMsRUFBRTtZQUM5QyxNQUFNLElBQUfgS0FBSyxDQUNiLGtGQUFrRjtnQkFDaEYsMEZBQTBGLENBQzdGLENBQUM7U0FDSDs7UUFHRCxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7UUFFbEIsSUFBSSxDQUFDLGtDQUFrQyxHQUFHLElBQUfgQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLE9BQStCLEVBQUUsRUFBRTtZQUNuSCxJQUFJLENBQUMsT0FBTyxFQUFFO2dCQUNaLE9BQU87YUFDUjs7WUFFRCxJQUFJLE9BQU8sQ0FBQyxTQUFTLEtBQUssU0FBUyxJQUFJLE9BQU8sQ0FBQyxTQUFTLEdBQUcsQ0FBQyxJQUFJLE9BQU8sQ0FBQyxTQUFTLEtBQUssSUFBSSxDQUFDLEVBQUUsRUFBRTtnQkFDN0YsT0FBTzthQUNSOztZQUVELElBQUfgT0FBTyxDQUFDLEtBQUssR0FBRyxDQUFDLElBQUfgT0FBTyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRTtnQkFDM0QsT0FBTzthQUNSO1lBQ0QsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDNUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLCtCQUErQixHQUFHLElBQUfgQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDLFNBQWlCLEVBQUUsRUFBRTtZQUMvRixJQUFJLFNBQVMsR0FBRyxDQUFDLElBQUfgSUFBSSxDQUFDLEVBQUUsS0FBSyxTQUFTLEVBQUU7Z0JBQzFDLE9BQU87YUFDUjtZQUNELElBQUfgQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztTQUN4QyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsZ0NBQWdDLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsT0FBK0IsRUFBRSxFQUFFO1lBQy9HLElBQUfgQ0FBQyxPQUFPLEVBQUU7Z0JBQ1osT0FBTzthQUNSOztZQUVELElBQUfgT0FBTyxDQUFDLFNBQVMsS0FBSyxTQUFTLElBQUfgT0FBTyxDQUFDLFNBQVMsR0FBRyxDQUFDLElBQUfgT0FBTyxDQUFDLFNBQVMsS0FBSyxJQUFJLENBQUMsRUFBRSxFQUFFO2dCQUM3RixPQUFPO2FBQ1I7O1lBRUQsSUFBSSxPQUFPLENBQUMsS0FBSyxHQUFHLENBQUMsSUFBSSxPQUFPLENBQUMsS0FBSyxHQUFHLElBQUfgQ0FBQyxNQUFNLENBQUMsTUFBTSxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRTtnQkFDN0UsT0FBTzthQUNSOztZQUNELE1BQU0sWUFBWSxHQUFXLFFBQVEsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLElBQUfgQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNsRSxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUfgQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBdUIsRUFBRSxLQUFhLEVBQUUsRUFBRTtnQkFDdkUsSUFBSSxLQUFLLEtBQUssT0FBTyxDQUFDLEtBQUssRUFBRTtvQkFDM0IseUJBQXlCLE9BQU8sQ0FBQyxLQUFLLEVBQUM7aUJBQ3hDO2dCQUNELE9BQU8sS0FBSyxDQUFDO2FBQ2QsQ0FBQyxDQUFDO1lBQ0gsSUFBSSxZQUFZLEtBQUssT0FBTyxDQUFDLEtBQUssRUFBRTtnQkFDbEMsSUFBSSxDQUFDLFlBQVfgR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUNoRDtZQUNELElBQUfgQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLEVBQUUsQ0FBQztTQUN2QyxDQUFDLENBQUM7S0FDSjs7Ozs7Ozs7SUFRRCxXQUFXLENBQUMsT0FBc0I7O1FBQ2hDLE1BQU0sWUFBWSxHQUFpQixPQUFPLGdCQUFhOztRQUN2RCxNQUFNLHdCQUF3QixHQUFpQixPQUFPLHVCQUFvQjtRQUUxRSxJQUFJLFlBQVfgSUFBSSxDQUFDLFlBQVfgQ0FBQyxXQUFXLElBQUfgWUFBWSxDQUFDLGFBQWEsS0FBSyxZQUFZLENBQUMsWUFBWSxFQUFFO1lBQ3pHLElBQUfgQ0FBQyxVQUFVLEVBQUUsQ0FBQztTQUNuQjtRQUVELElBQUfgd0JBQXdCLEVBQUU7O1lBRTVCLE1BQU0sNEJBQTRCLEdBQXVCLHdCQUF3QixDQUFDLFlBQVfgQ0FBQztZQUMvRixJQUNFLDRCQUE0QixDQUFDLE1BQU07Z0JBQ25DLDRCQUE0QixDQUFDLE1BQU0sWUFBWSxjQUFjO2dCQUM3RCw0QkFBNEIsQ0FBQyxNQUFNLENBQUMsa0JBQWtCLEtBQUssQ0FBQyxDQUFDLEVBQzdEOztnQkFFQSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsNEJBQTRCLENBQUMsTUFBTSxDQUFDLGtCQUFrQixDQUFDLENBQUM7YUFDL0U7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QU0sR0FBRyxJQUFJLENBQUM7UUFDbkIsSUFBSSxDQUFDLFlBQVfgR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDOztRQUd2QyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUfgQ0FBQyxJQUFJLGVBQWUsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRTVELElBQUfgaUJBQWlCLEVBQUU7OztZQUdyQixJQUFJLENBQUMsaUJBQWlCLENBQUMsWUFBWSxFQUFFLENBQUM7U0FDdkM7S0FDRjs7Ozs7O0lBTUQsb0JBQW9CLENBQUMsS0FBc0I7O1FBQ3pDLE1BQU0sUUFBUSxxQkFBbUIsS0FBSyxDQUFDLE1BQU0sRUFBQzs7UUFHOUMsSUFBSSxDQUFDLFlBQVfgR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDOztRQUcxQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQzs7UUFHL0MsSUFBSSxDQUFDLElBQUfgQ0FBQyxJQUFJLENBQUMsSUFBSSxlQUFlLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxRQUFRLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUNqRTs7OztJQUVELHFCQUFxQjtRQUNuQixJQUFJLElBQUfgQ0FBQyxrQkFBa0IsSUFBSSxJQUFJLENBQUMsa0JBQWtCLENBQUMsTUFBTSxJQUFJLElBQUfgQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLFlBQVfgY0FBYyxFQUFFO1lBQ3pILE9BQU8sQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsTUFBTSxDQUFDLHVCQUF1QixDQUFDO1NBQ2hFO1FBQ0QsT0FBTyxJQUFJLENBQUM7S0FDYjs7Ozs7OztJQU9ELGNBQWMsQ0FBQyxLQUFjO1FBQzNCLElBQUfgS0FBSyxJQUFJLElBQUfgQ0FBQyxrQkFBa0IsRUFBRTtZQUNwQyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNqQztLQUNGOzs7Ozs7O0lBT0QsV0FBVyxDQUFDLEtBQXFCOzs7O1FBSy9CLElBQUfgQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFxQixFQUFFLEVBQUU7WUFDdEQsSUFBSSxHQUFHLElBQUfgR0FBRyxDQUFDLEVBQUUsS0FBSyxLQUFLLENBQUMsRUFBRSxFQUFFO2dCQUM5QixPQUFPLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLGdCQUFnQixFQUFFLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO2FBQ25FO1lBQ0QsT0FBTyxHQUFHLENBQUM7U0FDWixDQUFDLENBQUM7O0tBR0o7Ozs7OztJQU1ELFVBQVUsQ0FBQyxLQUFhO1FBQ3RCLElBQUfgQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUN4Qzs7Ozs7O0lBTUQsY0FBYyxDQUFDLE9BQWM7O1FBQzNCLE1BQU0sVUFBVSxHQUFpQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUfgQ0FBQyxDQUFDLEdBQXFCLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEtBQUssT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3BILElBQUfgQ0FBQyxDQUFDLFVBQVUsRUFBRTtZQUNoQixJQUFJLENBQUMsWUFBWSxxQkFBcUIsVUFBVSxDQUFBLENBQUM7U0FDbEQ7S0FDRjs7Ozs7O0lBTUQsYUFBYTtRQUNYLElBQUfgSUFBSSxDQUFDLGtCQUFrQixJQUFJLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFlBQVfgRUFBRTtZQUNwRSxPQUFPO1NBQ1I7O1FBRUQsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFLEVBQUU7OztZQUdyQixJQUFJLENBQUMseUJBQXlCLEVBQUUsQ0FBQztTQUNsQzthQUFNOztZQUVMLElBQUfgQ0FBQyx3QkFBd0IsRUFBRSxDQUFDO1NBQ2pDO0tBQ0Y7Ozs7OztJQU1ELFdBQVc7UUFDVCxJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBRTdCLElBQUfgSUFBSSxDQUFDLGtDQUFrQyxFQUFFO1lBQzNDLElBQUfgQ0FBQyxrQ0FBa0MsQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUN2RDtRQUNELElBQUfgSUFBSSxDQUFDLCtCQUErQixFQUFFO1lBQ3hDLElBQUfgQ0FBQywrQkFBK0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUNwRDtRQUNELElBQUfgSUFBSSxDQUFDLGdDQUFnQyxFQUFFO1lBQ3pDLElBQUfgQ0FBQyxnQ0FBZ0MsQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUNyRDtLQUNGOzs7OztJQUtPLHdCQUF3Qjs7UUFDOUIsTUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN6QyxJQUFJLENBQUMsSUFBSSxxQkFBVyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUEsQ0FBQztRQUNoRCxJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUfgQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO1FBQ25FLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUfgQ0FBQyxDQUFDO1FBQ2hDLElBQUfgQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNiLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUfgQ0FBQyxDQUFDOzs7Ozs7O0lBTzFCLHlCQUF5QjtRQUMvQixJQUFJLGlCQUFpQixDQUFDLElBQUfgQ0FBQyxVQUFVLENBQUMsRUFBRTs7WUFDdEMsTUFBTSxHQUFHLEdBQUcsSUFBSSxjQUFjLEVBQUUsQ0FBQztZQUNqQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssb0JBQVUsSUFBSSxDQUFDLFlBQVfgQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFFLElBQUfgQ0FBQyxDQUFDO1lBQzNELEdBQUcsQ0FBQyxZQUFZLEdBQUcsYUFBYSxDQUFDO1lBQ2pDLEdBQUcsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDLEVBQUU7O2dCQUNuQixNQUFNLElBQUfgR0FBRyxJQUFJLElBQUfgQ0FBQyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsRUFBRSxFQUFFLElBQUfgRUFBRSxXQUFXLEVBQUUsQ0FBQyxDQUFDO2dCQUM3RCxNQUFNLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQzthQUN4RSxDQUFDO1lBQ0YsR0FBRyxDQUFDLElBQUfgRUFBRSxDQUFDO1NBQ1o7Ozs7Ozs7O0lBU0ssb0JBQW9CLENBQUMsS0FBa0I7UUFDN0MsT0FBTyxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQzs7Ozs7Ozs7O0lBVXBELFdBQVcsQ0FBQyxLQUFZO1FBQzlCLElBQUfgQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLGdCQUFnQixJQUFJLEtBQUssQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtZQUM5RSxPQUFPLG1CQUFTLElBQUfgQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBQyxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsRUFBRSxDQUFDLENBQUM7U0FDdkU7YUFBTTtZQUNMLE9BQU8sS0FBSyxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQztTQUNyQzs7Ozs7OztJQU9LLFVBQVU7UUFDaEIsSUFBSSxDQUFDLE1BQU0scUJBQXVCLElBQUfgQ0FBQyxXQUFXLENBQUEsQ0FBQztRQUNuRCxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUfgQ0FBQyxJQUFJLGVBQWUsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLElBQUfgQ0FBQyxDQUFDLENBQUM7UUFDMUQsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7Ozs7Ozs7OztJQVNwQyxpQkFBaUIsQ0FBQyxNQUFjLEVBQUUsWUFBb0I7O1FBRTVELFFBQVEsWUFBWSxFQUFFO1lBQ3BCLEtBQUssQ0FBQztnQkFDSixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUfgQ0FBQyxJQUFJLGVBQWUsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDeEQsTUFBTTtZQUNSLEtBQUssSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQztnQkFDekIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxlQUFlLENBQUMsTUFBTSxFQUFFLElBQUfgQ0FBQyxDQUFDLENBQUM7Z0JBQ3ZELE1BQU07U0FDVDs7Ozs7Ozs7O0lBVUssVUFBVTtRQUNoQixJQUFJLGlCQUFpQixDQUFDLElBQUfgQ0FBQyxVQUFVLENBQUMsRUFBRTs7WUFFdEMsT0FBTyxNQUFNLENBQUMsSUFBSSxJQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLENBQUM7U0FDekQ7UUFDRCxJQUFJLGdCQUFnQixDQUFDLElBQUfgQ0FBQyxVQUFVLENBQUMsRUFBRTs7WUFFckMsT0FBTyxJQUFJLENBQUM7U0FDYjs7OztZQWxxQkosU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxrQkFBa0I7Z0JBQzVCLFFBQVEsRUFBRSxnQkFBZ0I7Z0JBRTFCLGdoRkFBaUM7Z0JBQ2pDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOzthQUNoRDs7OztZQXBCUSxlQUFlO1lBQ2YsY0FBYztZQXNLc0IsTUFBTSx1QkFBOUMsTUFBTSxTQUFDLFdBQVc7WUEvTHJCLGlCQUFpQjs7O2lCQW1EaEIsS0FBSzswQkFLTCxLQUFLOzRCQUtMLEtBQUs7aUNBTUwsS0FBSztpQ0FNTCxLQUFLO3lCQU1MLEtBQUs7NEJBTUwsS0FBSzswQkFLTCxLQUFLO2tDQVNMLEtBQUs7NkJBS0wsS0FBSztpQ0FLTCxLQUFLO29CQU1MLE1BQU07bUJBS04sTUFBTTt5QkFLTixNQUFNO3dCQUtOLE1BQU07c0JBS04sTUFBTTsrQkFLTixNQUFNOzhCQUtOLE1BQU07b0NBTU4sU0FBUyxTQUFDLHFCQUFxQjt5QkE2Qi9CLFlBQVfgU0FBQyxpQkFBaUIsRUFBRSxDQUFDLFFBQVEsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gVGhlIE1JVCBMaWNlbnNlIChNSVQpXG5cbiBDb3B5cmlnaHQgKGMpIDIwMTctMjAxOCBTdGVmYW5vIENhcHBhIChLczg5KVxuXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIifgIHRvIGRlYWxcbiBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4gdG8gdXNlLCBjb3B5LCBtb2RpZnfgIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG5cbiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBhbGxcbiBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT04gSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRVxuIFNPRlRXQVJFLlxuICovXG5cbmltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBFdmVudEVtaXR0ZXIsXG4gIEhvc3RMaXN0ZW5lcixcbiAgSW5qZWN0LFxuICBJbnB1dCxcbiAgT25DaGFuZ2VzLFxuICBPbkRlc3Ryb3fgXG4gIE9uSW5pdCxcbiAgT3V0cHV0LFxuICBQTEFURk9STV9JRCxcbiAgU2ltcGxlQ2hhbmdlLFxuICBTaW1wbGVDaGFuZ2VzLFxuICBWaWV3Q2hpbGRcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBpc1BsYXRmb3JtQnJvd3NlciwgaXNQbGF0Zm9ybVNlcnZlciB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbmltcG9ydCB7IEJ1dHRvbkV2ZW50LCBCdXR0b25zQ29uZmlnIH0gZnJvbSAnLi4vLi4vbW9kZWwvYnV0dG9ucy1jb25maWcuaW50ZXJmYWNlJztcbmltcG9ydCB7IEltYWdlLCBJbWFnZU1vZGFsRXZlbnQgfSBmcm9tICcuLi8uLi9tb2RlbC9pbWFnZS5jbGFzcyc7XG5pbXBvcnQgeyBBY3Rpb24gfSBmcm9tICcuLi8uLi9tb2RlbC9hY3Rpb24uZW51bSc7XG5pbXBvcnQgeyBLZXlib2FyZENvbmZpZyB9IGZyb20gJy4uLy4uL21vZGVsL2tleWJvYXJkLWNvbmZpZy5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgUHJldmlld0NvbmZpZyB9IGZyb20gJy4uLy4uL21vZGVsL3ByZXZpZXctY29uZmlnLmludGVyZmFjZSc7XG5pbXBvcnQgeyBTbGlkZUNvbmZpZyB9IGZyb20gJy4uLy4uL21vZGVsL3NsaWRlLWNvbmZpZy5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgQWNjZXNzaWJpbGl0eUNvbmZpZyB9IGZyb20gJy4uLy4uL21vZGVsL2FjY2Vzc2liaWxpdHkuaW50ZXJmYWNlJztcbmltcG9ydCB7IEtleWJvYXJkU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2tleWJvYXJkLnNlcnZpY2UnO1xuaW1wb3J0IHsgR2FsbGVyeVNlcnZpY2UsIEludGVybmFsR2FsbGVyeVBheWxvYWQgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9nYWxsZXJ5LnNlcnZpY2UnO1xuaW1wb3J0IHsgRG90c0NvbmZpZyB9IGZyb20gJy4uLy4uL21vZGVsL2RvdHMtY29uZmlnLmludGVyZmFjZSc7XG5pbXBvcnQgeyBDdXJyZW50SW1hZ2VDb21wb25lbnQsIEltYWdlTG9hZEV2ZW50IH0gZnJvbSAnLi4vY3VycmVudC1pbWFnZS9jdXJyZW50LWltYWdlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBJbnRlcm5hbExpYkltYWdlIH0gZnJvbSAnLi4vLi4vbW9kZWwvaW1hZ2UtaW50ZXJuYWwuY2xhc3MnO1xuaW1wb3J0IHsgQWR2YW5jZWRMYXlvdXQsIFBsYWluR2FsbGVyeUNvbmZpZyB9IGZyb20gJy4uLy4uL21vZGVsL3BsYWluLWdhbGxlcnktY29uZmlnLmludGVyZmFjZSc7XG5pbXBvcnQgeyBLU19ERUZBVUxUX0FDQ0VTU0lCSUxJVFlfQ09ORklHIH0gZnJvbSAnLi4vYWNjZXNzaWJpbGl0eS1kZWZhdWx0JztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMvU3Vic2NyaXB0aW9uJztcbmltcG9ydCB7IEN1cnJlbnRJbWFnZUNvbmZpZyB9IGZyb20gJy4uLy4uL21vZGVsL2N1cnJlbnQtaW1hZ2UtY29uZmlnLmludGVyZmFjZSc7XG5pbXBvcnQgeyBnZXRJbmRleCB9IGZyb20gJy4uLy4uL3V0aWxzL2ltYWdlLnV0aWwnO1xuXG4vKipcbiAqIE1haW4gQ29tcG9uZW50IG9mIHRoaXMgbGlicmFyeSB3aXRoIGJvdGggdGhlIHBsYWluIGFuZCBtb2RhbCBnYWxsZXJpZXMuXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2tzLW1vZGFsLWdhbGxlcnknLFxuICBleHBvcnRBczogJ2tzTW9kYWxHYWxsZXJ5JyxcbiAgc3R5bGVVcmxzOiBbJ21vZGFsLWdhbGxlcnkuc2NzcyddLFxuICB0ZW1wbGF0ZVVybDogJ21vZGFsLWdhbGxlcnkuaHRtbCcsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIE1vZGFsR2FsbGVyeUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95LCBPbkNoYW5nZXMge1xuICAvKipcbiAgICogVW5pcXVlIGlkICg+PTApIG9mIHRoZSBjdXJyZW50IGluc3RhbmNlIG9mIHRoaXMgbGlicmFyeS4gVGhpcyBpcyB1c2VmdWwgd2hlbiB5b3UgYXJlIHVzaW5nXG4gICAqIHRoZSBzZXJ2aWNlIHRvIGNhbGwgbW9kYWwgZ2FsbGVyeSB3aXRob3V0IG9wZW4gaXQgbWFudWFsbHkuXG4gICAqIFJpZ2h0IG5vdyBpcyBvcHRpb25hbCwgYnV0IGluIHVwY29taW5nIG1ham9yIHJlbGVhc2VzIHdpbGwgYmUgbWFuZGF0b3J5ISEhXG4gICAqL1xuICBASW5wdXQoKVxuICBpZDogbnVtYmVyO1xuICAvKipcbiAgICogQXJyYXkgb2YgYEltYWdlYCB0aGF0IHJlcHJlc2VudCB0aGUgbW9kZWwgb2YgdGhpcyBsaWJyYXJ5IHdpdGggYWxsIGltYWdlcywgdGh1bWJzIGFuZCBzbyBvbi5cbiAgICovXG4gIEBJbnB1dCgpXG4gIG1vZGFsSW1hZ2VzOiBJbWFnZVtdO1xuICAvKipcbiAgICogT2JqZWN0IG9mIHR5cGUgYEJ1dHRvbnNDb25maWdgIHRvIHNob3cvaGlkZSBidXR0b25zLlxuICAgKi9cbiAgQElucHV0KClcbiAgYnV0dG9uc0NvbmZpZzogQnV0dG9uc0NvbmZpZztcbiAgLyoqXG4gICAqIEJvb2xlYW4gdG8gZW5hYmxlIG1vZGFsLWdhbGxlcnkgY2xvc2UgYmVoYXZpb3VyIHdoZW4gY2xpY2tpbmdcbiAgICogb24gdGhlIHNlbWktdHJhbnNwYXJlbnQgYmFja2dyb3VuZC4gRW5hYmxlZCBieSBkZWZhdWx0LlxuICAgKi9cbiAgQElucHV0KClcbiAgZW5hYmxlQ2xvc2VPdXRzaWRlID0gdHJ1ZTtcbiAgLyoqXG4gICAqIEludGVyZmFjZSB0byBjb25maWd1cmUgY3VycmVudCBpbWFnZSBpbiBtb2RhbC1nYWxsZXJ5LlxuICAgKiBGb3IgaW5zdGFuY2UgeW91IGNhbiBkaXNhYmxlIG5hdmlnYXRpb24gb24gY2xpY2sgb24gY3VycmVudCBpbWFnZSAoZW5hYmxlZCBieSBkZWZhdWx0fg5cbiAgICovXG4gIEBJbnB1dCgpXG4gIGN1cnJlbnRJbWFnZUNvbmZpZzogQ3VycmVudEltYWdlQ29uZmlnO1xuICAvKipcbiAgICogT2JqZWN0IG9mIHR5cGUgYERvdHNDb25maWdgIHRvIGluaXQgRG90c0NvbXBvbmVudCdzIGZlYXR1cmVzLlxuICAgKiBGb3IgaW5zdGFuY2UsIGl0IGNvbnRhaW5zIGEgcGFyYW0gdG8gc2hvdy9oaWRlIGRvdHMuXG4gICAqL1xuICBASW5wdXQoKVxuICBkb3RzQ29uZmlnOiBEb3RzQ29uZmlnO1xuICAvKipcbiAgICogT2JqZWN0IG9mIHR5cGUgYFByZXZpZXdDb25maWdgIHRvIGluaXQgUHJldmlld3NDb21wb25lbnQncyBmZWF0dXJlcy5cbiAgICogRm9yIGluc3RhbmNlLCBpdCBjb250YWlucyBhIHBhcmFtIHRvIHNob3cvaGlkZSBwcmV2aWV3cy5cbiAgICovXG4gIEBJbnB1dCgpXG4gIHByZXZpZXdDb25maWc6IFByZXZpZXdDb25maWc7XG4gIC8qKlxuICAgKiBPYmplY3Qgb2YgdHlwZSBgU2xpZGVDb25maWdgIHRvIGluaXQgc2lkZSBwcmV2aWV3cyBhbmQgYGluZmluaXRlIHNsaWRpbmdgLlxuICAgKi9cbiAgQElucHV0KClcbiAgc2xpZGVDb25maWc6IFNsaWRlQ29uZmlnID0ge1xuICAgIGluZmluaXRlOiBmYWxzZSxcbiAgICBzaWRlUHJldmlld3M6IHsgc2hvdzogdHJ1ZSwgc2l6ZTogeyB3aWR0aDogJzEwMHB4JywgaGVpZ2h0OiAnYXV0bycgfSB9XG4gIH07XG4gIC8qKlxuICAgKiBPYmplY3Qgb2YgdHlwZSBgQWNjZXNzaWJpbGl0eUNvbmZpZ2AgdG8gaW5pdCBjdXN0b20gYWNjZXNzaWJpbGl0eSBmZWF0dXJlcy5cbiAgICogRm9yIGluc3RhbmNlLCBpdCBjb250YWlucyB0aXRsZXMsIGFsdCB0ZXh0cywgYXJpYS1sYWJlbHMgYW5kIHNvIG9uLlxuICAgKi9cbiAgQElucHV0KClcbiAgYWNjZXNzaWJpbGl0eUNvbmZpZzogQWNjZXNzaWJpbGl0eUNvbmZpZyA9IEtTX0RFRkFVTFRfQUNDRVNTSUJJTElUWV9DT05GSUc7XG4gIC8qKlxuICAgKiBPYmplY3Qgb2YgdHlwZSBgS2V5Ym9hcmRDb25maWdgIHRvIGFzc2lnbiBjdXN0b20ga2V5cyB0byBFU0MsIFJJR0hUIGFuZCBMRUZUIGtleWJvYXJkJ3MgYWN0aW9ucy5cbiAgICovXG4gIEBJbnB1dCgpXG4gIGtleWJvYXJkQ29uZmlnOiBLZXlib2FyZENvbmZpZztcbiAgLyoqXG4gICAqIE9iamVjdCBvZiB0eXBlIGBQbGFpbkdhbGxlcnlDb25maWdgIHRvIGNvbmZpZ3VyZSB0aGUgcGxhaW4gZ2FsbGVyeS5cbiAgICovXG4gIEBJbnB1dCgpXG4gIHBsYWluR2FsbGVyeUNvbmZpZzogUGxhaW5HYWxsZXJ5Q29uZmlnO1xuXG4gIC8qKlxuICAgKiBPdXRwdXQgdG8gZW1pdCBhbiBldmVudCB3aGVuIHRoZSBtb2RhbCBnYWxsZXJ5IGlzIGNsb3NlZC5cbiAgICovXG4gIEBPdXRwdXQoKVxuICBjbG9zZTogRXZlbnRFbWl0dGVyPEltYWdlTW9kYWxFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPEltYWdlTW9kYWxFdmVudD4oKTtcbiAgLyoqXG4gICAqIE91dHB1dCB0byBlbWl0IGFuIGV2ZW50IHdoZW4gYW4gaW1hZ2UgaXMgY2hhbmdlZC5cbiAgICovXG4gIEBPdXRwdXQoKVxuICBzaG93OiBFdmVudEVtaXR0ZXI8SW1hZ2VNb2RhbEV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8SW1hZ2VNb2RhbEV2ZW50PigpO1xuICAvKipcbiAgICogT3V0cHV0IHRvIGVtaXQgYW4gZXZlbnQgd2hlbiB0aGUgY3VycmVudCBpbWFnZSBpcyB0aGUgZmlyc3Qgb25lLlxuICAgKi9cbiAgQE91dHB1dCgpXG4gIGZpcnN0SW1hZ2U6IEV2ZW50RW1pdHRlcjxJbWFnZU1vZGFsRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxJbWFnZU1vZGFsRXZlbnQ+KCk7XG4gIC8qKlxuICAgKiBPdXRwdXQgdG8gZW1pdCBhbiBldmVudCB3aGVuIHRoZSBjdXJyZW50IGltYWdlIGlzIHRoZSBsYXN0IG9uZS5cbiAgICovXG4gIEBPdXRwdXQoKVxuICBsYXN0SW1hZ2U6IEV2ZW50RW1pdHRlcjxJbWFnZU1vZGFsRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxJbWFnZU1vZGFsRXZlbnQ+KCk7XG4gIC8qKlxuICAgKiBPdXRwdXQgdG8gZW1pdCBhbiBldmVudCB3aGVuIHRoZSBtb2RhbCBnYWxsZXJ5IGlzIGNsb3NlZC5cbiAgICovXG4gIEBPdXRwdXQoKVxuICBoYXNEYXRhOiBFdmVudEVtaXR0ZXI8SW1hZ2VNb2RhbEV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8SW1hZ2VNb2RhbEV2ZW50PigpO1xuICAvKipcbiAgICogT3V0cHV0IHRvIGVtaXQgYW4gZXZlbnQgd2hlbiBhIGJ1dHRvbiBpcyBjbGlja2VkLCBidXQgYmVmb3JlIHRoYXQgdGhlIGFjdGlvbiBpcyB0cmlnZ2VyZWQuXG4gICAqL1xuICBAT3V0cHV0KClcbiAgYnV0dG9uQmVmb3JlSG9vazogRXZlbnRFbWl0dGVyPEJ1dHRvbkV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8QnV0dG9uRXZlbnQ+KCk7XG4gIC8qKlxuICAgKiBPdXRwdXQgdG8gZW1pdCBhbiBldmVudCB3aGVuIGEgYnV0dG9uIGlzIGNsaWNrZWQsIGJ1dCBhZnRlciB0aGF0IHRoZSBhY3Rpb24gaXMgdHJpZ2dlcmVkLlxuICAgKi9cbiAgQE91dHB1dCgpXG4gIGJ1dHRvbkFmdGVySG9vazogRXZlbnRFbWl0dGVyPEJ1dHRvbkV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8QnV0dG9uRXZlbnQ+KCk7XG5cbiAgLyoqXG4gICAqIFJlZmVyZW5jZSB0byB0aGUgQ3VycmVudEltYWdlQ29tcG9uZW50IHRvIGludm9rZSBtZXRob2RzIG9uIGl0LlxuICAgKi9cbiAgQFZpZXdDaGlsZChDdXJyZW50SW1hZ2VDb21wb25lbnQpXG4gIGN1cnJlbnRJbWFnZUNvbXBvbmVudDtcblxuICAvKipcbiAgICogQm9vbGVhbiB0aGF0IGl0IGlzIHRydWUgaWYgdGhlIG1vZGFsIGdhbGxlcnkgaXMgdmlzaWJsZS4gRmFsc2UgYnkgZGVmYXVsdC5cbiAgICovXG4gIG9wZW5lZCA9IGZhbHNlO1xuICAvKipcbiAgICogQm9vbGVhbiB0byBvcGVuIHRoZSBtb2RhbCBnYWxsZXJ5LiBGYWxzZSBieSBkZWZhdWx0LlxuICAgKi9cbiAgc2hvd0dhbGxlcnkgPSBmYWxzZTtcbiAgLyoqXG4gICAqIEFycmF5IG9mIGBJbnRlcm5hbExpYkltYWdlYCByZXByZXNlbnRpbmcgdGhlIG1vZGVsIG9mIHRoaXMgbGlicmFyeSB3aXRoIGFsbCBpbWFnZXMsIHRodW1icyBhbmQgc28gb24uXG4gICAqL1xuICBpbWFnZXM6IEludGVybmFsTGliSW1hZ2VbXTtcbiAgLyoqXG4gICAqIGBJbWFnZWAgdGhhdCBpcyB2aXNpYmxlIHJpZ2h0IG5vdy5cbiAgICovXG4gIGN1cnJlbnRJbWFnZTogSW50ZXJuYWxMaWJJbWFnZTtcblxuICBwcml2YXRlIGdhbGxlcnlTZXJ2aWNlTmF2aWdhdGVTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcbiAgcHJpdmF0ZSBnYWxsZXJ5U2VydmljZUNsb3NlU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG4gIHByaXZhdGUgZ2FsbGVyeVNlcnZpY2VVcGRhdGVTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICAvKipcbiAgICogSG9zdExpc3RlbmVyIHRvIGNhdGNoIGJyb3dzZXIncyBiYWNrIGJ1dHRvbiBhbmQgZGVzdHJveSB0aGUgZ2FsbGVyeS5cbiAgICogVGhpcyBwcmV2ZW50cyB3ZWlyZWQgYmVoYXZpb3VyIGFib3V0IHNjcm9sbGluZy5cbiAgICogQWRkZWQgdG8gZml4IHRoaXMgaXNzdWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9Lczg5L2FuZ3VsYXItbW9kYWwtZ2FsbGVyeS9pc3N1ZXMvMTU5XG4gICAqL1xuICBASG9zdExpc3RlbmVyKCd3aW5kb3c6cG9wc3RhdGUnLCBbJyRldmVudCddKVxuICBvblBvcFN0YXRlKGU6IEV2ZW50fgB7XG4gICAgdGhpcy5jbG9zZUdhbGxlcnkoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb25zdHJ1Y3RvciB3aXRoIHRoZSBpbmplY3Rpb24gb2YgwrRLZXlib2FyZFNlcnZpY2XCtCBhbmQgYW4gb2JqZWN0IHRvIHN1cHBvcnQgU2VydmVyLVNpZGUgUmVuZGVyaW5nLlxuICAgKi9cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBrZXlib2FyZFNlcnZpY2U6IEtleWJvYXJkU2VydmljZSxcbiAgICBwcml2YXRlIGdhbGxlcnlTZXJ2aWNlOiBHYWxsZXJ5U2VydmljZSxcbiAgICBASW5qZWN0KFBMQVRGT1JNX0lEfgBwcml2YXRlIHBsYXRmb3JtSWQ6IE9iamVjdCxcbiAgICBwcml2YXRlIGNoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZlxuICApIHt9XG5cbiAgLyoqXG4gICAqIE1ldGhvZCDCtG5nT25Jbml0wrQgdG8gaW5pdCBpbWFnZXMgY2FsbGluZyBgaW5pdEltYWdlcygpYC5cbiAgICogVGhpcyBpcyBhbiBBbmd1bGFyJ3MgbGlmZWN5Y2xlIGhvb2ssIHNvIGl0cyBjYWxsZWQgYXV0b21hdGljYWxseSBieSBBbmd1bGFyIGl0c2VsZi5cbiAgICogSW4gcGFydGljdWxhciwgaXQncyBjYWxsZWQgb25seSBvbmUgdGltZSEhIVxuICAgKi9cbiAgbmdPbkluaXQofgB7XG4gICAgLy8gaWQgaXMgYSBtYW5kYXRvcnkgaW5wdXQgYW5kIG11c3QgYSBudW1iZXIgPiAwXG4gICAgaWYgKCghdGhpcy5pZCAmJiB0aGlzLmlkICE9PSAwfgB8fCB0aGlzLmlkIDwgMCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICBgJ1tpZF09XCJhIG51bWJlciA+PSAwXCInIGlzIGEgbWFuZGF0b3J5IGlucHV0IGZyb20gNi4wLjAgaW4gYW5ndWxhci1tb2RhbC1nYWxsZXJ5LmAgK1xuICAgICAgICAgIGBJZiB5b3UgYXJlIHVzaW5nIG11bHRpcGxlIGluc3RhbmNlcyBvZiB0aGlzIGxpYnJhcnfgIHBsZWFzZSBiZSBzdXJlIHRvIHVzZSBkaWZmZXJlbnQgaWRzYFxuICAgICAgKTtcbiAgICB9XG5cbiAgICAvLyBjYWxsIGluaXRJbWFnZXMgdG8gaW5pdCBpbWFnZXMgYW5kIHRvIGVtaXQgYGhhc0RhdGFgIGV2ZW50XG4gICAgdGhpcy5pbml0SW1hZ2VzKCk7XG5cbiAgICB0aGlzLmdhbGxlcnlTZXJ2aWNlTmF2aWdhdGVTdWJzY3JpcHRpb24gPSB0aGlzLmdhbGxlcnlTZXJ2aWNlLm5hdmlnYXRlLnN1YnNjcmliZSgocGF5bG9hZDogSW50ZXJuYWxHYWxsZXJ5UGF5bG9hZCkgPT4ge1xuICAgICAgaWYgKCFwYXlsb2FkfgB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIC8vIGlmIGdhbGxlcnlJZCBpcyBub3QgdmFsaWQgT1IgZ2FsbGVyeUlkIGlzIHJlbGF0ZWQgdG8gYW5vdGhlciBpbnN0YW5jZSBhbmQgbm90IHRoaXMgb25lXG4gICAgICBpZiAocGF5bG9hZC5nYWxsZXJ5SWQgPT09IHVuZGVmaW5lZCB8fCBwYXlsb2FkLmdhbGxlcnlJZCA8IDAgfHwgcGF5bG9hZC5nYWxsZXJ5SWQgIT09IHRoaXMuaWQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgLy8gaWYgaW1hZ2UgaW5kZXggaXMgbm90IHZhbGlkXG4gICAgICBpZiAocGF5bG9hZC5pbmRleCA8IDAgfHwgcGF5bG9hZC5pbmRleCA+IHRoaXMuaW1hZ2VzLmxlbmd0aCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB0aGlzLnNob3dNb2RhbEdhbGxlcnkocGF5bG9hZC5pbmRleCwgdHJ1ZSk7XG4gICAgfSk7XG5cbiAgICB0aGlzLmdhbGxlcnlTZXJ2aWNlQ2xvc2VTdWJzY3JpcHRpb24gPSB0aGlzLmdhbGxlcnlTZXJ2aWNlLmNsb3NlLnN1YnNjcmliZSgoZ2FsbGVyeUlkOiBudW1iZXIpID0+IHtcbiAgICAgIGlmIChnYWxsZXJ5SWQgPCAwIHx8IHRoaXMuaWQgIT09IGdhbGxlcnlJZCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB0aGlzLmNsb3NlR2FsbGVyeShBY3Rpb24uTk9STUFMLCB0cnVlKTtcbiAgICB9KTtcblxuICAgIHRoaXMuZ2FsbGVyeVNlcnZpY2VVcGRhdGVTdWJzY3JpcHRpb24gPSB0aGlzLmdhbGxlcnlTZXJ2aWNlLnVwZGF0ZS5zdWJzY3JpYmUoKHBheWxvYWQ6IEludGVybmFsR2FsbGVyeVBheWxvYWQpID0+IHtcbiAgICAgIGlmICghcGF5bG9hZCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICAvLyBpZiBnYWxsZXJ5SWQgaXMgbm90IHZhbGlkIE9SIGdhbGxlcnlJZCBpcyByZWxhdGVkIHRvIGFub3RoZXIgaW5zdGFuY2UgYW5kIG5vdCB0aGlzIG9uZVxuICAgICAgaWYgKHBheWxvYWQuZ2FsbGVyeUlkID09PSB1bmRlZmluZWQgfHwgcGF5bG9hZC5nYWxsZXJ5SWQgPCAwIHx8IHBheWxvYWQuZ2FsbGVyeUlkICE9PSB0aGlzLmlkfgB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIC8vIGlmIGVpdGhlciBpbWFnZSBpbmRleCBvciBpbWFnZSBhcmUgbm90IHZhbGlkXG4gICAgICBpZiAocGF5bG9hZC5pbmRleCA8IDAgfHwgcGF5bG9hZC5pbmRleCA+IHRoaXMuaW1hZ2VzLmxlbmd0aCB8fCAhcGF5bG9hZC5pbWFnZSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBjb25zdCBjdXJyZW50SW5kZXg6IG51bWJlciA9IGdldEluZGV4KHBheWxvYWQuaW1hZ2UsIHRoaXMuaW1hZ2VzKTtcbiAgICAgIHRoaXMuaW1hZ2VzID0gdGhpcy5pbWFnZXMubWFwKChpbWFnZTogSW50ZXJuYWxMaWJJbWFnZSwgaW5kZXg6IG51bWJlcikgPT4ge1xuICAgICAgICBpZiAoaW5kZXggPT09IHBheWxvYWQuaW5kZXgpIHtcbiAgICAgICAgICByZXR1cm4gPEludGVybmFsTGliSW1hZ2U+cGF5bG9hZC5pbWFnZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaW1hZ2U7XG4gICAgICB9KTtcbiAgICAgIGlmIChjdXJyZW50SW5kZXggPT09IHBheWxvYWQuaW5kZXgpwqB7XG4gICAgICAgIHRoaXMuY3VycmVudEltYWdlID0gdGhpcy5pbWFnZXNbcGF5bG9hZC5pbmRleF07XG4gICAgICB9XG4gICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIE1ldGhvZCDCtG5nT25DaGFuZ2VzwrQgdG8gcmUtaW5pdCBpbWFnZXMgaWYgaW5wdXQgaXMgY2hhbmdlZC5cbiAgICogVGhpcyBpcyBhbiBBbmd1bGFyJ3MgbGlmZWN5Y2xlIGhvb2ssIHNvIGl0cyBjYWxsZWQgYXV0b21hdGljYWxseSBieSBBbmd1bGFyIGl0c2VsZi5cbiAgICogSW4gcGFydGljdWxhciwgaXQncyBjYWxsZWQgYmVmb3JlIGBuZ09uSW5pdCgpYCBhbmQgd2hlbmV2ZXIgb25lIG9yIG1vcmUgZGF0YS1ib3VuZCBpbnB1dCBwcm9wZXJ0aWVzIGNoYW5nZS5cbiAgICogQHBhcmFtIGNoYW5nZXMgYFNpbXBsZUNoYW5nZXNgIG9iamVjdCBvZiBjdXJyZW50IGFuZCBwcmV2aW91cyBwcm9wZXJ0eSB2YWx1ZXMgcHJvdmlkZWQgYnkgQW5ndWxhci5cbiAgICovXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICBjb25zdCBpbWFnZXNDaGFuZ2U6IFNpbXBsZUNoYW5nZSA9IGNoYW5nZXMubW9kYWxJbWFnZXM7XG4gICAgY29uc3QgcGxhaW5HYWxsZXJ5Q29uZmlnQ2hhbmdlOiBTaW1wbGVDaGFuZ2UgPSBjaGFuZ2VzLnBsYWluR2FsbGVyeUNvbmZpZztcblxuICAgIGlmIChpbWFnZXNDaGFuZ2UgJiYgIWltYWdlc0NoYW5nZS5maXJzdENoYW5nZSAmJiBpbWFnZXNDaGFuZ2UucHJldmlvdXNWYWx1ZSAhPT0gaW1hZ2VzQ2hhbmdlLmN1cnJlbnRWYWx1ZSkge1xuICAgICAgdGhpcy5pbml0SW1hZ2VzKCk7XG4gICAgfVxuXG4gICAgaWYgKHBsYWluR2FsbGVyeUNvbmZpZ0NoYW5nZSkge1xuICAgICAgLy8gY29uc3QgcHJldlBsYWluR2FsbGVyeUNvbmZpZ0NoYW5nZTogYW55ID0gcGxhaW5HYWxsZXJ5Q29uZmlnQ2hhbmdlLnByZXZpb3VzVmFsdWU7XG4gICAgICBjb25zdCBjdXJyUGxhaW5HYWxsZXJ5Q29uZmlnQ2hhbmdlOiBQbGFpbkdhbGxlcnlDb25maWcgPSBwbGFpbkdhbGxlcnlDb25maWdDaGFuZ2UuY3VycmVudFZhbHVlO1xuICAgICAgaWYgKFxuICAgICAgICBjdXJyUGxhaW5HYWxsZXJ5Q29uZmlnQ2hhbmdlLmxheW91dCAmJlxuICAgICAgICBjdXJyUGxhaW5HYWxsZXJ5Q29uZmlnQ2hhbmdlLmxheW91dCBpbnN0YW5jZW9mIEFkdmFuY2VkTGF5b3V0ICYmXG4gICAgICAgIGN1cnJQbGFpbkdhbGxlcnlDb25maWdDaGFuZ2UubGF5b3V0Lm1vZGFsT3BlbmVyQnlJbmRleCAhPT0gLTFcbiAgICAgICkge1xuICAgICAgICAvLyBjb25zb2xlLmxvZygnb3BlbmluZyBtb2RhbCBnYWxsZXJ5IGZyb20gY3VzdG9tIHBsYWluIGdhbGxlcnfgIGluZGV4OiAnLCBjdXJyUGxhaW5HYWxsZXJ5Q29uZmlnQ2hhbmdlKTtcbiAgICAgICAgdGhpcy5zaG93TW9kYWxHYWxsZXJ5KGN1cnJQbGFpbkdhbGxlcnlDb25maWdDaGFuZ2UubGF5b3V0Lm1vZGFsT3BlbmVyQnlJbmRleCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIE1ldGhvZCBjYWxsZWQgYnkgY3VzdG9tIHVwcGVyIGJ1dHRvbnMuXG4gICAqIEBwYXJhbSBCdXR0b25FdmVudCBldmVudCBwYXlsb2FkXG4gICAqL1xuICBvbkN1c3RvbUVtaXQoZXZlbnQ6IEJ1dHRvbkV2ZW50fgB7XG4gICAgY29uc3QgZXZlbnRUb0VtaXQ6IEJ1dHRvbkV2ZW50ID0gdGhpcy5nZXRCdXR0b25FdmVudFRvRW1pdChldmVudCk7XG4gICAgdGhpcy5idXR0b25CZWZvcmVIb29rLmVtaXQoZXZlbnRUb0VtaXQpO1xuICAgIC8vIGNvbnNvbGUubG9nKCdvbiBvbkN1c3RvbUVtaXQnLCBldmVudFRvRW1pdCk7XG4gICAgdGhpcy5idXR0b25BZnRlckhvb2suZW1pdChldmVudFRvRW1pdCk7XG4gIH1cblxuICAvLyBUT0RPIGltcGxlbWVudCBvbiByZWZyZXNoXG4gIC8vIC8qKlxuICAvLyAgKiBNZXRob2QgY2FsbGVkIGJ5IHRoZSByZWZyZXNoIHVwcGVyIGJ1dHRvbi5cbiAgLy8gICogU1RJTEwgTk9UIElNUExFTUVOVEVELCBTTyBET04nVCBVU0UgSVRcbiAgLy8gICogQHBhcmFtIEJ1dHRvbkV2ZW50IGV2ZW50IHBheWxvYWRcbiAgLy8gICovXG4gIC8vIG9uUmVmcmVzaChldmVudDogQnV0dG9uRXZlbnQpIHtcbiAgLy8gICBjb25zdCBldmVudFRvRW1pdDogQnV0dG9uRXZlbnQgPSB0aGlzLmdldEJ1dHRvbkV2ZW50VG9FbWl0KGV2ZW50KTtcbiAgLy9cbiAgLy8gICB0aGlzLmJ1dHRvbkJlZm9yZUhvb2suZW1pdChldmVudFRvRW1pdCk7XG4gIC8vICAgLy8gY29uc29sZS5sb2coJ1RPRE8gaW1wbGVtZW50IG9uIHJlZnJlc2ggaW5zaWRlIHRoZSBsaWJyYXJ5JywgZXZlbnRUb0VtaXQpO1xuICAvL1xuICAvLyAgIHRoaXMuY3VycmVudEltYWdlID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5jdXJyZW50SW1hZ2UsIHsgcHJldmlvdXNseUxvYWRlZDogZmFsc2UgfSk7XG4gIC8vXG4gIC8vICAgLy8gVE9ETyBhZGQgbG9naWMgdG8gaGlkZSBhbmQgc2hvdyB0aGUgY3VycmVudCBpbWFnZVxuICAvL1xuICAvLyAgIC8vIGNvbnNvbGUubG9nKCdvblJlZnJlc2gnLCB0aGlzLmN1cnJlbnRJbWFnZSk7XG4gIC8vXG4gIC8vICAgLy8gY29uc3QgaW5kZXhOdW06IG51bWJlciA9IHRoaXMuY3VycmVudEltYWdlQ29tcG9uZW50LmdldEluZGV4KCk7XG4gIC8vXG4gIC8vICAgLy8gdGhpcy5pbWFnZXMgPSB0aGlzLmltYWdlcy5tYXAoKHZhbDogSW50ZXJuYWxMaWJJbWFnZSwgaW5kZXg6IG51bWJlcikgPT4ge1xuICAvLyAgIC8vICAgaWYgKGluZGV4ICE9PSAyfgB7XG4gIC8vICAgLy8gICAgIHJldHVybiB2YWw7XG4gIC8vICAgLy8gICB9IGVsc2Uge1xuICAvLyAgIC8vICAgICBjb25zdCBpbWc6IEludGVybmFsTGliSW1hZ2UgPSBPYmplY3QuYXNzaWduKHt9LCB2YWwsIHtwcmV2aW91c2x5TG9hZGVkOiBmYWxzZX0pO1xuICAvLyAgIC8vICAgICByZXR1cm4gaW1nO1xuICAvLyAgIC8vICAgfVxuICAvLyAgIC8vIH0pO1xuICAvLyAgIC8vXG4gIC8vICAgLy8gdGhpcy5jbG9zZUdhbGxlcnkoKTtcbiAgLy8gICAvLyB0aGlzLnNob3dNb2RhbEdhbGxlcnkoMik7XG4gIC8vXG4gIC8vICAgdGhpcy5idXR0b25BZnRlckhvb2suZW1pdChldmVudFRvRW1pdCk7XG4gIC8vIH1cblxuICAvKipcbiAgICogTWV0aG9kIGNhbGxlZCBieSB0aGUgZnVsbC1zY3JlZW4gdXBwZXIgYnV0dG9uLlxuICAgKiBAcGFyYW0gQnV0dG9uRXZlbnQgZXZlbnQgcGF5bG9hZFxuICAgKi9cbiAgb25GdWxsU2NyZWVuKGV2ZW50OiBCdXR0b25FdmVudCkge1xuICAgIGNvbnN0IGV2ZW50VG9FbWl0OiBCdXR0b25FdmVudCA9IHRoaXMuZ2V0QnV0dG9uRXZlbnRUb0VtaXQoZXZlbnQpO1xuICAgIHRoaXMuYnV0dG9uQmVmb3JlSG9vay5lbWl0KGV2ZW50VG9FbWl0KTtcblxuICAgIGNvbnN0IGRvYzogYW55ID0gPGFueT5kb2N1bWVudDtcbiAgICBjb25zdCBkb2NFbDogYW55ID0gPGFueT5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG5cbiAgICBjb25zdCBmdWxsc2NyZWVuRGlzYWJsZWQ6IGJvb2xlYW4gPSAhZG9jLmZ1bGxzY3JlZW5FbGVtZW50ICYmICFkb2Mud2Via2l0RnVsbHNjcmVlbkVsZW1lbnQgJiYgIWRvYy5tb3pGdWxsU2NyZWVuRWxlbWVudCAmJiAhZG9jLm1zRnVsbHNjcmVlbkVsZW1lbnQ7XG5cbiAgICBpZiAoZnVsbHNjcmVlbkRpc2FibGVkfgB7XG4gICAgICBpZiAoZG9jRWwucmVxdWVzdEZ1bGxzY3JlZW4pIHtcbiAgICAgICAgZG9jRWwucmVxdWVzdEZ1bGxzY3JlZW4oKTtcbiAgICAgIH0gZWxzZSBpZiAoZG9jRWwud2Via2l0UmVxdWVzdEZ1bGxzY3JlZW4pIHtcbiAgICAgICAgZG9jRWwud2Via2l0UmVxdWVzdEZ1bGxzY3JlZW4oKTtcbiAgICAgIH0gZWxzZSBpZiAoZG9jRWwubW96UmVxdWVzdEZ1bGxTY3JlZW4pIHtcbiAgICAgICAgZG9jRWwubW96UmVxdWVzdEZ1bGxTY3JlZW4oKTtcbiAgICAgIH0gZWxzZSBpZiAoZG9jRWwubXNSZXF1ZXN0RnVsbHNjcmVlbikge1xuICAgICAgICBkb2NFbC5tc1JlcXVlc3RGdWxsc2NyZWVuKCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChkb2MuZXhpdEZ1bGxzY3JlZW4pIHtcbiAgICAgICAgZG9jLmV4aXRGdWxsc2NyZWVuKCk7XG4gICAgICB9IGVsc2UgaWYgKGRvYy5tc0V4aXRGdWxsc2NyZWVufgB7XG4gICAgICAgIGRvYy5tc0V4aXRGdWxsc2NyZWVuKCk7XG4gICAgICB9IGVsc2UgaWYgKGRvYy5tb3pDYW5jZWxGdWxsU2NyZWVufgB7XG4gICAgICAgIGRvYy5tb3pDYW5jZWxGdWxsU2NyZWVuKCk7XG4gICAgICB9IGVsc2UgaWYgKGRvYy53ZWJraXRFeGl0RnVsbHNjcmVlbikge1xuICAgICAgICBkb2Mud2Via2l0RXhpdEZ1bGxzY3JlZW4oKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLmJ1dHRvbkFmdGVySG9vay5lbWl0KGV2ZW50VG9FbWl0KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBNZXRob2QgY2FsbGVkIGJ5IHRoZSBkZWxldGUgdXBwZXIgYnV0dG9uLlxuICAgKiBAcGFyYW0gQnV0dG9uRXZlbnQgZXZlbnQgcGF5bG9hZFxuICAgKi9cbiAgb25EZWxldGUoZXZlbnQ6IEJ1dHRvbkV2ZW50fgB7XG4gICAgY29uc3QgZXZlbnRUb0VtaXQ6IEJ1dHRvbkV2ZW50ID0gdGhpcy5nZXRCdXR0b25FdmVudFRvRW1pdChldmVudCk7XG4gICAgdGhpcy5idXR0b25CZWZvcmVIb29rLmVtaXQoZXZlbnRUb0VtaXQpO1xuXG4gICAgaWYgKHRoaXMuaW1hZ2VzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgdGhpcy5jbG9zZUdhbGxlcnkoKTtcbiAgICB9XG5cbiAgICBjb25zdCBpbWFnZUluZGV4VG9EZWxldGU6IG51bWJlciA9IHRoaXMuY3VycmVudEltYWdlQ29tcG9uZW50LmdldEluZGV4VG9EZWxldGUoZXZlbnQuaW1hZ2UpO1xuICAgIGlmIChpbWFnZUluZGV4VG9EZWxldGUgPT09IHRoaXMuaW1hZ2VzLmxlbmd0aCAtIDEpIHtcbiAgICAgIC8vIGxhc3QgaW1hZ2VcbiAgICAgIHRoaXMuY3VycmVudEltYWdlQ29tcG9uZW50LnByZXZJbWFnZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmN1cnJlbnRJbWFnZUNvbXBvbmVudC5uZXh0SW1hZ2UoKTtcbiAgICB9XG5cbiAgICB0aGlzLmJ1dHRvbkFmdGVySG9vay5lbWl0KGV2ZW50VG9FbWl0KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBNZXRob2QgY2FsbGVkIGJ5IHRoZSBuYXZpZ2F0ZSB1cHBlciBidXR0b24uXG4gICAqIEBwYXJhbSBCdXR0b25FdmVudCBldmVudCBwYXlsb2FkXG4gICAqL1xuICBvbk5hdmlnYXRlKGV2ZW50OiBCdXR0b25FdmVudCkge1xuICAgIGNvbnN0IGV2ZW50VG9FbWl0OiBCdXR0b25FdmVudCA9IHRoaXMuZ2V0QnV0dG9uRXZlbnRUb0VtaXQoZXZlbnQpO1xuICAgIHRoaXMuYnV0dG9uQmVmb3JlSG9vay5lbWl0KGV2ZW50VG9FbWl0KTtcbiAgICAvLyBUbyBzdXBwb3J0IFNTUlxuICAgIGlmIChpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpfgB7XG4gICAgICBpZiAoZXZlbnRUb0VtaXQuaW1hZ2UgJiYgZXZlbnRUb0VtaXQuaW1hZ2UubW9kYWwuZXh0VXJsfgB7XG4gICAgICAgIC8vIHdoZXJlIEkgc2hvdWxkIG9wZW4gdGhpcyBsaW5rPyBUaGUgY3VycmVudCB0YWIgb3IgYW5vdGhlciBvbmU/XG4gICAgICAgIGlmIChldmVudFRvRW1pdC5idXR0b24gJiYgZXZlbnRUb0VtaXQuYnV0dG9uLmV4dFVybEluTmV3VGFifgB7XG4gICAgICAgICAgd2luZG93Lm9wZW4oZXZlbnRUb0VtaXQuaW1hZ2UubW9kYWwuZXh0VXJsLCAnX2JsYW5rJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBldmVudFRvRW1pdC5pbWFnZS5tb2RhbC5leHRVcmw7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5idXR0b25BZnRlckhvb2suZW1pdChldmVudFRvRW1pdCk7XG4gIH1cblxuICAvKipcbiAgICogTWV0aG9kIGNhbGxlZCBieSB0aGUgZG93bmxvYWQgdXBwZXIgYnV0dG9uLlxuICAgKiBAcGFyYW0gQnV0dG9uRXZlbnQgZXZlbnQgcGF5bG9hZFxuICAgKi9cbiAgb25Eb3dubG9hZChldmVudDogQnV0dG9uRXZlbnQpIHtcbiAgICBjb25zdCBldmVudFRvRW1pdDogQnV0dG9uRXZlbnQgPSB0aGlzLmdldEJ1dHRvbkV2ZW50VG9FbWl0KGV2ZW50KTtcbiAgICB0aGlzLmJ1dHRvbkJlZm9yZUhvb2suZW1pdChldmVudFRvRW1pdCk7XG4gICAgdGhpcy5kb3dubG9hZEltYWdlKCk7XG4gICAgdGhpcy5idXR0b25BZnRlckhvb2suZW1pdChldmVudFRvRW1pdCk7XG4gIH1cblxuICAvKipcbiAgICogTWV0aG9kIGNhbGxlZCBieSB0aGUgY2xvc2UgdXBwZXIgYnV0dG9uLlxuICAgKiBAcGFyYW0gQnV0dG9uRXZlbnQgZXZlbnQgcGF5bG9hZFxuICAgKiBAcGFyYW0gQWN0aW9uIGFjdGlvbiB0aGF0IHRyaWdnZXJlZCB0aGUgY2xvc2UgbWV0aG9kLiBgQWN0aW9uLk5PUk1BTGAgYnkgZGVmYXVsdFxuICAgKi9cbiAgb25DbG9zZUdhbGxlcnkoZXZlbnQ6IEJ1dHRvbkV2ZW50LCBhY3Rpb246IEFjdGlvbiA9IEFjdGlvbi5OT1JNQUwpIHtcbiAgICBjb25zdCBldmVudFRvRW1pdDogQnV0dG9uRXZlbnQgPSB0aGlzLmdldEJ1dHRvbkV2ZW50VG9FbWl0KGV2ZW50KTtcbiAgICB0aGlzLmJ1dHRvbkJlZm9yZUhvb2suZW1pdChldmVudFRvRW1pdCk7XG4gICAgdGhpcy5jbG9zZUdhbGxlcnkoYWN0aW9uKTtcbiAgICB0aGlzLmJ1dHRvbkFmdGVySG9vay5lbWl0KGV2ZW50VG9FbWl0KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBNZXRob2QgdG8gY2xvc2UgdGhlIG1vZGFsIGdhbGxlcnkgc3BlY2lmeWluZyB0aGUgYWN0aW9uLlxuICAgKiBJdCBhbHNvIHJlc2V0IHRoZSBga2V5Ym9hcmRTZXJ2aWNlYCB0byBwcmV2ZW50IG11bHRpcGxlIGxpc3RlbmVycy5cbiAgICogQHBhcmFtIEFjdGlvbiBhY3Rpb24gdHlwZS4gYEFjdGlvbi5OT1JNQUxgIGJ5IGRlZmF1bHRcbiAgICogQHBhcmFtIGJvb2xlYW4gaXNDYWxsZWRCeVNlcnZpY2UgaXMgdHJ1ZSBpZiBjYWxsZWQgYnkgZ2FsbGVyeS5zZXJ2aWNlLCBvdGhlcndpc2UgZmFsc2VcbiAgICovXG4gIGNsb3NlR2FsbGVyeShhY3Rpb246IEFjdGlvbiA9IEFjdGlvbi5OT1JNQUwsIGlzQ2FsbGVkQnlTZXJ2aWNlOiBib29sZWFuID0gZmFsc2UpIHtcbiAgICB0aGlzLmNsb3NlLmVtaXQobmV3IEltYWdlTW9kYWxFdmVudChhY3Rpb24sIHRydWUpKTtcbiAgICB0aGlzLm9wZW5lZCA9IGZhbHNlO1xuICAgIHRoaXMua2V5Ym9hcmRTZXJ2aWNlLnJlc2V0KCk7XG5cbiAgICAvLyBzaG93cyBzY3JvbGxiYXJcbiAgICBkb2N1bWVudC5ib2R5LnN0eWxlLm92ZXJmbG93ID0gJ3Zpc2libGUnO1xuXG4gICAgaWYgKGlzQ2FsbGVkQnlTZXJ2aWNlfgB7XG4gICAgICAvLyB0aGUgZm9sbG93aW5nIGlzIHJlcXVpcmVkLCBvdGhlcndpc2UgdGhlIHZpZXcgd2lsbCBub3QgYmUgdXBkYXRlZFxuICAgICAgLy8gdGhpcyBoYXBwZW5zIG9ubHkgaWYgY2FsbGVkIGJ5IGdhbGxlcnkuc2VydmljZVxuICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogTWV0aG9kIGNhbGxlZCB3aGVuIHlvdSBjbGljayBvbiBhbiBpbWFnZSBvZiB5b3VyIHBsYWluIChvciBpbmxpbmUpIGdhbGxlcnkuXG4gICAqIEBwYXJhbSBudW1iZXIgaW5kZXggb2YgdGhlIGNsaWNrZWQgaW1hZ2VcbiAgICovXG4gIG9uU2hvd01vZGFsR2FsbGVyeShpbmRleDogbnVtYmVyfgB7XG4gICAgdGhpcy5zaG93TW9kYWxHYWxsZXJ5KGluZGV4KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBNZXRob2QgdG8gc2hvdyB0aGUgbW9kYWwgZ2FsbGVyeSBkaXNwbGF5aW5nIHRoZSBpbWFnZSB3aXRoXG4gICAqIHRoZSBpbmRleCBzcGVjaWZpZWQgYXMgaW5wdXQgcGFyYW1ldGVyLlxuICAgKiBJdCB3aWxsIGFsc28gcmVnaXN0ZXIgYSBuZXcgYGtleWJvYXJkU2VydmljZWAgdG8gY2F0Y2gga2V5Ym9hcmQncyBldmVudHMgdG8gZG93bmxvYWQgdGhlIGN1cnJlbnRcbiAgICogaW1hZ2Ugd2l0aCBrZXlib2FyZCdzIHNob3J0Y3V0cy4gVGhpcyBzZXJ2aWNlLCB3aWxsIGJlIHJlbW92ZWQgZWl0aGVyIHdoZW4gbW9kYWwgZ2FsbGVyeSBjb21wb25lbnRcbiAgICogd2lsbCBiZSBkZXN0cm95ZWQgb3Igd2hlbiB0aGUgZ2FsbGVyeSBpcyBjbG9zZWQgaW52b2tpbmcgdGhlIGBjbG9zZUdhbGxlcnlgIG1ldGhvZC5cbiAgICogQHBhcmFtIG51bWJlciBpbmRleCBvZiB0aGUgaW1hZ2UgdG8gc2hvd1xuICAgKiBAcGFyYW0gYm9vbGVhbiBpc0NhbGxlZEJ5U2VydmljZSBpcyB0cnVlIGlmIGNhbGxlZCBieSBnYWxsZXJ5LnNlcnZpY2UsIG90aGVyd2lzZSBmYWxzZVxuICAgKi9cbiAgc2hvd01vZGFsR2FsbGVyeShpbmRleDogbnVtYmVyLCBpc0NhbGxlZEJ5U2VydmljZTogYm9vbGVhbiA9IGZhbHNlfgB7XG4gICAgLy8gaGlkZXMgc2Nyb2xsYmFyXG4gICAgZG9jdW1lbnQuYm9keS5zdHlsZS5vdmVyZmxvdyA9ICdoaWRkZW4nO1xuXG4gICAgdGhpcy5rZXlib2FyZFNlcnZpY2UuYWRkKChldmVudDogS2V5Ym9hcmRFdmVudCwgY29tYm86IHN0cmluZykgPT4ge1xuICAgICAgaWYgKGV2ZW50LnByZXZlbnREZWZhdWx0fgB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBpbnRlcm5ldCBleHBsb3JlclxuICAgICAgICBldmVudC5yZXR1cm5WYWx1ZSA9IGZhbHNlO1xuICAgICAgfVxuICAgICAgdGhpcy5kb3dubG9hZEltYWdlKCk7XG4gICAgfSk7XG5cbiAgICB0aGlzLm9wZW5lZCA9IHRydWU7XG4gICAgdGhpcy5jdXJyZW50SW1hZ2UgPSB0aGlzLmltYWdlc1tpbmRleF07XG5cbiAgICAvLyBlbWl0IGEgbmV3IEltYWdlTW9kYWxFdmVudCB3aXRoIHRoZSBpbmRleCBvZiB0aGUgY3VycmVudCBpbWFnZVxuICAgIHRoaXMuc2hvdy5lbWl0KG5ldyBJbWFnZU1vZGFsRXZlbnQoQWN0aW9uLkxPQUQsIGluZGV4ICsgMSkpO1xuXG4gICAgaWYgKGlzQ2FsbGVkQnlTZXJ2aWNlfgB7XG4gICAgICAvLyB0aGUgZm9sbG93aW5nIGlzIHJlcXVpcmVkLCBvdGhlcndpc2UgdGhlIHZpZXcgd2lsbCBub3QgYmUgdXBkYXRlZFxuICAgICAgLy8gdGhpcyBoYXBwZW5zIG9ubHkgaWYgY2FsbGVkIGJ5IGdhbGxlcnkuc2VydmljZVxuICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogTWV0aG9kIGNhbGxlZCB3aGVuIHRoZSBpbWFnZSBjaGFuZ2VzIGFuZCB1c2VkIHRvIHVwZGF0ZSB0aGUgYGN1cnJlbnRJbWFnZWAgb2JqZWN0LlxuICAgKiBAcGFyYW0gSW1hZ2VNb2RhbEV2ZW50IGV2ZW50IHBheWxvYWRcbiAgICovXG4gIG9uQ2hhbmdlQ3VycmVudEltYWdlKGV2ZW50OiBJbWFnZU1vZGFsRXZlbnQpIHtcbiAgICBjb25zdCBuZXdJbmRleDogbnVtYmVyID0gPG51bWJlcj5ldmVudC5yZXN1bHQ7XG5cbiAgICAvLyBUT0RPIGFkZCB2YWxpZGF0aW9uXG4gICAgdGhpcy5jdXJyZW50SW1hZ2UgPSB0aGlzLmltYWdlc1tuZXdJbmRleF07XG5cbiAgICAvLyBlbWl0IGZpcnN0L2xhc3QgZXZlbnQgYmFzZWQgb24gbmV3SW5kZXggdmFsdWVcbiAgICB0aGlzLmVtaXRCb3VuZGFyeUV2ZW50KGV2ZW50LmFjdGlvbiwgbmV3SW5kZXgpO1xuXG4gICAgLy8gZW1pdCBjdXJyZW50IHZpc2libGUgaW1hZ2UgaW5kZXhcbiAgICB0aGlzLnNob3cuZW1pdChuZXcgSW1hZ2VNb2RhbEV2ZW50KGV2ZW50LmFjdGlvbiwgbmV3SW5kZXggKyAxfgk7XG4gIH1cblxuICBpc1BsYWluR2FsbGVyeVZpc2libGUoKTogYm9vbGVhbiB7XG4gICAgaWYgKHRoaXMucGxhaW5HYWxsZXJ5Q29uZmlnICYmIHRoaXMucGxhaW5HYWxsZXJ5Q29uZmlnLmxheW91dCAmJiB0aGlzLnBsYWluR2FsbGVyeUNvbmZpZy5sYXlvdXQgaW5zdGFuY2VvZiBBZHZhbmNlZExheW91dCkge1xuICAgICAgcmV0dXJuICF0aGlzLnBsYWluR2FsbGVyeUNvbmZpZy5sYXlvdXQuaGlkZURlZmF1bHRQbGFpbkdhbGxlcnk7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgLyoqXG4gICAqIE1ldGhvZCBjYWxsZWQgd2hlbiB5b3UgY2xpY2sgJ291dHNpZGUnIChpLmUuIG9uIHRoZSBzZW1pLXRyYW5zcGFyZW50IGJhY2tncm91bmQpXG4gICAqIHRvIGNsb3NlIHRoZSBtb2RhbCBnYWxsZXJ5IGlmIGBlbmFibGVDbG9zZU91dHNpZGVgIGlzIHRydWUuXG4gICAqIEBwYXJhbSBib29sZWFuIGV2ZW50IHBheWxvYWQuIFRydWUgdG8gY2xvc2UgdGhlIG1vZGFsIGdhbGxlcnfgIGZhbHNlIG90aGVyd2lzZVxuICAgKi9cbiAgb25DbGlja091dHNpZGUoZXZlbnQ6IGJvb2xlYW4pIHtcbiAgICBpZiAoZXZlbnQgJiYgdGhpcy5lbmFibGVDbG9zZU91dHNpZGUpIHtcbiAgICAgIHRoaXMuY2xvc2VHYWxsZXJ5KEFjdGlvbi5DTElDSyk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIE1ldGhvZCBjYWxsZWQgd2hlbiBhbiBpbWFnZSBpcyBsb2FkZWQgYW5kIHRoZSBsb2FkaW5nIHNwaW5uZXIgaGFzIGdvbmUuXG4gICAqIEl0IHNldHMgdGhlIHByZXZpb3VzbHlMb2FkZWQgZmxhZyBpbnNpZGUgdGhlIEltYWdlIHRvIGhpZGUgbG9hZGluZyBzcGlubmVyIHdoZW4gZGlzcGxheWVkIGFnYWluLlxuICAgKiBAcGFyYW0gSW1hZ2VMb2FkRXZlbnQgZXZlbnQgcGF5bG9hZFxuICAgKi9cbiAgb25JbWFnZUxvYWQoZXZlbnQ6IEltYWdlTG9hZEV2ZW50fgB7XG4gICAgLy8gY29uc29sZS5sb2coJ21vZGFsLWltYWdlIG9uSW1hZ2VMb2FkJywgZXZlbnQpO1xuICAgIC8vIGNvbnNvbGUubG9nKCdtb2RhbC1pbWFnZSBvbkltYWdlTG9hZCBpbWFnZXMgYmVmb3JlJywgdGhpcy5pbWFnZXMpO1xuXG4gICAgLy8gc2V0cyBhcyBwcmV2aW91c2x5IGxvYWRlZCB0aGUgaW1hZ2Ugd2l0aCBpbmRleCBzcGVjaWZpZWQgYnkgYGV2ZW50LnN0YXR1c2BcbiAgICB0aGlzLmltYWdlcyA9IHRoaXMuaW1hZ2VzLm1hcCgoaW1nOiBJbnRlcm5hbExpYkltYWdlfgA9PiB7XG4gICAgICBpZiAoaW1nICYmIGltZy5pZCA9PT0gZXZlbnQuaWQpIHtcbiAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIGltZywgeyBwcmV2aW91c2x5TG9hZGVkOiBldmVudC5zdGF0dXMgfSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gaW1nO1xuICAgIH0pO1xuXG4gICAgLy8gY29uc29sZS5sb2coJ21vZGFsLWltYWdlIG9uSW1hZ2VMb2FkIGltYWdlcyBhZnRlcicsIHRoaXMuaW1hZ2VzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBNZXRob2QgY2FsbGVkIHdoZW4gYSBkb3QgaXMgY2xpY2tlZCBhbmQgdXNlZCB0byB1cGRhdGUgdGhlIGN1cnJlbnQgaW1hZ2UuXG4gICAqIEBwYXJhbSBudW1iZXIgaW5kZXggb2YgdGhlIGNsaWNrZWQgZG90XG4gICAqL1xuICBvbkNsaWNrRG90KGluZGV4OiBudW1iZXIpIHtcbiAgICB0aGlzLmN1cnJlbnRJbWFnZSA9IHRoaXMuaW1hZ2VzW2luZGV4XTtcbiAgfVxuXG4gIC8qKlxuICAgKiBNZXRob2QgY2FsbGVkIHdoZW4gYW4gaW1hZ2UgcHJldmlldyBpcyBjbGlja2VkIGFuZCB1c2VkIHRvIHVwZGF0ZSB0aGUgY3VycmVudCBpbWFnZS5cbiAgICogQHBhcmFtIEltYWdlIHByZXZpZXcgaW1hZ2VcbiAgICovXG4gIG9uQ2xpY2tQcmV2aWV3KHByZXZpZXc6IEltYWdlfgB7XG4gICAgY29uc3QgaW1hZ2VGb3VuZDogSW50ZXJuYWxMaWJJbWFnZSB8IHVuZGVmaW5lZCA9IHRoaXMuaW1hZ2VzLmZpbmQoKGltZzogSW50ZXJuYWxMaWJJbWFnZSkgPT4gaW1nLmlkID09PSBwcmV2aWV3LmlkKTtcbiAgICBpZiAoISFpbWFnZUZvdW5kfgB7XG4gICAgICB0aGlzLmN1cnJlbnRJbWFnZSA9IDxJbnRlcm5hbExpYkltYWdlPmltYWdlRm91bmQ7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIE1ldGhvZCB0byBkb3dubG9hZCB0aGUgY3VycmVudCBpbWFnZSwgb25seSBpZiBgZG93bmxvYWRhYmxlYCBpcyB0cnVlLlxuICAgKiBJdCBjb250YWlucyBhbHNvIGEgbG9naWMgdG8gZW5hYmxlIGRvd25sb2FkaW5nIGZlYXR1cmVzIGFsc28gZm9yIElFMTEuXG4gICAqL1xuICBkb3dubG9hZEltYWdlKCkge1xuICAgIGlmICh0aGlzLmN1cnJlbnRJbWFnZUNvbmZpZyAmJiAhdGhpcy5jdXJyZW50SW1hZ2VDb25maWcuZG93bmxvYWRhYmxlfgB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIC8vIElmIElFMTEgb3IgTWljcm9zb2Z0IEVkZ2UgdXNlIG1zU2F2ZUJsb2IoLi4uKVxuICAgIGlmICh0aGlzLmlzSUVvckVkZ2Uofgkge1xuICAgICAgLy8gSSBjYW5ub3QgdXNlIGZldGNoIEFQSSBiZWNhdXNlIElFMTEgZG9lc24ndCBzdXBwb3J0IGl0LFxuICAgICAgLy8gc28gSSBoYXZlIHRvIHN3aXRjaCB0byBYTUxIdHRwUmVxdWVzdFxuICAgICAgdGhpcy5kb3dubG9hZEltYWdlT25seUlFb3JFZGdlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGZvciBhbGwgb3RoZXIgYnJvd3NlcnNcbiAgICAgIHRoaXMuZG93bmxvYWRJbWFnZUFsbEJyb3dzZXJzKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIE1ldGhvZCB0byBjbGVhbnVwIHJlc291cmNlcy4gSW4gZmFjdCwgdGhpcyB3aWxsIHJlc2V0IGtleWJvYXJkJ3Mgc2VydmljZS5cbiAgICogVGhpcyBpcyBhbiBBbmd1bGFyJ3MgbGlmZWN5Y2xlIGhvb2sgdGhhdCBpcyBjYWxsZWQgd2hlbiB0aGlzIGNvbXBvbmVudCBpcyBkZXN0cm95ZWQuXG4gICAqL1xuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLmtleWJvYXJkU2VydmljZS5yZXNldCgpO1xuXG4gICAgaWYgKHRoaXMuZ2FsbGVyeVNlcnZpY2VOYXZpZ2F0ZVN1YnNjcmlwdGlvbikge1xuICAgICAgdGhpcy5nYWxsZXJ5U2VydmljZU5hdmlnYXRlU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICAgIGlmICh0aGlzLmdhbGxlcnlTZXJ2aWNlQ2xvc2VTdWJzY3JpcHRpb24pIHtcbiAgICAgIHRoaXMuZ2FsbGVyeVNlcnZpY2VDbG9zZVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgICBpZiAodGhpcy5nYWxsZXJ5U2VydmljZVVwZGF0ZVN1YnNjcmlwdGlvbikge1xuICAgICAgdGhpcy5nYWxsZXJ5U2VydmljZVVwZGF0ZVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBQcml2YXRlIG1ldGhvZCB0byBkb3dubG9hZCB0aGUgY3VycmVudCBpbWFnZSBmb3IgYWxsIGJyb3dzZXJzIGV4Y2VwdCBmb3IgSUUxMS5cbiAgICovXG4gIHByaXZhdGUgZG93bmxvYWRJbWFnZUFsbEJyb3dzZXJzKCkge1xuICAgIGNvbnN0IGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgbGluay5ocmVmID0gPHN0cmluZz50aGlzLmN1cnJlbnRJbWFnZS5tb2RhbC5pbWc7XG4gICAgbGluay5zZXRBdHRyaWJ1dGUoJ2Rvd25sb2FkJywgdGhpcy5nZXRGaWxlTmFtZSh0aGlzLmN1cnJlbnRJbWFnZSkpO1xuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQobGluayk7XG4gICAgbGluay5jbGljaygpO1xuICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQobGluayk7XG4gIH1cblxuICAvKipcbiAgICogUHJpdmF0ZSBtZXRob2QgdG8gZG93bmxvYWQgdGhlIGN1cnJlbnQgaW1hZ2Ugb25seSBmb3IgSUUxMSB1c2luZ1xuICAgKiBjdXN0b20gamF2YXNjcmlwdCdzIG1ldGhvZHMgYXZhaWxhYmxlIG9ubHkgb24gSUUuXG4gICAqL1xuICBwcml2YXRlIGRvd25sb2FfgW1hZ2VPbmx5SUVvckVkZ2UofgB7XG4gICAgaWYgKGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCkpIHtcbiAgICAgIGNvbnN0IHJlcSA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgICAgcmVxLm9wZW4oJ0dFVCcsIDxzdHJpbmc+dGhpcy5jdXJyZW50SW1hZ2UubW9kYWwuaW1nLCB0cnVlKTtcbiAgICAgIHJlcS5yZXNwb25zZVR5cGUgPSAnYXJyYXlidWZmZXInO1xuICAgICAgcmVxLm9ubG9hZCA9IGV2ZW50ID0+IHtcbiAgICAgICAgY29uc3QgYmxvYiA9IG5ldyBCbG9iKFtyZXEucmVzcG9uc2VdLCB7IHR5cGU6ICdpbWFnZS9wbmcnIH0pO1xuICAgICAgICB3aW5kb3cubmF2aWdhdG9yLm1zU2F2ZUJsb2IoYmxvYiwgdGhpcy5nZXRGaWxlTmFtZSh0aGlzLmN1cnJlbnRJbWFnZSkpO1xuICAgICAgfTtcbiAgICAgIHJlcS5zZW5kKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFByaXZhdGUgbWV0aG9kIHRvIGdldCB0aGUgYEJ1dHRvbkV2ZW50YCB0byBlbWl0LCBtZXJnaW5nIHRoZSBpbnB1dCBgQnV0dG9uRXZlbnRgXG4gICAqIHdpdGggdGhlIGN1cnJlbnQgaW1hZ2UuXG4gICAqIEBwYXJhbSBCdXR0b25FdmVudCBldmVudCBwYXlsb2FkIHRvIHJldHVyblxuICAgKiBAcmV0dXJucyBCdXR0b25FdmVudCBldmVudCBwYXlsb2FkIHdpdGggdGhlIGN1cnJlbnQgaW1hZ2UgaW5jbHVkZWRcbiAgICovXG4gIHByaXZhdGUgZ2V0QnV0dG9uRXZlbnRUb0VtaXQoZXZlbnQ6IEJ1dHRvbkV2ZW50KTogQnV0dG9uRXZlbnQge1xuICAgIHJldHVybiBPYmplY3QuYXNzaWduKGV2ZW50LCB7IGltYWdlOiB0aGlzLmN1cnJlbnRJbWFnZSB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQcml2YXRlIG1ldGhvZCB0byBnZXQgdGhlIGZpbGUgbmFtZSBmcm9tIGFuIGlucHV0IHBhdGguXG4gICAqIFRoaXMgaXMgdXNlZCBlaXRoZXIgdG8gZ2V0IHRoZSBpbWFnZSdzIG5hbWUgZnJvbSBpdHMgcGF0aCBvciBmcm9tIHRoZSBJbWFnZSBpdHNlbGYsXG4gICAqIGlmIHNwZWNpZmllZCBhcyAnZG93bmxvYWRGaWxlTmFtZScgYnkgdGhlIHVzZXIuXG4gICAqIEBwYXJhbSBJbWFnZSBpbWFnZSB0byBleHRyYWN0IGl0cyBmaWxlIG5hbWVcbiAgICogQHJldHVybnMgc3RyaW5nIHN0cmluZyBmaWxlIG5hbWUgb2YgdGhlIGlucHV0IGltYWdlLlxuICAgKi9cbiAgcHJpdmF0ZSBnZXRGaWxlTmFtZShpbWFnZTogSW1hZ2UpOiBzdHJpbmcge1xuICAgIGlmICghaW1hZ2UubW9kYWwuZG93bmxvYWRGaWxlTmFtZSB8fCBpbWFnZS5tb2RhbC5kb3dubG9hZEZpbGVOYW1lLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuICg8c3RyaW5nPnRoaXMuY3VycmVudEltYWdlLm1vZGFsLmltZykucmVwbGFjZSgvXi4qW1xcXFxcXC9dLywgJycpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gaW1hZ2UubW9kYWwuZG93bmxvYWRGaWxlTmFtZTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUHJpdmF0ZSBtZXRob2QgdG8gaW5pdGlhbGl6ZSBgaW1hZ2VzYCBhcyBhcnJheSBvZiBgSW1hZ2Vgcy5cbiAgICogQWxzbywgaXQgd2lsbCBlbWl0IEltYWdlb3dtb2RhTW9kYWxFdmVudCB0byBzYXkgdGhhdCBpbWFnZXMgYXJlIGxvYWRlZC5cbiAgICovXG4gIHByaXZhdGUgaW5pdEltYWdlcygpIHtcbiAgICB0aGlzLmltYWdlcyA9IDxJbnRlcm5hbExpYkltYWdlW10+dGhpcy5tb2RhbEltYWdlcztcbiAgICB0aGlzLmhhc0RhdGEuZW1pdChuZXcgSW1hZ2VNb2RhbEV2ZW50KEFjdGlvbi5MT0FELCB0cnVlfgk7XG4gICAgdGhpcy5zaG93R2FsbGVyeSA9IHRoaXMuaW1hZ2VzLmxlbmd0aCA+IDA7XG4gIH1cblxuICAvKipcbiAgICogUHJpdmF0ZSBtZXRob2QgdG8gZW1pdCBldmVudHMgd2hlbiBlaXRoZXIgdGhlIGxhc3Qgb3IgdGhlIGZpcnN0IGltYWdlIGFyZSB2aXNpYmxlLlxuICAgKiBAcGFyYW0gYWN0aW9uIEVudW0gb2YgdHlwZSBBY3Rpb24gdGhhdCByZXByZXNlbnRzIHRoZSBzb3VyY2Ugb2YgdGhlIGV2ZW50IHRoYXQgY2hhbmdlZCB0aGVcbiAgICogIGN1cnJlbnQgaW1hZ2UgdG8gdGhlIGZpcnN0IG9uZSBvciB0aGUgbGFzdCBvbmUuXG4gICAqIEBwYXJhbSBpbmRleFRvQ2hlY2sgaXMgdGhlIGluZGV4IG51bWJlciBvZiB0aGUgaW1hZ2UgKHRoZSBmaXJzdCBvciB0aGUgbGFzdCBvbmUpLlxuICAgKi9cbiAgcHJpdmF0ZSBlbWl0Qm91bmRhcnlFdmVudChhY3Rpb246IEFjdGlvbiwgaW5kZXhUb0NoZWNrOiBudW1iZXIpIHtcbiAgICAvLyB0byBlbWl0IGZpcnN0L2xhc3QgZXZlbnRcbiAgICBzd2l0Y2ggKGluZGV4VG9DaGVjaykge1xuICAgICAgY2FzZSAwOlxuICAgICAgICB0aGlzLmZpcnN0SW1hZ2UuZW1pdChuZXcgSW1hZ2VNb2RhbEV2ZW50KGFjdGlvbiwgdHJ1ZSkpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgdGhpcy5pbWFnZXMubGVuZ3RoIC0gMTpcbiAgICAgICAgdGhpcy5sYXN0SW1hZ2UuZW1pdChuZXcgSW1hZ2VNb2RhbEV2ZW50KGFjdGlvbiwgdHJ1ZSkpO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUHJpdmF0ZSBtZXRob2QgdG8gY2hlY2sgaWYgdGhpcyBsaWJyYXJ5IGlzIHJ1bm5pbmcgb25cbiAgICogTWljcm9zb2Z0IGJyb3dzZXJzIG9yIG5vdCAoaS5lLiBpdCBkZXRlY3RzIGJvdGggSUUxMSBhbmQgRWRnZSlcbiAgICogc3VwcG9ydGluZyBhbHNvIFNlcnZlci1TaWRlIFJlbmRlcmluZy5cbiAgICogSW5zcGlyZWQgYnkgaHR0cHM6Ly9tc2RuLm1pY3Jvc29mdC5jb20vaXQtaXQvbGlicmFyeS9oaDc3OTAxNih2PXZzLjg1fg5hc3B4XG4gICAqIEByZXR1cm5zIGFueSB0aGUgcmVzdWx0XG4gICAqL1xuICBwcml2YXRlIGlzSUVvckVkZ2UoKTogYW55IHtcbiAgICBpZiAoaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkfgkge1xuICAgICAgLy8gaWYgYm90aCBCbG9iIGNvbnN0cnVjdG9yIGFuZCBtc1NhdmVPck9wZW5CbG9iIGFyZSBzdXBwb3J0ZWQgYnkgdGhlIGN1cnJlbnQgYnJvd3NlclxuICAgICAgcmV0dXJuIHdpbmRvdy5CbG9iICYmIHdpbmRvdy5uYXZpZ2F0b3IubXNTYXZlT3JPcGVuQmxvYjtcbiAgICB9XG4gICAgaWYgKGlzUGxhdGZvcm1TZXJ2ZXIodGhpcy5wbGF0Zm9ybUlkfgkge1xuICAgICAgLy8gc2VydmVyIG9ubHlcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxufVxuIl19