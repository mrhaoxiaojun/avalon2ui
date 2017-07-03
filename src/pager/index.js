var vm = avalon.define({
    $id: 'ms-page-demo',
    showLine:10,
    options:[10,20,30],
    pageConfig: {
        vm:"ms-page-demo",
        page: 1,
        totalPage: 20,
        jmpPage:'',
    },
    pagerChange:function(){
    	console.log(this.pageConfig.page)
    }
})
