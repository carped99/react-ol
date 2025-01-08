import E from "ol-ext/overlay/Tooltip";
import { createContext as C, useEffect as u, useContext as O, useRef as T, useMemo as m } from "react";
import "ol";
import "ol/layer/Group";
import "react/jsx-runtime";
import { unByKey as p } from "ol/Observable";
import "ol/View";
import "ol/interaction";
import "ol/interaction/Pointer";
import "ol/layer/Graticule";
import "ol/layer/Heatmap";
import "ol/layer/Image";
import "ol/source";
import "ol/layer";
import "ol/layer/VectorImage";
import "ol/layer/Vector";
import "ol/layer/VectorTile";
import "ol/layer/WebGLTile";
import "ol/style";
import "ol/render";
import "ol/proj";
import _ from "ol-ext/overlay/Popup";
import b from "ol-ext/interaction/DrawHole";
import I from "ol-ext/interaction/Transform";
const P = C(void 0), g = () => {
  const t = O(P);
  if (!t)
    throw new Error("useMapContext must be used within a MapProvider");
  return t;
}, w = (t, e) => {
  const r = T([]);
  u(() => {
    if (t)
      return () => {
        p(r.current), r.current = [];
      };
  }, [t]), u(() => {
    if (!t) return;
    const n = x(), o = H(r.current, n);
    Object.entries(n).filter(([s]) => !o.some((a) => a.type === s)).forEach(([s, a]) => {
      const l = t.on(s, a);
      o.push(l);
    }), r.current = o;
  }, [t, e]);
}, x = (t) => Object.entries({}).filter(([e, r]) => A(e, r)).reduce((e, [r, n]) => {
  const o = D(r);
  return e[o] = n, e;
}, {}), A = (t, e) => typeof e == "function", j = (t) => t === t.toUpperCase(), D = (t) => {
  if (t.length > 2 && t.startsWith("on") && j(t[2])) {
    const e = t.slice(2);
    return e.length > 6 && e.startsWith("Change") ? "change:" + e[6].toLowerCase() + e.slice(7) : e.toLowerCase();
  }
  return t;
}, H = (t, e) => {
  const { validKeys: r, invalidKeys: n } = t.reduce(
    (o, s) => {
      const { type: a, listener: l } = s;
      return e[a] === l ? o.validKeys.push(s) : o.invalidKeys.push(s), o;
    },
    { validKeys: [], invalidKeys: [] }
  );
  return n.length > 0 && p(n), r;
};
var d, y;
typeof process < "u" && (d = process == null ? void 0 : process.env) != null && d.REACT_OL_DEBUG || typeof window < "u" && ((y = window == null ? void 0 : window.location) != null && y.search.includes("react-ol-debug=true"));
const v = (t, e, r = !0) => {
  const { map: n } = g();
  w(t, e), u(() => {
    if (!(!n || !t))
      return n.addInteraction(t), () => {
        n.removeInteraction(t);
      };
  }, [n, t]), u(() => {
    t == null || t.setActive(r);
  }, [t, r]);
}, K = (t, e) => {
  const { map: r } = g();
  w(t, e), u(() => {
    if (!(!r || !t))
      return r.addOverlay(t), () => {
        r.removeOverlay(t);
      };
  }, [r, t]);
}, st = (t) => {
  const e = m(() => new E(t), [t]);
  return K(e), e;
}, at = (t) => {
  const e = m(() => new _(t), [t]);
  return K(e), e;
}, it = (t, e = !0) => {
  const r = m(() => new b(t), [t]);
  return v(r, void 0, e), u(() => {
    t.trace && r.setTrace(t.trace);
  }, [r, t.trace]), r;
}, L = (t = {}, e = !0) => {
  const r = m(() => new I(t), [t]);
  return v(r, void 0, e), r;
}, h = "rotate:angle", ut = ({ active: t, layers: e }) => {
  const r = m(
    () => ({
      layers: e,
      translate: !0,
      stretch: !1,
      scale: !1,
      rotate: !0
    }),
    [e]
  ), n = L(r, t);
  u(() => {
    const o = "__rotating:angle__", s = n.on("rotatestart", (c) => {
      c.features.forEach((i) => {
        const f = i.get(h) || 0;
        i.set(o, f, !0);
      });
    }), a = n.on("rotateend", (c) => {
      c.features.forEach((i) => {
        i.unset(o, !0);
      });
    }), l = n.on("rotating", (c) => {
      c.features.forEach((i) => {
        const f = i.get(o);
        i.set(h, f - c.angle, !0);
      });
    });
    return () => {
      p(s), p(a), p(l);
    };
  }, [n]);
};
export {
  h as RotateAnglePropertyName,
  it as useDrawHoleInteraction,
  at as usePopupOverlay,
  st as useTooltipOverlay,
  ut as useTransformHandler,
  L as useTransformInteraction
};
//# sourceMappingURL=index.es.js.map
