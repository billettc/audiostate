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
                "channelLayout": "single",
                "colorMode": "bar-level",
                "fftSize": 8192,
                "fillAlpha": 1,
                "frequencyScale": "log",
                "gradient": "prism",
                "ledBars": false,
                "linearAmplitude": true,
                "linearBoost": 1.6,
                "lineWidth": 0,
                "loRes": false,
                "lumiBars": false,
                "maxDecibels": -25,
                "maxFPS": 0,
                "maxFreq": 16000,
                "minDecibels": -85,
                "minFreq": 30,
                "mirror": 0,
                "mode": 1,
                "noteLabels": false,
                "outlineBars": false,
                "overlay": false,
                "peakLine": false,
                "radial": false,
                "radialInvert": false,
                "radius": 0.3,
                "reflexAlpha": "0.2",
                "reflexBright": "0.8",
                "reflexFit": true,
                "reflexRatio": 0.5,
                "roundBars": true,
                "showBgColor": false,
                "showFPS": false,
                "showPeaks": false,
                "showScaleX": false,
                "showScaleY": false,
                "smoothing": 0.7,
                "spinSpeed": 0,
                "splitGradient": false,
                "trueLeds": false,
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
