import {EventEmitter} from "events"
const Store={
    list:[
        {uname:"爸爸",content:"卧榻"},
        {uname:"爷爷",content:"哈哈"}
    ],
    getList(){
        return this.list
    },
    pushList(data){
        this.list.push(data)
        this.emit()
    },
    remove(data){
        this.list.splice(data,1)
        this.emit()
    },
    addListener(callback){
        EventEmitter.prototype.on("change",callback)
    },
    emit(){
        EventEmitter.prototype.emit("change")
    }
}
export default Store