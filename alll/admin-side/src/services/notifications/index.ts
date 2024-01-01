import { toast } from "react-toastify";
import BaseEvent from "services/events";

export default class Notifications extends BaseEvent {
  constructor() {
    super();

    this.initSocket();
    this.getNotification();
  }

  initSocket() {
    // this.socket.on('login', function (data) {
    //     toast(`${data.data.displayName} login`, { type: "success" })
    // });
  }

  getNotification() {}
}
