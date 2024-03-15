import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';
import {MiniDSP} from "/data/minidsp.js";
import {Roon} from "../data/roon.js";

let plotBands = [{
    from: 0,
    to: 20,
    color: '#70221c',
    innerRadius: '100%',
    outerRadius: '105%'
}];

export class AudioStats extends LitElement {
    miniDSP = null;
    static properties = {
        lastEvent: {},
        input_levels: {type: Array},
        output_levels: {type: Array},
        master: {type: Object},
        zone: {type: Object}
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
        this.roon = new Roon();
        this.miniDSP = new MiniDSP();
        this.input_levels = [0, 0]
        this.output_levels = [0, 0, 0]
        this.master = {
            preset: 0,
            source: "-",
            volume: -120,
            mute: false,
            dirac: false
        }
        this.zone = undefined

        this.inputOptions = {
            chart: {
                type: 'gauge',
                plotBorderWidth: 1,
                plotBackgroundColor: {
                    linearGradient: {x1: 0, y1: 0, x2: 0, y2: 1},
                    stops: [
                        [0.0, '#0a3e83'],
                        [0.3, '#1466d1'],
                        [0.75, '#4993f3'],
                        [1, '#73a9f1'],
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
                tickColor: '#000000',
                minorTickColor: '#000000',
                labels: {
                    rotation: 'auto',
                    distance: 20
                },
                plotBands: plotBands,
                pane: 0,
                title: {
                    text: '<div style="color: black">dBFS<br/><span style="font-size:16px;" >Left</span></div>',
                    y: -40
                }
            }, {
                min: -120,
                max: 20,
                tickPixelInterval: 50,
                minorTickPosition: 'outside',
                tickPosition: 'outside',
                tickColor: '#000000',
                minorTickColor: '#000000',

                labels: {
                    rotation: 'auto',
                    distance: 20
                },
                plotBands: plotBands,
                pane: 1,
                title: {
                    text: '<div style="color: black">dBFS<br/><span style="font-size:16px;" >Right</span></div>',
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
                        [0.0, '#0a3e83'],
                        [0.3, '#1466d1'],
                        [0.75, '#4993f3'],
                        [1, '#73a9f1'],
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
                tickColor: '#000000',
                minorTickColor: '#000000',

                labels: {
                    rotation: 'auto',
                    distance: 20
                },
                plotBands: plotBands,
                pane: 0,
                title: {
                    text: '<div style="color: black">dBFS<br/><span style="font-size:16px;" >Left</span></div>',
                    y: -40
                }
            }, {
                min: -120,
                max: 20,
                tickPixelInterval: 50,
                minorTickPosition: 'outside',
                tickPosition: 'outside',
                tickColor: '#000000',
                minorTickColor: '#000000',

                labels: {
                    rotation: 'auto',
                    distance: 20
                },
                plotBands: plotBands,
                pane: 1,
                title: {
                    text: '<div style="color: black">dBFS<br/><span style="font-size:16px;" >Right</span></div>',
                    y: -40
                }
            }, {
                min: -120,
                max: 20,
                tickPixelInterval: 50,
                minorTickPosition: 'outside',
                tickPosition: 'outside',
                tickColor: '#000000',
                minorTickColor: '#000000',

                labels: {
                    rotation: 'auto',
                    distance: 20
                },
                plotBands: plotBands,
                pane: 2,
                title: {
                    text: '<div style="color: black">dBFS<br/><span style="font-size:16px;" >Subwoofer</span></div>',

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

            <as-roon zone="${JSON.stringify(this.zone)}"></as-roon>
            
            ${this.zone ? html`
                <sl-card style="padding-top: var(--sl-spacing-medium); width: 100%">
                    <div style="display: flex; align-items: center;font-size: var(--sl-font-size-large)">
                        <label style="font-size: var(--sl-font-size-x-large)">${this.zone.display_name}</label>
                        <sl-badge variant="${this.zone.state === "playing" ? "success" : "primary"}" style="padding-left: var(--sl-spacing-large)">${this.zone.state}</sl-badge>

                        <div style="flex: 1; padding-left: var(--sl-spacing-large)">
                            <div style="display: flex; flex-grow: 1; ">
                                <label style="flex: 1">${fancyTimeFormat(this.zone.now_playing.seek_position)}</label>
                                <label>${fancyTimeFormat(this.zone.now_playing.length)}</label>
                            </div>
                            <sl-progress-bar
                                    value=${(this.zone.now_playing.seek_position / this.zone.now_playing.length) * 100}
                                    style="--height: 6px; padding-top: 3px">
                            </sl-progress-bar>
                        </div>
                        <sl-badge variant="${this.master.dirac ? "success" : "neutral"}" style="padding-left: var(--sl-spacing-large)">Dirac</sl-badge>
                        <sl-badge variant="primary">Preset ${this.master.preset}</sl-badge>
                        <sl-badge variant="success" style="">${this.master.source}</sl-badge>
                        <sl-badge variant="${this.master.mute ? "success" : "neutral"}">mute</sl-badge>

                    </div>
                </sl-card>
            ` : html``}
            <div style="display: flex; flex-direction: row; align-items: end; padding-top: var(--sl-spacing-medium);">
                <sl-card style="flex: 1;font-size: var(--sl-font-size-large)">
                    <as-volume-meter style="padding-top: 20px" level=${this.master.volume}></as-volume-meter>
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
<!--            <div style="width: 100%; background-color: aqua">-->
            <div style="display: flex;">
                <as-audio-visualiser style="flex: 2"></as-audio-visualiser>
                <as-decibel-meter ></as-decibel-meter>
            </div>
        `;
    }


    connectedCallback() {
        super.connectedCallback()
        this.miniDSP.start((event) => {

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
        this.roon.start((event) => {
            const zones = JSON.parse(event.data);
            for (const property in zones) {
                const z = zones[property];
                if (z.display_name === "Pontus II 12th") {
                    this.zone = z;
                }
            }

        });

    }
}

customElements.define('as-audio-stats', AudioStats);

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
