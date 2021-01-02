import Document, { Html, Head, Main, NextScript } from 'next/document'
import { GA_TRACKING_ID } from '../utils/gtag'

export default class MyDocument extends Document {
    render() {
        return (
            <Html>
                <Head>
                    {/* Global Site Tag (gtag.js) - Google Analytics */}
                    <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`} />
                    <script dangerouslySetInnerHTML={{
                        __html: `
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', '${GA_TRACKING_ID}', {
                            page_path: window.location.pathname,
                        });
                        `
                    }} />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                    <div id="fss"></div>

                    <script src="fss.min.js"></script>
                    <script>
                        // 1) Create a Renderer for the context you would like to render to.
                        //    You can use either the WebGLRenderer, CanvasRenderer or SVGRenderer.
                        var renderer = new FSS.SVGRenderer();

                        // 2) Add the Renderer's element to the DOM:
                        var container = document.getElementById('fss');
                        container.appendChild(renderer.element);

                        // 3) Create a Scene:
                        var scene = new FSS.Scene();

                        // 4) Create some Geometry & a Material, pass them to a Mesh constructor, and add the Mesh to the Scene:
                        var geometry = new FSS.Plane(200, 100, 4, 2);
                        var material = new FSS.Material('#444444', '#FFFFFF');
                        var mesh = new FSS.Mesh(geometry, material);
                        scene.add(mesh);

                        // 5) Create and add a Light to the Scene:
                        var light = new FSS.Light('#FF0000', '#0000FF');
                        scene.add(light);

                        // 6) Finally, render the Scene:
                        renderer.render(scene);
                    </script>
                </body>
            </Html>
        );
    }
}
