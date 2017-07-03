var vm = avalon.define({
    $id: 'ms-dialog-demo',
    ModalName:'',
    send:function(name){
        this.ModalName = name;
    },
    sureDelete:function(){
        this.ModalName='';
    },
    closeModal:function(){
        this.ModalName='';
    }    
})
