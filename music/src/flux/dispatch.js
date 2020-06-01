import {Dispatcher} from "flux"
import Store from "./Store"
let MyDdis=new Dispatcher()
MyDdis.register((action)=>{
       switch (action.type) {
           case "add":
               Store.pushList(action.data)
               break;
           case "del":
               Store.remove(action.data)
               break;
           default:
               break;
       }
})
export default MyDdis