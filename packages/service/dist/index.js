import { upperFirst as a } from "lodash-es";
import { createGlobalState as S } from "@vueuse/shared";
const R = /^http(s?):\/\/.*?\//, b = /^http(s?)/, P = /\((.+?)\)/g, j = S(() => {
  const i = {}, r = {};
  return {
    services: i,
    urls: r,
    install: (s) => {
      s.apis.forEach((x) => {
        var m, g;
        let [e, f = "get", E = ""] = x.split("|");
        const o = e.match(P);
        let n = e.replace(R, "").replace(P, "").split("/").reduce((t, l) => (l.indexOf("-") > -1 ? t.concat(l.split("-").map((c) => a(c))) : t.push(a(l)), t), []).join("");
        (m = e == null ? void 0 : e.match(b)) != null && m[0] && (n = a((g = e.match(b)) == null ? void 0 : g[0]) + n);
        const h = E || n;
        o || (r[h] = e), i[h] = (t, l) => {
          o && o.forEach((u) => {
            const $ = u.replace(/^\(|\)$/g, "");
            e = e.replace(u, (t == null ? void 0 : t[$]) || ""), t == null || delete t[$];
          }), s.appRoot && !e.match(R) && (e = `${s.appRoot}${e}`);
          let c = {
            url: e,
            method: f,
            ...l
          };
          return s.isMini ? s.$http({ data: t, ...c }) : s.$http(f === "get" ? { params: t, ...c } : { data: t, ...c });
        }, s.debug && (console.log(i), console.log(r));
      });
    }
  };
})(), M = (i, r) => {
  const { $http: p } = r;
  if (!p)
    return new Error(
      "Missing $http field configuration. Please specify the object responsible for sending the request, such as axios"
    );
  j.install(r);
};
export {
  j as FlatServiceStore,
  M as default
};
