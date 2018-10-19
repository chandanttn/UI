
/*! asmCrypto, (c) 2013 Artem S Vybornov, opensource.org/licenses/MIT */
!function (a, b) {
    function c() {
        var a = Error.apply(this, arguments);
        this.message = a.message, this.stack = a.stack
    }

    function d() {
        var a = Error.apply(this, arguments);
        this.message = a.message, this.stack = a.stack
    }

    function e() {
        var a = Error.apply(this, arguments);
        this.message = a.message, this.stack = a.stack
    }

    function f(a, b) {
        b = !!b;
        for (var c = a.length, d = new Uint8Array(b ? 4 * c : c), e = 0, f = 0; c > e; e++) {
            var g = a.charCodeAt(e);
            if (b && g >= 55296 && 56319 >= g) {
                if (++e >= c)throw new Error("Malformed string, low surrogate expected at position " + e);
                g = (55296 ^ g) << 10 | 65536 | 56320 ^ a.charCodeAt(e)
            } else if (!b && g >>> 8)throw new Error("Wide characters are not allowed.");
            !b || 127 >= g ? d[f++] = g : 2047 >= g ? (d[f++] = 192 | g >> 6, d[f++] = 128 | 63 & g) : 65535 >= g ? (d[f++] = 224 | g >> 12, d[f++] = 128 | g >> 6 & 63, d[f++] = 128 | 63 & g) : (d[f++] = 240 | g >> 18, d[f++] = 128 | g >> 12 & 63, d[f++] = 128 | g >> 6 & 63, d[f++] = 128 | 63 & g)
        }
        return d.subarray(0, f)
    }

    function g(a) {
        var b = a.length;
        1 & b && (a = "0" + a, b++);
        for (var c = new Uint8Array(b >> 1), d = 0; b > d; d += 2)c[d >> 1] = parseInt(a.substr(d, 2), 16);
        return c
    }

    function h(a) {
        return f(atob(a))
    }

    function i(a, b) {
        b = !!b;
        for (var c = a.length, d = new Array(c), e = 0, f = 0; c > e; e++) {
            var g = a[e];
            if (!b || 128 > g)d[f++] = g; else if (g >= 192 && 224 > g && c > e + 1)d[f++] = (31 & g) << 6 | 63 & a[++e]; else if (g >= 224 && 240 > g && c > e + 2)d[f++] = (15 & g) << 12 | (63 & a[++e]) << 6 | 63 & a[++e]; else {
                if (!(g >= 240 && 248 > g && c > e + 3))throw new Error("Malformed UTF8 character at byte offset " + e);
                var h = (7 & g) << 18 | (63 & a[++e]) << 12 | (63 & a[++e]) << 6 | 63 & a[++e];
                65535 >= h ? d[f++] = h : (h ^= 65536, d[f++] = 55296 | h >> 10, d[f++] = 56320 | 1023 & h)
            }
        }
        for (var i = "", j = 16384, e = 0; f > e; e += j)i += String.fromCharCode.apply(String, d.slice(e, f >= e + j ? e + j : f));
        return i
    }

    function j(a) {
        for (var b = "", c = 0; c < a.length; c++) {
            var d = (255 & a[c]).toString(16);
            d.length < 2 && (b += "0"), b += d
        }
        return b
    }

    function k(a) {
        return btoa(i(a))
    }

    function l(a) {
        return a -= 1, a |= a >>> 1, a |= a >>> 2, a |= a >>> 4, a |= a >>> 8, a |= a >>> 16, a += 1
    }

    function m(a) {
        return "number" == typeof a
    }

    function n(a) {
        return "string" == typeof a
    }

    function o(a) {
        return a instanceof ArrayBuffer
    }

    function p(a) {
        return a instanceof Uint8Array
    }

    function q(a) {
        return a instanceof Int8Array || a instanceof Uint8Array || a instanceof Int16Array || a instanceof Uint16Array || a instanceof Int32Array || a instanceof Uint32Array || a instanceof Float32Array || a instanceof Float64Array
    }

    function r(a, b) {
        var c = b.heap, d = c ? c.byteLength : b.heapSize || 65536;
        if (4095 & d || 0 >= d)throw new Error("heap size must be a positive integer and a multiple of 4096");
        return c = c || new a(new ArrayBuffer(d))
    }

    function s(a, b, c, d, e) {
        var f = a.length - b, g = e > f ? f : e;
        return a.set(c.subarray(d, d + g), b), g
    }

    function t(a) {
        a = a || {}, this.heap = r(Uint8Array, a).subarray(Xb.HEAP_DATA), this.asm = a.asm || Xb(b, null, this.heap.buffer), this.mode = null, this.key = null, this.reset(a)
    }

    function u(a) {
        if (void 0 !== a) {
            if (o(a) || p(a))a = new Uint8Array(a); else {
                if (!n(a))throw new TypeError("unexpected key type");
                a = f(a)
            }
            var b = a.length;
            if (16 !== b && 24 !== b && 32 !== b)throw new d("illegal key size");
            var c = new DataView(a.buffer, a.byteOffset, a.byteLength);
            this.asm.set_key(b >> 2, c.getUint32(0), c.getUint32(4), c.getUint32(8), c.getUint32(12), b > 16 ? c.getUint32(16) : 0, b > 16 ? c.getUint32(20) : 0, b > 24 ? c.getUint32(24) : 0, b > 24 ? c.getUint32(28) : 0), this.key = a
        } else if (!this.key)throw new Error("key is required")
    }

    function v(a) {
        if (void 0 !== a) {
            if (o(a) || p(a))a = new Uint8Array(a); else {
                if (!n(a))throw new TypeError("unexpected iv type");
                a = f(a)
            }
            if (16 !== a.length)throw new d("illegal iv size");
            var b = new DataView(a.buffer, a.byteOffset, a.byteLength);
            this.iv = a, this.asm.set_iv(b.getUint32(0), b.getUint32(4), b.getUint32(8), b.getUint32(12))
        } else this.iv = null, this.asm.set_iv(0, 0, 0, 0)
    }

    function w(a) {
        void 0 !== a ? this.padding = !!a : this.padding = !0
    }

    function x(a) {
        return a = a || {}, this.result = null, this.pos = 0, this.len = 0, u.call(this, a.key), this.hasOwnProperty("iv") && v.call(this, a.iv), this.hasOwnProperty("padding") && w.call(this, a.padding), this
    }

    function y(a) {
        if (n(a) && (a = f(a)), o(a) && (a = new Uint8Array(a)), !p(a))throw new TypeError("data isn't of expected type");
        for (var b = this.asm, c = this.heap, d = Xb.ENC[this.mode], e = Xb.HEAP_DATA, g = this.pos, h = this.len, i = 0, j = a.length || 0, k = 0, l = h + j & -16, m = 0, q = new Uint8Array(l); j > 0;)m = s(c, g + h, a, i, j), h += m, i += m, j -= m, m = b.cipher(d, e + g, h), m && q.set(c.subarray(g, g + m), k), k += m, h > m ? (g += m, h -= m) : (g = 0, h = 0);
        return this.result = q, this.pos = g, this.len = h, this
    }

    function z(a) {
        var b = null, c = 0;
        void 0 !== a && (b = y.call(this, a).result, c = b.length);
        var e = this.asm, f = this.heap, g = Xb.ENC[this.mode], h = Xb.HEAP_DATA, i = this.pos, j = this.len, k = 16 - j % 16, l = j;
        if (this.hasOwnProperty("padding")) {
            if (this.padding) {
                for (var m = 0; k > m; ++m)f[i + j + m] = k;
                j += k, l = j
            } else if (j % 16)throw new d("data length must be a multiple of the block size")
        } else j += k;
        var n = new Uint8Array(c + l);
        return c && n.set(b), j && e.cipher(g, h + i, j), l && n.set(f.subarray(i, i + l), c), this.result = n, this.pos = 0, this.len = 0, this
    }

    function A(a) {
        if (n(a) && (a = f(a)), o(a) && (a = new Uint8Array(a)), !p(a))throw new TypeError("data isn't of expected type");
        var b = this.asm, c = this.heap, d = Xb.DEC[this.mode], e = Xb.HEAP_DATA, g = this.pos, h = this.len, i = 0, j = a.length || 0, k = 0, l = h + j & -16, m = 0, q = 0;
        this.hasOwnProperty("padding") && this.padding && (m = h + j - l || 16, l -= m);
        for (var r = new Uint8Array(l); j > 0;)q = s(c, g + h, a, i, j), h += q, i += q, j -= q, q = b.cipher(d, e + g, h - (j ? 0 : m)), q && r.set(c.subarray(g, g + q), k), k += q, h > q ? (g += q, h -= q) : (g = 0, h = 0);
        return this.result = r, this.pos = g, this.len = h, this
    }

    function B(a) {
        var b = null, c = 0;
        void 0 !== a && (b = A.call(this, a).result, c = b.length);
        var f = this.asm, g = this.heap, h = Xb.DEC[this.mode], i = Xb.HEAP_DATA, j = this.pos, k = this.len, l = k;
        if (k > 0) {
            if (k % 16) {
                if (this.hasOwnProperty("padding"))throw new d("data length must be a multiple of the block size");
                k += 16 - k % 16
            }
            if (f.cipher(h, i + j, k), this.hasOwnProperty("padding") && this.padding) {
                var m = g[j + l - 1];
                if (1 > m || m > 16 || m > l)throw new e("bad padding");
                for (var n = 0, o = m; o > 1; o--)n |= m ^ g[j + l - o];
                if (n)throw new e("bad padding");
                l -= m
            }
        }
        var p = new Uint8Array(c + l);
        return c > 0 && p.set(b), l > 0 && p.set(g.subarray(j, j + l), c), this.result = p, this.pos = 0, this.len = 0, this
    }

    function C(a) {
        this.padding = !0, this.iv = null, t.call(this, a), this.mode = "CBC"
    }

    function D(a) {
        C.call(this, a)
    }

    function E(a) {
        C.call(this, a)
    }

    function F(a) {
        this.nonce = null, this.counter = 0, this.counterSize = 0, t.call(this, a), this.mode = "CTR"
    }

    function G(a) {
        F.call(this, a)
    }

    function H(a, b, c) {
        if (void 0 !== c) {
            if (8 > c || c > 48)throw new d("illegal counter size");
            this.counterSize = c;
            var e = Math.pow(2, c) - 1;
            this.asm.set_mask(0, 0, e / 4294967296 | 0, 0 | e)
        } else this.counterSize = c = 48, this.asm.set_mask(0, 0, 65535, 4294967295);
        if (void 0 === a)throw new Error("nonce is required");
        if (o(a) || p(a))a = new Uint8Array(a); else {
            if (!n(a))throw new TypeError("unexpected nonce type");
            a = f(a)
        }
        var g = a.length;
        if (!g || g > 16)throw new d("illegal nonce size");
        this.nonce = a;
        var h = new DataView(new ArrayBuffer(16));
        if (new Uint8Array(h.buffer).set(a), this.asm.set_nonce(h.getUint32(0), h.getUint32(4), h.getUint32(8), h.getUint32(12)), void 0 !== b) {
            if (!m(b))throw new TypeError("unexpected counter type");
            if (0 > b || b >= Math.pow(2, c))throw new d("illegal counter value");
            this.counter = b, this.asm.set_counter(0, 0, b / 4294967296 | 0, 0 | b)
        } else this.counter = b = 0
    }

    function I(a) {
        return a = a || {}, x.call(this, a), H.call(this, a.nonce, a.counter, a.counterSize), this
    }

    function J(a) {
        for (var b = this.heap, c = this.asm, d = 0, e = a.length || 0, f = 0; e > 0;) {
            for (f = s(b, 0, a, d, e), d += f, e -= f; 15 & f;)b[f++] = 0;
            c.mac(Xb.MAC.GCM, Xb.HEAP_DATA, f)
        }
    }

    function K(a) {
        this.nonce = null, this.adata = null, this.iv = null, this.counter = 1, this.tagSize = 16, t.call(this, a), this.mode = "GCM"
    }

    function L(a) {
        K.call(this, a)
    }

    function M(a) {
        K.call(this, a)
    }

    function N(a) {
        a = a || {}, x.call(this, a);
        var b = this.asm, c = this.heap;
        b.gcm_init();
        var e = a.tagSize;
        if (void 0 !== e) {
            if (!m(e))throw new TypeError("tagSize must be a number");
            if (4 > e || e > 16)throw new d("illegal tagSize value");
            this.tagSize = e
        } else this.tagSize = 16;
        var g = a.nonce;
        if (void 0 === g)throw new Error("nonce is required");
        if (p(g) || o(g))g = new Uint8Array(g); else {
            if (!n(g))throw new TypeError("unexpected nonce type");
            g = f(g)
        }
        this.nonce = g;
        var h = g.length || 0, i = new Uint8Array(16);
        12 !== h ? (J.call(this, g), c[0] = c[1] = c[2] = c[3] = c[4] = c[5] = c[6] = c[7] = c[8] = c[9] = c[10] = 0, c[11] = h >>> 29, c[12] = h >>> 21 & 255, c[13] = h >>> 13 & 255, c[14] = h >>> 5 & 255, c[15] = h << 3 & 255, b.mac(Xb.MAC.GCM, Xb.HEAP_DATA, 16), b.get_iv(Xb.HEAP_DATA), b.set_iv(), i.set(c.subarray(0, 16))) : (i.set(g), i[15] = 1);
        var j = new DataView(i.buffer);
        this.gamma0 = j.getUint32(12), b.set_nonce(j.getUint32(0), j.getUint32(4), j.getUint32(8), 0), b.set_mask(0, 0, 0, 4294967295);
        var k = a.adata;
        if (void 0 !== k && null !== k) {
            if (p(k) || o(k))k = new Uint8Array(k); else {
                if (!n(k))throw new TypeError("unexpected adata type");
                k = f(k)
            }
            if (k.length > bc)throw new d("illegal adata length");
            k.length ? (this.adata = k, J.call(this, k)) : this.adata = null
        } else this.adata = null;
        var l = a.counter;
        if (void 0 !== l) {
            if (!m(l))throw new TypeError("counter must be a number");
            if (1 > l || l > 4294967295)throw new RangeError("counter must be a positive 32-bit integer");
            this.counter = l, b.set_counter(0, 0, 0, this.gamma0 + l | 0)
        } else this.counter = 1, b.set_counter(0, 0, 0, this.gamma0 + 1 | 0);
        var q = a.iv;
        if (void 0 !== q) {
            if (!m(l))throw new TypeError("counter must be a number");
            this.iv = q, v.call(this, q)
        }
        return this
    }

    function O(a) {
        if (n(a) && (a = f(a)), o(a) && (a = new Uint8Array(a)), !p(a))throw new TypeError("data isn't of expected type");
        var b = 0, c = a.length || 0, d = this.asm, e = this.heap, g = this.counter, h = this.pos, i = this.len, j = 0, k = i + c & -16, l = 0;
        if ((g - 1 << 4) + i + c > bc)throw new RangeError("counter overflow");
        for (var m = new Uint8Array(k); c > 0;)l = s(e, h + i, a, b, c), i += l, b += l, c -= l, l = d.cipher(Xb.ENC.CTR, Xb.HEAP_DATA + h, i), l = d.mac(Xb.MAC.GCM, Xb.HEAP_DATA + h, l), l && m.set(e.subarray(h, h + l), j), g += l >>> 4, j += l, i > l ? (h += l, i -= l) : (h = 0, i = 0);
        return this.result = m, this.counter = g, this.pos = h, this.len = i, this
    }

    function P() {
        var a = this.asm, b = this.heap, c = this.counter, d = this.tagSize, e = this.adata, f = this.pos, g = this.len, h = new Uint8Array(g + d);
        a.cipher(Xb.ENC.CTR, Xb.HEAP_DATA + f, g + 15 & -16), g && h.set(b.subarray(f, f + g));
        for (var i = g; 15 & i; i++)b[f + i] = 0;
        a.mac(Xb.MAC.GCM, Xb.HEAP_DATA + f, i);
        var j = null !== e ? e.length : 0, k = (c - 1 << 4) + g;
        return b[0] = b[1] = b[2] = 0, b[3] = j >>> 29, b[4] = j >>> 21, b[5] = j >>> 13 & 255, b[6] = j >>> 5 & 255, b[7] = j << 3 & 255, b[8] = b[9] = b[10] = 0, b[11] = k >>> 29, b[12] = k >>> 21 & 255, b[13] = k >>> 13 & 255, b[14] = k >>> 5 & 255, b[15] = k << 3 & 255, a.mac(Xb.MAC.GCM, Xb.HEAP_DATA, 16), a.get_iv(Xb.HEAP_DATA), a.set_counter(0, 0, 0, this.gamma0), a.cipher(Xb.ENC.CTR, Xb.HEAP_DATA, 16), h.set(b.subarray(0, d), g), this.result = h, this.counter = 1, this.pos = 0, this.len = 0, this
    }

    function Q(a) {
        var b = O.call(this, a).result, c = P.call(this).result, d = new Uint8Array(b.length + c.length);
        return b.length && d.set(b), c.length && d.set(c, b.length), this.result = d, this
    }

    function R(a) {
        if (n(a) && (a = f(a)), o(a) && (a = new Uint8Array(a)), !p(a))throw new TypeError("data isn't of expected type");
        var b = 0, c = a.length || 0, d = this.asm, e = this.heap, g = this.counter, h = this.tagSize, i = this.pos, j = this.len, k = 0, l = j + c > h ? j + c - h & -16 : 0, m = j + c - l, q = 0;
        if ((g - 1 << 4) + j + c > bc)throw new RangeError("counter overflow");
        for (var r = new Uint8Array(l); c > m;)q = s(e, i + j, a, b, c - m), j += q, b += q, c -= q, q = d.mac(Xb.MAC.GCM, Xb.HEAP_DATA + i, q), q = d.cipher(Xb.DEC.CTR, Xb.HEAP_DATA + i, q), q && r.set(e.subarray(i, i + q), k), g += q >>> 4, k += q, i = 0, j = 0;
        return c > 0 && (j += s(e, 0, a, b, c)), this.result = r, this.counter = g, this.pos = i, this.len = j, this
    }

    function S() {
        var a = this.asm, b = this.heap, d = this.tagSize, f = this.adata, g = this.counter, h = this.pos, i = this.len, j = i - d, k = 0;
        if (d > i)throw new c("authentication tag not found");
        for (var l = new Uint8Array(j), m = new Uint8Array(b.subarray(h + j, h + i)), n = j; 15 & n; n++)b[h + n] = 0;
        k = a.mac(Xb.MAC.GCM, Xb.HEAP_DATA + h, n), k = a.cipher(Xb.DEC.CTR, Xb.HEAP_DATA + h, n), j && l.set(b.subarray(h, h + j));
        var o = null !== f ? f.length : 0, p = (g - 1 << 4) + i - d;
        b[0] = b[1] = b[2] = 0, b[3] = o >>> 29, b[4] = o >>> 21, b[5] = o >>> 13 & 255, b[6] = o >>> 5 & 255, b[7] = o << 3 & 255, b[8] = b[9] = b[10] = 0, b[11] = p >>> 29, b[12] = p >>> 21 & 255, b[13] = p >>> 13 & 255, b[14] = p >>> 5 & 255, b[15] = p << 3 & 255, a.mac(Xb.MAC.GCM, Xb.HEAP_DATA, 16), a.get_iv(Xb.HEAP_DATA), a.set_counter(0, 0, 0, this.gamma0), a.cipher(Xb.ENC.CTR, Xb.HEAP_DATA, 16);
        for (var q = 0, n = 0; d > n; ++n)q |= m[n] ^ b[n];
        if (q)throw new e("data integrity check failed");
        return this.result = l, this.counter = 1, this.pos = 0, this.len = 0, this
    }

    function T(a) {
        var b = R.call(this, a).result, c = S.call(this).result, d = new Uint8Array(b.length + c.length);
        return b.length && d.set(b), c.length && d.set(c, b.length), this.result = d, this
    }

    function U(a, b, c, d) {
        if (void 0 === a)throw new SyntaxError("data required");
        if (void 0 === b)throw new SyntaxError("key required");
        return new C({heap: fc, asm: gc, key: b, padding: c, iv: d}).encrypt(a).result
    }

    function V(a, b, c, d) {
        if (void 0 === a)throw new SyntaxError("data required");
        if (void 0 === b)throw new SyntaxError("key required");
        return new C({heap: fc, asm: gc, key: b, padding: c, iv: d}).decrypt(a).result
    }

    function W(a, b, c, d, e) {
        if (void 0 === a)throw new SyntaxError("data required");
        if (void 0 === b)throw new SyntaxError("key required");
        if (void 0 === c)throw new SyntaxError("nonce required");
        return new K({heap: fc, asm: gc, key: b, nonce: c, adata: d, tagSize: e}).encrypt(a).result
    }

    function X(a, b, c, d, e) {
        if (void 0 === a)throw new SyntaxError("data required");
        if (void 0 === b)throw new SyntaxError("key required");
        if (void 0 === c)throw new SyntaxError("nonce required");
        return new K({heap: fc, asm: gc, key: b, nonce: c, adata: d, tagSize: e}).decrypt(a).result
    }

    function Y() {
        return this.result = null, this.pos = 0, this.len = 0, this.asm.reset(), this
    }

    function Z(a) {
        if (null !== this.result)throw new c("state must be reset before processing new data");
        if (n(a) && (a = f(a)), o(a) && (a = new Uint8Array(a)), !p(a))throw new TypeError("data isn't of expected type");
        for (var b = this.asm, d = this.heap, e = this.pos, g = this.len, h = 0, i = a.length, j = 0; i > 0;)j = s(d, e + g, a, h, i), g += j, h += j, i -= j, j = b.process(e, g), e += j, g -= j, g || (e = 0);
        return this.pos = e, this.len = g, this
    }

    function $() {
        if (null !== this.result)throw new c("state must be reset before processing new data");
        return this.asm.finish(this.pos, this.len, 0), this.result = new Uint8Array(this.HASH_SIZE), this.result.set(this.heap.subarray(0, this.HASH_SIZE)), this.pos = 0, this.len = 0, this
    }

    function _(a, b, c) {
        "use asm";
        var d = 0, e = 0, f = 0, g = 0, h = 0, i = 0, j = 0;
        var k = 0, l = 0, m = 0, n = 0, o = 0, p = 0, q = 0, r = 0, s = 0, t = 0;
        var u = new a.Uint8Array(c);

        function v(H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W) {
            H = H | 0;
            I = I | 0;
            J = J | 0;
            K = K | 0;
            L = L | 0;
            M = M | 0;
            N = N | 0;
            O = O | 0;
            P = P | 0;
            Q = Q | 0;
            R = R | 0;
            S = S | 0;
            T = T | 0;
            U = U | 0;
            V = V | 0;
            W = W | 0;
            var X = 0, Y = 0, Z = 0, $ = 0, _ = 0, aa = 0, ba = 0, ca = 0, da = 0, ea = 0, fa = 0, ga = 0, ha = 0, ia = 0, ja = 0, ka = 0, la = 0, ma = 0, na = 0, oa = 0, pa = 0, qa = 0, ra = 0, sa = 0, ta = 0, ua = 0, va = 0, wa = 0, xa = 0, ya = 0, za = 0, Aa = 0, Ba = 0, Ca = 0, Da = 0, Ea = 0, Fa = 0, Ga = 0, Ha = 0, Ia = 0, Ja = 0, Ka = 0, La = 0, Ma = 0, Na = 0, Oa = 0, Pa = 0, Qa = 0, Ra = 0, Sa = 0, Ta = 0, Ua = 0, Va = 0, Wa = 0, Xa = 0, Ya = 0, Za = 0, $a = 0, _a = 0, ab = 0, bb = 0, cb = 0, db = 0, eb = 0, fb = 0, gb = 0, hb = 0, ib = 0, jb = 0, kb = 0, lb = 0;
            X = d;
            Y = e;
            Z = f;
            $ = g;
            _ = h;
            ba = H + (X << 5 | X >>> 27) + _ + (Y & Z | ~Y & $) + 1518500249 | 0;
            _ = $;
            $ = Z;
            Z = Y << 30 | Y >>> 2;
            Y = X;
            X = ba;
            ba = I + (X << 5 | X >>> 27) + _ + (Y & Z | ~Y & $) + 1518500249 | 0;
            _ = $;
            $ = Z;
            Z = Y << 30 | Y >>> 2;
            Y = X;
            X = ba;
            ba = J + (X << 5 | X >>> 27) + _ + (Y & Z | ~Y & $) + 1518500249 | 0;
            _ = $;
            $ = Z;
            Z = Y << 30 | Y >>> 2;
            Y = X;
            X = ba;
            ba = K + (X << 5 | X >>> 27) + _ + (Y & Z | ~Y & $) + 1518500249 | 0;
            _ = $;
            $ = Z;
            Z = Y << 30 | Y >>> 2;
            Y = X;
            X = ba;
            ba = L + (X << 5 | X >>> 27) + _ + (Y & Z | ~Y & $) + 1518500249 | 0;
            _ = $;
            $ = Z;
            Z = Y << 30 | Y >>> 2;
            Y = X;
            X = ba;
            ba = M + (X << 5 | X >>> 27) + _ + (Y & Z | ~Y & $) + 1518500249 | 0;
            _ = $;
            $ = Z;
            Z = Y << 30 | Y >>> 2;
            Y = X;
            X = ba;
            ba = N + (X << 5 | X >>> 27) + _ + (Y & Z | ~Y & $) + 1518500249 | 0;
            _ = $;
            $ = Z;
            Z = Y << 30 | Y >>> 2;
            Y = X;
            X = ba;
            ba = O + (X << 5 | X >>> 27) + _ + (Y & Z | ~Y & $) + 1518500249 | 0;
            _ = $;
            $ = Z;
            Z = Y << 30 | Y >>> 2;
            Y = X;
            X = ba;
            ba = P + (X << 5 | X >>> 27) + _ + (Y & Z | ~Y & $) + 1518500249 | 0;
            _ = $;
            $ = Z;
            Z = Y << 30 | Y >>> 2;
            Y = X;
            X = ba;
            ba = Q + (X << 5 | X >>> 27) + _ + (Y & Z | ~Y & $) + 1518500249 | 0;
            _ = $;
            $ = Z;
            Z = Y << 30 | Y >>> 2;
            Y = X;
            X = ba;
            ba = R + (X << 5 | X >>> 27) + _ + (Y & Z | ~Y & $) + 1518500249 | 0;
            _ = $;
            $ = Z;
            Z = Y << 30 | Y >>> 2;
            Y = X;
            X = ba;
            ba = S + (X << 5 | X >>> 27) + _ + (Y & Z | ~Y & $) + 1518500249 | 0;
            _ = $;
            $ = Z;
            Z = Y << 30 | Y >>> 2;
            Y = X;
            X = ba;
            ba = T + (X << 5 | X >>> 27) + _ + (Y & Z | ~Y & $) + 1518500249 | 0;
            _ = $;
            $ = Z;
            Z = Y << 30 | Y >>> 2;
            Y = X;
            X = ba;
            ba = U + (X << 5 | X >>> 27) + _ + (Y & Z | ~Y & $) + 1518500249 | 0;
            _ = $;
            $ = Z;
            Z = Y << 30 | Y >>> 2;
            Y = X;
            X = ba;
            ba = V + (X << 5 | X >>> 27) + _ + (Y & Z | ~Y & $) + 1518500249 | 0;
            _ = $;
            $ = Z;
            Z = Y << 30 | Y >>> 2;
            Y = X;
            X = ba;
            ba = W + (X << 5 | X >>> 27) + _ + (Y & Z | ~Y & $) + 1518500249 | 0;
            _ = $;
            $ = Z;
            Z = Y << 30 | Y >>> 2;
            Y = X;
            X = ba;
            aa = U ^ P ^ J ^ H;
            ca = aa << 1 | aa >>> 31;
            ba = ca + (X << 5 | X >>> 27) + _ + (Y & Z | ~Y & $) + 1518500249 | 0;
            _ = $;
            $ = Z;
            Z = Y << 30 | Y >>> 2;
            Y = X;
            X = ba;
            aa = V ^ Q ^ K ^ I;
            da = aa << 1 | aa >>> 31;
            ba = da + (X << 5 | X >>> 27) + _ + (Y & Z | ~Y & $) + 1518500249 | 0;
            _ = $;
            $ = Z;
            Z = Y << 30 | Y >>> 2;
            Y = X;
            X = ba;
            aa = W ^ R ^ L ^ J;
            ea = aa << 1 | aa >>> 31;
            ba = ea + (X << 5 | X >>> 27) + _ + (Y & Z | ~Y & $) + 1518500249 | 0;
            _ = $;
            $ = Z;
            Z = Y << 30 | Y >>> 2;
            Y = X;
            X = ba;
            aa = ca ^ S ^ M ^ K;
            fa = aa << 1 | aa >>> 31;
            ba = fa + (X << 5 | X >>> 27) + _ + (Y & Z | ~Y & $) + 1518500249 | 0;
            _ = $;
            $ = Z;
            Z = Y << 30 | Y >>> 2;
            Y = X;
            X = ba;
            aa = da ^ T ^ N ^ L;
            ga = aa << 1 | aa >>> 31;
            ba = ga + (X << 5 | X >>> 27) + _ + (Y ^ Z ^ $) + 1859775393 | 0;
            _ = $;
            $ = Z;
            Z = Y << 30 | Y >>> 2;
            Y = X;
            X = ba;
            aa = ea ^ U ^ O ^ M;
            ha = aa << 1 | aa >>> 31;
            ba = ha + (X << 5 | X >>> 27) + _ + (Y ^ Z ^ $) + 1859775393 | 0;
            _ = $;
            $ = Z;
            Z = Y << 30 | Y >>> 2;
            Y = X;
            X = ba;
            aa = fa ^ V ^ P ^ N;
            ia = aa << 1 | aa >>> 31;
            ba = ia + (X << 5 | X >>> 27) + _ + (Y ^ Z ^ $) + 1859775393 | 0;
            _ = $;
            $ = Z;
            Z = Y << 30 | Y >>> 2;
            Y = X;
            X = ba;
            aa = ga ^ W ^ Q ^ O;
            ja = aa << 1 | aa >>> 31;
            ba = ja + (X << 5 | X >>> 27) + _ + (Y ^ Z ^ $) + 1859775393 | 0;
            _ = $;
            $ = Z;
            Z = Y << 30 | Y >>> 2;
            Y = X;
            X = ba;
            aa = ha ^ ca ^ R ^ P;
            ka = aa << 1 | aa >>> 31;
            ba = ka + (X << 5 | X >>> 27) + _ + (Y ^ Z ^ $) + 1859775393 | 0;
            _ = $;
            $ = Z;
            Z = Y << 30 | Y >>> 2;
            Y = X;
            X = ba;
            aa = ia ^ da ^ S ^ Q;
            la = aa << 1 | aa >>> 31;
            ba = la + (X << 5 | X >>> 27) + _ + (Y ^ Z ^ $) + 1859775393 | 0;
            _ = $;
            $ = Z;
            Z = Y << 30 | Y >>> 2;
            Y = X;
            X = ba;
            aa = ja ^ ea ^ T ^ R;
            ma = aa << 1 | aa >>> 31;
            ba = ma + (X << 5 | X >>> 27) + _ + (Y ^ Z ^ $) + 1859775393 | 0;
            _ = $;
            $ = Z;
            Z = Y << 30 | Y >>> 2;
            Y = X;
            X = ba;
            aa = ka ^ fa ^ U ^ S;
            na = aa << 1 | aa >>> 31;
            ba = na + (X << 5 | X >>> 27) + _ + (Y ^ Z ^ $) + 1859775393 | 0;
            _ = $;
            $ = Z;
            Z = Y << 30 | Y >>> 2;
            Y = X;
            X = ba;
            aa = la ^ ga ^ V ^ T;
            oa = aa << 1 | aa >>> 31;
            ba = oa + (X << 5 | X >>> 27) + _ + (Y ^ Z ^ $) + 1859775393 | 0;
            _ = $;
            $ = Z;
            Z = Y << 30 | Y >>> 2;
            Y = X;
            X = ba;
            aa = ma ^ ha ^ W ^ U;
            pa = aa << 1 | aa >>> 31;
            ba = pa + (X << 5 | X >>> 27) + _ + (Y ^ Z ^ $) + 1859775393 | 0;
            _ = $;
            $ = Z;
            Z = Y << 30 | Y >>> 2;
            Y = X;
            X = ba;
            aa = na ^ ia ^ ca ^ V;
            qa = aa << 1 | aa >>> 31;
            ba = qa + (X << 5 | X >>> 27) + _ + (Y ^ Z ^ $) + 1859775393 | 0;
            _ = $;
            $ = Z;
            Z = Y << 30 | Y >>> 2;
            Y = X;
            X = ba;
            aa = oa ^ ja ^ da ^ W;
            ra = aa << 1 | aa >>> 31;
            ba = ra + (X << 5 | X >>> 27) + _ + (Y ^ Z ^ $) + 1859775393 | 0;
            _ = $;
            $ = Z;
            Z = Y << 30 | Y >>> 2;
            Y = X;
            X = ba;
            aa = pa ^ ka ^ ea ^ ca;
            sa = aa << 1 | aa >>> 31;
            ba = sa + (X << 5 | X >>> 27) + _ + (Y ^ Z ^ $) + 1859775393 | 0;
            _ = $;
            $ = Z;
            Z = Y << 30 | Y >>> 2;
            Y = X;
            X = ba;
            aa = qa ^ la ^ fa ^ da;
            ta = aa << 1 | aa >>> 31;
            ba = ta + (X << 5 | X >>> 27) + _ + (Y ^ Z ^ $) + 1859775393 | 0;
            _ = $;
            $ = Z;
            Z = Y << 30 | Y >>> 2;
            Y = X;
            X = ba;
            aa = ra ^ ma ^ ga ^ ea;
            ua = aa << 1 | aa >>> 31;
            ba = ua + (X << 5 | X >>> 27) + _ + (Y ^ Z ^ $) + 1859775393 | 0;
            _ = $;
            $ = Z;
            Z = Y << 30 | Y >>> 2;
            Y = X;
            X = ba;
            aa = sa ^ na ^ ha ^ fa;
            va = aa << 1 | aa >>> 31;
            ba = va + (X << 5 | X >>> 27) + _ + (Y ^ Z ^ $) + 1859775393 | 0;
            _ = $;
            $ = Z;
            Z = Y << 30 | Y >>> 2;
            Y = X;
            X = ba;
            aa = ta ^ oa ^ ia ^ ga;
            wa = aa << 1 | aa >>> 31;
            ba = wa + (X << 5 | X >>> 27) + _ + (Y ^ Z ^ $) + 1859775393 | 0;
            _ = $;
            $ = Z;
            Z = Y << 30 | Y >>> 2;
            Y = X;
            X = ba;
            aa = ua ^ pa ^ ja ^ ha;
            xa = aa << 1 | aa >>> 31;
            ba = xa + (X << 5 | X >>> 27) + _ + (Y ^ Z ^ $) + 1859775393 | 0;
            _ = $;
            $ = Z;
            Z = Y << 30 | Y >>> 2;
            Y = X;
            X = ba;
            aa = va ^ qa ^ ka ^ ia;
            ya = aa << 1 | aa >>> 31;
            ba = ya + (X << 5 | X >>> 27) + _ + (Y ^ Z ^ $) + 1859775393 | 0;
            _ = $;
            $ = Z;
            Z = Y << 30 | Y >>> 2;
            Y = X;
            X = ba;
            aa = wa ^ ra ^ la ^ ja;
            za = aa << 1 | aa >>> 31;
            ba = za + (X << 5 | X >>> 27) + _ + (Y ^ Z ^ $) + 1859775393 | 0;
            _ = $;
            $ = Z;
            Z = Y << 30 | Y >>> 2;
            Y = X;
            X = ba;
            aa = xa ^ sa ^ ma ^ ka;
            Aa = aa << 1 | aa >>> 31;
            ba = Aa + (X << 5 | X >>> 27) + _ + (Y & Z | Y & $ | Z & $) - 1894007588 | 0;
            _ = $;
            $ = Z;
            Z = Y << 30 | Y >>> 2;
            Y = X;
            X = ba;
            aa = ya ^ ta ^ na ^ la;
            Ba = aa << 1 | aa >>> 31;
            ba = Ba + (X << 5 | X >>> 27) + _ + (Y & Z | Y & $ | Z & $) - 1894007588 | 0;
            _ = $;
            $ = Z;
            Z = Y << 30 | Y >>> 2;
            Y = X;
            X = ba;
            aa = za ^ ua ^ oa ^ ma;
            Ca = aa << 1 | aa >>> 31;
            ba = Ca + (X << 5 | X >>> 27) + _ + (Y & Z | Y & $ | Z & $) - 1894007588 | 0;
            _ = $;
            $ = Z;
            Z = Y << 30 | Y >>> 2;
            Y = X;
            X = ba;
            aa = Aa ^ va ^ pa ^ na;
            Da = aa << 1 | aa >>> 31;
            ba = Da + (X << 5 | X >>> 27) + _ + (Y & Z | Y & $ | Z & $) - 1894007588 | 0;
            _ = $;
            $ = Z;
            Z = Y << 30 | Y >>> 2;
            Y = X;
            X = ba;
            aa = Ba ^ wa ^ qa ^ oa;
            Ea = aa << 1 | aa >>> 31;
            ba = Ea + (X << 5 | X >>> 27) + _ + (Y & Z | Y & $ | Z & $) - 1894007588 | 0;
            _ = $;
            $ = Z;
            Z = Y << 30 | Y >>> 2;
            Y = X;
            X = ba;
            aa = Ca ^ xa ^ ra ^ pa;
            Fa = aa << 1 | aa >>> 31;
            ba = Fa + (X << 5 | X >>> 27) + _ + (Y & Z | Y & $ | Z & $) - 1894007588 | 0;
            _ = $;
            $ = Z;
            Z = Y << 30 | Y >>> 2;
            Y = X;
            X = ba;
            aa = Da ^ ya ^ sa ^ qa;
            Ga = aa << 1 | aa >>> 31;
            ba = Ga + (X << 5 | X >>> 27) + _ + (Y & Z | Y & $ | Z & $) - 1894007588 | 0;
            _ = $;
            $ = Z;
            Z = Y << 30 | Y >>> 2;
            Y = X;
            X = ba;
            aa = Ea ^ za ^ ta ^ ra;
            Ha = aa << 1 | aa >>> 31;
            ba = Ha + (X << 5 | X >>> 27) + _ + (Y & Z | Y & $ | Z & $) - 1894007588 | 0;
            _ = $;
            $ = Z;
            Z = Y << 30 | Y >>> 2;
            Y = X;
            X = ba;
            aa = Fa ^ Aa ^ ua ^ sa;
            Ia = aa << 1 | aa >>> 31;
            ba = Ia + (X << 5 | X >>> 27) + _ + (Y & Z | Y & $ | Z & $) - 1894007588 | 0;
            _ = $;
            $ = Z;
            Z = Y << 30 | Y >>> 2;
            Y = X;
            X = ba;
            aa = Ga ^ Ba ^ va ^ ta;
            Ja = aa << 1 | aa >>> 31;
            ba = Ja + (X << 5 | X >>> 27) + _ + (Y & Z | Y & $ | Z & $) - 1894007588 | 0;
            _ = $;
            $ = Z;
            Z = Y << 30 | Y >>> 2;
            Y = X;
            X = ba;
            aa = Ha ^ Ca ^ wa ^ ua;
            Ka = aa << 1 | aa >>> 31;
            ba = Ka + (X << 5 | X >>> 27) + _ + (Y & Z | Y & $ | Z & $) - 1894007588 | 0;
            _ = $;
            $ = Z;
            Z = Y << 30 | Y >>> 2;
            Y = X;
            X = ba;
            aa = Ia ^ Da ^ xa ^ va;
            La = aa << 1 | aa >>> 31;
            ba = La + (X << 5 | X >>> 27) + _ + (Y & Z | Y & $ | Z & $) - 1894007588 | 0;
            _ = $;
            $ = Z;
            Z = Y << 30 | Y >>> 2;
            Y = X;
            X = ba;
            aa = Ja ^ Ea ^ ya ^ wa;
            Ma = aa << 1 | aa >>> 31;
            ba = Ma + (X << 5 | X >>> 27) + _ + (Y & Z | Y & $ | Z & $) - 1894007588 | 0;
            _ = $;
            $ = Z;
            Z = Y << 30 | Y >>> 2;
            Y = X;
            X = ba;
            aa = Ka ^ Fa ^ za ^ xa;
            Na = aa << 1 | aa >>> 31;
            ba = Na + (X << 5 | X >>> 27) + _ + (Y & Z | Y & $ | Z & $) - 1894007588 | 0;
            _ = $;
            $ = Z;
            Z = Y << 30 | Y >>> 2;
            Y = X;
            X = ba;
            aa = La ^ Ga ^ Aa ^ ya;
            Oa = aa << 1 | aa >>> 31;
            ba = Oa + (X << 5 | X >>> 27) + _ + (Y & Z | Y & $ | Z & $) - 1894007588 | 0;
            _ = $;
            $ = Z;
            Z = Y << 30 | Y >>> 2;
            Y = X;
            X = ba;
            aa = Ma ^ Ha ^ Ba ^ za;
            Pa = aa << 1 | aa >>> 31;
            ba = Pa + (X << 5 | X >>> 27) + _ + (Y & Z | Y & $ | Z & $) - 1894007588 | 0;
            _ = $;
            $ = Z;
            Z = Y << 30 | Y >>> 2;
            Y = X;
            X = ba;
            aa = Na ^ Ia ^ Ca ^ Aa;
            Qa = aa << 1 | aa >>> 31;
            ba = Qa + (X << 5 | X >>> 27) + _ + (Y & Z | Y & $ | Z & $) - 1894007588 | 0;
            _ = $;
            $ = Z;
            Z = Y << 30 | Y >>> 2;
            Y = X;
            X = ba;
            aa = Oa ^ Ja ^ Da ^ Ba;
            Ra = aa << 1 | aa >>> 31;
            ba = Ra + (X << 5 | X >>> 27) + _ + (Y & Z | Y & $ | Z & $) - 1894007588 | 0;
            _ = $;
            $ = Z;
            Z = Y << 30 | Y >>> 2;
            Y = X;
            X = ba;
            aa = Pa ^ Ka ^ Ea ^ Ca;
            Sa = aa << 1 | aa >>> 31;
            ba = Sa + (X << 5 | X >>> 27) + _ + (Y & Z | Y & $ | Z & $) - 1894007588 | 0;
            _ = $;
            $ = Z;
            Z = Y << 30 | Y >>> 2;
            Y = X;
            X = ba;
            aa = Qa ^ La ^ Fa ^ Da;
            Ta = aa << 1 | aa >>> 31;
            ba = Ta + (X << 5 | X >>> 27) + _ + (Y & Z | Y & $ | Z & $) - 1894007588 | 0;
            _ = $;
            $ = Z;
            Z = Y << 30 | Y >>> 2;
            Y = X;
            X = ba;
            aa = Ra ^ Ma ^ Ga ^ Ea;
            Ua = aa << 1 | aa >>> 31;
            ba = Ua + (X << 5 | X >>> 27) + _ + (Y ^ Z ^ $) - 899497514 | 0;
            _ = $;
            $ = Z;
            Z = Y << 30 | Y >>> 2;
            Y = X;
            X = ba;
            aa = Sa ^ Na ^ Ha ^ Fa;
            Va = aa << 1 | aa >>> 31;
            ba = Va + (X << 5 | X >>> 27) + _ + (Y ^ Z ^ $) - 899497514 | 0;
            _ = $;
            $ = Z;
            Z = Y << 30 | Y >>> 2;
            Y = X;
            X = ba;
            aa = Ta ^ Oa ^ Ia ^ Ga;
            Wa = aa << 1 | aa >>> 31;
            ba = Wa + (X << 5 | X >>> 27) + _ + (Y ^ Z ^ $) - 899497514 | 0;
            _ = $;
            $ = Z;
            Z = Y << 30 | Y >>> 2;
            Y = X;
            X = ba;
            aa = Ua ^ Pa ^ Ja ^ Ha;
            Xa = aa << 1 | aa >>> 31;
            ba = Xa + (X << 5 | X >>> 27) + _ + (Y ^ Z ^ $) - 899497514 | 0;
            _ = $;
            $ = Z;
            Z = Y << 30 | Y >>> 2;
            Y = X;
            X = ba;
            aa = Va ^ Qa ^ Ka ^ Ia;
            Ya = aa << 1 | aa >>> 31;
            ba = Ya + (X << 5 | X >>> 27) + _ + (Y ^ Z ^ $) - 899497514 | 0;
            _ = $;
            $ = Z;
            Z = Y << 30 | Y >>> 2;
            Y = X;
            X = ba;
            aa = Wa ^ Ra ^ La ^ Ja;
            Za = aa << 1 | aa >>> 31;
            ba = Za + (X << 5 | X >>> 27) + _ + (Y ^ Z ^ $) - 899497514 | 0;
            _ = $;
            $ = Z;
            Z = Y << 30 | Y >>> 2;
            Y = X;
            X = ba;
            aa = Xa ^ Sa ^ Ma ^ Ka;
            $a = aa << 1 | aa >>> 31;
            ba = $a + (X << 5 | X >>> 27) + _ + (Y ^ Z ^ $) - 899497514 | 0;
            _ = $;
            $ = Z;
            Z = Y << 30 | Y >>> 2;
            Y = X;
            X = ba;
            aa = Ya ^ Ta ^ Na ^ La;
            _a = aa << 1 | aa >>> 31;
            ba = _a + (X << 5 | X >>> 27) + _ + (Y ^ Z ^ $) - 899497514 | 0;
            _ = $;
            $ = Z;
            Z = Y << 30 | Y >>> 2;
            Y = X;
            X = ba;
            aa = Za ^ Ua ^ Oa ^ Ma;
            ab = aa << 1 | aa >>> 31;
            ba = ab + (X << 5 | X >>> 27) + _ + (Y ^ Z ^ $) - 899497514 | 0;
            _ = $;
            $ = Z;
            Z = Y << 30 | Y >>> 2;
            Y = X;
            X = ba;
            aa = $a ^ Va ^ Pa ^ Na;
            bb = aa << 1 | aa >>> 31;
            ba = bb + (X << 5 | X >>> 27) + _ + (Y ^ Z ^ $) - 899497514 | 0;
            _ = $;
            $ = Z;
            Z = Y << 30 | Y >>> 2;
            Y = X;
            X = ba;
            aa = _a ^ Wa ^ Qa ^ Oa;
            cb = aa << 1 | aa >>> 31;
            ba = cb + (X << 5 | X >>> 27) + _ + (Y ^ Z ^ $) - 899497514 | 0;
            _ = $;
            $ = Z;
            Z = Y << 30 | Y >>> 2;
            Y = X;
            X = ba;
            aa = ab ^ Xa ^ Ra ^ Pa;
            db = aa << 1 | aa >>> 31;
            ba = db + (X << 5 | X >>> 27) + _ + (Y ^ Z ^ $) - 899497514 | 0;
            _ = $;
            $ = Z;
            Z = Y << 30 | Y >>> 2;
            Y = X;
            X = ba;
            aa = bb ^ Ya ^ Sa ^ Qa;
            eb = aa << 1 | aa >>> 31;
            ba = eb + (X << 5 | X >>> 27) + _ + (Y ^ Z ^ $) - 899497514 | 0;
            _ = $;
            $ = Z;
            Z = Y << 30 | Y >>> 2;
            Y = X;
            X = ba;
            aa = cb ^ Za ^ Ta ^ Ra;
            fb = aa << 1 | aa >>> 31;
            ba = fb + (X << 5 | X >>> 27) + _ + (Y ^ Z ^ $) - 899497514 | 0;
            _ = $;
            $ = Z;
            Z = Y << 30 | Y >>> 2;
            Y = X;
            X = ba;
            aa = db ^ $a ^ Ua ^ Sa;
            gb = aa << 1 | aa >>> 31;
            ba = gb + (X << 5 | X >>> 27) + _ + (Y ^ Z ^ $) - 899497514 | 0;
            _ = $;
            $ = Z;
            Z = Y << 30 | Y >>> 2;
            Y = X;
            X = ba;
            aa = eb ^ _a ^ Va ^ Ta;
            hb = aa << 1 | aa >>> 31;
            ba = hb + (X << 5 | X >>> 27) + _ + (Y ^ Z ^ $) - 899497514 | 0;
            _ = $;
            $ = Z;
            Z = Y << 30 | Y >>> 2;
            Y = X;
            X = ba;
            aa = fb ^ ab ^ Wa ^ Ua;
            ib = aa << 1 | aa >>> 31;
            ba = ib + (X << 5 | X >>> 27) + _ + (Y ^ Z ^ $) - 899497514 | 0;
            _ = $;
            $ = Z;
            Z = Y << 30 | Y >>> 2;
            Y = X;
            X = ba;
            aa = gb ^ bb ^ Xa ^ Va;
            jb = aa << 1 | aa >>> 31;
            ba = jb + (X << 5 | X >>> 27) + _ + (Y ^ Z ^ $) - 899497514 | 0;
            _ = $;
            $ = Z;
            Z = Y << 30 | Y >>> 2;
            Y = X;
            X = ba;
            aa = hb ^ cb ^ Ya ^ Wa;
            kb = aa << 1 | aa >>> 31;
            ba = kb + (X << 5 | X >>> 27) + _ + (Y ^ Z ^ $) - 899497514 | 0;
            _ = $;
            $ = Z;
            Z = Y << 30 | Y >>> 2;
            Y = X;
            X = ba;
            aa = ib ^ db ^ Za ^ Xa;
            lb = aa << 1 | aa >>> 31;
            ba = lb + (X << 5 | X >>> 27) + _ + (Y ^ Z ^ $) - 899497514 | 0;
            _ = $;
            $ = Z;
            Z = Y << 30 | Y >>> 2;
            Y = X;
            X = ba;
            d = d + X | 0;
            e = e + Y | 0;
            f = f + Z | 0;
            g = g + $ | 0;
            h = h + _ | 0
        }

        function w(H) {
            H = H | 0;
            v(u[H | 0] << 24 | u[H | 1] << 16 | u[H | 2] << 8 | u[H | 3], u[H | 4] << 24 | u[H | 5] << 16 | u[H | 6] << 8 | u[H | 7], u[H | 8] << 24 | u[H | 9] << 16 | u[H | 10] << 8 | u[H | 11], u[H | 12] << 24 | u[H | 13] << 16 | u[H | 14] << 8 | u[H | 15], u[H | 16] << 24 | u[H | 17] << 16 | u[H | 18] << 8 | u[H | 19], u[H | 20] << 24 | u[H | 21] << 16 | u[H | 22] << 8 | u[H | 23], u[H | 24] << 24 | u[H | 25] << 16 | u[H | 26] << 8 | u[H | 27], u[H | 28] << 24 | u[H | 29] << 16 | u[H | 30] << 8 | u[H | 31], u[H | 32] << 24 | u[H | 33] << 16 | u[H | 34] << 8 | u[H | 35], u[H | 36] << 24 | u[H | 37] << 16 | u[H | 38] << 8 | u[H | 39], u[H | 40] << 24 | u[H | 41] << 16 | u[H | 42] << 8 | u[H | 43], u[H | 44] << 24 | u[H | 45] << 16 | u[H | 46] << 8 | u[H | 47], u[H | 48] << 24 | u[H | 49] << 16 | u[H | 50] << 8 | u[H | 51], u[H | 52] << 24 | u[H | 53] << 16 | u[H | 54] << 8 | u[H | 55], u[H | 56] << 24 | u[H | 57] << 16 | u[H | 58] << 8 | u[H | 59], u[H | 60] << 24 | u[H | 61] << 16 | u[H | 62] << 8 | u[H | 63])
        }

        function x(H) {
            H = H | 0;
            u[H | 0] = d >>> 24;
            u[H | 1] = d >>> 16 & 255;
            u[H | 2] = d >>> 8 & 255;
            u[H | 3] = d & 255;
            u[H | 4] = e >>> 24;
            u[H | 5] = e >>> 16 & 255;
            u[H | 6] = e >>> 8 & 255;
            u[H | 7] = e & 255;
            u[H | 8] = f >>> 24;
            u[H | 9] = f >>> 16 & 255;
            u[H | 10] = f >>> 8 & 255;
            u[H | 11] = f & 255;
            u[H | 12] = g >>> 24;
            u[H | 13] = g >>> 16 & 255;
            u[H | 14] = g >>> 8 & 255;
            u[H | 15] = g & 255;
            u[H | 16] = h >>> 24;
            u[H | 17] = h >>> 16 & 255;
            u[H | 18] = h >>> 8 & 255;
            u[H | 19] = h & 255
        }

        function y() {
            d = 1732584193;
            e = 4023233417;
            f = 2562383102;
            g = 271733878;
            h = 3285377520;
            i = j = 0
        }

        function z(H, I, J, K, L, M, N) {
            H = H | 0;
            I = I | 0;
            J = J | 0;
            K = K | 0;
            L = L | 0;
            M = M | 0;
            N = N | 0;
            d = H;
            e = I;
            f = J;
            g = K;
            h = L;
            i = M;
            j = N
        }

        function A(H, I) {
            H = H | 0;
            I = I | 0;
            var J = 0;
            if (H & 63)return -1;
            while ((I | 0) >= 64) {
                w(H);
                H = H + 64 | 0;
                I = I - 64 | 0;
                J = J + 64 | 0
            }
            i = i + J | 0;
            if (i >>> 0 < J >>> 0)j = j + 1 | 0;
            return J | 0
        }

        function B(H, I, J) {
            H = H | 0;
            I = I | 0;
            J = J | 0;
            var K = 0, L = 0;
            if (H & 63)return -1;
            if (~J)if (J & 31)return -1;
            if ((I | 0) >= 64) {
                K = A(H, I) | 0;
                if ((K | 0) == -1)return -1;
                H = H + K | 0;
                I = I - K | 0
            }
            K = K + I | 0;
            i = i + I | 0;
            if (i >>> 0 < I >>> 0)j = j + 1 | 0;
            u[H | I] = 128;
            if ((I | 0) >= 56) {
                for (L = I + 1 | 0; (L | 0) < 64; L = L + 1 | 0)u[H | L] = 0;
                w(H);
                I = 0;
                u[H | 0] = 0
            }
            for (L = I + 1 | 0; (L | 0) < 59; L = L + 1 | 0)u[H | L] = 0;
            u[H | 56] = j >>> 21 & 255;
            u[H | 57] = j >>> 13 & 255;
            u[H | 58] = j >>> 5 & 255;
            u[H | 59] = j << 3 & 255 | i >>> 29;
            u[H | 60] = i >>> 21 & 255;
            u[H | 61] = i >>> 13 & 255;
            u[H | 62] = i >>> 5 & 255;
            u[H | 63] = i << 3 & 255;
            w(H);
            if (~J)x(J);
            return K | 0
        }

        function C() {
            d = k;
            e = l;
            f = m;
            g = n;
            h = o;
            i = 64;
            j = 0
        }

        function D() {
            d = p;
            e = q;
            f = r;
            g = s;
            h = t;
            i = 64;
            j = 0
        }

        function E(H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W) {
            H = H | 0;
            I = I | 0;
            J = J | 0;
            K = K | 0;
            L = L | 0;
            M = M | 0;
            N = N | 0;
            O = O | 0;
            P = P | 0;
            Q = Q | 0;
            R = R | 0;
            S = S | 0;
            T = T | 0;
            U = U | 0;
            V = V | 0;
            W = W | 0;
            y();
            v(H ^ 1549556828, I ^ 1549556828, J ^ 1549556828, K ^ 1549556828, L ^ 1549556828, M ^ 1549556828, N ^ 1549556828, O ^ 1549556828, P ^ 1549556828, Q ^ 1549556828, R ^ 1549556828, S ^ 1549556828, T ^ 1549556828, U ^ 1549556828, V ^ 1549556828, W ^ 1549556828);
            p = d;
            q = e;
            r = f;
            s = g;
            t = h;
            y();
            v(H ^ 909522486, I ^ 909522486, J ^ 909522486, K ^ 909522486, L ^ 909522486, M ^ 909522486, N ^ 909522486, O ^ 909522486, P ^ 909522486, Q ^ 909522486, R ^ 909522486, S ^ 909522486, T ^ 909522486, U ^ 909522486, V ^ 909522486, W ^ 909522486);
            k = d;
            l = e;
            m = f;
            n = g;
            o = h;
            i = 64;
            j = 0
        }

        function F(H, I, J) {
            H = H | 0;
            I = I | 0;
            J = J | 0;
            var K = 0, L = 0, M = 0, N = 0, O = 0, P = 0;
            if (H & 63)return -1;
            if (~J)if (J & 31)return -1;
            P = B(H, I, -1) | 0;
            K = d, L = e, M = f, N = g, O = h;
            D();
            v(K, L, M, N, O, 2147483648, 0, 0, 0, 0, 0, 0, 0, 0, 0, 672);
            if (~J)x(J);
            return P | 0
        }

        function G(H, I, J, K, L) {
            H = H | 0;
            I = I | 0;
            J = J | 0;
            K = K | 0;
            L = L | 0;
            var M = 0, N = 0, O = 0, P = 0, Q = 0, R = 0, S = 0, T = 0, U = 0, V = 0;
            if (H & 63)return -1;
            if (~L)if (L & 31)return -1;
            u[H + I | 0] = J >>> 24;
            u[H + I + 1 | 0] = J >>> 16 & 255;
            u[H + I + 2 | 0] = J >>> 8 & 255;
            u[H + I + 3 | 0] = J & 255;
            F(H, I + 4 | 0, -1) | 0;
            M = R = d, N = S = e, O = T = f, P = U = g, Q = V = h;
            K = K - 1 | 0;
            while ((K | 0) > 0) {
                C();
                v(R, S, T, U, V, 2147483648, 0, 0, 0, 0, 0, 0, 0, 0, 0, 672);
                R = d, S = e, T = f, U = g, V = h;
                D();
                v(R, S, T, U, V, 2147483648, 0, 0, 0, 0, 0, 0, 0, 0, 0, 672);
                R = d, S = e, T = f, U = g, V = h;
                M = M ^ d;
                N = N ^ e;
                O = O ^ f;
                P = P ^ g;
                Q = Q ^ h;
                K = K - 1 | 0
            }
            d = M;
            e = N;
            f = O;
            g = P;
            h = Q;
            if (~L)x(L);
            return 0
        }

        return {
            reset: y,
            init: z,
            process: A,
            finish: B,
            hmac_reset: C,
            hmac_init: E,
            hmac_finish: F,
            pbkdf2_generate_block: G
        }
    }

    function aa(a) {
        a = a || {}, this.heap = r(Uint8Array, a), this.asm = a.asm || _(b, null, this.heap.buffer), this.BLOCK_SIZE = hc, this.HASH_SIZE = ic, this.reset()
    }

    function ba() {
        return null === kc && (kc = new aa({heapSize: 1048576})), kc
    }

    function ca(a) {
        if (void 0 === a)throw new SyntaxError("data required");
        return ba().reset().process(a).finish().result
    }

    function da(a) {
        var b = ca(a);
        return j(b)
    }

    function ea(a) {
        var b = ca(a);
        return k(b)
    }

    function fa(a, b, c) {
        "use asm";
        var d = 0, e = 0, f = 0, g = 0, h = 0, i = 0, j = 0, k = 0, l = 0, m = 0;
        var n = 0, o = 0, p = 0, q = 0, r = 0, s = 0, t = 0, u = 0, v = 0, w = 0, x = 0, y = 0, z = 0, A = 0, B = 0, C = 0;
        var D = new a.Uint8Array(c);

        function E(Q, R, S, T, U, V, W, X, Y, Z, $, _, aa, ba, ca, da) {
            Q = Q | 0;
            R = R | 0;
            S = S | 0;
            T = T | 0;
            U = U | 0;
            V = V | 0;
            W = W | 0;
            X = X | 0;
            Y = Y | 0;
            Z = Z | 0;
            $ = $ | 0;
            _ = _ | 0;
            aa = aa | 0;
            ba = ba | 0;
            ca = ca | 0;
            da = da | 0;
            var ea = 0, fa = 0, ga = 0, ha = 0, ia = 0, ja = 0, ka = 0, la = 0, ma = 0;
            ea = d;
            fa = e;
            ga = f;
            ha = g;
            ia = h;
            ja = i;
            ka = j;
            la = k;
            ma = Q + la + (ia >>> 6 ^ ia >>> 11 ^ ia >>> 25 ^ ia << 26 ^ ia << 21 ^ ia << 7) + (ka ^ ia & (ja ^ ka)) + 1116352408 | 0;
            la = ka;
            ka = ja;
            ja = ia;
            ia = ha + ma | 0;
            ha = ga;
            ga = fa;
            fa = ea;
            ea = ma + (fa & ga ^ ha & (fa ^ ga)) + (fa >>> 2 ^ fa >>> 13 ^ fa >>> 22 ^ fa << 30 ^ fa << 19 ^ fa << 10) | 0;
            ma = R + la + (ia >>> 6 ^ ia >>> 11 ^ ia >>> 25 ^ ia << 26 ^ ia << 21 ^ ia << 7) + (ka ^ ia & (ja ^ ka)) + 1899447441 | 0;
            la = ka;
            ka = ja;
            ja = ia;
            ia = ha + ma | 0;
            ha = ga;
            ga = fa;
            fa = ea;
            ea = ma + (fa & ga ^ ha & (fa ^ ga)) + (fa >>> 2 ^ fa >>> 13 ^ fa >>> 22 ^ fa << 30 ^ fa << 19 ^ fa << 10) | 0;
            ma = S + la + (ia >>> 6 ^ ia >>> 11 ^ ia >>> 25 ^ ia << 26 ^ ia << 21 ^ ia << 7) + (ka ^ ia & (ja ^ ka)) + 3049323471 | 0;
            la = ka;
            ka = ja;
            ja = ia;
            ia = ha + ma | 0;
            ha = ga;
            ga = fa;
            fa = ea;
            ea = ma + (fa & ga ^ ha & (fa ^ ga)) + (fa >>> 2 ^ fa >>> 13 ^ fa >>> 22 ^ fa << 30 ^ fa << 19 ^ fa << 10) | 0;
            ma = T + la + (ia >>> 6 ^ ia >>> 11 ^ ia >>> 25 ^ ia << 26 ^ ia << 21 ^ ia << 7) + (ka ^ ia & (ja ^ ka)) + 3921009573 | 0;
            la = ka;
            ka = ja;
            ja = ia;
            ia = ha + ma | 0;
            ha = ga;
            ga = fa;
            fa = ea;
            ea = ma + (fa & ga ^ ha & (fa ^ ga)) + (fa >>> 2 ^ fa >>> 13 ^ fa >>> 22 ^ fa << 30 ^ fa << 19 ^ fa << 10) | 0;
            ma = U + la + (ia >>> 6 ^ ia >>> 11 ^ ia >>> 25 ^ ia << 26 ^ ia << 21 ^ ia << 7) + (ka ^ ia & (ja ^ ka)) + 961987163 | 0;
            la = ka;
            ka = ja;
            ja = ia;
            ia = ha + ma | 0;
            ha = ga;
            ga = fa;
            fa = ea;
            ea = ma + (fa & ga ^ ha & (fa ^ ga)) + (fa >>> 2 ^ fa >>> 13 ^ fa >>> 22 ^ fa << 30 ^ fa << 19 ^ fa << 10) | 0;
            ma = V + la + (ia >>> 6 ^ ia >>> 11 ^ ia >>> 25 ^ ia << 26 ^ ia << 21 ^ ia << 7) + (ka ^ ia & (ja ^ ka)) + 1508970993 | 0;
            la = ka;
            ka = ja;
            ja = ia;
            ia = ha + ma | 0;
            ha = ga;
            ga = fa;
            fa = ea;
            ea = ma + (fa & ga ^ ha & (fa ^ ga)) + (fa >>> 2 ^ fa >>> 13 ^ fa >>> 22 ^ fa << 30 ^ fa << 19 ^ fa << 10) | 0;
            ma = W + la + (ia >>> 6 ^ ia >>> 11 ^ ia >>> 25 ^ ia << 26 ^ ia << 21 ^ ia << 7) + (ka ^ ia & (ja ^ ka)) + 2453635748 | 0;
            la = ka;
            ka = ja;
            ja = ia;
            ia = ha + ma | 0;
            ha = ga;
            ga = fa;
            fa = ea;
            ea = ma + (fa & ga ^ ha & (fa ^ ga)) + (fa >>> 2 ^ fa >>> 13 ^ fa >>> 22 ^ fa << 30 ^ fa << 19 ^ fa << 10) | 0;
            ma = X + la + (ia >>> 6 ^ ia >>> 11 ^ ia >>> 25 ^ ia << 26 ^ ia << 21 ^ ia << 7) + (ka ^ ia & (ja ^ ka)) + 2870763221 | 0;
            la = ka;
            ka = ja;
            ja = ia;
            ia = ha + ma | 0;
            ha = ga;
            ga = fa;
            fa = ea;
            ea = ma + (fa & ga ^ ha & (fa ^ ga)) + (fa >>> 2 ^ fa >>> 13 ^ fa >>> 22 ^ fa << 30 ^ fa << 19 ^ fa << 10) | 0;
            ma = Y + la + (ia >>> 6 ^ ia >>> 11 ^ ia >>> 25 ^ ia << 26 ^ ia << 21 ^ ia << 7) + (ka ^ ia & (ja ^ ka)) + 3624381080 | 0;
            la = ka;
            ka = ja;
            ja = ia;
            ia = ha + ma | 0;
            ha = ga;
            ga = fa;
            fa = ea;
            ea = ma + (fa & ga ^ ha & (fa ^ ga)) + (fa >>> 2 ^ fa >>> 13 ^ fa >>> 22 ^ fa << 30 ^ fa << 19 ^ fa << 10) | 0;
            ma = Z + la + (ia >>> 6 ^ ia >>> 11 ^ ia >>> 25 ^ ia << 26 ^ ia << 21 ^ ia << 7) + (ka ^ ia & (ja ^ ka)) + 310598401 | 0;
            la = ka;
            ka = ja;
            ja = ia;
            ia = ha + ma | 0;
            ha = ga;
            ga = fa;
            fa = ea;
            ea = ma + (fa & ga ^ ha & (fa ^ ga)) + (fa >>> 2 ^ fa >>> 13 ^ fa >>> 22 ^ fa << 30 ^ fa << 19 ^ fa << 10) | 0;
            ma = $ + la + (ia >>> 6 ^ ia >>> 11 ^ ia >>> 25 ^ ia << 26 ^ ia << 21 ^ ia << 7) + (ka ^ ia & (ja ^ ka)) + 607225278 | 0;
            la = ka;
            ka = ja;
            ja = ia;
            ia = ha + ma | 0;
            ha = ga;
            ga = fa;
            fa = ea;
            ea = ma + (fa & ga ^ ha & (fa ^ ga)) + (fa >>> 2 ^ fa >>> 13 ^ fa >>> 22 ^ fa << 30 ^ fa << 19 ^ fa << 10) | 0;
            ma = _ + la + (ia >>> 6 ^ ia >>> 11 ^ ia >>> 25 ^ ia << 26 ^ ia << 21 ^ ia << 7) + (ka ^ ia & (ja ^ ka)) + 1426881987 | 0;
            la = ka;
            ka = ja;
            ja = ia;
            ia = ha + ma | 0;
            ha = ga;
            ga = fa;
            fa = ea;
            ea = ma + (fa & ga ^ ha & (fa ^ ga)) + (fa >>> 2 ^ fa >>> 13 ^ fa >>> 22 ^ fa << 30 ^ fa << 19 ^ fa << 10) | 0;
            ma = aa + la + (ia >>> 6 ^ ia >>> 11 ^ ia >>> 25 ^ ia << 26 ^ ia << 21 ^ ia << 7) + (ka ^ ia & (ja ^ ka)) + 1925078388 | 0;
            la = ka;
            ka = ja;
            ja = ia;
            ia = ha + ma | 0;
            ha = ga;
            ga = fa;
            fa = ea;
            ea = ma + (fa & ga ^ ha & (fa ^ ga)) + (fa >>> 2 ^ fa >>> 13 ^ fa >>> 22 ^ fa << 30 ^ fa << 19 ^ fa << 10) | 0;
            ma = ba + la + (ia >>> 6 ^ ia >>> 11 ^ ia >>> 25 ^ ia << 26 ^ ia << 21 ^ ia << 7) + (ka ^ ia & (ja ^ ka)) + 2162078206 | 0;
            la = ka;
            ka = ja;
            ja = ia;
            ia = ha + ma | 0;
            ha = ga;
            ga = fa;
            fa = ea;
            ea = ma + (fa & ga ^ ha & (fa ^ ga)) + (fa >>> 2 ^ fa >>> 13 ^ fa >>> 22 ^ fa << 30 ^ fa << 19 ^ fa << 10) | 0;
            ma = ca + la + (ia >>> 6 ^ ia >>> 11 ^ ia >>> 25 ^ ia << 26 ^ ia << 21 ^ ia << 7) + (ka ^ ia & (ja ^ ka)) + 2614888103 | 0;
            la = ka;
            ka = ja;
            ja = ia;
            ia = ha + ma | 0;
            ha = ga;
            ga = fa;
            fa = ea;
            ea = ma + (fa & ga ^ ha & (fa ^ ga)) + (fa >>> 2 ^ fa >>> 13 ^ fa >>> 22 ^ fa << 30 ^ fa << 19 ^ fa << 10) | 0;
            ma = da + la + (ia >>> 6 ^ ia >>> 11 ^ ia >>> 25 ^ ia << 26 ^ ia << 21 ^ ia << 7) + (ka ^ ia & (ja ^ ka)) + 3248222580 | 0;
            la = ka;
            ka = ja;
            ja = ia;
            ia = ha + ma | 0;
            ha = ga;
            ga = fa;
            fa = ea;
            ea = ma + (fa & ga ^ ha & (fa ^ ga)) + (fa >>> 2 ^ fa >>> 13 ^ fa >>> 22 ^ fa << 30 ^ fa << 19 ^ fa << 10) | 0;
            Q = ma = (R >>> 7 ^ R >>> 18 ^ R >>> 3 ^ R << 25 ^ R << 14) + (ca >>> 17 ^ ca >>> 19 ^ ca >>> 10 ^ ca << 15 ^ ca << 13) + Q + Z | 0;
            ma = ma + la + (ia >>> 6 ^ ia >>> 11 ^ ia >>> 25 ^ ia << 26 ^ ia << 21 ^ ia << 7) + (ka ^ ia & (ja ^ ka)) + 3835390401 | 0;
            la = ka;
            ka = ja;
            ja = ia;
            ia = ha + ma | 0;
            ha = ga;
            ga = fa;
            fa = ea;
            ea = ma + (fa & ga ^ ha & (fa ^ ga)) + (fa >>> 2 ^ fa >>> 13 ^ fa >>> 22 ^ fa << 30 ^ fa << 19 ^ fa << 10) | 0;
            R = ma = (S >>> 7 ^ S >>> 18 ^ S >>> 3 ^ S << 25 ^ S << 14) + (da >>> 17 ^ da >>> 19 ^ da >>> 10 ^ da << 15 ^ da << 13) + R + $ | 0;
            ma = ma + la + (ia >>> 6 ^ ia >>> 11 ^ ia >>> 25 ^ ia << 26 ^ ia << 21 ^ ia << 7) + (ka ^ ia & (ja ^ ka)) + 4022224774 | 0;
            la = ka;
            ka = ja;
            ja = ia;
            ia = ha + ma | 0;
            ha = ga;
            ga = fa;
            fa = ea;
            ea = ma + (fa & ga ^ ha & (fa ^ ga)) + (fa >>> 2 ^ fa >>> 13 ^ fa >>> 22 ^ fa << 30 ^ fa << 19 ^ fa << 10) | 0;
            S = ma = (T >>> 7 ^ T >>> 18 ^ T >>> 3 ^ T << 25 ^ T << 14) + (Q >>> 17 ^ Q >>> 19 ^ Q >>> 10 ^ Q << 15 ^ Q << 13) + S + _ | 0;
            ma = ma + la + (ia >>> 6 ^ ia >>> 11 ^ ia >>> 25 ^ ia << 26 ^ ia << 21 ^ ia << 7) + (ka ^ ia & (ja ^ ka)) + 264347078 | 0;
            la = ka;
            ka = ja;
            ja = ia;
            ia = ha + ma | 0;
            ha = ga;
            ga = fa;
            fa = ea;
            ea = ma + (fa & ga ^ ha & (fa ^ ga)) + (fa >>> 2 ^ fa >>> 13 ^ fa >>> 22 ^ fa << 30 ^ fa << 19 ^ fa << 10) | 0;
            T = ma = (U >>> 7 ^ U >>> 18 ^ U >>> 3 ^ U << 25 ^ U << 14) + (R >>> 17 ^ R >>> 19 ^ R >>> 10 ^ R << 15 ^ R << 13) + T + aa | 0;
            ma = ma + la + (ia >>> 6 ^ ia >>> 11 ^ ia >>> 25 ^ ia << 26 ^ ia << 21 ^ ia << 7) + (ka ^ ia & (ja ^ ka)) + 604807628 | 0;
            la = ka;
            ka = ja;
            ja = ia;
            ia = ha + ma | 0;
            ha = ga;
            ga = fa;
            fa = ea;
            ea = ma + (fa & ga ^ ha & (fa ^ ga)) + (fa >>> 2 ^ fa >>> 13 ^ fa >>> 22 ^ fa << 30 ^ fa << 19 ^ fa << 10) | 0;
            U = ma = (V >>> 7 ^ V >>> 18 ^ V >>> 3 ^ V << 25 ^ V << 14) + (S >>> 17 ^ S >>> 19 ^ S >>> 10 ^ S << 15 ^ S << 13) + U + ba | 0;
            ma = ma + la + (ia >>> 6 ^ ia >>> 11 ^ ia >>> 25 ^ ia << 26 ^ ia << 21 ^ ia << 7) + (ka ^ ia & (ja ^ ka)) + 770255983 | 0;
            la = ka;
            ka = ja;
            ja = ia;
            ia = ha + ma | 0;
            ha = ga;
            ga = fa;
            fa = ea;
            ea = ma + (fa & ga ^ ha & (fa ^ ga)) + (fa >>> 2 ^ fa >>> 13 ^ fa >>> 22 ^ fa << 30 ^ fa << 19 ^ fa << 10) | 0;
            V = ma = (W >>> 7 ^ W >>> 18 ^ W >>> 3 ^ W << 25 ^ W << 14) + (T >>> 17 ^ T >>> 19 ^ T >>> 10 ^ T << 15 ^ T << 13) + V + ca | 0;
            ma = ma + la + (ia >>> 6 ^ ia >>> 11 ^ ia >>> 25 ^ ia << 26 ^ ia << 21 ^ ia << 7) + (ka ^ ia & (ja ^ ka)) + 1249150122 | 0;
            la = ka;
            ka = ja;
            ja = ia;
            ia = ha + ma | 0;
            ha = ga;
            ga = fa;
            fa = ea;
            ea = ma + (fa & ga ^ ha & (fa ^ ga)) + (fa >>> 2 ^ fa >>> 13 ^ fa >>> 22 ^ fa << 30 ^ fa << 19 ^ fa << 10) | 0;
            W = ma = (X >>> 7 ^ X >>> 18 ^ X >>> 3 ^ X << 25 ^ X << 14) + (U >>> 17 ^ U >>> 19 ^ U >>> 10 ^ U << 15 ^ U << 13) + W + da | 0;
            ma = ma + la + (ia >>> 6 ^ ia >>> 11 ^ ia >>> 25 ^ ia << 26 ^ ia << 21 ^ ia << 7) + (ka ^ ia & (ja ^ ka)) + 1555081692 | 0;
            la = ka;
            ka = ja;
            ja = ia;
            ia = ha + ma | 0;
            ha = ga;
            ga = fa;
            fa = ea;
            ea = ma + (fa & ga ^ ha & (fa ^ ga)) + (fa >>> 2 ^ fa >>> 13 ^ fa >>> 22 ^ fa << 30 ^ fa << 19 ^ fa << 10) | 0;
            X = ma = (Y >>> 7 ^ Y >>> 18 ^ Y >>> 3 ^ Y << 25 ^ Y << 14) + (V >>> 17 ^ V >>> 19 ^ V >>> 10 ^ V << 15 ^ V << 13) + X + Q | 0;
            ma = ma + la + (ia >>> 6 ^ ia >>> 11 ^ ia >>> 25 ^ ia << 26 ^ ia << 21 ^ ia << 7) + (ka ^ ia & (ja ^ ka)) + 1996064986 | 0;
            la = ka;
            ka = ja;
            ja = ia;
            ia = ha + ma | 0;
            ha = ga;
            ga = fa;
            fa = ea;
            ea = ma + (fa & ga ^ ha & (fa ^ ga)) + (fa >>> 2 ^ fa >>> 13 ^ fa >>> 22 ^ fa << 30 ^ fa << 19 ^ fa << 10) | 0;
            Y = ma = (Z >>> 7 ^ Z >>> 18 ^ Z >>> 3 ^ Z << 25 ^ Z << 14) + (W >>> 17 ^ W >>> 19 ^ W >>> 10 ^ W << 15 ^ W << 13) + Y + R | 0;

            ma = ma + la + (ia >>> 6 ^ ia >>> 11 ^ ia >>> 25 ^ ia << 26 ^ ia << 21 ^ ia << 7) + (ka ^ ia & (ja ^ ka)) + 2554220882 | 0;
            la = ka;
            ka = ja;
            ja = ia;
            ia = ha + ma | 0;
            ha = ga;
            ga = fa;
            fa = ea;
            ea = ma + (fa & ga ^ ha & (fa ^ ga)) + (fa >>> 2 ^ fa >>> 13 ^ fa >>> 22 ^ fa << 30 ^ fa << 19 ^ fa << 10) | 0;
            Z = ma = ($ >>> 7 ^ $ >>> 18 ^ $ >>> 3 ^ $ << 25 ^ $ << 14) + (X >>> 17 ^ X >>> 19 ^ X >>> 10 ^ X << 15 ^ X << 13) + Z + S | 0;
            ma = ma + la + (ia >>> 6 ^ ia >>> 11 ^ ia >>> 25 ^ ia << 26 ^ ia << 21 ^ ia << 7) + (ka ^ ia & (ja ^ ka)) + 2821834349 | 0;
            la = ka;
            ka = ja;
            ja = ia;
            ia = ha + ma | 0;
            ha = ga;
            ga = fa;
            fa = ea;
            ea = ma + (fa & ga ^ ha & (fa ^ ga)) + (fa >>> 2 ^ fa >>> 13 ^ fa >>> 22 ^ fa << 30 ^ fa << 19 ^ fa << 10) | 0;
            $ = ma = (_ >>> 7 ^ _ >>> 18 ^ _ >>> 3 ^ _ << 25 ^ _ << 14) + (Y >>> 17 ^ Y >>> 19 ^ Y >>> 10 ^ Y << 15 ^ Y << 13) + $ + T | 0;
            ma = ma + la + (ia >>> 6 ^ ia >>> 11 ^ ia >>> 25 ^ ia << 26 ^ ia << 21 ^ ia << 7) + (ka ^ ia & (ja ^ ka)) + 2952996808 | 0;
            la = ka;
            ka = ja;
            ja = ia;
            ia = ha + ma | 0;
            ha = ga;
            ga = fa;
            fa = ea;
            ea = ma + (fa & ga ^ ha & (fa ^ ga)) + (fa >>> 2 ^ fa >>> 13 ^ fa >>> 22 ^ fa << 30 ^ fa << 19 ^ fa << 10) | 0;
            _ = ma = (aa >>> 7 ^ aa >>> 18 ^ aa >>> 3 ^ aa << 25 ^ aa << 14) + (Z >>> 17 ^ Z >>> 19 ^ Z >>> 10 ^ Z << 15 ^ Z << 13) + _ + U | 0;
            ma = ma + la + (ia >>> 6 ^ ia >>> 11 ^ ia >>> 25 ^ ia << 26 ^ ia << 21 ^ ia << 7) + (ka ^ ia & (ja ^ ka)) + 3210313671 | 0;
            la = ka;
            ka = ja;
            ja = ia;
            ia = ha + ma | 0;
            ha = ga;
            ga = fa;
            fa = ea;
            ea = ma + (fa & ga ^ ha & (fa ^ ga)) + (fa >>> 2 ^ fa >>> 13 ^ fa >>> 22 ^ fa << 30 ^ fa << 19 ^ fa << 10) | 0;
            aa = ma = (ba >>> 7 ^ ba >>> 18 ^ ba >>> 3 ^ ba << 25 ^ ba << 14) + ($ >>> 17 ^ $ >>> 19 ^ $ >>> 10 ^ $ << 15 ^ $ << 13) + aa + V | 0;
            ma = ma + la + (ia >>> 6 ^ ia >>> 11 ^ ia >>> 25 ^ ia << 26 ^ ia << 21 ^ ia << 7) + (ka ^ ia & (ja ^ ka)) + 3336571891 | 0;
            la = ka;
            ka = ja;
            ja = ia;
            ia = ha + ma | 0;
            ha = ga;
            ga = fa;
            fa = ea;
            ea = ma + (fa & ga ^ ha & (fa ^ ga)) + (fa >>> 2 ^ fa >>> 13 ^ fa >>> 22 ^ fa << 30 ^ fa << 19 ^ fa << 10) | 0;
            ba = ma = (ca >>> 7 ^ ca >>> 18 ^ ca >>> 3 ^ ca << 25 ^ ca << 14) + (_ >>> 17 ^ _ >>> 19 ^ _ >>> 10 ^ _ << 15 ^ _ << 13) + ba + W | 0;
            ma = ma + la + (ia >>> 6 ^ ia >>> 11 ^ ia >>> 25 ^ ia << 26 ^ ia << 21 ^ ia << 7) + (ka ^ ia & (ja ^ ka)) + 3584528711 | 0;
            la = ka;
            ka = ja;
            ja = ia;
            ia = ha + ma | 0;
            ha = ga;
            ga = fa;
            fa = ea;
            ea = ma + (fa & ga ^ ha & (fa ^ ga)) + (fa >>> 2 ^ fa >>> 13 ^ fa >>> 22 ^ fa << 30 ^ fa << 19 ^ fa << 10) | 0;
            ca = ma = (da >>> 7 ^ da >>> 18 ^ da >>> 3 ^ da << 25 ^ da << 14) + (aa >>> 17 ^ aa >>> 19 ^ aa >>> 10 ^ aa << 15 ^ aa << 13) + ca + X | 0;
            ma = ma + la + (ia >>> 6 ^ ia >>> 11 ^ ia >>> 25 ^ ia << 26 ^ ia << 21 ^ ia << 7) + (ka ^ ia & (ja ^ ka)) + 113926993 | 0;
            la = ka;
            ka = ja;
            ja = ia;
            ia = ha + ma | 0;
            ha = ga;
            ga = fa;
            fa = ea;
            ea = ma + (fa & ga ^ ha & (fa ^ ga)) + (fa >>> 2 ^ fa >>> 13 ^ fa >>> 22 ^ fa << 30 ^ fa << 19 ^ fa << 10) | 0;
            da = ma = (Q >>> 7 ^ Q >>> 18 ^ Q >>> 3 ^ Q << 25 ^ Q << 14) + (ba >>> 17 ^ ba >>> 19 ^ ba >>> 10 ^ ba << 15 ^ ba << 13) + da + Y | 0;
            ma = ma + la + (ia >>> 6 ^ ia >>> 11 ^ ia >>> 25 ^ ia << 26 ^ ia << 21 ^ ia << 7) + (ka ^ ia & (ja ^ ka)) + 338241895 | 0;
            la = ka;
            ka = ja;
            ja = ia;
            ia = ha + ma | 0;
            ha = ga;
            ga = fa;
            fa = ea;
            ea = ma + (fa & ga ^ ha & (fa ^ ga)) + (fa >>> 2 ^ fa >>> 13 ^ fa >>> 22 ^ fa << 30 ^ fa << 19 ^ fa << 10) | 0;
            Q = ma = (R >>> 7 ^ R >>> 18 ^ R >>> 3 ^ R << 25 ^ R << 14) + (ca >>> 17 ^ ca >>> 19 ^ ca >>> 10 ^ ca << 15 ^ ca << 13) + Q + Z | 0;
            ma = ma + la + (ia >>> 6 ^ ia >>> 11 ^ ia >>> 25 ^ ia << 26 ^ ia << 21 ^ ia << 7) + (ka ^ ia & (ja ^ ka)) + 666307205 | 0;
            la = ka;
            ka = ja;
            ja = ia;
            ia = ha + ma | 0;
            ha = ga;
            ga = fa;
            fa = ea;
            ea = ma + (fa & ga ^ ha & (fa ^ ga)) + (fa >>> 2 ^ fa >>> 13 ^ fa >>> 22 ^ fa << 30 ^ fa << 19 ^ fa << 10) | 0;
            R = ma = (S >>> 7 ^ S >>> 18 ^ S >>> 3 ^ S << 25 ^ S << 14) + (da >>> 17 ^ da >>> 19 ^ da >>> 10 ^ da << 15 ^ da << 13) + R + $ | 0;
            ma = ma + la + (ia >>> 6 ^ ia >>> 11 ^ ia >>> 25 ^ ia << 26 ^ ia << 21 ^ ia << 7) + (ka ^ ia & (ja ^ ka)) + 773529912 | 0;
            la = ka;
            ka = ja;
            ja = ia;
            ia = ha + ma | 0;
            ha = ga;
            ga = fa;
            fa = ea;
            ea = ma + (fa & ga ^ ha & (fa ^ ga)) + (fa >>> 2 ^ fa >>> 13 ^ fa >>> 22 ^ fa << 30 ^ fa << 19 ^ fa << 10) | 0;
            S = ma = (T >>> 7 ^ T >>> 18 ^ T >>> 3 ^ T << 25 ^ T << 14) + (Q >>> 17 ^ Q >>> 19 ^ Q >>> 10 ^ Q << 15 ^ Q << 13) + S + _ | 0;
            ma = ma + la + (ia >>> 6 ^ ia >>> 11 ^ ia >>> 25 ^ ia << 26 ^ ia << 21 ^ ia << 7) + (ka ^ ia & (ja ^ ka)) + 1294757372 | 0;
            la = ka;
            ka = ja;
            ja = ia;
            ia = ha + ma | 0;
            ha = ga;
            ga = fa;
            fa = ea;
            ea = ma + (fa & ga ^ ha & (fa ^ ga)) + (fa >>> 2 ^ fa >>> 13 ^ fa >>> 22 ^ fa << 30 ^ fa << 19 ^ fa << 10) | 0;
            T = ma = (U >>> 7 ^ U >>> 18 ^ U >>> 3 ^ U << 25 ^ U << 14) + (R >>> 17 ^ R >>> 19 ^ R >>> 10 ^ R << 15 ^ R << 13) + T + aa | 0;
            ma = ma + la + (ia >>> 6 ^ ia >>> 11 ^ ia >>> 25 ^ ia << 26 ^ ia << 21 ^ ia << 7) + (ka ^ ia & (ja ^ ka)) + 1396182291 | 0;
            la = ka;
            ka = ja;
            ja = ia;
            ia = ha + ma | 0;
            ha = ga;
            ga = fa;
            fa = ea;
            ea = ma + (fa & ga ^ ha & (fa ^ ga)) + (fa >>> 2 ^ fa >>> 13 ^ fa >>> 22 ^ fa << 30 ^ fa << 19 ^ fa << 10) | 0;
            U = ma = (V >>> 7 ^ V >>> 18 ^ V >>> 3 ^ V << 25 ^ V << 14) + (S >>> 17 ^ S >>> 19 ^ S >>> 10 ^ S << 15 ^ S << 13) + U + ba | 0;
            ma = ma + la + (ia >>> 6 ^ ia >>> 11 ^ ia >>> 25 ^ ia << 26 ^ ia << 21 ^ ia << 7) + (ka ^ ia & (ja ^ ka)) + 1695183700 | 0;
            la = ka;
            ka = ja;
            ja = ia;
            ia = ha + ma | 0;
            ha = ga;
            ga = fa;
            fa = ea;
            ea = ma + (fa & ga ^ ha & (fa ^ ga)) + (fa >>> 2 ^ fa >>> 13 ^ fa >>> 22 ^ fa << 30 ^ fa << 19 ^ fa << 10) | 0;
            V = ma = (W >>> 7 ^ W >>> 18 ^ W >>> 3 ^ W << 25 ^ W << 14) + (T >>> 17 ^ T >>> 19 ^ T >>> 10 ^ T << 15 ^ T << 13) + V + ca | 0;
            ma = ma + la + (ia >>> 6 ^ ia >>> 11 ^ ia >>> 25 ^ ia << 26 ^ ia << 21 ^ ia << 7) + (ka ^ ia & (ja ^ ka)) + 1986661051 | 0;
            la = ka;
            ka = ja;
            ja = ia;
            ia = ha + ma | 0;
            ha = ga;
            ga = fa;
            fa = ea;
            ea = ma + (fa & ga ^ ha & (fa ^ ga)) + (fa >>> 2 ^ fa >>> 13 ^ fa >>> 22 ^ fa << 30 ^ fa << 19 ^ fa << 10) | 0;
            W = ma = (X >>> 7 ^ X >>> 18 ^ X >>> 3 ^ X << 25 ^ X << 14) + (U >>> 17 ^ U >>> 19 ^ U >>> 10 ^ U << 15 ^ U << 13) + W + da | 0;
            ma = ma + la + (ia >>> 6 ^ ia >>> 11 ^ ia >>> 25 ^ ia << 26 ^ ia << 21 ^ ia << 7) + (ka ^ ia & (ja ^ ka)) + 2177026350 | 0;
            la = ka;
            ka = ja;
            ja = ia;
            ia = ha + ma | 0;
            ha = ga;
            ga = fa;
            fa = ea;
            ea = ma + (fa & ga ^ ha & (fa ^ ga)) + (fa >>> 2 ^ fa >>> 13 ^ fa >>> 22 ^ fa << 30 ^ fa << 19 ^ fa << 10) | 0;
            X = ma = (Y >>> 7 ^ Y >>> 18 ^ Y >>> 3 ^ Y << 25 ^ Y << 14) + (V >>> 17 ^ V >>> 19 ^ V >>> 10 ^ V << 15 ^ V << 13) + X + Q | 0;
            ma = ma + la + (ia >>> 6 ^ ia >>> 11 ^ ia >>> 25 ^ ia << 26 ^ ia << 21 ^ ia << 7) + (ka ^ ia & (ja ^ ka)) + 2456956037 | 0;
            la = ka;
            ka = ja;
            ja = ia;
            ia = ha + ma | 0;
            ha = ga;
            ga = fa;
            fa = ea;
            ea = ma + (fa & ga ^ ha & (fa ^ ga)) + (fa >>> 2 ^ fa >>> 13 ^ fa >>> 22 ^ fa << 30 ^ fa << 19 ^ fa << 10) | 0;
            Y = ma = (Z >>> 7 ^ Z >>> 18 ^ Z >>> 3 ^ Z << 25 ^ Z << 14) + (W >>> 17 ^ W >>> 19 ^ W >>> 10 ^ W << 15 ^ W << 13) + Y + R | 0;
            ma = ma + la + (ia >>> 6 ^ ia >>> 11 ^ ia >>> 25 ^ ia << 26 ^ ia << 21 ^ ia << 7) + (ka ^ ia & (ja ^ ka)) + 2730485921 | 0;
            la = ka;
            ka = ja;
            ja = ia;
            ia = ha + ma | 0;
            ha = ga;
            ga = fa;
            fa = ea;
            ea = ma + (fa & ga ^ ha & (fa ^ ga)) + (fa >>> 2 ^ fa >>> 13 ^ fa >>> 22 ^ fa << 30 ^ fa << 19 ^ fa << 10) | 0;
            Z = ma = ($ >>> 7 ^ $ >>> 18 ^ $ >>> 3 ^ $ << 25 ^ $ << 14) + (X >>> 17 ^ X >>> 19 ^ X >>> 10 ^ X << 15 ^ X << 13) + Z + S | 0;
            ma = ma + la + (ia >>> 6 ^ ia >>> 11 ^ ia >>> 25 ^ ia << 26 ^ ia << 21 ^ ia << 7) + (ka ^ ia & (ja ^ ka)) + 2820302411 | 0;
            la = ka;
            ka = ja;
            ja = ia;
            ia = ha + ma | 0;
            ha = ga;
            ga = fa;
            fa = ea;
            ea = ma + (fa & ga ^ ha & (fa ^ ga)) + (fa >>> 2 ^ fa >>> 13 ^ fa >>> 22 ^ fa << 30 ^ fa << 19 ^ fa << 10) | 0;
            $ = ma = (_ >>> 7 ^ _ >>> 18 ^ _ >>> 3 ^ _ << 25 ^ _ << 14) + (Y >>> 17 ^ Y >>> 19 ^ Y >>> 10 ^ Y << 15 ^ Y << 13) + $ + T | 0;
            ma = ma + la + (ia >>> 6 ^ ia >>> 11 ^ ia >>> 25 ^ ia << 26 ^ ia << 21 ^ ia << 7) + (ka ^ ia & (ja ^ ka)) + 3259730800 | 0;
            la = ka;
            ka = ja;
            ja = ia;
            ia = ha + ma | 0;
            ha = ga;
            ga = fa;
            fa = ea;
            ea = ma + (fa & ga ^ ha & (fa ^ ga)) + (fa >>> 2 ^ fa >>> 13 ^ fa >>> 22 ^ fa << 30 ^ fa << 19 ^ fa << 10) | 0;
            _ = ma = (aa >>> 7 ^ aa >>> 18 ^ aa >>> 3 ^ aa << 25 ^ aa << 14) + (Z >>> 17 ^ Z >>> 19 ^ Z >>> 10 ^ Z << 15 ^ Z << 13) + _ + U | 0;
            ma = ma + la + (ia >>> 6 ^ ia >>> 11 ^ ia >>> 25 ^ ia << 26 ^ ia << 21 ^ ia << 7) + (ka ^ ia & (ja ^ ka)) + 3345764771 | 0;
            la = ka;
            ka = ja;
            ja = ia;
            ia = ha + ma | 0;
            ha = ga;
            ga = fa;
            fa = ea;
            ea = ma + (fa & ga ^ ha & (fa ^ ga)) + (fa >>> 2 ^ fa >>> 13 ^ fa >>> 22 ^ fa << 30 ^ fa << 19 ^ fa << 10) | 0;
            aa = ma = (ba >>> 7 ^ ba >>> 18 ^ ba >>> 3 ^ ba << 25 ^ ba << 14) + ($ >>> 17 ^ $ >>> 19 ^ $ >>> 10 ^ $ << 15 ^ $ << 13) + aa + V | 0;
            ma = ma + la + (ia >>> 6 ^ ia >>> 11 ^ ia >>> 25 ^ ia << 26 ^ ia << 21 ^ ia << 7) + (ka ^ ia & (ja ^ ka)) + 3516065817 | 0;
            la = ka;
            ka = ja;
            ja = ia;
            ia = ha + ma | 0;
            ha = ga;
            ga = fa;
            fa = ea;
            ea = ma + (fa & ga ^ ha & (fa ^ ga)) + (fa >>> 2 ^ fa >>> 13 ^ fa >>> 22 ^ fa << 30 ^ fa << 19 ^ fa << 10) | 0;
            ba = ma = (ca >>> 7 ^ ca >>> 18 ^ ca >>> 3 ^ ca << 25 ^ ca << 14) + (_ >>> 17 ^ _ >>> 19 ^ _ >>> 10 ^ _ << 15 ^ _ << 13) + ba + W | 0;
            ma = ma + la + (ia >>> 6 ^ ia >>> 11 ^ ia >>> 25 ^ ia << 26 ^ ia << 21 ^ ia << 7) + (ka ^ ia & (ja ^ ka)) + 3600352804 | 0;
            la = ka;
            ka = ja;
            ja = ia;
            ia = ha + ma | 0;
            ha = ga;
            ga = fa;
            fa = ea;
            ea = ma + (fa & ga ^ ha & (fa ^ ga)) + (fa >>> 2 ^ fa >>> 13 ^ fa >>> 22 ^ fa << 30 ^ fa << 19 ^ fa << 10) | 0;
            ca = ma = (da >>> 7 ^ da >>> 18 ^ da >>> 3 ^ da << 25 ^ da << 14) + (aa >>> 17 ^ aa >>> 19 ^ aa >>> 10 ^ aa << 15 ^ aa << 13) + ca + X | 0;
            ma = ma + la + (ia >>> 6 ^ ia >>> 11 ^ ia >>> 25 ^ ia << 26 ^ ia << 21 ^ ia << 7) + (ka ^ ia & (ja ^ ka)) + 4094571909 | 0;
            la = ka;
            ka = ja;
            ja = ia;
            ia = ha + ma | 0;
            ha = ga;
            ga = fa;
            fa = ea;
            ea = ma + (fa & ga ^ ha & (fa ^ ga)) + (fa >>> 2 ^ fa >>> 13 ^ fa >>> 22 ^ fa << 30 ^ fa << 19 ^ fa << 10) | 0;
            da = ma = (Q >>> 7 ^ Q >>> 18 ^ Q >>> 3 ^ Q << 25 ^ Q << 14) + (ba >>> 17 ^ ba >>> 19 ^ ba >>> 10 ^ ba << 15 ^ ba << 13) + da + Y | 0;
            ma = ma + la + (ia >>> 6 ^ ia >>> 11 ^ ia >>> 25 ^ ia << 26 ^ ia << 21 ^ ia << 7) + (ka ^ ia & (ja ^ ka)) + 275423344 | 0;
            la = ka;
            ka = ja;
            ja = ia;
            ia = ha + ma | 0;
            ha = ga;
            ga = fa;
            fa = ea;
            ea = ma + (fa & ga ^ ha & (fa ^ ga)) + (fa >>> 2 ^ fa >>> 13 ^ fa >>> 22 ^ fa << 30 ^ fa << 19 ^ fa << 10) | 0;
            Q = ma = (R >>> 7 ^ R >>> 18 ^ R >>> 3 ^ R << 25 ^ R << 14) + (ca >>> 17 ^ ca >>> 19 ^ ca >>> 10 ^ ca << 15 ^ ca << 13) + Q + Z | 0;
            ma = ma + la + (ia >>> 6 ^ ia >>> 11 ^ ia >>> 25 ^ ia << 26 ^ ia << 21 ^ ia << 7) + (ka ^ ia & (ja ^ ka)) + 430227734 | 0;
            la = ka;
            ka = ja;
            ja = ia;
            ia = ha + ma | 0;
            ha = ga;
            ga = fa;
            fa = ea;
            ea = ma + (fa & ga ^ ha & (fa ^ ga)) + (fa >>> 2 ^ fa >>> 13 ^ fa >>> 22 ^ fa << 30 ^ fa << 19 ^ fa << 10) | 0;
            R = ma = (S >>> 7 ^ S >>> 18 ^ S >>> 3 ^ S << 25 ^ S << 14) + (da >>> 17 ^ da >>> 19 ^ da >>> 10 ^ da << 15 ^ da << 13) + R + $ | 0;
            ma = ma + la + (ia >>> 6 ^ ia >>> 11 ^ ia >>> 25 ^ ia << 26 ^ ia << 21 ^ ia << 7) + (ka ^ ia & (ja ^ ka)) + 506948616 | 0;
            la = ka;
            ka = ja;
            ja = ia;
            ia = ha + ma | 0;
            ha = ga;
            ga = fa;
            fa = ea;
            ea = ma + (fa & ga ^ ha & (fa ^ ga)) + (fa >>> 2 ^ fa >>> 13 ^ fa >>> 22 ^ fa << 30 ^ fa << 19 ^ fa << 10) | 0;
            S = ma = (T >>> 7 ^ T >>> 18 ^ T >>> 3 ^ T << 25 ^ T << 14) + (Q >>> 17 ^ Q >>> 19 ^ Q >>> 10 ^ Q << 15 ^ Q << 13) + S + _ | 0;
            ma = ma + la + (ia >>> 6 ^ ia >>> 11 ^ ia >>> 25 ^ ia << 26 ^ ia << 21 ^ ia << 7) + (ka ^ ia & (ja ^ ka)) + 659060556 | 0;
            la = ka;
            ka = ja;
            ja = ia;
            ia = ha + ma | 0;
            ha = ga;
            ga = fa;
            fa = ea;
            ea = ma + (fa & ga ^ ha & (fa ^ ga)) + (fa >>> 2 ^ fa >>> 13 ^ fa >>> 22 ^ fa << 30 ^ fa << 19 ^ fa << 10) | 0;
            T = ma = (U >>> 7 ^ U >>> 18 ^ U >>> 3 ^ U << 25 ^ U << 14) + (R >>> 17 ^ R >>> 19 ^ R >>> 10 ^ R << 15 ^ R << 13) + T + aa | 0;
            ma = ma + la + (ia >>> 6 ^ ia >>> 11 ^ ia >>> 25 ^ ia << 26 ^ ia << 21 ^ ia << 7) + (ka ^ ia & (ja ^ ka)) + 883997877 | 0;
            la = ka;
            ka = ja;
            ja = ia;
            ia = ha + ma | 0;
            ha = ga;
            ga = fa;
            fa = ea;
            ea = ma + (fa & ga ^ ha & (fa ^ ga)) + (fa >>> 2 ^ fa >>> 13 ^ fa >>> 22 ^ fa << 30 ^ fa << 19 ^ fa << 10) | 0;
            U = ma = (V >>> 7 ^ V >>> 18 ^ V >>> 3 ^ V << 25 ^ V << 14) + (S >>> 17 ^ S >>> 19 ^ S >>> 10 ^ S << 15 ^ S << 13) + U + ba | 0;
            ma = ma + la + (ia >>> 6 ^ ia >>> 11 ^ ia >>> 25 ^ ia << 26 ^ ia << 21 ^ ia << 7) + (ka ^ ia & (ja ^ ka)) + 958139571 | 0;
            la = ka;
            ka = ja;
            ja = ia;
            ia = ha + ma | 0;
            ha = ga;
            ga = fa;
            fa = ea;
            ea = ma + (fa & ga ^ ha & (fa ^ ga)) + (fa >>> 2 ^ fa >>> 13 ^ fa >>> 22 ^ fa << 30 ^ fa << 19 ^ fa << 10) | 0;
            V = ma = (W >>> 7 ^ W >>> 18 ^ W >>> 3 ^ W << 25 ^ W << 14) + (T >>> 17 ^ T >>> 19 ^ T >>> 10 ^ T << 15 ^ T << 13) + V + ca | 0;
            ma = ma + la + (ia >>> 6 ^ ia >>> 11 ^ ia >>> 25 ^ ia << 26 ^ ia << 21 ^ ia << 7) + (ka ^ ia & (ja ^ ka)) + 1322822218 | 0;
            la = ka;
            ka = ja;
            ja = ia;
            ia = ha + ma | 0;
            ha = ga;
            ga = fa;
            fa = ea;
            ea = ma + (fa & ga ^ ha & (fa ^ ga)) + (fa >>> 2 ^ fa >>> 13 ^ fa >>> 22 ^ fa << 30 ^ fa << 19 ^ fa << 10) | 0;
            W = ma = (X >>> 7 ^ X >>> 18 ^ X >>> 3 ^ X << 25 ^ X << 14) + (U >>> 17 ^ U >>> 19 ^ U >>> 10 ^ U << 15 ^ U << 13) + W + da | 0;
            ma = ma + la + (ia >>> 6 ^ ia >>> 11 ^ ia >>> 25 ^ ia << 26 ^ ia << 21 ^ ia << 7) + (ka ^ ia & (ja ^ ka)) + 1537002063 | 0;
            la = ka;
            ka = ja;
            ja = ia;
            ia = ha + ma | 0;
            ha = ga;
            ga = fa;
            fa = ea;
            ea = ma + (fa & ga ^ ha & (fa ^ ga)) + (fa >>> 2 ^ fa >>> 13 ^ fa >>> 22 ^ fa << 30 ^ fa << 19 ^ fa << 10) | 0;
            X = ma = (Y >>> 7 ^ Y >>> 18 ^ Y >>> 3 ^ Y << 25 ^ Y << 14) + (V >>> 17 ^ V >>> 19 ^ V >>> 10 ^ V << 15 ^ V << 13) + X + Q | 0;
            ma = ma + la + (ia >>> 6 ^ ia >>> 11 ^ ia >>> 25 ^ ia << 26 ^ ia << 21 ^ ia << 7) + (ka ^ ia & (ja ^ ka)) + 1747873779 | 0;
            la = ka;
            ka = ja;
            ja = ia;
            ia = ha + ma | 0;
            ha = ga;
            ga = fa;
            fa = ea;
            ea = ma + (fa & ga ^ ha & (fa ^ ga)) + (fa >>> 2 ^ fa >>> 13 ^ fa >>> 22 ^ fa << 30 ^ fa << 19 ^ fa << 10) | 0;
            Y = ma = (Z >>> 7 ^ Z >>> 18 ^ Z >>> 3 ^ Z << 25 ^ Z << 14) + (W >>> 17 ^ W >>> 19 ^ W >>> 10 ^ W << 15 ^ W << 13) + Y + R | 0;
            ma = ma + la + (ia >>> 6 ^ ia >>> 11 ^ ia >>> 25 ^ ia << 26 ^ ia << 21 ^ ia << 7) + (ka ^ ia & (ja ^ ka)) + 1955562222 | 0;
            la = ka;
            ka = ja;
            ja = ia;
            ia = ha + ma | 0;
            ha = ga;
            ga = fa;
            fa = ea;
            ea = ma + (fa & ga ^ ha & (fa ^ ga)) + (fa >>> 2 ^ fa >>> 13 ^ fa >>> 22 ^ fa << 30 ^ fa << 19 ^ fa << 10) | 0;
            Z = ma = ($ >>> 7 ^ $ >>> 18 ^ $ >>> 3 ^ $ << 25 ^ $ << 14) + (X >>> 17 ^ X >>> 19 ^ X >>> 10 ^ X << 15 ^ X << 13) + Z + S | 0;
            ma = ma + la + (ia >>> 6 ^ ia >>> 11 ^ ia >>> 25 ^ ia << 26 ^ ia << 21 ^ ia << 7) + (ka ^ ia & (ja ^ ka)) + 2024104815 | 0;
            la = ka;
            ka = ja;
            ja = ia;
            ia = ha + ma | 0;
            ha = ga;
            ga = fa;
            fa = ea;
            ea = ma + (fa & ga ^ ha & (fa ^ ga)) + (fa >>> 2 ^ fa >>> 13 ^ fa >>> 22 ^ fa << 30 ^ fa << 19 ^ fa << 10) | 0;
            $ = ma = (_ >>> 7 ^ _ >>> 18 ^ _ >>> 3 ^ _ << 25 ^ _ << 14) + (Y >>> 17 ^ Y >>> 19 ^ Y >>> 10 ^ Y << 15 ^ Y << 13) + $ + T | 0;
            ma = ma + la + (ia >>> 6 ^ ia >>> 11 ^ ia >>> 25 ^ ia << 26 ^ ia << 21 ^ ia << 7) + (ka ^ ia & (ja ^ ka)) + 2227730452 | 0;
            la = ka;
            ka = ja;
            ja = ia;
            ia = ha + ma | 0;
            ha = ga;
            ga = fa;
            fa = ea;
            ea = ma + (fa & ga ^ ha & (fa ^ ga)) + (fa >>> 2 ^ fa >>> 13 ^ fa >>> 22 ^ fa << 30 ^ fa << 19 ^ fa << 10) | 0;
            _ = ma = (aa >>> 7 ^ aa >>> 18 ^ aa >>> 3 ^ aa << 25 ^ aa << 14) + (Z >>> 17 ^ Z >>> 19 ^ Z >>> 10 ^ Z << 15 ^ Z << 13) + _ + U | 0;
            ma = ma + la + (ia >>> 6 ^ ia >>> 11 ^ ia >>> 25 ^ ia << 26 ^ ia << 21 ^ ia << 7) + (ka ^ ia & (ja ^ ka)) + 2361852424 | 0;
            la = ka;
            ka = ja;
            ja = ia;
            ia = ha + ma | 0;
            ha = ga;
            ga = fa;
            fa = ea;
            ea = ma + (fa & ga ^ ha & (fa ^ ga)) + (fa >>> 2 ^ fa >>> 13 ^ fa >>> 22 ^ fa << 30 ^ fa << 19 ^ fa << 10) | 0;
            aa = ma = (ba >>> 7 ^ ba >>> 18 ^ ba >>> 3 ^ ba << 25 ^ ba << 14) + ($ >>> 17 ^ $ >>> 19 ^ $ >>> 10 ^ $ << 15 ^ $ << 13) + aa + V | 0;
            ma = ma + la + (ia >>> 6 ^ ia >>> 11 ^ ia >>> 25 ^ ia << 26 ^ ia << 21 ^ ia << 7) + (ka ^ ia & (ja ^ ka)) + 2428436474 | 0;
            la = ka;
            ka = ja;
            ja = ia;
            ia = ha + ma | 0;
            ha = ga;
            ga = fa;
            fa = ea;
            ea = ma + (fa & ga ^ ha & (fa ^ ga)) + (fa >>> 2 ^ fa >>> 13 ^ fa >>> 22 ^ fa << 30 ^ fa << 19 ^ fa << 10) | 0;
            ba = ma = (ca >>> 7 ^ ca >>> 18 ^ ca >>> 3 ^ ca << 25 ^ ca << 14) + (_ >>> 17 ^ _ >>> 19 ^ _ >>> 10 ^ _ << 15 ^ _ << 13) + ba + W | 0;
            ma = ma + la + (ia >>> 6 ^ ia >>> 11 ^ ia >>> 25 ^ ia << 26 ^ ia << 21 ^ ia << 7) + (ka ^ ia & (ja ^ ka)) + 2756734187 | 0;
            la = ka;
            ka = ja;
            ja = ia;
            ia = ha + ma | 0;
            ha = ga;
            ga = fa;
            fa = ea;
            ea = ma + (fa & ga ^ ha & (fa ^ ga)) + (fa >>> 2 ^ fa >>> 13 ^ fa >>> 22 ^ fa << 30 ^ fa << 19 ^ fa << 10) | 0;
            ca = ma = (da >>> 7 ^ da >>> 18 ^ da >>> 3 ^ da << 25 ^ da << 14) + (aa >>> 17 ^ aa >>> 19 ^ aa >>> 10 ^ aa << 15 ^ aa << 13) + ca + X | 0;
            ma = ma + la + (ia >>> 6 ^ ia >>> 11 ^ ia >>> 25 ^ ia << 26 ^ ia << 21 ^ ia << 7) + (ka ^ ia & (ja ^ ka)) + 3204031479 | 0;
            la = ka;
            ka = ja;
            ja = ia;
            ia = ha + ma | 0;
            ha = ga;
            ga = fa;
            fa = ea;
            ea = ma + (fa & ga ^ ha & (fa ^ ga)) + (fa >>> 2 ^ fa >>> 13 ^ fa >>> 22 ^ fa << 30 ^ fa << 19 ^ fa << 10) | 0;
            da = ma = (Q >>> 7 ^ Q >>> 18 ^ Q >>> 3 ^ Q << 25 ^ Q << 14) + (ba >>> 17 ^ ba >>> 19 ^ ba >>> 10 ^ ba << 15 ^ ba << 13) + da + Y | 0;
            ma = ma + la + (ia >>> 6 ^ ia >>> 11 ^ ia >>> 25 ^ ia << 26 ^ ia << 21 ^ ia << 7) + (ka ^ ia & (ja ^ ka)) + 3329325298 | 0;
            la = ka;
            ka = ja;
            ja = ia;
            ia = ha + ma | 0;
            ha = ga;
            ga = fa;
            fa = ea;
            ea = ma + (fa & ga ^ ha & (fa ^ ga)) + (fa >>> 2 ^ fa >>> 13 ^ fa >>> 22 ^ fa << 30 ^ fa << 19 ^ fa << 10) | 0;
            d = d + ea | 0;
            e = e + fa | 0;
            f = f + ga | 0;
            g = g + ha | 0;
            h = h + ia | 0;
            i = i + ja | 0;
            j = j + ka | 0;
            k = k + la | 0
        }

        function F(Q) {
            Q = Q | 0;
            E(D[Q | 0] << 24 | D[Q | 1] << 16 | D[Q | 2] << 8 | D[Q | 3], D[Q | 4] << 24 | D[Q | 5] << 16 | D[Q | 6] << 8 | D[Q | 7], D[Q | 8] << 24 | D[Q | 9] << 16 | D[Q | 10] << 8 | D[Q | 11], D[Q | 12] << 24 | D[Q | 13] << 16 | D[Q | 14] << 8 | D[Q | 15], D[Q | 16] << 24 | D[Q | 17] << 16 | D[Q | 18] << 8 | D[Q | 19], D[Q | 20] << 24 | D[Q | 21] << 16 | D[Q | 22] << 8 | D[Q | 23], D[Q | 24] << 24 | D[Q | 25] << 16 | D[Q | 26] << 8 | D[Q | 27], D[Q | 28] << 24 | D[Q | 29] << 16 | D[Q | 30] << 8 | D[Q | 31], D[Q | 32] << 24 | D[Q | 33] << 16 | D[Q | 34] << 8 | D[Q | 35], D[Q | 36] << 24 | D[Q | 37] << 16 | D[Q | 38] << 8 | D[Q | 39], D[Q | 40] << 24 | D[Q | 41] << 16 | D[Q | 42] << 8 | D[Q | 43], D[Q | 44] << 24 | D[Q | 45] << 16 | D[Q | 46] << 8 | D[Q | 47], D[Q | 48] << 24 | D[Q | 49] << 16 | D[Q | 50] << 8 | D[Q | 51], D[Q | 52] << 24 | D[Q | 53] << 16 | D[Q | 54] << 8 | D[Q | 55], D[Q | 56] << 24 | D[Q | 57] << 16 | D[Q | 58] << 8 | D[Q | 59], D[Q | 60] << 24 | D[Q | 61] << 16 | D[Q | 62] << 8 | D[Q | 63])
        }

        function G(Q) {
            Q = Q | 0;
            D[Q | 0] = d >>> 24;
            D[Q | 1] = d >>> 16 & 255;
            D[Q | 2] = d >>> 8 & 255;
            D[Q | 3] = d & 255;
            D[Q | 4] = e >>> 24;
            D[Q | 5] = e >>> 16 & 255;
            D[Q | 6] = e >>> 8 & 255;
            D[Q | 7] = e & 255;
            D[Q | 8] = f >>> 24;
            D[Q | 9] = f >>> 16 & 255;
            D[Q | 10] = f >>> 8 & 255;
            D[Q | 11] = f & 255;
            D[Q | 12] = g >>> 24;
            D[Q | 13] = g >>> 16 & 255;
            D[Q | 14] = g >>> 8 & 255;
            D[Q | 15] = g & 255;
            D[Q | 16] = h >>> 24;
            D[Q | 17] = h >>> 16 & 255;
            D[Q | 18] = h >>> 8 & 255;
            D[Q | 19] = h & 255;
            D[Q | 20] = i >>> 24;
            D[Q | 21] = i >>> 16 & 255;
            D[Q | 22] = i >>> 8 & 255;
            D[Q | 23] = i & 255;
            D[Q | 24] = j >>> 24;
            D[Q | 25] = j >>> 16 & 255;
            D[Q | 26] = j >>> 8 & 255;
            D[Q | 27] = j & 255;
            D[Q | 28] = k >>> 24;
            D[Q | 29] = k >>> 16 & 255;
            D[Q | 30] = k >>> 8 & 255;
            D[Q | 31] = k & 255
        }

        function H() {
            d = 1779033703;
            e = 3144134277;
            f = 1013904242;
            g = 2773480762;
            h = 1359893119;
            i = 2600822924;
            j = 528734635;
            k = 1541459225;
            l = m = 0
        }

        function I(Q, R, S, T, U, V, W, X, Y, Z) {
            Q = Q | 0;
            R = R | 0;
            S = S | 0;
            T = T | 0;
            U = U | 0;
            V = V | 0;
            W = W | 0;
            X = X | 0;
            Y = Y | 0;
            Z = Z | 0;
            d = Q;
            e = R;
            f = S;
            g = T;
            h = U;
            i = V;
            j = W;
            k = X;
            l = Y;
            m = Z
        }

        function J(Q, R) {
            Q = Q | 0;
            R = R | 0;
            var S = 0;
            if (Q & 63)return -1;
            while ((R | 0) >= 64) {
                F(Q);
                Q = Q + 64 | 0;
                R = R - 64 | 0;
                S = S + 64 | 0
            }
            l = l + S | 0;
            if (l >>> 0 < S >>> 0)m = m + 1 | 0;
            return S | 0
        }

        function K(Q, R, S) {
            Q = Q | 0;
            R = R | 0;
            S = S | 0;
            var T = 0, U = 0;
            if (Q & 63)return -1;
            if (~S)if (S & 31)return -1;
            if ((R | 0) >= 64) {
                T = J(Q, R) | 0;
                if ((T | 0) == -1)return -1;
                Q = Q + T | 0;
                R = R - T | 0
            }
            T = T + R | 0;
            l = l + R | 0;
            if (l >>> 0 < R >>> 0)m = m + 1 | 0;
            D[Q | R] = 128;
            if ((R | 0) >= 56) {
                for (U = R + 1 | 0; (U | 0) < 64; U = U + 1 | 0)D[Q | U] = 0;
                F(Q);
                R = 0;
                D[Q | 0] = 0
            }
            for (U = R + 1 | 0; (U | 0) < 59; U = U + 1 | 0)D[Q | U] = 0;
            D[Q | 56] = m >>> 21 & 255;
            D[Q | 57] = m >>> 13 & 255;
            D[Q | 58] = m >>> 5 & 255;
            D[Q | 59] = m << 3 & 255 | l >>> 29;
            D[Q | 60] = l >>> 21 & 255;
            D[Q | 61] = l >>> 13 & 255;
            D[Q | 62] = l >>> 5 & 255;
            D[Q | 63] = l << 3 & 255;
            F(Q);
            if (~S)G(S);
            return T | 0
        }

        function L() {
            d = n;
            e = o;
            f = p;
            g = q;
            h = r;
            i = s;
            j = t;
            k = u;
            l = 64;
            m = 0
        }

        function M() {
            d = v;
            e = w;
            f = x;
            g = y;
            h = z;
            i = A;
            j = B;
            k = C;
            l = 64;
            m = 0
        }

        function N(Q, R, S, T, U, V, W, X, Y, Z, $, _, aa, ba, ca, da) {
            Q = Q | 0;
            R = R | 0;
            S = S | 0;
            T = T | 0;
            U = U | 0;
            V = V | 0;
            W = W | 0;
            X = X | 0;
            Y = Y | 0;
            Z = Z | 0;
            $ = $ | 0;
            _ = _ | 0;
            aa = aa | 0;
            ba = ba | 0;
            ca = ca | 0;
            da = da | 0;
            H();
            E(Q ^ 1549556828, R ^ 1549556828, S ^ 1549556828, T ^ 1549556828, U ^ 1549556828, V ^ 1549556828, W ^ 1549556828, X ^ 1549556828, Y ^ 1549556828, Z ^ 1549556828, $ ^ 1549556828, _ ^ 1549556828, aa ^ 1549556828, ba ^ 1549556828, ca ^ 1549556828, da ^ 1549556828);
            v = d;
            w = e;
            x = f;
            y = g;
            z = h;
            A = i;
            B = j;
            C = k;
            H();
            E(Q ^ 909522486, R ^ 909522486, S ^ 909522486, T ^ 909522486, U ^ 909522486, V ^ 909522486, W ^ 909522486, X ^ 909522486, Y ^ 909522486, Z ^ 909522486, $ ^ 909522486, _ ^ 909522486, aa ^ 909522486, ba ^ 909522486, ca ^ 909522486, da ^ 909522486);
            n = d;
            o = e;
            p = f;
            q = g;
            r = h;
            s = i;
            t = j;
            u = k;
            l = 64;
            m = 0
        }

        function O(Q, R, S) {
            Q = Q | 0;
            R = R | 0;
            S = S | 0;
            var T = 0, U = 0, V = 0, W = 0, X = 0, Y = 0, Z = 0, $ = 0, _ = 0;
            if (Q & 63)return -1;
            if (~S)if (S & 31)return -1;
            _ = K(Q, R, -1) | 0;
            T = d, U = e, V = f, W = g, X = h, Y = i, Z = j, $ = k;
            M();
            E(T, U, V, W, X, Y, Z, $, 2147483648, 0, 0, 0, 0, 0, 0, 768);
            if (~S)G(S);
            return _ | 0
        }

        function P(Q, R, S, T, U) {
            Q = Q | 0;
            R = R | 0;
            S = S | 0;
            T = T | 0;
            U = U | 0;
            var V = 0, W = 0, X = 0, Y = 0, Z = 0, $ = 0, _ = 0, aa = 0, ba = 0, ca = 0, da = 0, ea = 0, fa = 0, ga = 0, ha = 0, ia = 0;
            if (Q & 63)return -1;
            if (~U)if (U & 31)return -1;
            D[Q + R | 0] = S >>> 24;
            D[Q + R + 1 | 0] = S >>> 16 & 255;
            D[Q + R + 2 | 0] = S >>> 8 & 255;
            D[Q + R + 3 | 0] = S & 255;
            O(Q, R + 4 | 0, -1) | 0;
            V = ba = d, W = ca = e, X = da = f, Y = ea = g, Z = fa = h, $ = ga = i, _ = ha = j, aa = ia = k;
            T = T - 1 | 0;
            while ((T | 0) > 0) {
                L();
                E(ba, ca, da, ea, fa, ga, ha, ia, 2147483648, 0, 0, 0, 0, 0, 0, 768);
                ba = d, ca = e, da = f, ea = g, fa = h, ga = i, ha = j, ia = k;
                M();
                E(ba, ca, da, ea, fa, ga, ha, ia, 2147483648, 0, 0, 0, 0, 0, 0, 768);
                ba = d, ca = e, da = f, ea = g, fa = h, ga = i, ha = j, ia = k;
                V = V ^ d;
                W = W ^ e;
                X = X ^ f;
                Y = Y ^ g;
                Z = Z ^ h;
                $ = $ ^ i;
                _ = _ ^ j;
                aa = aa ^ k;
                T = T - 1 | 0
            }
            d = V;
            e = W;
            f = X;
            g = Y;
            h = Z;
            i = $;
            j = _;
            k = aa;
            if (~U)G(U);
            return 0
        }

        return {
            reset: H,
            init: I,
            process: J,
            finish: K,
            hmac_reset: L,
            hmac_init: N,
            hmac_finish: O,
            pbkdf2_generate_block: P
        }
    }

    function ga(a) {
        a = a || {}, this.heap = r(Uint8Array, a), this.asm = a.asm || fa(b, null, this.heap.buffer), this.BLOCK_SIZE = lc, this.HASH_SIZE = mc, this.reset()
    }

    function ha() {
        return null === oc && (oc = new ga({heapSize: 1048576})), oc
    }

    function ia(a) {
        if (void 0 === a)throw new SyntaxError("data required");
        return ha().reset().process(a).finish().result
    }

    function ja(a) {
        var b = ia(a);
        return j(b)
    }

    function ka(a) {
        var b = ia(a);
        return k(b)
    }

    function la(a) {
        if (a = a || {}, !a.hash)throw new SyntaxError("option 'hash' is required");
        if (!a.hash.HASH_SIZE)throw new SyntaxError("option 'hash' supplied doesn't seem to be a valid hash function");
        return this.hash = a.hash, this.BLOCK_SIZE = this.hash.BLOCK_SIZE, this.HMAC_SIZE = this.hash.HASH_SIZE, this.key = null, this.verify = null, this.result = null, (void 0 !== a.password || void 0 !== a.verify) && this.reset(a), this
    }

    function ma(a, b) {
        if (o(b) && (b = new Uint8Array(b)), n(b) && (b = f(b)), !p(b))throw new TypeError("password isn't of expected type");
        var c = new Uint8Array(a.BLOCK_SIZE);
        return c.set(b.length > a.BLOCK_SIZE ? a.reset().process(b).finish().result : b), c
    }

    function na(a) {
        if (o(a) || p(a))a = new Uint8Array(a); else {
            if (!n(a))throw new TypeError("verify tag isn't of expected type");
            a = f(a)
        }
        if (a.length !== this.HMAC_SIZE)throw new d("illegal verification tag size");
        this.verify = a
    }

    function oa(a) {
        a = a || {};
        var b = a.password;
        if (null === this.key && !n(b) && !b)throw new c("no key is associated with the instance");
        this.result = null, this.hash.reset(), (b || n(b)) && (this.key = ma(this.hash, b));
        for (var d = new Uint8Array(this.key), e = 0; e < d.length; ++e)d[e] ^= 54;
        this.hash.process(d);
        var f = a.verify;
        return void 0 !== f ? na.call(this, f) : this.verify = null, this
    }

    function pa(a) {
        if (null === this.key)throw new c("no key is associated with the instance");
        if (null !== this.result)throw new c("state must be reset before processing new data");
        return this.hash.process(a), this
    }

    function qa() {
        if (null === this.key)throw new c("no key is associated with the instance");
        if (null !== this.result)throw new c("state must be reset before processing new data");
        for (var a = this.hash.finish().result, b = new Uint8Array(this.key), d = 0; d < b.length; ++d)b[d] ^= 92;
        var e = this.verify, f = this.hash.reset().process(b).process(a).finish().result;
        if (e)if (e.length === f.length) {
            for (var g = 0, d = 0; d < e.length; d++)g |= e[d] ^ f[d];
            this.result = !g
        } else this.result = !1; else this.result = f;
        return this
    }

    function ra(a) {
        return a = a || {}, a.hash instanceof aa || (a.hash = ba()), la.call(this, a), this
    }

    function sa(a) {
        a = a || {}, this.result = null, this.hash.reset();
        var b = a.password;
        if (void 0 !== b) {
            n(b) && (b = f(b));
            var c = this.key = ma(this.hash, b);
            this.hash.reset().asm.hmac_init(c[0] << 24 | c[1] << 16 | c[2] << 8 | c[3], c[4] << 24 | c[5] << 16 | c[6] << 8 | c[7], c[8] << 24 | c[9] << 16 | c[10] << 8 | c[11], c[12] << 24 | c[13] << 16 | c[14] << 8 | c[15], c[16] << 24 | c[17] << 16 | c[18] << 8 | c[19], c[20] << 24 | c[21] << 16 | c[22] << 8 | c[23], c[24] << 24 | c[25] << 16 | c[26] << 8 | c[27], c[28] << 24 | c[29] << 16 | c[30] << 8 | c[31], c[32] << 24 | c[33] << 16 | c[34] << 8 | c[35], c[36] << 24 | c[37] << 16 | c[38] << 8 | c[39], c[40] << 24 | c[41] << 16 | c[42] << 8 | c[43], c[44] << 24 | c[45] << 16 | c[46] << 8 | c[47], c[48] << 24 | c[49] << 16 | c[50] << 8 | c[51], c[52] << 24 | c[53] << 16 | c[54] << 8 | c[55], c[56] << 24 | c[57] << 16 | c[58] << 8 | c[59], c[60] << 24 | c[61] << 16 | c[62] << 8 | c[63])
        } else this.hash.asm.hmac_reset();
        var d = a.verify;
        return void 0 !== d ? na.call(this, d) : this.verify = null, this
    }

    function ta() {
        if (null === this.key)throw new c("no key is associated with the instance");
        if (null !== this.result)throw new c("state must be reset before processing new data");
        var a = this.hash, b = this.hash.asm, d = this.hash.heap;
        b.hmac_finish(a.pos, a.len, 0);
        var e = this.verify, f = new Uint8Array(ic);
        if (f.set(d.subarray(0, ic)), e)if (e.length === f.length) {
            for (var g = 0, h = 0; h < e.length; h++)g |= e[h] ^ f[h];
            this.result = !g
        } else this.result = !1; else this.result = f;
        return this
    }

    function ua() {
        return null === rc && (rc = new ra), rc
    }

    function va(a) {
        return a = a || {}, a.hash instanceof ga || (a.hash = ha()), la.call(this, a), this
    }

    function wa(a) {
        a = a || {}, this.result = null, this.hash.reset();
        var b = a.password;
        if (void 0 !== b) {
            n(b) && (b = f(b));
            var c = this.key = ma(this.hash, b);
            this.hash.reset().asm.hmac_init(c[0] << 24 | c[1] << 16 | c[2] << 8 | c[3], c[4] << 24 | c[5] << 16 | c[6] << 8 | c[7], c[8] << 24 | c[9] << 16 | c[10] << 8 | c[11], c[12] << 24 | c[13] << 16 | c[14] << 8 | c[15], c[16] << 24 | c[17] << 16 | c[18] << 8 | c[19], c[20] << 24 | c[21] << 16 | c[22] << 8 | c[23], c[24] << 24 | c[25] << 16 | c[26] << 8 | c[27], c[28] << 24 | c[29] << 16 | c[30] << 8 | c[31], c[32] << 24 | c[33] << 16 | c[34] << 8 | c[35], c[36] << 24 | c[37] << 16 | c[38] << 8 | c[39], c[40] << 24 | c[41] << 16 | c[42] << 8 | c[43], c[44] << 24 | c[45] << 16 | c[46] << 8 | c[47], c[48] << 24 | c[49] << 16 | c[50] << 8 | c[51], c[52] << 24 | c[53] << 16 | c[54] << 8 | c[55], c[56] << 24 | c[57] << 16 | c[58] << 8 | c[59], c[60] << 24 | c[61] << 16 | c[62] << 8 | c[63])
        } else this.hash.asm.hmac_reset();
        var d = a.verify;
        return void 0 !== d ? na.call(this, d) : this.verify = null, this
    }

    function xa() {
        if (null === this.key)throw new c("no key is associated with the instance");
        if (null !== this.result)throw new c("state must be reset before processing new data");
        var a = this.hash, b = this.hash.asm, d = this.hash.heap;
        b.hmac_finish(a.pos, a.len, 0);
        var e = this.verify, f = new Uint8Array(mc);
        if (f.set(d.subarray(0, mc)), e)if (e.length === f.length) {
            for (var g = 0, h = 0; h < e.length; h++)g |= e[h] ^ f[h];
            this.result = !g
        } else this.result = !1; else this.result = f;
        return this
    }

    function ya() {
        return null === tc && (tc = new va), tc
    }

    function za(a, b) {
        if (void 0 === a)throw new SyntaxError("data required");
        if (void 0 === b)throw new SyntaxError("password required");
        return ua().reset({password: b}).process(a).finish().result
    }

    function Aa(a, b) {
        var c = za(a, b);
        return j(c)
    }

    function Ba(a, b) {
        var c = za(a, b);
        return k(c)
    }

    function Ca(a, b) {
        if (void 0 === a)throw new SyntaxError("data required");
        if (void 0 === b)throw new SyntaxError("password required");
        return ya().reset({password: b}).process(a).finish().result
    }

    function Da(a, b) {
        var c = Ca(a, b);
        return j(c)
    }

    function Ea(a, b) {
        var c = Ca(a, b);
        return k(c)
    }

    function Fa(a) {
        if (a = a || {}, !a.hmac)throw new SyntaxError("option 'hmac' is required");
        if (!a.hmac.HMAC_SIZE)throw new SyntaxError("option 'hmac' supplied doesn't seem to be a valid HMAC function");
        this.hmac = a.hmac, this.count = a.count || 4096, this.length = a.length || this.hmac.HMAC_SIZE, this.result = null;
        var b = a.password;
        return (b || n(b)) && this.reset(a), this
    }

    function Ga(a) {
        return this.result = null, this.hmac.reset(a), this
    }

    function Ha(a, b, e) {
        if (null !== this.result)throw new c("state must be reset before processing new data");
        if (!a && !n(a))throw new d("bad 'salt' value");
        b = b || this.count, e = e || this.length, this.result = new Uint8Array(e);
        for (var f = Math.ceil(e / this.hmac.HMAC_SIZE), g = 1; f >= g; ++g) {
            var h = (g - 1) * this.hmac.HMAC_SIZE, i = (f > g ? 0 : e % this.hmac.HMAC_SIZE) || this.hmac.HMAC_SIZE, j = new Uint8Array(this.hmac.reset().process(a).process(new Uint8Array([g >>> 24 & 255, g >>> 16 & 255, g >>> 8 & 255, 255 & g])).finish().result);
            this.result.set(j.subarray(0, i), h);
            for (var k = 1; b > k; ++k) {
                j = new Uint8Array(this.hmac.reset().process(j).finish().result);
                for (var l = 0; i > l; ++l)this.result[h + l] ^= j[l]
            }
        }
        return this
    }

    function Ia(a) {
        return a = a || {}, a.hmac instanceof ra || (a.hmac = ua()), Fa.call(this, a), this
    }

    function Ja(a, b, e) {
        if (null !== this.result)throw new c("state must be reset before processing new data");
        if (!a && !n(a))throw new d("bad 'salt' value");
        b = b || this.count, e = e || this.length, this.result = new Uint8Array(e);
        for (var f = Math.ceil(e / this.hmac.HMAC_SIZE), g = 1; f >= g; ++g) {
            var h = (g - 1) * this.hmac.HMAC_SIZE, i = (f > g ? 0 : e % this.hmac.HMAC_SIZE) || this.hmac.HMAC_SIZE;
            this.hmac.reset().process(a), this.hmac.hash.asm.pbkdf2_generate_block(this.hmac.hash.pos, this.hmac.hash.len, g, b, 0), this.result.set(this.hmac.hash.heap.subarray(0, i), h)
        }
        return this
    }

    function Ka() {
        return null === wc && (wc = new Ia), wc
    }

    function La(a) {
        return a = a || {}, a.hmac instanceof va || (a.hmac = ya()), Fa.call(this, a), this
    }

    function Ma(a, b, e) {
        if (null !== this.result)throw new c("state must be reset before processing new data");
        if (!a && !n(a))throw new d("bad 'salt' value");
        b = b || this.count, e = e || this.length, this.result = new Uint8Array(e);
        for (var f = Math.ceil(e / this.hmac.HMAC_SIZE), g = 1; f >= g; ++g) {
            var h = (g - 1) * this.hmac.HMAC_SIZE, i = (f > g ? 0 : e % this.hmac.HMAC_SIZE) || this.hmac.HMAC_SIZE;
            this.hmac.reset().process(a), this.hmac.hash.asm.pbkdf2_generate_block(this.hmac.hash.pos, this.hmac.hash.len, g, b, 0), this.result.set(this.hmac.hash.heap.subarray(0, i), h)
        }
        return this
    }

    function Na() {
        return null === yc && (yc = new La), yc
    }

    function Oa(a, b, c, d) {
        if (void 0 === a)throw new SyntaxError("password required");
        if (void 0 === b)throw new SyntaxError("salt required");
        return Ka().reset({password: a}).generate(b, c, d).result
    }

    function Pa(a, b, c, d) {
        var e = Oa(a, b, c, d);
        return j(e)
    }

    function Qa(a, b, c, d) {
        var e = Oa(a, b, c, d);
        return k(e)
    }

    function Ra(a, b, c, d) {
        if (void 0 === a)throw new SyntaxError("password required");
        if (void 0 === b)throw new SyntaxError("salt required");
        return Na().reset({password: a}).generate(b, c, d).result
    }

    function Sa(a, b, c, d) {
        var e = Ra(a, b, c, d);
        return j(e)
    }

    function Ta(a, b, c, d) {
        var e = Ra(a, b, c, d);
        return k(e)
    }

    function Ua() {
        if (void 0 !== Ec)d = new Uint8Array(32), zc.call(Ec, d), Hc(d); else {
            var a, c, d = new Ub(3);
            d[0] = Cc(), d[1] = Bc(), d[2] = Fc(), d = new Uint8Array(d.buffer);
            var e = Na();
            for (a = 0; 100 > a; a++)d = e.reset({password: d}).generate(b.location.href, 1e3, 32).result, c = Fc(), d[0] ^= c >>> 24, d[1] ^= c >>> 16, d[2] ^= c >>> 8, d[3] ^= c;
            Hc(d)
        }
        Ic = 0, Jc = !0
    }

    function Va(a) {
        if (!o(a) && !q(a))throw new TypeError("bad seed type");
        var b = a.byteOffest || 0, c = a.byteLength || a.length, d = new Uint8Array(a.buffer || a, b, c);
        Hc(d), Ic = 0;
        for (var e = 0, f = 0; f < d.length; f++)e |= d[f], d[f] = 0;
        return 0 !== e && (Lc += 4 * c), Kc = Lc >= Mc
    }

    function Wa(a) {
        if (Jc || Ua(), !Kc && void 0 === Ec) {
            if (!Nc)throw new e("No strong PRNGs available. Use asmCrypto.random.seed().");
            void 0 !== Vb && Vb.error("No strong PRNGs available; your security is greatly lowered. Use asmCrypto.random.seed().")
        }
        if (!Oc && !Kc && void 0 !== Ec && void 0 !== Vb) {
            var b = (new Error).stack;
            Pc[b] |= 0, Pc[b]++ || Vb.warn("asmCrypto PRNG not seeded; your security relies on your system PRNG. If this is not acceptable, use asmCrypto.random.seed().")
        }
        if (!o(a) && !q(a))throw new TypeError("unexpected buffer type");
        var c, d, f = a.byteOffset || 0, g = a.byteLength || a.length, h = new Uint8Array(a.buffer || a, f, g);
        for (void 0 !== Ec && zc.call(Ec, h), c = 0; g > c; c++)0 === (3 & c) && (Ic >= 1099511627776 && Ua(), d = Gc(), Ic++), h[c] ^= d, d >>>= 8;
        return a
    }

    function Xa() {
        (!Jc || Ic >= 1099511627776) && Ua();
        var a = (1048576 * Gc() + (Gc() >>> 12)) / 4503599627370496;
        return Ic += 2, a
    }

    function Ya(a, b) {
        return a * b | 0
    }

    function Za(a, b, c) {
        "use asm";
        var d = 0;
        var e = new a.Uint32Array(c);
        var f = a.Math.imul;

        function g(u) {
            u = u | 0;
            d = u = u + 31 & -32;
            return u | 0
        }

        function h(u) {
            u = u | 0;
            var v = 0;
            v = d;
            d = v + (u + 31 & -32) | 0;
            return v | 0
        }

        function i(u) {
            u = u | 0;
            d = d - (u + 31 & -32) | 0
        }

        function j(u, v, w) {
            u = u | 0;
            v = v | 0;
            w = w | 0;
            var x = 0;
            if ((v | 0) > (w | 0)) {
                for (; (x | 0) < (u | 0); x = x + 4 | 0) {
                    e[w + x >> 2] = e[v + x >> 2]
                }
            } else {
                for (x = u - 4 | 0; (x | 0) >= 0; x = x - 4 | 0) {
                    e[w + x >> 2] = e[v + x >> 2]
                }
            }
        }

        function k(u, v, w) {
            u = u | 0;
            v = v | 0;
            w = w | 0;
            var x = 0;
            for (; (x | 0) < (u | 0); x = x + 4 | 0) {
                e[w + x >> 2] = v
            }
        }

        function l(u, v, w, x) {
            u = u | 0;
            v = v | 0;
            w = w | 0;
            x = x | 0;
            var y = 0, z = 0, A = 0, B = 0, C = 0;
            if ((x | 0) <= 0)x = v;
            if ((x | 0) < (v | 0))v = x;
            z = 1;
            for (; (C | 0) < (v | 0); C = C + 4 | 0) {
                y = ~e[u + C >> 2];
                A = (y & 65535) + z | 0;
                B = (y >>> 16) + (A >>> 16) | 0;
                e[w + C >> 2] = B << 16 | A & 65535;
                z = B >>> 16
            }
            for (; (C | 0) < (x | 0); C = C + 4 | 0) {
                e[w + C >> 2] = z - 1 | 0
            }
            return z | 0
        }

        function m(u, v, w, x) {
            u = u | 0;
            v = v | 0;
            w = w | 0;
            x = x | 0;
            var y = 0, z = 0, A = 0;
            if ((v | 0) > (x | 0)) {
                for (A = v - 4 | 0; (A | 0) >= (x | 0); A = A - 4 | 0) {
                    if (e[u + A >> 2] | 0)return 1
                }
            } else {
                for (A = x - 4 | 0; (A | 0) >= (v | 0); A = A - 4 | 0) {
                    if (e[w + A >> 2] | 0)return -1
                }
            }
            for (; (A | 0) >= 0; A = A - 4 | 0) {
                y = e[u + A >> 2] | 0, z = e[w + A >> 2] | 0;
                if (y >>> 0 < z >>> 0)return -1;
                if (y >>> 0 > z >>> 0)return 1
            }
            return 0
        }

        function n(u, v) {
            u = u | 0;
            v = v | 0;
            var w = 0;
            for (w = v - 4 | 0; (w | 0) >= 0; w = w - 4 | 0) {
                if (e[u + w >> 2] | 0)return w + 4 | 0
            }
            return 0
        }

        function o(u, v, w, x, y, z) {
            u = u | 0;
            v = v | 0;
            w = w | 0;
            x = x | 0;
            y = y | 0;
            z = z | 0;
            var A = 0, B = 0, C = 0, D = 0, E = 0, F = 0;
            if ((v | 0) < (x | 0)) {
                D = u, u = w, w = D;
                D = v, v = x, x = D
            }
            if ((z | 0) <= 0)z = v + 4 | 0;
            if ((z | 0) < (x | 0))v = x = z;
            for (; (F | 0) < (x | 0); F = F + 4 | 0) {
                A = e[u + F >> 2] | 0;
                B = e[w + F >> 2] | 0;
                D = ((A & 65535) + (B & 65535) | 0) + C | 0;
                E = ((A >>> 16) + (B >>> 16) | 0) + (D >>> 16) | 0;
                e[y + F >> 2] = D & 65535 | E << 16;
                C = E >>> 16
            }
            for (; (F | 0) < (v | 0); F = F + 4 | 0) {
                A = e[u + F >> 2] | 0;
                D = (A & 65535) + C | 0;
                E = (A >>> 16) + (D >>> 16) | 0;
                e[y + F >> 2] = D & 65535 | E << 16;
                C = E >>> 16
            }
            for (; (F | 0) < (z | 0); F = F + 4 | 0) {
                e[y + F >> 2] = C | 0;
                C = 0
            }
            return C | 0
        }

        function p(u, v, w, x, y, z) {
            u = u | 0;
            v = v | 0;
            w = w | 0;
            x = x | 0;
            y = y | 0;
            z = z | 0;
            var A = 0, B = 0, C = 0, D = 0, E = 0, F = 0;
            if ((z | 0) <= 0)z = (v | 0) > (x | 0) ? v + 4 | 0 : x + 4 | 0;
            if ((z | 0) < (v | 0))v = z;
            if ((z | 0) < (x | 0))x = z;
            if ((v | 0) < (x | 0)) {
                for (; (F | 0) < (v | 0); F = F + 4 | 0) {
                    A = e[u + F >> 2] | 0;
                    B = e[w + F >> 2] | 0;
                    D = ((A & 65535) - (B & 65535) | 0) + C | 0;
                    E = ((A >>> 16) - (B >>> 16) | 0) + (D >> 16) | 0;
                    e[y + F >> 2] = D & 65535 | E << 16;
                    C = E >> 16
                }
                for (; (F | 0) < (x | 0); F = F + 4 | 0) {
                    B = e[w + F >> 2] | 0;
                    D = C - (B & 65535) | 0;
                    E = (D >> 16) - (B >>> 16) | 0;
                    e[y + F >> 2] = D & 65535 | E << 16;
                    C = E >> 16
                }
            } else {
                for (; (F | 0) < (x | 0); F = F + 4 | 0) {
                    A = e[u + F >> 2] | 0;
                    B = e[w + F >> 2] | 0;
                    D = ((A & 65535) - (B & 65535) | 0) + C | 0;
                    E = ((A >>> 16) - (B >>> 16) | 0) + (D >> 16) | 0;
                    e[y + F >> 2] = D & 65535 | E << 16;
                    C = E >> 16
                }
                for (; (F | 0) < (v | 0); F = F + 4 | 0) {
                    A = e[u + F >> 2] | 0;
                    D = (A & 65535) + C | 0;
                    E = (A >>> 16) + (D >> 16) | 0;
                    e[y + F >> 2] = D & 65535 | E << 16;
                    C = E >> 16
                }
            }
            for (; (F | 0) < (z | 0); F = F + 4 | 0) {
                e[y + F >> 2] = C | 0
            }
            return C | 0
        }

        function q(u, v, w, x, y, z) {
            u = u | 0;
            v = v | 0;
            w = w | 0;
            x = x | 0;
            y = y | 0;
            z = z | 0;
            var A = 0, B = 0, C = 0, D = 0, E = 0, F = 0, G = 0, H = 0, I = 0, J = 0, K = 0, L = 0, M = 0, N = 0, O = 0, P = 0, Q = 0, R = 0, S = 0, T = 0, U = 0, V = 0, W = 0, X = 0, Y = 0, Z = 0, $ = 0, _ = 0, aa = 0, ba = 0, ca = 0, da = 0, ea = 0, fa = 0, ga = 0, ha = 0, ia = 0, ja = 0, ka = 0, la = 0, ma = 0, na = 0, oa = 0, pa = 0, qa = 0, ra = 0, sa = 0, ta = 0, ua = 0, va = 0, wa = 0, xa = 0, ya = 0, za = 0, Aa = 0, Ba = 0, Ca = 0;
            if ((v | 0) > (x | 0)) {
                ua = u, va = v;
                u = w, v = x;
                w = ua, x = va
            }
            xa = v + x | 0;
            if ((z | 0) > (xa | 0) | (z | 0) <= 0)z = xa;
            if ((z | 0) < (v | 0))v = z;
            if ((z | 0) < (x | 0))x = z;
            for (; (ya | 0) < (v | 0); ya = ya + 32 | 0) {
                za = u + ya | 0;
                I = e[(za | 0) >> 2] | 0, J = e[(za | 4) >> 2] | 0, K = e[(za | 8) >> 2] | 0, L = e[(za | 12) >> 2] | 0, M = e[(za | 16) >> 2] | 0, N = e[(za | 20) >> 2] | 0, O = e[(za | 24) >> 2] | 0, P = e[(za | 28) >> 2] | 0, A = I & 65535, B = J & 65535, C = K & 65535, D = L & 65535, E = M & 65535, F = N & 65535, G = O & 65535, H = P & 65535, I = I >>> 16, J = J >>> 16, K = K >>> 16, L = L >>> 16, M = M >>> 16, N = N >>> 16, O = O >>> 16, P = P >>> 16;
                ma = na = oa = pa = qa = ra = sa = ta = 0;
                for (Aa = 0; (Aa | 0) < (x | 0); Aa = Aa + 32 | 0) {
                    Ba = w + Aa | 0;
                    Ca = y + (ya + Aa | 0) | 0;
                    Y = e[(Ba | 0) >> 2] | 0, Z = e[(Ba | 4) >> 2] | 0, $ = e[(Ba | 8) >> 2] | 0, _ = e[(Ba | 12) >> 2] | 0, aa = e[(Ba | 16) >> 2] | 0, ba = e[(Ba | 20) >> 2] | 0, ca = e[(Ba | 24) >> 2] | 0, da = e[(Ba | 28) >> 2] | 0, Q = Y & 65535, R = Z & 65535, S = $ & 65535, T = _ & 65535, U = aa & 65535, V = ba & 65535, W = ca & 65535, X = da & 65535, Y = Y >>> 16, Z = Z >>> 16, $ = $ >>> 16, _ = _ >>> 16, aa = aa >>> 16, ba = ba >>> 16, ca = ca >>> 16, da = da >>> 16;
                    ea = e[(Ca | 0) >> 2] | 0, fa = e[(Ca | 4) >> 2] | 0, ga = e[(Ca | 8) >> 2] | 0, ha = e[(Ca | 12) >> 2] | 0, ia = e[(Ca | 16) >> 2] | 0, ja = e[(Ca | 20) >> 2] | 0, ka = e[(Ca | 24) >> 2] | 0, la = e[(Ca | 28) >> 2] | 0;
                    ua = ((f(A, Q) | 0) + (ma & 65535) | 0) + (ea & 65535) | 0;
                    va = ((f(I, Q) | 0) + (ma >>> 16) | 0) + (ea >>> 16) | 0;
                    wa = ((f(A, Y) | 0) + (va & 65535) | 0) + (ua >>> 16) | 0;
                    xa = ((f(I, Y) | 0) + (va >>> 16) | 0) + (wa >>> 16) | 0;
                    ea = wa << 16 | ua & 65535;
                    ua = ((f(A, R) | 0) + (xa & 65535) | 0) + (fa & 65535) | 0;
                    va = ((f(I, R) | 0) + (xa >>> 16) | 0) + (fa >>> 16) | 0;
                    wa = ((f(A, Z) | 0) + (va & 65535) | 0) + (ua >>> 16) | 0;
                    xa = ((f(I, Z) | 0) + (va >>> 16) | 0) + (wa >>> 16) | 0;
                    fa = wa << 16 | ua & 65535;
                    ua = ((f(A, S) | 0) + (xa & 65535) | 0) + (ga & 65535) | 0;
                    va = ((f(I, S) | 0) + (xa >>> 16) | 0) + (ga >>> 16) | 0;
                    wa = ((f(A, $) | 0) + (va & 65535) | 0) + (ua >>> 16) | 0;
                    xa = ((f(I, $) | 0) + (va >>> 16) | 0) + (wa >>> 16) | 0;
                    ga = wa << 16 | ua & 65535;
                    ua = ((f(A, T) | 0) + (xa & 65535) | 0) + (ha & 65535) | 0;
                    va = ((f(I, T) | 0) + (xa >>> 16) | 0) + (ha >>> 16) | 0;
                    wa = ((f(A, _) | 0) + (va & 65535) | 0) + (ua >>> 16) | 0;
                    xa = ((f(I, _) | 0) + (va >>> 16) | 0) + (wa >>> 16) | 0;
                    ha = wa << 16 | ua & 65535;
                    ua = ((f(A, U) | 0) + (xa & 65535) | 0) + (ia & 65535) | 0;
                    va = ((f(I, U) | 0) + (xa >>> 16) | 0) + (ia >>> 16) | 0;
                    wa = ((f(A, aa) | 0) + (va & 65535) | 0) + (ua >>> 16) | 0;
                    xa = ((f(I, aa) | 0) + (va >>> 16) | 0) + (wa >>> 16) | 0;
                    ia = wa << 16 | ua & 65535;
                    ua = ((f(A, V) | 0) + (xa & 65535) | 0) + (ja & 65535) | 0;
                    va = ((f(I, V) | 0) + (xa >>> 16) | 0) + (ja >>> 16) | 0;
                    wa = ((f(A, ba) | 0) + (va & 65535) | 0) + (ua >>> 16) | 0;
                    xa = ((f(I, ba) | 0) + (va >>> 16) | 0) + (wa >>> 16) | 0;
                    ja = wa << 16 | ua & 65535;
                    ua = ((f(A, W) | 0) + (xa & 65535) | 0) + (ka & 65535) | 0;
                    va = ((f(I, W) | 0) + (xa >>> 16) | 0) + (ka >>> 16) | 0;
                    wa = ((f(A, ca) | 0) + (va & 65535) | 0) + (ua >>> 16) | 0;
                    xa = ((f(I, ca) | 0) + (va >>> 16) | 0) + (wa >>> 16) | 0;
                    ka = wa << 16 | ua & 65535;
                    ua = ((f(A, X) | 0) + (xa & 65535) | 0) + (la & 65535) | 0;
                    va = ((f(I, X) | 0) + (xa >>> 16) | 0) + (la >>> 16) | 0;
                    wa = ((f(A, da) | 0) + (va & 65535) | 0) + (ua >>> 16) | 0;
                    xa = ((f(I, da) | 0) + (va >>> 16) | 0) + (wa >>> 16) | 0;
                    la = wa << 16 | ua & 65535;
                    ma = xa;
                    ua = ((f(B, Q) | 0) + (na & 65535) | 0) + (fa & 65535) | 0;
                    va = ((f(J, Q) | 0) + (na >>> 16) | 0) + (fa >>> 16) | 0;
                    wa = ((f(B, Y) | 0) + (va & 65535) | 0) + (ua >>> 16) | 0;
                    xa = ((f(J, Y) | 0) + (va >>> 16) | 0) + (wa >>> 16) | 0;
                    fa = wa << 16 | ua & 65535;
                    ua = ((f(B, R) | 0) + (xa & 65535) | 0) + (ga & 65535) | 0;
                    va = ((f(J, R) | 0) + (xa >>> 16) | 0) + (ga >>> 16) | 0;
                    wa = ((f(B, Z) | 0) + (va & 65535) | 0) + (ua >>> 16) | 0;
                    xa = ((f(J, Z) | 0) + (va >>> 16) | 0) + (wa >>> 16) | 0;
                    ga = wa << 16 | ua & 65535;
                    ua = ((f(B, S) | 0) + (xa & 65535) | 0) + (ha & 65535) | 0;
                    va = ((f(J, S) | 0) + (xa >>> 16) | 0) + (ha >>> 16) | 0;
                    wa = ((f(B, $) | 0) + (va & 65535) | 0) + (ua >>> 16) | 0;
                    xa = ((f(J, $) | 0) + (va >>> 16) | 0) + (wa >>> 16) | 0;
                    ha = wa << 16 | ua & 65535;
                    ua = ((f(B, T) | 0) + (xa & 65535) | 0) + (ia & 65535) | 0;
                    va = ((f(J, T) | 0) + (xa >>> 16) | 0) + (ia >>> 16) | 0;
                    wa = ((f(B, _) | 0) + (va & 65535) | 0) + (ua >>> 16) | 0;
                    xa = ((f(J, _) | 0) + (va >>> 16) | 0) + (wa >>> 16) | 0;
                    ia = wa << 16 | ua & 65535;
                    ua = ((f(B, U) | 0) + (xa & 65535) | 0) + (ja & 65535) | 0;
                    va = ((f(J, U) | 0) + (xa >>> 16) | 0) + (ja >>> 16) | 0;
                    wa = ((f(B, aa) | 0) + (va & 65535) | 0) + (ua >>> 16) | 0;
                    xa = ((f(J, aa) | 0) + (va >>> 16) | 0) + (wa >>> 16) | 0;
                    ja = wa << 16 | ua & 65535;
                    ua = ((f(B, V) | 0) + (xa & 65535) | 0) + (ka & 65535) | 0;
                    va = ((f(J, V) | 0) + (xa >>> 16) | 0) + (ka >>> 16) | 0;
                    wa = ((f(B, ba) | 0) + (va & 65535) | 0) + (ua >>> 16) | 0;
                    xa = ((f(J, ba) | 0) + (va >>> 16) | 0) + (wa >>> 16) | 0;
                    ka = wa << 16 | ua & 65535;
                    ua = ((f(B, W) | 0) + (xa & 65535) | 0) + (la & 65535) | 0;
                    va = ((f(J, W) | 0) + (xa >>> 16) | 0) + (la >>> 16) | 0;
                    wa = ((f(B, ca) | 0) + (va & 65535) | 0) + (ua >>> 16) | 0;
                    xa = ((f(J, ca) | 0) + (va >>> 16) | 0) + (wa >>> 16) | 0;
                    la = wa << 16 | ua & 65535;
                    ua = ((f(B, X) | 0) + (xa & 65535) | 0) + (ma & 65535) | 0;
                    va = ((f(J, X) | 0) + (xa >>> 16) | 0) + (ma >>> 16) | 0;
                    wa = ((f(B, da) | 0) + (va & 65535) | 0) + (ua >>> 16) | 0;
                    xa = ((f(J, da) | 0) + (va >>> 16) | 0) + (wa >>> 16) | 0;
                    ma = wa << 16 | ua & 65535;
                    na = xa;
                    ua = ((f(C, Q) | 0) + (oa & 65535) | 0) + (ga & 65535) | 0;

                    va = ((f(K, Q) | 0) + (oa >>> 16) | 0) + (ga >>> 16) | 0;
                    wa = ((f(C, Y) | 0) + (va & 65535) | 0) + (ua >>> 16) | 0;
                    xa = ((f(K, Y) | 0) + (va >>> 16) | 0) + (wa >>> 16) | 0;
                    ga = wa << 16 | ua & 65535;
                    ua = ((f(C, R) | 0) + (xa & 65535) | 0) + (ha & 65535) | 0;
                    va = ((f(K, R) | 0) + (xa >>> 16) | 0) + (ha >>> 16) | 0;
                    wa = ((f(C, Z) | 0) + (va & 65535) | 0) + (ua >>> 16) | 0;
                    xa = ((f(K, Z) | 0) + (va >>> 16) | 0) + (wa >>> 16) | 0;
                    ha = wa << 16 | ua & 65535;
                    ua = ((f(C, S) | 0) + (xa & 65535) | 0) + (ia & 65535) | 0;
                    va = ((f(K, S) | 0) + (xa >>> 16) | 0) + (ia >>> 16) | 0;
                    wa = ((f(C, $) | 0) + (va & 65535) | 0) + (ua >>> 16) | 0;
                    xa = ((f(K, $) | 0) + (va >>> 16) | 0) + (wa >>> 16) | 0;
                    ia = wa << 16 | ua & 65535;
                    ua = ((f(C, T) | 0) + (xa & 65535) | 0) + (ja & 65535) | 0;
                    va = ((f(K, T) | 0) + (xa >>> 16) | 0) + (ja >>> 16) | 0;
                    wa = ((f(C, _) | 0) + (va & 65535) | 0) + (ua >>> 16) | 0;
                    xa = ((f(K, _) | 0) + (va >>> 16) | 0) + (wa >>> 16) | 0;
                    ja = wa << 16 | ua & 65535;
                    ua = ((f(C, U) | 0) + (xa & 65535) | 0) + (ka & 65535) | 0;
                    va = ((f(K, U) | 0) + (xa >>> 16) | 0) + (ka >>> 16) | 0;
                    wa = ((f(C, aa) | 0) + (va & 65535) | 0) + (ua >>> 16) | 0;
                    xa = ((f(K, aa) | 0) + (va >>> 16) | 0) + (wa >>> 16) | 0;
                    ka = wa << 16 | ua & 65535;
                    ua = ((f(C, V) | 0) + (xa & 65535) | 0) + (la & 65535) | 0;
                    va = ((f(K, V) | 0) + (xa >>> 16) | 0) + (la >>> 16) | 0;
                    wa = ((f(C, ba) | 0) + (va & 65535) | 0) + (ua >>> 16) | 0;
                    xa = ((f(K, ba) | 0) + (va >>> 16) | 0) + (wa >>> 16) | 0;
                    la = wa << 16 | ua & 65535;
                    ua = ((f(C, W) | 0) + (xa & 65535) | 0) + (ma & 65535) | 0;
                    va = ((f(K, W) | 0) + (xa >>> 16) | 0) + (ma >>> 16) | 0;
                    wa = ((f(C, ca) | 0) + (va & 65535) | 0) + (ua >>> 16) | 0;
                    xa = ((f(K, ca) | 0) + (va >>> 16) | 0) + (wa >>> 16) | 0;
                    ma = wa << 16 | ua & 65535;
                    ua = ((f(C, X) | 0) + (xa & 65535) | 0) + (na & 65535) | 0;
                    va = ((f(K, X) | 0) + (xa >>> 16) | 0) + (na >>> 16) | 0;
                    wa = ((f(C, da) | 0) + (va & 65535) | 0) + (ua >>> 16) | 0;
                    xa = ((f(K, da) | 0) + (va >>> 16) | 0) + (wa >>> 16) | 0;
                    na = wa << 16 | ua & 65535;
                    oa = xa;
                    ua = ((f(D, Q) | 0) + (pa & 65535) | 0) + (ha & 65535) | 0;
                    va = ((f(L, Q) | 0) + (pa >>> 16) | 0) + (ha >>> 16) | 0;
                    wa = ((f(D, Y) | 0) + (va & 65535) | 0) + (ua >>> 16) | 0;
                    xa = ((f(L, Y) | 0) + (va >>> 16) | 0) + (wa >>> 16) | 0;
                    ha = wa << 16 | ua & 65535;
                    ua = ((f(D, R) | 0) + (xa & 65535) | 0) + (ia & 65535) | 0;
                    va = ((f(L, R) | 0) + (xa >>> 16) | 0) + (ia >>> 16) | 0;
                    wa = ((f(D, Z) | 0) + (va & 65535) | 0) + (ua >>> 16) | 0;
                    xa = ((f(L, Z) | 0) + (va >>> 16) | 0) + (wa >>> 16) | 0;
                    ia = wa << 16 | ua & 65535;
                    ua = ((f(D, S) | 0) + (xa & 65535) | 0) + (ja & 65535) | 0;
                    va = ((f(L, S) | 0) + (xa >>> 16) | 0) + (ja >>> 16) | 0;
                    wa = ((f(D, $) | 0) + (va & 65535) | 0) + (ua >>> 16) | 0;
                    xa = ((f(L, $) | 0) + (va >>> 16) | 0) + (wa >>> 16) | 0;
                    ja = wa << 16 | ua & 65535;
                    ua = ((f(D, T) | 0) + (xa & 65535) | 0) + (ka & 65535) | 0;
                    va = ((f(L, T) | 0) + (xa >>> 16) | 0) + (ka >>> 16) | 0;
                    wa = ((f(D, _) | 0) + (va & 65535) | 0) + (ua >>> 16) | 0;
                    xa = ((f(L, _) | 0) + (va >>> 16) | 0) + (wa >>> 16) | 0;
                    ka = wa << 16 | ua & 65535;
                    ua = ((f(D, U) | 0) + (xa & 65535) | 0) + (la & 65535) | 0;
                    va = ((f(L, U) | 0) + (xa >>> 16) | 0) + (la >>> 16) | 0;
                    wa = ((f(D, aa) | 0) + (va & 65535) | 0) + (ua >>> 16) | 0;
                    xa = ((f(L, aa) | 0) + (va >>> 16) | 0) + (wa >>> 16) | 0;
                    la = wa << 16 | ua & 65535;
                    ua = ((f(D, V) | 0) + (xa & 65535) | 0) + (ma & 65535) | 0;
                    va = ((f(L, V) | 0) + (xa >>> 16) | 0) + (ma >>> 16) | 0;
                    wa = ((f(D, ba) | 0) + (va & 65535) | 0) + (ua >>> 16) | 0;
                    xa = ((f(L, ba) | 0) + (va >>> 16) | 0) + (wa >>> 16) | 0;
                    ma = wa << 16 | ua & 65535;
                    ua = ((f(D, W) | 0) + (xa & 65535) | 0) + (na & 65535) | 0;
                    va = ((f(L, W) | 0) + (xa >>> 16) | 0) + (na >>> 16) | 0;
                    wa = ((f(D, ca) | 0) + (va & 65535) | 0) + (ua >>> 16) | 0;
                    xa = ((f(L, ca) | 0) + (va >>> 16) | 0) + (wa >>> 16) | 0;
                    na = wa << 16 | ua & 65535;
                    ua = ((f(D, X) | 0) + (xa & 65535) | 0) + (oa & 65535) | 0;
                    va = ((f(L, X) | 0) + (xa >>> 16) | 0) + (oa >>> 16) | 0;
                    wa = ((f(D, da) | 0) + (va & 65535) | 0) + (ua >>> 16) | 0;
                    xa = ((f(L, da) | 0) + (va >>> 16) | 0) + (wa >>> 16) | 0;
                    oa = wa << 16 | ua & 65535;
                    pa = xa;
                    ua = ((f(E, Q) | 0) + (qa & 65535) | 0) + (ia & 65535) | 0;
                    va = ((f(M, Q) | 0) + (qa >>> 16) | 0) + (ia >>> 16) | 0;
                    wa = ((f(E, Y) | 0) + (va & 65535) | 0) + (ua >>> 16) | 0;
                    xa = ((f(M, Y) | 0) + (va >>> 16) | 0) + (wa >>> 16) | 0;
                    ia = wa << 16 | ua & 65535;
                    ua = ((f(E, R) | 0) + (xa & 65535) | 0) + (ja & 65535) | 0;
                    va = ((f(M, R) | 0) + (xa >>> 16) | 0) + (ja >>> 16) | 0;
                    wa = ((f(E, Z) | 0) + (va & 65535) | 0) + (ua >>> 16) | 0;
                    xa = ((f(M, Z) | 0) + (va >>> 16) | 0) + (wa >>> 16) | 0;
                    ja = wa << 16 | ua & 65535;
                    ua = ((f(E, S) | 0) + (xa & 65535) | 0) + (ka & 65535) | 0;
                    va = ((f(M, S) | 0) + (xa >>> 16) | 0) + (ka >>> 16) | 0;
                    wa = ((f(E, $) | 0) + (va & 65535) | 0) + (ua >>> 16) | 0;
                    xa = ((f(M, $) | 0) + (va >>> 16) | 0) + (wa >>> 16) | 0;
                    ka = wa << 16 | ua & 65535;
                    ua = ((f(E, T) | 0) + (xa & 65535) | 0) + (la & 65535) | 0;
                    va = ((f(M, T) | 0) + (xa >>> 16) | 0) + (la >>> 16) | 0;
                    wa = ((f(E, _) | 0) + (va & 65535) | 0) + (ua >>> 16) | 0;
                    xa = ((f(M, _) | 0) + (va >>> 16) | 0) + (wa >>> 16) | 0;
                    la = wa << 16 | ua & 65535;
                    ua = ((f(E, U) | 0) + (xa & 65535) | 0) + (ma & 65535) | 0;
                    va = ((f(M, U) | 0) + (xa >>> 16) | 0) + (ma >>> 16) | 0;
                    wa = ((f(E, aa) | 0) + (va & 65535) | 0) + (ua >>> 16) | 0;
                    xa = ((f(M, aa) | 0) + (va >>> 16) | 0) + (wa >>> 16) | 0;
                    ma = wa << 16 | ua & 65535;
                    ua = ((f(E, V) | 0) + (xa & 65535) | 0) + (na & 65535) | 0;
                    va = ((f(M, V) | 0) + (xa >>> 16) | 0) + (na >>> 16) | 0;
                    wa = ((f(E, ba) | 0) + (va & 65535) | 0) + (ua >>> 16) | 0;
                    xa = ((f(M, ba) | 0) + (va >>> 16) | 0) + (wa >>> 16) | 0;
                    na = wa << 16 | ua & 65535;
                    ua = ((f(E, W) | 0) + (xa & 65535) | 0) + (oa & 65535) | 0;
                    va = ((f(M, W) | 0) + (xa >>> 16) | 0) + (oa >>> 16) | 0;
                    wa = ((f(E, ca) | 0) + (va & 65535) | 0) + (ua >>> 16) | 0;
                    xa = ((f(M, ca) | 0) + (va >>> 16) | 0) + (wa >>> 16) | 0;
                    oa = wa << 16 | ua & 65535;
                    ua = ((f(E, X) | 0) + (xa & 65535) | 0) + (pa & 65535) | 0;
                    va = ((f(M, X) | 0) + (xa >>> 16) | 0) + (pa >>> 16) | 0;
                    wa = ((f(E, da) | 0) + (va & 65535) | 0) + (ua >>> 16) | 0;
                    xa = ((f(M, da) | 0) + (va >>> 16) | 0) + (wa >>> 16) | 0;
                    pa = wa << 16 | ua & 65535;
                    qa = xa;
                    ua = ((f(F, Q) | 0) + (ra & 65535) | 0) + (ja & 65535) | 0;
                    va = ((f(N, Q) | 0) + (ra >>> 16) | 0) + (ja >>> 16) | 0;
                    wa = ((f(F, Y) | 0) + (va & 65535) | 0) + (ua >>> 16) | 0;
                    xa = ((f(N, Y) | 0) + (va >>> 16) | 0) + (wa >>> 16) | 0;
                    ja = wa << 16 | ua & 65535;
                    ua = ((f(F, R) | 0) + (xa & 65535) | 0) + (ka & 65535) | 0;
                    va = ((f(N, R) | 0) + (xa >>> 16) | 0) + (ka >>> 16) | 0;
                    wa = ((f(F, Z) | 0) + (va & 65535) | 0) + (ua >>> 16) | 0;
                    xa = ((f(N, Z) | 0) + (va >>> 16) | 0) + (wa >>> 16) | 0;
                    ka = wa << 16 | ua & 65535;
                    ua = ((f(F, S) | 0) + (xa & 65535) | 0) + (la & 65535) | 0;
                    va = ((f(N, S) | 0) + (xa >>> 16) | 0) + (la >>> 16) | 0;
                    wa = ((f(F, $) | 0) + (va & 65535) | 0) + (ua >>> 16) | 0;
                    xa = ((f(N, $) | 0) + (va >>> 16) | 0) + (wa >>> 16) | 0;
                    la = wa << 16 | ua & 65535;
                    ua = ((f(F, T) | 0) + (xa & 65535) | 0) + (ma & 65535) | 0;
                    va = ((f(N, T) | 0) + (xa >>> 16) | 0) + (ma >>> 16) | 0;
                    wa = ((f(F, _) | 0) + (va & 65535) | 0) + (ua >>> 16) | 0;
                    xa = ((f(N, _) | 0) + (va >>> 16) | 0) + (wa >>> 16) | 0;
                    ma = wa << 16 | ua & 65535;
                    ua = ((f(F, U) | 0) + (xa & 65535) | 0) + (na & 65535) | 0;
                    va = ((f(N, U) | 0) + (xa >>> 16) | 0) + (na >>> 16) | 0;
                    wa = ((f(F, aa) | 0) + (va & 65535) | 0) + (ua >>> 16) | 0;
                    xa = ((f(N, aa) | 0) + (va >>> 16) | 0) + (wa >>> 16) | 0;
                    na = wa << 16 | ua & 65535;
                    ua = ((f(F, V) | 0) + (xa & 65535) | 0) + (oa & 65535) | 0;
                    va = ((f(N, V) | 0) + (xa >>> 16) | 0) + (oa >>> 16) | 0;
                    wa = ((f(F, ba) | 0) + (va & 65535) | 0) + (ua >>> 16) | 0;
                    xa = ((f(N, ba) | 0) + (va >>> 16) | 0) + (wa >>> 16) | 0;
                    oa = wa << 16 | ua & 65535;
                    ua = ((f(F, W) | 0) + (xa & 65535) | 0) + (pa & 65535) | 0;
                    va = ((f(N, W) | 0) + (xa >>> 16) | 0) + (pa >>> 16) | 0;
                    wa = ((f(F, ca) | 0) + (va & 65535) | 0) + (ua >>> 16) | 0;
                    xa = ((f(N, ca) | 0) + (va >>> 16) | 0) + (wa >>> 16) | 0;
                    pa = wa << 16 | ua & 65535;
                    ua = ((f(F, X) | 0) + (xa & 65535) | 0) + (qa & 65535) | 0;
                    va = ((f(N, X) | 0) + (xa >>> 16) | 0) + (qa >>> 16) | 0;
                    wa = ((f(F, da) | 0) + (va & 65535) | 0) + (ua >>> 16) | 0;
                    xa = ((f(N, da) | 0) + (va >>> 16) | 0) + (wa >>> 16) | 0;
                    qa = wa << 16 | ua & 65535;
                    ra = xa;
                    ua = ((f(G, Q) | 0) + (sa & 65535) | 0) + (ka & 65535) | 0;
                    va = ((f(O, Q) | 0) + (sa >>> 16) | 0) + (ka >>> 16) | 0;
                    wa = ((f(G, Y) | 0) + (va & 65535) | 0) + (ua >>> 16) | 0;
                    xa = ((f(O, Y) | 0) + (va >>> 16) | 0) + (wa >>> 16) | 0;
                    ka = wa << 16 | ua & 65535;
                    ua = ((f(G, R) | 0) + (xa & 65535) | 0) + (la & 65535) | 0;
                    va = ((f(O, R) | 0) + (xa >>> 16) | 0) + (la >>> 16) | 0;
                    wa = ((f(G, Z) | 0) + (va & 65535) | 0) + (ua >>> 16) | 0;
                    xa = ((f(O, Z) | 0) + (va >>> 16) | 0) + (wa >>> 16) | 0;
                    la = wa << 16 | ua & 65535;
                    ua = ((f(G, S) | 0) + (xa & 65535) | 0) + (ma & 65535) | 0;
                    va = ((f(O, S) | 0) + (xa >>> 16) | 0) + (ma >>> 16) | 0;
                    wa = ((f(G, $) | 0) + (va & 65535) | 0) + (ua >>> 16) | 0;
                    xa = ((f(O, $) | 0) + (va >>> 16) | 0) + (wa >>> 16) | 0;
                    ma = wa << 16 | ua & 65535;
                    ua = ((f(G, T) | 0) + (xa & 65535) | 0) + (na & 65535) | 0;
                    va = ((f(O, T) | 0) + (xa >>> 16) | 0) + (na >>> 16) | 0;
                    wa = ((f(G, _) | 0) + (va & 65535) | 0) + (ua >>> 16) | 0;
                    xa = ((f(O, _) | 0) + (va >>> 16) | 0) + (wa >>> 16) | 0;
                    na = wa << 16 | ua & 65535;
                    ua = ((f(G, U) | 0) + (xa & 65535) | 0) + (oa & 65535) | 0;
                    va = ((f(O, U) | 0) + (xa >>> 16) | 0) + (oa >>> 16) | 0;
                    wa = ((f(G, aa) | 0) + (va & 65535) | 0) + (ua >>> 16) | 0;
                    xa = ((f(O, aa) | 0) + (va >>> 16) | 0) + (wa >>> 16) | 0;
                    oa = wa << 16 | ua & 65535;
                    ua = ((f(G, V) | 0) + (xa & 65535) | 0) + (pa & 65535) | 0;
                    va = ((f(O, V) | 0) + (xa >>> 16) | 0) + (pa >>> 16) | 0;
                    wa = ((f(G, ba) | 0) + (va & 65535) | 0) + (ua >>> 16) | 0;
                    xa = ((f(O, ba) | 0) + (va >>> 16) | 0) + (wa >>> 16) | 0;
                    pa = wa << 16 | ua & 65535;
                    ua = ((f(G, W) | 0) + (xa & 65535) | 0) + (qa & 65535) | 0;
                    va = ((f(O, W) | 0) + (xa >>> 16) | 0) + (qa >>> 16) | 0;
                    wa = ((f(G, ca) | 0) + (va & 65535) | 0) + (ua >>> 16) | 0;
                    xa = ((f(O, ca) | 0) + (va >>> 16) | 0) + (wa >>> 16) | 0;
                    qa = wa << 16 | ua & 65535;
                    ua = ((f(G, X) | 0) + (xa & 65535) | 0) + (ra & 65535) | 0;
                    va = ((f(O, X) | 0) + (xa >>> 16) | 0) + (ra >>> 16) | 0;
                    wa = ((f(G, da) | 0) + (va & 65535) | 0) + (ua >>> 16) | 0;
                    xa = ((f(O, da) | 0) + (va >>> 16) | 0) + (wa >>> 16) | 0;
                    ra = wa << 16 | ua & 65535;
                    sa = xa;
                    ua = ((f(H, Q) | 0) + (ta & 65535) | 0) + (la & 65535) | 0;
                    va = ((f(P, Q) | 0) + (ta >>> 16) | 0) + (la >>> 16) | 0;
                    wa = ((f(H, Y) | 0) + (va & 65535) | 0) + (ua >>> 16) | 0;
                    xa = ((f(P, Y) | 0) + (va >>> 16) | 0) + (wa >>> 16) | 0;
                    la = wa << 16 | ua & 65535;
                    ua = ((f(H, R) | 0) + (xa & 65535) | 0) + (ma & 65535) | 0;
                    va = ((f(P, R) | 0) + (xa >>> 16) | 0) + (ma >>> 16) | 0;
                    wa = ((f(H, Z) | 0) + (va & 65535) | 0) + (ua >>> 16) | 0;
                    xa = ((f(P, Z) | 0) + (va >>> 16) | 0) + (wa >>> 16) | 0;
                    ma = wa << 16 | ua & 65535;
                    ua = ((f(H, S) | 0) + (xa & 65535) | 0) + (na & 65535) | 0;
                    va = ((f(P, S) | 0) + (xa >>> 16) | 0) + (na >>> 16) | 0;
                    wa = ((f(H, $) | 0) + (va & 65535) | 0) + (ua >>> 16) | 0;
                    xa = ((f(P, $) | 0) + (va >>> 16) | 0) + (wa >>> 16) | 0;
                    na = wa << 16 | ua & 65535;
                    ua = ((f(H, T) | 0) + (xa & 65535) | 0) + (oa & 65535) | 0;
                    va = ((f(P, T) | 0) + (xa >>> 16) | 0) + (oa >>> 16) | 0;
                    wa = ((f(H, _) | 0) + (va & 65535) | 0) + (ua >>> 16) | 0;
                    xa = ((f(P, _) | 0) + (va >>> 16) | 0) + (wa >>> 16) | 0;
                    oa = wa << 16 | ua & 65535;
                    ua = ((f(H, U) | 0) + (xa & 65535) | 0) + (pa & 65535) | 0;
                    va = ((f(P, U) | 0) + (xa >>> 16) | 0) + (pa >>> 16) | 0;
                    wa = ((f(H, aa) | 0) + (va & 65535) | 0) + (ua >>> 16) | 0;
                    xa = ((f(P, aa) | 0) + (va >>> 16) | 0) + (wa >>> 16) | 0;
                    pa = wa << 16 | ua & 65535;
                    ua = ((f(H, V) | 0) + (xa & 65535) | 0) + (qa & 65535) | 0;
                    va = ((f(P, V) | 0) + (xa >>> 16) | 0) + (qa >>> 16) | 0;
                    wa = ((f(H, ba) | 0) + (va & 65535) | 0) + (ua >>> 16) | 0;
                    xa = ((f(P, ba) | 0) + (va >>> 16) | 0) + (wa >>> 16) | 0;
                    qa = wa << 16 | ua & 65535;
                    ua = ((f(H, W) | 0) + (xa & 65535) | 0) + (ra & 65535) | 0;
                    va = ((f(P, W) | 0) + (xa >>> 16) | 0) + (ra >>> 16) | 0;
                    wa = ((f(H, ca) | 0) + (va & 65535) | 0) + (ua >>> 16) | 0;
                    xa = ((f(P, ca) | 0) + (va >>> 16) | 0) + (wa >>> 16) | 0;
                    ra = wa << 16 | ua & 65535;
                    ua = ((f(H, X) | 0) + (xa & 65535) | 0) + (sa & 65535) | 0;
                    va = ((f(P, X) | 0) + (xa >>> 16) | 0) + (sa >>> 16) | 0;
                    wa = ((f(H, da) | 0) + (va & 65535) | 0) + (ua >>> 16) | 0;
                    xa = ((f(P, da) | 0) + (va >>> 16) | 0) + (wa >>> 16) | 0;
                    sa = wa << 16 | ua & 65535;
                    ta = xa;
                    e[(Ca | 0) >> 2] = ea, e[(Ca | 4) >> 2] = fa, e[(Ca | 8) >> 2] = ga, e[(Ca | 12) >> 2] = ha, e[(Ca | 16) >> 2] = ia, e[(Ca | 20) >> 2] = ja, e[(Ca | 24) >> 2] = ka, e[(Ca | 28) >> 2] = la
                }
                Ca = y + (ya + Aa | 0) | 0;
                e[(Ca | 0) >> 2] = ma, e[(Ca | 4) >> 2] = na, e[(Ca | 8) >> 2] = oa, e[(Ca | 12) >> 2] = pa, e[(Ca | 16) >> 2] = qa, e[(Ca | 20) >> 2] = ra, e[(Ca | 24) >> 2] = sa, e[(Ca | 28) >> 2] = ta
            }
        }

        function r(u, v, w) {
            u = u | 0;
            v = v | 0;
            w = w | 0;
            var x = 0, y = 0, z = 0, A = 0, B = 0, C = 0, D = 0, E = 0, F = 0, G = 0, H = 0, I = 0, J = 0, K = 0, L = 0, M = 0, N = 0, O = 0, P = 0, Q = 0, R = 0, S = 0, T = 0, U = 0, V = 0, W = 0, X = 0, Y = 0, Z = 0, $ = 0, _ = 0, aa = 0, ba = 0, ca = 0, da = 0, ea = 0, fa = 0, ga = 0, ha = 0, ia = 0, ja = 0, ka = 0, la = 0, ma = 0, na = 0, oa = 0, pa = 0, qa = 0, ra = 0, sa = 0, ta = 0, ua = 0, va = 0, wa = 0, xa = 0, ya = 0, za = 0, Aa = 0, Ba = 0, Ca = 0, Da = 0, Ea = 0, Fa = 0, Ga = 0;
            for (; (Ba | 0) < (v | 0); Ba = Ba + 4 | 0) {
                Ga = w + (Ba << 1) | 0;
                F = e[u + Ba >> 2] | 0, x = F & 65535, F = F >>> 16;
                ra = f(x, x) | 0;
                sa = (f(x, F) | 0) + (ra >>> 17) | 0;
                ta = (f(F, F) | 0) + (sa >>> 15) | 0;
                e[Ga >> 2] = sa << 17 | ra & 131071;
                e[(Ga | 4) >> 2] = ta
            }
            for (Aa = 0; (Aa | 0) < (v | 0); Aa = Aa + 8 | 0) {
                Ea = u + Aa | 0, Ga = w + (Aa << 1) | 0;
                F = e[Ea >> 2] | 0, x = F & 65535, F = F >>> 16;
                V = e[(Ea | 4) >> 2] | 0, N = V & 65535, V = V >>> 16;
                ra = f(x, N) | 0;
                sa = (f(x, V) | 0) + (ra >>> 16) | 0;
                ta = (f(F, N) | 0) + (sa & 65535) | 0;
                wa = ((f(F, V) | 0) + (sa >>> 16) | 0) + (ta >>> 16) | 0;
                xa = e[(Ga | 4) >> 2] | 0;
                ra = (xa & 65535) + ((ra & 65535) << 1) | 0;
                ta = ((xa >>> 16) + ((ta & 65535) << 1) | 0) + (ra >>> 16) | 0;
                e[(Ga | 4) >> 2] = ta << 16 | ra & 65535;
                ua = ta >>> 16;
                xa = e[(Ga | 8) >> 2] | 0;
                ra = ((xa & 65535) + ((wa & 65535) << 1) | 0) + ua | 0;
                ta = ((xa >>> 16) + (wa >>> 16 << 1) | 0) + (ra >>> 16) | 0;
                e[(Ga | 8) >> 2] = ta << 16 | ra & 65535;
                ua = ta >>> 16;
                if (ua) {
                    xa = e[(Ga | 12) >> 2] | 0;
                    ra = (xa & 65535) + ua | 0;
                    ta = (xa >>> 16) + (ra >>> 16) | 0;
                    e[(Ga | 12) >> 2] = ta << 16 | ra & 65535
                }
            }
            for (Aa = 0; (Aa | 0) < (v | 0); Aa = Aa + 16 | 0) {
                Ea = u + Aa | 0, Ga = w + (Aa << 1) | 0;
                F = e[Ea >> 2] | 0, x = F & 65535, F = F >>> 16, G = e[(Ea | 4) >> 2] | 0, y = G & 65535, G = G >>> 16;
                V = e[(Ea | 8) >> 2] | 0, N = V & 65535, V = V >>> 16, W = e[(Ea | 12) >> 2] | 0, O = W & 65535, W = W >>> 16;
                ra = f(x, N) | 0;
                sa = f(F, N) | 0;
                ta = ((f(x, V) | 0) + (sa & 65535) | 0) + (ra >>> 16) | 0;
                wa = ((f(F, V) | 0) + (sa >>> 16) | 0) + (ta >>> 16) | 0;
                ba = ta << 16 | ra & 65535;
                ra = (f(x, O) | 0) + (wa & 65535) | 0;
                sa = (f(F, O) | 0) + (wa >>> 16) | 0;
                ta = ((f(x, W) | 0) + (sa & 65535) | 0) + (ra >>> 16) | 0;
                wa = ((f(F, W) | 0) + (sa >>> 16) | 0) + (ta >>> 16) | 0;
                ca = ta << 16 | ra & 65535;
                da = wa;
                ra = (f(y, N) | 0) + (ca & 65535) | 0;
                sa = (f(G, N) | 0) + (ca >>> 16) | 0;
                ta = ((f(y, V) | 0) + (sa & 65535) | 0) + (ra >>> 16) | 0;
                wa = ((f(G, V) | 0) + (sa >>> 16) | 0) + (ta >>> 16) | 0;
                ca = ta << 16 | ra & 65535;
                ra = ((f(y, O) | 0) + (da & 65535) | 0) + (wa & 65535) | 0;
                sa = ((f(G, O) | 0) + (da >>> 16) | 0) + (wa >>> 16) | 0;
                ta = ((f(y, W) | 0) + (sa & 65535) | 0) + (ra >>> 16) | 0;
                wa = ((f(G, W) | 0) + (sa >>> 16) | 0) + (ta >>> 16) | 0;
                da = ta << 16 | ra & 65535;
                ea = wa;
                xa = e[(Ga | 8) >> 2] | 0;
                ra = (xa & 65535) + ((ba & 65535) << 1) | 0;
                ta = ((xa >>> 16) + (ba >>> 16 << 1) | 0) + (ra >>> 16) | 0;
                e[(Ga | 8) >> 2] = ta << 16 | ra & 65535;
                ua = ta >>> 16;
                xa = e[(Ga | 12) >> 2] | 0;
                ra = ((xa & 65535) + ((ca & 65535) << 1) | 0) + ua | 0;
                ta = ((xa >>> 16) + (ca >>> 16 << 1) | 0) + (ra >>> 16) | 0;
                e[(Ga | 12) >> 2] = ta << 16 | ra & 65535;
                ua = ta >>> 16;
                xa = e[(Ga | 16) >> 2] | 0;
                ra = ((xa & 65535) + ((da & 65535) << 1) | 0) + ua | 0;
                ta = ((xa >>> 16) + (da >>> 16 << 1) | 0) + (ra >>> 16) | 0;
                e[(Ga | 16) >> 2] = ta << 16 | ra & 65535;
                ua = ta >>> 16;
                xa = e[(Ga | 20) >> 2] | 0;
                ra = ((xa & 65535) + ((ea & 65535) << 1) | 0) + ua | 0;
                ta = ((xa >>> 16) + (ea >>> 16 << 1) | 0) + (ra >>> 16) | 0;
                e[(Ga | 20) >> 2] = ta << 16 | ra & 65535;
                ua = ta >>> 16;
                for (Da = 24; !!ua & (Da | 0) < 32; Da = Da + 4 | 0) {
                    xa = e[(Ga | Da) >> 2] | 0;
                    ra = (xa & 65535) + ua | 0;
                    ta = (xa >>> 16) + (ra >>> 16) | 0;
                    e[(Ga | Da) >> 2] = ta << 16 | ra & 65535;
                    ua = ta >>> 16
                }
            }
            for (Aa = 0; (Aa | 0) < (v | 0); Aa = Aa + 32 | 0) {
                Ea = u + Aa | 0, Ga = w + (Aa << 1) | 0;
                F = e[Ea >> 2] | 0, x = F & 65535, F = F >>> 16, G = e[(Ea | 4) >> 2] | 0, y = G & 65535, G = G >>> 16, H = e[(Ea | 8) >> 2] | 0, z = H & 65535, H = H >>> 16, I = e[(Ea | 12) >> 2] | 0, A = I & 65535, I = I >>> 16;
                V = e[(Ea | 16) >> 2] | 0, N = V & 65535, V = V >>> 16, W = e[(Ea | 20) >> 2] | 0, O = W & 65535, W = W >>> 16, X = e[(Ea | 24) >> 2] | 0, P = X & 65535, X = X >>> 16, Y = e[(Ea | 28) >> 2] | 0, Q = Y & 65535, Y = Y >>> 16;
                ra = f(x, N) | 0;
                sa = f(F, N) | 0;
                ta = ((f(x, V) | 0) + (sa & 65535) | 0) + (ra >>> 16) | 0;
                wa = ((f(F, V) | 0) + (sa >>> 16) | 0) + (ta >>> 16) | 0;
                ba = ta << 16 | ra & 65535;
                ra = (f(x, O) | 0) + (wa & 65535) | 0;
                sa = (f(F, O) | 0) + (wa >>> 16) | 0;
                ta = ((f(x, W) | 0) + (sa & 65535) | 0) + (ra >>> 16) | 0;
                wa = ((f(F, W) | 0) + (sa >>> 16) | 0) + (ta >>> 16) | 0;
                ca = ta << 16 | ra & 65535;
                ra = (f(x, P) | 0) + (wa & 65535) | 0;
                sa = (f(F, P) | 0) + (wa >>> 16) | 0;
                ta = ((f(x, X) | 0) + (sa & 65535) | 0) + (ra >>> 16) | 0;
                wa = ((f(F, X) | 0) + (sa >>> 16) | 0) + (ta >>> 16) | 0;
                da = ta << 16 | ra & 65535;
                ra = (f(x, Q) | 0) + (wa & 65535) | 0;
                sa = (f(F, Q) | 0) + (wa >>> 16) | 0;
                ta = ((f(x, Y) | 0) + (sa & 65535) | 0) + (ra >>> 16) | 0;
                wa = ((f(F, Y) | 0) + (sa >>> 16) | 0) + (ta >>> 16) | 0;
                ea = ta << 16 | ra & 65535;
                fa = wa;
                ra = (f(y, N) | 0) + (ca & 65535) | 0;
                sa = (f(G, N) | 0) + (ca >>> 16) | 0;
                ta = ((f(y, V) | 0) + (sa & 65535) | 0) + (ra >>> 16) | 0;
                wa = ((f(G, V) | 0) + (sa >>> 16) | 0) + (ta >>> 16) | 0;
                ca = ta << 16 | ra & 65535;
                ra = ((f(y, O) | 0) + (da & 65535) | 0) + (wa & 65535) | 0;
                sa = ((f(G, O) | 0) + (da >>> 16) | 0) + (wa >>> 16) | 0;
                ta = ((f(y, W) | 0) + (sa & 65535) | 0) + (ra >>> 16) | 0;
                wa = ((f(G, W) | 0) + (sa >>> 16) | 0) + (ta >>> 16) | 0;
                da = ta << 16 | ra & 65535;
                ra = ((f(y, P) | 0) + (ea & 65535) | 0) + (wa & 65535) | 0;
                sa = ((f(G, P) | 0) + (ea >>> 16) | 0) + (wa >>> 16) | 0;
                ta = ((f(y, X) | 0) + (sa & 65535) | 0) + (ra >>> 16) | 0;
                wa = ((f(G, X) | 0) + (sa >>> 16) | 0) + (ta >>> 16) | 0;
                ea = ta << 16 | ra & 65535;
                ra = ((f(y, Q) | 0) + (fa & 65535) | 0) + (wa & 65535) | 0;
                sa = ((f(G, Q) | 0) + (fa >>> 16) | 0) + (wa >>> 16) | 0;
                ta = ((f(y, Y) | 0) + (sa & 65535) | 0) + (ra >>> 16) | 0;
                wa = ((f(G, Y) | 0) + (sa >>> 16) | 0) + (ta >>> 16) | 0;
                fa = ta << 16 | ra & 65535;
                ga = wa;
                ra = (f(z, N) | 0) + (da & 65535) | 0;
                sa = (f(H, N) | 0) + (da >>> 16) | 0;
                ta = ((f(z, V) | 0) + (sa & 65535) | 0) + (ra >>> 16) | 0;
                wa = ((f(H, V) | 0) + (sa >>> 16) | 0) + (ta >>> 16) | 0;
                da = ta << 16 | ra & 65535;
                ra = ((f(z, O) | 0) + (ea & 65535) | 0) + (wa & 65535) | 0;
                sa = ((f(H, O) | 0) + (ea >>> 16) | 0) + (wa >>> 16) | 0;
                ta = ((f(z, W) | 0) + (sa & 65535) | 0) + (ra >>> 16) | 0;
                wa = ((f(H, W) | 0) + (sa >>> 16) | 0) + (ta >>> 16) | 0;
                ea = ta << 16 | ra & 65535;
                ra = ((f(z, P) | 0) + (fa & 65535) | 0) + (wa & 65535) | 0;
                sa = ((f(H, P) | 0) + (fa >>> 16) | 0) + (wa >>> 16) | 0;
                ta = ((f(z, X) | 0) + (sa & 65535) | 0) + (ra >>> 16) | 0;
                wa = ((f(H, X) | 0) + (sa >>> 16) | 0) + (ta >>> 16) | 0;
                fa = ta << 16 | ra & 65535;
                ra = ((f(z, Q) | 0) + (ga & 65535) | 0) + (wa & 65535) | 0;
                sa = ((f(H, Q) | 0) + (ga >>> 16) | 0) + (wa >>> 16) | 0;
                ta = ((f(z, Y) | 0) + (sa & 65535) | 0) + (ra >>> 16) | 0;
                wa = ((f(H, Y) | 0) + (sa >>> 16) | 0) + (ta >>> 16) | 0;
                ga = ta << 16 | ra & 65535;
                ha = wa;
                ra = (f(A, N) | 0) + (ea & 65535) | 0;
                sa = (f(I, N) | 0) + (ea >>> 16) | 0;
                ta = ((f(A, V) | 0) + (sa & 65535) | 0) + (ra >>> 16) | 0;
                wa = ((f(I, V) | 0) + (sa >>> 16) | 0) + (ta >>> 16) | 0;
                ea = ta << 16 | ra & 65535;
                ra = ((f(A, O) | 0) + (fa & 65535) | 0) + (wa & 65535) | 0;
                sa = ((f(I, O) | 0) + (fa >>> 16) | 0) + (wa >>> 16) | 0;
                ta = ((f(A, W) | 0) + (sa & 65535) | 0) + (ra >>> 16) | 0;
                wa = ((f(I, W) | 0) + (sa >>> 16) | 0) + (ta >>> 16) | 0;
                fa = ta << 16 | ra & 65535;
                ra = ((f(A, P) | 0) + (ga & 65535) | 0) + (wa & 65535) | 0;
                sa = ((f(I, P) | 0) + (ga >>> 16) | 0) + (wa >>> 16) | 0;
                ta = ((f(A, X) | 0) + (sa & 65535) | 0) + (ra >>> 16) | 0;
                wa = ((f(I, X) | 0) + (sa >>> 16) | 0) + (ta >>> 16) | 0;
                ga = ta << 16 | ra & 65535;
                ra = ((f(A, Q) | 0) + (ha & 65535) | 0) + (wa & 65535) | 0;
                sa = ((f(I, Q) | 0) + (ha >>> 16) | 0) + (wa >>> 16) | 0;
                ta = ((f(A, Y) | 0) + (sa & 65535) | 0) + (ra >>> 16) | 0;
                wa = ((f(I, Y) | 0) + (sa >>> 16) | 0) + (ta >>> 16) | 0;
                ha = ta << 16 | ra & 65535;
                ia = wa;
                xa = e[(Ga | 16) >> 2] | 0;
                ra = (xa & 65535) + ((ba & 65535) << 1) | 0;
                ta = ((xa >>> 16) + (ba >>> 16 << 1) | 0) + (ra >>> 16) | 0;
                e[(Ga | 16) >> 2] = ta << 16 | ra & 65535;
                ua = ta >>> 16;
                xa = e[(Ga | 20) >> 2] | 0;
                ra = ((xa & 65535) + ((ca & 65535) << 1) | 0) + ua | 0;
                ta = ((xa >>> 16) + (ca >>> 16 << 1) | 0) + (ra >>> 16) | 0;
                e[(Ga | 20) >> 2] = ta << 16 | ra & 65535;
                ua = ta >>> 16;
                xa = e[(Ga | 24) >> 2] | 0;
                ra = ((xa & 65535) + ((da & 65535) << 1) | 0) + ua | 0;
                ta = ((xa >>> 16) + (da >>> 16 << 1) | 0) + (ra >>> 16) | 0;
                e[(Ga | 24) >> 2] = ta << 16 | ra & 65535;
                ua = ta >>> 16;
                xa = e[(Ga | 28) >> 2] | 0;
                ra = ((xa & 65535) + ((ea & 65535) << 1) | 0) + ua | 0;
                ta = ((xa >>> 16) + (ea >>> 16 << 1) | 0) + (ra >>> 16) | 0;
                e[(Ga | 28) >> 2] = ta << 16 | ra & 65535;
                ua = ta >>> 16;
                xa = e[Ga + 32 >> 2] | 0;
                ra = ((xa & 65535) + ((fa & 65535) << 1) | 0) + ua | 0;
                ta = ((xa >>> 16) + (fa >>> 16 << 1) | 0) + (ra >>> 16) | 0;
                e[Ga + 32 >> 2] = ta << 16 | ra & 65535;
                ua = ta >>> 16;
                xa = e[Ga + 36 >> 2] | 0;
                ra = ((xa & 65535) + ((ga & 65535) << 1) | 0) + ua | 0;
                ta = ((xa >>> 16) + (ga >>> 16 << 1) | 0) + (ra >>> 16) | 0;
                e[Ga + 36 >> 2] = ta << 16 | ra & 65535;
                ua = ta >>> 16;
                xa = e[Ga + 40 >> 2] | 0;
                ra = ((xa & 65535) + ((ha & 65535) << 1) | 0) + ua | 0;
                ta = ((xa >>> 16) + (ha >>> 16 << 1) | 0) + (ra >>> 16) | 0;
                e[Ga + 40 >> 2] = ta << 16 | ra & 65535;
                ua = ta >>> 16;
                xa = e[Ga + 44 >> 2] | 0;
                ra = ((xa & 65535) + ((ia & 65535) << 1) | 0) + ua | 0;
                ta = ((xa >>> 16) + (ia >>> 16 << 1) | 0) + (ra >>> 16) | 0;
                e[Ga + 44 >> 2] = ta << 16 | ra & 65535;
                ua = ta >>> 16;
                for (Da = 48; !!ua & (Da | 0) < 64; Da = Da + 4 | 0) {
                    xa = e[Ga + Da >> 2] | 0;
                    ra = (xa & 65535) + ua | 0;
                    ta = (xa >>> 16) + (ra >>> 16) | 0;
                    e[Ga + Da >> 2] = ta << 16 | ra & 65535;
                    ua = ta >>> 16
                }
            }
            for (ya = 32; (ya | 0) < (v | 0); ya = ya << 1) {
                za = ya << 1;
                for (Aa = 0; (Aa | 0) < (v | 0); Aa = Aa + za | 0) {
                    Ga = w + (Aa << 1) | 0;
                    va = 0;
                    for (Ba = 0; (Ba | 0) < (ya | 0); Ba = Ba + 32 | 0) {
                        Ea = (u + Aa | 0) + Ba | 0;
                        F = e[Ea >> 2] | 0, x = F & 65535, F = F >>> 16, G = e[(Ea | 4) >> 2] | 0, y = G & 65535, G = G >>> 16, H = e[(Ea | 8) >> 2] | 0, z = H & 65535, H = H >>> 16, I = e[(Ea | 12) >> 2] | 0, A = I & 65535, I = I >>> 16, J = e[(Ea | 16) >> 2] | 0, B = J & 65535, J = J >>> 16, K = e[(Ea | 20) >> 2] | 0, C = K & 65535, K = K >>> 16, L = e[(Ea | 24) >> 2] | 0, D = L & 65535, L = L >>> 16, M = e[(Ea | 28) >> 2] | 0, E = M & 65535, M = M >>> 16;
                        ja = ka = la = ma = na = oa = pa = qa = ua = 0;
                        for (Ca = 0; (Ca | 0) < (ya | 0); Ca = Ca + 32 | 0) {
                            Fa = ((u + Aa | 0) + ya | 0) + Ca | 0;
                            V = e[Fa >> 2] | 0, N = V & 65535, V = V >>> 16, W = e[(Fa | 4) >> 2] | 0, O = W & 65535, W = W >>> 16, X = e[(Fa | 8) >> 2] | 0, P = X & 65535, X = X >>> 16, Y = e[(Fa | 12) >> 2] | 0, Q = Y & 65535, Y = Y >>> 16, Z = e[(Fa | 16) >> 2] | 0, R = Z & 65535, Z = Z >>> 16, $ = e[(Fa | 20) >> 2] | 0, S = $ & 65535, $ = $ >>> 16, _ = e[(Fa | 24) >> 2] | 0, T = _ & 65535, _ = _ >>> 16, aa = e[(Fa | 28) >> 2] | 0, U = aa & 65535, aa = aa >>> 16;
                            ba = ca = da = ea = fa = ga = ha = ia = 0;
                            ra = ((f(x, N) | 0) + (ba & 65535) | 0) + (ja & 65535) | 0;
                            sa = ((f(F, N) | 0) + (ba >>> 16) | 0) + (ja >>> 16) | 0;
                            ta = ((f(x, V) | 0) + (sa & 65535) | 0) + (ra >>> 16) | 0;
                            wa = ((f(F, V) | 0) + (sa >>> 16) | 0) + (ta >>> 16) | 0;
                            ba = ta << 16 | ra & 65535;
                            ra = ((f(x, O) | 0) + (ca & 65535) | 0) + (wa & 65535) | 0;
                            sa = ((f(F, O) | 0) + (ca >>> 16) | 0) + (wa >>> 16) | 0;
                            ta = ((f(x, W) | 0) + (sa & 65535) | 0) + (ra >>> 16) | 0;
                            wa = ((f(F, W) | 0) + (sa >>> 16) | 0) + (ta >>> 16) | 0;
                            ca = ta << 16 | ra & 65535;
                            ra = ((f(x, P) | 0) + (da & 65535) | 0) + (wa & 65535) | 0;
                            sa = ((f(F, P) | 0) + (da >>> 16) | 0) + (wa >>> 16) | 0;
                            ta = ((f(x, X) | 0) + (sa & 65535) | 0) + (ra >>> 16) | 0;
                            wa = ((f(F, X) | 0) + (sa >>> 16) | 0) + (ta >>> 16) | 0;
                            da = ta << 16 | ra & 65535;
                            ra = ((f(x, Q) | 0) + (ea & 65535) | 0) + (wa & 65535) | 0;
                            sa = ((f(F, Q) | 0) + (ea >>> 16) | 0) + (wa >>> 16) | 0;
                            ta = ((f(x, Y) | 0) + (sa & 65535) | 0) + (ra >>> 16) | 0;
                            wa = ((f(F, Y) | 0) + (sa >>> 16) | 0) + (ta >>> 16) | 0;
                            ea = ta << 16 | ra & 65535;
                            ra = ((f(x, R) | 0) + (fa & 65535) | 0) + (wa & 65535) | 0;
                            sa = ((f(F, R) | 0) + (fa >>> 16) | 0) + (wa >>> 16) | 0;
                            ta = ((f(x, Z) | 0) + (sa & 65535) | 0) + (ra >>> 16) | 0;
                            wa = ((f(F, Z) | 0) + (sa >>> 16) | 0) + (ta >>> 16) | 0;
                            fa = ta << 16 | ra & 65535;
                            ra = ((f(x, S) | 0) + (ga & 65535) | 0) + (wa & 65535) | 0;
                            sa = ((f(F, S) | 0) + (ga >>> 16) | 0) + (wa >>> 16) | 0;
                            ta = ((f(x, $) | 0) + (sa & 65535) | 0) + (ra >>> 16) | 0;
                            wa = ((f(F, $) | 0) + (sa >>> 16) | 0) + (ta >>> 16) | 0;
                            ga = ta << 16 | ra & 65535;
                            ra = ((f(x, T) | 0) + (ha & 65535) | 0) + (wa & 65535) | 0;
                            sa = ((f(F, T) | 0) + (ha >>> 16) | 0) + (wa >>> 16) | 0;
                            ta = ((f(x, _) | 0) + (sa & 65535) | 0) + (ra >>> 16) | 0;
                            wa = ((f(F, _) | 0) + (sa >>> 16) | 0) + (ta >>> 16) | 0;
                            ha = ta << 16 | ra & 65535;
                            ra = ((f(x, U) | 0) + (ia & 65535) | 0) + (wa & 65535) | 0;
                            sa = ((f(F, U) | 0) + (ia >>> 16) | 0) + (wa >>> 16) | 0;
                            ta = ((f(x, aa) | 0) + (sa & 65535) | 0) + (ra >>> 16) | 0;
                            wa = ((f(F, aa) | 0) + (sa >>> 16) | 0) + (ta >>> 16) | 0;
                            ia = ta << 16 | ra & 65535;
                            ja = wa;
                            ra = ((f(y, N) | 0) + (ca & 65535) | 0) + (ka & 65535) | 0;
                            sa = ((f(G, N) | 0) + (ca >>> 16) | 0) + (ka >>> 16) | 0;
                            ta = ((f(y, V) | 0) + (sa & 65535) | 0) + (ra >>> 16) | 0;
                            wa = ((f(G, V) | 0) + (sa >>> 16) | 0) + (ta >>> 16) | 0;
                            ca = ta << 16 | ra & 65535;
                            ra = ((f(y, O) | 0) + (da & 65535) | 0) + (wa & 65535) | 0;
                            sa = ((f(G, O) | 0) + (da >>> 16) | 0) + (wa >>> 16) | 0;
                            ta = ((f(y, W) | 0) + (sa & 65535) | 0) + (ra >>> 16) | 0;
                            wa = ((f(G, W) | 0) + (sa >>> 16) | 0) + (ta >>> 16) | 0;
                            da = ta << 16 | ra & 65535;
                            ra = ((f(y, P) | 0) + (ea & 65535) | 0) + (wa & 65535) | 0;
                            sa = ((f(G, P) | 0) + (ea >>> 16) | 0) + (wa >>> 16) | 0;
                            ta = ((f(y, X) | 0) + (sa & 65535) | 0) + (ra >>> 16) | 0;
                            wa = ((f(G, X) | 0) + (sa >>> 16) | 0) + (ta >>> 16) | 0;
                            ea = ta << 16 | ra & 65535;
                            ra = ((f(y, Q) | 0) + (fa & 65535) | 0) + (wa & 65535) | 0;
                            sa = ((f(G, Q) | 0) + (fa >>> 16) | 0) + (wa >>> 16) | 0;
                            ta = ((f(y, Y) | 0) + (sa & 65535) | 0) + (ra >>> 16) | 0;
                            wa = ((f(G, Y) | 0) + (sa >>> 16) | 0) + (ta >>> 16) | 0;
                            fa = ta << 16 | ra & 65535;
                            ra = ((f(y, R) | 0) + (ga & 65535) | 0) + (wa & 65535) | 0;
                            sa = ((f(G, R) | 0) + (ga >>> 16) | 0) + (wa >>> 16) | 0;
                            ta = ((f(y, Z) | 0) + (sa & 65535) | 0) + (ra >>> 16) | 0;
                            wa = ((f(G, Z) | 0) + (sa >>> 16) | 0) + (ta >>> 16) | 0;
                            ga = ta << 16 | ra & 65535;
                            ra = ((f(y, S) | 0) + (ha & 65535) | 0) + (wa & 65535) | 0;
                            sa = ((f(G, S) | 0) + (ha >>> 16) | 0) + (wa >>> 16) | 0;
                            ta = ((f(y, $) | 0) + (sa & 65535) | 0) + (ra >>> 16) | 0;
                            wa = ((f(G, $) | 0) + (sa >>> 16) | 0) + (ta >>> 16) | 0;
                            ha = ta << 16 | ra & 65535;
                            ra = ((f(y, T) | 0) + (ia & 65535) | 0) + (wa & 65535) | 0;
                            sa = ((f(G, T) | 0) + (ia >>> 16) | 0) + (wa >>> 16) | 0;
                            ta = ((f(y, _) | 0) + (sa & 65535) | 0) + (ra >>> 16) | 0;
                            wa = ((f(G, _) | 0) + (sa >>> 16) | 0) + (ta >>> 16) | 0;
                            ia = ta << 16 | ra & 65535;
                            ra = ((f(y, U) | 0) + (ja & 65535) | 0) + (wa & 65535) | 0;
                            sa = ((f(G, U) | 0) + (ja >>> 16) | 0) + (wa >>> 16) | 0;
                            ta = ((f(y, aa) | 0) + (sa & 65535) | 0) + (ra >>> 16) | 0;
                            wa = ((f(G, aa) | 0) + (sa >>> 16) | 0) + (ta >>> 16) | 0;
                            ja = ta << 16 | ra & 65535;
                            ka = wa;
                            ra = ((f(z, N) | 0) + (da & 65535) | 0) + (la & 65535) | 0;
                            sa = ((f(H, N) | 0) + (da >>> 16) | 0) + (la >>> 16) | 0;
                            ta = ((f(z, V) | 0) + (sa & 65535) | 0) + (ra >>> 16) | 0;
                            wa = ((f(H, V) | 0) + (sa >>> 16) | 0) + (ta >>> 16) | 0;
                            da = ta << 16 | ra & 65535;
                            ra = ((f(z, O) | 0) + (ea & 65535) | 0) + (wa & 65535) | 0;
                            sa = ((f(H, O) | 0) + (ea >>> 16) | 0) + (wa >>> 16) | 0;
                            ta = ((f(z, W) | 0) + (sa & 65535) | 0) + (ra >>> 16) | 0;
                            wa = ((f(H, W) | 0) + (sa >>> 16) | 0) + (ta >>> 16) | 0;
                            ea = ta << 16 | ra & 65535;
                            ra = ((f(z, P) | 0) + (fa & 65535) | 0) + (wa & 65535) | 0;
                            sa = ((f(H, P) | 0) + (fa >>> 16) | 0) + (wa >>> 16) | 0;
                            ta = ((f(z, X) | 0) + (sa & 65535) | 0) + (ra >>> 16) | 0;
                            wa = ((f(H, X) | 0) + (sa >>> 16) | 0) + (ta >>> 16) | 0;
                            fa = ta << 16 | ra & 65535;
                            ra = ((f(z, Q) | 0) + (ga & 65535) | 0) + (wa & 65535) | 0;
                            sa = ((f(H, Q) | 0) + (ga >>> 16) | 0) + (wa >>> 16) | 0;
                            ta = ((f(z, Y) | 0) + (sa & 65535) | 0) + (ra >>> 16) | 0;
                            wa = ((f(H, Y) | 0) + (sa >>> 16) | 0) + (ta >>> 16) | 0;
                            ga = ta << 16 | ra & 65535;
                            ra = ((f(z, R) | 0) + (ha & 65535) | 0) + (wa & 65535) | 0;
                            sa = ((f(H, R) | 0) + (ha >>> 16) | 0) + (wa >>> 16) | 0;
                            ta = ((f(z, Z) | 0) + (sa & 65535) | 0) + (ra >>> 16) | 0;
                            wa = ((f(H, Z) | 0) + (sa >>> 16) | 0) + (ta >>> 16) | 0;
                            ha = ta << 16 | ra & 65535;
                            ra = ((f(z, S) | 0) + (ia & 65535) | 0) + (wa & 65535) | 0;
                            sa = ((f(H, S) | 0) + (ia >>> 16) | 0) + (wa >>> 16) | 0;
                            ta = ((f(z, $) | 0) + (sa & 65535) | 0) + (ra >>> 16) | 0;
                            wa = ((f(H, $) | 0) + (sa >>> 16) | 0) + (ta >>> 16) | 0;
                            ia = ta << 16 | ra & 65535;
                            ra = ((f(z, T) | 0) + (ja & 65535) | 0) + (wa & 65535) | 0;
                            sa = ((f(H, T) | 0) + (ja >>> 16) | 0) + (wa >>> 16) | 0;
                            ta = ((f(z, _) | 0) + (sa & 65535) | 0) + (ra >>> 16) | 0;
                            wa = ((f(H, _) | 0) + (sa >>> 16) | 0) + (ta >>> 16) | 0;
                            ja = ta << 16 | ra & 65535;
                            ra = ((f(z, U) | 0) + (ka & 65535) | 0) + (wa & 65535) | 0;
                            sa = ((f(H, U) | 0) + (ka >>> 16) | 0) + (wa >>> 16) | 0;
                            ta = ((f(z, aa) | 0) + (sa & 65535) | 0) + (ra >>> 16) | 0;
                            wa = ((f(H, aa) | 0) + (sa >>> 16) | 0) + (ta >>> 16) | 0;
                            ka = ta << 16 | ra & 65535;
                            la = wa;
                            ra = ((f(A, N) | 0) + (ea & 65535) | 0) + (ma & 65535) | 0;
                            sa = ((f(I, N) | 0) + (ea >>> 16) | 0) + (ma >>> 16) | 0;
                            ta = ((f(A, V) | 0) + (sa & 65535) | 0) + (ra >>> 16) | 0;
                            wa = ((f(I, V) | 0) + (sa >>> 16) | 0) + (ta >>> 16) | 0;
                            ea = ta << 16 | ra & 65535;
                            ra = ((f(A, O) | 0) + (fa & 65535) | 0) + (wa & 65535) | 0;
                            sa = ((f(I, O) | 0) + (fa >>> 16) | 0) + (wa >>> 16) | 0;
                            ta = ((f(A, W) | 0) + (sa & 65535) | 0) + (ra >>> 16) | 0;
                            wa = ((f(I, W) | 0) + (sa >>> 16) | 0) + (ta >>> 16) | 0;
                            fa = ta << 16 | ra & 65535;
                            ra = ((f(A, P) | 0) + (ga & 65535) | 0) + (wa & 65535) | 0;
                            sa = ((f(I, P) | 0) + (ga >>> 16) | 0) + (wa >>> 16) | 0;
                            ta = ((f(A, X) | 0) + (sa & 65535) | 0) + (ra >>> 16) | 0;
                            wa = ((f(I, X) | 0) + (sa >>> 16) | 0) + (ta >>> 16) | 0;
                            ga = ta << 16 | ra & 65535;
                            ra = ((f(A, Q) | 0) + (ha & 65535) | 0) + (wa & 65535) | 0;
                            sa = ((f(I, Q) | 0) + (ha >>> 16) | 0) + (wa >>> 16) | 0;
                            ta = ((f(A, Y) | 0) + (sa & 65535) | 0) + (ra >>> 16) | 0;
                            wa = ((f(I, Y) | 0) + (sa >>> 16) | 0) + (ta >>> 16) | 0;
                            ha = ta << 16 | ra & 65535;
                            ra = ((f(A, R) | 0) + (ia & 65535) | 0) + (wa & 65535) | 0;
                            sa = ((f(I, R) | 0) + (ia >>> 16) | 0) + (wa >>> 16) | 0;
                            ta = ((f(A, Z) | 0) + (sa & 65535) | 0) + (ra >>> 16) | 0;
                            wa = ((f(I, Z) | 0) + (sa >>> 16) | 0) + (ta >>> 16) | 0;
                            ia = ta << 16 | ra & 65535;
                            ra = ((f(A, S) | 0) + (ja & 65535) | 0) + (wa & 65535) | 0;
                            sa = ((f(I, S) | 0) + (ja >>> 16) | 0) + (wa >>> 16) | 0;
                            ta = ((f(A, $) | 0) + (sa & 65535) | 0) + (ra >>> 16) | 0;
                            wa = ((f(I, $) | 0) + (sa >>> 16) | 0) + (ta >>> 16) | 0;
                            ja = ta << 16 | ra & 65535;
                            ra = ((f(A, T) | 0) + (ka & 65535) | 0) + (wa & 65535) | 0;
                            sa = ((f(I, T) | 0) + (ka >>> 16) | 0) + (wa >>> 16) | 0;
                            ta = ((f(A, _) | 0) + (sa & 65535) | 0) + (ra >>> 16) | 0;
                            wa = ((f(I, _) | 0) + (sa >>> 16) | 0) + (ta >>> 16) | 0;
                            ka = ta << 16 | ra & 65535;
                            ra = ((f(A, U) | 0) + (la & 65535) | 0) + (wa & 65535) | 0;
                            sa = ((f(I, U) | 0) + (la >>> 16) | 0) + (wa >>> 16) | 0;
                            ta = ((f(A, aa) | 0) + (sa & 65535) | 0) + (ra >>> 16) | 0;
                            wa = ((f(I, aa) | 0) + (sa >>> 16) | 0) + (ta >>> 16) | 0;
                            la = ta << 16 | ra & 65535;
                            ma = wa;
                            ra = ((f(B, N) | 0) + (fa & 65535) | 0) + (na & 65535) | 0;
                            sa = ((f(J, N) | 0) + (fa >>> 16) | 0) + (na >>> 16) | 0;
                            ta = ((f(B, V) | 0) + (sa & 65535) | 0) + (ra >>> 16) | 0;
                            wa = ((f(J, V) | 0) + (sa >>> 16) | 0) + (ta >>> 16) | 0;
                            fa = ta << 16 | ra & 65535;
                            ra = ((f(B, O) | 0) + (ga & 65535) | 0) + (wa & 65535) | 0;
                            sa = ((f(J, O) | 0) + (ga >>> 16) | 0) + (wa >>> 16) | 0;
                            ta = ((f(B, W) | 0) + (sa & 65535) | 0) + (ra >>> 16) | 0;
                            wa = ((f(J, W) | 0) + (sa >>> 16) | 0) + (ta >>> 16) | 0;
                            ga = ta << 16 | ra & 65535;
                            ra = ((f(B, P) | 0) + (ha & 65535) | 0) + (wa & 65535) | 0;
                            sa = ((f(J, P) | 0) + (ha >>> 16) | 0) + (wa >>> 16) | 0;
                            ta = ((f(B, X) | 0) + (sa & 65535) | 0) + (ra >>> 16) | 0;
                            wa = ((f(J, X) | 0) + (sa >>> 16) | 0) + (ta >>> 16) | 0;
                            ha = ta << 16 | ra & 65535;
                            ra = ((f(B, Q) | 0) + (ia & 65535) | 0) + (wa & 65535) | 0;
                            sa = ((f(J, Q) | 0) + (ia >>> 16) | 0) + (wa >>> 16) | 0;
                            ta = ((f(B, Y) | 0) + (sa & 65535) | 0) + (ra >>> 16) | 0;
                            wa = ((f(J, Y) | 0) + (sa >>> 16) | 0) + (ta >>> 16) | 0;
                            ia = ta << 16 | ra & 65535;
                            ra = ((f(B, R) | 0) + (ja & 65535) | 0) + (wa & 65535) | 0;
                            sa = ((f(J, R) | 0) + (ja >>> 16) | 0) + (wa >>> 16) | 0;
                            ta = ((f(B, Z) | 0) + (sa & 65535) | 0) + (ra >>> 16) | 0;
                            wa = ((f(J, Z) | 0) + (sa >>> 16) | 0) + (ta >>> 16) | 0;
                            ja = ta << 16 | ra & 65535;
                            ra = ((f(B, S) | 0) + (ka & 65535) | 0) + (wa & 65535) | 0;
                            sa = ((f(J, S) | 0) + (ka >>> 16) | 0) + (wa >>> 16) | 0;
                            ta = ((f(B, $) | 0) + (sa & 65535) | 0) + (ra >>> 16) | 0;
                            wa = ((f(J, $) | 0) + (sa >>> 16) | 0) + (ta >>> 16) | 0;
                            ka = ta << 16 | ra & 65535;
                            ra = ((f(B, T) | 0) + (la & 65535) | 0) + (wa & 65535) | 0;
                            sa = ((f(J, T) | 0) + (la >>> 16) | 0) + (wa >>> 16) | 0;
                            ta = ((f(B, _) | 0) + (sa & 65535) | 0) + (ra >>> 16) | 0;
                            wa = ((f(J, _) | 0) + (sa >>> 16) | 0) + (ta >>> 16) | 0;
                            la = ta << 16 | ra & 65535;
                            ra = ((f(B, U) | 0) + (ma & 65535) | 0) + (wa & 65535) | 0;
                            sa = ((f(J, U) | 0) + (ma >>> 16) | 0) + (wa >>> 16) | 0;
                            ta = ((f(B, aa) | 0) + (sa & 65535) | 0) + (ra >>> 16) | 0;
                            wa = ((f(J, aa) | 0) + (sa >>> 16) | 0) + (ta >>> 16) | 0;
                            ma = ta << 16 | ra & 65535;
                            na = wa;
                            ra = ((f(C, N) | 0) + (ga & 65535) | 0) + (oa & 65535) | 0;
                            sa = ((f(K, N) | 0) + (ga >>> 16) | 0) + (oa >>> 16) | 0;
                            ta = ((f(C, V) | 0) + (sa & 65535) | 0) + (ra >>> 16) | 0;
                            wa = ((f(K, V) | 0) + (sa >>> 16) | 0) + (ta >>> 16) | 0;
                            ga = ta << 16 | ra & 65535;
                            ra = ((f(C, O) | 0) + (ha & 65535) | 0) + (wa & 65535) | 0;
                            sa = ((f(K, O) | 0) + (ha >>> 16) | 0) + (wa >>> 16) | 0;
                            ta = ((f(C, W) | 0) + (sa & 65535) | 0) + (ra >>> 16) | 0;
                            wa = ((f(K, W) | 0) + (sa >>> 16) | 0) + (ta >>> 16) | 0;
                            ha = ta << 16 | ra & 65535;
                            ra = ((f(C, P) | 0) + (ia & 65535) | 0) + (wa & 65535) | 0;
                            sa = ((f(K, P) | 0) + (ia >>> 16) | 0) + (wa >>> 16) | 0;
                            ta = ((f(C, X) | 0) + (sa & 65535) | 0) + (ra >>> 16) | 0;
                            wa = ((f(K, X) | 0) + (sa >>> 16) | 0) + (ta >>> 16) | 0;
                            ia = ta << 16 | ra & 65535;
                            ra = ((f(C, Q) | 0) + (ja & 65535) | 0) + (wa & 65535) | 0;
                            sa = ((f(K, Q) | 0) + (ja >>> 16) | 0) + (wa >>> 16) | 0;
                            ta = ((f(C, Y) | 0) + (sa & 65535) | 0) + (ra >>> 16) | 0;
                            wa = ((f(K, Y) | 0) + (sa >>> 16) | 0) + (ta >>> 16) | 0;
                            ja = ta << 16 | ra & 65535;
                            ra = ((f(C, R) | 0) + (ka & 65535) | 0) + (wa & 65535) | 0;
                            sa = ((f(K, R) | 0) + (ka >>> 16) | 0) + (wa >>> 16) | 0;
                            ta = ((f(C, Z) | 0) + (sa & 65535) | 0) + (ra >>> 16) | 0;
                            wa = ((f(K, Z) | 0) + (sa >>> 16) | 0) + (ta >>> 16) | 0;
                            ka = ta << 16 | ra & 65535;
                            ra = ((f(C, S) | 0) + (la & 65535) | 0) + (wa & 65535) | 0;
                            sa = ((f(K, S) | 0) + (la >>> 16) | 0) + (wa >>> 16) | 0;
                            ta = ((f(C, $) | 0) + (sa & 65535) | 0) + (ra >>> 16) | 0;
                            wa = ((f(K, $) | 0) + (sa >>> 16) | 0) + (ta >>> 16) | 0;
                            la = ta << 16 | ra & 65535;
                            ra = ((f(C, T) | 0) + (ma & 65535) | 0) + (wa & 65535) | 0;
                            sa = ((f(K, T) | 0) + (ma >>> 16) | 0) + (wa >>> 16) | 0;
                            ta = ((f(C, _) | 0) + (sa & 65535) | 0) + (ra >>> 16) | 0;
                            wa = ((f(K, _) | 0) + (sa >>> 16) | 0) + (ta >>> 16) | 0;
                            ma = ta << 16 | ra & 65535;
                            ra = ((f(C, U) | 0) + (na & 65535) | 0) + (wa & 65535) | 0;
                            sa = ((f(K, U) | 0) + (na >>> 16) | 0) + (wa >>> 16) | 0;
                            ta = ((f(C, aa) | 0) + (sa & 65535) | 0) + (ra >>> 16) | 0;
                            wa = ((f(K, aa) | 0) + (sa >>> 16) | 0) + (ta >>> 16) | 0;
                            na = ta << 16 | ra & 65535;
                            oa = wa;
                            ra = ((f(D, N) | 0) + (ha & 65535) | 0) + (pa & 65535) | 0;
                            sa = ((f(L, N) | 0) + (ha >>> 16) | 0) + (pa >>> 16) | 0;
                            ta = ((f(D, V) | 0) + (sa & 65535) | 0) + (ra >>> 16) | 0;
                            wa = ((f(L, V) | 0) + (sa >>> 16) | 0) + (ta >>> 16) | 0;
                            ha = ta << 16 | ra & 65535;
                            ra = ((f(D, O) | 0) + (ia & 65535) | 0) + (wa & 65535) | 0;
                            sa = ((f(L, O) | 0) + (ia >>> 16) | 0) + (wa >>> 16) | 0;
                            ta = ((f(D, W) | 0) + (sa & 65535) | 0) + (ra >>> 16) | 0;
                            wa = ((f(L, W) | 0) + (sa >>> 16) | 0) + (ta >>> 16) | 0;
                            ia = ta << 16 | ra & 65535;
                            ra = ((f(D, P) | 0) + (ja & 65535) | 0) + (wa & 65535) | 0;
                            sa = ((f(L, P) | 0) + (ja >>> 16) | 0) + (wa >>> 16) | 0;
                            ta = ((f(D, X) | 0) + (sa & 65535) | 0) + (ra >>> 16) | 0;
                            wa = ((f(L, X) | 0) + (sa >>> 16) | 0) + (ta >>> 16) | 0;
                            ja = ta << 16 | ra & 65535;
                            ra = ((f(D, Q) | 0) + (ka & 65535) | 0) + (wa & 65535) | 0;
                            sa = ((f(L, Q) | 0) + (ka >>> 16) | 0) + (wa >>> 16) | 0;
                            ta = ((f(D, Y) | 0) + (sa & 65535) | 0) + (ra >>> 16) | 0;
                            wa = ((f(L, Y) | 0) + (sa >>> 16) | 0) + (ta >>> 16) | 0;
                            ka = ta << 16 | ra & 65535;
                            ra = ((f(D, R) | 0) + (la & 65535) | 0) + (wa & 65535) | 0;
                            sa = ((f(L, R) | 0) + (la >>> 16) | 0) + (wa >>> 16) | 0;
                            ta = ((f(D, Z) | 0) + (sa & 65535) | 0) + (ra >>> 16) | 0;
                            wa = ((f(L, Z) | 0) + (sa >>> 16) | 0) + (ta >>> 16) | 0;
                            la = ta << 16 | ra & 65535;
                            ra = ((f(D, S) | 0) + (ma & 65535) | 0) + (wa & 65535) | 0;
                            sa = ((f(L, S) | 0) + (ma >>> 16) | 0) + (wa >>> 16) | 0;
                            ta = ((f(D, $) | 0) + (sa & 65535) | 0) + (ra >>> 16) | 0;
                            wa = ((f(L, $) | 0) + (sa >>> 16) | 0) + (ta >>> 16) | 0;
                            ma = ta << 16 | ra & 65535;
                            ra = ((f(D, T) | 0) + (na & 65535) | 0) + (wa & 65535) | 0;
                            sa = ((f(L, T) | 0) + (na >>> 16) | 0) + (wa >>> 16) | 0;
                            ta = ((f(D, _) | 0) + (sa & 65535) | 0) + (ra >>> 16) | 0;
                            wa = ((f(L, _) | 0) + (sa >>> 16) | 0) + (ta >>> 16) | 0;
                            na = ta << 16 | ra & 65535;
                            ra = ((f(D, U) | 0) + (oa & 65535) | 0) + (wa & 65535) | 0;
                            sa = ((f(L, U) | 0) + (oa >>> 16) | 0) + (wa >>> 16) | 0;
                            ta = ((f(D, aa) | 0) + (sa & 65535) | 0) + (ra >>> 16) | 0;
                            wa = ((f(L, aa) | 0) + (sa >>> 16) | 0) + (ta >>> 16) | 0;
                            oa = ta << 16 | ra & 65535;
                            pa = wa;
                            ra = ((f(E, N) | 0) + (ia & 65535) | 0) + (qa & 65535) | 0;
                            sa = ((f(M, N) | 0) + (ia >>> 16) | 0) + (qa >>> 16) | 0;
                            ta = ((f(E, V) | 0) + (sa & 65535) | 0) + (ra >>> 16) | 0;
                            wa = ((f(M, V) | 0) + (sa >>> 16) | 0) + (ta >>> 16) | 0;
                            ia = ta << 16 | ra & 65535;
                            ra = ((f(E, O) | 0) + (ja & 65535) | 0) + (wa & 65535) | 0;
                            sa = ((f(M, O) | 0) + (ja >>> 16) | 0) + (wa >>> 16) | 0;
                            ta = ((f(E, W) | 0) + (sa & 65535) | 0) + (ra >>> 16) | 0;
                            wa = ((f(M, W) | 0) + (sa >>> 16) | 0) + (ta >>> 16) | 0;
                            ja = ta << 16 | ra & 65535;
                            ra = ((f(E, P) | 0) + (ka & 65535) | 0) + (wa & 65535) | 0;
                            sa = ((f(M, P) | 0) + (ka >>> 16) | 0) + (wa >>> 16) | 0;
                            ta = ((f(E, X) | 0) + (sa & 65535) | 0) + (ra >>> 16) | 0;
                            wa = ((f(M, X) | 0) + (sa >>> 16) | 0) + (ta >>> 16) | 0;
                            ka = ta << 16 | ra & 65535;
                            ra = ((f(E, Q) | 0) + (la & 65535) | 0) + (wa & 65535) | 0;
                            sa = ((f(M, Q) | 0) + (la >>> 16) | 0) + (wa >>> 16) | 0;
                            ta = ((f(E, Y) | 0) + (sa & 65535) | 0) + (ra >>> 16) | 0;
                            wa = ((f(M, Y) | 0) + (sa >>> 16) | 0) + (ta >>> 16) | 0;
                            la = ta << 16 | ra & 65535;
                            ra = ((f(E, R) | 0) + (ma & 65535) | 0) + (wa & 65535) | 0;
                            sa = ((f(M, R) | 0) + (ma >>> 16) | 0) + (wa >>> 16) | 0;
                            ta = ((f(E, Z) | 0) + (sa & 65535) | 0) + (ra >>> 16) | 0;
                            wa = ((f(M, Z) | 0) + (sa >>> 16) | 0) + (ta >>> 16) | 0;
                            ma = ta << 16 | ra & 65535;
                            ra = ((f(E, S) | 0) + (na & 65535) | 0) + (wa & 65535) | 0;
                            sa = ((f(M, S) | 0) + (na >>> 16) | 0) + (wa >>> 16) | 0;
                            ta = ((f(E, $) | 0) + (sa & 65535) | 0) + (ra >>> 16) | 0;
                            wa = ((f(M, $) | 0) + (sa >>> 16) | 0) + (ta >>> 16) | 0;
                            na = ta << 16 | ra & 65535;
                            ra = ((f(E, T) | 0) + (oa & 65535) | 0) + (wa & 65535) | 0;
                            sa = ((f(M, T) | 0) + (oa >>> 16) | 0) + (wa >>> 16) | 0;
                            ta = ((f(E, _) | 0) + (sa & 65535) | 0) + (ra >>> 16) | 0;
                            wa = ((f(M, _) | 0) + (sa >>> 16) | 0) + (ta >>> 16) | 0;
                            oa = ta << 16 | ra & 65535;
                            ra = ((f(E, U) | 0) + (pa & 65535) | 0) + (wa & 65535) | 0;
                            sa = ((f(M, U) | 0) + (pa >>> 16) | 0) + (wa >>> 16) | 0;
                            ta = ((f(E, aa) | 0) + (sa & 65535) | 0) + (ra >>> 16) | 0;
                            wa = ((f(M, aa) | 0) + (sa >>> 16) | 0) + (ta >>> 16) | 0;
                            pa = ta << 16 | ra & 65535;
                            qa = wa;
                            Da = ya + (Ba + Ca | 0) | 0;
                            xa = e[Ga + Da >> 2] | 0;
                            ra = ((xa & 65535) + ((ba & 65535) << 1) | 0) + ua | 0;
                            ta = ((xa >>> 16) + (ba >>> 16 << 1) | 0) + (ra >>> 16) | 0;
                            e[Ga + Da >> 2] = ta << 16 | ra & 65535;
                            ua = ta >>> 16;
                            Da = Da + 4 | 0;
                            xa = e[Ga + Da >> 2] | 0;
                            ra = ((xa & 65535) + ((ca & 65535) << 1) | 0) + ua | 0;
                            ta = ((xa >>> 16) + (ca >>> 16 << 1) | 0) + (ra >>> 16) | 0;
                            e[Ga + Da >> 2] = ta << 16 | ra & 65535;
                            ua = ta >>> 16;
                            Da = Da + 4 | 0;
                            xa = e[Ga + Da >> 2] | 0;
                            ra = ((xa & 65535) + ((da & 65535) << 1) | 0) + ua | 0;
                            ta = ((xa >>> 16) + (da >>> 16 << 1) | 0) + (ra >>> 16) | 0;
                            e[Ga + Da >> 2] = ta << 16 | ra & 65535;
                            ua = ta >>> 16;
                            Da = Da + 4 | 0;
                            xa = e[Ga + Da >> 2] | 0;
                            ra = ((xa & 65535) + ((ea & 65535) << 1) | 0) + ua | 0;
                            ta = ((xa >>> 16) + (ea >>> 16 << 1) | 0) + (ra >>> 16) | 0;
                            e[Ga + Da >> 2] = ta << 16 | ra & 65535;
                            ua = ta >>> 16;
                            Da = Da + 4 | 0;
                            xa = e[Ga + Da >> 2] | 0;
                            ra = ((xa & 65535) + ((fa & 65535) << 1) | 0) + ua | 0;
                            ta = ((xa >>> 16) + (fa >>> 16 << 1) | 0) + (ra >>> 16) | 0;
                            e[Ga + Da >> 2] = ta << 16 | ra & 65535;
                            ua = ta >>> 16;
                            Da = Da + 4 | 0;
                            xa = e[Ga + Da >> 2] | 0;
                            ra = ((xa & 65535) + ((ga & 65535) << 1) | 0) + ua | 0;
                            ta = ((xa >>> 16) + (ga >>> 16 << 1) | 0) + (ra >>> 16) | 0;
                            e[Ga + Da >> 2] = ta << 16 | ra & 65535;
                            ua = ta >>> 16;
                            Da = Da + 4 | 0;
                            xa = e[Ga + Da >> 2] | 0;
                            ra = ((xa & 65535) + ((ha & 65535) << 1) | 0) + ua | 0;
                            ta = ((xa >>> 16) + (ha >>> 16 << 1) | 0) + (ra >>> 16) | 0;
                            e[Ga + Da >> 2] = ta << 16 | ra & 65535;
                            ua = ta >>> 16;
                            Da = Da + 4 | 0;
                            xa = e[Ga + Da >> 2] | 0;
                            ra = ((xa & 65535) + ((ia & 65535) << 1) | 0) + ua | 0;
                            ta = ((xa >>> 16) + (ia >>> 16 << 1) | 0) + (ra >>> 16) | 0;
                            e[Ga + Da >> 2] = ta << 16 | ra & 65535;
                            ua = ta >>> 16
                        }
                        Da = ya + (Ba + Ca | 0) | 0;
                        xa = e[Ga + Da >> 2] | 0;
                        ra = (((xa & 65535) + ((ja & 65535) << 1) | 0) + ua | 0) + va | 0;
                        ta = ((xa >>> 16) + (ja >>> 16 << 1) | 0) + (ra >>> 16) | 0;
                        e[Ga + Da >> 2] = ta << 16 | ra & 65535;
                        ua = ta >>> 16;
                        Da = Da + 4 | 0;
                        xa = e[Ga + Da >> 2] | 0;
                        ra = ((xa & 65535) + ((ka & 65535) << 1) | 0) + ua | 0;
                        ta = ((xa >>> 16) + (ka >>> 16 << 1) | 0) + (ra >>> 16) | 0;
                        e[Ga + Da >> 2] = ta << 16 | ra & 65535;
                        ua = ta >>> 16;
                        Da = Da + 4 | 0;
                        xa = e[Ga + Da >> 2] | 0;
                        ra = ((xa & 65535) + ((la & 65535) << 1) | 0) + ua | 0;
                        ta = ((xa >>> 16) + (la >>> 16 << 1) | 0) + (ra >>> 16) | 0;
                        e[Ga + Da >> 2] = ta << 16 | ra & 65535;
                        ua = ta >>> 16;
                        Da = Da + 4 | 0;
                        xa = e[Ga + Da >> 2] | 0;
                        ra = ((xa & 65535) + ((ma & 65535) << 1) | 0) + ua | 0;
                        ta = ((xa >>> 16) + (ma >>> 16 << 1) | 0) + (ra >>> 16) | 0;
                        e[Ga + Da >> 2] = ta << 16 | ra & 65535;
                        ua = ta >>> 16;
                        Da = Da + 4 | 0;
                        xa = e[Ga + Da >> 2] | 0;
                        ra = ((xa & 65535) + ((na & 65535) << 1) | 0) + ua | 0;
                        ta = ((xa >>> 16) + (na >>> 16 << 1) | 0) + (ra >>> 16) | 0;
                        e[Ga + Da >> 2] = ta << 16 | ra & 65535;
                        ua = ta >>> 16;
                        Da = Da + 4 | 0;
                        xa = e[Ga + Da >> 2] | 0;
                        ra = ((xa & 65535) + ((oa & 65535) << 1) | 0) + ua | 0;
                        ta = ((xa >>> 16) + (oa >>> 16 << 1) | 0) + (ra >>> 16) | 0;
                        e[Ga + Da >> 2] = ta << 16 | ra & 65535;
                        ua = ta >>> 16;
                        Da = Da + 4 | 0;
                        xa = e[Ga + Da >> 2] | 0;
                        ra = ((xa & 65535) + ((pa & 65535) << 1) | 0) + ua | 0;
                        ta = ((xa >>> 16) + (pa >>> 16 << 1) | 0) + (ra >>> 16) | 0;
                        e[Ga + Da >> 2] = ta << 16 | ra & 65535;
                        ua = ta >>> 16;
                        Da = Da + 4 | 0;
                        xa = e[Ga + Da >> 2] | 0;
                        ra = ((xa & 65535) + ((qa & 65535) << 1) | 0) + ua | 0;
                        ta = ((xa >>> 16) + (qa >>> 16 << 1) | 0) + (ra >>> 16) | 0;
                        e[Ga + Da >> 2] = ta << 16 | ra & 65535;
                        va = ta >>> 16
                    }
                    for (Da = Da + 4 | 0; !!va & (Da | 0) < za << 1; Da = Da + 4 | 0) {
                        xa = e[Ga + Da >> 2] | 0;
                        ra = (xa & 65535) + va | 0;
                        ta = (xa >>> 16) + (ra >>> 16) | 0;
                        e[Ga + Da >> 2] = ta << 16 | ra & 65535;
                        va = ta >>> 16
                    }
                }
            }
        }

        function s(u, v, w, x, y) {
            u = u | 0;
            v = v | 0;
            w = w | 0;
            x = x | 0;
            y = y | 0;
            var z = 0, A = 0, B = 0, C = 0, D = 0, E = 0, F = 0, G = 0, H = 0, I = 0, J = 0, K = 0, L = 0, M = 0, N = 0, O = 0, P = 0, Q = 0, R = 0;
            for (P = v - 1 & -4; (P | 0) >= 0; P = P - 4 | 0) {
                z = e[u + P >> 2] | 0;
                if (z) {
                    v = P;
                    break
                }
            }
            for (P = x - 1 & -4; (P | 0) >= 0; P = P - 4 | 0) {
                A = e[w + P >> 2] | 0;
                if (A) {
                    x = P;
                    break
                }
            }
            while ((A & 2147483648) == 0) {
                A = A << 1;
                B = B + 1 | 0
            }
            D = e[u + v >> 2] | 0;
            if (B) {
                C = D >>> (32 - B | 0);
                for (P = v - 4 | 0; (P | 0) >= 0; P = P - 4 | 0) {
                    z = e[u + P >> 2] | 0;
                    e[u + P + 4 >> 2] = D << B | (B ? z >>> (32 - B | 0) : 0);
                    D = z
                }
                e[u >> 2] = D << B
            }
            if (B) {
                E = e[w + x >> 2] | 0;
                for (P = x - 4 | 0; (P | 0) >= 0; P = P - 4 | 0) {
                    A = e[w + P >> 2] | 0;
                    e[w + P + 4 >> 2] = E << B | A >>> (32 - B | 0);
                    E = A
                }
                e[w >> 2] = E << B
            }
            E = e[w + x >> 2] | 0;
            F = E >>> 16, G = E & 65535;
            for (P = v; (P | 0) >= (x | 0); P = P - 4 | 0) {
                Q = P - x | 0;
                D = e[u + P >> 2] | 0;
                H = (C >>> 0) / (F >>> 0) | 0, J = (C >>> 0) % (F >>> 0) | 0, L = f(H, G) | 0;
                while ((H | 0) == 65536 | L >>> 0 > (J << 16 | D >>> 16) >>> 0) {
                    H = H - 1 | 0, J = J + F | 0, L = L - G | 0;
                    if ((J | 0) >= 65536)break
                }
                N = 0, O = 0;
                for (R = 0; (R | 0) <= (x | 0); R = R + 4 | 0) {
                    A = e[w + R >> 2] | 0;
                    L = (f(H, A & 65535) | 0) + (N >>> 16) | 0;
                    M = (f(H, A >>> 16) | 0) + (L >>> 16) | 0;
                    A = N & 65535 | L << 16;
                    N = M;
                    z = e[u + Q + R >> 2] | 0;
                    L = ((z & 65535) - (A & 65535) | 0) + O | 0;

                    M = ((z >>> 16) - (A >>> 16) | 0) + (L >> 16) | 0;
                    e[u + Q + R >> 2] = M << 16 | L & 65535;
                    O = M >> 16
                }
                L = ((C & 65535) - (N & 65535) | 0) + O | 0;
                M = ((C >>> 16) - (N >>> 16) | 0) + (L >> 16) | 0;
                C = M << 16 | L & 65535;
                O = M >> 16;
                if (O) {
                    H = H - 1 | 0;
                    O = 0;
                    for (R = 0; (R | 0) <= (x | 0); R = R + 4 | 0) {
                        A = e[w + R >> 2] | 0;
                        z = e[u + Q + R >> 2] | 0;
                        L = (z & 65535) + O | 0;
                        M = (z >>> 16) + A + (L >>> 16) | 0;
                        e[u + Q + R >> 2] = M << 16 | L & 65535;
                        O = M >>> 16
                    }
                    C = C + O | 0
                }
                D = e[u + P >> 2] | 0;
                z = C << 16 | D >>> 16;
                I = (z >>> 0) / (F >>> 0) | 0, K = (z >>> 0) % (F >>> 0) | 0, L = f(I, G) | 0;
                while ((I | 0) == 65536 | L >>> 0 > (K << 16 | D & 65535) >>> 0) {
                    I = I - 1 | 0, K = K + F | 0, L = L - G | 0;
                    if ((K | 0) >= 65536)break
                }
                N = 0, O = 0;
                for (R = 0; (R | 0) <= (x | 0); R = R + 4 | 0) {
                    A = e[w + R >> 2] | 0;
                    L = (f(I, A & 65535) | 0) + (N & 65535) | 0;
                    M = ((f(I, A >>> 16) | 0) + (L >>> 16) | 0) + (N >>> 16) | 0;
                    A = L & 65535 | M << 16;
                    N = M >>> 16;
                    z = e[u + Q + R >> 2] | 0;
                    L = ((z & 65535) - (A & 65535) | 0) + O | 0;
                    M = ((z >>> 16) - (A >>> 16) | 0) + (L >> 16) | 0;
                    O = M >> 16;
                    e[u + Q + R >> 2] = M << 16 | L & 65535
                }
                L = ((C & 65535) - (N & 65535) | 0) + O | 0;
                M = ((C >>> 16) - (N >>> 16) | 0) + (L >> 16) | 0;
                O = M >> 16;
                if (O) {
                    I = I - 1 | 0;
                    O = 0;
                    for (R = 0; (R | 0) <= (x | 0); R = R + 4 | 0) {
                        A = e[w + R >> 2] | 0;
                        z = e[u + Q + R >> 2] | 0;
                        L = ((z & 65535) + (A & 65535) | 0) + O | 0;
                        M = ((z >>> 16) + (A >>> 16) | 0) + (L >>> 16) | 0;
                        O = M >>> 16;
                        e[u + Q + R >> 2] = L & 65535 | M << 16
                    }
                }
                e[y + Q >> 2] = H << 16 | I;
                C = e[u + P >> 2] | 0
            }
            if (B) {
                D = e[u >> 2] | 0;
                for (P = 4; (P | 0) <= (x | 0); P = P + 4 | 0) {
                    z = e[u + P >> 2] | 0;
                    e[u + P - 4 >> 2] = z << (32 - B | 0) | D >>> B;
                    D = z
                }
                e[u + x >> 2] = D >>> B
            }
        }

        function t(u, v, w, x, y, z) {
            u = u | 0;
            v = v | 0;
            w = w | 0;
            x = x | 0;
            y = y | 0;
            z = z | 0;
            var A = 0, B = 0, C = 0, D = 0, E = 0, F = 0, G = 0, H = 0, I = 0, J = 0, K = 0, L = 0, M = 0, N = 0;
            A = h(x << 1) | 0;
            k(x << 1, 0, A);
            j(v, u, A);
            for (L = 0; (L | 0) < (x | 0); L = L + 4 | 0) {
                C = e[A + L >> 2] | 0, D = C & 65535, C = C >>> 16;
                F = y >>> 16, E = y & 65535;
                G = f(D, E) | 0, H = ((f(D, F) | 0) + (f(C, E) | 0) | 0) + (G >>> 16) | 0;
                D = G & 65535, C = H & 65535;
                K = 0;
                for (M = 0; (M | 0) < (x | 0); M = M + 4 | 0) {
                    N = L + M | 0;
                    F = e[w + M >> 2] | 0, E = F & 65535, F = F >>> 16;
                    J = e[A + N >> 2] | 0;
                    G = ((f(D, E) | 0) + (K & 65535) | 0) + (J & 65535) | 0;
                    H = ((f(D, F) | 0) + (K >>> 16) | 0) + (J >>> 16) | 0;
                    I = ((f(C, E) | 0) + (H & 65535) | 0) + (G >>> 16) | 0;
                    K = ((f(C, F) | 0) + (I >>> 16) | 0) + (H >>> 16) | 0;
                    J = I << 16 | G & 65535;
                    e[A + N >> 2] = J
                }
                N = L + M | 0;
                J = e[A + N >> 2] | 0;
                G = ((J & 65535) + (K & 65535) | 0) + B | 0;
                H = ((J >>> 16) + (K >>> 16) | 0) + (G >>> 16) | 0;
                e[A + N >> 2] = H << 16 | G & 65535;
                B = H >>> 16
            }
            j(x, A + x | 0, z);
            i(x << 1);
            if (B | (m(w, x, z, x) | 0) <= 0) {
                p(z, x, w, x, z, x) | 0
            }
        }

        return {
            sreset: g,
            salloc: h,
            sfree: i,
            z: k,
            tst: n,
            neg: l,
            cmp: m,
            add: o,
            sub: p,
            mul: q,
            sqr: r,
            div: s,
            mredc: t
        }
    }

    function $a(a) {
        return a instanceof _a
    }

    function _a(a) {
        var b = Tc, c = 0, d = 0;
        if (n(a) && (a = f(a)), o(a) && (a = new Uint8Array(a)), void 0 === a); else if (m(a)) {
            var e = Math.abs(a);
            e > 4294967295 ? (b = new Uint32Array(2), b[0] = 0 | e, b[1] = e / 4294967296 | 0, c = 52) : e > 0 ? (b = new Uint32Array(1), b[0] = e, c = 32) : (b = Tc, c = 0), d = 0 > a ? -1 : 1
        } else if (p(a)) {
            for (var g = 0; !a[g]; g++);
            if (c = 8 * (a.length - g), !c)return Vc;
            b = new Uint32Array(c + 31 >> 5);
            for (var h = a.length - 4; h >= g; h -= 4)b[a.length - 4 - h >> 2] = a[h] << 24 | a[h + 1] << 16 | a[h + 2] << 8 | a[h + 3];
            g - h === 3 ? b[b.length - 1] = a[g] : g - h === 2 ? b[b.length - 1] = a[g] << 8 | a[g + 1] : g - h === 1 && (b[b.length - 1] = a[g] << 16 | a[g + 1] << 8 | a[g + 2]), d = 1
        } else {
            if ("object" != typeof a || null === a)throw new TypeError("number is of unexpected type");
            b = new Uint32Array(a.limbs), c = a.bitLength, d = a.sign
        }
        this.limbs = b, this.bitLength = c, this.sign = d
    }

    function ab(a) {
        a = a || 16;
        var b = this.limbs, c = this.bitLength, e = "";
        if (16 !== a)throw new d("bad radix");
        for (var f = (c + 31 >> 5) - 1; f >= 0; f--) {
            var g = b[f].toString(16);
            e += "00000000".substr(g.length), e += g
        }
        return e = e.replace(/^0+/, ""), e.length || (e = "0"), this.sign < 0 && (e = "-" + e), e
    }

    function bb() {
        var a = this.bitLength, b = this.limbs;
        if (0 === a)return new Uint8Array(0);
        for (var c = a + 7 >> 3, d = new Uint8Array(c), e = 0; c > e; e++) {
            var f = c - e - 1;
            d[e] = b[f >> 2] >> ((3 & f) << 3)
        }
        return d
    }

    function cb() {
        var a = this.limbs, b = this.bitLength, c = this.sign;
        if (!c)return 0;
        if (32 >= b)return c * (a[0] >>> 0);
        if (52 >= b)return c * (4294967296 * (a[1] >>> 0) + (a[0] >>> 0));
        var d, e, f = 0;
        for (d = a.length - 1; d >= 0; d--)if (0 !== (e = a[d])) {
            for (; 0 === (e << f & 2147483648);)f++;
            break
        }
        return 0 === d ? c * (a[0] >>> 0) : c * (1048576 * ((a[d] << f | (f ? a[d - 1] >>> 32 - f : 0)) >>> 0) + ((a[d - 1] << f | (f && d > 1 ? a[d - 2] >>> 32 - f : 0)) >>> 12)) * Math.pow(2, 32 * d - f - 52)
    }

    function db(a) {
        var b = this.limbs, c = this.bitLength;
        if (a >= c)return this;
        var d = new _a, e = a + 31 >> 5, f = a % 32;
        return d.limbs = new Uint32Array(b.subarray(0, e)), d.bitLength = a, d.sign = this.sign, f && (d.limbs[e - 1] &= -1 >>> 32 - f), d
    }

    function eb(a, b) {
        if (!m(a))throw new TypeError("TODO");
        if (void 0 !== b && !m(b))throw new TypeError("TODO");
        var c = this.limbs, d = this.bitLength;
        if (0 > a)throw new RangeError("TODO");
        if (a >= d)return Vc;
        (void 0 === b || b > d - a) && (b = d - a);
        var e, f = new _a, g = a >> 5, h = a + b + 31 >> 5, i = b + 31 >> 5, j = a % 32, k = b % 32;
        if (e = new Uint32Array(i), j) {
            for (var l = 0; h - g - 1 > l; l++)e[l] = c[g + l] >>> j | c[g + l + 1] << 32 - j;
            e[l] = c[g + l] >>> j
        } else e.set(c.subarray(g, h));
        return k && (e[i - 1] &= -1 >>> 32 - k), f.limbs = e, f.bitLength = b, f.sign = this.sign, f
    }

    function fb() {
        var a = new _a;
        return a.limbs = this.limbs, a.bitLength = this.bitLength, a.sign = -1 * this.sign, a
    }

    function gb(a) {
        $a(a) || (a = new _a(a));
        var b = this.limbs, c = b.length, d = a.limbs, e = d.length, f = 0;
        return this.sign < a.sign ? -1 : this.sign > a.sign ? 1 : (Sc.set(b, 0), Sc.set(d, c), f = Za.cmp(0, c << 2, c << 2, e << 2), f * this.sign)
    }

    function hb(a) {
        if ($a(a) || (a = new _a(a)), !this.sign)return a;
        if (!a.sign)return this;
        var b, c, d, e, f = this.bitLength, g = this.limbs, h = g.length, i = this.sign, j = a.bitLength, k = a.limbs, l = k.length, m = a.sign, n = new _a;
        b = (f > j ? f : j) + (i * m > 0 ? 1 : 0), c = b + 31 >> 5, Za.sreset();
        var o = Za.salloc(h << 2), p = Za.salloc(l << 2), q = Za.salloc(c << 2);
        return Za.z(q - o + (c << 2), 0, o), Sc.set(g, o >> 2), Sc.set(k, p >> 2), i * m > 0 ? (Za.add(o, h << 2, p, l << 2, q, c << 2), d = i) : i > m ? (e = Za.sub(o, h << 2, p, l << 2, q, c << 2), d = e ? m : i) : (e = Za.sub(p, l << 2, o, h << 2, q, c << 2), d = e ? i : m), e && Za.neg(q, c << 2, q, c << 2), 0 === Za.tst(q, c << 2) ? Vc : (n.limbs = new Uint32Array(Sc.subarray(q >> 2, (q >> 2) + c)), n.bitLength = b, n.sign = d, n)
    }

    function ib(a) {
        return $a(a) || (a = new _a(a)), this.add(a.negate())
    }

    function jb(a) {
        if ($a(a) || (a = new _a(a)), !this.sign || !a.sign)return Vc;
        var b, c, d = this.bitLength, e = this.limbs, f = e.length, g = a.bitLength, h = a.limbs, i = h.length, j = new _a;
        b = d + g, c = b + 31 >> 5, Za.sreset();
        var k = Za.salloc(f << 2), l = Za.salloc(i << 2), m = Za.salloc(c << 2);
        return Za.z(m - k + (c << 2), 0, k), Sc.set(e, k >> 2), Sc.set(h, l >> 2), Za.mul(k, f << 2, l, i << 2, m, c << 2), j.limbs = new Uint32Array(Sc.subarray(m >> 2, (m >> 2) + c)), j.sign = this.sign * a.sign, j.bitLength = b, j
    }

    function kb() {
        if (!this.sign)return Vc;
        var a, b, c = this.bitLength, d = this.limbs, e = d.length, f = new _a;
        a = c << 1, b = a + 31 >> 5, Za.sreset();
        var g = Za.salloc(e << 2), h = Za.salloc(b << 2);
        return Za.z(h - g + (b << 2), 0, g), Sc.set(d, g >> 2), Za.sqr(g, e << 2, h), f.limbs = new Uint32Array(Sc.subarray(h >> 2, (h >> 2) + b)), f.bitLength = a, f.sign = 1, f
    }

    function lb(a) {
        $a(a) || (a = new _a(a));
        var b, c, d = this.bitLength, e = this.limbs, f = e.length, g = a.bitLength, h = a.limbs, i = h.length, j = Vc, k = Vc;
        Za.sreset();
        var l = Za.salloc(f << 2), m = Za.salloc(i << 2), n = Za.salloc(f << 2);
        return Za.z(n - l + (f << 2), 0, l), Sc.set(e, l >> 2), Sc.set(h, m >> 2), Za.div(l, f << 2, m, i << 2, n), b = Za.tst(n, f << 2) >> 2, b && (j = new _a, j.limbs = new Uint32Array(Sc.subarray(n >> 2, (n >> 2) + b)), j.bitLength = b << 5 > d ? d : b << 5, j.sign = this.sign * a.sign), c = Za.tst(l, i << 2) >> 2, c && (k = new _a, k.limbs = new Uint32Array(Sc.subarray(l >> 2, (l >> 2) + c)), k.bitLength = c << 5 > g ? g : c << 5, k.sign = this.sign), {
            quotient: j,
            remainder: k
        }
    }

    function mb(a, b) {
        var c, d, e, f, g = 0 > a ? -1 : 1, h = 0 > b ? -1 : 1, i = 1, j = 0, k = 0, l = 1;
        for (a *= g, b *= h, f = b > a, f && (e = a, a = b, b = e, e = g, g = h, h = e), d = Math.floor(a / b), c = a - d * b; c;)e = i - d * j, i = j, j = e, e = k - d * l, k = l, l = e, a = b, b = c, d = Math.floor(a / b), c = a - d * b;
        return j *= g, l *= h, f && (e = j, j = l, l = e), {gcd: b, x: j, y: l}
    }

    function nb(a, b) {
        $a(a) || (a = new _a(a)), $a(b) || (b = new _a(b));
        var c = a.sign, d = b.sign;
        0 > c && (a = a.negate()), 0 > d && (b = b.negate());
        var e = a.compare(b);
        if (0 > e) {
            var f = a;
            a = b, b = f, f = c, c = d, d = f
        }
        var g, h, i, j = Wc, k = Vc, l = b.bitLength, m = Vc, n = Wc, o = a.bitLength;
        for (g = a.divide(b); (h = g.remainder) !== Vc;)i = g.quotient, g = j.subtract(i.multiply(k).clamp(l)).clamp(l), j = k, k = g, g = m.subtract(i.multiply(n).clamp(o)).clamp(o), m = n, n = g, a = b, b = h, g = a.divide(b);
        if (0 > c && (k = k.negate()), 0 > d && (n = n.negate()), 0 > e) {
            var f = k;
            k = n, n = f
        }
        return {gcd: b, x: k, y: n}
    }

    function ob() {
        if (_a.apply(this, arguments), this.valueOf() < 1)throw new RangeError;
        if (!(this.bitLength <= 32)) {
            var a;
            if (1 & this.limbs[0]) {
                var b = (this.bitLength + 31 & -32) + 1, c = new Uint32Array(b + 31 >> 5);
                c[c.length - 1] = 1, a = new _a, a.sign = 1, a.bitLength = b, a.limbs = c;
                var d = mb(4294967296, this.limbs[0]).y;
                this.coefficient = 0 > d ? -d : 4294967296 - d, this.comodulus = a, this.comodulusRemainder = a.divide(this).remainder, this.comodulusRemainderSquare = a.square().divide(this).remainder
            }
        }
    }

    function pb(a) {
        return $a(a) || (a = new _a(a)), a.bitLength <= 32 && this.bitLength <= 32 ? new _a(a.valueOf() % this.valueOf()) : a.compare(this) < 0 ? a : a.divide(this).remainder
    }

    function qb(a) {
        a = this.reduce(a);
        var b = nb(this, a);
        return 1 !== b.gcd.valueOf() ? null : (b = b.y, b.sign < 0 && (b = b.add(this).clamp(this.bitLength)), b)
    }

    function rb(a, b) {
        $a(a) || (a = new _a(a)), $a(b) || (b = new _a(b));
        for (var c = 0, d = 0; d < b.limbs.length; d++)for (var e = b.limbs[d]; e;)1 & e && c++, e >>>= 1;
        var f = 8;
        b.bitLength <= 4536 && (f = 7), b.bitLength <= 1736 && (f = 6), b.bitLength <= 630 && (f = 5), b.bitLength <= 210 && (f = 4), b.bitLength <= 60 && (f = 3), b.bitLength <= 12 && (f = 2), 1 << f - 1 >= c && (f = 1), a = sb(this.reduce(a).multiply(this.comodulusRemainderSquare), this);
        var g = sb(a.square(), this), h = new Array(1 << f - 1);
        h[0] = a, h[1] = sb(a.multiply(g), this);
        for (var d = 2; 1 << f - 1 > d; d++)h[d] = sb(h[d - 1].multiply(g), this);
        for (var i = this.comodulusRemainder, j = i, d = b.limbs.length - 1; d >= 0; d--)for (var e = b.limbs[d], k = 32; k > 0;)if (2147483648 & e) {
            for (var l = e >>> 32 - f, m = f; 0 === (1 & l);)l >>>= 1, m--;
            for (var n = h[l >>> 1]; l;)l >>>= 1, j !== i && (j = sb(j.square(), this));
            j = j !== i ? sb(j.multiply(n), this) : n, e <<= m, k -= m
        } else j !== i && (j = sb(j.square(), this)), e <<= 1, k--;
        return j = sb(j, this)
    }

    function sb(a, b) {
        var c = a.limbs, d = c.length, e = b.limbs, f = e.length, g = b.coefficient;
        Za.sreset();
        var h = Za.salloc(d << 2), i = Za.salloc(f << 2), j = Za.salloc(f << 2);
        Za.z(j - h + (f << 2), 0, h), Sc.set(c, h >> 2), Sc.set(e, i >> 2), Za.mredc(h, d << 2, i, f << 2, g, j);
        var k = new _a;
        return k.limbs = new Uint32Array(Sc.subarray(j >> 2, (j >> 2) + f)), k.bitLength = b.bitLength, k.sign = 1, k
    }

    function tb(a) {
        var b = new _a(this), c = 0;
        for (b.limbs[0] -= 1; 0 === b.limbs[c >> 5];)c += 32;
        for (; 0 === (b.limbs[c >> 5] >> (31 & c) & 1);)c++;
        b = b.slice(c);
        for (var d = new ob(this), e = this.subtract(Wc), f = new _a(this), g = this.limbs.length - 1; 0 === f.limbs[g];)g--;
        for (; --a >= 0;) {
            for (Wa(f.limbs), f.limbs[0] < 2 && (f.limbs[0] += 2); f.compare(e) >= 0;)f.limbs[g] >>>= 1;
            var h = d.power(f, b);
            if (0 !== h.compare(Wc) && 0 !== h.compare(e)) {
                for (var i = c; --i > 0;) {
                    if (h = h.square().divide(d).remainder, 0 === h.compare(Wc))return !1;
                    if (0 === h.compare(e))break
                }
                if (0 === i)return !1
            }
        }
        return !0
    }

    function ub(a) {
        a = a || 80;
        var b = this.limbs, c = 0;
        if (0 === (1 & b[0]))return !1;
        if (1 >= a)return !0;
        var d = 0, e = 0, f = 0;
        for (c = 0; c < b.length; c++) {
            for (var g = b[c]; g;)d += 3 & g, g >>>= 2;
            for (var h = b[c]; h;)e += 3 & h, h >>>= 2, e -= 3 & h, h >>>= 2;
            for (var i = b[c]; i;)f += 15 & i, i >>>= 4, f -= 15 & i, i >>>= 4
        }
        return d % 3 && e % 5 && f % 17 ? 2 >= a ? !0 : tb.call(this, a >>> 1) : !1
    }

    function vb(a) {
        if (Yc.length >= a)return Yc.slice(0, a);
        for (var b = Yc[Yc.length - 1] + 2; Yc.length < a; b += 2) {
            for (var c = 0, d = Yc[c]; b >= d * d && b % d != 0; d = Yc[++c]);
            d * d > b && Yc.push(b)
        }
        return Yc
    }

    function wb(a, c) {
        var d = a + 31 >> 5, e = new _a({sign: 1, bitLength: a, limbs: d}), f = e.limbs, g = 1e4;
        512 >= a && (g = 2200), 256 >= a && (g = 600);
        var h = vb(g), i = new Uint32Array(g), j = a * b.Math.LN2 | 0, k = 27;
        for (a >= 250 && (k = 12), a >= 450 && (k = 6), a >= 850 && (k = 3), a >= 1300 && (k = 2); ;) {
            Wa(f), f[0] |= 1, f[d - 1] |= 1 << (a - 1 & 31), 31 & a && (f[d - 1] &= l(a + 1 & 31) - 1), i[0] = 1;
            for (var m = 1; g > m; m++)i[m] = e.divide(h[m]).remainder.valueOf();
            a:for (var n = 0; j > n; n += 2, f[0] += 2) {
                for (var m = 1; g > m; m++)if ((i[m] + n) % h[m] === 0)continue a;
                if (("function" != typeof c || c(e)) && tb.call(e, k))return e
            }
        }
    }

    function xb(a) {
        a = a || {}, this.key = null, this.result = null, this.reset(a)
    }

    function yb(a) {
        a = a || {}, this.result = null;
        var b = a.key;
        if (void 0 !== b) {
            if (!(b instanceof Array))throw new TypeError("unexpected key type");
            var c = b.length;
            if (2 !== c && 3 !== c && 8 !== c)throw new SyntaxError("unexpected key type");
            var d = [];
            d[0] = new ob(b[0]), d[1] = new _a(b[1]), c > 2 && (d[2] = new _a(b[2])), c > 3 && (d[3] = new ob(b[3]), d[4] = new ob(b[4]), d[5] = new _a(b[5]), d[6] = new _a(b[6]), d[7] = new _a(b[7])), this.key = d
        }
        return this
    }

    function zb(a) {
        if (!this.key)throw new c("no key is associated with the instance");
        n(a) && (a = f(a)), o(a) && (a = new Uint8Array(a));
        var b;
        if (p(a))b = new _a(a); else {
            if (!$a(a))throw new TypeError("unexpected data type");
            b = a
        }
        if (this.key[0].compare(b) <= 0)throw new RangeError("data too large");
        var d = this.key[0], e = this.key[1], g = d.power(b, e).toBytes(), h = d.bitLength + 7 >> 3;
        if (g.length < h) {
            var i = new Uint8Array(h);
            i.set(g, h - g.length), g = i
        }
        return this.result = g, this
    }

    function Ab(a) {
        if (!this.key)throw new c("no key is associated with the instance");
        if (this.key.length < 3)throw new c("key isn't suitable for decription");
        n(a) && (a = f(a)), o(a) && (a = new Uint8Array(a));
        var b;
        if (p(a))b = new _a(a); else {
            if (!$a(a))throw new TypeError("unexpected data type");
            b = a
        }
        if (this.key[0].compare(b) <= 0)throw new RangeError("data too large");
        var d;
        if (this.key.length > 3) {
            for (var e = this.key[0], g = this.key[3], h = this.key[4], i = this.key[5], j = this.key[6], k = this.key[7], l = g.power(b, i), m = h.power(b, j), q = l.subtract(m); q.sign < 0;)q = q.add(g);
            var r = g.reduce(k.multiply(q));
            d = r.multiply(h).add(m).clamp(e.bitLength).toBytes()
        } else {
            var e = this.key[0], s = this.key[2];
            d = e.power(b, s).toBytes()
        }
        var t = e.bitLength + 7 >> 3;
        if (d.length < t) {
            var u = new Uint8Array(t);
            u.set(d, t - d.length), d = u
        }
        return this.result = d, this
    }

    function Bb(a, b) {
        if (a = a || 2048, b = b || 65537, 512 > a)throw new d("bit length is too small");
        if (n(b) && (b = f(b)), o(b) && (b = new Uint8Array(b)), !(p(b) || m(b) || $a(b)))throw new TypeError("unexpected exponent type");
        if (b = new _a(b), 0 === (1 & b.limbs[0]))throw new d("exponent must be an odd number");
        var c, b, e, g, h, i, j, k, l, q;
        g = wb(a >> 1, function (a) {
            return i = new _a(a), i.limbs[0] -= 1, 1 == nb(i, b).gcd.valueOf()
        }), h = wb(a - (a >> 1), function (d) {
            return c = new ob(g.multiply(d)), c.limbs[(a + 31 >> 5) - 1] >>> (a - 1 & 31) ? (j = new _a(d), j.limbs[0] -= 1, 1 == nb(j, b).gcd.valueOf()) : !1
        }), e = new ob(i.multiply(j)).inverse(b), k = e.divide(i).remainder, l = e.divide(j).remainder, g = new ob(g), h = new ob(h);
        var q = g.inverse(h);
        return [c, b, e, g, h, k, l, q]
    }

    function Cb(a) {
        if (a = a || {}, !a.hash)throw new SyntaxError("option 'hash' is required");
        if (!a.hash.HASH_SIZE)throw new SyntaxError("option 'hash' supplied doesn't seem to be a valid hash function");
        this.hash = a.hash, this.label = null, this.reset(a)
    }

    function Db(a) {
        a = a || {};
        var b = a.label;
        if (void 0 !== b) {
            if (o(b) || p(b))b = new Uint8Array(b); else {
                if (!n(b))throw new TypeError("unexpected label type");
                b = f(b)
            }
            this.label = b.length > 0 ? b : null
        } else this.label = null;
        yb.call(this, a)
    }

    function Eb(a) {
        if (!this.key)throw new c("no key is associated with the instance");
        var b = Math.ceil(this.key[0].bitLength / 8), e = this.hash.HASH_SIZE, g = a.byteLength || a.length || 0, h = b - g - 2 * e - 2;
        if (g > b - 2 * this.hash.HASH_SIZE - 2)throw new d("data too large");
        var i = new Uint8Array(b), j = i.subarray(1, e + 1), k = i.subarray(e + 1);
        if (p(a))k.set(a, e + h + 1); else if (o(a))k.set(new Uint8Array(a), e + h + 1); else {
            if (!n(a))throw new TypeError("unexpected data type");
            k.set(f(a), e + h + 1)
        }
        k.set(this.hash.reset().process(this.label || "").finish().result, 0), k[e + h] = 1, Wa(j);
        for (var l = Gb.call(this, j, k.length), m = 0; m < k.length; m++)k[m] ^= l[m];
        for (var q = Gb.call(this, k, j.length), m = 0; m < j.length; m++)j[m] ^= q[m];
        return zb.call(this, i), this
    }

    function Fb(a) {
        if (!this.key)throw new c("no key is associated with the instance");
        var b = Math.ceil(this.key[0].bitLength / 8), f = this.hash.HASH_SIZE, g = a.byteLength || a.length || 0;
        if (g !== b)throw new d("bad data");
        Ab.call(this, a);
        var h = this.result[0], i = this.result.subarray(1, f + 1), j = this.result.subarray(f + 1);
        if (0 !== h)throw new e("decryption failed");
        for (var k = Gb.call(this, j, i.length), l = 0; l < i.length; l++)i[l] ^= k[l];
        for (var m = Gb.call(this, i, j.length), l = 0; l < j.length; l++)j[l] ^= m[l];
        for (var n = this.hash.reset().process(this.label || "").finish().result, l = 0; f > l; l++)if (n[l] !== j[l])throw new e("decryption failed");
        for (var o = f; o < j.length; o++) {
            var p = j[o];
            if (1 === p)break;
            if (0 !== p)throw new e("decryption failed")
        }
        if (o === j.length)throw new e("decryption failed");
        return this.result = j.subarray(o + 1), this
    }

    function Gb(a, b) {
        a = a || "", b = b || 0;
        for (var c = this.hash.HASH_SIZE, d = new Uint8Array(b), e = new Uint8Array(4), f = Math.ceil(b / c), g = 0; f > g; g++) {
            e[0] = g >>> 24, e[1] = g >>> 16 & 255, e[2] = g >>> 8 & 255, e[3] = 255 & g;
            var h = d.subarray(g * c), i = this.hash.reset().process(a).process(e).finish().result;
            i.length > h.length && (i = i.subarray(0, h.length)), h.set(i)
        }
        return d
    }

    function Hb(a) {
        if (a = a || {}, !a.hash)throw new SyntaxError("option 'hash' is required");
        if (!a.hash.HASH_SIZE)throw new SyntaxError("option 'hash' supplied doesn't seem to be a valid hash function");
        this.hash = a.hash, this.saltLength = 4, this.reset(a)
    }

    function Ib(a) {
        a = a || {}, yb.call(this, a);
        var b = a.saltLength;
        if (void 0 !== b) {
            if (!m(b) || 0 > b)throw new TypeError("saltLength should be a non-negative number");
            if (null !== this.key && Math.ceil((this.key[0].bitLength - 1) / 8) < this.hash.HASH_SIZE + b + 2)throw new SyntaxError("saltLength is too large");
            this.saltLength = b
        } else this.saltLength = 4
    }

    function Jb(a) {
        if (!this.key)throw new c("no key is associated with the instance");
        var b = this.key[0].bitLength, d = this.hash.HASH_SIZE, e = Math.ceil((b - 1) / 8), f = this.saltLength, g = e - f - d - 2, h = new Uint8Array(e), i = h.subarray(e - d - 1, e - 1), j = h.subarray(0, e - d - 1), k = j.subarray(g + 1), l = new Uint8Array(8 + d + f), m = l.subarray(8, 8 + d), n = l.subarray(8 + d);
        m.set(this.hash.reset().process(a).finish().result), f > 0 && Wa(n), j[g] = 1, k.set(n), i.set(this.hash.reset().process(l).finish().result);
        for (var o = Gb.call(this, i, j.length), p = 0; p < j.length; p++)j[p] ^= o[p];
        h[e - 1] = 188;
        var q = 8 * e - b + 1;
        return q % 8 && (h[0] &= 255 >>> q), Ab.call(this, h), this
    }

    function Kb(a, b) {
        if (!this.key)throw new c("no key is associated with the instance");
        var d = this.key[0].bitLength, f = this.hash.HASH_SIZE, g = Math.ceil((d - 1) / 8), h = this.saltLength, i = g - h - f - 2;
        zb.call(this, a);
        var j = this.result;
        if (188 !== j[g - 1])throw new e("bad signature");
        var k = j.subarray(g - f - 1, g - 1), l = j.subarray(0, g - f - 1), m = l.subarray(i + 1), n = 8 * g - d + 1;
        if (n % 8 && j[0] >>> 8 - n)throw new e("bad signature");
        for (var o = Gb.call(this, k, l.length), p = 0; p < l.length; p++)l[p] ^= o[p];
        n % 8 && (j[0] &= 255 >>> n);
        for (var p = 0; i > p; p++)if (0 !== l[p])throw new e("bad signature");
        if (1 !== l[i])throw new e("bad signature");
        var q = new Uint8Array(8 + f + h), r = q.subarray(8, 8 + f), s = q.subarray(8 + f);
        r.set(this.hash.reset().process(b).finish().result), s.set(m);
        for (var t = this.hash.reset().process(q).finish().result, p = 0; f > p; p++)if (k[p] !== t[p])throw new e("bad signature");
        return this
    }

    function Lb(a, b) {
        if (void 0 === a)throw new SyntaxError("bitlen required");
        if (void 0 === b)throw new SyntaxError("e required");
        for (var c = Bb(a, b), d = 0; d < c.length; d++)$a(c[d]) && (c[d] = c[d].toBytes());
        return c
    }

    function Mb(a, b, c) {
        if (void 0 === a)throw new SyntaxError("data required");
        if (void 0 === b)throw new SyntaxError("key required");
        return new Cb({hash: ba(), key: b, label: c}).encrypt(a).result
    }

    function Nb(a, b, c) {
        if (void 0 === a)throw new SyntaxError("data required");
        if (void 0 === b)throw new SyntaxError("key required");
        return new Cb({hash: ba(), key: b, label: c}).decrypt(a).result
    }

    function Ob(a, b, c) {
        if (void 0 === a)throw new SyntaxError("data required");
        if (void 0 === b)throw new SyntaxError("key required");
        return new Cb({hash: ha(), key: b, label: c}).encrypt(a).result
    }

    function Pb(a, b, c) {
        if (void 0 === a)throw new SyntaxError("data required");
        if (void 0 === b)throw new SyntaxError("key required");
        return new Cb({hash: ha(), key: b, label: c}).decrypt(a).result
    }

    function Qb(a, b, c) {
        if (void 0 === a)throw new SyntaxError("data required");
        if (void 0 === b)throw new SyntaxError("key required");
        return new Hb({hash: ba(), key: b, saltLength: c}).sign(a).result
    }

    function Rb(a, b, c, d) {
        if (void 0 === a)throw new SyntaxError("signature required");
        if (void 0 === b)throw new SyntaxError("data required");
        if (void 0 === c)throw new SyntaxError("key required");
        try {
            return new Hb({hash: ba(), key: c, saltLength: d}).verify(a, b), !0
        } catch (a) {
            if (!(a instanceof e))throw a
        }
        return !1
    }

    function Sb(a, b, c) {
        if (void 0 === a)throw new SyntaxError("data required");
        if (void 0 === b)throw new SyntaxError("key required");
        return new Hb({hash: ha(), key: b, saltLength: c}).sign(a).result
    }

    function Tb(a, b, c, d) {
        if (void 0 === a)throw new SyntaxError("signature required");
        if (void 0 === b)throw new SyntaxError("data required");
        if (void 0 === c)throw new SyntaxError("key required");
        try {
            return new Hb({hash: ha(), key: c, saltLength: d}).verify(a, b), !0
        } catch (a) {
            if (!(a instanceof e))throw a
        }
        return !1
    }

    c.prototype = Object.create(Error.prototype, {name: {value: "IllegalStateError"}}), d.prototype = Object.create(Error.prototype, {name: {value: "IllegalArgumentError"}}), e.prototype = Object.create(Error.prototype, {name: {value: "SecurityError"}});
    var Ub = b.Float64Array || b.Float32Array, Vb = b.console, Wb = !b.location.protocol.search(/https:|file:|chrome:|chrome-extension:/);
    Wb || void 0 === Vb || Vb.warn("asmCrypto seems to be load from an insecure origin; this may cause to MitM-attack vulnerability. Consider using secure transport protocol."), a.string_to_bytes = f, a.hex_to_bytes = g, a.base64_to_bytes = h, a.bytes_to_string = i, a.bytes_to_hex = j, a.bytes_to_base64 = k, b.IllegalStateError = c, b.IllegalArgumentError = d, b.SecurityError = e;
    var Xb = function () {
        "use strict";
        function a() {
            e = [], f = [];
            var a, b, c = 1;
            for (a = 0; 255 > a; a++)e[a] = c, b = 128 & c, c <<= 1, c &= 255, 128 === b && (c ^= 27), c ^= e[a], f[e[a]] = a;
            e[255] = e[0], f[0] = 0, k = !0
        }

        function b(a, b) {
            var c = e[(f[a] + f[b]) % 255];
            return (0 === a || 0 === b) && (c = 0), c
        }

        function c(a) {
            var b = e[255 - f[a]];
            return 0 === a && (b = 0), b
        }

        function d() {
            function d(a) {
                var b, d, e;
                for (d = e = c(a), b = 0; 4 > b; b++)d = 255 & (d << 1 | d >>> 7), e ^= d;
                return e ^= 99
            }

            k || a(), g = [], h = [], i = [[], [], [], []], j = [[], [], [], []];
            for (var e = 0; 256 > e; e++) {
                var f = d(e);
                g[e] = f, h[f] = e, i[0][e] = b(2, f) << 24 | f << 16 | f << 8 | b(3, f), j[0][f] = b(14, e) << 24 | b(9, e) << 16 | b(13, e) << 8 | b(11, e);
                for (var l = 1; 4 > l; l++)i[l][e] = i[l - 1][e] >>> 8 | i[l - 1][e] << 24, j[l][f] = j[l - 1][f] >>> 8 | j[l - 1][f] << 24
            }
        }

        var e, f, g, h, i, j, k = !1, l = !1, m = function (a, b, c) {
            function e(a, b, c, d, e, h, i, k, l) {
                var n = f.subarray(0, 60), o = f.subarray(256, 316);
                n.set([b, c, d, e, h, i, k, l]);
                for (var p = a, q = 1; 4 * a + 28 > p; p++) {
                    var r = n[p - 1];
                    (p % a === 0 || 8 === a && p % a === 4) && (r = g[r >>> 24] << 24 ^ g[r >>> 16 & 255] << 16 ^ g[r >>> 8 & 255] << 8 ^ g[255 & r]), p % a === 0 && (r = r << 8 ^ r >>> 24 ^ q << 24, q = q << 1 ^ (128 & q ? 27 : 0)), n[p] = n[p - a] ^ r
                }
                for (var s = 0; p > s; s += 4)for (var t = 0; 4 > t; t++) {
                    var r = n[p - (4 + s) + (4 - t) % 4];
                    4 > s || s >= p - 4 ? o[s + t] = r : o[s + t] = j[0][g[r >>> 24]] ^ j[1][g[r >>> 16 & 255]] ^ j[2][g[r >>> 8 & 255]] ^ j[3][g[255 & r]]
                }
                m.set_rounds(a + 5)
            }

            l || d();
            var f = new Uint32Array(c);
            f.set(g, 512), f.set(h, 768);
            for (var k = 0; 4 > k; k++)f.set(i[k], 4096 + 1024 * k >> 2), f.set(j[k], 8192 + 1024 * k >> 2);
            var m = function (a, b, c) {
                "use asm";
                var d = 0, e = 0, f = 0, g = 0, h = 0, i = 0, j = 0, k = 0, l = 0, m = 0, n = 0, o = 0, p = 0, q = 0, r = 0, s = 0, t = 0, u = 0, v = 0, w = 0, x = 0;
                var y = new a.Uint32Array(c), z = new a.Uint8Array(c);

                function A(X, Y, Z, $, _, aa, ba, ca) {
                    X = X | 0;
                    Y = Y | 0;
                    Z = Z | 0;
                    $ = $ | 0;
                    _ = _ | 0;
                    aa = aa | 0;
                    ba = ba | 0;
                    ca = ca | 0;
                    var da = 0, ea = 0, fa = 0, ga = 0, ha = 0, ia = 0, ja = 0, ka = 0;
                    da = Z | 1024, ea = Z | 2048, fa = Z | 3072;
                    _ = _ ^ y[(X | 0) >> 2], aa = aa ^ y[(X | 4) >> 2], ba = ba ^ y[(X | 8) >> 2], ca = ca ^ y[(X | 12) >> 2];
                    for (ka = 16; (ka | 0) <= $ << 4; ka = ka + 16 | 0) {
                        ga = y[(Z | _ >> 22 & 1020) >> 2] ^ y[(da | aa >> 14 & 1020) >> 2] ^ y[(ea | ba >> 6 & 1020) >> 2] ^ y[(fa | ca << 2 & 1020) >> 2] ^ y[(X | ka | 0) >> 2], ha = y[(Z | aa >> 22 & 1020) >> 2] ^ y[(da | ba >> 14 & 1020) >> 2] ^ y[(ea | ca >> 6 & 1020) >> 2] ^ y[(fa | _ << 2 & 1020) >> 2] ^ y[(X | ka | 4) >> 2], ia = y[(Z | ba >> 22 & 1020) >> 2] ^ y[(da | ca >> 14 & 1020) >> 2] ^ y[(ea | _ >> 6 & 1020) >> 2] ^ y[(fa | aa << 2 & 1020) >> 2] ^ y[(X | ka | 8) >> 2], ja = y[(Z | ca >> 22 & 1020) >> 2] ^ y[(da | _ >> 14 & 1020) >> 2] ^ y[(ea | aa >> 6 & 1020) >> 2] ^ y[(fa | ba << 2 & 1020) >> 2] ^ y[(X | ka | 12) >> 2];
                        _ = ga, aa = ha, ba = ia, ca = ja
                    }
                    d = y[(Y | _ >> 22 & 1020) >> 2] << 24 ^ y[(Y | aa >> 14 & 1020) >> 2] << 16 ^ y[(Y | ba >> 6 & 1020) >> 2] << 8 ^ y[(Y | ca << 2 & 1020) >> 2] ^ y[(X | ka | 0) >> 2], e = y[(Y | aa >> 22 & 1020) >> 2] << 24 ^ y[(Y | ba >> 14 & 1020) >> 2] << 16 ^ y[(Y | ca >> 6 & 1020) >> 2] << 8 ^ y[(Y | _ << 2 & 1020) >> 2] ^ y[(X | ka | 4) >> 2], f = y[(Y | ba >> 22 & 1020) >> 2] << 24 ^ y[(Y | ca >> 14 & 1020) >> 2] << 16 ^ y[(Y | _ >> 6 & 1020) >> 2] << 8 ^ y[(Y | aa << 2 & 1020) >> 2] ^ y[(X | ka | 8) >> 2], g = y[(Y | ca >> 22 & 1020) >> 2] << 24 ^ y[(Y | _ >> 14 & 1020) >> 2] << 16 ^ y[(Y | aa >> 6 & 1020) >> 2] << 8 ^ y[(Y | ba << 2 & 1020) >> 2] ^ y[(X | ka | 12) >> 2]
                }

                function B(X, Y, Z, $) {
                    X = X | 0;
                    Y = Y | 0;
                    Z = Z | 0;
                    $ = $ | 0;
                    A(0, 2048, 4096, x, X, Y, Z, $)
                }

                function C(X, Y, Z, $) {
                    X = X | 0;
                    Y = Y | 0;
                    Z = Z | 0;
                    $ = $ | 0;
                    var _ = 0;
                    A(1024, 3072, 8192, x, X, $, Z, Y);
                    _ = e, e = g, g = _
                }

                function D(X, Y, Z, $) {
                    X = X | 0;
                    Y = Y | 0;
                    Z = Z | 0;
                    $ = $ | 0;
                    A(0, 2048, 4096, x, h ^ X, i ^ Y, j ^ Z, k ^ $);
                    h = d, i = e, j = f, k = g
                }

                function E(X, Y, Z, $) {
                    X = X | 0;
                    Y = Y | 0;
                    Z = Z | 0;
                    $ = $ | 0;
                    var _ = 0;
                    A(1024, 3072, 8192, x, X, $, Z, Y);
                    _ = e, e = g, g = _;
                    d = d ^ h, e = e ^ i, f = f ^ j, g = g ^ k;
                    h = X, i = Y, j = Z, k = $
                }

                function F(X, Y, Z, $) {
                    X = X | 0;
                    Y = Y | 0;
                    Z = Z | 0;
                    $ = $ | 0;
                    A(0, 2048, 4096, x, h, i, j, k);
                    h = d = d ^ X, i = e = e ^ Y, j = f = f ^ Z, k = g = g ^ $
                }

                function G(X, Y, Z, $) {
                    X = X | 0;
                    Y = Y | 0;
                    Z = Z | 0;
                    $ = $ | 0;
                    A(0, 2048, 4096, x, h, i, j, k);
                    d = d ^ X, e = e ^ Y, f = f ^ Z, g = g ^ $;
                    h = X, i = Y, j = Z, k = $
                }

                function H(X, Y, Z, $) {
                    X = X | 0;
                    Y = Y | 0;
                    Z = Z | 0;
                    $ = $ | 0;
                    A(0, 2048, 4096, x, h, i, j, k);
                    h = d, i = e, j = f, k = g;
                    d = d ^ X, e = e ^ Y, f = f ^ Z, g = g ^ $
                }

                function I(X, Y, Z, $) {
                    X = X | 0;
                    Y = Y | 0;
                    Z = Z | 0;
                    $ = $ | 0;
                    A(0, 2048, 4096, x, l, m, n, o);
                    o = ~s & o | s & o + 1, n = ~r & n | r & n + ((o | 0) == 0), m = ~q & m | q & m + ((n | 0) == 0), l = ~p & l | p & l + ((m | 0) == 0);
                    d = d ^ X, e = e ^ Y, f = f ^ Z, g = g ^ $
                }

                function J(X, Y, Z, $) {
                    X = X | 0;
                    Y = Y | 0;
                    Z = Z | 0;
                    $ = $ | 0;
                    var _ = 0, aa = 0, ba = 0, ca = 0, da = 0, ea = 0, fa = 0, ga = 0, ha = 0, ia = 0;
                    X = X ^ h, Y = Y ^ i, Z = Z ^ j, $ = $ ^ k;
                    _ = t | 0, aa = u | 0, ba = v | 0, ca = w | 0;
                    for (; (ha | 0) < 128; ha = ha + 1 | 0) {
                        if (_ >>> 31) {
                            da = da ^ X, ea = ea ^ Y, fa = fa ^ Z, ga = ga ^ $
                        }
                        _ = _ << 1 | aa >>> 31, aa = aa << 1 | ba >>> 31, ba = ba << 1 | ca >>> 31, ca = ca << 1;
                        ia = $ & 1;
                        $ = $ >>> 1 | Z << 31, Z = Z >>> 1 | Y << 31, Y = Y >>> 1 | X << 31, X = X >>> 1;
                        if (ia)X = X ^ 3774873600
                    }
                    h = da, i = ea, j = fa, k = ga
                }

                function K(X) {
                    X = X | 0;
                    x = X
                }

                function L(X, Y, Z, $) {
                    X = X | 0;
                    Y = Y | 0;
                    Z = Z | 0;
                    $ = $ | 0;
                    d = X, e = Y, f = Z, g = $
                }

                function M(X, Y, Z, $) {
                    X = X | 0;
                    Y = Y | 0;
                    Z = Z | 0;
                    $ = $ | 0;
                    h = X, i = Y, j = Z, k = $
                }

                function N(X, Y, Z, $) {
                    X = X | 0;
                    Y = Y | 0;
                    Z = Z | 0;
                    $ = $ | 0;
                    l = X, m = Y, n = Z, o = $
                }

                function O(X, Y, Z, $) {
                    X = X | 0;
                    Y = Y | 0;
                    Z = Z | 0;
                    $ = $ | 0;
                    p = X, q = Y, r = Z, s = $
                }

                function P(X, Y, Z, $) {
                    X = X | 0;
                    Y = Y | 0;
                    Z = Z | 0;
                    $ = $ | 0;
                    o = ~s & o | s & $, n = ~r & n | r & Z, m = ~q & m | q & Y, l = ~p & l | p & X
                }

                function Q(X) {
                    X = X | 0;
                    if (X & 15)return -1;
                    z[X | 0] = d >>> 24, z[X | 1] = d >>> 16 & 255, z[X | 2] = d >>> 8 & 255, z[X | 3] = d & 255, z[X | 4] = e >>> 24, z[X | 5] = e >>> 16 & 255, z[X | 6] = e >>> 8 & 255, z[X | 7] = e & 255, z[X | 8] = f >>> 24, z[X | 9] = f >>> 16 & 255, z[X | 10] = f >>> 8 & 255, z[X | 11] = f & 255, z[X | 12] = g >>> 24, z[X | 13] = g >>> 16 & 255, z[X | 14] = g >>> 8 & 255, z[X | 15] = g & 255;
                    return 16
                }

                function R(X) {
                    X = X | 0;
                    if (X & 15)return -1;
                    z[X | 0] = h >>> 24, z[X | 1] = h >>> 16 & 255, z[X | 2] = h >>> 8 & 255, z[X | 3] = h & 255, z[X | 4] = i >>> 24, z[X | 5] = i >>> 16 & 255, z[X | 6] = i >>> 8 & 255, z[X | 7] = i & 255, z[X | 8] = j >>> 24, z[X | 9] = j >>> 16 & 255, z[X | 10] = j >>> 8 & 255, z[X | 11] = j & 255, z[X | 12] = k >>> 24, z[X | 13] = k >>> 16 & 255, z[X | 14] = k >>> 8 & 255, z[X | 15] = k & 255;
                    return 16
                }

                function S() {
                    B(0, 0, 0, 0);
                    t = d, u = e, v = f, w = g
                }

                function T(X, Y, Z) {
                    X = X | 0;
                    Y = Y | 0;
                    Z = Z | 0;
                    var $ = 0;
                    if (Y & 15)return -1;
                    while ((Z | 0) >= 16) {
                        V[X & 7](z[Y | 0] << 24 | z[Y | 1] << 16 | z[Y | 2] << 8 | z[Y | 3], z[Y | 4] << 24 | z[Y | 5] << 16 | z[Y | 6] << 8 | z[Y | 7], z[Y | 8] << 24 | z[Y | 9] << 16 | z[Y | 10] << 8 | z[Y | 11], z[Y | 12] << 24 | z[Y | 13] << 16 | z[Y | 14] << 8 | z[Y | 15]);
                        z[Y | 0] = d >>> 24, z[Y | 1] = d >>> 16 & 255, z[Y | 2] = d >>> 8 & 255, z[Y | 3] = d & 255, z[Y | 4] = e >>> 24, z[Y | 5] = e >>> 16 & 255, z[Y | 6] = e >>> 8 & 255, z[Y | 7] = e & 255, z[Y | 8] = f >>> 24, z[Y | 9] = f >>> 16 & 255, z[Y | 10] = f >>> 8 & 255, z[Y | 11] = f & 255, z[Y | 12] = g >>> 24, z[Y | 13] = g >>> 16 & 255, z[Y | 14] = g >>> 8 & 255, z[Y | 15] = g & 255;
                        $ = $ + 16 | 0, Y = Y + 16 | 0, Z = Z - 16 | 0
                    }
                    return $ | 0
                }

                function U(X, Y, Z) {
                    X = X | 0;
                    Y = Y | 0;
                    Z = Z | 0;
                    var $ = 0;
                    if (Y & 15)return -1;
                    while ((Z | 0) >= 16) {
                        W[X & 1](z[Y | 0] << 24 | z[Y | 1] << 16 | z[Y | 2] << 8 | z[Y | 3], z[Y | 4] << 24 | z[Y | 5] << 16 | z[Y | 6] << 8 | z[Y | 7], z[Y | 8] << 24 | z[Y | 9] << 16 | z[Y | 10] << 8 | z[Y | 11], z[Y | 12] << 24 | z[Y | 13] << 16 | z[Y | 14] << 8 | z[Y | 15]);
                        $ = $ + 16 | 0, Y = Y + 16 | 0, Z = Z - 16 | 0
                    }
                    return $ | 0
                }

                var V = [B, C, D, E, F, G, H, I];
                var W = [D, J];
                return {
                    set_rounds: K,
                    set_state: L,
                    set_iv: M,
                    set_nonce: N,
                    set_mask: O,
                    set_counter: P,
                    get_state: Q,
                    get_iv: R,
                    gcm_init: S,
                    cipher: T,
                    mac: U
                }
            }(a, b, c);
            return m.set_key = e, m
        };
        return m.ENC = {ECB: 0, CBC: 2, CFB: 4, OFB: 6, CTR: 7}, m.DEC = {
            ECB: 1,
            CBC: 3,
            CFB: 5,
            OFB: 6,
            CTR: 7
        }, m.MAC = {CBC: 0, GCM: 1}, m.HEAP_DATA = 16384, m
    }(), Yb = C.prototype;
    Yb.BLOCK_SIZE = 16, Yb.reset = x, Yb.encrypt = z, Yb.decrypt = B;
    var Zb = D.prototype;
    Zb.BLOCK_SIZE = 16, Zb.reset = x, Zb.process = y, Zb.finish = z;
    var $b = E.prototype;
    $b.BLOCK_SIZE = 16, $b.reset = x, $b.process = A, $b.finish = B;
    var _b = F.prototype;
    _b.BLOCK_SIZE = 16, _b.reset = I, _b.encrypt = z, _b.decrypt = z;
    var ac = G.prototype;
    ac.BLOCK_SIZE = 16, ac.reset = I, ac.process = y, ac.finish = z;
    var bc = 68719476704, cc = K.prototype;
    cc.BLOCK_SIZE = 16, cc.reset = N, cc.encrypt = Q, cc.decrypt = T;
    var dc = L.prototype;
    dc.BLOCK_SIZE = 16, dc.reset = N, dc.process = O, dc.finish = P;
    var ec = M.prototype;
    ec.BLOCK_SIZE = 16, ec.reset = N, ec.process = R, ec.finish = S;
    var fc = new Uint8Array(1048576), gc = Xb(b, null, fc.buffer);
    a.AES_CBC = C, a.AES_CBC.encrypt = U, a.AES_CBC.decrypt = V, a.AES_CBC.Encrypt = D, a.AES_CBC.Decrypt = E, a.AES_GCM = K, a.AES_GCM.encrypt = W, a.AES_GCM.decrypt = X, a.AES_GCM.Encrypt = L, a.AES_GCM.Decrypt = M;
    var hc = 64, ic = 20;
    aa.BLOCK_SIZE = hc, aa.HASH_SIZE = ic;
    var jc = aa.prototype;
    jc.reset = Y, jc.process = Z, jc.finish = $;
    var kc = null;
    aa.bytes = ca, aa.hex = da, aa.base64 = ea, a.SHA1 = aa;
    var lc = 64, mc = 32;
    ga.BLOCK_SIZE = lc, ga.HASH_SIZE = mc;
    var nc = ga.prototype;
    nc.reset = Y, nc.process = Z, nc.finish = $;
    var oc = null;
    ga.bytes = ia, ga.hex = ja, ga.base64 = ka, a.SHA256 = ga;
    var pc = la.prototype;
    pc.reset = oa, pc.process = pa, pc.finish = qa, ra.BLOCK_SIZE = aa.BLOCK_SIZE, ra.HMAC_SIZE = aa.HASH_SIZE;
    var qc = ra.prototype;
    qc.reset = sa, qc.process = pa, qc.finish = ta;
    var rc = null;
    va.BLOCK_SIZE = ga.BLOCK_SIZE, va.HMAC_SIZE = ga.HASH_SIZE;
    var sc = va.prototype;
    sc.reset = wa, sc.process = pa, sc.finish = xa;
    var tc = null;
    a.HMAC = la, ra.bytes = za, ra.hex = Aa, ra.base64 = Ba, a.HMAC_SHA1 = ra, va.bytes = Ca, va.hex = Da, va.base64 = Ea, a.HMAC_SHA256 = va;
    var uc = Fa.prototype;
    uc.reset = Ga, uc.generate = Ha;
    var vc = Ia.prototype;
    vc.reset = Ga, vc.generate = Ja;
    var wc = null, xc = La.prototype;
    xc.reset = Ga, xc.generate = Ma;
    var yc = null;
    a.PBKDF2 = a.PBKDF2_HMAC_SHA1 = {bytes: Oa, hex: Pa, base64: Qa}, a.PBKDF2_HMAC_SHA256 = {
        bytes: Ra,
        hex: Sa,
        base64: Ta
    };
    var zc, Ac = function () {
        function a() {
            function a() {
                b ^= d << 11, l = l + b | 0, d = d + f | 0, d ^= f >>> 2, m = m + d | 0, f = f + l | 0, f ^= l << 8, n = n + f | 0, l = l + m | 0, l ^= m >>> 16, o = o + l | 0, m = m + n | 0, m ^= n << 10, p = p + m | 0, n = n + o | 0, n ^= o >>> 4, b = b + n | 0, o = o + p | 0, o ^= p << 8, d = d + o | 0, p = p + b | 0, p ^= b >>> 9, f = f + p | 0, b = b + d | 0
            }

            var b, d, f, l, m, n, o, p;
            h = i = j = 0, b = d = f = l = m = n = o = p = 2654435769;
            for (var q = 0; 4 > q; q++)a();
            for (var q = 0; 256 > q; q += 8)b = b + g[0 | q] | 0, d = d + g[1 | q] | 0, f = f + g[2 | q] | 0, l = l + g[3 | q] | 0, m = m + g[4 | q] | 0, n = n + g[5 | q] | 0, o = o + g[6 | q] | 0, p = p + g[7 | q] | 0, a(), e.set([b, d, f, l, m, n, o, p], q);
            for (var q = 0; 256 > q; q += 8)b = b + e[0 | q] | 0, d = d + e[1 | q] | 0, f = f + e[2 | q] | 0, l = l + e[3 | q] | 0, m = m + e[4 | q] | 0, n = n + e[5 | q] | 0, o = o + e[6 | q] | 0, p = p + e[7 | q] | 0, a(), e.set([b, d, f, l, m, n, o, p], q);
            c(1), k = 256
        }

        function b(b) {
            var c, d, e, h, i;
            if (q(b))b = new Uint8Array(b.buffer); else if (m(b))h = new Ub(1), h[0] = b, b = new Uint8Array(h.buffer); else if (n(b))b = f(b); else {
                if (!o(b))throw new TypeError("bad seed type");
                b = new Uint8Array(b)
            }
            for (i = b.length, d = 0; i > d; d += 1024) {
                for (e = d, c = 0; 1024 > c && i > e; e = d | ++c)g[c >> 2] ^= b[e] << ((3 & c) << 3);
                a()
            }
        }

        function c(a) {
            a = a || 1;
            for (var b, c, d; a--;)for (j = j + 1 | 0, i = i + j | 0, b = 0; 256 > b; b += 4)h ^= h << 13, h = e[b + 128 & 255] + h | 0, c = e[0 | b], e[0 | b] = d = e[c >>> 2 & 255] + (h + i | 0) | 0, g[0 | b] = i = e[d >>> 10 & 255] + c | 0, h ^= h >>> 6, h = e[b + 129 & 255] + h | 0, c = e[1 | b], e[1 | b] = d = e[c >>> 2 & 255] + (h + i | 0) | 0, g[1 | b] = i = e[d >>> 10 & 255] + c | 0, h ^= h << 2, h = e[b + 130 & 255] + h | 0, c = e[2 | b], e[2 | b] = d = e[c >>> 2 & 255] + (h + i | 0) | 0, g[2 | b] = i = e[d >>> 10 & 255] + c | 0, h ^= h >>> 16, h = e[b + 131 & 255] + h | 0, c = e[3 | b], e[3 | b] = d = e[c >>> 2 & 255] + (h + i | 0) | 0, g[3 | b] = i = e[d >>> 10 & 255] + c | 0
        }

        function d() {
            return k-- || (c(1), k = 255), g[k]
        }

        var e = new Uint32Array(256), g = new Uint32Array(256), h = 0, i = 0, j = 0, k = 0;
        return {seed: b, prng: c, rand: d}
    }(), Vb = b.console, Bc = b.Date.now, Cc = b.Math.random, Dc = b.performance, Ec = b.crypto || b.msCrypto;
    void 0 !== Ec && (zc = Ec.getRandomValues);
    var Fc, Gc = Ac.rand, Hc = Ac.seed, Ic = 0, Jc = !1, Kc = !1, Lc = 0, Mc = 256, Nc = !1, Oc = !1, Pc = {};
    if (void 0 !== Dc)Fc = function () {
        return 1e3 * Dc.now() | 0
    }; else {
        var Qc = 1e3 * Bc() | 0;
        Fc = function () {
            return 1e3 * Bc() - Qc | 0
        }
    }
    a.random = Xa, a.random.seed = Va, Object.defineProperty(Xa, "allowWeak", {
        get: function () {
            return Nc
        }, set: function (a) {
            Nc = a
        }
    }), Object.defineProperty(Xa, "skipSystemRNGWarning", {
        get: function () {
            return Oc
        }, set: function (a) {
            Oc = a
        }
    }), a.getRandomValues = Wa, a.getRandomValues.seed = Va, Object.defineProperty(Wa, "allowWeak", {
        get: function () {
            return Nc
        }, set: function (a) {
            Nc = a
        }
    }), Object.defineProperty(Wa, "skipSystemRNGWarning", {
        get: function () {
            return Oc
        }, set: function (a) {
            Oc = a
        }
    }), b.Math.random = Xa, void 0 === b.crypto && (b.crypto = {}), b.crypto.getRandomValues = Wa;
    var Rc;
    Rc = void 0 === b.Math.imul ? function (a, c, d) {
        b.Math.imul = Ya;
        var e = Za(a, c, d);
        return delete b.Math.imul, e
    } : Za;
    var Sc = new Uint32Array(1048576), Za = Rc(b, null, Sc.buffer), Tc = new Uint32Array(0), Uc = _a.prototype = new Number;
    Uc.toString = ab, Uc.toBytes = bb, Uc.valueOf = cb, Uc.clamp = db, Uc.slice = eb, Uc.negate = fb, Uc.compare = gb, Uc.add = hb, Uc.subtract = ib, Uc.multiply = jb, Uc.square = kb, Uc.divide = lb;
    var Vc = new _a(0), Wc = new _a(1);
    Object.freeze(Vc), Object.freeze(Wc);
    var Xc = ob.prototype = new _a;
    Xc.reduce = pb, Xc.inverse = qb, Xc.power = rb;
    var Yc = [2, 3];
    Uc.isProbablePrime = ub, _a.randomProbablePrime = wb, _a.ZERO = Vc, _a.ONE = Wc, _a.extGCD = nb, a.BigNumber = _a, a.Modulus = ob;
    var Zc = xb.prototype;
    Zc.reset = yb, Zc.encrypt = zb, Zc.decrypt = Ab, xb.generateKey = Bb;
    var $c = Cb.prototype;
    $c.reset = Db, $c.encrypt = Eb, $c.decrypt = Fb;
    var _c = Hb.prototype;
    return _c.reset = Ib, _c.sign = Jb, _c.verify = Kb, a.RSA = {generateKey: Lb}, a.RSA_OAEP = Cb, a.RSA_OAEP_SHA1 = {
        encrypt: Mb,
        decrypt: Nb
    }, a.RSA_OAEP = Cb, a.RSA_OAEP_SHA256 = {encrypt: Ob, decrypt: Pb}, a.RSA_PSS = Hb, a.RSA_PSS_SHA1 = {
        sign: Qb,
        verify: Rb
    }, a.RSA_PSS = Hb, a.RSA_PSS_SHA256 = {
        sign: Sb,
        verify: Tb
    }, "function" == typeof define && define.amd ? define([], function () {
        return a
    }) : "object" == typeof module && module.exports ? module.exports = a : b.asmCrypto = a, a
}({}, function () {
    return window
}());
//# sourceMappingURL=asmcrypto.js.map
