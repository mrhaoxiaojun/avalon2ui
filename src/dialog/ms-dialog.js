/**
*  Created by hao on 2017.06
*  mail:haoxj@xinfushe.com
*/
require('./style.scss');
avalon.component('ms-dialog', {
    template: require("./template.html"),
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
