import {LitElement, html, css} from "https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js";

class Values {
    volume = -0xc8;
    momentaryLoudness = -0xc8;
    shortTermLoudness = -0xc8;
    integratedLoudness = -0xc8;
    volumeMax = -0xc8;
    momentaryLoudnessMax = -0xc8;
    shortTermLoudnessMax = -0xc8;
    volumeAveraged = -0xc8;

    constructor() {
        this.reset()
    }

    reset() {
        this.volume = -0xc8;
        this.momentaryLoudness = -0xc8;
        this.shortTermLoudness = -0xc8;
        this.integratedLoudness = -0xc8;
        this.volumeMax = -0xc8;
        this.momentaryLoudnessMax = -0xc8;
        this.shortTermLoudnessMax = -0xc8;
        this.volumeAveraged = -0xc8;
    }

}

const values = new Values();

class DecibelMeter extends LitElement {
    static properties = {
        volume: {type: Number},
        volumeMax: {type: Number},
        volumeAveraged: {type: Number},
    }

    constructor() {
        super();
        this.volume = -0xc8;
    }

    static get styles() {
        return css`
            .rockiot-ui {
                width: 100%;
            }
            .rockiot-ui-control {
                display: none;
            }
            .rockiot-wrapper-title{
                display: none;
            }
            .rockiot-gauge-linear-vertical-output{
                display: none;
            }
        `;
    }
    connectedCallback() {
        super.connectedCallback();
        const constraints = {audio: true};

        var o = {};
        o.googEchoCancellation = 'false';
        o.googAutoGainControl = 'false';
        o.googNoiseSuppression = 'false';
        o.googHighpassFilter = 'false';
        var p = {};
        p.mandatory = o;
        p.optional = [];
        var r = {};
        r.audio = p;

        navigator.mediaDevices.getUserMedia(r)
            .then(stream => {
                this.volume = 66;
                audioContext = new AudioContext();
                const source = audioContext.createMediaStreamSource(stream);
                this.gotStream(stream);
                setInterval(this.updateValues.bind(this), 100);
            })
            .catch(err => {
                console.error('getUserMedia error:', err);
            });
    }

    updateValues() {
        this.volume = values.volume + 130;
        this.volumeMax = values.volumeMax + 130;
        this.volumeAveraged = values.volumeAveraged + 130;
    }
    render() {

        return html`
            
            <rockiot-ui
                    id="linear_1"
                    type="gauge"
                    variation="linear"
                    orientation="vertical"
                    serial="linear_1"
                    value="${this.volume}"
                    units="dB(A)"
                    min="0"
                    max="100"
                    precision="2"
                    animation="100"
                    svgwidth="500"
                    svgheight="500"
                    text-color="#bababa"
                    value-color="#777"
                    value-bg="transparent"
                    value-border="0px solid #fac83c"
                    control-color="#888"
                    control-bg="none"
                    auto-test="1"
                    orientation="horizontal"
                    size="md"
                    scale="10"
                    smallscale="2"
                    ticks="10"
                    needle="1"
                    bar-color="#111"
                    progress-color="#4ea5f1"
                    scale-color="#aaa"
                    scale-text-color="#bababa"
                    needle-color="#ff0000"
                    needle-stroke="#000"

                    settings="0"
            ></rockiot-ui>        `;
    }

    createAudioMeter(cj) {
        envelopeObject = new MovingAverage();
        loudnessObject = new Loudness(0x6);
        averageVolumeObject = new AverageContinuous();
        integratedObject = new Integrated();
        maxVolumeObject = new HoldMax();
        maxMomentaryObject = new HoldMax();
        maxShortObject = new HoldMax();
        fileProgress = new Array();
        aWeightFilerArray = new Array();
        for (var cl = 0x0; cl < 0x6; cl++) {
            aWeightFilerArray.push(new AWeightFilter());
        }
        var cm;
        cm = cj.createScriptProcessor(0x100);
        cm.onaudioprocess = function (event) {

            if (pauseMeasurements) return;
            var cu = new Array();
            var cv;
            var cw;
            cv = event.inputBuffer['numberOfChannels'];
            cw = event.inputBuffer['sampleRate'];
            for (var cx = 0x0; cx < cv; cx++) {
                cu.push(event.inputBuffer['getChannelData'](cx));
            }
            var cy = cu[0x0].length;
            for (var cx = 0x0; cx < cy; cx++) {
                var cA = 0x0;
                for (var cB = 0x0; cB < cv; cB++) {
                    cA = aWeightFilerArray[cB].perform_aweighting(cu[cB][cx]);
                    cA = Math.max(cA, Math.abs(cA));
                }
                envelopeObject.setup_moving_average_no_reset(0x190, audioContext.sampleRate);
                var cC = envelopeObject.average(cA);
                var cD;
                var cE;
                loudnessObject.calculate(cu, cx, cv, cw);
                cD = loudnessObject.get_momentary();
                cE = loudnessObject.get_short_term();
                if (RefreshCount % RefreshRate === 0x0) {
                    values.volume = volumeToDb(cC);
                    values.momentaryLoudness = volumeToLUFS(cD);
                    values.shortTermLoudness = volumeToLUFS(cE);
                    values.volumeMax = maxVolumeObject.hold(values.volume);
                    values.momentaryLoudnessMax = maxMomentaryObject.hold(values.momentaryLoudness);
                    values.shortTermLoudnessMax = maxShortObject.hold(values.shortTermLoudness);
                    if (values.momentaryLoudness > -0x46) {
                        values.integratedLoudness = integratedObject.get_integrated(cD);
                    }
                    values.volumeAveraged = averageVolumeObject.average(values.volume);
                }
                RefreshCount++;
            }
        };
        loudnessObject.set_samplerate(cj.sampleRate);
        for (var cl = 0x0; cl < 0x6; cl++) {
            aWeightFilerArray[cl].setup_aweight_filter(cj.sampleRate);
        }
        RefreshRate = msToSamples(16.666667, cj.sampleRate);
        values.volume = -0xc8;
        values.momentaryLoudness = -0xc8;
        values.shortTermLoudness = -0xc8;
        values.integratedLoudness = -0xc8;
        values.volumeMax = -0xc8;
        values.momentaryLoudnessMax = -0xc8;
        values.shortTermLoudnessMax = -0xc8;
        values.volumeAveraged = -0xc8;
        values.integratedLoudness = -0xc8;
        cm.connect(cj.destination);
        cm.shutdown = function () {
            this.disconnect();
            this.onaudioprocess = null;
        };
        return cm;
    }

    gotStream(t) {
        mediaStreamSource = audioContext.createMediaStreamSource(t);
        var u = this.createAudioMeter(audioContext, ![]);
        mediaStreamSource.connect(u);
    }
}

customElements.define('as-decibel-meter', DecibelMeter);

function calculateAverage(array) {
    let sum = 0;
    for (let i = 0; i < array.length; i++) {
        let v = array[i];
        sum += v;
    }
    return sum / array.length;
}

function calculateRMS(audioData) {
    const sumOfSquares = audioData.reduce((acc, value) => acc + value ** 2, 0);
    const meanSquare = sumOfSquares / audioData.length;
    const rms = Math.sqrt(meanSquare);

    return rms;
}

// Function to convert RMS to decibels
function rmsToDecibels(rms) {
    if (typeof rms !== 'number' || rms <= 0) {
        throw new Error('Input must be a positive number');
    }

    const decibels = 20 * Math.log10(rms);

    return decibels;
}

function rmsTo_dBA(rms, correctionFactor) {
    if (typeof rms !== 'number') {
        throw new Error('Input must be a number');
    }

    // Convert RMS to dB and then apply A-weighting correction factor
    const dB = 20 * Math.log10(rms);
    const dBA = dB + correctionFactor;

    return dBA;
}
