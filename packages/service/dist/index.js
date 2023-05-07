import { upperFirst as p } from "lodash-es";
import { createGlobalState as F } from "@vueuse/shared";
const R = /^http(s?):\/\/.*?\//, S = /^http(s?)/, x = /\((.+?)\)/g, j = F(() => {
  const i = {}, r = {};
  return {
    services: i,
    urls: r,
    install: (s) => {
      s.apis.forEach((h) => {
        var g, $;
        let [l, m = "get", E = ""] = h.split("|");
        const o = l.match(x);
        let n = l.replace(R, "").replace(x, "").split("/").reduce((e, c) => (c.indexOf("-") > -1 ? e.concat(c.split("-").map((t) => p(t))) : e.push(p(c)), e), []).join("");
        (g = l == null ? void 0 : l.match(S)) != null && g[0] && (n = p(($ = l.match(S)) == null ? void 0 : $[0]) + n);
        const u = E || n;
        o || (r[u] = l), i[u] = (e, c) => {
          let [t] = h.split("|");
          o && o.forEach((b) => {
            const P = b.replace(/^\(|\)$/g, "");
            t = t.replace(b, e == null ? void 0 : e[P]), e == null || delete e[P];
          }), s.appRoot && !t.match(R) && (t = `${s.appRoot}${t}`);
          let a = {
            url: t,
            method: m,
            ...c
          };
          return s.isMini ? s.$http({ data: e, ...a }) : s.$http(m === "get" ? { params: e, ...a } : { data: e, ...a });
        };
      }), s.debug && (console.log(i), console.log(r));
    }
  };
})(), q = {
  install: (i, r) => {
    const { $http: f } = r;
    if (!f)
      return new Error(
        "Missing $http field configuration. Please specify the object responsible for sending the request, such as axios"
      );
    j.install(r);
  }
};
export {
  j as FlatanServiceStore,
  q as default
};
