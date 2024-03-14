import {LitElement, html, css} from "https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js";


class RoonState extends LitElement {
    static properties = {
        zone: {type: Object}
    };

    constructor(props) {
        super(props);
        this.zone = undefined
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


