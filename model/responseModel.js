class BaseModel{
    constructor(data,message){
         if(typeof data == 'string'){
             this.message =data;
             data=null;
         }
         this.data =data;
         if(message) {
             this.message = message;
         }
    }
}
class SuccessMode extends BaseModel{
    constructor(data,message){
        super(data,message);
        this.error=0;
    }
}
class ErrorMode extends BaseModel{
    constructor(data,message){
        super(data,message);
        this.error=1;
    }
}
module.exports={
    ErrorMode,SuccessMode
}
