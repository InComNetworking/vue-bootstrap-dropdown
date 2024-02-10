import { openBlock as wt, createElementBlock as yt, normalizeClass as ot, createCommentVNode as Dt, createElementVNode as kt, renderSlot as ye } from "vue";
var k = "top", M = "bottom", $ = "right", B = "left", jt = "auto", ct = [k, M, $, B], Z = "start", ft = "end", be = "clippingParents", ne = "viewport", at = "popper", xe = "reference", Gt = /* @__PURE__ */ ct.reduce(function(t, e) {
  return t.concat([e + "-" + Z, e + "-" + ft]);
}, []), oe = /* @__PURE__ */ [].concat(ct, [jt]).reduce(function(t, e) {
  return t.concat([e, e + "-" + Z, e + "-" + ft]);
}, []), Oe = "beforeRead", Ee = "read", Ae = "afterRead", Ce = "beforeMain", Se = "main", Pe = "afterMain", De = "beforeWrite", ke = "write", Be = "afterWrite", Re = [Oe, Ee, Ae, Ce, Se, Pe, De, ke, Be];
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
function Tt(t) {
  if (typeof ShadowRoot > "u")
    return !1;
  var e = j(t).ShadowRoot;
  return t instanceof e || t instanceof ShadowRoot;
}
function je(t) {
  var e = t.state;
  Object.keys(e.elements).forEach(function(r) {
    var o = e.styles[r] || {}, n = e.attributes[r] || {}, a = e.elements[r];
    !T(a) || !V(a) || (Object.assign(a.style, o), Object.keys(n).forEach(function(f) {
      var s = n[f];
      s === !1 ? a.removeAttribute(f) : a.setAttribute(f, s === !0 ? "" : s);
    }));
  });
}
function Te(t) {
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
      var n = e.elements[o], a = e.attributes[o] || {}, f = Object.keys(e.styles.hasOwnProperty(o) ? e.styles[o] : r[o]), s = f.reduce(function(i, u) {
        return i[u] = "", i;
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
  fn: je,
  effect: Te,
  requires: ["computeStyles"]
};
function W(t) {
  return t.split("-")[0];
}
var J = Math.max, Ot = Math.min, _ = Math.round;
function Bt() {
  var t = navigator.userAgentData;
  return t != null && t.brands && Array.isArray(t.brands) ? t.brands.map(function(e) {
    return e.brand + "/" + e.version;
  }).join(" ") : navigator.userAgent;
}
function ae() {
  return !/^((?!chrome|android).)*safari/i.test(Bt());
}
function tt(t, e, r) {
  e === void 0 && (e = !1), r === void 0 && (r = !1);
  var o = t.getBoundingClientRect(), n = 1, a = 1;
  e && T(t) && (n = t.offsetWidth > 0 && _(o.width) / t.offsetWidth || 1, a = t.offsetHeight > 0 && _(o.height) / t.offsetHeight || 1);
  var f = K(t) ? j(t) : window, s = f.visualViewport, i = !ae() && r, u = (o.left + (i && s ? s.offsetLeft : 0)) / n, p = (o.top + (i && s ? s.offsetTop : 0)) / a, h = o.width / n, w = o.height / a;
  return {
    width: h,
    height: w,
    top: p,
    right: u + h,
    bottom: p + w,
    left: u,
    x: u,
    y: p
  };
}
function Mt(t) {
  var e = tt(t), r = t.offsetWidth, o = t.offsetHeight;
  return Math.abs(e.width - r) <= 1 && (r = e.width), Math.abs(e.height - o) <= 1 && (o = e.height), {
    x: t.offsetLeft,
    y: t.offsetTop,
    width: r,
    height: o
  };
}
function ie(t, e) {
  var r = e.getRootNode && e.getRootNode();
  if (t.contains(e))
    return !0;
  if (r && Tt(r)) {
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
function $e(t) {
  return ["table", "td", "th"].indexOf(V(t)) >= 0;
}
function q(t) {
  return ((K(t) ? t.ownerDocument : t.document) || window.document).documentElement;
}
function Et(t) {
  return V(t) === "html" ? t : t.assignedSlot || t.parentNode || (Tt(t) ? t.host : null) || q(t);
}
function Jt(t) {
  return !T(t) || N(t).position === "fixed" ? null : t.offsetParent;
}
function Le(t) {
  var e = /firefox/i.test(Bt()), r = /Trident/i.test(Bt());
  if (r && T(t)) {
    var o = N(t);
    if (o.position === "fixed")
      return null;
  }
  var n = Et(t);
  for (Tt(n) && (n = n.host); T(n) && ["html", "body"].indexOf(V(n)) < 0; ) {
    var a = N(n);
    if (a.transform !== "none" || a.perspective !== "none" || a.contain === "paint" || ["transform", "perspective"].indexOf(a.willChange) !== -1 || e && a.willChange === "filter" || e && a.filter && a.filter !== "none")
      return n;
    n = n.parentNode;
  }
  return null;
}
function lt(t) {
  for (var e = j(t), r = Jt(t); r && $e(r) && N(r).position === "static"; )
    r = Jt(r);
  return r && (V(r) === "html" || V(r) === "body" && N(r).position === "static") ? e : r || Le(t) || e;
}
function $t(t) {
  return ["top", "bottom"].indexOf(t) >= 0 ? "x" : "y";
}
function it(t, e, r) {
  return J(t, Ot(e, r));
}
function He(t, e, r) {
  var o = it(t, e, r);
  return o > r ? r : o;
}
function se() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}
function fe(t) {
  return Object.assign({}, se(), t);
}
function pe(t, e) {
  return e.reduce(function(r, o) {
    return r[o] = t, r;
  }, {});
}
var We = function(e, r) {
  return e = typeof e == "function" ? e(Object.assign({}, r.rects, {
    placement: r.placement
  })) : e, fe(typeof e != "number" ? e : pe(e, ct));
};
function Ve(t) {
  var e, r = t.state, o = t.name, n = t.options, a = r.elements.arrow, f = r.modifiersData.popperOffsets, s = W(r.placement), i = $t(s), u = [B, $].indexOf(s) >= 0, p = u ? "height" : "width";
  if (!(!a || !f)) {
    var h = We(n.padding, r), w = Mt(a), c = i === "y" ? k : B, b = i === "y" ? M : $, v = r.rects.reference[p] + r.rects.reference[i] - f[i] - r.rects.popper[p], d = f[i] - r.rects.reference[i], y = lt(a), O = y ? i === "y" ? y.clientHeight || 0 : y.clientWidth || 0 : 0, E = v / 2 - d / 2, l = h[c], m = O - w[p] - h[b], g = O / 2 - w[p] / 2 + E, x = it(l, g, m), S = i;
    r.modifiersData[o] = (e = {}, e[S] = x, e.centerOffset = x - g, e);
  }
}
function Ne(t) {
  var e = t.state, r = t.options, o = r.element, n = o === void 0 ? "[data-popper-arrow]" : o;
  n != null && (typeof n == "string" && (n = e.elements.popper.querySelector(n), !n) || !ie(e.elements.popper, n) || (e.elements.arrow = n));
}
const Fe = {
  name: "arrow",
  enabled: !0,
  phase: "main",
  fn: Ve,
  effect: Ne,
  requires: ["popperOffsets"],
  requiresIfExists: ["preventOverflow"]
};
function et(t) {
  return t.split("-")[1];
}
var Ie = {
  top: "auto",
  right: "auto",
  bottom: "auto",
  left: "auto"
};
function qe(t, e) {
  var r = t.x, o = t.y, n = e.devicePixelRatio || 1;
  return {
    x: _(r * n) / n || 0,
    y: _(o * n) / n || 0
  };
}
function Kt(t) {
  var e, r = t.popper, o = t.popperRect, n = t.placement, a = t.variation, f = t.offsets, s = t.position, i = t.gpuAcceleration, u = t.adaptive, p = t.roundOffsets, h = t.isFixed, w = f.x, c = w === void 0 ? 0 : w, b = f.y, v = b === void 0 ? 0 : b, d = typeof p == "function" ? p({
    x: c,
    y: v
  }) : {
    x: c,
    y: v
  };
  c = d.x, v = d.y;
  var y = f.hasOwnProperty("x"), O = f.hasOwnProperty("y"), E = B, l = k, m = window;
  if (u) {
    var g = lt(r), x = "clientHeight", S = "clientWidth";
    if (g === j(r) && (g = q(r), N(g).position !== "static" && s === "absolute" && (x = "scrollHeight", S = "scrollWidth")), g = g, n === k || (n === B || n === $) && a === ft) {
      l = M;
      var C = h && g === m && m.visualViewport ? m.visualViewport.height : g[x];
      v -= C - o.height, v *= i ? 1 : -1;
    }
    if (n === B || (n === k || n === M) && a === ft) {
      E = $;
      var A = h && g === m && m.visualViewport ? m.visualViewport.width : g[S];
      c -= A - o.width, c *= i ? 1 : -1;
    }
  }
  var P = Object.assign({
    position: s
  }, u && Ie), L = p === !0 ? qe({
    x: c,
    y: v
  }, j(r)) : {
    x: c,
    y: v
  };
  if (c = L.x, v = L.y, i) {
    var D;
    return Object.assign({}, P, (D = {}, D[l] = O ? "0" : "", D[E] = y ? "0" : "", D.transform = (m.devicePixelRatio || 1) <= 1 ? "translate(" + c + "px, " + v + "px)" : "translate3d(" + c + "px, " + v + "px, 0)", D));
  }
  return Object.assign({}, P, (e = {}, e[l] = O ? v + "px" : "", e[E] = y ? c + "px" : "", e.transform = "", e));
}
function Xe(t) {
  var e = t.state, r = t.options, o = r.gpuAcceleration, n = o === void 0 ? !0 : o, a = r.adaptive, f = a === void 0 ? !0 : a, s = r.roundOffsets, i = s === void 0 ? !0 : s, u = {
    placement: W(e.placement),
    variation: et(e.placement),
    popper: e.elements.popper,
    popperRect: e.rects.popper,
    gpuAcceleration: n,
    isFixed: e.options.strategy === "fixed"
  };
  e.modifiersData.popperOffsets != null && (e.styles.popper = Object.assign({}, e.styles.popper, Kt(Object.assign({}, u, {
    offsets: e.modifiersData.popperOffsets,
    position: e.options.strategy,
    adaptive: f,
    roundOffsets: i
  })))), e.modifiersData.arrow != null && (e.styles.arrow = Object.assign({}, e.styles.arrow, Kt(Object.assign({}, u, {
    offsets: e.modifiersData.arrow,
    position: "absolute",
    adaptive: !1,
    roundOffsets: i
  })))), e.attributes.popper = Object.assign({}, e.attributes.popper, {
    "data-popper-placement": e.placement
  });
}
const Ye = {
  name: "computeStyles",
  enabled: !0,
  phase: "beforeWrite",
  fn: Xe,
  data: {}
};
var bt = {
  passive: !0
};
function ze(t) {
  var e = t.state, r = t.instance, o = t.options, n = o.scroll, a = n === void 0 ? !0 : n, f = o.resize, s = f === void 0 ? !0 : f, i = j(e.elements.popper), u = [].concat(e.scrollParents.reference, e.scrollParents.popper);
  return a && u.forEach(function(p) {
    p.addEventListener("scroll", r.update, bt);
  }), s && i.addEventListener("resize", r.update, bt), function() {
    a && u.forEach(function(p) {
      p.removeEventListener("scroll", r.update, bt);
    }), s && i.removeEventListener("resize", r.update, bt);
  };
}
const Ue = {
  name: "eventListeners",
  enabled: !0,
  phase: "write",
  fn: function() {
  },
  effect: ze,
  data: {}
};
var Ge = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function xt(t) {
  return t.replace(/left|right|bottom|top/g, function(e) {
    return Ge[e];
  });
}
var Je = {
  start: "end",
  end: "start"
};
function Qt(t) {
  return t.replace(/start|end/g, function(e) {
    return Je[e];
  });
}
function Lt(t) {
  var e = j(t), r = e.pageXOffset, o = e.pageYOffset;
  return {
    scrollLeft: r,
    scrollTop: o
  };
}
function Ht(t) {
  return tt(q(t)).left + Lt(t).scrollLeft;
}
function Ke(t, e) {
  var r = j(t), o = q(t), n = r.visualViewport, a = o.clientWidth, f = o.clientHeight, s = 0, i = 0;
  if (n) {
    a = n.width, f = n.height;
    var u = ae();
    (u || !u && e === "fixed") && (s = n.offsetLeft, i = n.offsetTop);
  }
  return {
    width: a,
    height: f,
    x: s + Ht(t),
    y: i
  };
}
function Qe(t) {
  var e, r = q(t), o = Lt(t), n = (e = t.ownerDocument) == null ? void 0 : e.body, a = J(r.scrollWidth, r.clientWidth, n ? n.scrollWidth : 0, n ? n.clientWidth : 0), f = J(r.scrollHeight, r.clientHeight, n ? n.scrollHeight : 0, n ? n.clientHeight : 0), s = -o.scrollLeft + Ht(t), i = -o.scrollTop;
  return N(n || r).direction === "rtl" && (s += J(r.clientWidth, n ? n.clientWidth : 0) - a), {
    width: a,
    height: f,
    x: s,
    y: i
  };
}
function Wt(t) {
  var e = N(t), r = e.overflow, o = e.overflowX, n = e.overflowY;
  return /auto|scroll|overlay|hidden/.test(r + n + o);
}
function ue(t) {
  return ["html", "body", "#document"].indexOf(V(t)) >= 0 ? t.ownerDocument.body : T(t) && Wt(t) ? t : ue(Et(t));
}
function st(t, e) {
  var r;
  e === void 0 && (e = []);
  var o = ue(t), n = o === ((r = t.ownerDocument) == null ? void 0 : r.body), a = j(o), f = n ? [a].concat(a.visualViewport || [], Wt(o) ? o : []) : o, s = e.concat(f);
  return n ? s : s.concat(st(Et(f)));
}
function Rt(t) {
  return Object.assign({}, t, {
    left: t.x,
    top: t.y,
    right: t.x + t.width,
    bottom: t.y + t.height
  });
}
function Ze(t, e) {
  var r = tt(t, !1, e === "fixed");
  return r.top = r.top + t.clientTop, r.left = r.left + t.clientLeft, r.bottom = r.top + t.clientHeight, r.right = r.left + t.clientWidth, r.width = t.clientWidth, r.height = t.clientHeight, r.x = r.left, r.y = r.top, r;
}
function Zt(t, e, r) {
  return e === ne ? Rt(Ke(t, r)) : K(e) ? Ze(e, r) : Rt(Qe(q(t)));
}
function _e(t) {
  var e = st(Et(t)), r = ["absolute", "fixed"].indexOf(N(t).position) >= 0, o = r && T(t) ? lt(t) : t;
  return K(o) ? e.filter(function(n) {
    return K(n) && ie(n, o) && V(n) !== "body";
  }) : [];
}
function tr(t, e, r, o) {
  var n = e === "clippingParents" ? _e(t) : [].concat(e), a = [].concat(n, [r]), f = a[0], s = a.reduce(function(i, u) {
    var p = Zt(t, u, o);
    return i.top = J(p.top, i.top), i.right = Ot(p.right, i.right), i.bottom = Ot(p.bottom, i.bottom), i.left = J(p.left, i.left), i;
  }, Zt(t, f, o));
  return s.width = s.right - s.left, s.height = s.bottom - s.top, s.x = s.left, s.y = s.top, s;
}
function ce(t) {
  var e = t.reference, r = t.element, o = t.placement, n = o ? W(o) : null, a = o ? et(o) : null, f = e.x + e.width / 2 - r.width / 2, s = e.y + e.height / 2 - r.height / 2, i;
  switch (n) {
    case k:
      i = {
        x: f,
        y: e.y - r.height
      };
      break;
    case M:
      i = {
        x: f,
        y: e.y + e.height
      };
      break;
    case $:
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
  var u = n ? $t(n) : null;
  if (u != null) {
    var p = u === "y" ? "height" : "width";
    switch (a) {
      case Z:
        i[u] = i[u] - (e[p] / 2 - r[p] / 2);
        break;
      case ft:
        i[u] = i[u] + (e[p] / 2 - r[p] / 2);
        break;
    }
  }
  return i;
}
function pt(t, e) {
  e === void 0 && (e = {});
  var r = e, o = r.placement, n = o === void 0 ? t.placement : o, a = r.strategy, f = a === void 0 ? t.strategy : a, s = r.boundary, i = s === void 0 ? be : s, u = r.rootBoundary, p = u === void 0 ? ne : u, h = r.elementContext, w = h === void 0 ? at : h, c = r.altBoundary, b = c === void 0 ? !1 : c, v = r.padding, d = v === void 0 ? 0 : v, y = fe(typeof d != "number" ? d : pe(d, ct)), O = w === at ? xe : at, E = t.rects.popper, l = t.elements[b ? O : w], m = tr(K(l) ? l : l.contextElement || q(t.elements.popper), i, p, f), g = tt(t.elements.reference), x = ce({
    reference: g,
    element: E,
    strategy: "absolute",
    placement: n
  }), S = Rt(Object.assign({}, E, x)), C = w === at ? S : g, A = {
    top: m.top - C.top + y.top,
    bottom: C.bottom - m.bottom + y.bottom,
    left: m.left - C.left + y.left,
    right: C.right - m.right + y.right
  }, P = t.modifiersData.offset;
  if (w === at && P) {
    var L = P[n];
    Object.keys(A).forEach(function(D) {
      var X = [$, M].indexOf(D) >= 0 ? 1 : -1, Y = [k, M].indexOf(D) >= 0 ? "y" : "x";
      A[D] += L[Y] * X;
    });
  }
  return A;
}
function er(t, e) {
  e === void 0 && (e = {});
  var r = e, o = r.placement, n = r.boundary, a = r.rootBoundary, f = r.padding, s = r.flipVariations, i = r.allowedAutoPlacements, u = i === void 0 ? oe : i, p = et(o), h = p ? s ? Gt : Gt.filter(function(b) {
    return et(b) === p;
  }) : ct, w = h.filter(function(b) {
    return u.indexOf(b) >= 0;
  });
  w.length === 0 && (w = h);
  var c = w.reduce(function(b, v) {
    return b[v] = pt(t, {
      placement: v,
      boundary: n,
      rootBoundary: a,
      padding: f
    })[W(v)], b;
  }, {});
  return Object.keys(c).sort(function(b, v) {
    return c[b] - c[v];
  });
}
function rr(t) {
  if (W(t) === jt)
    return [];
  var e = xt(t);
  return [Qt(t), e, Qt(e)];
}
function nr(t) {
  var e = t.state, r = t.options, o = t.name;
  if (!e.modifiersData[o]._skip) {
    for (var n = r.mainAxis, a = n === void 0 ? !0 : n, f = r.altAxis, s = f === void 0 ? !0 : f, i = r.fallbackPlacements, u = r.padding, p = r.boundary, h = r.rootBoundary, w = r.altBoundary, c = r.flipVariations, b = c === void 0 ? !0 : c, v = r.allowedAutoPlacements, d = e.options.placement, y = W(d), O = y === d, E = i || (O || !b ? [xt(d)] : rr(d)), l = [d].concat(E).reduce(function(Q, F) {
      return Q.concat(W(F) === jt ? er(e, {
        placement: F,
        boundary: p,
        rootBoundary: h,
        padding: u,
        flipVariations: b,
        allowedAutoPlacements: v
      }) : F);
    }, []), m = e.rects.reference, g = e.rects.popper, x = /* @__PURE__ */ new Map(), S = !0, C = l[0], A = 0; A < l.length; A++) {
      var P = l[A], L = W(P), D = et(P) === Z, X = [k, M].indexOf(L) >= 0, Y = X ? "width" : "height", R = pt(e, {
        placement: P,
        boundary: p,
        rootBoundary: h,
        altBoundary: w,
        padding: u
      }), H = X ? D ? $ : B : D ? M : k;
      m[Y] > g[Y] && (H = xt(H));
      var dt = xt(H), z = [];
      if (a && z.push(R[L] <= 0), s && z.push(R[H] <= 0, R[dt] <= 0), z.every(function(Q) {
        return Q;
      })) {
        C = P, S = !1;
        break;
      }
      x.set(P, z);
    }
    if (S)
      for (var vt = b ? 3 : 1, At = function(F) {
        var nt = l.find(function(mt) {
          var U = x.get(mt);
          if (U)
            return U.slice(0, F).every(function(Ct) {
              return Ct;
            });
        });
        if (nt)
          return C = nt, "break";
      }, rt = vt; rt > 0; rt--) {
        var ht = At(rt);
        if (ht === "break")
          break;
      }
    e.placement !== C && (e.modifiersData[o]._skip = !0, e.placement = C, e.reset = !0);
  }
}
const or = {
  name: "flip",
  enabled: !0,
  phase: "main",
  fn: nr,
  requiresIfExists: ["offset"],
  data: {
    _skip: !1
  }
};
function _t(t, e, r) {
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
function te(t) {
  return [k, $, M, B].some(function(e) {
    return t[e] >= 0;
  });
}
function ar(t) {
  var e = t.state, r = t.name, o = e.rects.reference, n = e.rects.popper, a = e.modifiersData.preventOverflow, f = pt(e, {
    elementContext: "reference"
  }), s = pt(e, {
    altBoundary: !0
  }), i = _t(f, o), u = _t(s, n, a), p = te(i), h = te(u);
  e.modifiersData[r] = {
    referenceClippingOffsets: i,
    popperEscapeOffsets: u,
    isReferenceHidden: p,
    hasPopperEscaped: h
  }, e.attributes.popper = Object.assign({}, e.attributes.popper, {
    "data-popper-reference-hidden": p,
    "data-popper-escaped": h
  });
}
const ir = {
  name: "hide",
  enabled: !0,
  phase: "main",
  requiresIfExists: ["preventOverflow"],
  fn: ar
};
function sr(t, e, r) {
  var o = W(t), n = [B, k].indexOf(o) >= 0 ? -1 : 1, a = typeof r == "function" ? r(Object.assign({}, e, {
    placement: t
  })) : r, f = a[0], s = a[1];
  return f = f || 0, s = (s || 0) * n, [B, $].indexOf(o) >= 0 ? {
    x: s,
    y: f
  } : {
    x: f,
    y: s
  };
}
function fr(t) {
  var e = t.state, r = t.options, o = t.name, n = r.offset, a = n === void 0 ? [0, 0] : n, f = oe.reduce(function(p, h) {
    return p[h] = sr(h, e.rects, a), p;
  }, {}), s = f[e.placement], i = s.x, u = s.y;
  e.modifiersData.popperOffsets != null && (e.modifiersData.popperOffsets.x += i, e.modifiersData.popperOffsets.y += u), e.modifiersData[o] = f;
}
const pr = {
  name: "offset",
  enabled: !0,
  phase: "main",
  requires: ["popperOffsets"],
  fn: fr
};
function ur(t) {
  var e = t.state, r = t.name;
  e.modifiersData[r] = ce({
    reference: e.rects.reference,
    element: e.rects.popper,
    strategy: "absolute",
    placement: e.placement
  });
}
const cr = {
  name: "popperOffsets",
  enabled: !0,
  phase: "read",
  fn: ur,
  data: {}
};
function lr(t) {
  return t === "x" ? "y" : "x";
}
function dr(t) {
  var e = t.state, r = t.options, o = t.name, n = r.mainAxis, a = n === void 0 ? !0 : n, f = r.altAxis, s = f === void 0 ? !1 : f, i = r.boundary, u = r.rootBoundary, p = r.altBoundary, h = r.padding, w = r.tether, c = w === void 0 ? !0 : w, b = r.tetherOffset, v = b === void 0 ? 0 : b, d = pt(e, {
    boundary: i,
    rootBoundary: u,
    padding: h,
    altBoundary: p
  }), y = W(e.placement), O = et(e.placement), E = !O, l = $t(y), m = lr(l), g = e.modifiersData.popperOffsets, x = e.rects.reference, S = e.rects.popper, C = typeof v == "function" ? v(Object.assign({}, e.rects, {
    placement: e.placement
  })) : v, A = typeof C == "number" ? {
    mainAxis: C,
    altAxis: C
  } : Object.assign({
    mainAxis: 0,
    altAxis: 0
  }, C), P = e.modifiersData.offset ? e.modifiersData.offset[e.placement] : null, L = {
    x: 0,
    y: 0
  };
  if (!!g) {
    if (a) {
      var D, X = l === "y" ? k : B, Y = l === "y" ? M : $, R = l === "y" ? "height" : "width", H = g[l], dt = H + d[X], z = H - d[Y], vt = c ? -S[R] / 2 : 0, At = O === Z ? x[R] : S[R], rt = O === Z ? -S[R] : -x[R], ht = e.elements.arrow, Q = c && ht ? Mt(ht) : {
        width: 0,
        height: 0
      }, F = e.modifiersData["arrow#persistent"] ? e.modifiersData["arrow#persistent"].padding : se(), nt = F[X], mt = F[Y], U = it(0, x[R], Q[R]), Ct = E ? x[R] / 2 - vt - U - nt - A.mainAxis : At - U - nt - A.mainAxis, de = E ? -x[R] / 2 + vt + U + mt + A.mainAxis : rt + U + mt + A.mainAxis, St = e.elements.arrow && lt(e.elements.arrow), ve = St ? l === "y" ? St.clientTop || 0 : St.clientLeft || 0 : 0, Vt = (D = P == null ? void 0 : P[l]) != null ? D : 0, he = H + Ct - Vt - ve, me = H + de - Vt, Nt = it(c ? Ot(dt, he) : dt, H, c ? J(z, me) : z);
      g[l] = Nt, L[l] = Nt - H;
    }
    if (s) {
      var Ft, ge = l === "x" ? k : B, we = l === "x" ? M : $, G = g[m], gt = m === "y" ? "height" : "width", It = G + d[ge], qt = G - d[we], Pt = [k, B].indexOf(y) !== -1, Xt = (Ft = P == null ? void 0 : P[m]) != null ? Ft : 0, Yt = Pt ? It : G - x[gt] - S[gt] - Xt + A.altAxis, zt = Pt ? G + x[gt] + S[gt] - Xt - A.altAxis : qt, Ut = c && Pt ? He(Yt, G, zt) : it(c ? Yt : It, G, c ? zt : qt);
      g[m] = Ut, L[m] = Ut - G;
    }
    e.modifiersData[o] = L;
  }
}
const vr = {
  name: "preventOverflow",
  enabled: !0,
  phase: "main",
  fn: dr,
  requiresIfExists: ["offset"]
};
function hr(t) {
  return {
    scrollLeft: t.scrollLeft,
    scrollTop: t.scrollTop
  };
}
function mr(t) {
  return t === j(t) || !T(t) ? Lt(t) : hr(t);
}
function gr(t) {
  var e = t.getBoundingClientRect(), r = _(e.width) / t.offsetWidth || 1, o = _(e.height) / t.offsetHeight || 1;
  return r !== 1 || o !== 1;
}
function wr(t, e, r) {
  r === void 0 && (r = !1);
  var o = T(e), n = T(e) && gr(e), a = q(e), f = tt(t, n, r), s = {
    scrollLeft: 0,
    scrollTop: 0
  }, i = {
    x: 0,
    y: 0
  };
  return (o || !o && !r) && ((V(e) !== "body" || Wt(a)) && (s = mr(e)), T(e) ? (i = tt(e, !0), i.x += e.clientLeft, i.y += e.clientTop) : a && (i.x = Ht(a))), {
    x: f.left + s.scrollLeft - i.x,
    y: f.top + s.scrollTop - i.y,
    width: f.width,
    height: f.height
  };
}
function yr(t) {
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
function br(t) {
  var e = yr(t);
  return Re.reduce(function(r, o) {
    return r.concat(e.filter(function(n) {
      return n.phase === o;
    }));
  }, []);
}
function xr(t) {
  var e;
  return function() {
    return e || (e = new Promise(function(r) {
      Promise.resolve().then(function() {
        e = void 0, r(t());
      });
    })), e;
  };
}
function Or(t) {
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
var ee = {
  placement: "bottom",
  modifiers: [],
  strategy: "absolute"
};
function re() {
  for (var t = arguments.length, e = new Array(t), r = 0; r < t; r++)
    e[r] = arguments[r];
  return !e.some(function(o) {
    return !(o && typeof o.getBoundingClientRect == "function");
  });
}
function Er(t) {
  t === void 0 && (t = {});
  var e = t, r = e.defaultModifiers, o = r === void 0 ? [] : r, n = e.defaultOptions, a = n === void 0 ? ee : n;
  return function(s, i, u) {
    u === void 0 && (u = a);
    var p = {
      placement: "bottom",
      orderedModifiers: [],
      options: Object.assign({}, ee, a),
      modifiersData: {},
      elements: {
        reference: s,
        popper: i
      },
      attributes: {},
      styles: {}
    }, h = [], w = !1, c = {
      state: p,
      setOptions: function(y) {
        var O = typeof y == "function" ? y(p.options) : y;
        v(), p.options = Object.assign({}, a, p.options, O), p.scrollParents = {
          reference: K(s) ? st(s) : s.contextElement ? st(s.contextElement) : [],
          popper: st(i)
        };
        var E = br(Or([].concat(o, p.options.modifiers)));
        return p.orderedModifiers = E.filter(function(l) {
          return l.enabled;
        }), b(), c.update();
      },
      forceUpdate: function() {
        if (!w) {
          var y = p.elements, O = y.reference, E = y.popper;
          if (!!re(O, E)) {
            p.rects = {
              reference: wr(O, lt(E), p.options.strategy === "fixed"),
              popper: Mt(E)
            }, p.reset = !1, p.placement = p.options.placement, p.orderedModifiers.forEach(function(A) {
              return p.modifiersData[A.name] = Object.assign({}, A.data);
            });
            for (var l = 0; l < p.orderedModifiers.length; l++) {
              if (p.reset === !0) {
                p.reset = !1, l = -1;
                continue;
              }
              var m = p.orderedModifiers[l], g = m.fn, x = m.options, S = x === void 0 ? {} : x, C = m.name;
              typeof g == "function" && (p = g({
                state: p,
                options: S,
                name: C,
                instance: c
              }) || p);
            }
          }
        }
      },
      update: xr(function() {
        return new Promise(function(d) {
          c.forceUpdate(), d(p);
        });
      }),
      destroy: function() {
        v(), w = !0;
      }
    };
    if (!re(s, i))
      return c;
    c.setOptions(u).then(function(d) {
      !w && u.onFirstUpdate && u.onFirstUpdate(d);
    });
    function b() {
      p.orderedModifiers.forEach(function(d) {
        var y = d.name, O = d.options, E = O === void 0 ? {} : O, l = d.effect;
        if (typeof l == "function") {
          var m = l({
            state: p,
            name: y,
            instance: c,
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
    return c;
  };
}
var Ar = [Ue, cr, Ye, Me, pr, or, vr, Fe, ir], Cr = /* @__PURE__ */ Er({
  defaultModifiers: Ar
});
const Sr = (t, e) => {
  const r = t.__vccOpts || t;
  for (const [o, n] of e)
    r[o] = n;
  return r;
};
var Pr = 0, Dr = function() {
  return "dropdown-" + Pr++;
}, kr = [
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
], ut = ["click"];
(window.ontouchstart || navigator.msMaxTouchPoints > 0) && ut.push("touchstart");
var I = [], le = function(t) {
  for (var e in I) {
    var r = I[e].el, o = I[e].fn;
    t.target !== r && !r.contains(t.target) && Br(o, t);
  }
}, Br = function(t, e) {
  !t || setTimeout(function() {
    t(e);
  }, 10);
}, Rr = function() {
  for (var t in ut)
    document.addEventListener(ut[t], le);
}, jr = function() {
  if (!(I.length > 0))
    for (var t in ut)
      document.removeEventListener(ut[t], le);
};
const Tr = {
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
        kr.indexOf(this.placement) !== -1 && (t = this.placement), this.isShow && Cr(this.$refs.button, this.$refs.popup, {
          placement: t
        });
      }
    }
  },
  beforeUnmount() {
    for (var t in I)
      I[t].el === this.$el && I.splice(t, 1);
    jr();
  },
  mounted() {
    Rr();
    var t = this;
    I.push({
      el: this.$el,
      fn: function() {
        t.isShow = !1;
      }
    });
  },
  created: function() {
    this.id = Dr();
  }
}, Mr = ["id", "aria-expanded", "innerHTML"], $r = { class: "btn-group" }, Lr = ["id", "innerHTML"], Hr = ["aria-expanded"], Wr = /* @__PURE__ */ kt("span", { class: "visually-hidden" }, "Toggle Dropdown", -1), Vr = [
  Wr
], Nr = ["aria-labelledby"];
function Fr(t, e, r, o, n, a) {
  return wt(), yt("div", {
    class: ot(["dropdown", { show: n.isShow }])
  }, [
    t.btnSplit ? Dt("", !0) : (wt(), yt("button", {
      key: 0,
      class: ot(["btn dropdown-toggle", t.btnClass]),
      type: "button",
      "data-toggle": "dropdown",
      "aria-haspopup": "true",
      id: t.id,
      ref: "button",
      onClick: e[0] || (e[0] = (...f) => a.switchState && a.switchState(...f)),
      "aria-expanded": n.isShow,
      innerHTML: r.title
    }, null, 10, Mr)),
    kt("div", $r, [
      t.btnSplit ? (wt(), yt("button", {
        key: 0,
        class: ot(["btn", t.btnClass]),
        type: "button",
        "data-toggle": "dropdown",
        "aria-haspopup": "true",
        id: t.id,
        ref: "button",
        innerHTML: r.title
      }, null, 10, Lr)) : Dt("", !0),
      t.btnSplit ? (wt(), yt("button", {
        key: 1,
        class: ot(["btn dropdown-toggle dropdown-toggle-split", t.btnClass]),
        type: "button",
        "data-toggle": "dropdown",
        "aria-haspopup": "true",
        "aria-expanded": n.isShow,
        onClick: e[1] || (e[1] = (...f) => a.switchState && a.switchState(...f))
      }, Vr, 10, Hr)) : Dt("", !0)
    ]),
    kt("div", {
      class: ot(["dropdown-menu", a.dropdownClassComputed]),
      ref: "popup",
      "data-bs-popper": "static",
      "aria-labelledby": t.id,
      onClick: e[2] || (e[2] = (...f) => a.switchState && a.switchState(...f))
    }, [
      ye(t.$slots, "default", { dropdown: a.dropdownPointer })
    ], 10, Nr)
  ], 2);
}
const qr = /* @__PURE__ */ Sr(Tr, [["render", Fr]]);
export {
  qr as default
};
