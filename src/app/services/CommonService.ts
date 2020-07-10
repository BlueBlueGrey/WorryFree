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
}