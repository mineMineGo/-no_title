import React, { PureComponent } from "react";
import MyButton from "./MyButton";
import ButtonAction from "../actions/ButtonAction";

class MyButtonController extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
  }

  createNewItem = () => {
    console.log("点击事件");
    ButtonAction.addNewItem("new item");
  };

  render() {
    const { items } = this.state;
    return <MyButton items={items} onClick={this.createNewItem} />;
  }
}
export default MyButtonController;
