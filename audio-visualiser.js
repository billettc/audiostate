import {LitElement, html, css} from "https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js";
import AudioMotionAnalyzer from 'https://cdn.skypack.dev/audiomotion-analyzer?min';

class AudioVisualiser extends LitElement {
    audioMotion
    isMute = false;
    micStream;

    constructor() {
        super();
    }

    toggleMute(status) {
        this.isMute = (status === undefined) ? !isMute : !!status;
        if (this.isMute){
            this.audioMotion.disconnectOutput();
        } else {
            this.audioMotion.connectOutput();
        }
    }

    connectedCallback()
    {
        super.connectedCallback();

        this.audioMotion = new AudioMotionAnalyzer(
            this,
            {
                source: this.shadowRoot.getElementById('audio')
            }
        );

        navigator.mediaDevices.getUserMedia({audio: true})
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
