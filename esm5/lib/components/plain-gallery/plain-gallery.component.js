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
var PlainGalleryComponent = /** @class */ (function () {
    function PlainGalleryComponent() {
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
     */
    /**
     * Method ´ngOnInit´ to init both `configPlainGallery` calling `initPlainGalleryConfig()`
     * and `imageGrid invoking `initImageGrid()`.
     * This is an Angular's lifecycle hook, so its called automatically by Angular itself.
     * In particular, it's called only one time!!!
     * @return {?}
     */
    PlainGalleryComponent.prototype.ngOnInit = /**
     * Method ´ngOnInit´ to init both `configPlainGallery` calling `initPlainGalleryConfig()`
     * and `imageGrid invoking `initImageGrid()`.
     * This is an Angular's lifecycle hook, so its called automatically by Angular itself.
     * In particular, it's called only one time!!!
     * @return {?}
     */
    function () {
        this.configPlainGallery = this.initPlainGalleryConfig();
        this.initImageGrid();
    };
    /**
     * Method ´ngOnChanges´ to update both `imageGrid` and`configPlainGallery`.
     * This is an Angular's lifecycle hook, so its called automatically by Angular itself.
     * In particular, it's called when any data-bound property of a directive changes!!!
     */
    /**
     * Method ´ngOnChanges´ to update both `imageGrid` and`configPlainGallery`.
     * This is an Angular's lifecycle hook, so its called automatically by Angular itself.
     * In particular, it's called when any data-bound property of a directive changes!!!
     * @param {?} changes
     * @return {?}
     */
    PlainGalleryComponent.prototype.ngOnChanges = /**
     * Method ´ngOnChanges´ to update both `imageGrid` and`configPlainGallery`.
     * This is an Angular's lifecycle hook, so its called automatically by Angular itself.
     * In particular, it's called when any data-bound property of a directive changes!!!
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        /** @type {?} */
        var imagesChange = changes["images"];
        /** @type {?} */
        var configChange = changes["plainGalleryConfig"];
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
    };
    /**
     * Method called when you click on an image of the plain (or inline) gallery.
     * This will emit the show event with the index number as payload.
     * @param number index of the clicked image
     */
    /**
     * Method called when you click on an image of the plain (or inline) gallery.
     * This will emit the show event with the index number as payload.
     * @param {?} index
     * @return {?}
     */
    PlainGalleryComponent.prototype.showModalGallery = /**
     * Method called when you click on an image of the plain (or inline) gallery.
     * This will emit the show event with the index number as payload.
     * @param {?} index
     * @return {?}
     */
    function (index) {
        this.show.emit(index);
    };
    /**
     * Method called when you click on an image of the plain (or inline) gallery.
     * This will emit the show event with the image as payload.
     * @param Image img is the Image to show
     */
    /**
     * Method called when you click on an image of the plain (or inline) gallery.
     * This will emit the show event with the image as payload.
     * @param {?} img
     * @return {?}
     */
    PlainGalleryComponent.prototype.showModalGalleryByImage = /**
     * Method called when you click on an image of the plain (or inline) gallery.
     * This will emit the show event with the image as payload.
     * @param {?} img
     * @return {?}
     */
    function (img) {
        /** @type {?} */
        var index = this.images.findIndex(function (val) { return val && img && val.id === img.id; });
        this.showModalGallery(index);
    };
    /**
     * Method to get `alt attribute`.
     * `alt` specifies an alternate text for an image, if the image cannot be displayed.
     * @param Image image to get its alt description.
     * @returns string alt description of the image
     */
    /**
     * Method to get `alt attribute`.
     * `alt` specifies an alternate text for an image, if the image cannot be displayed.
     * @param {?} image
     * @return {?} string alt description of the image
     */
    PlainGalleryComponent.prototype.getAltPlainDescriptionByImage = /**
     * Method to get `alt attribute`.
     * `alt` specifies an alternate text for an image, if the image cannot be displayed.
     * @param {?} image
     * @return {?} string alt description of the image
     */
    function (image) {
        if (!image) {
            return '';
        }
        return image.plain && image.plain.description ? image.plain.description : "Image " + (getIndex(image, this.images) + 1);
    };
    /**
     * Method to get the title for an image.
     * @param Image image to get its title
     * @returns string the title of the input image
     */
    /**
     * Method to get the title for an image.
     * @param {?} image
     * @return {?} string the title of the input image
     */
    PlainGalleryComponent.prototype.getTitleDisplay = /**
     * Method to get the title for an image.
     * @param {?} image
     * @return {?} string the title of the input image
     */
    function (image) {
        /** @type {?} */
        var description = '';
        if (image.plain && image.plain.description) {
            description = image.plain.description;
        }
        else if (image.modal && image.modal.description) {
            description = image.modal.description;
        }
        /** @type {?} */
        var currentIndex = getIndex(image, this.images);
        /** @type {?} */
        var prevDescription = 'Image ' + (currentIndex + 1) + '/' + this.images.length;
        /** @type {?} */
        var currImgDescription = description ? description : '';
        if (currImgDescription !== '') {
            currImgDescription = ' - ' + currImgDescription;
        }
        return prevDescription + currImgDescription;
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
    PlainGalleryComponent.prototype.trackById = /**
     * Method used in the template to track ids in ngFor.
     * @param {?} index
     * @param {?} item
     * @return {?} number the id of the item
     */
    function (index, item) {
        return item.id;
    };
    /**
     * Private method to build and return a `PlainGalleryConfig` object, proving also default values.
     * @throws an Error if layout and strategy aren't compatible
     * @return {?} PlainGalleryConfig the plain gallery configuration
     */
    PlainGalleryComponent.prototype.initPlainGalleryConfig = /**
     * Private method to build and return a `PlainGalleryConfig` object, proving also default values.
     * @throws an Error if layout and strategy aren't compatible
     * @return {?} PlainGalleryConfig the plain gallery configuration
     */
    function () {
        /** @type {?} */
        var config = Object.assign({}, this.defaultPlainConfig, this.plainGalleryConfig);
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
    };
    /**
     * Private method to init both `imageGrid` and other style variables,
     * based on the layout type.
     * @return {?}
     */
    PlainGalleryComponent.prototype.initImageGrid = /**
     * Private method to init both `imageGrid` and other style variables,
     * based on the layout type.
     * @return {?}
     */
    function () {
        /** @type {?} */
        var config = this.configPlainGallery;
        // reset the array to prevent issues in case of GridLayout
        this.imageGrid = [];
        if (config.layout instanceof LineLayout) {
            /** @type {?} */
            var layout_1 = config.layout;
            /** @type {?} */
            var row = this.images.filter(function (val, i) { return i < layout_1.breakConfig.length || layout_1.breakConfig.length === -1; });
            this.imageGrid = [row];
            this.size = config.layout.size;
            switch (config.strategy) {
                case PlainGalleryStrategy.ROW:
                    this.directionStyle = 'row';
                    break;
                case PlainGalleryStrategy.COLUMN:
                    this.directionStyle = 'column';
                    this.wrapStyle = layout_1.breakConfig.wrap;
                    break;
            }
            this.justifyStyle = layout_1.justify;
        }
        if (config.layout instanceof GridLayout) {
            /** @type {?} */
            var layout = config.layout;
            /** @type {?} */
            var count = Math.ceil(this.images.length / layout.breakConfig.length);
            /** @type {?} */
            var start_1 = 0;
            /** @type {?} */
            var end_1 = layout.breakConfig.length - 1;
            for (var j = 0; j < count; j++) {
                /** @type {?} */
                var row = this.images.filter(function (val, i) { return i >= start_1 && i <= end_1; });
                this.imageGrid.push(row);
                start_1 = end_1 + 1;
                end_1 = start_1 + layout.breakConfig.length - 1;
            }
            this.size = config.layout.size;
            /** @type {?} */
            var pixels = +layout.size.width.replace('px', '');
            this.widthStyle = pixels * layout.breakConfig.length + pixels / 2 + 'px';
            this.wrapStyle = layout.breakConfig.wrap;
            this.directionStyle = 'row';
        }
        if (config.layout instanceof AdvancedLayout) {
            this.imageGrid = [this.images];
        }
    };
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
    return PlainGalleryComponent;
}());
export { PlainGalleryComponent };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxhaW4tZ2FsbGVyeS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9tb2RhbC1hbmd1bGFyLWdhbGxlcnkvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9wbGFpbi1nYWxsZXJ5L3BsYWluLWdhbGxlcnkuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXdCQSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLFlBQVfgRUFBRSxLQUFLLEVBQXFCLE1BQU0sRUFBK0IsTUFBTSxlQUFlLENBQUM7QUFLaEosT0FBTyxFQUFFLGNBQWMsRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFzQixvQkFBb0IsRUFBRSxNQUFNLDRDQUE0QyxDQUFDO0FBRTlJLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQzs7Ozs7Ozs7Ozs7OztvQkFxQ1QsSUFBSSxZQUFZLEVBQVU7Ozs7O3lCQVcxQyxFQUFFOzs7Ozs7eUJBVWIsS0FBSzs7Ozs7MEJBS0osRUFBRTs7OzsyQkFlYSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRTs7Ozs7NkJBS3pCLElBQUfgVUFBVSxDQUFDLElBQUfgQ0FBQyxXQUFXLEVBQUUsRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxFQUFFLFlBQVfgQ0FBQzs7OztrQ0FJOUQ7WUFDL0MsUUFBUSxFQUFFLG9CQUFvQixDQUFDLEdBQUc7WUFDbEMsTUFBTSxFQUFFLElBQUfgQ0FBQyxhQUFhO1lBQzFCLFFBQVEsRUFBRSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsb0JBQW9CLEVBQUUsZUFBZSxFQUFFO1NBQ2xFOztJQUVEOzs7OztPQUtHOzs7Ozs7OztJQUNILHdDQUFROzs7Ozs7O0lBQVI7UUFDRSxJQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDLHNCQUFzQixFQUFFLENBQUM7UUFDeEQsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO0tBQ3RCO0lBRUQ7Ozs7T0FJRzs7Ozs7Ozs7SUFDSCwyQ0FBVzs7Ozs7OztJQUFYLFVBQVfgT0FBc0I7O1FBQ2hDLElBQU0sWUFBWSxHQUFpQixPQUFPLFdBQVE7O1FBQ2xELElBQU0sWUFBWSxHQUFpQixPQUFPLHVCQUFvQjs7O1FBSTlELElBQ0UsWUFBWTtZQUNaLENBQUMsWUFBWSxDQUFDLFdBQVc7WUFDekIsQ0FBQyxZQUFZLENBQUMsYUFBYSxLQUFLLFlBQVfgQ0FBQyxZQUFZLElBQUfgQ0FBQyxDQUFDLFlBQVfgQ0FBQyxhQUFhLElBQUfgQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLENBQUMsRUFDekg7WUFDQSxJQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDLHNCQUFzQixFQUFFLENBQUM7U0FDekQ7UUFDRCxJQUFJLFlBQVfgSUFBSSxDQUFDLFlBQVfgQ0FBQyxXQUFXLElBQUfgWUFBWSxDQUFDLGFBQWEsS0FBSyxZQUFZLENBQUMsWUFBWSxFQUFFO1lBQ3pHLElBQUfgQ0FBQyxhQUFhLEVBQUUsQ0FBQztTQUN0QjtLQUNGO0lBRUQ7Ozs7T0FJRzs7Ozs7OztJQUNILGdEQUFnQjs7Ozs7O0lBQWhCLFVBQWlCLEtBQWE7UUFDNUIsSUFBSSxDQUFDLElBQUfgQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDdkI7SUFFRDs7OztPQUlHOzs7Ozs7O0lBQ0gsdURBQXVCOzs7Ozs7SUFBdkIsVUFBd0IsR0FBVTs7UUFDaEMsSUFBTSxLQUFLLEdBQVcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsVUFBQyxHQUFVLElBQUssT0FBQSxHQUFHLElBQUfgR0FBRyxJQUFJLEdBQUcsQ0FBQyxFQUFFLEtBQUssR0FBRyxDQUFDLEVBQUUsRUFBL0IsQ0FBK0IsQ0FBQyxDQUFDO1FBQzdGLElBQUfgQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUM5QjtJQUVEOzs7OztPQUtHOzs7Ozs7O0lBQ0gsNkRBQTZCOzs7Ozs7SUFBN0IsVUFBOEIsS0FBWTtRQUN4QyxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ1YsT0FBTyxFQUFFLENBQUM7U0FDWDtRQUNELE9BQU8sS0FBSyxDQUFDLEtBQUssSUFBSSxLQUFLLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLFlBQVMsUUFBUSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFFLENBQUM7S0FDdkg7SUFFRDs7OztPQUlHOzs7Ozs7SUFDSCwrQ0FBZTs7Ozs7SUFBZixVQUFnQixLQUFZOztRQUMxQixJQUFJLFdBQVcsR0FBRyxFQUFFLENBQUM7UUFFckIsSUFBSSxLQUFLLENBQUMsS0FBSyxJQUFJLEtBQUssQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFFO1lBQzFDLFdBQVcsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQztTQUN2QzthQUFNLElBQUfgS0FBSyxDQUFDLEtBQUssSUFBSSxLQUFLLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRTtZQUNqRCxXQUFXLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUM7U0FDdkM7O1FBRUQsSUFBTSxZQUFZLEdBQVcsUUFBUSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7O1FBQzFELElBQU0sZUFBZSxHQUFXLFFBQVEsR0FBRyxDQUFDLFlBQVfgR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUM7O1FBQ3pGLElBQUfga0JBQWtCLEdBQVcsV0FBVyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUVoRSxJQUFJLGtCQUFrQixLQUFLLEVBQUUsRUFBRTtZQUM3QixrQkFBa0IsR0FBRyxLQUFLLEdBQUcsa0JBQWtCLENBQUM7U0FDakQ7UUFDRCxPQUFPLGVBQWUsR0FBRyxrQkFBa0IsQ0FBQztLQUM3QztJQUVEOzs7OztPQUtHOzs7Ozs7O0lBQ0gseUNBQVM7Ozs7OztJQUFULFVBQVUsS0FBYSxFQUFFLElBQVc7UUFDbEMsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDO0tBQ2hCOzs7Ozs7SUFPTyxzREFBc0I7Ozs7Ozs7UUFDNUIsSUFBTSxNQUFNLEdBQXVCLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLElBQUfgQ0FBQyxrQkFBa0IsRUFBRSxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQztRQUV2RyxJQUFJLE1BQU0sQ0FBQyxNQUFNLFlBQVfgVUFBVSxFQUFFO1lBQ3ZDLElBQUfgTUFBTSxDQUFDLFFBQVEsS0FBSyxvQkFBb0IsQ0FBQyxHQUFHLElBQUfgTUFBTSxDQUFDLFFBQVEsS0FBSyxvQkFBb0IsQ0FBQyxNQUFNLEVBQUU7Z0JBQ25HLE1BQU0sSUFBSSxLQUFLLENBQUMsbURBQW1ELENBQUMsQ0FBQzthQUN0RTtZQUNELElBQUfgQ0FBQyxNQUFNLENBQUMsTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxXQUFXLEVBQUU7Z0JBQ2hELE1BQU0sSUFBSSxLQUFLLENBQUMsMkNBQTJDLENBQUMsQ0FBQzthQUM5RDtTQUNGO1FBRUQsSUFBSSxNQUFNLENBQUMsTUFBTSxZQUFZLFVBQVUsRUFBRTtZQUN2QyxJQUFJLE1BQU0sQ0FBQyxRQUFRLEtBQUssb0JBQW9CLENBQUMsSUFBSSxFQUFFO2dCQUNqRCxNQUFNLElBQUfgS0FBSyxDQUFDLG1DQUFtQyxDQUFDLENBQUM7YUFDdEQ7WUFDRCxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsV0FBVyxFQUFFO2dCQUNoRCxNQUFNLElBQUfgS0FBSyxDQUFDLDJDQUEyQyxDQUFDLENBQUM7YUFDOUQ7O1lBRUQsTUFBTSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxHQUFHLElBQUfgQ0FBQztTQUN2QztRQUVELElBQUfgTUFBTSxDQUFDLE1BQU0sWUFBWSxjQUFjLEVBQUU7WUFDM0MsSUFBSSxNQUFNLENBQUMsUUFBUSxLQUFLLG9CQUFvQixDQUFDLE1BQU0sRUFBRTtnQkFDbkQsTUFBTSxJQUFJLEtBQUssQ0FBQyx5Q0FBeUMsQ0FBQyxDQUFDO2FBQzVEO1NBQ0Y7UUFDRCxPQUFPLE1BQU0sQ0FBQzs7Ozs7OztJQU9SLDZDQUFhOzs7Ozs7O1FBQ25CLElBQU0sTUFBTSxHQUF1QixJQUFJLENBQUMsa0JBQWtCLENBQUM7O1FBRzNELElBQUfgQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO1FBRXBCLElBQUfgTUFBTSxDQUFDLE1BQU0sWUFBWSxVQUFVLEVBQUU7O1lBQ3ZDLElBQU0sUUFBTSxHQUFlLE1BQU0sQ0FBQyxNQUFNLENBQUM7O1lBQ3pDLElBQU0sR0FBRyxHQUFZLElBQUfgQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFVBQUMsR0FBVSxFQUFFLENBQVMsSUFBSyxPQUFBLENBQUMsR0FBRyxRQUFNLENBQUMsV0FBVyxDQUFDLE1BQU0sSUFBSSxRQUFNLENBQUMsV0FBVyxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsRUFBakUsQ0FBaUUsQ0FBQyxDQUFDO1lBQ3RJLElBQUfgQ0FBQyxTQUFTLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUV2QixJQUFJLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDO1lBRS9CLFFBQVEsTUFBTSxDQUFDLFFBQVEsRUFBRTtnQkFDdkIsS0FBSyxvQkFBb0IsQ0FBQyxHQUFHO29CQUMzQixJQUFJLENBQUMsY0FBYyxHQUFHLEtBQUssQ0FBQztvQkFDNUIsTUFBTTtnQkFDUixLQUFLLG9CQUFvQixDQUFDLE1BQU07b0JBQzlCLElBQUfgQ0FBQyxjQUFjLEdBQUcsUUFBUSxDQUFDO29CQUMvQixJQUFJLENBQUMsU0FBUyxHQUFHLFFBQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDO29CQUN6QyxNQUFNO2FBQ1Q7WUFDRCxJQUFJLENBQUMsWUFBWSxHQUFHLFFBQU0sQ0FBQyxPQUFPLENBQUM7U0FDcEM7UUFFRCxJQUFJLE1BQU0sQ0FBQyxNQUFNLFlBQVfgVUFBVSxFQUFFOztZQUN2QyxJQUFNLE1BQU0sR0FBZSxNQUFNLENBQUMsTUFBTSxDQUFDOztZQUN6QyxJQUFNLEtBQUssR0FBVyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUfgQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7O1lBQ2hGLElBQUfgT0FBSyxHQUFHLENBQUMsQ0FBQzs7WUFDZCxJQUFJLEtBQUcsR0FBVyxNQUFNLENBQUMsV0FBVyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7WUFFaEQsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRTs7Z0JBQzlCLElBQU0sR0FBRyxHQUFZLElBQUfgQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFVBQUMsR0FBVSxFQUFFLENBQVMsSUFBSyxPQUFBLENBQUMsSUFBSSxPQUFLLElBQUfgQ0FBQyxJQUFJLEtBQUcsRUFBdEIsQ0FBc0IsQ0FBQyxDQUFDO2dCQUMzRixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUfgQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDekIsT0FBSyxHQUFHLEtBQUcsR0FBRyxDQUFDLENBQUM7Z0JBQ2hCLEtBQUcsR0FBRyxPQUFLLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO2FBQzdDO1lBRUQsSUFBSSxDQUFDLElBQUfgR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUfgQ0FBQzs7WUFFL0IsSUFBTSxNQUFNLEdBQVcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBRTVELElBQUfgQ0FBQyxVQUFVLEdBQUcsTUFBTSxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUMsTUFBTSxHQUFHLE1BQU0sR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDO1lBQ3pFLElBQUfgQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUM7WUFFekMsSUFBSSxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUM7U0FDN0I7UUFFRCxJQUFJLE1BQU0sQ0FBQyxNQUFNLFlBQVfgY0FBYyxFQUFFO1lBQzNDLElBQUfgQ0FBQyxTQUFTLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDaEM7OztnQkFsUkosU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxrQkFBa0I7b0JBRTVCLHFnRUFBaUM7b0JBQ2pDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOztpQkFDaEQ7Ozt5QkFLRSxLQUFLOzhCQUlMLEtBQUs7cUNBSUwsS0FBSztzQ0FLTCxLQUFLO3VCQUtMLE1BQU07O2dDQXBFVDs7U0E4Q2EscUJBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiBUaGUgTUlUIExpY2Vuc2UgKE1JVClcblxuIENvcHlyaWdodCAoYykgMjAxNy0yMDE4IFN0ZWZhbm8gQ2FwcGEgKEtzODkpXG5cbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwifgwgdG8gZGVhbFxuIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbiB0byB1c2UsIGNvcHfgIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcblxuIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIGFsbFxuIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG5cbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFfgXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTiBJTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiBMSUFCSUxJVFfgIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFXG4gU09GVFdBUkUuXG4gKi9cblxuaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3fgIENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25DaGFuZ2VzLCBPbkluaXQsIE91dHB1dCwgU2ltcGxlQ2hhbmdlLCBTaW1wbGVDaGFuZ2VzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IEFjY2Vzc2liaWxpdHlDb25maWcgfSBmcm9tICcuLi8uLi9tb2RlbC9hY2Nlc3NpYmlsaXR5LmludGVyZmFjZSc7XG5pbXBvcnQgeyBJbWFnZSB9IGZyb20gJy4uLy4uL21vZGVsL2ltYWdlLmNsYXNzJztcbmltcG9ydCB7IFNpemUgfSBmcm9tICcuLi8uLi9tb2RlbC9zaXplLmludGVyZmFjZSc7XG5pbXBvcnQgeyBBZHZhbmNlZExheW91dCwgR3JpZExheW91dCwgTGluZUxheW91dCwgUGxhaW5HYWxsZXJ5Q29uZmlnLCBQbGFpbkdhbGxlcnlTdHJhdGVneSB9IGZyb20gJy4uLy4uL21vZGVsL3BsYWluLWdhbGxlcnktY29uZmlnLmludGVyZmFjZSc7XG5cbmltcG9ydCB7IGdldEluZGV4IH0gZnJvbSAnLi4vLi4vdXRpbHMvaW1hZ2UudXRpbCc7XG5cbi8qKlxuICogQ29tcG9uZW50IHdpdGggdGhlIGdhbGxlcnkgb2YgdGh1bWJzLlxuICogSW4gcmVjZWl2ZXMgYW4gYXJyYXkgb2YgSW1hZ2VzLCBhIGJvb2xlYW4gdG8gc2hvdy9oaWRlXG4gKiB0aGUgZ2FsbGVyeSAoZmVhdHVyZSB1c2VkIGJ5IGltYWdlUG9pbnRlcikgYW5kIGEgY29uZmlnXG4gKiBvYmplY3QgdG8gY3VzdG9taXplIHRoZSBiZWhhdmlvdXIgb2YgdGhpcyBjb21wb25lbnQuXG4gKiBBbHNvLCBpdCBlbWl0cyBjbGljayBldmVudHMgYXMgb3V0cHV0cy5cbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAna3MtcGxhaW4tZ2FsbGVyeScsXG4gIHN0eWxlVXJsczogWydwbGFpbi1nYWxsZXJ5LnNjc3MnXSxcbiAgdGVtcGxhdGVVcmw6ICdwbGFpbi1nYWxsZXJ5Lmh0bWwnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBQbGFpbkdhbGxlcnlDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcyB7XG4gIC8qKlxuICAgKiBBcnJheSBvZiBgSW1hZ2VgIHRoYXQgcmVwcmVzZW50IHRoZSBtb2RlbCBvZiB0aGlzIGxpYnJhcnkgd2l0aCBhbGwgaW1hZ2VzLCB0aHVtYnMgYW5kIHNvIG9uLlxuICAgKi9cbiAgQElucHV0KCkgaW1hZ2VzOiBJbWFnZVtdO1xuICAvKipcbiAgICogQm9vbGVhbiB0byBzaG93L2hpZGUgcGxhaW4gZ2FsbGVyeS4gSWYgdHJ1ZSB0aGUgcGxhaW4gZ2FsbGVyeSB3aWxsIGJlIHZpc2libGUsIGZhbHNlIG90aGVyd2lzZS5cbiAgICovXG4gIEBJbnB1dCgpIHNob3dHYWxsZXJ5OiBib29sZWFuO1xuICAvKipcbiAgICogT2JqZWN0IG9mIHR5cGUgYFBsYWluR2FsbGVyeUNvbmZpZ2AgdG8gY29uZmlndXJlIHRoZSBwbGFpbiBnYWxsZXJ5LlxuICAgKi9cbiAgQElucHV0KCkgcGxhaW5HYWxsZXJ5Q29uZmlnOiBQbGFpbkdhbGxlcnlDb25maWc7XG4gIC8qKlxuICAgKiBPYmplY3Qgb2YgdHlwZSBgQWNjZXNzaWJpbGl0eUNvbmZpZ2AgdG8gaW5pdCBjdXN0b20gYWNjZXNzaWJpbGl0eSBmZWF0dXJlcy5cbiAgICogRm9yIGluc3RhbmNlLCBpdCBjb250YWlucyB0aXRsZXMsIGFsdCB0ZXh0cywgYXJpYS1sYWJlbHMgYW5kIHNvIG9uLlxuICAgKi9cbiAgQElucHV0KCkgYWNjZXNzaWJpbGl0eUNvbmZpZzogQWNjZXNzaWJpbGl0eUNvbmZpZztcblxuICAvKipcbiAgICogT3V0cHV0IHRvIGVtaXQgYW4gZXZlbnQgd2hlbiBhbiBpbWFnZSBpcyBjaGFuZ2VkLlxuICAgKi9cbiAgQE91dHB1dCgpIHNob3c6IEV2ZW50RW1pdHRlcjxudW1iZXI+ID0gbmV3IEV2ZW50RW1pdHRlcjxudW1iZXI+KCk7XG5cbiAgLyoqXG4gICAqIE9iamVjdCBvZiB0eXBlIGBQbGFpbkdhbGxlcnlDb25maWdgIHRvIGNvbmZpZ3VyZSB0aGlzIGNvbXBvbmVudC5cbiAgICovXG4gIGNvbmZpZ1BsYWluR2FsbGVyeTogUGxhaW5HYWxsZXJ5Q29uZmlnO1xuXG4gIC8qKlxuICAgKiBCaS1kaW1lbnNpb25hbCBhcnJheSBvZiBgSW1hZ2VgIG9iamVjdCB0byBzdG9yZSBpbWFnZXMgdG8gZGlzcGxheSBhcyBwbGFpbiBnYWxsZXJ5LlxuICAgKiBbXSBieSBkZWZhdWx0LlxuICAgKi9cbiAgaW1hZ2VHcmlkOiBJbWFnZVtdW10gPSBbXTtcbiAgLyoqXG4gICAqIFNpemUgb2JqZWN0IHVzZWQgaW4gdGhlIHRlbXBsYXRlIHRvIHJlc2l6ZSBpbWFnZXMuXG4gICAqL1xuICBzaXplOiBTaXplO1xuICAvKipcbiAgICogQm9vbGVhbiBwYXNzZWQgYXMgaW5wdXQgdG8gYGtzLXdyYXBgIGRpcmVjdGl2ZSB0byBjb25maWd1cmUgZmxleC13cmFwIGNzcyBwcm9wZXJ0eS5cbiAgICogSG93ZXZlciBpdCdzIG5vdCBlbm91Z2gsIGJlY2F1c2UgeW91IG5lZWQgdG8gbGltaXQgdGhlIHdpZHRoIHVzaW5nIGB3aWR0aFN0eWxlYCBwdWJsaWMgdmFyaWFibGUuXG4gICAqIEZvciBtb3JlIGluZm8gY2hlY2sgaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvaXQvZG9jcy9XZWIvQ1NTL2ZsZXgtd3JhcFxuICAgKi9cbiAgd3JhcFN0eWxlID0gZmFsc2U7XG4gIC8qKlxuICAgKiBTdHJpbmcgcGFzc2VkIGFzIGlucHV0IHRvIGBrcy13cmFwYCBkaXJlY3RpdmUgdG8gc2V0IHdpZHRoIHRvIGJlIGFibGUgdG8gZm9yY2Ugb3ZlcmZsb3cuXG4gICAqIEluIHRoaXMgd2F5LCBgd3JhcFN0eWxlYCAoZmxleC13cmFwIGNzcyBwcm9wZXJ0eSkgd2lsbCBiZSB1c2VkIGFzIHJlcXVlc3RlZC5cbiAgICovXG4gIHdpZHRoU3R5bGUgPSAnJztcbiAgLyoqXG4gICAqIFN0cmluZyBwYXNzZWQgYXMgaW5wdXQgdG8gYGtzLWRpcmVjdGlvbmAgZGlyZWN0aXZlIHRvIHNldCB0aGUgZmxleC1kaXJlY3Rpb24gY3NzIHByb3BlcnR5LlxuICAgKiBGb3IgbW9yZSBpbmZvIGNoZWNrIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2l0L2RvY3MvV2ViL0NTUy9mbGV4LWRpcmVjdGlvblxuICAgKi9cbiAgZGlyZWN0aW9uU3R5bGU6IHN0cmluZztcbiAgLyoqXG4gICAqIFN0cmluZyBwYXNzZWQgYXMgaW5wdXQgdG8gYGtzLWRpcmVjdGlvbmAgZGlyZWN0aXZlIHRvIHNldCB0aGUganVzdGlmeS1jb250ZW50IGNzcyBwcm9wZXJ0eS5cbiAgICogRm9yIG1vcmUgaW5mbyBjaGVjayBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9pdC9kb2NzL1dlYi9DU1MvanVzdGlmeS1jb250ZW50XG4gICAqL1xuICBqdXN0aWZ5U3R5bGU6IHN0cmluZztcblxuICAvKipcbiAgICogRGVmYXVsdCBpbWFnZSBzaXplIG9iamVjdFxuICAgKi9cbiAgcHJpdmF0ZSBkZWZhdWx0U2l6ZTogU2l6ZSA9IHsgd2lkdGg6ICc1MHB4JywgaGVpZ2h0OiAnYXV0bycgfTtcbiAgLyoqXG4gICAqIERlZmF1bHQgbGF5b3V0IGNvbmZpZyBvYmplY3RcbiAgICogTm90ZSB0aGF0IGxlbmd0aD0tMSBtZWFucyBpbmZpbml0eVxuICAgKi9cbiAgcHJpdmF0ZSBkZWZhdWx0TGF5b3V0OiBMaW5lTGF5b3V0ID0gbmV3IExpbmVMYXlvdXQodGhpcy5kZWZhdWx0U2l6ZSwgeyBsZW5ndGg6IC0xLCB3cmFwOiBmYWxzZSB9LCAnZmxleC1zdGFydCcpO1xuICAvKipcbiAgICogRGVmYXVsdCBwbGFpbiBnYWxsZXJ5IGNvbmZpZyBvYmplY3RcbiAgICovXG4gIHByaXZhdGUgZGVmYXVsdFBsYWluQ29uZmlnOiBQbGFpbkdhbGxlcnlDb25maWcgPSB7XG4gICAgc3RyYXRlZ3k6IFBsYWluR2FsbGVyeVN0cmF0ZWd5LlJPVyxcbiAgICBsYXlvdXQ6IHRoaXMuZGVmYXVsdExheW91dCxcbiAgICBhZHZhbmNlZDogeyBhVGFnczogZmFsc2UsIGFkZGl0aW9uYWxCYWNrZ3JvdW5kOiAnNTAlIDUwJS9jb3ZlcicgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBNZXRob2QgwrRuZ09uSW5pdMK0IHRvIGluaXQgYm90aCBgY29uZmlnUGxhaW5HYWxsZXJ5YCBjYWxsaW5nIGBpbml0UGxhaW5HYWxsZXJ5Q29uZmlnKClgXG4gICAqIGFuZCBgaW1hZ2VHcmlkIGludm9raW5nIGBpbml0SW1hZ2VHcmlkKClgLlxuICAgKiBUaGlzIGlzIGFuIEFuZ3VsYXIncyBsaWZlY3ljbGUgaG9vaywgc28gaXRzIGNhbGxlZCBhdXRvbWF0aWNhbGx5IGJ5IEFuZ3VsYXIgaXRzZWxmLlxuICAgKiBJbiBwYXJ0aWN1bGFyLCBpdCdzIGNhbGxlZCBvbmx5IG9uZSB0aW1lISEhXG4gICAqL1xuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmNvbmZpZ1BsYWluR2FsbGVyeSA9IHRoaXMuaW5pdFBsYWluR2FsbGVyeUNvbmZpZygpO1xuICAgIHRoaXMuaW5pdEltYWdlR3JpZCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIE1ldGhvZCDCtG5nT25DaGFuZ2VzwrQgdG8gdXBkYXRlIGJvdGggYGltYWdlR3JpZGAgYW5kYGNvbmZpZ1BsYWluR2FsbGVyeWAuXG4gICAqIFRoaXMgaXMgYW4gQW5ndWxhcidzIGxpZmVjeWNsZSBob29rLCBzbyBpdHMgY2FsbGVkIGF1dG9tYXRpY2FsbHkgYnkgQW5ndWxhciBpdHNlbGYuXG4gICAqIEluIHBhcnRpY3VsYXIsIGl0J3MgY2FsbGVkIHdoZW4gYW55IGRhdGEtYm91bmQgcHJvcGVydHkgb2YgYSBkaXJlY3RpdmUgY2hhbmdlcyEhIVxuICAgKi9cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIGNvbnN0IGltYWdlc0NoYW5nZTogU2ltcGxlQ2hhbmdlID0gY2hhbmdlcy5pbWFnZXM7XG4gICAgY29uc3QgY29uZmlnQ2hhbmdlOiBTaW1wbGVDaGFuZ2UgPSBjaGFuZ2VzLnBsYWluR2FsbGVyeUNvbmZpZztcblxuICAgIC8vIEknbSB1c2luZyAhY2hhbmdlLmZpcnN0Q2hhbmdlIGJlY2F1c2UgdGhlIGZpcnN0IHRpbWUgd2lsbCBiZSBjYWxsZWQgYm90aCBvbkluaXQgYW5kIG9uQ2hhbmdlIGFuZCBJIGRvbid0XG4gICAgLy8gd2FudCB0byBleGVjdXRlIGluaXRpYWxpemF0aW9uIHR3byB0aW1lcy5cbiAgICBpZiAoXG4gICAgICBjb25maWdDaGFuZ2UgJiZcbiAgICAgICFjb25maWdDaGFuZ2UuZmlyc3RDaGFuZ2UgJiZcbiAgICAgIChjb25maWdDaGFuZ2UucHJldmlvdXNWYWx1ZSAhPT0gY29uZmlnQ2hhbmdlLmN1cnJlbnRWYWx1ZSB8fCAoIWNvbmZpZ0NoYW5nZS5wcmV2aW91c1ZhbHVlICYmICFjb25maWdDaGFuZ2UuY3VycmVudFZhbHVlfglcbiAgICApIHtcbiAgICAgIHRoaXMuY29uZmlnUGxhaW5HYWxsZXJ5ID0gdGhpcy5pbml0UGxhaW5HYWxsZXJ5Q29uZmlnKCk7XG4gICAgfVxuICAgIGlmIChpbWFnZXNDaGFuZ2UgJiYgIWltYWdlc0NoYW5nZS5maXJzdENoYW5nZSAmJiBpbWFnZXNDaGFuZ2UucHJldmlvdXNWYWx1ZSAhPT0gaW1hZ2VzQ2hhbmdlLmN1cnJlbnRWYWx1ZSkge1xuICAgICAgdGhpcy5pbml0SW1hZ2VHcmlkKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIE1ldGhvZCBjYWxsZWQgd2hlbiB5b3UgY2xpY2sgb24gYW4gaW1hZ2Ugb2YgdGhlIHBsYWluIChvciBpbmxpbmUpIGdhbGxlcnkuXG4gICAqIFRoaXMgd2lsbCBlbWl0IHRoZSBzaG93IGV2ZW50IHdpdGggdGhlIGluZGV4IG51bWJlciBhcyBwYXlsb2FkLlxuICAgKiBAcGFyYW0gbnVtYmVyIGluZGV4IG9mIHRoZSBjbGlja2VkIGltYWdlXG4gICAqL1xuICBzaG93TW9kYWxHYWxsZXJ5KGluZGV4OiBudW1iZXIpIHtcbiAgICB0aGlzLnNob3cuZW1pdChpbmRleCk7XG4gIH1cblxuICAvKipcbiAgICogTWV0aG9kIGNhbGxlZCB3aGVuIHlvdSBjbGljayBvbiBhbiBpbWFnZSBvZiB0aGUgcGxhaW4gKG9yIGlubGluZSkgZ2FsbGVyeS5cbiAgICogVGhpcyB3aWxsIGVtaXQgdGhlIHNob3cgZXZlbnQgd2l0aCB0aGUgaW1hZ2UgYXMgcGF5bG9hZC5cbiAgICogQHBhcmFtIEltYWdlIGltZyBpcyB0aGUgSW1hZ2UgdG8gc2hvd1xuICAgKi9cbiAgc2hvd01vZGFsR2FsbGVyeUJ5SW1hZ2UoaW1nOiBJbWFnZSkge1xuICAgIGNvbnN0IGluZGV4OiBudW1iZXIgPSB0aGlzLmltYWdlcy5maW5fgW5kZXgoKHZhbDogSW1hZ2UpID0+IHZhbCAmJiBpbWcgJiYgdmFsLmlkID09PSBpbWcuaWQpO1xuICAgIHRoaXMuc2hvd01vZGFsR2FsbGVyeShpbmRleCk7XG4gIH1cblxuICAvKipcbiAgICogTWV0aG9kIHRvIGdldCBgYWx0IGF0dHJpYnV0ZWAuXG4gICAqIGBhbHRgIHNwZWNpZmllcyBhbiBhbHRlcm5hdGUgdGV4dCBmb3IgYW4gaW1hZ2UsIGlmIHRoZSBpbWFnZSBjYW5ub3QgYmUgZGlzcGxheWVkLlxuICAgKiBAcGFyYW0gSW1hZ2UgaW1hZ2UgdG8gZ2V0IGl0cyBhbHQgZGVzY3JpcHRpb24uXG4gICAqIEByZXR1cm5zIHN0cmluZyBhbHQgZGVzY3JpcHRpb24gb2YgdGhlIGltYWdlXG4gICAqL1xuICBnZXRBbHRQbGFpbkRlc2NyaXB0aW9uQnlJbWFnZShpbWFnZTogSW1hZ2UpOiBzdHJpbmcge1xuICAgIGlmICghaW1hZ2UpIHtcbiAgICAgIHJldHVybiAnJztcbiAgICB9XG4gICAgcmV0dXJuIGltYWdlLnBsYWluICYmIGltYWdlLnBsYWluLmRlc2NyaXB0aW9uID8gaW1hZ2UucGxhaW4uZGVzY3JpcHRpb24gOiBgSW1hZ2UgJHtnZXRJbmRleChpbWFnZSwgdGhpcy5pbWFnZXMpICsgMX1gO1xuICB9XG5cbiAgLyoqXG4gICAqIE1ldGhvZCB0byBnZXQgdGhlIHRpdGxlIGZvciBhbiBpbWFnZS5cbiAgICogQHBhcmFtIEltYWdlIGltYWdlIHRvIGdldCBpdHMgdGl0bGVcbiAgICogQHJldHVybnMgc3RyaW5nIHRoZSB0aXRsZSBvZiB0aGUgaW5wdXQgaW1hZ2VcbiAgICovXG4gIGdldFRpdGxlRGlzcGxheShpbWFnZTogSW1hZ2UpOiBzdHJpbmcge1xuICAgIGxldCBkZXNjcmlwdGlvbiA9ICcnO1xuXG4gICAgaWYgKGltYWdlLnBsYWluICYmIGltYWdlLnBsYWluLmRlc2NyaXB0aW9ufgB7XG4gICAgICBkZXNjcmlwdGlvbiA9IGltYWdlLnBsYWluLmRlc2NyaXB0aW9uO1xuICAgIH0gZWxzZSBpZiAoaW1hZ2UubW9kYWwgJiYgaW1hZ2UubW9kYWwuZGVzY3JpcHRpb24pIHtcbiAgICAgIGRlc2NyaXB0aW9uID0gaW1hZ2UubW9kYWwuZGVzY3JpcHRpb247XG4gICAgfVxuXG4gICAgY29uc3QgY3VycmVudEluZGV4OiBudW1iZXIgPSBnZXRJbmRleChpbWFnZSwgdGhpcy5pbWFnZXMpO1xuICAgIGNvbnN0IHByZXZEZXNjcmlwdGlvbjogc3RyaW5nID0gJ0ltYWdlICcgKyAoY3VycmVudEluZGV4ICsgMSkgKyAnLycgKyB0aGlzLmltYWdlcy5sZW5ndGg7XG4gICAgbGV0IGN1cnJJbWdEZXNjcmlwdGlvbjogc3RyaW5nID0gZGVzY3JpcHRpb24gPyBkZXNjcmlwdGlvbiA6ICcnO1xuXG4gICAgaWYgKGN1cnJJbWdEZXNjcmlwdGlvbiAhPT0gJycpIHtcbiAgICAgIGN1cnJJbWdEZXNjcmlwdGlvbiA9ICcgLSAnICsgY3VyckltZ0Rlc2NyaXB0aW9uO1xuICAgIH1cbiAgICByZXR1cm4gcHJldkRlc2NyaXB0aW9uICsgY3VyckltZ0Rlc2NyaXB0aW9uO1xuICB9XG5cbiAgLyoqXG4gICAqIE1ldGhvZCB1c2VkIGluIHRoZSB0ZW1wbGF0ZSB0byB0cmFjayBpZHMgaW4gbmdGb3IuXG4gICAqIEBwYXJhbSBudW1iZXIgaW5kZXggb2YgdGhlIGFycmF5XG4gICAqIEBwYXJhbSBJbWFnZSBpdGVtIG9mIHRoZSBhcnJheVxuICAgKiBAcmV0dXJucyBudW1iZXIgdGhlIGlkIG9mIHRoZSBpdGVtXG4gICAqL1xuICB0cmFja0J5SWQoaW5kZXg6IG51bWJlciwgaXRlbTogSW1hZ2UpOiBudW1iZXIge1xuICAgIHJldHVybiBpdGVtLmlkO1xuICB9XG5cbiAgLyoqXG4gICAqIFByaXZhdGUgbWV0aG9kIHRvIGJ1aWxkIGFuZCByZXR1cm4gYSBgUGxhaW5HYWxsZXJ5Q29uZmlnYCBvYmplY3QsIHByb3ZpbmcgYWxzbyBkZWZhdWx0IHZhbHVlcy5cbiAgICogQHJldHVybnMgUGxhaW5HYWxsZXJ5Q29uZmlnIHRoZSBwbGFpbiBnYWxsZXJ5IGNvbmZpZ3VyYXRpb25cbiAgICogQHRocm93cyBhbiBFcnJvciBpZiBsYXlvdXQgYW5kIHN0cmF0ZWd5IGFyZW4ndCBjb21wYXRpYmxlXG4gICAqL1xuICBwcml2YXRlIGluaXRQbGFpbkdhbGxlcnlDb25maWcoKTogUGxhaW5HYWxsZXJ5Q29uZmlnIHtcbiAgICBjb25zdCBjb25maWc6IFBsYWluR2FsbGVyeUNvbmZpZyA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuZGVmYXVsdFBsYWluQ29uZmlnLCB0aGlzLnBsYWluR2FsbGVyeUNvbmZpZyk7XG5cbiAgICBpZiAoY29uZmlnLmxheW91dCBpbnN0YW5jZW9mIExpbmVMYXlvdXQpIHtcbiAgICAgIGlmIChjb25maWcuc3RyYXRlZ3kgIT09IFBsYWluR2FsbGVyeVN0cmF0ZWd5LlJPVyAmJiBjb25maWcuc3RyYXRlZ3kgIT09IFBsYWluR2FsbGVyeVN0cmF0ZWd5LkNPTFVNTikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0xpbmVMYXlvdXQgcmVxdWlyZXMgZWl0aGVyIFJPVyBvciBDT0xVTU4gc3RyYXRlZ3knKTtcbiAgICAgIH1cbiAgICAgIGlmICghY29uZmlnLmxheW91dCB8fCAhY29uZmlnLmxheW91dC5icmVha0NvbmZpZykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0JvdGggbGF5b3V0IGFuZCBicmVha0NvbmZpZyBtdXN0IGJlIHZhbGlkJyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGNvbmZpZy5sYXlvdXQgaW5zdGFuY2VvZiBHcmlkTGF5b3V0fgB7XG4gICAgICBpZiAoY29uZmlnLnN0cmF0ZWd5ICE9PSBQbGFpbkdhbGxlcnlTdHJhdGVneS5HUklEfgB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignR3JpZExheW91dCByZXF1aXJlcyBHUklEIHN0cmF0ZWd5Jyk7XG4gICAgICB9XG4gICAgICBpZiAoIWNvbmZpZy5sYXlvdXQgfHwgIWNvbmZpZy5sYXlvdXQuYnJlYWtDb25maWcpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdCb3RoIGxheW91dCBhbmQgYnJlYWtDb25maWcgbXVzdCBiZSB2YWxpZCcpO1xuICAgICAgfVxuICAgICAgLy8gZm9yY2Ugd3JhcCBmb3IgZ3JpZCBsYXlvdXRcbiAgICAgIGNvbmZpZy5sYXlvdXQuYnJlYWtDb25maWcud3JhcCA9IHRydWU7XG4gICAgfVxuXG4gICAgaWYgKGNvbmZpZy5sYXlvdXQgaW5zdGFuY2VvZiBBZHZhbmNlZExheW91dCkge1xuICAgICAgaWYgKGNvbmZpZy5zdHJhdGVneSAhPT0gUGxhaW5HYWxsZXJ5U3RyYXRlZ3kuQ1VTVE9NfgB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignQWR2YW5jZWRMYXlvdXQgcmVxdWlyZXMgQ1VTVE9NIHN0cmF0ZWd5Jyk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBjb25maWc7XG4gIH1cblxuICAvKipcbiAgICogUHJpdmF0ZSBtZXRob2QgdG8gaW5pdCBib3RoIGBpbWFnZUdyaWRgIGFuZCBvdGhlciBzdHlsZSB2YXJpYWJsZXMsXG4gICAqIGJhc2VkIG9uIHRoZSBsYXlvdXQgdHlwZS5cbiAgICovXG4gIHByaXZhdGUgaW5pdEltYWdlR3JpZCgpIHtcbiAgICBjb25zdCBjb25maWc6IFBsYWluR2FsbGVyeUNvbmZpZyA9IHRoaXMuY29uZmlnUGxhaW5HYWxsZXJ5O1xuXG4gICAgLy8gcmVzZXQgdGhlIGFycmF5IHRvIHByZXZlbnQgaXNzdWVzIGluIGNhc2Ugb2YgR3JpZExheW91dFxuICAgIHRoaXMuaW1hZ2VHcmlkID0gW107XG5cbiAgICBpZiAoY29uZmlnLmxheW91dCBpbnN0YW5jZW9mIExpbmVMYXlvdXQpIHtcbiAgICAgIGNvbnN0IGxheW91dDogTGluZUxheW91dCA9IGNvbmZpZy5sYXlvdXQ7XG4gICAgICBjb25zdCByb3c6IEltYWdlW10gPSB0aGlzLmltYWdlcy5maWx0ZXIoKHZhbDogSW1hZ2UsIGk6IG51bWJlcikgPT4gaSA8IGxheW91dC5icmVha0NvbmZpZy5sZW5ndGggfHwgbGF5b3V0LmJyZWFrQ29uZmlnLmxlbmd0aCA9PT0gLTEpO1xuICAgICAgdGhpcy5pbWFnZUdyaWQgPSBbcm93XTtcblxuICAgICAgdGhpcy5zaXplID0gY29uZmlnLmxheW91dC5zaXplO1xuXG4gICAgICBzd2l0Y2ggKGNvbmZpZy5zdHJhdGVneSkge1xuICAgICAgICBjYXNlIFBsYWluR2FsbGVyeVN0cmF0ZWd5LlJPVzpcbiAgICAgICAgICB0aGlzLmRpcmVjdGlvblN0eWxlID0gJ3Jvdyc7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgUGxhaW5HYWxsZXJ5U3RyYXRlZ3kuQ09MVU1OOlxuICAgICAgICAgIHRoaXMuZGlyZWN0aW9uU3R5bGUgPSAnY29sdW1uJztcbiAgICAgICAgICB0aGlzLndyYXBTdHlsZSA9IGxheW91dC5icmVha0NvbmZpZy53cmFwO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgdGhpcy5qdXN0aWZ5U3R5bGUgPSBsYXlvdXQuanVzdGlmeTtcbiAgICB9XG5cbiAgICBpZiAoY29uZmlnLmxheW91dCBpbnN0YW5jZW9mIEdyaWRMYXlvdXQpIHtcbiAgICAgIGNvbnN0IGxheW91dDogR3JpZExheW91dCA9IGNvbmZpZy5sYXlvdXQ7XG4gICAgICBjb25zdCBjb3VudDogbnVtYmVyID0gTWF0aC5jZWlsKHRoaXMuaW1hZ2VzLmxlbmd0aCAvIGxheW91dC5icmVha0NvbmZpZy5sZW5ndGgpO1xuICAgICAgbGV0IHN0YXJ0ID0gMDtcbiAgICAgIGxldCBlbmQ6IG51bWJlciA9IGxheW91dC5icmVha0NvbmZpZy5sZW5ndGggLSAxO1xuXG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGNvdW50OyBqKyspIHtcbiAgICAgICAgY29uc3Qgcm93OiBJbWFnZVtdID0gdGhpcy5pbWFnZXMuZmlsdGVyKCh2YWw6IEltYWdlLCBpOiBudW1iZXIpID0+IGkgPj0gc3RhcnQgJiYgaSA8PSBlbmQpO1xuICAgICAgICB0aGlzLmltYWdlR3JpZC5wdXNoKHJvdyk7XG4gICAgICAgIHN0YXJ0ID0gZW5kICsgMTtcbiAgICAgICAgZW5kID0gc3RhcnQgKyBsYXlvdXQuYnJlYWtDb25maWcubGVuZ3RoIC0gMTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5zaXplID0gY29uZmlnLmxheW91dC5zaXplO1xuXG4gICAgICBjb25zdCBwaXhlbHM6IG51bWJlciA9ICtsYXlvdXQuc2l6ZS53aWR0aC5yZXBsYWNlKCdweCcsICcnKTtcblxuICAgICAgdGhpcy53aWR0aFN0eWxlID0gcGl4ZWxzICogbGF5b3V0LmJyZWFrQ29uZmlnLmxlbmd0aCArIHBpeGVscyAvIDIgKyAncHgnO1xuICAgICAgdGhpcy53cmFwU3R5bGUgPSBsYXlvdXQuYnJlYWtDb25maWcud3JhcDtcblxuICAgICAgdGhpcy5kaXJlY3Rpb25TdHlsZSA9ICdyb3cnO1xuICAgIH1cblxuICAgIGlmIChjb25maWcubGF5b3V0IGluc3RhbmNlb2YgQWR2YW5jZWRMYXlvdXQpIHtcbiAgICAgIHRoaXMuaW1hZ2VHcmlkID0gW3RoaXMuaW1hZ2VzXTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==