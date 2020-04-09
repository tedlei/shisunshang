
let Api = {
    init(){
        this.prototype.codeTime = Api.codeTime;
    },
    setItem(name,value){
        let type = typeof value;
        if(type==='object'&&!value){
            value = JSON.stringify(value);
        }
        localStorage.setItem(name,value);
    },
    getItem(name){
        return localStorage.getItem(name);
    },
    codeTime(itemNum,fn){
        if(fn&&this[itemNum]>0)return;
        let endItem = Api.getItem('endItem');
        let item = new Date().getTime();
        let num = 60;
        endItem = endItem?endItem:0;
        if(!fn) num = 0;
        if(item<endItem) num = Math.ceil((endItem - item)/1000);   
        if(num>=60) {
            Api.setItem('endItem',item+60000);
            fn();
        }
        let seti = setInterval(() => {
            this[itemNum] = num;
            if(num<=0) {
                clearInterval(seti);
            }
            num--;            
        }, 1000);
    }
}

export {Api}