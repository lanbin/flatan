import { defineComponent as O, ref as i, onMounted as P, watch as E, openBlock as v, createElementBlock as S, createElementVNode as k, normalizeClass as L, Fragment as M, renderList as Q, createBlock as V, resolveDynamicComponent as j, mergeProps as z, renderSlot as d, createVNode as h, unref as f, withCtx as m, createTextVNode as x, normalizeProps as D, guardReactiveProps as I } from "vue";
import { Button as B, Table as U } from "ant-design-vue";
import { merge as N } from "lodash-es";
const F = { class: "search-table-wrapper" }, J = { class: "search-table-filters-action-btn-wrapper" }, R = /* @__PURE__ */ O({
  __name: "index",
  props: ["options"],
  setup(r, { expose: p }) {
    var y;
    const l = r, s = i(!1), n = i({}), a = i({
      page: 1,
      current: 1,
      pageSize: 10,
      showLessItems: !0,
      showSizeChanger: !0,
      showQuickJumper: !0,
      showTotal: (e) => `共有 ${e} 项`,
      onChange: (e) => T(e),
      onShowSizeChange: (e, u) => $(u),
      ...(y = l.options) == null ? void 0 : y.pagination
    }), t = i({
      fetchNow: !0
    }), g = i([]), b = () => {
      a.value.page = 1, a.value.current = 1, c();
    }, _ = () => {
      Object.keys(n.value).forEach((e) => n.value[e] = null);
    }, c = async () => {
      if (!s.value)
        try {
          s.value = !0, t.value.beforeQuery && t.value.beforeQuery(n.value);
          const { total: e, page: u, pageSize: o, ...C } = a.value, w = await t.value.fetchMethod({
            ...n.value,
            page: u,
            size: Number(o)
          });
          a.value.current = u, l.options.pagination.total || (a.value.total = w.total), g.value = w.rows;
        } catch {
        } finally {
          s.value = !1;
        }
    }, T = (e) => {
      a.value.page = e, c();
    }, $ = (e) => {
      a.value.pageSize = e, c();
    };
    return P(() => {
      t.value.fetchNow && t.value.fetchMethod && c();
    }), E(
      () => l.options,
      () => {
        t.value = N(l.options, t.value), a.value = N(a.value, l.options.pagination);
      },
      { immediate: !0 }
    ), p({
      fetch: c,
      reset: _,
      search: b
    }), (e, u) => (v(), S("div", F, [
      k("div", {
        class: L(["search-table-filters", t.value.formClass])
      }, [
        (v(!0), S(M, null, Q(t.value.formOptions, (o) => (v(), V(j(o.type), z({
          key: o.name,
          placeholder: o.label,
          allowClear: !0,
          class: "search-table-filters-item"
        }, o.$attrs, {
          value: n.value[o.name],
          "onUpdate:value": (C) => n.value[o.name] = C
        }), null, 16, ["placeholder", "value", "onUpdate:value"]))), 128))
      ], 2),
      k("div", J, [
        d(e.$slots, "beforeBtn", {}, void 0, !0),
        h(f(B), {
          type: "primary",
          onClick: b
        }, {
          default: m(() => [
            x("查询")
          ]),
          _: 1
        }),
        h(f(B), { onClick: _ }, {
          default: m(() => [
            x("重置")
          ]),
          _: 1
        }),
        d(e.$slots, "afterBtn", {}, void 0, !0)
      ]),
      h(f(U), z({
        class: "search-table-body",
        columns: t.value.tableCol,
        dataSource: g.value,
        scroll: { x: "max-content" },
        loading: s.value,
        pagination: a.value,
        tableLayout: "fixed"
      }, e.$attrs), {
        bodyCell: m((o) => [
          d(e.$slots, "bodyCell", D(I(o)), void 0, !0)
        ]),
        _: 3
      }, 16, ["columns", "dataSource", "loading", "pagination"])
    ]));
  }
});
const q = (r, p) => {
  const l = r.__vccOpts || r;
  for (const [s, n] of p)
    l[s] = n;
  return l;
}, A = /* @__PURE__ */ q(R, [["__scopeId", "data-v-6b90ebc0"]]), W = {
  install: (r) => {
    r.component("SearchTable", A);
  }
};
export {
  W as default
};
