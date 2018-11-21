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
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DIRECTIVES } from './directives/directives';
import { COMPONENTS, ModalGalleryComponent } from './components/components';
import { KEYBOARD_CONFIGURATION, KeyboardService } from './services/keyboard.service';
import { GalleryService } from './services/gallery.service';
import 'mousetrap';
import 'hammerjs';
/**
 * Module with `forRoot` method to import it in the root module of your application.
 */
var ModalGalleryModule = /** @class */ (function () {
    function ModalGalleryModule() {
    }
    /**
     * @param {?=} config
     * @return {?}
     */
    ModalGalleryModule.forRoot = /**
     * @param {?=} config
     * @return {?}
     */
    function (config) {
        return {
            ngModule: ModalGalleryModule,
            providers: [
                {
                    provide: KEYBOARD_CONFIGURATION,
                    useValue: config ? config : {}
                },
                {
                    provide: KeyboardService,
                    useFactory: setupKeyboardService,
                    deps: [KEYBOARD_CONFIGURATION]
                },
                {
                    provide: GalleryService,
                    useFactory: setupGalleryService
                }
            ]
        };
    };
    ModalGalleryModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule],
                    declarations: [COMPONENTS, DIRECTIVES],
                    exports: [ModalGalleryComponent]
                },] }
    ];
    return ModalGalleryModule;
}());
export { ModalGalleryModule };
/**
 * Function to setup the keyboard service inside the `forRoot` method.
 * @param {?} injector
 * @return {?} KeyboardService an instance of the `KeyboardService`
 */
export function setupKeyboardService(injector) {
    return new KeyboardService(injector);
}
/**
 * @return {?}
 */
export function setupGalleryService() {
    return new GalleryService();
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwtZ2FsbGVyeS5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9tb2RhbC1hbmd1bGFyLWdhbGxlcnkvIiwic291cmNlcyI6WyJsaWIvbW9kYWwtZ2FsbGVyeS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBd0JBLE9BQU8sRUFBdUIsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzlELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUUvQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDckQsT0FBTyxFQUFFLFVBQVUsRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQzVFLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxlQUFlLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUV0RixPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDNUQsT0FBTyxXQUFXLENBQUM7QUFDbkIsT0FBTyxVQUFVLENBQUM7Ozs7Ozs7Ozs7O0lBV1QsMEJBQU87Ozs7SUFBZCxVQUFlLE1BQThCO1FBQzNDLE9BQU87WUFDTCxRQUFRLEVBQUUsa0JBQWtCO1lBQzVCLFNBQVMsRUFBRTtnQkFDVDtvQkFDRSxPQUFPLEVBQUUsc0JBQXNCO29CQUMvQixRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUU7aUJBQy9CO2dCQUNEO29CQUNFLE9BQU8sRUFBRSxlQUFlO29CQUN4QixVQUFVLEVBQUUsb0JBQW9CO29CQUNoQyxJQUFJLEVBQUUsQ0FBQyxzQkFBc0IsQ0FBQztpQkFDL0I7Z0JBQ0Q7b0JBQ0UsT0FBTyxFQUFFLGNBQWM7b0JBQ3ZCLFVBQVUsRUFBRSxtQkFBbUI7aUJBQ2hDO2FBQ0Y7U0FDRixDQUFDO0tBQ0g7O2dCQXpCRixRQUFRLFNBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDO29CQUN2QixZQUFZLEVBQUUsQ0FBQyxVQUFVLEVBQUUsVUFBVSxDQUFDO29CQUN0QyxPQUFPLEVBQUUsQ0FBQyxxQkFBcUIsQ0FBQztpQkFDakM7OzZCQTFDRDs7U0EyQ2Esa0JBQWtCOzs7Ozs7QUE0Qi9CLE1BQU0sK0JBQStCLFFBQStCO0lBQ2xFLE9BQU8sSUFBSSxlQUFlLENBQUMsUUFBUSxDQUFDLENBQUM7Q0FDdEM7Ozs7QUFFRCxNQUFNO0lBQ0osT0FBTyxJQUFJLGNBQWMsRUFBRSxDQUFDO0NBQzdCIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiBUaGUgTUlUIExpY2Vuc2UgKE1JVClcblxuIENvcHlyaWdodCAoYykgMjAxNy0yMDE4IFN0ZWZhbm8gQ2FwcGEgKEtzODkpXG5cbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwifgwgdG8gZGVhbFxuIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbiB0byB1c2UsIGNvcHfgIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcblxuIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIGFsbFxuIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG5cbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFfgXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTiBJTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiBMSUFCSUxJVFfgIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFXG4gU09GVFdBUkUuXG4gKi9cblxuaW1wb3J0IHsgTW9kdWxlV2l0aFByb3ZpZGVycywgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbmltcG9ydCB7IERJUkVDVElWRVMgfSBmcm9tICcuL2RpcmVjdGl2ZXMvZGlyZWN0aXZlcyc7XG5pbXBvcnQgeyBDT01QT05FTlRTLCBNb2RhbEdhbGxlcnlDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvY29tcG9uZW50cyc7XG5pbXBvcnQgeyBLRVlCT0FSRF9DT05GSUdVUkFUSU9OLCBLZXlib2FyZFNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL2tleWJvYXJkLnNlcnZpY2UnO1xuaW1wb3J0IHsgS2V5Ym9hcmRTZXJ2aWNlQ29uZmlnIH0gZnJvbSAnLi9tb2RlbC9rZXlib2FyZC1zZXJ2aWNlLWNvbmZpZy5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgR2FsbGVyeVNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL2dhbGxlcnkuc2VydmljZSc7XG5pbXBvcnQgJ21vdXNldHJhcCc7XG5pbXBvcnQgJ2hhbW1lcmpzJztcblxuLyoqXG4gKiBNb2R1bGUgd2l0aCBgZm9yUm9vdGAgbWV0aG9kIHRvIGltcG9ydCBpdCBpbiB0aGUgcm9vdCBtb2R1bGUgb2YgeW91ciBhcHBsaWNhdGlvbi5cbiAqL1xuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXG4gIGRlY2xhcmF0aW9uczogW0NPTVBPTkVOVFMsIERJUkVDVElWRVNdLFxuICBleHBvcnRzOiBbTW9kYWxHYWxsZXJ5Q29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBNb2RhbEdhbGxlcnlNb2R1bGUge1xuICBzdGF0aWMgZm9yUm9vdChjb25maWc/OiBLZXlib2FyZFNlcnZpY2VDb25maWcpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IE1vZGFsR2FsbGVyeU1vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICB7XG4gICAgICAgICAgcHJvdmlkZTogS0VZQk9BUkRfQ09ORklHVVJBVElPTixcbiAgICAgICAgICB1c2VWYWx1ZTogY29uZmlnID8gY29uZmlnIDoge31cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHByb3ZpZGU6IEtleWJvYXJkU2VydmljZSxcbiAgICAgICAgICB1c2VGYWN0b3J5OiBzZXR1cEtleWJvYXJkU2VydmljZSxcbiAgICAgICAgICBkZXBzOiBbS0VZQk9BUkRfQ09ORklHVVJBVElPTl1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHByb3ZpZGU6IEdhbGxlcnlTZXJ2aWNlLFxuICAgICAgICAgIHVzZUZhY3Rvcnk6IHNldHVwR2FsbGVyeVNlcnZpY2VcbiAgICAgICAgfVxuICAgICAgXVxuICAgIH07XG4gIH1cbn1cblxuLyoqXG4gKiBGdW5jdGlvbiB0byBzZXR1cCB0aGUga2V5Ym9hcmQgc2VydmljZSBpbnNpZGUgdGhlIGBmb3JSb290YCBtZXRob2QuXG4gKiBAcGFyYW0gS2V5Ym9hcmRTZXJ2aWNlQ29uZmlnIGluamVjdG9yIGlzIGFuIGludGVyZmFjZSBvZiB0eXBlIGBLZXlib2FyZFNlcnZpY2VDb25maWdgIHRvIHBhc3MgZGF0YSB0byBLZXlib2FyZFNlcnZpY2VcbiAqIEByZXR1cm5zIEtleWJvYXJkU2VydmljZSBhbiBpbnN0YW5jZSBvZiB0aGUgYEtleWJvYXJkU2VydmljZWBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNldHVwS2V5Ym9hcmRTZXJ2aWNlKGluamVjdG9yOiBLZXlib2FyZFNlcnZpY2VDb25maWcpOiBLZXlib2FyZFNlcnZpY2Uge1xuICByZXR1cm4gbmV3IEtleWJvYXJkU2VydmljZShpbmplY3Rvcik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXR1cEdhbGxlcnlTZXJ2aWNlKCk6IEdhbGxlcnlTZXJ2aWNlIHtcbiAgcmV0dXJuIG5ldyBHYWxsZXJ5U2VydmljZSgpO1xufVxuIl19