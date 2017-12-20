/**
 * Created by m-lee on 20-12-2017.
 */
(function(){
    var b;
    var x=0, y=0;
    /*var dx = Math.random()*300;
     var dy = Math.random()*300;*/
    var dx = 600;
    var dy = 80;

    function init(){
        b = document.getElementById('santa');
        console.log('started...');
        moveSanta();
    }

    window.requestAnimFrame = (function(){
        return  window.requestAnimationFrame       ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame    ||
            function( callback ){
                window.setTimeout(callback, 1000 / 60);
            };
    })();

    function moveSanta(){
        x += (dx-x) * 0.015;
        y += (dy-x) * 0.015;
        b.style.left = (x+200) + "px";
        /*b.style.top = y + "px";*/
        b.style.top = dy + "px";
        if(Math.abs(x-dx) < 1){
            /*    dx = Math.random()*300;
             dy = Math.random()*300;
             x = 10;*/
            if (dx > 10){
                b.style.transform = "scaleX(-1)";
                dx = 10;}
            else {
                b.style.transform = "scaleX(1)";
                dx = document.documentElement.clientWidth - 360;
            }

        }
        requestAnimFrame(moveSanta, b);
    }

    init();

})();

var c = document.getElementById('canv'),
    $ = c.getContext("2d");
var w = c.width = window.innerWidth,
    h = c.height = window.innerHeight;

// Sneewvlokjes
Snowy();
function Snowy() {
    var snow, arr = [];
    var num = 600, tsc = 1, sp = 1; // hoeveelheid
    var sc = 1.3, t = 0, mv = 20, min = 1;
    for (var i = 0; i < num; ++i) {
        snow = new Flake();
        snow.y = Math.random() * (h + 50);
        snow.x = Math.random() * w;
        snow.t = Math.random() * (Math.PI * 2);
        snow.sz = (75 / (10 + (Math.random() * 100))) * sc;//grootte
        snow.sp = (Math.pow(snow.sz * .8, 1) * .15) * sp;//Snelheid
        snow.sp = snow.sp < min ? min : snow.sp;
        arr.push(snow);
    }
    go();
    function go(){
        window.requestAnimationFrame(go);
        $.clearRect(0, 0, w, h);
        $.fillStyle = 'hsla(242, 95%, 3%, 1)';
        $.fillRect(0, 0, w, h);
        $.fill();
        for (var i = 0; i < arr.length; ++i) {
            f = arr[i];
            f.t += .05;
            f.t = f.t >= Math.PI * 2 ? 0 : f.t;
            f.y += f.sp;
            f.x += Math.sin(f.t * tsc) * (f.sz * .3);
            if (f.y > h + 50) f.y = -10 - Math.random() * mv;
            if (f.x > w + mv) f.x = - mv;
            if (f.x < - mv) f.x = w + mv;
            f.draw();}
    }
    function Flake() {
        this.draw = function() {
            this.g = $.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.sz);
            this.g.addColorStop(0, 'hsla(255,255%,255%,1)');
            this.g.addColorStop(1, 'hsla(255,255%,255%,0)');
            $.moveTo(this.x, this.y);
            $.fillStyle = this.g;
            $.beginPath();
            $.arc(this.x, this.y, this.sz, 0, Math.PI * 2, true);
            $.fill();}
    }
}
/*________________________________________*/
window.addEventListener('resize', function(){
    c.width = w = window.innerWidth;
    c.height = h = window.innerHeight;
}, false);
