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

    connectedCallback() {
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
                "gradient": "steelblue",
                "ledBars": true,
                "linearAmplitude": true,
                "linearBoost": 1.6,
                "lineWidth": 0,
                "loRes": false,
                "lumiBars": false,
                "maxDecibels": -25,
                "maxFPS": 0,
                "maxFreq": 20000,
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
                "reflexAlpha": "0.5",
                "reflexBright": "0.1",
                "reflexFit": true,
                "reflexRatio": 0.3,
                "roundBars": true,
                "showBgColor": true,
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
            navigator.mediaDevices
                .enumerateDevices()
                .then((devices) => {
                    devices.forEach((device) => {
                        console.log(`${device.kind}: ${device.label} id = ${device.deviceId}`);
                        //check if device label contains 'Pontus II 12th'
                        if (device.label.includes('Umik-1')) {
                            deviceID = device.deviceId;
                        }
                    });
                })
                .catch((err) => {
                    console.error(`${err.name}: ${err.message}`);
                });
        }

        let constraints = {audio: true};
        if (deviceID !== '') {
            console.log("Using deviceID = " + deviceID)
            constraints = {audio: {deviceId: deviceID}};
        }
        navigator.mediaDevices.getUserMedia(constraints)
            // navigator.mediaDevices.getUserMedia({audio: {deviceId: '22bff13b393ec65e125cf898cc0f05ffcb43577c6425474e1958c6d9b0ee02d0'}})
            .then(stream => {
                this.micStream = this.audioMotion.audioCtx.createMediaStreamSource(stream);
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
