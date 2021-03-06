import { ModuleWithProviders } from '@angular/core';
import { KeyboardService } from './services/keyboard.service';
import { KeyboardServiceConfig } from './model/keyboard-service-config.interface';
import { GalleryService } from './services/gallery.service';
import 'mousetrap';
import 'hammerjs';
/**
 * Module with `forRoot` method to import it in the root module of your application.
 */
export declare class ModalGalleryModule {
    static forRoot(config?: KeyboardServiceConfig): ModuleWithProviders;
}
/**
 * Function to setup the keyboard service inside the `forRoot` method.
 * @param KeyboardServiceConfig injector is an interface of type `KeyboardServiceConfig` to pass data to KeyboardService
 * @returns KeyboardService an instance of the `KeyboardService`
 */
export declare function setupKeyboardService(injector: KeyboardServiceConfig): KeyboardService;
export declare function setupGalleryService(): GalleryService;
