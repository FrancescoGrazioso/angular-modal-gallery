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
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DIRECTION_RIGHT, ENTER_KEY, MOUSE_MAIN_BUTTON_CLICK, NEXT, NOTHING, PREV, SPACE_KEY } from '../utils/user-input.util';
/**
 * Provides some useful methods to add accessibility features to subclasses.
 * In particular, it exposes a method to handle navigation event with both Keyboard and Mouse
 * and another with also the direction (right or left).
 */
var AccessibleComponent = /** @class */ (function () {
    function AccessibleComponent() {
    }
    /**
     * Method to handle navigation events with both Keyboard and Mouse.
     * @param string direction of the navigation that can be either 'next' or 'prev'
     * @param KeyboardEvent | MouseEvent event payload
     * @returns number -1 for PREV, 1 for NEXT and 0 for NOTHING
     */
    /**
     * Method to handle navigation events with both Keyboard and Mouse.
     * @param {?} direction
     * @param {?} event
     * @return {?} number -1 for PREV, 1 for NEXT and 0 for NOTHING
     */
    AccessibleComponent.prototype.handleNavigationEvent = /**
     * Method to handle navigation events with both Keyboard and Mouse.
     * @param {?} direction
     * @param {?} event
     * @return {?} number -1 for PREV, 1 for NEXT and 0 for NOTHING
     */
    function (direction, event) {
        if (!event) {
            return NOTHING;
        }
        if (event instanceof KeyboardEvent) {
            return this.handleKeyboardNavigationEvent(direction, event);
        }
        else if (event instanceof MouseEvent) {
            return this.handleMouseNavigationEvent(direction, event);
        }
        return NOTHING;
    };
    /**
     * Method to handle events over an image, for instance a keypress with the Keyboard or a Mouse click.
     * @param KeyboardEvent | MouseEvent event payload
     * @returns number 1 for NEXT and 0 for NOTHING
     */
    /**
     * Method to handle events over an image, for instance a keypress with the Keyboard or a Mouse click.
     * @param {?} event
     * @return {?} number 1 for NEXT and 0 for NOTHING
     */
    AccessibleComponent.prototype.handleImageEvent = /**
     * Method to handle events over an image, for instance a keypress with the Keyboard or a Mouse click.
     * @param {?} event
     * @return {?} number 1 for NEXT and 0 for NOTHING
     */
    function (event) {
        if (!event) {
            return NOTHING;
        }
        if (event instanceof KeyboardEvent) {
            return this.handleImageKeyboardEvent(event);
        }
        else if (event instanceof MouseEvent) {
            return this.handleImageMouseEvent(event);
        }
        return NOTHING;
    };
    /**
     * Private method to handle keyboard events over an image.
     * @param {?} event
     * @return {?} number 1 for NEXT and 0 for NOTHING
     */
    AccessibleComponent.prototype.handleImageKeyboardEvent = /**
     * Private method to handle keyboard events over an image.
     * @param {?} event
     * @return {?} number 1 for NEXT and 0 for NOTHING
     */
    function (event) {
        /** @type {?} */
        var key = event.keyCode;
        if (key === SPACE_KEY || key === ENTER_KEY) {
            return NEXT;
        }
        return NOTHING;
    };
    /**
     * Private method to handle mouse events over an image.
     * @param {?} event
     * @return {?} number 1 for NEXT and 0 for NOTHING
     */
    AccessibleComponent.prototype.handleImageMouseEvent = /**
     * Private method to handle mouse events over an image.
     * @param {?} event
     * @return {?} number 1 for NEXT and 0 for NOTHING
     */
    function (event) {
        /** @type {?} */
        var mouseBtn = event.button;
        if (mouseBtn === MOUSE_MAIN_BUTTON_CLICK) {
            return NEXT;
        }
        return NOTHING;
    };
    /**
     * Method to handle events over an image, for instance a keypress with the Keyboard or a Mouse click.
     * @param {?} direction
     * @param {?} event
     * @return {?} number -1 for PREV, 1 for NEXT and 0 for NOTHING
     */
    AccessibleComponent.prototype.handleKeyboardNavigationEvent = /**
     * Method to handle events over an image, for instance a keypress with the Keyboard or a Mouse click.
     * @param {?} direction
     * @param {?} event
     * @return {?} number -1 for PREV, 1 for NEXT and 0 for NOTHING
     */
    function (direction, event) {
        /** @type {?} */
        var key = event.keyCode;
        if (key === SPACE_KEY || key === ENTER_KEY) {
            return direction === DIRECTION_RIGHT ? NEXT : PREV;
        }
        return NOTHING;
    };
    /**
     * Method to handle events over an image, for instance a keypress with the Keyboard or a Mouse click.
     * @param {?} direction
     * @param {?} event
     * @return {?} number -1 for PREV, 1 for NEXT and 0 for NOTHING
     */
    AccessibleComponent.prototype.handleMouseNavigationEvent = /**
     * Method to handle events over an image, for instance a keypress with the Keyboard or a Mouse click.
     * @param {?} direction
     * @param {?} event
     * @return {?} number -1 for PREV, 1 for NEXT and 0 for NOTHING
     */
    function (direction, event) {
        /** @type {?} */
        var mouseBtn = event.button;
        if (mouseBtn === MOUSE_MAIN_BUTTON_CLICK) {
            return direction === DIRECTION_RIGHT ? NEXT : PREV;
        }
        return NOTHING;
    };
    AccessibleComponent.decorators = [
        { type: Component, args: [{
                    selector: 'fg-accessible',
                    template: "",
                    changeDetection: ChangeDetectionStrategy.OnPush
                }] }
    ];
    /** @nocollapse */
    AccessibleComponent.ctorParameters = function () { return []; };
    return AccessibleComponent;
}());
export { AccessibleComponent };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjZXNzaWJsZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9tb2RhbC1hbmd1bGFyLWdhbGxlcnkvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9hY2Nlc3NpYmxlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF3QkEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVuRSxPQUFPLEVBQUUsZUFBZSxFQUFFLFNBQVMsRUFBRSx1QkFBdUIsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLElBQUfgRUFBRSxTQUFTLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQzs7Ozs7OztJQWE3SDtLQUFnQjtJQUVoQjs7Ozs7T0FLRzs7Ozs7OztJQUNILG1EQUFxQjs7Ozs7O0lBQXJCLFVBQXNCLFNBQWlCLEVBQUUsS0FBaUM7UUFDeEUsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNWLE9BQU8sT0FBTyxDQUFDO1NBQ2hCO1FBQ0QsSUFBSSxLQUFLLFlBQVfgYUFBYSxFQUFFO1lBQ2xDLE9BQU8sSUFBSSxDQUFDLDZCQUE2QixDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUMsQ0FBQztTQUM3RDthQUFNLElBQUfgS0FBSyxZQUFZLFVBQVUsRUFBRTtZQUN0QyxPQUFPLElBQUfgQ0FBQywwQkFBMEIsQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDLENBQUM7U0FDMUQ7UUFDRCxPQUFPLE9BQU8sQ0FBQztLQUNoQjtJQUVEOzs7O09BSUc7Ozs7OztJQUNILDhDQUFnQjs7Ozs7SUFBaEIsVUFBaUIsS0FBaUM7UUFDaEQsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNWLE9BQU8sT0FBTyxDQUFDO1NBQ2hCO1FBQ0QsSUFBSSxLQUFLLFlBQVfgYUFBYSxFQUFFO1lBQ2xDLE9BQU8sSUFBSSxDQUFDLHdCQUF3QixDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQzdDO2FBQU0sSUFBSSxLQUFLLFlBQVfgVUFBVSxFQUFFO1lBQ3RDLE9BQU8sSUFBSSxDQUFDLHFCQUFxQixDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQzFDO1FBQ0QsT0FBTyxPQUFPLENBQUM7S0FDaEI7Ozs7OztJQU9PLHNEQUF3Qjs7Ozs7Y0FBQyxLQUFvQjs7UUFDbkQsSUFBTSxHQUFHLEdBQVcsS0FBSyxDQUFDLE9BQU8sQ0FBQztRQUNsQyxJQUFJLEdBQUcsS0FBSyxTQUFTLElBQUfgR0FBRyxLQUFLLFNBQVMsRUFBRTtZQUMxQyxPQUFPLElBQUfgQ0FBQztTQUNiO1FBQ0QsT0FBTyxPQUFPLENBQUM7Ozs7Ozs7SUFRVCxtREFBcUI7Ozs7O2NBQUMsS0FBaUI7O1FBQzdDLElBQU0sUUFBUSxHQUFXLEtBQUssQ0FBQyxNQUFNLENBQUM7UUFDdEMsSUFBSSxRQUFRLEtBQUssdUJBQXVCLEVBQUU7WUFDeEMsT0FBTyxJQUFJLENBQUM7U0FDYjtRQUNELE9BQU8sT0FBTyxDQUFDOzs7Ozs7OztJQVNULDJEQUE2Qjs7Ozs7O2NBQUMsU0FBaUIsRUFBRSxLQUFvQjs7UUFDM0UsSUFBTSxHQUFHLEdBQVcsS0FBSyxDQUFDLE9BQU8sQ0FBQztRQUNsQyxJQUFJLEdBQUcsS0FBSyxTQUFTLElBQUfgR0FBRyxLQUFLLFNBQVMsRUFBRTtZQUMxQyxPQUFPLFNBQVMsS0FBSyxlQUFlLENBQUMsQ0FBQyxDQUFDLElBQUfgQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1NBQ3BEO1FBQ0QsT0FBTyxPQUFPLENBQUM7Ozs7Ozs7O0lBU1Qsd0RBQTBCOzs7Ozs7Y0FBQyxTQUFpQixFQUFFLEtBQWlCOztRQUNyRSxJQUFNLFFBQVEsR0FBVyxLQUFLLENBQUMsTUFBTSxDQUFDO1FBQ3RDLElBQUfgUUFBUSxLQUFLLHVCQUF1QixFQUFFO1lBQ3hDLE9BQU8sU0FBUyxLQUFLLGVBQWUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7U0FDcEQ7UUFDRCxPQUFPLE9BQU8sQ0FBQzs7O2dCQTlGbEIsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxlQUFlO29CQUN6QixRQUFRLEVBQUUsRUFBRTtvQkFDWixlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtpQkFDaEQ7Ozs7OEJBckNEOztTQXNDYSxtQkFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuIFRoZSBNSVQgTGljZW5zZSAoTUlUKVxuXG4gQ29weXJpZ2h0IChjfgAyMDE3LTIwMTggU3RlZmFubyBDYXBwYSAoS3M4OSlcblxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbiBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuXG4gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsXG4gY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cblxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OIElORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEVcbiBTT0ZUV0FSRS5cbiAqL1xuXG5pbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IERJUkVDVElPTl9SSUdIVCwgRU5URVJfS0VZLCBNT1VTRV9NQUlOX0JVVFRPTl9DTElDSywgTkVYVCwgTk9USElORywgUFJFViwgU1BBQ0VfS0VZIH0gZnJvbSAnLi4vdXRpbHMvdXNlci1pbnB1dC51dGlsJztcblxuLyoqXG4gKiBQcm92aWRlcyBzb21lIHVzZWZ1bCBtZXRob2RzIHRvIGFkZCBhY2Nlc3NpYmlsaXR5IGZlYXR1cmVzIHRvIHN1YmNsYXNzZXMuXG4gKiBJbiBwYXJ0aWN1bGFyLCBpdCBleHBvc2VzIGEgbWV0aG9kIHRvIGhhbmRsZSBuYXZpZ2F0aW9uIGV2ZW50IHdpdGggYm90aCBLZXlib2FyZCBhbmQgTW91c2VcbiAqIGFuZCBhbm90aGVyIHdpdGggYWxzbyB0aGUgZGlyZWN0aW9uIChyaWdodCBvciBsZWZ0fg5cbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAna3MtYWNjZXNzaWJsZScsXG4gIHRlbXBsYXRlOiBgYCxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgQWNjZXNzaWJsZUNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKCkge31cblxuICAvKipcbiAgICogTWV0aG9kIHRvIGhhbmRsZSBuYXZpZ2F0aW9uIGV2ZW50cyB3aXRoIGJvdGggS2V5Ym9hcmQgYW5kIE1vdXNlLlxuICAgKiBAcGFyYW0gc3RyaW5nIGRpcmVjdGlvbiBvZiB0aGUgbmF2aWdhdGlvbiB0aGF0IGNhbiBiZSBlaXRoZXIgJ25leHQnIG9yICdwcmV2J1xuICAgKiBAcGFyYW0gS2V5Ym9hcmRFdmVudCB8IE1vdXNlRXZlbnQgZXZlbnQgcGF5bG9hZFxuICAgKiBAcmV0dXJucyBudW1iZXIgLTEgZm9yIFBSRVYsIDEgZm9yIE5FWFQgYW5kIDAgZm9yIE5PVEhJTkdcbiAgICovXG4gIGhhbmRsZU5hdmlnYXRpb25FdmVudChkaXJlY3Rpb246IHN0cmluZywgZXZlbnQ6IEtleWJvYXJkRXZlbnQgfCBNb3VzZUV2ZW50KTogbnVtYmVyIHtcbiAgICBpZiAoIWV2ZW50fgB7XG4gICAgICByZXR1cm4gTk9USElORztcbiAgICB9XG4gICAgaWYgKGV2ZW50IGluc3RhbmNlb2YgS2V5Ym9hcmRFdmVudCkge1xuICAgICAgcmV0dXJuIHRoaXMuaGFuZGxlS2V5Ym9hcmROYXZpZ2F0aW9uRXZlbnQoZGlyZWN0aW9uLCBldmVudCk7XG4gICAgfSBlbHNlIGlmIChldmVudCBpbnN0YW5jZW9mIE1vdXNlRXZlbnQpIHtcbiAgICAgIHJldHVybiB0aGlzLmhhbmRsZU1vdXNlTmF2aWdhdGlvbkV2ZW50KGRpcmVjdGlvbiwgZXZlbnQpO1xuICAgIH1cbiAgICByZXR1cm4gTk9USElORztcbiAgfVxuXG4gIC8qKlxuICAgKiBNZXRob2QgdG8gaGFuZGxlIGV2ZW50cyBvdmVyIGFuIGltYWdlLCBmb3IgaW5zdGFuY2UgYSBrZXlwcmVzcyB3aXRoIHRoZSBLZXlib2FyZCBvciBhIE1vdXNlIGNsaWNrLlxuICAgKiBAcGFyYW0gS2V5Ym9hcmRFdmVudCB8IE1vdXNlRXZlbnQgZXZlbnQgcGF5bG9hZFxuICAgKiBAcmV0dXJucyBudW1iZXIgMSBmb3IgTkVYVCBhbmQgMCBmb3IgTk9USElOR1xuICAgKi9cbiAgaGFuZGxlSW1hZ2VFdmVudChldmVudDogS2V5Ym9hcmRFdmVudCB8IE1vdXNlRXZlbnQpOiBudW1iZXIge1xuICAgIGlmICghZXZlbnQpIHtcbiAgICAgIHJldHVybiBOT1RISU5HO1xuICAgIH1cbiAgICBpZiAoZXZlbnQgaW5zdGFuY2VvZiBLZXlib2FyZEV2ZW50fgB7XG4gICAgICByZXR1cm4gdGhpcy5oYW5kbGVJbWFnZUtleWJvYXJkRXZlbnQoZXZlbnQpO1xuICAgIH0gZWxzZSBpZiAoZXZlbnQgaW5zdGFuY2VvZiBNb3VzZUV2ZW50fgB7XG4gICAgICByZXR1cm4gdGhpcy5oYW5kbGVJbWFnZU1vdXNlRXZlbnQoZXZlbnQpO1xuICAgIH1cbiAgICByZXR1cm4gTk9USElORztcbiAgfVxuXG4gIC8qKlxuICAgKiBQcml2YXRlIG1ldGhvZCB0byBoYW5kbGUga2V5Ym9hcmQgZXZlbnRzIG92ZXIgYW4gaW1hZ2UuXG4gICAqIEBwYXJhbSBLZXlib2FyZEV2ZW50IGV2ZW50IHBheWxvYWRcbiAgICogQHJldHVybnMgbnVtYmVyIDEgZm9yIE5FWFQgYW5kIDAgZm9yIE5PVEhJTkdcbiAgICovXG4gIHByaXZhdGUgaGFuZGxlSW1hZ2VLZXlib2FyZEV2ZW50KGV2ZW50OiBLZXlib2FyZEV2ZW50KTogbnVtYmVyIHtcbiAgICBjb25zdCBrZXk6IG51bWJlciA9IGV2ZW50LmtleUNvZGU7XG4gICAgaWYgKGtleSA9PT0gU1BBQ0VfS0VZIHx8IGtleSA9PT0gRU5URVJfS0VZfgB7XG4gICAgICByZXR1cm4gTkVYVDtcbiAgICB9XG4gICAgcmV0dXJuIE5PVEhJTkc7XG4gIH1cblxuICAvKipcbiAgICogUHJpdmF0ZSBtZXRob2QgdG8gaGFuZGxlIG1vdXNlIGV2ZW50cyBvdmVyIGFuIGltYWdlLlxuICAgKiBAcGFyYW0gTW91c2VFdmVudCBldmVudCBwYXlsb2FkXG4gICAqIEByZXR1cm5zIG51bWJlciAxIGZvciBORVhUIGFuZCAwIGZvciBOT1RISU5HXG4gICAqL1xuICBwcml2YXRlIGhhbmRsZUltYWdlTW91c2VFdmVudChldmVudDogTW91c2VFdmVudCk6IG51bWJlciB7XG4gICAgY29uc3QgbW91c2VCdG46IG51bWJlciA9IGV2ZW50LmJ1dHRvbjtcbiAgICBpZiAobW91c2VCdG4gPT09IE1PVVNFX01BSU5fQlVUVE9OX0NMSUNLfgB7XG4gICAgICByZXR1cm4gTkVYVDtcbiAgICB9XG4gICAgcmV0dXJuIE5PVEhJTkc7XG4gIH1cblxuICAvKipcbiAgICogTWV0aG9kIHRvIGhhbmRsZSBldmVudHMgb3ZlciBhbiBpbWFnZSwgZm9yIGluc3RhbmNlIGEga2V5cHJlc3Mgd2l0aCB0aGUgS2V5Ym9hcmQgb3IgYSBNb3VzZSBjbGljay5cbiAgICogQHBhcmFtIHN0cmluZyBkaXJlY3Rpb24gb2YgdGhlIG5hdmlnYXRpb24gdGhhdCBjYW4gYmUgZWl0aGVyICduZXh0JyBvciAncHJldidcbiAgICogQHBhcmFtIEtleWJvYXJkRXZlbnQgZXZlbnQgcGF5bG9hZFxuICAgKiBAcmV0dXJucyBudW1iZXIgLTEgZm9yIFBSRVYsIDEgZm9yIE5FWFQgYW5kIDAgZm9yIE5PVEhJTkdcbiAgICovXG4gIHByaXZhdGUgaGFuZGxlS2V5Ym9hcmROYXZpZ2F0aW9uRXZlbnQoZGlyZWN0aW9uOiBzdHJpbmcsIGV2ZW50OiBLZXlib2FyZEV2ZW50KTogbnVtYmVyIHtcbiAgICBjb25zdCBrZXk6IG51bWJlciA9IGV2ZW50LmtleUNvZGU7XG4gICAgaWYgKGtleSA9PT0gU1BBQ0VfS0VZIHx8IGtleSA9PT0gRU5URVJfS0VZfgB7XG4gICAgICByZXR1cm4gZGlyZWN0aW9uID09PSBESVJFQ1RJT05fUklHSFQgPyBORVhUIDogUFJFVjtcbiAgICB9XG4gICAgcmV0dXJuIE5PVEhJTkc7XG4gIH1cblxuICAvKipcbiAgICogTWV0aG9kIHRvIGhhbmRsZSBldmVudHMgb3ZlciBhbiBpbWFnZSwgZm9yIGluc3RhbmNlIGEga2V5cHJlc3Mgd2l0aCB0aGUgS2V5Ym9hcmQgb3IgYSBNb3VzZSBjbGljay5cbiAgICogQHBhcmFtIHN0cmluZyBkaXJlY3Rpb24gb2YgdGhlIG5hdmlnYXRpb24gdGhhdCBjYW4gYmUgZWl0aGVyICduZXh0JyBvciAncHJldidcbiAgICogQHBhcmFtIE1vdXNlRXZlbnQgZXZlbnQgcGF5bG9hZFxuICAgKiBAcmV0dXJucyBudW1iZXIgLTEgZm9yIFBSRVYsIDEgZm9yIE5FWFQgYW5kIDAgZm9yIE5PVEhJTkdcbiAgICovXG4gIHByaXZhdGUgaGFuZGxlTW91c2VOYXZpZ2F0aW9uRXZlbnQoZGlyZWN0aW9uOiBzdHJpbmcsIGV2ZW50OiBNb3VzZUV2ZW50KTogbnVtYmVyIHtcbiAgICBjb25zdCBtb3VzZUJ0bjogbnVtYmVyID0gZXZlbnQuYnV0dG9uO1xuICAgIGlmIChtb3VzZUJ0biA9PT0gTU9VU0VfTUFJTl9CVVRUT05fQ0xJQ0spIHtcbiAgICAgIHJldHVybiBkaXJlY3Rpb24gPT09IERJUkVDVElPTl9SSUdIVCA/IE5FWFQgOiBQUkVWO1xuICAgIH1cbiAgICByZXR1cm4gTk9USElORztcbiAgfVxufVxuIl19