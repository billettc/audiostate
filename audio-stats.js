import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';
import {} from './shoelace/shoelace-autoloader.js'

export class StatsCapture {
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

export class AudioStats extends LitElement {
    static properties = {
        name: {},
        op: {},
        lastEvent: {},
        statsCapture: {type: StatsCapture},

    };
    // Define scoped styles right with your component, in plain CSS
    static styles = css`
        :host {
            //color: blue;
        }
    `;

    constructor() {
        super();
        // Declare reactive properties
        this.name = 'World';
        this.lastEvent = 'patate';
        this.statsCapture = new StatsCapture();

        this.op = {
            chart: {
                type: 'gauge',
                plotBorderWidth: 1,
                plotBackgroundColor: {
                    linearGradient: {x1: 0, y1: 0, x2: 0, y2: 1},
                    stops: [
                        [0, '#FFF4C6'],
                        [0.3, '#FFFFFF'],
                        [1, '#FFF4C6']
                    ]
                },
                plotBackgroundImage: null,
                height: 200,

            },

            title: {
                text: 'Input Channels Levels',
                style: {color: 'var(--sl-color-neutral-700)'}
            },

            pane: [{
                startAngle: -45,
                endAngle: 45,
                background: null,
                center: ['25%', '145%'],
                size: 300
            }, {
                startAngle: -45,
                endAngle: 45,
                background: null,
                center: ['75%', '145%'],
                size: 300
            }],

            exporting: {
                enabled: false
            },

            tooltip: {
                enabled: false
            },

            yAxis: [{
                min: -120,
                max: 20,
                tickPixelInterval: 50,
                minorTickPosition: 'outside',
                tickPosition: 'outside',
                labels: {
                    rotation: 'auto',
                    distance: 20
                },
                plotBands: plotBands,
                pane: 0,
                title: {
                    text: 'dBFS<br/><span style="font-size:16px">Left</span>',
                    y: -40
                }
            }, {
                min: -120,
                max: 20,
                tickPixelInterval: 50,
                minorTickPosition: 'outside',
                tickPosition: 'outside',
                labels: {
                    rotation: 'auto',
                    distance: 20
                },
                plotBands: plotBands,
                pane: 1,
                title: {
                    text: 'dBFS<br/><span style="font-size:16px">Right</span>',
                    y: -40
                }
            }],

            plotOptions: {
                gauge: {
                    dataLabels: {
                        enabled: false
                    },
                    dial: {
                        radius: '100%'
                    }
                }
            },

            series: [{
                name: 'Left',
                data: [-20],
                yAxis: 0
            }, {
                name: 'Right',
                data: [-20],
                yAxis: 1
            }]
        }

    }


    // Render the UI as a function of component state
    render() {
        console.log('render', typeof this.op, JSON.stringify(this.op))
        return html`
        <vu-meter options=${JSON.stringify(this.op)}></vu-meter>
        <label>${JSON.stringify(this.lastEvent)}</label>
        `;
    }


    connectedCallback() {
        super.connectedCallback()
        this.statsCapture.start((e) => {
                this.lastEvent = JSON.parse(e.data)

                if (inputChart.series) { // the chart may be destroyed

                    const left = inputChart.series[0].points[0]
                    const right = inputChart.series[1].points[0]

                    left.update(this.lastEvent.input_levels[1], false);
                    right.update(this.lastEvent.input_levels[0], false);
                    inputChart.redraw();
                }
                if (outputChart.series) { // the chart may be destroyed

                    const left = outputChart.series[0].points[0]
                    const right = outputChart.series[1].points[0]
                    const sub = outputChart.series[2].points[0]

                    left.update(this.lastEvent.output_levels[1], false);
                    right.update(this.lastEvent.output_levels[0], false);
                    sub.update(this.lastEvent.output_levels[2], false);
                    outputChart.redraw();
                }
            }
        )
    }
}

customElements
    .define(
        'audio-stats'
        ,
        AudioStats
    )
;
