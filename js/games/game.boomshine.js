"use strict";

/********************************************************************************
 *     ADV_Boomshine
 *
 *     Boomshine or "Catch the flake". A little game where you have one click
 *     each roud to invoke a chain-reaction of blowing snowflakes.
 *
 *     Change config params in constructor to tweak the game mechanics.
 *
 *     ShaBy - 2020-11-27
 ********************************************************************************/

class ADV_Boomshine{
    constructor(){
        this.boomshine = document.getElementById("boomshine");
        this.screen = document.getElementById("screen");
        this.canvas = document.getElementById('canvas');
        this.eClear = document.getElementById('clear');
        this.eNeed = document.getElementById('needed');
        this.eTotal = document.getElementById('total');
        this.eLevel = document.getElementById('level');
        this.eScore = document.getElementById('score');
        this.ctx = this.canvas.getContext('2d');

        this.tau = Math.PI * 2;

        this.numTotal;
        this.numNeed;
        this.lock;

        this.scaleTime = 800;
        this.openTime = 2000;
        this.flashTime = 1000;
        this.radius = 6;
        this.speedScale = 1;
    }

    play(){
        this.initGame();
        let self = this;
        window.requestAnimationFrame(this.loop.bind(this));
        this.canvas.onclick = function(ev) {
            ev.preventDefault();
            ev.stopPropagation();
            if (!self.lock) {
                self.lock = true;
                self.balls[0].x = ev.pageX - (self.screen.offsetLeft + 15);
                self.balls[0].y = ev.pageY - (self.screen.offsetTop + 45);
                self.balls[0].t = self.NOW;
            }
        };
    }

    initGame(){
        this.boomshine.classList.add("active");
        this.H = this.screen.offsetHeight - 90;
        this.W = this.screen.offsetWidth - 30;
        this.canvas.height = this.H;
        this.canvas.width = this.W;

        this.level = 1;
        this.score = 0;
        this.numClear = 0;
        this.balls = [];
        this.NOW = 0;
        this.bgTime = 0;
        this.initRound();

    }

    initRound(){
        if (this.numClear >= this.numNeed) {
            this.eLevel.innerHTML = ++this.level;
            this.score += this.numClear;
        }
        this.numTotal = 10+ this.level * 2;
        this.numNeed = this.level == 1 ? 3 : Math.min(this.numTotal - 1, Math.round(Math.exp(this.level / 15 - 1) * this.numTotal)); // 15 = Until 15th question exponential growth
        this.createBalls(this.numTotal);
        this.eNeed.innerHTML = this.numNeed;
        this.eTotal.innerHTML = this.numTotal;
        this.eScore.innerHTML = this.score;
        this.eClear.innerHTML = this.numClear = 0;
        this.lock = false;
    }

    rand(){
        let r = (Math.random() - Math.random()) / 2;
        return 0 <= r ? --r : ++r;
    }

    createBalls(n){
        this.balls = [{
            t: 0,
            r: 0,
            x: -1,
            y: 0,
            xs: 0,
            ys: 0,
            cr: 0xcc,
            cg: 0xcc,
            cb: 0xcc
        }];

        for (let i = n; i--; ){
            this.balls.push({
                t: 0,
                r: this.radius,
                x: this.radius + Math.random() * (this.W - 2 * this.radius),
                y: this.radius + Math.random() * (this.H - 2 * this.radius),
                xs: this.rand() * this.speedScale,
                ys: this.rand() * this.speedScale,
                cr: 255,
                cg: 255,
                cb: 255,
            });
        }
    }

    size(now, bnow, T1, T2) {
        let delta = now - bnow;
        if (delta < T1)
            return delta / T1;

        if (delta < T2)
            return 1;

        return (T1 + T2 - delta) / T1;
    }

    loop(now){
        this.NOW = now;
        this.ctx.clearRect(0, 0, this.W, this.H);
        if (this.bgTime > 0) {
            let s = (now - this.bgTime) / this.flashTime;
            if (s >= 1) {
                this.bgTime = 0;
                s = 1;
            }
            this.ctx.fillStyle = 'rgba(255,255,255,' + (1 - Math.abs(s * 2 - 1)) + ')';
            this.ctx.fillRect(0, 0, this.W, this.H);
        }

        let stillOpen = false;
        for (let i = this.balls.length; i--; ) {
            let status = 1;
            let b = this.balls[i];

            if (b.x === -1)
                continue;

            if (b.x <= this.radius) {
                b.x = this.radius;
                b.xs = -b.xs;
            } else if (b.x >= this.W - this.radius) {
                b.x = this.W - this.radius;
                b.xs = -b.xs;
            }

            if (b.y <= this.radius) {
                b.y = this.radius;
                b.ys = -b.ys;
            } else if (b.y >= this.H - this.radius) {
                b.y = this.H - this.radius;
                b.ys = -b.ys;
            }

            if (b.t !== 0) {
                if (now - b.t > (this.openTime + this.scaleTime)) {
                    b.x = -1;
                    continue;
                }
                stillOpen = true;
                status = this.size(now, b.t, this.scaleTime, this.openTime);
                b.r = status * (50 - this.radius) + this.radius;
                for (let j = this.balls.length; --j; ) {
                    let p = this.balls[j];
                    if (p.t === 0 && i !== j && Math.pow(p.x - b.x, 2) + Math.pow(p.y - b.y, 2) <= Math.pow(b.r + p.r, 2)) {
                        p.t = now;
                        p.xs = p.ys = 0;
                        this.eClear.innerHTML = ++this.numClear;

                        if (this.numClear === this.numNeed)
                            this.bgTime = this.NOW;
                    }
                }
                status = 1 - status / 2;
            }
            b.x += b.xs;
            b.y += b.ys;

            this.ctx.fillStyle = 'rgba(' + b.cr + ',' + b.cg + ',' + b.cb + ',' + status + ')';
            this.ctx.beginPath();
            this.ctx.arc(b.x, b.y, b.r, 0, this.tau, false);
            this.ctx.fill();
        }
        if (!stillOpen && this.lock)
            this.initRound();
        window.requestAnimationFrame(this.loop.bind(this));
    };
}
export default ADV_Boomshine;