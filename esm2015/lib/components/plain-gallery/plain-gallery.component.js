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
import { AdvancedLayout, GridLayout, LineLayout, PlainGalleryStrategy } from '../../model/plain-gallery-config.interface';
import { getIndex } from '../../utils/image.util';
/**
 * Component with the gallery of thumbs.
 * In receives an array of Images, a boolean to show/hide
 * the gallery (feature used by imagePointer) and a config
 * object to customize the behaviour of this component.
 * Also, it emits click events as outputs.
 */
export class PlainGalleryComponent {
    constructor() {
        /**
         * Output to emit an event when an image is changed.
         */
        this.show = new EventEmitter();
        /**
         * Bi-dimensional array of `Image` object to store images to display as plain gallery.
         * [] by default.
         */
        this.imageGrid = [];
        /**
         * Boolean passed as input to `fg-wrap` directive to configure flex-wrap css property.
         * However it's not enough, because you need to limit the width using `widthStyle` public variable.
         * For more info check https://developer.mozilla.org/it/docs/Web/CSS/flex-wrap
         */
        this.wrapStyle = false;
        /**
         * String passed as input to `fg-wrap` directive to set width to be able to force overflow.
         * In this way, `wrapStyle` (flex-wrap css property) will be used as requested.
         */
        this.widthStyle = '';
        /**
         * Default image size object
         */
        this.defaultSize = { width: '50px', height: 'auto' };
        /**
         * Default layout config object
         * Note that length=-1 means infinity
         */
        this.defaultLayout = new LineLayout(this.defaultSize, { length: -1, wrap: false }, 'flex-start');
        /**
         * Default plain gallery config object
         */
        this.defaultPlainConfig = {
            strategy: PlainGalleryStrategy.ROW,
            layout: this.defaultLayout,
            advanced: { aTags: false, additionalBackground: '50% 50%/cover' }
        };
    }
    /**
     * Method ´ngOnInit´ to init both `configPlainGallery` calling `initPlainGalleryConfig()`
     * and `imageGrid invoking `initImageGrid()`.
     * This is an Angular's lifecycle hook, so its called automatically by Angular itself.
     * In particular, it's called only one time!!!
     * @return {?}
     */
    ngOnInit() {
        this.configPlainGallery = this.initPlainGalleryConfig();
        this.initImageGrid();
    }
    /**
     * Method ´ngOnChanges´ to update both `imageGrid` and`configPlainGallery`.
     * This is an Angular's lifecycle hook, so its called automatically by Angular itself.
     * In particular, it's called when any data-bound property of a directive changes!!!
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        /** @type {?} */
        const imagesChange = changes["images"];
        /** @type {?} */
        const configChange = changes["plainGalleryConfig"];
        // I'm using !change.firstChange because the first time will be called both onInit and onChange and I don't
        // want to execute initialization two times.
        if (configChange &&
            !configChange.firstChange &&
            (configChange.previousValue !== configChange.currentValue || (!configChange.previousValue && !configChange.currentValue))) {
            this.configPlainGallery = this.initPlainGalleryConfig();
        }
        if (imagesChange && !imagesChange.firstChange && imagesChange.previousValue !== imagesChange.currentValue) {
            this.initImageGrid();
        }
    }
    /**
     * Method called when you click on an image of the plain (or inline) gallery.
     * This will emit the show event with the index number as payload.
     * @param {?} index
     * @return {?}
     */
    showModalGallery(index) {
        this.show.emit(index);
    }
    /**
     * Method called when you click on an image of the plain (or inline) gallery.
     * This will emit the show event with the image as payload.
     * @param {?} img
     * @return {?}
     */
    showModalGalleryByImage(img) {
        /** @type {?} */
        const index = this.images.findIndex((val) => val && img && val.id === img.id);
        this.showModalGallery(index);
    }
    /**
     * Method to get `alt attribute`.
     * `alt` specifies an alternate text for an image, if the image cannot be displayed.
     * @param {?} image
     * @return {?} string alt description of the image
     */
    getAltPlainDescriptionByImage(image) {
        if (!image) {
            return '';
        }
        return image.plain && image.plain.description ? image.plain.description : `Image ${getIndex(image, this.images) + 1}`;
    }
    /**
     * Method to get the title for an image.
     * @param {?} image
     * @return {?} string the title of the input image
     */
    getTitleDisplay(image) {
        /** @type {?} */
        let description = '';
        if (image.plain && image.plain.description) {
            description = image.plain.description;
        }
        else if (image.modal && image.modal.description) {
            description = image.modal.description;
        }
        /** @type {?} */
        const currentIndex = getIndex(image, this.images);
        /** @type {?} */
        const prevDescription = 'Image ' + (currentIndex + 1) + '/' + this.images.length;
        /** @type {?} */
        let currImgDescription = description ? description : '';
        if (currImgDescription !== '') {
            currImgDescription = ' - ' + currImgDescription;
        }
        return prevDescription + currImgDescription;
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
     * Private method to build and return a `PlainGalleryConfig` object, proving also default values.
     * @throws an Error if layout and strategy aren't compatible
     * @return {?} PlainGalleryConfig the plain gallery configuration
     */
    initPlainGalleryConfig() {
        /** @type {?} */
        const config = Object.assign({}, this.defaultPlainConfig, this.plainGalleryConfig);
        if (config.layout instanceof LineLayout) {
            if (config.strategy !== PlainGalleryStrategy.ROW && config.strategy !== PlainGalleryStrategy.COLUMN) {
                throw new Error('LineLayout requires either ROW or COLUMN strategy');
            }
            if (!config.layout || !config.layout.breakConfig) {
                throw new Error('Both layout and breakConfig must be valid');
            }
        }
        if (config.layout instanceof GridLayout) {
            if (config.strategy !== PlainGalleryStrategy.GRID) {
                throw new Error('GridLayout requires GRID strategy');
            }
            if (!config.layout || !config.layout.breakConfig) {
                throw new Error('Both layout and breakConfig must be valid');
            }
            // force wrap for grid layout
            config.layout.breakConfig.wrap = true;
        }
        if (config.layout instanceof AdvancedLayout) {
            if (config.strategy !== PlainGalleryStrategy.CUSTOM) {
                throw new Error('AdvancedLayout requires CUSTOM strategy');
            }
        }
        return config;
    }
    /**
     * Private method to init both `imageGrid` and other style variables,
     * based on the layout type.
     * @return {?}
     */
    initImageGrid() {
        /** @type {?} */
        const config = this.configPlainGallery;
        // reset the array to prevent issues in case of GridLayout
        this.imageGrid = [];
        if (config.layout instanceof LineLayout) {
            /** @type {?} */
            const layout = config.layout;
            /** @type {?} */
            const row = this.images.filter((val, i) => i < layout.breakConfig.length || layout.breakConfig.length === -1);
            this.imageGrid = [row];
            this.size = config.layout.size;
            switch (config.strategy) {
                case PlainGalleryStrategy.ROW:
                    this.directionStyle = 'row';
                    break;
                case PlainGalleryStrategy.COLUMN:
                    this.directionStyle = 'column';
                    this.wrapStyle = layout.breakConfig.wrap;
                    break;
            }
            this.justifyStyle = layout.justify;
        }
        if (config.layout instanceof GridLayout) {
            /** @type {?} */
            const layout = config.layout;
            /** @type {?} */
            const count = Math.ceil(this.images.length / layout.breakConfig.length);
            /** @type {?} */
            let start = 0;
            /** @type {?} */
            let end = layout.breakConfig.length - 1;
            for (let j = 0; j < count; j++) {
                /** @type {?} */
                const row = this.images.filter((val, i) => i >= start && i <= end);
                this.imageGrid.push(row);
                start = end + 1;
                end = start + layout.breakConfig.length - 1;
            }
            this.size = config.layout.size;
            /** @type {?} */
            const pixels = +layout.size.width.replace('px', '');
            this.widthStyle = pixels * layout.breakConfig.length + pixels / 2 + 'px';
            this.wrapStyle = layout.breakConfig.wrap;
            this.directionStyle = 'row';
        }
        if (config.layout instanceof AdvancedLayout) {
            this.imageGrid = [this.images];
        }
    }
}
PlainGalleryComponent.decorators = [
    { type: Component, args: [{
                selector: 'fg-plain-gallery',
                template: "<div *ngIf=\"showGallery\"\n     class=\"plain-container\"\n     fgWrap [wrap]=\"wrapStyle\" [width]=\"widthStyle\"\n     fgDirection [direction]=\"directionStyle\" [justify]=\"justifyStyle\"\n     [attr.aria-label]=\"accessibilityConfig?.plainGalleryContentAriaLabel\"\n     [title]=\"accessibilityConfig?.plainGalleryContentTitle\">\n\n  <ng-container *ngFor=\"let imgRow of imageGrid; let i = index\">\n    <ng-container *ngFor=\"let imgCol of imgRow; let j = index\">\n\n      <ng-container *ngIf=\"!configPlainGallery.advanced?.aTags; else aTags\">\n        <img *ngIf=\"imgCol?.modal?.img\"\n             [src]=\"imgCol.plain?.img ? imgCol.plain.img : imgCol.modal.img\"\n             class=\"image\"\n             fgSize [sizeConfig]=\"{width: size?.width, height: size?.height}\"\n             [attr.aria-label]=\"imgCol.plain?.ariaLabel\"\n             [title]=\"imgCol.plain?.title ? imgCol.plain.title : getTitleDisplay(imgCol)\"\n             alt=\"{{imgCol.plain?.alt ? imgCol.plain.alt : getAltPlainDescriptionByImage(imgCol)}}\"\n             [tabindex]=\"0\" role=\"img\"\n             (click)=\"showModalGalleryByImage(imgCol)\" (keyup)=\"showModalGalleryByImage(imgCol)\"/>\n      </ng-container>\n\n      <!-- Add directive to set background with the image url as param to pass thumb or img-->\n      <!-- to do something like this <a style=\"background: url('path to image') 50% 50%/cover\">.-->\n      <ng-template #aTags>\n        <a *ngIf=\"imgCol?.modal?.img\"\n           class=\"a-tag-image\"\n           fgATagBgImage [image]=\"imgCol\" [style]=\"configPlainGallery.advanced?.additionalBackground\"\n           fgSize [sizeConfig]=\"{width: size?.width, height: size?.height}\"\n           [attr.aria-label]=\"imgCol.plain?.ariaLabel\"\n           [title]=\"imgCol.plain?.title ? imgCol.plain.title : getTitleDisplay(imgCol)\"\n           [tabindex]=\"0\"\n           (click)=\"showModalGallery(j)\" (keyup)=\"showModalGallery(j)\"></a>\n      </ng-template>\n\n    </ng-container>\n  </ng-container>\n\n</div>\n\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".plain-container{align-items:center;display:flex}.plain-container .image{cursor:pointer;height:auto;margin-left:2px;margin-right:2px;width:50px}.plain-container .image:hover{filter:brightness(40%);-webkit-filter:brightness(40%);transition:.3s}.plain-container .a-tag-image{cursor:pointer;margin-left:2px;margin-right:2px}"]
            }] }
];
PlainGalleryComponent.propDecorators = {
    images: [{ type: Input }],
    showGallery: [{ type: Input }],
    plainGalleryConfig: [{ type: Input }],
    accessibilityConfig: [{ type: Input }],
    show: [{ type: Output }]
};
if (false) {
    /**
     * Array of `Image` that represent the model of this library with all images, thumbs and so on.
     * @type {?}
     */
    PlainGalleryComponent.prototype.images;
    /**
     * Boolean to show/hide plain gallery. If true the plain gallery will be visible, false otherwise.
     * @type {?}
     */
    PlainGalleryComponent.prototype.showGallery;
    /**
     * Object of type `PlainGalleryConfig` to configure the plain gallery.
     * @type {?}
     */
    PlainGalleryComponent.prototype.plainGalleryConfig;
    /**
     * Object of type `AccessibilityConfig` to init custom accessibility features.
     * For instance, it contains titles, alt texts, aria-labels and so on.
     * @type {?}
     */
    PlainGalleryComponent.prototype.accessibilityConfig;
    /**
     * Output to emit an event when an image is changed.
     * @type {?}
     */
    PlainGalleryComponent.prototype.show;
    /**
     * Object of type `PlainGalleryConfig` to configure this component.
     * @type {?}
     */
    PlainGalleryComponent.prototype.configPlainGallery;
    /**
     * Bi-dimensional array of `Image` object to store images to display as plain gallery.
     * [] by default.
     * @type {?}
     */
    PlainGalleryComponent.prototype.imageGrid;
    /**
     * Size object used in the template to resize images.
     * @type {?}
     */
    PlainGalleryComponent.prototype.size;
    /**
     * Boolean passed as input to `fg-wrap` directive to configure flex-wrap css property.
     * However it's not enough, because you need to limit the width using `widthStyle` public variable.
     * For more info check https://developer.mozilla.org/it/docs/Web/CSS/flex-wrap
     * @type {?}
     */
    PlainGalleryComponent.prototype.wrapStyle;
    /**
     * String passed as input to `fg-wrap` directive to set width to be able to force overflow.
     * In this way, `wrapStyle` (flex-wrap css property) will be used as requested.
     * @type {?}
     */
    PlainGalleryComponent.prototype.widthStyle;
    /**
     * String passed as input to `fg-direction` directive to set the flex-direction css property.
     * For more info check https://developer.mozilla.org/it/docs/Web/CSS/flex-direction
     * @type {?}
     */
    PlainGalleryComponent.prototype.directionStyle;
    /**
     * String passed as input to `fg-direction` directive to set the justify-content css property.
     * For more info check https://developer.mozilla.org/it/docs/Web/CSS/justify-content
     * @type {?}
     */
    PlainGalleryComponent.prototype.justifyStyle;
    /**
     * Default image size object
     * @type {?}
     */
    PlainGalleryComponent.prototype.defaultSize;
    /**
     * Default layout config object
     * Note that length=-1 means infinity
     * @type {?}
     */
    PlainGalleryComponent.prototype.defaultLayout;
    /**
     * Default plain gallery config object
     * @type {?}
     */
    PlainGalleryComponent.prototype.defaultPlainConfig;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxhaW4tZ2FsbGVyeS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9tb2RhbC1hbmd1bGFyLWdhbGxlcnkvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9wbGFpbi1nYWxsZXJ5L3BsYWluLWdhbGxlcnkuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXdCQSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLFlBQVfgRUFBRSxLQUFLLEVBQXFCLE1BQU0sRUFBK0IsTUFBTSxlQUFlLENBQUM7QUFLaEosT0FBTyxFQUFFLGNBQWMsRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFzQixvQkFBb0IsRUFBRSxNQUFNLDRDQUE0QyxDQUFDO0FBRTlJLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQzs7Ozs7Ozs7QUFlbEQsTUFBTTs7Ozs7b0JBc0JtQyxJQUFJLFlBQVfgRUFBVTs7Ozs7eUJBVzFDLEVBQUU7Ozs7Ozt5QkFVYixLQUFLOzs7OzswQkFLSixFQUFFOzs7OzJCQWVhLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFOzs7Ozs2QkFLekIsSUFBSSxVQUFVLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUUsWUFBWSxDQUFDOzs7O2tDQUk5RDtZQUMvQyxRQUFRLEVBQUUsb0JBQW9CLENBQUMsR0FBRztZQUNsQyxNQUFNLEVBQUUsSUFBSSxDQUFDLGFBQWE7WUFDMUIsUUFBUSxFQUFFLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxvQkFBb0IsRUFBRSxlQUFlLEVBQUU7U0FDbEU7Ozs7Ozs7OztJQVFELFFBQVE7UUFDTixJQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDLHNCQUFzQixFQUFFLENBQUM7UUFDeEQsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO0tBQ3RCOzs7Ozs7OztJQU9ELFdBQVcsQ0FBQyxPQUFzQjs7UUFDaEMsTUFBTSxZQUFZLEdBQWlCLE9BQU8sV0FBUTs7UUFDbEQsTUFBTSxZQUFZLEdBQWlCLE9BQU8sdUJBQW9COzs7UUFJOUQsSUFDRSxZQUFZO1lBQ1osQ0FBQyxZQUFZLENBQUMsV0FBVztZQUN6QixDQUFDLFlBQVfgQ0FBQyxhQUFhLEtBQUssWUFBWSxDQUFDLFlBQVfgSUFBSSxDQUFDLENBQUMsWUFBWSxDQUFDLGFBQWEsSUFBSSxDQUFDLFlBQVfgQ0FBQyxZQUFZLENBQUMsQ0FBQyxFQUN6SDtZQUNBLElBQUfgQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztTQUN6RDtRQUNELElBQUfgWUFBWSxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsSUFBSSxZQUFZLENBQUMsYUFBYSxLQUFLLFlBQVfgQ0FBQyxZQUFZLEVBQUU7WUFDekcsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1NBQ3RCO0tBQ0Y7Ozs7Ozs7SUFPRCxnQkFBZ0IsQ0FBQyxLQUFhO1FBQzVCLElBQUfgQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQ3ZCOzs7Ozs7O0lBT0QsdUJBQXVCLENBQUMsR0FBVTs7UUFDaEMsTUFBTSxLQUFLLEdBQVcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxHQUFVLEVBQUUsRUFBRSxDQUFDLEdBQUcsSUFBSSxHQUFHLElBQUfgR0FBRyxDQUFDLEVBQUUsS0FBSyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDN0YsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQzlCOzs7Ozs7O0lBUUQsNkJBQTZCLENBQUMsS0FBWTtRQUN4QyxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ1YsT0FBTyxFQUFFLENBQUM7U0FDWDtRQUNELE9BQU8sS0FBSyxDQUFDLEtBQUssSUFBSSxLQUFLLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLFNBQVMsUUFBUSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUM7S0FDdkg7Ozs7OztJQU9ELGVBQWUsQ0FBQyxLQUFZOztRQUMxQixJQUFJLFdBQVcsR0FBRyxFQUFFLENBQUM7UUFFckIsSUFBSSxLQUFLLENBQUMsS0FBSyxJQUFJLEtBQUssQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFFO1lBQzFDLFdBQVcsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQztTQUN2QzthQUFNLElBQUfgS0FBSyxDQUFDLEtBQUssSUFBSSxLQUFLLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRTtZQUNqRCxXQUFXLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUM7U0FDdkM7O1FBRUQsTUFBTSxZQUFZLEdBQVcsUUFBUSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7O1FBQzFELE1BQU0sZUFBZSxHQUFXLFFBQVEsR0FBRyxDQUFDLFlBQVfgR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUM7O1FBQ3pGLElBQUfga0JBQWtCLEdBQVcsV0FBVyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUVoRSxJQUFJLGtCQUFrQixLQUFLLEVBQUUsRUFBRTtZQUM3QixrQkFBa0IsR0FBRyxLQUFLLEdBQUcsa0JBQWtCLENBQUM7U0FDakQ7UUFDRCxPQUFPLGVBQWUsR0FBRyxrQkFBa0IsQ0FBQztLQUM3Qzs7Ozs7OztJQVFELFNBQVMsQ0FBQyxLQUFhLEVBQUUsSUFBVztRQUNsQyxPQUFPLElBQUfgQ0FBQyxFQUFFLENBQUM7S0FDaEI7Ozs7OztJQU9PLHNCQUFzQjs7UUFDNUIsTUFBTSxNQUFNLEdBQXVCLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLElBQUfgQ0FBQyxrQkFBa0IsRUFBRSxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQztRQUV2RyxJQUFJLE1BQU0sQ0FBQyxNQUFNLFlBQVfgVUFBVSxFQUFFO1lBQ3ZDLElBQUfgTUFBTSxDQUFDLFFBQVEsS0FBSyxvQkFBb0IsQ0FBQyxHQUFHLElBQUfgTUFBTSxDQUFDLFFBQVEsS0FBSyxvQkFBb0IsQ0FBQyxNQUFNLEVBQUU7Z0JBQ25HLE1BQU0sSUFBSSxLQUFLLENBQUMsbURBQW1ELENBQUMsQ0FBQzthQUN0RTtZQUNELElBQUfgQ0FBQyxNQUFNLENBQUMsTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxXQUFXLEVBQUU7Z0JBQ2hELE1BQU0sSUFBSSxLQUFLLENBQUMsMkNBQTJDLENBQUMsQ0FBQzthQUM5RDtTQUNGO1FBRUQsSUFBSSxNQUFNLENBQUMsTUFBTSxZQUFZLFVBQVUsRUFBRTtZQUN2QyxJQUFJLE1BQU0sQ0FBQyxRQUFRLEtBQUssb0JBQW9CLENBQUMsSUFBSSxFQUFFO2dCQUNqRCxNQUFNLElBQUfgS0FBSyxDQUFDLG1DQUFtQyxDQUFDLENBQUM7YUFDdEQ7WUFDRCxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsV0FBVyxFQUFFO2dCQUNoRCxNQUFNLElBQUfgS0FBSyxDQUFDLDJDQUEyQyxDQUFDLENBQUM7YUFDOUQ7O1lBRUQsTUFBTSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxHQUFHLElBQUfgQ0FBQztTQUN2QztRQUVELElBQUfgTUFBTSxDQUFDLE1BQU0sWUFBWSxjQUFjLEVBQUU7WUFDM0MsSUFBSSxNQUFNLENBQUMsUUFBUSxLQUFLLG9CQUFvQixDQUFDLE1BQU0sRUFBRTtnQkFDbkQsTUFBTSxJQUFJLEtBQUssQ0FBQyx5Q0FBeUMsQ0FBQyxDQUFDO2FBQzVEO1NBQ0Y7UUFDRCxPQUFPLE1BQU0sQ0FBQzs7Ozs7OztJQU9SLGFBQWE7O1FBQ25CLE1BQU0sTUFBTSxHQUF1QixJQUFJLENBQUMsa0JBQWtCLENBQUM7O1FBRzNELElBQUfgQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO1FBRXBCLElBQUfgTUFBTSxDQUFDLE1BQU0sWUFBWSxVQUFVLEVBQUU7O1lBQ3ZDLE1BQU0sTUFBTSxHQUFlLE1BQU0sQ0FBQyxNQUFNLENBQUM7O1lBQ3pDLE1BQU0sR0FBRyxHQUFZLElBQUfgQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBVSxFQUFFLENBQVMsRUFBRSxFQUFFLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUMsTUFBTSxJQUFJLE1BQU0sQ0FBQyxXQUFXLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdEfgSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBRXZCLElBQUfgQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFFL0IsUUFBUSxNQUFNLENBQUMsUUFBUSxFQUFFO2dCQUN2QixLQUFLLG9CQUFvQixDQUFDLEdBQUc7b0JBQzNCLElBQUfgQ0FBQyxjQUFjLEdBQUcsS0FBSyxDQUFDO29CQUM1QixNQUFNO2dCQUNSLEtBQUssb0JBQW9CLENBQUMsTUFBTTtvQkFDOUIsSUFBSSxDQUFDLGNBQWMsR0FBRyxRQUFRLENBQUM7b0JBQy9CLElBQUfgQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUM7b0JBQ3pDLE1BQU07YUFDVDtZQUNELElBQUfgQ0FBQyxZQUFZLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQztTQUNwQztRQUVELElBQUfgTUFBTSxDQUFDLE1BQU0sWUFBWSxVQUFVLEVBQUU7O1lBQ3ZDLE1BQU0sTUFBTSxHQUFlLE1BQU0sQ0FBQyxNQUFNLENBQUM7O1lBQ3pDLE1BQU0sS0FBSyxHQUFXLElBQUfgQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQzs7WUFDaEYsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDOztZQUNkLElBQUfgR0FBRyxHQUFXLE1BQU0sQ0FBQyxXQUFXLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztZQUVoRCxLQUFLLElBQUfgQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxFQUFFLENBQUMsRUFBRSxFQUFFOztnQkFDOUIsTUFBTSxHQUFHLEdBQVfgSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFVLEVBQUUsQ0FBUyxFQUFFLEVBQUUsQ0FBQyxDQUFDLElBQUfgS0FBSyxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQztnQkFDM0YsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ3pCLEtBQUssR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDO2dCQUNoQixHQUFHLEdBQUcsS0FBSyxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQzthQUM3QztZQUVELElBQUfgQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7O1lBRS9CLE1BQU0sTUFBTSxHQUFXLENBQUMsTUFBTSxDQUFDLElBQUfgQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUfgRUFBRSxFQUFFLENBQUMsQ0FBQztZQUU1RCxJQUFJLENBQUMsVUFBVSxHQUFHLE1BQU0sR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFDLE1BQU0sR0FBRyxNQUFNLEdBQUcsQ0FBQyxHQUFHLElBQUfgQ0FBQztZQUN6RSxJQUFJLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDO1lBRXpDLElBQUfgQ0FBQyxjQUFjLEdBQUcsS0FBSyxDQUFDO1NBQzdCO1FBRUQsSUFBSSxNQUFNLENBQUMsTUFBTSxZQUFZLGNBQWMsRUFBRTtZQUMzQyxJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ2hDOzs7O1lBbFJKLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsa0JBQWtCO2dCQUU1QixxZ0VBQWlDO2dCQUNqQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7YUFDaEQ7OztxQkFLRSxLQUFLOzBCQUlMLEtBQUs7aUNBSUwsS0FBSztrQ0FLTCxLQUFLO21CQUtMLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuIFRoZSBNSVQgTGljZW5zZSAoTUlUKVxuXG4gQ29weXJpZ2h0IChjfgAyMDE3LTIwMTggU3RlZmFubyBDYXBwYSAoS3M4OSlcblxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbiBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuXG4gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsXG4gY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cblxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OIElORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEVcbiBTT0ZUV0FSRS5cbiAqL1xuXG5pbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkNoYW5nZXMsIE9uSW5pdCwgT3V0cHV0LCBTaW1wbGVDaGFuZ2UsIFNpbXBsZUNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgQWNjZXNzaWJpbGl0eUNvbmZpZyB9IGZyb20gJy4uLy4uL21vZGVsL2FjY2Vzc2liaWxpdHkuaW50ZXJmYWNlJztcbmltcG9ydCB7IEltYWdlIH0gZnJvbSAnLi4vLi4vbW9kZWwvaW1hZ2UuY2xhc3MnO1xuaW1wb3J0IHsgU2l6ZSB9IGZyb20gJy4uLy4uL21vZGVsL3NpemUuaW50ZXJmYWNlJztcbmltcG9ydCB7IEFkdmFuY2VkTGF5b3V0LCBHcmlkTGF5b3V0LCBMaW5lTGF5b3V0LCBQbGFpbkdhbGxlcnlDb25maWcsIFBsYWluR2FsbGVyeVN0cmF0ZWd5IH0gZnJvbSAnLi4vLi4vbW9kZWwvcGxhaW4tZ2FsbGVyeS1jb25maWcuaW50ZXJmYWNlJztcblxuaW1wb3J0IHsgZ2V0SW5kZXggfSBmcm9tICcuLi8uLi91dGlscy9pbWFnZS51dGlsJztcblxuLyoqXG4gKiBDb21wb25lbnQgd2l0aCB0aGUgZ2FsbGVyeSBvZiB0aHVtYnMuXG4gKiBJbiByZWNlaXZlcyBhbiBhcnJheSBvZiBJbWFnZXMsIGEgYm9vbGVhbiB0byBzaG93L2hpZGVcbiAqIHRoZSBnYWxsZXJ5IChmZWF0dXJlIHVzZWQgYnkgaW1hZ2VQb2ludGVyfgBhbmQgYSBjb25maWdcbiAqIG9iamVjdCB0byBjdXN0b21pemUgdGhlIGJlaGF2aW91ciBvZiB0aGlzIGNvbXBvbmVudC5cbiAqIEFsc28sIGl0IGVtaXRzIGNsaWNrIGV2ZW50cyBhcyBvdXRwdXRzLlxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdrcy1wbGFpbi1nYWxsZXJ5JyxcbiAgc3R5bGVVcmxzOiBbJ3BsYWluLWdhbGxlcnkuc2NzcyddLFxuICB0ZW1wbGF0ZVVybDogJ3BsYWluLWdhbGxlcnkuaHRtbCcsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIFBsYWluR2FsbGVyeUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzIHtcbiAgLyoqXG4gICAqIEFycmF5IG9mIGBJbWFnZWAgdGhhdCByZXByZXNlbnQgdGhlIG1vZGVsIG9mIHRoaXMgbGlicmFyeSB3aXRoIGFsbCBpbWFnZXMsIHRodW1icyBhbmQgc28gb24uXG4gICAqL1xuICBASW5wdXQofgBpbWFnZXM6IEltYWdlW107XG4gIC8qKlxuICAgKiBCb29sZWFuIHRvIHNob3cvaGlkZSBwbGFpbiBnYWxsZXJ5LiBJZiB0cnVlIHRoZSBwbGFpbiBnYWxsZXJ5IHdpbGwgYmUgdmlzaWJsZSwgZmFsc2Ugb3RoZXJ3aXNlLlxuICAgKi9cbiAgQElucHV0KCkgc2hvd0dhbGxlcnk6IGJvb2xlYW47XG4gIC8qKlxuICAgKiBPYmplY3Qgb2YgdHlwZSBgUGxhaW5HYWxsZXJ5Q29uZmlnYCB0byBjb25maWd1cmUgdGhlIHBsYWluIGdhbGxlcnkuXG4gICAqL1xuICBASW5wdXQofgBwbGFpbkdhbGxlcnlDb25maWc6IFBsYWluR2FsbGVyeUNvbmZpZztcbiAgLyoqXG4gICAqIE9iamVjdCBvZiB0eXBlIGBBY2Nlc3NpYmlsaXR5Q29uZmlnYCB0byBpbml0IGN1c3RvbSBhY2Nlc3NpYmlsaXR5IGZlYXR1cmVzLlxuICAgKiBGb3IgaW5zdGFuY2UsIGl0IGNvbnRhaW5zIHRpdGxlcywgYWx0IHRleHRzLCBhcmlhLWxhYmVscyBhbmQgc28gb24uXG4gICAqL1xuICBASW5wdXQofgBhY2Nlc3NpYmlsaXR5Q29uZmlnOiBBY2Nlc3NpYmlsaXR5Q29uZmlnO1xuXG4gIC8qKlxuICAgKiBPdXRwdXQgdG8gZW1pdCBhbiBldmVudCB3aGVuIGFuIGltYWdlIGlzIGNoYW5nZWQuXG4gICAqL1xuICBAT3V0cHV0KCkgc2hvdzogRXZlbnRFbWl0dGVyPG51bWJlcj4gPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4oKTtcblxuICAvKipcbiAgICogT2JqZWN0IG9mIHR5cGUgYFBsYWluR2FsbGVyeUNvbmZpZ2AgdG8gY29uZmlndXJlIHRoaXMgY29tcG9uZW50LlxuICAgKi9cbiAgY29uZmlnUGxhaW5HYWxsZXJ5OiBQbGFpbkdhbGxlcnlDb25maWc7XG5cbiAgLyoqXG4gICAqIEJpLWRpbWVuc2lvbmFsIGFycmF5IG9mIGBJbWFnZWAgb2JqZWN0IHRvIHN0b3JlIGltYWdlcyB0byBkaXNwbGF5IGFzIHBsYWluIGdhbGxlcnkuXG4gICAqIFtdIGJ5IGRlZmF1bHQuXG4gICAqL1xuICBpbWFnZUdyaWQ6IEltYWdlW11bXSA9IFtdO1xuICAvKipcbiAgICogU2l6ZSBvYmplY3QgdXNlZCBpbiB0aGUgdGVtcGxhdGUgdG8gcmVzaXplIGltYWdlcy5cbiAgICovXG4gIHNpemU6IFNpemU7XG4gIC8qKlxuICAgKiBCb29sZWFuIHBhc3NlZCBhcyBpbnB1dCB0byBga3Mtd3JhcGAgZGlyZWN0aXZlIHRvIGNvbmZpZ3VyZSBmbGV4LXdyYXAgY3NzIHByb3BlcnR5LlxuICAgKiBIb3dldmVyIGl0J3Mgbm90IGVub3VnaCwgYmVjYXVzZSB5b3UgbmVlZCB0byBsaW1pdCB0aGUgd2lkdGggdXNpbmcgYHdpZHRoU3R5bGVgIHB1YmxpYyB2YXJpYWJsZS5cbiAgICogRm9yIG1vcmUgaW5mbyBjaGVjayBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9pdC9kb2NzL1dlYi9DU1MvZmxleC13cmFwXG4gICAqL1xuICB3cmFwU3R5bGUgPSBmYWxzZTtcbiAgLyoqXG4gICAqIFN0cmluZyBwYXNzZWQgYXMgaW5wdXQgdG8gYGtzLXdyYXBgIGRpcmVjdGl2ZSB0byBzZXQgd2lkdGggdG8gYmUgYWJsZSB0byBmb3JjZSBvdmVyZmxvdy5cbiAgICogSW4gdGhpcyB3YXfgIGB3cmFwU3R5bGVgIChmbGV4LXdyYXAgY3NzIHByb3BlcnR5fgB3aWxsIGJlIHVzZWQgYXMgcmVxdWVzdGVkLlxuICAgKi9cbiAgd2lkdGhTdHlsZSA9ICcnO1xuICAvKipcbiAgICogU3RyaW5nIHBhc3NlZCBhcyBpbnB1dCB0byBga3MtZGlyZWN0aW9uYCBkaXJlY3RpdmUgdG8gc2V0IHRoZSBmbGV4LWRpcmVjdGlvbiBjc3MgcHJvcGVydHkuXG4gICAqIEZvciBtb3JlIGluZm8gY2hlY2sgaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvaXQvZG9jcy9XZWIvQ1NTL2ZsZXgtZGlyZWN0aW9uXG4gICAqL1xuICBkaXJlY3Rpb25TdHlsZTogc3RyaW5nO1xuICAvKipcbiAgICogU3RyaW5nIHBhc3NlZCBhcyBpbnB1dCB0byBga3MtZGlyZWN0aW9uYCBkaXJlY3RpdmUgdG8gc2V0IHRoZSBqdXN0aWZ5LWNvbnRlbnQgY3NzIHByb3BlcnR5LlxuICAgKiBGb3IgbW9yZSBpbmZvIGNoZWNrIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2l0L2RvY3MvV2ViL0NTUy9qdXN0aWZ5LWNvbnRlbnRcbiAgICovXG4gIGp1c3RpZnlTdHlsZTogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBEZWZhdWx0IGltYWdlIHNpemUgb2JqZWN0XG4gICAqL1xuICBwcml2YXRlIGRlZmF1bHRTaXplOiBTaXplID0geyB3aWR0aDogJzUwcHgnLCBoZWlnaHQ6ICdhdXRvJyB9O1xuICAvKipcbiAgICogRGVmYXVsdCBsYXlvdXQgY29uZmlnIG9iamVjdFxuICAgKiBOb3RlIHRoYXQgbGVuZ3RoPS0xIG1lYW5zIGluZmluaXR5XG4gICAqL1xuICBwcml2YXRlIGRlZmF1bHRMYXlvdXQ6IExpbmVMYXlvdXQgPSBuZXcgTGluZUxheW91dCh0aGlzLmRlZmF1bHRTaXplLCB7IGxlbmd0aDogLTEsIHdyYXA6IGZhbHNlIH0sICdmbGV4LXN0YXJ0Jyk7XG4gIC8qKlxuICAgKiBEZWZhdWx0IHBsYWluIGdhbGxlcnkgY29uZmlnIG9iamVjdFxuICAgKi9cbiAgcHJpdmF0ZSBkZWZhdWx0UGxhaW5Db25maWc6IFBsYWluR2FsbGVyeUNvbmZpZyA9IHtcbiAgICBzdHJhdGVneTogUGxhaW5HYWxsZXJ5U3RyYXRlZ3kuUk9XLFxuICAgIGxheW91dDogdGhpcy5kZWZhdWx0TGF5b3V0LFxuICAgIGFkdmFuY2VkOiB7IGFUYWdzOiBmYWxzZSwgYWRkaXRpb25hbEJhY2tncm91bmQ6ICc1MCUgNTAlL2NvdmVyJyB9XG4gIH07XG5cbiAgLyoqXG4gICAqIE1ldGhvZCDCtG5nT25Jbml0wrQgdG8gaW5pdCBib3RoIGBjb25maWdQbGFpbkdhbGxlcnlgIGNhbGxpbmcgYGluaXRQbGFpbkdhbGxlcnlDb25maWcoKWBcbiAgICogYW5kIGBpbWFnZUdyaWQgaW52b2tpbmcgYGluaXRJbWFnZUdyaWQoKWAuXG4gICAqIFRoaXMgaXMgYW4gQW5ndWxhcidzIGxpZmVjeWNsZSBob29rLCBzbyBpdHMgY2FsbGVkIGF1dG9tYXRpY2FsbHkgYnkgQW5ndWxhciBpdHNlbGYuXG4gICAqIEluIHBhcnRpY3VsYXIsIGl0J3MgY2FsbGVkIG9ubHkgb25lIHRpbWUhISFcbiAgICovXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuY29uZmlnUGxhaW5HYWxsZXJ5ID0gdGhpcy5pbml0UGxhaW5HYWxsZXJ5Q29uZmlnKCk7XG4gICAgdGhpcy5pbml0SW1hZ2VHcmlkKCk7XG4gIH1cblxuICAvKipcbiAgICogTWV0aG9kIMK0bmdPbkNoYW5nZXPCtCB0byB1cGRhdGUgYm90aCBgaW1hZ2VHcmlkYCBhbmRgY29uZmlnUGxhaW5HYWxsZXJ5YC5cbiAgICogVGhpcyBpcyBhbiBBbmd1bGFyJ3MgbGlmZWN5Y2xlIGhvb2ssIHNvIGl0cyBjYWxsZWQgYXV0b21hdGljYWxseSBieSBBbmd1bGFyIGl0c2VsZi5cbiAgICogSW4gcGFydGljdWxhciwgaXQncyBjYWxsZWQgd2hlbiBhbnkgZGF0YS1ib3VuZCBwcm9wZXJ0eSBvZiBhIGRpcmVjdGl2ZSBjaGFuZ2VzISEhXG4gICAqL1xuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzfgB7XG4gICAgY29uc3QgaW1hZ2VzQ2hhbmdlOiBTaW1wbGVDaGFuZ2UgPSBjaGFuZ2VzLmltYWdlcztcbiAgICBjb25zdCBjb25maWdDaGFuZ2U6IFNpbXBsZUNoYW5nZSA9IGNoYW5nZXMucGxhaW5HYWxsZXJ5Q29uZmlnO1xuXG4gICAgLy8gSSdtIHVzaW5nICFjaGFuZ2UuZmlyc3RDaGFuZ2UgYmVjYXVzZSB0aGUgZmlyc3QgdGltZSB3aWxsIGJlIGNhbGxlZCBib3RoIG9uSW5pdCBhbmQgb25DaGFuZ2UgYW5kIEkgZG9uJ3RcbiAgICAvLyB3YW50IHRvIGV4ZWN1dGUgaW5pdGlhbGl6YXRpb24gdHdvIHRpbWVzLlxuICAgIGlmIChcbiAgICAgIGNvbmZpZ0NoYW5nZSAmJlxuICAgICAgIWNvbmZpZ0NoYW5nZS5maXJzdENoYW5nZSAmJlxuICAgICAgKGNvbmZpZ0NoYW5nZS5wcmV2aW91c1ZhbHVlICE9PSBjb25maWdDaGFuZ2UuY3VycmVudFZhbHVlIHx8ICghY29uZmlnQ2hhbmdlLnByZXZpb3VzVmFsdWUgJiYgIWNvbmZpZ0NoYW5nZS5jdXJyZW50VmFsdWUpKVxuICAgICkge1xuICAgICAgdGhpcy5jb25maWdQbGFpbkdhbGxlcnkgPSB0aGlzLmluaXRQbGFpbkdhbGxlcnlDb25maWcoKTtcbiAgICB9XG4gICAgaWYgKGltYWdlc0NoYW5nZSAmJiAhaW1hZ2VzQ2hhbmdlLmZpcnN0Q2hhbmdlICYmIGltYWdlc0NoYW5nZS5wcmV2aW91c1ZhbHVlICE9PSBpbWFnZXNDaGFuZ2UuY3VycmVudFZhbHVlfgB7XG4gICAgICB0aGlzLmluaXRJbWFnZUdyaWQoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogTWV0aG9kIGNhbGxlZCB3aGVuIHlvdSBjbGljayBvbiBhbiBpbWFnZSBvZiB0aGUgcGxhaW4gKG9yIGlubGluZSkgZ2FsbGVyeS5cbiAgICogVGhpcyB3aWxsIGVtaXQgdGhlIHNob3cgZXZlbnQgd2l0aCB0aGUgaW5kZXggbnVtYmVyIGFzIHBheWxvYWQuXG4gICAqIEBwYXJhbSBudW1iZXIgaW5kZXggb2YgdGhlIGNsaWNrZWQgaW1hZ2VcbiAgICovXG4gIHNob3dNb2RhbEdhbGxlcnkoaW5kZXg6IG51bWJlcikge1xuICAgIHRoaXMuc2hvdy5lbWl0KGluZGV4KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBNZXRob2QgY2FsbGVkIHdoZW4geW91IGNsaWNrIG9uIGFuIGltYWdlIG9mIHRoZSBwbGFpbiAob3IgaW5saW5lfgBnYWxsZXJ5LlxuICAgKiBUaGlzIHdpbGwgZW1pdCB0aGUgc2hvdyBldmVudCB3aXRoIHRoZSBpbWFnZSBhcyBwYXlsb2FkLlxuICAgKiBAcGFyYW0gSW1hZ2UgaW1nIGlzIHRoZSBJbWFnZSB0byBzaG93XG4gICAqL1xuICBzaG93TW9kYWxHYWxsZXJ5QnlJbWFnZShpbWc6IEltYWdlfgB7XG4gICAgY29uc3QgaW5kZXg6IG51bWJlciA9IHRoaXMuaW1hZ2VzLmZpbmRJbmRleCgodmFsOiBJbWFnZSkgPT4gdmFsICYmIGltZyAmJiB2YWwuaWQgPT09IGltZy5pZCk7XG4gICAgdGhpcy5zaG93TW9kYWxHYWxsZXJ5KGluZGV4KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBNZXRob2QgdG8gZ2V0IGBhbHQgYXR0cmlidXRlYC5cbiAgICogYGFsdGAgc3BlY2lmaWVzIGFuIGFsdGVybmF0ZSB0ZXh0IGZvciBhbiBpbWFnZSwgaWYgdGhlIGltYWdlIGNhbm5vdCBiZSBkaXNwbGF5ZWQuXG4gICAqIEBwYXJhbSBJbWFnZSBpbWFnZSB0byBnZXQgaXRzIGFsdCBkZXNjcmlwdGlvbi5cbiAgICogQHJldHVybnMgc3RyaW5nIGFsdCBkZXNjcmlwdGlvbiBvZiB0aGUgaW1hZ2VcbiAgICovXG4gIGdldEFsdFBsYWluRGVzY3JpcHRpb25CeUltYWdlKGltYWdlOiBJbWFnZSk6IHN0cmluZyB7XG4gICAgaWYgKCFpbWFnZSkge1xuICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgICByZXR1cm4gaW1hZ2UucGxhaW4gJiYgaW1hZ2UucGxhaW4uZGVzY3JpcHRpb24gPyBpbWFnZS5wbGFpbi5kZXNjcmlwdGlvbiA6IGBJbWFnZSAke2dldEluZGV4KGltYWdlLCB0aGlzLmltYWdlcykgKyAxfWA7XG4gIH1cblxuICAvKipcbiAgICogTWV0aG9kIHRvIGdldCB0aGUgdGl0bGUgZm9yIGFuIGltYWdlLlxuICAgKiBAcGFyYW0gSW1hZ2UgaW1hZ2UgdG8gZ2V0IGl0cyB0aXRsZVxuICAgKiBAcmV0dXJucyBzdHJpbmcgdGhlIHRpdGxlIG9mIHRoZSBpbnB1dCBpbWFnZVxuICAgKi9cbiAgZ2V0VGl0bGVEaXNwbGF5KGltYWdlOiBJbWFnZSk6IHN0cmluZyB7XG4gICAgbGV0IGRlc2NyaXB0aW9uID0gJyc7XG5cbiAgICBpZiAoaW1hZ2UucGxhaW4gJiYgaW1hZ2UucGxhaW4uZGVzY3JpcHRpb24pIHtcbiAgICAgIGRlc2NyaXB0aW9uID0gaW1hZ2UucGxhaW4uZGVzY3JpcHRpb247XG4gICAgfSBlbHNlIGlmIChpbWFnZS5tb2RhbCAmJiBpbWFnZS5tb2RhbC5kZXNjcmlwdGlvbikge1xuICAgICAgZGVzY3JpcHRpb24gPSBpbWFnZS5tb2RhbC5kZXNjcmlwdGlvbjtcbiAgICB9XG5cbiAgICBjb25zdCBjdXJyZW50SW5kZXg6IG51bWJlciA9IGdldEluZGV4KGltYWdlLCB0aGlzLmltYWdlcyk7XG4gICAgY29uc3QgcHJldkRlc2NyaXB0aW9uOiBzdHJpbmcgPSAnSW1hZ2UgJyArIChjdXJyZW50SW5kZXggKyAxfgArICcvJyArIHRoaXMuaW1hZ2VzLmxlbmd0aDtcbiAgICBsZXQgY3VyckltZ0Rlc2NyaXB0aW9uOiBzdHJpbmcgPSBkZXNjcmlwdGlvbiA/IGRlc2NyaXB0aW9uIDogJyc7XG5cbiAgICBpZiAoY3VyckltZ0Rlc2NyaXB0aW9uICE9PSAnJykge1xuICAgICAgY3VyckltZ0Rlc2NyaXB0aW9uID0gJyAtICcgKyBjdXJySW1nRGVzY3JpcHRpb247XG4gICAgfVxuICAgIHJldHVybiBwcmV2RGVzY3JpcHRpb24gKyBjdXJySW1nRGVzY3JpcHRpb247XG4gIH1cblxuICAvKipcbiAgICogTWV0aG9kIHVzZWQgaW4gdGhlIHRlbXBsYXRlIHRvIHRyYWNrIGlkcyBpbiBuZ0Zvci5cbiAgICogQHBhcmFtIG51bWJlciBpbmRleCBvZiB0aGUgYXJyYXlcbiAgICogQHBhcmFtIEltYWdlIGl0ZW0gb2YgdGhlIGFycmF5XG4gICAqIEByZXR1cm5zIG51bWJlciB0aGUgaWQgb2YgdGhlIGl0ZW1cbiAgICovXG4gIHRyYWNrQnlJZChpbmRleDogbnVtYmVyLCBpdGVtOiBJbWFnZSk6IG51bWJlciB7XG4gICAgcmV0dXJuIGl0ZW0uaWQ7XG4gIH1cblxuICAvKipcbiAgICogUHJpdmF0ZSBtZXRob2QgdG8gYnVpbGQgYW5kIHJldHVybiBhIGBQbGFpbkdhbGxlcnlDb25maWdgIG9iamVjdCwgcHJvdmluZyBhbHNvIGRlZmF1bHQgdmFsdWVzLlxuICAgKiBAcmV0dXJucyBQbGFpbkdhbGxlcnlDb25maWcgdGhlIHBsYWluIGdhbGxlcnkgY29uZmlndXJhdGlvblxuICAgKiBAdGhyb3dzIGFuIEVycm9yIGlmIGxheW91dCBhbmQgc3RyYXRlZ3kgYXJlbid0IGNvbXBhdGlibGVcbiAgICovXG4gIHByaXZhdGUgaW5pdFBsYWluR2FsbGVyeUNvbmZpZygpOiBQbGFpbkdhbGxlcnlDb25maWcge1xuICAgIGNvbnN0IGNvbmZpZzogUGxhaW5HYWxsZXJ5Q29uZmlnID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5kZWZhdWx0UGxhaW5Db25maWcsIHRoaXMucGxhaW5HYWxsZXJ5Q29uZmlnKTtcblxuICAgIGlmIChjb25maWcubGF5b3V0IGluc3RhbmNlb2YgTGluZUxheW91dCkge1xuICAgICAgaWYgKGNvbmZpZy5zdHJhdGVneSAhPT0gUGxhaW5HYWxsZXJ5U3RyYXRlZ3kuUk9XICYmIGNvbmZpZy5zdHJhdGVneSAhPT0gUGxhaW5HYWxsZXJ5U3RyYXRlZ3kuQ09MVU1OfgB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignTGluZUxheW91dCByZXF1aXJlcyBlaXRoZXIgUk9XIG9yIENPTFVNTiBzdHJhdGVneScpO1xuICAgICAgfVxuICAgICAgaWYgKCFjb25maWcubGF5b3V0IHx8ICFjb25maWcubGF5b3V0LmJyZWFrQ29uZmlnfgB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignQm90aCBsYXlvdXQgYW5kIGJyZWFrQ29uZmlnIG11c3QgYmUgdmFsaWQnKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoY29uZmlnLmxheW91dCBpbnN0YW5jZW9mIEdyaWRMYXlvdXQpIHtcbiAgICAgIGlmIChjb25maWcuc3RyYXRlZ3kgIT09IFBsYWluR2FsbGVyeVN0cmF0ZWd5LkdSSUQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdHcmlkTGF5b3V0IHJlcXVpcmVzIEdSSUQgc3RyYXRlZ3knKTtcbiAgICAgIH1cbiAgICAgIGlmICghY29uZmlnLmxheW91dCB8fCAhY29uZmlnLmxheW91dC5icmVha0NvbmZpZykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0JvdGggbGF5b3V0IGFuZCBicmVha0NvbmZpZyBtdXN0IGJlIHZhbGlkJyk7XG4gICAgICB9XG4gICAgICAvLyBmb3JjZSB3cmFwIGZvciBncmlkIGxheW91dFxuICAgICAgY29uZmlnLmxheW91dC5icmVha0NvbmZpZy53cmFwID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAoY29uZmlnLmxheW91dCBpbnN0YW5jZW9mIEFkdmFuY2VkTGF5b3V0fgB7XG4gICAgICBpZiAoY29uZmlnLnN0cmF0ZWd5ICE9PSBQbGFpbkdhbGxlcnlTdHJhdGVneS5DVVNUT00pIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdBZHZhbmNlZExheW91dCByZXF1aXJlcyBDVVNUT00gc3RyYXRlZ3knKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGNvbmZpZztcbiAgfVxuXG4gIC8qKlxuICAgKiBQcml2YXRlIG1ldGhvZCB0byBpbml0IGJvdGggYGltYWdlR3JpZGAgYW5kIG90aGVyIHN0eWxlIHZhcmlhYmxlcyxcbiAgICogYmFzZWQgb24gdGhlIGxheW91dCB0eXBlLlxuICAgKi9cbiAgcHJpdmF0ZSBpbml0SW1hZ2VHcmlkKCkge1xuICAgIGNvbnN0IGNvbmZpZzogUGxhaW5HYWxsZXJ5Q29uZmlnID0gdGhpcy5jb25maWdQbGFpbkdhbGxlcnk7XG5cbiAgICAvLyByZXNldCB0aGUgYXJyYXkgdG8gcHJldmVudCBpc3N1ZXMgaW4gY2FzZSBvZiBHcmlkTGF5b3V0XG4gICAgdGhpcy5pbWFnZUdyaWQgPSBbXTtcblxuICAgIGlmIChjb25maWcubGF5b3V0IGluc3RhbmNlb2YgTGluZUxheW91dCkge1xuICAgICAgY29uc3QgbGF5b3V0OiBMaW5lTGF5b3V0ID0gY29uZmlnLmxheW91dDtcbiAgICAgIGNvbnN0IHJvdzogSW1hZ2VbXSA9IHRoaXMuaW1hZ2VzLmZpbHRlcigodmFsOiBJbWFnZSwgaTogbnVtYmVyfgA9PiBpIDwgbGF5b3V0LmJyZWFrQ29uZmlnLmxlbmd0aCB8fCBsYXlvdXQuYnJlYWtDb25maWcubGVuZ3RoID09PSAtMSk7XG4gICAgICB0aGlzLmltYWdlR3JpZCA9IFtyb3ddO1xuXG4gICAgICB0aGlzLnNpemUgPSBjb25maWcubGF5b3V0LnNpemU7XG5cbiAgICAgIHN3aXRjaCAoY29uZmlnLnN0cmF0ZWd5fgB7XG4gICAgICAgIGNhc2UgUGxhaW5HYWxsZXJ5U3RyYXRlZ3kuUk9XOlxuICAgICAgICAgIHRoaXMuZGlyZWN0aW9uU3R5bGUgPSAncm93JztcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBQbGFpbkdhbGxlcnlTdHJhdGVneS5DT0xVTU46XG4gICAgICAgICAgdGhpcy5kaXJlY3Rpb25TdHlsZSA9ICdjb2x1bW4nO1xuICAgICAgICAgIHRoaXMud3JhcFN0eWxlID0gbGF5b3V0LmJyZWFrQ29uZmlnLndyYXA7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICB0aGlzLmp1c3RpZnlTdHlsZSA9IGxheW91dC5qdXN0aWZ5O1xuICAgIH1cblxuICAgIGlmIChjb25maWcubGF5b3V0IGluc3RhbmNlb2YgR3JpZExheW91dCkge1xuICAgICAgY29uc3QgbGF5b3V0OiBHcmlkTGF5b3V0ID0gY29uZmlnLmxheW91dDtcbiAgICAgIGNvbnN0IGNvdW50OiBudW1iZXIgPSBNYXRoLmNlaWwodGhpcy5pbWFnZXMubGVuZ3RoIC8gbGF5b3V0LmJyZWFrQ29uZmlnLmxlbmd0aCk7XG4gICAgICBsZXQgc3RhcnQgPSAwO1xuICAgICAgbGV0IGVuZDogbnVtYmVyID0gbGF5b3V0LmJyZWFrQ29uZmlnLmxlbmd0aCAtIDE7XG5cbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgY291bnQ7IGorKykge1xuICAgICAgICBjb25zdCByb3c6IEltYWdlW10gPSB0aGlzLmltYWdlcy5maWx0ZXIoKHZhbDogSW1hZ2UsIGk6IG51bWJlcikgPT4gaSA+PSBzdGFydCAmJiBpIDw9IGVuZCk7XG4gICAgICAgIHRoaXMuaW1hZ2VHcmlkLnB1c2gocm93KTtcbiAgICAgICAgc3RhcnQgPSBlbmQgKyAxO1xuICAgICAgICBlbmQgPSBzdGFydCArIGxheW91dC5icmVha0NvbmZpZy5sZW5ndGggLSAxO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnNpemUgPSBjb25maWcubGF5b3V0LnNpemU7XG5cbiAgICAgIGNvbnN0IHBpeGVsczogbnVtYmVyID0gK2xheW91dC5zaXplLndpZHRoLnJlcGxhY2UoJ3B4JywgJycpO1xuXG4gICAgICB0aGlzLndpZHRoU3R5bGUgPSBwaXhlbHMgKiBsYXlvdXQuYnJlYWtDb25maWcubGVuZ3RoICsgcGl4ZWxzIC8gMiArICdweCc7XG4gICAgICB0aGlzLndyYXBTdHlsZSA9IGxheW91dC5icmVha0NvbmZpZy53cmFwO1xuXG4gICAgICB0aGlzLmRpcmVjdGlvblN0eWxlID0gJ3Jvdyc7XG4gICAgfVxuXG4gICAgaWYgKGNvbmZpZy5sYXlvdXQgaW5zdGFuY2VvZiBBZHZhbmNlZExheW91dCkge1xuICAgICAgdGhpcy5pbWFnZUdyaWQgPSBbdGhpcy5pbWFnZXNdO1xuICAgIH1cbiAgfVxufVxuIl19