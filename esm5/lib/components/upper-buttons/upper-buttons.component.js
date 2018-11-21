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
import * as tslib_1 from "tslib";
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
var UpperButtonsComponent = /** @class */ (function (_super) {
    tslib_1.__extends(UpperButtonsComponent, _super);
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
        _this.simpleButtonsDefault = tslib_1.__spread([fg_DEFAULT_BTN_DOWNLOAD], _this.defaultButtonsDefault);
        /**
         * Default buttons array for advanced configuration
         */
        _this.advancedButtonsDefault = tslib_1.__spread([fg_DEFAULT_BTN_EXTURL], _this.simpleButtonsDefault);
        /**
         * Default buttons array for full configuration
         */
        _this.fullButtonsDefault = tslib_1.__spread([
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
export { UpperButtonsComponent };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBwZXItYnV0dG9ucy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9tb2RhbC1hbmd1bGFyLWdhbGxlcnkvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy91cHBlci1idXR0b25zL3VwcGVyLWJ1dHRvbnMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF3QkEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFVLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUV4RyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUU5RCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDakQsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ2hELE9BQU8sRUFBNEMsZUFBZSxFQUFFLFVBQVUsRUFBRSxzQkFBc0IsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBRXJKLE9BQU8sRUFDTCxvQkFBb0IsRUFDcEIscUJBQXFCLEVBQ3JCLHVCQUF1QixFQUN2QixxQkFBcUIsRUFDckIsMEJBQTBCLEVBQzNCLE1BQU0seUJBQXlCLENBQUM7QUFFakMsT0FBTyxFQUFFLElBQUfgRUFBRSxNQUFNLDZCQUE2QixDQUFDOzs7Ozs7Ozs7Ozs7O0lBbUJSLGlEQUFtQjs7Ozs7O3dCQWNiLElBQUfgWUFBWSxFQUFlOzs7O3VCQUloQyxJQUFJLFlBQVfgRUFBZTs7Ozt5QkFJN0IsSUFBSSxZQUFZLEVBQWU7Ozs7eUJBSS9CLElBQUfgWUFBWSxFQUFlOzs7O3NCQUlsQyxJQUFJLFlBQVfgRUFBZTs7OzsyQkFJMUIsSUFBSSxZQUFZLEVBQWU7Ozs7MkJBSS9CLElBQUfgWUFBWSxFQUFlOzs7O3NDQWdCakMsQ0FBQyxvQkFBb0IsQ0FBQzs7Ozt1REFJdEIsdUJBQXVCLEdBQUssS0FBSSxDQUFDLHFCQUFxQjs7Ozt5REFJcEQscUJBQXFCLEdBQUssS0FBSSxDQUFDLG9CQUFvQjs7Ozs7WUFNbkcsMEJBQTBCO1lBQzFCLHFCQUFxQjtXQUNsQixLQUFJLENBQUMsc0JBQXNCOzs7SUFHaEM7Ozs7O09BS0c7Ozs7Ozs7O0lBQ0gsd0NBQVE7Ozs7Ozs7SUFBUjs7UUFDRSxJQUFNLGFBQWEsR0FBa0IsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxlQUFlLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDMUYsSUFBSSxDQUFDLGFBQWEsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDdEUsUUFBUSxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsRUFBRTtZQUNuQyxLQUFLLGVBQWUsQ0FBQyxNQUFNO2dCQUN6QixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUfgQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLENBQUM7Z0JBQzVELE1BQU07WUFDUixLQUFLLGVBQWUsQ0FBQyxRQUFRO2dCQUMzQixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUfgQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLENBQUM7Z0JBQzlELE1BQU07WUFDUixLQUFLLGVBQWUsQ0FBQyxJQUFJO2dCQUN2QixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUfgQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUM7Z0JBQzFELE1BQU07WUFDUixLQUFLLGVBQWUsQ0FBQyxNQUFNO2dCQUN6QixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUfgQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLElBQUfgQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztnQkFDekYsTUFBTTtZQUNSLEtBQUssZUFBZSxDQUFDLE9BQU8sQ0FBQztZQUM3QjtnQkFDRSxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUfgQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLENBQUM7Z0JBQzdELE1BQU07U0FDVDtLQUNGO0lBRUQ7Ozs7Ozs7T0FPRzs7Ozs7Ozs7OztJQUNILHVDQUFPOzs7Ozs7Ozs7SUFBUCxVQUFRLE1BQTRCLEVBQUUsS0FBaUMsRUFBRSxNQUE2QjtRQUE3Qix1QkFBQSxFQUFBLFNBQWlCLE1BQU0sQ0FBQyxLQUFLO1FBQ3BHLElBQUfgQ0FBQyxLQUFLLEVBQUU7WUFDVixPQUFPO1NBQ1I7O1FBQ0QsSUFBTSxVQUFVLEdBQWdCO1lBQzlCLE1BQU0sRUFBRSxNQUFNOzs7WUFHZCxLQUFLLEVBQUUsSUFBSTtZQUNYLE1BQU0sRUFBRSxNQUFNO1NBQ2YsQ0FBQztRQUNGLFFBQVEsTUFBTSxDQUFDLElBQUfgRUFBRTs7OztZQUluQixLQUFLLFVBQVUsQ0FBQyxNQUFNO2dCQUNwQixJQUFJLENBQUMseUJBQXlCLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsVUFBVSxDQUFDLENBQUM7Z0JBQy9ELE1BQU07WUFDUixLQUFLLFVBQVUsQ0FBQyxNQUFNO2dCQUNwQixJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVfgSUFBSSxDQUFDLElBQUfgQ0FBQyxZQUFZLENBQUMsS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVfgQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFO29CQUNyRixPQUFPO2lCQUNSO2dCQUNELElBQUfgQ0FBQyx5QkFBeUIsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEtBQUssRUFBRSxVQUFVLENBQUMsQ0FBQztnQkFDakUsTUFBTTtZQUNSLEtBQUssVUFBVSxDQUFDLFFBQVE7Z0JBQ3RCLElBQUfgQ0FBQyx5QkFBeUIsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEtBQUssRUFBRSxVQUFVLENBQUMsQ0FBQztnQkFDakUsTUFBTTtZQUNSLEtBQUssVUFBVSxDQUFDLEtBQUs7Z0JBQ25CLElBQUfgQ0FBQyx5QkFBeUIsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxVQUFVLENBQUMsQ0FBQztnQkFDOUQsTUFBTTtZQUNSLEtBQUssVUFBVSxDQUFDLE1BQU07Z0JBQ3BCLElBQUfgQ0FBQyx5QkFBeUIsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLEtBQUssRUFBRSxVQUFVLENBQUMsQ0FBQztnQkFDbkUsTUFBTTtZQUNSLEtBQUssVUFBVSxDQUFDLFVBQVU7Z0JBQ3hCLElBQUfgQ0FBQyx5QkFBeUIsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLEtBQUssRUFBRSxVQUFVLENBQUMsQ0FBQztnQkFDbkUsTUFBTTtZQUNSO2dCQUNFLE1BQU0sSUFBSSxLQUFLLENBQUMseUNBQXlDLENBQUMsQ0FBQztTQUM5RDtLQUNGO0lBRUQ7Ozs7O09BS0c7Ozs7Ozs7SUFDSCx5Q0FBUzs7Ozs7O0lBQVQsVUFBVSxLQUFhLEVBQUUsSUFBMEI7UUFDakQsT0FBTyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUfgQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztLQUNuQzs7Ozs7Ozs7SUFRTyx5REFBeUI7Ozs7Ozs7Y0FBQyxPQUFrQyxFQUFFLEtBQWlDLEVBQUUsVUFBdUI7UUFDOUgsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNaLE1BQU0sSUFBSSxLQUFLLENBQUMsb0VBQW9FLENBQUMsQ0FBQztTQUN2Rjs7UUFFRCxJQUFNLE1BQU0sR0FBVyxpQkFBTSxnQkFBZ0IsWUFBQyxLQUFLLENBQUMsQ0FBQztRQUNyRCxJQUFJLE1BQU0sS0FBSyxJQUFJLEVBQUU7WUFDbkIsT0FBTyxDQUFDLElBQUfgQ0FBQyxVQUFVLENBQUMsQ0FBQztTQUMxQjs7Ozs7Ozs7OztJQVdLLDRDQUFZOzs7Ozs7OztjQUFDLE9BQXVCO1FBQzFDLE9BQU8sT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFDLEdBQWlCLEVBQUUsQ0FBUyxJQUFLLE9BQUEsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsRUFBRSxFQUFFLEVBQUUsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBbEQsQ0FBa0QsQ0FBQyxDQUFDOzs7Ozs7OztJQVNuRyxxREFBcUI7Ozs7OztjQUFDLE9BQTRCO1FBQTVCLHdCQUFBLEVBQUEsWUFBNEI7UUFDeEQsT0FBTyxDQUFDLE9BQU8sQ0FBQyxVQUFDLEdBQWlCOztZQUNoQyxJQUFNLGlCQUFpQixHQUFXLHNCQUFzQixDQUFDLFNBQVMsQ0FBQyxVQUFDLElBQWdCLElBQUssT0FBQSxJQUFJLEtBQUssR0FBRyxDQUFDLElBQUfgRUFBakIsQ0FBaUIsQ0FBQyxDQUFDO1lBQzVHLElBQUfgaUJBQWlCLEtBQUssQ0FBQyxDQUFDLEVBQUU7Z0JBQzVCLE1BQU0sSUFBSSxLQUFLLENBQUMsNERBQTRELENBQUMsQ0FBQzthQUMvRTtTQUNGLENBQUMsQ0FBQztRQUNILE9BQU8sT0FBTyxDQUFDOzs7Z0JBak5sQixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLGtCQUFrQjtvQkFFNUIscXBCQUFpQztvQkFDakMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O2lCQUNoRDs7OytCQUtFLEtBQUs7Z0NBS0wsS0FBSzswQkFLTCxNQUFNO3lCQUlOLE1BQU07MkJBSU4sTUFBTTsyQkFJTixNQUFNO3dCQUlOLE1BQU07NkJBSU4sTUFBTTs2QkFJTixNQUFNOztnQ0FqR1Q7RUEyRDJDLG1CQUFtQjtTQUFqRCxxQkFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuIFRoZSBNSVQgTGljZW5zZSAoTUlUKVxuXG4gQ29weXJpZ2h0IChjfgAyMDE3IFN0ZWZhbm8gQ2FwcGEgKEtzODkpXG5cbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwifgwgdG8gZGVhbFxuIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbiB0byB1c2UsIGNvcHfgIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcblxuIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIGFsbFxuIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG5cbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFfgXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTiBJTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiBMSUFCSUxJVFfgIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFXG4gU09GVFdBUkUuXG4gKi9cblxuaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3fgIENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25Jbml0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgQWNjZXNzaWJsZUNvbXBvbmVudCB9IGZyb20gJy4uL2FjY2Vzc2libGUuY29tcG9uZW50JztcblxuaW1wb3J0IHsgQWN0aW9uIH0gZnJvbSAnLi4vLi4vbW9kZWwvYWN0aW9uLmVudW0nO1xuaW1wb3J0IHsgSW1hZ2UgfSBmcm9tICcuLi8uLi9tb2RlbC9pbWFnZS5jbGFzcyc7XG5pbXBvcnQgeyBCdXR0b25Db25maWcsIEJ1dHRvbkV2ZW50LCBCdXR0b25zQ29uZmlnLCBCdXR0b25zU3RyYXRlZ3fgIEJ1dHRvblR5cGUsIFdISVRFTElTVF9CVVRUT05fVFlQRVMgfSBmcm9tICcuLi8uLi9tb2RlbC9idXR0b25zLWNvbmZpZy5pbnRlcmZhY2UnO1xuXG5pbXBvcnQge1xuICBLU19ERUZBVUxUX0JUTl9DTE9TRSxcbiAgS1NfREVGQVVMVF9CVE5fREVMRVRFLFxuICBLU19ERUZBVUxUX0JUTl9ET1dOTE9BRCxcbiAgS1NfREVGQVVMVF9CVE5fRVhUVVJMLFxuICBLU19ERUZBVUxUX0JUTl9GVUxMX1NDUkVFTlxufSBmcm9tICcuL3VwcGVyLWJ1dHRvbnMtZGVmYXVsdCc7XG5cbmltcG9ydCB7IE5FWFQgfSBmcm9tICcuLi8uLi91dGlscy91c2VyLWlucHV0LnV0aWwnO1xuXG4vKipcbiAqIEludGVybmFsIHJlcHJlc2VudGF0aW9uIG9mIGBCdXR0b25Db25maWdgIHdpdGggYW4gb3B0aW9uYWwgYGlkYCBmaWVsZCwgdXNlZCBieSB0cmFja0lkIHRvIGltcHJvdmUgcGVyZm9ybWFuY2VzLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIEludGVybmFsQnV0dG9uQ29uZmlnIGV4dGVuZHMgQnV0dG9uQ29uZmlnIHtcbiAgaWQ/OiBudW1iZXI7IC8vIHVzZWZ1bCBvbmx5IGZvciB0cmFja0J5SWQsIG5vdCBuZWVkZWQgYnkgdXNlcnNcbn1cblxuLyoqXG4gKiBDb21wb25lbnQgd2l0aCBhbGwgdXBwZXIgYnV0dG9ucy5cbiAqIEFsc28gaXQgZW1pdHMgY2xpY2sgZXZlbnRzIGFzIG91dHB1dHMuXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2tzLXVwcGVyLWJ1dHRvbnMnLFxuICBzdHlsZVVybHM6IFsndXBwZXItYnV0dG9ucy5zY3NzJ10sXG4gIHRlbXBsYXRlVXJsOiAndXBwZXItYnV0dG9ucy5odG1sJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgVXBwZXJCdXR0b25zQ29tcG9uZW50IGV4dGVuZHMgQWNjZXNzaWJsZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIC8qKlxuICAgKiBPYmplY3Qgb2YgdHlwZSBgSW1hZ2VgIHRoYXQgcmVwcmVzZW50IHRoZSB2aXNpYmxlIGltYWdlLlxuICAgKi9cbiAgQElucHV0KCkgY3VycmVudEltYWdlOiBJbWFnZTtcbiAgLyoqXG4gICAqIE9iamVjdCBvZiB0eXBlIGBCdXR0b25zQ29uZmlnYCB0byBpbml0IFVwcGVyQnV0dG9uc0NvbXBvbmVudCdzIGZlYXR1cmVzLlxuICAgKiBGb3IgaW5zdGFuY2UsIGl0IGNvbnRhaW5zIGFuIGFycmF5IG9mIGJ1dHRvbnMuXG4gICAqL1xuICBASW5wdXQofgBidXR0b25zQ29uZmlnOiBCdXR0b25zQ29uZmlnO1xuXG4gIC8qKlxuICAgKiBPdXRwdXQgdG8gZW1pdCBjbGlja3Mgb24gcmVmcmVzaCBidXR0b24uIFRoZSBwYXlsb2FkIGNvbnRhaW5zIGEgYEJ1dHRvbkV2ZW50YC5cbiAgICovXG4gIEBPdXRwdXQofgByZWZyZXNoOiBFdmVudEVtaXR0ZXI8QnV0dG9uRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxCdXR0b25FdmVudD4oKTtcbiAgLyoqXG4gICAqIE91dHB1dCB0byBlbWl0IGNsaWNrcyBvbiBkZWxldGUgYnV0dG9uLiBUaGUgcGF5bG9hZCBjb250YWlucyBhIGBCdXR0b25FdmVudGAuXG4gICAqL1xuICBAT3V0cHV0KCkgZGVsZXRlOiBFdmVudEVtaXR0ZXI8QnV0dG9uRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxCdXR0b25FdmVudD4oKTtcbiAgLyoqXG4gICAqIE91dHB1dCB0byBlbWl0IGNsaWNrcyBvbiBuYXZpZ2F0ZSBidXR0b24uIFRoZSBwYXlsb2FkIGNvbnRhaW5zIGEgYEJ1dHRvbkV2ZW50YC5cbiAgICovXG4gIEBPdXRwdXQofgBuYXZpZ2F0ZTogRXZlbnRFbWl0dGVyPEJ1dHRvbkV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8QnV0dG9uRXZlbnQ+KCk7XG4gIC8qKlxuICAgKiBPdXRwdXQgdG8gZW1pdCBjbGlja3Mgb24gZG93bmxvYWQgYnV0dG9uLiBUaGUgcGF5bG9hZCBjb250YWlucyBhIGBCdXR0b25FdmVudGAuXG4gICAqL1xuICBAT3V0cHV0KCkgZG93bmxvYWQ6IEV2ZW50RW1pdHRlcjxCdXR0b25FdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPEJ1dHRvbkV2ZW50PigpO1xuICAvKipcbiAgICogT3V0cHV0IHRvIGVtaXQgY2xpY2tzIG9uIGNsb3NlIGJ1dHRvbi4gVGhlIHBheWxvYWQgY29udGFpbnMgYSBgQnV0dG9uRXZlbnRgLlxuICAgKi9cbiAgQE91dHB1dCgpIGNsb3NlOiBFdmVudEVtaXR0ZXI8QnV0dG9uRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxCdXR0b25FdmVudD4oKTtcbiAgLyoqXG4gICAqIE91dHB1dCB0byBlbWl0IGNsaWNrcyBvbiBmdWxsLXNjcmVlbiBidXR0b24uIFRoZSBwYXlsb2FkIGNvbnRhaW5zIGEgYEJ1dHRvbkV2ZW50YC5cbiAgICovXG4gIEBPdXRwdXQofgBmdWxsc2NyZWVuOiBFdmVudEVtaXR0ZXI8QnV0dG9uRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxCdXR0b25FdmVudD4oKTtcbiAgLyoqXG4gICAqIE91dHB1dCB0byBlbWl0IGNsaWNrcyBvbiBhbGwgY3VzdG9tIGJ1dHRvbnMuIFRoZSBwYXlsb2FkIGNvbnRhaW5zIGEgYEJ1dHRvbkV2ZW50YC5cbiAgICovXG4gIEBPdXRwdXQofgBjdXN0b21FbWl0OiBFdmVudEVtaXR0ZXI8QnV0dG9uRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxCdXR0b25FdmVudD4oKTtcblxuICAvKipcbiAgICogQXJyYXkgb2YgYEludGVybmFsQnV0dG9uQ29uZmlnYCBleHBvc2VkIHRvIHRoZSB0ZW1wbGF0ZS4gVGhpcyBmaWVsZCBpcyBpbml0aWFsaXplZFxuICAgKiBhcHBseWluZyB0cmFuc2Zvcm1hdGlvbnMsIGRlZmF1bHQgdmFsdWVzIGFuZCBzbyBvbiB0byB0aGUgaW5wdXQgb2YgdGhlIHNhbWUgdHlwZS5cbiAgICovXG4gIGJ1dHRvbnM6IEludGVybmFsQnV0dG9uQ29uZmlnW107XG4gIC8qKlxuICAgKiBPYmplY3Qgb2YgdHlwZSBgQnV0dG9uc0NvbmZpZ2AgZXhwb3NlZCB0byB0aGUgdGVtcGxhdGUuIFRoaXMgZmllbGQgaXMgaW5pdGlhbGl6ZWRcbiAgICogYXBwbHlpbmcgdHJhbnNmb3JtYXRpb25zLCBkZWZhdWx0IHZhbHVlcyBhbmQgc28gb24gdG8gdGhlIGlucHV0IG9mIHRoZSBzYW1lIHR5cGUuXG4gICAqL1xuICBjb25maWdCdXR0b25zOiBCdXR0b25zQ29uZmlnO1xuXG4gIC8qKlxuICAgKiBEZWZhdWx0IGJ1dHRvbnMgYXJyYXkgZm9yIHN0YW5kYXJkIGNvbmZpZ3VyYXRpb25cbiAgICovXG4gIHByaXZhdGUgZGVmYXVsdEJ1dHRvbnNEZWZhdWx0OiBCdXR0b25Db25maWdbXSA9IFtLU19ERUZBVUxUX0JUTl9DTE9TRV07XG4gIC8qKlxuICAgKiBEZWZhdWx0IGJ1dHRvbnMgYXJyYXkgZm9yIHNpbXBsZSBjb25maWd1cmF0aW9uXG4gICAqL1xuICBwcml2YXRlIHNpbXBsZUJ1dHRvbnNEZWZhdWx0OiBCdXR0b25Db25maWdbXSA9IFtLU19ERUZBVUxUX0JUTl9ET1dOTE9BRCwgLi4udGhpcy5kZWZhdWx0QnV0dG9uc0RlZmF1bHRdO1xuICAvKipcbiAgICogRGVmYXVsdCBidXR0b25zIGFycmF5IGZvciBhZHZhbmNlZCBjb25maWd1cmF0aW9uXG4gICAqL1xuICBwcml2YXRlIGFkdmFuY2VkQnV0dG9uc0RlZmF1bHQ6IEJ1dHRvbkNvbmZpZ1tdID0gW0tTX0RFRkFVTFRfQlROX0VYVFVSTCwgLi4udGhpcy5zaW1wbGVCdXR0b25zRGVmYXVsdF07XG4gIC8qKlxuICAgKiBEZWZhdWx0IGJ1dHRvbnMgYXJyYXkgZm9yIGZ1bGwgY29uZmlndXJhdGlvblxuICAgKi9cbiAgcHJpdmF0ZSBmdWxsQnV0dG9uc0RlZmF1bHQ6IEJ1dHRvbkNvbmZpZ1tdID0gW1xuICAgIC8qS1NfREVGQVVMVF9CVE5fUkVGUkVTSCwgKi9cbiAgICBLU19ERUZBVUxUX0JUTl9GVUxMX1NDUkVFTixcbiAgICBLU19ERUZBVUxUX0JUTl9ERUxFVEUsXG4gICAgLi4udGhpcy5hZHZhbmNlZEJ1dHRvbnNEZWZhdWx0XG4gIF07XG5cbiAgLyoqXG4gICAqIE1ldGhvZCDCtG5nT25Jbml0wrQgdG8gYnVpbGQgYGNvbmZpZ0J1dHRvbnNgIGFwcGx5aW5nIGEgZGVmYXVsdCB2YWx1ZSBhbmQgYWxzbyB0b1xuICAgKiBpbml0IHRoZSBgYnV0dG9uc2AgYXJyYXkuXG4gICAqIFRoaXMgaXMgYW4gQW5ndWxhcidzIGxpZmVjeWNsZSBob29rLCBzbyBpdHMgY2FsbGVkIGF1dG9tYXRpY2FsbHkgYnkgQW5ndWxhciBpdHNlbGYuXG4gICAqIEluIHBhcnRpY3VsYXIsIGl0J3MgY2FsbGVkIG9ubHkgb25lIHRpbWUhISFcbiAgICovXG4gIG5nT25Jbml0KCkge1xuICAgIGNvbnN0IGRlZmF1bHRDb25maWc6IEJ1dHRvbnNDb25maWcgPSB7IHZpc2libGU6IHRydWUsIHN0cmF0ZWd5OiBCdXR0b25zU3RyYXRlZ3kuREVGQVVMVCB9O1xuICAgIHRoaXMuY29uZmlnQnV0dG9ucyA9IE9iamVjdC5hc3NpZ24oZGVmYXVsdENvbmZpZywgdGhpcy5idXR0b25zQ29uZmlnKTtcbiAgICBzd2l0Y2ggKHRoaXMuY29uZmlnQnV0dG9ucy5zdHJhdGVneSkge1xuICAgICAgY2FzZSBCdXR0b25zU3RyYXRlZ3kuU0lNUExFOlxuICAgICAgICB0aGlzLmJ1dHRvbnMgPSB0aGlzLmFkZEJ1dHRvbklkcyh0aGlzLnNpbXBsZUJ1dHRvbnNEZWZhdWx0KTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIEJ1dHRvbnNTdHJhdGVneS5BRFZBTkNFRDpcbiAgICAgICAgdGhpcy5idXR0b25zID0gdGhpcy5hZGRCdXR0b25JZHModGhpcy5hZHZhbmNlZEJ1dHRvbnNEZWZhdWx0KTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIEJ1dHRvbnNTdHJhdGVneS5GVUxMOlxuICAgICAgICB0aGlzLmJ1dHRvbnMgPSB0aGlzLmFkZEJ1dHRvbklkcyh0aGlzLmZ1bGxCdXR0b25zRGVmYXVsdCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBCdXR0b25zU3RyYXRlZ3kuQ1VTVE9NOlxuICAgICAgICB0aGlzLmJ1dHRvbnMgPSB0aGlzLmFkZEJ1dHRvbklkcyh0aGlzLnZhbGlkYXRlQ3VzdG9tQnV0dG9ucyh0aGlzLmNvbmZpZ0J1dHRvbnMuYnV0dG9ucykpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgQnV0dG9uc1N0cmF0ZWd5LkRFRkFVTFQ6XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aGlzLmJ1dHRvbnMgPSB0aGlzLmFkZEJ1dHRvbklkcyh0aGlzLmRlZmF1bHRCdXR0b25zRGVmYXVsdCk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBNZXRob2QgY2FsbGVkIGJ5IGV2ZW50cyBmcm9tIGJvdGgga2V5Ym9hcmQgYW5kIG1vdXNlIG9uIGEgYnV0dG9uLlxuICAgKiBUaGlzIHdpbGwgY2FsbCBhIHByaXZhdGUgbWV0aG9kIHRvIHRyaWdnZXIgYW4gb3V0cHV0IHdpdGggdGhlIHJpZ2h0IHBheWxvYWQuXG4gICAqIEBwYXJhbSBJbnRlcm5hbEJ1dHRvbkNvbmZpZyBidXR0b24gdGhhdCBjYWxsZWQgdGhpcyBtZXRob2RcbiAgICogQHBhcmFtIEtleWJvYXJkRXZlbnQgfCBNb3VzZUV2ZW50IGV2ZW50IHBheWxvYWRcbiAgICogQHBhcmFtIEFjdGlvbiBhY3Rpb24gdGhhdCB0cmlnZ2VyZWQgdGhlIHNvdXJjZSBldmVudCBvciBgQWN0aW9uLkNMSUNLYCBpZiBub3Qgc3BlY2lmaWVkXG4gICAqIEB0aHJvd3MgYW4gZXJyb3IgaWYgdGhlIGJ1dHRvbiB0eXBlIGlzIHVua25vd25cbiAgICovXG4gIG9uRXZlbnQoYnV0dG9uOiBJbnRlcm5hbEJ1dHRvbkNvbmZpZywgZXZlbnQ6IEtleWJvYXJkRXZlbnQgfCBNb3VzZUV2ZW50LCBhY3Rpb246IEFjdGlvbiA9IEFjdGlvbi5DTElDSykge1xuICAgIGlmICghZXZlbnQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgZGF0YVRvRW1pdDogQnV0dG9uRXZlbnQgPSB7XG4gICAgICBidXR0b246IGJ1dHRvbixcbiAgICAgIC8vIGN1cnJlbnQgaW1hZ2UgaW5pdGlhbGl6ZWQgYXMgbnVsbFxuICAgICAgLy8gKEknbGwgZmlsbCB0aGlzIHZhbHVlIGluc2lkZSB0aGUgcGFyZW50IG9mIHRoaXMgY29tcG9uZW50XG4gICAgICBpbWFnZTogbnVsbCxcbiAgICAgIGFjdGlvbjogYWN0aW9uXG4gICAgfTtcbiAgICBzd2l0Y2ggKGJ1dHRvbi50eXBlfgB7XG4gICAgICAvLyBjYXNlIEJ1dHRvblR5cGUuUkVGUkVTSDpcbiAgICAgIC8vICAgdGhpcy50cmlnZ2VyT25Nb3VzZUFuZEtleWJvYXJkKHRoaXMucmVmcmVzaCwgZXZlbnQsIGRhdGFUb0VtaXQpO1xuICAgICAgLy8gICBicmVhaztcbiAgICAgIGNhc2UgQnV0dG9uVHlwZS5ERUxFVEU6XG4gICAgICAgIHRoaXMudHJpZ2dlck9uTW91c2VBbmRLZXlib2FyZCh0aGlzLmRlbGV0ZSwgZXZlbnQsIGRhdGFUb0VtaXQpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgQnV0dG9uVHlwZS5FWFRVUkw6XG4gICAgICAgIGlmICghdGhpcy5jdXJyZW50SW1hZ2UgfHwgIXRoaXMuY3VycmVudEltYWdlLm1vZGFsIHx8ICF0aGlzLmN1cnJlbnRJbWFnZS5tb2RhbC5leHRVcmwpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy50cmlnZ2VyT25Nb3VzZUFuZEtleWJvYXJkKHRoaXMubmF2aWdhdGUsIGV2ZW50LCBkYXRhVG9FbWl0KTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIEJ1dHRvblR5cGUuRE9XTkxPQUQ6XG4gICAgICAgIHRoaXMudHJpZ2dlck9uTW91c2VBbmRLZXlib2FyZCh0aGlzLmRvd25sb2FkLCBldmVudCwgZGF0YVRvRW1pdCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBCdXR0b25UeXBlLkNMT1NFOlxuICAgICAgICB0aGlzLnRyaWdnZXJPbk1vdXNlQW5fg2V5Ym9hcmQodGhpcy5jbG9zZSwgZXZlbnQsIGRhdGFUb0VtaXQpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgQnV0dG9uVHlwZS5DVVNUT006XG4gICAgICAgIHRoaXMudHJpZ2dlck9uTW91c2VBbmRLZXlib2FyZCh0aGlzLmN1c3RvbUVtaXQsIGV2ZW50LCBkYXRhVG9FbWl0KTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIEJ1dHRvblR5cGUuRlVMTFNDUkVFTjpcbiAgICAgICAgdGhpcy50cmlnZ2VyT25Nb3VzZUFuZEtleWJvYXJkKHRoaXMuZnVsbHNjcmVlbiwgZXZlbnQsIGRhdGFUb0VtaXQpO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgVW5rbm93biBidXR0b24ncyB0eXBlIGludG8gQnV0dG9uQ29uZmlnYCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIE1ldGhvZCB1c2VkIGluIHRoZSB0ZW1wbGF0ZSB0byB0cmFjayBpZHMgaW4gbmdGb3IuXG4gICAqIEBwYXJhbSBudW1iZXIgaW5kZXggb2YgdGhlIGFycmF5XG4gICAqIEBwYXJhbSBJbWFnZSBpdGVtIG9mIHRoZSBhcnJheVxuICAgKiBAcmV0dXJucyBudW1iZXIgdGhlIGlkIG9mIHRoZSBpdGVtIG9yIHVuZGVmaW5lZCBpZiB0aGUgaXRlbSBpcyBub3QgdmFsaWRcbiAgICovXG4gIHRyYWNrQnlJZChpbmRleDogbnVtYmVyLCBpdGVtOiBJbnRlcm5hbEJ1dHRvbkNvbmZpZyk6IG51bWJlciB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIGl0ZW0gPyBpdGVtLmlkIDogdW5kZWZpbmVkO1xuICB9XG5cbiAgLyoqXG4gICAqIFByaXZhdGUgbWV0aG9kIHRvIGVtaXQgYW4gZXZlbnQgdXNpbmcgdGhlIHNwZWNpZmllZCBvdXRwdXQgYXMgYW4gYEV2ZW50RW1pdHRlcmAuXG4gICAqIEBwYXJhbSBFdmVudEVtaXR0ZXI8QnV0dG9uRXZlbnQ+IGVtaXR0ZXIgaXMgdGhlIG91dHB1dCB0byBlbWl0IHRoZSBgQnV0dG9uRXZlbnRgXG4gICAqIEBwYXJhbSBLZXlib2FyZEV2ZW50IHwgTW91c2VFdmVudCBldmVudCBpcyB0aGUgc291cmNlIHRoYXQgdHJpZ2dlcmVkIHRoaXMgbWV0aG9kXG4gICAqIEBwYXJhbSBCdXR0b25FdmVudCBkYXRhVG9FbWl0IHBheWxvYWQgdG8gZW1pdFxuICAgKi9cbiAgcHJpdmF0ZSB0cmlnZ2VyT25Nb3VzZUFuZEtleWJvYXJkKGVtaXR0ZXI6IEV2ZW50RW1pdHRlcjxCdXR0b25FdmVudD4sIGV2ZW50OiBLZXlib2FyZEV2ZW50IHwgTW91c2VFdmVudCwgZGF0YVRvRW1pdDogQnV0dG9uRXZlbnQpIHtcbiAgICBpZiAoIWVtaXR0ZXIpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgVXBwZXJCdXR0b25zQ29tcG9uZW50IHVua25vd24gZW1pdHRlciBpbiB0cmlnZ2VyT25Nb3VzZUFuZEtleWJvYXJkYCk7XG4gICAgfVxuXG4gICAgY29uc3QgcmVzdWx0OiBudW1iZXIgPSBzdXBlci5oYW5kbGVJbWFnZUV2ZW50KGV2ZW50KTtcbiAgICBpZiAocmVzdWx0ID09PSBORVhUfgB7XG4gICAgICBlbWl0dGVyLmVtaXQoZGF0YVRvRW1pdCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFByaXZhdGUgbWV0aG9kIHRvIGFkZCBpZHMgdG8gdGhlIGFycmF5IG9mIGJ1dHRvbnMuXG4gICAqIEl0IGFkZHMgaWRzIGluIGEgcmV2ZXJzZSB3YXfgIHRvIGJlIHN1cmUgdGhhdCB0aGUgbGFzdCBidXR0b24gd2lsbCBhbHdheXMgaGF2ZSBpZCA9IDAuXG4gICAqIFRoaXMgaXMgcmVhbGx5IHVzZWZ1bCBpbiB1bml0IHRlc3RpbmcgdG8gYmUgc3VyZSB0aGF0IGNsb3NlIGJ1dHRvbiBhbHdheXMgaGF2ZSBpZCA9IDAsIGRvd25sb2FkIDEgYW5kIHNvIG9uLi4uXG4gICAqIEl0J3MgdG90YWxseSB0cmFuc3BhcmVudCB0byB0aGUgdXNlci5cbiAgICogQHBhcmFtIEJ1dHRvbkNvbmZpZ1tdIGJ1dHRvbnMgY29uZmlnIGFycmF5XG4gICAqIEByZXR1cm5zIEJ1dHRvbkNvbmZpZ1tdIHRoZSBpbnB1dCBhcnJheSB3aXRoIGluY3JlbWVudGFsIG51bWVyaWMgaWRzXG4gICAqL1xuICBwcml2YXRlIGFkZEJ1dHRvbklkcyhidXR0b25zOiBCdXR0b25Db25maWdbXSk6IEJ1dHRvbkNvbmZpZ1tdIHtcbiAgICByZXR1cm4gYnV0dG9ucy5tYXAoKHZhbDogQnV0dG9uQ29uZmlnLCBpOiBudW1iZXIpID0+IE9iamVjdC5hc3NpZ24odmFsLCB7IGlkOiBidXR0b25zLmxlbmd0aCAtIDEgLSBpIH0pKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQcml2YXRlIG1ldGhvZCB0byB2YWxpZGF0ZSBjdXN0b20gYnV0dG9ucyByZWNlaXZlZCBhcyBpbnB1dC5cbiAgICogQHBhcmFtIEJ1dHRvbkNvbmZpZ1tdIGJ1dHRvbnMgY29uZmlnIGFycmF5XG4gICAqIEByZXR1cm5zIEJ1dHRvbkNvbmZpZ1tdIHRoZSBzYW1lIGlucHV0IGJ1dHRvbnMgY29uZmlnIGFycmF5XG4gICAqIEB0aHJvd3MgYW4gZXJyb3IgaXMgZXhpc3RzIGEgYnV0dG9uIHdpdGggYW4gdW5rbm93biB0eXBlXG4gICAqL1xuICBwcml2YXRlIHZhbGlkYXRlQ3VzdG9tQnV0dG9ucyhidXR0b25zOiBCdXR0b25Db25maWdbXSA9IFtdKTogQnV0dG9uQ29uZmlnW10ge1xuICAgIGJ1dHRvbnMuZm9yRWFjaCgodmFsOiBCdXR0b25Db25maWcpID0+IHtcbiAgICAgIGNvbnN0IGluZGV4T2ZCdXR0b25UeXBlOiBudW1iZXIgPSBXSElURUxJU1RfQlVUVE9OX1RZUEVTLmZpbmRJbmRleCgodHlwZTogQnV0dG9uVHlwZSkgPT4gdHlwZSA9PT0gdmFsLnR5cGUpO1xuICAgICAgaWYgKGluZGV4T2ZCdXR0b25UeXBlID09PSAtMSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFVua25vd24gQnV0dG9uVHlwZS4gRm9yIGN1c3RvbSB0eXBlcyB1c2UgQnV0dG9uVHlwZS5DVVNUT01gKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gYnV0dG9ucztcbiAgfVxufVxuIl19