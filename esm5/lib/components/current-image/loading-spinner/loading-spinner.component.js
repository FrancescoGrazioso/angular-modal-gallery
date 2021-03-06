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
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { LoadingType } from '../../../model/loading-config.interface';
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
export { LoadingSpinnerComponent };
if (false) {
    /**
     * Object of type `LoadingConfig` exposed to the template.
     * It contains a field to choose a loading spinner.
     * @type {?}
     */
    LoadingSpinnerComponent.prototype.loadingConfig;
    /**
     * Object of type `AccessibilityConfig` to init custom accessibility features.
     * For instance, it contains titles, alt texts, aria-labels and so on.
     * @type {?}
     */
    LoadingSpinnerComponent.prototype.accessibilityConfig;
    /**
     * Enum of type `LoadingType` to choose the standard loading spinner.
     * Declared here to be used inside the template.
     * @type {?}
     */
    LoadingSpinnerComponent.prototype.loadingStandard;
    /**
     * Enum of type `LoadingType` to choose the bars loading spinner.
     * Declared here to be used inside the template.
     * @type {?}
     */
    LoadingSpinnerComponent.prototype.loadingBars;
    /**
     * Enum of type `LoadingType` to choose the circular loading spinner.
     * Declared here to be used inside the template.
     * @type {?}
     */
    LoadingSpinnerComponent.prototype.loadingCircular;
    /**
     * Enum of type `LoadingType` to choose the dots loading spinner.
     * Declared here to be used inside the template.
     * @type {?}
     */
    LoadingSpinnerComponent.prototype.loadingDots;
    /**
     * Enum of type `LoadingType` to choose the cube flipping loading spinner.
     * Declared here to be used inside the template.
     * @type {?}
     */
    LoadingSpinnerComponent.prototype.loadingCubeFlipping;
    /**
     * Enum of type `LoadingType` to choose the circles loading spinner.
     * Declared here to be used inside the template.
     * @type {?}
     */
    LoadingSpinnerComponent.prototype.loadingCircles;
    /**
     * Enum of type `LoadingType` to choose the explosing squares loading spinner.
     * Declared here to be used inside the template.
     * @type {?}
     */
    LoadingSpinnerComponent.prototype.loadingExplosingSquares;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9hZGluZy1zcGlubmVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL21vZGFsLWFuZ3VsYXItZ2FsbGVyeS8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnRzL2N1cnJlbnQtaW1hZ2UvbG9hZGluZy1zcGlubmVyL2xvYWRpbmctc3Bpbm5lci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBd0JBLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRzFFLE9BQU8sRUFBaUIsV0FBVyxFQUFFLE1BQU0seUNBQXlDLENBQUM7Ozs7Ozs7Ozs7K0JBbUNwRCxXQUFXLENBQUMsUUFBUTs7Ozs7MkJBS3hCLFdBQVcsQ0FBQyxJQUFJOzs7OzsrQkFLWixXQUFXLENBQUMsUUFBUTs7Ozs7MkJBS3hCLFdBQVcsQ0FBQyxJQUFJOzs7OzttQ0FLUixXQUFXLENBQUMsYUFBYTs7Ozs7OEJBSzlCLFdBQVcsQ0FBQyxPQUFPOzs7Ozt1Q0FLVixXQUFXLENBQUMsaUJBQWlCOzs7Z0JBNURyRSxTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLG9CQUFvQjtvQkFVOUIsa3FEQUFtQztvQkFDbkMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O2lCQUNoRDs7O2dDQU1FLEtBQUs7c0NBS0wsS0FBSzs7a0NBeERSOztTQThDYSx1QkFBdUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuIFRoZSBNSVQgTGljZW5zZSAoTUlUKVxuXG4gQ29weXJpZ2h0IChjfgAyMDE3LTIwMTggU3RlZmFubyBDYXBwYSAoS3M4OSlcblxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbiBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuXG4gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsXG4gY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cblxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OIElORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEVcbiBTT0ZUV0FSRS5cbiAqL1xuXG5pbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBBY2Nlc3NpYmlsaXR5Q29uZmlnIH0gZnJvbSAnLi4vLi4vLi4vbW9kZWwvYWNjZXNzaWJpbGl0eS5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgTG9hZGluZ0NvbmZpZywgTG9hZGluZ1R5cGUgfSBmcm9tICcuLi8uLi8uLi9tb2RlbC9sb2FkaW5nLWNvbmZpZy5pbnRlcmZhY2UnO1xuXG4vKipcbiAqIENvbXBvbmVudCB3aXRoIHRoZSBsb2FkaW5nIHNwaW5uZXJcbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAna3MtbG9hZGluZy1zcGlubmVyJyxcbiAgc3R5bGVVcmxzOiBbXG4gICAgJ3N0eWxlLWxvYWRpbmctc3Bpbm5lci1zdGFuZGFyZC5jc3MnLFxuICAgICdzdHlsZS1sb2FkaW5nLXNwaW5uZXItZG90cy5jc3MnLFxuICAgICdzdHlsZS1sb2FkaW5nLXNwaW5uZXItYmFycy5jc3MnLFxuICAgICdzdHlsZS1sb2FkaW5nLXNwaW5uZXItY2lyY3VsYXIuY3NzJyxcbiAgICAnc3R5bGUtbG9hZGluZy1zcGlubmVyLWN1YmUtZmxpcHBpbmcuY3NzJyxcbiAgICAnc3R5bGUtbG9hZGluZy1zcGlubmVyLWNpcmNsZXMuY3NzJyxcbiAgICAnc3R5bGUtbG9hZGluZy1zcGlubmVyLWV4cGxvc2luZy1zcXVhcmVzLnNjc3MnXG4gIF0sXG4gIHRlbXBsYXRlVXJsOiAnbG9hZGluZy1zcGlubmVyLmh0bWwnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBMb2FkaW5nU3Bpbm5lckNvbXBvbmVudCB7XG4gIC8qKlxuICAgKiBPYmplY3Qgb2YgdHlwZSBgTG9hZGluZ0NvbmZpZ2AgZXhwb3NlZCB0byB0aGUgdGVtcGxhdGUuXG4gICAqIEl0IGNvbnRhaW5zIGEgZmllbGQgdG8gY2hvb3NlIGEgbG9hZGluZyBzcGlubmVyLlxuICAgKi9cbiAgQElucHV0KCkgbG9hZGluZ0NvbmZpZzogTG9hZGluZ0NvbmZpZztcbiAgLyoqXG4gICAqIE9iamVjdCBvZiB0eXBlIGBBY2Nlc3NpYmlsaXR5Q29uZmlnYCB0byBpbml0IGN1c3RvbSBhY2Nlc3NpYmlsaXR5IGZlYXR1cmVzLlxuICAgKiBGb3IgaW5zdGFuY2UsIGl0IGNvbnRhaW5zIHRpdGxlcywgYWx0IHRleHRzLCBhcmlhLWxhYmVscyBhbmQgc28gb24uXG4gICAqL1xuICBASW5wdXQofgBhY2Nlc3NpYmlsaXR5Q29uZmlnOiBBY2Nlc3NpYmlsaXR5Q29uZmlnO1xuXG4gIC8qKlxuICAgKiBFbnVtIG9mIHR5cGUgYExvYWRpbmdUeXBlYCB0byBjaG9vc2UgdGhlIHN0YW5kYXJkIGxvYWRpbmcgc3Bpbm5lci5cbiAgICogRGVjbGFyZWQgaGVyZSB0byBiZSB1c2VkIGluc2lkZSB0aGUgdGVtcGxhdGUuXG4gICAqL1xuICBsb2FkaW5nU3RhbmRhcmQ6IExvYWRpbmdUeXBlID0gTG9hZGluZ1R5cGUuU1RBTkRBUkQ7XG4gIC8qKlxuICAgKiBFbnVtIG9mIHR5cGUgYExvYWRpbmdUeXBlYCB0byBjaG9vc2UgdGhlIGJhcnMgbG9hZGluZyBzcGlubmVyLlxuICAgKiBEZWNsYXJlZCBoZXJlIHRvIGJlIHVzZWQgaW5zaWRlIHRoZSB0ZW1wbGF0ZS5cbiAgICovXG4gIGxvYWRpbmdCYXJzOiBMb2FkaW5nVHlwZSA9IExvYWRpbmdUeXBlLkJBUlM7XG4gIC8qKlxuICAgKiBFbnVtIG9mIHR5cGUgYExvYWRpbmdUeXBlYCB0byBjaG9vc2UgdGhlIGNpcmN1bGFyIGxvYWRpbmcgc3Bpbm5lci5cbiAgICogRGVjbGFyZWQgaGVyZSB0byBiZSB1c2VkIGluc2lkZSB0aGUgdGVtcGxhdGUuXG4gICAqL1xuICBsb2FkaW5nQ2lyY3VsYXI6IExvYWRpbmdUeXBlID0gTG9hZGluZ1R5cGUuQ0lSQ1VMQVI7XG4gIC8qKlxuICAgKiBFbnVtIG9mIHR5cGUgYExvYWRpbmdUeXBlYCB0byBjaG9vc2UgdGhlIGRvdHMgbG9hZGluZyBzcGlubmVyLlxuICAgKiBEZWNsYXJlZCBoZXJlIHRvIGJlIHVzZWQgaW5zaWRlIHRoZSB0ZW1wbGF0ZS5cbiAgICovXG4gIGxvYWRpbmdEb3RzOiBMb2FkaW5nVHlwZSA9IExvYWRpbmdUeXBlLkRPVFM7XG4gIC8qKlxuICAgKiBFbnVtIG9mIHR5cGUgYExvYWRpbmdUeXBlYCB0byBjaG9vc2UgdGhlIGN1YmUgZmxpcHBpbmcgbG9hZGluZyBzcGlubmVyLlxuICAgKiBEZWNsYXJlZCBoZXJlIHRvIGJlIHVzZWQgaW5zaWRlIHRoZSB0ZW1wbGF0ZS5cbiAgICovXG4gIGxvYWRpbmdDdWJlRmxpcHBpbmc6IExvYWRpbmdUeXBlID0gTG9hZGluZ1R5cGUuQ1VCRV9GTElQUElORztcbiAgLyoqXG4gICAqIEVudW0gb2YgdHlwZSBgTG9hZGluZ1R5cGVgIHRvIGNob29zZSB0aGUgY2lyY2xlcyBsb2FkaW5nIHNwaW5uZXIuXG4gICAqIERlY2xhcmVkIGhlcmUgdG8gYmUgdXNlZCBpbnNpZGUgdGhlIHRlbXBsYXRlLlxuICAgKi9cbiAgbG9hZGluZ0NpcmNsZXM6IExvYWRpbmdUeXBlID0gTG9hZGluZ1R5cGUuQ0lSQ0xFUztcbiAgLyoqXG4gICAqIEVudW0gb2YgdHlwZSBgTG9hZGluZ1R5cGVgIHRvIGNob29zZSB0aGUgZXhwbG9zaW5nIHNxdWFyZXMgbG9hZGluZyBzcGlubmVyLlxuICAgKiBEZWNsYXJlZCBoZXJlIHRvIGJlIHVzZWQgaW5zaWRlIHRoZSB0ZW1wbGF0ZS5cbiAgICovXG4gIGxvYWRpbmdFeHBsb3NpbmdTcXVhcmVzOiBMb2FkaW5nVHlwZSA9IExvYWRpbmdUeXBlLkVYUExPU0lOR19TUVVBUkVTO1xufVxuIl19