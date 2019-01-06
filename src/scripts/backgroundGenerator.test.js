const Trianglify = require('trianglify');

test('Trianglify config is properly set up', () => {
    const TrianglifyCfg = {
        width: window.innerWidth,
        height: window.innerHeight,
        variance: '1',
        x_colors: 'YlOrRd',
        y_colors: 'random'
    };

    const pattern = Trianglify(TrianglifyCfg);

    expect(pattern.opts.width).toBeTruthy();
    expect(pattern.opts.height).toBeTruthy();
    expect(pattern.opts.variance).toBe('1');
    expect(pattern.opts.x_colors).toBe('YlOrRd');
});
