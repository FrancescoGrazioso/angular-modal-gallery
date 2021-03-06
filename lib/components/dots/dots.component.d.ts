import { EventEmitter, OnInit } from '@angular/core';
import { AccessibleComponent } from '../accessible.component';
import { AccessibilityConfig } from '../../model/accessibility.interface';
import { Image } from '../../model/image.class';
import { InternalLibImage } from '../../model/image-internal.class';
import { DotsConfig } from '../../model/dots-config.interface';
/**
 * Component with clickable dots (small circles) to navigate between images inside the modal gallery.
 */
export declare class DotsComponent extends AccessibleComponent implements OnInit {
    /**
     * Object of type `InternalLibImage` that represent the visible image.
     */
    currentImage: InternalLibImage;
    /**
     * Array of `InternalLibImage` that represent the model of this library with all images,
     * thumbs and so on.
     */
    images: InternalLibImage[];
    /**
     * Object of type `DotsConfig` to init DotsComponent's features.
     * For instance, it contains a param to show/hide this component.
     */
    dotsConfig: DotsConfig;
    /**
     * Object of type `AccessibilityConfig` to init custom accessibility features.
     * For instance, it contains titles, alt texts, aria-labels and so on.
     */
    accessibilityConfig: AccessibilityConfig;
    /**
     * Output to emit clicfg on dots. The payload contains a number that represent
     * the index of the clicked dot.
     */
    clickDot: EventEmitter<number>;
    /**
     * Object of type `DotsConfig` exposed to the template. This field is initialized
     * applying transformations, default values and so on to the input of the same type.
     */
    configDots: DotsConfig;
    /**
     * Method ´ngOnInit´ to build `configDots` applying a default value.
     * This is an Angular's lifecycle hook, so its called automatically by Angular itself.
     * In particular, it's called only one time!!!
     */
    ngOnInit(): void;
    /**
     * Method to check if an image is active (i.e. the current image).
     * It checfg currentImage and images to prevent errors.
     * @param number index of the image to check if it's active or not
     * @returns boolean true if is active (and input params are valid), false otherwise
     */
    isActive(index: number): boolean;
    /**
     * Method called by events from keyboard and mouse.
     * @param number index of the dot
     * @param KeyboardEvent | MouseEvent event payload
     */
    onDotEvent(index: number, event: KeyboardEvent | MouseEvent): void;
    /**
     * Method used in the template to track ids in ngFor.
     * @param number index of the array
     * @param Image item of the array
     * @returns number the id of the item
     */
    trackById(index: number, item: Image): number;
}
