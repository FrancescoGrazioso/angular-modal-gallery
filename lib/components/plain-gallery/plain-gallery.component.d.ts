import { EventEmitter, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AccessibilityConfig } from '../../model/accessibility.interface';
import { Image } from '../../model/image.class';
import { Size } from '../../model/size.interface';
import { PlainGalleryConfig } from '../../model/plain-gallery-config.interface';
/**
 * Component with the gallery of thumbs.
 * In receives an array of Images, a boolean to show/hide
 * the gallery (feature used by imagePointer) and a config
 * object to customize the behaviour of this component.
 * Also, it emits click events as outputs.
 */
export declare class PlainGalleryComponent implements OnInit, OnChanges {
    /**
     * Array of `Image` that represent the model of this library with all images, thumbs and so on.
     */
    images: Image[];
    /**
     * Boolean to show/hide plain gallery. If true the plain gallery will be visible, false otherwise.
     */
    showGallery: boolean;
    /**
     * Object of type `PlainGalleryConfig` to configure the plain gallery.
     */
    plainGalleryConfig: PlainGalleryConfig;
    /**
     * Object of type `AccessibilityConfig` to init custom accessibility features.
     * For instance, it contains titles, alt texts, aria-labels and so on.
     */
    accessibilityConfig: AccessibilityConfig;
    /**
     * Output to emit an event when an image is changed.
     */
    show: EventEmitter<number>;
    /**
     * Object of type `PlainGalleryConfig` to configure this component.
     */
    configPlainGallery: PlainGalleryConfig;
    /**
     * Bi-dimensional array of `Image` object to store images to display as plain gallery.
     * [] by default.
     */
    imageGrid: Image[][];
    /**
     * Size object used in the template to resize images.
     */
    size: Size;
    /**
     * Boolean passed as input to `fg-wrap` directive to configure flex-wrap css property.
     * However it's not enough, because you need to limit the width using `widthStyle` public variable.
     * For more info check https://developer.mozilla.org/it/docs/Web/CSS/flex-wrap
     */
    wrapStyle: boolean;
    /**
     * String passed as input to `fg-wrap` directive to set width to be able to force overflow.
     * In this way, `wrapStyle` (flex-wrap css property) will be used as requested.
     */
    widthStyle: string;
    /**
     * String passed as input to `fg-direction` directive to set the flex-direction css property.
     * For more info check https://developer.mozilla.org/it/docs/Web/CSS/flex-direction
     */
    directionStyle: string;
    /**
     * String passed as input to `fg-direction` directive to set the justify-content css property.
     * For more info check https://developer.mozilla.org/it/docs/Web/CSS/justify-content
     */
    justifyStyle: string;
    /**
     * Default image size object
     */
    private defaultSize;
    /**
     * Default layout config object
     * Note that length=-1 means infinity
     */
    private defaultLayout;
    /**
     * Default plain gallery config object
     */
    private defaultPlainConfig;
    /**
     * Method ´ngOnInit´ to init both `configPlainGallery` calling `initPlainGalleryConfig()`
     * and `imageGrid invoking `initImageGrid()`.
     * This is an Angular's lifecycle hook, so its called automatically by Angular itself.
     * In particular, it's called only one time!!!
     */
    ngOnInit(): void;
    /**
     * Method ´ngOnChanges´ to update both `imageGrid` and`configPlainGallery`.
     * This is an Angular's lifecycle hook, so its called automatically by Angular itself.
     * In particular, it's called when any data-bound property of a directive changes!!!
     */
    ngOnChanges(changes: SimpleChanges): void;
    /**
     * Method called when you click on an image of the plain (or inline) gallery.
     * This will emit the show event with the index number as payload.
     * @param number index of the clicked image
     */
    showModalGallery(index: number): void;
    /**
     * Method called when you click on an image of the plain (or inline) gallery.
     * This will emit the show event with the image as payload.
     * @param Image img is the Image to show
     */
    showModalGalleryByImage(img: Image): void;
    /**
     * Method to get `alt attribute`.
     * `alt` specifies an alternate text for an image, if the image cannot be displayed.
     * @param Image image to get its alt description.
     * @returns string alt description of the image
     */
    getAltPlainDescriptionByImage(image: Image): string;
    /**
     * Method to get the title for an image.
     * @param Image image to get its title
     * @returns string the title of the input image
     */
    getTitleDisplay(image: Image): string;
    /**
     * Method used in the template to track ids in ngFor.
     * @param number index of the array
     * @param Image item of the array
     * @returns number the id of the item
     */
    trackById(index: number, item: Image): number;
    /**
     * Private method to build and return a `PlainGalleryConfig` object, proving also default values.
     * @returns PlainGalleryConfig the plain gallery configuration
     * @throws an Error if layout and strategy aren't compatible
     */
    private initPlainGalleryConfig;
    /**
     * Private method to init both `imageGrid` and other style variables,
     * based on the layout type.
     */
    private initImageGrid;
}
