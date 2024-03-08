import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';

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

let plotBands = [{
    from: 0,
    to: 20,
    color: '#C02316',
    innerRadius: '100%',
    outerRadius: '105%'
}];

export class AudioStats extends LitElement {
    static properties = {
        lastEvent: {},
        input_levels: {type: Array},
        output_levels: {type: Array},
        master: {type: Object},
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
        this.statsCapture = new StatsCapture();
        this.input_levels = [0, 0]
        this.output_levels = [0, 0, 0]
        this.master = {
            preset: 0,
            source: "-",
            volume: -120,
            mute: false,
            dirac: false
        }

        this.inputOptions = {
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
                height: '165px',
                width: 525,
                backgroundColor: 'var(--sl-panel-background-color)',
            },
            credits: {
                enabled: false
            },

            title: null,

            pane: [{
                startAngle: -45,
                endAngle: 45,
                background: null,
                center: [125, '145%'],
                size: 300
            }, {
                startAngle: -45,
                endAngle: 45,
                background: null,
                center: [375, '145%'],
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
        this.outputOptions = {
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
                backgroundColor: 'var(--sl-panel-background-color)',
                height: 165,
                width: 775,
            },
            credits: {
                enabled: false
            },

            title: null,

            pane: [{
                startAngle: -45,
                endAngle: 45,
                background: null,
                center: [125, '145%'],
                size: 300
            }, {
                startAngle: -45,
                endAngle: 45,
                background: null,
                center: [375, '145%'],
                size: 300
            }, {
                startAngle: -45,
                endAngle: 45,
                background: null,
                center: [625, '145%'],
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
                pane: 2,
                title: {
                    text: 'dBFS<br/><span style="font-size:16px">Subwoofer</span>',
                    y: -40
                }
            }],

            plotOptions: {
                gauge: {
                    dataLabels: {
                        enabled: false,
                        formatter: function () {
                            return strip(this.y);
                        },
                        style: {
                            fontSize: '16px'
                        }
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
            }, {
                name: 'Subwoofer',
                data: [-20],
                yAxis: 2
            }]
        }

    }

    render() {
        return html`

            <as-roon></as-roon>

            <div style="display: flex; flex-direction: row; align-items: end; padding-top: var(--sl-spacing-medium);">
                <sl-card style="flex: 1;font-size: var(--sl-font-size-large)">
                    <div style="display: flex">
                        <sl-badge variant="${this.master.dirac ? "success" : "neutral"}">Dirac</sl-badge>
                        <span style="flex:1;"></span>
                        <sl-badge variant="${this.master.mute ? "success" : "neutral"}">mute</sl-badge>
                    </div>
                    <as-volume-meter style="padding-top: 20px" level=${this.master.volume}></as-volume-meter>
                    <div style="display: flex">
                        <sl-badge variant="primary">Preset ${this.master.preset}</sl-badge>
                        <span style="flex:1;"></span>
                        <sl-badge variant="primary" style="">${this.master.source}</sl-badge>
                    </div>
                </sl-card>
                <sl-card class="card-header"
                         style="padding-left: var(--sl-spacing-medium);">
                    <div slot="header">
                        Input Levels (dBFS)
                    </div>
                    <as-vu-meter
                            levels=${JSON.stringify([
                                this.input_levels[1],
                                this.input_levels[0]
                            ])}

                            options=${JSON.stringify(this.inputOptions)}>
                    </as-vu-meter>
                </sl-card>
                <sl-card class="card-header"
                         style="padding-left: var(--sl-spacing-medium)">
                    <div slot="header">
                        Output Levels (dBFS)
                    </div>
                    <as-vu-meter
                            levels=${JSON.stringify([
                                this.output_levels[1],
                                this.output_levels[0],
                                this.output_levels[2]
                            ])}
                            options=${JSON.stringify(this.outputOptions)}>
                    </as-vu-meter>
                </sl-card>
            </div>

        `;
    }


    connectedCallback() {
        super.connectedCallback()
        this.statsCapture.start((event) => {
//  "master": {
//     "preset": 0,
//     "source": "Toslink",
//     "volume": -8,
//     "mute": false
//        "dirac": true
//   }

                this.lastEvent = JSON.parse(event.data)
                if (this.lastEvent.input_levels) {
                    this.input_levels = this.lastEvent.input_levels
                }
                if (this.lastEvent.output_levels) {
                    this.output_levels = this.lastEvent.output_levels
                }
                if ("volume" in this.lastEvent.master) {
                    this.master.volume = this.lastEvent.master.volume
                }
                if ("mute" in this.lastEvent.master) {
                    this.master.mute = this.lastEvent.master.mute
                }
                if ("dirac" in this.lastEvent.master) {
                    this.master.dirac = this.lastEvent.master.dirac
                }
                if ("preset" in this.lastEvent.master) {
                    this.master.preset = this.lastEvent.master.preset + 1
                }
                if ("source" in this.lastEvent.master) {
                    this.master.source = this.lastEvent.master.source
                }
            }
        )
    }
}

customElements.define('audio-stats', AudioStats);
