export class Roon {
    static properties = {
        ws: {}
    }

    constructor() {
        this.ws = new WebSocket("ws://192.168.1.32:9060");
    }

    start(messageCallback) {
        this.ws.onmessage = function (e) {
            messageCallback(e);
        };
    }
}
