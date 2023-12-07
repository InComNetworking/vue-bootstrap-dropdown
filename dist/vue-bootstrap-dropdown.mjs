import { openBlock as yt, createElementBlock as bt, normalizeClass as at, toDisplayString as Gt, createCommentVNode as Pt, createElementVNode as kt, renderSlot as we } from "vue";
var k = "top", T = "bottom", L = "right", B = "left", jt = "auto", ut = [k, T, L, B], Z = "start", ft = "end", xe = "clippingParents", ae = "viewport", ot = "popper", Oe = "reference", Jt = /* @__PURE__ */ ut.reduce(function(t, e) {
  return t.concat([e + "-" + Z, e + "-" + ft]);
}, []), oe = /* @__PURE__ */ [].concat(ut, [jt]).reduce(function(t, e) {
  return t.concat([e, e + "-" + Z, e + "-" + ft]);
}, []), Ee = "beforeRead", Ae = "read", De = "afterRead", Se = "beforeMain", Ce = "main", Pe = "afterMain", ke = "beforeWrite", Be = "write", Re = "afterWrite", je = [Ee, Ae, De, Se, Ce, Pe, ke, Be, Re];
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
function $(t) {
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
    var a = e.styles[r] || {}, n = e.attributes[r] || {}, o = e.elements[r];
    !$(o) || !V(o) || (Object.assign(o.style, a), Object.keys(n).forEach(function(f) {
      var s = n[f];
      s === !1 ? o.removeAttribute(f) : o.setAttribute(f, s === !0 ? "" : s);
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
    Object.keys(e.elements).forEach(function(a) {
      var n = e.elements[a], o = e.attributes[a] || {}, f = Object.keys(e.styles.hasOwnProperty(a) ? e.styles[a] : r[a]), s = f.reduce(function(i, c) {
        return i[c] = "", i;
      }, {});
      !$(n) || !V(n) || (Object.assign(n.style, s), Object.keys(o).forEach(function(i) {
        n.removeAttribute(i);
      }));
    });
  };
}
const Le = {
  name: "applyStyles",
  enabled: !0,
  phase: "write",
  fn: $e,
  effect: Te,
  requires: ["computeStyles"]
};
function H(t) {
  return t.split("-")[0];
}
var J = Math.max, Ot = Math.min, _ = Math.round;
function Bt() {
  var t = navigator.userAgentData;
  return t != null && t.brands && Array.isArray(t.brands) ? t.brands.map(function(e) {
    return e.brand + "/" + e.version;
  }).join(" ") : navigator.userAgent;
}
function ie() {
  return !/^((?!chrome|android).)*safari/i.test(Bt());
}
function tt(t, e, r) {
  e === void 0 && (e = !1), r === void 0 && (r = !1);
  var a = t.getBoundingClientRect(), n = 1, o = 1;
  e && $(t) && (n = t.offsetWidth > 0 && _(a.width) / t.offsetWidth || 1, o = t.offsetHeight > 0 && _(a.height) / t.offsetHeight || 1);
  var f = K(t) ? j(t) : window, s = f.visualViewport, i = !ie() && r, c = (a.left + (i && s ? s.offsetLeft : 0)) / n, p = (a.top + (i && s ? s.offsetTop : 0)) / o, h = a.width / n, y = a.height / o;
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
function Tt(t) {
  var e = tt(t), r = t.offsetWidth, a = t.offsetHeight;
  return Math.abs(e.width - r) <= 1 && (r = e.width), Math.abs(e.height - a) <= 1 && (a = e.height), {
    x: t.offsetLeft,
    y: t.offsetTop,
    width: r,
    height: a
  };
}
function se(t, e) {
  var r = e.getRootNode && e.getRootNode();
  if (t.contains(e))
    return !0;
  if (r && $t(r)) {
    var a = e;
    do {
      if (a && t.isSameNode(a))
        return !0;
      a = a.parentNode || a.host;
    } while (a);
  }
  return !1;
}
function N(t) {
  return j(t).getComputedStyle(t);
}
function Me(t) {
  return ["table", "td", "th"].indexOf(V(t)) >= 0;
}
function q(t) {
  return ((K(t) ? t.ownerDocument : t.document) || window.document).documentElement;
}
function Et(t) {
  return V(t) === "html" ? t : t.assignedSlot || t.parentNode || ($t(t) ? t.host : null) || q(t);
}
function Kt(t) {
  return !$(t) || N(t).position === "fixed" ? null : t.offsetParent;
}
function We(t) {
  var e = /firefox/i.test(Bt()), r = /Trident/i.test(Bt());
  if (r && $(t)) {
    var a = N(t);
    if (a.position === "fixed")
      return null;
  }
  var n = Et(t);
  for ($t(n) && (n = n.host); $(n) && ["html", "body"].indexOf(V(n)) < 0; ) {
    var o = N(n);
    if (o.transform !== "none" || o.perspective !== "none" || o.contain === "paint" || ["transform", "perspective"].indexOf(o.willChange) !== -1 || e && o.willChange === "filter" || e && o.filter && o.filter !== "none")
      return n;
    n = n.parentNode;
  }
  return null;
}
function lt(t) {
  for (var e = j(t), r = Kt(t); r && Me(r) && N(r).position === "static"; )
    r = Kt(r);
  return r && (V(r) === "html" || V(r) === "body" && N(r).position === "static") ? e : r || We(t) || e;
}
function Lt(t) {
  return ["top", "bottom"].indexOf(t) >= 0 ? "x" : "y";
}
function it(t, e, r) {
  return J(t, Ot(e, r));
}
function He(t, e, r) {
  var a = it(t, e, r);
  return a > r ? r : a;
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
  return e.reduce(function(r, a) {
    return r[a] = t, r;
  }, {});
}
var Ve = function(e, r) {
  return e = typeof e == "function" ? e(Object.assign({}, r.rects, {
    placement: r.placement
  })) : e, pe(typeof e != "number" ? e : ce(e, ut));
};
function Ne(t) {
  var e, r = t.state, a = t.name, n = t.options, o = r.elements.arrow, f = r.modifiersData.popperOffsets, s = H(r.placement), i = Lt(s), c = [B, L].indexOf(s) >= 0, p = c ? "height" : "width";
  if (!(!o || !f)) {
    var h = Ve(n.padding, r), y = Tt(o), u = i === "y" ? k : B, w = i === "y" ? T : L, v = r.rects.reference[p] + r.rects.reference[i] - f[i] - r.rects.popper[p], d = f[i] - r.rects.reference[i], b = lt(o), O = b ? i === "y" ? b.clientHeight || 0 : b.clientWidth || 0 : 0, E = v / 2 - d / 2, l = h[u], m = O - y[p] - h[w], g = O / 2 - y[p] / 2 + E, x = it(l, g, m), S = i;
    r.modifiersData[a] = (e = {}, e[S] = x, e.centerOffset = x - g, e);
  }
}
function Fe(t) {
  var e = t.state, r = t.options, a = r.element, n = a === void 0 ? "[data-popper-arrow]" : a;
  n != null && (typeof n == "string" && (n = e.elements.popper.querySelector(n), !n) || !se(e.elements.popper, n) || (e.elements.arrow = n));
}
const Ie = {
  name: "arrow",
  enabled: !0,
  phase: "main",
  fn: Ne,
  effect: Fe,
  requires: ["popperOffsets"],
  requiresIfExists: ["preventOverflow"]
};
function et(t) {
  return t.split("-")[1];
}
var qe = {
  top: "auto",
  right: "auto",
  bottom: "auto",
  left: "auto"
};
function Xe(t, e) {
  var r = t.x, a = t.y, n = e.devicePixelRatio || 1;
  return {
    x: _(r * n) / n || 0,
    y: _(a * n) / n || 0
  };
}
function Qt(t) {
  var e, r = t.popper, a = t.popperRect, n = t.placement, o = t.variation, f = t.offsets, s = t.position, i = t.gpuAcceleration, c = t.adaptive, p = t.roundOffsets, h = t.isFixed, y = f.x, u = y === void 0 ? 0 : y, w = f.y, v = w === void 0 ? 0 : w, d = typeof p == "function" ? p({
    x: u,
    y: v
  }) : {
    x: u,
    y: v
  };
  u = d.x, v = d.y;
  var b = f.hasOwnProperty("x"), O = f.hasOwnProperty("y"), E = B, l = k, m = window;
  if (c) {
    var g = lt(r), x = "clientHeight", S = "clientWidth";
    if (g === j(r) && (g = q(r), N(g).position !== "static" && s === "absolute" && (x = "scrollHeight", S = "scrollWidth")), g = g, n === k || (n === B || n === L) && o === ft) {
      l = T;
      var D = h && g === m && m.visualViewport ? m.visualViewport.height : g[x];
      v -= D - a.height, v *= i ? 1 : -1;
    }
    if (n === B || (n === k || n === T) && o === ft) {
      E = L;
      var A = h && g === m && m.visualViewport ? m.visualViewport.width : g[S];
      u -= A - a.width, u *= i ? 1 : -1;
    }
  }
  var C = Object.assign({
    position: s
  }, c && qe), M = p === !0 ? Xe({
    x: u,
    y: v
  }, j(r)) : {
    x: u,
    y: v
  };
  if (u = M.x, v = M.y, i) {
    var P;
    return Object.assign({}, C, (P = {}, P[l] = O ? "0" : "", P[E] = b ? "0" : "", P.transform = (m.devicePixelRatio || 1) <= 1 ? "translate(" + u + "px, " + v + "px)" : "translate3d(" + u + "px, " + v + "px, 0)", P));
  }
  return Object.assign({}, C, (e = {}, e[l] = O ? v + "px" : "", e[E] = b ? u + "px" : "", e.transform = "", e));
}
function Ye(t) {
  var e = t.state, r = t.options, a = r.gpuAcceleration, n = a === void 0 ? !0 : a, o = r.adaptive, f = o === void 0 ? !0 : o, s = r.roundOffsets, i = s === void 0 ? !0 : s, c = {
    placement: H(e.placement),
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
const ze = {
  name: "computeStyles",
  enabled: !0,
  phase: "beforeWrite",
  fn: Ye,
  data: {}
};
var wt = {
  passive: !0
};
function Ue(t) {
  var e = t.state, r = t.instance, a = t.options, n = a.scroll, o = n === void 0 ? !0 : n, f = a.resize, s = f === void 0 ? !0 : f, i = j(e.elements.popper), c = [].concat(e.scrollParents.reference, e.scrollParents.popper);
  return o && c.forEach(function(p) {
    p.addEventListener("scroll", r.update, wt);
  }), s && i.addEventListener("resize", r.update, wt), function() {
    o && c.forEach(function(p) {
      p.removeEventListener("scroll", r.update, wt);
    }), s && i.removeEventListener("resize", r.update, wt);
  };
}
const Ge = {
  name: "eventListeners",
  enabled: !0,
  phase: "write",
  fn: function() {
  },
  effect: Ue,
  data: {}
};
var Je = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function xt(t) {
  return t.replace(/left|right|bottom|top/g, function(e) {
    return Je[e];
  });
}
var Ke = {
  start: "end",
  end: "start"
};
function Zt(t) {
  return t.replace(/start|end/g, function(e) {
    return Ke[e];
  });
}
function Mt(t) {
  var e = j(t), r = e.pageXOffset, a = e.pageYOffset;
  return {
    scrollLeft: r,
    scrollTop: a
  };
}
function Wt(t) {
  return tt(q(t)).left + Mt(t).scrollLeft;
}
function Qe(t, e) {
  var r = j(t), a = q(t), n = r.visualViewport, o = a.clientWidth, f = a.clientHeight, s = 0, i = 0;
  if (n) {
    o = n.width, f = n.height;
    var c = ie();
    (c || !c && e === "fixed") && (s = n.offsetLeft, i = n.offsetTop);
  }
  return {
    width: o,
    height: f,
    x: s + Wt(t),
    y: i
  };
}
function Ze(t) {
  var e, r = q(t), a = Mt(t), n = (e = t.ownerDocument) == null ? void 0 : e.body, o = J(r.scrollWidth, r.clientWidth, n ? n.scrollWidth : 0, n ? n.clientWidth : 0), f = J(r.scrollHeight, r.clientHeight, n ? n.scrollHeight : 0, n ? n.clientHeight : 0), s = -a.scrollLeft + Wt(t), i = -a.scrollTop;
  return N(n || r).direction === "rtl" && (s += J(r.clientWidth, n ? n.clientWidth : 0) - o), {
    width: o,
    height: f,
    x: s,
    y: i
  };
}
function Ht(t) {
  var e = N(t), r = e.overflow, a = e.overflowX, n = e.overflowY;
  return /auto|scroll|overlay|hidden/.test(r + n + a);
}
function ue(t) {
  return ["html", "body", "#document"].indexOf(V(t)) >= 0 ? t.ownerDocument.body : $(t) && Ht(t) ? t : ue(Et(t));
}
function st(t, e) {
  var r;
  e === void 0 && (e = []);
  var a = ue(t), n = a === ((r = t.ownerDocument) == null ? void 0 : r.body), o = j(a), f = n ? [o].concat(o.visualViewport || [], Ht(a) ? a : []) : a, s = e.concat(f);
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
function _e(t, e) {
  var r = tt(t, !1, e === "fixed");
  return r.top = r.top + t.clientTop, r.left = r.left + t.clientLeft, r.bottom = r.top + t.clientHeight, r.right = r.left + t.clientWidth, r.width = t.clientWidth, r.height = t.clientHeight, r.x = r.left, r.y = r.top, r;
}
function _t(t, e, r) {
  return e === ae ? Rt(Qe(t, r)) : K(e) ? _e(e, r) : Rt(Ze(q(t)));
}
function tr(t) {
  var e = st(Et(t)), r = ["absolute", "fixed"].indexOf(N(t).position) >= 0, a = r && $(t) ? lt(t) : t;
  return K(a) ? e.filter(function(n) {
    return K(n) && se(n, a) && V(n) !== "body";
  }) : [];
}
function er(t, e, r, a) {
  var n = e === "clippingParents" ? tr(t) : [].concat(e), o = [].concat(n, [r]), f = o[0], s = o.reduce(function(i, c) {
    var p = _t(t, c, a);
    return i.top = J(p.top, i.top), i.right = Ot(p.right, i.right), i.bottom = Ot(p.bottom, i.bottom), i.left = J(p.left, i.left), i;
  }, _t(t, f, a));
  return s.width = s.right - s.left, s.height = s.bottom - s.top, s.x = s.left, s.y = s.top, s;
}
function le(t) {
  var e = t.reference, r = t.element, a = t.placement, n = a ? H(a) : null, o = a ? et(a) : null, f = e.x + e.width / 2 - r.width / 2, s = e.y + e.height / 2 - r.height / 2, i;
  switch (n) {
    case k:
      i = {
        x: f,
        y: e.y - r.height
      };
      break;
    case T:
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
    switch (o) {
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
  var r = e, a = r.placement, n = a === void 0 ? t.placement : a, o = r.strategy, f = o === void 0 ? t.strategy : o, s = r.boundary, i = s === void 0 ? xe : s, c = r.rootBoundary, p = c === void 0 ? ae : c, h = r.elementContext, y = h === void 0 ? ot : h, u = r.altBoundary, w = u === void 0 ? !1 : u, v = r.padding, d = v === void 0 ? 0 : v, b = pe(typeof d != "number" ? d : ce(d, ut)), O = y === ot ? Oe : ot, E = t.rects.popper, l = t.elements[w ? O : y], m = er(K(l) ? l : l.contextElement || q(t.elements.popper), i, p, f), g = tt(t.elements.reference), x = le({
    reference: g,
    element: E,
    strategy: "absolute",
    placement: n
  }), S = Rt(Object.assign({}, E, x)), D = y === ot ? S : g, A = {
    top: m.top - D.top + b.top,
    bottom: D.bottom - m.bottom + b.bottom,
    left: m.left - D.left + b.left,
    right: D.right - m.right + b.right
  }, C = t.modifiersData.offset;
  if (y === ot && C) {
    var M = C[n];
    Object.keys(A).forEach(function(P) {
      var X = [L, T].indexOf(P) >= 0 ? 1 : -1, Y = [k, T].indexOf(P) >= 0 ? "y" : "x";
      A[P] += M[Y] * X;
    });
  }
  return A;
}
function rr(t, e) {
  e === void 0 && (e = {});
  var r = e, a = r.placement, n = r.boundary, o = r.rootBoundary, f = r.padding, s = r.flipVariations, i = r.allowedAutoPlacements, c = i === void 0 ? oe : i, p = et(a), h = p ? s ? Jt : Jt.filter(function(w) {
    return et(w) === p;
  }) : ut, y = h.filter(function(w) {
    return c.indexOf(w) >= 0;
  });
  y.length === 0 && (y = h);
  var u = y.reduce(function(w, v) {
    return w[v] = pt(t, {
      placement: v,
      boundary: n,
      rootBoundary: o,
      padding: f
    })[H(v)], w;
  }, {});
  return Object.keys(u).sort(function(w, v) {
    return u[w] - u[v];
  });
}
function nr(t) {
  if (H(t) === jt)
    return [];
  var e = xt(t);
  return [Zt(t), e, Zt(e)];
}
function ar(t) {
  var e = t.state, r = t.options, a = t.name;
  if (!e.modifiersData[a]._skip) {
    for (var n = r.mainAxis, o = n === void 0 ? !0 : n, f = r.altAxis, s = f === void 0 ? !0 : f, i = r.fallbackPlacements, c = r.padding, p = r.boundary, h = r.rootBoundary, y = r.altBoundary, u = r.flipVariations, w = u === void 0 ? !0 : u, v = r.allowedAutoPlacements, d = e.options.placement, b = H(d), O = b === d, E = i || (O || !w ? [xt(d)] : nr(d)), l = [d].concat(E).reduce(function(Q, F) {
      return Q.concat(H(F) === jt ? rr(e, {
        placement: F,
        boundary: p,
        rootBoundary: h,
        padding: c,
        flipVariations: w,
        allowedAutoPlacements: v
      }) : F);
    }, []), m = e.rects.reference, g = e.rects.popper, x = /* @__PURE__ */ new Map(), S = !0, D = l[0], A = 0; A < l.length; A++) {
      var C = l[A], M = H(C), P = et(C) === Z, X = [k, T].indexOf(M) >= 0, Y = X ? "width" : "height", R = pt(e, {
        placement: C,
        boundary: p,
        rootBoundary: h,
        altBoundary: y,
        padding: c
      }), W = X ? P ? L : B : P ? T : k;
      m[Y] > g[Y] && (W = xt(W));
      var dt = xt(W), z = [];
      if (o && z.push(R[M] <= 0), s && z.push(R[W] <= 0, R[dt] <= 0), z.every(function(Q) {
        return Q;
      })) {
        D = C, S = !1;
        break;
      }
      x.set(C, z);
    }
    if (S)
      for (var vt = w ? 3 : 1, At = function(F) {
        var nt = l.find(function(mt) {
          var U = x.get(mt);
          if (U)
            return U.slice(0, F).every(function(Dt) {
              return Dt;
            });
        });
        if (nt)
          return D = nt, "break";
      }, rt = vt; rt > 0; rt--) {
        var ht = At(rt);
        if (ht === "break")
          break;
      }
    e.placement !== D && (e.modifiersData[a]._skip = !0, e.placement = D, e.reset = !0);
  }
}
const or = {
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
  return [k, L, T, B].some(function(e) {
    return t[e] >= 0;
  });
}
function ir(t) {
  var e = t.state, r = t.name, a = e.rects.reference, n = e.rects.popper, o = e.modifiersData.preventOverflow, f = pt(e, {
    elementContext: "reference"
  }), s = pt(e, {
    altBoundary: !0
  }), i = te(f, a), c = te(s, n, o), p = ee(i), h = ee(c);
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
const sr = {
  name: "hide",
  enabled: !0,
  phase: "main",
  requiresIfExists: ["preventOverflow"],
  fn: ir
};
function fr(t, e, r) {
  var a = H(t), n = [B, k].indexOf(a) >= 0 ? -1 : 1, o = typeof r == "function" ? r(Object.assign({}, e, {
    placement: t
  })) : r, f = o[0], s = o[1];
  return f = f || 0, s = (s || 0) * n, [B, L].indexOf(a) >= 0 ? {
    x: s,
    y: f
  } : {
    x: f,
    y: s
  };
}
function pr(t) {
  var e = t.state, r = t.options, a = t.name, n = r.offset, o = n === void 0 ? [0, 0] : n, f = oe.reduce(function(p, h) {
    return p[h] = fr(h, e.rects, o), p;
  }, {}), s = f[e.placement], i = s.x, c = s.y;
  e.modifiersData.popperOffsets != null && (e.modifiersData.popperOffsets.x += i, e.modifiersData.popperOffsets.y += c), e.modifiersData[a] = f;
}
const cr = {
  name: "offset",
  enabled: !0,
  phase: "main",
  requires: ["popperOffsets"],
  fn: pr
};
function ur(t) {
  var e = t.state, r = t.name;
  e.modifiersData[r] = le({
    reference: e.rects.reference,
    element: e.rects.popper,
    strategy: "absolute",
    placement: e.placement
  });
}
const lr = {
  name: "popperOffsets",
  enabled: !0,
  phase: "read",
  fn: ur,
  data: {}
};
function dr(t) {
  return t === "x" ? "y" : "x";
}
function vr(t) {
  var e = t.state, r = t.options, a = t.name, n = r.mainAxis, o = n === void 0 ? !0 : n, f = r.altAxis, s = f === void 0 ? !1 : f, i = r.boundary, c = r.rootBoundary, p = r.altBoundary, h = r.padding, y = r.tether, u = y === void 0 ? !0 : y, w = r.tetherOffset, v = w === void 0 ? 0 : w, d = pt(e, {
    boundary: i,
    rootBoundary: c,
    padding: h,
    altBoundary: p
  }), b = H(e.placement), O = et(e.placement), E = !O, l = Lt(b), m = dr(l), g = e.modifiersData.popperOffsets, x = e.rects.reference, S = e.rects.popper, D = typeof v == "function" ? v(Object.assign({}, e.rects, {
    placement: e.placement
  })) : v, A = typeof D == "number" ? {
    mainAxis: D,
    altAxis: D
  } : Object.assign({
    mainAxis: 0,
    altAxis: 0
  }, D), C = e.modifiersData.offset ? e.modifiersData.offset[e.placement] : null, M = {
    x: 0,
    y: 0
  };
  if (!!g) {
    if (o) {
      var P, X = l === "y" ? k : B, Y = l === "y" ? T : L, R = l === "y" ? "height" : "width", W = g[l], dt = W + d[X], z = W - d[Y], vt = u ? -S[R] / 2 : 0, At = O === Z ? x[R] : S[R], rt = O === Z ? -S[R] : -x[R], ht = e.elements.arrow, Q = u && ht ? Tt(ht) : {
        width: 0,
        height: 0
      }, F = e.modifiersData["arrow#persistent"] ? e.modifiersData["arrow#persistent"].padding : fe(), nt = F[X], mt = F[Y], U = it(0, x[R], Q[R]), Dt = E ? x[R] / 2 - vt - U - nt - A.mainAxis : At - U - nt - A.mainAxis, ve = E ? -x[R] / 2 + vt + U + mt + A.mainAxis : rt + U + mt + A.mainAxis, St = e.elements.arrow && lt(e.elements.arrow), he = St ? l === "y" ? St.clientTop || 0 : St.clientLeft || 0 : 0, Vt = (P = C == null ? void 0 : C[l]) != null ? P : 0, me = W + Dt - Vt - he, ge = W + ve - Vt, Nt = it(u ? Ot(dt, me) : dt, W, u ? J(z, ge) : z);
      g[l] = Nt, M[l] = Nt - W;
    }
    if (s) {
      var Ft, ye = l === "x" ? k : B, be = l === "x" ? T : L, G = g[m], gt = m === "y" ? "height" : "width", It = G + d[ye], qt = G - d[be], Ct = [k, B].indexOf(b) !== -1, Xt = (Ft = C == null ? void 0 : C[m]) != null ? Ft : 0, Yt = Ct ? It : G - x[gt] - S[gt] - Xt + A.altAxis, zt = Ct ? G + x[gt] + S[gt] - Xt - A.altAxis : qt, Ut = u && Ct ? He(Yt, G, zt) : it(u ? Yt : It, G, u ? zt : qt);
      g[m] = Ut, M[m] = Ut - G;
    }
    e.modifiersData[a] = M;
  }
}
const hr = {
  name: "preventOverflow",
  enabled: !0,
  phase: "main",
  fn: vr,
  requiresIfExists: ["offset"]
};
function mr(t) {
  return {
    scrollLeft: t.scrollLeft,
    scrollTop: t.scrollTop
  };
}
function gr(t) {
  return t === j(t) || !$(t) ? Mt(t) : mr(t);
}
function yr(t) {
  var e = t.getBoundingClientRect(), r = _(e.width) / t.offsetWidth || 1, a = _(e.height) / t.offsetHeight || 1;
  return r !== 1 || a !== 1;
}
function br(t, e, r) {
  r === void 0 && (r = !1);
  var a = $(e), n = $(e) && yr(e), o = q(e), f = tt(t, n, r), s = {
    scrollLeft: 0,
    scrollTop: 0
  }, i = {
    x: 0,
    y: 0
  };
  return (a || !a && !r) && ((V(e) !== "body" || Ht(o)) && (s = gr(e)), $(e) ? (i = tt(e, !0), i.x += e.clientLeft, i.y += e.clientTop) : o && (i.x = Wt(o))), {
    x: f.left + s.scrollLeft - i.x,
    y: f.top + s.scrollTop - i.y,
    width: f.width,
    height: f.height
  };
}
function wr(t) {
  var e = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Set(), a = [];
  t.forEach(function(o) {
    e.set(o.name, o);
  });
  function n(o) {
    r.add(o.name);
    var f = [].concat(o.requires || [], o.requiresIfExists || []);
    f.forEach(function(s) {
      if (!r.has(s)) {
        var i = e.get(s);
        i && n(i);
      }
    }), a.push(o);
  }
  return t.forEach(function(o) {
    r.has(o.name) || n(o);
  }), a;
}
function xr(t) {
  var e = wr(t);
  return je.reduce(function(r, a) {
    return r.concat(e.filter(function(n) {
      return n.phase === a;
    }));
  }, []);
}
function Or(t) {
  var e;
  return function() {
    return e || (e = new Promise(function(r) {
      Promise.resolve().then(function() {
        e = void 0, r(t());
      });
    })), e;
  };
}
function Er(t) {
  var e = t.reduce(function(r, a) {
    var n = r[a.name];
    return r[a.name] = n ? Object.assign({}, n, a, {
      options: Object.assign({}, n.options, a.options),
      data: Object.assign({}, n.data, a.data)
    }) : a, r;
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
  return !e.some(function(a) {
    return !(a && typeof a.getBoundingClientRect == "function");
  });
}
function Ar(t) {
  t === void 0 && (t = {});
  var e = t, r = e.defaultModifiers, a = r === void 0 ? [] : r, n = e.defaultOptions, o = n === void 0 ? re : n;
  return function(s, i, c) {
    c === void 0 && (c = o);
    var p = {
      placement: "bottom",
      orderedModifiers: [],
      options: Object.assign({}, re, o),
      modifiersData: {},
      elements: {
        reference: s,
        popper: i
      },
      attributes: {},
      styles: {}
    }, h = [], y = !1, u = {
      state: p,
      setOptions: function(b) {
        var O = typeof b == "function" ? b(p.options) : b;
        v(), p.options = Object.assign({}, o, p.options, O), p.scrollParents = {
          reference: K(s) ? st(s) : s.contextElement ? st(s.contextElement) : [],
          popper: st(i)
        };
        var E = xr(Er([].concat(a, p.options.modifiers)));
        return p.orderedModifiers = E.filter(function(l) {
          return l.enabled;
        }), w(), u.update();
      },
      forceUpdate: function() {
        if (!y) {
          var b = p.elements, O = b.reference, E = b.popper;
          if (!!ne(O, E)) {
            p.rects = {
              reference: br(O, lt(E), p.options.strategy === "fixed"),
              popper: Tt(E)
            }, p.reset = !1, p.placement = p.options.placement, p.orderedModifiers.forEach(function(A) {
              return p.modifiersData[A.name] = Object.assign({}, A.data);
            });
            for (var l = 0; l < p.orderedModifiers.length; l++) {
              if (p.reset === !0) {
                p.reset = !1, l = -1;
                continue;
              }
              var m = p.orderedModifiers[l], g = m.fn, x = m.options, S = x === void 0 ? {} : x, D = m.name;
              typeof g == "function" && (p = g({
                state: p,
                options: S,
                name: D,
                instance: u
              }) || p);
            }
          }
        }
      },
      update: Or(function() {
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
    function w() {
      p.orderedModifiers.forEach(function(d) {
        var b = d.name, O = d.options, E = O === void 0 ? {} : O, l = d.effect;
        if (typeof l == "function") {
          var m = l({
            state: p,
            name: b,
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
var Dr = [Ge, lr, ze, Le, cr, or, hr, Ie, sr], Sr = /* @__PURE__ */ Ar({
  defaultModifiers: Dr
});
const Cr = (t, e) => {
  const r = t.__vccOpts || t;
  for (const [a, n] of e)
    r[a] = n;
  return r;
};
var Pr = 0, kr = function() {
  return "dropdown-" + Pr++;
}, Br = [
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
    var r = I[e].el, a = I[e].fn;
    t.target !== r && !r.contains(t.target) && Rr(a, t);
  }
}, Rr = function(t, e) {
  !t || setTimeout(function() {
    t(e);
  }, 10);
}, jr = function() {
  for (var t in ct)
    document.addEventListener(ct[t], de);
}, $r = function() {
  if (!(I.length > 0))
    for (var t in ct)
      document.removeEventListener(ct[t], de);
};
const Tr = {
  name: "bootstrap-dropdown",
  data() {
    return {
      isShow: !1
    };
  },
  props: ["title", "placement", "btn-class", "btn-split", "dropdown-class"],
  watch: {},
  computed: {
    dropdownClass: function() {
      var t = "";
      return this.isShow && (t = t + " show"), this.dropdownClass && (t = t + " " + this.dropdownClass), t;
    }
  },
  methods: {
    switchState: function() {
      this.isShow = !this.isShow;
      var t = "bottom-start";
      Br.indexOf(this.placement) !== -1 && (t = this.placement), this.isShow && Sr(this.$refs.button, this.$refs.popup, {
        placement: t
      });
    }
  },
  beforeUnmount() {
    for (var t in I)
      I[t].el === this.$el && I.splice(t, 1);
    $r();
  },
  mounted() {
    jr();
    var t = this;
    I.push({
      el: this.$el,
      fn: function() {
        t.isShow = !1;
      }
    });
  },
  created: function() {
    this.id = kr();
  }
}, Lr = ["id", "aria-expanded"], Mr = { class: "btn-group" }, Wr = ["id"], Hr = ["aria-expanded"], Vr = /* @__PURE__ */ kt("span", { class: "visually-hidden" }, "Toggle Dropdown", -1), Nr = [
  Vr
], Fr = ["aria-labelledby"];
function Ir(t, e, r, a, n, o) {
  return yt(), bt("div", {
    class: at(["dropdown", { show: n.isShow }])
  }, [
    t.btnSplit ? Pt("", !0) : (yt(), bt("button", {
      key: 0,
      class: at(["btn dropdown-toggle", t.btnClass]),
      type: "button",
      "data-toggle": "dropdown",
      "aria-haspopup": "true",
      id: t.id,
      ref: "button",
      onClick: e[0] || (e[0] = (...f) => o.switchState && o.switchState(...f)),
      "aria-expanded": n.isShow
    }, Gt(r.title), 11, Lr)),
    kt("div", Mr, [
      t.btnSplit ? (yt(), bt("button", {
        key: 0,
        class: at(["btn", t.btnClass]),
        type: "button",
        "data-toggle": "dropdown",
        "aria-haspopup": "true",
        id: t.id,
        ref: "button"
      }, Gt(r.title), 11, Wr)) : Pt("", !0),
      t.btnSplit ? (yt(), bt("button", {
        key: 1,
        class: at(["btn dropdown-toggle dropdown-toggle-split", t.btnClass]),
        type: "button",
        "data-toggle": "dropdown",
        "aria-haspopup": "true",
        "aria-expanded": n.isShow,
        onClick: e[1] || (e[1] = (...f) => o.switchState && o.switchState(...f))
      }, Nr, 10, Hr)) : Pt("", !0)
    ]),
    kt("div", {
      class: at(["dropdown-menu", o.dropdownClass]),
      ref: "popup",
      "data-bs-popper": "static",
      "aria-labelledby": t.id,
      onClick: e[2] || (e[2] = (...f) => o.switchState && o.switchState(...f))
    }, [
      we(t.$slots, "default")
    ], 10, Fr)
  ], 2);
}
const Xr = /* @__PURE__ */ Cr(Tr, [["render", Ir]]);
export {
  Xr as default
};
