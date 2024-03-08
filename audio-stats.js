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
            mute: false
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
                height: 200,
                backgroundColor: 'var(--sl-color-neutral-100)',
            },
            credits: {
                enabled: false
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
                backgroundColor: 'var(--sl-color-neutral-100)',
                height: 200,
            },
            credits: {
                enabled: false
            },

            title: {
                text: 'Output Channels Levels',
                style: {color: 'var(--sl-color-neutral-700)'}
            },

            pane: [{
                startAngle: -45,
                endAngle: 45,
                background: null,
                center: ['20%', '145%'],
                size: 300
            }, {
                startAngle: -45,
                endAngle: 45,
                background: null,
                center: ['50%', '145%'],
                size: 300
            }, {
                startAngle: -45,
                endAngle: 45,
                background: null,
                center: ['80%', '145%'],
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


    // Render the UI as a function of component state
    render() {
        return html`

            <as-roon></as-roon>
            
            <sl-divider></sl-divider>
            <as-volume-meter level=${this.master.volume}></as-volume-meter>
            <sl-divider></sl-divider>
            
            <div style="display: flex; flex: 1; flex-direction: row; align-items: end;">
                <as-vu-meter
                        levels=${JSON.stringify([
                            this.input_levels[1],
                            this.input_levels[0]
                        ])}
                        style="flex: 1.25"
                        options=${JSON.stringify(this.inputOptions)}>
                </as-vu-meter>
                <as-vu-meter
                        levels=${JSON.stringify([
                            this.output_levels[1],
                            this.output_levels[0],
                            this.output_levels[2]
                        ])}
                        style="flex: 2"
                        options=${JSON.stringify(this.outputOptions)}>
                </as-vu-meter>
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
//   }

                this.lastEvent = JSON.parse(event.data)
                if (this.lastEvent.input_levels) {
                    this.input_levels = this.lastEvent.input_levels
                }
                if (this.lastEvent.output_levels) {
                    this.output_levels = this.lastEvent.output_levels
                }
                if (this.lastEvent.master.volume) {
                    this.master = this.lastEvent.master
                }

            }
        )
    }
}

customElements.define('audio-stats', AudioStats);
