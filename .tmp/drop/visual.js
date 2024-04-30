var customSlicer23A808945D9E647CBACCF88D7E2CBB8A8_DEBUG;
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 305:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   M: () => (/* binding */ VisualSettings)
/* harmony export */ });
/* unused harmony export dataPointSettings */
/* harmony import */ var powerbi_visuals_utils_dataviewutils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(116);
/*
 *  Power BI Visualizations
 *
 *  Copyright (c) Microsoft Corporation
 *  All rights reserved.
 *  MIT License
 *
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the ""Software""), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 *
 *  The above copyright notice and this permission notice shall be included in
 *  all copies or substantial portions of the Software.
 *
 *  THE SOFTWARE IS PROVIDED *AS IS*, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 *  THE SOFTWARE.
 */


var DataViewObjectsParser = powerbi_visuals_utils_dataviewutils__WEBPACK_IMPORTED_MODULE_0__/* .DataViewObjectsParser */ .P;
class VisualSettings extends DataViewObjectsParser {
    constructor() {
        super(...arguments);
        this.dataPoint = new dataPointSettings();
    }
}
class dataPointSettings {
    constructor() {
        // Default color
        this.defaultColor = "";
        // Show all
        this.showAllDataPoints = true;
        // Fill
        this.fill = "";
        // Color saturation
        this.fillRule = "";
        // Text Size
        this.fontSize = 12;
    }
}


/***/ }),

/***/ 74:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   t: () => (/* binding */ transformData)
/* harmony export */ });
'user strict';
function transformData(options) {
    let data;
    try {
        const values = options.dataViews[0].categorical.categories[0].values;
        const queryName = options.dataViews[0].categorical.categories[0].source.queryName;
        const dotIx = queryName.indexOf('.');
        data = {
            values,
            table: queryName.substring(0, dotIx),
            column: queryName.substring(dotIx + 1)
        };
    }
    catch (error) {
        data = {
            values: [],
            table: "",
            column: ""
        };
    }
    return data;
}


/***/ }),

/***/ 336:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   b: () => (/* binding */ Visual)
/* harmony export */ });
/* harmony import */ var _settings__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(305);
/* harmony import */ var _transformdata__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(74);
/*
*  Power BI Visual CLI
*
*  Copyright (c) Microsoft Corporation
*  All rights reserved.
*  MIT License
*
*  Permission is hereby granted, free of charge, to any person obtaining a copy
*  of this software and associated documentation files (the ""Software""), to deal
*  in the Software without restriction, including without limitation the rights
*  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
*  copies of the Software, and to permit persons to whom the Software is
*  furnished to do so, subject to the following conditions:
*
*  The above copyright notice and this permission notice shall be included in
*  all copies or substantial portions of the Software.
*
*  THE SOFTWARE IS PROVIDED *AS IS*, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
*  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
*  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
*  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
*  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
*  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
*  THE SOFTWARE.
*/




class Visual {
    constructor(options) {
        console.log('Visual constructor', options);
        this.target = options.element;
        this.data = null;
        if (document) {
            this.container = document.createElement('div');
            this.container.classList.add('dropdown');
            this.select = document.createElement('div');
            this.select.classList.add('select');
            this.selectSpan = document.createElement('span');
            this.selectSpan.classList.add('selected');
            this.caret = document.createElement('div');
            this.caret.classList.add('caret');
            this.menu = document.createElement('ul');
            this.menu.classList.add('menu');
            this.container.appendChild(this.select);
            this.select.appendChild(this.selectSpan);
            this.select.appendChild(this.caret);
            this.container.appendChild(this.menu);
            this.target.appendChild(this.container);
        }
    }
    addItem(txt) {
        let slicerItem = document.createElement('li');
        // const items = document.querySelectorAll('.menu li') as NodeListOf<HTMLElement>
        slicerItem.innerText = txt;
        this.menu.appendChild(slicerItem);
    }
    update(options) {
        this.settings = Visual.parseSettings(options && options.dataViews && options.dataViews[0]);
        console.log('Visual update', options);
        this.data = (0,_transformdata__WEBPACK_IMPORTED_MODULE_1__/* .transformData */ .t)(options);
        console.log(this.data);
        // slicer items
        while (this.menu.firstChild) {
            this.menu.firstChild.remove();
        }
        this.addItem('All');
        for (let value of this.data.values) {
            this.addItem(value);
        }
        this.select.addEventListener('click', () => {
            this.select.classList.toggle('select-clicked');
            this.caret.classList.toggle('caret-rotate');
            this.menu.classList.toggle('menu-open');
        });
        const items = document.querySelectorAll('.menu li');
        items.forEach(item => {
            item.addEventListener('click', () => {
                console.log(item);
                this.selectSpan.innerText = item.innerText;
                this.selectSpan.classList.add('text-fade-in');
                setTimeout(() => {
                    this.selectSpan.classList.remove('text-fade-in');
                }, 300);
                this.select.classList.remove('select-clicked');
                this.caret.classList.remove('caret-rotate');
                this.menu.classList.remove('menu-open');
                items.forEach(item => {
                    item.classList.remove('active');
                });
                item.classList.add('active');
            });
        });
    }
    static parseSettings(dataView) {
        return _settings__WEBPACK_IMPORTED_MODULE_0__/* .VisualSettings */ .M.parse(dataView);
    }
    /**
     * This function gets called for each of the objects defined in the capabilities files and allows you to select which of the
     * objects and properties you want to expose to the users in the property pane.
     *
     */
    enumerateObjectInstances(options) {
        return _settings__WEBPACK_IMPORTED_MODULE_0__/* .VisualSettings */ .M.enumerateObjectInstances(this.settings || _settings__WEBPACK_IMPORTED_MODULE_0__/* .VisualSettings */ .M.getDefault(), options);
    }
}


/***/ }),

/***/ 888:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   _: () => (/* binding */ getValue)
/* harmony export */ });
/* unused harmony export getFillColorByPropertyName */
function getValue(object, propertyName, defaultValue) {
    if (!object) {
        return defaultValue;
    }
    let propertyValue = object[propertyName];
    if (propertyValue === undefined) {
        return defaultValue;
    }
    return propertyValue;
}
/** Gets the solid color from a fill property using only a propertyName */
function getFillColorByPropertyName(object, propertyName, defaultColor) {
    let value = getValue(object, propertyName);
    if (!value || !value.solid) {
        return defaultColor;
    }
    return value.solid.color;
}
//# sourceMappingURL=dataViewObject.js.map

/***/ }),

/***/ 271:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Bl: () => (/* binding */ getCommonValue)
/* harmony export */ });
/* unused harmony exports getValue, getObject, getFillColor */
/* harmony import */ var _dataViewObject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(888);

/** Gets the value of the given object/property pair. */
function getValue(objects, propertyId, defaultValue) {
    if (!objects) {
        return defaultValue;
    }
    return _dataViewObject__WEBPACK_IMPORTED_MODULE_0__/* .getValue */ ._(objects[propertyId.objectName], propertyId.propertyName, defaultValue);
}
/** Gets an object from objects. */
function getObject(objects, objectName, defaultValue) {
    if (objects && objects[objectName]) {
        return objects[objectName];
    }
    return defaultValue;
}
/** Gets the solid color from a fill property. */
function getFillColor(objects, propertyId, defaultColor) {
    const value = getValue(objects, propertyId);
    if (!value || !value.solid) {
        return defaultColor;
    }
    return value.solid.color;
}
function getCommonValue(objects, propertyId, defaultValue) {
    const value = getValue(objects, propertyId, defaultValue);
    if (value && value.solid) {
        return value.solid.color;
    }
    if (value === undefined
        || value === null
        || (typeof value === "object" && !value.solid)) {
        return defaultValue;
    }
    return value;
}
//# sourceMappingURL=dataViewObjects.js.map

/***/ }),

/***/ 116:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   P: () => (/* binding */ DataViewObjectsParser)
/* harmony export */ });
/* harmony import */ var _dataViewObjects__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(271);

class DataViewObjectsParser {
    static getDefault() {
        return new this();
    }
    static createPropertyIdentifier(objectName, propertyName) {
        return {
            objectName,
            propertyName
        };
    }
    static parse(dataView) {
        let dataViewObjectParser = this.getDefault(), properties;
        if (!dataView || !dataView.metadata || !dataView.metadata.objects) {
            return dataViewObjectParser;
        }
        properties = dataViewObjectParser.getProperties();
        for (let objectName in properties) {
            for (let propertyName in properties[objectName]) {
                const defaultValue = dataViewObjectParser[objectName][propertyName];
                dataViewObjectParser[objectName][propertyName] = _dataViewObjects__WEBPACK_IMPORTED_MODULE_0__/* .getCommonValue */ .Bl(dataView.metadata.objects, properties[objectName][propertyName], defaultValue);
            }
        }
        return dataViewObjectParser;
    }
    static isPropertyEnumerable(propertyName) {
        return !DataViewObjectsParser.InnumerablePropertyPrefix.test(propertyName);
    }
    static enumerateObjectInstances(dataViewObjectParser, options) {
        let dataViewProperties = dataViewObjectParser && dataViewObjectParser[options.objectName];
        if (!dataViewProperties) {
            return [];
        }
        let instance = {
            objectName: options.objectName,
            selector: null,
            properties: {}
        };
        for (let key in dataViewProperties) {
            if (dataViewProperties.hasOwnProperty(key)) {
                instance.properties[key] = dataViewProperties[key];
            }
        }
        return {
            instances: [instance]
        };
    }
    getProperties() {
        let properties = {}, objectNames = Object.keys(this);
        objectNames.forEach((objectName) => {
            if (DataViewObjectsParser.isPropertyEnumerable(objectName)) {
                let propertyNames = Object.keys(this[objectName]);
                properties[objectName] = {};
                propertyNames.forEach((propertyName) => {
                    if (DataViewObjectsParser.isPropertyEnumerable(objectName)) {
                        properties[objectName][propertyName] =
                            DataViewObjectsParser.createPropertyIdentifier(objectName, propertyName);
                    }
                });
            }
        });
        return properties;
    }
}
DataViewObjectsParser.InnumerablePropertyPrefix = /^_/;
//# sourceMappingURL=dataViewObjectsParser.js.map

/***/ }),

/***/ 327:
/***/ ((module) => {

module.exports = Function('return this')();

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _src_visual__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(336);
/* provided dependency */ var window = __webpack_require__(327);

var powerbiKey = "powerbi";
var powerbi = window[powerbiKey];
var customSlicer23A808945D9E647CBACCF88D7E2CBB8A8_DEBUG = {
    name: 'customSlicer23A808945D9E647CBACCF88D7E2CBB8A8_DEBUG',
    displayName: 'customSlicer2',
    class: 'Visual',
    apiVersion: '4.7.0',
    create: (options) => {
        if (_src_visual__WEBPACK_IMPORTED_MODULE_0__/* .Visual */ .b) {
            return new _src_visual__WEBPACK_IMPORTED_MODULE_0__/* .Visual */ .b(options);
        }
        throw 'Visual instance not found';
    },
    createModalDialog: (dialogId, options, initialState) => {
        const dialogRegistry = globalThis.dialogRegistry;
        if (dialogId in dialogRegistry) {
            new dialogRegistry[dialogId](options, initialState);
        }
    },
    custom: true
};
if (typeof powerbi !== "undefined") {
    powerbi.visuals = powerbi.visuals || {};
    powerbi.visuals.plugins = powerbi.visuals.plugins || {};
    powerbi.visuals.plugins["customSlicer23A808945D9E647CBACCF88D7E2CBB8A8_DEBUG"] = customSlicer23A808945D9E647CBACCF88D7E2CBB8A8_DEBUG;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (customSlicer23A808945D9E647CBACCF88D7E2CBB8A8_DEBUG);

})();

customSlicer23A808945D9E647CBACCF88D7E2CBB8A8_DEBUG = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=https://localhost:8080/assets/visual.js.map