export class MiniDSP {
    static properties = {
        ws: {}
    }

    constructor() {
        this.ws = new WebSocket("ws://192.168.1.32:5380/devices/0?levels=true");
    }

    start(messageCallback) {
        this.ws.onmessage = function (e) {
            messageCallback(e);
        };
    }
}
