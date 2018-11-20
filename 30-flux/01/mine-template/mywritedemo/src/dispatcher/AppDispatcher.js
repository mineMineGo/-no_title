import { Dispatcher } from "flux";
import ListStore from "../stores/ListStore";
var AppDispatcher = new Dispatcher();

AppDispatcher.register(action => {
  switch (action.actionType) {
    case "ADD_NEW_ITEM":
      console.log("这里代表dispatcher收到了action中的触发");
      ListStore.addNewItemHandler(action.text);
      ListStore.emitChange();
      break;
    default:
      break;
  }
});

export default AppDispatcher;
