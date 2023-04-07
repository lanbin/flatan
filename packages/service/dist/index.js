import { upperFirst as a } from "lodash-es";
import { createGlobalState as E } from "@vueuse/shared";
const R = /^http(s?):\/\/.*?\//, b = /^http(s?)/, P = /\((.+?)\)/g, F = E(() => {
  const i = {}, l = {};
  return {
    services: i,
    urls: l,
    install: (s) => {
      s.apis.forEach((S) => {
        var m, g;
        let [e, f = "get", x = ""] = S.split("|");
        const o = e.match(P);
        let n = e.replace(R, "").replace(P, "").split("/").reduce((t, r) => (r.indexOf("-") > -1 ? t.concat(r.split("-").map((c) => a(c))) : t.push(a(r)), t), []).join("");
        (m = e == null ? void 0 : e.match(b)) != null && m[0] && (n = a((g = e.match(b)) == null ? void 0 : g[0]) + n);
        const h = x || n;
        o || (l[h] = e), i[h] = (t, r) => {
          o && o.forEach((u) => {
            const $ = u.replace(/^\(|\)$/g, "");
            e = e.replace(u, (t == null ? void 0 : t[$]) || ""), t == null || delete t[$];
          }), s.appRoot && !e.match(R) && (e = `${s.appRoot}${e}`);
          let c = {
            url: e,
            method: f,
            ...r
          };
          return s.isMini ? s.$http({ data: t, ...c }) : s.$http(f === "get" ? { params: t, ...c } : { data: t, ...c });
        };
      }), s.debug && (console.log(i), console.log(l));
    }
  };
})(), M = {
  install: (i, l) => {
    const { $http: p } = l;
    if (!p)
      return new Error(
        "Missing $http field configuration. Please specify the object responsible for sending the request, such as axios"
      );
    F.install(l);
  }
};
export {
  F as FlatanServiceStore,
  M as default
};
