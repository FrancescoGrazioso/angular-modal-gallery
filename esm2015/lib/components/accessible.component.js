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
export class AccessibleComponent {
    constructor() { }
    /**
     * Method to handle navigation events with both Keyboard and Mouse.
     * @param {?} direction
     * @param {?} event
     * @return {?} number -1 for PREV, 1 for NEXT and 0 for NOTHING
     */
    handleNavigationEvent(direction, event) {
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
    }
    /**
     * Method to handle events over an image, for instance a keypress with the Keyboard or a Mouse click.
     * @param {?} event
     * @return {?} number 1 for NEXT and 0 for NOTHING
     */
    handleImageEvent(event) {
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
    }
    /**
     * Private method to handle keyboard events over an image.
     * @param {?} event
     * @return {?} number 1 for NEXT and 0 for NOTHING
     */
    handleImageKeyboardEvent(event) {
        /** @type {?} */
        const key = event.keyCode;
        if (key === SPACE_KEY || key === ENTER_KEY) {
            return NEXT;
        }
        return NOTHING;
    }
    /**
     * Private method to handle mouse events over an image.
     * @param {?} event
     * @return {?} number 1 for NEXT and 0 for NOTHING
     */
    handleImageMouseEvent(event) {
        /** @type {?} */
        const mouseBtn = event.button;
        if (mouseBtn === MOUSE_MAIN_BUTTON_CLICK) {
            return NEXT;
        }
        return NOTHING;
    }
    /**
     * Method to handle events over an image, for instance a keypress with the Keyboard or a Mouse click.
     * @param {?} direction
     * @param {?} event
     * @return {?} number -1 for PREV, 1 for NEXT and 0 for NOTHING
     */
    handleKeyboardNavigationEvent(direction, event) {
        /** @type {?} */
        const key = event.keyCode;
        if (key === SPACE_KEY || key === ENTER_KEY) {
            return direction === DIRECTION_RIGHT ? NEXT : PREV;
        }
        return NOTHING;
    }
    /**
     * Method to handle events over an image, for instance a keypress with the Keyboard or a Mouse click.
     * @param {?} direction
     * @param {?} event
     * @return {?} number -1 for PREV, 1 for NEXT and 0 for NOTHING
     */
    handleMouseNavigationEvent(direction, event) {
        /** @type {?} */
        const mouseBtn = event.button;
        if (mouseBtn === MOUSE_MAIN_BUTTON_CLICK) {
            return direction === DIRECTION_RIGHT ? NEXT : PREV;
        }
        return NOTHING;
    }
}
AccessibleComponent.decorators = [
    { type: Component, args: [{
                selector: 'fg-accessible',
                template: ``,
                changeDetection: ChangeDetectionStrategy.OnPush
            }] }
];
/** @nocollapse */
AccessibleComponent.ctorParameters = () => [];

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjZXNzaWJsZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9tb2RhbC1hbmd1bGFyLWdhbGxlcnkvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9hY2Nlc3NpYmxlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF3QkEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVuRSxPQUFPLEVBQUUsZUFBZSxFQUFFLFNBQVMsRUFBRSx1QkFBdUIsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLElBQUfgRUFBRSxTQUFTLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQzs7Ozs7O0FBWS9ILE1BQU07SUFDSixpQkFBZ0I7Ozs7Ozs7SUFRaEIscUJBQXFCLENBQUMsU0FBaUIsRUFBRSxLQUFpQztRQUN4RSxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ1YsT0FBTyxPQUFPLENBQUM7U0FDaEI7UUFDRCxJQUFJLEtBQUssWUFBWSxhQUFhLEVBQUU7WUFDbEMsT0FBTyxJQUFJLENBQUMsNkJBQTZCLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQyxDQUFDO1NBQzdEO2FBQU0sSUFBSSxLQUFLLFlBQVfgVUFBVSxFQUFFO1lBQ3RDLE9BQU8sSUFBSSxDQUFDLDBCQUEwQixDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUMsQ0FBQztTQUMxRDtRQUNELE9BQU8sT0FBTyxDQUFDO0tBQ2hCOzs7Ozs7SUFPRCxnQkFBZ0IsQ0FBQyxLQUFpQztRQUNoRCxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ1YsT0FBTyxPQUFPLENBQUM7U0FDaEI7UUFDRCxJQUFJLEtBQUssWUFBWSxhQUFhLEVBQUU7WUFDbEMsT0FBTyxJQUFJLENBQUMsd0JBQXdCLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDN0M7YUFBTSxJQUFJLEtBQUssWUFBWSxVQUFVLEVBQUU7WUFDdEMsT0FBTyxJQUFJLENBQUMscUJBQXFCLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDMUM7UUFDRCxPQUFPLE9BQU8sQ0FBQztLQUNoQjs7Ozs7O0lBT08sd0JBQXdCLENBQUMsS0FBb0I7O1FBQ25ELE1BQU0sR0FBRyxHQUFXLEtBQUssQ0FBQyxPQUFPLENBQUM7UUFDbEMsSUFBSSxHQUFHLEtBQUssU0FBUyxJQUFJLEdBQUcsS0FBSyxTQUFTLEVBQUU7WUFDMUMsT0FBTyxJQUFJLENBQUM7U0FDYjtRQUNELE9BQU8sT0FBTyxDQUFDOzs7Ozs7O0lBUVQscUJBQXFCLENBQUMsS0FBaUI7O1FBQzdDLE1BQU0sUUFBUSxHQUFXLEtBQUssQ0FBQyxNQUFNLENBQUM7UUFDdEMsSUFBSSxRQUFRLEtBQUssdUJBQXVCLEVBQUU7WUFDeEMsT0FBTyxJQUFJLENBQUM7U0FDYjtRQUNELE9BQU8sT0FBTyxDQUFDOzs7Ozs7OztJQVNULDZCQUE2QixDQUFDLFNBQWlCLEVBQUUsS0FBb0I7O1FBQzNFLE1BQU0sR0FBRyxHQUFXLEtBQUssQ0FBQyxPQUFPLENBQUM7UUFDbEMsSUFBSSxHQUFHLEtBQUssU0FBUyxJQUFJLEdBQUcsS0FBSyxTQUFTLEVBQUU7WUFDMUMsT0FBTyxTQUFTLEtBQUssZUFBZSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUfgQ0FBQztTQUNwRDtRQUNELE9BQU8sT0FBTyxDQUFDOzs7Ozs7OztJQVNULDBCQUEwQixDQUFDLFNBQWlCLEVBQUUsS0FBaUI7O1FBQ3JFLE1BQU0sUUFBUSxHQUFXLEtBQUssQ0FBQyxNQUFNLENBQUM7UUFDdEMsSUFBSSxRQUFRLEtBQUssdUJBQXVCLEVBQUU7WUFDeEMsT0FBTyxTQUFTLEtBQUssZUFBZSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUfgQ0FBQztTQUNwRDtRQUNELE9BQU8sT0FBTyxDQUFDOzs7O1lBOUZsQixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGVBQWU7Z0JBQ3pCLFFBQVEsRUFBRSxFQUFFO2dCQUNaLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2FBQ2hEIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiBUaGUgTUlUIExpY2Vuc2UgKE1JVClcblxuIENvcHlyaWdodCAoYykgMjAxNy0yMDE4IFN0ZWZhbm8gQ2FwcGEgKEtzODkpXG5cbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwifgwgdG8gZGVhbFxuIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbiB0byB1c2UsIGNvcHfgIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcblxuIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIGFsbFxuIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG5cbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFfgXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTiBJTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiBMSUFCSUxJVFfgIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFXG4gU09GVFdBUkUuXG4gKi9cblxuaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3fgIENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBESVJFQ1RJT05fUklHSFQsIEVOVEVSX0tFWSwgTU9VU0VfTUFJTl9CVVRUT05fQ0xJQ0ssIE5FWFQsIE5PVEhJTkcsIFBSRVYsIFNQQUNFX0tFWSB9IGZyb20gJy4uL3V0aWxzL3VzZXItaW5wdXQudXRpbCc7XG5cbi8qKlxuICogUHJvdmlkZXMgc29tZSB1c2VmdWwgbWV0aG9kcyB0byBhZGQgYWNjZXNzaWJpbGl0eSBmZWF0dXJlcyB0byBzdWJjbGFzc2VzLlxuICogSW4gcGFydGljdWxhciwgaXQgZXhwb3NlcyBhIG1ldGhvZCB0byBoYW5kbGUgbmF2aWdhdGlvbiBldmVudCB3aXRoIGJvdGggS2V5Ym9hcmQgYW5kIE1vdXNlXG4gKiBhbmQgYW5vdGhlciB3aXRoIGFsc28gdGhlIGRpcmVjdGlvbiAocmlnaHQgb3IgbGVmdCkuXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2tzLWFjY2Vzc2libGUnLFxuICB0ZW1wbGF0ZTogYGAsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIEFjY2Vzc2libGVDb21wb25lbnQge1xuICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgLyoqXG4gICAqIE1ldGhvZCB0byBoYW5kbGUgbmF2aWdhdGlvbiBldmVudHMgd2l0aCBib3RoIEtleWJvYXJkIGFuZCBNb3VzZS5cbiAgICogQHBhcmFtIHN0cmluZyBkaXJlY3Rpb24gb2YgdGhlIG5hdmlnYXRpb24gdGhhdCBjYW4gYmUgZWl0aGVyICduZXh0JyBvciAncHJldidcbiAgICogQHBhcmFtIEtleWJvYXJkRXZlbnQgfCBNb3VzZUV2ZW50IGV2ZW50IHBheWxvYWRcbiAgICogQHJldHVybnMgbnVtYmVyIC0xIGZvciBQUkVWLCAxIGZvciBORVhUIGFuZCAwIGZvciBOT1RISU5HXG4gICAqL1xuICBoYW5kbGVOYXZpZ2F0aW9uRXZlbnQoZGlyZWN0aW9uOiBzdHJpbmcsIGV2ZW50OiBLZXlib2FyZEV2ZW50IHwgTW91c2VFdmVudCk6IG51bWJlciB7XG4gICAgaWYgKCFldmVudCkge1xuICAgICAgcmV0dXJuIE5PVEhJTkc7XG4gICAgfVxuICAgIGlmIChldmVudCBpbnN0YW5jZW9mIEtleWJvYXJkRXZlbnQpIHtcbiAgICAgIHJldHVybiB0aGlzLmhhbmRsZUtleWJvYXJkTmF2aWdhdGlvbkV2ZW50KGRpcmVjdGlvbiwgZXZlbnQpO1xuICAgIH0gZWxzZSBpZiAoZXZlbnQgaW5zdGFuY2VvZiBNb3VzZUV2ZW50fgB7XG4gICAgICByZXR1cm4gdGhpcy5oYW5kbGVNb3VzZU5hdmlnYXRpb25FdmVudChkaXJlY3Rpb24sIGV2ZW50KTtcbiAgICB9XG4gICAgcmV0dXJuIE5PVEhJTkc7XG4gIH1cblxuICAvKipcbiAgICogTWV0aG9kIHRvIGhhbmRsZSBldmVudHMgb3ZlciBhbiBpbWFnZSwgZm9yIGluc3RhbmNlIGEga2V5cHJlc3Mgd2l0aCB0aGUgS2V5Ym9hcmQgb3IgYSBNb3VzZSBjbGljay5cbiAgICogQHBhcmFtIEtleWJvYXJkRXZlbnQgfCBNb3VzZUV2ZW50IGV2ZW50IHBheWxvYWRcbiAgICogQHJldHVybnMgbnVtYmVyIDEgZm9yIE5FWFQgYW5kIDAgZm9yIE5PVEhJTkdcbiAgICovXG4gIGhhbmRsZUltYWdlRXZlbnQoZXZlbnQ6IEtleWJvYXJkRXZlbnQgfCBNb3VzZUV2ZW50KTogbnVtYmVyIHtcbiAgICBpZiAoIWV2ZW50fgB7XG4gICAgICByZXR1cm4gTk9USElORztcbiAgICB9XG4gICAgaWYgKGV2ZW50IGluc3RhbmNlb2YgS2V5Ym9hcmRFdmVudCkge1xuICAgICAgcmV0dXJuIHRoaXMuaGFuZGxlSW1hZ2VLZXlib2FyZEV2ZW50KGV2ZW50KTtcbiAgICB9IGVsc2UgaWYgKGV2ZW50IGluc3RhbmNlb2YgTW91c2VFdmVudCkge1xuICAgICAgcmV0dXJuIHRoaXMuaGFuZGxlSW1hZ2VNb3VzZUV2ZW50KGV2ZW50KTtcbiAgICB9XG4gICAgcmV0dXJuIE5PVEhJTkc7XG4gIH1cblxuICAvKipcbiAgICogUHJpdmF0ZSBtZXRob2QgdG8gaGFuZGxlIGtleWJvYXJkIGV2ZW50cyBvdmVyIGFuIGltYWdlLlxuICAgKiBAcGFyYW0gS2V5Ym9hcmRFdmVudCBldmVudCBwYXlsb2FkXG4gICAqIEByZXR1cm5zIG51bWJlciAxIGZvciBORVhUIGFuZCAwIGZvciBOT1RISU5HXG4gICAqL1xuICBwcml2YXRlIGhhbmRsZUltYWdlS2V5Ym9hcmRFdmVudChldmVudDogS2V5Ym9hcmRFdmVudCk6IG51bWJlciB7XG4gICAgY29uc3Qga2V5OiBudW1iZXIgPSBldmVudC5rZXlDb2RlO1xuICAgIGlmIChrZXkgPT09IFNQQUNFX0tFWSB8fCBrZXkgPT09IEVOVEVSX0tFWSkge1xuICAgICAgcmV0dXJuIE5FWFQ7XG4gICAgfVxuICAgIHJldHVybiBOT1RISU5HO1xuICB9XG5cbiAgLyoqXG4gICAqIFByaXZhdGUgbWV0aG9kIHRvIGhhbmRsZSBtb3VzZSBldmVudHMgb3ZlciBhbiBpbWFnZS5cbiAgICogQHBhcmFtIE1vdXNlRXZlbnQgZXZlbnQgcGF5bG9hZFxuICAgKiBAcmV0dXJucyBudW1iZXIgMSBmb3IgTkVYVCBhbmQgMCBmb3IgTk9USElOR1xuICAgKi9cbiAgcHJpdmF0ZSBoYW5kbGVJbWFnZU1vdXNlRXZlbnQoZXZlbnQ6IE1vdXNlRXZlbnQpOiBudW1iZXIge1xuICAgIGNvbnN0IG1vdXNlQnRuOiBudW1iZXIgPSBldmVudC5idXR0b247XG4gICAgaWYgKG1vdXNlQnRuID09PSBNT1VTRV9NQUlOX0JVVFRPTl9DTElDSykge1xuICAgICAgcmV0dXJuIE5FWFQ7XG4gICAgfVxuICAgIHJldHVybiBOT1RISU5HO1xuICB9XG5cbiAgLyoqXG4gICAqIE1ldGhvZCB0byBoYW5kbGUgZXZlbnRzIG92ZXIgYW4gaW1hZ2UsIGZvciBpbnN0YW5jZSBhIGtleXByZXNzIHdpdGggdGhlIEtleWJvYXJkIG9yIGEgTW91c2UgY2xpY2suXG4gICAqIEBwYXJhbSBzdHJpbmcgZGlyZWN0aW9uIG9mIHRoZSBuYXZpZ2F0aW9uIHRoYXQgY2FuIGJlIGVpdGhlciAnbmV4dCcgb3IgJ3ByZXYnXG4gICAqIEBwYXJhbSBLZXlib2FyZEV2ZW50IGV2ZW50IHBheWxvYWRcbiAgICogQHJldHVybnMgbnVtYmVyIC0xIGZvciBQUkVWLCAxIGZvciBORVhUIGFuZCAwIGZvciBOT1RISU5HXG4gICAqL1xuICBwcml2YXRlIGhhbmRsZUtleWJvYXJkTmF2aWdhdGlvbkV2ZW50KGRpcmVjdGlvbjogc3RyaW5nLCBldmVudDogS2V5Ym9hcmRFdmVudCk6IG51bWJlciB7XG4gICAgY29uc3Qga2V5OiBudW1iZXIgPSBldmVudC5rZXlDb2RlO1xuICAgIGlmIChrZXkgPT09IFNQQUNFX0tFWSB8fCBrZXkgPT09IEVOVEVSX0tFWSkge1xuICAgICAgcmV0dXJuIGRpcmVjdGlvbiA9PT0gRElSRUNUSU9OX1JJR0hUID8gTkVYVCA6IFBSRVY7XG4gICAgfVxuICAgIHJldHVybiBOT1RISU5HO1xuICB9XG5cbiAgLyoqXG4gICAqIE1ldGhvZCB0byBoYW5kbGUgZXZlbnRzIG92ZXIgYW4gaW1hZ2UsIGZvciBpbnN0YW5jZSBhIGtleXByZXNzIHdpdGggdGhlIEtleWJvYXJkIG9yIGEgTW91c2UgY2xpY2suXG4gICAqIEBwYXJhbSBzdHJpbmcgZGlyZWN0aW9uIG9mIHRoZSBuYXZpZ2F0aW9uIHRoYXQgY2FuIGJlIGVpdGhlciAnbmV4dCcgb3IgJ3ByZXYnXG4gICAqIEBwYXJhbSBNb3VzZUV2ZW50IGV2ZW50IHBheWxvYWRcbiAgICogQHJldHVybnMgbnVtYmVyIC0xIGZvciBQUkVWLCAxIGZvciBORVhUIGFuZCAwIGZvciBOT1RISU5HXG4gICAqL1xuICBwcml2YXRlIGhhbmRsZU1vdXNlTmF2aWdhdGlvbkV2ZW50KGRpcmVjdGlvbjogc3RyaW5nLCBldmVudDogTW91c2VFdmVudCk6IG51bWJlciB7XG4gICAgY29uc3QgbW91c2VCdG46IG51bWJlciA9IGV2ZW50LmJ1dHRvbjtcbiAgICBpZiAobW91c2VCdG4gPT09IE1PVVNFX01BSU5fQlVUVE9OX0NMSUNLfgB7XG4gICAgICByZXR1cm4gZGlyZWN0aW9uID09PSBESVJFQ1RJT05fUklHSFQgPyBORVhUIDogUFJFVjtcbiAgICB9XG4gICAgcmV0dXJuIE5PVEhJTkc7XG4gIH1cbn1cbiJdfQ==