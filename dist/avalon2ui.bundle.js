(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["avalon"] = factory();
	else
		root["avalon"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 19);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			memo[selector] = fn.call(this, selector);
		}

		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(18);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton) options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

/**
*  Created by hao on 2017.06
*  mail:haoxj@xinfushe.com
*/
__webpack_require__(10);
avalon.component('ms-checkbox', {
    template: __webpack_require__(14),
    defaults: {
        /**
         *  自定义checkbox
         *  只有ck_list为用户自定义数据，其他不可修改
         * @param {String} ck_vm 父级id 
         * @param {Array} ck_list 复选数组字符串（最终提交的数据列表，如果有全选按钮的话，请在提交时，将数组中的“all”去掉） 例：['1',' a2','3'] （由于avalon的缺点，所以我们数组项，必须为字符串类型）
         * @param {String} ck_value 复选数值
         * @param {Boolean} ck_isDisabled 是否可不用
         * @param {Boolean} ck_isChecked 是否选中
         * @param {Boolean} ck_selfCheck 自定义复选框，是否选中
         */
        ck_vm: '',
        ck_list: [],
        ck_value: '',
        ck_isDisabled: false,
        ck_isChecked: false,
        ck_selfCheck: false,
        onReady: function () {
            var that = this;
            avalon.vmodels[this.ck_vm].ck_list.forEach(function (item, index, ary) {
                if (item == that.ck_value) {
                    that.ck_isChecked = true;
                    that.ck_selfCheck = true;
                }
            })
        },
        onViewChange: function () {
            var that = this;
            that.ck_selfCheck = false;
            that.ck_isChecked = false;
            avalon.vmodels[this.ck_vm].ck_list.forEach(function (item, index, ary) {
                if (item == that.ck_value) {
                    that.ck_isChecked = true;
                    that.ck_selfCheck = true;
                }
            })
        },
        setCheckedList: function (e) {
            if (e.target.checked) {
                avalon.vmodels[this.ck_vm].ck_list.push(e.target.value);
            } else {
                avalon.vmodels[this.ck_vm].ck_list.forEach(function (item, index, ary) {
                    if (item == e.target.value) {
                        ary.splice(index, 1)
                    }
                })
            }
        },
        changeCheckBox: function (ck_value) {
            if (this.ck_isDisabled) return;

            if (ck_value == "all") {
                avalon.vmodels[this.ck_vm].checkAll(this.ck_selfCheck)
            } else {
                if (avalon.vmodels[this.ck_vm].hasOwnProperty("checkAll")) {
                    avalon.vmodels[this.ck_vm].checkSingle()
                }
            }
            this.ck_selfCheck = !this.ck_selfCheck;

            if (this.ck_selfCheck) {
                this.ck_isChecked = true;
                avalon.vmodels[this.ck_vm].ck_list.push(ck_value);
            } else {
                this.ck_isChecked = false;
                avalon.vmodels[this.ck_vm].ck_list.forEach(function (item, index, ary) {
                    if (item == ck_value) {
                        ary.splice(index, 1)
                    }
                })
            }
        }
    }
});


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

/**
*  Created by hao on 2017.06
*  mail:haoxj@xinfushe.com
*/
__webpack_require__(11);
avalon.component('ms-dialog', {
    template: __webpack_require__(15),
    defaults: {
        /**
         *  自定义 dialog
         * @param {String} modalVm 父级controller id 
         * @param {Number} modalw 自定义宽度
         * @param {Number} modalh 自定义高度
         * @param {String} modalSelfClass 自定义class
         * @param {String} 哪个类名的模态框显示
         * @param {Function} closeModal 关闭的回调函数
         */
        modalVm: "",
        modalw: 600,
        modalh: "",
        modalSelfClass: "",
        ModalName:"",
        closeModal: function () {
            avalon.vmodels[this.modalVm].ModalName = '';
        }
    }
});


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

/**
*  Created by hao on 2017.06
*  mail:haoxj@xinfushe.com
*/
__webpack_require__(12);
avalon.component('ms-pager', {
    template: __webpack_require__(16),
    defaults: {
        /**
        *  自定义 分页
        * @param {String} vm 父级controller id 
        * @param {Number} page 当前页
        * @param {Number} totalPage 总页数
        * @param {Number} jmpPage 跳转页
        */
        vm: "",
        page: 1,
        totalPage: 10,
        jmpPage: "",
        $computed: {
            pages: function () {
                var ary = [];
                //   <= 10
                //   =>  1 ,2 ,3 ,4,5,6,7,8,9 ,10 
                //     
                //   > 10  current  =1 || 2 || 3
                //   => 1,2,3, .......  20 ,21,22
                //    
                //   > 10  current > 3  && current < total - 3 
                //   => 1 ... 456 ... 20 21 22
                //   
                //    > 10  current > total - 3 
                //    => 123 .... 20 21 22
                //    
                if (this.totalPage <= 10) {
                    for (var i = 0; i < this.totalPage; i++) {
                        if (this.page == i + 1) {
                            ary.push({
                                page: i + 1,
                                current: true
                            });
                        } else {
                            ary.push({
                                page: i + 1,
                                current: false
                            });
                        }
                    }
                } else if (this.page <= 3) {

                    for (var i = 0; i < 3; i++) {

                        if (this.page == i + 1) {
                            ary.push({
                                page: i + 1,
                                current: true
                            });
                        } else {
                            ary.push({
                                page: i + 1,
                                current: false
                            });
                        }

                    }
                    ary.push({
                        page: '...',
                        tag: true
                    })
                    for (var i = this.totalPage - 3; i < this.totalPage; i++) {
                        ary.push({
                            page: i + 1,
                            current: false
                        });
                    }
                } else if (this.page > 3 && this.page <= this.totalPage - 3) {
                    ary.push({
                        page: 1,
                        current: false
                    });
                    ary.push({
                        page: '...',
                        tag: true
                    });
                    // 中间要显示几页
                    ary.push({
                        page: this.page - 1,
                        current: false
                    })
                    ary.push({
                        page: this.page,
                        current: true
                    })
                    ary.push({
                        page: this.page + 1,
                        current: false
                    })
                    ary.push({
                        page: '...',
                        tag: true
                    });
                    ary.push({
                        page: this.totalPage,
                        current: false
                    })
                } else {
                    for (let i = 0; i < 3; i++) {
                        ary.push({
                            page: i + 1,
                            current: false
                        });
                    }
                    ary.push({
                        page: '...',
                        tag: true
                    })
                    for (let i = this.totalPage - 3; i < this.totalPage; i++) {
                        if (this.page == i + 1) {
                            ary.push({
                                page: i + 1,
                                current: true
                            });
                        } else {
                            ary.push({
                                page: i + 1,
                                current: false
                            });
                        }
                    }
                }
                // console.log(ary)
                return ary
            }
        },
        next: function () {
            if (this.page == this.totalPage) {
                return false;
            }
            this.page = this.page + 1;
            avalon.vmodels[this.vm].pageConfig.page = this.page;
            avalon.vmodels[this.vm].pagerChange();
        },
        prev: function () {
            if (this.page == 1) {
                return false;
            }
            this.page = this.page - 1;
            avalon.vmodels[this.vm].pageConfig.page = this.page;
            avalon.vmodels[this.vm].pagerChange();
        },
        pageJmp: function (text, flag) {
            if (flag == "jmp") {
                let reg = /^\d+$/;
                if (reg.test(text)) {
                    if (Number(text) > this.totalPage) {
                        alert("请输入小于总页码的页数");
                        this.jmpPage = "";
                    } else {
                        this.page = Number(text);
                        avalon.vmodels[this.vm].pageConfig.page = this.page;
                        avalon.vmodels[this.vm].pagerChange();
                    }
                } else {
                    alert("请输入正确的页码！")
                }
                return false;
            }
            if (text !== "...") {
                this.page = Number(text);
                avalon.vmodels[this.vm].pageConfig.page = this.page;
                avalon.vmodels[this.vm].pagerChange();
            }
            return false;
        }
    }
});


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

/**
*  Created by hao on 2017.06
*  mail:haoxj@xinfushe.com
*/
__webpack_require__(13);
avalon.component('ms-select', {
    template: __webpack_require__(17),
    defaults: {
        /**
         *  自定义 select
         * @param {String} selectVm 父级controller id 
         * @param {Number} selectw 自定义宽度
         * @param {Number} selecth 自定义高度
         * @param {String} selectSelfClass 自定义class
         * @param {Array} selectData 需要渲染的数据，支持[1,2,3]和[{},{}]
         * @param {String} selectKey 传递过来的数据如果是对象数组，需要显示字段的key，来自于页面配置
         * @param {Boolean} selectDownShow 下拉显示隐藏
         * @param {String} selectValue 最终下拉框选中的值，存放在父级元素的哪个字段里，来自于页面配置
         * @param {String} selectCurrennt 最终下拉框选中的值,组件内部显示,也可以作为默认选项，在页面配置
         * @param {Function} selectMe 选中某一项后关闭下拉
         * @param {Function} selectChange 选中某一项后回调的方法名字
         */
        selectVm: "",
        selectw: 100,
        selecth: "",
        selectSelfClass: "",
        selectData: [],
        selectKey: '',
        selectDownShow: false,
        selectValue: "",
        selectCurrennt: '',
        selectChange:'',
        selectMe: function (value) {
            this.selectDownShow = false;
            this.selectCurrennt = value;
            avalon.vmodels[this.selectVm][this.selectValue] = value;
            if (avalon.vmodels[this.selectVm][this.selectChange]) {
                avalon.vmodels[this.selectVm][this.selectChange](value);
            }
        }
    }
});


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, ".ck-custom {\n  position: relative;\n  top: 0px;\n  left: 0px;\n  width: 50px;\n  height: 24px;\n  background: url(/assets/img/toggle-inactive2.png) no-repeat;\n  background-size: 50px;\n  display: inline-block; }\n  .ck-custom input {\n    display: none; }\n  .ck-custom.ck-checked::after {\n    content: \"\";\n    position: absolute;\n    top: 0;\n    left: 0px;\n    background: url(/assets/img/toggle-active.png) no-repeat;\n    width: 50px;\n    height: 24px;\n    background-size: 50px; }\n  .ck-custom.ck-disabled::after {\n    content: \"\";\n    position: absolute;\n    top: 0;\n    left: 0px;\n    background: url(/assets/img/toggle-inactive.png) no-repeat;\n    width: 50px;\n    height: 24px;\n    background-size: 50px; }\n  .ck-custom.ck-checked-disabled::after {\n    content: \"\";\n    position: absolute;\n    top: 0;\n    left: 0px;\n    background: url(/assets/img/toggle-active2.png) no-repeat;\n    width: 50px;\n    height: 24px;\n    background-size: 50px; }\n", ""]);

// exports


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, ".avalon2-modal {\n  display: none; }\n  .avalon2-modal .modal-mask {\n    position: fixed;\n    z-index: 9998;\n    top: 0;\n    left: 0;\n    bottom: 0;\n    right: 0;\n    /*width: 100%;\r\n        height: 100%;*/\n    background-color: rgba(0, 0, 0, 0.3);\n    display: block;\n    overflow-x: hidden;\n    overflow-y: auto; }\n  .avalon2-modal .modal-wrapper {\n    /*display: table-cell;*/\n    vertical-align: middle; }\n  .avalon2-modal .modal-container {\n    /*width: 300px;*/\n    position: relative;\n    margin: 60px auto;\n    padding: 24px 40px 40px;\n    background-color: #fff;\n    border-radius: 2px;\n    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);\n    font-family: Helvetica, Arial, sans-serif; }\n  .avalon2-modal .modal-header {\n    position: relative; }\n  .avalon2-modal .modal-header h1 {\n    font-size: 14px;\n    color: #101418; }\n  .avalon2-modal .modal-default-button {\n    float: right; }\n  .avalon2-modal .modal-enter,\n  .avalon2-modal .modal-leave-active {\n    opacity: 0; }\n  .avalon2-modal .modal-enter-active {\n    /*opacity: 1;*/\n    transition: opacity .5s ease; }\n  .avalon2-modal .modal-leave-active {\n    opacity: 0;\n    transition: opacity .5s ease .5s; }\n  .avalon2-modal .modal-close {\n    position: absolute;\n    top: 6px;\n    right: 8px;\n    cursor: pointer; }\n", ""]);

// exports


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, "@charset \"UTF-8\";\n/*分页*/\n.pageN {\n  margin: 24px;\n  margin-bottom: 0;\n  display: flex; }\n  .pageN .show-line {\n    color: #4F5C6A;\n    width: 120px; }\n    .pageN .show-line .user-ui-select {\n      min-width: 48px; }\n    .pageN .show-line .line-text {\n      position: relative;\n      top: 1px; }\n  .pageN .page-num {\n    flex: 1;\n    text-align: right; }\n    .pageN .page-num .turn, .pageN .page-num .page {\n      color: #4F5C6A; }\n    .pageN .page-num .page {\n      margin-left: 10px;\n      margin-right: 10px; }\n    .pageN .page-num .turn {\n      margin-left: 20px; }\n    .pageN .page-num .sure {\n      display: inline-block;\n      background: #F9F9FB;\n      border: 1px solid #F0F2F6;\n      border-radius: 2px;\n      height: 26px;\n      width: 57px;\n      line-height: 24px;\n      text-align: center;\n      color: #101418; }\n    .pageN .page-num .no-page {\n      background: #fff;\n      border: 1px solid #F0F2F6;\n      border-radius: 2px;\n      width: 48px;\n      height: 26px;\n      padding-left: 4px; }\n    .pageN .page-num li {\n      /*float: left;*/ }\n    .pageN .page-num .cur {\n      background: #738494;\n      color: #fff; }\n    .pageN .page-num .page-n, .pageN .page-num .page-left, .pageN .page-num .page-right {\n      width: 26px;\n      height: 26px;\n      text-align: center;\n      line-height: 24px;\n      border: 1px solid #F0F2F6;\n      border-left: 0;\n      cursor: pointer; }\n    .pageN .page-num .page-left {\n      border-left: 1px solid #F0F2F6; }\n    .pageN .page-num .page-left, .pageN .page-num .page-right {\n      background: #F9F9F9; }\n      .pageN .page-num .page-left img, .pageN .page-num .page-right img {\n        position: relative;\n        top: 2px; }\n", ""]);

// exports


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, ".avalon2-select {\n  display: inline-block;\n  width: 98px;\n  background: #FFFFFF;\n  color: #606068; }\n  .avalon2-select b {\n    display: block;\n    box-sizing: border-box;\n    font-weight: normal;\n    width: 98px;\n    padding-left: 8px;\n    height: 26px;\n    line-height: 26px;\n    border: 1px solid #EBEBEB;\n    border-radius: 1px;\n    cursor: pointer; }\n    .avalon2-select b i {\n      width: 26px;\n      height: 26px;\n      display: inline-block;\n      background: url(/assets/img/arrow.png) no-repeat 4px 5px;\n      background-size: 16px;\n      border-left: 1px solid #EBEBEB;\n      margin-left: 0; }\n  .avalon2-select ul {\n    display: none;\n    position: absolute;\n    background: #fff;\n    width: 98px;\n    max-height: 200px;\n    overflow: auto;\n    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);\n    border-radius: 1px;\n    margin-left: 1px;\n    z-index: 10; }\n    .avalon2-select ul li {\n      display: block;\n      width: 100%;\n      padding-left: 8px;\n      height: 30px;\n      line-height: 30px;\n      cursor: pointer; }\n      .avalon2-select ul li:hover {\n        background: #eee; }\n      .avalon2-select ul li.cur {\n        background: #eee; }\n", ""]);

// exports


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(6);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(1)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/sass-loader/lib/loader.js!./style.scss", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/sass-loader/lib/loader.js!./style.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(7);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(1)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/sass-loader/lib/loader.js!./style.scss", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/sass-loader/lib/loader.js!./style.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(8);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(1)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/sass-loader/lib/loader.js!./style.scss", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/sass-loader/lib/loader.js!./style.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(9);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(1)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/sass-loader/lib/loader.js!./style.scss", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/sass-loader/lib/loader.js!./style.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = "<span \r\n\t:class=\"['ck-custom', ( ck_isChecked ?  (ck_isDisabled ? 'ck-checked-disabled ': 'ck-checked')  :  (ck_isDisabled ? 'ck-disabled ': ''))]\" \r\n\t:click=\"changeCheckBox(ck_value)\">\r\n\t<input \r\n\ttype=\"checkbox\" \r\n\t:duplex=\"ck_list\" \r\n\t:attr=\"{\r\n\t\tvalue:ck_value,\r\n\t\tchecked:ck_isChecked,\r\n\t\tdisabled:ck_isDisabled\r\n\t\t}\" \r\n\tdata-duplex-changed=\"setCheckedList\">\r\n</span>";

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = "<div name=\"modal\" :class=\"['avalon2-modal ',modalSelfClass]\"  >\r\n    <div class=\"modal-mask\" >\r\n        <div class=\"modal-wrapper\">\r\n                <div class=\"modal-container\" ms-css=\"{width:modalw,height:modalh}\" >\r\n                     <img src=\"/assets/img/modal-close.png\" alt=\"\" width=\"16px\" class=\"modal-close\" :click=\"closeModal\">\r\n                    <div class=\"modal-header\">\r\n                        <slot name=\"header\"></slot>\r\n                    </div>\r\n                    <div class=\"modal-body\">\r\n                        <slot name=\"body\"></slot>\r\n                    </div>\r\n                    <div class=\"modal-footer\">\r\n                        <slot name=\"footer\"></slot>\r\n                    </div>\r\n                </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n";

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = "\r\n<ul class=\"page-num clearfix\">\r\n      <li class=\"page-left\" :click=\" prev \"><img src=\"/assets/img/arrow-up-2x.png\" alt=\"\" width=\"16px\" style=\"transform: rotate(-270deg);\" ></li>\r\n      <li  ms-for=\" (index , item ) in pages \"  :click= \" pageJmp(item.page) \"  :class=\" item.current ? 'page-n cur' : 'page-n' \"> {{ item.page }} </li>\r\n      <li class=\"page-right\" :click = \" next \"><img src=\"/assets/img/arrow-up-2x.png\" alt=\"\" width=\"16px\" style=\"transform: rotate(270deg);\"  ></li>\r\n      <li>\r\n         <span class=\"turn\">跳转至：</span>\r\n         <input type=\"text\" class=\"no-page\" ms-duplex=\"jmpPage\" >\r\n         <span class=\"page\">页</span>\r\n         <a href=\"javascript:;\" class=\"sure\" :click=\"pageJmp(jmpPage,'jmp')\">确定</a>\r\n     </li>\r\n</ul> ";

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = "<div :class=\"['avalon2-select',selectSelfClass]\" :css=\"{width:selectw}\">\r\n    <b :click=\"selectDownShow = !selectDownShow\" :css=\"{width:selectw,height:selecth}\">\r\n        {{selectCurrennt}}\r\n        <i class=\"pull-right\" :css=\"{height:selecth}\"></i>\r\n    </b>\r\n    <ul :visible=\"selectDownShow && selectKey\" :css=\"{width:selectw}\">\r\n        <li \r\n        :for=\"(index,elem) in selectData\" \r\n        :click=\"selectMe(elem[selectKey])\"\r\n        :class=\"[(elem[selectKey] == selectCurrennt ? 'cur' : '')]\"\r\n        >{{elem[selectKey]}}</li>\r\n    </ul>\r\n    <ul :visible=\"selectDownShow && !selectKey\" :css=\"{width:selectw}\">\r\n        <li \r\n        :for=\"(index,elem) in selectData\" \r\n        :click=\"selectMe(elem)\"\r\n        :class=\"[(elem == selectCurrennt ? 'cur' : '')]\"\r\n        >{{elem}}</li>\r\n    </ul>\r\n</div>\r\n";

/***/ }),
/* 18 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

/**
*  Created by hao on 2017.06
*  mail:haoxj@xinfushe.com
*  注：需要哪些组件，打包哪些即可
*/

// 分页组件
__webpack_require__(4);
// 复选框组件
__webpack_require__(2);
// 模态框组件
__webpack_require__(3);
// selet组件
__webpack_require__(5);
// 暴露avalon
module.exports = avalon;


/***/ })
/******/ ]);
});