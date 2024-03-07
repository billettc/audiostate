import { LitElement, html, css } from "https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js";

class VuMeter extends LitElement {
    static properties = {
        options: {
            type: Object,
            // converter: {
            //     fromAttribute(value) {
            //         console.log('fromAttribute', value);
            //         let nv = JSON.parse(value);
            //         console.log('nv', nv);
            //         return nv
            //     },
            //     toAttribute(value) {
            //         return JSON.stringify(value);
            //     }
            // }
        },
    };

    constructor() {
        super();
        this.chart = null;
    }

    connectedCallback() {
        super.connectedCallback();
        console.log('connectedCallback', typeof this.options);
        this.chart = Highcharts.chart(this, this.options);
    }

    static styles = css`
    :host {
      display: block;
    }
  `;

    render() {
        return html`
            <h1>??????${JSON.stringify(this.options)}</h1>
            <slot></slot>
        `;
    }
}

customElements.define('vu-meter', VuMeter);
