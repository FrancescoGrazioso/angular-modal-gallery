import { ChangeDetectorRef, EventEmitter, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ButtonEvent, ButtonsConfig } from '../../model/buttons-config.interface';
import { Image, ImageModalEvent } from '../../model/image.class';
import { Action } from '../../model/action.enum';
import { KeyboardConfig } from '../../model/keyboard-config.interface';
import { PreviewConfig } from '../../model/preview-config.interface';
import { SlideConfig } from '../../model/slide-config.interface';
import { AccessibilityConfig } from '../../model/accessibility.interface';
import { KeyboardService } from '../../services/keyboard.service';
import { GalleryService } from '../../services/gallery.service';
import { DotsConfig } from '../../model/dots-config.interface';
import { ImageLoadEvent } from '../current-image/current-image.component';
import { InternalLibImage } from '../../model/image-internal.class';
import { PlainGalleryConfig } from '../../model/plain-gallery-config.interface';
import { CurrentImageConfig } from '../../model/current-image-config.interface';
/**
 * Main Component of this library with both the plain and modal galleries.
 */
export declare class ModalGalleryComponent implements OnInit, OnDestroy, OnChanges {
    private keyboardService;
    private galleryService;
    private platformId;
    private changeDetectorRef;
    /**
     * Unique id (>=0) of the current instance of this library. This is useful when you are using
     * the service to call modal gallery without open it manually.
     * Right now is optional, but in upcoming major releases will be mandatory!!!
     */
    id: number;
    /**
     * Array of `Image` that represent the model of this library with all images, thumbs and so on.
     */
    modalImages: Image[];
    /**
     * Object of type `ButtonsConfig` to show/hide buttons.
     */
    buttonsConfig: ButtonsConfig;
    /**
     * Boolean to enable modal-gallery close behaviour when clicking
     * on the semi-transparent background. Enabled by default.
     */
    enableCloseOutside: boolean;
    /**
     * Interface to configure current image in modal-gallery.
     * For instance you can disable navigation on click on current image (enabled by default).
     */
    currentImageConfig: CurrentImageConfig;
    /**
     * Object of type `DotsConfig` to init DotsComponent's features.
     * For instance, it contains a param to show/hide dots.
     */
    dotsConfig: DotsConfig;
    /**
     * Object of type `PreviewConfig` to init PreviewsComponent's features.
     * For instance, it contains a param to show/hide previews.
     */
    previewConfig: PreviewConfig;
    /**
     * Object of type `SlideConfig` to init side previews and `infinite sliding`.
     */
    slideConfig: SlideConfig;
    /**
     * Object of type `AccessibilityConfig` to init custom accessibility features.
     * For instance, it contains titles, alt texts, aria-labels and so on.
     */
    accessibilityConfig: AccessibilityConfig;
    /**
     * Object of type `KeyboardConfig` to assign custom keys to ESC, RIGHT and LEFT keyboard's actions.
     */
    keyboardConfig: KeyboardConfig;
    /**
     * Object of type `PlainGalleryConfig` to configure the plain gallery.
     */
    plainGalleryConfig: PlainGalleryConfig;
    /**
     * Output to emit an event when the modal gallery is closed.
     */
    close: EventEmitter<ImageModalEvent>;
    /**
     * Output to emit an event when an image is changed.
     */
    show: EventEmitter<ImageModalEvent>;
    /**
     * Output to emit an event when the current image is the first one.
     */
    firstImage: EventEmitter<ImageModalEvent>;
    /**
     * Output to emit an event when the current image is the last one.
     */
    lastImage: EventEmitter<ImageModalEvent>;
    /**
     * Output to emit an event when the modal gallery is closed.
     */
    hasData: EventEmitter<ImageModalEvent>;
    /**
     * Output to emit an event when a button is clicked, but before that the action is triggered.
     */
    buttonBeforeHook: EventEmitter<ButtonEvent>;
    /**
     * Output to emit an event when a button is clicked, but after that the action is triggered.
     */
    buttonAfterHook: EventEmitter<ButtonEvent>;
    /**
     * Reference to the CurrentImageComponent to invoke methods on it.
     */
    currentImageComponent: any;
    /**
     * Boolean that it is true if the modal gallery is visible. False by default.
     */
    opened: boolean;
    /**
     * Boolean to open the modal gallery. False by default.
     */
    showGallery: boolean;
    /**
     * Array of `InternalLibImage` representing the model of this library with all images, thumbs and so on.
     */
    images: InternalLibImage[];
    /**
     * `Image` that is visible right now.
     */
    currentImage: InternalLibImage;
    private galleryServiceNavigateSubscription;
    private galleryServiceCloseSubscription;
    private galleryServiceUpdateSubscription;
    /**
     * HostListener to catch browser's back button and destroy the gallery.
     * This prevents weired behaviour about scrolling.
     * Added to fix this issue: https://github.com/fg96/angular-modal-gallery/issues/159
     */
    onPopState(e: Event): void;
    /**
     * Constructor with the injection of ´KeyboardService´ and an object to support Server-Side Rendering.
     */
    constructor(keyboardService: KeyboardService, galleryService: GalleryService, platformId: Object, changeDetectorRef: ChangeDetectorRef);
    /**
     * Method ´ngOnInit´ to init images calling `initImages()`.
     * This is an Angular's lifecycle hook, so its called automatically by Angular itself.
     * In particular, it's called only one time!!!
     */
    ngOnInit(): void;
    /**
     * Method ´ngOnChanges´ to re-init images if input is changed.
     * This is an Angular's lifecycle hook, so its called automatically by Angular itself.
     * In particular, it's called before `ngOnInit()` and whenever one or more data-bound input properties change.
     * @param changes `SimpleChanges` object of current and previous property values provided by Angular.
     */
    ngOnChanges(changes: SimpleChanges): void;
    /**
     * Method called by custom upper buttons.
     * @param ButtonEvent event payload
     */
    onCustomEmit(event: ButtonEvent): void;
    /**
     * Method called by the full-screen upper button.
     * @param ButtonEvent event payload
     */
    onFullScreen(event: ButtonEvent): void;
    /**
     * Method called by the delete upper button.
     * @param ButtonEvent event payload
     */
    onDelete(event: ButtonEvent): void;
    /**
     * Method called by the navigate upper button.
     * @param ButtonEvent event payload
     */
    onNavigate(event: ButtonEvent): void;
    /**
     * Method called by the download upper button.
     * @param ButtonEvent event payload
     */
    onDownload(event: ButtonEvent): void;
    /**
     * Method called by the close upper button.
     * @param ButtonEvent event payload
     * @param Action action that triggered the close method. `Action.NORMAL` by default
     */
    onCloseGallery(event: ButtonEvent, action?: Action): void;
    /**
     * Method to close the modal gallery specifying the action.
     * It also reset the `keyboardService` to prevent multiple listeners.
     * @param Action action type. `Action.NORMAL` by default
     * @param boolean isCalledByService is true if called by gallery.service, otherwise false
     */
    closeGallery(action?: Action, isCalledByService?: boolean): void;
    /**
     * Method called when you click on an image of your plain (or inline) gallery.
     * @param number index of the clicked image
     */
    onShowModalGallery(index: number): void;
    /**
     * Method to show the modal gallery displaying the image with
     * the index specified as input parameter.
     * It will also register a new `keyboardService` to catch keyboard's events to download the current
     * image with keyboard's shortcuts. This service, will be removed either when modal gallery component
     * will be destroyed or when the gallery is closed invoking the `closeGallery` method.
     * @param number index of the image to show
     * @param boolean isCalledByService is true if called by gallery.service, otherwise false
     */
    showModalGallery(index: number, isCalledByService?: boolean): void;
    /**
     * Method called when the image changes and used to update the `currentImage` object.
     * @param ImageModalEvent event payload
     */
    onChangeCurrentImage(event: ImageModalEvent): void;
    isPlainGalleryVisible(): boolean;
    /**
     * Method called when you click 'outside' (i.e. on the semi-transparent background)
     * to close the modal gallery if `enableCloseOutside` is true.
     * @param boolean event payload. True to close the modal gallery, false otherwise
     */
    onClickOutside(event: boolean): void;
    /**
     * Method called when an image is loaded and the loading spinner has gone.
     * It sets the previouslyLoaded flag inside the Image to hide loading spinner when displayed again.
     * @param ImageLoadEvent event payload
     */
    onImageLoad(event: ImageLoadEvent): void;
    /**
     * Method called when a dot is clicked and used to update the current image.
     * @param number index of the clicked dot
     */
    onClickDot(index: number): void;
    /**
     * Method called when an image preview is clicked and used to update the current image.
     * @param Image preview image
     */
    onClickPreview(preview: Image): void;
    /**
     * Method to download the current image, only if `downloadable` is true.
     * It contains also a logic to enable downloading features also for IE11.
     */
    downloadImage(): void;
    /**
     * Method to cleanup resources. In fact, this will reset keyboard's service.
     * This is an Angular's lifecycle hook that is called when this component is destroyed.
     */
    ngOnDestroy(): void;
    /**
     * Private method to download the current image for all browsers except for IE11.
     */
    private downloadImageAllBrowsers;
    /**
     * Private method to download the current image only for IE11 using
     * custom javascript's methods available only on IE.
     */
    private downloadImageOnlyIEorEdge;
    /**
     * Private method to get the `ButtonEvent` to emit, merging the input `ButtonEvent`
     * with the current image.
     * @param ButtonEvent event payload to return
     * @returns ButtonEvent event payload with the current image included
     */
    private getButtonEventToEmit;
    /**
     * Private method to get the file name from an input path.
     * This is used either to get the image's name from its path or from the Image itself,
     * if specified as 'downloadFileName' by the user.
     * @param Image image to extract its file name
     * @returns string string file name of the input image.
     */
    private getFileName;
    /**
     * Private method to initialize `images` as array of `Image`s.
     * Also, it will emit ImageowmodaModalEvent to say that images are loaded.
     */
    private initImages;
    /**
     * Private method to emit events when either the last or the first image are visible.
     * @param action Enum of type Action that represents the source of the event that changed the
     *  current image to the first one or the last one.
     * @param indexToCheck is the index number of the image (the first or the last one).
     */
    private emitBoundaryEvent;
    /**
     * Private method to check if this library is running on
     * Microsoft browsers or not (i.e. it detects both IE11 and Edge)
     * supporting also Server-Side Rendering.
     * Inspired by https://msdn.microsoft.com/it-it/library/hh779016(v=vs.85).aspx
     * @returns any the result
     */
    private isIEorEdge;
}
