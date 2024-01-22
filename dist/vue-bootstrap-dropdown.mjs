import { openBlock as yt, createElementBlock as wt, normalizeClass as ot, createCommentVNode as Dt, createElementVNode as kt, renderSlot as we } from "vue";
var k = "top", M = "bottom", L = "right", B = "left", jt = "auto", ut = [k, M, L, B], Z = "start", ft = "end", be = "clippingParents", ne = "viewport", at = "popper", xe = "reference", Gt = /* @__PURE__ */ ut.reduce(function(t, e) {
  return t.concat([e + "-" + Z, e + "-" + ft]);
}, []), oe = /* @__PURE__ */ [].concat(ut, [jt]).reduce(function(t, e) {
  return t.concat([e, e + "-" + Z, e + "-" + ft]);
}, []), Oe = "beforeRead", Ee = "read", Ae = "afterRead", Ce = "beforeMain", Pe = "main", Se = "afterMain", De = "beforeWrite", ke = "write", Be = "afterWrite", Re = [Oe, Ee, Ae, Ce, Pe, Se, De, ke, Be];
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
  var f = K(t) ? j(t) : window, s = f.visualViewport, i = !ae() && r, c = (o.left + (i && s ? s.offsetLeft : 0)) / n, p = (o.top + (i && s ? s.offsetTop : 0)) / a, h = o.width / n, y = o.height / a;
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
function Le(t) {
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
function $e(t) {
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
  for (var e = j(t), r = Jt(t); r && Le(r) && N(r).position === "static"; )
    r = Jt(r);
  return r && (V(r) === "html" || V(r) === "body" && N(r).position === "static") ? e : r || $e(t) || e;
}
function Lt(t) {
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
  })) : e, fe(typeof e != "number" ? e : pe(e, ut));
};
function Ve(t) {
  var e, r = t.state, o = t.name, n = t.options, a = r.elements.arrow, f = r.modifiersData.popperOffsets, s = W(r.placement), i = Lt(s), c = [B, L].indexOf(s) >= 0, p = c ? "height" : "width";
  if (!(!a || !f)) {
    var h = We(n.padding, r), y = Mt(a), u = i === "y" ? k : B, b = i === "y" ? M : L, v = r.rects.reference[p] + r.rects.reference[i] - f[i] - r.rects.popper[p], d = f[i] - r.rects.reference[i], w = lt(a), O = w ? i === "y" ? w.clientHeight || 0 : w.clientWidth || 0 : 0, E = v / 2 - d / 2, l = h[u], m = O - y[p] - h[b], g = O / 2 - y[p] / 2 + E, x = it(l, g, m), P = i;
    r.modifiersData[o] = (e = {}, e[P] = x, e.centerOffset = x - g, e);
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
    var g = lt(r), x = "clientHeight", P = "clientWidth";
    if (g === j(r) && (g = q(r), N(g).position !== "static" && s === "absolute" && (x = "scrollHeight", P = "scrollWidth")), g = g, n === k || (n === B || n === L) && a === ft) {
      l = M;
      var C = h && g === m && m.visualViewport ? m.visualViewport.height : g[x];
      v -= C - o.height, v *= i ? 1 : -1;
    }
    if (n === B || (n === k || n === M) && a === ft) {
      E = L;
      var A = h && g === m && m.visualViewport ? m.visualViewport.width : g[P];
      u -= A - o.width, u *= i ? 1 : -1;
    }
  }
  var S = Object.assign({
    position: s
  }, c && Ie), $ = p === !0 ? qe({
    x: u,
    y: v
  }, j(r)) : {
    x: u,
    y: v
  };
  if (u = $.x, v = $.y, i) {
    var D;
    return Object.assign({}, S, (D = {}, D[l] = O ? "0" : "", D[E] = w ? "0" : "", D.transform = (m.devicePixelRatio || 1) <= 1 ? "translate(" + u + "px, " + v + "px)" : "translate3d(" + u + "px, " + v + "px, 0)", D));
  }
  return Object.assign({}, S, (e = {}, e[l] = O ? v + "px" : "", e[E] = w ? u + "px" : "", e.transform = "", e));
}
function Xe(t) {
  var e = t.state, r = t.options, o = r.gpuAcceleration, n = o === void 0 ? !0 : o, a = r.adaptive, f = a === void 0 ? !0 : a, s = r.roundOffsets, i = s === void 0 ? !0 : s, c = {
    placement: W(e.placement),
    variation: et(e.placement),
    popper: e.elements.popper,
    popperRect: e.rects.popper,
    gpuAcceleration: n,
    isFixed: e.options.strategy === "fixed"
  };
  e.modifiersData.popperOffsets != null && (e.styles.popper = Object.assign({}, e.styles.popper, Kt(Object.assign({}, c, {
    offsets: e.modifiersData.popperOffsets,
    position: e.options.strategy,
    adaptive: f,
    roundOffsets: i
  })))), e.modifiersData.arrow != null && (e.styles.arrow = Object.assign({}, e.styles.arrow, Kt(Object.assign({}, c, {
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
  var e = t.state, r = t.instance, o = t.options, n = o.scroll, a = n === void 0 ? !0 : n, f = o.resize, s = f === void 0 ? !0 : f, i = j(e.elements.popper), c = [].concat(e.scrollParents.reference, e.scrollParents.popper);
  return a && c.forEach(function(p) {
    p.addEventListener("scroll", r.update, bt);
  }), s && i.addEventListener("resize", r.update, bt), function() {
    a && c.forEach(function(p) {
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
function $t(t) {
  var e = j(t), r = e.pageXOffset, o = e.pageYOffset;
  return {
    scrollLeft: r,
    scrollTop: o
  };
}
function Ht(t) {
  return tt(q(t)).left + $t(t).scrollLeft;
}
function Ke(t, e) {
  var r = j(t), o = q(t), n = r.visualViewport, a = o.clientWidth, f = o.clientHeight, s = 0, i = 0;
  if (n) {
    a = n.width, f = n.height;
    var c = ae();
    (c || !c && e === "fixed") && (s = n.offsetLeft, i = n.offsetTop);
  }
  return {
    width: a,
    height: f,
    x: s + Ht(t),
    y: i
  };
}
function Qe(t) {
  var e, r = q(t), o = $t(t), n = (e = t.ownerDocument) == null ? void 0 : e.body, a = J(r.scrollWidth, r.clientWidth, n ? n.scrollWidth : 0, n ? n.clientWidth : 0), f = J(r.scrollHeight, r.clientHeight, n ? n.scrollHeight : 0, n ? n.clientHeight : 0), s = -o.scrollLeft + Ht(t), i = -o.scrollTop;
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
function ce(t) {
  return ["html", "body", "#document"].indexOf(V(t)) >= 0 ? t.ownerDocument.body : T(t) && Wt(t) ? t : ce(Et(t));
}
function st(t, e) {
  var r;
  e === void 0 && (e = []);
  var o = ce(t), n = o === ((r = t.ownerDocument) == null ? void 0 : r.body), a = j(o), f = n ? [a].concat(a.visualViewport || [], Wt(o) ? o : []) : o, s = e.concat(f);
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
  var n = e === "clippingParents" ? _e(t) : [].concat(e), a = [].concat(n, [r]), f = a[0], s = a.reduce(function(i, c) {
    var p = Zt(t, c, o);
    return i.top = J(p.top, i.top), i.right = Ot(p.right, i.right), i.bottom = Ot(p.bottom, i.bottom), i.left = J(p.left, i.left), i;
  }, Zt(t, f, o));
  return s.width = s.right - s.left, s.height = s.bottom - s.top, s.x = s.left, s.y = s.top, s;
}
function ue(t) {
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
  var c = n ? Lt(n) : null;
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
  var r = e, o = r.placement, n = o === void 0 ? t.placement : o, a = r.strategy, f = a === void 0 ? t.strategy : a, s = r.boundary, i = s === void 0 ? be : s, c = r.rootBoundary, p = c === void 0 ? ne : c, h = r.elementContext, y = h === void 0 ? at : h, u = r.altBoundary, b = u === void 0 ? !1 : u, v = r.padding, d = v === void 0 ? 0 : v, w = fe(typeof d != "number" ? d : pe(d, ut)), O = y === at ? xe : at, E = t.rects.popper, l = t.elements[b ? O : y], m = tr(K(l) ? l : l.contextElement || q(t.elements.popper), i, p, f), g = tt(t.elements.reference), x = ue({
    reference: g,
    element: E,
    strategy: "absolute",
    placement: n
  }), P = Rt(Object.assign({}, E, x)), C = y === at ? P : g, A = {
    top: m.top - C.top + w.top,
    bottom: C.bottom - m.bottom + w.bottom,
    left: m.left - C.left + w.left,
    right: C.right - m.right + w.right
  }, S = t.modifiersData.offset;
  if (y === at && S) {
    var $ = S[n];
    Object.keys(A).forEach(function(D) {
      var X = [L, M].indexOf(D) >= 0 ? 1 : -1, Y = [k, M].indexOf(D) >= 0 ? "y" : "x";
      A[D] += $[Y] * X;
    });
  }
  return A;
}
function er(t, e) {
  e === void 0 && (e = {});
  var r = e, o = r.placement, n = r.boundary, a = r.rootBoundary, f = r.padding, s = r.flipVariations, i = r.allowedAutoPlacements, c = i === void 0 ? oe : i, p = et(o), h = p ? s ? Gt : Gt.filter(function(b) {
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
function rr(t) {
  if (W(t) === jt)
    return [];
  var e = xt(t);
  return [Qt(t), e, Qt(e)];
}
function nr(t) {
  var e = t.state, r = t.options, o = t.name;
  if (!e.modifiersData[o]._skip) {
    for (var n = r.mainAxis, a = n === void 0 ? !0 : n, f = r.altAxis, s = f === void 0 ? !0 : f, i = r.fallbackPlacements, c = r.padding, p = r.boundary, h = r.rootBoundary, y = r.altBoundary, u = r.flipVariations, b = u === void 0 ? !0 : u, v = r.allowedAutoPlacements, d = e.options.placement, w = W(d), O = w === d, E = i || (O || !b ? [xt(d)] : rr(d)), l = [d].concat(E).reduce(function(Q, F) {
      return Q.concat(W(F) === jt ? er(e, {
        placement: F,
        boundary: p,
        rootBoundary: h,
        padding: c,
        flipVariations: b,
        allowedAutoPlacements: v
      }) : F);
    }, []), m = e.rects.reference, g = e.rects.popper, x = /* @__PURE__ */ new Map(), P = !0, C = l[0], A = 0; A < l.length; A++) {
      var S = l[A], $ = W(S), D = et(S) === Z, X = [k, M].indexOf($) >= 0, Y = X ? "width" : "height", R = pt(e, {
        placement: S,
        boundary: p,
        rootBoundary: h,
        altBoundary: y,
        padding: c
      }), H = X ? D ? L : B : D ? M : k;
      m[Y] > g[Y] && (H = xt(H));
      var dt = xt(H), z = [];
      if (a && z.push(R[$] <= 0), s && z.push(R[H] <= 0, R[dt] <= 0), z.every(function(Q) {
        return Q;
      })) {
        C = S, P = !1;
        break;
      }
      x.set(S, z);
    }
    if (P)
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
  return [k, L, M, B].some(function(e) {
    return t[e] >= 0;
  });
}
function ar(t) {
  var e = t.state, r = t.name, o = e.rects.reference, n = e.rects.popper, a = e.modifiersData.preventOverflow, f = pt(e, {
    elementContext: "reference"
  }), s = pt(e, {
    altBoundary: !0
  }), i = _t(f, o), c = _t(s, n, a), p = te(i), h = te(c);
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
  return f = f || 0, s = (s || 0) * n, [B, L].indexOf(o) >= 0 ? {
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
  }, {}), s = f[e.placement], i = s.x, c = s.y;
  e.modifiersData.popperOffsets != null && (e.modifiersData.popperOffsets.x += i, e.modifiersData.popperOffsets.y += c), e.modifiersData[o] = f;
}
const pr = {
  name: "offset",
  enabled: !0,
  phase: "main",
  requires: ["popperOffsets"],
  fn: fr
};
function cr(t) {
  var e = t.state, r = t.name;
  e.modifiersData[r] = ue({
    reference: e.rects.reference,
    element: e.rects.popper,
    strategy: "absolute",
    placement: e.placement
  });
}
const ur = {
  name: "popperOffsets",
  enabled: !0,
  phase: "read",
  fn: cr,
  data: {}
};
function lr(t) {
  return t === "x" ? "y" : "x";
}
function dr(t) {
  var e = t.state, r = t.options, o = t.name, n = r.mainAxis, a = n === void 0 ? !0 : n, f = r.altAxis, s = f === void 0 ? !1 : f, i = r.boundary, c = r.rootBoundary, p = r.altBoundary, h = r.padding, y = r.tether, u = y === void 0 ? !0 : y, b = r.tetherOffset, v = b === void 0 ? 0 : b, d = pt(e, {
    boundary: i,
    rootBoundary: c,
    padding: h,
    altBoundary: p
  }), w = W(e.placement), O = et(e.placement), E = !O, l = Lt(w), m = lr(l), g = e.modifiersData.popperOffsets, x = e.rects.reference, P = e.rects.popper, C = typeof v == "function" ? v(Object.assign({}, e.rects, {
    placement: e.placement
  })) : v, A = typeof C == "number" ? {
    mainAxis: C,
    altAxis: C
  } : Object.assign({
    mainAxis: 0,
    altAxis: 0
  }, C), S = e.modifiersData.offset ? e.modifiersData.offset[e.placement] : null, $ = {
    x: 0,
    y: 0
  };
  if (!!g) {
    if (a) {
      var D, X = l === "y" ? k : B, Y = l === "y" ? M : L, R = l === "y" ? "height" : "width", H = g[l], dt = H + d[X], z = H - d[Y], vt = u ? -P[R] / 2 : 0, At = O === Z ? x[R] : P[R], rt = O === Z ? -P[R] : -x[R], ht = e.elements.arrow, Q = u && ht ? Mt(ht) : {
        width: 0,
        height: 0
      }, F = e.modifiersData["arrow#persistent"] ? e.modifiersData["arrow#persistent"].padding : se(), nt = F[X], mt = F[Y], U = it(0, x[R], Q[R]), Ct = E ? x[R] / 2 - vt - U - nt - A.mainAxis : At - U - nt - A.mainAxis, de = E ? -x[R] / 2 + vt + U + mt + A.mainAxis : rt + U + mt + A.mainAxis, Pt = e.elements.arrow && lt(e.elements.arrow), ve = Pt ? l === "y" ? Pt.clientTop || 0 : Pt.clientLeft || 0 : 0, Vt = (D = S == null ? void 0 : S[l]) != null ? D : 0, he = H + Ct - Vt - ve, me = H + de - Vt, Nt = it(u ? Ot(dt, he) : dt, H, u ? J(z, me) : z);
      g[l] = Nt, $[l] = Nt - H;
    }
    if (s) {
      var Ft, ge = l === "x" ? k : B, ye = l === "x" ? M : L, G = g[m], gt = m === "y" ? "height" : "width", It = G + d[ge], qt = G - d[ye], St = [k, B].indexOf(w) !== -1, Xt = (Ft = S == null ? void 0 : S[m]) != null ? Ft : 0, Yt = St ? It : G - x[gt] - P[gt] - Xt + A.altAxis, zt = St ? G + x[gt] + P[gt] - Xt - A.altAxis : qt, Ut = u && St ? He(Yt, G, zt) : it(u ? Yt : It, G, u ? zt : qt);
      g[m] = Ut, $[m] = Ut - G;
    }
    e.modifiersData[o] = $;
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
  return t === j(t) || !T(t) ? $t(t) : hr(t);
}
function gr(t) {
  var e = t.getBoundingClientRect(), r = _(e.width) / t.offsetWidth || 1, o = _(e.height) / t.offsetHeight || 1;
  return r !== 1 || o !== 1;
}
function yr(t, e, r) {
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
function wr(t) {
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
  var e = wr(t);
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
  return function(s, i, c) {
    c === void 0 && (c = a);
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
    }, h = [], y = !1, u = {
      state: p,
      setOptions: function(w) {
        var O = typeof w == "function" ? w(p.options) : w;
        v(), p.options = Object.assign({}, a, p.options, O), p.scrollParents = {
          reference: K(s) ? st(s) : s.contextElement ? st(s.contextElement) : [],
          popper: st(i)
        };
        var E = br(Or([].concat(o, p.options.modifiers)));
        return p.orderedModifiers = E.filter(function(l) {
          return l.enabled;
        }), b(), u.update();
      },
      forceUpdate: function() {
        if (!y) {
          var w = p.elements, O = w.reference, E = w.popper;
          if (!!re(O, E)) {
            p.rects = {
              reference: yr(O, lt(E), p.options.strategy === "fixed"),
              popper: Mt(E)
            }, p.reset = !1, p.placement = p.options.placement, p.orderedModifiers.forEach(function(A) {
              return p.modifiersData[A.name] = Object.assign({}, A.data);
            });
            for (var l = 0; l < p.orderedModifiers.length; l++) {
              if (p.reset === !0) {
                p.reset = !1, l = -1;
                continue;
              }
              var m = p.orderedModifiers[l], g = m.fn, x = m.options, P = x === void 0 ? {} : x, C = m.name;
              typeof g == "function" && (p = g({
                state: p,
                options: P,
                name: C,
                instance: u
              }) || p);
            }
          }
        }
      },
      update: xr(function() {
        return new Promise(function(d) {
          u.forceUpdate(), d(p);
        });
      }),
      destroy: function() {
        v(), y = !0;
      }
    };
    if (!re(s, i))
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
var Ar = [Ue, ur, Ye, Me, pr, or, vr, Fe, ir], Cr = /* @__PURE__ */ Er({
  defaultModifiers: Ar
});
const Pr = (t, e) => {
  const r = t.__vccOpts || t;
  for (const [o, n] of e)
    r[o] = n;
  return r;
};
var Sr = 0, Dr = function() {
  return "dropdown-" + Sr++;
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
], ct = ["click"];
(window.ontouchstart || navigator.msMaxTouchPoints > 0) && ct.push("touchstart");
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
  for (var t in ct)
    document.addEventListener(ct[t], le);
}, jr = function() {
  if (!(I.length > 0))
    for (var t in ct)
      document.removeEventListener(ct[t], le);
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
}, Mr = ["id", "aria-expanded", "innerHTML"], Lr = { class: "btn-group" }, $r = ["id", "innerHTML"], Hr = ["aria-expanded"], Wr = /* @__PURE__ */ kt("span", { class: "visually-hidden" }, "Toggle Dropdown", -1), Vr = [
  Wr
], Nr = ["aria-labelledby"];
function Fr(t, e, r, o, n, a) {
  return yt(), wt("div", {
    class: ot(["dropdown", { show: n.isShow }])
  }, [
    t.btnSplit ? Dt("", !0) : (yt(), wt("button", {
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
    kt("div", Lr, [
      t.btnSplit ? (yt(), wt("button", {
        key: 0,
        class: ot(["btn", t.btnClass]),
        type: "button",
        "data-toggle": "dropdown",
        "aria-haspopup": "true",
        id: t.id,
        ref: "button",
        innerHTML: r.title
      }, null, 10, $r)) : Dt("", !0),
      t.btnSplit ? (yt(), wt("button", {
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
      we(t.$slots, "default", { dropdown: a.dropdownPointer })
    ], 10, Nr)
  ], 2);
}
const qr = /* @__PURE__ */ Pr(Tr, [["render", Fr]]);
export {
  qr as default
};
