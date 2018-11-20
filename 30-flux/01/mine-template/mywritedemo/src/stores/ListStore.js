import { EventEmitter } from "events";
import assign from "object-assign";

const ListStore = assign({}, EventEmitter.prototype, {
  items: [],

  addNewItemHandler: function(text) {
    console.log("store中收到了dispatch的变化");
    console.log(this.items);
    // this.items.push(text);
  }
});

export default ListStore;
