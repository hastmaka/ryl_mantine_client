import {useEffect, useRef} from "react";
import classes from '../Services.module.scss'

const CanvasEffect = () => {
    const canvasRef = useRef(null)

    useEffect(() => {
        const c = canvasRef.current;
        const ctx = c.getContext("2d");
        let cH;
        let cW;
        let bgColor = "#FF6138";
        let animations = [];

        const colorPicker = (() => {
            const colors = ["#FF6138", "#FFBE53", "#2980B9", "#282741"];
            let index = 0;
            function next() {
                index = (index + 1) < colors.length ? index + 1 : 0;
                return colors[index];
            }
            function current() {
                return colors[index];
            }
            return {
                next: next,
                current: current
            };
        })();

        const removeAnimation = (animation) => {
            const index = animations.indexOf(animation);
            if (index > -1) animations.splice(index, 1);
        };

        const calcPageFillRadius = (x, y) => {
            const l = Math.max(x - 0, cW - x);
            const h = Math.max(y - 0, cH - y);
            return Math.sqrt(Math.pow(l, 2) + Math.pow(h, 2));
        };

        const handleEvent = (e) => {
            if (e.touches) {
                e.preventDefault();
                e = e.touches[0];
            }
            const currentColor = colorPicker.current();
            const nextColor = colorPicker.next();
            const targetR = calcPageFillRadius(e.pageX, e.pageY);
            const rippleSize = Math.min(200, cW * 0.4);
            const minCoverDuration = 750;

            const pageFill = new Circle({
                x: e.pageX,
                y: e.pageY,
                r: 0,
                fill: nextColor
            });

            const fillAnimation = anime({
                targets: pageFill,
                r: targetR,
                duration: Math.max(targetR / 2, minCoverDuration),
                easing: "easeOutQuart",
                complete: () => {
                    bgColor = pageFill.fill;
                    removeAnimation(fillAnimation);
                }
            });

            const ripple = new Circle({
                x: e.pageX,
                y: e.pageY,
                r: 0,
                fill: currentColor,
                stroke: {
                    width: 3,
                    color: currentColor
                },
                opacity: 1
            });

            const rippleAnimation = anime({
                targets: ripple,
                r: rippleSize,
                opacity: 0,
                easing: "easeOutExpo",
                duration: 900,
                complete: removeAnimation
            });

            const particles = [];
            for (let i = 0; i < 32; i++) {
                const particle = new Circle({
                    x: e.pageX,
                    y: e.pageY,
                    fill: currentColor,
                    r: anime.random(24, 48)
                });
                particles.push(particle);
            }

            const particlesAnimation = anime({
                targets: particles,
                x: (particle) => particle.x + anime.random(-rippleSize, rippleSize),
                y: (particle) => particle.y + anime.random(-rippleSize * 1.15, rippleSize * 1.15),
                r: 0,
                easing: "easeOutExpo",
                duration: anime.random(1000, 1300),
                complete: removeAnimation
            });

            animations.push(fillAnimation, rippleAnimation, particlesAnimation);
        };

        const extend = (a, b) => {
            for (const key in b) {
                if (Object.prototype.hasOwnProperty.call(b, key)) {
                    a[key] = b[key];
                }
            }
            return a;
        };

        const Circle = function (opts) {
            extend(this, opts);
        };

        Circle.prototype.draw = function () {
            ctx.globalAlpha = this.opacity || 1;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
            if (this.stroke) {
                ctx.strokeStyle = this.stroke.color;
                ctx.lineWidth = this.stroke.width;
                ctx.stroke();
            }
            if (this.fill) {
                ctx.fillStyle = this.fill;
                ctx.fill();
            }
            ctx.closePath();
            ctx.globalAlpha = 1;
        };

        //this starts automatically because is handle in the background by requestAnimationFrame
        const animate = anime({
            duration: Infinity,
            update: () => {
                ctx.fillStyle = bgColor;
                ctx.fillRect(0, 0, cW, cH);
                animations.forEach((anim) => {
                    anim.animatables.forEach((animatable) => {
                        animatable.target.draw();
                    });
                });
            }
        });

        const resizeCanvas = () => {
            cW = window.innerWidth;
            cH = window.innerHeight;
            c.width = cW * devicePixelRatio;
            c.height = cH * devicePixelRatio;
            ctx.scale(devicePixelRatio, devicePixelRatio);
        };

        const init = () => {
            resizeCanvas();
            // if (window.CP) {
            //     window.CP.PenTimer.MAX_TIME_IN_LOOP_WO_EXIT = 6000;
            // }
            window.addEventListener("resize", resizeCanvas);
            document.addEventListener("touchstart", handleEvent);
            document.addEventListener("mousedown", handleEvent);
            if (window.location.pathname.match(/fullcpgrid/)) {
                startFauxClicking();
            }
            handleInactiveUser();
        };

        const handleInactiveUser = () => {
            const inactive = setTimeout(() => {
                fauxClick(cW / 2, cH / 2);
            }, 2000);

            const clearInactiveTimeout = () => {
                clearTimeout(inactive);
                document.removeEventListener("mousedown", clearInactiveTimeout);
                document.removeEventListener("touchstart", clearInactiveTimeout);
            };

            document.addEventListener("mousedown", clearInactiveTimeout);
            document.addEventListener("touchstart", clearInactiveTimeout);
        };

        const startFauxClicking = () => {
            setTimeout(() => {
                fauxClick(anime.random(cW * 0.2, cW * 0.8), anime.random(cH * 0.2, cH * 0.8));
                startFauxClicking();
            }, anime.random(200, 900));
        };

        const fauxClick = (x, y) => {
            const fauxClickEvent = new MouseEvent("mousedown", {
                pageX: x,
                pageY: y
            });
            document.dispatchEvent(fauxClickEvent);
        };

        init();

        return () => {
            window.removeEventListener("resize", resizeCanvas);
            document.removeEventListener("mousedown", handleEvent);
            document.removeEventListener("touchstart", handleEvent);
        };
    }, []);

    return <canvas
        id="canvas-bg-clickable-effect"
        ref={canvasRef}
        className={classes.canvas}
    />;
};

export default CanvasEffect;