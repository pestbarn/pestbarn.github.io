import { useState } from 'react'
import { SVG, extend as SVGextend, Element as SVGElement } from '@svgdotjs/svg.js'
import { animationTiming, mouseOverSqueeze, mouseOutSqueeze } from './utils/animation.funcs'

/**
 * So, this is a pretty advanced construction of a pretty simple logo.
 * It's built by using `d` paths, all located separately in ../json/logo.json
 * There are two versions - a vertical (mobile) and a horizontal (desktop)
 *
 * It's built by fetching the JSON with each separate element, which is then
 * fed to, rendered, and animated using SVG.js.
 */

const screen = {
    mobile: 768,
}

const fetchJson = async() => {
    // Fetch logo file and parse defs
    const logoDefs = await import('./json/logo.json').then(p => JSON.stringify(p))
    const parse = JSON.parse(logoDefs)
    return parse
}

const Logo: React.FC = () => {
    useState(() => {
        const logoDefs = fetchJson().then(r => r)
        logoDefs.then(obj => {
            const logo = obj.logo
            const svg = SVG().addTo('#logo')

            svg.viewbox('0 0 616 374').transform({
                translateX: -20
            })

            const color = {
                base: '#fe5f55',
                white: '#eef5db',
                complementary: '#f96'
            }

            /**
            * SET UP LOGO BASE DEFINITIONS
            */

            const
                base = svg.path(logo.base),
                curlyLeft = svg.path(logo.curlyLeft),
                curlyRight = svg.path(logo.curlyRight),
                symbol = svg.path(logo.symbol)

            /**
             * GENERATE BACKGROUND PATTERN
             */

            const
                patternX = 4, patternY = 4,
                pattern = svg.pattern(patternX, patternY, add => {
                    let d = 'M1 3h1v1H1V3zm2-2h1v1H3V1z'
                    add.rect(patternX, patternY).fill(color.base)
                    add.path(d).fill(color.complementary)
                })

            /**
             * DEFINE "BASE" SETUP AND ANIMATION, INCLUDING
             * ∞ BASE GRAPHIC
             * { CURLIES }
             * ⊙ CENTRED SYMBOL
             */

            generateBase(base, pattern, color, curlyLeft, curlyRight, symbol)

            /**
             * DEFINE TEXT ELEMENTS
            */

            const textFname =
                svg.addClass('text').group().dmove(52, 70)

            const textLname =
                svg.addClass('text').group().dmove(-52, -70)

            const textPrefix =
                svg.addClass('text').group().dmove(52, -70)

            const textSuffix =
                svg.addClass('text').group().dmove(-52, 70)

            /**
             * DEFINE UNIQUE TEXT ELEMENTS FROM JSON
             */

            const texts = logo.texts

            for (const key in texts) {
                /**
                 * TEXTS ARE DIVIDED INTO FOUR SEPARATE GROUPS:
                 * FIRSTNAME - MATTIAS
                 * LASTNAME  - HAGBERG
                 * PREFIX    - FRONTEND
                 * SUFFIX    - DEVELOPER
                 * LOOP THROUGH EACH AND ADD TO ABOVE TEXT ELEMENTS
                 */

                switch (key) {
                    case 'fName':
                        let fName = texts['fName']
                        for (const l in fName) {
                            let word = svg.path(fName[l])
                            textFname.add(word)
                        }
                    break
                    case 'lName':
                        let lName = texts['lName']
                        for (const l in lName) {
                            let word = svg.path(lName[l])
                            textLname.add(word)
                        }
                    break
                    case 'prefix':
                        let prefix = texts['prefix']
                        for (const l in prefix) {
                            let word = svg.path(prefix[l])
                            textPrefix.add(word)
                        }
                    break
                    case 'suffix':
                        let suffix = texts['suffix']
                        for (const l in suffix) {
                            let word = svg.path(suffix[l])
                            textSuffix.add(word)
                        }
                    break
                }
            }

            /**
             * ANIMATE EACH INDIVIDUAL TEXT ELEMENT
             */

            textFname
                //@ts-ignore ANIMATE:
                .animate(400, 1800).ease(animationTiming.swingTo)
                //@ts-ignore
                .dmove(-12, -12).opacity(1)

            textLname
                //@ts-ignore
                .animate(400, 2100).ease(animationTiming.swingTo)
                //@ts-ignore
                .dmove(12, 12).opacity(1)

            textPrefix
                //@ts-ignore
                .animate(400, 3000).ease(animationTiming.swingTo)
                //@ts-ignore
                .dmove(-12, 15).opacity(1)

            textSuffix
                //@ts-ignore
                .animate(400, 3300).ease(animationTiming.swingTo)
                //@ts-ignore
                .dmove(12, -15).opacity(1)

            /**
             * SET FILL COLORS AND SET MOUSEOVER ANIMATION FOR CURLIES
             */

            svg.each(function() {
                this.opacity(0)
                if((this.type === 'path' || this.type === 'g') && !this.hasClass('base')) {
                    this.fill(color.white)
                }

                if(this.hasClass('curly')) {
                    this.on('mouseover', mouseOverSqueeze)
                        .on('mouseout', mouseOutSqueeze);
                }
            })

            const isDesktop = window.innerWidth > screen.mobile
            const isLandscape = window.matchMedia('(orientation: landscape)').matches

        }).catch(e => console.error(e))
    })

    return <div id="logo" />
}

export default Logo

function generateBase(base, pattern, color, curlyLeft, curlyRight, symbol) {
    base.addClass('base')
        .fill(pattern)
        .stroke({
            width: 1,
            color: color.white,
            opacity: .9
        })
        .transform({
            rotate: -15,
            scale: .1
        })
        .opacity(0)
        //@ts-ignore ANIMATE:
        .animate(600, 400).ease(animationTiming.bounceOut).opacity(1)
        .transform({
            rotate: 0,
            scale: 1
        })

    curlyLeft.addClass('curly')
        .back().dx(100)
        //@ts-ignore ANIMATE:
        .animate(1000, 1000).ease(animationTiming.elastic).dx(-100)
        //@ts-ignore
        .opacity(1)

    curlyRight.addClass('curly')
        .back().dx(-100)
        //@ts-ignore ANIMATE:
        .animate(1000, 1000).ease(animationTiming.elastic).dx(100)
        //@ts-ignore
        .opacity(1)

    symbol.addClass('symbol')
        .transform({ scale: 0 })
        //@ts-ignore ANIMATE:
        .animate(800, 1000)
        .ease(animationTiming.elastic)
        //@ts-ignore
        .opacity(1)
        .transform({ scale: 1 })
}
