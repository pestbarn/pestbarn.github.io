---
layout: article
title: "Spinning circle animation in Sass"
description: "How is the circle animation done on www.mattias.pw? Let's go through it step by step."
category: Tutorials
tags: [css,sass]
---

### How is that circle animation done?
At the top of [my resume site](http://www.mattias.pw), you can see an animation with 11 semi-translucent spinning circles. This animation is created using only SCSS and a few divs.

I will keep it simple and demonstrate this using Haml, even though the real thing uses plain ol' HTML.
<pre><code class="language-haml">%header
  %div
    - 11.times do
      %div</code></pre>

The containing div only gets a `width` and `height` set to `100%`. All the individual circles then share the following rules:

1. Set an `absolute` position
2. Set a radial gradient at low opacity
3. Set a 2px border of type `inset`, and give it a radius of `50%`
4. Set a discreet `box-shadow`
5. Include a `topleft()` mixin, positioning every circle at `top: 45%; left: 50%;`
6. Turn on the animation
7. Set *each odd circle* to an `alternate-reverse` direction

There, all done. Except for the individual positioning and sizing, of course. That's done in this pretty little `@while` loop:
<pre><code class="language-scss">$i: 1; $s: 38; $t: -19; $l: -89.3; $z: 2;

@while $i <= 11 {
    &:nth-child(#{$i}) {
        @include sqsize($s);
        margin-top: $t+vh;
        margin-left: $l+vh;
        z-index: $z;
    }
    $i: $i + 1;
    $b: $i <= 6;
    $z: if($b, $z + 1, $z - 1);
    $l: if($b, $l + 15, $l + 13);
    $s: if($b, $s - 2, $s + 2);
    $t: if($b, $t + 1, $t - 1);
}</code></pre>

OK, and here's what's happening:

#### Initiate all variables
   * `$i` is an **i**ncremental 1-index counter
   * `$b` is a "**b**reaking point", returning `true` for the first 6 circles, and `false` for the last 5
   * `$z` is the **z**-index
   * `$l` is the **l**eft margin
   * `$s` is the starting **s**ize
   * `sqsize($s)` is a mixin with `width: $s+vh; height: $s+vh;`
   * `$t` is the **t**op margin

#### Run the loop 11 times in total
   * Starting from the left, circles will decrease in size and move towards the center
   * Past the center (which is circle number 6 in this case), circles will increase in size and move towards the right edge

[Full demo available on Codepen](http://codepen.io/pestbarn/pen/myqvEq?editors=1100), and the source SCSS files can be found at my [Github repo](https://github.com/pestbarn/pestbarn.github.io/tree/master/assets/scss). Enjoy!
