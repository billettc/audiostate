(window.webpackJsonp = window.webpackJsonp || []).push([[2], {
    262: function (t, s, i) {
        "use strict";
        i.r(s);
        i(80), i(92), i(52), i(53), i(33), i(122);
        var e = {
            name: "RockiotSvgLinearV", data: function () {
                return {
                    svgwidth: 120,
                    svgheight: 370,
                    offsetX: 0,
                    offsetY: 0,
                    barHeight: 40,
                    scaleY: -20,
                    factor: 3.5,
                    range: 100,
                    svg: null,
                    scaleX: 90,
                    offsetText: 10,
                    pos: 0,
                    oldValue: 0,
                    aniValue: 0,
                    limitzones: null,
                    showScale: !0
                }
            }, computed: {
                scaleStyle: function () {
                    return this.showScale ? "stroke:" + this.$attrs.scaleColor + ";" : "display:none;stroke:" + this.$attrs.scaleColor + ";"
                }, scaleTextColor: function () {
                    if (this.$attrs.scaleTextColor) return "fill:" + this.$attrs.scaleTextColor + ";font-size:.8rem;"
                }, outlineStyle: function () {
                    return "fill:" + this.$attrs.barColor + ";stroke:" + this.$attrs.barBorderColor + ";" + this.animate("height")
                }, fillStyle: function () {
                    return "fill:" + this.$attrs.progressColor + ";stroke:transparent;"
                }, zoneHeight: function () {
                    this.svgheight, this.offsetY;
                    return (this.svgheight - 2 * this.offsetY) / this.limitzones.length
                }
            }, watch: {
                "$attrs.value": function (t) {
                    parseFloat(t) > parseInt(this.$attrs.max) ? this.pos = this.normalize(parseFloat(this.$attrs.max)) * this.posFactor : this.pos = (this.normalize(t) - -1 * parseFloat(this.$attrs.min)) * this.posFactor, this.aniValue = t
                }, $attrs: function (t) {
                    "0" === t.scale ? this.showScale = !1 : this.showScale = !0, this.createGauge()
                }
            }, methods: {
                normalize: function (t) {
                    return Number(this.$attrs.min) < 0 ? Number(this.$attrs.max) - Number(this.$attrs.max) * ((parseFloat(t).toFixed(this.$attrs.precision) - Number(this.$attrs.min)) / this.range * 100) / 100 : Number(this.$attrs.min) > 0 ? Number(this.$attrs.max) - Number(this.$attrs.max) * ((t - Number(this.$attrs.min)) / this.range * 100) / 100 : Number(this.$attrs.max) - Number(this.$attrs.max) * (t / this.range * 100) / 100
                }, animate: function (t) {
                    return this.$attrs.animation ? "transition: " + t + " " + parseFloat(this.$attrs.animation / 1e3) + "s linear;" : ""
                }, gaugeSize: function () {
                    switch (this.$attrs.size) {
                        case"md":
                            this.offsetY = 20, this.barHeight = 30, this.offsetX = this.svgwidth / 2 - this.barHeight / 2, this.scaleY = -25, this.scaleX = 70;
                            break;
                        case"sm":
                            this.offsetY = 20, this.barHeight = 10, this.offsetX = this.svgwidth / 2 - this.barHeight / 2, this.scaleY = 0, this.scaleX = 60;
                            break;
                        case"lg":
                            this.offsetY = 20, this.barHeight = 40, this.offsetX = this.svgwidth / 2 - this.barHeight / 2, this.scaleX = 80;
                            break;
                        default:
                            this.offsetY = 20, this.barHeight = 30, this.offsetX = this.svgwidth / 2 - this.barHeight / 2, this.scaleY = -25, this.scaleX = 30
                    }
                }, setSVGAttributes: function (t, s) {
                    for (var i in s) t.setAttributeNS(null, i, s[i])
                }, createScale: function () {
                    this.svg.scale = this.$refs["scale-" + this.$attrs.serial], this.svg.scale.children.length && (this.svg.scale.innerHTML = "");
                    for (var t = "http://www.w3.org/2000/svg", s = parseInt(this.svgheight) - 2 * this.offsetY, i = parseInt(this.$attrs.smallscale) ? 10 : 1, e = parseInt(this.$attrs.ticks) * i, a = s / parseInt(this.$attrs.ticks) / i, r = 0, h = 0; h <= e; h++) {
                        var l = document.createElementNS(t, "line"), n = 15;
                        if (i > 1) {
                            n = h % 10 != 0 && h > 0 ? 10 : 15;
                            this.svgwidth;
                            var o = {
                                class: "scale rockiot-scale",
                                style: this.scaleStyle,
                                x1: this.scaleX,
                                y1: h * a + this.offsetY,
                                x2: this.scaleX + n,
                                y2: h * a + this.offsetY
                            };
                            this.setSVGAttributes(l, o), this.svg.scale.appendChild(l)
                        } else {
                            this.svgwidth, o = {
                                class: "scale rockiot-scale",
                                style: this.scaleStyle,
                                x1: this.scaleX,
                                y1: h * a + this.offsetY,
                                x2: this.scaleX + n,
                                y2: h * a + this.offsetY
                            };
                            this.setSVGAttributes(l, o), this.svg.scale.appendChild(l)
                        }
                        0 !== h && h !== parseInt(this.$attrs.ticks) || 4;
                        var c = document.createElementNS(t, "text"), f = {
                            class: "scaleNumbersLinear",
                            style: this.scaleTextColor,
                            x: this.svgwidth - 25,
                            y: h * a + this.offsetY + 5
                        };
                        this.setSVGAttributes(c, f);
                        var g = (parseInt(this.$attrs.max) - parseInt(this.$attrs.min)) / parseInt(this.$attrs.ticks);
                        r = parseInt(this.$attrs.max) - h * g / i, h % 10 != 0 && 1 !== i || (c.textContent = parseInt(r), this.svg.scale.appendChild(c))
                    }
                }, createGauge: function () {
                    var t = this.$attrs.serial, s = parseInt(this.svgheight) - 2 * this.offsetY;
                    this.svg = this.$refs[t], this.svg.scale = this.$refs["scale-" + t], this.factor = s / (parseInt(this.$attrs.max) - parseInt(this.$attrs.min)), this.posFactor = s / Number(this.$attrs.max), this.gaugeSize(), parseInt(this.$attrs.value) > parseInt(this.$attrs.max) && (this.$attrs.value = 0), this.range = Number(this.$attrs.max) - Number(this.$attrs.min), this.pos = this.normalize(Number(this.$attrs.value)) * this.posFactor, parseInt(this.$attrs.scale) && this.createScale(), this.$attrs.zones && (this.limitzones = this.$attrs.zones.split(","))
                }
            }, beforeMount: function () {
                this.aniValue = parseInt(this.$attrs.value)
            }, mounted: function () {
                var t = this.$attrs.serial, s = parseInt(this.svgheight) - 2 * this.offsetY;
                this.svg = this.$refs[t], this.svg.scale = this.$refs["scale-" + t], this.range = parseInt(this.$attrs.max) - parseInt(this.$attrs.min), this.factor = s / (parseInt(this.$attrs.max) - parseInt(this.$attrs.min)), this.posFactor = s / Number(this.$attrs.max), this.gaugeSize(), this.range = Number(this.$attrs.max) - Number(this.$attrs.min), this.pos = this.normalize(Number(this.$attrs.value)) * this.posFactor, parseInt(this.$attrs.scale) && this.createScale(), this.$attrs.zones && (this.limitzones = this.$attrs.zones.split(","))
            }
        }, a = i(7), r = Object(a.a)(e, (function () {
            var t = this, s = t.$createElement, i = t._self._c || s;
            return i("div", [i("svg", {
                ref: t.$attrs.serial,
                class: " rockiot-linear-vertical rockiot-gauge rockiot-gauge-" + t.$attrs.size,
                style: t.$attrs.svgStyle,
                attrs: {
                    height: t.svgheight,
                    width: t.svgwidth,
                    "view-box": "0 0 " + t.svgwidth + " " + t.svgheight,
                    id: t.$attrs.serial
                }
            }, [i("g", {
                ref: "scale-" + t.$attrs.serial,
                staticClass: "rockiot-scale",
                style: t.scaleStyle,
                attrs: {stroke: "red"}
            }), t._v(" "), i("rect", {
                staticClass: "rockiot-outline ",
                style: t.fillStyle,
                attrs: {
                    id: "outline-" + t.$attrs.serial,
                    x: t.offsetX,
                    height: t.svgheight - 2 * t.offsetY,
                    width: t.barHeight,
                    y: t.offsetY
                }
            }), t._v(" "), i("rect", {
                staticClass: "rockiot-fill ",
                style: t.outlineStyle,
                attrs: {id: "fill-" + t.$attrs.serial, x: t.offsetX, height: t.pos, width: t.barHeight, y: t.offsetY}
            }), t._v(" "), i("rect", {
                staticClass: "rockiot-needle",
                style: t.animate("y"),
                attrs: {
                    id: "needle-" + t.$attrs.serial,
                    height: "1",
                    y: t.pos + t.offsetY,
                    x: t.offsetX,
                    width: t.barHeight,
                    fill: t.$attrs.needleColor
                }
            }), t._v(" "), t._l(t.limitzones, (function (s, e) {
                return [i("rect", {
                    key: "zone-" + e,
                    staticClass: "rockiot-zones",
                    attrs: {
                        id: "zones-" + e + "-" + t.$attrs.serial,
                        fill: s,
                        x: t.offsetX - 6,
                        height: t.zoneHeight,
                        width: 5,
                        y: t.offsetY + t.zoneHeight * e
                    }
                })]
            }))], 2), t._v(" "), i("div", {staticClass: "rockiot-gauge-linear-vertical-output"}, [i("div", {staticClass: "rockiot-gauge-linear-vertical-name"}, [t._v("\n        " + t._s(this.$attrs.name) + " " + t._s(this.$attrs.units) + "\n\n      ")]), t._v(" "), i("div", {class: "rockiot-gauge-value rockiot-gauge-" + t.$attrs.variation + "-" + t.$attrs.orientation + "-value"}, [i("rockiot-animated-number", {
                ref: "num_" + this.$attrs.serial,
                attrs: {
                    precision: t.$attrs.precision,
                    duration: t.$attrs.animation,
                    from: t.oldValue,
                    to: t.$attrs.value
                },
                on: {
                    end: function (s) {
                        t.oldValue = t.$attrs.value
                    }
                }
            })], 1)])])
        }), [], !1, null, null, null);
        s.default = r.exports
    }, 263: function (t, s, i) {
        "use strict";
        i.r(s);
        i(80), i(52), i(53), i(33), i(122);
        var e = {
            name: "RockiotSvgLinearH", data: function () {
                return {
                    svgwidth: 370,
                    svgheight: 90,
                    offsetX: 20,
                    offsetY: 60,
                    barHeight: 20,
                    scaleY: 0,
                    range: 100,
                    factor: 3.5,
                    posFactor: 3.5,
                    svg: null,
                    scaleX: 90,
                    offsetText: 10,
                    pos: 0,
                    snapObject: null,
                    aniPos: [0, 0],
                    oldValue: 0,
                    aniValue: 0,
                    limitzones: null,
                    showScale: !0
                }
            }, computed: {
                scaleStyle: function () {
                    return this.showScale ? "stroke:" + this.$attrs.scaleColor + ";" : "display:none;stroke:" + this.$attrs.scaleColor + ";"
                }, scaleTextColor: function () {
                    return "fill:" + this.$attrs.scaleTextColor + ";"
                }, outlineStyle: function () {
                    return "fill:" + this.$attrs.barColor + ";stroke:" + this.$attrs.barBorderColor + ";"
                }, fillStyle: function () {
                    return "fill:" + this.$attrs.progressColor + ";stroke:transparent;" + this.animate("width")
                }, zoneWidth: function () {
                    return (this.svgwidth - 2 * this.offsetX) / this.limitzones.length
                }
            }, watch: {
                "$attrs.value": function (t) {
                    Number(t) > Number(this.$attrs.max) && (t = Number(this.$attrs.max)), this.pos = (this.svgwidth - 2 * this.offsetX) * this.normalize(Number(t)) / 100
                }, $attrs: function (t) {
                    "0" === t.scale ? this.showScale = !1 : this.showScale = !0, this.createGauge()
                }
            }, methods: {
                calcWidth: function (t) {
                    Number(t) > Number(this.$attrs.max) && (t = Number(this.$attrs.max)), this.pos = (this.svgwidth - 2 * this.offsetX) * this.normalize(Number(t)) / 100
                }, normalize: function (t) {
                    return (t + -1 * parseInt(this.$attrs.min)) / this.range * 100
                }, animate: function (t) {
                    return this.$attrs.animation ? "transition: " + t + " " + parseFloat(this.$attrs.animation / 1e3) + "s linear;" : ""
                }, gaugeSize: function () {
                    switch (this.$attrs.size) {
                        case"md":
                            this.offsetX = 20, this.offsetY = 70, this.barHeight = 25, this.scaleY = -15;
                            break;
                        case"sm":
                            this.offsetX = 20, this.offsetY = 70, this.barHeight = 10, this.scaleY = 0;
                            break;
                        case"lg":
                            this.offsetX = 20, this.offsetY = 85, this.barHeight = 40, this.scaleY = -30;
                            break;
                        default:
                            this.offsetX = 20, this.offsetY = 70, this.barHeight = 25, this.scaleY = -15
                    }
                }, setSVGAttributes: function (t, s) {
                    for (var i in s) t.setAttributeNS(null, i, s[i])
                }, createScale: function () {
                    if (this.showScale) {
                        this.svg.scale = this.$refs["scale-" + this.$attrs.serial], this.svg.scale.children.length && (this.svg.scale.innerHTML = "");
                        this.$attrs;
                        for (var t = "http://www.w3.org/2000/svg", s = (parseInt(this.svgwidth) - this.offsetX - this.offsetX) / parseInt(this.$attrs.ticks) / 10, i = 0, e = 0, a = 0; i <= 10 * parseInt(this.$attrs.ticks); a += s) {
                            var r = document.createElementNS(t, "line"), h = 5, l = "scale scale-major-ticks";
                            if (parseInt(this.$attrs.smallscale) && i % 10 != 0 && i > 0) {
                                h = 0;
                                var n = {
                                    class: l = "scale scale-minor-ticks",
                                    style: this.scaleStyle,
                                    x1: a + this.offsetX,
                                    y1: this.offsetY,
                                    x2: a + this.offsetX,
                                    y2: this.offsetY - 20 - h + this.scaleY
                                };
                                this.setSVGAttributes(r, n), this.svg.scale.appendChild(r)
                            }
                            if (i % 10 == 0 || 0 === i) {
                                n = {
                                    class: l,
                                    style: this.scaleStyle,
                                    x1: a + this.offsetX,
                                    y1: this.offsetY,
                                    x2: a + this.offsetX,
                                    y2: this.offsetY - 20 - h + this.scaleY
                                };
                                this.setSVGAttributes(r, n), this.svg.scale.appendChild(r)
                            }
                            if (i % 10 == 0 || 0 === i) {
                                0 !== i && i !== parseInt(this.$attrs.ticks) || 4;
                                var o = document.createElementNS(t, "text"), c = {
                                    class: "scaleNumbersLinear",
                                    stroke: "transparent",
                                    style: this.scaleTextColor,
                                    x: a + this.offsetX,
                                    y: this.offsetY - 30 + this.scaleY
                                };
                                this.setSVGAttributes(o, c);
                                var f = this.range / parseInt(this.$attrs.ticks);
                                e = parseInt(this.$attrs.min) + i / 10 * f, o.textContent = parseInt(e), this.svg.scale.appendChild(o)
                            }
                            i++
                        }
                    }
                }, createGauge: function () {
                    var t = this.$attrs.serial;
                    this.aniValue = parseInt(this.$attrs.value), "linear" === this.$attrs.variation && this.$attrs.svgwidth > this.$attrs.svgheight && (this.svgwidth = this.$attrs.svgwidth, this.svgheight = this.$attrs.svgheight), this.$attrs.svgwidth > this.$attrs.svgheight && (this.svgwidth = this.$attrs.svgheight, this.svgheight = this.$attrs.svgwidth);
                    var s = parseInt(this.svgwidth) - 2 * this.offsetX;
                    this.svg = this.$refs[t], this.svg.scale = this.$refs["scale-" + t], this.posFactor = s / parseInt(this.$attrs.max), this.range = parseInt(this.$attrs.max) - parseInt(this.$attrs.min), this.factor = s / this.range, parseInt(this.$attrs.value) > parseInt(this.$attrs.max) && (this.$attrs.value = this.$attrs.max), this.gaugeSize(), parseInt(this.$attrs.scale) && this.createScale(), this.$attrs.zones.split(",") && (this.limitzones = this.$attrs.zones.split(",")), this.aniPos[1] = this.pos, this.calcWidth(this.$attrs.value)
                }
            }, beforeMount: function () {
                this.aniValue = parseInt(this.$attrs.value)
            }, mounted: function () {
                var t = this.$attrs.serial;
                this.aniValue = parseInt(this.$attrs.value), "linear" === this.$attrs.variation && this.$attrs.svgwidth > this.$attrs.svgheight && (this.svgwidth = this.$attrs.svgwidth, this.svgheight = this.$attrs.svgheight), this.$attrs.svgwidth > this.$attrs.svgheight && (this.svgwidth = this.$attrs.svgheight, this.svgheight = this.$attrs.svgwidth);
                var s = parseInt(this.svgwidth) - 2 * this.offsetX;
                this.svg = this.$refs[t], this.posFactor = s / parseInt(this.$attrs.max), this.range = parseInt(this.$attrs.max) - parseInt(this.$attrs.min), this.factor = s / this.range, parseInt(this.$attrs.value) > parseInt(this.$attrs.max) && (this.$attrs.value = this.$attrs.max), this.gaugeSize(), parseInt(this.$attrs.scale) && this.createScale(), this.$attrs.zones.split(",") && (this.limitzones = this.$attrs.zones.split(",")), this.aniPos[1] = this.pos, this.calcWidth(this.$attrs.value)
            }
        }, a = i(7), r = Object(a.a)(e, (function () {
            var t = this, s = t.$createElement, i = t._self._c || s;
            return i("div", {staticStyle: {"padding-top": "1rem"}}, [i("svg", {
                ref: t.$attrs.serial,
                class: "typeRange rockiot-gauge rockiot-gauge-" + t.$attrs.size,
                style: t.$attrs.svgStyle,
                attrs: {
                    height: t.svgheight,
                    width: t.svgwidth,
                    "view-box": "0 0 " + t.svgwidth + " " + t.svgheight,
                    id: t.$attrs.serial
                }
            }, [i("g", {
                ref: "scale-" + t.$attrs.serial,
                staticClass: "scale",
                style: t.scaleStyle,
                attrs: {stroke: "red"}
            }), t._v(" "), i("rect", {
                staticClass: "outline",
                style: t.outlineStyle,
                attrs: {
                    id: "outline-" + t.$attrs.serial,
                    x: t.offsetX,
                    width: t.svgwidth - 2 * t.offsetX,
                    height: t.barHeight,
                    y: t.offsetY - t.barHeight
                }
            }), t._v(" "), i("rect", {
                staticClass: "fill",
                style: t.fillStyle,
                attrs: {
                    id: "fill-" + t.$attrs.serial,
                    x: t.offsetX,
                    width: t.pos,
                    height: t.barHeight,
                    y: t.offsetY - t.barHeight
                }
            }), t._v(" "), "1" === t.$attrs.needle ? i("rect", {
                staticClass: "needle",
                style: t.animate("x"),
                attrs: {
                    id: "needle-" + t.$attrs.serial,
                    width: "1",
                    x: this.pos + this.offsetX,
                    y: t.offsetY - t.barHeight - 5,
                    height: t.barHeight + 10,
                    fill: t.$attrs.needleColor
                }
            }) : t._e(), t._v(" "), t._l(t.limitzones, (function (s, e) {
                return [s ? i("rect", {
                    key: "zone-" + e,
                    staticClass: "rockiot-zones",
                    attrs: {
                        id: "zones-" + e + "-" + t.$attrs.serial,
                        fill: s,
                        x: t.offsetX + t.zoneWidth * e,
                        width: t.zoneWidth,
                        height: "3",
                        y: t.offsetY + 1
                    }
                }) : t._e()]
            }))], 2), t._v(" "), i("div", {staticClass: "rockiot-gauge-linear-vertical-output"}, [i("div", {staticClass: "rockiot-gauge-linear-vertical-name"}, [t._v("\n          " + t._s(this.$attrs.name) + " " + t._s(this.$attrs.units) + "\n        ")]), t._v(" "), i("div", {class: "rockiot-gauge-value rockiot-gauge-" + t.$attrs.variation + "-" + t.$attrs.orientation + "-value"}, [i("rockiot-animated-number", {
                ref: "num_" + this.$attrs.serial,
                attrs: {
                    precision: t.$attrs.precision,
                    duration: t.$attrs.animation,
                    from: t.oldValue,
                    to: t.$attrs.value
                },
                on: {
                    end: function (s) {
                        t.oldValue = t.$attrs.value
                    }
                }
            })], 1)])])
        }), [], !1, null, null, null);
        s.default = r.exports
    }
}]);
