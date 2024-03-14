import {LitElement, html, css} from "https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js";
import AudioMotionAnalyzer from 'https://cdn.skypack.dev/audiomotion-analyzer?min';

class AudioVisualiser extends LitElement {
    audioMotion
    isMute = false;
    micStream;

    constructor() {
        super();
    }

    static styles = css`
        :host {
            display: block;
            width: 100%;
            //height: 100%;
        }

        canvas {
            display: block;
            width: 100%;
        }
    `;

    toggleMute(status) {
        this.isMute = (status === undefined) ? !isMute : !!status;
        if (this.isMute) {
            this.audioMotion.disconnectOutput();
        } else {
            this.audioMotion.connectOutput();
        }
    }

    async connectedCallback() {
        super.connectedCallback();

        this.audioMotion = new AudioMotionAnalyzer(
            this,
            {
                source: this.shadowRoot.getElementById('audio'),
                "alphaBars": false,
                "ansiBands": false,
                "barSpace": 0.25,
                "bgAlpha": 0.7,
                "channelLayout": "dual-combined",
                "colorMode": "bar-level",
                "fftSize": 8192,
                "fillAlpha": "0.5",
                "frequencyScale": "log",
                "gradient": "rainbow",
                "ledBars": true,
                "linearAmplitude": false,
                "linearBoost": 2.6,
                "lineWidth": 1.5,
                "loRes": false,
                "lumiBars": false,
                "maxDecibels": 0,
                "maxFPS": 0,
                "maxFreq": 20000,
                "minDecibels": -120,
                "minFreq": 20,
                "mirror": 0,
                "mode": 1,
                "noteLabels": false,
                "outlineBars": false,
                "overlay": false,
                "peakLine": false,
                "radial": false,
                "radialInvert": false,
                "radius": 0.5,
                "reflexAlpha": "0.5",
                "reflexBright": "0.9",
                "reflexFit": true,
                "reflexRatio": 0,
                "roundBars": false,
                "showBgColor": true,
                "showFPS": false,
                "showPeaks": true,
                "showScaleX": true,
                "showScaleY": false,
                "smoothing": 0.7,
                "spinSpeed": 5,
                "splitGradient": false,
                "trueLeds": true,
                "useCanvas": true,
                "volume": 1,
                "weightingFilter": "D"

            }
        );

        let deviceID = ''
        if (!navigator.mediaDevices.enumerateDevices) {
            console.log("enumerateDevices() not supported.");
        } else {
            // List cameras and microphones.
            await navigator.mediaDevices
                .enumerateDevices()
                .then((devices) => {
                    devices.forEach((device) => {
                        console.log(`${device.kind}: ${device.label} id = ${device.deviceId}`);
                        //check if device label contains 'Pontus II 12th'
                        if (device.label === 'Umik-1  Gain: 18dB (2752:0007)') {
                            deviceID = device.deviceId;
                        }
                    });
                })
                .catch((err) => {
                    console.error(`${err.name}: ${err.message}`);
                });
        }

        let constrains = {audio: true};
        // if (deviceID !== '') {
        //     constrains = {audio: {deviceId: deviceID}}
        // }

        console.log('constrains', constrains);

        navigator.mediaDevices.getUserMedia(constrains)
            // navigator.mediaDevices.getUserMedia()
            .then(stream => {
                this.micStream = this.audioMotion.audioCtx.createMediaStreamSource(stream);
                console.log("Got microphone stream", this.micStream);
                this.toggleMute(true); // mute the speakers to avoid feedback loop from the microphone
                this.audioMotion.connectInput(this.micStream);
                this.audioMotion.start();
            })
            .catch(err => console.log('Error accessing user microphone.', err));
    }

    render() {
        return html`
            <slot></slot>
        `;
    }
}

customElements.define('as-audio-visualiser', AudioVisualiser);
