import { useEffect } from 'react'
import { SVG, extend as SVGextend, Element as SVGElement } from '@svgdotjs/svg.js'
import { animationTiming, mouseOverSqueeze, mouseOutSqueeze } from './utils/animation.funcs'

const screen = {
    mobile: 768,
}

const fetchJson = async() => {
    const logoDefs = await import('./json/logo.json').then(p => JSON.stringify(p))
    const parse = JSON.parse(logoDefs)
    return parse
}

const Logo: React.FC = () => {
    useEffect(() => {
        const logoDefs = fetchJson().then(r => r)
        logoDefs.then(obj => {
            const logo = obj.logo
            const svg = SVG().addTo('#logo')
            svg.viewbox('0 0 616 374').size('100%', '100%')
            svg.fill('#f00')

            const color = {
                base: '#fe5f55',
                white: '#eef5db',
                complementary: '#f96'
            }

            /**
            * LOGO DEFINITIONS AND BASE SETUP
            */

            const base = svg.path(logo.base),
            curlyLeft = svg.path(logo.curlyLeft),
            curlyRight = svg.path(logo.curlyRight),
            symbol = svg.path(logo.symbol)

            const patternX = 4,
            patternY = 4,
            pattern = svg.pattern(patternX, patternY, add => {
                let d = 'M1 3h1v1H1V3zm2-2h1v1H3V1z';
                add.rect(patternX, patternY).fill(color.base)
                add.path(d).fill(color.complementary)
            })

            base.fill(pattern)
                .stroke({
                    width: 1,
                    color: color.white,
                    opacity: .9
                })
                .transform({
                    rotate: -15,
                    scale: .1
                }).opacity(0).addClass('base')
                //@ts-ignore ANIMATE:
                .animate(600, 400).ease(animationTiming.bounceOut).opacity(1)
                .transform({
                    rotate: 0,
                    scale: 1
                })

            curlyLeft.back().dx(100).addClass('curly')
                //@ts-ignore ANIMATE:
                .animate(1000, 1000)
                .ease(animationTiming.elastic)
                .dx(-100)
                //@ts-ignore
                .opacity(1)

            curlyRight.back().dx(-100).addClass('curly')
                //@ts-ignore ANIMATE:
                .animate(1000, 1000)
                .ease(animationTiming.elastic)
                .dx(100)
                //@ts-ignore
                .opacity(1)

            symbol
                .transform({ scale: 0 })
                .addClass('symbol')
                //@ts-ignore ANIMATE:
                .animate(800, 1000)
                .ease(animationTiming.elastic)
                //@ts-ignore
                .opacity(1)
                .transform({ scale: 1 })


            svg.each(function() {
                this.opacity(0);
                if((this.type === 'path' || this.type === 'g') && !this.hasClass('base')) {
                    this.fill(color.white)
                }

                if(this.hasClass('curly')) {
                    this.on('mouseover', mouseOverSqueeze)
                        .on('mouseout', mouseOutSqueeze);
                }
            })
            const errorMsg = 'Wat ' + (window.innerWidth > screen.mobile);
            const isDesktop = window.innerWidth > screen.mobile;
            const isLandscape = window.matchMedia('(orientation: landscape)').matches;
        })

    }, [])

    return <div id="logo"></div>
}

export default Logo
