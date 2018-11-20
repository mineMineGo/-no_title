import AppDispatcher from "../dispatcher/AppDispatcher";

const ButtonActions = {
  addNewItem: text => {
    console.log("这里代表view触发了ACTION");
    AppDispatcher.dispatch({
      actionType: "ADD_NEW_ITEM",
      text: text
    });
  }
};
export default ButtonActions;
