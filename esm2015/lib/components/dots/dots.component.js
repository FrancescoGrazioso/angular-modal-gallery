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
import { InternalLibImage } from '../../model/image-internal.class';
import { NEXT } from '../../utils/user-input.util';
import { getIndex } from '../../utils/image.util';
/**
 * Component with clickable dots (small circles) to navigate between images inside the modal gallery.
 */
export class DotsComponent extends AccessibleComponent {
    constructor() {
        super(...arguments);
        /**
         * Object of type `DotsConfig` to init DotsComponent's features.
         * For instance, it contains a param to show/hide this component.
         */
        this.dotsConfig = { visible: true };
        /**
         * Output to emit clicfg on dots. The payload contains a number that represent
         * the index of the clicked dot.
         */
        this.clickDot = new EventEmitter();
    }
    /**
     * Method ´ngOnInit´ to build `configDots` applying a default value.
     * This is an Angular's lifecycle hook, so its called automatically by Angular itself.
     * In particular, it's called only one time!!!
     * @return {?}
     */
    ngOnInit() {
        /** @type {?} */
        const defaultConfig = { visible: true };
        this.configDots = Object.assign(defaultConfig, this.dotsConfig);
    }
    /**
     * Method to check if an image is active (i.e. the current image).
     * It checfg currentImage and images to prevent errors.
     * @param {?} index
     * @return {?} boolean true if is active (and input params are valid), false otherwise
     */
    isActive(index) {
        if (!this.currentImage || !this.images || this.images.length === 0) {
            return false;
        }
        /** @type {?} */
        let imageIndex;
        try {
            imageIndex = getIndex(this.currentImage, this.images);
        }
        catch (err) {
            console.error(`Internal error while trying to show the active 'dot'`, err);
            return false;
        }
        return index === imageIndex;
    }
    /**
     * Method called by events from keyboard and mouse.
     * @param {?} index
     * @param {?} event
     * @return {?}
     */
    onDotEvent(index, event) {
        /** @type {?} */
        const result = super.handleImageEvent(event);
        if (result === NEXT) {
            this.clickDot.emit(index);
        }
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
}
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG90cy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9tb2RhbC1hbmd1bGFyLWdhbGxlcnkvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9kb3RzL2RvdHMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXdCQSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLFlBQVfgRUFBRSxLQUFLLEVBQVUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXhHLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBSTlELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBR3BFLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUNuRCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7Ozs7QUFXbEQsTUFBTSxvQkFBcUIsU0FBUSxtQkFBbUI7Ozs7Ozs7MEJBY2xCLEVBQUUsT0FBTyxFQUFFLElBQUfgRUFBRTs7Ozs7d0JBVVIsSUFBSSxZQUFZLEVBQVU7Ozs7Ozs7O0lBYXJFLFFBQVE7O1FBQ04sTUFBTSxhQUFhLEdBQWUsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUM7UUFDcEQsSUFBSSxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7S0FDakU7Ozs7Ozs7SUFRRCxRQUFRLENBQUMsS0FBYTtRQUNwQixJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVfgSUFBSSxDQUFDLElBQUfgQ0FBQyxNQUFNLElBQUfgSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1lBQ2xFLE9BQU8sS0FBSyxDQUFDO1NBQ2Q7O1FBQ0QsSUFBSSxVQUFVLENBQVM7UUFDdkIsSUFBSTtZQUNGLFVBQVUsR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLFlBQVfgRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDdkQ7UUFBQyxPQUFPLEdBQUcsRUFBRTtZQUNaLE9BQU8sQ0FBQyxLQUFLLENBQUMsc0RBQXNELEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDM0UsT0FBTyxLQUFLLENBQUM7U0FDZDtRQUNELE9BQU8sS0FBSyxLQUFLLFVBQVUsQ0FBQztLQUM3Qjs7Ozs7OztJQU9ELFVBQVUsQ0FBQyxLQUFhLEVBQUUsS0FBaUM7O1FBQ3pELE1BQU0sTUFBTSxHQUFXLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNyRCxJQUFJLE1BQU0sS0FBSyxJQUFJLEVBQUU7WUFDbkIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDM0I7S0FDRjs7Ozs7OztJQVFELFNBQVMsQ0FBQyxLQUFhLEVBQUUsSUFBVztRQUNsQyxPQUFPLElBQUfgQ0FBQyxFQUFFLENBQUM7S0FDaEI7OztZQXhGRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLFNBQVM7Z0JBRW5CLHFvQkFBd0I7Z0JBQ3hCLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOzthQUNoRDs7OzJCQUtFLEtBQUs7cUJBS0wsS0FBSzt5QkFLTCxLQUFLO2tDQUtMLEtBQUs7dUJBS0wsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gVGhlIE1JVCBMaWNlbnNlIChNSVQpXG5cbiBDb3B5cmlnaHQgKGMpIDIwMTctMjAxOCBTdGVmYW5vIENhcHBhIChLczg5KVxuXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIifgIHRvIGRlYWxcbiBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4gdG8gdXNlLCBjb3B5LCBtb2RpZnfgIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG5cbiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBhbGxcbiBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT04gSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRVxuIFNPRlRXQVJFLlxuICovXG5cbmltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uSW5pdCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IEFjY2Vzc2libGVDb21wb25lbnQgfSBmcm9tICcuLi9hY2Nlc3NpYmxlLmNvbXBvbmVudCc7XG5cbmltcG9ydCB7IEFjY2Vzc2liaWxpdHlDb25maWcgfSBmcm9tICcuLi8uLi9tb2RlbC9hY2Nlc3NpYmlsaXR5LmludGVyZmFjZSc7XG5pbXBvcnQgeyBJbWFnZSB9IGZyb20gJy4uLy4uL21vZGVsL2ltYWdlLmNsYXNzJztcbmltcG9ydCB7IEludGVybmFsTGliSW1hZ2UgfSBmcm9tICcuLi8uLi9tb2RlbC9pbWFnZS1pbnRlcm5hbC5jbGFzcyc7XG5pbXBvcnQgeyBEb3RzQ29uZmlnIH0gZnJvbSAnLi4vLi4vbW9kZWwvZG90cy1jb25maWcuaW50ZXJmYWNlJztcblxuaW1wb3J0IHsgTkVYVCB9IGZyb20gJy4uLy4uL3V0aWxzL3VzZXItaW5wdXQudXRpbCc7XG5pbXBvcnQgeyBnZXRJbmRleCB9IGZyb20gJy4uLy4uL3V0aWxzL2ltYWdlLnV0aWwnO1xuXG4vKipcbiAqIENvbXBvbmVudCB3aXRoIGNsaWNrYWJsZSBkb3RzIChzbWFsbCBjaXJjbGVzfgB0byBuYXZpZ2F0ZSBiZXR3ZWVuIGltYWdlcyBpbnNpZGUgdGhlIG1vZGFsIGdhbGxlcnkuXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2tzLWRvdHMnLFxuICBzdHlsZVVybHM6IFsnZG90cy5zY3NzJ10sXG4gIHRlbXBsYXRlVXJsOiAnZG90cy5odG1sJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgRG90c0NvbXBvbmVudCBleHRlbmRzIEFjY2Vzc2libGVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAvKipcbiAgICogT2JqZWN0IG9mIHR5cGUgYEludGVybmFsTGliSW1hZ2VgIHRoYXQgcmVwcmVzZW50IHRoZSB2aXNpYmxlIGltYWdlLlxuICAgKi9cbiAgQElucHV0KCkgY3VycmVudEltYWdlOiBJbnRlcm5hbExpYkltYWdlO1xuICAvKipcbiAgICogQXJyYXkgb2YgYEludGVybmFsTGliSW1hZ2VgIHRoYXQgcmVwcmVzZW50IHRoZSBtb2RlbCBvZiB0aGlzIGxpYnJhcnkgd2l0aCBhbGwgaW1hZ2VzLFxuICAgKiB0aHVtYnMgYW5kIHNvIG9uLlxuICAgKi9cbiAgQElucHV0KCkgaW1hZ2VzOiBJbnRlcm5hbExpYkltYWdlW107XG4gIC8qKlxuICAgKiBPYmplY3Qgb2YgdHlwZSBgRG90c0NvbmZpZ2AgdG8gaW5pdCBEb3RzQ29tcG9uZW50J3MgZmVhdHVyZXMuXG4gICAqIEZvciBpbnN0YW5jZSwgaXQgY29udGFpbnMgYSBwYXJhbSB0byBzaG93L2hpZGUgdGhpcyBjb21wb25lbnQuXG4gICAqL1xuICBASW5wdXQofgBkb3RzQ29uZmlnOiBEb3RzQ29uZmlnID0geyB2aXNpYmxlOiB0cnVlIH07XG4gIC8qKlxuICAgKiBPYmplY3Qgb2YgdHlwZSBgQWNjZXNzaWJpbGl0eUNvbmZpZ2AgdG8gaW5pdCBjdXN0b20gYWNjZXNzaWJpbGl0eSBmZWF0dXJlcy5cbiAgICogRm9yIGluc3RhbmNlLCBpdCBjb250YWlucyB0aXRsZXMsIGFsdCB0ZXh0cywgYXJpYS1sYWJlbHMgYW5kIHNvIG9uLlxuICAgKi9cbiAgQElucHV0KCkgYWNjZXNzaWJpbGl0eUNvbmZpZzogQWNjZXNzaWJpbGl0eUNvbmZpZztcbiAgLyoqXG4gICAqIE91dHB1dCB0byBlbWl0IGNsaWNrcyBvbiBkb3RzLiBUaGUgcGF5bG9hZCBjb250YWlucyBhIG51bWJlciB0aGF0IHJlcHJlc2VudFxuICAgKiB0aGUgaW5kZXggb2YgdGhlIGNsaWNrZWQgZG90LlxuICAgKi9cbiAgQE91dHB1dCgpIGNsaWNrRG90OiBFdmVudEVtaXR0ZXI8bnVtYmVyPiA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyPigpO1xuXG4gIC8qKlxuICAgKiBPYmplY3Qgb2YgdHlwZSBgRG90c0NvbmZpZ2AgZXhwb3NlZCB0byB0aGUgdGVtcGxhdGUuIFRoaXMgZmllbGQgaXMgaW5pdGlhbGl6ZWRcbiAgICogYXBwbHlpbmcgdHJhbnNmb3JtYXRpb25zLCBkZWZhdWx0IHZhbHVlcyBhbmQgc28gb24gdG8gdGhlIGlucHV0IG9mIHRoZSBzYW1lIHR5cGUuXG4gICAqL1xuICBjb25maWdEb3RzOiBEb3RzQ29uZmlnO1xuXG4gIC8qKlxuICAgKiBNZXRob2QgwrRuZ09uSW5pdMK0IHRvIGJ1aWxkIGBjb25maWdEb3RzYCBhcHBseWluZyBhIGRlZmF1bHQgdmFsdWUuXG4gICAqIFRoaXMgaXMgYW4gQW5ndWxhcidzIGxpZmVjeWNsZSBob29rLCBzbyBpdHMgY2FsbGVkIGF1dG9tYXRpY2FsbHkgYnkgQW5ndWxhciBpdHNlbGYuXG4gICAqIEluIHBhcnRpY3VsYXIsIGl0J3MgY2FsbGVkIG9ubHkgb25lIHRpbWUhISFcbiAgICovXG4gIG5nT25Jbml0KCkge1xuICAgIGNvbnN0IGRlZmF1bHRDb25maWc6IERvdHNDb25maWcgPSB7IHZpc2libGU6IHRydWUgfTtcbiAgICB0aGlzLmNvbmZpZ0RvdHMgPSBPYmplY3QuYXNzaWduKGRlZmF1bHRDb25maWcsIHRoaXMuZG90c0NvbmZpZyk7XG4gIH1cblxuICAvKipcbiAgICogTWV0aG9kIHRvIGNoZWNrIGlmIGFuIGltYWdlIGlzIGFjdGl2ZSAoaS5lLiB0aGUgY3VycmVudCBpbWFnZSkuXG4gICAqIEl0IGNoZWNrcyBjdXJyZW50SW1hZ2UgYW5kIGltYWdlcyB0byBwcmV2ZW50IGVycm9ycy5cbiAgICogQHBhcmFtIG51bWJlciBpbmRleCBvZiB0aGUgaW1hZ2UgdG8gY2hlY2sgaWYgaXQncyBhY3RpdmUgb3Igbm90XG4gICAqIEByZXR1cm5zIGJvb2xlYW4gdHJ1ZSBpZiBpcyBhY3RpdmUgKGFuZCBpbnB1dCBwYXJhbXMgYXJlIHZhbGlkfgwgZmFsc2Ugb3RoZXJ3aXNlXG4gICAqL1xuICBpc0FjdGl2ZShpbmRleDogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgaWYgKCF0aGlzLmN1cnJlbnRJbWFnZSB8fCAhdGhpcy5pbWFnZXMgfHwgdGhpcy5pbWFnZXMubGVuZ3RoID09PSAwfgB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGxldCBpbWFnZUluZGV4OiBudW1iZXI7XG4gICAgdHJ5IHtcbiAgICAgIGltYWdlSW5kZXggPSBnZXRJbmRleCh0aGlzLmN1cnJlbnRJbWFnZSwgdGhpcy5pbWFnZXMpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgY29uc29sZS5lcnJvcihgSW50ZXJuYWwgZXJyb3Igd2hpbGUgdHJ5aW5nIHRvIHNob3cgdGhlIGFjdGl2ZSAnZG90J2AsIGVycik7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiBpbmRleCA9PT0gaW1hZ2VJbmRleDtcbiAgfVxuXG4gIC8qKlxuICAgKiBNZXRob2QgY2FsbGVkIGJ5IGV2ZW50cyBmcm9tIGtleWJvYXJkIGFuZCBtb3VzZS5cbiAgICogQHBhcmFtIG51bWJlciBpbmRleCBvZiB0aGUgZG90XG4gICAqIEBwYXJhbSBLZXlib2FyZEV2ZW50IHwgTW91c2VFdmVudCBldmVudCBwYXlsb2FkXG4gICAqL1xuICBvbkRvdEV2ZW50KGluZGV4OiBudW1iZXIsIGV2ZW50OiBLZXlib2FyZEV2ZW50IHwgTW91c2VFdmVudCkge1xuICAgIGNvbnN0IHJlc3VsdDogbnVtYmVyID0gc3VwZXIuaGFuZGxlSW1hZ2VFdmVudChldmVudCk7XG4gICAgaWYgKHJlc3VsdCA9PT0gTkVYVCkge1xuICAgICAgdGhpcy5jbGlja0RvdC5lbWl0KGluZGV4KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogTWV0aG9kIHVzZWQgaW4gdGhlIHRlbXBsYXRlIHRvIHRyYWNrIGlkcyBpbiBuZ0Zvci5cbiAgICogQHBhcmFtIG51bWJlciBpbmRleCBvZiB0aGUgYXJyYXlcbiAgICogQHBhcmFtIEltYWdlIGl0ZW0gb2YgdGhlIGFycmF5XG4gICAqIEByZXR1cm5zIG51bWJlciB0aGUgaWQgb2YgdGhlIGl0ZW1cbiAgICovXG4gIHRyYWNrQnlJZChpbmRleDogbnVtYmVyLCBpdGVtOiBJbWFnZSk6IG51bWJlciB7XG4gICAgcmV0dXJuIGl0ZW0uaWQ7XG4gIH1cbn1cbiJdfQ==