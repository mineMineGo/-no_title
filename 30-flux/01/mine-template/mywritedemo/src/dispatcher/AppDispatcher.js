import { Dispatcher } from "flux";

var AppDispatcher = new Dispatcher();

AppDispatcher.register(action => {
  switch (action.actionType) {
    case "ADD_NEW_ITEM":
      console.log("这里代表dispatcher收到了action中的触发");
      break;
    default:
      break;
  }
});

export default AppDispatcher;
