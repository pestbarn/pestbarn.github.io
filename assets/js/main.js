window.requestAnimFrame =
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function(callback) {
        window.setTimeout(callback, 1024 / 60);
};
var canvas = document.getElementById('c');
var ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var particles = [];
var bounce = 0.9;
var proximity = 10;
var speed_limit = 20;
var particle_count = 50;
var Vector = function(x, y) {
    this.x = x || 0;
    this.y = y || 0;
};
Vector.prototype.add = function(x, y) {
    if (x instanceof Vector) {
        this.x += x.x;
        this.y += x.y;
    } else if (x != null && y != null) {
        this.x += x;
        this.y += y;
    } else if (x != null) {
        this.x += x;
        this.y += x;
    }
};
Vector.prototype.sub = function(x, y) {
    if (x instanceof Vector) {
        this.x -= x.x;
        this.y -= x.y;
    } else if (x != null && y != null) {
        this.x -= x;
        this.y -= y;
    } else if (x != null) {
        this.x -= x;
        this.y -= x;
    }
};
Vector.prototype.zero = function() {
    this.x = 0;
    this.y = 0;
};
var Particle = function() {
    this.acc = new Vector();
    this.vel = new Vector(
        -1 + (Math.random() * 2),
        -1 + (Math.random() * 2)
    );
    this.pos = new Vector(
        canvas.width * Math.random(),
        canvas.height * Math.random()
    );
};
Particle.prototype.update = function() {
    this.vel.add(this.acc);
    if (this.vel.x > speed_limit || this.vel.y > speed_limit) {
        this.vel.x = Math.min(this.vel.x, speed_limit);
        this.vel.y = Math.min(this.vel.y, speed_limit);
    }
    this.pos.add(this.vel);
    this.acc.zero();
    if (this.pos.x < 0) {
        this.pos.x = 0;
        this.vel.x *= -bounce;
    } else if (this.pos.x > canvas.width) {
        this.pos.x = canvas.width;
        this.vel.x *= -bounce;
    }
    if (this.pos.y < 0) {
        this.pos.y = 0;
        this.vel.y *= -bounce;
    } else if (this.pos.y > canvas.height) {
        this.pos.y = canvas.height;
        this.vel.y *= -bounce;
    }
};
Particle.prototype.draw = function(ctx) {
    ctx.fillStyle = 'rgb(255,255,255)';
    ctx.fillRect(this.pos.x - 1, this.pos.y - 1, 2, 2);
};

function loop() {
    ctx.globalCompositeOperation = 'destination-in';
    ctx.fillStyle = 'rgba(0,0,0,0.9)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.globalCompositeOperation = 'source-over';
    var i, l;
    i = l = particles.length;
    while (i--) {
        var particle = particles[i];
        if (i > 0) {
            var j = i - 1;
            while (j--) {
                var other = particles[j];
                var diff_x = particle.pos.x - other.pos.x;
                var diff_y = particle.pos.y - other.pos.y;
                var dist = Math.sqrt(diff_x * diff_x + diff_y * diff_y);
                if (dist > proximity) {
                    var force = Math.pow(dist, 3) / 8;
                    var x = diff_x / force;
                    var y = diff_y / force;
                    particle.acc.sub(x, y);
                    other.acc.add(x, y);
                }
            }
        }
        particle.update();
        particle.draw(ctx);
    }
    requestAnimFrame(loop);
}
var i = particle_count;
while (i--) {
    particles.push(new Particle());
}
loop();
