var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf, __hasOwnProp = Object.prototype.hasOwnProperty;
var __require = /* @__PURE__ */ ((x) => typeof require < "u" ? require : typeof Proxy < "u" ? new Proxy(x, {
  get: (a, b) => (typeof require < "u" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require < "u")
    return require.apply(this, arguments);
  throw new Error('Dynamic require of "' + x + '" is not supported');
});
var __commonJS = (cb, mod) => function() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: !0 });
}, __copyProps = (to, from, except, desc) => {
  if (from && typeof from == "object" || typeof from == "function")
    for (let key of __getOwnPropNames(from))
      !__hasOwnProp.call(to, key) && key !== except && __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: !0 }) : target,
  mod
));

// node_modules/@remix-run/node/dist/globals.js
var require_globals = __commonJS({
  "node_modules/@remix-run/node/dist/globals.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: !0 });
    var webFetch = __require("@remix-run/web-fetch"), webStream = __require("@remix-run/web-stream");
    function installGlobals() {
      global.File = webFetch.File, global.Headers = webFetch.Headers, global.Request = webFetch.Request, global.Response = webFetch.Response, global.fetch = webFetch.fetch, global.FormData = webFetch.FormData, global.ByteLengthQueuingStrategy = webStream.ByteLengthQueuingStrategy, global.CountQueuingStrategy = webStream.CountQueuingStrategy, global.ReadableByteStreamController = webStream.ReadableByteStreamController, global.ReadableStream = webStream.ReadableStream, global.ReadableStreamBYOBReader = webStream.ReadableStreamBYOBReader, global.ReadableStreamBYOBRequest = webStream.ReadableStreamBYOBRequest, global.ReadableStreamDefaultController = webStream.ReadableStreamDefaultController, global.ReadableStreamDefaultReader = webStream.ReadableStreamDefaultReader, global.TransformStream = webStream.TransformStream, global.TransformStreamDefaultController = webStream.TransformStreamDefaultController, global.WritableStream = webStream.WritableStream, global.WritableStreamDefaultController = webStream.WritableStreamDefaultController, global.WritableStreamDefaultWriter = webStream.WritableStreamDefaultWriter;
    }
    exports.installGlobals = installGlobals;
  }
});

// node_modules/@remix-run/node/dist/crypto.js
var require_crypto = __commonJS({
  "node_modules/@remix-run/node/dist/crypto.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: !0 });
    var cookieSignature = __require("cookie-signature");
    function _interopDefaultLegacy(e) {
      return e && typeof e == "object" && "default" in e ? e : { default: e };
    }
    var cookieSignature__default = /* @__PURE__ */ _interopDefaultLegacy(cookieSignature), sign = async (value, secret) => cookieSignature__default.default.sign(value, secret), unsign = async (signed, secret) => cookieSignature__default.default.unsign(signed, secret);
    exports.sign = sign;
    exports.unsign = unsign;
  }
});

// node_modules/@remix-run/node/dist/implementations.js
var require_implementations = __commonJS({
  "node_modules/@remix-run/node/dist/implementations.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: !0 });
    var serverRuntime = __require("@remix-run/server-runtime"), crypto = require_crypto(), createCookie = serverRuntime.createCookieFactory({
      sign: crypto.sign,
      unsign: crypto.unsign
    }), createCookieSessionStorage = serverRuntime.createCookieSessionStorageFactory(createCookie), createSessionStorage = serverRuntime.createSessionStorageFactory(createCookie), createMemorySessionStorage = serverRuntime.createMemorySessionStorageFactory(createSessionStorage);
    exports.createCookie = createCookie;
    exports.createCookieSessionStorage = createCookieSessionStorage;
    exports.createMemorySessionStorage = createMemorySessionStorage;
    exports.createSessionStorage = createSessionStorage;
  }
});

// node_modules/@remix-run/node/dist/sessions/fileStorage.js
var require_fileStorage = __commonJS({
  "node_modules/@remix-run/node/dist/sessions/fileStorage.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: !0 });
    var crypto = __require("node:crypto"), node_fs = __require("node:fs"), path = __require("node:path"), implementations = require_implementations();
    function _interopNamespace(e) {
      if (e && e.__esModule)
        return e;
      var n = /* @__PURE__ */ Object.create(null);
      return e && Object.keys(e).forEach(function(k) {
        if (k !== "default") {
          var d = Object.getOwnPropertyDescriptor(e, k);
          Object.defineProperty(n, k, d.get ? d : {
            enumerable: !0,
            get: function() {
              return e[k];
            }
          });
        }
      }), n.default = e, Object.freeze(n);
    }
    var crypto__namespace = /* @__PURE__ */ _interopNamespace(crypto), path__namespace = /* @__PURE__ */ _interopNamespace(path);
    function createFileSessionStorage({
      cookie,
      dir
    }) {
      return implementations.createSessionStorage({
        cookie,
        async createData(data, expires) {
          let content = JSON.stringify({
            data,
            expires
          });
          for (; ; ) {
            let randomBytes = crypto__namespace.webcrypto.getRandomValues(new Uint8Array(8)), id = Buffer.from(randomBytes).toString("hex");
            try {
              let file = getFile(dir, id);
              return await node_fs.promises.mkdir(path__namespace.dirname(file), {
                recursive: !0
              }), await node_fs.promises.writeFile(file, content, {
                encoding: "utf-8",
                flag: "wx"
              }), id;
            } catch (error) {
              if (error.code !== "EEXIST")
                throw error;
            }
          }
        },
        async readData(id) {
          try {
            let file = getFile(dir, id), content = JSON.parse(await node_fs.promises.readFile(file, "utf-8")), data = content.data, expires = typeof content.expires == "string" ? new Date(content.expires) : null;
            return !expires || expires > /* @__PURE__ */ new Date() ? data : (expires && await node_fs.promises.unlink(file), null);
          } catch (error) {
            if (error.code !== "ENOENT")
              throw error;
            return null;
          }
        },
        async updateData(id, data, expires) {
          let content = JSON.stringify({
            data,
            expires
          }), file = getFile(dir, id);
          await node_fs.promises.mkdir(path__namespace.dirname(file), {
            recursive: !0
          }), await node_fs.promises.writeFile(file, content, "utf-8");
        },
        async deleteData(id) {
          if (id)
            try {
              await node_fs.promises.unlink(getFile(dir, id));
            } catch (error) {
              if (error.code !== "ENOENT")
                throw error;
            }
        }
      });
    }
    function getFile(dir, id) {
      return path__namespace.join(dir, id.slice(0, 4), id.slice(4));
    }
    exports.createFileSessionStorage = createFileSessionStorage;
    exports.getFile = getFile;
  }
});

// node_modules/@remix-run/node/dist/stream.js
var require_stream = __commonJS({
  "node_modules/@remix-run/node/dist/stream.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: !0 });
    var node_stream = __require("node:stream");
    async function writeReadableStreamToWritable(stream, writable) {
      let reader = stream.getReader(), flushable = writable;
      try {
        for (; ; ) {
          let {
            done,
            value
          } = await reader.read();
          if (done) {
            writable.end();
            break;
          }
          writable.write(value), typeof flushable.flush == "function" && flushable.flush();
        }
      } catch (error) {
        throw writable.destroy(error), error;
      }
    }
    async function writeAsyncIterableToWritable(iterable, writable) {
      try {
        for await (let chunk of iterable)
          writable.write(chunk);
        writable.end();
      } catch (error) {
        throw writable.destroy(error), error;
      }
    }
    async function readableStreamToString(stream, encoding) {
      let reader = stream.getReader(), chunks = [];
      for (; ; ) {
        let {
          done,
          value
        } = await reader.read();
        if (done)
          break;
        value && chunks.push(value);
      }
      return Buffer.concat(chunks).toString(encoding);
    }
    var createReadableStreamFromReadable2 = (source) => {
      let pump = new StreamPump(source);
      return new ReadableStream(pump, pump);
    }, StreamPump = class {
      constructor(stream) {
        this.highWaterMark = stream.readableHighWaterMark || new node_stream.Stream.Readable().readableHighWaterMark, this.accumalatedSize = 0, this.stream = stream, this.enqueue = this.enqueue.bind(this), this.error = this.error.bind(this), this.close = this.close.bind(this);
      }
      size(chunk) {
        return chunk?.byteLength || 0;
      }
      start(controller) {
        this.controller = controller, this.stream.on("data", this.enqueue), this.stream.once("error", this.error), this.stream.once("end", this.close), this.stream.once("close", this.close);
      }
      pull() {
        this.resume();
      }
      cancel(reason) {
        this.stream.destroy && this.stream.destroy(reason), this.stream.off("data", this.enqueue), this.stream.off("error", this.error), this.stream.off("end", this.close), this.stream.off("close", this.close);
      }
      enqueue(chunk) {
        if (this.controller)
          try {
            let bytes = chunk instanceof Uint8Array ? chunk : Buffer.from(chunk), available = (this.controller.desiredSize || 0) - bytes.byteLength;
            this.controller.enqueue(bytes), available <= 0 && this.pause();
          } catch {
            this.controller.error(new Error("Could not create Buffer, chunk must be of type string or an instance of Buffer, ArrayBuffer, or Array or an Array-like Object")), this.cancel();
          }
      }
      pause() {
        this.stream.pause && this.stream.pause();
      }
      resume() {
        this.stream.readable && this.stream.resume && this.stream.resume();
      }
      close() {
        this.controller && (this.controller.close(), delete this.controller);
      }
      error(error) {
        this.controller && (this.controller.error(error), delete this.controller);
      }
    };
    exports.createReadableStreamFromReadable = createReadableStreamFromReadable2;
    exports.readableStreamToString = readableStreamToString;
    exports.writeAsyncIterableToWritable = writeAsyncIterableToWritable;
    exports.writeReadableStreamToWritable = writeReadableStreamToWritable;
  }
});

// node_modules/@remix-run/node/dist/upload/fileUploadHandler.js
var require_fileUploadHandler = __commonJS({
  "node_modules/@remix-run/node/dist/upload/fileUploadHandler.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: !0 });
    var crypto = __require("node:crypto"), node_fs = __require("node:fs"), promises = __require("node:fs/promises"), node_os = __require("node:os"), path = __require("node:path"), node_stream = __require("node:stream"), node_util = __require("node:util"), serverRuntime = __require("@remix-run/server-runtime"), streamSlice = __require("stream-slice"), stream = require_stream();
    function _interopNamespace(e) {
      if (e && e.__esModule)
        return e;
      var n = /* @__PURE__ */ Object.create(null);
      return e && Object.keys(e).forEach(function(k) {
        if (k !== "default") {
          var d = Object.getOwnPropertyDescriptor(e, k);
          Object.defineProperty(n, k, d.get ? d : {
            enumerable: !0,
            get: function() {
              return e[k];
            }
          });
        }
      }), n.default = e, Object.freeze(n);
    }
    var streamSlice__namespace = /* @__PURE__ */ _interopNamespace(streamSlice), defaultFilePathResolver = ({
      filename
    }) => {
      let ext = filename ? path.extname(filename) : "";
      return "upload_" + crypto.randomBytes(4).readUInt32LE(0) + ext;
    };
    async function uniqueFile(filepath) {
      let ext = path.extname(filepath), uniqueFilepath = filepath;
      for (let i = 1; await promises.stat(uniqueFilepath).then(() => !0).catch(() => !1); i++)
        uniqueFilepath = (ext ? filepath.slice(0, -ext.length) : filepath) + `-${(/* @__PURE__ */ new Date()).getTime()}${ext}`;
      return uniqueFilepath;
    }
    function createFileUploadHandler({
      directory = node_os.tmpdir(),
      avoidFileConflicts = !0,
      file = defaultFilePathResolver,
      filter,
      maxPartSize = 3e6
    } = {}) {
      return async ({
        name,
        filename,
        contentType,
        data
      }) => {
        if (!filename || filter && !await filter({
          name,
          filename,
          contentType
        }))
          return;
        let dir = typeof directory == "string" ? directory : directory({
          name,
          filename,
          contentType
        });
        if (!dir)
          return;
        let filedir = path.resolve(dir), path$1 = typeof file == "string" ? file : file({
          name,
          filename,
          contentType
        });
        if (!path$1)
          return;
        let filepath = path.resolve(filedir, path$1);
        avoidFileConflicts && (filepath = await uniqueFile(filepath)), await promises.mkdir(path.dirname(filepath), {
          recursive: !0
        }).catch(() => {
        });
        let writeFileStream = node_fs.createWriteStream(filepath), size = 0, deleteFile = !1;
        try {
          for await (let chunk of data) {
            if (size += chunk.byteLength, size > maxPartSize)
              throw deleteFile = !0, new serverRuntime.MaxPartSizeExceededError(name, maxPartSize);
            writeFileStream.write(chunk);
          }
        } finally {
          writeFileStream.end(), await node_util.promisify(node_stream.finished)(writeFileStream), deleteFile && await promises.rm(filepath).catch(() => {
          });
        }
        return new NodeOnDiskFile(filepath, contentType);
      };
    }
    var NodeOnDiskFile = class {
      lastModified = 0;
      webkitRelativePath = "";
      // TODO: remove this property once TS fixed File class regression
      //  https://github.com/microsoft/TypeScript/issues/52166
      prototype = File.prototype;
      constructor(filepath, type, slicer) {
        this.filepath = filepath, this.type = type, this.slicer = slicer, this.name = path.basename(filepath);
      }
      get size() {
        let stats = node_fs.statSync(this.filepath);
        if (this.slicer) {
          let slice = this.slicer.end - this.slicer.start;
          return slice < 0 ? 0 : slice > stats.size ? stats.size : slice;
        }
        return stats.size;
      }
      slice(start, end, type) {
        var _this$slicer;
        typeof start == "number" && start < 0 && (start = this.size + start), typeof end == "number" && end < 0 && (end = this.size + end);
        let startOffset = ((_this$slicer = this.slicer) === null || _this$slicer === void 0 ? void 0 : _this$slicer.start) || 0;
        return start = startOffset + (start || 0), end = startOffset + (end || this.size), new NodeOnDiskFile(
          this.filepath,
          typeof type == "string" ? type : this.type,
          {
            start,
            end
          }
          // TODO: remove this typecast once TS fixed File class regression
          //  https://github.com/microsoft/TypeScript/issues/52166
        );
      }
      async arrayBuffer() {
        let stream2 = node_fs.createReadStream(this.filepath);
        return this.slicer && (stream2 = stream2.pipe(streamSlice__namespace.slice(this.slicer.start, this.slicer.end))), new Promise((resolve, reject) => {
          let buf = [];
          stream2.on("data", (chunk) => buf.push(chunk)), stream2.on("end", () => resolve(Buffer.concat(buf))), stream2.on("error", (err) => reject(err));
        });
      }
      stream() {
        let stream$1 = node_fs.createReadStream(this.filepath);
        return this.slicer && (stream$1 = stream$1.pipe(streamSlice__namespace.slice(this.slicer.start, this.slicer.end))), stream.createReadableStreamFromReadable(stream$1);
      }
      async text() {
        return stream.readableStreamToString(this.stream());
      }
      get [Symbol.toStringTag]() {
        return "File";
      }
      remove() {
        return promises.unlink(this.filepath);
      }
      getFilePath() {
        return this.filepath;
      }
    };
    exports.NodeOnDiskFile = NodeOnDiskFile;
    exports.createFileUploadHandler = createFileUploadHandler;
  }
});

// node_modules/@remix-run/node/dist/index.js
var require_dist = __commonJS({
  "node_modules/@remix-run/node/dist/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: !0 });
    var globals = require_globals(), fileStorage = require_fileStorage(), fileUploadHandler = require_fileUploadHandler(), implementations = require_implementations(), stream = require_stream(), serverRuntime = __require("@remix-run/server-runtime");
    exports.installGlobals = globals.installGlobals;
    exports.createFileSessionStorage = fileStorage.createFileSessionStorage;
    exports.NodeOnDiskFile = fileUploadHandler.NodeOnDiskFile;
    exports.unstable_createFileUploadHandler = fileUploadHandler.createFileUploadHandler;
    exports.createCookie = implementations.createCookie;
    exports.createCookieSessionStorage = implementations.createCookieSessionStorage;
    exports.createMemorySessionStorage = implementations.createMemorySessionStorage;
    exports.createSessionStorage = implementations.createSessionStorage;
    exports.createReadableStreamFromReadable = stream.createReadableStreamFromReadable;
    exports.readableStreamToString = stream.readableStreamToString;
    exports.writeAsyncIterableToWritable = stream.writeAsyncIterableToWritable;
    exports.writeReadableStreamToWritable = stream.writeReadableStreamToWritable;
    Object.defineProperty(exports, "MaxPartSizeExceededError", {
      enumerable: !0,
      get: function() {
        return serverRuntime.MaxPartSizeExceededError;
      }
    });
    Object.defineProperty(exports, "broadcastDevReady", {
      enumerable: !0,
      get: function() {
        return serverRuntime.broadcastDevReady;
      }
    });
    Object.defineProperty(exports, "createRequestHandler", {
      enumerable: !0,
      get: function() {
        return serverRuntime.createRequestHandler;
      }
    });
    Object.defineProperty(exports, "createSession", {
      enumerable: !0,
      get: function() {
        return serverRuntime.createSession;
      }
    });
    Object.defineProperty(exports, "defer", {
      enumerable: !0,
      get: function() {
        return serverRuntime.defer;
      }
    });
    Object.defineProperty(exports, "isCookie", {
      enumerable: !0,
      get: function() {
        return serverRuntime.isCookie;
      }
    });
    Object.defineProperty(exports, "isSession", {
      enumerable: !0,
      get: function() {
        return serverRuntime.isSession;
      }
    });
    Object.defineProperty(exports, "json", {
      enumerable: !0,
      get: function() {
        return serverRuntime.json;
      }
    });
    Object.defineProperty(exports, "logDevReady", {
      enumerable: !0,
      get: function() {
        return serverRuntime.logDevReady;
      }
    });
    Object.defineProperty(exports, "redirect", {
      enumerable: !0,
      get: function() {
        return serverRuntime.redirect;
      }
    });
    Object.defineProperty(exports, "redirectDocument", {
      enumerable: !0,
      get: function() {
        return serverRuntime.redirectDocument;
      }
    });
    Object.defineProperty(exports, "unstable_composeUploadHandlers", {
      enumerable: !0,
      get: function() {
        return serverRuntime.unstable_composeUploadHandlers;
      }
    });
    Object.defineProperty(exports, "unstable_createMemoryUploadHandler", {
      enumerable: !0,
      get: function() {
        return serverRuntime.unstable_createMemoryUploadHandler;
      }
    });
    Object.defineProperty(exports, "unstable_parseMultipartFormData", {
      enumerable: !0,
      get: function() {
        return serverRuntime.unstable_parseMultipartFormData;
      }
    });
  }
});

// node_modules/react-dom/cjs/react-dom-server-legacy.node.production.min.js
var require_react_dom_server_legacy_node_production_min = __commonJS({
  "node_modules/react-dom/cjs/react-dom-server-legacy.node.production.min.js"(exports) {
    "use strict";
    var ea = __require("react"), fa = __require("stream"), n = Object.prototype.hasOwnProperty, ha = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, ia = {}, ja = {};
    function ka(a) {
      return n.call(ja, a) ? !0 : n.call(ia, a) ? !1 : ha.test(a) ? ja[a] = !0 : (ia[a] = !0, !1);
    }
    function q(a, b, c, d, f, e, g) {
      this.acceptsBooleans = b === 2 || b === 3 || b === 4, this.attributeName = d, this.attributeNamespace = f, this.mustUseProperty = c, this.propertyName = a, this.type = b, this.sanitizeURL = e, this.removeEmptyString = g;
    }
    var r = {};
    "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(a) {
      r[a] = new q(a, 0, !1, a, null, !1, !1);
    });
    [["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(a) {
      var b = a[0];
      r[b] = new q(b, 1, !1, a[1], null, !1, !1);
    });
    ["contentEditable", "draggable", "spellCheck", "value"].forEach(function(a) {
      r[a] = new q(a, 2, !1, a.toLowerCase(), null, !1, !1);
    });
    ["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(a) {
      r[a] = new q(a, 2, !1, a, null, !1, !1);
    });
    "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(a) {
      r[a] = new q(a, 3, !1, a.toLowerCase(), null, !1, !1);
    });
    ["checked", "multiple", "muted", "selected"].forEach(function(a) {
      r[a] = new q(a, 3, !0, a, null, !1, !1);
    });
    ["capture", "download"].forEach(function(a) {
      r[a] = new q(a, 4, !1, a, null, !1, !1);
    });
    ["cols", "rows", "size", "span"].forEach(function(a) {
      r[a] = new q(a, 6, !1, a, null, !1, !1);
    });
    ["rowSpan", "start"].forEach(function(a) {
      r[a] = new q(a, 5, !1, a.toLowerCase(), null, !1, !1);
    });
    var la = /[\-:]([a-z])/g;
    function ma(a) {
      return a[1].toUpperCase();
    }
    "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(a) {
      var b = a.replace(
        la,
        ma
      );
      r[b] = new q(b, 1, !1, a, null, !1, !1);
    });
    "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(a) {
      var b = a.replace(la, ma);
      r[b] = new q(b, 1, !1, a, "http://www.w3.org/1999/xlink", !1, !1);
    });
    ["xml:base", "xml:lang", "xml:space"].forEach(function(a) {
      var b = a.replace(la, ma);
      r[b] = new q(b, 1, !1, a, "http://www.w3.org/XML/1998/namespace", !1, !1);
    });
    ["tabIndex", "crossOrigin"].forEach(function(a) {
      r[a] = new q(a, 1, !1, a.toLowerCase(), null, !1, !1);
    });
    r.xlinkHref = new q("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1);
    ["src", "href", "action", "formAction"].forEach(function(a) {
      r[a] = new q(a, 1, !1, a.toLowerCase(), null, !0, !0);
    });
    var t = {
      animationIterationCount: !0,
      aspectRatio: !0,
      borderImageOutset: !0,
      borderImageSlice: !0,
      borderImageWidth: !0,
      boxFlex: !0,
      boxFlexGroup: !0,
      boxOrdinalGroup: !0,
      columnCount: !0,
      columns: !0,
      flex: !0,
      flexGrow: !0,
      flexPositive: !0,
      flexShrink: !0,
      flexNegative: !0,
      flexOrder: !0,
      gridArea: !0,
      gridRow: !0,
      gridRowEnd: !0,
      gridRowSpan: !0,
      gridRowStart: !0,
      gridColumn: !0,
      gridColumnEnd: !0,
      gridColumnSpan: !0,
      gridColumnStart: !0,
      fontWeight: !0,
      lineClamp: !0,
      lineHeight: !0,
      opacity: !0,
      order: !0,
      orphans: !0,
      tabSize: !0,
      widows: !0,
      zIndex: !0,
      zoom: !0,
      fillOpacity: !0,
      floodOpacity: !0,
      stopOpacity: !0,
      strokeDasharray: !0,
      strokeDashoffset: !0,
      strokeMiterlimit: !0,
      strokeOpacity: !0,
      strokeWidth: !0
    }, na = ["Webkit", "ms", "Moz", "O"];
    Object.keys(t).forEach(function(a) {
      na.forEach(function(b) {
        b = b + a.charAt(0).toUpperCase() + a.substring(1), t[b] = t[a];
      });
    });
    var oa = /["'&<>]/;
    function u(a) {
      if (typeof a == "boolean" || typeof a == "number")
        return "" + a;
      a = "" + a;
      var b = oa.exec(a);
      if (b) {
        var c = "", d, f = 0;
        for (d = b.index; d < a.length; d++) {
          switch (a.charCodeAt(d)) {
            case 34:
              b = "&quot;";
              break;
            case 38:
              b = "&amp;";
              break;
            case 39:
              b = "&#x27;";
              break;
            case 60:
              b = "&lt;";
              break;
            case 62:
              b = "&gt;";
              break;
            default:
              continue;
          }
          f !== d && (c += a.substring(f, d)), f = d + 1, c += b;
        }
        a = f !== d ? c + a.substring(f, d) : c;
      }
      return a;
    }
    var pa = /([A-Z])/g, qa = /^ms-/, ra = Array.isArray;
    function v(a, b) {
      return { insertionMode: a, selectedValue: b };
    }
    function sa(a, b, c) {
      switch (b) {
        case "select":
          return v(1, c.value != null ? c.value : c.defaultValue);
        case "svg":
          return v(2, null);
        case "math":
          return v(3, null);
        case "foreignObject":
          return v(1, null);
        case "table":
          return v(4, null);
        case "thead":
        case "tbody":
        case "tfoot":
          return v(5, null);
        case "colgroup":
          return v(7, null);
        case "tr":
          return v(6, null);
      }
      return 4 <= a.insertionMode || a.insertionMode === 0 ? v(1, null) : a;
    }
    var ta = /* @__PURE__ */ new Map();
    function ua(a, b, c) {
      if (typeof c != "object")
        throw Error("The `style` prop expects a mapping from style properties to values, not a string. For example, style={{marginRight: spacing + 'em'}} when using JSX.");
      b = !0;
      for (var d in c)
        if (n.call(c, d)) {
          var f = c[d];
          if (f != null && typeof f != "boolean" && f !== "") {
            if (d.indexOf("--") === 0) {
              var e = u(d);
              f = u(("" + f).trim());
            } else {
              e = d;
              var g = ta.get(e);
              g !== void 0 || (g = u(e.replace(pa, "-$1").toLowerCase().replace(qa, "-ms-")), ta.set(e, g)), e = g, f = typeof f == "number" ? f === 0 || n.call(
                t,
                d
              ) ? "" + f : f + "px" : u(("" + f).trim());
            }
            b ? (b = !1, a.push(' style="', e, ":", f)) : a.push(";", e, ":", f);
          }
        }
      b || a.push('"');
    }
    function w(a, b, c, d) {
      switch (c) {
        case "style":
          ua(a, b, d);
          return;
        case "defaultValue":
        case "defaultChecked":
        case "innerHTML":
        case "suppressContentEditableWarning":
        case "suppressHydrationWarning":
          return;
      }
      if (!(2 < c.length) || c[0] !== "o" && c[0] !== "O" || c[1] !== "n" && c[1] !== "N") {
        if (b = r.hasOwnProperty(c) ? r[c] : null, b !== null) {
          switch (typeof d) {
            case "function":
            case "symbol":
              return;
            case "boolean":
              if (!b.acceptsBooleans)
                return;
          }
          switch (c = b.attributeName, b.type) {
            case 3:
              d && a.push(" ", c, '=""');
              break;
            case 4:
              d === !0 ? a.push(" ", c, '=""') : d !== !1 && a.push(" ", c, '="', u(d), '"');
              break;
            case 5:
              isNaN(d) || a.push(" ", c, '="', u(d), '"');
              break;
            case 6:
              !isNaN(d) && 1 <= d && a.push(" ", c, '="', u(d), '"');
              break;
            default:
              b.sanitizeURL && (d = "" + d), a.push(" ", c, '="', u(d), '"');
          }
        } else if (ka(c)) {
          switch (typeof d) {
            case "function":
            case "symbol":
              return;
            case "boolean":
              if (b = c.toLowerCase().slice(0, 5), b !== "data-" && b !== "aria-")
                return;
          }
          a.push(" ", c, '="', u(d), '"');
        }
      }
    }
    function x(a, b, c) {
      if (b != null) {
        if (c != null)
          throw Error("Can only set one of `children` or `props.dangerouslySetInnerHTML`.");
        if (typeof b != "object" || !("__html" in b))
          throw Error("`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. Please visit https://reactjs.org/link/dangerously-set-inner-html for more information.");
        b = b.__html, b != null && a.push("" + b);
      }
    }
    function va(a) {
      var b = "";
      return ea.Children.forEach(a, function(a2) {
        a2 != null && (b += a2);
      }), b;
    }
    function wa(a, b, c, d) {
      a.push(z(c));
      var f = c = null, e;
      for (e in b)
        if (n.call(b, e)) {
          var g = b[e];
          if (g != null)
            switch (e) {
              case "children":
                c = g;
                break;
              case "dangerouslySetInnerHTML":
                f = g;
                break;
              default:
                w(a, d, e, g);
            }
        }
      return a.push(">"), x(a, f, c), typeof c == "string" ? (a.push(u(c)), null) : c;
    }
    var xa = /^[a-zA-Z][a-zA-Z:_\.\-\d]*$/, ya = /* @__PURE__ */ new Map();
    function z(a) {
      var b = ya.get(a);
      if (b === void 0) {
        if (!xa.test(a))
          throw Error("Invalid tag: " + a);
        b = "<" + a, ya.set(a, b);
      }
      return b;
    }
    function za(a, b, c, d, f) {
      switch (b) {
        case "select":
          a.push(z("select"));
          var e = null, g = null;
          for (l in c)
            if (n.call(c, l)) {
              var h = c[l];
              if (h != null)
                switch (l) {
                  case "children":
                    e = h;
                    break;
                  case "dangerouslySetInnerHTML":
                    g = h;
                    break;
                  case "defaultValue":
                  case "value":
                    break;
                  default:
                    w(a, d, l, h);
                }
            }
          return a.push(">"), x(a, g, e), e;
        case "option":
          g = f.selectedValue, a.push(z("option"));
          var k = h = null, m = null, l = null;
          for (e in c)
            if (n.call(c, e)) {
              var p = c[e];
              if (p != null)
                switch (e) {
                  case "children":
                    h = p;
                    break;
                  case "selected":
                    m = p;
                    break;
                  case "dangerouslySetInnerHTML":
                    l = p;
                    break;
                  case "value":
                    k = p;
                  default:
                    w(a, d, e, p);
                }
            }
          if (g != null)
            if (c = k !== null ? "" + k : va(h), ra(g)) {
              for (d = 0; d < g.length; d++)
                if ("" + g[d] === c) {
                  a.push(' selected=""');
                  break;
                }
            } else
              "" + g === c && a.push(' selected=""');
          else
            m && a.push(' selected=""');
          return a.push(">"), x(a, l, h), h;
        case "textarea":
          a.push(z("textarea")), l = g = e = null;
          for (h in c)
            if (n.call(c, h) && (k = c[h], k != null))
              switch (h) {
                case "children":
                  l = k;
                  break;
                case "value":
                  e = k;
                  break;
                case "defaultValue":
                  g = k;
                  break;
                case "dangerouslySetInnerHTML":
                  throw Error("`dangerouslySetInnerHTML` does not make sense on <textarea>.");
                default:
                  w(a, d, h, k);
              }
          if (e === null && g !== null && (e = g), a.push(">"), l != null) {
            if (e != null)
              throw Error("If you supply `defaultValue` on a <textarea>, do not pass children.");
            if (ra(l) && 1 < l.length)
              throw Error("<textarea> can only have at most one child.");
            e = "" + l;
          }
          return typeof e == "string" && e[0] === `
` && a.push(`
`), e !== null && a.push(u("" + e)), null;
        case "input":
          a.push(z("input")), k = l = h = e = null;
          for (g in c)
            if (n.call(c, g) && (m = c[g], m != null))
              switch (g) {
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error("input is a self-closing tag and must neither have `children` nor use `dangerouslySetInnerHTML`.");
                case "defaultChecked":
                  k = m;
                  break;
                case "defaultValue":
                  h = m;
                  break;
                case "checked":
                  l = m;
                  break;
                case "value":
                  e = m;
                  break;
                default:
                  w(a, d, g, m);
              }
          return l !== null ? w(a, d, "checked", l) : k !== null && w(a, d, "checked", k), e !== null ? w(a, d, "value", e) : h !== null && w(a, d, "value", h), a.push("/>"), null;
        case "menuitem":
          a.push(z("menuitem"));
          for (var B in c)
            if (n.call(c, B) && (e = c[B], e != null))
              switch (B) {
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error("menuitems cannot have `children` nor `dangerouslySetInnerHTML`.");
                default:
                  w(
                    a,
                    d,
                    B,
                    e
                  );
              }
          return a.push(">"), null;
        case "title":
          a.push(z("title")), e = null;
          for (p in c)
            if (n.call(c, p) && (g = c[p], g != null))
              switch (p) {
                case "children":
                  e = g;
                  break;
                case "dangerouslySetInnerHTML":
                  throw Error("`dangerouslySetInnerHTML` does not make sense on <title>.");
                default:
                  w(a, d, p, g);
              }
          return a.push(">"), e;
        case "listing":
        case "pre":
          a.push(z(b)), g = e = null;
          for (k in c)
            if (n.call(c, k) && (h = c[k], h != null))
              switch (k) {
                case "children":
                  e = h;
                  break;
                case "dangerouslySetInnerHTML":
                  g = h;
                  break;
                default:
                  w(a, d, k, h);
              }
          if (a.push(">"), g != null) {
            if (e != null)
              throw Error("Can only set one of `children` or `props.dangerouslySetInnerHTML`.");
            if (typeof g != "object" || !("__html" in g))
              throw Error("`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. Please visit https://reactjs.org/link/dangerously-set-inner-html for more information.");
            c = g.__html, c != null && (typeof c == "string" && 0 < c.length && c[0] === `
` ? a.push(`
`, c) : a.push("" + c));
          }
          return typeof e == "string" && e[0] === `
` && a.push(`
`), e;
        case "area":
        case "base":
        case "br":
        case "col":
        case "embed":
        case "hr":
        case "img":
        case "keygen":
        case "link":
        case "meta":
        case "param":
        case "source":
        case "track":
        case "wbr":
          a.push(z(b));
          for (var C in c)
            if (n.call(c, C) && (e = c[C], e != null))
              switch (C) {
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(b + " is a self-closing tag and must neither have `children` nor use `dangerouslySetInnerHTML`.");
                default:
                  w(a, d, C, e);
              }
          return a.push("/>"), null;
        case "annotation-xml":
        case "color-profile":
        case "font-face":
        case "font-face-src":
        case "font-face-uri":
        case "font-face-format":
        case "font-face-name":
        case "missing-glyph":
          return wa(a, c, b, d);
        case "html":
          return f.insertionMode === 0 && a.push("<!DOCTYPE html>"), wa(a, c, b, d);
        default:
          if (b.indexOf("-") === -1 && typeof c.is != "string")
            return wa(a, c, b, d);
          a.push(z(b)), g = e = null;
          for (m in c)
            if (n.call(c, m) && (h = c[m], h != null))
              switch (m) {
                case "children":
                  e = h;
                  break;
                case "dangerouslySetInnerHTML":
                  g = h;
                  break;
                case "style":
                  ua(a, d, h);
                  break;
                case "suppressContentEditableWarning":
                case "suppressHydrationWarning":
                  break;
                default:
                  ka(m) && typeof h != "function" && typeof h != "symbol" && a.push(" ", m, '="', u(h), '"');
              }
          return a.push(">"), x(a, g, e), e;
      }
    }
    function Aa(a, b, c) {
      if (a.push('<!--$?--><template id="'), c === null)
        throw Error("An ID must have been assigned before we can complete the boundary.");
      return a.push(c), a.push('"></template>');
    }
    function Ba(a, b, c, d) {
      switch (c.insertionMode) {
        case 0:
        case 1:
          return a.push('<div hidden id="'), a.push(b.segmentPrefix), b = d.toString(16), a.push(b), a.push('">');
        case 2:
          return a.push('<svg aria-hidden="true" style="display:none" id="'), a.push(b.segmentPrefix), b = d.toString(16), a.push(b), a.push('">');
        case 3:
          return a.push('<math aria-hidden="true" style="display:none" id="'), a.push(b.segmentPrefix), b = d.toString(16), a.push(b), a.push('">');
        case 4:
          return a.push('<table hidden id="'), a.push(b.segmentPrefix), b = d.toString(16), a.push(b), a.push('">');
        case 5:
          return a.push('<table hidden><tbody id="'), a.push(b.segmentPrefix), b = d.toString(16), a.push(b), a.push('">');
        case 6:
          return a.push('<table hidden><tr id="'), a.push(b.segmentPrefix), b = d.toString(16), a.push(b), a.push('">');
        case 7:
          return a.push('<table hidden><colgroup id="'), a.push(b.segmentPrefix), b = d.toString(16), a.push(b), a.push('">');
        default:
          throw Error("Unknown insertion mode. This is a bug in React.");
      }
    }
    function Ca(a, b) {
      switch (b.insertionMode) {
        case 0:
        case 1:
          return a.push("</div>");
        case 2:
          return a.push("</svg>");
        case 3:
          return a.push("</math>");
        case 4:
          return a.push("</table>");
        case 5:
          return a.push("</tbody></table>");
        case 6:
          return a.push("</tr></table>");
        case 7:
          return a.push("</colgroup></table>");
        default:
          throw Error("Unknown insertion mode. This is a bug in React.");
      }
    }
    var Da = /[<\u2028\u2029]/g;
    function Ea(a) {
      return JSON.stringify(a).replace(Da, function(a2) {
        switch (a2) {
          case "<":
            return "\\u003c";
          case "\u2028":
            return "\\u2028";
          case "\u2029":
            return "\\u2029";
          default:
            throw Error("escapeJSStringsForInstructionScripts encountered a match it does not know how to replace. this means the match regex and the replacement characters are no longer in sync. This is a bug in React");
        }
      });
    }
    function Fa(a, b) {
      return b = b === void 0 ? "" : b, { bootstrapChunks: [], startInlineScript: "<script>", placeholderPrefix: b + "P:", segmentPrefix: b + "S:", boundaryPrefix: b + "B:", idPrefix: b, nextSuspenseID: 0, sentCompleteSegmentFunction: !1, sentCompleteBoundaryFunction: !1, sentClientRenderFunction: !1, generateStaticMarkup: a };
    }
    function Ga() {
      return { insertionMode: 1, selectedValue: null };
    }
    function Ha(a, b, c, d) {
      return c.generateStaticMarkup ? (a.push(u(b)), !1) : (b === "" ? a = d : (d && a.push("<!-- -->"), a.push(u(b)), a = !0), a);
    }
    var A = Object.assign, Ia = Symbol.for("react.element"), Ja = Symbol.for("react.portal"), Ka = Symbol.for("react.fragment"), La = Symbol.for("react.strict_mode"), Ma = Symbol.for("react.profiler"), Na = Symbol.for("react.provider"), Oa = Symbol.for("react.context"), Pa = Symbol.for("react.forward_ref"), Qa = Symbol.for("react.suspense"), Ra = Symbol.for("react.suspense_list"), Sa = Symbol.for("react.memo"), Ta = Symbol.for("react.lazy"), Ua = Symbol.for("react.scope"), Va = Symbol.for("react.debug_trace_mode"), Wa = Symbol.for("react.legacy_hidden"), Xa = Symbol.for("react.default_value"), Ya = Symbol.iterator;
    function Za(a) {
      if (a == null)
        return null;
      if (typeof a == "function")
        return a.displayName || a.name || null;
      if (typeof a == "string")
        return a;
      switch (a) {
        case Ka:
          return "Fragment";
        case Ja:
          return "Portal";
        case Ma:
          return "Profiler";
        case La:
          return "StrictMode";
        case Qa:
          return "Suspense";
        case Ra:
          return "SuspenseList";
      }
      if (typeof a == "object")
        switch (a.$$typeof) {
          case Oa:
            return (a.displayName || "Context") + ".Consumer";
          case Na:
            return (a._context.displayName || "Context") + ".Provider";
          case Pa:
            var b = a.render;
            return a = a.displayName, a || (a = b.displayName || b.name || "", a = a !== "" ? "ForwardRef(" + a + ")" : "ForwardRef"), a;
          case Sa:
            return b = a.displayName || null, b !== null ? b : Za(a.type) || "Memo";
          case Ta:
            b = a._payload, a = a._init;
            try {
              return Za(a(b));
            } catch {
            }
        }
      return null;
    }
    var $a = {};
    function ab(a, b) {
      if (a = a.contextTypes, !a)
        return $a;
      var c = {}, d;
      for (d in a)
        c[d] = b[d];
      return c;
    }
    var D = null;
    function E(a, b) {
      if (a !== b) {
        a.context._currentValue2 = a.parentValue, a = a.parent;
        var c = b.parent;
        if (a === null) {
          if (c !== null)
            throw Error("The stacks must reach the root at the same time. This is a bug in React.");
        } else {
          if (c === null)
            throw Error("The stacks must reach the root at the same time. This is a bug in React.");
          E(a, c);
        }
        b.context._currentValue2 = b.value;
      }
    }
    function bb(a) {
      a.context._currentValue2 = a.parentValue, a = a.parent, a !== null && bb(a);
    }
    function cb(a) {
      var b = a.parent;
      b !== null && cb(b), a.context._currentValue2 = a.value;
    }
    function db(a, b) {
      if (a.context._currentValue2 = a.parentValue, a = a.parent, a === null)
        throw Error("The depth must equal at least at zero before reaching the root. This is a bug in React.");
      a.depth === b.depth ? E(a, b) : db(a, b);
    }
    function eb(a, b) {
      var c = b.parent;
      if (c === null)
        throw Error("The depth must equal at least at zero before reaching the root. This is a bug in React.");
      a.depth === c.depth ? E(a, c) : eb(a, c), b.context._currentValue2 = b.value;
    }
    function F(a) {
      var b = D;
      b !== a && (b === null ? cb(a) : a === null ? bb(b) : b.depth === a.depth ? E(b, a) : b.depth > a.depth ? db(b, a) : eb(b, a), D = a);
    }
    var fb = { isMounted: function() {
      return !1;
    }, enqueueSetState: function(a, b) {
      a = a._reactInternals, a.queue !== null && a.queue.push(b);
    }, enqueueReplaceState: function(a, b) {
      a = a._reactInternals, a.replace = !0, a.queue = [b];
    }, enqueueForceUpdate: function() {
    } };
    function gb(a, b, c, d) {
      var f = a.state !== void 0 ? a.state : null;
      a.updater = fb, a.props = c, a.state = f;
      var e = { queue: [], replace: !1 };
      a._reactInternals = e;
      var g = b.contextType;
      if (a.context = typeof g == "object" && g !== null ? g._currentValue2 : d, g = b.getDerivedStateFromProps, typeof g == "function" && (g = g(c, f), f = g == null ? f : A({}, f, g), a.state = f), typeof b.getDerivedStateFromProps != "function" && typeof a.getSnapshotBeforeUpdate != "function" && (typeof a.UNSAFE_componentWillMount == "function" || typeof a.componentWillMount == "function"))
        if (b = a.state, typeof a.componentWillMount == "function" && a.componentWillMount(), typeof a.UNSAFE_componentWillMount == "function" && a.UNSAFE_componentWillMount(), b !== a.state && fb.enqueueReplaceState(a, a.state, null), e.queue !== null && 0 < e.queue.length)
          if (b = e.queue, g = e.replace, e.queue = null, e.replace = !1, g && b.length === 1)
            a.state = b[0];
          else {
            for (e = g ? b[0] : a.state, f = !0, g = g ? 1 : 0; g < b.length; g++) {
              var h = b[g];
              h = typeof h == "function" ? h.call(a, e, c, d) : h, h != null && (f ? (f = !1, e = A({}, e, h)) : A(e, h));
            }
            a.state = e;
          }
        else
          e.queue = null;
    }
    var hb = { id: 1, overflow: "" };
    function ib(a, b, c) {
      var d = a.id;
      a = a.overflow;
      var f = 32 - G(d) - 1;
      d &= ~(1 << f), c += 1;
      var e = 32 - G(b) + f;
      if (30 < e) {
        var g = f - f % 5;
        return e = (d & (1 << g) - 1).toString(32), d >>= g, f -= g, { id: 1 << 32 - G(b) + f | c << f | d, overflow: e + a };
      }
      return { id: 1 << e | c << f | d, overflow: a };
    }
    var G = Math.clz32 ? Math.clz32 : jb, kb = Math.log, lb = Math.LN2;
    function jb(a) {
      return a >>>= 0, a === 0 ? 32 : 31 - (kb(a) / lb | 0) | 0;
    }
    function mb(a, b) {
      return a === b && (a !== 0 || 1 / a === 1 / b) || a !== a && b !== b;
    }
    var nb = typeof Object.is == "function" ? Object.is : mb, H = null, ob = null, I = null, J = null, K = !1, L = !1, M = 0, N = null, O = 0;
    function P() {
      if (H === null)
        throw Error(`Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.`);
      return H;
    }
    function rb() {
      if (0 < O)
        throw Error("Rendered more hooks than during the previous render");
      return { memoizedState: null, queue: null, next: null };
    }
    function sb() {
      return J === null ? I === null ? (K = !1, I = J = rb()) : (K = !0, J = I) : J.next === null ? (K = !1, J = J.next = rb()) : (K = !0, J = J.next), J;
    }
    function tb() {
      ob = H = null, L = !1, I = null, O = 0, J = N = null;
    }
    function ub(a, b) {
      return typeof b == "function" ? b(a) : b;
    }
    function vb(a, b, c) {
      if (H = P(), J = sb(), K) {
        var d = J.queue;
        if (b = d.dispatch, N !== null && (c = N.get(d), c !== void 0)) {
          N.delete(d), d = J.memoizedState;
          do
            d = a(d, c.action), c = c.next;
          while (c !== null);
          return J.memoizedState = d, [d, b];
        }
        return [J.memoizedState, b];
      }
      return a = a === ub ? typeof b == "function" ? b() : b : c !== void 0 ? c(b) : b, J.memoizedState = a, a = J.queue = { last: null, dispatch: null }, a = a.dispatch = wb.bind(null, H, a), [J.memoizedState, a];
    }
    function xb(a, b) {
      if (H = P(), J = sb(), b = b === void 0 ? null : b, J !== null) {
        var c = J.memoizedState;
        if (c !== null && b !== null) {
          var d = c[1];
          a:
            if (d === null)
              d = !1;
            else {
              for (var f = 0; f < d.length && f < b.length; f++)
                if (!nb(b[f], d[f])) {
                  d = !1;
                  break a;
                }
              d = !0;
            }
          if (d)
            return c[0];
        }
      }
      return a = a(), J.memoizedState = [a, b], a;
    }
    function wb(a, b, c) {
      if (25 <= O)
        throw Error("Too many re-renders. React limits the number of renders to prevent an infinite loop.");
      if (a === H)
        if (L = !0, a = { action: c, next: null }, N === null && (N = /* @__PURE__ */ new Map()), c = N.get(b), c === void 0)
          N.set(b, a);
        else {
          for (b = c; b.next !== null; )
            b = b.next;
          b.next = a;
        }
    }
    function yb() {
      throw Error("startTransition cannot be called during server rendering.");
    }
    function Q() {
    }
    var zb = { readContext: function(a) {
      return a._currentValue2;
    }, useContext: function(a) {
      return P(), a._currentValue2;
    }, useMemo: xb, useReducer: vb, useRef: function(a) {
      H = P(), J = sb();
      var b = J.memoizedState;
      return b === null ? (a = { current: a }, J.memoizedState = a) : b;
    }, useState: function(a) {
      return vb(ub, a);
    }, useInsertionEffect: Q, useLayoutEffect: function() {
    }, useCallback: function(a, b) {
      return xb(function() {
        return a;
      }, b);
    }, useImperativeHandle: Q, useEffect: Q, useDebugValue: Q, useDeferredValue: function(a) {
      return P(), a;
    }, useTransition: function() {
      return P(), [!1, yb];
    }, useId: function() {
      var a = ob.treeContext, b = a.overflow;
      a = a.id, a = (a & ~(1 << 32 - G(a) - 1)).toString(32) + b;
      var c = R;
      if (c === null)
        throw Error("Invalid hook call. Hooks can only be called inside of the body of a function component.");
      return b = M++, a = ":" + c.idPrefix + "R" + a, 0 < b && (a += "H" + b.toString(32)), a + ":";
    }, useMutableSource: function(a, b) {
      return P(), b(a._source);
    }, useSyncExternalStore: function(a, b, c) {
      if (c === void 0)
        throw Error("Missing getServerSnapshot, which is required for server-rendered content. Will revert to client rendering.");
      return c();
    } }, R = null, Ab = ea.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentDispatcher;
    function Bb(a) {
      return console.error(a), null;
    }
    function S() {
    }
    function Cb(a, b, c, d, f, e, g, h, k) {
      var m = [], l = /* @__PURE__ */ new Set();
      return b = { destination: null, responseState: b, progressiveChunkSize: d === void 0 ? 12800 : d, status: 0, fatalError: null, nextSegmentId: 0, allPendingTasks: 0, pendingRootTasks: 0, completedRootSegment: null, abortableTasks: l, pingedTasks: m, clientRenderedBoundaries: [], completedBoundaries: [], partialBoundaries: [], onError: f === void 0 ? Bb : f, onAllReady: e === void 0 ? S : e, onShellReady: g === void 0 ? S : g, onShellError: h === void 0 ? S : h, onFatalError: k === void 0 ? S : k }, c = T(b, 0, null, c, !1, !1), c.parentFlushed = !0, a = Db(b, a, null, c, l, $a, null, hb), m.push(a), b;
    }
    function Db(a, b, c, d, f, e, g, h) {
      a.allPendingTasks++, c === null ? a.pendingRootTasks++ : c.pendingTasks++;
      var k = { node: b, ping: function() {
        var b2 = a.pingedTasks;
        b2.push(k), b2.length === 1 && Eb(a);
      }, blockedBoundary: c, blockedSegment: d, abortSet: f, legacyContext: e, context: g, treeContext: h };
      return f.add(k), k;
    }
    function T(a, b, c, d, f, e) {
      return { status: 0, id: -1, index: b, parentFlushed: !1, chunks: [], children: [], formatContext: d, boundary: c, lastPushedText: f, textEmbedded: e };
    }
    function U(a, b) {
      if (a = a.onError(b), a != null && typeof a != "string")
        throw Error('onError returned something with a type other than "string". onError should return a string and may return null or undefined but must not return anything else. It received something of type "' + typeof a + '" instead');
      return a;
    }
    function V(a, b) {
      var c = a.onShellError;
      c(b), c = a.onFatalError, c(b), a.destination !== null ? (a.status = 2, a.destination.destroy(b)) : (a.status = 1, a.fatalError = b);
    }
    function Fb(a, b, c, d, f) {
      for (H = {}, ob = b, M = 0, a = c(d, f); L; )
        L = !1, M = 0, O += 1, J = null, a = c(d, f);
      return tb(), a;
    }
    function Gb(a, b, c, d) {
      var f = c.render(), e = d.childContextTypes;
      if (e != null) {
        var g = b.legacyContext;
        if (typeof c.getChildContext != "function")
          d = g;
        else {
          c = c.getChildContext();
          for (var h in c)
            if (!(h in e))
              throw Error((Za(d) || "Unknown") + '.getChildContext(): key "' + h + '" is not defined in childContextTypes.');
          d = A({}, g, c);
        }
        b.legacyContext = d, W(a, b, f), b.legacyContext = g;
      } else
        W(a, b, f);
    }
    function Hb(a, b) {
      if (a && a.defaultProps) {
        b = A({}, b), a = a.defaultProps;
        for (var c in a)
          b[c] === void 0 && (b[c] = a[c]);
        return b;
      }
      return b;
    }
    function Ib(a, b, c, d, f) {
      if (typeof c == "function")
        if (c.prototype && c.prototype.isReactComponent) {
          f = ab(c, b.legacyContext);
          var e = c.contextType;
          e = new c(d, typeof e == "object" && e !== null ? e._currentValue2 : f), gb(e, c, d, f), Gb(a, b, e, c);
        } else {
          e = ab(c, b.legacyContext), f = Fb(a, b, c, d, e);
          var g = M !== 0;
          if (typeof f == "object" && f !== null && typeof f.render == "function" && f.$$typeof === void 0)
            gb(f, c, d, e), Gb(a, b, f, c);
          else if (g) {
            d = b.treeContext, b.treeContext = ib(d, 1, 0);
            try {
              W(a, b, f);
            } finally {
              b.treeContext = d;
            }
          } else
            W(a, b, f);
        }
      else if (typeof c == "string") {
        switch (f = b.blockedSegment, e = za(f.chunks, c, d, a.responseState, f.formatContext), f.lastPushedText = !1, g = f.formatContext, f.formatContext = sa(g, c, d), Jb(a, b, e), f.formatContext = g, c) {
          case "area":
          case "base":
          case "br":
          case "col":
          case "embed":
          case "hr":
          case "img":
          case "input":
          case "keygen":
          case "link":
          case "meta":
          case "param":
          case "source":
          case "track":
          case "wbr":
            break;
          default:
            f.chunks.push("</", c, ">");
        }
        f.lastPushedText = !1;
      } else {
        switch (c) {
          case Wa:
          case Va:
          case La:
          case Ma:
          case Ka:
            W(a, b, d.children);
            return;
          case Ra:
            W(a, b, d.children);
            return;
          case Ua:
            throw Error("ReactDOMServer does not yet support scope components.");
          case Qa:
            a: {
              c = b.blockedBoundary, f = b.blockedSegment, e = d.fallback, d = d.children, g = /* @__PURE__ */ new Set();
              var h = { id: null, rootSegmentID: -1, parentFlushed: !1, pendingTasks: 0, forceClientRender: !1, completedSegments: [], byteSize: 0, fallbackAbortableTasks: g, errorDigest: null }, k = T(a, f.chunks.length, h, f.formatContext, !1, !1);
              f.children.push(k), f.lastPushedText = !1;
              var m = T(a, 0, null, f.formatContext, !1, !1);
              m.parentFlushed = !0, b.blockedBoundary = h, b.blockedSegment = m;
              try {
                if (Jb(a, b, d), a.responseState.generateStaticMarkup || m.lastPushedText && m.textEmbedded && m.chunks.push("<!-- -->"), m.status = 1, X(h, m), h.pendingTasks === 0)
                  break a;
              } catch (l) {
                m.status = 4, h.forceClientRender = !0, h.errorDigest = U(a, l);
              } finally {
                b.blockedBoundary = c, b.blockedSegment = f;
              }
              b = Db(a, e, c, k, g, b.legacyContext, b.context, b.treeContext), a.pingedTasks.push(b);
            }
            return;
        }
        if (typeof c == "object" && c !== null)
          switch (c.$$typeof) {
            case Pa:
              if (d = Fb(a, b, c.render, d, f), M !== 0) {
                c = b.treeContext, b.treeContext = ib(c, 1, 0);
                try {
                  W(a, b, d);
                } finally {
                  b.treeContext = c;
                }
              } else
                W(a, b, d);
              return;
            case Sa:
              c = c.type, d = Hb(c, d), Ib(a, b, c, d, f);
              return;
            case Na:
              if (f = d.children, c = c._context, d = d.value, e = c._currentValue2, c._currentValue2 = d, g = D, D = d = { parent: g, depth: g === null ? 0 : g.depth + 1, context: c, parentValue: e, value: d }, b.context = d, W(a, b, f), a = D, a === null)
                throw Error("Tried to pop a Context at the root of the app. This is a bug in React.");
              d = a.parentValue, a.context._currentValue2 = d === Xa ? a.context._defaultValue : d, a = D = a.parent, b.context = a;
              return;
            case Oa:
              d = d.children, d = d(c._currentValue2), W(a, b, d);
              return;
            case Ta:
              f = c._init, c = f(c._payload), d = Hb(c, d), Ib(a, b, c, d, void 0);
              return;
          }
        throw Error("Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: " + ((c == null ? c : typeof c) + "."));
      }
    }
    function W(a, b, c) {
      if (b.node = c, typeof c == "object" && c !== null) {
        switch (c.$$typeof) {
          case Ia:
            Ib(a, b, c.type, c.props, c.ref);
            return;
          case Ja:
            throw Error("Portals are not currently supported by the server renderer. Render them conditionally so that they only appear on the client render.");
          case Ta:
            var d = c._init;
            c = d(c._payload), W(a, b, c);
            return;
        }
        if (ra(c)) {
          Kb(a, b, c);
          return;
        }
        if (c === null || typeof c != "object" ? d = null : (d = Ya && c[Ya] || c["@@iterator"], d = typeof d == "function" ? d : null), d && (d = d.call(c))) {
          if (c = d.next(), !c.done) {
            var f = [];
            do
              f.push(c.value), c = d.next();
            while (!c.done);
            Kb(a, b, f);
          }
          return;
        }
        throw a = Object.prototype.toString.call(c), Error("Objects are not valid as a React child (found: " + (a === "[object Object]" ? "object with keys {" + Object.keys(c).join(", ") + "}" : a) + "). If you meant to render a collection of children, use an array instead.");
      }
      typeof c == "string" ? (d = b.blockedSegment, d.lastPushedText = Ha(b.blockedSegment.chunks, c, a.responseState, d.lastPushedText)) : typeof c == "number" && (d = b.blockedSegment, d.lastPushedText = Ha(
        b.blockedSegment.chunks,
        "" + c,
        a.responseState,
        d.lastPushedText
      ));
    }
    function Kb(a, b, c) {
      for (var d = c.length, f = 0; f < d; f++) {
        var e = b.treeContext;
        b.treeContext = ib(e, d, f);
        try {
          Jb(a, b, c[f]);
        } finally {
          b.treeContext = e;
        }
      }
    }
    function Jb(a, b, c) {
      var d = b.blockedSegment.formatContext, f = b.legacyContext, e = b.context;
      try {
        return W(a, b, c);
      } catch (k) {
        if (tb(), typeof k == "object" && k !== null && typeof k.then == "function") {
          c = k;
          var g = b.blockedSegment, h = T(a, g.chunks.length, null, g.formatContext, g.lastPushedText, !0);
          g.children.push(h), g.lastPushedText = !1, a = Db(a, b.node, b.blockedBoundary, h, b.abortSet, b.legacyContext, b.context, b.treeContext).ping, c.then(a, a), b.blockedSegment.formatContext = d, b.legacyContext = f, b.context = e, F(e);
        } else
          throw b.blockedSegment.formatContext = d, b.legacyContext = f, b.context = e, F(e), k;
      }
    }
    function Lb(a) {
      var b = a.blockedBoundary;
      a = a.blockedSegment, a.status = 3, Mb(this, b, a);
    }
    function Nb(a, b, c) {
      var d = a.blockedBoundary;
      a.blockedSegment.status = 3, d === null ? (b.allPendingTasks--, b.status !== 2 && (b.status = 2, b.destination !== null && b.destination.push(null))) : (d.pendingTasks--, d.forceClientRender || (d.forceClientRender = !0, d.errorDigest = b.onError(c === void 0 ? Error("The render was aborted by the server without a reason.") : c), d.parentFlushed && b.clientRenderedBoundaries.push(d)), d.fallbackAbortableTasks.forEach(function(a2) {
        return Nb(a2, b, c);
      }), d.fallbackAbortableTasks.clear(), b.allPendingTasks--, b.allPendingTasks === 0 && (a = b.onAllReady, a()));
    }
    function X(a, b) {
      if (b.chunks.length === 0 && b.children.length === 1 && b.children[0].boundary === null) {
        var c = b.children[0];
        c.id = b.id, c.parentFlushed = !0, c.status === 1 && X(a, c);
      } else
        a.completedSegments.push(b);
    }
    function Mb(a, b, c) {
      if (b === null) {
        if (c.parentFlushed) {
          if (a.completedRootSegment !== null)
            throw Error("There can only be one root segment. This is a bug in React.");
          a.completedRootSegment = c;
        }
        a.pendingRootTasks--, a.pendingRootTasks === 0 && (a.onShellError = S, b = a.onShellReady, b());
      } else
        b.pendingTasks--, b.forceClientRender || (b.pendingTasks === 0 ? (c.parentFlushed && c.status === 1 && X(b, c), b.parentFlushed && a.completedBoundaries.push(b), b.fallbackAbortableTasks.forEach(Lb, a), b.fallbackAbortableTasks.clear()) : c.parentFlushed && c.status === 1 && (X(b, c), b.completedSegments.length === 1 && b.parentFlushed && a.partialBoundaries.push(b)));
      a.allPendingTasks--, a.allPendingTasks === 0 && (a = a.onAllReady, a());
    }
    function Eb(a) {
      if (a.status !== 2) {
        var b = D, c = Ab.current;
        Ab.current = zb;
        var d = R;
        R = a.responseState;
        try {
          var f = a.pingedTasks, e;
          for (e = 0; e < f.length; e++) {
            var g = f[e], h = a, k = g.blockedSegment;
            if (k.status === 0) {
              F(g.context);
              try {
                W(h, g, g.node), h.responseState.generateStaticMarkup || k.lastPushedText && k.textEmbedded && k.chunks.push("<!-- -->"), g.abortSet.delete(g), k.status = 1, Mb(h, g.blockedBoundary, k);
              } catch (y) {
                if (tb(), typeof y == "object" && y !== null && typeof y.then == "function") {
                  var m = g.ping;
                  y.then(m, m);
                } else {
                  g.abortSet.delete(g), k.status = 4;
                  var l = g.blockedBoundary, p = y, B = U(h, p);
                  if (l === null ? V(h, p) : (l.pendingTasks--, l.forceClientRender || (l.forceClientRender = !0, l.errorDigest = B, l.parentFlushed && h.clientRenderedBoundaries.push(l))), h.allPendingTasks--, h.allPendingTasks === 0) {
                    var C = h.onAllReady;
                    C();
                  }
                }
              } finally {
              }
            }
          }
          f.splice(0, e), a.destination !== null && Ob(a, a.destination);
        } catch (y) {
          U(a, y), V(a, y);
        } finally {
          R = d, Ab.current = c, c === zb && F(b);
        }
      }
    }
    function Y(a, b, c) {
      switch (c.parentFlushed = !0, c.status) {
        case 0:
          var d = c.id = a.nextSegmentId++;
          return c.lastPushedText = !1, c.textEmbedded = !1, a = a.responseState, b.push('<template id="'), b.push(a.placeholderPrefix), a = d.toString(16), b.push(a), b.push('"></template>');
        case 1:
          c.status = 2;
          var f = !0;
          d = c.chunks;
          var e = 0;
          c = c.children;
          for (var g = 0; g < c.length; g++) {
            for (f = c[g]; e < f.index; e++)
              b.push(d[e]);
            f = Z(a, b, f);
          }
          for (; e < d.length - 1; e++)
            b.push(d[e]);
          return e < d.length && (f = b.push(d[e])), f;
        default:
          throw Error("Aborted, errored or already flushed boundaries should not be flushed again. This is a bug in React.");
      }
    }
    function Z(a, b, c) {
      var d = c.boundary;
      if (d === null)
        return Y(a, b, c);
      if (d.parentFlushed = !0, d.forceClientRender)
        return a.responseState.generateStaticMarkup || (d = d.errorDigest, b.push("<!--$!-->"), b.push("<template"), d && (b.push(' data-dgst="'), d = u(d), b.push(d), b.push('"')), b.push("></template>")), Y(a, b, c), a = a.responseState.generateStaticMarkup ? !0 : b.push("<!--/$-->"), a;
      if (0 < d.pendingTasks) {
        d.rootSegmentID = a.nextSegmentId++, 0 < d.completedSegments.length && a.partialBoundaries.push(d);
        var f = a.responseState, e = f.nextSuspenseID++;
        return f = f.boundaryPrefix + e.toString(16), d = d.id = f, Aa(b, a.responseState, d), Y(a, b, c), b.push("<!--/$-->");
      }
      if (d.byteSize > a.progressiveChunkSize)
        return d.rootSegmentID = a.nextSegmentId++, a.completedBoundaries.push(d), Aa(b, a.responseState, d.id), Y(a, b, c), b.push("<!--/$-->");
      if (a.responseState.generateStaticMarkup || b.push("<!--$-->"), c = d.completedSegments, c.length !== 1)
        throw Error("A previously unvisited boundary must have exactly one root segment. This is a bug in React.");
      return Z(a, b, c[0]), a = a.responseState.generateStaticMarkup ? !0 : b.push("<!--/$-->"), a;
    }
    function Pb(a, b, c) {
      return Ba(b, a.responseState, c.formatContext, c.id), Z(a, b, c), Ca(b, c.formatContext);
    }
    function Qb(a, b, c) {
      for (var d = c.completedSegments, f = 0; f < d.length; f++)
        Rb(a, b, c, d[f]);
      if (d.length = 0, a = a.responseState, d = c.id, c = c.rootSegmentID, b.push(a.startInlineScript), a.sentCompleteBoundaryFunction ? b.push('$RC("') : (a.sentCompleteBoundaryFunction = !0, b.push('function $RC(a,b){a=document.getElementById(a);b=document.getElementById(b);b.parentNode.removeChild(b);if(a){a=a.previousSibling;var f=a.parentNode,c=a.nextSibling,e=0;do{if(c&&8===c.nodeType){var d=c.data;if("/$"===d)if(0===e)break;else e--;else"$"!==d&&"$?"!==d&&"$!"!==d||e++}d=c.nextSibling;f.removeChild(c);c=d}while(c);for(;b.firstChild;)f.insertBefore(b.firstChild,c);a.data="$";a._reactRetry&&a._reactRetry()}};$RC("')), d === null)
        throw Error("An ID must have been assigned before we can complete the boundary.");
      return c = c.toString(16), b.push(d), b.push('","'), b.push(a.segmentPrefix), b.push(c), b.push('")</script>');
    }
    function Rb(a, b, c, d) {
      if (d.status === 2)
        return !0;
      var f = d.id;
      if (f === -1) {
        if ((d.id = c.rootSegmentID) === -1)
          throw Error("A root segment ID must have been assigned by now. This is a bug in React.");
        return Pb(a, b, d);
      }
      return Pb(a, b, d), a = a.responseState, b.push(a.startInlineScript), a.sentCompleteSegmentFunction ? b.push('$RS("') : (a.sentCompleteSegmentFunction = !0, b.push('function $RS(a,b){a=document.getElementById(a);b=document.getElementById(b);for(a.parentNode.removeChild(a);a.firstChild;)b.parentNode.insertBefore(a.firstChild,b);b.parentNode.removeChild(b)};$RS("')), b.push(a.segmentPrefix), f = f.toString(16), b.push(f), b.push('","'), b.push(a.placeholderPrefix), b.push(f), b.push('")</script>');
    }
    function Ob(a, b) {
      try {
        var c = a.completedRootSegment;
        if (c !== null && a.pendingRootTasks === 0) {
          Z(a, b, c), a.completedRootSegment = null;
          var d = a.responseState.bootstrapChunks;
          for (c = 0; c < d.length - 1; c++)
            b.push(d[c]);
          c < d.length && b.push(d[c]);
        }
        var f = a.clientRenderedBoundaries, e;
        for (e = 0; e < f.length; e++) {
          var g = f[e];
          d = b;
          var h = a.responseState, k = g.id, m = g.errorDigest, l = g.errorMessage, p = g.errorComponentStack;
          if (d.push(h.startInlineScript), h.sentClientRenderFunction ? d.push('$RX("') : (h.sentClientRenderFunction = !0, d.push('function $RX(b,c,d,e){var a=document.getElementById(b);a&&(b=a.previousSibling,b.data="$!",a=a.dataset,c&&(a.dgst=c),d&&(a.msg=d),e&&(a.stck=e),b._reactRetry&&b._reactRetry())};$RX("')), k === null)
            throw Error("An ID must have been assigned before we can complete the boundary.");
          if (d.push(k), d.push('"'), m || l || p) {
            d.push(",");
            var B = Ea(m || "");
            d.push(B);
          }
          if (l || p) {
            d.push(",");
            var C = Ea(l || "");
            d.push(C);
          }
          if (p) {
            d.push(",");
            var y = Ea(p);
            d.push(y);
          }
          if (!d.push(")</script>")) {
            a.destination = null, e++, f.splice(0, e);
            return;
          }
        }
        f.splice(0, e);
        var aa = a.completedBoundaries;
        for (e = 0; e < aa.length; e++)
          if (!Qb(a, b, aa[e])) {
            a.destination = null, e++, aa.splice(0, e);
            return;
          }
        aa.splice(0, e);
        var ba = a.partialBoundaries;
        for (e = 0; e < ba.length; e++) {
          var pb = ba[e];
          a: {
            f = a, g = b;
            var ca = pb.completedSegments;
            for (h = 0; h < ca.length; h++)
              if (!Rb(f, g, pb, ca[h])) {
                h++, ca.splice(0, h);
                var qb = !1;
                break a;
              }
            ca.splice(0, h), qb = !0;
          }
          if (!qb) {
            a.destination = null, e++, ba.splice(0, e);
            return;
          }
        }
        ba.splice(0, e);
        var da = a.completedBoundaries;
        for (e = 0; e < da.length; e++)
          if (!Qb(a, b, da[e])) {
            a.destination = null, e++, da.splice(0, e);
            return;
          }
        da.splice(0, e);
      } finally {
        a.allPendingTasks === 0 && a.pingedTasks.length === 0 && a.clientRenderedBoundaries.length === 0 && a.completedBoundaries.length === 0 && b.push(null);
      }
    }
    function Sb(a, b) {
      if (a.status === 1)
        a.status = 2, b.destroy(a.fatalError);
      else if (a.status !== 2 && a.destination === null) {
        a.destination = b;
        try {
          Ob(a, b);
        } catch (c) {
          U(a, c), V(a, c);
        }
      }
    }
    function Tb(a, b) {
      try {
        var c = a.abortableTasks;
        c.forEach(function(c2) {
          return Nb(c2, a, b);
        }), c.clear(), a.destination !== null && Ob(a, a.destination);
      } catch (d) {
        U(a, d), V(a, d);
      }
    }
    function Ub() {
    }
    function Vb(a, b, c, d) {
      var f = !1, e = null, g = "", h = !1;
      if (a = Cb(a, Fa(c, b ? b.identifierPrefix : void 0), Ga(), 1 / 0, Ub, void 0, function() {
        h = !0;
      }, void 0, void 0), Eb(a), Tb(a, d), Sb(a, { push: function(a2) {
        return a2 !== null && (g += a2), !0;
      }, destroy: function(a2) {
        f = !0, e = a2;
      } }), f)
        throw e;
      if (!h)
        throw Error("A component suspended while responding to synchronous input. This will cause the UI to be replaced with a loading indicator. To fix, updates that suspend should be wrapped with startTransition.");
      return g;
    }
    function Wb(a, b) {
      a.prototype = Object.create(b.prototype), a.prototype.constructor = a, a.__proto__ = b;
    }
    var Xb = function(a) {
      function b() {
        var b2 = a.call(this, {}) || this;
        return b2.request = null, b2.startedFlowing = !1, b2;
      }
      Wb(b, a);
      var c = b.prototype;
      return c._destroy = function(a2, b2) {
        Tb(this.request), b2(a2);
      }, c._read = function() {
        this.startedFlowing && Sb(this.request, this);
      }, b;
    }(fa.Readable);
    function Yb() {
    }
    function Zb(a, b) {
      var c = new Xb(), d = Cb(a, Fa(!1, b ? b.identifierPrefix : void 0), Ga(), 1 / 0, Yb, function() {
        c.startedFlowing = !0, Sb(d, c);
      }, void 0, void 0);
      return c.request = d, Eb(d), c;
    }
    exports.renderToNodeStream = function(a, b) {
      return Zb(a, b);
    };
    exports.renderToStaticMarkup = function(a, b) {
      return Vb(a, b, !0, 'The server used "renderToStaticMarkup" which does not support Suspense. If you intended to have the server wait for the suspended component please switch to "renderToPipeableStream" which supports Suspense on the server');
    };
    exports.renderToStaticNodeStream = function(a, b) {
      return Zb(a, b);
    };
    exports.renderToString = function(a, b) {
      return Vb(a, b, !1, 'The server used "renderToString" which does not support Suspense. If you intended for this Suspense boundary to render the fallback content on the server consider throwing an Error somewhere within the Suspense boundary. If you intended to have the server wait for the suspended component please switch to "renderToPipeableStream" which supports Suspense on the server');
    };
    exports.version = "18.2.0";
  }
});

// node_modules/react-dom/cjs/react-dom-server.node.production.min.js
var require_react_dom_server_node_production_min = __commonJS({
  "node_modules/react-dom/cjs/react-dom-server.node.production.min.js"(exports) {
    "use strict";
    var aa = __require("util"), ba = __require("react"), k = null, l = 0, q = !0;
    function r(a, b) {
      if (typeof b == "string") {
        if (b.length !== 0)
          if (2048 < 3 * b.length)
            0 < l && (t(a, k.subarray(0, l)), k = new Uint8Array(2048), l = 0), t(a, u.encode(b));
          else {
            var c = k;
            0 < l && (c = k.subarray(l)), c = u.encodeInto(b, c);
            var d = c.read;
            l += c.written, d < b.length && (t(a, k), k = new Uint8Array(2048), l = u.encodeInto(b.slice(d), k).written), l === 2048 && (t(a, k), k = new Uint8Array(2048), l = 0);
          }
      } else
        b.byteLength !== 0 && (2048 < b.byteLength ? (0 < l && (t(a, k.subarray(0, l)), k = new Uint8Array(2048), l = 0), t(a, b)) : (c = k.length - l, c < b.byteLength && (c === 0 ? t(
          a,
          k
        ) : (k.set(b.subarray(0, c), l), l += c, t(a, k), b = b.subarray(c)), k = new Uint8Array(2048), l = 0), k.set(b, l), l += b.byteLength, l === 2048 && (t(a, k), k = new Uint8Array(2048), l = 0)));
    }
    function t(a, b) {
      a = a.write(b), q = q && a;
    }
    function w(a, b) {
      return r(a, b), q;
    }
    function ca(a) {
      k && 0 < l && a.write(k.subarray(0, l)), k = null, l = 0, q = !0;
    }
    var u = new aa.TextEncoder();
    function x(a) {
      return u.encode(a);
    }
    var y = Object.prototype.hasOwnProperty, da = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, ea = {}, fa = {};
    function ha(a) {
      return y.call(fa, a) ? !0 : y.call(ea, a) ? !1 : da.test(a) ? fa[a] = !0 : (ea[a] = !0, !1);
    }
    function z(a, b, c, d, f, e, g) {
      this.acceptsBooleans = b === 2 || b === 3 || b === 4, this.attributeName = d, this.attributeNamespace = f, this.mustUseProperty = c, this.propertyName = a, this.type = b, this.sanitizeURL = e, this.removeEmptyString = g;
    }
    var A = {};
    "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(a) {
      A[a] = new z(a, 0, !1, a, null, !1, !1);
    });
    [["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(a) {
      var b = a[0];
      A[b] = new z(b, 1, !1, a[1], null, !1, !1);
    });
    ["contentEditable", "draggable", "spellCheck", "value"].forEach(function(a) {
      A[a] = new z(a, 2, !1, a.toLowerCase(), null, !1, !1);
    });
    ["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(a) {
      A[a] = new z(a, 2, !1, a, null, !1, !1);
    });
    "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(a) {
      A[a] = new z(a, 3, !1, a.toLowerCase(), null, !1, !1);
    });
    ["checked", "multiple", "muted", "selected"].forEach(function(a) {
      A[a] = new z(a, 3, !0, a, null, !1, !1);
    });
    ["capture", "download"].forEach(function(a) {
      A[a] = new z(a, 4, !1, a, null, !1, !1);
    });
    ["cols", "rows", "size", "span"].forEach(function(a) {
      A[a] = new z(a, 6, !1, a, null, !1, !1);
    });
    ["rowSpan", "start"].forEach(function(a) {
      A[a] = new z(a, 5, !1, a.toLowerCase(), null, !1, !1);
    });
    var ia = /[\-:]([a-z])/g;
    function ja(a) {
      return a[1].toUpperCase();
    }
    "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(a) {
      var b = a.replace(
        ia,
        ja
      );
      A[b] = new z(b, 1, !1, a, null, !1, !1);
    });
    "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(a) {
      var b = a.replace(ia, ja);
      A[b] = new z(b, 1, !1, a, "http://www.w3.org/1999/xlink", !1, !1);
    });
    ["xml:base", "xml:lang", "xml:space"].forEach(function(a) {
      var b = a.replace(ia, ja);
      A[b] = new z(b, 1, !1, a, "http://www.w3.org/XML/1998/namespace", !1, !1);
    });
    ["tabIndex", "crossOrigin"].forEach(function(a) {
      A[a] = new z(a, 1, !1, a.toLowerCase(), null, !1, !1);
    });
    A.xlinkHref = new z("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1);
    ["src", "href", "action", "formAction"].forEach(function(a) {
      A[a] = new z(a, 1, !1, a.toLowerCase(), null, !0, !0);
    });
    var B = {
      animationIterationCount: !0,
      aspectRatio: !0,
      borderImageOutset: !0,
      borderImageSlice: !0,
      borderImageWidth: !0,
      boxFlex: !0,
      boxFlexGroup: !0,
      boxOrdinalGroup: !0,
      columnCount: !0,
      columns: !0,
      flex: !0,
      flexGrow: !0,
      flexPositive: !0,
      flexShrink: !0,
      flexNegative: !0,
      flexOrder: !0,
      gridArea: !0,
      gridRow: !0,
      gridRowEnd: !0,
      gridRowSpan: !0,
      gridRowStart: !0,
      gridColumn: !0,
      gridColumnEnd: !0,
      gridColumnSpan: !0,
      gridColumnStart: !0,
      fontWeight: !0,
      lineClamp: !0,
      lineHeight: !0,
      opacity: !0,
      order: !0,
      orphans: !0,
      tabSize: !0,
      widows: !0,
      zIndex: !0,
      zoom: !0,
      fillOpacity: !0,
      floodOpacity: !0,
      stopOpacity: !0,
      strokeDasharray: !0,
      strokeDashoffset: !0,
      strokeMiterlimit: !0,
      strokeOpacity: !0,
      strokeWidth: !0
    }, ka = ["Webkit", "ms", "Moz", "O"];
    Object.keys(B).forEach(function(a) {
      ka.forEach(function(b) {
        b = b + a.charAt(0).toUpperCase() + a.substring(1), B[b] = B[a];
      });
    });
    var la = /["'&<>]/;
    function F(a) {
      if (typeof a == "boolean" || typeof a == "number")
        return "" + a;
      a = "" + a;
      var b = la.exec(a);
      if (b) {
        var c = "", d, f = 0;
        for (d = b.index; d < a.length; d++) {
          switch (a.charCodeAt(d)) {
            case 34:
              b = "&quot;";
              break;
            case 38:
              b = "&amp;";
              break;
            case 39:
              b = "&#x27;";
              break;
            case 60:
              b = "&lt;";
              break;
            case 62:
              b = "&gt;";
              break;
            default:
              continue;
          }
          f !== d && (c += a.substring(f, d)), f = d + 1, c += b;
        }
        a = f !== d ? c + a.substring(f, d) : c;
      }
      return a;
    }
    var ma = /([A-Z])/g, pa = /^ms-/, qa = Array.isArray, ra = x("<script>"), sa = x("</script>"), ta = x('<script src="'), ua = x('<script type="module" src="'), va = x('" async=""></script>'), wa = /(<\/|<)(s)(cript)/gi;
    function xa(a, b, c, d) {
      return "" + b + (c === "s" ? "\\u0073" : "\\u0053") + d;
    }
    function G(a, b) {
      return { insertionMode: a, selectedValue: b };
    }
    function ya(a, b, c) {
      switch (b) {
        case "select":
          return G(1, c.value != null ? c.value : c.defaultValue);
        case "svg":
          return G(2, null);
        case "math":
          return G(3, null);
        case "foreignObject":
          return G(1, null);
        case "table":
          return G(4, null);
        case "thead":
        case "tbody":
        case "tfoot":
          return G(5, null);
        case "colgroup":
          return G(7, null);
        case "tr":
          return G(6, null);
      }
      return 4 <= a.insertionMode || a.insertionMode === 0 ? G(1, null) : a;
    }
    var za = x("<!-- -->");
    function Aa(a, b, c, d) {
      return b === "" ? d : (d && a.push(za), a.push(F(b)), !0);
    }
    var Ba = /* @__PURE__ */ new Map(), Ca = x(' style="'), Da = x(":"), Ea = x(";");
    function Fa(a, b, c) {
      if (typeof c != "object")
        throw Error("The `style` prop expects a mapping from style properties to values, not a string. For example, style={{marginRight: spacing + 'em'}} when using JSX.");
      b = !0;
      for (var d in c)
        if (y.call(c, d)) {
          var f = c[d];
          if (f != null && typeof f != "boolean" && f !== "") {
            if (d.indexOf("--") === 0) {
              var e = F(d);
              f = F(("" + f).trim());
            } else {
              e = d;
              var g = Ba.get(e);
              g !== void 0 || (g = x(F(e.replace(ma, "-$1").toLowerCase().replace(pa, "-ms-"))), Ba.set(e, g)), e = g, f = typeof f == "number" ? f === 0 || y.call(
                B,
                d
              ) ? "" + f : f + "px" : F(("" + f).trim());
            }
            b ? (b = !1, a.push(Ca, e, Da, f)) : a.push(Ea, e, Da, f);
          }
        }
      b || a.push(H);
    }
    var I = x(" "), J = x('="'), H = x('"'), Ga = x('=""');
    function K(a, b, c, d) {
      switch (c) {
        case "style":
          Fa(a, b, d);
          return;
        case "defaultValue":
        case "defaultChecked":
        case "innerHTML":
        case "suppressContentEditableWarning":
        case "suppressHydrationWarning":
          return;
      }
      if (!(2 < c.length) || c[0] !== "o" && c[0] !== "O" || c[1] !== "n" && c[1] !== "N") {
        if (b = A.hasOwnProperty(c) ? A[c] : null, b !== null) {
          switch (typeof d) {
            case "function":
            case "symbol":
              return;
            case "boolean":
              if (!b.acceptsBooleans)
                return;
          }
          switch (c = b.attributeName, b.type) {
            case 3:
              d && a.push(I, c, Ga);
              break;
            case 4:
              d === !0 ? a.push(I, c, Ga) : d !== !1 && a.push(I, c, J, F(d), H);
              break;
            case 5:
              isNaN(d) || a.push(I, c, J, F(d), H);
              break;
            case 6:
              !isNaN(d) && 1 <= d && a.push(I, c, J, F(d), H);
              break;
            default:
              b.sanitizeURL && (d = "" + d), a.push(I, c, J, F(d), H);
          }
        } else if (ha(c)) {
          switch (typeof d) {
            case "function":
            case "symbol":
              return;
            case "boolean":
              if (b = c.toLowerCase().slice(0, 5), b !== "data-" && b !== "aria-")
                return;
          }
          a.push(I, c, J, F(d), H);
        }
      }
    }
    var L = x(">"), Ha = x("/>");
    function M(a, b, c) {
      if (b != null) {
        if (c != null)
          throw Error("Can only set one of `children` or `props.dangerouslySetInnerHTML`.");
        if (typeof b != "object" || !("__html" in b))
          throw Error("`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. Please visit https://reactjs.org/link/dangerously-set-inner-html for more information.");
        b = b.__html, b != null && a.push("" + b);
      }
    }
    function Ia(a) {
      var b = "";
      return ba.Children.forEach(a, function(a2) {
        a2 != null && (b += a2);
      }), b;
    }
    var Ja = x(' selected=""');
    function Ka(a, b, c, d) {
      a.push(N(c));
      var f = c = null, e;
      for (e in b)
        if (y.call(b, e)) {
          var g = b[e];
          if (g != null)
            switch (e) {
              case "children":
                c = g;
                break;
              case "dangerouslySetInnerHTML":
                f = g;
                break;
              default:
                K(a, d, e, g);
            }
        }
      return a.push(L), M(a, f, c), typeof c == "string" ? (a.push(F(c)), null) : c;
    }
    var La = x(`
`), Ma = /^[a-zA-Z][a-zA-Z:_\.\-\d]*$/, Na = /* @__PURE__ */ new Map();
    function N(a) {
      var b = Na.get(a);
      if (b === void 0) {
        if (!Ma.test(a))
          throw Error("Invalid tag: " + a);
        b = x("<" + a), Na.set(a, b);
      }
      return b;
    }
    var Oa = x("<!DOCTYPE html>");
    function Pa(a, b, c, d, f) {
      switch (b) {
        case "select":
          a.push(N("select"));
          var e = null, g = null;
          for (p in c)
            if (y.call(c, p)) {
              var h = c[p];
              if (h != null)
                switch (p) {
                  case "children":
                    e = h;
                    break;
                  case "dangerouslySetInnerHTML":
                    g = h;
                    break;
                  case "defaultValue":
                  case "value":
                    break;
                  default:
                    K(a, d, p, h);
                }
            }
          return a.push(L), M(a, g, e), e;
        case "option":
          g = f.selectedValue, a.push(N("option"));
          var m = h = null, n = null, p = null;
          for (e in c)
            if (y.call(c, e)) {
              var v = c[e];
              if (v != null)
                switch (e) {
                  case "children":
                    h = v;
                    break;
                  case "selected":
                    n = v;
                    break;
                  case "dangerouslySetInnerHTML":
                    p = v;
                    break;
                  case "value":
                    m = v;
                  default:
                    K(a, d, e, v);
                }
            }
          if (g != null)
            if (c = m !== null ? "" + m : Ia(h), qa(g)) {
              for (d = 0; d < g.length; d++)
                if ("" + g[d] === c) {
                  a.push(Ja);
                  break;
                }
            } else
              "" + g === c && a.push(Ja);
          else
            n && a.push(Ja);
          return a.push(L), M(a, p, h), h;
        case "textarea":
          a.push(N("textarea")), p = g = e = null;
          for (h in c)
            if (y.call(c, h) && (m = c[h], m != null))
              switch (h) {
                case "children":
                  p = m;
                  break;
                case "value":
                  e = m;
                  break;
                case "defaultValue":
                  g = m;
                  break;
                case "dangerouslySetInnerHTML":
                  throw Error("`dangerouslySetInnerHTML` does not make sense on <textarea>.");
                default:
                  K(a, d, h, m);
              }
          if (e === null && g !== null && (e = g), a.push(L), p != null) {
            if (e != null)
              throw Error("If you supply `defaultValue` on a <textarea>, do not pass children.");
            if (qa(p) && 1 < p.length)
              throw Error("<textarea> can only have at most one child.");
            e = "" + p;
          }
          return typeof e == "string" && e[0] === `
` && a.push(La), e !== null && a.push(F("" + e)), null;
        case "input":
          a.push(N("input")), m = p = h = e = null;
          for (g in c)
            if (y.call(c, g) && (n = c[g], n != null))
              switch (g) {
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error("input is a self-closing tag and must neither have `children` nor use `dangerouslySetInnerHTML`.");
                case "defaultChecked":
                  m = n;
                  break;
                case "defaultValue":
                  h = n;
                  break;
                case "checked":
                  p = n;
                  break;
                case "value":
                  e = n;
                  break;
                default:
                  K(a, d, g, n);
              }
          return p !== null ? K(a, d, "checked", p) : m !== null && K(a, d, "checked", m), e !== null ? K(a, d, "value", e) : h !== null && K(a, d, "value", h), a.push(Ha), null;
        case "menuitem":
          a.push(N("menuitem"));
          for (var C in c)
            if (y.call(c, C) && (e = c[C], e != null))
              switch (C) {
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error("menuitems cannot have `children` nor `dangerouslySetInnerHTML`.");
                default:
                  K(a, d, C, e);
              }
          return a.push(L), null;
        case "title":
          a.push(N("title")), e = null;
          for (v in c)
            if (y.call(c, v) && (g = c[v], g != null))
              switch (v) {
                case "children":
                  e = g;
                  break;
                case "dangerouslySetInnerHTML":
                  throw Error("`dangerouslySetInnerHTML` does not make sense on <title>.");
                default:
                  K(a, d, v, g);
              }
          return a.push(L), e;
        case "listing":
        case "pre":
          a.push(N(b)), g = e = null;
          for (m in c)
            if (y.call(c, m) && (h = c[m], h != null))
              switch (m) {
                case "children":
                  e = h;
                  break;
                case "dangerouslySetInnerHTML":
                  g = h;
                  break;
                default:
                  K(a, d, m, h);
              }
          if (a.push(L), g != null) {
            if (e != null)
              throw Error("Can only set one of `children` or `props.dangerouslySetInnerHTML`.");
            if (typeof g != "object" || !("__html" in g))
              throw Error("`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. Please visit https://reactjs.org/link/dangerously-set-inner-html for more information.");
            c = g.__html, c != null && (typeof c == "string" && 0 < c.length && c[0] === `
` ? a.push(La, c) : a.push("" + c));
          }
          return typeof e == "string" && e[0] === `
` && a.push(La), e;
        case "area":
        case "base":
        case "br":
        case "col":
        case "embed":
        case "hr":
        case "img":
        case "keygen":
        case "link":
        case "meta":
        case "param":
        case "source":
        case "track":
        case "wbr":
          a.push(N(b));
          for (var D in c)
            if (y.call(c, D) && (e = c[D], e != null))
              switch (D) {
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(b + " is a self-closing tag and must neither have `children` nor use `dangerouslySetInnerHTML`.");
                default:
                  K(a, d, D, e);
              }
          return a.push(Ha), null;
        case "annotation-xml":
        case "color-profile":
        case "font-face":
        case "font-face-src":
        case "font-face-uri":
        case "font-face-format":
        case "font-face-name":
        case "missing-glyph":
          return Ka(a, c, b, d);
        case "html":
          return f.insertionMode === 0 && a.push(Oa), Ka(
            a,
            c,
            b,
            d
          );
        default:
          if (b.indexOf("-") === -1 && typeof c.is != "string")
            return Ka(a, c, b, d);
          a.push(N(b)), g = e = null;
          for (n in c)
            if (y.call(c, n) && (h = c[n], h != null))
              switch (n) {
                case "children":
                  e = h;
                  break;
                case "dangerouslySetInnerHTML":
                  g = h;
                  break;
                case "style":
                  Fa(a, d, h);
                  break;
                case "suppressContentEditableWarning":
                case "suppressHydrationWarning":
                  break;
                default:
                  ha(n) && typeof h != "function" && typeof h != "symbol" && a.push(I, n, J, F(h), H);
              }
          return a.push(L), M(a, g, e), e;
      }
    }
    var Qa = x("</"), Ra = x(">"), Sa = x('<template id="'), Ta = x('"></template>'), Ua = x("<!--$-->"), Va = x('<!--$?--><template id="'), Wa = x('"></template>'), Xa = x("<!--$!-->"), Ya = x("<!--/$-->"), Za = x("<template"), $a = x('"'), ab = x(' data-dgst="');
    x(' data-msg="');
    x(' data-stck="');
    var bb = x("></template>");
    function cb(a, b, c) {
      if (r(a, Va), c === null)
        throw Error("An ID must have been assigned before we can complete the boundary.");
      return r(a, c), w(a, Wa);
    }
    var db = x('<div hidden id="'), eb = x('">'), fb = x("</div>"), gb = x('<svg aria-hidden="true" style="display:none" id="'), hb = x('">'), ib = x("</svg>"), jb = x('<math aria-hidden="true" style="display:none" id="'), kb = x('">'), lb = x("</math>"), mb = x('<table hidden id="'), nb = x('">'), ob = x("</table>"), pb = x('<table hidden><tbody id="'), qb = x('">'), rb = x("</tbody></table>"), sb = x('<table hidden><tr id="'), tb = x('">'), ub = x("</tr></table>"), vb = x('<table hidden><colgroup id="'), wb = x('">'), xb = x("</colgroup></table>");
    function yb(a, b, c, d) {
      switch (c.insertionMode) {
        case 0:
        case 1:
          return r(a, db), r(a, b.segmentPrefix), r(a, d.toString(16)), w(a, eb);
        case 2:
          return r(a, gb), r(a, b.segmentPrefix), r(a, d.toString(16)), w(a, hb);
        case 3:
          return r(a, jb), r(a, b.segmentPrefix), r(a, d.toString(16)), w(a, kb);
        case 4:
          return r(a, mb), r(a, b.segmentPrefix), r(a, d.toString(16)), w(a, nb);
        case 5:
          return r(a, pb), r(a, b.segmentPrefix), r(a, d.toString(16)), w(a, qb);
        case 6:
          return r(a, sb), r(a, b.segmentPrefix), r(a, d.toString(16)), w(a, tb);
        case 7:
          return r(a, vb), r(
            a,
            b.segmentPrefix
          ), r(a, d.toString(16)), w(a, wb);
        default:
          throw Error("Unknown insertion mode. This is a bug in React.");
      }
    }
    function zb(a, b) {
      switch (b.insertionMode) {
        case 0:
        case 1:
          return w(a, fb);
        case 2:
          return w(a, ib);
        case 3:
          return w(a, lb);
        case 4:
          return w(a, ob);
        case 5:
          return w(a, rb);
        case 6:
          return w(a, ub);
        case 7:
          return w(a, xb);
        default:
          throw Error("Unknown insertion mode. This is a bug in React.");
      }
    }
    var Ab = x('function $RS(a,b){a=document.getElementById(a);b=document.getElementById(b);for(a.parentNode.removeChild(a);a.firstChild;)b.parentNode.insertBefore(a.firstChild,b);b.parentNode.removeChild(b)};$RS("'), Bb = x('$RS("'), Cb = x('","'), Db = x('")</script>'), Fb = x('function $RC(a,b){a=document.getElementById(a);b=document.getElementById(b);b.parentNode.removeChild(b);if(a){a=a.previousSibling;var f=a.parentNode,c=a.nextSibling,e=0;do{if(c&&8===c.nodeType){var d=c.data;if("/$"===d)if(0===e)break;else e--;else"$"!==d&&"$?"!==d&&"$!"!==d||e++}d=c.nextSibling;f.removeChild(c);c=d}while(c);for(;b.firstChild;)f.insertBefore(b.firstChild,c);a.data="$";a._reactRetry&&a._reactRetry()}};$RC("'), Gb = x('$RC("'), Hb = x('","'), Ib = x('")</script>'), Jb = x('function $RX(b,c,d,e){var a=document.getElementById(b);a&&(b=a.previousSibling,b.data="$!",a=a.dataset,c&&(a.dgst=c),d&&(a.msg=d),e&&(a.stck=e),b._reactRetry&&b._reactRetry())};$RX("'), Kb = x('$RX("'), Lb = x('"'), Mb = x(")</script>"), Nb = x(","), Ob = /[<\u2028\u2029]/g;
    function Pb(a) {
      return JSON.stringify(a).replace(Ob, function(a2) {
        switch (a2) {
          case "<":
            return "\\u003c";
          case "\u2028":
            return "\\u2028";
          case "\u2029":
            return "\\u2029";
          default:
            throw Error("escapeJSStringsForInstructionScripts encountered a match it does not know how to replace. this means the match regex and the replacement characters are no longer in sync. This is a bug in React");
        }
      });
    }
    var O = Object.assign, Qb = Symbol.for("react.element"), Rb = Symbol.for("react.portal"), Sb = Symbol.for("react.fragment"), Tb = Symbol.for("react.strict_mode"), Ub = Symbol.for("react.profiler"), Vb = Symbol.for("react.provider"), Wb = Symbol.for("react.context"), Xb = Symbol.for("react.forward_ref"), Yb = Symbol.for("react.suspense"), Zb = Symbol.for("react.suspense_list"), $b = Symbol.for("react.memo"), ac = Symbol.for("react.lazy"), bc = Symbol.for("react.scope"), cc = Symbol.for("react.debug_trace_mode"), dc = Symbol.for("react.legacy_hidden"), ec = Symbol.for("react.default_value"), fc = Symbol.iterator;
    function gc(a) {
      if (a == null)
        return null;
      if (typeof a == "function")
        return a.displayName || a.name || null;
      if (typeof a == "string")
        return a;
      switch (a) {
        case Sb:
          return "Fragment";
        case Rb:
          return "Portal";
        case Ub:
          return "Profiler";
        case Tb:
          return "StrictMode";
        case Yb:
          return "Suspense";
        case Zb:
          return "SuspenseList";
      }
      if (typeof a == "object")
        switch (a.$$typeof) {
          case Wb:
            return (a.displayName || "Context") + ".Consumer";
          case Vb:
            return (a._context.displayName || "Context") + ".Provider";
          case Xb:
            var b = a.render;
            return a = a.displayName, a || (a = b.displayName || b.name || "", a = a !== "" ? "ForwardRef(" + a + ")" : "ForwardRef"), a;
          case $b:
            return b = a.displayName || null, b !== null ? b : gc(a.type) || "Memo";
          case ac:
            b = a._payload, a = a._init;
            try {
              return gc(a(b));
            } catch {
            }
        }
      return null;
    }
    var hc = {};
    function ic(a, b) {
      if (a = a.contextTypes, !a)
        return hc;
      var c = {}, d;
      for (d in a)
        c[d] = b[d];
      return c;
    }
    var P = null;
    function Q(a, b) {
      if (a !== b) {
        a.context._currentValue = a.parentValue, a = a.parent;
        var c = b.parent;
        if (a === null) {
          if (c !== null)
            throw Error("The stacks must reach the root at the same time. This is a bug in React.");
        } else {
          if (c === null)
            throw Error("The stacks must reach the root at the same time. This is a bug in React.");
          Q(a, c);
        }
        b.context._currentValue = b.value;
      }
    }
    function jc(a) {
      a.context._currentValue = a.parentValue, a = a.parent, a !== null && jc(a);
    }
    function kc(a) {
      var b = a.parent;
      b !== null && kc(b), a.context._currentValue = a.value;
    }
    function lc(a, b) {
      if (a.context._currentValue = a.parentValue, a = a.parent, a === null)
        throw Error("The depth must equal at least at zero before reaching the root. This is a bug in React.");
      a.depth === b.depth ? Q(a, b) : lc(a, b);
    }
    function mc(a, b) {
      var c = b.parent;
      if (c === null)
        throw Error("The depth must equal at least at zero before reaching the root. This is a bug in React.");
      a.depth === c.depth ? Q(a, c) : mc(a, c), b.context._currentValue = b.value;
    }
    function nc(a) {
      var b = P;
      b !== a && (b === null ? kc(a) : a === null ? jc(b) : b.depth === a.depth ? Q(b, a) : b.depth > a.depth ? lc(b, a) : mc(b, a), P = a);
    }
    var oc = { isMounted: function() {
      return !1;
    }, enqueueSetState: function(a, b) {
      a = a._reactInternals, a.queue !== null && a.queue.push(b);
    }, enqueueReplaceState: function(a, b) {
      a = a._reactInternals, a.replace = !0, a.queue = [b];
    }, enqueueForceUpdate: function() {
    } };
    function pc(a, b, c, d) {
      var f = a.state !== void 0 ? a.state : null;
      a.updater = oc, a.props = c, a.state = f;
      var e = { queue: [], replace: !1 };
      a._reactInternals = e;
      var g = b.contextType;
      if (a.context = typeof g == "object" && g !== null ? g._currentValue : d, g = b.getDerivedStateFromProps, typeof g == "function" && (g = g(c, f), f = g == null ? f : O({}, f, g), a.state = f), typeof b.getDerivedStateFromProps != "function" && typeof a.getSnapshotBeforeUpdate != "function" && (typeof a.UNSAFE_componentWillMount == "function" || typeof a.componentWillMount == "function"))
        if (b = a.state, typeof a.componentWillMount == "function" && a.componentWillMount(), typeof a.UNSAFE_componentWillMount == "function" && a.UNSAFE_componentWillMount(), b !== a.state && oc.enqueueReplaceState(a, a.state, null), e.queue !== null && 0 < e.queue.length)
          if (b = e.queue, g = e.replace, e.queue = null, e.replace = !1, g && b.length === 1)
            a.state = b[0];
          else {
            for (e = g ? b[0] : a.state, f = !0, g = g ? 1 : 0; g < b.length; g++) {
              var h = b[g];
              h = typeof h == "function" ? h.call(a, e, c, d) : h, h != null && (f ? (f = !1, e = O({}, e, h)) : O(e, h));
            }
            a.state = e;
          }
        else
          e.queue = null;
    }
    var qc = { id: 1, overflow: "" };
    function rc(a, b, c) {
      var d = a.id;
      a = a.overflow;
      var f = 32 - sc(d) - 1;
      d &= ~(1 << f), c += 1;
      var e = 32 - sc(b) + f;
      if (30 < e) {
        var g = f - f % 5;
        return e = (d & (1 << g) - 1).toString(32), d >>= g, f -= g, { id: 1 << 32 - sc(b) + f | c << f | d, overflow: e + a };
      }
      return { id: 1 << e | c << f | d, overflow: a };
    }
    var sc = Math.clz32 ? Math.clz32 : tc, uc = Math.log, vc = Math.LN2;
    function tc(a) {
      return a >>>= 0, a === 0 ? 32 : 31 - (uc(a) / vc | 0) | 0;
    }
    function wc(a, b) {
      return a === b && (a !== 0 || 1 / a === 1 / b) || a !== a && b !== b;
    }
    var xc = typeof Object.is == "function" ? Object.is : wc, R = null, yc = null, zc = null, S = null, T = !1, Ac = !1, U = 0, V = null, Bc = 0;
    function W() {
      if (R === null)
        throw Error(`Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.`);
      return R;
    }
    function Cc() {
      if (0 < Bc)
        throw Error("Rendered more hooks than during the previous render");
      return { memoizedState: null, queue: null, next: null };
    }
    function Dc() {
      return S === null ? zc === null ? (T = !1, zc = S = Cc()) : (T = !0, S = zc) : S.next === null ? (T = !1, S = S.next = Cc()) : (T = !0, S = S.next), S;
    }
    function Ec() {
      yc = R = null, Ac = !1, zc = null, Bc = 0, S = V = null;
    }
    function Fc(a, b) {
      return typeof b == "function" ? b(a) : b;
    }
    function Gc(a, b, c) {
      if (R = W(), S = Dc(), T) {
        var d = S.queue;
        if (b = d.dispatch, V !== null && (c = V.get(d), c !== void 0)) {
          V.delete(d), d = S.memoizedState;
          do
            d = a(d, c.action), c = c.next;
          while (c !== null);
          return S.memoizedState = d, [d, b];
        }
        return [S.memoizedState, b];
      }
      return a = a === Fc ? typeof b == "function" ? b() : b : c !== void 0 ? c(b) : b, S.memoizedState = a, a = S.queue = { last: null, dispatch: null }, a = a.dispatch = Hc.bind(null, R, a), [S.memoizedState, a];
    }
    function Ic(a, b) {
      if (R = W(), S = Dc(), b = b === void 0 ? null : b, S !== null) {
        var c = S.memoizedState;
        if (c !== null && b !== null) {
          var d = c[1];
          a:
            if (d === null)
              d = !1;
            else {
              for (var f = 0; f < d.length && f < b.length; f++)
                if (!xc(b[f], d[f])) {
                  d = !1;
                  break a;
                }
              d = !0;
            }
          if (d)
            return c[0];
        }
      }
      return a = a(), S.memoizedState = [a, b], a;
    }
    function Hc(a, b, c) {
      if (25 <= Bc)
        throw Error("Too many re-renders. React limits the number of renders to prevent an infinite loop.");
      if (a === R)
        if (Ac = !0, a = { action: c, next: null }, V === null && (V = /* @__PURE__ */ new Map()), c = V.get(b), c === void 0)
          V.set(b, a);
        else {
          for (b = c; b.next !== null; )
            b = b.next;
          b.next = a;
        }
    }
    function Jc() {
      throw Error("startTransition cannot be called during server rendering.");
    }
    function Kc() {
    }
    var Mc = { readContext: function(a) {
      return a._currentValue;
    }, useContext: function(a) {
      return W(), a._currentValue;
    }, useMemo: Ic, useReducer: Gc, useRef: function(a) {
      R = W(), S = Dc();
      var b = S.memoizedState;
      return b === null ? (a = { current: a }, S.memoizedState = a) : b;
    }, useState: function(a) {
      return Gc(Fc, a);
    }, useInsertionEffect: Kc, useLayoutEffect: function() {
    }, useCallback: function(a, b) {
      return Ic(function() {
        return a;
      }, b);
    }, useImperativeHandle: Kc, useEffect: Kc, useDebugValue: Kc, useDeferredValue: function(a) {
      return W(), a;
    }, useTransition: function() {
      return W(), [!1, Jc];
    }, useId: function() {
      var a = yc.treeContext, b = a.overflow;
      a = a.id, a = (a & ~(1 << 32 - sc(a) - 1)).toString(32) + b;
      var c = Lc;
      if (c === null)
        throw Error("Invalid hook call. Hooks can only be called inside of the body of a function component.");
      return b = U++, a = ":" + c.idPrefix + "R" + a, 0 < b && (a += "H" + b.toString(32)), a + ":";
    }, useMutableSource: function(a, b) {
      return W(), b(a._source);
    }, useSyncExternalStore: function(a, b, c) {
      if (c === void 0)
        throw Error("Missing getServerSnapshot, which is required for server-rendered content. Will revert to client rendering.");
      return c();
    } }, Lc = null, Nc = ba.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentDispatcher;
    function Oc(a) {
      return console.error(a), null;
    }
    function X() {
    }
    function Pc(a, b) {
      var c = a.pingedTasks;
      c.push(b), c.length === 1 && setImmediate(function() {
        return Qc(a);
      });
    }
    function Rc(a, b, c, d, f, e, g, h) {
      a.allPendingTasks++, c === null ? a.pendingRootTasks++ : c.pendingTasks++;
      var m = { node: b, ping: function() {
        return Pc(a, m);
      }, blockedBoundary: c, blockedSegment: d, abortSet: f, legacyContext: e, context: g, treeContext: h };
      return f.add(m), m;
    }
    function Sc(a, b, c, d, f, e) {
      return { status: 0, id: -1, index: b, parentFlushed: !1, chunks: [], children: [], formatContext: d, boundary: c, lastPushedText: f, textEmbedded: e };
    }
    function Y(a, b) {
      if (a = a.onError(b), a != null && typeof a != "string")
        throw Error('onError returned something with a type other than "string". onError should return a string and may return null or undefined but must not return anything else. It received something of type "' + typeof a + '" instead');
      return a;
    }
    function Tc(a, b) {
      var c = a.onShellError;
      c(b), c = a.onFatalError, c(b), a.destination !== null ? (a.status = 2, a.destination.destroy(b)) : (a.status = 1, a.fatalError = b);
    }
    function Uc(a, b, c, d, f) {
      for (R = {}, yc = b, U = 0, a = c(d, f); Ac; )
        Ac = !1, U = 0, Bc += 1, S = null, a = c(d, f);
      return Ec(), a;
    }
    function Vc(a, b, c, d) {
      var f = c.render(), e = d.childContextTypes;
      if (e != null) {
        var g = b.legacyContext;
        if (typeof c.getChildContext != "function")
          d = g;
        else {
          c = c.getChildContext();
          for (var h in c)
            if (!(h in e))
              throw Error((gc(d) || "Unknown") + '.getChildContext(): key "' + h + '" is not defined in childContextTypes.');
          d = O({}, g, c);
        }
        b.legacyContext = d, Z(a, b, f), b.legacyContext = g;
      } else
        Z(a, b, f);
    }
    function Wc(a, b) {
      if (a && a.defaultProps) {
        b = O({}, b), a = a.defaultProps;
        for (var c in a)
          b[c] === void 0 && (b[c] = a[c]);
        return b;
      }
      return b;
    }
    function Xc(a, b, c, d, f) {
      if (typeof c == "function")
        if (c.prototype && c.prototype.isReactComponent) {
          f = ic(c, b.legacyContext);
          var e = c.contextType;
          e = new c(d, typeof e == "object" && e !== null ? e._currentValue : f), pc(e, c, d, f), Vc(a, b, e, c);
        } else {
          e = ic(c, b.legacyContext), f = Uc(a, b, c, d, e);
          var g = U !== 0;
          if (typeof f == "object" && f !== null && typeof f.render == "function" && f.$$typeof === void 0)
            pc(f, c, d, e), Vc(a, b, f, c);
          else if (g) {
            d = b.treeContext, b.treeContext = rc(d, 1, 0);
            try {
              Z(a, b, f);
            } finally {
              b.treeContext = d;
            }
          } else
            Z(a, b, f);
        }
      else if (typeof c == "string") {
        switch (f = b.blockedSegment, e = Pa(f.chunks, c, d, a.responseState, f.formatContext), f.lastPushedText = !1, g = f.formatContext, f.formatContext = ya(g, c, d), Yc(a, b, e), f.formatContext = g, c) {
          case "area":
          case "base":
          case "br":
          case "col":
          case "embed":
          case "hr":
          case "img":
          case "input":
          case "keygen":
          case "link":
          case "meta":
          case "param":
          case "source":
          case "track":
          case "wbr":
            break;
          default:
            f.chunks.push(Qa, c, Ra);
        }
        f.lastPushedText = !1;
      } else {
        switch (c) {
          case dc:
          case cc:
          case Tb:
          case Ub:
          case Sb:
            Z(a, b, d.children);
            return;
          case Zb:
            Z(
              a,
              b,
              d.children
            );
            return;
          case bc:
            throw Error("ReactDOMServer does not yet support scope components.");
          case Yb:
            a: {
              c = b.blockedBoundary, f = b.blockedSegment, e = d.fallback, d = d.children, g = /* @__PURE__ */ new Set();
              var h = { id: null, rootSegmentID: -1, parentFlushed: !1, pendingTasks: 0, forceClientRender: !1, completedSegments: [], byteSize: 0, fallbackAbortableTasks: g, errorDigest: null }, m = Sc(a, f.chunks.length, h, f.formatContext, !1, !1);
              f.children.push(m), f.lastPushedText = !1;
              var n = Sc(a, 0, null, f.formatContext, !1, !1);
              n.parentFlushed = !0, b.blockedBoundary = h, b.blockedSegment = n;
              try {
                if (Yc(a, b, d), n.lastPushedText && n.textEmbedded && n.chunks.push(za), n.status = 1, Zc(h, n), h.pendingTasks === 0)
                  break a;
              } catch (p) {
                n.status = 4, h.forceClientRender = !0, h.errorDigest = Y(a, p);
              } finally {
                b.blockedBoundary = c, b.blockedSegment = f;
              }
              b = Rc(a, e, c, m, g, b.legacyContext, b.context, b.treeContext), a.pingedTasks.push(b);
            }
            return;
        }
        if (typeof c == "object" && c !== null)
          switch (c.$$typeof) {
            case Xb:
              if (d = Uc(a, b, c.render, d, f), U !== 0) {
                c = b.treeContext, b.treeContext = rc(c, 1, 0);
                try {
                  Z(a, b, d);
                } finally {
                  b.treeContext = c;
                }
              } else
                Z(
                  a,
                  b,
                  d
                );
              return;
            case $b:
              c = c.type, d = Wc(c, d), Xc(a, b, c, d, f);
              return;
            case Vb:
              if (f = d.children, c = c._context, d = d.value, e = c._currentValue, c._currentValue = d, g = P, P = d = { parent: g, depth: g === null ? 0 : g.depth + 1, context: c, parentValue: e, value: d }, b.context = d, Z(a, b, f), a = P, a === null)
                throw Error("Tried to pop a Context at the root of the app. This is a bug in React.");
              d = a.parentValue, a.context._currentValue = d === ec ? a.context._defaultValue : d, a = P = a.parent, b.context = a;
              return;
            case Wb:
              d = d.children, d = d(c._currentValue), Z(a, b, d);
              return;
            case ac:
              f = c._init, c = f(c._payload), d = Wc(c, d), Xc(a, b, c, d, void 0);
              return;
          }
        throw Error("Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: " + ((c == null ? c : typeof c) + "."));
      }
    }
    function Z(a, b, c) {
      if (b.node = c, typeof c == "object" && c !== null) {
        switch (c.$$typeof) {
          case Qb:
            Xc(a, b, c.type, c.props, c.ref);
            return;
          case Rb:
            throw Error("Portals are not currently supported by the server renderer. Render them conditionally so that they only appear on the client render.");
          case ac:
            var d = c._init;
            c = d(c._payload), Z(a, b, c);
            return;
        }
        if (qa(c)) {
          $c(a, b, c);
          return;
        }
        if (c === null || typeof c != "object" ? d = null : (d = fc && c[fc] || c["@@iterator"], d = typeof d == "function" ? d : null), d && (d = d.call(c))) {
          if (c = d.next(), !c.done) {
            var f = [];
            do
              f.push(c.value), c = d.next();
            while (!c.done);
            $c(a, b, f);
          }
          return;
        }
        throw a = Object.prototype.toString.call(c), Error("Objects are not valid as a React child (found: " + (a === "[object Object]" ? "object with keys {" + Object.keys(c).join(", ") + "}" : a) + "). If you meant to render a collection of children, use an array instead.");
      }
      typeof c == "string" ? (d = b.blockedSegment, d.lastPushedText = Aa(b.blockedSegment.chunks, c, a.responseState, d.lastPushedText)) : typeof c == "number" && (d = b.blockedSegment, d.lastPushedText = Aa(
        b.blockedSegment.chunks,
        "" + c,
        a.responseState,
        d.lastPushedText
      ));
    }
    function $c(a, b, c) {
      for (var d = c.length, f = 0; f < d; f++) {
        var e = b.treeContext;
        b.treeContext = rc(e, d, f);
        try {
          Yc(a, b, c[f]);
        } finally {
          b.treeContext = e;
        }
      }
    }
    function Yc(a, b, c) {
      var d = b.blockedSegment.formatContext, f = b.legacyContext, e = b.context;
      try {
        return Z(a, b, c);
      } catch (m) {
        if (Ec(), typeof m == "object" && m !== null && typeof m.then == "function") {
          c = m;
          var g = b.blockedSegment, h = Sc(a, g.chunks.length, null, g.formatContext, g.lastPushedText, !0);
          g.children.push(h), g.lastPushedText = !1, a = Rc(a, b.node, b.blockedBoundary, h, b.abortSet, b.legacyContext, b.context, b.treeContext).ping, c.then(a, a), b.blockedSegment.formatContext = d, b.legacyContext = f, b.context = e, nc(e);
        } else
          throw b.blockedSegment.formatContext = d, b.legacyContext = f, b.context = e, nc(e), m;
      }
    }
    function ad(a) {
      var b = a.blockedBoundary;
      a = a.blockedSegment, a.status = 3, bd(this, b, a);
    }
    function cd(a, b, c) {
      var d = a.blockedBoundary;
      a.blockedSegment.status = 3, d === null ? (b.allPendingTasks--, b.status !== 2 && (b.status = 2, b.destination !== null && b.destination.end())) : (d.pendingTasks--, d.forceClientRender || (d.forceClientRender = !0, d.errorDigest = b.onError(c === void 0 ? Error("The render was aborted by the server without a reason.") : c), d.parentFlushed && b.clientRenderedBoundaries.push(d)), d.fallbackAbortableTasks.forEach(function(a2) {
        return cd(a2, b, c);
      }), d.fallbackAbortableTasks.clear(), b.allPendingTasks--, b.allPendingTasks === 0 && (a = b.onAllReady, a()));
    }
    function Zc(a, b) {
      if (b.chunks.length === 0 && b.children.length === 1 && b.children[0].boundary === null) {
        var c = b.children[0];
        c.id = b.id, c.parentFlushed = !0, c.status === 1 && Zc(a, c);
      } else
        a.completedSegments.push(b);
    }
    function bd(a, b, c) {
      if (b === null) {
        if (c.parentFlushed) {
          if (a.completedRootSegment !== null)
            throw Error("There can only be one root segment. This is a bug in React.");
          a.completedRootSegment = c;
        }
        a.pendingRootTasks--, a.pendingRootTasks === 0 && (a.onShellError = X, b = a.onShellReady, b());
      } else
        b.pendingTasks--, b.forceClientRender || (b.pendingTasks === 0 ? (c.parentFlushed && c.status === 1 && Zc(b, c), b.parentFlushed && a.completedBoundaries.push(b), b.fallbackAbortableTasks.forEach(ad, a), b.fallbackAbortableTasks.clear()) : c.parentFlushed && c.status === 1 && (Zc(b, c), b.completedSegments.length === 1 && b.parentFlushed && a.partialBoundaries.push(b)));
      a.allPendingTasks--, a.allPendingTasks === 0 && (a = a.onAllReady, a());
    }
    function Qc(a) {
      if (a.status !== 2) {
        var b = P, c = Nc.current;
        Nc.current = Mc;
        var d = Lc;
        Lc = a.responseState;
        try {
          var f = a.pingedTasks, e;
          for (e = 0; e < f.length; e++) {
            var g = f[e], h = a, m = g.blockedSegment;
            if (m.status === 0) {
              nc(g.context);
              try {
                Z(h, g, g.node), m.lastPushedText && m.textEmbedded && m.chunks.push(za), g.abortSet.delete(g), m.status = 1, bd(h, g.blockedBoundary, m);
              } catch (E) {
                if (Ec(), typeof E == "object" && E !== null && typeof E.then == "function") {
                  var n = g.ping;
                  E.then(n, n);
                } else {
                  g.abortSet.delete(g), m.status = 4;
                  var p = g.blockedBoundary, v = E, C = Y(h, v);
                  if (p === null ? Tc(h, v) : (p.pendingTasks--, p.forceClientRender || (p.forceClientRender = !0, p.errorDigest = C, p.parentFlushed && h.clientRenderedBoundaries.push(p))), h.allPendingTasks--, h.allPendingTasks === 0) {
                    var D = h.onAllReady;
                    D();
                  }
                }
              } finally {
              }
            }
          }
          f.splice(0, e), a.destination !== null && dd(a, a.destination);
        } catch (E) {
          Y(a, E), Tc(a, E);
        } finally {
          Lc = d, Nc.current = c, c === Mc && nc(b);
        }
      }
    }
    function ed(a, b, c) {
      switch (c.parentFlushed = !0, c.status) {
        case 0:
          var d = c.id = a.nextSegmentId++;
          return c.lastPushedText = !1, c.textEmbedded = !1, a = a.responseState, r(b, Sa), r(b, a.placeholderPrefix), a = d.toString(16), r(b, a), w(b, Ta);
        case 1:
          c.status = 2;
          var f = !0;
          d = c.chunks;
          var e = 0;
          c = c.children;
          for (var g = 0; g < c.length; g++) {
            for (f = c[g]; e < f.index; e++)
              r(b, d[e]);
            f = fd(a, b, f);
          }
          for (; e < d.length - 1; e++)
            r(b, d[e]);
          return e < d.length && (f = w(b, d[e])), f;
        default:
          throw Error("Aborted, errored or already flushed boundaries should not be flushed again. This is a bug in React.");
      }
    }
    function fd(a, b, c) {
      var d = c.boundary;
      if (d === null)
        return ed(a, b, c);
      if (d.parentFlushed = !0, d.forceClientRender)
        d = d.errorDigest, w(b, Xa), r(b, Za), d && (r(b, ab), r(b, F(d)), r(b, $a)), w(b, bb), ed(a, b, c);
      else if (0 < d.pendingTasks) {
        d.rootSegmentID = a.nextSegmentId++, 0 < d.completedSegments.length && a.partialBoundaries.push(d);
        var f = a.responseState, e = f.nextSuspenseID++;
        f = x(f.boundaryPrefix + e.toString(16)), d = d.id = f, cb(b, a.responseState, d), ed(a, b, c);
      } else if (d.byteSize > a.progressiveChunkSize)
        d.rootSegmentID = a.nextSegmentId++, a.completedBoundaries.push(d), cb(b, a.responseState, d.id), ed(a, b, c);
      else {
        if (w(b, Ua), c = d.completedSegments, c.length !== 1)
          throw Error("A previously unvisited boundary must have exactly one root segment. This is a bug in React.");
        fd(a, b, c[0]);
      }
      return w(b, Ya);
    }
    function gd(a, b, c) {
      return yb(b, a.responseState, c.formatContext, c.id), fd(a, b, c), zb(b, c.formatContext);
    }
    function hd(a, b, c) {
      for (var d = c.completedSegments, f = 0; f < d.length; f++)
        id(a, b, c, d[f]);
      if (d.length = 0, a = a.responseState, d = c.id, c = c.rootSegmentID, r(b, a.startInlineScript), a.sentCompleteBoundaryFunction ? r(b, Gb) : (a.sentCompleteBoundaryFunction = !0, r(b, Fb)), d === null)
        throw Error("An ID must have been assigned before we can complete the boundary.");
      return c = c.toString(16), r(b, d), r(b, Hb), r(b, a.segmentPrefix), r(b, c), w(b, Ib);
    }
    function id(a, b, c, d) {
      if (d.status === 2)
        return !0;
      var f = d.id;
      if (f === -1) {
        if ((d.id = c.rootSegmentID) === -1)
          throw Error("A root segment ID must have been assigned by now. This is a bug in React.");
        return gd(a, b, d);
      }
      return gd(a, b, d), a = a.responseState, r(b, a.startInlineScript), a.sentCompleteSegmentFunction ? r(b, Bb) : (a.sentCompleteSegmentFunction = !0, r(b, Ab)), r(b, a.segmentPrefix), f = f.toString(16), r(b, f), r(b, Cb), r(b, a.placeholderPrefix), r(b, f), w(b, Db);
    }
    function dd(a, b) {
      k = new Uint8Array(2048), l = 0, q = !0;
      try {
        var c = a.completedRootSegment;
        if (c !== null && a.pendingRootTasks === 0) {
          fd(a, b, c), a.completedRootSegment = null;
          var d = a.responseState.bootstrapChunks;
          for (c = 0; c < d.length - 1; c++)
            r(b, d[c]);
          c < d.length && w(b, d[c]);
        }
        var f = a.clientRenderedBoundaries, e;
        for (e = 0; e < f.length; e++) {
          var g = f[e];
          d = b;
          var h = a.responseState, m = g.id, n = g.errorDigest, p = g.errorMessage, v = g.errorComponentStack;
          if (r(d, h.startInlineScript), h.sentClientRenderFunction ? r(d, Kb) : (h.sentClientRenderFunction = !0, r(d, Jb)), m === null)
            throw Error("An ID must have been assigned before we can complete the boundary.");
          if (r(d, m), r(d, Lb), (n || p || v) && (r(d, Nb), r(d, Pb(n || ""))), (p || v) && (r(d, Nb), r(d, Pb(p || ""))), v && (r(d, Nb), r(d, Pb(v))), !w(d, Mb)) {
            a.destination = null, e++, f.splice(0, e);
            return;
          }
        }
        f.splice(0, e);
        var C = a.completedBoundaries;
        for (e = 0; e < C.length; e++)
          if (!hd(a, b, C[e])) {
            a.destination = null, e++, C.splice(0, e);
            return;
          }
        C.splice(0, e), ca(b), k = new Uint8Array(2048), l = 0, q = !0;
        var D = a.partialBoundaries;
        for (e = 0; e < D.length; e++) {
          var E = D[e];
          a: {
            f = a, g = b;
            var na = E.completedSegments;
            for (h = 0; h < na.length; h++)
              if (!id(f, g, E, na[h])) {
                h++, na.splice(0, h);
                var Eb = !1;
                break a;
              }
            na.splice(0, h), Eb = !0;
          }
          if (!Eb) {
            a.destination = null, e++, D.splice(0, e);
            return;
          }
        }
        D.splice(0, e);
        var oa = a.completedBoundaries;
        for (e = 0; e < oa.length; e++)
          if (!hd(a, b, oa[e])) {
            a.destination = null, e++, oa.splice(0, e);
            return;
          }
        oa.splice(0, e);
      } finally {
        ca(b), typeof b.flush == "function" && b.flush(), a.allPendingTasks === 0 && a.pingedTasks.length === 0 && a.clientRenderedBoundaries.length === 0 && a.completedBoundaries.length === 0 && b.end();
      }
    }
    function jd(a) {
      setImmediate(function() {
        return Qc(a);
      });
    }
    function kd(a, b) {
      if (a.status === 1)
        a.status = 2, b.destroy(a.fatalError);
      else if (a.status !== 2 && a.destination === null) {
        a.destination = b;
        try {
          dd(a, b);
        } catch (c) {
          Y(a, c), Tc(a, c);
        }
      }
    }
    function ld(a, b) {
      try {
        var c = a.abortableTasks;
        c.forEach(function(c2) {
          return cd(c2, a, b);
        }), c.clear(), a.destination !== null && dd(a, a.destination);
      } catch (d) {
        Y(a, d), Tc(a, d);
      }
    }
    function md(a, b) {
      return function() {
        return kd(b, a);
      };
    }
    function nd(a, b) {
      return function() {
        return ld(a, b);
      };
    }
    function od(a, b) {
      var c = b ? b.identifierPrefix : void 0, d = b ? b.nonce : void 0, f = b ? b.bootstrapScriptContent : void 0, e = b ? b.bootstrapScripts : void 0, g = b ? b.bootstrapModules : void 0;
      c = c === void 0 ? "" : c, d = d === void 0 ? ra : x('<script nonce="' + F(d) + '">');
      var h = [];
      if (f !== void 0 && h.push(d, ("" + f).replace(wa, xa), sa), e !== void 0)
        for (f = 0; f < e.length; f++)
          h.push(ta, F(e[f]), va);
      if (g !== void 0)
        for (e = 0; e < g.length; e++)
          h.push(ua, F(g[e]), va);
      g = {
        bootstrapChunks: h,
        startInlineScript: d,
        placeholderPrefix: x(c + "P:"),
        segmentPrefix: x(c + "S:"),
        boundaryPrefix: c + "B:",
        idPrefix: c,
        nextSuspenseID: 0,
        sentCompleteSegmentFunction: !1,
        sentCompleteBoundaryFunction: !1,
        sentClientRenderFunction: !1
      }, e = b ? b.namespaceURI : void 0, e = G(e === "http://www.w3.org/2000/svg" ? 2 : e === "http://www.w3.org/1998/Math/MathML" ? 3 : 0, null), f = b ? b.progressiveChunkSize : void 0, d = b ? b.onError : void 0, h = b ? b.onAllReady : void 0;
      var m = b ? b.onShellReady : void 0, n = b ? b.onShellError : void 0;
      return b = [], c = /* @__PURE__ */ new Set(), g = {
        destination: null,
        responseState: g,
        progressiveChunkSize: f === void 0 ? 12800 : f,
        status: 0,
        fatalError: null,
        nextSegmentId: 0,
        allPendingTasks: 0,
        pendingRootTasks: 0,
        completedRootSegment: null,
        abortableTasks: c,
        pingedTasks: b,
        clientRenderedBoundaries: [],
        completedBoundaries: [],
        partialBoundaries: [],
        onError: d === void 0 ? Oc : d,
        onAllReady: h === void 0 ? X : h,
        onShellReady: m === void 0 ? X : m,
        onShellError: n === void 0 ? X : n,
        onFatalError: X
      }, e = Sc(g, 0, null, e, !1, !1), e.parentFlushed = !0, a = Rc(g, a, null, e, c, hc, null, qc), b.push(a), g;
    }
    exports.renderToPipeableStream = function(a, b) {
      var c = od(a, b), d = !1;
      return jd(c), { pipe: function(a2) {
        if (d)
          throw Error("React currently only supports piping to one writable stream.");
        return d = !0, kd(c, a2), a2.on("drain", md(a2, c)), a2.on("error", nd(c, Error("The destination stream errored while writing data."))), a2.on("close", nd(c, Error("The destination stream closed early."))), a2;
      }, abort: function(a2) {
        ld(c, a2);
      } };
    };
    exports.version = "18.2.0";
  }
});

// node_modules/react-dom/server.node.js
var require_server_node = __commonJS({
  "node_modules/react-dom/server.node.js"(exports) {
    "use strict";
    var l, s;
    l = require_react_dom_server_legacy_node_production_min(), s = require_react_dom_server_node_production_min();
    exports.version = l.version;
    exports.renderToString = l.renderToString;
    exports.renderToStaticMarkup = l.renderToStaticMarkup;
    exports.renderToNodeStream = l.renderToNodeStream;
    exports.renderToStaticNodeStream = l.renderToStaticNodeStream;
    exports.renderToPipeableStream = s.renderToPipeableStream;
  }
});

// app/entry.server.tsx
var entry_server_exports = {};
__export(entry_server_exports, {
  default: () => handleRequest
});
var import_node = __toESM(require_dist(), 1);
import { PassThrough } from "node:stream";

// node_modules/@remix-run/react/dist/esm/_virtual/_rollupPluginBabelHelpers.js
function _extends() {
  return _extends = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source)
        Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
    }
    return target;
  }, _extends.apply(this, arguments);
}

// node_modules/@remix-run/react/dist/esm/components.js
import * as React from "react";
import { useHref, NavLink as NavLink$1, Link as Link$1, matchRoutes, useLocation, Await as Await$1, useNavigation, useAsyncError, useMatches as useMatches$1, useLoaderData as useLoaderData$1, useRouteLoaderData as useRouteLoaderData$1, useActionData as useActionData$1, useFetcher as useFetcher$1, UNSAFE_DataRouterContext, UNSAFE_DataRouterStateContext } from "react-router-dom";

// node_modules/@remix-run/react/dist/esm/invariant.js
function invariant(value, message) {
  if (value === !1 || value === null || typeof value > "u")
    throw new Error(message);
}

// node_modules/@remix-run/react/dist/esm/links.js
import { parsePath } from "react-router-dom";

// node_modules/@remix-run/react/dist/esm/routeModules.js
async function loadRouteModule(route, routeModulesCache) {
  if (route.id in routeModulesCache)
    return routeModulesCache[route.id];
  try {
    let routeModule = await import(
      /* webpackIgnore: true */
      route.module
    );
    return routeModulesCache[route.id] = routeModule, routeModule;
  } catch {
    return window.location.reload(), new Promise(() => {
    });
  }
}

// node_modules/@remix-run/react/dist/esm/links.js
function getKeyedLinksForMatches(matches, routeModules, manifest) {
  let descriptors = matches.map((match) => {
    var _module$links;
    let module = routeModules[match.route.id], route = manifest.routes[match.route.id];
    return [route.css ? route.css.map((href) => ({
      rel: "stylesheet",
      href
    })) : [], ((_module$links = module.links) === null || _module$links === void 0 ? void 0 : _module$links.call(module)) || []];
  }).flat(2), preloads = getCurrentPageModulePreloadHrefs(matches, manifest);
  return dedupeLinkDescriptors(descriptors, preloads);
}
function isPageLinkDescriptor(object) {
  return object != null && typeof object.page == "string";
}
function isHtmlLinkDescriptor(object) {
  return object == null ? !1 : object.href == null ? object.rel === "preload" && typeof object.imageSrcSet == "string" && typeof object.imageSizes == "string" : typeof object.rel == "string" && typeof object.href == "string";
}
async function getKeyedPrefetchLinks(matches, manifest, routeModules) {
  let links2 = await Promise.all(matches.map(async (match) => {
    let mod = await loadRouteModule(manifest.routes[match.route.id], routeModules);
    return mod.links ? mod.links() : [];
  }));
  return dedupeLinkDescriptors(links2.flat(1).filter(isHtmlLinkDescriptor).filter((link) => link.rel === "stylesheet" || link.rel === "preload").map((link) => link.rel === "stylesheet" ? {
    ...link,
    rel: "prefetch",
    as: "style"
  } : {
    ...link,
    rel: "prefetch"
  }));
}
function getNewMatchesForLinks(page, nextMatches, currentMatches, manifest, location, mode2) {
  let path = parsePathPatch(page), isNew = (match, index) => currentMatches[index] ? match.route.id !== currentMatches[index].route.id : !0, matchPathChanged = (match, index) => {
    var _currentMatches$index;
    return (
      // param change, /users/123 -> /users/456
      currentMatches[index].pathname !== match.pathname || // splat param changed, which is not present in match.path
      // e.g. /files/images/avatar.jpg -> files/finances.xls
      ((_currentMatches$index = currentMatches[index].route.path) === null || _currentMatches$index === void 0 ? void 0 : _currentMatches$index.endsWith("*")) && currentMatches[index].params["*"] !== match.params["*"]
    );
  };
  return mode2 === "data" && location.search !== path.search ? (
    // this is really similar to stuff in transition.ts, maybe somebody smarter
    // than me (or in less of a hurry) can share some of it. You're the best.
    nextMatches.filter((match, index) => {
      if (!manifest.routes[match.route.id].hasLoader)
        return !1;
      if (isNew(match, index) || matchPathChanged(match, index))
        return !0;
      if (match.route.shouldRevalidate) {
        var _currentMatches$;
        let routeChoice = match.route.shouldRevalidate({
          currentUrl: new URL(location.pathname + location.search + location.hash, window.origin),
          currentParams: ((_currentMatches$ = currentMatches[0]) === null || _currentMatches$ === void 0 ? void 0 : _currentMatches$.params) || {},
          nextUrl: new URL(page, window.origin),
          nextParams: match.params,
          defaultShouldRevalidate: !0
        });
        if (typeof routeChoice == "boolean")
          return routeChoice;
      }
      return !0;
    })
  ) : nextMatches.filter((match, index) => {
    let manifestRoute = manifest.routes[match.route.id];
    return (mode2 === "assets" || manifestRoute.hasLoader) && (isNew(match, index) || matchPathChanged(match, index));
  });
}
function getDataLinkHrefs(page, matches, manifest) {
  let path = parsePathPatch(page);
  return dedupeHrefs(matches.filter((match) => manifest.routes[match.route.id].hasLoader).map((match) => {
    let {
      pathname,
      search
    } = path, searchParams = new URLSearchParams(search);
    return searchParams.set("_data", match.route.id), `${pathname}?${searchParams}`;
  }));
}
function getModuleLinkHrefs(matches, manifestPatch) {
  return dedupeHrefs(matches.map((match) => {
    let route = manifestPatch.routes[match.route.id], hrefs = [route.module];
    return route.imports && (hrefs = hrefs.concat(route.imports)), hrefs;
  }).flat(1));
}
function getCurrentPageModulePreloadHrefs(matches, manifest) {
  return dedupeHrefs(matches.map((match) => {
    let route = manifest.routes[match.route.id], hrefs = [route.module];
    return route.imports && (hrefs = hrefs.concat(route.imports)), hrefs;
  }).flat(1));
}
function dedupeHrefs(hrefs) {
  return [...new Set(hrefs)];
}
function sortKeys(obj) {
  let sorted = {}, keys = Object.keys(obj).sort();
  for (let key of keys)
    sorted[key] = obj[key];
  return sorted;
}
function dedupeLinkDescriptors(descriptors, preloads) {
  let set = /* @__PURE__ */ new Set(), preloadsSet = new Set(preloads);
  return descriptors.reduce((deduped, descriptor) => {
    if (preloads && !isPageLinkDescriptor(descriptor) && descriptor.as === "script" && descriptor.href && preloadsSet.has(descriptor.href))
      return deduped;
    let key = JSON.stringify(sortKeys(descriptor));
    return set.has(key) || (set.add(key), deduped.push({
      key,
      link: descriptor
    })), deduped;
  }, []);
}
function parsePathPatch(href) {
  let path = parsePath(href);
  return path.search === void 0 && (path.search = ""), path;
}

// node_modules/@remix-run/react/dist/esm/markup.js
var ESCAPE_LOOKUP = {
  "&": "\\u0026",
  ">": "\\u003e",
  "<": "\\u003c",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
}, ESCAPE_REGEX = /[&><\u2028\u2029]/g;
function escapeHtml(html) {
  return html.replace(ESCAPE_REGEX, (match) => ESCAPE_LOOKUP[match]);
}
function createHtml(html) {
  return {
    __html: html
  };
}

// node_modules/@remix-run/react/dist/esm/components.js
function useDataRouterContext() {
  let context = React.useContext(UNSAFE_DataRouterContext);
  return invariant(context, "You must render this element inside a <DataRouterContext.Provider> element"), context;
}
function useDataRouterStateContext() {
  let context = React.useContext(UNSAFE_DataRouterStateContext);
  return invariant(context, "You must render this element inside a <DataRouterStateContext.Provider> element"), context;
}
var RemixContext = /* @__PURE__ */ React.createContext(void 0);
RemixContext.displayName = "Remix";
function useRemixContext() {
  let context = React.useContext(RemixContext);
  return invariant(context, "You must render this element inside a <Remix> element"), context;
}
function usePrefetchBehavior(prefetch, theirElementProps) {
  let [maybePrefetch, setMaybePrefetch] = React.useState(!1), [shouldPrefetch, setShouldPrefetch] = React.useState(!1), {
    onFocus,
    onBlur,
    onMouseEnter,
    onMouseLeave,
    onTouchStart
  } = theirElementProps, ref = React.useRef(null);
  React.useEffect(() => {
    if (prefetch === "render" && setShouldPrefetch(!0), prefetch === "viewport") {
      let callback = (entries) => {
        entries.forEach((entry2) => {
          setShouldPrefetch(entry2.isIntersecting);
        });
      }, observer = new IntersectionObserver(callback, {
        threshold: 0.5
      });
      return ref.current && observer.observe(ref.current), () => {
        observer.disconnect();
      };
    }
  }, [prefetch]);
  let setIntent = () => {
    prefetch === "intent" && setMaybePrefetch(!0);
  }, cancelIntent = () => {
    prefetch === "intent" && (setMaybePrefetch(!1), setShouldPrefetch(!1));
  };
  return React.useEffect(() => {
    if (maybePrefetch) {
      let id = setTimeout(() => {
        setShouldPrefetch(!0);
      }, 100);
      return () => {
        clearTimeout(id);
      };
    }
  }, [maybePrefetch]), [shouldPrefetch, ref, {
    onFocus: composeEventHandlers(onFocus, setIntent),
    onBlur: composeEventHandlers(onBlur, cancelIntent),
    onMouseEnter: composeEventHandlers(onMouseEnter, setIntent),
    onMouseLeave: composeEventHandlers(onMouseLeave, cancelIntent),
    onTouchStart: composeEventHandlers(onTouchStart, setIntent)
  }];
}
var ABSOLUTE_URL_REGEX = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i, NavLink = /* @__PURE__ */ React.forwardRef(({
  to,
  prefetch = "none",
  ...props
}, forwardedRef) => {
  let isAbsolute = typeof to == "string" && ABSOLUTE_URL_REGEX.test(to), href = useHref(to), [shouldPrefetch, ref, prefetchHandlers] = usePrefetchBehavior(prefetch, props);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(NavLink$1, _extends({}, props, prefetchHandlers, {
    ref: mergeRefs(forwardedRef, ref),
    to
  })), shouldPrefetch && !isAbsolute ? /* @__PURE__ */ React.createElement(PrefetchPageLinks, {
    page: href
  }) : null);
});
NavLink.displayName = "NavLink";
var Link = /* @__PURE__ */ React.forwardRef(({
  to,
  prefetch = "none",
  ...props
}, forwardedRef) => {
  let isAbsolute = typeof to == "string" && ABSOLUTE_URL_REGEX.test(to), href = useHref(to), [shouldPrefetch, ref, prefetchHandlers] = usePrefetchBehavior(prefetch, props);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Link$1, _extends({}, props, prefetchHandlers, {
    ref: mergeRefs(forwardedRef, ref),
    to
  })), shouldPrefetch && !isAbsolute ? /* @__PURE__ */ React.createElement(PrefetchPageLinks, {
    page: href
  }) : null);
});
Link.displayName = "Link";
function composeEventHandlers(theirHandler, ourHandler) {
  return (event) => {
    theirHandler && theirHandler(event), event.defaultPrevented || ourHandler(event);
  };
}
function Links() {
  let {
    manifest,
    routeModules,
    criticalCss
  } = useRemixContext(), {
    errors,
    matches: routerMatches
  } = useDataRouterStateContext(), matches = errors ? routerMatches.slice(0, routerMatches.findIndex((m) => errors[m.route.id]) + 1) : routerMatches, keyedLinks = React.useMemo(() => getKeyedLinksForMatches(matches, routeModules, manifest), [matches, routeModules, manifest]);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, criticalCss ? /* @__PURE__ */ React.createElement("style", {
    dangerouslySetInnerHTML: {
      __html: criticalCss
    }
  }) : null, keyedLinks.map(({
    key,
    link
  }) => isPageLinkDescriptor(link) ? /* @__PURE__ */ React.createElement(PrefetchPageLinks, _extends({
    key
  }, link)) : /* @__PURE__ */ React.createElement("link", _extends({
    key
  }, link))));
}
function PrefetchPageLinks({
  page,
  ...dataLinkProps
}) {
  let {
    router
  } = useDataRouterContext(), matches = React.useMemo(() => matchRoutes(router.routes, page), [router.routes, page]);
  return matches ? /* @__PURE__ */ React.createElement(PrefetchPageLinksImpl, _extends({
    page,
    matches
  }, dataLinkProps)) : (console.warn(`Tried to prefetch ${page} but no routes matched.`), null);
}
function useKeyedPrefetchLinks(matches) {
  let {
    manifest,
    routeModules
  } = useRemixContext(), [keyedPrefetchLinks, setKeyedPrefetchLinks] = React.useState([]);
  return React.useEffect(() => {
    let interrupted = !1;
    return getKeyedPrefetchLinks(matches, manifest, routeModules).then((links2) => {
      interrupted || setKeyedPrefetchLinks(links2);
    }), () => {
      interrupted = !0;
    };
  }, [matches, manifest, routeModules]), keyedPrefetchLinks;
}
function PrefetchPageLinksImpl({
  page,
  matches: nextMatches,
  ...linkProps
}) {
  let location = useLocation(), {
    manifest
  } = useRemixContext(), {
    matches
  } = useDataRouterStateContext(), newMatchesForData = React.useMemo(() => getNewMatchesForLinks(page, nextMatches, matches, manifest, location, "data"), [page, nextMatches, matches, manifest, location]), newMatchesForAssets = React.useMemo(() => getNewMatchesForLinks(page, nextMatches, matches, manifest, location, "assets"), [page, nextMatches, matches, manifest, location]), dataHrefs = React.useMemo(() => getDataLinkHrefs(page, newMatchesForData, manifest), [newMatchesForData, page, manifest]), moduleHrefs = React.useMemo(() => getModuleLinkHrefs(newMatchesForAssets, manifest), [newMatchesForAssets, manifest]), keyedPrefetchLinks = useKeyedPrefetchLinks(newMatchesForAssets);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, dataHrefs.map((href) => /* @__PURE__ */ React.createElement("link", _extends({
    key: href,
    rel: "prefetch",
    as: "fetch",
    href
  }, linkProps))), moduleHrefs.map((href) => /* @__PURE__ */ React.createElement("link", _extends({
    key: href,
    rel: "modulepreload",
    href
  }, linkProps))), keyedPrefetchLinks.map(({
    key,
    link
  }) => (
    // these don't spread `linkProps` because they are full link descriptors
    // already with their own props
    /* @__PURE__ */ React.createElement("link", _extends({
      key
    }, link))
  )));
}
function Meta() {
  let {
    routeModules
  } = useRemixContext(), {
    errors,
    matches: routerMatches,
    loaderData
  } = useDataRouterStateContext(), location = useLocation(), _matches = routerMatches, error = null;
  if (errors) {
    let errorIdx = routerMatches.findIndex((m) => errors[m.route.id]);
    _matches = routerMatches.slice(0, errorIdx + 1), error = errors[routerMatches[errorIdx].route.id];
  }
  let meta2 = [], leafMeta = null, matches = [];
  for (let i = 0; i < _matches.length; i++) {
    let _match = _matches[i], routeId = _match.route.id, data = loaderData[routeId], params = _match.params, routeModule = routeModules[routeId], routeMeta = [], match = {
      id: routeId,
      data,
      meta: [],
      params: _match.params,
      pathname: _match.pathname,
      handle: _match.route.handle,
      error
    };
    if (matches[i] = match, routeModule != null && routeModule.meta ? routeMeta = typeof routeModule.meta == "function" ? routeModule.meta({
      data,
      params,
      location,
      matches,
      error
    }) : Array.isArray(routeModule.meta) ? [...routeModule.meta] : routeModule.meta : leafMeta && (routeMeta = [...leafMeta]), routeMeta = routeMeta || [], !Array.isArray(routeMeta))
      throw new Error("The route at " + _match.route.path + ` returns an invalid value. All route meta functions must return an array of meta objects.

To reference the meta function API, see https://remix.run/route/meta`);
    match.meta = routeMeta, matches[i] = match, meta2 = [...routeMeta], leafMeta = meta2;
  }
  return /* @__PURE__ */ React.createElement(React.Fragment, null, meta2.flat().map((metaProps) => {
    if (!metaProps)
      return null;
    if ("tagName" in metaProps) {
      let {
        tagName,
        ...rest
      } = metaProps;
      return isValidMetaTag(tagName) ? /* @__PURE__ */ React.createElement(tagName, _extends({
        key: JSON.stringify(rest)
      }, rest)) : (console.warn(`A meta object uses an invalid tagName: ${tagName}. Expected either 'link' or 'meta'`), null);
    }
    if ("title" in metaProps)
      return /* @__PURE__ */ React.createElement("title", {
        key: "title"
      }, String(metaProps.title));
    if ("charset" in metaProps && (metaProps.charSet ??= metaProps.charset, delete metaProps.charset), "charSet" in metaProps && metaProps.charSet != null)
      return typeof metaProps.charSet == "string" ? /* @__PURE__ */ React.createElement("meta", {
        key: "charSet",
        charSet: metaProps.charSet
      }) : null;
    if ("script:ld+json" in metaProps)
      try {
        let json = JSON.stringify(metaProps["script:ld+json"]);
        return /* @__PURE__ */ React.createElement("script", {
          key: `script:ld+json:${json}`,
          type: "application/ld+json",
          dangerouslySetInnerHTML: {
            __html: json
          }
        });
      } catch {
        return null;
      }
    return /* @__PURE__ */ React.createElement("meta", _extends({
      key: JSON.stringify(metaProps)
    }, metaProps));
  }));
}
function isValidMetaTag(tagName) {
  return typeof tagName == "string" && /^(meta|link)$/.test(tagName);
}
function Await(props) {
  return /* @__PURE__ */ React.createElement(Await$1, props);
}
var isHydrated = !1;
function Scripts(props) {
  let {
    manifest,
    serverHandoffString,
    abortDelay,
    serializeError
  } = useRemixContext(), {
    router,
    static: isStatic,
    staticContext
  } = useDataRouterContext(), {
    matches
  } = useDataRouterStateContext(), navigation = useNavigation();
  React.useEffect(() => {
    isHydrated = !0;
  }, []);
  let serializePreResolvedErrorImp = (key, error) => {
    let toSerialize;
    return serializeError && error instanceof Error ? toSerialize = serializeError(error) : toSerialize = error, `${JSON.stringify(key)}:__remixContext.p(!1, ${escapeHtml(JSON.stringify(toSerialize))})`;
  }, serializePreresolvedDataImp = (routeId, key, data) => {
    let serializedData;
    try {
      serializedData = JSON.stringify(data);
    } catch (error) {
      return serializePreResolvedErrorImp(key, error);
    }
    return `${JSON.stringify(key)}:__remixContext.p(${escapeHtml(serializedData)})`;
  }, serializeErrorImp = (routeId, key, error) => {
    let toSerialize;
    return serializeError && error instanceof Error ? toSerialize = serializeError(error) : toSerialize = error, `__remixContext.r(${JSON.stringify(routeId)}, ${JSON.stringify(key)}, !1, ${escapeHtml(JSON.stringify(toSerialize))})`;
  }, serializeDataImp = (routeId, key, data) => {
    let serializedData;
    try {
      serializedData = JSON.stringify(data);
    } catch (error) {
      return serializeErrorImp(routeId, key, error);
    }
    return `__remixContext.r(${JSON.stringify(routeId)}, ${JSON.stringify(key)}, ${escapeHtml(serializedData)})`;
  }, deferredScripts = [], initialScripts = React.useMemo(() => {
    var _manifest$hmr;
    let contextScript = staticContext ? `window.__remixContext = ${serverHandoffString};` : " ", activeDeferreds = staticContext?.activeDeferreds;
    contextScript += activeDeferreds ? ["__remixContext.p = function(v,e,p,x) {", "  if (typeof e !== 'undefined') {", `    x=new Error("Unexpected Server Error");
    x.stack=undefined;`, "    p=Promise.reject(x);", "  } else {", "    p=Promise.resolve(v);", "  }", "  return p;", "};", "__remixContext.n = function(i,k) {", "  __remixContext.t = __remixContext.t || {};", "  __remixContext.t[i] = __remixContext.t[i] || {};", "  let p = new Promise((r, e) => {__remixContext.t[i][k] = {r:(v)=>{r(v);},e:(v)=>{e(v);}};});", typeof abortDelay == "number" ? `setTimeout(() => {if(typeof p._error !== "undefined" || typeof p._data !== "undefined"){return;} __remixContext.t[i][k].e(new Error("Server timeout."))}, ${abortDelay});` : "", "  return p;", "};", "__remixContext.r = function(i,k,v,e,p,x) {", "  p = __remixContext.t[i][k];", "  if (typeof e !== 'undefined') {", `    x=new Error("Unexpected Server Error");
    x.stack=undefined;`, "    p.e(x);", "  } else {", "    p.r(v);", "  }", "};"].join(`
`) + Object.entries(activeDeferreds).map(([routeId, deferredData]) => {
      let pendingKeys = new Set(deferredData.pendingKeys), promiseKeyValues = deferredData.deferredKeys.map((key) => {
        if (pendingKeys.has(key))
          return deferredScripts.push(/* @__PURE__ */ React.createElement(DeferredHydrationScript, {
            key: `${routeId} | ${key}`,
            deferredData,
            routeId,
            dataKey: key,
            scriptProps: props,
            serializeData: serializeDataImp,
            serializeError: serializeErrorImp
          })), `${JSON.stringify(key)}:__remixContext.n(${JSON.stringify(routeId)}, ${JSON.stringify(key)})`;
        {
          let trackedPromise = deferredData.data[key];
          return typeof trackedPromise._error < "u" ? serializePreResolvedErrorImp(key, trackedPromise._error) : serializePreresolvedDataImp(routeId, key, trackedPromise._data);
        }
      }).join(`,
`);
      return `Object.assign(__remixContext.state.loaderData[${JSON.stringify(routeId)}], {${promiseKeyValues}});`;
    }).join(`
`) + (deferredScripts.length > 0 ? `__remixContext.a=${deferredScripts.length};` : "") : "";
    let routeModulesScript = isStatic ? `${(_manifest$hmr = manifest.hmr) !== null && _manifest$hmr !== void 0 && _manifest$hmr.runtime ? `import ${JSON.stringify(manifest.hmr.runtime)};` : ""}import ${JSON.stringify(manifest.url)};
${matches.map((match, index) => `import * as route${index} from ${JSON.stringify(manifest.routes[match.route.id].module)};`).join(`
`)}
window.__remixRouteModules = {${matches.map((match, index) => `${JSON.stringify(match.route.id)}:route${index}`).join(",")}};

import(${JSON.stringify(manifest.entry.module)});` : " ";
    return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("script", _extends({}, props, {
      suppressHydrationWarning: !0,
      dangerouslySetInnerHTML: createHtml(contextScript),
      type: void 0
    })), /* @__PURE__ */ React.createElement("script", _extends({}, props, {
      suppressHydrationWarning: !0,
      dangerouslySetInnerHTML: createHtml(routeModulesScript),
      type: "module",
      async: !0
    })));
  }, []);
  if (!isStatic && typeof __remixContext == "object" && __remixContext.a)
    for (let i = 0; i < __remixContext.a; i++)
      deferredScripts.push(/* @__PURE__ */ React.createElement(DeferredHydrationScript, {
        key: i,
        scriptProps: props,
        serializeData: serializeDataImp,
        serializeError: serializeErrorImp
      }));
  let nextMatches = React.useMemo(() => {
    if (navigation.location) {
      let matches2 = matchRoutes(router.routes, navigation.location);
      return invariant(matches2, `No routes match path "${navigation.location.pathname}"`), matches2;
    }
    return [];
  }, [navigation.location, router.routes]), routePreloads = matches.concat(nextMatches).map((match) => {
    let route = manifest.routes[match.route.id];
    return (route.imports || []).concat([route.module]);
  }).flat(1), preloads = isHydrated ? [] : manifest.entry.imports.concat(routePreloads);
  return isHydrated ? null : /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("link", {
    rel: "modulepreload",
    href: manifest.url,
    crossOrigin: props.crossOrigin
  }), /* @__PURE__ */ React.createElement("link", {
    rel: "modulepreload",
    href: manifest.entry.module,
    crossOrigin: props.crossOrigin
  }), dedupe(preloads).map((path) => /* @__PURE__ */ React.createElement("link", {
    key: path,
    rel: "modulepreload",
    href: path,
    crossOrigin: props.crossOrigin
  })), initialScripts, deferredScripts);
}
function DeferredHydrationScript({
  dataKey,
  deferredData,
  routeId,
  scriptProps,
  serializeData,
  serializeError
}) {
  return typeof document > "u" && deferredData && dataKey && routeId && invariant(deferredData.pendingKeys.includes(dataKey), `Deferred data for route ${routeId} with key ${dataKey} was not pending but tried to render a script for it.`), /* @__PURE__ */ React.createElement(React.Suspense, {
    fallback: (
      // This makes absolutely no sense. The server renders null as a fallback,
      // but when hydrating, we need to render a script tag to avoid a hydration issue.
      // To reproduce a hydration mismatch, just render null as a fallback.
      typeof document > "u" && deferredData && dataKey && routeId ? null : /* @__PURE__ */ React.createElement("script", _extends({}, scriptProps, {
        async: !0,
        suppressHydrationWarning: !0,
        dangerouslySetInnerHTML: {
          __html: " "
        }
      }))
    )
  }, typeof document > "u" && deferredData && dataKey && routeId ? /* @__PURE__ */ React.createElement(Await, {
    resolve: deferredData.data[dataKey],
    errorElement: /* @__PURE__ */ React.createElement(ErrorDeferredHydrationScript, {
      dataKey,
      routeId,
      scriptProps,
      serializeError
    }),
    children: (data) => /* @__PURE__ */ React.createElement("script", _extends({}, scriptProps, {
      async: !0,
      suppressHydrationWarning: !0,
      dangerouslySetInnerHTML: {
        __html: serializeData(routeId, dataKey, data)
      }
    }))
  }) : /* @__PURE__ */ React.createElement("script", _extends({}, scriptProps, {
    async: !0,
    suppressHydrationWarning: !0,
    dangerouslySetInnerHTML: {
      __html: " "
    }
  })));
}
function ErrorDeferredHydrationScript({
  dataKey,
  routeId,
  scriptProps,
  serializeError
}) {
  let error = useAsyncError();
  return /* @__PURE__ */ React.createElement("script", _extends({}, scriptProps, {
    suppressHydrationWarning: !0,
    dangerouslySetInnerHTML: {
      __html: serializeError(routeId, dataKey, error)
    }
  }));
}
function dedupe(array) {
  return [...new Set(array)];
}
function useLoaderData() {
  return useLoaderData$1();
}
var LiveReload = () => null;
function mergeRefs(...refs) {
  return (value) => {
    refs.forEach((ref) => {
      typeof ref == "function" ? ref(value) : ref != null && (ref.current = value);
    });
  };
}

// node_modules/@remix-run/react/dist/esm/errorBoundaries.js
import * as React2 from "react";
import { isRouteErrorResponse } from "react-router-dom";
var RemixErrorBoundary = class extends React2.Component {
  constructor(props) {
    super(props), this.state = {
      error: props.error || null,
      location: props.location
    };
  }
  static getDerivedStateFromError(error) {
    return {
      error
    };
  }
  static getDerivedStateFromProps(props, state) {
    return state.location !== props.location ? {
      error: props.error || null,
      location: props.location
    } : {
      error: props.error || state.error,
      location: state.location
    };
  }
  render() {
    return this.state.error ? /* @__PURE__ */ React2.createElement(RemixRootDefaultErrorBoundary, {
      error: this.state.error
    }) : this.props.children;
  }
};
function RemixRootDefaultErrorBoundary({
  error
}) {
  if (console.error(error), isRouteErrorResponse(error))
    return /* @__PURE__ */ React2.createElement(BoundaryShell, {
      title: "Unhandled Thrown Response!"
    }, /* @__PURE__ */ React2.createElement("h1", {
      style: {
        fontFamily: "system-ui, sans-serif",
        padding: "2rem"
      }
    }, error.status, " ", error.statusText));
  let errorInstance;
  if (error instanceof Error)
    errorInstance = error;
  else {
    let errorString = error == null ? "Unknown Error" : typeof error == "object" && "toString" in error ? error.toString() : JSON.stringify(error);
    errorInstance = new Error(errorString);
  }
  return /* @__PURE__ */ React2.createElement(BoundaryShell, {
    title: "Application Error!"
  }, /* @__PURE__ */ React2.createElement("main", {
    style: {
      fontFamily: "system-ui, sans-serif",
      padding: "2rem"
    }
  }, /* @__PURE__ */ React2.createElement("h1", {
    style: {
      fontSize: "24px"
    }
  }, "Application Error"), /* @__PURE__ */ React2.createElement("pre", {
    style: {
      padding: "2rem",
      background: "hsla(10, 50%, 50%, 0.1)",
      color: "red",
      overflow: "auto"
    }
  }, errorInstance.stack)));
}
function BoundaryShell({
  title,
  children
}) {
  return /* @__PURE__ */ React2.createElement("html", {
    lang: "en"
  }, /* @__PURE__ */ React2.createElement("head", null, /* @__PURE__ */ React2.createElement("meta", {
    charSet: "utf-8"
  }), /* @__PURE__ */ React2.createElement("meta", {
    name: "viewport",
    content: "width=device-width,initial-scale=1,viewport-fit=cover"
  }), /* @__PURE__ */ React2.createElement("title", null, title)), /* @__PURE__ */ React2.createElement("body", null, children, /* @__PURE__ */ React2.createElement("script", {
    dangerouslySetInnerHTML: {
      __html: `
              console.log(
                "\u{1F4BF} Hey developer \u{1F44B}. You can provide a way better UX than this when your app throws errors. Check out https://remix.run/guides/errors for more information."
              );
            `
    }
  })));
}

// node_modules/@remix-run/react/dist/esm/routes.js
import * as React4 from "react";
import { UNSAFE_ErrorResponseImpl } from "@remix-run/router";
import { useRouteError, redirect } from "react-router-dom";

// node_modules/@remix-run/react/dist/esm/fallback.js
import * as React3 from "react";
function RemixRootDefaultHydrateFallback() {
  return /* @__PURE__ */ React3.createElement("html", {
    lang: "en"
  }, /* @__PURE__ */ React3.createElement("head", null, /* @__PURE__ */ React3.createElement("meta", {
    charSet: "utf-8"
  }), /* @__PURE__ */ React3.createElement("meta", {
    name: "viewport",
    content: "width=device-width,initial-scale=1,viewport-fit=cover"
  })), /* @__PURE__ */ React3.createElement("body", null, /* @__PURE__ */ React3.createElement(Scripts, null), /* @__PURE__ */ React3.createElement("script", {
    dangerouslySetInnerHTML: {
      __html: `
              console.log(
                "\u{1F4BF} Hey developer \u{1F44B}. You can provide a way better UX than this " +
                "when your app is running \`clientLoader\` functions on hydration. " +
                "Check out https://remix.run/route/hydrate-fallback for more information."
              );
            `
    }
  }), " "));
}

// node_modules/@remix-run/react/dist/esm/routes.js
function groupRoutesByParentId(manifest) {
  let routes2 = {};
  return Object.values(manifest).forEach((route) => {
    let parentId = route.parentId || "";
    routes2[parentId] || (routes2[parentId] = []), routes2[parentId].push(route);
  }), routes2;
}
function createServerRoutes(manifest, routeModules, future2, parentId = "", routesByParentId = groupRoutesByParentId(manifest)) {
  return (routesByParentId[parentId] || []).map((route) => {
    let routeModule = routeModules[route.id], dataRoute = {
      caseSensitive: route.caseSensitive,
      Component: getRouteModuleComponent(routeModule),
      HydrateFallback: routeModule.HydrateFallback ? routeModule.HydrateFallback : route.id === "root" ? RemixRootDefaultHydrateFallback : void 0,
      ErrorBoundary: routeModule.ErrorBoundary ? routeModule.ErrorBoundary : route.id === "root" ? () => /* @__PURE__ */ React4.createElement(RemixRootDefaultErrorBoundary, {
        error: useRouteError()
      }) : void 0,
      id: route.id,
      index: route.index,
      path: route.path,
      handle: routeModules[route.id].handle,
      // For partial hydration rendering, we need to indicate when the route
      // has a loader/clientLoader, but it won't ever be called during the static
      // render, so just give it a no-op function so we can render down to the
      // proper fallback
      loader: route.hasLoader || route.hasClientLoader ? () => null : void 0
      // We don't need action/shouldRevalidate on these routes since they're
      // for a static render
    }, children = createServerRoutes(manifest, routeModules, future2, route.id, routesByParentId);
    return children.length > 0 && (dataRoute.children = children), dataRoute;
  });
}
function getRouteModuleComponent(routeModule) {
  if (routeModule.default == null)
    return;
  if (!(typeof routeModule.default == "object" && Object.keys(routeModule.default).length === 0))
    return routeModule.default;
}
function shouldHydrateRouteLoader(route, routeModule) {
  return routeModule.clientLoader != null && (routeModule.clientLoader.hydrate === !0 || route.hasLoader !== !0);
}

// node_modules/@remix-run/react/dist/esm/index.js
import { Form, Outlet, createPath, generatePath, isRouteErrorResponse as isRouteErrorResponse2, matchPath, matchRoutes as matchRoutes2, parsePath as parsePath2, resolvePath, unstable_usePrompt, unstable_useViewTransitionState, useAsyncError as useAsyncError2, useAsyncValue, useBeforeUnload, useBlocker, useFetchers, useFormAction, useHref as useHref2, useLocation as useLocation3, useMatch, useNavigate, useNavigation as useNavigation2, useNavigationType, useOutlet, useOutletContext, useParams, useResolvedPath, useRevalidator, useRouteError as useRouteError2, useSearchParams, useSubmit } from "react-router-dom";

// node_modules/@remix-run/react/dist/esm/scroll-restoration.js
import * as React5 from "react";
import { useLocation as useLocation2, useMatches, UNSAFE_useScrollRestoration } from "react-router-dom";
var STORAGE_KEY = "positions";
function ScrollRestoration({
  getKey,
  ...props
}) {
  let location = useLocation2(), matches = useMatches();
  UNSAFE_useScrollRestoration({
    getKey,
    storageKey: STORAGE_KEY
  });
  let key = React5.useMemo(
    () => {
      if (!getKey)
        return null;
      let userKey = getKey(location, matches);
      return userKey !== location.key ? userKey : null;
    },
    // Nah, we only need this the first time for the SSR render
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  ), restoreScroll = ((STORAGE_KEY2, restoreKey) => {
    if (!window.history.state || !window.history.state.key) {
      let key2 = Math.random().toString(32).slice(2);
      window.history.replaceState({
        key: key2
      }, "");
    }
    try {
      let storedY = JSON.parse(sessionStorage.getItem(STORAGE_KEY2) || "{}")[restoreKey || window.history.state.key];
      typeof storedY == "number" && window.scrollTo(0, storedY);
    } catch (error) {
      console.error(error), sessionStorage.removeItem(STORAGE_KEY2);
    }
  }).toString();
  return /* @__PURE__ */ React5.createElement("script", _extends({}, props, {
    suppressHydrationWarning: !0,
    dangerouslySetInnerHTML: {
      __html: `(${restoreScroll})(${JSON.stringify(STORAGE_KEY)}, ${JSON.stringify(key)})`
    }
  }));
}

// node_modules/@remix-run/react/dist/esm/server.js
import * as React6 from "react";
import { createStaticRouter, StaticRouterProvider } from "react-router-dom/server";
function RemixServer({
  context,
  url,
  abortDelay
}) {
  typeof url == "string" && (url = new URL(url));
  let {
    manifest,
    routeModules,
    criticalCss,
    serverHandoffString
  } = context, routes2 = createServerRoutes(manifest.routes, routeModules, context.future);
  context.staticHandlerContext.loaderData = {
    ...context.staticHandlerContext.loaderData
  };
  for (let match of context.staticHandlerContext.matches) {
    let routeId = match.route.id, route = routeModules[routeId], manifestRoute = context.manifest.routes[routeId];
    route && shouldHydrateRouteLoader(manifestRoute, route) && (route.HydrateFallback || !manifestRoute.hasLoader) && (context.staticHandlerContext.loaderData[routeId] = void 0);
  }
  let router = createStaticRouter(routes2, context.staticHandlerContext, {
    future: {
      v7_partialHydration: !0,
      v7_relativeSplatPath: context.future.v3_relativeSplatPath
    }
  });
  return /* @__PURE__ */ React6.createElement(RemixContext.Provider, {
    value: {
      manifest,
      routeModules,
      criticalCss,
      serverHandoffString,
      future: context.future,
      serializeError: context.serializeError,
      abortDelay
    }
  }, /* @__PURE__ */ React6.createElement(RemixErrorBoundary, {
    location: router.state.location
  }, /* @__PURE__ */ React6.createElement(StaticRouterProvider, {
    router,
    context: context.staticHandlerContext,
    hydrate: !1
  })));
}

// node_modules/isbot/index.mjs
function _iterableToArrayLimit(r, l) {
  var t = r == null ? null : typeof Symbol < "u" && r[Symbol.iterator] || r["@@iterator"];
  if (t != null) {
    var e, n, i, u, a = [], f = !0, o = !1;
    try {
      if (i = (t = t.call(r)).next, l === 0) {
        if (Object(t) !== t)
          return;
        f = !1;
      } else
        for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0)
          ;
    } catch (r2) {
      o = !0, n = r2;
    } finally {
      try {
        if (!f && t.return != null && (u = t.return(), Object(u) !== u))
          return;
      } finally {
        if (o)
          throw n;
      }
    }
    return a;
  }
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor))
    throw new TypeError("Cannot call a class as a function");
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  return protoProps && _defineProperties(Constructor.prototype, protoProps), staticProps && _defineProperties(Constructor, staticProps), Object.defineProperty(Constructor, "prototype", {
    writable: !1
  }), Constructor;
}
function _defineProperty(obj, key, value) {
  return key = _toPropertyKey(key), key in obj ? Object.defineProperty(obj, key, {
    value,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : obj[key] = value, obj;
}
function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}
function _arrayWithHoles(arr) {
  if (Array.isArray(arr))
    return arr;
}
function _unsupportedIterableToArray(o, minLen) {
  if (o) {
    if (typeof o == "string")
      return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor && (n = o.constructor.name), n === "Map" || n === "Set")
      return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return _arrayLikeToArray(o, minLen);
  }
}
function _arrayLikeToArray(arr, len) {
  (len == null || len > arr.length) && (len = arr.length);
  for (var i = 0, arr2 = new Array(len); i < len; i++)
    arr2[i] = arr[i];
  return arr2;
}
function _nonIterableRest() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function _toPrimitive(input, hint) {
  if (typeof input != "object" || input === null)
    return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (typeof res != "object")
      return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return typeof key == "symbol" ? key : String(key);
}
function _classPrivateFieldGet(receiver, privateMap) {
  var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get");
  return _classApplyDescriptorGet(receiver, descriptor);
}
function _classPrivateFieldSet(receiver, privateMap, value) {
  var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set");
  return _classApplyDescriptorSet(receiver, descriptor, value), value;
}
function _classExtractFieldDescriptor(receiver, privateMap, action) {
  if (!privateMap.has(receiver))
    throw new TypeError("attempted to " + action + " private field on non-instance");
  return privateMap.get(receiver);
}
function _classApplyDescriptorGet(receiver, descriptor) {
  return descriptor.get ? descriptor.get.call(receiver) : descriptor.value;
}
function _classApplyDescriptorSet(receiver, descriptor, value) {
  if (descriptor.set)
    descriptor.set.call(receiver, value);
  else {
    if (!descriptor.writable)
      throw new TypeError("attempted to set read only private field");
    descriptor.value = value;
  }
}
function _classPrivateMethodGet(receiver, privateSet, fn) {
  if (!privateSet.has(receiver))
    throw new TypeError("attempted to get private field on non-instance");
  return fn;
}
function _checkPrivateRedeclaration(obj, privateCollection) {
  if (privateCollection.has(obj))
    throw new TypeError("Cannot initialize the same private elements twice on an object");
}
function _classPrivateFieldInitSpec(obj, privateMap, value) {
  _checkPrivateRedeclaration(obj, privateMap), privateMap.set(obj, value);
}
function _classPrivateMethodInitSpec(obj, privateSet) {
  _checkPrivateRedeclaration(obj, privateSet), privateSet.add(obj);
}
var list = [
  " daum[ /]",
  " deusu/",
  " yadirectfetcher",
  "(?:^| )site",
  "(?:^|[^g])news",
  "@[a-z]",
  "\\(at\\)[a-z]",
  "\\(github\\.com/",
  "\\[at\\][a-z]",
  "^12345",
  "^<",
  "^[\\w \\.\\-\\(\\)]+(/v?\\d+(\\.\\d+)?(\\.\\d{1,10})?)?$",
  "^[^ ]{50,}$",
  "^active",
  "^ad muncher",
  "^amaya",
  "^anglesharp/",
  "^anonymous",
  "^avsdevicesdk/",
  "^axios/",
  "^bidtellect/",
  "^biglotron",
  "^btwebclient/",
  "^castro",
  "^clamav[ /]",
  "^client/",
  "^cobweb/",
  "^coccoc",
  "^custom",
  "^ddg[_-]android",
  "^discourse",
  "^dispatch/\\d",
  "^downcast/",
  "^duckduckgo",
  "^facebook",
  "^fdm[ /]\\d",
  "^getright/",
  "^gozilla/",
  "^hatena",
  "^hobbit",
  "^hotzonu",
  "^hwcdn/",
  "^jeode/",
  "^jetty/",
  "^jigsaw",
  "^linkdex",
  "^lwp[-: ]",
  "^metauri",
  "^microsoft bits",
  "^movabletype",
  "^mozilla/\\d\\.\\d \\(compatible;?\\)$",
  "^mozilla/\\d\\.\\d \\w*$",
  "^navermailapp",
  "^netsurf",
  "^offline explorer",
  "^php",
  "^postman",
  "^postrank",
  "^python",
  "^read",
  "^reed",
  "^restsharp/",
  "^snapchat",
  "^space bison",
  "^svn",
  "^swcd ",
  "^taringa",
  "^test certificate info",
  "^thumbor/",
  "^tumblr/",
  "^user-agent:mozilla",
  "^valid",
  "^venus/fedoraplanet",
  "^w3c",
  "^webbandit/",
  "^webcopier",
  "^wget",
  "^whatsapp",
  "^xenu link sleuth",
  "^yahoo",
  "^yandex",
  "^zdm/\\d",
  "^zoom marketplace/",
  "^{{.*}}$",
  "adbeat\\.com",
  "appinsights",
  "archive",
  "ask jeeves/teoma",
  "bit\\.ly/",
  "bluecoat drtr",
  "bot",
  "browsex",
  "burpcollaborator",
  "capture",
  "catch",
  "check",
  "chrome-lighthouse",
  "chromeframe",
  "cloud",
  "crawl",
  "cryptoapi",
  "dareboost",
  "datanyze",
  "dataprovider",
  "dejaclick",
  "dmbrowser",
  "download",
  "evc-batch/",
  "feed",
  "firephp",
  "freesafeip",
  "gomezagent",
  "google",
  "headlesschrome/",
  "http",
  "httrack",
  "hubspot marketing grader",
  "hydra",
  "ibisbrowser",
  "images",
  "inspect",
  "iplabel",
  "ips-agent",
  "java",
  "library",
  "mail\\.ru/",
  "manager",
  "monitor",
  "morningscore/",
  "neustar wpm",
  "nutch",
  "offbyone",
  "optimize",
  "pageburst",
  "pagespeed",
  "perl",
  "phantom",
  "pingdom",
  "powermarks",
  "preview",
  "proxy",
  "ptst[ /]\\d",
  "reader",
  "rexx;",
  "rigor",
  "rss",
  "scan",
  "scrape",
  "search",
  "serp ?reputation ?management",
  "server",
  "sogou",
  "sparkler/",
  "speedcurve",
  "spider",
  "splash",
  "statuscake",
  "stumbleupon\\.com",
  "supercleaner",
  "synapse",
  "synthetic",
  "torrent",
  "tracemyfile",
  "transcoder",
  "trendsmapresolver",
  "twingly recon",
  "url",
  "virtuoso",
  "wappalyzer",
  "webglance",
  "webkit2png",
  "websitemetadataretriever",
  "whatcms/",
  "wordpress",
  "zgrab"
];
function amend(list2) {
  try {
    new RegExp("(?<! cu)bot").test("dangerbot");
  } catch {
    return list2;
  }
  return [
    // Addresses: Cubot device
    ["bot", "(?<! cu)bot"],
    // Addresses: Android webview
    ["google", "(?<! (?:channel/|google/))google(?!(app|/google| pixel))"],
    // Addresses: libhttp browser
    ["http", "(?<!(?:lib))http"],
    // Addresses: java based browsers
    ["java", "java(?!;)"],
    // Addresses: Yandex Search App
    ["search", "(?<! ya(?:yandex)?)search"]
  ].forEach(function(_ref) {
    var _ref2 = _slicedToArray(_ref, 2), search = _ref2[0], replace = _ref2[1], index = list2.lastIndexOf(search);
    ~index && list2.splice(index, 1, replace);
  }), list2;
}
amend(list);
var flags = "i", _list = /* @__PURE__ */ new WeakMap(), _pattern = /* @__PURE__ */ new WeakMap(), _update = /* @__PURE__ */ new WeakSet(), _index = /* @__PURE__ */ new WeakSet(), Isbot = /* @__PURE__ */ function() {
  function Isbot2(patterns) {
    var _this = this;
    _classCallCheck(this, Isbot2), _classPrivateMethodInitSpec(this, _index), _classPrivateMethodInitSpec(this, _update), _classPrivateFieldInitSpec(this, _list, {
      writable: !0,
      value: void 0
    }), _classPrivateFieldInitSpec(this, _pattern, {
      writable: !0,
      value: void 0
    }), _classPrivateFieldSet(this, _list, patterns || list.slice()), _classPrivateMethodGet(this, _update, _update2).call(this);
    var isbot2 = function(ua) {
      return _this.test(ua);
    };
    return Object.defineProperties(isbot2, Object.entries(Object.getOwnPropertyDescriptors(Isbot2.prototype)).reduce(function(accumulator, _ref) {
      var _ref2 = _slicedToArray(_ref, 2), prop = _ref2[0], descriptor = _ref2[1];
      return typeof descriptor.value == "function" && Object.assign(accumulator, _defineProperty({}, prop, {
        value: _this[prop].bind(_this)
      })), typeof descriptor.get == "function" && Object.assign(accumulator, _defineProperty({}, prop, {
        get: function() {
          return _this[prop];
        }
      })), accumulator;
    }, {}));
  }
  return _createClass(Isbot2, [{
    key: "pattern",
    get: (
      /**
       * Get a clone of the pattern
       * @type RegExp
       */
      function() {
        return new RegExp(_classPrivateFieldGet(this, _pattern));
      }
    )
    /**
     * Match given string against out pattern
     * @param  {string} ua User Agent string
     * @returns {boolean}
     */
  }, {
    key: "test",
    value: function(ua) {
      return Boolean(ua) && _classPrivateFieldGet(this, _pattern).test(ua);
    }
    /**
     * Get the match for strings' known crawler pattern
     * @param  {string} ua User Agent string
     * @returns {string|null}
     */
  }, {
    key: "find",
    value: function() {
      var ua = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "", match = ua.match(_classPrivateFieldGet(this, _pattern));
      return match && match[0];
    }
    /**
     * Get the patterns that match user agent string if any
     * @param  {string} ua User Agent string
     * @returns {string[]}
     */
  }, {
    key: "matches",
    value: function() {
      var ua = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
      return _classPrivateFieldGet(this, _list).filter(function(entry2) {
        return new RegExp(entry2, flags).test(ua);
      });
    }
    /**
     * Clear all patterns that match user agent
     * @param  {string} ua User Agent string
     * @returns {void}
     */
  }, {
    key: "clear",
    value: function() {
      var ua = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
      this.exclude(this.matches(ua));
    }
    /**
     * Extent patterns for known crawlers
     * @param  {string[]} filters
     * @returns {void}
     */
  }, {
    key: "extend",
    value: function() {
      var _this2 = this, filters = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
      [].push.apply(_classPrivateFieldGet(this, _list), filters.filter(function(rule) {
        return _classPrivateMethodGet(_this2, _index, _index2).call(_this2, rule) === -1;
      }).map(function(filter) {
        return filter.toLowerCase();
      })), _classPrivateMethodGet(this, _update, _update2).call(this);
    }
    /**
     * Exclude patterns from bot pattern rule
     * @param  {string[]} filters
     * @returns {void}
     */
  }, {
    key: "exclude",
    value: function() {
      for (var filters = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [], length = filters.length; length--; ) {
        var index = _classPrivateMethodGet(this, _index, _index2).call(this, filters[length]);
        index > -1 && _classPrivateFieldGet(this, _list).splice(index, 1);
      }
      _classPrivateMethodGet(this, _update, _update2).call(this);
    }
    /**
     * Create a new Isbot instance using given list or self's list
     * @param  {string[]} [list]
     * @returns {Isbot}
     */
  }, {
    key: "spawn",
    value: function(list2) {
      return new Isbot2(list2 || _classPrivateFieldGet(this, _list));
    }
  }]), Isbot2;
}();
function _update2() {
  _classPrivateFieldSet(this, _pattern, new RegExp(_classPrivateFieldGet(this, _list).join("|"), flags));
}
function _index2(rule) {
  return _classPrivateFieldGet(this, _list).indexOf(rule.toLowerCase());
}
var isbot = new Isbot();

// app/entry.server.tsx
var import_server3 = __toESM(require_server_node(), 1);
import { jsx } from "react/jsx-runtime";
var ABORT_DELAY = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, remixContext, loadContext) {
  return isbot(request.headers.get("user-agent")) ? handleBotRequest(request, responseStatusCode, responseHeaders, remixContext) : handleBrowserRequest(request, responseStatusCode, responseHeaders, remixContext);
}
function handleBotRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = !1, { pipe, abort } = (0, import_server3.renderToPipeableStream)(
      /* @__PURE__ */ jsx(RemixServer, { context: remixContext, url: request.url, abortDelay: ABORT_DELAY }),
      {
        onAllReady() {
          shellRendered = !0;
          let body = new PassThrough(), stream = (0, import_node.createReadableStreamFromReadable)(body);
          responseHeaders.set("Content-Type", "text/html"), resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          ), pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500, shellRendered && console.error(error);
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
function handleBrowserRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = !1, { pipe, abort } = (0, import_server3.renderToPipeableStream)(
      /* @__PURE__ */ jsx(RemixServer, { context: remixContext, url: request.url, abortDelay: ABORT_DELAY }),
      {
        onShellReady() {
          shellRendered = !0;
          let body = new PassThrough(), stream = (0, import_node.createReadableStreamFromReadable)(body);
          responseHeaders.set("Content-Type", "text/html"), resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          ), pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500, shellRendered && console.error(error);
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}

// app/root.tsx
var root_exports = {};
__export(root_exports, {
  default: () => App,
  links: () => links,
  loader: () => loader,
  meta: () => meta
});
import { Amplify } from "aws-amplify";
import { Notifications } from "@mantine/notifications";

// css-bundle-plugin-ns:@remix-run/css-bundle
var cssBundleHref = "/build/css-bundle-WDH4LBXJ.css";

// app/root.tsx
import { MantineProvider, ColorSchemeScript } from "@mantine/core";
import { Provider } from "react-redux";
import { Authenticator } from "@aws-amplify/ui-react";

// app/shared/components/feedback/FeedbackModal.tsx
import { Group as Group2, Text as Text2 } from "@mantine/core";
import { useEffect as useEffect2 } from "react";
import { useForm } from "@mantine/form";
import { IconCircleCheck } from "@tabler/icons-react";

// app/state/slices/sessionSlice.ts
import { createSelector, createSlice } from "@reduxjs/toolkit";

// app/state/apis/questionsApi.ts
import { createApi } from "@reduxjs/toolkit/query/react";

// app/shared/utils/apiUtil.ts
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Auth } from "aws-amplify";

// app/shared/constants/urlConstants.ts
var urls = {
  landingPage: "/",
  careersTest: "/career-test",
  overview: "/overview",
  questions: "/questions",
  mentors: "/mentors",
  settings: "/settings",
  jobs: "/jobs",
  linkedIn: "https://linkedin.com/company/100135742/admin/feed/posts/"
}, contactEmail = "career26.info@gmail.com";
var prodUrl = "https://z3mda8e0qg.execute-api.eu-west-1.amazonaws.com/Prod", getBaseUrl = () => prodUrl, baseUrl = getBaseUrl();

// app/shared/utils/apiUtil.ts
var getAuthorisedBaseQuery = (unauthorisedEndpoints2) => fetchBaseQuery({
  baseUrl,
  prepareHeaders: async (headers, api) => {
    if (unauthorisedEndpoints2?.includes(api.endpoint))
      return headers;
    let token = (await Auth.currentSession()).getIdToken().getJwtToken();
    return headers.set("Authorization", token), headers;
  }
});

// app/state/apis/questionsApi.ts
var questionsApi = createApi({
  reducerPath: "questions",
  baseQuery: getAuthorisedBaseQuery(),
  endpoints: (build) => ({
    getQuestions: build.query({
      query: () => "questions"
    }),
    getSuggestion: build.mutation({
      query: (body) => ({
        url: "suggestion",
        method: "POST",
        body
      })
    }),
    rateAnswer: build.mutation({
      query: (body) => ({
        url: "rate",
        method: "POST",
        body
      })
    })
  })
}), { useGetQuestionsQuery, useRateAnswerMutation, useGetSuggestionMutation } = questionsApi, selectInterviewQuestions = (state) => questionsApi.endpoints.getQuestions.select()(state).data, selectSuggestion = (state, fixedCacheKey) => questionsApi.endpoints.getSuggestion.select({
  fixedCacheKey,
  requestId: void 0
})(state).data, questionsApi_default = questionsApi.reducer;

// app/state/apis/profileApi.ts
import { createApi as createApi2 } from "@reduxjs/toolkit/query/react";
var unauthorisedEndpoints = ["selectCareer", "createProfile"], profileApi = createApi2({
  reducerPath: "profile",
  baseQuery: getAuthorisedBaseQuery(unauthorisedEndpoints),
  endpoints: (build) => ({
    createProfile: build.mutation({
      query: (body) => ({
        url: "profile",
        method: "POST",
        body
      })
    }),
    selectCareer: build.mutation({
      query: (body) => ({
        url: "select",
        method: "POST",
        body
      })
    }),
    getProfile: build.query({
      query: () => "profile"
    }),
    associateProfile: build.query({
      query: (profileId) => `associate/${profileId}`
    })
  })
}), {
  useLazyGetProfileQuery,
  useGetProfileQuery,
  useCreateProfileMutation,
  useSelectCareerMutation,
  useLazyAssociateProfileQuery
} = profileApi, selectProfileState = (state) => profileApi.endpoints.getProfile.select()(state).data, selectProfile = (state) => selectProfileState(state)?.profile, selectCareerPaths = (state) => selectProfileState(state)?.careerPaths, selectProfileId = (state) => selectProfileState(state)?.identifier, profileApi_default = profileApi.reducer;

// app/shared/constants/careerConstants.ts
var careerColors = [
  "pink",
  "orange",
  "green",
  "dark",
  "red",
  "purple",
  "yellow",
  "blue",
  "teal",
  "grape",
  "violet",
  "indigo",
  "cyan",
  "lime"
];

// app/shared/utils/colorUtil.ts
var getColorsObject = ({
  initialColors,
  industries
}) => industries.reduce(
  (agg, industry) => {
    if (agg[industry])
      return agg;
    let newColor = careerColors[Object.keys(agg).length];
    return { ...agg, [industry]: newColor };
  },
  { ...initialColors }
);

// app/state/slices/sessionSlice.ts
var initialSessionState = {
  industryColors: {},
  questionColors: {},
  selectedQuestionId: void 0,
  loginModal: { open: !1 },
  feedbackModal: { open: !1 },
  careerTestModal: { open: !1 },
  diversityModal: { open: !1 }
}, sessionSlice = createSlice({
  name: "session",
  initialState: initialSessionState,
  reducers: {
    setDiversityModal: (state, { payload }) => {
      state.diversityModal = payload;
    },
    setCareerTestModal: (state, { payload }) => {
      state.careerTestModal = payload;
    },
    setLoginModal: (state, { payload }) => {
      state.loginModal = payload;
    },
    setFeedbackModal: (state, { payload }) => {
      state.feedbackModal = payload;
    },
    setSelectedCareerPathId: (state, { payload }) => {
      state.selectedCareerPathId = payload;
    },
    setSelectedQuestionId: (state, { payload }) => {
      state.selectedQuestionId = payload;
    },
    addIndustryColors: (state, { payload: industries }) => {
      let industryColors = getColorsObject({
        initialColors: { ...state.industryColors },
        industries
      });
      state.industryColors = industryColors;
    },
    addQuestionColors: (state, { payload: categories }) => {
      let questionColors = getColorsObject({
        initialColors: { ...state.questionColors },
        industries: categories
      });
      state.questionColors = questionColors;
    },
    resetSession: () => initialSessionState
  }
}), {
  setLoginModal,
  setSelectedCareerPathId,
  resetSession,
  addIndustryColors,
  addQuestionColors,
  setSelectedQuestionId,
  setFeedbackModal,
  setCareerTestModal,
  setDiversityModal
} = sessionSlice.actions, selectSession = (state) => state.session, selectSelectedQuestionId = (state) => selectSession(state).selectedQuestionId || 0, selectSelectedQuestion = (state) => {
  let questions = selectInterviewQuestions(state), id = selectSelectedQuestionId(state);
  return questions?.[id];
}, selectLoginModal = (state) => selectSession(state).loginModal;
var selectCareerTestModal = (state) => selectSession(state).careerTestModal, selectFeedbackModal = (state) => selectSession(state).feedbackModal, selectSelectedCareerPathId = (state) => selectSession(state).selectedCareerPathId || Object.keys(selectCareerPaths(state) || {})[0], selectSelectedCareerPath = createSelector(
  [selectSelectedCareerPathId, selectCareerPaths],
  (id, careerPaths) => {
    if (!(!id || !careerPaths))
      return careerPaths[id];
  }
), selectIndustryColors = (state) => selectSession(state).industryColors, selectQuestionColors = (state) => selectSession(state).questionColors, sessionSlice_default = sessionSlice.reducer;

// app/state/store.ts
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";

// app/state/apis/overviewApi.ts
import { createApi as createApi3, fetchBaseQuery as fetchBaseQuery2 } from "@reduxjs/toolkit/query/react";
var overviewApi = createApi3({
  reducerPath: "overview",
  baseQuery: fetchBaseQuery2({ baseUrl }),
  endpoints: (build) => ({
    getCareerOverview: build.query({
      query: ({ careerId, profileId }) => `overview/${profileId}/${careerId}`
    })
  })
}), { useGetCareerOverviewQuery } = overviewApi, overviewApi_default = overviewApi.reducer;

// app/state/apis/feedbackApi.ts
import { createApi as createApi4, fetchBaseQuery as fetchBaseQuery3 } from "@reduxjs/toolkit/query/react";
var feedbackApi = createApi4({
  reducerPath: "feedback",
  baseQuery: fetchBaseQuery3({ baseUrl }),
  endpoints: (build) => ({
    submitFeedback: build.mutation({
      query: (body) => ({ url: "feedback", method: "POST", body })
    })
  })
}), { useSubmitFeedbackMutation } = feedbackApi, feedbackApi_default = feedbackApi.reducer;

// app/state/store.ts
var rootReducer = combineReducers({
  session: sessionSlice_default,
  [questionsApi.reducerPath]: questionsApi.reducer,
  [profileApi.reducerPath]: profileApi.reducer,
  [overviewApi.reducerPath]: overviewApi.reducer,
  [feedbackApi.reducerPath]: feedbackApi.reducer
}), store = configureStore({
  reducer: {
    session: sessionSlice_default,
    [questionsApi.reducerPath]: questionsApi.reducer,
    [profileApi.reducerPath]: profileApi.reducer,
    [overviewApi.reducerPath]: overviewApi.reducer,
    [feedbackApi.reducerPath]: feedbackApi.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: !1 }).concat([
    questionsApi.middleware,
    profileApi.middleware,
    overviewApi.middleware,
    feedbackApi.middleware
  ])
}), useAppDispatch = useDispatch, useAppSelector = useSelector;

// app/shared/components/feedback/FeedbackForm.tsx
import { Checkbox, Grid, Radio, Text, Textarea } from "@mantine/core";

// app/shared/utils/formUtil.ts
var getPrefix = (rating) => {
  switch (rating) {
    case "I hated it":
      return "Why did you hate it?";
    case "I disliked it":
      return "Why did you dislike it?";
    case "I liked it":
      return "Why did you like it?";
    case "I loved it":
      return "Why did you love it?";
    default:
      return "Provide a reason for this rating";
  }
}, getCharacterCount = (prefix, answerLength = 0) => `${prefix} (${500 - answerLength} characters remaining)`, getRatingLabel = (rating, answerLength = 0) => {
  let prefix = getPrefix(rating);
  return getCharacterCount(prefix, answerLength);
};

// app/shared/components/feedback/feedbackConstants.ts
var heardFromOptions = [
  "Search engine (Google, Bing, etc.)",
  "Recommended by a friend of colleague",
  "Direct Email",
  "Conference",
  "LinkedIn",
  "Wechat",
  "Other"
], mostHelpfulOptions = [
  "Career Test",
  "Industry Insights",
  "Interview Preparation",
  "Other",
  "Nothing"
], experienceRatingOptions = [
  "Very helpful",
  "Somewhat helpful",
  "Neutral",
  "Not helpful"
];

// app/shared/components/feedback/feedback.module.css
var feedback_module_default = { radioGroup: "jtqZK" };

// app/shared/components/feedback/FeedbackForm.tsx
import { Fragment as Fragment2, jsx as jsx2, jsxs } from "react/jsx-runtime";
var FeedbackForm = ({ form }) => /* @__PURE__ */ jsxs(Fragment2, { children: [
  /* @__PURE__ */ jsx2("div", { children: /* @__PURE__ */ jsx2(Text, { py: "md", children: "Career26 is always looking to improve. If you have feedback or thoughts on how we can help you better, then we'd love to hear from you." }) }),
  /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx2(
      Checkbox.Group,
      {
        ...form.getInputProps("heardFrom"),
        label: "How did you heard about us?",
        withAsterisk: !0,
        py: "md",
        children: /* @__PURE__ */ jsx2(Grid, { py: "xs", children: heardFromOptions.map(
          (label) => /* @__PURE__ */ jsx2(Grid.Col, { span: 6, children: /* @__PURE__ */ jsx2(Checkbox, { label, value: label }) }, `heard-from-${label}`)
        ) })
      }
    ),
    /* @__PURE__ */ jsx2(
      Checkbox.Group,
      {
        ...form.getInputProps("mostHelpful"),
        label: "What feature did you find the most helpful?",
        withAsterisk: !0,
        py: "md",
        children: /* @__PURE__ */ jsx2(Grid, { py: "xs", children: mostHelpfulOptions.map(
          (label) => /* @__PURE__ */ jsx2(Grid.Col, { span: 6, children: /* @__PURE__ */ jsx2(Checkbox, { label, value: label }) }, `most-helpful-${label}`)
        ) })
      }
    ),
    /* @__PURE__ */ jsx2(
      Radio.Group,
      {
        ...form.getInputProps("experienceRating"),
        name: "experienceRating",
        label: "How would you rate you Career26 experience?",
        withAsterisk: !0,
        py: "md",
        children: /* @__PURE__ */ jsx2("div", { className: feedback_module_default.radioGroup, children: experienceRatingOptions.map(
          (label) => /* @__PURE__ */ jsx2(Radio, { value: label, label, py: "xs" }, `experience-${label}`)
        ) })
      }
    ),
    /* @__PURE__ */ jsx2(
      Textarea,
      {
        ...form.getInputProps("otherFunctions"),
        label: getCharacterCount(
          "Are there any other functions that you would like Career26 to have in the future?",
          form.values.otherFunctions?.length
        ),
        minRows: 3,
        autosize: !0,
        placeholder: "Enter your message here"
      }
    )
  ] })
] });

// app/shared/components/actionModal/ActionModal.tsx
import { Button, Group, Modal } from "@mantine/core";

// app/shared/components/actionModal/actionModal.module.css
var actionModal_module_default = { footer: "NQvX3" };

// app/shared/components/actionModal/ActionModal.tsx
import { jsx as jsx3, jsxs as jsxs2 } from "react/jsx-runtime";
var ActionModal = ({
  opened,
  onClick,
  onClose,
  disabled,
  body,
  loading,
  label,
  title
}) => /* @__PURE__ */ jsxs2(Modal.Root, { opened, onClose, size: "xl", centered: !0, children: [
  /* @__PURE__ */ jsx3(Modal.Overlay, {}),
  /* @__PURE__ */ jsxs2(Modal.Content, { children: [
    /* @__PURE__ */ jsxs2(Modal.Header, { bg: "navy", c: "white", children: [
      /* @__PURE__ */ jsx3(Modal.Title, { fw: "bold", children: title }),
      /* @__PURE__ */ jsx3(Modal.CloseButton, { c: "white" })
    ] }),
    /* @__PURE__ */ jsx3(Modal.Body, { children: body }),
    /* @__PURE__ */ jsx3(Group, { justify: "center", py: "md", className: actionModal_module_default.footer, children: /* @__PURE__ */ jsx3(Button, { disabled, loading, onClick, variant: "outline", children: label }) })
  ] })
] });

// app/shared/components/feedback/FeedbackModal.tsx
import { jsx as jsx4, jsxs as jsxs3 } from "react/jsx-runtime";
var hasAnswer = (value) => !value?.length && "Please provide an answer", FeedbackModal = () => {
  let dispatch = useAppDispatch(), { open } = useAppSelector(selectFeedbackModal), [submitFeedback, { isLoading, data, reset }] = useSubmitFeedbackMutation(), form = useForm({
    initialValues: {
      heardFrom: [],
      mostHelpful: [],
      experienceRating: ""
    },
    validate: {
      heardFrom: hasAnswer,
      mostHelpful: hasAnswer,
      experienceRating: hasAnswer,
      otherFunctions: (value) => {
        if (!(!value || value.length <= 500))
          return "Feedback must be 500 characters or less";
      }
    }
  }), onClose = () => {
    dispatch(setFeedbackModal({ open: !1 })), reset(), form.reset();
  };
  return useEffect2(() => {
    data && setTimeout(onClose, 2e3);
  }, [data]), /* @__PURE__ */ jsx4(
    ActionModal,
    {
      label: "Submit",
      title: "Feedback",
      opened: open,
      onClose,
      body: data ? /* @__PURE__ */ jsxs3(Group2, { py: "md", children: [
        /* @__PURE__ */ jsx4(IconCircleCheck, { color: "green", size: 50 }),
        /* @__PURE__ */ jsx4(Text2, { children: "Thank you for providing feedback!" })
      ] }) : /* @__PURE__ */ jsx4(FeedbackForm, { form }),
      disabled: !!Object.values(form.errors).length,
      loading: isLoading,
      onClick: () => submitFeedback(form.values)
    }
  );
};

// app/shared/components/careerTestModal/CareerTestModal.tsx
import { Container, Text as Text3 } from "@mantine/core";

// app/shared/hooks/usePageNavigation.ts
import { useMemo as useMemo3 } from "react";
var usePageNavigation = () => {
  let navigate = useNavigate(), dispatch = useAppDispatch(), { pathname: currentPathname } = useLocation3(), careerId = useAppSelector(selectSelectedCareerPathId), featureUrl = useMemo3(() => {
    if (new RegExp(urls.questions).test(currentPathname))
      return urls.questions;
    if (new RegExp(urls.overview).test(currentPathname))
      return urls.overview;
  }, [currentPathname, navigate]);
  return {
    goToHomepage: () => {
      navigate(urls.landingPage);
    },
    goToSettings: () => {
      navigate(urls.settings);
    },
    clickCareersTest: () => {
      navigate(urls.careersTest);
    },
    toggleCareerId: (newCareerId) => {
      let newPathname = currentPathname.replace(
        new RegExp(`${featureUrl}/(.*)`),
        `${featureUrl}/${newCareerId}`
      );
      navigate(newPathname), dispatch(setSelectedCareerPathId(newCareerId));
    },
    toggleQuestionId: (newQuestionId) => {
      let newPathname = currentPathname.replace(
        new RegExp(`${featureUrl}/${careerId}/(.*)`),
        `${featureUrl}/${careerId}/${newQuestionId}`
      );
      navigate(newPathname), dispatch(setSelectedQuestionId(newQuestionId));
    },
    showNavigation: !!featureUrl,
    featureUrl,
    currentPathname
  };
};

// app/shared/components/careerTestModal/careerTestModal.module.css
var careerTestModal_module_default = { container: "ag2ez" };

// app/shared/components/careerTestModal/CareerTestModal.tsx
import { jsx as jsx5, jsxs as jsxs4 } from "react/jsx-runtime";
var NoProfileBody = () => /* @__PURE__ */ jsxs4(Container, { py: "md", className: careerTestModal_module_default.container, children: [
  /* @__PURE__ */ jsx5(Text3, { py: "md", children: "We provide personalised career guidance based on your Career26 test results." }),
  /* @__PURE__ */ jsx5(Text3, { py: "md", fw: "bold", children: "Take the Career26 Test now, it takes less than 5 minutes!" })
] }), TimeTakenBody = () => /* @__PURE__ */ jsxs4(Container, { py: "md", className: careerTestModal_module_default.container, children: [
  /* @__PURE__ */ jsx5(Text3, { py: "md", children: "This test takes less than 5 minutes." }),
  /* @__PURE__ */ jsx5(Text3, { py: "md", fw: "bold", children: "The more detail you provide, the more accurate the results will be." })
] }), CareerTestModal = () => {
  let dispatch = useAppDispatch(), { open, noProfile } = useAppSelector(selectCareerTestModal), { clickCareersTest } = usePageNavigation(), onClose = () => {
    dispatch(setCareerTestModal({ open: !1 }));
  };
  return /* @__PURE__ */ jsx5(
    ActionModal,
    {
      title: "Build your Career Profile",
      opened: open,
      onClose,
      label: "Take the Test Now!",
      onClick: () => {
        clickCareersTest(), onClose();
      },
      body: /* @__PURE__ */ jsx5(noProfile ? NoProfileBody : TimeTakenBody, {})
    }
  );
};

// app/root.tsx
import { jsx as jsx6, jsxs as jsxs5 } from "react/jsx-runtime";
var meta = () => [{ title: "Career26" }, { name: "description", content: "Discover your perfect career!" }], loader = async () => ({
  userPoolId: process?.env?.PROD_USER_POOL,
  userPoolWebClientId: process?.env?.PROD_CLIENT_ID
}), links = () => [
  ...cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []
];
function App() {
  let { userPoolWebClientId, userPoolId } = useLoaderData();
  return Amplify.configure({
    Auth: {
      region: "eu-west-1",
      userPoolId,
      userPoolWebClientId
    }
  }), /* @__PURE__ */ jsxs5("html", { lang: "en", children: [
    /* @__PURE__ */ jsxs5("head", { children: [
      /* @__PURE__ */ jsx6("meta", { charSet: "utf-8" }),
      /* @__PURE__ */ jsx6("meta", { name: "viewport", content: "width=device-width,initial-scale=1" }),
      /* @__PURE__ */ jsx6(Meta, {}),
      /* @__PURE__ */ jsx6(Links, {}),
      /* @__PURE__ */ jsx6(ColorSchemeScript, {})
    ] }),
    /* @__PURE__ */ jsx6("body", { children: /* @__PURE__ */ jsx6(Provider, { store, children: /* @__PURE__ */ jsx6(Authenticator.Provider, { children: /* @__PURE__ */ jsxs5(
      MantineProvider,
      {
        theme: {
          breakpoints: {
            xs: "30em",
            sm: "48em",
            md: "64em",
            lg: "74em",
            xl: "90em"
          },
          primaryColor: "navy",
          primaryShade: 5,
          colors: {
            navy: [
              "#f1f7ff",
              "#7e9bcd",
              "#7595c7",
              "#6c8ec1",
              "#0d3978",
              "#0b356e",
              "#093364",
              "#07305a",
              "#052d50",
              "#042a4a"
            ]
          }
        },
        children: [
          /* @__PURE__ */ jsx6(Notifications, {}),
          /* @__PURE__ */ jsx6(Outlet, {}),
          /* @__PURE__ */ jsx6(ScrollRestoration, {}),
          /* @__PURE__ */ jsx6(Scripts, {}),
          /* @__PURE__ */ jsx6(LiveReload, {}),
          /* @__PURE__ */ jsx6(FeedbackModal, {}),
          /* @__PURE__ */ jsx6(CareerTestModal, {})
        ]
      }
    ) }) }) })
  ] });
}

// app/routes/career-test.tsx
var career_test_exports = {};
__export(career_test_exports, {
  default: () => career_test_default
});
import { useEffect as useEffect9, useMemo as useMemo7, useState as useState6 } from "react";
import { Container as Container8, Group as Group9, Button as Button6, Stepper } from "@mantine/core";
import { notifications as notifications3 } from "@mantine/notifications";

// app/shared/constants/formConstants.ts
import { IconCurrencyDollar, IconCurrencyPound, IconCurrencyYen } from "@tabler/icons-react";

// app/datatypes/profile.ts
var WorkStyle = /* @__PURE__ */ ((WorkStyle2) => (WorkStyle2["I prefer working in a team"] = "TEAM", WorkStyle2["I prefer working independently"] = "INDEPENDENT", WorkStyle2["I have no preference"] = "BOTH", WorkStyle2))(WorkStyle || {}), WorkValue = /* @__PURE__ */ ((WorkValue2) => (WorkValue2["Higher salary"] = "SALARY", WorkValue2["Work-life balance"] = "BALANCE", WorkValue2["I have no preference"] = "ANY", WorkValue2))(WorkValue || {}), ExperienceType = /* @__PURE__ */ ((ExperienceType2) => (ExperienceType2.Company = "COMPANY", ExperienceType2.Project = "PROJECT", ExperienceType2.Society = "SOCIETY", ExperienceType2.Volunteering = "VOLUNTEERING", ExperienceType2.Other = "OTHER", ExperienceType2))(ExperienceType || {}), YesNoPreferNotToSay = /* @__PURE__ */ ((YesNoPreferNotToSay2) => (YesNoPreferNotToSay2.Yes = "YES", YesNoPreferNotToSay2.No = "NO", YesNoPreferNotToSay2["Prefer not to say"] = "PREFER_NOT_TO_SAY", YesNoPreferNotToSay2))(YesNoPreferNotToSay || {}), SchoolType = /* @__PURE__ */ ((SchoolType2) => (SchoolType2["State-funded"] = "STATE", SchoolType2["State-funded grammar/selective"] = "GRAMMAR", SchoolType2["Independent/private school (fee paying)"] = "INDEPENDENT", SchoolType2["Prefer not to say"] = "PREFER_NOT_TO_SAY", SchoolType2))(SchoolType || {}), Ethnicity = /* @__PURE__ */ ((Ethnicity2) => (Ethnicity2.White = "WHITE", Ethnicity2["Black, Black British, Carribbean or African"] = "BLACK", Ethnicity2["Asian or Asian British"] = "ASIAN", Ethnicity2["Mixed or multiple ethnic groups"] = "MIXED", Ethnicity2["Other ethnic group"] = "OTHER", Ethnicity2["Prefer not to say"] = "PREFER_NOT_TO_SAY", Ethnicity2))(Ethnicity || {}), Gender = /* @__PURE__ */ ((Gender2) => (Gender2.Male = "MALE", Gender2.Female = "FEMALE", Gender2["Non-binary"] = "NON_BINARY", Gender2.Other = "OTHER", Gender2["Prefer not to say"] = "PREFER_NOT_TO_SAY", Gender2))(Gender || {});

// app/shared/constants/formConstants.ts
var exampleCities = [
  {
    value: "London",
    label: "London",
    baseCurrency: "GBP",
    Icon: IconCurrencyPound
  },
  {
    value: "New York",
    label: "New York",
    baseCurrency: "USD",
    Icon: IconCurrencyDollar
  },
  {
    value: "Tokyo",
    label: "Tokyo",
    baseCurrency: "JPY",
    Icon: IconCurrencyYen
  },
  {
    value: "Sydney",
    label: "Sydney",
    baseCurrency: "AUD",
    Icon: IconCurrencyDollar
  },
  {
    value: "Hong Kong",
    label: "Hong Kong",
    baseCurrency: "HKD",
    Icon: IconCurrencyDollar
  },
  {
    value: "Shanghai",
    label: "Shanghai",
    baseCurrency: "RMB",
    Icon: IconCurrencyYen
  }
], exampleAreasOfInterest = [
  "Finance",
  "Business",
  "Law",
  "Consulting",
  "Education",
  "Technology",
  "Healthcare",
  "Charity",
  "Art and Creative Work",
  "Politics",
  "Public Services",
  "Academia / Research"
], experienceOptions = Object.entries(ExperienceType).map(([label, value]) => ({
  label,
  value
})), workStyleOptions = Object.entries(WorkStyle).map(([label, value]) => ({
  label,
  value
})), workLifeOptions = Object.entries(WorkValue).map(([label, value]) => ({
  label,
  value
})), ratingOptions = [
  "I hated it",
  "I disliked it",
  "I neither liked or disliked it",
  "I liked it",
  "I loved it"
], ukDegreeGrades = [
  "First Class (1st)",
  "Second Class Upper (2:1)",
  "Second Class Lower (2:2)",
  "Third Class (3rd)"
], usDegreeGrades = [
  "GPA 3.8 - 4.0",
  "GPA 3.3 - 3.7",
  "GPA 2.7 - 3.2",
  "GPA 2.0 - 2.6",
  "GPA 1.0 - 1.9"
], otherGrades = ["Distinction", "Merit", "Pass", "N/A"], degreeLevels = ["PhD", "MSc", "MA", "BSc", "BA", "MEng", "BEng"], degreeOptions = [
  { group: "UK Grading", items: ukDegreeGrades },
  { group: "US Grading", items: usDegreeGrades },
  { group: "Other", items: otherGrades }
], initialUniversityValues = {
  grade: "",
  level: "",
  name: "",
  university: "",
  rating: "",
  ratingReason: ""
}, initialWorkExperienceValues = {
  experienceName: "",
  experienceType: "COMPANY" /* Company */,
  rating: "",
  ratingReason: "",
  role: ""
}, initialProfileValues = {
  additionalDegrees: [],
  areasOfInterest: [],
  expectedSalary: {
    baseCurrency: "GBP",
    city: "London",
    expectedSalary: 4e4
  },
  personalityType: {
    workValue: "SALARY" /* Higher salary */,
    workStyle: "INDEPENDENT" /* I prefer working independently */
  },
  latestDegree: initialUniversityValues,
  previousWorkExperience: [initialWorkExperienceValues],
  diversity: {
    firstGeneration: void 0,
    schoolType: void 0,
    ethnicity: void 0,
    gender: void 0,
    age: void 0
  }
}, careerLoadingText = [
  "Generating your personalised career suggestions...",
  "This may take up to 30 seconds...",
  "You're almost there..."
];

// app/shared/hooks/useCareerTestStorage.ts
var baseKey = "careerTest", initialStoredValues = {
  step: 0 /* EDUCATION */,
  formValues: initialProfileValues
}, useCareerTestStorage = () => {
  let getValues = () => {
    if (typeof localStorage > "u")
      return initialStoredValues;
    let storedValues = localStorage.getItem(baseKey);
    return storedValues ? JSON.parse(storedValues) : initialStoredValues;
  }, storeTestValues = ({
    key,
    value
  }) => {
    if (typeof localStorage > "u")
      return;
    let newValues = { ...getValues(), [key]: value };
    localStorage.setItem(baseKey, JSON.stringify(newValues));
  };
  return {
    resetValues: () => {
      typeof localStorage > "u" || localStorage.setItem(baseKey, JSON.stringify(initialStoredValues));
    },
    storeTestValues,
    setupFormValues: ({ profile, careerPaths }) => {
      storeTestValues({ key: "formValues", value: profile }), storeTestValues({ key: "careerPaths", value: careerPaths }), storeTestValues({ key: "step", value: 5 /* COMPLETE */ });
    },
    careerTestStorage: getValues()
  };
};

// app/shared/hooks/useAuthUser.ts
import { useAuthenticator } from "@aws-amplify/ui-react";
import { Auth as Auth2 } from "aws-amplify";
import { useEffect as useEffect3, useState as useState2 } from "react";
import { notifications } from "@mantine/notifications";
var useAuthUser = () => {
  let [loading, setLoading] = useState2(!1), dispatch = useAppDispatch(), { goToHomepage } = usePageNavigation(), { open, associateProfileId } = useAppSelector(selectLoginModal), { resetValues } = useCareerTestStorage(), { signOut, user, authStatus } = useAuthenticator((context) => [context.route]), authenticated = authStatus === "authenticated", unauthenticated = authStatus === "unauthenticated";
  return useEffect3(() => {
    authenticated && open && !associateProfileId && dispatch(setLoginModal({ open: !1 }));
  }, [authenticated, open, associateProfileId]), {
    loading: loading || authStatus === "configuring",
    unauthenticated,
    authenticated,
    user,
    signOut,
    updateUserAttributes: async (attributes) => {
      setLoading(!0);
      try {
        let authUser = await Auth2.currentAuthenticatedUser();
        await Auth2.updateUserAttributes(authUser, attributes), notifications.show({
          title: "Updated Account",
          message: "Successfully updated profile details",
          color: "green"
        });
      } catch (error) {
        console.error(`update account error - ${error}`), notifications.show({
          title: "Update Failed",
          message: "Could not update profile details",
          color: "red"
        });
      }
      setLoading(!1);
    },
    deleteAccount: async () => {
      setLoading(!0);
      try {
        await Auth2.deleteUser(), notifications.show({
          title: "Deleted Account",
          message: "Successfully deleted profile",
          color: "green"
        }), resetValues(), goToHomepage(), dispatch(resetSession());
      } catch (error) {
        console.error(`delete account error - ${error}`), notifications.show({
          title: "Delete Failed",
          message: "Could not delete profile",
          color: "red"
        });
      }
      setLoading(!1);
    }
  };
};

// app/shared/hooks/useMobileStyles.ts
import { em } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
var useMobileStyles = () => ({
  isMobile: useMediaQuery(`(max-width: ${em(750)})`),
  mobileWidth: "sm"
});

// app/shared/hooks/useAssociate.ts
import { notifications as notifications2 } from "@mantine/notifications";
var useAssociate = () => {
  let [associateProfileQuery, { isFetching }] = useLazyAssociateProfileQuery(), { goToHomepage } = usePageNavigation();
  return { associateProfile: async (profileId, onSuccess) => {
    try {
      await associateProfileQuery(profileId), notifications2.show({
        title: "Created Account",
        message: "Successfully created account",
        color: "green"
      }), onSuccess?.(), goToHomepage(), window?.location?.reload();
    } catch (error) {
      console.error(`associate account error - ${error}`);
    }
  }, loading: isFetching };
};

// app/features/careerTest/useCareerTestForm.ts
import { useMemo as useMemo4 } from "react";
import { FORM_INDEX, useForm as useForm2 } from "@mantine/form";
var useCareerTestForm = ({ activeStep }) => {
  let {
    careerTestStorage: { formValues }
  } = useCareerTestStorage(), fieldsToCheck = useMemo4(() => {
    if (activeStep === 0 /* EDUCATION */)
      return ["latestDegree", "additionalDegrees", `additionalDegrees.${FORM_INDEX}`];
    if (activeStep === 1 /* WORK_EXPERIENCE */)
      return ["previousWorkExperience", `previousWorkExperience.${FORM_INDEX}`];
    if (activeStep === 2 /* PREFERENCES */)
      return ["areasOfInterest", "expectedSalary"];
  }, [activeStep]), form = useForm2({
    initialValues: formValues,
    validateInputOnChange: !0,
    validate: {
      latestDegree: {
        name: (value) => !value && "Course name is required",
        university: (value) => !value && "University is required",
        grade: (value) => !value && "Grade is required",
        level: (value) => !value && "Level is required",
        rating: (value) => !value && "Rating is required",
        ratingReason: (value) => value ? value.length > 500 ? "Maximum character length is 300" : null : "You must provide a reason for the rating"
      },
      additionalDegrees: {
        name: (value) => !value && "Course name is required",
        university: (value) => !value && "University is required"
      },
      previousWorkExperience: {
        role: (value) => !value && "Role is required",
        experienceName: (value) => !value && "Experience name is required",
        experienceType: (value) => !value && "Experience type is required",
        ratingReason: (value) => value ? value.length > 500 ? "Maximum character length is 300" : null : "You must provide a reason for the rating",
        rating: (value) => !value && "Rating is required"
      },
      areasOfInterest: (value) => value.length ? value.length > 3 ? "You can only choose up to three areas of interest" : null : "You must select at least one area of interest",
      personalityType: {
        workValue: (value) => !value && "You must provide a preferred career value",
        workStyle: (value) => !value && "You must provide a preferred work style"
      },
      expectedSalary: {
        expectedSalary: (value) => value ? Number.isNaN(value) ? "Expected starting salary must be a number" : value < 0 ? "Expected starting salary cannot be negative" : null : "Expected starting salary is required"
      }
    }
  });
  return { form, checkFormIsValid: () => (form.validate(), !fieldsToCheck?.some((field) => !form.isValid(field))) };
};

// app/shared/components/shell/Shell.tsx
import { useMemo as useMemo5 } from "react";
import { AppShell, ScrollArea, rem } from "@mantine/core";
import classNames4 from "classnames";

// app/shared/components/pageHeader/PageHeader.tsx
import { Image } from "@mantine/core";

// app/assets/career26.png
var career26_default = "/build/_assets/career26-JWGB2ETL.png";

// app/assets/logo.png
var logo_default = "/build/_assets/logo-PZNEHA2E.png";

// app/shared/components/account/LoginModal.tsx
import { Authenticator as Authenticator2, useAuthenticator as useAuthenticator2 } from "@aws-amplify/ui-react";
import { useEffect as useEffect4 } from "react";
import { Modal as Modal2, Text as Text6 } from "@mantine/core";
import classNames from "classnames";

// app/shared/components/account/SignUpBenefits.tsx
import { List, Text as Text5 } from "@mantine/core";
import {
  IconChecklist,
  IconWorldSearch,
  IconCertificate,
  IconUsersGroup
} from "@tabler/icons-react";

// app/shared/components/display/TextWithIconBlock.tsx
import { Group as Group3, Text as Text4 } from "@mantine/core";

// app/shared/styles/commonStyles.module.css
var commonStyles_module_default = { hoverItem: "-Y36r", row: "K9Cbf", lightNavyBg: "DYb4P", navyBg: "vp5O5", disabled: "Np3s2", navTile: "_4SCNd", spaceBetweenRow: "-SR4M", mobileNavbar: "_9-kUN" };

// app/shared/components/display/TextWithIconBlock.tsx
import { jsx as jsx7, jsxs as jsxs6 } from "react/jsx-runtime";
var TextWithIconBlock = ({ title, content, Icon }) => {
  let { isMobile } = useMobileStyles();
  return /* @__PURE__ */ jsxs6("div", { children: [
    /* @__PURE__ */ jsxs6(Group3, { className: commonStyles_module_default.row, children: [
      Icon,
      /* @__PURE__ */ jsx7(Text4, { fw: 800, size: isMobile ? "1rem" : "1.5rem", py: "md", children: title })
    ] }),
    content
  ] });
};

// app/shared/components/account/account.module.css
var account_module_default = { signUpButtonSetRight: "_1Of4n", loginContainer: "Fc7dH", listContent: "_5EsBi", signUpHeaderMobile: "_3zlC8", authenticatorFields: "y4lS2", signUpContainer: "-JfqL", signUpHeader: "npY6v" };

// app/shared/components/account/SignUpBenefits.tsx
import { jsx as jsx8 } from "react/jsx-runtime";
var benefits = [
  {
    title: "Industry Insights",
    content: "View industry-specific guidance based on your Career26 Test result",
    Icon: IconWorldSearch
  },
  {
    title: "Interactive Interviews",
    content: "Access our interview question bank and get real-time feedback",
    Icon: IconCertificate
  },
  {
    title: "CV Building Tools",
    content: "Build your CV in 5 minutes with tailored and refined content",
    Icon: IconChecklist
  },
  {
    title: "Global Mentor Network",
    content: "Match with mentors who have similar backgrounds and career goals",
    Icon: IconUsersGroup
  }
], SignUpBenefits = () => /* @__PURE__ */ jsx8(List, { size: "md", center: !0, children: benefits.map(
  ({ title, content, Icon }) => /* @__PURE__ */ jsx8(
    TextWithIconBlock,
    {
      title,
      content: /* @__PURE__ */ jsx8(Text5, { className: account_module_default.listContent, children: content }),
      Icon: /* @__PURE__ */ jsx8(Icon, {})
    },
    `benefit-${title}`
  )
) });

// app/shared/components/account/LoginModal.tsx
import { Fragment as Fragment3, jsx as jsx9, jsxs as jsxs7 } from "react/jsx-runtime";
var GetAccessTo = () => /* @__PURE__ */ jsx9(Text6, { fw: "bold", size: "2.5rem", py: "sm", children: "Get access to" }), SignUpNow = () => /* @__PURE__ */ jsx9(Text6, { fw: "bold", size: "2.5rem", c: "navy", py: "md", children: "Sign up now" }), SignUpHeader = () => {
  let { isMobile } = useMobileStyles();
  return isMobile ? /* @__PURE__ */ jsx9("div", { className: account_module_default.signUpHeaderMobile, children: /* @__PURE__ */ jsx9(GetAccessTo, {}) }) : /* @__PURE__ */ jsx9("div", { className: classNames(commonStyles_module_default.row, account_module_default.signUpHeader), children: isMobile ? /* @__PURE__ */ jsx9(GetAccessTo, {}) : /* @__PURE__ */ jsxs7(Fragment3, { children: [
    /* @__PURE__ */ jsx9(GetAccessTo, {}),
    /* @__PURE__ */ jsx9(SignUpNow, {})
  ] }) });
}, SignUpForm = () => {
  let { isMobile } = useMobileStyles();
  return isMobile ? /* @__PURE__ */ jsxs7(Fragment3, { children: [
    /* @__PURE__ */ jsx9(SignUpBenefits, {}),
    /* @__PURE__ */ jsx9(SignUpNow, {}),
    /* @__PURE__ */ jsx9("div", { className: account_module_default.authenticatorFields, children: /* @__PURE__ */ jsx9(Authenticator2.SignUp.FormFields, {}) })
  ] }) : /* @__PURE__ */ jsxs7("div", { className: classNames(commonStyles_module_default.row, account_module_default.signUpContainer, account_module_default.signUpHeader), children: [
    /* @__PURE__ */ jsx9(SignUpBenefits, {}),
    /* @__PURE__ */ jsxs7("div", { children: [
      /* @__PURE__ */ jsx9(Authenticator2.SignUp.Header, {}),
      /* @__PURE__ */ jsx9("div", { className: account_module_default.authenticatorFields, children: /* @__PURE__ */ jsx9(Authenticator2.SignUp.FormFields, {}) })
    ] })
  ] });
}, formFields = {
  signUp: {
    name: {
      order: 1,
      label: "Name",
      isRequired: !0,
      placeholder: "Enter your Name"
    },
    email: {
      order: 3,
      isRequired: !0
    },
    password: {
      order: 4,
      isRequired: !0
    },
    confirm_password: {
      order: 5,
      isRequired: !0
    }
  }
}, components = {
  SignUp: {
    FormFields: SignUpForm,
    Header: SignUpHeader
  }
}, LoginModal = () => {
  let { isMobile } = useMobileStyles(), { route } = useAuthenticator2((context) => [context.route]), dispatch = useAppDispatch(), { open, initialState, associateProfileId } = useAppSelector(selectLoginModal), { authenticated } = useAuthUser(), { associateProfile } = useAssociate(), onClose = () => {
    dispatch(setLoginModal({ open: !1 }));
  };
  return useEffect4(() => {
    associateProfileId && authenticated && associateProfile(associateProfileId, onClose);
  }, [authenticated, associateProfileId]), /* @__PURE__ */ jsx9(
    Modal2,
    {
      onClose,
      opened: open,
      withCloseButton: !1,
      centered: !0,
      radius: 10,
      size: route === "signUp" ? "100%" : void 0,
      className: classNames(account_module_default.loginContainer, {
        [account_module_default.signUpButtonSetRight]: !isMobile
      }),
      children: /* @__PURE__ */ jsx9(
        Authenticator2,
        {
          initialState,
          formFields,
          loginMechanisms: ["email"],
          components,
          signUpAttributes: ["email", "name", "gender"]
        }
      )
    }
  );
};

// app/shared/components/burgerMenu/BurgerMenu.tsx
import { Menu, Burger } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { jsx as jsx10, jsxs as jsxs8 } from "react/jsx-runtime";
var BurgerMenu = ({ menu, testId }) => {
  let [opened, { toggle }] = useDisclosure();
  return /* @__PURE__ */ jsxs8(Menu, { width: 300, "data-testid": testId, opened, onChange: toggle, children: [
    /* @__PURE__ */ jsx10(Menu.Target, { children: /* @__PURE__ */ jsx10(Burger, { opened, onClick: toggle }) }),
    /* @__PURE__ */ jsx10(Menu.Dropdown, { children: menu })
  ] });
};

// app/shared/components/pageHeader/CareerNavigation.tsx
import { IconHeart } from "@tabler/icons-react";
import { ActionIcon, Combobox, InputBase, Text as Text7, useCombobox } from "@mantine/core";

// app/shared/hooks/useCareerSelection.ts
import { useEffect as useEffect5, useState as useState3 } from "react";
var getSelectedCareers = (careerPaths) => Object.entries(careerPaths || {}).reduce(
  (agg, [careerId, { selected }]) => selected ? { ...agg, [careerId]: !0 } : agg,
  {}
), useCareerSelection = () => {
  let [selectCareer] = useSelectCareerMutation(), [loadingCareers, setLoadingCareers] = useState3({}), {
    storeTestValues,
    careerTestStorage: { careerPaths }
  } = useCareerTestStorage(), [selectedCareers, setSelectedCareers] = useState3(getSelectedCareers(careerPaths)), handleSelection = async ({
    careerIdentifier,
    profileIdentifier,
    selected
  }) => {
    let { error } = await selectCareer({
      careerIdentifier,
      profileIdentifier,
      selected
    });
    if (error) {
      console.error(`select endpoint did not return data, response: ${error}`);
      return;
    }
    setSelectedCareers((prevSelectedCareers) => ({
      ...prevSelectedCareers,
      [careerIdentifier]: selected
    }));
  }, toggleSelectedCareer = async ({
    careerIdentifier,
    profileIdentifier,
    selected
  }) => {
    !careerPaths || !profileIdentifier || (setLoadingCareers((prevLoadingCareers) => ({
      ...prevLoadingCareers,
      [careerIdentifier]: !0
    })), await handleSelection({ careerIdentifier, profileIdentifier, selected }), setLoadingCareers((prevLoadingCareers) => ({
      ...prevLoadingCareers,
      [careerIdentifier]: !1
    })));
  };
  return useEffect5(() => {
    if (!careerPaths)
      return;
    let newCareerPaths = Object.entries(careerPaths).reduce(
      (agg, [careerId, careerPath]) => ({
        ...agg,
        [careerId]: { ...careerPath, selected: !!selectedCareers[careerId] }
      }),
      {}
    );
    storeTestValues({ key: "careerPaths", value: newCareerPaths });
  }, [selectedCareers]), { toggleSelectedCareer, selectedCareers, loadingCareers };
};

// app/shared/components/pageHeader/pageHeader.module.css
var pageHeader_module_default = { logo: "kowfJ", logoMobile: "Fo40N", container: "kYxdZ", chevron: "_3kljR", avatars: "GYNuo", navCenter: "CGv0y", headerContainer: "QacAH" };

// app/shared/components/pageHeader/CareerNavigation.tsx
import { jsx as jsx11, jsxs as jsxs9 } from "react/jsx-runtime";
var CareerNavigation = () => {
  let { isMobile } = useMobileStyles(), combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption()
  }), { toggleCareerId, showNavigation } = usePageNavigation(), selectedCareerPath = useAppSelector(selectSelectedCareerPath), profileIdentifier = useAppSelector(selectProfileId), {
    careerTestStorage: { careerPaths }
  } = useCareerTestStorage(), { loadingCareers, selectedCareers, toggleSelectedCareer } = useCareerSelection();
  if (!careerPaths || !showNavigation || !selectedCareerPath)
    return null;
  let onSelect = (careerIdentifier) => {
    toggleCareerId(careerIdentifier), combobox.closeDropdown();
  }, options = Object.entries(careerPaths).map(([careerIdentifier, { title }]) => {
    let selected = selectedCareers[careerIdentifier];
    return /* @__PURE__ */ jsxs9(
      Combobox.Option,
      {
        value: careerIdentifier,
        className: commonStyles_module_default.spaceBetweenRow,
        w: "100%",
        p: "sm",
        id: "dave",
        onClick: (e) => {
          e.target.textContent && onSelect(careerIdentifier);
        },
        children: [
          /* @__PURE__ */ jsx11(Text7, { children: title }),
          /* @__PURE__ */ jsx11(
            ActionIcon,
            {
              "aria-label": `favourite-icon-${careerIdentifier}`,
              loading: loadingCareers[careerIdentifier],
              variant: "transparent",
              id: "select",
              onClick: () => toggleSelectedCareer({
                selected: !selected,
                careerIdentifier,
                profileIdentifier
              }),
              children: /* @__PURE__ */ jsx11(
                IconHeart,
                {
                  size: 30,
                  fill: selected ? "red" : "transparent",
                  color: selected ? "red" : "navy"
                }
              )
            }
          )
        ]
      },
      `household-${careerIdentifier}`
    );
  });
  return /* @__PURE__ */ jsxs9(Combobox, { store: combobox, children: [
    /* @__PURE__ */ jsx11(Combobox.Target, { children: /* @__PURE__ */ jsx11(
      InputBase,
      {
        w: isMobile ? "100%" : "50%",
        component: "button",
        px: "xs",
        pointer: !0,
        rightSection: /* @__PURE__ */ jsx11(
          ActionIcon,
          {
            onClick: () => combobox.toggleDropdown(),
            color: "none",
            className: pageHeader_module_default.chevron,
            children: /* @__PURE__ */ jsx11(Combobox.Chevron, { color: "none" })
          }
        ),
        onClick: () => combobox.toggleDropdown(),
        children: /* @__PURE__ */ jsx11(Text7, { children: selectedCareerPath?.title })
      }
    ) }),
    /* @__PURE__ */ jsx11(Combobox.Dropdown, { children: /* @__PURE__ */ jsx11(Combobox.Options, { children: options }) })
  ] });
};

// app/shared/components/pageHeader/IconButtons.tsx
import { Button as Button2, Avatar as Avatar2, Menu as Menu2 } from "@mantine/core";
import { IconLogout, IconSettings } from "@tabler/icons-react";
import classNames3 from "classnames";

// app/shared/components/pageHeader/NavigationCenter.tsx
import { useEffect as useEffect6 } from "react";
import { useDisclosure as useDisclosure2 } from "@mantine/hooks";
import { Modal as Modal3, Grid as Grid2, Paper, Container as Container2, Avatar, Text as Text8 } from "@mantine/core";
import { IconLayoutDashboard } from "@tabler/icons-react";
import classNames2 from "classnames";

// app/shared/constants/featureConstants.ts
import {
  IconCertificate as IconCertificate2,
  IconChecklist as IconChecklist2,
  IconReportSearch,
  IconUsersGroup as IconUsersGroup2,
  IconWorldSearch as IconWorldSearch2
} from "@tabler/icons-react";
var featureTiles = [
  {
    title: "Career Test",
    description: "Take our career test and view your career path results",
    Icon: IconReportSearch,
    link: urls.careersTest
  },
  {
    title: "Industry Insights",
    description: "Explore industry insights and discover the potential of your careers",
    Icon: IconWorldSearch2,
    link: urls.overview
  },
  {
    title: "Interview Questions",
    description: "Practice interview questions and get instant feedback with our interactive assessor",
    Icon: IconCertificate2,
    link: urls.questions
  },
  {
    title: "Mentor Network",
    description: "Connect with professionals in your industry",
    Icon: IconUsersGroup2,
    link: urls.mentors,
    disabled: !0
  },
  {
    title: "CV Builder",
    description: "Create and refine your CV for your new industry",
    Icon: IconChecklist2,
    link: urls.mentors,
    disabled: !0
  }
];

// app/shared/components/pageHeader/NavigationCenter.tsx
import { Fragment as Fragment4, jsx as jsx12, jsxs as jsxs10 } from "react/jsx-runtime";
var NavigationCenter = () => {
  let [opened, { open, close }] = useDisclosure2(!1), navigate = useNavigate(), { isMobile } = useMobileStyles(), { currentPathname } = usePageNavigation();
  return useEffect6(() => {
    close();
  }, [currentPathname]), /* @__PURE__ */ jsxs10(Fragment4, { children: [
    /* @__PURE__ */ jsx12(
      Avatar,
      {
        radius: "xl",
        onClick: open,
        className: classNames2(commonStyles_module_default.hoverItem, commonStyles_module_default.navyBg),
        color: "white",
        "aria-label": "navigation-center",
        children: /* @__PURE__ */ jsx12(IconLayoutDashboard, {})
      }
    ),
    /* @__PURE__ */ jsx12(
      Modal3,
      {
        opened,
        onClose: close,
        centered: !0,
        withCloseButton: !1,
        size: "md",
        overlayProps: { blur: 3 },
        radius: "lg",
        children: /* @__PURE__ */ jsx12(Container2, { children: /* @__PURE__ */ jsx12(Grid2, { py: "sm", children: featureTiles.map(
          ({ title, Icon, disabled, link }) => /* @__PURE__ */ jsx12(Grid2.Col, { span: 6, className: pageHeader_module_default.navCenter, children: /* @__PURE__ */ jsx12(
            Paper,
            {
              onClick: () => !disabled && navigate(link),
              withBorder: !0,
              p: "md",
              h: 150,
              w: "100%",
              radius: "xm",
              display: "flex",
              className: classNames2(
                commonStyles_module_default.lightNavyBg,
                commonStyles_module_default.hoverItem,
                commonStyles_module_default.navTile,
                {
                  [commonStyles_module_default.disabled]: disabled
                }
              ),
              children: /* @__PURE__ */ jsxs10("div", { children: [
                /* @__PURE__ */ jsx12(Icon, { size: isMobile ? 70 : 100 }),
                /* @__PURE__ */ jsx12(Text8, { size: "sm", children: title })
              ] })
            }
          ) }, title)
        ) }) })
      }
    )
  ] });
};

// app/shared/components/pageHeader/IconButtons.tsx
import { jsx as jsx13, jsxs as jsxs11 } from "react/jsx-runtime";
var IconButtons = ({ signOut, authenticated }) => {
  let dispatch = useAppDispatch(), { isMobile } = useMobileStyles(), { goToSettings } = usePageNavigation(), clickLogin = (initialState) => {
    dispatch(setLoginModal({ open: !0, initialState }));
  }, buttonSize = isMobile ? "xs" : void 0;
  return authenticated ? /* @__PURE__ */ jsxs11("div", { className: pageHeader_module_default.avatars, children: [
    /* @__PURE__ */ jsx13(NavigationCenter, {}),
    /* @__PURE__ */ jsxs11(Menu2, { width: 200, "data-testid": "user-menu", children: [
      /* @__PURE__ */ jsx13(Menu2.Target, { children: /* @__PURE__ */ jsx13(
        Avatar2,
        {
          radius: "xl",
          className: classNames3(commonStyles_module_default.hoverItem, commonStyles_module_default.navyBg),
          color: "white"
        }
      ) }),
      /* @__PURE__ */ jsxs11(Menu2.Dropdown, { children: [
        /* @__PURE__ */ jsx13(Menu2.Label, { children: "Session" }),
        /* @__PURE__ */ jsx13(Menu2.Item, { onClick: signOut, leftSection: /* @__PURE__ */ jsx13(IconLogout, {}), children: "Logout" }),
        /* @__PURE__ */ jsx13(Menu2.Item, { onClick: goToSettings, leftSection: /* @__PURE__ */ jsx13(IconSettings, {}), children: "Account Settings" })
      ] })
    ] })
  ] }) : /* @__PURE__ */ jsxs11("div", { className: pageHeader_module_default.avatars, children: [
    /* @__PURE__ */ jsx13(Button2, { size: buttonSize, variant: "outline", onClick: () => clickLogin("signIn"), children: "Login" }),
    /* @__PURE__ */ jsx13(Button2, { size: buttonSize, onClick: () => clickLogin("signUp"), children: "Sign Up" })
  ] });
};

// app/shared/components/pageHeader/PageHeader.tsx
import { jsx as jsx14, jsxs as jsxs12 } from "react/jsx-runtime";
var PageHeader = ({
  signOut,
  authenticated,
  menu
}) => {
  let { isMobile } = useMobileStyles(), { goToHomepage } = usePageNavigation();
  return /* @__PURE__ */ jsxs12("div", { className: pageHeader_module_default.headerContainer, children: [
    /* @__PURE__ */ jsx14(LoginModal, {}),
    menu && isMobile && /* @__PURE__ */ jsx14(BurgerMenu, { menu }),
    /* @__PURE__ */ jsxs12("div", { className: pageHeader_module_default.logo, children: [
      /* @__PURE__ */ jsx14(
        Image,
        {
          fit: "contain",
          src: logo_default,
          w: "auto",
          h: 25,
          onClick: goToHomepage,
          "aria-label": "logo-icon"
        }
      ),
      /* @__PURE__ */ jsx14(
        Image,
        {
          fit: "contain",
          src: career26_default,
          w: "auto",
          h: 20,
          onClick: goToHomepage,
          "aria-label": "logo-text"
        }
      )
    ] }),
    !isMobile && /* @__PURE__ */ jsx14(CareerNavigation, {}),
    /* @__PURE__ */ jsx14(IconButtons, { signOut, authenticated })
  ] });
};

// app/shared/components/pageFooter/PageFooter.tsx
import { Anchor, Text as Text9 } from "@mantine/core";
import { IconBrandLinkedin, IconMail } from "@tabler/icons-react";

// app/shared/components/pageFooter/pageFooter.module.css
var pageFooter_module_default = { right: "a2zyp", anchor: "_0ojPA", container: "HZQxY", copyright: "uFrkT" };

// app/shared/components/pageFooter/PageFooter.tsx
import { jsx as jsx15, jsxs as jsxs13 } from "react/jsx-runtime";
var subject = "Career26 - Contact Us", mailtoLink = `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}`, PageFooter = () => {
  let dispatch = useAppDispatch();
  return /* @__PURE__ */ jsxs13("div", { className: pageFooter_module_default.container, children: [
    /* @__PURE__ */ jsx15(Text9, { w: "50%", c: "navy", className: pageFooter_module_default.copyright, children: "\xA92023 Career26 Ltd" }),
    /* @__PURE__ */ jsxs13("div", { className: pageFooter_module_default.right, children: [
      /* @__PURE__ */ jsx15(
        Anchor,
        {
          className: pageFooter_module_default.anchor,
          underline: "never",
          onClick: () => dispatch(setFeedbackModal({ open: !0 })),
          size: "lg",
          children: "Feedback"
        }
      ),
      /* @__PURE__ */ jsx15(
        Anchor,
        {
          className: pageFooter_module_default.anchor,
          target: "_blank",
          size: "lg",
          onClick: () => window.open(mailtoLink),
          children: /* @__PURE__ */ jsx15(IconMail, {})
        }
      ),
      /* @__PURE__ */ jsx15(Anchor, { className: pageFooter_module_default.anchor, href: urls.linkedIn, target: "_blank", size: "lg", children: /* @__PURE__ */ jsx15(IconBrandLinkedin, {}) })
    ] })
  ] });
};

// app/shared/components/shell/shell.module.css
var shell_module_default = { fullWidthContainer: "whLQ7", careerNav: "bHRCd", footer: "_7wrN0", main: "U9EmI" };

// app/shared/components/shell/Shell.tsx
import { jsx as jsx16, jsxs as jsxs14 } from "react/jsx-runtime";
var navWidth = 200, headerHeight = rem(80), footerHeight = rem(50), NavMenu = ({ navbar }) => /* @__PURE__ */ jsx16(ScrollArea, { h: `calc(100vh - ${headerHeight} - ${footerHeight})`, children: navbar }), Shell = ({ children, navbar }) => {
  let dispatch = useAppDispatch(), { isMobile } = useMobileStyles(), { authenticated, signOut } = useAuthUser(), { resetValues } = useCareerTestStorage(), { showNavigation } = usePageNavigation(), paddingTop = useMemo5(() => isMobile ? showNavigation ? `calc(${headerHeight} + ${rem(60)})` : `calc(${headerHeight})` : headerHeight, [isMobile, showNavigation]), onSignOut = () => {
    resetValues(), dispatch(resetSession()), signOut();
  }, { paddingLeft, navbarSettings } = useMemo5(() => isMobile || !navbar ? { paddingLeft: 0, navbarSettings: void 0 } : {
    paddingLeft: navWidth,
    navbarSettings: { width: navWidth, breakpoint: "sm" }
  }, [isMobile, navbar]);
  return /* @__PURE__ */ jsxs14(
    AppShell,
    {
      styles: {
        main: {
          backgroundColor: "var(--mantine-color-gray-0)",
          height: "100%",
          paddingRight: "0",
          paddingLeft,
          paddingTop
        }
      },
      header: { height: headerHeight },
      navbar: navbarSettings,
      footer: { height: footerHeight },
      children: [
        /* @__PURE__ */ jsx16(AppShell.Header, { className: shell_module_default.fullWidthContainer, children: /* @__PURE__ */ jsx16(
          PageHeader,
          {
            authenticated,
            signOut: onSignOut,
            menu: navbar && /* @__PURE__ */ jsx16(NavMenu, { navbar })
          }
        ) }),
        navbar && !isMobile && /* @__PURE__ */ jsx16(AppShell.Navbar, { display: "flex", w: 200, children: /* @__PURE__ */ jsx16(AppShell.Section, { children: /* @__PURE__ */ jsx16(NavMenu, { navbar }) }) }),
        isMobile && showNavigation && /* @__PURE__ */ jsx16("div", { className: shell_module_default.careerNav, style: { top: headerHeight }, children: /* @__PURE__ */ jsx16(CareerNavigation, {}) }),
        /* @__PURE__ */ jsx16(AppShell.Main, { className: shell_module_default.main, children }),
        /* @__PURE__ */ jsx16(AppShell.Footer, { className: classNames4(shell_module_default.fullWidthContainer, shell_module_default.footer), children: /* @__PURE__ */ jsx16(PageFooter, {}) })
      ]
    }
  );
};

// app/shared/components/loadingScreen/LoaderWithText.tsx
import { Loader } from "@mantine/core";

// app/shared/components/loadingScreen/TypeWriter.tsx
import { useEffect as useEffect7, useState as useState4 } from "react";

// app/shared/components/loadingScreen/loadingScreen.module.css
var loadingScreen_module_default = { container: "bX2kA", typeWriter: "WD9uC", loader: "KwjoB", lensContainer: "Aw9L6", logoContainer: "bZRQh", logo: "APYxI", title: "RUrsC", dots: "Xm-L7" };

// app/shared/components/loadingScreen/TypeWriter.tsx
import { jsx as jsx17 } from "react/jsx-runtime";
var TypeSomething = ({
  text,
  textDelay,
  repeatDelay,
  deleteDelay,
  onComplete
}) => {
  let [currentText, setCurrentText] = useState4(""), [currentIndex, setCurrentIndex] = useState4(0), [isComplete, setIsComplete] = useState4(!1);
  return useEffect7(() => {
    currentIndex === -1 && onComplete && onComplete();
  }, [currentIndex]), useEffect7(() => {
    if (currentIndex === text.length && !isComplete) {
      let timeout = setTimeout(() => {
        setIsComplete(!0);
      }, deleteDelay);
      return () => clearTimeout(timeout);
    }
    if (currentIndex < text.length && !isComplete) {
      let timeout = setTimeout(() => {
        setCurrentText((prevText) => prevText + text[currentIndex]), setCurrentIndex((prevIndex) => prevIndex + 1);
      }, textDelay);
      return () => clearTimeout(timeout);
    }
    if (currentIndex > -1) {
      let timeout = setTimeout(() => {
        setCurrentText((prevText) => prevText.slice(0, -1)), setCurrentIndex((prevIndex) => prevIndex - 1);
      }, textDelay);
      return () => clearTimeout(timeout);
    }
    if (currentIndex === -1) {
      let timeout = setTimeout(() => {
        setIsComplete(!1), setCurrentIndex(0);
      }, repeatDelay);
      return () => clearTimeout(timeout);
    }
    return () => {
    };
  }, [currentIndex, repeatDelay, textDelay, text, isComplete, deleteDelay]), /* @__PURE__ */ jsx17("span", { children: currentText });
}, TypeWriter = ({
  text,
  repeatSequence
}) => {
  let [lineIndex, setLineIndex] = useState4(0), onComplete = () => {
    lineIndex === text.length - 1 && repeatSequence ? setLineIndex(0) : setLineIndex(lineIndex + 1);
  }, selectedText = text[lineIndex];
  return /* @__PURE__ */ jsx17("div", { className: loadingScreen_module_default.container, children: selectedText && /* @__PURE__ */ jsx17("div", { className: loadingScreen_module_default.typeWriter, children: /* @__PURE__ */ jsx17("h1", { children: /* @__PURE__ */ jsx17(
    TypeSomething,
    {
      text: selectedText,
      textDelay: 40,
      repeatDelay: 1e3,
      deleteDelay: 2e3,
      onComplete
    }
  ) }) }) });
};

// app/shared/components/loadingScreen/LoaderWithText.tsx
import { jsx as jsx18, jsxs as jsxs15 } from "react/jsx-runtime";
var LoaderWithText = ({ text }) => /* @__PURE__ */ jsxs15("div", { className: loadingScreen_module_default.container, children: [
  /* @__PURE__ */ jsx18("div", { className: loadingScreen_module_default.typeWriter, children: /* @__PURE__ */ jsx18(TypeWriter, { repeatSequence: !0, text }) }),
  /* @__PURE__ */ jsx18("div", { className: loadingScreen_module_default.loader, children: /* @__PURE__ */ jsx18(Loader, { type: "dots", size: "xl" }) })
] });

// app/features/careerTest/educationForm/EducationForm.tsx
import { Group as Group6, Button as Button4, Container as Container3 } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";

// app/shared/components/forms/RemoveRowButton.tsx
import { Button as Button3, Group as Group4 } from "@mantine/core";
import { IconMinus } from "@tabler/icons-react";
import { jsx as jsx19, jsxs as jsxs16 } from "react/jsx-runtime";
var RemoveRowButton = ({ label, onClick }) => /* @__PURE__ */ jsx19(Group4, { py: "sm", children: /* @__PURE__ */ jsxs16(Button3, { leftSection: /* @__PURE__ */ jsx19(IconMinus, {}), color: "red", onClick, children: [
  "Remove ",
  label
] }) });

// app/features/careerTest/educationForm/UniversityForm.tsx
import { Select, TextInput, Textarea as Textarea2 } from "@mantine/core";

// app/shared/components/forms/FormContent.tsx
import { Card, Group as Group5, Text as Text10 } from "@mantine/core";
import { jsx as jsx20, jsxs as jsxs17 } from "react/jsx-runtime";
var FormContent = ({ title, children }) => /* @__PURE__ */ jsxs17(Card, { radius: "md", p: "md", withBorder: !0, children: [
  title && /* @__PURE__ */ jsx20(Card.Section, { withBorder: !0, inheritPadding: !0, py: "xs", bg: "navy", c: "white", children: /* @__PURE__ */ jsx20(Group5, { justify: "center", children: /* @__PURE__ */ jsx20(Text10, { fw: "bold", size: "lg", children: title }) }) }),
  children
] });

// app/features/careerTest/educationForm/UniversityForm.tsx
import { jsx as jsx21, jsxs as jsxs18 } from "react/jsx-runtime";
var UniversityForm = ({ form, baseKey: baseKey2, title }) => {
  let rating = form.getInputProps(`${baseKey2}.rating`).value, ratingReason = form.getInputProps(`${baseKey2}.ratingReason`).value;
  return /* @__PURE__ */ jsxs18(FormContent, { title, children: [
    /* @__PURE__ */ jsxs18("div", { className: commonStyles_module_default.row, children: [
      /* @__PURE__ */ jsx21(
        TextInput,
        {
          ...form.getInputProps(`${baseKey2}.university`),
          label: "University Name",
          withAsterisk: !0,
          w: "50%"
        }
      ),
      /* @__PURE__ */ jsx21(
        TextInput,
        {
          ...form.getInputProps(`${baseKey2}.name`),
          label: "Course Name",
          withAsterisk: !0,
          w: "50%"
        }
      )
    ] }),
    /* @__PURE__ */ jsxs18("div", { className: commonStyles_module_default.row, children: [
      /* @__PURE__ */ jsx21(
        Select,
        {
          ...form.getInputProps(`${baseKey2}.grade`),
          label: "Achieved/Expected Grade",
          data: degreeOptions,
          withAsterisk: !0,
          placeholder: "Select a grade",
          w: "50%",
          searchable: !0
        }
      ),
      /* @__PURE__ */ jsx21(
        Select,
        {
          ...form.getInputProps(`${baseKey2}.level`),
          label: "Degree",
          data: degreeLevels,
          withAsterisk: !0,
          searchable: !0,
          placeholder: "Select a level",
          w: "50%"
        }
      )
    ] }),
    /* @__PURE__ */ jsx21(
      Select,
      {
        ...form.getInputProps(`${baseKey2}.rating`),
        label: "Course Rating",
        data: ratingOptions,
        placeholder: "Select a rating",
        py: "xs",
        searchable: !0,
        withAsterisk: !0
      }
    ),
    /* @__PURE__ */ jsx21(
      Textarea2,
      {
        ...form.getInputProps(`${baseKey2}.ratingReason`),
        label: getRatingLabel(rating, ratingReason?.length),
        minRows: 3,
        autosize: !0,
        py: "xs",
        withAsterisk: !0
      }
    )
  ] });
};

// app/features/careerTest/careerTest.module.css
var careerTest_module_default = { workLifeCheckbox: "uu7zG", result: "zzihJ", typeWriter: "ShpDe", loader: "HDNoF", container: "O9Hqh" };

// app/features/careerTest/educationForm/EducationForm.tsx
import { jsx as jsx22, jsxs as jsxs19 } from "react/jsx-runtime";
var EducationForm = ({ form }) => {
  let additionalDegreesCount = form.values.additionalDegrees.length, onClickAddUniversity = () => {
    form.setFieldValue(
      "additionalDegrees",
      [
        ...form.values.additionalDegrees,
        initialUniversityValues
      ]
    );
  }, onClickRemoveUniversity = (key) => {
    form.setFieldValue(
      "additionalDegrees",
      form.values.additionalDegrees.filter((_degree, i) => i !== key)
    );
  };
  return /* @__PURE__ */ jsxs19(Container3, { py: "md", className: careerTest_module_default.container, children: [
    /* @__PURE__ */ jsx22(UniversityForm, { form, baseKey: "latestDegree", title: "Your Education History" }),
    [...Array(additionalDegreesCount).keys()].map((key) => {
      let baseKey2 = `additionalDegrees.${key}`;
      return /* @__PURE__ */ jsxs19("div", { children: [
        /* @__PURE__ */ jsx22(UniversityForm, { form, baseKey: baseKey2 }),
        key + 1 !== additionalDegreesCount && /* @__PURE__ */ jsx22(RemoveRowButton, { onClick: () => onClickRemoveUniversity(key), label: "University" })
      ] }, baseKey2);
    }),
    /* @__PURE__ */ jsxs19(Group6, { py: "md", justify: additionalDegreesCount ? "space-between" : "flex-end", children: [
      additionalDegreesCount && /* @__PURE__ */ jsx22(
        RemoveRowButton,
        {
          label: "University",
          onClick: () => onClickRemoveUniversity(additionalDegreesCount - 1)
        }
      ),
      /* @__PURE__ */ jsx22(Button4, { leftSection: /* @__PURE__ */ jsx22(IconPlus, {}), onClick: onClickAddUniversity, children: "Add Another University" })
    ] })
  ] });
};

// app/features/careerTest/workExperienceForm/WorkExperienceForm.tsx
import { Button as Button5, Container as Container4, Group as Group7 } from "@mantine/core";
import { IconPlus as IconPlus2 } from "@tabler/icons-react";

// app/features/careerTest/workExperienceForm/ExperienceForm.tsx
import { Select as Select2, TextInput as TextInput2, Textarea as Textarea3 } from "@mantine/core";
import { jsx as jsx23, jsxs as jsxs20 } from "react/jsx-runtime";
var getNameLabel = (experienceType) => {
  let label = experienceOptions.find((item) => item.value === experienceType)?.label;
  switch (experienceType) {
    case "VOLUNTEERING" /* Volunteering */:
      return "Organisation";
    case "OTHER" /* Other */:
    case void 0:
      return "";
    default:
      return label;
  }
}, ExperienceForm = ({ form, baseKey: baseKey2, title }) => {
  let rating = form.getInputProps(`${baseKey2}.rating`).value, ratingReason = form.getInputProps(`${baseKey2}.ratingReason`).value, experienceType = form.getInputProps(`${baseKey2}.experienceType`).value, experienceLabel = getNameLabel(experienceType);
  return /* @__PURE__ */ jsxs20(FormContent, { title, children: [
    /* @__PURE__ */ jsxs20("div", { className: commonStyles_module_default.row, children: [
      /* @__PURE__ */ jsx23(
        Select2,
        {
          ...form.getInputProps(`${baseKey2}.experienceType`),
          withAsterisk: !0,
          label: "Type",
          placeholder: "Select experience type",
          data: experienceOptions,
          w: "50%",
          searchable: !0
        }
      ),
      /* @__PURE__ */ jsx23(
        TextInput2,
        {
          ...form.getInputProps(`${baseKey2}.experienceName`),
          label: `${experienceLabel} Name`,
          withAsterisk: !0,
          py: "xs",
          w: "50%"
        }
      )
    ] }),
    /* @__PURE__ */ jsx23(TextInput2, { ...form.getInputProps(`${baseKey2}.role`), label: "Role", withAsterisk: !0 }),
    /* @__PURE__ */ jsx23(
      Select2,
      {
        ...form.getInputProps(`${baseKey2}.rating`),
        withAsterisk: !0,
        label: "What did you think of this role?",
        data: ratingOptions,
        placeholder: "Select a rating",
        py: "xs",
        searchable: !0
      }
    ),
    /* @__PURE__ */ jsx23(
      Textarea3,
      {
        ...form.getInputProps(`${baseKey2}.ratingReason`),
        label: getRatingLabel(rating, ratingReason.length),
        minRows: 3,
        autosize: !0,
        withAsterisk: !0,
        py: "xs"
      }
    )
  ] });
};

// app/features/careerTest/workExperienceForm/WorkExperienceForm.tsx
import { jsx as jsx24, jsxs as jsxs21 } from "react/jsx-runtime";
var WorkExperienceForm = ({ form }) => {
  let workExperienceCount = form.values.previousWorkExperience.length, onClickAddExperience = () => {
    form.setFieldValue(
      "previousWorkExperience",
      [
        ...form.values.previousWorkExperience,
        initialWorkExperienceValues
      ]
    );
  }, onClickRemoveExperience = (key) => {
    form.setFieldValue(
      "previousWorkExperience",
      form.values.previousWorkExperience.filter((_degree, i) => i !== key)
    );
  };
  return /* @__PURE__ */ jsxs21(Container4, { py: "md", className: careerTest_module_default.container, children: [
    [...Array(workExperienceCount).keys()].map((key) => {
      let baseKey2 = `previousWorkExperience.${key}`;
      return /* @__PURE__ */ jsxs21("div", { children: [
        /* @__PURE__ */ jsx24(
          ExperienceForm,
          {
            title: key === 0 ? "Your Previous Experience" : void 0,
            form,
            baseKey: baseKey2
          },
          baseKey2
        ),
        key > 0 && key + 1 !== workExperienceCount && /* @__PURE__ */ jsx24(RemoveRowButton, { onClick: () => onClickRemoveExperience(key), label: "Experience" })
      ] }, baseKey2);
    }),
    /* @__PURE__ */ jsxs21(Group7, { py: "md", justify: workExperienceCount > 1 ? "space-between" : "flex-end", children: [
      workExperienceCount > 1 && /* @__PURE__ */ jsx24(
        RemoveRowButton,
        {
          label: "Experience",
          onClick: () => onClickRemoveExperience(workExperienceCount - 1)
        }
      ),
      /* @__PURE__ */ jsx24(Button5, { leftSection: /* @__PURE__ */ jsx24(IconPlus2, {}), onClick: onClickAddExperience, children: "Add Another Experience" })
    ] })
  ] });
};

// app/features/careerTest/preferencesForm/PreferencesForm.tsx
import { Container as Container5 } from "@mantine/core";

// app/features/careerTest/preferencesForm/AreasofInterestForm.tsx
import { useMemo as useMemo6, useState as useState5 } from "react";
import { TagsInput } from "@mantine/core";
import { jsx as jsx25 } from "react/jsx-runtime";
var AreasOfInterestForm = ({ form }) => {
  let [input, setInput] = useState5(""), addLabel = `Add "${input}"`, options = useMemo6(
    () => input ? [...exampleAreasOfInterest, addLabel] : exampleAreasOfInterest,
    [input]
  ), onChange = (selection) => {
    let newValues = selection.reduce(
      (agg, item) => item === addLabel ? [...agg, input] : [...agg, item],
      []
    );
    form.setFieldValue("areasOfInterest", newValues), setInput("");
  };
  return /* @__PURE__ */ jsx25("div", { children: /* @__PURE__ */ jsx25(
    TagsInput,
    {
      py: "xs",
      ...form.getInputProps("areasOfInterest"),
      data: options,
      onChange,
      clearable: !0,
      onInput: ({ target: { value } }) => setInput(value),
      withAsterisk: !0,
      placeholder: "Enter interest",
      label: "Press Enter to add an interest",
      description: "Add up to 3 interests"
    }
  ) });
};

// app/features/careerTest/preferencesForm/WorkStyleForm.tsx
import { NumberInput, Select as Select3 } from "@mantine/core";
import { jsx as jsx26, jsxs as jsxs22 } from "react/jsx-runtime";
var WorkStyleForm = ({ form }) => {
  let Icon = exampleCities.find((item) => item.value === form.values.expectedSalary.city)?.Icon, onSelectCity = (value) => {
    let city = exampleCities.find((item) => item.value === value);
    city && (form.setFieldValue("expectedSalary.city", city.value), form.setFieldValue("expectedSalary.baseCurrency", city.baseCurrency));
  };
  return /* @__PURE__ */ jsxs22("div", { children: [
    /* @__PURE__ */ jsxs22("div", { className: commonStyles_module_default.row, children: [
      /* @__PURE__ */ jsx26(
        Select3,
        {
          ...form.getInputProps("personalityType.workStyle"),
          label: "What is your preferred working style?",
          withAsterisk: !0,
          data: workStyleOptions,
          w: "50%"
        }
      ),
      /* @__PURE__ */ jsx26(
        Select3,
        {
          ...form.getInputProps("personalityType.workValue"),
          label: "What do you value the most in a career?",
          withAsterisk: !0,
          data: workLifeOptions,
          w: "50%"
        }
      )
    ] }),
    /* @__PURE__ */ jsxs22("div", { className: commonStyles_module_default.row, children: [
      /* @__PURE__ */ jsx26(
        Select3,
        {
          ...form.getInputProps("expectedSalary.city"),
          label: "City",
          data: exampleCities,
          withAsterisk: !0,
          onChange: onSelectCity,
          w: "50%"
        }
      ),
      /* @__PURE__ */ jsx26(
        NumberInput,
        {
          ...form.getInputProps("expectedSalary.expectedSalary"),
          label: "What is your expected starting salary?",
          withAsterisk: !0,
          thousandSeparator: ",",
          leftSection: Icon && /* @__PURE__ */ jsx26(Icon, { color: "gray", size: 20 }),
          w: "50%"
        }
      )
    ] })
  ] });
};

// app/features/careerTest/preferencesForm/PreferencesForm.tsx
import { jsx as jsx27, jsxs as jsxs23 } from "react/jsx-runtime";
var PreferencesForm = ({ form }) => /* @__PURE__ */ jsx27(Container5, { py: "md", children: /* @__PURE__ */ jsxs23(FormContent, { title: "Preferences", children: [
  /* @__PURE__ */ jsx27(AreasOfInterestForm, { form }),
  /* @__PURE__ */ jsx27(WorkStyleForm, { form })
] }) });

// app/features/careerTest/careerPathsForm/CareerPathsForm.tsx
import { Grid as Grid3, Container as Container6 } from "@mantine/core";
import { useEffect as useEffect8 } from "react";

// app/features/careerTest/careerPathsForm/ResultCard.tsx
import { ActionIcon as ActionIcon2, Badge, Card as Card2, Group as Group8, Text as Text11 } from "@mantine/core";
import { IconHeart as IconHeart2 } from "@tabler/icons-react";
import { jsx as jsx28, jsxs as jsxs24 } from "react/jsx-runtime";
var ResultCard = ({
  title,
  color,
  industry,
  selected,
  loading,
  salary,
  role,
  onClick
}) => /* @__PURE__ */ jsxs24(Card2, { padding: "lg", withBorder: !0, h: "100%", children: [
  /* @__PURE__ */ jsx28(Card2.Section, { withBorder: !0, inheritPadding: !0, py: "xs", className: commonStyles_module_default.lightNavyBg, children: /* @__PURE__ */ jsxs24(Group8, { justify: "space-between", children: [
    /* @__PURE__ */ jsx28(Text11, { fw: "bold", children: title }),
    /* @__PURE__ */ jsx28(ActionIcon2, { loading, onClick, variant: "transparent", children: /* @__PURE__ */ jsx28(
      IconHeart2,
      {
        size: 50,
        fill: selected ? "red" : "transparent",
        color: selected ? "red" : "navy"
      }
    ) })
  ] }) }),
  /* @__PURE__ */ jsxs24(Group8, { justify: "space-between", py: "sm", children: [
    /* @__PURE__ */ jsx28(Text11, { fw: "bold", children: salary }),
    /* @__PURE__ */ jsx28(Badge, { color, children: industry })
  ] }),
  role
] });

// app/features/careerTest/careerPathsForm/CareerPathsForm.tsx
import { jsx as jsx29 } from "react/jsx-runtime";
var CareerPathsForm = ({ careerPaths, profileId }) => {
  let industryColors = useAppSelector(selectIndustryColors), { toggleSelectedCareer, selectedCareers, loadingCareers } = useCareerSelection(), dispatch = useAppDispatch();
  return useEffect8(() => {
    let industries = Object.values(careerPaths || {}).map((item) => item.industry);
    dispatch(addIndustryColors(industries));
  }, [careerPaths]), /* @__PURE__ */ jsx29(Container6, { py: "md", children: /* @__PURE__ */ jsx29(FormContent, { title: "Select Your Favourite Career Paths", children: /* @__PURE__ */ jsx29(Grid3, { py: "lg", grow: !0, children: Object.entries(careerPaths || {}).map(
    ([careerIdentifier, { title, startingSalary, industry, role }]) => {
      let selected = selectedCareers[careerIdentifier];
      return /* @__PURE__ */ jsx29(
        Grid3.Col,
        {
          span: { md: 6 },
          className: careerTest_module_default.result,
          children: /* @__PURE__ */ jsx29(
            ResultCard,
            {
              salary: startingSalary,
              loading: loadingCareers[careerIdentifier],
              role,
              selected,
              industry,
              title,
              color: industryColors[industry],
              onClick: () => toggleSelectedCareer({
                careerIdentifier,
                profileIdentifier: profileId,
                selected: !selected
              })
            }
          )
        },
        `career-path-${careerIdentifier}`
      );
    }
  ) }) }) });
};

// app/features/careerTest/diversityForm/DiversityForm.tsx
import { Accordion, Container as Container7, Select as Select4 } from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";
import { jsx as jsx30, jsxs as jsxs25 } from "react/jsx-runtime";
var yesNoPreferOptions = Object.entries(YesNoPreferNotToSay).map(([label, value]) => ({
  label,
  value
})), DiversityForm = ({ form }) => /* @__PURE__ */ jsx30(Container7, { py: "md", children: /* @__PURE__ */ jsxs25(FormContent, { title: "Diversity and Inclusion (Optional)", children: [
  /* @__PURE__ */ jsx30("div", { className: commonStyles_module_default.row, children: /* @__PURE__ */ jsx30(Accordion, { w: "100%", children: /* @__PURE__ */ jsxs25(Accordion.Item, { value: "why", children: [
    /* @__PURE__ */ jsx30(Accordion.Control, { icon: /* @__PURE__ */ jsx30(IconInfoCircle, {}), children: "Why do we ask for this information?" }),
    /* @__PURE__ */ jsxs25(Accordion.Panel, { children: [
      "We use the answer to:",
      /* @__PURE__ */ jsxs25("ul", { children: [
        /* @__PURE__ */ jsx30("li", { children: "Provide you with career options you may not have considered" }),
        /* @__PURE__ */ jsx30("li", { children: "Match you with mentors from shared backgrounds" })
      ] })
    ] })
  ] }) }) }),
  /* @__PURE__ */ jsx30("div", { className: commonStyles_module_default.row, children: /* @__PURE__ */ jsx30(
    Select4,
    {
      ...form.getInputProps("diversity.firstGeneration"),
      w: "100%",
      label: "Are you the first generation in your family to attend univeristy?",
      data: yesNoPreferOptions,
      searchable: !0
    }
  ) }),
  /* @__PURE__ */ jsx30("div", { className: commonStyles_module_default.row, children: /* @__PURE__ */ jsx30(
    Select4,
    {
      ...form.getInputProps("diversity.schoolType"),
      w: "100%",
      label: "What was the main type of school you attended for your secondary education?",
      data: Object.entries(SchoolType).map(([label, value]) => ({ label, value })),
      searchable: !0
    }
  ) }),
  /* @__PURE__ */ jsx30("div", { className: commonStyles_module_default.row, children: /* @__PURE__ */ jsx30(
    Select4,
    {
      ...form.getInputProps("diversity.ethnicity"),
      w: "100%",
      label: "What is your ethnicity?",
      data: Object.entries(Ethnicity).map(([label, value]) => ({ label, value })),
      searchable: !0
    }
  ) }),
  /* @__PURE__ */ jsx30("div", { className: commonStyles_module_default.row, children: /* @__PURE__ */ jsx30(
    Select4,
    {
      ...form.getInputProps("diversity.gender"),
      w: "100%",
      label: "What is your current gender identity?",
      data: Object.entries(Gender).map(([label, value]) => ({ label, value })),
      searchable: !0
    }
  ) })
] }) });

// app/routes/career-test.tsx
import { Fragment as Fragment5, jsx as jsx31, jsxs as jsxs26 } from "react/jsx-runtime";
var stepperLabels = ["Education", "Experience", "Preferences", "Diversity", "Career Paths"], Index = () => {
  let dispatch = useAppDispatch(), { authenticated } = useAuthUser(), [createProfile, { data, isLoading, error }] = useCreateProfileMutation(), { storeTestValues, careerTestStorage } = useCareerTestStorage(), [activeStep, setActiveStep] = useState6(careerTestStorage.step), { form, checkFormIsValid } = useCareerTestForm({ activeStep }), { isMobile } = useMobileStyles(), { associateProfile, loading } = useAssociate();
  useEffect9(() => {
    let newStep = activeStep >= 5 /* COMPLETE */ ? 5 /* COMPLETE */ : activeStep;
    storeTestValues({ key: "step", value: newStep });
  }, [activeStep]), useEffect9(() => {
    if (error) {
      console.error(`create profile error - ${JSON.stringify(error)}`), notifications3.show({
        title: "Profile Generation Error",
        message: "Could not create profile, please try again later",
        color: "red"
      }), setActiveStep(3 /* DIVERSITY */);
      return;
    }
    data?.careerPaths && (storeTestValues({ key: "profileId", value: data.identifier }), storeTestValues({ key: "careerPaths", value: data.careerPaths }), setActiveStep(activeStep + 1));
  }, [data, error]);
  let nextLabel = useMemo7(
    () => !authenticated || activeStep !== 5 /* COMPLETE */ ? "Next" : "Save",
    [authenticated, activeStep]
  ), backLabel = useMemo7(
    () => activeStep === 5 /* COMPLETE */ ? "Retake Test" : "Back",
    [activeStep]
  ), clickNext = () => {
    if (nextLabel === "Save") {
      associateProfile(careerTestStorage.profileId);
      return;
    }
    let formIsvalid = checkFormIsValid();
    storeTestValues({ key: "formValues", value: form.values }), formIsvalid && (form.clearErrors(), activeStep === 3 /* DIVERSITY */ && (storeTestValues({ key: "careerPaths", value: void 0 }), createProfile(form.values)), activeStep === 5 /* COMPLETE */ ? dispatch(
      setLoginModal({
        open: !authenticated,
        associateProfileId: careerTestStorage?.profileId,
        initialState: "signUp"
      })
    ) : setActiveStep(activeStep + 1));
  }, clickBack = () => {
    activeStep === 5 /* COMPLETE */ ? setActiveStep(activeStep - 2) : setActiveStep(activeStep - 1);
  };
  return /* @__PURE__ */ jsx31(Shell, { children: /* @__PURE__ */ jsxs26(Fragment5, { children: [
    /* @__PURE__ */ jsx31(Container8, { children: /* @__PURE__ */ jsx31(Stepper, { active: activeStep, onStepClick: setActiveStep, py: "md", children: stepperLabels.map((label, index) => /* @__PURE__ */ jsx31(
      Stepper.Step,
      {
        label: !isMobile && label,
        loading: index === 4 /* CAREER_PATHS */ && isLoading,
        disabled: index > activeStep
      },
      `stepper-${label}`
    )) }) }),
    /* @__PURE__ */ jsx31(Container8, { py: "md", children: isLoading ? /* @__PURE__ */ jsx31(LoaderWithText, { text: careerLoadingText }) : /* @__PURE__ */ jsxs26(Fragment5, { children: [
      activeStep === 0 /* EDUCATION */ && /* @__PURE__ */ jsx31(EducationForm, { form }),
      activeStep === 1 /* WORK_EXPERIENCE */ && /* @__PURE__ */ jsx31(WorkExperienceForm, { form }),
      activeStep === 2 /* PREFERENCES */ && /* @__PURE__ */ jsx31(PreferencesForm, { form }),
      activeStep === 3 /* DIVERSITY */ && /* @__PURE__ */ jsx31(DiversityForm, { form }),
      (activeStep === 4 /* CAREER_PATHS */ || activeStep === 5 /* COMPLETE */) && /* @__PURE__ */ jsx31(
        CareerPathsForm,
        {
          careerPaths: careerTestStorage.careerPaths,
          profileId: careerTestStorage.profileId
        }
      ),
      /* @__PURE__ */ jsxs26(Group9, { justify: "center", children: [
        /* @__PURE__ */ jsx31(
          Button6,
          {
            onClick: clickBack,
            disabled: activeStep === 0 /* EDUCATION */ || isLoading,
            variant: "light",
            children: backLabel
          }
        ),
        /* @__PURE__ */ jsx31(
          Button6,
          {
            onClick: clickNext,
            disabled: isLoading || loading,
            loading: isLoading || loading,
            variant: "outline",
            children: nextLabel
          }
        )
      ] })
    ] }) })
  ] }) });
}, career_test_default = Index;

// app/routes/questions.$.tsx
var questions_exports = {};
__export(questions_exports, {
  default: () => questions_default,
  loader: () => loader2
});
import { useEffect as useEffect12 } from "react";
import { Button as Button8, Container as Container9, Group as Group11, Textarea as Textarea4 } from "@mantine/core";
import { hasLength, useForm as useForm3 } from "@mantine/form";

// app/shared/components/loadingScreen/LoadingLens.tsx
import { Image as Image2, Loader as Loader2 } from "@mantine/core";
import { jsx as jsx32, jsxs as jsxs27 } from "react/jsx-runtime";
var LoadingLens = () => /* @__PURE__ */ jsx32("div", { className: loadingScreen_module_default.lensContainer, children: /* @__PURE__ */ jsxs27("div", { className: loadingScreen_module_default.logoContainer, children: [
  /* @__PURE__ */ jsx32(Image2, { src: logo_default, h: 70, w: "auto", fit: "contain", className: loadingScreen_module_default.logo }),
  /* @__PURE__ */ jsx32(Image2, { src: career26_default, h: 20, w: "auto", fit: "contain", className: loadingScreen_module_default.title }),
  /* @__PURE__ */ jsx32(Loader2, { type: "dots", className: loadingScreen_module_default.dots, size: "xl" })
] }) });

// app/features/questions/QuestionSuggestion.tsx
import { useEffect as useEffect10, useState as useState7 } from "react";
import { IconBulb, IconQuestionMark, IconStar } from "@tabler/icons-react";
import { Accordion as Accordion2, Badge as Badge2, List as List2, Loader as Loader3, Paper as Paper2 } from "@mantine/core";
import { Fragment as Fragment6, jsx as jsx33, jsxs as jsxs28 } from "react/jsx-runtime";
var SuggestedFormat = ({ suggestedFormat }) => /* @__PURE__ */ jsx33(List2, { spacing: "md", center: !0, children: Object.entries(suggestedFormat).map(([key, value]) => /* @__PURE__ */ jsx33(List2.Item, { icon: /* @__PURE__ */ jsx33(Badge2, { children: key }), children: value }, `suggestion-${key}`)) }), QuestionSuggestion = () => {
  let [value, setValue] = useState7(null), careerPathId = useAppSelector(selectSelectedCareerPathId), selectedQuestion = useAppSelector(selectSelectedQuestion), fixedCacheKey = `suggestion-${careerPathId}-${selectedQuestion?.question}`, [getSuggestion, { isLoading: suggestionLoading }] = useGetSuggestionMutation({
    fixedCacheKey
  }), suggestion = useAppSelector((state) => selectSuggestion(state, fixedCacheKey));
  return useEffect10(() => {
    !selectedQuestion || !value || !careerPathId || suggestion || getSuggestion({ question: selectedQuestion.question, careerPathId });
  }, [value, selectedQuestion, careerPathId]), useEffect10(() => {
    setValue(null);
  }, [selectedQuestion, careerPathId]), /* @__PURE__ */ jsx33(Paper2, { withBorder: !0, children: /* @__PURE__ */ jsx33(Accordion2, { value, onChange: setValue, children: /* @__PURE__ */ jsxs28(Accordion2.Item, { value: "suggestion", children: [
    /* @__PURE__ */ jsx33(Accordion2.Control, { children: "Show Suggestion" }),
    /* @__PURE__ */ jsx33(Accordion2.Panel, { children: suggestionLoading ? /* @__PURE__ */ jsx33(Loader3, { type: "dots" }) : suggestion && /* @__PURE__ */ jsxs28(Fragment6, { children: [
      /* @__PURE__ */ jsx33(
        TextWithIconBlock,
        {
          title: "Suggested Format",
          content: /* @__PURE__ */ jsx33(SuggestedFormat, { suggestedFormat: suggestion?.suggestedFormat }),
          Icon: /* @__PURE__ */ jsx33(IconStar, { fill: "yellow" })
        }
      ),
      /* @__PURE__ */ jsx33(
        TextWithIconBlock,
        {
          title: "Sample Answer",
          content: suggestion?.sampleAnswer,
          Icon: /* @__PURE__ */ jsx33(IconBulb, { fill: "yellow" })
        }
      ),
      /* @__PURE__ */ jsx33(
        TextWithIconBlock,
        {
          title: "Reasoning",
          content: suggestion?.whySuitable,
          Icon: /* @__PURE__ */ jsx33(IconQuestionMark, {})
        }
      )
    ] }) })
  ] }) }) });
};

// app/features/questions/QuestionNavBar.tsx
import { NavLink as NavLink2 } from "@mantine/core";
import classNames5 from "classnames";
import { jsx as jsx34 } from "react/jsx-runtime";
var QuestionNavBar = ({ selectedQuestionId, questions }) => {
  let { toggleQuestionId } = usePageNavigation(), { isMobile } = useMobileStyles();
  return questions?.map(
    ({ question }, index) => /* @__PURE__ */ jsx34(
      NavLink2,
      {
        className: classNames5({ [commonStyles_module_default.mobileNavbar]: isMobile }),
        active: selectedQuestionId === index,
        onClick: () => toggleQuestionId(index),
        label: `${index + 1}. ${question}`
      },
      `question-${index}`
    )
  );
};

// app/features/questions/QuestionRating.tsx
import { Accordion as Accordion3, Button as Button7, Paper as Paper3 } from "@mantine/core";
import { useState as useState8 } from "react";
import { IconChecklist as IconChecklist3, IconSpeakerphone, IconWriting } from "@tabler/icons-react";
import { Fragment as Fragment7, jsx as jsx35, jsxs as jsxs29 } from "react/jsx-runtime";
var QuestionRating = ({
  onClickReset,
  onClickNext,
  nextDisabled,
  rating
}) => {
  let [value, setValue] = useState8("rating");
  return rating ? /* @__PURE__ */ jsxs29(Fragment7, { children: [
    /* @__PURE__ */ jsx35(Paper3, { withBorder: !0, children: /* @__PURE__ */ jsx35(Accordion3, { value, onChange: setValue, children: /* @__PURE__ */ jsxs29(Accordion3.Item, { value: "rating", children: [
      /* @__PURE__ */ jsx35(Accordion3.Control, { children: "Answer Rating" }),
      /* @__PURE__ */ jsx35(Accordion3.Panel, { children: /* @__PURE__ */ jsxs29(Fragment7, { children: [
        /* @__PURE__ */ jsx35(
          TextWithIconBlock,
          {
            Icon: /* @__PURE__ */ jsx35(IconSpeakerphone, { color: "orange" }),
            title: "General Feedback",
            content: rating.generalFeedback
          }
        ),
        /* @__PURE__ */ jsx35(
          TextWithIconBlock,
          {
            Icon: /* @__PURE__ */ jsx35(IconChecklist3, { color: "green" }),
            title: "Improvements",
            content: rating.suggestedImprovements
          }
        ),
        /* @__PURE__ */ jsx35(
          TextWithIconBlock,
          {
            Icon: /* @__PURE__ */ jsx35(IconWriting, {}),
            title: "Example Answer",
            content: rating.exampleAnswer
          }
        )
      ] }) })
    ] }) }) }),
    /* @__PURE__ */ jsxs29("div", { className: commonStyles_module_default.row, children: [
      /* @__PURE__ */ jsx35(Button7, { variant: "light", onClick: onClickReset, children: "Retry" }),
      /* @__PURE__ */ jsx35(Button7, { variant: "outline", disabled: nextDisabled, onClick: onClickNext, children: "Next" })
    ] })
  ] }) : null;
};

// app/features/questions/QuestionCard.tsx
import { Badge as Badge3, Card as Card3, Group as Group10, Text as Text12 } from "@mantine/core";

// app/features/questions/questions.module.css
var questions_module_default = { container: "BjEoI", questionCard: "znkY4" };

// app/features/questions/QuestionCard.tsx
import { jsx as jsx36, jsxs as jsxs30 } from "react/jsx-runtime";
var QuestionCard = ({ title, category, question, color }) => /* @__PURE__ */ jsxs30(Card3, { padding: "lg", radius: "md", withBorder: !0, className: questions_module_default.questionCard, children: [
  /* @__PURE__ */ jsx36(Card3.Section, { withBorder: !0, inheritPadding: !0, py: "xs", className: commonStyles_module_default.lightNavyBg, children: /* @__PURE__ */ jsxs30(Group10, { justify: "space-between", children: [
    /* @__PURE__ */ jsx36(Text12, { fw: "bold", children: title }),
    /* @__PURE__ */ jsx36(Badge3, { color, children: category })
  ] }) }),
  /* @__PURE__ */ jsx36(Text12, { py: "lg", children: question })
] });

// app/shared/hooks/usePageSetup.tsx
import { useEffect as useEffect11 } from "react";
var usePageSetup = () => {
  let dispatch = useAppDispatch(), { authenticated, loading, unauthenticated } = useAuthUser(), careerPaths = useAppSelector(selectCareerPaths), profileId = useAppSelector(selectProfileId), profile = useAppSelector(selectProfileState), [getProfile, { isFetching }] = useLazyGetProfileQuery(), { setupFormValues } = useCareerTestStorage(), { open: loginOpen } = useAppSelector(selectLoginModal);
  return useEffect11(() => {
    if (!careerPaths || !profile)
      return;
    let industries = Object.values(careerPaths).map(({ industry }) => industry);
    dispatch(addIndustryColors(industries)), setupFormValues(profile);
  }, [careerPaths, profile]), useEffect11(() => {
    authenticated && !profileId && !loginOpen && getProfile();
  }, [authenticated, profileId, loginOpen]), {
    loading: loading || isFetching,
    authenticated,
    unauthenticated
  };
};

// app/routes/questions.$.tsx
import { jsx as jsx37, jsxs as jsxs31 } from "react/jsx-runtime";
var loader2 = async ({ params }) => {
  let id = params["*"], [careerId, questionId] = id?.split("/") || [];
  return { careerId, questionId };
}, Index2 = () => {
  let navigate = useNavigate(), { careerId: _cId, questionId: _qId } = useLoaderData(), dispatch = useAppDispatch(), { loading, unauthenticated } = usePageSetup(), { toggleQuestionId, toggleCareerId } = usePageNavigation(), careerPathId = useAppSelector(selectSelectedCareerPathId), selectedQuestion = useAppSelector(selectSelectedQuestion), selectedQuestionId = useAppSelector(selectSelectedQuestionId), { data: questions, isFetching } = useGetQuestionsQuery(), [rateAnswer, { data: rating, isLoading: ratingLoading, reset: resetRating }] = useRateAnswerMutation(), questionColors = useAppSelector(selectQuestionColors), onClickReset = () => {
    form.reset(), resetRating();
  }, form = useForm3({
    initialValues: { answer: "" },
    validate: {
      answer: hasLength({ min: 1, max: 1e3 }, "Answer must be 10-1000 characters long")
    }
  });
  return useEffect12(() => {
    if (!questions)
      return;
    let categoies = questions.map(({ category }) => category);
    dispatch(addQuestionColors(categoies));
  }, [questions]), loading || isFetching ? /* @__PURE__ */ jsx37(LoadingLens, {}) : unauthenticated ? (navigate(urls.landingPage), /* @__PURE__ */ jsx37(LoadingLens, {})) : selectedQuestion ? /* @__PURE__ */ jsx37(
    Shell,
    {
      navbar: /* @__PURE__ */ jsx37(QuestionNavBar, { selectedQuestionId, questions }),
      children: /* @__PURE__ */ jsxs31(Container9, { py: "md", className: questions_module_default.container, children: [
        /* @__PURE__ */ jsx37(
          QuestionCard,
          {
            title: `Question ${selectedQuestionId + 1}`,
            question: selectedQuestion.question,
            category: selectedQuestion.category,
            color: questionColors[selectedQuestion.category]
          }
        ),
        /* @__PURE__ */ jsx37(QuestionSuggestion, {}),
        /* @__PURE__ */ jsx37(
          Textarea4,
          {
            ...form.getInputProps("answer"),
            label: `Answer (${1e3 - form.values.answer.length} characters remaining)`,
            placeholder: "Enter your response here",
            withAsterisk: !0,
            minRows: 5,
            maxRows: 10,
            autosize: !0
          }
        ),
        /* @__PURE__ */ jsx37(Group11, { justify: "flex-end", children: /* @__PURE__ */ jsx37(
          Button8,
          {
            variant: "outline",
            disabled: !form.isValid() || ratingLoading,
            loading: ratingLoading,
            w: "20%",
            onClick: () => rateAnswer({
              question: selectedQuestion.question,
              answer: form.values.answer,
              careerPathId
            }),
            children: "Submit"
          }
        ) }),
        /* @__PURE__ */ jsx37(
          QuestionRating,
          {
            rating,
            onClickNext: () => toggleQuestionId(selectedQuestionId + 1),
            onClickReset,
            nextDisabled: questions && selectedQuestionId === questions.length - 1
          }
        )
      ] })
    }
  ) : null;
}, questions_default = Index2;

// app/routes/overview.$.tsx
var overview_exports = {};
__export(overview_exports, {
  default: () => overview_default,
  loader: () => loader3
});
import { Card as Card8, Container as Container10, Group as Group15, Text as Text17 } from "@mantine/core";

// app/features/overview/careerProgressionTile/CareerProgressionTile.tsx
import { Group as Group12, Stepper as Stepper2 } from "@mantine/core";
import { useMemo as useMemo8, useState as useState9 } from "react";
import { IconEye } from "@tabler/icons-react";

// app/features/overview/careerProgressionTile/SalaryChart.tsx
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

// app/features/overview/careerProgressionTile/TooltipContent.tsx
import { Badge as Badge4 } from "@mantine/core";

// app/features/overview/careerProgressionTile/progressionUtil.ts
var getYLabel = (salary) => salary === void 0 ? "NA" : `\xA3${salary / 1e3}K`, getGradientLabel = (gradient) => gradient === void 0 ? "NA" : `\xA3${gradient}/yr`, getVerticalFill = (salaryProgression, minAge, maxAge) => salaryProgression.map(({ age }) => Number(age) >= Number(minAge) && Number(age) <= Number(maxAge) ? "pink" : "none"), getGradient = ({
  max,
  min,
  salaryProgression
}) => {
  if (!max || !min)
    return;
  let maxAge = Number(salaryProgression[salaryProgression.length - 1].age), minAge = Number(salaryProgression[0].age), years = maxAge - minAge;
  return (max - min) / years;
}, getSelectedItem = ({
  promotionTimeline,
  salaryProgression,
  activeIndex
}) => {
  if (activeIndex === void 0)
    return null;
  let { title, age } = promotionTimeline[activeIndex], [minAge, maxAge] = age.split("-"), minSalary = salaryProgression.find((item) => item.age === minAge), maxSalary = salaryProgression.find((item) => item.age === maxAge);
  return {
    startingMin: minSalary?.low,
    startingMax: minSalary?.high,
    finalMin: maxSalary?.low,
    finalMax: maxSalary?.high,
    title,
    minAge,
    maxAge
  };
};

// app/features/overview/careerProgressionTile/careerProgression.module.css
var careerProgression_module_default = { graphContainer: "_0CQnD", tooltip: "_6FhUx" };

// app/features/overview/careerProgressionTile/TooltipContent.tsx
import { jsxs as jsxs32 } from "react/jsx-runtime";
var TooltipContent = ({ payload }) => {
  let item = payload?.[0]?.payload;
  if (!item)
    return null;
  let {
    age,
    value: [high, low]
  } = item, average = (high + low) / 2;
  return /* @__PURE__ */ jsxs32("div", { className: careerProgression_module_default.tooltip, children: [
    /* @__PURE__ */ jsxs32(Badge4, { size: "md", children: [
      "Age: ",
      age
    ] }),
    /* @__PURE__ */ jsxs32(Badge4, { color: "pink", size: "sm", children: [
      "Max: ",
      getYLabel(high)
    ] }),
    /* @__PURE__ */ jsxs32(Badge4, { color: "gray", size: "sm", children: [
      "Min: ",
      getYLabel(low)
    ] }),
    /* @__PURE__ */ jsxs32(Badge4, { color: "green", size: "sm", children: [
      "Average: ",
      getYLabel(average)
    ] })
  ] });
};

// app/features/overview/careerProgressionTile/SalaryChart.tsx
import { jsx as jsx38, jsxs as jsxs33 } from "react/jsx-runtime";
var SalaryChart = ({ salaryProgression, minAge, maxAge }) => /* @__PURE__ */ jsx38("div", { className: careerProgression_module_default.graphContainer, children: /* @__PURE__ */ jsx38(ResponsiveContainer, { children: /* @__PURE__ */ jsxs33(
  AreaChart,
  {
    data: salaryProgression.map(({ age, high, low }) => ({ age, value: [high, low] })),
    children: [
      /* @__PURE__ */ jsx38(
        CartesianGrid,
        {
          strokeDasharray: "3 3",
          verticalFill: getVerticalFill(salaryProgression, minAge, maxAge)
        }
      ),
      /* @__PURE__ */ jsx38(Area, { type: "monotone", dataKey: "value", stroke: "#228be6", fill: "#228be6" }),
      /* @__PURE__ */ jsx38(XAxis, { dataKey: "age" }),
      /* @__PURE__ */ jsx38(YAxis, { tickFormatter: getYLabel }),
      /* @__PURE__ */ jsx38(Tooltip, { content: TooltipContent })
    ]
  }
) }) });

// app/features/overview/careerProgressionTile/SalaryCard.tsx
import { Card as Card4, Text as Text13 } from "@mantine/core";
import { jsx as jsx39, jsxs as jsxs34 } from "react/jsx-runtime";
var SalaryCard = ({
  startingMin,
  startingMax,
  finalMax,
  salaryProgression
}) => /* @__PURE__ */ jsx39(Card4, { padding: "lg", radius: "md", withBorder: !0, children: /* @__PURE__ */ jsxs34(Card4.Section, { withBorder: !0, inheritPadding: !0, py: "xs", children: [
  /* @__PURE__ */ jsxs34("div", { className: commonStyles_module_default.row, children: [
    /* @__PURE__ */ jsx39(Text13, { fw: "bold", children: "Starting Salary: " }),
    /* @__PURE__ */ jsxs34(Text13, { children: [
      getYLabel(startingMin),
      " - ",
      getYLabel(startingMax)
    ] })
  ] }),
  /* @__PURE__ */ jsxs34("div", { className: commonStyles_module_default.row, children: [
    /* @__PURE__ */ jsx39(Text13, { fw: "bold", children: "Salary Increase: " }),
    /* @__PURE__ */ jsxs34(Text13, { children: [
      getGradientLabel(getGradient({ max: finalMax, min: startingMax, salaryProgression })),
      " -",
      " ",
      getGradientLabel(getGradient({ max: startingMax, min: startingMin, salaryProgression }))
    ] })
  ] })
] }) });

// app/features/overview/careerProgressionTile/CareerProgressionTile.tsx
import { jsx as jsx40, jsxs as jsxs35 } from "react/jsx-runtime";
var CareerProgressionTile = ({
  promotionTimeline,
  salaryProgression
}) => {
  let [activeIndex, setActiveIndex] = useState9(), selectedItem = useMemo8(
    () => getSelectedItem({ promotionTimeline, salaryProgression, activeIndex }),
    [activeIndex]
  );
  return /* @__PURE__ */ jsxs35("div", { id: "progression", children: [
    /* @__PURE__ */ jsxs35("div", { className: commonStyles_module_default.row, children: [
      /* @__PURE__ */ jsx40(Group12, { py: "md", children: /* @__PURE__ */ jsx40(
        Stepper2,
        {
          iconSize: 32,
          orientation: "vertical",
          onStepClick: setActiveIndex,
          active: promotionTimeline.length,
          completedIcon: /* @__PURE__ */ jsx40(IconEye, {}),
          children: promotionTimeline.map(
            (item, index) => /* @__PURE__ */ jsx40(
              Stepper2.Step,
              {
                icon: /* @__PURE__ */ jsx40(IconEye, { size: "1rem" }),
                label: item.age,
                description: item.title,
                color: activeIndex === index ? "#faa2c1" : "navy"
              },
              `promotion-${item.age}`
            )
          )
        }
      ) }),
      /* @__PURE__ */ jsx40(
        SalaryChart,
        {
          salaryProgression,
          maxAge: selectedItem?.maxAge,
          minAge: selectedItem?.minAge
        }
      )
    ] }),
    selectedItem && /* @__PURE__ */ jsx40(SalaryCard, { salaryProgression, ...selectedItem })
  ] });
};

// app/features/overview/TopEmployersTile.tsx
import { Badge as Badge5, Grid as Grid4 } from "@mantine/core";
import { jsx as jsx41 } from "react/jsx-runtime";
var TopEmployersTile = ({ employers }) => /* @__PURE__ */ jsx41(Grid4, { py: "md", gutter: "md", id: "employers", children: employers.map(
  (employer) => /* @__PURE__ */ jsx41(Grid4.Col, { span: 2, children: /* @__PURE__ */ jsx41(Badge5, { size: "lg", className: commonStyles_module_default.lightNavyBg, children: employer }) }, employer)
) });

// app/features/overview/OverlapsTile.tsx
import { useEffect as useEffect13 } from "react";
import { Badge as Badge6, Card as Card5, Grid as Grid5, Group as Group13, Text as Text14 } from "@mantine/core";
import { jsx as jsx42, jsxs as jsxs36 } from "react/jsx-runtime";
var OverlapsTile = ({ careerOverlaps }) => {
  let dispatch = useAppDispatch(), industryColors = useAppSelector(selectIndustryColors);
  return useEffect13(() => {
    let industries = careerOverlaps.map(({ industry }) => industry);
    dispatch(addIndustryColors(industries));
  }, [careerOverlaps]), /* @__PURE__ */ jsx42(Grid5, { py: "sm", grow: !0, id: "overlaps", children: careerOverlaps.map(
    (item) => /* @__PURE__ */ jsx42(Grid5.Col, { span: { md: 6 }, children: /* @__PURE__ */ jsxs36(Card5, { padding: "lg", radius: "md", withBorder: !0, h: "100%", children: [
      /* @__PURE__ */ jsx42(Card5.Section, { withBorder: !0, inheritPadding: !0, py: "xs", className: commonStyles_module_default.lightNavyBg, children: /* @__PURE__ */ jsxs36(Group13, { justify: "space-between", children: [
        /* @__PURE__ */ jsx42(Text14, { fw: "bold", children: item.career }),
        /* @__PURE__ */ jsx42(Badge6, { color: industryColors[item.industry], children: item.industry })
      ] }) }),
      /* @__PURE__ */ jsx42(Text14, { py: "sm", children: item.reason })
    ] }) }, `overlap-${item.career}`)
  ) });
};

// app/features/overview/OverviewNavBar.tsx
import { NavLink as NavLink3 } from "@mantine/core";

// app/shared/hooks/useActiveNavScroll.ts
import { useEffect as useEffect14, useState as useState10 } from "react";
var useActiveNavScroll = ({ navItems, headerHeight: headerHeight2 = 150 }) => {
  let [activeAnchor, setActiveAnchor] = useState10(navItems[0].anchor), handleScroll = () => {
    let activeSection = navItems.reduce(
      (agg, { anchor }) => {
        let section = document.getElementById(anchor);
        if (!section)
          return agg;
        let { top } = section.getBoundingClientRect();
        return top < 0 ? agg : !agg.top || top < agg.top ? { anchor, top } : agg;
      },
      { anchor: "" }
    );
    activeSection.anchor ? setActiveAnchor(activeSection.anchor) : setActiveAnchor(navItems[navItems.length - 1].anchor);
  };
  useEffect14(() => {
    if (!(typeof document > "u" || typeof window > "u"))
      return window.addEventListener("scroll", handleScroll), () => {
        window.removeEventListener("scroll", handleScroll);
      };
  }, []);
  let scrollToTargetAdjusted = (targetId) => {
    let targetElement = document.getElementById(targetId);
    if (targetElement) {
      let targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: targetPosition - headerHeight2,
        behavior: "smooth"
      });
    }
  };
  return typeof document > "u" ? { activeAnchor: "" } : (document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      e.preventDefault();
      let targetId = anchor.getAttribute("href")?.substring(1);
      targetId && scrollToTargetAdjusted(targetId);
    });
  }), { activeAnchor });
};

// app/shared/constants/overviewConstants.ts
import {
  IconBarbell,
  IconBuildingBank,
  IconCalendarTime,
  IconReportSearch as IconReportSearch2,
  IconTrendingUp,
  IconUsers
} from "@tabler/icons-react";
var overviewLinks = [
  { label: "Role Summary", Icon: IconReportSearch2, anchor: "role" },
  { label: "Sample Employers", Icon: IconUsers, anchor: "employers" },
  { label: "Career Progression", Icon: IconTrendingUp, anchor: "progression" },
  { label: "Preparation", Icon: IconBarbell, anchor: "preparation" },
  { label: "Application Timeline", Icon: IconCalendarTime, anchor: "timeline" },
  { label: "Similar Roles", Icon: IconBuildingBank, anchor: "overlaps" }
];

// app/features/overview/OverviewNavBar.tsx
import { jsx as jsx43 } from "react/jsx-runtime";
var OverviewNavBar = () => {
  let { activeAnchor } = useActiveNavScroll({ navItems: overviewLinks });
  return overviewLinks.map(({ label, Icon, anchor }) => /* @__PURE__ */ jsx43(
    NavLink3,
    {
      href: `#${anchor}`,
      active: activeAnchor === anchor,
      label,
      leftSection: /* @__PURE__ */ jsx43(Icon, {})
    },
    `link-${label}`
  ));
};

// app/features/overview/ProgressionTile.tsx
import { Card as Card6, Group as Group14, Text as Text15 } from "@mantine/core";
import { IconArrowBigDownLines } from "@tabler/icons-react";
import { jsx as jsx44, jsxs as jsxs37 } from "react/jsx-runtime";
var getMappedList = (progressionList) => progressionList.reduce((agg, item) => {
  let existingYear = agg.find((aggItem) => aggItem.title === item.title);
  return existingYear ? agg.map(
    (aggItem) => aggItem.title === existingYear.title ? { ...aggItem, descriptions: [...existingYear.descriptions, ...item.descriptions] } : aggItem
  ) : [...agg, item];
}, []), ProgressionTile = ({
  progressionList,
  id
}) => {
  let mappedList = getMappedList(progressionList), { isMobile } = useMobileStyles();
  return /* @__PURE__ */ jsx44(Group14, { py: "md", id, children: mappedList.map(
    (item, index) => /* @__PURE__ */ jsxs37(Group14, { justify: "center", display: "flex", w: "100%", children: [
      /* @__PURE__ */ jsxs37(Card6, { shadow: "sm", padding: "lg", radius: "md", withBorder: !0, w: "100%", children: [
        /* @__PURE__ */ jsx44(
          Card6.Section,
          {
            withBorder: !0,
            inheritPadding: !0,
            py: "xs",
            fw: "bold",
            variant: "light",
            className: commonStyles_module_default.lightNavyBg,
            children: item.title
          }
        ),
        /* @__PURE__ */ jsx44("div", { className: commonStyles_module_default.row, children: item.descriptions.map(
          (description) => /* @__PURE__ */ jsx44(
            Text15,
            {
              w: isMobile ? "100%" : `${100 / item.descriptions.length}%`,
              children: description
            },
            `description-${description}`
          )
        ) })
      ] }),
      index !== mappedList.length - 1 && /* @__PURE__ */ jsx44(IconArrowBigDownLines, { size: 40, color: "navy" })
    ] }, `progression-${item.title}`)
  ) });
};

// app/features/overview/RoleSummaryTile.tsx
import { Card as Card7, Grid as Grid6, Text as Text16 } from "@mantine/core";
import { jsx as jsx45, jsxs as jsxs38 } from "react/jsx-runtime";
var RoleSummaryTile = ({
  responsibilities,
  dayToDay,
  skills,
  personalityType
}) => /* @__PURE__ */ jsx45(Grid6, { py: "sm", grow: !0, id: "role", children: [
  { content: responsibilities, title: "Responsibilities" },
  { content: dayToDay, title: "Day to Day" },
  { content: skills, title: "Skills" },
  { content: personalityType, title: "Personality Type" }
].map(
  ({ title, content }) => /* @__PURE__ */ jsx45(Grid6.Col, { span: { md: 6 }, children: /* @__PURE__ */ jsxs38(Card7, { padding: "lg", radius: "md", withBorder: !0, h: "100%", children: [
    /* @__PURE__ */ jsx45(Card7.Section, { withBorder: !0, inheritPadding: !0, py: "xs", className: commonStyles_module_default.lightNavyBg, children: /* @__PURE__ */ jsx45(Text16, { fw: "bold", children: title }) }),
    /* @__PURE__ */ jsx45(Text16, { py: "md", children: content })
  ] }) }, `role-${title}`)
) });

// app/routes/overview.$.tsx
import { Fragment as Fragment8, jsx as jsx46, jsxs as jsxs39 } from "react/jsx-runtime";
var loader3 = async ({ params }) => ({ careerId: params["*"] }), Index3 = () => {
  let { careerId: careerIdUrl } = useLoaderData(), { loading, unauthenticated } = usePageSetup(), { isMobile } = useMobileStyles(), profileId = useAppSelector(selectProfileId) || "", navigate = useNavigate(), careerId = useAppSelector(selectSelectedCareerPathId), careerPath = useAppSelector(selectSelectedCareerPath), { data, isFetching } = useGetCareerOverviewQuery(
    { careerId, profileId },
    { skip: !profileId || !careerId }
  );
  return loading ? /* @__PURE__ */ jsx46(LoadingLens, {}) : unauthenticated ? (navigate(urls.landingPage), null) : isFetching ? /* @__PURE__ */ jsx46(Shell, { navbar: isMobile ? void 0 : /* @__PURE__ */ jsx46(OverviewNavBar, {}), children: /* @__PURE__ */ jsx46(
    LoaderWithText,
    {
      text: [
        `Fetching insights for ${careerPath?.title}...`,
        "This can take up to 30 seconds..."
      ]
    }
  ) }) : /* @__PURE__ */ jsx46(Shell, { navbar: isMobile ? void 0 : /* @__PURE__ */ jsx46(OverviewNavBar, {}), children: /* @__PURE__ */ jsx46(Fragment8, { children: overviewLinks.map(({ label, Icon, anchor }) => data ? /* @__PURE__ */ jsx46(Container10, { py: "md", children: /* @__PURE__ */ jsxs39(Card8, { padding: "lg", radius: "md", withBorder: !0, children: [
    /* @__PURE__ */ jsx46(Card8.Section, { withBorder: !0, inheritPadding: !0, py: "xs", bg: "navy", c: "white", children: /* @__PURE__ */ jsxs39(Group15, { children: [
      /* @__PURE__ */ jsx46(Icon, { size: 35, stroke: 1 }),
      /* @__PURE__ */ jsx46(Text17, { fw: "bold", size: "xl", children: label })
    ] }) }),
    anchor === "role" && /* @__PURE__ */ jsx46(RoleSummaryTile, { ...data.roleSummary }),
    anchor === "employers" && /* @__PURE__ */ jsx46(TopEmployersTile, { employers: data.exampleEmployers }),
    anchor === "progression" && /* @__PURE__ */ jsx46(
      CareerProgressionTile,
      {
        promotionTimeline: data.promotionTimeline,
        salaryProgression: data.salaryProgression
      }
    ),
    anchor === "preparation" && /* @__PURE__ */ jsx46(
      ProgressionTile,
      {
        progressionList: data.supplementalExperiences.map((item) => ({
          title: `Year ${item.year}`,
          descriptions: [item.activity]
        })),
        id: "preparation"
      }
    ),
    anchor === "timeline" && /* @__PURE__ */ jsx46(
      ProgressionTile,
      {
        progressionList: data.assessmentStages.map((item, index) => ({
          title: `${index + 1} ${item.stage}`,
          descriptions: [item.description]
        })),
        id: "timeline"
      }
    ),
    anchor === "overlaps" && /* @__PURE__ */ jsx46(OverlapsTile, { careerOverlaps: data.careerOverlaps })
  ] }) }, `career-${label}`) : null) }) });
}, overview_default = Index3;

// app/routes/settings.tsx
var settings_exports = {};
__export(settings_exports, {
  default: () => settings_default
});
import { Card as Card9, Container as Container11, NavLink as NavLink4 } from "@mantine/core";
import { useState as useState12 } from "react";

// app/features/settings/ProfileTab.tsx
import classNames6 from "classnames";
import { useState as useState11 } from "react";
import { Button as Button9, Group as Group16, Tabs, Text as Text18, TextInput as TextInput3 } from "@mantine/core";
import { IconExclamationCircle } from "@tabler/icons-react";

// app/features/settings/settingsStyles.module.css
var settingsStyles_module_default = { accountTab: "coi3L" };

// app/features/settings/ProfileTab.tsx
import { jsx as jsx47, jsxs as jsxs40 } from "react/jsx-runtime";
var DetailsTab = () => {
  let { user } = useAuthUser();
  return /* @__PURE__ */ jsxs40("div", { children: [
    /* @__PURE__ */ jsx47(TextInput3, { label: "Email", value: user?.attributes?.email, disabled: !0 }),
    /* @__PURE__ */ jsx47(TextInput3, { value: user?.attributes?.name, label: "Name", disabled: !0 })
  ] });
}, AccountTab = () => {
  let { isMobile } = useMobileStyles(), { loading, deleteAccount } = useAuthUser(), [deleteText, setDeleteText] = useState11("");
  return /* @__PURE__ */ jsxs40("div", { children: [
    /* @__PURE__ */ jsxs40("div", { className: classNames6(commonStyles_module_default.row, settingsStyles_module_default.accountTab), children: [
      /* @__PURE__ */ jsx47(IconExclamationCircle, { color: "red", size: 40 }),
      /* @__PURE__ */ jsx47(Text18, { fw: "bold", children: "Deleting your account will remove your saved careers, interview quesitons, and mentor network." })
    ] }),
    /* @__PURE__ */ jsxs40(Group16, { py: "lg", display: "flex", justify: isMobile ? "center" : "flex-start", align: "flex-end", children: [
      /* @__PURE__ */ jsx47(
        TextInput3,
        {
          value: deleteText,
          label: "Type DELETE to confirm",
          onChange: ({ target: { value } }) => setDeleteText(value)
        }
      ),
      /* @__PURE__ */ jsx47(
        Button9,
        {
          color: "red",
          disabled: deleteText !== "DELETE" || loading,
          variant: "outline",
          onClick: deleteAccount,
          loading,
          children: "Delete Profile"
        }
      )
    ] })
  ] });
}, tabs = [
  { label: "Details", Component: DetailsTab },
  { label: "Account", Component: AccountTab }
], ProfileTab = () => /* @__PURE__ */ jsxs40(Tabs, { defaultValue: tabs[0].label, children: [
  /* @__PURE__ */ jsx47(Tabs.List, { children: tabs.map(
    ({ label }) => /* @__PURE__ */ jsx47(Tabs.Tab, { value: label, children: label }, `tab-${label}`)
  ) }),
  tabs.map(
    ({ label, Component: Component2 }) => /* @__PURE__ */ jsx47(Tabs.Panel, { value: label, pt: "md", children: /* @__PURE__ */ jsx47(Component2, {}) }, `panel-${label}`)
  )
] });

// app/features/settings/UserInfoTab.tsx
import { Select as Select5, Tabs as Tabs2, TextInput as TextInput4, Textarea as Textarea5 } from "@mantine/core";
import { jsx as jsx48, jsxs as jsxs41 } from "react/jsx-runtime";
var UniversitiesTab = ({ profile }) => {
  let universities = [profile.latestDegree, ...profile.additionalDegrees];
  return /* @__PURE__ */ jsx48("div", { children: universities.map(
    (university) => /* @__PURE__ */ jsxs41("div", { children: [
      /* @__PURE__ */ jsxs41("div", { className: commonStyles_module_default.row, children: [
        /* @__PURE__ */ jsx48(TextInput4, { w: "50%", label: "University Name", value: university.university, disabled: !0 }),
        /* @__PURE__ */ jsx48(TextInput4, { w: "50%", label: "Course Name", value: university.name, disabled: !0 })
      ] }),
      /* @__PURE__ */ jsxs41("div", { className: commonStyles_module_default.row, children: [
        /* @__PURE__ */ jsx48(TextInput4, { w: "50%", label: "Achieve/Expected Grade", value: university.grade, disabled: !0 }),
        /* @__PURE__ */ jsx48(TextInput4, { w: "50%", label: "Level", value: university.level, disabled: !0 })
      ] }),
      /* @__PURE__ */ jsx48(TextInput4, { label: "Course Summary", value: university.ratingReason, disabled: !0 })
    ] }, `experience-${university.university}`)
  ) });
}, ExperiencesTab = ({ profile }) => /* @__PURE__ */ jsx48("div", { children: profile.previousWorkExperience.map(
  (experience) => /* @__PURE__ */ jsxs41("div", { children: [
    /* @__PURE__ */ jsx48(TextInput4, { label: "Company Name", value: experience.experienceName, disabled: !0 }),
    /* @__PURE__ */ jsx48(
      Select5,
      {
        label: "Experience Type",
        value: experience.experienceType,
        data: experienceOptions,
        disabled: !0
      }
    ),
    /* @__PURE__ */ jsx48(TextInput4, { label: "Role", value: experience.role, disabled: !0 }),
    /* @__PURE__ */ jsx48(Textarea5, { label: "Experience summaey", value: experience.ratingReason, disabled: !0 })
  ] }, `experience-${experience.experienceName}`)
) }), tabs2 = [
  { label: "Universities", Component: UniversitiesTab },
  { label: "Experiences", Component: ExperiencesTab }
], UserInfoTab = () => {
  let profile = useAppSelector(selectProfile);
  return profile ? /* @__PURE__ */ jsxs41(Tabs2, { defaultValue: tabs2[0].label, children: [
    /* @__PURE__ */ jsx48(Tabs2.List, { children: tabs2.map(
      ({ label }) => /* @__PURE__ */ jsx48(Tabs2.Tab, { value: label, children: label }, `tab-${label}`)
    ) }),
    tabs2.map(
      ({ label, Component: Component2 }) => /* @__PURE__ */ jsx48(Tabs2.Panel, { value: label, pt: "md", children: /* @__PURE__ */ jsx48(Component2, { profile }) }, `panel=${label}`)
    )
  ] }) : null;
};

// app/routes/settings.tsx
import { jsx as jsx49 } from "react/jsx-runtime";
var profileLinks = [
  { label: "Profile", Component: ProfileTab },
  { label: "User Info", Component: UserInfoTab }
], Index4 = () => {
  let [activeTab, setActiveTab] = useState12(0), { Component: Component2 } = profileLinks[activeTab];
  return /* @__PURE__ */ jsx49(
    Shell,
    {
      navbar: /* @__PURE__ */ jsx49("div", { children: profileLinks.map(({ label }, index) => /* @__PURE__ */ jsx49(
        NavLink4,
        {
          label,
          active: activeTab === index,
          onClick: () => setActiveTab(index)
        },
        `link-${label}`
      )) }),
      children: /* @__PURE__ */ jsx49(Container11, { py: "md", children: /* @__PURE__ */ jsx49(Card9, { radius: "md", p: "md", withBorder: !0, children: /* @__PURE__ */ jsx49(Component2, {}) }) })
    }
  );
}, settings_default = Index4;

// app/routes/_index.tsx
var index_exports = {};
__export(index_exports, {
  default: () => index_default
});
import classNames8 from "classnames";

// app/shared/components/featureSlider/FeatureSlider.tsx
import { useRef as useRef2 } from "react";
import Autoplay from "embla-carousel-autoplay";
import { Carousel } from "@mantine/carousel";
import { Container as Container12, Image as Image3, Title } from "@mantine/core";

// app/shared/components/featureSlider/featureSlider.module.css
var featureSlider_module_default = { container: "-Aoqf", controls: "_7KTBS", root: "fyn2R", indicator: "KcwqU", title: "zrAV2", slide: "-Yajt" };

// app/shared/components/featureSlider/FeatureSlider.tsx
import { jsx as jsx50, jsxs as jsxs42 } from "react/jsx-runtime";
var FeatureSlider = ({ slides }) => {
  let { isMobile } = useMobileStyles(), autoplay = useRef2(Autoplay({ delay: 2e3 }));
  return /* @__PURE__ */ jsx50(Container12, { className: featureSlider_module_default.container, children: /* @__PURE__ */ jsx50(
    Carousel,
    {
      classNames: featureSlider_module_default,
      withIndicators: !0,
      height: isMobile ? 300 : 500,
      loop: !0,
      plugins: [autoplay.current],
      onMouseEnter: autoplay.current.stop,
      onMouseLeave: autoplay.current.reset,
      children: slides.map(
        ({ title, subTitle, image }) => /* @__PURE__ */ jsxs42(Carousel.Slide, { className: featureSlider_module_default.slide, children: [
          /* @__PURE__ */ jsxs42("div", { className: featureSlider_module_default.title, children: [
            /* @__PURE__ */ jsxs42(Title, { children: [
              title,
              " "
            ] }),
            /* @__PURE__ */ jsx50(Title, { c: "navy", children: subTitle })
          ] }),
          /* @__PURE__ */ jsx50(Image3, { src: image, radius: "md" })
        ] }, `slide-${title}`)
      )
    }
  ) });
};

// app/features/landingPage/HomeTiles.tsx
import { Card as Card10, Container as Container13, Grid as Grid7, Group as Group17, Text as Text19, Tooltip as Tooltip2 } from "@mantine/core";
import classNames7 from "classnames";

// app/features/landingPage/landingPage.module.css
var landingPage_module_default = { footer: "kMSdh", title: "v94j7", container: "yzySm", homeTile: "EN4mb", left: "XFFGO", right: "fM6t1" };

// app/features/landingPage/HomeTiles.tsx
import { jsx as jsx51, jsxs as jsxs43 } from "react/jsx-runtime";
var HomeTiles = () => {
  let dispatch = useAppDispatch(), { authenticated } = useAuthUser(), navigate = useNavigate(), profile = useAppSelector(selectProfile), careerPaths = useAppSelector(selectCareerPaths), handleClick = (link) => {
    if (link === urls.careersTest) {
      careerPaths || dispatch(setCareerTestModal({ open: !0, noProfile: !1 })), navigate(link);
      return;
    }
    if (!authenticated) {
      dispatch(setCareerTestModal({ open: !0, noProfile: !0 }));
      return;
    }
    if ([urls.mentors, urls.jobs].includes(link) && !profile?.diversity) {
      dispatch(setDiversityModal({ open: !0 }));
      return;
    }
    if ([urls.overview, urls.questions].includes(link) && !careerPaths) {
      dispatch(setCareerTestModal({ open: !0, noProfile: !0 }));
      return;
    }
    navigate(link);
  };
  return /* @__PURE__ */ jsx51(Container13, { py: 0, children: /* @__PURE__ */ jsx51(Grid7, { py: "sm", id: "mentors-grid", children: featureTiles.map(
    ({ title, Icon, link, description, disabled }) => /* @__PURE__ */ jsx51(
      Tooltip2,
      {
        label: `${title} Coming Soon`,
        id: `home-tile-${title}`,
        disabled: !disabled,
        children: /* @__PURE__ */ jsx51(Grid7.Col, { span: { md: 6 }, children: /* @__PURE__ */ jsxs43(
          Card10,
          {
            onClick: () => !disabled && handleClick(link),
            padding: "sm",
            radius: "md",
            withBorder: !0,
            h: "100%",
            className: classNames7(commonStyles_module_default.hoverItem, {
              [commonStyles_module_default.disabled]: disabled
            }),
            children: [
              /* @__PURE__ */ jsx51(
                Card10.Section,
                {
                  withBorder: !0,
                  inheritPadding: !0,
                  py: "xs",
                  className: commonStyles_module_default.lightNavyBg,
                  children: /* @__PURE__ */ jsx51(Text19, { fw: "bold", children: title })
                }
              ),
              /* @__PURE__ */ jsxs43("div", { className: landingPage_module_default.homeTile, children: [
                /* @__PURE__ */ jsx51(Group17, { className: landingPage_module_default.left, children: /* @__PURE__ */ jsx51(Icon, { size: 80, stroke: 1 }) }),
                /* @__PURE__ */ jsx51(Group17, { className: landingPage_module_default.right, children: /* @__PURE__ */ jsx51(Text19, { size: "sm", children: description }) })
              ] })
            ]
          }
        ) })
      },
      `home-tile-${title}`
    )
  ) }) });
};

// app/assets/careerResults.png
var careerResults_default = "/build/_assets/careerResults-IBWDKUKK.png";

// app/assets/interviewQuestion.png
var interviewQuestion_default = "/build/_assets/interviewQuestion-IXIH7TL6.png";

// app/assets/careerTest.png
var careerTest_default = "/build/_assets/careerTest-3NZG5C5Q.png";

// app/assets/industryInsights.png
var industryInsights_default = "/build/_assets/industryInsights-B4A3K24F.png";

// app/assets/network.png
var network_default = "/build/_assets/network-27EU5YPF.png";

// app/shared/constants/landingPageConstants.ts
var landingPageSlides = [
  {
    title: "Take A Quick",
    subTitle: "Career26 Test",
    image: careerTest_default
  },
  {
    title: "Get Your",
    subTitle: "Personalised Career Advice",
    image: careerResults_default
  },
  {
    title: "Explore Industry",
    subTitle: "Insights and Guidance",
    image: industryInsights_default
  },
  {
    title: "Practice Interviews",
    subTitle: "With Real-time Feedback",
    image: interviewQuestion_default
  },
  {
    title: "Find A Mentor",
    subTitle: "In Our Global Network",
    image: network_default
  }
];

// app/routes/_index.tsx
import { jsx as jsx52, jsxs as jsxs44 } from "react/jsx-runtime";
var Index5 = () => {
  let { loading, authenticated } = usePageSetup();
  return loading ? /* @__PURE__ */ jsx52(LoadingLens, {}) : /* @__PURE__ */ jsx52(Shell, { children: /* @__PURE__ */ jsxs44("div", { className: classNames8({ [landingPage_module_default.container]: !authenticated }), children: [
    !authenticated && /* @__PURE__ */ jsx52(FeatureSlider, { slides: landingPageSlides }),
    /* @__PURE__ */ jsx52(HomeTiles, {})
  ] }) });
}, index_default = Index5;

// server-assets-manifest:@remix-run/dev/assets-manifest
var assets_manifest_default = { entry: { module: "/build/entry.client-HP35LDN4.js", imports: ["/build/_shared/chunk-R7DKMHBB.js"] }, routes: { root: { id: "root", parentId: void 0, path: "", index: void 0, caseSensitive: void 0, module: "/build/root-XHWLKD67.js", imports: ["/build/_shared/chunk-5NMT3SXO.js", "/build/_shared/chunk-LK2IODK6.js", "/build/_shared/chunk-2W7QTXDV.js"], hasAction: !1, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/_index": { id: "routes/_index", parentId: "root", path: void 0, index: !0, caseSensitive: void 0, module: "/build/routes/_index-QFQ6LZOP.js", imports: ["/build/_shared/chunk-QTXYYKK6.js", "/build/_shared/chunk-WFOEOJ23.js", "/build/_shared/chunk-EKS5ZLJE.js"], hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/career-test": { id: "routes/career-test", parentId: "root", path: "career-test", index: void 0, caseSensitive: void 0, module: "/build/routes/career-test-KLNHFDT2.js", imports: ["/build/_shared/chunk-R3UJVCPU.js", "/build/_shared/chunk-WFOEOJ23.js", "/build/_shared/chunk-EKS5ZLJE.js"], hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/overview.$": { id: "routes/overview.$", parentId: "root", path: "overview/*", index: void 0, caseSensitive: void 0, module: "/build/routes/overview.$-IMK5EG56.js", imports: ["/build/_shared/chunk-R3UJVCPU.js", "/build/_shared/chunk-QTXYYKK6.js", "/build/_shared/chunk-WFOEOJ23.js", "/build/_shared/chunk-EKS5ZLJE.js"], hasAction: !1, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/questions.$": { id: "routes/questions.$", parentId: "root", path: "questions/*", index: void 0, caseSensitive: void 0, module: "/build/routes/questions.$-S77ORB3C.js", imports: ["/build/_shared/chunk-QTXYYKK6.js", "/build/_shared/chunk-WFOEOJ23.js", "/build/_shared/chunk-EKS5ZLJE.js"], hasAction: !1, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/settings": { id: "routes/settings", parentId: "root", path: "settings", index: void 0, caseSensitive: void 0, module: "/build/routes/settings-YB4FAWYE.js", imports: ["/build/_shared/chunk-EKS5ZLJE.js"], hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 } }, version: "fb4d3724", hmr: void 0, url: "/build/manifest-FB4D3724.js" };

// server-entry-module:@remix-run/dev/server-build
var mode = "production", assetsBuildDirectory = "public/build", future = { v3_fetcherPersist: !1, v3_relativeSplatPath: !1 }, publicPath = "/build/", entry = { module: entry_server_exports }, routes = {
  root: {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: root_exports
  },
  "routes/career-test": {
    id: "routes/career-test",
    parentId: "root",
    path: "career-test",
    index: void 0,
    caseSensitive: void 0,
    module: career_test_exports
  },
  "routes/questions.$": {
    id: "routes/questions.$",
    parentId: "root",
    path: "questions/*",
    index: void 0,
    caseSensitive: void 0,
    module: questions_exports
  },
  "routes/overview.$": {
    id: "routes/overview.$",
    parentId: "root",
    path: "overview/*",
    index: void 0,
    caseSensitive: void 0,
    module: overview_exports
  },
  "routes/settings": {
    id: "routes/settings",
    parentId: "root",
    path: "settings",
    index: void 0,
    caseSensitive: void 0,
    module: settings_exports
  },
  "routes/_index": {
    id: "routes/_index",
    parentId: "root",
    path: void 0,
    index: !0,
    caseSensitive: void 0,
    module: index_exports
  }
};
export {
  assets_manifest_default as assets,
  assetsBuildDirectory,
  entry,
  future,
  mode,
  publicPath,
  routes
};
/*! Bundled license information:

@remix-run/node/dist/globals.js:
  (**
   * @remix-run/node v2.4.0
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/node/dist/crypto.js:
  (**
   * @remix-run/node v2.4.0
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/node/dist/implementations.js:
  (**
   * @remix-run/node v2.4.0
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/node/dist/sessions/fileStorage.js:
  (**
   * @remix-run/node v2.4.0
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/node/dist/stream.js:
  (**
   * @remix-run/node v2.4.0
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/node/dist/upload/fileUploadHandler.js:
  (**
   * @remix-run/node v2.4.0
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/node/dist/index.js:
  (**
   * @remix-run/node v2.4.0
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

react-dom/cjs/react-dom-server-legacy.node.production.min.js:
  (**
   * @license React
   * react-dom-server-legacy.node.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react-dom/cjs/react-dom-server.node.production.min.js:
  (**
   * @license React
   * react-dom-server.node.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

@remix-run/react/dist/esm/_virtual/_rollupPluginBabelHelpers.js:
  (**
   * @remix-run/react v2.4.0
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/react/dist/esm/invariant.js:
  (**
   * @remix-run/react v2.4.0
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/react/dist/esm/routeModules.js:
  (**
   * @remix-run/react v2.4.0
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/react/dist/esm/links.js:
  (**
   * @remix-run/react v2.4.0
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/react/dist/esm/markup.js:
  (**
   * @remix-run/react v2.4.0
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/react/dist/esm/components.js:
  (**
   * @remix-run/react v2.4.0
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/react/dist/esm/errorBoundaries.js:
  (**
   * @remix-run/react v2.4.0
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/react/dist/esm/fallback.js:
  (**
   * @remix-run/react v2.4.0
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/react/dist/esm/routes.js:
  (**
   * @remix-run/react v2.4.0
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/react/dist/esm/scroll-restoration.js:
  (**
   * @remix-run/react v2.4.0
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/react/dist/esm/server.js:
  (**
   * @remix-run/react v2.4.0
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/react/dist/esm/index.js:
  (**
   * @remix-run/react v2.4.0
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)
*/
