var Oe = /^-?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/i, ge = Math.ceil, H = Math.floor, D = "[BigNumber Error] ", de = D + "Number primitive has more than 15 significant digits: ", X = 1e14, O = 14, Ee = 9007199254740991, pe = [1, 10, 100, 1e3, 1e4, 1e5, 1e6, 1e7, 1e8, 1e9, 1e10, 1e11, 1e12, 1e13], J = 1e7, U = 1e9;
function Ne(p) {
  var h, w, A, E = g.prototype = { constructor: g, toString: null, valueOf: null }, R = new g(1), m = 20, I = 4, B = -7, C = 21, Q = -1e7, z = 1e7, K = !1, re = 1, Y = 0, oe = {
    prefix: "",
    groupSize: 3,
    secondaryGroupSize: 0,
    groupSeparator: ",",
    decimalSeparator: ".",
    fractionGroupSize: 0,
    fractionGroupSeparator: " ",
    // non-breaking space
    suffix: ""
  }, j = "0123456789abcdefghijklmnopqrstuvwxyz", le = !0;
  function g(e, r) {
    var t, l, n, s, c, i, f, u, o = this;
    if (!(o instanceof g))
      return new g(e, r);
    if (r == null) {
      if (e && e._isBigNumber === !0) {
        o.s = e.s, !e.c || e.e > z ? o.c = o.e = null : e.e < Q ? o.c = [o.e = 0] : (o.e = e.e, o.c = e.c.slice());
        return;
      }
      if ((i = typeof e == "number") && e * 0 == 0) {
        if (o.s = 1 / e < 0 ? (e = -e, -1) : 1, e === ~~e) {
          for (s = 0, c = e; c >= 10; c /= 10, s++)
            ;
          s > z ? o.c = o.e = null : (o.e = s, o.c = [e]);
          return;
        }
        u = String(e);
      } else {
        if (!Oe.test(u = String(e)))
          return A(o, u, i);
        o.s = u.charCodeAt(0) == 45 ? (u = u.slice(1), -1) : 1;
      }
      (s = u.indexOf(".")) > -1 && (u = u.replace(".", "")), (c = u.search(/e/i)) > 0 ? (s < 0 && (s = c), s += +u.slice(c + 1), u = u.substring(0, c)) : s < 0 && (s = u.length);
    } else {
      if (S(r, 2, j.length, "Base"), r == 10 && le)
        return o = new g(e), G(o, m + o.e + 1, I);
      if (u = String(e), i = typeof e == "number") {
        if (e * 0 != 0)
          return A(o, u, i, r);
        if (o.s = 1 / e < 0 ? (u = u.slice(1), -1) : 1, g.DEBUG && u.replace(/^0\.0*|\./, "").length > 15)
          throw Error(de + e);
      } else
        o.s = u.charCodeAt(0) === 45 ? (u = u.slice(1), -1) : 1;
      for (t = j.slice(0, r), s = c = 0, f = u.length; c < f; c++)
        if (t.indexOf(l = u.charAt(c)) < 0) {
          if (l == ".") {
            if (c > s) {
              s = f;
              continue;
            }
          } else if (!n && (u == u.toUpperCase() && (u = u.toLowerCase()) || u == u.toLowerCase() && (u = u.toUpperCase()))) {
            n = !0, c = -1, s = 0;
            continue;
          }
          return A(o, String(e), i, r);
        }
      i = !1, u = w(u, r, 10, o.s), (s = u.indexOf(".")) > -1 ? u = u.replace(".", "") : s = u.length;
    }
    for (c = 0; u.charCodeAt(c) === 48; c++)
      ;
    for (f = u.length; u.charCodeAt(--f) === 48; )
      ;
    if (u = u.slice(c, ++f)) {
      if (f -= c, i && g.DEBUG && f > 15 && (e > Ee || e !== H(e)))
        throw Error(de + o.s * e);
      if ((s = s - c - 1) > z)
        o.c = o.e = null;
      else if (s < Q)
        o.c = [o.e = 0];
      else {
        if (o.e = s, o.c = [], c = (s + 1) % O, s < 0 && (c += O), c < f) {
          for (c && o.c.push(+u.slice(0, c)), f -= O; c < f; )
            o.c.push(+u.slice(c, c += O));
          c = O - (u = u.slice(c)).length;
        } else
          c -= f;
        for (; c--; u += "0")
          ;
        o.c.push(+u);
      }
    } else
      o.c = [o.e = 0];
  }
  g.clone = Ne, g.ROUND_UP = 0, g.ROUND_DOWN = 1, g.ROUND_CEIL = 2, g.ROUND_FLOOR = 3, g.ROUND_HALF_UP = 4, g.ROUND_HALF_DOWN = 5, g.ROUND_HALF_EVEN = 6, g.ROUND_HALF_CEIL = 7, g.ROUND_HALF_FLOOR = 8, g.EUCLID = 9, g.config = g.set = function(e) {
    var r, t;
    if (e != null)
      if (typeof e == "object") {
        if (e.hasOwnProperty(r = "DECIMAL_PLACES") && (t = e[r], S(t, 0, U, r), m = t), e.hasOwnProperty(r = "ROUNDING_MODE") && (t = e[r], S(t, 0, 8, r), I = t), e.hasOwnProperty(r = "EXPONENTIAL_AT") && (t = e[r], t && t.pop ? (S(t[0], -U, 0, r), S(t[1], 0, U, r), B = t[0], C = t[1]) : (S(t, -U, U, r), B = -(C = t < 0 ? -t : t))), e.hasOwnProperty(r = "RANGE"))
          if (t = e[r], t && t.pop)
            S(t[0], -U, -1, r), S(t[1], 1, U, r), Q = t[0], z = t[1];
          else if (S(t, -U, U, r), t)
            Q = -(z = t < 0 ? -t : t);
          else
            throw Error(D + r + " cannot be zero: " + t);
        if (e.hasOwnProperty(r = "CRYPTO"))
          if (t = e[r], t === !!t)
            if (t)
              if (typeof crypto < "u" && crypto && (crypto.getRandomValues || crypto.randomBytes))
                K = t;
              else
                throw K = !t, Error(D + "crypto unavailable");
            else
              K = t;
          else
            throw Error(D + r + " not true or false: " + t);
        if (e.hasOwnProperty(r = "MODULO_MODE") && (t = e[r], S(t, 0, 9, r), re = t), e.hasOwnProperty(r = "POW_PRECISION") && (t = e[r], S(t, 0, U, r), Y = t), e.hasOwnProperty(r = "FORMAT"))
          if (t = e[r], typeof t == "object")
            oe = t;
          else
            throw Error(D + r + " not an object: " + t);
        if (e.hasOwnProperty(r = "ALPHABET"))
          if (t = e[r], typeof t == "string" && !/^.?$|[+\-.\s]|(.).*\1/.test(t))
            le = t.slice(0, 10) == "0123456789", j = t;
          else
            throw Error(D + r + " invalid: " + t);
      } else
        throw Error(D + "Object expected: " + e);
    return {
      DECIMAL_PLACES: m,
      ROUNDING_MODE: I,
      EXPONENTIAL_AT: [B, C],
      RANGE: [Q, z],
      CRYPTO: K,
      MODULO_MODE: re,
      POW_PRECISION: Y,
      FORMAT: oe,
      ALPHABET: j
    };
  }, g.isBigNumber = function(e) {
    if (!e || e._isBigNumber !== !0)
      return !1;
    if (!g.DEBUG)
      return !0;
    var r, t, l = e.c, n = e.e, s = e.s;
    e:
      if ({}.toString.call(l) == "[object Array]") {
        if ((s === 1 || s === -1) && n >= -U && n <= U && n === H(n)) {
          if (l[0] === 0) {
            if (n === 0 && l.length === 1)
              return !0;
            break e;
          }
          if (r = (n + 1) % O, r < 1 && (r += O), String(l[0]).length == r) {
            for (r = 0; r < l.length; r++)
              if (t = l[r], t < 0 || t >= X || t !== H(t))
                break e;
            if (t !== 0)
              return !0;
          }
        }
      } else if (l === null && n === null && (s === null || s === 1 || s === -1))
        return !0;
    throw Error(D + "Invalid BigNumber: " + e);
  }, g.maximum = g.max = function() {
    return we(arguments, E.lt);
  }, g.minimum = g.min = function() {
    return we(arguments, E.gt);
  }, g.random = function() {
    var e = 9007199254740992, r = Math.random() * e & 2097151 ? function() {
      return H(Math.random() * e);
    } : function() {
      return (Math.random() * 1073741824 | 0) * 8388608 + (Math.random() * 8388608 | 0);
    };
    return function(t) {
      var l, n, s, c, i, f = 0, u = [], o = new g(R);
      if (t == null ? t = m : S(t, 0, U), c = ge(t / O), K)
        if (crypto.getRandomValues) {
          for (l = crypto.getRandomValues(new Uint32Array(c *= 2)); f < c; )
            i = l[f] * 131072 + (l[f + 1] >>> 11), i >= 9e15 ? (n = crypto.getRandomValues(new Uint32Array(2)), l[f] = n[0], l[f + 1] = n[1]) : (u.push(i % 1e14), f += 2);
          f = c / 2;
        } else if (crypto.randomBytes) {
          for (l = crypto.randomBytes(c *= 7); f < c; )
            i = (l[f] & 31) * 281474976710656 + l[f + 1] * 1099511627776 + l[f + 2] * 4294967296 + l[f + 3] * 16777216 + (l[f + 4] << 16) + (l[f + 5] << 8) + l[f + 6], i >= 9e15 ? crypto.randomBytes(7).copy(l, f) : (u.push(i % 1e14), f += 7);
          f = c / 7;
        } else
          throw K = !1, Error(D + "crypto unavailable");
      if (!K)
        for (; f < c; )
          i = r(), i < 9e15 && (u[f++] = i % 1e14);
      for (c = u[--f], t %= O, c && t && (i = pe[O - t], u[f] = H(c / i) * i); u[f] === 0; u.pop(), f--)
        ;
      if (f < 0)
        u = [s = 0];
      else {
        for (s = -1; u[0] === 0; u.splice(0, 1), s -= O)
          ;
        for (f = 1, i = u[0]; i >= 10; i /= 10, f++)
          ;
        f < O && (s -= O - f);
      }
      return o.e = s, o.c = u, o;
    };
  }(), g.sum = function() {
    for (var e = 1, r = arguments, t = new g(r[0]); e < r.length; )
      t = t.plus(r[e++]);
    return t;
  }, w = function() {
    var e = "0123456789";
    function r(t, l, n, s) {
      for (var c, i = [0], f, u = 0, o = t.length; u < o; ) {
        for (f = i.length; f--; i[f] *= l)
          ;
        for (i[0] += s.indexOf(t.charAt(u++)), c = 0; c < i.length; c++)
          i[c] > n - 1 && (i[c + 1] == null && (i[c + 1] = 0), i[c + 1] += i[c] / n | 0, i[c] %= n);
      }
      return i.reverse();
    }
    return function(t, l, n, s, c) {
      var i, f, u, o, a, d, N, L, x = t.indexOf("."), P = m, _ = I;
      for (x >= 0 && (o = Y, Y = 0, t = t.replace(".", ""), L = new g(l), d = L.pow(t.length - x), Y = o, L.c = r(
        k(y(d.c), d.e, "0"),
        10,
        n,
        e
      ), L.e = L.c.length), N = r(t, l, n, c ? (i = j, e) : (i = e, j)), u = o = N.length; N[--o] == 0; N.pop())
        ;
      if (!N[0])
        return i.charAt(0);
      if (x < 0 ? --u : (d.c = N, d.e = u, d.s = s, d = h(d, L, P, _, n), N = d.c, a = d.r, u = d.e), f = u + P + 1, x = N[f], o = n / 2, a = a || f < 0 || N[f + 1] != null, a = _ < 4 ? (x != null || a) && (_ == 0 || _ == (d.s < 0 ? 3 : 2)) : x > o || x == o && (_ == 4 || a || _ == 6 && N[f - 1] & 1 || _ == (d.s < 0 ? 8 : 7)), f < 1 || !N[0])
        t = a ? k(i.charAt(1), -P, i.charAt(0)) : i.charAt(0);
      else {
        if (N.length = f, a)
          for (--n; ++N[--f] > n; )
            N[f] = 0, f || (++u, N = [1].concat(N));
        for (o = N.length; !N[--o]; )
          ;
        for (x = 0, t = ""; x <= o; t += i.charAt(N[x++]))
          ;
        t = k(t, u, i.charAt(0));
      }
      return t;
    };
  }(), h = function() {
    function e(l, n, s) {
      var c, i, f, u, o = 0, a = l.length, d = n % J, N = n / J | 0;
      for (l = l.slice(); a--; )
        f = l[a] % J, u = l[a] / J | 0, c = N * f + u * d, i = d * f + c % J * J + o, o = (i / s | 0) + (c / J | 0) + N * u, l[a] = i % s;
      return o && (l = [o].concat(l)), l;
    }
    function r(l, n, s, c) {
      var i, f;
      if (s != c)
        f = s > c ? 1 : -1;
      else
        for (i = f = 0; i < s; i++)
          if (l[i] != n[i]) {
            f = l[i] > n[i] ? 1 : -1;
            break;
          }
      return f;
    }
    function t(l, n, s, c) {
      for (var i = 0; s--; )
        l[s] -= i, i = l[s] < n[s] ? 1 : 0, l[s] = i * c + l[s] - n[s];
      for (; !l[0] && l.length > 1; l.splice(0, 1))
        ;
    }
    return function(l, n, s, c, i) {
      var f, u, o, a, d, N, L, x, P, _, T, $, ie, ae, he, W, te, q = l.s == n.s ? 1 : -1, v = l.c, M = n.c;
      if (!v || !v[0] || !M || !M[0])
        return new g(
          // Return NaN if either NaN, or both Infinity or 0.
          !l.s || !n.s || (v ? M && v[0] == M[0] : !M) ? NaN : (
            // Return ±0 if x is ±0 or y is ±Infinity, or return ±Infinity as y is ±0.
            v && v[0] == 0 || !M ? q * 0 : q / 0
          )
        );
      for (x = new g(q), P = x.c = [], u = l.e - n.e, q = s + u + 1, i || (i = X, u = F(l.e / O) - F(n.e / O), q = q / O | 0), o = 0; M[o] == (v[o] || 0); o++)
        ;
      if (M[o] > (v[o] || 0) && u--, q < 0)
        P.push(1), a = !0;
      else {
        for (ae = v.length, W = M.length, o = 0, q += 2, d = H(i / (M[0] + 1)), d > 1 && (M = e(M, d, i), v = e(v, d, i), W = M.length, ae = v.length), ie = W, _ = v.slice(0, W), T = _.length; T < W; _[T++] = 0)
          ;
        te = M.slice(), te = [0].concat(te), he = M[0], M[1] >= i / 2 && he++;
        do {
          if (d = 0, f = r(M, _, W, T), f < 0) {
            if ($ = _[0], W != T && ($ = $ * i + (_[1] || 0)), d = H($ / he), d > 1)
              for (d >= i && (d = i - 1), N = e(M, d, i), L = N.length, T = _.length; r(N, _, L, T) == 1; )
                d--, t(N, W < L ? te : M, L, i), L = N.length, f = 1;
            else
              d == 0 && (f = d = 1), N = M.slice(), L = N.length;
            if (L < T && (N = [0].concat(N)), t(_, N, T, i), T = _.length, f == -1)
              for (; r(M, _, W, T) < 1; )
                d++, t(_, W < T ? te : M, T, i), T = _.length;
          } else
            f === 0 && (d++, _ = [0]);
          P[o++] = d, _[0] ? _[T++] = v[ie] || 0 : (_ = [v[ie]], T = 1);
        } while ((ie++ < ae || _[0] != null) && q--);
        a = _[0] != null, P[0] || P.splice(0, 1);
      }
      if (i == X) {
        for (o = 1, q = P[0]; q >= 10; q /= 10, o++)
          ;
        G(x, s + (x.e = o + u * O - 1) + 1, c, a);
      } else
        x.e = u, x.r = +a;
      return x;
    };
  }();
  function ue(e, r, t, l) {
    var n, s, c, i, f;
    if (t == null ? t = I : S(t, 0, 8), !e.c)
      return e.toString();
    if (n = e.c[0], c = e.e, r == null)
      f = y(e.c), f = l == 1 || l == 2 && (c <= B || c >= C) ? fe(f, c) : k(f, c, "0");
    else if (e = G(new g(e), r, t), s = e.e, f = y(e.c), i = f.length, l == 1 || l == 2 && (r <= s || s <= B)) {
      for (; i < r; f += "0", i++)
        ;
      f = fe(f, s);
    } else if (r -= c, f = k(f, s, "0"), s + 1 > i) {
      if (--r > 0)
        for (f += "."; r--; f += "0")
          ;
    } else if (r += s - i, r > 0)
      for (s + 1 == i && (f += "."); r--; f += "0")
        ;
    return e.s < 0 && n ? "-" + f : f;
  }
  function we(e, r) {
    for (var t, l = 1, n = new g(e[0]); l < e.length; l++)
      if (t = new g(e[l]), t.s)
        r.call(n, t) && (n = t);
      else {
        n = t;
        break;
      }
    return n;
  }
  function ce(e, r, t) {
    for (var l = 1, n = r.length; !r[--n]; r.pop())
      ;
    for (n = r[0]; n >= 10; n /= 10, l++)
      ;
    return (t = l + t * O - 1) > z ? e.c = e.e = null : t < Q ? e.c = [e.e = 0] : (e.e = t, e.c = r), e;
  }
  A = function() {
    var e = /^(-?)0([xbo])(?=\w[\w.]*$)/i, r = /^([^.]+)\.$/, t = /^\.([^.]+)$/, l = /^-?(Infinity|NaN)$/, n = /^\s*\+(?=[\w.])|^\s+|\s+$/g;
    return function(s, c, i, f) {
      var u, o = i ? c : c.replace(n, "");
      if (l.test(o))
        s.s = isNaN(o) ? null : o < 0 ? -1 : 1;
      else {
        if (!i && (o = o.replace(e, function(a, d, N) {
          return u = (N = N.toLowerCase()) == "x" ? 16 : N == "b" ? 2 : 8, !f || f == u ? d : a;
        }), f && (u = f, o = o.replace(r, "$1").replace(t, "0.$1")), c != o))
          return new g(o, u);
        if (g.DEBUG)
          throw Error(D + "Not a" + (f ? " base " + f : "") + " number: " + c);
        s.s = null;
      }
      s.c = s.e = null;
    };
  }();
  function G(e, r, t, l) {
    var n, s, c, i, f, u, o, a = e.c, d = pe;
    if (a) {
      e: {
        for (n = 1, i = a[0]; i >= 10; i /= 10, n++)
          ;
        if (s = r - n, s < 0)
          s += O, c = r, f = a[u = 0], o = f / d[n - c - 1] % 10 | 0;
        else if (u = ge((s + 1) / O), u >= a.length)
          if (l) {
            for (; a.length <= u; a.push(0))
              ;
            f = o = 0, n = 1, s %= O, c = s - O + 1;
          } else
            break e;
        else {
          for (f = i = a[u], n = 1; i >= 10; i /= 10, n++)
            ;
          s %= O, c = s - O + n, o = c < 0 ? 0 : f / d[n - c - 1] % 10 | 0;
        }
        if (l = l || r < 0 || // Are there any non-zero digits after the rounding digit?
        // The expression  n % pows10[d - j - 1]  returns all digits of n to the right
        // of the digit at j, e.g. if n is 908714 and j is 2, the expression gives 714.
        a[u + 1] != null || (c < 0 ? f : f % d[n - c - 1]), l = t < 4 ? (o || l) && (t == 0 || t == (e.s < 0 ? 3 : 2)) : o > 5 || o == 5 && (t == 4 || l || t == 6 && // Check whether the digit to the left of the rounding digit is odd.
        (s > 0 ? c > 0 ? f / d[n - c] : 0 : a[u - 1]) % 10 & 1 || t == (e.s < 0 ? 8 : 7)), r < 1 || !a[0])
          return a.length = 0, l ? (r -= e.e + 1, a[0] = d[(O - r % O) % O], e.e = -r || 0) : a[0] = e.e = 0, e;
        if (s == 0 ? (a.length = u, i = 1, u--) : (a.length = u + 1, i = d[O - s], a[u] = c > 0 ? H(f / d[n - c] % d[c]) * i : 0), l)
          for (; ; )
            if (u == 0) {
              for (s = 1, c = a[0]; c >= 10; c /= 10, s++)
                ;
              for (c = a[0] += i, i = 1; c >= 10; c /= 10, i++)
                ;
              s != i && (e.e++, a[0] == X && (a[0] = 1));
              break;
            } else {
              if (a[u] += i, a[u] != X)
                break;
              a[u--] = 0, i = 1;
            }
        for (s = a.length; a[--s] === 0; a.pop())
          ;
      }
      e.e > z ? e.c = e.e = null : e.e < Q && (e.c = [e.e = 0]);
    }
    return e;
  }
  function V(e) {
    var r, t = e.e;
    return t === null ? e.toString() : (r = y(e.c), r = t <= B || t >= C ? fe(r, t) : k(r, t, "0"), e.s < 0 ? "-" + r : r);
  }
  return E.absoluteValue = E.abs = function() {
    var e = new g(this);
    return e.s < 0 && (e.s = 1), e;
  }, E.comparedTo = function(e, r) {
    return b(this, new g(e, r));
  }, E.decimalPlaces = E.dp = function(e, r) {
    var t, l, n, s = this;
    if (e != null)
      return S(e, 0, U), r == null ? r = I : S(r, 0, 8), G(new g(s), e + s.e + 1, r);
    if (!(t = s.c))
      return null;
    if (l = ((n = t.length - 1) - F(this.e / O)) * O, n = t[n])
      for (; n % 10 == 0; n /= 10, l--)
        ;
    return l < 0 && (l = 0), l;
  }, E.dividedBy = E.div = function(e, r) {
    return h(this, new g(e, r), m, I);
  }, E.dividedToIntegerBy = E.idiv = function(e, r) {
    return h(this, new g(e, r), 0, 1);
  }, E.exponentiatedBy = E.pow = function(e, r) {
    var t, l, n, s, c, i, f, u, o, a = this;
    if (e = new g(e), e.c && !e.isInteger())
      throw Error(D + "Exponent not an integer: " + V(e));
    if (r != null && (r = new g(r)), i = e.e > 14, !a.c || !a.c[0] || a.c[0] == 1 && !a.e && a.c.length == 1 || !e.c || !e.c[0])
      return o = new g(Math.pow(+V(a), i ? e.s * (2 - ne(e)) : +V(e))), r ? o.mod(r) : o;
    if (f = e.s < 0, r) {
      if (r.c ? !r.c[0] : !r.s)
        return new g(NaN);
      l = !f && a.isInteger() && r.isInteger(), l && (a = a.mod(r));
    } else {
      if (e.e > 9 && (a.e > 0 || a.e < -1 || (a.e == 0 ? a.c[0] > 1 || i && a.c[1] >= 24e7 : a.c[0] < 8e13 || i && a.c[0] <= 9999975e7)))
        return s = a.s < 0 && ne(e) ? -0 : 0, a.e > -1 && (s = 1 / s), new g(f ? 1 / s : s);
      Y && (s = ge(Y / O + 2));
    }
    for (i ? (t = new g(0.5), f && (e.s = 1), u = ne(e)) : (n = Math.abs(+V(e)), u = n % 2), o = new g(R); ; ) {
      if (u) {
        if (o = o.times(a), !o.c)
          break;
        s ? o.c.length > s && (o.c.length = s) : l && (o = o.mod(r));
      }
      if (n) {
        if (n = H(n / 2), n === 0)
          break;
        u = n % 2;
      } else if (e = e.times(t), G(e, e.e + 1, 1), e.e > 14)
        u = ne(e);
      else {
        if (n = +V(e), n === 0)
          break;
        u = n % 2;
      }
      a = a.times(a), s ? a.c && a.c.length > s && (a.c.length = s) : l && (a = a.mod(r));
    }
    return l ? o : (f && (o = R.div(o)), r ? o.mod(r) : s ? G(o, Y, I, c) : o);
  }, E.integerValue = function(e) {
    var r = new g(this);
    return e == null ? e = I : S(e, 0, 8), G(r, r.e + 1, e);
  }, E.isEqualTo = E.eq = function(e, r) {
    return b(this, new g(e, r)) === 0;
  }, E.isFinite = function() {
    return !!this.c;
  }, E.isGreaterThan = E.gt = function(e, r) {
    return b(this, new g(e, r)) > 0;
  }, E.isGreaterThanOrEqualTo = E.gte = function(e, r) {
    return (r = b(this, new g(e, r))) === 1 || r === 0;
  }, E.isInteger = function() {
    return !!this.c && F(this.e / O) > this.c.length - 2;
  }, E.isLessThan = E.lt = function(e, r) {
    return b(this, new g(e, r)) < 0;
  }, E.isLessThanOrEqualTo = E.lte = function(e, r) {
    return (r = b(this, new g(e, r))) === -1 || r === 0;
  }, E.isNaN = function() {
    return !this.s;
  }, E.isNegative = function() {
    return this.s < 0;
  }, E.isPositive = function() {
    return this.s > 0;
  }, E.isZero = function() {
    return !!this.c && this.c[0] == 0;
  }, E.minus = function(e, r) {
    var t, l, n, s, c = this, i = c.s;
    if (e = new g(e, r), r = e.s, !i || !r)
      return new g(NaN);
    if (i != r)
      return e.s = -r, c.plus(e);
    var f = c.e / O, u = e.e / O, o = c.c, a = e.c;
    if (!f || !u) {
      if (!o || !a)
        return o ? (e.s = -r, e) : new g(a ? c : NaN);
      if (!o[0] || !a[0])
        return a[0] ? (e.s = -r, e) : new g(o[0] ? c : (
          // IEEE 754 (2008) 6.3: n - n = -0 when rounding to -Infinity
          I == 3 ? -0 : 0
        ));
    }
    if (f = F(f), u = F(u), o = o.slice(), i = f - u) {
      for ((s = i < 0) ? (i = -i, n = o) : (u = f, n = a), n.reverse(), r = i; r--; n.push(0))
        ;
      n.reverse();
    } else
      for (l = (s = (i = o.length) < (r = a.length)) ? i : r, i = r = 0; r < l; r++)
        if (o[r] != a[r]) {
          s = o[r] < a[r];
          break;
        }
    if (s && (n = o, o = a, a = n, e.s = -e.s), r = (l = a.length) - (t = o.length), r > 0)
      for (; r--; o[t++] = 0)
        ;
    for (r = X - 1; l > i; ) {
      if (o[--l] < a[l]) {
        for (t = l; t && !o[--t]; o[t] = r)
          ;
        --o[t], o[l] += X;
      }
      o[l] -= a[l];
    }
    for (; o[0] == 0; o.splice(0, 1), --u)
      ;
    return o[0] ? ce(e, o, u) : (e.s = I == 3 ? -1 : 1, e.c = [e.e = 0], e);
  }, E.modulo = E.mod = function(e, r) {
    var t, l, n = this;
    return e = new g(e, r), !n.c || !e.s || e.c && !e.c[0] ? new g(NaN) : !e.c || n.c && !n.c[0] ? new g(n) : (re == 9 ? (l = e.s, e.s = 1, t = h(n, e, 0, 3), e.s = l, t.s *= l) : t = h(n, e, 0, re), e = n.minus(t.times(e)), !e.c[0] && re == 1 && (e.s = n.s), e);
  }, E.multipliedBy = E.times = function(e, r) {
    var t, l, n, s, c, i, f, u, o, a, d, N, L, x, P, _ = this, T = _.c, $ = (e = new g(e, r)).c;
    if (!T || !$ || !T[0] || !$[0])
      return !_.s || !e.s || T && !T[0] && !$ || $ && !$[0] && !T ? e.c = e.e = e.s = null : (e.s *= _.s, !T || !$ ? e.c = e.e = null : (e.c = [0], e.e = 0)), e;
    for (l = F(_.e / O) + F(e.e / O), e.s *= _.s, f = T.length, a = $.length, f < a && (L = T, T = $, $ = L, n = f, f = a, a = n), n = f + a, L = []; n--; L.push(0))
      ;
    for (x = X, P = J, n = a; --n >= 0; ) {
      for (t = 0, d = $[n] % P, N = $[n] / P | 0, c = f, s = n + c; s > n; )
        u = T[--c] % P, o = T[c] / P | 0, i = N * u + o * d, u = d * u + i % P * P + L[s] + t, t = (u / x | 0) + (i / P | 0) + N * o, L[s--] = u % x;
      L[s] = t;
    }
    return t ? ++l : L.splice(0, 1), ce(e, L, l);
  }, E.negated = function() {
    var e = new g(this);
    return e.s = -e.s || null, e;
  }, E.plus = function(e, r) {
    var t, l = this, n = l.s;
    if (e = new g(e, r), r = e.s, !n || !r)
      return new g(NaN);
    if (n != r)
      return e.s = -r, l.minus(e);
    var s = l.e / O, c = e.e / O, i = l.c, f = e.c;
    if (!s || !c) {
      if (!i || !f)
        return new g(n / 0);
      if (!i[0] || !f[0])
        return f[0] ? e : new g(i[0] ? l : n * 0);
    }
    if (s = F(s), c = F(c), i = i.slice(), n = s - c) {
      for (n > 0 ? (c = s, t = f) : (n = -n, t = i), t.reverse(); n--; t.push(0))
        ;
      t.reverse();
    }
    for (n = i.length, r = f.length, n - r < 0 && (t = f, f = i, i = t, r = n), n = 0; r; )
      n = (i[--r] = i[r] + f[r] + n) / X | 0, i[r] = X === i[r] ? 0 : i[r] % X;
    return n && (i = [n].concat(i), ++c), ce(e, i, c);
  }, E.precision = E.sd = function(e, r) {
    var t, l, n, s = this;
    if (e != null && e !== !!e)
      return S(e, 1, U), r == null ? r = I : S(r, 0, 8), G(new g(s), e, r);
    if (!(t = s.c))
      return null;
    if (n = t.length - 1, l = n * O + 1, n = t[n]) {
      for (; n % 10 == 0; n /= 10, l--)
        ;
      for (n = t[0]; n >= 10; n /= 10, l++)
        ;
    }
    return e && s.e + 1 > l && (l = s.e + 1), l;
  }, E.shiftedBy = function(e) {
    return S(e, -Ee, Ee), this.times("1e" + e);
  }, E.squareRoot = E.sqrt = function() {
    var e, r, t, l, n, s = this, c = s.c, i = s.s, f = s.e, u = m + 4, o = new g("0.5");
    if (i !== 1 || !c || !c[0])
      return new g(!i || i < 0 && (!c || c[0]) ? NaN : c ? s : 1 / 0);
    if (i = Math.sqrt(+V(s)), i == 0 || i == 1 / 0 ? (r = y(c), (r.length + f) % 2 == 0 && (r += "0"), i = Math.sqrt(+r), f = F((f + 1) / 2) - (f < 0 || f % 2), i == 1 / 0 ? r = "5e" + f : (r = i.toExponential(), r = r.slice(0, r.indexOf("e") + 1) + f), t = new g(r)) : t = new g(i + ""), t.c[0]) {
      for (f = t.e, i = f + u, i < 3 && (i = 0); ; )
        if (n = t, t = o.times(n.plus(h(s, n, u, 1))), y(n.c).slice(0, i) === (r = y(t.c)).slice(0, i))
          if (t.e < f && --i, r = r.slice(i - 3, i + 1), r == "9999" || !l && r == "4999") {
            if (!l && (G(n, n.e + m + 2, 0), n.times(n).eq(s))) {
              t = n;
              break;
            }
            u += 4, i += 4, l = 1;
          } else {
            (!+r || !+r.slice(1) && r.charAt(0) == "5") && (G(t, t.e + m + 2, 1), e = !t.times(t).eq(s));
            break;
          }
    }
    return G(t, t.e + m + 1, I, e);
  }, E.toExponential = function(e, r) {
    return e != null && (S(e, 0, U), e++), ue(this, e, r, 1);
  }, E.toFixed = function(e, r) {
    return e != null && (S(e, 0, U), e = e + this.e + 1), ue(this, e, r);
  }, E.toFormat = function(e, r, t) {
    var l, n = this;
    if (t == null)
      e != null && r && typeof r == "object" ? (t = r, r = null) : e && typeof e == "object" ? (t = e, e = r = null) : t = oe;
    else if (typeof t != "object")
      throw Error(D + "Argument not an object: " + t);
    if (l = n.toFixed(e, r), n.c) {
      var s, c = l.split("."), i = +t.groupSize, f = +t.secondaryGroupSize, u = t.groupSeparator || "", o = c[0], a = c[1], d = n.s < 0, N = d ? o.slice(1) : o, L = N.length;
      if (f && (s = i, i = f, f = s, L -= s), i > 0 && L > 0) {
        for (s = L % i || i, o = N.substr(0, s); s < L; s += i)
          o += u + N.substr(s, i);
        f > 0 && (o += u + N.slice(s)), d && (o = "-" + o);
      }
      l = a ? o + (t.decimalSeparator || "") + ((f = +t.fractionGroupSize) ? a.replace(
        new RegExp("\\d{" + f + "}\\B", "g"),
        "$&" + (t.fractionGroupSeparator || "")
      ) : a) : o;
    }
    return (t.prefix || "") + l + (t.suffix || "");
  }, E.toFraction = function(e) {
    var r, t, l, n, s, c, i, f, u, o, a, d, N = this, L = N.c;
    if (e != null && (i = new g(e), !i.isInteger() && (i.c || i.s !== 1) || i.lt(R)))
      throw Error(D + "Argument " + (i.isInteger() ? "out of range: " : "not an integer: ") + V(i));
    if (!L)
      return new g(N);
    for (r = new g(R), u = t = new g(R), l = f = new g(R), d = y(L), s = r.e = d.length - N.e - 1, r.c[0] = pe[(c = s % O) < 0 ? O + c : c], e = !e || i.comparedTo(r) > 0 ? s > 0 ? r : u : i, c = z, z = 1 / 0, i = new g(d), f.c[0] = 0; o = h(i, r, 0, 1), n = t.plus(o.times(l)), n.comparedTo(e) != 1; )
      t = l, l = n, u = f.plus(o.times(n = u)), f = n, r = i.minus(o.times(n = r)), i = n;
    return n = h(e.minus(t), l, 0, 1), f = f.plus(n.times(u)), t = t.plus(n.times(l)), f.s = u.s = N.s, s = s * 2, a = h(u, l, s, I).minus(N).abs().comparedTo(
      h(f, t, s, I).minus(N).abs()
    ) < 1 ? [u, l] : [f, t], z = c, a;
  }, E.toNumber = function() {
    return +V(this);
  }, E.toPrecision = function(e, r) {
    return e != null && S(e, 1, U), ue(this, e, r, 2);
  }, E.toString = function(e) {
    var r, t = this, l = t.s, n = t.e;
    return n === null ? l ? (r = "Infinity", l < 0 && (r = "-" + r)) : r = "NaN" : (e == null ? r = n <= B || n >= C ? fe(y(t.c), n) : k(y(t.c), n, "0") : e === 10 && le ? (t = G(new g(t), m + n + 1, I), r = k(y(t.c), t.e, "0")) : (S(e, 2, j.length, "Base"), r = w(k(y(t.c), n, "0"), 10, e, l, !0)), l < 0 && t.c[0] && (r = "-" + r)), r;
  }, E.valueOf = E.toJSON = function() {
    return V(this);
  }, E._isBigNumber = !0, E[Symbol.toStringTag] = "BigNumber", E[Symbol.for("nodejs.util.inspect.custom")] = E.valueOf, p != null && g.set(p), g;
}
function F(p) {
  var h = p | 0;
  return p > 0 || p === h ? h : h - 1;
}
function y(p) {
  for (var h, w, A = 1, E = p.length, R = p[0] + ""; A < E; ) {
    for (h = p[A++] + "", w = O - h.length; w--; h = "0" + h)
      ;
    R += h;
  }
  for (E = R.length; R.charCodeAt(--E) === 48; )
    ;
  return R.slice(0, E + 1 || 1);
}
function b(p, h) {
  var w, A, E = p.c, R = h.c, m = p.s, I = h.s, B = p.e, C = h.e;
  if (!m || !I)
    return null;
  if (w = E && !E[0], A = R && !R[0], w || A)
    return w ? A ? 0 : -I : m;
  if (m != I)
    return m;
  if (w = m < 0, A = B == C, !E || !R)
    return A ? 0 : !E ^ w ? 1 : -1;
  if (!A)
    return B > C ^ w ? 1 : -1;
  for (I = (B = E.length) < (C = R.length) ? B : C, m = 0; m < I; m++)
    if (E[m] != R[m])
      return E[m] > R[m] ^ w ? 1 : -1;
  return B == C ? 0 : B > C ^ w ? 1 : -1;
}
function S(p, h, w, A) {
  if (p < h || p > w || p !== H(p))
    throw Error(D + (A || "Argument") + (typeof p == "number" ? p < h || p > w ? " out of range: " : " not an integer: " : " not a primitive number: ") + String(p));
}
function ne(p) {
  var h = p.c.length - 1;
  return F(p.e / O) == h && p.c[h] % 2 != 0;
}
function fe(p, h) {
  return (p.length > 1 ? p.charAt(0) + "." + p.slice(1) : p) + (h < 0 ? "e" : "e+") + h;
}
function k(p, h, w) {
  var A, E;
  if (h < 0) {
    for (E = w + "."; ++h; E += w)
      ;
    p = E + p;
  } else if (A = p.length, ++h > A) {
    for (E = w, h -= A; --h; E += w)
      ;
    p += E;
  } else
    h < A && (p = p.slice(0, h) + "." + p.slice(h));
  return p;
}
var se = Ne();
const Ae = /^[1][3,4,5,6,7,8,9][0-9]{9}$/, Re = (p, h, w) => {
  Ae.test(h) || h.length == 0 ? w() : w(new Error("请输入正确的手机号"));
}, _e = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/, me = (p, h, w) => {
  _e.test(h) ? w() : w(new Error("请输入正确的邮箱"));
}, Le = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$|^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/, Te = (p, h, w) => {
  Le.test(h.toString()) ? w() : w(new Error("请输入正确的身份证号"));
}, Se = (p, h, w) => {
  h && isNaN(Number(h)) ? w(new Error("该项需填入数字")) : w();
}, Ie = ({ min: p = 0, max: h = 100, message: w = "" }) => {
  function A(E, R, m) {
    (!R && R !== 0 || typeof R > "u") && m(), R && isNaN(Number(R)) ? m(new Error("该项需填写数字")) : new se(R).isGreaterThanOrEqualTo(p) && new se(R).isLessThanOrEqualTo(h) ? m() : m(new Error(w || `该项需填写${p}~${h}的数字`));
  }
  return [{ validator: A, trigger: "change,blur" }];
}, Z = {
  MIN: 6,
  MAX: 16
}, xe = (p, h, w) => {
  const A = new RegExp(`^[\\d\\w]{${Z.MIN},${Z.MAX}}$`);
  h && A.test(h.toString()) ? w() : w(new Error(`密码长度${Z.MIN}-${Z.MAX}位`));
}, Me = /^(?![\d]+$)(?![a-zA-Z]+$)(?![!@#$%^&*()]+$)[\da-zA-Z!@#$%^&*()]{6,16}$/, ze = (p, h, w) => {
  h && Me.test(h) ? w() : w(
    new Error(
      `密码长度${Z.MIN}-${Z.MAX}位，由字母、数字、符号，至少两种组合而成`
    )
  );
}, Pe = (p, h, w) => {
  const A = new RegExp(
    `^(?![A-z]+$)(?![A-Z0-9]+$)(?![A-Z\\W_]+$)(?![a-z0-9]+$)(?![a-z\\W_]+$)(?![0-9\\W_]+$)[a-zA-Z0-9\\W_]{${Z.MIN},${Z.MAX}}$`
  );
  h && A.test(h.toString()) ? w() : w(
    new Error(
      `密码长度${Z.MIN}-${Z.MAX}位，且需包含数字、大写字母、小写字母以及特殊字符中的三种`
    )
  );
}, Ue = (p, h, w) => {
  const A = h.split(",");
  let E = !0;
  A.forEach((R) => {
    /^\d+$/.test(R) && 1 <= Number(R) && Number(R) <= 65535 || (E = !1);
  }), E ? w() : w(new Error("端口格式不对"));
}, $e = /^[A-Z]{1}$/, ve = (p, h, w) => {
  $e.test(h) ? w() : w(new Error("首字母必须为大写且长度为1位!"));
}, Be = /^((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})(\.((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})){3}$/, De = (p, h, w) => {
  Be.test(h) ? w() : w(new Error("IP格式不正确!"));
}, Ce = (p) => {
  let h = p;
  isNaN(h) && (h = 2);
  const w = new RegExp(
    `^(([1-9][0-9]*)|(([0]\\.\\d{1,${h}}|[1-9][0-9]*\\.\\d{1,${h}})))$`
  );
  function A(E, R, m) {
    !R || w.test(R.toString()) ? m() : m(new Error(`最多精确到${h}位小数`));
  }
  return [{ validator: A, trigger: "change,blur" }];
}, Ge = /^[a-zA-Z0-9]+$/g, qe = (p, h, w) => {
  !h || Ge.test(h) ? w() : w(new Error("只能填写英文和数字"));
}, ye = (p, h, w) => {
  new se(h).isGreaterThanOrEqualTo(0) && new se(h).isLessThanOrEqualTo(1) ? w() : w(new Error("只能填写0~1的数值"));
}, Fe = (p, h, w) => {
  h && !isNaN(Number(h)) && h.toString().length == 6 ? w() : w(new Error("口令码为 6 位数字"));
}, ee = ["blur", "change"], Xe = {
  // 通用验证条件
  COMMON_RULE: (p) => [
    {
      message: "该项为必填项",
      type: "string",
      required: !0,
      trigger: ee,
      ...p
    }
  ],
  // 深度验证
  DEEP_RULE: (p) => ({ type: "object", fields: {}, required: !0, ...p }),
  // Blur 验证
  BLUR_RULE: (p) => [
    {
      message: "该项为必填项",
      type: "string",
      required: !0,
      trigger: "blur",
      ...p
    }
  ],
  // 长度限制
  LENGTH_RULE: (p, h = 20, w) => [
    {
      min: p,
      max: h,
      message: w || `输入长度限制在${p == h ? p : [p, h].join("至")}个字符`,
      trigger: "blur"
    }
  ],
  LETTER_NUM_RULE: [{ validator: qe, trigger: "blur" }],
  LESS_THAN_ONE: [{ validator: ye, trigger: "blur" }],
  // 小数验证
  FLOAT_NUMBER_RULE: Ce,
  // 数字范围限制
  INT_RANGE: Ie,
  // 数组验证
  ARRAY_RULE: [
    {
      type: "array",
      message: "该项是多项选择",
      trigger: ee
    }
  ],
  // 数字验证
  NUMBER_RULE: [{ validator: Se, trigger: ee }],
  // 端口验证
  PORT_RULE: [{ validator: Ue, trigger: "blur" }],
  // 邮箱
  EMAIL_RULE: [{ validator: me, trigger: "blur" }],
  // IP
  IP_RULE: [{ validator: De, trigger: "blur" }],
  // 密码验证
  PASSWORD_RULE: [
    {
      validator: xe,
      trigger: "blur"
    }
  ],
  STRICT_PASSWORD_RULE: [
    {
      validator: Pe,
      trigger: "blur"
    }
  ],
  // 只有一个大写字母
  ONE_CAPITAL_RULE: [{ validator: ve, trigger: ee }],
  // 内容格式校验
  PHONE_RULE: [{ validator: Re, trigger: ee }],
  IDCARD_RULE: [{ validator: Te, trigger: ee }],
  TOTP_RULE: [{ validator: Fe, trigger: "blur" }]
};
export {
  Me as ComplicatedPasswordRegExp,
  _e as EmailRegExp,
  $e as FirstLetterUppercaseRegExp,
  Be as IPRegExp,
  Le as IdentifyRegExp,
  Ge as LetterNumberRegExp,
  Z as PASSWORD_LEN_RANGE,
  Ae as PhoneRegExp,
  Xe as default,
  Ce as floatPosition,
  Ie as intRange,
  ye as lessThanOne,
  qe as letterNumber,
  ze as password,
  Pe as strictValidatePassword,
  Fe as totpCode,
  me as validateEmail,
  De as validateIP,
  Te as validateIdentityCard,
  ve as validateJhiInitial,
  Se as validateNumber,
  xe as validatePassword,
  Re as validatePhone,
  Ue as validatePort
};
