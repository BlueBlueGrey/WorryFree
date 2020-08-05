export class MsgService {
    loginFlag = false;
    USERNAME ="";
    static instance;
    static getInstance(){
        if(!MsgService.instance){
            MsgService.instance = new MsgService();
        }
        return MsgService.instance;
    }
    constructor(){
        console.log("msg构造成功")
    }
    createNonceStr(){
        let chars = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
        let nums="";
        for(let i=0;i<16;i++){//这里是几位就要在这里不改变
        let id = parseInt((Math.random()*61).toString());
        nums+=chars[id];
        }
        return nums;
        }
}