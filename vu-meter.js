import { LitElement, html, css } from "https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js";
class VuMeter extends LitElement {
    chart = null;
    static properties = {
        options: {
            type: Object,
        },
        levels: {
            type: Array,
        }
    };

    static get styles() {
        return css`
        `;
    }


    constructor() {
        super();
        this.chart = null;
    }

    updated(changedProperties) {
        super.updated(changedProperties);

        // Check if the 'myProperty' has changed
        if (changedProperties.has('levels')) {
            if (this.chart) {
                if (this.levels) {
                    for (let i = 0; i < this.levels.length; i++) {
                        this.chart.series[i].points[0].update(this.levels[i]);
                    }
                    this.chart.redraw();
                }
            }
        }
    }

    connectedCallback() {
        super.connectedCallback();
        this.chart = Highcharts.chart(this, this.options);
    }

    render() {
        return html`
            <slot></slot>
        `;
    }
}

customElements.define('as-vu-meter', VuMeter);
