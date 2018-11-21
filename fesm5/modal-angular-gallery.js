import { Directive, EventEmitter, HostListener, Input, Output, ElementRef, Renderer2, ChangeDetectionStrategy, Component, Inject, Injectable, InjectionToken, ChangeDetectorRef, PLATFORM_ID, ViewChild, NgModule } from '@angular/core';
import { __extends, __spread } from 'tslib';
import { isPlatformBrowser, isPlatformServer, CommonModule } from '@angular/common';
import 'mousetrap';
import 'hammerjs';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Directive to close the modal gallery clicking on the semi-transparent background.
 * In fact, it listens for a click on all elements that aren't 'inside' and it emits
 * an event using `\@Output clickOutside`.
 */
var ClickOutsideDirective = /** @class */ (function () {
    function ClickOutsideDirective() {
        /**
         * Output to emit an event if the clicked element class doesn't contain 'inside' or it is 'hidden'. The payload is a boolean.
         */
        this.clickOutside = new EventEmitter();
    }
    /**
     * Method called by Angular itself every click thanfg to `@HostListener`.
     * @param MouseEvent event payload received evey click
     */
    /**
     * Method called by Angular itself every click thanfg to `\@HostListener`.
     * @param {?} event
     * @return {?}
     */
    ClickOutsideDirective.prototype.onClick = /**
     * Method called by Angular itself every click thanfg to `\@HostListener`.
     * @param {?} event
     * @return {?}
     */
    function (event) {
        event.stopPropagation();
        /** @type {?} */
        var targetElement = event.target;
        if (!this.clickOutsideEnable || !targetElement) {
            return;
        }
        /** @type {?} */
        var isInside = false;
        /** @type {?} */
        var isHidden = false;
        if (typeof targetElement.className !== 'string') {
            // it happens with @fortawesome/fontawesome 5
            // for some reasons className is an object with 2 empty properties inside
            isInside = true;
        }
        else {
            // in normal scenarios, use classname, because it's a simple string
            isInside = targetElement.className && targetElement.className.startsWith('inside');
            isHidden = targetElement.className.includes('hidden');
        }
        // if inside => don't close modal gallery
        // if hidden => close modal gallery
        /*
                i i' h | close
                0 1  0 |   1 => close modal gallery
                0 1  1 |   1 => close modal gallery
                1 0  0 |   0
                1 0  1 |   1 => close modal gallery
             */
        if (!isInside || isHidden) {
            // close modal gallery
            this.clickOutside.emit(true);
        }
    };
    ClickOutsideDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[fgClickOutside]'
                },] }
    ];
    ClickOutsideDirective.propDecorators = {
        clickOutsideEnable: [{ type: Input }],
        clickOutside: [{ type: Output }],
        onClick: [{ type: HostListener, args: ['click', ['$event'],] }]
    };
    return ClickOutsideDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Directive to change the size of an element.
 */
var SizeDirective = /** @class */ (function () {
    function SizeDirective(renderer, el) {
        this.renderer = renderer;
        this.el = el;
    }
    /**
     * Method ´ngOnInit´ to apply the style of this directive.
     * This is an Angular's lifecycle hook, so its called automatically by Angular itself.
     * In particular, it's called only one time!!!
     */
    /**
     * Method ´ngOnInit´ to apply the style of this directive.
     * This is an Angular's lifecycle hook, so its called automatically by Angular itself.
     * In particular, it's called only one time!!!
     * @return {?}
     */
    SizeDirective.prototype.ngOnInit = /**
     * Method ´ngOnInit´ to apply the style of this directive.
     * This is an Angular's lifecycle hook, so its called automatically by Angular itself.
     * In particular, it's called only one time!!!
     * @return {?}
     */
    function () {
        this.applyStyle();
    };
    /**
     * Method ´ngOnChanges´ to apply the style of this directive.
     * This is an Angular's lifecycle hook, so its called automatically by Angular itself.
     * In particular, it's called when any data-bound property of a directive changes!!!
     */
    /**
     * Method ´ngOnChanges´ to apply the style of this directive.
     * This is an Angular's lifecycle hook, so its called automatically by Angular itself.
     * In particular, it's called when any data-bound property of a directive changes!!!
     * @return {?}
     */
    SizeDirective.prototype.ngOnChanges = /**
     * Method ´ngOnChanges´ to apply the style of this directive.
     * This is an Angular's lifecycle hook, so its called automatically by Angular itself.
     * In particular, it's called when any data-bound property of a directive changes!!!
     * @return {?}
     */
    function () {
        this.applyStyle();
    };
    /**
     * Private method to change both width and height of an element.
     * @return {?}
     */
    SizeDirective.prototype.applyStyle = /**
     * Private method to change both width and height of an element.
     * @return {?}
     */
    function () {
        if (!this.sizeConfig) {
            return;
        }
        // apply [style.width]
        this.renderer.setStyle(this.el.nativeElement, 'width', this.sizeConfig.width);
        this.renderer.setStyle(this.el.nativeElement, 'height', this.sizeConfig.height);
    };
    SizeDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[fgSize]'
                },] }
    ];
    /** @nocollapse */
    SizeDirective.ctorParameters = function () { return [
        { type: Renderer2 },
        { type: ElementRef }
    ]; };
    SizeDirective.propDecorators = {
        sizeConfig: [{ type: Input }]
    };
    return SizeDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var KeyboardNavigationDirective = /** @class */ (function () {
    function KeyboardNavigationDirective() {
        this.keyPress = new EventEmitter();
    }
    /**
     * Listener to catch keyboard's events and call the right method based on the key.
     * For instance, pressing esc, this will call `closeGallery(Action.KEYBOARD)` and so on.
     * If you passed a valid `keyboardConfig` esc, right and left buttons will be customized based on your data.
     * @param e KeyboardEvent caught by the listener.
     */
    /**
     * Listener to catch keyboard's events and call the right method based on the key.
     * For instance, pressing esc, this will call `closeGallery(Action.KEYBOARD)` and so on.
     * If you passed a valid `keyboardConfig` esc, right and left buttons will be customized based on your data.
     * @param {?} e KeyboardEvent caught by the listener.
     * @return {?}
     */
    KeyboardNavigationDirective.prototype.onKeyDown = /**
     * Listener to catch keyboard's events and call the right method based on the key.
     * For instance, pressing esc, this will call `closeGallery(Action.KEYBOARD)` and so on.
     * If you passed a valid `keyboardConfig` esc, right and left buttons will be customized based on your data.
     * @param {?} e KeyboardEvent caught by the listener.
     * @return {?}
     */
    function (e) {
        if (!this.isOpen) {
            return;
        }
        this.keyPress.emit(e.keyCode);
    };
    KeyboardNavigationDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[fgKeyboardNavigation]'
                },] }
    ];
    KeyboardNavigationDirective.propDecorators = {
        isOpen: [{ type: Input }],
        keyPress: [{ type: Output }],
        onKeyDown: [{ type: HostListener, args: ['window:keydown', ['$event'],] }]
    };
    return KeyboardNavigationDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Directive to change the flex-wrap css property of an element.
 */
var WrapDirective = /** @class */ (function () {
    function WrapDirective(renderer, el) {
        this.renderer = renderer;
        this.el = el;
    }
    /**
     * Method ´ngOnInit´ to apply the style of this directive.
     * This is an Angular's lifecycle hook, so its called automatically by Angular itself.
     * In particular, it's called only one time!!!
     */
    /**
     * Method ´ngOnInit´ to apply the style of this directive.
     * This is an Angular's lifecycle hook, so its called automatically by Angular itself.
     * In particular, it's called only one time!!!
     * @return {?}
     */
    WrapDirective.prototype.ngOnInit = /**
     * Method ´ngOnInit´ to apply the style of this directive.
     * This is an Angular's lifecycle hook, so its called automatically by Angular itself.
     * In particular, it's called only one time!!!
     * @return {?}
     */
    function () {
        this.applyStyle();
    };
    /**
     * Method ´ngOnChanges´ to apply the style of this directive.
     * This is an Angular's lifecycle hook, so its called automatically by Angular itself.
     * In particular, it's called when any data-bound property of a directive changes!!!
     */
    /**
     * Method ´ngOnChanges´ to apply the style of this directive.
     * This is an Angular's lifecycle hook, so its called automatically by Angular itself.
     * In particular, it's called when any data-bound property of a directive changes!!!
     * @return {?}
     */
    WrapDirective.prototype.ngOnChanges = /**
     * Method ´ngOnChanges´ to apply the style of this directive.
     * This is an Angular's lifecycle hook, so its called automatically by Angular itself.
     * In particular, it's called when any data-bound property of a directive changes!!!
     * @return {?}
     */
    function () {
        this.applyStyle();
    };
    /**
     * Private method to change both widht and flex-wrap css properties.
     * @return {?}
     */
    WrapDirective.prototype.applyStyle = /**
     * Private method to change both widht and flex-wrap css properties.
     * @return {?}
     */
    function () {
        // TODO is this right???? If wrap os false I cannot apply width and flex-wrap
        if (!this.wrap) {
            return;
        }
        this.renderer.setStyle(this.el.nativeElement, 'width', this.width);
        this.renderer.setStyle(this.el.nativeElement, 'flex-wrap', this.wrap ? 'wrap' : 'nowrap');
    };
    WrapDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[fgWrap]'
                },] }
    ];
    /** @nocollapse */
    WrapDirective.ctorParameters = function () { return [
        { type: Renderer2 },
        { type: ElementRef }
    ]; };
    WrapDirective.propDecorators = {
        wrap: [{ type: Input }],
        width: [{ type: Input }]
    };
    return WrapDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Directive to change the flex-direction of an element, based on two inputs (`direction` and `justify`).
 */
var DirectionDirective = /** @class */ (function () {
    function DirectionDirective(renderer, el) {
        this.renderer = renderer;
        this.el = el;
    }
    /**
     * Method ´ngOnInit´ to apply the style of this directive.
     * This is an Angular's lifecycle hook, so its called automatically by Angular itself.
     * In particular, it's called only one time!!!
     */
    /**
     * Method ´ngOnInit´ to apply the style of this directive.
     * This is an Angular's lifecycle hook, so its called automatically by Angular itself.
     * In particular, it's called only one time!!!
     * @return {?}
     */
    DirectionDirective.prototype.ngOnInit = /**
     * Method ´ngOnInit´ to apply the style of this directive.
     * This is an Angular's lifecycle hook, so its called automatically by Angular itself.
     * In particular, it's called only one time!!!
     * @return {?}
     */
    function () {
        this.applyStyle();
    };
    /**
     * Method ´ngOnChanges´ to apply the style of this directive.
     * This is an Angular's lifecycle hook, so its called automatically by Angular itself.
     * In particular, it's called when any data-bound property of a directive changes!!!
     */
    /**
     * Method ´ngOnChanges´ to apply the style of this directive.
     * This is an Angular's lifecycle hook, so its called automatically by Angular itself.
     * In particular, it's called when any data-bound property of a directive changes!!!
     * @return {?}
     */
    DirectionDirective.prototype.ngOnChanges = /**
     * Method ´ngOnChanges´ to apply the style of this directive.
     * This is an Angular's lifecycle hook, so its called automatically by Angular itself.
     * In particular, it's called when any data-bound property of a directive changes!!!
     * @return {?}
     */
    function () {
        this.applyStyle();
    };
    /**
     * Private method to change both direction and justify of an element.
     * @return {?}
     */
    DirectionDirective.prototype.applyStyle = /**
     * Private method to change both direction and justify of an element.
     * @return {?}
     */
    function () {
        if (!this.direction || !this.justify) {
            return;
        }
        this.renderer.setStyle(this.el.nativeElement, 'flex-direction', this.direction);
        this.renderer.setStyle(this.el.nativeElement, 'justify-content', this.justify);
    };
    DirectionDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[fgDirection]'
                },] }
    ];
    /** @nocollapse */
    DirectionDirective.ctorParameters = function () { return [
        { type: Renderer2 },
        { type: ElementRef }
    ]; };
    DirectionDirective.propDecorators = {
        direction: [{ type: Input }],
        justify: [{ type: Input }]
    };
    return DirectionDirective;
}());

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
/**
 * Class `Image` that represents an image with both `modal` and `plain` configurations.
 * Both image `id` and `modal` are mandatory, instead `plain` is optional.
 */
var  /**
 * Class `Image` that represents an image with both `modal` and `plain` configurations.
 * Both image `id` and `modal` are mandatory, instead `plain` is optional.
 */
Image = /** @class */ (function () {
    function Image(id, modal, plain) {
        this.id = id;
        this.modal = modal;
        this.plain = plain;
    }
    return Image;
}());
/**
 * Class `ImageModalEvent` that represents the event payload with the result and the triggered action.
 */
var  /**
 * Class `ImageModalEvent` that represents the event payload with the result and the triggered action.
 */
ImageModalEvent = /** @class */ (function () {
    function ImageModalEvent(action, result) {
        this.action = action;
        this.result = result;
    }
    return ImageModalEvent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Directive to add an image to an `<a>` tag with some additional custom properties.
 */
var ATagBgImageDirective = /** @class */ (function () {
    function ATagBgImageDirective(renderer, el) {
        this.renderer = renderer;
        this.el = el;
    }
    /**
     * Method ´ngOnInit´ to apply the style of this directive.
     * This is an Angular's lifecycle hook, so its called automatically by Angular itself.
     * In particular, it's called only one time!!!
     */
    /**
     * Method ´ngOnInit´ to apply the style of this directive.
     * This is an Angular's lifecycle hook, so its called automatically by Angular itself.
     * In particular, it's called only one time!!!
     * @return {?}
     */
    ATagBgImageDirective.prototype.ngOnInit = /**
     * Method ´ngOnInit´ to apply the style of this directive.
     * This is an Angular's lifecycle hook, so its called automatically by Angular itself.
     * In particular, it's called only one time!!!
     * @return {?}
     */
    function () {
        this.applyStyle();
    };
    /**
     * Method ´ngOnChanges´ to apply the style of this directive.
     * This is an Angular's lifecycle hook, so its called automatically by Angular itself.
     * In particular, it's called when any data-bound property of a directive changes!!!
     */
    /**
     * Method ´ngOnChanges´ to apply the style of this directive.
     * This is an Angular's lifecycle hook, so its called automatically by Angular itself.
     * In particular, it's called when any data-bound property of a directive changes!!!
     * @return {?}
     */
    ATagBgImageDirective.prototype.ngOnChanges = /**
     * Method ´ngOnChanges´ to apply the style of this directive.
     * This is an Angular's lifecycle hook, so its called automatically by Angular itself.
     * In particular, it's called when any data-bound property of a directive changes!!!
     * @return {?}
     */
    function () {
        this.applyStyle();
    };
    /**
     * Private method to add an image as background of an `<a>` tag.
     * @return {?}
     */
    ATagBgImageDirective.prototype.applyStyle = /**
     * Private method to add an image as background of an `<a>` tag.
     * @return {?}
     */
    function () {
        if (!this.image || (!this.image.plain && !this.image.modal)) {
            return;
        }
        /** @type {?} */
        var imgPath = this.image.plain && this.image.plain.img ? this.image.plain.img : this.image.modal.img;
        this.renderer.setStyle(this.el.nativeElement, 'background', "url(\"" + imgPath + "\") " + this.style);
    };
    ATagBgImageDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[fgATagBgImage]'
                },] }
    ];
    /** @nocollapse */
    ATagBgImageDirective.ctorParameters = function () { return [
        { type: Renderer2 },
        { type: ElementRef }
    ]; };
    ATagBgImageDirective.propDecorators = {
        image: [{ type: Input }],
        style: [{ type: Input }]
    };
    return ATagBgImageDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Directive to customize the description.
 */
var DescriptionDirective = /** @class */ (function () {
    function DescriptionDirective(renderer, el) {
        this.renderer = renderer;
        this.el = el;
    }
    /**
     * Method ´ngOnInit´ to apply the style of this directive.
     * This is an Angular's lifecycle hook, so its called automatically by Angular itself.
     * In particular, it's called only one time!!!
     */
    /**
     * Method ´ngOnInit´ to apply the style of this directive.
     * This is an Angular's lifecycle hook, so its called automatically by Angular itself.
     * In particular, it's called only one time!!!
     * @return {?}
     */
    DescriptionDirective.prototype.ngOnInit = /**
     * Method ´ngOnInit´ to apply the style of this directive.
     * This is an Angular's lifecycle hook, so its called automatically by Angular itself.
     * In particular, it's called only one time!!!
     * @return {?}
     */
    function () {
        this.applyStyle();
    };
    /**
     * Method ´ngOnChanges´ to apply the style of this directive.
     * This is an Angular's lifecycle hook, so its called automatically by Angular itself.
     * In particular, it's called when any data-bound property of a directive changes!!!
     */
    /**
     * Method ´ngOnChanges´ to apply the style of this directive.
     * This is an Angular's lifecycle hook, so its called automatically by Angular itself.
     * In particular, it's called when any data-bound property of a directive changes!!!
     * @return {?}
     */
    DescriptionDirective.prototype.ngOnChanges = /**
     * Method ´ngOnChanges´ to apply the style of this directive.
     * This is an Angular's lifecycle hook, so its called automatically by Angular itself.
     * In particular, it's called when any data-bound property of a directive changes!!!
     * @return {?}
     */
    function () {
        this.applyStyle();
    };
    /**
     * Private method to change description's style.
     * @return {?}
     */
    DescriptionDirective.prototype.applyStyle = /**
     * Private method to change description's style.
     * @return {?}
     */
    function () {
        if (!this.description) {
            return;
        }
        if (this.description.style) {
            this.renderer.setStyle(this.el.nativeElement, 'background', this.description.style.bgColor);
            this.renderer.setStyle(this.el.nativeElement, 'color', this.description.style.textColor);
            if (this.description.style.width) {
                this.renderer.setStyle(this.el.nativeElement, 'width', this.description.style.width);
            }
            if (this.description.style.height) {
                this.renderer.setStyle(this.el.nativeElement, 'height', this.description.style.height);
            }
            if (this.description.style.position) {
                this.renderer.setStyle(this.el.nativeElement, 'position', this.description.style.position);
            }
            if (this.description.style.top) {
                this.renderer.setStyle(this.el.nativeElement, 'top', this.description.style.top);
            }
            if (this.description.style.bottom) {
                this.renderer.setStyle(this.el.nativeElement, 'bottom', this.description.style.bottom);
            }
            if (this.description.style.left) {
                this.renderer.setStyle(this.el.nativeElement, 'left', this.description.style.left);
            }
            if (this.description.style.right) {
                this.renderer.setStyle(this.el.nativeElement, 'right', this.description.style.right);
            }
            this.renderer.setStyle(this.el.nativeElement, 'margin-top', this.description.style.marginTop ? this.description.style.marginTop : '0px');
            this.renderer.setStyle(this.el.nativeElement, 'margin-bottom', this.description.style.marginBottom ? this.description.style.marginBottom : '0px');
            this.renderer.setStyle(this.el.nativeElement, 'margin-left', this.description.style.marginLeft ? this.description.style.marginLeft : '0px');
            this.renderer.setStyle(this.el.nativeElement, 'margin-right', this.description.style.marginRight ? this.description.style.marginRight : '0px');
        }
    };
    DescriptionDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[fgDescription]'
                },] }
    ];
    /** @nocollapse */
    DescriptionDirective.ctorParameters = function () { return [
        { type: Renderer2 },
        { type: ElementRef }
    ]; };
    DescriptionDirective.propDecorators = {
        description: [{ type: Input }]
    };
    return DescriptionDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** *
 * Array of all directives.
  @type {?} */
var DIRECTIVES = [
    ClickOutsideDirective,
    SizeDirective,
    KeyboardNavigationDirective,
    WrapDirective,
    DirectionDirective,
    ATagBgImageDirective,
    DescriptionDirective
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Component with the semi-transparent background.
 */
var BackgroundComponent = /** @class */ (function () {
    function BackgroundComponent() {
    }
    BackgroundComponent.decorators = [
        { type: Component, args: [{
                    selector: 'fg-background',
                    template: "<div class=\"ng-overlay\" *ngIf=\"isOpen\"\n     [attr.aria-label]=\"accessibilityConfig?.backgroundAriaLabel\"\n     [title]=\"accessibilityConfig?.backgroundTitle\"></div>\n",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: [".ng-overlay{position:fixed;top:0;left:0;width:100vw;height:100vh;background:#000;opacity:.8;z-index:9999}"]
                }] }
    ];
    BackgroundComponent.propDecorators = {
        isOpen: [{ type: Input }],
        accessibilityConfig: [{ type: Input }]
    };
    return BackgroundComponent;
}());

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
/** @enum {number} */
var Action = {
    NORMAL: 0,
    // default value
    CLICK: 1,
    // mouse click
    KEYBOARD: 2,
    SWIPE: 3,
    LOAD: 4,
};
Action[Action.NORMAL] = 'NORMAL';
Action[Action.CLICK] = 'CLICK';
Action[Action.KEYBOARD] = 'KEYBOARD';
Action[Action.SWIPE] = 'SWIPE';
Action[Action.LOAD] = 'LOAD';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
var KEYBOARD_CONFIGURATION = new InjectionToken('KEYBOARD_CONFIGURATION');
/**
 * Service to intercept ctrl+s (or cmd+s on macOS) using a third-party library, called Mousetrap.
 */
var KeyboardService = /** @class */ (function () {
    /**
     * Constructor of `KeyboardService` to init `mousetrap` and `shortcuts` private variables.
     * @param KeyboardServiceConfig config object received by the `forRoot()` function to init custom shortcuts
     */
    function KeyboardService(config) {
        // this.config is always defined, because forced by forRoot inside the module
        // when empty, it's simply an empty object: {}
        this.config = config;
        this.shortcuts = this.config && this.config.shortcuts ? this.config.shortcuts : ['ctrl+s', 'meta+s'];
        // temporary workaround to fix this issue: https://github.com/fg96/angular-modal-gallery/issues/142
        if (this.config && !this.config.disableSsrWorkaround) {
            // To prevent issues with angular-universal on server-side
            if (typeof window !== 'undefined') {
                this.mousetrap = new (/** @type {?} */ (Mousetrap))();
            }
        }
    }
    /**
     * Method to add a lister for ctrl+s/cmd+s keyboard events.
     * @param (e: ExtendedKeyboardEvent, combo: string) => any onBind callback function to add shortcuts
     */
    /**
     * Method to add a lister for ctrl+s/cmd+s keyboard events.
     * @param {?} onBind
     * @return {?}
     */
    KeyboardService.prototype.add = /**
     * Method to add a lister for ctrl+s/cmd+s keyboard events.
     * @param {?} onBind
     * @return {?}
     */
    function (onBind) {
        // temporary workaround to fix this issue: https://github.com/fg96/angular-modal-gallery/issues/142
        if (this.config && !this.config.disableSsrWorkaround) {
            // To prevent issues with angular-universal on server-side
            if (typeof window !== 'undefined') {
                this.mousetrap.bind(this.shortcuts, function (event, combo) {
                    if (event.preventDefault) {
                        event.preventDefault();
                    }
                    else {
                        // internet explorer
                        event.returnValue = false;
                    }
                    onBind(event, combo);
                });
            }
        }
    };
    /**
     * Method to reset all listeners. Please, call this function when needed
     * to free resources ad prevent leafg.
     */
    /**
     * Method to reset all listeners. Please, call this function when needed
     * to free resources ad prevent leafg.
     * @return {?}
     */
    KeyboardService.prototype.reset = /**
     * Method to reset all listeners. Please, call this function when needed
     * to free resources ad prevent leafg.
     * @return {?}
     */
    function () {
        // temporary workaround to fix this issue: https://github.com/fg96/angular-modal-gallery/issues/142
        if (this.config && !this.config.disableSsrWorkaround) {
            // To prevent issues with angular-universal on server-side
            if (typeof window !== 'undefined') {
                this.mousetrap.reset();
            }
        }
    };
    KeyboardService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    KeyboardService.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [KEYBOARD_CONFIGURATION,] }] }
    ]; };
    return KeyboardService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var GalleryService = /** @class */ (function () {
    function GalleryService() {
        this.navigate = new EventEmitter();
        this.close = new EventEmitter();
        this.update = new EventEmitter();
    }
    /**
     * @param {?} galleryId
     * @param {?} index
     * @return {?}
     */
    GalleryService.prototype.openGallery = /**
     * @param {?} galleryId
     * @param {?} index
     * @return {?}
     */
    function (galleryId, index) {
        if (galleryId === undefined || galleryId < 0 || index < 0) {
            throw new Error('Cannot open gallery via GalleryService with either index<0 or galleryId<0 or galleryId===undefined');
        }
        this.navigate.emit({
            galleryId: galleryId,
            index: index
        });
    };
    /**
     * @param {?} galleryId
     * @return {?}
     */
    GalleryService.prototype.closeGallery = /**
     * @param {?} galleryId
     * @return {?}
     */
    function (galleryId) {
        if (galleryId === undefined || galleryId < 0) {
            throw new Error('Cannot close gallery via GalleryService with galleryId<0 or galleryId===undefined');
        }
        this.close.emit(galleryId);
    };
    /**
     * @param {?} galleryId
     * @param {?} index
     * @param {?} image
     * @return {?}
     */
    GalleryService.prototype.updateGallery = /**
     * @param {?} galleryId
     * @param {?} index
     * @param {?} image
     * @return {?}
     */
    function (galleryId, index, image) {
        if (galleryId === undefined || galleryId < 0 || index < 0) {
            throw new Error('Cannot update gallery via GalleryService with either index<0 or galleryId<0 or galleryId===undefined');
        }
        if (!image) {
            throw new Error('Cannot update gallery via GalleryService, because image is not valid');
        }
        this.update.emit({
            galleryId: galleryId,
            index: index,
            image: image
        });
    };
    GalleryService.decorators = [
        { type: Injectable }
    ];
    return GalleryService;
}());

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
/** *
 * Keycode of the keyboard's key `space`
  @type {?} */
var SPACE_KEY = 32;
/** *
 * Keycode of the keyboard's key `enter`
  @type {?} */
var ENTER_KEY = 13;
/** *
 * Keycode of the main mouse button
  @type {?} */
var MOUSE_MAIN_BUTTON_CLICK = 0;
/** *
 * Const NEXT
  @type {?} */
var NEXT = 1;
/** *
 * Const PREV
  @type {?} */
var PREV = -1;
/** *
 * Const NOTHING to represents a situation when it isn't both NEXT and PREV
  @type {?} */
var NOTHING = 0;
/** *
 * Const to represent the right direction
  @type {?} */
var DIRECTION_RIGHT = 'right';
/** *
 * Const to represent the left direction
  @type {?} */
var DIRECTION_LEFT = 'left';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @enum {number} */
var DescriptionStrategy = {
    ALWAYS_HIDDEN: 1,
    ALWAYS_VISIBLE: 2,
    HIDE_IF_EMPTY: 3,
};
DescriptionStrategy[DescriptionStrategy.ALWAYS_HIDDEN] = 'ALWAYS_HIDDEN';
DescriptionStrategy[DescriptionStrategy.ALWAYS_VISIBLE] = 'ALWAYS_VISIBLE';
DescriptionStrategy[DescriptionStrategy.HIDE_IF_EMPTY] = 'HIDE_IF_EMPTY';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Internal representation of an image adding other fields
 * to the public `Image` class.
 */
var  /**
 * Internal representation of an image adding other fields
 * to the public `Image` class.
 */
InternalLibImage = /** @class */ (function (_super) {
    __extends(InternalLibImage, _super);
    function InternalLibImage(id, modal, plain, previouslyLoaded) {
        if (previouslyLoaded === void 0) { previouslyLoaded = false; }
        var _this = _super.call(this, id, modal, plain) || this;
        _this.previouslyLoaded = previouslyLoaded;
        return _this;
    }
    return InternalLibImage;
}(Image));

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
/** @enum {number} */
var Keyboard = {
    ESC: 27,
    LEFT_ARROW: 37,
    RIGHT_ARROW: 39,
    UP_ARROW: 38,
    DOWN_ARROW: 40,
};
Keyboard[Keyboard.ESC] = 'ESC';
Keyboard[Keyboard.LEFT_ARROW] = 'LEFT_ARROW';
Keyboard[Keyboard.RIGHT_ARROW] = 'RIGHT_ARROW';
Keyboard[Keyboard.UP_ARROW] = 'UP_ARROW';
Keyboard[Keyboard.DOWN_ARROW] = 'DOWN_ARROW';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @enum {number} */
var LoadingType = {
    STANDARD: 1,
    CIRCULAR: 2,
    BARS: 3,
    DOTS: 4,
    CUBE_FLIPPING: 5,
    CIRCLES: 6,
    EXPLOSING_SQUARES: 7,
};
LoadingType[LoadingType.STANDARD] = 'STANDARD';
LoadingType[LoadingType.CIRCULAR] = 'CIRCULAR';
LoadingType[LoadingType.BARS] = 'BARS';
LoadingType[LoadingType.DOTS] = 'DOTS';
LoadingType[LoadingType.CUBE_FLIPPING] = 'CUBE_FLIPPING';
LoadingType[LoadingType.CIRCLES] = 'CIRCLES';
LoadingType[LoadingType.EXPLOSING_SQUARES] = 'EXPLOSING_SQUARES';

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
/**
 * Utility function to get the index of the input `image` from `arrayOfImages`
 * @throws an Error if either image or arrayOfImages are not valid,
 *  or if the input image doesn't contain an 'id', or the 'id' is < 0
 * @param {?} image
 * @param {?} arrayOfImages
 * @return {?} number the index of the image. -1 if not found.
 */
function getIndex(image, arrayOfImages) {
    if (!image) {
        throw new Error('image must be a valid Image object');
    }
    if (!arrayOfImages) {
        throw new Error('arrayOfImages must be a valid Image[]');
    }
    if (!image.id && image.id !== 0) {
        // id = 0 is admitted
        throw new Error("A numeric Image 'id' is mandatory");
    }
    if (image.id < 0) {
        throw new Error("Image 'id' must be >= 0");
    }
    return arrayOfImages.findIndex(function (val) { return val.id === image.id; });
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Component with the current image with some additional elements like arrows and side previews.
 */
var CurrentImageComponent = /** @class */ (function (_super) {
    __extends(CurrentImageComponent, _super);
    function CurrentImageComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * Output to emit an event when images are loaded. The payload contains an `ImageLoadEvent`.
         */
        _this.loadImage = new EventEmitter();
        /**
         * Output to emit any changes of the current image. The payload contains an `ImageModalEvent`.
         */
        _this.changeImage = new EventEmitter();
        /**
         * Output to emit an event when the modal gallery is closed. The payload contains an `ImageModalEvent`.
         */
        _this.close = new EventEmitter();
        /**
         * Enum of type `Action` that represents a mouse click on a button.
         * Declared here to be used inside the template.
         */
        _this.clickAction = Action.CLICK;
        /**
         * Enum of type `Action` that represents a keyboard action.
         * Declared here to be used inside the template.
         */
        _this.keyboardAction = Action.KEYBOARD;
        /**
         * Boolean that it's true when you are watching the first image (currently visible).
         * False by default
         */
        _this.isFirstImage = false;
        /**
         * Boolean that it's true when you are watching the last image (currently visible).
         * False by default
         */
        _this.isLastImage = false;
        /**
         * Boolean that it's true if an image of the modal gallery is still loading.
         * True by default
         */
        _this.loading = true;
        /**
         * Private object without type to define all swipe actions used by hammerjs.
         */
        _this.SWIPE_ACTION = {
            LEFT: 'swipeleft',
            RIGHT: 'swiperight',
            UP: 'swipeup',
            DOWN: 'swipedown'
        };
        return _this;
    }
    /**
     * Method ´ngOnInit´ to build `configCurrentImage` applying default values.
     * This is an Angular's lifecycle hook, so its called automatically by Angular itself.
     * In particular, it's called only one time!!!
     */
    /**
     * Method ´ngOnInit´ to build `configCurrentImage` applying default values.
     * This is an Angular's lifecycle hook, so its called automatically by Angular itself.
     * In particular, it's called only one time!!!
     * @return {?}
     */
    CurrentImageComponent.prototype.ngOnInit = /**
     * Method ´ngOnInit´ to build `configCurrentImage` applying default values.
     * This is an Angular's lifecycle hook, so its called automatically by Angular itself.
     * In particular, it's called only one time!!!
     * @return {?}
     */
    function () {
        /** @type {?} */
        var defaultLoading = { enable: true, type: LoadingType.STANDARD };
        /** @type {?} */
        var defaultDescriptionStyle = {
            bgColor: 'rgba(0, 0, 0, .5)',
            textColor: 'white',
            marginTop: '0px',
            marginBottom: '0px',
            marginLeft: '0px',
            marginRight: '0px'
        };
        /** @type {?} */
        var defaultDescription = {
            strategy: DescriptionStrategy.ALWAYS_VISIBLE,
            imageText: 'Image ',
            numberSeparator: '/',
            beforeTextDescription: ' - ',
            style: defaultDescriptionStyle
        };
        /** @type {?} */
        var defaultCurrentImageConfig = {
            navigateOnClick: true,
            loadingConfig: defaultLoading,
            description: defaultDescription,
            downloadable: false,
            invertSwipe: false
        };
        this.configCurrentImage = Object.assign({}, defaultCurrentImageConfig, this.currentImageConfig);
        this.configCurrentImage.description = Object.assign({}, defaultDescription, this.configCurrentImage.description);
    };
    /**
     * Method ´ngOnChanges´ to update `loading` status and emit events.
     * If the gallery is open, then it will also manage boundary arrows and sliding.
     * This is an Angular's lifecycle hook, so its called automatically by Angular itself.
     * In particular, it's called when any data-bound property of a directive changes!!!
     */
    /**
     * Method ´ngOnChanges´ to update `loading` status and emit events.
     * If the gallery is open, then it will also manage boundary arrows and sliding.
     * This is an Angular's lifecycle hook, so its called automatically by Angular itself.
     * In particular, it's called when any data-bound property of a directive changes!!!
     * @param {?} changes
     * @return {?}
     */
    CurrentImageComponent.prototype.ngOnChanges = /**
     * Method ´ngOnChanges´ to update `loading` status and emit events.
     * If the gallery is open, then it will also manage boundary arrows and sliding.
     * This is an Angular's lifecycle hook, so its called automatically by Angular itself.
     * In particular, it's called when any data-bound property of a directive changes!!!
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        /** @type {?} */
        var images = changes["images"];
        /** @type {?} */
        var currentImage = changes["currentImage"];
        if (currentImage && currentImage.previousValue !== currentImage.currentValue) {
            this.updateIndexes();
        }
        else if (images && images.previousValue !== images.currentValue) {
            this.updateIndexes();
        }
    };
    /**
     * Method to handle keypress based on the `keyboardConfig` input. It gets the keyCode of
     * the key that triggered the keypress event to navigate between images or to close the modal gallery.
     * @param number keyCode of the key that triggered the keypress event
     */
    /**
     * Method to handle keypress based on the `keyboardConfig` input. It gets the keyCode of
     * the key that triggered the keypress event to navigate between images or to close the modal gallery.
     * @param {?} keyCode
     * @return {?}
     */
    CurrentImageComponent.prototype.onKeyPress = /**
     * Method to handle keypress based on the `keyboardConfig` input. It gets the keyCode of
     * the key that triggered the keypress event to navigate between images or to close the modal gallery.
     * @param {?} keyCode
     * @return {?}
     */
    function (keyCode) {
        /** @type {?} */
        var esc = this.keyboardConfig && this.keyboardConfig.esc ? this.keyboardConfig.esc : Keyboard.ESC;
        /** @type {?} */
        var right = this.keyboardConfig && this.keyboardConfig.right ? this.keyboardConfig.right : Keyboard.RIGHT_ARROW;
        /** @type {?} */
        var left = this.keyboardConfig && this.keyboardConfig.left ? this.keyboardConfig.left : Keyboard.LEFT_ARROW;
        switch (keyCode) {
            case esc:
                this.close.emit(new ImageModalEvent(Action.KEYBOARD, true));
                break;
            case right:
                this.nextImage(Action.KEYBOARD);
                break;
            case left:
                this.prevImage(Action.KEYBOARD);
                break;
        }
    };
    /**
     * Method to get the image description based on input params.
     * If you provide a full description this will be the visible description, otherwise,
     * it will be built using the `Description` object, concatenating its fields.
     * @param Image image to get its description. If not provided it will be the current image
     * @returns String description of the image (or the current image if not provided)
     * @throws an Error if description isn't available
     */
    /**
     * Method to get the image description based on input params.
     * If you provide a full description this will be the visible description, otherwise,
     * it will be built using the `Description` object, concatenating its fields.
     * @throws an Error if description isn't available
     * @param {?=} image
     * @return {?} String description of the image (or the current image if not provided)
     */
    CurrentImageComponent.prototype.getDescriptionToDisplay = /**
     * Method to get the image description based on input params.
     * If you provide a full description this will be the visible description, otherwise,
     * it will be built using the `Description` object, concatenating its fields.
     * @throws an Error if description isn't available
     * @param {?=} image
     * @return {?} String description of the image (or the current image if not provided)
     */
    function (image) {
        if (image === void 0) { image = this.currentImage; }
        if (!this.configCurrentImage || !this.configCurrentImage.description) {
            throw new Error('Description input must be a valid object implementing the Description interface');
        }
        /** @type {?} */
        var imageWithoutDescription = !image.modal || !image.modal.description || image.modal.description === '';
        switch (this.configCurrentImage.description.strategy) {
            case DescriptionStrategy.HIDE_IF_EMPTY:
                return imageWithoutDescription ? '' : image.modal.description + '';
            case DescriptionStrategy.ALWAYS_HIDDEN:
                return '';
            default:
                // ----------- DescriptionStrategy.ALWAYS_VISIBLE -----------------
                return this.buildTextDescription(image, imageWithoutDescription);
        }
    };
    /**
     * Method to get `alt attribute`.
     * `alt` specifies an alternate text for an image, if the image cannot be displayed.
     * @param Image image to get its alt description. If not provided it will be the current image
     * @returns String alt description of the image (or the current image if not provided)
     */
    /**
     * Method to get `alt attribute`.
     * `alt` specifies an alternate text for an image, if the image cannot be displayed.
     * @param {?=} image
     * @return {?} String alt description of the image (or the current image if not provided)
     */
    CurrentImageComponent.prototype.getAltDescriptionByImage = /**
     * Method to get `alt attribute`.
     * `alt` specifies an alternate text for an image, if the image cannot be displayed.
     * @param {?=} image
     * @return {?} String alt description of the image (or the current image if not provided)
     */
    function (image) {
        if (image === void 0) { image = this.currentImage; }
        if (!image) {
            return '';
        }
        return image.modal && image.modal.description ? image.modal.description : "Image " + (getIndex(image, this.images) + 1);
    };
    /**
     * Method to get the title attributes based on descriptions.
     * This is useful to prevent accessibility issues, because if DescriptionStrategy is ALWAYS_HIDDEN,
     * it prevents an empty string as title.
     * @param Image image to get its description. If not provided it will be the current image
     * @returns String title of the image based on descriptions
     * @throws an Error if description isn't available
     */
    /**
     * Method to get the title attributes based on descriptions.
     * This is useful to prevent accessibility issues, because if DescriptionStrategy is ALWAYS_HIDDEN,
     * it prevents an empty string as title.
     * @throws an Error if description isn't available
     * @param {?=} image
     * @return {?} String title of the image based on descriptions
     */
    CurrentImageComponent.prototype.getTitleToDisplay = /**
     * Method to get the title attributes based on descriptions.
     * This is useful to prevent accessibility issues, because if DescriptionStrategy is ALWAYS_HIDDEN,
     * it prevents an empty string as title.
     * @throws an Error if description isn't available
     * @param {?=} image
     * @return {?} String title of the image based on descriptions
     */
    function (image) {
        if (image === void 0) { image = this.currentImage; }
        if (!this.configCurrentImage || !this.configCurrentImage.description) {
            throw new Error('Description input must be a valid object implementing the Description interface');
        }
        /** @type {?} */
        var imageWithoutDescription = !image.modal || !image.modal.description || image.modal.description === '';
        /** @type {?} */
        var description = this.buildTextDescription(image, imageWithoutDescription);
        return description;
    };
    /**
     * Method to get the left side preview image.
     * @returns Image the image to show as size preview on the left
     */
    /**
     * Method to get the left side preview image.
     * @return {?} Image the image to show as size preview on the left
     */
    CurrentImageComponent.prototype.getLeftPreviewImage = /**
     * Method to get the left side preview image.
     * @return {?} Image the image to show as size preview on the left
     */
    function () {
        /** @type {?} */
        var currentIndex = getIndex(this.currentImage, this.images);
        if (currentIndex === 0 && this.slideConfig.infinite) {
            // the current image is the first one,
            // so the previous one is the last image
            // because infinite is true
            return this.images[this.images.length - 1];
        }
        this.handleBoundaries(currentIndex);
        return this.images[Math.max(currentIndex - 1, 0)];
    };
    /**
     * Method to get the right side preview image.
     * @returns Image the image to show as size preview on the right
     */
    /**
     * Method to get the right side preview image.
     * @return {?} Image the image to show as size preview on the right
     */
    CurrentImageComponent.prototype.getRightPreviewImage = /**
     * Method to get the right side preview image.
     * @return {?} Image the image to show as size preview on the right
     */
    function () {
        /** @type {?} */
        var currentIndex = getIndex(this.currentImage, this.images);
        if (currentIndex === this.images.length - 1 && this.slideConfig.infinite) {
            // the current image is the last one,
            // so the next one is the first image
            // because infinite is true
            return this.images[0];
        }
        this.handleBoundaries(currentIndex);
        return this.images[Math.min(currentIndex + 1, this.images.length - 1)];
    };
    /**
     * Method called by events from both keyboard and mouse on an image.
     * This will invoke the nextImage method.
     * @param KeyboardEvent | MouseEvent event payload
     * @param Action action that triggered the event or `Action.NORMAL` if not provided
     */
    /**
     * Method called by events from both keyboard and mouse on an image.
     * This will invoke the nextImage method.
     * @param {?} event
     * @param {?=} action
     * @return {?}
     */
    CurrentImageComponent.prototype.onImageEvent = /**
     * Method called by events from both keyboard and mouse on an image.
     * This will invoke the nextImage method.
     * @param {?} event
     * @param {?=} action
     * @return {?}
     */
    function (event, action) {
        if (action === void 0) { action = Action.NORMAL; }
        // check if triggered by a mouse click
        // If yes, It should block navigation when navigateOnClick is false
        if (action === Action.CLICK && !this.configCurrentImage.navigateOnClick) {
            // a user has requested to block navigation via configCurrentImage.navigateOnClick property
            return;
        }
        /** @type {?} */
        var result = _super.prototype.handleImageEvent.call(this, event);
        if (result === NEXT) {
            this.nextImage(action);
        }
    };
    /**
     * Method called by events from both keyboard and mouse on a navigation arrow.
     * @param string direction of the navigation that can be either 'next' or 'prev'
     * @param KeyboardEvent | MouseEvent event payload
     * @param Action action that triggered the event or `Action.NORMAL` if not provided
     */
    /**
     * Method called by events from both keyboard and mouse on a navigation arrow.
     * @param {?} direction
     * @param {?} event
     * @param {?=} action
     * @return {?}
     */
    CurrentImageComponent.prototype.onNavigationEvent = /**
     * Method called by events from both keyboard and mouse on a navigation arrow.
     * @param {?} direction
     * @param {?} event
     * @param {?=} action
     * @return {?}
     */
    function (direction, event, action) {
        if (action === void 0) { action = Action.NORMAL; }
        /** @type {?} */
        var result = _super.prototype.handleNavigationEvent.call(this, direction, event);
        if (result === NEXT) {
            this.nextImage(action);
        }
        else if (result === PREV) {
            this.prevImage(action);
        }
    };
    /**
     * Method to go back to the previous image.
     * @param action Enum of type `Action` that represents the source
     *  action that moved back to the previous image. `Action.NORMAL` by default.
     */
    /**
     * Method to go back to the previous image.
     * @param {?=} action Enum of type `Action` that represents the source
     *  action that moved back to the previous image. `Action.NORMAL` by default.
     * @return {?}
     */
    CurrentImageComponent.prototype.prevImage = /**
     * Method to go back to the previous image.
     * @param {?=} action Enum of type `Action` that represents the source
     *  action that moved back to the previous image. `Action.NORMAL` by default.
     * @return {?}
     */
    function (action) {
        if (action === void 0) { action = Action.NORMAL; }
        // check if prevImage should be blocked
        if (this.isPreventSliding(0)) {
            return;
        }
        /** @type {?} */
        var prevImage = this.getPrevImage();
        this.loading = !prevImage.previouslyLoaded;
        this.changeImage.emit(new ImageModalEvent(action, getIndex(prevImage, this.images)));
    };
    /**
     * Method to go back to the previous image.
     * @param action Enum of type `Action` that represents the source
     *  action that moved to the next image. `Action.NORMAL` by default.
     */
    /**
     * Method to go back to the previous image.
     * @param {?=} action Enum of type `Action` that represents the source
     *  action that moved to the next image. `Action.NORMAL` by default.
     * @return {?}
     */
    CurrentImageComponent.prototype.nextImage = /**
     * Method to go back to the previous image.
     * @param {?=} action Enum of type `Action` that represents the source
     *  action that moved to the next image. `Action.NORMAL` by default.
     * @return {?}
     */
    function (action) {
        if (action === void 0) { action = Action.NORMAL; }
        // check if nextImage should be blocked
        if (this.isPreventSliding(this.images.length - 1)) {
            return;
        }
        /** @type {?} */
        var nextImage = this.getNextImage();
        this.loading = !nextImage.previouslyLoaded;
        this.changeImage.emit(new ImageModalEvent(action, getIndex(nextImage, this.images)));
    };
    /**
     * Method to emit an event as loadImage output to say that the requested image if loaded.
     * This method is invoked by the javascript's 'load' event on an img tag.
     * @param Event event that triggered the load
     */
    /**
     * Method to emit an event as loadImage output to say that the requested image if loaded.
     * This method is invoked by the javascript's 'load' event on an img tag.
     * @param {?} event
     * @return {?}
     */
    CurrentImageComponent.prototype.onImageLoad = /**
     * Method to emit an event as loadImage output to say that the requested image if loaded.
     * This method is invoked by the javascript's 'load' event on an img tag.
     * @param {?} event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var loadImageData = {
            status: true,
            index: getIndex(this.currentImage, this.images),
            id: this.currentImage.id
        };
        this.loadImage.emit(loadImageData);
        this.loading = false;
    };
    /**
     * Method used by Hammerjs to support touch gestures (you can also invert the swipe direction with configCurrentImage.invertSwipe).
     * @param action String that represent the direction of the swipe action. 'swiperight' by default.
     */
    /**
     * Method used by Hammerjs to support touch gestures (you can also invert the swipe direction with configCurrentImage.invertSwipe).
     * @param {?=} action String that represent the direction of the swipe action. 'swiperight' by default.
     * @return {?}
     */
    CurrentImageComponent.prototype.swipe = /**
     * Method used by Hammerjs to support touch gestures (you can also invert the swipe direction with configCurrentImage.invertSwipe).
     * @param {?=} action String that represent the direction of the swipe action. 'swiperight' by default.
     * @return {?}
     */
    function (action) {
        if (action === void 0) { action = this.SWIPE_ACTION.RIGHT; }
        switch (action) {
            case this.SWIPE_ACTION.RIGHT:
                if (this.configCurrentImage.invertSwipe) {
                    this.prevImage(Action.SWIPE);
                }
                else {
                    this.nextImage(Action.SWIPE);
                }
                break;
            case this.SWIPE_ACTION.LEFT:
                if (this.configCurrentImage.invertSwipe) {
                    this.nextImage(Action.SWIPE);
                }
                else {
                    this.prevImage(Action.SWIPE);
                }
                break;
        }
    };
    /**
     * Method used in `modal-gallery.component` to get the index of an image to delete.
     * @param Image image to get the index, or the visible image, if not passed
     * @returns number the index of the image
     */
    /**
     * Method used in `modal-gallery.component` to get the index of an image to delete.
     * @param {?=} image
     * @return {?} number the index of the image
     */
    CurrentImageComponent.prototype.getIndexToDelete = /**
     * Method used in `modal-gallery.component` to get the index of an image to delete.
     * @param {?=} image
     * @return {?} number the index of the image
     */
    function (image) {
        if (image === void 0) { image = this.currentImage; }
        return getIndex(image, this.images);
    };
    /**
     * Private method to update both `isFirstImage` and `isLastImage` based on
     * the index of the current image.
     * @param {?} currentIndex
     * @return {?}
     */
    CurrentImageComponent.prototype.handleBoundaries = /**
     * Private method to update both `isFirstImage` and `isLastImage` based on
     * the index of the current image.
     * @param {?} currentIndex
     * @return {?}
     */
    function (currentIndex) {
        if (this.images.length === 1) {
            this.isFirstImage = true;
            this.isLastImage = true;
            return;
        }
        if (!this.slideConfig || this.slideConfig.infinite === true) {
            // infinite sliding enabled
            this.isFirstImage = false;
            this.isLastImage = false;
        }
        else {
            switch (currentIndex) {
                case 0:
                    // execute this only if infinite sliding is disabled
                    this.isFirstImage = true;
                    this.isLastImage = false;
                    break;
                case this.images.length - 1:
                    // execute this only if infinite sliding is disabled
                    this.isFirstImage = false;
                    this.isLastImage = true;
                    break;
                default:
                    this.isFirstImage = false;
                    this.isLastImage = false;
                    break;
            }
        }
    };
    /**
     * Private method to check if next/prev actions should be blocked.
     * It checfg if slideConfig.infinite === false and if the image index is equals to the input parameter.
     * If yes, it returns true to say that sliding should be blocked, otherwise not.
     * @param {?} boundaryIndex
     * @return {?} boolean true if slideConfig.infinite === false and the current index is
     *  either the first or the last one.
     */
    CurrentImageComponent.prototype.isPreventSliding = /**
     * Private method to check if next/prev actions should be blocked.
     * It checfg if slideConfig.infinite === false and if the image index is equals to the input parameter.
     * If yes, it returns true to say that sliding should be blocked, otherwise not.
     * @param {?} boundaryIndex
     * @return {?} boolean true if slideConfig.infinite === false and the current index is
     *  either the first or the last one.
     */
    function (boundaryIndex) {
        return !!this.slideConfig && this.slideConfig.infinite === false && getIndex(this.currentImage, this.images) === boundaryIndex;
    };
    /**
     * Private method to get the next index.
     * This is necessary because at the end, when you call next again, you'll go to the first image.
     * That happens because all modal images are shown like in a circle.
     * @return {?}
     */
    CurrentImageComponent.prototype.getNextImage = /**
     * Private method to get the next index.
     * This is necessary because at the end, when you call next again, you'll go to the first image.
     * That happens because all modal images are shown like in a circle.
     * @return {?}
     */
    function () {
        /** @type {?} */
        var currentIndex = getIndex(this.currentImage, this.images);
        /** @type {?} */
        var newIndex = 0;
        if (currentIndex >= 0 && currentIndex < this.images.length - 1) {
            newIndex = currentIndex + 1;
        }
        else {
            newIndex = 0; // start from the first index
        }
        return this.images[newIndex];
    };
    /**
     * Private method to get the previous index.
     * This is necessary because at index 0, when you call prev again, you'll go to the last image.
     * That happens because all modal images are shown like in a circle.
     * @return {?}
     */
    CurrentImageComponent.prototype.getPrevImage = /**
     * Private method to get the previous index.
     * This is necessary because at index 0, when you call prev again, you'll go to the last image.
     * That happens because all modal images are shown like in a circle.
     * @return {?}
     */
    function () {
        /** @type {?} */
        var currentIndex = getIndex(this.currentImage, this.images);
        /** @type {?} */
        var newIndex = 0;
        if (currentIndex > 0 && currentIndex <= this.images.length - 1) {
            newIndex = currentIndex - 1;
        }
        else {
            newIndex = this.images.length - 1; // start from the last index
        }
        return this.images[newIndex];
    };
    /**
     * Private method to build a text description.
     * This is used also to create titles.
     * @param {?} image
     * @param {?} imageWithoutDescription
     * @return {?} String description built concatenating image fields with a specific logic.
     */
    CurrentImageComponent.prototype.buildTextDescription = /**
     * Private method to build a text description.
     * This is used also to create titles.
     * @param {?} image
     * @param {?} imageWithoutDescription
     * @return {?} String description built concatenating image fields with a specific logic.
     */
    function (image, imageWithoutDescription) {
        if (!this.configCurrentImage || !this.configCurrentImage.description) {
            throw new Error('Description input must be a valid object implementing the Description interface');
        }
        // If customFullDescription use it, otherwise proceed to build a description
        if (this.configCurrentImage.description.customFullDescription && this.configCurrentImage.description.customFullDescription !== '') {
            return this.configCurrentImage.description.customFullDescription;
        }
        /** @type {?} */
        var currentIndex = getIndex(image, this.images);
        /** @type {?} */
        var prevDescription = this.configCurrentImage.description.imageText ? this.configCurrentImage.description.imageText : '';
        /** @type {?} */
        var midSeparator = this.configCurrentImage.description.numberSeparator ? this.configCurrentImage.description.numberSeparator : '';
        /** @type {?} */
        var middleDescription = currentIndex + 1 + midSeparator + this.images.length;
        if (imageWithoutDescription) {
            return prevDescription + middleDescription;
        }
        /** @type {?} */
        var currImgDescription = image.modal && image.modal.description ? image.modal.description : '';
        /** @type {?} */
        var endDescription = this.configCurrentImage.description.beforeTextDescription + currImgDescription;
        return prevDescription + middleDescription + endDescription;
    };
    /**
     * Private method to call handleBoundaries when ngOnChanges is called.
     * @return {?}
     */
    CurrentImageComponent.prototype.updateIndexes = /**
     * Private method to call handleBoundaries when ngOnChanges is called.
     * @return {?}
     */
    function () {
        /** @type {?} */
        var index;
        try {
            index = getIndex(this.currentImage, this.images);
        }
        catch (err) {
            console.error('Cannot get the current image index in current-image');
            throw err;
        }
        if (this.isOpen) {
            this.handleBoundaries(index);
        }
    };
    CurrentImageComponent.decorators = [
        { type: Component, args: [{
                    selector: 'fg-current-image',
                    template: "<main class=\"main-image-container\"\n      fgKeyboardNavigation [isOpen]=\"isOpen\" (keyPress)=\"onKeyPress($event)\"\n      [attr.aria-label]=\"accessibilityConfig.mainContainerAriaLabel\"\n      [title]=\"accessibilityConfig.mainContainerTitle\">\n\n  <div class=\"left-sub-container\">\n    <a class=\"nav-left\"\n       [attr.aria-label]=\"accessibilityConfig.mainPrevImageAriaLabel\"\n       [tabindex]=\"isFirstImage ? -1 : 0\" role=\"button\"\n       (click)=\"onNavigationEvent('left', $event)\" (keyup)=\"onNavigationEvent('left', $event)\">\n      <div class=\"inside {{isFirstImage ? 'empty-arrow-image' : 'left-arrow-image'}}\"\n           aria-hidden=\"true\"\n           [title]=\"accessibilityConfig.mainPrevImageTitle\"></div>\n    </a>\n\n    <ng-container *ngIf=\"slideConfig?.sidePreviews?.show\">\n      <ng-container *ngIf=\"getLeftPreviewImage() as leftPreview\">\n        <img *ngIf=\"!isFirstImage; else firstImage\"\n             class=\"inside current-image-previous\"\n             [src]=\"leftPreview.plain?.img ? leftPreview.plain.img : leftPreview.modal.img\"\n             [hidden]=\"loading\"\n             fgSize [sizeConfig]=\"{width: slideConfig.sidePreviews?.size.width, height: slideConfig.sidePreviews?.size.height}\"\n             [attr.aria-label]=\"leftPreview.modal.ariaLabel\"\n             [title]=\"leftPreview.modal.title ? leftPreview.modal.title : getDescriptionToDisplay(leftPreview)\"\n             alt=\"{{leftPreview.modal.alt ? leftPreview.modal.alt : getAltDescriptionByImage(leftPreview)}}\"\n             [tabindex]=\"0\" role=\"img\"\n             (click)=\"onNavigationEvent('left', $event, clickAction)\" (keyup)=\"onNavigationEvent('left', $event, keyboardAction)\"/>\n        <ng-template #firstImage>\n          <div class=\"current-image-previous hidden\"\n               fgSize [sizeConfig]=\"{width: slideConfig.sidePreviews?.size.width, height: slideConfig.sidePreviews?.size.height}\"></div>\n        </ng-template>\n      </ng-container>\n    </ng-container>\n  </div>\n\n\n  <figure id=\"current-figure\" [style.display]=\"loading ? 'none' : ''\">\n    <img id=\"current-image\"\n         class=\"inside\"\n         [src]=\"currentImage.modal.img\"\n         [attr.aria-label]=\"currentImage.modal.ariaLabel\"\n         [title]=\"currentImage.modal.title ? currentImage.modal.title : getTitleToDisplay()\"\n         alt=\"{{currentImage.modal.alt ? currentImage.modal.alt : getAltDescriptionByImage()}}\"\n         [tabindex]=\"0\" role=\"img\"\n         (load)=\"onImageLoad($event)\"\n         (click)=\"onImageEvent($event, clickAction)\" (keyup)=\"onImageEvent($event, keyboardAction)\"\n         (swipeleft)=\"swipe($event.type)\"\n         (swiperight)=\"swipe($event.type)\"/>\n    <figcaption *ngIf=\"getDescriptionToDisplay() !== ''\"\n                class=\"inside description\"\n                fgDescription [description]=\"configCurrentImage?.description\"\n                [innerHTML]=\"getDescriptionToDisplay()\">\n    </figcaption>\n  </figure>\n\n  <div class=\"right-sub-container\">\n    <ng-container *ngIf=\"slideConfig?.sidePreviews?.show\">\n      <ng-container *ngIf=\"getRightPreviewImage() as rightPreview\">\n        <img *ngIf=\"!isLastImage; else lastImage\"\n             class=\"inside current-image-next\"\n             [src]=\"rightPreview.plain?.img ? rightPreview.plain.img : rightPreview.modal.img\"\n             [hidden]=\"loading\"\n             fgSize [sizeConfig]=\"{width: slideConfig.sidePreviews?.size.width, height: slideConfig.sidePreviews?.size.height}\"\n             [attr.aria-label]=\"rightPreview.modal.ariaLabel\"\n             [title]=\"rightPreview.modal.title ? rightPreview.modal.title : getDescriptionToDisplay(rightPreview)\"\n             alt=\"{{rightPreview.modal.alt ? rightPreview.modal.alt : getAltDescriptionByImage(rightPreview)}}\"\n             [tabindex]=\"0\" role=\"img\"\n             (click)=\"onNavigationEvent('right', $event, clickAction)\" (keyup)=\"onNavigationEvent('right', $event, keyboardAction)\"/>\n        <ng-template #lastImage>\n          <div class=\"current-image-next hidden\"\n               fgSize [sizeConfig]=\"{width: slideConfig.sidePreviews?.size.width, height: slideConfig.sidePreviews?.size.height}\">\n          </div>\n        </ng-template>\n      </ng-container>\n    </ng-container>\n\n    <ng-container *ngIf=\"loading && configCurrentImage?.loadingConfig?.enable\">\n      <fg-loading-spinner [loadingConfig]=\"configCurrentImage?.loadingConfig\"\n                          [accessibilityConfig]=\"accessibilityConfig\"></fg-loading-spinner>\n    </ng-container>\n\n    <a class=\"nav-right\"\n       [attr.aria-label]=\"accessibilityConfig.mainNextImageAriaLabel\"\n       [tabindex]=\"isLastImage ? -1 : 0\" role=\"button\"\n       (click)=\"onNavigationEvent('right', $event)\" (keyup)=\"onNavigationEvent('right', $event)\">\n      <div class=\"inside {{isLastImage ? 'empty-arrow-image' : 'right-arrow-image'}}\"\n           aria-hidden=\"true\"\n           [title]=\"accessibilityConfig.mainNextImageTitle\"></div>\n    </a>\n  </div>\n</main>\n",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: [":host{display:flex;flex-direction:column;justify-content:center}.main-image-container{display:flex;flex-direction:row;align-items:center;justify-content:space-between}.main-image-container .nav,.main-image-container>.left-sub-container>.nav-left,.main-image-container>.right-sub-container>.nav-right{-webkit-animation:1s animatezoom;animation:1s animatezoom;cursor:pointer;transition:.5s}.main-image-container .nav:hover,.main-image-container>.left-sub-container>.nav-left:hover,.main-image-container>.right-sub-container>.nav-right:hover{-webkit-transform:scale(1.1);transform:scale(1.1)}.main-image-container>.left-sub-container{display:flex;flex-direction:row;justify-content:space-around;align-items:center}.main-image-container>.left-sub-container>.nav-left{margin-right:5px;margin-left:15px}.main-image-container>.right-sub-container{display:flex;flex-direction:row;justify-content:space-around;align-items:center}.main-image-container>.right-sub-container>.nav-right{margin-right:15px;margin-left:5px}#current-image{height:auto;max-width:80vw;max-height:60vh;cursor:pointer}@media screen and (min-width:70vw){#current-image{height:auto;max-width:70vw;max-height:60vh;cursor:pointer}}#current-figure{-webkit-animation:.8s fadein-visible;animation:.8s fadein-visible;text-align:center}figure{margin:0;position:relative}figure img{max-width:100%;height:auto;display:block}figcaption{padding:10px;position:absolute;bottom:0;left:0;right:0}.description{font-weight:700;text-align:center}@-webkit-keyframes fadein-visible{from{opacity:0}to{opacity:1}}@keyframes fadein-visible{from{opacity:0}to{opacity:1}}@-webkit-keyframes fadein-semi-visible05{from{opacity:0}to{opacity:.5}}@keyframes fadein-semi-visible05{from{opacity:0}to{opacity:.5}}@-webkit-keyframes fadein-semi-visible08{from{opacity:0}to{opacity:.8}}@keyframes fadein-semi-visible08{from{opacity:0}to{opacity:.8}}@-webkit-keyframes fadein-semi-visible09{from{opacity:0}to{opacity:.9}}@keyframes fadein-semi-visible09{from{opacity:0}to{opacity:.9}}", ".arrow-image,.empty-arrow-image,.left-arrow-image,.right-arrow-image{width:30px;height:30px;background-size:30px}.empty-arrow-image{background:#000;opacity:0}.left-arrow-image{background-image:url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/PjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDQ3Ny4xNzUgNDc3LjE3NSIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNDc3LjE3NSA0NzcuMTc1OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjUxMnB4IiBoZWlnaHQ9IjUxMnB4Ij48Zz48cGF0aCBkPSJNMTQ1LjE4OCwyMzguNTc1bDIxNS41LTIxNS41YzUuMy01LjMsNS4zLTEzLjgsMC0xOS4xcy0xMy44LTUuMy0xOS4xLDBsLTIyNS4xLDIyNS4xYy01LjMsNS4zLTUuMywxMy44LDAsMTkuMWwyMjUuMSwyMjUgICBjMi42LDIuNiw2LjEsNCw5LjUsNHM2LjktMS4zLDkuNS00YzUuMy01LjMsNS4zLTEzLjgsMC0xOS4xTDE0NS4xODgsMjM4LjU3NXoiIGZpbGw9IiNGRkZGRkYiLz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PC9zdmc+);opacity:.8;transition:.5s}.left-arrow-image:hover{-webkit-transform:scale(1.2);transform:scale(1.2)}.right-arrow-image{background-image:url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/PjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDQ3Ny4xNzUgNDc3LjE3NSIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNDc3LjE3NSA0NzcuMTc1OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjUxMnB4IiBoZWlnaHQ9IjUxMnB4Ij48Zz48cGF0aCBkPSJNMzYwLjczMSwyMjkuMDc1bC0yMjUuMS0yMjUuMWMtNS4zLTUuMy0xMy44LTUuMy0xOS4xLDBzLTUuMywxMy44LDAsMTkuMWwyMTUuNSwyMTUuNWwtMjE1LjUsMjE1LjUgICBjLTUuMyw1LjMtNS4zLDEzLjgsMCwxOS4xYzIuNiwyLjYsNi4xLDQsOS41LDRjMy40LDAsNi45LTEuMyw5LjUtNGwyMjUuMS0yMjUuMUMzNjUuOTMxLDI0Mi44NzUsMzY1LjkzMSwyMzQuMjc1LDM2MC43MzEsMjI5LjA3NXogICAiIGZpbGw9IiNGRkZGRkYiLz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PC9zdmc+);opacity:.8;transition:.5s}.right-arrow-image:hover{-webkit-transform:scale(1.2);transform:scale(1.2)}", "@media only screen and (max-width:1024px),only screen and (max-device-width:1024px){.current-image-next,.current-image-previous{display:none}}@media only screen and (min-device-width:1025px){.current-image-next,.current-image-preview,.current-image-previous{height:auto;cursor:pointer;opacity:.5;-webkit-animation:.8s fadein-semi-visible05;animation:.8s fadein-semi-visible05}.current-image-next:hover,.current-image-preview:hover,.current-image-previous:hover{opacity:1;transition:.5s}.current-image-previous{margin-left:10px;margin-right:5px}.current-image-next{margin-right:10px;margin-left:5px}}@-webkit-keyframes fadein-semi-visible05{from{opacity:0}to{opacity:.5}}@keyframes fadein-semi-visible05{from{opacity:0}to{opacity:.5}}"]
                }] }
    ];
    CurrentImageComponent.propDecorators = {
        currentImage: [{ type: Input }],
        images: [{ type: Input }],
        isOpen: [{ type: Input }],
        currentImageConfig: [{ type: Input }],
        slideConfig: [{ type: Input }],
        accessibilityConfig: [{ type: Input }],
        keyboardConfig: [{ type: Input }],
        loadImage: [{ type: Output }],
        changeImage: [{ type: Output }],
        close: [{ type: Output }]
    };
    return CurrentImageComponent;
}(AccessibleComponent));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Class `LineLayout` to configure a linear plain gallery.
 */
var  /**
 * Class `LineLayout` to configure a linear plain gallery.
 */
LineLayout = /** @class */ (function () {
    function LineLayout(size, breakConfig, justify) {
        this.size = size;
        this.breakConfig = breakConfig;
        this.justify = justify;
    }
    return LineLayout;
}());
/**
 * Class `GridLayout` to configure a grid plain gallery.
 */
var  /**
 * Class `GridLayout` to configure a grid plain gallery.
 */
GridLayout = /** @class */ (function () {
    function GridLayout(size, breakConfig) {
        this.size = size;
        this.breakConfig = breakConfig;
    }
    return GridLayout;
}());
/**
 * Class `AdvancedLayout` to configure a fully custom plain gallery.
 */
var  /**
 * Class `AdvancedLayout` to configure a fully custom plain gallery.
 */
AdvancedLayout = /** @class */ (function () {
    function AdvancedLayout(modalOpenerByIndex, hideDefaultPlainGallery) {
        this.modalOpenerByIndex = modalOpenerByIndex;
        this.hideDefaultPlainGallery = hideDefaultPlainGallery;
    }
    return AdvancedLayout;
}());
/** @enum {number} */
var PlainGalleryStrategy = {
    // don't use 0 here
    // the first index is 1 and all of the following members are auto-incremented from that point on
    ROW: 1,
    COLUMN: 2,
    GRID: 3,
    CUSTOM: 4 // full custom strategy
    ,
};
PlainGalleryStrategy[PlainGalleryStrategy.ROW] = 'ROW';
PlainGalleryStrategy[PlainGalleryStrategy.COLUMN] = 'COLUMN';
PlainGalleryStrategy[PlainGalleryStrategy.GRID] = 'GRID';
PlainGalleryStrategy[PlainGalleryStrategy.CUSTOM] = 'CUSTOM';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** *
 * Default accessibility configuration.
  @type {?} */
var fg_DEFAULT_ACCESSIBILITY_CONFIG = {
    backgroundAriaLabel: 'Modal gallery full screen background',
    backgroundTitle: '',
    plainGalleryContentAriaLabel: 'Plain gallery content',
    plainGalleryContentTitle: '',
    modalGalleryContentAriaLabel: 'Modal gallery content',
    modalGalleryContentTitle: '',
    loadingSpinnerAriaLabel: 'The current image is loading. Please be patient.',
    loadingSpinnerTitle: 'The current image is loading. Please be patient.',
    mainContainerAriaLabel: 'Current image and navigation',
    mainContainerTitle: '',
    mainPrevImageAriaLabel: 'Previous image',
    mainPrevImageTitle: 'Previous image',
    mainNextImageAriaLabel: 'Next image',
    mainNextImageTitle: 'Next image',
    dotsContainerAriaLabel: 'Image navigation dots',
    dotsContainerTitle: '',
    dotAriaLabel: 'Navigate to image number',
    previewsContainerAriaLabel: 'Image previews',
    previewsContainerTitle: '',
    previewScrollPrevAriaLabel: 'Scroll previous previews',
    previewScrollPrevTitle: 'Scroll previous previews',
    previewScrollNextAriaLabel: 'Scroll next previews',
    previewScrollNextTitle: 'Scroll next previews'
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Main Component of this library with both the plain and modal galleries.
 */
var ModalGalleryComponent = /** @class */ (function () {
    /**
     * Constructor with the injection of ´KeyboardService´ and an object to support Server-Side Rendering.
     */
    function ModalGalleryComponent(keyboardService, galleryService, platformId, changeDetectorRef) {
        this.keyboardService = keyboardService;
        this.galleryService = galleryService;
        this.platformId = platformId;
        this.changeDetectorRef = changeDetectorRef;
        /**
         * Boolean to enable modal-gallery close behaviour when clicking
         * on the semi-transparent background. Enabled by default.
         */
        this.enableCloseOutside = true;
        /**
         * Object of type `SlideConfig` to init side previews and `infinite sliding`.
         */
        this.slideConfig = {
            infinite: false,
            sidePreviews: { show: true, size: { width: '100px', height: 'auto' } }
        };
        /**
         * Object of type `AccessibilityConfig` to init custom accessibility features.
         * For instance, it contains titles, alt texts, aria-labels and so on.
         */
        this.accessibilityConfig = fg_DEFAULT_ACCESSIBILITY_CONFIG;
        /**
         * Output to emit an event when the modal gallery is closed.
         */
        this.close = new EventEmitter();
        /**
         * Output to emit an event when an image is changed.
         */
        this.show = new EventEmitter();
        /**
         * Output to emit an event when the current image is the first one.
         */
        this.firstImage = new EventEmitter();
        /**
         * Output to emit an event when the current image is the last one.
         */
        this.lastImage = new EventEmitter();
        /**
         * Output to emit an event when the modal gallery is closed.
         */
        this.hasData = new EventEmitter();
        /**
         * Output to emit an event when a button is clicked, but before that the action is triggered.
         */
        this.buttonBeforeHook = new EventEmitter();
        /**
         * Output to emit an event when a button is clicked, but after that the action is triggered.
         */
        this.buttonAfterHook = new EventEmitter();
        /**
         * Boolean that it is true if the modal gallery is visible. False by default.
         */
        this.opened = false;
        /**
         * Boolean to open the modal gallery. False by default.
         */
        this.showGallery = false;
    }
    /**
     * HostListener to catch browser's back button and destroy the gallery.
     * This prevents weired behaviour about scrolling.
     * Added to fix this issue: https://github.com/fg96/angular-modal-gallery/issues/159
     */
    /**
     * HostListener to catch browser's back button and destroy the gallery.
     * This prevents weired behaviour about scrolling.
     * Added to fix this issue: https://github.com/fg96/angular-modal-gallery/issues/159
     * @param {?} e
     * @return {?}
     */
    ModalGalleryComponent.prototype.onPopState = /**
     * HostListener to catch browser's back button and destroy the gallery.
     * This prevents weired behaviour about scrolling.
     * Added to fix this issue: https://github.com/fg96/angular-modal-gallery/issues/159
     * @param {?} e
     * @return {?}
     */
    function (e) {
        this.closeGallery();
    };
    /**
     * Method ´ngOnInit´ to init images calling `initImages()`.
     * This is an Angular's lifecycle hook, so its called automatically by Angular itself.
     * In particular, it's called only one time!!!
     */
    /**
     * Method ´ngOnInit´ to init images calling `initImages()`.
     * This is an Angular's lifecycle hook, so its called automatically by Angular itself.
     * In particular, it's called only one time!!!
     * @return {?}
     */
    ModalGalleryComponent.prototype.ngOnInit = /**
     * Method ´ngOnInit´ to init images calling `initImages()`.
     * This is an Angular's lifecycle hook, so its called automatically by Angular itself.
     * In particular, it's called only one time!!!
     * @return {?}
     */
    function () {
        var _this = this;
        // id is a mandatory input and must a number > 0
        if ((!this.id && this.id !== 0) || this.id < 0) {
            throw new Error("'[id]=\"a number >= 0\"' is a mandatory input from 6.0.0 in angular-modal-gallery." +
                "If you are using multiple instances of this library, please be sure to use different ids");
        }
        // call initImages to init images and to emit `hasData` event
        this.initImages();
        this.galleryServiceNavigateSubscription = this.galleryService.navigate.subscribe(function (payload) {
            if (!payload) {
                return;
            }
            // if galleryId is not valid OR galleryId is related to another instance and not this one
            if (payload.galleryId === undefined || payload.galleryId < 0 || payload.galleryId !== _this.id) {
                return;
            }
            // if image index is not valid
            if (payload.index < 0 || payload.index > _this.images.length) {
                return;
            }
            _this.showModalGallery(payload.index, true);
        });
        this.galleryServiceCloseSubscription = this.galleryService.close.subscribe(function (galleryId) {
            if (galleryId < 0 || _this.id !== galleryId) {
                return;
            }
            _this.closeGallery(Action.NORMAL, true);
        });
        this.galleryServiceUpdateSubscription = this.galleryService.update.subscribe(function (payload) {
            if (!payload) {
                return;
            }
            // if galleryId is not valid OR galleryId is related to another instance and not this one
            if (payload.galleryId === undefined || payload.galleryId < 0 || payload.galleryId !== _this.id) {
                return;
            }
            // if either image index or image are not valid
            if (payload.index < 0 || payload.index > _this.images.length || !payload.image) {
                return;
            }
            /** @type {?} */
            var currentIndex = getIndex(payload.image, _this.images);
            _this.images = _this.images.map(function (image, index) {
                if (index === payload.index) {
                    return /** @type {?} */ (payload.image);
                }
                return image;
            });
            if (currentIndex === payload.index) {
                _this.currentImage = _this.images[payload.index];
            }
            _this.changeDetectorRef.markForCheck();
        });
    };
    /**
     * Method ´ngOnChanges´ to re-init images if input is changed.
     * This is an Angular's lifecycle hook, so its called automatically by Angular itself.
     * In particular, it's called before `ngOnInit()` and whenever one or more data-bound input properties change.
     * @param changes `SimpleChanges` object of current and previous property values provided by Angular.
     */
    /**
     * Method ´ngOnChanges´ to re-init images if input is changed.
     * This is an Angular's lifecycle hook, so its called automatically by Angular itself.
     * In particular, it's called before `ngOnInit()` and whenever one or more data-bound input properties change.
     * @param {?} changes `SimpleChanges` object of current and previous property values provided by Angular.
     * @return {?}
     */
    ModalGalleryComponent.prototype.ngOnChanges = /**
     * Method ´ngOnChanges´ to re-init images if input is changed.
     * This is an Angular's lifecycle hook, so its called automatically by Angular itself.
     * In particular, it's called before `ngOnInit()` and whenever one or more data-bound input properties change.
     * @param {?} changes `SimpleChanges` object of current and previous property values provided by Angular.
     * @return {?}
     */
    function (changes) {
        /** @type {?} */
        var imagesChange = changes["modalImages"];
        /** @type {?} */
        var plainGalleryConfigChange = changes["plainGalleryConfig"];
        if (imagesChange && !imagesChange.firstChange && imagesChange.previousValue !== imagesChange.currentValue) {
            this.initImages();
        }
        if (plainGalleryConfigChange) {
            /** @type {?} */
            var currPlainGalleryConfigChange = plainGalleryConfigChange.currentValue;
            if (currPlainGalleryConfigChange.layout &&
                currPlainGalleryConfigChange.layout instanceof AdvancedLayout &&
                currPlainGalleryConfigChange.layout.modalOpenerByIndex !== -1) {
                // console.log('opening modal gallery from custom plain gallery, index: ', currPlainGalleryConfigChange);
                this.showModalGallery(currPlainGalleryConfigChange.layout.modalOpenerByIndex);
            }
        }
    };
    /**
     * Method called by custom upper buttons.
     * @param ButtonEvent event payload
     */
    /**
     * Method called by custom upper buttons.
     * @param {?} event
     * @return {?}
     */
    ModalGalleryComponent.prototype.onCustomEmit = /**
     * Method called by custom upper buttons.
     * @param {?} event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var eventToEmit = this.getButtonEventToEmit(event);
        this.buttonBeforeHook.emit(eventToEmit);
        // console.log('on onCustomEmit', eventToEmit);
        this.buttonAfterHook.emit(eventToEmit);
    };
    // TODO implement on refresh
    // /**
    //  * Method called by the refresh upper button.
    //  * STILL NOT IMPLEMENTED, SO DON'T USE IT
    //  * @param ButtonEvent event payload
    //  */
    // onRefresh(event: ButtonEvent) {
    //   const eventToEmit: ButtonEvent = this.getButtonEventToEmit(event);
    //
    //   this.buttonBeforeHook.emit(eventToEmit);
    //   // console.log('TODO implement on refresh inside the library', eventToEmit);
    //
    //   this.currentImage = Object.assign({}, this.currentImage, { previouslyLoaded: false });
    //
    //   // TODO add logic to hide and show the current image
    //
    //   // console.log('onRefresh', this.currentImage);
    //
    //   // const indexNum: number = this.currentImageComponent.getIndex();
    //
    //   // this.images = this.images.map((val: InternalLibImage, index: number) => {
    //   //   if (index !== 2) {
    //   //     return val;
    //   //   } else {
    //   //     const img: InternalLibImage = Object.assign({}, val, {previouslyLoaded: false});
    //   //     return img;
    //   //   }
    //   // });
    //   //
    //   // this.closeGallery();
    //   // this.showModalGallery(2);
    //
    //   this.buttonAfterHook.emit(eventToEmit);
    // }
    /**
     * Method called by the full-screen upper button.
     * @param ButtonEvent event payload
     */
    /**
     * Method called by the full-screen upper button.
     * @param {?} event
     * @return {?}
     */
    ModalGalleryComponent.prototype.onFullScreen = /**
     * Method called by the full-screen upper button.
     * @param {?} event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var eventToEmit = this.getButtonEventToEmit(event);
        this.buttonBeforeHook.emit(eventToEmit);
        /** @type {?} */
        var doc = /** @type {?} */ (document);
        /** @type {?} */
        var docEl = /** @type {?} */ (document.documentElement);
        /** @type {?} */
        var fullscreenDisabled = !doc.fullscreenElement && !doc.webkitFullscreenElement && !doc.mozFullScreenElement && !doc.msFullscreenElement;
        if (fullscreenDisabled) {
            if (docEl.requestFullscreen) {
                docEl.requestFullscreen();
            }
            else if (docEl.webkitRequestFullscreen) {
                docEl.webkitRequestFullscreen();
            }
            else if (docEl.mozRequestFullScreen) {
                docEl.mozRequestFullScreen();
            }
            else if (docEl.msRequestFullscreen) {
                docEl.msRequestFullscreen();
            }
        }
        else {
            if (doc.exitFullscreen) {
                doc.exitFullscreen();
            }
            else if (doc.msExitFullscreen) {
                doc.msExitFullscreen();
            }
            else if (doc.mozCancelFullScreen) {
                doc.mozCancelFullScreen();
            }
            else if (doc.webkitExitFullscreen) {
                doc.webkitExitFullscreen();
            }
        }
        this.buttonAfterHook.emit(eventToEmit);
    };
    /**
     * Method called by the delete upper button.
     * @param ButtonEvent event payload
     */
    /**
     * Method called by the delete upper button.
     * @param {?} event
     * @return {?}
     */
    ModalGalleryComponent.prototype.onDelete = /**
     * Method called by the delete upper button.
     * @param {?} event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var eventToEmit = this.getButtonEventToEmit(event);
        this.buttonBeforeHook.emit(eventToEmit);
        if (this.images.length === 1) {
            this.closeGallery();
        }
        /** @type {?} */
        var imageIndexToDelete = this.currentImageComponent.getIndexToDelete(event.image);
        if (imageIndexToDelete === this.images.length - 1) {
            // last image
            this.currentImageComponent.prevImage();
        }
        else {
            this.currentImageComponent.nextImage();
        }
        this.buttonAfterHook.emit(eventToEmit);
    };
    /**
     * Method called by the navigate upper button.
     * @param ButtonEvent event payload
     */
    /**
     * Method called by the navigate upper button.
     * @param {?} event
     * @return {?}
     */
    ModalGalleryComponent.prototype.onNavigate = /**
     * Method called by the navigate upper button.
     * @param {?} event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var eventToEmit = this.getButtonEventToEmit(event);
        this.buttonBeforeHook.emit(eventToEmit);
        // To support SSR
        if (isPlatformBrowser(this.platformId)) {
            if (eventToEmit.image && eventToEmit.image.modal.extUrl) {
                // where I should open this link? The current tab or another one?
                if (eventToEmit.button && eventToEmit.button.extUrlInNewTab) {
                    window.open(eventToEmit.image.modal.extUrl, '_blank');
                }
                else {
                    window.location.href = eventToEmit.image.modal.extUrl;
                }
            }
        }
        this.buttonAfterHook.emit(eventToEmit);
    };
    /**
     * Method called by the download upper button.
     * @param ButtonEvent event payload
     */
    /**
     * Method called by the download upper button.
     * @param {?} event
     * @return {?}
     */
    ModalGalleryComponent.prototype.onDownload = /**
     * Method called by the download upper button.
     * @param {?} event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var eventToEmit = this.getButtonEventToEmit(event);
        this.buttonBeforeHook.emit(eventToEmit);
        this.downloadImage();
        this.buttonAfterHook.emit(eventToEmit);
    };
    /**
     * Method called by the close upper button.
     * @param ButtonEvent event payload
     * @param Action action that triggered the close method. `Action.NORMAL` by default
     */
    /**
     * Method called by the close upper button.
     * @param {?} event
     * @param {?=} action
     * @return {?}
     */
    ModalGalleryComponent.prototype.onCloseGallery = /**
     * Method called by the close upper button.
     * @param {?} event
     * @param {?=} action
     * @return {?}
     */
    function (event, action) {
        if (action === void 0) { action = Action.NORMAL; }
        /** @type {?} */
        var eventToEmit = this.getButtonEventToEmit(event);
        this.buttonBeforeHook.emit(eventToEmit);
        this.closeGallery(action);
        this.buttonAfterHook.emit(eventToEmit);
    };
    /**
     * Method to close the modal gallery specifying the action.
     * It also reset the `keyboardService` to prevent multiple listeners.
     * @param Action action type. `Action.NORMAL` by default
     * @param boolean isCalledByService is true if called by gallery.service, otherwise false
     */
    /**
     * Method to close the modal gallery specifying the action.
     * It also reset the `keyboardService` to prevent multiple listeners.
     * @param {?=} action
     * @param {?=} isCalledByService
     * @return {?}
     */
    ModalGalleryComponent.prototype.closeGallery = /**
     * Method to close the modal gallery specifying the action.
     * It also reset the `keyboardService` to prevent multiple listeners.
     * @param {?=} action
     * @param {?=} isCalledByService
     * @return {?}
     */
    function (action, isCalledByService) {
        if (action === void 0) { action = Action.NORMAL; }
        if (isCalledByService === void 0) { isCalledByService = false; }
        this.close.emit(new ImageModalEvent(action, true));
        this.opened = false;
        this.keyboardService.reset();
        // shows scrollbar
        document.body.style.overflow = 'visible';
        if (isCalledByService) {
            // the following is required, otherwise the view will not be updated
            // this happens only if called by gallery.service
            this.changeDetectorRef.markForCheck();
        }
    };
    /**
     * Method called when you click on an image of your plain (or inline) gallery.
     * @param number index of the clicked image
     */
    /**
     * Method called when you click on an image of your plain (or inline) gallery.
     * @param {?} index
     * @return {?}
     */
    ModalGalleryComponent.prototype.onShowModalGallery = /**
     * Method called when you click on an image of your plain (or inline) gallery.
     * @param {?} index
     * @return {?}
     */
    function (index) {
        this.showModalGallery(index);
    };
    /**
     * Method to show the modal gallery displaying the image with
     * the index specified as input parameter.
     * It will also register a new `keyboardService` to catch keyboard's events to download the current
     * image with keyboard's shortcuts. This service, will be removed either when modal gallery component
     * will be destroyed or when the gallery is closed invoking the `closeGallery` method.
     * @param number index of the image to show
     * @param boolean isCalledByService is true if called by gallery.service, otherwise false
     */
    /**
     * Method to show the modal gallery displaying the image with
     * the index specified as input parameter.
     * It will also register a new `keyboardService` to catch keyboard's events to download the current
     * image with keyboard's shortcuts. This service, will be removed either when modal gallery component
     * will be destroyed or when the gallery is closed invoking the `closeGallery` method.
     * @param {?} index
     * @param {?=} isCalledByService
     * @return {?}
     */
    ModalGalleryComponent.prototype.showModalGallery = /**
     * Method to show the modal gallery displaying the image with
     * the index specified as input parameter.
     * It will also register a new `keyboardService` to catch keyboard's events to download the current
     * image with keyboard's shortcuts. This service, will be removed either when modal gallery component
     * will be destroyed or when the gallery is closed invoking the `closeGallery` method.
     * @param {?} index
     * @param {?=} isCalledByService
     * @return {?}
     */
    function (index, isCalledByService) {
        var _this = this;
        if (isCalledByService === void 0) { isCalledByService = false; }
        // hides scrollbar
        document.body.style.overflow = 'hidden';
        this.keyboardService.add(function (event, combo) {
            if (event.preventDefault) {
                event.preventDefault();
            }
            else {
                // internet explorer
                event.returnValue = false;
            }
            _this.downloadImage();
        });
        this.opened = true;
        this.currentImage = this.images[index];
        // emit a new ImageModalEvent with the index of the current image
        this.show.emit(new ImageModalEvent(Action.LOAD, index + 1));
        if (isCalledByService) {
            // the following is required, otherwise the view will not be updated
            // this happens only if called by gallery.service
            this.changeDetectorRef.markForCheck();
        }
    };
    /**
     * Method called when the image changes and used to update the `currentImage` object.
     * @param ImageModalEvent event payload
     */
    /**
     * Method called when the image changes and used to update the `currentImage` object.
     * @param {?} event
     * @return {?}
     */
    ModalGalleryComponent.prototype.onChangeCurrentImage = /**
     * Method called when the image changes and used to update the `currentImage` object.
     * @param {?} event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var newIndex = /** @type {?} */ (event.result);
        // TODO add validation
        this.currentImage = this.images[newIndex];
        // emit first/last event based on newIndex value
        this.emitBoundaryEvent(event.action, newIndex);
        // emit current visible image index
        this.show.emit(new ImageModalEvent(event.action, newIndex + 1));
    };
    /**
     * @return {?}
     */
    ModalGalleryComponent.prototype.isPlainGalleryVisible = /**
     * @return {?}
     */
    function () {
        if (this.plainGalleryConfig && this.plainGalleryConfig.layout && this.plainGalleryConfig.layout instanceof AdvancedLayout) {
            return !this.plainGalleryConfig.layout.hideDefaultPlainGallery;
        }
        return true;
    };
    /**
     * Method called when you click 'outside' (i.e. on the semi-transparent background)
     * to close the modal gallery if `enableCloseOutside` is true.
     * @param boolean event payload. True to close the modal gallery, false otherwise
     */
    /**
     * Method called when you click 'outside' (i.e. on the semi-transparent background)
     * to close the modal gallery if `enableCloseOutside` is true.
     * @param {?} event
     * @return {?}
     */
    ModalGalleryComponent.prototype.onClickOutside = /**
     * Method called when you click 'outside' (i.e. on the semi-transparent background)
     * to close the modal gallery if `enableCloseOutside` is true.
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (event && this.enableCloseOutside) {
            this.closeGallery(Action.CLICK);
        }
    };
    /**
     * Method called when an image is loaded and the loading spinner has gone.
     * It sets the previouslyLoaded flag inside the Image to hide loading spinner when displayed again.
     * @param ImageLoadEvent event payload
     */
    /**
     * Method called when an image is loaded and the loading spinner has gone.
     * It sets the previouslyLoaded flag inside the Image to hide loading spinner when displayed again.
     * @param {?} event
     * @return {?}
     */
    ModalGalleryComponent.prototype.onImageLoad = /**
     * Method called when an image is loaded and the loading spinner has gone.
     * It sets the previouslyLoaded flag inside the Image to hide loading spinner when displayed again.
     * @param {?} event
     * @return {?}
     */
    function (event) {
        // console.log('modal-image onImageLoad', event);
        // console.log('modal-image onImageLoad images before', this.images);
        // sets as previously loaded the image with index specified by `event.status`
        this.images = this.images.map(function (img) {
            if (img && img.id === event.id) {
                return Object.assign({}, img, { previouslyLoaded: event.status });
            }
            return img;
        });
        // console.log('modal-image onImageLoad images after', this.images);
    };
    /**
     * Method called when a dot is clicked and used to update the current image.
     * @param number index of the clicked dot
     */
    /**
     * Method called when a dot is clicked and used to update the current image.
     * @param {?} index
     * @return {?}
     */
    ModalGalleryComponent.prototype.onClickDot = /**
     * Method called when a dot is clicked and used to update the current image.
     * @param {?} index
     * @return {?}
     */
    function (index) {
        this.currentImage = this.images[index];
    };
    /**
     * Method called when an image preview is clicked and used to update the current image.
     * @param Image preview image
     */
    /**
     * Method called when an image preview is clicked and used to update the current image.
     * @param {?} preview
     * @return {?}
     */
    ModalGalleryComponent.prototype.onClickPreview = /**
     * Method called when an image preview is clicked and used to update the current image.
     * @param {?} preview
     * @return {?}
     */
    function (preview) {
        /** @type {?} */
        var imageFound = this.images.find(function (img) { return img.id === preview.id; });
        if (!!imageFound) {
            this.currentImage = /** @type {?} */ (imageFound);
        }
    };
    /**
     * Method to download the current image, only if `downloadable` is true.
     * It contains also a logic to enable downloading features also for IE11.
     */
    /**
     * Method to download the current image, only if `downloadable` is true.
     * It contains also a logic to enable downloading features also for IE11.
     * @return {?}
     */
    ModalGalleryComponent.prototype.downloadImage = /**
     * Method to download the current image, only if `downloadable` is true.
     * It contains also a logic to enable downloading features also for IE11.
     * @return {?}
     */
    function () {
        if (this.currentImageConfig && !this.currentImageConfig.downloadable) {
            return;
        }
        // If IE11 or Microsoft Edge use msSaveBlob(...)
        if (this.isIEorEdge()) {
            // I cannot use fetch API because IE11 doesn't support it,
            // so I have to switch to XMLHttpRequest
            this.downloadImageOnlyIEorEdge();
        }
        else {
            // for all other browsers
            this.downloadImageAllBrowsers();
        }
    };
    /**
     * Method to cleanup resources. In fact, this will reset keyboard's service.
     * This is an Angular's lifecycle hook that is called when this component is destroyed.
     */
    /**
     * Method to cleanup resources. In fact, this will reset keyboard's service.
     * This is an Angular's lifecycle hook that is called when this component is destroyed.
     * @return {?}
     */
    ModalGalleryComponent.prototype.ngOnDestroy = /**
     * Method to cleanup resources. In fact, this will reset keyboard's service.
     * This is an Angular's lifecycle hook that is called when this component is destroyed.
     * @return {?}
     */
    function () {
        this.keyboardService.reset();
        if (this.galleryServiceNavigateSubscription) {
            this.galleryServiceNavigateSubscription.unsubscribe();
        }
        if (this.galleryServiceCloseSubscription) {
            this.galleryServiceCloseSubscription.unsubscribe();
        }
        if (this.galleryServiceUpdateSubscription) {
            this.galleryServiceUpdateSubscription.unsubscribe();
        }
    };
    /**
     * Private method to download the current image for all browsers except for IE11.
     * @return {?}
     */
    ModalGalleryComponent.prototype.downloadImageAllBrowsers = /**
     * Private method to download the current image for all browsers except for IE11.
     * @return {?}
     */
    function () {
        /** @type {?} */
        var link = document.createElement('a');
        link.href = /** @type {?} */ (this.currentImage.modal.img);
        link.setAttribute('download', this.getFileName(this.currentImage));
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    /**
     * Private method to download the current image only for IE11 using
     * custom javascript's methods available only on IE.
     * @return {?}
     */
    ModalGalleryComponent.prototype.downloadImageOnlyIEorEdge = /**
     * Private method to download the current image only for IE11 using
     * custom javascript's methods available only on IE.
     * @return {?}
     */
    function () {
        var _this = this;
        if (isPlatformBrowser(this.platformId)) {
            /** @type {?} */
            var req_1 = new XMLHttpRequest();
            req_1.open('GET', /** @type {?} */ (this.currentImage.modal.img), true);
            req_1.responseType = 'arraybuffer';
            req_1.onload = function (event) {
                /** @type {?} */
                var blob = new Blob([req_1.response], { type: 'image/png' });
                window.navigator.msSaveBlob(blob, _this.getFileName(_this.currentImage));
            };
            req_1.send();
        }
    };
    /**
     * Private method to get the `ButtonEvent` to emit, merging the input `ButtonEvent`
     * with the current image.
     * @param {?} event
     * @return {?} ButtonEvent event payload with the current image included
     */
    ModalGalleryComponent.prototype.getButtonEventToEmit = /**
     * Private method to get the `ButtonEvent` to emit, merging the input `ButtonEvent`
     * with the current image.
     * @param {?} event
     * @return {?} ButtonEvent event payload with the current image included
     */
    function (event) {
        return Object.assign(event, { image: this.currentImage });
    };
    /**
     * Private method to get the file name from an input path.
     * This is used either to get the image's name from its path or from the Image itself,
     * if specified as 'downloadFileName' by the user.
     * @param {?} image
     * @return {?} string string file name of the input image.
     */
    ModalGalleryComponent.prototype.getFileName = /**
     * Private method to get the file name from an input path.
     * This is used either to get the image's name from its path or from the Image itself,
     * if specified as 'downloadFileName' by the user.
     * @param {?} image
     * @return {?} string string file name of the input image.
     */
    function (image) {
        if (!image.modal.downloadFileName || image.modal.downloadFileName.length === 0) {
            return (/** @type {?} */ (this.currentImage.modal.img)).replace(/^.*[\\\/]/, '');
        }
        else {
            return image.modal.downloadFileName;
        }
    };
    /**
     * Private method to initialize `images` as array of `Image`s.
     * Also, it will emit ImageowmodaModalEvent to say that images are loaded.
     * @return {?}
     */
    ModalGalleryComponent.prototype.initImages = /**
     * Private method to initialize `images` as array of `Image`s.
     * Also, it will emit ImageowmodaModalEvent to say that images are loaded.
     * @return {?}
     */
    function () {
        this.images = /** @type {?} */ (this.modalImages);
        this.hasData.emit(new ImageModalEvent(Action.LOAD, true));
        this.showGallery = this.images.length > 0;
    };
    /**
     * Private method to emit events when either the last or the first image are visible.
     * @param {?} action Enum of type Action that represents the source of the event that changed the
     *  current image to the first one or the last one.
     * @param {?} indexToCheck is the index number of the image (the first or the last one).
     * @return {?}
     */
    ModalGalleryComponent.prototype.emitBoundaryEvent = /**
     * Private method to emit events when either the last or the first image are visible.
     * @param {?} action Enum of type Action that represents the source of the event that changed the
     *  current image to the first one or the last one.
     * @param {?} indexToCheck is the index number of the image (the first or the last one).
     * @return {?}
     */
    function (action, indexToCheck) {
        // to emit first/last event
        switch (indexToCheck) {
            case 0:
                this.firstImage.emit(new ImageModalEvent(action, true));
                break;
            case this.images.length - 1:
                this.lastImage.emit(new ImageModalEvent(action, true));
                break;
        }
    };
    /**
     * Private method to check if this library is running on
     * Microsoft browsers or not (i.e. it detects both IE11 and Edge)
     * supporting also Server-Side Rendering.
     * Inspired by https://msdn.microsoft.com/it-it/library/hh779016(v=vs.85).aspx
     * @return {?} any the result
     */
    ModalGalleryComponent.prototype.isIEorEdge = /**
     * Private method to check if this library is running on
     * Microsoft browsers or not (i.e. it detects both IE11 and Edge)
     * supporting also Server-Side Rendering.
     * Inspired by https://msdn.microsoft.com/it-it/library/hh779016(v=vs.85).aspx
     * @return {?} any the result
     */
    function () {
        if (isPlatformBrowser(this.platformId)) {
            // if both Blob constructor and msSaveOrOpenBlob are supported by the current browser
            return window.Blob && window.navigator.msSaveOrOpenBlob;
        }
        if (isPlatformServer(this.platformId)) {
            // server only
            return true;
        }
    };
    ModalGalleryComponent.decorators = [
        { type: Component, args: [{
                    selector: 'fg-modal-gallery',
                    exportAs: 'fgModalGallery',
                    template: "<fg-plain-gallery [images]=\"images\"\n                  [showGallery]=\"showGallery && isPlainGalleryVisible()\"\n                  [plainGalleryConfig]=\"plainGalleryConfig\"\n                  [accessibilityConfig]=\"accessibilityConfig\"\n                  (show)=\"onShowModalGallery($event)\"></fg-plain-gallery>\n\n<fg-background [isOpen]=\"opened\"\n               [accessibilityConfig]=\"accessibilityConfig\"></fg-background>\n\n<div id=\"modal-gallery-wrapper\" *ngIf=\"opened\"\n     [attr.aria-label]=\"accessibilityConfig.modalGalleryContentAriaLabel\"\n     [title]=\"accessibilityConfig.modalGalleryContentTitle\"\n     fgClickOutside [clickOutsideEnable]=\"enableCloseOutside\"\n     (clickOutside)=\"onClickOutside($event)\">\n\n  <div id=\"flex-min-height-ie-fix\">\n    <div id=\"modal-gallery-container\">\n\n      <fg-upper-buttons [currentImage]=\"currentImage\"\n                        [buttonsConfig]=\"buttonsConfig\"\n                        (delete)=\"onDelete($event)\"\n                        (navigate)=\"onNavigate($event)\"\n                        (download)=\"onDownload($event)\"\n                        (close)=\"onCloseGallery($event)\"\n                        (fullscreen)=\"onFullScreen($event)\"\n                        (customEmit)=\"onCustomEmit($event)\"></fg-upper-buttons>\n\n      <fg-current-image [images]=\"images\"\n                        [currentImage]=\"currentImage\"\n                        [isOpen]=\"opened\"\n                        [slideConfig]=\"slideConfig\"\n                        [keyboardConfig]=\"keyboardConfig\"\n                        [accessibilityConfig]=\"accessibilityConfig\"\n                        [currentImageConfig]=\"currentImageConfig\"\n                        (loadImage)=\"onImageLoad($event)\"\n                        (changeImage)=\"onChangeCurrentImage($event)\"\n                        (close)=\"onCloseGallery($event)\"></fg-current-image>\n\n      <div>\n        <fg-dots [images]=\"images\"\n                 [currentImage]=\"currentImage\"\n                 [dotsConfig]=\"dotsConfig\"\n                 [accessibilityConfig]=\"accessibilityConfig\"\n                 (clickDot)=\"onClickDot($event)\"></fg-dots>\n\n        <fg-previews [images]=\"images\"\n                     [currentImage]=\"currentImage\"\n                     [previewConfig]=\"previewConfig\"\n                     [accessibilityConfig]=\"accessibilityConfig\"\n                     (clickPreview)=\"onClickPreview($event)\"></fg-previews>\n      </div>\n    </div>\n  </div>\n</div>\n",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: ["#modal-gallery-wrapper{position:fixed;top:0;left:0;width:100vw;height:100vh;z-index:10000}#flex-min-height-ie-fix{display:flex;flex-direction:column;justify-content:center}#modal-gallery-container{display:flex;flex-direction:column;justify-content:space-between;min-height:100vh}"]
                }] }
    ];
    /** @nocollapse */
    ModalGalleryComponent.ctorParameters = function () { return [
        { type: KeyboardService },
        { type: GalleryService },
        { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] },
        { type: ChangeDetectorRef }
    ]; };
    ModalGalleryComponent.propDecorators = {
        id: [{ type: Input }],
        modalImages: [{ type: Input }],
        buttonsConfig: [{ type: Input }],
        enableCloseOutside: [{ type: Input }],
        currentImageConfig: [{ type: Input }],
        dotsConfig: [{ type: Input }],
        previewConfig: [{ type: Input }],
        slideConfig: [{ type: Input }],
        accessibilityConfig: [{ type: Input }],
        keyboardConfig: [{ type: Input }],
        plainGalleryConfig: [{ type: Input }],
        close: [{ type: Output }],
        show: [{ type: Output }],
        firstImage: [{ type: Output }],
        lastImage: [{ type: Output }],
        hasData: [{ type: Output }],
        buttonBeforeHook: [{ type: Output }],
        buttonAfterHook: [{ type: Output }],
        currentImageComponent: [{ type: ViewChild, args: [CurrentImageComponent,] }],
        onPopState: [{ type: HostListener, args: ['window:popstate', ['$event'],] }]
    };
    return ModalGalleryComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @enum {number} */
var ButtonsStrategy = {
    // don't use 0 here
    // the first index is 1 and all of the following members are auto-incremented from that point on
    DEFAULT: 1,
    SIMPLE: 2,
    ADVANCED: 3,
    FULL: 4,
    CUSTOM: 5,
};
ButtonsStrategy[ButtonsStrategy.DEFAULT] = 'DEFAULT';
ButtonsStrategy[ButtonsStrategy.SIMPLE] = 'SIMPLE';
ButtonsStrategy[ButtonsStrategy.ADVANCED] = 'ADVANCED';
ButtonsStrategy[ButtonsStrategy.FULL] = 'FULL';
ButtonsStrategy[ButtonsStrategy.CUSTOM] = 'CUSTOM';
/** @enum {number} */
var ButtonType = {
    // don't use 0 here
    // the first index is 1 and all of the following members are auto-incremented from that point on
    // REFRESH = 1,
    DELETE: 1,
    EXTURL: 2,
    DOWNLOAD: 3,
    CLOSE: 4,
    CUSTOM: 5,
    FULLSCREEN: 6,
};
ButtonType[ButtonType.DELETE] = 'DELETE';
ButtonType[ButtonType.EXTURL] = 'EXTURL';
ButtonType[ButtonType.DOWNLOAD] = 'DOWNLOAD';
ButtonType[ButtonType.CLOSE] = 'CLOSE';
ButtonType[ButtonType.CUSTOM] = 'CUSTOM';
ButtonType[ButtonType.FULLSCREEN] = 'FULLSCREEN';
/** *
 * Array of admitted types of buttons.
  @type {?} */
var WHITELIST_BUTTON_TYPES = [
    // ButtonType.REFRESH,
    ButtonType.FULLSCREEN,
    ButtonType.DELETE,
    ButtonType.EXTURL,
    ButtonType.DOWNLOAD,
    ButtonType.CLOSE,
    ButtonType.CUSTOM
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** *
 * Default button size object
  @type {?} */
var fg_DEFAULT_SIZE = { height: 'auto', width: '30px' };
/** *
 * Default close button object
  @type {?} */
var fg_DEFAULT_BTN_CLOSE = {
    className: 'close-image',
    size: fg_DEFAULT_SIZE,
    type: ButtonType.CLOSE,
    title: 'Close this modal image gallery',
    ariaLabel: 'Close this modal image gallery'
};
/** *
 * Default download button object
  @type {?} */
var fg_DEFAULT_BTN_DOWNLOAD = {
    className: 'download-image',
    size: fg_DEFAULT_SIZE,
    type: ButtonType.DOWNLOAD,
    title: 'Download the current image',
    ariaLabel: 'Download the current image'
};
/** *
 * Default exturl button object
  @type {?} */
var fg_DEFAULT_BTN_EXTURL = {
    className: 'ext-url-image',
    size: fg_DEFAULT_SIZE,
    type: ButtonType.EXTURL,
    title: 'Navigate the current image',
    ariaLabel: 'Navigate the current image'
};
/** *
 * Default delete button object
  @type {?} */
var fg_DEFAULT_BTN_DELETE = {
    className: 'delete-image',
    size: fg_DEFAULT_SIZE,
    type: ButtonType.DELETE,
    title: 'Delete the current image',
    ariaLabel: 'Delete the current image'
};
/** *
 * Default full-screen button object
  @type {?} */
var fg_DEFAULT_BTN_FULL_SCREEN = {
    className: 'fullscreen-image',
    size: fg_DEFAULT_SIZE,
    type: ButtonType.FULLSCREEN,
    title: 'Switch to full-screen',
    ariaLabel: 'Switch to full-screen'
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Component with all upper buttons.
 * Also it emits click events as outputs.
 */
var UpperButtonsComponent = /** @class */ (function (_super) {
    __extends(UpperButtonsComponent, _super);
    function UpperButtonsComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * Output to emit clicfg on refresh button. The payload contains a `ButtonEvent`.
         */
        _this.refresh = new EventEmitter();
        /**
         * Output to emit clicfg on delete button. The payload contains a `ButtonEvent`.
         */
        _this.delete = new EventEmitter();
        /**
         * Output to emit clicfg on navigate button. The payload contains a `ButtonEvent`.
         */
        _this.navigate = new EventEmitter();
        /**
         * Output to emit clicfg on download button. The payload contains a `ButtonEvent`.
         */
        _this.download = new EventEmitter();
        /**
         * Output to emit clicfg on close button. The payload contains a `ButtonEvent`.
         */
        _this.close = new EventEmitter();
        /**
         * Output to emit clicfg on full-screen button. The payload contains a `ButtonEvent`.
         */
        _this.fullscreen = new EventEmitter();
        /**
         * Output to emit clicfg on all custom buttons. The payload contains a `ButtonEvent`.
         */
        _this.customEmit = new EventEmitter();
        /**
         * Default buttons array for standard configuration
         */
        _this.defaultButtonsDefault = [fg_DEFAULT_BTN_CLOSE];
        /**
         * Default buttons array for simple configuration
         */
        _this.simpleButtonsDefault = __spread([fg_DEFAULT_BTN_DOWNLOAD], _this.defaultButtonsDefault);
        /**
         * Default buttons array for advanced configuration
         */
        _this.advancedButtonsDefault = __spread([fg_DEFAULT_BTN_EXTURL], _this.simpleButtonsDefault);
        /**
         * Default buttons array for full configuration
         */
        _this.fullButtonsDefault = __spread([
            fg_DEFAULT_BTN_FULL_SCREEN,
            fg_DEFAULT_BTN_DELETE
        ], _this.advancedButtonsDefault);
        return _this;
    }
    /**
     * Method ´ngOnInit´ to build `configButtons` applying a default value and also to
     * init the `buttons` array.
     * This is an Angular's lifecycle hook, so its called automatically by Angular itself.
     * In particular, it's called only one time!!!
     */
    /**
     * Method ´ngOnInit´ to build `configButtons` applying a default value and also to
     * init the `buttons` array.
     * This is an Angular's lifecycle hook, so its called automatically by Angular itself.
     * In particular, it's called only one time!!!
     * @return {?}
     */
    UpperButtonsComponent.prototype.ngOnInit = /**
     * Method ´ngOnInit´ to build `configButtons` applying a default value and also to
     * init the `buttons` array.
     * This is an Angular's lifecycle hook, so its called automatically by Angular itself.
     * In particular, it's called only one time!!!
     * @return {?}
     */
    function () {
        /** @type {?} */
        var defaultConfig = { visible: true, strategy: ButtonsStrategy.DEFAULT };
        this.configButtons = Object.assign(defaultConfig, this.buttonsConfig);
        switch (this.configButtons.strategy) {
            case ButtonsStrategy.SIMPLE:
                this.buttons = this.addButtonIds(this.simpleButtonsDefault);
                break;
            case ButtonsStrategy.ADVANCED:
                this.buttons = this.addButtonIds(this.advancedButtonsDefault);
                break;
            case ButtonsStrategy.FULL:
                this.buttons = this.addButtonIds(this.fullButtonsDefault);
                break;
            case ButtonsStrategy.CUSTOM:
                this.buttons = this.addButtonIds(this.validateCustomButtons(this.configButtons.buttons));
                break;
            case ButtonsStrategy.DEFAULT:
            default:
                this.buttons = this.addButtonIds(this.defaultButtonsDefault);
                break;
        }
    };
    /**
     * Method called by events from both keyboard and mouse on a button.
     * This will call a private method to trigger an output with the right payload.
     * @param InternalButtonConfig button that called this method
     * @param KeyboardEvent | MouseEvent event payload
     * @param Action action that triggered the source event or `Action.CLICK` if not specified
     * @throws an error if the button type is unknown
     */
    /**
     * Method called by events from both keyboard and mouse on a button.
     * This will call a private method to trigger an output with the right payload.
     * @throws an error if the button type is unknown
     * @param {?} button
     * @param {?} event
     * @param {?=} action
     * @return {?}
     */
    UpperButtonsComponent.prototype.onEvent = /**
     * Method called by events from both keyboard and mouse on a button.
     * This will call a private method to trigger an output with the right payload.
     * @throws an error if the button type is unknown
     * @param {?} button
     * @param {?} event
     * @param {?=} action
     * @return {?}
     */
    function (button, event, action) {
        if (action === void 0) { action = Action.CLICK; }
        if (!event) {
            return;
        }
        /** @type {?} */
        var dataToEmit = {
            button: button,
            // current image initialized as null
            // (I'll fill this value inside the parent of this component
            image: null,
            action: action
        };
        switch (button.type) {
            // case ButtonType.REFRESH:
            //   this.triggerOnMouseAndKeyboard(this.refresh, event, dataToEmit);
            //   break;
            case ButtonType.DELETE:
                this.triggerOnMouseAndKeyboard(this.delete, event, dataToEmit);
                break;
            case ButtonType.EXTURL:
                if (!this.currentImage || !this.currentImage.modal || !this.currentImage.modal.extUrl) {
                    return;
                }
                this.triggerOnMouseAndKeyboard(this.navigate, event, dataToEmit);
                break;
            case ButtonType.DOWNLOAD:
                this.triggerOnMouseAndKeyboard(this.download, event, dataToEmit);
                break;
            case ButtonType.CLOSE:
                this.triggerOnMouseAndKeyboard(this.close, event, dataToEmit);
                break;
            case ButtonType.CUSTOM:
                this.triggerOnMouseAndKeyboard(this.customEmit, event, dataToEmit);
                break;
            case ButtonType.FULLSCREEN:
                this.triggerOnMouseAndKeyboard(this.fullscreen, event, dataToEmit);
                break;
            default:
                throw new Error("Unknown button's type into ButtonConfig");
        }
    };
    /**
     * Method used in the template to track ids in ngFor.
     * @param number index of the array
     * @param Image item of the array
     * @returns number the id of the item or undefined if the item is not valid
     */
    /**
     * Method used in the template to track ids in ngFor.
     * @param {?} index
     * @param {?} item
     * @return {?} number the id of the item or undefined if the item is not valid
     */
    UpperButtonsComponent.prototype.trackById = /**
     * Method used in the template to track ids in ngFor.
     * @param {?} index
     * @param {?} item
     * @return {?} number the id of the item or undefined if the item is not valid
     */
    function (index, item) {
        return item ? item.id : undefined;
    };
    /**
     * Private method to emit an event using the specified output as an `EventEmitter`.
     * @param {?} emitter
     * @param {?} event
     * @param {?} dataToEmit
     * @return {?}
     */
    UpperButtonsComponent.prototype.triggerOnMouseAndKeyboard = /**
     * Private method to emit an event using the specified output as an `EventEmitter`.
     * @param {?} emitter
     * @param {?} event
     * @param {?} dataToEmit
     * @return {?}
     */
    function (emitter, event, dataToEmit) {
        if (!emitter) {
            throw new Error("UpperButtonsComponent unknown emitter in triggerOnMouseAndKeyboard");
        }
        /** @type {?} */
        var result = _super.prototype.handleImageEvent.call(this, event);
        if (result === NEXT) {
            emitter.emit(dataToEmit);
        }
    };
    /**
     * Private method to add ids to the array of buttons.
     * It adds ids in a reverse way, to be sure that the last button will always have id = 0.
     * This is really useful in unit testing to be sure that close button always have id = 0, download 1 and so on...
     * It's totally transparent to the user.
     * @param {?} buttons
     * @return {?} ButtonConfig[] the input array with incremental numeric ids
     */
    UpperButtonsComponent.prototype.addButtonIds = /**
     * Private method to add ids to the array of buttons.
     * It adds ids in a reverse way, to be sure that the last button will always have id = 0.
     * This is really useful in unit testing to be sure that close button always have id = 0, download 1 and so on...
     * It's totally transparent to the user.
     * @param {?} buttons
     * @return {?} ButtonConfig[] the input array with incremental numeric ids
     */
    function (buttons) {
        return buttons.map(function (val, i) { return Object.assign(val, { id: buttons.length - 1 - i }); });
    };
    /**
     * Private method to validate custom buttons received as input.
     * @throws an error is exists a button with an unknown type
     * @param {?=} buttons
     * @return {?} ButtonConfig[] the same input buttons config array
     */
    UpperButtonsComponent.prototype.validateCustomButtons = /**
     * Private method to validate custom buttons received as input.
     * @throws an error is exists a button with an unknown type
     * @param {?=} buttons
     * @return {?} ButtonConfig[] the same input buttons config array
     */
    function (buttons) {
        if (buttons === void 0) { buttons = []; }
        buttons.forEach(function (val) {
            /** @type {?} */
            var indexOfButtonType = WHITELIST_BUTTON_TYPES.findIndex(function (type) { return type === val.type; });
            if (indexOfButtonType === -1) {
                throw new Error("Unknown ButtonType. For custom types use ButtonType.CUSTOM");
            }
        });
        return buttons;
    };
    UpperButtonsComponent.decorators = [
        { type: Component, args: [{
                    selector: 'fg-upper-buttons',
                    template: "<header class=\"buttons-container\">\n\n  <ng-container *ngIf=\"!configButtons || configButtons?.visible\">\n    <a *ngFor=\"let btn of buttons; trackBy: trackById; let index = index\"\n       class=\"upper-button\"\n       fgSize [sizeConfig]=\"{width: btn.size?.width, height: btn.size?.height}\"\n       [ngStyle]=\"{'font-size': btn.fontSize}\"\n       [attr.aria-label]=\"btn.ariaLabel\"\n       [tabindex]=\"0\" role=\"button\"\n       (click)=\"onEvent(btn, $event)\" (keyup)=\"onEvent(btn, $event)\">\n      <div class=\"inside {{btn.className}}\" aria-hidden=\"true\" title=\"{{btn.title}}\"></div>\n    </a>\n  </ng-container>\n</header>\n",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: [".buttons-container{display:flex;flex-direction:row;justify-content:flex-end}.buttons-container>.upper-button{-ms-grid-row-align:center;align-self:center;margin-right:30px;margin-top:28px;font-size:50px;text-decoration:none;cursor:pointer;-webkit-animation:.6s animatezoom;animation:.6s animatezoom;color:#fff}@-webkit-keyframes animatezoom{from{-webkit-transform:scale(0);transform:scale(0)}to{-webkit-transform:scale(1);transform:scale(1)}}@keyframes animatezoom{from{-webkit-transform:scale(0);transform:scale(0)}to{-webkit-transform:scale(1);transform:scale(1)}}.base-btn,.close-image,.copy,.delete-image,.download-image,.ext-url-image,.fullscreen-image,.refresh-image{width:30px;height:30px;background-size:30px;opacity:.8;transition:.5s}.base-btn:hover,.close-image:hover,.copy:hover,.delete-image:hover,.download-image:hover,.ext-url-image:hover,.fullscreen-image:hover,.refresh-image:hover{-webkit-transform:scale(1.2);transform:scale(1.2)}.fullscreen-image{background-image:url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgNTMgNTMiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUzIDUzOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjUxMnB4IiBoZWlnaHQ9IjUxMnB4Ij48Zz48cGF0aCBkPSJNNTIuOTIzLDAuNjE4Yy0wLjEwMS0wLjI0NC0wLjI5Ni0wLjQzOS0wLjU0MS0wLjU0MUM1Mi4yNiwwLjAyNyw1Mi4xMywwLDUyLDBINDBjLTAuNTUyLDAtMSwwLjQ0OC0xLDFzMC40NDgsMSwxLDFoOS41ODYgICBMMzMuMjkzLDE4LjI5M2MtMC4zOTEsMC4zOTEtMC4zOTEsMS4wMjMsMCwxLjQxNEMzMy40ODgsMTkuOTAyLDMzLjc0NCwyMCwzNCwyMHMwLjUxMi0wLjA5OCwwLjcwNy0wLjI5M0w1MSwzLjQxNFYxMyAgIGMwLDAuNTUyLDAuNDQ4LDEsMSwxczEtMC40NDgsMS0xVjFDNTMsMC44Nyw1Mi45NzMsMC43NCw1Mi45MjMsMC42MTh6IiBmaWxsPSIjRkZGRkZGIi8+PHBhdGggZD0iTTE4LjI5MywzMy4yOTNMMiw0OS41ODZWNDBjMC0wLjU1Mi0wLjQ0OC0xLTEtMXMtMSwwLjQ0OC0xLDF2MTJjMCwwLjEzLDAuMDI3LDAuMjYsMC4wNzcsMC4zODIgICBjMC4xMDEsMC4yNDQsMC4yOTYsMC40MzfgMC41NDEsMC41NDFDMC43NCw1Mi45NzMsMC44Nyw1MywxLDUzaDEyYzAuNTUyLDAsMS0wLjQ0OCwxLTFzLTAuNDQ4LTEtMS0xSDMuNDE0bDE2LjI5My0xNi4yOTMgICBjMC4zOTEtMC4zOTEsMC4zOTEtMS4wMjMsMC0xLjQxNFMxOC42ODQsMzIuOTAyLDE4LjI5MywzMy4yOTN6IiBmaWxsPSIjRkZGRkZGIi8+PHBhdGggZD0iTTEsMTRjMC41NTIsMCwxLTAuNDQ4LDEtMVYzLjQxNGwxNi4yOTIsMTYuMjkyYzAuMTk1LDAuMTk1LDAuNDUxLDAuMjkzLDAuNzA3LDAuMjkzczAuNTEyLTAuMDk4LDAuNzA3LTAuMjkzICAgYzAuMzkxLTAuMzkxLDAuMzkxLTEuMDIzLDAtMS40MTRMMy40MTQsMkgxM2MwLjU1MiwwLDEtMC40NDgsMS0xcy0wLjQ0OC0xLTEtMUgxQzAuODcsMCwwLjc0LDAuMDI3LDAuNjE4LDAuMDc3ICAgQzAuMzczLDAuMTc5LDAuMTc5LDAuMzczLDAuMDc3LDAuNjE4QzAuMDI3LDAuNzQsMCwwLjg3LDAsMXYxMkMwLDEzLjU1MiwwLjQ0OCwxNCwxLDE0eiIgZmlsbD0iI0ZGRkZGRiIvPjxwYXRoIGQ9Ik01MiwzOWMtMC41NTIsMC0xLDAuNDQ4LTEsMXY5LjU4NkwzNC43MDcsMzMuMjkyYy0wLjM5MS0wLjM5MS0xLjAyMy0wLjM5MS0xLjQxNCwwcy0wLjM5MSwxLjAyMywwLDEuNDE0TDQ5LjU4Niw1MUg0MCAgIGMtMC41NTIsMC0xLDAuNDQ4LTEsMXMwLjQ0OCwxLDEsMWgxMmMwLjEzLDAsMC4yNi0wLjAyNywwLjM4Mi0wLjA3N2MwLjI0NC0wLjEwMSwwLjQzOS0wLjI5NiwwLjU0MS0wLjU0MSAgIEM1Mi45NzMsNTIuMjYsNTMsNTIuMTMsNTMsNTJWNDBDNTMsMzkuNDQ4LDUyLjU1MiwzOSw1MiwzOXoiIGZpbGw9IiNGRkZGRkYiLz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PC9zdmc+)}.delete-image{background-image:url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/PjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDQ4Ni40IDQ4Ni40IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA0ODYuNCA0ODYuNDsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHdpZHRoPSI1MTJweCIgaGVpZ2h0PSI1MTJweCI+PGc+PGc+PHBhdGggZD0iTTQ0Niw3MEgzNDQuOFY1My41YzAtMjkuNS0yNC01My41LTUzLjUtNTMuNWgtOTYuMmMtMjkuNSwwLTUzLjUsMjQtNTMuNSw1My41VjcwSDQwLjRjLTcuNSwwLTEzLjUsNi0xMy41LDEzLjUgICAgUzMyLjfgOTcsNDAuNCw5N2gyNC40djMxNy4yYzAsMzkuOCwzMi40LDcyLjIsNzIuMiw3Mi4yaDIxMi40YzM5LjgsMCw3Mi4yLTMyLjQsNzIuMi03Mi4yVjk3SDQ0NmM3LjUsMCwxMy41LTYsMTMuNS0xMy41ICAgIFM0NTMuNSw3MCw0NDYsNzB6IE0xNjguNiw1My41YzAtMTQuNiwxMS45LTI2LjUsMjYuNS0yNi41aDk2LjJjMTQuNiwwLDI2LjUsMTEuOSwyNi41LDI2LjVWNzBIMTY4LjZWNTMuNXogTTM5NC42LDQxNC4yICAgIGMwLDI0LjktMjAuMyw0NS4yLTQ1LjIsNDUuMkgxMzdjLTI0LjfgMC00NS4yLTIwLjMtNDUuMi00NS4yVjk3aDMwMi45djMxNy4ySDM5NC42eiIgZmlsbD0iI0ZGRkZGRiIvPjxwYXRoIGQ9Ik0yNDMuMiw0MTFjNy41LDAsMTMuNS02LDEzLjUtMTMuNVYxNTguOWMwLTcuNS02LTEzLjUtMTMuNS0xMy41cy0xMy41LDYtMTMuNSwxMy41djIzOC41ICAgIEMyMjkuNyw0MDQuOSwyMzUuNyw0MTEsMjQzLjIsNDExeiIgZmlsbD0iI0ZGRkZGRiIvPjxwYXRoIGQ9Ik0xNTUuMSwzOTYuMWM3LjUsMCwxMy41LTYsMTMuNS0xMy41VjE3My43YzAtNy41LTYtMTMuNS0xMy41LTEzLjVzLTEzLjUsNi0xMy41LDEzLjV2MjA4LjkgICAgQzE0MS42LDM5MC4xLDE0Ny43LDM5Ni4xLDE1NS4xLDM5Ni4xeiIgZmlsbD0iI0ZGRkZGRiIvPjxwYXRoIGQ9Ik0zMzEuMywzOTYuMWM3LjUsMCwxMy41LTYsMTMuNS0xMy41VjE3My43YzAtNy41LTYtMTMuNS0xMy41LTEzLjVzLTEzLjUsNi0xMy41LDEzLjV2MjA4LjkgICAgQzMxNy44LDM5MC4xLDMyMy44LDM5Ni4xLDMzMS4zLDM5Ni4xeiIgZmlsbD0iI0ZGRkZGRiIvPjwvZz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PC9zdmc+)}.ext-url-image{background-image:url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/PjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDUxMiA1MTIiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUxMiA1MTI7IiB4bWw6c3BhY2U9InByZXNlcnZlIiB3aWR0aD0iNTEycHgiIGhlaWdodD0iNTEycHgiPjxnPjxnPjxnPjxwYXRoIGQ9Ik00ODAsMjg4djExMmMwLDQ0LjE4My0zNS44MTcsODAtODAsODBIMTEyYy00NC4xODMsMC04MC0zNS44MTctODAtODBWMTEyYzAtNDQuMTgzLDM1LjgxNy04MCw4MC04MGg5NlYwaC05NiAgICAgQzUwLjE0NCwwLDAsNTAuMTQ0LDAsMTEydjI4OGMwLDYxLjg1Niw1MC4xNDQsMTEyLDExMiwxMTJoMjg4YzYxLjg1NiwwLDExMi01MC4xNDQsMTEyLTExMlYyODhINDgweiIgZmlsbD0iI0ZGRkZGRiIvPjxwYXRoIGQ9Ik0xNzYsNDE2aDMyVjI4OGMwLTEyNS43NiwxMDcuNTItMTI4LDExMi0xMjhoMTA1LjQ0bC04NC42NCw4NC42NGwyMi41NiwyMi41NmwxMTItMTEyYzYuMjA0LTYuMjQxLDYuMjA0LTE2LjMxOSwwLTIyLjU2ICAgICBsLTExMi0xMTJsLTIyLjcyLDIyLjcybDg0LjgsODQuNjRIMzIwYy0xLjQ0LDAtMTQ0LDEuNzYtMTQ0LDE2MFY0MTZ6IiBmaWxsPSIjRkZGRkZGIi8+PC9nPjwvZz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PC9zdmc+)}.download-image{background-image:url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/PjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDQ3MS4yIDQ3MS4yIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA0NzEuMiA0NzEuMjsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHdpZHRoPSI1MTJweCIgaGVpZ2h0PSI1MTJweCI+PGc+PGc+PHBhdGggZD0iTTQ1Ny43LDIzMC4xNWMtNy41LDAtMTMuNSw2LTEzLjUsMTMuNXYxMjIuOGMwLDMzLjQtMjcuMiw2MC41LTYwLjUsNjAuNUg4Ny41Yy0zMy40LDAtNjAuNS0yNy4yLTYwLjUtNjAuNXYtMTI0LjggICAgYzAtNy41LTYtMTMuNS0xMy41LTEzLjVzLTEzLjUsNi0xMy41LDEzLjV2MTI0LjhjMCw0OC4zLDM5LjMsODcuNSw4Ny41LDg3LjVoMjk2LjJjNDguMywwLDg3LjUtMzkuMyw4Ny41LTg3LjV2LTEyMi44ICAgIEM0NzEuMiwyMzYuMjUsNDY1LjIsMjMwLjE1LDQ1Ny43LDIzMC4xNXoiIGZpbGw9IiNGRkZGRkYiLz48cGF0aCBkPSJNMjI2LjEsMzQ2Ljc1YzIuNiwyLjYsNi4xLDQsOS41LDRzNi45LTEuMyw5LjUtNGw4NS44LTg1LjhjNS4zLTUuMyw1LjMtMTMuOCwwLTE5LjFjLTUuMy01LjMtMTMuOC01LjMtMTkuMSwwbC02Mi43LDYyLjggICAgVjMwLjc1YzAtNy41LTYtMTMuNS0xMy41LTEzLjVzLTEzLjUsNi0xMy41LDEzLjV2MjczLjlsLTYyLjgtNjIuOGMtNS4zLTUuMy0xMy44LTUuMy0xOS4xLDBjLTUuMyw1LjMtNS4zLDEzLjgsMCwxOS4xICAgIEwyMjYuMSwzNDYuNzV6IiBmaWxsPSIjRkZGRkZGIi8+PC9nPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48L3N2Zz4=)}.close-image{background-image:url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/PjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDQ3NS4yIDQ3NS4yIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA0NzUuMiA0NzUuMjsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHdpZHRoPSI1MTJweCIgaGVpZ2h0PSI1MTJweCI+PGc+PGc+PHBhdGggZD0iTTQwNS42LDY5LjZDMzYwLjcsMjQuNywzMDEuMSwwLDIzNy42LDBzLTEyMy4xLDI0LjctMTY4LDY5LjZTMCwxNzQuMSwwLDIzNy42czI0LjcsMTIzLjEsNjkuNiwxNjhzMTA0LjUsNjkuNiwxNjgsNjkuNiAgICBzMTIzLjEtMjQuNywxNjgtNjkuNnM2OS42LTEwNC41LDY5LjYtMTY4UzQ1MC41LDExNC41LDQwNS42LDY5LjZ6IE0zODYuNSwzODYuNWMtMzkuOCwzOS44LTkyLjcsNjEuNy0xNDguOSw2MS43ICAgIHMtMTA5LjEtMjEuOS0xNDguOS02MS43Yy04Mi4xLTgyLjEtODIuMS0yMTUuNywwLTI5Ny44QzEyOC41LDQ4LjfgMTgxLjQsMjcsMjM3LjYsMjdzMTA5LjEsMjEuOSwxNDguOSw2MS43ICAgIEM0NjguNiwxNzAuOCw0NjguNiwzMDQuNCwzODYuNSwzODYuNXoiIGZpbGw9IiNGRkZGRkYiLz48cGF0aCBkPSJNMzQyLjMsMTMyLjljLTUuMy01LjMtMTMuOC01LjMtMTkuMSwwbC04NS42LDg1LjZMMTUyLDEzMi45Yy01LjMtNS4zLTEzLjgtNS4zLTE5LjEsMGMtNS4zLDUuMy01LjMsMTMuOCwwLDE5LjEgICAgbDg1LjYsODUuNmwtODUuNiw4NS42Yy01LjMsNS4zLTUuMywxMy44LDAsMTkuMWMyLjYsMi42LDYuMSw0LDkuNSw0czYuOS0xLjMsOS41LTRsODUuNi04NS42bDg1LjYsODUuNmMyLjYsMi42LDYuMSw0LDkuNSw0ICAgIGMzLjUsMCw2LjktMS4zLDkuNS00YzUuMy01LjMsNS4zLTEzLjgsMC0xOS4xbC04NS40LTg1LjZsODUuNi04NS42QzM0Ny42LDE0Ni43LDM0Ny42LDEzOC4yLDM0Mi4zLDEzMi45eiIgZmlsbD0iI0ZGRkZGRiIvPjwvZz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PC9zdmc+)}.refresh-image{background-image:url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/PjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDQ4OS43MTEgNDg5LjcxMSIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNDg5LjcxMSA0ODkuNzExOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjUxMnB4IiBoZWlnaHQ9IjUxMnB4Ij48Zz48Zz48cGF0aCBkPSJNMTEyLjE1Niw5Ny4xMTFjNzIuMy02NS40LDE4MC41LTY2LjQsMjUzLjgtNi43bC01OC4xLDIuMmMtNy41LDAuMy0xMy4zLDYuNS0xMywxNGMwLjMsNy4zLDYuMywxMywxMy41LDEzICAgIGMwLjIsMCwwLjMsMCwwLjUsMGw4OS4yLTMuM2M3LjMtMC4zLDEzLTYuMiwxMy0xMy41di0xYzAtMC4yLDAtMC4zLDAtMC41di0wLjFsMCwwbC0zLjMtODguMmMtMC4zLTcuNS02LjYtMTMuMy0xNC0xMyAgICBjLTcuNSwwLjMtMTMuMyw2LjUtMTMsMTRsMi4xLDU1LjNjLTM2LjMtMjkuNy04MS00Ni45LTEyOC44LTQ5LjNjLTU5LjItMy0xMTYuMSwxNy4zLTE2MCw1Ny4xYy02MC40LDU0LjctODYsMTM3LjktNjYuOCwyMTcuMSAgICBjMS41LDYuMiw3LDEwLjMsMTMuMSwxMC4zYzEuMSwwLDIuMS0wLjEsMy4yLTAuNGM3LjItMS44LDExLjctOS4xLDkuOS0xNi4zQzM2LjY1NiwyMTguMjExLDU5LjA1NiwxNDUuMTExLDExMi4xNTYsOTcuMTExeiIgZmlsbD0iI0ZGRkZGRiIvPjxwYXRoIGQ9Ik00NjIuNDU2LDE5NS41MTFjLTEuOC03LjItOS4xLTExLjctMTYuMy05LjljLTcuMiwxLjgtMTEuNyw5LjEtOS45LDE2LjNjMTYuOSw2OS42LTUuNiwxNDIuNy01OC43LDE5MC43ICAgIGMtMzcuMywzMy43LTg0LjEsNTAuMy0xMzAuNyw1MC4zYy00NC41LDAtODguOS0xNS4xLTEyNC43LTQ0LjlsNTguOC01LjNjNy40LTAuNywxMi45LTcuMiwxMi4yLTE0LjdzLTcuMi0xMi45LTE0LjctMTIuMmwtODguOSw4ICAgIGMtNy40LDAuNy0xMi45LDcuMi0xMi4yLDE0LjdsOCw4OC45YzAuNiw3LDYuNSwxMi4zLDEzLjQsMTIuM2MwLjQsMCwwLjgsMCwxLjItMC4xYzcuNC0wLjcsMTIuOS03LjIsMTIuMi0xNC43bC00LjgtNTQuMSAgICBjMzYuMywyOS40LDgwLjgsNDYuNSwxMjguMyw0OC45YzMuOCwwLjIsNy42LDAuMywxMS4zLDAuM2M1NS4xLDAsMTA3LjUtMjAuMiwxNDguNy01Ny40ICAgIEM0NTYuMDU2LDM1Ny45MTEsNDgxLjY1NiwyNzQuODExLDQ2Mi40NTYsMTk1LjUxMXoiIGZpbGw9IiNGRkZGRkYiLz48L2c+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjwvc3ZnPg==)}.copy{background-image:url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/PjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDQ4OC4zIDQ4OC4zIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA0ODguMyA0ODguMzsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHdpZHRoPSI1MTJweCIgaGVpZ2h0PSI1MTJweCI+PGc+PGc+PHBhdGggZD0iTTMxNC4yNSw4NS40aC0yMjdjLTIxLjMsMC0zOC42LDE3LjMtMzguNiwzOC42djMyNS43YzAsMjEuMywxNy4zLDM4LjYsMzguNiwzOC42aDIyN2MyMS4zLDAsMzguNi0xNy4zLDM4LjYtMzguNlYxMjQgICAgQzM1Mi43NSwxMDIuNywzMzUuNDUsODUuNCwzMTQuMjUsODUuNHogTTMyNS43NSw0NDkuNmMwLDYuNC01LjIsMTEuNi0xMS42LDExLjZoLTIyN2MtNi40LDAtMTEuNi01LjItMTEuNi0xMS42VjEyNCAgICBjMC02LjQsNS4yLTExLjYsMTEuNi0xMS42aDIyN2M2LjQsMCwxMS42LDUuMiwxMS42LDExLjZWNDQ5LjZ6IiBmaWxsPSIjRkZGRkZGIi8+PHBhdGggZD0iTTQwMS4wNSwwaC0yMjdjLTIxLjMsMC0zOC42LDE3LjMtMzguNiwzOC42YzAsNy41LDYsMTMuNSwxMy41LDEzLjVzMTMuNS02LDEzLjUtMTMuNWMwLTYuNCw1LjItMTEuNiwxMS42LTExLjZoMjI3ICAgIGM2LjQsMCwxMS42LDUuMiwxMS42LDExLjZ2MzI1LjdjMCw2LjQtNS4yLDExLjYtMTEuNiwxMS42Yy03LjUsMC0xMy41LDYtMTMuNSwxMy41czYsMTMuNSwxMy41LDEzLjVjMjEuMywwLDM4LjYtMTcuMywzOC42LTM4LjYgICAgVjM4LjZDNDM5LjY1LDE3LjMsNDIyLjM1LDAsNDAxLjA1LDB6IiBmaWxsPSIjRkZGRkZGIi8+PC9nPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48L3N2Zz4=)}"]
                }] }
    ];
    UpperButtonsComponent.propDecorators = {
        currentImage: [{ type: Input }],
        buttonsConfig: [{ type: Input }],
        refresh: [{ type: Output }],
        delete: [{ type: Output }],
        navigate: [{ type: Output }],
        download: [{ type: Output }],
        close: [{ type: Output }],
        fullscreen: [{ type: Output }],
        customEmit: [{ type: Output }]
    };
    return UpperButtonsComponent;
}(AccessibleComponent));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Component with clickable dots (small circles) to navigate between images inside the modal gallery.
 */
var DotsComponent = /** @class */ (function (_super) {
    __extends(DotsComponent, _super);
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Component with image previews
 */
var PreviewsComponent = /** @class */ (function (_super) {
    __extends(PreviewsComponent, _super);
    function PreviewsComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * Output to emit the clicked preview. The payload contains the `InternalLibImage` associated to the clicked preview.
         */
        _this.clickPreview = new EventEmitter();
        /**
         * Array of `InternalLibImage` exposed to the template. This field is initialized
         * applying transformations, default values and so on to the input of the same type.
         */
        _this.previews = [];
        /**
         * Default preview's size object, also used in the template to apply default sizes to fgSize's directive.
         */
        _this.defaultPreviewSize = { height: '50px', width: 'auto' };
        /**
         * Default preview's config object
         */
        _this.defaultPreviewConfig = {
            visible: true,
            number: 3,
            arrows: true,
            clickable: true,
            // alwaysCenter: false, // TODO still not implemented
            size: _this.defaultPreviewSize
        };
        return _this;
    }
    /**
     * Method ´ngOnInit´ to build `configPreview` applying a default value and also to
     * init the `previews` array.
     * This is an Angular's lifecycle hook, so its called automatically by Angular itself.
     * In particular, it's called only one time!!!
     */
    /**
     * Method ´ngOnInit´ to build `configPreview` applying a default value and also to
     * init the `previews` array.
     * This is an Angular's lifecycle hook, so its called automatically by Angular itself.
     * In particular, it's called only one time!!!
     * @return {?}
     */
    PreviewsComponent.prototype.ngOnInit = /**
     * Method ´ngOnInit´ to build `configPreview` applying a default value and also to
     * init the `previews` array.
     * This is an Angular's lifecycle hook, so its called automatically by Angular itself.
     * In particular, it's called only one time!!!
     * @return {?}
     */
    function () {
        this.configPreview = Object.assign({}, this.defaultPreviewConfig, this.previewConfig);
        // if number is <= 0 reset to default
        if (this.configPreview && this.configPreview.number && this.configPreview.number <= 0) {
            this.configPreview.number = this.defaultPreviewConfig.number;
        }
        // init previews based on currentImage and the full array of images
        this.initPreviews(this.currentImage, this.images);
    };
    /**
     * Method to check if an image is active (i.e. a preview image).
     * @param InternalLibImage preview is an image to check if it's active or not
     * @returns boolean true if is active, false otherwise
     */
    /**
     * Method to check if an image is active (i.e. a preview image).
     * @param {?} preview
     * @return {?} boolean true if is active, false otherwise
     */
    PreviewsComponent.prototype.isActive = /**
     * Method to check if an image is active (i.e. a preview image).
     * @param {?} preview
     * @return {?} boolean true if is active, false otherwise
     */
    function (preview) {
        if (!preview || !this.currentImage) {
            return false;
        }
        return preview.id === this.currentImage.id;
    };
    // TODO improve this method to simplify the sourcecode + remove duplicated codelines
    /**
     * Method ´ngOnChanges´ to update `previews` array.
     * Also, both `start` and `end` local variables will be updated accordingly.
     * This is an Angular's lifecycle hook, so its called automatically by Angular itself.
     * In particular, it's called when any data-bound property of a directive changes!!!
     */
    /**
     * Method ´ngOnChanges´ to update `previews` array.
     * Also, both `start` and `end` local variables will be updated accordingly.
     * This is an Angular's lifecycle hook, so its called automatically by Angular itself.
     * In particular, it's called when any data-bound property of a directive changes!!!
     * @param {?} changes
     * @return {?}
     */
    PreviewsComponent.prototype.ngOnChanges = /**
     * Method ´ngOnChanges´ to update `previews` array.
     * Also, both `start` and `end` local variables will be updated accordingly.
     * This is an Angular's lifecycle hook, so its called automatically by Angular itself.
     * In particular, it's called when any data-bound property of a directive changes!!!
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        /** @type {?} */
        var images = changes["images"];
        /** @type {?} */
        var currentImage = changes["currentImage"];
        /** @type {?} */
        var prev;
        /** @type {?} */
        var current;
        if (currentImage) {
            prev = currentImage.previousValue;
            current = currentImage.currentValue;
        }
        else {
            current = this.currentImage;
        }
        if (current && images && images.previousValue && images.currentValue) {
            // I'm in this if statement, if input images are changed (for instance, because I removed one of them with the 'delete button',
            // or because users changed the images array while modal gallery is still open).
            // In this case, I have to re-init previews, because the input array of images is changed.
            this.initPreviews(current, images.currentValue);
        }
        if (prev && current && prev.id !== current.id) {
            this.updatePreviews(prev, current);
        }
    };
    /**
     * Method called by events from both keyboard and mouse on a preview.
     * This will trigger the `clickpreview` output with the input preview as its payload.
     * @param InternalLibImage preview that triggered this method
     * @param KeyboardEvent | MouseEvent event payload
     */
    /**
     * Method called by events from both keyboard and mouse on a preview.
     * This will trigger the `clickpreview` output with the input preview as its payload.
     * @param {?} preview
     * @param {?} event
     * @return {?}
     */
    PreviewsComponent.prototype.onImageEvent = /**
     * Method called by events from both keyboard and mouse on a preview.
     * This will trigger the `clickpreview` output with the input preview as its payload.
     * @param {?} preview
     * @param {?} event
     * @return {?}
     */
    function (preview, event) {
        if (!this.configPreview || !this.configPreview.clickable) {
            return;
        }
        /** @type {?} */
        var result = _super.prototype.handleImageEvent.call(this, event);
        if (result === NEXT) {
            this.clickPreview.emit(preview);
        }
        else if (result === PREV) {
            this.clickPreview.emit(preview);
        }
    };
    /**
     * Method called by events from both keyboard and mouse on a navigation arrow.
     * @param string direction of the navigation that can be either 'next' or 'prev'
     * @param KeyboardEvent | MouseEvent event payload
     */
    /**
     * Method called by events from both keyboard and mouse on a navigation arrow.
     * @param {?} direction
     * @param {?} event
     * @return {?}
     */
    PreviewsComponent.prototype.onNavigationEvent = /**
     * Method called by events from both keyboard and mouse on a navigation arrow.
     * @param {?} direction
     * @param {?} event
     * @return {?}
     */
    function (direction, event) {
        /** @type {?} */
        var result = _super.prototype.handleNavigationEvent.call(this, direction, event);
        if (result === NEXT) {
            this.next();
        }
        else if (result === PREV) {
            this.previous();
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
    PreviewsComponent.prototype.trackById = /**
     * Method used in the template to track ids in ngFor.
     * @param {?} index
     * @param {?} item
     * @return {?} number the id of the item
     */
    function (index, item) {
        return item.id;
    };
    /**
     * Private method to init previews based on the currentImage and the full array of images.
     * The current image in mandatory to show always the current preview (as highlighted).
     * @param {?} currentImage
     * @param {?} images
     * @return {?}
     */
    PreviewsComponent.prototype.initPreviews = /**
     * Private method to init previews based on the currentImage and the full array of images.
     * The current image in mandatory to show always the current preview (as highlighted).
     * @param {?} currentImage
     * @param {?} images
     * @return {?}
     */
    function (currentImage, images) {
        var _this = this;
        /** @type {?} */
        var index;
        try {
            index = getIndex(currentImage, images);
        }
        catch (err) {
            throw err;
        }
        switch (index) {
            case 0:
                // first image
                this.setBeginningIndexesPreviews();
                break;
            case images.length - 1:
                // last image
                this.setEndIndexesPreviews();
                break;
            default:
                // other images
                this.setIndexesPreviews();
                break;
        }
        this.previews = images.filter(function (img, i) { return i >= _this.start && i < _this.end; });
    };
    /**
     * Private method to init both `start` and `end` to the beginning.
     * @return {?}
     */
    PreviewsComponent.prototype.setBeginningIndexesPreviews = /**
     * Private method to init both `start` and `end` to the beginning.
     * @return {?}
     */
    function () {
        this.start = 0;
        this.end = Math.min(/** @type {?} */ (this.configPreview.number), this.images.length);
    };
    /**
     * Private method to init both `start` and `end` to the end.
     * @return {?}
     */
    PreviewsComponent.prototype.setEndIndexesPreviews = /**
     * Private method to init both `start` and `end` to the end.
     * @return {?}
     */
    function () {
        this.start = this.images.length - 1 - (/** @type {?} */ (this.configPreview.number) - 1);
        this.end = this.images.length;
    };
    /**
     * Private method to update both `start` and `end` based on the currentImage.
     * @return {?}
     */
    PreviewsComponent.prototype.setIndexesPreviews = /**
     * Private method to update both `start` and `end` based on the currentImage.
     * @return {?}
     */
    function () {
        this.start = getIndex(this.currentImage, this.images) - Math.floor(/** @type {?} */ (this.configPreview.number) / 2);
        this.end = getIndex(this.currentImage, this.images) + Math.floor(/** @type {?} */ (this.configPreview.number) / 2) + 1;
    };
    /**
     * Private method to update the visible previews navigating to the right (next).
     * @return {?}
     */
    PreviewsComponent.prototype.next = /**
     * Private method to update the visible previews navigating to the right (next).
     * @return {?}
     */
    function () {
        var _this = this;
        // check if nextImage should be blocked
        if (this.isPreventSliding(this.images.length - 1)) {
            return;
        }
        if (this.end === this.images.length) {
            return;
        }
        this.start++;
        this.end = Math.min(this.end + 1, this.images.length);
        this.previews = this.images.filter(function (img, i) { return i >= _this.start && i < _this.end; });
    };
    /**
     * Private method to update the visible previews navigating to the left (previous).
     * @return {?}
     */
    PreviewsComponent.prototype.previous = /**
     * Private method to update the visible previews navigating to the left (previous).
     * @return {?}
     */
    function () {
        var _this = this;
        // check if prevImage should be blocked
        if (this.isPreventSliding(0)) {
            return;
        }
        if (this.start === 0) {
            return;
        }
        this.start = Math.max(this.start - 1, 0);
        this.end = Math.min(this.end - 1, this.images.length);
        this.previews = this.images.filter(function (img, i) { return i >= _this.start && i < _this.end; });
    };
    /**
     * Private method to block/permit sliding between previews.
     * @param {?} boundaryIndex
     * @return {?} boolean if true block sliding, otherwise not
     */
    PreviewsComponent.prototype.isPreventSliding = /**
     * Private method to block/permit sliding between previews.
     * @param {?} boundaryIndex
     * @return {?} boolean if true block sliding, otherwise not
     */
    function (boundaryIndex) {
        return !!this.slideConfig && this.slideConfig.infinite === false && getIndex(this.currentImage, this.previews) === boundaryIndex;
    };
    /**
     * Private method to handle navigation changing the previews array and other variables.
     * @param {?} prev
     * @param {?} current
     * @return {?}
     */
    PreviewsComponent.prototype.updatePreviews = /**
     * Private method to handle navigation changing the previews array and other variables.
     * @param {?} prev
     * @param {?} current
     * @return {?}
     */
    function (prev, current) {
        var _this = this;
        /** @type {?} */
        var prevIndex;
        /** @type {?} */
        var currentIndex;
        try {
            prevIndex = getIndex(prev, this.images);
            currentIndex = getIndex(current, this.images);
        }
        catch (err) {
            console.error('Cannot get previous and current image indexes in previews');
            throw err;
        }
        if (prevIndex === this.images.length - 1 && currentIndex === 0) {
            // first image
            this.setBeginningIndexesPreviews();
            this.previews = this.images.filter(function (img, i) { return i >= _this.start && i < _this.end; });
            return;
        }
        // the same for the opposite case, when you navigate back from the fist image to go to the last one.
        if (prevIndex === 0 && currentIndex === this.images.length - 1) {
            // last image
            this.setEndIndexesPreviews();
            this.previews = this.images.filter(function (img, i) { return i >= _this.start && i < _this.end; });
            return;
        }
        // otherwise manage standard scenarios
        if (prevIndex > currentIndex) {
            this.previous();
        }
        else if (prevIndex < currentIndex) {
            this.next();
        }
    };
    PreviewsComponent.decorators = [
        { type: Component, args: [{
                    selector: 'fg-previews',
                    template: "<nav class=\"previews-container\"\n     [attr.aria-label]=\"accessibilityConfig?.previewsContainerAriaLabel\"\n     [title]=\"accessibilityConfig?.previewsContainerTitle\">\n\n  <ng-container *ngIf=\"configPreview?.visible\">\n    <a class=\"nav-left\"\n       [attr.aria-label]=\"accessibilityConfig?.previewScrollPrevAriaLabel\"\n       [tabindex]=\"configPreview.arrows && start > 0 ? 0 : -1\" role=\"button\"\n       (click)=\"onNavigationEvent('left', $event)\" (keyup)=\"onNavigationEvent('left', $event)\">\n      <div class=\"inside {{configPreview.arrows && start > 0 ? 'left-arrow-preview-image' : 'empty-arrow-preview-image'}}\"\n           aria-hidden=\"true\"\n           [title]=\"accessibilityConfig?.previewScrollPrevTitle\"></div>\n    </a>\n\n    <ng-container *ngFor=\"let preview of previews; trackBy: trackById; let index = index\">\n      <img *ngIf=\"preview?.modal?.img\"\n           class=\"inside preview-image {{isActive(preview) ? 'active' : ''}}{{!configPreview.clickable ? ' unclickable' : ''}}\"\n           [src]=\"preview.plain?.img ? preview.plain.img : preview.modal.img\"\n           fgSize [sizeConfig]=\"{width: configPreview.size ? configPreview.size.width : defaultPreviewSize.width,\n                                 height: configPreview.size ? configPreview.size.height : defaultPreviewSize.height}\"\n           [attr.aria-label]=\"preview.modal.ariaLabel ? preview.modal.ariaLabel : ''\"\n           [title]=\"preview.modal.title ? preview.modal.title : ''\"\n           alt=\"{{preview.modal.alt ? preview.modal.alt : ''}}\"\n           [tabindex]=\"0\" role=\"img\"\n           (click)=\"onImageEvent(preview, $event)\" (keyup)=\"onImageEvent(preview, $event)\"/>\n    </ng-container>\n\n\n    <a class=\"nav-right\"\n       [attr.aria-label]=\"accessibilityConfig?.previewScrollNextAriaLabel\"\n       [tabindex]=\"configPreview.arrows && end < images.length ? 0 : -1\" role=\"button\"\n       (click)=\"onNavigationEvent('right', $event)\" (keyup)=\"onNavigationEvent('right', $event)\">\n      <div class=\"inside {{configPreview.arrows && end < images.length ? 'right-arrow-preview-image' : 'empty-arrow-preview-image'}}\"\n           aria-hidden=\"true\"\n           [title]=\"accessibilityConfig?.previewScrollNextTitle\"></div>\n    </a>\n  </ng-container>\n\n</nav>\n",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: ["@media only screen and (max-width:767px),only screen and (max-device-width:767px){.previews-container,.previews-container>.nav-left,.previews-container>.nav-right,.previews-container>.preview-image{display:none}}@media only screen and (min-device-width:768px){.previews-container{align-items:center;-webkit-animation:.8s fadein-semi-visible08;animation:.8s fadein-semi-visible08;display:flex;flex-direction:row;justify-content:center;margin-bottom:15px}.previews-container>.preview-image{cursor:pointer;margin-left:2px;margin-right:2px;opacity:.7;height:50px}.previews-container>.preview-image.active{opacity:1}.previews-container>.preview-image.unclickable{cursor:not-allowed}.previews-container>.preview-image:hover{opacity:1;transition:opacity .5s}.previews-container .nav,.previews-container>.nav-left,.previews-container>.nav-right{color:#919191;cursor:pointer;transition:.5s}.previews-container .nav:hover,.previews-container>.nav-left:hover,.previews-container>.nav-right:hover{-webkit-transform:scale(1.1);transform:scale(1.1)}.previews-container>.nav-left{margin-right:10px}.previews-container>.nav-right{margin-left:10px}}@-webkit-keyframes fadein-visible{from{opacity:0}to{opacity:1}}@keyframes fadein-visible{from{opacity:0}to{opacity:1}}@-webkit-keyframes fadein-semi-visible05{from{opacity:0}to{opacity:.5}}@keyframes fadein-semi-visible05{from{opacity:0}to{opacity:.5}}@-webkit-keyframes fadein-semi-visible08{from{opacity:0}to{opacity:.8}}@keyframes fadein-semi-visible08{from{opacity:0}to{opacity:.8}}@-webkit-keyframes fadein-semi-visible09{from{opacity:0}to{opacity:.9}}@keyframes fadein-semi-visible09{from{opacity:0}to{opacity:.9}}", ".arrow-preview-image,.empty-arrow-preview-image,.left-arrow-preview-image,.right-arrow-preview-image{width:15px;height:15px;opacity:.5}.empty-arrow-preview-image{background:#000;opacity:0}.left-arrow-preview-image{background-image:url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/PjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDQ3Ny4xNzUgNDc3LjE3NSIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNDc3LjE3NSA0NzcuMTc1OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjUxMnB4IiBoZWlnaHQ9IjUxMnB4Ij48Zz48cGF0aCBkPSJNMTQ1LjE4OCwyMzguNTc1bDIxNS41LTIxNS41YzUuMy01LjMsNS4zLTEzLjgsMC0xOS4xcy0xMy44LTUuMy0xOS4xLDBsLTIyNS4xLDIyNS4xYy01LjMsNS4zLTUuMywxMy44LDAsMTkuMWwyMjUuMSwyMjUgICBjMi42LDIuNiw2LjEsNCw5LjUsNHM2LjktMS4zLDkuNS00YzUuMy01LjMsNS4zLTEzLjgsMC0xOS4xTDE0NS4xODgsMjM4LjU3NXoiIGZpbGw9IiNGRkZGRkYiLz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PC9zdmc+);background-size:15px;transition:.5s}.left-arrow-preview-image:hover{-webkit-transform:scale(1.2);transform:scale(1.2)}.right-arrow-preview-image{background-image:url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/PjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDQ3Ny4xNzUgNDc3LjE3NSIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNDc3LjE3NSA0NzcuMTc1OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjUxMnB4IiBoZWlnaHQ9IjUxMnB4Ij48Zz48cGF0aCBkPSJNMzYwLjczMSwyMjkuMDc1bC0yMjUuMS0yMjUuMWMtNS4zLTUuMy0xMy44LTUuMy0xOS4xLDBzLTUuMywxMy44LDAsMTkuMWwyMTUuNSwyMTUuNWwtMjE1LjUsMjE1LjUgICBjLTUuMyw1LjMtNS4zLDEzLjgsMCwxOS4xYzIuNiwyLjYsNi4xLDQsOS41LDRjMy40LDAsNi45LTEuMyw5LjUtNGwyMjUuMS0yMjUuMUMzNjUuOTMxLDI0Mi44NzUsMzY1LjkzMSwyMzQuMjc1LDM2MC43MzEsMjI5LjA3NXogICAiIGZpbGw9IiNGRkZGRkYiLz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PC9zdmc+);background-size:15px;transition:.5s}.right-arrow-preview-image:hover{-webkit-transform:scale(1.2);transform:scale(1.2)}"]
                }] }
    ];
    PreviewsComponent.propDecorators = {
        currentImage: [{ type: Input }],
        images: [{ type: Input }],
        slideConfig: [{ type: Input }],
        previewConfig: [{ type: Input }],
        accessibilityConfig: [{ type: Input }],
        clickPreview: [{ type: Output }]
    };
    return PreviewsComponent;
}(AccessibleComponent));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Component with the loading spinner
 */
var LoadingSpinnerComponent = /** @class */ (function () {
    function LoadingSpinnerComponent() {
        /**
         * Enum of type `LoadingType` to choose the standard loading spinner.
         * Declared here to be used inside the template.
         */
        this.loadingStandard = LoadingType.STANDARD;
        /**
         * Enum of type `LoadingType` to choose the bars loading spinner.
         * Declared here to be used inside the template.
         */
        this.loadingBars = LoadingType.BARS;
        /**
         * Enum of type `LoadingType` to choose the circular loading spinner.
         * Declared here to be used inside the template.
         */
        this.loadingCircular = LoadingType.CIRCULAR;
        /**
         * Enum of type `LoadingType` to choose the dots loading spinner.
         * Declared here to be used inside the template.
         */
        this.loadingDots = LoadingType.DOTS;
        /**
         * Enum of type `LoadingType` to choose the cube flipping loading spinner.
         * Declared here to be used inside the template.
         */
        this.loadingCubeFlipping = LoadingType.CUBE_FLIPPING;
        /**
         * Enum of type `LoadingType` to choose the circles loading spinner.
         * Declared here to be used inside the template.
         */
        this.loadingCircles = LoadingType.CIRCLES;
        /**
         * Enum of type `LoadingType` to choose the explosing squares loading spinner.
         * Declared here to be used inside the template.
         */
        this.loadingExplosingSquares = LoadingType.EXPLOSING_SQUARES;
    }
    LoadingSpinnerComponent.decorators = [
        { type: Component, args: [{
                    selector: 'fg-loading-spinner',
                    template: "<div [attr.aria-label]=\"accessibilityConfig?.loadingSpinnerAriaLabel\"\n     [title]=\"accessibilityConfig?.loadingSpinnerTitle\">\n\n  <ng-container [ngSwitch]=\"loadingConfig.type\">\n    <ng-container *ngSwitchCase=\"loadingStandard\">\n      <div class=\"cssload-loader\">\n        <div class=\"cssload-inner cssload-one\"></div>\n        <div class=\"cssload-inner cssload-two\"></div>\n        <div class=\"cssload-inner cssload-three\"></div>\n      </div>\n    </ng-container>\n    <ng-container *ngSwitchCase=\"loadingBars\">\n      <div class=\"loader-bars\">\n      </div>\n    </ng-container>\n    <ng-container *ngSwitchCase=\"loadingCircular\">\n      <div class=\"loader-circular\">\n      </div>\n    </ng-container>\n    <ng-container *ngSwitchCase=\"loadingDots\">\n      <div class=\"loader-dots\">\n      </div>\n    </ng-container>\n    <ng-container *ngSwitchCase=\"loadingCubeFlipping\">\n      <div class=\"cube-wrapper\">\n        <div class=\"cube-folding\">\n          <span class=\"leaf1\"></span>\n          <span class=\"leaf2\"></span>\n          <span class=\"leaf3\"></span>\n          <span class=\"leaf4\"></span>\n        </div>\n      </div>\n    </ng-container>\n    <ng-container *ngSwitchCase=\"loadingCircles\">\n      <div id=\"preloader\">\n        <div id=\"loader\"></div>\n      </div>\n    </ng-container>\n    <ng-container *ngSwitchCase=\"loadingExplosingSquares\">\n      <div class=\"loader\">\n        <span></span>\n        <span></span>\n        <span></span>\n        <span></span>\n      </div>\n    </ng-container>\n    <!--<ng-container *ngSwitchDefault>-->\n    <!---->\n    <!--</ng-container>-->\n  </ng-container>\n</div>\n",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: [".cssload-loader{position:absolute;top:0;bottom:0;right:0;left:0;margin:auto;width:64px;height:64px;border-radius:50%;-o-border-radius:50%;-ms-border-radius:50%;-webkit-border-radius:50%;-moz-border-radius:50%;-webkit-perspective:800px;perspective:800px}.cssload-inner{position:absolute;width:100%;height:100%;box-sizing:border-box;-o-box-sizing:border-box;-ms-box-sizing:border-box;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;border-radius:50%;-o-border-radius:50%;-ms-border-radius:50%;-webkit-border-radius:50%;-moz-border-radius:50%}.cssload-inner.cssload-one{left:0;top:0;animation:.6s linear infinite cssload-rotate-one;-o-animation:.6s linear infinite cssload-rotate-one;-ms-animation:cssload-rotate-one .6s linear infinite;-webkit-animation:.6s linear infinite cssload-rotate-one;-moz-animation:.6s linear infinite cssload-rotate-one;border-bottom:3px solid rgba(255,255,255,.99)}.cssload-inner.cssload-two{right:0;top:0;animation:.6s linear infinite cssload-rotate-two;-o-animation:.6s linear infinite cssload-rotate-two;-ms-animation:cssload-rotate-two .6s linear infinite;-webkit-animation:.6s linear infinite cssload-rotate-two;-moz-animation:.6s linear infinite cssload-rotate-two;border-right:3px solid #fff}.cssload-inner.cssload-three{right:0;bottom:0;animation:.6s linear infinite cssload-rotate-three;-o-animation:.6s linear infinite cssload-rotate-three;-ms-animation:cssload-rotate-three .6s linear infinite;-webkit-animation:.6s linear infinite cssload-rotate-three;-moz-animation:.6s linear infinite cssload-rotate-three;border-top:3px solid #fff}@keyframes cssload-rotate-one{0%{-webkit-transform:rotateX(35deg) rotateY(-45deg) rotateZ(0);transform:rotateX(35deg) rotateY(-45deg) rotateZ(0)}100%{-webkit-transform:rotateX(35deg) rotateY(-45deg) rotateZ(360deg);transform:rotateX(35deg) rotateY(-45deg) rotateZ(360deg)}}@-webkit-keyframes cssload-rotate-one{0%{-webkit-transform:rotateX(35deg) rotateY(-45deg) rotateZ(0)}100%{-webkit-transform:rotateX(35deg) rotateY(-45deg) rotateZ(360deg)}}@keyframes cssload-rotate-two{0%{-webkit-transform:rotateX(50deg) rotateY(10deg) rotateZ(0);transform:rotateX(50deg) rotateY(10deg) rotateZ(0)}100%{-webkit-transform:rotateX(50deg) rotateY(10deg) rotateZ(360deg);transform:rotateX(50deg) rotateY(10deg) rotateZ(360deg)}}@-webkit-keyframes cssload-rotate-two{0%{-webkit-transform:rotateX(50deg) rotateY(10deg) rotateZ(0)}100%{-webkit-transform:rotateX(50deg) rotateY(10deg) rotateZ(360deg)}}@keyframes cssload-rotate-three{0%{-webkit-transform:rotateX(35deg) rotateY(55deg) rotateZ(0);transform:rotateX(35deg) rotateY(55deg) rotateZ(0)}100%{-webkit-transform:rotateX(35deg) rotateY(55deg) rotateZ(360deg);transform:rotateX(35deg) rotateY(55deg) rotateZ(360deg)}}@-webkit-keyframes cssload-rotate-three{0%{-webkit-transform:rotateX(35deg) rotateY(55deg) rotateZ(0)}100%{-webkit-transform:rotateX(35deg) rotateY(55deg) rotateZ(360deg)}}", ".loader-dots{position:absolute;top:0;bottom:0;right:0;left:0;color:#fefcff;font-size:10px;margin:auto;width:1em;height:1em;border-radius:50%;text-indent:-9999em;-webkit-animation:1.3s linear infinite load4;animation:1.3s linear infinite load4;-webkit-transform:translateZ(0);transform:translateZ(0)}@-webkit-keyframes load4{0%,100%{box-shadow:0 -3em 0 .2em,2em -2em 0 0,3em 0 0 -1em,2em 2em 0 -1em,0 3em 0 -1em,-2em 2em 0 -1em,-3em 0 0 -1em,-2em -2em 0 0}12.5%{box-shadow:0 -3em 0 0,2em -2em 0 .2em,3em 0 0 0,2em 2em 0 -1em,0 3em 0 -1em,-2em 2em 0 -1em,-3em 0 0 -1em,-2em -2em 0 -1em}25%{box-shadow:0 -3em 0 -.5em,2em -2em 0 0,3em 0 0 .2em,2em 2em 0 0,0 3em 0 -1em,-2em 2em 0 -1em,-3em 0 0 -1em,-2em -2em 0 -1em}37.5%{box-shadow:0 -3em 0 -1em,2em -2em 0 -1em,3em 0 0 0,2em 2em 0 .2em,0 3em 0 0,-2em 2em 0 -1em,-3em 0 0 -1em,-2em -2em 0 -1em}50%{box-shadow:0 -3em 0 -1em,2em -2em 0 -1em,3em 0 0 -1em,2em 2em 0 0,0 3em 0 .2em,-2em 2em 0 0,-3em 0 0 -1em,-2em -2em 0 -1em}62.5%{box-shadow:0 -3em 0 -1em,2em -2em 0 -1em,3em 0 0 -1em,2em 2em 0 -1em,0 3em 0 0,-2em 2em 0 .2em,-3em 0 0 0,-2em -2em 0 -1em}75%{box-shadow:0 -3em 0 -1em,2em -2em 0 -1em,3em 0 0 -1em,2em 2em 0 -1em,0 3em 0 -1em,-2em 2em 0 0,-3em 0 0 .2em,-2em -2em 0 0}87.5%{box-shadow:0 -3em 0 0,2em -2em 0 -1em,3em 0 0 -1em,2em 2em 0 -1em,0 3em 0 -1em,-2em 2em 0 0,-3em 0 0 0,-2em -2em 0 .2em}}@keyframes load4{0%,100%{box-shadow:0 -3em 0 .2em,2em -2em 0 0,3em 0 0 -1em,2em 2em 0 -1em,0 3em 0 -1em,-2em 2em 0 -1em,-3em 0 0 -1em,-2em -2em 0 0}12.5%{box-shadow:0 -3em 0 0,2em -2em 0 .2em,3em 0 0 0,2em 2em 0 -1em,0 3em 0 -1em,-2em 2em 0 -1em,-3em 0 0 -1em,-2em -2em 0 -1em}25%{box-shadow:0 -3em 0 -.5em,2em -2em 0 0,3em 0 0 .2em,2em 2em 0 0,0 3em 0 -1em,-2em 2em 0 -1em,-3em 0 0 -1em,-2em -2em 0 -1em}37.5%{box-shadow:0 -3em 0 -1em,2em -2em 0 -1em,3em 0 0 0,2em 2em 0 .2em,0 3em 0 0,-2em 2em 0 -1em,-3em 0 0 -1em,-2em -2em 0 -1em}50%{box-shadow:0 -3em 0 -1em,2em -2em 0 -1em,3em 0 0 -1em,2em 2em 0 0,0 3em 0 .2em,-2em 2em 0 0,-3em 0 0 -1em,-2em -2em 0 -1em}62.5%{box-shadow:0 -3em 0 -1em,2em -2em 0 -1em,3em 0 0 -1em,2em 2em 0 -1em,0 3em 0 0,-2em 2em 0 .2em,-3em 0 0 0,-2em -2em 0 -1em}75%{box-shadow:0 -3em 0 -1em,2em -2em 0 -1em,3em 0 0 -1em,2em 2em 0 -1em,0 3em 0 -1em,-2em 2em 0 0,-3em 0 0 .2em,-2em -2em 0 0}87.5%{box-shadow:0 -3em 0 0,2em -2em 0 -1em,3em 0 0 -1em,2em 2em 0 -1em,0 3em 0 -1em,-2em 2em 0 0,-3em 0 0 0,-2em -2em 0 .2em}}", ".loader-bars,.loader-bars:after,.loader-bars:before{background:#fefcff;-webkit-animation:1s ease-in-out infinite load1;animation:1s ease-in-out infinite load1;width:1em;height:4em}.loader-bars{position:absolute;top:0;bottom:0;right:0;left:0;color:#fefcff;text-indent:-9999em;margin:auto;font-size:11px;-webkit-transform:translateZ(0);transform:translateZ(0);-webkit-animation-delay:-.16s;animation-delay:-.16s}.loader-bars:after,.loader-bars:before{position:absolute;top:0;content:''}.loader-bars:before{left:-1.5em;-webkit-animation-delay:-.32s;animation-delay:-.32s}.loader-bars:after{left:1.5em}@-webkit-keyframes load1{0%,100%,80%{box-shadow:0 0;height:4em}40%{box-shadow:0 -2em;height:5em}}@keyframes load1{0%,100%,80%{box-shadow:0 0;height:4em}40%{box-shadow:0 -2em;height:5em}}", ".loader-circular,.loader-circular:after{border-radius:50%;width:10em;height:10em}.loader-circular{position:absolute;top:0;bottom:0;right:0;left:0;margin:auto;font-size:10px;text-indent:-9999em;border-top:1.1em solid rgba(255,255,255,.2);border-right:1.1em solid rgba(255,255,255,.2);border-bottom:1.1em solid rgba(255,255,255,.2);border-left:1.1em solid #fff;-webkit-transform:translateZ(0);transform:translateZ(0);-webkit-animation:1.1s linear infinite load8;animation:1.1s linear infinite load8}@-webkit-keyframes load8{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes load8{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}", ".cube-folding{width:50px;height:50px;display:inline-block;-webkit-transform:rotate(45deg);transform:rotate(45deg);font-size:0}.cube-folding span{position:relative;width:25px;height:25px;-webkit-transform:scale(1.1);transform:scale(1.1);display:inline-block}.cube-folding span::before{content:'';background-color:#fff;position:absolute;left:0;top:0;display:block;width:25px;height:25px;-webkit-transform-origin:100% 100%;transform-origin:100% 100%;-webkit-animation:2.5s linear infinite both folding;animation:2.5s linear infinite both folding}.cube-folding .leaf2{-webkit-transform:rotateZ(90deg) scale(1.1);transform:rotateZ(90deg) scale(1.1)}.cube-folding .leaf2::before{-webkit-animation-delay:.3s;animation-delay:.3s;background-color:#f2f2f2}.cube-folding .leaf3{-webkit-transform:rotateZ(270deg) scale(1.1);transform:rotateZ(270deg) scale(1.1)}.cube-folding .leaf3::before{-webkit-animation-delay:.9s;animation-delay:.9s;background-color:#f2f2f2}.cube-folding .leaf4{-webkit-transform:rotateZ(180deg) scale(1.1);transform:rotateZ(180deg) scale(1.1)}.cube-folding .leaf4::before{-webkit-animation-delay:.6s;animation-delay:.6s;background-color:#e6e6e6}@-webkit-keyframes folding{0%,10%{-webkit-transform:perspective(140px) rotateX(-180deg);transform:perspective(140px) rotateX(-180deg);opacity:0}25%,75%{-webkit-transform:perspective(140px) rotateX(0);transform:perspective(140px) rotateX(0);opacity:1}100%,90%{-webkit-transform:perspective(140px) rotateY(180deg);transform:perspective(140px) rotateY(180deg);opacity:0}}@keyframes folding{0%,10%{-webkit-transform:perspective(140px) rotateX(-180deg);transform:perspective(140px) rotateX(-180deg);opacity:0}25%,75%{-webkit-transform:perspective(140px) rotateX(0);transform:perspective(140px) rotateX(0);opacity:1}100%,90%{-webkit-transform:perspective(140px) rotateY(180deg);transform:perspective(140px) rotateY(180deg);opacity:0}}.cube-wrapper{position:fixed;left:50%;top:50%;margin-top:-50px;margin-left:-50px;width:100px;height:100px;text-align:center}@-webkit-keyframes text{100%{top:35px}}@keyframes text{100%{top:35px}}@-webkit-keyframes shadow{100%{bottom:-18px;width:100px}}@keyframes shadow{100%{bottom:-18px;width:100px}}", "#preloader{position:fixed;top:0;left:0;width:100%;height:100%}#loader{display:block;position:relative;left:50%;top:50%;width:100px;height:100px;margin:-75px 0 0 -75px;border-radius:50%;border:3px solid transparent;border-top-color:#b4b4b4;-webkit-animation:2s linear infinite spin;animation:2s linear infinite spin}#loader:before{content:\"\";position:absolute;top:5px;left:5px;right:5px;bottom:5px;border-radius:50%;border:3px solid transparent;border-top-color:#d9d9d9;-webkit-animation:3s linear infinite spin;animation:3s linear infinite spin}#loader:after{content:\"\";position:absolute;top:15px;left:15px;right:15px;bottom:15px;border-radius:50%;border:3px solid transparent;border-top-color:#fff;-webkit-animation:1.5s linear infinite spin;animation:1.5s linear infinite spin}@-webkit-keyframes spin{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes spin{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}", "@-webkit-keyframes loader{0%,10%,100%{width:60px;height:60px}65%{width:150px;height:150px}}@keyframes loader{0%,10%,100%{width:60px;height:60px}65%{width:150px;height:150px}}@-webkit-keyframes loaderBlock{0%,30%{-webkit-transform:rotate(0);transform:rotate(0)}55%{background-color:#b4b4b4}100%{-webkit-transform:rotate(90deg);transform:rotate(90deg)}}@keyframes loaderBlock{0%,30%{-webkit-transform:rotate(0);transform:rotate(0)}55%{background-color:#b4b4b4}100%{-webkit-transform:rotate(90deg);transform:rotate(90deg)}}@-webkit-keyframes loaderBlockInverse{0%,20%{-webkit-transform:rotate(0);transform:rotate(0)}55%{background-color:#d9d9d9}100%{-webkit-transform:rotate(-90deg);transform:rotate(-90deg)}}@keyframes loaderBlockInverse{0%,20%{-webkit-transform:rotate(0);transform:rotate(0)}55%{background-color:#d9d9d9}100%{-webkit-transform:rotate(-90deg);transform:rotate(-90deg)}}.loader{position:absolute;top:50%;left:50%;width:60px;height:60px;-webkit-transform:translate(-50%,-50%) rotate(45deg) translate3d(0,0,0);transform:translate(-50%,-50%) rotate(45deg) translate3d(0,0,0);-webkit-animation:1.2s ease-in-out infinite loader;animation:1.2s ease-in-out infinite loader}.loader span{position:absolute;display:block;width:40px;height:40px;background-color:#fff;-webkit-animation:1.2s ease-in-out infinite both loaderBlock;animation:1.2s ease-in-out infinite both loaderBlock}.loader span:nth-child(1){top:0;left:0}.loader span:nth-child(2){top:0;right:0;-webkit-animation:1.2s ease-in-out infinite both loaderBlockInverse;animation:1.2s ease-in-out infinite both loaderBlockInverse}.loader span:nth-child(3){bottom:0;left:0;-webkit-animation:1.2s ease-in-out infinite both loaderBlockInverse;animation:1.2s ease-in-out infinite both loaderBlockInverse}.loader span:nth-child(4){bottom:0;right:0}"]
                }] }
    ];
    LoadingSpinnerComponent.propDecorators = {
        loadingConfig: [{ type: Input }],
        accessibilityConfig: [{ type: Input }]
    };
    return LoadingSpinnerComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** *
 * Array of all components.
  @type {?} */
var COMPONENTS = [
    BackgroundComponent,
    PlainGalleryComponent,
    ModalGalleryComponent,
    UpperButtonsComponent,
    DotsComponent,
    PreviewsComponent,
    CurrentImageComponent,
    LoadingSpinnerComponent,
    AccessibleComponent
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
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
/**
 * Function to setup the keyboard service inside the `forRoot` method.
 * @param {?} injector
 * @return {?} KeyboardService an instance of the `KeyboardService`
 */
function setupKeyboardService(injector) {
    return new KeyboardService(injector);
}
/**
 * @return {?}
 */
function setupGalleryService() {
    return new GalleryService();
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

export { setupKeyboardService, setupGalleryService, ModalGalleryModule, fg_DEFAULT_ACCESSIBILITY_CONFIG, AccessibleComponent, ModalGalleryComponent, COMPONENTS, BackgroundComponent, CurrentImageComponent, DotsComponent, PlainGalleryComponent, PreviewsComponent, UpperButtonsComponent, fg_DEFAULT_SIZE, fg_DEFAULT_BTN_CLOSE, fg_DEFAULT_BTN_DOWNLOAD, fg_DEFAULT_BTN_EXTURL, fg_DEFAULT_BTN_DELETE, fg_DEFAULT_BTN_FULL_SCREEN, ATagBgImageDirective, ClickOutsideDirective, DescriptionDirective, DirectionDirective, DIRECTIVES, KeyboardNavigationDirective, SizeDirective, WrapDirective, Action, ButtonsStrategy, ButtonType, WHITELIST_BUTTON_TYPES, DescriptionStrategy, Image, ImageModalEvent, InternalLibImage, Keyboard, LoadingType, LineLayout, GridLayout, AdvancedLayout, PlainGalleryStrategy, GalleryService, KEYBOARD_CONFIGURATION, KeyboardService, getIndex, SPACE_KEY, ENTER_KEY, MOUSE_MAIN_BUTTON_CLICK, NEXT, PREV, NOTHING, DIRECTION_RIGHT, DIRECTION_LEFT, LoadingSpinnerComponent as ɵa };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwtYW5ndWxhci1nYWxsZXJ5LmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9tb2RhbC1hbmd1bGFyLWdhbGxlcnkvbGliL2RpcmVjdGl2ZXMvY2xpY2stb3V0c2lkZS5kaXJlY3RpdmUudHMiLCJuZzovL21vZGFsLWFuZ3VsYXItZ2FsbGVyeS9saWIvZGlyZWN0aXZlcy9zaXplLmRpcmVjdGl2ZS50cyIsIm5nOi8vbW9kYWwtYW5ndWxhci1nYWxsZXJ5L2xpYi9kaXJlY3RpdmVzL2tleWJvYXJkLW5hdmlnYXRpb24uZGlyZWN0aXZlLnRzIiwibmc6Ly9tb2RhbC1hbmd1bGFyLWdhbGxlcnkvbGliL2RpcmVjdGl2ZXMvd3JhcC5kaXJlY3RpdmUudHMiLCJuZzovL21vZGFsLWFuZ3VsYXItZ2FsbGVyeS9saWIvZGlyZWN0aXZlcy9kaXJlY3Rpb24uZGlyZWN0aXZlLnRzIiwibmc6Ly9tb2RhbC1hbmd1bGFyLWdhbGxlcnkvbGliL21vZGVsL2ltYWdlLmNsYXNzLnRzIiwibmc6Ly9tb2RhbC1hbmd1bGFyLWdhbGxlcnkvbGliL2RpcmVjdGl2ZXMvYS10YWctYmctaW1hZ2UuZGlyZWN0aXZlLnRzIiwibmc6Ly9tb2RhbC1hbmd1bGFyLWdhbGxlcnkvbGliL2RpcmVjdGl2ZXMvZGVzY3JpcHRpb24uZGlyZWN0aXZlLnRzIiwibmc6Ly9tb2RhbC1hbmd1bGFyLWdhbGxlcnkvbGliL2RpcmVjdGl2ZXMvZGlyZWN0aXZlcy50cyIsIm5nOi8vbW9kYWwtYW5ndWxhci1nYWxsZXJ5L2xpYi9jb21wb25lbnRzL2JhY2tncm91bmQvYmFja2dyb3VuZC5jb21wb25lbnQudHMiLCJuZzovL21vZGFsLWFuZ3VsYXItZ2FsbGVyeS9saWIvbW9kZWwvYWN0aW9uLmVudW0udHMiLCJuZzovL21vZGFsLWFuZ3VsYXItZ2FsbGVyeS9saWIvc2VydmljZXMva2V5Ym9hcmQuc2VydmljZS50cyIsIm5nOi8vbW9kYWwtYW5ndWxhci1nYWxsZXJ5L2xpYi9zZXJ2aWNlcy9nYWxsZXJ5LnNlcnZpY2UudHMiLCJuZzovL21vZGFsLWFuZ3VsYXItZ2FsbGVyeS9saWIvdXRpbHMvdXNlci1pbnB1dC51dGlsLnRzIiwibmc6Ly9tb2RhbC1hbmd1bGFyLWdhbGxlcnkvbGliL2NvbXBvbmVudHMvYWNjZXNzaWJsZS5jb21wb25lbnQudHMiLCJuZzovL21vZGFsLWFuZ3VsYXItZ2FsbGVyeS9saWIvbW9kZWwvZGVzY3JpcHRpb24uaW50ZXJmYWNlLnRzIiwibmc6Ly9tb2RhbC1hbmd1bGFyLWdhbGxlcnkvbGliL21vZGVsL2ltYWdlLWludGVybmFsLmNsYXNzLnRzIiwibmc6Ly9tb2RhbC1hbmd1bGFyLWdhbGxlcnkvbGliL21vZGVsL2tleWJvYXJkLmVudW0udHMiLCJuZzovL21vZGFsLWFuZ3VsYXItZ2FsbGVyeS9saWIvbW9kZWwvbG9hZGluZy1jb25maWcuaW50ZXJmYWNlLnRzIiwibmc6Ly9tb2RhbC1hbmd1bGFyLWdhbGxlcnkvbGliL3V0aWxzL2ltYWdlLnV0aWwudHMiLCJuZzovL21vZGFsLWFuZ3VsYXItZ2FsbGVyeS9saWIvY29tcG9uZW50cy9jdXJyZW50LWltYWdlL2N1cnJlbnQtaW1hZ2UuY29tcG9uZW50LnRzIiwibmc6Ly9tb2RhbC1hbmd1bGFyLWdhbGxlcnkvbGliL21vZGVsL3BsYWluLWdhbGxlcnktY29uZmlnLmludGVyZmFjZS50cyIsIm5nOi8vbW9kYWwtYW5ndWxhci1nYWxsZXJ5L2xpYi9jb21wb25lbnRzL2FjY2Vzc2liaWxpdHktZGVmYXVsdC50cyIsIm5nOi8vbW9kYWwtYW5ndWxhci1nYWxsZXJ5L2xpYi9jb21wb25lbnRzL21vZGFsLWdhbGxlcnkvbW9kYWwtZ2FsbGVyeS5jb21wb25lbnQudHMiLCJuZzovL21vZGFsLWFuZ3VsYXItZ2FsbGVyeS9saWIvbW9kZWwvYnV0dG9ucy1jb25maWcuaW50ZXJmYWNlLnRzIiwibmc6Ly9tb2RhbC1hbmd1bGFyLWdhbGxlcnkvbGliL2NvbXBvbmVudHMvdXBwZXItYnV0dG9ucy91cHBlci1idXR0b25zLWRlZmF1bHQudHMiLCJuZzovL21vZGFsLWFuZ3VsYXItZ2FsbGVyeS9saWIvY29tcG9uZW50cy91cHBlci1idXR0b25zL3VwcGVyLWJ1dHRvbnMuY29tcG9uZW50LnRzIiwibmc6Ly9tb2RhbC1hbmd1bGFyLWdhbGxlcnkvbGliL2NvbXBvbmVudHMvZG90cy9kb3RzLmNvbXBvbmVudC50cyIsIm5nOi8vbW9kYWwtYW5ndWxhci1nYWxsZXJ5L2xpYi9jb21wb25lbnRzL3ByZXZpZXdzL3ByZXZpZXdzLmNvbXBvbmVudC50cyIsIm5nOi8vbW9kYWwtYW5ndWxhci1nYWxsZXJ5L2xpYi9jb21wb25lbnRzL2N1cnJlbnQtaW1hZ2UvbG9hZGluZy1zcGlubmVyL2xvYWRpbmctc3Bpbm5lci5jb21wb25lbnQudHMiLCJuZzovL21vZGFsLWFuZ3VsYXItZ2FsbGVyeS9saWIvY29tcG9uZW50cy9wbGFpbi1nYWxsZXJ5L3BsYWluLWdhbGxlcnkuY29tcG9uZW50LnRzIiwibmc6Ly9tb2RhbC1hbmd1bGFyLWdhbGxlcnkvbGliL2NvbXBvbmVudHMvY29tcG9uZW50cy50cyIsIm5nOi8vbW9kYWwtYW5ndWxhci1nYWxsZXJ5L2xpYi9tb2RhbC1nYWxsZXJ5Lm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuIFRoZSBNSVQgTGljZW5zZSAoTUlUKVxuXG4gQ29weXJpZ2h0IChjfgAyMDE3LTIwMTggU3RlZmFubyBDYXBwYSAoS3M4OSlcblxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbiBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuXG4gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsXG4gY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cblxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OIElORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEVcbiBTT0ZUV0FSRS5cbiAqL1xuXG5pbXBvcnQgeyBEaXJlY3RpdmUsIEV2ZW50RW1pdHRlciwgSG9zdExpc3RlbmVyLCBJbnB1dCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbi8qKlxuICogRGlyZWN0aXZlIHRvIGNsb3NlIHRoZSBtb2RhbCBnYWxsZXJ5IGNsaWNraW5nIG9uIHRoZSBzZW1pLXRyYW5zcGFyZW50IGJhY2tncm91bmQuXG4gKiBJbiBmYWN0LCBpdCBsaXN0ZW5zIGZvciBhIGNsaWNrIG9uIGFsbCBlbGVtZW50cyB0aGF0IGFyZW4ndCAnaW5zaWRlJyBhbmQgaXQgZW1pdHNcbiAqIGFuIGV2ZW50IHVzaW5nIGBAT3V0cHV0IGNsaWNrT3V0c2lkZWAuXG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1trc0NsaWNrT3V0c2lkZV0nXG59KVxuZXhwb3J0IGNsYXNzIENsaWNrT3V0c2lkZURpcmVjdGl2ZSB7XG4gIC8qKlxuICAgKiBCb29sZWFuIHRvIGVuYWJsZSB0aGlzIGRpcmVjdGl2ZS5cbiAgICovXG4gIEBJbnB1dCgpIGNsaWNrT3V0c2lkZUVuYWJsZTogYm9vbGVhbjtcbiAgLyoqXG4gICAqIE91dHB1dCB0byBlbWl0IGFuIGV2ZW50IGlmIHRoZSBjbGlja2VkIGVsZW1lbnQgY2xhc3MgZG9lc24ndCBjb250YWluICdpbnNpZGUnIG9yIGl0IGlzICdoaWRkZW4nLiBUaGUgcGF5bG9hZCBpcyBhIGJvb2xlYW4uXG4gICAqL1xuICBAT3V0cHV0KCkgY2xpY2tPdXRzaWRlOiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG5cbiAgLyoqXG4gICAqIE1ldGhvZCBjYWxsZWQgYnkgQW5ndWxhciBpdHNlbGYgZXZlcnkgY2xpY2sgdGhhbmtzIHRvIGBASG9zdExpc3RlbmVyYC5cbiAgICogQHBhcmFtIE1vdXNlRXZlbnQgZXZlbnQgcGF5bG9hZCByZWNlaXZlZCBldmV5IGNsaWNrXG4gICAqL1xuICBASG9zdExpc3RlbmVyKCdjbGljaycsIFsnJGV2ZW50J10pXG4gIG9uQ2xpY2soZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgIGNvbnN0IHRhcmdldEVsZW1lbnQ6IGFueSA9IGV2ZW50LnRhcmdldDtcblxuICAgIGlmICghdGhpcy5jbGlja091dHNpZGVFbmFibGUgfHwgIXRhcmdldEVsZW1lbnQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBsZXQgaXNJbnNpZGUgPSBmYWxzZTtcbiAgICBsZXQgaXNIaWRkZW4gPSBmYWxzZTtcblxuICAgIGlmICh0eXBlb2YgdGFyZ2V0RWxlbWVudC5jbGFzc05hbWUgIT09ICdzdHJpbmcnfgB7XG4gICAgICAvLyBpdCBoYXBwZW5zIHdpdGggQGZvcnRhd2Vzb21lL2ZvbnRhd2Vzb21lIDVcbiAgICAgIC8vIGZvciBzb21lIHJlYXNvbnMgY2xhc3NOYW1lIGlzIGFuIG9iamVjdCB3aXRoIDIgZW1wdHkgcHJvcGVydGllcyBpbnNpZGVcbiAgICAgIGlzSW5zaWRlID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gaW4gbm9ybWFsIHNjZW5hcmlvcywgdXNlIGNsYXNzbmFtZSwgYmVjYXVzZSBpdCdzIGEgc2ltcGxlIHN0cmluZ1xuICAgICAgaXNJbnNpZGUgPSB0YXJnZXRFbGVtZW50LmNsYXNzTmFtZSAmJiB0YXJnZXRFbGVtZW50LmNsYXNzTmFtZS5zdGFydHNXaXRoKCdpbnNpZGUnKTtcbiAgICAgIGlzSGlkZGVuID0gdGFyZ2V0RWxlbWVudC5jbGFzc05hbWUuaW5jbHVkZXMoJ2hpZGRlbicpO1xuICAgIH1cblxuICAgIC8vIGlmIGluc2lkZSA9PiBkb24ndCBjbG9zZSBtb2RhbCBnYWxsZXJ5XG4gICAgLy8gaWYgaGlkZGVuID0+IGNsb3NlIG1vZGFsIGdhbGxlcnlcbiAgICAvKlxuICAgICAgICBpIGknIGggfCBjbG9zZVxuICAgICAgICAwIDEgIDAgfCAgIDEgPT4gY2xvc2UgbW9kYWwgZ2FsbGVyeVxuICAgICAgICAwIDEgIDEgfCAgIDEgPT4gY2xvc2UgbW9kYWwgZ2FsbGVyeVxuICAgICAgICAxIDAgIDAgfCAgIDBcbiAgICAgICAgMSAwICAxIHwgICAxID0+IGNsb3NlIG1vZGFsIGdhbGxlcnlcbiAgICAgKi9cbiAgICBpZiAoIWlzSW5zaWRlIHx8IGlzSGlkZGVufgB7XG4gICAgICAvLyBjbG9zZSBtb2RhbCBnYWxsZXJ5XG4gICAgICB0aGlzLmNsaWNrT3V0c2lkZS5lbWl0KHRydWUpO1xuICAgIH1cbiAgfVxufVxuIiwiLypcbiBUaGUgTUlUIExpY2Vuc2UgKE1JVClcblxuIENvcHlyaWdodCAoYykgMjAxNy0yMDE4IFN0ZWZhbm8gQ2FwcGEgKEtzODkpXG5cbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwifgwgdG8gZGVhbFxuIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbiB0byB1c2UsIGNvcHfgIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcblxuIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIGFsbFxuIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG5cbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFfgXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTiBJTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiBMSUFCSUxJVFfgIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFXG4gU09GVFdBUkUuXG4gKi9cblxuaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBJbnB1dCwgT25DaGFuZ2VzLCBPbkluaXQsIFJlbmRlcmVyMiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU2l6ZSB9IGZyb20gJy4uL21vZGVsL3NpemUuaW50ZXJmYWNlJztcblxuLyoqXG4gKiBEaXJlY3RpdmUgdG8gY2hhbmdlIHRoZSBzaXplIG9mIGFuIGVsZW1lbnQuXG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1trc1NpemVdJ1xufSlcbmV4cG9ydCBjbGFzcyBTaXplRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMge1xuICAvKipcbiAgICogT2JqZWN0IG9mIHR5cGUgYFNpemVgIHRvIHJlc2l6ZSB0aGUgZWxlbWVudC5cbiAgICovXG4gIEBJbnB1dCgpIHNpemVDb25maWc6IFNpemU7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLCBwcml2YXRlIGVsOiBFbGVtZW50UmVmfgB7fVxuXG4gIC8qKlxuICAgKiBNZXRob2Qgw4LCtG5nT25Jbml0w4LCtCB0byBhcHBseSB0aGUgc3R5bGUgb2YgdGhpcyBkaXJlY3RpdmUuXG4gICAqIFRoaXMgaXMgYW4gQW5ndWxhcidzIGxpZmVjeWNsZSBob29rLCBzbyBpdHMgY2FsbGVkIGF1dG9tYXRpY2FsbHkgYnkgQW5ndWxhciBpdHNlbGYuXG4gICAqIEluIHBhcnRpY3VsYXIsIGl0J3MgY2FsbGVkIG9ubHkgb25lIHRpbWUhISFcbiAgICovXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuYXBwbHlTdHlsZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIE1ldGhvZCDDgsK0bmdPbkNoYW5nZXPDgsK0IHRvIGFwcGx5IHRoZSBzdHlsZSBvZiB0aGlzIGRpcmVjdGl2ZS5cbiAgICogVGhpcyBpcyBhbiBBbmd1bGFyJ3MgbGlmZWN5Y2xlIGhvb2ssIHNvIGl0cyBjYWxsZWQgYXV0b21hdGljYWxseSBieSBBbmd1bGFyIGl0c2VsZi5cbiAgICogSW4gcGFydGljdWxhciwgaXQncyBjYWxsZWQgd2hlbiBhbnkgZGF0YS1ib3VuZCBwcm9wZXJ0eSBvZiBhIGRpcmVjdGl2ZSBjaGFuZ2VzISEhXG4gICAqL1xuICBuZ09uQ2hhbmdlcygpIHtcbiAgICB0aGlzLmFwcGx5U3R5bGUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQcml2YXRlIG1ldGhvZCB0byBjaGFuZ2UgYm90aCB3aWR0aCBhbmQgaGVpZ2h0IG9mIGFuIGVsZW1lbnQuXG4gICAqL1xuICBwcml2YXRlIGFwcGx5U3R5bGUofgB7XG4gICAgaWYgKCF0aGlzLnNpemVDb25maWcpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy8gYXBwbHkgW3N0eWxlLndpZHRoXVxuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbC5uYXRpdmVFbGVtZW50LCAnd2lkdGgnLCB0aGlzLnNpemVDb25maWcud2lkdGgpO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbC5uYXRpdmVFbGVtZW50LCAnaGVpZ2h0JywgdGhpcy5zaXplQ29uZmlnLmhlaWdodCk7XG4gIH1cbn1cbiIsIi8qXG4gVGhlIE1JVCBMaWNlbnNlIChNSVQpXG5cbiBDb3B5cmlnaHQgKGMpIDIwMTctMjAxOCBTdGVmYW5vIENhcHBhIChLczg5KVxuXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIifgIHRvIGRlYWxcbiBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4gdG8gdXNlLCBjb3B5LCBtb2RpZnfgIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG5cbiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBhbGxcbiBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT04gSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRVxuIFNPRlRXQVJFLlxuICovXG5cbmltcG9ydCB7IERpcmVjdGl2ZSwgRXZlbnRFbWl0dGVyLCBIb3N0TGlzdGVuZXIsIElucHV0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2tzS2V5Ym9hcmROYXZpZ2F0aW9uXSdcbn0pXG5leHBvcnQgY2xhc3MgS2V5Ym9hcmROYXZpZ2F0aW9uRGlyZWN0aXZlIHtcbiAgQElucHV0KCkgaXNPcGVuOiBib29sZWFuO1xuXG4gIEBPdXRwdXQofgBrZXlQcmVzczogRXZlbnRFbWl0dGVyPG51bWJlcj4gPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4oKTtcblxuICAvKipcbiAgICogTGlzdGVuZXIgdG8gY2F0Y2gga2V5Ym9hcmQncyBldmVudHMgYW5kIGNhbGwgdGhlIHJpZ2h0IG1ldGhvZCBiYXNlZCBvbiB0aGUga2V5LlxuICAgKiBGb3IgaW5zdGFuY2UsIHByZXNzaW5nIGVzYywgdGhpcyB3aWxsIGNhbGwgYGNsb3NlR2FsbGVyeShBY3Rpb24uS0VZQk9BUkQpYCBhbmQgc28gb24uXG4gICAqIElmIHlvdSBwYXNzZWQgYSB2YWxpZCBga2V5Ym9hcmRDb25maWdgIGVzYywgcmlnaHQgYW5kIGxlZnQgYnV0dG9ucyB3aWxsIGJlIGN1c3RvbWl6ZWQgYmFzZWQgb24geW91ciBkYXRhLlxuICAgKiBAcGFyYW0gZSBLZXlib2FyZEV2ZW50IGNhdWdodCBieSB0aGUgbGlzdGVuZXIuXG4gICAqL1xuICBASG9zdExpc3RlbmVyKCd3aW5kb3c6a2V5ZG93bicsIFsnJGV2ZW50J10pXG4gIG9uS2V5RG93bihlOiBLZXlib2FyZEV2ZW50fgB7XG4gICAgaWYgKCF0aGlzLmlzT3Blbikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLmtleVByZXNzLmVtaXQoZS5rZXlDb2RlKTtcbiAgfVxufVxuIiwiLypcbiBUaGUgTUlUIExpY2Vuc2UgKE1JVClcblxuIENvcHlyaWdodCAoYykgMjAxNy0yMDE4IFN0ZWZhbm8gQ2FwcGEgKEtzODkpXG5cbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwifgwgdG8gZGVhbFxuIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbiB0byB1c2UsIGNvcHfgIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcblxuIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIGFsbFxuIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG5cbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFfgXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTiBJTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiBMSUFCSUxJVFfgIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFXG4gU09GVFdBUkUuXG4gKi9cblxuaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBJbnB1dCwgT25DaGFuZ2VzLCBPbkluaXQsIFJlbmRlcmVyMiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG4vKipcbiAqIERpcmVjdGl2ZSB0byBjaGFuZ2UgdGhlIGZsZXgtd3JhcCBjc3MgcHJvcGVydHkgb2YgYW4gZWxlbWVudC5cbiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2tzV3JhcF0nXG59KVxuZXhwb3J0IGNsYXNzIFdyYXBEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcyB7XG4gIC8qKlxuICAgKiBCb29sZWFuIGlucHV0IHRoYXQgaXQncyB0cnVlIHRvIGFkZCAnZmxleC13cmFwOiB3cmFwJywgJ2ZsZXgtd3JhcDogbm93cmFwJyBvdGhlcndpc2UuXG4gICAqL1xuICBASW5wdXQofgB3cmFwOiBib29sZWFuO1xuICAvKipcbiAgICogU3RyaW5nIGlucHV0IHRvIGZvcmNlIHRoZSB3aWR0aCBvZiB0aGUgZWxlbWVudCB0byBiZSBhYmxlIHRvIHNlZSB3cmFwcGluZy5cbiAgICovXG4gIEBJbnB1dCgpIHdpZHRoOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLCBwcml2YXRlIGVsOiBFbGVtZW50UmVmfgB7fVxuXG4gIC8qKlxuICAgKiBNZXRob2Qgw4LCtG5nT25Jbml0w4LCtCB0byBhcHBseSB0aGUgc3R5bGUgb2YgdGhpcyBkaXJlY3RpdmUuXG4gICAqIFRoaXMgaXMgYW4gQW5ndWxhcidzIGxpZmVjeWNsZSBob29rLCBzbyBpdHMgY2FsbGVkIGF1dG9tYXRpY2FsbHkgYnkgQW5ndWxhciBpdHNlbGYuXG4gICAqIEluIHBhcnRpY3VsYXIsIGl0J3MgY2FsbGVkIG9ubHkgb25lIHRpbWUhISFcbiAgICovXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuYXBwbHlTdHlsZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIE1ldGhvZCDDgsK0bmdPbkNoYW5nZXPDgsK0IHRvIGFwcGx5IHRoZSBzdHlsZSBvZiB0aGlzIGRpcmVjdGl2ZS5cbiAgICogVGhpcyBpcyBhbiBBbmd1bGFyJ3MgbGlmZWN5Y2xlIGhvb2ssIHNvIGl0cyBjYWxsZWQgYXV0b21hdGljYWxseSBieSBBbmd1bGFyIGl0c2VsZi5cbiAgICogSW4gcGFydGljdWxhciwgaXQncyBjYWxsZWQgd2hlbiBhbnkgZGF0YS1ib3VuZCBwcm9wZXJ0eSBvZiBhIGRpcmVjdGl2ZSBjaGFuZ2VzISEhXG4gICAqL1xuICBuZ09uQ2hhbmdlcygpIHtcbiAgICB0aGlzLmFwcGx5U3R5bGUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQcml2YXRlIG1ldGhvZCB0byBjaGFuZ2UgYm90aCB3aWRodCBhbmQgZmxleC13cmFwIGNzcyBwcm9wZXJ0aWVzLlxuICAgKi9cbiAgcHJpdmF0ZSBhcHBseVN0eWxlKCkge1xuICAgIC8vIFRPRE8gaXMgdGhpcyByaWdodD8/Pz8gSWYgd3JhcCBvcyBmYWxzZSBJIGNhbm5vdCBhcHBseSB3aWR0aCBhbmQgZmxleC13cmFwXG4gICAgaWYgKCF0aGlzLndyYXApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICd3aWR0aCcsIHRoaXMud2lkdGgpO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbC5uYXRpdmVFbGVtZW50LCAnZmxleC13cmFwJywgdGhpcy53cmFwID8gJ3dyYXAnIDogJ25vd3JhcCcpO1xuICB9XG59XG4iLCIvKlxuIFRoZSBNSVQgTGljZW5zZSAoTUlUKVxuXG4gQ29weXJpZ2h0IChjfgAyMDE3LTIwMTggU3RlZmFubyBDYXBwYSAoS3M4OSlcblxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbiBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuXG4gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsXG4gY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cblxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OIElORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEVcbiBTT0ZUV0FSRS5cbiAqL1xuXG5pbXBvcnQgeyBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIElucHV0LCBPbkNoYW5nZXMsIE9uSW5pdCwgUmVuZGVyZXIyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbi8qKlxuICogRGlyZWN0aXZlIHRvIGNoYW5nZSB0aGUgZmxleC1kaXJlY3Rpb24gb2YgYW4gZWxlbWVudCwgYmFzZWQgb24gdHdvIGlucHV0cyAoYGRpcmVjdGlvbmAgYW5kIGBqdXN0aWZ5YCkuXG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1trc0RpcmVjdGlvbl0nXG59KVxuZXhwb3J0IGNsYXNzIERpcmVjdGlvbkRpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzIHtcbiAgLyoqXG4gICAqIFN0cmluZyBpbnB1dCB0byBzZXQgdGhlIGNzcyBmbGV4LWRpcmVjdGlvbiBvZiBhbiBlbGVtZW50LlxuICAgKi9cbiAgQElucHV0KCkgZGlyZWN0aW9uOiBzdHJpbmc7XG4gIC8qKlxuICAgKiBTdHJpbmcgaW5wdXQgdG8gc2V0IHRoZSBjc3MganVzdGlmeS1jb250ZW50IG9mIGFuIGVsZW1lbnQuXG4gICAqL1xuICBASW5wdXQofgBqdXN0aWZ5OiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLCBwcml2YXRlIGVsOiBFbGVtZW50UmVmfgB7fVxuXG4gIC8qKlxuICAgKiBNZXRob2Qgw4LCtG5nT25Jbml0w4LCtCB0byBhcHBseSB0aGUgc3R5bGUgb2YgdGhpcyBkaXJlY3RpdmUuXG4gICAqIFRoaXMgaXMgYW4gQW5ndWxhcidzIGxpZmVjeWNsZSBob29rLCBzbyBpdHMgY2FsbGVkIGF1dG9tYXRpY2FsbHkgYnkgQW5ndWxhciBpdHNlbGYuXG4gICAqIEluIHBhcnRpY3VsYXIsIGl0J3MgY2FsbGVkIG9ubHkgb25lIHRpbWUhISFcbiAgICovXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuYXBwbHlTdHlsZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIE1ldGhvZCDDgsK0bmdPbkNoYW5nZXPDgsK0IHRvIGFwcGx5IHRoZSBzdHlsZSBvZiB0aGlzIGRpcmVjdGl2ZS5cbiAgICogVGhpcyBpcyBhbiBBbmd1bGFyJ3MgbGlmZWN5Y2xlIGhvb2ssIHNvIGl0cyBjYWxsZWQgYXV0b21hdGljYWxseSBieSBBbmd1bGFyIGl0c2VsZi5cbiAgICogSW4gcGFydGljdWxhciwgaXQncyBjYWxsZWQgd2hlbiBhbnkgZGF0YS1ib3VuZCBwcm9wZXJ0eSBvZiBhIGRpcmVjdGl2ZSBjaGFuZ2VzISEhXG4gICAqL1xuICBuZ09uQ2hhbmdlcygpIHtcbiAgICB0aGlzLmFwcGx5U3R5bGUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQcml2YXRlIG1ldGhvZCB0byBjaGFuZ2UgYm90aCBkaXJlY3Rpb24gYW5kIGp1c3RpZnkgb2YgYW4gZWxlbWVudC5cbiAgICovXG4gIHByaXZhdGUgYXBwbHlTdHlsZSgpIHtcbiAgICBpZiAoIXRoaXMuZGlyZWN0aW9uIHx8ICF0aGlzLmp1c3RpZnkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICdmbGV4LWRpcmVjdGlvbicsIHRoaXMuZGlyZWN0aW9uKTtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ2p1c3RpZnktY29udGVudCcsIHRoaXMuanVzdGlmeSk7XG4gIH1cbn1cbiIsIi8qXG4gVGhlIE1JVCBMaWNlbnNlIChNSVQpXG5cbiBDb3B5cmlnaHQgKGMpIDIwMTctMjAxOCBTdGVmYW5vIENhcHBhIChLczg5KVxuXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIifgIHRvIGRlYWxcbiBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4gdG8gdXNlLCBjb3B5LCBtb2RpZnfgIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG5cbiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBhbGxcbiBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT04gSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRVxuIFNPRlRXQVJFLlxuICovXG5cbmltcG9ydCB7IEFjdGlvbiB9IGZyb20gJy4vYWN0aW9uLmVudW0nO1xuaW1wb3J0IHsgU2l6ZSB9IGZyb20gJy4vc2l6ZS5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgU2FmZVJlc291cmNlVXJsIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5cbi8qKlxuICogQ2xhc3MgYEltYWdlYCB0aGF0IHJlcHJlc2VudHMgYW4gaW1hZ2Ugd2l0aCBib3RoIGBtb2RhbGAgYW5kIGBwbGFpbmAgY29uZmlndXJhdGlvbnMuXG4gKiBCb3RoIGltYWdlIGBpZGAgYW5kIGBtb2RhbGAgYXJlIG1hbmRhdG9yeSwgaW5zdGVhZCBgcGxhaW5gIGlzIG9wdGlvbmFsLlxuICovXG5leHBvcnQgY2xhc3MgSW1hZ2Uge1xuICBpZDogbnVtYmVyO1xuXG4gIG1vZGFsOiBNb2RhbEltYWdlO1xuICBwbGFpbj86IFBsYWluSW1hZ2U7XG5cbiAgY29uc3RydWN0b3IoaWQ6IG51bWJlciwgbW9kYWw6IE1vZGFsSW1hZ2UsIHBsYWluPzogUGxhaW5JbWFnZSkge1xuICAgIHRoaXMuaWQgPSBpZDtcbiAgICB0aGlzLm1vZGFsID0gbW9kYWw7XG4gICAgdGhpcy5wbGFpbiA9IHBsYWluO1xuICB9XG59XG5cbi8qKlxuICogSW50ZXJmYWNlIGBJbWFnZURhdGFgIHRvIGNvbmZpZ3VyZSBhbiBpbWFnZSwgYnV0IGl0IGlzbid0IHVzZWQgZGlyZWN0bHkuXG4gKiBQbGVhc2UsIHJlZmVycyB0byBgUGxhaW5JbWFnZWAgb3IgYE1vZGFsSW1hZ2VgLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIEltYWdlRGF0YSB7XG4gIGltZzogc3RyaW5nIHwgU2FmZVJlc291cmNlVXJsO1xuICBkZXNjcmlwdGlvbj86IHN0cmluZztcbiAgdGl0bGU/OiBzdHJpbmc7XG4gIGFsdD86IHN0cmluZztcbiAgYXJpYUxhYmVsPzogc3RyaW5nO1xufVxuXG4vKipcbiAqIEludGVyZmFjZSBgTW9kYWxJbWFnZWAgdG8gY29uZmlndXJlIHRoZSBtb2RhbCBpbWFnZS5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBNb2RhbEltYWdlIGV4dGVuZHMgSW1hZ2VEYXRhIHtcbiAgZXh0VXJsPzogc3RyaW5nO1xuICBkb3dubG9hZEZpbGVOYW1lPzogc3RyaW5nO1xufVxuXG4vKipcbiAqIEludGVyZmFjZSBgUGxhaW5JbWFnZWAgdG8gY29uZmlndXJlIHRoZSBwbGFpbiBpbWFnZS5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBQbGFpbkltYWdlIGV4dGVuZHMgSW1hZ2VEYXRhIHtcbiAgc2l6ZT86IFNpemU7XG59XG5cbi8qKlxuICogQ2xhc3MgYEltYWdlTW9kYWxFdmVudGAgdGhhdCByZXByZXNlbnRzIHRoZSBldmVudCBwYXlsb2FkIHdpdGggdGhlIHJlc3VsdCBhbmQgdGhlIHRyaWdnZXJlZCBhY3Rpb24uXG4gKi9cbmV4cG9ydCBjbGFzcyBJbWFnZU1vZGFsRXZlbnQge1xuICBhY3Rpb246IEFjdGlvbjtcbiAgcmVzdWx0OiBudW1iZXIgfCBib29sZWFuO1xuXG4gIGNvbnN0cnVjdG9yKGFjdGlvbjogQWN0aW9uLCByZXN1bHQ6IG51bWJlciB8IGJvb2xlYW4pIHtcbiAgICB0aGlzLmFjdGlvbiA9IGFjdGlvbjtcbiAgICB0aGlzLnJlc3VsdCA9IHJlc3VsdDtcbiAgfVxufVxuIiwiLypcbiBUaGUgTUlUIExpY2Vuc2UgKE1JVClcblxuIENvcHlyaWdodCAoYykgMjAxNy0yMDE4IFN0ZWZhbm8gQ2FwcGEgKEtzODkpXG5cbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwifgwgdG8gZGVhbFxuIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbiB0byB1c2UsIGNvcHfgIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcblxuIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIGFsbFxuIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG5cbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFfgXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTiBJTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiBMSUFCSUxJVFfgIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFXG4gU09GVFdBUkUuXG4gKi9cblxuaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBJbnB1dCwgT25DaGFuZ2VzLCBPbkluaXQsIFJlbmRlcmVyMiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBJbWFnZSB9IGZyb20gJy4uL21vZGVsL2ltYWdlLmNsYXNzJztcbmltcG9ydCB7IFNhZmVSZXNvdXJjZVVybCB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuXG4vKipcbiAqIERpcmVjdGl2ZSB0byBhZGQgYW4gaW1hZ2UgdG8gYW4gYDxhPmAgdGFnIHdpdGggc29tZSBhZGRpdGlvbmFsIGN1c3RvbSBwcm9wZXJ0aWVzLlxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdba3NBVGFnQmdJbWFnZV0nXG59KVxuZXhwb3J0IGNsYXNzIEFUYWdCZ0ltYWdlRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMge1xuICAvKipcbiAgICogT2JqZWN0IG9mIHR5cGUgYEltYWdlYCB0aGF0IHJlcHJlc2VudHMgdGhlIGltYWdlIHRvIGFkZCB0byB0aGUgYDxhPmAgdGFnLlxuICAgKi9cbiAgQElucHV0KCkgaW1hZ2U6IEltYWdlO1xuICAvKipcbiAgICogQWRkaXRpb25hbCBzdHlsZSB0byBjdXN0b21pemUgdGhlIGJhY2tncm91bmQgYXR0cmlidXRlLlxuICAgKiBFbXB0eSBzdHJpbmcgYnkgZGVmYXVsdC5cbiAgICovXG4gIEBJbnB1dCgpIHN0eWxlOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLCBwcml2YXRlIGVsOiBFbGVtZW50UmVmfgB7fVxuXG4gIC8qKlxuICAgKiBNZXRob2Qgw4LCtG5nT25Jbml0w4LCtCB0byBhcHBseSB0aGUgc3R5bGUgb2YgdGhpcyBkaXJlY3RpdmUuXG4gICAqIFRoaXMgaXMgYW4gQW5ndWxhcidzIGxpZmVjeWNsZSBob29rLCBzbyBpdHMgY2FsbGVkIGF1dG9tYXRpY2FsbHkgYnkgQW5ndWxhciBpdHNlbGYuXG4gICAqIEluIHBhcnRpY3VsYXIsIGl0J3MgY2FsbGVkIG9ubHkgb25lIHRpbWUhISFcbiAgICovXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuYXBwbHlTdHlsZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIE1ldGhvZCDDgsK0bmdPbkNoYW5nZXPDgsK0IHRvIGFwcGx5IHRoZSBzdHlsZSBvZiB0aGlzIGRpcmVjdGl2ZS5cbiAgICogVGhpcyBpcyBhbiBBbmd1bGFyJ3MgbGlmZWN5Y2xlIGhvb2ssIHNvIGl0cyBjYWxsZWQgYXV0b21hdGljYWxseSBieSBBbmd1bGFyIGl0c2VsZi5cbiAgICogSW4gcGFydGljdWxhciwgaXQncyBjYWxsZWQgd2hlbiBhbnkgZGF0YS1ib3VuZCBwcm9wZXJ0eSBvZiBhIGRpcmVjdGl2ZSBjaGFuZ2VzISEhXG4gICAqL1xuICBuZ09uQ2hhbmdlcygpIHtcbiAgICB0aGlzLmFwcGx5U3R5bGUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQcml2YXRlIG1ldGhvZCB0byBhZGQgYW4gaW1hZ2UgYXMgYmFja2dyb3VuZCBvZiBhbiBgPGE+YCB0YWcuXG4gICAqL1xuICBwcml2YXRlIGFwcGx5U3R5bGUofgB7XG4gICAgaWYgKCF0aGlzLmltYWdlIHx8ICghdGhpcy5pbWFnZS5wbGFpbiAmJiAhdGhpcy5pbWFnZS5tb2RhbCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBpbWdQYXRoOiBzdHJpbmcgfCBTYWZlUmVzb3VyY2VVcmwgPSB0aGlzLmltYWdlLnBsYWluICYmIHRoaXMuaW1hZ2UucGxhaW4uaW1nID8gdGhpcy5pbWFnZS5wbGFpbi5pbWcgOiB0aGlzLmltYWdlLm1vZGFsLmltZztcbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ2JhY2tncm91bmQnLCBgdXJsKFwiJHtpbWdQYXRofVwifgAke3RoaXMuc3R5bGV9YCk7XG4gIH1cbn1cbiIsIi8qXG4gVGhlIE1JVCBMaWNlbnNlIChNSVQpXG5cbiBDb3B5cmlnaHQgKGMpIDIwMTctMjAxOCBTdGVmYW5vIENhcHBhIChLczg5KVxuXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIifgIHRvIGRlYWxcbiBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4gdG8gdXNlLCBjb3B5LCBtb2RpZnfgIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG5cbiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBhbGxcbiBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT04gSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRVxuIFNPRlRXQVJFLlxuICovXG5cbmltcG9ydCB7IERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSW5wdXQsIE9uQ2hhbmdlcywgT25Jbml0LCBSZW5kZXJlcjIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERlc2NyaXB0aW9uIH0gZnJvbSAnLi4vbW9kZWwvZGVzY3JpcHRpb24uaW50ZXJmYWNlJztcblxuLyoqXG4gKiBEaXJlY3RpdmUgdG8gY3VzdG9taXplIHRoZSBkZXNjcmlwdGlvbi5cbiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2tzRGVzY3JpcHRpb25dJ1xufSlcbmV4cG9ydCBjbGFzcyBEZXNjcmlwdGlvbkRpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzIHtcbiAgLyoqXG4gICAqIE9iamVjdCBvZiB0eXBlIGBEZXNjcmlwdGlvbmAgdG8gcmVzaXplIHRoZSBlbGVtZW50LlxuICAgKi9cbiAgQElucHV0KCkgZGVzY3JpcHRpb246IERlc2NyaXB0aW9uO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMiwgcHJpdmF0ZSBlbDogRWxlbWVudFJlZikge31cblxuICAvKipcbiAgICogTWV0aG9kIMOCwrRuZ09uSW5pdMOCwrQgdG8gYXBwbHkgdGhlIHN0eWxlIG9mIHRoaXMgZGlyZWN0aXZlLlxuICAgKiBUaGlzIGlzIGFuIEFuZ3VsYXIncyBsaWZlY3ljbGUgaG9vaywgc28gaXRzIGNhbGxlZCBhdXRvbWF0aWNhbGx5IGJ5IEFuZ3VsYXIgaXRzZWxmLlxuICAgKiBJbiBwYXJ0aWN1bGFyLCBpdCdzIGNhbGxlZCBvbmx5IG9uZSB0aW1lISEhXG4gICAqL1xuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmFwcGx5U3R5bGUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBNZXRob2Qgw4LCtG5nT25DaGFuZ2Vzw4LCtCB0byBhcHBseSB0aGUgc3R5bGUgb2YgdGhpcyBkaXJlY3RpdmUuXG4gICAqIFRoaXMgaXMgYW4gQW5ndWxhcidzIGxpZmVjeWNsZSBob29rLCBzbyBpdHMgY2FsbGVkIGF1dG9tYXRpY2FsbHkgYnkgQW5ndWxhciBpdHNlbGYuXG4gICAqIEluIHBhcnRpY3VsYXIsIGl0J3MgY2FsbGVkIHdoZW4gYW55IGRhdGEtYm91bmQgcHJvcGVydHkgb2YgYSBkaXJlY3RpdmUgY2hhbmdlcyEhIVxuICAgKi9cbiAgbmdPbkNoYW5nZXMofgB7XG4gICAgdGhpcy5hcHBseVN0eWxlKCk7XG4gIH1cblxuICAvKipcbiAgICogUHJpdmF0ZSBtZXRob2QgdG8gY2hhbmdlIGRlc2NyaXB0aW9uJ3Mgc3R5bGUuXG4gICAqL1xuICBwcml2YXRlIGFwcGx5U3R5bGUofgB7XG4gICAgaWYgKCF0aGlzLmRlc2NyaXB0aW9ufgB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuZGVzY3JpcHRpb24uc3R5bGUpIHtcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbC5uYXRpdmVFbGVtZW50LCAnYmFja2dyb3VuZCcsIHRoaXMuZGVzY3JpcHRpb24uc3R5bGUuYmdDb2xvcik7XG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ2NvbG9yJywgdGhpcy5kZXNjcmlwdGlvbi5zdHlsZS50ZXh0Q29sb3IpO1xuXG4gICAgICBpZiAodGhpcy5kZXNjcmlwdGlvbi5zdHlsZS53aWR0aCkge1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ3dpZHRoJywgdGhpcy5kZXNjcmlwdGlvbi5zdHlsZS53aWR0aCk7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5kZXNjcmlwdGlvbi5zdHlsZS5oZWlnaHQpIHtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICdoZWlnaHQnLCB0aGlzLmRlc2NyaXB0aW9uLnN0eWxlLmhlaWdodCk7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5kZXNjcmlwdGlvbi5zdHlsZS5wb3NpdGlvbikge1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ3Bvc2l0aW9uJywgdGhpcy5kZXNjcmlwdGlvbi5zdHlsZS5wb3NpdGlvbik7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5kZXNjcmlwdGlvbi5zdHlsZS50b3ApIHtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICd0b3AnLCB0aGlzLmRlc2NyaXB0aW9uLnN0eWxlLnRvcCk7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5kZXNjcmlwdGlvbi5zdHlsZS5ib3R0b20pIHtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICdib3R0b20nLCB0aGlzLmRlc2NyaXB0aW9uLnN0eWxlLmJvdHRvbSk7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5kZXNjcmlwdGlvbi5zdHlsZS5sZWZ0fgB7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbC5uYXRpdmVFbGVtZW50LCAnbGVmdCcsIHRoaXMuZGVzY3JpcHRpb24uc3R5bGUubGVmdCk7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5kZXNjcmlwdGlvbi5zdHlsZS5yaWdodCkge1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ3JpZ2h0JywgdGhpcy5kZXNjcmlwdGlvbi5zdHlsZS5yaWdodCk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbC5uYXRpdmVFbGVtZW50LCAnbWFyZ2luLXRvcCcsIHRoaXMuZGVzY3JpcHRpb24uc3R5bGUubWFyZ2luVG9wID8gdGhpcy5kZXNjcmlwdGlvbi5zdHlsZS5tYXJnaW5Ub3AgOiAnMHB4Jyk7XG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ21hcmdpbi1ib3R0b20nLCB0aGlzLmRlc2NyaXB0aW9uLnN0eWxlLm1hcmdpbkJvdHRvbSA/IHRoaXMuZGVzY3JpcHRpb24uc3R5bGUubWFyZ2luQm90dG9tIDogJzBweCcpO1xuICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICdtYXJnaW4tbGVmdCcsIHRoaXMuZGVzY3JpcHRpb24uc3R5bGUubWFyZ2luTGVmdCA/IHRoaXMuZGVzY3JpcHRpb24uc3R5bGUubWFyZ2luTGVmdCA6ICcwcHgnKTtcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbC5uYXRpdmVFbGVtZW50LCAnbWFyZ2luLXJpZ2h0JywgdGhpcy5kZXNjcmlwdGlvbi5zdHlsZS5tYXJnaW5SaWdodCA/IHRoaXMuZGVzY3JpcHRpb24uc3R5bGUubWFyZ2luUmlnaHQgOiAnMHB4Jyk7XG4gICAgfVxuICB9XG59XG4iLCIvKlxuIFRoZSBNSVQgTGljZW5zZSAoTUlUKVxuXG4gQ29weXJpZ2h0IChjfgAyMDE3LTIwMTggU3RlZmFubyBDYXBwYSAoS3M4OSlcblxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbiBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuXG4gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsXG4gY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cblxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OIElORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEVcbiBTT0ZUV0FSRS5cbiAqL1xuXG5pbXBvcnQgeyBDbGlja091dHNpZGVEaXJlY3RpdmUgfSBmcm9tICcuL2NsaWNrLW91dHNpZGUuZGlyZWN0aXZlJztcbmltcG9ydCB7IFNpemVEaXJlY3RpdmUgfSBmcm9tICcuL3NpemUuZGlyZWN0aXZlJztcbmltcG9ydCB7IEtleWJvYXJkTmF2aWdhdGlvbkRpcmVjdGl2ZSB9IGZyb20gJy4va2V5Ym9hcmQtbmF2aWdhdGlvbi5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgV3JhcERpcmVjdGl2ZSB9IGZyb20gJy4vd3JhcC5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgRGlyZWN0aW9uRGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3Rpb24uZGlyZWN0aXZlJztcbmltcG9ydCB7IEFUYWdCZ0ltYWdlRGlyZWN0aXZlIH0gZnJvbSAnLi9hLXRhZy1iZy1pbWFnZS5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgRGVzY3JpcHRpb25EaXJlY3RpdmUgfSBmcm9tICcuL2Rlc2NyaXB0aW9uLmRpcmVjdGl2ZSc7XG5cbi8qKlxuICogQXJyYXkgb2YgYWxsIGRpcmVjdGl2ZXMuXG4gKi9cbmV4cG9ydCBjb25zdCBESVJFQ1RJVkVTID0gW1xuICBDbGlja091dHNpZGVEaXJlY3RpdmUsXG4gIFNpemVEaXJlY3RpdmUsXG4gIEtleWJvYXJkTmF2aWdhdGlvbkRpcmVjdGl2ZSxcbiAgV3JhcERpcmVjdGl2ZSxcbiAgRGlyZWN0aW9uRGlyZWN0aXZlLFxuICBBVGFnQmdJbWFnZURpcmVjdGl2ZSxcbiAgRGVzY3JpcHRpb25EaXJlY3RpdmVcbl07XG4iLCIvKlxuIFRoZSBNSVQgTGljZW5zZSAoTUlUKVxuXG4gQ29weXJpZ2h0IChjfgAyMDE3LTIwMTggU3RlZmFubyBDYXBwYSAoS3M4OSlcblxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbiBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuXG4gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsXG4gY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cblxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OIElORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEVcbiBTT0ZUV0FSRS5cbiAqL1xuXG5pbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBBY2Nlc3NpYmlsaXR5Q29uZmlnIH0gZnJvbSAnLi4vLi4vbW9kZWwvYWNjZXNzaWJpbGl0eS5pbnRlcmZhY2UnO1xuXG4vKipcbiAqIENvbXBvbmVudCB3aXRoIHRoZSBzZW1pLXRyYW5zcGFyZW50IGJhY2tncm91bmQuXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2tzLWJhY2tncm91bmQnLFxuICBzdHlsZVVybHM6IFsnYmFja2dyb3VuZC5zY3NzJ10sXG4gIHRlbXBsYXRlVXJsOiAnYmFja2dyb3VuZC5odG1sJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgQmFja2dyb3VuZENvbXBvbmVudCB7XG4gIC8qKlxuICAgKiBCb29sZWFuIHRoYXQgaXQgaXMgdHJ1ZSBpZiB0aGUgbW9kYWwgZ2FsbGVyeSBpcyB2aXNpYmxlLFxuICAgKiBzbyBhbHNvIHRoaXMgY29tcG9uZW50IHNob3VsZCBiZSB2aXNpYmxlLlxuICAgKi9cbiAgQElucHV0KCkgaXNPcGVuOiBib29sZWFuO1xuICAvKipcbiAgICogT2JqZWN0IG9mIHR5cGUgYEFjY2Vzc2liaWxpdHlDb25maWdgIHRvIGluaXQgY3VzdG9tIGFjY2Vzc2liaWxpdHkgZmVhdHVyZXMuXG4gICAqIEZvciBpbnN0YW5jZSwgaXQgY29udGFpbnMgdGl0bGVzLCBhbHQgdGV4dHMsIGFyaWEtbGFiZWxzIGFuZCBzbyBvbi5cbiAgICovXG4gIEBJbnB1dCgpIGFjY2Vzc2liaWxpdHlDb25maWc6IEFjY2Vzc2liaWxpdHlDb25maWc7XG59XG4iLCIvKlxuIFRoZSBNSVQgTGljZW5zZSAoTUlUKVxuXG4gQ29weXJpZ2h0IChjfgAyMDE3LTIwMTggU3RlZmFubyBDYXBwYSAoS3M4OSlcblxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbiBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuXG4gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsXG4gY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cblxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OIElORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEVcbiBTT0ZUV0FSRS5cbiAqL1xuXG4vKipcbiAqIEVudW0gYEFjdGlvbmAgd2l0aCBhIGxpc3Qgb2YgcG9zc2libGUgYWN0aW9ucywgYmFzZWQgb24gdGhlIHNvdXJjZSBvZiB0aGUgYWN0aW9uLlxuICovXG5leHBvcnQgZW51bSBBY3Rpb24ge1xuICBOT1JNQUwsIC8vIGRlZmF1bHQgdmFsdWVcbiAgQ0xJQ0ssIC8vIG1vdXNlIGNsaWNrXG4gIEtFWUJPQVJELFxuICBTV0lQRSxcbiAgTE9BRFxufVxuIiwiLypcbiBUaGUgTUlUIExpY2Vuc2UgKE1JVClcblxuIENvcHlyaWdodCAoYykgMjAxNy0yMDE4IFN0ZWZhbm8gQ2FwcGEgKEtzODkpXG5cbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwifgwgdG8gZGVhbFxuIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbiB0byB1c2UsIGNvcHfgIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcblxuIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIGFsbFxuIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG5cbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFfgXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTiBJTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiBMSUFCSUxJVFfgIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFXG4gU09GVFdBUkUuXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlLCBJbmplY3Rpb25Ub2tlbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBLZXlib2FyZFNlcnZpY2VDb25maWcgfSBmcm9tICcuLi9tb2RlbC9rZXlib2FyZC1zZXJ2aWNlLWNvbmZpZy5pbnRlcmZhY2UnO1xuXG5leHBvcnQgY29uc3QgS0VZQk9BUkRfQ09ORklHVVJBVElPTiA9IG5ldyBJbmplY3Rpb25Ub2tlbjxLZXlib2FyZFNlcnZpY2VDb25maWc+KCdLRVlCT0FSRF9DT05GSUdVUkFUSU9OJyk7XG5cbi8qKlxuICogU2VydmljZSB0byBpbnRlcmNlcHQgY3RybCtzIChvciBjbWQrcyBvbiBtYWNPUykgdXNpbmcgYSB0aGlyZC1wYXJ0eSBsaWJyYXJ5LCBjYWxsZWQgTW91c2V0cmFwLlxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgS2V5Ym9hcmRTZXJ2aWNlIHtcbiAgLyoqXG4gICAqIFByaXZhdGUgTW91c2V0cmFwIHZhcmlhYmxlIHRvIHN0b3JlIHRoZSBpbnN0YW5jZS5cbiAgICovXG4gIHByaXZhdGUgbW91c2V0cmFwOiBNb3VzZXRyYXBJbnN0YW5jZTtcbiAgLyoqXG4gICAqIFByaXZhdGUgdmFyaWFibGUgdG8gc3RvcmUgc2hvcnRjdXRzIGFzIGVpdGhlciBBcnJheSBvciBzdHJpbmcuXG4gICAqL1xuICBwcml2YXRlIHNob3J0Y3V0czogQXJyYXk8c3RyaW5nPiB8IHN0cmluZztcblxuICAvKipcbiAgICogQ29uc3RydWN0b3Igb2YgYEtleWJvYXJkU2VydmljZWAgdG8gaW5pdCBgbW91c2V0cmFwYCBhbmQgYHNob3J0Y3V0c2AgcHJpdmF0ZSB2YXJpYWJsZXMuXG4gICAqIEBwYXJhbSBLZXlib2FyZFNlcnZpY2VDb25maWcgY29uZmlnIG9iamVjdCByZWNlaXZlZCBieSB0aGUgYGZvclJvb3QoKWAgZnVuY3Rpb24gdG8gaW5pdCBjdXN0b20gc2hvcnRjdXRzXG4gICAqL1xuICBjb25zdHJ1Y3RvcihASW5qZWN0KEtFWUJPQVJEX0NPTkZJR1VSQVRJT04pIHByaXZhdGUgY29uZmlnOiBLZXlib2FyZFNlcnZpY2VDb25maWcpIHtcbiAgICAvLyB0aGlzLmNvbmZpZyBpcyBhbHdheXMgZGVmaW5lZCwgYmVjYXVzZSBmb3JjZWQgYnkgZm9yUm9vdCBpbnNpZGUgdGhlIG1vZHVsZVxuICAgIC8vIHdoZW4gZW1wdHfgIGl0J3Mgc2ltcGx5IGFuIGVtcHR5IG9iamVjdDoge31cblxuICAgIHRoaXMuc2hvcnRjdXRzID0gdGhpcy5jb25maWcgJiYgdGhpcy5jb25maWcuc2hvcnRjdXRzID8gdGhpcy5jb25maWcuc2hvcnRjdXRzIDogWydjdHJsK3MnLCAnbWV0YStzJ107XG5cbiAgICAvLyB0ZW1wb3Jhcnkgd29ya2Fyb3VuZCB0byBmaXggdGhpcyBpc3N1ZTogaHR0cHM6Ly9naXRodWIuY29tL0tzODkvYW5ndWxhci1tb2RhbC1nYWxsZXJ5L2lzc3Vlcy8xNDJcbiAgICBpZiAodGhpcy5jb25maWcgJiYgIXRoaXMuY29uZmlnLmRpc2FibGVTc3JXb3JrYXJvdW5kfgB7XG4gICAgICAvLyBUbyBwcmV2ZW50IGlzc3VlcyB3aXRoIGFuZ3VsYXItdW5pdmVyc2FsIG9uIHNlcnZlci1zaWRlXG4gICAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgdGhpcy5tb3VzZXRyYXAgPSBuZXcgKDxhbnk+TW91c2V0cmFwfggpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBNZXRob2QgdG8gYWRkIGEgbGlzdGVyIGZvciBjdHJsK3MvY21kK3Mga2V5Ym9hcmQgZXZlbnRzLlxuICAgKiBAcGFyYW0gKGU6IEV4dGVuZGVfg2V5Ym9hcmRFdmVudCwgY29tYm86IHN0cmluZykgPT4gYW55IG9uQmluZCBjYWxsYmFjayBmdW5jdGlvbiB0byBhZGQgc2hvcnRjdXRzXG4gICAqL1xuICBhZGQob25CaW5kOiAoZTogRXh0ZW5kZWRLZXlib2FyZEV2ZW50LCBjb21ibzogc3RyaW5nfgA9PiBhbnkpIHtcbiAgICAvLyB0ZW1wb3Jhcnkgd29ya2Fyb3VuZCB0byBmaXggdGhpcyBpc3N1ZTogaHR0cHM6Ly9naXRodWIuY29tL0tzODkvYW5ndWxhci1tb2RhbC1nYWxsZXJ5L2lzc3Vlcy8xNDJcbiAgICBpZiAodGhpcy5jb25maWcgJiYgIXRoaXMuY29uZmlnLmRpc2FibGVTc3JXb3JrYXJvdW5kfgB7XG4gICAgICAvLyBUbyBwcmV2ZW50IGlzc3VlcyB3aXRoIGFuZ3VsYXItdW5pdmVyc2FsIG9uIHNlcnZlci1zaWRlXG4gICAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgdGhpcy5tb3VzZXRyYXAuYmluZCh0aGlzLnNob3J0Y3V0cywgKGV2ZW50OiBLZXlib2FyZEV2ZW50LCBjb21ibzogc3RyaW5nfgA9PiB7XG4gICAgICAgICAgaWYgKGV2ZW50LnByZXZlbnREZWZhdWx0fgB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBpbnRlcm5ldCBleHBsb3JlclxuICAgICAgICAgICAgZXZlbnQucmV0dXJuVmFsdWUgPSBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgb25CaW5kKGV2ZW50LCBjb21ibyk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBNZXRob2QgdG8gcmVzZXQgYWxsIGxpc3RlbmVycy4gUGxlYXNlLCBjYWxsIHRoaXMgZnVuY3Rpb24gd2hlbiBuZWVkZWRcbiAgICogdG8gZnJlZSByZXNvdXJjZXMgYWQgcHJldmVudCBsZWFrcy5cbiAgICovXG4gIHJlc2V0KCkge1xuICAgIC8vIHRlbXBvcmFyeSB3b3JrYXJvdW5kIHRvIGZpeCB0aGlzIGlzc3VlOiBodHRwczovL2dpdGh1Yi5jb20vS3M4OS9hbmd1bGFyLW1vZGFsLWdhbGxlcnkvaXNzdWVzLzE0MlxuICAgIGlmICh0aGlzLmNvbmZpZyAmJiAhdGhpcy5jb25maWcuZGlzYWJsZVNzcldvcmthcm91bmQpIHtcbiAgICAgIC8vIFRvIHByZXZlbnQgaXNzdWVzIHdpdGggYW5ndWxhci11bml2ZXJzYWwgb24gc2VydmVyLXNpZGVcbiAgICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICB0aGlzLm1vdXNldHJhcC5yZXNldCgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIiwiLypcbiBUaGUgTUlUIExpY2Vuc2UgKE1JVClcblxuIENvcHlyaWdodCAoYykgMjAxNy0yMDE4IFN0ZWZhbm8gQ2FwcGEgKEtzODkpXG5cbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwifgwgdG8gZGVhbFxuIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbiB0byB1c2UsIGNvcHfgIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcblxuIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIGFsbFxuIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG5cbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFfgXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTiBJTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiBMSUFCSUxJVFfgIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFXG4gU09GVFdBUkUuXG4gKi9cblxuaW1wb3J0IHsgRXZlbnRFbWl0dGVyLCBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBJbWFnZSB9IGZyb20gJy4uL21vZGVsL2ltYWdlLmNsYXNzJztcblxuZXhwb3J0IGludGVyZmFjZSBJbnRlcm5hbEdhbGxlcnlQYXlsb2FkIHtcbiAgZ2FsbGVyeUlkOiBudW1iZXI7XG4gIGluZGV4OiBudW1iZXI7XG4gIGltYWdlPzogSW1hZ2U7XG59XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBHYWxsZXJ5U2VydmljZSB7XG4gIG5hdmlnYXRlOiBFdmVudEVtaXR0ZXI8SW50ZXJuYWxHYWxsZXJ5UGF5bG9hZD4gPSBuZXcgRXZlbnRFbWl0dGVyPEludGVybmFsR2FsbGVyeVBheWxvYWQ+KCk7XG4gIGNsb3NlOiBFdmVudEVtaXR0ZXI8bnVtYmVyPiA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyPigpO1xuICB1cGRhdGU6IEV2ZW50RW1pdHRlcjxJbnRlcm5hbEdhbGxlcnlQYXlsb2FkPiA9IG5ldyBFdmVudEVtaXR0ZXI8SW50ZXJuYWxHYWxsZXJ5UGF5bG9hZD4oKTtcblxuICBvcGVuR2FsbGVyeShnYWxsZXJ5SWQ6IG51bWJlciB8IHVuZGVmaW5lZCwgaW5kZXg6IG51bWJlcik6IHZvaWQge1xuICAgIGlmIChnYWxsZXJ5SWQgPT09IHVuZGVmaW5lZCB8fCBnYWxsZXJ5SWQgPCAwIHx8IGluZGV4IDwgMCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdDYW5ub3Qgb3BlbiBnYWxsZXJ5IHZpYSBHYWxsZXJ5U2VydmljZSB3aXRoIGVpdGhlciBpbmRleDwwIG9yIGdhbGxlcnlJZDwwIG9yIGdhbGxlcnlJZD09PXVuZGVmaW5lZCcpO1xuICAgIH1cbiAgICB0aGlzLm5hdmlnYXRlLmVtaXQoe1xuICAgICAgZ2FsbGVyeUlkOiBnYWxsZXJ5SWQsXG4gICAgICBpbmRleDogaW5kZXhcbiAgICB9KTtcbiAgfVxuXG4gIGNsb3NlR2FsbGVyeShnYWxsZXJ5SWQ6IG51bWJlciB8IHVuZGVmaW5lZCk6IHZvaWQge1xuICAgIGlmIChnYWxsZXJ5SWQgPT09IHVuZGVmaW5lZCB8fCBnYWxsZXJ5SWQgPCAwfgB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Nhbm5vdCBjbG9zZSBnYWxsZXJ5IHZpYSBHYWxsZXJ5U2VydmljZSB3aXRoIGdhbGxlcnlJZDwwIG9yIGdhbGxlcnlJZD09PXVuZGVmaW5lZCcpO1xuICAgIH1cbiAgICB0aGlzLmNsb3NlLmVtaXQoZ2FsbGVyeUlkKTtcbiAgfVxuXG4gIHVwZGF0ZUdhbGxlcnkoZ2FsbGVyeUlkOiBudW1iZXIgfCB1bmRlZmluZWQsIGluZGV4OiBudW1iZXIsIGltYWdlOiBJbWFnZSk6IHZvaWQge1xuICAgIGlmIChnYWxsZXJ5SWQgPT09IHVuZGVmaW5lZCB8fCBnYWxsZXJ5SWQgPCAwIHx8IGluZGV4IDwgMCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdDYW5ub3QgdXBkYXRlIGdhbGxlcnkgdmlhIEdhbGxlcnlTZXJ2aWNlIHdpdGggZWl0aGVyIGluZGV4PDAgb3IgZ2FsbGVyeUlkPDAgb3IgZ2FsbGVyeUlkPT09dW5kZWZpbmVkJyk7XG4gICAgfVxuICAgIGlmICghaW1hZ2UpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignQ2Fubm90IHVwZGF0ZSBnYWxsZXJ5IHZpYSBHYWxsZXJ5U2VydmljZSwgYmVjYXVzZSBpbWFnZSBpcyBub3QgdmFsaWQnKTtcbiAgICB9XG4gICAgdGhpcy51cGRhdGUuZW1pdCh7XG4gICAgICBnYWxsZXJ5SWQ6IGdhbGxlcnlJZCxcbiAgICAgIGluZGV4OiBpbmRleCxcbiAgICAgIGltYWdlOiBpbWFnZVxuICAgIH0pO1xuICB9XG59XG4iLCIvKlxuIFRoZSBNSVQgTGljZW5zZSAoTUlUKVxuXG4gQ29weXJpZ2h0IChjfgAyMDE3LTIwMTggU3RlZmFubyBDYXBwYSAoS3M4OSlcblxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbiBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuXG4gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsXG4gY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cblxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OIElORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEVcbiBTT0ZUV0FSRS5cbiAqL1xuXG4vKipcbiAqIEtleWNvZGUgb2YgdGhlIGtleWJvYXJkJ3Mga2V5IGBzcGFjZWBcbiAqL1xuZXhwb3J0IGNvbnN0IFNQQUNFX0tFWSA9IDMyO1xuLyoqXG4gKiBLZXljb2RlIG9mIHRoZSBrZXlib2FyZCdzIGtleSBgZW50ZXJgXG4gKi9cbmV4cG9ydCBjb25zdCBFTlRFUl9LRVkgPSAxMztcbi8qKlxuICogS2V5Y29kZSBvZiB0aGUgbWFpbiBtb3VzZSBidXR0b25cbiAqL1xuZXhwb3J0IGNvbnN0IE1PVVNFX01BSU5fQlVUVE9OX0NMSUNLID0gMDtcblxuLyoqXG4gKiBDb25zdCBORVhUXG4gKi9cbmV4cG9ydCBjb25zdCBORVhUID0gMTtcbi8qKlxuICogQ29uc3QgUFJFVlxuICovXG5leHBvcnQgY29uc3QgUFJFViA9IC0xO1xuLyoqXG4gKiBDb25zdCBOT1RISU5HIHRvIHJlcHJlc2VudHMgYSBzaXR1YXRpb24gd2hlbiBpdCBpc24ndCBib3RoIE5FWFQgYW5kIFBSRVZcbiAqL1xuZXhwb3J0IGNvbnN0IE5PVEhJTkcgPSAwO1xuXG4vKipcbiAqIENvbnN0IHRvIHJlcHJlc2VudCB0aGUgcmlnaHQgZGlyZWN0aW9uXG4gKi9cbmV4cG9ydCBjb25zdCBESVJFQ1RJT05fUklHSFQgPSAncmlnaHQnO1xuLyoqXG4gKiBDb25zdCB0byByZXByZXNlbnQgdGhlIGxlZnQgZGlyZWN0aW9uXG4gKi9cbmV4cG9ydCBjb25zdCBESVJFQ1RJT05fTEVGVCA9ICdsZWZ0JztcbiIsIi8qXG4gVGhlIE1JVCBMaWNlbnNlIChNSVQpXG5cbiBDb3B5cmlnaHQgKGMpIDIwMTctMjAxOCBTdGVmYW5vIENhcHBhIChLczg5KVxuXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIifgIHRvIGRlYWxcbiBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4gdG8gdXNlLCBjb3B5LCBtb2RpZnfgIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG5cbiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBhbGxcbiBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT04gSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRVxuIFNPRlRXQVJFLlxuICovXG5cbmltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgRElSRUNUSU9OX1JJR0hULCBFTlRFUl9LRVfgIE1PVVNFX01BSU5fQlVUVE9OX0NMSUNLLCBORVhULCBOT1RISU5HLCBQUkVWLCBTUEFDRV9LRVkgfSBmcm9tICcuLi91dGlscy91c2VyLWlucHV0LnV0aWwnO1xuXG4vKipcbiAqIFByb3ZpZGVzIHNvbWUgdXNlZnVsIG1ldGhvZHMgdG8gYWRkIGFjY2Vzc2liaWxpdHkgZmVhdHVyZXMgdG8gc3ViY2xhc3Nlcy5cbiAqIEluIHBhcnRpY3VsYXIsIGl0IGV4cG9zZXMgYSBtZXRob2QgdG8gaGFuZGxlIG5hdmlnYXRpb24gZXZlbnQgd2l0aCBib3RoIEtleWJvYXJkIGFuZCBNb3VzZVxuICogYW5kIGFub3RoZXIgd2l0aCBhbHNvIHRoZSBkaXJlY3Rpb24gKHJpZ2h0IG9yIGxlZnQpLlxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdrcy1hY2Nlc3NpYmxlJyxcbiAgdGVtcGxhdGU6IGBgLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBBY2Nlc3NpYmxlQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IofgB7fVxuXG4gIC8qKlxuICAgKiBNZXRob2QgdG8gaGFuZGxlIG5hdmlnYXRpb24gZXZlbnRzIHdpdGggYm90aCBLZXlib2FyZCBhbmQgTW91c2UuXG4gICAqIEBwYXJhbSBzdHJpbmcgZGlyZWN0aW9uIG9mIHRoZSBuYXZpZ2F0aW9uIHRoYXQgY2FuIGJlIGVpdGhlciAnbmV4dCcgb3IgJ3ByZXYnXG4gICAqIEBwYXJhbSBLZXlib2FyZEV2ZW50IHwgTW91c2VFdmVudCBldmVudCBwYXlsb2FkXG4gICAqIEByZXR1cm5zIG51bWJlciAtMSBmb3IgUFJFViwgMSBmb3IgTkVYVCBhbmQgMCBmb3IgTk9USElOR1xuICAgKi9cbiAgaGFuZGxlTmF2aWdhdGlvbkV2ZW50KGRpcmVjdGlvbjogc3RyaW5nLCBldmVudDogS2V5Ym9hcmRFdmVudCB8IE1vdXNlRXZlbnQpOiBudW1iZXIge1xuICAgIGlmICghZXZlbnQpIHtcbiAgICAgIHJldHVybiBOT1RISU5HO1xuICAgIH1cbiAgICBpZiAoZXZlbnQgaW5zdGFuY2VvZiBLZXlib2FyZEV2ZW50fgB7XG4gICAgICByZXR1cm4gdGhpcy5oYW5kbGVLZXlib2FyZE5hdmlnYXRpb25FdmVudChkaXJlY3Rpb24sIGV2ZW50KTtcbiAgICB9IGVsc2UgaWYgKGV2ZW50IGluc3RhbmNlb2YgTW91c2VFdmVudCkge1xuICAgICAgcmV0dXJuIHRoaXMuaGFuZGxlTW91c2VOYXZpZ2F0aW9uRXZlbnQoZGlyZWN0aW9uLCBldmVudCk7XG4gICAgfVxuICAgIHJldHVybiBOT1RISU5HO1xuICB9XG5cbiAgLyoqXG4gICAqIE1ldGhvZCB0byBoYW5kbGUgZXZlbnRzIG92ZXIgYW4gaW1hZ2UsIGZvciBpbnN0YW5jZSBhIGtleXByZXNzIHdpdGggdGhlIEtleWJvYXJkIG9yIGEgTW91c2UgY2xpY2suXG4gICAqIEBwYXJhbSBLZXlib2FyZEV2ZW50IHwgTW91c2VFdmVudCBldmVudCBwYXlsb2FkXG4gICAqIEByZXR1cm5zIG51bWJlciAxIGZvciBORVhUIGFuZCAwIGZvciBOT1RISU5HXG4gICAqL1xuICBoYW5kbGVJbWFnZUV2ZW50KGV2ZW50OiBLZXlib2FyZEV2ZW50IHwgTW91c2VFdmVudCk6IG51bWJlciB7XG4gICAgaWYgKCFldmVudCkge1xuICAgICAgcmV0dXJuIE5PVEhJTkc7XG4gICAgfVxuICAgIGlmIChldmVudCBpbnN0YW5jZW9mIEtleWJvYXJkRXZlbnQpIHtcbiAgICAgIHJldHVybiB0aGlzLmhhbmRsZUltYWdlS2V5Ym9hcmRFdmVudChldmVudCk7XG4gICAgfSBlbHNlIGlmIChldmVudCBpbnN0YW5jZW9mIE1vdXNlRXZlbnQpIHtcbiAgICAgIHJldHVybiB0aGlzLmhhbmRsZUltYWdlTW91c2VFdmVudChldmVudCk7XG4gICAgfVxuICAgIHJldHVybiBOT1RISU5HO1xuICB9XG5cbiAgLyoqXG4gICAqIFByaXZhdGUgbWV0aG9kIHRvIGhhbmRsZSBrZXlib2FyZCBldmVudHMgb3ZlciBhbiBpbWFnZS5cbiAgICogQHBhcmFtIEtleWJvYXJkRXZlbnQgZXZlbnQgcGF5bG9hZFxuICAgKiBAcmV0dXJucyBudW1iZXIgMSBmb3IgTkVYVCBhbmQgMCBmb3IgTk9USElOR1xuICAgKi9cbiAgcHJpdmF0ZSBoYW5kbGVJbWFnZUtleWJvYXJkRXZlbnQoZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiBudW1iZXIge1xuICAgIGNvbnN0IGtleTogbnVtYmVyID0gZXZlbnQua2V5Q29kZTtcbiAgICBpZiAoa2V5ID09PSBTUEFDRV9LRVkgfHwga2V5ID09PSBFTlRFUl9LRVkpIHtcbiAgICAgIHJldHVybiBORVhUO1xuICAgIH1cbiAgICByZXR1cm4gTk9USElORztcbiAgfVxuXG4gIC8qKlxuICAgKiBQcml2YXRlIG1ldGhvZCB0byBoYW5kbGUgbW91c2UgZXZlbnRzIG92ZXIgYW4gaW1hZ2UuXG4gICAqIEBwYXJhbSBNb3VzZUV2ZW50IGV2ZW50IHBheWxvYWRcbiAgICogQHJldHVybnMgbnVtYmVyIDEgZm9yIE5FWFQgYW5kIDAgZm9yIE5PVEhJTkdcbiAgICovXG4gIHByaXZhdGUgaGFuZGxlSW1hZ2VNb3VzZUV2ZW50KGV2ZW50OiBNb3VzZUV2ZW50KTogbnVtYmVyIHtcbiAgICBjb25zdCBtb3VzZUJ0bjogbnVtYmVyID0gZXZlbnQuYnV0dG9uO1xuICAgIGlmIChtb3VzZUJ0biA9PT0gTU9VU0VfTUFJTl9CVVRUT05fQ0xJQ0spIHtcbiAgICAgIHJldHVybiBORVhUO1xuICAgIH1cbiAgICByZXR1cm4gTk9USElORztcbiAgfVxuXG4gIC8qKlxuICAgKiBNZXRob2QgdG8gaGFuZGxlIGV2ZW50cyBvdmVyIGFuIGltYWdlLCBmb3IgaW5zdGFuY2UgYSBrZXlwcmVzcyB3aXRoIHRoZSBLZXlib2FyZCBvciBhIE1vdXNlIGNsaWNrLlxuICAgKiBAcGFyYW0gc3RyaW5nIGRpcmVjdGlvbiBvZiB0aGUgbmF2aWdhdGlvbiB0aGF0IGNhbiBiZSBlaXRoZXIgJ25leHQnIG9yICdwcmV2J1xuICAgKiBAcGFyYW0gS2V5Ym9hcmRFdmVudCBldmVudCBwYXlsb2FkXG4gICAqIEByZXR1cm5zIG51bWJlciAtMSBmb3IgUFJFViwgMSBmb3IgTkVYVCBhbmQgMCBmb3IgTk9USElOR1xuICAgKi9cbiAgcHJpdmF0ZSBoYW5kbGVLZXlib2FyZE5hdmlnYXRpb25FdmVudChkaXJlY3Rpb246IHN0cmluZywgZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiBudW1iZXIge1xuICAgIGNvbnN0IGtleTogbnVtYmVyID0gZXZlbnQua2V5Q29kZTtcbiAgICBpZiAoa2V5ID09PSBTUEFDRV9LRVkgfHwga2V5ID09PSBFTlRFUl9LRVkpIHtcbiAgICAgIHJldHVybiBkaXJlY3Rpb24gPT09IERJUkVDVElPTl9SSUdIVCA/IE5FWFQgOiBQUkVWO1xuICAgIH1cbiAgICByZXR1cm4gTk9USElORztcbiAgfVxuXG4gIC8qKlxuICAgKiBNZXRob2QgdG8gaGFuZGxlIGV2ZW50cyBvdmVyIGFuIGltYWdlLCBmb3IgaW5zdGFuY2UgYSBrZXlwcmVzcyB3aXRoIHRoZSBLZXlib2FyZCBvciBhIE1vdXNlIGNsaWNrLlxuICAgKiBAcGFyYW0gc3RyaW5nIGRpcmVjdGlvbiBvZiB0aGUgbmF2aWdhdGlvbiB0aGF0IGNhbiBiZSBlaXRoZXIgJ25leHQnIG9yICdwcmV2J1xuICAgKiBAcGFyYW0gTW91c2VFdmVudCBldmVudCBwYXlsb2FkXG4gICAqIEByZXR1cm5zIG51bWJlciAtMSBmb3IgUFJFViwgMSBmb3IgTkVYVCBhbmQgMCBmb3IgTk9USElOR1xuICAgKi9cbiAgcHJpdmF0ZSBoYW5kbGVNb3VzZU5hdmlnYXRpb25FdmVudChkaXJlY3Rpb246IHN0cmluZywgZXZlbnQ6IE1vdXNlRXZlbnQpOiBudW1iZXIge1xuICAgIGNvbnN0IG1vdXNlQnRuOiBudW1iZXIgPSBldmVudC5idXR0b247XG4gICAgaWYgKG1vdXNlQnRuID09PSBNT1VTRV9NQUlOX0JVVFRPTl9DTElDSykge1xuICAgICAgcmV0dXJuIGRpcmVjdGlvbiA9PT0gRElSRUNUSU9OX1JJR0hUID8gTkVYVCA6IFBSRVY7XG4gICAgfVxuICAgIHJldHVybiBOT1RISU5HO1xuICB9XG59XG4iLCIvKlxuIFRoZSBNSVQgTGljZW5zZSAoTUlUKVxuXG4gQ29weXJpZ2h0IChjfgAyMDE3LTIwMTggU3RlZmFubyBDYXBwYSAoS3M4OSlcblxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbiBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuXG4gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsXG4gY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cblxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OIElORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEVcbiBTT0ZUV0FSRS5cbiAqL1xuXG4vKipcbiAqIEludGVyZmFjZSBgRGVzY3JpcHRpb25gIHRvIGNoYW5nZSB0aGUgZGVzY3JpcHRpb24sIGVpdGhlciB3aXRoIGEgZnVsbCBjdXN0b21cbiAqIGRlc2NyaXB0aW9uIG9yIHdpdGggYSBzbWFsbCBhbmQgc2ltcGxlIGN1c3RvbWl6YXRpb24uXG4gKiBBbHNvLCB5b3UgY291bGQgY2hhbmdlIG1hcmdpbnMsIGJhY2tncm91bmQgc3R5bGUgYW5kIHNvIG9uLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIERlc2NyaXB0aW9uIHtcbiAgc3RyYXRlZ3k6IERlc2NyaXB0aW9uU3RyYXRlZ3k7XG4gIGN1c3RvbUZ1bGxEZXNjcmlwdGlvbj86IHN0cmluZztcbiAgaW1hZ2VUZXh0Pzogc3RyaW5nO1xuICBudW1iZXJTZXBhcmF0b3I/OiBzdHJpbmc7XG4gIGJlZm9yZVRleHREZXNjcmlwdGlvbj86IHN0cmluZztcblxuICBzdHlsZT86IERlc2NyaXB0aW9uU3R5bGU7XG59XG5cbi8qKlxuICogRW51bSBgRGVzY3JpcHRpb25TdHJhdGVneWAgd2l0aCBrZXlzIGFuZCB0aGVpciByZWxhdGl2ZSBrZXkgY29kZXMuXG4gKi9cbmV4cG9ydCBlbnVtIERlc2NyaXB0aW9uU3RyYXRlZ3kge1xuICBBTFdBWVNfSElEREVOID0gMSxcbiAgQUxXQVlTX1ZJU0lCTEUsXG4gIEhJREVfSUZfRU1QVFlcbn1cblxuLyoqXG4gKiBJbnRlcmZhY2UgdG8gY2hhbmdlIGNzcyBwcm9wZXJ0aWVzLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIERlc2NyaXB0aW9uU3R5bGUge1xuICBiZ0NvbG9yPzogc3RyaW5nO1xuICB0ZXh0Q29sb3I/OiBzdHJpbmc7XG4gIHdpZHRoPzogc3RyaW5nO1xuICBoZWlnaHQ/OiBzdHJpbmc7XG4gIHBvc2l0aW9uPzogc3RyaW5nO1xuICB0b3A/OiBzdHJpbmc7XG4gIGJvdHRvbT86IHN0cmluZztcbiAgbGVmdD86IHN0cmluZztcbiAgcmlnaHQ/OiBzdHJpbmc7XG4gIG1hcmdpblRvcD86IHN0cmluZztcbiAgbWFyZ2luQm90dG9tPzogc3RyaW5nO1xuICBtYXJnaW5SaWdodD86IHN0cmluZztcbiAgbWFyZ2luTGVmdD86IHN0cmluZztcbn1cbiIsIi8qXG4gVGhlIE1JVCBMaWNlbnNlIChNSVQpXG5cbiBDb3B5cmlnaHQgKGMpIDIwMTctMjAxOCBTdGVmYW5vIENhcHBhIChLczg5KVxuXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIifgIHRvIGRlYWxcbiBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4gdG8gdXNlLCBjb3B5LCBtb2RpZnfgIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG5cbiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBhbGxcbiBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT04gSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRVxuIFNPRlRXQVJFLlxuICovXG5cbmltcG9ydCB7IEltYWdlLCBNb2RhbEltYWdlLCBQbGFpbkltYWdlIH0gZnJvbSAnLi9pbWFnZS5jbGFzcyc7XG5cbi8qKlxuICogSW50ZXJuYWwgcmVwcmVzZW50YXRpb24gb2YgYW4gaW1hZ2UgYWRkaW5nIG90aGVyIGZpZWxkc1xuICogdG8gdGhlIHB1YmxpYyBgSW1hZ2VgIGNsYXNzLlxuICovXG5leHBvcnQgY2xhc3MgSW50ZXJuYWxMaWJJbWFnZSBleHRlbmRzIEltYWdlIHtcbiAgcHJldmlvdXNseUxvYWRlZDogYm9vbGVhbjtcblxuICBjb25zdHJ1Y3RvcihpZDogbnVtYmVyLCBtb2RhbDogTW9kYWxJbWFnZSwgcGxhaW4/OiBQbGFpbkltYWdlLCBwcmV2aW91c2x5TG9hZGVkOiBib29sZWFuID0gZmFsc2UpIHtcbiAgICBzdXBlcihpZCwgbW9kYWwsIHBsYWluKTtcblxuICAgIHRoaXMucHJldmlvdXNseUxvYWRlZCA9IHByZXZpb3VzbHlMb2FkZWQ7XG4gIH1cbn1cbiIsIi8qXG4gVGhlIE1JVCBMaWNlbnNlIChNSVQpXG5cbiBDb3B5cmlnaHQgKGMpIDIwMTctMjAxOCBTdGVmYW5vIENhcHBhIChLczg5KVxuXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIifgIHRvIGRlYWxcbiBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4gdG8gdXNlLCBjb3B5LCBtb2RpZnfgIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG5cbiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBhbGxcbiBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT04gSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRVxuIFNPRlRXQVJFLlxuICovXG5cbi8qKlxuICogRW51bSBgS2V5Ym9hcmRgIHdpdGgga2V5cyBhbmQgdGhlaXIgcmVsYXRpdmUga2V5IGNvZGVzLlxuICovXG5leHBvcnQgZW51bSBLZXlib2FyZCB7XG4gIEVTQyA9IDI3LFxuICBMRUZUX0FSUk9XID0gMzcsXG4gIFJJR0hUX0FSUk9XID0gMzfgXG4gIFVQX0FSUk9XID0gMzgsXG4gIERPV05fQVJST1cgPSA0MFxufVxuIiwiLypcbiBUaGUgTUlUIExpY2Vuc2UgKE1JVClcblxuIENvcHlyaWdodCAoYykgMjAxNy0yMDE4IFN0ZWZhbm8gQ2FwcGEgKEtzODkpXG5cbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwifgwgdG8gZGVhbFxuIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbiB0byB1c2UsIGNvcHfgIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcblxuIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIGFsbFxuIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG5cbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFfgXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTiBJTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiBMSUFCSUxJVFfgIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFXG4gU09GVFdBUkUuXG4gKi9cblxuLyoqXG4gKiBJbnRlcmZhY2UgYExvYWRpbmdDb25maWdgIHRvIGNvbmZpZ3VyZSBsb2FkaW5nIGljb24uXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgTG9hZGluZ0NvbmZpZyB7XG4gIGVuYWJsZTogYm9vbGVhbjtcbiAgdHlwZTogTG9hZGluZ1R5cGU7XG59XG5cbi8qKlxuICogRW51bSBgTG9hZGluZ1R5cGVgIHdpdGggYSBsaXN0IG9mIHBvc3NpYmxlIHR5cGVzLlxuICovXG5leHBvcnQgZW51bSBMb2FkaW5nVHlwZSB7XG4gIFNUQU5EQVJEID0gMSxcbiAgQ0lSQ1VMQVIsXG4gIEJBUlMsXG4gIERPVFMsXG4gIENVQkVfRkxJUFBJTkcsXG4gIENJUkNMRVMsXG4gIEVYUExPU0lOR19TUVVBUkVTXG59XG4iLCIvKlxuIFRoZSBNSVQgTGljZW5zZSAoTUlUKVxuXG4gQ29weXJpZ2h0IChjfgAyMDE3LTIwMTggU3RlZmFubyBDYXBwYSAoS3M4OSlcblxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbiBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuXG4gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsXG4gY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cblxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OIElORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEVcbiBTT0ZUV0FSRS5cbiAqL1xuXG5pbXBvcnQgeyBJbWFnZSB9IGZyb20gJy4uL21vZGVsL2ltYWdlLmNsYXNzJztcblxuLyoqXG4gKiBVdGlsaXR5IGZ1bmN0aW9uIHRvIGdldCB0aGUgaW5kZXggb2YgdGhlIGlucHV0IGBpbWFnZWAgZnJvbSBgYXJyYXlPZkltYWdlc2BcbiAqIEBwYXJhbSBJbWFnZSBpbWFnZSB0byBnZXQgdGhlIGluZGV4LiBUaGUgaW1hZ2UgJ2lkJyBtdXN0IGJlIGEgbnVtYmVyID49IDBcbiAqIEBwYXJhbSBJbWFnZVtdIGFycmF5T2ZJbWFnZXMgdG8gc2VhcmNoIHRoZSBpbWFnZSB3aXRoaW4gaXRcbiAqIEByZXR1cm5zIG51bWJlciB0aGUgaW5kZXggb2YgdGhlIGltYWdlLiAtMSBpZiBub3QgZm91bmQuXG4gKiBAdGhyb3dzIGFuIEVycm9yIGlmIGVpdGhlciBpbWFnZSBvciBhcnJheU9mSW1hZ2VzIGFyZSBub3QgdmFsaWQsXG4gKiAgb3IgaWYgdGhlIGlucHV0IGltYWdlIGRvZXNuJ3QgY29udGFpbiBhbiAnaWQnLCBvciB0aGUgJ2lkJyBpcyA8IDBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldEluZGV4KGltYWdlOiBJbWFnZSwgYXJyYXlPZkltYWdlczogSW1hZ2VbXSk6IG51bWJlciB7XG4gIGlmICghaW1hZ2UpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2ltYWdlIG11c3QgYmUgYSB2YWxpZCBJbWFnZSBvYmplY3QnKTtcbiAgfVxuXG4gIGlmICghYXJyYXlPZkltYWdlcykge1xuICAgIHRocm93IG5ldyBFcnJvcignYXJyYXlPZkltYWdlcyBtdXN0IGJlIGEgdmFsaWQgSW1hZ2VbXScpO1xuICB9XG5cbiAgaWYgKCFpbWFnZS5pZCAmJiBpbWFnZS5pZCAhPT0gMCkge1xuICAgIC8vIGlkID0gMCBpcyBhZG1pdHRlZFxuICAgIHRocm93IG5ldyBFcnJvcihgQSBudW1lcmljIEltYWdlICdpZCcgaXMgbWFuZGF0b3J5YCk7XG4gIH1cblxuICBpZiAoaW1hZ2UuaWQgPCAwfgB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBJbWFnZSAnaWQnIG11c3QgYmUgPj0gMGApO1xuICB9XG5cbiAgcmV0dXJuIGFycmF5T2ZJbWFnZXMuZmluZEluZGV4KCh2YWw6IEltYWdlfgA9PiB2YWwuaWQgPT09IGltYWdlLmlkKTtcbn1cbiIsIi8qXG4gVGhlIE1JVCBMaWNlbnNlIChNSVQpXG5cbiBDb3B5cmlnaHQgKGMpIDIwMTctMjAxOCBTdGVmYW5vIENhcHBhIChLczg5KVxuXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIifgIHRvIGRlYWxcbiBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4gdG8gdXNlLCBjb3B5LCBtb2RpZnfgIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG5cbiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBhbGxcbiBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT04gSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRVxuIFNPRlRXQVJFLlxuICovXG5cbmltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uQ2hhbmdlcywgT25Jbml0LCBPdXRwdXQsIFNpbXBsZUNoYW5nZSwgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBBY2Nlc3NpYmxlQ29tcG9uZW50IH0gZnJvbSAnLi4vYWNjZXNzaWJsZS5jb21wb25lbnQnO1xuXG5pbXBvcnQgeyBBY2Nlc3NpYmlsaXR5Q29uZmlnIH0gZnJvbSAnLi4vLi4vbW9kZWwvYWNjZXNzaWJpbGl0eS5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgQWN0aW9uIH0gZnJvbSAnLi4vLi4vbW9kZWwvYWN0aW9uLmVudW0nO1xuaW1wb3J0IHsgRGVzY3JpcHRpb24sIERlc2NyaXB0aW9uU3RyYXRlZ3fgIERlc2NyaXB0aW9uU3R5bGUgfSBmcm9tICcuLi8uLi9tb2RlbC9kZXNjcmlwdGlvbi5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgSW1hZ2UsIEltYWdlTW9kYWxFdmVudCB9IGZyb20gJy4uLy4uL21vZGVsL2ltYWdlLmNsYXNzJztcbmltcG9ydCB7IEludGVybmFsTGliSW1hZ2UgfSBmcm9tICcuLi8uLi9tb2RlbC9pbWFnZS1pbnRlcm5hbC5jbGFzcyc7XG5pbXBvcnQgeyBLZXlib2FyZCB9IGZyb20gJy4uLy4uL21vZGVsL2tleWJvYXJkLmVudW0nO1xuaW1wb3J0IHsgS2V5Ym9hcmRDb25maWcgfSBmcm9tICcuLi8uLi9tb2RlbC9rZXlib2FyZC1jb25maWcuaW50ZXJmYWNlJztcbmltcG9ydCB7IExvYWRpbmdDb25maWcsIExvYWRpbmdUeXBlIH0gZnJvbSAnLi4vLi4vbW9kZWwvbG9hZGluZy1jb25maWcuaW50ZXJmYWNlJztcbmltcG9ydCB7IFNsaWRlQ29uZmlnIH0gZnJvbSAnLi4vLi4vbW9kZWwvc2xpZGUtY29uZmlnLmludGVyZmFjZSc7XG5cbmltcG9ydCB7IE5FWFQsIFBSRVYgfSBmcm9tICcuLi8uLi91dGlscy91c2VyLWlucHV0LnV0aWwnO1xuaW1wb3J0IHsgZ2V0SW5kZXggfSBmcm9tICcuLi8uLi91dGlscy9pbWFnZS51dGlsJztcbmltcG9ydCB7IEN1cnJlbnRJbWFnZUNvbmZpZyB9IGZyb20gJy4uLy4uL21vZGVsL2N1cnJlbnQtaW1hZ2UtY29uZmlnLmludGVyZmFjZSc7XG5cbi8qKlxuICogSW50ZXJmYWNlIHRvIGRlc2NyaWJlIHRoZSBMb2FkIEV2ZW50LCB1c2VkIHRvXG4gKiBlbWl0IGFuIGV2ZW50IHdoZW4gdGhlIGltYWdlIGlzIGZpbmFsbHkgbG9hZGVkIGFuZCB0aGUgc3Bpbm5lciBoYXMgZ29uZS5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBJbWFnZUxvYWRFdmVudCB7XG4gIHN0YXR1czogYm9vbGVhbjtcbiAgaW5kZXg6IG51bWJlcjtcbiAgaWQ6IG51bWJlcjtcbn1cblxuLyoqXG4gKiBDb21wb25lbnQgd2l0aCB0aGUgY3VycmVudCBpbWFnZSB3aXRoIHNvbWUgYWRkaXRpb25hbCBlbGVtZW50cyBsaWtlIGFycm93cyBhbmQgc2lkZSBwcmV2aWV3cy5cbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAna3MtY3VycmVudC1pbWFnZScsXG4gIHN0eWxlVXJsczogWydjdXJyZW50LWltYWdlLnNjc3MnLCAnY3VycmVudC1pbWFnZS1hcnJvd3Muc2NzcycsICdjdXJyZW50LWltYWdlLXByZXZpZXdzLnNjc3MnXSxcbiAgdGVtcGxhdGVVcmw6ICdjdXJyZW50LWltYWdlLmh0bWwnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBDdXJyZW50SW1hZ2VDb21wb25lbnQgZXh0ZW5kcyBBY2Nlc3NpYmxlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMge1xuICAvKipcbiAgICogT2JqZWN0IG9mIHR5cGUgYEludGVybmFsTGliSW1hZ2VgIHRoYXQgcmVwcmVzZW50IHRoZSB2aXNpYmxlIGltYWdlLlxuICAgKi9cbiAgQElucHV0KClcbiAgY3VycmVudEltYWdlOiBJbnRlcm5hbExpYkltYWdlO1xuICAvKipcbiAgICogQXJyYXkgb2YgYEludGVybmFsTGliSW1hZ2VgIHRoYXQgcmVwcmVzZW50IHRoZSBtb2RlbCBvZiB0aGlzIGxpYnJhcnkgd2l0aCBhbGwgaW1hZ2VzLFxuICAgKiB0aHVtYnMgYW5kIHNvIG9uLlxuICAgKi9cbiAgQElucHV0KClcbiAgaW1hZ2VzOiBJbnRlcm5hbExpYkltYWdlW107XG4gIC8qKlxuICAgKiBCb29sZWFuIHRoYXQgaXQgaXMgdHJ1ZSBpZiB0aGUgbW9kYWwgZ2FsbGVyeSBpcyB2aXNpYmxlLlxuICAgKiBJZiB5ZXMsIGFsc28gdGhpcyBjb21wb25lbnQgc2hvdWxkIGJlIHZpc2libGUuXG4gICAqL1xuICBASW5wdXQoKVxuICBpc09wZW46IGJvb2xlYW47XG4gIC8qKlxuICAgKiBJbnRlcmZhY2UgdG8gY29uZmlndXJlIGN1cnJlbnQgaW1hZ2UgaW4gbW9kYWwtZ2FsbGVyeS5cbiAgICogRm9yIGluc3RhbmNlIHlvdSBjYW4gZGlzYWJsZSBuYXZpZ2F0aW9uIG9uIGNsaWNrIG9uIGN1cnJlbnQgaW1hZ2UgKGVuYWJsZWQgYnkgZGVmYXVsdCkuXG4gICAqL1xuICBASW5wdXQoKVxuICBjdXJyZW50SW1hZ2VDb25maWc6IEN1cnJlbnRJbWFnZUNvbmZpZztcbiAgLyoqXG4gICAqIE9iamVjdCBvZiB0eXBlIGBTbGlkZUNvbmZpZ2AgdG8gZ2V0IGBpbmZpbml0ZSBzbGlkaW5nYC5cbiAgICovXG4gIEBJbnB1dCgpXG4gIHNsaWRlQ29uZmlnOiBTbGlkZUNvbmZpZztcbiAgLyoqXG4gICAqIE9iamVjdCBvZiB0eXBlIGBBY2Nlc3NpYmlsaXR5Q29uZmlnYCB0byBpbml0IGN1c3RvbSBhY2Nlc3NpYmlsaXR5IGZlYXR1cmVzLlxuICAgKiBGb3IgaW5zdGFuY2UsIGl0IGNvbnRhaW5zIHRpdGxlcywgYWx0IHRleHRzLCBhcmlhLWxhYmVscyBhbmQgc28gb24uXG4gICAqL1xuICBASW5wdXQoKVxuICBhY2Nlc3NpYmlsaXR5Q29uZmlnOiBBY2Nlc3NpYmlsaXR5Q29uZmlnO1xuICAvKipcbiAgICogT2JqZWN0IG9mIHR5cGUgYEtleWJvYXJkQ29uZmlnYCB0byBhc3NpZ24gY3VzdG9tIGtleXMgdG8gYm90aCBFU0MsIFJJR0hUIGFuZCBMRUZUIGtleWJvYXJkJ3MgYWN0aW9ucy5cbiAgICovXG4gIEBJbnB1dCgpXG4gIGtleWJvYXJkQ29uZmlnOiBLZXlib2FyZENvbmZpZztcblxuICAvKipcbiAgICogT3V0cHV0IHRvIGVtaXQgYW4gZXZlbnQgd2hlbiBpbWFnZXMgYXJlIGxvYWRlZC4gVGhlIHBheWxvYWQgY29udGFpbnMgYW4gYEltYWdlTG9hZEV2ZW50YC5cbiAgICovXG4gIEBPdXRwdXQoKVxuICBsb2FfgW1hZ2U6IEV2ZW50RW1pdHRlcjxJbWFnZUxvYWRFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPEltYWdlTG9hZEV2ZW50PigpO1xuICAvKipcbiAgICogT3V0cHV0IHRvIGVtaXQgYW55IGNoYW5nZXMgb2YgdGhlIGN1cnJlbnQgaW1hZ2UuIFRoZSBwYXlsb2FkIGNvbnRhaW5zIGFuIGBJbWFnZU1vZGFsRXZlbnRgLlxuICAgKi9cbiAgQE91dHB1dCgpXG4gIGNoYW5nZUltYWdlOiBFdmVudEVtaXR0ZXI8SW1hZ2VNb2RhbEV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8SW1hZ2VNb2RhbEV2ZW50PigpO1xuICAvKipcbiAgICogT3V0cHV0IHRvIGVtaXQgYW4gZXZlbnQgd2hlbiB0aGUgbW9kYWwgZ2FsbGVyeSBpcyBjbG9zZWQuIFRoZSBwYXlsb2FkIGNvbnRhaW5zIGFuIGBJbWFnZU1vZGFsRXZlbnRgLlxuICAgKi9cbiAgQE91dHB1dCgpXG4gIGNsb3NlOiBFdmVudEVtaXR0ZXI8SW1hZ2VNb2RhbEV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8SW1hZ2VNb2RhbEV2ZW50PigpO1xuXG4gIC8qKlxuICAgKiBFbnVtIG9mIHR5cGUgYEFjdGlvbmAgdGhhdCByZXByZXNlbnRzIGEgbW91c2UgY2xpY2sgb24gYSBidXR0b24uXG4gICAqIERlY2xhcmVkIGhlcmUgdG8gYmUgdXNlZCBpbnNpZGUgdGhlIHRlbXBsYXRlLlxuICAgKi9cbiAgY2xpY2tBY3Rpb246IEFjdGlvbiA9IEFjdGlvbi5DTElDSztcbiAgLyoqXG4gICAqIEVudW0gb2YgdHlwZSBgQWN0aW9uYCB0aGF0IHJlcHJlc2VudHMgYSBrZXlib2FyZCBhY3Rpb24uXG4gICAqIERlY2xhcmVkIGhlcmUgdG8gYmUgdXNlZCBpbnNpZGUgdGhlIHRlbXBsYXRlLlxuICAgKi9cbiAga2V5Ym9hcmRBY3Rpb246IEFjdGlvbiA9IEFjdGlvbi5LRVlCT0FSRDtcbiAgLyoqXG4gICAqIEJvb2xlYW4gdGhhdCBpdCdzIHRydWUgd2hlbiB5b3UgYXJlIHdhdGNoaW5nIHRoZSBmaXJzdCBpbWFnZSAoY3VycmVudGx5IHZpc2libGUpLlxuICAgKiBGYWxzZSBieSBkZWZhdWx0XG4gICAqL1xuICBpc0ZpcnN0SW1hZ2UgPSBmYWxzZTtcbiAgLyoqXG4gICAqIEJvb2xlYW4gdGhhdCBpdCdzIHRydWUgd2hlbiB5b3UgYXJlIHdhdGNoaW5nIHRoZSBsYXN0IGltYWdlIChjdXJyZW50bHkgdmlzaWJsZSkuXG4gICAqIEZhbHNlIGJ5IGRlZmF1bHRcbiAgICovXG4gIGlzTGFzdEltYWdlID0gZmFsc2U7XG4gIC8qKlxuICAgKiBCb29sZWFuIHRoYXQgaXQncyB0cnVlIGlmIGFuIGltYWdlIG9mIHRoZSBtb2RhbCBnYWxsZXJ5IGlzIHN0aWxsIGxvYWRpbmcuXG4gICAqIFRydWUgYnkgZGVmYXVsdFxuICAgKi9cbiAgbG9hZGluZyA9IHRydWU7XG4gIC8qKlxuICAgKiBPYmplY3Qgb2YgdHlwZSBgQ3VycmVudEltYWdlQ29uZmlnYCBleHBvc2VkIHRvIHRoZSB0ZW1wbGF0ZS4gVGhpcyBmaWVsZCBpcyBpbml0aWFsaXplZFxuICAgKiBhcHBseWluZyB0cmFuc2Zvcm1hdGlvbnMsIGRlZmF1bHQgdmFsdWVzIGFuZCBzbyBvbiB0byB0aGUgaW5wdXQgb2YgdGhlIHNhbWUgdHlwZS5cbiAgICovXG4gIGNvbmZpZ0N1cnJlbnRJbWFnZTogQ3VycmVudEltYWdlQ29uZmlnO1xuXG4gIC8qKlxuICAgKiBQcml2YXRlIG9iamVjdCB3aXRob3V0IHR5cGUgdG8gZGVmaW5lIGFsbCBzd2lwZSBhY3Rpb25zIHVzZWQgYnkgaGFtbWVyanMuXG4gICAqL1xuICBwcml2YXRlIFNXSVBFX0FDVElPTiA9IHtcbiAgICBMRUZUOiAnc3dpcGVsZWZ0JyxcbiAgICBSSUdIVDogJ3N3aXBlcmlnaHQnLFxuICAgIFVQOiAnc3dpcGV1cCcsXG4gICAgRE9XTjogJ3N3aXBlZG93bidcbiAgfTtcblxuICAvKipcbiAgICogTWV0aG9kIMOCwrRuZ09uSW5pdMOCwrQgdG8gYnVpbGQgYGNvbmZpZ0N1cnJlbnRJbWFnZWAgYXBwbHlpbmcgZGVmYXVsdCB2YWx1ZXMuXG4gICAqIFRoaXMgaXMgYW4gQW5ndWxhcidzIGxpZmVjeWNsZSBob29rLCBzbyBpdHMgY2FsbGVkIGF1dG9tYXRpY2FsbHkgYnkgQW5ndWxhciBpdHNlbGYuXG4gICAqIEluIHBhcnRpY3VsYXIsIGl0J3MgY2FsbGVkIG9ubHkgb25lIHRpbWUhISFcbiAgICovXG4gIG5nT25Jbml0KCkge1xuICAgIGNvbnN0IGRlZmF1bHRMb2FkaW5nOiBMb2FkaW5nQ29uZmlnID0geyBlbmFibGU6IHRydWUsIHR5cGU6IExvYWRpbmdUeXBlLlNUQU5EQVJEIH07XG4gICAgY29uc3QgZGVmYXVsdERlc2NyaXB0aW9uU3R5bGU6IERlc2NyaXB0aW9uU3R5bGUgPSB7XG4gICAgICBiZ0NvbG9yOiAncmdiYSgwLCAwLCAwLCAuNSknLFxuICAgICAgdGV4dENvbG9yOiAnd2hpdGUnLFxuICAgICAgbWFyZ2luVG9wOiAnMHB4JyxcbiAgICAgIG1hcmdpbkJvdHRvbTogJzBweCcsXG4gICAgICBtYXJnaW5MZWZ0OiAnMHB4JyxcbiAgICAgIG1hcmdpblJpZ2h0OiAnMHB4J1xuICAgIH07XG4gICAgY29uc3QgZGVmYXVsdERlc2NyaXB0aW9uOiBEZXNjcmlwdGlvbiA9IHtcbiAgICAgIHN0cmF0ZWd5OiBEZXNjcmlwdGlvblN0cmF0ZWd5LkFMV0FZU19WSVNJQkxFLFxuICAgICAgaW1hZ2VUZXh0OiAnSW1hZ2UgJyxcbiAgICAgIG51bWJlclNlcGFyYXRvcjogJy8nLFxuICAgICAgYmVmb3JlVGV4dERlc2NyaXB0aW9uOiAnIC0gJyxcbiAgICAgIHN0eWxlOiBkZWZhdWx0RGVzY3JpcHRpb25TdHlsZVxuICAgIH07XG4gICAgY29uc3QgZGVmYXVsdEN1cnJlbnRJbWFnZUNvbmZpZzogQ3VycmVudEltYWdlQ29uZmlnID0ge1xuICAgICAgbmF2aWdhdGVPbkNsaWNrOiB0cnVlLFxuICAgICAgbG9hZGluZ0NvbmZpZzogZGVmYXVsdExvYWRpbmcsXG4gICAgICBkZXNjcmlwdGlvbjogZGVmYXVsdERlc2NyaXB0aW9uLFxuICAgICAgZG93bmxvYWRhYmxlOiBmYWxzZSxcbiAgICAgIGludmVydFN3aXBlOiBmYWxzZVxuICAgIH07XG5cbiAgICB0aGlzLmNvbmZpZ0N1cnJlbnRJbWFnZSA9IE9iamVjdC5hc3NpZ24oe30sIGRlZmF1bHRDdXJyZW50SW1hZ2VDb25maWcsIHRoaXMuY3VycmVudEltYWdlQ29uZmlnKTtcbiAgICB0aGlzLmNvbmZpZ0N1cnJlbnRJbWFnZS5kZXNjcmlwdGlvbiA9IE9iamVjdC5hc3NpZ24oe30sIGRlZmF1bHREZXNjcmlwdGlvbiwgdGhpcy5jb25maWdDdXJyZW50SW1hZ2UuZGVzY3JpcHRpb24pO1xuICB9XG5cbiAgLyoqXG4gICAqIE1ldGhvZCDDgsK0bmdPbkNoYW5nZXPDgsK0IHRvIHVwZGF0ZSBgbG9hZGluZ2Agc3RhdHVzIGFuZCBlbWl0IGV2ZW50cy5cbiAgICogSWYgdGhlIGdhbGxlcnkgaXMgb3BlbiwgdGhlbiBpdCB3aWxsIGFsc28gbWFuYWdlIGJvdW5kYXJ5IGFycm93cyBhbmQgc2xpZGluZy5cbiAgICogVGhpcyBpcyBhbiBBbmd1bGFyJ3MgbGlmZWN5Y2xlIGhvb2ssIHNvIGl0cyBjYWxsZWQgYXV0b21hdGljYWxseSBieSBBbmd1bGFyIGl0c2VsZi5cbiAgICogSW4gcGFydGljdWxhciwgaXQncyBjYWxsZWQgd2hlbiBhbnkgZGF0YS1ib3VuZCBwcm9wZXJ0eSBvZiBhIGRpcmVjdGl2ZSBjaGFuZ2VzISEhXG4gICAqL1xuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzfgB7XG4gICAgY29uc3QgaW1hZ2VzOiBTaW1wbGVDaGFuZ2UgPSBjaGFuZ2VzLmltYWdlcztcbiAgICBjb25zdCBjdXJyZW50SW1hZ2U6IFNpbXBsZUNoYW5nZSA9IGNoYW5nZXMuY3VycmVudEltYWdlO1xuXG4gICAgaWYgKGN1cnJlbnRJbWFnZSAmJiBjdXJyZW50SW1hZ2UucHJldmlvdXNWYWx1ZSAhPT0gY3VycmVudEltYWdlLmN1cnJlbnRWYWx1ZSkge1xuICAgICAgdGhpcy51cGRhdGVJbmRleGVzKCk7XG4gICAgfSBlbHNlIGlmIChpbWFnZXMgJiYgaW1hZ2VzLnByZXZpb3VzVmFsdWUgIT09IGltYWdlcy5jdXJyZW50VmFsdWUpIHtcbiAgICAgIHRoaXMudXBkYXRlSW5kZXhlcygpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBNZXRob2QgdG8gaGFuZGxlIGtleXByZXNzIGJhc2VkIG9uIHRoZSBga2V5Ym9hcmRDb25maWdgIGlucHV0LiBJdCBnZXRzIHRoZSBrZXlDb2RlIG9mXG4gICAqIHRoZSBrZXkgdGhhdCB0cmlnZ2VyZWQgdGhlIGtleXByZXNzIGV2ZW50IHRvIG5hdmlnYXRlIGJldHdlZW4gaW1hZ2VzIG9yIHRvIGNsb3NlIHRoZSBtb2RhbCBnYWxsZXJ5LlxuICAgKiBAcGFyYW0gbnVtYmVyIGtleUNvZGUgb2YgdGhlIGtleSB0aGF0IHRyaWdnZXJlZCB0aGUga2V5cHJlc3MgZXZlbnRcbiAgICovXG4gIG9uS2V5UHJlc3Moa2V5Q29kZTogbnVtYmVyfgB7XG4gICAgY29uc3QgZXNjOiBudW1iZXIgPSB0aGlzLmtleWJvYXJkQ29uZmlnICYmIHRoaXMua2V5Ym9hcmRDb25maWcuZXNjID8gdGhpcy5rZXlib2FyZENvbmZpZy5lc2MgOiBLZXlib2FyZC5FU0M7XG4gICAgY29uc3QgcmlnaHQ6IG51bWJlciA9IHRoaXMua2V5Ym9hcmRDb25maWcgJiYgdGhpcy5rZXlib2FyZENvbmZpZy5yaWdodCA/IHRoaXMua2V5Ym9hcmRDb25maWcucmlnaHQgOiBLZXlib2FyZC5SSUdIVF9BUlJPVztcbiAgICBjb25zdCBsZWZ0OiBudW1iZXIgPSB0aGlzLmtleWJvYXJkQ29uZmlnICYmIHRoaXMua2V5Ym9hcmRDb25maWcubGVmdCA/IHRoaXMua2V5Ym9hcmRDb25maWcubGVmdCA6IEtleWJvYXJkLkxFRlRfQVJST1c7XG5cbiAgICBzd2l0Y2ggKGtleUNvZGUpIHtcbiAgICAgIGNhc2UgZXNjOlxuICAgICAgICB0aGlzLmNsb3NlLmVtaXQobmV3IEltYWdlTW9kYWxFdmVudChBY3Rpb24uS0VZQk9BUkQsIHRydWUpKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIHJpZ2h0OlxuICAgICAgICB0aGlzLm5leHRJbWFnZShBY3Rpb24uS0VZQk9BUkQpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgbGVmdDpcbiAgICAgICAgdGhpcy5wcmV2SW1hZ2UoQWN0aW9uLktFWUJPQVJEKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIE1ldGhvZCB0byBnZXQgdGhlIGltYWdlIGRlc2NyaXB0aW9uIGJhc2VkIG9uIGlucHV0IHBhcmFtcy5cbiAgICogSWYgeW91IHByb3ZpZGUgYSBmdWxsIGRlc2NyaXB0aW9uIHRoaXMgd2lsbCBiZSB0aGUgdmlzaWJsZSBkZXNjcmlwdGlvbiwgb3RoZXJ3aXNlLFxuICAgKiBpdCB3aWxsIGJlIGJ1aWx0IHVzaW5nIHRoZSBgRGVzY3JpcHRpb25gIG9iamVjdCwgY29uY2F0ZW5hdGluZyBpdHMgZmllbGRzLlxuICAgKiBAcGFyYW0gSW1hZ2UgaW1hZ2UgdG8gZ2V0IGl0cyBkZXNjcmlwdGlvbi4gSWYgbm90IHByb3ZpZGVkIGl0IHdpbGwgYmUgdGhlIGN1cnJlbnQgaW1hZ2VcbiAgICogQHJldHVybnMgU3RyaW5nIGRlc2NyaXB0aW9uIG9mIHRoZSBpbWFnZSAob3IgdGhlIGN1cnJlbnQgaW1hZ2UgaWYgbm90IHByb3ZpZGVkKVxuICAgKiBAdGhyb3dzIGFuIEVycm9yIGlmIGRlc2NyaXB0aW9uIGlzbid0IGF2YWlsYWJsZVxuICAgKi9cbiAgZ2V0RGVzY3JpcHRpb25Ub0Rpc3BsYXkoaW1hZ2U6IEltYWdlID0gdGhpcy5jdXJyZW50SW1hZ2UpOiBzdHJpbmcge1xuICAgIGlmICghdGhpcy5jb25maWdDdXJyZW50SW1hZ2UgfHwgIXRoaXMuY29uZmlnQ3VycmVudEltYWdlLmRlc2NyaXB0aW9ufgB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Rlc2NyaXB0aW9uIGlucHV0IG11c3QgYmUgYSB2YWxpZCBvYmplY3QgaW1wbGVtZW50aW5nIHRoZSBEZXNjcmlwdGlvbiBpbnRlcmZhY2UnKTtcbiAgICB9XG5cbiAgICBjb25zdCBpbWFnZVdpdGhvdXREZXNjcmlwdGlvbjogYm9vbGVhbiA9ICFpbWFnZS5tb2RhbCB8fCAhaW1hZ2UubW9kYWwuZGVzY3JpcHRpb24gfHwgaW1hZ2UubW9kYWwuZGVzY3JpcHRpb24gPT09ICcnO1xuXG4gICAgc3dpdGNoICh0aGlzLmNvbmZpZ0N1cnJlbnRJbWFnZS5kZXNjcmlwdGlvbi5zdHJhdGVneSkge1xuICAgICAgY2FzZSBEZXNjcmlwdGlvblN0cmF0ZWd5LkhJREVfSUZfRU1QVFk6XG4gICAgICAgIHJldHVybiBpbWFnZVdpdGhvdXREZXNjcmlwdGlvbiA/ICcnIDogaW1hZ2UubW9kYWwuZGVzY3JpcHRpb24gKyAnJztcbiAgICAgIGNhc2UgRGVzY3JpcHRpb25TdHJhdGVneS5BTFdBWVNfSElEREVOOlxuICAgICAgICByZXR1cm4gJyc7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICAvLyAtLS0tLS0tLS0tLSBEZXNjcmlwdGlvblN0cmF0ZWd5LkFMV0FZU19WSVNJQkxFIC0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICAgIHJldHVybiB0aGlzLmJ1aWxkVGV4dERlc2NyaXB0aW9uKGltYWdlLCBpbWFnZVdpdGhvdXREZXNjcmlwdGlvbik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIE1ldGhvZCB0byBnZXQgYGFsdCBhdHRyaWJ1dGVgLlxuICAgKiBgYWx0YCBzcGVjaWZpZXMgYW4gYWx0ZXJuYXRlIHRleHQgZm9yIGFuIGltYWdlLCBpZiB0aGUgaW1hZ2UgY2Fubm90IGJlIGRpc3BsYXllZC5cbiAgICogQHBhcmFtIEltYWdlIGltYWdlIHRvIGdldCBpdHMgYWx0IGRlc2NyaXB0aW9uLiBJZiBub3QgcHJvdmlkZWQgaXQgd2lsbCBiZSB0aGUgY3VycmVudCBpbWFnZVxuICAgKiBAcmV0dXJucyBTdHJpbmcgYWx0IGRlc2NyaXB0aW9uIG9mIHRoZSBpbWFnZSAob3IgdGhlIGN1cnJlbnQgaW1hZ2UgaWYgbm90IHByb3ZpZGVkKVxuICAgKi9cbiAgZ2V0QWx0RGVzY3JpcHRpb25CeUltYWdlKGltYWdlOiBJbWFnZSA9IHRoaXMuY3VycmVudEltYWdlKTogc3RyaW5nIHtcbiAgICBpZiAoIWltYWdlfgB7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfVxuICAgIHJldHVybiBpbWFnZS5tb2RhbCAmJiBpbWFnZS5tb2RhbC5kZXNjcmlwdGlvbiA/IGltYWdlLm1vZGFsLmRlc2NyaXB0aW9uIDogYEltYWdlICR7Z2V0SW5kZXgoaW1hZ2UsIHRoaXMuaW1hZ2VzfgArIDF9YDtcbiAgfVxuXG4gIC8qKlxuICAgKiBNZXRob2QgdG8gZ2V0IHRoZSB0aXRsZSBhdHRyaWJ1dGVzIGJhc2VkIG9uIGRlc2NyaXB0aW9ucy5cbiAgICogVGhpcyBpcyB1c2VmdWwgdG8gcHJldmVudCBhY2Nlc3NpYmlsaXR5IGlzc3VlcywgYmVjYXVzZSBpZiBEZXNjcmlwdGlvblN0cmF0ZWd5IGlzIEFMV0FZU19ISURERU4sXG4gICAqIGl0IHByZXZlbnRzIGFuIGVtcHR5IHN0cmluZyBhcyB0aXRsZS5cbiAgICogQHBhcmFtIEltYWdlIGltYWdlIHRvIGdldCBpdHMgZGVzY3JpcHRpb24uIElmIG5vdCBwcm92aWRlZCBpdCB3aWxsIGJlIHRoZSBjdXJyZW50IGltYWdlXG4gICAqIEByZXR1cm5zIFN0cmluZyB0aXRsZSBvZiB0aGUgaW1hZ2UgYmFzZWQgb24gZGVzY3JpcHRpb25zXG4gICAqIEB0aHJvd3MgYW4gRXJyb3IgaWYgZGVzY3JpcHRpb24gaXNuJ3QgYXZhaWxhYmxlXG4gICAqL1xuICBnZXRUaXRsZVRvRGlzcGxheShpbWFnZTogSW1hZ2UgPSB0aGlzLmN1cnJlbnRJbWFnZSk6IHN0cmluZyB7XG4gICAgaWYgKCF0aGlzLmNvbmZpZ0N1cnJlbnRJbWFnZSB8fCAhdGhpcy5jb25maWdDdXJyZW50SW1hZ2UuZGVzY3JpcHRpb24pIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignRGVzY3JpcHRpb24gaW5wdXQgbXVzdCBiZSBhIHZhbGlkIG9iamVjdCBpbXBsZW1lbnRpbmcgdGhlIERlc2NyaXB0aW9uIGludGVyZmFjZScpO1xuICAgIH1cbiAgICBjb25zdCBpbWFnZVdpdGhvdXREZXNjcmlwdGlvbjogYm9vbGVhbiA9ICFpbWFnZS5tb2RhbCB8fCAhaW1hZ2UubW9kYWwuZGVzY3JpcHRpb24gfHwgaW1hZ2UubW9kYWwuZGVzY3JpcHRpb24gPT09ICcnO1xuICAgIGNvbnN0IGRlc2NyaXB0aW9uOiBzdHJpbmcgPSB0aGlzLmJ1aWxkVGV4dERlc2NyaXB0aW9uKGltYWdlLCBpbWFnZVdpdGhvdXREZXNjcmlwdGlvbik7XG4gICAgcmV0dXJuIGRlc2NyaXB0aW9uO1xuICB9XG5cbiAgLyoqXG4gICAqIE1ldGhvZCB0byBnZXQgdGhlIGxlZnQgc2lkZSBwcmV2aWV3IGltYWdlLlxuICAgKiBAcmV0dXJucyBJbWFnZSB0aGUgaW1hZ2UgdG8gc2hvdyBhcyBzaXplIHByZXZpZXcgb24gdGhlIGxlZnRcbiAgICovXG4gIGdldExlZnRQcmV2aWV3SW1hZ2UoKTogSW1hZ2Uge1xuICAgIGNvbnN0IGN1cnJlbnRJbmRleDogbnVtYmVyID0gZ2V0SW5kZXgodGhpcy5jdXJyZW50SW1hZ2UsIHRoaXMuaW1hZ2VzKTtcbiAgICBpZiAoY3VycmVudEluZGV4ID09PSAwICYmIHRoaXMuc2xpZGVDb25maWcuaW5maW5pdGUpIHtcbiAgICAgIC8vIHRoZSBjdXJyZW50IGltYWdlIGlzIHRoZSBmaXJzdCBvbmUsXG4gICAgICAvLyBzbyB0aGUgcHJldmlvdXMgb25lIGlzIHRoZSBsYXN0IGltYWdlXG4gICAgICAvLyBiZWNhdXNlIGluZmluaXRlIGlzIHRydWVcbiAgICAgIHJldHVybiB0aGlzLmltYWdlc1t0aGlzLmltYWdlcy5sZW5ndGggLSAxXTtcbiAgICB9XG4gICAgdGhpcy5oYW5kbGVCb3VuZGFyaWVzKGN1cnJlbnRJbmRleCk7XG4gICAgcmV0dXJuIHRoaXMuaW1hZ2VzW01hdGgubWF4KGN1cnJlbnRJbmRleCAtIDEsIDApXTtcbiAgfVxuXG4gIC8qKlxuICAgKiBNZXRob2QgdG8gZ2V0IHRoZSByaWdodCBzaWRlIHByZXZpZXcgaW1hZ2UuXG4gICAqIEByZXR1cm5zIEltYWdlIHRoZSBpbWFnZSB0byBzaG93IGFzIHNpemUgcHJldmlldyBvbiB0aGUgcmlnaHRcbiAgICovXG4gIGdldFJpZ2h0UHJldmlld0ltYWdlKCk6IEltYWdlIHtcbiAgICBjb25zdCBjdXJyZW50SW5kZXg6IG51bWJlciA9IGdldEluZGV4KHRoaXMuY3VycmVudEltYWdlLCB0aGlzLmltYWdlcyk7XG4gICAgaWYgKGN1cnJlbnRJbmRleCA9PT0gdGhpcy5pbWFnZXMubGVuZ3RoIC0gMSAmJiB0aGlzLnNsaWRlQ29uZmlnLmluZmluaXRlfgB7XG4gICAgICAvLyB0aGUgY3VycmVudCBpbWFnZSBpcyB0aGUgbGFzdCBvbmUsXG4gICAgICAvLyBzbyB0aGUgbmV4dCBvbmUgaXMgdGhlIGZpcnN0IGltYWdlXG4gICAgICAvLyBiZWNhdXNlIGluZmluaXRlIGlzIHRydWVcbiAgICAgIHJldHVybiB0aGlzLmltYWdlc1swXTtcbiAgICB9XG4gICAgdGhpcy5oYW5kbGVCb3VuZGFyaWVzKGN1cnJlbnRJbmRleCk7XG4gICAgcmV0dXJuIHRoaXMuaW1hZ2VzW01hdGgubWluKGN1cnJlbnRJbmRleCArIDEsIHRoaXMuaW1hZ2VzLmxlbmd0aCAtIDEpXTtcbiAgfVxuXG4gIC8qKlxuICAgKiBNZXRob2QgY2FsbGVkIGJ5IGV2ZW50cyBmcm9tIGJvdGgga2V5Ym9hcmQgYW5kIG1vdXNlIG9uIGFuIGltYWdlLlxuICAgKiBUaGlzIHdpbGwgaW52b2tlIHRoZSBuZXh0SW1hZ2UgbWV0aG9kLlxuICAgKiBAcGFyYW0gS2V5Ym9hcmRFdmVudCB8IE1vdXNlRXZlbnQgZXZlbnQgcGF5bG9hZFxuICAgKiBAcGFyYW0gQWN0aW9uIGFjdGlvbiB0aGF0IHRyaWdnZXJlZCB0aGUgZXZlbnQgb3IgYEFjdGlvbi5OT1JNQUxgIGlmIG5vdCBwcm92aWRlZFxuICAgKi9cbiAgb25JbWFnZUV2ZW50KGV2ZW50OiBLZXlib2FyZEV2ZW50IHwgTW91c2VFdmVudCwgYWN0aW9uOiBBY3Rpb24gPSBBY3Rpb24uTk9STUFMfgB7XG4gICAgLy8gY2hlY2sgaWYgdHJpZ2dlcmVkIGJ5IGEgbW91c2UgY2xpY2tcbiAgICAvLyBJZiB5ZXMsIEl0IHNob3VsZCBibG9jayBuYXZpZ2F0aW9uIHdoZW4gbmF2aWdhdGVPbkNsaWNrIGlzIGZhbHNlXG4gICAgaWYgKGFjdGlvbiA9PT0gQWN0aW9uLkNMSUNLICYmICF0aGlzLmNvbmZpZ0N1cnJlbnRJbWFnZS5uYXZpZ2F0ZU9uQ2xpY2spIHtcbiAgICAgIC8vIGEgdXNlciBoYXMgcmVxdWVzdGVkIHRvIGJsb2NrIG5hdmlnYXRpb24gdmlhIGNvbmZpZ0N1cnJlbnRJbWFnZS5uYXZpZ2F0ZU9uQ2xpY2sgcHJvcGVydHlcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCByZXN1bHQ6IG51bWJlciA9IHN1cGVyLmhhbmRsZUltYWdlRXZlbnQoZXZlbnQpO1xuICAgIGlmIChyZXN1bHQgPT09IE5FWFQpIHtcbiAgICAgIHRoaXMubmV4dEltYWdlKGFjdGlvbik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIE1ldGhvZCBjYWxsZWQgYnkgZXZlbnRzIGZyb20gYm90aCBrZXlib2FyZCBhbmQgbW91c2Ugb24gYSBuYXZpZ2F0aW9uIGFycm93LlxuICAgKiBAcGFyYW0gc3RyaW5nIGRpcmVjdGlvbiBvZiB0aGUgbmF2aWdhdGlvbiB0aGF0IGNhbiBiZSBlaXRoZXIgJ25leHQnIG9yICdwcmV2J1xuICAgKiBAcGFyYW0gS2V5Ym9hcmRFdmVudCB8IE1vdXNlRXZlbnQgZXZlbnQgcGF5bG9hZFxuICAgKiBAcGFyYW0gQWN0aW9uIGFjdGlvbiB0aGF0IHRyaWdnZXJlZCB0aGUgZXZlbnQgb3IgYEFjdGlvbi5OT1JNQUxgIGlmIG5vdCBwcm92aWRlZFxuICAgKi9cbiAgb25OYXZpZ2F0aW9uRXZlbnQoZGlyZWN0aW9uOiBzdHJpbmcsIGV2ZW50OiBLZXlib2FyZEV2ZW50LCBhY3Rpb246IEFjdGlvbiA9IEFjdGlvbi5OT1JNQUwpIHtcbiAgICBjb25zdCByZXN1bHQ6IG51bWJlciA9IHN1cGVyLmhhbmRsZU5hdmlnYXRpb25FdmVudChkaXJlY3Rpb24sIGV2ZW50KTtcbiAgICBpZiAocmVzdWx0ID09PSBORVhUfgB7XG4gICAgICB0aGlzLm5leHRJbWFnZShhY3Rpb24pO1xuICAgIH0gZWxzZSBpZiAocmVzdWx0ID09PSBQUkVWfgB7XG4gICAgICB0aGlzLnByZXZJbWFnZShhY3Rpb24pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBNZXRob2QgdG8gZ28gYmFjayB0byB0aGUgcHJldmlvdXMgaW1hZ2UuXG4gICAqIEBwYXJhbSBhY3Rpb24gRW51bSBvZiB0eXBlIGBBY3Rpb25gIHRoYXQgcmVwcmVzZW50cyB0aGUgc291cmNlXG4gICAqICBhY3Rpb24gdGhhdCBtb3ZlZCBiYWNrIHRvIHRoZSBwcmV2aW91cyBpbWFnZS4gYEFjdGlvbi5OT1JNQUxgIGJ5IGRlZmF1bHQuXG4gICAqL1xuICBwcmV2SW1hZ2UoYWN0aW9uOiBBY3Rpb24gPSBBY3Rpb24uTk9STUFMfgB7XG4gICAgLy8gY2hlY2sgaWYgcHJldkltYWdlIHNob3VsZCBiZSBibG9ja2VkXG4gICAgaWYgKHRoaXMuaXNQcmV2ZW50U2xpZGluZygwfgkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBwcmV2SW1hZ2U6IEludGVybmFsTGliSW1hZ2UgPSB0aGlzLmdldFByZXZJbWFnZSgpO1xuICAgIHRoaXMubG9hZGluZyA9ICFwcmV2SW1hZ2UucHJldmlvdXNseUxvYWRlZDtcbiAgICB0aGlzLmNoYW5nZUltYWdlLmVtaXQobmV3IEltYWdlTW9kYWxFdmVudChhY3Rpb24sIGdldEluZGV4KHByZXZJbWFnZSwgdGhpcy5pbWFnZXMpfgk7XG4gIH1cblxuICAvKipcbiAgICogTWV0aG9kIHRvIGdvIGJhY2sgdG8gdGhlIHByZXZpb3VzIGltYWdlLlxuICAgKiBAcGFyYW0gYWN0aW9uIEVudW0gb2YgdHlwZSBgQWN0aW9uYCB0aGF0IHJlcHJlc2VudHMgdGhlIHNvdXJjZVxuICAgKiAgYWN0aW9uIHRoYXQgbW92ZWQgdG8gdGhlIG5leHQgaW1hZ2UuIGBBY3Rpb24uTk9STUFMYCBieSBkZWZhdWx0LlxuICAgKi9cbiAgbmV4dEltYWdlKGFjdGlvbjogQWN0aW9uID0gQWN0aW9uLk5PUk1BTCkge1xuICAgIC8vIGNoZWNrIGlmIG5leHRJbWFnZSBzaG91bGQgYmUgYmxvY2tlZFxuICAgIGlmICh0aGlzLmlzUHJldmVudFNsaWRpbmcodGhpcy5pbWFnZXMubGVuZ3RoIC0gMSkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgbmV4dEltYWdlOiBJbnRlcm5hbExpYkltYWdlID0gdGhpcy5nZXROZXh0SW1hZ2UoKTtcbiAgICB0aGlzLmxvYWRpbmcgPSAhbmV4dEltYWdlLnByZXZpb3VzbHlMb2FkZWQ7XG4gICAgdGhpcy5jaGFuZ2VJbWFnZS5lbWl0KG5ldyBJbWFnZU1vZGFsRXZlbnQoYWN0aW9uLCBnZXRJbmRleChuZXh0SW1hZ2UsIHRoaXMuaW1hZ2VzfgkpO1xuICB9XG5cbiAgLyoqXG4gICAqIE1ldGhvZCB0byBlbWl0IGFuIGV2ZW50IGFzIGxvYWRJbWFnZSBvdXRwdXQgdG8gc2F5IHRoYXQgdGhlIHJlcXVlc3RlZCBpbWFnZSBpZiBsb2FkZWQuXG4gICAqIFRoaXMgbWV0aG9kIGlzIGludm9rZWQgYnkgdGhlIGphdmFzY3JpcHQncyAnbG9hZCcgZXZlbnQgb24gYW4gaW1nIHRhZy5cbiAgICogQHBhcmFtIEV2ZW50IGV2ZW50IHRoYXQgdHJpZ2dlcmVkIHRoZSBsb2FkXG4gICAqL1xuICBvbkltYWdlTG9hZChldmVudDogRXZlbnQpIHtcbiAgICBjb25zdCBsb2FfgW1hZ2VEYXRhOiBJbWFnZUxvYWRFdmVudCA9IHtcbiAgICAgIHN0YXR1czogdHJ1ZSxcbiAgICAgIGluZGV4OiBnZXRJbmRleCh0aGlzLmN1cnJlbnRJbWFnZSwgdGhpcy5pbWFnZXMpLFxuICAgICAgaWQ6IHRoaXMuY3VycmVudEltYWdlLmlkXG4gICAgfTtcblxuICAgIHRoaXMubG9hZEltYWdlLmVtaXQobG9hZEltYWdlRGF0YSk7XG5cbiAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBNZXRob2QgdXNlZCBieSBIYW1tZXJqcyB0byBzdXBwb3J0IHRvdWNoIGdlc3R1cmVzICh5b3UgY2FuIGFsc28gaW52ZXJ0IHRoZSBzd2lwZSBkaXJlY3Rpb24gd2l0aCBjb25maWdDdXJyZW50SW1hZ2UuaW52ZXJ0U3dpcGUpLlxuICAgKiBAcGFyYW0gYWN0aW9uIFN0cmluZyB0aGF0IHJlcHJlc2VudCB0aGUgZGlyZWN0aW9uIG9mIHRoZSBzd2lwZSBhY3Rpb24uICdzd2lwZXJpZ2h0JyBieSBkZWZhdWx0LlxuICAgKi9cbiAgc3dpcGUoYWN0aW9uID0gdGhpcy5TV0lQRV9BQ1RJT04uUklHSFQpIHtcbiAgICBzd2l0Y2ggKGFjdGlvbikge1xuICAgICAgY2FzZSB0aGlzLlNXSVBFX0FDVElPTi5SSUdIVDpcbiAgICAgICAgaWYgKHRoaXMuY29uZmlnQ3VycmVudEltYWdlLmludmVydFN3aXBlfgB7XG4gICAgICAgICAgdGhpcy5wcmV2SW1hZ2UoQWN0aW9uLlNXSVBFKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLm5leHRJbWFnZShBY3Rpb24uU1dJUEUpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSB0aGlzLlNXSVBFX0FDVElPTi5MRUZUOlxuICAgICAgICBpZiAodGhpcy5jb25maWdDdXJyZW50SW1hZ2UuaW52ZXJ0U3dpcGUpIHtcbiAgICAgICAgICB0aGlzLm5leHRJbWFnZShBY3Rpb24uU1dJUEUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMucHJldkltYWdlKEFjdGlvbi5TV0lQRSk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICAvLyBjYXNlIHRoaXMuU1dJUEVfQUNUSU9OLlVQOlxuICAgICAgLy8gICBicmVhaztcbiAgICAgIC8vIGNhc2UgdGhpcy5TV0lQRV9BQ1RJT04uRE9XTjpcbiAgICAgIC8vICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIE1ldGhvZCB1c2VkIGluIGBtb2RhbC1nYWxsZXJ5LmNvbXBvbmVudGAgdG8gZ2V0IHRoZSBpbmRleCBvZiBhbiBpbWFnZSB0byBkZWxldGUuXG4gICAqIEBwYXJhbSBJbWFnZSBpbWFnZSB0byBnZXQgdGhlIGluZGV4LCBvciB0aGUgdmlzaWJsZSBpbWFnZSwgaWYgbm90IHBhc3NlZFxuICAgKiBAcmV0dXJucyBudW1iZXIgdGhlIGluZGV4IG9mIHRoZSBpbWFnZVxuICAgKi9cbiAgZ2V0SW5kZXhUb0RlbGV0ZShpbWFnZTogSW1hZ2UgPSB0aGlzLmN1cnJlbnRJbWFnZSk6IG51bWJlciB7XG4gICAgcmV0dXJuIGdldEluZGV4KGltYWdlLCB0aGlzLmltYWdlcyk7XG4gIH1cblxuICAvKipcbiAgICogUHJpdmF0ZSBtZXRob2QgdG8gdXBkYXRlIGJvdGggYGlzRmlyc3RJbWFnZWAgYW5kIGBpc0xhc3RJbWFnZWAgYmFzZWQgb25cbiAgICogdGhlIGluZGV4IG9mIHRoZSBjdXJyZW50IGltYWdlLlxuICAgKiBAcGFyYW0gbnVtYmVyIGN1cnJlbnRJbmRleCBpcyB0aGUgaW5kZXggb2YgdGhlIGN1cnJlbnQgaW1hZ2VcbiAgICovXG4gIHByaXZhdGUgaGFuZGxlQm91bmRhcmllcyhjdXJyZW50SW5kZXg6IG51bWJlcikge1xuICAgIGlmICh0aGlzLmltYWdlcy5sZW5ndGggPT09IDEpIHtcbiAgICAgIHRoaXMuaXNGaXJzdEltYWdlID0gdHJ1ZTtcbiAgICAgIHRoaXMuaXNMYXN0SW1hZ2UgPSB0cnVlO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoIXRoaXMuc2xpZGVDb25maWcgfHwgdGhpcy5zbGlkZUNvbmZpZy5pbmZpbml0ZSA9PT0gdHJ1ZSkge1xuICAgICAgLy8gaW5maW5pdGUgc2xpZGluZyBlbmFibGVkXG4gICAgICB0aGlzLmlzRmlyc3RJbWFnZSA9IGZhbHNlO1xuICAgICAgdGhpcy5pc0xhc3RJbWFnZSA9IGZhbHNlO1xuICAgIH0gZWxzZSB7XG4gICAgICBzd2l0Y2ggKGN1cnJlbnRJbmRleCkge1xuICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgLy8gZXhlY3V0ZSB0aGlzIG9ubHkgaWYgaW5maW5pdGUgc2xpZGluZyBpcyBkaXNhYmxlZFxuICAgICAgICAgIHRoaXMuaXNGaXJzdEltYWdlID0gdHJ1ZTtcbiAgICAgICAgICB0aGlzLmlzTGFzdEltYWdlID0gZmFsc2U7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgdGhpcy5pbWFnZXMubGVuZ3RoIC0gMTpcbiAgICAgICAgICAvLyBleGVjdXRlIHRoaXMgb25seSBpZiBpbmZpbml0ZSBzbGlkaW5nIGlzIGRpc2FibGVkXG4gICAgICAgICAgdGhpcy5pc0ZpcnN0SW1hZ2UgPSBmYWxzZTtcbiAgICAgICAgICB0aGlzLmlzTGFzdEltYWdlID0gdHJ1ZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICB0aGlzLmlzRmlyc3RJbWFnZSA9IGZhbHNlO1xuICAgICAgICAgIHRoaXMuaXNMYXN0SW1hZ2UgPSBmYWxzZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUHJpdmF0ZSBtZXRob2QgdG8gY2hlY2sgaWYgbmV4dC9wcmV2IGFjdGlvbnMgc2hvdWxkIGJlIGJsb2NrZWQuXG4gICAqIEl0IGNoZWNrcyBpZiBzbGlkZUNvbmZpZy5pbmZpbml0ZSA9PT0gZmFsc2UgYW5kIGlmIHRoZSBpbWFnZSBpbmRleCBpcyBlcXVhbHMgdG8gdGhlIGlucHV0IHBhcmFtZXRlci5cbiAgICogSWYgeWVzLCBpdCByZXR1cm5zIHRydWUgdG8gc2F5IHRoYXQgc2xpZGluZyBzaG91bGQgYmUgYmxvY2tlZCwgb3RoZXJ3aXNlIG5vdC5cbiAgICogQHBhcmFtIG51bWJlciBib3VuZGFyeUluZGV4IHRoYXQgY291bGQgYmUgZWl0aGVyIHRoZSBiZWdpbm5pbmcgaW5kZXggKDApIG9yIHRoZSBsYXN0IGluZGV4XG4gICAqICBvZiBpbWFnZXMgKHRoaXMuaW1hZ2VzLmxlbmd0aCAtIDEpLlxuICAgKiBAcmV0dXJucyBib29sZWFuIHRydWUgaWYgc2xpZGVDb25maWcuaW5maW5pdGUgPT09IGZhbHNlIGFuZCB0aGUgY3VycmVudCBpbmRleCBpc1xuICAgKiAgZWl0aGVyIHRoZSBmaXJzdCBvciB0aGUgbGFzdCBvbmUuXG4gICAqL1xuICBwcml2YXRlIGlzUHJldmVudFNsaWRpbmcoYm91bmRhcnlJbmRleDogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICEhdGhpcy5zbGlkZUNvbmZpZyAmJiB0aGlzLnNsaWRlQ29uZmlnLmluZmluaXRlID09PSBmYWxzZSAmJiBnZXRJbmRleCh0aGlzLmN1cnJlbnRJbWFnZSwgdGhpcy5pbWFnZXMpID09PSBib3VuZGFyeUluZGV4O1xuICB9XG5cbiAgLyoqXG4gICAqIFByaXZhdGUgbWV0aG9kIHRvIGdldCB0aGUgbmV4dCBpbmRleC5cbiAgICogVGhpcyBpcyBuZWNlc3NhcnkgYmVjYXVzZSBhdCB0aGUgZW5kLCB3aGVuIHlvdSBjYWxsIG5leHQgYWdhaW4sIHlvdSdsbCBnbyB0byB0aGUgZmlyc3QgaW1hZ2UuXG4gICAqIFRoYXQgaGFwcGVucyBiZWNhdXNlIGFsbCBtb2RhbCBpbWFnZXMgYXJlIHNob3duIGxpa2UgaW4gYSBjaXJjbGUuXG4gICAqL1xuICBwcml2YXRlIGdldE5leHRJbWFnZSgpOiBJbnRlcm5hbExpYkltYWdlIHtcbiAgICBjb25zdCBjdXJyZW50SW5kZXg6IG51bWJlciA9IGdldEluZGV4KHRoaXMuY3VycmVudEltYWdlLCB0aGlzLmltYWdlcyk7XG4gICAgbGV0IG5ld0luZGV4ID0gMDtcbiAgICBpZiAoY3VycmVudEluZGV4ID49IDAgJiYgY3VycmVudEluZGV4IDwgdGhpcy5pbWFnZXMubGVuZ3RoIC0gMSkge1xuICAgICAgbmV3SW5kZXggPSBjdXJyZW50SW5kZXggKyAxO1xuICAgIH0gZWxzZSB7XG4gICAgICBuZXdJbmRleCA9IDA7IC8vIHN0YXJ0IGZyb20gdGhlIGZpcnN0IGluZGV4XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmltYWdlc1tuZXdJbmRleF07XG4gIH1cblxuICAvKipcbiAgICogUHJpdmF0ZSBtZXRob2QgdG8gZ2V0IHRoZSBwcmV2aW91cyBpbmRleC5cbiAgICogVGhpcyBpcyBuZWNlc3NhcnkgYmVjYXVzZSBhdCBpbmRleCAwLCB3aGVuIHlvdSBjYWxsIHByZXYgYWdhaW4sIHlvdSdsbCBnbyB0byB0aGUgbGFzdCBpbWFnZS5cbiAgICogVGhhdCBoYXBwZW5zIGJlY2F1c2UgYWxsIG1vZGFsIGltYWdlcyBhcmUgc2hvd24gbGlrZSBpbiBhIGNpcmNsZS5cbiAgICovXG4gIHByaXZhdGUgZ2V0UHJldkltYWdlKCk6IEludGVybmFsTGliSW1hZ2Uge1xuICAgIGNvbnN0IGN1cnJlbnRJbmRleDogbnVtYmVyID0gZ2V0SW5kZXgodGhpcy5jdXJyZW50SW1hZ2UsIHRoaXMuaW1hZ2VzKTtcbiAgICBsZXQgbmV3SW5kZXggPSAwO1xuICAgIGlmIChjdXJyZW50SW5kZXggPiAwICYmIGN1cnJlbnRJbmRleCA8PSB0aGlzLmltYWdlcy5sZW5ndGggLSAxfgB7XG4gICAgICBuZXdJbmRleCA9IGN1cnJlbnRJbmRleCAtIDE7XG4gICAgfSBlbHNlIHtcbiAgICAgIG5ld0luZGV4ID0gdGhpcy5pbWFnZXMubGVuZ3RoIC0gMTsgLy8gc3RhcnQgZnJvbSB0aGUgbGFzdCBpbmRleFxuICAgIH1cbiAgICByZXR1cm4gdGhpcy5pbWFnZXNbbmV3SW5kZXhdO1xuICB9XG5cbiAgLyoqXG4gICAqIFByaXZhdGUgbWV0aG9kIHRvIGJ1aWxkIGEgdGV4dCBkZXNjcmlwdGlvbi5cbiAgICogVGhpcyBpcyB1c2VkIGFsc28gdG8gY3JlYXRlIHRpdGxlcy5cbiAgICogQHBhcmFtIEltYWdlIGltYWdlIHRvIGdldCBpdHMgZGVzY3JpcHRpb24uIElmIG5vdCBwcm92aWRlZCBpdCB3aWxsIGJlIHRoZSBjdXJyZW50IGltYWdlLlxuICAgKiBAcGFyYW0gYm9vbGVhbiBpbWFnZVdpdGhvdXREZXNjcmlwdGlvbiBpcyBhIGJvb2xlYW4gdGhhdCBpdCdzIHRydWUgaWYgdGhlIGltYWdlIGhhc24ndCBhICdtb2RhbCcgZGVzY3JpcHRpb24uXG4gICAqIEByZXR1cm5zIFN0cmluZyBkZXNjcmlwdGlvbiBidWlsdCBjb25jYXRlbmF0aW5nIGltYWdlIGZpZWxkcyB3aXRoIGEgc3BlY2lmaWMgbG9naWMuXG4gICAqL1xuICBwcml2YXRlIGJ1aWxkVGV4dERlc2NyaXB0aW9uKGltYWdlOiBJbWFnZSwgaW1hZ2VXaXRob3V0RGVzY3JpcHRpb246IGJvb2xlYW4pOiBzdHJpbmcge1xuICAgIGlmICghdGhpcy5jb25maWdDdXJyZW50SW1hZ2UgfHwgIXRoaXMuY29uZmlnQ3VycmVudEltYWdlLmRlc2NyaXB0aW9ufgB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Rlc2NyaXB0aW9uIGlucHV0IG11c3QgYmUgYSB2YWxpZCBvYmplY3QgaW1wbGVtZW50aW5nIHRoZSBEZXNjcmlwdGlvbiBpbnRlcmZhY2UnKTtcbiAgICB9XG5cbiAgICAvLyBJZiBjdXN0b21GdWxsRGVzY3JpcHRpb24gdXNlIGl0LCBvdGhlcndpc2UgcHJvY2VlZCB0byBidWlsZCBhIGRlc2NyaXB0aW9uXG4gICAgaWYgKHRoaXMuY29uZmlnQ3VycmVudEltYWdlLmRlc2NyaXB0aW9uLmN1c3RvbUZ1bGxEZXNjcmlwdGlvbiAmJiB0aGlzLmNvbmZpZ0N1cnJlbnRJbWFnZS5kZXNjcmlwdGlvbi5jdXN0b21GdWxsRGVzY3JpcHRpb24gIT09ICcnfgB7XG4gICAgICByZXR1cm4gdGhpcy5jb25maWdDdXJyZW50SW1hZ2UuZGVzY3JpcHRpb24uY3VzdG9tRnVsbERlc2NyaXB0aW9uO1xuICAgIH1cblxuICAgIGNvbnN0IGN1cnJlbnRJbmRleDogbnVtYmVyID0gZ2V0SW5kZXgoaW1hZ2UsIHRoaXMuaW1hZ2VzKTtcbiAgICAvLyBJZiB0aGUgY3VycmVudCBpbWFnZSBoYXNuJ3QgYSBkZXNjcmlwdGlvbixcbiAgICAvLyBwcmV2ZW50IHRvIHdyaXRlIHRoZSAnIC0gJyAob3IgdGhpcy5kZXNjcmlwdGlvbi5iZWZvcmVUZXh0RGVzY3JpcHRpb24pXG5cbiAgICBjb25zdCBwcmV2RGVzY3JpcHRpb246IHN0cmluZyA9IHRoaXMuY29uZmlnQ3VycmVudEltYWdlLmRlc2NyaXB0aW9uLmltYWdlVGV4dCA/IHRoaXMuY29uZmlnQ3VycmVudEltYWdlLmRlc2NyaXB0aW9uLmltYWdlVGV4dCA6ICcnO1xuICAgIGNvbnN0IG1pZFNlcGFyYXRvcjogc3RyaW5nID0gdGhpcy5jb25maWdDdXJyZW50SW1hZ2UuZGVzY3JpcHRpb24ubnVtYmVyU2VwYXJhdG9yID8gdGhpcy5jb25maWdDdXJyZW50SW1hZ2UuZGVzY3JpcHRpb24ubnVtYmVyU2VwYXJhdG9yIDogJyc7XG4gICAgY29uc3QgbWlkZGxlRGVzY3JpcHRpb246IHN0cmluZyA9IGN1cnJlbnRJbmRleCArIDEgKyBtaWRTZXBhcmF0b3IgKyB0aGlzLmltYWdlcy5sZW5ndGg7XG5cbiAgICBpZiAoaW1hZ2VXaXRob3V0RGVzY3JpcHRpb24pIHtcbiAgICAgIHJldHVybiBwcmV2RGVzY3JpcHRpb24gKyBtaWRkbGVEZXNjcmlwdGlvbjtcbiAgICB9XG5cbiAgICBjb25zdCBjdXJySW1nRGVzY3JpcHRpb246IHN0cmluZyA9IGltYWdlLm1vZGFsICYmIGltYWdlLm1vZGFsLmRlc2NyaXB0aW9uID8gaW1hZ2UubW9kYWwuZGVzY3JpcHRpb24gOiAnJztcbiAgICBjb25zdCBlbmREZXNjcmlwdGlvbjogc3RyaW5nID0gdGhpcy5jb25maWdDdXJyZW50SW1hZ2UuZGVzY3JpcHRpb24uYmVmb3JlVGV4dERlc2NyaXB0aW9uICsgY3VyckltZ0Rlc2NyaXB0aW9uO1xuICAgIHJldHVybiBwcmV2RGVzY3JpcHRpb24gKyBtaWRkbGVEZXNjcmlwdGlvbiArIGVuZERlc2NyaXB0aW9uO1xuICB9XG5cbiAgLyoqXG4gICAqIFByaXZhdGUgbWV0aG9kIHRvIGNhbGwgaGFuZGxlQm91bmRhcmllcyB3aGVuIG5nT25DaGFuZ2VzIGlzIGNhbGxlZC5cbiAgICovXG4gIHByaXZhdGUgdXBkYXRlSW5kZXhlcygpIHtcbiAgICBsZXQgaW5kZXg6IG51bWJlcjtcbiAgICB0cnkge1xuICAgICAgaW5kZXggPSBnZXRJbmRleCh0aGlzLmN1cnJlbnRJbWFnZSwgdGhpcy5pbWFnZXMpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgY29uc29sZS5lcnJvcignQ2Fubm90IGdldCB0aGUgY3VycmVudCBpbWFnZSBpbmRleCBpbiBjdXJyZW50LWltYWdlJyk7XG4gICAgICB0aHJvdyBlcnI7XG4gICAgfVxuICAgIGlmICh0aGlzLmlzT3Blbikge1xuICAgICAgdGhpcy5oYW5kbGVCb3VuZGFyaWVzKGluZGV4KTtcbiAgICB9XG4gIH1cbn1cbiIsIi8qXG4gVGhlIE1JVCBMaWNlbnNlIChNSVQpXG5cbiBDb3B5cmlnaHQgKGMpIDIwMTctMjAxOCBTdGVmYW5vIENhcHBhIChLczg5KVxuXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIifgIHRvIGRlYWxcbiBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4gdG8gdXNlLCBjb3B5LCBtb2RpZnfgIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG5cbiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBhbGxcbiBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT04gSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRVxuIFNPRlRXQVJFLlxuICovXG5cbmltcG9ydCB7IFNpemUgfSBmcm9tICcuL3NpemUuaW50ZXJmYWNlJztcblxuLyoqXG4gKiBJbnRlcmZhY2UgYFBsYWluR2FsbGVyeUNvbmZpZ2AgdG8gY29uZmlndXJlIHBsYWluLWdhbGxlcnkgZmVhdHVyZXMuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgUGxhaW5HYWxsZXJ5Q29uZmlnIHtcbiAgc3RyYXRlZ3k6IFBsYWluR2FsbGVyeVN0cmF0ZWd5O1xuICBsYXlvdXQ6IFBsYWluR2FsbGVyeUxheW91dDtcbiAgYWR2YW5jZWQ/OiBBZHZhbmNlZENvbmZpZztcbn1cblxuLyoqXG4gKiBJbnRlcmZhY2UgYFBsYWluR2FsbGVyeUxheW91dGAgdG8gY29uZmlndXJlIHRoZSBsYXlvdXQuIFRoaXMgaW50ZXJmYWNlIGlzbid0IHVzZWQgZGlyZWN0bHfgIGluc3RlYWRcbiAqIHJlZmVycyB0byBlaXRoZXIgYExpbmVMYXlvdXRgLCBgR3JpZExheW91dGAgb3IgYEFkdmFuY2VkTGF5b3V0YC5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBQbGFpbkdhbGxlcnlMYXlvdXQge31cblxuLyoqXG4gKiBDbGFzcyBgTGluZUxheW91dGAgdG8gY29uZmlndXJlIGEgbGluZWFyIHBsYWluIGdhbGxlcnkuXG4gKi9cbmV4cG9ydCBjbGFzcyBMaW5lTGF5b3V0IGltcGxlbWVudHMgUGxhaW5HYWxsZXJ5TGF5b3V0IHtcbiAgYnJlYWtDb25maWc6IEJyZWFrQ29uZmlnO1xuICBqdXN0aWZ5OiBzdHJpbmc7XG4gIHNpemU6IFNpemU7XG5cbiAgY29uc3RydWN0b3Ioc2l6ZTogU2l6ZSwgYnJlYWtDb25maWc6IEJyZWFrQ29uZmlnLCBqdXN0aWZ5OiBzdHJpbmcpIHtcbiAgICB0aGlzLnNpemUgPSBzaXplO1xuICAgIHRoaXMuYnJlYWtDb25maWcgPSBicmVha0NvbmZpZztcbiAgICB0aGlzLmp1c3RpZnkgPSBqdXN0aWZ5O1xuICB9XG59XG5cbi8qKlxuICogQ2xhc3MgYEdyaWRMYXlvdXRgIHRvIGNvbmZpZ3VyZSBhIGdyaWQgcGxhaW4gZ2FsbGVyeS5cbiAqL1xuZXhwb3J0IGNsYXNzIEdyaWRMYXlvdXQgaW1wbGVtZW50cyBQbGFpbkdhbGxlcnlMYXlvdXQge1xuICBicmVha0NvbmZpZzogQnJlYWtDb25maWc7XG4gIHNpemU6IFNpemU7XG5cbiAgY29uc3RydWN0b3Ioc2l6ZTogU2l6ZSwgYnJlYWtDb25maWc6IEJyZWFrQ29uZmlnfgB7XG4gICAgdGhpcy5zaXplID0gc2l6ZTtcbiAgICB0aGlzLmJyZWFrQ29uZmlnID0gYnJlYWtDb25maWc7XG4gIH1cbn1cblxuLyoqXG4gKiBDbGFzcyBgQWR2YW5jZWRMYXlvdXRgIHRvIGNvbmZpZ3VyZSBhIGZ1bGx5IGN1c3RvbSBwbGFpbiBnYWxsZXJ5LlxuICovXG5leHBvcnQgY2xhc3MgQWR2YW5jZWRMYXlvdXQgaW1wbGVtZW50cyBQbGFpbkdhbGxlcnlMYXlvdXQge1xuICBtb2RhbE9wZW5lckJ5SW5kZXg6IG51bWJlcjtcbiAgaGlkZURlZmF1bHRQbGFpbkdhbGxlcnk6IGJvb2xlYW47XG5cbiAgY29uc3RydWN0b3IobW9kYWxPcGVuZXJCeUluZGV4OiBudW1iZXIsIGhpZGVEZWZhdWx0UGxhaW5HYWxsZXJ5OiBib29sZWFufgB7XG4gICAgdGhpcy5tb2RhbE9wZW5lckJ5SW5kZXggPSBtb2RhbE9wZW5lckJ5SW5kZXg7XG4gICAgdGhpcy5oaWRlRGVmYXVsdFBsYWluR2FsbGVyeSA9IGhpZGVEZWZhdWx0UGxhaW5HYWxsZXJ5O1xuICB9XG59XG5cbi8qKlxuICogRW51bSBgUGxhaW5HYWxsZXJ5U3RyYXRlZ3lgIHRvIGNob29zZSB0aGUgYmVoYXZpb3VyIG9mIHRoZSBwbGFpbiBnYWxsZXJ5LlxuICovXG5leHBvcnQgZW51bSBQbGFpbkdhbGxlcnlTdHJhdGVneSB7XG4gIC8vIGRvbid0IHVzZSAwIGhlcmVcbiAgLy8gdGhlIGZpcnN0IGluZGV4IGlzIDEgYW5kIGFsbCBvZiB0aGUgZm9sbG93aW5nIG1lbWJlcnMgYXJlIGF1dG8taW5jcmVtZW50ZWQgZnJvbSB0aGF0IHBvaW50IG9uXG4gIFJPVyA9IDEsXG4gIENPTFVNTixcbiAgR1JJRCxcbiAgQ1VTVE9NIC8vIGZ1bGwgY3VzdG9tIHN0cmF0ZWd5XG59XG5cbi8qKlxuICogSW50ZXJmYWNlIGBCcmVha0NvbmZpZ2AgdG8gbGltaXQgdGhlIG51bWJlciBvZiBpdGVtcyBvZiB0aGUgcGxhaW4gZ2FsbGVyeSBvciB0byBmb3JjZSBpdCB0byBmaWxsIG90aGVyIGxpbmVzLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIEJyZWFrQ29uZmlnIHtcbiAgbGVuZ3RoOiBudW1iZXI7XG4gIHdyYXA6IGJvb2xlYW47XG59XG5cbi8qKlxuICogSW50ZXJmYWNlIGBBZHZhbmNlZENvbmZpZ2AgdG8gdXNlIGA8YT5gIHRhZ3MgaW5zdGVhZCBvZiBgPGltZz5gLlxuICogSXQgYWxzbyBjb250YWlucyBhIHN0cmluZyBwcm9wZXJ0eSB0byBjdXN0b21pemUgdGhlIGNzcyBiYWNrZ3JvdW5kIHByb3BlcnR5LlxuICogRm9yIG1vcmUgaW5mbyBjaGVjayBoZXJlIGh0dHBzOi8vd3d3Lnczc2Nob29scy5jb20vY3NzcmVmL2NzczNfcHJfYmFja2dyb3VuZC5hc3BcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBBZHZhbmNlZENvbmZpZyB7XG4gIGFUYWdzOiBib29sZWFuO1xuICBhZGRpdGlvbmFsQmFja2dyb3VuZDogc3RyaW5nO1xufVxuIiwiaW1wb3J0IHsgQWNjZXNzaWJpbGl0eUNvbmZpZyB9IGZyb20gJy4uL21vZGVsL2FjY2Vzc2liaWxpdHkuaW50ZXJmYWNlJztcblxuLyoqXG4gKiBEZWZhdWx0IGFjY2Vzc2liaWxpdHkgY29uZmlndXJhdGlvbi5cbiAqL1xuZXhwb3J0IGNvbnN0IEtTX0RFRkFVTFRfQUNDRVNTSUJJTElUWV9DT05GSUc6IEFjY2Vzc2liaWxpdHlDb25maWcgPSB7XG4gIGJhY2tncm91bmRBcmlhTGFiZWw6ICdNb2RhbCBnYWxsZXJ5IGZ1bGwgc2NyZWVuIGJhY2tncm91bmQnLFxuICBiYWNrZ3JvdW5kVGl0bGU6ICcnLFxuXG4gIHBsYWluR2FsbGVyeUNvbnRlbnRBcmlhTGFiZWw6ICdQbGFpbiBnYWxsZXJ5IGNvbnRlbnQnLFxuICBwbGFpbkdhbGxlcnlDb250ZW50VGl0bGU6ICcnLFxuXG4gIG1vZGFsR2FsbGVyeUNvbnRlbnRBcmlhTGFiZWw6ICdNb2RhbCBnYWxsZXJ5IGNvbnRlbnQnLFxuICBtb2RhbEdhbGxlcnlDb250ZW50VGl0bGU6ICcnLFxuXG4gIGxvYWRpbmdTcGlubmVyQXJpYUxhYmVsOiAnVGhlIGN1cnJlbnQgaW1hZ2UgaXMgbG9hZGluZy4gUGxlYXNlIGJlIHBhdGllbnQuJyxcbiAgbG9hZGluZ1NwaW5uZXJUaXRsZTogJ1RoZSBjdXJyZW50IGltYWdlIGlzIGxvYWRpbmcuIFBsZWFzZSBiZSBwYXRpZW50LicsXG5cbiAgbWFpbkNvbnRhaW5lckFyaWFMYWJlbDogJ0N1cnJlbnQgaW1hZ2UgYW5kIG5hdmlnYXRpb24nLFxuICBtYWluQ29udGFpbmVyVGl0bGU6ICcnLFxuICBtYWluUHJldkltYWdlQXJpYUxhYmVsOiAnUHJldmlvdXMgaW1hZ2UnLFxuICBtYWluUHJldkltYWdlVGl0bGU6ICdQcmV2aW91cyBpbWFnZScsXG4gIG1haW5OZXh0SW1hZ2VBcmlhTGFiZWw6ICdOZXh0IGltYWdlJyxcbiAgbWFpbk5leHRJbWFnZVRpdGxlOiAnTmV4dCBpbWFnZScsXG5cbiAgZG90c0NvbnRhaW5lckFyaWFMYWJlbDogJ0ltYWdlIG5hdmlnYXRpb24gZG90cycsXG4gIGRvdHNDb250YWluZXJUaXRsZTogJycsXG4gIGRvdEFyaWFMYWJlbDogJ05hdmlnYXRlIHRvIGltYWdlIG51bWJlcicsXG5cbiAgcHJldmlld3NDb250YWluZXJBcmlhTGFiZWw6ICdJbWFnZSBwcmV2aWV3cycsXG4gIHByZXZpZXdzQ29udGFpbmVyVGl0bGU6ICcnLFxuICBwcmV2aWV3U2Nyb2xsUHJldkFyaWFMYWJlbDogJ1Njcm9sbCBwcmV2aW91cyBwcmV2aWV3cycsXG4gIHByZXZpZXdTY3JvbGxQcmV2VGl0bGU6ICdTY3JvbGwgcHJldmlvdXMgcHJldmlld3MnLFxuICBwcmV2aWV3U2Nyb2xsTmV4dEFyaWFMYWJlbDogJ1Njcm9sbCBuZXh0IHByZXZpZXdzJyxcbiAgcHJldmlld1Njcm9sbE5leHRUaXRsZTogJ1Njcm9sbCBuZXh0IHByZXZpZXdzJ1xufTtcbiIsIi8qXG4gVGhlIE1JVCBMaWNlbnNlIChNSVQpXG5cbiBDb3B5cmlnaHQgKGMpIDIwMTctMjAxOCBTdGVmYW5vIENhcHBhIChLczg5KVxuXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIifgIHRvIGRlYWxcbiBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4gdG8gdXNlLCBjb3B5LCBtb2RpZnfgIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG5cbiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBhbGxcbiBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT04gSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRVxuIFNPRlRXQVJFLlxuICovXG5cbmltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBFdmVudEVtaXR0ZXIsXG4gIEhvc3RMaXN0ZW5lcixcbiAgSW5qZWN0LFxuICBJbnB1dCxcbiAgT25DaGFuZ2VzLFxuICBPbkRlc3Ryb3fgXG4gIE9uSW5pdCxcbiAgT3V0cHV0LFxuICBQTEFURk9STV9JRCxcbiAgU2ltcGxlQ2hhbmdlLFxuICBTaW1wbGVDaGFuZ2VzLFxuICBWaWV3Q2hpbGRcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBpc1BsYXRmb3JtQnJvd3NlciwgaXNQbGF0Zm9ybVNlcnZlciB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbmltcG9ydCB7IEJ1dHRvbkV2ZW50LCBCdXR0b25zQ29uZmlnIH0gZnJvbSAnLi4vLi4vbW9kZWwvYnV0dG9ucy1jb25maWcuaW50ZXJmYWNlJztcbmltcG9ydCB7IEltYWdlLCBJbWFnZU1vZGFsRXZlbnQgfSBmcm9tICcuLi8uLi9tb2RlbC9pbWFnZS5jbGFzcyc7XG5pbXBvcnQgeyBBY3Rpb24gfSBmcm9tICcuLi8uLi9tb2RlbC9hY3Rpb24uZW51bSc7XG5pbXBvcnQgeyBLZXlib2FyZENvbmZpZyB9IGZyb20gJy4uLy4uL21vZGVsL2tleWJvYXJkLWNvbmZpZy5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgUHJldmlld0NvbmZpZyB9IGZyb20gJy4uLy4uL21vZGVsL3ByZXZpZXctY29uZmlnLmludGVyZmFjZSc7XG5pbXBvcnQgeyBTbGlkZUNvbmZpZyB9IGZyb20gJy4uLy4uL21vZGVsL3NsaWRlLWNvbmZpZy5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgQWNjZXNzaWJpbGl0eUNvbmZpZyB9IGZyb20gJy4uLy4uL21vZGVsL2FjY2Vzc2liaWxpdHkuaW50ZXJmYWNlJztcbmltcG9ydCB7IEtleWJvYXJkU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2tleWJvYXJkLnNlcnZpY2UnO1xuaW1wb3J0IHsgR2FsbGVyeVNlcnZpY2UsIEludGVybmFsR2FsbGVyeVBheWxvYWQgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9nYWxsZXJ5LnNlcnZpY2UnO1xuaW1wb3J0IHsgRG90c0NvbmZpZyB9IGZyb20gJy4uLy4uL21vZGVsL2RvdHMtY29uZmlnLmludGVyZmFjZSc7XG5pbXBvcnQgeyBDdXJyZW50SW1hZ2VDb21wb25lbnQsIEltYWdlTG9hZEV2ZW50IH0gZnJvbSAnLi4vY3VycmVudC1pbWFnZS9jdXJyZW50LWltYWdlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBJbnRlcm5hbExpYkltYWdlIH0gZnJvbSAnLi4vLi4vbW9kZWwvaW1hZ2UtaW50ZXJuYWwuY2xhc3MnO1xuaW1wb3J0IHsgQWR2YW5jZWRMYXlvdXQsIFBsYWluR2FsbGVyeUNvbmZpZyB9IGZyb20gJy4uLy4uL21vZGVsL3BsYWluLWdhbGxlcnktY29uZmlnLmludGVyZmFjZSc7XG5pbXBvcnQgeyBLU19ERUZBVUxUX0FDQ0VTU0lCSUxJVFlfQ09ORklHIH0gZnJvbSAnLi4vYWNjZXNzaWJpbGl0eS1kZWZhdWx0JztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMvU3Vic2NyaXB0aW9uJztcbmltcG9ydCB7IEN1cnJlbnRJbWFnZUNvbmZpZyB9IGZyb20gJy4uLy4uL21vZGVsL2N1cnJlbnQtaW1hZ2UtY29uZmlnLmludGVyZmFjZSc7XG5pbXBvcnQgeyBnZXRJbmRleCB9IGZyb20gJy4uLy4uL3V0aWxzL2ltYWdlLnV0aWwnO1xuXG4vKipcbiAqIE1haW4gQ29tcG9uZW50IG9mIHRoaXMgbGlicmFyeSB3aXRoIGJvdGggdGhlIHBsYWluIGFuZCBtb2RhbCBnYWxsZXJpZXMuXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2tzLW1vZGFsLWdhbGxlcnknLFxuICBleHBvcnRBczogJ2tzTW9kYWxHYWxsZXJ5JyxcbiAgc3R5bGVVcmxzOiBbJ21vZGFsLWdhbGxlcnkuc2NzcyddLFxuICB0ZW1wbGF0ZVVybDogJ21vZGFsLWdhbGxlcnkuaHRtbCcsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIE1vZGFsR2FsbGVyeUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95LCBPbkNoYW5nZXMge1xuICAvKipcbiAgICogVW5pcXVlIGlkICg+PTApIG9mIHRoZSBjdXJyZW50IGluc3RhbmNlIG9mIHRoaXMgbGlicmFyeS4gVGhpcyBpcyB1c2VmdWwgd2hlbiB5b3UgYXJlIHVzaW5nXG4gICAqIHRoZSBzZXJ2aWNlIHRvIGNhbGwgbW9kYWwgZ2FsbGVyeSB3aXRob3V0IG9wZW4gaXQgbWFudWFsbHkuXG4gICAqIFJpZ2h0IG5vdyBpcyBvcHRpb25hbCwgYnV0IGluIHVwY29taW5nIG1ham9yIHJlbGVhc2VzIHdpbGwgYmUgbWFuZGF0b3J5ISEhXG4gICAqL1xuICBASW5wdXQoKVxuICBpZDogbnVtYmVyO1xuICAvKipcbiAgICogQXJyYXkgb2YgYEltYWdlYCB0aGF0IHJlcHJlc2VudCB0aGUgbW9kZWwgb2YgdGhpcyBsaWJyYXJ5IHdpdGggYWxsIGltYWdlcywgdGh1bWJzIGFuZCBzbyBvbi5cbiAgICovXG4gIEBJbnB1dCgpXG4gIG1vZGFsSW1hZ2VzOiBJbWFnZVtdO1xuICAvKipcbiAgICogT2JqZWN0IG9mIHR5cGUgYEJ1dHRvbnNDb25maWdgIHRvIHNob3cvaGlkZSBidXR0b25zLlxuICAgKi9cbiAgQElucHV0KClcbiAgYnV0dG9uc0NvbmZpZzogQnV0dG9uc0NvbmZpZztcbiAgLyoqXG4gICAqIEJvb2xlYW4gdG8gZW5hYmxlIG1vZGFsLWdhbGxlcnkgY2xvc2UgYmVoYXZpb3VyIHdoZW4gY2xpY2tpbmdcbiAgICogb24gdGhlIHNlbWktdHJhbnNwYXJlbnQgYmFja2dyb3VuZC4gRW5hYmxlZCBieSBkZWZhdWx0LlxuICAgKi9cbiAgQElucHV0KClcbiAgZW5hYmxlQ2xvc2VPdXRzaWRlID0gdHJ1ZTtcbiAgLyoqXG4gICAqIEludGVyZmFjZSB0byBjb25maWd1cmUgY3VycmVudCBpbWFnZSBpbiBtb2RhbC1nYWxsZXJ5LlxuICAgKiBGb3IgaW5zdGFuY2UgeW91IGNhbiBkaXNhYmxlIG5hdmlnYXRpb24gb24gY2xpY2sgb24gY3VycmVudCBpbWFnZSAoZW5hYmxlZCBieSBkZWZhdWx0fg5cbiAgICovXG4gIEBJbnB1dCgpXG4gIGN1cnJlbnRJbWFnZUNvbmZpZzogQ3VycmVudEltYWdlQ29uZmlnO1xuICAvKipcbiAgICogT2JqZWN0IG9mIHR5cGUgYERvdHNDb25maWdgIHRvIGluaXQgRG90c0NvbXBvbmVudCdzIGZlYXR1cmVzLlxuICAgKiBGb3IgaW5zdGFuY2UsIGl0IGNvbnRhaW5zIGEgcGFyYW0gdG8gc2hvdy9oaWRlIGRvdHMuXG4gICAqL1xuICBASW5wdXQoKVxuICBkb3RzQ29uZmlnOiBEb3RzQ29uZmlnO1xuICAvKipcbiAgICogT2JqZWN0IG9mIHR5cGUgYFByZXZpZXdDb25maWdgIHRvIGluaXQgUHJldmlld3NDb21wb25lbnQncyBmZWF0dXJlcy5cbiAgICogRm9yIGluc3RhbmNlLCBpdCBjb250YWlucyBhIHBhcmFtIHRvIHNob3cvaGlkZSBwcmV2aWV3cy5cbiAgICovXG4gIEBJbnB1dCgpXG4gIHByZXZpZXdDb25maWc6IFByZXZpZXdDb25maWc7XG4gIC8qKlxuICAgKiBPYmplY3Qgb2YgdHlwZSBgU2xpZGVDb25maWdgIHRvIGluaXQgc2lkZSBwcmV2aWV3cyBhbmQgYGluZmluaXRlIHNsaWRpbmdgLlxuICAgKi9cbiAgQElucHV0KClcbiAgc2xpZGVDb25maWc6IFNsaWRlQ29uZmlnID0ge1xuICAgIGluZmluaXRlOiBmYWxzZSxcbiAgICBzaWRlUHJldmlld3M6IHsgc2hvdzogdHJ1ZSwgc2l6ZTogeyB3aWR0aDogJzEwMHB4JywgaGVpZ2h0OiAnYXV0bycgfSB9XG4gIH07XG4gIC8qKlxuICAgKiBPYmplY3Qgb2YgdHlwZSBgQWNjZXNzaWJpbGl0eUNvbmZpZ2AgdG8gaW5pdCBjdXN0b20gYWNjZXNzaWJpbGl0eSBmZWF0dXJlcy5cbiAgICogRm9yIGluc3RhbmNlLCBpdCBjb250YWlucyB0aXRsZXMsIGFsdCB0ZXh0cywgYXJpYS1sYWJlbHMgYW5kIHNvIG9uLlxuICAgKi9cbiAgQElucHV0KClcbiAgYWNjZXNzaWJpbGl0eUNvbmZpZzogQWNjZXNzaWJpbGl0eUNvbmZpZyA9IEtTX0RFRkFVTFRfQUNDRVNTSUJJTElUWV9DT05GSUc7XG4gIC8qKlxuICAgKiBPYmplY3Qgb2YgdHlwZSBgS2V5Ym9hcmRDb25maWdgIHRvIGFzc2lnbiBjdXN0b20ga2V5cyB0byBFU0MsIFJJR0hUIGFuZCBMRUZUIGtleWJvYXJkJ3MgYWN0aW9ucy5cbiAgICovXG4gIEBJbnB1dCgpXG4gIGtleWJvYXJkQ29uZmlnOiBLZXlib2FyZENvbmZpZztcbiAgLyoqXG4gICAqIE9iamVjdCBvZiB0eXBlIGBQbGFpbkdhbGxlcnlDb25maWdgIHRvIGNvbmZpZ3VyZSB0aGUgcGxhaW4gZ2FsbGVyeS5cbiAgICovXG4gIEBJbnB1dCgpXG4gIHBsYWluR2FsbGVyeUNvbmZpZzogUGxhaW5HYWxsZXJ5Q29uZmlnO1xuXG4gIC8qKlxuICAgKiBPdXRwdXQgdG8gZW1pdCBhbiBldmVudCB3aGVuIHRoZSBtb2RhbCBnYWxsZXJ5IGlzIGNsb3NlZC5cbiAgICovXG4gIEBPdXRwdXQoKVxuICBjbG9zZTogRXZlbnRFbWl0dGVyPEltYWdlTW9kYWxFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPEltYWdlTW9kYWxFdmVudD4oKTtcbiAgLyoqXG4gICAqIE91dHB1dCB0byBlbWl0IGFuIGV2ZW50IHdoZW4gYW4gaW1hZ2UgaXMgY2hhbmdlZC5cbiAgICovXG4gIEBPdXRwdXQoKVxuICBzaG93OiBFdmVudEVtaXR0ZXI8SW1hZ2VNb2RhbEV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8SW1hZ2VNb2RhbEV2ZW50PigpO1xuICAvKipcbiAgICogT3V0cHV0IHRvIGVtaXQgYW4gZXZlbnQgd2hlbiB0aGUgY3VycmVudCBpbWFnZSBpcyB0aGUgZmlyc3Qgb25lLlxuICAgKi9cbiAgQE91dHB1dCgpXG4gIGZpcnN0SW1hZ2U6IEV2ZW50RW1pdHRlcjxJbWFnZU1vZGFsRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxJbWFnZU1vZGFsRXZlbnQ+KCk7XG4gIC8qKlxuICAgKiBPdXRwdXQgdG8gZW1pdCBhbiBldmVudCB3aGVuIHRoZSBjdXJyZW50IGltYWdlIGlzIHRoZSBsYXN0IG9uZS5cbiAgICovXG4gIEBPdXRwdXQoKVxuICBsYXN0SW1hZ2U6IEV2ZW50RW1pdHRlcjxJbWFnZU1vZGFsRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxJbWFnZU1vZGFsRXZlbnQ+KCk7XG4gIC8qKlxuICAgKiBPdXRwdXQgdG8gZW1pdCBhbiBldmVudCB3aGVuIHRoZSBtb2RhbCBnYWxsZXJ5IGlzIGNsb3NlZC5cbiAgICovXG4gIEBPdXRwdXQoKVxuICBoYXNEYXRhOiBFdmVudEVtaXR0ZXI8SW1hZ2VNb2RhbEV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8SW1hZ2VNb2RhbEV2ZW50PigpO1xuICAvKipcbiAgICogT3V0cHV0IHRvIGVtaXQgYW4gZXZlbnQgd2hlbiBhIGJ1dHRvbiBpcyBjbGlja2VkLCBidXQgYmVmb3JlIHRoYXQgdGhlIGFjdGlvbiBpcyB0cmlnZ2VyZWQuXG4gICAqL1xuICBAT3V0cHV0KClcbiAgYnV0dG9uQmVmb3JlSG9vazogRXZlbnRFbWl0dGVyPEJ1dHRvbkV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8QnV0dG9uRXZlbnQ+KCk7XG4gIC8qKlxuICAgKiBPdXRwdXQgdG8gZW1pdCBhbiBldmVudCB3aGVuIGEgYnV0dG9uIGlzIGNsaWNrZWQsIGJ1dCBhZnRlciB0aGF0IHRoZSBhY3Rpb24gaXMgdHJpZ2dlcmVkLlxuICAgKi9cbiAgQE91dHB1dCgpXG4gIGJ1dHRvbkFmdGVySG9vazogRXZlbnRFbWl0dGVyPEJ1dHRvbkV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8QnV0dG9uRXZlbnQ+KCk7XG5cbiAgLyoqXG4gICAqIFJlZmVyZW5jZSB0byB0aGUgQ3VycmVudEltYWdlQ29tcG9uZW50IHRvIGludm9rZSBtZXRob2RzIG9uIGl0LlxuICAgKi9cbiAgQFZpZXdDaGlsZChDdXJyZW50SW1hZ2VDb21wb25lbnQpXG4gIGN1cnJlbnRJbWFnZUNvbXBvbmVudDtcblxuICAvKipcbiAgICogQm9vbGVhbiB0aGF0IGl0IGlzIHRydWUgaWYgdGhlIG1vZGFsIGdhbGxlcnkgaXMgdmlzaWJsZS4gRmFsc2UgYnkgZGVmYXVsdC5cbiAgICovXG4gIG9wZW5lZCA9IGZhbHNlO1xuICAvKipcbiAgICogQm9vbGVhbiB0byBvcGVuIHRoZSBtb2RhbCBnYWxsZXJ5LiBGYWxzZSBieSBkZWZhdWx0LlxuICAgKi9cbiAgc2hvd0dhbGxlcnkgPSBmYWxzZTtcbiAgLyoqXG4gICAqIEFycmF5IG9mIGBJbnRlcm5hbExpYkltYWdlYCByZXByZXNlbnRpbmcgdGhlIG1vZGVsIG9mIHRoaXMgbGlicmFyeSB3aXRoIGFsbCBpbWFnZXMsIHRodW1icyBhbmQgc28gb24uXG4gICAqL1xuICBpbWFnZXM6IEludGVybmFsTGliSW1hZ2VbXTtcbiAgLyoqXG4gICAqIGBJbWFnZWAgdGhhdCBpcyB2aXNpYmxlIHJpZ2h0IG5vdy5cbiAgICovXG4gIGN1cnJlbnRJbWFnZTogSW50ZXJuYWxMaWJJbWFnZTtcblxuICBwcml2YXRlIGdhbGxlcnlTZXJ2aWNlTmF2aWdhdGVTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcbiAgcHJpdmF0ZSBnYWxsZXJ5U2VydmljZUNsb3NlU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG4gIHByaXZhdGUgZ2FsbGVyeVNlcnZpY2VVcGRhdGVTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICAvKipcbiAgICogSG9zdExpc3RlbmVyIHRvIGNhdGNoIGJyb3dzZXIncyBiYWNrIGJ1dHRvbiBhbmQgZGVzdHJveSB0aGUgZ2FsbGVyeS5cbiAgICogVGhpcyBwcmV2ZW50cyB3ZWlyZWQgYmVoYXZpb3VyIGFib3V0IHNjcm9sbGluZy5cbiAgICogQWRkZWQgdG8gZml4IHRoaXMgaXNzdWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9Lczg5L2FuZ3VsYXItbW9kYWwtZ2FsbGVyeS9pc3N1ZXMvMTU5XG4gICAqL1xuICBASG9zdExpc3RlbmVyKCd3aW5kb3c6cG9wc3RhdGUnLCBbJyRldmVudCddKVxuICBvblBvcFN0YXRlKGU6IEV2ZW50fgB7XG4gICAgdGhpcy5jbG9zZUdhbGxlcnkoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb25zdHJ1Y3RvciB3aXRoIHRoZSBpbmplY3Rpb24gb2Ygw4LCtEtleWJvYXJkU2VydmljZcOCwrQgYW5kIGFuIG9iamVjdCB0byBzdXBwb3J0IFNlcnZlci1TaWRlIFJlbmRlcmluZy5cbiAgICovXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUga2V5Ym9hcmRTZXJ2aWNlOiBLZXlib2FyZFNlcnZpY2UsXG4gICAgcHJpdmF0ZSBnYWxsZXJ5U2VydmljZTogR2FsbGVyeVNlcnZpY2UsXG4gICAgQEluamVjdChQTEFURk9STV9JRCkgcHJpdmF0ZSBwbGF0Zm9ybUlkOiBPYmplY3QsXG4gICAgcHJpdmF0ZSBjaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWZcbiAgfgB7fVxuXG4gIC8qKlxuICAgKiBNZXRob2Qgw4LCtG5nT25Jbml0w4LCtCB0byBpbml0IGltYWdlcyBjYWxsaW5nIGBpbml0SW1hZ2VzKClgLlxuICAgKiBUaGlzIGlzIGFuIEFuZ3VsYXIncyBsaWZlY3ljbGUgaG9vaywgc28gaXRzIGNhbGxlZCBhdXRvbWF0aWNhbGx5IGJ5IEFuZ3VsYXIgaXRzZWxmLlxuICAgKiBJbiBwYXJ0aWN1bGFyLCBpdCdzIGNhbGxlZCBvbmx5IG9uZSB0aW1lISEhXG4gICAqL1xuICBuZ09uSW5pdCgpIHtcbiAgICAvLyBpZCBpcyBhIG1hbmRhdG9yeSBpbnB1dCBhbmQgbXVzdCBhIG51bWJlciA+IDBcbiAgICBpZiAoKCF0aGlzLmlkICYmIHRoaXMuaWQgIT09IDApIHx8IHRoaXMuaWQgPCAwfgB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgIGAnW2lkXT1cImEgbnVtYmVyID49IDBcIicgaXMgYSBtYW5kYXRvcnkgaW5wdXQgZnJvbSA2LjAuMCBpbiBhbmd1bGFyLW1vZGFsLWdhbGxlcnkuYCArXG4gICAgICAgICAgYElmIHlvdSBhcmUgdXNpbmcgbXVsdGlwbGUgaW5zdGFuY2VzIG9mIHRoaXMgbGlicmFyeSwgcGxlYXNlIGJlIHN1cmUgdG8gdXNlIGRpZmZlcmVudCBpZHNgXG4gICAgICApO1xuICAgIH1cblxuICAgIC8vIGNhbGwgaW5pdEltYWdlcyB0byBpbml0IGltYWdlcyBhbmQgdG8gZW1pdCBgaGFzRGF0YWAgZXZlbnRcbiAgICB0aGlzLmluaXRJbWFnZXMoKTtcblxuICAgIHRoaXMuZ2FsbGVyeVNlcnZpY2VOYXZpZ2F0ZVN1YnNjcmlwdGlvbiA9IHRoaXMuZ2FsbGVyeVNlcnZpY2UubmF2aWdhdGUuc3Vic2NyaWJlKChwYXlsb2FkOiBJbnRlcm5hbEdhbGxlcnlQYXlsb2FkfgA9PiB7XG4gICAgICBpZiAoIXBheWxvYWQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgLy8gaWYgZ2FsbGVyeUlkIGlzIG5vdCB2YWxpZCBPUiBnYWxsZXJ5SWQgaXMgcmVsYXRlZCB0byBhbm90aGVyIGluc3RhbmNlIGFuZCBub3QgdGhpcyBvbmVcbiAgICAgIGlmIChwYXlsb2FkLmdhbGxlcnlJZCA9PT0gdW5kZWZpbmVkIHx8IHBheWxvYWQuZ2FsbGVyeUlkIDwgMCB8fCBwYXlsb2FkLmdhbGxlcnlJZCAhPT0gdGhpcy5pZCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICAvLyBpZiBpbWFnZSBpbmRleCBpcyBub3QgdmFsaWRcbiAgICAgIGlmIChwYXlsb2FkLmluZGV4IDwgMCB8fCBwYXlsb2FkLmluZGV4ID4gdGhpcy5pbWFnZXMubGVuZ3RofgB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHRoaXMuc2hvd01vZGFsR2FsbGVyeShwYXlsb2FkLmluZGV4LCB0cnVlKTtcbiAgICB9KTtcblxuICAgIHRoaXMuZ2FsbGVyeVNlcnZpY2VDbG9zZVN1YnNjcmlwdGlvbiA9IHRoaXMuZ2FsbGVyeVNlcnZpY2UuY2xvc2Uuc3Vic2NyaWJlKChnYWxsZXJ5SWQ6IG51bWJlcikgPT4ge1xuICAgICAgaWYgKGdhbGxlcnlJZCA8IDAgfHwgdGhpcy5pZCAhPT0gZ2FsbGVyeUlkfgB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHRoaXMuY2xvc2VHYWxsZXJ5KEFjdGlvbi5OT1JNQUwsIHRydWUpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5nYWxsZXJ5U2VydmljZVVwZGF0ZVN1YnNjcmlwdGlvbiA9IHRoaXMuZ2FsbGVyeVNlcnZpY2UudXBkYXRlLnN1YnNjcmliZSgocGF5bG9hZDogSW50ZXJuYWxHYWxsZXJ5UGF5bG9hZCkgPT4ge1xuICAgICAgaWYgKCFwYXlsb2FkfgB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIC8vIGlmIGdhbGxlcnlJZCBpcyBub3QgdmFsaWQgT1IgZ2FsbGVyeUlkIGlzIHJlbGF0ZWQgdG8gYW5vdGhlciBpbnN0YW5jZSBhbmQgbm90IHRoaXMgb25lXG4gICAgICBpZiAocGF5bG9hZC5nYWxsZXJ5SWQgPT09IHVuZGVmaW5lZCB8fCBwYXlsb2FkLmdhbGxlcnlJZCA8IDAgfHwgcGF5bG9hZC5nYWxsZXJ5SWQgIT09IHRoaXMuaWQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgLy8gaWYgZWl0aGVyIGltYWdlIGluZGV4IG9yIGltYWdlIGFyZSBub3QgdmFsaWRcbiAgICAgIGlmIChwYXlsb2FkLmluZGV4IDwgMCB8fCBwYXlsb2FkLmluZGV4ID4gdGhpcy5pbWFnZXMubGVuZ3RoIHx8ICFwYXlsb2FkLmltYWdlfgB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGN1cnJlbnRJbmRleDogbnVtYmVyID0gZ2V0SW5kZXgocGF5bG9hZC5pbWFnZSwgdGhpcy5pbWFnZXMpO1xuICAgICAgdGhpcy5pbWFnZXMgPSB0aGlzLmltYWdlcy5tYXAoKGltYWdlOiBJbnRlcm5hbExpYkltYWdlLCBpbmRleDogbnVtYmVyfgA9PiB7XG4gICAgICAgIGlmIChpbmRleCA9PT0gcGF5bG9hZC5pbmRleCkge1xuICAgICAgICAgIHJldHVybiA8SW50ZXJuYWxMaWJJbWFnZT5wYXlsb2FkLmltYWdlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBpbWFnZTtcbiAgICAgIH0pO1xuICAgICAgaWYgKGN1cnJlbnRJbmRleCA9PT0gcGF5bG9hZC5pbmRleCnDgsKge1xuICAgICAgICB0aGlzLmN1cnJlbnRJbWFnZSA9IHRoaXMuaW1hZ2VzW3BheWxvYWQuaW5kZXhdO1xuICAgICAgfVxuICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBNZXRob2Qgw4LCtG5nT25DaGFuZ2Vzw4LCtCB0byByZS1pbml0IGltYWdlcyBpZiBpbnB1dCBpcyBjaGFuZ2VkLlxuICAgKiBUaGlzIGlzIGFuIEFuZ3VsYXIncyBsaWZlY3ljbGUgaG9vaywgc28gaXRzIGNhbGxlZCBhdXRvbWF0aWNhbGx5IGJ5IEFuZ3VsYXIgaXRzZWxmLlxuICAgKiBJbiBwYXJ0aWN1bGFyLCBpdCdzIGNhbGxlZCBiZWZvcmUgYG5nT25Jbml0KClgIGFuZCB3aGVuZXZlciBvbmUgb3IgbW9yZSBkYXRhLWJvdW5kIGlucHV0IHByb3BlcnRpZXMgY2hhbmdlLlxuICAgKiBAcGFyYW0gY2hhbmdlcyBgU2ltcGxlQ2hhbmdlc2Agb2JqZWN0IG9mIGN1cnJlbnQgYW5kIHByZXZpb3VzIHByb3BlcnR5IHZhbHVlcyBwcm92aWRlZCBieSBBbmd1bGFyLlxuICAgKi9cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIGNvbnN0IGltYWdlc0NoYW5nZTogU2ltcGxlQ2hhbmdlID0gY2hhbmdlcy5tb2RhbEltYWdlcztcbiAgICBjb25zdCBwbGFpbkdhbGxlcnlDb25maWdDaGFuZ2U6IFNpbXBsZUNoYW5nZSA9IGNoYW5nZXMucGxhaW5HYWxsZXJ5Q29uZmlnO1xuXG4gICAgaWYgKGltYWdlc0NoYW5nZSAmJiAhaW1hZ2VzQ2hhbmdlLmZpcnN0Q2hhbmdlICYmIGltYWdlc0NoYW5nZS5wcmV2aW91c1ZhbHVlICE9PSBpbWFnZXNDaGFuZ2UuY3VycmVudFZhbHVlfgB7XG4gICAgICB0aGlzLmluaXRJbWFnZXMoKTtcbiAgICB9XG5cbiAgICBpZiAocGxhaW5HYWxsZXJ5Q29uZmlnQ2hhbmdlfgB7XG4gICAgICAvLyBjb25zdCBwcmV2UGxhaW5HYWxsZXJ5Q29uZmlnQ2hhbmdlOiBhbnkgPSBwbGFpbkdhbGxlcnlDb25maWdDaGFuZ2UucHJldmlvdXNWYWx1ZTtcbiAgICAgIGNvbnN0IGN1cnJQbGFpbkdhbGxlcnlDb25maWdDaGFuZ2U6IFBsYWluR2FsbGVyeUNvbmZpZyA9IHBsYWluR2FsbGVyeUNvbmZpZ0NoYW5nZS5jdXJyZW50VmFsdWU7XG4gICAgICBpZiAoXG4gICAgICAgIGN1cnJQbGFpbkdhbGxlcnlDb25maWdDaGFuZ2UubGF5b3V0ICYmXG4gICAgICAgIGN1cnJQbGFpbkdhbGxlcnlDb25maWdDaGFuZ2UubGF5b3V0IGluc3RhbmNlb2YgQWR2YW5jZWRMYXlvdXQgJiZcbiAgICAgICAgY3VyclBsYWluR2FsbGVyeUNvbmZpZ0NoYW5nZS5sYXlvdXQubW9kYWxPcGVuZXJCeUluZGV4ICE9PSAtMVxuICAgICAgfgB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdvcGVuaW5nIG1vZGFsIGdhbGxlcnkgZnJvbSBjdXN0b20gcGxhaW4gZ2FsbGVyeSwgaW5kZXg6ICcsIGN1cnJQbGFpbkdhbGxlcnlDb25maWdDaGFuZ2UpO1xuICAgICAgICB0aGlzLnNob3dNb2RhbEdhbGxlcnkoY3VyclBsYWluR2FsbGVyeUNvbmZpZ0NoYW5nZS5sYXlvdXQubW9kYWxPcGVuZXJCeUluZGV4KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogTWV0aG9kIGNhbGxlZCBieSBjdXN0b20gdXBwZXIgYnV0dG9ucy5cbiAgICogQHBhcmFtIEJ1dHRvbkV2ZW50IGV2ZW50IHBheWxvYWRcbiAgICovXG4gIG9uQ3VzdG9tRW1pdChldmVudDogQnV0dG9uRXZlbnQpIHtcbiAgICBjb25zdCBldmVudFRvRW1pdDogQnV0dG9uRXZlbnQgPSB0aGlzLmdldEJ1dHRvbkV2ZW50VG9FbWl0KGV2ZW50KTtcbiAgICB0aGlzLmJ1dHRvbkJlZm9yZUhvb2suZW1pdChldmVudFRvRW1pdCk7XG4gICAgLy8gY29uc29sZS5sb2coJ29uIG9uQ3VzdG9tRW1pdCcsIGV2ZW50VG9FbWl0KTtcbiAgICB0aGlzLmJ1dHRvbkFmdGVySG9vay5lbWl0KGV2ZW50VG9FbWl0KTtcbiAgfVxuXG4gIC8vIFRPRE8gaW1wbGVtZW50IG9uIHJlZnJlc2hcbiAgLy8gLyoqXG4gIC8vICAqIE1ldGhvZCBjYWxsZWQgYnkgdGhlIHJlZnJlc2ggdXBwZXIgYnV0dG9uLlxuICAvLyAgKiBTVElMTCBOT1QgSU1QTEVNRU5URUQsIFNPIERPTidUIFVTRSBJVFxuICAvLyAgKiBAcGFyYW0gQnV0dG9uRXZlbnQgZXZlbnQgcGF5bG9hZFxuICAvLyAgKi9cbiAgLy8gb25SZWZyZXNoKGV2ZW50OiBCdXR0b25FdmVudCkge1xuICAvLyAgIGNvbnN0IGV2ZW50VG9FbWl0OiBCdXR0b25FdmVudCA9IHRoaXMuZ2V0QnV0dG9uRXZlbnRUb0VtaXQoZXZlbnQpO1xuICAvL1xuICAvLyAgIHRoaXMuYnV0dG9uQmVmb3JlSG9vay5lbWl0KGV2ZW50VG9FbWl0KTtcbiAgLy8gICAvLyBjb25zb2xlLmxvZygnVE9ETyBpbXBsZW1lbnQgb24gcmVmcmVzaCBpbnNpZGUgdGhlIGxpYnJhcnknLCBldmVudFRvRW1pdCk7XG4gIC8vXG4gIC8vICAgdGhpcy5jdXJyZW50SW1hZ2UgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLmN1cnJlbnRJbWFnZSwgeyBwcmV2aW91c2x5TG9hZGVkOiBmYWxzZSB9KTtcbiAgLy9cbiAgLy8gICAvLyBUT0RPIGFkZCBsb2dpYyB0byBoaWRlIGFuZCBzaG93IHRoZSBjdXJyZW50IGltYWdlXG4gIC8vXG4gIC8vICAgLy8gY29uc29sZS5sb2coJ29uUmVmcmVzaCcsIHRoaXMuY3VycmVudEltYWdlKTtcbiAgLy9cbiAgLy8gICAvLyBjb25zdCBpbmRleE51bTogbnVtYmVyID0gdGhpcy5jdXJyZW50SW1hZ2VDb21wb25lbnQuZ2V0SW5kZXgoKTtcbiAgLy9cbiAgLy8gICAvLyB0aGlzLmltYWdlcyA9IHRoaXMuaW1hZ2VzLm1hcCgodmFsOiBJbnRlcm5hbExpYkltYWdlLCBpbmRleDogbnVtYmVyfgA9PiB7XG4gIC8vICAgLy8gICBpZiAoaW5kZXggIT09IDIpIHtcbiAgLy8gICAvLyAgICAgcmV0dXJuIHZhbDtcbiAgLy8gICAvLyAgIH0gZWxzZSB7XG4gIC8vICAgLy8gICAgIGNvbnN0IGltZzogSW50ZXJuYWxMaWJJbWFnZSA9IE9iamVjdC5hc3NpZ24oe30sIHZhbCwge3ByZXZpb3VzbHlMb2FkZWQ6IGZhbHNlfSk7XG4gIC8vICAgLy8gICAgIHJldHVybiBpbWc7XG4gIC8vICAgLy8gICB9XG4gIC8vICAgLy8gfSk7XG4gIC8vICAgLy9cbiAgLy8gICAvLyB0aGlzLmNsb3NlR2FsbGVyeSgpO1xuICAvLyAgIC8vIHRoaXMuc2hvd01vZGFsR2FsbGVyeSgyKTtcbiAgLy9cbiAgLy8gICB0aGlzLmJ1dHRvbkFmdGVySG9vay5lbWl0KGV2ZW50VG9FbWl0KTtcbiAgLy8gfVxuXG4gIC8qKlxuICAgKiBNZXRob2QgY2FsbGVkIGJ5IHRoZSBmdWxsLXNjcmVlbiB1cHBlciBidXR0b24uXG4gICAqIEBwYXJhbSBCdXR0b25FdmVudCBldmVudCBwYXlsb2FkXG4gICAqL1xuICBvbkZ1bGxTY3JlZW4oZXZlbnQ6IEJ1dHRvbkV2ZW50fgB7XG4gICAgY29uc3QgZXZlbnRUb0VtaXQ6IEJ1dHRvbkV2ZW50ID0gdGhpcy5nZXRCdXR0b25FdmVudFRvRW1pdChldmVudCk7XG4gICAgdGhpcy5idXR0b25CZWZvcmVIb29rLmVtaXQoZXZlbnRUb0VtaXQpO1xuXG4gICAgY29uc3QgZG9jOiBhbnkgPSA8YW55PmRvY3VtZW50O1xuICAgIGNvbnN0IGRvY0VsOiBhbnkgPSA8YW55PmRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcblxuICAgIGNvbnN0IGZ1bGxzY3JlZW5EaXNhYmxlZDogYm9vbGVhbiA9ICFkb2MuZnVsbHNjcmVlbkVsZW1lbnQgJiYgIWRvYy53ZWJraXRGdWxsc2NyZWVuRWxlbWVudCAmJiAhZG9jLm1vekZ1bGxTY3JlZW5FbGVtZW50ICYmICFkb2MubXNGdWxsc2NyZWVuRWxlbWVudDtcblxuICAgIGlmIChmdWxsc2NyZWVuRGlzYWJsZWQpIHtcbiAgICAgIGlmIChkb2NFbC5yZXF1ZXN0RnVsbHNjcmVlbikge1xuICAgICAgICBkb2NFbC5yZXF1ZXN0RnVsbHNjcmVlbigpO1xuICAgICAgfSBlbHNlIGlmIChkb2NFbC53ZWJraXRSZXF1ZXN0RnVsbHNjcmVlbikge1xuICAgICAgICBkb2NFbC53ZWJraXRSZXF1ZXN0RnVsbHNjcmVlbigpO1xuICAgICAgfSBlbHNlIGlmIChkb2NFbC5tb3pSZXF1ZXN0RnVsbFNjcmVlbikge1xuICAgICAgICBkb2NFbC5tb3pSZXF1ZXN0RnVsbFNjcmVlbigpO1xuICAgICAgfSBlbHNlIGlmIChkb2NFbC5tc1JlcXVlc3RGdWxsc2NyZWVufgB7XG4gICAgICAgIGRvY0VsLm1zUmVxdWVzdEZ1bGxzY3JlZW4oKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKGRvYy5leGl0RnVsbHNjcmVlbikge1xuICAgICAgICBkb2MuZXhpdEZ1bGxzY3JlZW4oKTtcbiAgICAgIH0gZWxzZSBpZiAoZG9jLm1zRXhpdEZ1bGxzY3JlZW4pIHtcbiAgICAgICAgZG9jLm1zRXhpdEZ1bGxzY3JlZW4oKTtcbiAgICAgIH0gZWxzZSBpZiAoZG9jLm1vekNhbmNlbEZ1bGxTY3JlZW4pIHtcbiAgICAgICAgZG9jLm1vekNhbmNlbEZ1bGxTY3JlZW4oKTtcbiAgICAgIH0gZWxzZSBpZiAoZG9jLndlYmtpdEV4aXRGdWxsc2NyZWVufgB7XG4gICAgICAgIGRvYy53ZWJraXRFeGl0RnVsbHNjcmVlbigpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuYnV0dG9uQWZ0ZXJIb29rLmVtaXQoZXZlbnRUb0VtaXQpO1xuICB9XG5cbiAgLyoqXG4gICAqIE1ldGhvZCBjYWxsZWQgYnkgdGhlIGRlbGV0ZSB1cHBlciBidXR0b24uXG4gICAqIEBwYXJhbSBCdXR0b25FdmVudCBldmVudCBwYXlsb2FkXG4gICAqL1xuICBvbkRlbGV0ZShldmVudDogQnV0dG9uRXZlbnQpIHtcbiAgICBjb25zdCBldmVudFRvRW1pdDogQnV0dG9uRXZlbnQgPSB0aGlzLmdldEJ1dHRvbkV2ZW50VG9FbWl0KGV2ZW50KTtcbiAgICB0aGlzLmJ1dHRvbkJlZm9yZUhvb2suZW1pdChldmVudFRvRW1pdCk7XG5cbiAgICBpZiAodGhpcy5pbWFnZXMubGVuZ3RoID09PSAxfgB7XG4gICAgICB0aGlzLmNsb3NlR2FsbGVyeSgpO1xuICAgIH1cblxuICAgIGNvbnN0IGltYWdlSW5kZXhUb0RlbGV0ZTogbnVtYmVyID0gdGhpcy5jdXJyZW50SW1hZ2VDb21wb25lbnQuZ2V0SW5kZXhUb0RlbGV0ZShldmVudC5pbWFnZSk7XG4gICAgaWYgKGltYWdlSW5kZXhUb0RlbGV0ZSA9PT0gdGhpcy5pbWFnZXMubGVuZ3RoIC0gMSkge1xuICAgICAgLy8gbGFzdCBpbWFnZVxuICAgICAgdGhpcy5jdXJyZW50SW1hZ2VDb21wb25lbnQucHJldkltYWdlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuY3VycmVudEltYWdlQ29tcG9uZW50Lm5leHRJbWFnZSgpO1xuICAgIH1cblxuICAgIHRoaXMuYnV0dG9uQWZ0ZXJIb29rLmVtaXQoZXZlbnRUb0VtaXQpO1xuICB9XG5cbiAgLyoqXG4gICAqIE1ldGhvZCBjYWxsZWQgYnkgdGhlIG5hdmlnYXRlIHVwcGVyIGJ1dHRvbi5cbiAgICogQHBhcmFtIEJ1dHRvbkV2ZW50IGV2ZW50IHBheWxvYWRcbiAgICovXG4gIG9uTmF2aWdhdGUoZXZlbnQ6IEJ1dHRvbkV2ZW50fgB7XG4gICAgY29uc3QgZXZlbnRUb0VtaXQ6IEJ1dHRvbkV2ZW50ID0gdGhpcy5nZXRCdXR0b25FdmVudFRvRW1pdChldmVudCk7XG4gICAgdGhpcy5idXR0b25CZWZvcmVIb29rLmVtaXQoZXZlbnRUb0VtaXQpO1xuICAgIC8vIFRvIHN1cHBvcnQgU1NSXG4gICAgaWYgKGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCkpIHtcbiAgICAgIGlmIChldmVudFRvRW1pdC5pbWFnZSAmJiBldmVudFRvRW1pdC5pbWFnZS5tb2RhbC5leHRVcmwpIHtcbiAgICAgICAgLy8gd2hlcmUgSSBzaG91bGQgb3BlbiB0aGlzIGxpbms/IFRoZSBjdXJyZW50IHRhYiBvciBhbm90aGVyIG9uZT9cbiAgICAgICAgaWYgKGV2ZW50VG9FbWl0LmJ1dHRvbiAmJiBldmVudFRvRW1pdC5idXR0b24uZXh0VXJsSW5OZXdUYWIpIHtcbiAgICAgICAgICB3aW5kb3cub3BlbihldmVudFRvRW1pdC5pbWFnZS5tb2RhbC5leHRVcmwsICdfYmxhbmsnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGV2ZW50VG9FbWl0LmltYWdlLm1vZGFsLmV4dFVybDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLmJ1dHRvbkFmdGVySG9vay5lbWl0KGV2ZW50VG9FbWl0KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBNZXRob2QgY2FsbGVkIGJ5IHRoZSBkb3dubG9hZCB1cHBlciBidXR0b24uXG4gICAqIEBwYXJhbSBCdXR0b25FdmVudCBldmVudCBwYXlsb2FkXG4gICAqL1xuICBvbkRvd25sb2FkKGV2ZW50OiBCdXR0b25FdmVudCkge1xuICAgIGNvbnN0IGV2ZW50VG9FbWl0OiBCdXR0b25FdmVudCA9IHRoaXMuZ2V0QnV0dG9uRXZlbnRUb0VtaXQoZXZlbnQpO1xuICAgIHRoaXMuYnV0dG9uQmVmb3JlSG9vay5lbWl0KGV2ZW50VG9FbWl0KTtcbiAgICB0aGlzLmRvd25sb2FfgW1hZ2UoKTtcbiAgICB0aGlzLmJ1dHRvbkFmdGVySG9vay5lbWl0KGV2ZW50VG9FbWl0KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBNZXRob2QgY2FsbGVkIGJ5IHRoZSBjbG9zZSB1cHBlciBidXR0b24uXG4gICAqIEBwYXJhbSBCdXR0b25FdmVudCBldmVudCBwYXlsb2FkXG4gICAqIEBwYXJhbSBBY3Rpb24gYWN0aW9uIHRoYXQgdHJpZ2dlcmVkIHRoZSBjbG9zZSBtZXRob2QuIGBBY3Rpb24uTk9STUFMYCBieSBkZWZhdWx0XG4gICAqL1xuICBvbkNsb3NlR2FsbGVyeShldmVudDogQnV0dG9uRXZlbnQsIGFjdGlvbjogQWN0aW9uID0gQWN0aW9uLk5PUk1BTCkge1xuICAgIGNvbnN0IGV2ZW50VG9FbWl0OiBCdXR0b25FdmVudCA9IHRoaXMuZ2V0QnV0dG9uRXZlbnRUb0VtaXQoZXZlbnQpO1xuICAgIHRoaXMuYnV0dG9uQmVmb3JlSG9vay5lbWl0KGV2ZW50VG9FbWl0KTtcbiAgICB0aGlzLmNsb3NlR2FsbGVyeShhY3Rpb24pO1xuICAgIHRoaXMuYnV0dG9uQWZ0ZXJIb29rLmVtaXQoZXZlbnRUb0VtaXQpO1xuICB9XG5cbiAgLyoqXG4gICAqIE1ldGhvZCB0byBjbG9zZSB0aGUgbW9kYWwgZ2FsbGVyeSBzcGVjaWZ5aW5nIHRoZSBhY3Rpb24uXG4gICAqIEl0IGFsc28gcmVzZXQgdGhlIGBrZXlib2FyZFNlcnZpY2VgIHRvIHByZXZlbnQgbXVsdGlwbGUgbGlzdGVuZXJzLlxuICAgKiBAcGFyYW0gQWN0aW9uIGFjdGlvbiB0eXBlLiBgQWN0aW9uLk5PUk1BTGAgYnkgZGVmYXVsdFxuICAgKiBAcGFyYW0gYm9vbGVhbiBpc0NhbGxlZEJ5U2VydmljZSBpcyB0cnVlIGlmIGNhbGxlZCBieSBnYWxsZXJ5LnNlcnZpY2UsIG90aGVyd2lzZSBmYWxzZVxuICAgKi9cbiAgY2xvc2VHYWxsZXJ5KGFjdGlvbjogQWN0aW9uID0gQWN0aW9uLk5PUk1BTCwgaXNDYWxsZWRCeVNlcnZpY2U6IGJvb2xlYW4gPSBmYWxzZSkge1xuICAgIHRoaXMuY2xvc2UuZW1pdChuZXcgSW1hZ2VNb2RhbEV2ZW50KGFjdGlvbiwgdHJ1ZSkpO1xuICAgIHRoaXMub3BlbmVkID0gZmFsc2U7XG4gICAgdGhpcy5rZXlib2FyZFNlcnZpY2UucmVzZXQoKTtcblxuICAgIC8vIHNob3dzIHNjcm9sbGJhclxuICAgIGRvY3VtZW50LmJvZHkuc3R5bGUub3ZlcmZsb3cgPSAndmlzaWJsZSc7XG5cbiAgICBpZiAoaXNDYWxsZWRCeVNlcnZpY2UpIHtcbiAgICAgIC8vIHRoZSBmb2xsb3dpbmcgaXMgcmVxdWlyZWQsIG90aGVyd2lzZSB0aGUgdmlldyB3aWxsIG5vdCBiZSB1cGRhdGVkXG4gICAgICAvLyB0aGlzIGhhcHBlbnMgb25seSBpZiBjYWxsZWQgYnkgZ2FsbGVyeS5zZXJ2aWNlXG4gICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBNZXRob2QgY2FsbGVkIHdoZW4geW91IGNsaWNrIG9uIGFuIGltYWdlIG9mIHlvdXIgcGxhaW4gKG9yIGlubGluZSkgZ2FsbGVyeS5cbiAgICogQHBhcmFtIG51bWJlciBpbmRleCBvZiB0aGUgY2xpY2tlZCBpbWFnZVxuICAgKi9cbiAgb25TaG93TW9kYWxHYWxsZXJ5KGluZGV4OiBudW1iZXIpIHtcbiAgICB0aGlzLnNob3dNb2RhbEdhbGxlcnkoaW5kZXgpO1xuICB9XG5cbiAgLyoqXG4gICAqIE1ldGhvZCB0byBzaG93IHRoZSBtb2RhbCBnYWxsZXJ5IGRpc3BsYXlpbmcgdGhlIGltYWdlIHdpdGhcbiAgICogdGhlIGluZGV4IHNwZWNpZmllZCBhcyBpbnB1dCBwYXJhbWV0ZXIuXG4gICAqIEl0IHdpbGwgYWxzbyByZWdpc3RlciBhIG5ldyBga2V5Ym9hcmRTZXJ2aWNlYCB0byBjYXRjaCBrZXlib2FyZCdzIGV2ZW50cyB0byBkb3dubG9hZCB0aGUgY3VycmVudFxuICAgKiBpbWFnZSB3aXRoIGtleWJvYXJkJ3Mgc2hvcnRjdXRzLiBUaGlzIHNlcnZpY2UsIHdpbGwgYmUgcmVtb3ZlZCBlaXRoZXIgd2hlbiBtb2RhbCBnYWxsZXJ5IGNvbXBvbmVudFxuICAgKiB3aWxsIGJlIGRlc3Ryb3llZCBvciB3aGVuIHRoZSBnYWxsZXJ5IGlzIGNsb3NlZCBpbnZva2luZyB0aGUgYGNsb3NlR2FsbGVyeWAgbWV0aG9kLlxuICAgKiBAcGFyYW0gbnVtYmVyIGluZGV4IG9mIHRoZSBpbWFnZSB0byBzaG93XG4gICAqIEBwYXJhbSBib29sZWFuIGlzQ2FsbGVkQnlTZXJ2aWNlIGlzIHRydWUgaWYgY2FsbGVkIGJ5IGdhbGxlcnkuc2VydmljZSwgb3RoZXJ3aXNlIGZhbHNlXG4gICAqL1xuICBzaG93TW9kYWxHYWxsZXJ5KGluZGV4OiBudW1iZXIsIGlzQ2FsbGVkQnlTZXJ2aWNlOiBib29sZWFuID0gZmFsc2UpIHtcbiAgICAvLyBoaWRlcyBzY3JvbGxiYXJcbiAgICBkb2N1bWVudC5ib2R5LnN0eWxlLm92ZXJmbG93ID0gJ2hpZGRlbic7XG5cbiAgICB0aGlzLmtleWJvYXJkU2VydmljZS5hZGQoKGV2ZW50OiBLZXlib2FyZEV2ZW50LCBjb21ibzogc3RyaW5nfgA9PiB7XG4gICAgICBpZiAoZXZlbnQucHJldmVudERlZmF1bHQpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIGludGVybmV0IGV4cGxvcmVyXG4gICAgICAgIGV2ZW50LnJldHVyblZhbHVlID0gZmFsc2U7XG4gICAgICB9XG4gICAgICB0aGlzLmRvd25sb2FfgW1hZ2UoKTtcbiAgICB9KTtcblxuICAgIHRoaXMub3BlbmVkID0gdHJ1ZTtcbiAgICB0aGlzLmN1cnJlbnRJbWFnZSA9IHRoaXMuaW1hZ2VzW2luZGV4XTtcblxuICAgIC8vIGVtaXQgYSBuZXcgSW1hZ2VNb2RhbEV2ZW50IHdpdGggdGhlIGluZGV4IG9mIHRoZSBjdXJyZW50IGltYWdlXG4gICAgdGhpcy5zaG93LmVtaXQobmV3IEltYWdlTW9kYWxFdmVudChBY3Rpb24uTE9BRCwgaW5kZXggKyAxfgk7XG5cbiAgICBpZiAoaXNDYWxsZWRCeVNlcnZpY2UpIHtcbiAgICAgIC8vIHRoZSBmb2xsb3dpbmcgaXMgcmVxdWlyZWQsIG90aGVyd2lzZSB0aGUgdmlldyB3aWxsIG5vdCBiZSB1cGRhdGVkXG4gICAgICAvLyB0aGlzIGhhcHBlbnMgb25seSBpZiBjYWxsZWQgYnkgZ2FsbGVyeS5zZXJ2aWNlXG4gICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBNZXRob2QgY2FsbGVkIHdoZW4gdGhlIGltYWdlIGNoYW5nZXMgYW5kIHVzZWQgdG8gdXBkYXRlIHRoZSBgY3VycmVudEltYWdlYCBvYmplY3QuXG4gICAqIEBwYXJhbSBJbWFnZU1vZGFsRXZlbnQgZXZlbnQgcGF5bG9hZFxuICAgKi9cbiAgb25DaGFuZ2VDdXJyZW50SW1hZ2UoZXZlbnQ6IEltYWdlTW9kYWxFdmVudCkge1xuICAgIGNvbnN0IG5ld0luZGV4OiBudW1iZXIgPSA8bnVtYmVyPmV2ZW50LnJlc3VsdDtcblxuICAgIC8vIFRPRE8gYWRkIHZhbGlkYXRpb25cbiAgICB0aGlzLmN1cnJlbnRJbWFnZSA9IHRoaXMuaW1hZ2VzW25ld0luZGV4XTtcblxuICAgIC8vIGVtaXQgZmlyc3QvbGFzdCBldmVudCBiYXNlZCBvbiBuZXdJbmRleCB2YWx1ZVxuICAgIHRoaXMuZW1pdEJvdW5kYXJ5RXZlbnQoZXZlbnQuYWN0aW9uLCBuZXdJbmRleCk7XG5cbiAgICAvLyBlbWl0IGN1cnJlbnQgdmlzaWJsZSBpbWFnZSBpbmRleFxuICAgIHRoaXMuc2hvdy5lbWl0KG5ldyBJbWFnZU1vZGFsRXZlbnQoZXZlbnQuYWN0aW9uLCBuZXdJbmRleCArIDEpKTtcbiAgfVxuXG4gIGlzUGxhaW5HYWxsZXJ5VmlzaWJsZSgpOiBib29sZWFuIHtcbiAgICBpZiAodGhpcy5wbGFpbkdhbGxlcnlDb25maWcgJiYgdGhpcy5wbGFpbkdhbGxlcnlDb25maWcubGF5b3V0ICYmIHRoaXMucGxhaW5HYWxsZXJ5Q29uZmlnLmxheW91dCBpbnN0YW5jZW9mIEFkdmFuY2VkTGF5b3V0fgB7XG4gICAgICByZXR1cm4gIXRoaXMucGxhaW5HYWxsZXJ5Q29uZmlnLmxheW91dC5oaWRlRGVmYXVsdFBsYWluR2FsbGVyeTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICAvKipcbiAgICogTWV0aG9kIGNhbGxlZCB3aGVuIHlvdSBjbGljayAnb3V0c2lkZScgKGkuZS4gb24gdGhlIHNlbWktdHJhbnNwYXJlbnQgYmFja2dyb3VuZClcbiAgICogdG8gY2xvc2UgdGhlIG1vZGFsIGdhbGxlcnkgaWYgYGVuYWJsZUNsb3NlT3V0c2lkZWAgaXMgdHJ1ZS5cbiAgICogQHBhcmFtIGJvb2xlYW4gZXZlbnQgcGF5bG9hZC4gVHJ1ZSB0byBjbG9zZSB0aGUgbW9kYWwgZ2FsbGVyeSwgZmFsc2Ugb3RoZXJ3aXNlXG4gICAqL1xuICBvbkNsaWNrT3V0c2lkZShldmVudDogYm9vbGVhbikge1xuICAgIGlmIChldmVudCAmJiB0aGlzLmVuYWJsZUNsb3NlT3V0c2lkZSkge1xuICAgICAgdGhpcy5jbG9zZUdhbGxlcnkoQWN0aW9uLkNMSUNLKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogTWV0aG9kIGNhbGxlZCB3aGVuIGFuIGltYWdlIGlzIGxvYWRlZCBhbmQgdGhlIGxvYWRpbmcgc3Bpbm5lciBoYXMgZ29uZS5cbiAgICogSXQgc2V0cyB0aGUgcHJldmlvdXNseUxvYWRlZCBmbGFnIGluc2lkZSB0aGUgSW1hZ2UgdG8gaGlkZSBsb2FkaW5nIHNwaW5uZXIgd2hlbiBkaXNwbGF5ZWQgYWdhaW4uXG4gICAqIEBwYXJhbSBJbWFnZUxvYWRFdmVudCBldmVudCBwYXlsb2FkXG4gICAqL1xuICBvbkltYWdlTG9hZChldmVudDogSW1hZ2VMb2FkRXZlbnQpIHtcbiAgICAvLyBjb25zb2xlLmxvZygnbW9kYWwtaW1hZ2Ugb25JbWFnZUxvYWQnLCBldmVudCk7XG4gICAgLy8gY29uc29sZS5sb2coJ21vZGFsLWltYWdlIG9uSW1hZ2VMb2FkIGltYWdlcyBiZWZvcmUnLCB0aGlzLmltYWdlcyk7XG5cbiAgICAvLyBzZXRzIGFzIHByZXZpb3VzbHkgbG9hZGVkIHRoZSBpbWFnZSB3aXRoIGluZGV4IHNwZWNpZmllZCBieSBgZXZlbnQuc3RhdHVzYFxuICAgIHRoaXMuaW1hZ2VzID0gdGhpcy5pbWFnZXMubWFwKChpbWc6IEludGVybmFsTGliSW1hZ2UpID0+IHtcbiAgICAgIGlmIChpbWcgJiYgaW1nLmlkID09PSBldmVudC5pZCkge1xuICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgaW1nLCB7IHByZXZpb3VzbHlMb2FkZWQ6IGV2ZW50LnN0YXR1cyB9KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBpbWc7XG4gICAgfSk7XG5cbiAgICAvLyBjb25zb2xlLmxvZygnbW9kYWwtaW1hZ2Ugb25JbWFnZUxvYWQgaW1hZ2VzIGFmdGVyJywgdGhpcy5pbWFnZXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIE1ldGhvZCBjYWxsZWQgd2hlbiBhIGRvdCBpcyBjbGlja2VkIGFuZCB1c2VkIHRvIHVwZGF0ZSB0aGUgY3VycmVudCBpbWFnZS5cbiAgICogQHBhcmFtIG51bWJlciBpbmRleCBvZiB0aGUgY2xpY2tlZCBkb3RcbiAgICovXG4gIG9uQ2xpY2tEb3QoaW5kZXg6IG51bWJlcikge1xuICAgIHRoaXMuY3VycmVudEltYWdlID0gdGhpcy5pbWFnZXNbaW5kZXhdO1xuICB9XG5cbiAgLyoqXG4gICAqIE1ldGhvZCBjYWxsZWQgd2hlbiBhbiBpbWFnZSBwcmV2aWV3IGlzIGNsaWNrZWQgYW5kIHVzZWQgdG8gdXBkYXRlIHRoZSBjdXJyZW50IGltYWdlLlxuICAgKiBAcGFyYW0gSW1hZ2UgcHJldmlldyBpbWFnZVxuICAgKi9cbiAgb25DbGlja1ByZXZpZXcocHJldmlldzogSW1hZ2UpIHtcbiAgICBjb25zdCBpbWFnZUZvdW5kOiBJbnRlcm5hbExpYkltYWdlIHwgdW5kZWZpbmVkID0gdGhpcy5pbWFnZXMuZmluZCgoaW1nOiBJbnRlcm5hbExpYkltYWdlfgA9PiBpbWcuaWQgPT09IHByZXZpZXcuaWQpO1xuICAgIGlmICghIWltYWdlRm91bmQpIHtcbiAgICAgIHRoaXMuY3VycmVudEltYWdlID0gPEludGVybmFsTGliSW1hZ2U+aW1hZ2VGb3VuZDtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogTWV0aG9kIHRvIGRvd25sb2FkIHRoZSBjdXJyZW50IGltYWdlLCBvbmx5IGlmIGBkb3dubG9hZGFibGVgIGlzIHRydWUuXG4gICAqIEl0IGNvbnRhaW5zIGFsc28gYSBsb2dpYyB0byBlbmFibGUgZG93bmxvYWRpbmcgZmVhdHVyZXMgYWxzbyBmb3IgSUUxMS5cbiAgICovXG4gIGRvd25sb2FfgW1hZ2UofgB7XG4gICAgaWYgKHRoaXMuY3VycmVudEltYWdlQ29uZmlnICYmICF0aGlzLmN1cnJlbnRJbWFnZUNvbmZpZy5kb3dubG9hZGFibGUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy8gSWYgSUUxMSBvciBNaWNyb3NvZnQgRWRnZSB1c2UgbXNTYXZlQmxvYiguLi4pXG4gICAgaWYgKHRoaXMuaXNJRW9yRWRnZSgpfgB7XG4gICAgICAvLyBJIGNhbm5vdCB1c2UgZmV0Y2ggQVBJIGJlY2F1c2UgSUUxMSBkb2Vzbid0IHN1cHBvcnQgaXQsXG4gICAgICAvLyBzbyBJIGhhdmUgdG8gc3dpdGNoIHRvIFhNTEh0dHBSZXF1ZXN0XG4gICAgICB0aGlzLmRvd25sb2FfgW1hZ2VPbmx5SUVvckVkZ2UoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gZm9yIGFsbCBvdGhlciBicm93c2Vyc1xuICAgICAgdGhpcy5kb3dubG9hZEltYWdlQWxsQnJvd3NlcnMoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogTWV0aG9kIHRvIGNsZWFudXAgcmVzb3VyY2VzLiBJbiBmYWN0LCB0aGlzIHdpbGwgcmVzZXQga2V5Ym9hcmQncyBzZXJ2aWNlLlxuICAgKiBUaGlzIGlzIGFuIEFuZ3VsYXIncyBsaWZlY3ljbGUgaG9vayB0aGF0IGlzIGNhbGxlZCB3aGVuIHRoaXMgY29tcG9uZW50IGlzIGRlc3Ryb3llZC5cbiAgICovXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMua2V5Ym9hcmRTZXJ2aWNlLnJlc2V0KCk7XG5cbiAgICBpZiAodGhpcy5nYWxsZXJ5U2VydmljZU5hdmlnYXRlU3Vic2NyaXB0aW9ufgB7XG4gICAgICB0aGlzLmdhbGxlcnlTZXJ2aWNlTmF2aWdhdGVTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuZ2FsbGVyeVNlcnZpY2VDbG9zZVN1YnNjcmlwdGlvbikge1xuICAgICAgdGhpcy5nYWxsZXJ5U2VydmljZUNsb3NlU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICAgIGlmICh0aGlzLmdhbGxlcnlTZXJ2aWNlVXBkYXRlU3Vic2NyaXB0aW9ufgB7XG4gICAgICB0aGlzLmdhbGxlcnlTZXJ2aWNlVXBkYXRlU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFByaXZhdGUgbWV0aG9kIHRvIGRvd25sb2FkIHRoZSBjdXJyZW50IGltYWdlIGZvciBhbGwgYnJvd3NlcnMgZXhjZXB0IGZvciBJRTExLlxuICAgKi9cbiAgcHJpdmF0ZSBkb3dubG9hZEltYWdlQWxsQnJvd3NlcnMofgB7XG4gICAgY29uc3QgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICBsaW5rLmhyZWYgPSA8c3RyaW5nPnRoaXMuY3VycmVudEltYWdlLm1vZGFsLmltZztcbiAgICBsaW5rLnNldEF0dHJpYnV0ZSgnZG93bmxvYWQnLCB0aGlzLmdldEZpbGVOYW1lKHRoaXMuY3VycmVudEltYWdlfgk7XG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChsaW5rKTtcbiAgICBsaW5rLmNsaWNrKCk7XG4gICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChsaW5rKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQcml2YXRlIG1ldGhvZCB0byBkb3dubG9hZCB0aGUgY3VycmVudCBpbWFnZSBvbmx5IGZvciBJRTExIHVzaW5nXG4gICAqIGN1c3RvbSBqYXZhc2NyaXB0J3MgbWV0aG9kcyBhdmFpbGFibGUgb25seSBvbiBJRS5cbiAgICovXG4gIHByaXZhdGUgZG93bmxvYWRJbWFnZU9ubHlJRW9yRWRnZSgpIHtcbiAgICBpZiAoaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkfgkge1xuICAgICAgY29uc3QgcmVxID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgICByZXEub3BlbignR0VUJywgPHN0cmluZz50aGlzLmN1cnJlbnRJbWFnZS5tb2RhbC5pbWcsIHRydWUpO1xuICAgICAgcmVxLnJlc3BvbnNlVHlwZSA9ICdhcnJheWJ1ZmZlcic7XG4gICAgICByZXEub25sb2FkID0gZXZlbnQgPT4ge1xuICAgICAgICBjb25zdCBibG9iID0gbmV3IEJsb2IoW3JlcS5yZXNwb25zZV0sIHsgdHlwZTogJ2ltYWdlL3BuZycgfSk7XG4gICAgICAgIHdpbmRvdy5uYXZpZ2F0b3IubXNTYXZlQmxvYihibG9iLCB0aGlzLmdldEZpbGVOYW1lKHRoaXMuY3VycmVudEltYWdlfgk7XG4gICAgICB9O1xuICAgICAgcmVxLnNlbmQoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUHJpdmF0ZSBtZXRob2QgdG8gZ2V0IHRoZSBgQnV0dG9uRXZlbnRgIHRvIGVtaXQsIG1lcmdpbmcgdGhlIGlucHV0IGBCdXR0b25FdmVudGBcbiAgICogd2l0aCB0aGUgY3VycmVudCBpbWFnZS5cbiAgICogQHBhcmFtIEJ1dHRvbkV2ZW50IGV2ZW50IHBheWxvYWQgdG8gcmV0dXJuXG4gICAqIEByZXR1cm5zIEJ1dHRvbkV2ZW50IGV2ZW50IHBheWxvYWQgd2l0aCB0aGUgY3VycmVudCBpbWFnZSBpbmNsdWRlZFxuICAgKi9cbiAgcHJpdmF0ZSBnZXRCdXR0b25FdmVudFRvRW1pdChldmVudDogQnV0dG9uRXZlbnQpOiBCdXR0b25FdmVudCB7XG4gICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oZXZlbnQsIHsgaW1hZ2U6IHRoaXMuY3VycmVudEltYWdlIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFByaXZhdGUgbWV0aG9kIHRvIGdldCB0aGUgZmlsZSBuYW1lIGZyb20gYW4gaW5wdXQgcGF0aC5cbiAgICogVGhpcyBpcyB1c2VkIGVpdGhlciB0byBnZXQgdGhlIGltYWdlJ3MgbmFtZSBmcm9tIGl0cyBwYXRoIG9yIGZyb20gdGhlIEltYWdlIGl0c2VsZixcbiAgICogaWYgc3BlY2lmaWVkIGFzICdkb3dubG9hZEZpbGVOYW1lJyBieSB0aGUgdXNlci5cbiAgICogQHBhcmFtIEltYWdlIGltYWdlIHRvIGV4dHJhY3QgaXRzIGZpbGUgbmFtZVxuICAgKiBAcmV0dXJucyBzdHJpbmcgc3RyaW5nIGZpbGUgbmFtZSBvZiB0aGUgaW5wdXQgaW1hZ2UuXG4gICAqL1xuICBwcml2YXRlIGdldEZpbGVOYW1lKGltYWdlOiBJbWFnZSk6IHN0cmluZyB7XG4gICAgaWYgKCFpbWFnZS5tb2RhbC5kb3dubG9hZEZpbGVOYW1lIHx8IGltYWdlLm1vZGFsLmRvd25sb2FkRmlsZU5hbWUubGVuZ3RoID09PSAwfgB7XG4gICAgICByZXR1cm4gKDxzdHJpbmc+dGhpcy5jdXJyZW50SW1hZ2UubW9kYWwuaW1nfg5yZXBsYWNlKC9eLipbXFxcXFxcL10vLCAnJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBpbWFnZS5tb2RhbC5kb3dubG9hZEZpbGVOYW1lO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBQcml2YXRlIG1ldGhvZCB0byBpbml0aWFsaXplIGBpbWFnZXNgIGFzIGFycmF5IG9mIGBJbWFnZWBzLlxuICAgKiBBbHNvLCBpdCB3aWxsIGVtaXQgSW1hZ2Vvd21vZGFNb2RhbEV2ZW50IHRvIHNheSB0aGF0IGltYWdlcyBhcmUgbG9hZGVkLlxuICAgKi9cbiAgcHJpdmF0ZSBpbml0SW1hZ2VzKCkge1xuICAgIHRoaXMuaW1hZ2VzID0gPEludGVybmFsTGliSW1hZ2VbXT50aGlzLm1vZGFsSW1hZ2VzO1xuICAgIHRoaXMuaGFzRGF0YS5lbWl0KG5ldyBJbWFnZU1vZGFsRXZlbnQoQWN0aW9uLkxPQUQsIHRydWUpKTtcbiAgICB0aGlzLnNob3dHYWxsZXJ5ID0gdGhpcy5pbWFnZXMubGVuZ3RoID4gMDtcbiAgfVxuXG4gIC8qKlxuICAgKiBQcml2YXRlIG1ldGhvZCB0byBlbWl0IGV2ZW50cyB3aGVuIGVpdGhlciB0aGUgbGFzdCBvciB0aGUgZmlyc3QgaW1hZ2UgYXJlIHZpc2libGUuXG4gICAqIEBwYXJhbSBhY3Rpb24gRW51bSBvZiB0eXBlIEFjdGlvbiB0aGF0IHJlcHJlc2VudHMgdGhlIHNvdXJjZSBvZiB0aGUgZXZlbnQgdGhhdCBjaGFuZ2VkIHRoZVxuICAgKiAgY3VycmVudCBpbWFnZSB0byB0aGUgZmlyc3Qgb25lIG9yIHRoZSBsYXN0IG9uZS5cbiAgICogQHBhcmFtIGluZGV4VG9DaGVjayBpcyB0aGUgaW5kZXggbnVtYmVyIG9mIHRoZSBpbWFnZSAodGhlIGZpcnN0IG9yIHRoZSBsYXN0IG9uZSkuXG4gICAqL1xuICBwcml2YXRlIGVtaXRCb3VuZGFyeUV2ZW50KGFjdGlvbjogQWN0aW9uLCBpbmRleFRvQ2hlY2s6IG51bWJlcikge1xuICAgIC8vIHRvIGVtaXQgZmlyc3QvbGFzdCBldmVudFxuICAgIHN3aXRjaCAoaW5kZXhUb0NoZWNrfgB7XG4gICAgICBjYXNlIDA6XG4gICAgICAgIHRoaXMuZmlyc3RJbWFnZS5lbWl0KG5ldyBJbWFnZU1vZGFsRXZlbnQoYWN0aW9uLCB0cnVlfgk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSB0aGlzLmltYWdlcy5sZW5ndGggLSAxOlxuICAgICAgICB0aGlzLmxhc3RJbWFnZS5lbWl0KG5ldyBJbWFnZU1vZGFsRXZlbnQoYWN0aW9uLCB0cnVlfgk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBQcml2YXRlIG1ldGhvZCB0byBjaGVjayBpZiB0aGlzIGxpYnJhcnkgaXMgcnVubmluZyBvblxuICAgKiBNaWNyb3NvZnQgYnJvd3NlcnMgb3Igbm90IChpLmUuIGl0IGRldGVjdHMgYm90aCBJRTExIGFuZCBFZGdlKVxuICAgKiBzdXBwb3J0aW5nIGFsc28gU2VydmVyLVNpZGUgUmVuZGVyaW5nLlxuICAgKiBJbnNwaXJlZCBieSBodHRwczovL21zZG4ubWljcm9zb2Z0LmNvbS9pdC1pdC9saWJyYXJ5L2hoNzc5MDE2KHY9dnMuODUpLmFzcHhcbiAgICogQHJldHVybnMgYW55IHRoZSByZXN1bHRcbiAgICovXG4gIHByaXZhdGUgaXNJRW9yRWRnZSgpOiBhbnkge1xuICAgIGlmIChpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpfgB7XG4gICAgICAvLyBpZiBib3RoIEJsb2IgY29uc3RydWN0b3IgYW5kIG1zU2F2ZU9yT3BlbkJsb2IgYXJlIHN1cHBvcnRlZCBieSB0aGUgY3VycmVudCBicm93c2VyXG4gICAgICByZXR1cm4gd2luZG93LkJsb2IgJiYgd2luZG93Lm5hdmlnYXRvci5tc1NhdmVPck9wZW5CbG9iO1xuICAgIH1cbiAgICBpZiAoaXNQbGF0Zm9ybVNlcnZlcih0aGlzLnBsYXRmb3JtSWQpfgB7XG4gICAgICAvLyBzZXJ2ZXIgb25seVxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG59XG4iLCIvKlxuIFRoZSBNSVQgTGljZW5zZSAoTUlUKVxuXG4gQ29weXJpZ2h0IChjfgAyMDE3LTIwMTggU3RlZmFubyBDYXBwYSAoS3M4OSlcblxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbiBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuXG4gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsXG4gY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cblxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OIElORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEVcbiBTT0ZUV0FSRS5cbiAqL1xuXG5pbXBvcnQgeyBBY3Rpb24gfSBmcm9tICcuL2FjdGlvbi5lbnVtJztcbmltcG9ydCB7IEludGVybmFsTGliSW1hZ2UgfSBmcm9tICcuL2ltYWdlLWludGVybmFsLmNsYXNzJztcbmltcG9ydCB7IFNpemUgfSBmcm9tICcuL3NpemUuaW50ZXJmYWNlJztcblxuLyoqXG4gKiBJbnRlcmZhY2UgYEJ1dHRvbnNDb25maWdgIHRvIGFkZCBidXR0b25zLCBzaG93L2hpZGUgdGhlaXIsIGFuZCB0byBhZGQgdGhlIHN0cmF0ZWd5LlxuICovXG5leHBvcnQgaW50ZXJmYWNlIEJ1dHRvbnNDb25maWcge1xuICB2aXNpYmxlOiBib29sZWFuO1xuICBzdHJhdGVneTogQnV0dG9uc1N0cmF0ZWd5O1xuICBidXR0b25zPzogQnV0dG9uQ29uZmlnW107XG59XG5cbi8qKlxuICogSW50ZXJmYWNlIGBCdXR0b25Db25maWdgIHRvIGNvbmZpZ3VyZSBhIHNpbmdsZSBidXR0b24uXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgQnV0dG9uQ29uZmlnIHtcbiAgY2xhc3NOYW1lPzogc3RyaW5nO1xuICBzaXplPzogU2l6ZTtcbiAgZm9udFNpemU/OiBzdHJpbmc7XG4gIHR5cGU6IEJ1dHRvblR5cGU7XG4gIHRpdGxlPzogc3RyaW5nO1xuICBhcmlhTGFiZWw/OiBzdHJpbmc7XG4gIGV4dFVybEluTmV3VGFiPzogYm9vbGVhbjsgLy8gdG8gb3BlbiB0aGUgZXh0ZXJuYWwgdXJsIGluIGEgbmV3IHRhYiwgaW5zdGVhZCBvZiB0aGUgY3VycmVudCBvbmVcbn1cblxuLyoqXG4gKiBJbnRlcmZhY2UgYEJ1dHRvbkV2ZW50YCB0byByZXByZXNlbnQgdGhlIGV2ZW50IHBheWxvYWQgd2hlbiBhIGJ1dHRvbiBpcyBjbGlja2VkLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIEJ1dHRvbkV2ZW50IHtcbiAgYnV0dG9uOiBCdXR0b25Db25maWc7XG4gIGltYWdlOiBJbnRlcm5hbExpYkltYWdlIHwgbnVsbDtcbiAgYWN0aW9uOiBBY3Rpb247XG59XG5cbi8qKlxuICogRW51bSBgQnV0dG9uc1N0cmF0ZWd5YCB0byBjb25maWd1cmUgdGhlIGxvZ2ljIG9mIGEgYnV0dG9uLlxuICovXG5leHBvcnQgZW51bSBCdXR0b25zU3RyYXRlZ3kge1xuICAvLyBkb24ndCB1c2UgMCBoZXJlXG4gIC8vIHRoZSBmaXJzdCBpbmRleCBpcyAxIGFuZCBhbGwgb2YgdGhlIGZvbGxvd2luZyBtZW1iZXJzIGFyZSBhdXRvLWluY3JlbWVudGVkIGZyb20gdGhhdCBwb2ludCBvblxuICBERUZBVUxUID0gMSxcbiAgU0lNUExFLFxuICBBRFZBTkNFRCxcbiAgRlVMTCxcbiAgQ1VTVE9NXG59XG5cbi8qKlxuICogRW51bSBgQnV0dG9uVHlwZWAgaXMgdGhlIHR5cGUgb2YgYSBidXR0b24uXG4gKi9cbmV4cG9ydCBlbnVtIEJ1dHRvblR5cGUge1xuICAvLyBkb24ndCB1c2UgMCBoZXJlXG4gIC8vIHRoZSBmaXJzdCBpbmRleCBpcyAxIGFuZCBhbGwgb2YgdGhlIGZvbGxvd2luZyBtZW1iZXJzIGFyZSBhdXRvLWluY3JlbWVudGVkIGZyb20gdGhhdCBwb2ludCBvblxuICAvLyBSRUZSRVNIID0gMSxcbiAgREVMRVRFID0gMSxcbiAgRVhUVVJMLFxuICBET1dOTE9BRCxcbiAgQ0xPU0UsXG4gIENVU1RPTSxcbiAgRlVMTFNDUkVFTlxufVxuXG4vKipcbiAqIEFycmF5IG9mIGFkbWl0dGVkIHR5cGVzIG9mIGJ1dHRvbnMuXG4gKi9cbmV4cG9ydCBjb25zdCBXSElURUxJU1RfQlVUVE9OX1RZUEVTOiBCdXR0b25UeXBlW10gPSBbXG4gIC8vIEJ1dHRvblR5cGUuUkVGUkVTSCxcbiAgQnV0dG9uVHlwZS5GVUxMU0NSRUVOLFxuICBCdXR0b25UeXBlLkRFTEVURSxcbiAgQnV0dG9uVHlwZS5FWFRVUkwsXG4gIEJ1dHRvblR5cGUuRE9XTkxPQUQsXG4gIEJ1dHRvblR5cGUuQ0xPU0UsXG4gIEJ1dHRvblR5cGUuQ1VTVE9NXG5dO1xuIiwiaW1wb3J0IHsgQnV0dG9uQ29uZmlnLCBCdXR0b25UeXBlIH0gZnJvbSAnLi4vLi4vbW9kZWwvYnV0dG9ucy1jb25maWcuaW50ZXJmYWNlJztcbmltcG9ydCB7IFNpemUgfSBmcm9tICcuLi8uLi9tb2RlbC9zaXplLmludGVyZmFjZSc7XG5cbi8qKlxuICogRGVmYXVsdCBidXR0b24gc2l6ZSBvYmplY3RcbiAqL1xuZXhwb3J0IGNvbnN0IEtTX0RFRkFVTFRfU0laRTogU2l6ZSA9IHsgaGVpZ2h0OiAnYXV0bycsIHdpZHRoOiAnMzBweCcgfTtcblxuLyoqXG4gKiBEZWZhdWx0IGNsb3NlIGJ1dHRvbiBvYmplY3RcbiAqL1xuZXhwb3J0IGNvbnN0IEtTX0RFRkFVTFRfQlROX0NMT1NFOiBCdXR0b25Db25maWcgPSB7XG4gIGNsYXNzTmFtZTogJ2Nsb3NlLWltYWdlJyxcbiAgc2l6ZTogS1NfREVGQVVMVF9TSVpFLFxuICB0eXBlOiBCdXR0b25UeXBlLkNMT1NFLFxuICB0aXRsZTogJ0Nsb3NlIHRoaXMgbW9kYWwgaW1hZ2UgZ2FsbGVyeScsXG4gIGFyaWFMYWJlbDogJ0Nsb3NlIHRoaXMgbW9kYWwgaW1hZ2UgZ2FsbGVyeSdcbn07XG5cbi8qKlxuICogRGVmYXVsdCBkb3dubG9hZCBidXR0b24gb2JqZWN0XG4gKi9cbmV4cG9ydCBjb25zdCBLU19ERUZBVUxUX0JUTl9ET1dOTE9BRDogQnV0dG9uQ29uZmlnID0ge1xuICBjbGFzc05hbWU6ICdkb3dubG9hZC1pbWFnZScsXG4gIHNpemU6IEtTX0RFRkFVTFRfU0laRSxcbiAgdHlwZTogQnV0dG9uVHlwZS5ET1dOTE9BRCxcbiAgdGl0bGU6ICdEb3dubG9hZCB0aGUgY3VycmVudCBpbWFnZScsXG4gIGFyaWFMYWJlbDogJ0Rvd25sb2FkIHRoZSBjdXJyZW50IGltYWdlJ1xufTtcblxuLyoqXG4gKiBEZWZhdWx0IGV4dHVybCBidXR0b24gb2JqZWN0XG4gKi9cbmV4cG9ydCBjb25zdCBLU19ERUZBVUxUX0JUTl9FWFRVUkw6IEJ1dHRvbkNvbmZpZyA9IHtcbiAgY2xhc3NOYW1lOiAnZXh0LXVybC1pbWFnZScsXG4gIHNpemU6IEtTX0RFRkFVTFRfU0laRSxcbiAgdHlwZTogQnV0dG9uVHlwZS5FWFRVUkwsXG4gIHRpdGxlOiAnTmF2aWdhdGUgdGhlIGN1cnJlbnQgaW1hZ2UnLFxuICBhcmlhTGFiZWw6ICdOYXZpZ2F0ZSB0aGUgY3VycmVudCBpbWFnZSdcbn07XG4vLyAvKipcbi8vICAqIERlZmF1bHQgcmVmcmVzaCBidXR0b24gb2JqZWN0XG4vLyAgKi9cbi8vIGV4cG9ydCBjb25zdCBLU19ERUZBVUxUX0JUTl9SRUZSRVNIOiBCdXR0b25Db25maWcgPSB7XG4vLyAgIGNsYXNzTmFtZTogJ3JlZnJlc2gtaW1hZ2UnLFxuLy8gICBzaXplOiBLU19ERUZBVUxUX1NJWkUsXG4vLyAgIHR5cGU6IEJ1dHRvblR5cGUuUkVGUkVTSCxcbi8vICAgdGl0bGU6ICdSZWZyZXNoIGFsbCBpbWFnZXMnLFxuLy8gICBhcmlhTGFiZWw6ICdSZWZyZXNoIGFsbCBpbWFnZXMnXG4vLyB9O1xuXG4vKipcbiAqIERlZmF1bHQgZGVsZXRlIGJ1dHRvbiBvYmplY3RcbiAqL1xuZXhwb3J0IGNvbnN0IEtTX0RFRkFVTFRfQlROX0RFTEVURTogQnV0dG9uQ29uZmlnID0ge1xuICBjbGFzc05hbWU6ICdkZWxldGUtaW1hZ2UnLFxuICBzaXplOiBLU19ERUZBVUxUX1NJWkUsXG4gIHR5cGU6IEJ1dHRvblR5cGUuREVMRVRFLFxuICB0aXRsZTogJ0RlbGV0ZSB0aGUgY3VycmVudCBpbWFnZScsXG4gIGFyaWFMYWJlbDogJ0RlbGV0ZSB0aGUgY3VycmVudCBpbWFnZSdcbn07XG5cbi8qKlxuICogRGVmYXVsdCBmdWxsLXNjcmVlbiBidXR0b24gb2JqZWN0XG4gKi9cbmV4cG9ydCBjb25zdCBLU19ERUZBVUxUX0JUTl9GVUxMX1NDUkVFTjogQnV0dG9uQ29uZmlnID0ge1xuICBjbGFzc05hbWU6ICdmdWxsc2NyZWVuLWltYWdlJyxcbiAgc2l6ZTogS1NfREVGQVVMVF9TSVpFLFxuICB0eXBlOiBCdXR0b25UeXBlLkZVTExTQ1JFRU4sXG4gIHRpdGxlOiAnU3dpdGNoIHRvIGZ1bGwtc2NyZWVuJyxcbiAgYXJpYUxhYmVsOiAnU3dpdGNoIHRvIGZ1bGwtc2NyZWVuJ1xufTtcbiIsIi8qXG4gVGhlIE1JVCBMaWNlbnNlIChNSVQpXG5cbiBDb3B5cmlnaHQgKGMpIDIwMTcgU3RlZmFubyBDYXBwYSAoS3M4OSlcblxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbiBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuXG4gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsXG4gY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cblxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OIElORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEVcbiBTT0ZUV0FSRS5cbiAqL1xuXG5pbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkluaXQsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBBY2Nlc3NpYmxlQ29tcG9uZW50IH0gZnJvbSAnLi4vYWNjZXNzaWJsZS5jb21wb25lbnQnO1xuXG5pbXBvcnQgeyBBY3Rpb24gfSBmcm9tICcuLi8uLi9tb2RlbC9hY3Rpb24uZW51bSc7XG5pbXBvcnQgeyBJbWFnZSB9IGZyb20gJy4uLy4uL21vZGVsL2ltYWdlLmNsYXNzJztcbmltcG9ydCB7IEJ1dHRvbkNvbmZpZywgQnV0dG9uRXZlbnQsIEJ1dHRvbnNDb25maWcsIEJ1dHRvbnNTdHJhdGVneSwgQnV0dG9uVHlwZSwgV0hJVEVMSVNUX0JVVFRPTl9UWVBFUyB9IGZyb20gJy4uLy4uL21vZGVsL2J1dHRvbnMtY29uZmlnLmludGVyZmFjZSc7XG5cbmltcG9ydCB7XG4gIEtTX0RFRkFVTFRfQlROX0NMT1NFLFxuICBLU19ERUZBVUxUX0JUTl9ERUxFVEUsXG4gIEtTX0RFRkFVTFRfQlROX0RPV05MT0FELFxuICBLU19ERUZBVUxUX0JUTl9FWFRVUkwsXG4gIEtTX0RFRkFVTFRfQlROX0ZVTExfU0NSRUVOXG59IGZyb20gJy4vdXBwZXItYnV0dG9ucy1kZWZhdWx0JztcblxuaW1wb3J0IHsgTkVYVCB9IGZyb20gJy4uLy4uL3V0aWxzL3VzZXItaW5wdXQudXRpbCc7XG5cbi8qKlxuICogSW50ZXJuYWwgcmVwcmVzZW50YXRpb24gb2YgYEJ1dHRvbkNvbmZpZ2Agd2l0aCBhbiBvcHRpb25hbCBgaWRgIGZpZWxkLCB1c2VkIGJ5IHRyYWNrSWQgdG8gaW1wcm92ZSBwZXJmb3JtYW5jZXMuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgSW50ZXJuYWxCdXR0b25Db25maWcgZXh0ZW5kcyBCdXR0b25Db25maWcge1xuICBpZD86IG51bWJlcjsgLy8gdXNlZnVsIG9ubHkgZm9yIHRyYWNrQnlJZCwgbm90IG5lZWRlZCBieSB1c2Vyc1xufVxuXG4vKipcbiAqIENvbXBvbmVudCB3aXRoIGFsbCB1cHBlciBidXR0b25zLlxuICogQWxzbyBpdCBlbWl0cyBjbGljayBldmVudHMgYXMgb3V0cHV0cy5cbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAna3MtdXBwZXItYnV0dG9ucycsXG4gIHN0eWxlVXJsczogWyd1cHBlci1idXR0b25zLnNjc3MnXSxcbiAgdGVtcGxhdGVVcmw6ICd1cHBlci1idXR0b25zLmh0bWwnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBVcHBlckJ1dHRvbnNDb21wb25lbnQgZXh0ZW5kcyBBY2Nlc3NpYmxlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgLyoqXG4gICAqIE9iamVjdCBvZiB0eXBlIGBJbWFnZWAgdGhhdCByZXByZXNlbnQgdGhlIHZpc2libGUgaW1hZ2UuXG4gICAqL1xuICBASW5wdXQofgBjdXJyZW50SW1hZ2U6IEltYWdlO1xuICAvKipcbiAgICogT2JqZWN0IG9mIHR5cGUgYEJ1dHRvbnNDb25maWdgIHRvIGluaXQgVXBwZXJCdXR0b25zQ29tcG9uZW50J3MgZmVhdHVyZXMuXG4gICAqIEZvciBpbnN0YW5jZSwgaXQgY29udGFpbnMgYW4gYXJyYXkgb2YgYnV0dG9ucy5cbiAgICovXG4gIEBJbnB1dCgpIGJ1dHRvbnNDb25maWc6IEJ1dHRvbnNDb25maWc7XG5cbiAgLyoqXG4gICAqIE91dHB1dCB0byBlbWl0IGNsaWNrcyBvbiByZWZyZXNoIGJ1dHRvbi4gVGhlIHBheWxvYWQgY29udGFpbnMgYSBgQnV0dG9uRXZlbnRgLlxuICAgKi9cbiAgQE91dHB1dCgpIHJlZnJlc2g6IEV2ZW50RW1pdHRlcjxCdXR0b25FdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPEJ1dHRvbkV2ZW50PigpO1xuICAvKipcbiAgICogT3V0cHV0IHRvIGVtaXQgY2xpY2tzIG9uIGRlbGV0ZSBidXR0b24uIFRoZSBwYXlsb2FkIGNvbnRhaW5zIGEgYEJ1dHRvbkV2ZW50YC5cbiAgICovXG4gIEBPdXRwdXQofgBkZWxldGU6IEV2ZW50RW1pdHRlcjxCdXR0b25FdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPEJ1dHRvbkV2ZW50PigpO1xuICAvKipcbiAgICogT3V0cHV0IHRvIGVtaXQgY2xpY2tzIG9uIG5hdmlnYXRlIGJ1dHRvbi4gVGhlIHBheWxvYWQgY29udGFpbnMgYSBgQnV0dG9uRXZlbnRgLlxuICAgKi9cbiAgQE91dHB1dCgpIG5hdmlnYXRlOiBFdmVudEVtaXR0ZXI8QnV0dG9uRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxCdXR0b25FdmVudD4oKTtcbiAgLyoqXG4gICAqIE91dHB1dCB0byBlbWl0IGNsaWNrcyBvbiBkb3dubG9hZCBidXR0b24uIFRoZSBwYXlsb2FkIGNvbnRhaW5zIGEgYEJ1dHRvbkV2ZW50YC5cbiAgICovXG4gIEBPdXRwdXQofgBkb3dubG9hZDogRXZlbnRFbWl0dGVyPEJ1dHRvbkV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8QnV0dG9uRXZlbnQ+KCk7XG4gIC8qKlxuICAgKiBPdXRwdXQgdG8gZW1pdCBjbGlja3Mgb24gY2xvc2UgYnV0dG9uLiBUaGUgcGF5bG9hZCBjb250YWlucyBhIGBCdXR0b25FdmVudGAuXG4gICAqL1xuICBAT3V0cHV0KCkgY2xvc2U6IEV2ZW50RW1pdHRlcjxCdXR0b25FdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPEJ1dHRvbkV2ZW50PigpO1xuICAvKipcbiAgICogT3V0cHV0IHRvIGVtaXQgY2xpY2tzIG9uIGZ1bGwtc2NyZWVuIGJ1dHRvbi4gVGhlIHBheWxvYWQgY29udGFpbnMgYSBgQnV0dG9uRXZlbnRgLlxuICAgKi9cbiAgQE91dHB1dCgpIGZ1bGxzY3JlZW46IEV2ZW50RW1pdHRlcjxCdXR0b25FdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPEJ1dHRvbkV2ZW50PigpO1xuICAvKipcbiAgICogT3V0cHV0IHRvIGVtaXQgY2xpY2tzIG9uIGFsbCBjdXN0b20gYnV0dG9ucy4gVGhlIHBheWxvYWQgY29udGFpbnMgYSBgQnV0dG9uRXZlbnRgLlxuICAgKi9cbiAgQE91dHB1dCgpIGN1c3RvbUVtaXQ6IEV2ZW50RW1pdHRlcjxCdXR0b25FdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPEJ1dHRvbkV2ZW50PigpO1xuXG4gIC8qKlxuICAgKiBBcnJheSBvZiBgSW50ZXJuYWxCdXR0b25Db25maWdgIGV4cG9zZWQgdG8gdGhlIHRlbXBsYXRlLiBUaGlzIGZpZWxkIGlzIGluaXRpYWxpemVkXG4gICAqIGFwcGx5aW5nIHRyYW5zZm9ybWF0aW9ucywgZGVmYXVsdCB2YWx1ZXMgYW5kIHNvIG9uIHRvIHRoZSBpbnB1dCBvZiB0aGUgc2FtZSB0eXBlLlxuICAgKi9cbiAgYnV0dG9uczogSW50ZXJuYWxCdXR0b25Db25maWdbXTtcbiAgLyoqXG4gICAqIE9iamVjdCBvZiB0eXBlIGBCdXR0b25zQ29uZmlnYCBleHBvc2VkIHRvIHRoZSB0ZW1wbGF0ZS4gVGhpcyBmaWVsZCBpcyBpbml0aWFsaXplZFxuICAgKiBhcHBseWluZyB0cmFuc2Zvcm1hdGlvbnMsIGRlZmF1bHQgdmFsdWVzIGFuZCBzbyBvbiB0byB0aGUgaW5wdXQgb2YgdGhlIHNhbWUgdHlwZS5cbiAgICovXG4gIGNvbmZpZ0J1dHRvbnM6IEJ1dHRvbnNDb25maWc7XG5cbiAgLyoqXG4gICAqIERlZmF1bHQgYnV0dG9ucyBhcnJheSBmb3Igc3RhbmRhcmQgY29uZmlndXJhdGlvblxuICAgKi9cbiAgcHJpdmF0ZSBkZWZhdWx0QnV0dG9uc0RlZmF1bHQ6IEJ1dHRvbkNvbmZpZ1tdID0gW0tTX0RFRkFVTFRfQlROX0NMT1NFXTtcbiAgLyoqXG4gICAqIERlZmF1bHQgYnV0dG9ucyBhcnJheSBmb3Igc2ltcGxlIGNvbmZpZ3VyYXRpb25cbiAgICovXG4gIHByaXZhdGUgc2ltcGxlQnV0dG9uc0RlZmF1bHQ6IEJ1dHRvbkNvbmZpZ1tdID0gW0tTX0RFRkFVTFRfQlROX0RPV05MT0FELCAuLi50aGlzLmRlZmF1bHRCdXR0b25zRGVmYXVsdF07XG4gIC8qKlxuICAgKiBEZWZhdWx0IGJ1dHRvbnMgYXJyYXkgZm9yIGFkdmFuY2VkIGNvbmZpZ3VyYXRpb25cbiAgICovXG4gIHByaXZhdGUgYWR2YW5jZWRCdXR0b25zRGVmYXVsdDogQnV0dG9uQ29uZmlnW10gPSBbS1NfREVGQVVMVF9CVE5fRVhUVVJMLCAuLi50aGlzLnNpbXBsZUJ1dHRvbnNEZWZhdWx0XTtcbiAgLyoqXG4gICAqIERlZmF1bHQgYnV0dG9ucyBhcnJheSBmb3IgZnVsbCBjb25maWd1cmF0aW9uXG4gICAqL1xuICBwcml2YXRlIGZ1bGxCdXR0b25zRGVmYXVsdDogQnV0dG9uQ29uZmlnW10gPSBbXG4gICAgLypLU19ERUZBVUxUX0JUTl9SRUZSRVNILCAqL1xuICAgIEtTX0RFRkFVTFRfQlROX0ZVTExfU0NSRUVOLFxuICAgIEtTX0RFRkFVTFRfQlROX0RFTEVURSxcbiAgICAuLi50aGlzLmFkdmFuY2VkQnV0dG9uc0RlZmF1bHRcbiAgXTtcblxuICAvKipcbiAgICogTWV0aG9kIMOCwrRuZ09uSW5pdMOCwrQgdG8gYnVpbGQgYGNvbmZpZ0J1dHRvbnNgIGFwcGx5aW5nIGEgZGVmYXVsdCB2YWx1ZSBhbmQgYWxzbyB0b1xuICAgKiBpbml0IHRoZSBgYnV0dG9uc2AgYXJyYXkuXG4gICAqIFRoaXMgaXMgYW4gQW5ndWxhcidzIGxpZmVjeWNsZSBob29rLCBzbyBpdHMgY2FsbGVkIGF1dG9tYXRpY2FsbHkgYnkgQW5ndWxhciBpdHNlbGYuXG4gICAqIEluIHBhcnRpY3VsYXIsIGl0J3MgY2FsbGVkIG9ubHkgb25lIHRpbWUhISFcbiAgICovXG4gIG5nT25Jbml0KCkge1xuICAgIGNvbnN0IGRlZmF1bHRDb25maWc6IEJ1dHRvbnNDb25maWcgPSB7IHZpc2libGU6IHRydWUsIHN0cmF0ZWd5OiBCdXR0b25zU3RyYXRlZ3kuREVGQVVMVCB9O1xuICAgIHRoaXMuY29uZmlnQnV0dG9ucyA9IE9iamVjdC5hc3NpZ24oZGVmYXVsdENvbmZpZywgdGhpcy5idXR0b25zQ29uZmlnKTtcbiAgICBzd2l0Y2ggKHRoaXMuY29uZmlnQnV0dG9ucy5zdHJhdGVneSkge1xuICAgICAgY2FzZSBCdXR0b25zU3RyYXRlZ3kuU0lNUExFOlxuICAgICAgICB0aGlzLmJ1dHRvbnMgPSB0aGlzLmFkZEJ1dHRvbklkcyh0aGlzLnNpbXBsZUJ1dHRvbnNEZWZhdWx0KTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIEJ1dHRvbnNTdHJhdGVneS5BRFZBTkNFRDpcbiAgICAgICAgdGhpcy5idXR0b25zID0gdGhpcy5hZGRCdXR0b25JZHModGhpcy5hZHZhbmNlZEJ1dHRvbnNEZWZhdWx0KTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIEJ1dHRvbnNTdHJhdGVneS5GVUxMOlxuICAgICAgICB0aGlzLmJ1dHRvbnMgPSB0aGlzLmFkZEJ1dHRvbklkcyh0aGlzLmZ1bGxCdXR0b25zRGVmYXVsdCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBCdXR0b25zU3RyYXRlZ3kuQ1VTVE9NOlxuICAgICAgICB0aGlzLmJ1dHRvbnMgPSB0aGlzLmFkZEJ1dHRvbklkcyh0aGlzLnZhbGlkYXRlQ3VzdG9tQnV0dG9ucyh0aGlzLmNvbmZpZ0J1dHRvbnMuYnV0dG9ucykpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgQnV0dG9uc1N0cmF0ZWd5LkRFRkFVTFQ6XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aGlzLmJ1dHRvbnMgPSB0aGlzLmFkZEJ1dHRvbklkcyh0aGlzLmRlZmF1bHRCdXR0b25zRGVmYXVsdCk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBNZXRob2QgY2FsbGVkIGJ5IGV2ZW50cyBmcm9tIGJvdGgga2V5Ym9hcmQgYW5kIG1vdXNlIG9uIGEgYnV0dG9uLlxuICAgKiBUaGlzIHdpbGwgY2FsbCBhIHByaXZhdGUgbWV0aG9kIHRvIHRyaWdnZXIgYW4gb3V0cHV0IHdpdGggdGhlIHJpZ2h0IHBheWxvYWQuXG4gICAqIEBwYXJhbSBJbnRlcm5hbEJ1dHRvbkNvbmZpZyBidXR0b24gdGhhdCBjYWxsZWQgdGhpcyBtZXRob2RcbiAgICogQHBhcmFtIEtleWJvYXJkRXZlbnQgfCBNb3VzZUV2ZW50IGV2ZW50IHBheWxvYWRcbiAgICogQHBhcmFtIEFjdGlvbiBhY3Rpb24gdGhhdCB0cmlnZ2VyZWQgdGhlIHNvdXJjZSBldmVudCBvciBgQWN0aW9uLkNMSUNLYCBpZiBub3Qgc3BlY2lmaWVkXG4gICAqIEB0aHJvd3MgYW4gZXJyb3IgaWYgdGhlIGJ1dHRvbiB0eXBlIGlzIHVua25vd25cbiAgICovXG4gIG9uRXZlbnQoYnV0dG9uOiBJbnRlcm5hbEJ1dHRvbkNvbmZpZywgZXZlbnQ6IEtleWJvYXJkRXZlbnQgfCBNb3VzZUV2ZW50LCBhY3Rpb246IEFjdGlvbiA9IEFjdGlvbi5DTElDSykge1xuICAgIGlmICghZXZlbnQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgZGF0YVRvRW1pdDogQnV0dG9uRXZlbnQgPSB7XG4gICAgICBidXR0b246IGJ1dHRvbixcbiAgICAgIC8vIGN1cnJlbnQgaW1hZ2UgaW5pdGlhbGl6ZWQgYXMgbnVsbFxuICAgICAgLy8gKEknbGwgZmlsbCB0aGlzIHZhbHVlIGluc2lkZSB0aGUgcGFyZW50IG9mIHRoaXMgY29tcG9uZW50XG4gICAgICBpbWFnZTogbnVsbCxcbiAgICAgIGFjdGlvbjogYWN0aW9uXG4gICAgfTtcbiAgICBzd2l0Y2ggKGJ1dHRvbi50eXBlfgB7XG4gICAgICAvLyBjYXNlIEJ1dHRvblR5cGUuUkVGUkVTSDpcbiAgICAgIC8vICAgdGhpcy50cmlnZ2VyT25Nb3VzZUFuZEtleWJvYXJkKHRoaXMucmVmcmVzaCwgZXZlbnQsIGRhdGFUb0VtaXQpO1xuICAgICAgLy8gICBicmVhaztcbiAgICAgIGNhc2UgQnV0dG9uVHlwZS5ERUxFVEU6XG4gICAgICAgIHRoaXMudHJpZ2dlck9uTW91c2VBbmRLZXlib2FyZCh0aGlzLmRlbGV0ZSwgZXZlbnQsIGRhdGFUb0VtaXQpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgQnV0dG9uVHlwZS5FWFRVUkw6XG4gICAgICAgIGlmICghdGhpcy5jdXJyZW50SW1hZ2UgfHwgIXRoaXMuY3VycmVudEltYWdlLm1vZGFsIHx8ICF0aGlzLmN1cnJlbnRJbWFnZS5tb2RhbC5leHRVcmwpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy50cmlnZ2VyT25Nb3VzZUFuZEtleWJvYXJkKHRoaXMubmF2aWdhdGUsIGV2ZW50LCBkYXRhVG9FbWl0KTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIEJ1dHRvblR5cGUuRE9XTkxPQUQ6XG4gICAgICAgIHRoaXMudHJpZ2dlck9uTW91c2VBbmRLZXlib2FyZCh0aGlzLmRvd25sb2FkLCBldmVudCwgZGF0YVRvRW1pdCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBCdXR0b25UeXBlLkNMT1NFOlxuICAgICAgICB0aGlzLnRyaWdnZXJPbk1vdXNlQW5fg2V5Ym9hcmQodGhpcy5jbG9zZSwgZXZlbnQsIGRhdGFUb0VtaXQpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgQnV0dG9uVHlwZS5DVVNUT006XG4gICAgICAgIHRoaXMudHJpZ2dlck9uTW91c2VBbmRLZXlib2FyZCh0aGlzLmN1c3RvbUVtaXQsIGV2ZW50LCBkYXRhVG9FbWl0KTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIEJ1dHRvblR5cGUuRlVMTFNDUkVFTjpcbiAgICAgICAgdGhpcy50cmlnZ2VyT25Nb3VzZUFuZEtleWJvYXJkKHRoaXMuZnVsbHNjcmVlbiwgZXZlbnQsIGRhdGFUb0VtaXQpO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgVW5rbm93biBidXR0b24ncyB0eXBlIGludG8gQnV0dG9uQ29uZmlnYCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIE1ldGhvZCB1c2VkIGluIHRoZSB0ZW1wbGF0ZSB0byB0cmFjayBpZHMgaW4gbmdGb3IuXG4gICAqIEBwYXJhbSBudW1iZXIgaW5kZXggb2YgdGhlIGFycmF5XG4gICAqIEBwYXJhbSBJbWFnZSBpdGVtIG9mIHRoZSBhcnJheVxuICAgKiBAcmV0dXJucyBudW1iZXIgdGhlIGlkIG9mIHRoZSBpdGVtIG9yIHVuZGVmaW5lZCBpZiB0aGUgaXRlbSBpcyBub3QgdmFsaWRcbiAgICovXG4gIHRyYWNrQnlJZChpbmRleDogbnVtYmVyLCBpdGVtOiBJbnRlcm5hbEJ1dHRvbkNvbmZpZyk6IG51bWJlciB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIGl0ZW0gPyBpdGVtLmlkIDogdW5kZWZpbmVkO1xuICB9XG5cbiAgLyoqXG4gICAqIFByaXZhdGUgbWV0aG9kIHRvIGVtaXQgYW4gZXZlbnQgdXNpbmcgdGhlIHNwZWNpZmllZCBvdXRwdXQgYXMgYW4gYEV2ZW50RW1pdHRlcmAuXG4gICAqIEBwYXJhbSBFdmVudEVtaXR0ZXI8QnV0dG9uRXZlbnQ+IGVtaXR0ZXIgaXMgdGhlIG91dHB1dCB0byBlbWl0IHRoZSBgQnV0dG9uRXZlbnRgXG4gICAqIEBwYXJhbSBLZXlib2FyZEV2ZW50IHwgTW91c2VFdmVudCBldmVudCBpcyB0aGUgc291cmNlIHRoYXQgdHJpZ2dlcmVkIHRoaXMgbWV0aG9kXG4gICAqIEBwYXJhbSBCdXR0b25FdmVudCBkYXRhVG9FbWl0IHBheWxvYWQgdG8gZW1pdFxuICAgKi9cbiAgcHJpdmF0ZSB0cmlnZ2VyT25Nb3VzZUFuZEtleWJvYXJkKGVtaXR0ZXI6IEV2ZW50RW1pdHRlcjxCdXR0b25FdmVudD4sIGV2ZW50OiBLZXlib2FyZEV2ZW50IHwgTW91c2VFdmVudCwgZGF0YVRvRW1pdDogQnV0dG9uRXZlbnQpIHtcbiAgICBpZiAoIWVtaXR0ZXIpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgVXBwZXJCdXR0b25zQ29tcG9uZW50IHVua25vd24gZW1pdHRlciBpbiB0cmlnZ2VyT25Nb3VzZUFuZEtleWJvYXJkYCk7XG4gICAgfVxuXG4gICAgY29uc3QgcmVzdWx0OiBudW1iZXIgPSBzdXBlci5oYW5kbGVJbWFnZUV2ZW50KGV2ZW50KTtcbiAgICBpZiAocmVzdWx0ID09PSBORVhUfgB7XG4gICAgICBlbWl0dGVyLmVtaXQoZGF0YVRvRW1pdCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFByaXZhdGUgbWV0aG9kIHRvIGFkZCBpZHMgdG8gdGhlIGFycmF5IG9mIGJ1dHRvbnMuXG4gICAqIEl0IGFkZHMgaWRzIGluIGEgcmV2ZXJzZSB3YXfgIHRvIGJlIHN1cmUgdGhhdCB0aGUgbGFzdCBidXR0b24gd2lsbCBhbHdheXMgaGF2ZSBpZCA9IDAuXG4gICAqIFRoaXMgaXMgcmVhbGx5IHVzZWZ1bCBpbiB1bml0IHRlc3RpbmcgdG8gYmUgc3VyZSB0aGF0IGNsb3NlIGJ1dHRvbiBhbHdheXMgaGF2ZSBpZCA9IDAsIGRvd25sb2FkIDEgYW5kIHNvIG9uLi4uXG4gICAqIEl0J3MgdG90YWxseSB0cmFuc3BhcmVudCB0byB0aGUgdXNlci5cbiAgICogQHBhcmFtIEJ1dHRvbkNvbmZpZ1tdIGJ1dHRvbnMgY29uZmlnIGFycmF5XG4gICAqIEByZXR1cm5zIEJ1dHRvbkNvbmZpZ1tdIHRoZSBpbnB1dCBhcnJheSB3aXRoIGluY3JlbWVudGFsIG51bWVyaWMgaWRzXG4gICAqL1xuICBwcml2YXRlIGFkZEJ1dHRvbklkcyhidXR0b25zOiBCdXR0b25Db25maWdbXSk6IEJ1dHRvbkNvbmZpZ1tdIHtcbiAgICByZXR1cm4gYnV0dG9ucy5tYXAoKHZhbDogQnV0dG9uQ29uZmlnLCBpOiBudW1iZXIpID0+IE9iamVjdC5hc3NpZ24odmFsLCB7IGlkOiBidXR0b25zLmxlbmd0aCAtIDEgLSBpIH0pKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQcml2YXRlIG1ldGhvZCB0byB2YWxpZGF0ZSBjdXN0b20gYnV0dG9ucyByZWNlaXZlZCBhcyBpbnB1dC5cbiAgICogQHBhcmFtIEJ1dHRvbkNvbmZpZ1tdIGJ1dHRvbnMgY29uZmlnIGFycmF5XG4gICAqIEByZXR1cm5zIEJ1dHRvbkNvbmZpZ1tdIHRoZSBzYW1lIGlucHV0IGJ1dHRvbnMgY29uZmlnIGFycmF5XG4gICAqIEB0aHJvd3MgYW4gZXJyb3IgaXMgZXhpc3RzIGEgYnV0dG9uIHdpdGggYW4gdW5rbm93biB0eXBlXG4gICAqL1xuICBwcml2YXRlIHZhbGlkYXRlQ3VzdG9tQnV0dG9ucyhidXR0b25zOiBCdXR0b25Db25maWdbXSA9IFtdKTogQnV0dG9uQ29uZmlnW10ge1xuICAgIGJ1dHRvbnMuZm9yRWFjaCgodmFsOiBCdXR0b25Db25maWcpID0+IHtcbiAgICAgIGNvbnN0IGluZGV4T2ZCdXR0b25UeXBlOiBudW1iZXIgPSBXSElURUxJU1RfQlVUVE9OX1RZUEVTLmZpbmRJbmRleCgodHlwZTogQnV0dG9uVHlwZSkgPT4gdHlwZSA9PT0gdmFsLnR5cGUpO1xuICAgICAgaWYgKGluZGV4T2ZCdXR0b25UeXBlID09PSAtMSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFVua25vd24gQnV0dG9uVHlwZS4gRm9yIGN1c3RvbSB0eXBlcyB1c2UgQnV0dG9uVHlwZS5DVVNUT01gKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gYnV0dG9ucztcbiAgfVxufVxuIiwiLypcbiBUaGUgTUlUIExpY2Vuc2UgKE1JVClcblxuIENvcHlyaWdodCAoYykgMjAxNy0yMDE4IFN0ZWZhbm8gQ2FwcGEgKEtzODkpXG5cbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwifgwgdG8gZGVhbFxuIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbiB0byB1c2UsIGNvcHfgIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcblxuIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIGFsbFxuIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG5cbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFfgXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTiBJTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiBMSUFCSUxJVFfgIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFXG4gU09GVFdBUkUuXG4gKi9cblxuaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3fgIENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25Jbml0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgQWNjZXNzaWJsZUNvbXBvbmVudCB9IGZyb20gJy4uL2FjY2Vzc2libGUuY29tcG9uZW50JztcblxuaW1wb3J0IHsgQWNjZXNzaWJpbGl0eUNvbmZpZyB9IGZyb20gJy4uLy4uL21vZGVsL2FjY2Vzc2liaWxpdHkuaW50ZXJmYWNlJztcbmltcG9ydCB7IEltYWdlIH0gZnJvbSAnLi4vLi4vbW9kZWwvaW1hZ2UuY2xhc3MnO1xuaW1wb3J0IHsgSW50ZXJuYWxMaWJJbWFnZSB9IGZyb20gJy4uLy4uL21vZGVsL2ltYWdlLWludGVybmFsLmNsYXNzJztcbmltcG9ydCB7IERvdHNDb25maWcgfSBmcm9tICcuLi8uLi9tb2RlbC9kb3RzLWNvbmZpZy5pbnRlcmZhY2UnO1xuXG5pbXBvcnQgeyBORVhUIH0gZnJvbSAnLi4vLi4vdXRpbHMvdXNlci1pbnB1dC51dGlsJztcbmltcG9ydCB7IGdldEluZGV4IH0gZnJvbSAnLi4vLi4vdXRpbHMvaW1hZ2UudXRpbCc7XG5cbi8qKlxuICogQ29tcG9uZW50IHdpdGggY2xpY2thYmxlIGRvdHMgKHNtYWxsIGNpcmNsZXMpIHRvIG5hdmlnYXRlIGJldHdlZW4gaW1hZ2VzIGluc2lkZSB0aGUgbW9kYWwgZ2FsbGVyeS5cbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAna3MtZG90cycsXG4gIHN0eWxlVXJsczogWydkb3RzLnNjc3MnXSxcbiAgdGVtcGxhdGVVcmw6ICdkb3RzLmh0bWwnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBEb3RzQ29tcG9uZW50IGV4dGVuZHMgQWNjZXNzaWJsZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIC8qKlxuICAgKiBPYmplY3Qgb2YgdHlwZSBgSW50ZXJuYWxMaWJJbWFnZWAgdGhhdCByZXByZXNlbnQgdGhlIHZpc2libGUgaW1hZ2UuXG4gICAqL1xuICBASW5wdXQofgBjdXJyZW50SW1hZ2U6IEludGVybmFsTGliSW1hZ2U7XG4gIC8qKlxuICAgKiBBcnJheSBvZiBgSW50ZXJuYWxMaWJJbWFnZWAgdGhhdCByZXByZXNlbnQgdGhlIG1vZGVsIG9mIHRoaXMgbGlicmFyeSB3aXRoIGFsbCBpbWFnZXMsXG4gICAqIHRodW1icyBhbmQgc28gb24uXG4gICAqL1xuICBASW5wdXQofgBpbWFnZXM6IEludGVybmFsTGliSW1hZ2VbXTtcbiAgLyoqXG4gICAqIE9iamVjdCBvZiB0eXBlIGBEb3RzQ29uZmlnYCB0byBpbml0IERvdHNDb21wb25lbnQncyBmZWF0dXJlcy5cbiAgICogRm9yIGluc3RhbmNlLCBpdCBjb250YWlucyBhIHBhcmFtIHRvIHNob3cvaGlkZSB0aGlzIGNvbXBvbmVudC5cbiAgICovXG4gIEBJbnB1dCgpIGRvdHNDb25maWc6IERvdHNDb25maWcgPSB7IHZpc2libGU6IHRydWUgfTtcbiAgLyoqXG4gICAqIE9iamVjdCBvZiB0eXBlIGBBY2Nlc3NpYmlsaXR5Q29uZmlnYCB0byBpbml0IGN1c3RvbSBhY2Nlc3NpYmlsaXR5IGZlYXR1cmVzLlxuICAgKiBGb3IgaW5zdGFuY2UsIGl0IGNvbnRhaW5zIHRpdGxlcywgYWx0IHRleHRzLCBhcmlhLWxhYmVscyBhbmQgc28gb24uXG4gICAqL1xuICBASW5wdXQofgBhY2Nlc3NpYmlsaXR5Q29uZmlnOiBBY2Nlc3NpYmlsaXR5Q29uZmlnO1xuICAvKipcbiAgICogT3V0cHV0IHRvIGVtaXQgY2xpY2tzIG9uIGRvdHMuIFRoZSBwYXlsb2FkIGNvbnRhaW5zIGEgbnVtYmVyIHRoYXQgcmVwcmVzZW50XG4gICAqIHRoZSBpbmRleCBvZiB0aGUgY2xpY2tlZCBkb3QuXG4gICAqL1xuICBAT3V0cHV0KCkgY2xpY2tEb3Q6IEV2ZW50RW1pdHRlcjxudW1iZXI+ID0gbmV3IEV2ZW50RW1pdHRlcjxudW1iZXI+KCk7XG5cbiAgLyoqXG4gICAqIE9iamVjdCBvZiB0eXBlIGBEb3RzQ29uZmlnYCBleHBvc2VkIHRvIHRoZSB0ZW1wbGF0ZS4gVGhpcyBmaWVsZCBpcyBpbml0aWFsaXplZFxuICAgKiBhcHBseWluZyB0cmFuc2Zvcm1hdGlvbnMsIGRlZmF1bHQgdmFsdWVzIGFuZCBzbyBvbiB0byB0aGUgaW5wdXQgb2YgdGhlIHNhbWUgdHlwZS5cbiAgICovXG4gIGNvbmZpZ0RvdHM6IERvdHNDb25maWc7XG5cbiAgLyoqXG4gICAqIE1ldGhvZCDDgsK0bmdPbkluaXTDgsK0IHRvIGJ1aWxkIGBjb25maWdEb3RzYCBhcHBseWluZyBhIGRlZmF1bHQgdmFsdWUuXG4gICAqIFRoaXMgaXMgYW4gQW5ndWxhcidzIGxpZmVjeWNsZSBob29rLCBzbyBpdHMgY2FsbGVkIGF1dG9tYXRpY2FsbHkgYnkgQW5ndWxhciBpdHNlbGYuXG4gICAqIEluIHBhcnRpY3VsYXIsIGl0J3MgY2FsbGVkIG9ubHkgb25lIHRpbWUhISFcbiAgICovXG4gIG5nT25Jbml0KCkge1xuICAgIGNvbnN0IGRlZmF1bHRDb25maWc6IERvdHNDb25maWcgPSB7IHZpc2libGU6IHRydWUgfTtcbiAgICB0aGlzLmNvbmZpZ0RvdHMgPSBPYmplY3QuYXNzaWduKGRlZmF1bHRDb25maWcsIHRoaXMuZG90c0NvbmZpZyk7XG4gIH1cblxuICAvKipcbiAgICogTWV0aG9kIHRvIGNoZWNrIGlmIGFuIGltYWdlIGlzIGFjdGl2ZSAoaS5lLiB0aGUgY3VycmVudCBpbWFnZSkuXG4gICAqIEl0IGNoZWNrcyBjdXJyZW50SW1hZ2UgYW5kIGltYWdlcyB0byBwcmV2ZW50IGVycm9ycy5cbiAgICogQHBhcmFtIG51bWJlciBpbmRleCBvZiB0aGUgaW1hZ2UgdG8gY2hlY2sgaWYgaXQncyBhY3RpdmUgb3Igbm90XG4gICAqIEByZXR1cm5zIGJvb2xlYW4gdHJ1ZSBpZiBpcyBhY3RpdmUgKGFuZCBpbnB1dCBwYXJhbXMgYXJlIHZhbGlkfgwgZmFsc2Ugb3RoZXJ3aXNlXG4gICAqL1xuICBpc0FjdGl2ZShpbmRleDogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgaWYgKCF0aGlzLmN1cnJlbnRJbWFnZSB8fCAhdGhpcy5pbWFnZXMgfHwgdGhpcy5pbWFnZXMubGVuZ3RoID09PSAwfgB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGxldCBpbWFnZUluZGV4OiBudW1iZXI7XG4gICAgdHJ5IHtcbiAgICAgIGltYWdlSW5kZXggPSBnZXRJbmRleCh0aGlzLmN1cnJlbnRJbWFnZSwgdGhpcy5pbWFnZXMpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgY29uc29sZS5lcnJvcihgSW50ZXJuYWwgZXJyb3Igd2hpbGUgdHJ5aW5nIHRvIHNob3cgdGhlIGFjdGl2ZSAnZG90J2AsIGVycik7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiBpbmRleCA9PT0gaW1hZ2VJbmRleDtcbiAgfVxuXG4gIC8qKlxuICAgKiBNZXRob2QgY2FsbGVkIGJ5IGV2ZW50cyBmcm9tIGtleWJvYXJkIGFuZCBtb3VzZS5cbiAgICogQHBhcmFtIG51bWJlciBpbmRleCBvZiB0aGUgZG90XG4gICAqIEBwYXJhbSBLZXlib2FyZEV2ZW50IHwgTW91c2VFdmVudCBldmVudCBwYXlsb2FkXG4gICAqL1xuICBvbkRvdEV2ZW50KGluZGV4OiBudW1iZXIsIGV2ZW50OiBLZXlib2FyZEV2ZW50IHwgTW91c2VFdmVudCkge1xuICAgIGNvbnN0IHJlc3VsdDogbnVtYmVyID0gc3VwZXIuaGFuZGxlSW1hZ2VFdmVudChldmVudCk7XG4gICAgaWYgKHJlc3VsdCA9PT0gTkVYVCkge1xuICAgICAgdGhpcy5jbGlja0RvdC5lbWl0KGluZGV4KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogTWV0aG9kIHVzZWQgaW4gdGhlIHRlbXBsYXRlIHRvIHRyYWNrIGlkcyBpbiBuZ0Zvci5cbiAgICogQHBhcmFtIG51bWJlciBpbmRleCBvZiB0aGUgYXJyYXlcbiAgICogQHBhcmFtIEltYWdlIGl0ZW0gb2YgdGhlIGFycmF5XG4gICAqIEByZXR1cm5zIG51bWJlciB0aGUgaWQgb2YgdGhlIGl0ZW1cbiAgICovXG4gIHRyYWNrQnlJZChpbmRleDogbnVtYmVyLCBpdGVtOiBJbWFnZSk6IG51bWJlciB7XG4gICAgcmV0dXJuIGl0ZW0uaWQ7XG4gIH1cbn1cbiIsIi8qXG4gVGhlIE1JVCBMaWNlbnNlIChNSVQpXG5cbiBDb3B5cmlnaHQgKGMpIDIwMTctMjAxOCBTdGVmYW5vIENhcHBhIChLczg5KVxuXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIifgIHRvIGRlYWxcbiBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4gdG8gdXNlLCBjb3B5LCBtb2RpZnfgIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG5cbiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBhbGxcbiBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT04gSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRVxuIFNPRlRXQVJFLlxuICovXG5cbmltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uQ2hhbmdlcywgT25Jbml0LCBPdXRwdXQsIFNpbXBsZUNoYW5nZSwgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBBY2Nlc3NpYmxlQ29tcG9uZW50IH0gZnJvbSAnLi4vYWNjZXNzaWJsZS5jb21wb25lbnQnO1xuXG5pbXBvcnQgeyBBY2Nlc3NpYmlsaXR5Q29uZmlnIH0gZnJvbSAnLi4vLi4vbW9kZWwvYWNjZXNzaWJpbGl0eS5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgSW1hZ2UgfSBmcm9tICcuLi8uLi9tb2RlbC9pbWFnZS5jbGFzcyc7XG5pbXBvcnQgeyBJbnRlcm5hbExpYkltYWdlIH0gZnJvbSAnLi4vLi4vbW9kZWwvaW1hZ2UtaW50ZXJuYWwuY2xhc3MnO1xuaW1wb3J0IHsgU2l6ZSB9IGZyb20gJy4uLy4uL21vZGVsL3NpemUuaW50ZXJmYWNlJztcbmltcG9ydCB7IFByZXZpZXdDb25maWcgfSBmcm9tICcuLi8uLi9tb2RlbC9wcmV2aWV3LWNvbmZpZy5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgU2xpZGVDb25maWcgfSBmcm9tICcuLi8uLi9tb2RlbC9zbGlkZS1jb25maWcuaW50ZXJmYWNlJztcblxuaW1wb3J0IHsgTkVYVCwgUFJFViB9IGZyb20gJy4uLy4uL3V0aWxzL3VzZXItaW5wdXQudXRpbCc7XG5pbXBvcnQgeyBnZXRJbmRleCB9IGZyb20gJy4uLy4uL3V0aWxzL2ltYWdlLnV0aWwnO1xuXG4vKipcbiAqIENvbXBvbmVudCB3aXRoIGltYWdlIHByZXZpZXdzXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2tzLXByZXZpZXdzJyxcbiAgc3R5bGVVcmxzOiBbJ3ByZXZpZXdzLnNjc3MnLCAncHJldmlld3MtYXJyb3dzLnNjc3MnXSxcbiAgdGVtcGxhdGVVcmw6ICdwcmV2aWV3cy5odG1sJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgUHJldmlld3NDb21wb25lbnQgZXh0ZW5kcyBBY2Nlc3NpYmxlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMge1xuICAvKipcbiAgICogT2JqZWN0IG9mIHR5cGUgYEludGVybmFsTGliSW1hZ2VgIHRoYXQgcmVwcmVzZW50IHRoZSB2aXNpYmxlIGltYWdlLlxuICAgKi9cbiAgQElucHV0KClcbiAgY3VycmVudEltYWdlOiBJbnRlcm5hbExpYkltYWdlO1xuICAvKipcbiAgICogQXJyYXkgb2YgYEludGVybmFsTGliSW1hZ2VgIHRoYXQgcmVwcmVzZW50IHRoZSBtb2RlbCBvZiB0aGlzIGxpYnJhcnkgd2l0aCBhbGwgaW1hZ2VzLFxuICAgKiB0aHVtYnMgYW5kIHNvIG9uLlxuICAgKi9cbiAgQElucHV0KClcbiAgaW1hZ2VzOiBJbnRlcm5hbExpYkltYWdlW107XG4gIC8qKlxuICAgKiBPYmplY3Qgb2YgdHlwZSBgU2xpZGVDb25maWdgIHRvIGdldCBgaW5maW5pdGUgc2xpZGluZ2AuXG4gICAqL1xuICBASW5wdXQoKVxuICBzbGlkZUNvbmZpZzogU2xpZGVDb25maWc7XG4gIC8qKlxuICAgKiBPYmplY3Qgb2YgdHlwZSBgUHJldmlld0NvbmZpZ2AgdG8gaW5pdCBQcmV2aWV3c0NvbXBvbmVudCdzIGZlYXR1cmVzLlxuICAgKiBGb3IgaW5zdGFuY2UsIGl0IGNvbnRhaW5zIGEgcGFyYW0gdG8gc2hvdy9oaWRlIHRoaXMgY29tcG9uZW50LCBzaXplcy5cbiAgICovXG4gIEBJbnB1dCgpXG4gIHByZXZpZXdDb25maWc6IFByZXZpZXdDb25maWc7XG4gIC8qKlxuICAgKiBPYmplY3Qgb2YgdHlwZSBgQWNjZXNzaWJpbGl0eUNvbmZpZ2AgdG8gaW5pdCBjdXN0b20gYWNjZXNzaWJpbGl0eSBmZWF0dXJlcy5cbiAgICogRm9yIGluc3RhbmNlLCBpdCBjb250YWlucyB0aXRsZXMsIGFsdCB0ZXh0cywgYXJpYS1sYWJlbHMgYW5kIHNvIG9uLlxuICAgKi9cbiAgQElucHV0KClcbiAgYWNjZXNzaWJpbGl0eUNvbmZpZzogQWNjZXNzaWJpbGl0eUNvbmZpZztcbiAgLyoqXG4gICAqIE91dHB1dCB0byBlbWl0IHRoZSBjbGlja2VkIHByZXZpZXcuIFRoZSBwYXlsb2FkIGNvbnRhaW5zIHRoZSBgSW50ZXJuYWxMaWJJbWFnZWAgYXNzb2NpYXRlZCB0byB0aGUgY2xpY2tlZCBwcmV2aWV3LlxuICAgKi9cbiAgQE91dHB1dCgpXG4gIGNsaWNrUHJldmlldzogRXZlbnRFbWl0dGVyPEludGVybmFsTGliSW1hZ2U+ID0gbmV3IEV2ZW50RW1pdHRlcjxJbnRlcm5hbExpYkltYWdlPigpO1xuXG4gIC8qKlxuICAgKiBBcnJheSBvZiBgSW50ZXJuYWxMaWJJbWFnZWAgZXhwb3NlZCB0byB0aGUgdGVtcGxhdGUuIFRoaXMgZmllbGQgaXMgaW5pdGlhbGl6ZWRcbiAgICogYXBwbHlpbmcgdHJhbnNmb3JtYXRpb25zLCBkZWZhdWx0IHZhbHVlcyBhbmQgc28gb24gdG8gdGhlIGlucHV0IG9mIHRoZSBzYW1lIHR5cGUuXG4gICAqL1xuICBwcmV2aWV3czogSW50ZXJuYWxMaWJJbWFnZVtdID0gW107XG4gIC8qKlxuICAgKiBPYmplY3Qgb2YgdHlwZSBgUHJldmlld0NvbmZpZ2AgZXhwb3NlZCB0byB0aGUgdGVtcGxhdGUuIFRoaXMgZmllbGQgaXMgaW5pdGlhbGl6ZWRcbiAgICogYXBwbHlpbmcgdHJhbnNmb3JtYXRpb25zLCBkZWZhdWx0IHZhbHVlcyBhbmQgc28gb24gdG8gdGhlIGlucHV0IG9mIHRoZSBzYW1lIHR5cGUuXG4gICAqL1xuICBjb25maWdQcmV2aWV3OiBQcmV2aWV3Q29uZmlnO1xuXG4gIC8qKlxuICAgKiBTdGFydCBpbmRleCBvZiB0aGUgaW5wdXQgaW1hZ2VzIHVzZWQgdG8gZGlzcGxheSBwcmV2aWV3cy5cbiAgICovXG4gIHN0YXJ0OiBudW1iZXI7XG4gIC8qKlxuICAgKiBFbmQgaW5kZXggb2YgdGhlIGlucHV0IGltYWdlcyB1c2VkIHRvIGRpc3BsYXkgcHJldmlld3MuXG4gICAqL1xuICBlbmQ6IG51bWJlcjtcblxuICAvKipcbiAgICogRGVmYXVsdCBwcmV2aWV3J3Mgc2l6ZSBvYmplY3QsIGFsc28gdXNlZCBpbiB0aGUgdGVtcGxhdGUgdG8gYXBwbHkgZGVmYXVsdCBzaXplcyB0byBrc1NpemUncyBkaXJlY3RpdmUuXG4gICAqL1xuICBkZWZhdWx0UHJldmlld1NpemU6IFNpemUgPSB7IGhlaWdodDogJzUwcHgnLCB3aWR0aDogJ2F1dG8nIH07XG5cbiAgLyoqXG4gICAqIERlZmF1bHQgcHJldmlldydzIGNvbmZpZyBvYmplY3RcbiAgICovXG4gIHByaXZhdGUgZGVmYXVsdFByZXZpZXdDb25maWc6IFByZXZpZXdDb25maWcgPSB7XG4gICAgdmlzaWJsZTogdHJ1ZSxcbiAgICBudW1iZXI6IDMsXG4gICAgYXJyb3dzOiB0cnVlLFxuICAgIGNsaWNrYWJsZTogdHJ1ZSxcbiAgICAvLyBhbHdheXNDZW50ZXI6IGZhbHNlLCAvLyBUT0RPIHN0aWxsIG5vdCBpbXBsZW1lbnRlZFxuICAgIHNpemU6IHRoaXMuZGVmYXVsdFByZXZpZXdTaXplXG4gIH07XG5cbiAgLyoqXG4gICAqIE1ldGhvZCDDgsK0bmdPbkluaXTDgsK0IHRvIGJ1aWxkIGBjb25maWdQcmV2aWV3YCBhcHBseWluZyBhIGRlZmF1bHQgdmFsdWUgYW5kIGFsc28gdG9cbiAgICogaW5pdCB0aGUgYHByZXZpZXdzYCBhcnJheS5cbiAgICogVGhpcyBpcyBhbiBBbmd1bGFyJ3MgbGlmZWN5Y2xlIGhvb2ssIHNvIGl0cyBjYWxsZWQgYXV0b21hdGljYWxseSBieSBBbmd1bGFyIGl0c2VsZi5cbiAgICogSW4gcGFydGljdWxhciwgaXQncyBjYWxsZWQgb25seSBvbmUgdGltZSEhIVxuICAgKi9cbiAgbmdPbkluaXQofgB7XG4gICAgdGhpcy5jb25maWdQcmV2aWV3ID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5kZWZhdWx0UHJldmlld0NvbmZpZywgdGhpcy5wcmV2aWV3Q29uZmlnKTtcblxuICAgIC8vIGlmIG51bWJlciBpcyA8PSAwIHJlc2V0IHRvIGRlZmF1bHRcbiAgICBpZiAodGhpcy5jb25maWdQcmV2aWV3ICYmIHRoaXMuY29uZmlnUHJldmlldy5udW1iZXIgJiYgdGhpcy5jb25maWdQcmV2aWV3Lm51bWJlciA8PSAwfgB7XG4gICAgICB0aGlzLmNvbmZpZ1ByZXZpZXcubnVtYmVyID0gdGhpcy5kZWZhdWx0UHJldmlld0NvbmZpZy5udW1iZXI7XG4gICAgfVxuXG4gICAgLy8gaW5pdCBwcmV2aWV3cyBiYXNlZCBvbiBjdXJyZW50SW1hZ2UgYW5kIHRoZSBmdWxsIGFycmF5IG9mIGltYWdlc1xuICAgIHRoaXMuaW5pdFByZXZpZXdzKHRoaXMuY3VycmVudEltYWdlLCB0aGlzLmltYWdlcyk7XG4gIH1cblxuICAvKipcbiAgICogTWV0aG9kIHRvIGNoZWNrIGlmIGFuIGltYWdlIGlzIGFjdGl2ZSAoaS5lLiBhIHByZXZpZXcgaW1hZ2UpLlxuICAgKiBAcGFyYW0gSW50ZXJuYWxMaWJJbWFnZSBwcmV2aWV3IGlzIGFuIGltYWdlIHRvIGNoZWNrIGlmIGl0J3MgYWN0aXZlIG9yIG5vdFxuICAgKiBAcmV0dXJucyBib29sZWFuIHRydWUgaWYgaXMgYWN0aXZlLCBmYWxzZSBvdGhlcndpc2VcbiAgICovXG4gIGlzQWN0aXZlKHByZXZpZXc6IEludGVybmFsTGliSW1hZ2UpOiBib29sZWFuIHtcbiAgICBpZiAoIXByZXZpZXcgfHwgIXRoaXMuY3VycmVudEltYWdlfgB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiBwcmV2aWV3LmlkID09PSB0aGlzLmN1cnJlbnRJbWFnZS5pZDtcbiAgfVxuXG4gIC8vIFRPRE8gaW1wcm92ZSB0aGlzIG1ldGhvZCB0byBzaW1wbGlmeSB0aGUgc291cmNlY29kZSArIHJlbW92ZSBkdXBsaWNhdGVkIGNvZGVsaW5lc1xuICAvKipcbiAgICogTWV0aG9kIMOCwrRuZ09uQ2hhbmdlc8OCwrQgdG8gdXBkYXRlIGBwcmV2aWV3c2AgYXJyYXkuXG4gICAqIEFsc28sIGJvdGggYHN0YXJ0YCBhbmQgYGVuZGAgbG9jYWwgdmFyaWFibGVzIHdpbGwgYmUgdXBkYXRlZCBhY2NvcmRpbmdseS5cbiAgICogVGhpcyBpcyBhbiBBbmd1bGFyJ3MgbGlmZWN5Y2xlIGhvb2ssIHNvIGl0cyBjYWxsZWQgYXV0b21hdGljYWxseSBieSBBbmd1bGFyIGl0c2VsZi5cbiAgICogSW4gcGFydGljdWxhciwgaXQncyBjYWxsZWQgd2hlbiBhbnkgZGF0YS1ib3VuZCBwcm9wZXJ0eSBvZiBhIGRpcmVjdGl2ZSBjaGFuZ2VzISEhXG4gICAqL1xuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzfgB7XG4gICAgY29uc3QgaW1hZ2VzOiBTaW1wbGVDaGFuZ2UgPSBjaGFuZ2VzLmltYWdlcztcbiAgICBjb25zdCBjdXJyZW50SW1hZ2U6IFNpbXBsZUNoYW5nZSA9IGNoYW5nZXMuY3VycmVudEltYWdlO1xuXG4gICAgbGV0IHByZXY7XG4gICAgbGV0IGN1cnJlbnQ7XG5cbiAgICBpZiAoY3VycmVudEltYWdlfgB7XG4gICAgICBwcmV2ID0gY3VycmVudEltYWdlLnByZXZpb3VzVmFsdWU7XG4gICAgICBjdXJyZW50ID0gY3VycmVudEltYWdlLmN1cnJlbnRWYWx1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgY3VycmVudCA9IHRoaXMuY3VycmVudEltYWdlO1xuICAgIH1cblxuICAgIGlmIChjdXJyZW50ICYmIGltYWdlcyAmJiBpbWFnZXMucHJldmlvdXNWYWx1ZSAmJiBpbWFnZXMuY3VycmVudFZhbHVlfgB7XG4gICAgICAvLyBJJ20gaW4gdGhpcyBpZiBzdGF0ZW1lbnQsIGlmIGlucHV0IGltYWdlcyBhcmUgY2hhbmdlZCAoZm9yIGluc3RhbmNlLCBiZWNhdXNlIEkgcmVtb3ZlZCBvbmUgb2YgdGhlbSB3aXRoIHRoZSAnZGVsZXRlIGJ1dHRvbicsXG4gICAgICAvLyBvciBiZWNhdXNlIHVzZXJzIGNoYW5nZWQgdGhlIGltYWdlcyBhcnJheSB3aGlsZSBtb2RhbCBnYWxsZXJ5IGlzIHN0aWxsIG9wZW4pLlxuICAgICAgLy8gSW4gdGhpcyBjYXNlLCBJIGhhdmUgdG8gcmUtaW5pdCBwcmV2aWV3cywgYmVjYXVzZSB0aGUgaW5wdXQgYXJyYXkgb2YgaW1hZ2VzIGlzIGNoYW5nZWQuXG4gICAgICB0aGlzLmluaXRQcmV2aWV3cyhjdXJyZW50LCBpbWFnZXMuY3VycmVudFZhbHVlKTtcbiAgICB9XG5cbiAgICBpZiAocHJldiAmJiBjdXJyZW50ICYmIHByZXYuaWQgIT09IGN1cnJlbnQuaWQpIHtcbiAgICAgIHRoaXMudXBkYXRlUHJldmlld3MocHJldiwgY3VycmVudCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIE1ldGhvZCBjYWxsZWQgYnkgZXZlbnRzIGZyb20gYm90aCBrZXlib2FyZCBhbmQgbW91c2Ugb24gYSBwcmV2aWV3LlxuICAgKiBUaGlzIHdpbGwgdHJpZ2dlciB0aGUgYGNsaWNrcHJldmlld2Agb3V0cHV0IHdpdGggdGhlIGlucHV0IHByZXZpZXcgYXMgaXRzIHBheWxvYWQuXG4gICAqIEBwYXJhbSBJbnRlcm5hbExpYkltYWdlIHByZXZpZXcgdGhhdCB0cmlnZ2VyZWQgdGhpcyBtZXRob2RcbiAgICogQHBhcmFtIEtleWJvYXJkRXZlbnQgfCBNb3VzZUV2ZW50IGV2ZW50IHBheWxvYWRcbiAgICovXG4gIG9uSW1hZ2VFdmVudChwcmV2aWV3OiBJbnRlcm5hbExpYkltYWdlLCBldmVudDogS2V5Ym9hcmRFdmVudCB8IE1vdXNlRXZlbnQpIHtcbiAgICBpZiAoIXRoaXMuY29uZmlnUHJldmlldyB8fCAhdGhpcy5jb25maWdQcmV2aWV3LmNsaWNrYWJsZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCByZXN1bHQ6IG51bWJlciA9IHN1cGVyLmhhbmRsZUltYWdlRXZlbnQoZXZlbnQpO1xuICAgIGlmIChyZXN1bHQgPT09IE5FWFQpIHtcbiAgICAgIHRoaXMuY2xpY2tQcmV2aWV3LmVtaXQocHJldmlldyk7XG4gICAgfSBlbHNlIGlmIChyZXN1bHQgPT09IFBSRVYpIHtcbiAgICAgIHRoaXMuY2xpY2tQcmV2aWV3LmVtaXQocHJldmlldyk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIE1ldGhvZCBjYWxsZWQgYnkgZXZlbnRzIGZyb20gYm90aCBrZXlib2FyZCBhbmQgbW91c2Ugb24gYSBuYXZpZ2F0aW9uIGFycm93LlxuICAgKiBAcGFyYW0gc3RyaW5nIGRpcmVjdGlvbiBvZiB0aGUgbmF2aWdhdGlvbiB0aGF0IGNhbiBiZSBlaXRoZXIgJ25leHQnIG9yICdwcmV2J1xuICAgKiBAcGFyYW0gS2V5Ym9hcmRFdmVudCB8IE1vdXNlRXZlbnQgZXZlbnQgcGF5bG9hZFxuICAgKi9cbiAgb25OYXZpZ2F0aW9uRXZlbnQoZGlyZWN0aW9uOiBzdHJpbmcsIGV2ZW50OiBLZXlib2FyZEV2ZW50IHwgTW91c2VFdmVudCkge1xuICAgIGNvbnN0IHJlc3VsdDogbnVtYmVyID0gc3VwZXIuaGFuZGxlTmF2aWdhdGlvbkV2ZW50KGRpcmVjdGlvbiwgZXZlbnQpO1xuICAgIGlmIChyZXN1bHQgPT09IE5FWFQpIHtcbiAgICAgIHRoaXMubmV4dCgpO1xuICAgIH0gZWxzZSBpZiAocmVzdWx0ID09PSBQUkVWfgB7XG4gICAgICB0aGlzLnByZXZpb3VzKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIE1ldGhvZCB1c2VkIGluIHRoZSB0ZW1wbGF0ZSB0byB0cmFjayBpZHMgaW4gbmdGb3IuXG4gICAqIEBwYXJhbSBudW1iZXIgaW5kZXggb2YgdGhlIGFycmF5XG4gICAqIEBwYXJhbSBJbWFnZSBpdGVtIG9mIHRoZSBhcnJheVxuICAgKiBAcmV0dXJucyBudW1iZXIgdGhlIGlkIG9mIHRoZSBpdGVtXG4gICAqL1xuICB0cmFja0J5SWQoaW5kZXg6IG51bWJlciwgaXRlbTogSW1hZ2UpOiBudW1iZXIge1xuICAgIHJldHVybiBpdGVtLmlkO1xuICB9XG5cbiAgLyoqXG4gICAqIFByaXZhdGUgbWV0aG9kIHRvIGluaXQgcHJldmlld3MgYmFzZWQgb24gdGhlIGN1cnJlbnRJbWFnZSBhbmQgdGhlIGZ1bGwgYXJyYXkgb2YgaW1hZ2VzLlxuICAgKiBUaGUgY3VycmVudCBpbWFnZSBpbiBtYW5kYXRvcnkgdG8gc2hvdyBhbHdheXMgdGhlIGN1cnJlbnQgcHJldmlldyAoYXMgaGlnaGxpZ2h0ZWQpLlxuICAgKiBAcGFyYW0gSW50ZXJuYWxMaWJJbWFnZSBjdXJyZW50SW1hZ2UgdG8gZGVjaWRlIGhvdyB0byBzaG93IHByZXZpZXdzLCBiZWNhdXNlIEkgYWx3YXlzIHdhbnQgdG8gc2VlIHRoZSBjdXJyZW50IGltYWdlIGFzIGhpZ2hsaWdodGVkXG4gICAqIEBwYXJhbSBJbnRlcm5hbExpYkltYWdlW10gaW1hZ2VzIGlzIHRoZSBhcnJheSBvZiBhbGwgaW1hZ2VzLlxuICAgKi9cbiAgcHJpdmF0ZSBpbml0UHJldmlld3MoY3VycmVudEltYWdlOiBJbnRlcm5hbExpYkltYWdlLCBpbWFnZXM6IEludGVybmFsTGliSW1hZ2VbXSkge1xuICAgIGxldCBpbmRleDogbnVtYmVyO1xuICAgIHRyeSB7XG4gICAgICBpbmRleCA9IGdldEluZGV4KGN1cnJlbnRJbWFnZSwgaW1hZ2VzKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHRocm93IGVycjtcbiAgICB9XG4gICAgc3dpdGNoIChpbmRleCkge1xuICAgICAgY2FzZSAwOlxuICAgICAgICAvLyBmaXJzdCBpbWFnZVxuICAgICAgICB0aGlzLnNldEJlZ2lubmluZ0luZGV4ZXNQcmV2aWV3cygpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgaW1hZ2VzLmxlbmd0aCAtIDE6XG4gICAgICAgIC8vIGxhc3QgaW1hZ2VcbiAgICAgICAgdGhpcy5zZXRFbmRJbmRleGVzUHJldmlld3MoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICAvLyBvdGhlciBpbWFnZXNcbiAgICAgICAgdGhpcy5zZXRJbmRleGVzUHJldmlld3MoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIHRoaXMucHJldmlld3MgPSBpbWFnZXMuZmlsdGVyKChpbWc6IEludGVybmFsTGliSW1hZ2UsIGk6IG51bWJlcikgPT4gaSA+PSB0aGlzLnN0YXJ0ICYmIGkgPCB0aGlzLmVuZCk7XG4gIH1cblxuICAvKipcbiAgICogUHJpdmF0ZSBtZXRob2QgdG8gaW5pdCBib3RoIGBzdGFydGAgYW5kIGBlbmRgIHRvIHRoZSBiZWdpbm5pbmcuXG4gICAqL1xuICBwcml2YXRlIHNldEJlZ2lubmluZ0luZGV4ZXNQcmV2aWV3cygpIHtcbiAgICB0aGlzLnN0YXJ0ID0gMDtcbiAgICB0aGlzLmVuZCA9IE1hdGgubWluKDxudW1iZXI+dGhpcy5jb25maWdQcmV2aWV3Lm51bWJlciwgdGhpcy5pbWFnZXMubGVuZ3RoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQcml2YXRlIG1ldGhvZCB0byBpbml0IGJvdGggYHN0YXJ0YCBhbmQgYGVuZGAgdG8gdGhlIGVuZC5cbiAgICovXG4gIHByaXZhdGUgc2V0RW5fgW5kZXhlc1ByZXZpZXdzKCkge1xuICAgIHRoaXMuc3RhcnQgPSB0aGlzLmltYWdlcy5sZW5ndGggLSAxIC0gKDxudW1iZXI+dGhpcy5jb25maWdQcmV2aWV3Lm51bWJlciAtIDEpO1xuICAgIHRoaXMuZW5kID0gdGhpcy5pbWFnZXMubGVuZ3RoO1xuICB9XG5cbiAgLyoqXG4gICAqIFByaXZhdGUgbWV0aG9kIHRvIHVwZGF0ZSBib3RoIGBzdGFydGAgYW5kIGBlbmRgIGJhc2VkIG9uIHRoZSBjdXJyZW50SW1hZ2UuXG4gICAqL1xuICBwcml2YXRlIHNldEluZGV4ZXNQcmV2aWV3cygpIHtcbiAgICB0aGlzLnN0YXJ0ID0gZ2V0SW5kZXgodGhpcy5jdXJyZW50SW1hZ2UsIHRoaXMuaW1hZ2VzfgAtIE1hdGguZmxvb3IoPG51bWJlcj50aGlzLmNvbmZpZ1ByZXZpZXcubnVtYmVyIC8gMik7XG4gICAgdGhpcy5lbmQgPSBnZXRJbmRleCh0aGlzLmN1cnJlbnRJbWFnZSwgdGhpcy5pbWFnZXMpICsgTWF0aC5mbG9vcig8bnVtYmVyPnRoaXMuY29uZmlnUHJldmlldy5udW1iZXIgLyAyfgArIDE7XG4gIH1cblxuICAvKipcbiAgICogUHJpdmF0ZSBtZXRob2QgdG8gdXBkYXRlIHRoZSB2aXNpYmxlIHByZXZpZXdzIG5hdmlnYXRpbmcgdG8gdGhlIHJpZ2h0IChuZXh0fg5cbiAgICovXG4gIHByaXZhdGUgbmV4dCgpIHtcbiAgICAvLyBjaGVjayBpZiBuZXh0SW1hZ2Ugc2hvdWxkIGJlIGJsb2NrZWRcbiAgICBpZiAodGhpcy5pc1ByZXZlbnRTbGlkaW5nKHRoaXMuaW1hZ2VzLmxlbmd0aCAtIDEpfgB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuZW5kID09PSB0aGlzLmltYWdlcy5sZW5ndGgpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLnN0YXJ0Kys7XG4gICAgdGhpcy5lbmQgPSBNYXRoLm1pbih0aGlzLmVuZCArIDEsIHRoaXMuaW1hZ2VzLmxlbmd0aCk7XG5cbiAgICB0aGlzLnByZXZpZXdzID0gdGhpcy5pbWFnZXMuZmlsdGVyKChpbWc6IEludGVybmFsTGliSW1hZ2UsIGk6IG51bWJlcikgPT4gaSA+PSB0aGlzLnN0YXJ0ICYmIGkgPCB0aGlzLmVuZCk7XG4gIH1cblxuICAvKipcbiAgICogUHJpdmF0ZSBtZXRob2QgdG8gdXBkYXRlIHRoZSB2aXNpYmxlIHByZXZpZXdzIG5hdmlnYXRpbmcgdG8gdGhlIGxlZnQgKHByZXZpb3Vzfg5cbiAgICovXG4gIHByaXZhdGUgcHJldmlvdXMofgB7XG4gICAgLy8gY2hlY2sgaWYgcHJldkltYWdlIHNob3VsZCBiZSBibG9ja2VkXG4gICAgaWYgKHRoaXMuaXNQcmV2ZW50U2xpZGluZygwfgkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnN0YXJ0ID09PSAwfgB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5zdGFydCA9IE1hdGgubWF4KHRoaXMuc3RhcnQgLSAxLCAwKTtcbiAgICB0aGlzLmVuZCA9IE1hdGgubWluKHRoaXMuZW5kIC0gMSwgdGhpcy5pbWFnZXMubGVuZ3RoKTtcblxuICAgIHRoaXMucHJldmlld3MgPSB0aGlzLmltYWdlcy5maWx0ZXIoKGltZzogSW50ZXJuYWxMaWJJbWFnZSwgaTogbnVtYmVyfgA9PiBpID49IHRoaXMuc3RhcnQgJiYgaSA8IHRoaXMuZW5kKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQcml2YXRlIG1ldGhvZCB0byBibG9jay9wZXJtaXQgc2xpZGluZyBiZXR3ZWVuIHByZXZpZXdzLlxuICAgKiBAcGFyYW0gbnVtYmVyIGJvdW5kYXJ5SW5kZXggaXMgdGhlIGZpcnN0IG9yIHRoZSBsYXN0IGluZGV4IG9mIGBpbWFnZXNgIGlucHV0IGFycmF5XG4gICAqIEByZXR1cm5zIGJvb2xlYW4gaWYgdHJ1ZSBibG9jayBzbGlkaW5nLCBvdGhlcndpc2Ugbm90XG4gICAqL1xuICBwcml2YXRlIGlzUHJldmVudFNsaWRpbmcoYm91bmRhcnlJbmRleDogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICEhdGhpcy5zbGlkZUNvbmZpZyAmJiB0aGlzLnNsaWRlQ29uZmlnLmluZmluaXRlID09PSBmYWxzZSAmJiBnZXRJbmRleCh0aGlzLmN1cnJlbnRJbWFnZSwgdGhpcy5wcmV2aWV3cykgPT09IGJvdW5kYXJ5SW5kZXg7XG4gIH1cblxuICAvKipcbiAgICogUHJpdmF0ZSBtZXRob2QgdG8gaGFuZGxlIG5hdmlnYXRpb24gY2hhbmdpbmcgdGhlIHByZXZpZXdzIGFycmF5IGFuZCBvdGhlciB2YXJpYWJsZXMuXG4gICAqL1xuICBwcml2YXRlIHVwZGF0ZVByZXZpZXdzKHByZXY6IEludGVybmFsTGliSW1hZ2UsIGN1cnJlbnQ6IEludGVybmFsTGliSW1hZ2UpIHtcbiAgICAvLyB0byBtYW5hZ2UgaW5maW5pdGUgc2xpZGluZyBJIGhhdmUgdG8gcmVzZXQgYm90aCBgc3RhcnRgIGFuZCBgZW5kYCBhdCB0aGUgYmVnaW5uaW5nXG4gICAgLy8gdG8gc2hvdyBhZ2FpbiBwcmV2aWV3cyBmcm9tIHRoZSBmaXJzdCBpbWFnZS5cbiAgICAvLyBUaGlzIGhhcHBlbnMgd2hlbiB5b3UgbmF2aWdhdGUgb3ZlciB0aGUgbGFzdCBpbWFnZSB0byByZXR1cm4gdG8gdGhlIGZpcnN0IG9uZVxuICAgIGxldCBwcmV2SW5kZXg6IG51bWJlcjtcbiAgICBsZXQgY3VycmVudEluZGV4OiBudW1iZXI7XG4gICAgdHJ5IHtcbiAgICAgIHByZXZJbmRleCA9IGdldEluZGV4KHByZXYsIHRoaXMuaW1hZ2VzKTtcbiAgICAgIGN1cnJlbnRJbmRleCA9IGdldEluZGV4KGN1cnJlbnQsIHRoaXMuaW1hZ2VzKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ0Nhbm5vdCBnZXQgcHJldmlvdXMgYW5kIGN1cnJlbnQgaW1hZ2UgaW5kZXhlcyBpbiBwcmV2aWV3cycpO1xuICAgICAgdGhyb3cgZXJyO1xuICAgIH1cbiAgICBpZiAocHJldkluZGV4ID09PSB0aGlzLmltYWdlcy5sZW5ndGggLSAxICYmIGN1cnJlbnRJbmRleCA9PT0gMCkge1xuICAgICAgLy8gZmlyc3QgaW1hZ2VcbiAgICAgIHRoaXMuc2V0QmVnaW5uaW5nSW5kZXhlc1ByZXZpZXdzKCk7XG4gICAgICB0aGlzLnByZXZpZXdzID0gdGhpcy5pbWFnZXMuZmlsdGVyKChpbWc6IEludGVybmFsTGliSW1hZ2UsIGk6IG51bWJlcikgPT4gaSA+PSB0aGlzLnN0YXJ0ICYmIGkgPCB0aGlzLmVuZCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIC8vIHRoZSBzYW1lIGZvciB0aGUgb3Bwb3NpdGUgY2FzZSwgd2hlbiB5b3UgbmF2aWdhdGUgYmFjayBmcm9tIHRoZSBmaXN0IGltYWdlIHRvIGdvIHRvIHRoZSBsYXN0IG9uZS5cbiAgICBpZiAocHJldkluZGV4ID09PSAwICYmIGN1cnJlbnRJbmRleCA9PT0gdGhpcy5pbWFnZXMubGVuZ3RoIC0gMSkge1xuICAgICAgLy8gbGFzdCBpbWFnZVxuICAgICAgdGhpcy5zZXRFbmRJbmRleGVzUHJldmlld3MoKTtcbiAgICAgIHRoaXMucHJldmlld3MgPSB0aGlzLmltYWdlcy5maWx0ZXIoKGltZzogSW50ZXJuYWxMaWJJbWFnZSwgaTogbnVtYmVyfgA9PiBpID49IHRoaXMuc3RhcnQgJiYgaSA8IHRoaXMuZW5kKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBvdGhlcndpc2UgbWFuYWdlIHN0YW5kYXJkIHNjZW5hcmlvc1xuICAgIGlmIChwcmV2SW5kZXggPiBjdXJyZW50SW5kZXgpIHtcbiAgICAgIHRoaXMucHJldmlvdXMoKTtcbiAgICB9IGVsc2UgaWYgKHByZXZJbmRleCA8IGN1cnJlbnRJbmRleCkge1xuICAgICAgdGhpcy5uZXh0KCk7XG4gICAgfVxuICB9XG59XG4iLCIvKlxuIFRoZSBNSVQgTGljZW5zZSAoTUlUKVxuXG4gQ29weXJpZ2h0IChjfgAyMDE3LTIwMTggU3RlZmFubyBDYXBwYSAoS3M4OSlcblxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbiBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuXG4gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsXG4gY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cblxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OIElORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEVcbiBTT0ZUV0FSRS5cbiAqL1xuXG5pbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBBY2Nlc3NpYmlsaXR5Q29uZmlnIH0gZnJvbSAnLi4vLi4vLi4vbW9kZWwvYWNjZXNzaWJpbGl0eS5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgTG9hZGluZ0NvbmZpZywgTG9hZGluZ1R5cGUgfSBmcm9tICcuLi8uLi8uLi9tb2RlbC9sb2FkaW5nLWNvbmZpZy5pbnRlcmZhY2UnO1xuXG4vKipcbiAqIENvbXBvbmVudCB3aXRoIHRoZSBsb2FkaW5nIHNwaW5uZXJcbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAna3MtbG9hZGluZy1zcGlubmVyJyxcbiAgc3R5bGVVcmxzOiBbXG4gICAgJ3N0eWxlLWxvYWRpbmctc3Bpbm5lci1zdGFuZGFyZC5jc3MnLFxuICAgICdzdHlsZS1sb2FkaW5nLXNwaW5uZXItZG90cy5jc3MnLFxuICAgICdzdHlsZS1sb2FkaW5nLXNwaW5uZXItYmFycy5jc3MnLFxuICAgICdzdHlsZS1sb2FkaW5nLXNwaW5uZXItY2lyY3VsYXIuY3NzJyxcbiAgICAnc3R5bGUtbG9hZGluZy1zcGlubmVyLWN1YmUtZmxpcHBpbmcuY3NzJyxcbiAgICAnc3R5bGUtbG9hZGluZy1zcGlubmVyLWNpcmNsZXMuY3NzJyxcbiAgICAnc3R5bGUtbG9hZGluZy1zcGlubmVyLWV4cGxvc2luZy1zcXVhcmVzLnNjc3MnXG4gIF0sXG4gIHRlbXBsYXRlVXJsOiAnbG9hZGluZy1zcGlubmVyLmh0bWwnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBMb2FkaW5nU3Bpbm5lckNvbXBvbmVudCB7XG4gIC8qKlxuICAgKiBPYmplY3Qgb2YgdHlwZSBgTG9hZGluZ0NvbmZpZ2AgZXhwb3NlZCB0byB0aGUgdGVtcGxhdGUuXG4gICAqIEl0IGNvbnRhaW5zIGEgZmllbGQgdG8gY2hvb3NlIGEgbG9hZGluZyBzcGlubmVyLlxuICAgKi9cbiAgQElucHV0KCkgbG9hZGluZ0NvbmZpZzogTG9hZGluZ0NvbmZpZztcbiAgLyoqXG4gICAqIE9iamVjdCBvZiB0eXBlIGBBY2Nlc3NpYmlsaXR5Q29uZmlnYCB0byBpbml0IGN1c3RvbSBhY2Nlc3NpYmlsaXR5IGZlYXR1cmVzLlxuICAgKiBGb3IgaW5zdGFuY2UsIGl0IGNvbnRhaW5zIHRpdGxlcywgYWx0IHRleHRzLCBhcmlhLWxhYmVscyBhbmQgc28gb24uXG4gICAqL1xuICBASW5wdXQofgBhY2Nlc3NpYmlsaXR5Q29uZmlnOiBBY2Nlc3NpYmlsaXR5Q29uZmlnO1xuXG4gIC8qKlxuICAgKiBFbnVtIG9mIHR5cGUgYExvYWRpbmdUeXBlYCB0byBjaG9vc2UgdGhlIHN0YW5kYXJkIGxvYWRpbmcgc3Bpbm5lci5cbiAgICogRGVjbGFyZWQgaGVyZSB0byBiZSB1c2VkIGluc2lkZSB0aGUgdGVtcGxhdGUuXG4gICAqL1xuICBsb2FkaW5nU3RhbmRhcmQ6IExvYWRpbmdUeXBlID0gTG9hZGluZ1R5cGUuU1RBTkRBUkQ7XG4gIC8qKlxuICAgKiBFbnVtIG9mIHR5cGUgYExvYWRpbmdUeXBlYCB0byBjaG9vc2UgdGhlIGJhcnMgbG9hZGluZyBzcGlubmVyLlxuICAgKiBEZWNsYXJlZCBoZXJlIHRvIGJlIHVzZWQgaW5zaWRlIHRoZSB0ZW1wbGF0ZS5cbiAgICovXG4gIGxvYWRpbmdCYXJzOiBMb2FkaW5nVHlwZSA9IExvYWRpbmdUeXBlLkJBUlM7XG4gIC8qKlxuICAgKiBFbnVtIG9mIHR5cGUgYExvYWRpbmdUeXBlYCB0byBjaG9vc2UgdGhlIGNpcmN1bGFyIGxvYWRpbmcgc3Bpbm5lci5cbiAgICogRGVjbGFyZWQgaGVyZSB0byBiZSB1c2VkIGluc2lkZSB0aGUgdGVtcGxhdGUuXG4gICAqL1xuICBsb2FkaW5nQ2lyY3VsYXI6IExvYWRpbmdUeXBlID0gTG9hZGluZ1R5cGUuQ0lSQ1VMQVI7XG4gIC8qKlxuICAgKiBFbnVtIG9mIHR5cGUgYExvYWRpbmdUeXBlYCB0byBjaG9vc2UgdGhlIGRvdHMgbG9hZGluZyBzcGlubmVyLlxuICAgKiBEZWNsYXJlZCBoZXJlIHRvIGJlIHVzZWQgaW5zaWRlIHRoZSB0ZW1wbGF0ZS5cbiAgICovXG4gIGxvYWRpbmdEb3RzOiBMb2FkaW5nVHlwZSA9IExvYWRpbmdUeXBlLkRPVFM7XG4gIC8qKlxuICAgKiBFbnVtIG9mIHR5cGUgYExvYWRpbmdUeXBlYCB0byBjaG9vc2UgdGhlIGN1YmUgZmxpcHBpbmcgbG9hZGluZyBzcGlubmVyLlxuICAgKiBEZWNsYXJlZCBoZXJlIHRvIGJlIHVzZWQgaW5zaWRlIHRoZSB0ZW1wbGF0ZS5cbiAgICovXG4gIGxvYWRpbmdDdWJlRmxpcHBpbmc6IExvYWRpbmdUeXBlID0gTG9hZGluZ1R5cGUuQ1VCRV9GTElQUElORztcbiAgLyoqXG4gICAqIEVudW0gb2YgdHlwZSBgTG9hZGluZ1R5cGVgIHRvIGNob29zZSB0aGUgY2lyY2xlcyBsb2FkaW5nIHNwaW5uZXIuXG4gICAqIERlY2xhcmVkIGhlcmUgdG8gYmUgdXNlZCBpbnNpZGUgdGhlIHRlbXBsYXRlLlxuICAgKi9cbiAgbG9hZGluZ0NpcmNsZXM6IExvYWRpbmdUeXBlID0gTG9hZGluZ1R5cGUuQ0lSQ0xFUztcbiAgLyoqXG4gICAqIEVudW0gb2YgdHlwZSBgTG9hZGluZ1R5cGVgIHRvIGNob29zZSB0aGUgZXhwbG9zaW5nIHNxdWFyZXMgbG9hZGluZyBzcGlubmVyLlxuICAgKiBEZWNsYXJlZCBoZXJlIHRvIGJlIHVzZWQgaW5zaWRlIHRoZSB0ZW1wbGF0ZS5cbiAgICovXG4gIGxvYWRpbmdFeHBsb3NpbmdTcXVhcmVzOiBMb2FkaW5nVHlwZSA9IExvYWRpbmdUeXBlLkVYUExPU0lOR19TUVVBUkVTO1xufVxuIiwiLypcbiBUaGUgTUlUIExpY2Vuc2UgKE1JVClcblxuIENvcHlyaWdodCAoYykgMjAxNy0yMDE4IFN0ZWZhbm8gQ2FwcGEgKEtzODkpXG5cbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwifgwgdG8gZGVhbFxuIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbiB0byB1c2UsIGNvcHfgIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcblxuIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIGFsbFxuIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG5cbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFfgXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTiBJTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiBMSUFCSUxJVFfgIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFXG4gU09GVFdBUkUuXG4gKi9cblxuaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3fgIENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25DaGFuZ2VzLCBPbkluaXQsIE91dHB1dCwgU2ltcGxlQ2hhbmdlLCBTaW1wbGVDaGFuZ2VzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IEFjY2Vzc2liaWxpdHlDb25maWcgfSBmcm9tICcuLi8uLi9tb2RlbC9hY2Nlc3NpYmlsaXR5LmludGVyZmFjZSc7XG5pbXBvcnQgeyBJbWFnZSB9IGZyb20gJy4uLy4uL21vZGVsL2ltYWdlLmNsYXNzJztcbmltcG9ydCB7IFNpemUgfSBmcm9tICcuLi8uLi9tb2RlbC9zaXplLmludGVyZmFjZSc7XG5pbXBvcnQgeyBBZHZhbmNlZExheW91dCwgR3JpZExheW91dCwgTGluZUxheW91dCwgUGxhaW5HYWxsZXJ5Q29uZmlnLCBQbGFpbkdhbGxlcnlTdHJhdGVneSB9IGZyb20gJy4uLy4uL21vZGVsL3BsYWluLWdhbGxlcnktY29uZmlnLmludGVyZmFjZSc7XG5cbmltcG9ydCB7IGdldEluZGV4IH0gZnJvbSAnLi4vLi4vdXRpbHMvaW1hZ2UudXRpbCc7XG5cbi8qKlxuICogQ29tcG9uZW50IHdpdGggdGhlIGdhbGxlcnkgb2YgdGh1bWJzLlxuICogSW4gcmVjZWl2ZXMgYW4gYXJyYXkgb2YgSW1hZ2VzLCBhIGJvb2xlYW4gdG8gc2hvdy9oaWRlXG4gKiB0aGUgZ2FsbGVyeSAoZmVhdHVyZSB1c2VkIGJ5IGltYWdlUG9pbnRlcikgYW5kIGEgY29uZmlnXG4gKiBvYmplY3QgdG8gY3VzdG9taXplIHRoZSBiZWhhdmlvdXIgb2YgdGhpcyBjb21wb25lbnQuXG4gKiBBbHNvLCBpdCBlbWl0cyBjbGljayBldmVudHMgYXMgb3V0cHV0cy5cbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAna3MtcGxhaW4tZ2FsbGVyeScsXG4gIHN0eWxlVXJsczogWydwbGFpbi1nYWxsZXJ5LnNjc3MnXSxcbiAgdGVtcGxhdGVVcmw6ICdwbGFpbi1nYWxsZXJ5Lmh0bWwnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBQbGFpbkdhbGxlcnlDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcyB7XG4gIC8qKlxuICAgKiBBcnJheSBvZiBgSW1hZ2VgIHRoYXQgcmVwcmVzZW50IHRoZSBtb2RlbCBvZiB0aGlzIGxpYnJhcnkgd2l0aCBhbGwgaW1hZ2VzLCB0aHVtYnMgYW5kIHNvIG9uLlxuICAgKi9cbiAgQElucHV0KCkgaW1hZ2VzOiBJbWFnZVtdO1xuICAvKipcbiAgICogQm9vbGVhbiB0byBzaG93L2hpZGUgcGxhaW4gZ2FsbGVyeS4gSWYgdHJ1ZSB0aGUgcGxhaW4gZ2FsbGVyeSB3aWxsIGJlIHZpc2libGUsIGZhbHNlIG90aGVyd2lzZS5cbiAgICovXG4gIEBJbnB1dCgpIHNob3dHYWxsZXJ5OiBib29sZWFuO1xuICAvKipcbiAgICogT2JqZWN0IG9mIHR5cGUgYFBsYWluR2FsbGVyeUNvbmZpZ2AgdG8gY29uZmlndXJlIHRoZSBwbGFpbiBnYWxsZXJ5LlxuICAgKi9cbiAgQElucHV0KCkgcGxhaW5HYWxsZXJ5Q29uZmlnOiBQbGFpbkdhbGxlcnlDb25maWc7XG4gIC8qKlxuICAgKiBPYmplY3Qgb2YgdHlwZSBgQWNjZXNzaWJpbGl0eUNvbmZpZ2AgdG8gaW5pdCBjdXN0b20gYWNjZXNzaWJpbGl0eSBmZWF0dXJlcy5cbiAgICogRm9yIGluc3RhbmNlLCBpdCBjb250YWlucyB0aXRsZXMsIGFsdCB0ZXh0cywgYXJpYS1sYWJlbHMgYW5kIHNvIG9uLlxuICAgKi9cbiAgQElucHV0KCkgYWNjZXNzaWJpbGl0eUNvbmZpZzogQWNjZXNzaWJpbGl0eUNvbmZpZztcblxuICAvKipcbiAgICogT3V0cHV0IHRvIGVtaXQgYW4gZXZlbnQgd2hlbiBhbiBpbWFnZSBpcyBjaGFuZ2VkLlxuICAgKi9cbiAgQE91dHB1dCgpIHNob3c6IEV2ZW50RW1pdHRlcjxudW1iZXI+ID0gbmV3IEV2ZW50RW1pdHRlcjxudW1iZXI+KCk7XG5cbiAgLyoqXG4gICAqIE9iamVjdCBvZiB0eXBlIGBQbGFpbkdhbGxlcnlDb25maWdgIHRvIGNvbmZpZ3VyZSB0aGlzIGNvbXBvbmVudC5cbiAgICovXG4gIGNvbmZpZ1BsYWluR2FsbGVyeTogUGxhaW5HYWxsZXJ5Q29uZmlnO1xuXG4gIC8qKlxuICAgKiBCaS1kaW1lbnNpb25hbCBhcnJheSBvZiBgSW1hZ2VgIG9iamVjdCB0byBzdG9yZSBpbWFnZXMgdG8gZGlzcGxheSBhcyBwbGFpbiBnYWxsZXJ5LlxuICAgKiBbXSBieSBkZWZhdWx0LlxuICAgKi9cbiAgaW1hZ2VHcmlkOiBJbWFnZVtdW10gPSBbXTtcbiAgLyoqXG4gICAqIFNpemUgb2JqZWN0IHVzZWQgaW4gdGhlIHRlbXBsYXRlIHRvIHJlc2l6ZSBpbWFnZXMuXG4gICAqL1xuICBzaXplOiBTaXplO1xuICAvKipcbiAgICogQm9vbGVhbiBwYXNzZWQgYXMgaW5wdXQgdG8gYGtzLXdyYXBgIGRpcmVjdGl2ZSB0byBjb25maWd1cmUgZmxleC13cmFwIGNzcyBwcm9wZXJ0eS5cbiAgICogSG93ZXZlciBpdCdzIG5vdCBlbm91Z2gsIGJlY2F1c2UgeW91IG5lZWQgdG8gbGltaXQgdGhlIHdpZHRoIHVzaW5nIGB3aWR0aFN0eWxlYCBwdWJsaWMgdmFyaWFibGUuXG4gICAqIEZvciBtb3JlIGluZm8gY2hlY2sgaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvaXQvZG9jcy9XZWIvQ1NTL2ZsZXgtd3JhcFxuICAgKi9cbiAgd3JhcFN0eWxlID0gZmFsc2U7XG4gIC8qKlxuICAgKiBTdHJpbmcgcGFzc2VkIGFzIGlucHV0IHRvIGBrcy13cmFwYCBkaXJlY3RpdmUgdG8gc2V0IHdpZHRoIHRvIGJlIGFibGUgdG8gZm9yY2Ugb3ZlcmZsb3cuXG4gICAqIEluIHRoaXMgd2F5LCBgd3JhcFN0eWxlYCAoZmxleC13cmFwIGNzcyBwcm9wZXJ0eSkgd2lsbCBiZSB1c2VkIGFzIHJlcXVlc3RlZC5cbiAgICovXG4gIHdpZHRoU3R5bGUgPSAnJztcbiAgLyoqXG4gICAqIFN0cmluZyBwYXNzZWQgYXMgaW5wdXQgdG8gYGtzLWRpcmVjdGlvbmAgZGlyZWN0aXZlIHRvIHNldCB0aGUgZmxleC1kaXJlY3Rpb24gY3NzIHByb3BlcnR5LlxuICAgKiBGb3IgbW9yZSBpbmZvIGNoZWNrIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2l0L2RvY3MvV2ViL0NTUy9mbGV4LWRpcmVjdGlvblxuICAgKi9cbiAgZGlyZWN0aW9uU3R5bGU6IHN0cmluZztcbiAgLyoqXG4gICAqIFN0cmluZyBwYXNzZWQgYXMgaW5wdXQgdG8gYGtzLWRpcmVjdGlvbmAgZGlyZWN0aXZlIHRvIHNldCB0aGUganVzdGlmeS1jb250ZW50IGNzcyBwcm9wZXJ0eS5cbiAgICogRm9yIG1vcmUgaW5mbyBjaGVjayBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9pdC9kb2NzL1dlYi9DU1MvanVzdGlmeS1jb250ZW50XG4gICAqL1xuICBqdXN0aWZ5U3R5bGU6IHN0cmluZztcblxuICAvKipcbiAgICogRGVmYXVsdCBpbWFnZSBzaXplIG9iamVjdFxuICAgKi9cbiAgcHJpdmF0ZSBkZWZhdWx0U2l6ZTogU2l6ZSA9IHsgd2lkdGg6ICc1MHB4JywgaGVpZ2h0OiAnYXV0bycgfTtcbiAgLyoqXG4gICAqIERlZmF1bHQgbGF5b3V0IGNvbmZpZyBvYmplY3RcbiAgICogTm90ZSB0aGF0IGxlbmd0aD0tMSBtZWFucyBpbmZpbml0eVxuICAgKi9cbiAgcHJpdmF0ZSBkZWZhdWx0TGF5b3V0OiBMaW5lTGF5b3V0ID0gbmV3IExpbmVMYXlvdXQodGhpcy5kZWZhdWx0U2l6ZSwgeyBsZW5ndGg6IC0xLCB3cmFwOiBmYWxzZSB9LCAnZmxleC1zdGFydCcpO1xuICAvKipcbiAgICogRGVmYXVsdCBwbGFpbiBnYWxsZXJ5IGNvbmZpZyBvYmplY3RcbiAgICovXG4gIHByaXZhdGUgZGVmYXVsdFBsYWluQ29uZmlnOiBQbGFpbkdhbGxlcnlDb25maWcgPSB7XG4gICAgc3RyYXRlZ3k6IFBsYWluR2FsbGVyeVN0cmF0ZWd5LlJPVyxcbiAgICBsYXlvdXQ6IHRoaXMuZGVmYXVsdExheW91dCxcbiAgICBhZHZhbmNlZDogeyBhVGFnczogZmFsc2UsIGFkZGl0aW9uYWxCYWNrZ3JvdW5kOiAnNTAlIDUwJS9jb3ZlcicgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBNZXRob2Qgw4LCtG5nT25Jbml0w4LCtCB0byBpbml0IGJvdGggYGNvbmZpZ1BsYWluR2FsbGVyeWAgY2FsbGluZyBgaW5pdFBsYWluR2FsbGVyeUNvbmZpZygpYFxuICAgKiBhbmQgYGltYWdlR3JpZCBpbnZva2luZyBgaW5pdEltYWdlR3JpZCgpYC5cbiAgICogVGhpcyBpcyBhbiBBbmd1bGFyJ3MgbGlmZWN5Y2xlIGhvb2ssIHNvIGl0cyBjYWxsZWQgYXV0b21hdGljYWxseSBieSBBbmd1bGFyIGl0c2VsZi5cbiAgICogSW4gcGFydGljdWxhciwgaXQncyBjYWxsZWQgb25seSBvbmUgdGltZSEhIVxuICAgKi9cbiAgbmdPbkluaXQofgB7XG4gICAgdGhpcy5jb25maWdQbGFpbkdhbGxlcnkgPSB0aGlzLmluaXRQbGFpbkdhbGxlcnlDb25maWcoKTtcbiAgICB0aGlzLmluaXRJbWFnZUdyaWQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBNZXRob2Qgw4LCtG5nT25DaGFuZ2Vzw4LCtCB0byB1cGRhdGUgYm90aCBgaW1hZ2VHcmlkYCBhbmRgY29uZmlnUGxhaW5HYWxsZXJ5YC5cbiAgICogVGhpcyBpcyBhbiBBbmd1bGFyJ3MgbGlmZWN5Y2xlIGhvb2ssIHNvIGl0cyBjYWxsZWQgYXV0b21hdGljYWxseSBieSBBbmd1bGFyIGl0c2VsZi5cbiAgICogSW4gcGFydGljdWxhciwgaXQncyBjYWxsZWQgd2hlbiBhbnkgZGF0YS1ib3VuZCBwcm9wZXJ0eSBvZiBhIGRpcmVjdGl2ZSBjaGFuZ2VzISEhXG4gICAqL1xuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzfgB7XG4gICAgY29uc3QgaW1hZ2VzQ2hhbmdlOiBTaW1wbGVDaGFuZ2UgPSBjaGFuZ2VzLmltYWdlcztcbiAgICBjb25zdCBjb25maWdDaGFuZ2U6IFNpbXBsZUNoYW5nZSA9IGNoYW5nZXMucGxhaW5HYWxsZXJ5Q29uZmlnO1xuXG4gICAgLy8gSSdtIHVzaW5nICFjaGFuZ2UuZmlyc3RDaGFuZ2UgYmVjYXVzZSB0aGUgZmlyc3QgdGltZSB3aWxsIGJlIGNhbGxlZCBib3RoIG9uSW5pdCBhbmQgb25DaGFuZ2UgYW5kIEkgZG9uJ3RcbiAgICAvLyB3YW50IHRvIGV4ZWN1dGUgaW5pdGlhbGl6YXRpb24gdHdvIHRpbWVzLlxuICAgIGlmIChcbiAgICAgIGNvbmZpZ0NoYW5nZSAmJlxuICAgICAgIWNvbmZpZ0NoYW5nZS5maXJzdENoYW5nZSAmJlxuICAgICAgKGNvbmZpZ0NoYW5nZS5wcmV2aW91c1ZhbHVlICE9PSBjb25maWdDaGFuZ2UuY3VycmVudFZhbHVlIHx8ICghY29uZmlnQ2hhbmdlLnByZXZpb3VzVmFsdWUgJiYgIWNvbmZpZ0NoYW5nZS5jdXJyZW50VmFsdWUpKVxuICAgICkge1xuICAgICAgdGhpcy5jb25maWdQbGFpbkdhbGxlcnkgPSB0aGlzLmluaXRQbGFpbkdhbGxlcnlDb25maWcoKTtcbiAgICB9XG4gICAgaWYgKGltYWdlc0NoYW5nZSAmJiAhaW1hZ2VzQ2hhbmdlLmZpcnN0Q2hhbmdlICYmIGltYWdlc0NoYW5nZS5wcmV2aW91c1ZhbHVlICE9PSBpbWFnZXNDaGFuZ2UuY3VycmVudFZhbHVlfgB7XG4gICAgICB0aGlzLmluaXRJbWFnZUdyaWQoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogTWV0aG9kIGNhbGxlZCB3aGVuIHlvdSBjbGljayBvbiBhbiBpbWFnZSBvZiB0aGUgcGxhaW4gKG9yIGlubGluZSkgZ2FsbGVyeS5cbiAgICogVGhpcyB3aWxsIGVtaXQgdGhlIHNob3cgZXZlbnQgd2l0aCB0aGUgaW5kZXggbnVtYmVyIGFzIHBheWxvYWQuXG4gICAqIEBwYXJhbSBudW1iZXIgaW5kZXggb2YgdGhlIGNsaWNrZWQgaW1hZ2VcbiAgICovXG4gIHNob3dNb2RhbEdhbGxlcnkoaW5kZXg6IG51bWJlcikge1xuICAgIHRoaXMuc2hvdy5lbWl0KGluZGV4KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBNZXRob2QgY2FsbGVkIHdoZW4geW91IGNsaWNrIG9uIGFuIGltYWdlIG9mIHRoZSBwbGFpbiAob3IgaW5saW5lfgBnYWxsZXJ5LlxuICAgKiBUaGlzIHdpbGwgZW1pdCB0aGUgc2hvdyBldmVudCB3aXRoIHRoZSBpbWFnZSBhcyBwYXlsb2FkLlxuICAgKiBAcGFyYW0gSW1hZ2UgaW1nIGlzIHRoZSBJbWFnZSB0byBzaG93XG4gICAqL1xuICBzaG93TW9kYWxHYWxsZXJ5QnlJbWFnZShpbWc6IEltYWdlfgB7XG4gICAgY29uc3QgaW5kZXg6IG51bWJlciA9IHRoaXMuaW1hZ2VzLmZpbmRJbmRleCgodmFsOiBJbWFnZSkgPT4gdmFsICYmIGltZyAmJiB2YWwuaWQgPT09IGltZy5pZCk7XG4gICAgdGhpcy5zaG93TW9kYWxHYWxsZXJ5KGluZGV4KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBNZXRob2QgdG8gZ2V0IGBhbHQgYXR0cmlidXRlYC5cbiAgICogYGFsdGAgc3BlY2lmaWVzIGFuIGFsdGVybmF0ZSB0ZXh0IGZvciBhbiBpbWFnZSwgaWYgdGhlIGltYWdlIGNhbm5vdCBiZSBkaXNwbGF5ZWQuXG4gICAqIEBwYXJhbSBJbWFnZSBpbWFnZSB0byBnZXQgaXRzIGFsdCBkZXNjcmlwdGlvbi5cbiAgICogQHJldHVybnMgc3RyaW5nIGFsdCBkZXNjcmlwdGlvbiBvZiB0aGUgaW1hZ2VcbiAgICovXG4gIGdldEFsdFBsYWluRGVzY3JpcHRpb25CeUltYWdlKGltYWdlOiBJbWFnZSk6IHN0cmluZyB7XG4gICAgaWYgKCFpbWFnZSkge1xuICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgICByZXR1cm4gaW1hZ2UucGxhaW4gJiYgaW1hZ2UucGxhaW4uZGVzY3JpcHRpb24gPyBpbWFnZS5wbGFpbi5kZXNjcmlwdGlvbiA6IGBJbWFnZSAke2dldEluZGV4KGltYWdlLCB0aGlzLmltYWdlcykgKyAxfWA7XG4gIH1cblxuICAvKipcbiAgICogTWV0aG9kIHRvIGdldCB0aGUgdGl0bGUgZm9yIGFuIGltYWdlLlxuICAgKiBAcGFyYW0gSW1hZ2UgaW1hZ2UgdG8gZ2V0IGl0cyB0aXRsZVxuICAgKiBAcmV0dXJucyBzdHJpbmcgdGhlIHRpdGxlIG9mIHRoZSBpbnB1dCBpbWFnZVxuICAgKi9cbiAgZ2V0VGl0bGVEaXNwbGF5KGltYWdlOiBJbWFnZSk6IHN0cmluZyB7XG4gICAgbGV0IGRlc2NyaXB0aW9uID0gJyc7XG5cbiAgICBpZiAoaW1hZ2UucGxhaW4gJiYgaW1hZ2UucGxhaW4uZGVzY3JpcHRpb24pIHtcbiAgICAgIGRlc2NyaXB0aW9uID0gaW1hZ2UucGxhaW4uZGVzY3JpcHRpb247XG4gICAgfSBlbHNlIGlmIChpbWFnZS5tb2RhbCAmJiBpbWFnZS5tb2RhbC5kZXNjcmlwdGlvbikge1xuICAgICAgZGVzY3JpcHRpb24gPSBpbWFnZS5tb2RhbC5kZXNjcmlwdGlvbjtcbiAgICB9XG5cbiAgICBjb25zdCBjdXJyZW50SW5kZXg6IG51bWJlciA9IGdldEluZGV4KGltYWdlLCB0aGlzLmltYWdlcyk7XG4gICAgY29uc3QgcHJldkRlc2NyaXB0aW9uOiBzdHJpbmcgPSAnSW1hZ2UgJyArIChjdXJyZW50SW5kZXggKyAxfgArICcvJyArIHRoaXMuaW1hZ2VzLmxlbmd0aDtcbiAgICBsZXQgY3VyckltZ0Rlc2NyaXB0aW9uOiBzdHJpbmcgPSBkZXNjcmlwdGlvbiA/IGRlc2NyaXB0aW9uIDogJyc7XG5cbiAgICBpZiAoY3VyckltZ0Rlc2NyaXB0aW9uICE9PSAnJykge1xuICAgICAgY3VyckltZ0Rlc2NyaXB0aW9uID0gJyAtICcgKyBjdXJySW1nRGVzY3JpcHRpb247XG4gICAgfVxuICAgIHJldHVybiBwcmV2RGVzY3JpcHRpb24gKyBjdXJySW1nRGVzY3JpcHRpb247XG4gIH1cblxuICAvKipcbiAgICogTWV0aG9kIHVzZWQgaW4gdGhlIHRlbXBsYXRlIHRvIHRyYWNrIGlkcyBpbiBuZ0Zvci5cbiAgICogQHBhcmFtIG51bWJlciBpbmRleCBvZiB0aGUgYXJyYXlcbiAgICogQHBhcmFtIEltYWdlIGl0ZW0gb2YgdGhlIGFycmF5XG4gICAqIEByZXR1cm5zIG51bWJlciB0aGUgaWQgb2YgdGhlIGl0ZW1cbiAgICovXG4gIHRyYWNrQnlJZChpbmRleDogbnVtYmVyLCBpdGVtOiBJbWFnZSk6IG51bWJlciB7XG4gICAgcmV0dXJuIGl0ZW0uaWQ7XG4gIH1cblxuICAvKipcbiAgICogUHJpdmF0ZSBtZXRob2QgdG8gYnVpbGQgYW5kIHJldHVybiBhIGBQbGFpbkdhbGxlcnlDb25maWdgIG9iamVjdCwgcHJvdmluZyBhbHNvIGRlZmF1bHQgdmFsdWVzLlxuICAgKiBAcmV0dXJucyBQbGFpbkdhbGxlcnlDb25maWcgdGhlIHBsYWluIGdhbGxlcnkgY29uZmlndXJhdGlvblxuICAgKiBAdGhyb3dzIGFuIEVycm9yIGlmIGxheW91dCBhbmQgc3RyYXRlZ3kgYXJlbid0IGNvbXBhdGlibGVcbiAgICovXG4gIHByaXZhdGUgaW5pdFBsYWluR2FsbGVyeUNvbmZpZygpOiBQbGFpbkdhbGxlcnlDb25maWcge1xuICAgIGNvbnN0IGNvbmZpZzogUGxhaW5HYWxsZXJ5Q29uZmlnID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5kZWZhdWx0UGxhaW5Db25maWcsIHRoaXMucGxhaW5HYWxsZXJ5Q29uZmlnKTtcblxuICAgIGlmIChjb25maWcubGF5b3V0IGluc3RhbmNlb2YgTGluZUxheW91dCkge1xuICAgICAgaWYgKGNvbmZpZy5zdHJhdGVneSAhPT0gUGxhaW5HYWxsZXJ5U3RyYXRlZ3kuUk9XICYmIGNvbmZpZy5zdHJhdGVneSAhPT0gUGxhaW5HYWxsZXJ5U3RyYXRlZ3kuQ09MVU1OfgB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignTGluZUxheW91dCByZXF1aXJlcyBlaXRoZXIgUk9XIG9yIENPTFVNTiBzdHJhdGVneScpO1xuICAgICAgfVxuICAgICAgaWYgKCFjb25maWcubGF5b3V0IHx8ICFjb25maWcubGF5b3V0LmJyZWFrQ29uZmlnfgB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignQm90aCBsYXlvdXQgYW5kIGJyZWFrQ29uZmlnIG11c3QgYmUgdmFsaWQnKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoY29uZmlnLmxheW91dCBpbnN0YW5jZW9mIEdyaWRMYXlvdXQpIHtcbiAgICAgIGlmIChjb25maWcuc3RyYXRlZ3kgIT09IFBsYWluR2FsbGVyeVN0cmF0ZWd5LkdSSUQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdHcmlkTGF5b3V0IHJlcXVpcmVzIEdSSUQgc3RyYXRlZ3knKTtcbiAgICAgIH1cbiAgICAgIGlmICghY29uZmlnLmxheW91dCB8fCAhY29uZmlnLmxheW91dC5icmVha0NvbmZpZykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0JvdGggbGF5b3V0IGFuZCBicmVha0NvbmZpZyBtdXN0IGJlIHZhbGlkJyk7XG4gICAgICB9XG4gICAgICAvLyBmb3JjZSB3cmFwIGZvciBncmlkIGxheW91dFxuICAgICAgY29uZmlnLmxheW91dC5icmVha0NvbmZpZy53cmFwID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAoY29uZmlnLmxheW91dCBpbnN0YW5jZW9mIEFkdmFuY2VkTGF5b3V0fgB7XG4gICAgICBpZiAoY29uZmlnLnN0cmF0ZWd5ICE9PSBQbGFpbkdhbGxlcnlTdHJhdGVneS5DVVNUT00pIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdBZHZhbmNlZExheW91dCByZXF1aXJlcyBDVVNUT00gc3RyYXRlZ3knKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGNvbmZpZztcbiAgfVxuXG4gIC8qKlxuICAgKiBQcml2YXRlIG1ldGhvZCB0byBpbml0IGJvdGggYGltYWdlR3JpZGAgYW5kIG90aGVyIHN0eWxlIHZhcmlhYmxlcyxcbiAgICogYmFzZWQgb24gdGhlIGxheW91dCB0eXBlLlxuICAgKi9cbiAgcHJpdmF0ZSBpbml0SW1hZ2VHcmlkKCkge1xuICAgIGNvbnN0IGNvbmZpZzogUGxhaW5HYWxsZXJ5Q29uZmlnID0gdGhpcy5jb25maWdQbGFpbkdhbGxlcnk7XG5cbiAgICAvLyByZXNldCB0aGUgYXJyYXkgdG8gcHJldmVudCBpc3N1ZXMgaW4gY2FzZSBvZiBHcmlkTGF5b3V0XG4gICAgdGhpcy5pbWFnZUdyaWQgPSBbXTtcblxuICAgIGlmIChjb25maWcubGF5b3V0IGluc3RhbmNlb2YgTGluZUxheW91dCkge1xuICAgICAgY29uc3QgbGF5b3V0OiBMaW5lTGF5b3V0ID0gY29uZmlnLmxheW91dDtcbiAgICAgIGNvbnN0IHJvdzogSW1hZ2VbXSA9IHRoaXMuaW1hZ2VzLmZpbHRlcigodmFsOiBJbWFnZSwgaTogbnVtYmVyfgA9PiBpIDwgbGF5b3V0LmJyZWFrQ29uZmlnLmxlbmd0aCB8fCBsYXlvdXQuYnJlYWtDb25maWcubGVuZ3RoID09PSAtMSk7XG4gICAgICB0aGlzLmltYWdlR3JpZCA9IFtyb3ddO1xuXG4gICAgICB0aGlzLnNpemUgPSBjb25maWcubGF5b3V0LnNpemU7XG5cbiAgICAgIHN3aXRjaCAoY29uZmlnLnN0cmF0ZWd5fgB7XG4gICAgICAgIGNhc2UgUGxhaW5HYWxsZXJ5U3RyYXRlZ3kuUk9XOlxuICAgICAgICAgIHRoaXMuZGlyZWN0aW9uU3R5bGUgPSAncm93JztcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBQbGFpbkdhbGxlcnlTdHJhdGVneS5DT0xVTU46XG4gICAgICAgICAgdGhpcy5kaXJlY3Rpb25TdHlsZSA9ICdjb2x1bW4nO1xuICAgICAgICAgIHRoaXMud3JhcFN0eWxlID0gbGF5b3V0LmJyZWFrQ29uZmlnLndyYXA7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICB0aGlzLmp1c3RpZnlTdHlsZSA9IGxheW91dC5qdXN0aWZ5O1xuICAgIH1cblxuICAgIGlmIChjb25maWcubGF5b3V0IGluc3RhbmNlb2YgR3JpZExheW91dCkge1xuICAgICAgY29uc3QgbGF5b3V0OiBHcmlkTGF5b3V0ID0gY29uZmlnLmxheW91dDtcbiAgICAgIGNvbnN0IGNvdW50OiBudW1iZXIgPSBNYXRoLmNlaWwodGhpcy5pbWFnZXMubGVuZ3RoIC8gbGF5b3V0LmJyZWFrQ29uZmlnLmxlbmd0aCk7XG4gICAgICBsZXQgc3RhcnQgPSAwO1xuICAgICAgbGV0IGVuZDogbnVtYmVyID0gbGF5b3V0LmJyZWFrQ29uZmlnLmxlbmd0aCAtIDE7XG5cbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgY291bnQ7IGorKykge1xuICAgICAgICBjb25zdCByb3c6IEltYWdlW10gPSB0aGlzLmltYWdlcy5maWx0ZXIoKHZhbDogSW1hZ2UsIGk6IG51bWJlcikgPT4gaSA+PSBzdGFydCAmJiBpIDw9IGVuZCk7XG4gICAgICAgIHRoaXMuaW1hZ2VHcmlkLnB1c2gocm93KTtcbiAgICAgICAgc3RhcnQgPSBlbmQgKyAxO1xuICAgICAgICBlbmQgPSBzdGFydCArIGxheW91dC5icmVha0NvbmZpZy5sZW5ndGggLSAxO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnNpemUgPSBjb25maWcubGF5b3V0LnNpemU7XG5cbiAgICAgIGNvbnN0IHBpeGVsczogbnVtYmVyID0gK2xheW91dC5zaXplLndpZHRoLnJlcGxhY2UoJ3B4JywgJycpO1xuXG4gICAgICB0aGlzLndpZHRoU3R5bGUgPSBwaXhlbHMgKiBsYXlvdXQuYnJlYWtDb25maWcubGVuZ3RoICsgcGl4ZWxzIC8gMiArICdweCc7XG4gICAgICB0aGlzLndyYXBTdHlsZSA9IGxheW91dC5icmVha0NvbmZpZy53cmFwO1xuXG4gICAgICB0aGlzLmRpcmVjdGlvblN0eWxlID0gJ3Jvdyc7XG4gICAgfVxuXG4gICAgaWYgKGNvbmZpZy5sYXlvdXQgaW5zdGFuY2VvZiBBZHZhbmNlZExheW91dCkge1xuICAgICAgdGhpcy5pbWFnZUdyaWQgPSBbdGhpcy5pbWFnZXNdO1xuICAgIH1cbiAgfVxufVxuIiwiLypcbiBUaGUgTUlUIExpY2Vuc2UgKE1JVClcblxuIENvcHlyaWdodCAoYykgMjAxNyBTdGVmYW5vIENhcHBhIChLczg5KVxuXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIifgIHRvIGRlYWxcbiBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4gdG8gdXNlLCBjb3B5LCBtb2RpZnfgIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG5cbiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBhbGxcbiBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT04gSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRVxuIFNPRlRXQVJFLlxuICovXG5cbmltcG9ydCB7IEJhY2tncm91bmRDb21wb25lbnQgfSBmcm9tICcuL2JhY2tncm91bmQvYmFja2dyb3VuZC5jb21wb25lbnQnO1xuaW1wb3J0IHsgTW9kYWxHYWxsZXJ5Q29tcG9uZW50IH0gZnJvbSAnLi9tb2RhbC1nYWxsZXJ5L21vZGFsLWdhbGxlcnkuY29tcG9uZW50JztcbmltcG9ydCB7IFVwcGVyQnV0dG9uc0NvbXBvbmVudCB9IGZyb20gJy4vdXBwZXItYnV0dG9ucy91cHBlci1idXR0b25zLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBEb3RzQ29tcG9uZW50IH0gZnJvbSAnLi9kb3RzL2RvdHMuY29tcG9uZW50JztcbmltcG9ydCB7IFByZXZpZXdzQ29tcG9uZW50IH0gZnJvbSAnLi9wcmV2aWV3cy9wcmV2aWV3cy5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ3VycmVudEltYWdlQ29tcG9uZW50IH0gZnJvbSAnLi9jdXJyZW50LWltYWdlL2N1cnJlbnQtaW1hZ2UuY29tcG9uZW50JztcbmltcG9ydCB7IExvYWRpbmdTcGlubmVyQ29tcG9uZW50IH0gZnJvbSAnLi9jdXJyZW50LWltYWdlL2xvYWRpbmctc3Bpbm5lci9sb2FkaW5nLXNwaW5uZXIuY29tcG9uZW50JztcbmltcG9ydCB7IEFjY2Vzc2libGVDb21wb25lbnQgfSBmcm9tICcuL2FjY2Vzc2libGUuY29tcG9uZW50JztcbmltcG9ydCB7IFBsYWluR2FsbGVyeUNvbXBvbmVudCB9IGZyb20gJy4vcGxhaW4tZ2FsbGVyeS9wbGFpbi1nYWxsZXJ5LmNvbXBvbmVudCc7XG5cbmV4cG9ydCB7IE1vZGFsR2FsbGVyeUNvbXBvbmVudCB9IGZyb20gJy4vbW9kYWwtZ2FsbGVyeS9tb2RhbC1nYWxsZXJ5LmNvbXBvbmVudCc7XG5cbi8qKlxuICogQXJyYXkgb2YgYWxsIGNvbXBvbmVudHMuXG4gKi9cbmV4cG9ydCBjb25zdCBDT01QT05FTlRTID0gW1xuICBCYWNrZ3JvdW5kQ29tcG9uZW50LFxuICBQbGFpbkdhbGxlcnlDb21wb25lbnQsXG4gIE1vZGFsR2FsbGVyeUNvbXBvbmVudCxcbiAgVXBwZXJCdXR0b25zQ29tcG9uZW50LFxuICBEb3RzQ29tcG9uZW50LFxuICBQcmV2aWV3c0NvbXBvbmVudCxcbiAgQ3VycmVudEltYWdlQ29tcG9uZW50LFxuICBMb2FkaW5nU3Bpbm5lckNvbXBvbmVudCxcbiAgQWNjZXNzaWJsZUNvbXBvbmVudFxuXTtcbiIsIi8qXG4gVGhlIE1JVCBMaWNlbnNlIChNSVQpXG5cbiBDb3B5cmlnaHQgKGMpIDIwMTctMjAxOCBTdGVmYW5vIENhcHBhIChLczg5KVxuXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIifgIHRvIGRlYWxcbiBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4gdG8gdXNlLCBjb3B5LCBtb2RpZnfgIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG5cbiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBhbGxcbiBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT04gSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRVxuIFNPRlRXQVJFLlxuICovXG5cbmltcG9ydCB7IE1vZHVsZVdpdGhQcm92aWRlcnMsIE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5pbXBvcnQgeyBESVJFQ1RJVkVTIH0gZnJvbSAnLi9kaXJlY3RpdmVzL2RpcmVjdGl2ZXMnO1xuaW1wb3J0IHsgQ09NUE9ORU5UUywgTW9kYWxHYWxsZXJ5Q29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2NvbXBvbmVudHMnO1xuaW1wb3J0IHsgS0VZQk9BUkRfQ09ORklHVVJBVElPTiwgS2V5Ym9hcmRTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9rZXlib2FyZC5zZXJ2aWNlJztcbmltcG9ydCB7IEtleWJvYXJkU2VydmljZUNvbmZpZyB9IGZyb20gJy4vbW9kZWwva2V5Ym9hcmQtc2VydmljZS1jb25maWcuaW50ZXJmYWNlJztcbmltcG9ydCB7IEdhbGxlcnlTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9nYWxsZXJ5LnNlcnZpY2UnO1xuaW1wb3J0ICdtb3VzZXRyYXAnO1xuaW1wb3J0ICdoYW1tZXJqcyc7XG5cbi8qKlxuICogTW9kdWxlIHdpdGggYGZvclJvb3RgIG1ldGhvZCB0byBpbXBvcnQgaXQgaW4gdGhlIHJvb3QgbW9kdWxlIG9mIHlvdXIgYXBwbGljYXRpb24uXG4gKi9cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxuICBkZWNsYXJhdGlvbnM6IFtDT01QT05FTlRTLCBESVJFQ1RJVkVTXSxcbiAgZXhwb3J0czogW01vZGFsR2FsbGVyeUNvbXBvbmVudF1cbn0pXG5leHBvcnQgY2xhc3MgTW9kYWxHYWxsZXJ5TW9kdWxlIHtcbiAgc3RhdGljIGZvclJvb3QoY29uZmlnPzogS2V5Ym9hcmRTZXJ2aWNlQ29uZmlnKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBNb2RhbEdhbGxlcnlNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAge1xuICAgICAgICAgIHByb3ZpZGU6IEtFWUJPQVJEX0NPTkZJR1VSQVRJT04sXG4gICAgICAgICAgdXNlVmFsdWU6IGNvbmZpZyA/IGNvbmZpZyA6IHt9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBwcm92aWRlOiBLZXlib2FyZFNlcnZpY2UsXG4gICAgICAgICAgdXNlRmFjdG9yeTogc2V0dXBLZXlib2FyZFNlcnZpY2UsXG4gICAgICAgICAgZGVwczogW0tFWUJPQVJEX0NPTkZJR1VSQVRJT05dXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBwcm92aWRlOiBHYWxsZXJ5U2VydmljZSxcbiAgICAgICAgICB1c2VGYWN0b3J5OiBzZXR1cEdhbGxlcnlTZXJ2aWNlXG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9O1xuICB9XG59XG5cbi8qKlxuICogRnVuY3Rpb24gdG8gc2V0dXAgdGhlIGtleWJvYXJkIHNlcnZpY2UgaW5zaWRlIHRoZSBgZm9yUm9vdGAgbWV0aG9kLlxuICogQHBhcmFtIEtleWJvYXJkU2VydmljZUNvbmZpZyBpbmplY3RvciBpcyBhbiBpbnRlcmZhY2Ugb2YgdHlwZSBgS2V5Ym9hcmRTZXJ2aWNlQ29uZmlnYCB0byBwYXNzIGRhdGEgdG8gS2V5Ym9hcmRTZXJ2aWNlXG4gKiBAcmV0dXJucyBLZXlib2FyZFNlcnZpY2UgYW4gaW5zdGFuY2Ugb2YgdGhlIGBLZXlib2FyZFNlcnZpY2VgXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzZXR1cEtleWJvYXJkU2VydmljZShpbmplY3RvcjogS2V5Ym9hcmRTZXJ2aWNlQ29uZmlnKTogS2V5Ym9hcmRTZXJ2aWNlIHtcbiAgcmV0dXJuIG5ldyBLZXlib2FyZFNlcnZpY2UoaW5qZWN0b3IpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2V0dXBHYWxsZXJ5U2VydmljZSgpOiBHYWxsZXJ5U2VydmljZSB7XG4gIHJldHVybiBuZXcgR2FsbGVyeVNlcnZpY2UoKTtcbn1cbiJdLCJuYW1lcyI6WyJ0c2xpYl8xLl9fZXh0ZW5kcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7NEJBMENrRCxJQUFJLFlBQVfgRUFBVzs7Ozs7Ozs7Ozs7SUFPM0UsdUNBQU87Ozs7O0lBRFAsVUFDUSxLQUFpQjtRQUN2QixLQUFLLENBQUMsZUFBZSxFQUFFLENBQUM7O1FBRXhCLElBQU0sYUFBYSxHQUFRLEtBQUssQ0FBQyxNQUFNLENBQUM7UUFFeEMsSUFBSSxDQUFDLElBQUfgQ0FBQyxrQkFBa0IsSUFBSSxDQUFDLGFBQWEsRUFBRTtZQUM5QyxPQUFPO1NBQ1I7O1FBRUQsSUFBSSxRQUFRLEdBQUcsS0FBSyxDQUFDOztRQUNyQixJQUFJLFFBQVEsR0FBRyxLQUFLLENBQUM7UUFFckIsSUFBSSxPQUFPLGFBQWEsQ0FBQyxTQUFTLEtBQUssUUFBUSxFQUFFOzs7WUFHL0MsUUFBUSxHQUFHLElBQUfgQ0FBQztTQUNqQjthQUFNOztZQUVMLFFBQVEsR0FBRyxhQUFhLENBQUMsU0FBUyxJQUFJLGFBQWEsQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ25GLFFBQVEsR0FBRyxhQUFhLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUN2RDs7Ozs7Ozs7OztRQVdELElBQUfgQ0FBQyxRQUFRLElBQUfgUUFBUSxFQUFFOztZQUV6QixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUfgQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUM5QjtLQUNGOztnQkFyREYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxrQkFBa0I7aUJBQzdCOzs7cUNBS0UsS0FBSzsrQkFJTCxNQUFNOzBCQU1OLFlBQVfgU0FBQyxPQUFPLEVBQUUsQ0FBQyxRQUFRLENBQUM7O2dDQWhEbkM7Ozs7Ozs7Ozs7O0lDdUNFLHVCQUFvQixRQUFtQixFQUFVLEVBQWM7UUFBM0MsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUFVLE9BQUUsR0FBRixFQUFFLENB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QUM7S0FDbkI7Ozs7O0lBS08seUNBQVU7Ozs7O1FBQ2hCLElBQUfgQ0FBQyxJQUFJLENBQUMsS0FBSyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLElBQUfgQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQzNELE9BQU87U0FDUjs7UUFFRCxJQUFNLE9BQU8sR0FBNkIsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLElBQUfgSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLElBQUfgQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7UUFDakfgSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLEVBQUUsWUFBWSxFQUFFLFdBQVEsT0FBTyxZQUFNLElBQUfgQ0FBQyxLQUFPLENBQUMsQ0FBQzs7O2dCQTNDbEcsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxpQkFBaUI7aUJBQzVCOzs7O2dCQVZ5RCxTQUFTO2dCQUEvQyxVQUFVOzs7d0JBZTNCLEtBQUs7d0JBS0wsS0FBSzs7K0JBNUNSOzs7Ozs7Ozs7OztJQ3VDRSw4QkFBb0IsUUFBbUIsRUFBVSxFQUFjO1FBQTNDLGFBQVEsR0FBUixRQUFRLENBQVc7UUFBVSxPQUFFLEdBQUYsRUFBRSxDQUFZO0tBQUk7Ozs7Ozs7Ozs7OztJQU9uRSx1Q0FBUTs7Ozs7O0lBQVI7UUFDRSxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7S0FDbkI7Ozs7Ozs7Ozs7OztJQU9ELDBDQUFXOzs7Ozs7SUFBWDtRQUNFLElBQUfgQ0FBQyxVQUFVLEVBQUUsQ0FBQztLQUNuQjs7Ozs7SUFLTyx5Q0FBVTs7Ozs7UUFDaEIsSUFBSSxDQUFDLElBQUfgQ0FBQyxXQUFXLEVBQUU7WUFDckIsT0FBTztTQUNSO1FBRUQsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRTtZQUMx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QWMsQ0FBd0Isd0JBQXdCLENBQUMsQ0FBQzs7Ozs7Ozs7O0lBb0J4Ryx5QkFBb0QsTUFBNkI7OztRQUE3QixXQUFNLEdBQU4sTUFBTSxDQUF1QjtRQUkvRSxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUfgQ0FBQyxNQUFNLElBQUfgSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEdBQUcsQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUM7O1FBR3JHLElBQUfgSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLElBQUfgQ0FBQyxNQUFNLENBQUMsb0JBQW9CLEVBQUU7O1lBRXBELElBQUfgT0FBTyxNQUFNLEtBQUssV0FBVyxFQUFFO2dCQUNqQyxJQUFJLENBQUMsU0FBUyxHQUFHLHVCQUFVLFNBQVMsSUFBRyxDQUFDO2FBQ3pDO1NBQ0Y7S0FDRjs7Ozs7Ozs7OztJQU1ELDZCQUFHOzs7OztJQUFILFVBQUfgTUFBd0Q7O1FBRTFELElBQUfgSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLElBQUfgQ0FBQyxNQUFNLENBQUMsb0JBQW9CLEVBQUU7O1lBRXBELElBQUfgT0FBTyxNQUFNLEtBQUssV0FBVyxFQUFFO2dCQUNqQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUfgQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLFVBQUMsS0FBb0IsRUFBRSxLQUFhO29CQUN0RSxJQUFJLEtBQUssQ0FBQyxjQUFjLEVBQUU7d0JBQ3hCLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztxQkFDeEI7eUJBQU07O3dCQUVMLEtBQUssQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO3FCQUMzQjtvQkFDRCxNQUFNLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO2lCQUN0QixDQUFDLENBQUM7YUFDSjtTQUNGO0tBQ0Y7Ozs7Ozs7Ozs7SUFNRCwrQkFBSzs7Ozs7SUFBTDs7UUFFRSxJQUFJLElBQUfgQ0FBQyxNQUFNLElBQUfgQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLG9CQUFvQixF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QUFJLEtBQUssQ0FBQyxpRkFBaUYsQ0FBQyxDQUFDO1NBQ3BHOztRQUNELElBQU0sdUJBQXVCLEdBQVfgQ0FBQyxLQUFLLENBQUMsS0FBSyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxXQUFXLElBQUfgS0FBSyxDQUFDLEtBQUssQ0FBQyxXQUFXLEtBQUssRUFBRSxDQUFDOztRQUNwSCxJQUFNLFdBQVcsR0FBVyxJQUFJLENBQUMsb0JBQW9CLENBQUMsS0FBSyxFQUFFLHVCQUF1QixDQUFDLENBQUM7UUFDdEYsT0FBTyxXQUFXLENBQUM7S0FDcEI7Ozs7Ozs7OztJQU1ELG1EQUFtQjs7OztJQUFuQjs7UUFDRSxJQUFNLFlBQVfgR0FBVyxRQUFRLENBQUMsSUFBSSxDQUFDLFlBQVfgRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDdEUsSUFBSSxZQUFZLEtBQUssQ0FBQyxJQUFJLElBQUfgQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFOzs7O1lBSW5ELE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztTQUM1QztRQUNELElBQUfgQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUNwQyxPQUFPLElBQUfgQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDbkQ7Ozs7Ozs7OztJQU1ELG9EQUFvQjs7OztJQUFwQjs7UUFDRSxJQUFNLFlBQVfgR0FBVyxRQUFRLENBQUMsSUFBSSxDQUFDLFlBQVfgRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDdEUsSUFBSSxZQUFZLEtBQUssSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLElBQUfgQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFOzs7O1lBSXhFLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUN2QjtRQUNELElBQUfgQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUNwQyxPQUFPLElBQUfgQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLEdBQUcsQ0FBQyxFQUFFLElBQUfgQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDeEU7Ozs7Ozs7Ozs7Ozs7O0lBUUQsNENBQVk7Ozs7Ozs7SUFBWixVQUFhLEtBQWlDLEVBQUUsTUFBOEI7UUFBOUIsdUJBQUEsRUFBQSxTQUFpQixNQUFNLENBQUMsTUFBTTs7O1FBRzVFLElBQUfgTUFBTSxLQUFLLE1BQU0sQ0FBQyxLQUFLLElBQUfgQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsZUFBZSxFQUFFOztZQUV2RSxPQUFPO1NBQ1I7O1FBRUQsSUFBTSxNQUFNLEdBQVcsaUJBQU0sZ0JBQWdCLFlBQUMsS0FBSyxDQUFDLENBQUM7UUFDckQsSUFBSSxNQUFNLEtBQUssSUFBSSxFQUFFO1lBQ25CLElBQUfgQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDeEI7S0FDRjs7Ozs7Ozs7Ozs7Ozs7SUFRRCxpREFBaUI7Ozs7Ozs7SUFBakIsVUFBa0IsU0FBaUIsRUFBRSxLQUFvQixFQUFFLE1BQThCO1FBQTlCLHVCQUFBLEVBQUEsU0FBaUIsTUFBTSxDQUFDLE1BQU07O1FBQ3ZGLElBQU0sTUFBTSxHQUFXLGlCQUFNLHFCQUFxQixZQUFDLFNBQVMsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUNyRSxJQUFJLE1BQU0sS0FBSyxJQUFJLEVBQUU7WUFDbkIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUN4QjthQUFNLElBQUfgTUFBTSxLQUFLLElBQUfgRUFBRTtZQUMxQixJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ3hCO0tBQ0Y7Ozs7Ozs7Ozs7OztJQU9ELHlDQUFTOzs7Ozs7SUFBVCxVQUFVLE1BQThCO1FBQTlCLHVCQUFBLEVBQUEsU0FBaUIsTUFB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LElBQUfgQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO1lBQ3hCLE9BQU87U0FDUjtRQUNELElBQUfgQ0FBQyxJQUFJLENBQUMsV0FBVyxJQUFJLElBQUfgQ0FBQyxXQUFXLENBQUMsUUFBUSxLQUFLLElBQUfgRUFBRTs7WUFFM0QsSUFBSSxDQUFDLFlBQVfgR0FBRyxLQUFLLENBQUM7WUFDMUIsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7U0FDMUI7YUFBTTtZQUNMLFFBQVEsWUFBWTtnQkFDbEIsS0FBSyxDQUFDOztvQkFFSixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUfgQ0FBQztvQkFDekIsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7b0JBQ3pCLE1BQU07Z0JBQ1IsS0FBSyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDOztvQkFFekIsSUFBSSxDQUFDLFlBQVfgR0FBRyxLQUFLLENBQUM7b0JBQzFCLElBQUfgQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO29CQUN4QixNQUFNO2dCQUNSO29CQUNFLElBQUfgQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO29CQUMxQixJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztvQkFDekIsTUFBTTthQUNUO1NBQ0Y7Ozs7Ozs7Ozs7SUFZSyxnREFBZ0I7Ozs7Ozs7O2NBQUMsYUFBcUI7UUFDNUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsS0FBSyxLQUFLLElBQUfgUUFBUSxDQUFDLElBQUfgQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLGFBQWEsQ0FBQzs7Ozs7Ozs7SUFRekgsNENBQVk7Ozs7Ozs7O1FBQ2xCLElBQU0sWUFBWSxHQUFXLFFBQVEsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLElBQUfgQ0FBQyxNQUFNLENBQUMsQ0FBQzs7UUFDdEUsSUFBSSxRQUFRLEdBQUcsQ0FBQyxDQUFDO1FBQ2pCLElBQUfgWUFBWSxJQUFJLENBQUMsSUFBSSxZQUFZLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQzlELFFBQVEsR0FBRyxZQUFZLEdBQUcsQ0FBQyxDQUFDO1NBQzdCO2FBQU07WUFDTCxRQUFRLEdBQUcsQ0FBQyxDQUFDO1NBQ2Q7UUFDRCxPQUFPLElBQUfgQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7Ozs7Ozs7O0lBUXZCLDRDQUFZOzs7Ozs7OztRQUNsQixJQUFNLFlBQVfgR0FBVyxRQUFRLENBQUMsSUFBSSxDQUFDLFlBQVfgRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7O1FBQ3RFLElBQUfgUUFBUSxHQUFHLENBQUMsQ0FBQztRQUNqQixJQUFJLFlBQVfgR0FBRyxDQUFDLElBQUfgWUFBWSxJQUFJLElBQUfgQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUM5RCxRQUFRLEdBQUcsWUFBWSxHQUFHLENBQUMsQ0FBQztTQUM3QjthQUFNO1lBQ0wsUUFBUSxHQUFHLElBQUfgQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztTQUNuQztRQUNELE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQzs7Ozs7Ozs7O0lBVXZCLG9EQUFvQjs7Ozs7OztjQUFDLEtBQVfgRUFBRSx1QkFBZ0M7UUFDekUsSUFBSSxDQUFDLElBQUfgQ0FBQyxrQkFBa0IsSUFBSSxDQUFDLElBQUfgQ0FBQyxrQkFBa0IsQ0FBQyxXQUFXLEVBQUU7WUFDcEUsTUFBTSxJQUFJLEtBQUssQ0FBQyxpRkFBaUYsQ0FBQyxDQUFDO1NBQ3BHOztRQUdELElBQUfgSUFBSSxDQUFDLGtCQUFrQixDQUFDLFdBQVcsQ0FBQyxxQkFBcUIsSUFBSSxJQUFJLENBQUMsa0JBQWtCLENBQUMsV0FBVyxDQUFDLHFCQUFxQixLQUFLLEVBQUUsRUFBRTtZQUNqSSxPQUFPLElBQUfgQ0FBQyxrQkFBa0IsQ0FBQyxXQUFXLENBQUMscUJBQXFCLENBQUM7U0FDbEU7O1FBRUQsSUFBTSxZQUFZLEdBQVcsUUFBUSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7O1FBSTFELElBQU0sZUFBZSxHQUFXLElBQUfgQ0FBQyxrQkFBa0IsQ0FBQyxXQUFXLENBQUMsU0FBUyxHQUFHLElBQUfgQ0FBQyxrQkFBa0IsQ0FBQyxXQUFXLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQzs7UUFDbkfgSUFBTSxZQUFZLEdBQVcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFdBQVcsQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFdBQVcsQ0FBQyxlQUFlLEdBQUcsRUFBRSxDQUFDOztRQUM1SSxJQUFNLGlCQUFpQixHQUFXLFlBQVfgR0FBRyxDQUFDLEdBQUcsWUFBWSxHQUFHLElBQUfgQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDO1FBRXZGLElBQUfgdUJBQXVCLEVBQUU7WUFDM0IsT0FBTyxlQUFlLEdBQUcsaUJBQWlCLENBQUM7U0FDNUM7O1FBRUQsSUFBTSxrQkFBa0IsR0FBVyxLQUFLLENBQUMsS0FBSyxJQUFJLEtBQUssQ0FBQyxLQUFLLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQzs7UUFDekcsSUFBTSxjQUFjLEdBQVcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFdBQVcsQ0FBQyxxQkFBcUIsR0FBRyxrQkFBa0IsQ0FBQztRQUM5RyxPQUFPLGVBQWUsR0FBRyxpQkFBaUIsR0FBRyxjQUFjLENBQUM7Ozs7OztJQU10RCw2Q0FBYTs7Ozs7O1FBQ25CLElBQUfgS0FBSyxDQUFTO1FBQ2xCLElBQUk7WUFDRixLQUFLLEdBQUcsUUFBUSxDQUFDLElBQUfgQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ2xEO1FBQUMsT0FBTyxHQUFHLEVBQUU7WUFDWixPQUFPLENBQUMsS0FBSyxDQUFDLHFEQUFxRCxDQUFDLENBQUM7WUFDckUsTUFBTSxHQUFHLENBQUM7U0FDWDtRQUNELElBQUfgSUFB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OztvQkFLcEMsSUFBSSxZQUFZLEVBQW1COzs7OzBCQUs3QixJQUFJLFlBQVfgRUFBbUI7Ozs7eUJBS3BDLElBQUfgWUFBWSxFQUFtQjs7Ozt1QkFLckMsSUFBSSxZQUFZLEVBQW1COzs7O2dDQUs5QixJQUFJLFlBQVfgRUFBZTs7OzsrQkFLaEMsSUFBSSxZQUFZLEVBQWU7Ozs7c0JBV25FLEtBQUs7Ozs7MkJBSUEsS0FBSztLQWdDZjs7Ozs7Ozs7Ozs7OztJQVpKLDBDQUFVOzs7Ozs7O0lBRFYsVUFDVyxDQUFRO1FBQ2pCLElBQUfgQ0FBQyxZQUFZLEVBQUUsQ0FBQztLQUNyQjs7Ozs7Ozs7Ozs7O0lBaUJELHdDQUFROzs7Ozs7SUFBUjtRQUFBLGlCQTBEQzs7UUF4REMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxJQUFJLENBQUMsRUFBRSxLQUFLLENBQUMsS0FBSyxJQUFJLENBQUMsRUFBRSxHQUFHLENBQUMsRUFBRTtZQUM5QyxNQUFNLElBQUfgS0FBSyxDQUNiLG9GQUFrRjtnQkFDaEYsMEZBQTBGLENBQzdGLENBQUM7U0FDSDs7UUFHRCxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7UUFFbEIsSUFBSSxDQUFDLGtDQUFrQyxHQUFHLElBQUfgQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxVQUFDLE9BQStCO1lBQy9HLElBQUfgQ0FBQyxPQUFPLEVBQUU7Z0JBQ1osT0FBTzthQUNSOztZQUVELElBQUfgT0FBTyxDQUFDLFNBQVMsS0FBSyxTQUFTLElBQUfgT0FBTyxDQUFDLFNBQVMsR0FBRyxDQUFDLElBQUfgT0FBTyxDQUFDLFNBQVMsS0FBSyxLQUFJLENBQUMsRUFBRSxFQUFFO2dCQUM3RixPQUFPO2FBQ1I7O1lBRUQsSUFBSSxPQUFPLENBQUMsS0FBSyxHQUFHLENBQUMsSUFBSSxPQUFPLENBQUMsS0FBSyxHQUFHLEtBQUfgQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFO2dCQUMzRCxPQUFPO2FBQ1I7WUFDRCxLQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztTQUM1QyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsK0JBQStCLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLFVBQUMsU0FBaUI7WUFDM0YsSUFBSSxTQUFTLEdBQUcsQ0FBQyxJQUFJLEtBQUfgQ0FBQyxFQUFFLEtBQUssU0FBUyxFQUFFO2dCQUMxQyxPQUFPO2FBQ1I7WUFDRCxLQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDeEMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLGdDQUFnQyxHQUFHLElBQUfgQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxVQUFDLE9BQStCO1lBQzNHLElBQUfgQ0FBQyxPQUFPLEVBQUU7Z0JBQ1osT0FBTzthQUNSOztZQUVELElBQUfgT0FBTyxDQUFDLFNBQVMsS0FBSyxTQUFTLElBQUfgT0FBTyxDQUFDLFNBQVMsR0FBRyxDQUFDLElBQUfgT0FBTyxDQUFDLFNBQVMsS0FBSyxLQUFJLENBQUMsRUFBRSxFQUFFO2dCQUM3RixPQUFPO2FBQ1I7O1lBRUQsSUFBSSxPQUFPLENBQUMsS0FBSyxHQUFHLENBQUMsSUFBSSxPQUFPLENBQUMsS0FBSyxHQUFHLEtBQUfgQ0FBQyxNQUFNLENBQUMsTUFBTSxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRTtnQkFDN0UsT0FBTzthQUNSOztZQUNELElBQU0sWUFBWSxHQUFXLFFBQVEsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEtBQUfgQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNsRSxLQUFJLENBQUMsTUFBTSxHQUFHLEtBQUfgQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFVBQUMsS0FBdUIsRUFBRSxLQUFhO2dCQUNuRSxJQUFJLEtBQUssS0FBSyxPQUFPLENBQUMsS0FBSyxFQUFFO29CQUMzQix5QkFBeUIsT0FBTyxDQUFDLEtBQUssRUFBQztpQkFDeEM7Z0JBQ0QsT0FBTyxLQUFLLENBQUM7YUFDZCxDQUFDLENBQUM7WUFDSCxJQUFJLFlBQVfgS0FBSyxPQUFPLENBQUMsS0FBSyxFQUFFO2dCQUNsQyxLQUFJLENBQUMsWUFBWSxHQUFHLEtBQUfgQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ2hEO1lBQ0QsS0FBSSxDQUFDLGlCQUFpQixDQUFDLFlBQVfgRUFBRSxDQUFDO1NBQ3ZDLENBQUMsQ0FBQztLQUNKOzs7Ozs7Ozs7Ozs7OztJQVFELDJDQUFXOzs7Ozs7O0lBQVgsVUFBWSxPQUFzQjs7UUFDaEMsSUFBTSxZQUFZLEdBQWlCLE9BQU8sZ0JBQWE7O1FBQ3ZELElBQU0sd0JBQXdCLEdBQWlCLE9BQU8sdUJBQW9CO1FBRTFFLElBQUfgWUFBWSxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsSUFBSSxZQUFZLENBQUMsYUFBYSxLQUFLLFlBQVfgQ0FBQyxZQUFZLEVBQUU7WUFDekcsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1NBQ25CO1FBRUQsSUFBSSx3QkFBd0IsRUFBRTs7WUFFNUIsSUFBTSw0QkFBNEIsR0FBdUIsd0JBQXdCLENBQUMsWUFBWSxDQUFDO1lBQy9GLElBQ0UsNEJBQTRCLENBQUMsTUFBTTtnQkFDbkMsNEJBQTRCLENBQUMsTUFBTSxZQUFZLGNBQWM7Z0JBQzdELDRCQUE0QixDQUFDLE1BQU0sQ0FBQyxrQkFBa0IsS0FBSyxDQUFDLENBQUMsRUFDN0Q7O2dCQUVBLElBQUfgQ0FBQyxnQkFBZ0IsQ0FBQyw0QkFBNEIsQ0FBQyxNQUFNLENBQUMsa0JBQWtCLENBQUMsQ0FBQzthQUMvRTtTQUNGO0tBQ0Y7Ozs7Ozs7Ozs7SUFNRCw0Q0FBWTs7Ozs7SUFBWixVQUFhLEtBQWtCOztRQUM3QixJQUFNLFdBQVcsR0FBZ0IsSUFBSSxDQUFDLG9CQUFvQixDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2xFLElBQUfgQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7O1FBRXhDLElBQUfgQ0FBQyxlQUFlLENB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Q3BFLE9BQU87U0FDUjs7UUFFRCxJQUFJLElBQUfgQ0FBQyxVQUFVLEVBQUUsRUFBRTs7O1lBR3JCLElBQUfgQ0FBQyx5QkFBeUIsRUFBRSxDQUFDO1NBQ2xDO2FBQU07O1lBRUwsSUFBSSxDQUFDLHdCQUF3QixFQUFFLENBQUM7U0FDakM7S0FDRjs7Ozs7Ozs7OztJQU1ELDJDQUFXOzs7OztJQUFYO1FBQ0UsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUU3QixJQUFJLElBQUfgQ0FBQyxrQ0FBa0MsRUFBRTtZQUMzQyxJQUFJLENBQUMsa0NBQWtDLENBQUMsV0FBVyxFQUFFLENBQUM7U0FDdkQ7UUFDRCxJQUFJLElBQUfgQ0FBQywrQkFBK0IsRUFBRTtZQUN4QyxJQUFJLENBQUMsK0JBQStCLENBQUMsV0FBVyxFQUFFLENBQUM7U0FDcEQ7UUFDRCxJQUFJLElBQUfgQ0FBQyxnQ0FBZ0MsRUFBRTtZQUN6QyxJQUFJLENBQUMsZ0NBQWdDLENBQUMsV0FBVyxFQUFFLENBQUM7U0FDckQ7S0FDRjs7Ozs7SUFLTyx3REFBd0I7Ozs7OztRQUM5QixJQUFNLElBQUfgR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3pDLElBQUfgQ0FBQyxJQUFJLHFCQUFXLElBQUfgQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQSxDQUFDO1FBQ2hELElBQUfgQ0FBQyxZQUFZLENBQUMsVUFBVSxFQUFFLElBQUfgQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFlBQVfgQ0FBQyxDQUFDLENBQUM7UUFDbkUsUUFBUSxDQUFDLElBQUfgQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDaEMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2IsUUFBUSxDQUFDLElBQUfgQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7Ozs7Ozs7SUFPMUIseURBQXlCOzs7Ozs7O1FBQy9CLElBQUfgaUJBQWlCLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFOztZQUN0QyxJQUFNLEtBQUcsR0FBRyxJQUFJLGNBQWMsRUFBRSxDQUFDO1lBQ2pDLEtBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxvQkFBVSxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUUsSUFBSSxDQUFDLENBQUM7WUFDM0QsS0FBRyxDQUFDLFlBQVfgR0FBRyxhQUFhLENBQUM7WUFDakMsS0FBRyxDQUFDLE1BQU0sR0FBRyxVQUFBLEtBQUs7O2dCQUNoQixJQUFNLElBQUfgR0FBRyxJQUFJLElBQUfgQ0FBQyxDQUFDLEtBQUcsQ0FBQyxRQUFRLENBQUMsRUFBRSxFQUFFLElBQUfgRUFBRSxXQUFXLEVBQUUsQ0FBQyxDQUFDO2dCQUM3RCxNQUFNLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsS0FBSSxDQUFDLFdBQVcsQ0FBQyxLQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQzthQUN4RSxDQUFDO1lBQ0YsS0FBRyxDQUFDLElBQUfgRUFBRSxDQUFDO1NBQ1o7Ozs7Ozs7O0lBU0ssb0RBQW9COzs7Ozs7Y0FBQyxLQUFrQjtRQUM3QyxPQUFPLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLEVBQUUsS0FBSyxFQUFFLElBQUfgQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDOzs7Ozs7Ozs7SUFVcEQsMkNBQVc7Ozs7Ozs7Y0FBQyxLQUFZO1FBQzlCLElBQUfgQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLGdCQUFnQixJQUFJLEtBQUssQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtZQUM5RSxPQUFPLG1CQUFTLElBQUfgQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBRSxPQUFPLENBQUMsV0FBVyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1NBQ3ZFO2FBQU07WUFDTCxPQUFPLEtBQUssQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUM7U0FDckM7Ozs7Ozs7SUFPSywwQ0FBVTs7Ozs7O1FBQ2hCLElBQUfgQ0FBQyxNQUFN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LEVBQUU7Ozs7cUNBS2Q7WUFDNUMsT0FBTyxFQUFFLElBQUk7WUFDYixNQUFNLEVBQUUsQ0FBQztZQUNULE1BQU0sRUFBRSxJQUFJO1lBQ1osU0FBUyxFQUFFLElBQUk7O1lBRWYsSUFBSSxFQUFFLEtBQUfgQ0FBQyxrQkFBa0I7U0FDOUI7Ozs7Ozs7Ozs7Ozs7Ozs7SUFRRCxvQ0FBUTs7Ozs7OztJQUFSO1FBQ0UsSUFBSSxDQUFDLGFBQWEsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsb0JBQW9CLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDOztRQUd0RixJQUFJLElBQUfgQ0FBQyxhQUFhLElBQUfgSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLElBQUfgSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLElBQUfgQ0FBQyxFQUFFO1lBQ3JGLElBQUfgQ0FBQyxhQUFhLENBQUMsTUFBTSxHQUFHLElBQUfgQ0FBQyxvQkFBb0IsQ0FBQyxNQUFNLENBQUM7U0FDOUQ7O1FBR0QsSUFBSSxDQUFDLFlBQVfgQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLElBQUfgQ0FBQyxNQUFNLENBQUMsQ0FBQztLQUNuRDs7Ozs7Ozs7Ozs7SUFPRCxvQ0FBUTs7Ozs7SUFBUixVQUFTLE9BQXlCO1FBQ2hDLElBQUfgQ0FBQyxPQUFPLElBQUfgQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ2xDLE9BQU8sS0FBSyxDQUFDO1NBQ2Q7UUFDRCxPQUFPLE9BQU8sQ0FBQyxFQUFFLEtBQUssSUFBSSxDQUFDLFlBQVfgQ0FBQyxFQUFFLENBQUM7S0FDNUM7Ozs7Ozs7Ozs7Ozs7Ozs7SUFTRCx1Q0FBVzs7Ozs7Ozs7SUFBWCxVQUFZLE9BQXNCOztRQUNoQyxJQUFNLE1BQU0sR0FBaUIsT0FBTyxXQUFROztRQUM1QyxJQUFNLFlBQVfgR0FBaUIsT0FBTyxpQkFBYzs7UUFFeEQsSUFBSSxJQUFJLENBQUM7O1FBQ1QsSUFBSSxPQUFPLENBQUM7UUFFWixJQUFJLFlBQVfgRUFBRTtZQUNoQixJQUFJLEdBQUcsWUFBWSxDQUFDLGFBQWEsQ0FBQztZQUNsQyxPQUFPLEdBQUcsWUFBWSxDQUFDLFlBQVfgQ0FBQztTQUNyQzthQUFNO1lBQ0wsT0FBTyxHQUFHLElBQUfgQ0FBQyxZQUFZLENBQUM7U0FDN0I7UUFFRCxJQUFJLE9BQU8sSUFBSSxNQUFNLElBQUfgTUFBTSxDQUFDLGFBQWEsSUFBSSxNQUFNLENBQUMsWUFBWSxFQUFFOzs7O1lBSXBFLElBQUfgQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQztTQUNqRDtRQUVELElBQUfgSUFBSSxJQUFJLE9BQU8sSUFBSSxJQUFJLENBQUMsRUFBRSxLQUFLLE9BQU8sQ0FBQyxFQUFFLEVBQUU7WUFDN0MsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7U0FDcEM7S0FDRjs7Ozs7Ozs7Ozs7Ozs7SUFRRCx3Q0FBWTs7Ozs7OztJQUFaLFVBQWEsT0FBeUIsRUFBRSxLQUFpQztRQUN2RSxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsSUFBSSxDQUFDLElBQUfgQ0FBQyxhQUFhLENBQUMsU0FBUyxFQUFFO1lBQ3hELE9BQU87U0FDUjs7UUFDRCxJQUFNLE1BQU0sR0FBVyxpQkFBTSxnQkFBZ0IsWUFBQyxLQUFLLENBQUMsQ0FBQztRQUNyRCxJQUFJLE1BQU0sS0FBSyxJQUFJLEVBQUU7WUFDbkIsSUFBSSxDQUFDLFlBQVfgQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDakM7YUFBTSxJQUFJLE1BQU0sS0FBSyxJQUFJLEVBQUU7WUFDMUIsSUFBSSxDQUFDLFlBQVfgQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDakM7S0FDRjs7Ozs7Ozs7Ozs7O0lBT0QsNkNBQWlCOzs7Ozs7SUFBakIsVUFBa0IsU0FBaUIsRUFBRSxLQUFpQzs7UUFDcEUsSUFBTSxNQUFNLEdBQVcsaUJBQU0scUJBQXFCLFlBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ3JFLElBQUfgTUFBTSxLQUFLLElBQUfgRUFBRTtZQUNuQixJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDYjthQUFNLElBQUfgTUFBTSxLQUFLLElBQUfgRUFBRTtZQUMxQixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7U0FDakI7S0FDRjs7Ozs7Ozs7Ozs7OztJQVFELHFDQUFTOzs7Ozs7SUFBVCxVQUFVLEtBQWEsRUFBRSxJQUFXO1FBQ2xDLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQztLQUNoQjs7Ozs7Ozs7SUFRTyx3Q0FBWTs7Ozs7OztjQUFDLFlBQThCLEVBQUUsTUFBMEI7OztRQUM3RSxJQUFJLEtBQUssQ0FBUztRQUNsQixJQUFJO1lBQ0YsS0FBSyxHQUFHLFFBQVEsQ0FBQyxZQUFZLEVBQUUsTUFBTSxDQUFDLENBQUM7U0FDeEM7UUFBQyxPQUFPLEdBQUcsRUFBRTtZQUNaLE1BQU0sR0FBRyxDQUFDO1NBQ1g7UUFDRCxRQUFRLEtBQUs7WUFDWCxLQUFLLENBQUM7O2dCQUVKLElBQUfgQ0FBQywyQkFBMkIsRUFBRSxDQUFDO2dCQUNuQyxNQUFNO1lBQ1IsS0FBSyxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUM7O2dCQUVwQixJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztnQkFDN0IsTUFBTTtZQUNSOztnQkFFRSxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztnQkFDMUIsTUFBTTtTQUNUO1FBQ0QsSUFBSSxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLFVBQUMsR0FBcUIsRUFBRSxDQUFTLElBQUssT0FBQSxDQUFDLElBQUfgS0FBSSxDQUFDLEtBQUssSUFBSSxDQUFDLEdBQUcsS0FBSSxDQUFDLEdBQUcsR0FBQSxDQUFDLENBQUM7Ozs7OztJQU0vRix1REFBMkI7Ozs7O1FBQ2pDLElBQUfgQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO1FBQ2YsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxtQkFBUyxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sR0FBRSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDOzs7Ozs7SUFNckUsaURBQXFCOzs7OztRQUMzQixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUfgQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsc0JBQVfgSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLElBQUcsQ0FBQyxDQUFDLENBQUM7UUFDOUUsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQzs7Ozs7O0lBTXhCLDhDQUFrQjs7Ozs7UUFDeEIsSUFBSSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLFlBQVfgRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssbUJBQVMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLElBQUcsQ0FBQyxDQUFDLENBQUM7UUFDMUcsSUFBSSxDQUFDLEdBQUcsR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLFlBQVfgRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssbUJBQVMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLElBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDOzs7Ozs7SUFNdEcsZ0NBQUk7Ozs7Ozs7UUFFVixJQUFJLElBQUfgQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsRUFBRTtZQUNqRCxPQUFPO1NBQ1I7UUFFRCxJQUFJLElBQUfgQ0FBQyxHQUFHLEtBQUssSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUU7WUFDbkMsT0FBTztTQUNSO1FBRUQsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2IsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUfgQ0FBQyxHQUFHLEdBQUcsQ0FBQyxFQUFFLElBQUfgQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFdEQsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxVQUFDLEdBQXFCLEVBQUUsQ0FBUyxJQUFLLE9BQUEsQ0FBQyxJQUFJLEtBQUfgQ0FBQyxLQUFLLElBQUfgQ0FBQyxHQUFHLEtBQUfgQ0FBQyxHQUFHLEdBQUEsQ0FBQyxDQUFDOzs7Ozs7SUFNcEcsb0NBQVE7Ozs7Ozs7UUFFZCxJQUFJLElBQUfgQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUM1QixPQUFPO1NBQ1I7UUFFRCxJQUFJLElBQUfgQ0FBQyxLQUFLLEtBQUssQ0FBQyxFQUFFO1lBQ3BCLE9BQU87U0FDUjtRQUVELElBQUfgQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN6QyxJQUFJLENBQUMsR0FBRyxHQUFHLElBQUfgQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUV0RCxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUfgQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFVBQUMsR0FBcUIsRUFBRSxDQUFTLElBQUssT0FBQSxDQUFDLElBQUfgS0FBSSxDQUFDLEtBQUssSUFBSSxDQUFDLEdBQUcsS0FBSSxDQUFDLEdBQUcsR0FBQSxDQUFDLENBQUM7Ozs7Ozs7SUFRcEcsNENBQWdCOzs7OztjQUFDLGFBQXFCO1FBQzVDLE9BQU8sQ0FBQyxDQUFDLElBQUfgQ0FBQyxXQUFXLElBQUfgSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLEtBQUssS0FBSyxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLElBQUfgQ0FBQyxRQUFRLENBQUMsS0FBSyxhQUFhLENBQUM7Ozs7Ozs7O0lBTTNILDBDQUFjOzs7Ozs7Y0FBQyxJQUFzQixFQUFFLE9BQXlCOzs7UUFJdEUsSUFBSSxTQUFTLENBQVM7O1FBQ3RCLElBQUfgWUFBWSxDQUFTO1FBQ3pCLElBQUk7WUFDRixTQUFTLEdBQUcsUUFBUSxDQUFDLElBQUfgRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDeEMsWUFBWSxHQUFHLFFBQVEsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQy9DO1FBQUMsT0FBTyxHQUFHLEVBQUU7WUFDWixPQUFPLENBQUMsS0FBSyxDQUFDLDJEQUEyRCxDQUFDLENBQUM7WUFDM0UsTUFBTSxHQUFHLENBQUM7U0FDWDtRQUNELElBQUfgU0FBUyxLQUFLLElBQUfgQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxZQUFZLEtBQUssQ0FBQyxFQUFFOztZQUU5RCxJQUFJLENBQUMsMkJBQTJCLEVBQUUsQ0FBQztZQUNuQyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUfgQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFVBQUMsR0FBcUIsRUFBRSxDQUFTLElBQUssT0FBQSxDQUFDLElBQUfgS0FBSSxDQUFDLEtBQUssSUFBSSxDQUFDLEdBQUcsS0FBSSxDQUFDLEdBQUcsR0FBQSxDQUFDLENBQUM7WUFDMUcsT0FBTztTQUNSOztRQUVELElBQUfgU0FBUyxLQUFLLENBQUMsSUFBSSxZQUFZLEtBQUssSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFOztZQUU5RCxJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztZQUM3QixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUfgQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFVBQUMsR0FBcUIsRUFBRSxDQUFTLElBQUssT0FBQSxDQUFDLElBQUfgS0FBSSxDQUFDLEtBQUssSUFBSSxDQUFDLEdBQUcsS0FBSSxDQUFDLEdBQUcsR0FBQSxDQUFDLENBQUM7WUFDMUcsT0FBTztTQUNSOztRQUdELElBQUfgU0FBUyxHQUFHLFlBQVfgRUFBRTtZQUM1QixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7U0FDakI7YUFBTSxJQUFJLFNBQVMsR0FBRyxZQUFZLEVBQUU7WUFDbkMsSUFBSSxDQUFDLElBQUfgRUFBRSxDQUFDO1NBQ2I7OztnQkEvVEosU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxhQUFhO29CQUV2Qiw4eEVBQTRCO29CQUM1QixlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7aUJBQ2hEOzs7K0JBS0UsS0FBSzt5QkFNTCxLQUFLOzhCQUtMLEtBQUs7Z0NBTUwsS0FBSztzQ0FNTCxLQUFLOytCQUtMLE1BQU07OzRCQS9FVDtFQStDdUMsbUJBQW1COzs7Ozs7Ozs7Ozs7Ozs7K0JDZXpCLFdBQVcsQ0FBQyxRQUFROzs7OzsyQkFLeEIsV0FBVyxDQUFDLElBQUk7Ozs7OytCQUtaLFdBQVcsQ0FBQyxRQUFROzs7OzsyQkFLeEIsV0FBVyxDQUFDLElBQUk7Ozs7O21DQUtSLFdBQVcsQ0FBQyxhQUFhOzs7Ozs4QkFLOUIsV0FBVyxDQUFDLE9BQU87Ozs7O3VDQUtWLFdBQVcsQ0FBQyxpQkFBaUI7OztnQkE1RHJFLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsb0JBQW9CO29CQVU5QixrcURBQW1DO29CQUNuQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7aUJBQ2hEOzs7Z0NBTUUsS0FBSztzQ0FLTCxLQUFLOztrQ0F4RFI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7b0JDb0V5QyxJQUFJLFlBQVfgRUFBVTs7Ozs7eUJBVzFDLEVBQUU7Ozs7Ozt5QkFVYixLQUFLOzs7OzswQkFLSixFQUFFOzs7OzJCQWVhLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFOzs7Ozs2QkFLekIsSUFBSSxVQUFVLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUUsWUFBWSxDQUFDOzs7O2tDQUk5RDtZQUMvQyxRQUFRLEVBQUUsb0JBQW9CLENBQUMsR0FBRztZQUNsQyxNQUFNLEVBQUUsSUFBSSxDQUFDLGFBQWE7WUFDMUIsUUFBUSxFQUFFLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxvQkFBb0IsRUFBRSxlQUFlLEVBQUU7U0FDbEU7Ozs7Ozs7Ozs7Ozs7OztJQVFELHdDQUFROzs7Ozs7O0lBQVI7UUFDRSxJQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDLHNCQUFzQixFQUFFLENBQUM7UUFDeEQsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO0tBQ3RCOzs7Ozs7Ozs7Ozs7O0lBT0QsMkNBQVc7Ozs7Ozs7SUFBWCxVQUFZLE9BQXNCOztRQUNoQyxJQUFNLFlBQVfgR0FBaUIsT0FBTyxXQUFROztRQUNsRCxJQUFNLFlBQVfgR0FBaUIsT0FBTyx1QkFBb0I7OztRQUk5RCxJQUNFLFlBQVk7WUFDWixDQUFDLFlBQVfgQ0FBQyxXQUFXO2FBQ3hCLFlBQVfgQ0FBQyxhQUFhLEtBQUssWUFBWSxDQUFDLFlBQVfgS0FBSyxDQUFDLFlBQVfgQ0FBQyxhQUFhLElBQUfgQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLENBQUMsRUFDekg7WUFDQSxJQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDLHNCQUFzQixFQUFFLENBQUM7U0FDekQ7UUFDRCxJQUFJLFlBQVfgSUFBSSxDQUFDLFlBQVfgQ0FBQyxXQUFXLElBQUfgWUFBWSxDQUFDLGFBQWEsS0FBSyxZQUFZLENBQUMsWUFBWSxFQUFFO1lBQ3pHLElBQUfgQ0FBQyxhQUFhLEVBQUUsQ0FBQztTQUN0QjtLQUNGOzs7Ozs7Ozs7Ozs7SUFPRCxnREFBZ0I7Ozs7OztJQUFoQixVQUFpQixLQUFhO1FBQzVCLElBQUfgQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQ3ZCOzs7Ozs7Ozs7Ozs7SUFPRCx1REFBdUI7Ozs7OztJQUF2QixVQUF3QixHQUFVOztRQUNoQyxJQUFNLEtBQUssR0FBVyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxVQUFDLEdBQVUsSUFBSyxPQUFBLEdBQUcsSUFBSSxHQUFHLElBQUfgR0FBRyxDQUFDLEVBQUUsS0FBSyxHQUFHLENBQUMsRUFBRSxHQUFBLENB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LEdBQUcsSUFBSSxDQUFDO1lBQ3pFLElBQUfgQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUM7WUFFekMsSUFBSSxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUM7U0FDN0I7UUFFRCxJQUFJLE1BQU0sQ0FBQyxNQUFNLFlBQVfgY0FBYyxFQUFFO1lBQzNDLElBQUfgQ0FBQyxTQUFTLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDaEM7OztnQkFsUkosU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxrQkFBa0I7b0JBRTVCLHFnRUFBaUM7b0JBQ2pDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOztpQkFDaEQ7Ozt5QkFLRSxLQUFLOzhCQUlMLEtBQUs7cUNBSUwsS0FBSztzQ0FLTCxLQUFLO3VCQUtMLE1BQU07O2dDQXBFVDs7Ozs7Ozs7OztBQ3VDQSxJQUFhLFVBQVUsR0FBRztJQUN4QixtQkFBbUI7SUFDbkIscUJBQXFCO0lBQ3JCLHFCQUFxQjtJQUNyQixxQkFBcUI7SUFDckIsYUFBYTtJQUNiLGlCQUFpQjtJQUNqQixxQkFBcUI7SUFDckIsdUJBQXVCO0lBQ3ZCLG1CQUFtQjtDQUNwQjs7Ozs7Ozs7Ozs7Ozs7OztJQ0xRLDBCQUFPOzs7O0lBQWQsVUFBZSxNQUE4QjtRQUMzQyxPQUFPO1lBQ0wsUUFBUSxFQUFFLGtCQUFrQjtZQUM1QixTQUFTLEVBQUU7Z0JBQ1Q7b0JBQ0UsT0FBTyxFQUFFLHNCQUFzQjtvQkFDL0IsUUFBUSxFQUFFLE1BQU0sR0FBRyxNQUFNLEdBQUcsRUFBRTtpQkFDL0I7Z0JBQ0Q7b0JBQ0UsT0FBTyxFQUFFLGVBQWU7b0JBQ3hCLFVBQVUsRUFBRSxvQkFBb0I7b0JBQ2hDLElBQUfgRUFBRSxDQUFDLHNCQUFzQixDQUFDO2lCQUMvQjtnQkFDRDtvQkFDRSxPQUFPLEVBQUUsY0FBYztvQkFDdkIsVUFBVSxFQUFFLG1CQUFtQjtpQkFDaEM7YUFDRjtTQUNGLENBQUM7S0FDSDs7Z0JBekJGLFFBQVEsU0FBQztvQkFDUixPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUM7b0JBQ3ZCLFlBQVfgRUFBRSxDQUFDLFVBQVUsRUFBRSxVQUFVLENBQUM7b0JBQ3RDLE9BQU8sRUFBRSxDQUFDLHFCQUFxQixDQUFDO2lCQUNqQzs7NkJBMUNEOzs7Ozs7O0FBdUVBLDhCQUFxQyxRQUErQjtJQUNsRSxPQUFPLElBQUfgZUFBZSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0NBQ3RDOzs7O0FBRUQ7SUFDRSxPQUFPLElBQUfgY0FBYyxFQUFFLENBQUM7Q0FDN0I7Ozs7Ozs7Ozs7Ozs7OyJ9