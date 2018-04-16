(function(e, t) {
    e.JMSlideshow = function(t, n) {
        this.$el = e(n);
        this._init(t)
    };
    e.JMSlideshow.defaults = {
        jmpressOpts: {
            stepSelector: ".portfolio-step",
            viewPort: {
                height: 380,
                width: 620,
                maxScale: 1
            },
            fullscreen: !1,
            hash: {
                use: !1
            },
            mouse: {
                clickSelects: !1
            },
            keyboard: {
                use: !1
            },
            animation: {
                transitionDuration: "1s"
            }
        },
        arrows: !0,
        dots: !0,
        bgColorSpeed: "1s",
        autoplay: !1,
        interval: 3500
    };
    e.JMSlideshow.prototype = {
        _init: function(t) {
            this.options = e.extend(!0, {},
            e.JMSlideshow.defaults, t);
            this.$slides = e("#jms-slideshow").children("div");
            this.slidesCount = this.$slides.length;
            this.colors = e.map(this.$slides,
            function(t, n) {
                return e(t).data("color")
            }).join(" ");
            this._layout();
            this._initImpress();
            if (this.support) {
                this._loadEvents();
                this.options.autoplay && this._startSlideshow()
            }
        },
        _layout: function() {
            this.$slides.each(function(t) {
                e(this).addClass("jmstep" + (t + 1))
            });
            this.$jmsWrapper = this.$slides.wrapAll('<div class="jms-wrapper"/>').parent();
            this.$jmsWrapper.css({
                "-webkit-transition-duration": this.options.bgColorSpeed,
                "-moz-transition-duration": this.options.bgColorSpeed,
                "-ms-transition-duration": this.options.bgColorSpeed,
                "-o-transition-duration": this.options.bgColorSpeed,
                "transition-duration": this.options.bgColorSpeed
            });
            if (this.options.arrows) {
                this.$arrows = e('<nav class="jms-arrows"></nav>');
                if (this.slidesCount > 1) {
                    this.$arrowPrev = e('<span class="jms-arrows-prev"/>').appendTo(this.$arrows);
                    this.$arrowNext = e('<span class="jms-arrows-next"/>').appendTo(this.$arrows)
                }
                this.$el.append(this.$arrows)
            }
            if (this.options.dots) {
                this.$dots = e('<nav class="jms-dots"></nav>');
                for (var t = this.slidesCount + 1; --t;) this.$dots.append(t === this.slidesCount ? '<span class="jms-dots-current"/>': "<span/>");
                if (this.options.jmpressOpts.start) {
                    this.$start = this.$jmsWrapper.find(this.options.jmpressOpts.start),
                    idxSelected = 0;
                    this.$start.length ? idxSelected = this.$start.index() : this.options.jmpressOpts.start = null;
                    this.$dots.children().removeClass("jms-dots-current").eq(idxSelected).addClass("jms-dots-current")
                }
                this.$el.append(this.$dots)
            }
        },
        _initImpress: function() {
            var e = this;
            this.$jmsWrapper.jmpress(this.options.jmpressOpts);
            this.support = !this.$jmsWrapper.hasClass("not-supported");
            if (!this.support) {
                this.$arrows && this.$arrows.remove();
                this.$dots && this.$dots.remove();
                return ! 1
            }
            this.$jmsWrapper.jmpress("setActive",
            function(t, n) {
                e.options.dots && e.$dots.children().removeClass("jms-dots-current").eq(t.index()).addClass("jms-dots-current");
                this.removeClass(e.colors);
                this.addClass(t.data("color"))
            });
            this.$jmsWrapper.addClass(this.$jmsWrapper.jmpress("active").data("color"))
        },
        _startSlideshow: function() {
            var e = this;
            this.slideshow = setTimeout(function() {
                e.$jmsWrapper.jmpress("next");
                e.options.autoplay && e._startSlideshow()
            },
            this.options.interval)
        },
        _stopSlideshow: function() {
            if (this.options.autoplay) {
                clearTimeout(this.slideshow);
                this.options.autoplay = !1
            }
        },
        _loadEvents: function() {
            var t = this;
            if (this.$arrowPrev && this.$arrowNext) {
                this.$arrowPrev.on("click.jmslideshow",
                function(e) {
                    t._stopSlideshow();
                    t.$jmsWrapper.jmpress("prev");
                    return ! 1
                });
                this.$arrowNext.on("click.jmslideshow",
                function(e) {
                    t._stopSlideshow();
                    t.$jmsWrapper.jmpress("next");
                    return ! 1
                })
            }
            this.$dots && this.$dots.children().on("click.jmslideshow",
            function(n) {
                t._stopSlideshow();
                t.$jmsWrapper.jmpress("goTo", ".jmstep" + (e(this).index() + 1));
                return ! 1
            });
            this.$jmsWrapper.on("touchend.jmslideshow",
            function() {
                t._stopSlideshow()
            })
        }
    };
    var n = function(e) {
        this.console && console.error(e)
    };
    e.fn.jmslideshow = function(t) {
        if (typeof t == "string") {
            var r = Array.prototype.slice.call(arguments, 1);
            this.each(function() {
                var i = e.data(this, "jmslideshow");
                if (!i) {
                    n("cannot call methods on jmslideshow prior to initialization; attempted to call method '" + t + "'");
                    return
                }
                if (!e.isFunction(i[t]) || t.charAt(0) === "_") {
                    n("no such method '" + t + "' for jmslideshow instance");
                    return
                }
                i[t].apply(i, r)
            })
        } else this.each(function() {
            var n = e.data(this, "jmslideshow");
            n || e.data(this, "jmslideshow", new e.JMSlideshow(t, this))
        });
        return this
    }
})(jQuery);