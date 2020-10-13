export const animationTiming = {
    elastic: (pos: number) => {
        return Math.pow(2, -10 * pos) * Math.sin((pos - 0.075) * (2 * Math.PI) / .3) + 1;
    },

    swingTo: (pos: number) => {
        const s = 1.70158;
        return (pos -= 1) * pos * ((s + 1) * pos + s) + 1;
    },

    bounceOut: (pos: number) => {
        if ((pos) < (1 / 2.75)) {
            return (7.5625 * pos * pos).toString();
        } else if (pos < (2 / 2.75)) {
            return (7.5625 * (pos -= (1.5 / 2.75)) * pos + .75).toString();
        } else if (pos < (2.5 / 2.75)) {
            return (7.5625 * (pos -= (2.25 / 2.75)) * pos + .9375).toString();
        } else {
            return (7.5625 * (pos -= (2.625 / 2.75)) * pos + .984375).toString();
        }
    }
}

export const mouseOverSqueeze = function() {
    this
        .animate(200, 0)
        .ease(animationTiming.swingTo)
        .transform({
            scale: .95
        })
}

export const mouseOutSqueeze = function() {
    this
        .animate(200, 0)
        .ease(animationTiming.swingTo)
        .transform({
            scale: 1
        })
        .finish();
}
