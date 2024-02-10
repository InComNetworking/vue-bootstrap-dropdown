import { computed as R, unref as B, ref as H, shallowRef as Ot, watch as G, getCurrentScope as At, onScopeDispose as Rt, shallowReadonly as D, openBlock as I, createElementBlock as X, normalizeClass as N, createCommentVNode as K, createElementVNode as U, renderSlot as Tt } from "vue";
const nt = Math.min, F = Math.max, $ = Math.round, E = (t) => ({
  x: t,
  y: t
});
function at(t) {
  return t.split("-")[0];
}
function Et(t) {
  return t.split("-")[1];
}
function Lt(t) {
  return t === "x" ? "y" : "x";
}
function Pt(t) {
  return t === "y" ? "height" : "width";
}
function ft(t) {
  return ["top", "bottom"].includes(at(t)) ? "y" : "x";
}
function Dt(t) {
  return Lt(ft(t));
}
function ut(t) {
  return {
    ...t,
    top: t.y,
    left: t.x,
    right: t.x + t.width,
    bottom: t.y + t.height
  };
}
function ot(t, e, o) {
  let {
    reference: n,
    floating: i
  } = t;
  const r = ft(e), s = Dt(e), l = Pt(s), a = at(e), c = r === "y", f = n.x + n.width / 2 - i.width / 2, u = n.y + n.height / 2 - i.height / 2, p = n[l] / 2 - i[l] / 2;
  let d;
  switch (a) {
    case "top":
      d = {
        x: f,
        y: n.y - i.height
      };
      break;
    case "bottom":
      d = {
        x: f,
        y: n.y + n.height
      };
      break;
    case "right":
      d = {
        x: n.x + n.width,
        y: u
      };
      break;
    case "left":
      d = {
        x: n.x - i.width,
        y: u
      };
      break;
    default:
      d = {
        x: n.x,
        y: n.y
      };
  }
  switch (Et(e)) {
    case "start":
      d[s] -= p * (o && c ? -1 : 1);
      break;
    case "end":
      d[s] += p * (o && c ? -1 : 1);
      break;
  }
  return d;
}
const kt = async (t, e, o) => {
  const {
    placement: n = "bottom",
    strategy: i = "absolute",
    middleware: r = [],
    platform: s
  } = o, l = r.filter(Boolean), a = await (s.isRTL == null ? void 0 : s.isRTL(e));
  let c = await s.getElementRects({
    reference: t,
    floating: e,
    strategy: i
  }), {
    x: f,
    y: u
  } = ot(c, n, a), p = n, d = {}, g = 0;
  for (let h = 0; h < l.length; h++) {
    const {
      name: x,
      fn: P
    } = l[h], {
      x: b,
      y: C,
      data: Y,
      reset: S
    } = await P({
      x: f,
      y: u,
      initialPlacement: n,
      placement: p,
      strategy: i,
      middlewareData: d,
      rects: c,
      platform: s,
      elements: {
        reference: t,
        floating: e
      }
    });
    f = b != null ? b : f, u = C != null ? C : u, d = {
      ...d,
      [x]: {
        ...d[x],
        ...Y
      }
    }, S && g <= 50 && (g++, typeof S == "object" && (S.placement && (p = S.placement), S.rects && (c = S.rects === !0 ? await s.getElementRects({
      reference: t,
      floating: e,
      strategy: i
    }) : S.rects), {
      x: f,
      y: u
    } = ot(c, p, a)), h = -1);
  }
  return {
    x: f,
    y: u,
    placement: p,
    strategy: i,
    middlewareData: d
  };
};
function O(t) {
  return J(t) ? (t.nodeName || "").toLowerCase() : "#document";
}
function w(t) {
  var e;
  return (t == null || (e = t.ownerDocument) == null ? void 0 : e.defaultView) || window;
}
function L(t) {
  var e;
  return (e = (J(t) ? t.ownerDocument : t.document) || window.document) == null ? void 0 : e.documentElement;
}
function J(t) {
  return t instanceof Node || t instanceof w(t).Node;
}
function A(t) {
  return t instanceof Element || t instanceof w(t).Element;
}
function v(t) {
  return t instanceof HTMLElement || t instanceof w(t).HTMLElement;
}
function it(t) {
  return typeof ShadowRoot > "u" ? !1 : t instanceof ShadowRoot || t instanceof w(t).ShadowRoot;
}
function _(t) {
  const {
    overflow: e,
    overflowX: o,
    overflowY: n,
    display: i
  } = y(t);
  return /auto|scroll|overlay|hidden|clip/.test(e + n + o) && !["inline", "contents"].includes(i);
}
function Mt(t) {
  return ["table", "td", "th"].includes(O(t));
}
function Q(t) {
  const e = Z(), o = y(t);
  return o.transform !== "none" || o.perspective !== "none" || (o.containerType ? o.containerType !== "normal" : !1) || !e && (o.backdropFilter ? o.backdropFilter !== "none" : !1) || !e && (o.filter ? o.filter !== "none" : !1) || ["transform", "perspective", "filter"].some((n) => (o.willChange || "").includes(n)) || ["paint", "layout", "strict", "content"].some((n) => (o.contain || "").includes(n));
}
function dt(t) {
  let e = M(t);
  for (; v(e) && !j(e); ) {
    if (Q(e))
      return e;
    e = M(e);
  }
  return null;
}
function Z() {
  return typeof CSS > "u" || !CSS.supports ? !1 : CSS.supports("-webkit-backdrop-filter", "none");
}
function j(t) {
  return ["html", "body", "#document"].includes(O(t));
}
function y(t) {
  return w(t).getComputedStyle(t);
}
function z(t) {
  return A(t) ? {
    scrollLeft: t.scrollLeft,
    scrollTop: t.scrollTop
  } : {
    scrollLeft: t.pageXOffset,
    scrollTop: t.pageYOffset
  };
}
function M(t) {
  if (O(t) === "html")
    return t;
  const e = t.assignedSlot || t.parentNode || it(t) && t.host || L(t);
  return it(e) ? e.host : e;
}
function mt(t) {
  const e = M(t);
  return j(e) ? t.ownerDocument ? t.ownerDocument.body : t.body : v(e) && _(e) ? e : mt(e);
}
function q(t, e, o) {
  var n;
  e === void 0 && (e = []), o === void 0 && (o = !0);
  const i = mt(t), r = i === ((n = t.ownerDocument) == null ? void 0 : n.body), s = w(i);
  return r ? e.concat(s, s.visualViewport || [], _(i) ? i : [], s.frameElement && o ? q(s.frameElement) : []) : e.concat(i, q(i, [], o));
}
function ht(t) {
  const e = y(t);
  let o = parseFloat(e.width) || 0, n = parseFloat(e.height) || 0;
  const i = v(t), r = i ? t.offsetWidth : o, s = i ? t.offsetHeight : n, l = $(o) !== r || $(n) !== s;
  return l && (o = r, n = s), {
    width: o,
    height: n,
    $: l
  };
}
function pt(t) {
  return A(t) ? t : t.contextElement;
}
function k(t) {
  const e = pt(t);
  if (!v(e))
    return E(1);
  const o = e.getBoundingClientRect(), {
    width: n,
    height: i,
    $: r
  } = ht(e);
  let s = (r ? $(o.width) : o.width) / n, l = (r ? $(o.height) : o.height) / i;
  return (!s || !Number.isFinite(s)) && (s = 1), (!l || !Number.isFinite(l)) && (l = 1), {
    x: s,
    y: l
  };
}
const Bt = /* @__PURE__ */ E(0);
function gt(t) {
  const e = w(t);
  return !Z() || !e.visualViewport ? Bt : {
    x: e.visualViewport.offsetLeft,
    y: e.visualViewport.offsetTop
  };
}
function Ht(t, e, o) {
  return e === void 0 && (e = !1), !o || e && o !== w(t) ? !1 : e;
}
function V(t, e, o, n) {
  e === void 0 && (e = !1), o === void 0 && (o = !1);
  const i = t.getBoundingClientRect(), r = pt(t);
  let s = E(1);
  e && (n ? A(n) && (s = k(n)) : s = k(t));
  const l = Ht(r, o, n) ? gt(r) : E(0);
  let a = (i.left + l.x) / s.x, c = (i.top + l.y) / s.y, f = i.width / s.x, u = i.height / s.y;
  if (r) {
    const p = w(r), d = n && A(n) ? w(n) : n;
    let g = p.frameElement;
    for (; g && n && d !== p; ) {
      const h = k(g), x = g.getBoundingClientRect(), P = y(g), b = x.left + (g.clientLeft + parseFloat(P.paddingLeft)) * h.x, C = x.top + (g.clientTop + parseFloat(P.paddingTop)) * h.y;
      a *= h.x, c *= h.y, f *= h.x, u *= h.y, a += b, c += C, g = w(g).frameElement;
    }
  }
  return ut({
    width: f,
    height: u,
    x: a,
    y: c
  });
}
const Nt = [":popover-open", ":modal"];
function wt(t) {
  let e = !1, o = 0, n = 0;
  function i(r) {
    try {
      e = e || t.matches(r);
    } catch {
    }
  }
  if (Nt.forEach((r) => {
    i(r);
  }), e) {
    const r = dt(t);
    if (r) {
      const s = r.getBoundingClientRect();
      o = s.x, n = s.y;
    }
  }
  return [e, o, n];
}
function Ft(t) {
  let {
    elements: e,
    rect: o,
    offsetParent: n,
    strategy: i
  } = t;
  const r = L(n), [s] = e ? wt(e.floating) : [!1];
  if (n === r || s)
    return o;
  let l = {
    scrollLeft: 0,
    scrollTop: 0
  }, a = E(1);
  const c = E(0), f = v(n);
  if ((f || !f && i !== "fixed") && ((O(n) !== "body" || _(r)) && (l = z(n)), v(n))) {
    const u = V(n);
    a = k(n), c.x = u.x + n.clientLeft, c.y = u.y + n.clientTop;
  }
  return {
    width: o.width * a.x,
    height: o.height * a.y,
    x: o.x * a.x - l.scrollLeft * a.x + c.x,
    y: o.y * a.y - l.scrollTop * a.y + c.y
  };
}
function Vt(t) {
  return Array.from(t.getClientRects());
}
function yt(t) {
  return V(L(t)).left + z(t).scrollLeft;
}
function Wt(t) {
  const e = L(t), o = z(t), n = t.ownerDocument.body, i = F(e.scrollWidth, e.clientWidth, n.scrollWidth, n.clientWidth), r = F(e.scrollHeight, e.clientHeight, n.scrollHeight, n.clientHeight);
  let s = -o.scrollLeft + yt(t);
  const l = -o.scrollTop;
  return y(n).direction === "rtl" && (s += F(e.clientWidth, n.clientWidth) - i), {
    width: i,
    height: r,
    x: s,
    y: l
  };
}
function _t(t, e) {
  const o = w(t), n = L(t), i = o.visualViewport;
  let r = n.clientWidth, s = n.clientHeight, l = 0, a = 0;
  if (i) {
    r = i.width, s = i.height;
    const c = Z();
    (!c || c && e === "fixed") && (l = i.offsetLeft, a = i.offsetTop);
  }
  return {
    width: r,
    height: s,
    x: l,
    y: a
  };
}
function Yt(t, e) {
  const o = V(t, !0, e === "fixed"), n = o.top + t.clientTop, i = o.left + t.clientLeft, r = v(t) ? k(t) : E(1), s = t.clientWidth * r.x, l = t.clientHeight * r.y, a = i * r.x, c = n * r.y;
  return {
    width: s,
    height: l,
    x: a,
    y: c
  };
}
function st(t, e, o) {
  let n;
  if (e === "viewport")
    n = _t(t, o);
  else if (e === "document")
    n = Wt(L(t));
  else if (A(e))
    n = Yt(e, o);
  else {
    const i = gt(t);
    n = {
      ...e,
      x: e.x - i.x,
      y: e.y - i.y
    };
  }
  return ut(n);
}
function vt(t, e) {
  const o = M(t);
  return o === e || !A(o) || j(o) ? !1 : y(o).position === "fixed" || vt(o, e);
}
function It(t, e) {
  const o = e.get(t);
  if (o)
    return o;
  let n = q(t, [], !1).filter((l) => A(l) && O(l) !== "body"), i = null;
  const r = y(t).position === "fixed";
  let s = r ? M(t) : t;
  for (; A(s) && !j(s); ) {
    const l = y(s), a = Q(s);
    !a && l.position === "fixed" && (i = null), (r ? !a && !i : !a && l.position === "static" && !!i && ["absolute", "fixed"].includes(i.position) || _(s) && !a && vt(t, s)) ? n = n.filter((f) => f !== s) : i = l, s = M(s);
  }
  return e.set(t, n), n;
}
function Xt(t) {
  let {
    element: e,
    boundary: o,
    rootBoundary: n,
    strategy: i
  } = t;
  const s = [...o === "clippingAncestors" ? It(e, this._c) : [].concat(o), n], l = s[0], a = s.reduce((c, f) => {
    const u = st(e, f, i);
    return c.top = F(u.top, c.top), c.right = nt(u.right, c.right), c.bottom = nt(u.bottom, c.bottom), c.left = F(u.left, c.left), c;
  }, st(e, l, i));
  return {
    width: a.right - a.left,
    height: a.bottom - a.top,
    x: a.left,
    y: a.top
  };
}
function $t(t) {
  const {
    width: e,
    height: o
  } = ht(t);
  return {
    width: e,
    height: o
  };
}
function jt(t, e, o, n) {
  const i = v(e), r = L(e), s = o === "fixed", l = V(t, !0, s, e);
  let a = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const c = E(0);
  if (i || !i && !s)
    if ((O(e) !== "body" || _(r)) && (a = z(e)), i) {
      const h = V(e, !0, s, e);
      c.x = h.x + e.clientLeft, c.y = h.y + e.clientTop;
    } else
      r && (c.x = yt(r));
  let f = l.left + a.scrollLeft - c.x, u = l.top + a.scrollTop - c.y;
  const [p, d, g] = wt(n);
  return p && (f += d, u += g, i && (f += e.clientLeft, u += e.clientTop)), {
    x: f,
    y: u,
    width: l.width,
    height: l.height
  };
}
function rt(t, e) {
  return !v(t) || y(t).position === "fixed" ? null : e ? e(t) : t.offsetParent;
}
function xt(t, e) {
  const o = w(t);
  if (!v(t))
    return o;
  let n = rt(t, e);
  for (; n && Mt(n) && y(n).position === "static"; )
    n = rt(n, e);
  return n && (O(n) === "html" || O(n) === "body" && y(n).position === "static" && !Q(n)) ? o : n || dt(t) || o;
}
const zt = async function(t) {
  const e = this.getOffsetParent || xt, o = this.getDimensions;
  return {
    reference: jt(t.reference, await e(t.floating), t.strategy, t.floating),
    floating: {
      x: 0,
      y: 0,
      ...await o(t.floating)
    }
  };
};
function Gt(t) {
  return y(t).direction === "rtl";
}
const Kt = {
  convertOffsetParentRelativeRectToViewportRelativeRect: Ft,
  getDocumentElement: L,
  getClippingRect: Xt,
  getOffsetParent: xt,
  getElementRects: zt,
  getClientRects: Vt,
  getDimensions: $t,
  getScale: k,
  isElement: A,
  isRTL: Gt
}, Ut = (t, e, o) => {
  const n = /* @__PURE__ */ new Map(), i = {
    platform: Kt,
    ...o
  }, r = {
    ...i.platform,
    _c: n
  };
  return kt(t, e, {
    ...i,
    platform: r
  });
};
function qt(t) {
  return t != null && typeof t == "object" && "$el" in t;
}
function lt(t) {
  if (qt(t)) {
    const e = t.$el;
    return J(e) && O(e) === "#comment" ? null : e;
  }
  return t;
}
function bt(t) {
  return typeof window > "u" ? 1 : (t.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function ct(t, e) {
  const o = bt(t);
  return Math.round(e * o) / o;
}
function Jt(t, e, o) {
  o === void 0 && (o = {});
  const n = o.whileElementsMounted, i = R(() => {
    var m;
    return (m = B(o.open)) != null ? m : !0;
  }), r = R(() => B(o.middleware)), s = R(() => {
    var m;
    return (m = B(o.placement)) != null ? m : "bottom";
  }), l = R(() => {
    var m;
    return (m = B(o.strategy)) != null ? m : "absolute";
  }), a = R(() => {
    var m;
    return (m = B(o.transform)) != null ? m : !0;
  }), c = R(() => lt(t.value)), f = R(() => lt(e.value)), u = H(0), p = H(0), d = H(l.value), g = H(s.value), h = Ot({}), x = H(!1), P = R(() => {
    const m = {
      position: d.value,
      left: "0",
      top: "0"
    };
    if (!f.value)
      return m;
    const tt = ct(f.value, u.value), et = ct(f.value, p.value);
    return a.value ? {
      ...m,
      transform: "translate(" + tt + "px, " + et + "px)",
      ...bt(f.value) >= 1.5 && {
        willChange: "transform"
      }
    } : {
      position: d.value,
      left: tt + "px",
      top: et + "px"
    };
  });
  let b;
  function C() {
    c.value == null || f.value == null || Ut(c.value, f.value, {
      middleware: r.value,
      placement: s.value,
      strategy: l.value
    }).then((m) => {
      u.value = m.x, p.value = m.y, d.value = m.strategy, g.value = m.placement, h.value = m.middlewareData, x.value = !0;
    });
  }
  function Y() {
    typeof b == "function" && (b(), b = void 0);
  }
  function S() {
    if (Y(), n === void 0) {
      C();
      return;
    }
    if (c.value != null && f.value != null) {
      b = n(c.value, f.value, C);
      return;
    }
  }
  function St() {
    i.value || (x.value = !1);
  }
  return G([r, s, l], C, {
    flush: "sync"
  }), G([c, f], S, {
    flush: "sync"
  }), G(i, St, {
    flush: "sync"
  }), At() && Rt(Y), {
    x: D(u),
    y: D(p),
    strategy: D(d),
    placement: D(g),
    middlewareData: D(h),
    isPositioned: D(x),
    floatingStyles: P,
    update: C
  };
}
const Qt = (t, e) => {
  const o = t.__vccOpts || t;
  for (const [n, i] of e)
    o[n] = i;
  return o;
};
var Zt = 0, te = function() {
  return "dropdown-" + Zt++;
}, ee = [
  "auto",
  "auto-start",
  "auto-end",
  "top",
  "top-start",
  "top-end",
  "bottom",
  "bottom-start",
  "bottom-end",
  "right",
  "right-start",
  "right-end",
  "left",
  "left-start",
  "left-end"
], W = ["click"];
(window.ontouchstart || navigator.msMaxTouchPoints > 0) && W.push("touchstart");
var T = [], Ct = function(t) {
  for (var e in T) {
    var o = T[e].el, n = T[e].fn;
    t.target !== o && !o.contains(t.target) && ne(n, t);
  }
}, ne = function(t, e) {
  !t || setTimeout(function() {
    t(e);
  }, 10);
}, oe = function() {
  for (var t in W)
    document.addEventListener(W[t], Ct);
}, ie = function() {
  if (!(T.length > 0))
    for (var t in W)
      document.removeEventListener(W[t], Ct);
};
const se = {
  name: "bootstrap-dropdown",
  data() {
    return {
      isShow: !1,
      isManualHide: !1
    };
  },
  props: ["title", "placement", "btn-class", "btn-split", "dropdown-class", "noAutoHide"],
  emits: ["hidden", "show"],
  watch: {
    isShow: function(t) {
      return t ? this.$emit("show") : this.$emit("hidden");
    }
  },
  computed: {
    dropdownPointer: function() {
      return this;
    },
    dropdownClassComputed: function() {
      var t = "";
      return this.isShow && (t = t + " show"), this.dropdownClass && (t = t + " " + this.dropdownClass), t;
    }
  },
  methods: {
    hide: function() {
      this.isManualHide = !0;
    },
    switchState: function() {
      if (!(this.noAutoHide && this.isManualHide !== !0 && this.isShow)) {
        this.isShow = !this.isShow, this.isManualHide = !1;
        var t = "bottom-start";
        ee.indexOf(this.placement) !== -1 && (t = this.placement), this.isShow && Jt(this.$refs.button, this.$refs.popup, {
          placement: t
        });
      }
    }
  },
  beforeUnmount() {
    for (var t in T)
      T[t].el === this.$el && T.splice(t, 1);
    ie();
  },
  mounted() {
    oe();
    var t = this;
    T.push({
      el: this.$el,
      fn: function() {
        t.isShow = !1;
      }
    });
  },
  created: function() {
    this.id = te();
  }
}, re = ["id", "aria-expanded", "innerHTML"], le = { class: "btn-group" }, ce = ["id", "innerHTML"], ae = ["aria-expanded"], fe = /* @__PURE__ */ U("span", { class: "visually-hidden" }, "Toggle Dropdown", -1), ue = [
  fe
], de = ["aria-labelledby"];
function me(t, e, o, n, i, r) {
  return I(), X("div", {
    class: N(["dropdown", { show: i.isShow }])
  }, [
    t.btnSplit ? K("", !0) : (I(), X("button", {
      key: 0,
      class: N(["btn dropdown-toggle", t.btnClass]),
      type: "button",
      "data-toggle": "dropdown",
      "aria-haspopup": "true",
      id: t.id,
      ref: "button",
      onClick: e[0] || (e[0] = (...s) => r.switchState && r.switchState(...s)),
      "aria-expanded": i.isShow,
      innerHTML: o.title
    }, null, 10, re)),
    U("div", le, [
      t.btnSplit ? (I(), X("button", {
        key: 0,
        class: N(["btn", t.btnClass]),
        type: "button",
        "data-toggle": "dropdown",
        "aria-haspopup": "true",
        id: t.id,
        ref: "button",
        innerHTML: o.title
      }, null, 10, ce)) : K("", !0),
      t.btnSplit ? (I(), X("button", {
        key: 1,
        class: N(["btn dropdown-toggle dropdown-toggle-split", t.btnClass]),
        type: "button",
        "data-toggle": "dropdown",
        "aria-haspopup": "true",
        "aria-expanded": i.isShow,
        onClick: e[1] || (e[1] = (...s) => r.switchState && r.switchState(...s))
      }, ue, 10, ae)) : K("", !0)
    ]),
    U("div", {
      class: N(["dropdown-menu", r.dropdownClassComputed]),
      ref: "popup",
      "data-bs-popper": "static",
      "aria-labelledby": t.id,
      onClick: e[2] || (e[2] = (...s) => r.switchState && r.switchState(...s))
    }, [
      Tt(t.$slots, "default", { dropdown: r.dropdownPointer })
    ], 10, de)
  ], 2);
}
const pe = /* @__PURE__ */ Qt(se, [["render", me]]);
export {
  pe as default
};
