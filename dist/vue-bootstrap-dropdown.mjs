import { openBlock as yt, createElementBlock as wt, normalizeClass as ot, toDisplayString as Pt, createCommentVNode as kt, createElementVNode as Bt, createTextVNode as be, renderSlot as xe } from "vue";
var k = "top", $ = "bottom", L = "right", B = "left", Tt = "auto", ut = [k, $, L, B], Z = "start", ft = "end", Oe = "clippingParents", oe = "viewport", at = "popper", Ee = "reference", Jt = /* @__PURE__ */ ut.reduce(function(t, e) {
  return t.concat([e + "-" + Z, e + "-" + ft]);
}, []), ae = /* @__PURE__ */ [].concat(ut, [Tt]).reduce(function(t, e) {
  return t.concat([e, e + "-" + Z, e + "-" + ft]);
}, []), Ae = "beforeRead", Se = "read", Ce = "afterRead", De = "beforeMain", Pe = "main", ke = "afterMain", Be = "beforeWrite", Re = "write", je = "afterWrite", Te = [Ae, Se, Ce, De, Pe, ke, Be, Re, je];
function V(t) {
  return t ? (t.nodeName || "").toLowerCase() : null;
}
function j(t) {
  if (t == null)
    return window;
  if (t.toString() !== "[object Window]") {
    var e = t.ownerDocument;
    return e && e.defaultView || window;
  }
  return t;
}
function K(t) {
  var e = j(t).Element;
  return t instanceof e || t instanceof Element;
}
function T(t) {
  var e = j(t).HTMLElement;
  return t instanceof e || t instanceof HTMLElement;
}
function $t(t) {
  if (typeof ShadowRoot > "u")
    return !1;
  var e = j(t).ShadowRoot;
  return t instanceof e || t instanceof ShadowRoot;
}
function $e(t) {
  var e = t.state;
  Object.keys(e.elements).forEach(function(r) {
    var o = e.styles[r] || {}, n = e.attributes[r] || {}, a = e.elements[r];
    !T(a) || !V(a) || (Object.assign(a.style, o), Object.keys(n).forEach(function(f) {
      var s = n[f];
      s === !1 ? a.removeAttribute(f) : a.setAttribute(f, s === !0 ? "" : s);
    }));
  });
}
function Le(t) {
  var e = t.state, r = {
    popper: {
      position: e.options.strategy,
      left: "0",
      top: "0",
      margin: "0"
    },
    arrow: {
      position: "absolute"
    },
    reference: {}
  };
  return Object.assign(e.elements.popper.style, r.popper), e.styles = r, e.elements.arrow && Object.assign(e.elements.arrow.style, r.arrow), function() {
    Object.keys(e.elements).forEach(function(o) {
      var n = e.elements[o], a = e.attributes[o] || {}, f = Object.keys(e.styles.hasOwnProperty(o) ? e.styles[o] : r[o]), s = f.reduce(function(i, c) {
        return i[c] = "", i;
      }, {});
      !T(n) || !V(n) || (Object.assign(n.style, s), Object.keys(a).forEach(function(i) {
        n.removeAttribute(i);
      }));
    });
  };
}
const Me = {
  name: "applyStyles",
  enabled: !0,
  phase: "write",
  fn: $e,
  effect: Le,
  requires: ["computeStyles"]
};
function W(t) {
  return t.split("-")[0];
}
var J = Math.max, Ot = Math.min, _ = Math.round;
function Rt() {
  var t = navigator.userAgentData;
  return t != null && t.brands && Array.isArray(t.brands) ? t.brands.map(function(e) {
    return e.brand + "/" + e.version;
  }).join(" ") : navigator.userAgent;
}
function ie() {
  return !/^((?!chrome|android).)*safari/i.test(Rt());
}
function tt(t, e, r) {
  e === void 0 && (e = !1), r === void 0 && (r = !1);
  var o = t.getBoundingClientRect(), n = 1, a = 1;
  e && T(t) && (n = t.offsetWidth > 0 && _(o.width) / t.offsetWidth || 1, a = t.offsetHeight > 0 && _(o.height) / t.offsetHeight || 1);
  var f = K(t) ? j(t) : window, s = f.visualViewport, i = !ie() && r, c = (o.left + (i && s ? s.offsetLeft : 0)) / n, p = (o.top + (i && s ? s.offsetTop : 0)) / a, h = o.width / n, y = o.height / a;
  return {
    width: h,
    height: y,
    top: p,
    right: c + h,
    bottom: p + y,
    left: c,
    x: c,
    y: p
  };
}
function Lt(t) {
  var e = tt(t), r = t.offsetWidth, o = t.offsetHeight;
  return Math.abs(e.width - r) <= 1 && (r = e.width), Math.abs(e.height - o) <= 1 && (o = e.height), {
    x: t.offsetLeft,
    y: t.offsetTop,
    width: r,
    height: o
  };
}
function se(t, e) {
  var r = e.getRootNode && e.getRootNode();
  if (t.contains(e))
    return !0;
  if (r && $t(r)) {
    var o = e;
    do {
      if (o && t.isSameNode(o))
        return !0;
      o = o.parentNode || o.host;
    } while (o);
  }
  return !1;
}
function N(t) {
  return j(t).getComputedStyle(t);
}
function He(t) {
  return ["table", "td", "th"].indexOf(V(t)) >= 0;
}
function q(t) {
  return ((K(t) ? t.ownerDocument : t.document) || window.document).documentElement;
}
function Et(t) {
  return V(t) === "html" ? t : t.assignedSlot || t.parentNode || ($t(t) ? t.host : null) || q(t);
}
function Kt(t) {
  return !T(t) || N(t).position === "fixed" ? null : t.offsetParent;
}
function We(t) {
  var e = /firefox/i.test(Rt()), r = /Trident/i.test(Rt());
  if (r && T(t)) {
    var o = N(t);
    if (o.position === "fixed")
      return null;
  }
  var n = Et(t);
  for ($t(n) && (n = n.host); T(n) && ["html", "body"].indexOf(V(n)) < 0; ) {
    var a = N(n);
    if (a.transform !== "none" || a.perspective !== "none" || a.contain === "paint" || ["transform", "perspective"].indexOf(a.willChange) !== -1 || e && a.willChange === "filter" || e && a.filter && a.filter !== "none")
      return n;
    n = n.parentNode;
  }
  return null;
}
function lt(t) {
  for (var e = j(t), r = Kt(t); r && He(r) && N(r).position === "static"; )
    r = Kt(r);
  return r && (V(r) === "html" || V(r) === "body" && N(r).position === "static") ? e : r || We(t) || e;
}
function Mt(t) {
  return ["top", "bottom"].indexOf(t) >= 0 ? "x" : "y";
}
function it(t, e, r) {
  return J(t, Ot(e, r));
}
function Ve(t, e, r) {
  var o = it(t, e, r);
  return o > r ? r : o;
}
function fe() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}
function pe(t) {
  return Object.assign({}, fe(), t);
}
function ce(t, e) {
  return e.reduce(function(r, o) {
    return r[o] = t, r;
  }, {});
}
var Ne = function(e, r) {
  return e = typeof e == "function" ? e(Object.assign({}, r.rects, {
    placement: r.placement
  })) : e, pe(typeof e != "number" ? e : ce(e, ut));
};
function Fe(t) {
  var e, r = t.state, o = t.name, n = t.options, a = r.elements.arrow, f = r.modifiersData.popperOffsets, s = W(r.placement), i = Mt(s), c = [B, L].indexOf(s) >= 0, p = c ? "height" : "width";
  if (!(!a || !f)) {
    var h = Ne(n.padding, r), y = Lt(a), u = i === "y" ? k : B, b = i === "y" ? $ : L, v = r.rects.reference[p] + r.rects.reference[i] - f[i] - r.rects.popper[p], d = f[i] - r.rects.reference[i], w = lt(a), O = w ? i === "y" ? w.clientHeight || 0 : w.clientWidth || 0 : 0, E = v / 2 - d / 2, l = h[u], m = O - y[p] - h[b], g = O / 2 - y[p] / 2 + E, x = it(l, g, m), C = i;
    r.modifiersData[o] = (e = {}, e[C] = x, e.centerOffset = x - g, e);
  }
}
function Ie(t) {
  var e = t.state, r = t.options, o = r.element, n = o === void 0 ? "[data-popper-arrow]" : o;
  n != null && (typeof n == "string" && (n = e.elements.popper.querySelector(n), !n) || !se(e.elements.popper, n) || (e.elements.arrow = n));
}
const qe = {
  name: "arrow",
  enabled: !0,
  phase: "main",
  fn: Fe,
  effect: Ie,
  requires: ["popperOffsets"],
  requiresIfExists: ["preventOverflow"]
};
function et(t) {
  return t.split("-")[1];
}
var Xe = {
  top: "auto",
  right: "auto",
  bottom: "auto",
  left: "auto"
};
function Ye(t, e) {
  var r = t.x, o = t.y, n = e.devicePixelRatio || 1;
  return {
    x: _(r * n) / n || 0,
    y: _(o * n) / n || 0
  };
}
function Qt(t) {
  var e, r = t.popper, o = t.popperRect, n = t.placement, a = t.variation, f = t.offsets, s = t.position, i = t.gpuAcceleration, c = t.adaptive, p = t.roundOffsets, h = t.isFixed, y = f.x, u = y === void 0 ? 0 : y, b = f.y, v = b === void 0 ? 0 : b, d = typeof p == "function" ? p({
    x: u,
    y: v
  }) : {
    x: u,
    y: v
  };
  u = d.x, v = d.y;
  var w = f.hasOwnProperty("x"), O = f.hasOwnProperty("y"), E = B, l = k, m = window;
  if (c) {
    var g = lt(r), x = "clientHeight", C = "clientWidth";
    if (g === j(r) && (g = q(r), N(g).position !== "static" && s === "absolute" && (x = "scrollHeight", C = "scrollWidth")), g = g, n === k || (n === B || n === L) && a === ft) {
      l = $;
      var S = h && g === m && m.visualViewport ? m.visualViewport.height : g[x];
      v -= S - o.height, v *= i ? 1 : -1;
    }
    if (n === B || (n === k || n === $) && a === ft) {
      E = L;
      var A = h && g === m && m.visualViewport ? m.visualViewport.width : g[C];
      u -= A - o.width, u *= i ? 1 : -1;
    }
  }
  var D = Object.assign({
    position: s
  }, c && Xe), M = p === !0 ? Ye({
    x: u,
    y: v
  }, j(r)) : {
    x: u,
    y: v
  };
  if (u = M.x, v = M.y, i) {
    var P;
    return Object.assign({}, D, (P = {}, P[l] = O ? "0" : "", P[E] = w ? "0" : "", P.transform = (m.devicePixelRatio || 1) <= 1 ? "translate(" + u + "px, " + v + "px)" : "translate3d(" + u + "px, " + v + "px, 0)", P));
  }
  return Object.assign({}, D, (e = {}, e[l] = O ? v + "px" : "", e[E] = w ? u + "px" : "", e.transform = "", e));
}
function ze(t) {
  var e = t.state, r = t.options, o = r.gpuAcceleration, n = o === void 0 ? !0 : o, a = r.adaptive, f = a === void 0 ? !0 : a, s = r.roundOffsets, i = s === void 0 ? !0 : s, c = {
    placement: W(e.placement),
    variation: et(e.placement),
    popper: e.elements.popper,
    popperRect: e.rects.popper,
    gpuAcceleration: n,
    isFixed: e.options.strategy === "fixed"
  };
  e.modifiersData.popperOffsets != null && (e.styles.popper = Object.assign({}, e.styles.popper, Qt(Object.assign({}, c, {
    offsets: e.modifiersData.popperOffsets,
    position: e.options.strategy,
    adaptive: f,
    roundOffsets: i
  })))), e.modifiersData.arrow != null && (e.styles.arrow = Object.assign({}, e.styles.arrow, Qt(Object.assign({}, c, {
    offsets: e.modifiersData.arrow,
    position: "absolute",
    adaptive: !1,
    roundOffsets: i
  })))), e.attributes.popper = Object.assign({}, e.attributes.popper, {
    "data-popper-placement": e.placement
  });
}
const Ue = {
  name: "computeStyles",
  enabled: !0,
  phase: "beforeWrite",
  fn: ze,
  data: {}
};
var bt = {
  passive: !0
};
function Ge(t) {
  var e = t.state, r = t.instance, o = t.options, n = o.scroll, a = n === void 0 ? !0 : n, f = o.resize, s = f === void 0 ? !0 : f, i = j(e.elements.popper), c = [].concat(e.scrollParents.reference, e.scrollParents.popper);
  return a && c.forEach(function(p) {
    p.addEventListener("scroll", r.update, bt);
  }), s && i.addEventListener("resize", r.update, bt), function() {
    a && c.forEach(function(p) {
      p.removeEventListener("scroll", r.update, bt);
    }), s && i.removeEventListener("resize", r.update, bt);
  };
}
const Je = {
  name: "eventListeners",
  enabled: !0,
  phase: "write",
  fn: function() {
  },
  effect: Ge,
  data: {}
};
var Ke = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function xt(t) {
  return t.replace(/left|right|bottom|top/g, function(e) {
    return Ke[e];
  });
}
var Qe = {
  start: "end",
  end: "start"
};
function Zt(t) {
  return t.replace(/start|end/g, function(e) {
    return Qe[e];
  });
}
function Ht(t) {
  var e = j(t), r = e.pageXOffset, o = e.pageYOffset;
  return {
    scrollLeft: r,
    scrollTop: o
  };
}
function Wt(t) {
  return tt(q(t)).left + Ht(t).scrollLeft;
}
function Ze(t, e) {
  var r = j(t), o = q(t), n = r.visualViewport, a = o.clientWidth, f = o.clientHeight, s = 0, i = 0;
  if (n) {
    a = n.width, f = n.height;
    var c = ie();
    (c || !c && e === "fixed") && (s = n.offsetLeft, i = n.offsetTop);
  }
  return {
    width: a,
    height: f,
    x: s + Wt(t),
    y: i
  };
}
function _e(t) {
  var e, r = q(t), o = Ht(t), n = (e = t.ownerDocument) == null ? void 0 : e.body, a = J(r.scrollWidth, r.clientWidth, n ? n.scrollWidth : 0, n ? n.clientWidth : 0), f = J(r.scrollHeight, r.clientHeight, n ? n.scrollHeight : 0, n ? n.clientHeight : 0), s = -o.scrollLeft + Wt(t), i = -o.scrollTop;
  return N(n || r).direction === "rtl" && (s += J(r.clientWidth, n ? n.clientWidth : 0) - a), {
    width: a,
    height: f,
    x: s,
    y: i
  };
}
function Vt(t) {
  var e = N(t), r = e.overflow, o = e.overflowX, n = e.overflowY;
  return /auto|scroll|overlay|hidden/.test(r + n + o);
}
function ue(t) {
  return ["html", "body", "#document"].indexOf(V(t)) >= 0 ? t.ownerDocument.body : T(t) && Vt(t) ? t : ue(Et(t));
}
function st(t, e) {
  var r;
  e === void 0 && (e = []);
  var o = ue(t), n = o === ((r = t.ownerDocument) == null ? void 0 : r.body), a = j(o), f = n ? [a].concat(a.visualViewport || [], Vt(o) ? o : []) : o, s = e.concat(f);
  return n ? s : s.concat(st(Et(f)));
}
function jt(t) {
  return Object.assign({}, t, {
    left: t.x,
    top: t.y,
    right: t.x + t.width,
    bottom: t.y + t.height
  });
}
function tr(t, e) {
  var r = tt(t, !1, e === "fixed");
  return r.top = r.top + t.clientTop, r.left = r.left + t.clientLeft, r.bottom = r.top + t.clientHeight, r.right = r.left + t.clientWidth, r.width = t.clientWidth, r.height = t.clientHeight, r.x = r.left, r.y = r.top, r;
}
function _t(t, e, r) {
  return e === oe ? jt(Ze(t, r)) : K(e) ? tr(e, r) : jt(_e(q(t)));
}
function er(t) {
  var e = st(Et(t)), r = ["absolute", "fixed"].indexOf(N(t).position) >= 0, o = r && T(t) ? lt(t) : t;
  return K(o) ? e.filter(function(n) {
    return K(n) && se(n, o) && V(n) !== "body";
  }) : [];
}
function rr(t, e, r, o) {
  var n = e === "clippingParents" ? er(t) : [].concat(e), a = [].concat(n, [r]), f = a[0], s = a.reduce(function(i, c) {
    var p = _t(t, c, o);
    return i.top = J(p.top, i.top), i.right = Ot(p.right, i.right), i.bottom = Ot(p.bottom, i.bottom), i.left = J(p.left, i.left), i;
  }, _t(t, f, o));
  return s.width = s.right - s.left, s.height = s.bottom - s.top, s.x = s.left, s.y = s.top, s;
}
function le(t) {
  var e = t.reference, r = t.element, o = t.placement, n = o ? W(o) : null, a = o ? et(o) : null, f = e.x + e.width / 2 - r.width / 2, s = e.y + e.height / 2 - r.height / 2, i;
  switch (n) {
    case k:
      i = {
        x: f,
        y: e.y - r.height
      };
      break;
    case $:
      i = {
        x: f,
        y: e.y + e.height
      };
      break;
    case L:
      i = {
        x: e.x + e.width,
        y: s
      };
      break;
    case B:
      i = {
        x: e.x - r.width,
        y: s
      };
      break;
    default:
      i = {
        x: e.x,
        y: e.y
      };
  }
  var c = n ? Mt(n) : null;
  if (c != null) {
    var p = c === "y" ? "height" : "width";
    switch (a) {
      case Z:
        i[c] = i[c] - (e[p] / 2 - r[p] / 2);
        break;
      case ft:
        i[c] = i[c] + (e[p] / 2 - r[p] / 2);
        break;
    }
  }
  return i;
}
function pt(t, e) {
  e === void 0 && (e = {});
  var r = e, o = r.placement, n = o === void 0 ? t.placement : o, a = r.strategy, f = a === void 0 ? t.strategy : a, s = r.boundary, i = s === void 0 ? Oe : s, c = r.rootBoundary, p = c === void 0 ? oe : c, h = r.elementContext, y = h === void 0 ? at : h, u = r.altBoundary, b = u === void 0 ? !1 : u, v = r.padding, d = v === void 0 ? 0 : v, w = pe(typeof d != "number" ? d : ce(d, ut)), O = y === at ? Ee : at, E = t.rects.popper, l = t.elements[b ? O : y], m = rr(K(l) ? l : l.contextElement || q(t.elements.popper), i, p, f), g = tt(t.elements.reference), x = le({
    reference: g,
    element: E,
    strategy: "absolute",
    placement: n
  }), C = jt(Object.assign({}, E, x)), S = y === at ? C : g, A = {
    top: m.top - S.top + w.top,
    bottom: S.bottom - m.bottom + w.bottom,
    left: m.left - S.left + w.left,
    right: S.right - m.right + w.right
  }, D = t.modifiersData.offset;
  if (y === at && D) {
    var M = D[n];
    Object.keys(A).forEach(function(P) {
      var X = [L, $].indexOf(P) >= 0 ? 1 : -1, Y = [k, $].indexOf(P) >= 0 ? "y" : "x";
      A[P] += M[Y] * X;
    });
  }
  return A;
}
function nr(t, e) {
  e === void 0 && (e = {});
  var r = e, o = r.placement, n = r.boundary, a = r.rootBoundary, f = r.padding, s = r.flipVariations, i = r.allowedAutoPlacements, c = i === void 0 ? ae : i, p = et(o), h = p ? s ? Jt : Jt.filter(function(b) {
    return et(b) === p;
  }) : ut, y = h.filter(function(b) {
    return c.indexOf(b) >= 0;
  });
  y.length === 0 && (y = h);
  var u = y.reduce(function(b, v) {
    return b[v] = pt(t, {
      placement: v,
      boundary: n,
      rootBoundary: a,
      padding: f
    })[W(v)], b;
  }, {});
  return Object.keys(u).sort(function(b, v) {
    return u[b] - u[v];
  });
}
function or(t) {
  if (W(t) === Tt)
    return [];
  var e = xt(t);
  return [Zt(t), e, Zt(e)];
}
function ar(t) {
  var e = t.state, r = t.options, o = t.name;
  if (!e.modifiersData[o]._skip) {
    for (var n = r.mainAxis, a = n === void 0 ? !0 : n, f = r.altAxis, s = f === void 0 ? !0 : f, i = r.fallbackPlacements, c = r.padding, p = r.boundary, h = r.rootBoundary, y = r.altBoundary, u = r.flipVariations, b = u === void 0 ? !0 : u, v = r.allowedAutoPlacements, d = e.options.placement, w = W(d), O = w === d, E = i || (O || !b ? [xt(d)] : or(d)), l = [d].concat(E).reduce(function(Q, F) {
      return Q.concat(W(F) === Tt ? nr(e, {
        placement: F,
        boundary: p,
        rootBoundary: h,
        padding: c,
        flipVariations: b,
        allowedAutoPlacements: v
      }) : F);
    }, []), m = e.rects.reference, g = e.rects.popper, x = /* @__PURE__ */ new Map(), C = !0, S = l[0], A = 0; A < l.length; A++) {
      var D = l[A], M = W(D), P = et(D) === Z, X = [k, $].indexOf(M) >= 0, Y = X ? "width" : "height", R = pt(e, {
        placement: D,
        boundary: p,
        rootBoundary: h,
        altBoundary: y,
        padding: c
      }), H = X ? P ? L : B : P ? $ : k;
      m[Y] > g[Y] && (H = xt(H));
      var dt = xt(H), z = [];
      if (a && z.push(R[M] <= 0), s && z.push(R[H] <= 0, R[dt] <= 0), z.every(function(Q) {
        return Q;
      })) {
        S = D, C = !1;
        break;
      }
      x.set(D, z);
    }
    if (C)
      for (var vt = b ? 3 : 1, At = function(F) {
        var nt = l.find(function(mt) {
          var U = x.get(mt);
          if (U)
            return U.slice(0, F).every(function(St) {
              return St;
            });
        });
        if (nt)
          return S = nt, "break";
      }, rt = vt; rt > 0; rt--) {
        var ht = At(rt);
        if (ht === "break")
          break;
      }
    e.placement !== S && (e.modifiersData[o]._skip = !0, e.placement = S, e.reset = !0);
  }
}
const ir = {
  name: "flip",
  enabled: !0,
  phase: "main",
  fn: ar,
  requiresIfExists: ["offset"],
  data: {
    _skip: !1
  }
};
function te(t, e, r) {
  return r === void 0 && (r = {
    x: 0,
    y: 0
  }), {
    top: t.top - e.height - r.y,
    right: t.right - e.width + r.x,
    bottom: t.bottom - e.height + r.y,
    left: t.left - e.width - r.x
  };
}
function ee(t) {
  return [k, L, $, B].some(function(e) {
    return t[e] >= 0;
  });
}
function sr(t) {
  var e = t.state, r = t.name, o = e.rects.reference, n = e.rects.popper, a = e.modifiersData.preventOverflow, f = pt(e, {
    elementContext: "reference"
  }), s = pt(e, {
    altBoundary: !0
  }), i = te(f, o), c = te(s, n, a), p = ee(i), h = ee(c);
  e.modifiersData[r] = {
    referenceClippingOffsets: i,
    popperEscapeOffsets: c,
    isReferenceHidden: p,
    hasPopperEscaped: h
  }, e.attributes.popper = Object.assign({}, e.attributes.popper, {
    "data-popper-reference-hidden": p,
    "data-popper-escaped": h
  });
}
const fr = {
  name: "hide",
  enabled: !0,
  phase: "main",
  requiresIfExists: ["preventOverflow"],
  fn: sr
};
function pr(t, e, r) {
  var o = W(t), n = [B, k].indexOf(o) >= 0 ? -1 : 1, a = typeof r == "function" ? r(Object.assign({}, e, {
    placement: t
  })) : r, f = a[0], s = a[1];
  return f = f || 0, s = (s || 0) * n, [B, L].indexOf(o) >= 0 ? {
    x: s,
    y: f
  } : {
    x: f,
    y: s
  };
}
function cr(t) {
  var e = t.state, r = t.options, o = t.name, n = r.offset, a = n === void 0 ? [0, 0] : n, f = ae.reduce(function(p, h) {
    return p[h] = pr(h, e.rects, a), p;
  }, {}), s = f[e.placement], i = s.x, c = s.y;
  e.modifiersData.popperOffsets != null && (e.modifiersData.popperOffsets.x += i, e.modifiersData.popperOffsets.y += c), e.modifiersData[o] = f;
}
const ur = {
  name: "offset",
  enabled: !0,
  phase: "main",
  requires: ["popperOffsets"],
  fn: cr
};
function lr(t) {
  var e = t.state, r = t.name;
  e.modifiersData[r] = le({
    reference: e.rects.reference,
    element: e.rects.popper,
    strategy: "absolute",
    placement: e.placement
  });
}
const dr = {
  name: "popperOffsets",
  enabled: !0,
  phase: "read",
  fn: lr,
  data: {}
};
function vr(t) {
  return t === "x" ? "y" : "x";
}
function hr(t) {
  var e = t.state, r = t.options, o = t.name, n = r.mainAxis, a = n === void 0 ? !0 : n, f = r.altAxis, s = f === void 0 ? !1 : f, i = r.boundary, c = r.rootBoundary, p = r.altBoundary, h = r.padding, y = r.tether, u = y === void 0 ? !0 : y, b = r.tetherOffset, v = b === void 0 ? 0 : b, d = pt(e, {
    boundary: i,
    rootBoundary: c,
    padding: h,
    altBoundary: p
  }), w = W(e.placement), O = et(e.placement), E = !O, l = Mt(w), m = vr(l), g = e.modifiersData.popperOffsets, x = e.rects.reference, C = e.rects.popper, S = typeof v == "function" ? v(Object.assign({}, e.rects, {
    placement: e.placement
  })) : v, A = typeof S == "number" ? {
    mainAxis: S,
    altAxis: S
  } : Object.assign({
    mainAxis: 0,
    altAxis: 0
  }, S), D = e.modifiersData.offset ? e.modifiersData.offset[e.placement] : null, M = {
    x: 0,
    y: 0
  };
  if (!!g) {
    if (a) {
      var P, X = l === "y" ? k : B, Y = l === "y" ? $ : L, R = l === "y" ? "height" : "width", H = g[l], dt = H + d[X], z = H - d[Y], vt = u ? -C[R] / 2 : 0, At = O === Z ? x[R] : C[R], rt = O === Z ? -C[R] : -x[R], ht = e.elements.arrow, Q = u && ht ? Lt(ht) : {
        width: 0,
        height: 0
      }, F = e.modifiersData["arrow#persistent"] ? e.modifiersData["arrow#persistent"].padding : fe(), nt = F[X], mt = F[Y], U = it(0, x[R], Q[R]), St = E ? x[R] / 2 - vt - U - nt - A.mainAxis : At - U - nt - A.mainAxis, ve = E ? -x[R] / 2 + vt + U + mt + A.mainAxis : rt + U + mt + A.mainAxis, Ct = e.elements.arrow && lt(e.elements.arrow), he = Ct ? l === "y" ? Ct.clientTop || 0 : Ct.clientLeft || 0 : 0, Nt = (P = D == null ? void 0 : D[l]) != null ? P : 0, me = H + St - Nt - he, ge = H + ve - Nt, Ft = it(u ? Ot(dt, me) : dt, H, u ? J(z, ge) : z);
      g[l] = Ft, M[l] = Ft - H;
    }
    if (s) {
      var It, ye = l === "x" ? k : B, we = l === "x" ? $ : L, G = g[m], gt = m === "y" ? "height" : "width", qt = G + d[ye], Xt = G - d[we], Dt = [k, B].indexOf(w) !== -1, Yt = (It = D == null ? void 0 : D[m]) != null ? It : 0, zt = Dt ? qt : G - x[gt] - C[gt] - Yt + A.altAxis, Ut = Dt ? G + x[gt] + C[gt] - Yt - A.altAxis : Xt, Gt = u && Dt ? Ve(zt, G, Ut) : it(u ? zt : qt, G, u ? Ut : Xt);
      g[m] = Gt, M[m] = Gt - G;
    }
    e.modifiersData[o] = M;
  }
}
const mr = {
  name: "preventOverflow",
  enabled: !0,
  phase: "main",
  fn: hr,
  requiresIfExists: ["offset"]
};
function gr(t) {
  return {
    scrollLeft: t.scrollLeft,
    scrollTop: t.scrollTop
  };
}
function yr(t) {
  return t === j(t) || !T(t) ? Ht(t) : gr(t);
}
function wr(t) {
  var e = t.getBoundingClientRect(), r = _(e.width) / t.offsetWidth || 1, o = _(e.height) / t.offsetHeight || 1;
  return r !== 1 || o !== 1;
}
function br(t, e, r) {
  r === void 0 && (r = !1);
  var o = T(e), n = T(e) && wr(e), a = q(e), f = tt(t, n, r), s = {
    scrollLeft: 0,
    scrollTop: 0
  }, i = {
    x: 0,
    y: 0
  };
  return (o || !o && !r) && ((V(e) !== "body" || Vt(a)) && (s = yr(e)), T(e) ? (i = tt(e, !0), i.x += e.clientLeft, i.y += e.clientTop) : a && (i.x = Wt(a))), {
    x: f.left + s.scrollLeft - i.x,
    y: f.top + s.scrollTop - i.y,
    width: f.width,
    height: f.height
  };
}
function xr(t) {
  var e = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Set(), o = [];
  t.forEach(function(a) {
    e.set(a.name, a);
  });
  function n(a) {
    r.add(a.name);
    var f = [].concat(a.requires || [], a.requiresIfExists || []);
    f.forEach(function(s) {
      if (!r.has(s)) {
        var i = e.get(s);
        i && n(i);
      }
    }), o.push(a);
  }
  return t.forEach(function(a) {
    r.has(a.name) || n(a);
  }), o;
}
function Or(t) {
  var e = xr(t);
  return Te.reduce(function(r, o) {
    return r.concat(e.filter(function(n) {
      return n.phase === o;
    }));
  }, []);
}
function Er(t) {
  var e;
  return function() {
    return e || (e = new Promise(function(r) {
      Promise.resolve().then(function() {
        e = void 0, r(t());
      });
    })), e;
  };
}
function Ar(t) {
  var e = t.reduce(function(r, o) {
    var n = r[o.name];
    return r[o.name] = n ? Object.assign({}, n, o, {
      options: Object.assign({}, n.options, o.options),
      data: Object.assign({}, n.data, o.data)
    }) : o, r;
  }, {});
  return Object.keys(e).map(function(r) {
    return e[r];
  });
}
var re = {
  placement: "bottom",
  modifiers: [],
  strategy: "absolute"
};
function ne() {
  for (var t = arguments.length, e = new Array(t), r = 0; r < t; r++)
    e[r] = arguments[r];
  return !e.some(function(o) {
    return !(o && typeof o.getBoundingClientRect == "function");
  });
}
function Sr(t) {
  t === void 0 && (t = {});
  var e = t, r = e.defaultModifiers, o = r === void 0 ? [] : r, n = e.defaultOptions, a = n === void 0 ? re : n;
  return function(s, i, c) {
    c === void 0 && (c = a);
    var p = {
      placement: "bottom",
      orderedModifiers: [],
      options: Object.assign({}, re, a),
      modifiersData: {},
      elements: {
        reference: s,
        popper: i
      },
      attributes: {},
      styles: {}
    }, h = [], y = !1, u = {
      state: p,
      setOptions: function(w) {
        var O = typeof w == "function" ? w(p.options) : w;
        v(), p.options = Object.assign({}, a, p.options, O), p.scrollParents = {
          reference: K(s) ? st(s) : s.contextElement ? st(s.contextElement) : [],
          popper: st(i)
        };
        var E = Or(Ar([].concat(o, p.options.modifiers)));
        return p.orderedModifiers = E.filter(function(l) {
          return l.enabled;
        }), b(), u.update();
      },
      forceUpdate: function() {
        if (!y) {
          var w = p.elements, O = w.reference, E = w.popper;
          if (!!ne(O, E)) {
            p.rects = {
              reference: br(O, lt(E), p.options.strategy === "fixed"),
              popper: Lt(E)
            }, p.reset = !1, p.placement = p.options.placement, p.orderedModifiers.forEach(function(A) {
              return p.modifiersData[A.name] = Object.assign({}, A.data);
            });
            for (var l = 0; l < p.orderedModifiers.length; l++) {
              if (p.reset === !0) {
                p.reset = !1, l = -1;
                continue;
              }
              var m = p.orderedModifiers[l], g = m.fn, x = m.options, C = x === void 0 ? {} : x, S = m.name;
              typeof g == "function" && (p = g({
                state: p,
                options: C,
                name: S,
                instance: u
              }) || p);
            }
          }
        }
      },
      update: Er(function() {
        return new Promise(function(d) {
          u.forceUpdate(), d(p);
        });
      }),
      destroy: function() {
        v(), y = !0;
      }
    };
    if (!ne(s, i))
      return u;
    u.setOptions(c).then(function(d) {
      !y && c.onFirstUpdate && c.onFirstUpdate(d);
    });
    function b() {
      p.orderedModifiers.forEach(function(d) {
        var w = d.name, O = d.options, E = O === void 0 ? {} : O, l = d.effect;
        if (typeof l == "function") {
          var m = l({
            state: p,
            name: w,
            instance: u,
            options: E
          }), g = function() {
          };
          h.push(m || g);
        }
      });
    }
    function v() {
      h.forEach(function(d) {
        return d();
      }), h = [];
    }
    return u;
  };
}
var Cr = [Je, dr, Ue, Me, ur, ir, mr, qe, fr], Dr = /* @__PURE__ */ Sr({
  defaultModifiers: Cr
});
const Pr = (t, e) => {
  const r = t.__vccOpts || t;
  for (const [o, n] of e)
    r[o] = n;
  return r;
};
var kr = 0, Br = function() {
  return "dropdown-" + kr++;
}, Rr = [
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
], ct = ["click"];
(window.ontouchstart || navigator.msMaxTouchPoints > 0) && ct.push("touchstart");
var I = [], de = function(t) {
  for (var e in I) {
    var r = I[e].el, o = I[e].fn;
    t.target !== r && !r.contains(t.target) && jr(o, t);
  }
}, jr = function(t, e) {
  !t || setTimeout(function() {
    t(e);
  }, 10);
}, Tr = function() {
  for (var t in ct)
    document.addEventListener(ct[t], de);
}, $r = function() {
  if (!(I.length > 0))
    for (var t in ct)
      document.removeEventListener(ct[t], de);
};
const Lr = {
  name: "bootstrap-dropdown",
  data() {
    return {
      isShow: !1,
      isManualHide: !1
    };
  },
  props: ["title", "placement", "btn-class", "btn-split", "dropdown-class", "noAutoHide"],
  watch: {},
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
        this.isShow = !this.isShow;
        var t = "bottom-start";
        Rr.indexOf(this.placement) !== -1 && (t = this.placement), this.isShow && Dr(this.$refs.button, this.$refs.popup, {
          placement: t
        });
      }
    }
  },
  beforeUnmount() {
    for (var t in I)
      I[t].el === this.$el && I.splice(t, 1);
    $r();
  },
  mounted() {
    Tr();
    var t = this;
    I.push({
      el: this.$el,
      fn: function() {
        t.isShow = !1;
      }
    });
  },
  created: function() {
    this.id = Br();
  }
}, Mr = ["id", "aria-expanded"], Hr = { class: "btn-group" }, Wr = ["id"], Vr = ["aria-expanded"], Nr = /* @__PURE__ */ Bt("span", { class: "visually-hidden" }, "Toggle Dropdown", -1), Fr = [
  Nr
], Ir = ["aria-labelledby"];
function qr(t, e, r, o, n, a) {
  return yt(), wt("div", {
    class: ot(["dropdown", { show: n.isShow }])
  }, [
    t.btnSplit ? kt("", !0) : (yt(), wt("button", {
      key: 0,
      class: ot(["btn dropdown-toggle", t.btnClass]),
      type: "button",
      "data-toggle": "dropdown",
      "aria-haspopup": "true",
      id: t.id,
      ref: "button",
      onClick: e[0] || (e[0] = (...f) => a.switchState && a.switchState(...f)),
      "aria-expanded": n.isShow
    }, Pt(r.title), 11, Mr)),
    Bt("div", Hr, [
      t.btnSplit ? (yt(), wt("button", {
        key: 0,
        class: ot(["btn", t.btnClass]),
        type: "button",
        "data-toggle": "dropdown",
        "aria-haspopup": "true",
        id: t.id,
        ref: "button"
      }, Pt(r.title), 11, Wr)) : kt("", !0),
      t.btnSplit ? (yt(), wt("button", {
        key: 1,
        class: ot(["btn dropdown-toggle dropdown-toggle-split", t.btnClass]),
        type: "button",
        "data-toggle": "dropdown",
        "aria-haspopup": "true",
        "aria-expanded": n.isShow,
        onClick: e[1] || (e[1] = (...f) => a.switchState && a.switchState(...f))
      }, Fr, 10, Vr)) : kt("", !0)
    ]),
    be(" " + Pt(n.isShow) + " ", 1),
    Bt("div", {
      class: ot(["dropdown-menu", a.dropdownClassComputed]),
      ref: "popup",
      "data-bs-popper": "static",
      "aria-labelledby": t.id,
      onClick: e[2] || (e[2] = (...f) => a.switchState && a.switchState(...f))
    }, [
      xe(t.$slots, "default", { dropdown: a.dropdownPointer })
    ], 10, Ir)
  ], 2);
}
const Yr = /* @__PURE__ */ Pr(Lr, [["render", qr]]);
export {
  Yr as default
};
