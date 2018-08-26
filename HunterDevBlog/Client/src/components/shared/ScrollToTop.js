﻿import * as React from 'react'
import { withRouter } from 'react-router-dom'

class ScrollToTop extends React.Component {
    componentDidUpdate(prevProps) {
        if (this.props.location !== prevProps.location) {
            this.scrollToY(0, 100, 'easeInOutQuint')
        }
    }


    scrollToY(scrollTargetY = 0, speed = 2000, easing = 'easeOutSine') {
        const requestAnimFrame = (function () {
            return window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                function (callback) {
                    window.setTimeout(callback, 1000 / 60);
                }
        })()

        const scrollY = window.scrollY || document.documentElement.scrollTop
        
        let currentTime = 0

        const time = Math.max(.1, Math.min(Math.abs(scrollY - scrollTargetY) / speed, .8))

        const easingEquations = {
            easeOutSine: function (pos) {
                return Math.sin(pos * (Math.PI / 2))
            },
            easeInOutSine: function (pos) {
                return (-0.5 * (Math.cos(Math.PI * pos) - 1))
            },
            easeInOutQuint: function (pos) {
                if ((pos /= 0.5) < 1) {
                    return 0.5 * Math.pow(pos, 5)
                }
                return 0.5 * (Math.pow((pos - 2), 5) + 2)
            }
        };
        
        function tick() {
            currentTime += 1 / 60

            var p = currentTime / time
            var t = easingEquations[easing](p)

            if (p < 1) {
                requestAnimFrame(tick)

                window.scrollTo(0, scrollY + ((scrollTargetY - scrollY) * t))
            } else {
                console.log('scroll done')
                window.scrollTo(0, scrollTargetY)
            }
        }
        
        tick()
    }

    render() {
        return this.props.children
    }
}

export default withRouter(ScrollToTop)
