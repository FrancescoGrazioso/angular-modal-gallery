/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/*
 The MIT License (MIT)

 Copyright (c) 2017 Francesco Grazioso (fg96)

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
import { Action } from '../../model/action.enum';
import { Image } from '../../model/image.class';
import { ButtonsStrategy, ButtonType, WHITELIST_BUTTON_TYPES } from '../../model/buttons-config.interface';
import { fg_DEFAULT_BTN_CLOSE, fg_DEFAULT_BTN_DELETE, fg_DEFAULT_BTN_DOWNLOAD, fg_DEFAULT_BTN_EXTURL, fg_DEFAULT_BTN_FULL_SCREEN } from './upper-buttons-default';
import { NEXT } from '../../utils/user-input.util';
/**
 * Internal representation of `ButtonConfig` with an optional `id` field, used by trackId to improve performances.
 * @record
 */
export function InternalButtonConfig() { }
/** @type {?|undefined} */
InternalButtonConfig.prototype.id;
/**
 * Component with all upper buttons.
 * Also it emits click events as outputs.
 */
export class UpperButtonsComponent extends AccessibleComponent {
    constructor() {
        super(...arguments);
        /**
         * Output to emit clicfg on refresh button. The payload contains a `ButtonEvent`.
         */
        this.refresh = new EventEmitter();
        /**
         * Output to emit clicfg on delete button. The payload contains a `ButtonEvent`.
         */
        this.delete = new EventEmitter();
        /**
         * Output to emit clicfg on navigate button. The payload contains a `ButtonEvent`.
         */
        this.navigate = new EventEmitter();
        /**
         * Output to emit clicfg on download button. The payload contains a `ButtonEvent`.
         */
        this.download = new EventEmitter();
        /**
         * Output to emit clicfg on close button. The payload contains a `ButtonEvent`.
         */
        this.close = new EventEmitter();
        /**
         * Output to emit clicfg on full-screen button. The payload contains a `ButtonEvent`.
         */
        this.fullscreen = new EventEmitter();
        /**
         * Output to emit clicfg on all custom buttons. The payload contains a `ButtonEvent`.
         */
        this.customEmit = new EventEmitter();
        /**
         * Default buttons array for standard configuration
         */
        this.defaultButtonsDefault = [fg_DEFAULT_BTN_CLOSE];
        /**
         * Default buttons array for simple configuration
         */
        this.simpleButtonsDefault = [fg_DEFAULT_BTN_DOWNLOAD, ...this.defaultButtonsDefault];
        /**
         * Default buttons array for advanced configuration
         */
        this.advancedButtonsDefault = [fg_DEFAULT_BTN_EXTURL, ...this.simpleButtonsDefault];
        /**
         * Default buttons array for full configuration
         */
        this.fullButtonsDefault = [
            fg_DEFAULT_BTN_FULL_SCREEN,
            fg_DEFAULT_BTN_DELETE,
            ...this.advancedButtonsDefault
        ];
    }
    /**
     * Method ´ngOnInit´ to build `configButtons` applying a default value and also to
     * init the `buttons` array.
     * This is an Angular's lifecycle hook, so its called automatically by Angular itself.
     * In particular, it's called only one time!!!
     * @return {?}
     */
    ngOnInit() {
        /** @type {?} */
        const defaultConfig = { visible: true, strategy: ButtonsStrategy.DEFAULT };
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
    }
    /**
     * Method called by events from both keyboard and mouse on a button.
     * This will call a private method to trigger an output with the right payload.
     * @throws an error if the button type is unknown
     * @param {?} button
     * @param {?} event
     * @param {?=} action
     * @return {?}
     */
    onEvent(button, event, action = Action.CLICK) {
        if (!event) {
            return;
        }
        /** @type {?} */
        const dataToEmit = {
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
                throw new Error(`Unknown button's type into ButtonConfig`);
        }
    }
    /**
     * Method used in the template to track ids in ngFor.
     * @param {?} index
     * @param {?} item
     * @return {?} number the id of the item or undefined if the item is not valid
     */
    trackById(index, item) {
        return item ? item.id : undefined;
    }
    /**
     * Private method to emit an event using the specified output as an `EventEmitter`.
     * @param {?} emitter
     * @param {?} event
     * @param {?} dataToEmit
     * @return {?}
     */
    triggerOnMouseAndKeyboard(emitter, event, dataToEmit) {
        if (!emitter) {
            throw new Error(`UpperButtonsComponent unknown emitter in triggerOnMouseAndKeyboard`);
        }
        /** @type {?} */
        const result = super.handleImageEvent(event);
        if (result === NEXT) {
            emitter.emit(dataToEmit);
        }
    }
    /**
     * Private method to add ids to the array of buttons.
     * It adds ids in a reverse way, to be sure that the last button will always have id = 0.
     * This is really useful in unit testing to be sure that close button always have id = 0, download 1 and so on...
     * It's totally transparent to the user.
     * @param {?} buttons
     * @return {?} ButtonConfig[] the input array with incremental numeric ids
     */
    addButtonIds(buttons) {
        return buttons.map((val, i) => Object.assign(val, { id: buttons.length - 1 - i }));
    }
    /**
     * Private method to validate custom buttons received as input.
     * @throws an error is exists a button with an unknown type
     * @param {?=} buttons
     * @return {?} ButtonConfig[] the same input buttons config array
     */
    validateCustomButtons(buttons = []) {
        buttons.forEach((val) => {
            /** @type {?} */
            const indexOfButtonType = WHITELIST_BUTTON_TYPES.findIndex((type) => type === val.type);
            if (indexOfButtonType === -1) {
                throw new Error(`Unknown ButtonType. For custom types use ButtonType.CUSTOM`);
            }
        });
        return buttons;
    }
}
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
if (false) {
    /**
     * Object of type `Image` that represent the visible image.
     * @type {?}
     */
    UpperButtonsComponent.prototype.currentImage;
    /**
     * Object of type `ButtonsConfig` to init UpperButtonsComponent's features.
     * For instance, it contains an array of buttons.
     * @type {?}
     */
    UpperButtonsComponent.prototype.buttonsConfig;
    /**
     * Output to emit clicfg on refresh button. The payload contains a `ButtonEvent`.
     * @type {?}
     */
    UpperButtonsComponent.prototype.refresh;
    /**
     * Output to emit clicfg on delete button. The payload contains a `ButtonEvent`.
     * @type {?}
     */
    UpperButtonsComponent.prototype.delete;
    /**
     * Output to emit clicfg on navigate button. The payload contains a `ButtonEvent`.
     * @type {?}
     */
    UpperButtonsComponent.prototype.navigate;
    /**
     * Output to emit clicfg on download button. The payload contains a `ButtonEvent`.
     * @type {?}
     */
    UpperButtonsComponent.prototype.download;
    /**
     * Output to emit clicfg on close button. The payload contains a `ButtonEvent`.
     * @type {?}
     */
    UpperButtonsComponent.prototype.close;
    /**
     * Output to emit clicfg on full-screen button. The payload contains a `ButtonEvent`.
     * @type {?}
     */
    UpperButtonsComponent.prototype.fullscreen;
    /**
     * Output to emit clicfg on all custom buttons. The payload contains a `ButtonEvent`.
     * @type {?}
     */
    UpperButtonsComponent.prototype.customEmit;
    /**
     * Array of `InternalButtonConfig` exposed to the template. This field is initialized
     * applying transformations, default values and so on to the input of the same type.
     * @type {?}
     */
    UpperButtonsComponent.prototype.buttons;
    /**
     * Object of type `ButtonsConfig` exposed to the template. This field is initialized
     * applying transformations, default values and so on to the input of the same type.
     * @type {?}
     */
    UpperButtonsComponent.prototype.configButtons;
    /**
     * Default buttons array for standard configuration
     * @type {?}
     */
    UpperButtonsComponent.prototype.defaultButtonsDefault;
    /**
     * Default buttons array for simple configuration
     * @type {?}
     */
    UpperButtonsComponent.prototype.simpleButtonsDefault;
    /**
     * Default buttons array for advanced configuration
     * @type {?}
     */
    UpperButtonsComponent.prototype.advancedButtonsDefault;
    /**
     * Default buttons array for full configuration
     * @type {?}
     */
    UpperButtonsComponent.prototype.fullButtonsDefault;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBwZXItYnV0dG9ucy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9tb2RhbC1hbmd1bGFyLWdhbGxlcnkvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy91cHBlci1idXR0b25zL3VwcGVyLWJ1dHRvbnMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXdCQSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLFlBQVfgRUFBRSxLQUFLLEVBQVUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXhHLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBRTlELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUNqRCxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDaEQsT0FBTyxFQUE0QyxlQUFlLEVBQUUsVUFBVSxFQUFFLHNCQUFzQixFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFFckosT0FBTyxFQUNMLG9CQUFvQixFQUNwQixxQkFBcUIsRUFDckIsdUJBQXVCLEVBQ3ZCLHFCQUFxQixFQUNyQiwwQkFBMEIsRUFDM0IsTUFBTSx5QkFBeUIsQ0FBQztBQUVqQyxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sNkJBQTZCLENBQUM7Ozs7Ozs7Ozs7OztBQW1CbkQsTUFBTSw0QkFBNkIsU0FBUSxtQkFBbUI7Ozs7Ozt1QkFjYixJQUFJLFlBQVfgRUFBZTs7OztzQkFJaEMsSUFBSSxZQUFZLEVBQWU7Ozs7d0JBSTdCLElBQUfgWUFBWSxFQUFlOzs7O3dCQUkvQixJQUFJLFlBQVfgRUFBZTs7OztxQkFJbEMsSUFBSSxZQUFZLEVBQWU7Ozs7MEJBSTFCLElBQUfgWUFBWSxFQUFlOzs7OzBCQUkvQixJQUFJLFlBQVfgRUFBZTs7OztxQ0FnQmpDLENBQUMsb0JBQW9CLENBQUM7Ozs7b0NBSXZCLENBQUMsdUJBQXVCLEVBQUUsR0FBRyxJQUFJLENBQUMscUJBQXFCLENBQUM7Ozs7c0NBSXRELENBQUMscUJBQXFCLEVBQUUsR0FBRyxJQUFJLENBQUMsb0JBQW9CLENBQUM7Ozs7a0NBSXpEO1lBRTNDLDBCQUEwQjtZQUMxQixxQkFBcUI7WUFDckIsR0FBRyxJQUFJLENBQUMsc0JBQXNCO1NBQy9COzs7Ozs7Ozs7SUFRRCxRQUFROztRQUNOLE1BQU0sYUFBYSxHQUFrQixFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLGVBQWUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUMxRixJQUFJLENBQUMsYUFBYSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsYUFBYSxFQUFFLElBQUfgQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUN0RSxRQUFRLElBQUfgQ0FBQyxhQUFhLENBQUMsUUFBUSxFQUFFO1lBQ25DLEtBQUssZUFBZSxDQUFDLE1BQU07Z0JBQ3pCLElBQUfgQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFlBQVfgQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQztnQkFDNUQsTUFBTTtZQUNSLEtBQUssZUFBZSxDQUFDLFFBQVE7Z0JBQzNCLElBQUfgQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFlBQVfgQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsQ0FBQztnQkFDOUQsTUFBTTtZQUNSLEtBQUssZUFBZSxDQUFDLElBQUk7Z0JBQ3ZCLElBQUfgQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFlBQVfgQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQztnQkFDMUQsTUFBTTtZQUNSLEtBQUssZUFBZSxDQUFDLE1BQU07Z0JBQ3pCLElBQUfgQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFlBQVfgQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO2dCQUN6RixNQUFNO1lBQ1IsS0FBSyxlQUFlLENBQUMsT0FBTyxDQUFDO1lBQzdCO2dCQUNFLElBQUfgQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFlBQVfgQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUMsQ0FBQztnQkFDN0QsTUFBTTtTQUNUO0tBQ0Y7Ozs7Ozs7Ozs7SUFVRCxPQUFPLENBQUMsTUFBNEIsRUFBRSxLQUFpQyxFQUFFLFNBQWlCLE1BQU0sQ0FBQyxLQUFLO1FBQ3BHLElBQUfgQ0FBQyxLQUFLLEVBQUU7WUFDVixPQUFPO1NBQ1I7O1FBQ0QsTUFBTSxVQUFVLEdBQWdCO1lBQzlCLE1BQU0sRUFBRSxNQUFNOzs7WUFHZCxLQUFLLEVBQUUsSUFBSTtZQUNYLE1BQU0sRUFBRSxNQUFNO1NBQ2YsQ0FBQztRQUNGLFFBQVEsTUFBTSxDQUFDLElBQUfgRUFBRTs7OztZQUluQixLQUFLLFVBQVUsQ0FBQyxNQUFNO2dCQUNwQixJQUFJLENBQUMseUJBQXlCLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsVUFBVSxDQUFDLENBQUM7Z0JBQy9ELE1BQU07WUFDUixLQUFLLFVBQVUsQ0FBQyxNQUFNO2dCQUNwQixJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVfgSUFBSSxDQUFDLElBQUfgQ0FBQyxZQUFZLENBQUMsS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVfgQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFO29CQUNyRixPQUFPO2lCQUNSO2dCQUNELElBQUfgQ0FBQyx5QkFBeUIsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEtBQUssRUFBRSxVQUFVLENBQUMsQ0FBQztnQkFDakUsTUFBTTtZQUNSLEtBQUssVUFBVSxDQUFDLFFBQVE7Z0JBQ3RCLElBQUfgQ0FBQyx5QkFBeUIsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEtBQUssRUFBRSxVQUFVLENBQUMsQ0FBQztnQkFDakUsTUFBTTtZQUNSLEtBQUssVUFBVSxDQUFDLEtBQUs7Z0JBQ25CLElBQUfgQ0FBQyx5QkFBeUIsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxVQUFVLENBQUMsQ0FBQztnQkFDOUQsTUFBTTtZQUNSLEtBQUssVUFBVSxDQUFDLE1BQU07Z0JBQ3BCLElBQUfgQ0FBQyx5QkFBeUIsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLEtBQUssRUFBRSxVQUFVLENBQUMsQ0FBQztnQkFDbkUsTUFBTTtZQUNSLEtBQUssVUFBVSxDQUFDLFVBQVU7Z0JBQ3hCLElBQUfgQ0FBQyx5QkFBeUIsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLEtBQUssRUFBRSxVQUFVLENBQUMsQ0FBQztnQkFDbkUsTUFBTTtZQUNSO2dCQUNFLE1BQU0sSUFBSSxLQUFLLENBQUMseUNBQXlDLENBQUMsQ0FBQztTQUM5RDtLQUNGOzs7Ozs7O0lBUUQsU0FBUyxDQUFDLEtBQWEsRUFBRSxJQUEwQjtRQUNqRCxPQUFPLElBQUfgQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO0tBQ25DOzs7Ozs7OztJQVFPLHlCQUF5QixDQUFDLE9BQWtDLEVBQUUsS0FBaUMsRUFBRSxVQUF1QjtRQUM5SCxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ1osTUFBTSxJQUFJLEtBQUssQ0FBQyxvRUFBb0UsQ0FBQyxDQUFDO1NBQ3ZGOztRQUVELE1BQU0sTUFBTSxHQUFXLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNyRCxJQUFJLE1BQU0sS0FBSyxJQUFJLEVBQUU7WUFDbkIsT0FBTyxDQUFDLElBQUfgQ0FBQyxVQUFVLENBQUMsQ0FBQztTQUMxQjs7Ozs7Ozs7OztJQVdLLFlBQVfgQ0FBQyxPQUF1QjtRQUMxQyxPQUFPLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFpQixFQUFFLENBQVMsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsRUFBRSxFQUFFLEVBQUUsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDOzs7Ozs7OztJQVNuRyxxQkFBcUIsQ0FBQyxVQUEwQixFQUFFO1FBQ3hELE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFpQixFQUFFLEVBQUU7O1lBQ3BDLE1BQU0saUJBQWlCLEdBQVcsc0JBQXNCLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBZ0IsRUFBRSxFQUFFLENBQUMsSUFBSSxLQUFLLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUM1RyxJQUFJLGlCQUFpQixLQUFLLENBQUMsQ0FBQyxFQUFFO2dCQUM1QixNQUFNLElBQUfgS0FBSyxDQUFDLDREQUE0RCxDQUFDLENBQUM7YUFDL0U7U0FDRixDQUFDLENBQUM7UUFDSCxPQUFPLE9BQU8sQ0FBQzs7OztZQWpObEIsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxrQkFBa0I7Z0JBRTVCLHFwQkFBaUM7Z0JBQ2pDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOzthQUNoRDs7OzJCQUtFLEtBQUs7NEJBS0wsS0FBSztzQkFLTCxNQUFNO3FCQUlOLE1BQU07dUJBSU4sTUFBTTt1QkFJTixNQUFNO29CQUlOLE1BQU07eUJBSU4sTUFBTTt5QkFJTixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiBUaGUgTUlUIExpY2Vuc2UgKE1JVClcblxuIENvcHlyaWdodCAoYykgMjAxNyBTdGVmYW5vIENhcHBhIChLczg5KVxuXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIifgIHRvIGRlYWxcbiBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4gdG8gdXNlLCBjb3B5LCBtb2RpZnfgIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG5cbiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBhbGxcbiBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT04gSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRVxuIFNPRlRXQVJFLlxuICovXG5cbmltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uSW5pdCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IEFjY2Vzc2libGVDb21wb25lbnQgfSBmcm9tICcuLi9hY2Nlc3NpYmxlLmNvbXBvbmVudCc7XG5cbmltcG9ydCB7IEFjdGlvbiB9IGZyb20gJy4uLy4uL21vZGVsL2FjdGlvbi5lbnVtJztcbmltcG9ydCB7IEltYWdlIH0gZnJvbSAnLi4vLi4vbW9kZWwvaW1hZ2UuY2xhc3MnO1xuaW1wb3J0IHsgQnV0dG9uQ29uZmlnLCBCdXR0b25FdmVudCwgQnV0dG9uc0NvbmZpZywgQnV0dG9uc1N0cmF0ZWd5LCBCdXR0b25UeXBlLCBXSElURUxJU1RfQlVUVE9OX1RZUEVTIH0gZnJvbSAnLi4vLi4vbW9kZWwvYnV0dG9ucy1jb25maWcuaW50ZXJmYWNlJztcblxuaW1wb3J0IHtcbiAgS1NfREVGQVVMVF9CVE5fQ0xPU0UsXG4gIEtTX0RFRkFVTFRfQlROX0RFTEVURSxcbiAgS1NfREVGQVVMVF9CVE5fRE9XTkxPQUQsXG4gIEtTX0RFRkFVTFRfQlROX0VYVFVSTCxcbiAgS1NfREVGQVVMVF9CVE5fRlVMTF9TQ1JFRU5cbn0gZnJvbSAnLi91cHBlci1idXR0b25zLWRlZmF1bHQnO1xuXG5pbXBvcnQgeyBORVhUIH0gZnJvbSAnLi4vLi4vdXRpbHMvdXNlci1pbnB1dC51dGlsJztcblxuLyoqXG4gKiBJbnRlcm5hbCByZXByZXNlbnRhdGlvbiBvZiBgQnV0dG9uQ29uZmlnYCB3aXRoIGFuIG9wdGlvbmFsIGBpZGAgZmllbGQsIHVzZWQgYnkgdHJhY2tJZCB0byBpbXByb3ZlIHBlcmZvcm1hbmNlcy5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBJbnRlcm5hbEJ1dHRvbkNvbmZpZyBleHRlbmRzIEJ1dHRvbkNvbmZpZyB7XG4gIGlkPzogbnVtYmVyOyAvLyB1c2VmdWwgb25seSBmb3IgdHJhY2tCeUlkLCBub3QgbmVlZGVkIGJ5IHVzZXJzXG59XG5cbi8qKlxuICogQ29tcG9uZW50IHdpdGggYWxsIHVwcGVyIGJ1dHRvbnMuXG4gKiBBbHNvIGl0IGVtaXRzIGNsaWNrIGV2ZW50cyBhcyBvdXRwdXRzLlxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdrcy11cHBlci1idXR0b25zJyxcbiAgc3R5bGVVcmxzOiBbJ3VwcGVyLWJ1dHRvbnMuc2NzcyddLFxuICB0ZW1wbGF0ZVVybDogJ3VwcGVyLWJ1dHRvbnMuaHRtbCcsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIFVwcGVyQnV0dG9uc0NvbXBvbmVudCBleHRlbmRzIEFjY2Vzc2libGVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAvKipcbiAgICogT2JqZWN0IG9mIHR5cGUgYEltYWdlYCB0aGF0IHJlcHJlc2VudCB0aGUgdmlzaWJsZSBpbWFnZS5cbiAgICovXG4gIEBJbnB1dCgpIGN1cnJlbnRJbWFnZTogSW1hZ2U7XG4gIC8qKlxuICAgKiBPYmplY3Qgb2YgdHlwZSBgQnV0dG9uc0NvbmZpZ2AgdG8gaW5pdCBVcHBlckJ1dHRvbnNDb21wb25lbnQncyBmZWF0dXJlcy5cbiAgICogRm9yIGluc3RhbmNlLCBpdCBjb250YWlucyBhbiBhcnJheSBvZiBidXR0b25zLlxuICAgKi9cbiAgQElucHV0KCkgYnV0dG9uc0NvbmZpZzogQnV0dG9uc0NvbmZpZztcblxuICAvKipcbiAgICogT3V0cHV0IHRvIGVtaXQgY2xpY2tzIG9uIHJlZnJlc2ggYnV0dG9uLiBUaGUgcGF5bG9hZCBjb250YWlucyBhIGBCdXR0b25FdmVudGAuXG4gICAqL1xuICBAT3V0cHV0KCkgcmVmcmVzaDogRXZlbnRFbWl0dGVyPEJ1dHRvbkV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8QnV0dG9uRXZlbnQ+KCk7XG4gIC8qKlxuICAgKiBPdXRwdXQgdG8gZW1pdCBjbGlja3Mgb24gZGVsZXRlIGJ1dHRvbi4gVGhlIHBheWxvYWQgY29udGFpbnMgYSBgQnV0dG9uRXZlbnRgLlxuICAgKi9cbiAgQE91dHB1dCgpIGRlbGV0ZTogRXZlbnRFbWl0dGVyPEJ1dHRvbkV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8QnV0dG9uRXZlbnQ+KCk7XG4gIC8qKlxuICAgKiBPdXRwdXQgdG8gZW1pdCBjbGlja3Mgb24gbmF2aWdhdGUgYnV0dG9uLiBUaGUgcGF5bG9hZCBjb250YWlucyBhIGBCdXR0b25FdmVudGAuXG4gICAqL1xuICBAT3V0cHV0KCkgbmF2aWdhdGU6IEV2ZW50RW1pdHRlcjxCdXR0b25FdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPEJ1dHRvbkV2ZW50PigpO1xuICAvKipcbiAgICogT3V0cHV0IHRvIGVtaXQgY2xpY2tzIG9uIGRvd25sb2FkIGJ1dHRvbi4gVGhlIHBheWxvYWQgY29udGFpbnMgYSBgQnV0dG9uRXZlbnRgLlxuICAgKi9cbiAgQE91dHB1dCgpIGRvd25sb2FkOiBFdmVudEVtaXR0ZXI8QnV0dG9uRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxCdXR0b25FdmVudD4oKTtcbiAgLyoqXG4gICAqIE91dHB1dCB0byBlbWl0IGNsaWNrcyBvbiBjbG9zZSBidXR0b24uIFRoZSBwYXlsb2FkIGNvbnRhaW5zIGEgYEJ1dHRvbkV2ZW50YC5cbiAgICovXG4gIEBPdXRwdXQofgBjbG9zZTogRXZlbnRFbWl0dGVyPEJ1dHRvbkV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8QnV0dG9uRXZlbnQ+KCk7XG4gIC8qKlxuICAgKiBPdXRwdXQgdG8gZW1pdCBjbGlja3Mgb24gZnVsbC1zY3JlZW4gYnV0dG9uLiBUaGUgcGF5bG9hZCBjb250YWlucyBhIGBCdXR0b25FdmVudGAuXG4gICAqL1xuICBAT3V0cHV0KCkgZnVsbHNjcmVlbjogRXZlbnRFbWl0dGVyPEJ1dHRvbkV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8QnV0dG9uRXZlbnQ+KCk7XG4gIC8qKlxuICAgKiBPdXRwdXQgdG8gZW1pdCBjbGlja3Mgb24gYWxsIGN1c3RvbSBidXR0b25zLiBUaGUgcGF5bG9hZCBjb250YWlucyBhIGBCdXR0b25FdmVudGAuXG4gICAqL1xuICBAT3V0cHV0KCkgY3VzdG9tRW1pdDogRXZlbnRFbWl0dGVyPEJ1dHRvbkV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8QnV0dG9uRXZlbnQ+KCk7XG5cbiAgLyoqXG4gICAqIEFycmF5IG9mIGBJbnRlcm5hbEJ1dHRvbkNvbmZpZ2AgZXhwb3NlZCB0byB0aGUgdGVtcGxhdGUuIFRoaXMgZmllbGQgaXMgaW5pdGlhbGl6ZWRcbiAgICogYXBwbHlpbmcgdHJhbnNmb3JtYXRpb25zLCBkZWZhdWx0IHZhbHVlcyBhbmQgc28gb24gdG8gdGhlIGlucHV0IG9mIHRoZSBzYW1lIHR5cGUuXG4gICAqL1xuICBidXR0b25zOiBJbnRlcm5hbEJ1dHRvbkNvbmZpZ1tdO1xuICAvKipcbiAgICogT2JqZWN0IG9mIHR5cGUgYEJ1dHRvbnNDb25maWdgIGV4cG9zZWQgdG8gdGhlIHRlbXBsYXRlLiBUaGlzIGZpZWxkIGlzIGluaXRpYWxpemVkXG4gICAqIGFwcGx5aW5nIHRyYW5zZm9ybWF0aW9ucywgZGVmYXVsdCB2YWx1ZXMgYW5kIHNvIG9uIHRvIHRoZSBpbnB1dCBvZiB0aGUgc2FtZSB0eXBlLlxuICAgKi9cbiAgY29uZmlnQnV0dG9uczogQnV0dG9uc0NvbmZpZztcblxuICAvKipcbiAgICogRGVmYXVsdCBidXR0b25zIGFycmF5IGZvciBzdGFuZGFyZCBjb25maWd1cmF0aW9uXG4gICAqL1xuICBwcml2YXRlIGRlZmF1bHRCdXR0b25zRGVmYXVsdDogQnV0dG9uQ29uZmlnW10gPSBbS1NfREVGQVVMVF9CVE5fQ0xPU0VdO1xuICAvKipcbiAgICogRGVmYXVsdCBidXR0b25zIGFycmF5IGZvciBzaW1wbGUgY29uZmlndXJhdGlvblxuICAgKi9cbiAgcHJpdmF0ZSBzaW1wbGVCdXR0b25zRGVmYXVsdDogQnV0dG9uQ29uZmlnW10gPSBbS1NfREVGQVVMVF9CVE5fRE9XTkxPQUQsIC4uLnRoaXMuZGVmYXVsdEJ1dHRvbnNEZWZhdWx0XTtcbiAgLyoqXG4gICAqIERlZmF1bHQgYnV0dG9ucyBhcnJheSBmb3IgYWR2YW5jZWQgY29uZmlndXJhdGlvblxuICAgKi9cbiAgcHJpdmF0ZSBhZHZhbmNlZEJ1dHRvbnNEZWZhdWx0OiBCdXR0b25Db25maWdbXSA9IFtLU19ERUZBVUxUX0JUTl9FWFRVUkwsIC4uLnRoaXMuc2ltcGxlQnV0dG9uc0RlZmF1bHRdO1xuICAvKipcbiAgICogRGVmYXVsdCBidXR0b25zIGFycmF5IGZvciBmdWxsIGNvbmZpZ3VyYXRpb25cbiAgICovXG4gIHByaXZhdGUgZnVsbEJ1dHRvbnNEZWZhdWx0OiBCdXR0b25Db25maWdbXSA9IFtcbiAgICAvKktTX0RFRkFVTFRfQlROX1JFRlJFU0gsICovXG4gICAgS1NfREVGQVVMVF9CVE5fRlVMTF9TQ1JFRU4sXG4gICAgS1NfREVGQVVMVF9CVE5fREVMRVRFLFxuICAgIC4uLnRoaXMuYWR2YW5jZWRCdXR0b25zRGVmYXVsdFxuICBdO1xuXG4gIC8qKlxuICAgKiBNZXRob2QgwrRuZ09uSW5pdMK0IHRvIGJ1aWxkIGBjb25maWdCdXR0b25zYCBhcHBseWluZyBhIGRlZmF1bHQgdmFsdWUgYW5kIGFsc28gdG9cbiAgICogaW5pdCB0aGUgYGJ1dHRvbnNgIGFycmF5LlxuICAgKiBUaGlzIGlzIGFuIEFuZ3VsYXIncyBsaWZlY3ljbGUgaG9vaywgc28gaXRzIGNhbGxlZCBhdXRvbWF0aWNhbGx5IGJ5IEFuZ3VsYXIgaXRzZWxmLlxuICAgKiBJbiBwYXJ0aWN1bGFyLCBpdCdzIGNhbGxlZCBvbmx5IG9uZSB0aW1lISEhXG4gICAqL1xuICBuZ09uSW5pdCgpIHtcbiAgICBjb25zdCBkZWZhdWx0Q29uZmlnOiBCdXR0b25zQ29uZmlnID0geyB2aXNpYmxlOiB0cnVlLCBzdHJhdGVneTogQnV0dG9uc1N0cmF0ZWd5LkRFRkFVTFQgfTtcbiAgICB0aGlzLmNvbmZpZ0J1dHRvbnMgPSBPYmplY3QuYXNzaWduKGRlZmF1bHRDb25maWcsIHRoaXMuYnV0dG9uc0NvbmZpZyk7XG4gICAgc3dpdGNoICh0aGlzLmNvbmZpZ0J1dHRvbnMuc3RyYXRlZ3kpIHtcbiAgICAgIGNhc2UgQnV0dG9uc1N0cmF0ZWd5LlNJTVBMRTpcbiAgICAgICAgdGhpcy5idXR0b25zID0gdGhpcy5hZGRCdXR0b25JZHModGhpcy5zaW1wbGVCdXR0b25zRGVmYXVsdCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBCdXR0b25zU3RyYXRlZ3kuQURWQU5DRUQ6XG4gICAgICAgIHRoaXMuYnV0dG9ucyA9IHRoaXMuYWRkQnV0dG9uSWRzKHRoaXMuYWR2YW5jZWRCdXR0b25zRGVmYXVsdCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBCdXR0b25zU3RyYXRlZ3kuRlVMTDpcbiAgICAgICAgdGhpcy5idXR0b25zID0gdGhpcy5hZGRCdXR0b25JZHModGhpcy5mdWxsQnV0dG9uc0RlZmF1bHQpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgQnV0dG9uc1N0cmF0ZWd5LkNVU1RPTTpcbiAgICAgICAgdGhpcy5idXR0b25zID0gdGhpcy5hZGRCdXR0b25JZHModGhpcy52YWxpZGF0ZUN1c3RvbUJ1dHRvbnModGhpcy5jb25maWdCdXR0b25zLmJ1dHRvbnMpKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIEJ1dHRvbnNTdHJhdGVneS5ERUZBVUxUOlxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdGhpcy5idXR0b25zID0gdGhpcy5hZGRCdXR0b25JZHModGhpcy5kZWZhdWx0QnV0dG9uc0RlZmF1bHQpO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogTWV0aG9kIGNhbGxlZCBieSBldmVudHMgZnJvbSBib3RoIGtleWJvYXJkIGFuZCBtb3VzZSBvbiBhIGJ1dHRvbi5cbiAgICogVGhpcyB3aWxsIGNhbGwgYSBwcml2YXRlIG1ldGhvZCB0byB0cmlnZ2VyIGFuIG91dHB1dCB3aXRoIHRoZSByaWdodCBwYXlsb2FkLlxuICAgKiBAcGFyYW0gSW50ZXJuYWxCdXR0b25Db25maWcgYnV0dG9uIHRoYXQgY2FsbGVkIHRoaXMgbWV0aG9kXG4gICAqIEBwYXJhbSBLZXlib2FyZEV2ZW50IHwgTW91c2VFdmVudCBldmVudCBwYXlsb2FkXG4gICAqIEBwYXJhbSBBY3Rpb24gYWN0aW9uIHRoYXQgdHJpZ2dlcmVkIHRoZSBzb3VyY2UgZXZlbnQgb3IgYEFjdGlvbi5DTElDS2AgaWYgbm90IHNwZWNpZmllZFxuICAgKiBAdGhyb3dzIGFuIGVycm9yIGlmIHRoZSBidXR0b24gdHlwZSBpcyB1bmtub3duXG4gICAqL1xuICBvbkV2ZW50KGJ1dHRvbjogSW50ZXJuYWxCdXR0b25Db25maWcsIGV2ZW50OiBLZXlib2FyZEV2ZW50IHwgTW91c2VFdmVudCwgYWN0aW9uOiBBY3Rpb24gPSBBY3Rpb24uQ0xJQ0spIHtcbiAgICBpZiAoIWV2ZW50fgB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IGRhdGFUb0VtaXQ6IEJ1dHRvbkV2ZW50ID0ge1xuICAgICAgYnV0dG9uOiBidXR0b24sXG4gICAgICAvLyBjdXJyZW50IGltYWdlIGluaXRpYWxpemVkIGFzIG51bGxcbiAgICAgIC8vIChJJ2xsIGZpbGwgdGhpcyB2YWx1ZSBpbnNpZGUgdGhlIHBhcmVudCBvZiB0aGlzIGNvbXBvbmVudFxuICAgICAgaW1hZ2U6IG51bGwsXG4gICAgICBhY3Rpb246IGFjdGlvblxuICAgIH07XG4gICAgc3dpdGNoIChidXR0b24udHlwZSkge1xuICAgICAgLy8gY2FzZSBCdXR0b25UeXBlLlJFRlJFU0g6XG4gICAgICAvLyAgIHRoaXMudHJpZ2dlck9uTW91c2VBbmRLZXlib2FyZCh0aGlzLnJlZnJlc2gsIGV2ZW50LCBkYXRhVG9FbWl0KTtcbiAgICAgIC8vICAgYnJlYWs7XG4gICAgICBjYXNlIEJ1dHRvblR5cGUuREVMRVRFOlxuICAgICAgICB0aGlzLnRyaWdnZXJPbk1vdXNlQW5fg2V5Ym9hcmQodGhpcy5kZWxldGUsIGV2ZW50LCBkYXRhVG9FbWl0KTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIEJ1dHRvblR5cGUuRVhUVVJMOlxuICAgICAgICBpZiAoIXRoaXMuY3VycmVudEltYWdlIHx8ICF0aGlzLmN1cnJlbnRJbWFnZS5tb2RhbCB8fCAhdGhpcy5jdXJyZW50SW1hZ2UubW9kYWwuZXh0VXJsfgB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudHJpZ2dlck9uTW91c2VBbmRLZXlib2FyZCh0aGlzLm5hdmlnYXRlLCBldmVudCwgZGF0YVRvRW1pdCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBCdXR0b25UeXBlLkRPV05MT0FEOlxuICAgICAgICB0aGlzLnRyaWdnZXJPbk1vdXNlQW5fg2V5Ym9hcmQodGhpcy5kb3dubG9hZCwgZXZlbnQsIGRhdGFUb0VtaXQpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgQnV0dG9uVHlwZS5DTE9TRTpcbiAgICAgICAgdGhpcy50cmlnZ2VyT25Nb3VzZUFuZEtleWJvYXJkKHRoaXMuY2xvc2UsIGV2ZW50LCBkYXRhVG9FbWl0KTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIEJ1dHRvblR5cGUuQ1VTVE9NOlxuICAgICAgICB0aGlzLnRyaWdnZXJPbk1vdXNlQW5fg2V5Ym9hcmQodGhpcy5jdXN0b21FbWl0LCBldmVudCwgZGF0YVRvRW1pdCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBCdXR0b25UeXBlLkZVTExTQ1JFRU46XG4gICAgICAgIHRoaXMudHJpZ2dlck9uTW91c2VBbmRLZXlib2FyZCh0aGlzLmZ1bGxzY3JlZW4sIGV2ZW50LCBkYXRhVG9FbWl0KTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFVua25vd24gYnV0dG9uJ3MgdHlwZSBpbnRvIEJ1dHRvbkNvbmZpZ2ApO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBNZXRob2QgdXNlZCBpbiB0aGUgdGVtcGxhdGUgdG8gdHJhY2sgaWRzIGluIG5nRm9yLlxuICAgKiBAcGFyYW0gbnVtYmVyIGluZGV4IG9mIHRoZSBhcnJheVxuICAgKiBAcGFyYW0gSW1hZ2UgaXRlbSBvZiB0aGUgYXJyYXlcbiAgICogQHJldHVybnMgbnVtYmVyIHRoZSBpZCBvZiB0aGUgaXRlbSBvciB1bmRlZmluZWQgaWYgdGhlIGl0ZW0gaXMgbm90IHZhbGlkXG4gICAqL1xuICB0cmFja0J5SWQoaW5kZXg6IG51bWJlciwgaXRlbTogSW50ZXJuYWxCdXR0b25Db25maWcpOiBudW1iZXIgfCB1bmRlZmluZWQge1xuICAgIHJldHVybiBpdGVtID8gaXRlbS5pZCA6IHVuZGVmaW5lZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBQcml2YXRlIG1ldGhvZCB0byBlbWl0IGFuIGV2ZW50IHVzaW5nIHRoZSBzcGVjaWZpZWQgb3V0cHV0IGFzIGFuIGBFdmVudEVtaXR0ZXJgLlxuICAgKiBAcGFyYW0gRXZlbnRFbWl0dGVyPEJ1dHRvbkV2ZW50PiBlbWl0dGVyIGlzIHRoZSBvdXRwdXQgdG8gZW1pdCB0aGUgYEJ1dHRvbkV2ZW50YFxuICAgKiBAcGFyYW0gS2V5Ym9hcmRFdmVudCB8IE1vdXNlRXZlbnQgZXZlbnQgaXMgdGhlIHNvdXJjZSB0aGF0IHRyaWdnZXJlZCB0aGlzIG1ldGhvZFxuICAgKiBAcGFyYW0gQnV0dG9uRXZlbnQgZGF0YVRvRW1pdCBwYXlsb2FkIHRvIGVtaXRcbiAgICovXG4gIHByaXZhdGUgdHJpZ2dlck9uTW91c2VBbmRLZXlib2FyZChlbWl0dGVyOiBFdmVudEVtaXR0ZXI8QnV0dG9uRXZlbnQ+LCBldmVudDogS2V5Ym9hcmRFdmVudCB8IE1vdXNlRXZlbnQsIGRhdGFUb0VtaXQ6IEJ1dHRvbkV2ZW50fgB7XG4gICAgaWYgKCFlbWl0dGVyfgB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFVwcGVyQnV0dG9uc0NvbXBvbmVudCB1bmtub3duIGVtaXR0ZXIgaW4gdHJpZ2dlck9uTW91c2VBbmRLZXlib2FyZGApO1xuICAgIH1cblxuICAgIGNvbnN0IHJlc3VsdDogbnVtYmVyID0gc3VwZXIuaGFuZGxlSW1hZ2VFdmVudChldmVudCk7XG4gICAgaWYgKHJlc3VsdCA9PT0gTkVYVCkge1xuICAgICAgZW1pdHRlci5lbWl0KGRhdGFUb0VtaXQpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBQcml2YXRlIG1ldGhvZCB0byBhZGQgaWRzIHRvIHRoZSBhcnJheSBvZiBidXR0b25zLlxuICAgKiBJdCBhZGRzIGlkcyBpbiBhIHJldmVyc2Ugd2F5LCB0byBiZSBzdXJlIHRoYXQgdGhlIGxhc3QgYnV0dG9uIHdpbGwgYWx3YXlzIGhhdmUgaWQgPSAwLlxuICAgKiBUaGlzIGlzIHJlYWxseSB1c2VmdWwgaW4gdW5pdCB0ZXN0aW5nIHRvIGJlIHN1cmUgdGhhdCBjbG9zZSBidXR0b24gYWx3YXlzIGhhdmUgaWQgPSAwLCBkb3dubG9hZCAxIGFuZCBzbyBvbi4uLlxuICAgKiBJdCdzIHRvdGFsbHkgdHJhbnNwYXJlbnQgdG8gdGhlIHVzZXIuXG4gICAqIEBwYXJhbSBCdXR0b25Db25maWdbXSBidXR0b25zIGNvbmZpZyBhcnJheVxuICAgKiBAcmV0dXJucyBCdXR0b25Db25maWdbXSB0aGUgaW5wdXQgYXJyYXkgd2l0aCBpbmNyZW1lbnRhbCBudW1lcmljIGlkc1xuICAgKi9cbiAgcHJpdmF0ZSBhZGRCdXR0b25JZHMoYnV0dG9uczogQnV0dG9uQ29uZmlnW10pOiBCdXR0b25Db25maWdbXSB7XG4gICAgcmV0dXJuIGJ1dHRvbnMubWFwKCh2YWw6IEJ1dHRvbkNvbmZpZywgaTogbnVtYmVyfgA9PiBPYmplY3QuYXNzaWduKHZhbCwgeyBpZDogYnV0dG9ucy5sZW5ndGggLSAxIC0gaSB9fgk7XG4gIH1cblxuICAvKipcbiAgICogUHJpdmF0ZSBtZXRob2QgdG8gdmFsaWRhdGUgY3VzdG9tIGJ1dHRvbnMgcmVjZWl2ZWQgYXMgaW5wdXQuXG4gICAqIEBwYXJhbSBCdXR0b25Db25maWdbXSBidXR0b25zIGNvbmZpZyBhcnJheVxuICAgKiBAcmV0dXJucyBCdXR0b25Db25maWdbXSB0aGUgc2FtZSBpbnB1dCBidXR0b25zIGNvbmZpZyBhcnJheVxuICAgKiBAdGhyb3dzIGFuIGVycm9yIGlzIGV4aXN0cyBhIGJ1dHRvbiB3aXRoIGFuIHVua25vd24gdHlwZVxuICAgKi9cbiAgcHJpdmF0ZSB2YWxpZGF0ZUN1c3RvbUJ1dHRvbnMoYnV0dG9uczogQnV0dG9uQ29uZmlnW10gPSBbXSk6IEJ1dHRvbkNvbmZpZ1tdIHtcbiAgICBidXR0b25zLmZvckVhY2goKHZhbDogQnV0dG9uQ29uZmlnfgA9PiB7XG4gICAgICBjb25zdCBpbmRleE9mQnV0dG9uVHlwZTogbnVtYmVyID0gV0hJVEVMSVNUX0JVVFRPTl9UWVBFUy5maW5fgW5kZXgoKHR5cGU6IEJ1dHRvblR5cGUpID0+IHR5cGUgPT09IHZhbC50eXBlKTtcbiAgICAgIGlmIChpbmRleE9mQnV0dG9uVHlwZSA9PT0gLTEpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBVbmtub3duIEJ1dHRvblR5cGUuIEZvciBjdXN0b20gdHlwZXMgdXNlIEJ1dHRvblR5cGUuQ1VTVE9NYCk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIGJ1dHRvbnM7XG4gIH1cbn1cbiJdfQ==