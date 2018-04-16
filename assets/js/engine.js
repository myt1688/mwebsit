(function() {
    //添加云
    function n() {
        var e = window.innerWidth,
        t = window.innerHeight,
        n = e / 100;
        for (var r = $(".cloud").length ? $(".cloud").length: 0; r < n; r++) {
            var i = Math.ceil(Math.random() * e - 200),
            s = Math.ceil(Math.random() * t),
            o = Math.random() + .05,
            u = "cloud_" + r;
            $("#sky").append('<div class="cloud ' + u + '"></div>');
            $("." + u).css({
                position: "absolute",
                left: i,
                top: s,
                transform: "scale(" + o + ")",
                "-ms-transform": "scale(" + o + ")",
                "-moz-transform": "scale(" + o + ")",
                "-webkit-transform": "scale(" + o + ")",
                "-o-transform": "scale(" + o + ")"
            });
            $("." + u).plaxify({
                xRange: o * 23,
                yRange: o * 24,
                invert: !0
            })
        }
    }
    //添加飞机
    function r() {
        $("#sky").append('<div id="plane1"></div>		<div id="plane2"></div>		<div id="plane3"></div>   <div id="balloon"></div>');
        var e = Math.ceil(Math.random() * window.innerHeight),
        t = Math.floor(Math.random() * 6001 + 2e3),
        n = t * 1e-4;
        $("#plane1").css({
            bottom: n * 10 + "%",
            transform: "scale(" + n + ")",
            "-ms-transform": "scale(" + n + ")",
            "-moz-transform": "scale(" + n + ")",
            "-webkit-transform": "scale(" + n + ")",
            "-o-transform": "scale(" + n + ")"
        });
        n = t * 8e-5;
        $("#plane2").css({
            transform: "scale(" + n + ")",
            "-ms-transform": "scale(" + n + ")",
            "-moz-transform": "scale(" + n + ")",
            "-webkit-transform": "scale(" + n + ")",
            "-o-transform": "scale(" + n + ")"
        });
        n = t * 6e-5;
        $("#plane3").css({
            transform: "scale(" + n + ")",
            "-ms-transform": "scale(" + n + ")",
            "-moz-transform": "scale(" + n + ")",
            "-webkit-transform": "scale(" + n + ")",
            "-o-transform": "scale(" + n + ")"
        })
    }
    //菜单位置图标移动位置
    function i() {
        var e = [22, 69, 120, 170],
        t = $("section.active").attr("id"),
        n;
        switch (t) {
        case "home":
            n = e[0];
            break;
        case "about":
            n = e[1];
            break;
        case "work":
            n = e[2];
            break;
        case "contact":
            n = e[3]
        }
        return n
    }

    //菜单位置图标移动动画
    function s(e) {
        $("nav span.active").animate({
            position: "absolute",
            left: e
        },
        1e3)
    }

    function o() {
        $("#impress").delay(1e3).fadeIn();
        impress().init()
    }

    //根据时间来选择背景
    var e = new Date,
    t = e.toTimeString().substring(0, 2);
    if (t >= 6 && t < 8) $("body").addClass("dawn");
    else if (t >= 17 && t < 19) $("body").addClass("sunset");
    else if (t >= 19) {
        $("body").addClass("night");
        n()
    } else t <= 7 ? $("body").addClass("night") : $("body").addClass("day");
    


    $(function() {
        n();
        $(".step").plaxify({
            xRange: 23,
            yRange: 24,
            invert: !0
        });
        $.plax.enable();
        $("#sky").animate({
            opacity: "1"
        },
        800);
        r();
        $(window).on("load",
        function() {
            // $("#loader").fadeOut();
            // $("#loader").delay(1e3).remove();
            o();
            var e = i();
            s(e);
            $(window).on("impress:stepleave",
            function() {
                var e = i();
                s(e)
            });
            $(window).on("hashchange",
            function() {
                var e = i();
                s(e)
            });
            $("#jms-slideshow").jmslideshow()
        });
        $(".infoBtn").click(function() {
            $("#overlay").fadeIn()
        });
        $(".btn.day").click(function() {
            $("#overlay").fadeOut();
            $("body").removeClass("night").removeClass("sunset").removeClass("dawn").addClass("day")
        });
        $(".btn.night").click(function() {
            $("#overlay").fadeOut();
            $("body").removeClass("day").removeClass("sunset").removeClass("dawn").addClass("night")
        });
        $(".btn.dawn").click(function() {
            $("#overlay").fadeOut();
            $("body").removeClass("day").removeClass("sunset").removeClass("night").addClass("dawn")
        });
        $(".btn.sunset").click(function() {
            $("#overlay").fadeOut();
            $("body").removeClass("day").removeClass("night").removeClass("dawn").addClass("sunset")
        })
    })
})();