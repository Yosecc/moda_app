// import { mapMutations, mapActions, mapState } from 'vuex'
import { firebase } from '@nativescript/firebase';
export default {
    filters: {

    },
    computed: {

    },
    methods: {
        configTunes(tunes) {
            let style = ''
            if (tunes.alignmentTune != undefined) {
                style += `text-align: ${tunes.alignmentTune.alignment}; `
            }

            if (tunes.configTune.margin != undefined) {

                let texto = ''
                for (const key in tunes.configTune.margin) {
                    if (Object.hasOwnProperty.call(tunes.configTune.margin, key)) {
                        const element = tunes.configTune.margin[key];
                        if (element.value > 0) {
                            texto += `margin-${element.clave}: ${element.value}px; `
                        }
                    }
                }



                style += ` ${texto}`
            }

            return {
                style: style
            }
        },
        configTuneIsView(tunes) {
            if (tunes.categoriaTune != undefined) {
                return !tunes.categoriaTune.ocultarApp
            }
            return true
        },
        configTuneBackground(tunes, type = 'code') {
            if (tunes.configTune.backgroundColor != undefined) {

                if (type == 'style') {
                    return ` background-color: ${tunes.configTune.backgroundColor} `
                }

                return tunes.configTune.backgroundColor
            }
            return ''
        },
        configTuneExapandir(tunes) {
            if (tunes.configTune.expandir != undefined) {
                return tunes.configTune.expandir
            }
            return false
        },
        configMargin(tunes) {

            if (tunes.configTune.margin != undefined) {
                return {
                    top: tunes.configTune.margin.top.value * 0.75,
                    right: tunes.configTune.margin.right.value * 0.75,
                    bottom: tunes.configTune.margin.bottom.value * 0.75,
                    left: tunes.configTune.margin.left.value * 0.75,
                }
            }

            return {
                top: 0,
                right: 0,
                bottom: 0,
                left: 0
            }
        },
        configAlignment(tunes, type = 'code') {
            if (tunes.alignmentTune != undefined) {
                if (type == 'style') {
                    return `text-align: ${tunes.alignmentTune.alignment}; `
                }
                return tunes.alignmentTune.alignment
            }

            return ''
        }
    }
};