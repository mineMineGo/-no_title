import React, { PureComponent } from "react";

class MyButton extends PureComponent {
  render() {
    const { onClick, items } = this.props;
    const itemHtml = items.map((item, index) => {
      return <li key={index}>{item}</li>;
    });
    console.log(this.context);
    return (
      <div>
        <ul>{itemHtml}</ul>
        <button onClick={onClick}>Add New Item</button>
      </div>
    );
  }
}
export default MyButton;
