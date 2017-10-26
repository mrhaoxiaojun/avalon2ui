/**
*  Created by hao on 2017.06
*  mail:haoxj@xinfushe.com
*/
require('./style.scss');
avalon.component('ms-pager', {
    template: require("./template.html"),
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
                    for (var i = 0; i < 3; i++) {
                        ary.push({
                            page: i + 1,
                            current: false
                        });
                    }
                    ary.push({
                        page: '...',
                        tag: true
                    })
                    for (var i = this.totalPage - 3; i < this.totalPage; i++) {
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
                var reg = /^\d+$/;
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
