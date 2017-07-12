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

    const actualResizeHandler = () => {
        let pattern = Trianglify({
            width: window.innerWidth,
            height: window.innerHeight
        });

        let list = document.getElementsByTagName('canvas');

        for(var i = list.length - 1; 0 <= i; i--)
            if(list[i] && list[i].parentElement)
                list[i].parentElement.removeChild(list[i]);

        document.body.appendChild(pattern.canvas());
    };

    document.body.appendChild(Trianglify({
        width: window.innerWidth,
        height: window.innerHeight
    }).canvas());

    window.addEventListener('resize', resizeThrottler, false);
    window.addEventListener('orientationchange', resizeThrottler, false);
})();
