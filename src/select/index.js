var vm = avalon.define({
    $id: 'ms-select-demo',
    data1: [
        {
            index: 1,
            name:"美女如云",
        },
        {
            index: 2,
            name:"亮瞎狗眼",
        }
    ],
    value1:"美女如云",
    data2: ["亲，在吗","我的快递我的快递我的快递"],
    value2: "", 
    value1Change: function (changeValue) {
        console.log(changeValue)
    },
    value1Change2: function (changeValue2) {
        console.log(changeValue2)
    },
    change: function () {
        var that = this;
        setTimeout(function () {
            that.data2=["动态1","动态02"]
       },3000)
    }
})
