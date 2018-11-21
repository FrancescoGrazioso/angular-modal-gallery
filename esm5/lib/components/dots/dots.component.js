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
import { NEXT } from '../../utils/user-input.util';
import { getIndex } from '../../utils/image.util';
/**
 * Component with clickable dots (small circles) to navigate between images inside the modal gallery.
 */
var DotsComponent = /** @class */ (function (_super) {
    tslib_1.__extends(DotsComponent, _super);
    function DotsComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * Object of type `DotsConfig` to init DotsComponent's features.
         * For instance, it contains a param to show/hide this component.
         */
        _this.dotsConfig = { visible: true };
        /**
         * Output to emit clicfg on dots. The payload contains a number that represent
         * the index of the clicked dot.
         */
        _this.clickDot = new EventEmitter();
        return _this;
    }
    /**
     * Method ´ngOnInit´ to build `configDots` applying a default value.
     * This is an Angular's lifecycle hook, so its called automatically by Angular itself.
     * In particular, it's called only one time!!!
     */
    /**
     * Method ´ngOnInit´ to build `configDots` applying a default value.
     * This is an Angular's lifecycle hook, so its called automatically by Angular itself.
     * In particular, it's called only one time!!!
     * @return {?}
     */
    DotsComponent.prototype.ngOnInit = /**
     * Method ´ngOnInit´ to build `configDots` applying a default value.
     * This is an Angular's lifecycle hook, so its called automatically by Angular itself.
     * In particular, it's called only one time!!!
     * @return {?}
     */
    function () {
        /** @type {?} */
        var defaultConfig = { visible: true };
        this.configDots = Object.assign(defaultConfig, this.dotsConfig);
    };
    /**
     * Method to check if an image is active (i.e. the current image).
     * It checfg currentImage and images to prevent errors.
     * @param number index of the image to check if it's active or not
     * @returns boolean true if is active (and input params are valid), false otherwise
     */
    /**
     * Method to check if an image is active (i.e. the current image).
     * It checfg currentImage and images to prevent errors.
     * @param {?} index
     * @return {?} boolean true if is active (and input params are valid), false otherwise
     */
    DotsComponent.prototype.isActive = /**
     * Method to check if an image is active (i.e. the current image).
     * It checfg currentImage and images to prevent errors.
     * @param {?} index
     * @return {?} boolean true if is active (and input params are valid), false otherwise
     */
    function (index) {
        if (!this.currentImage || !this.images || this.images.length === 0) {
            return false;
        }
        /** @type {?} */
        var imageIndex;
        try {
            imageIndex = getIndex(this.currentImage, this.images);
        }
        catch (err) {
            console.error("Internal error while trying to show the active 'dot'", err);
            return false;
        }
        return index === imageIndex;
    };
    /**
     * Method called by events from keyboard and mouse.
     * @param number index of the dot
     * @param KeyboardEvent | MouseEvent event payload
     */
    /**
     * Method called by events from keyboard and mouse.
     * @param {?} index
     * @param {?} event
     * @return {?}
     */
    DotsComponent.prototype.onDotEvent = /**
     * Method called by events from keyboard and mouse.
     * @param {?} index
     * @param {?} event
     * @return {?}
     */
    function (index, event) {
        /** @type {?} */
        var result = _super.prototype.handleImageEvent.call(this, event);
        if (result === NEXT) {
            this.clickDot.emit(index);
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
    DotsComponent.prototype.trackById = /**
     * Method used in the template to track ids in ngFor.
     * @param {?} index
     * @param {?} item
     * @return {?} number the id of the item
     */
    function (index, item) {
        return item.id;
    };
    DotsComponent.decorators = [
        { type: Component, args: [{
                    selector: 'fg-dots',
                    template: "<nav class=\"dots-container\" [attr.aria-label]=\"accessibilityConfig?.dotsContainerAriaLabel\"\n     [title]=\"accessibilityConfig?.dotsContainerTitle\">\n  <ng-container *ngIf=\"!configDots || configDots?.visible\">\n    <div class=\"inside dot\"\n         *ngFor=\"let img of images; trackBy: trackById; let index = index\"\n         [ngClass]=\"{'active': isActive(index)}\"\n         [attr.aria-label]=\"accessibilityConfig?.dotAriaLabel + ' ' + (index + 1)\"\n         [tabindex]=\"0\" role=\"navigation\"\n         (click)=\"onDotEvent(index, $event)\" (keyup)=\"onDotEvent(index, $event)\"></div>\n  </ng-container>\n</nav>\n",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: [".dots-container{display:flex;flex-direction:row;justify-content:center;margin-bottom:30px}.dots-container>.dot{background:#fff;border-radius:5px;height:10px;margin-left:4px;margin-right:4px;width:10px;cursor:pointer;opacity:.5}.dots-container>.dot:hover{opacity:.9;transition:opacity .5s}.dots-container>.dot.active{cursor:pointer;opacity:.9}@-webkit-keyframes fadein-semi-visible05{from{opacity:0}to{opacity:.5}}@keyframes fadein-semi-visible05{from{opacity:0}to{opacity:.5}}@-webkit-keyframes fadein-semi-visible09{from{opacity:0}to{opacity:.9}}@keyframes fadein-semi-visible09{from{opacity:0}to{opacity:.9}}"]
                }] }
    ];
    DotsComponent.propDecorators = {
        currentImage: [{ type: Input }],
        images: [{ type: Input }],
        dotsConfig: [{ type: Input }],
        accessibilityConfig: [{ type: Input }],
        clickDot: [{ type: Output }]
    };
    return DotsComponent;
}(AccessibleComponent));
export { DotsComponent };
if (false) {
    /**
     * Object of type `InternalLibImage` that represent the visible image.
     * @type {?}
     */
    DotsComponent.prototype.currentImage;
    /**
     * Array of `InternalLibImage` that represent the model of this library with all images,
     * thumbs and so on.
     * @type {?}
     */
    DotsComponent.prototype.images;
    /**
     * Object of type `DotsConfig` to init DotsComponent's features.
     * For instance, it contains a param to show/hide this component.
     * @type {?}
     */
    DotsComponent.prototype.dotsConfig;
    /**
     * Object of type `AccessibilityConfig` to init custom accessibility features.
     * For instance, it contains titles, alt texts, aria-labels and so on.
     * @type {?}
     */
    DotsComponent.prototype.accessibilityConfig;
    /**
     * Output to emit clicfg on dots. The payload contains a number that represent
     * the index of the clicked dot.
     * @type {?}
     */
    DotsComponent.prototype.clickDot;
    /**
     * Object of type `DotsConfig` exposed to the template. This field is initialized
     * applying transformations, default values and so on to the input of the same type.
     * @type {?}
     */
    DotsComponent.prototype.configDots;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG90cy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9tb2RhbC1hbmd1bGFyLWdhbGxlcnkvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9kb3RzL2RvdHMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF3QkEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFVLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUV4RyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUk5RCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUdwRSxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDbkQsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLHdCQUF3QixDQUFDOzs7OztJQVdmLHlDQUFtQjs7Ozs7OzsyQkFjbEIsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFOzs7Ozt5QkFVUixJQUFJLFlBQVfgRUFBVTs7O0lBUXJFOzs7O09BSUc7Ozs7Ozs7SUFDSCxnQ0FBUTs7Ozs7O0lBQVI7O1FBQ0UsSUFBTSxhQUFhLEdBQWUsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUM7UUFDcEQsSUFBSSxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7S0FDakU7SUFFRDs7Ozs7T0FLRzs7Ozs7OztJQUNILGdDQUFROzs7Ozs7SUFBUixVQUFTLEtBQWE7UUFDcEIsSUFBSSxDQUFDLElBQUfgQ0FBQyxZQUFZLElBQUfgQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUfgQ0FBQyxNQUFNLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtZQUNsRSxPQUFPLEtBQUssQ0FBQztTQUNkOztRQUNELElBQUfgVUFBVSxDQUFTO1FBQ3ZCLElBQUk7WUFDRixVQUFVLEdBQUcsUUFBUSxDQUFDLElBQUfgQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ3ZEO1FBQUMsT0FBTyxHQUFHLEVBQUU7WUFDWixPQUFPLENBQUMsS0FBSyxDQUFDLHNEQUFzRCxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQzNFLE9BQU8sS0FBSyxDQUFDO1NBQ2Q7UUFDRCxPQUFPLEtBQUssS0FBSyxVQUFVLENBQUM7S0FDN0I7SUFFRDs7OztPQUlHOzs7Ozs7O0lBQ0gsa0NBQVU7Ozs7OztJQUFWLFVBQVcsS0FBYSxFQUFFLEtBQWlDOztRQUN6RCxJQUFNLE1BQU0sR0FBVyxpQkFBTSxnQkFBZ0IsWUFBQyxLQUFLLENBQUMsQ0FBQztRQUNyRCxJQUFJLE1BQU0sS0FBSyxJQUFJLEVBQUU7WUFDbkIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDM0I7S0FDRjtJQUVEOzs7OztPQUtHOzs7Ozs7O0lBQ0gsaUNBQVM7Ozs7OztJQUFULFVBQVUsS0FBYSxFQUFFLElBQVc7UUFDbEMsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDO0tBQ2hCOztnQkF4RkYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxTQUFTO29CQUVuQixxb0JBQXdCO29CQUN4QixlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7aUJBQ2hEOzs7K0JBS0UsS0FBSzt5QkFLTCxLQUFLOzZCQUtMLEtBQUs7c0NBS0wsS0FBSzsyQkFLTCxNQUFNOzt3QkFyRVQ7RUE2Q21DLG1CQUFtQjtTQUF6QyxhQUFhIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiBUaGUgTUlUIExpY2Vuc2UgKE1JVClcblxuIENvcHlyaWdodCAoYykgMjAxNy0yMDE4IFN0ZWZhbm8gQ2FwcGEgKEtzODkpXG5cbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwifgwgdG8gZGVhbFxuIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbiB0byB1c2UsIGNvcHfgIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcblxuIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIGFsbFxuIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG5cbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFfgXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTiBJTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiBMSUFCSUxJVFfgIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFXG4gU09GVFdBUkUuXG4gKi9cblxuaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3fgIENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25Jbml0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgQWNjZXNzaWJsZUNvbXBvbmVudCB9IGZyb20gJy4uL2FjY2Vzc2libGUuY29tcG9uZW50JztcblxuaW1wb3J0IHsgQWNjZXNzaWJpbGl0eUNvbmZpZyB9IGZyb20gJy4uLy4uL21vZGVsL2FjY2Vzc2liaWxpdHkuaW50ZXJmYWNlJztcbmltcG9ydCB7IEltYWdlIH0gZnJvbSAnLi4vLi4vbW9kZWwvaW1hZ2UuY2xhc3MnO1xuaW1wb3J0IHsgSW50ZXJuYWxMaWJJbWFnZSB9IGZyb20gJy4uLy4uL21vZGVsL2ltYWdlLWludGVybmFsLmNsYXNzJztcbmltcG9ydCB7IERvdHNDb25maWcgfSBmcm9tICcuLi8uLi9tb2RlbC9kb3RzLWNvbmZpZy5pbnRlcmZhY2UnO1xuXG5pbXBvcnQgeyBORVhUIH0gZnJvbSAnLi4vLi4vdXRpbHMvdXNlci1pbnB1dC51dGlsJztcbmltcG9ydCB7IGdldEluZGV4IH0gZnJvbSAnLi4vLi4vdXRpbHMvaW1hZ2UudXRpbCc7XG5cbi8qKlxuICogQ29tcG9uZW50IHdpdGggY2xpY2thYmxlIGRvdHMgKHNtYWxsIGNpcmNsZXMpIHRvIG5hdmlnYXRlIGJldHdlZW4gaW1hZ2VzIGluc2lkZSB0aGUgbW9kYWwgZ2FsbGVyeS5cbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAna3MtZG90cycsXG4gIHN0eWxlVXJsczogWydkb3RzLnNjc3MnXSxcbiAgdGVtcGxhdGVVcmw6ICdkb3RzLmh0bWwnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBEb3RzQ29tcG9uZW50IGV4dGVuZHMgQWNjZXNzaWJsZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIC8qKlxuICAgKiBPYmplY3Qgb2YgdHlwZSBgSW50ZXJuYWxMaWJJbWFnZWAgdGhhdCByZXByZXNlbnQgdGhlIHZpc2libGUgaW1hZ2UuXG4gICAqL1xuICBASW5wdXQofgBjdXJyZW50SW1hZ2U6IEludGVybmFsTGliSW1hZ2U7XG4gIC8qKlxuICAgKiBBcnJheSBvZiBgSW50ZXJuYWxMaWJJbWFnZWAgdGhhdCByZXByZXNlbnQgdGhlIG1vZGVsIG9mIHRoaXMgbGlicmFyeSB3aXRoIGFsbCBpbWFnZXMsXG4gICAqIHRodW1icyBhbmQgc28gb24uXG4gICAqL1xuICBASW5wdXQofgBpbWFnZXM6IEludGVybmFsTGliSW1hZ2VbXTtcbiAgLyoqXG4gICAqIE9iamVjdCBvZiB0eXBlIGBEb3RzQ29uZmlnYCB0byBpbml0IERvdHNDb21wb25lbnQncyBmZWF0dXJlcy5cbiAgICogRm9yIGluc3RhbmNlLCBpdCBjb250YWlucyBhIHBhcmFtIHRvIHNob3cvaGlkZSB0aGlzIGNvbXBvbmVudC5cbiAgICovXG4gIEBJbnB1dCgpIGRvdHNDb25maWc6IERvdHNDb25maWcgPSB7IHZpc2libGU6IHRydWUgfTtcbiAgLyoqXG4gICAqIE9iamVjdCBvZiB0eXBlIGBBY2Nlc3NpYmlsaXR5Q29uZmlnYCB0byBpbml0IGN1c3RvbSBhY2Nlc3NpYmlsaXR5IGZlYXR1cmVzLlxuICAgKiBGb3IgaW5zdGFuY2UsIGl0IGNvbnRhaW5zIHRpdGxlcywgYWx0IHRleHRzLCBhcmlhLWxhYmVscyBhbmQgc28gb24uXG4gICAqL1xuICBASW5wdXQofgBhY2Nlc3NpYmlsaXR5Q29uZmlnOiBBY2Nlc3NpYmlsaXR5Q29uZmlnO1xuICAvKipcbiAgICogT3V0cHV0IHRvIGVtaXQgY2xpY2tzIG9uIGRvdHMuIFRoZSBwYXlsb2FkIGNvbnRhaW5zIGEgbnVtYmVyIHRoYXQgcmVwcmVzZW50XG4gICAqIHRoZSBpbmRleCBvZiB0aGUgY2xpY2tlZCBkb3QuXG4gICAqL1xuICBAT3V0cHV0KCkgY2xpY2tEb3Q6IEV2ZW50RW1pdHRlcjxudW1iZXI+ID0gbmV3IEV2ZW50RW1pdHRlcjxudW1iZXI+KCk7XG5cbiAgLyoqXG4gICAqIE9iamVjdCBvZiB0eXBlIGBEb3RzQ29uZmlnYCBleHBvc2VkIHRvIHRoZSB0ZW1wbGF0ZS4gVGhpcyBmaWVsZCBpcyBpbml0aWFsaXplZFxuICAgKiBhcHBseWluZyB0cmFuc2Zvcm1hdGlvbnMsIGRlZmF1bHQgdmFsdWVzIGFuZCBzbyBvbiB0byB0aGUgaW5wdXQgb2YgdGhlIHNhbWUgdHlwZS5cbiAgICovXG4gIGNvbmZpZ0RvdHM6IERvdHNDb25maWc7XG5cbiAgLyoqXG4gICAqIE1ldGhvZCDCtG5nT25Jbml0wrQgdG8gYnVpbGQgYGNvbmZpZ0RvdHNgIGFwcGx5aW5nIGEgZGVmYXVsdCB2YWx1ZS5cbiAgICogVGhpcyBpcyBhbiBBbmd1bGFyJ3MgbGlmZWN5Y2xlIGhvb2ssIHNvIGl0cyBjYWxsZWQgYXV0b21hdGljYWxseSBieSBBbmd1bGFyIGl0c2VsZi5cbiAgICogSW4gcGFydGljdWxhciwgaXQncyBjYWxsZWQgb25seSBvbmUgdGltZSEhIVxuICAgKi9cbiAgbmdPbkluaXQofgB7XG4gICAgY29uc3QgZGVmYXVsdENvbmZpZzogRG90c0NvbmZpZyA9IHsgdmlzaWJsZTogdHJ1ZSB9O1xuICAgIHRoaXMuY29uZmlnRG90cyA9IE9iamVjdC5hc3NpZ24oZGVmYXVsdENvbmZpZywgdGhpcy5kb3RzQ29uZmlnKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBNZXRob2QgdG8gY2hlY2sgaWYgYW4gaW1hZ2UgaXMgYWN0aXZlIChpLmUuIHRoZSBjdXJyZW50IGltYWdlfg5cbiAgICogSXQgY2hlY2tzIGN1cnJlbnRJbWFnZSBhbmQgaW1hZ2VzIHRvIHByZXZlbnQgZXJyb3JzLlxuICAgKiBAcGFyYW0gbnVtYmVyIGluZGV4IG9mIHRoZSBpbWFnZSB0byBjaGVjayBpZiBpdCdzIGFjdGl2ZSBvciBub3RcbiAgICogQHJldHVybnMgYm9vbGVhbiB0cnVlIGlmIGlzIGFjdGl2ZSAoYW5kIGlucHV0IHBhcmFtcyBhcmUgdmFsaWQpLCBmYWxzZSBvdGhlcndpc2VcbiAgICovXG4gIGlzQWN0aXZlKGluZGV4OiBudW1iZXIpOiBib29sZWFuIHtcbiAgICBpZiAoIXRoaXMuY3VycmVudEltYWdlIHx8ICF0aGlzLmltYWdlcyB8fCB0aGlzLmltYWdlcy5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgbGV0IGltYWdlSW5kZXg6IG51bWJlcjtcbiAgICB0cnkge1xuICAgICAgaW1hZ2VJbmRleCA9IGdldEluZGV4KHRoaXMuY3VycmVudEltYWdlLCB0aGlzLmltYWdlcyk7XG4gICAgfSBjYXRjaCAoZXJyfgB7XG4gICAgICBjb25zb2xlLmVycm9yKGBJbnRlcm5hbCBlcnJvciB3aGlsZSB0cnlpbmcgdG8gc2hvdyB0aGUgYWN0aXZlICdkb3QnYCwgZXJyKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIGluZGV4ID09PSBpbWFnZUluZGV4O1xuICB9XG5cbiAgLyoqXG4gICAqIE1ldGhvZCBjYWxsZWQgYnkgZXZlbnRzIGZyb20ga2V5Ym9hcmQgYW5kIG1vdXNlLlxuICAgKiBAcGFyYW0gbnVtYmVyIGluZGV4IG9mIHRoZSBkb3RcbiAgICogQHBhcmFtIEtleWJvYXJkRXZlbnQgfCBNb3VzZUV2ZW50IGV2ZW50IHBheWxvYWRcbiAgICovXG4gIG9uRG90RXZlbnQoaW5kZXg6IG51bWJlciwgZXZlbnQ6IEtleWJvYXJkRXZlbnQgfCBNb3VzZUV2ZW50fgB7XG4gICAgY29uc3QgcmVzdWx0OiBudW1iZXIgPSBzdXBlci5oYW5kbGVJbWFnZUV2ZW50KGV2ZW50KTtcbiAgICBpZiAocmVzdWx0ID09PSBORVhUfgB7XG4gICAgICB0aGlzLmNsaWNrRG90LmVtaXQoaW5kZXgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBNZXRob2QgdXNlZCBpbiB0aGUgdGVtcGxhdGUgdG8gdHJhY2sgaWRzIGluIG5nRm9yLlxuICAgKiBAcGFyYW0gbnVtYmVyIGluZGV4IG9mIHRoZSBhcnJheVxuICAgKiBAcGFyYW0gSW1hZ2UgaXRlbSBvZiB0aGUgYXJyYXlcbiAgICogQHJldHVybnMgbnVtYmVyIHRoZSBpZCBvZiB0aGUgaXRlbVxuICAgKi9cbiAgdHJhY2tCeUlkKGluZGV4OiBudW1iZXIsIGl0ZW06IEltYWdlKTogbnVtYmVyIHtcbiAgICByZXR1cm4gaXRlbS5pZDtcbiAgfVxufVxuIl19