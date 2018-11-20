import { EventEmitter } from "events";

const ListStore = Object.assign({}, EventEmitter.prototype, {
  items: [],

  addNewItemHandler: text => {
    console.log("store中收到了dispatch的变化");
    // this.items.push(text);
    // console.log(this.items);
  }
});

export default ListStore;
