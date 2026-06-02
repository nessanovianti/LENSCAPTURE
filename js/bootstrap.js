if (typeof jQuery === "undefined") {
    throw new Error("Bootstrap's JavaScript requires jQuery");
}

+(function (a) {
    "use strict";
    var b = a.fn.jquery.split(" ")[0].split(".");
    if ((b[0] < 2 && b[1] < 9) || (1 == b[0] && 9 == b[1] && b[2] < 1) || b[0] >= 4) {
        throw new Error("Bootstrap's JavaScript requires at least jQuery v1.9.1 but less than v4.0.0");
    }
})(jQuery);

+(function (a) {
    "use strict";

    function b(b) {
        return this.each(function () {
            var d = a(this),
                e = d.data("bs.collapse"),
                f = a.extend({}, c.DEFAULTS, d.data(), "object" == typeof b && b);
            !e && f.toggle && /show|hide/.test(b) && (f.toggle = !1);
            e || d.data("bs.collapse", (e = new c(this, f)));
            if (typeof b == "string") e[b]();
        });
    }

    var c = function (b, d) {
        this.$element = a(b);
        this.options = a.extend({}, c.DEFAULTS, d);
        this.$trigger = a(
            '[data-toggle="collapse"][href="#' + b.id + '"],[data-toggle="collapse"][data-target="#' + b.id + '"]'
        );
        this.transitioning = null;
        if (this.options.parent) {
            this.$parent = this.getParent();
        } else {
            this.addAriaAndCollapsedClass(this.$element, this.$trigger);
        }
        if (this.options.toggle) this.toggle();
    };

    c.VERSION = "3.3.7";
    c.TRANSITION_DURATION = 350;
    c.DEFAULTS = { toggle: !0 };

    c.prototype.dimension = function () {
        var a = this.$element.hasClass("width");
        return a ? "width" : "height";
    };

    c.prototype.show = function () {
        if (!this.transitioning && !this.$element.hasClass("in")) {
            var d,
                e = this.$parent && this.$parent.children(".panel").children(".in, .collapsing");
            if (!(e && e.length && ((d = e.data("bs.collapse")), d && d.transitioning))) {
                var f = a.Event("show.bs.collapse");
                this.$element.trigger(f);
                if (!f.isDefaultPrevented()) {
                    if (e && e.length) {
                        b.call(e, "hide");
                        d || e.data("bs.collapse", null);
                    }
                    var g = this.dimension();
                    this.$element.removeClass("collapse").addClass("collapsing")[g](0).attr("aria-expanded", !0);
                    this.$trigger.removeClass("collapsed").attr("aria-expanded", !0);
                    this.transitioning = 1;
                    var h = function () {
                        this.$element.removeClass("collapsing").addClass("collapse in")[g]("");
                        this.transitioning = 0;
                        this.$element.trigger("shown.bs.collapse");
                    };
                    if (!a.support.transition) return h.call(this);
                    var i = a.camelCase(["scroll", g].join("-"));
                    this.$element
                        .one("bsTransitionEnd", a.proxy(h, this))
                        .emulateTransitionEnd(c.TRANSITION_DURATION)
                        [g](this.$element[0][i]);
                }
            }
        }
    };

    c.prototype.hide = function () {
        if (!this.transitioning && this.$element.hasClass("in")) {
            var b = a.Event("hide.bs.collapse");
            this.$element.trigger(b);
            if (!b.isDefaultPrevented()) {
                var d = this.dimension();
                this.$element[d](this.$element[d]())[0].offsetHeight;
                this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded", !1);
                this.$trigger.addClass("collapsed").attr("aria-expanded", !1);
                this.transitioning = 1;
                var e = function () {
                    this.transitioning = 0;
                    this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse");
                };
                if (!a.support.transition) return e.call(this)[d](0);
                this.$element
                    .one("bsTransitionEnd", a.proxy(e, this))
                    .emulateTransitionEnd(c.TRANSITION_DURATION)
                    [d](0);
            }
        }
    };

    c.prototype.toggle = function () {
        this[this.$element.hasClass("in") ? "hide" : "show"]();
    };

    c.prototype.getParent = function () {
        return a(this.options.parent)
            .find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]')
            .each(
                a.proxy(function (b, c) {
                    var d = a(c);
                    this.addAriaAndCollapsedClass(e(d), d);
                }, this)
            )
            .end();
    };

    c.prototype.addAriaAndCollapsedClass = function (a, b) {
        var c = a.hasClass("in");
        a.attr("aria-expanded", c);
        b.toggleClass("collapsed", !c).attr("aria-expanded", c);
    };

    function d(b) {
        var c,
            d = b.attr("data-target") || ((c = b.attr("href")) && c.replace(/.*(?=#[^\s]+$)/, ""));
        return a(d);
    }

    function e(b) {
        return b.attr("data-target") || b.attr("href");
    }

    var f = a.fn.collapse;
    a.fn.collapse = b;
    a.fn.collapse.Constructor = c;
    a.fn.collapse.noConflict = function () {
        return (a.fn.collapse = f), this;
    };

    a(document).on("click.bs.collapse.data-api", '[data-toggle="collapse"]', function (c) {
        var e = a(this);
        if (!e.attr("data-target")) c.preventDefault();
        var f = d(e),
            g = f.data("bs.collapse"),
            h = g ? "toggle" : e.data();
        b.call(f, h);
    });
})(jQuery);




//





+(function (a) {
    "use strict";

    function b() {
        var a = document.createElement("bootstrap"),
            b = {
                WebkitTransition: "webkitTransitionEnd",
                MozTransition: "transitionend",
                OTransition: "oTransitionEnd otransitionend",
                transition: "transitionend",
            };
        for (var c in b) {
            if (void 0 !== a.style[c]) return { end: b[c] };
        }
        return !1;
    }

    a.fn.emulateTransitionEnd = function (b) {
        var c = !1,
            d = this;
        a(this).one("bsTransitionEnd", function () {
            c = !0;
        });
        var e = function () {
            if (!c) a(d).trigger(a.support.transition.end);
        };
        setTimeout(e, b);
        return this;
    };

    a(function () {
        a.support.transition = b();
        if (a.support.transition) {
            a.event.special.bsTransitionEnd = {
                bindType: a.support.transition.end,
                delegateType: a.support.transition.end,
                handle: function (b) {
                    if (a(b.target).is(this)) return b.handleObj.handler.apply(this, arguments);
                },
            };
        }
    });
})(jQuery);