/**
*  Created by hao on 2017.06
*  mail:haoxj@xinfushe.com
*/
require('./style.scss');
avalon.component('ms-checkbox', {
    template: require("./template.html"),
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
