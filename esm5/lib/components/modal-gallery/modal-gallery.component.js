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
var ModalGalleryComponent = /** @class */ (function () {
    /**
     * Constructor with the injection of ´KeyboardService´ and an object to support Server-Side Rendering.
     */
    function ModalGalleryComponent(keyboardService, galleryService, platformId, changeDetectorRef) {
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
     */
    /**
     * HostListener to catch browser's back button and destroy the gallery.
     * This prevents weired behaviour about scrolling.
     * Added to fix this issue: https://github.com/fg96/angular-modal-gallery/issues/159
     * @param {?} e
     * @return {?}
     */
    ModalGalleryComponent.prototype.onPopState = /**
     * HostListener to catch browser's back button and destroy the gallery.
     * This prevents weired behaviour about scrolling.
     * Added to fix this issue: https://github.com/fg96/angular-modal-gallery/issues/159
     * @param {?} e
     * @return {?}
     */
    function (e) {
        this.closeGallery();
    };
    /**
     * Method ´ngOnInit´ to init images calling `initImages()`.
     * This is an Angular's lifecycle hook, so its called automatically by Angular itself.
     * In particular, it's called only one time!!!
     */
    /**
     * Method ´ngOnInit´ to init images calling `initImages()`.
     * This is an Angular's lifecycle hook, so its called automatically by Angular itself.
     * In particular, it's called only one time!!!
     * @return {?}
     */
    ModalGalleryComponent.prototype.ngOnInit = /**
     * Method ´ngOnInit´ to init images calling `initImages()`.
     * This is an Angular's lifecycle hook, so its called automatically by Angular itself.
     * In particular, it's called only one time!!!
     * @return {?}
     */
    function () {
        var _this = this;
        // id is a mandatory input and must a number > 0
        if ((!this.id && this.id !== 0) || this.id < 0) {
            throw new Error("'[id]=\"a number >= 0\"' is a mandatory input from 6.0.0 in angular-modal-gallery." +
                "If you are using multiple instances of this library, please be sure to use different ids");
        }
        // call initImages to init images and to emit `hasData` event
        this.initImages();
        this.galleryServiceNavigateSubscription = this.galleryService.navigate.subscribe(function (payload) {
            if (!payload) {
                return;
            }
            // if galleryId is not valid OR galleryId is related to another instance and not this one
            if (payload.galleryId === undefined || payload.galleryId < 0 || payload.galleryId !== _this.id) {
                return;
            }
            // if image index is not valid
            if (payload.index < 0 || payload.index > _this.images.length) {
                return;
            }
            _this.showModalGallery(payload.index, true);
        });
        this.galleryServiceCloseSubscription = this.galleryService.close.subscribe(function (galleryId) {
            if (galleryId < 0 || _this.id !== galleryId) {
                return;
            }
            _this.closeGallery(Action.NORMAL, true);
        });
        this.galleryServiceUpdateSubscription = this.galleryService.update.subscribe(function (payload) {
            if (!payload) {
                return;
            }
            // if galleryId is not valid OR galleryId is related to another instance and not this one
            if (payload.galleryId === undefined || payload.galleryId < 0 || payload.galleryId !== _this.id) {
                return;
            }
            // if either image index or image are not valid
            if (payload.index < 0 || payload.index > _this.images.length || !payload.image) {
                return;
            }
            /** @type {?} */
            var currentIndex = getIndex(payload.image, _this.images);
            _this.images = _this.images.map(function (image, index) {
                if (index === payload.index) {
                    return /** @type {?} */ (payload.image);
                }
                return image;
            });
            if (currentIndex === payload.index) {
                _this.currentImage = _this.images[payload.index];
            }
            _this.changeDetectorRef.markForCheck();
        });
    };
    /**
     * Method ´ngOnChanges´ to re-init images if input is changed.
     * This is an Angular's lifecycle hook, so its called automatically by Angular itself.
     * In particular, it's called before `ngOnInit()` and whenever one or more data-bound input properties change.
     * @param changes `SimpleChanges` object of current and previous property values provided by Angular.
     */
    /**
     * Method ´ngOnChanges´ to re-init images if input is changed.
     * This is an Angular's lifecycle hook, so its called automatically by Angular itself.
     * In particular, it's called before `ngOnInit()` and whenever one or more data-bound input properties change.
     * @param {?} changes `SimpleChanges` object of current and previous property values provided by Angular.
     * @return {?}
     */
    ModalGalleryComponent.prototype.ngOnChanges = /**
     * Method ´ngOnChanges´ to re-init images if input is changed.
     * This is an Angular's lifecycle hook, so its called automatically by Angular itself.
     * In particular, it's called before `ngOnInit()` and whenever one or more data-bound input properties change.
     * @param {?} changes `SimpleChanges` object of current and previous property values provided by Angular.
     * @return {?}
     */
    function (changes) {
        /** @type {?} */
        var imagesChange = changes["modalImages"];
        /** @type {?} */
        var plainGalleryConfigChange = changes["plainGalleryConfig"];
        if (imagesChange && !imagesChange.firstChange && imagesChange.previousValue !== imagesChange.currentValue) {
            this.initImages();
        }
        if (plainGalleryConfigChange) {
            /** @type {?} */
            var currPlainGalleryConfigChange = plainGalleryConfigChange.currentValue;
            if (currPlainGalleryConfigChange.layout &&
                currPlainGalleryConfigChange.layout instanceof AdvancedLayout &&
                currPlainGalleryConfigChange.layout.modalOpenerByIndex !== -1) {
                // console.log('opening modal gallery from custom plain gallery, index: ', currPlainGalleryConfigChange);
                this.showModalGallery(currPlainGalleryConfigChange.layout.modalOpenerByIndex);
            }
        }
    };
    /**
     * Method called by custom upper buttons.
     * @param ButtonEvent event payload
     */
    /**
     * Method called by custom upper buttons.
     * @param {?} event
     * @return {?}
     */
    ModalGalleryComponent.prototype.onCustomEmit = /**
     * Method called by custom upper buttons.
     * @param {?} event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var eventToEmit = this.getButtonEventToEmit(event);
        this.buttonBeforeHook.emit(eventToEmit);
        // console.log('on onCustomEmit', eventToEmit);
        this.buttonAfterHook.emit(eventToEmit);
    };
    // TODO implement on refresh
    // /**
    //  * Method called by the refresh upper button.
    //  * STILL NOT IMPLEMENTED, SO DON'T USE IT
    //  * @param ButtonEvent event payload
    //  */
    // onRefresh(event: ButtonEvent) {
    //   const eventToEmit: ButtonEvent = this.getButtonEventToEmit(event);
    //
    //   this.buttonBeforeHook.emit(eventToEmit);
    //   // console.log('TODO implement on refresh inside the library', eventToEmit);
    //
    //   this.currentImage = Object.assign({}, this.currentImage, { previouslyLoaded: false });
    //
    //   // TODO add logic to hide and show the current image
    //
    //   // console.log('onRefresh', this.currentImage);
    //
    //   // const indexNum: number = this.currentImageComponent.getIndex();
    //
    //   // this.images = this.images.map((val: InternalLibImage, index: number) => {
    //   //   if (index !== 2) {
    //   //     return val;
    //   //   } else {
    //   //     const img: InternalLibImage = Object.assign({}, val, {previouslyLoaded: false});
    //   //     return img;
    //   //   }
    //   // });
    //   //
    //   // this.closeGallery();
    //   // this.showModalGallery(2);
    //
    //   this.buttonAfterHook.emit(eventToEmit);
    // }
    /**
     * Method called by the full-screen upper button.
     * @param ButtonEvent event payload
     */
    /**
     * Method called by the full-screen upper button.
     * @param {?} event
     * @return {?}
     */
    ModalGalleryComponent.prototype.onFullScreen = /**
     * Method called by the full-screen upper button.
     * @param {?} event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var eventToEmit = this.getButtonEventToEmit(event);
        this.buttonBeforeHook.emit(eventToEmit);
        /** @type {?} */
        var doc = /** @type {?} */ (document);
        /** @type {?} */
        var docEl = /** @type {?} */ (document.documentElement);
        /** @type {?} */
        var fullscreenDisabled = !doc.fullscreenElement && !doc.webkitFullscreenElement && !doc.mozFullScreenElement && !doc.msFullscreenElement;
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
    };
    /**
     * Method called by the delete upper button.
     * @param ButtonEvent event payload
     */
    /**
     * Method called by the delete upper button.
     * @param {?} event
     * @return {?}
     */
    ModalGalleryComponent.prototype.onDelete = /**
     * Method called by the delete upper button.
     * @param {?} event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var eventToEmit = this.getButtonEventToEmit(event);
        this.buttonBeforeHook.emit(eventToEmit);
        if (this.images.length === 1) {
            this.closeGallery();
        }
        /** @type {?} */
        var imageIndexToDelete = this.currentImageComponent.getIndexToDelete(event.image);
        if (imageIndexToDelete === this.images.length - 1) {
            // last image
            this.currentImageComponent.prevImage();
        }
        else {
            this.currentImageComponent.nextImage();
        }
        this.buttonAfterHook.emit(eventToEmit);
    };
    /**
     * Method called by the navigate upper button.
     * @param ButtonEvent event payload
     */
    /**
     * Method called by the navigate upper button.
     * @param {?} event
     * @return {?}
     */
    ModalGalleryComponent.prototype.onNavigate = /**
     * Method called by the navigate upper button.
     * @param {?} event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var eventToEmit = this.getButtonEventToEmit(event);
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
    };
    /**
     * Method called by the download upper button.
     * @param ButtonEvent event payload
     */
    /**
     * Method called by the download upper button.
     * @param {?} event
     * @return {?}
     */
    ModalGalleryComponent.prototype.onDownload = /**
     * Method called by the download upper button.
     * @param {?} event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var eventToEmit = this.getButtonEventToEmit(event);
        this.buttonBeforeHook.emit(eventToEmit);
        this.downloadImage();
        this.buttonAfterHook.emit(eventToEmit);
    };
    /**
     * Method called by the close upper button.
     * @param ButtonEvent event payload
     * @param Action action that triggered the close method. `Action.NORMAL` by default
     */
    /**
     * Method called by the close upper button.
     * @param {?} event
     * @param {?=} action
     * @return {?}
     */
    ModalGalleryComponent.prototype.onCloseGallery = /**
     * Method called by the close upper button.
     * @param {?} event
     * @param {?=} action
     * @return {?}
     */
    function (event, action) {
        if (action === void 0) { action = Action.NORMAL; }
        /** @type {?} */
        var eventToEmit = this.getButtonEventToEmit(event);
        this.buttonBeforeHook.emit(eventToEmit);
        this.closeGallery(action);
        this.buttonAfterHook.emit(eventToEmit);
    };
    /**
     * Method to close the modal gallery specifying the action.
     * It also reset the `keyboardService` to prevent multiple listeners.
     * @param Action action type. `Action.NORMAL` by default
     * @param boolean isCalledByService is true if called by gallery.service, otherwise false
     */
    /**
     * Method to close the modal gallery specifying the action.
     * It also reset the `keyboardService` to prevent multiple listeners.
     * @param {?=} action
     * @param {?=} isCalledByService
     * @return {?}
     */
    ModalGalleryComponent.prototype.closeGallery = /**
     * Method to close the modal gallery specifying the action.
     * It also reset the `keyboardService` to prevent multiple listeners.
     * @param {?=} action
     * @param {?=} isCalledByService
     * @return {?}
     */
    function (action, isCalledByService) {
        if (action === void 0) { action = Action.NORMAL; }
        if (isCalledByService === void 0) { isCalledByService = false; }
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
    };
    /**
     * Method called when you click on an image of your plain (or inline) gallery.
     * @param number index of the clicked image
     */
    /**
     * Method called when you click on an image of your plain (or inline) gallery.
     * @param {?} index
     * @return {?}
     */
    ModalGalleryComponent.prototype.onShowModalGallery = /**
     * Method called when you click on an image of your plain (or inline) gallery.
     * @param {?} index
     * @return {?}
     */
    function (index) {
        this.showModalGallery(index);
    };
    /**
     * Method to show the modal gallery displaying the image with
     * the index specified as input parameter.
     * It will also register a new `keyboardService` to catch keyboard's events to download the current
     * image with keyboard's shortcuts. This service, will be removed either when modal gallery component
     * will be destroyed or when the gallery is closed invoking the `closeGallery` method.
     * @param number index of the image to show
     * @param boolean isCalledByService is true if called by gallery.service, otherwise false
     */
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
    ModalGalleryComponent.prototype.showModalGallery = /**
     * Method to show the modal gallery displaying the image with
     * the index specified as input parameter.
     * It will also register a new `keyboardService` to catch keyboard's events to download the current
     * image with keyboard's shortcuts. This service, will be removed either when modal gallery component
     * will be destroyed or when the gallery is closed invoking the `closeGallery` method.
     * @param {?} index
     * @param {?=} isCalledByService
     * @return {?}
     */
    function (index, isCalledByService) {
        var _this = this;
        if (isCalledByService === void 0) { isCalledByService = false; }
        // hides scrollbar
        document.body.style.overflow = 'hidden';
        this.keyboardService.add(function (event, combo) {
            if (event.preventDefault) {
                event.preventDefault();
            }
            else {
                // internet explorer
                event.returnValue = false;
            }
            _this.downloadImage();
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
    };
    /**
     * Method called when the image changes and used to update the `currentImage` object.
     * @param ImageModalEvent event payload
     */
    /**
     * Method called when the image changes and used to update the `currentImage` object.
     * @param {?} event
     * @return {?}
     */
    ModalGalleryComponent.prototype.onChangeCurrentImage = /**
     * Method called when the image changes and used to update the `currentImage` object.
     * @param {?} event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var newIndex = /** @type {?} */ (event.result);
        // TODO add validation
        this.currentImage = this.images[newIndex];
        // emit first/last event based on newIndex value
        this.emitBoundaryEvent(event.action, newIndex);
        // emit current visible image index
        this.show.emit(new ImageModalEvent(event.action, newIndex + 1));
    };
    /**
     * @return {?}
     */
    ModalGalleryComponent.prototype.isPlainGalleryVisible = /**
     * @return {?}
     */
    function () {
        if (this.plainGalleryConfig && this.plainGalleryConfig.layout && this.plainGalleryConfig.layout instanceof AdvancedLayout) {
            return !this.plainGalleryConfig.layout.hideDefaultPlainGallery;
        }
        return true;
    };
    /**
     * Method called when you click 'outside' (i.e. on the semi-transparent background)
     * to close the modal gallery if `enableCloseOutside` is true.
     * @param boolean event payload. True to close the modal gallery, false otherwise
     */
    /**
     * Method called when you click 'outside' (i.e. on the semi-transparent background)
     * to close the modal gallery if `enableCloseOutside` is true.
     * @param {?} event
     * @return {?}
     */
    ModalGalleryComponent.prototype.onClickOutside = /**
     * Method called when you click 'outside' (i.e. on the semi-transparent background)
     * to close the modal gallery if `enableCloseOutside` is true.
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (event && this.enableCloseOutside) {
            this.closeGallery(Action.CLICK);
        }
    };
    /**
     * Method called when an image is loaded and the loading spinner has gone.
     * It sets the previouslyLoaded flag inside the Image to hide loading spinner when displayed again.
     * @param ImageLoadEvent event payload
     */
    /**
     * Method called when an image is loaded and the loading spinner has gone.
     * It sets the previouslyLoaded flag inside the Image to hide loading spinner when displayed again.
     * @param {?} event
     * @return {?}
     */
    ModalGalleryComponent.prototype.onImageLoad = /**
     * Method called when an image is loaded and the loading spinner has gone.
     * It sets the previouslyLoaded flag inside the Image to hide loading spinner when displayed again.
     * @param {?} event
     * @return {?}
     */
    function (event) {
        // console.log('modal-image onImageLoad', event);
        // console.log('modal-image onImageLoad images before', this.images);
        // sets as previously loaded the image with index specified by `event.status`
        this.images = this.images.map(function (img) {
            if (img && img.id === event.id) {
                return Object.assign({}, img, { previouslyLoaded: event.status });
            }
            return img;
        });
        // console.log('modal-image onImageLoad images after', this.images);
    };
    /**
     * Method called when a dot is clicked and used to update the current image.
     * @param number index of the clicked dot
     */
    /**
     * Method called when a dot is clicked and used to update the current image.
     * @param {?} index
     * @return {?}
     */
    ModalGalleryComponent.prototype.onClickDot = /**
     * Method called when a dot is clicked and used to update the current image.
     * @param {?} index
     * @return {?}
     */
    function (index) {
        this.currentImage = this.images[index];
    };
    /**
     * Method called when an image preview is clicked and used to update the current image.
     * @param Image preview image
     */
    /**
     * Method called when an image preview is clicked and used to update the current image.
     * @param {?} preview
     * @return {?}
     */
    ModalGalleryComponent.prototype.onClickPreview = /**
     * Method called when an image preview is clicked and used to update the current image.
     * @param {?} preview
     * @return {?}
     */
    function (preview) {
        /** @type {?} */
        var imageFound = this.images.find(function (img) { return img.id === preview.id; });
        if (!!imageFound) {
            this.currentImage = /** @type {?} */ (imageFound);
        }
    };
    /**
     * Method to download the current image, only if `downloadable` is true.
     * It contains also a logic to enable downloading features also for IE11.
     */
    /**
     * Method to download the current image, only if `downloadable` is true.
     * It contains also a logic to enable downloading features also for IE11.
     * @return {?}
     */
    ModalGalleryComponent.prototype.downloadImage = /**
     * Method to download the current image, only if `downloadable` is true.
     * It contains also a logic to enable downloading features also for IE11.
     * @return {?}
     */
    function () {
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
    };
    /**
     * Method to cleanup resources. In fact, this will reset keyboard's service.
     * This is an Angular's lifecycle hook that is called when this component is destroyed.
     */
    /**
     * Method to cleanup resources. In fact, this will reset keyboard's service.
     * This is an Angular's lifecycle hook that is called when this component is destroyed.
     * @return {?}
     */
    ModalGalleryComponent.prototype.ngOnDestroy = /**
     * Method to cleanup resources. In fact, this will reset keyboard's service.
     * This is an Angular's lifecycle hook that is called when this component is destroyed.
     * @return {?}
     */
    function () {
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
    };
    /**
     * Private method to download the current image for all browsers except for IE11.
     * @return {?}
     */
    ModalGalleryComponent.prototype.downloadImageAllBrowsers = /**
     * Private method to download the current image for all browsers except for IE11.
     * @return {?}
     */
    function () {
        /** @type {?} */
        var link = document.createElement('a');
        link.href = /** @type {?} */ (this.currentImage.modal.img);
        link.setAttribute('download', this.getFileName(this.currentImage));
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    /**
     * Private method to download the current image only for IE11 using
     * custom javascript's methods available only on IE.
     * @return {?}
     */
    ModalGalleryComponent.prototype.downloadImageOnlyIEorEdge = /**
     * Private method to download the current image only for IE11 using
     * custom javascript's methods available only on IE.
     * @return {?}
     */
    function () {
        var _this = this;
        if (isPlatformBrowser(this.platformId)) {
            /** @type {?} */
            var req_1 = new XMLHttpRequest();
            req_1.open('GET', /** @type {?} */ (this.currentImage.modal.img), true);
            req_1.responseType = 'arraybuffer';
            req_1.onload = function (event) {
                /** @type {?} */
                var blob = new Blob([req_1.response], { type: 'image/png' });
                window.navigator.msSaveBlob(blob, _this.getFileName(_this.currentImage));
            };
            req_1.send();
        }
    };
    /**
     * Private method to get the `ButtonEvent` to emit, merging the input `ButtonEvent`
     * with the current image.
     * @param {?} event
     * @return {?} ButtonEvent event payload with the current image included
     */
    ModalGalleryComponent.prototype.getButtonEventToEmit = /**
     * Private method to get the `ButtonEvent` to emit, merging the input `ButtonEvent`
     * with the current image.
     * @param {?} event
     * @return {?} ButtonEvent event payload with the current image included
     */
    function (event) {
        return Object.assign(event, { image: this.currentImage });
    };
    /**
     * Private method to get the file name from an input path.
     * This is used either to get the image's name from its path or from the Image itself,
     * if specified as 'downloadFileName' by the user.
     * @param {?} image
     * @return {?} string string file name of the input image.
     */
    ModalGalleryComponent.prototype.getFileName = /**
     * Private method to get the file name from an input path.
     * This is used either to get the image's name from its path or from the Image itself,
     * if specified as 'downloadFileName' by the user.
     * @param {?} image
     * @return {?} string string file name of the input image.
     */
    function (image) {
        if (!image.modal.downloadFileName || image.modal.downloadFileName.length === 0) {
            return (/** @type {?} */ (this.currentImage.modal.img)).replace(/^.*[\\\/]/, '');
        }
        else {
            return image.modal.downloadFileName;
        }
    };
    /**
     * Private method to initialize `images` as array of `Image`s.
     * Also, it will emit ImageowmodaModalEvent to say that images are loaded.
     * @return {?}
     */
    ModalGalleryComponent.prototype.initImages = /**
     * Private method to initialize `images` as array of `Image`s.
     * Also, it will emit ImageowmodaModalEvent to say that images are loaded.
     * @return {?}
     */
    function () {
        this.images = /** @type {?} */ (this.modalImages);
        this.hasData.emit(new ImageModalEvent(Action.LOAD, true));
        this.showGallery = this.images.length > 0;
    };
    /**
     * Private method to emit events when either the last or the first image are visible.
     * @param {?} action Enum of type Action that represents the source of the event that changed the
     *  current image to the first one or the last one.
     * @param {?} indexToCheck is the index number of the image (the first or the last one).
     * @return {?}
     */
    ModalGalleryComponent.prototype.emitBoundaryEvent = /**
     * Private method to emit events when either the last or the first image are visible.
     * @param {?} action Enum of type Action that represents the source of the event that changed the
     *  current image to the first one or the last one.
     * @param {?} indexToCheck is the index number of the image (the first or the last one).
     * @return {?}
     */
    function (action, indexToCheck) {
        // to emit first/last event
        switch (indexToCheck) {
            case 0:
                this.firstImage.emit(new ImageModalEvent(action, true));
                break;
            case this.images.length - 1:
                this.lastImage.emit(new ImageModalEvent(action, true));
                break;
        }
    };
    /**
     * Private method to check if this library is running on
     * Microsoft browsers or not (i.e. it detects both IE11 and Edge)
     * supporting also Server-Side Rendering.
     * Inspired by https://msdn.microsoft.com/it-it/library/hh779016(v=vs.85).aspx
     * @return {?} any the result
     */
    ModalGalleryComponent.prototype.isIEorEdge = /**
     * Private method to check if this library is running on
     * Microsoft browsers or not (i.e. it detects both IE11 and Edge)
     * supporting also Server-Side Rendering.
     * Inspired by https://msdn.microsoft.com/it-it/library/hh779016(v=vs.85).aspx
     * @return {?} any the result
     */
    function () {
        if (isPlatformBrowser(this.platformId)) {
            // if both Blob constructor and msSaveOrOpenBlob are supported by the current browser
            return window.Blob && window.navigator.msSaveOrOpenBlob;
        }
        if (isPlatformServer(this.platformId)) {
            // server only
            return true;
        }
    };
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
    ModalGalleryComponent.ctorParameters = function () { return [
        { type: KeyboardService },
        { type: GalleryService },
        { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] },
        { type: ChangeDetectorRef }
    ]; };
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
    return ModalGalleryComponent;
}());
export { ModalGalleryComponent };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwtZ2FsbGVyeS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9tb2RhbC1hbmd1bGFyLWdhbGxlcnkvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9tb2RhbC1nYWxsZXJ5L21vZGFsLWdhbGxlcnkuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXdCQSxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsWUFBWSxFQUNaLFlBQVfgRUFDWixNQUFNLEVBQ04sS0FBSyxFQUlMLE1BQU0sRUFDTixXQUFXLEVBR1gsU0FBUyxFQUNWLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBR3RFLE9BQU8sRUFBUyxlQUFlLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUNqRSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFLakQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ2xFLE9BQU8sRUFBRSxjQUFjLEVBQTBCLE1BQU0sZ0NBQWdDLENBQUM7QUFFeEYsT0FBTyxFQUFFLHFCQUFxQixFQUFrQixNQUFNLDBDQUEwQyxDQUFDO0FBRWpHLE9BQU8sRUFBRSxjQUFjLEVBQXNCLE1BQU0sNENBQTRDLENBQUM7QUFDaEcsT0FBTyxFQUFFLCtCQUErQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFHM0UsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLHdCQUF3QixDQUFDOzs7OztJQXdKaEQ7O09BRUc7SUFDSCwrQkFDVSxpQkFDQSxnQkFDcUIsVUFBa0IsRUFDdkM7UUFIQSxvQkFBZSxHQUFmLGVBQWU7UUFDZixtQkFBYyxHQUFkLGNBQWM7UUFDTyxlQUFVLEdBQVYsVUFBVSxDQUFRO1FBQ3ZDLHNCQUFpQixHQUFqQixpQkFBaUI7Ozs7O2tDQTVITixJQUFJOzs7OzJCQXVCRTtZQUN6QixRQUFRLEVBQUUsS0FBSztZQUNmLFlBQVfgRUFBRSxFQUFFLElBQUfgRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLEVBQUU7U0FDdkU7Ozs7O21DQU0wQywrQkFBK0I7Ozs7cUJBZ0JuQyxJQUFJLFlBQVfgRUFBbUI7Ozs7b0JBS3BDLElBQUfgWUFBWSxFQUFtQjs7OzswQkFLN0IsSUFBSSxZQUFZLEVBQW1COzs7O3lCQUtwQyxJQUFJLFlBQVfgRUFBbUI7Ozs7dUJBS3JDLElBQUfgWUFBWSxFQUFtQjs7OztnQ0FLOUIsSUFBSSxZQUFZLEVBQWU7Ozs7K0JBS2hDLElBQUfgWUFBWSxFQUFlOzs7O3NCQVduRSxLQUFLOzs7OzJCQUlBLEtBQUs7S0FnQ2Y7SUFsQko7Ozs7T0FJRzs7Ozs7Ozs7SUFFSCwwQ0FBVTs7Ozs7OztJQURWLFVBQ1csQ0FBUTtRQUNqQixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7S0FDckI7SUFZRDs7OztPQUlHOzs7Ozs7O0lBQ0gsd0NBQVE7Ozs7OztJQUFSO1FBQUEsaUJBMERDOztRQXhEQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLElBQUfgQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLElBQUfgSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLEVBQUU7WUFDOUMsTUFBTSxJQUFJLEtBQUssQ0FDYixvRkFBa0Y7Z0JBQ2hGLDBGQUEwRixDQUM3RixDQUFDO1NBQ0g7O1FBR0QsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBRWxCLElBQUfgQ0FBQyxrQ0FBa0MsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsVUFBQyxPQUErQjtZQUMvRyxJQUFJLENBQUMsT0FBTyxFQUFFO2dCQUNaLE9BQU87YUFDUjs7WUFFRCxJQUFJLE9BQU8sQ0FBQyxTQUFTLEtBQUssU0FBUyxJQUFJLE9BQU8sQ0FBQyxTQUFTLEdBQUcsQ0FBQyxJQUFJLE9BQU8sQ0FBQyxTQUFTLEtBQUssS0FBSSxDQUFDLEVBQUUsRUFBRTtnQkFDN0YsT0FBTzthQUNSOztZQUVELElBQUfgT0FBTyxDQUFDLEtBQUssR0FBRyxDQUFDLElBQUfgT0FBTyxDQUFDLEtBQUssR0FBRyxLQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRTtnQkFDM0QsT0FBTzthQUNSO1lBQ0QsS0FBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDNUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLCtCQUErQixHQUFHLElBQUfgQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxVQUFDLFNBQWlCO1lBQzNGLElBQUfgU0FBUyxHQUFHLENBQUMsSUFBSSxLQUFJLENBQUMsRUFBRSxLQUFLLFNBQVMsRUFBRTtnQkFDMUMsT0FBTzthQUNSO1lBQ0QsS0FBSSxDQUFDLFlBQVfgQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLElBQUfgQ0FBQyxDQUFDO1NBQ3hDLENBQUMsQ0FBQztRQUVILElBQUfgQ0FBQyxnQ0FBZ0MsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsVUFBQyxPQUErQjtZQUMzRyxJQUFJLENBQUMsT0FBTyxFQUFFO2dCQUNaLE9BQU87YUFDUjs7WUFFRCxJQUFJLE9BQU8sQ0FBQyxTQUFTLEtBQUssU0FBUyxJQUFJLE9BQU8sQ0FBQyxTQUFTLEdBQUcsQ0FBQyxJQUFJLE9BQU8sQ0FBQyxTQUFTLEtBQUssS0FBSSxDQUFDLEVBQUUsRUFBRTtnQkFDN0YsT0FBTzthQUNSOztZQUVELElBQUfgT0FBTyxDQUFDLEtBQUssR0FBRyxDQUFDLElBQUfgT0FBTyxDQUFDLEtBQUssR0FBRyxLQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUU7Z0JBQzdFLE9BQU87YUFDUjs7WUFDRCxJQUFNLFlBQVfgR0FB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TSxFQUFFLElBQUfgQ0FBQyxDQUFDLENBQUM7UUFDbkQsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDcEIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLEVBQUUsQ0FBQzs7UUFHN0IsUUFBUSxDQUFDLElBQUfgQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLFNBQVMsQ0FBQztRQUV6QyxJQUFJLGlCQUFpQixFQUFFOzs7WUFHckIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFlBQVfgRUFBRSxDQUFDO1NBQ3ZDO0tBQ0Y7SUFFRDs7O09BR0c7Ozs7OztJQUNILGtEQUFrQjs7Ozs7SUFBbEIsVUFBbUIsS0FBYTtRQUM5QixJQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDOUI7SUFFRDs7Ozs7Ozs7T0FRRzs7Ozs7Ozs7Ozs7SUFDSCxnREFBZ0I7Ozs7Ozs7Ozs7SUFBaEIsVUFBaUIsS0FBYSxFQUFFLGlCQUFrQztRQUFsRSxpQkF5QkM7UUF6QitCLGtDQUFBLEVBQUEseUJBQWtDOztRQUVoRSxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1FBRXhDLElBQUfgQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLFVBQUMsS0FBb0IsRUFBRSxLQUFhO1lBQzNELElBQUfgS0FBSyxDQUFDLGNBQWMsRUFBRTtnQkFDeEIsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO2FBQ3hCO2lCQUFNOztnQkFFTCxLQUFLLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQzthQUMzQjtZQUNELEtBQUfgQ0FBQyxhQUFhLEVBQUUsQ0FBQztTQUN0QixDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUfgQ0FBQztRQUNuQixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUfgQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7O1FBR3ZDLElBQUfgQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUfgZUFBZSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFNUQsSUFBSSxpQkFBaUIsRUFBRTs7O1lBR3JCLElBQUfgQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLEVBQUUsQ0FBQztTQUN2QztLQUNGO0lBRUQ7OztPQUdHOzs7Ozs7SUFDSCxvREFBb0I7Ozs7O0lBQXBCLFVBQXFCLEtBQXNCOztRQUN6QyxJQUFNLFFBQVEscUJBQW1CLEtBQUssQ0FBQyxNQUFNLEVBQUM7O1FBRzlDLElBQUfgQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQzs7UUFHMUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUM7O1FBRy9DLElBQUfgQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUfgZUFBZSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsUUFBUSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDakU7Ozs7SUFFRCxxREFBcUI7OztJQUFyQjtRQUNFLElBQUfgSUFBSSxDQUFDLGtCQUFrQixJQUFJLElBQUfgQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLElBQUfgSUFBSSxDQUFDLGtCQUFrQixDQUFDLE1BQU0sWUFBWSxjQUFjLEVBQUU7WUFDekgsT0FBTyxDQUFDLElBQUfgQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLENBQUMsdUJBQXVCLENBQUM7U0FDaEU7UUFDRCxPQUFPLElBQUfgQ0FBQztLQUNiO0lBRUQ7Ozs7T0FJRzs7Ozs7OztJQUNILDhDQUFjOzs7Ozs7SUFBZCxVQUFlLEtBQWM7UUFDM0IsSUFBSSxLQUFLLElBQUfgSUFBSSxDQUFDLGtCQUFrQixFQUFFO1lBQ3BDLElBQUfgQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ2pDO0tBQ0Y7SUFFRDs7OztPQUlHOzs7Ozs7O0lBQ0gsMkNBQVc7Ozs7OztJQUFYLFVBQVfgS0FBcUI7Ozs7UUFLL0IsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFDLEdBQXFCO1lBQ2xELElBQUfgR0FBRyxJQUFJLEdBQUcsQ0FBQyxFQUFFLEtBQUssS0FBSyxDQUFDLEVBQUUsRUFBRTtnQkFDOUIsT0FBTyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxnQkFBZ0IsRUFBRSxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQzthQUNuRTtZQUNELE9BQU8sR0FBRyxDQUFDO1NBQ1osQ0FBQyxDQUFDOztLQUdKO0lBRUQ7OztPQUdHOzs7Ozs7SUFDSCwwQ0FBVTs7Ozs7SUFBVixVQUFXLEtBQWE7UUFDdEIsSUFBSSxDQUFDLFlBQVfgR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQ3hDO0lBRUQ7OztPQUdHOzs7Ozs7SUFDSCw4Q0FBYzs7Ozs7SUFBZCxVQUFlLE9BQWM7O1FBQzNCLElBQU0sVUFBVSxHQUFpQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUfgQ0FBQyxVQUFDLEdBQXFCLElBQUssT0FBQSxHQUFHLENBQUMsRUFBRSxLQUFLLE9BQU8sQ0FBQyxFQUFFLEVBQXJCLENBQXFCLENBQUMsQ0FBQztRQUNwSCxJQUFJLENBQUMsQ0FBQyxVQUFVLEVBQUU7WUFDaEIsSUFBSSxDQUFDLFlBQVfgcUJBQXFCLFVBQVUsQ0FBQSxDQUFDO1NBQ2xEO0tBQ0Y7SUFFRDs7O09BR0c7Ozs7OztJQUNILDZDQUFhOzs7OztJQUFiO1FBQ0UsSUFBSSxJQUFJLENBQUMsa0JBQWtCLElBQUfgQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsWUFBWSxFQUFFO1lBQ3BFLE9BQU87U0FDUjs7UUFFRCxJQUFJLElBQUfgQ0FBQyxVQUFVLEVBQUUsRUFBRTs7O1lBR3JCLElBQUfgQ0FBQyx5QkFBeUIsRUFBRSxDQUFDO1NBQ2xDO2FBQU07O1lBRUwsSUFBSSxDQUFDLHdCQUF3QixFQUFFLENBQUM7U0FDakM7S0FDRjtJQUVEOzs7T0FHRzs7Ozs7O0lBQ0gsMkNBQVc7Ozs7O0lBQVg7UUFDRSxJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBRTdCLElBQUfgSUFBSSxDQUFDLGtDQUFrQyxFQUFFO1lBQzNDLElBQUfgQ0FBQyxrQ0FBa0MsQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUN2RDtRQUNELElBQUfgSUFBSSxDQUFDLCtCQUErQixFQUFFO1lBQ3hDLElBQUfgQ0FBQywrQkFBK0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUNwRDtRQUNELElBQUfgSUFBSSxDQUFDLGdDQUFnQyxFQUFFO1lBQ3pDLElBQUfgQ0FBQyxnQ0FBZ0MsQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUNyRDtLQUNGOzs7OztJQUtPLHdEQUF3Qjs7Ozs7O1FBQzlCLElBQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDekMsSUFBSSxDQUFDLElBQUfgcUJBQVcsSUFBSSxDQUFDLFlBQVfgQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFBLENBQUM7UUFDaEQsSUFBSSxDQUFDLFlBQVfgQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztRQUNuRSxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNoQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDYixRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQzs7Ozs7OztJQU8xQix5REFBeUI7Ozs7Ozs7UUFDL0IsSUFBSSxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUU7O1lBQ3RDLElBQU0sS0FBRyxHQUFHLElBQUfgY0FBYyxFQUFFLENBQUM7WUFDakMsS0FBRyxDQUFDLElBQUfgQ0FBQyxLQUFLLG9CQUFVLElBQUfgQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBRSxJQUFJLENBQUMsQ0FBQztZQUMzRCxLQUFHLENBQUMsWUFBWSxHQUFHLGFBQWEsQ0FBQztZQUNqQyxLQUFHLENBQUMsTUFBTSxHQUFHLFVBQUEsS0FBSzs7Z0JBQ2hCLElBQU0sSUFBSSxHQUFHLElBQUfgSUFBSSxDQUFDLENBQUMsS0FBRyxDQUFDLFFBQVEsQ0FBQyxFQUFFLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxDQUFDLENBQUM7Z0JBQzdELE1BQU0sQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLElBQUfgRUFBRSxLQUFJLENBQUMsV0FBVyxDQUFDLEtBQUfgQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO2FBQ3hFLENBQUM7WUFDRixLQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDWjs7Ozs7Ozs7SUFTSyxvREFBb0I7Ozs7OztjQUFDLEtBQWtCO1FBQzdDLE9BQU8sTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLFlBQVfgRUFBRSxDQUFDLENBQUM7Ozs7Ozs7OztJQVVwRCwyQ0FBVzs7Ozs7OztjQUFDLEtBQVk7UUFDOUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLElBQUfgS0FBSyxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1lBQzlFLE9BQU8sbUJBQVMsSUFBSSxDQUFDLFlBQVfgQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFDLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxFQUFFLENBQUMsQ0FBQztTQUN2RTthQUFNO1lBQ0wsT0FBTyxLQUFLLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDO1NBQ3JDOzs7Ozs7O0lBT0ssMENBQVU7Ozs7OztRQUNoQixJQUFJLENBQUMsTUFBTSxxQkFBdUIsSUFBSSxDQUFDLFdBQVcsQ0FBQSxDQUFDO1FBQ25ELElBQUfgQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUfgZUFBZSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUMxRCxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUfgQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQzs7Ozs7Ozs7O0lBU3BDLGlEQUFpQjs7Ozs7OztjQUFDLE1BQWMsRUFBRSxZQUFvQjs7UUFFNUQsUUFBUSxZQUFZLEVBQUU7WUFDcEIsS0FBSyxDQUFDO2dCQUNKLElBQUfgQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUfgZUFBZSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUN4RCxNQUFNO1lBQ1IsS0FBSyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDO2dCQUN6QixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUfgQ0FBQyxJQUFJLGVBQWUsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDdkQsTUFBTTtTQUNUOzs7Ozs7Ozs7SUFVSywwQ0FBVTs7Ozs7Ozs7UUFDaEIsSUFBSSxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUU7O1lBRXRDLE9BQU8sTUFBTSxDQUFDLElBQUfgSUFBSSxNQUFNLENBQUMsU0FBUyxDQUFDLGdCQUFnQixDQUFDO1NBQ3pEO1FBQ0QsSUFBSSxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUU7O1lBRXJDLE9BQU8sSUFBSSxDQUFDO1NBQ2I7OztnQkFscUJKLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsa0JBQWtCO29CQUM1QixRQUFRLEVBQUUsZ0JBQWdCO29CQUUxQixnaEZBQWlDO29CQUNqQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7aUJBQ2hEOzs7O2dCQXBCUSxlQUFlO2dCQUNmLGNBQWM7Z0JBc0tzQixNQUFNLHVCQUE5QyxNQUFNLFNBQUMsV0FBVztnQkEvTHJCLGlCQUFpQjs7O3FCQW1EaEIsS0FBSzs4QkFLTCxLQUFLO2dDQUtMLEtBQUs7cUNBTUwsS0FBSztxQ0FNTCxLQUFLOzZCQU1MLEtBQUs7Z0NBTUwsS0FBSzs4QkFLTCxLQUFLO3NDQVNMLEtBQUs7aUNBS0wsS0FBSztxQ0FLTCxLQUFLO3dCQU1MLE1BQU07dUJBS04sTUFBTTs2QkFLTixNQUFNOzRCQUtOLE1BQU07MEJBS04sTUFBTTttQ0FLTixNQUFNO2tDQUtOLE1BQU07d0NBTU4sU0FBUyxTQUFDLHFCQUFxQjs2QkE2Qi9CLFlBQVfgU0FBQyxpQkFBaUIsRUFBRSxDQUFDLFFBQVEsQ0FBQzs7Z0NBOU03Qzs7U0F1RWEscUJBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiBUaGUgTUlUIExpY2Vuc2UgKE1JVClcblxuIENvcHlyaWdodCAoYykgMjAxNy0yMDE4IFN0ZWZhbm8gQ2FwcGEgKEtzODkpXG5cbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwifgwgdG8gZGVhbFxuIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbiB0byB1c2UsIGNvcHfgIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcblxuIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIGFsbFxuIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG5cbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFfgXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTiBJTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiBMSUFCSUxJVFfgIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFXG4gU09GVFdBUkUuXG4gKi9cblxuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3fgXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIEV2ZW50RW1pdHRlcixcbiAgSG9zdExpc3RlbmVyLFxuICBJbmplY3QsXG4gIElucHV0LFxuICBPbkNoYW5nZXMsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBPdXRwdXQsXG4gIFBMQVRGT1JNX0lELFxuICBTaW1wbGVDaGFuZ2UsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIFZpZXdDaGlsZFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGlzUGxhdGZvcm1Ccm93c2VyLCBpc1BsYXRmb3JtU2VydmVyIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuaW1wb3J0IHsgQnV0dG9uRXZlbnQsIEJ1dHRvbnNDb25maWcgfSBmcm9tICcuLi8uLi9tb2RlbC9idXR0b25zLWNvbmZpZy5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgSW1hZ2UsIEltYWdlTW9kYWxFdmVudCB9IGZyb20gJy4uLy4uL21vZGVsL2ltYWdlLmNsYXNzJztcbmltcG9ydCB7IEFjdGlvbiB9IGZyb20gJy4uLy4uL21vZGVsL2FjdGlvbi5lbnVtJztcbmltcG9ydCB7IEtleWJvYXJkQ29uZmlnIH0gZnJvbSAnLi4vLi4vbW9kZWwva2V5Ym9hcmQtY29uZmlnLmludGVyZmFjZSc7XG5pbXBvcnQgeyBQcmV2aWV3Q29uZmlnIH0gZnJvbSAnLi4vLi4vbW9kZWwvcHJldmlldy1jb25maWcuaW50ZXJmYWNlJztcbmltcG9ydCB7IFNsaWRlQ29uZmlnIH0gZnJvbSAnLi4vLi4vbW9kZWwvc2xpZGUtY29uZmlnLmludGVyZmFjZSc7XG5pbXBvcnQgeyBBY2Nlc3NpYmlsaXR5Q29uZmlnIH0gZnJvbSAnLi4vLi4vbW9kZWwvYWNjZXNzaWJpbGl0eS5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgS2V5Ym9hcmRTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMva2V5Ym9hcmQuc2VydmljZSc7XG5pbXBvcnQgeyBHYWxsZXJ5U2VydmljZSwgSW50ZXJuYWxHYWxsZXJ5UGF5bG9hZCB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2dhbGxlcnkuc2VydmljZSc7XG5pbXBvcnQgeyBEb3RzQ29uZmlnIH0gZnJvbSAnLi4vLi4vbW9kZWwvZG90cy1jb25maWcuaW50ZXJmYWNlJztcbmltcG9ydCB7IEN1cnJlbnRJbWFnZUNvbXBvbmVudCwgSW1hZ2VMb2FkRXZlbnQgfSBmcm9tICcuLi9jdXJyZW50LWltYWdlL2N1cnJlbnQtaW1hZ2UuY29tcG9uZW50JztcbmltcG9ydCB7IEludGVybmFsTGliSW1hZ2UgfSBmcm9tICcuLi8uLi9tb2RlbC9pbWFnZS1pbnRlcm5hbC5jbGFzcyc7XG5pbXBvcnQgeyBBZHZhbmNlZExheW91dCwgUGxhaW5HYWxsZXJ5Q29uZmlnIH0gZnJvbSAnLi4vLi4vbW9kZWwvcGxhaW4tZ2FsbGVyeS1jb25maWcuaW50ZXJmYWNlJztcbmltcG9ydCB7IEtTX0RFRkFVTFRfQUNDRVNTSUJJTElUWV9DT05GSUcgfSBmcm9tICcuLi9hY2Nlc3NpYmlsaXR5LWRlZmF1bHQnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcy9TdWJzY3JpcHRpb24nO1xuaW1wb3J0IHsgQ3VycmVudEltYWdlQ29uZmlnIH0gZnJvbSAnLi4vLi4vbW9kZWwvY3VycmVudC1pbWFnZS1jb25maWcuaW50ZXJmYWNlJztcbmltcG9ydCB7IGdldEluZGV4IH0gZnJvbSAnLi4vLi4vdXRpbHMvaW1hZ2UudXRpbCc7XG5cbi8qKlxuICogTWFpbiBDb21wb25lbnQgb2YgdGhpcyBsaWJyYXJ5IHdpdGggYm90aCB0aGUgcGxhaW4gYW5kIG1vZGFsIGdhbGxlcmllcy5cbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAna3MtbW9kYWwtZ2FsbGVyeScsXG4gIGV4cG9ydEFzOiAna3NNb2RhbEdhbGxlcnknLFxuICBzdHlsZVVybHM6IFsnbW9kYWwtZ2FsbGVyeS5zY3NzJ10sXG4gIHRlbXBsYXRlVXJsOiAnbW9kYWwtZ2FsbGVyeS5odG1sJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgTW9kYWxHYWxsZXJ5Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3fgIE9uQ2hhbmdlcyB7XG4gIC8qKlxuICAgKiBVbmlxdWUgaWQgKD49MCkgb2YgdGhlIGN1cnJlbnQgaW5zdGFuY2Ugb2YgdGhpcyBsaWJyYXJ5LiBUaGlzIGlzIHVzZWZ1bCB3aGVuIHlvdSBhcmUgdXNpbmdcbiAgICogdGhlIHNlcnZpY2UgdG8gY2FsbCBtb2RhbCBnYWxsZXJ5IHdpdGhvdXQgb3BlbiBpdCBtYW51YWxseS5cbiAgICogUmlnaHQgbm93IGlzIG9wdGlvbmFsLCBidXQgaW4gdXBjb21pbmcgbWFqb3IgcmVsZWFzZXMgd2lsbCBiZSBtYW5kYXRvcnkhISFcbiAgICovXG4gIEBJbnB1dCgpXG4gIGlkOiBudW1iZXI7XG4gIC8qKlxuICAgKiBBcnJheSBvZiBgSW1hZ2VgIHRoYXQgcmVwcmVzZW50IHRoZSBtb2RlbCBvZiB0aGlzIGxpYnJhcnkgd2l0aCBhbGwgaW1hZ2VzLCB0aHVtYnMgYW5kIHNvIG9uLlxuICAgKi9cbiAgQElucHV0KClcbiAgbW9kYWxJbWFnZXM6IEltYWdlW107XG4gIC8qKlxuICAgKiBPYmplY3Qgb2YgdHlwZSBgQnV0dG9uc0NvbmZpZ2AgdG8gc2hvdy9oaWRlIGJ1dHRvbnMuXG4gICAqL1xuICBASW5wdXQoKVxuICBidXR0b25zQ29uZmlnOiBCdXR0b25zQ29uZmlnO1xuICAvKipcbiAgICogQm9vbGVhbiB0byBlbmFibGUgbW9kYWwtZ2FsbGVyeSBjbG9zZSBiZWhhdmlvdXIgd2hlbiBjbGlja2luZ1xuICAgKiBvbiB0aGUgc2VtaS10cmFuc3BhcmVudCBiYWNrZ3JvdW5kLiBFbmFibGVkIGJ5IGRlZmF1bHQuXG4gICAqL1xuICBASW5wdXQoKVxuICBlbmFibGVDbG9zZU91dHNpZGUgPSB0cnVlO1xuICAvKipcbiAgICogSW50ZXJmYWNlIHRvIGNvbmZpZ3VyZSBjdXJyZW50IGltYWdlIGluIG1vZGFsLWdhbGxlcnkuXG4gICAqIEZvciBpbnN0YW5jZSB5b3UgY2FuIGRpc2FibGUgbmF2aWdhdGlvbiBvbiBjbGljayBvbiBjdXJyZW50IGltYWdlIChlbmFibGVkIGJ5IGRlZmF1bHQpLlxuICAgKi9cbiAgQElucHV0KClcbiAgY3VycmVudEltYWdlQ29uZmlnOiBDdXJyZW50SW1hZ2VDb25maWc7XG4gIC8qKlxuICAgKiBPYmplY3Qgb2YgdHlwZSBgRG90c0NvbmZpZ2AgdG8gaW5pdCBEb3RzQ29tcG9uZW50J3MgZmVhdHVyZXMuXG4gICAqIEZvciBpbnN0YW5jZSwgaXQgY29udGFpbnMgYSBwYXJhbSB0byBzaG93L2hpZGUgZG90cy5cbiAgICovXG4gIEBJbnB1dCgpXG4gIGRvdHNDb25maWc6IERvdHNDb25maWc7XG4gIC8qKlxuICAgKiBPYmplY3Qgb2YgdHlwZSBgUHJldmlld0NvbmZpZ2AgdG8gaW5pdCBQcmV2aWV3c0NvbXBvbmVudCdzIGZlYXR1cmVzLlxuICAgKiBGb3IgaW5zdGFuY2UsIGl0IGNvbnRhaW5zIGEgcGFyYW0gdG8gc2hvdy9oaWRlIHByZXZpZXdzLlxuICAgKi9cbiAgQElucHV0KClcbiAgcHJldmlld0NvbmZpZzogUHJldmlld0NvbmZpZztcbiAgLyoqXG4gICAqIE9iamVjdCBvZiB0eXBlIGBTbGlkZUNvbmZpZ2AgdG8gaW5pdCBzaWRlIHByZXZpZXdzIGFuZCBgaW5maW5pdGUgc2xpZGluZ2AuXG4gICAqL1xuICBASW5wdXQoKVxuICBzbGlkZUNvbmZpZzogU2xpZGVDb25maWcgPSB7XG4gICAgaW5maW5pdGU6IGZhbHNlLFxuICAgIHNpZGVQcmV2aWV3czogeyBzaG93OiB0cnVlLCBzaXplOiB7IHdpZHRoOiAnMTAwcHgnLCBoZWlnaHQ6ICdhdXRvJyB9IH1cbiAgfTtcbiAgLyoqXG4gICAqIE9iamVjdCBvZiB0eXBlIGBBY2Nlc3NpYmlsaXR5Q29uZmlnYCB0byBpbml0IGN1c3RvbSBhY2Nlc3NpYmlsaXR5IGZlYXR1cmVzLlxuICAgKiBGb3IgaW5zdGFuY2UsIGl0IGNvbnRhaW5zIHRpdGxlcywgYWx0IHRleHRzLCBhcmlhLWxhYmVscyBhbmQgc28gb24uXG4gICAqL1xuICBASW5wdXQoKVxuICBhY2Nlc3NpYmlsaXR5Q29uZmlnOiBBY2Nlc3NpYmlsaXR5Q29uZmlnID0gS1NfREVGQVVMVF9BQ0NFU1NJQklMSVRZX0NPTkZJRztcbiAgLyoqXG4gICAqIE9iamVjdCBvZiB0eXBlIGBLZXlib2FyZENvbmZpZ2AgdG8gYXNzaWduIGN1c3RvbSBrZXlzIHRvIEVTQywgUklHSFQgYW5kIExFRlQga2V5Ym9hcmQncyBhY3Rpb25zLlxuICAgKi9cbiAgQElucHV0KClcbiAga2V5Ym9hcmRDb25maWc6IEtleWJvYXJkQ29uZmlnO1xuICAvKipcbiAgICogT2JqZWN0IG9mIHR5cGUgYFBsYWluR2FsbGVyeUNvbmZpZ2AgdG8gY29uZmlndXJlIHRoZSBwbGFpbiBnYWxsZXJ5LlxuICAgKi9cbiAgQElucHV0KClcbiAgcGxhaW5HYWxsZXJ5Q29uZmlnOiBQbGFpbkdhbGxlcnlDb25maWc7XG5cbiAgLyoqXG4gICAqIE91dHB1dCB0byBlbWl0IGFuIGV2ZW50IHdoZW4gdGhlIG1vZGFsIGdhbGxlcnkgaXMgY2xvc2VkLlxuICAgKi9cbiAgQE91dHB1dCgpXG4gIGNsb3NlOiBFdmVudEVtaXR0ZXI8SW1hZ2VNb2RhbEV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8SW1hZ2VNb2RhbEV2ZW50PigpO1xuICAvKipcbiAgICogT3V0cHV0IHRvIGVtaXQgYW4gZXZlbnQgd2hlbiBhbiBpbWFnZSBpcyBjaGFuZ2VkLlxuICAgKi9cbiAgQE91dHB1dCgpXG4gIHNob3c6IEV2ZW50RW1pdHRlcjxJbWFnZU1vZGFsRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxJbWFnZU1vZGFsRXZlbnQ+KCk7XG4gIC8qKlxuICAgKiBPdXRwdXQgdG8gZW1pdCBhbiBldmVudCB3aGVuIHRoZSBjdXJyZW50IGltYWdlIGlzIHRoZSBmaXJzdCBvbmUuXG4gICAqL1xuICBAT3V0cHV0KClcbiAgZmlyc3RJbWFnZTogRXZlbnRFbWl0dGVyPEltYWdlTW9kYWxFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPEltYWdlTW9kYWxFdmVudD4oKTtcbiAgLyoqXG4gICAqIE91dHB1dCB0byBlbWl0IGFuIGV2ZW50IHdoZW4gdGhlIGN1cnJlbnQgaW1hZ2UgaXMgdGhlIGxhc3Qgb25lLlxuICAgKi9cbiAgQE91dHB1dCgpXG4gIGxhc3RJbWFnZTogRXZlbnRFbWl0dGVyPEltYWdlTW9kYWxFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPEltYWdlTW9kYWxFdmVudD4oKTtcbiAgLyoqXG4gICAqIE91dHB1dCB0byBlbWl0IGFuIGV2ZW50IHdoZW4gdGhlIG1vZGFsIGdhbGxlcnkgaXMgY2xvc2VkLlxuICAgKi9cbiAgQE91dHB1dCgpXG4gIGhhc0RhdGE6IEV2ZW50RW1pdHRlcjxJbWFnZU1vZGFsRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxJbWFnZU1vZGFsRXZlbnQ+KCk7XG4gIC8qKlxuICAgKiBPdXRwdXQgdG8gZW1pdCBhbiBldmVudCB3aGVuIGEgYnV0dG9uIGlzIGNsaWNrZWQsIGJ1dCBiZWZvcmUgdGhhdCB0aGUgYWN0aW9uIGlzIHRyaWdnZXJlZC5cbiAgICovXG4gIEBPdXRwdXQoKVxuICBidXR0b25CZWZvcmVIb29rOiBFdmVudEVtaXR0ZXI8QnV0dG9uRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxCdXR0b25FdmVudD4oKTtcbiAgLyoqXG4gICAqIE91dHB1dCB0byBlbWl0IGFuIGV2ZW50IHdoZW4gYSBidXR0b24gaXMgY2xpY2tlZCwgYnV0IGFmdGVyIHRoYXQgdGhlIGFjdGlvbiBpcyB0cmlnZ2VyZWQuXG4gICAqL1xuICBAT3V0cHV0KClcbiAgYnV0dG9uQWZ0ZXJIb29rOiBFdmVudEVtaXR0ZXI8QnV0dG9uRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxCdXR0b25FdmVudD4oKTtcblxuICAvKipcbiAgICogUmVmZXJlbmNlIHRvIHRoZSBDdXJyZW50SW1hZ2VDb21wb25lbnQgdG8gaW52b2tlIG1ldGhvZHMgb24gaXQuXG4gICAqL1xuICBAVmlld0NoaWxkKEN1cnJlbnRJbWFnZUNvbXBvbmVudClcbiAgY3VycmVudEltYWdlQ29tcG9uZW50O1xuXG4gIC8qKlxuICAgKiBCb29sZWFuIHRoYXQgaXQgaXMgdHJ1ZSBpZiB0aGUgbW9kYWwgZ2FsbGVyeSBpcyB2aXNpYmxlLiBGYWxzZSBieSBkZWZhdWx0LlxuICAgKi9cbiAgb3BlbmVkID0gZmFsc2U7XG4gIC8qKlxuICAgKiBCb29sZWFuIHRvIG9wZW4gdGhlIG1vZGFsIGdhbGxlcnkuIEZhbHNlIGJ5IGRlZmF1bHQuXG4gICAqL1xuICBzaG93R2FsbGVyeSA9IGZhbHNlO1xuICAvKipcbiAgICogQXJyYXkgb2YgYEludGVybmFsTGliSW1hZ2VgIHJlcHJlc2VudGluZyB0aGUgbW9kZWwgb2YgdGhpcyBsaWJyYXJ5IHdpdGggYWxsIGltYWdlcywgdGh1bWJzIGFuZCBzbyBvbi5cbiAgICovXG4gIGltYWdlczogSW50ZXJuYWxMaWJJbWFnZVtdO1xuICAvKipcbiAgICogYEltYWdlYCB0aGF0IGlzIHZpc2libGUgcmlnaHQgbm93LlxuICAgKi9cbiAgY3VycmVudEltYWdlOiBJbnRlcm5hbExpYkltYWdlO1xuXG4gIHByaXZhdGUgZ2FsbGVyeVNlcnZpY2VOYXZpZ2F0ZVN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuICBwcml2YXRlIGdhbGxlcnlTZXJ2aWNlQ2xvc2VTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcbiAgcHJpdmF0ZSBnYWxsZXJ5U2VydmljZVVwZGF0ZVN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gIC8qKlxuICAgKiBIb3N0TGlzdGVuZXIgdG8gY2F0Y2ggYnJvd3NlcidzIGJhY2sgYnV0dG9uIGFuZCBkZXN0cm95IHRoZSBnYWxsZXJ5LlxuICAgKiBUaGlzIHByZXZlbnRzIHdlaXJlZCBiZWhhdmlvdXIgYWJvdXQgc2Nyb2xsaW5nLlxuICAgKiBBZGRlZCB0byBmaXggdGhpcyBpc3N1ZTogaHR0cHM6Ly9naXRodWIuY29tL0tzODkvYW5ndWxhci1tb2RhbC1nYWxsZXJ5L2lzc3Vlcy8xNTlcbiAgICovXG4gIEBIb3N0TGlzdGVuZXIoJ3dpbmRvdzpwb3BzdGF0ZScsIFsnJGV2ZW50J10pXG4gIG9uUG9wU3RhdGUoZTogRXZlbnQpIHtcbiAgICB0aGlzLmNsb3NlR2FsbGVyeSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIENvbnN0cnVjdG9yIHdpdGggdGhlIGluamVjdGlvbiBvZiDCtEtleWJvYXJkU2VydmljZcK0IGFuZCBhbiBvYmplY3QgdG8gc3VwcG9ydCBTZXJ2ZXItU2lkZSBSZW5kZXJpbmcuXG4gICAqL1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGtleWJvYXJkU2VydmljZTogS2V5Ym9hcmRTZXJ2aWNlLFxuICAgIHByaXZhdGUgZ2FsbGVyeVNlcnZpY2U6IEdhbGxlcnlTZXJ2aWNlLFxuICAgIEBJbmplY3QoUExBVEZPUk1fSUQpIHByaXZhdGUgcGxhdGZvcm1JZDogT2JqZWN0LFxuICAgIHByaXZhdGUgY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmXG4gICkge31cblxuICAvKipcbiAgICogTWV0aG9kIMK0bmdPbkluaXTCtCB0byBpbml0IGltYWdlcyBjYWxsaW5nIGBpbml0SW1hZ2VzKClgLlxuICAgKiBUaGlzIGlzIGFuIEFuZ3VsYXIncyBsaWZlY3ljbGUgaG9vaywgc28gaXRzIGNhbGxlZCBhdXRvbWF0aWNhbGx5IGJ5IEFuZ3VsYXIgaXRzZWxmLlxuICAgKiBJbiBwYXJ0aWN1bGFyLCBpdCdzIGNhbGxlZCBvbmx5IG9uZSB0aW1lISEhXG4gICAqL1xuICBuZ09uSW5pdCgpIHtcbiAgICAvLyBpZCBpcyBhIG1hbmRhdG9yeSBpbnB1dCBhbmQgbXVzdCBhIG51bWJlciA+IDBcbiAgICBpZiAoKCF0aGlzLmlkICYmIHRoaXMuaWQgIT09IDApIHx8IHRoaXMuaWQgPCAwfgB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgIGAnW2lkXT1cImEgbnVtYmVyID49IDBcIicgaXMgYSBtYW5kYXRvcnkgaW5wdXQgZnJvbSA2LjAuMCBpbiBhbmd1bGFyLW1vZGFsLWdhbGxlcnkuYCArXG4gICAgICAgICAgYElmIHlvdSBhcmUgdXNpbmcgbXVsdGlwbGUgaW5zdGFuY2VzIG9mIHRoaXMgbGlicmFyeSwgcGxlYXNlIGJlIHN1cmUgdG8gdXNlIGRpZmZlcmVudCBpZHNgXG4gICAgICApO1xuICAgIH1cblxuICAgIC8vIGNhbGwgaW5pdEltYWdlcyB0byBpbml0IGltYWdlcyBhbmQgdG8gZW1pdCBgaGFzRGF0YWAgZXZlbnRcbiAgICB0aGlzLmluaXRJbWFnZXMoKTtcblxuICAgIHRoaXMuZ2FsbGVyeVNlcnZpY2VOYXZpZ2F0ZVN1YnNjcmlwdGlvbiA9IHRoaXMuZ2FsbGVyeVNlcnZpY2UubmF2aWdhdGUuc3Vic2NyaWJlKChwYXlsb2FkOiBJbnRlcm5hbEdhbGxlcnlQYXlsb2FkfgA9PiB7XG4gICAgICBpZiAoIXBheWxvYWQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgLy8gaWYgZ2FsbGVyeUlkIGlzIG5vdCB2YWxpZCBPUiBnYWxsZXJ5SWQgaXMgcmVsYXRlZCB0byBhbm90aGVyIGluc3RhbmNlIGFuZCBub3QgdGhpcyBvbmVcbiAgICAgIGlmIChwYXlsb2FkLmdhbGxlcnlJZCA9PT0gdW5kZWZpbmVkIHx8IHBheWxvYWQuZ2FsbGVyeUlkIDwgMCB8fCBwYXlsb2FkLmdhbGxlcnlJZCAhPT0gdGhpcy5pZCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICAvLyBpZiBpbWFnZSBpbmRleCBpcyBub3QgdmFsaWRcbiAgICAgIGlmIChwYXlsb2FkLmluZGV4IDwgMCB8fCBwYXlsb2FkLmluZGV4ID4gdGhpcy5pbWFnZXMubGVuZ3RofgB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHRoaXMuc2hvd01vZGFsR2FsbGVyeShwYXlsb2FkLmluZGV4LCB0cnVlKTtcbiAgICB9KTtcblxuICAgIHRoaXMuZ2FsbGVyeVNlcnZpY2VDbG9zZVN1YnNjcmlwdGlvbiA9IHRoaXMuZ2FsbGVyeVNlcnZpY2UuY2xvc2Uuc3Vic2NyaWJlKChnYWxsZXJ5SWQ6IG51bWJlcikgPT4ge1xuICAgICAgaWYgKGdhbGxlcnlJZCA8IDAgfHwgdGhpcy5pZCAhPT0gZ2FsbGVyeUlkfgB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHRoaXMuY2xvc2VHYWxsZXJ5KEFjdGlvbi5OT1JNQUwsIHRydWUpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5nYWxsZXJ5U2VydmljZVVwZGF0ZVN1YnNjcmlwdGlvbiA9IHRoaXMuZ2FsbGVyeVNlcnZpY2UudXBkYXRlLnN1YnNjcmliZSgocGF5bG9hZDogSW50ZXJuYWxHYWxsZXJ5UGF5bG9hZCkgPT4ge1xuICAgICAgaWYgKCFwYXlsb2FkfgB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIC8vIGlmIGdhbGxlcnlJZCBpcyBub3QgdmFsaWQgT1IgZ2FsbGVyeUlkIGlzIHJlbGF0ZWQgdG8gYW5vdGhlciBpbnN0YW5jZSBhbmQgbm90IHRoaXMgb25lXG4gICAgICBpZiAocGF5bG9hZC5nYWxsZXJ5SWQgPT09IHVuZGVmaW5lZCB8fCBwYXlsb2FkLmdhbGxlcnlJZCA8IDAgfHwgcGF5bG9hZC5nYWxsZXJ5SWQgIT09IHRoaXMuaWQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgLy8gaWYgZWl0aGVyIGltYWdlIGluZGV4IG9yIGltYWdlIGFyZSBub3QgdmFsaWRcbiAgICAgIGlmIChwYXlsb2FkLmluZGV4IDwgMCB8fCBwYXlsb2FkLmluZGV4ID4gdGhpcy5pbWFnZXMubGVuZ3RoIHx8ICFwYXlsb2FkLmltYWdlfgB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGN1cnJlbnRJbmRleDogbnVtYmVyID0gZ2V0SW5kZXgocGF5bG9hZC5pbWFnZSwgdGhpcy5pbWFnZXMpO1xuICAgICAgdGhpcy5pbWFnZXMgPSB0aGlzLmltYWdlcy5tYXAoKGltYWdlOiBJbnRlcm5hbExpYkltYWdlLCBpbmRleDogbnVtYmVyfgA9PiB7XG4gICAgICAgIGlmIChpbmRleCA9PT0gcGF5bG9hZC5pbmRleCkge1xuICAgICAgICAgIHJldHVybiA8SW50ZXJuYWxMaWJJbWFnZT5wYXlsb2FkLmltYWdlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBpbWFnZTtcbiAgICAgIH0pO1xuICAgICAgaWYgKGN1cnJlbnRJbmRleCA9PT0gcGF5bG9hZC5pbmRleCnCoHtcbiAgICAgICAgdGhpcy5jdXJyZW50SW1hZ2UgPSB0aGlzLmltYWdlc1twYXlsb2FkLmluZGV4XTtcbiAgICAgIH1cbiAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogTWV0aG9kIMK0bmdPbkNoYW5nZXPCtCB0byByZS1pbml0IGltYWdlcyBpZiBpbnB1dCBpcyBjaGFuZ2VkLlxuICAgKiBUaGlzIGlzIGFuIEFuZ3VsYXIncyBsaWZlY3ljbGUgaG9vaywgc28gaXRzIGNhbGxlZCBhdXRvbWF0aWNhbGx5IGJ5IEFuZ3VsYXIgaXRzZWxmLlxuICAgKiBJbiBwYXJ0aWN1bGFyLCBpdCdzIGNhbGxlZCBiZWZvcmUgYG5nT25Jbml0KClgIGFuZCB3aGVuZXZlciBvbmUgb3IgbW9yZSBkYXRhLWJvdW5kIGlucHV0IHByb3BlcnRpZXMgY2hhbmdlLlxuICAgKiBAcGFyYW0gY2hhbmdlcyBgU2ltcGxlQ2hhbmdlc2Agb2JqZWN0IG9mIGN1cnJlbnQgYW5kIHByZXZpb3VzIHByb3BlcnR5IHZhbHVlcyBwcm92aWRlZCBieSBBbmd1bGFyLlxuICAgKi9cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIGNvbnN0IGltYWdlc0NoYW5nZTogU2ltcGxlQ2hhbmdlID0gY2hhbmdlcy5tb2RhbEltYWdlcztcbiAgICBjb25zdCBwbGFpbkdhbGxlcnlDb25maWdDaGFuZ2U6IFNpbXBsZUNoYW5nZSA9IGNoYW5nZXMucGxhaW5HYWxsZXJ5Q29uZmlnO1xuXG4gICAgaWYgKGltYWdlc0NoYW5nZSAmJiAhaW1hZ2VzQ2hhbmdlLmZpcnN0Q2hhbmdlICYmIGltYWdlc0NoYW5nZS5wcmV2aW91c1ZhbHVlICE9PSBpbWFnZXNDaGFuZ2UuY3VycmVudFZhbHVlfgB7XG4gICAgICB0aGlzLmluaXRJbWFnZXMoKTtcbiAgICB9XG5cbiAgICBpZiAocGxhaW5HYWxsZXJ5Q29uZmlnQ2hhbmdlfgB7XG4gICAgICAvLyBjb25zdCBwcmV2UGxhaW5HYWxsZXJ5Q29uZmlnQ2hhbmdlOiBhbnkgPSBwbGFpbkdhbGxlcnlDb25maWdDaGFuZ2UucHJldmlvdXNWYWx1ZTtcbiAgICAgIGNvbnN0IGN1cnJQbGFpbkdhbGxlcnlDb25maWdDaGFuZ2U6IFBsYWluR2FsbGVyeUNvbmZpZyA9IHBsYWluR2FsbGVyeUNvbmZpZ0NoYW5nZS5jdXJyZW50VmFsdWU7XG4gICAgICBpZiAoXG4gICAgICAgIGN1cnJQbGFpbkdhbGxlcnlDb25maWdDaGFuZ2UubGF5b3V0ICYmXG4gICAgICAgIGN1cnJQbGFpbkdhbGxlcnlDb25maWdDaGFuZ2UubGF5b3V0IGluc3RhbmNlb2YgQWR2YW5jZWRMYXlvdXQgJiZcbiAgICAgICAgY3VyclBsYWluR2FsbGVyeUNvbmZpZ0NoYW5nZS5sYXlvdXQubW9kYWxPcGVuZXJCeUluZGV4ICE9PSAtMVxuICAgICAgfgB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdvcGVuaW5nIG1vZGFsIGdhbGxlcnkgZnJvbSBjdXN0b20gcGxhaW4gZ2FsbGVyeSwgaW5kZXg6ICcsIGN1cnJQbGFpbkdhbGxlcnlDb25maWdDaGFuZ2UpO1xuICAgICAgICB0aGlzLnNob3dNb2RhbEdhbGxlcnkoY3VyclBsYWluR2FsbGVyeUNvbmZpZ0NoYW5nZS5sYXlvdXQubW9kYWxPcGVuZXJCeUluZGV4KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogTWV0aG9kIGNhbGxlZCBieSBjdXN0b20gdXBwZXIgYnV0dG9ucy5cbiAgICogQHBhcmFtIEJ1dHRvbkV2ZW50IGV2ZW50IHBheWxvYWRcbiAgICovXG4gIG9uQ3VzdG9tRW1pdChldmVudDogQnV0dG9uRXZlbnQpIHtcbiAgICBjb25zdCBldmVudFRvRW1pdDogQnV0dG9uRXZlbnQgPSB0aGlzLmdldEJ1dHRvbkV2ZW50VG9FbWl0KGV2ZW50KTtcbiAgICB0aGlzLmJ1dHRvbkJlZm9yZUhvb2suZW1pdChldmVudFRvRW1pdCk7XG4gICAgLy8gY29uc29sZS5sb2coJ29uIG9uQ3VzdG9tRW1pdCcsIGV2ZW50VG9FbWl0KTtcbiAgICB0aGlzLmJ1dHRvbkFmdGVySG9vay5lbWl0KGV2ZW50VG9FbWl0KTtcbiAgfVxuXG4gIC8vIFRPRE8gaW1wbGVtZW50IG9uIHJlZnJlc2hcbiAgLy8gLyoqXG4gIC8vICAqIE1ldGhvZCBjYWxsZWQgYnkgdGhlIHJlZnJlc2ggdXBwZXIgYnV0dG9uLlxuICAvLyAgKiBTVElMTCBOT1QgSU1QTEVNRU5URUQsIFNPIERPTidUIFVTRSBJVFxuICAvLyAgKiBAcGFyYW0gQnV0dG9uRXZlbnQgZXZlbnQgcGF5bG9hZFxuICAvLyAgKi9cbiAgLy8gb25SZWZyZXNoKGV2ZW50OiBCdXR0b25FdmVudCkge1xuICAvLyAgIGNvbnN0IGV2ZW50VG9FbWl0OiBCdXR0b25FdmVudCA9IHRoaXMuZ2V0QnV0dG9uRXZlbnRUb0VtaXQoZXZlbnQpO1xuICAvL1xuICAvLyAgIHRoaXMuYnV0dG9uQmVmb3JlSG9vay5lbWl0KGV2ZW50VG9FbWl0KTtcbiAgLy8gICAvLyBjb25zb2xlLmxvZygnVE9ETyBpbXBsZW1lbnQgb24gcmVmcmVzaCBpbnNpZGUgdGhlIGxpYnJhcnknLCBldmVudFRvRW1pdCk7XG4gIC8vXG4gIC8vICAgdGhpcy5jdXJyZW50SW1hZ2UgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLmN1cnJlbnRJbWFnZSwgeyBwcmV2aW91c2x5TG9hZGVkOiBmYWxzZSB9KTtcbiAgLy9cbiAgLy8gICAvLyBUT0RPIGFkZCBsb2dpYyB0byBoaWRlIGFuZCBzaG93IHRoZSBjdXJyZW50IGltYWdlXG4gIC8vXG4gIC8vICAgLy8gY29uc29sZS5sb2coJ29uUmVmcmVzaCcsIHRoaXMuY3VycmVudEltYWdlKTtcbiAgLy9cbiAgLy8gICAvLyBjb25zdCBpbmRleE51bTogbnVtYmVyID0gdGhpcy5jdXJyZW50SW1hZ2VDb21wb25lbnQuZ2V0SW5kZXgoKTtcbiAgLy9cbiAgLy8gICAvLyB0aGlzLmltYWdlcyA9IHRoaXMuaW1hZ2VzLm1hcCgodmFsOiBJbnRlcm5hbExpYkltYWdlLCBpbmRleDogbnVtYmVyfgA9PiB7XG4gIC8vICAgLy8gICBpZiAoaW5kZXggIT09IDIpIHtcbiAgLy8gICAvLyAgICAgcmV0dXJuIHZhbDtcbiAgLy8gICAvLyAgIH0gZWxzZSB7XG4gIC8vICAgLy8gICAgIGNvbnN0IGltZzogSW50ZXJuYWxMaWJJbWFnZSA9IE9iamVjdC5hc3NpZ24oe30sIHZhbCwge3ByZXZpb3VzbHlMb2FkZWQ6IGZhbHNlfSk7XG4gIC8vICAgLy8gICAgIHJldHVybiBpbWc7XG4gIC8vICAgLy8gICB9XG4gIC8vICAgLy8gfSk7XG4gIC8vICAgLy9cbiAgLy8gICAvLyB0aGlzLmNsb3NlR2FsbGVyeSgpO1xuICAvLyAgIC8vIHRoaXMuc2hvd01vZGFsR2FsbGVyeSgyKTtcbiAgLy9cbiAgLy8gICB0aGlzLmJ1dHRvbkFmdGVySG9vay5lbWl0KGV2ZW50VG9FbWl0KTtcbiAgLy8gfVxuXG4gIC8qKlxuICAgKiBNZXRob2QgY2FsbGVkIGJ5IHRoZSBmdWxsLXNjcmVlbiB1cHBlciBidXR0b24uXG4gICAqIEBwYXJhbSBCdXR0b25FdmVudCBldmVudCBwYXlsb2FkXG4gICAqL1xuICBvbkZ1bGxTY3JlZW4oZXZlbnQ6IEJ1dHRvbkV2ZW50fgB7XG4gICAgY29uc3QgZXZlbnRUb0VtaXQ6IEJ1dHRvbkV2ZW50ID0gdGhpcy5nZXRCdXR0b25FdmVudFRvRW1pdChldmVudCk7XG4gICAgdGhpcy5idXR0b25CZWZvcmVIb29rLmVtaXQoZXZlbnRUb0VtaXQpO1xuXG4gICAgY29uc3QgZG9jOiBhbnkgPSA8YW55PmRvY3VtZW50O1xuICAgIGNvbnN0IGRvY0VsOiBhbnkgPSA8YW55PmRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcblxuICAgIGNvbnN0IGZ1bGxzY3JlZW5EaXNhYmxlZDogYm9vbGVhbiA9ICFkb2MuZnVsbHNjcmVlbkVsZW1lbnQgJiYgIWRvYy53ZWJraXRGdWxsc2NyZWVuRWxlbWVudCAmJiAhZG9jLm1vekZ1bGxTY3JlZW5FbGVtZW50ICYmICFkb2MubXNGdWxsc2NyZWVuRWxlbWVudDtcblxuICAgIGlmIChmdWxsc2NyZWVuRGlzYWJsZWQpIHtcbiAgICAgIGlmIChkb2NFbC5yZXF1ZXN0RnVsbHNjcmVlbikge1xuICAgICAgICBkb2NFbC5yZXF1ZXN0RnVsbHNjcmVlbigpO1xuICAgICAgfSBlbHNlIGlmIChkb2NFbC53ZWJraXRSZXF1ZXN0RnVsbHNjcmVlbikge1xuICAgICAgICBkb2NFbC53ZWJraXRSZXF1ZXN0RnVsbHNjcmVlbigpO1xuICAgICAgfSBlbHNlIGlmIChkb2NFbC5tb3pSZXF1ZXN0RnVsbFNjcmVlbikge1xuICAgICAgICBkb2NFbC5tb3pSZXF1ZXN0RnVsbFNjcmVlbigpO1xuICAgICAgfSBlbHNlIGlmIChkb2NFbC5tc1JlcXVlc3RGdWxsc2NyZWVufgB7XG4gICAgICAgIGRvY0VsLm1zUmVxdWVzdEZ1bGxzY3JlZW4oKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKGRvYy5leGl0RnVsbHNjcmVlbikge1xuICAgICAgICBkb2MuZXhpdEZ1bGxzY3JlZW4oKTtcbiAgICAgIH0gZWxzZSBpZiAoZG9jLm1zRXhpdEZ1bGxzY3JlZW4pIHtcbiAgICAgICAgZG9jLm1zRXhpdEZ1bGxzY3JlZW4oKTtcbiAgICAgIH0gZWxzZSBpZiAoZG9jLm1vekNhbmNlbEZ1bGxTY3JlZW4pIHtcbiAgICAgICAgZG9jLm1vekNhbmNlbEZ1bGxTY3JlZW4oKTtcbiAgICAgIH0gZWxzZSBpZiAoZG9jLndlYmtpdEV4aXRGdWxsc2NyZWVufgB7XG4gICAgICAgIGRvYy53ZWJraXRFeGl0RnVsbHNjcmVlbigpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuYnV0dG9uQWZ0ZXJIb29rLmVtaXQoZXZlbnRUb0VtaXQpO1xuICB9XG5cbiAgLyoqXG4gICAqIE1ldGhvZCBjYWxsZWQgYnkgdGhlIGRlbGV0ZSB1cHBlciBidXR0b24uXG4gICAqIEBwYXJhbSBCdXR0b25FdmVudCBldmVudCBwYXlsb2FkXG4gICAqL1xuICBvbkRlbGV0ZShldmVudDogQnV0dG9uRXZlbnQpIHtcbiAgICBjb25zdCBldmVudFRvRW1pdDogQnV0dG9uRXZlbnQgPSB0aGlzLmdldEJ1dHRvbkV2ZW50VG9FbWl0KGV2ZW50KTtcbiAgICB0aGlzLmJ1dHRvbkJlZm9yZUhvb2suZW1pdChldmVudFRvRW1pdCk7XG5cbiAgICBpZiAodGhpcy5pbWFnZXMubGVuZ3RoID09PSAxfgB7XG4gICAgICB0aGlzLmNsb3NlR2FsbGVyeSgpO1xuICAgIH1cblxuICAgIGNvbnN0IGltYWdlSW5kZXhUb0RlbGV0ZTogbnVtYmVyID0gdGhpcy5jdXJyZW50SW1hZ2VDb21wb25lbnQuZ2V0SW5kZXhUb0RlbGV0ZShldmVudC5pbWFnZSk7XG4gICAgaWYgKGltYWdlSW5kZXhUb0RlbGV0ZSA9PT0gdGhpcy5pbWFnZXMubGVuZ3RoIC0gMSkge1xuICAgICAgLy8gbGFzdCBpbWFnZVxuICAgICAgdGhpcy5jdXJyZW50SW1hZ2VDb21wb25lbnQucHJldkltYWdlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuY3VycmVudEltYWdlQ29tcG9uZW50Lm5leHRJbWFnZSgpO1xuICAgIH1cblxuICAgIHRoaXMuYnV0dG9uQWZ0ZXJIb29rLmVtaXQoZXZlbnRUb0VtaXQpO1xuICB9XG5cbiAgLyoqXG4gICAqIE1ldGhvZCBjYWxsZWQgYnkgdGhlIG5hdmlnYXRlIHVwcGVyIGJ1dHRvbi5cbiAgICogQHBhcmFtIEJ1dHRvbkV2ZW50IGV2ZW50IHBheWxvYWRcbiAgICovXG4gIG9uTmF2aWdhdGUoZXZlbnQ6IEJ1dHRvbkV2ZW50fgB7XG4gICAgY29uc3QgZXZlbnRUb0VtaXQ6IEJ1dHRvbkV2ZW50ID0gdGhpcy5nZXRCdXR0b25FdmVudFRvRW1pdChldmVudCk7XG4gICAgdGhpcy5idXR0b25CZWZvcmVIb29rLmVtaXQoZXZlbnRUb0VtaXQpO1xuICAgIC8vIFRvIHN1cHBvcnQgU1NSXG4gICAgaWYgKGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCkpIHtcbiAgICAgIGlmIChldmVudFRvRW1pdC5pbWFnZSAmJiBldmVudFRvRW1pdC5pbWFnZS5tb2RhbC5leHRVcmwpIHtcbiAgICAgICAgLy8gd2hlcmUgSSBzaG91bGQgb3BlbiB0aGlzIGxpbms/IFRoZSBjdXJyZW50IHRhYiBvciBhbm90aGVyIG9uZT9cbiAgICAgICAgaWYgKGV2ZW50VG9FbWl0LmJ1dHRvbiAmJiBldmVudFRvRW1pdC5idXR0b24uZXh0VXJsSW5OZXdUYWIpIHtcbiAgICAgICAgICB3aW5kb3cub3BlbihldmVudFRvRW1pdC5pbWFnZS5tb2RhbC5leHRVcmwsICdfYmxhbmsnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGV2ZW50VG9FbWl0LmltYWdlLm1vZGFsLmV4dFVybDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLmJ1dHRvbkFmdGVySG9vay5lbWl0KGV2ZW50VG9FbWl0KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBNZXRob2QgY2FsbGVkIGJ5IHRoZSBkb3dubG9hZCB1cHBlciBidXR0b24uXG4gICAqIEBwYXJhbSBCdXR0b25FdmVudCBldmVudCBwYXlsb2FkXG4gICAqL1xuICBvbkRvd25sb2FkKGV2ZW50OiBCdXR0b25FdmVudCkge1xuICAgIGNvbnN0IGV2ZW50VG9FbWl0OiBCdXR0b25FdmVudCA9IHRoaXMuZ2V0QnV0dG9uRXZlbnRUb0VtaXQoZXZlbnQpO1xuICAgIHRoaXMuYnV0dG9uQmVmb3JlSG9vay5lbWl0KGV2ZW50VG9FbWl0KTtcbiAgICB0aGlzLmRvd25sb2FfgW1hZ2UoKTtcbiAgICB0aGlzLmJ1dHRvbkFmdGVySG9vay5lbWl0KGV2ZW50VG9FbWl0KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBNZXRob2QgY2FsbGVkIGJ5IHRoZSBjbG9zZSB1cHBlciBidXR0b24uXG4gICAqIEBwYXJhbSBCdXR0b25FdmVudCBldmVudCBwYXlsb2FkXG4gICAqIEBwYXJhbSBBY3Rpb24gYWN0aW9uIHRoYXQgdHJpZ2dlcmVkIHRoZSBjbG9zZSBtZXRob2QuIGBBY3Rpb24uTk9STUFMYCBieSBkZWZhdWx0XG4gICAqL1xuICBvbkNsb3NlR2FsbGVyeShldmVudDogQnV0dG9uRXZlbnQsIGFjdGlvbjogQWN0aW9uID0gQWN0aW9uLk5PUk1BTCkge1xuICAgIGNvbnN0IGV2ZW50VG9FbWl0OiBCdXR0b25FdmVudCA9IHRoaXMuZ2V0QnV0dG9uRXZlbnRUb0VtaXQoZXZlbnQpO1xuICAgIHRoaXMuYnV0dG9uQmVmb3JlSG9vay5lbWl0KGV2ZW50VG9FbWl0KTtcbiAgICB0aGlzLmNsb3NlR2FsbGVyeShhY3Rpb24pO1xuICAgIHRoaXMuYnV0dG9uQWZ0ZXJIb29rLmVtaXQoZXZlbnRUb0VtaXQpO1xuICB9XG5cbiAgLyoqXG4gICAqIE1ldGhvZCB0byBjbG9zZSB0aGUgbW9kYWwgZ2FsbGVyeSBzcGVjaWZ5aW5nIHRoZSBhY3Rpb24uXG4gICAqIEl0IGFsc28gcmVzZXQgdGhlIGBrZXlib2FyZFNlcnZpY2VgIHRvIHByZXZlbnQgbXVsdGlwbGUgbGlzdGVuZXJzLlxuICAgKiBAcGFyYW0gQWN0aW9uIGFjdGlvbiB0eXBlLiBgQWN0aW9uLk5PUk1BTGAgYnkgZGVmYXVsdFxuICAgKiBAcGFyYW0gYm9vbGVhbiBpc0NhbGxlZEJ5U2VydmljZSBpcyB0cnVlIGlmIGNhbGxlZCBieSBnYWxsZXJ5LnNlcnZpY2UsIG90aGVyd2lzZSBmYWxzZVxuICAgKi9cbiAgY2xvc2VHYWxsZXJ5KGFjdGlvbjogQWN0aW9uID0gQWN0aW9uLk5PUk1BTCwgaXNDYWxsZWRCeVNlcnZpY2U6IGJvb2xlYW4gPSBmYWxzZSkge1xuICAgIHRoaXMuY2xvc2UuZW1pdChuZXcgSW1hZ2VNb2RhbEV2ZW50KGFjdGlvbiwgdHJ1ZSkpO1xuICAgIHRoaXMub3BlbmVkID0gZmFsc2U7XG4gICAgdGhpcy5rZXlib2FyZFNlcnZpY2UucmVzZXQoKTtcblxuICAgIC8vIHNob3dzIHNjcm9sbGJhclxuICAgIGRvY3VtZW50LmJvZHkuc3R5bGUub3ZlcmZsb3cgPSAndmlzaWJsZSc7XG5cbiAgICBpZiAoaXNDYWxsZWRCeVNlcnZpY2UpIHtcbiAgICAgIC8vIHRoZSBmb2xsb3dpbmcgaXMgcmVxdWlyZWQsIG90aGVyd2lzZSB0aGUgdmlldyB3aWxsIG5vdCBiZSB1cGRhdGVkXG4gICAgICAvLyB0aGlzIGhhcHBlbnMgb25seSBpZiBjYWxsZWQgYnkgZ2FsbGVyeS5zZXJ2aWNlXG4gICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBNZXRob2QgY2FsbGVkIHdoZW4geW91IGNsaWNrIG9uIGFuIGltYWdlIG9mIHlvdXIgcGxhaW4gKG9yIGlubGluZSkgZ2FsbGVyeS5cbiAgICogQHBhcmFtIG51bWJlciBpbmRleCBvZiB0aGUgY2xpY2tlZCBpbWFnZVxuICAgKi9cbiAgb25TaG93TW9kYWxHYWxsZXJ5KGluZGV4OiBudW1iZXIpIHtcbiAgICB0aGlzLnNob3dNb2RhbEdhbGxlcnkoaW5kZXgpO1xuICB9XG5cbiAgLyoqXG4gICAqIE1ldGhvZCB0byBzaG93IHRoZSBtb2RhbCBnYWxsZXJ5IGRpc3BsYXlpbmcgdGhlIGltYWdlIHdpdGhcbiAgICogdGhlIGluZGV4IHNwZWNpZmllZCBhcyBpbnB1dCBwYXJhbWV0ZXIuXG4gICAqIEl0IHdpbGwgYWxzbyByZWdpc3RlciBhIG5ldyBga2V5Ym9hcmRTZXJ2aWNlYCB0byBjYXRjaCBrZXlib2FyZCdzIGV2ZW50cyB0byBkb3dubG9hZCB0aGUgY3VycmVudFxuICAgKiBpbWFnZSB3aXRoIGtleWJvYXJkJ3Mgc2hvcnRjdXRzLiBUaGlzIHNlcnZpY2UsIHdpbGwgYmUgcmVtb3ZlZCBlaXRoZXIgd2hlbiBtb2RhbCBnYWxsZXJ5IGNvbXBvbmVudFxuICAgKiB3aWxsIGJlIGRlc3Ryb3llZCBvciB3aGVuIHRoZSBnYWxsZXJ5IGlzIGNsb3NlZCBpbnZva2luZyB0aGUgYGNsb3NlR2FsbGVyeWAgbWV0aG9kLlxuICAgKiBAcGFyYW0gbnVtYmVyIGluZGV4IG9mIHRoZSBpbWFnZSB0byBzaG93XG4gICAqIEBwYXJhbSBib29sZWFuIGlzQ2FsbGVkQnlTZXJ2aWNlIGlzIHRydWUgaWYgY2FsbGVkIGJ5IGdhbGxlcnkuc2VydmljZSwgb3RoZXJ3aXNlIGZhbHNlXG4gICAqL1xuICBzaG93TW9kYWxHYWxsZXJ5KGluZGV4OiBudW1iZXIsIGlzQ2FsbGVkQnlTZXJ2aWNlOiBib29sZWFuID0gZmFsc2UpIHtcbiAgICAvLyBoaWRlcyBzY3JvbGxiYXJcbiAgICBkb2N1bWVudC5ib2R5LnN0eWxlLm92ZXJmbG93ID0gJ2hpZGRlbic7XG5cbiAgICB0aGlzLmtleWJvYXJkU2VydmljZS5hZGQoKGV2ZW50OiBLZXlib2FyZEV2ZW50LCBjb21ibzogc3RyaW5nfgA9PiB7XG4gICAgICBpZiAoZXZlbnQucHJldmVudERlZmF1bHQpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIGludGVybmV0IGV4cGxvcmVyXG4gICAgICAgIGV2ZW50LnJldHVyblZhbHVlID0gZmFsc2U7XG4gICAgICB9XG4gICAgICB0aGlzLmRvd25sb2FfgW1hZ2UoKTtcbiAgICB9KTtcblxuICAgIHRoaXMub3BlbmVkID0gdHJ1ZTtcbiAgICB0aGlzLmN1cnJlbnRJbWFnZSA9IHRoaXMuaW1hZ2VzW2luZGV4XTtcblxuICAgIC8vIGVtaXQgYSBuZXcgSW1hZ2VNb2RhbEV2ZW50IHdpdGggdGhlIGluZGV4IG9mIHRoZSBjdXJyZW50IGltYWdlXG4gICAgdGhpcy5zaG93LmVtaXQobmV3IEltYWdlTW9kYWxFdmVudChBY3Rpb24uTE9BRCwgaW5kZXggKyAxfgk7XG5cbiAgICBpZiAoaXNDYWxsZWRCeVNlcnZpY2UpIHtcbiAgICAgIC8vIHRoZSBmb2xsb3dpbmcgaXMgcmVxdWlyZWQsIG90aGVyd2lzZSB0aGUgdmlldyB3aWxsIG5vdCBiZSB1cGRhdGVkXG4gICAgICAvLyB0aGlzIGhhcHBlbnMgb25seSBpZiBjYWxsZWQgYnkgZ2FsbGVyeS5zZXJ2aWNlXG4gICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBNZXRob2QgY2FsbGVkIHdoZW4gdGhlIGltYWdlIGNoYW5nZXMgYW5kIHVzZWQgdG8gdXBkYXRlIHRoZSBgY3VycmVudEltYWdlYCBvYmplY3QuXG4gICAqIEBwYXJhbSBJbWFnZU1vZGFsRXZlbnQgZXZlbnQgcGF5bG9hZFxuICAgKi9cbiAgb25DaGFuZ2VDdXJyZW50SW1hZ2UoZXZlbnQ6IEltYWdlTW9kYWxFdmVudCkge1xuICAgIGNvbnN0IG5ld0luZGV4OiBudW1iZXIgPSA8bnVtYmVyPmV2ZW50LnJlc3VsdDtcblxuICAgIC8vIFRPRE8gYWRkIHZhbGlkYXRpb25cbiAgICB0aGlzLmN1cnJlbnRJbWFnZSA9IHRoaXMuaW1hZ2VzW25ld0luZGV4XTtcblxuICAgIC8vIGVtaXQgZmlyc3QvbGFzdCBldmVudCBiYXNlZCBvbiBuZXdJbmRleCB2YWx1ZVxuICAgIHRoaXMuZW1pdEJvdW5kYXJ5RXZlbnQoZXZlbnQuYWN0aW9uLCBuZXdJbmRleCk7XG5cbiAgICAvLyBlbWl0IGN1cnJlbnQgdmlzaWJsZSBpbWFnZSBpbmRleFxuICAgIHRoaXMuc2hvdy5lbWl0KG5ldyBJbWFnZU1vZGFsRXZlbnQoZXZlbnQuYWN0aW9uLCBuZXdJbmRleCArIDEpKTtcbiAgfVxuXG4gIGlzUGxhaW5HYWxsZXJ5VmlzaWJsZSgpOiBib29sZWFuIHtcbiAgICBpZiAodGhpcy5wbGFpbkdhbGxlcnlDb25maWcgJiYgdGhpcy5wbGFpbkdhbGxlcnlDb25maWcubGF5b3V0ICYmIHRoaXMucGxhaW5HYWxsZXJ5Q29uZmlnLmxheW91dCBpbnN0YW5jZW9mIEFkdmFuY2VkTGF5b3V0fgB7XG4gICAgICByZXR1cm4gIXRoaXMucGxhaW5HYWxsZXJ5Q29uZmlnLmxheW91dC5oaWRlRGVmYXVsdFBsYWluR2FsbGVyeTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICAvKipcbiAgICogTWV0aG9kIGNhbGxlZCB3aGVuIHlvdSBjbGljayAnb3V0c2lkZScgKGkuZS4gb24gdGhlIHNlbWktdHJhbnNwYXJlbnQgYmFja2dyb3VuZClcbiAgICogdG8gY2xvc2UgdGhlIG1vZGFsIGdhbGxlcnkgaWYgYGVuYWJsZUNsb3NlT3V0c2lkZWAgaXMgdHJ1ZS5cbiAgICogQHBhcmFtIGJvb2xlYW4gZXZlbnQgcGF5bG9hZC4gVHJ1ZSB0byBjbG9zZSB0aGUgbW9kYWwgZ2FsbGVyeSwgZmFsc2Ugb3RoZXJ3aXNlXG4gICAqL1xuICBvbkNsaWNrT3V0c2lkZShldmVudDogYm9vbGVhbikge1xuICAgIGlmIChldmVudCAmJiB0aGlzLmVuYWJsZUNsb3NlT3V0c2lkZSkge1xuICAgICAgdGhpcy5jbG9zZUdhbGxlcnkoQWN0aW9uLkNMSUNLKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogTWV0aG9kIGNhbGxlZCB3aGVuIGFuIGltYWdlIGlzIGxvYWRlZCBhbmQgdGhlIGxvYWRpbmcgc3Bpbm5lciBoYXMgZ29uZS5cbiAgICogSXQgc2V0cyB0aGUgcHJldmlvdXNseUxvYWRlZCBmbGFnIGluc2lkZSB0aGUgSW1hZ2UgdG8gaGlkZSBsb2FkaW5nIHNwaW5uZXIgd2hlbiBkaXNwbGF5ZWQgYWdhaW4uXG4gICAqIEBwYXJhbSBJbWFnZUxvYWRFdmVudCBldmVudCBwYXlsb2FkXG4gICAqL1xuICBvbkltYWdlTG9hZChldmVudDogSW1hZ2VMb2FkRXZlbnQpIHtcbiAgICAvLyBjb25zb2xlLmxvZygnbW9kYWwtaW1hZ2Ugb25JbWFnZUxvYWQnLCBldmVudCk7XG4gICAgLy8gY29uc29sZS5sb2coJ21vZGFsLWltYWdlIG9uSW1hZ2VMb2FkIGltYWdlcyBiZWZvcmUnLCB0aGlzLmltYWdlcyk7XG5cbiAgICAvLyBzZXRzIGFzIHByZXZpb3VzbHkgbG9hZGVkIHRoZSBpbWFnZSB3aXRoIGluZGV4IHNwZWNpZmllZCBieSBgZXZlbnQuc3RhdHVzYFxuICAgIHRoaXMuaW1hZ2VzID0gdGhpcy5pbWFnZXMubWFwKChpbWc6IEludGVybmFsTGliSW1hZ2UpID0+IHtcbiAgICAgIGlmIChpbWcgJiYgaW1nLmlkID09PSBldmVudC5pZCkge1xuICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgaW1nLCB7IHByZXZpb3VzbHlMb2FkZWQ6IGV2ZW50LnN0YXR1cyB9KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBpbWc7XG4gICAgfSk7XG5cbiAgICAvLyBjb25zb2xlLmxvZygnbW9kYWwtaW1hZ2Ugb25JbWFnZUxvYWQgaW1hZ2VzIGFmdGVyJywgdGhpcy5pbWFnZXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIE1ldGhvZCBjYWxsZWQgd2hlbiBhIGRvdCBpcyBjbGlja2VkIGFuZCB1c2VkIHRvIHVwZGF0ZSB0aGUgY3VycmVudCBpbWFnZS5cbiAgICogQHBhcmFtIG51bWJlciBpbmRleCBvZiB0aGUgY2xpY2tlZCBkb3RcbiAgICovXG4gIG9uQ2xpY2tEb3QoaW5kZXg6IG51bWJlcikge1xuICAgIHRoaXMuY3VycmVudEltYWdlID0gdGhpcy5pbWFnZXNbaW5kZXhdO1xuICB9XG5cbiAgLyoqXG4gICAqIE1ldGhvZCBjYWxsZWQgd2hlbiBhbiBpbWFnZSBwcmV2aWV3IGlzIGNsaWNrZWQgYW5kIHVzZWQgdG8gdXBkYXRlIHRoZSBjdXJyZW50IGltYWdlLlxuICAgKiBAcGFyYW0gSW1hZ2UgcHJldmlldyBpbWFnZVxuICAgKi9cbiAgb25DbGlja1ByZXZpZXcocHJldmlldzogSW1hZ2UpIHtcbiAgICBjb25zdCBpbWFnZUZvdW5kOiBJbnRlcm5hbExpYkltYWdlIHwgdW5kZWZpbmVkID0gdGhpcy5pbWFnZXMuZmluZCgoaW1nOiBJbnRlcm5hbExpYkltYWdlfgA9PiBpbWcuaWQgPT09IHByZXZpZXcuaWQpO1xuICAgIGlmICghIWltYWdlRm91bmQpIHtcbiAgICAgIHRoaXMuY3VycmVudEltYWdlID0gPEludGVybmFsTGliSW1hZ2U+aW1hZ2VGb3VuZDtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogTWV0aG9kIHRvIGRvd25sb2FkIHRoZSBjdXJyZW50IGltYWdlLCBvbmx5IGlmIGBkb3dubG9hZGFibGVgIGlzIHRydWUuXG4gICAqIEl0IGNvbnRhaW5zIGFsc28gYSBsb2dpYyB0byBlbmFibGUgZG93bmxvYWRpbmcgZmVhdHVyZXMgYWxzbyBmb3IgSUUxMS5cbiAgICovXG4gIGRvd25sb2FfgW1hZ2UofgB7XG4gICAgaWYgKHRoaXMuY3VycmVudEltYWdlQ29uZmlnICYmICF0aGlzLmN1cnJlbnRJbWFnZUNvbmZpZy5kb3dubG9hZGFibGUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy8gSWYgSUUxMSBvciBNaWNyb3NvZnQgRWRnZSB1c2UgbXNTYXZlQmxvYiguLi4pXG4gICAgaWYgKHRoaXMuaXNJRW9yRWRnZSgpfgB7XG4gICAgICAvLyBJIGNhbm5vdCB1c2UgZmV0Y2ggQVBJIGJlY2F1c2UgSUUxMSBkb2Vzbid0IHN1cHBvcnQgaXQsXG4gICAgICAvLyBzbyBJIGhhdmUgdG8gc3dpdGNoIHRvIFhNTEh0dHBSZXF1ZXN0XG4gICAgICB0aGlzLmRvd25sb2FfgW1hZ2VPbmx5SUVvckVkZ2UoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gZm9yIGFsbCBvdGhlciBicm93c2Vyc1xuICAgICAgdGhpcy5kb3dubG9hZEltYWdlQWxsQnJvd3NlcnMoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogTWV0aG9kIHRvIGNsZWFudXAgcmVzb3VyY2VzLiBJbiBmYWN0LCB0aGlzIHdpbGwgcmVzZXQga2V5Ym9hcmQncyBzZXJ2aWNlLlxuICAgKiBUaGlzIGlzIGFuIEFuZ3VsYXIncyBsaWZlY3ljbGUgaG9vayB0aGF0IGlzIGNhbGxlZCB3aGVuIHRoaXMgY29tcG9uZW50IGlzIGRlc3Ryb3llZC5cbiAgICovXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMua2V5Ym9hcmRTZXJ2aWNlLnJlc2V0KCk7XG5cbiAgICBpZiAodGhpcy5nYWxsZXJ5U2VydmljZU5hdmlnYXRlU3Vic2NyaXB0aW9ufgB7XG4gICAgICB0aGlzLmdhbGxlcnlTZXJ2aWNlTmF2aWdhdGVTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuZ2FsbGVyeVNlcnZpY2VDbG9zZVN1YnNjcmlwdGlvbikge1xuICAgICAgdGhpcy5nYWxsZXJ5U2VydmljZUNsb3NlU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICAgIGlmICh0aGlzLmdhbGxlcnlTZXJ2aWNlVXBkYXRlU3Vic2NyaXB0aW9ufgB7XG4gICAgICB0aGlzLmdhbGxlcnlTZXJ2aWNlVXBkYXRlU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFByaXZhdGUgbWV0aG9kIHRvIGRvd25sb2FkIHRoZSBjdXJyZW50IGltYWdlIGZvciBhbGwgYnJvd3NlcnMgZXhjZXB0IGZvciBJRTExLlxuICAgKi9cbiAgcHJpdmF0ZSBkb3dubG9hZEltYWdlQWxsQnJvd3NlcnMofgB7XG4gICAgY29uc3QgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICBsaW5rLmhyZWYgPSA8c3RyaW5nPnRoaXMuY3VycmVudEltYWdlLm1vZGFsLmltZztcbiAgICBsaW5rLnNldEF0dHJpYnV0ZSgnZG93bmxvYWQnLCB0aGlzLmdldEZpbGVOYW1lKHRoaXMuY3VycmVudEltYWdlfgk7XG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChsaW5rKTtcbiAgICBsaW5rLmNsaWNrKCk7XG4gICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChsaW5rKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQcml2YXRlIG1ldGhvZCB0byBkb3dubG9hZCB0aGUgY3VycmVudCBpbWFnZSBvbmx5IGZvciBJRTExIHVzaW5nXG4gICAqIGN1c3RvbSBqYXZhc2NyaXB0J3MgbWV0aG9kcyBhdmFpbGFibGUgb25seSBvbiBJRS5cbiAgICovXG4gIHByaXZhdGUgZG93bmxvYWRJbWFnZU9ubHlJRW9yRWRnZSgpIHtcbiAgICBpZiAoaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkfgkge1xuICAgICAgY29uc3QgcmVxID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgICByZXEub3BlbignR0VUJywgPHN0cmluZz50aGlzLmN1cnJlbnRJbWFnZS5tb2RhbC5pbWcsIHRydWUpO1xuICAgICAgcmVxLnJlc3BvbnNlVHlwZSA9ICdhcnJheWJ1ZmZlcic7XG4gICAgICByZXEub25sb2FkID0gZXZlbnQgPT4ge1xuICAgICAgICBjb25zdCBibG9iID0gbmV3IEJsb2IoW3JlcS5yZXNwb25zZV0sIHsgdHlwZTogJ2ltYWdlL3BuZycgfSk7XG4gICAgICAgIHdpbmRvdy5uYXZpZ2F0b3IubXNTYXZlQmxvYihibG9iLCB0aGlzLmdldEZpbGVOYW1lKHRoaXMuY3VycmVudEltYWdlfgk7XG4gICAgICB9O1xuICAgICAgcmVxLnNlbmQoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUHJpdmF0ZSBtZXRob2QgdG8gZ2V0IHRoZSBgQnV0dG9uRXZlbnRgIHRvIGVtaXQsIG1lcmdpbmcgdGhlIGlucHV0IGBCdXR0b25FdmVudGBcbiAgICogd2l0aCB0aGUgY3VycmVudCBpbWFnZS5cbiAgICogQHBhcmFtIEJ1dHRvbkV2ZW50IGV2ZW50IHBheWxvYWQgdG8gcmV0dXJuXG4gICAqIEByZXR1cm5zIEJ1dHRvbkV2ZW50IGV2ZW50IHBheWxvYWQgd2l0aCB0aGUgY3VycmVudCBpbWFnZSBpbmNsdWRlZFxuICAgKi9cbiAgcHJpdmF0ZSBnZXRCdXR0b25FdmVudFRvRW1pdChldmVudDogQnV0dG9uRXZlbnQpOiBCdXR0b25FdmVudCB7XG4gICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oZXZlbnQsIHsgaW1hZ2U6IHRoaXMuY3VycmVudEltYWdlIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFByaXZhdGUgbWV0aG9kIHRvIGdldCB0aGUgZmlsZSBuYW1lIGZyb20gYW4gaW5wdXQgcGF0aC5cbiAgICogVGhpcyBpcyB1c2VkIGVpdGhlciB0byBnZXQgdGhlIGltYWdlJ3MgbmFtZSBmcm9tIGl0cyBwYXRoIG9yIGZyb20gdGhlIEltYWdlIGl0c2VsZixcbiAgICogaWYgc3BlY2lmaWVkIGFzICdkb3dubG9hZEZpbGVOYW1lJyBieSB0aGUgdXNlci5cbiAgICogQHBhcmFtIEltYWdlIGltYWdlIHRvIGV4dHJhY3QgaXRzIGZpbGUgbmFtZVxuICAgKiBAcmV0dXJucyBzdHJpbmcgc3RyaW5nIGZpbGUgbmFtZSBvZiB0aGUgaW5wdXQgaW1hZ2UuXG4gICAqL1xuICBwcml2YXRlIGdldEZpbGVOYW1lKGltYWdlOiBJbWFnZSk6IHN0cmluZyB7XG4gICAgaWYgKCFpbWFnZS5tb2RhbC5kb3dubG9hZEZpbGVOYW1lIHx8IGltYWdlLm1vZGFsLmRvd25sb2FkRmlsZU5hbWUubGVuZ3RoID09PSAwfgB7XG4gICAgICByZXR1cm4gKDxzdHJpbmc+dGhpcy5jdXJyZW50SW1hZ2UubW9kYWwuaW1nfg5yZXBsYWNlKC9eLipbXFxcXFxcL10vLCAnJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBpbWFnZS5tb2RhbC5kb3dubG9hZEZpbGVOYW1lO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBQcml2YXRlIG1ldGhvZCB0byBpbml0aWFsaXplIGBpbWFnZXNgIGFzIGFycmF5IG9mIGBJbWFnZWBzLlxuICAgKiBBbHNvLCBpdCB3aWxsIGVtaXQgSW1hZ2Vvd21vZGFNb2RhbEV2ZW50IHRvIHNheSB0aGF0IGltYWdlcyBhcmUgbG9hZGVkLlxuICAgKi9cbiAgcHJpdmF0ZSBpbml0SW1hZ2VzKCkge1xuICAgIHRoaXMuaW1hZ2VzID0gPEludGVybmFsTGliSW1hZ2VbXT50aGlzLm1vZGFsSW1hZ2VzO1xuICAgIHRoaXMuaGFzRGF0YS5lbWl0KG5ldyBJbWFnZU1vZGFsRXZlbnQoQWN0aW9uLkxPQUQsIHRydWUpKTtcbiAgICB0aGlzLnNob3dHYWxsZXJ5ID0gdGhpcy5pbWFnZXMubGVuZ3RoID4gMDtcbiAgfVxuXG4gIC8qKlxuICAgKiBQcml2YXRlIG1ldGhvZCB0byBlbWl0IGV2ZW50cyB3aGVuIGVpdGhlciB0aGUgbGFzdCBvciB0aGUgZmlyc3QgaW1hZ2UgYXJlIHZpc2libGUuXG4gICAqIEBwYXJhbSBhY3Rpb24gRW51bSBvZiB0eXBlIEFjdGlvbiB0aGF0IHJlcHJlc2VudHMgdGhlIHNvdXJjZSBvZiB0aGUgZXZlbnQgdGhhdCBjaGFuZ2VkIHRoZVxuICAgKiAgY3VycmVudCBpbWFnZSB0byB0aGUgZmlyc3Qgb25lIG9yIHRoZSBsYXN0IG9uZS5cbiAgICogQHBhcmFtIGluZGV4VG9DaGVjayBpcyB0aGUgaW5kZXggbnVtYmVyIG9mIHRoZSBpbWFnZSAodGhlIGZpcnN0IG9yIHRoZSBsYXN0IG9uZSkuXG4gICAqL1xuICBwcml2YXRlIGVtaXRCb3VuZGFyeUV2ZW50KGFjdGlvbjogQWN0aW9uLCBpbmRleFRvQ2hlY2s6IG51bWJlcikge1xuICAgIC8vIHRvIGVtaXQgZmlyc3QvbGFzdCBldmVudFxuICAgIHN3aXRjaCAoaW5kZXhUb0NoZWNrfgB7XG4gICAgICBjYXNlIDA6XG4gICAgICAgIHRoaXMuZmlyc3RJbWFnZS5lbWl0KG5ldyBJbWFnZU1vZGFsRXZlbnQoYWN0aW9uLCB0cnVlfgk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSB0aGlzLmltYWdlcy5sZW5ndGggLSAxOlxuICAgICAgICB0aGlzLmxhc3RJbWFnZS5lbWl0KG5ldyBJbWFnZU1vZGFsRXZlbnQoYWN0aW9uLCB0cnVlfgk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBQcml2YXRlIG1ldGhvZCB0byBjaGVjayBpZiB0aGlzIGxpYnJhcnkgaXMgcnVubmluZyBvblxuICAgKiBNaWNyb3NvZnQgYnJvd3NlcnMgb3Igbm90IChpLmUuIGl0IGRldGVjdHMgYm90aCBJRTExIGFuZCBFZGdlKVxuICAgKiBzdXBwb3J0aW5nIGFsc28gU2VydmVyLVNpZGUgUmVuZGVyaW5nLlxuICAgKiBJbnNwaXJlZCBieSBodHRwczovL21zZG4ubWljcm9zb2Z0LmNvbS9pdC1pdC9saWJyYXJ5L2hoNzc5MDE2KHY9dnMuODUpLmFzcHhcbiAgICogQHJldHVybnMgYW55IHRoZSByZXN1bHRcbiAgICovXG4gIHByaXZhdGUgaXNJRW9yRWRnZSgpOiBhbnkge1xuICAgIGlmIChpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpfgB7XG4gICAgICAvLyBpZiBib3RoIEJsb2IgY29uc3RydWN0b3IgYW5kIG1zU2F2ZU9yT3BlbkJsb2IgYXJlIHN1cHBvcnRlZCBieSB0aGUgY3VycmVudCBicm93c2VyXG4gICAgICByZXR1cm4gd2luZG93LkJsb2IgJiYgd2luZG93Lm5hdmlnYXRvci5tc1NhdmVPck9wZW5CbG9iO1xuICAgIH1cbiAgICBpZiAoaXNQbGF0Zm9ybVNlcnZlcih0aGlzLnBsYXRmb3JtSWQpfgB7XG4gICAgICAvLyBzZXJ2ZXIgb25seVxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG59XG4iXX0=