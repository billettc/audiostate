import {LitElement, html, css} from "https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js";

export class RoonCapture {
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

class RoonState extends LitElement {
    static properties = {
        zone: {type: Object}
    };

    constructor(props) {
        super(props);
        this.ws = new RoonCapture();
        this.zone = undefined
    }

    connectedCallback() {
        super.connectedCallback()
        this.ws.start((event) => {
            const zones = JSON.parse(event.data);
            for (const property in zones) {
                const z = zones[property];
                if (z.display_name === "Pontus II 12th") {
                    this.zone = z;
                }
            }

        });
    }

    render() {
        if (this.zone) {
        return html`
            <div style="display: flex; flex-direction: row;">
                <sl-card class="card-image">
                    <img alt=""
                         src="http://192.168.1.32:9070/?image_key=${this.zone.now_playing.image_key}"
                         height="300px"
                         width="300px"/>
                </sl-card>
                <div style="display: flex; flex-direction: column; flex-grow: 1; padding-left: var(--sl-spacing-medium)">
                    <div style="display: flex; flex-direction: row; flex-grow: 1;">
                        <div style="display: flex; flex-direction: column; flex-grow: 1; padding-right: var(--sl-spacing-medium)">
                            <label style="padding-bottom:var(--sl-spacing-medium); font-size: var(--sl-font-size-2x-large); display: flex; flex-direction: row; align-items: center">
                                <b>${this.zone.now_playing.three_line.line1}</b>
                            </label>
                            <label style="padding-bottom:var(--sl-spacing-medium); font-size: var(--sl-font-size-large); display: flex; flex-direction: row; align-items: center">
                                On&nbsp;<b>"${this.zone.now_playing.three_line.line3}"</b>
                            </label>
                            <label style="padding-bottom:var(--sl-spacing-medium); font-size: var(--sl-font-size-large); display: flex; flex-direction: row; align-items: center">
                                Perform by&nbsp;<b>"${this.zone.now_playing.three_line.line2}"</b>
                            </label>
                        </div>
                        <sl-card>
                            ${this.zone.now_playing.artist_image_keys.length > 0?
                                    html`
                            <img alt="" style="object-fit: contain;" width="350px"
                                 src="http://192.168.1.32:9070/?image_key=${this.zone.now_playing.artist_image_keys[0]}"
                            />
                            `:html``}
                        </sl-card>
                    </div>

                    <sl-card style="padding-top: var(--sl-spacing-medium)">
                        <div style="display: flex; align-items: center">
                            <label style="font-size: var(--sl-font-size-x-large)">${this.zone.display_name}</label>
                            <sl-badge variant="${this.zone.state === "playing" ? "success" : "primary"}"
                                      style="padding-left: var(--sl-spacing-large);font-size: var(--sl-font-size-large)">${this.zone.state}
                            </sl-badge>
                            <div style="flex: 1; padding-left: var(--sl-spacing-large)">
                                <div style="display: flex; flex-grow: 1; ">
                                    <label style="flex: 1">${fancyTimeFormat(this.zone.now_playing.seek_position)}</label>
                                    <label>${fancyTimeFormat(this.zone.now_playing.length)}</label>
                                </div>
                                <sl-progress-bar 
                                        value=${(this.zone.now_playing.seek_position/this.zone.now_playing.length)*100} 
                                        style="--height: 6px; padding-top: 3px">
                                </sl-progress-bar>
                            </div>
                        </div>
                    </sl-card>
                </div>
            </div>
        `;
        }
        return html`
            <h1>Roon</h1>
        `;
    }
}

customElements.define('as-roon', RoonState);

function fancyTimeFormat(duration) {
    // Hours, minutes and seconds
    const hrs = ~~(duration / 3600);
    const mins = ~~((duration % 3600) / 60);
    const secs = ~~duration % 60;

    // Output like "1:01" or "4:03:59" or "123:03:59"
    let ret = "";

    if (hrs > 0) {
        ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }

    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;

    return ret;
}
