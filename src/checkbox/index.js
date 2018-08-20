avalon.define({
    $id: 'ms-page-demo',
    dataList: [{
        disabled: true,
        value: "abc"
    }, {
        disabled: false,
        value: "b"
    }, {
        disabled: false,
        value: "c"
    }],
    ck_list: ["b"],
});



avalon.define({
    $id: 'ms-page-demo2',
    ck_list: []
})





avalon.define({
    $id: 'ms-page-demo3',
    dataList: [{
        disabled: true,
        value: "121"
    }, {
        disabled: true,
        value: "2"
    }, {
        disabled: false,
        value: "34"
    }, {
        disabled: false,
        value: "we"
    }],
    ck_all_fromer: [],
    ck_list: ['121',"34"],
    checkAll: function(checkAllStatus) {
        // 全选反选
        var that = this;
        this.dataList.forEach(function(ele, index, ary) {
            if (!ele.disabled) {
                if (!checkAllStatus) {
                    that.ck_all_fromer.push(ele.value)
                    avalon.Array.ensure(that.ck_list,ele.value)
                }
            }
        })
        if (checkAllStatus) {
            that.ck_all_fromer.forEach(function(e, i) {
                that.newCklist(e)
            })
            that.ck_all_fromer = [];
        }
    },
    checkSingle:function(){
    	// 有全选按钮情况下，判断点击子复选框，控制全选复选框状态（未完待续）
    	// var i=0;
    	// this.dataList.forEach(function(ele,index){
    	// 	if(!ele.disabled){
    	// 		i++
    	// 	}
    	// })
    	// if(this.dataList.length=i)
    },
    newCklist: function(item) {
        // 反选数组处理
        var that = this;
        this.ck_list.forEach(function(ele, index) {
            if (item == ele) {
                avalon.Array.remove(that.ck_list, item)
            }
        })
    }
});
