let inputChart;
let outputChart;
let plotBands = [{
    from: 0,
    to: 20,
    color: '#C02316',
    innerRadius: '100%',
    outerRadius: '105%'
}]
;
document.addEventListener('DOMContentLoaded', function () {
    inputChart = Highcharts.chart('container', {
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
        },
    );

    outputChart = Highcharts.chart('container2', {
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
                // width: 900,
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
                plotBands: [{
                    from: 0,
                    to: 10,
                    color: '#C02316',
                    innerRadius: '100%',
                    outerRadius: '105%'
                }],
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
                max: 10,
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
                        style:{
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
        },
    );
});

function strip(number) {
    return (parseFloat(number).toPrecision(6));
}
