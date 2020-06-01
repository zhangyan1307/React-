import MyDdis from "./dispatch"
const action={
      add(obj){
          MyDdis.dispatch({
              type:"add",
              data:obj
          })
      },
      remove(i){
          MyDdis.dispatch({
              type:"del",
              data:i
          })
      }
}
export default action