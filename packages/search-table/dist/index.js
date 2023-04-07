import { defineComponent as N, ref as c, onMounted as T, watch as $, openBlock as v, createElementBlock as w, createElementVNode as k, normalizeClass as O, Fragment as P, renderList as E, createBlock as L, resolveDynamicComponent as M, mergeProps as x, renderSlot as p, createVNode as f, unref as m, withCtx as h, createTextVNode as S, normalizeProps as Q, guardReactiveProps as V } from "vue";
import { Button as z, Table as j } from "ant-design-vue";
import { merge as D } from "lodash-es";
const I = { class: "search-table-wrapper" }, U = { class: "search-table-filters-action-btn-wrapper" }, F = /* @__PURE__ */ N({
  __name: "index",
  props: ["options"],
  setup(r, { expose: i }) {
    const n = r, s = c(!1), l = c({}), o = c({
      page: 1,
      current: 1,
      size: "10",
      showLessItems: !0,
      showSizeChanger: !1,
      showQuickJumper: !0,
      showTotal: (e) => `共有 ${e} 项`,
      onChange: (e) => B(e)
    }), a = c({
      fetchNow: !0
    }), b = c([]), _ = () => {
      o.value.page = 1, o.value.current = 1, u();
    }, g = () => {
      Object.keys(l.value).forEach((e) => l.value[e] = null);
    }, u = async () => {
      if (!s.value)
        try {
          s.value = !0, a.value.beforeQuery && a.value.beforeQuery(l.value);
          const { total: e, page: d, size: t, ...y } = o.value, C = await a.value.fetchMethod({
            ...l.value,
            page: d,
            size: Number(t)
          });
          o.value.current = d, o.value.total = C.total, b.value = C.rows;
        } catch {
        } finally {
          s.value = !1;
        }
    }, B = (e) => {
      o.value.page = e, u();
    };
    return T(() => {
      a.value.fetchNow && a.value.fetchMethod && u();
    }), $(
      () => n.options,
      () => {
        a.value = D(n.options, a.value);
      },
      { immediate: !0 }
    ), i({
      fetch: u,
      reset: g,
      search: _
    }), (e, d) => (v(), w("div", I, [
      k("div", {
        class: O(["search-table-filters", a.value.formClass])
      }, [
        (v(!0), w(P, null, E(a.value.formOptions, (t) => (v(), L(M(t.type), x({
          key: t.name,
          placeholder: t.label,
          allowClear: !0,
          class: "search-table-filters-item"
        }, t.$attrs, {
          value: l.value[t.name],
          "onUpdate:value": (y) => l.value[t.name] = y
        }), null, 16, ["placeholder", "value", "onUpdate:value"]))), 128))
      ], 2),
      k("div", U, [
        p(e.$slots, "beforeBtn", {}, void 0, !0),
        f(m(z), {
          type: "primary",
          onClick: _
        }, {
          default: h(() => [
            S("查询")
          ]),
          _: 1
        }),
        f(m(z), { onClick: g }, {
          default: h(() => [
            S("重置")
          ]),
          _: 1
        }),
        p(e.$slots, "afterBtn", {}, void 0, !0)
      ]),
      f(m(j), x({
        class: "search-table-body",
        columns: a.value.tableCol,
        dataSource: b.value,
        scroll: { x: "max-content" },
        loading: s.value,
        pagination: o.value,
        tableLayout: "fixed"
      }, e.$attrs), {
        bodyCell: h((t) => [
          p(e.$slots, "bodyCell", Q(V(t)), void 0, !0)
        ]),
        _: 3
      }, 16, ["columns", "dataSource", "loading", "pagination"])
    ]));
  }
});
const J = (r, i) => {
  const n = r.__vccOpts || r;
  for (const [s, l] of i)
    n[s] = l;
  return n;
}, R = /* @__PURE__ */ J(F, [["__scopeId", "data-v-ab16d9dd"]]), H = {
  install: (r) => {
    r.component("SearchTable", R);
  }
};
export {
  H as default
};
