/* global Trianglify */

(function() {
    let resizeTimeout;

    const resizeThrottler = () => {
      // ignore resize events as long as an actualResizeHandler execution is in the queue
        if (!resizeTimeout) {
            resizeTimeout = setTimeout(function() {
                resizeTimeout = null;
                actualResizeHandler();
            }, 900);
        }
    };

    const TrianglifyCfg = {
        width: window.innerWidth,
        height: window.innerHeight,
        variance: '1',
        x_colors: 'YlOrRd',
        y_colors: 'random'
    };

    const actualResizeHandler = () => {
        const pattern = Trianglify(TrianglifyCfg);

        const currentCanvas = document.getElementsByTagName('canvas');

        for (let i = currentCanvas.length - 1; 0 <= i; i--) currentCanvas[i].remove();

        document.body.appendChild(pattern.canvas());
    };

    document.body.appendChild(Trianglify(TrianglifyCfg).canvas());

    window.addEventListener('resize', resizeThrottler, false);
    window.addEventListener('orientationchange', resizeThrottler, false);
})();
