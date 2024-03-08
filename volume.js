import {LitElement, html, css} from "https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js";

const gaugeOptions = {
    chart: {
        type: 'solidgauge',
        height: '150px',
        width: 240,
        backgroundColor: 'var(--sl-panel-background-color)',

    },

    title: null,

    pane: {
        center: ['50%', '55%'],
        size: '100%',
        startAngle: -135,
        endAngle: 135,
        background: {
            backgroundColor:
                Highcharts.defaultOptions.legend.backgroundColor || '#EEE',
            innerRadius: '60%',
            outerRadius: '100%',
            shape: 'arc'
        }
    },

    exporting: {
        enabled: false
    },

    tooltip: {
        enabled: false
    },

    // the value axis
    yAxis: {
        stops: [
            [0, '#55BF3B'], // green
        ],
        lineWidth: 0,
        tickWidth: 0,
        minorTickInterval: null,
        tickAmount: 2,
        title: {
            y: 30
        },
        labels: {
            y: 160
        }
    },

    plotOptions: {
        solidgauge: {
            dataLabels: {
                y: -30,
                borderWidth: 0,
                useHTML: true
            }
        }
    }
};

class VolumeMeter extends LitElement {
    chart = null;
    static properties = {
        level: {
            type: Number,
            hasChanged: (newValue, oldValue) => {
                return newValue !== oldValue;
            }
        }
    };

    constructor() {
        super();
        this.level = 0;
        // from -127.5 to 0
    }

    updated(changedProperties) {
        super.updated(changedProperties);

        // Check if the 'myProperty' has changed
        if (changedProperties.has('level')) {
            if (this.chart) {
                this.chart.series[0].points[0].update(this.level);
                this.chart.redraw();
            }``
        }
    }

    connectedCallback() {
        super.connectedCallback();
        this.chart = Highcharts.chart(this, Highcharts.merge(gaugeOptions, {
            credits: {
                enabled: false
            },

            yAxis: {
                min: -127.5,
                max: 0,
            },
            series: [{
                name: 'Volume',
                data: [1],
                dataLabels: {
                    format:
                        '<div style="text-align:center; color: var(--sl-color-neutral-700)">' +
                        '<span style="font-size:25px">{y:.1f}</span><br/>' +
                        '<span style="font-size:12px;opacity:0.4">' +
                        'Volume' +
                        '</span>' +
                        '</div>'
                },
                tooltip: {
                    valueSuffix: ' Volume'
                }
            }]

        }));
    }

    static get styles() {
        return css`
        `;
    }

    render() {
        return html`
            <slot></slot>
        `;
    }
}

customElements.define('as-volume-meter', VolumeMeter);
