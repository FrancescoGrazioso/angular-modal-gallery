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
export class ModalGalleryModule {
    /**
     * @param {?=} config
     * @return {?}
     */
    static forRoot(config) {
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
    }
}
ModalGalleryModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
                declarations: [COMPONENTS, DIRECTIVES],
                exports: [ModalGalleryComponent]
            },] }
];
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwtZ2FsbGVyeS5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9tb2RhbC1hbmd1bGFyLWdhbGxlcnkvIiwic291cmNlcyI6WyJsaWIvbW9kYWwtZ2FsbGVyeS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBd0JBLE9BQU8sRUFBdUIsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzlELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUUvQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDckQsT0FBTyxFQUFFLFVBQVUsRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQzVFLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxlQUFlLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUV0RixPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDNUQsT0FBTyxXQUFXLENBQUM7QUFDbkIsT0FBTyxVQUFVLENBQUM7Ozs7QUFVbEIsTUFBTTs7Ozs7SUFDSixNQUFNLENBQUMsT0FBTyxDQUFDLE1BQThCO1FBQzNDLE9BQU87WUFDTCxRQUFRLEVBQUUsa0JBQWtCO1lBQzVCLFNBQVMsRUFBRTtnQkFDVDtvQkFDRSxPQUFPLEVBQUUsc0JBQXNCO29CQUMvQixRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUU7aUJBQy9CO2dCQUNEO29CQUNFLE9BQU8sRUFBRSxlQUFlO29CQUN4QixVQUFVLEVBQUUsb0JBQW9CO29CQUNoQyxJQUFJLEVBQUUsQ0FBQyxzQkFBc0IsQ0FBQztpQkFDL0I7Z0JBQ0Q7b0JBQ0UsT0FBTyxFQUFFLGNBQWM7b0JBQ3ZCLFVBQVUsRUFBRSxtQkFBbUI7aUJBQ2hDO2FBQ0Y7U0FDRixDQUFDO0tBQ0g7OztZQXpCRixRQUFRLFNBQUM7Z0JBQ1IsT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDO2dCQUN2QixZQUFZLEVBQUUsQ0FBQyxVQUFVLEVBQUUsVUFBVSxDQUFDO2dCQUN0QyxPQUFPLEVBQUUsQ0FBQyxxQkFBcUIsQ0FBQzthQUNqQzs7Ozs7OztBQTZCRCxNQUFNLCtCQUErQixRQUErQjtJQUNsRSxPQUFPLElBQUfgZUFBZSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0NBQ3RDOzs7O0FBRUQsTUFBTTtJQUNKLE9BQU8sSUFBSSxjQUFjLEVBQUUsQ0FBQztDQUM3QiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gVGhlIE1JVCBMaWNlbnNlIChNSVQpXG5cbiBDb3B5cmlnaHQgKGMpIDIwMTctMjAxOCBTdGVmYW5vIENhcHBhIChLczg5KVxuXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIifgIHRvIGRlYWxcbiBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4gdG8gdXNlLCBjb3B5LCBtb2RpZnfgIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG5cbiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBhbGxcbiBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT04gSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRVxuIFNPRlRXQVJFLlxuICovXG5cbmltcG9ydCB7IE1vZHVsZVdpdGhQcm92aWRlcnMsIE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5pbXBvcnQgeyBESVJFQ1RJVkVTIH0gZnJvbSAnLi9kaXJlY3RpdmVzL2RpcmVjdGl2ZXMnO1xuaW1wb3J0IHsgQ09NUE9ORU5UUywgTW9kYWxHYWxsZXJ5Q29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2NvbXBvbmVudHMnO1xuaW1wb3J0IHsgS0VZQk9BUkRfQ09ORklHVVJBVElPTiwgS2V5Ym9hcmRTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9rZXlib2FyZC5zZXJ2aWNlJztcbmltcG9ydCB7IEtleWJvYXJkU2VydmljZUNvbmZpZyB9IGZyb20gJy4vbW9kZWwva2V5Ym9hcmQtc2VydmljZS1jb25maWcuaW50ZXJmYWNlJztcbmltcG9ydCB7IEdhbGxlcnlTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9nYWxsZXJ5LnNlcnZpY2UnO1xuaW1wb3J0ICdtb3VzZXRyYXAnO1xuaW1wb3J0ICdoYW1tZXJqcyc7XG5cbi8qKlxuICogTW9kdWxlIHdpdGggYGZvclJvb3RgIG1ldGhvZCB0byBpbXBvcnQgaXQgaW4gdGhlIHJvb3QgbW9kdWxlIG9mIHlvdXIgYXBwbGljYXRpb24uXG4gKi9cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxuICBkZWNsYXJhdGlvbnM6IFtDT01QT05FTlRTLCBESVJFQ1RJVkVTXSxcbiAgZXhwb3J0czogW01vZGFsR2FsbGVyeUNvbXBvbmVudF1cbn0pXG5leHBvcnQgY2xhc3MgTW9kYWxHYWxsZXJ5TW9kdWxlIHtcbiAgc3RhdGljIGZvclJvb3QoY29uZmlnPzogS2V5Ym9hcmRTZXJ2aWNlQ29uZmlnKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBNb2RhbEdhbGxlcnlNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAge1xuICAgICAgICAgIHByb3ZpZGU6IEtFWUJPQVJEX0NPTkZJR1VSQVRJT04sXG4gICAgICAgICAgdXNlVmFsdWU6IGNvbmZpZyA/IGNvbmZpZyA6IHt9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBwcm92aWRlOiBLZXlib2FyZFNlcnZpY2UsXG4gICAgICAgICAgdXNlRmFjdG9yeTogc2V0dXBLZXlib2FyZFNlcnZpY2UsXG4gICAgICAgICAgZGVwczogW0tFWUJPQVJEX0NPTkZJR1VSQVRJT05dXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBwcm92aWRlOiBHYWxsZXJ5U2VydmljZSxcbiAgICAgICAgICB1c2VGYWN0b3J5OiBzZXR1cEdhbGxlcnlTZXJ2aWNlXG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9O1xuICB9XG59XG5cbi8qKlxuICogRnVuY3Rpb24gdG8gc2V0dXAgdGhlIGtleWJvYXJkIHNlcnZpY2UgaW5zaWRlIHRoZSBgZm9yUm9vdGAgbWV0aG9kLlxuICogQHBhcmFtIEtleWJvYXJkU2VydmljZUNvbmZpZyBpbmplY3RvciBpcyBhbiBpbnRlcmZhY2Ugb2YgdHlwZSBgS2V5Ym9hcmRTZXJ2aWNlQ29uZmlnYCB0byBwYXNzIGRhdGEgdG8gS2V5Ym9hcmRTZXJ2aWNlXG4gKiBAcmV0dXJucyBLZXlib2FyZFNlcnZpY2UgYW4gaW5zdGFuY2Ugb2YgdGhlIGBLZXlib2FyZFNlcnZpY2VgXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzZXR1cEtleWJvYXJkU2VydmljZShpbmplY3RvcjogS2V5Ym9hcmRTZXJ2aWNlQ29uZmlnKTogS2V5Ym9hcmRTZXJ2aWNlIHtcbiAgcmV0dXJuIG5ldyBLZXlib2FyZFNlcnZpY2UoaW5qZWN0b3IpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2V0dXBHYWxsZXJ5U2VydmljZSgpOiBHYWxsZXJ5U2VydmljZSB7XG4gIHJldHVybiBuZXcgR2FsbGVyeVNlcnZpY2UoKTtcbn1cbiJdfQ==