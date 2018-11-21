(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('mousetrap'), require('hammerjs')) :
    typeof define === 'function' && define.amd ? define('modal-angular-gallery', ['exports', '@angular/core', '@angular/common', 'mousetrap', 'hammerjs'], factory) :
    (factory((global['modal-angular-gallery'] = {}),global.ng.core,global.ng.common));
}(this, (function (exports,core,common) { 'use strict';

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
            this.clickOutside = new core.EventEmitter();
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
            { type: core.Directive, args: [{
                        selector: '[fgClickOutside]'
                    },] }
        ];
        ClickOutsideDirective.propDecorators = {
            clickOutsideEnable: [{ type: core.Input }],
            clickOutside: [{ type: core.Output }],
            onClick: [{ type: core.HostListener, args: ['click', ['$event'],] }]
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
            { type: core.Directive, args: [{
                        selector: '[fgSize]'
                    },] }
        ];
        /** @nocollapse */
        SizeDirective.ctorParameters = function () {
            return [
                { type: core.Renderer2 },
                { type: core.ElementRef }
            ];
        };
        SizeDirective.propDecorators = {
            sizeConfig: [{ type: core.Input }]
        };
        return SizeDirective;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var KeyboardNavigationDirective = /** @class */ (function () {
        function KeyboardNavigationDirective() {
            this.keyPress = new core.EventEmitter();
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
            { type: core.Directive, args: [{
                        selector: '[fgKeyboardNavigation]'
                    },] }
        ];
        KeyboardNavigationDirective.propDecorators = {
            isOpen: [{ type: core.Input }],
            keyPress: [{ type: core.Output }],
            onKeyDown: [{ type: core.HostListener, args: ['window:keydown', ['$event'],] }]
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
            { type: core.Directive, args: [{
                        selector: '[fgWrap]'
                    },] }
        ];
        /** @nocollapse */
        WrapDirective.ctorParameters = function () {
            return [
                { type: core.Renderer2 },
                { type: core.ElementRef }
            ];
        };
        WrapDirective.propDecorators = {
            wrap: [{ type: core.Input }],
            width: [{ type: core.Input }]
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
            { type: core.Directive, args: [{
                        selector: '[fgDirection]'
                    },] }
        ];
        /** @nocollapse */
        DirectionDirective.ctorParameters = function () {
            return [
                { type: core.Renderer2 },
                { type: core.ElementRef }
            ];
        };
        DirectionDirective.propDecorators = {
            direction: [{ type: core.Input }],
            justify: [{ type: core.Input }]
        };
        return DirectionDirective;
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
            { type: core.Directive, args: [{
                        selector: '[fgATagBgImage]'
                    },] }
        ];
        /** @nocollapse */
        ATagBgImageDirective.ctorParameters = function () {
            return [
                { type: core.Renderer2 },
                { type: core.ElementRef }
            ];
        };
        ATagBgImageDirective.propDecorators = {
            image: [{ type: core.Input }],
            style: [{ type: core.Input }]
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
            { type: core.Directive, args: [{
                        selector: '[fgDescription]'
                    },] }
        ];
        /** @nocollapse */
        DescriptionDirective.ctorParameters = function () {
            return [
                { type: core.Renderer2 },
                { type: core.ElementRef }
            ];
        };
        DescriptionDirective.propDecorators = {
            description: [{ type: core.Input }]
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
            { type: core.Component, args: [{
                        selector: 'fg-background',
                        template: "<div class=\"ng-overlay\" *ngIf=\"isOpen\"\n     [attr.aria-label]=\"accessibilityConfig?.backgroundAriaLabel\"\n     [title]=\"accessibilityConfig?.backgroundTitle\"></div>\n",
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        styles: [".ng-overlay{position:fixed;top:0;left:0;width:100vw;height:100vh;background:#000;opacity:.8;z-index:9999}"]
                    }] }
        ];
        BackgroundComponent.propDecorators = {
            isOpen: [{ type: core.Input }],
            accessibilityConfig: [{ type: core.Input }]
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
    /**
     * Class `Image` that represents an image with both `modal` and `plain` configurations.
     * Both image `id` and `modal` are mandatory, instead `plain` is optional.
     */
    var /**
     * Class `Image` that represents an image with both `modal` and `plain` configurations.
     * Both image `id` and `modal` are mandatory, instead `plain` is optional.
     */ Image = /** @class */ (function () {
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
    var /**
     * Class `ImageModalEvent` that represents the event payload with the result and the triggered action.
     */ ImageModalEvent = /** @class */ (function () {
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
    var KEYBOARD_CONFIGURATION = new core.InjectionToken('KEYBOARD_CONFIGURATION');
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
                    this.mousetrap = new ( /** @type {?} */(Mousetrap))();
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
            { type: core.Injectable }
        ];
        /** @nocollapse */
        KeyboardService.ctorParameters = function () {
            return [
                { type: undefined, decorators: [{ type: core.Inject, args: [KEYBOARD_CONFIGURATION,] }] }
            ];
        };
        return KeyboardService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var GalleryService = /** @class */ (function () {
        function GalleryService() {
            this.navigate = new core.EventEmitter();
            this.close = new core.EventEmitter();
            this.update = new core.EventEmitter();
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
            { type: core.Injectable }
        ];
        return GalleryService;
    }());

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (b.hasOwnProperty(p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        }
        catch (error) {
            e = { error: error };
        }
        finally {
            try {
                if (r && !r.done && (m = i["return"]))
                    m.call(i);
            }
            finally {
                if (e)
                    throw e.error;
            }
        }
        return ar;
    }
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

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
            { type: core.Component, args: [{
                        selector: 'fg-accessible',
                        template: "",
                        changeDetection: core.ChangeDetectionStrategy.OnPush
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
            _this.loadImage = new core.EventEmitter();
            /**
             * Output to emit any changes of the current image. The payload contains an `ImageModalEvent`.
             */
            _this.changeImage = new core.EventEmitter();
            /**
             * Output to emit an event when the modal gallery is closed. The payload contains an `ImageModalEvent`.
             */
            _this.close = new core.EventEmitter();
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
                if (image === void 0) {
                    image = this.currentImage;
                }
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
                if (image === void 0) {
                    image = this.currentImage;
                }
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
                if (image === void 0) {
                    image = this.currentImage;
                }
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
                if (action === void 0) {
                    action = Action.NORMAL;
                }
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
                if (action === void 0) {
                    action = Action.NORMAL;
                }
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
                if (action === void 0) {
                    action = Action.NORMAL;
                }
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
                if (action === void 0) {
                    action = Action.NORMAL;
                }
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
                if (action === void 0) {
                    action = this.SWIPE_ACTION.RIGHT;
                }
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
                if (image === void 0) {
                    image = this.currentImage;
                }
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
            { type: core.Component, args: [{
                        selector: 'fg-current-image',
                        template: "<main class=\"main-image-container\"\n      fgKeyboardNavigation [isOpen]=\"isOpen\" (keyPress)=\"onKeyPress($event)\"\n      [attr.aria-label]=\"accessibilityConfig.mainContainerAriaLabel\"\n      [title]=\"accessibilityConfig.mainContainerTitle\">\n\n  <div class=\"left-sub-container\">\n    <a class=\"nav-left\"\n       [attr.aria-label]=\"accessibilityConfig.mainPrevImageAriaLabel\"\n       [tabindex]=\"isFirstImage ? -1 : 0\" role=\"button\"\n       (click)=\"onNavigationEvent('left', $event)\" (keyup)=\"onNavigationEvent('left', $event)\">\n      <div class=\"inside {{isFirstImage ? 'empty-arrow-image' : 'left-arrow-image'}}\"\n           aria-hidden=\"true\"\n           [title]=\"accessibilityConfig.mainPrevImageTitle\"></div>\n    </a>\n\n    <ng-container *ngIf=\"slideConfig?.sidePreviews?.show\">\n      <ng-container *ngIf=\"getLeftPreviewImage() as leftPreview\">\n        <img *ngIf=\"!isFirstImage; else firstImage\"\n             class=\"inside current-image-previous\"\n             [src]=\"leftPreview.plain?.img ? leftPreview.plain.img : leftPreview.modal.img\"\n             [hidden]=\"loading\"\n             fgSize [sizeConfig]=\"{width: slideConfig.sidePreviews?.size.width, height: slideConfig.sidePreviews?.size.height}\"\n             [attr.aria-label]=\"leftPreview.modal.ariaLabel\"\n             [title]=\"leftPreview.modal.title ? leftPreview.modal.title : getDescriptionToDisplay(leftPreview)\"\n             alt=\"{{leftPreview.modal.alt ? leftPreview.modal.alt : getAltDescriptionByImage(leftPreview)}}\"\n             [tabindex]=\"0\" role=\"img\"\n             (click)=\"onNavigationEvent('left', $event, clickAction)\" (keyup)=\"onNavigationEvent('left', $event, keyboardAction)\"/>\n        <ng-template #firstImage>\n          <div class=\"current-image-previous hidden\"\n               fgSize [sizeConfig]=\"{width: slideConfig.sidePreviews?.size.width, height: slideConfig.sidePreviews?.size.height}\"></div>\n        </ng-template>\n      </ng-container>\n    </ng-container>\n  </div>\n\n\n  <figure id=\"current-figure\" [style.display]=\"loading ? 'none' : ''\">\n    <img id=\"current-image\"\n         class=\"inside\"\n         [src]=\"currentImage.modal.img\"\n         [attr.aria-label]=\"currentImage.modal.ariaLabel\"\n         [title]=\"currentImage.modal.title ? currentImage.modal.title : getTitleToDisplay()\"\n         alt=\"{{currentImage.modal.alt ? currentImage.modal.alt : getAltDescriptionByImage()}}\"\n         [tabindex]=\"0\" role=\"img\"\n         (load)=\"onImageLoad($event)\"\n         (click)=\"onImageEvent($event, clickAction)\" (keyup)=\"onImageEvent($event, keyboardAction)\"\n         (swipeleft)=\"swipe($event.type)\"\n         (swiperight)=\"swipe($event.type)\"/>\n    <figcaption *ngIf=\"getDescriptionToDisplay() !== ''\"\n                class=\"inside description\"\n                fgDescription [description]=\"configCurrentImage?.description\"\n                [innerHTML]=\"getDescriptionToDisplay()\">\n    </figcaption>\n  </figure>\n\n  <div class=\"right-sub-container\">\n    <ng-container *ngIf=\"slideConfig?.sidePreviews?.show\">\n      <ng-container *ngIf=\"getRightPreviewImage() as rightPreview\">\n        <img *ngIf=\"!isLastImage; else lastImage\"\n             class=\"inside current-image-next\"\n             [src]=\"rightPreview.plain?.img ? rightPreview.plain.img : rightPreview.modal.img\"\n             [hidden]=\"loading\"\n             fgSize [sizeConfig]=\"{width: slideConfig.sidePreviews?.size.width, height: slideConfig.sidePreviews?.size.height}\"\n             [attr.aria-label]=\"rightPreview.modal.ariaLabel\"\n             [title]=\"rightPreview.modal.title ? rightPreview.modal.title : getDescriptionToDisplay(rightPreview)\"\n             alt=\"{{rightPreview.modal.alt ? rightPreview.modal.alt : getAltDescriptionByImage(rightPreview)}}\"\n             [tabindex]=\"0\" role=\"img\"\n             (click)=\"onNavigationEvent('right', $event, clickAction)\" (keyup)=\"onNavigationEvent('right', $event, keyboardAction)\"/>\n        <ng-template #lastImage>\n          <div class=\"current-image-next hidden\"\n               fgSize [sizeConfig]=\"{width: slideConfig.sidePreviews?.size.width, height: slideConfig.sidePreviews?.size.height}\">\n          </div>\n        </ng-template>\n      </ng-container>\n    </ng-container>\n\n    <ng-container *ngIf=\"loading && configCurrentImage?.loadingConfig?.enable\">\n      <fg-loading-spinner [loadingConfig]=\"configCurrentImage?.loadingConfig\"\n                          [accessibilityConfig]=\"accessibilityConfig\"></fg-loading-spinner>\n    </ng-container>\n\n    <a class=\"nav-right\"\n       [attr.aria-label]=\"accessibilityConfig.mainNextImageAriaLabel\"\n       [tabindex]=\"isLastImage ? -1 : 0\" role=\"button\"\n       (click)=\"onNavigationEvent('right', $event)\" (keyup)=\"onNavigationEvent('right', $event)\">\n      <div class=\"inside {{isLastImage ? 'empty-arrow-image' : 'right-arrow-image'}}\"\n           aria-hidden=\"true\"\n           [title]=\"accessibilityConfig.mainNextImageTitle\"></div>\n    </a>\n  </div>\n</main>\n",
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        styles: [":host{display:flex;flex-direction:column;justify-content:center}.main-image-container{display:flex;flex-direction:row;align-items:center;justify-content:space-between}.main-image-container .nav,.main-image-container>.left-sub-container>.nav-left,.main-image-container>.right-sub-container>.nav-right{-webkit-animation:1s animatezoom;animation:1s animatezoom;cursor:pointer;transition:.5s}.main-image-container .nav:hover,.main-image-container>.left-sub-container>.nav-left:hover,.main-image-container>.right-sub-container>.nav-right:hover{-webkit-transform:scale(1.1);transform:scale(1.1)}.main-image-container>.left-sub-container{display:flex;flex-direction:row;justify-content:space-around;align-items:center}.main-image-container>.left-sub-container>.nav-left{margin-right:5px;margin-left:15px}.main-image-container>.right-sub-container{display:flex;flex-direction:row;justify-content:space-around;align-items:center}.main-image-container>.right-sub-container>.nav-right{margin-right:15px;margin-left:5px}#current-image{height:auto;max-width:80vw;max-height:60vh;cursor:pointer}@media screen and (min-width:70vw){#current-image{height:auto;max-width:70vw;max-height:60vh;cursor:pointer}}#current-figure{-webkit-animation:.8s fadein-visible;animation:.8s fadein-visible;text-align:center}figure{margin:0;position:relative}figure img{max-width:100%;height:auto;display:block}figcaption{padding:10px;position:absolute;bottom:0;left:0;right:0}.description{font-weight:700;text-align:center}@-webkit-keyframes fadein-visible{from{opacity:0}to{opacity:1}}@keyframes fadein-visible{from{opacity:0}to{opacity:1}}@-webkit-keyframes fadein-semi-visible05{from{opacity:0}to{opacity:.5}}@keyframes fadein-semi-visible05{from{opacity:0}to{opacity:.5}}@-webkit-keyframes fadein-semi-visible08{from{opacity:0}to{opacity:.8}}@keyframes fadein-semi-visible08{from{opacity:0}to{opacity:.8}}@-webkit-keyframes fadein-semi-visible09{from{opacity:0}to{opacity:.9}}@keyframes fadein-semi-visible09{from{opacity:0}to{opacity:.9}}", ".arrow-image,.empty-arrow-image,.left-arrow-image,.right-arrow-image{width:30px;height:30px;background-size:30px}.empty-arrow-image{background:#000;opacity:0}.left-arrow-image{background-image:url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/PjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDQ3Ny4xNzUgNDc3LjE3NSIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNDc3LjE3NSA0NzcuMTc1OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjUxMnB4IiBoZWlnaHQ9IjUxMnB4Ij48Zz48cGF0aCBkPSJNMTQ1LjE4OCwyMzguNTc1bDIxNS41LTIxNS41YzUuMy01LjMsNS4zLTEzLjgsMC0xOS4xcy0xMy44LTUuMy0xOS4xLDBsLTIyNS4xLDIyNS4xYy01LjMsNS4zLTUuMywxMy44LDAsMTkuMWwyMjUuMSwyMjUgICBjMi42LDIuNiw2LjEsNCw5LjUsNHM2LjktMS4zLDkuNS00YzUuMy01LjMsNS4zLTEzLjgsMC0xOS4xTDE0NS4xODgsMjM4LjU3NXoiIGZpbGw9IiNGRkZGRkYiLz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PC9zdmc+);opacity:.8;transition:.5s}.left-arrow-image:hover{-webkit-transform:scale(1.2);transform:scale(1.2)}.right-arrow-image{background-image:url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/PjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDQ3Ny4xNzUgNDc3LjE3NSIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNDc3LjE3NSA0NzcuMTc1OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjUxMnB4IiBoZWlnaHQ9IjUxMnB4Ij48Zz48cGF0aCBkPSJNMzYwLjczMSwyMjkuMDc1bC0yMjUuMS0yMjUuMWMtNS4zLTUuMy0xMy44LTUuMy0xOS4xLDBzLTUuMywxMy44LDAsMTkuMWwyMTUuNSwyMTUuNWwtMjE1LjUsMjE1LjUgICBjLTUuMyw1LjMtNS4zLDEzLjgsMCwxOS4xYzIuNiwyLjYsNi4xLDQsOS41LDRjMy40LDAsNi45LTEuMyw5LjUtNGwyMjUuMS0yMjUuMUMzNjUuOTMxLDI0Mi44NzUsMzY1LjkzMSwyMzQuMjc1LDM2MC43MzEsMjI5LjA3NXogICAiIGZpbGw9IiNGRkZGRkYiLz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PC9zdmc+);opacity:.8;transition:.5s}.right-arrow-image:hover{-webkit-transform:scale(1.2);transform:scale(1.2)}", "@media only screen and (max-width:1024px),only screen and (max-device-width:1024px){.current-image-next,.current-image-previous{display:none}}@media only screen and (min-device-width:1025px){.current-image-next,.current-image-preview,.current-image-previous{height:auto;cursor:pointer;opacity:.5;-webkit-animation:.8s fadein-semi-visible05;animation:.8s fadein-semi-visible05}.current-image-next:hover,.current-image-preview:hover,.current-image-previous:hover{opacity:1;transition:.5s}.current-image-previous{margin-left:10px;margin-right:5px}.current-image-next{margin-right:10px;margin-left:5px}}@-webkit-keyframes fadein-semi-visible05{from{opacity:0}to{opacity:.5}}@keyframes fadein-semi-visible05{from{opacity:0}to{opacity:.5}}"]
                    }] }
        ];
        CurrentImageComponent.propDecorators = {
            currentImage: [{ type: core.Input }],
            images: [{ type: core.Input }],
            isOpen: [{ type: core.Input }],
            currentImageConfig: [{ type: core.Input }],
            slideConfig: [{ type: core.Input }],
            accessibilityConfig: [{ type: core.Input }],
            keyboardConfig: [{ type: core.Input }],
            loadImage: [{ type: core.Output }],
            changeImage: [{ type: core.Output }],
            close: [{ type: core.Output }]
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
    var /**
     * Class `LineLayout` to configure a linear plain gallery.
     */ LineLayout = /** @class */ (function () {
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
    var /**
     * Class `GridLayout` to configure a grid plain gallery.
     */ GridLayout = /** @class */ (function () {
        function GridLayout(size, breakConfig) {
            this.size = size;
            this.breakConfig = breakConfig;
        }
        return GridLayout;
    }());
    /**
     * Class `AdvancedLayout` to configure a fully custom plain gallery.
     */
    var /**
     * Class `AdvancedLayout` to configure a fully custom plain gallery.
     */ AdvancedLayout = /** @class */ (function () {
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
            this.close = new core.EventEmitter();
            /**
             * Output to emit an event when an image is changed.
             */
            this.show = new core.EventEmitter();
            /**
             * Output to emit an event when the current image is the first one.
             */
            this.firstImage = new core.EventEmitter();
            /**
             * Output to emit an event when the current image is the last one.
             */
            this.lastImage = new core.EventEmitter();
            /**
             * Output to emit an event when the modal gallery is closed.
             */
            this.hasData = new core.EventEmitter();
            /**
             * Output to emit an event when a button is clicked, but before that the action is triggered.
             */
            this.buttonBeforeHook = new core.EventEmitter();
            /**
             * Output to emit an event when a button is clicked, but after that the action is triggered.
             */
            this.buttonAfterHook = new core.EventEmitter();
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
                if (common.isPlatformBrowser(this.platformId)) {
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
                if (action === void 0) {
                    action = Action.NORMAL;
                }
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
                if (action === void 0) {
                    action = Action.NORMAL;
                }
                if (isCalledByService === void 0) {
                    isCalledByService = false;
                }
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
                if (isCalledByService === void 0) {
                    isCalledByService = false;
                }
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
                if (common.isPlatformBrowser(this.platformId)) {
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
                    return ( /** @type {?} */(this.currentImage.modal.img)).replace(/^.*[\\\/]/, '');
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
                if (common.isPlatformBrowser(this.platformId)) {
                    // if both Blob constructor and msSaveOrOpenBlob are supported by the current browser
                    return window.Blob && window.navigator.msSaveOrOpenBlob;
                }
                if (common.isPlatformServer(this.platformId)) {
                    // server only
                    return true;
                }
            };
        ModalGalleryComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'fg-modal-gallery',
                        exportAs: 'fgModalGallery',
                        template: "<fg-plain-gallery [images]=\"images\"\n                  [showGallery]=\"showGallery && isPlainGalleryVisible()\"\n                  [plainGalleryConfig]=\"plainGalleryConfig\"\n                  [accessibilityConfig]=\"accessibilityConfig\"\n                  (show)=\"onShowModalGallery($event)\"></fg-plain-gallery>\n\n<fg-background [isOpen]=\"opened\"\n               [accessibilityConfig]=\"accessibilityConfig\"></fg-background>\n\n<div id=\"modal-gallery-wrapper\" *ngIf=\"opened\"\n     [attr.aria-label]=\"accessibilityConfig.modalGalleryContentAriaLabel\"\n     [title]=\"accessibilityConfig.modalGalleryContentTitle\"\n     fgClickOutside [clickOutsideEnable]=\"enableCloseOutside\"\n     (clickOutside)=\"onClickOutside($event)\">\n\n  <div id=\"flex-min-height-ie-fix\">\n    <div id=\"modal-gallery-container\">\n\n      <fg-upper-buttons [currentImage]=\"currentImage\"\n                        [buttonsConfig]=\"buttonsConfig\"\n                        (delete)=\"onDelete($event)\"\n                        (navigate)=\"onNavigate($event)\"\n                        (download)=\"onDownload($event)\"\n                        (close)=\"onCloseGallery($event)\"\n                        (fullscreen)=\"onFullScreen($event)\"\n                        (customEmit)=\"onCustomEmit($event)\"></fg-upper-buttons>\n\n      <fg-current-image [images]=\"images\"\n                        [currentImage]=\"currentImage\"\n                        [isOpen]=\"opened\"\n                        [slideConfig]=\"slideConfig\"\n                        [keyboardConfig]=\"keyboardConfig\"\n                        [accessibilityConfig]=\"accessibilityConfig\"\n                        [currentImageConfig]=\"currentImageConfig\"\n                        (loadImage)=\"onImageLoad($event)\"\n                        (changeImage)=\"onChangeCurrentImage($event)\"\n                        (close)=\"onCloseGallery($event)\"></fg-current-image>\n\n      <div>\n        <fg-dots [images]=\"images\"\n                 [currentImage]=\"currentImage\"\n                 [dotsConfig]=\"dotsConfig\"\n                 [accessibilityConfig]=\"accessibilityConfig\"\n                 (clickDot)=\"onClickDot($event)\"></fg-dots>\n\n        <fg-previews [images]=\"images\"\n                     [currentImage]=\"currentImage\"\n                     [previewConfig]=\"previewConfig\"\n                     [accessibilityConfig]=\"accessibilityConfig\"\n                     (clickPreview)=\"onClickPreview($event)\"></fg-previews>\n      </div>\n    </div>\n  </div>\n</div>\n",
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        styles: ["#modal-gallery-wrapper{position:fixed;top:0;left:0;width:100vw;height:100vh;z-index:10000}#flex-min-height-ie-fix{display:flex;flex-direction:column;justify-content:center}#modal-gallery-container{display:flex;flex-direction:column;justify-content:space-between;min-height:100vh}"]
                    }] }
        ];
        /** @nocollapse */
        ModalGalleryComponent.ctorParameters = function () {
            return [
                { type: KeyboardService },
                { type: GalleryService },
                { type: Object, decorators: [{ type: core.Inject, args: [core.PLATFORM_ID,] }] },
                { type: core.ChangeDetectorRef }
            ];
        };
        ModalGalleryComponent.propDecorators = {
            id: [{ type: core.Input }],
            modalImages: [{ type: core.Input }],
            buttonsConfig: [{ type: core.Input }],
            enableCloseOutside: [{ type: core.Input }],
            currentImageConfig: [{ type: core.Input }],
            dotsConfig: [{ type: core.Input }],
            previewConfig: [{ type: core.Input }],
            slideConfig: [{ type: core.Input }],
            accessibilityConfig: [{ type: core.Input }],
            keyboardConfig: [{ type: core.Input }],
            plainGalleryConfig: [{ type: core.Input }],
            close: [{ type: core.Output }],
            show: [{ type: core.Output }],
            firstImage: [{ type: core.Output }],
            lastImage: [{ type: core.Output }],
            hasData: [{ type: core.Output }],
            buttonBeforeHook: [{ type: core.Output }],
            buttonAfterHook: [{ type: core.Output }],
            currentImageComponent: [{ type: core.ViewChild, args: [CurrentImageComponent,] }],
            onPopState: [{ type: core.HostListener, args: ['window:popstate', ['$event'],] }]
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
            _this.refresh = new core.EventEmitter();
            /**
             * Output to emit clicfg on delete button. The payload contains a `ButtonEvent`.
             */
            _this.delete = new core.EventEmitter();
            /**
             * Output to emit clicfg on navigate button. The payload contains a `ButtonEvent`.
             */
            _this.navigate = new core.EventEmitter();
            /**
             * Output to emit clicfg on download button. The payload contains a `ButtonEvent`.
             */
            _this.download = new core.EventEmitter();
            /**
             * Output to emit clicfg on close button. The payload contains a `ButtonEvent`.
             */
            _this.close = new core.EventEmitter();
            /**
             * Output to emit clicfg on full-screen button. The payload contains a `ButtonEvent`.
             */
            _this.fullscreen = new core.EventEmitter();
            /**
             * Output to emit clicfg on all custom buttons. The payload contains a `ButtonEvent`.
             */
            _this.customEmit = new core.EventEmitter();
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
                if (action === void 0) {
                    action = Action.CLICK;
                }
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
                if (buttons === void 0) {
                    buttons = [];
                }
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
            { type: core.Component, args: [{
                        selector: 'fg-upper-buttons',
                        template: "<header class=\"buttons-container\">\n\n  <ng-container *ngIf=\"!configButtons || configButtons?.visible\">\n    <a *ngFor=\"let btn of buttons; trackBy: trackById; let index = index\"\n       class=\"upper-button\"\n       fgSize [sizeConfig]=\"{width: btn.size?.width, height: btn.size?.height}\"\n       [ngStyle]=\"{'font-size': btn.fontSize}\"\n       [attr.aria-label]=\"btn.ariaLabel\"\n       [tabindex]=\"0\" role=\"button\"\n       (click)=\"onEvent(btn, $event)\" (keyup)=\"onEvent(btn, $event)\">\n      <div class=\"inside {{btn.className}}\" aria-hidden=\"true\" title=\"{{btn.title}}\"></div>\n    </a>\n  </ng-container>\n</header>\n",
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        styles: [".buttons-container{display:flex;flex-direction:row;justify-content:flex-end}.buttons-container>.upper-button{-ms-grid-row-align:center;align-self:center;margin-right:30px;margin-top:28px;font-size:50px;text-decoration:none;cursor:pointer;-webkit-animation:.6s animatezoom;animation:.6s animatezoom;color:#fff}@-webkit-keyframes animatezoom{from{-webkit-transform:scale(0);transform:scale(0)}to{-webkit-transform:scale(1);transform:scale(1)}}@keyframes animatezoom{from{-webkit-transform:scale(0);transform:scale(0)}to{-webkit-transform:scale(1);transform:scale(1)}}.base-btn,.close-image,.copy,.delete-image,.download-image,.ext-url-image,.fullscreen-image,.refresh-image{width:30px;height:30px;background-size:30px;opacity:.8;transition:.5s}.base-btn:hover,.close-image:hover,.copy:hover,.delete-image:hover,.download-image:hover,.ext-url-image:hover,.fullscreen-image:hover,.refresh-image:hover{-webkit-transform:scale(1.2);transform:scale(1.2)}.fullscreen-image{background-image:url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgNTMgNTMiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUzIDUzOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjUxMnB4IiBoZWlnaHQ9IjUxMnB4Ij48Zz48cGF0aCBkPSJNNTIuOTIzLDAuNjE4Yy0wLjEwMS0wLjI0NC0wLjI5Ni0wLjQzOS0wLjU0MS0wLjU0MUM1Mi4yNiwwLjAyNyw1Mi4xMywwLDUyLDBINDBjLTAuNTUyLDAtMSwwLjQ0OC0xLDFzMC40NDgsMSwxLDFoOS41ODYgICBMMzMuMjkzLDE4LjI5M2MtMC4zOTEsMC4zOTEtMC4zOTEsMS4wMjMsMCwxLjQxNEMzMy40ODgsMTkuOTAyLDMzLjc0NCwyMCwzNCwyMHMwLjUxMi0wLjA5OCwwLjcwNy0wLjI5M0w1MSwzLjQxNFYxMyAgIGMwLDAuNTUyLDAuNDQ4LDEsMSwxczEtMC40NDgsMS0xVjFDNTMsMC44Nyw1Mi45NzMsMC43NCw1Mi45MjMsMC42MTh6IiBmaWxsPSIjRkZGRkZGIi8+PHBhdGggZD0iTTE4LjI5MywzMy4yOTNMMiw0OS41ODZWNDBjMC0wLjU1Mi0wLjQ0OC0xLTEtMXMtMSwwLjQ0OC0xLDF2MTJjMCwwLjEzLDAuMDI3LDAuMjYsMC4wNzcsMC4zODIgICBjMC4xMDEsMC4yNDQsMC4yOTYsMC40MzfgMC41NDEsMC41NDFDMC43NCw1Mi45NzMsMC44Nyw1MywxLDUzaDEyYzAuNTUyLDAsMS0wLjQ0OCwxLTFzLTAuNDQ4LTEtMS0xSDMuNDE0bDE2LjI5My0xNi4yOTMgICBjMC4zOTEtMC4zOTEsMC4zOTEtMS4wMjMsMC0xLjQxNFMxOC42ODQsMzIuOTAyLDE4LjI5MywzMy4yOTN6IiBmaWxsPSIjRkZGRkZGIi8+PHBhdGggZD0iTTEsMTRjMC41NTIsMCwxLTAuNDQ4LDEtMVYzLjQxNGwxNi4yOTIsMTYuMjkyYzAuMTk1LDAuMTk1LDAuNDUxLDAuMjkzLDAuNzA3LDAuMjkzczAuNTEyLTAuMDk4LDAuNzA3LTAuMjkzICAgYzAuMzkxLTAuMzkxLDAuMzkxLTEuMDIzLDAtMS40MTRMMy40MTQsMkgxM2MwLjU1MiwwLDEtMC40NDgsMS0xcy0wLjQ0OC0xLTEtMUgxQzAuODcsMCwwLjc0LDAuMDI3LDAuNjE4LDAuMDc3ICAgQzAuMzczLDAuMTc5LDAuMTc5LDAuMzczLDAuMDc3LDAuNjE4QzAuMDI3LDAuNzQsMCwwLjg3LDAsMXYxMkMwLDEzLjU1MiwwLjQ0OCwxNCwxLDE0eiIgZmlsbD0iI0ZGRkZGRiIvPjxwYXRoIGQ9Ik01MiwzOWMtMC41NTIsMC0xLDAuNDQ4LTEsMXY5LjU4NkwzNC43MDcsMzMuMjkyYy0wLjM5MS0wLjM5MS0xLjAyMy0wLjM5MS0xLjQxNCwwcy0wLjM5MSwxLjAyMywwLDEuNDE0TDQ5LjU4Niw1MUg0MCAgIGMtMC41NTIsMC0xLDAuNDQ4LTEsMXMwLjQ0OCwxLDEsMWgxMmMwLjEzLDAsMC4yNi0wLjAyNywwLjM4Mi0wLjA3N2MwLjI0NC0wLjEwMSwwLjQzOS0wLjI5NiwwLjU0MS0wLjU0MSAgIEM1Mi45NzMsNTIuMjYsNTMsNTIuMTMsNTMsNTJWNDBDNTMsMzkuNDQ4LDUyLjU1MiwzOSw1MiwzOXoiIGZpbGw9IiNGRkZGRkYiLz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PC9zdmc+)}.delete-image{background-image:url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/PjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDQ4Ni40IDQ4Ni40IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA0ODYuNCA0ODYuNDsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHdpZHRoPSI1MTJweCIgaGVpZ2h0PSI1MTJweCI+PGc+PGc+PHBhdGggZD0iTTQ0Niw3MEgzNDQuOFY1My41YzAtMjkuNS0yNC01My41LTUzLjUtNTMuNWgtOTYuMmMtMjkuNSwwLTUzLjUsMjQtNTMuNSw1My41VjcwSDQwLjRjLTcuNSwwLTEzLjUsNi0xMy41LDEzLjUgICAgUzMyLjfgOTcsNDAuNCw5N2gyNC40djMxNy4yYzAsMzkuOCwzMi40LDcyLjIsNzIuMiw3Mi4yaDIxMi40YzM5LjgsMCw3Mi4yLTMyLjQsNzIuMi03Mi4yVjk3SDQ0NmM3LjUsMCwxMy41LTYsMTMuNS0xMy41ICAgIFM0NTMuNSw3MCw0NDYsNzB6IE0xNjguNiw1My41YzAtMTQuNiwxMS45LTI2LjUsMjYuNS0yNi41aDk2LjJjMTQuNiwwLDI2LjUsMTEuOSwyNi41LDI2LjVWNzBIMTY4LjZWNTMuNXogTTM5NC42LDQxNC4yICAgIGMwLDI0LjktMjAuMyw0NS4yLTQ1LjIsNDUuMkgxMzdjLTI0LjfgMC00NS4yLTIwLjMtNDUuMi00NS4yVjk3aDMwMi45djMxNy4ySDM5NC42eiIgZmlsbD0iI0ZGRkZGRiIvPjxwYXRoIGQ9Ik0yNDMuMiw0MTFjNy41LDAsMTMuNS02LDEzLjUtMTMuNVYxNTguOWMwLTcuNS02LTEzLjUtMTMuNS0xMy41cy0xMy41LDYtMTMuNSwxMy41djIzOC41ICAgIEMyMjkuNyw0MDQuOSwyMzUuNyw0MTEsMjQzLjIsNDExeiIgZmlsbD0iI0ZGRkZGRiIvPjxwYXRoIGQ9Ik0xNTUuMSwzOTYuMWM3LjUsMCwxMy41LTYsMTMuNS0xMy41VjE3My43YzAtNy41LTYtMTMuNS0xMy41LTEzLjVzLTEzLjUsNi0xMy41LDEzLjV2MjA4LjkgICAgQzE0MS42LDM5MC4xLDE0Ny43LDM5Ni4xLDE1NS4xLDM5Ni4xeiIgZmlsbD0iI0ZGRkZGRiIvPjxwYXRoIGQ9Ik0zMzEuMywzOTYuMWM3LjUsMCwxMy41LTYsMTMuNS0xMy41VjE3My43YzAtNy41LTYtMTMuNS0xMy41LTEzLjVzLTEzLjUsNi0xMy41LDEzLjV2MjA4LjkgICAgQzMxNy44LDM5MC4xLDMyMy44LDM5Ni4xLDMzMS4zLDM5Ni4xeiIgZmlsbD0iI0ZGRkZGRiIvPjwvZz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PC9zdmc+)}.ext-url-image{background-image:url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/PjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDUxMiA1MTIiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUxMiA1MTI7IiB4bWw6c3BhY2U9InByZXNlcnZlIiB3aWR0aD0iNTEycHgiIGhlaWdodD0iNTEycHgiPjxnPjxnPjxnPjxwYXRoIGQ9Ik00ODAsMjg4djExMmMwLDQ0LjE4My0zNS44MTcsODAtODAsODBIMTEyYy00NC4xODMsMC04MC0zNS44MTctODAtODBWMTEyYzAtNDQuMTgzLDM1LjgxNy04MCw4MC04MGg5NlYwaC05NiAgICAgQzUwLjE0NCwwLDAsNTAuMTQ0LDAsMTEydjI4OGMwLDYxLjg1Niw1MC4xNDQsMTEyLDExMiwxMTJoMjg4YzYxLjg1NiwwLDExMi01MC4xNDQsMTEyLTExMlYyODhINDgweiIgZmlsbD0iI0ZGRkZGRiIvPjxwYXRoIGQ9Ik0xNzYsNDE2aDMyVjI4OGMwLTEyNS43NiwxMDcuNTItMTI4LDExMi0xMjhoMTA1LjQ0bC04NC42NCw4NC42NGwyMi41NiwyMi41NmwxMTItMTEyYzYuMjA0LTYuMjQxLDYuMjA0LTE2LjMxOSwwLTIyLjU2ICAgICBsLTExMi0xMTJsLTIyLjcyLDIyLjcybDg0LjgsODQuNjRIMzIwYy0xLjQ0LDAtMTQ0LDEuNzYtMTQ0LDE2MFY0MTZ6IiBmaWxsPSIjRkZGRkZGIi8+PC9nPjwvZz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PC9zdmc+)}.download-image{background-image:url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/PjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDQ3MS4yIDQ3MS4yIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA0NzEuMiA0NzEuMjsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHdpZHRoPSI1MTJweCIgaGVpZ2h0PSI1MTJweCI+PGc+PGc+PHBhdGggZD0iTTQ1Ny43LDIzMC4xNWMtNy41LDAtMTMuNSw2LTEzLjUsMTMuNXYxMjIuOGMwLDMzLjQtMjcuMiw2MC41LTYwLjUsNjAuNUg4Ny41Yy0zMy40LDAtNjAuNS0yNy4yLTYwLjUtNjAuNXYtMTI0LjggICAgYzAtNy41LTYtMTMuNS0xMy41LTEzLjVzLTEzLjUsNi0xMy41LDEzLjV2MTI0LjhjMCw0OC4zLDM5LjMsODcuNSw4Ny41LDg3LjVoMjk2LjJjNDguMywwLDg3LjUtMzkuMyw4Ny41LTg3LjV2LTEyMi44ICAgIEM0NzEuMiwyMzYuMjUsNDY1LjIsMjMwLjE1LDQ1Ny43LDIzMC4xNXoiIGZpbGw9IiNGRkZGRkYiLz48cGF0aCBkPSJNMjI2LjEsMzQ2Ljc1YzIuNiwyLjYsNi4xLDQsOS41LDRzNi45LTEuMyw5LjUtNGw4NS44LTg1LjhjNS4zLTUuMyw1LjMtMTMuOCwwLTE5LjFjLTUuMy01LjMtMTMuOC01LjMtMTkuMSwwbC02Mi43LDYyLjggICAgVjMwLjc1YzAtNy41LTYtMTMuNS0xMy41LTEzLjVzLTEzLjUsNi0xMy41LDEzLjV2MjczLjlsLTYyLjgtNjIuOGMtNS4zLTUuMy0xMy44LTUuMy0xOS4xLDBjLTUuMyw1LjMtNS4zLDEzLjgsMCwxOS4xICAgIEwyMjYuMSwzNDYuNzV6IiBmaWxsPSIjRkZGRkZGIi8+PC9nPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48L3N2Zz4=)}.close-image{background-image:url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/PjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDQ3NS4yIDQ3NS4yIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA0NzUuMiA0NzUuMjsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHdpZHRoPSI1MTJweCIgaGVpZ2h0PSI1MTJweCI+PGc+PGc+PHBhdGggZD0iTTQwNS42LDY5LjZDMzYwLjcsMjQuNywzMDEuMSwwLDIzNy42LDBzLTEyMy4xLDI0LjctMTY4LDY5LjZTMCwxNzQuMSwwLDIzNy42czI0LjcsMTIzLjEsNjkuNiwxNjhzMTA0LjUsNjkuNiwxNjgsNjkuNiAgICBzMTIzLjEtMjQuNywxNjgtNjkuNnM2OS42LTEwNC41LDY5LjYtMTY4UzQ1MC41LDExNC41LDQwNS42LDY5LjZ6IE0zODYuNSwzODYuNWMtMzkuOCwzOS44LTkyLjcsNjEuNy0xNDguOSw2MS43ICAgIHMtMTA5LjEtMjEuOS0xNDguOS02MS43Yy04Mi4xLTgyLjEtODIuMS0yMTUuNywwLTI5Ny44QzEyOC41LDQ4LjfgMTgxLjQsMjcsMjM3LjYsMjdzMTA5LjEsMjEuOSwxNDguOSw2MS43ICAgIEM0NjguNiwxNzAuOCw0NjguNiwzMDQuNCwzODYuNSwzODYuNXoiIGZpbGw9IiNGRkZGRkYiLz48cGF0aCBkPSJNMzQyLjMsMTMyLjljLTUuMy01LjMtMTMuOC01LjMtMTkuMSwwbC04NS42LDg1LjZMMTUyLDEzMi45Yy01LjMtNS4zLTEzLjgtNS4zLTE5LjEsMGMtNS4zLDUuMy01LjMsMTMuOCwwLDE5LjEgICAgbDg1LjYsODUuNmwtODUuNiw4NS42Yy01LjMsNS4zLTUuMywxMy44LDAsMTkuMWMyLjYsMi42LDYuMSw0LDkuNSw0czYuOS0xLjMsOS41LTRsODUuNi04NS42bDg1LjYsODUuNmMyLjYsMi42LDYuMSw0LDkuNSw0ICAgIGMzLjUsMCw2LjktMS4zLDkuNS00YzUuMy01LjMsNS4zLTEzLjgsMC0xOS4xbC04NS40LTg1LjZsODUuNi04NS42QzM0Ny42LDE0Ni43LDM0Ny42LDEzOC4yLDM0Mi4zLDEzMi45eiIgZmlsbD0iI0ZGRkZGRiIvPjwvZz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PC9zdmc+)}.refresh-image{background-image:url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/PjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDQ4OS43MTEgNDg5LjcxMSIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNDg5LjcxMSA0ODkuNzExOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjUxMnB4IiBoZWlnaHQ9IjUxMnB4Ij48Zz48Zz48cGF0aCBkPSJNMTEyLjE1Niw5Ny4xMTFjNzIuMy02NS40LDE4MC41LTY2LjQsMjUzLjgtNi43bC01OC4xLDIuMmMtNy41LDAuMy0xMy4zLDYuNS0xMywxNGMwLjMsNy4zLDYuMywxMywxMy41LDEzICAgIGMwLjIsMCwwLjMsMCwwLjUsMGw4OS4yLTMuM2M3LjMtMC4zLDEzLTYuMiwxMy0xMy41di0xYzAtMC4yLDAtMC4zLDAtMC41di0wLjFsMCwwbC0zLjMtODguMmMtMC4zLTcuNS02LjYtMTMuMy0xNC0xMyAgICBjLTcuNSwwLjMtMTMuMyw2LjUtMTMsMTRsMi4xLDU1LjNjLTM2LjMtMjkuNy04MS00Ni45LTEyOC44LTQ5LjNjLTU5LjItMy0xMTYuMSwxNy4zLTE2MCw1Ny4xYy02MC40LDU0LjctODYsMTM3LjktNjYuOCwyMTcuMSAgICBjMS41LDYuMiw3LDEwLjMsMTMuMSwxMC4zYzEuMSwwLDIuMS0wLjEsMy4yLTAuNGM3LjItMS44LDExLjctOS4xLDkuOS0xNi4zQzM2LjY1NiwyMTguMjExLDU5LjA1NiwxNDUuMTExLDExMi4xNTYsOTcuMTExeiIgZmlsbD0iI0ZGRkZGRiIvPjxwYXRoIGQ9Ik00NjIuNDU2LDE5NS41MTFjLTEuOC03LjItOS4xLTExLjctMTYuMy05LjljLTcuMiwxLjgtMTEuNyw5LjEtOS45LDE2LjNjMTYuOSw2OS42LTUuNiwxNDIuNy01OC43LDE5MC43ICAgIGMtMzcuMywzMy43LTg0LjEsNTAuMy0xMzAuNyw1MC4zYy00NC41LDAtODguOS0xNS4xLTEyNC43LTQ0LjlsNTguOC01LjNjNy40LTAuNywxMi45LTcuMiwxMi4yLTE0LjdzLTcuMi0xMi45LTE0LjctMTIuMmwtODguOSw4ICAgIGMtNy40LDAuNy0xMi45LDcuMi0xMi4yLDE0LjdsOCw4OC45YzAuNiw3LDYuNSwxMi4zLDEzLjQsMTIuM2MwLjQsMCwwLjgsMCwxLjItMC4xYzcuNC0wLjcsMTIuOS03LjIsMTIuMi0xNC43bC00LjgtNTQuMSAgICBjMzYuMywyOS40LDgwLjgsNDYuNSwxMjguMyw0OC45YzMuOCwwLjIsNy42LDAuMywxMS4zLDAuM2M1NS4xLDAsMTA3LjUtMjAuMiwxNDguNy01Ny40ICAgIEM0NTYuMDU2LDM1Ny45MTEsNDgxLjY1NiwyNzQuODExLDQ2Mi40NTYsMTk1LjUxMXoiIGZpbGw9IiNGRkZGRkYiLz48L2c+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjwvc3ZnPg==)}.copy{background-image:url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/PjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDQ4OC4zIDQ4OC4zIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA0ODguMyA0ODguMzsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHdpZHRoPSI1MTJweCIgaGVpZ2h0PSI1MTJweCI+PGc+PGc+PHBhdGggZD0iTTMxNC4yNSw4NS40aC0yMjdjLTIxLjMsMC0zOC42LDE3LjMtMzguNiwzOC42djMyNS43YzAsMjEuMywxNy4zLDM4LjYsMzguNiwzOC42aDIyN2MyMS4zLDAsMzguNi0xNy4zLDM4LjYtMzguNlYxMjQgICAgQzM1Mi43NSwxMDIuNywzMzUuNDUsODUuNCwzMTQuMjUsODUuNHogTTMyNS43NSw0NDkuNmMwLDYuNC01LjIsMTEuNi0xMS42LDExLjZoLTIyN2MtNi40LDAtMTEuNi01LjItMTEuNi0xMS42VjEyNCAgICBjMC02LjQsNS4yLTExLjYsMTEuNi0xMS42aDIyN2M2LjQsMCwxMS42LDUuMiwxMS42LDExLjZWNDQ5LjZ6IiBmaWxsPSIjRkZGRkZGIi8+PHBhdGggZD0iTTQwMS4wNSwwaC0yMjdjLTIxLjMsMC0zOC42LDE3LjMtMzguNiwzOC42YzAsNy41LDYsMTMuNSwxMy41LDEzLjVzMTMuNS02LDEzLjUtMTMuNWMwLTYuNCw1LjItMTEuNiwxMS42LTExLjZoMjI3ICAgIGM2LjQsMCwxMS42LDUuMiwxMS42LDExLjZ2MzI1LjdjMCw2LjQtNS4yLDExLjYtMTEuNiwxMS42Yy03LjUsMC0xMy41LDYtMTMuNSwxMy41czYsMTMuNSwxMy41LDEzLjVjMjEuMywwLDM4LjYtMTcuMywzOC42LTM4LjYgICAgVjM4LjZDNDM5LjY1LDE3LjMsNDIyLjM1LDAsNDAxLjA1LDB6IiBmaWxsPSIjRkZGRkZGIi8+PC9nPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48L3N2Zz4=)}"]
                    }] }
        ];
        UpperButtonsComponent.propDecorators = {
            currentImage: [{ type: core.Input }],
            buttonsConfig: [{ type: core.Input }],
            refresh: [{ type: core.Output }],
            delete: [{ type: core.Output }],
            navigate: [{ type: core.Output }],
            download: [{ type: core.Output }],
            close: [{ type: core.Output }],
            fullscreen: [{ type: core.Output }],
            customEmit: [{ type: core.Output }]
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
            _this.clickDot = new core.EventEmitter();
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
            { type: core.Component, args: [{
                        selector: 'fg-dots',
                        template: "<nav class=\"dots-container\" [attr.aria-label]=\"accessibilityConfig?.dotsContainerAriaLabel\"\n     [title]=\"accessibilityConfig?.dotsContainerTitle\">\n  <ng-container *ngIf=\"!configDots || configDots?.visible\">\n    <div class=\"inside dot\"\n         *ngFor=\"let img of images; trackBy: trackById; let index = index\"\n         [ngClass]=\"{'active': isActive(index)}\"\n         [attr.aria-label]=\"accessibilityConfig?.dotAriaLabel + ' ' + (index + 1)\"\n         [tabindex]=\"0\" role=\"navigation\"\n         (click)=\"onDotEvent(index, $event)\" (keyup)=\"onDotEvent(index, $event)\"></div>\n  </ng-container>\n</nav>\n",
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        styles: [".dots-container{display:flex;flex-direction:row;justify-content:center;margin-bottom:30px}.dots-container>.dot{background:#fff;border-radius:5px;height:10px;margin-left:4px;margin-right:4px;width:10px;cursor:pointer;opacity:.5}.dots-container>.dot:hover{opacity:.9;transition:opacity .5s}.dots-container>.dot.active{cursor:pointer;opacity:.9}@-webkit-keyframes fadein-semi-visible05{from{opacity:0}to{opacity:.5}}@keyframes fadein-semi-visible05{from{opacity:0}to{opacity:.5}}@-webkit-keyframes fadein-semi-visible09{from{opacity:0}to{opacity:.9}}@keyframes fadein-semi-visible09{from{opacity:0}to{opacity:.9}}"]
                    }] }
        ];
        DotsComponent.propDecorators = {
            currentImage: [{ type: core.Input }],
            images: [{ type: core.Input }],
            dotsConfig: [{ type: core.Input }],
            accessibilityConfig: [{ type: core.Input }],
            clickDot: [{ type: core.Output }]
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
            _this.clickPreview = new core.EventEmitter();
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
                this.start = this.images.length - 1 - ( /** @type {?} */(this.configPreview.number) - 1);
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
            { type: core.Component, args: [{
                        selector: 'fg-previews',
                        template: "<nav class=\"previews-container\"\n     [attr.aria-label]=\"accessibilityConfig?.previewsContainerAriaLabel\"\n     [title]=\"accessibilityConfig?.previewsContainerTitle\">\n\n  <ng-container *ngIf=\"configPreview?.visible\">\n    <a class=\"nav-left\"\n       [attr.aria-label]=\"accessibilityConfig?.previewScrollPrevAriaLabel\"\n       [tabindex]=\"configPreview.arrows && start > 0 ? 0 : -1\" role=\"button\"\n       (click)=\"onNavigationEvent('left', $event)\" (keyup)=\"onNavigationEvent('left', $event)\">\n      <div class=\"inside {{configPreview.arrows && start > 0 ? 'left-arrow-preview-image' : 'empty-arrow-preview-image'}}\"\n           aria-hidden=\"true\"\n           [title]=\"accessibilityConfig?.previewScrollPrevTitle\"></div>\n    </a>\n\n    <ng-container *ngFor=\"let preview of previews; trackBy: trackById; let index = index\">\n      <img *ngIf=\"preview?.modal?.img\"\n           class=\"inside preview-image {{isActive(preview) ? 'active' : ''}}{{!configPreview.clickable ? ' unclickable' : ''}}\"\n           [src]=\"preview.plain?.img ? preview.plain.img : preview.modal.img\"\n           fgSize [sizeConfig]=\"{width: configPreview.size ? configPreview.size.width : defaultPreviewSize.width,\n                                 height: configPreview.size ? configPreview.size.height : defaultPreviewSize.height}\"\n           [attr.aria-label]=\"preview.modal.ariaLabel ? preview.modal.ariaLabel : ''\"\n           [title]=\"preview.modal.title ? preview.modal.title : ''\"\n           alt=\"{{preview.modal.alt ? preview.modal.alt : ''}}\"\n           [tabindex]=\"0\" role=\"img\"\n           (click)=\"onImageEvent(preview, $event)\" (keyup)=\"onImageEvent(preview, $event)\"/>\n    </ng-container>\n\n\n    <a class=\"nav-right\"\n       [attr.aria-label]=\"accessibilityConfig?.previewScrollNextAriaLabel\"\n       [tabindex]=\"configPreview.arrows && end < images.length ? 0 : -1\" role=\"button\"\n       (click)=\"onNavigationEvent('right', $event)\" (keyup)=\"onNavigationEvent('right', $event)\">\n      <div class=\"inside {{configPreview.arrows && end < images.length ? 'right-arrow-preview-image' : 'empty-arrow-preview-image'}}\"\n           aria-hidden=\"true\"\n           [title]=\"accessibilityConfig?.previewScrollNextTitle\"></div>\n    </a>\n  </ng-container>\n\n</nav>\n",
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        styles: ["@media only screen and (max-width:767px),only screen and (max-device-width:767px){.previews-container,.previews-container>.nav-left,.previews-container>.nav-right,.previews-container>.preview-image{display:none}}@media only screen and (min-device-width:768px){.previews-container{align-items:center;-webkit-animation:.8s fadein-semi-visible08;animation:.8s fadein-semi-visible08;display:flex;flex-direction:row;justify-content:center;margin-bottom:15px}.previews-container>.preview-image{cursor:pointer;margin-left:2px;margin-right:2px;opacity:.7;height:50px}.previews-container>.preview-image.active{opacity:1}.previews-container>.preview-image.unclickable{cursor:not-allowed}.previews-container>.preview-image:hover{opacity:1;transition:opacity .5s}.previews-container .nav,.previews-container>.nav-left,.previews-container>.nav-right{color:#919191;cursor:pointer;transition:.5s}.previews-container .nav:hover,.previews-container>.nav-left:hover,.previews-container>.nav-right:hover{-webkit-transform:scale(1.1);transform:scale(1.1)}.previews-container>.nav-left{margin-right:10px}.previews-container>.nav-right{margin-left:10px}}@-webkit-keyframes fadein-visible{from{opacity:0}to{opacity:1}}@keyframes fadein-visible{from{opacity:0}to{opacity:1}}@-webkit-keyframes fadein-semi-visible05{from{opacity:0}to{opacity:.5}}@keyframes fadein-semi-visible05{from{opacity:0}to{opacity:.5}}@-webkit-keyframes fadein-semi-visible08{from{opacity:0}to{opacity:.8}}@keyframes fadein-semi-visible08{from{opacity:0}to{opacity:.8}}@-webkit-keyframes fadein-semi-visible09{from{opacity:0}to{opacity:.9}}@keyframes fadein-semi-visible09{from{opacity:0}to{opacity:.9}}", ".arrow-preview-image,.empty-arrow-preview-image,.left-arrow-preview-image,.right-arrow-preview-image{width:15px;height:15px;opacity:.5}.empty-arrow-preview-image{background:#000;opacity:0}.left-arrow-preview-image{background-image:url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/PjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDQ3Ny4xNzUgNDc3LjE3NSIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNDc3LjE3NSA0NzcuMTc1OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjUxMnB4IiBoZWlnaHQ9IjUxMnB4Ij48Zz48cGF0aCBkPSJNMTQ1LjE4OCwyMzguNTc1bDIxNS41LTIxNS41YzUuMy01LjMsNS4zLTEzLjgsMC0xOS4xcy0xMy44LTUuMy0xOS4xLDBsLTIyNS4xLDIyNS4xYy01LjMsNS4zLTUuMywxMy44LDAsMTkuMWwyMjUuMSwyMjUgICBjMi42LDIuNiw2LjEsNCw5LjUsNHM2LjktMS4zLDkuNS00YzUuMy01LjMsNS4zLTEzLjgsMC0xOS4xTDE0NS4xODgsMjM4LjU3NXoiIGZpbGw9IiNGRkZGRkYiLz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PC9zdmc+);background-size:15px;transition:.5s}.left-arrow-preview-image:hover{-webkit-transform:scale(1.2);transform:scale(1.2)}.right-arrow-preview-image{background-image:url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/PjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDQ3Ny4xNzUgNDc3LjE3NSIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNDc3LjE3NSA0NzcuMTc1OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjUxMnB4IiBoZWlnaHQ9IjUxMnB4Ij48Zz48cGF0aCBkPSJNMzYwLjczMSwyMjkuMDc1bC0yMjUuMS0yMjUuMWMtNS4zLTUuMy0xMy44LTUuMy0xOS4xLDBzLTUuMywxMy44LDAsMTkuMWwyMTUuNSwyMTUuNWwtMjE1LjUsMjE1LjUgICBjLTUuMyw1LjMtNS4zLDEzLjgsMCwxOS4xYzIuNiwyLjYsNi4xLDQsOS41LDRjMy40LDAsNi45LTEuMyw5LjUtNGwyMjUuMS0yMjUuMUMzNjUuOTMxLDI0Mi44NzUsMzY1LjkzMSwyMzQuMjc1LDM2MC43MzEsMjI5LjA3NXogICAiIGZpbGw9IiNGRkZGRkYiLz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PC9zdmc+);background-size:15px;transition:.5s}.right-arrow-preview-image:hover{-webkit-transform:scale(1.2);transform:scale(1.2)}"]
                    }] }
        ];
        PreviewsComponent.propDecorators = {
            currentImage: [{ type: core.Input }],
            images: [{ type: core.Input }],
            slideConfig: [{ type: core.Input }],
            previewConfig: [{ type: core.Input }],
            accessibilityConfig: [{ type: core.Input }],
            clickPreview: [{ type: core.Output }]
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
            { type: core.Component, args: [{
                        selector: 'fg-loading-spinner',
                        template: "<div [attr.aria-label]=\"accessibilityConfig?.loadingSpinnerAriaLabel\"\n     [title]=\"accessibilityConfig?.loadingSpinnerTitle\">\n\n  <ng-container [ngSwitch]=\"loadingConfig.type\">\n    <ng-container *ngSwitchCase=\"loadingStandard\">\n      <div class=\"cssload-loader\">\n        <div class=\"cssload-inner cssload-one\"></div>\n        <div class=\"cssload-inner cssload-two\"></div>\n        <div class=\"cssload-inner cssload-three\"></div>\n      </div>\n    </ng-container>\n    <ng-container *ngSwitchCase=\"loadingBars\">\n      <div class=\"loader-bars\">\n      </div>\n    </ng-container>\n    <ng-container *ngSwitchCase=\"loadingCircular\">\n      <div class=\"loader-circular\">\n      </div>\n    </ng-container>\n    <ng-container *ngSwitchCase=\"loadingDots\">\n      <div class=\"loader-dots\">\n      </div>\n    </ng-container>\n    <ng-container *ngSwitchCase=\"loadingCubeFlipping\">\n      <div class=\"cube-wrapper\">\n        <div class=\"cube-folding\">\n          <span class=\"leaf1\"></span>\n          <span class=\"leaf2\"></span>\n          <span class=\"leaf3\"></span>\n          <span class=\"leaf4\"></span>\n        </div>\n      </div>\n    </ng-container>\n    <ng-container *ngSwitchCase=\"loadingCircles\">\n      <div id=\"preloader\">\n        <div id=\"loader\"></div>\n      </div>\n    </ng-container>\n    <ng-container *ngSwitchCase=\"loadingExplosingSquares\">\n      <div class=\"loader\">\n        <span></span>\n        <span></span>\n        <span></span>\n        <span></span>\n      </div>\n    </ng-container>\n    <!--<ng-container *ngSwitchDefault>-->\n    <!---->\n    <!--</ng-container>-->\n  </ng-container>\n</div>\n",
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        styles: [".cssload-loader{position:absolute;top:0;bottom:0;right:0;left:0;margin:auto;width:64px;height:64px;border-radius:50%;-o-border-radius:50%;-ms-border-radius:50%;-webkit-border-radius:50%;-moz-border-radius:50%;-webkit-perspective:800px;perspective:800px}.cssload-inner{position:absolute;width:100%;height:100%;box-sizing:border-box;-o-box-sizing:border-box;-ms-box-sizing:border-box;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;border-radius:50%;-o-border-radius:50%;-ms-border-radius:50%;-webkit-border-radius:50%;-moz-border-radius:50%}.cssload-inner.cssload-one{left:0;top:0;animation:.6s linear infinite cssload-rotate-one;-o-animation:.6s linear infinite cssload-rotate-one;-ms-animation:cssload-rotate-one .6s linear infinite;-webkit-animation:.6s linear infinite cssload-rotate-one;-moz-animation:.6s linear infinite cssload-rotate-one;border-bottom:3px solid rgba(255,255,255,.99)}.cssload-inner.cssload-two{right:0;top:0;animation:.6s linear infinite cssload-rotate-two;-o-animation:.6s linear infinite cssload-rotate-two;-ms-animation:cssload-rotate-two .6s linear infinite;-webkit-animation:.6s linear infinite cssload-rotate-two;-moz-animation:.6s linear infinite cssload-rotate-two;border-right:3px solid #fff}.cssload-inner.cssload-three{right:0;bottom:0;animation:.6s linear infinite cssload-rotate-three;-o-animation:.6s linear infinite cssload-rotate-three;-ms-animation:cssload-rotate-three .6s linear infinite;-webkit-animation:.6s linear infinite cssload-rotate-three;-moz-animation:.6s linear infinite cssload-rotate-three;border-top:3px solid #fff}@keyframes cssload-rotate-one{0%{-webkit-transform:rotateX(35deg) rotateY(-45deg) rotateZ(0);transform:rotateX(35deg) rotateY(-45deg) rotateZ(0)}100%{-webkit-transform:rotateX(35deg) rotateY(-45deg) rotateZ(360deg);transform:rotateX(35deg) rotateY(-45deg) rotateZ(360deg)}}@-webkit-keyframes cssload-rotate-one{0%{-webkit-transform:rotateX(35deg) rotateY(-45deg) rotateZ(0)}100%{-webkit-transform:rotateX(35deg) rotateY(-45deg) rotateZ(360deg)}}@keyframes cssload-rotate-two{0%{-webkit-transform:rotateX(50deg) rotateY(10deg) rotateZ(0);transform:rotateX(50deg) rotateY(10deg) rotateZ(0)}100%{-webkit-transform:rotateX(50deg) rotateY(10deg) rotateZ(360deg);transform:rotateX(50deg) rotateY(10deg) rotateZ(360deg)}}@-webkit-keyframes cssload-rotate-two{0%{-webkit-transform:rotateX(50deg) rotateY(10deg) rotateZ(0)}100%{-webkit-transform:rotateX(50deg) rotateY(10deg) rotateZ(360deg)}}@keyframes cssload-rotate-three{0%{-webkit-transform:rotateX(35deg) rotateY(55deg) rotateZ(0);transform:rotateX(35deg) rotateY(55deg) rotateZ(0)}100%{-webkit-transform:rotateX(35deg) rotateY(55deg) rotateZ(360deg);transform:rotateX(35deg) rotateY(55deg) rotateZ(360deg)}}@-webkit-keyframes cssload-rotate-three{0%{-webkit-transform:rotateX(35deg) rotateY(55deg) rotateZ(0)}100%{-webkit-transform:rotateX(35deg) rotateY(55deg) rotateZ(360deg)}}", ".loader-dots{position:absolute;top:0;bottom:0;right:0;left:0;color:#fefcff;font-size:10px;margin:auto;width:1em;height:1em;border-radius:50%;text-indent:-9999em;-webkit-animation:1.3s linear infinite load4;animation:1.3s linear infinite load4;-webkit-transform:translateZ(0);transform:translateZ(0)}@-webkit-keyframes load4{0%,100%{box-shadow:0 -3em 0 .2em,2em -2em 0 0,3em 0 0 -1em,2em 2em 0 -1em,0 3em 0 -1em,-2em 2em 0 -1em,-3em 0 0 -1em,-2em -2em 0 0}12.5%{box-shadow:0 -3em 0 0,2em -2em 0 .2em,3em 0 0 0,2em 2em 0 -1em,0 3em 0 -1em,-2em 2em 0 -1em,-3em 0 0 -1em,-2em -2em 0 -1em}25%{box-shadow:0 -3em 0 -.5em,2em -2em 0 0,3em 0 0 .2em,2em 2em 0 0,0 3em 0 -1em,-2em 2em 0 -1em,-3em 0 0 -1em,-2em -2em 0 -1em}37.5%{box-shadow:0 -3em 0 -1em,2em -2em 0 -1em,3em 0 0 0,2em 2em 0 .2em,0 3em 0 0,-2em 2em 0 -1em,-3em 0 0 -1em,-2em -2em 0 -1em}50%{box-shadow:0 -3em 0 -1em,2em -2em 0 -1em,3em 0 0 -1em,2em 2em 0 0,0 3em 0 .2em,-2em 2em 0 0,-3em 0 0 -1em,-2em -2em 0 -1em}62.5%{box-shadow:0 -3em 0 -1em,2em -2em 0 -1em,3em 0 0 -1em,2em 2em 0 -1em,0 3em 0 0,-2em 2em 0 .2em,-3em 0 0 0,-2em -2em 0 -1em}75%{box-shadow:0 -3em 0 -1em,2em -2em 0 -1em,3em 0 0 -1em,2em 2em 0 -1em,0 3em 0 -1em,-2em 2em 0 0,-3em 0 0 .2em,-2em -2em 0 0}87.5%{box-shadow:0 -3em 0 0,2em -2em 0 -1em,3em 0 0 -1em,2em 2em 0 -1em,0 3em 0 -1em,-2em 2em 0 0,-3em 0 0 0,-2em -2em 0 .2em}}@keyframes load4{0%,100%{box-shadow:0 -3em 0 .2em,2em -2em 0 0,3em 0 0 -1em,2em 2em 0 -1em,0 3em 0 -1em,-2em 2em 0 -1em,-3em 0 0 -1em,-2em -2em 0 0}12.5%{box-shadow:0 -3em 0 0,2em -2em 0 .2em,3em 0 0 0,2em 2em 0 -1em,0 3em 0 -1em,-2em 2em 0 -1em,-3em 0 0 -1em,-2em -2em 0 -1em}25%{box-shadow:0 -3em 0 -.5em,2em -2em 0 0,3em 0 0 .2em,2em 2em 0 0,0 3em 0 -1em,-2em 2em 0 -1em,-3em 0 0 -1em,-2em -2em 0 -1em}37.5%{box-shadow:0 -3em 0 -1em,2em -2em 0 -1em,3em 0 0 0,2em 2em 0 .2em,0 3em 0 0,-2em 2em 0 -1em,-3em 0 0 -1em,-2em -2em 0 -1em}50%{box-shadow:0 -3em 0 -1em,2em -2em 0 -1em,3em 0 0 -1em,2em 2em 0 0,0 3em 0 .2em,-2em 2em 0 0,-3em 0 0 -1em,-2em -2em 0 -1em}62.5%{box-shadow:0 -3em 0 -1em,2em -2em 0 -1em,3em 0 0 -1em,2em 2em 0 -1em,0 3em 0 0,-2em 2em 0 .2em,-3em 0 0 0,-2em -2em 0 -1em}75%{box-shadow:0 -3em 0 -1em,2em -2em 0 -1em,3em 0 0 -1em,2em 2em 0 -1em,0 3em 0 -1em,-2em 2em 0 0,-3em 0 0 .2em,-2em -2em 0 0}87.5%{box-shadow:0 -3em 0 0,2em -2em 0 -1em,3em 0 0 -1em,2em 2em 0 -1em,0 3em 0 -1em,-2em 2em 0 0,-3em 0 0 0,-2em -2em 0 .2em}}", ".loader-bars,.loader-bars:after,.loader-bars:before{background:#fefcff;-webkit-animation:1s ease-in-out infinite load1;animation:1s ease-in-out infinite load1;width:1em;height:4em}.loader-bars{position:absolute;top:0;bottom:0;right:0;left:0;color:#fefcff;text-indent:-9999em;margin:auto;font-size:11px;-webkit-transform:translateZ(0);transform:translateZ(0);-webkit-animation-delay:-.16s;animation-delay:-.16s}.loader-bars:after,.loader-bars:before{position:absolute;top:0;content:''}.loader-bars:before{left:-1.5em;-webkit-animation-delay:-.32s;animation-delay:-.32s}.loader-bars:after{left:1.5em}@-webkit-keyframes load1{0%,100%,80%{box-shadow:0 0;height:4em}40%{box-shadow:0 -2em;height:5em}}@keyframes load1{0%,100%,80%{box-shadow:0 0;height:4em}40%{box-shadow:0 -2em;height:5em}}", ".loader-circular,.loader-circular:after{border-radius:50%;width:10em;height:10em}.loader-circular{position:absolute;top:0;bottom:0;right:0;left:0;margin:auto;font-size:10px;text-indent:-9999em;border-top:1.1em solid rgba(255,255,255,.2);border-right:1.1em solid rgba(255,255,255,.2);border-bottom:1.1em solid rgba(255,255,255,.2);border-left:1.1em solid #fff;-webkit-transform:translateZ(0);transform:translateZ(0);-webkit-animation:1.1s linear infinite load8;animation:1.1s linear infinite load8}@-webkit-keyframes load8{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes load8{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}", ".cube-folding{width:50px;height:50px;display:inline-block;-webkit-transform:rotate(45deg);transform:rotate(45deg);font-size:0}.cube-folding span{position:relative;width:25px;height:25px;-webkit-transform:scale(1.1);transform:scale(1.1);display:inline-block}.cube-folding span::before{content:'';background-color:#fff;position:absolute;left:0;top:0;display:block;width:25px;height:25px;-webkit-transform-origin:100% 100%;transform-origin:100% 100%;-webkit-animation:2.5s linear infinite both folding;animation:2.5s linear infinite both folding}.cube-folding .leaf2{-webkit-transform:rotateZ(90deg) scale(1.1);transform:rotateZ(90deg) scale(1.1)}.cube-folding .leaf2::before{-webkit-animation-delay:.3s;animation-delay:.3s;background-color:#f2f2f2}.cube-folding .leaf3{-webkit-transform:rotateZ(270deg) scale(1.1);transform:rotateZ(270deg) scale(1.1)}.cube-folding .leaf3::before{-webkit-animation-delay:.9s;animation-delay:.9s;background-color:#f2f2f2}.cube-folding .leaf4{-webkit-transform:rotateZ(180deg) scale(1.1);transform:rotateZ(180deg) scale(1.1)}.cube-folding .leaf4::before{-webkit-animation-delay:.6s;animation-delay:.6s;background-color:#e6e6e6}@-webkit-keyframes folding{0%,10%{-webkit-transform:perspective(140px) rotateX(-180deg);transform:perspective(140px) rotateX(-180deg);opacity:0}25%,75%{-webkit-transform:perspective(140px) rotateX(0);transform:perspective(140px) rotateX(0);opacity:1}100%,90%{-webkit-transform:perspective(140px) rotateY(180deg);transform:perspective(140px) rotateY(180deg);opacity:0}}@keyframes folding{0%,10%{-webkit-transform:perspective(140px) rotateX(-180deg);transform:perspective(140px) rotateX(-180deg);opacity:0}25%,75%{-webkit-transform:perspective(140px) rotateX(0);transform:perspective(140px) rotateX(0);opacity:1}100%,90%{-webkit-transform:perspective(140px) rotateY(180deg);transform:perspective(140px) rotateY(180deg);opacity:0}}.cube-wrapper{position:fixed;left:50%;top:50%;margin-top:-50px;margin-left:-50px;width:100px;height:100px;text-align:center}@-webkit-keyframes text{100%{top:35px}}@keyframes text{100%{top:35px}}@-webkit-keyframes shadow{100%{bottom:-18px;width:100px}}@keyframes shadow{100%{bottom:-18px;width:100px}}", "#preloader{position:fixed;top:0;left:0;width:100%;height:100%}#loader{display:block;position:relative;left:50%;top:50%;width:100px;height:100px;margin:-75px 0 0 -75px;border-radius:50%;border:3px solid transparent;border-top-color:#b4b4b4;-webkit-animation:2s linear infinite spin;animation:2s linear infinite spin}#loader:before{content:\"\";position:absolute;top:5px;left:5px;right:5px;bottom:5px;border-radius:50%;border:3px solid transparent;border-top-color:#d9d9d9;-webkit-animation:3s linear infinite spin;animation:3s linear infinite spin}#loader:after{content:\"\";position:absolute;top:15px;left:15px;right:15px;bottom:15px;border-radius:50%;border:3px solid transparent;border-top-color:#fff;-webkit-animation:1.5s linear infinite spin;animation:1.5s linear infinite spin}@-webkit-keyframes spin{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes spin{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}", "@-webkit-keyframes loader{0%,10%,100%{width:60px;height:60px}65%{width:150px;height:150px}}@keyframes loader{0%,10%,100%{width:60px;height:60px}65%{width:150px;height:150px}}@-webkit-keyframes loaderBlock{0%,30%{-webkit-transform:rotate(0);transform:rotate(0)}55%{background-color:#b4b4b4}100%{-webkit-transform:rotate(90deg);transform:rotate(90deg)}}@keyframes loaderBlock{0%,30%{-webkit-transform:rotate(0);transform:rotate(0)}55%{background-color:#b4b4b4}100%{-webkit-transform:rotate(90deg);transform:rotate(90deg)}}@-webkit-keyframes loaderBlockInverse{0%,20%{-webkit-transform:rotate(0);transform:rotate(0)}55%{background-color:#d9d9d9}100%{-webkit-transform:rotate(-90deg);transform:rotate(-90deg)}}@keyframes loaderBlockInverse{0%,20%{-webkit-transform:rotate(0);transform:rotate(0)}55%{background-color:#d9d9d9}100%{-webkit-transform:rotate(-90deg);transform:rotate(-90deg)}}.loader{position:absolute;top:50%;left:50%;width:60px;height:60px;-webkit-transform:translate(-50%,-50%) rotate(45deg) translate3d(0,0,0);transform:translate(-50%,-50%) rotate(45deg) translate3d(0,0,0);-webkit-animation:1.2s ease-in-out infinite loader;animation:1.2s ease-in-out infinite loader}.loader span{position:absolute;display:block;width:40px;height:40px;background-color:#fff;-webkit-animation:1.2s ease-in-out infinite both loaderBlock;animation:1.2s ease-in-out infinite both loaderBlock}.loader span:nth-child(1){top:0;left:0}.loader span:nth-child(2){top:0;right:0;-webkit-animation:1.2s ease-in-out infinite both loaderBlockInverse;animation:1.2s ease-in-out infinite both loaderBlockInverse}.loader span:nth-child(3){bottom:0;left:0;-webkit-animation:1.2s ease-in-out infinite both loaderBlockInverse;animation:1.2s ease-in-out infinite both loaderBlockInverse}.loader span:nth-child(4){bottom:0;right:0}"]
                    }] }
        ];
        LoadingSpinnerComponent.propDecorators = {
            loadingConfig: [{ type: core.Input }],
            accessibilityConfig: [{ type: core.Input }]
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
            this.show = new core.EventEmitter();
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
            { type: core.Component, args: [{
                        selector: 'fg-plain-gallery',
                        template: "<div *ngIf=\"showGallery\"\n     class=\"plain-container\"\n     fgWrap [wrap]=\"wrapStyle\" [width]=\"widthStyle\"\n     fgDirection [direction]=\"directionStyle\" [justify]=\"justifyStyle\"\n     [attr.aria-label]=\"accessibilityConfig?.plainGalleryContentAriaLabel\"\n     [title]=\"accessibilityConfig?.plainGalleryContentTitle\">\n\n  <ng-container *ngFor=\"let imgRow of imageGrid; let i = index\">\n    <ng-container *ngFor=\"let imgCol of imgRow; let j = index\">\n\n      <ng-container *ngIf=\"!configPlainGallery.advanced?.aTags; else aTags\">\n        <img *ngIf=\"imgCol?.modal?.img\"\n             [src]=\"imgCol.plain?.img ? imgCol.plain.img : imgCol.modal.img\"\n             class=\"image\"\n             fgSize [sizeConfig]=\"{width: size?.width, height: size?.height}\"\n             [attr.aria-label]=\"imgCol.plain?.ariaLabel\"\n             [title]=\"imgCol.plain?.title ? imgCol.plain.title : getTitleDisplay(imgCol)\"\n             alt=\"{{imgCol.plain?.alt ? imgCol.plain.alt : getAltPlainDescriptionByImage(imgCol)}}\"\n             [tabindex]=\"0\" role=\"img\"\n             (click)=\"showModalGalleryByImage(imgCol)\" (keyup)=\"showModalGalleryByImage(imgCol)\"/>\n      </ng-container>\n\n      <!-- Add directive to set background with the image url as param to pass thumb or img-->\n      <!-- to do something like this <a style=\"background: url('path to image') 50% 50%/cover\">.-->\n      <ng-template #aTags>\n        <a *ngIf=\"imgCol?.modal?.img\"\n           class=\"a-tag-image\"\n           fgATagBgImage [image]=\"imgCol\" [style]=\"configPlainGallery.advanced?.additionalBackground\"\n           fgSize [sizeConfig]=\"{width: size?.width, height: size?.height}\"\n           [attr.aria-label]=\"imgCol.plain?.ariaLabel\"\n           [title]=\"imgCol.plain?.title ? imgCol.plain.title : getTitleDisplay(imgCol)\"\n           [tabindex]=\"0\"\n           (click)=\"showModalGallery(j)\" (keyup)=\"showModalGallery(j)\"></a>\n      </ng-template>\n\n    </ng-container>\n  </ng-container>\n\n</div>\n\n",
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        styles: [".plain-container{align-items:center;display:flex}.plain-container .image{cursor:pointer;height:auto;margin-left:2px;margin-right:2px;width:50px}.plain-container .image:hover{filter:brightness(40%);-webkit-filter:brightness(40%);transition:.3s}.plain-container .a-tag-image{cursor:pointer;margin-left:2px;margin-right:2px}"]
                    }] }
        ];
        PlainGalleryComponent.propDecorators = {
            images: [{ type: core.Input }],
            showGallery: [{ type: core.Input }],
            plainGalleryConfig: [{ type: core.Input }],
            accessibilityConfig: [{ type: core.Input }],
            show: [{ type: core.Output }]
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
            { type: core.NgModule, args: [{
                        imports: [common.CommonModule],
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
     * Internal representation of an image adding other fields
     * to the public `Image` class.
     */
    var /**
     * Internal representation of an image adding other fields
     * to the public `Image` class.
     */ InternalLibImage = /** @class */ (function (_super) {
        __extends(InternalLibImage, _super);
        function InternalLibImage(id, modal, plain, previouslyLoaded) {
            if (previouslyLoaded === void 0) {
                previouslyLoaded = false;
            }
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

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */

    exports.setupKeyboardService = setupKeyboardService;
    exports.setupGalleryService = setupGalleryService;
    exports.ModalGalleryModule = ModalGalleryModule;
    exports.fg_DEFAULT_ACCESSIBILITY_CONFIG = fg_DEFAULT_ACCESSIBILITY_CONFIG;
    exports.AccessibleComponent = AccessibleComponent;
    exports.ModalGalleryComponent = ModalGalleryComponent;
    exports.COMPONENTS = COMPONENTS;
    exports.BackgroundComponent = BackgroundComponent;
    exports.CurrentImageComponent = CurrentImageComponent;
    exports.DotsComponent = DotsComponent;
    exports.PlainGalleryComponent = PlainGalleryComponent;
    exports.PreviewsComponent = PreviewsComponent;
    exports.UpperButtonsComponent = UpperButtonsComponent;
    exports.fg_DEFAULT_SIZE = fg_DEFAULT_SIZE;
    exports.fg_DEFAULT_BTN_CLOSE = fg_DEFAULT_BTN_CLOSE;
    exports.fg_DEFAULT_BTN_DOWNLOAD = fg_DEFAULT_BTN_DOWNLOAD;
    exports.fg_DEFAULT_BTN_EXTURL = fg_DEFAULT_BTN_EXTURL;
    exports.fg_DEFAULT_BTN_DELETE = fg_DEFAULT_BTN_DELETE;
    exports.fg_DEFAULT_BTN_FULL_SCREEN = fg_DEFAULT_BTN_FULL_SCREEN;
    exports.ATagBgImageDirective = ATagBgImageDirective;
    exports.ClickOutsideDirective = ClickOutsideDirective;
    exports.DescriptionDirective = DescriptionDirective;
    exports.DirectionDirective = DirectionDirective;
    exports.DIRECTIVES = DIRECTIVES;
    exports.KeyboardNavigationDirective = KeyboardNavigationDirective;
    exports.SizeDirective = SizeDirective;
    exports.WrapDirective = WrapDirective;
    exports.Action = Action;
    exports.ButtonsStrategy = ButtonsStrategy;
    exports.ButtonType = ButtonType;
    exports.WHITELIST_BUTTON_TYPES = WHITELIST_BUTTON_TYPES;
    exports.DescriptionStrategy = DescriptionStrategy;
    exports.Image = Image;
    exports.ImageModalEvent = ImageModalEvent;
    exports.InternalLibImage = InternalLibImage;
    exports.Keyboard = Keyboard;
    exports.LoadingType = LoadingType;
    exports.LineLayout = LineLayout;
    exports.GridLayout = GridLayout;
    exports.AdvancedLayout = AdvancedLayout;
    exports.PlainGalleryStrategy = PlainGalleryStrategy;
    exports.GalleryService = GalleryService;
    exports.KEYBOARD_CONFIGURATION = KEYBOARD_CONFIGURATION;
    exports.KeyboardService = KeyboardService;
    exports.getIndex = getIndex;
    exports.SPACE_KEY = SPACE_KEY;
    exports.ENTER_KEY = ENTER_KEY;
    exports.MOUSE_MAIN_BUTTON_CLICK = MOUSE_MAIN_BUTTON_CLICK;
    exports.NEXT = NEXT;
    exports.PREV = PREV;
    exports.NOTHING = NOTHING;
    exports.DIRECTION_RIGHT = DIRECTION_RIGHT;
    exports.DIRECTION_LEFT = DIRECTION_LEFT;
    exports.ɵa = LoadingSpinnerComponent;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwtYW5ndWxhci1nYWxsZXJ5LnVtZC5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vbW9kYWwtYW5ndWxhci1nYWxsZXJ5L2xpYi9kaXJlY3RpdmVzL2NsaWNrLW91dHNpZGUuZGlyZWN0aXZlLnRzIiwibmc6Ly9tb2RhbC1hbmd1bGFyLWdhbGxlcnkvbGliL2RpcmVjdGl2ZXMvc2l6ZS5kaXJlY3RpdmUudHMiLCJuZzovL21vZGFsLWFuZ3VsYXItZ2FsbGVyeS9saWIvZGlyZWN0aXZlcy9rZXlib2FyZC1uYXZpZ2F0aW9uLmRpcmVjdGl2ZS50cyIsIm5nOi8vbW9kYWwtYW5ndWxhci1nYWxsZXJ5L2xpYi9kaXJlY3RpdmVzL3dyYXAuZGlyZWN0aXZlLnRzIiwibmc6Ly9tb2RhbC1hbmd1bGFyLWdhbGxlcnkvbGliL2RpcmVjdGl2ZXMvZGlyZWN0aW9uLmRpcmVjdGl2ZS50cyIsIm5nOi8vbW9kYWwtYW5ndWxhci1nYWxsZXJ5L2xpYi9kaXJlY3RpdmVzL2EtdGFnLWJnLWltYWdlLmRpcmVjdGl2ZS50cyIsIm5nOi8vbW9kYWwtYW5ndWxhci1nYWxsZXJ5L2xpYi9kaXJlY3RpdmVzL2Rlc2NyaXB0aW9uLmRpcmVjdGl2ZS50cyIsIm5nOi8vbW9kYWwtYW5ndWxhci1nYWxsZXJ5L2xpYi9kaXJlY3RpdmVzL2RpcmVjdGl2ZXMudHMiLCJuZzovL21vZGFsLWFuZ3VsYXItZ2FsbGVyeS9saWIvY29tcG9uZW50cy9iYWNrZ3JvdW5kL2JhY2tncm91bmQuY29tcG9uZW50LnRzIiwibmc6Ly9tb2RhbC1hbmd1bGFyLWdhbGxlcnkvbGliL21vZGVsL2ltYWdlLmNsYXNzLnRzIiwibmc6Ly9tb2RhbC1hbmd1bGFyLWdhbGxlcnkvbGliL21vZGVsL2FjdGlvbi5lbnVtLnRzIiwibmc6Ly9tb2RhbC1hbmd1bGFyLWdhbGxlcnkvbGliL3NlcnZpY2VzL2tleWJvYXJkLnNlcnZpY2UudHMiLCJuZzovL21vZGFsLWFuZ3VsYXItZ2FsbGVyeS9saWIvc2VydmljZXMvZ2FsbGVyeS5zZXJ2aWNlLnRzIiwibm9kZV9tb2R1bGVzL3RzbGliL3RzbGliLmVzNi5qcyIsIm5nOi8vbW9kYWwtYW5ndWxhci1nYWxsZXJ5L2xpYi91dGlscy91c2VyLWlucHV0LnV0aWwudHMiLCJuZzovL21vZGFsLWFuZ3VsYXItZ2FsbGVyeS9saWIvY29tcG9uZW50cy9hY2Nlc3NpYmxlLmNvbXBvbmVudC50cyIsIm5nOi8vbW9kYWwtYW5ndWxhci1nYWxsZXJ5L2xpYi9tb2RlbC9kZXNjcmlwdGlvbi5pbnRlcmZhY2UudHMiLCJuZzovL21vZGFsLWFuZ3VsYXItZ2FsbGVyeS9saWIvbW9kZWwva2V5Ym9hcmQuZW51bS50cyIsIm5nOi8vbW9kYWwtYW5ndWxhci1nYWxsZXJ5L2xpYi9tb2RlbC9sb2FkaW5nLWNvbmZpZy5pbnRlcmZhY2UudHMiLCJuZzovL21vZGFsLWFuZ3VsYXItZ2FsbGVyeS9saWIvdXRpbHMvaW1hZ2UudXRpbC50cyIsIm5nOi8vbW9kYWwtYW5ndWxhci1nYWxsZXJ5L2xpYi9jb21wb25lbnRzL2N1cnJlbnQtaW1hZ2UvY3VycmVudC1pbWFnZS5jb21wb25lbnQudHMiLCJuZzovL21vZGFsLWFuZ3VsYXItZ2FsbGVyeS9saWIvbW9kZWwvcGxhaW4tZ2FsbGVyeS1jb25maWcuaW50ZXJmYWNlLnRzIiwibmc6Ly9tb2RhbC1hbmd1bGFyLWdhbGxlcnkvbGliL2NvbXBvbmVudHMvYWNjZXNzaWJpbGl0eS1kZWZhdWx0LnRzIiwibmc6Ly9tb2RhbC1hbmd1bGFyLWdhbGxlcnkvbGliL2NvbXBvbmVudHMvbW9kYWwtZ2FsbGVyeS9tb2RhbC1nYWxsZXJ5LmNvbXBvbmVudC50cyIsIm5nOi8vbW9kYWwtYW5ndWxhci1nYWxsZXJ5L2xpYi9tb2RlbC9idXR0b25zLWNvbmZpZy5pbnRlcmZhY2UudHMiLCJuZzovL21vZGFsLWFuZ3VsYXItZ2FsbGVyeS9saWIvY29tcG9uZW50cy91cHBlci1idXR0b25zL3VwcGVyLWJ1dHRvbnMtZGVmYXVsdC50cyIsIm5nOi8vbW9kYWwtYW5ndWxhci1nYWxsZXJ5L2xpYi9jb21wb25lbnRzL3VwcGVyLWJ1dHRvbnMvdXBwZXItYnV0dG9ucy5jb21wb25lbnQudHMiLCJuZzovL21vZGFsLWFuZ3VsYXItZ2FsbGVyeS9saWIvY29tcG9uZW50cy9kb3RzL2RvdHMuY29tcG9uZW50LnRzIiwibmc6Ly9tb2RhbC1hbmd1bGFyLWdhbGxlcnkvbGliL2NvbXBvbmVudHMvcHJldmlld3MvcHJldmlld3MuY29tcG9uZW50LnRzIiwibmc6Ly9tb2RhbC1hbmd1bGFyLWdhbGxlcnkvbGliL2NvbXBvbmVudHMvY3VycmVudC1pbWFnZS9sb2FkaW5nLXNwaW5uZXIvbG9hZGluZy1zcGlubmVyLmNvbXBvbmVudC50cyIsIm5nOi8vbW9kYWwtYW5ndWxhci1nYWxsZXJ5L2xpYi9jb21wb25lbnRzL3BsYWluLWdhbGxlcnkvcGxhaW4tZ2FsbGVyeS5jb21wb25lbnQudHMiLCJuZzovL21vZGFsLWFuZ3VsYXItZ2FsbGVyeS9saWIvY29tcG9uZW50cy9jb21wb25lbnRzLnRzIiwibmc6Ly9tb2RhbC1hbmd1bGFyLWdhbGxlcnkvbGliL21vZGFsLWdhbGxlcnkubW9kdWxlLnRzIiwibmc6Ly9tb2RhbC1hbmd1bGFyLWdhbGxlcnkvbGliL21vZGVsL2ltYWdlLWludGVybmFsLmNsYXNzLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qXG4gVGhlIE1JVCBMaWNlbnNlIChNSVQpXG5cbiBDb3B5cmlnaHQgKGMpIDIwMTctMjAxOCBTdGVmYW5vIENhcHBhIChLczg5KVxuXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIifgIHRvIGRlYWxcbiBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4gdG8gdXNlLCBjb3B5LCBtb2RpZnfgIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG5cbiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBhbGxcbiBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT04gSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRVxuIFNPRlRXQVJFLlxuICovXG5cbmltcG9ydCB7IERpcmVjdGl2ZSwgRXZlbnRFbWl0dGVyLCBIb3N0TGlzdGVuZXIsIElucHV0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuLyoqXG4gKiBEaXJlY3RpdmUgdG8gY2xvc2UgdGhlIG1vZGFsIGdhbGxlcnkgY2xpY2tpbmcgb24gdGhlIHNlbWktdHJhbnNwYXJlbnQgYmFja2dyb3VuZC5cbiAqIEluIGZhY3QsIGl0IGxpc3RlbnMgZm9yIGEgY2xpY2sgb24gYWxsIGVsZW1lbnRzIHRoYXQgYXJlbid0ICdpbnNpZGUnIGFuZCBpdCBlbWl0c1xuICogYW4gZXZlbnQgdXNpbmcgYEBPdXRwdXQgY2xpY2tPdXRzaWRlYC5cbiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2tzQ2xpY2tPdXRzaWRlXSdcbn0pXG5leHBvcnQgY2xhc3MgQ2xpY2tPdXRzaWRlRGlyZWN0aXZlIHtcbiAgLyoqXG4gICAqIEJvb2xlYW4gdG8gZW5hYmxlIHRoaXMgZGlyZWN0aXZlLlxuICAgKi9cbiAgQElucHV0KCkgY2xpY2tPdXRzaWRlRW5hYmxlOiBib29sZWFuO1xuICAvKipcbiAgICogT3V0cHV0IHRvIGVtaXQgYW4gZXZlbnQgaWYgdGhlIGNsaWNrZWQgZWxlbWVudCBjbGFzcyBkb2Vzbid0IGNvbnRhaW4gJ2luc2lkZScgb3IgaXQgaXMgJ2hpZGRlbicuIFRoZSBwYXlsb2FkIGlzIGEgYm9vbGVhbi5cbiAgICovXG4gIEBPdXRwdXQofgBjbGlja091dHNpZGU6IEV2ZW50RW1pdHRlcjxib29sZWFuPiA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcblxuICAvKipcbiAgICogTWV0aG9kIGNhbGxlZCBieSBBbmd1bGFyIGl0c2VsZiBldmVyeSBjbGljayB0aGFua3MgdG8gYEBIb3N0TGlzdGVuZXJgLlxuICAgKiBAcGFyYW0gTW91c2VFdmVudCBldmVudCBwYXlsb2FkIHJlY2VpdmVkIGV2ZXkgY2xpY2tcbiAgICovXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJywgWyckZXZlbnQnXSlcbiAgb25DbGljayhldmVudDogTW91c2VFdmVudCkge1xuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgY29uc3QgdGFyZ2V0RWxlbWVudDogYW55ID0gZXZlbnQudGFyZ2V0O1xuXG4gICAgaWYgKCF0aGlzLmNsaWNrT3V0c2lkZUVuYWJsZSB8fCAhdGFyZ2V0RWxlbWVudCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxldCBpc0luc2lkZSA9IGZhbHNlO1xuICAgIGxldCBpc0hpZGRlbiA9IGZhbHNlO1xuXG4gICAgaWYgKHR5cGVvZiB0YXJnZXRFbGVtZW50LmNsYXNzTmFtZSAhPT0gJ3N0cmluZycpIHtcbiAgICAgIC8vIGl0IGhhcHBlbnMgd2l0aCBAZm9ydGF3ZXNvbWUvZm9udGF3ZXNvbWUgNVxuICAgICAgLy8gZm9yIHNvbWUgcmVhc29ucyBjbGFzc05hbWUgaXMgYW4gb2JqZWN0IHdpdGggMiBlbXB0eSBwcm9wZXJ0aWVzIGluc2lkZVxuICAgICAgaXNJbnNpZGUgPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBpbiBub3JtYWwgc2NlbmFyaW9zLCB1c2UgY2xhc3NuYW1lLCBiZWNhdXNlIGl0J3MgYSBzaW1wbGUgc3RyaW5nXG4gICAgICBpc0luc2lkZSA9IHRhcmdldEVsZW1lbnQuY2xhc3NOYW1lICYmIHRhcmdldEVsZW1lbnQuY2xhc3NOYW1lLnN0YXJ0c1dpdGgoJ2luc2lkZScpO1xuICAgICAgaXNIaWRkZW4gPSB0YXJnZXRFbGVtZW50LmNsYXNzTmFtZS5pbmNsdWRlcygnaGlkZGVuJyk7XG4gICAgfVxuXG4gICAgLy8gaWYgaW5zaWRlID0+IGRvbid0IGNsb3NlIG1vZGFsIGdhbGxlcnlcbiAgICAvLyBpZiBoaWRkZW4gPT4gY2xvc2UgbW9kYWwgZ2FsbGVyeVxuICAgIC8qXG4gICAgICAgIGkgaScgaCB8IGNsb3NlXG4gICAgICAgIDAgMSAgMCB8ICAgMSA9PiBjbG9zZSBtb2RhbCBnYWxsZXJ5XG4gICAgICAgIDAgMSAgMSB8ICAgMSA9PiBjbG9zZSBtb2RhbCBnYWxsZXJ5XG4gICAgICAgIDEgMCAgMCB8ICAgMFxuICAgICAgICAxIDAgIDEgfCAgIDEgPT4gY2xvc2UgbW9kYWwgZ2FsbGVyeVxuICAgICAqL1xuICAgIGlmICghaXNJbnNpZGUgfHwgaXNIaWRkZW4pIHtcbiAgICAgIC8vIGNsb3NlIG1vZGFsIGdhbGxlcnlcbiAgICAgIHRoaXMuY2xpY2tPdXRzaWRlLmVtaXQodHJ1ZSk7XG4gICAgfVxuICB9XG59XG4iLCIvKlxuIFRoZSBNSVQgTGljZW5zZSAoTUlUKVxuXG4gQ29weXJpZ2h0IChjfgAyMDE3LTIwMTggU3RlZmFubyBDYXBwYSAoS3M4OSlcblxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbiBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuXG4gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsXG4gY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cblxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OIElORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEVcbiBTT0ZUV0FSRS5cbiAqL1xuXG5pbXBvcnQgeyBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIElucHV0LCBPbkNoYW5nZXMsIE9uSW5pdCwgUmVuZGVyZXIyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTaXplIH0gZnJvbSAnLi4vbW9kZWwvc2l6ZS5pbnRlcmZhY2UnO1xuXG4vKipcbiAqIERpcmVjdGl2ZSB0byBjaGFuZ2UgdGhlIHNpemUgb2YgYW4gZWxlbWVudC5cbiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2tzU2l6ZV0nXG59KVxuZXhwb3J0IGNsYXNzIFNpemVEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcyB7XG4gIC8qKlxuICAgKiBPYmplY3Qgb2YgdHlwZSBgU2l6ZWAgdG8gcmVzaXplIHRoZSBlbGVtZW50LlxuICAgKi9cbiAgQElucHV0KCkgc2l6ZUNvbmZpZzogU2l6ZTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsIHByaXZhdGUgZWw6IEVsZW1lbnRSZWYpIHt9XG5cbiAgLyoqXG4gICAqIE1ldGhvZCDDgsK0bmdPbkluaXTDgsK0IHRvIGFwcGx5IHRoZSBzdHlsZSBvZiB0aGlzIGRpcmVjdGl2ZS5cbiAgICogVGhpcyBpcyBhbiBBbmd1bGFyJ3MgbGlmZWN5Y2xlIGhvb2ssIHNvIGl0cyBjYWxsZWQgYXV0b21hdGljYWxseSBieSBBbmd1bGFyIGl0c2VsZi5cbiAgICogSW4gcGFydGljdWxhciwgaXQncyBjYWxsZWQgb25seSBvbmUgdGltZSEhIVxuICAgKi9cbiAgbmdPbkluaXQofgB7XG4gICAgdGhpcy5hcHBseVN0eWxlKCk7XG4gIH1cblxuICAvKipcbiAgICogTWV0aG9kIMOCwrRuZ09uQ2hhbmdlc8OCwrQgdG8gYXBwbHkgdGhlIHN0eWxlIG9mIHRoaXMgZGlyZWN0aXZlLlxuICAgKiBUaGlzIGlzIGFuIEFuZ3VsYXIncyBsaWZlY3ljbGUgaG9vaywgc28gaXRzIGNhbGxlZCBhdXRvbWF0aWNhbGx5IGJ5IEFuZ3VsYXIgaXRzZWxmLlxuICAgKiBJbiBwYXJ0aWN1bGFyLCBpdCdzIGNhbGxlZCB3aGVuIGFueSBkYXRhLWJvdW5kIHByb3BlcnR5IG9mIGEgZGlyZWN0aXZlIGNoYW5nZXMhISFcbiAgICovXG4gIG5nT25DaGFuZ2VzKCkge1xuICAgIHRoaXMuYXBwbHlTdHlsZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFByaXZhdGUgbWV0aG9kIHRvIGNoYW5nZSBib3RoIHdpZHRoIGFuZCBoZWlnaHQgb2YgYW4gZWxlbWVudC5cbiAgICovXG4gIHByaXZhdGUgYXBwbHlTdHlsZSgpIHtcbiAgICBpZiAoIXRoaXMuc2l6ZUNvbmZpZykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvLyBhcHBseSBbc3R5bGUud2lkdGhdXG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICd3aWR0aCcsIHRoaXMuc2l6ZUNvbmZpZy53aWR0aCk7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICdoZWlnaHQnLCB0aGlzLnNpemVDb25maWcuaGVpZ2h0KTtcbiAgfVxufVxuIiwiLypcbiBUaGUgTUlUIExpY2Vuc2UgKE1JVClcblxuIENvcHlyaWdodCAoYykgMjAxNy0yMDE4IFN0ZWZhbm8gQ2FwcGEgKEtzODkpXG5cbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwifgwgdG8gZGVhbFxuIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbiB0byB1c2UsIGNvcHfgIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcblxuIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIGFsbFxuIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG5cbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFfgXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTiBJTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiBMSUFCSUxJVFfgIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFXG4gU09GVFdBUkUuXG4gKi9cblxuaW1wb3J0IHsgRGlyZWN0aXZlLCBFdmVudEVtaXR0ZXIsIEhvc3RMaXN0ZW5lciwgSW5wdXQsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdba3NLZXlib2FyZE5hdmlnYXRpb25dJ1xufSlcbmV4cG9ydCBjbGFzcyBLZXlib2FyZE5hdmlnYXRpb25EaXJlY3RpdmUge1xuICBASW5wdXQofgBpc09wZW46IGJvb2xlYW47XG5cbiAgQE91dHB1dCgpIGtleVByZXNzOiBFdmVudEVtaXR0ZXI8bnVtYmVyPiA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyPigpO1xuXG4gIC8qKlxuICAgKiBMaXN0ZW5lciB0byBjYXRjaCBrZXlib2FyZCdzIGV2ZW50cyBhbmQgY2FsbCB0aGUgcmlnaHQgbWV0aG9kIGJhc2VkIG9uIHRoZSBrZXkuXG4gICAqIEZvciBpbnN0YW5jZSwgcHJlc3NpbmcgZXNjLCB0aGlzIHdpbGwgY2FsbCBgY2xvc2VHYWxsZXJ5KEFjdGlvbi5LRVlCT0FSRClgIGFuZCBzbyBvbi5cbiAgICogSWYgeW91IHBhc3NlZCBhIHZhbGlkIGBrZXlib2FyZENvbmZpZ2AgZXNjLCByaWdodCBhbmQgbGVmdCBidXR0b25zIHdpbGwgYmUgY3VzdG9taXplZCBiYXNlZCBvbiB5b3VyIGRhdGEuXG4gICAqIEBwYXJhbSBlIEtleWJvYXJkRXZlbnQgY2F1Z2h0IGJ5IHRoZSBsaXN0ZW5lci5cbiAgICovXG4gIEBIb3N0TGlzdGVuZXIoJ3dpbmRvdzprZXlkb3duJywgWyckZXZlbnQnXSlcbiAgb25LZXlEb3duKGU6IEtleWJvYXJkRXZlbnQpIHtcbiAgICBpZiAoIXRoaXMuaXNPcGVufgB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMua2V5UHJlc3MuZW1pdChlLmtleUNvZGUpO1xuICB9XG59XG4iLCIvKlxuIFRoZSBNSVQgTGljZW5zZSAoTUlUKVxuXG4gQ29weXJpZ2h0IChjfgAyMDE3LTIwMTggU3RlZmFubyBDYXBwYSAoS3M4OSlcblxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbiBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuXG4gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsXG4gY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cblxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OIElORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEVcbiBTT0ZUV0FSRS5cbiAqL1xuXG5pbXBvcnQgeyBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIElucHV0LCBPbkNoYW5nZXMsIE9uSW5pdCwgUmVuZGVyZXIyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbi8qKlxuICogRGlyZWN0aXZlIHRvIGNoYW5nZSB0aGUgZmxleC13cmFwIGNzcyBwcm9wZXJ0eSBvZiBhbiBlbGVtZW50LlxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdba3NXcmFwXSdcbn0pXG5leHBvcnQgY2xhc3MgV3JhcERpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzIHtcbiAgLyoqXG4gICAqIEJvb2xlYW4gaW5wdXQgdGhhdCBpdCdzIHRydWUgdG8gYWRkICdmbGV4LXdyYXA6IHdyYXAnLCAnZmxleC13cmFwOiBub3dyYXAnIG90aGVyd2lzZS5cbiAgICovXG4gIEBJbnB1dCgpIHdyYXA6IGJvb2xlYW47XG4gIC8qKlxuICAgKiBTdHJpbmcgaW5wdXQgdG8gZm9yY2UgdGhlIHdpZHRoIG9mIHRoZSBlbGVtZW50IHRvIGJlIGFibGUgdG8gc2VlIHdyYXBwaW5nLlxuICAgKi9cbiAgQElucHV0KCkgd2lkdGg6IHN0cmluZztcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsIHByaXZhdGUgZWw6IEVsZW1lbnRSZWYpIHt9XG5cbiAgLyoqXG4gICAqIE1ldGhvZCDDgsK0bmdPbkluaXTDgsK0IHRvIGFwcGx5IHRoZSBzdHlsZSBvZiB0aGlzIGRpcmVjdGl2ZS5cbiAgICogVGhpcyBpcyBhbiBBbmd1bGFyJ3MgbGlmZWN5Y2xlIGhvb2ssIHNvIGl0cyBjYWxsZWQgYXV0b21hdGljYWxseSBieSBBbmd1bGFyIGl0c2VsZi5cbiAgICogSW4gcGFydGljdWxhciwgaXQncyBjYWxsZWQgb25seSBvbmUgdGltZSEhIVxuICAgKi9cbiAgbmdPbkluaXQofgB7XG4gICAgdGhpcy5hcHBseVN0eWxlKCk7XG4gIH1cblxuICAvKipcbiAgICogTWV0aG9kIMOCwrRuZ09uQ2hhbmdlc8OCwrQgdG8gYXBwbHkgdGhlIHN0eWxlIG9mIHRoaXMgZGlyZWN0aXZlLlxuICAgKiBUaGlzIGlzIGFuIEFuZ3VsYXIncyBsaWZlY3ljbGUgaG9vaywgc28gaXRzIGNhbGxlZCBhdXRvbWF0aWNhbGx5IGJ5IEFuZ3VsYXIgaXRzZWxmLlxuICAgKiBJbiBwYXJ0aWN1bGFyLCBpdCdzIGNhbGxlZCB3aGVuIGFueSBkYXRhLWJvdW5kIHByb3BlcnR5IG9mIGEgZGlyZWN0aXZlIGNoYW5nZXMhISFcbiAgICovXG4gIG5nT25DaGFuZ2VzKCkge1xuICAgIHRoaXMuYXBwbHlTdHlsZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFByaXZhdGUgbWV0aG9kIHRvIGNoYW5nZSBib3RoIHdpZGh0IGFuZCBmbGV4LXdyYXAgY3NzIHByb3BlcnRpZXMuXG4gICAqL1xuICBwcml2YXRlIGFwcGx5U3R5bGUofgB7XG4gICAgLy8gVE9ETyBpcyB0aGlzIHJpZ2h0Pz8/PyBJZiB3cmFwIG9zIGZhbHNlIEkgY2Fubm90IGFwcGx5IHdpZHRoIGFuZCBmbGV4LXdyYXBcbiAgICBpZiAoIXRoaXMud3JhcCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ3dpZHRoJywgdGhpcy53aWR0aCk7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICdmbGV4LXdyYXAnLCB0aGlzLndyYXAgPyAnd3JhcCcgOiAnbm93cmFwJyk7XG4gIH1cbn1cbiIsIi8qXG4gVGhlIE1JVCBMaWNlbnNlIChNSVQpXG5cbiBDb3B5cmlnaHQgKGMpIDIwMTctMjAxOCBTdGVmYW5vIENhcHBhIChLczg5KVxuXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIifgIHRvIGRlYWxcbiBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4gdG8gdXNlLCBjb3B5LCBtb2RpZnfgIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG5cbiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBhbGxcbiBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT04gSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRVxuIFNPRlRXQVJFLlxuICovXG5cbmltcG9ydCB7IERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSW5wdXQsIE9uQ2hhbmdlcywgT25Jbml0LCBSZW5kZXJlcjIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuLyoqXG4gKiBEaXJlY3RpdmUgdG8gY2hhbmdlIHRoZSBmbGV4LWRpcmVjdGlvbiBvZiBhbiBlbGVtZW50LCBiYXNlZCBvbiB0d28gaW5wdXRzIChgZGlyZWN0aW9uYCBhbmQgYGp1c3RpZnlgfg5cbiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2tzRGlyZWN0aW9uXSdcbn0pXG5leHBvcnQgY2xhc3MgRGlyZWN0aW9uRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMge1xuICAvKipcbiAgICogU3RyaW5nIGlucHV0IHRvIHNldCB0aGUgY3NzIGZsZXgtZGlyZWN0aW9uIG9mIGFuIGVsZW1lbnQuXG4gICAqL1xuICBASW5wdXQofgBkaXJlY3Rpb246IHN0cmluZztcbiAgLyoqXG4gICAqIFN0cmluZyBpbnB1dCB0byBzZXQgdGhlIGNzcyBqdXN0aWZ5LWNvbnRlbnQgb2YgYW4gZWxlbWVudC5cbiAgICovXG4gIEBJbnB1dCgpIGp1c3RpZnk6IHN0cmluZztcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsIHByaXZhdGUgZWw6IEVsZW1lbnRSZWYpIHt9XG5cbiAgLyoqXG4gICAqIE1ldGhvZCDDgsK0bmdPbkluaXTDgsK0IHRvIGFwcGx5IHRoZSBzdHlsZSBvZiB0aGlzIGRpcmVjdGl2ZS5cbiAgICogVGhpcyBpcyBhbiBBbmd1bGFyJ3MgbGlmZWN5Y2xlIGhvb2ssIHNvIGl0cyBjYWxsZWQgYXV0b21hdGljYWxseSBieSBBbmd1bGFyIGl0c2VsZi5cbiAgICogSW4gcGFydGljdWxhciwgaXQncyBjYWxsZWQgb25seSBvbmUgdGltZSEhIVxuICAgKi9cbiAgbmdPbkluaXQofgB7XG4gICAgdGhpcy5hcHBseVN0eWxlKCk7XG4gIH1cblxuICAvKipcbiAgICogTWV0aG9kIMOCwrRuZ09uQ2hhbmdlc8OCwrQgdG8gYXBwbHkgdGhlIHN0eWxlIG9mIHRoaXMgZGlyZWN0aXZlLlxuICAgKiBUaGlzIGlzIGFuIEFuZ3VsYXIncyBsaWZlY3ljbGUgaG9vaywgc28gaXRzIGNhbGxlZCBhdXRvbWF0aWNhbGx5IGJ5IEFuZ3VsYXIgaXRzZWxmLlxuICAgKiBJbiBwYXJ0aWN1bGFyLCBpdCdzIGNhbGxlZCB3aGVuIGFueSBkYXRhLWJvdW5kIHByb3BlcnR5IG9mIGEgZGlyZWN0aXZlIGNoYW5nZXMhISFcbiAgICovXG4gIG5nT25DaGFuZ2VzKCkge1xuICAgIHRoaXMuYXBwbHlTdHlsZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFByaXZhdGUgbWV0aG9kIHRvIGNoYW5nZSBib3RoIGRpcmVjdGlvbiBhbmQganVzdGlmeSBvZiBhbiBlbGVtZW50LlxuICAgKi9cbiAgcHJpdmF0ZSBhcHBseVN0eWxlKCkge1xuICAgIGlmICghdGhpcy5kaXJlY3Rpb24gfHwgIXRoaXMuanVzdGlmeSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ2ZsZXgtZGlyZWN0aW9uJywgdGhpcy5kaXJlY3Rpb24pO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbC5uYXRpdmVFbGVtZW50LCAnanVzdGlmeS1jb250ZW50JywgdGhpcy5qdXN0aWZ5KTtcbiAgfVxufVxuIiwiLypcbiBUaGUgTUlUIExpY2Vuc2UgKE1JVClcblxuIENvcHlyaWdodCAoYykgMjAxNy0yMDE4IFN0ZWZhbm8gQ2FwcGEgKEtzODkpXG5cbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwifgwgdG8gZGVhbFxuIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbiB0byB1c2UsIGNvcHfgIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcblxuIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIGFsbFxuIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG5cbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFfgXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTiBJTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiBMSUFCSUxJVFfgIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFXG4gU09GVFdBUkUuXG4gKi9cblxuaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBJbnB1dCwgT25DaGFuZ2VzLCBPbkluaXQsIFJlbmRlcmVyMiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBJbWFnZSB9IGZyb20gJy4uL21vZGVsL2ltYWdlLmNsYXNzJztcbmltcG9ydCB7IFNhZmVSZXNvdXJjZVVybCB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuXG4vKipcbiAqIERpcmVjdGl2ZSB0byBhZGQgYW4gaW1hZ2UgdG8gYW4gYDxhPmAgdGFnIHdpdGggc29tZSBhZGRpdGlvbmFsIGN1c3RvbSBwcm9wZXJ0aWVzLlxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdba3NBVGFnQmdJbWFnZV0nXG59KVxuZXhwb3J0IGNsYXNzIEFUYWdCZ0ltYWdlRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMge1xuICAvKipcbiAgICogT2JqZWN0IG9mIHR5cGUgYEltYWdlYCB0aGF0IHJlcHJlc2VudHMgdGhlIGltYWdlIHRvIGFkZCB0byB0aGUgYDxhPmAgdGFnLlxuICAgKi9cbiAgQElucHV0KCkgaW1hZ2U6IEltYWdlO1xuICAvKipcbiAgICogQWRkaXRpb25hbCBzdHlsZSB0byBjdXN0b21pemUgdGhlIGJhY2tncm91bmQgYXR0cmlidXRlLlxuICAgKiBFbXB0eSBzdHJpbmcgYnkgZGVmYXVsdC5cbiAgICovXG4gIEBJbnB1dCgpIHN0eWxlOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLCBwcml2YXRlIGVsOiBFbGVtZW50UmVmfgB7fVxuXG4gIC8qKlxuICAgKiBNZXRob2Qgw4LCtG5nT25Jbml0w4LCtCB0byBhcHBseSB0aGUgc3R5bGUgb2YgdGhpcyBkaXJlY3RpdmUuXG4gICAqIFRoaXMgaXMgYW4gQW5ndWxhcidzIGxpZmVjeWNsZSBob29rLCBzbyBpdHMgY2FsbGVkIGF1dG9tYXRpY2FsbHkgYnkgQW5ndWxhciBpdHNlbGYuXG4gICAqIEluIHBhcnRpY3VsYXIsIGl0J3MgY2FsbGVkIG9ubHkgb25lIHRpbWUhISFcbiAgICovXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuYXBwbHlTdHlsZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIE1ldGhvZCDDgsK0bmdPbkNoYW5nZXPDgsK0IHRvIGFwcGx5IHRoZSBzdHlsZSBvZiB0aGlzIGRpcmVjdGl2ZS5cbiAgICogVGhpcyBpcyBhbiBBbmd1bGFyJ3MgbGlmZWN5Y2xlIGhvb2ssIHNvIGl0cyBjYWxsZWQgYXV0b21hdGljYWxseSBieSBBbmd1bGFyIGl0c2VsZi5cbiAgICogSW4gcGFydGljdWxhciwgaXQncyBjYWxsZWQgd2hlbiBhbnkgZGF0YS1ib3VuZCBwcm9wZXJ0eSBvZiBhIGRpcmVjdGl2ZSBjaGFuZ2VzISEhXG4gICAqL1xuICBuZ09uQ2hhbmdlcygpIHtcbiAgICB0aGlzLmFwcGx5U3R5bGUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQcml2YXRlIG1ldGhvZCB0byBhZGQgYW4gaW1hZ2UgYXMgYmFja2dyb3VuZCBvZiBhbiBgPGE+YCB0YWcuXG4gICAqL1xuICBwcml2YXRlIGFwcGx5U3R5bGUofgB7XG4gICAgaWYgKCF0aGlzLmltYWdlIHx8ICghdGhpcy5pbWFnZS5wbGFpbiAmJiAhdGhpcy5pbWFnZS5tb2RhbCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBpbWdQYXRoOiBzdHJpbmcgfCBTYWZlUmVzb3VyY2VVcmwgPSB0aGlzLmltYWdlLnBsYWluICYmIHRoaXMuaW1hZ2UucGxhaW4uaW1nID8gdGhpcy5pbWFnZS5wbGFpbi5pbWcgOiB0aGlzLmltYWdlLm1vZGFsLmltZztcbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ2JhY2tncm91bmQnLCBgdXJsKFwiJHtpbWdQYXRofVwifgAke3RoaXMuc3R5bGV9YCk7XG4gIH1cbn1cbiIsIi8qXG4gVGhlIE1JVCBMaWNlbnNlIChNSVQpXG5cbiBDb3B5cmlnaHQgKGMpIDIwMTctMjAxOCBTdGVmYW5vIENhcHBhIChLczg5KVxuXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIifgIHRvIGRlYWxcbiBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4gdG8gdXNlLCBjb3B5LCBtb2RpZnfgIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG5cbiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBhbGxcbiBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT04gSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRVxuIFNPRlRXQVJFLlxuICovXG5cbmltcG9ydCB7IERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSW5wdXQsIE9uQ2hhbmdlcywgT25Jbml0LCBSZW5kZXJlcjIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERlc2NyaXB0aW9uIH0gZnJvbSAnLi4vbW9kZWwvZGVzY3JpcHRpb24uaW50ZXJmYWNlJztcblxuLyoqXG4gKiBEaXJlY3RpdmUgdG8gY3VzdG9taXplIHRoZSBkZXNjcmlwdGlvbi5cbiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2tzRGVzY3JpcHRpb25dJ1xufSlcbmV4cG9ydCBjbGFzcyBEZXNjcmlwdGlvbkRpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzIHtcbiAgLyoqXG4gICAqIE9iamVjdCBvZiB0eXBlIGBEZXNjcmlwdGlvbmAgdG8gcmVzaXplIHRoZSBlbGVtZW50LlxuICAgKi9cbiAgQElucHV0KCkgZGVzY3JpcHRpb246IERlc2NyaXB0aW9uO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMiwgcHJpdmF0ZSBlbDogRWxlbWVudFJlZikge31cblxuICAvKipcbiAgICogTWV0aG9kIMOCwrRuZ09uSW5pdMOCwrQgdG8gYXBwbHkgdGhlIHN0eWxlIG9mIHRoaXMgZGlyZWN0aXZlLlxuICAgKiBUaGlzIGlzIGFuIEFuZ3VsYXIncyBsaWZlY3ljbGUgaG9vaywgc28gaXRzIGNhbGxlZCBhdXRvbWF0aWNhbGx5IGJ5IEFuZ3VsYXIgaXRzZWxmLlxuICAgKiBJbiBwYXJ0aWN1bGFyLCBpdCdzIGNhbGxlZCBvbmx5IG9uZSB0aW1lISEhXG4gICAqL1xuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmFwcGx5U3R5bGUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBNZXRob2Qgw4LCtG5nT25DaGFuZ2Vzw4LCtCB0byBhcHBseSB0aGUgc3R5bGUgb2YgdGhpcyBkaXJlY3RpdmUuXG4gICAqIFRoaXMgaXMgYW4gQW5ndWxhcidzIGxpZmVjeWNsZSBob29rLCBzbyBpdHMgY2FsbGVkIGF1dG9tYXRpY2FsbHkgYnkgQW5ndWxhciBpdHNlbGYuXG4gICAqIEluIHBhcnRpY3VsYXIsIGl0J3MgY2FsbGVkIHdoZW4gYW55IGRhdGEtYm91bmQgcHJvcGVydHkgb2YgYSBkaXJlY3RpdmUgY2hhbmdlcyEhIVxuICAgKi9cbiAgbmdPbkNoYW5nZXMofgB7XG4gICAgdGhpcy5hcHBseVN0eWxlKCk7XG4gIH1cblxuICAvKipcbiAgICogUHJpdmF0ZSBtZXRob2QgdG8gY2hhbmdlIGRlc2NyaXB0aW9uJ3Mgc3R5bGUuXG4gICAqL1xuICBwcml2YXRlIGFwcGx5U3R5bGUofgB7XG4gICAgaWYgKCF0aGlzLmRlc2NyaXB0aW9ufgB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuZGVzY3JpcHRpb24uc3R5bGUpIHtcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbC5uYXRpdmVFbGVtZW50LCAnYmFja2dyb3VuZCcsIHRoaXMuZGVzY3JpcHRpb24uc3R5bGUuYmdDb2xvcik7XG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ2NvbG9yJywgdGhpcy5kZXNjcmlwdGlvbi5zdHlsZS50ZXh0Q29sb3IpO1xuXG4gICAgICBpZiAodGhpcy5kZXNjcmlwdGlvbi5zdHlsZS53aWR0aCkge1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ3dpZHRoJywgdGhpcy5kZXNjcmlwdGlvbi5zdHlsZS53aWR0aCk7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5kZXNjcmlwdGlvbi5zdHlsZS5oZWlnaHQpIHtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICdoZWlnaHQnLCB0aGlzLmRlc2NyaXB0aW9uLnN0eWxlLmhlaWdodCk7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5kZXNjcmlwdGlvbi5zdHlsZS5wb3NpdGlvbikge1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ3Bvc2l0aW9uJywgdGhpcy5kZXNjcmlwdGlvbi5zdHlsZS5wb3NpdGlvbik7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5kZXNjcmlwdGlvbi5zdHlsZS50b3ApIHtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICd0b3AnLCB0aGlzLmRlc2NyaXB0aW9uLnN0eWxlLnRvcCk7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5kZXNjcmlwdGlvbi5zdHlsZS5ib3R0b20pIHtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICdib3R0b20nLCB0aGlzLmRlc2NyaXB0aW9uLnN0eWxlLmJvdHRvbSk7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5kZXNjcmlwdGlvbi5zdHlsZS5sZWZ0fgB7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbC5uYXRpdmVFbGVtZW50LCAnbGVmdCcsIHRoaXMuZGVzY3JpcHRpb24uc3R5bGUubGVmdCk7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5kZXNjcmlwdGlvbi5zdHlsZS5yaWdodCkge1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ3JpZ2h0JywgdGhpcy5kZXNjcmlwdGlvbi5zdHlsZS5yaWdodCk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbC5uYXRpdmVFbGVtZW50LCAnbWFyZ2luLXRvcCcsIHRoaXMuZGVzY3JpcHRpb24uc3R5bGUubWFyZ2luVG9wID8gdGhpcy5kZXNjcmlwdGlvbi5zdHlsZS5tYXJnaW5Ub3AgOiAnMHB4Jyk7XG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ21hcmdpbi1ib3R0b20nLCB0aGlzLmRlc2NyaXB0aW9uLnN0eWxlLm1hcmdpbkJvdHRvbSA/IHRoaXMuZGVzY3JpcHRpb24uc3R5bGUubWFyZ2luQm90dG9tIDogJzBweCcpO1xuICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICdtYXJnaW4tbGVmdCcsIHRoaXMuZGVzY3JpcHRpb24uc3R5bGUubWFyZ2luTGVmdCA/IHRoaXMuZGVzY3JpcHRpb24uc3R5bGUubWFyZ2luTGVmdCA6ICcwcHgnKTtcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbC5uYXRpdmVFbGVtZW50LCAnbWFyZ2luLXJpZ2h0JywgdGhpcy5kZXNjcmlwdGlvbi5zdHlsZS5tYXJnaW5SaWdodCA/IHRoaXMuZGVzY3JpcHRpb24uc3R5bGUubWFyZ2luUmlnaHQgOiAnMHB4Jyk7XG4gICAgfVxuICB9XG59XG4iLCIvKlxuIFRoZSBNSVQgTGljZW5zZSAoTUlUKVxuXG4gQ29weXJpZ2h0IChjfgAyMDE3LTIwMTggU3RlZmFubyBDYXBwYSAoS3M4OSlcblxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbiBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuXG4gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsXG4gY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cblxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OIElORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEVcbiBTT0ZUV0FSRS5cbiAqL1xuXG5pbXBvcnQgeyBDbGlja091dHNpZGVEaXJlY3RpdmUgfSBmcm9tICcuL2NsaWNrLW91dHNpZGUuZGlyZWN0aXZlJztcbmltcG9ydCB7IFNpemVEaXJlY3RpdmUgfSBmcm9tICcuL3NpemUuZGlyZWN0aXZlJztcbmltcG9ydCB7IEtleWJvYXJkTmF2aWdhdGlvbkRpcmVjdGl2ZSB9IGZyb20gJy4va2V5Ym9hcmQtbmF2aWdhdGlvbi5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgV3JhcERpcmVjdGl2ZSB9IGZyb20gJy4vd3JhcC5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgRGlyZWN0aW9uRGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3Rpb24uZGlyZWN0aXZlJztcbmltcG9ydCB7IEFUYWdCZ0ltYWdlRGlyZWN0aXZlIH0gZnJvbSAnLi9hLXRhZy1iZy1pbWFnZS5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgRGVzY3JpcHRpb25EaXJlY3RpdmUgfSBmcm9tICcuL2Rlc2NyaXB0aW9uLmRpcmVjdGl2ZSc7XG5cbi8qKlxuICogQXJyYXkgb2YgYWxsIGRpcmVjdGl2ZXMuXG4gKi9cbmV4cG9ydCBjb25zdCBESVJFQ1RJVkVTID0gW1xuICBDbGlja091dHNpZGVEaXJlY3RpdmUsXG4gIFNpemVEaXJlY3RpdmUsXG4gIEtleWJvYXJkTmF2aWdhdGlvbkRpcmVjdGl2ZSxcbiAgV3JhcERpcmVjdGl2ZSxcbiAgRGlyZWN0aW9uRGlyZWN0aXZlLFxuICBBVGFnQmdJbWFnZURpcmVjdGl2ZSxcbiAgRGVzY3JpcHRpb25EaXJlY3RpdmVcbl07XG4iLCIvKlxuIFRoZSBNSVQgTGljZW5zZSAoTUlUKVxuXG4gQ29weXJpZ2h0IChjfgAyMDE3LTIwMTggU3RlZmFubyBDYXBwYSAoS3M4OSlcblxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbiBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuXG4gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsXG4gY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cblxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OIElORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEVcbiBTT0ZUV0FSRS5cbiAqL1xuXG5pbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBBY2Nlc3NpYmlsaXR5Q29uZmlnIH0gZnJvbSAnLi4vLi4vbW9kZWwvYWNjZXNzaWJpbGl0eS5pbnRlcmZhY2UnO1xuXG4vKipcbiAqIENvbXBvbmVudCB3aXRoIHRoZSBzZW1pLXRyYW5zcGFyZW50IGJhY2tncm91bmQuXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2tzLWJhY2tncm91bmQnLFxuICBzdHlsZVVybHM6IFsnYmFja2dyb3VuZC5zY3NzJ10sXG4gIHRlbXBsYXRlVXJsOiAnYmFja2dyb3VuZC5odG1sJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgQmFja2dyb3VuZENvbXBvbmVudCB7XG4gIC8qKlxuICAgKiBCb29sZWFuIHRoYXQgaXQgaXMgdHJ1ZSBpZiB0aGUgbW9kYWwgZ2FsbGVyeSBpcyB2aXNpYmxlLFxuICAgKiBzbyBhbHNvIHRoaXMgY29tcG9uZW50IHNob3VsZCBiZSB2aXNpYmxlLlxuICAgKi9cbiAgQElucHV0KCkgaXNPcGVuOiBib29sZWFuO1xuICAvKipcbiAgICogT2JqZWN0IG9mIHR5cGUgYEFjY2Vzc2liaWxpdHlDb25maWdgIHRvIGluaXQgY3VzdG9tIGFjY2Vzc2liaWxpdHkgZmVhdHVyZXMuXG4gICAqIEZvciBpbnN0YW5jZSwgaXQgY29udGFpbnMgdGl0bGVzLCBhbHQgdGV4dHMsIGFyaWEtbGFiZWxzIGFuZCBzbyBvbi5cbiAgICovXG4gIEBJbnB1dCgpIGFjY2Vzc2liaWxpdHlDb25maWc6IEFjY2Vzc2liaWxpdHlDb25maWc7XG59XG4iLCIvKlxuIFRoZSBNSVQgTGljZW5zZSAoTUlUKVxuXG4gQ29weXJpZ2h0IChjfgAyMDE3LTIwMTggU3RlZmFubyBDYXBwYSAoS3M4OSlcblxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbiBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuXG4gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsXG4gY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cblxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OIElORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEVcbiBTT0ZUV0FSRS5cbiAqL1xuXG5pbXBvcnQgeyBBY3Rpb24gfSBmcm9tICcuL2FjdGlvbi5lbnVtJztcbmltcG9ydCB7IFNpemUgfSBmcm9tICcuL3NpemUuaW50ZXJmYWNlJztcbmltcG9ydCB7IFNhZmVSZXNvdXJjZVVybCB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuXG4vKipcbiAqIENsYXNzIGBJbWFnZWAgdGhhdCByZXByZXNlbnRzIGFuIGltYWdlIHdpdGggYm90aCBgbW9kYWxgIGFuZCBgcGxhaW5gIGNvbmZpZ3VyYXRpb25zLlxuICogQm90aCBpbWFnZSBgaWRgIGFuZCBgbW9kYWxgIGFyZSBtYW5kYXRvcnfgIGluc3RlYWQgYHBsYWluYCBpcyBvcHRpb25hbC5cbiAqL1xuZXhwb3J0IGNsYXNzIEltYWdlIHtcbiAgaWQ6IG51bWJlcjtcblxuICBtb2RhbDogTW9kYWxJbWFnZTtcbiAgcGxhaW4/OiBQbGFpbkltYWdlO1xuXG4gIGNvbnN0cnVjdG9yKGlkOiBudW1iZXIsIG1vZGFsOiBNb2RhbEltYWdlLCBwbGFpbj86IFBsYWluSW1hZ2UpIHtcbiAgICB0aGlzLmlkID0gaWQ7XG4gICAgdGhpcy5tb2RhbCA9IG1vZGFsO1xuICAgIHRoaXMucGxhaW4gPSBwbGFpbjtcbiAgfVxufVxuXG4vKipcbiAqIEludGVyZmFjZSBgSW1hZ2VEYXRhYCB0byBjb25maWd1cmUgYW4gaW1hZ2UsIGJ1dCBpdCBpc24ndCB1c2VkIGRpcmVjdGx5LlxuICogUGxlYXNlLCByZWZlcnMgdG8gYFBsYWluSW1hZ2VgIG9yIGBNb2RhbEltYWdlYC5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBJbWFnZURhdGEge1xuICBpbWc6IHN0cmluZyB8IFNhZmVSZXNvdXJjZVVybDtcbiAgZGVzY3JpcHRpb24/OiBzdHJpbmc7XG4gIHRpdGxlPzogc3RyaW5nO1xuICBhbHQ/OiBzdHJpbmc7XG4gIGFyaWFMYWJlbD86IHN0cmluZztcbn1cblxuLyoqXG4gKiBJbnRlcmZhY2UgYE1vZGFsSW1hZ2VgIHRvIGNvbmZpZ3VyZSB0aGUgbW9kYWwgaW1hZ2UuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgTW9kYWxJbWFnZSBleHRlbmRzIEltYWdlRGF0YSB7XG4gIGV4dFVybD86IHN0cmluZztcbiAgZG93bmxvYWRGaWxlTmFtZT86IHN0cmluZztcbn1cblxuLyoqXG4gKiBJbnRlcmZhY2UgYFBsYWluSW1hZ2VgIHRvIGNvbmZpZ3VyZSB0aGUgcGxhaW4gaW1hZ2UuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgUGxhaW5JbWFnZSBleHRlbmRzIEltYWdlRGF0YSB7XG4gIHNpemU/OiBTaXplO1xufVxuXG4vKipcbiAqIENsYXNzIGBJbWFnZU1vZGFsRXZlbnRgIHRoYXQgcmVwcmVzZW50cyB0aGUgZXZlbnQgcGF5bG9hZCB3aXRoIHRoZSByZXN1bHQgYW5kIHRoZSB0cmlnZ2VyZWQgYWN0aW9uLlxuICovXG5leHBvcnQgY2xhc3MgSW1hZ2VNb2RhbEV2ZW50IHtcbiAgYWN0aW9uOiBBY3Rpb247XG4gIHJlc3VsdDogbnVtYmVyIHwgYm9vbGVhbjtcblxuICBjb25zdHJ1Y3RvcihhY3Rpb246IEFjdGlvbiwgcmVzdWx0OiBudW1iZXIgfCBib29sZWFufgB7XG4gICAgdGhpcy5hY3Rpb24gPSBhY3Rpb247XG4gICAgdGhpcy5yZXN1bHQgPSByZXN1bHQ7XG4gIH1cbn1cbiIsIi8qXG4gVGhlIE1JVCBMaWNlbnNlIChNSVQpXG5cbiBDb3B5cmlnaHQgKGMpIDIwMTctMjAxOCBTdGVmYW5vIENhcHBhIChLczg5KVxuXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIifgIHRvIGRlYWxcbiBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4gdG8gdXNlLCBjb3B5LCBtb2RpZnfgIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG5cbiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBhbGxcbiBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT04gSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRVxuIFNPRlRXQVJFLlxuICovXG5cbi8qKlxuICogRW51bSBgQWN0aW9uYCB3aXRoIGEgbGlzdCBvZiBwb3NzaWJsZSBhY3Rpb25zLCBiYXNlZCBvbiB0aGUgc291cmNlIG9mIHRoZSBhY3Rpb24uXG4gKi9cbmV4cG9ydCBlbnVtIEFjdGlvbiB7XG4gIE5PUk1BTCwgLy8gZGVmYXVsdCB2YWx1ZVxuICBDTElDSywgLy8gbW91c2UgY2xpY2tcbiAgS0VZQk9BUkQsXG4gIFNXSVBFLFxuICBMT0FEXG59XG4iLCIvKlxuIFRoZSBNSVQgTGljZW5zZSAoTUlUKVxuXG4gQ29weXJpZ2h0IChjfgAyMDE3LTIwMTggU3RlZmFubyBDYXBwYSAoS3M4OSlcblxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbiBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuXG4gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsXG4gY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cblxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OIElORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEVcbiBTT0ZUV0FSRS5cbiAqL1xuXG5pbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUsIEluamVjdGlvblRva2VuIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IEtleWJvYXJkU2VydmljZUNvbmZpZyB9IGZyb20gJy4uL21vZGVsL2tleWJvYXJkLXNlcnZpY2UtY29uZmlnLmludGVyZmFjZSc7XG5cbmV4cG9ydCBjb25zdCBLRVlCT0FSRF9DT05GSUdVUkFUSU9OID0gbmV3IEluamVjdGlvblRva2VuPEtleWJvYXJkU2VydmljZUNvbmZpZz4oJ0tFWUJPQVJEX0NPTkZJR1VSQVRJT04nKTtcblxuLyoqXG4gKiBTZXJ2aWNlIHRvIGludGVyY2VwdCBjdHJsK3MgKG9yIGNtZCtzIG9uIG1hY09TfgB1c2luZyBhIHRoaXJkLXBhcnR5IGxpYnJhcnfgIGNhbGxlZCBNb3VzZXRyYXAuXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBLZXlib2FyZFNlcnZpY2Uge1xuICAvKipcbiAgICogUHJpdmF0ZSBNb3VzZXRyYXAgdmFyaWFibGUgdG8gc3RvcmUgdGhlIGluc3RhbmNlLlxuICAgKi9cbiAgcHJpdmF0ZSBtb3VzZXRyYXA6IE1vdXNldHJhcEluc3RhbmNlO1xuICAvKipcbiAgICogUHJpdmF0ZSB2YXJpYWJsZSB0byBzdG9yZSBzaG9ydGN1dHMgYXMgZWl0aGVyIEFycmF5IG9yIHN0cmluZy5cbiAgICovXG4gIHByaXZhdGUgc2hvcnRjdXRzOiBBcnJheTxzdHJpbmc+IHwgc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBDb25zdHJ1Y3RvciBvZiBgS2V5Ym9hcmRTZXJ2aWNlYCB0byBpbml0IGBtb3VzZXRyYXBgIGFuZCBgc2hvcnRjdXRzYCBwcml2YXRlIHZhcmlhYmxlcy5cbiAgICogQHBhcmFtIEtleWJvYXJkU2VydmljZUNvbmZpZyBjb25maWcgb2JqZWN0IHJlY2VpdmVkIGJ5IHRoZSBgZm9yUm9vdCgpYCBmdW5jdGlvbiB0byBpbml0IGN1c3RvbSBzaG9ydGN1dHNcbiAgICovXG4gIGNvbnN0cnVjdG9yKEBJbmplY3QoS0VZQk9BUkRfQ09ORklHVVJBVElPTikgcHJpdmF0ZSBjb25maWc6IEtleWJvYXJkU2VydmljZUNvbmZpZykge1xuICAgIC8vIHRoaXMuY29uZmlnIGlzIGFsd2F5cyBkZWZpbmVkLCBiZWNhdXNlIGZvcmNlZCBieSBmb3JSb290IGluc2lkZSB0aGUgbW9kdWxlXG4gICAgLy8gd2hlbiBlbXB0eSwgaXQncyBzaW1wbHkgYW4gZW1wdHkgb2JqZWN0OiB7fVxuXG4gICAgdGhpcy5zaG9ydGN1dHMgPSB0aGlzLmNvbmZpZyAmJiB0aGlzLmNvbmZpZy5zaG9ydGN1dHMgPyB0aGlzLmNvbmZpZy5zaG9ydGN1dHMgOiBbJ2N0cmwrcycsICdtZXRhK3MnXTtcblxuICAgIC8vIHRlbXBvcmFyeSB3b3JrYXJvdW5kIHRvIGZpeCB0aGlzIGlzc3VlOiBodHRwczovL2dpdGh1Yi5jb20vS3M4OS9hbmd1bGFyLW1vZGFsLWdhbGxlcnkvaXNzdWVzLzE0MlxuICAgIGlmICh0aGlzLmNvbmZpZyAmJiAhdGhpcy5jb25maWcuZGlzYWJsZVNzcldvcmthcm91bmQpIHtcbiAgICAgIC8vIFRvIHByZXZlbnQgaXNzdWVzIHdpdGggYW5ndWxhci11bml2ZXJzYWwgb24gc2VydmVyLXNpZGVcbiAgICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICB0aGlzLm1vdXNldHJhcCA9IG5ldyAoPGFueT5Nb3VzZXRyYXApKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIE1ldGhvZCB0byBhZGQgYSBsaXN0ZXIgZm9yIGN0cmwrcy9jbWQrcyBrZXlib2FyZCBldmVudHMuXG4gICAqIEBwYXJhbSAoZTogRXh0ZW5kZWRLZXlib2FyZEV2ZW50LCBjb21ibzogc3RyaW5nfgA9PiBhbnkgb25CaW5kIGNhbGxiYWNrIGZ1bmN0aW9uIHRvIGFkZCBzaG9ydGN1dHNcbiAgICovXG4gIGFkZChvbkJpbmQ6IChlOiBFeHRlbmRlZEtleWJvYXJkRXZlbnQsIGNvbWJvOiBzdHJpbmcpID0+IGFueSkge1xuICAgIC8vIHRlbXBvcmFyeSB3b3JrYXJvdW5kIHRvIGZpeCB0aGlzIGlzc3VlOiBodHRwczovL2dpdGh1Yi5jb20vS3M4OS9hbmd1bGFyLW1vZGFsLWdhbGxlcnkvaXNzdWVzLzE0MlxuICAgIGlmICh0aGlzLmNvbmZpZyAmJiAhdGhpcy5jb25maWcuZGlzYWJsZVNzcldvcmthcm91bmQpIHtcbiAgICAgIC8vIFRvIHByZXZlbnQgaXNzdWVzIHdpdGggYW5ndWxhci11bml2ZXJzYWwgb24gc2VydmVyLXNpZGVcbiAgICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICB0aGlzLm1vdXNldHJhcC5iaW5kKHRoaXMuc2hvcnRjdXRzLCAoZXZlbnQ6IEtleWJvYXJkRXZlbnQsIGNvbWJvOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICBpZiAoZXZlbnQucHJldmVudERlZmF1bHQpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIGludGVybmV0IGV4cGxvcmVyXG4gICAgICAgICAgICBldmVudC5yZXR1cm5WYWx1ZSA9IGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgICBvbkJpbmQoZXZlbnQsIGNvbWJvKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIE1ldGhvZCB0byByZXNldCBhbGwgbGlzdGVuZXJzLiBQbGVhc2UsIGNhbGwgdGhpcyBmdW5jdGlvbiB3aGVuIG5lZWRlZFxuICAgKiB0byBmcmVlIHJlc291cmNlcyBhZCBwcmV2ZW50IGxlYWtzLlxuICAgKi9cbiAgcmVzZXQofgB7XG4gICAgLy8gdGVtcG9yYXJ5IHdvcmthcm91bmQgdG8gZml4IHRoaXMgaXNzdWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9Lczg5L2FuZ3VsYXItbW9kYWwtZ2FsbGVyeS9pc3N1ZXMvMTQyXG4gICAgaWYgKHRoaXMuY29uZmlnICYmICF0aGlzLmNvbmZpZy5kaXNhYmxlU3NyV29ya2Fyb3VuZCkge1xuICAgICAgLy8gVG8gcHJldmVudCBpc3N1ZXMgd2l0aCBhbmd1bGFyLXVuaXZlcnNhbCBvbiBzZXJ2ZXItc2lkZVxuICAgICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnfgB7XG4gICAgICAgIHRoaXMubW91c2V0cmFwLnJlc2V0KCk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iLCIvKlxuIFRoZSBNSVQgTGljZW5zZSAoTUlUKVxuXG4gQ29weXJpZ2h0IChjfgAyMDE3LTIwMTggU3RlZmFubyBDYXBwYSAoS3M4OSlcblxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbiBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuXG4gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsXG4gY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cblxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OIElORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEVcbiBTT0ZUV0FSRS5cbiAqL1xuXG5pbXBvcnQgeyBFdmVudEVtaXR0ZXIsIEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEltYWdlIH0gZnJvbSAnLi4vbW9kZWwvaW1hZ2UuY2xhc3MnO1xuXG5leHBvcnQgaW50ZXJmYWNlIEludGVybmFsR2FsbGVyeVBheWxvYWQge1xuICBnYWxsZXJ5SWQ6IG51bWJlcjtcbiAgaW5kZXg6IG51bWJlcjtcbiAgaW1hZ2U/OiBJbWFnZTtcbn1cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEdhbGxlcnlTZXJ2aWNlIHtcbiAgbmF2aWdhdGU6IEV2ZW50RW1pdHRlcjxJbnRlcm5hbEdhbGxlcnlQYXlsb2FkPiA9IG5ldyBFdmVudEVtaXR0ZXI8SW50ZXJuYWxHYWxsZXJ5UGF5bG9hZD4oKTtcbiAgY2xvc2U6IEV2ZW50RW1pdHRlcjxudW1iZXI+ID0gbmV3IEV2ZW50RW1pdHRlcjxudW1iZXI+KCk7XG4gIHVwZGF0ZTogRXZlbnRFbWl0dGVyPEludGVybmFsR2FsbGVyeVBheWxvYWQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxJbnRlcm5hbEdhbGxlcnlQYXlsb2FkPigpO1xuXG4gIG9wZW5HYWxsZXJ5KGdhbGxlcnlJZDogbnVtYmVyIHwgdW5kZWZpbmVkLCBpbmRleDogbnVtYmVyKTogdm9pZCB7XG4gICAgaWYgKGdhbGxlcnlJZCA9PT0gdW5kZWZpbmVkIHx8IGdhbGxlcnlJZCA8IDAgfHwgaW5kZXggPCAwfgB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Nhbm5vdCBvcGVuIGdhbGxlcnkgdmlhIEdhbGxlcnlTZXJ2aWNlIHdpdGggZWl0aGVyIGluZGV4PDAgb3IgZ2FsbGVyeUlkPDAgb3IgZ2FsbGVyeUlkPT09dW5kZWZpbmVkJyk7XG4gICAgfVxuICAgIHRoaXMubmF2aWdhdGUuZW1pdCh7XG4gICAgICBnYWxsZXJ5SWQ6IGdhbGxlcnlJZCxcbiAgICAgIGluZGV4OiBpbmRleFxuICAgIH0pO1xuICB9XG5cbiAgY2xvc2VHYWxsZXJ5KGdhbGxlcnlJZDogbnVtYmVyIHwgdW5kZWZpbmVkKTogdm9pZCB7XG4gICAgaWYgKGdhbGxlcnlJZCA9PT0gdW5kZWZpbmVkIHx8IGdhbGxlcnlJZCA8IDApIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignQ2Fubm90IGNsb3NlIGdhbGxlcnkgdmlhIEdhbGxlcnlTZXJ2aWNlIHdpdGggZ2FsbGVyeUlkPDAgb3IgZ2FsbGVyeUlkPT09dW5kZWZpbmVkJyk7XG4gICAgfVxuICAgIHRoaXMuY2xvc2UuZW1pdChnYWxsZXJ5SWQpO1xuICB9XG5cbiAgdXBkYXRlR2FsbGVyeShnYWxsZXJ5SWQ6IG51bWJlciB8IHVuZGVmaW5lZCwgaW5kZXg6IG51bWJlciwgaW1hZ2U6IEltYWdlKTogdm9pZCB7XG4gICAgaWYgKGdhbGxlcnlJZCA9PT0gdW5kZWZpbmVkIHx8IGdhbGxlcnlJZCA8IDAgfHwgaW5kZXggPCAwfgB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Nhbm5vdCB1cGRhdGUgZ2FsbGVyeSB2aWEgR2FsbGVyeVNlcnZpY2Ugd2l0aCBlaXRoZXIgaW5kZXg8MCBvciBnYWxsZXJ5SWQ8MCBvciBnYWxsZXJ5SWQ9PT11bmRlZmluZWQnKTtcbiAgICB9XG4gICAgaWYgKCFpbWFnZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdDYW5ub3QgdXBkYXRlIGdhbGxlcnkgdmlhIEdhbGxlcnlTZXJ2aWNlLCBiZWNhdXNlIGltYWdlIGlzIG5vdCB2YWxpZCcpO1xuICAgIH1cbiAgICB0aGlzLnVwZGF0ZS5lbWl0KHtcbiAgICAgIGdhbGxlcnlJZDogZ2FsbGVyeUlkLFxuICAgICAgaW5kZXg6IGluZGV4LFxuICAgICAgaW1hZ2U6IGltYWdlXG4gICAgfSk7XG4gIH1cbn1cbiIsIi8qISAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5Db3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlXHJcbnRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlXHJcbkxpY2Vuc2UgYXQgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcblxyXG5USElTIENPREUgSVMgUFJPVklERUQgT04gQU4gKkFTIElTKiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZXHJcbktJTkQsIEVJVEhFUiBFWFBSRVNTIE9SIElNUExJRUQsIElOQ0xVRElORyBXSVRIT1VUIExJTUlUQVRJT04gQU5ZIElNUExJRURcclxuV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIFRJVExFLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSxcclxuTUVSQ0hBTlRBQkxJVFkgT1IgTk9OLUlORlJJTkdFTUVOVC5cclxuXHJcblNlZSB0aGUgQXBhY2hlIFZlcnNpb24gMi4wIExpY2Vuc2UgZm9yIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9uc1xyXG5hbmQgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXHJcbi8qIGdsb2JhbCBSZWZsZWN0LCBQcm9taXNlICovXHJcblxyXG52YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBifgBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwfgkgZFtwXSA9IGJbcF07IH07XHJcbiAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4dGVuZHMoZCwgYikge1xyXG4gICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShifgA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG59XHJcblxyXG5leHBvcnQgdmFyIF9fYXNzaWduID0gZnVuY3Rpb24ofgB7XHJcbiAgICBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gX19hc3NpZ24odCkge1xyXG4gICAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpIHRbcF0gPSBzW3BdO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdDtcclxuICAgIH1cclxuICAgIHJldHVybiBfX2Fzc2lnbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZXN0KHMsIGUpIHtcclxuICAgIHZhciB0ID0ge307XHJcbiAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkgJiYgZS5pbmRleE9mKHApIDwgMClcclxuICAgICAgICB0W3BdID0gc1twXTtcclxuICAgIGlmIChzICE9IG51bGwgJiYgdHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPT09IFwiZnVuY3Rpb25cIilcclxuICAgICAgICBmb3IgKHZhciBpID0gMCwgcCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMocyk7IGkgPCBwLmxlbmd0aDsgaSsrfgBpZiAoZS5pbmRleE9mKHBbaV0pIDwgMClcclxuICAgICAgICAgICAgdFtwW2ldXSA9IHNbcFtpXV07XHJcbiAgICByZXR1cm4gdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXfgIGRlc2MpIHtcclxuICAgIHZhciBjID0gYXJndW1lbnRzLmxlbmd0aCwgciA9IGMgPCAzID8gdGFyZ2V0IDogZGVzYyA9PT0gbnVsbCA/IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5fgA6IGRlc2MsIGQ7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QuZGVjb3JhdGUgPT09IFwiZnVuY3Rpb25cIikgciA9IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXfgIGRlc2MpO1xyXG4gICAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldfgByID0gKGMgPCAzID8gZChyfgA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5fgkgfHwgcjtcclxuICAgIHJldHVybiBjID4gMyAmJiByICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgcifgIHI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3BhcmFtKHBhcmFtSW5kZXgsIGRlY29yYXRvcikge1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQsIGtleSkgeyBkZWNvcmF0b3IodGFyZ2V0LCBrZXfgIHBhcmFtSW5kZXgpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlfgB7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QubWV0YWRhdGEgPT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIFJlZmxlY3QubWV0YWRhdGEobWV0YWRhdGFLZXfgIG1ldGFkYXRhVmFsdWUpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdGVyKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpfghmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0fgB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlfgB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlfgB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0fgB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZShyZXN1bHQudmFsdWUpOyB9fg50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pfg5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2dlbmVyYXRvcih0aGlzQXJnLCBib2R5fgB7XHJcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xyXG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCfgIFwidGhyb3dcIjogdmVyYigxfgwgXCJyZXR1cm5cIjogdmVyYigyfgB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSfgIGc7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2fgB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcclxuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XHJcbiAgICAgICAgd2hpbGUgKF8pIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdfgAmJiB0LmNhbGwoeSfgIDApIDogeS5uZXh0fgAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pfg5kb25lfgByZXR1cm4gdDtcclxuICAgICAgICAgICAgaWYgKHkgPSAwLCB0fgBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdfgB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XHJcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdfgAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpfgB7IF8gPSAwOyBjb250aW51ZTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pfgkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdfgB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdfgBfLm9wcy5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cclxuICAgICAgICBpZiAob3BbMF0gJiA1fgB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXhwb3J0U3RhcihtLCBleHBvcnRzfgB7XHJcbiAgICBmb3IgKHZhciBwIGluIG0pIGlmICghZXhwb3J0cy5oYXNPd25Qcm9wZXJ0eShwfgkgZXhwb3J0c1twXSA9IG1bcF07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3ZhbHVlcyhvfgB7XHJcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl0sIGkgPSAwO1xyXG4gICAgaWYgKG0pIHJldHVybiBtLmNhbGwobyk7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIG5leHQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKG8gJiYgaSA+PSBvLmxlbmd0aCkgbyA9IHZvaWQgMDtcclxuICAgICAgICAgICAgcmV0dXJuIHsgdmFsdWU6IG8gJiYgb1tpKytdLCBkb25lOiAhbyB9O1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3JlYWQobywgbikge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdO1xyXG4gICAgaWYgKCFtfgByZXR1cm4gbztcclxuICAgIHZhciBpID0gbS5jYWxsKG8pLCByLCBhciA9IFtdLCBlO1xyXG4gICAgdHJ5IHtcclxuICAgICAgICB3aGlsZSAoKG4gPT09IHZvaWQgMCB8fCBuLS0gPiAwfgAmJiAhKHIgPSBpLm5leHQofgkuZG9uZSkgYXIucHVzaChyLnZhbHVlKTtcclxuICAgIH1cclxuICAgIGNhdGNoIChlcnJvcikgeyBlID0geyBlcnJvcjogZXJyb3IgfTsgfVxyXG4gICAgZmluYWxseSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKHIgJiYgIXIuZG9uZSAmJiAobSA9IGlbXCJyZXR1cm5cIl0pfgBtLmNhbGwoaSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZpbmFsbHkgeyBpZiAoZSkgdGhyb3cgZS5lcnJvcjsgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWQofgB7XHJcbiAgICBmb3IgKHZhciBhciA9IFtdLCBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKylcclxuICAgICAgICBhciA9IGFyLmNvbmNhdChfX3JlYWQoYXJndW1lbnRzW2ldfgk7XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0KHYpIHtcclxuICAgIHJldHVybiB0aGlzIGluc3RhbmNlb2YgX19hd2FpdCA/ICh0aGlzLnYgPSB2LCB0aGlzfgA6IG5ldyBfX2F3YWl0KHYpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0dlbmVyYXRvcih0aGlzQXJnLCBfYXJndW1lbnRzLCBnZW5lcmF0b3IpIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgZyA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdfgwgaSwgcSA9IFtdO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIifgIHZlcmIoXCJ0aHJvd1wifgwgdmVyYihcInJldHVyblwifgwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAofgB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihufgB7IGlmIChnW25dfgBpW25dID0gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChhLCBifgB7IHEucHVzaChbbiwgdiwgYSwgYl0pID4gMSB8fCByZXN1bWUobiwgdik7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiByZXN1bWUobiwgdikgeyB0cnkgeyBzdGVwKGdbbl0odikpOyB9IGNhdGNoIChlfgB7IHNldHRsZShxWzBdWzNdLCBlKTsgfSB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKHIpIHsgci52YWx1ZSBpbnN0YW5jZW9mIF9fYXdhaXQgPyBQcm9taXNlLnJlc29sdmUoci52YWx1ZS52fg50aGVuKGZ1bGZpbGwsIHJlamVjdCkgOiBzZXR0bGUocVswXVsyXSwgcik7IH1cclxuICAgIGZ1bmN0aW9uIGZ1bGZpbGwodmFsdWUpIHsgcmVzdW1lKFwibmV4dFwiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHJlamVjdCh2YWx1ZSkgeyByZXN1bWUoXCJ0aHJvd1wiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShmLCB2fgB7IGlmIChmKHYpLCBxLnNoaWZ0KCfgIHEubGVuZ3RofgByZXN1bWUocVswXVswXSwgcVswXVsxXSk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNEZWxlZ2F0b3Iobykge1xyXG4gICAgdmFyIGfgIHA7XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwifgwgdmVyYihcInRocm93XCIsIGZ1bmN0aW9uIChlfgB7IHRocm93IGU7IH0pLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbiAofgB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuLCBmfgB7IGlbbl0gPSBvW25dID8gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIChwID0gIXApID8geyB2YWx1ZTogX19hd2FpdChvW25dKHYpfgwgZG9uZTogbiA9PT0gXCJyZXR1cm5cIiB9IDogZiA/IGYodikgOiB2OyB9IDogZjsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY1ZhbHVlcyhvfgB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yfgB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIG0gPSBvW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSwgaTtcclxuICAgIHJldHVybiBtID8gbS5jYWxsKG8pIDogKG8gPSB0eXBlb2YgX192YWx1ZXMgPT09IFwiZnVuY3Rpb25cIiA/IF9fdmFsdWVzKG8pIDogb1tTeW1ib2wuaXRlcmF0b3JdKCfgIGkgPSB7fSwgdmVyYihcIm5leHRcIifgIHZlcmIoXCJ0aHJvd1wifgwgdmVyYihcInJldHVyblwifgwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAofgB7IHJldHVybiB0aGlzOyB9LCBpKTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpW25dID0gb1tuXSAmJiBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkgeyB2ID0gb1tuXSh2fgwgc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgdi5kb25lLCB2LnZhbHVlKTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShyZXNvbHZlLCByZWplY3QsIGQsIHYpIHsgUHJvbWlzZS5yZXNvbHZlKHYpLnRoZW4oZnVuY3Rpb24odikgeyByZXNvbHZlKHsgdmFsdWU6IHYsIGRvbmU6IGQgfSk7IH0sIHJlamVjdCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWFrZVRlbXBsYXRlT2JqZWN0KGNvb2tlZCwgcmF3fgB7XHJcbiAgICBpZiAoT2JqZWN0LmRlZmluZVByb3BlcnR5fgB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb29rZWQsIFwicmF3XCIsIHsgdmFsdWU6IHJhdyB9KTsgfSBlbHNlIHsgY29va2VkLnJhdyA9IHJhdzsgfVxyXG4gICAgcmV0dXJuIGNvb2tlZDtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydFN0YXIobW9kfgB7XHJcbiAgICBpZiAobW9kICYmIG1vZC5fX2VzTW9kdWxlfgByZXR1cm4gbW9kO1xyXG4gICAgdmFyIHJlc3VsdCA9IHt9O1xyXG4gICAgaWYgKG1vZCAhPSBudWxsfgBmb3IgKHZhciBrIGluIG1vZCkgaWYgKE9iamVjdC5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vZCwgaykpIHJlc3VsdFtrXSA9IG1vZFtrXTtcclxuICAgIHJlc3VsdC5kZWZhdWx0ID0gbW9kO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0RGVmYXVsdChtb2QpIHtcclxuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlfgA/IG1vZCA6IHsgZGVmYXVsdDogbW9kIH07XHJcbn1cclxuIiwiLypcbiBUaGUgTUlUIExpY2Vuc2UgKE1JVClcblxuIENvcHlyaWdodCAoYykgMjAxNy0yMDE4IFN0ZWZhbm8gQ2FwcGEgKEtzODkpXG5cbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwifgwgdG8gZGVhbFxuIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbiB0byB1c2UsIGNvcHfgIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcblxuIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIGFsbFxuIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG5cbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFfgXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTiBJTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiBMSUFCSUxJVFfgIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFXG4gU09GVFdBUkUuXG4gKi9cblxuLyoqXG4gKiBLZXljb2RlIG9mIHRoZSBrZXlib2FyZCdzIGtleSBgc3BhY2VgXG4gKi9cbmV4cG9ydCBjb25zdCBTUEFDRV9LRVkgPSAzMjtcbi8qKlxuICogS2V5Y29kZSBvZiB0aGUga2V5Ym9hcmQncyBrZXkgYGVudGVyYFxuICovXG5leHBvcnQgY29uc3QgRU5URVJfS0VZID0gMTM7XG4vKipcbiAqIEtleWNvZGUgb2YgdGhlIG1haW4gbW91c2UgYnV0dG9uXG4gKi9cbmV4cG9ydCBjb25zdCBNT1VTRV9NQUlOX0JVVFRPTl9DTElDSyA9IDA7XG5cbi8qKlxuICogQ29uc3QgTkVYVFxuICovXG5leHBvcnQgY29uc3QgTkVYVCA9IDE7XG4vKipcbiAqIENvbnN0IFBSRVZcbiAqL1xuZXhwb3J0IGNvbnN0IFBSRVYgPSAtMTtcbi8qKlxuICogQ29uc3QgTk9USElORyB0byByZXByZXNlbnRzIGEgc2l0dWF0aW9uIHdoZW4gaXQgaXNuJ3QgYm90aCBORVhUIGFuZCBQUkVWXG4gKi9cbmV4cG9ydCBjb25zdCBOT1RISU5HID0gMDtcblxuLyoqXG4gKiBDb25zdCB0byByZXByZXNlbnQgdGhlIHJpZ2h0IGRpcmVjdGlvblxuICovXG5leHBvcnQgY29uc3QgRElSRUNUSU9OX1JJR0hUID0gJ3JpZ2h0Jztcbi8qKlxuICogQ29uc3QgdG8gcmVwcmVzZW50IHRoZSBsZWZ0IGRpcmVjdGlvblxuICovXG5leHBvcnQgY29uc3QgRElSRUNUSU9OX0xFRlQgPSAnbGVmdCc7XG4iLCIvKlxuIFRoZSBNSVQgTGljZW5zZSAoTUlUKVxuXG4gQ29weXJpZ2h0IChjfgAyMDE3LTIwMTggU3RlZmFubyBDYXBwYSAoS3M4OSlcblxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbiBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuXG4gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsXG4gY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cblxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OIElORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEVcbiBTT0ZUV0FSRS5cbiAqL1xuXG5pbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IERJUkVDVElPTl9SSUdIVCwgRU5URVJfS0VZLCBNT1VTRV9NQUlOX0JVVFRPTl9DTElDSywgTkVYVCwgTk9USElORywgUFJFViwgU1BBQ0VfS0VZIH0gZnJvbSAnLi4vdXRpbHMvdXNlci1pbnB1dC51dGlsJztcblxuLyoqXG4gKiBQcm92aWRlcyBzb21lIHVzZWZ1bCBtZXRob2RzIHRvIGFkZCBhY2Nlc3NpYmlsaXR5IGZlYXR1cmVzIHRvIHN1YmNsYXNzZXMuXG4gKiBJbiBwYXJ0aWN1bGFyLCBpdCBleHBvc2VzIGEgbWV0aG9kIHRvIGhhbmRsZSBuYXZpZ2F0aW9uIGV2ZW50IHdpdGggYm90aCBLZXlib2FyZCBhbmQgTW91c2VcbiAqIGFuZCBhbm90aGVyIHdpdGggYWxzbyB0aGUgZGlyZWN0aW9uIChyaWdodCBvciBsZWZ0fg5cbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAna3MtYWNjZXNzaWJsZScsXG4gIHRlbXBsYXRlOiBgYCxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgQWNjZXNzaWJsZUNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKCkge31cblxuICAvKipcbiAgICogTWV0aG9kIHRvIGhhbmRsZSBuYXZpZ2F0aW9uIGV2ZW50cyB3aXRoIGJvdGggS2V5Ym9hcmQgYW5kIE1vdXNlLlxuICAgKiBAcGFyYW0gc3RyaW5nIGRpcmVjdGlvbiBvZiB0aGUgbmF2aWdhdGlvbiB0aGF0IGNhbiBiZSBlaXRoZXIgJ25leHQnIG9yICdwcmV2J1xuICAgKiBAcGFyYW0gS2V5Ym9hcmRFdmVudCB8IE1vdXNlRXZlbnQgZXZlbnQgcGF5bG9hZFxuICAgKiBAcmV0dXJucyBudW1iZXIgLTEgZm9yIFBSRVYsIDEgZm9yIE5FWFQgYW5kIDAgZm9yIE5PVEhJTkdcbiAgICovXG4gIGhhbmRsZU5hdmlnYXRpb25FdmVudChkaXJlY3Rpb246IHN0cmluZywgZXZlbnQ6IEtleWJvYXJkRXZlbnQgfCBNb3VzZUV2ZW50KTogbnVtYmVyIHtcbiAgICBpZiAoIWV2ZW50fgB7XG4gICAgICByZXR1cm4gTk9USElORztcbiAgICB9XG4gICAgaWYgKGV2ZW50IGluc3RhbmNlb2YgS2V5Ym9hcmRFdmVudCkge1xuICAgICAgcmV0dXJuIHRoaXMuaGFuZGxlS2V5Ym9hcmROYXZpZ2F0aW9uRXZlbnQoZGlyZWN0aW9uLCBldmVudCk7XG4gICAgfSBlbHNlIGlmIChldmVudCBpbnN0YW5jZW9mIE1vdXNlRXZlbnQpIHtcbiAgICAgIHJldHVybiB0aGlzLmhhbmRsZU1vdXNlTmF2aWdhdGlvbkV2ZW50KGRpcmVjdGlvbiwgZXZlbnQpO1xuICAgIH1cbiAgICByZXR1cm4gTk9USElORztcbiAgfVxuXG4gIC8qKlxuICAgKiBNZXRob2QgdG8gaGFuZGxlIGV2ZW50cyBvdmVyIGFuIGltYWdlLCBmb3IgaW5zdGFuY2UgYSBrZXlwcmVzcyB3aXRoIHRoZSBLZXlib2FyZCBvciBhIE1vdXNlIGNsaWNrLlxuICAgKiBAcGFyYW0gS2V5Ym9hcmRFdmVudCB8IE1vdXNlRXZlbnQgZXZlbnQgcGF5bG9hZFxuICAgKiBAcmV0dXJucyBudW1iZXIgMSBmb3IgTkVYVCBhbmQgMCBmb3IgTk9USElOR1xuICAgKi9cbiAgaGFuZGxlSW1hZ2VFdmVudChldmVudDogS2V5Ym9hcmRFdmVudCB8IE1vdXNlRXZlbnQpOiBudW1iZXIge1xuICAgIGlmICghZXZlbnQpIHtcbiAgICAgIHJldHVybiBOT1RISU5HO1xuICAgIH1cbiAgICBpZiAoZXZlbnQgaW5zdGFuY2VvZiBLZXlib2FyZEV2ZW50fgB7XG4gICAgICByZXR1cm4gdGhpcy5oYW5kbGVJbWFnZUtleWJvYXJkRXZlbnQoZXZlbnQpO1xuICAgIH0gZWxzZSBpZiAoZXZlbnQgaW5zdGFuY2VvZiBNb3VzZUV2ZW50fgB7XG4gICAgICByZXR1cm4gdGhpcy5oYW5kbGVJbWFnZU1vdXNlRXZlbnQoZXZlbnQpO1xuICAgIH1cbiAgICByZXR1cm4gTk9USElORztcbiAgfVxuXG4gIC8qKlxuICAgKiBQcml2YXRlIG1ldGhvZCB0byBoYW5kbGUga2V5Ym9hcmQgZXZlbnRzIG92ZXIgYW4gaW1hZ2UuXG4gICAqIEBwYXJhbSBLZXlib2FyZEV2ZW50IGV2ZW50IHBheWxvYWRcbiAgICogQHJldHVybnMgbnVtYmVyIDEgZm9yIE5FWFQgYW5kIDAgZm9yIE5PVEhJTkdcbiAgICovXG4gIHByaXZhdGUgaGFuZGxlSW1hZ2VLZXlib2FyZEV2ZW50KGV2ZW50OiBLZXlib2FyZEV2ZW50KTogbnVtYmVyIHtcbiAgICBjb25zdCBrZXk6IG51bWJlciA9IGV2ZW50LmtleUNvZGU7XG4gICAgaWYgKGtleSA9PT0gU1BBQ0VfS0VZIHx8IGtleSA9PT0gRU5URVJfS0VZfgB7XG4gICAgICByZXR1cm4gTkVYVDtcbiAgICB9XG4gICAgcmV0dXJuIE5PVEhJTkc7XG4gIH1cblxuICAvKipcbiAgICogUHJpdmF0ZSBtZXRob2QgdG8gaGFuZGxlIG1vdXNlIGV2ZW50cyBvdmVyIGFuIGltYWdlLlxuICAgKiBAcGFyYW0gTW91c2VFdmVudCBldmVudCBwYXlsb2FkXG4gICAqIEByZXR1cm5zIG51bWJlciAxIGZvciBORVhUIGFuZCAwIGZvciBOT1RISU5HXG4gICAqL1xuICBwcml2YXRlIGhhbmRsZUltYWdlTW91c2VFdmVudChldmVudDogTW91c2VFdmVudCk6IG51bWJlciB7XG4gICAgY29uc3QgbW91c2VCdG46IG51bWJlciA9IGV2ZW50LmJ1dHRvbjtcbiAgICBpZiAobW91c2VCdG4gPT09IE1PVVNFX01BSU5fQlVUVE9OX0NMSUNLfgB7XG4gICAgICByZXR1cm4gTkVYVDtcbiAgICB9XG4gICAgcmV0dXJuIE5PVEhJTkc7XG4gIH1cblxuICAvKipcbiAgICogTWV0aG9kIHRvIGhhbmRsZSBldmVudHMgb3ZlciBhbiBpbWFnZSwgZm9yIGluc3RhbmNlIGEga2V5cHJlc3Mgd2l0aCB0aGUgS2V5Ym9hcmQgb3IgYSBNb3VzZSBjbGljay5cbiAgICogQHBhcmFtIHN0cmluZyBkaXJlY3Rpb24gb2YgdGhlIG5hdmlnYXRpb24gdGhhdCBjYW4gYmUgZWl0aGVyICduZXh0JyBvciAncHJldidcbiAgICogQHBhcmFtIEtleWJvYXJkRXZlbnQgZXZlbnQgcGF5bG9hZFxuICAgKiBAcmV0dXJucyBudW1iZXIgLTEgZm9yIFBSRVYsIDEgZm9yIE5FWFQgYW5kIDAgZm9yIE5PVEhJTkdcbiAgICovXG4gIHByaXZhdGUgaGFuZGxlS2V5Ym9hcmROYXZpZ2F0aW9uRXZlbnQoZGlyZWN0aW9uOiBzdHJpbmcsIGV2ZW50OiBLZXlib2FyZEV2ZW50KTogbnVtYmVyIHtcbiAgICBjb25zdCBrZXk6IG51bWJlciA9IGV2ZW50LmtleUNvZGU7XG4gICAgaWYgKGtleSA9PT0gU1BBQ0VfS0VZIHx8IGtleSA9PT0gRU5URVJfS0VZfgB7XG4gICAgICByZXR1cm4gZGlyZWN0aW9uID09PSBESVJFQ1RJT05fUklHSFQgPyBORVhUIDogUFJFVjtcbiAgICB9XG4gICAgcmV0dXJuIE5PVEhJTkc7XG4gIH1cblxuICAvKipcbiAgICogTWV0aG9kIHRvIGhhbmRsZSBldmVudHMgb3ZlciBhbiBpbWFnZSwgZm9yIGluc3RhbmNlIGEga2V5cHJlc3Mgd2l0aCB0aGUgS2V5Ym9hcmQgb3IgYSBNb3VzZSBjbGljay5cbiAgICogQHBhcmFtIHN0cmluZyBkaXJlY3Rpb24gb2YgdGhlIG5hdmlnYXRpb24gdGhhdCBjYW4gYmUgZWl0aGVyICduZXh0JyBvciAncHJldidcbiAgICogQHBhcmFtIE1vdXNlRXZlbnQgZXZlbnQgcGF5bG9hZFxuICAgKiBAcmV0dXJucyBudW1iZXIgLTEgZm9yIFBSRVYsIDEgZm9yIE5FWFQgYW5kIDAgZm9yIE5PVEhJTkdcbiAgICovXG4gIHByaXZhdGUgaGFuZGxlTW91c2VOYXZpZ2F0aW9uRXZlbnQoZGlyZWN0aW9uOiBzdHJpbmcsIGV2ZW50OiBNb3VzZUV2ZW50KTogbnVtYmVyIHtcbiAgICBjb25zdCBtb3VzZUJ0bjogbnVtYmVyID0gZXZlbnQuYnV0dG9uO1xuICAgIGlmIChtb3VzZUJ0biA9PT0gTU9VU0VfTUFJTl9CVVRUT05fQ0xJQ0spIHtcbiAgICAgIHJldHVybiBkaXJlY3Rpb24gPT09IERJUkVDVElPTl9SSUdIVCA/IE5FWFQgOiBQUkVWO1xuICAgIH1cbiAgICByZXR1cm4gTk9USElORztcbiAgfVxufVxuIiwiLypcbiBUaGUgTUlUIExpY2Vuc2UgKE1JVClcblxuIENvcHlyaWdodCAoYykgMjAxNy0yMDE4IFN0ZWZhbm8gQ2FwcGEgKEtzODkpXG5cbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwifgwgdG8gZGVhbFxuIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbiB0byB1c2UsIGNvcHfgIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcblxuIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIGFsbFxuIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG5cbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFfgXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTiBJTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiBMSUFCSUxJVFfgIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFXG4gU09GVFdBUkUuXG4gKi9cblxuLyoqXG4gKiBJbnRlcmZhY2UgYERlc2NyaXB0aW9uYCB0byBjaGFuZ2UgdGhlIGRlc2NyaXB0aW9uLCBlaXRoZXIgd2l0aCBhIGZ1bGwgY3VzdG9tXG4gKiBkZXNjcmlwdGlvbiBvciB3aXRoIGEgc21hbGwgYW5kIHNpbXBsZSBjdXN0b21pemF0aW9uLlxuICogQWxzbywgeW91IGNvdWxkIGNoYW5nZSBtYXJnaW5zLCBiYWNrZ3JvdW5kIHN0eWxlIGFuZCBzbyBvbi5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBEZXNjcmlwdGlvbiB7XG4gIHN0cmF0ZWd5OiBEZXNjcmlwdGlvblN0cmF0ZWd5O1xuICBjdXN0b21GdWxsRGVzY3JpcHRpb24/OiBzdHJpbmc7XG4gIGltYWdlVGV4dD86IHN0cmluZztcbiAgbnVtYmVyU2VwYXJhdG9yPzogc3RyaW5nO1xuICBiZWZvcmVUZXh0RGVzY3JpcHRpb24/OiBzdHJpbmc7XG5cbiAgc3R5bGU/OiBEZXNjcmlwdGlvblN0eWxlO1xufVxuXG4vKipcbiAqIEVudW0gYERlc2NyaXB0aW9uU3RyYXRlZ3lgIHdpdGgga2V5cyBhbmQgdGhlaXIgcmVsYXRpdmUga2V5IGNvZGVzLlxuICovXG5leHBvcnQgZW51bSBEZXNjcmlwdGlvblN0cmF0ZWd5IHtcbiAgQUxXQVlTX0hJRERFTiA9IDEsXG4gIEFMV0FZU19WSVNJQkxFLFxuICBISURFX0lGX0VNUFRZXG59XG5cbi8qKlxuICogSW50ZXJmYWNlIHRvIGNoYW5nZSBjc3MgcHJvcGVydGllcy5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBEZXNjcmlwdGlvblN0eWxlIHtcbiAgYmdDb2xvcj86IHN0cmluZztcbiAgdGV4dENvbG9yPzogc3RyaW5nO1xuICB3aWR0aD86IHN0cmluZztcbiAgaGVpZ2h0Pzogc3RyaW5nO1xuICBwb3NpdGlvbj86IHN0cmluZztcbiAgdG9wPzogc3RyaW5nO1xuICBib3R0b20/OiBzdHJpbmc7XG4gIGxlZnQ/OiBzdHJpbmc7XG4gIHJpZ2h0Pzogc3RyaW5nO1xuICBtYXJnaW5Ub3A/OiBzdHJpbmc7XG4gIG1hcmdpbkJvdHRvbT86IHN0cmluZztcbiAgbWFyZ2luUmlnaHQ/OiBzdHJpbmc7XG4gIG1hcmdpbkxlZnQ/OiBzdHJpbmc7XG59XG4iLCIvKlxuIFRoZSBNSVQgTGljZW5zZSAoTUlUKVxuXG4gQ29weXJpZ2h0IChjfgAyMDE3LTIwMTggU3RlZmFubyBDYXBwYSAoS3M4OSlcblxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbiBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuXG4gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsXG4gY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cblxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OIElORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEVcbiBTT0ZUV0FSRS5cbiAqL1xuXG4vKipcbiAqIEVudW0gYEtleWJvYXJkYCB3aXRoIGtleXMgYW5kIHRoZWlyIHJlbGF0aXZlIGtleSBjb2Rlcy5cbiAqL1xuZXhwb3J0IGVudW0gS2V5Ym9hcmQge1xuICBFU0MgPSAyNyxcbiAgTEVGVF9BUlJPVyA9IDM3LFxuICBSSUdIVF9BUlJPVyA9IDM5LFxuICBVUF9BUlJPVyA9IDM4LFxuICBET1dOX0FSUk9XID0gNDBcbn1cbiIsIi8qXG4gVGhlIE1JVCBMaWNlbnNlIChNSVQpXG5cbiBDb3B5cmlnaHQgKGMpIDIwMTctMjAxOCBTdGVmYW5vIENhcHBhIChLczg5KVxuXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIifgIHRvIGRlYWxcbiBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4gdG8gdXNlLCBjb3B5LCBtb2RpZnfgIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG5cbiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBhbGxcbiBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT04gSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRVxuIFNPRlRXQVJFLlxuICovXG5cbi8qKlxuICogSW50ZXJmYWNlIGBMb2FkaW5nQ29uZmlnYCB0byBjb25maWd1cmUgbG9hZGluZyBpY29uLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIExvYWRpbmdDb25maWcge1xuICBlbmFibGU6IGJvb2xlYW47XG4gIHR5cGU6IExvYWRpbmdUeXBlO1xufVxuXG4vKipcbiAqIEVudW0gYExvYWRpbmdUeXBlYCB3aXRoIGEgbGlzdCBvZiBwb3NzaWJsZSB0eXBlcy5cbiAqL1xuZXhwb3J0IGVudW0gTG9hZGluZ1R5cGUge1xuICBTVEFOREFSRCA9IDEsXG4gIENJUkNVTEFSLFxuICBCQVJTLFxuICBET1RTLFxuICBDVUJFX0ZMSVBQSU5HLFxuICBDSVJDTEVTLFxuICBFWFBMT1NJTkdfU1FVQVJFU1xufVxuIiwiLypcbiBUaGUgTUlUIExpY2Vuc2UgKE1JVClcblxuIENvcHlyaWdodCAoYykgMjAxNy0yMDE4IFN0ZWZhbm8gQ2FwcGEgKEtzODkpXG5cbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwifgwgdG8gZGVhbFxuIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbiB0byB1c2UsIGNvcHfgIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcblxuIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIGFsbFxuIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG5cbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFfgXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTiBJTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiBMSUFCSUxJVFfgIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFXG4gU09GVFdBUkUuXG4gKi9cblxuaW1wb3J0IHsgSW1hZ2UgfSBmcm9tICcuLi9tb2RlbC9pbWFnZS5jbGFzcyc7XG5cbi8qKlxuICogVXRpbGl0eSBmdW5jdGlvbiB0byBnZXQgdGhlIGluZGV4IG9mIHRoZSBpbnB1dCBgaW1hZ2VgIGZyb20gYGFycmF5T2ZJbWFnZXNgXG4gKiBAcGFyYW0gSW1hZ2UgaW1hZ2UgdG8gZ2V0IHRoZSBpbmRleC4gVGhlIGltYWdlICdpZCcgbXVzdCBiZSBhIG51bWJlciA+PSAwXG4gKiBAcGFyYW0gSW1hZ2VbXSBhcnJheU9mSW1hZ2VzIHRvIHNlYXJjaCB0aGUgaW1hZ2Ugd2l0aGluIGl0XG4gKiBAcmV0dXJucyBudW1iZXIgdGhlIGluZGV4IG9mIHRoZSBpbWFnZS4gLTEgaWYgbm90IGZvdW5kLlxuICogQHRocm93cyBhbiBFcnJvciBpZiBlaXRoZXIgaW1hZ2Ugb3IgYXJyYXlPZkltYWdlcyBhcmUgbm90IHZhbGlkLFxuICogIG9yIGlmIHRoZSBpbnB1dCBpbWFnZSBkb2Vzbid0IGNvbnRhaW4gYW4gJ2lkJywgb3IgdGhlICdpZCcgaXMgPCAwXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRJbmRleChpbWFnZTogSW1hZ2UsIGFycmF5T2ZJbWFnZXM6IEltYWdlW10pOiBudW1iZXIge1xuICBpZiAoIWltYWdlfgB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdpbWFnZSBtdXN0IGJlIGEgdmFsaWQgSW1hZ2Ugb2JqZWN0Jyk7XG4gIH1cblxuICBpZiAoIWFycmF5T2ZJbWFnZXMpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2FycmF5T2ZJbWFnZXMgbXVzdCBiZSBhIHZhbGlkIEltYWdlW10nKTtcbiAgfVxuXG4gIGlmICghaW1hZ2UuaWQgJiYgaW1hZ2UuaWQgIT09IDApIHtcbiAgICAvLyBpZCA9IDAgaXMgYWRtaXR0ZWRcbiAgICB0aHJvdyBuZXcgRXJyb3IoYEEgbnVtZXJpYyBJbWFnZSAnaWQnIGlzIG1hbmRhdG9yeWApO1xuICB9XG5cbiAgaWYgKGltYWdlLmlkIDwgMCkge1xuICAgIHRocm93IG5ldyBFcnJvcihgSW1hZ2UgJ2lkJyBtdXN0IGJlID49IDBgKTtcbiAgfVxuXG4gIHJldHVybiBhcnJheU9mSW1hZ2VzLmZpbmRJbmRleCgodmFsOiBJbWFnZSkgPT4gdmFsLmlkID09PSBpbWFnZS5pZCk7XG59XG4iLCIvKlxuIFRoZSBNSVQgTGljZW5zZSAoTUlUKVxuXG4gQ29weXJpZ2h0IChjfgAyMDE3LTIwMTggU3RlZmFubyBDYXBwYSAoS3M4OSlcblxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbiBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuXG4gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsXG4gY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cblxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OIElORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEVcbiBTT0ZUV0FSRS5cbiAqL1xuXG5pbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkNoYW5nZXMsIE9uSW5pdCwgT3V0cHV0LCBTaW1wbGVDaGFuZ2UsIFNpbXBsZUNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgQWNjZXNzaWJsZUNvbXBvbmVudCB9IGZyb20gJy4uL2FjY2Vzc2libGUuY29tcG9uZW50JztcblxuaW1wb3J0IHsgQWNjZXNzaWJpbGl0eUNvbmZpZyB9IGZyb20gJy4uLy4uL21vZGVsL2FjY2Vzc2liaWxpdHkuaW50ZXJmYWNlJztcbmltcG9ydCB7IEFjdGlvbiB9IGZyb20gJy4uLy4uL21vZGVsL2FjdGlvbi5lbnVtJztcbmltcG9ydCB7IERlc2NyaXB0aW9uLCBEZXNjcmlwdGlvblN0cmF0ZWd5LCBEZXNjcmlwdGlvblN0eWxlIH0gZnJvbSAnLi4vLi4vbW9kZWwvZGVzY3JpcHRpb24uaW50ZXJmYWNlJztcbmltcG9ydCB7IEltYWdlLCBJbWFnZU1vZGFsRXZlbnQgfSBmcm9tICcuLi8uLi9tb2RlbC9pbWFnZS5jbGFzcyc7XG5pbXBvcnQgeyBJbnRlcm5hbExpYkltYWdlIH0gZnJvbSAnLi4vLi4vbW9kZWwvaW1hZ2UtaW50ZXJuYWwuY2xhc3MnO1xuaW1wb3J0IHsgS2V5Ym9hcmQgfSBmcm9tICcuLi8uLi9tb2RlbC9rZXlib2FyZC5lbnVtJztcbmltcG9ydCB7IEtleWJvYXJkQ29uZmlnIH0gZnJvbSAnLi4vLi4vbW9kZWwva2V5Ym9hcmQtY29uZmlnLmludGVyZmFjZSc7XG5pbXBvcnQgeyBMb2FkaW5nQ29uZmlnLCBMb2FkaW5nVHlwZSB9IGZyb20gJy4uLy4uL21vZGVsL2xvYWRpbmctY29uZmlnLmludGVyZmFjZSc7XG5pbXBvcnQgeyBTbGlkZUNvbmZpZyB9IGZyb20gJy4uLy4uL21vZGVsL3NsaWRlLWNvbmZpZy5pbnRlcmZhY2UnO1xuXG5pbXBvcnQgeyBORVhULCBQUkVWIH0gZnJvbSAnLi4vLi4vdXRpbHMvdXNlci1pbnB1dC51dGlsJztcbmltcG9ydCB7IGdldEluZGV4IH0gZnJvbSAnLi4vLi4vdXRpbHMvaW1hZ2UudXRpbCc7XG5pbXBvcnQgeyBDdXJyZW50SW1hZ2VDb25maWcgfSBmcm9tICcuLi8uLi9tb2RlbC9jdXJyZW50LWltYWdlLWNvbmZpZy5pbnRlcmZhY2UnO1xuXG4vKipcbiAqIEludGVyZmFjZSB0byBkZXNjcmliZSB0aGUgTG9hZCBFdmVudCwgdXNlZCB0b1xuICogZW1pdCBhbiBldmVudCB3aGVuIHRoZSBpbWFnZSBpcyBmaW5hbGx5IGxvYWRlZCBhbmQgdGhlIHNwaW5uZXIgaGFzIGdvbmUuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgSW1hZ2VMb2FkRXZlbnQge1xuICBzdGF0dXM6IGJvb2xlYW47XG4gIGluZGV4OiBudW1iZXI7XG4gIGlkOiBudW1iZXI7XG59XG5cbi8qKlxuICogQ29tcG9uZW50IHdpdGggdGhlIGN1cnJlbnQgaW1hZ2Ugd2l0aCBzb21lIGFkZGl0aW9uYWwgZWxlbWVudHMgbGlrZSBhcnJvd3MgYW5kIHNpZGUgcHJldmlld3MuXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2tzLWN1cnJlbnQtaW1hZ2UnLFxuICBzdHlsZVVybHM6IFsnY3VycmVudC1pbWFnZS5zY3NzJywgJ2N1cnJlbnQtaW1hZ2UtYXJyb3dzLnNjc3MnLCAnY3VycmVudC1pbWFnZS1wcmV2aWV3cy5zY3NzJ10sXG4gIHRlbXBsYXRlVXJsOiAnY3VycmVudC1pbWFnZS5odG1sJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgQ3VycmVudEltYWdlQ29tcG9uZW50IGV4dGVuZHMgQWNjZXNzaWJsZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzIHtcbiAgLyoqXG4gICAqIE9iamVjdCBvZiB0eXBlIGBJbnRlcm5hbExpYkltYWdlYCB0aGF0IHJlcHJlc2VudCB0aGUgdmlzaWJsZSBpbWFnZS5cbiAgICovXG4gIEBJbnB1dCgpXG4gIGN1cnJlbnRJbWFnZTogSW50ZXJuYWxMaWJJbWFnZTtcbiAgLyoqXG4gICAqIEFycmF5IG9mIGBJbnRlcm5hbExpYkltYWdlYCB0aGF0IHJlcHJlc2VudCB0aGUgbW9kZWwgb2YgdGhpcyBsaWJyYXJ5IHdpdGggYWxsIGltYWdlcyxcbiAgICogdGh1bWJzIGFuZCBzbyBvbi5cbiAgICovXG4gIEBJbnB1dCgpXG4gIGltYWdlczogSW50ZXJuYWxMaWJJbWFnZVtdO1xuICAvKipcbiAgICogQm9vbGVhbiB0aGF0IGl0IGlzIHRydWUgaWYgdGhlIG1vZGFsIGdhbGxlcnkgaXMgdmlzaWJsZS5cbiAgICogSWYgeWVzLCBhbHNvIHRoaXMgY29tcG9uZW50IHNob3VsZCBiZSB2aXNpYmxlLlxuICAgKi9cbiAgQElucHV0KClcbiAgaXNPcGVuOiBib29sZWFuO1xuICAvKipcbiAgICogSW50ZXJmYWNlIHRvIGNvbmZpZ3VyZSBjdXJyZW50IGltYWdlIGluIG1vZGFsLWdhbGxlcnkuXG4gICAqIEZvciBpbnN0YW5jZSB5b3UgY2FuIGRpc2FibGUgbmF2aWdhdGlvbiBvbiBjbGljayBvbiBjdXJyZW50IGltYWdlIChlbmFibGVkIGJ5IGRlZmF1bHQpLlxuICAgKi9cbiAgQElucHV0KClcbiAgY3VycmVudEltYWdlQ29uZmlnOiBDdXJyZW50SW1hZ2VDb25maWc7XG4gIC8qKlxuICAgKiBPYmplY3Qgb2YgdHlwZSBgU2xpZGVDb25maWdgIHRvIGdldCBgaW5maW5pdGUgc2xpZGluZ2AuXG4gICAqL1xuICBASW5wdXQoKVxuICBzbGlkZUNvbmZpZzogU2xpZGVDb25maWc7XG4gIC8qKlxuICAgKiBPYmplY3Qgb2YgdHlwZSBgQWNjZXNzaWJpbGl0eUNvbmZpZ2AgdG8gaW5pdCBjdXN0b20gYWNjZXNzaWJpbGl0eSBmZWF0dXJlcy5cbiAgICogRm9yIGluc3RhbmNlLCBpdCBjb250YWlucyB0aXRsZXMsIGFsdCB0ZXh0cywgYXJpYS1sYWJlbHMgYW5kIHNvIG9uLlxuICAgKi9cbiAgQElucHV0KClcbiAgYWNjZXNzaWJpbGl0eUNvbmZpZzogQWNjZXNzaWJpbGl0eUNvbmZpZztcbiAgLyoqXG4gICAqIE9iamVjdCBvZiB0eXBlIGBLZXlib2FyZENvbmZpZ2AgdG8gYXNzaWduIGN1c3RvbSBrZXlzIHRvIGJvdGggRVNDLCBSSUdIVCBhbmQgTEVGVCBrZXlib2FyZCdzIGFjdGlvbnMuXG4gICAqL1xuICBASW5wdXQoKVxuICBrZXlib2FyZENvbmZpZzogS2V5Ym9hcmRDb25maWc7XG5cbiAgLyoqXG4gICAqIE91dHB1dCB0byBlbWl0IGFuIGV2ZW50IHdoZW4gaW1hZ2VzIGFyZSBsb2FkZWQuIFRoZSBwYXlsb2FkIGNvbnRhaW5zIGFuIGBJbWFnZUxvYWRFdmVudGAuXG4gICAqL1xuICBAT3V0cHV0KClcbiAgbG9hZEltYWdlOiBFdmVudEVtaXR0ZXI8SW1hZ2VMb2FkRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxJbWFnZUxvYWRFdmVudD4oKTtcbiAgLyoqXG4gICAqIE91dHB1dCB0byBlbWl0IGFueSBjaGFuZ2VzIG9mIHRoZSBjdXJyZW50IGltYWdlLiBUaGUgcGF5bG9hZCBjb250YWlucyBhbiBgSW1hZ2VNb2RhbEV2ZW50YC5cbiAgICovXG4gIEBPdXRwdXQoKVxuICBjaGFuZ2VJbWFnZTogRXZlbnRFbWl0dGVyPEltYWdlTW9kYWxFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPEltYWdlTW9kYWxFdmVudD4oKTtcbiAgLyoqXG4gICAqIE91dHB1dCB0byBlbWl0IGFuIGV2ZW50IHdoZW4gdGhlIG1vZGFsIGdhbGxlcnkgaXMgY2xvc2VkLiBUaGUgcGF5bG9hZCBjb250YWlucyBhbiBgSW1hZ2VNb2RhbEV2ZW50YC5cbiAgICovXG4gIEBPdXRwdXQoKVxuICBjbG9zZTogRXZlbnRFbWl0dGVyPEltYWdlTW9kYWxFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPEltYWdlTW9kYWxFdmVudD4oKTtcblxuICAvKipcbiAgICogRW51bSBvZiB0eXBlIGBBY3Rpb25gIHRoYXQgcmVwcmVzZW50cyBhIG1vdXNlIGNsaWNrIG9uIGEgYnV0dG9uLlxuICAgKiBEZWNsYXJlZCBoZXJlIHRvIGJlIHVzZWQgaW5zaWRlIHRoZSB0ZW1wbGF0ZS5cbiAgICovXG4gIGNsaWNrQWN0aW9uOiBBY3Rpb24gPSBBY3Rpb24uQ0xJQ0s7XG4gIC8qKlxuICAgKiBFbnVtIG9mIHR5cGUgYEFjdGlvbmAgdGhhdCByZXByZXNlbnRzIGEga2V5Ym9hcmQgYWN0aW9uLlxuICAgKiBEZWNsYXJlZCBoZXJlIHRvIGJlIHVzZWQgaW5zaWRlIHRoZSB0ZW1wbGF0ZS5cbiAgICovXG4gIGtleWJvYXJkQWN0aW9uOiBBY3Rpb24gPSBBY3Rpb24uS0VZQk9BUkQ7XG4gIC8qKlxuICAgKiBCb29sZWFuIHRoYXQgaXQncyB0cnVlIHdoZW4geW91IGFyZSB3YXRjaGluZyB0aGUgZmlyc3QgaW1hZ2UgKGN1cnJlbnRseSB2aXNpYmxlfg5cbiAgICogRmFsc2UgYnkgZGVmYXVsdFxuICAgKi9cbiAgaXNGaXJzdEltYWdlID0gZmFsc2U7XG4gIC8qKlxuICAgKiBCb29sZWFuIHRoYXQgaXQncyB0cnVlIHdoZW4geW91IGFyZSB3YXRjaGluZyB0aGUgbGFzdCBpbWFnZSAoY3VycmVudGx5IHZpc2libGUpLlxuICAgKiBGYWxzZSBieSBkZWZhdWx0XG4gICAqL1xuICBpc0xhc3RJbWFnZSA9IGZhbHNlO1xuICAvKipcbiAgICogQm9vbGVhbiB0aGF0IGl0J3MgdHJ1ZSBpZiBhbiBpbWFnZSBvZiB0aGUgbW9kYWwgZ2FsbGVyeSBpcyBzdGlsbCBsb2FkaW5nLlxuICAgKiBUcnVlIGJ5IGRlZmF1bHRcbiAgICovXG4gIGxvYWRpbmcgPSB0cnVlO1xuICAvKipcbiAgICogT2JqZWN0IG9mIHR5cGUgYEN1cnJlbnRJbWFnZUNvbmZpZ2AgZXhwb3NlZCB0byB0aGUgdGVtcGxhdGUuIFRoaXMgZmllbGQgaXMgaW5pdGlhbGl6ZWRcbiAgICogYXBwbHlpbmcgdHJhbnNmb3JtYXRpb25zLCBkZWZhdWx0IHZhbHVlcyBhbmQgc28gb24gdG8gdGhlIGlucHV0IG9mIHRoZSBzYW1lIHR5cGUuXG4gICAqL1xuICBjb25maWdDdXJyZW50SW1hZ2U6IEN1cnJlbnRJbWFnZUNvbmZpZztcblxuICAvKipcbiAgICogUHJpdmF0ZSBvYmplY3Qgd2l0aG91dCB0eXBlIHRvIGRlZmluZSBhbGwgc3dpcGUgYWN0aW9ucyB1c2VkIGJ5IGhhbW1lcmpzLlxuICAgKi9cbiAgcHJpdmF0ZSBTV0lQRV9BQ1RJT04gPSB7XG4gICAgTEVGVDogJ3N3aXBlbGVmdCcsXG4gICAgUklHSFQ6ICdzd2lwZXJpZ2h0JyxcbiAgICBVUDogJ3N3aXBldXAnLFxuICAgIERPV046ICdzd2lwZWRvd24nXG4gIH07XG5cbiAgLyoqXG4gICAqIE1ldGhvZCDDgsK0bmdPbkluaXTDgsK0IHRvIGJ1aWxkIGBjb25maWdDdXJyZW50SW1hZ2VgIGFwcGx5aW5nIGRlZmF1bHQgdmFsdWVzLlxuICAgKiBUaGlzIGlzIGFuIEFuZ3VsYXIncyBsaWZlY3ljbGUgaG9vaywgc28gaXRzIGNhbGxlZCBhdXRvbWF0aWNhbGx5IGJ5IEFuZ3VsYXIgaXRzZWxmLlxuICAgKiBJbiBwYXJ0aWN1bGFyLCBpdCdzIGNhbGxlZCBvbmx5IG9uZSB0aW1lISEhXG4gICAqL1xuICBuZ09uSW5pdCgpIHtcbiAgICBjb25zdCBkZWZhdWx0TG9hZGluZzogTG9hZGluZ0NvbmZpZyA9IHsgZW5hYmxlOiB0cnVlLCB0eXBlOiBMb2FkaW5nVHlwZS5TVEFOREFSRCB9O1xuICAgIGNvbnN0IGRlZmF1bHREZXNjcmlwdGlvblN0eWxlOiBEZXNjcmlwdGlvblN0eWxlID0ge1xuICAgICAgYmdDb2xvcjogJ3JnYmEoMCwgMCwgMCwgLjUpJyxcbiAgICAgIHRleHRDb2xvcjogJ3doaXRlJyxcbiAgICAgIG1hcmdpblRvcDogJzBweCcsXG4gICAgICBtYXJnaW5Cb3R0b206ICcwcHgnLFxuICAgICAgbWFyZ2luTGVmdDogJzBweCcsXG4gICAgICBtYXJnaW5SaWdodDogJzBweCdcbiAgICB9O1xuICAgIGNvbnN0IGRlZmF1bHREZXNjcmlwdGlvbjogRGVzY3JpcHRpb24gPSB7XG4gICAgICBzdHJhdGVneTogRGVzY3JpcHRpb25TdHJhdGVneS5BTFdBWVNfVklTSUJMRSxcbiAgICAgIGltYWdlVGV4dDogJ0ltYWdlICcsXG4gICAgICBudW1iZXJTZXBhcmF0b3I6ICcvJyxcbiAgICAgIGJlZm9yZVRleHREZXNjcmlwdGlvbjogJyAtICcsXG4gICAgICBzdHlsZTogZGVmYXVsdERlc2NyaXB0aW9uU3R5bGVcbiAgICB9O1xuICAgIGNvbnN0IGRlZmF1bHRDdXJyZW50SW1hZ2VDb25maWc6IEN1cnJlbnRJbWFnZUNvbmZpZyA9IHtcbiAgICAgIG5hdmlnYXRlT25DbGljazogdHJ1ZSxcbiAgICAgIGxvYWRpbmdDb25maWc6IGRlZmF1bHRMb2FkaW5nLFxuICAgICAgZGVzY3JpcHRpb246IGRlZmF1bHREZXNjcmlwdGlvbixcbiAgICAgIGRvd25sb2FkYWJsZTogZmFsc2UsXG4gICAgICBpbnZlcnRTd2lwZTogZmFsc2VcbiAgICB9O1xuXG4gICAgdGhpcy5jb25maWdDdXJyZW50SW1hZ2UgPSBPYmplY3QuYXNzaWduKHt9LCBkZWZhdWx0Q3VycmVudEltYWdlQ29uZmlnLCB0aGlzLmN1cnJlbnRJbWFnZUNvbmZpZyk7XG4gICAgdGhpcy5jb25maWdDdXJyZW50SW1hZ2UuZGVzY3JpcHRpb24gPSBPYmplY3QuYXNzaWduKHt9LCBkZWZhdWx0RGVzY3JpcHRpb24sIHRoaXMuY29uZmlnQ3VycmVudEltYWdlLmRlc2NyaXB0aW9uKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBNZXRob2Qgw4LCtG5nT25DaGFuZ2Vzw4LCtCB0byB1cGRhdGUgYGxvYWRpbmdgIHN0YXR1cyBhbmQgZW1pdCBldmVudHMuXG4gICAqIElmIHRoZSBnYWxsZXJ5IGlzIG9wZW4sIHRoZW4gaXQgd2lsbCBhbHNvIG1hbmFnZSBib3VuZGFyeSBhcnJvd3MgYW5kIHNsaWRpbmcuXG4gICAqIFRoaXMgaXMgYW4gQW5ndWxhcidzIGxpZmVjeWNsZSBob29rLCBzbyBpdHMgY2FsbGVkIGF1dG9tYXRpY2FsbHkgYnkgQW5ndWxhciBpdHNlbGYuXG4gICAqIEluIHBhcnRpY3VsYXIsIGl0J3MgY2FsbGVkIHdoZW4gYW55IGRhdGEtYm91bmQgcHJvcGVydHkgb2YgYSBkaXJlY3RpdmUgY2hhbmdlcyEhIVxuICAgKi9cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIGNvbnN0IGltYWdlczogU2ltcGxlQ2hhbmdlID0gY2hhbmdlcy5pbWFnZXM7XG4gICAgY29uc3QgY3VycmVudEltYWdlOiBTaW1wbGVDaGFuZ2UgPSBjaGFuZ2VzLmN1cnJlbnRJbWFnZTtcblxuICAgIGlmIChjdXJyZW50SW1hZ2UgJiYgY3VycmVudEltYWdlLnByZXZpb3VzVmFsdWUgIT09IGN1cnJlbnRJbWFnZS5jdXJyZW50VmFsdWUpIHtcbiAgICAgIHRoaXMudXBkYXRlSW5kZXhlcygpO1xuICAgIH0gZWxzZSBpZiAoaW1hZ2VzICYmIGltYWdlcy5wcmV2aW91c1ZhbHVlICE9PSBpbWFnZXMuY3VycmVudFZhbHVlfgB7XG4gICAgICB0aGlzLnVwZGF0ZUluZGV4ZXMoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogTWV0aG9kIHRvIGhhbmRsZSBrZXlwcmVzcyBiYXNlZCBvbiB0aGUgYGtleWJvYXJkQ29uZmlnYCBpbnB1dC4gSXQgZ2V0cyB0aGUga2V5Q29kZSBvZlxuICAgKiB0aGUga2V5IHRoYXQgdHJpZ2dlcmVkIHRoZSBrZXlwcmVzcyBldmVudCB0byBuYXZpZ2F0ZSBiZXR3ZWVuIGltYWdlcyBvciB0byBjbG9zZSB0aGUgbW9kYWwgZ2FsbGVyeS5cbiAgICogQHBhcmFtIG51bWJlciBrZXlDb2RlIG9mIHRoZSBrZXkgdGhhdCB0cmlnZ2VyZWQgdGhlIGtleXByZXNzIGV2ZW50XG4gICAqL1xuICBvbktleVByZXNzKGtleUNvZGU6IG51bWJlcikge1xuICAgIGNvbnN0IGVzYzogbnVtYmVyID0gdGhpcy5rZXlib2FyZENvbmZpZyAmJiB0aGlzLmtleWJvYXJkQ29uZmlnLmVzYyA/IHRoaXMua2V5Ym9hcmRDb25maWcuZXNjIDogS2V5Ym9hcmQuRVNDO1xuICAgIGNvbnN0IHJpZ2h0OiBudW1iZXIgPSB0aGlzLmtleWJvYXJkQ29uZmlnICYmIHRoaXMua2V5Ym9hcmRDb25maWcucmlnaHQgPyB0aGlzLmtleWJvYXJkQ29uZmlnLnJpZ2h0IDogS2V5Ym9hcmQuUklHSFRfQVJST1c7XG4gICAgY29uc3QgbGVmdDogbnVtYmVyID0gdGhpcy5rZXlib2FyZENvbmZpZyAmJiB0aGlzLmtleWJvYXJkQ29uZmlnLmxlZnQgPyB0aGlzLmtleWJvYXJkQ29uZmlnLmxlZnQgOiBLZXlib2FyZC5MRUZUX0FSUk9XO1xuXG4gICAgc3dpdGNoIChrZXlDb2RlfgB7XG4gICAgICBjYXNlIGVzYzpcbiAgICAgICAgdGhpcy5jbG9zZS5lbWl0KG5ldyBJbWFnZU1vZGFsRXZlbnQoQWN0aW9uLktFWUJPQVJELCB0cnVlfgk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSByaWdodDpcbiAgICAgICAgdGhpcy5uZXh0SW1hZ2UoQWN0aW9uLktFWUJPQVJEKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIGxlZnQ6XG4gICAgICAgIHRoaXMucHJldkltYWdlKEFjdGlvbi5LRVlCT0FSRCk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBNZXRob2QgdG8gZ2V0IHRoZSBpbWFnZSBkZXNjcmlwdGlvbiBiYXNlZCBvbiBpbnB1dCBwYXJhbXMuXG4gICAqIElmIHlvdSBwcm92aWRlIGEgZnVsbCBkZXNjcmlwdGlvbiB0aGlzIHdpbGwgYmUgdGhlIHZpc2libGUgZGVzY3JpcHRpb24sIG90aGVyd2lzZSxcbiAgICogaXQgd2lsbCBiZSBidWlsdCB1c2luZyB0aGUgYERlc2NyaXB0aW9uYCBvYmplY3QsIGNvbmNhdGVuYXRpbmcgaXRzIGZpZWxkcy5cbiAgICogQHBhcmFtIEltYWdlIGltYWdlIHRvIGdldCBpdHMgZGVzY3JpcHRpb24uIElmIG5vdCBwcm92aWRlZCBpdCB3aWxsIGJlIHRoZSBjdXJyZW50IGltYWdlXG4gICAqIEByZXR1cm5zIFN0cmluZyBkZXNjcmlwdGlvbiBvZiB0aGUgaW1hZ2UgKG9yIHRoZSBjdXJyZW50IGltYWdlIGlmIG5vdCBwcm92aWRlZClcbiAgICogQHRocm93cyBhbiBFcnJvciBpZiBkZXNjcmlwdGlvbiBpc24ndCBhdmFpbGFibGVcbiAgICovXG4gIGdldERlc2NyaXB0aW9uVG9EaXNwbGF5KGltYWdlOiBJbWFnZSA9IHRoaXMuY3VycmVudEltYWdlKTogc3RyaW5nIHtcbiAgICBpZiAoIXRoaXMuY29uZmlnQ3VycmVudEltYWdlIHx8ICF0aGlzLmNvbmZpZ0N1cnJlbnRJbWFnZS5kZXNjcmlwdGlvbikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdEZXNjcmlwdGlvbiBpbnB1dCBtdXN0IGJlIGEgdmFsaWQgb2JqZWN0IGltcGxlbWVudGluZyB0aGUgRGVzY3JpcHRpb24gaW50ZXJmYWNlJyk7XG4gICAgfVxuXG4gICAgY29uc3QgaW1hZ2VXaXRob3V0RGVzY3JpcHRpb246IGJvb2xlYW4gPSAhaW1hZ2UubW9kYWwgfHwgIWltYWdlLm1vZGFsLmRlc2NyaXB0aW9uIHx8IGltYWdlLm1vZGFsLmRlc2NyaXB0aW9uID09PSAnJztcblxuICAgIHN3aXRjaCAodGhpcy5jb25maWdDdXJyZW50SW1hZ2UuZGVzY3JpcHRpb24uc3RyYXRlZ3kpIHtcbiAgICAgIGNhc2UgRGVzY3JpcHRpb25TdHJhdGVneS5ISURFX0lGX0VNUFRZOlxuICAgICAgICByZXR1cm4gaW1hZ2VXaXRob3V0RGVzY3JpcHRpb24gPyAnJyA6IGltYWdlLm1vZGFsLmRlc2NyaXB0aW9uICsgJyc7XG4gICAgICBjYXNlIERlc2NyaXB0aW9uU3RyYXRlZ3kuQUxXQVlTX0hJRERFTjpcbiAgICAgICAgcmV0dXJuICcnO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgLy8gLS0tLS0tLS0tLS0gRGVzY3JpcHRpb25TdHJhdGVneS5BTFdBWVNfVklTSUJMRSAtLS0tLS0tLS0tLS0tLS0tLVxuICAgICAgICByZXR1cm4gdGhpcy5idWlsZFRleHREZXNjcmlwdGlvbihpbWFnZSwgaW1hZ2VXaXRob3V0RGVzY3JpcHRpb24pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBNZXRob2QgdG8gZ2V0IGBhbHQgYXR0cmlidXRlYC5cbiAgICogYGFsdGAgc3BlY2lmaWVzIGFuIGFsdGVybmF0ZSB0ZXh0IGZvciBhbiBpbWFnZSwgaWYgdGhlIGltYWdlIGNhbm5vdCBiZSBkaXNwbGF5ZWQuXG4gICAqIEBwYXJhbSBJbWFnZSBpbWFnZSB0byBnZXQgaXRzIGFsdCBkZXNjcmlwdGlvbi4gSWYgbm90IHByb3ZpZGVkIGl0IHdpbGwgYmUgdGhlIGN1cnJlbnQgaW1hZ2VcbiAgICogQHJldHVybnMgU3RyaW5nIGFsdCBkZXNjcmlwdGlvbiBvZiB0aGUgaW1hZ2UgKG9yIHRoZSBjdXJyZW50IGltYWdlIGlmIG5vdCBwcm92aWRlZClcbiAgICovXG4gIGdldEFsdERlc2NyaXB0aW9uQnlJbWFnZShpbWFnZTogSW1hZ2UgPSB0aGlzLmN1cnJlbnRJbWFnZSk6IHN0cmluZyB7XG4gICAgaWYgKCFpbWFnZSkge1xuICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgICByZXR1cm4gaW1hZ2UubW9kYWwgJiYgaW1hZ2UubW9kYWwuZGVzY3JpcHRpb24gPyBpbWFnZS5tb2RhbC5kZXNjcmlwdGlvbiA6IGBJbWFnZSAke2dldEluZGV4KGltYWdlLCB0aGlzLmltYWdlcykgKyAxfWA7XG4gIH1cblxuICAvKipcbiAgICogTWV0aG9kIHRvIGdldCB0aGUgdGl0bGUgYXR0cmlidXRlcyBiYXNlZCBvbiBkZXNjcmlwdGlvbnMuXG4gICAqIFRoaXMgaXMgdXNlZnVsIHRvIHByZXZlbnQgYWNjZXNzaWJpbGl0eSBpc3N1ZXMsIGJlY2F1c2UgaWYgRGVzY3JpcHRpb25TdHJhdGVneSBpcyBBTFdBWVNfSElEREVOLFxuICAgKiBpdCBwcmV2ZW50cyBhbiBlbXB0eSBzdHJpbmcgYXMgdGl0bGUuXG4gICAqIEBwYXJhbSBJbWFnZSBpbWFnZSB0byBnZXQgaXRzIGRlc2NyaXB0aW9uLiBJZiBub3QgcHJvdmlkZWQgaXQgd2lsbCBiZSB0aGUgY3VycmVudCBpbWFnZVxuICAgKiBAcmV0dXJucyBTdHJpbmcgdGl0bGUgb2YgdGhlIGltYWdlIGJhc2VkIG9uIGRlc2NyaXB0aW9uc1xuICAgKiBAdGhyb3dzIGFuIEVycm9yIGlmIGRlc2NyaXB0aW9uIGlzbid0IGF2YWlsYWJsZVxuICAgKi9cbiAgZ2V0VGl0bGVUb0Rpc3BsYXkoaW1hZ2U6IEltYWdlID0gdGhpcy5jdXJyZW50SW1hZ2UpOiBzdHJpbmcge1xuICAgIGlmICghdGhpcy5jb25maWdDdXJyZW50SW1hZ2UgfHwgIXRoaXMuY29uZmlnQ3VycmVudEltYWdlLmRlc2NyaXB0aW9ufgB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Rlc2NyaXB0aW9uIGlucHV0IG11c3QgYmUgYSB2YWxpZCBvYmplY3QgaW1wbGVtZW50aW5nIHRoZSBEZXNjcmlwdGlvbiBpbnRlcmZhY2UnKTtcbiAgICB9XG4gICAgY29uc3QgaW1hZ2VXaXRob3V0RGVzY3JpcHRpb246IGJvb2xlYW4gPSAhaW1hZ2UubW9kYWwgfHwgIWltYWdlLm1vZGFsLmRlc2NyaXB0aW9uIHx8IGltYWdlLm1vZGFsLmRlc2NyaXB0aW9uID09PSAnJztcbiAgICBjb25zdCBkZXNjcmlwdGlvbjogc3RyaW5nID0gdGhpcy5idWlsZFRleHREZXNjcmlwdGlvbihpbWFnZSwgaW1hZ2VXaXRob3V0RGVzY3JpcHRpb24pO1xuICAgIHJldHVybiBkZXNjcmlwdGlvbjtcbiAgfVxuXG4gIC8qKlxuICAgKiBNZXRob2QgdG8gZ2V0IHRoZSBsZWZ0IHNpZGUgcHJldmlldyBpbWFnZS5cbiAgICogQHJldHVybnMgSW1hZ2UgdGhlIGltYWdlIHRvIHNob3cgYXMgc2l6ZSBwcmV2aWV3IG9uIHRoZSBsZWZ0XG4gICAqL1xuICBnZXRMZWZ0UHJldmlld0ltYWdlKCk6IEltYWdlIHtcbiAgICBjb25zdCBjdXJyZW50SW5kZXg6IG51bWJlciA9IGdldEluZGV4KHRoaXMuY3VycmVudEltYWdlLCB0aGlzLmltYWdlcyk7XG4gICAgaWYgKGN1cnJlbnRJbmRleCA9PT0gMCAmJiB0aGlzLnNsaWRlQ29uZmlnLmluZmluaXRlfgB7XG4gICAgICAvLyB0aGUgY3VycmVudCBpbWFnZSBpcyB0aGUgZmlyc3Qgb25lLFxuICAgICAgLy8gc28gdGhlIHByZXZpb3VzIG9uZSBpcyB0aGUgbGFzdCBpbWFnZVxuICAgICAgLy8gYmVjYXVzZSBpbmZpbml0ZSBpcyB0cnVlXG4gICAgICByZXR1cm4gdGhpcy5pbWFnZXNbdGhpcy5pbWFnZXMubGVuZ3RoIC0gMV07XG4gICAgfVxuICAgIHRoaXMuaGFuZGxlQm91bmRhcmllcyhjdXJyZW50SW5kZXgpO1xuICAgIHJldHVybiB0aGlzLmltYWdlc1tNYXRoLm1heChjdXJyZW50SW5kZXggLSAxLCAwKV07XG4gIH1cblxuICAvKipcbiAgICogTWV0aG9kIHRvIGdldCB0aGUgcmlnaHQgc2lkZSBwcmV2aWV3IGltYWdlLlxuICAgKiBAcmV0dXJucyBJbWFnZSB0aGUgaW1hZ2UgdG8gc2hvdyBhcyBzaXplIHByZXZpZXcgb24gdGhlIHJpZ2h0XG4gICAqL1xuICBnZXRSaWdodFByZXZpZXdJbWFnZSgpOiBJbWFnZSB7XG4gICAgY29uc3QgY3VycmVudEluZGV4OiBudW1iZXIgPSBnZXRJbmRleCh0aGlzLmN1cnJlbnRJbWFnZSwgdGhpcy5pbWFnZXMpO1xuICAgIGlmIChjdXJyZW50SW5kZXggPT09IHRoaXMuaW1hZ2VzLmxlbmd0aCAtIDEgJiYgdGhpcy5zbGlkZUNvbmZpZy5pbmZpbml0ZSkge1xuICAgICAgLy8gdGhlIGN1cnJlbnQgaW1hZ2UgaXMgdGhlIGxhc3Qgb25lLFxuICAgICAgLy8gc28gdGhlIG5leHQgb25lIGlzIHRoZSBmaXJzdCBpbWFnZVxuICAgICAgLy8gYmVjYXVzZSBpbmZpbml0ZSBpcyB0cnVlXG4gICAgICByZXR1cm4gdGhpcy5pbWFnZXNbMF07XG4gICAgfVxuICAgIHRoaXMuaGFuZGxlQm91bmRhcmllcyhjdXJyZW50SW5kZXgpO1xuICAgIHJldHVybiB0aGlzLmltYWdlc1tNYXRoLm1pbihjdXJyZW50SW5kZXggKyAxLCB0aGlzLmltYWdlcy5sZW5ndGggLSAxKV07XG4gIH1cblxuICAvKipcbiAgICogTWV0aG9kIGNhbGxlZCBieSBldmVudHMgZnJvbSBib3RoIGtleWJvYXJkIGFuZCBtb3VzZSBvbiBhbiBpbWFnZS5cbiAgICogVGhpcyB3aWxsIGludm9rZSB0aGUgbmV4dEltYWdlIG1ldGhvZC5cbiAgICogQHBhcmFtIEtleWJvYXJkRXZlbnQgfCBNb3VzZUV2ZW50IGV2ZW50IHBheWxvYWRcbiAgICogQHBhcmFtIEFjdGlvbiBhY3Rpb24gdGhhdCB0cmlnZ2VyZWQgdGhlIGV2ZW50IG9yIGBBY3Rpb24uTk9STUFMYCBpZiBub3QgcHJvdmlkZWRcbiAgICovXG4gIG9uSW1hZ2VFdmVudChldmVudDogS2V5Ym9hcmRFdmVudCB8IE1vdXNlRXZlbnQsIGFjdGlvbjogQWN0aW9uID0gQWN0aW9uLk5PUk1BTCkge1xuICAgIC8vIGNoZWNrIGlmIHRyaWdnZXJlZCBieSBhIG1vdXNlIGNsaWNrXG4gICAgLy8gSWYgeWVzLCBJdCBzaG91bGQgYmxvY2sgbmF2aWdhdGlvbiB3aGVuIG5hdmlnYXRlT25DbGljayBpcyBmYWxzZVxuICAgIGlmIChhY3Rpb24gPT09IEFjdGlvbi5DTElDSyAmJiAhdGhpcy5jb25maWdDdXJyZW50SW1hZ2UubmF2aWdhdGVPbkNsaWNrfgB7XG4gICAgICAvLyBhIHVzZXIgaGFzIHJlcXVlc3RlZCB0byBibG9jayBuYXZpZ2F0aW9uIHZpYSBjb25maWdDdXJyZW50SW1hZ2UubmF2aWdhdGVPbkNsaWNrIHByb3BlcnR5XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgcmVzdWx0OiBudW1iZXIgPSBzdXBlci5oYW5kbGVJbWFnZUV2ZW50KGV2ZW50KTtcbiAgICBpZiAocmVzdWx0ID09PSBORVhUfgB7XG4gICAgICB0aGlzLm5leHRJbWFnZShhY3Rpb24pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBNZXRob2QgY2FsbGVkIGJ5IGV2ZW50cyBmcm9tIGJvdGgga2V5Ym9hcmQgYW5kIG1vdXNlIG9uIGEgbmF2aWdhdGlvbiBhcnJvdy5cbiAgICogQHBhcmFtIHN0cmluZyBkaXJlY3Rpb24gb2YgdGhlIG5hdmlnYXRpb24gdGhhdCBjYW4gYmUgZWl0aGVyICduZXh0JyBvciAncHJldidcbiAgICogQHBhcmFtIEtleWJvYXJkRXZlbnQgfCBNb3VzZUV2ZW50IGV2ZW50IHBheWxvYWRcbiAgICogQHBhcmFtIEFjdGlvbiBhY3Rpb24gdGhhdCB0cmlnZ2VyZWQgdGhlIGV2ZW50IG9yIGBBY3Rpb24uTk9STUFMYCBpZiBub3QgcHJvdmlkZWRcbiAgICovXG4gIG9uTmF2aWdhdGlvbkV2ZW50KGRpcmVjdGlvbjogc3RyaW5nLCBldmVudDogS2V5Ym9hcmRFdmVudCwgYWN0aW9uOiBBY3Rpb24gPSBBY3Rpb24uTk9STUFMfgB7XG4gICAgY29uc3QgcmVzdWx0OiBudW1iZXIgPSBzdXBlci5oYW5kbGVOYXZpZ2F0aW9uRXZlbnQoZGlyZWN0aW9uLCBldmVudCk7XG4gICAgaWYgKHJlc3VsdCA9PT0gTkVYVCkge1xuICAgICAgdGhpcy5uZXh0SW1hZ2UoYWN0aW9uKTtcbiAgICB9IGVsc2UgaWYgKHJlc3VsdCA9PT0gUFJFVikge1xuICAgICAgdGhpcy5wcmV2SW1hZ2UoYWN0aW9uKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogTWV0aG9kIHRvIGdvIGJhY2sgdG8gdGhlIHByZXZpb3VzIGltYWdlLlxuICAgKiBAcGFyYW0gYWN0aW9uIEVudW0gb2YgdHlwZSBgQWN0aW9uYCB0aGF0IHJlcHJlc2VudHMgdGhlIHNvdXJjZVxuICAgKiAgYWN0aW9uIHRoYXQgbW92ZWQgYmFjayB0byB0aGUgcHJldmlvdXMgaW1hZ2UuIGBBY3Rpb24uTk9STUFMYCBieSBkZWZhdWx0LlxuICAgKi9cbiAgcHJldkltYWdlKGFjdGlvbjogQWN0aW9uID0gQWN0aW9uLk5PUk1BTCkge1xuICAgIC8vIGNoZWNrIGlmIHByZXZJbWFnZSBzaG91bGQgYmUgYmxvY2tlZFxuICAgIGlmICh0aGlzLmlzUHJldmVudFNsaWRpbmcoMCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgcHJldkltYWdlOiBJbnRlcm5hbExpYkltYWdlID0gdGhpcy5nZXRQcmV2SW1hZ2UoKTtcbiAgICB0aGlzLmxvYWRpbmcgPSAhcHJldkltYWdlLnByZXZpb3VzbHlMb2FkZWQ7XG4gICAgdGhpcy5jaGFuZ2VJbWFnZS5lbWl0KG5ldyBJbWFnZU1vZGFsRXZlbnQoYWN0aW9uLCBnZXRJbmRleChwcmV2SW1hZ2UsIHRoaXMuaW1hZ2VzfgkpO1xuICB9XG5cbiAgLyoqXG4gICAqIE1ldGhvZCB0byBnbyBiYWNrIHRvIHRoZSBwcmV2aW91cyBpbWFnZS5cbiAgICogQHBhcmFtIGFjdGlvbiBFbnVtIG9mIHR5cGUgYEFjdGlvbmAgdGhhdCByZXByZXNlbnRzIHRoZSBzb3VyY2VcbiAgICogIGFjdGlvbiB0aGF0IG1vdmVkIHRvIHRoZSBuZXh0IGltYWdlLiBgQWN0aW9uLk5PUk1BTGAgYnkgZGVmYXVsdC5cbiAgICovXG4gIG5leHRJbWFnZShhY3Rpb246IEFjdGlvbiA9IEFjdGlvbi5OT1JNQUwpIHtcbiAgICAvLyBjaGVjayBpZiBuZXh0SW1hZ2Ugc2hvdWxkIGJlIGJsb2NrZWRcbiAgICBpZiAodGhpcy5pc1ByZXZlbnRTbGlkaW5nKHRoaXMuaW1hZ2VzLmxlbmd0aCAtIDEpfgB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IG5leHRJbWFnZTogSW50ZXJuYWxMaWJJbWFnZSA9IHRoaXMuZ2V0TmV4dEltYWdlKCk7XG4gICAgdGhpcy5sb2FkaW5nID0gIW5leHRJbWFnZS5wcmV2aW91c2x5TG9hZGVkO1xuICAgIHRoaXMuY2hhbmdlSW1hZ2UuZW1pdChuZXcgSW1hZ2VNb2RhbEV2ZW50KGFjdGlvbiwgZ2V0SW5kZXgobmV4dEltYWdlLCB0aGlzLmltYWdlcykpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBNZXRob2QgdG8gZW1pdCBhbiBldmVudCBhcyBsb2FfgW1hZ2Ugb3V0cHV0IHRvIHNheSB0aGF0IHRoZSByZXF1ZXN0ZWQgaW1hZ2UgaWYgbG9hZGVkLlxuICAgKiBUaGlzIG1ldGhvZCBpcyBpbnZva2VkIGJ5IHRoZSBqYXZhc2NyaXB0J3MgJ2xvYWQnIGV2ZW50IG9uIGFuIGltZyB0YWcuXG4gICAqIEBwYXJhbSBFdmVudCBldmVudCB0aGF0IHRyaWdnZXJlZCB0aGUgbG9hZFxuICAgKi9cbiAgb25JbWFnZUxvYWQoZXZlbnQ6IEV2ZW50fgB7XG4gICAgY29uc3QgbG9hZEltYWdlRGF0YTogSW1hZ2VMb2FkRXZlbnQgPSB7XG4gICAgICBzdGF0dXM6IHRydWUsXG4gICAgICBpbmRleDogZ2V0SW5kZXgodGhpcy5jdXJyZW50SW1hZ2UsIHRoaXMuaW1hZ2VzfgxcbiAgICAgIGlkOiB0aGlzLmN1cnJlbnRJbWFnZS5pZFxuICAgIH07XG5cbiAgICB0aGlzLmxvYWRJbWFnZS5lbWl0KGxvYWRJbWFnZURhdGEpO1xuXG4gICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG4gIH1cblxuICAvKipcbiAgICogTWV0aG9kIHVzZWQgYnkgSGFtbWVyanMgdG8gc3VwcG9ydCB0b3VjaCBnZXN0dXJlcyAoeW91IGNhbiBhbHNvIGludmVydCB0aGUgc3dpcGUgZGlyZWN0aW9uIHdpdGggY29uZmlnQ3VycmVudEltYWdlLmludmVydFN3aXBlfg5cbiAgICogQHBhcmFtIGFjdGlvbiBTdHJpbmcgdGhhdCByZXByZXNlbnQgdGhlIGRpcmVjdGlvbiBvZiB0aGUgc3dpcGUgYWN0aW9uLiAnc3dpcGVyaWdodCcgYnkgZGVmYXVsdC5cbiAgICovXG4gIHN3aXBlKGFjdGlvbiA9IHRoaXMuU1dJUEVfQUNUSU9OLlJJR0hUfgB7XG4gICAgc3dpdGNoIChhY3Rpb24pIHtcbiAgICAgIGNhc2UgdGhpcy5TV0lQRV9BQ1RJT04uUklHSFQ6XG4gICAgICAgIGlmICh0aGlzLmNvbmZpZ0N1cnJlbnRJbWFnZS5pbnZlcnRTd2lwZSkge1xuICAgICAgICAgIHRoaXMucHJldkltYWdlKEFjdGlvbi5TV0lQRSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5uZXh0SW1hZ2UoQWN0aW9uLlNXSVBFKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgdGhpcy5TV0lQRV9BQ1RJT04uTEVGVDpcbiAgICAgICAgaWYgKHRoaXMuY29uZmlnQ3VycmVudEltYWdlLmludmVydFN3aXBlfgB7XG4gICAgICAgICAgdGhpcy5uZXh0SW1hZ2UoQWN0aW9uLlNXSVBFKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnByZXZJbWFnZShBY3Rpb24uU1dJUEUpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgLy8gY2FzZSB0aGlzLlNXSVBFX0FDVElPTi5VUDpcbiAgICAgIC8vICAgYnJlYWs7XG4gICAgICAvLyBjYXNlIHRoaXMuU1dJUEVfQUNUSU9OLkRPV046XG4gICAgICAvLyAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBNZXRob2QgdXNlZCBpbiBgbW9kYWwtZ2FsbGVyeS5jb21wb25lbnRgIHRvIGdldCB0aGUgaW5kZXggb2YgYW4gaW1hZ2UgdG8gZGVsZXRlLlxuICAgKiBAcGFyYW0gSW1hZ2UgaW1hZ2UgdG8gZ2V0IHRoZSBpbmRleCwgb3IgdGhlIHZpc2libGUgaW1hZ2UsIGlmIG5vdCBwYXNzZWRcbiAgICogQHJldHVybnMgbnVtYmVyIHRoZSBpbmRleCBvZiB0aGUgaW1hZ2VcbiAgICovXG4gIGdldEluZGV4VG9EZWxldGUoaW1hZ2U6IEltYWdlID0gdGhpcy5jdXJyZW50SW1hZ2UpOiBudW1iZXIge1xuICAgIHJldHVybiBnZXRJbmRleChpbWFnZSwgdGhpcy5pbWFnZXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIFByaXZhdGUgbWV0aG9kIHRvIHVwZGF0ZSBib3RoIGBpc0ZpcnN0SW1hZ2VgIGFuZCBgaXNMYXN0SW1hZ2VgIGJhc2VkIG9uXG4gICAqIHRoZSBpbmRleCBvZiB0aGUgY3VycmVudCBpbWFnZS5cbiAgICogQHBhcmFtIG51bWJlciBjdXJyZW50SW5kZXggaXMgdGhlIGluZGV4IG9mIHRoZSBjdXJyZW50IGltYWdlXG4gICAqL1xuICBwcml2YXRlIGhhbmRsZUJvdW5kYXJpZXMoY3VycmVudEluZGV4OiBudW1iZXIpIHtcbiAgICBpZiAodGhpcy5pbWFnZXMubGVuZ3RoID09PSAxfgB7XG4gICAgICB0aGlzLmlzRmlyc3RJbWFnZSA9IHRydWU7XG4gICAgICB0aGlzLmlzTGFzdEltYWdlID0gdHJ1ZTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKCF0aGlzLnNsaWRlQ29uZmlnIHx8IHRoaXMuc2xpZGVDb25maWcuaW5maW5pdGUgPT09IHRydWUpIHtcbiAgICAgIC8vIGluZmluaXRlIHNsaWRpbmcgZW5hYmxlZFxuICAgICAgdGhpcy5pc0ZpcnN0SW1hZ2UgPSBmYWxzZTtcbiAgICAgIHRoaXMuaXNMYXN0SW1hZ2UgPSBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3dpdGNoIChjdXJyZW50SW5kZXgpIHtcbiAgICAgICAgY2FzZSAwOlxuICAgICAgICAgIC8vIGV4ZWN1dGUgdGhpcyBvbmx5IGlmIGluZmluaXRlIHNsaWRpbmcgaXMgZGlzYWJsZWRcbiAgICAgICAgICB0aGlzLmlzRmlyc3RJbWFnZSA9IHRydWU7XG4gICAgICAgICAgdGhpcy5pc0xhc3RJbWFnZSA9IGZhbHNlO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIHRoaXMuaW1hZ2VzLmxlbmd0aCAtIDE6XG4gICAgICAgICAgLy8gZXhlY3V0ZSB0aGlzIG9ubHkgaWYgaW5maW5pdGUgc2xpZGluZyBpcyBkaXNhYmxlZFxuICAgICAgICAgIHRoaXMuaXNGaXJzdEltYWdlID0gZmFsc2U7XG4gICAgICAgICAgdGhpcy5pc0xhc3RJbWFnZSA9IHRydWU7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgdGhpcy5pc0ZpcnN0SW1hZ2UgPSBmYWxzZTtcbiAgICAgICAgICB0aGlzLmlzTGFzdEltYWdlID0gZmFsc2U7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFByaXZhdGUgbWV0aG9kIHRvIGNoZWNrIGlmIG5leHQvcHJldiBhY3Rpb25zIHNob3VsZCBiZSBibG9ja2VkLlxuICAgKiBJdCBjaGVja3MgaWYgc2xpZGVDb25maWcuaW5maW5pdGUgPT09IGZhbHNlIGFuZCBpZiB0aGUgaW1hZ2UgaW5kZXggaXMgZXF1YWxzIHRvIHRoZSBpbnB1dCBwYXJhbWV0ZXIuXG4gICAqIElmIHllcywgaXQgcmV0dXJucyB0cnVlIHRvIHNheSB0aGF0IHNsaWRpbmcgc2hvdWxkIGJlIGJsb2NrZWQsIG90aGVyd2lzZSBub3QuXG4gICAqIEBwYXJhbSBudW1iZXIgYm91bmRhcnlJbmRleCB0aGF0IGNvdWxkIGJlIGVpdGhlciB0aGUgYmVnaW5uaW5nIGluZGV4ICgwfgBvciB0aGUgbGFzdCBpbmRleFxuICAgKiAgb2YgaW1hZ2VzICh0aGlzLmltYWdlcy5sZW5ndGggLSAxfg5cbiAgICogQHJldHVybnMgYm9vbGVhbiB0cnVlIGlmIHNsaWRlQ29uZmlnLmluZmluaXRlID09PSBmYWxzZSBhbmQgdGhlIGN1cnJlbnQgaW5kZXggaXNcbiAgICogIGVpdGhlciB0aGUgZmlyc3Qgb3IgdGhlIGxhc3Qgb25lLlxuICAgKi9cbiAgcHJpdmF0ZSBpc1ByZXZlbnRTbGlkaW5nKGJvdW5kYXJ5SW5kZXg6IG51bWJlcik6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhIXRoaXMuc2xpZGVDb25maWcgJiYgdGhpcy5zbGlkZUNvbmZpZy5pbmZpbml0ZSA9PT0gZmFsc2UgJiYgZ2V0SW5kZXgodGhpcy5jdXJyZW50SW1hZ2UsIHRoaXMuaW1hZ2VzfgA9PT0gYm91bmRhcnlJbmRleDtcbiAgfVxuXG4gIC8qKlxuICAgKiBQcml2YXRlIG1ldGhvZCB0byBnZXQgdGhlIG5leHQgaW5kZXguXG4gICAqIFRoaXMgaXMgbmVjZXNzYXJ5IGJlY2F1c2UgYXQgdGhlIGVuZCwgd2hlbiB5b3UgY2FsbCBuZXh0IGFnYWluLCB5b3UnbGwgZ28gdG8gdGhlIGZpcnN0IGltYWdlLlxuICAgKiBUaGF0IGhhcHBlbnMgYmVjYXVzZSBhbGwgbW9kYWwgaW1hZ2VzIGFyZSBzaG93biBsaWtlIGluIGEgY2lyY2xlLlxuICAgKi9cbiAgcHJpdmF0ZSBnZXROZXh0SW1hZ2UoKTogSW50ZXJuYWxMaWJJbWFnZSB7XG4gICAgY29uc3QgY3VycmVudEluZGV4OiBudW1iZXIgPSBnZXRJbmRleCh0aGlzLmN1cnJlbnRJbWFnZSwgdGhpcy5pbWFnZXMpO1xuICAgIGxldCBuZXdJbmRleCA9IDA7XG4gICAgaWYgKGN1cnJlbnRJbmRleCA+PSAwICYmIGN1cnJlbnRJbmRleCA8IHRoaXMuaW1hZ2VzLmxlbmd0aCAtIDEpIHtcbiAgICAgIG5ld0luZGV4ID0gY3VycmVudEluZGV4ICsgMTtcbiAgICB9IGVsc2Uge1xuICAgICAgbmV3SW5kZXggPSAwOyAvLyBzdGFydCBmcm9tIHRoZSBmaXJzdCBpbmRleFxuICAgIH1cbiAgICByZXR1cm4gdGhpcy5pbWFnZXNbbmV3SW5kZXhdO1xuICB9XG5cbiAgLyoqXG4gICAqIFByaXZhdGUgbWV0aG9kIHRvIGdldCB0aGUgcHJldmlvdXMgaW5kZXguXG4gICAqIFRoaXMgaXMgbmVjZXNzYXJ5IGJlY2F1c2UgYXQgaW5kZXggMCwgd2hlbiB5b3UgY2FsbCBwcmV2IGFnYWluLCB5b3UnbGwgZ28gdG8gdGhlIGxhc3QgaW1hZ2UuXG4gICAqIFRoYXQgaGFwcGVucyBiZWNhdXNlIGFsbCBtb2RhbCBpbWFnZXMgYXJlIHNob3duIGxpa2UgaW4gYSBjaXJjbGUuXG4gICAqL1xuICBwcml2YXRlIGdldFByZXZJbWFnZSgpOiBJbnRlcm5hbExpYkltYWdlIHtcbiAgICBjb25zdCBjdXJyZW50SW5kZXg6IG51bWJlciA9IGdldEluZGV4KHRoaXMuY3VycmVudEltYWdlLCB0aGlzLmltYWdlcyk7XG4gICAgbGV0IG5ld0luZGV4ID0gMDtcbiAgICBpZiAoY3VycmVudEluZGV4ID4gMCAmJiBjdXJyZW50SW5kZXggPD0gdGhpcy5pbWFnZXMubGVuZ3RoIC0gMSkge1xuICAgICAgbmV3SW5kZXggPSBjdXJyZW50SW5kZXggLSAxO1xuICAgIH0gZWxzZSB7XG4gICAgICBuZXdJbmRleCA9IHRoaXMuaW1hZ2VzLmxlbmd0aCAtIDE7IC8vIHN0YXJ0IGZyb20gdGhlIGxhc3QgaW5kZXhcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuaW1hZ2VzW25ld0luZGV4XTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQcml2YXRlIG1ldGhvZCB0byBidWlsZCBhIHRleHQgZGVzY3JpcHRpb24uXG4gICAqIFRoaXMgaXMgdXNlZCBhbHNvIHRvIGNyZWF0ZSB0aXRsZXMuXG4gICAqIEBwYXJhbSBJbWFnZSBpbWFnZSB0byBnZXQgaXRzIGRlc2NyaXB0aW9uLiBJZiBub3QgcHJvdmlkZWQgaXQgd2lsbCBiZSB0aGUgY3VycmVudCBpbWFnZS5cbiAgICogQHBhcmFtIGJvb2xlYW4gaW1hZ2VXaXRob3V0RGVzY3JpcHRpb24gaXMgYSBib29sZWFuIHRoYXQgaXQncyB0cnVlIGlmIHRoZSBpbWFnZSBoYXNuJ3QgYSAnbW9kYWwnIGRlc2NyaXB0aW9uLlxuICAgKiBAcmV0dXJucyBTdHJpbmcgZGVzY3JpcHRpb24gYnVpbHQgY29uY2F0ZW5hdGluZyBpbWFnZSBmaWVsZHMgd2l0aCBhIHNwZWNpZmljIGxvZ2ljLlxuICAgKi9cbiAgcHJpdmF0ZSBidWlsZFRleHREZXNjcmlwdGlvbihpbWFnZTogSW1hZ2UsIGltYWdlV2l0aG91dERlc2NyaXB0aW9uOiBib29sZWFuKTogc3RyaW5nIHtcbiAgICBpZiAoIXRoaXMuY29uZmlnQ3VycmVudEltYWdlIHx8ICF0aGlzLmNvbmZpZ0N1cnJlbnRJbWFnZS5kZXNjcmlwdGlvbikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdEZXNjcmlwdGlvbiBpbnB1dCBtdXN0IGJlIGEgdmFsaWQgb2JqZWN0IGltcGxlbWVudGluZyB0aGUgRGVzY3JpcHRpb24gaW50ZXJmYWNlJyk7XG4gICAgfVxuXG4gICAgLy8gSWYgY3VzdG9tRnVsbERlc2NyaXB0aW9uIHVzZSBpdCwgb3RoZXJ3aXNlIHByb2NlZWQgdG8gYnVpbGQgYSBkZXNjcmlwdGlvblxuICAgIGlmICh0aGlzLmNvbmZpZ0N1cnJlbnRJbWFnZS5kZXNjcmlwdGlvbi5jdXN0b21GdWxsRGVzY3JpcHRpb24gJiYgdGhpcy5jb25maWdDdXJyZW50SW1hZ2UuZGVzY3JpcHRpb24uY3VzdG9tRnVsbERlc2NyaXB0aW9uICE9PSAnJykge1xuICAgICAgcmV0dXJuIHRoaXMuY29uZmlnQ3VycmVudEltYWdlLmRlc2NyaXB0aW9uLmN1c3RvbUZ1bGxEZXNjcmlwdGlvbjtcbiAgICB9XG5cbiAgICBjb25zdCBjdXJyZW50SW5kZXg6IG51bWJlciA9IGdldEluZGV4KGltYWdlLCB0aGlzLmltYWdlcyk7XG4gICAgLy8gSWYgdGhlIGN1cnJlbnQgaW1hZ2UgaGFzbid0IGEgZGVzY3JpcHRpb24sXG4gICAgLy8gcHJldmVudCB0byB3cml0ZSB0aGUgJyAtICcgKG9yIHRoaXMuZGVzY3JpcHRpb24uYmVmb3JlVGV4dERlc2NyaXB0aW9uKVxuXG4gICAgY29uc3QgcHJldkRlc2NyaXB0aW9uOiBzdHJpbmcgPSB0aGlzLmNvbmZpZ0N1cnJlbnRJbWFnZS5kZXNjcmlwdGlvbi5pbWFnZVRleHQgPyB0aGlzLmNvbmZpZ0N1cnJlbnRJbWFnZS5kZXNjcmlwdGlvbi5pbWFnZVRleHQgOiAnJztcbiAgICBjb25zdCBtaWRTZXBhcmF0b3I6IHN0cmluZyA9IHRoaXMuY29uZmlnQ3VycmVudEltYWdlLmRlc2NyaXB0aW9uLm51bWJlclNlcGFyYXRvciA/IHRoaXMuY29uZmlnQ3VycmVudEltYWdlLmRlc2NyaXB0aW9uLm51bWJlclNlcGFyYXRvciA6ICcnO1xuICAgIGNvbnN0IG1pZGRsZURlc2NyaXB0aW9uOiBzdHJpbmcgPSBjdXJyZW50SW5kZXggKyAxICsgbWlkU2VwYXJhdG9yICsgdGhpcy5pbWFnZXMubGVuZ3RoO1xuXG4gICAgaWYgKGltYWdlV2l0aG91dERlc2NyaXB0aW9ufgB7XG4gICAgICByZXR1cm4gcHJldkRlc2NyaXB0aW9uICsgbWlkZGxlRGVzY3JpcHRpb247XG4gICAgfVxuXG4gICAgY29uc3QgY3VyckltZ0Rlc2NyaXB0aW9uOiBzdHJpbmcgPSBpbWFnZS5tb2RhbCAmJiBpbWFnZS5tb2RhbC5kZXNjcmlwdGlvbiA/IGltYWdlLm1vZGFsLmRlc2NyaXB0aW9uIDogJyc7XG4gICAgY29uc3QgZW5kRGVzY3JpcHRpb246IHN0cmluZyA9IHRoaXMuY29uZmlnQ3VycmVudEltYWdlLmRlc2NyaXB0aW9uLmJlZm9yZVRleHREZXNjcmlwdGlvbiArIGN1cnJJbWdEZXNjcmlwdGlvbjtcbiAgICByZXR1cm4gcHJldkRlc2NyaXB0aW9uICsgbWlkZGxlRGVzY3JpcHRpb24gKyBlbmREZXNjcmlwdGlvbjtcbiAgfVxuXG4gIC8qKlxuICAgKiBQcml2YXRlIG1ldGhvZCB0byBjYWxsIGhhbmRsZUJvdW5kYXJpZXMgd2hlbiBuZ09uQ2hhbmdlcyBpcyBjYWxsZWQuXG4gICAqL1xuICBwcml2YXRlIHVwZGF0ZUluZGV4ZXMofgB7XG4gICAgbGV0IGluZGV4OiBudW1iZXI7XG4gICAgdHJ5IHtcbiAgICAgIGluZGV4ID0gZ2V0SW5kZXgodGhpcy5jdXJyZW50SW1hZ2UsIHRoaXMuaW1hZ2VzKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ0Nhbm5vdCBnZXQgdGhlIGN1cnJlbnQgaW1hZ2UgaW5kZXggaW4gY3VycmVudC1pbWFnZScpO1xuICAgICAgdGhyb3cgZXJyO1xuICAgIH1cbiAgICBpZiAodGhpcy5pc09wZW4pIHtcbiAgICAgIHRoaXMuaGFuZGxlQm91bmRhcmllcyhpbmRleCk7XG4gICAgfVxuICB9XG59XG4iLCIvKlxuIFRoZSBNSVQgTGljZW5zZSAoTUlUKVxuXG4gQ29weXJpZ2h0IChjfgAyMDE3LTIwMTggU3RlZmFubyBDYXBwYSAoS3M4OSlcblxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbiBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuXG4gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsXG4gY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cblxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OIElORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEVcbiBTT0ZUV0FSRS5cbiAqL1xuXG5pbXBvcnQgeyBTaXplIH0gZnJvbSAnLi9zaXplLmludGVyZmFjZSc7XG5cbi8qKlxuICogSW50ZXJmYWNlIGBQbGFpbkdhbGxlcnlDb25maWdgIHRvIGNvbmZpZ3VyZSBwbGFpbi1nYWxsZXJ5IGZlYXR1cmVzLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIFBsYWluR2FsbGVyeUNvbmZpZyB7XG4gIHN0cmF0ZWd5OiBQbGFpbkdhbGxlcnlTdHJhdGVneTtcbiAgbGF5b3V0OiBQbGFpbkdhbGxlcnlMYXlvdXQ7XG4gIGFkdmFuY2VkPzogQWR2YW5jZWRDb25maWc7XG59XG5cbi8qKlxuICogSW50ZXJmYWNlIGBQbGFpbkdhbGxlcnlMYXlvdXRgIHRvIGNvbmZpZ3VyZSB0aGUgbGF5b3V0LiBUaGlzIGludGVyZmFjZSBpc24ndCB1c2VkIGRpcmVjdGx5LCBpbnN0ZWFkXG4gKiByZWZlcnMgdG8gZWl0aGVyIGBMaW5lTGF5b3V0YCwgYEdyaWRMYXlvdXRgIG9yIGBBZHZhbmNlZExheW91dGAuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgUGxhaW5HYWxsZXJ5TGF5b3V0IHt9XG5cbi8qKlxuICogQ2xhc3MgYExpbmVMYXlvdXRgIHRvIGNvbmZpZ3VyZSBhIGxpbmVhciBwbGFpbiBnYWxsZXJ5LlxuICovXG5leHBvcnQgY2xhc3MgTGluZUxheW91dCBpbXBsZW1lbnRzIFBsYWluR2FsbGVyeUxheW91dCB7XG4gIGJyZWFrQ29uZmlnOiBCcmVha0NvbmZpZztcbiAganVzdGlmeTogc3RyaW5nO1xuICBzaXplOiBTaXplO1xuXG4gIGNvbnN0cnVjdG9yKHNpemU6IFNpemUsIGJyZWFrQ29uZmlnOiBCcmVha0NvbmZpZywganVzdGlmeTogc3RyaW5nfgB7XG4gICAgdGhpcy5zaXplID0gc2l6ZTtcbiAgICB0aGlzLmJyZWFrQ29uZmlnID0gYnJlYWtDb25maWc7XG4gICAgdGhpcy5qdXN0aWZ5ID0ganVzdGlmeTtcbiAgfVxufVxuXG4vKipcbiAqIENsYXNzIGBHcmlkTGF5b3V0YCB0byBjb25maWd1cmUgYSBncmlkIHBsYWluIGdhbGxlcnkuXG4gKi9cbmV4cG9ydCBjbGFzcyBHcmlkTGF5b3V0IGltcGxlbWVudHMgUGxhaW5HYWxsZXJ5TGF5b3V0IHtcbiAgYnJlYWtDb25maWc6IEJyZWFrQ29uZmlnO1xuICBzaXplOiBTaXplO1xuXG4gIGNvbnN0cnVjdG9yKHNpemU6IFNpemUsIGJyZWFrQ29uZmlnOiBCcmVha0NvbmZpZykge1xuICAgIHRoaXMuc2l6ZSA9IHNpemU7XG4gICAgdGhpcy5icmVha0NvbmZpZyA9IGJyZWFrQ29uZmlnO1xuICB9XG59XG5cbi8qKlxuICogQ2xhc3MgYEFkdmFuY2VkTGF5b3V0YCB0byBjb25maWd1cmUgYSBmdWxseSBjdXN0b20gcGxhaW4gZ2FsbGVyeS5cbiAqL1xuZXhwb3J0IGNsYXNzIEFkdmFuY2VkTGF5b3V0IGltcGxlbWVudHMgUGxhaW5HYWxsZXJ5TGF5b3V0IHtcbiAgbW9kYWxPcGVuZXJCeUluZGV4OiBudW1iZXI7XG4gIGhpZGVEZWZhdWx0UGxhaW5HYWxsZXJ5OiBib29sZWFuO1xuXG4gIGNvbnN0cnVjdG9yKG1vZGFsT3BlbmVyQnlJbmRleDogbnVtYmVyLCBoaWRlRGVmYXVsdFBsYWluR2FsbGVyeTogYm9vbGVhbikge1xuICAgIHRoaXMubW9kYWxPcGVuZXJCeUluZGV4ID0gbW9kYWxPcGVuZXJCeUluZGV4O1xuICAgIHRoaXMuaGlkZURlZmF1bHRQbGFpbkdhbGxlcnkgPSBoaWRlRGVmYXVsdFBsYWluR2FsbGVyeTtcbiAgfVxufVxuXG4vKipcbiAqIEVudW0gYFBsYWluR2FsbGVyeVN0cmF0ZWd5YCB0byBjaG9vc2UgdGhlIGJlaGF2aW91ciBvZiB0aGUgcGxhaW4gZ2FsbGVyeS5cbiAqL1xuZXhwb3J0IGVudW0gUGxhaW5HYWxsZXJ5U3RyYXRlZ3kge1xuICAvLyBkb24ndCB1c2UgMCBoZXJlXG4gIC8vIHRoZSBmaXJzdCBpbmRleCBpcyAxIGFuZCBhbGwgb2YgdGhlIGZvbGxvd2luZyBtZW1iZXJzIGFyZSBhdXRvLWluY3JlbWVudGVkIGZyb20gdGhhdCBwb2ludCBvblxuICBST1cgPSAxLFxuICBDT0xVTU4sXG4gIEdSSUQsXG4gIENVU1RPTSAvLyBmdWxsIGN1c3RvbSBzdHJhdGVneVxufVxuXG4vKipcbiAqIEludGVyZmFjZSBgQnJlYWtDb25maWdgIHRvIGxpbWl0IHRoZSBudW1iZXIgb2YgaXRlbXMgb2YgdGhlIHBsYWluIGdhbGxlcnkgb3IgdG8gZm9yY2UgaXQgdG8gZmlsbCBvdGhlciBsaW5lcy5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBCcmVha0NvbmZpZyB7XG4gIGxlbmd0aDogbnVtYmVyO1xuICB3cmFwOiBib29sZWFuO1xufVxuXG4vKipcbiAqIEludGVyZmFjZSBgQWR2YW5jZWRDb25maWdgIHRvIHVzZSBgPGE+YCB0YWdzIGluc3RlYWQgb2YgYDxpbWc+YC5cbiAqIEl0IGFsc28gY29udGFpbnMgYSBzdHJpbmcgcHJvcGVydHkgdG8gY3VzdG9taXplIHRoZSBjc3MgYmFja2dyb3VuZCBwcm9wZXJ0eS5cbiAqIEZvciBtb3JlIGluZm8gY2hlY2sgaGVyZSBodHRwczovL3d3dy53M3NjaG9vbHMuY29tL2Nzc3JlZi9jc3MzX3ByX2JhY2tncm91bmQuYXNwXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgQWR2YW5jZWRDb25maWcge1xuICBhVGFnczogYm9vbGVhbjtcbiAgYWRkaXRpb25hbEJhY2tncm91bmQ6IHN0cmluZztcbn1cbiIsImltcG9ydCB7IEFjY2Vzc2liaWxpdHlDb25maWcgfSBmcm9tICcuLi9tb2RlbC9hY2Nlc3NpYmlsaXR5LmludGVyZmFjZSc7XG5cbi8qKlxuICogRGVmYXVsdCBhY2Nlc3NpYmlsaXR5IGNvbmZpZ3VyYXRpb24uXG4gKi9cbmV4cG9ydCBjb25zdCBLU19ERUZBVUxUX0FDQ0VTU0lCSUxJVFlfQ09ORklHOiBBY2Nlc3NpYmlsaXR5Q29uZmlnID0ge1xuICBiYWNrZ3JvdW5kQXJpYUxhYmVsOiAnTW9kYWwgZ2FsbGVyeSBmdWxsIHNjcmVlbiBiYWNrZ3JvdW5kJyxcbiAgYmFja2dyb3VuZFRpdGxlOiAnJyxcblxuICBwbGFpbkdhbGxlcnlDb250ZW50QXJpYUxhYmVsOiAnUGxhaW4gZ2FsbGVyeSBjb250ZW50JyxcbiAgcGxhaW5HYWxsZXJ5Q29udGVudFRpdGxlOiAnJyxcblxuICBtb2RhbEdhbGxlcnlDb250ZW50QXJpYUxhYmVsOiAnTW9kYWwgZ2FsbGVyeSBjb250ZW50JyxcbiAgbW9kYWxHYWxsZXJ5Q29udGVudFRpdGxlOiAnJyxcblxuICBsb2FkaW5nU3Bpbm5lckFyaWFMYWJlbDogJ1RoZSBjdXJyZW50IGltYWdlIGlzIGxvYWRpbmcuIFBsZWFzZSBiZSBwYXRpZW50LicsXG4gIGxvYWRpbmdTcGlubmVyVGl0bGU6ICdUaGUgY3VycmVudCBpbWFnZSBpcyBsb2FkaW5nLiBQbGVhc2UgYmUgcGF0aWVudC4nLFxuXG4gIG1haW5Db250YWluZXJBcmlhTGFiZWw6ICdDdXJyZW50IGltYWdlIGFuZCBuYXZpZ2F0aW9uJyxcbiAgbWFpbkNvbnRhaW5lclRpdGxlOiAnJyxcbiAgbWFpblByZXZJbWFnZUFyaWFMYWJlbDogJ1ByZXZpb3VzIGltYWdlJyxcbiAgbWFpblByZXZJbWFnZVRpdGxlOiAnUHJldmlvdXMgaW1hZ2UnLFxuICBtYWluTmV4dEltYWdlQXJpYUxhYmVsOiAnTmV4dCBpbWFnZScsXG4gIG1haW5OZXh0SW1hZ2VUaXRsZTogJ05leHQgaW1hZ2UnLFxuXG4gIGRvdHNDb250YWluZXJBcmlhTGFiZWw6ICdJbWFnZSBuYXZpZ2F0aW9uIGRvdHMnLFxuICBkb3RzQ29udGFpbmVyVGl0bGU6ICcnLFxuICBkb3RBcmlhTGFiZWw6ICdOYXZpZ2F0ZSB0byBpbWFnZSBudW1iZXInLFxuXG4gIHByZXZpZXdzQ29udGFpbmVyQXJpYUxhYmVsOiAnSW1hZ2UgcHJldmlld3MnLFxuICBwcmV2aWV3c0NvbnRhaW5lclRpdGxlOiAnJyxcbiAgcHJldmlld1Njcm9sbFByZXZBcmlhTGFiZWw6ICdTY3JvbGwgcHJldmlvdXMgcHJldmlld3MnLFxuICBwcmV2aWV3U2Nyb2xsUHJldlRpdGxlOiAnU2Nyb2xsIHByZXZpb3VzIHByZXZpZXdzJyxcbiAgcHJldmlld1Njcm9sbE5leHRBcmlhTGFiZWw6ICdTY3JvbGwgbmV4dCBwcmV2aWV3cycsXG4gIHByZXZpZXdTY3JvbGxOZXh0VGl0bGU6ICdTY3JvbGwgbmV4dCBwcmV2aWV3cydcbn07XG4iLCIvKlxuIFRoZSBNSVQgTGljZW5zZSAoTUlUKVxuXG4gQ29weXJpZ2h0IChjfgAyMDE3LTIwMTggU3RlZmFubyBDYXBwYSAoS3M4OSlcblxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbiBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuXG4gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsXG4gY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cblxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OIElORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEVcbiBTT0ZUV0FSRS5cbiAqL1xuXG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgRXZlbnRFbWl0dGVyLFxuICBIb3N0TGlzdGVuZXIsXG4gIEluamVjdCxcbiAgSW5wdXQsXG4gIE9uQ2hhbmdlcyxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIE91dHB1dCxcbiAgUExBVEZPUk1fSUQsXG4gIFNpbXBsZUNoYW5nZSxcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgVmlld0NoaWxkXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgaXNQbGF0Zm9ybUJyb3dzZXIsIGlzUGxhdGZvcm1TZXJ2ZXIgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5pbXBvcnQgeyBCdXR0b25FdmVudCwgQnV0dG9uc0NvbmZpZyB9IGZyb20gJy4uLy4uL21vZGVsL2J1dHRvbnMtY29uZmlnLmludGVyZmFjZSc7XG5pbXBvcnQgeyBJbWFnZSwgSW1hZ2VNb2RhbEV2ZW50IH0gZnJvbSAnLi4vLi4vbW9kZWwvaW1hZ2UuY2xhc3MnO1xuaW1wb3J0IHsgQWN0aW9uIH0gZnJvbSAnLi4vLi4vbW9kZWwvYWN0aW9uLmVudW0nO1xuaW1wb3J0IHsgS2V5Ym9hcmRDb25maWcgfSBmcm9tICcuLi8uLi9tb2RlbC9rZXlib2FyZC1jb25maWcuaW50ZXJmYWNlJztcbmltcG9ydCB7IFByZXZpZXdDb25maWcgfSBmcm9tICcuLi8uLi9tb2RlbC9wcmV2aWV3LWNvbmZpZy5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgU2xpZGVDb25maWcgfSBmcm9tICcuLi8uLi9tb2RlbC9zbGlkZS1jb25maWcuaW50ZXJmYWNlJztcbmltcG9ydCB7IEFjY2Vzc2liaWxpdHlDb25maWcgfSBmcm9tICcuLi8uLi9tb2RlbC9hY2Nlc3NpYmlsaXR5LmludGVyZmFjZSc7XG5pbXBvcnQgeyBLZXlib2FyZFNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9rZXlib2FyZC5zZXJ2aWNlJztcbmltcG9ydCB7IEdhbGxlcnlTZXJ2aWNlLCBJbnRlcm5hbEdhbGxlcnlQYXlsb2FkIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvZ2FsbGVyeS5zZXJ2aWNlJztcbmltcG9ydCB7IERvdHNDb25maWcgfSBmcm9tICcuLi8uLi9tb2RlbC9kb3RzLWNvbmZpZy5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgQ3VycmVudEltYWdlQ29tcG9uZW50LCBJbWFnZUxvYWRFdmVudCB9IGZyb20gJy4uL2N1cnJlbnQtaW1hZ2UvY3VycmVudC1pbWFnZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgSW50ZXJuYWxMaWJJbWFnZSB9IGZyb20gJy4uLy4uL21vZGVsL2ltYWdlLWludGVybmFsLmNsYXNzJztcbmltcG9ydCB7IEFkdmFuY2VkTGF5b3V0LCBQbGFpbkdhbGxlcnlDb25maWcgfSBmcm9tICcuLi8uLi9tb2RlbC9wbGFpbi1nYWxsZXJ5LWNvbmZpZy5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgS1NfREVGQVVMVF9BQ0NFU1NJQklMSVRZX0NPTkZJRyB9IGZyb20gJy4uL2FjY2Vzc2liaWxpdHktZGVmYXVsdCc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzL1N1YnNjcmlwdGlvbic7XG5pbXBvcnQgeyBDdXJyZW50SW1hZ2VDb25maWcgfSBmcm9tICcuLi8uLi9tb2RlbC9jdXJyZW50LWltYWdlLWNvbmZpZy5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgZ2V0SW5kZXggfSBmcm9tICcuLi8uLi91dGlscy9pbWFnZS51dGlsJztcblxuLyoqXG4gKiBNYWluIENvbXBvbmVudCBvZiB0aGlzIGxpYnJhcnkgd2l0aCBib3RoIHRoZSBwbGFpbiBhbmQgbW9kYWwgZ2FsbGVyaWVzLlxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdrcy1tb2RhbC1nYWxsZXJ5JyxcbiAgZXhwb3J0QXM6ICdrc01vZGFsR2FsbGVyeScsXG4gIHN0eWxlVXJsczogWydtb2RhbC1nYWxsZXJ5LnNjc3MnXSxcbiAgdGVtcGxhdGVVcmw6ICdtb2RhbC1nYWxsZXJ5Lmh0bWwnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBNb2RhbEdhbGxlcnlDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSwgT25DaGFuZ2VzIHtcbiAgLyoqXG4gICAqIFVuaXF1ZSBpZCAoPj0wfgBvZiB0aGUgY3VycmVudCBpbnN0YW5jZSBvZiB0aGlzIGxpYnJhcnkuIFRoaXMgaXMgdXNlZnVsIHdoZW4geW91IGFyZSB1c2luZ1xuICAgKiB0aGUgc2VydmljZSB0byBjYWxsIG1vZGFsIGdhbGxlcnkgd2l0aG91dCBvcGVuIGl0IG1hbnVhbGx5LlxuICAgKiBSaWdodCBub3cgaXMgb3B0aW9uYWwsIGJ1dCBpbiB1cGNvbWluZyBtYWpvciByZWxlYXNlcyB3aWxsIGJlIG1hbmRhdG9yeSEhIVxuICAgKi9cbiAgQElucHV0KClcbiAgaWQ6IG51bWJlcjtcbiAgLyoqXG4gICAqIEFycmF5IG9mIGBJbWFnZWAgdGhhdCByZXByZXNlbnQgdGhlIG1vZGVsIG9mIHRoaXMgbGlicmFyeSB3aXRoIGFsbCBpbWFnZXMsIHRodW1icyBhbmQgc28gb24uXG4gICAqL1xuICBASW5wdXQoKVxuICBtb2RhbEltYWdlczogSW1hZ2VbXTtcbiAgLyoqXG4gICAqIE9iamVjdCBvZiB0eXBlIGBCdXR0b25zQ29uZmlnYCB0byBzaG93L2hpZGUgYnV0dG9ucy5cbiAgICovXG4gIEBJbnB1dCgpXG4gIGJ1dHRvbnNDb25maWc6IEJ1dHRvbnNDb25maWc7XG4gIC8qKlxuICAgKiBCb29sZWFuIHRvIGVuYWJsZSBtb2RhbC1nYWxsZXJ5IGNsb3NlIGJlaGF2aW91ciB3aGVuIGNsaWNraW5nXG4gICAqIG9uIHRoZSBzZW1pLXRyYW5zcGFyZW50IGJhY2tncm91bmQuIEVuYWJsZWQgYnkgZGVmYXVsdC5cbiAgICovXG4gIEBJbnB1dCgpXG4gIGVuYWJsZUNsb3NlT3V0c2lkZSA9IHRydWU7XG4gIC8qKlxuICAgKiBJbnRlcmZhY2UgdG8gY29uZmlndXJlIGN1cnJlbnQgaW1hZ2UgaW4gbW9kYWwtZ2FsbGVyeS5cbiAgICogRm9yIGluc3RhbmNlIHlvdSBjYW4gZGlzYWJsZSBuYXZpZ2F0aW9uIG9uIGNsaWNrIG9uIGN1cnJlbnQgaW1hZ2UgKGVuYWJsZWQgYnkgZGVmYXVsdCkuXG4gICAqL1xuICBASW5wdXQoKVxuICBjdXJyZW50SW1hZ2VDb25maWc6IEN1cnJlbnRJbWFnZUNvbmZpZztcbiAgLyoqXG4gICAqIE9iamVjdCBvZiB0eXBlIGBEb3RzQ29uZmlnYCB0byBpbml0IERvdHNDb21wb25lbnQncyBmZWF0dXJlcy5cbiAgICogRm9yIGluc3RhbmNlLCBpdCBjb250YWlucyBhIHBhcmFtIHRvIHNob3cvaGlkZSBkb3RzLlxuICAgKi9cbiAgQElucHV0KClcbiAgZG90c0NvbmZpZzogRG90c0NvbmZpZztcbiAgLyoqXG4gICAqIE9iamVjdCBvZiB0eXBlIGBQcmV2aWV3Q29uZmlnYCB0byBpbml0IFByZXZpZXdzQ29tcG9uZW50J3MgZmVhdHVyZXMuXG4gICAqIEZvciBpbnN0YW5jZSwgaXQgY29udGFpbnMgYSBwYXJhbSB0byBzaG93L2hpZGUgcHJldmlld3MuXG4gICAqL1xuICBASW5wdXQoKVxuICBwcmV2aWV3Q29uZmlnOiBQcmV2aWV3Q29uZmlnO1xuICAvKipcbiAgICogT2JqZWN0IG9mIHR5cGUgYFNsaWRlQ29uZmlnYCB0byBpbml0IHNpZGUgcHJldmlld3MgYW5kIGBpbmZpbml0ZSBzbGlkaW5nYC5cbiAgICovXG4gIEBJbnB1dCgpXG4gIHNsaWRlQ29uZmlnOiBTbGlkZUNvbmZpZyA9IHtcbiAgICBpbmZpbml0ZTogZmFsc2UsXG4gICAgc2lkZVByZXZpZXdzOiB7IHNob3c6IHRydWUsIHNpemU6IHsgd2lkdGg6ICcxMDBweCcsIGhlaWdodDogJ2F1dG8nIH0gfVxuICB9O1xuICAvKipcbiAgICogT2JqZWN0IG9mIHR5cGUgYEFjY2Vzc2liaWxpdHlDb25maWdgIHRvIGluaXQgY3VzdG9tIGFjY2Vzc2liaWxpdHkgZmVhdHVyZXMuXG4gICAqIEZvciBpbnN0YW5jZSwgaXQgY29udGFpbnMgdGl0bGVzLCBhbHQgdGV4dHMsIGFyaWEtbGFiZWxzIGFuZCBzbyBvbi5cbiAgICovXG4gIEBJbnB1dCgpXG4gIGFjY2Vzc2liaWxpdHlDb25maWc6IEFjY2Vzc2liaWxpdHlDb25maWcgPSBLU19ERUZBVUxUX0FDQ0VTU0lCSUxJVFlfQ09ORklHO1xuICAvKipcbiAgICogT2JqZWN0IG9mIHR5cGUgYEtleWJvYXJkQ29uZmlnYCB0byBhc3NpZ24gY3VzdG9tIGtleXMgdG8gRVNDLCBSSUdIVCBhbmQgTEVGVCBrZXlib2FyZCdzIGFjdGlvbnMuXG4gICAqL1xuICBASW5wdXQoKVxuICBrZXlib2FyZENvbmZpZzogS2V5Ym9hcmRDb25maWc7XG4gIC8qKlxuICAgKiBPYmplY3Qgb2YgdHlwZSBgUGxhaW5HYWxsZXJ5Q29uZmlnYCB0byBjb25maWd1cmUgdGhlIHBsYWluIGdhbGxlcnkuXG4gICAqL1xuICBASW5wdXQoKVxuICBwbGFpbkdhbGxlcnlDb25maWc6IFBsYWluR2FsbGVyeUNvbmZpZztcblxuICAvKipcbiAgICogT3V0cHV0IHRvIGVtaXQgYW4gZXZlbnQgd2hlbiB0aGUgbW9kYWwgZ2FsbGVyeSBpcyBjbG9zZWQuXG4gICAqL1xuICBAT3V0cHV0KClcbiAgY2xvc2U6IEV2ZW50RW1pdHRlcjxJbWFnZU1vZGFsRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxJbWFnZU1vZGFsRXZlbnQ+KCk7XG4gIC8qKlxuICAgKiBPdXRwdXQgdG8gZW1pdCBhbiBldmVudCB3aGVuIGFuIGltYWdlIGlzIGNoYW5nZWQuXG4gICAqL1xuICBAT3V0cHV0KClcbiAgc2hvdzogRXZlbnRFbWl0dGVyPEltYWdlTW9kYWxFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPEltYWdlTW9kYWxFdmVudD4oKTtcbiAgLyoqXG4gICAqIE91dHB1dCB0byBlbWl0IGFuIGV2ZW50IHdoZW4gdGhlIGN1cnJlbnQgaW1hZ2UgaXMgdGhlIGZpcnN0IG9uZS5cbiAgICovXG4gIEBPdXRwdXQoKVxuICBmaXJzdEltYWdlOiBFdmVudEVtaXR0ZXI8SW1hZ2VNb2RhbEV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8SW1hZ2VNb2RhbEV2ZW50PigpO1xuICAvKipcbiAgICogT3V0cHV0IHRvIGVtaXQgYW4gZXZlbnQgd2hlbiB0aGUgY3VycmVudCBpbWFnZSBpcyB0aGUgbGFzdCBvbmUuXG4gICAqL1xuICBAT3V0cHV0KClcbiAgbGFzdEltYWdlOiBFdmVudEVtaXR0ZXI8SW1hZ2VNb2RhbEV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8SW1hZ2VNb2RhbEV2ZW50PigpO1xuICAvKipcbiAgICogT3V0cHV0IHRvIGVtaXQgYW4gZXZlbnQgd2hlbiB0aGUgbW9kYWwgZ2FsbGVyeSBpcyBjbG9zZWQuXG4gICAqL1xuICBAT3V0cHV0KClcbiAgaGFzRGF0YTogRXZlbnRFbWl0dGVyPEltYWdlTW9kYWxFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPEltYWdlTW9kYWxFdmVudD4oKTtcbiAgLyoqXG4gICAqIE91dHB1dCB0byBlbWl0IGFuIGV2ZW50IHdoZW4gYSBidXR0b24gaXMgY2xpY2tlZCwgYnV0IGJlZm9yZSB0aGF0IHRoZSBhY3Rpb24gaXMgdHJpZ2dlcmVkLlxuICAgKi9cbiAgQE91dHB1dCgpXG4gIGJ1dHRvbkJlZm9yZUhvb2s6IEV2ZW50RW1pdHRlcjxCdXR0b25FdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPEJ1dHRvbkV2ZW50PigpO1xuICAvKipcbiAgICogT3V0cHV0IHRvIGVtaXQgYW4gZXZlbnQgd2hlbiBhIGJ1dHRvbiBpcyBjbGlja2VkLCBidXQgYWZ0ZXIgdGhhdCB0aGUgYWN0aW9uIGlzIHRyaWdnZXJlZC5cbiAgICovXG4gIEBPdXRwdXQoKVxuICBidXR0b25BZnRlckhvb2s6IEV2ZW50RW1pdHRlcjxCdXR0b25FdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPEJ1dHRvbkV2ZW50PigpO1xuXG4gIC8qKlxuICAgKiBSZWZlcmVuY2UgdG8gdGhlIEN1cnJlbnRJbWFnZUNvbXBvbmVudCB0byBpbnZva2UgbWV0aG9kcyBvbiBpdC5cbiAgICovXG4gIEBWaWV3Q2hpbGQoQ3VycmVudEltYWdlQ29tcG9uZW50KVxuICBjdXJyZW50SW1hZ2VDb21wb25lbnQ7XG5cbiAgLyoqXG4gICAqIEJvb2xlYW4gdGhhdCBpdCBpcyB0cnVlIGlmIHRoZSBtb2RhbCBnYWxsZXJ5IGlzIHZpc2libGUuIEZhbHNlIGJ5IGRlZmF1bHQuXG4gICAqL1xuICBvcGVuZWQgPSBmYWxzZTtcbiAgLyoqXG4gICAqIEJvb2xlYW4gdG8gb3BlbiB0aGUgbW9kYWwgZ2FsbGVyeS4gRmFsc2UgYnkgZGVmYXVsdC5cbiAgICovXG4gIHNob3dHYWxsZXJ5ID0gZmFsc2U7XG4gIC8qKlxuICAgKiBBcnJheSBvZiBgSW50ZXJuYWxMaWJJbWFnZWAgcmVwcmVzZW50aW5nIHRoZSBtb2RlbCBvZiB0aGlzIGxpYnJhcnkgd2l0aCBhbGwgaW1hZ2VzLCB0aHVtYnMgYW5kIHNvIG9uLlxuICAgKi9cbiAgaW1hZ2VzOiBJbnRlcm5hbExpYkltYWdlW107XG4gIC8qKlxuICAgKiBgSW1hZ2VgIHRoYXQgaXMgdmlzaWJsZSByaWdodCBub3cuXG4gICAqL1xuICBjdXJyZW50SW1hZ2U6IEludGVybmFsTGliSW1hZ2U7XG5cbiAgcHJpdmF0ZSBnYWxsZXJ5U2VydmljZU5hdmlnYXRlU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG4gIHByaXZhdGUgZ2FsbGVyeVNlcnZpY2VDbG9zZVN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuICBwcml2YXRlIGdhbGxlcnlTZXJ2aWNlVXBkYXRlU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgLyoqXG4gICAqIEhvc3RMaXN0ZW5lciB0byBjYXRjaCBicm93c2VyJ3MgYmFjayBidXR0b24gYW5kIGRlc3Ryb3kgdGhlIGdhbGxlcnkuXG4gICAqIFRoaXMgcHJldmVudHMgd2VpcmVkIGJlaGF2aW91ciBhYm91dCBzY3JvbGxpbmcuXG4gICAqIEFkZGVkIHRvIGZpeCB0aGlzIGlzc3VlOiBodHRwczovL2dpdGh1Yi5jb20vS3M4OS9hbmd1bGFyLW1vZGFsLWdhbGxlcnkvaXNzdWVzLzE1OVxuICAgKi9cbiAgQEhvc3RMaXN0ZW5lcignd2luZG93OnBvcHN0YXRlJywgWyckZXZlbnQnXSlcbiAgb25Qb3BTdGF0ZShlOiBFdmVudCkge1xuICAgIHRoaXMuY2xvc2VHYWxsZXJ5KCk7XG4gIH1cblxuICAvKipcbiAgICogQ29uc3RydWN0b3Igd2l0aCB0aGUgaW5qZWN0aW9uIG9mIMOCwrRLZXlib2FyZFNlcnZpY2XDgsK0IGFuZCBhbiBvYmplY3QgdG8gc3VwcG9ydCBTZXJ2ZXItU2lkZSBSZW5kZXJpbmcuXG4gICAqL1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGtleWJvYXJkU2VydmljZTogS2V5Ym9hcmRTZXJ2aWNlLFxuICAgIHByaXZhdGUgZ2FsbGVyeVNlcnZpY2U6IEdhbGxlcnlTZXJ2aWNlLFxuICAgIEBJbmplY3QoUExBVEZPUk1fSUQpIHByaXZhdGUgcGxhdGZvcm1JZDogT2JqZWN0LFxuICAgIHByaXZhdGUgY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmXG4gICkge31cblxuICAvKipcbiAgICogTWV0aG9kIMOCwrRuZ09uSW5pdMOCwrQgdG8gaW5pdCBpbWFnZXMgY2FsbGluZyBgaW5pdEltYWdlcygpYC5cbiAgICogVGhpcyBpcyBhbiBBbmd1bGFyJ3MgbGlmZWN5Y2xlIGhvb2ssIHNvIGl0cyBjYWxsZWQgYXV0b21hdGljYWxseSBieSBBbmd1bGFyIGl0c2VsZi5cbiAgICogSW4gcGFydGljdWxhciwgaXQncyBjYWxsZWQgb25seSBvbmUgdGltZSEhIVxuICAgKi9cbiAgbmdPbkluaXQofgB7XG4gICAgLy8gaWQgaXMgYSBtYW5kYXRvcnkgaW5wdXQgYW5kIG11c3QgYSBudW1iZXIgPiAwXG4gICAgaWYgKCghdGhpcy5pZCAmJiB0aGlzLmlkICE9PSAwfgB8fCB0aGlzLmlkIDwgMCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICBgJ1tpZF09XCJhIG51bWJlciA+PSAwXCInIGlzIGEgbWFuZGF0b3J5IGlucHV0IGZyb20gNi4wLjAgaW4gYW5ndWxhci1tb2RhbC1nYWxsZXJ5LmAgK1xuICAgICAgICAgIGBJZiB5b3UgYXJlIHVzaW5nIG11bHRpcGxlIGluc3RhbmNlcyBvZiB0aGlzIGxpYnJhcnfgIHBsZWFzZSBiZSBzdXJlIHRvIHVzZSBkaWZmZXJlbnQgaWRzYFxuICAgICAgKTtcbiAgICB9XG5cbiAgICAvLyBjYWxsIGluaXRJbWFnZXMgdG8gaW5pdCBpbWFnZXMgYW5kIHRvIGVtaXQgYGhhc0RhdGFgIGV2ZW50XG4gICAgdGhpcy5pbml0SW1hZ2VzKCk7XG5cbiAgICB0aGlzLmdhbGxlcnlTZXJ2aWNlTmF2aWdhdGVTdWJzY3JpcHRpb24gPSB0aGlzLmdhbGxlcnlTZXJ2aWNlLm5hdmlnYXRlLnN1YnNjcmliZSgocGF5bG9hZDogSW50ZXJuYWxHYWxsZXJ5UGF5bG9hZCkgPT4ge1xuICAgICAgaWYgKCFwYXlsb2FkfgB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIC8vIGlmIGdhbGxlcnlJZCBpcyBub3QgdmFsaWQgT1IgZ2FsbGVyeUlkIGlzIHJlbGF0ZWQgdG8gYW5vdGhlciBpbnN0YW5jZSBhbmQgbm90IHRoaXMgb25lXG4gICAgICBpZiAocGF5bG9hZC5nYWxsZXJ5SWQgPT09IHVuZGVmaW5lZCB8fCBwYXlsb2FkLmdhbGxlcnlJZCA8IDAgfHwgcGF5bG9hZC5nYWxsZXJ5SWQgIT09IHRoaXMuaWQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgLy8gaWYgaW1hZ2UgaW5kZXggaXMgbm90IHZhbGlkXG4gICAgICBpZiAocGF5bG9hZC5pbmRleCA8IDAgfHwgcGF5bG9hZC5pbmRleCA+IHRoaXMuaW1hZ2VzLmxlbmd0aCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB0aGlzLnNob3dNb2RhbEdhbGxlcnkocGF5bG9hZC5pbmRleCwgdHJ1ZSk7XG4gICAgfSk7XG5cbiAgICB0aGlzLmdhbGxlcnlTZXJ2aWNlQ2xvc2VTdWJzY3JpcHRpb24gPSB0aGlzLmdhbGxlcnlTZXJ2aWNlLmNsb3NlLnN1YnNjcmliZSgoZ2FsbGVyeUlkOiBudW1iZXIpID0+IHtcbiAgICAgIGlmIChnYWxsZXJ5SWQgPCAwIHx8IHRoaXMuaWQgIT09IGdhbGxlcnlJZCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB0aGlzLmNsb3NlR2FsbGVyeShBY3Rpb24uTk9STUFMLCB0cnVlKTtcbiAgICB9KTtcblxuICAgIHRoaXMuZ2FsbGVyeVNlcnZpY2VVcGRhdGVTdWJzY3JpcHRpb24gPSB0aGlzLmdhbGxlcnlTZXJ2aWNlLnVwZGF0ZS5zdWJzY3JpYmUoKHBheWxvYWQ6IEludGVybmFsR2FsbGVyeVBheWxvYWQpID0+IHtcbiAgICAgIGlmICghcGF5bG9hZCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICAvLyBpZiBnYWxsZXJ5SWQgaXMgbm90IHZhbGlkIE9SIGdhbGxlcnlJZCBpcyByZWxhdGVkIHRvIGFub3RoZXIgaW5zdGFuY2UgYW5kIG5vdCB0aGlzIG9uZVxuICAgICAgaWYgKHBheWxvYWQuZ2FsbGVyeUlkID09PSB1bmRlZmluZWQgfHwgcGF5bG9hZC5nYWxsZXJ5SWQgPCAwIHx8IHBheWxvYWQuZ2FsbGVyeUlkICE9PSB0aGlzLmlkfgB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIC8vIGlmIGVpdGhlciBpbWFnZSBpbmRleCBvciBpbWFnZSBhcmUgbm90IHZhbGlkXG4gICAgICBpZiAocGF5bG9hZC5pbmRleCA8IDAgfHwgcGF5bG9hZC5pbmRleCA+IHRoaXMuaW1hZ2VzLmxlbmd0aCB8fCAhcGF5bG9hZC5pbWFnZSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBjb25zdCBjdXJyZW50SW5kZXg6IG51bWJlciA9IGdldEluZGV4KHBheWxvYWQuaW1hZ2UsIHRoaXMuaW1hZ2VzKTtcbiAgICAgIHRoaXMuaW1hZ2VzID0gdGhpcy5pbWFnZXMubWFwKChpbWFnZTogSW50ZXJuYWxMaWJJbWFnZSwgaW5kZXg6IG51bWJlcikgPT4ge1xuICAgICAgICBpZiAoaW5kZXggPT09IHBheWxvYWQuaW5kZXgpIHtcbiAgICAgICAgICByZXR1cm4gPEludGVybmFsTGliSW1hZ2U+cGF5bG9hZC5pbWFnZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaW1hZ2U7XG4gICAgICB9KTtcbiAgICAgIGlmIChjdXJyZW50SW5kZXggPT09IHBheWxvYWQuaW5kZXgpw4LCoHtcbiAgICAgICAgdGhpcy5jdXJyZW50SW1hZ2UgPSB0aGlzLmltYWdlc1twYXlsb2FkLmluZGV4XTtcbiAgICAgIH1cbiAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogTWV0aG9kIMOCwrRuZ09uQ2hhbmdlc8OCwrQgdG8gcmUtaW5pdCBpbWFnZXMgaWYgaW5wdXQgaXMgY2hhbmdlZC5cbiAgICogVGhpcyBpcyBhbiBBbmd1bGFyJ3MgbGlmZWN5Y2xlIGhvb2ssIHNvIGl0cyBjYWxsZWQgYXV0b21hdGljYWxseSBieSBBbmd1bGFyIGl0c2VsZi5cbiAgICogSW4gcGFydGljdWxhciwgaXQncyBjYWxsZWQgYmVmb3JlIGBuZ09uSW5pdCgpYCBhbmQgd2hlbmV2ZXIgb25lIG9yIG1vcmUgZGF0YS1ib3VuZCBpbnB1dCBwcm9wZXJ0aWVzIGNoYW5nZS5cbiAgICogQHBhcmFtIGNoYW5nZXMgYFNpbXBsZUNoYW5nZXNgIG9iamVjdCBvZiBjdXJyZW50IGFuZCBwcmV2aW91cyBwcm9wZXJ0eSB2YWx1ZXMgcHJvdmlkZWQgYnkgQW5ndWxhci5cbiAgICovXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICBjb25zdCBpbWFnZXNDaGFuZ2U6IFNpbXBsZUNoYW5nZSA9IGNoYW5nZXMubW9kYWxJbWFnZXM7XG4gICAgY29uc3QgcGxhaW5HYWxsZXJ5Q29uZmlnQ2hhbmdlOiBTaW1wbGVDaGFuZ2UgPSBjaGFuZ2VzLnBsYWluR2FsbGVyeUNvbmZpZztcblxuICAgIGlmIChpbWFnZXNDaGFuZ2UgJiYgIWltYWdlc0NoYW5nZS5maXJzdENoYW5nZSAmJiBpbWFnZXNDaGFuZ2UucHJldmlvdXNWYWx1ZSAhPT0gaW1hZ2VzQ2hhbmdlLmN1cnJlbnRWYWx1ZSkge1xuICAgICAgdGhpcy5pbml0SW1hZ2VzKCk7XG4gICAgfVxuXG4gICAgaWYgKHBsYWluR2FsbGVyeUNvbmZpZ0NoYW5nZSkge1xuICAgICAgLy8gY29uc3QgcHJldlBsYWluR2FsbGVyeUNvbmZpZ0NoYW5nZTogYW55ID0gcGxhaW5HYWxsZXJ5Q29uZmlnQ2hhbmdlLnByZXZpb3VzVmFsdWU7XG4gICAgICBjb25zdCBjdXJyUGxhaW5HYWxsZXJ5Q29uZmlnQ2hhbmdlOiBQbGFpbkdhbGxlcnlDb25maWcgPSBwbGFpbkdhbGxlcnlDb25maWdDaGFuZ2UuY3VycmVudFZhbHVlO1xuICAgICAgaWYgKFxuICAgICAgICBjdXJyUGxhaW5HYWxsZXJ5Q29uZmlnQ2hhbmdlLmxheW91dCAmJlxuICAgICAgICBjdXJyUGxhaW5HYWxsZXJ5Q29uZmlnQ2hhbmdlLmxheW91dCBpbnN0YW5jZW9mIEFkdmFuY2VkTGF5b3V0ICYmXG4gICAgICAgIGN1cnJQbGFpbkdhbGxlcnlDb25maWdDaGFuZ2UubGF5b3V0Lm1vZGFsT3BlbmVyQnlJbmRleCAhPT0gLTFcbiAgICAgICkge1xuICAgICAgICAvLyBjb25zb2xlLmxvZygnb3BlbmluZyBtb2RhbCBnYWxsZXJ5IGZyb20gY3VzdG9tIHBsYWluIGdhbGxlcnfgIGluZGV4OiAnLCBjdXJyUGxhaW5HYWxsZXJ5Q29uZmlnQ2hhbmdlKTtcbiAgICAgICAgdGhpcy5zaG93TW9kYWxHYWxsZXJ5KGN1cnJQbGFpbkdhbGxlcnlDb25maWdDaGFuZ2UubGF5b3V0Lm1vZGFsT3BlbmVyQnlJbmRleCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIE1ldGhvZCBjYWxsZWQgYnkgY3VzdG9tIHVwcGVyIGJ1dHRvbnMuXG4gICAqIEBwYXJhbSBCdXR0b25FdmVudCBldmVudCBwYXlsb2FkXG4gICAqL1xuICBvbkN1c3RvbUVtaXQoZXZlbnQ6IEJ1dHRvbkV2ZW50fgB7XG4gICAgY29uc3QgZXZlbnRUb0VtaXQ6IEJ1dHRvbkV2ZW50ID0gdGhpcy5nZXRCdXR0b25FdmVudFRvRW1pdChldmVudCk7XG4gICAgdGhpcy5idXR0b25CZWZvcmVIb29rLmVtaXQoZXZlbnRUb0VtaXQpO1xuICAgIC8vIGNvbnNvbGUubG9nKCdvbiBvbkN1c3RvbUVtaXQnLCBldmVudFRvRW1pdCk7XG4gICAgdGhpcy5idXR0b25BZnRlckhvb2suZW1pdChldmVudFRvRW1pdCk7XG4gIH1cblxuICAvLyBUT0RPIGltcGxlbWVudCBvbiByZWZyZXNoXG4gIC8vIC8qKlxuICAvLyAgKiBNZXRob2QgY2FsbGVkIGJ5IHRoZSByZWZyZXNoIHVwcGVyIGJ1dHRvbi5cbiAgLy8gICogU1RJTEwgTk9UIElNUExFTUVOVEVELCBTTyBET04nVCBVU0UgSVRcbiAgLy8gICogQHBhcmFtIEJ1dHRvbkV2ZW50IGV2ZW50IHBheWxvYWRcbiAgLy8gICovXG4gIC8vIG9uUmVmcmVzaChldmVudDogQnV0dG9uRXZlbnQpIHtcbiAgLy8gICBjb25zdCBldmVudFRvRW1pdDogQnV0dG9uRXZlbnQgPSB0aGlzLmdldEJ1dHRvbkV2ZW50VG9FbWl0KGV2ZW50KTtcbiAgLy9cbiAgLy8gICB0aGlzLmJ1dHRvbkJlZm9yZUhvb2suZW1pdChldmVudFRvRW1pdCk7XG4gIC8vICAgLy8gY29uc29sZS5sb2coJ1RPRE8gaW1wbGVtZW50IG9uIHJlZnJlc2ggaW5zaWRlIHRoZSBsaWJyYXJ5JywgZXZlbnRUb0VtaXQpO1xuICAvL1xuICAvLyAgIHRoaXMuY3VycmVudEltYWdlID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5jdXJyZW50SW1hZ2UsIHsgcHJldmlvdXNseUxvYWRlZDogZmFsc2UgfSk7XG4gIC8vXG4gIC8vICAgLy8gVE9ETyBhZGQgbG9naWMgdG8gaGlkZSBhbmQgc2hvdyB0aGUgY3VycmVudCBpbWFnZVxuICAvL1xuICAvLyAgIC8vIGNvbnNvbGUubG9nKCdvblJlZnJlc2gnLCB0aGlzLmN1cnJlbnRJbWFnZSk7XG4gIC8vXG4gIC8vICAgLy8gY29uc3QgaW5kZXhOdW06IG51bWJlciA9IHRoaXMuY3VycmVudEltYWdlQ29tcG9uZW50LmdldEluZGV4KCk7XG4gIC8vXG4gIC8vICAgLy8gdGhpcy5pbWFnZXMgPSB0aGlzLmltYWdlcy5tYXAoKHZhbDogSW50ZXJuYWxMaWJJbWFnZSwgaW5kZXg6IG51bWJlcikgPT4ge1xuICAvLyAgIC8vICAgaWYgKGluZGV4ICE9PSAyfgB7XG4gIC8vICAgLy8gICAgIHJldHVybiB2YWw7XG4gIC8vICAgLy8gICB9IGVsc2Uge1xuICAvLyAgIC8vICAgICBjb25zdCBpbWc6IEludGVybmFsTGliSW1hZ2UgPSBPYmplY3QuYXNzaWduKHt9LCB2YWwsIHtwcmV2aW91c2x5TG9hZGVkOiBmYWxzZX0pO1xuICAvLyAgIC8vICAgICByZXR1cm4gaW1nO1xuICAvLyAgIC8vICAgfVxuICAvLyAgIC8vIH0pO1xuICAvLyAgIC8vXG4gIC8vICAgLy8gdGhpcy5jbG9zZUdhbGxlcnkoKTtcbiAgLy8gICAvLyB0aGlzLnNob3dNb2RhbEdhbGxlcnkoMik7XG4gIC8vXG4gIC8vICAgdGhpcy5idXR0b25BZnRlckhvb2suZW1pdChldmVudFRvRW1pdCk7XG4gIC8vIH1cblxuICAvKipcbiAgICogTWV0aG9kIGNhbGxlZCBieSB0aGUgZnVsbC1zY3JlZW4gdXBwZXIgYnV0dG9uLlxuICAgKiBAcGFyYW0gQnV0dG9uRXZlbnQgZXZlbnQgcGF5bG9hZFxuICAgKi9cbiAgb25GdWxsU2NyZWVuKGV2ZW50OiBCdXR0b25FdmVudCkge1xuICAgIGNvbnN0IGV2ZW50VG9FbWl0OiBCdXR0b25FdmVudCA9IHRoaXMuZ2V0QnV0dG9uRXZlbnRUb0VtaXQoZXZlbnQpO1xuICAgIHRoaXMuYnV0dG9uQmVmb3JlSG9vay5lbWl0KGV2ZW50VG9FbWl0KTtcblxuICAgIGNvbnN0IGRvYzogYW55ID0gPGFueT5kb2N1bWVudDtcbiAgICBjb25zdCBkb2NFbDogYW55ID0gPGFueT5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG5cbiAgICBjb25zdCBmdWxsc2NyZWVuRGlzYWJsZWQ6IGJvb2xlYW4gPSAhZG9jLmZ1bGxzY3JlZW5FbGVtZW50ICYmICFkb2Mud2Via2l0RnVsbHNjcmVlbkVsZW1lbnQgJiYgIWRvYy5tb3pGdWxsU2NyZWVuRWxlbWVudCAmJiAhZG9jLm1zRnVsbHNjcmVlbkVsZW1lbnQ7XG5cbiAgICBpZiAoZnVsbHNjcmVlbkRpc2FibGVkfgB7XG4gICAgICBpZiAoZG9jRWwucmVxdWVzdEZ1bGxzY3JlZW4pIHtcbiAgICAgICAgZG9jRWwucmVxdWVzdEZ1bGxzY3JlZW4oKTtcbiAgICAgIH0gZWxzZSBpZiAoZG9jRWwud2Via2l0UmVxdWVzdEZ1bGxzY3JlZW4pIHtcbiAgICAgICAgZG9jRWwud2Via2l0UmVxdWVzdEZ1bGxzY3JlZW4oKTtcbiAgICAgIH0gZWxzZSBpZiAoZG9jRWwubW96UmVxdWVzdEZ1bGxTY3JlZW4pIHtcbiAgICAgICAgZG9jRWwubW96UmVxdWVzdEZ1bGxTY3JlZW4oKTtcbiAgICAgIH0gZWxzZSBpZiAoZG9jRWwubXNSZXF1ZXN0RnVsbHNjcmVlbikge1xuICAgICAgICBkb2NFbC5tc1JlcXVlc3RGdWxsc2NyZWVuKCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChkb2MuZXhpdEZ1bGxzY3JlZW4pIHtcbiAgICAgICAgZG9jLmV4aXRGdWxsc2NyZWVuKCk7XG4gICAgICB9IGVsc2UgaWYgKGRvYy5tc0V4aXRGdWxsc2NyZWVufgB7XG4gICAgICAgIGRvYy5tc0V4aXRGdWxsc2NyZWVuKCk7XG4gICAgICB9IGVsc2UgaWYgKGRvYy5tb3pDYW5jZWxGdWxsU2NyZWVufgB7XG4gICAgICAgIGRvYy5tb3pDYW5jZWxGdWxsU2NyZWVuKCk7XG4gICAgICB9IGVsc2UgaWYgKGRvYy53ZWJraXRFeGl0RnVsbHNjcmVlbikge1xuICAgICAgICBkb2Mud2Via2l0RXhpdEZ1bGxzY3JlZW4oKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLmJ1dHRvbkFmdGVySG9vay5lbWl0KGV2ZW50VG9FbWl0KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBNZXRob2QgY2FsbGVkIGJ5IHRoZSBkZWxldGUgdXBwZXIgYnV0dG9uLlxuICAgKiBAcGFyYW0gQnV0dG9uRXZlbnQgZXZlbnQgcGF5bG9hZFxuICAgKi9cbiAgb25EZWxldGUoZXZlbnQ6IEJ1dHRvbkV2ZW50fgB7XG4gICAgY29uc3QgZXZlbnRUb0VtaXQ6IEJ1dHRvbkV2ZW50ID0gdGhpcy5nZXRCdXR0b25FdmVudFRvRW1pdChldmVudCk7XG4gICAgdGhpcy5idXR0b25CZWZvcmVIb29rLmVtaXQoZXZlbnRUb0VtaXQpO1xuXG4gICAgaWYgKHRoaXMuaW1hZ2VzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgdGhpcy5jbG9zZUdhbGxlcnkoKTtcbiAgICB9XG5cbiAgICBjb25zdCBpbWFnZUluZGV4VG9EZWxldGU6IG51bWJlciA9IHRoaXMuY3VycmVudEltYWdlQ29tcG9uZW50LmdldEluZGV4VG9EZWxldGUoZXZlbnQuaW1hZ2UpO1xuICAgIGlmIChpbWFnZUluZGV4VG9EZWxldGUgPT09IHRoaXMuaW1hZ2VzLmxlbmd0aCAtIDEpIHtcbiAgICAgIC8vIGxhc3QgaW1hZ2VcbiAgICAgIHRoaXMuY3VycmVudEltYWdlQ29tcG9uZW50LnByZXZJbWFnZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmN1cnJlbnRJbWFnZUNvbXBvbmVudC5uZXh0SW1hZ2UoKTtcbiAgICB9XG5cbiAgICB0aGlzLmJ1dHRvbkFmdGVySG9vay5lbWl0KGV2ZW50VG9FbWl0KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBNZXRob2QgY2FsbGVkIGJ5IHRoZSBuYXZpZ2F0ZSB1cHBlciBidXR0b24uXG4gICAqIEBwYXJhbSBCdXR0b25FdmVudCBldmVudCBwYXlsb2FkXG4gICAqL1xuICBvbk5hdmlnYXRlKGV2ZW50OiBCdXR0b25FdmVudCkge1xuICAgIGNvbnN0IGV2ZW50VG9FbWl0OiBCdXR0b25FdmVudCA9IHRoaXMuZ2V0QnV0dG9uRXZlbnRUb0VtaXQoZXZlbnQpO1xuICAgIHRoaXMuYnV0dG9uQmVmb3JlSG9vay5lbWl0KGV2ZW50VG9FbWl0KTtcbiAgICAvLyBUbyBzdXBwb3J0IFNTUlxuICAgIGlmIChpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpfgB7XG4gICAgICBpZiAoZXZlbnRUb0VtaXQuaW1hZ2UgJiYgZXZlbnRUb0VtaXQuaW1hZ2UubW9kYWwuZXh0VXJsfgB7XG4gICAgICAgIC8vIHdoZXJlIEkgc2hvdWxkIG9wZW4gdGhpcyBsaW5rPyBUaGUgY3VycmVudCB0YWIgb3IgYW5vdGhlciBvbmU/XG4gICAgICAgIGlmIChldmVudFRvRW1pdC5idXR0b24gJiYgZXZlbnRUb0VtaXQuYnV0dG9uLmV4dFVybEluTmV3VGFifgB7XG4gICAgICAgICAgd2luZG93Lm9wZW4oZXZlbnRUb0VtaXQuaW1hZ2UubW9kYWwuZXh0VXJsLCAnX2JsYW5rJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBldmVudFRvRW1pdC5pbWFnZS5tb2RhbC5leHRVcmw7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5idXR0b25BZnRlckhvb2suZW1pdChldmVudFRvRW1pdCk7XG4gIH1cblxuICAvKipcbiAgICogTWV0aG9kIGNhbGxlZCBieSB0aGUgZG93bmxvYWQgdXBwZXIgYnV0dG9uLlxuICAgKiBAcGFyYW0gQnV0dG9uRXZlbnQgZXZlbnQgcGF5bG9hZFxuICAgKi9cbiAgb25Eb3dubG9hZChldmVudDogQnV0dG9uRXZlbnQpIHtcbiAgICBjb25zdCBldmVudFRvRW1pdDogQnV0dG9uRXZlbnQgPSB0aGlzLmdldEJ1dHRvbkV2ZW50VG9FbWl0KGV2ZW50KTtcbiAgICB0aGlzLmJ1dHRvbkJlZm9yZUhvb2suZW1pdChldmVudFRvRW1pdCk7XG4gICAgdGhpcy5kb3dubG9hZEltYWdlKCk7XG4gICAgdGhpcy5idXR0b25BZnRlckhvb2suZW1pdChldmVudFRvRW1pdCk7XG4gIH1cblxuICAvKipcbiAgICogTWV0aG9kIGNhbGxlZCBieSB0aGUgY2xvc2UgdXBwZXIgYnV0dG9uLlxuICAgKiBAcGFyYW0gQnV0dG9uRXZlbnQgZXZlbnQgcGF5bG9hZFxuICAgKiBAcGFyYW0gQWN0aW9uIGFjdGlvbiB0aGF0IHRyaWdnZXJlZCB0aGUgY2xvc2UgbWV0aG9kLiBgQWN0aW9uLk5PUk1BTGAgYnkgZGVmYXVsdFxuICAgKi9cbiAgb25DbG9zZUdhbGxlcnkoZXZlbnQ6IEJ1dHRvbkV2ZW50LCBhY3Rpb246IEFjdGlvbiA9IEFjdGlvbi5OT1JNQUwpIHtcbiAgICBjb25zdCBldmVudFRvRW1pdDogQnV0dG9uRXZlbnQgPSB0aGlzLmdldEJ1dHRvbkV2ZW50VG9FbWl0KGV2ZW50KTtcbiAgICB0aGlzLmJ1dHRvbkJlZm9yZUhvb2suZW1pdChldmVudFRvRW1pdCk7XG4gICAgdGhpcy5jbG9zZUdhbGxlcnkoYWN0aW9uKTtcbiAgICB0aGlzLmJ1dHRvbkFmdGVySG9vay5lbWl0KGV2ZW50VG9FbWl0KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBNZXRob2QgdG8gY2xvc2UgdGhlIG1vZGFsIGdhbGxlcnkgc3BlY2lmeWluZyB0aGUgYWN0aW9uLlxuICAgKiBJdCBhbHNvIHJlc2V0IHRoZSBga2V5Ym9hcmRTZXJ2aWNlYCB0byBwcmV2ZW50IG11bHRpcGxlIGxpc3RlbmVycy5cbiAgICogQHBhcmFtIEFjdGlvbiBhY3Rpb24gdHlwZS4gYEFjdGlvbi5OT1JNQUxgIGJ5IGRlZmF1bHRcbiAgICogQHBhcmFtIGJvb2xlYW4gaXNDYWxsZWRCeVNlcnZpY2UgaXMgdHJ1ZSBpZiBjYWxsZWQgYnkgZ2FsbGVyeS5zZXJ2aWNlLCBvdGhlcndpc2UgZmFsc2VcbiAgICovXG4gIGNsb3NlR2FsbGVyeShhY3Rpb246IEFjdGlvbiA9IEFjdGlvbi5OT1JNQUwsIGlzQ2FsbGVkQnlTZXJ2aWNlOiBib29sZWFuID0gZmFsc2UpIHtcbiAgICB0aGlzLmNsb3NlLmVtaXQobmV3IEltYWdlTW9kYWxFdmVudChhY3Rpb24sIHRydWUpKTtcbiAgICB0aGlzLm9wZW5lZCA9IGZhbHNlO1xuICAgIHRoaXMua2V5Ym9hcmRTZXJ2aWNlLnJlc2V0KCk7XG5cbiAgICAvLyBzaG93cyBzY3JvbGxiYXJcbiAgICBkb2N1bWVudC5ib2R5LnN0eWxlLm92ZXJmbG93ID0gJ3Zpc2libGUnO1xuXG4gICAgaWYgKGlzQ2FsbGVkQnlTZXJ2aWNlfgB7XG4gICAgICAvLyB0aGUgZm9sbG93aW5nIGlzIHJlcXVpcmVkLCBvdGhlcndpc2UgdGhlIHZpZXcgd2lsbCBub3QgYmUgdXBkYXRlZFxuICAgICAgLy8gdGhpcyBoYXBwZW5zIG9ubHkgaWYgY2FsbGVkIGJ5IGdhbGxlcnkuc2VydmljZVxuICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogTWV0aG9kIGNhbGxlZCB3aGVuIHlvdSBjbGljayBvbiBhbiBpbWFnZSBvZiB5b3VyIHBsYWluIChvciBpbmxpbmUpIGdhbGxlcnkuXG4gICAqIEBwYXJhbSBudW1iZXIgaW5kZXggb2YgdGhlIGNsaWNrZWQgaW1hZ2VcbiAgICovXG4gIG9uU2hvd01vZGFsR2FsbGVyeShpbmRleDogbnVtYmVyfgB7XG4gICAgdGhpcy5zaG93TW9kYWxHYWxsZXJ5KGluZGV4KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBNZXRob2QgdG8gc2hvdyB0aGUgbW9kYWwgZ2FsbGVyeSBkaXNwbGF5aW5nIHRoZSBpbWFnZSB3aXRoXG4gICAqIHRoZSBpbmRleCBzcGVjaWZpZWQgYXMgaW5wdXQgcGFyYW1ldGVyLlxuICAgKiBJdCB3aWxsIGFsc28gcmVnaXN0ZXIgYSBuZXcgYGtleWJvYXJkU2VydmljZWAgdG8gY2F0Y2gga2V5Ym9hcmQncyBldmVudHMgdG8gZG93bmxvYWQgdGhlIGN1cnJlbnRcbiAgICogaW1hZ2Ugd2l0aCBrZXlib2FyZCdzIHNob3J0Y3V0cy4gVGhpcyBzZXJ2aWNlLCB3aWxsIGJlIHJlbW92ZWQgZWl0aGVyIHdoZW4gbW9kYWwgZ2FsbGVyeSBjb21wb25lbnRcbiAgICogd2lsbCBiZSBkZXN0cm95ZWQgb3Igd2hlbiB0aGUgZ2FsbGVyeSBpcyBjbG9zZWQgaW52b2tpbmcgdGhlIGBjbG9zZUdhbGxlcnlgIG1ldGhvZC5cbiAgICogQHBhcmFtIG51bWJlciBpbmRleCBvZiB0aGUgaW1hZ2UgdG8gc2hvd1xuICAgKiBAcGFyYW0gYm9vbGVhbiBpc0NhbGxlZEJ5U2VydmljZSBpcyB0cnVlIGlmIGNhbGxlZCBieSBnYWxsZXJ5LnNlcnZpY2UsIG90aGVyd2lzZSBmYWxzZVxuICAgKi9cbiAgc2hvd01vZGFsR2FsbGVyeShpbmRleDogbnVtYmVyLCBpc0NhbGxlZEJ5U2VydmljZTogYm9vbGVhbiA9IGZhbHNlfgB7XG4gICAgLy8gaGlkZXMgc2Nyb2xsYmFyXG4gICAgZG9jdW1lbnQuYm9keS5zdHlsZS5vdmVyZmxvdyA9ICdoaWRkZW4nO1xuXG4gICAgdGhpcy5rZXlib2FyZFNlcnZpY2UuYWRkKChldmVudDogS2V5Ym9hcmRFdmVudCwgY29tYm86IHN0cmluZykgPT4ge1xuICAgICAgaWYgKGV2ZW50LnByZXZlbnREZWZhdWx0fgB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBpbnRlcm5ldCBleHBsb3JlclxuICAgICAgICBldmVudC5yZXR1cm5WYWx1ZSA9IGZhbHNlO1xuICAgICAgfVxuICAgICAgdGhpcy5kb3dubG9hZEltYWdlKCk7XG4gICAgfSk7XG5cbiAgICB0aGlzLm9wZW5lZCA9IHRydWU7XG4gICAgdGhpcy5jdXJyZW50SW1hZ2UgPSB0aGlzLmltYWdlc1tpbmRleF07XG5cbiAgICAvLyBlbWl0IGEgbmV3IEltYWdlTW9kYWxFdmVudCB3aXRoIHRoZSBpbmRleCBvZiB0aGUgY3VycmVudCBpbWFnZVxuICAgIHRoaXMuc2hvdy5lbWl0KG5ldyBJbWFnZU1vZGFsRXZlbnQoQWN0aW9uLkxPQUQsIGluZGV4ICsgMSkpO1xuXG4gICAgaWYgKGlzQ2FsbGVkQnlTZXJ2aWNlfgB7XG4gICAgICAvLyB0aGUgZm9sbG93aW5nIGlzIHJlcXVpcmVkLCBvdGhlcndpc2UgdGhlIHZpZXcgd2lsbCBub3QgYmUgdXBkYXRlZFxuICAgICAgLy8gdGhpcyBoYXBwZW5zIG9ubHkgaWYgY2FsbGVkIGJ5IGdhbGxlcnkuc2VydmljZVxuICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogTWV0aG9kIGNhbGxlZCB3aGVuIHRoZSBpbWFnZSBjaGFuZ2VzIGFuZCB1c2VkIHRvIHVwZGF0ZSB0aGUgYGN1cnJlbnRJbWFnZWAgb2JqZWN0LlxuICAgKiBAcGFyYW0gSW1hZ2VNb2RhbEV2ZW50IGV2ZW50IHBheWxvYWRcbiAgICovXG4gIG9uQ2hhbmdlQ3VycmVudEltYWdlKGV2ZW50OiBJbWFnZU1vZGFsRXZlbnQpIHtcbiAgICBjb25zdCBuZXdJbmRleDogbnVtYmVyID0gPG51bWJlcj5ldmVudC5yZXN1bHQ7XG5cbiAgICAvLyBUT0RPIGFkZCB2YWxpZGF0aW9uXG4gICAgdGhpcy5jdXJyZW50SW1hZ2UgPSB0aGlzLmltYWdlc1tuZXdJbmRleF07XG5cbiAgICAvLyBlbWl0IGZpcnN0L2xhc3QgZXZlbnQgYmFzZWQgb24gbmV3SW5kZXggdmFsdWVcbiAgICB0aGlzLmVtaXRCb3VuZGFyeUV2ZW50KGV2ZW50LmFjdGlvbiwgbmV3SW5kZXgpO1xuXG4gICAgLy8gZW1pdCBjdXJyZW50IHZpc2libGUgaW1hZ2UgaW5kZXhcbiAgICB0aGlzLnNob3cuZW1pdChuZXcgSW1hZ2VNb2RhbEV2ZW50KGV2ZW50LmFjdGlvbiwgbmV3SW5kZXggKyAxfgk7XG4gIH1cblxuICBpc1BsYWluR2FsbGVyeVZpc2libGUoKTogYm9vbGVhbiB7XG4gICAgaWYgKHRoaXMucGxhaW5HYWxsZXJ5Q29uZmlnICYmIHRoaXMucGxhaW5HYWxsZXJ5Q29uZmlnLmxheW91dCAmJiB0aGlzLnBsYWluR2FsbGVyeUNvbmZpZy5sYXlvdXQgaW5zdGFuY2VvZiBBZHZhbmNlZExheW91dCkge1xuICAgICAgcmV0dXJuICF0aGlzLnBsYWluR2FsbGVyeUNvbmZpZy5sYXlvdXQuaGlkZURlZmF1bHRQbGFpbkdhbGxlcnk7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgLyoqXG4gICAqIE1ldGhvZCBjYWxsZWQgd2hlbiB5b3UgY2xpY2sgJ291dHNpZGUnIChpLmUuIG9uIHRoZSBzZW1pLXRyYW5zcGFyZW50IGJhY2tncm91bmQpXG4gICAqIHRvIGNsb3NlIHRoZSBtb2RhbCBnYWxsZXJ5IGlmIGBlbmFibGVDbG9zZU91dHNpZGVgIGlzIHRydWUuXG4gICAqIEBwYXJhbSBib29sZWFuIGV2ZW50IHBheWxvYWQuIFRydWUgdG8gY2xvc2UgdGhlIG1vZGFsIGdhbGxlcnfgIGZhbHNlIG90aGVyd2lzZVxuICAgKi9cbiAgb25DbGlja091dHNpZGUoZXZlbnQ6IGJvb2xlYW4pIHtcbiAgICBpZiAoZXZlbnQgJiYgdGhpcy5lbmFibGVDbG9zZU91dHNpZGUpIHtcbiAgICAgIHRoaXMuY2xvc2VHYWxsZXJ5KEFjdGlvbi5DTElDSyk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIE1ldGhvZCBjYWxsZWQgd2hlbiBhbiBpbWFnZSBpcyBsb2FkZWQgYW5kIHRoZSBsb2FkaW5nIHNwaW5uZXIgaGFzIGdvbmUuXG4gICAqIEl0IHNldHMgdGhlIHByZXZpb3VzbHlMb2FkZWQgZmxhZyBpbnNpZGUgdGhlIEltYWdlIHRvIGhpZGUgbG9hZGluZyBzcGlubmVyIHdoZW4gZGlzcGxheWVkIGFnYWluLlxuICAgKiBAcGFyYW0gSW1hZ2VMb2FkRXZlbnQgZXZlbnQgcGF5bG9hZFxuICAgKi9cbiAgb25JbWFnZUxvYWQoZXZlbnQ6IEltYWdlTG9hZEV2ZW50fgB7XG4gICAgLy8gY29uc29sZS5sb2coJ21vZGFsLWltYWdlIG9uSW1hZ2VMb2FkJywgZXZlbnQpO1xuICAgIC8vIGNvbnNvbGUubG9nKCdtb2RhbC1pbWFnZSBvbkltYWdlTG9hZCBpbWFnZXMgYmVmb3JlJywgdGhpcy5pbWFnZXMpO1xuXG4gICAgLy8gc2V0cyBhcyBwcmV2aW91c2x5IGxvYWRlZCB0aGUgaW1hZ2Ugd2l0aCBpbmRleCBzcGVjaWZpZWQgYnkgYGV2ZW50LnN0YXR1c2BcbiAgICB0aGlzLmltYWdlcyA9IHRoaXMuaW1hZ2VzLm1hcCgoaW1nOiBJbnRlcm5hbExpYkltYWdlfgA9PiB7XG4gICAgICBpZiAoaW1nICYmIGltZy5pZCA9PT0gZXZlbnQuaWQpIHtcbiAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIGltZywgeyBwcmV2aW91c2x5TG9hZGVkOiBldmVudC5zdGF0dXMgfSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gaW1nO1xuICAgIH0pO1xuXG4gICAgLy8gY29uc29sZS5sb2coJ21vZGFsLWltYWdlIG9uSW1hZ2VMb2FkIGltYWdlcyBhZnRlcicsIHRoaXMuaW1hZ2VzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBNZXRob2QgY2FsbGVkIHdoZW4gYSBkb3QgaXMgY2xpY2tlZCBhbmQgdXNlZCB0byB1cGRhdGUgdGhlIGN1cnJlbnQgaW1hZ2UuXG4gICAqIEBwYXJhbSBudW1iZXIgaW5kZXggb2YgdGhlIGNsaWNrZWQgZG90XG4gICAqL1xuICBvbkNsaWNrRG90KGluZGV4OiBudW1iZXIpIHtcbiAgICB0aGlzLmN1cnJlbnRJbWFnZSA9IHRoaXMuaW1hZ2VzW2luZGV4XTtcbiAgfVxuXG4gIC8qKlxuICAgKiBNZXRob2QgY2FsbGVkIHdoZW4gYW4gaW1hZ2UgcHJldmlldyBpcyBjbGlja2VkIGFuZCB1c2VkIHRvIHVwZGF0ZSB0aGUgY3VycmVudCBpbWFnZS5cbiAgICogQHBhcmFtIEltYWdlIHByZXZpZXcgaW1hZ2VcbiAgICovXG4gIG9uQ2xpY2tQcmV2aWV3KHByZXZpZXc6IEltYWdlfgB7XG4gICAgY29uc3QgaW1hZ2VGb3VuZDogSW50ZXJuYWxMaWJJbWFnZSB8IHVuZGVmaW5lZCA9IHRoaXMuaW1hZ2VzLmZpbmQoKGltZzogSW50ZXJuYWxMaWJJbWFnZSkgPT4gaW1nLmlkID09PSBwcmV2aWV3LmlkKTtcbiAgICBpZiAoISFpbWFnZUZvdW5kfgB7XG4gICAgICB0aGlzLmN1cnJlbnRJbWFnZSA9IDxJbnRlcm5hbExpYkltYWdlPmltYWdlRm91bmQ7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIE1ldGhvZCB0byBkb3dubG9hZCB0aGUgY3VycmVudCBpbWFnZSwgb25seSBpZiBgZG93bmxvYWRhYmxlYCBpcyB0cnVlLlxuICAgKiBJdCBjb250YWlucyBhbHNvIGEgbG9naWMgdG8gZW5hYmxlIGRvd25sb2FkaW5nIGZlYXR1cmVzIGFsc28gZm9yIElFMTEuXG4gICAqL1xuICBkb3dubG9hZEltYWdlKCkge1xuICAgIGlmICh0aGlzLmN1cnJlbnRJbWFnZUNvbmZpZyAmJiAhdGhpcy5jdXJyZW50SW1hZ2VDb25maWcuZG93bmxvYWRhYmxlfgB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIC8vIElmIElFMTEgb3IgTWljcm9zb2Z0IEVkZ2UgdXNlIG1zU2F2ZUJsb2IoLi4uKVxuICAgIGlmICh0aGlzLmlzSUVvckVkZ2Uofgkge1xuICAgICAgLy8gSSBjYW5ub3QgdXNlIGZldGNoIEFQSSBiZWNhdXNlIElFMTEgZG9lc24ndCBzdXBwb3J0IGl0LFxuICAgICAgLy8gc28gSSBoYXZlIHRvIHN3aXRjaCB0byBYTUxIdHRwUmVxdWVzdFxuICAgICAgdGhpcy5kb3dubG9hZEltYWdlT25seUlFb3JFZGdlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGZvciBhbGwgb3RoZXIgYnJvd3NlcnNcbiAgICAgIHRoaXMuZG93bmxvYWRJbWFnZUFsbEJyb3dzZXJzKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIE1ldGhvZCB0byBjbGVhbnVwIHJlc291cmNlcy4gSW4gZmFjdCwgdGhpcyB3aWxsIHJlc2V0IGtleWJvYXJkJ3Mgc2VydmljZS5cbiAgICogVGhpcyBpcyBhbiBBbmd1bGFyJ3MgbGlmZWN5Y2xlIGhvb2sgdGhhdCBpcyBjYWxsZWQgd2hlbiB0aGlzIGNvbXBvbmVudCBpcyBkZXN0cm95ZWQuXG4gICAqL1xuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLmtleWJvYXJkU2VydmljZS5yZXNldCgpO1xuXG4gICAgaWYgKHRoaXMuZ2FsbGVyeVNlcnZpY2VOYXZpZ2F0ZVN1YnNjcmlwdGlvbikge1xuICAgICAgdGhpcy5nYWxsZXJ5U2VydmljZU5hdmlnYXRlU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICAgIGlmICh0aGlzLmdhbGxlcnlTZXJ2aWNlQ2xvc2VTdWJzY3JpcHRpb24pIHtcbiAgICAgIHRoaXMuZ2FsbGVyeVNlcnZpY2VDbG9zZVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgICBpZiAodGhpcy5nYWxsZXJ5U2VydmljZVVwZGF0ZVN1YnNjcmlwdGlvbikge1xuICAgICAgdGhpcy5nYWxsZXJ5U2VydmljZVVwZGF0ZVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBQcml2YXRlIG1ldGhvZCB0byBkb3dubG9hZCB0aGUgY3VycmVudCBpbWFnZSBmb3IgYWxsIGJyb3dzZXJzIGV4Y2VwdCBmb3IgSUUxMS5cbiAgICovXG4gIHByaXZhdGUgZG93bmxvYWRJbWFnZUFsbEJyb3dzZXJzKCkge1xuICAgIGNvbnN0IGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgbGluay5ocmVmID0gPHN0cmluZz50aGlzLmN1cnJlbnRJbWFnZS5tb2RhbC5pbWc7XG4gICAgbGluay5zZXRBdHRyaWJ1dGUoJ2Rvd25sb2FkJywgdGhpcy5nZXRGaWxlTmFtZSh0aGlzLmN1cnJlbnRJbWFnZSkpO1xuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQobGluayk7XG4gICAgbGluay5jbGljaygpO1xuICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQobGluayk7XG4gIH1cblxuICAvKipcbiAgICogUHJpdmF0ZSBtZXRob2QgdG8gZG93bmxvYWQgdGhlIGN1cnJlbnQgaW1hZ2Ugb25seSBmb3IgSUUxMSB1c2luZ1xuICAgKiBjdXN0b20gamF2YXNjcmlwdCdzIG1ldGhvZHMgYXZhaWxhYmxlIG9ubHkgb24gSUUuXG4gICAqL1xuICBwcml2YXRlIGRvd25sb2FfgW1hZ2VPbmx5SUVvckVkZ2UofgB7XG4gICAgaWYgKGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCkpIHtcbiAgICAgIGNvbnN0IHJlcSA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgICAgcmVxLm9wZW4oJ0dFVCcsIDxzdHJpbmc+dGhpcy5jdXJyZW50SW1hZ2UubW9kYWwuaW1nLCB0cnVlKTtcbiAgICAgIHJlcS5yZXNwb25zZVR5cGUgPSAnYXJyYXlidWZmZXInO1xuICAgICAgcmVxLm9ubG9hZCA9IGV2ZW50ID0+IHtcbiAgICAgICAgY29uc3QgYmxvYiA9IG5ldyBCbG9iKFtyZXEucmVzcG9uc2VdLCB7IHR5cGU6ICdpbWFnZS9wbmcnIH0pO1xuICAgICAgICB3aW5kb3cubmF2aWdhdG9yLm1zU2F2ZUJsb2IoYmxvYiwgdGhpcy5nZXRGaWxlTmFtZSh0aGlzLmN1cnJlbnRJbWFnZSkpO1xuICAgICAgfTtcbiAgICAgIHJlcS5zZW5kKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFByaXZhdGUgbWV0aG9kIHRvIGdldCB0aGUgYEJ1dHRvbkV2ZW50YCB0byBlbWl0LCBtZXJnaW5nIHRoZSBpbnB1dCBgQnV0dG9uRXZlbnRgXG4gICAqIHdpdGggdGhlIGN1cnJlbnQgaW1hZ2UuXG4gICAqIEBwYXJhbSBCdXR0b25FdmVudCBldmVudCBwYXlsb2FkIHRvIHJldHVyblxuICAgKiBAcmV0dXJucyBCdXR0b25FdmVudCBldmVudCBwYXlsb2FkIHdpdGggdGhlIGN1cnJlbnQgaW1hZ2UgaW5jbHVkZWRcbiAgICovXG4gIHByaXZhdGUgZ2V0QnV0dG9uRXZlbnRUb0VtaXQoZXZlbnQ6IEJ1dHRvbkV2ZW50KTogQnV0dG9uRXZlbnQge1xuICAgIHJldHVybiBPYmplY3QuYXNzaWduKGV2ZW50LCB7IGltYWdlOiB0aGlzLmN1cnJlbnRJbWFnZSB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQcml2YXRlIG1ldGhvZCB0byBnZXQgdGhlIGZpbGUgbmFtZSBmcm9tIGFuIGlucHV0IHBhdGguXG4gICAqIFRoaXMgaXMgdXNlZCBlaXRoZXIgdG8gZ2V0IHRoZSBpbWFnZSdzIG5hbWUgZnJvbSBpdHMgcGF0aCBvciBmcm9tIHRoZSBJbWFnZSBpdHNlbGYsXG4gICAqIGlmIHNwZWNpZmllZCBhcyAnZG93bmxvYWRGaWxlTmFtZScgYnkgdGhlIHVzZXIuXG4gICAqIEBwYXJhbSBJbWFnZSBpbWFnZSB0byBleHRyYWN0IGl0cyBmaWxlIG5hbWVcbiAgICogQHJldHVybnMgc3RyaW5nIHN0cmluZyBmaWxlIG5hbWUgb2YgdGhlIGlucHV0IGltYWdlLlxuICAgKi9cbiAgcHJpdmF0ZSBnZXRGaWxlTmFtZShpbWFnZTogSW1hZ2UpOiBzdHJpbmcge1xuICAgIGlmICghaW1hZ2UubW9kYWwuZG93bmxvYWRGaWxlTmFtZSB8fCBpbWFnZS5tb2RhbC5kb3dubG9hZEZpbGVOYW1lLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuICg8c3RyaW5nPnRoaXMuY3VycmVudEltYWdlLm1vZGFsLmltZykucmVwbGFjZSgvXi4qW1xcXFxcXC9dLywgJycpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gaW1hZ2UubW9kYWwuZG93bmxvYWRGaWxlTmFtZTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUHJpdmF0ZSBtZXRob2QgdG8gaW5pdGlhbGl6ZSBgaW1hZ2VzYCBhcyBhcnJheSBvZiBgSW1hZ2Vgcy5cbiAgICogQWxzbywgaXQgd2lsbCBlbWl0IEltYWdlb3dtb2RhTW9kYWxFdmVudCB0byBzYXkgdGhhdCBpbWFnZXMgYXJlIGxvYWRlZC5cbiAgICovXG4gIHByaXZhdGUgaW5pdEltYWdlcygpIHtcbiAgICB0aGlzLmltYWdlcyA9IDxJbnRlcm5hbExpYkltYWdlW10+dGhpcy5tb2RhbEltYWdlcztcbiAgICB0aGlzLmhhc0RhdGEuZW1pdChuZXcgSW1hZ2VNb2RhbEV2ZW50KEFjdGlvbi5MT0FELCB0cnVlfgk7XG4gICAgdGhpcy5zaG93R2FsbGVyeSA9IHRoaXMuaW1hZ2VzLmxlbmd0aCA+IDA7XG4gIH1cblxuICAvKipcbiAgICogUHJpdmF0ZSBtZXRob2QgdG8gZW1pdCBldmVudHMgd2hlbiBlaXRoZXIgdGhlIGxhc3Qgb3IgdGhlIGZpcnN0IGltYWdlIGFyZSB2aXNpYmxlLlxuICAgKiBAcGFyYW0gYWN0aW9uIEVudW0gb2YgdHlwZSBBY3Rpb24gdGhhdCByZXByZXNlbnRzIHRoZSBzb3VyY2Ugb2YgdGhlIGV2ZW50IHRoYXQgY2hhbmdlZCB0aGVcbiAgICogIGN1cnJlbnQgaW1hZ2UgdG8gdGhlIGZpcnN0IG9uZSBvciB0aGUgbGFzdCBvbmUuXG4gICAqIEBwYXJhbSBpbmRleFRvQ2hlY2sgaXMgdGhlIGluZGV4IG51bWJlciBvZiB0aGUgaW1hZ2UgKHRoZSBmaXJzdCBvciB0aGUgbGFzdCBvbmUpLlxuICAgKi9cbiAgcHJpdmF0ZSBlbWl0Qm91bmRhcnlFdmVudChhY3Rpb246IEFjdGlvbiwgaW5kZXhUb0NoZWNrOiBudW1iZXIpIHtcbiAgICAvLyB0byBlbWl0IGZpcnN0L2xhc3QgZXZlbnRcbiAgICBzd2l0Y2ggKGluZGV4VG9DaGVjaykge1xuICAgICAgY2FzZSAwOlxuICAgICAgICB0aGlzLmZpcnN0SW1hZ2UuZW1pdChuZXcgSW1hZ2VNb2RhbEV2ZW50KGFjdGlvbiwgdHJ1ZSkpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgdGhpcy5pbWFnZXMubGVuZ3RoIC0gMTpcbiAgICAgICAgdGhpcy5sYXN0SW1hZ2UuZW1pdChuZXcgSW1hZ2VNb2RhbEV2ZW50KGFjdGlvbiwgdHJ1ZSkpO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUHJpdmF0ZSBtZXRob2QgdG8gY2hlY2sgaWYgdGhpcyBsaWJyYXJ5IGlzIHJ1bm5pbmcgb25cbiAgICogTWljcm9zb2Z0IGJyb3dzZXJzIG9yIG5vdCAoaS5lLiBpdCBkZXRlY3RzIGJvdGggSUUxMSBhbmQgRWRnZSlcbiAgICogc3VwcG9ydGluZyBhbHNvIFNlcnZlci1TaWRlIFJlbmRlcmluZy5cbiAgICogSW5zcGlyZWQgYnkgaHR0cHM6Ly9tc2RuLm1pY3Jvc29mdC5jb20vaXQtaXQvbGlicmFyeS9oaDc3OTAxNih2PXZzLjg1fg5hc3B4XG4gICAqIEByZXR1cm5zIGFueSB0aGUgcmVzdWx0XG4gICAqL1xuICBwcml2YXRlIGlzSUVvckVkZ2UoKTogYW55IHtcbiAgICBpZiAoaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkfgkge1xuICAgICAgLy8gaWYgYm90aCBCbG9iIGNvbnN0cnVjdG9yIGFuZCBtc1NhdmVPck9wZW5CbG9iIGFyZSBzdXBwb3J0ZWQgYnkgdGhlIGN1cnJlbnQgYnJvd3NlclxuICAgICAgcmV0dXJuIHdpbmRvdy5CbG9iICYmIHdpbmRvdy5uYXZpZ2F0b3IubXNTYXZlT3JPcGVuQmxvYjtcbiAgICB9XG4gICAgaWYgKGlzUGxhdGZvcm1TZXJ2ZXIodGhpcy5wbGF0Zm9ybUlkfgkge1xuICAgICAgLy8gc2VydmVyIG9ubHlcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxufVxuIiwiLypcbiBUaGUgTUlUIExpY2Vuc2UgKE1JVClcblxuIENvcHlyaWdodCAoYykgMjAxNy0yMDE4IFN0ZWZhbm8gQ2FwcGEgKEtzODkpXG5cbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwifgwgdG8gZGVhbFxuIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbiB0byB1c2UsIGNvcHfgIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcblxuIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIGFsbFxuIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG5cbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFfgXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTiBJTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiBMSUFCSUxJVFfgIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFXG4gU09GVFdBUkUuXG4gKi9cblxuaW1wb3J0IHsgQWN0aW9uIH0gZnJvbSAnLi9hY3Rpb24uZW51bSc7XG5pbXBvcnQgeyBJbnRlcm5hbExpYkltYWdlIH0gZnJvbSAnLi9pbWFnZS1pbnRlcm5hbC5jbGFzcyc7XG5pbXBvcnQgeyBTaXplIH0gZnJvbSAnLi9zaXplLmludGVyZmFjZSc7XG5cbi8qKlxuICogSW50ZXJmYWNlIGBCdXR0b25zQ29uZmlnYCB0byBhZGQgYnV0dG9ucywgc2hvdy9oaWRlIHRoZWlyLCBhbmQgdG8gYWRkIHRoZSBzdHJhdGVneS5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBCdXR0b25zQ29uZmlnIHtcbiAgdmlzaWJsZTogYm9vbGVhbjtcbiAgc3RyYXRlZ3k6IEJ1dHRvbnNTdHJhdGVneTtcbiAgYnV0dG9ucz86IEJ1dHRvbkNvbmZpZ1tdO1xufVxuXG4vKipcbiAqIEludGVyZmFjZSBgQnV0dG9uQ29uZmlnYCB0byBjb25maWd1cmUgYSBzaW5nbGUgYnV0dG9uLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIEJ1dHRvbkNvbmZpZyB7XG4gIGNsYXNzTmFtZT86IHN0cmluZztcbiAgc2l6ZT86IFNpemU7XG4gIGZvbnRTaXplPzogc3RyaW5nO1xuICB0eXBlOiBCdXR0b25UeXBlO1xuICB0aXRsZT86IHN0cmluZztcbiAgYXJpYUxhYmVsPzogc3RyaW5nO1xuICBleHRVcmxJbk5ld1RhYj86IGJvb2xlYW47IC8vIHRvIG9wZW4gdGhlIGV4dGVybmFsIHVybCBpbiBhIG5ldyB0YWIsIGluc3RlYWQgb2YgdGhlIGN1cnJlbnQgb25lXG59XG5cbi8qKlxuICogSW50ZXJmYWNlIGBCdXR0b25FdmVudGAgdG8gcmVwcmVzZW50IHRoZSBldmVudCBwYXlsb2FkIHdoZW4gYSBidXR0b24gaXMgY2xpY2tlZC5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBCdXR0b25FdmVudCB7XG4gIGJ1dHRvbjogQnV0dG9uQ29uZmlnO1xuICBpbWFnZTogSW50ZXJuYWxMaWJJbWFnZSB8IG51bGw7XG4gIGFjdGlvbjogQWN0aW9uO1xufVxuXG4vKipcbiAqIEVudW0gYEJ1dHRvbnNTdHJhdGVneWAgdG8gY29uZmlndXJlIHRoZSBsb2dpYyBvZiBhIGJ1dHRvbi5cbiAqL1xuZXhwb3J0IGVudW0gQnV0dG9uc1N0cmF0ZWd5IHtcbiAgLy8gZG9uJ3QgdXNlIDAgaGVyZVxuICAvLyB0aGUgZmlyc3QgaW5kZXggaXMgMSBhbmQgYWxsIG9mIHRoZSBmb2xsb3dpbmcgbWVtYmVycyBhcmUgYXV0by1pbmNyZW1lbnRlZCBmcm9tIHRoYXQgcG9pbnQgb25cbiAgREVGQVVMVCA9IDEsXG4gIFNJTVBMRSxcbiAgQURWQU5DRUQsXG4gIEZVTEwsXG4gIENVU1RPTVxufVxuXG4vKipcbiAqIEVudW0gYEJ1dHRvblR5cGVgIGlzIHRoZSB0eXBlIG9mIGEgYnV0dG9uLlxuICovXG5leHBvcnQgZW51bSBCdXR0b25UeXBlIHtcbiAgLy8gZG9uJ3QgdXNlIDAgaGVyZVxuICAvLyB0aGUgZmlyc3QgaW5kZXggaXMgMSBhbmQgYWxsIG9mIHRoZSBmb2xsb3dpbmcgbWVtYmVycyBhcmUgYXV0by1pbmNyZW1lbnRlZCBmcm9tIHRoYXQgcG9pbnQgb25cbiAgLy8gUkVGUkVTSCA9IDEsXG4gIERFTEVURSA9IDEsXG4gIEVYVFVSTCxcbiAgRE9XTkxPQUQsXG4gIENMT1NFLFxuICBDVVNUT00sXG4gIEZVTExTQ1JFRU5cbn1cblxuLyoqXG4gKiBBcnJheSBvZiBhZG1pdHRlZCB0eXBlcyBvZiBidXR0b25zLlxuICovXG5leHBvcnQgY29uc3QgV0hJVEVMSVNUX0JVVFRPTl9UWVBFUzogQnV0dG9uVHlwZVtdID0gW1xuICAvLyBCdXR0b25UeXBlLlJFRlJFU0gsXG4gIEJ1dHRvblR5cGUuRlVMTFNDUkVFTixcbiAgQnV0dG9uVHlwZS5ERUxFVEUsXG4gIEJ1dHRvblR5cGUuRVhUVVJMLFxuICBCdXR0b25UeXBlLkRPV05MT0FELFxuICBCdXR0b25UeXBlLkNMT1NFLFxuICBCdXR0b25UeXBlLkNVU1RPTVxuXTtcbiIsImltcG9ydCB7IEJ1dHRvbkNvbmZpZywgQnV0dG9uVHlwZSB9IGZyb20gJy4uLy4uL21vZGVsL2J1dHRvbnMtY29uZmlnLmludGVyZmFjZSc7XG5pbXBvcnQgeyBTaXplIH0gZnJvbSAnLi4vLi4vbW9kZWwvc2l6ZS5pbnRlcmZhY2UnO1xuXG4vKipcbiAqIERlZmF1bHQgYnV0dG9uIHNpemUgb2JqZWN0XG4gKi9cbmV4cG9ydCBjb25zdCBLU19ERUZBVUxUX1NJWkU6IFNpemUgPSB7IGhlaWdodDogJ2F1dG8nLCB3aWR0aDogJzMwcHgnIH07XG5cbi8qKlxuICogRGVmYXVsdCBjbG9zZSBidXR0b24gb2JqZWN0XG4gKi9cbmV4cG9ydCBjb25zdCBLU19ERUZBVUxUX0JUTl9DTE9TRTogQnV0dG9uQ29uZmlnID0ge1xuICBjbGFzc05hbWU6ICdjbG9zZS1pbWFnZScsXG4gIHNpemU6IEtTX0RFRkFVTFRfU0laRSxcbiAgdHlwZTogQnV0dG9uVHlwZS5DTE9TRSxcbiAgdGl0bGU6ICdDbG9zZSB0aGlzIG1vZGFsIGltYWdlIGdhbGxlcnknLFxuICBhcmlhTGFiZWw6ICdDbG9zZSB0aGlzIG1vZGFsIGltYWdlIGdhbGxlcnknXG59O1xuXG4vKipcbiAqIERlZmF1bHQgZG93bmxvYWQgYnV0dG9uIG9iamVjdFxuICovXG5leHBvcnQgY29uc3QgS1NfREVGQVVMVF9CVE5fRE9XTkxPQUQ6IEJ1dHRvbkNvbmZpZyA9IHtcbiAgY2xhc3NOYW1lOiAnZG93bmxvYWQtaW1hZ2UnLFxuICBzaXplOiBLU19ERUZBVUxUX1NJWkUsXG4gIHR5cGU6IEJ1dHRvblR5cGUuRE9XTkxPQUQsXG4gIHRpdGxlOiAnRG93bmxvYWQgdGhlIGN1cnJlbnQgaW1hZ2UnLFxuICBhcmlhTGFiZWw6ICdEb3dubG9hZCB0aGUgY3VycmVudCBpbWFnZSdcbn07XG5cbi8qKlxuICogRGVmYXVsdCBleHR1cmwgYnV0dG9uIG9iamVjdFxuICovXG5leHBvcnQgY29uc3QgS1NfREVGQVVMVF9CVE5fRVhUVVJMOiBCdXR0b25Db25maWcgPSB7XG4gIGNsYXNzTmFtZTogJ2V4dC11cmwtaW1hZ2UnLFxuICBzaXplOiBLU19ERUZBVUxUX1NJWkUsXG4gIHR5cGU6IEJ1dHRvblR5cGUuRVhUVVJMLFxuICB0aXRsZTogJ05hdmlnYXRlIHRoZSBjdXJyZW50IGltYWdlJyxcbiAgYXJpYUxhYmVsOiAnTmF2aWdhdGUgdGhlIGN1cnJlbnQgaW1hZ2UnXG59O1xuLy8gLyoqXG4vLyAgKiBEZWZhdWx0IHJlZnJlc2ggYnV0dG9uIG9iamVjdFxuLy8gICovXG4vLyBleHBvcnQgY29uc3QgS1NfREVGQVVMVF9CVE5fUkVGUkVTSDogQnV0dG9uQ29uZmlnID0ge1xuLy8gICBjbGFzc05hbWU6ICdyZWZyZXNoLWltYWdlJyxcbi8vICAgc2l6ZTogS1NfREVGQVVMVF9TSVpFLFxuLy8gICB0eXBlOiBCdXR0b25UeXBlLlJFRlJFU0gsXG4vLyAgIHRpdGxlOiAnUmVmcmVzaCBhbGwgaW1hZ2VzJyxcbi8vICAgYXJpYUxhYmVsOiAnUmVmcmVzaCBhbGwgaW1hZ2VzJ1xuLy8gfTtcblxuLyoqXG4gKiBEZWZhdWx0IGRlbGV0ZSBidXR0b24gb2JqZWN0XG4gKi9cbmV4cG9ydCBjb25zdCBLU19ERUZBVUxUX0JUTl9ERUxFVEU6IEJ1dHRvbkNvbmZpZyA9IHtcbiAgY2xhc3NOYW1lOiAnZGVsZXRlLWltYWdlJyxcbiAgc2l6ZTogS1NfREVGQVVMVF9TSVpFLFxuICB0eXBlOiBCdXR0b25UeXBlLkRFTEVURSxcbiAgdGl0bGU6ICdEZWxldGUgdGhlIGN1cnJlbnQgaW1hZ2UnLFxuICBhcmlhTGFiZWw6ICdEZWxldGUgdGhlIGN1cnJlbnQgaW1hZ2UnXG59O1xuXG4vKipcbiAqIERlZmF1bHQgZnVsbC1zY3JlZW4gYnV0dG9uIG9iamVjdFxuICovXG5leHBvcnQgY29uc3QgS1NfREVGQVVMVF9CVE5fRlVMTF9TQ1JFRU46IEJ1dHRvbkNvbmZpZyA9IHtcbiAgY2xhc3NOYW1lOiAnZnVsbHNjcmVlbi1pbWFnZScsXG4gIHNpemU6IEtTX0RFRkFVTFRfU0laRSxcbiAgdHlwZTogQnV0dG9uVHlwZS5GVUxMU0NSRUVOLFxuICB0aXRsZTogJ1N3aXRjaCB0byBmdWxsLXNjcmVlbicsXG4gIGFyaWFMYWJlbDogJ1N3aXRjaCB0byBmdWxsLXNjcmVlbidcbn07XG4iLCIvKlxuIFRoZSBNSVQgTGljZW5zZSAoTUlUKVxuXG4gQ29weXJpZ2h0IChjfgAyMDE3IFN0ZWZhbm8gQ2FwcGEgKEtzODkpXG5cbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwifgwgdG8gZGVhbFxuIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbiB0byB1c2UsIGNvcHfgIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcblxuIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIGFsbFxuIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG5cbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFfgXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTiBJTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiBMSUFCSUxJVFfgIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFXG4gU09GVFdBUkUuXG4gKi9cblxuaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3fgIENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25Jbml0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgQWNjZXNzaWJsZUNvbXBvbmVudCB9IGZyb20gJy4uL2FjY2Vzc2libGUuY29tcG9uZW50JztcblxuaW1wb3J0IHsgQWN0aW9uIH0gZnJvbSAnLi4vLi4vbW9kZWwvYWN0aW9uLmVudW0nO1xuaW1wb3J0IHsgSW1hZ2UgfSBmcm9tICcuLi8uLi9tb2RlbC9pbWFnZS5jbGFzcyc7XG5pbXBvcnQgeyBCdXR0b25Db25maWcsIEJ1dHRvbkV2ZW50LCBCdXR0b25zQ29uZmlnLCBCdXR0b25zU3RyYXRlZ3fgIEJ1dHRvblR5cGUsIFdISVRFTElTVF9CVVRUT05fVFlQRVMgfSBmcm9tICcuLi8uLi9tb2RlbC9idXR0b25zLWNvbmZpZy5pbnRlcmZhY2UnO1xuXG5pbXBvcnQge1xuICBLU19ERUZBVUxUX0JUTl9DTE9TRSxcbiAgS1NfREVGQVVMVF9CVE5fREVMRVRFLFxuICBLU19ERUZBVUxUX0JUTl9ET1dOTE9BRCxcbiAgS1NfREVGQVVMVF9CVE5fRVhUVVJMLFxuICBLU19ERUZBVUxUX0JUTl9GVUxMX1NDUkVFTlxufSBmcm9tICcuL3VwcGVyLWJ1dHRvbnMtZGVmYXVsdCc7XG5cbmltcG9ydCB7IE5FWFQgfSBmcm9tICcuLi8uLi91dGlscy91c2VyLWlucHV0LnV0aWwnO1xuXG4vKipcbiAqIEludGVybmFsIHJlcHJlc2VudGF0aW9uIG9mIGBCdXR0b25Db25maWdgIHdpdGggYW4gb3B0aW9uYWwgYGlkYCBmaWVsZCwgdXNlZCBieSB0cmFja0lkIHRvIGltcHJvdmUgcGVyZm9ybWFuY2VzLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIEludGVybmFsQnV0dG9uQ29uZmlnIGV4dGVuZHMgQnV0dG9uQ29uZmlnIHtcbiAgaWQ/OiBudW1iZXI7IC8vIHVzZWZ1bCBvbmx5IGZvciB0cmFja0J5SWQsIG5vdCBuZWVkZWQgYnkgdXNlcnNcbn1cblxuLyoqXG4gKiBDb21wb25lbnQgd2l0aCBhbGwgdXBwZXIgYnV0dG9ucy5cbiAqIEFsc28gaXQgZW1pdHMgY2xpY2sgZXZlbnRzIGFzIG91dHB1dHMuXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2tzLXVwcGVyLWJ1dHRvbnMnLFxuICBzdHlsZVVybHM6IFsndXBwZXItYnV0dG9ucy5zY3NzJ10sXG4gIHRlbXBsYXRlVXJsOiAndXBwZXItYnV0dG9ucy5odG1sJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgVXBwZXJCdXR0b25zQ29tcG9uZW50IGV4dGVuZHMgQWNjZXNzaWJsZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIC8qKlxuICAgKiBPYmplY3Qgb2YgdHlwZSBgSW1hZ2VgIHRoYXQgcmVwcmVzZW50IHRoZSB2aXNpYmxlIGltYWdlLlxuICAgKi9cbiAgQElucHV0KCkgY3VycmVudEltYWdlOiBJbWFnZTtcbiAgLyoqXG4gICAqIE9iamVjdCBvZiB0eXBlIGBCdXR0b25zQ29uZmlnYCB0byBpbml0IFVwcGVyQnV0dG9uc0NvbXBvbmVudCdzIGZlYXR1cmVzLlxuICAgKiBGb3IgaW5zdGFuY2UsIGl0IGNvbnRhaW5zIGFuIGFycmF5IG9mIGJ1dHRvbnMuXG4gICAqL1xuICBASW5wdXQofgBidXR0b25zQ29uZmlnOiBCdXR0b25zQ29uZmlnO1xuXG4gIC8qKlxuICAgKiBPdXRwdXQgdG8gZW1pdCBjbGlja3Mgb24gcmVmcmVzaCBidXR0b24uIFRoZSBwYXlsb2FkIGNvbnRhaW5zIGEgYEJ1dHRvbkV2ZW50YC5cbiAgICovXG4gIEBPdXRwdXQofgByZWZyZXNoOiBFdmVudEVtaXR0ZXI8QnV0dG9uRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxCdXR0b25FdmVudD4oKTtcbiAgLyoqXG4gICAqIE91dHB1dCB0byBlbWl0IGNsaWNrcyBvbiBkZWxldGUgYnV0dG9uLiBUaGUgcGF5bG9hZCBjb250YWlucyBhIGBCdXR0b25FdmVudGAuXG4gICAqL1xuICBAT3V0cHV0KCkgZGVsZXRlOiBFdmVudEVtaXR0ZXI8QnV0dG9uRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxCdXR0b25FdmVudD4oKTtcbiAgLyoqXG4gICAqIE91dHB1dCB0byBlbWl0IGNsaWNrcyBvbiBuYXZpZ2F0ZSBidXR0b24uIFRoZSBwYXlsb2FkIGNvbnRhaW5zIGEgYEJ1dHRvbkV2ZW50YC5cbiAgICovXG4gIEBPdXRwdXQofgBuYXZpZ2F0ZTogRXZlbnRFbWl0dGVyPEJ1dHRvbkV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8QnV0dG9uRXZlbnQ+KCk7XG4gIC8qKlxuICAgKiBPdXRwdXQgdG8gZW1pdCBjbGlja3Mgb24gZG93bmxvYWQgYnV0dG9uLiBUaGUgcGF5bG9hZCBjb250YWlucyBhIGBCdXR0b25FdmVudGAuXG4gICAqL1xuICBAT3V0cHV0KCkgZG93bmxvYWQ6IEV2ZW50RW1pdHRlcjxCdXR0b25FdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPEJ1dHRvbkV2ZW50PigpO1xuICAvKipcbiAgICogT3V0cHV0IHRvIGVtaXQgY2xpY2tzIG9uIGNsb3NlIGJ1dHRvbi4gVGhlIHBheWxvYWQgY29udGFpbnMgYSBgQnV0dG9uRXZlbnRgLlxuICAgKi9cbiAgQE91dHB1dCgpIGNsb3NlOiBFdmVudEVtaXR0ZXI8QnV0dG9uRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxCdXR0b25FdmVudD4oKTtcbiAgLyoqXG4gICAqIE91dHB1dCB0byBlbWl0IGNsaWNrcyBvbiBmdWxsLXNjcmVlbiBidXR0b24uIFRoZSBwYXlsb2FkIGNvbnRhaW5zIGEgYEJ1dHRvbkV2ZW50YC5cbiAgICovXG4gIEBPdXRwdXQofgBmdWxsc2NyZWVuOiBFdmVudEVtaXR0ZXI8QnV0dG9uRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxCdXR0b25FdmVudD4oKTtcbiAgLyoqXG4gICAqIE91dHB1dCB0byBlbWl0IGNsaWNrcyBvbiBhbGwgY3VzdG9tIGJ1dHRvbnMuIFRoZSBwYXlsb2FkIGNvbnRhaW5zIGEgYEJ1dHRvbkV2ZW50YC5cbiAgICovXG4gIEBPdXRwdXQofgBjdXN0b21FbWl0OiBFdmVudEVtaXR0ZXI8QnV0dG9uRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxCdXR0b25FdmVudD4oKTtcblxuICAvKipcbiAgICogQXJyYXkgb2YgYEludGVybmFsQnV0dG9uQ29uZmlnYCBleHBvc2VkIHRvIHRoZSB0ZW1wbGF0ZS4gVGhpcyBmaWVsZCBpcyBpbml0aWFsaXplZFxuICAgKiBhcHBseWluZyB0cmFuc2Zvcm1hdGlvbnMsIGRlZmF1bHQgdmFsdWVzIGFuZCBzbyBvbiB0byB0aGUgaW5wdXQgb2YgdGhlIHNhbWUgdHlwZS5cbiAgICovXG4gIGJ1dHRvbnM6IEludGVybmFsQnV0dG9uQ29uZmlnW107XG4gIC8qKlxuICAgKiBPYmplY3Qgb2YgdHlwZSBgQnV0dG9uc0NvbmZpZ2AgZXhwb3NlZCB0byB0aGUgdGVtcGxhdGUuIFRoaXMgZmllbGQgaXMgaW5pdGlhbGl6ZWRcbiAgICogYXBwbHlpbmcgdHJhbnNmb3JtYXRpb25zLCBkZWZhdWx0IHZhbHVlcyBhbmQgc28gb24gdG8gdGhlIGlucHV0IG9mIHRoZSBzYW1lIHR5cGUuXG4gICAqL1xuICBjb25maWdCdXR0b25zOiBCdXR0b25zQ29uZmlnO1xuXG4gIC8qKlxuICAgKiBEZWZhdWx0IGJ1dHRvbnMgYXJyYXkgZm9yIHN0YW5kYXJkIGNvbmZpZ3VyYXRpb25cbiAgICovXG4gIHByaXZhdGUgZGVmYXVsdEJ1dHRvbnNEZWZhdWx0OiBCdXR0b25Db25maWdbXSA9IFtLU19ERUZBVUxUX0JUTl9DTE9TRV07XG4gIC8qKlxuICAgKiBEZWZhdWx0IGJ1dHRvbnMgYXJyYXkgZm9yIHNpbXBsZSBjb25maWd1cmF0aW9uXG4gICAqL1xuICBwcml2YXRlIHNpbXBsZUJ1dHRvbnNEZWZhdWx0OiBCdXR0b25Db25maWdbXSA9IFtLU19ERUZBVUxUX0JUTl9ET1dOTE9BRCwgLi4udGhpcy5kZWZhdWx0QnV0dG9uc0RlZmF1bHRdO1xuICAvKipcbiAgICogRGVmYXVsdCBidXR0b25zIGFycmF5IGZvciBhZHZhbmNlZCBjb25maWd1cmF0aW9uXG4gICAqL1xuICBwcml2YXRlIGFkdmFuY2VkQnV0dG9uc0RlZmF1bHQ6IEJ1dHRvbkNvbmZpZ1tdID0gW0tTX0RFRkFVTFRfQlROX0VYVFVSTCwgLi4udGhpcy5zaW1wbGVCdXR0b25zRGVmYXVsdF07XG4gIC8qKlxuICAgKiBEZWZhdWx0IGJ1dHRvbnMgYXJyYXkgZm9yIGZ1bGwgY29uZmlndXJhdGlvblxuICAgKi9cbiAgcHJpdmF0ZSBmdWxsQnV0dG9uc0RlZmF1bHQ6IEJ1dHRvbkNvbmZpZ1tdID0gW1xuICAgIC8qS1NfREVGQVVMVF9CVE5fUkVGUkVTSCwgKi9cbiAgICBLU19ERUZBVUxUX0JUTl9GVUxMX1NDUkVFTixcbiAgICBLU19ERUZBVUxUX0JUTl9ERUxFVEUsXG4gICAgLi4udGhpcy5hZHZhbmNlZEJ1dHRvbnNEZWZhdWx0XG4gIF07XG5cbiAgLyoqXG4gICAqIE1ldGhvZCDDgsK0bmdPbkluaXTDgsK0IHRvIGJ1aWxkIGBjb25maWdCdXR0b25zYCBhcHBseWluZyBhIGRlZmF1bHQgdmFsdWUgYW5kIGFsc28gdG9cbiAgICogaW5pdCB0aGUgYGJ1dHRvbnNgIGFycmF5LlxuICAgKiBUaGlzIGlzIGFuIEFuZ3VsYXIncyBsaWZlY3ljbGUgaG9vaywgc28gaXRzIGNhbGxlZCBhdXRvbWF0aWNhbGx5IGJ5IEFuZ3VsYXIgaXRzZWxmLlxuICAgKiBJbiBwYXJ0aWN1bGFyLCBpdCdzIGNhbGxlZCBvbmx5IG9uZSB0aW1lISEhXG4gICAqL1xuICBuZ09uSW5pdCgpIHtcbiAgICBjb25zdCBkZWZhdWx0Q29uZmlnOiBCdXR0b25zQ29uZmlnID0geyB2aXNpYmxlOiB0cnVlLCBzdHJhdGVneTogQnV0dG9uc1N0cmF0ZWd5LkRFRkFVTFQgfTtcbiAgICB0aGlzLmNvbmZpZ0J1dHRvbnMgPSBPYmplY3QuYXNzaWduKGRlZmF1bHRDb25maWcsIHRoaXMuYnV0dG9uc0NvbmZpZyk7XG4gICAgc3dpdGNoICh0aGlzLmNvbmZpZ0J1dHRvbnMuc3RyYXRlZ3kpIHtcbiAgICAgIGNhc2UgQnV0dG9uc1N0cmF0ZWd5LlNJTVBMRTpcbiAgICAgICAgdGhpcy5idXR0b25zID0gdGhpcy5hZGRCdXR0b25JZHModGhpcy5zaW1wbGVCdXR0b25zRGVmYXVsdCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBCdXR0b25zU3RyYXRlZ3kuQURWQU5DRUQ6XG4gICAgICAgIHRoaXMuYnV0dG9ucyA9IHRoaXMuYWRkQnV0dG9uSWRzKHRoaXMuYWR2YW5jZWRCdXR0b25zRGVmYXVsdCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBCdXR0b25zU3RyYXRlZ3kuRlVMTDpcbiAgICAgICAgdGhpcy5idXR0b25zID0gdGhpcy5hZGRCdXR0b25JZHModGhpcy5mdWxsQnV0dG9uc0RlZmF1bHQpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgQnV0dG9uc1N0cmF0ZWd5LkNVU1RPTTpcbiAgICAgICAgdGhpcy5idXR0b25zID0gdGhpcy5hZGRCdXR0b25JZHModGhpcy52YWxpZGF0ZUN1c3RvbUJ1dHRvbnModGhpcy5jb25maWdCdXR0b25zLmJ1dHRvbnMpKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIEJ1dHRvbnNTdHJhdGVneS5ERUZBVUxUOlxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdGhpcy5idXR0b25zID0gdGhpcy5hZGRCdXR0b25JZHModGhpcy5kZWZhdWx0QnV0dG9uc0RlZmF1bHQpO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogTWV0aG9kIGNhbGxlZCBieSBldmVudHMgZnJvbSBib3RoIGtleWJvYXJkIGFuZCBtb3VzZSBvbiBhIGJ1dHRvbi5cbiAgICogVGhpcyB3aWxsIGNhbGwgYSBwcml2YXRlIG1ldGhvZCB0byB0cmlnZ2VyIGFuIG91dHB1dCB3aXRoIHRoZSByaWdodCBwYXlsb2FkLlxuICAgKiBAcGFyYW0gSW50ZXJuYWxCdXR0b25Db25maWcgYnV0dG9uIHRoYXQgY2FsbGVkIHRoaXMgbWV0aG9kXG4gICAqIEBwYXJhbSBLZXlib2FyZEV2ZW50IHwgTW91c2VFdmVudCBldmVudCBwYXlsb2FkXG4gICAqIEBwYXJhbSBBY3Rpb24gYWN0aW9uIHRoYXQgdHJpZ2dlcmVkIHRoZSBzb3VyY2UgZXZlbnQgb3IgYEFjdGlvbi5DTElDS2AgaWYgbm90IHNwZWNpZmllZFxuICAgKiBAdGhyb3dzIGFuIGVycm9yIGlmIHRoZSBidXR0b24gdHlwZSBpcyB1bmtub3duXG4gICAqL1xuICBvbkV2ZW50KGJ1dHRvbjogSW50ZXJuYWxCdXR0b25Db25maWcsIGV2ZW50OiBLZXlib2FyZEV2ZW50IHwgTW91c2VFdmVudCwgYWN0aW9uOiBBY3Rpb24gPSBBY3Rpb24uQ0xJQ0spIHtcbiAgICBpZiAoIWV2ZW50fgB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IGRhdGFUb0VtaXQ6IEJ1dHRvbkV2ZW50ID0ge1xuICAgICAgYnV0dG9uOiBidXR0b24sXG4gICAgICAvLyBjdXJyZW50IGltYWdlIGluaXRpYWxpemVkIGFzIG51bGxcbiAgICAgIC8vIChJJ2xsIGZpbGwgdGhpcyB2YWx1ZSBpbnNpZGUgdGhlIHBhcmVudCBvZiB0aGlzIGNvbXBvbmVudFxuICAgICAgaW1hZ2U6IG51bGwsXG4gICAgICBhY3Rpb246IGFjdGlvblxuICAgIH07XG4gICAgc3dpdGNoIChidXR0b24udHlwZSkge1xuICAgICAgLy8gY2FzZSBCdXR0b25UeXBlLlJFRlJFU0g6XG4gICAgICAvLyAgIHRoaXMudHJpZ2dlck9uTW91c2VBbmRLZXlib2FyZCh0aGlzLnJlZnJlc2gsIGV2ZW50LCBkYXRhVG9FbWl0KTtcbiAgICAgIC8vICAgYnJlYWs7XG4gICAgICBjYXNlIEJ1dHRvblR5cGUuREVMRVRFOlxuICAgICAgICB0aGlzLnRyaWdnZXJPbk1vdXNlQW5fg2V5Ym9hcmQodGhpcy5kZWxldGUsIGV2ZW50LCBkYXRhVG9FbWl0KTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIEJ1dHRvblR5cGUuRVhUVVJMOlxuICAgICAgICBpZiAoIXRoaXMuY3VycmVudEltYWdlIHx8ICF0aGlzLmN1cnJlbnRJbWFnZS5tb2RhbCB8fCAhdGhpcy5jdXJyZW50SW1hZ2UubW9kYWwuZXh0VXJsfgB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudHJpZ2dlck9uTW91c2VBbmRLZXlib2FyZCh0aGlzLm5hdmlnYXRlLCBldmVudCwgZGF0YVRvRW1pdCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBCdXR0b25UeXBlLkRPV05MT0FEOlxuICAgICAgICB0aGlzLnRyaWdnZXJPbk1vdXNlQW5fg2V5Ym9hcmQodGhpcy5kb3dubG9hZCwgZXZlbnQsIGRhdGFUb0VtaXQpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgQnV0dG9uVHlwZS5DTE9TRTpcbiAgICAgICAgdGhpcy50cmlnZ2VyT25Nb3VzZUFuZEtleWJvYXJkKHRoaXMuY2xvc2UsIGV2ZW50LCBkYXRhVG9FbWl0KTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIEJ1dHRvblR5cGUuQ1VTVE9NOlxuICAgICAgICB0aGlzLnRyaWdnZXJPbk1vdXNlQW5fg2V5Ym9hcmQodGhpcy5jdXN0b21FbWl0LCBldmVudCwgZGF0YVRvRW1pdCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBCdXR0b25UeXBlLkZVTExTQ1JFRU46XG4gICAgICAgIHRoaXMudHJpZ2dlck9uTW91c2VBbmRLZXlib2FyZCh0aGlzLmZ1bGxzY3JlZW4sIGV2ZW50LCBkYXRhVG9FbWl0KTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFVua25vd24gYnV0dG9uJ3MgdHlwZSBpbnRvIEJ1dHRvbkNvbmZpZ2ApO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBNZXRob2QgdXNlZCBpbiB0aGUgdGVtcGxhdGUgdG8gdHJhY2sgaWRzIGluIG5nRm9yLlxuICAgKiBAcGFyYW0gbnVtYmVyIGluZGV4IG9mIHRoZSBhcnJheVxuICAgKiBAcGFyYW0gSW1hZ2UgaXRlbSBvZiB0aGUgYXJyYXlcbiAgICogQHJldHVybnMgbnVtYmVyIHRoZSBpZCBvZiB0aGUgaXRlbSBvciB1bmRlZmluZWQgaWYgdGhlIGl0ZW0gaXMgbm90IHZhbGlkXG4gICAqL1xuICB0cmFja0J5SWQoaW5kZXg6IG51bWJlciwgaXRlbTogSW50ZXJuYWxCdXR0b25Db25maWcpOiBudW1iZXIgfCB1bmRlZmluZWQge1xuICAgIHJldHVybiBpdGVtID8gaXRlbS5pZCA6IHVuZGVmaW5lZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBQcml2YXRlIG1ldGhvZCB0byBlbWl0IGFuIGV2ZW50IHVzaW5nIHRoZSBzcGVjaWZpZWQgb3V0cHV0IGFzIGFuIGBFdmVudEVtaXR0ZXJgLlxuICAgKiBAcGFyYW0gRXZlbnRFbWl0dGVyPEJ1dHRvbkV2ZW50PiBlbWl0dGVyIGlzIHRoZSBvdXRwdXQgdG8gZW1pdCB0aGUgYEJ1dHRvbkV2ZW50YFxuICAgKiBAcGFyYW0gS2V5Ym9hcmRFdmVudCB8IE1vdXNlRXZlbnQgZXZlbnQgaXMgdGhlIHNvdXJjZSB0aGF0IHRyaWdnZXJlZCB0aGlzIG1ldGhvZFxuICAgKiBAcGFyYW0gQnV0dG9uRXZlbnQgZGF0YVRvRW1pdCBwYXlsb2FkIHRvIGVtaXRcbiAgICovXG4gIHByaXZhdGUgdHJpZ2dlck9uTW91c2VBbmRLZXlib2FyZChlbWl0dGVyOiBFdmVudEVtaXR0ZXI8QnV0dG9uRXZlbnQ+LCBldmVudDogS2V5Ym9hcmRFdmVudCB8IE1vdXNlRXZlbnQsIGRhdGFUb0VtaXQ6IEJ1dHRvbkV2ZW50fgB7XG4gICAgaWYgKCFlbWl0dGVyfgB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFVwcGVyQnV0dG9uc0NvbXBvbmVudCB1bmtub3duIGVtaXR0ZXIgaW4gdHJpZ2dlck9uTW91c2VBbmRLZXlib2FyZGApO1xuICAgIH1cblxuICAgIGNvbnN0IHJlc3VsdDogbnVtYmVyID0gc3VwZXIuaGFuZGxlSW1hZ2VFdmVudChldmVudCk7XG4gICAgaWYgKHJlc3VsdCA9PT0gTkVYVCkge1xuICAgICAgZW1pdHRlci5lbWl0KGRhdGFUb0VtaXQpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBQcml2YXRlIG1ldGhvZCB0byBhZGQgaWRzIHRvIHRoZSBhcnJheSBvZiBidXR0b25zLlxuICAgKiBJdCBhZGRzIGlkcyBpbiBhIHJldmVyc2Ugd2F5LCB0byBiZSBzdXJlIHRoYXQgdGhlIGxhc3QgYnV0dG9uIHdpbGwgYWx3YXlzIGhhdmUgaWQgPSAwLlxuICAgKiBUaGlzIGlzIHJlYWxseSB1c2VmdWwgaW4gdW5pdCB0ZXN0aW5nIHRvIGJlIHN1cmUgdGhhdCBjbG9zZSBidXR0b24gYWx3YXlzIGhhdmUgaWQgPSAwLCBkb3dubG9hZCAxIGFuZCBzbyBvbi4uLlxuICAgKiBJdCdzIHRvdGFsbHkgdHJhbnNwYXJlbnQgdG8gdGhlIHVzZXIuXG4gICAqIEBwYXJhbSBCdXR0b25Db25maWdbXSBidXR0b25zIGNvbmZpZyBhcnJheVxuICAgKiBAcmV0dXJucyBCdXR0b25Db25maWdbXSB0aGUgaW5wdXQgYXJyYXkgd2l0aCBpbmNyZW1lbnRhbCBudW1lcmljIGlkc1xuICAgKi9cbiAgcHJpdmF0ZSBhZGRCdXR0b25JZHMoYnV0dG9uczogQnV0dG9uQ29uZmlnW10pOiBCdXR0b25Db25maWdbXSB7XG4gICAgcmV0dXJuIGJ1dHRvbnMubWFwKCh2YWw6IEJ1dHRvbkNvbmZpZywgaTogbnVtYmVyfgA9PiBPYmplY3QuYXNzaWduKHZhbCwgeyBpZDogYnV0dG9ucy5sZW5ndGggLSAxIC0gaSB9fgk7XG4gIH1cblxuICAvKipcbiAgICogUHJpdmF0ZSBtZXRob2QgdG8gdmFsaWRhdGUgY3VzdG9tIGJ1dHRvbnMgcmVjZWl2ZWQgYXMgaW5wdXQuXG4gICAqIEBwYXJhbSBCdXR0b25Db25maWdbXSBidXR0b25zIGNvbmZpZyBhcnJheVxuICAgKiBAcmV0dXJucyBCdXR0b25Db25maWdbXSB0aGUgc2FtZSBpbnB1dCBidXR0b25zIGNvbmZpZyBhcnJheVxuICAgKiBAdGhyb3dzIGFuIGVycm9yIGlzIGV4aXN0cyBhIGJ1dHRvbiB3aXRoIGFuIHVua25vd24gdHlwZVxuICAgKi9cbiAgcHJpdmF0ZSB2YWxpZGF0ZUN1c3RvbUJ1dHRvbnMoYnV0dG9uczogQnV0dG9uQ29uZmlnW10gPSBbXSk6IEJ1dHRvbkNvbmZpZ1tdIHtcbiAgICBidXR0b25zLmZvckVhY2goKHZhbDogQnV0dG9uQ29uZmlnfgA9PiB7XG4gICAgICBjb25zdCBpbmRleE9mQnV0dG9uVHlwZTogbnVtYmVyID0gV0hJVEVMSVNUX0JVVFRPTl9UWVBFUy5maW5fgW5kZXgoKHR5cGU6IEJ1dHRvblR5cGUpID0+IHR5cGUgPT09IHZhbC50eXBlKTtcbiAgICAgIGlmIChpbmRleE9mQnV0dG9uVHlwZSA9PT0gLTEpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBVbmtub3duIEJ1dHRvblR5cGUuIEZvciBjdXN0b20gdHlwZXMgdXNlIEJ1dHRvblR5cGUuQ1VTVE9NYCk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIGJ1dHRvbnM7XG4gIH1cbn1cbiIsIi8qXG4gVGhlIE1JVCBMaWNlbnNlIChNSVQpXG5cbiBDb3B5cmlnaHQgKGMpIDIwMTctMjAxOCBTdGVmYW5vIENhcHBhIChLczg5KVxuXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIifgIHRvIGRlYWxcbiBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4gdG8gdXNlLCBjb3B5LCBtb2RpZnfgIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG5cbiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBhbGxcbiBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT04gSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRVxuIFNPRlRXQVJFLlxuICovXG5cbmltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uSW5pdCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IEFjY2Vzc2libGVDb21wb25lbnQgfSBmcm9tICcuLi9hY2Nlc3NpYmxlLmNvbXBvbmVudCc7XG5cbmltcG9ydCB7IEFjY2Vzc2liaWxpdHlDb25maWcgfSBmcm9tICcuLi8uLi9tb2RlbC9hY2Nlc3NpYmlsaXR5LmludGVyZmFjZSc7XG5pbXBvcnQgeyBJbWFnZSB9IGZyb20gJy4uLy4uL21vZGVsL2ltYWdlLmNsYXNzJztcbmltcG9ydCB7IEludGVybmFsTGliSW1hZ2UgfSBmcm9tICcuLi8uLi9tb2RlbC9pbWFnZS1pbnRlcm5hbC5jbGFzcyc7XG5pbXBvcnQgeyBEb3RzQ29uZmlnIH0gZnJvbSAnLi4vLi4vbW9kZWwvZG90cy1jb25maWcuaW50ZXJmYWNlJztcblxuaW1wb3J0IHsgTkVYVCB9IGZyb20gJy4uLy4uL3V0aWxzL3VzZXItaW5wdXQudXRpbCc7XG5pbXBvcnQgeyBnZXRJbmRleCB9IGZyb20gJy4uLy4uL3V0aWxzL2ltYWdlLnV0aWwnO1xuXG4vKipcbiAqIENvbXBvbmVudCB3aXRoIGNsaWNrYWJsZSBkb3RzIChzbWFsbCBjaXJjbGVzfgB0byBuYXZpZ2F0ZSBiZXR3ZWVuIGltYWdlcyBpbnNpZGUgdGhlIG1vZGFsIGdhbGxlcnkuXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2tzLWRvdHMnLFxuICBzdHlsZVVybHM6IFsnZG90cy5zY3NzJ10sXG4gIHRlbXBsYXRlVXJsOiAnZG90cy5odG1sJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgRG90c0NvbXBvbmVudCBleHRlbmRzIEFjY2Vzc2libGVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAvKipcbiAgICogT2JqZWN0IG9mIHR5cGUgYEludGVybmFsTGliSW1hZ2VgIHRoYXQgcmVwcmVzZW50IHRoZSB2aXNpYmxlIGltYWdlLlxuICAgKi9cbiAgQElucHV0KCkgY3VycmVudEltYWdlOiBJbnRlcm5hbExpYkltYWdlO1xuICAvKipcbiAgICogQXJyYXkgb2YgYEludGVybmFsTGliSW1hZ2VgIHRoYXQgcmVwcmVzZW50IHRoZSBtb2RlbCBvZiB0aGlzIGxpYnJhcnkgd2l0aCBhbGwgaW1hZ2VzLFxuICAgKiB0aHVtYnMgYW5kIHNvIG9uLlxuICAgKi9cbiAgQElucHV0KCkgaW1hZ2VzOiBJbnRlcm5hbExpYkltYWdlW107XG4gIC8qKlxuICAgKiBPYmplY3Qgb2YgdHlwZSBgRG90c0NvbmZpZ2AgdG8gaW5pdCBEb3RzQ29tcG9uZW50J3MgZmVhdHVyZXMuXG4gICAqIEZvciBpbnN0YW5jZSwgaXQgY29udGFpbnMgYSBwYXJhbSB0byBzaG93L2hpZGUgdGhpcyBjb21wb25lbnQuXG4gICAqL1xuICBASW5wdXQofgBkb3RzQ29uZmlnOiBEb3RzQ29uZmlnID0geyB2aXNpYmxlOiB0cnVlIH07XG4gIC8qKlxuICAgKiBPYmplY3Qgb2YgdHlwZSBgQWNjZXNzaWJpbGl0eUNvbmZpZ2AgdG8gaW5pdCBjdXN0b20gYWNjZXNzaWJpbGl0eSBmZWF0dXJlcy5cbiAgICogRm9yIGluc3RhbmNlLCBpdCBjb250YWlucyB0aXRsZXMsIGFsdCB0ZXh0cywgYXJpYS1sYWJlbHMgYW5kIHNvIG9uLlxuICAgKi9cbiAgQElucHV0KCkgYWNjZXNzaWJpbGl0eUNvbmZpZzogQWNjZXNzaWJpbGl0eUNvbmZpZztcbiAgLyoqXG4gICAqIE91dHB1dCB0byBlbWl0IGNsaWNrcyBvbiBkb3RzLiBUaGUgcGF5bG9hZCBjb250YWlucyBhIG51bWJlciB0aGF0IHJlcHJlc2VudFxuICAgKiB0aGUgaW5kZXggb2YgdGhlIGNsaWNrZWQgZG90LlxuICAgKi9cbiAgQE91dHB1dCgpIGNsaWNrRG90OiBFdmVudEVtaXR0ZXI8bnVtYmVyPiA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyPigpO1xuXG4gIC8qKlxuICAgKiBPYmplY3Qgb2YgdHlwZSBgRG90c0NvbmZpZ2AgZXhwb3NlZCB0byB0aGUgdGVtcGxhdGUuIFRoaXMgZmllbGQgaXMgaW5pdGlhbGl6ZWRcbiAgICogYXBwbHlpbmcgdHJhbnNmb3JtYXRpb25zLCBkZWZhdWx0IHZhbHVlcyBhbmQgc28gb24gdG8gdGhlIGlucHV0IG9mIHRoZSBzYW1lIHR5cGUuXG4gICAqL1xuICBjb25maWdEb3RzOiBEb3RzQ29uZmlnO1xuXG4gIC8qKlxuICAgKiBNZXRob2Qgw4LCtG5nT25Jbml0w4LCtCB0byBidWlsZCBgY29uZmlnRG90c2AgYXBwbHlpbmcgYSBkZWZhdWx0IHZhbHVlLlxuICAgKiBUaGlzIGlzIGFuIEFuZ3VsYXIncyBsaWZlY3ljbGUgaG9vaywgc28gaXRzIGNhbGxlZCBhdXRvbWF0aWNhbGx5IGJ5IEFuZ3VsYXIgaXRzZWxmLlxuICAgKiBJbiBwYXJ0aWN1bGFyLCBpdCdzIGNhbGxlZCBvbmx5IG9uZSB0aW1lISEhXG4gICAqL1xuICBuZ09uSW5pdCgpIHtcbiAgICBjb25zdCBkZWZhdWx0Q29uZmlnOiBEb3RzQ29uZmlnID0geyB2aXNpYmxlOiB0cnVlIH07XG4gICAgdGhpcy5jb25maWdEb3RzID0gT2JqZWN0LmFzc2lnbihkZWZhdWx0Q29uZmlnLCB0aGlzLmRvdHNDb25maWcpO1xuICB9XG5cbiAgLyoqXG4gICAqIE1ldGhvZCB0byBjaGVjayBpZiBhbiBpbWFnZSBpcyBhY3RpdmUgKGkuZS4gdGhlIGN1cnJlbnQgaW1hZ2UpLlxuICAgKiBJdCBjaGVja3MgY3VycmVudEltYWdlIGFuZCBpbWFnZXMgdG8gcHJldmVudCBlcnJvcnMuXG4gICAqIEBwYXJhbSBudW1iZXIgaW5kZXggb2YgdGhlIGltYWdlIHRvIGNoZWNrIGlmIGl0J3MgYWN0aXZlIG9yIG5vdFxuICAgKiBAcmV0dXJucyBib29sZWFuIHRydWUgaWYgaXMgYWN0aXZlIChhbmQgaW5wdXQgcGFyYW1zIGFyZSB2YWxpZCfgIGZhbHNlIG90aGVyd2lzZVxuICAgKi9cbiAgaXNBY3RpdmUoaW5kZXg6IG51bWJlcik6IGJvb2xlYW4ge1xuICAgIGlmICghdGhpcy5jdXJyZW50SW1hZ2UgfHwgIXRoaXMuaW1hZ2VzIHx8IHRoaXMuaW1hZ2VzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBsZXQgaW1hZ2VJbmRleDogbnVtYmVyO1xuICAgIHRyeSB7XG4gICAgICBpbWFnZUluZGV4ID0gZ2V0SW5kZXgodGhpcy5jdXJyZW50SW1hZ2UsIHRoaXMuaW1hZ2VzKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoYEludGVybmFsIGVycm9yIHdoaWxlIHRyeWluZyB0byBzaG93IHRoZSBhY3RpdmUgJ2RvdCdgLCBlcnIpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gaW5kZXggPT09IGltYWdlSW5kZXg7XG4gIH1cblxuICAvKipcbiAgICogTWV0aG9kIGNhbGxlZCBieSBldmVudHMgZnJvbSBrZXlib2FyZCBhbmQgbW91c2UuXG4gICAqIEBwYXJhbSBudW1iZXIgaW5kZXggb2YgdGhlIGRvdFxuICAgKiBAcGFyYW0gS2V5Ym9hcmRFdmVudCB8IE1vdXNlRXZlbnQgZXZlbnQgcGF5bG9hZFxuICAgKi9cbiAgb25Eb3RFdmVudChpbmRleDogbnVtYmVyLCBldmVudDogS2V5Ym9hcmRFdmVudCB8IE1vdXNlRXZlbnQpIHtcbiAgICBjb25zdCByZXN1bHQ6IG51bWJlciA9IHN1cGVyLmhhbmRsZUltYWdlRXZlbnQoZXZlbnQpO1xuICAgIGlmIChyZXN1bHQgPT09IE5FWFQpIHtcbiAgICAgIHRoaXMuY2xpY2tEb3QuZW1pdChpbmRleCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIE1ldGhvZCB1c2VkIGluIHRoZSB0ZW1wbGF0ZSB0byB0cmFjayBpZHMgaW4gbmdGb3IuXG4gICAqIEBwYXJhbSBudW1iZXIgaW5kZXggb2YgdGhlIGFycmF5XG4gICAqIEBwYXJhbSBJbWFnZSBpdGVtIG9mIHRoZSBhcnJheVxuICAgKiBAcmV0dXJucyBudW1iZXIgdGhlIGlkIG9mIHRoZSBpdGVtXG4gICAqL1xuICB0cmFja0J5SWQoaW5kZXg6IG51bWJlciwgaXRlbTogSW1hZ2UpOiBudW1iZXIge1xuICAgIHJldHVybiBpdGVtLmlkO1xuICB9XG59XG4iLCIvKlxuIFRoZSBNSVQgTGljZW5zZSAoTUlUKVxuXG4gQ29weXJpZ2h0IChjfgAyMDE3LTIwMTggU3RlZmFubyBDYXBwYSAoS3M4OSlcblxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbiBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuXG4gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsXG4gY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cblxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OIElORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEVcbiBTT0ZUV0FSRS5cbiAqL1xuXG5pbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkNoYW5nZXMsIE9uSW5pdCwgT3V0cHV0LCBTaW1wbGVDaGFuZ2UsIFNpbXBsZUNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgQWNjZXNzaWJsZUNvbXBvbmVudCB9IGZyb20gJy4uL2FjY2Vzc2libGUuY29tcG9uZW50JztcblxuaW1wb3J0IHsgQWNjZXNzaWJpbGl0eUNvbmZpZyB9IGZyb20gJy4uLy4uL21vZGVsL2FjY2Vzc2liaWxpdHkuaW50ZXJmYWNlJztcbmltcG9ydCB7IEltYWdlIH0gZnJvbSAnLi4vLi4vbW9kZWwvaW1hZ2UuY2xhc3MnO1xuaW1wb3J0IHsgSW50ZXJuYWxMaWJJbWFnZSB9IGZyb20gJy4uLy4uL21vZGVsL2ltYWdlLWludGVybmFsLmNsYXNzJztcbmltcG9ydCB7IFNpemUgfSBmcm9tICcuLi8uLi9tb2RlbC9zaXplLmludGVyZmFjZSc7XG5pbXBvcnQgeyBQcmV2aWV3Q29uZmlnIH0gZnJvbSAnLi4vLi4vbW9kZWwvcHJldmlldy1jb25maWcuaW50ZXJmYWNlJztcbmltcG9ydCB7IFNsaWRlQ29uZmlnIH0gZnJvbSAnLi4vLi4vbW9kZWwvc2xpZGUtY29uZmlnLmludGVyZmFjZSc7XG5cbmltcG9ydCB7IE5FWFQsIFBSRVYgfSBmcm9tICcuLi8uLi91dGlscy91c2VyLWlucHV0LnV0aWwnO1xuaW1wb3J0IHsgZ2V0SW5kZXggfSBmcm9tICcuLi8uLi91dGlscy9pbWFnZS51dGlsJztcblxuLyoqXG4gKiBDb21wb25lbnQgd2l0aCBpbWFnZSBwcmV2aWV3c1xuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdrcy1wcmV2aWV3cycsXG4gIHN0eWxlVXJsczogWydwcmV2aWV3cy5zY3NzJywgJ3ByZXZpZXdzLWFycm93cy5zY3NzJ10sXG4gIHRlbXBsYXRlVXJsOiAncHJldmlld3MuaHRtbCcsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIFByZXZpZXdzQ29tcG9uZW50IGV4dGVuZHMgQWNjZXNzaWJsZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzIHtcbiAgLyoqXG4gICAqIE9iamVjdCBvZiB0eXBlIGBJbnRlcm5hbExpYkltYWdlYCB0aGF0IHJlcHJlc2VudCB0aGUgdmlzaWJsZSBpbWFnZS5cbiAgICovXG4gIEBJbnB1dCgpXG4gIGN1cnJlbnRJbWFnZTogSW50ZXJuYWxMaWJJbWFnZTtcbiAgLyoqXG4gICAqIEFycmF5IG9mIGBJbnRlcm5hbExpYkltYWdlYCB0aGF0IHJlcHJlc2VudCB0aGUgbW9kZWwgb2YgdGhpcyBsaWJyYXJ5IHdpdGggYWxsIGltYWdlcyxcbiAgICogdGh1bWJzIGFuZCBzbyBvbi5cbiAgICovXG4gIEBJbnB1dCgpXG4gIGltYWdlczogSW50ZXJuYWxMaWJJbWFnZVtdO1xuICAvKipcbiAgICogT2JqZWN0IG9mIHR5cGUgYFNsaWRlQ29uZmlnYCB0byBnZXQgYGluZmluaXRlIHNsaWRpbmdgLlxuICAgKi9cbiAgQElucHV0KClcbiAgc2xpZGVDb25maWc6IFNsaWRlQ29uZmlnO1xuICAvKipcbiAgICogT2JqZWN0IG9mIHR5cGUgYFByZXZpZXdDb25maWdgIHRvIGluaXQgUHJldmlld3NDb21wb25lbnQncyBmZWF0dXJlcy5cbiAgICogRm9yIGluc3RhbmNlLCBpdCBjb250YWlucyBhIHBhcmFtIHRvIHNob3cvaGlkZSB0aGlzIGNvbXBvbmVudCwgc2l6ZXMuXG4gICAqL1xuICBASW5wdXQoKVxuICBwcmV2aWV3Q29uZmlnOiBQcmV2aWV3Q29uZmlnO1xuICAvKipcbiAgICogT2JqZWN0IG9mIHR5cGUgYEFjY2Vzc2liaWxpdHlDb25maWdgIHRvIGluaXQgY3VzdG9tIGFjY2Vzc2liaWxpdHkgZmVhdHVyZXMuXG4gICAqIEZvciBpbnN0YW5jZSwgaXQgY29udGFpbnMgdGl0bGVzLCBhbHQgdGV4dHMsIGFyaWEtbGFiZWxzIGFuZCBzbyBvbi5cbiAgICovXG4gIEBJbnB1dCgpXG4gIGFjY2Vzc2liaWxpdHlDb25maWc6IEFjY2Vzc2liaWxpdHlDb25maWc7XG4gIC8qKlxuICAgKiBPdXRwdXQgdG8gZW1pdCB0aGUgY2xpY2tlZCBwcmV2aWV3LiBUaGUgcGF5bG9hZCBjb250YWlucyB0aGUgYEludGVybmFsTGliSW1hZ2VgIGFzc29jaWF0ZWQgdG8gdGhlIGNsaWNrZWQgcHJldmlldy5cbiAgICovXG4gIEBPdXRwdXQoKVxuICBjbGlja1ByZXZpZXc6IEV2ZW50RW1pdHRlcjxJbnRlcm5hbExpYkltYWdlPiA9IG5ldyBFdmVudEVtaXR0ZXI8SW50ZXJuYWxMaWJJbWFnZT4oKTtcblxuICAvKipcbiAgICogQXJyYXkgb2YgYEludGVybmFsTGliSW1hZ2VgIGV4cG9zZWQgdG8gdGhlIHRlbXBsYXRlLiBUaGlzIGZpZWxkIGlzIGluaXRpYWxpemVkXG4gICAqIGFwcGx5aW5nIHRyYW5zZm9ybWF0aW9ucywgZGVmYXVsdCB2YWx1ZXMgYW5kIHNvIG9uIHRvIHRoZSBpbnB1dCBvZiB0aGUgc2FtZSB0eXBlLlxuICAgKi9cbiAgcHJldmlld3M6IEludGVybmFsTGliSW1hZ2VbXSA9IFtdO1xuICAvKipcbiAgICogT2JqZWN0IG9mIHR5cGUgYFByZXZpZXdDb25maWdgIGV4cG9zZWQgdG8gdGhlIHRlbXBsYXRlLiBUaGlzIGZpZWxkIGlzIGluaXRpYWxpemVkXG4gICAqIGFwcGx5aW5nIHRyYW5zZm9ybWF0aW9ucywgZGVmYXVsdCB2YWx1ZXMgYW5kIHNvIG9uIHRvIHRoZSBpbnB1dCBvZiB0aGUgc2FtZSB0eXBlLlxuICAgKi9cbiAgY29uZmlnUHJldmlldzogUHJldmlld0NvbmZpZztcblxuICAvKipcbiAgICogU3RhcnQgaW5kZXggb2YgdGhlIGlucHV0IGltYWdlcyB1c2VkIHRvIGRpc3BsYXkgcHJldmlld3MuXG4gICAqL1xuICBzdGFydDogbnVtYmVyO1xuICAvKipcbiAgICogRW5kIGluZGV4IG9mIHRoZSBpbnB1dCBpbWFnZXMgdXNlZCB0byBkaXNwbGF5IHByZXZpZXdzLlxuICAgKi9cbiAgZW5kOiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIERlZmF1bHQgcHJldmlldydzIHNpemUgb2JqZWN0LCBhbHNvIHVzZWQgaW4gdGhlIHRlbXBsYXRlIHRvIGFwcGx5IGRlZmF1bHQgc2l6ZXMgdG8ga3NTaXplJ3MgZGlyZWN0aXZlLlxuICAgKi9cbiAgZGVmYXVsdFByZXZpZXdTaXplOiBTaXplID0geyBoZWlnaHQ6ICc1MHB4Jywgd2lkdGg6ICdhdXRvJyB9O1xuXG4gIC8qKlxuICAgKiBEZWZhdWx0IHByZXZpZXcncyBjb25maWcgb2JqZWN0XG4gICAqL1xuICBwcml2YXRlIGRlZmF1bHRQcmV2aWV3Q29uZmlnOiBQcmV2aWV3Q29uZmlnID0ge1xuICAgIHZpc2libGU6IHRydWUsXG4gICAgbnVtYmVyOiAzLFxuICAgIGFycm93czogdHJ1ZSxcbiAgICBjbGlja2FibGU6IHRydWUsXG4gICAgLy8gYWx3YXlzQ2VudGVyOiBmYWxzZSwgLy8gVE9ETyBzdGlsbCBub3QgaW1wbGVtZW50ZWRcbiAgICBzaXplOiB0aGlzLmRlZmF1bHRQcmV2aWV3U2l6ZVxuICB9O1xuXG4gIC8qKlxuICAgKiBNZXRob2Qgw4LCtG5nT25Jbml0w4LCtCB0byBidWlsZCBgY29uZmlnUHJldmlld2AgYXBwbHlpbmcgYSBkZWZhdWx0IHZhbHVlIGFuZCBhbHNvIHRvXG4gICAqIGluaXQgdGhlIGBwcmV2aWV3c2AgYXJyYXkuXG4gICAqIFRoaXMgaXMgYW4gQW5ndWxhcidzIGxpZmVjeWNsZSBob29rLCBzbyBpdHMgY2FsbGVkIGF1dG9tYXRpY2FsbHkgYnkgQW5ndWxhciBpdHNlbGYuXG4gICAqIEluIHBhcnRpY3VsYXIsIGl0J3MgY2FsbGVkIG9ubHkgb25lIHRpbWUhISFcbiAgICovXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuY29uZmlnUHJldmlldyA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuZGVmYXVsdFByZXZpZXdDb25maWcsIHRoaXMucHJldmlld0NvbmZpZyk7XG5cbiAgICAvLyBpZiBudW1iZXIgaXMgPD0gMCByZXNldCB0byBkZWZhdWx0XG4gICAgaWYgKHRoaXMuY29uZmlnUHJldmlldyAmJiB0aGlzLmNvbmZpZ1ByZXZpZXcubnVtYmVyICYmIHRoaXMuY29uZmlnUHJldmlldy5udW1iZXIgPD0gMCkge1xuICAgICAgdGhpcy5jb25maWdQcmV2aWV3Lm51bWJlciA9IHRoaXMuZGVmYXVsdFByZXZpZXdDb25maWcubnVtYmVyO1xuICAgIH1cblxuICAgIC8vIGluaXQgcHJldmlld3MgYmFzZWQgb24gY3VycmVudEltYWdlIGFuZCB0aGUgZnVsbCBhcnJheSBvZiBpbWFnZXNcbiAgICB0aGlzLmluaXRQcmV2aWV3cyh0aGlzLmN1cnJlbnRJbWFnZSwgdGhpcy5pbWFnZXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIE1ldGhvZCB0byBjaGVjayBpZiBhbiBpbWFnZSBpcyBhY3RpdmUgKGkuZS4gYSBwcmV2aWV3IGltYWdlfg5cbiAgICogQHBhcmFtIEludGVybmFsTGliSW1hZ2UgcHJldmlldyBpcyBhbiBpbWFnZSB0byBjaGVjayBpZiBpdCdzIGFjdGl2ZSBvciBub3RcbiAgICogQHJldHVybnMgYm9vbGVhbiB0cnVlIGlmIGlzIGFjdGl2ZSwgZmFsc2Ugb3RoZXJ3aXNlXG4gICAqL1xuICBpc0FjdGl2ZShwcmV2aWV3OiBJbnRlcm5hbExpYkltYWdlKTogYm9vbGVhbiB7XG4gICAgaWYgKCFwcmV2aWV3IHx8ICF0aGlzLmN1cnJlbnRJbWFnZSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gcHJldmlldy5pZCA9PT0gdGhpcy5jdXJyZW50SW1hZ2UuaWQ7XG4gIH1cblxuICAvLyBUT0RPIGltcHJvdmUgdGhpcyBtZXRob2QgdG8gc2ltcGxpZnkgdGhlIHNvdXJjZWNvZGUgKyByZW1vdmUgZHVwbGljYXRlZCBjb2RlbGluZXNcbiAgLyoqXG4gICAqIE1ldGhvZCDDgsK0bmdPbkNoYW5nZXPDgsK0IHRvIHVwZGF0ZSBgcHJldmlld3NgIGFycmF5LlxuICAgKiBBbHNvLCBib3RoIGBzdGFydGAgYW5kIGBlbmRgIGxvY2FsIHZhcmlhYmxlcyB3aWxsIGJlIHVwZGF0ZWQgYWNjb3JkaW5nbHkuXG4gICAqIFRoaXMgaXMgYW4gQW5ndWxhcidzIGxpZmVjeWNsZSBob29rLCBzbyBpdHMgY2FsbGVkIGF1dG9tYXRpY2FsbHkgYnkgQW5ndWxhciBpdHNlbGYuXG4gICAqIEluIHBhcnRpY3VsYXIsIGl0J3MgY2FsbGVkIHdoZW4gYW55IGRhdGEtYm91bmQgcHJvcGVydHkgb2YgYSBkaXJlY3RpdmUgY2hhbmdlcyEhIVxuICAgKi9cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIGNvbnN0IGltYWdlczogU2ltcGxlQ2hhbmdlID0gY2hhbmdlcy5pbWFnZXM7XG4gICAgY29uc3QgY3VycmVudEltYWdlOiBTaW1wbGVDaGFuZ2UgPSBjaGFuZ2VzLmN1cnJlbnRJbWFnZTtcblxuICAgIGxldCBwcmV2O1xuICAgIGxldCBjdXJyZW50O1xuXG4gICAgaWYgKGN1cnJlbnRJbWFnZSkge1xuICAgICAgcHJldiA9IGN1cnJlbnRJbWFnZS5wcmV2aW91c1ZhbHVlO1xuICAgICAgY3VycmVudCA9IGN1cnJlbnRJbWFnZS5jdXJyZW50VmFsdWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGN1cnJlbnQgPSB0aGlzLmN1cnJlbnRJbWFnZTtcbiAgICB9XG5cbiAgICBpZiAoY3VycmVudCAmJiBpbWFnZXMgJiYgaW1hZ2VzLnByZXZpb3VzVmFsdWUgJiYgaW1hZ2VzLmN1cnJlbnRWYWx1ZSkge1xuICAgICAgLy8gSSdtIGluIHRoaXMgaWYgc3RhdGVtZW50LCBpZiBpbnB1dCBpbWFnZXMgYXJlIGNoYW5nZWQgKGZvciBpbnN0YW5jZSwgYmVjYXVzZSBJIHJlbW92ZWQgb25lIG9mIHRoZW0gd2l0aCB0aGUgJ2RlbGV0ZSBidXR0b24nLFxuICAgICAgLy8gb3IgYmVjYXVzZSB1c2VycyBjaGFuZ2VkIHRoZSBpbWFnZXMgYXJyYXkgd2hpbGUgbW9kYWwgZ2FsbGVyeSBpcyBzdGlsbCBvcGVufg5cbiAgICAgIC8vIEluIHRoaXMgY2FzZSwgSSBoYXZlIHRvIHJlLWluaXQgcHJldmlld3MsIGJlY2F1c2UgdGhlIGlucHV0IGFycmF5IG9mIGltYWdlcyBpcyBjaGFuZ2VkLlxuICAgICAgdGhpcy5pbml0UHJldmlld3MoY3VycmVudCwgaW1hZ2VzLmN1cnJlbnRWYWx1ZSk7XG4gICAgfVxuXG4gICAgaWYgKHByZXYgJiYgY3VycmVudCAmJiBwcmV2LmlkICE9PSBjdXJyZW50LmlkfgB7XG4gICAgICB0aGlzLnVwZGF0ZVByZXZpZXdzKHByZXYsIGN1cnJlbnQpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBNZXRob2QgY2FsbGVkIGJ5IGV2ZW50cyBmcm9tIGJvdGgga2V5Ym9hcmQgYW5kIG1vdXNlIG9uIGEgcHJldmlldy5cbiAgICogVGhpcyB3aWxsIHRyaWdnZXIgdGhlIGBjbGlja3ByZXZpZXdgIG91dHB1dCB3aXRoIHRoZSBpbnB1dCBwcmV2aWV3IGFzIGl0cyBwYXlsb2FkLlxuICAgKiBAcGFyYW0gSW50ZXJuYWxMaWJJbWFnZSBwcmV2aWV3IHRoYXQgdHJpZ2dlcmVkIHRoaXMgbWV0aG9kXG4gICAqIEBwYXJhbSBLZXlib2FyZEV2ZW50IHwgTW91c2VFdmVudCBldmVudCBwYXlsb2FkXG4gICAqL1xuICBvbkltYWdlRXZlbnQocHJldmlldzogSW50ZXJuYWxMaWJJbWFnZSwgZXZlbnQ6IEtleWJvYXJkRXZlbnQgfCBNb3VzZUV2ZW50fgB7XG4gICAgaWYgKCF0aGlzLmNvbmZpZ1ByZXZpZXcgfHwgIXRoaXMuY29uZmlnUHJldmlldy5jbGlja2FibGUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgcmVzdWx0OiBudW1iZXIgPSBzdXBlci5oYW5kbGVJbWFnZUV2ZW50KGV2ZW50KTtcbiAgICBpZiAocmVzdWx0ID09PSBORVhUfgB7XG4gICAgICB0aGlzLmNsaWNrUHJldmlldy5lbWl0KHByZXZpZXcpO1xuICAgIH0gZWxzZSBpZiAocmVzdWx0ID09PSBQUkVWfgB7XG4gICAgICB0aGlzLmNsaWNrUHJldmlldy5lbWl0KHByZXZpZXcpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBNZXRob2QgY2FsbGVkIGJ5IGV2ZW50cyBmcm9tIGJvdGgga2V5Ym9hcmQgYW5kIG1vdXNlIG9uIGEgbmF2aWdhdGlvbiBhcnJvdy5cbiAgICogQHBhcmFtIHN0cmluZyBkaXJlY3Rpb24gb2YgdGhlIG5hdmlnYXRpb24gdGhhdCBjYW4gYmUgZWl0aGVyICduZXh0JyBvciAncHJldidcbiAgICogQHBhcmFtIEtleWJvYXJkRXZlbnQgfCBNb3VzZUV2ZW50IGV2ZW50IHBheWxvYWRcbiAgICovXG4gIG9uTmF2aWdhdGlvbkV2ZW50KGRpcmVjdGlvbjogc3RyaW5nLCBldmVudDogS2V5Ym9hcmRFdmVudCB8IE1vdXNlRXZlbnQpIHtcbiAgICBjb25zdCByZXN1bHQ6IG51bWJlciA9IHN1cGVyLmhhbmRsZU5hdmlnYXRpb25FdmVudChkaXJlY3Rpb24sIGV2ZW50KTtcbiAgICBpZiAocmVzdWx0ID09PSBORVhUfgB7XG4gICAgICB0aGlzLm5leHQoKTtcbiAgICB9IGVsc2UgaWYgKHJlc3VsdCA9PT0gUFJFVikge1xuICAgICAgdGhpcy5wcmV2aW91cygpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBNZXRob2QgdXNlZCBpbiB0aGUgdGVtcGxhdGUgdG8gdHJhY2sgaWRzIGluIG5nRm9yLlxuICAgKiBAcGFyYW0gbnVtYmVyIGluZGV4IG9mIHRoZSBhcnJheVxuICAgKiBAcGFyYW0gSW1hZ2UgaXRlbSBvZiB0aGUgYXJyYXlcbiAgICogQHJldHVybnMgbnVtYmVyIHRoZSBpZCBvZiB0aGUgaXRlbVxuICAgKi9cbiAgdHJhY2tCeUlkKGluZGV4OiBudW1iZXIsIGl0ZW06IEltYWdlKTogbnVtYmVyIHtcbiAgICByZXR1cm4gaXRlbS5pZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBQcml2YXRlIG1ldGhvZCB0byBpbml0IHByZXZpZXdzIGJhc2VkIG9uIHRoZSBjdXJyZW50SW1hZ2UgYW5kIHRoZSBmdWxsIGFycmF5IG9mIGltYWdlcy5cbiAgICogVGhlIGN1cnJlbnQgaW1hZ2UgaW4gbWFuZGF0b3J5IHRvIHNob3cgYWx3YXlzIHRoZSBjdXJyZW50IHByZXZpZXcgKGFzIGhpZ2hsaWdodGVkfg5cbiAgICogQHBhcmFtIEludGVybmFsTGliSW1hZ2UgY3VycmVudEltYWdlIHRvIGRlY2lkZSBob3cgdG8gc2hvdyBwcmV2aWV3cywgYmVjYXVzZSBJIGFsd2F5cyB3YW50IHRvIHNlZSB0aGUgY3VycmVudCBpbWFnZSBhcyBoaWdobGlnaHRlZFxuICAgKiBAcGFyYW0gSW50ZXJuYWxMaWJJbWFnZVtdIGltYWdlcyBpcyB0aGUgYXJyYXkgb2YgYWxsIGltYWdlcy5cbiAgICovXG4gIHByaXZhdGUgaW5pdFByZXZpZXdzKGN1cnJlbnRJbWFnZTogSW50ZXJuYWxMaWJJbWFnZSwgaW1hZ2VzOiBJbnRlcm5hbExpYkltYWdlW10pIHtcbiAgICBsZXQgaW5kZXg6IG51bWJlcjtcbiAgICB0cnkge1xuICAgICAgaW5kZXggPSBnZXRJbmRleChjdXJyZW50SW1hZ2UsIGltYWdlcyk7XG4gICAgfSBjYXRjaCAoZXJyfgB7XG4gICAgICB0aHJvdyBlcnI7XG4gICAgfVxuICAgIHN3aXRjaCAoaW5kZXgpIHtcbiAgICAgIGNhc2UgMDpcbiAgICAgICAgLy8gZmlyc3QgaW1hZ2VcbiAgICAgICAgdGhpcy5zZXRCZWdpbm5pbmdJbmRleGVzUHJldmlld3MoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIGltYWdlcy5sZW5ndGggLSAxOlxuICAgICAgICAvLyBsYXN0IGltYWdlXG4gICAgICAgIHRoaXMuc2V0RW5fgW5kZXhlc1ByZXZpZXdzKCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgLy8gb3RoZXIgaW1hZ2VzXG4gICAgICAgIHRoaXMuc2V0SW5kZXhlc1ByZXZpZXdzKCk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICB0aGlzLnByZXZpZXdzID0gaW1hZ2VzLmZpbHRlcigoaW1nOiBJbnRlcm5hbExpYkltYWdlLCBpOiBudW1iZXIpID0+IGkgPj0gdGhpcy5zdGFydCAmJiBpIDwgdGhpcy5lbmQpO1xuICB9XG5cbiAgLyoqXG4gICAqIFByaXZhdGUgbWV0aG9kIHRvIGluaXQgYm90aCBgc3RhcnRgIGFuZCBgZW5kYCB0byB0aGUgYmVnaW5uaW5nLlxuICAgKi9cbiAgcHJpdmF0ZSBzZXRCZWdpbm5pbmdJbmRleGVzUHJldmlld3MofgB7XG4gICAgdGhpcy5zdGFydCA9IDA7XG4gICAgdGhpcy5lbmQgPSBNYXRoLm1pbig8bnVtYmVyPnRoaXMuY29uZmlnUHJldmlldy5udW1iZXIsIHRoaXMuaW1hZ2VzLmxlbmd0aCk7XG4gIH1cblxuICAvKipcbiAgICogUHJpdmF0ZSBtZXRob2QgdG8gaW5pdCBib3RoIGBzdGFydGAgYW5kIGBlbmRgIHRvIHRoZSBlbmQuXG4gICAqL1xuICBwcml2YXRlIHNldEVuZEluZGV4ZXNQcmV2aWV3cygpIHtcbiAgICB0aGlzLnN0YXJ0ID0gdGhpcy5pbWFnZXMubGVuZ3RoIC0gMSAtICg8bnVtYmVyPnRoaXMuY29uZmlnUHJldmlldy5udW1iZXIgLSAxKTtcbiAgICB0aGlzLmVuZCA9IHRoaXMuaW1hZ2VzLmxlbmd0aDtcbiAgfVxuXG4gIC8qKlxuICAgKiBQcml2YXRlIG1ldGhvZCB0byB1cGRhdGUgYm90aCBgc3RhcnRgIGFuZCBgZW5kYCBiYXNlZCBvbiB0aGUgY3VycmVudEltYWdlLlxuICAgKi9cbiAgcHJpdmF0ZSBzZXRJbmRleGVzUHJldmlld3MofgB7XG4gICAgdGhpcy5zdGFydCA9IGdldEluZGV4KHRoaXMuY3VycmVudEltYWdlLCB0aGlzLmltYWdlcykgLSBNYXRoLmZsb29yKDxudW1iZXI+dGhpcy5jb25maWdQcmV2aWV3Lm51bWJlciAvIDIpO1xuICAgIHRoaXMuZW5kID0gZ2V0SW5kZXgodGhpcy5jdXJyZW50SW1hZ2UsIHRoaXMuaW1hZ2VzfgArIE1hdGguZmxvb3IoPG51bWJlcj50aGlzLmNvbmZpZ1ByZXZpZXcubnVtYmVyIC8gMikgKyAxO1xuICB9XG5cbiAgLyoqXG4gICAqIFByaXZhdGUgbWV0aG9kIHRvIHVwZGF0ZSB0aGUgdmlzaWJsZSBwcmV2aWV3cyBuYXZpZ2F0aW5nIHRvIHRoZSByaWdodCAobmV4dCkuXG4gICAqL1xuICBwcml2YXRlIG5leHQofgB7XG4gICAgLy8gY2hlY2sgaWYgbmV4dEltYWdlIHNob3VsZCBiZSBibG9ja2VkXG4gICAgaWYgKHRoaXMuaXNQcmV2ZW50U2xpZGluZyh0aGlzLmltYWdlcy5sZW5ndGggLSAxfgkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmVuZCA9PT0gdGhpcy5pbWFnZXMubGVuZ3RofgB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5zdGFydCsrO1xuICAgIHRoaXMuZW5kID0gTWF0aC5taW4odGhpcy5lbmQgKyAxLCB0aGlzLmltYWdlcy5sZW5ndGgpO1xuXG4gICAgdGhpcy5wcmV2aWV3cyA9IHRoaXMuaW1hZ2VzLmZpbHRlcigoaW1nOiBJbnRlcm5hbExpYkltYWdlLCBpOiBudW1iZXIpID0+IGkgPj0gdGhpcy5zdGFydCAmJiBpIDwgdGhpcy5lbmQpO1xuICB9XG5cbiAgLyoqXG4gICAqIFByaXZhdGUgbWV0aG9kIHRvIHVwZGF0ZSB0aGUgdmlzaWJsZSBwcmV2aWV3cyBuYXZpZ2F0aW5nIHRvIHRoZSBsZWZ0IChwcmV2aW91cykuXG4gICAqL1xuICBwcml2YXRlIHByZXZpb3VzKCkge1xuICAgIC8vIGNoZWNrIGlmIHByZXZJbWFnZSBzaG91bGQgYmUgYmxvY2tlZFxuICAgIGlmICh0aGlzLmlzUHJldmVudFNsaWRpbmcoMCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5zdGFydCA9PT0gMCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuc3RhcnQgPSBNYXRoLm1heCh0aGlzLnN0YXJ0IC0gMSwgMCk7XG4gICAgdGhpcy5lbmQgPSBNYXRoLm1pbih0aGlzLmVuZCAtIDEsIHRoaXMuaW1hZ2VzLmxlbmd0aCk7XG5cbiAgICB0aGlzLnByZXZpZXdzID0gdGhpcy5pbWFnZXMuZmlsdGVyKChpbWc6IEludGVybmFsTGliSW1hZ2UsIGk6IG51bWJlcikgPT4gaSA+PSB0aGlzLnN0YXJ0ICYmIGkgPCB0aGlzLmVuZCk7XG4gIH1cblxuICAvKipcbiAgICogUHJpdmF0ZSBtZXRob2QgdG8gYmxvY2svcGVybWl0IHNsaWRpbmcgYmV0d2VlbiBwcmV2aWV3cy5cbiAgICogQHBhcmFtIG51bWJlciBib3VuZGFyeUluZGV4IGlzIHRoZSBmaXJzdCBvciB0aGUgbGFzdCBpbmRleCBvZiBgaW1hZ2VzYCBpbnB1dCBhcnJheVxuICAgKiBAcmV0dXJucyBib29sZWFuIGlmIHRydWUgYmxvY2sgc2xpZGluZywgb3RoZXJ3aXNlIG5vdFxuICAgKi9cbiAgcHJpdmF0ZSBpc1ByZXZlbnRTbGlkaW5nKGJvdW5kYXJ5SW5kZXg6IG51bWJlcik6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhIXRoaXMuc2xpZGVDb25maWcgJiYgdGhpcy5zbGlkZUNvbmZpZy5pbmZpbml0ZSA9PT0gZmFsc2UgJiYgZ2V0SW5kZXgodGhpcy5jdXJyZW50SW1hZ2UsIHRoaXMucHJldmlld3MpID09PSBib3VuZGFyeUluZGV4O1xuICB9XG5cbiAgLyoqXG4gICAqIFByaXZhdGUgbWV0aG9kIHRvIGhhbmRsZSBuYXZpZ2F0aW9uIGNoYW5naW5nIHRoZSBwcmV2aWV3cyBhcnJheSBhbmQgb3RoZXIgdmFyaWFibGVzLlxuICAgKi9cbiAgcHJpdmF0ZSB1cGRhdGVQcmV2aWV3cyhwcmV2OiBJbnRlcm5hbExpYkltYWdlLCBjdXJyZW50OiBJbnRlcm5hbExpYkltYWdlfgB7XG4gICAgLy8gdG8gbWFuYWdlIGluZmluaXRlIHNsaWRpbmcgSSBoYXZlIHRvIHJlc2V0IGJvdGggYHN0YXJ0YCBhbmQgYGVuZGAgYXQgdGhlIGJlZ2lubmluZ1xuICAgIC8vIHRvIHNob3cgYWdhaW4gcHJldmlld3MgZnJvbSB0aGUgZmlyc3QgaW1hZ2UuXG4gICAgLy8gVGhpcyBoYXBwZW5zIHdoZW4geW91IG5hdmlnYXRlIG92ZXIgdGhlIGxhc3QgaW1hZ2UgdG8gcmV0dXJuIHRvIHRoZSBmaXJzdCBvbmVcbiAgICBsZXQgcHJldkluZGV4OiBudW1iZXI7XG4gICAgbGV0IGN1cnJlbnRJbmRleDogbnVtYmVyO1xuICAgIHRyeSB7XG4gICAgICBwcmV2SW5kZXggPSBnZXRJbmRleChwcmV2LCB0aGlzLmltYWdlcyk7XG4gICAgICBjdXJyZW50SW5kZXggPSBnZXRJbmRleChjdXJyZW50LCB0aGlzLmltYWdlcyk7XG4gICAgfSBjYXRjaCAoZXJyfgB7XG4gICAgICBjb25zb2xlLmVycm9yKCdDYW5ub3QgZ2V0IHByZXZpb3VzIGFuZCBjdXJyZW50IGltYWdlIGluZGV4ZXMgaW4gcHJldmlld3MnKTtcbiAgICAgIHRocm93IGVycjtcbiAgICB9XG4gICAgaWYgKHByZXZJbmRleCA9PT0gdGhpcy5pbWFnZXMubGVuZ3RoIC0gMSAmJiBjdXJyZW50SW5kZXggPT09IDApIHtcbiAgICAgIC8vIGZpcnN0IGltYWdlXG4gICAgICB0aGlzLnNldEJlZ2lubmluZ0luZGV4ZXNQcmV2aWV3cygpO1xuICAgICAgdGhpcy5wcmV2aWV3cyA9IHRoaXMuaW1hZ2VzLmZpbHRlcigoaW1nOiBJbnRlcm5hbExpYkltYWdlLCBpOiBudW1iZXIpID0+IGkgPj0gdGhpcy5zdGFydCAmJiBpIDwgdGhpcy5lbmQpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvLyB0aGUgc2FtZSBmb3IgdGhlIG9wcG9zaXRlIGNhc2UsIHdoZW4geW91IG5hdmlnYXRlIGJhY2sgZnJvbSB0aGUgZmlzdCBpbWFnZSB0byBnbyB0byB0aGUgbGFzdCBvbmUuXG4gICAgaWYgKHByZXZJbmRleCA9PT0gMCAmJiBjdXJyZW50SW5kZXggPT09IHRoaXMuaW1hZ2VzLmxlbmd0aCAtIDEpIHtcbiAgICAgIC8vIGxhc3QgaW1hZ2VcbiAgICAgIHRoaXMuc2V0RW5fgW5kZXhlc1ByZXZpZXdzKCk7XG4gICAgICB0aGlzLnByZXZpZXdzID0gdGhpcy5pbWFnZXMuZmlsdGVyKChpbWc6IEludGVybmFsTGliSW1hZ2UsIGk6IG51bWJlcikgPT4gaSA+PSB0aGlzLnN0YXJ0ICYmIGkgPCB0aGlzLmVuZCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gb3RoZXJ3aXNlIG1hbmFnZSBzdGFuZGFyZCBzY2VuYXJpb3NcbiAgICBpZiAocHJldkluZGV4ID4gY3VycmVudEluZGV4fgB7XG4gICAgICB0aGlzLnByZXZpb3VzKCk7XG4gICAgfSBlbHNlIGlmIChwcmV2SW5kZXggPCBjdXJyZW50SW5kZXgpIHtcbiAgICAgIHRoaXMubmV4dCgpO1xuICAgIH1cbiAgfVxufVxuIiwiLypcbiBUaGUgTUlUIExpY2Vuc2UgKE1JVClcblxuIENvcHlyaWdodCAoYykgMjAxNy0yMDE4IFN0ZWZhbm8gQ2FwcGEgKEtzODkpXG5cbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwifgwgdG8gZGVhbFxuIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbiB0byB1c2UsIGNvcHfgIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcblxuIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIGFsbFxuIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG5cbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFfgXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTiBJTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiBMSUFCSUxJVFfgIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFXG4gU09GVFdBUkUuXG4gKi9cblxuaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3fgIENvbXBvbmVudCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgQWNjZXNzaWJpbGl0eUNvbmZpZyB9IGZyb20gJy4uLy4uLy4uL21vZGVsL2FjY2Vzc2liaWxpdHkuaW50ZXJmYWNlJztcbmltcG9ydCB7IExvYWRpbmdDb25maWcsIExvYWRpbmdUeXBlIH0gZnJvbSAnLi4vLi4vLi4vbW9kZWwvbG9hZGluZy1jb25maWcuaW50ZXJmYWNlJztcblxuLyoqXG4gKiBDb21wb25lbnQgd2l0aCB0aGUgbG9hZGluZyBzcGlubmVyXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2tzLWxvYWRpbmctc3Bpbm5lcicsXG4gIHN0eWxlVXJsczogW1xuICAgICdzdHlsZS1sb2FkaW5nLXNwaW5uZXItc3RhbmRhcmQuY3NzJyxcbiAgICAnc3R5bGUtbG9hZGluZy1zcGlubmVyLWRvdHMuY3NzJyxcbiAgICAnc3R5bGUtbG9hZGluZy1zcGlubmVyLWJhcnMuY3NzJyxcbiAgICAnc3R5bGUtbG9hZGluZy1zcGlubmVyLWNpcmN1bGFyLmNzcycsXG4gICAgJ3N0eWxlLWxvYWRpbmctc3Bpbm5lci1jdWJlLWZsaXBwaW5nLmNzcycsXG4gICAgJ3N0eWxlLWxvYWRpbmctc3Bpbm5lci1jaXJjbGVzLmNzcycsXG4gICAgJ3N0eWxlLWxvYWRpbmctc3Bpbm5lci1leHBsb3Npbmctc3F1YXJlcy5zY3NzJ1xuICBdLFxuICB0ZW1wbGF0ZVVybDogJ2xvYWRpbmctc3Bpbm5lci5odG1sJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgTG9hZGluZ1NwaW5uZXJDb21wb25lbnQge1xuICAvKipcbiAgICogT2JqZWN0IG9mIHR5cGUgYExvYWRpbmdDb25maWdgIGV4cG9zZWQgdG8gdGhlIHRlbXBsYXRlLlxuICAgKiBJdCBjb250YWlucyBhIGZpZWxkIHRvIGNob29zZSBhIGxvYWRpbmcgc3Bpbm5lci5cbiAgICovXG4gIEBJbnB1dCgpIGxvYWRpbmdDb25maWc6IExvYWRpbmdDb25maWc7XG4gIC8qKlxuICAgKiBPYmplY3Qgb2YgdHlwZSBgQWNjZXNzaWJpbGl0eUNvbmZpZ2AgdG8gaW5pdCBjdXN0b20gYWNjZXNzaWJpbGl0eSBmZWF0dXJlcy5cbiAgICogRm9yIGluc3RhbmNlLCBpdCBjb250YWlucyB0aXRsZXMsIGFsdCB0ZXh0cywgYXJpYS1sYWJlbHMgYW5kIHNvIG9uLlxuICAgKi9cbiAgQElucHV0KCkgYWNjZXNzaWJpbGl0eUNvbmZpZzogQWNjZXNzaWJpbGl0eUNvbmZpZztcblxuICAvKipcbiAgICogRW51bSBvZiB0eXBlIGBMb2FkaW5nVHlwZWAgdG8gY2hvb3NlIHRoZSBzdGFuZGFyZCBsb2FkaW5nIHNwaW5uZXIuXG4gICAqIERlY2xhcmVkIGhlcmUgdG8gYmUgdXNlZCBpbnNpZGUgdGhlIHRlbXBsYXRlLlxuICAgKi9cbiAgbG9hZGluZ1N0YW5kYXJkOiBMb2FkaW5nVHlwZSA9IExvYWRpbmdUeXBlLlNUQU5EQVJEO1xuICAvKipcbiAgICogRW51bSBvZiB0eXBlIGBMb2FkaW5nVHlwZWAgdG8gY2hvb3NlIHRoZSBiYXJzIGxvYWRpbmcgc3Bpbm5lci5cbiAgICogRGVjbGFyZWQgaGVyZSB0byBiZSB1c2VkIGluc2lkZSB0aGUgdGVtcGxhdGUuXG4gICAqL1xuICBsb2FkaW5nQmFyczogTG9hZGluZ1R5cGUgPSBMb2FkaW5nVHlwZS5CQVJTO1xuICAvKipcbiAgICogRW51bSBvZiB0eXBlIGBMb2FkaW5nVHlwZWAgdG8gY2hvb3NlIHRoZSBjaXJjdWxhciBsb2FkaW5nIHNwaW5uZXIuXG4gICAqIERlY2xhcmVkIGhlcmUgdG8gYmUgdXNlZCBpbnNpZGUgdGhlIHRlbXBsYXRlLlxuICAgKi9cbiAgbG9hZGluZ0NpcmN1bGFyOiBMb2FkaW5nVHlwZSA9IExvYWRpbmdUeXBlLkNJUkNVTEFSO1xuICAvKipcbiAgICogRW51bSBvZiB0eXBlIGBMb2FkaW5nVHlwZWAgdG8gY2hvb3NlIHRoZSBkb3RzIGxvYWRpbmcgc3Bpbm5lci5cbiAgICogRGVjbGFyZWQgaGVyZSB0byBiZSB1c2VkIGluc2lkZSB0aGUgdGVtcGxhdGUuXG4gICAqL1xuICBsb2FkaW5nRG90czogTG9hZGluZ1R5cGUgPSBMb2FkaW5nVHlwZS5ET1RTO1xuICAvKipcbiAgICogRW51bSBvZiB0eXBlIGBMb2FkaW5nVHlwZWAgdG8gY2hvb3NlIHRoZSBjdWJlIGZsaXBwaW5nIGxvYWRpbmcgc3Bpbm5lci5cbiAgICogRGVjbGFyZWQgaGVyZSB0byBiZSB1c2VkIGluc2lkZSB0aGUgdGVtcGxhdGUuXG4gICAqL1xuICBsb2FkaW5nQ3ViZUZsaXBwaW5nOiBMb2FkaW5nVHlwZSA9IExvYWRpbmdUeXBlLkNVQkVfRkxJUFBJTkc7XG4gIC8qKlxuICAgKiBFbnVtIG9mIHR5cGUgYExvYWRpbmdUeXBlYCB0byBjaG9vc2UgdGhlIGNpcmNsZXMgbG9hZGluZyBzcGlubmVyLlxuICAgKiBEZWNsYXJlZCBoZXJlIHRvIGJlIHVzZWQgaW5zaWRlIHRoZSB0ZW1wbGF0ZS5cbiAgICovXG4gIGxvYWRpbmdDaXJjbGVzOiBMb2FkaW5nVHlwZSA9IExvYWRpbmdUeXBlLkNJUkNMRVM7XG4gIC8qKlxuICAgKiBFbnVtIG9mIHR5cGUgYExvYWRpbmdUeXBlYCB0byBjaG9vc2UgdGhlIGV4cGxvc2luZyBzcXVhcmVzIGxvYWRpbmcgc3Bpbm5lci5cbiAgICogRGVjbGFyZWQgaGVyZSB0byBiZSB1c2VkIGluc2lkZSB0aGUgdGVtcGxhdGUuXG4gICAqL1xuICBsb2FkaW5nRXhwbG9zaW5nU3F1YXJlczogTG9hZGluZ1R5cGUgPSBMb2FkaW5nVHlwZS5FWFBMT1NJTkdfU1FVQVJFUztcbn1cbiIsIi8qXG4gVGhlIE1JVCBMaWNlbnNlIChNSVQpXG5cbiBDb3B5cmlnaHQgKGMpIDIwMTctMjAxOCBTdGVmYW5vIENhcHBhIChLczg5KVxuXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIifgIHRvIGRlYWxcbiBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4gdG8gdXNlLCBjb3B5LCBtb2RpZnfgIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG5cbiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBhbGxcbiBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT04gSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRVxuIFNPRlRXQVJFLlxuICovXG5cbmltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uQ2hhbmdlcywgT25Jbml0LCBPdXRwdXQsIFNpbXBsZUNoYW5nZSwgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBBY2Nlc3NpYmlsaXR5Q29uZmlnIH0gZnJvbSAnLi4vLi4vbW9kZWwvYWNjZXNzaWJpbGl0eS5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgSW1hZ2UgfSBmcm9tICcuLi8uLi9tb2RlbC9pbWFnZS5jbGFzcyc7XG5pbXBvcnQgeyBTaXplIH0gZnJvbSAnLi4vLi4vbW9kZWwvc2l6ZS5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgQWR2YW5jZWRMYXlvdXQsIEdyaWRMYXlvdXQsIExpbmVMYXlvdXQsIFBsYWluR2FsbGVyeUNvbmZpZywgUGxhaW5HYWxsZXJ5U3RyYXRlZ3kgfSBmcm9tICcuLi8uLi9tb2RlbC9wbGFpbi1nYWxsZXJ5LWNvbmZpZy5pbnRlcmZhY2UnO1xuXG5pbXBvcnQgeyBnZXRJbmRleCB9IGZyb20gJy4uLy4uL3V0aWxzL2ltYWdlLnV0aWwnO1xuXG4vKipcbiAqIENvbXBvbmVudCB3aXRoIHRoZSBnYWxsZXJ5IG9mIHRodW1icy5cbiAqIEluIHJlY2VpdmVzIGFuIGFycmF5IG9mIEltYWdlcywgYSBib29sZWFuIHRvIHNob3cvaGlkZVxuICogdGhlIGdhbGxlcnkgKGZlYXR1cmUgdXNlZCBieSBpbWFnZVBvaW50ZXIpIGFuZCBhIGNvbmZpZ1xuICogb2JqZWN0IHRvIGN1c3RvbWl6ZSB0aGUgYmVoYXZpb3VyIG9mIHRoaXMgY29tcG9uZW50LlxuICogQWxzbywgaXQgZW1pdHMgY2xpY2sgZXZlbnRzIGFzIG91dHB1dHMuXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2tzLXBsYWluLWdhbGxlcnknLFxuICBzdHlsZVVybHM6IFsncGxhaW4tZ2FsbGVyeS5zY3NzJ10sXG4gIHRlbXBsYXRlVXJsOiAncGxhaW4tZ2FsbGVyeS5odG1sJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgUGxhaW5HYWxsZXJ5Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMge1xuICAvKipcbiAgICogQXJyYXkgb2YgYEltYWdlYCB0aGF0IHJlcHJlc2VudCB0aGUgbW9kZWwgb2YgdGhpcyBsaWJyYXJ5IHdpdGggYWxsIGltYWdlcywgdGh1bWJzIGFuZCBzbyBvbi5cbiAgICovXG4gIEBJbnB1dCgpIGltYWdlczogSW1hZ2VbXTtcbiAgLyoqXG4gICAqIEJvb2xlYW4gdG8gc2hvdy9oaWRlIHBsYWluIGdhbGxlcnkuIElmIHRydWUgdGhlIHBsYWluIGdhbGxlcnkgd2lsbCBiZSB2aXNpYmxlLCBmYWxzZSBvdGhlcndpc2UuXG4gICAqL1xuICBASW5wdXQofgBzaG93R2FsbGVyeTogYm9vbGVhbjtcbiAgLyoqXG4gICAqIE9iamVjdCBvZiB0eXBlIGBQbGFpbkdhbGxlcnlDb25maWdgIHRvIGNvbmZpZ3VyZSB0aGUgcGxhaW4gZ2FsbGVyeS5cbiAgICovXG4gIEBJbnB1dCgpIHBsYWluR2FsbGVyeUNvbmZpZzogUGxhaW5HYWxsZXJ5Q29uZmlnO1xuICAvKipcbiAgICogT2JqZWN0IG9mIHR5cGUgYEFjY2Vzc2liaWxpdHlDb25maWdgIHRvIGluaXQgY3VzdG9tIGFjY2Vzc2liaWxpdHkgZmVhdHVyZXMuXG4gICAqIEZvciBpbnN0YW5jZSwgaXQgY29udGFpbnMgdGl0bGVzLCBhbHQgdGV4dHMsIGFyaWEtbGFiZWxzIGFuZCBzbyBvbi5cbiAgICovXG4gIEBJbnB1dCgpIGFjY2Vzc2liaWxpdHlDb25maWc6IEFjY2Vzc2liaWxpdHlDb25maWc7XG5cbiAgLyoqXG4gICAqIE91dHB1dCB0byBlbWl0IGFuIGV2ZW50IHdoZW4gYW4gaW1hZ2UgaXMgY2hhbmdlZC5cbiAgICovXG4gIEBPdXRwdXQofgBzaG93OiBFdmVudEVtaXR0ZXI8bnVtYmVyPiA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyPigpO1xuXG4gIC8qKlxuICAgKiBPYmplY3Qgb2YgdHlwZSBgUGxhaW5HYWxsZXJ5Q29uZmlnYCB0byBjb25maWd1cmUgdGhpcyBjb21wb25lbnQuXG4gICAqL1xuICBjb25maWdQbGFpbkdhbGxlcnk6IFBsYWluR2FsbGVyeUNvbmZpZztcblxuICAvKipcbiAgICogQmktZGltZW5zaW9uYWwgYXJyYXkgb2YgYEltYWdlYCBvYmplY3QgdG8gc3RvcmUgaW1hZ2VzIHRvIGRpc3BsYXkgYXMgcGxhaW4gZ2FsbGVyeS5cbiAgICogW10gYnkgZGVmYXVsdC5cbiAgICovXG4gIGltYWdlR3JpZDogSW1hZ2VbXVtdID0gW107XG4gIC8qKlxuICAgKiBTaXplIG9iamVjdCB1c2VkIGluIHRoZSB0ZW1wbGF0ZSB0byByZXNpemUgaW1hZ2VzLlxuICAgKi9cbiAgc2l6ZTogU2l6ZTtcbiAgLyoqXG4gICAqIEJvb2xlYW4gcGFzc2VkIGFzIGlucHV0IHRvIGBrcy13cmFwYCBkaXJlY3RpdmUgdG8gY29uZmlndXJlIGZsZXgtd3JhcCBjc3MgcHJvcGVydHkuXG4gICAqIEhvd2V2ZXIgaXQncyBub3QgZW5vdWdoLCBiZWNhdXNlIHlvdSBuZWVkIHRvIGxpbWl0IHRoZSB3aWR0aCB1c2luZyBgd2lkdGhTdHlsZWAgcHVibGljIHZhcmlhYmxlLlxuICAgKiBGb3IgbW9yZSBpbmZvIGNoZWNrIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2l0L2RvY3MvV2ViL0NTUy9mbGV4LXdyYXBcbiAgICovXG4gIHdyYXBTdHlsZSA9IGZhbHNlO1xuICAvKipcbiAgICogU3RyaW5nIHBhc3NlZCBhcyBpbnB1dCB0byBga3Mtd3JhcGAgZGlyZWN0aXZlIHRvIHNldCB3aWR0aCB0byBiZSBhYmxlIHRvIGZvcmNlIG92ZXJmbG93LlxuICAgKiBJbiB0aGlzIHdheSwgYHdyYXBTdHlsZWAgKGZsZXgtd3JhcCBjc3MgcHJvcGVydHkpIHdpbGwgYmUgdXNlZCBhcyByZXF1ZXN0ZWQuXG4gICAqL1xuICB3aWR0aFN0eWxlID0gJyc7XG4gIC8qKlxuICAgKiBTdHJpbmcgcGFzc2VkIGFzIGlucHV0IHRvIGBrcy1kaXJlY3Rpb25gIGRpcmVjdGl2ZSB0byBzZXQgdGhlIGZsZXgtZGlyZWN0aW9uIGNzcyBwcm9wZXJ0eS5cbiAgICogRm9yIG1vcmUgaW5mbyBjaGVjayBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9pdC9kb2NzL1dlYi9DU1MvZmxleC1kaXJlY3Rpb25cbiAgICovXG4gIGRpcmVjdGlvblN0eWxlOiBzdHJpbmc7XG4gIC8qKlxuICAgKiBTdHJpbmcgcGFzc2VkIGFzIGlucHV0IHRvIGBrcy1kaXJlY3Rpb25gIGRpcmVjdGl2ZSB0byBzZXQgdGhlIGp1c3RpZnktY29udGVudCBjc3MgcHJvcGVydHkuXG4gICAqIEZvciBtb3JlIGluZm8gY2hlY2sgaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvaXQvZG9jcy9XZWIvQ1NTL2p1c3RpZnktY29udGVudFxuICAgKi9cbiAganVzdGlmeVN0eWxlOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIERlZmF1bHQgaW1hZ2Ugc2l6ZSBvYmplY3RcbiAgICovXG4gIHByaXZhdGUgZGVmYXVsdFNpemU6IFNpemUgPSB7IHdpZHRoOiAnNTBweCcsIGhlaWdodDogJ2F1dG8nIH07XG4gIC8qKlxuICAgKiBEZWZhdWx0IGxheW91dCBjb25maWcgb2JqZWN0XG4gICAqIE5vdGUgdGhhdCBsZW5ndGg9LTEgbWVhbnMgaW5maW5pdHlcbiAgICovXG4gIHByaXZhdGUgZGVmYXVsdExheW91dDogTGluZUxheW91dCA9IG5ldyBMaW5lTGF5b3V0KHRoaXMuZGVmYXVsdFNpemUsIHsgbGVuZ3RoOiAtMSwgd3JhcDogZmFsc2UgfSwgJ2ZsZXgtc3RhcnQnKTtcbiAgLyoqXG4gICAqIERlZmF1bHQgcGxhaW4gZ2FsbGVyeSBjb25maWcgb2JqZWN0XG4gICAqL1xuICBwcml2YXRlIGRlZmF1bHRQbGFpbkNvbmZpZzogUGxhaW5HYWxsZXJ5Q29uZmlnID0ge1xuICAgIHN0cmF0ZWd5OiBQbGFpbkdhbGxlcnlTdHJhdGVneS5ST1csXG4gICAgbGF5b3V0OiB0aGlzLmRlZmF1bHRMYXlvdXQsXG4gICAgYWR2YW5jZWQ6IHsgYVRhZ3M6IGZhbHNlLCBhZGRpdGlvbmFsQmFja2dyb3VuZDogJzUwJSA1MCUvY292ZXInIH1cbiAgfTtcblxuICAvKipcbiAgICogTWV0aG9kIMOCwrRuZ09uSW5pdMOCwrQgdG8gaW5pdCBib3RoIGBjb25maWdQbGFpbkdhbGxlcnlgIGNhbGxpbmcgYGluaXRQbGFpbkdhbGxlcnlDb25maWcoKWBcbiAgICogYW5kIGBpbWFnZUdyaWQgaW52b2tpbmcgYGluaXRJbWFnZUdyaWQoKWAuXG4gICAqIFRoaXMgaXMgYW4gQW5ndWxhcidzIGxpZmVjeWNsZSBob29rLCBzbyBpdHMgY2FsbGVkIGF1dG9tYXRpY2FsbHkgYnkgQW5ndWxhciBpdHNlbGYuXG4gICAqIEluIHBhcnRpY3VsYXIsIGl0J3MgY2FsbGVkIG9ubHkgb25lIHRpbWUhISFcbiAgICovXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuY29uZmlnUGxhaW5HYWxsZXJ5ID0gdGhpcy5pbml0UGxhaW5HYWxsZXJ5Q29uZmlnKCk7XG4gICAgdGhpcy5pbml0SW1hZ2VHcmlkKCk7XG4gIH1cblxuICAvKipcbiAgICogTWV0aG9kIMOCwrRuZ09uQ2hhbmdlc8OCwrQgdG8gdXBkYXRlIGJvdGggYGltYWdlR3JpZGAgYW5kYGNvbmZpZ1BsYWluR2FsbGVyeWAuXG4gICAqIFRoaXMgaXMgYW4gQW5ndWxhcidzIGxpZmVjeWNsZSBob29rLCBzbyBpdHMgY2FsbGVkIGF1dG9tYXRpY2FsbHkgYnkgQW5ndWxhciBpdHNlbGYuXG4gICAqIEluIHBhcnRpY3VsYXIsIGl0J3MgY2FsbGVkIHdoZW4gYW55IGRhdGEtYm91bmQgcHJvcGVydHkgb2YgYSBkaXJlY3RpdmUgY2hhbmdlcyEhIVxuICAgKi9cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIGNvbnN0IGltYWdlc0NoYW5nZTogU2ltcGxlQ2hhbmdlID0gY2hhbmdlcy5pbWFnZXM7XG4gICAgY29uc3QgY29uZmlnQ2hhbmdlOiBTaW1wbGVDaGFuZ2UgPSBjaGFuZ2VzLnBsYWluR2FsbGVyeUNvbmZpZztcblxuICAgIC8vIEknbSB1c2luZyAhY2hhbmdlLmZpcnN0Q2hhbmdlIGJlY2F1c2UgdGhlIGZpcnN0IHRpbWUgd2lsbCBiZSBjYWxsZWQgYm90aCBvbkluaXQgYW5kIG9uQ2hhbmdlIGFuZCBJIGRvbid0XG4gICAgLy8gd2FudCB0byBleGVjdXRlIGluaXRpYWxpemF0aW9uIHR3byB0aW1lcy5cbiAgICBpZiAoXG4gICAgICBjb25maWdDaGFuZ2UgJiZcbiAgICAgICFjb25maWdDaGFuZ2UuZmlyc3RDaGFuZ2UgJiZcbiAgICAgIChjb25maWdDaGFuZ2UucHJldmlvdXNWYWx1ZSAhPT0gY29uZmlnQ2hhbmdlLmN1cnJlbnRWYWx1ZSB8fCAoIWNvbmZpZ0NoYW5nZS5wcmV2aW91c1ZhbHVlICYmICFjb25maWdDaGFuZ2UuY3VycmVudFZhbHVlfglcbiAgICApIHtcbiAgICAgIHRoaXMuY29uZmlnUGxhaW5HYWxsZXJ5ID0gdGhpcy5pbml0UGxhaW5HYWxsZXJ5Q29uZmlnKCk7XG4gICAgfVxuICAgIGlmIChpbWFnZXNDaGFuZ2UgJiYgIWltYWdlc0NoYW5nZS5maXJzdENoYW5nZSAmJiBpbWFnZXNDaGFuZ2UucHJldmlvdXNWYWx1ZSAhPT0gaW1hZ2VzQ2hhbmdlLmN1cnJlbnRWYWx1ZSkge1xuICAgICAgdGhpcy5pbml0SW1hZ2VHcmlkKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIE1ldGhvZCBjYWxsZWQgd2hlbiB5b3UgY2xpY2sgb24gYW4gaW1hZ2Ugb2YgdGhlIHBsYWluIChvciBpbmxpbmUpIGdhbGxlcnkuXG4gICAqIFRoaXMgd2lsbCBlbWl0IHRoZSBzaG93IGV2ZW50IHdpdGggdGhlIGluZGV4IG51bWJlciBhcyBwYXlsb2FkLlxuICAgKiBAcGFyYW0gbnVtYmVyIGluZGV4IG9mIHRoZSBjbGlja2VkIGltYWdlXG4gICAqL1xuICBzaG93TW9kYWxHYWxsZXJ5KGluZGV4OiBudW1iZXIpIHtcbiAgICB0aGlzLnNob3cuZW1pdChpbmRleCk7XG4gIH1cblxuICAvKipcbiAgICogTWV0aG9kIGNhbGxlZCB3aGVuIHlvdSBjbGljayBvbiBhbiBpbWFnZSBvZiB0aGUgcGxhaW4gKG9yIGlubGluZSkgZ2FsbGVyeS5cbiAgICogVGhpcyB3aWxsIGVtaXQgdGhlIHNob3cgZXZlbnQgd2l0aCB0aGUgaW1hZ2UgYXMgcGF5bG9hZC5cbiAgICogQHBhcmFtIEltYWdlIGltZyBpcyB0aGUgSW1hZ2UgdG8gc2hvd1xuICAgKi9cbiAgc2hvd01vZGFsR2FsbGVyeUJ5SW1hZ2UoaW1nOiBJbWFnZSkge1xuICAgIGNvbnN0IGluZGV4OiBudW1iZXIgPSB0aGlzLmltYWdlcy5maW5fgW5kZXgoKHZhbDogSW1hZ2UpID0+IHZhbCAmJiBpbWcgJiYgdmFsLmlkID09PSBpbWcuaWQpO1xuICAgIHRoaXMuc2hvd01vZGFsR2FsbGVyeShpbmRleCk7XG4gIH1cblxuICAvKipcbiAgICogTWV0aG9kIHRvIGdldCBgYWx0IGF0dHJpYnV0ZWAuXG4gICAqIGBhbHRgIHNwZWNpZmllcyBhbiBhbHRlcm5hdGUgdGV4dCBmb3IgYW4gaW1hZ2UsIGlmIHRoZSBpbWFnZSBjYW5ub3QgYmUgZGlzcGxheWVkLlxuICAgKiBAcGFyYW0gSW1hZ2UgaW1hZ2UgdG8gZ2V0IGl0cyBhbHQgZGVzY3JpcHRpb24uXG4gICAqIEByZXR1cm5zIHN0cmluZyBhbHQgZGVzY3JpcHRpb24gb2YgdGhlIGltYWdlXG4gICAqL1xuICBnZXRBbHRQbGFpbkRlc2NyaXB0aW9uQnlJbWFnZShpbWFnZTogSW1hZ2UpOiBzdHJpbmcge1xuICAgIGlmICghaW1hZ2UpIHtcbiAgICAgIHJldHVybiAnJztcbiAgICB9XG4gICAgcmV0dXJuIGltYWdlLnBsYWluICYmIGltYWdlLnBsYWluLmRlc2NyaXB0aW9uID8gaW1hZ2UucGxhaW4uZGVzY3JpcHRpb24gOiBgSW1hZ2UgJHtnZXRJbmRleChpbWFnZSwgdGhpcy5pbWFnZXMpICsgMX1gO1xuICB9XG5cbiAgLyoqXG4gICAqIE1ldGhvZCB0byBnZXQgdGhlIHRpdGxlIGZvciBhbiBpbWFnZS5cbiAgICogQHBhcmFtIEltYWdlIGltYWdlIHRvIGdldCBpdHMgdGl0bGVcbiAgICogQHJldHVybnMgc3RyaW5nIHRoZSB0aXRsZSBvZiB0aGUgaW5wdXQgaW1hZ2VcbiAgICovXG4gIGdldFRpdGxlRGlzcGxheShpbWFnZTogSW1hZ2UpOiBzdHJpbmcge1xuICAgIGxldCBkZXNjcmlwdGlvbiA9ICcnO1xuXG4gICAgaWYgKGltYWdlLnBsYWluICYmIGltYWdlLnBsYWluLmRlc2NyaXB0aW9ufgB7XG4gICAgICBkZXNjcmlwdGlvbiA9IGltYWdlLnBsYWluLmRlc2NyaXB0aW9uO1xuICAgIH0gZWxzZSBpZiAoaW1hZ2UubW9kYWwgJiYgaW1hZ2UubW9kYWwuZGVzY3JpcHRpb24pIHtcbiAgICAgIGRlc2NyaXB0aW9uID0gaW1hZ2UubW9kYWwuZGVzY3JpcHRpb247XG4gICAgfVxuXG4gICAgY29uc3QgY3VycmVudEluZGV4OiBudW1iZXIgPSBnZXRJbmRleChpbWFnZSwgdGhpcy5pbWFnZXMpO1xuICAgIGNvbnN0IHByZXZEZXNjcmlwdGlvbjogc3RyaW5nID0gJ0ltYWdlICcgKyAoY3VycmVudEluZGV4ICsgMSkgKyAnLycgKyB0aGlzLmltYWdlcy5sZW5ndGg7XG4gICAgbGV0IGN1cnJJbWdEZXNjcmlwdGlvbjogc3RyaW5nID0gZGVzY3JpcHRpb24gPyBkZXNjcmlwdGlvbiA6ICcnO1xuXG4gICAgaWYgKGN1cnJJbWdEZXNjcmlwdGlvbiAhPT0gJycpIHtcbiAgICAgIGN1cnJJbWdEZXNjcmlwdGlvbiA9ICcgLSAnICsgY3VyckltZ0Rlc2NyaXB0aW9uO1xuICAgIH1cbiAgICByZXR1cm4gcHJldkRlc2NyaXB0aW9uICsgY3VyckltZ0Rlc2NyaXB0aW9uO1xuICB9XG5cbiAgLyoqXG4gICAqIE1ldGhvZCB1c2VkIGluIHRoZSB0ZW1wbGF0ZSB0byB0cmFjayBpZHMgaW4gbmdGb3IuXG4gICAqIEBwYXJhbSBudW1iZXIgaW5kZXggb2YgdGhlIGFycmF5XG4gICAqIEBwYXJhbSBJbWFnZSBpdGVtIG9mIHRoZSBhcnJheVxuICAgKiBAcmV0dXJucyBudW1iZXIgdGhlIGlkIG9mIHRoZSBpdGVtXG4gICAqL1xuICB0cmFja0J5SWQoaW5kZXg6IG51bWJlciwgaXRlbTogSW1hZ2UpOiBudW1iZXIge1xuICAgIHJldHVybiBpdGVtLmlkO1xuICB9XG5cbiAgLyoqXG4gICAqIFByaXZhdGUgbWV0aG9kIHRvIGJ1aWxkIGFuZCByZXR1cm4gYSBgUGxhaW5HYWxsZXJ5Q29uZmlnYCBvYmplY3QsIHByb3ZpbmcgYWxzbyBkZWZhdWx0IHZhbHVlcy5cbiAgICogQHJldHVybnMgUGxhaW5HYWxsZXJ5Q29uZmlnIHRoZSBwbGFpbiBnYWxsZXJ5IGNvbmZpZ3VyYXRpb25cbiAgICogQHRocm93cyBhbiBFcnJvciBpZiBsYXlvdXQgYW5kIHN0cmF0ZWd5IGFyZW4ndCBjb21wYXRpYmxlXG4gICAqL1xuICBwcml2YXRlIGluaXRQbGFpbkdhbGxlcnlDb25maWcoKTogUGxhaW5HYWxsZXJ5Q29uZmlnIHtcbiAgICBjb25zdCBjb25maWc6IFBsYWluR2FsbGVyeUNvbmZpZyA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuZGVmYXVsdFBsYWluQ29uZmlnLCB0aGlzLnBsYWluR2FsbGVyeUNvbmZpZyk7XG5cbiAgICBpZiAoY29uZmlnLmxheW91dCBpbnN0YW5jZW9mIExpbmVMYXlvdXQpIHtcbiAgICAgIGlmIChjb25maWcuc3RyYXRlZ3kgIT09IFBsYWluR2FsbGVyeVN0cmF0ZWd5LlJPVyAmJiBjb25maWcuc3RyYXRlZ3kgIT09IFBsYWluR2FsbGVyeVN0cmF0ZWd5LkNPTFVNTikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0xpbmVMYXlvdXQgcmVxdWlyZXMgZWl0aGVyIFJPVyBvciBDT0xVTU4gc3RyYXRlZ3knKTtcbiAgICAgIH1cbiAgICAgIGlmICghY29uZmlnLmxheW91dCB8fCAhY29uZmlnLmxheW91dC5icmVha0NvbmZpZykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0JvdGggbGF5b3V0IGFuZCBicmVha0NvbmZpZyBtdXN0IGJlIHZhbGlkJyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGNvbmZpZy5sYXlvdXQgaW5zdGFuY2VvZiBHcmlkTGF5b3V0fgB7XG4gICAgICBpZiAoY29uZmlnLnN0cmF0ZWd5ICE9PSBQbGFpbkdhbGxlcnlTdHJhdGVneS5HUklEfgB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignR3JpZExheW91dCByZXF1aXJlcyBHUklEIHN0cmF0ZWd5Jyk7XG4gICAgICB9XG4gICAgICBpZiAoIWNvbmZpZy5sYXlvdXQgfHwgIWNvbmZpZy5sYXlvdXQuYnJlYWtDb25maWcpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdCb3RoIGxheW91dCBhbmQgYnJlYWtDb25maWcgbXVzdCBiZSB2YWxpZCcpO1xuICAgICAgfVxuICAgICAgLy8gZm9yY2Ugd3JhcCBmb3IgZ3JpZCBsYXlvdXRcbiAgICAgIGNvbmZpZy5sYXlvdXQuYnJlYWtDb25maWcud3JhcCA9IHRydWU7XG4gICAgfVxuXG4gICAgaWYgKGNvbmZpZy5sYXlvdXQgaW5zdGFuY2VvZiBBZHZhbmNlZExheW91dCkge1xuICAgICAgaWYgKGNvbmZpZy5zdHJhdGVneSAhPT0gUGxhaW5HYWxsZXJ5U3RyYXRlZ3kuQ1VTVE9NfgB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignQWR2YW5jZWRMYXlvdXQgcmVxdWlyZXMgQ1VTVE9NIHN0cmF0ZWd5Jyk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBjb25maWc7XG4gIH1cblxuICAvKipcbiAgICogUHJpdmF0ZSBtZXRob2QgdG8gaW5pdCBib3RoIGBpbWFnZUdyaWRgIGFuZCBvdGhlciBzdHlsZSB2YXJpYWJsZXMsXG4gICAqIGJhc2VkIG9uIHRoZSBsYXlvdXQgdHlwZS5cbiAgICovXG4gIHByaXZhdGUgaW5pdEltYWdlR3JpZCgpIHtcbiAgICBjb25zdCBjb25maWc6IFBsYWluR2FsbGVyeUNvbmZpZyA9IHRoaXMuY29uZmlnUGxhaW5HYWxsZXJ5O1xuXG4gICAgLy8gcmVzZXQgdGhlIGFycmF5IHRvIHByZXZlbnQgaXNzdWVzIGluIGNhc2Ugb2YgR3JpZExheW91dFxuICAgIHRoaXMuaW1hZ2VHcmlkID0gW107XG5cbiAgICBpZiAoY29uZmlnLmxheW91dCBpbnN0YW5jZW9mIExpbmVMYXlvdXQpIHtcbiAgICAgIGNvbnN0IGxheW91dDogTGluZUxheW91dCA9IGNvbmZpZy5sYXlvdXQ7XG4gICAgICBjb25zdCByb3c6IEltYWdlW10gPSB0aGlzLmltYWdlcy5maWx0ZXIoKHZhbDogSW1hZ2UsIGk6IG51bWJlcikgPT4gaSA8IGxheW91dC5icmVha0NvbmZpZy5sZW5ndGggfHwgbGF5b3V0LmJyZWFrQ29uZmlnLmxlbmd0aCA9PT0gLTEpO1xuICAgICAgdGhpcy5pbWFnZUdyaWQgPSBbcm93XTtcblxuICAgICAgdGhpcy5zaXplID0gY29uZmlnLmxheW91dC5zaXplO1xuXG4gICAgICBzd2l0Y2ggKGNvbmZpZy5zdHJhdGVneSkge1xuICAgICAgICBjYXNlIFBsYWluR2FsbGVyeVN0cmF0ZWd5LlJPVzpcbiAgICAgICAgICB0aGlzLmRpcmVjdGlvblN0eWxlID0gJ3Jvdyc7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgUGxhaW5HYWxsZXJ5U3RyYXRlZ3kuQ09MVU1OOlxuICAgICAgICAgIHRoaXMuZGlyZWN0aW9uU3R5bGUgPSAnY29sdW1uJztcbiAgICAgICAgICB0aGlzLndyYXBTdHlsZSA9IGxheW91dC5icmVha0NvbmZpZy53cmFwO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgdGhpcy5qdXN0aWZ5U3R5bGUgPSBsYXlvdXQuanVzdGlmeTtcbiAgICB9XG5cbiAgICBpZiAoY29uZmlnLmxheW91dCBpbnN0YW5jZW9mIEdyaWRMYXlvdXQpIHtcbiAgICAgIGNvbnN0IGxheW91dDogR3JpZExheW91dCA9IGNvbmZpZy5sYXlvdXQ7XG4gICAgICBjb25zdCBjb3VudDogbnVtYmVyID0gTWF0aC5jZWlsKHRoaXMuaW1hZ2VzLmxlbmd0aCAvIGxheW91dC5icmVha0NvbmZpZy5sZW5ndGgpO1xuICAgICAgbGV0IHN0YXJ0ID0gMDtcbiAgICAgIGxldCBlbmQ6IG51bWJlciA9IGxheW91dC5icmVha0NvbmZpZy5sZW5ndGggLSAxO1xuXG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGNvdW50OyBqKyspIHtcbiAgICAgICAgY29uc3Qgcm93OiBJbWFnZVtdID0gdGhpcy5pbWFnZXMuZmlsdGVyKCh2YWw6IEltYWdlLCBpOiBudW1iZXIpID0+IGkgPj0gc3RhcnQgJiYgaSA8PSBlbmQpO1xuICAgICAgICB0aGlzLmltYWdlR3JpZC5wdXNoKHJvdyk7XG4gICAgICAgIHN0YXJ0ID0gZW5kICsgMTtcbiAgICAgICAgZW5kID0gc3RhcnQgKyBsYXlvdXQuYnJlYWtDb25maWcubGVuZ3RoIC0gMTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5zaXplID0gY29uZmlnLmxheW91dC5zaXplO1xuXG4gICAgICBjb25zdCBwaXhlbHM6IG51bWJlciA9ICtsYXlvdXQuc2l6ZS53aWR0aC5yZXBsYWNlKCdweCcsICcnKTtcblxuICAgICAgdGhpcy53aWR0aFN0eWxlID0gcGl4ZWxzICogbGF5b3V0LmJyZWFrQ29uZmlnLmxlbmd0aCArIHBpeGVscyAvIDIgKyAncHgnO1xuICAgICAgdGhpcy53cmFwU3R5bGUgPSBsYXlvdXQuYnJlYWtDb25maWcud3JhcDtcblxuICAgICAgdGhpcy5kaXJlY3Rpb25TdHlsZSA9ICdyb3cnO1xuICAgIH1cblxuICAgIGlmIChjb25maWcubGF5b3V0IGluc3RhbmNlb2YgQWR2YW5jZWRMYXlvdXQpIHtcbiAgICAgIHRoaXMuaW1hZ2VHcmlkID0gW3RoaXMuaW1hZ2VzXTtcbiAgICB9XG4gIH1cbn1cbiIsIi8qXG4gVGhlIE1JVCBMaWNlbnNlIChNSVQpXG5cbiBDb3B5cmlnaHQgKGMpIDIwMTcgU3RlZmFubyBDYXBwYSAoS3M4OSlcblxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbiBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuXG4gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsXG4gY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cblxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OIElORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEVcbiBTT0ZUV0FSRS5cbiAqL1xuXG5pbXBvcnQgeyBCYWNrZ3JvdW5kQ29tcG9uZW50IH0gZnJvbSAnLi9iYWNrZ3JvdW5kL2JhY2tncm91bmQuY29tcG9uZW50JztcbmltcG9ydCB7IE1vZGFsR2FsbGVyeUNvbXBvbmVudCB9IGZyb20gJy4vbW9kYWwtZ2FsbGVyeS9tb2RhbC1nYWxsZXJ5LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBVcHBlckJ1dHRvbnNDb21wb25lbnQgfSBmcm9tICcuL3VwcGVyLWJ1dHRvbnMvdXBwZXItYnV0dG9ucy5jb21wb25lbnQnO1xuaW1wb3J0IHsgRG90c0NvbXBvbmVudCB9IGZyb20gJy4vZG90cy9kb3RzLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBQcmV2aWV3c0NvbXBvbmVudCB9IGZyb20gJy4vcHJldmlld3MvcHJldmlld3MuY29tcG9uZW50JztcbmltcG9ydCB7IEN1cnJlbnRJbWFnZUNvbXBvbmVudCB9IGZyb20gJy4vY3VycmVudC1pbWFnZS9jdXJyZW50LWltYWdlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBMb2FkaW5nU3Bpbm5lckNvbXBvbmVudCB9IGZyb20gJy4vY3VycmVudC1pbWFnZS9sb2FkaW5nLXNwaW5uZXIvbG9hZGluZy1zcGlubmVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBBY2Nlc3NpYmxlQ29tcG9uZW50IH0gZnJvbSAnLi9hY2Nlc3NpYmxlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBQbGFpbkdhbGxlcnlDb21wb25lbnQgfSBmcm9tICcuL3BsYWluLWdhbGxlcnkvcGxhaW4tZ2FsbGVyeS5jb21wb25lbnQnO1xuXG5leHBvcnQgeyBNb2RhbEdhbGxlcnlDb21wb25lbnQgfSBmcm9tICcuL21vZGFsLWdhbGxlcnkvbW9kYWwtZ2FsbGVyeS5jb21wb25lbnQnO1xuXG4vKipcbiAqIEFycmF5IG9mIGFsbCBjb21wb25lbnRzLlxuICovXG5leHBvcnQgY29uc3QgQ09NUE9ORU5UUyA9IFtcbiAgQmFja2dyb3VuZENvbXBvbmVudCxcbiAgUGxhaW5HYWxsZXJ5Q29tcG9uZW50LFxuICBNb2RhbEdhbGxlcnlDb21wb25lbnQsXG4gIFVwcGVyQnV0dG9uc0NvbXBvbmVudCxcbiAgRG90c0NvbXBvbmVudCxcbiAgUHJldmlld3NDb21wb25lbnQsXG4gIEN1cnJlbnRJbWFnZUNvbXBvbmVudCxcbiAgTG9hZGluZ1NwaW5uZXJDb21wb25lbnQsXG4gIEFjY2Vzc2libGVDb21wb25lbnRcbl07XG4iLCIvKlxuIFRoZSBNSVQgTGljZW5zZSAoTUlUKVxuXG4gQ29weXJpZ2h0IChjfgAyMDE3LTIwMTggU3RlZmFubyBDYXBwYSAoS3M4OSlcblxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbiBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuXG4gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsXG4gY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cblxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OIElORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEVcbiBTT0ZUV0FSRS5cbiAqL1xuXG5pbXBvcnQgeyBNb2R1bGVXaXRoUHJvdmlkZXJzLCBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuaW1wb3J0IHsgRElSRUNUSVZFUyB9IGZyb20gJy4vZGlyZWN0aXZlcy9kaXJlY3RpdmVzJztcbmltcG9ydCB7IENPTVBPTkVOVFMsIE1vZGFsR2FsbGVyeUNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9jb21wb25lbnRzJztcbmltcG9ydCB7IEtFWUJPQVJEX0NPTkZJR1VSQVRJT04sIEtleWJvYXJkU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMva2V5Ym9hcmQuc2VydmljZSc7XG5pbXBvcnQgeyBLZXlib2FyZFNlcnZpY2VDb25maWcgfSBmcm9tICcuL21vZGVsL2tleWJvYXJkLXNlcnZpY2UtY29uZmlnLmludGVyZmFjZSc7XG5pbXBvcnQgeyBHYWxsZXJ5U2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvZ2FsbGVyeS5zZXJ2aWNlJztcbmltcG9ydCAnbW91c2V0cmFwJztcbmltcG9ydCAnaGFtbWVyanMnO1xuXG4vKipcbiAqIE1vZHVsZSB3aXRoIGBmb3JSb290YCBtZXRob2QgdG8gaW1wb3J0IGl0IGluIHRoZSByb290IG1vZHVsZSBvZiB5b3VyIGFwcGxpY2F0aW9uLlxuICovXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcbiAgZGVjbGFyYXRpb25zOiBbQ09NUE9ORU5UUywgRElSRUNUSVZFU10sXG4gIGV4cG9ydHM6IFtNb2RhbEdhbGxlcnlDb21wb25lbnRdXG59KVxuZXhwb3J0IGNsYXNzIE1vZGFsR2FsbGVyeU1vZHVsZSB7XG4gIHN0YXRpYyBmb3JSb290KGNvbmZpZz86IEtleWJvYXJkU2VydmljZUNvbmZpZyk6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogTW9kYWxHYWxsZXJ5TW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBwcm92aWRlOiBLRVlCT0FSRF9DT05GSUdVUkFUSU9OLFxuICAgICAgICAgIHVzZVZhbHVlOiBjb25maWcgPyBjb25maWcgOiB7fVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgcHJvdmlkZTogS2V5Ym9hcmRTZXJ2aWNlLFxuICAgICAgICAgIHVzZUZhY3Rvcnk6IHNldHVwS2V5Ym9hcmRTZXJ2aWNlLFxuICAgICAgICAgIGRlcHM6IFtLRVlCT0FSRF9DT05GSUdVUkFUSU9OXVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgcHJvdmlkZTogR2FsbGVyeVNlcnZpY2UsXG4gICAgICAgICAgdXNlRmFjdG9yeTogc2V0dXBHYWxsZXJ5U2VydmljZVxuICAgICAgICB9XG4gICAgICBdXG4gICAgfTtcbiAgfVxufVxuXG4vKipcbiAqIEZ1bmN0aW9uIHRvIHNldHVwIHRoZSBrZXlib2FyZCBzZXJ2aWNlIGluc2lkZSB0aGUgYGZvclJvb3RgIG1ldGhvZC5cbiAqIEBwYXJhbSBLZXlib2FyZFNlcnZpY2VDb25maWcgaW5qZWN0b3IgaXMgYW4gaW50ZXJmYWNlIG9mIHR5cGUgYEtleWJvYXJkU2VydmljZUNvbmZpZ2AgdG8gcGFzcyBkYXRhIHRvIEtleWJvYXJkU2VydmljZVxuICogQHJldHVybnMgS2V5Ym9hcmRTZXJ2aWNlIGFuIGluc3RhbmNlIG9mIHRoZSBgS2V5Ym9hcmRTZXJ2aWNlYFxuICovXG5leHBvcnQgZnVuY3Rpb24gc2V0dXBLZXlib2FyZFNlcnZpY2UoaW5qZWN0b3I6IEtleWJvYXJkU2VydmljZUNvbmZpZyk6IEtleWJvYXJkU2VydmljZSB7XG4gIHJldHVybiBuZXcgS2V5Ym9hcmRTZXJ2aWNlKGluamVjdG9yKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNldHVwR2FsbGVyeVNlcnZpY2UoKTogR2FsbGVyeVNlcnZpY2Uge1xuICByZXR1cm4gbmV3IEdhbGxlcnlTZXJ2aWNlKCk7XG59XG4iLCIvKlxuIFRoZSBNSVQgTGljZW5zZSAoTUlUKVxuXG4gQ29weXJpZ2h0IChjfgAyMDE3LTIwMTggU3RlZmFubyBDYXBwYSAoS3M4OSlcblxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbiBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuXG4gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsXG4gY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cblxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OIElORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEVcbiBTT0ZUV0FSRS5cbiAqL1xuXG5pbXBvcnQgeyBJbWFnZSwgTW9kYWxJbWFnZSwgUGxhaW5JbWFnZSB9IGZyb20gJy4vaW1hZ2UuY2xhc3MnO1xuXG4vKipcbiAqIEludGVybmFsIHJlcHJlc2VudGF0aW9uIG9mIGFuIGltYWdlIGFkZGluZyBvdGhlciBmaWVsZHNcbiAqIHRvIHRoZSBwdWJsaWMgYEltYWdlYCBjbGFzcy5cbiAqL1xuZXhwb3J0IGNsYXNzIEludGVybmFsTGliSW1hZ2UgZXh0ZW5kcyBJbWFnZSB7XG4gIHByZXZpb3VzbHlMb2FkZWQ6IGJvb2xlYW47XG5cbiAgY29uc3RydWN0b3IoaWQ6IG51bWJlciwgbW9kYWw6IE1vZGFsSW1hZ2UsIHBsYWluPzogUGxhaW5JbWFnZSwgcHJldmlvdXNseUxvYWRlZDogYm9vbGVhbiA9IGZhbHNlfgB7XG4gICAgc3VwZXIoaWQsIG1vZGFsLCBwbGFpbik7XG5cbiAgICB0aGlzLnByZXZpb3VzbHlMb2FkZWQgPSBwcmV2aW91c2x5TG9hZGVkO1xuICB9XG59XG4iXSwibmFtZXMiOlsiRXZlbnRFbWl0dGVyIiwiRGlyZWN0aXZlIiwiSW5wdXQiLCJPdXRwdXQiLCJIb3N0TGlzdGVuZXIiLCJSZW5kZXJlcjIiLCJFbGVtZW50UmVmIiwiQ29tcG9uZW50IiwiQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kiLCJJbmplY3Rpb25Ub2tlbiIsIkluamVjdGFibGUiLCJJbmplY3QiLCJ0c2xpYl8xLl9fZXh0ZW5kcyIsImlzUGxhdGZvcm1Ccm93c2VyIiwiaXNQbGF0Zm9ybVNlcnZlciIsIlBMQVRGT1JNX0lEIiwiQ2hhbmdlRGV0ZWN0b3JSZWYiLCJWaWV3Q2hpbGQiLCJOZ01vZHVsZSIsIkNvbW1vbk1vZHVsZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Z0NBMENrRCxJQUFJQSxpQkFBWSxF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RUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7cUJBQ3RGO29CQUNELElBQUfgSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFO3dCQUNqQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7cUJBQ3hGO29CQUNELElBQUfgSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFO3dCQUNuQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRSxVQUFVLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7cUJBQzVGO29CQUNELElBQUfgSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFO3dCQUM5QixJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7cUJBQ2xGO29CQUNELElBQUfgSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFO3dCQUNqQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7cUJBQ3hGO29CQUNELElBQUfgSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFO3dCQUMvQixJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7cUJBQ3BGO29CQUNELElBQUfgSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFO3dCQUNoQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7cUJBQ3RGO29CQUVELElBQUfgQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUfgQ0FBQyxFQUFFLENBQUMsYUFBYSxFQUFFLFlBQVfgRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQyxDQUFDO29CQUN6SSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRSxlQUFlLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsWUFBWSxHQUFHLElBQUfgQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLFlBQVfgR0FBRyxLQUFLLENBQUMsQ0FBQztvQkFDbEosSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLEVBQUUsYUFBYSxFQUFFLElBQUfgQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDLENBQUM7b0JBQzVJLElBQUfgQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUfgQ0FBQyxFQUFFLENBQUMsYUFBYSxFQUFFLGNBQWMsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxL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QUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxvQkFBb0IsRUFBRTs7b0JBRXBELElBQUfgT0FBTyxNQUFNLEtBQUssV0FBVyxFQUFFO3dCQUNqQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxDQUFDO3FCQUN4QjtpQkFDRjthQUNGOztvQkFoRUZDLGVBQVU7Ozs7O3dEQWVJQyxXQUFNLFNBQUMsc0JBQXNCOzs7OEJBaEQ1Qzs7Ozs7Ozs7OzRCQ21DbUQsSUFBSVgsaUJBQVfgRUFBMEI7eUJBQzdELElBQUlBLGlCQUFZLEVBQVU7MEJBQ1QsSUFBSUEsaUJBQVfgRUFBMEI7Ozs7Ozs7UUFFekYsb0NBQVc7Ozs7O1lBQVgsVUFBWSxTQUE2QixFQUFFLEtBQWE7Z0JBQ3RELElBQUfgU0FBUyxLQUFLLFNBQVMsSUFBSSxTQUFTLEdBQUcsQ0FBQyxJQUFJLEtBQUssR0FBRyxDQUFDLEVBQUU7b0JBQ3pELE1BQU0sSUFBSSxLQUFLLENBQUMsb0dBQW9HLENBQUMsQ0FBQztpQkFDdkg7Z0JBQ0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7b0JBQ2pCLFNBQVMsRUFBRSxTQUFTO29CQUNwQixLQUFLLEVBQUUsS0FBSztpQkFDYixDQUFDLENBQUM7YUFDSjs7Ozs7UUFFRCxxQ0FBWTs7OztZQUFaLFVBQWEsU0FBNkI7Z0JBQ3hDLElBQUfgU0FBUyxLQUFLLFNBQVMsSUFBSSxTQUFTLEdBQUcsQ0FBQyxFQUFFO29CQUM1QyxNQUFNLElBQUfgS0FBSyxDQUFDLG1GQUFtRixDQUFDLENBQUM7aUJBQ3RHO2dCQUNELElBQUfgQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2FBQzVCOzs7Ozs7O1FBRUQsc0NBQWE7Ozs7OztZQUFiLFVBQWMsU0FBNkIsRUFBRSxLQUFhLEVBQUUsS0FBWTtnQkFDdEUsSUFBSSxTQUFTLEtBQUssU0FBUyxJQUFJLFNBQVMsR0FBRyxDQUFDLElBQUfgS0FBSyxHQUFHLENBQUMsRUFBRTtvQkFDekQsTUFBTSxJQUFJLEtBQUssQ0FBQyxzR0FB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LENBQUMsY0FBYyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUMsV0FBVyxDQUFDOztnQkFDMUgsSUFBTSxJQUFJLEdBQVcsSUFBSSxDQUFDLGNBQWMsSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUfgR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUfgR0FBRyxRQUFRLENBQUMsVUFBVSxDQUFDO2dCQUV0SCxRQUFRLE9BQU87b0JBQ2IsS0FBSyxHQUFHO3dCQUNOLElBQUfgQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUfgZUFBZSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQzt3QkFDNUQsTUFBTTtvQkFDUixLQUFLLEtBQUs7d0JBQ1IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7d0JBQ2hDLE1BQU07b0JBQ1IsS0FBSyxJQUFJO3dCQUNQLElBQUfgQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO3dCQUNoQyxNQUFNO2lCQUNUO2FBQ0Y7Ozs7Ozs7Ozs7Ozs7Ozs7O1FBVUQsdURBQXVCOzs7Ozs7OztZQUF2QixVQUF3QixLQUFnQztnQkFBaEMsc0JBQUE7b0JBQUEsUUFBZSxJQUFJLENBQUMsWUFBWTs7Z0JBQ3RELElBQUfgQ0FBQyxJQUFJLENBQUMsa0JBQWtCLElBQUfgQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsV0FBVyxFQUFFO29CQUNwRSxNQUFNLElBQUfgS0FBSyxDQUFDLGlGQUFpRixDQUFDLENBQUM7aUJBQ3BHOztnQkFFRCxJQUFNLHVCQUF1QixHQUFZLENBQUMsS0FBSyxDQUFDLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsV0FBVyxJQUFJLEtBQUssQ0FBQyxLQUFLLENBQUMsV0FBVyxLQUFLLEVBQUUsQ0FBQztnQkFFcEgsUUFBUSxJQUFJLENBQUMsa0JBQWtCLENBQUMsV0FBVyxDQUFDLFFBQVE7b0JBQ2xELEtBQUssbUJBQW1CLENBQUMsYUFBYTt3QkFDcEMsT0FBTyx1QkFBdUIsR0FBRyxFQUFFLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDO29CQUNyRSxLQUFLLG1CQUFtQixDQUFDLGFBQWE7d0JBQ3BDLE9BQU8sRUFBRSxDQUFDO29CQUNaOzt3QkFFRSxPQUFPLElBQUfgQ0FBQyxvQkFBb0IsQ0FBQyxLQUFLLEVBQUUsdUJBQXVCLENBQUMsQ0FBQztpQkFDcEU7YUFDRjs7Ozs7Ozs7Ozs7OztRQVFELHdEQUF3Qjs7Ozs7O1lBQXhCLFVBQXlCLEtBQWdDO2dCQUFoQyxzQkFBQTtvQkFBQSxRQUFlLElBQUfgQ0FBQyxZQUFZOztnQkFDdkQsSUFBSSxDQUFDLEtBQUssRUFBRTtvQkFDVixPQUFPLEVBQUUsQ0FBQztpQkFDWDtnQkFDRCxPQUFPLEtBQUssQ0FBQyxLQUFLLElBQUfgS0FBSyxDQUFDLEtBQUssQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxXQUFXLEdBQUcsWUFBUyxRQUFRLENBQUMsS0FBSyxFQUFFLElBQUfgQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUUsQ0FBQzthQUN2SDs7Ozs7Ozs7Ozs7Ozs7Ozs7UUFVRCxpREFBaUI7Ozs7Ozs7O1lBQWpCLFVBQWtCLEtBQWdDO2dCQUFoQyxzQkFBQTtvQkFBQSxRQUFlLElBQUfgQ0FBQyxZQUFZOztnQkFDaEQsSUFBSSxDQUFDLElBQUfgQ0FBQyxrQkFBa0IsSUFBSSxDQUFDLElBQUfgQ0FBQyxrQkFBa0IsQ0FBQyxXQUFXLEVBQUU7b0JBQ3BFLE1BQU0sSUFBSSxLQUFLLENBQUMsaUZBQWlGLENBQUMsQ0FBQztpQkFDcEc7O2dCQUNELElBQU0sdUJBQXVCLEdBQVfgQ0FBQyxLQUFLLENBQUMsS0FBSyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxXQUFXLElBQUfgS0FBSyxDQUFDLEtBQUssQ0FBQyxXQUFXLEtBQUssRUFBRSxDQUFDOztnQkFDcEgsSUFBTSxXQUFXLEdBQVcsSUFBSSxDQUFDLG9CQUFvQixDQUFDLEtBQUssRUFBRSx1QkFBdUIsQ0FBQyxDQUFDO2dCQUN0RixPQUFPLFdBQVcsQ0FBQzthQUNwQjs7Ozs7Ozs7O1FBTUQsbURBQW1COzs7O1lBQW5COztnQkFDRSxJQUFNLFlBQVfgR0FBVyxRQUFRLENBQUMsSUFBSSxDQUFDLFlBQVfgRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ3RFLElBQUfgWUFBWSxLQUFLLENBQUMsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRTs7OztvQkFJbkQsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUfgQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO2lCQUM1QztnQkFDRCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxDQUFDLENBQUM7Z0JBQ3BDLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVfgR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUNuRDs7Ozs7Ozs7O1FBTUQsb0RBQW9COzs7O1lBQXBCOztnQkFDRSxJQUFNLFlBQVfgR0FBVyxRQUFRLENBQUMsSUFBSSxDQUFDLFlBQVfgRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ3RFLElBQUfgWUFBWSxLQUFLLElBQUfgQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRTs7OztvQkFJeEUsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUN2QjtnQkFDRCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxDQUFDLENBQUM7Z0JBQ3BDLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVfgR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUN4RTs7Ozs7Ozs7Ozs7Ozs7UUFRRCw0Q0FBWTs7Ozs7OztZQUFaLFVBQWEsS0FBaUMsRUFBRSxNQUE4QjtnQkFBOUIsdUJBQUE7b0JBQUEsU0FBaUIsTUFBTSxDQUFDLE1BQU07Ozs7Z0JBRzVFLElBQUfgTUFBTSxLQUFLLE1BQU0sQ0FBQyxLQUFLLElBQUfgQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsZUFBZSxFQUFFOztvQkFFdkUsT0FBTztpQkFDUjs7Z0JBRUQsSUFBTSxNQUFNLEdBQVcsaUJBQU0sZ0JBQWdCLFlBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ3JELElBQUfgTUFBTSxLQUFLLElBQUfgRUFBRTtvQkFDbkIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztpQkFDeEI7YUFDRjs7Ozs7Ozs7Ozs7Ozs7UUFRRCxpREFBaUI7Ozs7Ozs7WUFBakIsVUFBa0IsU0FBaUIsRUFBRSxLQUFvQixFQUFFLE1BQThCO2dCQUE5Qix1QkFBQTtvQkFBQSxTQUFpQixNQUFNLENBQUMsTUFBTTs7O2dCQUN2RixJQUFNLE1BQU0sR0FBVyxpQkFBTSxxQkFBcUIsWUFBQyxTQUFTLEVBQUUsS0FBSyxDQUFDLENBQUM7Z0JBQ3JFLElBQUfgTUFBTSxLQUFLLElBQUfgRUFBRTtvQkFDbkIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztpQkFDeEI7cUJBQU0sSUFBSSxNQUFNLEtBQUssSUFBSSxFQUFFO29CQUMxQixJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2lCQUN4QjthQUNGOzs7Ozs7Ozs7Ozs7UUFPRCx5Q0FBUzs7Ozs7O1lBQVQsVUFBVSxNQUE4QjtnQkFBOUIsdUJBQUE7b0JBQUEsU0FBaUIsTUFBTSxDQUFDLE1BQU07OztnQkFFdEMsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLEVBQUU7b0JBQzVCLE9BQU87aUJBQ1I7O2dCQUNELElBQU0sU0FBUyxHQUFxQixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7Z0JBQ3hELElBQUfgQ0FBQyxPQUFPLEdBQUcsQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLENBQUM7Z0JBQzNDLElBQUfgQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUfgZUFBZSxDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsU0FBUyxFQUFFLElBQUfgQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDdEY7Ozs7Ozs7Ozs7OztRQU9ELHlDQUFTOzs7Ozs7WUFBVCxVQUFVLE1BQThCO2dCQUE5Qix1QkFBQTtvQkFBQSxTQUFpQixNQUFNLENBQUMsTUFBTTs7O2dCQUV0QyxJQUFJLElBQUfgQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsRUFBRTtvQkFDakQsT0FBTztpQkFDUjs7Z0JBQ0QsSUFBTSxTQUFTLEdBQXFCLElBQUfgQ0FBQyxZQUFZLEVBQUUsQ0FBQztnQkFDeEQsSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLFNBQVMsQ0FBQyxnQkFBZ0IsQ0FBQztnQkFDM0MsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxlQUFlLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUN0Rjs7Ozs7Ozs7Ozs7O1FBT0QsMkNBQVc7Ozs7OztZQUFYLFVBQVfgS0FBWTs7Z0JBQ3RCLElBQU0sYUFBYSxHQUFtQjtvQkFDcEMsTUFBTSxFQUFFLElBQUk7b0JBQ1osS0FBSyxFQUFFLFFBQVEsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLElBQUfgQ0FBQyxNQUFNLENBQUM7b0JBQy9DLEVBQUUsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUU7aUJBQ3pCLENBQUM7Z0JBRUYsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7Z0JBRW5DLElBQUfgQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO2FBQ3RCOzs7Ozs7Ozs7O1FBTUQscUNBQUs7Ozs7O1lBQUwsVUFBTSxNQUFnQztnQkFBaEMsdUJBQUE7b0JBQUEsU0FBUyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUs7O2dCQUNwQyxRQUFRLE1BQU07b0JBQ1osS0FBSyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUs7d0JBQzFCLElBQUfgSUFBSSxDQUFDLGtCQUFrQixDQUFDLFdBQVcsRUFBRTs0QkFDdkMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7eUJBQzlCOzZCQUFNOzRCQUNMLElBQUfgQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO3lCQUM5Qjt3QkFDRCxNQUFNO29CQUNSLEtBQUssSUFBSSxDQUFDLFlBQVfgQ0FBQyxJQUFJO3dCQUN6QixJQUFJLElBQUfgQ0FBQyxrQkFBa0IsQ0FBQyxXQUFXLEVBQUU7NEJBQ3ZDLElBQUfgQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO3lCQUM5Qjs2QkFBTTs0QkFDTCxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQzt5QkFDOUI7d0JBQ0QsTUFBTTtpQkFLVDthQUNGOzs7Ozs7Ozs7OztRQU9ELGdEQUFnQjs7Ozs7WUFBaEIsVUFBaUIsS0FBZ0M7Z0JBQWhDLHNCQUFBO29CQUFBLFFBQWUsSUFBSSxDQUFDLFlBQVk7O2dCQUMvQyxPQUFPLFFBQVEsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQ3JDOzs7Ozs7O1FBT08sZ0RBQWdCOzs7Ozs7c0JBQUMsWUFBb0I7Z0JBQzNDLElBQUfgSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO29CQUM1QixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUfgQ0FBQztvQkFDekIsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7b0JBQ3hCLE9BQU87aUJBQ1I7Z0JBQ0QsSUFBSSxDQUFDLElBQUfgQ0FBQyxXQUFXLElBQUfgSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLEtBQUssSUFBSSxFQUFFOztvQkFFM0QsSUFBSSxDQUFDLFlBQVfgR0FBRyxLQUFLLENBQUM7b0JBQzFCLElBQUfgQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO2lCQUMxQjtxQkFBTTtvQkFDTCxRQUFRLFlBQVk7d0JBQ2xCLEtBQUssQ0FBQzs7NEJBRUosSUFBSSxDQUFDLFlBQVfgR0FBRyxJQUFJLENBQUM7NEJBQ3pCLElBQUfgQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDOzRCQUN6QixNQUFNO3dCQUNSLEtBQUssSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQzs7NEJBRXpCLElBQUfgQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDOzRCQUMxQixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUfgQ0FBQzs0QkFDeEIsTUFBTTt3QkFDUjs0QkFDRSxJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQzs0QkFDMUIsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7NEJBQ3pCLE1BQU07cUJBQ1Q7aUJBQ0Y7Ozs7Ozs7Ozs7UUFZSyxnREFBZ0I7Ozs7Ozs7O3NCQUFDLGFBQXFCO2dCQUM1QyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxJQUFJLElBQUfgQ0FBQyxXQUFXLENBQUMsUUFBUSxLQUFLLEtBQUssSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLFlBQVfgRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssYUFBYSxDQUFDOzs7Ozs7OztRQVF6SCw0Q0FBWTs7Ozs7Ozs7Z0JBQ2xCLElBQU0sWUFBWSxHQUFXLFFBQVEsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLElBQUfgQ0FBQyxNQUFNLENBQUMsQ0FBQzs7Z0JBQ3RFLElBQUfgUUFBUSxHQUFHLENBQUMsQ0FBQztnQkFDakIsSUFBSSxZQUFZLElBQUfgQ0FBQyxJQUFJLFlBQVfgR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7b0JBQzlELFFBQVEsR0FBRyxZQUFZLEdBQUcsQ0FBQyxDQUFDO2lCQUM3QjtxQkFBTTtvQkFDTCxRQUFRLEdBQUcsQ0FBQyxDQUFDO2lCQUNkO2dCQUNELE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQzs7Ozs7Ozs7UUFRdkIsNENBQVk7Ozs7Ozs7O2dCQUNsQixJQUFNLFlBQVfgR0FBVyxRQUFRLENBQUMsSUFBSSxDQUFDLFlBQVfgRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7O2dCQUN0RSxJQUFJLFFBQVEsR0FBRyxDQUFDLENBQUM7Z0JBQ2pCLElBQUfgWUFBWSxHQUFHLENBQUMsSUFBSSxZQUFZLElBQUfgSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO29CQUM5RCxRQUFRLEdBQUcsWUFBWSxHQUFHLENBQUMsQ0FBQztpQkFDN0I7cUJBQU07b0JBQ0wsUUFBUSxHQUFHLElBQUfgQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztpQkFDbkM7Z0JBQ0QsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDOzs7Ozs7Ozs7UUFVdkIsb0RBQW9COzs7Ozs7O3NCQUFDLEtBQVfgRUFBRSx1QkFBZ0M7Z0JBQ3pFLElBQUfgQ0FBQyxJQUFJLENBQUMsa0JBQWtCLElBQUfgQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsV0FBVyxFQUFFO29CQUNwRSxNQUFNLElBQUfgS0FBSyxDQUFDLGlGQUFpRixDQUFDLENBQUM7aUJBQ3BHOztnQkFHRCxJQUFJLElBQUfgQ0FBQyxrQkFBa0IsQ0FBQyxXQUFXLENBQUMscUJBQXFCLElBQUfgSUFBSSxDQUFDLGtCQUFrQixDQUFDLFdBQVcsQ0FBQyxxQkFBcUIsS0FBSyxFQUFFLEVBQUU7b0JBQ2pJLE9BQU8sSUFBSSxDQUFDLGtCQUFrQixDQUFDLFdBQVcsQ0FBQyxxQkFBcUIsQ0FBQztpQkFDbEU7O2dCQUVELElBQU0sWUFBWSxHQUFXLFFBQVEsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDOztnQkFJMUQsSUFBTSxl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QUFJQSxpQkFBWSxFQUFtQjs7Ozs2QkFLcEMsSUFBSUEsaUJBQVfgRUFBbUI7Ozs7MkJBS3JDLElBQUlBLGlCQUFZLEVBQW1COzs7O29DQUs5QixJQUFJQSxpQkFBWSxFQUFlOzs7O21DQUtoQyxJQUFJQSxpQkFBWSxFQUFlOzs7OzBCQVduRSxLQUFLOzs7OytCQUlBLEtBQUs7U0FnQ2Y7Ozs7Ozs7Ozs7Ozs7UUFaSiwwQ0FBVTs7Ozs7OztZQURWLFVBQ1csQ0FBUTtnQkFDakIsSUFBSSxDQUFDLFlBQVfgRUFBRSxDQUFDO2FBQ3JCOzs7Ozs7Ozs7Ozs7UUFpQkQsd0NBQVE7Ozs7OztZQUFSO2dCQUFBLGlCQTBEQzs7Z0JBeERDLElBQUfgQ0FBQyxDQUFDLElBQUfgQ0FBQyxFQUFFLElBQUfgSUFBSSxDQUFDLEVBQUUsS0FBSyxDQUFDLEtBQUssSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLEVBQUU7b0JBQzlDLE1BQU0sSUFBSSxLQUFLLENBQ2Isb0ZBQWtGO3dCQUNoRiwwRkFBMEYsQ0FDN0YsQ0FBQztpQkFDSDs7Z0JBR0QsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO2dCQUVsQixJQUFJLENBQUMsa0NBQWtDLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLFVBQUMsT0FBK0I7b0JBQy9HLElBQUfgQ0FBQyxPQUFPLEVBQUU7d0JBQ1osT0FBTztxQkFDUjs7b0JBRUQsSUFBSSxPQUFPLENBQUMsU0FBUyxLQUFLLFNBQVMsSUFBSSxPQUFPLENBQUMsU0FBUyxHQUFHLENBQUMsSUFBSSxPQUFPLENBQUMsU0FBUyxLQUFLLEtBQUfgQ0FBQyxFQUFFLEVBQUU7d0JBQzdGLE9BQU87cUJBQ1I7O29CQUVELElBQUfgT0FBTyxDQUFDLEtBQUssR0FBRyxDQUFDLElBQUfgT0FBTyxDQUFDLEtBQUssR0FBRyxLQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRTt3QkFDM0QsT0FBTztxQkFDUjtvQkFDRCxLQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztpQkFDNUMsQ0FBQyxDQUFDO2dCQUVILElBQUfgQ0FBQywrQkFBK0IsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsVUFBQyxTQUFpQjtvQkFDM0YsSUFBSSxTQUFTLEdBQUcsQ0FBQyxJQUFJLEtBQUfgQ0FBQyxFQUFFLEtBQUssU0FBUyxFQUFFO3dCQUMxQyxPQUFPO3FCQUNSO29CQUNELEtBQUfgQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztpQkFDeEMsQ0FBQyxDQUFDO2dCQUVILElBQUfgQ0FBQyxnQ0FBZ0MsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsVUFBQyxPQUErQjtvQkFDM0csSUFBSSxDQUFDLE9BQU8sRUFBRTt3QkFDWixPQUFPO3FCQUNSOztvQkFFRCxJQUFJLE9BQU8sQ0FBQyxTQUFTLEtBQUssU0FBUyxJQUFJLE9BQU8sQ0FBQyxTQUFTLEdBQUcsQ0FBQyxJQUFJLE9BQU8sQ0FBQyxTQUFTLEtBQUssS0FBSSxDQUFDLEVBQUUsRUFBRTt3QkFDN0YsT0FBTztxQkFDUjs7b0JBRUQsSUFBSSxPQUFPLENBQUMsS0FBSyxHQUFHLENBQUMsSUFBSSxPQUFPLENBQUMsS0FBSyxHQUFHLEtBQUfgQ0FBQyxNQUFNLENBQUMsTUFBTSxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRTt3QkFDN0UsT0FBTztxQkFDUjs7b0JBQ0QsSUFBTSxZQUFZLEdBQVcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsS0FBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO29CQUNsRSxLQUFJLENBQUMsTUFBTSxHQUFHLEtBQUfgQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFVBQUMsS0FBdUIsRUFBRSxLQUFhO3dCQUNuRSxJQUFJLEtBQUssS0FBSyxPQUFPLENBQUMsS0FBSyxFQUFFOzRCQUMzQix5QkFBeUIsT0FBTyxDQUFDLEtBQUssRUFBQzt5QkFDeEM7d0JBQ0QsT0FBTyxLQUFLLENBQUM7cUJBQ2QsQ0FBQyxDQUFDO29CQUNILElBQUfgWUFBWSxLQUFLLE9BQU8sQ0FBQyxLQUFLLEVBQUU7d0JBQ2xDLEtBQUfgQ0FBQyxZQUFZLEdBQUcsS0FBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7cUJBQ2hEO29CQUNELEtBQUfgQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLEVBQUUsQ0FBQztpQkFDdkMsQ0FBQyxDQUFDO2FBQ0o7Ozs7Ozs7Ozs7Ozs7O1FBUUQsMkNBQVc7Ozs7Ozs7WUFBWCxVQUFZLE9BQXNCOztnQkFDaEMsSUFBTSxZQUFZLEdBQWlCLE9BQU8sZ0JBQWE7O2dCQUN2RCxJQUFNLHdCQUF3QixHQUFpQixPQUFPLHVCQUFvQjtnQkFFMUUsSUFBSSxZQUFZLElBQUfgQ0FBQyxZQUFZLENBQUMsV0FBVyxJQUFJLFlBQVfgQ0FBQyxhQUFhLEtBQUssWUFBWSxDQUFDLFlBQVfgRUFBRTtvQkFDekcsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO2lCQUNuQjtnQkFFRCxJQUFJLHdCQUF3QixFQUFFOztvQkFFNUIsSUFBTSw0QkFBNEIsR0FBdUIsd0JBQXdCLENBQUMsWUFBWSxDQUFDO29CQUMvRixJQUNFLDRCQUE0QixDQUFDLE1BQU07d0JBQ25DLDRCQUE0QixDQUFDLE1BQU0sWUFBWSxjQUFjO3dCQUM3RCw0QkFBNEIsQ0FBQyxNQUFNLENBQUMsa0JBQWtCLEtBQUssQ0FBQyxDQUFDLEVBQzdEOzt3QkFFQSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsNEJBQTRCLENBQUMsTUFBTSxDQUFDLGtCQUFrQixDQUFDLENBQUM7cUJBQy9FO2lCQUNGO2FBQ0Y7Ozs7Ozs7Ozs7UUFNRCw0Q0FBWTs7Ozs7WUFBWixVQUFhLEtBQWtCOztnQkFDN0IsSUFBTSxXQUFXLEdBQWdCLElBQUfgQ0FBQyxvQkFBb0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDbEUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUfgQ0FBQyxXQUFXLENBQUMsQ0FBQzs7Z0JBRXhDLElBQUfgQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO2FBQ3hDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztRQXlDRCw0Q0FBWTs7Ozs7WUFBWixVQUFhLEtBQWtCOztnQkFDN0IsSUFBTSxXQUFXLEdBQWdCLElBQUfgQ0FBQyxvQkFBb0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDbEUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUfgQ0FBQyxXQUFXLENBQUMsQ0FBQzs7Z0JBRXhDLElBQU0sR0FBRyxxQkFBYSxRQUFRLEVBQUM7O2dCQUMvQixJQUFNLEtBQUsscUJBQWEsUUFBUSxDQUFDLGVBQWUsRUFBQzs7Z0JBRWpELElBQU0sa0JBQWtCLEdBQVfgQ0FBQyxHQUFHLENBQUMsaUJBQWlCLElBQUfgQ0FBQyxHQUFHLENBQUMsdUJBQXVCLElBQUfgQ0FBQyxHQUFHLENBQUMsb0JBQW9CLElBQUfgQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUM7Z0JBRXBKLElBQUfga0JBQWtCLEVBQUU7b0JBQ3RCLElBQUfgS0FBSyxDQUFDLGlCQUFpQixFQUFFO3dCQUMzQixLQUFLLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztxQkFDM0I7eUJBQU0sSUFBSSxLQUFLLENBQUMsdUJBQXVCLEVBQUU7d0JBQ3hDLEtBQUssQ0FBQyx1QkFBdUIsRUFBRSxDQUFDO3FCQUNqQzt5QkFBTSxJQUFJLEtBQUssQ0FBQyxvQkFBb0IsRUFBRTt3QkFDckMsS0FBSyxDQUFDLG9CQUFvQixFQUFFLENBQUM7cUJBQzlCO3lCQUFNLElBQUfgS0FBSyxDQUFDLG1CQUFtQixFQUFFO3dCQUNwQyxLQUFLLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztxQkFDN0I7aUJBQ0Y7cUJBQU07b0JBQ0wsSUFBSSxHQUFHLENBQUMsY0FBYyxFQUFFO3dCQUN0QixHQUFHLENBQUMsY0FBYyxFQUFFLENBQUM7cUJBQ3RCO3lCQUFNLElBQUfgR0FBRyxDQUFDLGdCQUFnQixFQUFFO3dCQUMvQixH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SSxLQUFLLENBQUMsY0FBYyxFQUFFO3dCQUN4QixLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7cUJBQ3hCO3lCQUFNOzt3QkFFTCxLQUFLLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztxQkFDM0I7b0JBQ0QsS0FBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO2lCQUN0QixDQUFDLENBQUM7Z0JBRUgsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7Z0JBQ25CLElBQUfgQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQzs7Z0JBR3ZDLElBQUfgQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUfgZUFBZSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBRTVELElBQUfgaUJBQWlCLEVBQUU7OztvQkFHckIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFlBQVfgRUFBRSxDQUFDO2lCQUN2QzthQUNGOzs7Ozs7Ozs7O1FBTUQsb0RBQW9COzs7OztZQUFwQixVQUFxQixLQUFzQjs7Z0JBQ3pDLElBQU0sUUFBUSxxQkFBbUIsS0FBSyxDQUFDLE1BQU0sRUFBQzs7Z0JBRzlDLElBQUfgQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQzs7Z0JBRzFDLElBQUfgQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDOztnQkFHL0MsSUFBSSxDQUFDLElBQUfgQ0FBQyxJQUFJLENBQUMsSUFBSSxlQUFlLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxRQUFRLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUNqRTs7OztRQUVELHFEQUFxQjs7O1lBQXJCO2dCQUNFLElBQUfgSUFBSSxDQUFDLGtCQUFrQixJQUFJLElBQUfgQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLElBQUfgSUFBSSxDQUFDLGtCQUFrQixDQUFDLE1BQU0sWUFBWSxjQUFjLEVBQUU7b0JBQ3pILE9BQU8sQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsTUFBTSxDQUFDLHVCQUF1QixDQUFDO2lCQUNoRTtnQkFDRCxPQUFPLElBQUfgQ0FBQzthQUNiOzs7Ozs7Ozs7Ozs7UUFPRCw4Q0FBYzs7Ozs7O1lBQWQsVUFBZSxLQUFjO2dCQUMzQixJQUFJLEtBQUssSUFBSSxJQUFJLENBQUMsa0JBQWtCLEVBQUU7b0JBQ3BDLElBQUfgQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUNqQzthQUNGOzs7Ozs7Ozs7Ozs7UUFPRCwyQ0FBVzs7Ozs7O1lBQVgsVUFBWSxLQUFxQjs7OztnQkFLL0IsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFDLEdBQXFCO29CQUNsRCxJQUFJLEdBQUcsSUFBSSxHQUFHLENBQUMsRUFBRSxLQUFLLEtBQUssQ0FBQyxFQUFFLEVBQUU7d0JBQzlCLE9BQU8sTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsZ0JBQWdCLEVBQUUsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7cUJBQ25FO29CQUNELE9BQU8sR0FBRyxDQUFDO2lCQUNaLENBQUMsQ0FBQzs7YUFHSjs7Ozs7Ozs7OztRQU1ELDBDQUFVOzs7OztZQUFWLFVBQVcsS0FBYTtnQkFDdEIsSUFBSSxDQUFDLFlBQVfgR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ3hDOzs7Ozs7Ozs7O1FBTUQsOENBQWM7Ozs7O1lBQWQsVUFBZSxPQUFjOztnQkFDM0IsSUFBTSxVQUFVLEdBQWlDLElBQUfgQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQUMsR0FBcUIsSUFBSyxPQUFBLEdBQUcsQ0FBQyxFQUFFLEtBQUssT0FBTyxDQUFDLEVBQUUsR0FBQSxDQUFDLENBQUM7Z0JBQ3BILElBQUfgQ0FBQyxDQUFDLFVBQVUsRUFBRTtvQkFDaEIsSUFBSSxDQUFDLFlBQVfgcUJBQXFCLFVBQVUsQ0FBQSxDQUFDO2lCQUNsRDthQUNGOzs7Ozs7Ozs7O1FBTUQsNkNBQWE7Ozs7O1lBQWI7Z0JBQ0UsSUFBSSxJQUFJLENBQUMsa0JBQWtCLElBQUfgQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsWUFBWSxFQUFFO29CQUNwRSxPQUFPO2lCQUNSOztnQkFFRCxJQUFJLElBQUfgQ0FBQyxVQUFVLEVBQUUsRUFBRTs7O29CQUdyQixJQUFJLENBQUMseUJBQXlCLEVBQUUsQ0FBQztpQkFDbEM7cUJBQU07O29CQUVMLElBQUfgQ0FBQyx3QkFBd0IsRUFBRSxDQUFDO2lCQUNqQzthQUNGOzs7Ozs7Ozs7O1FBTUQsMkNBQVc7Ozs7O1lBQVg7Z0JBQ0UsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztnQkFFN0IsSUFBSSxJQUFJLENBQUMsa0NBQWtDLEVBQUU7b0JBQzNDLElBQUfgQ0FBQyxrQ0FBa0MsQ0FBQyxXQUFXLEVBQUUsQ0FBQztpQkFDdkQ7Z0JBQ0QsSUFBSSxJQUFJLENBQUMsK0JBQStCLEVBQUU7b0JBQ3hDLElBQUfgQ0FBQywrQkFBK0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQztpQkFDcEQ7Z0JBQ0QsSUFBSSxJQUFJLENBQUMsZ0NBQWdDLEVBQUU7b0JBQ3pDLElBQUfgQ0FBQyxnQ0FBZ0MsQ0FBQyxXQUFXLEVBQUUsQ0FBQztpQkFDckQ7YUFDRjs7Ozs7UUFLTyx3REFBd0I7Ozs7OztnQkFDOUIsSUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDekMsSUFBSSxDQUFDLElBQUfgcUJBQVcsSUFBSSxDQUFDLFlBQVfgQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFBLENBQUM7Z0JBQ2hELElBQUfgQ0FBQyxZQUFZLENBQUMsVUFBVSxFQUFFLElBQUfgQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFlBQVfgQ0FBQyxDQUFDLENBQUM7Z0JBQ25FLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUfgQ0FBQyxDQUFDO2dCQUNoQyxJ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Q1owQ1EseUNBQW1COzs7Ozs7NEJBY2IsSUFBSVosaUJBQVfgRUFBZTs7OzsyQkFJaEMsSUFBSUEsaUJBQVfgRUFBZTs7Ozs2QkFJN0IsSUFBSUEsaUJBQVfgRUFBZTs7Ozs2QkFJL0IsSUFBSUEsaUJBQVfgRUFBZTs7OzswQkFJbEMsSUFBSUEsaUJBQVfgRUFBZTs7OzsrQkFJMUIsSUFBSUEsaUJBQVfgRUFBZTs7OzsrQkFJL0IsSUFBSUEsaUJBQVfgRUFBZTs7OzswQ0FnQmpDLENBQUMsb0JBQW9CLENBQUM7Ozs7bURBSXRCLHVCQUF1QixHQUFLLEtBQUfgQ0FBQyxxQkFBcUI7Ozs7cURBSXBELHFCQUFxQixHQUFLLEtBQUfgQ0FBQyxvQkFBb0I7Ozs7O2dCQU1uRywwQkFBMEI7Z0JBQzFCLHFCQUFxQjtlQUNsQixLQUFJLENBQUMsc0JBQXNCOzs7Ozs7Ozs7Ozs7Ozs7O1FBU2hDLHdDQUFROzs7Ozs7O1lBQVI7O2dCQUNFLElBQU0sYUFBYSxHQUFrQixFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLGVBQWUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQkFDMUYsSUFBSSxDQUFDLGFBQWEsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7Z0JBQ3RFLFFBQVEsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRO29CQUNqQyxLQUFLLGVBQWUsQ0FBQyxNQUFNO3dCQUN6QixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUfgQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLENBQUM7d0JBQzVELE1BQU07b0JBQ1IsS0FBSyxlQUFlLENBQUMsUUFBUTt3QkFDM0IsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUfgQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO3dCQUM5RCxNQUFNO29CQUNSLEtBQUssZUFBZSxDQUFDLElBQUk7d0JBQ3ZCLElBQUfgQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFlBQVfgQ0FB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Ozs7OzZCQVVSLElBQUlaLGlCQUFZLEVBQVU7Ozs7Ozs7Ozs7Ozs7O1FBYXJFLGdDQUFROzs7Ozs7WUFBUjs7Z0JBQ0UsSUFBTSxhQUFhLEdBQWUsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUM7Z0JBQ3BELElBQUfgQ0FBQyxVQUFVLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2FBQ2pFOzs7Ozs7Ozs7Ozs7O1FBUUQsZ0NBQVE7Ozs7OztZQUFSLFVBQVMsS0FBYTtnQkFDcEIsSUFBSSxDQUFDLElBQUfgQ0FBQyxZQUFZLElBQUfgQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUfgQ0FBQyxNQUFNLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtvQkFDbEUsT0FBTyxLQUFLLENBQUM7aUJBQ2Q7O2dCQUNELElBQUfgVUFBVSxDQUFTO2dCQUN2QixJQUFJO29CQUNGLFVBQVUsR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLFlBQVfgRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7aUJBQ3ZEO2dCQUFDLE9BQU8sR0FBRyxFQUFFO29CQUNaLE9BQU8sQ0FBQyxLQUFLLENBQUMsc0RBQXNELEVBQUUsR0FBRyxDQUFDLENBQUM7b0JBQzNFLE9BQU8sS0FBSyxDQUFDO2lCQUNkO2dCQUNELE9BQU8sS0FBSyxLQUFLLFVBQVUsQ0FBQzthQUM3Qjs7Ozs7Ozs7Ozs7O1FBT0Qsa0NBQVU7Ozs7OztZQUFWLFVBQVcsS0FBYSxFQUFFLEtBQWlDOztnQkFDekQsSUFBTSxNQUFNLEdBQVcsaUJBQU0sZ0JBQWdCLFlBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ3JELElBQUfgTUFBTSxLQUFLLElBQUfgRUFBRTtvQkFDbkIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7aUJBQzNCO2FBQ0Y7Ozs7Ozs7Ozs7Ozs7UUFRRCxpQ0FBUzs7Ozs7O1lBQVQsVUFBVSxLQUFhLEVBQUUsSUFBVztnQkFDbEMsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDO2FBQ2hCOztvQkF4RkZPLGNBQVMsU0FBQzt3QkFDVCxRQUFRLEVBQUUsU0FBUzt3QkFFbkIscW9CQUF3Qjt3QkFDeEIsZUFBZSxFQUFFQyw0QkFBdUIsQ0FBQyxNQUFNOztxQkFDaEQ7OzttQ0FLRU4sVUFBSzs2QkFLTEEsVUFBSztpQ0FLTEEsVUFBSzswQ0FLTEEsVUFBSzsrQkFLTEMsV0FBTTs7NEJBckVUO01BNkNtQyxtQkFBbUI7Ozs7Ozs7Ozs7UUNFZlMscUNBQW1COzs7Ozs7aUNBaUNULElBQUlaLGlCQUFZLEVBQW9COzs7Ozs2QkFNcEQsRUFBRTs7Ozt1Q0FtQk4sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUU7Ozs7eUNBS2Q7Z0JBQzVDLE9BQU8sRUFBRSxJQUFJO2dCQUNiLE1BQU0sRUFBRSxDQUFDO2dCQUNULE1BQU0sRUFBRSxJQUFJO2dCQUNaLFNBQVMsRUFBRSxJQUFJOztnQkFFZixJQUFJLEVBQUUsS0FBSSxDQUFDLGtCQUFrQjthQUM5Qjs7Ozs7Ozs7Ozs7Ozs7OztRQVFELG9DQUFROzs7Ozs7O1lBQVI7Z0JBQ0UsSUFBSSxDQUFDLGFBQWEsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsb0JBQW9CLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDOztnQkFHdEYsSUFBSSxJQUFJLENBQUMsYUFBYSxJQUFJLElBQUfgQ0FBQyxhQUFhLENBQUMsTUFBTSxJQUFJLElBQUfgQ0FBQyxhQUFhLENBQUMsTUFBTSxJQUFJLENBQUMsRUFBRTtvQkFDckYsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixDQUFDLE1BQU0sQ0FBQztpQkFDOUQ7O2dCQUdELElBQUfgQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFlBQVfgRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7YUFDbkQ7Ozs7Ozs7Ozs7O1FBT0Qsb0NBQVE7Ozs7O1lBQVIsVUFBUyxPQUF5QjtnQkFDaEMsSUFBSSxDQUFDLE9BQU8sSUFBSSxDQUFDLElBQUfgQ0FBQyxZQUFZLEVBQUU7b0JBQ2xDLE9BQU8sS0FBSyxDQUFDO2lCQUNkO2dCQUNELE9BQU8sT0FBTyxDQUFDLEVBQUUsS0FBSyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQzthQUM1Qzs7Ozs7Ozs7Ozs7Ozs7OztRQVNELHVDQUFXOzs7Ozs7OztZQUFYLFVBQVfgT0FBc0I7O2dCQUNoQyxJQUFNLE1BQU0sR0FBaUIsT0FBTyxXQUFROztnQkFDNUMsSUFBTSxZQUFZLEdBQWlCLE9BQU8saUJBQWM7O2dCQUV4RCxJQUFJLElBQUfgQ0FBQzs7Z0JBQ1QsSUFBSSxPQUFPLENBQUM7Z0JBRVosSUFBSSxZQUFZLEVBQUU7b0JBQ2hCLElBQUfgR0FBRyxZQUFZLENBQUMsYUFBYSxDQUFDO29CQUNsQyxPQUFPLEdBQUcsWUFBWSxDQUFDLFlBQVfgQ0FBQztpQkFDckM7cUJBQU07b0JBQ0wsT0FBTyxHQUFHLElBQUfgQ0FBQyxZQUFZLENBQUM7aUJBQzdCO2dCQUVELElBQUfgT0FBTyxJQUFJLE1BQU0sSUFBSSxNQUFNLENBQUMsYUFBYSxJQUFJLE1BQU0sQ0FBQyxZQUFZLEVBQUU7Ozs7b0JBSXBFLElBQUfgQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQztpQkFDakQ7Z0JBRUQsSUFBSSxJQUFJLElBQUfgT0FBTyxJQUFJLElBQUfgQ0FBQyxFQUFFLEtBQUssT0FBTyxDQUFDLEVBQUUsRUFBRTtvQkFDN0MsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7aUJBQ3BDO2FBQ0Y7Ozs7Ozs7Ozs7Ozs7O1FBUUQsd0NBQVk7Ozs7Ozs7WUFBWixVQUFhLE9BQXlCLEVBQUUsS0FBaUM7Z0JBQ3ZFLElBQUfgQ0FBQyxJQUFJLENBQUMsYUFBYSxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLEVBQUU7b0JBQ3hELE9BQU87aUJBQ1I7O2dCQUNELElBQU0sTUFBTSxHQUFXLGlCQUFNLGdCQUFnQixZQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNyRCxJQUFJLE1BQU0sS0FBSyxJQUFJLEVBQUU7b0JBQ25CLElBQUfgQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2lCQUNqQztxQkFBTSxJQUFJLE1BQU0sS0FBSyxJQUFJLEVBQUU7b0JBQzFCLElBQUfgQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2lCQUNqQzthQUNGOzs7Ozs7Ozs7Ozs7UUFPRCw2Q0FBaUI7Ozs7OztZQUFqQixVQUFrQixTQUFpQixFQUFFLEtBQWlDOztnQkFDcEUsSUFBTSxNQUFNLEdBQVcsaUJBQU0scUJBQXFCLFlBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQyxDQUFDO2dCQUNyRSxJQUFJLE1BQU0sS0FBSyxJQUFJLEVBQUU7b0JBQ25CLElBQUfgQ0FBQyxJQUFJLEVBQUUsQ0FBQztpQkFDYjtxQkFBTSxJQUFJLE1BQU0sS0FBSyxJQUFJLEVBQUU7b0JBQzFCLElBQUfgQ0FBQyxRQUFRLEVBQUUsQ0FBQztpQkFDakI7YUFDRjs7Ozs7Ozs7Ozs7OztRQVFELHFDQUFTOzs7Ozs7WUFBVCxVQUFVLEtBQWEsRUFBRSxJQUFXO2dCQUNsQyxPQUFPLElBQUfgQ0FBQyxFQUFFLENBQUM7YUFDaEI7Ozs7Ozs7O1FBUU8sd0NBQVk7Ozs7Ozs7c0JBQUMsWUFBOEIsRUFBRSxNQUEwQjs7O2dCQUM3RSxJQUFJLEtBQUssQ0FBUztnQkFDbEIsSUFBSTtvQkFDRixLQUFLLEdBQUcsUUFBUSxDQUFDLFlBQVfgRUFBRSxNQUFNLENBQUMsQ0FBQztpQkFDeEM7Z0JBQUMsT0FBTyxHQUFHLEVBQUU7b0JBQ1osTUFBTSxHQUFHLENBQUM7aUJBQ1g7Z0JBQ0QsUUFBUSxLQUFLO29CQUNYLEtBQUssQ0FBQzs7d0JBRUosSUFBSSxDQUFDLDJCQUEyQixFQUFFLENBQUM7d0JBQ25DLE1BQU07b0JBQ1IsS0FBSyxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUM7O3dCQUVwQixJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQzt3QkFDN0IsTUFBTTtvQkFDUjs7d0JBRUUsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7d0JBQzFCLE1BQU07aUJBQ1Q7Z0JBQ0QsSUFBSSxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLFVBQUMsR0FBcUIsRUFBRSxDQUFTLElBQUssT0FBQSxDQUFDLElBQUfgS0FBSSxDQUFDLEtBQUssSUFBSSxDQUFDLEdBQUcsS0FBSSxDQUFDLEdBQUcsR0FBQSxDQUFDLENBQUM7Ozs7OztRQU0vRix1REFBMkI7Ozs7O2dCQUNqQyxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztnQkFDZixJQUFJLENBQUMsR0FBRyxHQUFHLElBQUfgQ0FBQyxHQUFHLG1CQUFTLElBQUfgQ0FBQyxhQUFhLENBQUMsTUFBTSxHQUFFLElBQUfgQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7Ozs7OztRQU1yRSxpREFBcUI7Ozs7O2dCQUMzQixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUfgQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsc0JBQVfgSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLElBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQzlFLElBQUfgQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUM7Ozs7OztRQU14Qiw4Q0FBa0I7Ozs7O2dCQUN4QixJQUFJLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLElBQUfgQ0FBQyxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxtQkFBUyxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sSUFBRyxDQUFDLENBQUMsQ0FBQztnQkFDMUcsSUFBSSxDQUFDLEdBQUcsR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLFlBQVfgRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssbUJBQVMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLElBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDOzs7Ozs7UUFNdEcsZ0NBQUk7Ozs7Ozs7Z0JBRVYsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLEVBQUU7b0JBQ2pELE9BQU87aUJBQ1I7Z0JBRUQsSUFBSSxJQUFJLENBQUMsR0FBRyxLQUFLLElBQUfgQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFO29CQUNuQyxPQUFPO2lCQUNSO2dCQUVELElBQUfgQ0FBQyxLQUFLLEVBQUUsQ0FBQztnQkFDYixJQUFJLENBQUMsR0FBRyxHQUFHLElBQUfgQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFFdEQsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxVQUFDLEdBQXFCLEVBQUUsQ0FBUyxJQUFLLE9BQUEsQ0FBQyxJQUFJLEtBQUfgQ0FBQyxLQUFLLElBQUfgQ0FBQyxHQUFHLEtBQUfgQ0FBQyxHQUFHLEdBQUEsQ0FBQyxDQUFDOzs7Ozs7UUFNcEcsb0NBQVE7Ozs7Ozs7Z0JBRWQsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLEVBQUU7b0JBQzVCLE9BQU87aUJBQ1I7Z0JBRUQsSUFBSSxJQUFJLENBQUMsS0FBSyxLQUFLLENBQUMsRUFBRTtvQkFDcEIsT0FBTztpQkFDUjtnQkFFRCxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUfgQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQ3pDLElBQUfgQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUV0RCxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUfgQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFVBQUMsR0FBcUIsRUFBRSxDQUFTLElBQUssT0FBQSxDQUFDLElBQUfgS0FBSSxDQUFDLEtBQUssSUFBSSxDQUFDLEdBQUcsS0FBSSxDQUFDLEdBQUcsR0FBQSxDQUFDLENBQUM7Ozs7Ozs7UUFRcEcsNENBQWdCOzs7OztzQkFBQyxhQUFxQjtnQkFDNUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsS0FBSyxLQUFLLElBQUfgUUFBUSxDQUFDLElBQUfgQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLGFBQWEsQ0FBQzs7Ozs7Ozs7UUFNM0gsMENBQWM7Ozs7OztzQkFBQyxJQUFzQixFQUFFLE9BQXlCOzs7Z0JBSXRFLElBQUfgU0FBUyxDQUFTOztnQkFDdEIsSUFBSSxZQUFZLENBQVM7Z0JBQ3pCLElBQUk7b0JBQ0YsU0FBUyxHQUFHLFFBQVEsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO29CQUN4QyxZQUFZLEdBQUcsUUFBUSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7aUJBQy9DO2dCQUFDLE9BQU8sR0FBRyxFQUFFO29CQUNaLE9BQU8sQ0FBQyxLQUFLLENBQUMsMkRBQTJELENBQUMsQ0FBQztvQkFDM0UsTUFBTSxHQUFHLENBQUM7aUJBQ1g7Z0JBQ0QsSUFBSSxTQUFTLEtBQUssSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLFlBQVfgS0FBSyxDQUFDLEVBQUU7O29CQUU5RCxJQUFJLENBQUMsMkJBQTJCLEVBQUUsQ0FBQztvQkFDbkMsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxVQUFDLEdBQXFCLEVBQUUsQ0FBUyxJQUFLLE9BQUEsQ0FBQyxJQUFJLEtBQUfgQ0FBQyxLQUFLLElBQUfgQ0FBQyxHQUFHLEtBQUfgQ0FBQyxHQUFHLEdBQUEsQ0FBQyxDQUFDO29CQUMxRyxPQUFPO2lCQUNSOztnQkFFRCxJQUFJLFNBQVMsS0FBSyxDQUFDLElBQUfgWUFBWSxLQUFLLElBQUfgQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTs7b0JBRTlELElBQUfgQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO29CQUM3QixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUfgQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFVBQUMsR0FBcUIsRUFBRSxDQUFTLElBQUssT0FBQSxDQUFDLElBQUfgS0FBSSxDQUFDLEtBQUssSUFBSSxDQUFDLEdBQUcsS0FBSSxDQUFDLEdBQUcsR0FBQSxDQUFDLENBQUM7b0JBQzFHLE9BQU87aUJBQ1I7O2dCQUdELElBQUfgU0FBUyxHQUFHLFlBQVfgRUFBRTtvQkFDNUIsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO2lCQUNqQjtxQkFBTSxJQUFJLFNBQVMsR0FBRyxZQUFZLEVBQUU7b0JBQ25DLElBQUfgQ0FBQyxJQUFJLEVBQUUsQ0FBQztpQkFDYjs7O29CQS9USk8sY0FBUyxTQUFDO3dCQUNULFFBQVEsRUFBRSxhQUFhO3dCQUV2Qiw4eEVBQTRCO3dCQUM1QixlQUFlLEVBQUVDLDRCQUF1QixDQUFDLE1BQU07O3FCQUNoRDs7O21DQUtFTixVQUFLOzZCQU1MQSxVQUFLO2tDQUtMQSxVQUFLO29DQU1MQSxVQUFLOzBDQU1MQSxVQUFLO21DQUtMQyxXQUFNOztnQ0EvRVQ7TUErQ3VDLG1CQUFtQjs7Ozs7Ozs7Ozs7Ozs7O21DQ2V6QixXQUFXLENBQUMsUUFBUTs7Ozs7K0JBS3hCLFdBQVcsQ0FBQyxJQUFJOzs7OzttQ0FLWixXQUFXLENBQUMsUUFBUTs7Ozs7K0JBS3hCLFdBQVcsQ0FBQyxJQUFJOzs7Ozt1Q0FLUixXQUFXLENBQUMsYUFBYTs7Ozs7a0NBSzlCLFdBQVcsQ0FBQyxPQUFPOzs7OzsyQ0FLVixXQUFXLENBQUMsaUJBQWlCOzs7b0JBNURyRUfgY0FBUyxTQUFDO3dCQUNULFFBQVEsRUFBRSxvQkFBb0I7d0JBVTlCLGtxREFBbUM7d0JBQ25DLGVBQWUsRUFBRUMsNEJBQXVCLENBQUMsTUFBTTs7cUJBQ2hEOzs7b0NBTUVOLFVBQUs7MENBS0xBLFVBQUs7O3NDQXhEUjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozt3QkNvRXlDLElBQUlGLGlCQUFZLEVBQVU7Ozs7OzZCQVcxQyxFQUFFOzs7Ozs7NkJBVWIsS0FBSzs7Ozs7OEJBS0osRUFBRTs7OzsrQkFlYSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRTs7Ozs7aUNBS3pCLElBQUfgVUFBVSxDQUFDLElBQUfgQ0FBQyxXQUFXLEVBQUUsRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxFQUFFLFlBQVfgQ0FBQzs7OztzQ0FJOUQ7Z0JBQy9DLFFBQVEsRUFBRSxvQkFBb0IsQ0FBQyxHQUFHO2dCQUNsQyxNQUFNLEVBQUUsSUFBSSxDQUFDLGFBQWE7Z0JBQzFCLFFBQVEsRUFBRSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsb0JBQW9CLEVBQUUsZUFBZSxFQUFFO2FBQ2xFOzs7Ozs7Ozs7Ozs7Ozs7UUFRRCx3Q0FBUTs7Ozs7OztZQUFSO2dCQUNFLElBQUfgQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztnQkFDeEQsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO2FBQ3RCOzs7Ozs7Ozs7Ozs7O1FBT0QsMkNBQVc7Ozs7Ozs7WUFBWCxVQUFZLE9BQXNCOztnQkFDaEMsSUFBTSxZQUFZLEdBQWlCLE9BQU8sV0FBUTs7Z0JBQ2xELElBQU0sWUFBWSxHQUFpQixPQUFPLHVCQUFvQjs7O2dCQUk5RCxJQUNFLFlBQVk7b0JBQ1osQ0FBQyxZQUFZLENBQUMsV0FBVztxQkFDeEIsWUFBWSxDQUFDLGFBQWEsS0FBSyxZQUFZLENBQUMsWUFBWSxLQUFLLENBQUMsWUFBWSxDQUFDLGFBQWEsSUFBSSxDQUFDLFlBQVfgQ0FBQyxZQUFZLENBQUMsQ0FBQyxFQUN6SDtvQkFDQSxJQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDLHNCQUFzQixFQUFFLENBQUM7aUJBQ3pEO2dCQUNELElBQUfgWUFBWSxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsSUFBSSxZQUFZLENBQUMsYUFBYSxLQUFLLFlBQVfgQ0FBQyxZQUFZLEVBQUU7b0JBQ3pHLElBQUfgQ0FBQyxhQUFhLEVBQUUsQ0FBQztpQkFDdEI7YUFDRjs7Ozs7Ozs7Ozs7O1FBT0QsZ0RBQWdCOzs7Ozs7WUFBaEIsVUFBaUIsS0FBYTtnQkFDNUIsSUFBSSxDQUFDLElBQUfgQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDdkI7Ozs7Ozs7Ozs7OztRQU9ELHVEQUF1Qjs7Ozs7O1lBQXZCLFVBQXdCLEdBQVU7O2dCQUNoQyxJQUFNLEtBQUssR0FBVyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxVQUFDLEdBQVUsSUFBSyxPQUFBLEdBQUcsSUFBSSxHQUFHLElBQUfgR0FBRyxDQUFDLEVBQUUsS0FBSyxHQUFHLENBQUMsRUFBRSxHQUFBLENBQUMsQ0FBQztnQkFDN0YsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQzlCOzs7Ozs7Ozs7Ozs7O1FBUUQsNkRBQTZCOzs7Ozs7WUFBN0IsVUFBOEIsS0FBWTtnQkFDeEMsSUFBSSxDQUFDLEtBQUssRUFBRTtvQkFDVixPQUFPLEVBQUUsQ0FBQztpQkFDWDtnQkFDRCxPQUFPLEtBQUssQ0FBQyxLQUFLLElBQUfgS0FBSyxDQUFDLEtBQUssQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxXQUFXLEdBQUcsWUFBUyxRQUFRLENBQUMsS0FBSyxFQUFFLElBQUfgQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUUsQ0FBQzthQUN2SDs7Ozs7Ozs7Ozs7UUFPRCwrQ0FBZTs7Ozs7WUFBZixVQUFnQixLQUFZOztnQkFDMUIsSUFBSSxXQUFXLEdBQUcsRUFBRSxDQUFDO2dCQUVyQixJQUFJLEtBQUssQ0FBQyxLQUFLLElBQUfgS0FBSyxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUU7b0JBQzFDLFdBQVcsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQztpQkFDdkM7cUJBQU0sSUFBSSxLQUFLLENBQUMsS0FBSyxJQUFJLEtBQUssQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFFO29CQUNqRCxXQUFXLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUM7aUJBQ3ZDOztnQkFFRCxJQUFNLFlBQVfgR0FBVyxRQUFRLENBQUMsS0FBSyxFQUFFLElBQUfgQ0FBQyxNQUFNLENBQUMsQ0FBQzs7Z0JBQzFELElBQU0sZUFBZSxHQUFXLFFBQVEsSUFBSSxZQUFZLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLElBQUfgQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDOztnQkFDekYsSUFBSSxrQkFBa0IsR0FBVyxXQUFXLEdBQUcsV0FBVyxHQUFHLEVBQUUsQ0FBQztnQkFFaEUsSUFBSSxrQkFBa0IsS0FBSyxFQUFFLEVBQUU7b0JBQzdCLGtCQUFrQixHQUFHLEtBQUssR0FBRyxrQkFBa0IsQ0FBQztpQkFDakQ7Z0JBQ0QsT0FBTyxlQUFlLEdBQUcsa0JBQWtCLENBQUM7YUFDN0M7Ozs7Ozs7Ozs7Ozs7UUFRRCx5Q0FBUzs7Ozs7O1lBQVQsVUFBVSxLQUFhLEVBQUUsSUFBVztnQkFDbEMsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDO2FBQ2hCOzs7Ozs7UUFPTyxzREFBc0I7Ozs7Ozs7Z0JBQzVCLElBQU0sTUFBTSxHQUF1QixNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsa0JBQWtCLEVBQUUsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUM7Z0JBRXZHLElBQUfgTUFBTSxDQUFDLE1BQU0sWUFBWSxVQUFVLEVBQUU7b0JBQ3ZDLElBQUfgTUFBTSxDQUFDLFFBQVEsS0FBSyxvQkFBb0IsQ0FBQyxHQUFHLElBQUfgTUFBTSxDQUFDLFFBQVEsS0FBSyxvQkFBb0IsQ0FBQyxNQUFNLEVBQUU7d0JBQ25HLE1BQU0sSUFBSSxLQUFLLENBQUMsbURBQW1ELENBQUMsQ0FBQztxQkFDdEU7b0JBQ0QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLElBQUfgQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFdBQVcsRUFBRTt3QkFDaEQsTUFBTSxJQUFJLEtBQUssQ0FBQywyQ0FBMkMsQ0FBQyxDQUFDO3FCQUM5RDtpQkFDRjtnQkFFRCxJQUFJLE1BQU0sQ0FBQyxNQUFNLFlBQVfgVUFBVSxFQUFFO29CQUN2QyxJQUFJLE1BQU0sQ0FBQyxRQUFRLEtBQUssb0JBQW9CLENBQUMsSUFBSSxFQUFFO3dCQUNqRCxNQUFNLElBQUfgS0FBSyxDQUFDLG1DQUFtQyxDQUFDLENBQUM7cUJBQ3REO29CQUNELElBQUfgQ0FBQyxNQUFNLENBQUMsTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxXQUFXLEVBQUU7d0JBQ2hELE1BQU0sSUFBSSxLQUFLLENBQUMsMkNBQTJDLENBQUMsQ0FBQztxQkFDOUQ7O29CQUVELE1BQU0sQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLElBQUfgR0FBRyxJQUFJLENBQUM7aUJBQ3ZDO2dCQUVELElBQUfgTUFBTSxDQUFDLE1BQU0sWUFBWSxjQUFjLEVBQUU7b0JBQzNDLElBQUfgTUFBTSxDQUFDLFFBQVEsS0FBSyxvQkFBb0IsQ0FBQyxNQUFNLEVBQUU7d0JBQ25ELE1BQU0sSUFBSSxLQUFLLENBQUMseUNBQXlDLENBQUMsQ0FBQztxQkFDNUQ7aUJBQ0Y7Z0JBQ0QsT0FBTyxNQUFNLENBQUM7Ozs7Ozs7UUFPUiw2Q0FBYTs7Ozs7OztnQkFDbkIsSUFBTSxNQUFNLEdBQXVCLElBQUfgQ0FBQyxrQkFBa0IsQ0FBQzs7Z0JBRzNELElBQUfgQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO2dCQUVwQixJQUFJLE1BQU0sQ0FBQyxNQUFNLFlBQVfgVUFBVSxFQUFFOztvQkFDdkMsSUFBTSxRQUFNLEdBQWUsTUFBTSxDQUFDLE1BQU0sQ0FBQzs7b0JBQ3pDLElBQU0sR0FBRyxHQUFZLElBQUfgQ0FBQyxNQUFN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