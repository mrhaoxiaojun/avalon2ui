/**
*  Created by hao on 2017.06
*  mail:haoxj@xinfushe.com
*/
require('./style.scss');
avalon.component('ms-select', {
    template: require("./template.html"),
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
            if (value[this.selectKey]) {
                // 对象赋值
                this.selectCurrennt = value[this.selectKey];
                avalon.vmodels[this.selectVm][this.selectValue] = value[this.selectKey];
            } else {
                // 数组赋值
                this.selectCurrennt = value;
                avalon.vmodels[this.selectVm][this.selectValue] = value;
            }
            if (avalon.vmodels[this.selectVm][this.selectChange]) {
                // 回调方法
                avalon.vmodels[this.selectVm][this.selectChange](value);
            }
        },
        blurEve: function () {
            var that = this;
            setTimeout(function () {
                that.selectDownShow = false;
            },300)
        }
    }
});
