var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", {value: true});
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[Object.keys(cb)[0]])((mod = {exports: {}}).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, {get: all[name], enumerable: true});
};
var __reExport = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, {get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable});
  }
  return target;
};
var __toModule = (module2) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? {get: () => module2.default, enumerable: true} : {value: module2, enumerable: true})), module2);
};

// node_modules/clipboard-copy/index.js
var require_clipboard_copy = __commonJS({
  "node_modules/clipboard-copy/index.js"(exports, module2) {
    module2.exports = clipboardCopy;
    function clipboardCopy(text) {
      if (navigator.clipboard) {
        return navigator.clipboard.writeText(text).catch(function(err) {
          throw err !== void 0 ? err : new DOMException("The request is not allowed", "NotAllowedError");
        });
      }
      var span = document.createElement("span");
      span.textContent = text;
      span.style.whiteSpace = "pre";
      span.style.webkitUserSelect = "auto";
      span.style.userSelect = "all";
      document.body.appendChild(span);
      var selection = window.getSelection();
      var range = window.document.createRange();
      selection.removeAllRanges();
      range.selectNode(span);
      selection.addRange(range);
      var success = false;
      try {
        success = window.document.execCommand("copy");
      } catch (err) {
        console.log("error", err);
      }
      selection.removeAllRanges();
      window.document.body.removeChild(span);
      return success ? Promise.resolve() : Promise.reject(new DOMException("The request is not allowed", "NotAllowedError"));
    }
  }
});

// .svelte-kit/vercel/entry.js
__markAsModule(exports);
__export(exports, {
  default: () => entry_default
});

// node_modules/@sveltejs/kit/dist/node.js
function getRawBody(req) {
  return new Promise((fulfil, reject) => {
    const h = req.headers;
    if (!h["content-type"]) {
      return fulfil(null);
    }
    req.on("error", reject);
    const length = Number(h["content-length"]);
    if (isNaN(length) && h["transfer-encoding"] == null) {
      return fulfil(null);
    }
    let data2 = new Uint8Array(length || 0);
    if (length > 0) {
      let offset = 0;
      req.on("data", (chunk) => {
        const new_len = offset + Buffer.byteLength(chunk);
        if (new_len > length) {
          return reject({
            status: 413,
            reason: 'Exceeded "Content-Length" limit'
          });
        }
        data2.set(chunk, offset);
        offset = new_len;
      });
    } else {
      req.on("data", (chunk) => {
        const new_data = new Uint8Array(data2.length + chunk.length);
        new_data.set(data2, 0);
        new_data.set(chunk, data2.length);
        data2 = new_data;
      });
    }
    req.on("end", () => {
      const [type] = h["content-type"].split(/;\s*/);
      if (type === "application/octet-stream") {
        return fulfil(data2);
      }
      const encoding = h["content-encoding"] || "utf-8";
      fulfil(new TextDecoder(encoding).decode(data2));
    });
  });
}

// node_modules/@sveltejs/kit/dist/install-fetch.js
var import_http = __toModule(require("http"));
var import_https = __toModule(require("https"));
var import_zlib = __toModule(require("zlib"));
var import_stream = __toModule(require("stream"));
var import_util = __toModule(require("util"));
var import_crypto = __toModule(require("crypto"));
var import_url = __toModule(require("url"));
function dataUriToBuffer(uri) {
  if (!/^data:/i.test(uri)) {
    throw new TypeError('`uri` does not appear to be a Data URI (must begin with "data:")');
  }
  uri = uri.replace(/\r?\n/g, "");
  const firstComma = uri.indexOf(",");
  if (firstComma === -1 || firstComma <= 4) {
    throw new TypeError("malformed data: URI");
  }
  const meta = uri.substring(5, firstComma).split(";");
  let charset = "";
  let base64 = false;
  const type = meta[0] || "text/plain";
  let typeFull = type;
  for (let i = 1; i < meta.length; i++) {
    if (meta[i] === "base64") {
      base64 = true;
    } else {
      typeFull += `;${meta[i]}`;
      if (meta[i].indexOf("charset=") === 0) {
        charset = meta[i].substring(8);
      }
    }
  }
  if (!meta[0] && !charset.length) {
    typeFull += ";charset=US-ASCII";
    charset = "US-ASCII";
  }
  const encoding = base64 ? "base64" : "ascii";
  const data2 = unescape(uri.substring(firstComma + 1));
  const buffer = Buffer.from(data2, encoding);
  buffer.type = type;
  buffer.typeFull = typeFull;
  buffer.charset = charset;
  return buffer;
}
var src = dataUriToBuffer;
var {Readable} = import_stream.default;
var wm = new WeakMap();
async function* read(parts) {
  for (const part of parts) {
    if ("stream" in part) {
      yield* part.stream();
    } else {
      yield part;
    }
  }
}
var Blob = class {
  constructor(blobParts = [], options2 = {}) {
    let size = 0;
    const parts = blobParts.map((element) => {
      let buffer;
      if (element instanceof Buffer) {
        buffer = element;
      } else if (ArrayBuffer.isView(element)) {
        buffer = Buffer.from(element.buffer, element.byteOffset, element.byteLength);
      } else if (element instanceof ArrayBuffer) {
        buffer = Buffer.from(element);
      } else if (element instanceof Blob) {
        buffer = element;
      } else {
        buffer = Buffer.from(typeof element === "string" ? element : String(element));
      }
      size += buffer.length || buffer.size || 0;
      return buffer;
    });
    const type = options2.type === void 0 ? "" : String(options2.type).toLowerCase();
    wm.set(this, {
      type: /[^\u0020-\u007E]/.test(type) ? "" : type,
      size,
      parts
    });
  }
  get size() {
    return wm.get(this).size;
  }
  get type() {
    return wm.get(this).type;
  }
  async text() {
    return Buffer.from(await this.arrayBuffer()).toString();
  }
  async arrayBuffer() {
    const data2 = new Uint8Array(this.size);
    let offset = 0;
    for await (const chunk of this.stream()) {
      data2.set(chunk, offset);
      offset += chunk.length;
    }
    return data2.buffer;
  }
  stream() {
    return Readable.from(read(wm.get(this).parts));
  }
  slice(start = 0, end = this.size, type = "") {
    const {size} = this;
    let relativeStart = start < 0 ? Math.max(size + start, 0) : Math.min(start, size);
    let relativeEnd = end < 0 ? Math.max(size + end, 0) : Math.min(end, size);
    const span = Math.max(relativeEnd - relativeStart, 0);
    const parts = wm.get(this).parts.values();
    const blobParts = [];
    let added = 0;
    for (const part of parts) {
      const size2 = ArrayBuffer.isView(part) ? part.byteLength : part.size;
      if (relativeStart && size2 <= relativeStart) {
        relativeStart -= size2;
        relativeEnd -= size2;
      } else {
        const chunk = part.slice(relativeStart, Math.min(size2, relativeEnd));
        blobParts.push(chunk);
        added += ArrayBuffer.isView(chunk) ? chunk.byteLength : chunk.size;
        relativeStart = 0;
        if (added >= span) {
          break;
        }
      }
    }
    const blob = new Blob([], {type: String(type).toLowerCase()});
    Object.assign(wm.get(blob), {size: span, parts: blobParts});
    return blob;
  }
  get [Symbol.toStringTag]() {
    return "Blob";
  }
  static [Symbol.hasInstance](object) {
    return object && typeof object === "object" && typeof object.stream === "function" && object.stream.length === 0 && typeof object.constructor === "function" && /^(Blob|File)$/.test(object[Symbol.toStringTag]);
  }
};
Object.defineProperties(Blob.prototype, {
  size: {enumerable: true},
  type: {enumerable: true},
  slice: {enumerable: true}
});
var fetchBlob = Blob;
var FetchBaseError = class extends Error {
  constructor(message, type) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
    this.type = type;
  }
  get name() {
    return this.constructor.name;
  }
  get [Symbol.toStringTag]() {
    return this.constructor.name;
  }
};
var FetchError = class extends FetchBaseError {
  constructor(message, type, systemError) {
    super(message, type);
    if (systemError) {
      this.code = this.errno = systemError.code;
      this.erroredSysCall = systemError.syscall;
    }
  }
};
var NAME = Symbol.toStringTag;
var isURLSearchParameters = (object) => {
  return typeof object === "object" && typeof object.append === "function" && typeof object.delete === "function" && typeof object.get === "function" && typeof object.getAll === "function" && typeof object.has === "function" && typeof object.set === "function" && typeof object.sort === "function" && object[NAME] === "URLSearchParams";
};
var isBlob = (object) => {
  return typeof object === "object" && typeof object.arrayBuffer === "function" && typeof object.type === "string" && typeof object.stream === "function" && typeof object.constructor === "function" && /^(Blob|File)$/.test(object[NAME]);
};
function isFormData(object) {
  return typeof object === "object" && typeof object.append === "function" && typeof object.set === "function" && typeof object.get === "function" && typeof object.getAll === "function" && typeof object.delete === "function" && typeof object.keys === "function" && typeof object.values === "function" && typeof object.entries === "function" && typeof object.constructor === "function" && object[NAME] === "FormData";
}
var isAbortSignal = (object) => {
  return typeof object === "object" && object[NAME] === "AbortSignal";
};
var carriage = "\r\n";
var dashes = "-".repeat(2);
var carriageLength = Buffer.byteLength(carriage);
var getFooter = (boundary) => `${dashes}${boundary}${dashes}${carriage.repeat(2)}`;
function getHeader(boundary, name, field) {
  let header = "";
  header += `${dashes}${boundary}${carriage}`;
  header += `Content-Disposition: form-data; name="${name}"`;
  if (isBlob(field)) {
    header += `; filename="${field.name}"${carriage}`;
    header += `Content-Type: ${field.type || "application/octet-stream"}`;
  }
  return `${header}${carriage.repeat(2)}`;
}
var getBoundary = () => (0, import_crypto.randomBytes)(8).toString("hex");
async function* formDataIterator(form, boundary) {
  for (const [name, value] of form) {
    yield getHeader(boundary, name, value);
    if (isBlob(value)) {
      yield* value.stream();
    } else {
      yield value;
    }
    yield carriage;
  }
  yield getFooter(boundary);
}
function getFormDataLength(form, boundary) {
  let length = 0;
  for (const [name, value] of form) {
    length += Buffer.byteLength(getHeader(boundary, name, value));
    if (isBlob(value)) {
      length += value.size;
    } else {
      length += Buffer.byteLength(String(value));
    }
    length += carriageLength;
  }
  length += Buffer.byteLength(getFooter(boundary));
  return length;
}
var INTERNALS$2 = Symbol("Body internals");
var Body = class {
  constructor(body, {
    size = 0
  } = {}) {
    let boundary = null;
    if (body === null) {
      body = null;
    } else if (isURLSearchParameters(body)) {
      body = Buffer.from(body.toString());
    } else if (isBlob(body))
      ;
    else if (Buffer.isBuffer(body))
      ;
    else if (import_util.types.isAnyArrayBuffer(body)) {
      body = Buffer.from(body);
    } else if (ArrayBuffer.isView(body)) {
      body = Buffer.from(body.buffer, body.byteOffset, body.byteLength);
    } else if (body instanceof import_stream.default)
      ;
    else if (isFormData(body)) {
      boundary = `NodeFetchFormDataBoundary${getBoundary()}`;
      body = import_stream.default.Readable.from(formDataIterator(body, boundary));
    } else {
      body = Buffer.from(String(body));
    }
    this[INTERNALS$2] = {
      body,
      boundary,
      disturbed: false,
      error: null
    };
    this.size = size;
    if (body instanceof import_stream.default) {
      body.on("error", (err) => {
        const error3 = err instanceof FetchBaseError ? err : new FetchError(`Invalid response body while trying to fetch ${this.url}: ${err.message}`, "system", err);
        this[INTERNALS$2].error = error3;
      });
    }
  }
  get body() {
    return this[INTERNALS$2].body;
  }
  get bodyUsed() {
    return this[INTERNALS$2].disturbed;
  }
  async arrayBuffer() {
    const {buffer, byteOffset, byteLength} = await consumeBody(this);
    return buffer.slice(byteOffset, byteOffset + byteLength);
  }
  async blob() {
    const ct = this.headers && this.headers.get("content-type") || this[INTERNALS$2].body && this[INTERNALS$2].body.type || "";
    const buf = await this.buffer();
    return new fetchBlob([buf], {
      type: ct
    });
  }
  async json() {
    const buffer = await consumeBody(this);
    return JSON.parse(buffer.toString());
  }
  async text() {
    const buffer = await consumeBody(this);
    return buffer.toString();
  }
  buffer() {
    return consumeBody(this);
  }
};
Object.defineProperties(Body.prototype, {
  body: {enumerable: true},
  bodyUsed: {enumerable: true},
  arrayBuffer: {enumerable: true},
  blob: {enumerable: true},
  json: {enumerable: true},
  text: {enumerable: true}
});
async function consumeBody(data2) {
  if (data2[INTERNALS$2].disturbed) {
    throw new TypeError(`body used already for: ${data2.url}`);
  }
  data2[INTERNALS$2].disturbed = true;
  if (data2[INTERNALS$2].error) {
    throw data2[INTERNALS$2].error;
  }
  let {body} = data2;
  if (body === null) {
    return Buffer.alloc(0);
  }
  if (isBlob(body)) {
    body = body.stream();
  }
  if (Buffer.isBuffer(body)) {
    return body;
  }
  if (!(body instanceof import_stream.default)) {
    return Buffer.alloc(0);
  }
  const accum = [];
  let accumBytes = 0;
  try {
    for await (const chunk of body) {
      if (data2.size > 0 && accumBytes + chunk.length > data2.size) {
        const err = new FetchError(`content size at ${data2.url} over limit: ${data2.size}`, "max-size");
        body.destroy(err);
        throw err;
      }
      accumBytes += chunk.length;
      accum.push(chunk);
    }
  } catch (error3) {
    if (error3 instanceof FetchBaseError) {
      throw error3;
    } else {
      throw new FetchError(`Invalid response body while trying to fetch ${data2.url}: ${error3.message}`, "system", error3);
    }
  }
  if (body.readableEnded === true || body._readableState.ended === true) {
    try {
      if (accum.every((c) => typeof c === "string")) {
        return Buffer.from(accum.join(""));
      }
      return Buffer.concat(accum, accumBytes);
    } catch (error3) {
      throw new FetchError(`Could not create Buffer from response body for ${data2.url}: ${error3.message}`, "system", error3);
    }
  } else {
    throw new FetchError(`Premature close of server response while trying to fetch ${data2.url}`);
  }
}
var clone = (instance, highWaterMark) => {
  let p1;
  let p2;
  let {body} = instance;
  if (instance.bodyUsed) {
    throw new Error("cannot clone body after it is used");
  }
  if (body instanceof import_stream.default && typeof body.getBoundary !== "function") {
    p1 = new import_stream.PassThrough({highWaterMark});
    p2 = new import_stream.PassThrough({highWaterMark});
    body.pipe(p1);
    body.pipe(p2);
    instance[INTERNALS$2].body = p1;
    body = p2;
  }
  return body;
};
var extractContentType = (body, request) => {
  if (body === null) {
    return null;
  }
  if (typeof body === "string") {
    return "text/plain;charset=UTF-8";
  }
  if (isURLSearchParameters(body)) {
    return "application/x-www-form-urlencoded;charset=UTF-8";
  }
  if (isBlob(body)) {
    return body.type || null;
  }
  if (Buffer.isBuffer(body) || import_util.types.isAnyArrayBuffer(body) || ArrayBuffer.isView(body)) {
    return null;
  }
  if (body && typeof body.getBoundary === "function") {
    return `multipart/form-data;boundary=${body.getBoundary()}`;
  }
  if (isFormData(body)) {
    return `multipart/form-data; boundary=${request[INTERNALS$2].boundary}`;
  }
  if (body instanceof import_stream.default) {
    return null;
  }
  return "text/plain;charset=UTF-8";
};
var getTotalBytes = (request) => {
  const {body} = request;
  if (body === null) {
    return 0;
  }
  if (isBlob(body)) {
    return body.size;
  }
  if (Buffer.isBuffer(body)) {
    return body.length;
  }
  if (body && typeof body.getLengthSync === "function") {
    return body.hasKnownLength && body.hasKnownLength() ? body.getLengthSync() : null;
  }
  if (isFormData(body)) {
    return getFormDataLength(request[INTERNALS$2].boundary);
  }
  return null;
};
var writeToStream = (dest, {body}) => {
  if (body === null) {
    dest.end();
  } else if (isBlob(body)) {
    body.stream().pipe(dest);
  } else if (Buffer.isBuffer(body)) {
    dest.write(body);
    dest.end();
  } else {
    body.pipe(dest);
  }
};
var validateHeaderName = typeof import_http.default.validateHeaderName === "function" ? import_http.default.validateHeaderName : (name) => {
  if (!/^[\^`\-\w!#$%&'*+.|~]+$/.test(name)) {
    const err = new TypeError(`Header name must be a valid HTTP token [${name}]`);
    Object.defineProperty(err, "code", {value: "ERR_INVALID_HTTP_TOKEN"});
    throw err;
  }
};
var validateHeaderValue = typeof import_http.default.validateHeaderValue === "function" ? import_http.default.validateHeaderValue : (name, value) => {
  if (/[^\t\u0020-\u007E\u0080-\u00FF]/.test(value)) {
    const err = new TypeError(`Invalid character in header content ["${name}"]`);
    Object.defineProperty(err, "code", {value: "ERR_INVALID_CHAR"});
    throw err;
  }
};
var Headers = class extends URLSearchParams {
  constructor(init2) {
    let result = [];
    if (init2 instanceof Headers) {
      const raw = init2.raw();
      for (const [name, values] of Object.entries(raw)) {
        result.push(...values.map((value) => [name, value]));
      }
    } else if (init2 == null)
      ;
    else if (typeof init2 === "object" && !import_util.types.isBoxedPrimitive(init2)) {
      const method = init2[Symbol.iterator];
      if (method == null) {
        result.push(...Object.entries(init2));
      } else {
        if (typeof method !== "function") {
          throw new TypeError("Header pairs must be iterable");
        }
        result = [...init2].map((pair) => {
          if (typeof pair !== "object" || import_util.types.isBoxedPrimitive(pair)) {
            throw new TypeError("Each header pair must be an iterable object");
          }
          return [...pair];
        }).map((pair) => {
          if (pair.length !== 2) {
            throw new TypeError("Each header pair must be a name/value tuple");
          }
          return [...pair];
        });
      }
    } else {
      throw new TypeError("Failed to construct 'Headers': The provided value is not of type '(sequence<sequence<ByteString>> or record<ByteString, ByteString>)");
    }
    result = result.length > 0 ? result.map(([name, value]) => {
      validateHeaderName(name);
      validateHeaderValue(name, String(value));
      return [String(name).toLowerCase(), String(value)];
    }) : void 0;
    super(result);
    return new Proxy(this, {
      get(target, p, receiver) {
        switch (p) {
          case "append":
          case "set":
            return (name, value) => {
              validateHeaderName(name);
              validateHeaderValue(name, String(value));
              return URLSearchParams.prototype[p].call(receiver, String(name).toLowerCase(), String(value));
            };
          case "delete":
          case "has":
          case "getAll":
            return (name) => {
              validateHeaderName(name);
              return URLSearchParams.prototype[p].call(receiver, String(name).toLowerCase());
            };
          case "keys":
            return () => {
              target.sort();
              return new Set(URLSearchParams.prototype.keys.call(target)).keys();
            };
          default:
            return Reflect.get(target, p, receiver);
        }
      }
    });
  }
  get [Symbol.toStringTag]() {
    return this.constructor.name;
  }
  toString() {
    return Object.prototype.toString.call(this);
  }
  get(name) {
    const values = this.getAll(name);
    if (values.length === 0) {
      return null;
    }
    let value = values.join(", ");
    if (/^content-encoding$/i.test(name)) {
      value = value.toLowerCase();
    }
    return value;
  }
  forEach(callback) {
    for (const name of this.keys()) {
      callback(this.get(name), name);
    }
  }
  *values() {
    for (const name of this.keys()) {
      yield this.get(name);
    }
  }
  *entries() {
    for (const name of this.keys()) {
      yield [name, this.get(name)];
    }
  }
  [Symbol.iterator]() {
    return this.entries();
  }
  raw() {
    return [...this.keys()].reduce((result, key) => {
      result[key] = this.getAll(key);
      return result;
    }, {});
  }
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return [...this.keys()].reduce((result, key) => {
      const values = this.getAll(key);
      if (key === "host") {
        result[key] = values[0];
      } else {
        result[key] = values.length > 1 ? values : values[0];
      }
      return result;
    }, {});
  }
};
Object.defineProperties(Headers.prototype, ["get", "entries", "forEach", "values"].reduce((result, property) => {
  result[property] = {enumerable: true};
  return result;
}, {}));
function fromRawHeaders(headers = []) {
  return new Headers(headers.reduce((result, value, index2, array) => {
    if (index2 % 2 === 0) {
      result.push(array.slice(index2, index2 + 2));
    }
    return result;
  }, []).filter(([name, value]) => {
    try {
      validateHeaderName(name);
      validateHeaderValue(name, String(value));
      return true;
    } catch {
      return false;
    }
  }));
}
var redirectStatus = new Set([301, 302, 303, 307, 308]);
var isRedirect = (code) => {
  return redirectStatus.has(code);
};
var INTERNALS$1 = Symbol("Response internals");
var Response2 = class extends Body {
  constructor(body = null, options2 = {}) {
    super(body, options2);
    const status = options2.status || 200;
    const headers = new Headers(options2.headers);
    if (body !== null && !headers.has("Content-Type")) {
      const contentType = extractContentType(body);
      if (contentType) {
        headers.append("Content-Type", contentType);
      }
    }
    this[INTERNALS$1] = {
      url: options2.url,
      status,
      statusText: options2.statusText || "",
      headers,
      counter: options2.counter,
      highWaterMark: options2.highWaterMark
    };
  }
  get url() {
    return this[INTERNALS$1].url || "";
  }
  get status() {
    return this[INTERNALS$1].status;
  }
  get ok() {
    return this[INTERNALS$1].status >= 200 && this[INTERNALS$1].status < 300;
  }
  get redirected() {
    return this[INTERNALS$1].counter > 0;
  }
  get statusText() {
    return this[INTERNALS$1].statusText;
  }
  get headers() {
    return this[INTERNALS$1].headers;
  }
  get highWaterMark() {
    return this[INTERNALS$1].highWaterMark;
  }
  clone() {
    return new Response2(clone(this, this.highWaterMark), {
      url: this.url,
      status: this.status,
      statusText: this.statusText,
      headers: this.headers,
      ok: this.ok,
      redirected: this.redirected,
      size: this.size
    });
  }
  static redirect(url, status = 302) {
    if (!isRedirect(status)) {
      throw new RangeError('Failed to execute "redirect" on "response": Invalid status code');
    }
    return new Response2(null, {
      headers: {
        location: new URL(url).toString()
      },
      status
    });
  }
  get [Symbol.toStringTag]() {
    return "Response";
  }
};
Object.defineProperties(Response2.prototype, {
  url: {enumerable: true},
  status: {enumerable: true},
  ok: {enumerable: true},
  redirected: {enumerable: true},
  statusText: {enumerable: true},
  headers: {enumerable: true},
  clone: {enumerable: true}
});
var getSearch = (parsedURL) => {
  if (parsedURL.search) {
    return parsedURL.search;
  }
  const lastOffset = parsedURL.href.length - 1;
  const hash2 = parsedURL.hash || (parsedURL.href[lastOffset] === "#" ? "#" : "");
  return parsedURL.href[lastOffset - hash2.length] === "?" ? "?" : "";
};
var INTERNALS = Symbol("Request internals");
var isRequest = (object) => {
  return typeof object === "object" && typeof object[INTERNALS] === "object";
};
var Request = class extends Body {
  constructor(input, init2 = {}) {
    let parsedURL;
    if (isRequest(input)) {
      parsedURL = new URL(input.url);
    } else {
      parsedURL = new URL(input);
      input = {};
    }
    let method = init2.method || input.method || "GET";
    method = method.toUpperCase();
    if ((init2.body != null || isRequest(input)) && input.body !== null && (method === "GET" || method === "HEAD")) {
      throw new TypeError("Request with GET/HEAD method cannot have body");
    }
    const inputBody = init2.body ? init2.body : isRequest(input) && input.body !== null ? clone(input) : null;
    super(inputBody, {
      size: init2.size || input.size || 0
    });
    const headers = new Headers(init2.headers || input.headers || {});
    if (inputBody !== null && !headers.has("Content-Type")) {
      const contentType = extractContentType(inputBody, this);
      if (contentType) {
        headers.append("Content-Type", contentType);
      }
    }
    let signal = isRequest(input) ? input.signal : null;
    if ("signal" in init2) {
      signal = init2.signal;
    }
    if (signal !== null && !isAbortSignal(signal)) {
      throw new TypeError("Expected signal to be an instanceof AbortSignal");
    }
    this[INTERNALS] = {
      method,
      redirect: init2.redirect || input.redirect || "follow",
      headers,
      parsedURL,
      signal
    };
    this.follow = init2.follow === void 0 ? input.follow === void 0 ? 20 : input.follow : init2.follow;
    this.compress = init2.compress === void 0 ? input.compress === void 0 ? true : input.compress : init2.compress;
    this.counter = init2.counter || input.counter || 0;
    this.agent = init2.agent || input.agent;
    this.highWaterMark = init2.highWaterMark || input.highWaterMark || 16384;
    this.insecureHTTPParser = init2.insecureHTTPParser || input.insecureHTTPParser || false;
  }
  get method() {
    return this[INTERNALS].method;
  }
  get url() {
    return (0, import_url.format)(this[INTERNALS].parsedURL);
  }
  get headers() {
    return this[INTERNALS].headers;
  }
  get redirect() {
    return this[INTERNALS].redirect;
  }
  get signal() {
    return this[INTERNALS].signal;
  }
  clone() {
    return new Request(this);
  }
  get [Symbol.toStringTag]() {
    return "Request";
  }
};
Object.defineProperties(Request.prototype, {
  method: {enumerable: true},
  url: {enumerable: true},
  headers: {enumerable: true},
  redirect: {enumerable: true},
  clone: {enumerable: true},
  signal: {enumerable: true}
});
var getNodeRequestOptions = (request) => {
  const {parsedURL} = request[INTERNALS];
  const headers = new Headers(request[INTERNALS].headers);
  if (!headers.has("Accept")) {
    headers.set("Accept", "*/*");
  }
  let contentLengthValue = null;
  if (request.body === null && /^(post|put)$/i.test(request.method)) {
    contentLengthValue = "0";
  }
  if (request.body !== null) {
    const totalBytes = getTotalBytes(request);
    if (typeof totalBytes === "number" && !Number.isNaN(totalBytes)) {
      contentLengthValue = String(totalBytes);
    }
  }
  if (contentLengthValue) {
    headers.set("Content-Length", contentLengthValue);
  }
  if (!headers.has("User-Agent")) {
    headers.set("User-Agent", "node-fetch");
  }
  if (request.compress && !headers.has("Accept-Encoding")) {
    headers.set("Accept-Encoding", "gzip,deflate,br");
  }
  let {agent} = request;
  if (typeof agent === "function") {
    agent = agent(parsedURL);
  }
  if (!headers.has("Connection") && !agent) {
    headers.set("Connection", "close");
  }
  const search = getSearch(parsedURL);
  const requestOptions = {
    path: parsedURL.pathname + search,
    pathname: parsedURL.pathname,
    hostname: parsedURL.hostname,
    protocol: parsedURL.protocol,
    port: parsedURL.port,
    hash: parsedURL.hash,
    search: parsedURL.search,
    query: parsedURL.query,
    href: parsedURL.href,
    method: request.method,
    headers: headers[Symbol.for("nodejs.util.inspect.custom")](),
    insecureHTTPParser: request.insecureHTTPParser,
    agent
  };
  return requestOptions;
};
var AbortError = class extends FetchBaseError {
  constructor(message, type = "aborted") {
    super(message, type);
  }
};
var supportedSchemas = new Set(["data:", "http:", "https:"]);
async function fetch2(url, options_) {
  return new Promise((resolve2, reject) => {
    const request = new Request(url, options_);
    const options2 = getNodeRequestOptions(request);
    if (!supportedSchemas.has(options2.protocol)) {
      throw new TypeError(`node-fetch cannot load ${url}. URL scheme "${options2.protocol.replace(/:$/, "")}" is not supported.`);
    }
    if (options2.protocol === "data:") {
      const data2 = src(request.url);
      const response2 = new Response2(data2, {headers: {"Content-Type": data2.typeFull}});
      resolve2(response2);
      return;
    }
    const send = (options2.protocol === "https:" ? import_https.default : import_http.default).request;
    const {signal} = request;
    let response = null;
    const abort = () => {
      const error3 = new AbortError("The operation was aborted.");
      reject(error3);
      if (request.body && request.body instanceof import_stream.default.Readable) {
        request.body.destroy(error3);
      }
      if (!response || !response.body) {
        return;
      }
      response.body.emit("error", error3);
    };
    if (signal && signal.aborted) {
      abort();
      return;
    }
    const abortAndFinalize = () => {
      abort();
      finalize();
    };
    const request_ = send(options2);
    if (signal) {
      signal.addEventListener("abort", abortAndFinalize);
    }
    const finalize = () => {
      request_.abort();
      if (signal) {
        signal.removeEventListener("abort", abortAndFinalize);
      }
    };
    request_.on("error", (err) => {
      reject(new FetchError(`request to ${request.url} failed, reason: ${err.message}`, "system", err));
      finalize();
    });
    request_.on("response", (response_) => {
      request_.setTimeout(0);
      const headers = fromRawHeaders(response_.rawHeaders);
      if (isRedirect(response_.statusCode)) {
        const location = headers.get("Location");
        const locationURL = location === null ? null : new URL(location, request.url);
        switch (request.redirect) {
          case "error":
            reject(new FetchError(`uri requested responds with a redirect, redirect mode is set to error: ${request.url}`, "no-redirect"));
            finalize();
            return;
          case "manual":
            if (locationURL !== null) {
              try {
                headers.set("Location", locationURL);
              } catch (error3) {
                reject(error3);
              }
            }
            break;
          case "follow": {
            if (locationURL === null) {
              break;
            }
            if (request.counter >= request.follow) {
              reject(new FetchError(`maximum redirect reached at: ${request.url}`, "max-redirect"));
              finalize();
              return;
            }
            const requestOptions = {
              headers: new Headers(request.headers),
              follow: request.follow,
              counter: request.counter + 1,
              agent: request.agent,
              compress: request.compress,
              method: request.method,
              body: request.body,
              signal: request.signal,
              size: request.size
            };
            if (response_.statusCode !== 303 && request.body && options_.body instanceof import_stream.default.Readable) {
              reject(new FetchError("Cannot follow redirect with body being a readable stream", "unsupported-redirect"));
              finalize();
              return;
            }
            if (response_.statusCode === 303 || (response_.statusCode === 301 || response_.statusCode === 302) && request.method === "POST") {
              requestOptions.method = "GET";
              requestOptions.body = void 0;
              requestOptions.headers.delete("content-length");
            }
            resolve2(fetch2(new Request(locationURL, requestOptions)));
            finalize();
            return;
          }
        }
      }
      response_.once("end", () => {
        if (signal) {
          signal.removeEventListener("abort", abortAndFinalize);
        }
      });
      let body = (0, import_stream.pipeline)(response_, new import_stream.PassThrough(), (error3) => {
        reject(error3);
      });
      if (process.version < "v12.10") {
        response_.on("aborted", abortAndFinalize);
      }
      const responseOptions = {
        url: request.url,
        status: response_.statusCode,
        statusText: response_.statusMessage,
        headers,
        size: request.size,
        counter: request.counter,
        highWaterMark: request.highWaterMark
      };
      const codings = headers.get("Content-Encoding");
      if (!request.compress || request.method === "HEAD" || codings === null || response_.statusCode === 204 || response_.statusCode === 304) {
        response = new Response2(body, responseOptions);
        resolve2(response);
        return;
      }
      const zlibOptions = {
        flush: import_zlib.default.Z_SYNC_FLUSH,
        finishFlush: import_zlib.default.Z_SYNC_FLUSH
      };
      if (codings === "gzip" || codings === "x-gzip") {
        body = (0, import_stream.pipeline)(body, import_zlib.default.createGunzip(zlibOptions), (error3) => {
          reject(error3);
        });
        response = new Response2(body, responseOptions);
        resolve2(response);
        return;
      }
      if (codings === "deflate" || codings === "x-deflate") {
        const raw = (0, import_stream.pipeline)(response_, new import_stream.PassThrough(), (error3) => {
          reject(error3);
        });
        raw.once("data", (chunk) => {
          if ((chunk[0] & 15) === 8) {
            body = (0, import_stream.pipeline)(body, import_zlib.default.createInflate(), (error3) => {
              reject(error3);
            });
          } else {
            body = (0, import_stream.pipeline)(body, import_zlib.default.createInflateRaw(), (error3) => {
              reject(error3);
            });
          }
          response = new Response2(body, responseOptions);
          resolve2(response);
        });
        return;
      }
      if (codings === "br") {
        body = (0, import_stream.pipeline)(body, import_zlib.default.createBrotliDecompress(), (error3) => {
          reject(error3);
        });
        response = new Response2(body, responseOptions);
        resolve2(response);
        return;
      }
      response = new Response2(body, responseOptions);
      resolve2(response);
    });
    writeToStream(request_, request);
  });
}
globalThis.fetch = fetch2;
globalThis.Response = Response2;
globalThis.Request = Request;
globalThis.Headers = Headers;

// node_modules/@sveltejs/kit/dist/ssr.js
var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_$";
var unsafeChars = /[<>\b\f\n\r\t\0\u2028\u2029]/g;
var reserved = /^(?:do|if|in|for|int|let|new|try|var|byte|case|char|else|enum|goto|long|this|void|with|await|break|catch|class|const|final|float|short|super|throw|while|yield|delete|double|export|import|native|return|switch|throws|typeof|boolean|default|extends|finally|package|private|abstract|continue|debugger|function|volatile|interface|protected|transient|implements|instanceof|synchronized)$/;
var escaped$1 = {
  "<": "\\u003C",
  ">": "\\u003E",
  "/": "\\u002F",
  "\\": "\\\\",
  "\b": "\\b",
  "\f": "\\f",
  "\n": "\\n",
  "\r": "\\r",
  "	": "\\t",
  "\0": "\\0",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};
var objectProtoOwnPropertyNames = Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function devalue(value) {
  var counts = new Map();
  function walk(thing) {
    if (typeof thing === "function") {
      throw new Error("Cannot stringify a function");
    }
    if (counts.has(thing)) {
      counts.set(thing, counts.get(thing) + 1);
      return;
    }
    counts.set(thing, 1);
    if (!isPrimitive(thing)) {
      var type = getType(thing);
      switch (type) {
        case "Number":
        case "String":
        case "Boolean":
        case "Date":
        case "RegExp":
          return;
        case "Array":
          thing.forEach(walk);
          break;
        case "Set":
        case "Map":
          Array.from(thing).forEach(walk);
          break;
        default:
          var proto = Object.getPrototypeOf(thing);
          if (proto !== Object.prototype && proto !== null && Object.getOwnPropertyNames(proto).sort().join("\0") !== objectProtoOwnPropertyNames) {
            throw new Error("Cannot stringify arbitrary non-POJOs");
          }
          if (Object.getOwnPropertySymbols(thing).length > 0) {
            throw new Error("Cannot stringify POJOs with symbolic keys");
          }
          Object.keys(thing).forEach(function(key) {
            return walk(thing[key]);
          });
      }
    }
  }
  walk(value);
  var names = new Map();
  Array.from(counts).filter(function(entry) {
    return entry[1] > 1;
  }).sort(function(a, b) {
    return b[1] - a[1];
  }).forEach(function(entry, i) {
    names.set(entry[0], getName(i));
  });
  function stringify(thing) {
    if (names.has(thing)) {
      return names.get(thing);
    }
    if (isPrimitive(thing)) {
      return stringifyPrimitive(thing);
    }
    var type = getType(thing);
    switch (type) {
      case "Number":
      case "String":
      case "Boolean":
        return "Object(" + stringify(thing.valueOf()) + ")";
      case "RegExp":
        return "new RegExp(" + stringifyString(thing.source) + ', "' + thing.flags + '")';
      case "Date":
        return "new Date(" + thing.getTime() + ")";
      case "Array":
        var members = thing.map(function(v, i) {
          return i in thing ? stringify(v) : "";
        });
        var tail = thing.length === 0 || thing.length - 1 in thing ? "" : ",";
        return "[" + members.join(",") + tail + "]";
      case "Set":
      case "Map":
        return "new " + type + "([" + Array.from(thing).map(stringify).join(",") + "])";
      default:
        var obj = "{" + Object.keys(thing).map(function(key) {
          return safeKey(key) + ":" + stringify(thing[key]);
        }).join(",") + "}";
        var proto = Object.getPrototypeOf(thing);
        if (proto === null) {
          return Object.keys(thing).length > 0 ? "Object.assign(Object.create(null)," + obj + ")" : "Object.create(null)";
        }
        return obj;
    }
  }
  var str = stringify(value);
  if (names.size) {
    var params_1 = [];
    var statements_1 = [];
    var values_1 = [];
    names.forEach(function(name, thing) {
      params_1.push(name);
      if (isPrimitive(thing)) {
        values_1.push(stringifyPrimitive(thing));
        return;
      }
      var type = getType(thing);
      switch (type) {
        case "Number":
        case "String":
        case "Boolean":
          values_1.push("Object(" + stringify(thing.valueOf()) + ")");
          break;
        case "RegExp":
          values_1.push(thing.toString());
          break;
        case "Date":
          values_1.push("new Date(" + thing.getTime() + ")");
          break;
        case "Array":
          values_1.push("Array(" + thing.length + ")");
          thing.forEach(function(v, i) {
            statements_1.push(name + "[" + i + "]=" + stringify(v));
          });
          break;
        case "Set":
          values_1.push("new Set");
          statements_1.push(name + "." + Array.from(thing).map(function(v) {
            return "add(" + stringify(v) + ")";
          }).join("."));
          break;
        case "Map":
          values_1.push("new Map");
          statements_1.push(name + "." + Array.from(thing).map(function(_a) {
            var k = _a[0], v = _a[1];
            return "set(" + stringify(k) + ", " + stringify(v) + ")";
          }).join("."));
          break;
        default:
          values_1.push(Object.getPrototypeOf(thing) === null ? "Object.create(null)" : "{}");
          Object.keys(thing).forEach(function(key) {
            statements_1.push("" + name + safeProp(key) + "=" + stringify(thing[key]));
          });
      }
    });
    statements_1.push("return " + str);
    return "(function(" + params_1.join(",") + "){" + statements_1.join(";") + "}(" + values_1.join(",") + "))";
  } else {
    return str;
  }
}
function getName(num) {
  var name = "";
  do {
    name = chars[num % chars.length] + name;
    num = ~~(num / chars.length) - 1;
  } while (num >= 0);
  return reserved.test(name) ? name + "_" : name;
}
function isPrimitive(thing) {
  return Object(thing) !== thing;
}
function stringifyPrimitive(thing) {
  if (typeof thing === "string")
    return stringifyString(thing);
  if (thing === void 0)
    return "void 0";
  if (thing === 0 && 1 / thing < 0)
    return "-0";
  var str = String(thing);
  if (typeof thing === "number")
    return str.replace(/^(-)?0\./, "$1.");
  return str;
}
function getType(thing) {
  return Object.prototype.toString.call(thing).slice(8, -1);
}
function escapeUnsafeChar(c) {
  return escaped$1[c] || c;
}
function escapeUnsafeChars(str) {
  return str.replace(unsafeChars, escapeUnsafeChar);
}
function safeKey(key) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key) ? key : escapeUnsafeChars(JSON.stringify(key));
}
function safeProp(key) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key) ? "." + key : "[" + escapeUnsafeChars(JSON.stringify(key)) + "]";
}
function stringifyString(str) {
  var result = '"';
  for (var i = 0; i < str.length; i += 1) {
    var char = str.charAt(i);
    var code = char.charCodeAt(0);
    if (char === '"') {
      result += '\\"';
    } else if (char in escaped$1) {
      result += escaped$1[char];
    } else if (code >= 55296 && code <= 57343) {
      var next = str.charCodeAt(i + 1);
      if (code <= 56319 && (next >= 56320 && next <= 57343)) {
        result += char + str[++i];
      } else {
        result += "\\u" + code.toString(16).toUpperCase();
      }
    } else {
      result += char;
    }
  }
  result += '"';
  return result;
}
function noop() {
}
function safe_not_equal(a, b) {
  return a != a ? b == b : a !== b || (a && typeof a === "object" || typeof a === "function");
}
var subscriber_queue = [];
function writable(value, start = noop) {
  let stop;
  const subscribers = [];
  function set(new_value) {
    if (safe_not_equal(value, new_value)) {
      value = new_value;
      if (stop) {
        const run_queue = !subscriber_queue.length;
        for (let i = 0; i < subscribers.length; i += 1) {
          const s2 = subscribers[i];
          s2[1]();
          subscriber_queue.push(s2, value);
        }
        if (run_queue) {
          for (let i = 0; i < subscriber_queue.length; i += 2) {
            subscriber_queue[i][0](subscriber_queue[i + 1]);
          }
          subscriber_queue.length = 0;
        }
      }
    }
  }
  function update2(fn) {
    set(fn(value));
  }
  function subscribe2(run2, invalidate = noop) {
    const subscriber = [run2, invalidate];
    subscribers.push(subscriber);
    if (subscribers.length === 1) {
      stop = start(set) || noop;
    }
    run2(value);
    return () => {
      const index2 = subscribers.indexOf(subscriber);
      if (index2 !== -1) {
        subscribers.splice(index2, 1);
      }
      if (subscribers.length === 0) {
        stop();
        stop = null;
      }
    };
  }
  return {set, update: update2, subscribe: subscribe2};
}
function hash(value) {
  let hash2 = 5381;
  let i = value.length;
  if (typeof value === "string") {
    while (i)
      hash2 = hash2 * 33 ^ value.charCodeAt(--i);
  } else {
    while (i)
      hash2 = hash2 * 33 ^ value[--i];
  }
  return (hash2 >>> 0).toString(36);
}
var s$1 = JSON.stringify;
async function render_response({
  options: options2,
  $session,
  page_config,
  status,
  error: error3,
  branch,
  page
}) {
  const css2 = new Set(options2.entry.css);
  const js = new Set(options2.entry.js);
  const styles = new Set();
  const serialized_data = [];
  let rendered;
  let is_private = false;
  let maxage;
  if (error3) {
    error3.stack = options2.get_stack(error3);
  }
  if (branch) {
    branch.forEach(({node, loaded, fetched, uses_credentials}) => {
      if (node.css)
        node.css.forEach((url) => css2.add(url));
      if (node.js)
        node.js.forEach((url) => js.add(url));
      if (node.styles)
        node.styles.forEach((content) => styles.add(content));
      if (fetched && page_config.hydrate)
        serialized_data.push(...fetched);
      if (uses_credentials)
        is_private = true;
      maxage = loaded.maxage;
    });
    const session = writable($session);
    const props = {
      stores: {
        page: writable(null),
        navigating: writable(null),
        session
      },
      page,
      components: branch.map(({node}) => node.module.default)
    };
    for (let i = 0; i < branch.length; i += 1) {
      props[`props_${i}`] = await branch[i].loaded.props;
    }
    let session_tracking_active = false;
    const unsubscribe = session.subscribe(() => {
      if (session_tracking_active)
        is_private = true;
    });
    session_tracking_active = true;
    try {
      rendered = options2.root.render(props);
    } finally {
      unsubscribe();
    }
  } else {
    rendered = {head: "", html: "", css: {code: "", map: null}};
  }
  const include_js = page_config.router || page_config.hydrate;
  if (!include_js)
    js.clear();
  const links = options2.amp ? styles.size > 0 || rendered.css.code.length > 0 ? `<style amp-custom>${Array.from(styles).concat(rendered.css.code).join("\n")}</style>` : "" : [
    ...Array.from(js).map((dep) => `<link rel="modulepreload" href="${dep}">`),
    ...Array.from(css2).map((dep) => `<link rel="stylesheet" href="${dep}">`)
  ].join("\n		");
  let init2 = "";
  if (options2.amp) {
    init2 = `
		<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style>
		<noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
		<script async src="https://cdn.ampproject.org/v0.js"></script>`;
  } else if (include_js) {
    init2 = `<script type="module">
			import { start } from ${s$1(options2.entry.file)};
			start({
				target: ${options2.target ? `document.querySelector(${s$1(options2.target)})` : "document.body"},
				paths: ${s$1(options2.paths)},
				session: ${try_serialize($session, (error4) => {
      throw new Error(`Failed to serialize session data: ${error4.message}`);
    })},
				host: ${page && page.host ? s$1(page.host) : "location.host"},
				route: ${!!page_config.router},
				spa: ${!page_config.ssr},
				trailing_slash: ${s$1(options2.trailing_slash)},
				hydrate: ${page_config.ssr && page_config.hydrate ? `{
					status: ${status},
					error: ${serialize_error(error3)},
					nodes: [
						${branch.map(({node}) => `import(${s$1(node.entry)})`).join(",\n						")}
					],
					page: {
						host: ${page.host ? s$1(page.host) : "location.host"}, // TODO this is redundant
						path: ${s$1(page.path)},
						query: new URLSearchParams(${s$1(page.query.toString())}),
						params: ${s$1(page.params)}
					}
				}` : "null"}
			});
		</script>`;
  }
  const head = [
    rendered.head,
    styles.size && !options2.amp ? `<style data-svelte>${Array.from(styles).join("\n")}</style>` : "",
    links,
    init2
  ].join("\n\n		");
  const body = options2.amp ? rendered.html : `${rendered.html}

			${serialized_data.map(({url, body: body2, json}) => {
    return body2 ? `<script type="svelte-data" url="${url}" body="${hash(body2)}">${json}</script>` : `<script type="svelte-data" url="${url}">${json}</script>`;
  }).join("\n\n			")}
		`.replace(/^\t{2}/gm, "");
  const headers = {
    "content-type": "text/html"
  };
  if (maxage) {
    headers["cache-control"] = `${is_private ? "private" : "public"}, max-age=${maxage}`;
  }
  if (!options2.floc) {
    headers["permissions-policy"] = "interest-cohort=()";
  }
  return {
    status,
    headers,
    body: options2.template({head, body})
  };
}
function try_serialize(data2, fail) {
  try {
    return devalue(data2);
  } catch (err) {
    if (fail)
      fail(err);
    return null;
  }
}
function serialize_error(error3) {
  if (!error3)
    return null;
  let serialized = try_serialize(error3);
  if (!serialized) {
    const {name, message, stack} = error3;
    serialized = try_serialize({name, message, stack});
  }
  if (!serialized) {
    serialized = "{}";
  }
  return serialized;
}
function normalize(loaded) {
  if (loaded.error) {
    const error3 = typeof loaded.error === "string" ? new Error(loaded.error) : loaded.error;
    const status = loaded.status;
    if (!(error3 instanceof Error)) {
      return {
        status: 500,
        error: new Error(`"error" property returned from load() must be a string or instance of Error, received type "${typeof error3}"`)
      };
    }
    if (!status || status < 400 || status > 599) {
      console.warn('"error" returned from load() without a valid status code \u2014 defaulting to 500');
      return {status: 500, error: error3};
    }
    return {status, error: error3};
  }
  if (loaded.redirect) {
    if (!loaded.status || Math.floor(loaded.status / 100) !== 3) {
      return {
        status: 500,
        error: new Error('"redirect" property returned from load() must be accompanied by a 3xx status code')
      };
    }
    if (typeof loaded.redirect !== "string") {
      return {
        status: 500,
        error: new Error('"redirect" property returned from load() must be a string')
      };
    }
  }
  return loaded;
}
function resolve(base, path) {
  const baseparts = path[0] === "/" ? [] : base.slice(1).split("/");
  const pathparts = path[0] === "/" ? path.slice(1).split("/") : path.split("/");
  baseparts.pop();
  for (let i = 0; i < pathparts.length; i += 1) {
    const part = pathparts[i];
    if (part === ".")
      continue;
    else if (part === "..")
      baseparts.pop();
    else
      baseparts.push(part);
  }
  return `/${baseparts.join("/")}`;
}
var s = JSON.stringify;
async function load_node({
  request,
  options: options2,
  state,
  route,
  page,
  node,
  $session,
  context,
  is_leaf,
  is_error,
  status,
  error: error3
}) {
  const {module: module2} = node;
  let uses_credentials = false;
  const fetched = [];
  let loaded;
  if (module2.load) {
    const load_input = {
      page,
      get session() {
        uses_credentials = true;
        return $session;
      },
      fetch: async (resource, opts = {}) => {
        let url;
        if (typeof resource === "string") {
          url = resource;
        } else {
          url = resource.url;
          opts = {
            method: resource.method,
            headers: resource.headers,
            body: resource.body,
            mode: resource.mode,
            credentials: resource.credentials,
            cache: resource.cache,
            redirect: resource.redirect,
            referrer: resource.referrer,
            integrity: resource.integrity,
            ...opts
          };
        }
        if (options2.read && url.startsWith(options2.paths.assets)) {
          url = url.replace(options2.paths.assets, "");
        }
        if (url.startsWith("//")) {
          throw new Error(`Cannot request protocol-relative URL (${url}) in server-side fetch`);
        }
        let response;
        if (/^[a-zA-Z]+:/.test(url)) {
          response = await fetch(url, opts);
        } else {
          const [path, search] = url.split("?");
          const resolved = resolve(request.path, path);
          const filename = resolved.slice(1);
          const filename_html = `${filename}/index.html`;
          const asset = options2.manifest.assets.find((d) => d.file === filename || d.file === filename_html);
          if (asset) {
            if (options2.read) {
              response = new Response(options2.read(asset.file), {
                headers: {
                  "content-type": asset.type
                }
              });
            } else {
              response = await fetch(`http://${page.host}/${asset.file}`, opts);
            }
          }
          if (!response) {
            const headers = {...opts.headers};
            if (opts.credentials !== "omit") {
              uses_credentials = true;
              headers.cookie = request.headers.cookie;
              if (!headers.authorization) {
                headers.authorization = request.headers.authorization;
              }
            }
            if (opts.body && typeof opts.body !== "string") {
              throw new Error("Request body must be a string");
            }
            const rendered = await respond({
              host: request.host,
              method: opts.method || "GET",
              headers,
              path: resolved,
              rawBody: opts.body,
              query: new URLSearchParams(search)
            }, options2, {
              fetched: url,
              initiator: route
            });
            if (rendered) {
              if (state.prerender) {
                state.prerender.dependencies.set(resolved, rendered);
              }
              response = new Response(rendered.body, {
                status: rendered.status,
                headers: rendered.headers
              });
            }
          }
        }
        if (response) {
          const proxy = new Proxy(response, {
            get(response2, key, receiver) {
              async function text() {
                const body = await response2.text();
                const headers = {};
                for (const [key2, value] of response2.headers) {
                  if (key2 !== "etag" && key2 !== "set-cookie")
                    headers[key2] = value;
                }
                if (!opts.body || typeof opts.body === "string") {
                  fetched.push({
                    url,
                    body: opts.body,
                    json: `{"status":${response2.status},"statusText":${s(response2.statusText)},"headers":${s(headers)},"body":${escape(body)}}`
                  });
                }
                return body;
              }
              if (key === "text") {
                return text;
              }
              if (key === "json") {
                return async () => {
                  return JSON.parse(await text());
                };
              }
              return Reflect.get(response2, key, response2);
            }
          });
          return proxy;
        }
        return response || new Response("Not found", {
          status: 404
        });
      },
      context: {...context}
    };
    if (is_error) {
      load_input.status = status;
      load_input.error = error3;
    }
    loaded = await module2.load.call(null, load_input);
  } else {
    loaded = {};
  }
  if (!loaded && is_leaf && !is_error)
    return;
  return {
    node,
    loaded: normalize(loaded),
    context: loaded.context || context,
    fetched,
    uses_credentials
  };
}
var escaped = {
  "<": "\\u003C",
  ">": "\\u003E",
  "/": "\\u002F",
  "\\": "\\\\",
  "\b": "\\b",
  "\f": "\\f",
  "\n": "\\n",
  "\r": "\\r",
  "	": "\\t",
  "\0": "\\0",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};
function escape(str) {
  let result = '"';
  for (let i = 0; i < str.length; i += 1) {
    const char = str.charAt(i);
    const code = char.charCodeAt(0);
    if (char === '"') {
      result += '\\"';
    } else if (char in escaped) {
      result += escaped[char];
    } else if (code >= 55296 && code <= 57343) {
      const next = str.charCodeAt(i + 1);
      if (code <= 56319 && next >= 56320 && next <= 57343) {
        result += char + str[++i];
      } else {
        result += `\\u${code.toString(16).toUpperCase()}`;
      }
    } else {
      result += char;
    }
  }
  result += '"';
  return result;
}
async function respond_with_error({request, options: options2, state, $session, status, error: error3}) {
  const default_layout = await options2.load_component(options2.manifest.layout);
  const default_error = await options2.load_component(options2.manifest.error);
  const page = {
    host: request.host,
    path: request.path,
    query: request.query,
    params: {}
  };
  const loaded = await load_node({
    request,
    options: options2,
    state,
    route: null,
    page,
    node: default_layout,
    $session,
    context: {},
    is_leaf: false,
    is_error: false
  });
  const branch = [
    loaded,
    await load_node({
      request,
      options: options2,
      state,
      route: null,
      page,
      node: default_error,
      $session,
      context: loaded.context,
      is_leaf: false,
      is_error: true,
      status,
      error: error3
    })
  ];
  try {
    return await render_response({
      options: options2,
      $session,
      page_config: {
        hydrate: options2.hydrate,
        router: options2.router,
        ssr: options2.ssr
      },
      status,
      error: error3,
      branch,
      page
    });
  } catch (error4) {
    options2.handle_error(error4);
    return {
      status: 500,
      headers: {},
      body: error4.stack
    };
  }
}
async function respond$1({request, options: options2, state, $session, route}) {
  const match = route.pattern.exec(request.path);
  const params = route.params(match);
  const page = {
    host: request.host,
    path: request.path,
    query: request.query,
    params
  };
  let nodes;
  try {
    nodes = await Promise.all(route.a.map((id) => id && options2.load_component(id)));
  } catch (error4) {
    options2.handle_error(error4);
    return await respond_with_error({
      request,
      options: options2,
      state,
      $session,
      status: 500,
      error: error4
    });
  }
  const leaf = nodes[nodes.length - 1].module;
  const page_config = {
    ssr: "ssr" in leaf ? leaf.ssr : options2.ssr,
    router: "router" in leaf ? leaf.router : options2.router,
    hydrate: "hydrate" in leaf ? leaf.hydrate : options2.hydrate
  };
  if (!leaf.prerender && state.prerender && !state.prerender.all) {
    return {
      status: 204,
      headers: {},
      body: null
    };
  }
  let branch;
  let status = 200;
  let error3;
  ssr:
    if (page_config.ssr) {
      let context = {};
      branch = [];
      for (let i = 0; i < nodes.length; i += 1) {
        const node = nodes[i];
        let loaded;
        if (node) {
          try {
            loaded = await load_node({
              request,
              options: options2,
              state,
              route,
              page,
              node,
              $session,
              context,
              is_leaf: i === nodes.length - 1,
              is_error: false
            });
            if (!loaded)
              return;
            if (loaded.loaded.redirect) {
              return {
                status: loaded.loaded.status,
                headers: {
                  location: encodeURI(loaded.loaded.redirect)
                }
              };
            }
            if (loaded.loaded.error) {
              ({status, error: error3} = loaded.loaded);
            }
          } catch (e) {
            options2.handle_error(e);
            status = 500;
            error3 = e;
          }
          if (error3) {
            while (i--) {
              if (route.b[i]) {
                const error_node = await options2.load_component(route.b[i]);
                let error_loaded;
                let node_loaded;
                let j = i;
                while (!(node_loaded = branch[j])) {
                  j -= 1;
                }
                try {
                  error_loaded = await load_node({
                    request,
                    options: options2,
                    state,
                    route,
                    page,
                    node: error_node,
                    $session,
                    context: node_loaded.context,
                    is_leaf: false,
                    is_error: true,
                    status,
                    error: error3
                  });
                  if (error_loaded.loaded.error) {
                    continue;
                  }
                  branch = branch.slice(0, j + 1).concat(error_loaded);
                  break ssr;
                } catch (e) {
                  options2.handle_error(e);
                  continue;
                }
              }
            }
            return await respond_with_error({
              request,
              options: options2,
              state,
              $session,
              status,
              error: error3
            });
          }
        }
        branch.push(loaded);
        if (loaded && loaded.loaded.context) {
          context = {
            ...context,
            ...loaded.loaded.context
          };
        }
      }
    }
  try {
    return await render_response({
      options: options2,
      $session,
      page_config,
      status,
      error: error3,
      branch: branch && branch.filter(Boolean),
      page
    });
  } catch (error4) {
    options2.handle_error(error4);
    return await respond_with_error({
      request,
      options: options2,
      state,
      $session,
      status: 500,
      error: error4
    });
  }
}
async function render_page(request, route, options2, state) {
  if (state.initiator === route) {
    return {
      status: 404,
      headers: {},
      body: `Not found: ${request.path}`
    };
  }
  const $session = await options2.hooks.getSession(request);
  if (route) {
    const response = await respond$1({
      request,
      options: options2,
      state,
      $session,
      route
    });
    if (response) {
      return response;
    }
    if (state.fetched) {
      return {
        status: 500,
        headers: {},
        body: `Bad request in load function: failed to fetch ${state.fetched}`
      };
    }
  } else {
    return await respond_with_error({
      request,
      options: options2,
      state,
      $session,
      status: 404,
      error: new Error(`Not found: ${request.path}`)
    });
  }
}
function lowercase_keys(obj) {
  const clone2 = {};
  for (const key in obj) {
    clone2[key.toLowerCase()] = obj[key];
  }
  return clone2;
}
function error(body) {
  return {
    status: 500,
    body,
    headers: {}
  };
}
async function render_route(request, route) {
  const mod = await route.load();
  const handler = mod[request.method.toLowerCase().replace("delete", "del")];
  if (handler) {
    const match = route.pattern.exec(request.path);
    const params = route.params(match);
    const response = await handler({...request, params});
    if (response) {
      if (typeof response !== "object") {
        return error(`Invalid response from route ${request.path}: expected an object, got ${typeof response}`);
      }
      let {status = 200, body, headers = {}} = response;
      headers = lowercase_keys(headers);
      const type = headers["content-type"];
      if (type === "application/octet-stream" && !(body instanceof Uint8Array)) {
        return error(`Invalid response from route ${request.path}: body must be an instance of Uint8Array if content type is application/octet-stream`);
      }
      if (body instanceof Uint8Array && type !== "application/octet-stream") {
        return error(`Invalid response from route ${request.path}: Uint8Array body must be accompanied by content-type: application/octet-stream header`);
      }
      let normalized_body;
      if (typeof body === "object" && (!type || type === "application/json")) {
        headers = {...headers, "content-type": "application/json"};
        normalized_body = JSON.stringify(body);
      } else {
        normalized_body = body;
      }
      return {status, body: normalized_body, headers};
    }
  }
}
function read_only_form_data() {
  const map = new Map();
  return {
    append(key, value) {
      if (map.has(key)) {
        map.get(key).push(value);
      } else {
        map.set(key, [value]);
      }
    },
    data: new ReadOnlyFormData(map)
  };
}
var ReadOnlyFormData = class {
  #map;
  constructor(map) {
    this.#map = map;
  }
  get(key) {
    const value = this.#map.get(key);
    return value && value[0];
  }
  getAll(key) {
    return this.#map.get(key);
  }
  has(key) {
    return this.#map.has(key);
  }
  *[Symbol.iterator]() {
    for (const [key, value] of this.#map) {
      for (let i = 0; i < value.length; i += 1) {
        yield [key, value[i]];
      }
    }
  }
  *entries() {
    for (const [key, value] of this.#map) {
      for (let i = 0; i < value.length; i += 1) {
        yield [key, value[i]];
      }
    }
  }
  *keys() {
    for (const [key, value] of this.#map) {
      for (let i = 0; i < value.length; i += 1) {
        yield key;
      }
    }
  }
  *values() {
    for (const [, value] of this.#map) {
      for (let i = 0; i < value.length; i += 1) {
        yield value;
      }
    }
  }
};
function parse_body(req) {
  const raw = req.rawBody;
  if (!raw)
    return raw;
  const [type, ...directives] = req.headers["content-type"].split(/;\s*/);
  if (typeof raw === "string") {
    switch (type) {
      case "text/plain":
        return raw;
      case "application/json":
        return JSON.parse(raw);
      case "application/x-www-form-urlencoded":
        return get_urlencoded(raw);
      case "multipart/form-data": {
        const boundary = directives.find((directive) => directive.startsWith("boundary="));
        if (!boundary)
          throw new Error("Missing boundary");
        return get_multipart(raw, boundary.slice("boundary=".length));
      }
      default:
        throw new Error(`Invalid Content-Type ${type}`);
    }
  }
  return raw;
}
function get_urlencoded(text) {
  const {data: data2, append} = read_only_form_data();
  text.replace(/\+/g, " ").split("&").forEach((str) => {
    const [key, value] = str.split("=");
    append(decodeURIComponent(key), decodeURIComponent(value));
  });
  return data2;
}
function get_multipart(text, boundary) {
  const parts = text.split(`--${boundary}`);
  const nope = () => {
    throw new Error("Malformed form data");
  };
  if (parts[0] !== "" || parts[parts.length - 1].trim() !== "--") {
    nope();
  }
  const {data: data2, append} = read_only_form_data();
  parts.slice(1, -1).forEach((part) => {
    const match = /\s*([\s\S]+?)\r\n\r\n([\s\S]*)\s*/.exec(part);
    const raw_headers = match[1];
    const body = match[2].trim();
    let key;
    raw_headers.split("\r\n").forEach((str) => {
      const [raw_header, ...raw_directives] = str.split("; ");
      let [name, value] = raw_header.split(": ");
      name = name.toLowerCase();
      const directives = {};
      raw_directives.forEach((raw_directive) => {
        const [name2, value2] = raw_directive.split("=");
        directives[name2] = JSON.parse(value2);
      });
      if (name === "content-disposition") {
        if (value !== "form-data")
          nope();
        if (directives.filename) {
          throw new Error("File upload is not yet implemented");
        }
        if (directives.name) {
          key = directives.name;
        }
      }
    });
    if (!key)
      nope();
    append(key, body);
  });
  return data2;
}
async function respond(incoming, options2, state = {}) {
  if (incoming.path !== "/" && options2.trailing_slash !== "ignore") {
    const has_trailing_slash = incoming.path.endsWith("/");
    if (has_trailing_slash && options2.trailing_slash === "never" || !has_trailing_slash && options2.trailing_slash === "always" && !incoming.path.split("/").pop().includes(".")) {
      const path = has_trailing_slash ? incoming.path.slice(0, -1) : incoming.path + "/";
      const q = incoming.query.toString();
      return {
        status: 301,
        headers: {
          location: encodeURI(path + (q ? `?${q}` : ""))
        }
      };
    }
  }
  try {
    return await options2.hooks.handle({
      request: {
        ...incoming,
        headers: lowercase_keys(incoming.headers),
        body: parse_body(incoming),
        params: null,
        locals: {}
      },
      resolve: async (request) => {
        if (state.prerender && state.prerender.fallback) {
          return await render_response({
            options: options2,
            $session: await options2.hooks.getSession(request),
            page_config: {ssr: false, router: true, hydrate: true},
            status: 200,
            error: null,
            branch: [],
            page: null
          });
        }
        for (const route of options2.manifest.routes) {
          if (!route.pattern.test(request.path))
            continue;
          const response = route.type === "endpoint" ? await render_route(request, route) : await render_page(request, route, options2, state);
          if (response) {
            if (response.status === 200) {
              if (!/(no-store|immutable)/.test(response.headers["cache-control"])) {
                const etag = `"${hash(response.body)}"`;
                if (request.headers["if-none-match"] === etag) {
                  return {
                    status: 304,
                    headers: {},
                    body: null
                  };
                }
                response.headers["etag"] = etag;
              }
            }
            return response;
          }
        }
        return await render_page(request, null, options2, state);
      }
    });
  } catch (e) {
    options2.handle_error(e);
    return {
      status: 500,
      headers: {},
      body: options2.dev ? e.stack : e.message
    };
  }
}

// node_modules/svelte/internal/index.mjs
function noop2() {
}
function run(fn) {
  return fn();
}
function blank_object() {
  return Object.create(null);
}
function run_all(fns) {
  fns.forEach(run);
}
function is_function(thing) {
  return typeof thing === "function";
}
function safe_not_equal2(a, b) {
  return a != a ? b == b : a !== b || (a && typeof a === "object" || typeof a === "function");
}
function is_empty(obj) {
  return Object.keys(obj).length === 0;
}
function subscribe(store2, ...callbacks) {
  if (store2 == null) {
    return noop2;
  }
  const unsub = store2.subscribe(...callbacks);
  return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
}
function compute_rest_props(props, keys) {
  const rest = {};
  keys = new Set(keys);
  for (const k in props)
    if (!keys.has(k) && k[0] !== "$")
      rest[k] = props[k];
  return rest;
}
function compute_slots(slots) {
  const result = {};
  for (const key in slots) {
    result[key] = true;
  }
  return result;
}
function set_store_value(store2, ret, value = ret) {
  store2.set(value);
  return ret;
}
var tasks = new Set();
function custom_event(type, detail) {
  const e = document.createEvent("CustomEvent");
  e.initCustomEvent(type, false, false, detail);
  return e;
}
var active_docs = new Set();
var current_component;
function set_current_component(component) {
  current_component = component;
}
function get_current_component() {
  if (!current_component)
    throw new Error("Function called outside component initialization");
  return current_component;
}
function beforeUpdate(fn) {
  get_current_component().$$.before_update.push(fn);
}
function onMount(fn) {
  get_current_component().$$.on_mount.push(fn);
}
function afterUpdate(fn) {
  get_current_component().$$.after_update.push(fn);
}
function onDestroy(fn) {
  get_current_component().$$.on_destroy.push(fn);
}
function createEventDispatcher() {
  const component = get_current_component();
  return (type, detail) => {
    const callbacks = component.$$.callbacks[type];
    if (callbacks) {
      const event = custom_event(type, detail);
      callbacks.slice().forEach((fn) => {
        fn.call(component, event);
      });
    }
  };
}
function setContext(key, context) {
  get_current_component().$$.context.set(key, context);
}
function getContext(key) {
  return get_current_component().$$.context.get(key);
}
var dirty_components = [];
var binding_callbacks = [];
var render_callbacks = [];
var flush_callbacks = [];
var resolved_promise = Promise.resolve();
var update_scheduled = false;
function schedule_update() {
  if (!update_scheduled) {
    update_scheduled = true;
    resolved_promise.then(flush);
  }
}
function tick() {
  schedule_update();
  return resolved_promise;
}
function add_render_callback(fn) {
  render_callbacks.push(fn);
}
var flushing = false;
var seen_callbacks = new Set();
function flush() {
  if (flushing)
    return;
  flushing = true;
  do {
    for (let i = 0; i < dirty_components.length; i += 1) {
      const component = dirty_components[i];
      set_current_component(component);
      update(component.$$);
    }
    set_current_component(null);
    dirty_components.length = 0;
    while (binding_callbacks.length)
      binding_callbacks.pop()();
    for (let i = 0; i < render_callbacks.length; i += 1) {
      const callback = render_callbacks[i];
      if (!seen_callbacks.has(callback)) {
        seen_callbacks.add(callback);
        callback();
      }
    }
    render_callbacks.length = 0;
  } while (dirty_components.length);
  while (flush_callbacks.length) {
    flush_callbacks.pop()();
  }
  update_scheduled = false;
  flushing = false;
  seen_callbacks.clear();
}
function update($$) {
  if ($$.fragment !== null) {
    $$.update();
    run_all($$.before_update);
    const dirty = $$.dirty;
    $$.dirty = [-1];
    $$.fragment && $$.fragment.p($$.ctx, dirty);
    $$.after_update.forEach(add_render_callback);
  }
}
var outroing = new Set();
var globals = typeof window !== "undefined" ? window : typeof globalThis !== "undefined" ? globalThis : global;
var boolean_attributes = new Set([
  "allowfullscreen",
  "allowpaymentrequest",
  "async",
  "autofocus",
  "autoplay",
  "checked",
  "controls",
  "default",
  "defer",
  "disabled",
  "formnovalidate",
  "hidden",
  "ismap",
  "loop",
  "multiple",
  "muted",
  "nomodule",
  "novalidate",
  "open",
  "playsinline",
  "readonly",
  "required",
  "reversed",
  "selected"
]);
var invalid_attribute_name_character = /[\s'">/=\u{FDD0}-\u{FDEF}\u{FFFE}\u{FFFF}\u{1FFFE}\u{1FFFF}\u{2FFFE}\u{2FFFF}\u{3FFFE}\u{3FFFF}\u{4FFFE}\u{4FFFF}\u{5FFFE}\u{5FFFF}\u{6FFFE}\u{6FFFF}\u{7FFFE}\u{7FFFF}\u{8FFFE}\u{8FFFF}\u{9FFFE}\u{9FFFF}\u{AFFFE}\u{AFFFF}\u{BFFFE}\u{BFFFF}\u{CFFFE}\u{CFFFF}\u{DFFFE}\u{DFFFF}\u{EFFFE}\u{EFFFF}\u{FFFFE}\u{FFFFF}\u{10FFFE}\u{10FFFF}]/u;
function spread(args, classes_to_add) {
  const attributes = Object.assign({}, ...args);
  if (classes_to_add) {
    if (attributes.class == null) {
      attributes.class = classes_to_add;
    } else {
      attributes.class += " " + classes_to_add;
    }
  }
  let str = "";
  Object.keys(attributes).forEach((name) => {
    if (invalid_attribute_name_character.test(name))
      return;
    const value = attributes[name];
    if (value === true)
      str += " " + name;
    else if (boolean_attributes.has(name.toLowerCase())) {
      if (value)
        str += " " + name;
    } else if (value != null) {
      str += ` ${name}="${String(value).replace(/"/g, "&#34;").replace(/'/g, "&#39;")}"`;
    }
  });
  return str;
}
var escaped2 = {
  '"': "&quot;",
  "'": "&#39;",
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;"
};
function escape2(html) {
  return String(html).replace(/["'&<>]/g, (match) => escaped2[match]);
}
function each(items, fn) {
  let str = "";
  for (let i = 0; i < items.length; i += 1) {
    str += fn(items[i], i);
  }
  return str;
}
var missing_component = {
  $$render: () => ""
};
function validate_component(component, name) {
  if (!component || !component.$$render) {
    if (name === "svelte:component")
      name += " this={...}";
    throw new Error(`<${name}> is not a valid SSR component. You may need to review your build config to ensure that dependencies are compiled, rather than imported as pre-compiled modules`);
  }
  return component;
}
var on_destroy;
function create_ssr_component(fn) {
  function $$render(result, props, bindings, slots, context) {
    const parent_component = current_component;
    const $$ = {
      on_destroy,
      context: new Map(parent_component ? parent_component.$$.context : context || []),
      on_mount: [],
      before_update: [],
      after_update: [],
      callbacks: blank_object()
    };
    set_current_component({$$});
    const html = fn(result, props, bindings, slots);
    set_current_component(parent_component);
    return html;
  }
  return {
    render: (props = {}, {$$slots = {}, context = new Map()} = {}) => {
      on_destroy = [];
      const result = {title: "", head: "", css: new Set()};
      const html = $$render(result, props, {}, $$slots, context);
      run_all(on_destroy);
      return {
        html,
        css: {
          code: Array.from(result.css).map((css2) => css2.code).join("\n"),
          map: null
        },
        head: result.title + result.head
      };
    },
    $$render
  };
}
function add_attribute(name, value, boolean) {
  if (value == null || boolean && !value)
    return "";
  return ` ${name}${value === true ? "" : `=${typeof value === "string" ? JSON.stringify(escape2(value)) : `"${value}"`}`}`;
}
function add_classes(classes) {
  return classes ? ` class="${classes}"` : "";
}
function destroy_component(component, detaching) {
  const $$ = component.$$;
  if ($$.fragment !== null) {
    run_all($$.on_destroy);
    $$.fragment && $$.fragment.d(detaching);
    $$.on_destroy = $$.fragment = null;
    $$.ctx = [];
  }
}
var SvelteElement;
if (typeof HTMLElement === "function") {
  SvelteElement = class extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({mode: "open"});
    }
    connectedCallback() {
      const {on_mount} = this.$$;
      this.$$.on_disconnect = on_mount.map(run).filter(is_function);
      for (const key in this.$$.slotted) {
        this.appendChild(this.$$.slotted[key]);
      }
    }
    attributeChangedCallback(attr, _oldValue, newValue) {
      this[attr] = newValue;
    }
    disconnectedCallback() {
      run_all(this.$$.on_disconnect);
    }
    $destroy() {
      destroy_component(this, 1);
      this.$destroy = noop2;
    }
    $on(type, callback) {
      const callbacks = this.$$.callbacks[type] || (this.$$.callbacks[type] = []);
      callbacks.push(callback);
      return () => {
        const index2 = callbacks.indexOf(callback);
        if (index2 !== -1)
          callbacks.splice(index2, 1);
      };
    }
    $set($$props) {
      if (this.$$set && !is_empty($$props)) {
        this.$$.skip_bound = true;
        this.$$set($$props);
        this.$$.skip_bound = false;
      }
    }
  };
}

// node_modules/svelte/store/index.mjs
var subscriber_queue2 = [];
function readable(value, start) {
  return {
    subscribe: writable2(value, start).subscribe
  };
}
function writable2(value, start = noop2) {
  let stop;
  const subscribers = [];
  function set(new_value) {
    if (safe_not_equal2(value, new_value)) {
      value = new_value;
      if (stop) {
        const run_queue = !subscriber_queue2.length;
        for (let i = 0; i < subscribers.length; i += 1) {
          const s2 = subscribers[i];
          s2[1]();
          subscriber_queue2.push(s2, value);
        }
        if (run_queue) {
          for (let i = 0; i < subscriber_queue2.length; i += 2) {
            subscriber_queue2[i][0](subscriber_queue2[i + 1]);
          }
          subscriber_queue2.length = 0;
        }
      }
    }
  }
  function update2(fn) {
    set(fn(value));
  }
  function subscribe2(run2, invalidate = noop2) {
    const subscriber = [run2, invalidate];
    subscribers.push(subscriber);
    if (subscribers.length === 1) {
      stop = start(set) || noop2;
    }
    run2(value);
    return () => {
      const index2 = subscribers.indexOf(subscriber);
      if (index2 !== -1) {
        subscribers.splice(index2, 1);
      }
      if (subscribers.length === 0) {
        stop();
        stop = null;
      }
    };
  }
  return {set, update: update2, subscribe: subscribe2};
}
function derived(stores, fn, initial_value) {
  const single = !Array.isArray(stores);
  const stores_array = single ? [stores] : stores;
  const auto = fn.length < 2;
  return readable(initial_value, (set) => {
    let inited = false;
    const values = [];
    let pending = 0;
    let cleanup = noop2;
    const sync = () => {
      if (pending) {
        return;
      }
      cleanup();
      const result = fn(single ? values[0] : values, set);
      if (auto) {
        set(result);
      } else {
        cleanup = is_function(result) ? result : noop2;
      }
    };
    const unsubscribers = stores_array.map((store2, i) => subscribe(store2, (value) => {
      values[i] = value;
      pending &= ~(1 << i);
      if (inited) {
        sync();
      }
    }, () => {
      pending |= 1 << i;
    }));
    inited = true;
    sync();
    return function stop() {
      run_all(unsubscribers);
      cleanup();
    };
  });
}

// .svelte-kit/output/server/app.js
var import_clipboard_copy = __toModule(require_clipboard_copy());
var css$6 = {
  code: "#svelte-announcer.svelte-1j55zn5{position:absolute;left:0;top:0;clip:rect(0 0 0 0);clip-path:inset(50%);overflow:hidden;white-space:nowrap;width:1px;height:1px}",
  map: `{"version":3,"file":"root.svelte","sources":["root.svelte"],"sourcesContent":["<!-- This file is generated by @sveltejs/kit \u2014 do not edit it! -->\\n<script>\\n\\timport { setContext, afterUpdate, onMount } from 'svelte';\\n\\n\\t// stores\\n\\texport let stores;\\n\\texport let page;\\n\\n\\texport let components;\\n\\texport let props_0 = null;\\n\\texport let props_1 = null;\\n\\texport let props_2 = null;\\n\\n\\tsetContext('__svelte__', stores);\\n\\n\\t$: stores.page.set(page);\\n\\tafterUpdate(stores.page.notify);\\n\\n\\tlet mounted = false;\\n\\tlet navigated = false;\\n\\tlet title = null;\\n\\n\\tonMount(() => {\\n\\t\\tconst unsubscribe = stores.page.subscribe(() => {\\n\\t\\t\\tif (mounted) {\\n\\t\\t\\t\\tnavigated = true;\\n\\t\\t\\t\\ttitle = document.title || 'untitled page';\\n\\t\\t\\t}\\n\\t\\t});\\n\\n\\t\\tmounted = true;\\n\\t\\treturn unsubscribe;\\n\\t});\\n</script>\\n\\n<svelte:component this={components[0]} {...(props_0 || {})}>\\n\\t{#if components[1]}\\n\\t\\t<svelte:component this={components[1]} {...(props_1 || {})}>\\n\\t\\t\\t{#if components[2]}\\n\\t\\t\\t\\t<svelte:component this={components[2]} {...(props_2 || {})}/>\\n\\t\\t\\t{/if}\\n\\t\\t</svelte:component>\\n\\t{/if}\\n</svelte:component>\\n\\n{#if mounted}\\n\\t<div id=\\"svelte-announcer\\" aria-live=\\"assertive\\" aria-atomic=\\"true\\">\\n\\t\\t{#if navigated}\\n\\t\\t\\t{title}\\n\\t\\t{/if}\\n\\t</div>\\n{/if}\\n\\n<style>\\n\\t#svelte-announcer {\\n\\t\\tposition: absolute;\\n\\t\\tleft: 0;\\n\\t\\ttop: 0;\\n\\t\\tclip: rect(0 0 0 0);\\n\\t\\tclip-path: inset(50%);\\n\\t\\toverflow: hidden;\\n\\t\\twhite-space: nowrap;\\n\\t\\twidth: 1px;\\n\\t\\theight: 1px;\\n\\t}\\n</style>"],"names":[],"mappings":"AAsDC,iBAAiB,eAAC,CAAC,AAClB,QAAQ,CAAE,QAAQ,CAClB,IAAI,CAAE,CAAC,CACP,GAAG,CAAE,CAAC,CACN,IAAI,CAAE,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CACnB,SAAS,CAAE,MAAM,GAAG,CAAC,CACrB,QAAQ,CAAE,MAAM,CAChB,WAAW,CAAE,MAAM,CACnB,KAAK,CAAE,GAAG,CACV,MAAM,CAAE,GAAG,AACZ,CAAC"}`
};
var Root = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let {stores} = $$props;
  let {page} = $$props;
  let {components} = $$props;
  let {props_0 = null} = $$props;
  let {props_1 = null} = $$props;
  let {props_2 = null} = $$props;
  setContext("__svelte__", stores);
  afterUpdate(stores.page.notify);
  let mounted = false;
  let navigated = false;
  let title = null;
  onMount(() => {
    const unsubscribe = stores.page.subscribe(() => {
      if (mounted) {
        navigated = true;
        title = document.title || "untitled page";
      }
    });
    mounted = true;
    return unsubscribe;
  });
  if ($$props.stores === void 0 && $$bindings.stores && stores !== void 0)
    $$bindings.stores(stores);
  if ($$props.page === void 0 && $$bindings.page && page !== void 0)
    $$bindings.page(page);
  if ($$props.components === void 0 && $$bindings.components && components !== void 0)
    $$bindings.components(components);
  if ($$props.props_0 === void 0 && $$bindings.props_0 && props_0 !== void 0)
    $$bindings.props_0(props_0);
  if ($$props.props_1 === void 0 && $$bindings.props_1 && props_1 !== void 0)
    $$bindings.props_1(props_1);
  if ($$props.props_2 === void 0 && $$bindings.props_2 && props_2 !== void 0)
    $$bindings.props_2(props_2);
  $$result.css.add(css$6);
  {
    stores.page.set(page);
  }
  return `


${validate_component(components[0] || missing_component, "svelte:component").$$render($$result, Object.assign(props_0 || {}), {}, {
    default: () => `${components[1] ? `${validate_component(components[1] || missing_component, "svelte:component").$$render($$result, Object.assign(props_1 || {}), {}, {
      default: () => `${components[2] ? `${validate_component(components[2] || missing_component, "svelte:component").$$render($$result, Object.assign(props_2 || {}), {}, {})}` : ``}`
    })}` : ``}`
  })}

${mounted ? `<div id="${"svelte-announcer"}" aria-live="${"assertive"}" aria-atomic="${"true"}" class="${"svelte-1j55zn5"}">${navigated ? `${escape2(title)}` : ``}</div>` : ``}`;
});
function set_paths(paths) {
}
function set_prerendering(value) {
}
var user_hooks = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module"
});
var template = ({head, body}) => '<!DOCTYPE html>\n<html lang="en">\n	<head>\n		<meta charset="utf-8" />\n		<link rel="icon" href="/favicon.png" />\n		<meta name="viewport" content="width=device-width, initial-scale=1" />\n		' + head + '\n	</head>\n	<body>\n		<div id="svelte">' + body + "</div>\n	</body>\n</html>\n";
var options = null;
function init(settings) {
  set_paths(settings.paths);
  set_prerendering(settings.prerendering || false);
  options = {
    amp: false,
    dev: false,
    entry: {
      file: "/./_app/start-06a05ff5.js",
      css: ["/./_app/assets/start-a8cd1609.css", "/./_app/assets/vendor-1405fc18.css"],
      js: ["/./_app/start-06a05ff5.js", "/./_app/chunks/vendor-cd6e191b.js"]
    },
    fetched: void 0,
    floc: false,
    get_component_path: (id) => "/./_app/" + entry_lookup[id],
    get_stack: (error22) => String(error22),
    handle_error: (error22) => {
      console.error(error22.stack);
      error22.stack = options.get_stack(error22);
    },
    hooks: get_hooks(user_hooks),
    hydrate: true,
    initiator: void 0,
    load_component,
    manifest,
    paths: settings.paths,
    read: settings.read,
    root: Root,
    router: true,
    ssr: true,
    target: "#svelte",
    template,
    trailing_slash: "never"
  };
}
var empty = () => ({});
var manifest = {
  assets: [{"file": "banner.jpg", "size": 212257, "type": "image/jpeg"}, {"file": "favicon.png", "size": 1571, "type": "image/png"}],
  layout: "src/routes/__layout.svelte",
  error: ".svelte-kit/build/components/error.svelte",
  routes: [
    {
      type: "page",
      pattern: /^\/$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/index.svelte"],
      b: [".svelte-kit/build/components/error.svelte"]
    }
  ]
};
var get_hooks = (hooks) => ({
  getSession: hooks.getSession || (() => ({})),
  handle: hooks.handle || (({request, resolve: resolve2}) => resolve2(request))
});
var module_lookup = {
  "src/routes/__layout.svelte": () => Promise.resolve().then(function() {
    return __layout;
  }),
  ".svelte-kit/build/components/error.svelte": () => Promise.resolve().then(function() {
    return error2;
  }),
  "src/routes/index.svelte": () => Promise.resolve().then(function() {
    return index;
  })
};
var metadata_lookup = {"src/routes/__layout.svelte": {"entry": "/./_app/pages/__layout.svelte-45aa66e5.js", "css": ["/./_app/assets/pages/__layout.svelte-ef5d743f.css", "/./_app/assets/vendor-1405fc18.css"], "js": ["/./_app/pages/__layout.svelte-45aa66e5.js", "/./_app/chunks/vendor-cd6e191b.js"], "styles": null}, ".svelte-kit/build/components/error.svelte": {"entry": "/./_app/error.svelte-74bfdefa.js", "css": ["/./_app/assets/vendor-1405fc18.css"], "js": ["/./_app/error.svelte-74bfdefa.js", "/./_app/chunks/vendor-cd6e191b.js"], "styles": null}, "src/routes/index.svelte": {"entry": "/./_app/pages/index.svelte-16066c2b.js", "css": ["/./_app/assets/pages/index.svelte-420a17a1.css", "/./_app/assets/vendor-1405fc18.css"], "js": ["/./_app/pages/index.svelte-16066c2b.js", "/./_app/chunks/vendor-cd6e191b.js"], "styles": null}};
async function load_component(file) {
  return {
    module: await module_lookup[file](),
    ...metadata_lookup[file]
  };
}
init({paths: {"base": "", "assets": "/."}});
function render(request, {
  prerender
} = {}) {
  const host = request.headers["host"];
  return respond({...request, host}, options, {prerender});
}
var ChevronRight16 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let ariaLabel;
  let ariaLabelledBy;
  let labelled;
  let attributes;
  let {class: className = void 0} = $$props;
  let {id = void 0} = $$props;
  let {tabindex = void 0} = $$props;
  let {focusable = false} = $$props;
  let {title = void 0} = $$props;
  let {style = void 0} = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.tabindex === void 0 && $$bindings.tabindex && tabindex !== void 0)
    $$bindings.tabindex(tabindex);
  if ($$props.focusable === void 0 && $$bindings.focusable && focusable !== void 0)
    $$bindings.focusable(focusable);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.style === void 0 && $$bindings.style && style !== void 0)
    $$bindings.style(style);
  ariaLabel = $$props["aria-label"];
  ariaLabelledBy = $$props["aria-labelledby"];
  labelled = ariaLabel || ariaLabelledBy || title;
  attributes = {
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    "aria-hidden": labelled ? void 0 : true,
    role: labelled ? "img" : void 0,
    focusable: tabindex === "0" ? true : focusable,
    tabindex
  };
  return `<svg${spread([
    {"data-carbon-icon": "ChevronRight16"},
    {xmlns: "http://www.w3.org/2000/svg"},
    {viewBox: "0 0 16 16"},
    {fill: "currentColor"},
    {width: "16"},
    {height: "16"},
    {class: escape2(className)},
    {preserveAspectRatio: "xMidYMid meet"},
    {style: escape2(style)},
    {id: escape2(id)},
    attributes
  ])}><path d="${"M11 8L6 13 5.3 12.3 9.6 8 5.3 3.7 6 3z"}"></path>${slots.default ? slots.default({}) : `
    ${title ? `<title>${escape2(title)}</title>` : ``}
  `}</svg>`;
});
var SkeletonText = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let rows;
  let widthNum;
  let widthPx;
  let $$restProps = compute_rest_props($$props, ["lines", "heading", "paragraph", "width"]);
  let {lines = 3} = $$props;
  let {heading = false} = $$props;
  let {paragraph = false} = $$props;
  let {width = "100%"} = $$props;
  const RANDOM = [0.973, 0.153, 0.567];
  if ($$props.lines === void 0 && $$bindings.lines && lines !== void 0)
    $$bindings.lines(lines);
  if ($$props.heading === void 0 && $$bindings.heading && heading !== void 0)
    $$bindings.heading(heading);
  if ($$props.paragraph === void 0 && $$bindings.paragraph && paragraph !== void 0)
    $$bindings.paragraph(paragraph);
  if ($$props.width === void 0 && $$bindings.width && width !== void 0)
    $$bindings.width(width);
  rows = [];
  widthNum = parseInt(width, 10);
  widthPx = width.includes("px");
  {
    if (paragraph) {
      for (let i = 0; i < lines; i++) {
        const min = widthPx ? widthNum - 75 : 0;
        const max = widthPx ? widthNum : 75;
        const rand = Math.floor(RANDOM[i % 3] * (max - min + 1)) + min + "px";
        rows = [
          ...rows,
          {
            width: widthPx ? rand : `calc(${width} - ${rand})`
          }
        ];
      }
    }
  }
  return `${paragraph ? `<div${spread([$$restProps])}>${each(rows, ({width: width2}) => `<p style="${"width: " + escape2(width2)}"${add_classes([
    "bx--skeleton__text " + (heading ? "bx--skeleton__heading" : "")
  ].join(" ").trim())}></p>`)}</div>` : `<p${spread([
    $$restProps,
    {
      style: "width: " + escape2(width) + ";" + escape2($$restProps.style)
    }
  ], "bx--skeleton__text " + (heading ? "bx--skeleton__heading" : ""))}></p>`}`;
});
var AccordionSkeleton = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["count", "align", "size", "open"]);
  let {count = 4} = $$props;
  let {align = "end"} = $$props;
  let {size = void 0} = $$props;
  let {open = true} = $$props;
  if ($$props.count === void 0 && $$bindings.count && count !== void 0)
    $$bindings.count(count);
  if ($$props.align === void 0 && $$bindings.align && align !== void 0)
    $$bindings.align(align);
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  if ($$props.open === void 0 && $$bindings.open && open !== void 0)
    $$bindings.open(open);
  return `<ul${spread([$$restProps], "bx--skeleton bx--accordion " + (align === "start" ? "bx--accordion--start" : "") + " " + (align === "end" ? "bx--accordion--end" : "") + " " + (size === "sm" ? "bx--accordion--sm" : "") + " " + (size === "xl" ? "bx--accordion--xl" : ""))}>${open ? `<li${add_classes([
    "bx--accordion__item bx--accordion__item--active"
  ].join(" ").trim())}><span${add_classes(["bx--accordion__heading"].join(" ").trim())}>${validate_component(ChevronRight16, "ChevronRight16").$$render($$result, {class: "bx--accordion__arrow"}, {}, {})}
        ${validate_component(SkeletonText, "SkeletonText").$$render($$result, {class: "bx--accordion__title"}, {}, {})}</span>
      <div class="${"bx--accordion__content"}">${validate_component(SkeletonText, "SkeletonText").$$render($$result, {width: "90%"}, {}, {})}
        ${validate_component(SkeletonText, "SkeletonText").$$render($$result, {width: "80%"}, {}, {})}
        ${validate_component(SkeletonText, "SkeletonText").$$render($$result, {width: "95%"}, {}, {})}</div></li>` : ``}
  ${each(Array.from({length: open ? count - 1 : count}, (_, i) => i), (item) => `<li class="${"bx--accordion__item"}"><span class="${"bx--accordion__heading"}">${validate_component(ChevronRight16, "ChevronRight16").$$render($$result, {class: "bx--accordion__arrow"}, {}, {})}
        ${validate_component(SkeletonText, "SkeletonText").$$render($$result, {class: "bx--accordion__title"}, {}, {})}</span>
    </li>`)}</ul>`;
});
create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["align", "size", "disabled", "skeleton"]);
  let {align = "end"} = $$props;
  let {size = void 0} = $$props;
  let {disabled = false} = $$props;
  let {skeleton = false} = $$props;
  const disableItems = writable2(disabled);
  setContext("Accordion", {disableItems});
  if ($$props.align === void 0 && $$bindings.align && align !== void 0)
    $$bindings.align(align);
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  if ($$props.skeleton === void 0 && $$bindings.skeleton && skeleton !== void 0)
    $$bindings.skeleton(skeleton);
  {
    disableItems.set(disabled);
  }
  return `${skeleton ? `${validate_component(AccordionSkeleton, "AccordionSkeleton").$$render($$result, Object.assign($$restProps, {align}, {size}), {}, {})}` : `<ul${spread([$$restProps], "bx--accordion " + (align === "start" ? "bx--accordion--start" : "") + " " + (align === "end" ? "bx--accordion--end" : "") + " " + (size === "sm" ? "bx--accordion--sm" : "") + " " + (size === "xl" ? "bx--accordion--xl" : ""))}>${slots.default ? slots.default({}) : ``}</ul>`}`;
});
create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["title", "open", "disabled", "iconDescription"]);
  let {title = "title"} = $$props;
  let {open = false} = $$props;
  let {disabled = false} = $$props;
  let {iconDescription = "Expand/Collapse"} = $$props;
  let initialDisabled = disabled;
  const ctx = getContext("Accordion");
  const unsubscribe = ctx.disableItems.subscribe((value) => {
    if (!value && initialDisabled)
      return;
    disabled = value;
  });
  onMount(() => {
    return () => {
      unsubscribe();
    };
  });
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.open === void 0 && $$bindings.open && open !== void 0)
    $$bindings.open(open);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  if ($$props.iconDescription === void 0 && $$bindings.iconDescription && iconDescription !== void 0)
    $$bindings.iconDescription(iconDescription);
  return `<li${spread([$$restProps], "bx--accordion__item " + (open ? "bx--accordion__item--active" : "") + " " + (disabled ? "bx--accordion__item--disabled" : "") + "  ")}><button type="${"button"}"${add_attribute("title", iconDescription, 0)}${add_attribute("aria-expanded", open, 0)} ${disabled ? "disabled" : ""}${add_classes(["bx--accordion__heading"].join(" ").trim())}>${validate_component(ChevronRight16, "ChevronRight16").$$render($$result, {
    class: "bx--accordion__arrow",
    "aria-label": iconDescription
  }, {}, {})}
    <div${add_classes(["bx--accordion__title"].join(" ").trim())}>${slots.title ? slots.title({}) : `${escape2(title)}`}</div></button>
  <div${add_classes(["bx--accordion__content"].join(" ").trim())}>${slots.default ? slots.default({}) : ``}</div></li>`;
});
var AspectRatio = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["ratio"]);
  let {ratio = "2x1"} = $$props;
  if ($$props.ratio === void 0 && $$bindings.ratio && ratio !== void 0)
    $$bindings.ratio(ratio);
  return `<div${spread([$$restProps], "bx--aspect-ratio " + (ratio === "2x1" ? "bx--aspect-ratio--2x1" : "") + " " + (ratio === "16x9" ? "bx--aspect-ratio--16x9" : "") + " " + (ratio === "4x3" ? "bx--aspect-ratio--4x3" : "") + " " + (ratio === "1x1" ? "bx--aspect-ratio--1x1" : "") + " " + (ratio === "3x4" ? "bx--aspect-ratio--3x4" : "") + " " + (ratio === "3x2" ? "bx--aspect-ratio--3x2" : "") + " " + (ratio === "9x16" ? "bx--aspect-ratio--9x16" : "") + " " + (ratio === "1x2" ? "bx--aspect-ratio--1x2" : ""))}><div${add_classes(["bx--aspect-ratio--object"].join(" ").trim())}>${slots.default ? slots.default({}) : ``}</div></div>`;
});
var BreadcrumbSkeleton = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["noTrailingSlash", "count"]);
  let {noTrailingSlash = false} = $$props;
  let {count = 3} = $$props;
  if ($$props.noTrailingSlash === void 0 && $$bindings.noTrailingSlash && noTrailingSlash !== void 0)
    $$bindings.noTrailingSlash(noTrailingSlash);
  if ($$props.count === void 0 && $$bindings.count && count !== void 0)
    $$bindings.count(count);
  return `<div${spread([$$restProps], "bx--skeleton bx--breadcrumb " + (noTrailingSlash ? "bx--breadcrumb--no-trailing-slash" : ""))}>${each(Array.from({length: count}, (_, i) => i), (item) => `<div${add_classes(["bx--breadcrumb-item"].join(" ").trim())}><span${add_classes(["bx--link"].join(" ").trim())}>\xA0</span>
    </div>`)}</div>`;
});
create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["noTrailingSlash", "skeleton"]);
  let {noTrailingSlash = false} = $$props;
  let {skeleton = false} = $$props;
  if ($$props.noTrailingSlash === void 0 && $$bindings.noTrailingSlash && noTrailingSlash !== void 0)
    $$bindings.noTrailingSlash(noTrailingSlash);
  if ($$props.skeleton === void 0 && $$bindings.skeleton && skeleton !== void 0)
    $$bindings.skeleton(skeleton);
  return `${skeleton ? `${validate_component(BreadcrumbSkeleton, "BreadcrumbSkeleton").$$render($$result, Object.assign({noTrailingSlash}, $$restProps), {}, {})}` : `<nav${spread([{"aria-label": "Breadcrumb"}, $$restProps])}><ol${add_classes([
    "bx--breadcrumb " + (noTrailingSlash ? "bx--breadcrumb--no-trailing-slash" : "")
  ].join(" ").trim())}>${slots.default ? slots.default({}) : ``}</ol></nav>`}`;
});
var Link = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["size", "href", "inline", "icon", "disabled", "visited", "ref"]);
  let {size = void 0} = $$props;
  let {href = void 0} = $$props;
  let {inline = false} = $$props;
  let {icon = void 0} = $$props;
  let {disabled = false} = $$props;
  let {visited = false} = $$props;
  let {ref = null} = $$props;
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  if ($$props.href === void 0 && $$bindings.href && href !== void 0)
    $$bindings.href(href);
  if ($$props.inline === void 0 && $$bindings.inline && inline !== void 0)
    $$bindings.inline(inline);
  if ($$props.icon === void 0 && $$bindings.icon && icon !== void 0)
    $$bindings.icon(icon);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  if ($$props.visited === void 0 && $$bindings.visited && visited !== void 0)
    $$bindings.visited(visited);
  if ($$props.ref === void 0 && $$bindings.ref && ref !== void 0)
    $$bindings.ref(ref);
  return `${disabled ? `<p${spread([$$restProps], "bx--link " + (disabled ? "bx--link--disabled" : "") + " " + (inline ? "bx--link--inline" : "") + " " + (visited ? "bx--link--visited" : ""))}${add_attribute("this", ref, 1)}>${slots.default ? slots.default({}) : ``}${!inline && icon ? `<div${add_classes(["bx--link__icon"].join(" ").trim())}>${validate_component(icon || missing_component, "svelte:component").$$render($$result, {}, {}, {})}</div>` : ``}</p>` : `<a${spread([
    {
      rel: escape2($$restProps.target === "_blank" ? "noopener noreferrer" : void 0)
    },
    {href: escape2(href)},
    $$restProps
  ], "bx--link " + (disabled ? "bx--link--disabled" : "") + " " + (inline ? "bx--link--inline" : "") + " " + (visited ? "bx--link--visited" : "") + " " + (size === "sm" ? "bx--link--sm" : "") + " " + (size === "lg" ? "bx--link--lg" : ""))}${add_attribute("this", ref, 1)}>${slots.default ? slots.default({}) : ``}${!inline && icon ? `<div${add_classes(["bx--link__icon"].join(" ").trim())}>${validate_component(icon || missing_component, "svelte:component").$$render($$result, {}, {}, {})}</div>` : ``}</a>`}`;
});
create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["href", "isCurrentPage"]);
  let {href = void 0} = $$props;
  let {isCurrentPage = false} = $$props;
  setContext("BreadcrumbItem", {});
  if ($$props.href === void 0 && $$bindings.href && href !== void 0)
    $$bindings.href(href);
  if ($$props.isCurrentPage === void 0 && $$bindings.isCurrentPage && isCurrentPage !== void 0)
    $$bindings.isCurrentPage(isCurrentPage);
  return `<li${spread([$$restProps], "bx--breadcrumb-item " + (isCurrentPage && $$restProps["aria-current"] !== "page" ? "bx--breadcrumb-item--current" : ""))}>${href ? `${validate_component(Link, "Link").$$render($$result, {
    href,
    "aria-current": $$restProps["aria-current"]
  }, {}, {
    default: () => `${slots.default ? slots.default({
      props: {
        "aria-current": $$restProps["aria-current"],
        class: "bx--link"
      }
    }) : ``}`
  })}` : `${slots.default ? slots.default({
    props: {
      "aria-current": $$restProps["aria-current"],
      class: "bx--link"
    }
  }) : ``}`}</li>`;
});
var ButtonSkeleton = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["href", "size", "small"]);
  let {href = void 0} = $$props;
  let {size = "default"} = $$props;
  let {small = false} = $$props;
  if ($$props.href === void 0 && $$bindings.href && href !== void 0)
    $$bindings.href(href);
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  if ($$props.small === void 0 && $$bindings.small && small !== void 0)
    $$bindings.small(small);
  return `${href ? `<a${spread([
    {href: escape2(href)},
    {
      rel: escape2($$restProps.target === "_blank" ? "noopener noreferrer" : void 0)
    },
    {role: "button"},
    $$restProps
  ], "bx--skeleton bx--btn " + (size === "field" ? "bx--btn--field" : "") + " " + (size === "small" || small ? "bx--btn--sm" : ""))}>${escape2("")}</a>` : `<div${spread([$$restProps], "bx--skeleton bx--btn " + (size === "field" ? "bx--btn--field" : "") + " " + (size === "small" || small ? "bx--btn--sm" : ""))}></div>`}`;
});
var Button = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let buttonProps;
  let $$restProps = compute_rest_props($$props, [
    "kind",
    "size",
    "isSelected",
    "hasIconOnly",
    "icon",
    "iconDescription",
    "tooltipAlignment",
    "tooltipPosition",
    "as",
    "skeleton",
    "disabled",
    "href",
    "tabindex",
    "type",
    "ref"
  ]);
  let $$slots = compute_slots(slots);
  let {kind = "primary"} = $$props;
  let {size = "default"} = $$props;
  let {isSelected = false} = $$props;
  let {hasIconOnly = false} = $$props;
  let {icon = void 0} = $$props;
  let {iconDescription = void 0} = $$props;
  let {tooltipAlignment = "center"} = $$props;
  let {tooltipPosition = "bottom"} = $$props;
  let {as = false} = $$props;
  let {skeleton = false} = $$props;
  let {disabled = false} = $$props;
  let {href = void 0} = $$props;
  let {tabindex = "0"} = $$props;
  let {type = "button"} = $$props;
  let {ref = null} = $$props;
  const ctx = getContext("ComposedModal");
  if ($$props.kind === void 0 && $$bindings.kind && kind !== void 0)
    $$bindings.kind(kind);
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  if ($$props.isSelected === void 0 && $$bindings.isSelected && isSelected !== void 0)
    $$bindings.isSelected(isSelected);
  if ($$props.hasIconOnly === void 0 && $$bindings.hasIconOnly && hasIconOnly !== void 0)
    $$bindings.hasIconOnly(hasIconOnly);
  if ($$props.icon === void 0 && $$bindings.icon && icon !== void 0)
    $$bindings.icon(icon);
  if ($$props.iconDescription === void 0 && $$bindings.iconDescription && iconDescription !== void 0)
    $$bindings.iconDescription(iconDescription);
  if ($$props.tooltipAlignment === void 0 && $$bindings.tooltipAlignment && tooltipAlignment !== void 0)
    $$bindings.tooltipAlignment(tooltipAlignment);
  if ($$props.tooltipPosition === void 0 && $$bindings.tooltipPosition && tooltipPosition !== void 0)
    $$bindings.tooltipPosition(tooltipPosition);
  if ($$props.as === void 0 && $$bindings.as && as !== void 0)
    $$bindings.as(as);
  if ($$props.skeleton === void 0 && $$bindings.skeleton && skeleton !== void 0)
    $$bindings.skeleton(skeleton);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  if ($$props.href === void 0 && $$bindings.href && href !== void 0)
    $$bindings.href(href);
  if ($$props.tabindex === void 0 && $$bindings.tabindex && tabindex !== void 0)
    $$bindings.tabindex(tabindex);
  if ($$props.type === void 0 && $$bindings.type && type !== void 0)
    $$bindings.type(type);
  if ($$props.ref === void 0 && $$bindings.ref && ref !== void 0)
    $$bindings.ref(ref);
  {
    if (ctx && ref) {
      ctx.declareRef(ref);
    }
  }
  hasIconOnly = icon && !$$slots.default;
  buttonProps = {
    type: href && !disabled ? void 0 : type,
    tabindex,
    disabled,
    href,
    "aria-pressed": hasIconOnly && kind === "ghost" ? isSelected : void 0,
    ...$$restProps,
    class: [
      "bx--btn",
      size === "field" && "bx--btn--field",
      size === "small" && "bx--btn--sm",
      kind && `bx--btn--${kind}`,
      disabled && "bx--btn--disabled",
      hasIconOnly && "bx--btn--icon-only",
      hasIconOnly && "bx--tooltip__trigger",
      hasIconOnly && "bx--tooltip--a11y",
      hasIconOnly && tooltipPosition && `bx--tooltip--${tooltipPosition}`,
      hasIconOnly && tooltipAlignment && `bx--tooltip--align-${tooltipAlignment}`,
      hasIconOnly && isSelected && kind === "ghost" && "bx--btn--selected",
      $$restProps.class
    ].filter(Boolean).join(" ")
  };
  return `${skeleton ? `${validate_component(ButtonSkeleton, "ButtonSkeleton").$$render($$result, Object.assign({href}, {size}, $$restProps, {style: hasIconOnly && "width: 3rem;"}), {}, {})}` : `${as ? `${slots.default ? slots.default({props: buttonProps}) : ``}` : `${href && !disabled ? `
  <a${spread([buttonProps])}${add_attribute("this", ref, 1)}>${hasIconOnly ? `<span${add_classes(["bx--assistive-text"].join(" ").trim())}>${escape2(iconDescription)}</span>` : ``}
    ${slots.default ? slots.default({}) : ``}${validate_component(icon || missing_component, "svelte:component").$$render($$result, {
    "aria-hidden": "true",
    class: "bx--btn__icon",
    "aria-label": iconDescription
  }, {}, {})}</a>` : `<button${spread([buttonProps])}${add_attribute("this", ref, 1)}>${hasIconOnly ? `<span${add_classes(["bx--assistive-text"].join(" ").trim())}>${escape2(iconDescription)}</span>` : ``}
    ${slots.default ? slots.default({}) : ``}${validate_component(icon || missing_component, "svelte:component").$$render($$result, {
    "aria-hidden": "true",
    class: "bx--btn__icon",
    "aria-label": iconDescription
  }, {}, {})}</button>`}`}`}`;
});
create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["stacked"]);
  let {stacked = false} = $$props;
  if ($$props.stacked === void 0 && $$bindings.stacked && stacked !== void 0)
    $$bindings.stacked(stacked);
  return `<div${spread([$$restProps], "bx--btn-set " + (stacked ? "bx--btn-set--stacked" : ""))}>${slots.default ? slots.default({}) : ``}</div>`;
});
var CheckboxSkeleton = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, []);
  return `<div${spread([$$restProps], "bx--form-item bx--checkbox-wrapper bx--checkbox-label")}><span${add_classes(["bx--checkbox-label-text bx--skeleton"].join(" ").trim())}></span></div>`;
});
var Checkbox = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, [
    "checked",
    "indeterminate",
    "skeleton",
    "readonly",
    "disabled",
    "labelText",
    "hideLabel",
    "name",
    "title",
    "id",
    "ref"
  ]);
  let {checked = false} = $$props;
  let {indeterminate = false} = $$props;
  let {skeleton = false} = $$props;
  let {readonly = false} = $$props;
  let {disabled = false} = $$props;
  let {labelText = ""} = $$props;
  let {hideLabel = false} = $$props;
  let {name = ""} = $$props;
  let {title = void 0} = $$props;
  let {id = "ccs-" + Math.random().toString(36)} = $$props;
  let {ref = null} = $$props;
  const dispatch = createEventDispatcher();
  if ($$props.checked === void 0 && $$bindings.checked && checked !== void 0)
    $$bindings.checked(checked);
  if ($$props.indeterminate === void 0 && $$bindings.indeterminate && indeterminate !== void 0)
    $$bindings.indeterminate(indeterminate);
  if ($$props.skeleton === void 0 && $$bindings.skeleton && skeleton !== void 0)
    $$bindings.skeleton(skeleton);
  if ($$props.readonly === void 0 && $$bindings.readonly && readonly !== void 0)
    $$bindings.readonly(readonly);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  if ($$props.labelText === void 0 && $$bindings.labelText && labelText !== void 0)
    $$bindings.labelText(labelText);
  if ($$props.hideLabel === void 0 && $$bindings.hideLabel && hideLabel !== void 0)
    $$bindings.hideLabel(hideLabel);
  if ($$props.name === void 0 && $$bindings.name && name !== void 0)
    $$bindings.name(name);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.ref === void 0 && $$bindings.ref && ref !== void 0)
    $$bindings.ref(ref);
  {
    dispatch("check", checked);
  }
  return `${skeleton ? `${validate_component(CheckboxSkeleton, "CheckboxSkeleton").$$render($$result, Object.assign($$restProps), {}, {})}` : `<div${spread([$$restProps], "bx--form-item bx--checkbox-wrapper")}><input type="${"checkbox"}" ${checked ? "checked" : ""} ${disabled ? "disabled" : ""}${add_attribute("id", id, 0)}${add_attribute("indeterminate", indeterminate, 0)}${add_attribute("name", name, 0)} ${readonly ? "readonly" : ""}${add_classes(["bx--checkbox"].join(" ").trim())}${add_attribute("this", ref, 1)}>
    <label${add_attribute("for", id, 0)}${add_attribute("title", title, 0)}${add_classes(["bx--checkbox-label"].join(" ").trim())}><span${add_classes([
    "bx--checkbox-label-text " + (hideLabel ? "bx--visually-hidden" : "")
  ].join(" ").trim())}>${escape2(labelText)}</span></label></div>`}`;
});
var InlineCheckbox = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["checked", "indeterminate", "title", "id", "ref"]);
  let {checked = false} = $$props;
  let {indeterminate = false} = $$props;
  let {title = void 0} = $$props;
  let {id = "ccs-" + Math.random().toString(36)} = $$props;
  let {ref = null} = $$props;
  if ($$props.checked === void 0 && $$bindings.checked && checked !== void 0)
    $$bindings.checked(checked);
  if ($$props.indeterminate === void 0 && $$bindings.indeterminate && indeterminate !== void 0)
    $$bindings.indeterminate(indeterminate);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.ref === void 0 && $$bindings.ref && ref !== void 0)
    $$bindings.ref(ref);
  return `<input${spread([
    {type: "checkbox"},
    {
      checked: (indeterminate ? false : checked) || null
    },
    {indeterminate: escape2(indeterminate)},
    {id: escape2(id)},
    $$restProps,
    {"aria-label": escape2(void 0)},
    {
      "aria-checked": escape2(indeterminate ? "mixed" : checked)
    }
  ], "bx--checkbox")}${add_attribute("this", ref, 1)}>
<label${add_attribute("for", id, 0)}${add_attribute("title", title, 0)}${add_attribute("aria-label", $$props["aria-label"], 0)}${add_classes(["bx--checkbox-label"].join(" ").trim())}></label>`;
});
create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let currentIndex;
  let switches;
  let $$restProps = compute_rest_props($$props, ["selectedIndex", "light", "size"]);
  let {selectedIndex = 0} = $$props;
  let {light = false} = $$props;
  let {size = void 0} = $$props;
  const dispatch = createEventDispatcher();
  const currentId = writable2(null);
  setContext("ContentSwitcher", {
    currentId,
    add: ({id, text, selected}) => {
      if (selected) {
        selectedIndex = switches.length;
      }
      switches = [...switches, {id, text, selected}];
    },
    update: (id) => {
      selectedIndex = switches.map(({id: id2}) => id2).indexOf(id);
    },
    change: (direction2) => {
      let index2 = currentIndex + direction2;
      if (index2 < 0) {
        index2 = switches.length - 1;
      } else if (index2 >= switches.length) {
        index2 = 0;
      }
      selectedIndex = index2;
    }
  });
  afterUpdate(() => {
    if (selectedIndex !== currentIndex) {
      currentIndex = selectedIndex;
    }
  });
  if ($$props.selectedIndex === void 0 && $$bindings.selectedIndex && selectedIndex !== void 0)
    $$bindings.selectedIndex(selectedIndex);
  if ($$props.light === void 0 && $$bindings.light && light !== void 0)
    $$bindings.light(light);
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  currentIndex = -1;
  switches = [];
  {
    if (switches[currentIndex]) {
      dispatch("change", currentIndex);
      currentId.set(switches[currentIndex].id);
    }
  }
  return `<div${spread([{role: "tablist"}, $$restProps], "bx--content-switcher " + (light ? "bx--content-switcher--light" : "") + " " + (size === "sm" ? "bx--content-switcher--sm" : "") + " " + (size === "xl" ? "bx--content-switcher--xl" : ""))}>${slots.default ? slots.default({}) : ``}</div>`;
});
create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["text", "selected", "disabled", "id", "ref"]);
  let {text = "Provide text"} = $$props;
  let {selected = false} = $$props;
  let {disabled = false} = $$props;
  let {id = "ccs-" + Math.random().toString(36)} = $$props;
  let {ref = null} = $$props;
  const ctx = getContext("ContentSwitcher");
  ctx.add({id, text, selected});
  const unsubscribe = ctx.currentId.subscribe(($) => {
    selected = $ === id;
  });
  afterUpdate(() => {
    if (selected) {
      ref.focus();
    }
  });
  onDestroy(() => {
    unsubscribe();
  });
  if ($$props.text === void 0 && $$bindings.text && text !== void 0)
    $$bindings.text(text);
  if ($$props.selected === void 0 && $$bindings.selected && selected !== void 0)
    $$bindings.selected(selected);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.ref === void 0 && $$bindings.ref && ref !== void 0)
    $$bindings.ref(ref);
  return `<button${spread([
    {role: "tab"},
    {tabindex: escape2(selected ? "0" : "-1")},
    {"aria-selected": escape2(selected)},
    {disabled: disabled || null},
    {id: escape2(id)},
    $$restProps
  ], "bx--content-switcher-btn " + (selected ? "bx--content-switcher--selected" : ""))}${add_attribute("this", ref, 1)}><span${add_classes(["bx--content-switcher__label"].join(" ").trim())}>${slots.default ? slots.default({}) : `${escape2(text)}`}</span></button>`;
});
var direction = 1;
var ContextMenu = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let level;
  let $$restProps = compute_rest_props($$props, ["open", "x", "y", "ref"]);
  let $hasPopup, $$unsubscribe_hasPopup;
  let {open = false} = $$props;
  let {x = 0} = $$props;
  let {y = 0} = $$props;
  let {ref = null} = $$props;
  const dispatch = createEventDispatcher();
  const position = writable2([x, y]);
  const currentIndex = writable2(-1);
  const hasPopup = writable2(false);
  $$unsubscribe_hasPopup = subscribe(hasPopup, (value) => $hasPopup = value);
  const menuOffsetX = writable2(0);
  const ctx = getContext("ContextMenu");
  let options2 = [];
  let prevX = 0;
  let prevY = 0;
  let focusIndex = -1;
  function close() {
    open = false;
    x = 0;
    y = 0;
    prevX = 0;
    prevY = 0;
    focusIndex = -1;
  }
  setContext("ContextMenu", {
    menuOffsetX,
    currentIndex,
    position,
    close,
    setPopup: (popup) => {
      hasPopup.set(popup);
    }
  });
  afterUpdate(() => {
    if (open) {
      options2 = [...ref.querySelectorAll("li[data-nested='false']")];
      if (level === 1) {
        if (prevX !== x || prevY !== y)
          ref.focus();
        prevX = x;
        prevY = y;
      }
      dispatch("open");
    } else {
      dispatch("close");
    }
    if (!$hasPopup && options2[focusIndex])
      options2[focusIndex].focus();
  });
  if ($$props.open === void 0 && $$bindings.open && open !== void 0)
    $$bindings.open(open);
  if ($$props.x === void 0 && $$bindings.x && x !== void 0)
    $$bindings.x(x);
  if ($$props.y === void 0 && $$bindings.y && y !== void 0)
    $$bindings.y(y);
  if ($$props.ref === void 0 && $$bindings.ref && ref !== void 0)
    $$bindings.ref(ref);
  level = !ctx ? 1 : 2;
  {
    currentIndex.set(focusIndex);
  }
  $$unsubscribe_hasPopup();
  return `

<ul${spread([
    {role: "menu"},
    {tabindex: "-1"},
    {"data-direction": escape2(direction)},
    {"data-level": escape2(level)},
    $$restProps,
    {
      style: "left: " + escape2(x) + "px; top: " + escape2(y) + "px; " + escape2($$restProps.style)
    }
  ], "bx--context-menu " + (open ? "bx--context-menu--open" : "") + " " + (open && x === 0 && y === 0 ? "bx--context-menu--invisible" : "") + " " + (level === 1 ? "bx--context-menu--root" : ""))}${add_attribute("this", ref, 1)}>${slots.default ? slots.default({}) : ``}</ul>`;
});
create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<li role="${"separator"}"${add_classes(["bx--context-menu-divider"].join(" ").trim())}></li>`;
});
create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let {selectedIds = []} = $$props;
  let {labelText = ""} = $$props;
  const currentIds = writable2([]);
  setContext("ContextMenuGroup", {
    currentIds,
    addOption: ({id}) => {
      if (!selectedIds.includes(id)) {
        selectedIds = [...selectedIds, id];
      }
    },
    toggleOption: ({id}) => {
      if (!selectedIds.includes(id)) {
        selectedIds = [...selectedIds, id];
      } else {
        selectedIds = selectedIds.filter((_) => _ !== id);
      }
    }
  });
  if ($$props.selectedIds === void 0 && $$bindings.selectedIds && selectedIds !== void 0)
    $$bindings.selectedIds(selectedIds);
  if ($$props.labelText === void 0 && $$bindings.labelText && labelText !== void 0)
    $$bindings.labelText(labelText);
  {
    currentIds.set(selectedIds);
  }
  return `<li role="${"none"}"><ul role="${"group"}"${add_attribute("aria-label", labelText, 0)}>${slots.default ? slots.default({}) : ``}</ul></li>`;
});
var Checkmark16 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let ariaLabel;
  let ariaLabelledBy;
  let labelled;
  let attributes;
  let {class: className = void 0} = $$props;
  let {id = void 0} = $$props;
  let {tabindex = void 0} = $$props;
  let {focusable = false} = $$props;
  let {title = void 0} = $$props;
  let {style = void 0} = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.tabindex === void 0 && $$bindings.tabindex && tabindex !== void 0)
    $$bindings.tabindex(tabindex);
  if ($$props.focusable === void 0 && $$bindings.focusable && focusable !== void 0)
    $$bindings.focusable(focusable);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.style === void 0 && $$bindings.style && style !== void 0)
    $$bindings.style(style);
  ariaLabel = $$props["aria-label"];
  ariaLabelledBy = $$props["aria-labelledby"];
  labelled = ariaLabel || ariaLabelledBy || title;
  attributes = {
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    "aria-hidden": labelled ? void 0 : true,
    role: labelled ? "img" : void 0,
    focusable: tabindex === "0" ? true : focusable,
    tabindex
  };
  return `<svg${spread([
    {"data-carbon-icon": "Checkmark16"},
    {xmlns: "http://www.w3.org/2000/svg"},
    {viewBox: "0 0 32 32"},
    {fill: "currentColor"},
    {width: "16"},
    {height: "16"},
    {class: escape2(className)},
    {preserveAspectRatio: "xMidYMid meet"},
    {style: escape2(style)},
    {id: escape2(id)},
    attributes
  ])}><path d="${"M13 24L4 15 5.414 13.586 13 21.171 26.586 7.586 28 9 13 24z"}"></path>${slots.default ? slots.default({}) : `
    ${title ? `<title>${escape2(title)}</title>` : ``}
  `}</svg>`;
});
var CaretRight16 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let ariaLabel;
  let ariaLabelledBy;
  let labelled;
  let attributes;
  let {class: className = void 0} = $$props;
  let {id = void 0} = $$props;
  let {tabindex = void 0} = $$props;
  let {focusable = false} = $$props;
  let {title = void 0} = $$props;
  let {style = void 0} = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.tabindex === void 0 && $$bindings.tabindex && tabindex !== void 0)
    $$bindings.tabindex(tabindex);
  if ($$props.focusable === void 0 && $$bindings.focusable && focusable !== void 0)
    $$bindings.focusable(focusable);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.style === void 0 && $$bindings.style && style !== void 0)
    $$bindings.style(style);
  ariaLabel = $$props["aria-label"];
  ariaLabelledBy = $$props["aria-labelledby"];
  labelled = ariaLabel || ariaLabelledBy || title;
  attributes = {
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    "aria-hidden": labelled ? void 0 : true,
    role: labelled ? "img" : void 0,
    focusable: tabindex === "0" ? true : focusable,
    tabindex
  };
  return `<svg${spread([
    {"data-carbon-icon": "CaretRight16"},
    {xmlns: "http://www.w3.org/2000/svg"},
    {viewBox: "0 0 32 32"},
    {fill: "currentColor"},
    {width: "16"},
    {height: "16"},
    {class: escape2(className)},
    {preserveAspectRatio: "xMidYMid meet"},
    {style: escape2(style)},
    {id: escape2(id)},
    attributes
  ])}><path d="${"M12 8L22 16 12 24z"}"></path>${slots.default ? slots.default({}) : `
    ${title ? `<title>${escape2(title)}</title>` : ``}
  `}</svg>`;
});
create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let isSelectable;
  let isRadio;
  let subOptions;
  let $$restProps = compute_rest_props($$props, [
    "kind",
    "disabled",
    "indented",
    "icon",
    "labelText",
    "selected",
    "selectable",
    "shortcutText",
    "id",
    "ref"
  ]);
  let $$slots = compute_slots(slots);
  let {kind = "default"} = $$props;
  let {disabled = false} = $$props;
  let {indented = false} = $$props;
  let {icon = void 0} = $$props;
  let {labelText = ""} = $$props;
  let {selected = false} = $$props;
  let {selectable = false} = $$props;
  let {shortcutText = ""} = $$props;
  let {id = "ccs-" + Math.random().toString(36)} = $$props;
  let {ref = null} = $$props;
  createEventDispatcher();
  const ctx = getContext("ContextMenu");
  const ctxGroup = getContext("ContextMenuGroup");
  const ctxRadioGroup = getContext("ContextMenuRadioGroup");
  let unsubCurrentIds = void 0;
  let unsubCurrentId = void 0;
  let role = "menuitem";
  let submenuOpen = false;
  let submenuPosition = [0, 0];
  const unsubPosition = ctx.position.subscribe((position) => {
  });
  const unsubMenuOffsetX = ctx.menuOffsetX.subscribe((_menuOffsetX) => {
  });
  onMount(() => {
    if (selected === true)
      selectable = true;
    if (ctxGroup) {
      unsubCurrentIds = ctxGroup.currentIds.subscribe((_currentIds) => {
        selected = _currentIds.includes(id);
      });
    }
    if (ctxRadioGroup) {
      unsubCurrentId = ctxRadioGroup.currentId.subscribe((_id) => {
        selected = id === _id;
      });
    }
    return () => {
      unsubPosition();
      unsubMenuOffsetX();
      if (unsubCurrentIds)
        unsubCurrentIds();
      if (unsubCurrentId)
        unsubCurrentId();
    };
  });
  if ($$props.kind === void 0 && $$bindings.kind && kind !== void 0)
    $$bindings.kind(kind);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  if ($$props.indented === void 0 && $$bindings.indented && indented !== void 0)
    $$bindings.indented(indented);
  if ($$props.icon === void 0 && $$bindings.icon && icon !== void 0)
    $$bindings.icon(icon);
  if ($$props.labelText === void 0 && $$bindings.labelText && labelText !== void 0)
    $$bindings.labelText(labelText);
  if ($$props.selected === void 0 && $$bindings.selected && selected !== void 0)
    $$bindings.selected(selected);
  if ($$props.selectable === void 0 && $$bindings.selectable && selectable !== void 0)
    $$bindings.selectable(selectable);
  if ($$props.shortcutText === void 0 && $$bindings.shortcutText && shortcutText !== void 0)
    $$bindings.shortcutText(shortcutText);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.ref === void 0 && $$bindings.ref && ref !== void 0)
    $$bindings.ref(ref);
  isSelectable = !!ctxGroup || selectable;
  isRadio = !!ctxRadioGroup;
  subOptions = $$slots.default;
  {
    ctx.setPopup(submenuOpen);
  }
  {
    {
      if (isSelectable) {
        indented = true;
        role = "menuitemcheckbox";
        if (selected) {
          if (ctxGroup)
            ctxGroup.addOption({id});
          icon = Checkmark16;
        } else {
          icon = void 0;
        }
      }
      if (isRadio) {
        indented = true;
        role = "menuitemradio";
        ctxRadioGroup.addOption({id});
        if (selected) {
          if (ctxRadioGroup)
            ctxRadioGroup.setOption({id});
          icon = Checkmark16;
        } else {
          icon = void 0;
        }
      }
    }
  }
  return `<li${spread([
    {role: escape2(role)},
    {tabindex: "-1"},
    {
      "aria-disabled": escape2(!subOptions && disabled)
    },
    {
      "aria-haspopup": escape2(subOptions ? true : void 0)
    },
    {
      "aria-expanded": escape2(subOptions ? submenuOpen : void 0)
    },
    {indented: escape2(indented)},
    {
      "aria-checked": escape2(isSelectable || isRadio ? selected : void 0)
    },
    {
      "data-nested": escape2(ref && ref.closest(".bx--context-menu").getAttribute("data-level") === "2")
    },
    {"data-sub": escape2(subOptions)},
    {"data-id": escape2(id)},
    $$restProps
  ], "bx--context-menu-option bx--context-menu-option--disabled " + (subOptions && submenuOpen ? "bx--context-menu-option--active" : "") + " " + (!subOptions && kind === "danger" ? "bx--context-menu-option--danger" : ""))}${add_attribute("this", ref, 1)}>${subOptions ? `<div${add_classes([
    "bx--context-menu-option__content " + (disabled ? "bx--context-menu-option__content--disabled" : "")
  ].join(" ").trim())}>${indented ? `<div${add_classes(["bx--context-menu-option__icon"].join(" ").trim())}>${validate_component(icon || missing_component, "svelte:component").$$render($$result, {}, {}, {})}</div>` : ``}
      <span${add_attribute("title", labelText, 0)}${add_classes(["bx--context-menu-option__label"].join(" ").trim())}>${slots.labelText ? slots.labelText({}) : `${escape2(labelText)}`}</span>
      <div${add_classes(["bx--context-menu-option__info"].join(" ").trim())}>${validate_component(CaretRight16, "CaretRight16").$$render($$result, {}, {}, {})}</div></div>

    ${validate_component(ContextMenu, "ContextMenu").$$render($$result, {
    open: submenuOpen,
    x: submenuPosition[0],
    y: submenuPosition[1]
  }, {}, {
    default: () => `${slots.default ? slots.default({}) : ``}`
  })}` : `<div${add_classes([
    "bx--context-menu-option__content " + (disabled ? "bx--context-menu-option__content--disabled" : "")
  ].join(" ").trim())}>${indented ? `<div${add_classes(["bx--context-menu-option__icon"].join(" ").trim())}>${validate_component(icon || missing_component, "svelte:component").$$render($$result, {}, {}, {})}</div>` : ``}
      <span${add_attribute("title", labelText, 0)}${add_classes(["bx--context-menu-option__label"].join(" ").trim())}>${slots.labelText ? slots.labelText({}) : `${escape2(labelText)}`}</span>
      <div${add_classes(["bx--context-menu-option__info"].join(" ").trim())}>${slots.shortcutText ? slots.shortcutText({}) : `${escape2(shortcutText)}`}</div></div>`}</li>`;
});
create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $radioIds, $$unsubscribe_radioIds;
  let {selectedId = ""} = $$props;
  let {labelText = ""} = $$props;
  const currentId = writable2("");
  const radioIds = writable2([]);
  $$unsubscribe_radioIds = subscribe(radioIds, (value) => $radioIds = value);
  setContext("ContextMenuRadioGroup", {
    currentId,
    radioIds,
    addOption: ({id}) => {
      if (!$radioIds.includes(id)) {
        radioIds.update((_) => [..._, id]);
      }
    },
    setOption: ({id}) => {
      selectedId = id;
    }
  });
  if ($$props.selectedId === void 0 && $$bindings.selectedId && selectedId !== void 0)
    $$bindings.selectedId(selectedId);
  if ($$props.labelText === void 0 && $$bindings.labelText && labelText !== void 0)
    $$bindings.labelText(labelText);
  {
    currentId.set(selectedId);
  }
  $$unsubscribe_radioIds();
  return `<li role="${"none"}"><ul role="${"group"}"${add_attribute("aria-label", labelText, 0)}>${slots.default ? slots.default({}) : ``}</ul></li>`;
});
var Copy = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["feedback", "feedbackTimeout", "ref"]);
  let {feedback = "Copied!"} = $$props;
  let {feedbackTimeout = 2e3} = $$props;
  let {ref = null} = $$props;
  let animation = void 0;
  let timeout = void 0;
  onMount(() => {
    return () => {
      clearTimeout(timeout);
    };
  });
  if ($$props.feedback === void 0 && $$bindings.feedback && feedback !== void 0)
    $$bindings.feedback(feedback);
  if ($$props.feedbackTimeout === void 0 && $$bindings.feedbackTimeout && feedbackTimeout !== void 0)
    $$bindings.feedbackTimeout(feedbackTimeout);
  if ($$props.ref === void 0 && $$bindings.ref && ref !== void 0)
    $$bindings.ref(ref);
  return `<button${spread([
    {type: "button"},
    {"aria-live": "polite"},
    {
      "aria-label": escape2(void 0)
    },
    $$restProps,
    {
      class: escape2($$restProps.class) + " " + escape2(animation)
    }
  ], "bx--copy ")}${add_attribute("this", ref, 1)}>${slots.default ? slots.default({}) : `
    ${``}
  `}
  <span aria-hidden="${"true"}"${add_classes([
    "bx--assistive-text bx--copy-btn__feedback"
  ].join(" ").trim())}>${escape2(feedback)}</span></button>`;
});
var Copy16 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let ariaLabel;
  let ariaLabelledBy;
  let labelled;
  let attributes;
  let {class: className = void 0} = $$props;
  let {id = void 0} = $$props;
  let {tabindex = void 0} = $$props;
  let {focusable = false} = $$props;
  let {title = void 0} = $$props;
  let {style = void 0} = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.tabindex === void 0 && $$bindings.tabindex && tabindex !== void 0)
    $$bindings.tabindex(tabindex);
  if ($$props.focusable === void 0 && $$bindings.focusable && focusable !== void 0)
    $$bindings.focusable(focusable);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.style === void 0 && $$bindings.style && style !== void 0)
    $$bindings.style(style);
  ariaLabel = $$props["aria-label"];
  ariaLabelledBy = $$props["aria-labelledby"];
  labelled = ariaLabel || ariaLabelledBy || title;
  attributes = {
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    "aria-hidden": labelled ? void 0 : true,
    role: labelled ? "img" : void 0,
    focusable: tabindex === "0" ? true : focusable,
    tabindex
  };
  return `<svg${spread([
    {"data-carbon-icon": "Copy16"},
    {xmlns: "http://www.w3.org/2000/svg"},
    {viewBox: "0 0 32 32"},
    {fill: "currentColor"},
    {width: "16"},
    {height: "16"},
    {class: escape2(className)},
    {preserveAspectRatio: "xMidYMid meet"},
    {style: escape2(style)},
    {id: escape2(id)},
    attributes
  ])}><path d="${"M28,10V28H10V10H28m0-2H10a2,2,0,0,0-2,2V28a2,2,0,0,0,2,2H28a2,2,0,0,0,2-2V10a2,2,0,0,0-2-2Z"}"></path><path d="${"M4,18H2V4A2,2,0,0,1,4,2H18V4H4Z"}"></path>${slots.default ? slots.default({}) : `
    ${title ? `<title>${escape2(title)}</title>` : ``}
  `}</svg>`;
});
var CopyButton = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["iconDescription", "text"]);
  let {iconDescription = "Copy to clipboard"} = $$props;
  let {text = void 0} = $$props;
  createEventDispatcher();
  if ($$props.iconDescription === void 0 && $$bindings.iconDescription && iconDescription !== void 0)
    $$bindings.iconDescription(iconDescription);
  if ($$props.text === void 0 && $$bindings.text && text !== void 0)
    $$bindings.text(text);
  return `${validate_component(Copy, "Copy").$$render($$result, Object.assign({class: "bx--copy-btn"}, {"aria-label": iconDescription}, {title: iconDescription}, $$restProps), {}, {
    default: () => `${validate_component(Copy16, "Copy16").$$render($$result, {class: "bx--snippet__icon"}, {}, {})}`
  })}`;
});
var WarningFilled16 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let ariaLabel;
  let ariaLabelledBy;
  let labelled;
  let attributes;
  let {class: className = void 0} = $$props;
  let {id = void 0} = $$props;
  let {tabindex = void 0} = $$props;
  let {focusable = false} = $$props;
  let {title = void 0} = $$props;
  let {style = void 0} = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.tabindex === void 0 && $$bindings.tabindex && tabindex !== void 0)
    $$bindings.tabindex(tabindex);
  if ($$props.focusable === void 0 && $$bindings.focusable && focusable !== void 0)
    $$bindings.focusable(focusable);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.style === void 0 && $$bindings.style && style !== void 0)
    $$bindings.style(style);
  ariaLabel = $$props["aria-label"];
  ariaLabelledBy = $$props["aria-labelledby"];
  labelled = ariaLabel || ariaLabelledBy || title;
  attributes = {
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    "aria-hidden": labelled ? void 0 : true,
    role: labelled ? "img" : void 0,
    focusable: tabindex === "0" ? true : focusable,
    tabindex
  };
  return `<svg${spread([
    {"data-carbon-icon": "WarningFilled16"},
    {xmlns: "http://www.w3.org/2000/svg"},
    {viewBox: "0 0 16 16"},
    {fill: "currentColor"},
    {width: "16"},
    {height: "16"},
    {class: escape2(className)},
    {preserveAspectRatio: "xMidYMid meet"},
    {style: escape2(style)},
    {id: escape2(id)},
    attributes
  ])}><path d="${"M8,1C4.2,1,1,4.2,1,8s3.2,7,7,7s7-3.1,7-7S11.9,1,8,1z M7.5,4h1v5h-1C7.5,9,7.5,4,7.5,4z M8,12.2	c-0.4,0-0.8-0.4-0.8-0.8s0.3-0.8,0.8-0.8c0.4,0,0.8,0.4,0.8,0.8S8.4,12.2,8,12.2z"}"></path><path d="${"M7.5,4h1v5h-1C7.5,9,7.5,4,7.5,4z M8,12.2c-0.4,0-0.8-0.4-0.8-0.8s0.3-0.8,0.8-0.8	c0.4,0,0.8,0.4,0.8,0.8S8.4,12.2,8,12.2z"}" data-icon-path="${"inner-path"}" opacity="${"0"}"></path>${slots.default ? slots.default({}) : `
    ${title ? `<title>${escape2(title)}</title>` : ``}
  `}</svg>`;
});
var WarningAltFilled16 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let ariaLabel;
  let ariaLabelledBy;
  let labelled;
  let attributes;
  let {class: className = void 0} = $$props;
  let {id = void 0} = $$props;
  let {tabindex = void 0} = $$props;
  let {focusable = false} = $$props;
  let {title = void 0} = $$props;
  let {style = void 0} = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.tabindex === void 0 && $$bindings.tabindex && tabindex !== void 0)
    $$bindings.tabindex(tabindex);
  if ($$props.focusable === void 0 && $$bindings.focusable && focusable !== void 0)
    $$bindings.focusable(focusable);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.style === void 0 && $$bindings.style && style !== void 0)
    $$bindings.style(style);
  ariaLabel = $$props["aria-label"];
  ariaLabelledBy = $$props["aria-labelledby"];
  labelled = ariaLabel || ariaLabelledBy || title;
  attributes = {
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    "aria-hidden": labelled ? void 0 : true,
    role: labelled ? "img" : void 0,
    focusable: tabindex === "0" ? true : focusable,
    tabindex
  };
  return `<svg${spread([
    {"data-carbon-icon": "WarningAltFilled16"},
    {xmlns: "http://www.w3.org/2000/svg"},
    {viewBox: "0 0 32 32"},
    {fill: "currentColor"},
    {width: "16"},
    {height: "16"},
    {class: escape2(className)},
    {preserveAspectRatio: "xMidYMid meet"},
    {style: escape2(style)},
    {id: escape2(id)},
    attributes
  ])}><path fill="${"none"}" d="${"M14.875,11h2.25V21h-2.25ZM16,27a1.5,1.5,0,1,1,1.5-1.5A1.5,1.5,0,0,1,16,27Z"}"></path><path d="${"M29.8872,28.5386l-13-25a1,1,0,0,0-1.7744,0l-13,25A1,1,0,0,0,3,30H29a1,1,0,0,0,.8872-1.4614ZM14.875,11h2.25V21h-2.25ZM16,27a1.5,1.5,0,1,1,1.5-1.5A1.5,1.5,0,0,1,16,27Z"}"></path>${slots.default ? slots.default({}) : `
    ${title ? `<title>${escape2(title)}</title>` : ``}
  `}</svg>`;
});
var ListBox = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, [
    "size",
    "type",
    "open",
    "light",
    "disabled",
    "invalid",
    "invalidText",
    "warn",
    "warnText"
  ]);
  let {size = void 0} = $$props;
  let {type = "default"} = $$props;
  let {open = false} = $$props;
  let {light = false} = $$props;
  let {disabled = false} = $$props;
  let {invalid = false} = $$props;
  let {invalidText = ""} = $$props;
  let {warn = false} = $$props;
  let {warnText = ""} = $$props;
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  if ($$props.type === void 0 && $$bindings.type && type !== void 0)
    $$bindings.type(type);
  if ($$props.open === void 0 && $$bindings.open && open !== void 0)
    $$bindings.open(open);
  if ($$props.light === void 0 && $$bindings.light && light !== void 0)
    $$bindings.light(light);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  if ($$props.invalid === void 0 && $$bindings.invalid && invalid !== void 0)
    $$bindings.invalid(invalid);
  if ($$props.invalidText === void 0 && $$bindings.invalidText && invalidText !== void 0)
    $$bindings.invalidText(invalidText);
  if ($$props.warn === void 0 && $$bindings.warn && warn !== void 0)
    $$bindings.warn(warn);
  if ($$props.warnText === void 0 && $$bindings.warnText && warnText !== void 0)
    $$bindings.warnText(warnText);
  return `<div${spread([
    {role: "listbox"},
    {tabindex: "-1"},
    {
      "data-invalid": escape2(invalid || void 0)
    },
    $$restProps
  ], "bx--list-box " + (size === "sm" ? "bx--list-box--sm" : "") + " " + (size === "xl" ? "bx--list-box--xl" : "") + " " + (type === "inline" ? "bx--list-box--inline" : "") + " " + (disabled ? "bx--list-box--disabled" : "") + " " + (open ? "bx--list-box--expanded" : "") + " " + (light ? "bx--list-box--light" : "") + " " + (!invalid && warn ? "bx--list-box--warning" : ""))}>${slots.default ? slots.default({}) : ``}</div>
${invalid ? `<div${add_classes(["bx--form-requirement"].join(" ").trim())}>${escape2(invalidText)}</div>` : ``}
${!invalid && warn ? `<div${add_classes(["bx--form-requirement"].join(" ").trim())}>${escape2(warnText)}</div>` : ``}`;
});
var ListBoxField = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let ariaExpanded;
  let menuId;
  let $$restProps = compute_rest_props($$props, ["disabled", "role", "tabindex", "translationIds", "translateWithId", "id", "ref"]);
  let {disabled = false} = $$props;
  let {role = "combobox"} = $$props;
  let {tabindex = "-1"} = $$props;
  const translationIds = {close: "close", open: "open"};
  let {translateWithId = (id2) => defaultTranslations[id2]} = $$props;
  let {id = "ccs-" + Math.random().toString(36)} = $$props;
  let {ref = null} = $$props;
  const defaultTranslations = {
    [translationIds.close]: "Close menu",
    [translationIds.open]: "Open menu"
  };
  const ctx = getContext("MultiSelect");
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  if ($$props.role === void 0 && $$bindings.role && role !== void 0)
    $$bindings.role(role);
  if ($$props.tabindex === void 0 && $$bindings.tabindex && tabindex !== void 0)
    $$bindings.tabindex(tabindex);
  if ($$props.translationIds === void 0 && $$bindings.translationIds && translationIds !== void 0)
    $$bindings.translationIds(translationIds);
  if ($$props.translateWithId === void 0 && $$bindings.translateWithId && translateWithId !== void 0)
    $$bindings.translateWithId(translateWithId);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.ref === void 0 && $$bindings.ref && ref !== void 0)
    $$bindings.ref(ref);
  {
    if (ctx && ref) {
      ctx.declareRef({key: "field", ref});
    }
  }
  ariaExpanded = $$props["aria-expanded"];
  menuId = `menu-${id}`;
  return `<div${spread([
    {
      role: escape2(ariaExpanded ? "combobox" : role)
    },
    {"aria-expanded": escape2(ariaExpanded)},
    {
      "aria-owns": escape2(ariaExpanded && menuId || void 0)
    },
    {
      "aria-controls": escape2(ariaExpanded && menuId || void 0)
    },
    {"aria-disabled": escape2(disabled)},
    {
      "aria-label": escape2(ariaExpanded ? translateWithId("close") : translateWithId("open"))
    },
    {
      tabindex: escape2(disabled ? "-1" : tabindex)
    },
    $$restProps
  ], "bx--list-box__field")}${add_attribute("this", ref, 1)}>${slots.default ? slots.default({}) : ``}</div>`;
});
var ListBoxMenu = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["id", "ref"]);
  let {id = "ccs-" + Math.random().toString(36)} = $$props;
  let {ref = null} = $$props;
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.ref === void 0 && $$bindings.ref && ref !== void 0)
    $$bindings.ref(ref);
  return `<div${spread([{role: "listbox"}, {id: "menu-" + escape2(id)}, $$restProps], "bx--list-box__menu")}${add_attribute("this", ref, 1)}>${slots.default ? slots.default({}) : ``}</div>`;
});
var ChevronDown16 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let ariaLabel;
  let ariaLabelledBy;
  let labelled;
  let attributes;
  let {class: className = void 0} = $$props;
  let {id = void 0} = $$props;
  let {tabindex = void 0} = $$props;
  let {focusable = false} = $$props;
  let {title = void 0} = $$props;
  let {style = void 0} = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.tabindex === void 0 && $$bindings.tabindex && tabindex !== void 0)
    $$bindings.tabindex(tabindex);
  if ($$props.focusable === void 0 && $$bindings.focusable && focusable !== void 0)
    $$bindings.focusable(focusable);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.style === void 0 && $$bindings.style && style !== void 0)
    $$bindings.style(style);
  ariaLabel = $$props["aria-label"];
  ariaLabelledBy = $$props["aria-labelledby"];
  labelled = ariaLabel || ariaLabelledBy || title;
  attributes = {
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    "aria-hidden": labelled ? void 0 : true,
    role: labelled ? "img" : void 0,
    focusable: tabindex === "0" ? true : focusable,
    tabindex
  };
  return `<svg${spread([
    {"data-carbon-icon": "ChevronDown16"},
    {xmlns: "http://www.w3.org/2000/svg"},
    {viewBox: "0 0 16 16"},
    {fill: "currentColor"},
    {width: "16"},
    {height: "16"},
    {class: escape2(className)},
    {preserveAspectRatio: "xMidYMid meet"},
    {style: escape2(style)},
    {id: escape2(id)},
    attributes
  ])}><path d="${"M8 11L3 6 3.7 5.3 8 9.6 12.3 5.3 13 6z"}"></path>${slots.default ? slots.default({}) : `
    ${title ? `<title>${escape2(title)}</title>` : ``}
  `}</svg>`;
});
var ListBoxMenuIcon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let description;
  let $$restProps = compute_rest_props($$props, ["open", "translationIds", "translateWithId"]);
  let {open = false} = $$props;
  const translationIds = {close: "close", open: "open"};
  let {translateWithId = (id) => defaultTranslations[id]} = $$props;
  const defaultTranslations = {
    [translationIds.close]: "Close menu",
    [translationIds.open]: "Open menu"
  };
  if ($$props.open === void 0 && $$bindings.open && open !== void 0)
    $$bindings.open(open);
  if ($$props.translationIds === void 0 && $$bindings.translationIds && translationIds !== void 0)
    $$bindings.translationIds(translationIds);
  if ($$props.translateWithId === void 0 && $$bindings.translateWithId && translateWithId !== void 0)
    $$bindings.translateWithId(translateWithId);
  description = open ? translateWithId("close") : translateWithId("open");
  return `<div${spread([$$restProps], "bx--list-box__menu-icon " + (open ? "bx--list-box__menu-icon--open" : ""))}>${validate_component(ChevronDown16, "ChevronDown16").$$render($$result, {
    "aria-label": description,
    title: description
  }, {}, {})}</div>`;
});
var ListBoxMenuItem = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["active", "highlighted"]);
  let {active = false} = $$props;
  let {highlighted = false} = $$props;
  if ($$props.active === void 0 && $$bindings.active && active !== void 0)
    $$bindings.active(active);
  if ($$props.highlighted === void 0 && $$bindings.highlighted && highlighted !== void 0)
    $$bindings.highlighted(highlighted);
  return `<div${spread([$$restProps], "bx--list-box__menu-item " + (active ? "bx--list-box__menu-item--active" : "") + " " + (highlighted ? "bx--list-box__menu-item--highlighted" : ""))}><div${add_classes(["bx--list-box__menu-item__option"].join(" ").trim())}>${slots.default ? slots.default({}) : ``}</div></div>`;
});
var Close16 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let ariaLabel;
  let ariaLabelledBy;
  let labelled;
  let attributes;
  let {class: className = void 0} = $$props;
  let {id = void 0} = $$props;
  let {tabindex = void 0} = $$props;
  let {focusable = false} = $$props;
  let {title = void 0} = $$props;
  let {style = void 0} = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.tabindex === void 0 && $$bindings.tabindex && tabindex !== void 0)
    $$bindings.tabindex(tabindex);
  if ($$props.focusable === void 0 && $$bindings.focusable && focusable !== void 0)
    $$bindings.focusable(focusable);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.style === void 0 && $$bindings.style && style !== void 0)
    $$bindings.style(style);
  ariaLabel = $$props["aria-label"];
  ariaLabelledBy = $$props["aria-labelledby"];
  labelled = ariaLabel || ariaLabelledBy || title;
  attributes = {
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    "aria-hidden": labelled ? void 0 : true,
    role: labelled ? "img" : void 0,
    focusable: tabindex === "0" ? true : focusable,
    tabindex
  };
  return `<svg${spread([
    {"data-carbon-icon": "Close16"},
    {xmlns: "http://www.w3.org/2000/svg"},
    {viewBox: "0 0 32 32"},
    {fill: "currentColor"},
    {width: "16"},
    {height: "16"},
    {class: escape2(className)},
    {preserveAspectRatio: "xMidYMid meet"},
    {style: escape2(style)},
    {id: escape2(id)},
    attributes
  ])}><path d="${"M24 9.4L22.6 8 16 14.6 9.4 8 8 9.4 14.6 16 8 22.6 9.4 24 16 17.4 22.6 24 24 22.6 17.4 16 24 9.4z"}"></path>${slots.default ? slots.default({}) : `
    ${title ? `<title>${escape2(title)}</title>` : ``}
  `}</svg>`;
});
var ListBoxSelection = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let description;
  let $$restProps = compute_rest_props($$props, ["selectionCount", "disabled", "translationIds", "translateWithId", "ref"]);
  let {selectionCount = void 0} = $$props;
  let {disabled = false} = $$props;
  const translationIds = {
    clearAll: "clearAll",
    clearSelection: "clearSelection"
  };
  let {translateWithId = (id) => defaultTranslations[id]} = $$props;
  let {ref = null} = $$props;
  const defaultTranslations = {
    [translationIds.clearAll]: "Clear all selected items",
    [translationIds.clearSelection]: "Clear selected item"
  };
  createEventDispatcher();
  const ctx = getContext("MultiSelect");
  if ($$props.selectionCount === void 0 && $$bindings.selectionCount && selectionCount !== void 0)
    $$bindings.selectionCount(selectionCount);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  if ($$props.translationIds === void 0 && $$bindings.translationIds && translationIds !== void 0)
    $$bindings.translationIds(translationIds);
  if ($$props.translateWithId === void 0 && $$bindings.translateWithId && translateWithId !== void 0)
    $$bindings.translateWithId(translateWithId);
  if ($$props.ref === void 0 && $$bindings.ref && ref !== void 0)
    $$bindings.ref(ref);
  {
    if (ctx && ref) {
      ctx.declareRef({key: "selection", ref});
    }
  }
  description = selectionCount ? translateWithId("clearAll") : translateWithId("clearSelection");
  return `${selectionCount !== void 0 ? `<div${add_classes([
    "bx--tag bx--tag--filter bx--tag--high-contrast " + (disabled ? "bx--tag--disabled" : "")
  ].join(" ").trim())}><span${add_attribute("title", selectionCount, 0)}${add_classes(["bx--tag__label"].join(" ").trim())}>${escape2(selectionCount)}</span>
    <div role="${"button"}"${add_attribute("tabIndex", disabled ? -1 : 0, 0)} ${disabled ? "disabled" : ""}${add_attribute("aria-label", translationIds.clearAll, 0)}${add_attribute("title", description, 0)}${add_classes(["bx--tag__close-icon"].join(" ").trim())}${add_attribute("this", ref, 1)}>${validate_component(Close16, "Close16").$$render($$result, {}, {}, {})}</div></div>` : `<div${spread([
    {role: "button"},
    {"aria-label": escape2(description)},
    {title: escape2(description)},
    {tabindex: escape2(disabled ? "-1" : "0")},
    $$restProps
  ], "bx--list-box__selection " + (selectionCount ? "bx--tag--filter" : "") + " " + (selectionCount ? "bx--list-box__selection--multi" : ""))}${add_attribute("this", ref, 1)}>${selectionCount !== void 0 ? `${escape2(selectionCount)}` : ``}
    ${validate_component(Close16, "Close16").$$render($$result, {}, {}, {})}</div>`}`;
});
create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let ariaLabel;
  let menuId;
  let comboId;
  let highlightedId;
  let filteredItems;
  let selectedItem;
  let $$restProps = compute_rest_props($$props, [
    "items",
    "itemToString",
    "selectedIndex",
    "value",
    "direction",
    "size",
    "disabled",
    "titleText",
    "placeholder",
    "helperText",
    "invalidText",
    "invalid",
    "warn",
    "warnText",
    "light",
    "open",
    "shouldFilterItem",
    "translateWithId",
    "id",
    "name",
    "ref",
    "listRef"
  ]);
  let {items = []} = $$props;
  let {itemToString = (item) => item.text || item.id} = $$props;
  let {selectedIndex = -1} = $$props;
  let {value = ""} = $$props;
  let {direction: direction2 = "bottom"} = $$props;
  let {size = void 0} = $$props;
  let {disabled = false} = $$props;
  let {titleText = ""} = $$props;
  let {placeholder = ""} = $$props;
  let {helperText = ""} = $$props;
  let {invalidText = ""} = $$props;
  let {invalid = false} = $$props;
  let {warn = false} = $$props;
  let {warnText = ""} = $$props;
  let {light = false} = $$props;
  let {open = false} = $$props;
  let {shouldFilterItem = () => true} = $$props;
  let {translateWithId = void 0} = $$props;
  let {id = "ccs-" + Math.random().toString(36)} = $$props;
  let {name = void 0} = $$props;
  let {ref = null} = $$props;
  let {listRef = null} = $$props;
  const dispatch = createEventDispatcher();
  let selectedId = void 0;
  let inputValue = "";
  let highlightedIndex = -1;
  afterUpdate(() => {
    if (open) {
      ref.focus();
      filteredItems = items.filter((item) => shouldFilterItem(item, value));
    } else {
      highlightedIndex = -1;
      inputValue = selectedItem ? selectedItem.text : "";
      if (!selectedItem) {
        selectedId = void 0;
        selectedIndex = -1;
      }
    }
  });
  if ($$props.items === void 0 && $$bindings.items && items !== void 0)
    $$bindings.items(items);
  if ($$props.itemToString === void 0 && $$bindings.itemToString && itemToString !== void 0)
    $$bindings.itemToString(itemToString);
  if ($$props.selectedIndex === void 0 && $$bindings.selectedIndex && selectedIndex !== void 0)
    $$bindings.selectedIndex(selectedIndex);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  if ($$props.direction === void 0 && $$bindings.direction && direction2 !== void 0)
    $$bindings.direction(direction2);
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  if ($$props.titleText === void 0 && $$bindings.titleText && titleText !== void 0)
    $$bindings.titleText(titleText);
  if ($$props.placeholder === void 0 && $$bindings.placeholder && placeholder !== void 0)
    $$bindings.placeholder(placeholder);
  if ($$props.helperText === void 0 && $$bindings.helperText && helperText !== void 0)
    $$bindings.helperText(helperText);
  if ($$props.invalidText === void 0 && $$bindings.invalidText && invalidText !== void 0)
    $$bindings.invalidText(invalidText);
  if ($$props.invalid === void 0 && $$bindings.invalid && invalid !== void 0)
    $$bindings.invalid(invalid);
  if ($$props.warn === void 0 && $$bindings.warn && warn !== void 0)
    $$bindings.warn(warn);
  if ($$props.warnText === void 0 && $$bindings.warnText && warnText !== void 0)
    $$bindings.warnText(warnText);
  if ($$props.light === void 0 && $$bindings.light && light !== void 0)
    $$bindings.light(light);
  if ($$props.open === void 0 && $$bindings.open && open !== void 0)
    $$bindings.open(open);
  if ($$props.shouldFilterItem === void 0 && $$bindings.shouldFilterItem && shouldFilterItem !== void 0)
    $$bindings.shouldFilterItem(shouldFilterItem);
  if ($$props.translateWithId === void 0 && $$bindings.translateWithId && translateWithId !== void 0)
    $$bindings.translateWithId(translateWithId);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.name === void 0 && $$bindings.name && name !== void 0)
    $$bindings.name(name);
  if ($$props.ref === void 0 && $$bindings.ref && ref !== void 0)
    $$bindings.ref(ref);
  if ($$props.listRef === void 0 && $$bindings.listRef && listRef !== void 0)
    $$bindings.listRef(listRef);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    selectedItem = items[selectedIndex];
    {
      if (selectedIndex > -1) {
        selectedId = items[selectedIndex].id;
        dispatch("select", {selectedId, selectedIndex, selectedItem});
      }
    }
    ariaLabel = $$props["aria-label"] || "Choose an item";
    menuId = `menu-${id}`;
    comboId = `combo-${id}`;
    highlightedId = items[highlightedIndex] ? items[highlightedIndex].id : void 0;
    inputValue = selectedItem ? selectedItem.text : void 0;
    value = inputValue;
    filteredItems = items.filter((item) => shouldFilterItem(item, value));
    $$rendered = `

<div${add_classes(["bx--list-box__wrapper"].join(" ").trim())}>${titleText ? `<label${add_attribute("for", id, 0)}${add_classes(["bx--label " + (disabled ? "bx--label--disabled" : "")].join(" ").trim())}>${escape2(titleText)}</label>` : ``}
  ${validate_component(ListBox, "ListBox").$$render($$result, {
      class: "bx--combo-box " + (direction2 === "top" && "bx--list-box--up") + " " + (!invalid && warn && "bx--combo-box--warning"),
      id: comboId,
      "aria-label": ariaLabel,
      disabled,
      invalid,
      invalidText,
      open,
      light,
      size,
      warn,
      warnText
    }, {}, {
      default: () => `${validate_component(ListBoxField, "ListBoxField").$$render($$result, {
        role: "button",
        "aria-expanded": open,
        id,
        name,
        disabled,
        translateWithId
      }, {}, {
        default: () => `<input${spread([
          {tabindex: "0"},
          {autocomplete: "off"},
          {"aria-autocomplete": "list"},
          {"aria-expanded": escape2(open)},
          {
            "aria-activedescendant": escape2(highlightedId)
          },
          {"aria-labelledby": escape2(comboId)},
          {"aria-disabled": escape2(disabled)},
          {
            "aria-controls": escape2(open ? menuId : void 0)
          },
          {
            "aria-owns": escape2(open ? menuId : void 0)
          },
          {disabled: disabled || null},
          {placeholder: escape2(placeholder)},
          {id: escape2(id)},
          {value: escape2(inputValue)},
          $$restProps
        ], "bx--text-input " + (light ? "bx--text-input--light" : "") + " " + (inputValue === "" ? "bx--text-input--empty" : ""))}${add_attribute("this", ref, 1)}>
      ${invalid ? `${validate_component(WarningFilled16, "WarningFilled16").$$render($$result, {class: "bx--list-box__invalid-icon"}, {}, {})}` : ``}
      ${!invalid && warn ? `${validate_component(WarningAltFilled16, "WarningAltFilled16").$$render($$result, {
          class: "bx--list-box__invalid-icon bx--list-box__invalid-icon--warning"
        }, {}, {})}` : ``}
      ${inputValue ? `${validate_component(ListBoxSelection, "ListBoxSelection").$$render($$result, {translateWithId, disabled, open}, {}, {})}` : ``}
      ${validate_component(ListBoxMenuIcon, "ListBoxMenuIcon").$$render($$result, {translateWithId, open}, {}, {})}`
      })}
    ${open ? `${validate_component(ListBoxMenu, "ListBoxMenu").$$render($$result, {
        "aria-label": ariaLabel,
        id,
        ref: listRef
      }, {
        ref: ($$value) => {
          listRef = $$value;
          $$settled = false;
        }
      }, {
        default: () => `${each(filteredItems, (item, i) => `${validate_component(ListBoxMenuItem, "ListBoxMenuItem").$$render($$result, {
          id: item.id,
          active: selectedIndex === i || selectedId === item.id,
          highlighted: highlightedIndex === i || selectedIndex === i
        }, {}, {
          default: () => `${escape2(itemToString(item))}
          `
        })}`)}`
      })}` : ``}`
    })}
  ${!invalid && helperText && !warn ? `<div${add_classes([
      "bx--form__helper-text " + (disabled ? "bx--form__helper-text--disabled" : "")
    ].join(" ").trim())}>${escape2(helperText)}</div>` : ``}</div>`;
  } while (!$$settled);
  return $$rendered;
});
create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, [
    "size",
    "open",
    "danger",
    "preventCloseOnClickOutside",
    "containerClass",
    "selectorPrimaryFocus",
    "ref"
  ]);
  let $label, $$unsubscribe_label;
  let {size = void 0} = $$props;
  let {open = false} = $$props;
  let {danger = false} = $$props;
  let {preventCloseOnClickOutside = false} = $$props;
  let {containerClass = ""} = $$props;
  let {selectorPrimaryFocus = "[data-modal-primary-focus]"} = $$props;
  let {ref = null} = $$props;
  const dispatch = createEventDispatcher();
  const label = writable2(void 0);
  $$unsubscribe_label = subscribe(label, (value) => $label = value);
  let buttonRef = null;
  let innerModal = null;
  setContext("ComposedModal", {
    closeModal: () => {
      open = false;
    },
    submit: () => {
      dispatch("submit");
    },
    declareRef: (ref2) => {
      buttonRef = ref2;
    },
    updateLabel: (value) => {
      label.set(value);
    }
  });
  function focus(element) {
    if (selectorPrimaryFocus == null)
      return;
    const node = (element || innerModal).querySelector(selectorPrimaryFocus) || buttonRef;
    if (node != null)
      node.focus();
  }
  let opened = false;
  onMount(async () => {
    await tick();
    focus();
  });
  onDestroy(() => {
    document.body.classList.remove("bx--body--with-modal-open");
  });
  afterUpdate(() => {
    if (opened) {
      if (!open) {
        opened = false;
        dispatch("close");
        document.body.classList.remove("bx--body--with-modal-open");
      }
    } else if (open) {
      opened = true;
      dispatch("open");
      document.body.classList.add("bx--body--with-modal-open");
    }
  });
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  if ($$props.open === void 0 && $$bindings.open && open !== void 0)
    $$bindings.open(open);
  if ($$props.danger === void 0 && $$bindings.danger && danger !== void 0)
    $$bindings.danger(danger);
  if ($$props.preventCloseOnClickOutside === void 0 && $$bindings.preventCloseOnClickOutside && preventCloseOnClickOutside !== void 0)
    $$bindings.preventCloseOnClickOutside(preventCloseOnClickOutside);
  if ($$props.containerClass === void 0 && $$bindings.containerClass && containerClass !== void 0)
    $$bindings.containerClass(containerClass);
  if ($$props.selectorPrimaryFocus === void 0 && $$bindings.selectorPrimaryFocus && selectorPrimaryFocus !== void 0)
    $$bindings.selectorPrimaryFocus(selectorPrimaryFocus);
  if ($$props.ref === void 0 && $$bindings.ref && ref !== void 0)
    $$bindings.ref(ref);
  $$unsubscribe_label();
  return `<div${spread([{role: "presentation"}, $$restProps], "bx--modal " + (open ? "is-visible" : "") + " " + (danger ? "bx--modal--danger" : ""))}${add_attribute("this", ref, 1)}><div role="${"dialog"}" aria-modal="${"true"}"${add_attribute("aria-label", $$props["aria-label"] || $label || void 0, 0)} class="${[
    escape2(containerClass),
    "bx--modal-container " + (size === "xs" ? "bx--modal-container--xs" : "") + " " + (size === "sm" ? "bx--modal-container--sm" : "") + " " + (size === "lg" ? "bx--modal-container--lg" : "")
  ].join(" ").trim()}"${add_attribute("this", innerModal, 1)}>${slots.default ? slots.default({}) : ``}</div></div>`;
});
var Close20 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let ariaLabel;
  let ariaLabelledBy;
  let labelled;
  let attributes;
  let {class: className = void 0} = $$props;
  let {id = void 0} = $$props;
  let {tabindex = void 0} = $$props;
  let {focusable = false} = $$props;
  let {title = void 0} = $$props;
  let {style = void 0} = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.tabindex === void 0 && $$bindings.tabindex && tabindex !== void 0)
    $$bindings.tabindex(tabindex);
  if ($$props.focusable === void 0 && $$bindings.focusable && focusable !== void 0)
    $$bindings.focusable(focusable);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.style === void 0 && $$bindings.style && style !== void 0)
    $$bindings.style(style);
  ariaLabel = $$props["aria-label"];
  ariaLabelledBy = $$props["aria-labelledby"];
  labelled = ariaLabel || ariaLabelledBy || title;
  attributes = {
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    "aria-hidden": labelled ? void 0 : true,
    role: labelled ? "img" : void 0,
    focusable: tabindex === "0" ? true : focusable,
    tabindex
  };
  return `<svg${spread([
    {"data-carbon-icon": "Close20"},
    {xmlns: "http://www.w3.org/2000/svg"},
    {viewBox: "0 0 32 32"},
    {fill: "currentColor"},
    {width: "20"},
    {height: "20"},
    {class: escape2(className)},
    {preserveAspectRatio: "xMidYMid meet"},
    {style: escape2(style)},
    {id: escape2(id)},
    attributes
  ])}><path d="${"M24 9.4L22.6 8 16 14.6 9.4 8 8 9.4 14.6 16 8 22.6 9.4 24 16 17.4 22.6 24 24 22.6 17.4 16 24 9.4z"}"></path>${slots.default ? slots.default({}) : `
    ${title ? `<title>${escape2(title)}</title>` : ``}
  `}</svg>`;
});
create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, [
    "title",
    "label",
    "labelClass",
    "titleClass",
    "closeClass",
    "closeIconClass",
    "iconDescription"
  ]);
  let {title = ""} = $$props;
  let {label = ""} = $$props;
  let {labelClass = ""} = $$props;
  let {titleClass = ""} = $$props;
  let {closeClass = ""} = $$props;
  let {closeIconClass = ""} = $$props;
  let {iconDescription = "Close"} = $$props;
  const {closeModal, updateLabel} = getContext("ComposedModal");
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.label === void 0 && $$bindings.label && label !== void 0)
    $$bindings.label(label);
  if ($$props.labelClass === void 0 && $$bindings.labelClass && labelClass !== void 0)
    $$bindings.labelClass(labelClass);
  if ($$props.titleClass === void 0 && $$bindings.titleClass && titleClass !== void 0)
    $$bindings.titleClass(titleClass);
  if ($$props.closeClass === void 0 && $$bindings.closeClass && closeClass !== void 0)
    $$bindings.closeClass(closeClass);
  if ($$props.closeIconClass === void 0 && $$bindings.closeIconClass && closeIconClass !== void 0)
    $$bindings.closeIconClass(closeIconClass);
  if ($$props.iconDescription === void 0 && $$bindings.iconDescription && iconDescription !== void 0)
    $$bindings.iconDescription(iconDescription);
  {
    updateLabel(label);
  }
  return `<div${spread([$$restProps], "bx--modal-header")}>${label ? `<h2 class="${[
    escape2(labelClass),
    "bx--modal-header__label bx--type-delta"
  ].join(" ").trim()}">${escape2(label)}</h2>` : ``}
  ${title ? `<h3 class="${[
    escape2(titleClass),
    "bx--modal-header__heading bx--type-beta"
  ].join(" ").trim()}">${escape2(title)}</h3>` : ``}
  ${slots.default ? slots.default({}) : ``}
  <button type="${"button"}"${add_attribute("title", iconDescription, 0)}${add_attribute("aria-label", iconDescription, 0)} class="${[escape2(closeClass), "bx--modal-close"].join(" ").trim()}">${validate_component(Close20, "Close20").$$render($$result, {
    class: "bx--modal-close__icon " + closeIconClass
  }, {}, {})}</button></div>`;
});
create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["hasForm", "hasScrollingContent"]);
  let {hasForm = false} = $$props;
  let {hasScrollingContent = false} = $$props;
  if ($$props.hasForm === void 0 && $$bindings.hasForm && hasForm !== void 0)
    $$bindings.hasForm(hasForm);
  if ($$props.hasScrollingContent === void 0 && $$bindings.hasScrollingContent && hasScrollingContent !== void 0)
    $$bindings.hasScrollingContent(hasScrollingContent);
  return `<div${spread([
    {
      tabindex: escape2(hasScrollingContent ? "0" : void 0)
    },
    {
      role: escape2(hasScrollingContent ? "region" : void 0)
    },
    $$restProps
  ], "bx--modal-content " + (hasForm ? "bx--modal-content--with-form" : "") + " " + (hasScrollingContent ? "bx--modal-scroll-content" : ""))}>${slots.default ? slots.default({}) : ``}</div>
${hasScrollingContent ? `<div${add_classes(["bx--modal-content--overflow-indicator"].join(" ").trim())}></div>` : ``}`;
});
create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, [
    "primaryButtonText",
    "primaryButtonDisabled",
    "primaryClass",
    "secondaryButtonText",
    "secondaryClass",
    "danger"
  ]);
  let {primaryButtonText = ""} = $$props;
  let {primaryButtonDisabled = false} = $$props;
  let {primaryClass = void 0} = $$props;
  let {secondaryButtonText = ""} = $$props;
  let {secondaryClass = void 0} = $$props;
  let {danger = false} = $$props;
  getContext("ComposedModal");
  if ($$props.primaryButtonText === void 0 && $$bindings.primaryButtonText && primaryButtonText !== void 0)
    $$bindings.primaryButtonText(primaryButtonText);
  if ($$props.primaryButtonDisabled === void 0 && $$bindings.primaryButtonDisabled && primaryButtonDisabled !== void 0)
    $$bindings.primaryButtonDisabled(primaryButtonDisabled);
  if ($$props.primaryClass === void 0 && $$bindings.primaryClass && primaryClass !== void 0)
    $$bindings.primaryClass(primaryClass);
  if ($$props.secondaryButtonText === void 0 && $$bindings.secondaryButtonText && secondaryButtonText !== void 0)
    $$bindings.secondaryButtonText(secondaryButtonText);
  if ($$props.secondaryClass === void 0 && $$bindings.secondaryClass && secondaryClass !== void 0)
    $$bindings.secondaryClass(secondaryClass);
  if ($$props.danger === void 0 && $$bindings.danger && danger !== void 0)
    $$bindings.danger(danger);
  return `<div${spread([$$restProps], "bx--modal-footer")}>${secondaryButtonText ? `${validate_component(Button, "Button").$$render($$result, {kind: "secondary", class: secondaryClass}, {}, {
    default: () => `${escape2(secondaryButtonText)}`
  })}` : ``}
  ${primaryButtonText ? `${validate_component(Button, "Button").$$render($$result, {
    kind: danger ? "danger" : "primary",
    disabled: primaryButtonDisabled,
    class: primaryClass
  }, {}, {
    default: () => `${escape2(primaryButtonText)}`
  })}` : ``}
  ${slots.default ? slots.default({}) : ``}</div>`;
});
var CodeSnippetSkeleton = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["type"]);
  let {type = "single"} = $$props;
  if ($$props.type === void 0 && $$bindings.type && type !== void 0)
    $$bindings.type(type);
  return `<div${spread([$$restProps], "bx--skeleton bx--snippet " + (type === "single" ? "bx--snippet--single" : "") + " " + (type === "multi" ? "bx--snippet--multi" : ""))}><div${add_classes(["bx--snippet-container"].join(" ").trim())}>${type === "single" ? `<span></span>` : `${type === "multi" ? `<span></span> <span></span> <span></span>` : ``}`}</div></div>`;
});
create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let expandText;
  let $$restProps = compute_rest_props($$props, [
    "type",
    "code",
    "expanded",
    "hideCopyButton",
    "disabled",
    "wrapText",
    "light",
    "skeleton",
    "copyButtonDescription",
    "copyLabel",
    "feedback",
    "feedbackTimeout",
    "showLessText",
    "showMoreText",
    "showMoreLess",
    "id",
    "ref"
  ]);
  let {type = "single"} = $$props;
  let {code = void 0} = $$props;
  let {expanded = false} = $$props;
  let {hideCopyButton = false} = $$props;
  let {disabled = false} = $$props;
  let {wrapText = false} = $$props;
  let {light = false} = $$props;
  let {skeleton = false} = $$props;
  let {copyButtonDescription = void 0} = $$props;
  let {copyLabel = void 0} = $$props;
  let {feedback = "Copied!"} = $$props;
  let {feedbackTimeout = 2e3} = $$props;
  let {showLessText = "Show less"} = $$props;
  let {showMoreText = "Show more"} = $$props;
  let {showMoreLess = false} = $$props;
  let {id = "ccs-" + Math.random().toString(36)} = $$props;
  let {ref = null} = $$props;
  createEventDispatcher();
  function setShowMoreLess() {
    const {height} = ref.getBoundingClientRect();
    if (height > 0)
      showMoreLess = ref.getBoundingClientRect().height > 255;
  }
  if ($$props.type === void 0 && $$bindings.type && type !== void 0)
    $$bindings.type(type);
  if ($$props.code === void 0 && $$bindings.code && code !== void 0)
    $$bindings.code(code);
  if ($$props.expanded === void 0 && $$bindings.expanded && expanded !== void 0)
    $$bindings.expanded(expanded);
  if ($$props.hideCopyButton === void 0 && $$bindings.hideCopyButton && hideCopyButton !== void 0)
    $$bindings.hideCopyButton(hideCopyButton);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  if ($$props.wrapText === void 0 && $$bindings.wrapText && wrapText !== void 0)
    $$bindings.wrapText(wrapText);
  if ($$props.light === void 0 && $$bindings.light && light !== void 0)
    $$bindings.light(light);
  if ($$props.skeleton === void 0 && $$bindings.skeleton && skeleton !== void 0)
    $$bindings.skeleton(skeleton);
  if ($$props.copyButtonDescription === void 0 && $$bindings.copyButtonDescription && copyButtonDescription !== void 0)
    $$bindings.copyButtonDescription(copyButtonDescription);
  if ($$props.copyLabel === void 0 && $$bindings.copyLabel && copyLabel !== void 0)
    $$bindings.copyLabel(copyLabel);
  if ($$props.feedback === void 0 && $$bindings.feedback && feedback !== void 0)
    $$bindings.feedback(feedback);
  if ($$props.feedbackTimeout === void 0 && $$bindings.feedbackTimeout && feedbackTimeout !== void 0)
    $$bindings.feedbackTimeout(feedbackTimeout);
  if ($$props.showLessText === void 0 && $$bindings.showLessText && showLessText !== void 0)
    $$bindings.showLessText(showLessText);
  if ($$props.showMoreText === void 0 && $$bindings.showMoreText && showMoreText !== void 0)
    $$bindings.showMoreText(showMoreText);
  if ($$props.showMoreLess === void 0 && $$bindings.showMoreLess && showMoreLess !== void 0)
    $$bindings.showMoreLess(showMoreLess);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.ref === void 0 && $$bindings.ref && ref !== void 0)
    $$bindings.ref(ref);
  expandText = expanded ? showLessText : showMoreText;
  {
    if (type === "multi" && ref) {
      if (code === void 0)
        setShowMoreLess();
      if (code)
        tick().then(setShowMoreLess);
    }
  }
  return `${skeleton ? `${validate_component(CodeSnippetSkeleton, "CodeSnippetSkeleton").$$render($$result, Object.assign({type}, $$restProps), {}, {})}` : `${type === "inline" ? `${hideCopyButton ? `<span${spread([$$restProps], "bx--snippet " + (expanded ? "bx--snippet--expand" : "") + " " + (light ? "bx--snippet--light" : "") + " " + (hideCopyButton ? "bx--snippet--no-copy" : "") + " " + (wrapText ? "bx--snippet--wraptext" : "") + " " + (type === "single" ? "bx--snippet--single" : "") + " " + (type === "inline" ? "bx--snippet--inline" : "") + " " + (type === "multi" ? "bx--snippet--multi" : ""))}><code${add_attribute("id", id, 0)}>${slots.default ? slots.default({}) : `${escape2(code)}`}</code></span>` : `${validate_component(Copy, "Copy").$$render($$result, Object.assign({"aria-label": copyLabel}, {"aria-describedby": id}, {feedback}, {feedbackTimeout}, {
    class: "bx--snippet " + (type && `bx--snippet--${type}`) + "\n          " + (type === "inline" && "bx--btn--copy") + "\n          " + (expanded && "bx--snippet--expand") + "\n          " + (light && "bx--snippet--light") + "\n          " + (hideCopyButton && "bx--snippet--no-copy") + "\n          " + (wrapText && "bx--snippet--wraptext")
  }, $$restProps), {}, {
    default: () => `<code${add_attribute("id", id, 0)}>${slots.default ? slots.default({}) : `${escape2(code)}`}</code>`
  })}`}` : `<div${spread([$$restProps], "bx--snippet " + (expanded ? "bx--snippet--expand" : "") + " " + (light ? "bx--snippet--light" : "") + " " + (hideCopyButton ? "bx--snippet--no-copy" : "") + " " + (wrapText ? "bx--snippet--wraptext" : "") + " " + (type === "single" ? "bx--snippet--single" : "") + " " + (type === "inline" ? "bx--snippet--inline" : "") + " " + (type === "multi" ? "bx--snippet--multi" : "") + " " + (type !== "inline" && disabled ? "bx--snippet--disabled" : ""))}><div${add_attribute("role", type === "single" ? "textbox" : void 0, 0)}${add_attribute("tabindex", type === "single" && !disabled ? "0" : void 0, 0)}${add_attribute("aria-label", $$restProps["aria-label"] || copyLabel || "code-snippet", 0)}${add_classes(["bx--snippet-container"].join(" ").trim())}><code><pre${add_attribute("this", ref, 1)}>${slots.default ? slots.default({}) : `${escape2(code)}`}</pre></code></div>
    ${!hideCopyButton ? `${validate_component(CopyButton, "CopyButton").$$render($$result, {
    disabled,
    feedback,
    feedbackTimeout,
    iconDescription: copyButtonDescription
  }, {}, {})}` : ``}
    ${showMoreLess ? `${validate_component(Button, "Button").$$render($$result, {
    kind: "ghost",
    size: "field",
    class: "bx--snippet-btn--expand",
    disabled
  }, {}, {
    default: () => `<span${add_classes(["bx--snippet-btn--text"].join(" ").trim())}>${escape2(expandText)}</span>
        ${validate_component(ChevronDown16, "ChevronDown16").$$render($$result, {
      class: "bx--icon-chevron--down bx--snippet__icon",
      "aria-label": expandText
    }, {}, {})}`
  })}` : ``}</div>`}`}`;
});
var RadioButton = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, [
    "value",
    "checked",
    "disabled",
    "labelPosition",
    "labelText",
    "hideLabel",
    "id",
    "name",
    "ref"
  ]);
  let $selectedValue, $$unsubscribe_selectedValue;
  let {value = ""} = $$props;
  let {checked = false} = $$props;
  let {disabled = false} = $$props;
  let {labelPosition = "right"} = $$props;
  let {labelText = ""} = $$props;
  let {hideLabel = false} = $$props;
  let {id = "ccs-" + Math.random().toString(36)} = $$props;
  let {name = ""} = $$props;
  let {ref = null} = $$props;
  const ctx = getContext("RadioButtonGroup");
  const selectedValue = ctx ? ctx.selectedValue : writable2(checked ? value : void 0);
  $$unsubscribe_selectedValue = subscribe(selectedValue, (value2) => $selectedValue = value2);
  if (ctx) {
    ctx.add({id, checked, disabled, value});
  }
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  if ($$props.checked === void 0 && $$bindings.checked && checked !== void 0)
    $$bindings.checked(checked);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  if ($$props.labelPosition === void 0 && $$bindings.labelPosition && labelPosition !== void 0)
    $$bindings.labelPosition(labelPosition);
  if ($$props.labelText === void 0 && $$bindings.labelText && labelText !== void 0)
    $$bindings.labelText(labelText);
  if ($$props.hideLabel === void 0 && $$bindings.hideLabel && hideLabel !== void 0)
    $$bindings.hideLabel(hideLabel);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.name === void 0 && $$bindings.name && name !== void 0)
    $$bindings.name(name);
  if ($$props.ref === void 0 && $$bindings.ref && ref !== void 0)
    $$bindings.ref(ref);
  checked = $selectedValue === value;
  $$unsubscribe_selectedValue();
  return `<div${spread([$$restProps], "bx--radio-button-wrapper " + (labelPosition === "left" ? "bx--radio-button-wrapper--label-left" : ""))}><input type="${"radio"}"${add_attribute("id", id, 0)}${add_attribute("name", name, 0)} ${checked ? "checked" : ""} ${disabled ? "disabled" : ""}${add_attribute("value", value, 0)}${add_classes(["bx--radio-button"].join(" ").trim())}${add_attribute("this", ref, 1)}>
  <label${add_attribute("for", id, 0)}${add_classes(["bx--radio-button__label"].join(" ").trim())}><span${add_classes(["bx--radio-button__appearance"].join(" ").trim())}></span>
    ${labelText ? `<span${add_classes([hideLabel ? "bx--visually-hidden" : ""].join(" ").trim())}>${escape2(labelText)}</span>` : ``}</label></div>`;
});
create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, []);
  return `<div${spread([$$restProps], "bx--radio-button-wrapper")}><div${add_classes(["bx--radio-button bx--skeleton"].join(" ").trim())}></div>
  <span${add_classes(["bx--radio-button__label bx--skeleton"].join(" ").trim())}></span></div>`;
});
var Table = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["size", "zebra", "useStaticWidth", "shouldShowBorder", "sortable", "stickyHeader"]);
  let {size = void 0} = $$props;
  let {zebra = false} = $$props;
  let {useStaticWidth = false} = $$props;
  let {shouldShowBorder = false} = $$props;
  let {sortable = false} = $$props;
  let {stickyHeader = false} = $$props;
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  if ($$props.zebra === void 0 && $$bindings.zebra && zebra !== void 0)
    $$bindings.zebra(zebra);
  if ($$props.useStaticWidth === void 0 && $$bindings.useStaticWidth && useStaticWidth !== void 0)
    $$bindings.useStaticWidth(useStaticWidth);
  if ($$props.shouldShowBorder === void 0 && $$bindings.shouldShowBorder && shouldShowBorder !== void 0)
    $$bindings.shouldShowBorder(shouldShowBorder);
  if ($$props.sortable === void 0 && $$bindings.sortable && sortable !== void 0)
    $$bindings.sortable(sortable);
  if ($$props.stickyHeader === void 0 && $$bindings.stickyHeader && stickyHeader !== void 0)
    $$bindings.stickyHeader(stickyHeader);
  return `${stickyHeader ? `<section${spread([$$restProps], "bx--data-table_inner-container")}><table${add_classes([
    "bx--data-table " + (size === "compact" ? "bx--data-table--compact" : "") + " " + (size === "short" ? "bx--data-table--short" : "") + " " + (size === "tall" ? "bx--data-table--tall" : "") + " " + (sortable ? "bx--data-table--sort" : "") + " " + (zebra ? "bx--data-table--zebra" : "") + " " + (useStaticWidth ? "bx--data-table--static" : "") + " " + (!shouldShowBorder ? "bx--data-table--no-border" : "") + " " + (stickyHeader ? "bx--data-table--sticky-header" : "")
  ].join(" ").trim())}>${slots.default ? slots.default({}) : ``}</table></section>` : `<table${spread([$$restProps], "bx--data-table " + (size === "compact" ? "bx--data-table--compact" : "") + " " + (size === "short" ? "bx--data-table--short" : "") + " " + (size === "tall" ? "bx--data-table--tall" : "") + " " + (sortable ? "bx--data-table--sort" : "") + " " + (zebra ? "bx--data-table--zebra" : "") + " " + (useStaticWidth ? "bx--data-table--static" : "") + " " + (!shouldShowBorder ? "bx--data-table--no-border" : "") + " " + (stickyHeader ? "bx--data-table--sticky-header" : ""))}>${slots.default ? slots.default({}) : ``}</table>`}`;
});
var TableBody = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, []);
  return `<tbody${spread([{"aria-live": "polite"}, $$restProps])}>${slots.default ? slots.default({}) : ``}</tbody>`;
});
var TableCell = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, []);
  return `<td${spread([$$restProps])}>${slots.default ? slots.default({}) : ``}</td>`;
});
var TableContainer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["title", "description", "stickyHeader"]);
  let {title = ""} = $$props;
  let {description = ""} = $$props;
  let {stickyHeader = false} = $$props;
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.description === void 0 && $$bindings.description && description !== void 0)
    $$bindings.description(description);
  if ($$props.stickyHeader === void 0 && $$bindings.stickyHeader && stickyHeader !== void 0)
    $$bindings.stickyHeader(stickyHeader);
  return `<div${spread([$$restProps], "bx--data-table-container " + (stickyHeader ? "bx--data-table--max-width" : ""))}>${title ? `<div${add_classes(["bx--data-table-header"].join(" ").trim())}><h4${add_classes(["bx--data-table-header__title"].join(" ").trim())}>${escape2(title)}</h4>
      <p${add_classes(["bx--data-table-header__description"].join(" ").trim())}>${escape2(description)}</p></div>` : ``}
  ${slots.default ? slots.default({}) : ``}</div>`;
});
var TableHead = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, []);
  return `<thead${spread([$$restProps])}>${slots.default ? slots.default({}) : ``}</thead>`;
});
var ArrowUp20 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let ariaLabel;
  let ariaLabelledBy;
  let labelled;
  let attributes;
  let {class: className = void 0} = $$props;
  let {id = void 0} = $$props;
  let {tabindex = void 0} = $$props;
  let {focusable = false} = $$props;
  let {title = void 0} = $$props;
  let {style = void 0} = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.tabindex === void 0 && $$bindings.tabindex && tabindex !== void 0)
    $$bindings.tabindex(tabindex);
  if ($$props.focusable === void 0 && $$bindings.focusable && focusable !== void 0)
    $$bindings.focusable(focusable);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.style === void 0 && $$bindings.style && style !== void 0)
    $$bindings.style(style);
  ariaLabel = $$props["aria-label"];
  ariaLabelledBy = $$props["aria-labelledby"];
  labelled = ariaLabel || ariaLabelledBy || title;
  attributes = {
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    "aria-hidden": labelled ? void 0 : true,
    role: labelled ? "img" : void 0,
    focusable: tabindex === "0" ? true : focusable,
    tabindex
  };
  return `<svg${spread([
    {"data-carbon-icon": "ArrowUp20"},
    {xmlns: "http://www.w3.org/2000/svg"},
    {viewBox: "0 0 32 32"},
    {fill: "currentColor"},
    {width: "20"},
    {height: "20"},
    {class: escape2(className)},
    {preserveAspectRatio: "xMidYMid meet"},
    {style: escape2(style)},
    {id: escape2(id)},
    attributes
  ])}><path d="${"M16 4L6 14 7.41 15.41 15 7.83 15 28 17 28 17 7.83 24.59 15.41 26 14 16 4z"}"></path>${slots.default ? slots.default({}) : `
    ${title ? `<title>${escape2(title)}</title>` : ``}
  `}</svg>`;
});
var ArrowsVertical20 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let ariaLabel;
  let ariaLabelledBy;
  let labelled;
  let attributes;
  let {class: className = void 0} = $$props;
  let {id = void 0} = $$props;
  let {tabindex = void 0} = $$props;
  let {focusable = false} = $$props;
  let {title = void 0} = $$props;
  let {style = void 0} = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.tabindex === void 0 && $$bindings.tabindex && tabindex !== void 0)
    $$bindings.tabindex(tabindex);
  if ($$props.focusable === void 0 && $$bindings.focusable && focusable !== void 0)
    $$bindings.focusable(focusable);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.style === void 0 && $$bindings.style && style !== void 0)
    $$bindings.style(style);
  ariaLabel = $$props["aria-label"];
  ariaLabelledBy = $$props["aria-labelledby"];
  labelled = ariaLabel || ariaLabelledBy || title;
  attributes = {
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    "aria-hidden": labelled ? void 0 : true,
    role: labelled ? "img" : void 0,
    focusable: tabindex === "0" ? true : focusable,
    tabindex
  };
  return `<svg${spread([
    {"data-carbon-icon": "ArrowsVertical20"},
    {xmlns: "http://www.w3.org/2000/svg"},
    {viewBox: "0 0 32 32"},
    {fill: "currentColor"},
    {width: "20"},
    {height: "20"},
    {class: escape2(className)},
    {preserveAspectRatio: "xMidYMid meet"},
    {style: escape2(style)},
    {id: escape2(id)},
    attributes
  ])}><path d="${"M27.6 20.6L24 24.2 24 4 22 4 22 24.2 18.4 20.6 17 22 23 28 29 22zM9 4L3 10 4.4 11.4 8 7.8 8 28 10 28 10 7.8 13.6 11.4 15 10z"}"></path>${slots.default ? slots.default({}) : `
    ${title ? `<title>${escape2(title)}</title>` : ``}
  `}</svg>`;
});
var TableHeader = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let active;
  let ariaLabel;
  let $$restProps = compute_rest_props($$props, ["disableSorting", "scope", "translateWithId", "id"]);
  let $sortHeader, $$unsubscribe_sortHeader;
  let $tableSortable, $$unsubscribe_tableSortable;
  let {disableSorting = false} = $$props;
  let {scope = "col"} = $$props;
  let {translateWithId = () => ""} = $$props;
  let {id = "ccs-" + Math.random().toString(36)} = $$props;
  const {sortHeader, tableSortable, add} = getContext("DataTable");
  $$unsubscribe_sortHeader = subscribe(sortHeader, (value) => $sortHeader = value);
  $$unsubscribe_tableSortable = subscribe(tableSortable, (value) => $tableSortable = value);
  add(id);
  if ($$props.disableSorting === void 0 && $$bindings.disableSorting && disableSorting !== void 0)
    $$bindings.disableSorting(disableSorting);
  if ($$props.scope === void 0 && $$bindings.scope && scope !== void 0)
    $$bindings.scope(scope);
  if ($$props.translateWithId === void 0 && $$bindings.translateWithId && translateWithId !== void 0)
    $$bindings.translateWithId(translateWithId);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  active = $sortHeader.id === id;
  ariaLabel = translateWithId();
  $$unsubscribe_sortHeader();
  $$unsubscribe_tableSortable();
  return `${$tableSortable && !disableSorting ? `<th${spread([
    {
      "aria-sort": escape2(active ? $sortHeader.sortDirection : "none")
    },
    {scope: escape2(scope)},
    {id: escape2(id)},
    $$restProps
  ])}><button${add_classes([
    "bx--table-sort " + (active ? "bx--table-sort--active" : "") + " " + (active && $sortHeader.sortDirection === "descending" ? "bx--table-sort--ascending" : "")
  ].join(" ").trim())}><div${add_classes(["bx--table-header-label"].join(" ").trim())}>${slots.default ? slots.default({}) : ``}</div>
      ${validate_component(ArrowUp20, "ArrowUp20").$$render($$result, {
    "aria-label": ariaLabel,
    class: "bx--table-sort__icon"
  }, {}, {})}
      ${validate_component(ArrowsVertical20, "ArrowsVertical20").$$render($$result, {
    "aria-label": ariaLabel,
    class: "bx--table-sort__icon-unsorted"
  }, {}, {})}</button></th>` : `<th${spread([{scope: escape2(scope)}, {id: escape2(id)}, $$restProps])}><div${add_classes(["bx--table-header-label"].join(" ").trim())}>${slots.default ? slots.default({}) : ``}</div></th>`}`;
});
var TableRow = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, []);
  return `<tr${spread([$$restProps])}>${slots.default ? slots.default({}) : ``}</tr>`;
});
create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let expandedRows;
  let indeterminate;
  let headerKeys;
  let sortedRows;
  let ascending;
  let sortKey;
  let sorting;
  let $$restProps = compute_rest_props($$props, [
    "headers",
    "rows",
    "size",
    "title",
    "description",
    "zebra",
    "sortable",
    "expandable",
    "batchExpansion",
    "expandedRowIds",
    "radio",
    "selectable",
    "batchSelection",
    "selectedRowIds",
    "stickyHeader"
  ]);
  let $headerItems, $$unsubscribe_headerItems;
  let $sortHeader, $$unsubscribe_sortHeader;
  let $$unsubscribe_thKeys;
  let {headers = []} = $$props;
  let {rows = []} = $$props;
  let {size = void 0} = $$props;
  let {title = ""} = $$props;
  let {description = ""} = $$props;
  let {zebra = false} = $$props;
  let {sortable = false} = $$props;
  let {expandable = false} = $$props;
  let {batchExpansion = false} = $$props;
  let {expandedRowIds = []} = $$props;
  let {radio = false} = $$props;
  let {selectable = false} = $$props;
  let {batchSelection = false} = $$props;
  let {selectedRowIds = []} = $$props;
  let {stickyHeader = false} = $$props;
  createEventDispatcher();
  const batchSelectedIds = writable2(false);
  const tableSortable = writable2(sortable);
  const sortHeader = writable2({
    id: null,
    key: null,
    sort: void 0,
    sortDirection: "none"
  });
  $$unsubscribe_sortHeader = subscribe(sortHeader, (value) => $sortHeader = value);
  const headerItems = writable2([]);
  $$unsubscribe_headerItems = subscribe(headerItems, (value) => $headerItems = value);
  const thKeys = derived(headerItems, () => headers.map(({key}, i) => ({key, id: $headerItems[i]})).reduce((a, c) => ({...a, [c.key]: c.id}), {}));
  $$unsubscribe_thKeys = subscribe(thKeys, (value) => value);
  const resolvePath = (object, path, defaultValue) => path.split(/[\.\[\]\'\"]/).filter((p) => p).reduce((o, p) => o && typeof o === "object" && o[p] ? o[p] : defaultValue, object);
  setContext("DataTable", {
    sortHeader,
    tableSortable,
    batchSelectedIds,
    resetSelectedRowIds: () => {
      selectAll = false;
      selectedRowIds = [];
      if (refSelectAll)
        refSelectAll.checked = false;
    },
    add: (id) => {
      headerItems.update((_) => [..._, id]);
    }
  });
  let parentRowId = null;
  let selectAll = false;
  let refSelectAll = null;
  if ($$props.headers === void 0 && $$bindings.headers && headers !== void 0)
    $$bindings.headers(headers);
  if ($$props.rows === void 0 && $$bindings.rows && rows !== void 0)
    $$bindings.rows(rows);
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.description === void 0 && $$bindings.description && description !== void 0)
    $$bindings.description(description);
  if ($$props.zebra === void 0 && $$bindings.zebra && zebra !== void 0)
    $$bindings.zebra(zebra);
  if ($$props.sortable === void 0 && $$bindings.sortable && sortable !== void 0)
    $$bindings.sortable(sortable);
  if ($$props.expandable === void 0 && $$bindings.expandable && expandable !== void 0)
    $$bindings.expandable(expandable);
  if ($$props.batchExpansion === void 0 && $$bindings.batchExpansion && batchExpansion !== void 0)
    $$bindings.batchExpansion(batchExpansion);
  if ($$props.expandedRowIds === void 0 && $$bindings.expandedRowIds && expandedRowIds !== void 0)
    $$bindings.expandedRowIds(expandedRowIds);
  if ($$props.radio === void 0 && $$bindings.radio && radio !== void 0)
    $$bindings.radio(radio);
  if ($$props.selectable === void 0 && $$bindings.selectable && selectable !== void 0)
    $$bindings.selectable(selectable);
  if ($$props.batchSelection === void 0 && $$bindings.batchSelection && batchSelection !== void 0)
    $$bindings.batchSelection(batchSelection);
  if ($$props.selectedRowIds === void 0 && $$bindings.selectedRowIds && selectedRowIds !== void 0)
    $$bindings.selectedRowIds(selectedRowIds);
  if ($$props.stickyHeader === void 0 && $$bindings.stickyHeader && stickyHeader !== void 0)
    $$bindings.stickyHeader(stickyHeader);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    expandedRows = expandedRowIds.reduce((a, id) => ({...a, [id]: true}), {});
    {
      batchSelectedIds.set(selectedRowIds);
    }
    headerKeys = headers.map(({key}) => key);
    rows = rows.map((row) => ({
      ...row,
      cells: headerKeys.map((key, index2) => ({
        key,
        value: resolvePath(row, key, ""),
        display: headers[index2].display
      }))
    }));
    indeterminate = selectedRowIds.length > 0 && selectedRowIds.length < rows.length;
    {
      if (batchExpansion)
        expandable = true;
    }
    {
      if (radio || batchSelection)
        selectable = true;
    }
    {
      tableSortable.set(sortable);
    }
    sortedRows = rows;
    ascending = $sortHeader.sortDirection === "ascending";
    sortKey = $sortHeader.key;
    sorting = sortable && sortKey != null;
    {
      if (sorting) {
        if ($sortHeader.sortDirection === "none") {
          sortedRows = rows;
        } else {
          sortedRows = [...rows].sort((a, b) => {
            const itemA = ascending ? resolvePath(a, sortKey, "") : resolvePath(b, sortKey, "");
            const itemB = ascending ? resolvePath(b, sortKey, "") : resolvePath(a, sortKey, "");
            if ($sortHeader.sort)
              return $sortHeader.sort(itemA, itemB);
            if (typeof itemA === "number" && typeof itemB === "number")
              return itemA - itemB;
            return itemA.toString().localeCompare(itemB.toString(), "en", {numeric: true});
          });
        }
      }
    }
    $$rendered = `${validate_component(TableContainer, "TableContainer").$$render($$result, Object.assign({title}, {description}, $$restProps), {}, {
      default: () => `${slots.default ? slots.default({}) : ``}
  ${validate_component(Table, "Table").$$render($$result, {zebra, size, stickyHeader, sortable}, {}, {
        default: () => `${validate_component(TableHead, "TableHead").$$render($$result, {}, {}, {
          default: () => `${validate_component(TableRow, "TableRow").$$render($$result, {}, {}, {
            default: () => `${expandable ? `<th scope="${"col"}"${add_attribute("data-previous-value", void 0, 0)}${add_classes(["bx--table-expand"].join(" ").trim())}>${batchExpansion ? `<button type="${"button"}"${add_classes(["bx--table-expand__button"].join(" ").trim())}>${validate_component(ChevronRight16, "ChevronRight16").$$render($$result, {class: "bx--table-expand__svg"}, {}, {})}</button>` : ``}</th>` : ``}
        ${selectable && !batchSelection ? `<th scope="${"col"}"></th>` : ``}
        ${batchSelection && !radio ? `<th scope="${"col"}"${add_classes(["bx--table-column-checkbox"].join(" ").trim())}>${validate_component(InlineCheckbox, "InlineCheckbox").$$render($$result, {
              "aria-label": "Select all rows",
              checked: selectAll,
              indeterminate,
              ref: refSelectAll
            }, {
              ref: ($$value) => {
                refSelectAll = $$value;
                $$settled = false;
              }
            }, {})}</th>` : ``}
        ${each(headers, (header, i) => `${header.empty ? `<th scope="${"col"}"></th>` : `${validate_component(TableHeader, "TableHeader").$$render($$result, {disableSorting: header.sort === false}, {}, {
              default: () => `${slots["cell-header"] ? slots["cell-header"]({header}) : `${escape2(header.value)}`}
            `
            })}`}`)}`
          })}`
        })}
    ${validate_component(TableBody, "TableBody").$$render($$result, {}, {}, {
          default: () => `${each(sorting ? sortedRows : rows, (row, i) => `${validate_component(TableRow, "TableRow").$$render($$result, {
            id: "row-" + row.id,
            class: (selectedRowIds.includes(row.id) ? "bx--data-table--selected" : "") + " " + (expandedRows[row.id] ? "bx--expandable-row" : "") + " " + (expandable ? "bx--parent-row" : "") + " " + (expandable && parentRowId === row.id ? "bx--expandable-row--hover" : "")
          }, {}, {
            default: () => `${expandable ? `${validate_component(TableCell, "TableCell").$$render($$result, {
              class: "bx--table-expand",
              headers: "expand",
              "data-previous-value": expandedRows[row.id] ? "collapsed" : void 0
            }, {}, {
              default: () => `<button type="${"button"}"${add_attribute("aria-label", expandedRows[row.id] ? "Collapse current row" : "Expand current row", 0)}${add_classes(["bx--table-expand__button"].join(" ").trim())}>${validate_component(ChevronRight16, "ChevronRight16").$$render($$result, {class: "bx--table-expand__svg"}, {}, {})}</button>
            `
            })}` : ``}
          ${selectable ? `<td${add_classes([
              "bx--table-column-checkbox " + (radio ? "bx--table-column-radio" : "")
            ].join(" ").trim())}>${radio ? `${validate_component(RadioButton, "RadioButton").$$render($$result, {
              name: "select-row-" + row.id,
              checked: selectedRowIds.includes(row.id)
            }, {}, {})}` : `${validate_component(InlineCheckbox, "InlineCheckbox").$$render($$result, {
              name: "select-row-" + row.id,
              checked: selectedRowIds.includes(row.id)
            }, {}, {})}`}
            </td>` : ``}
          ${each(row.cells, (cell, j) => `${headers[j].empty ? `<td${add_classes([headers[j].columnMenu ? "bx--table-column-menu" : ""].join(" ").trim())}>${slots.cell ? slots.cell({row, cell}) : `
                  ${escape2(cell.display ? cell.display(cell.value) : cell.value)}
                `}
              </td>` : `${validate_component(TableCell, "TableCell").$$render($$result, {}, {}, {
              default: () => `${slots.cell ? slots.cell({row, cell}) : `
                  ${escape2(cell.display ? cell.display(cell.value) : cell.value)}
                `}
              `
            })}`}`)}
        `
          })}

        ${expandable && expandedRows[row.id] ? `<tr data-child-row${add_classes(["bx--expandable-row"].join(" ").trim())}>${validate_component(TableCell, "TableCell").$$render($$result, {
            colspan: selectable ? headers.length + 2 : headers.length + 1
          }, {}, {
            default: () => `<div${add_classes(["bx--child-row-inner-container"].join(" ").trim())}>${slots["expanded-row"] ? slots["expanded-row"]({row}) : ``}</div>
            `
          })}
          </tr>` : ``}`)}`
        })}`
      })}`
    })}`;
  } while (!$$settled);
  $$unsubscribe_headerItems();
  $$unsubscribe_sortHeader();
  $$unsubscribe_thKeys();
  return $$rendered;
});
create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let values;
  let cols;
  let $$restProps = compute_rest_props($$props, ["columns", "rows", "size", "zebra", "showHeader", "headers", "showToolbar"]);
  let {columns = 5} = $$props;
  let {rows = 5} = $$props;
  let {size = void 0} = $$props;
  let {zebra = false} = $$props;
  let {showHeader = true} = $$props;
  let {headers = []} = $$props;
  let {showToolbar = true} = $$props;
  if ($$props.columns === void 0 && $$bindings.columns && columns !== void 0)
    $$bindings.columns(columns);
  if ($$props.rows === void 0 && $$bindings.rows && rows !== void 0)
    $$bindings.rows(rows);
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  if ($$props.zebra === void 0 && $$bindings.zebra && zebra !== void 0)
    $$bindings.zebra(zebra);
  if ($$props.showHeader === void 0 && $$bindings.showHeader && showHeader !== void 0)
    $$bindings.showHeader(showHeader);
  if ($$props.headers === void 0 && $$bindings.headers && headers !== void 0)
    $$bindings.headers(headers);
  if ($$props.showToolbar === void 0 && $$bindings.showToolbar && showToolbar !== void 0)
    $$bindings.showToolbar(showToolbar);
  values = headers.map((header) => header.value !== void 0 ? header.value : header);
  cols = Array.from({
    length: headers.length > 0 ? headers.length : columns
  }, (_, i) => i);
  return `<div${spread([$$restProps], "bx--skeleton bx--data-table-container")}>${showHeader ? `<div${add_classes(["bx--data-table-header"].join(" ").trim())}><div${add_classes(["bx--data-table-header__title"].join(" ").trim())}></div>
      <div${add_classes(["bx--data-table-header__description"].join(" ").trim())}></div></div>` : ``}
  ${showToolbar ? `<section aria-label="${"data table toolbar"}"${add_classes(["bx--table-toolbar"].join(" ").trim())}><div${add_classes(["bx--toolbar-content"].join(" ").trim())}><span${add_classes([
    "bx--skeleton bx--btn bx--btn--sm"
  ].join(" ").trim())}></span></div></section>` : ``}
  <table${add_classes([
    "bx--skeleton bx--data-table " + (size === "compact" ? "bx--data-table--compact" : "") + " " + (size === "short" ? "bx--data-table--short" : "") + " " + (size === "tall" ? "bx--data-table--tall" : "") + " " + (zebra ? "bx--data-table--zebra" : "")
  ].join(" ").trim())}><thead><tr>${each(cols, (col) => `${typeof values[col] === "object" && values[col].empty === true ? `<th></th>` : `<th>${escape2(values[col] || "")}</th>`}`)}</tr></thead>
    <tbody><tr>${each(cols, (col) => `<td><span></span></td>`)}</tr>
      ${each(Array.from({length: rows - 1}, (_, i) => i), (row) => `<tr>${each(cols, (col) => `<td></td>`)}
        </tr>`)}</tbody></table></div>`;
});
create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["size"]);
  let {size = "default"} = $$props;
  let ref = null;
  const overflowVisible = writable2(false);
  setContext("Toolbar", {
    overflowVisible,
    setOverflowVisible: (visible) => {
      overflowVisible.set(visible);
    }
  });
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  return `<section${spread([{"aria-label": "data table toolbar"}, $$restProps], "bx--table-toolbar " + (size === "sm" ? "bx--table-toolbar--small" : "") + " " + (size === "default" ? "bx--table-toolbar--normal" : ""))}${add_attribute("this", ref, 1)}>${slots.default ? slots.default({}) : ``}</section>`;
});
create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div${add_classes(["bx--toolbar-content"].join(" ").trim())}>${slots.default ? slots.default({}) : ``}</div>`;
});
var Search16 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let ariaLabel;
  let ariaLabelledBy;
  let labelled;
  let attributes;
  let {class: className = void 0} = $$props;
  let {id = void 0} = $$props;
  let {tabindex = void 0} = $$props;
  let {focusable = false} = $$props;
  let {title = void 0} = $$props;
  let {style = void 0} = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.tabindex === void 0 && $$bindings.tabindex && tabindex !== void 0)
    $$bindings.tabindex(tabindex);
  if ($$props.focusable === void 0 && $$bindings.focusable && focusable !== void 0)
    $$bindings.focusable(focusable);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.style === void 0 && $$bindings.style && style !== void 0)
    $$bindings.style(style);
  ariaLabel = $$props["aria-label"];
  ariaLabelledBy = $$props["aria-labelledby"];
  labelled = ariaLabel || ariaLabelledBy || title;
  attributes = {
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    "aria-hidden": labelled ? void 0 : true,
    role: labelled ? "img" : void 0,
    focusable: tabindex === "0" ? true : focusable,
    tabindex
  };
  return `<svg${spread([
    {"data-carbon-icon": "Search16"},
    {xmlns: "http://www.w3.org/2000/svg"},
    {viewBox: "0 0 16 16"},
    {fill: "currentColor"},
    {width: "16"},
    {height: "16"},
    {class: escape2(className)},
    {preserveAspectRatio: "xMidYMid meet"},
    {style: escape2(style)},
    {id: escape2(id)},
    attributes
  ])}><path d="${"M15,14.3L10.7,10c1.9-2.3,1.6-5.8-0.7-7.7S4.2,0.7,2.3,3S0.7,8.8,3,10.7c2,1.7,5,1.7,7,0l4.3,4.3L15,14.3z M2,6.5	C2,4,4,2,6.5,2S11,4,11,6.5S9,11,6.5,11S2,9,2,6.5z"}"></path>${slots.default ? slots.default({}) : `
    ${title ? `<title>${escape2(title)}</title>` : ``}
  `}</svg>`;
});
var SearchSkeleton = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["small", "size"]);
  let {small = false} = $$props;
  let {size = "xl"} = $$props;
  if ($$props.small === void 0 && $$bindings.small && small !== void 0)
    $$bindings.small(small);
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  return `<div${spread([$$restProps], "bx--skeleton " + (size === "sm" || small ? "bx--search--sm" : "") + " " + (size === "lg" ? "bx--search--lg" : "") + " " + (size === "xl" ? "bx--search--xl" : ""))}><span${add_classes(["bx--label"].join(" ").trim())}></span>
  <div${add_classes(["bx--search-input"].join(" ").trim())}></div></div>`;
});
var Search = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, [
    "small",
    "size",
    "searchClass",
    "skeleton",
    "light",
    "disabled",
    "value",
    "type",
    "placeholder",
    "autocomplete",
    "autofocus",
    "closeButtonLabelText",
    "labelText",
    "id",
    "ref"
  ]);
  let {small = false} = $$props;
  let {size = "xl"} = $$props;
  let {searchClass = ""} = $$props;
  let {skeleton = false} = $$props;
  let {light = false} = $$props;
  let {disabled = false} = $$props;
  let {value = ""} = $$props;
  let {type = "text"} = $$props;
  let {placeholder = "Search..."} = $$props;
  let {autocomplete = "off"} = $$props;
  let {autofocus = false} = $$props;
  let {closeButtonLabelText = "Clear search input"} = $$props;
  let {labelText = ""} = $$props;
  let {id = "ccs-" + Math.random().toString(36)} = $$props;
  let {ref = null} = $$props;
  createEventDispatcher();
  if ($$props.small === void 0 && $$bindings.small && small !== void 0)
    $$bindings.small(small);
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  if ($$props.searchClass === void 0 && $$bindings.searchClass && searchClass !== void 0)
    $$bindings.searchClass(searchClass);
  if ($$props.skeleton === void 0 && $$bindings.skeleton && skeleton !== void 0)
    $$bindings.skeleton(skeleton);
  if ($$props.light === void 0 && $$bindings.light && light !== void 0)
    $$bindings.light(light);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  if ($$props.type === void 0 && $$bindings.type && type !== void 0)
    $$bindings.type(type);
  if ($$props.placeholder === void 0 && $$bindings.placeholder && placeholder !== void 0)
    $$bindings.placeholder(placeholder);
  if ($$props.autocomplete === void 0 && $$bindings.autocomplete && autocomplete !== void 0)
    $$bindings.autocomplete(autocomplete);
  if ($$props.autofocus === void 0 && $$bindings.autofocus && autofocus !== void 0)
    $$bindings.autofocus(autofocus);
  if ($$props.closeButtonLabelText === void 0 && $$bindings.closeButtonLabelText && closeButtonLabelText !== void 0)
    $$bindings.closeButtonLabelText(closeButtonLabelText);
  if ($$props.labelText === void 0 && $$bindings.labelText && labelText !== void 0)
    $$bindings.labelText(labelText);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.ref === void 0 && $$bindings.ref && ref !== void 0)
    $$bindings.ref(ref);
  return `${skeleton ? `${validate_component(SearchSkeleton, "SearchSkeleton").$$render($$result, Object.assign({small}, {size}, $$restProps), {}, {})}` : `<div role="${"search"}" aria-labelledby="${escape2(id) + "-search"}" class="${[
    escape2(searchClass),
    "bx--search " + (light ? "bx--search--light" : "") + " " + (disabled ? "bx--search--disabled" : "") + " " + (size === "sm" || small ? "bx--search--sm" : "") + " " + (size === "lg" ? "bx--search--lg" : "") + " " + (size === "xl" ? "bx--search--xl" : "")
  ].join(" ").trim()}"><div${add_classes(["bx--search-magnifier"].join(" ").trim())}>${validate_component(Search16, "Search16").$$render($$result, {class: "bx--search-magnifier-icon"}, {}, {})}</div>
    <label id="${escape2(id) + "-search"}"${add_attribute("for", id, 0)}${add_classes(["bx--label"].join(" ").trim())}>${escape2(labelText)}</label>
    
    <input${spread([
    {role: "searchbox"},
    {
      autofocus: (autofocus === true ? true : void 0) || null
    },
    {autocomplete: escape2(autocomplete)},
    {disabled: disabled || null},
    {id: escape2(id)},
    {placeholder: escape2(placeholder)},
    {type: escape2(type)},
    {value: escape2(value)},
    $$restProps
  ], "bx--search-input")}${add_attribute("this", ref, 1)}>
    <button type="${"button"}"${add_attribute("aria-label", closeButtonLabelText, 0)} ${disabled ? "disabled" : ""}${add_classes([
    "bx--search-close " + (value === "" ? "bx--search-close--hidden" : "")
  ].join(" ").trim())}>${validate_component((size === "xl" ? Close20 : Close16) || missing_component, "svelte:component").$$render($$result, {}, {}, {})}</button></div>`}`;
});
create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let classes;
  let $$restProps = compute_rest_props($$props, ["value", "expanded", "persistent", "disabled", "tabindex", "ref"]);
  let {value = ""} = $$props;
  let {expanded = false} = $$props;
  let {persistent = false} = $$props;
  let {disabled = false} = $$props;
  let {tabindex = "0"} = $$props;
  let {ref = null} = $$props;
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  if ($$props.expanded === void 0 && $$bindings.expanded && expanded !== void 0)
    $$bindings.expanded(expanded);
  if ($$props.persistent === void 0 && $$bindings.persistent && persistent !== void 0)
    $$bindings.persistent(persistent);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  if ($$props.tabindex === void 0 && $$bindings.tabindex && tabindex !== void 0)
    $$bindings.tabindex(tabindex);
  if ($$props.ref === void 0 && $$bindings.ref && ref !== void 0)
    $$bindings.ref(ref);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    classes = [
      expanded && "bx--toolbar-search-container-active",
      persistent ? "bx--toolbar-search-container-persistent" : "bx--toolbar-search-container-expandable",
      disabled && "bx--toolbar-search-container-disabled"
    ].filter(Boolean).join(" ");
    $$rendered = `${validate_component(Search, "Search").$$render($$result, Object.assign({size: "sm"}, {tabindex}, {disabled}, $$restProps, {
      searchClass: classes + " " + $$restProps.class
    }, {ref}, {value}), {
      ref: ($$value) => {
        ref = $$value;
        $$settled = false;
      },
      value: ($$value) => {
        value = $$value;
        $$settled = false;
      }
    }, {})}`;
  } while (!$$settled);
  return $$rendered;
});
create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let showActions;
  let $$restProps = compute_rest_props($$props, ["formatTotalSelected"]);
  let {formatTotalSelected = (totalSelected) => `${totalSelected} item${totalSelected === 1 ? "" : "s"} selected`} = $$props;
  let batchSelectedIds = [];
  const ctx = getContext("DataTable");
  const unsubscribe = ctx.batchSelectedIds.subscribe((value) => {
    batchSelectedIds = value;
  });
  let overflowVisible = false;
  const ctxToolbar = getContext("Toolbar");
  const unsubscribeOverflow = ctxToolbar.overflowVisible.subscribe((value) => {
    overflowVisible = value;
  });
  onMount(() => {
    return () => {
      unsubscribe();
      unsubscribeOverflow();
    };
  });
  if ($$props.formatTotalSelected === void 0 && $$bindings.formatTotalSelected && formatTotalSelected !== void 0)
    $$bindings.formatTotalSelected(formatTotalSelected);
  showActions = batchSelectedIds.length > 0;
  return `${!overflowVisible ? `<div${spread([$$restProps], "bx--batch-actions " + (showActions ? "bx--batch-actions--active" : ""))}><div${add_classes(["bx--batch-summary"].join(" ").trim())}><p${add_classes(["bx--batch-summary__para"].join(" ").trim())}><span>${escape2(formatTotalSelected(batchSelectedIds.length))}</span></p></div>
    <div${add_classes(["bx--action-list"].join(" ").trim())}>${slots.default ? slots.default({}) : ``}
      ${validate_component(Button, "Button").$$render($$result, {
    class: "bx--batch-summary__cancel",
    tabindex: showActions ? "0" : "-1"
  }, {}, {
    default: () => `Cancel
      `
  })}</div></div>` : ``}`;
});
var Settings16 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let ariaLabel;
  let ariaLabelledBy;
  let labelled;
  let attributes;
  let {class: className = void 0} = $$props;
  let {id = void 0} = $$props;
  let {tabindex = void 0} = $$props;
  let {focusable = false} = $$props;
  let {title = void 0} = $$props;
  let {style = void 0} = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.tabindex === void 0 && $$bindings.tabindex && tabindex !== void 0)
    $$bindings.tabindex(tabindex);
  if ($$props.focusable === void 0 && $$bindings.focusable && focusable !== void 0)
    $$bindings.focusable(focusable);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.style === void 0 && $$bindings.style && style !== void 0)
    $$bindings.style(style);
  ariaLabel = $$props["aria-label"];
  ariaLabelledBy = $$props["aria-labelledby"];
  labelled = ariaLabel || ariaLabelledBy || title;
  attributes = {
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    "aria-hidden": labelled ? void 0 : true,
    role: labelled ? "img" : void 0,
    focusable: tabindex === "0" ? true : focusable,
    tabindex
  };
  return `<svg${spread([
    {"data-carbon-icon": "Settings16"},
    {xmlns: "http://www.w3.org/2000/svg"},
    {viewBox: "0 0 16 16"},
    {fill: "currentColor"},
    {width: "16"},
    {height: "16"},
    {class: escape2(className)},
    {preserveAspectRatio: "xMidYMid meet"},
    {style: escape2(style)},
    {id: escape2(id)},
    attributes
  ])}><path d="${"M13.5,8.4c0-0.1,0-0.3,0-0.4c0-0.1,0-0.3,0-0.4l1-0.8c0.4-0.3,0.4-0.9,0.2-1.3l-1.2-2C13.3,3.2,13,3,12.6,3	c-0.1,0-0.2,0-0.3,0.1l-1.2,0.4c-0.2-0.1-0.4-0.3-0.7-0.4l-0.3-1.3C10.1,1.3,9.7,1,9.2,1H6.8c-0.5,0-0.9,0.3-1,0.8L5.6,3.1	C5.3,3.2,5.1,3.3,4.9,3.4L3.7,3C3.6,3,3.5,3,3.4,3C3,3,2.7,3.2,2.5,3.5l-1.2,2C1.1,5.9,1.2,6.4,1.6,6.8l0.9,0.9c0,0.1,0,0.3,0,0.4	c0,0.1,0,0.3,0,0.4L1.6,9.2c-0.4,0.3-0.5,0.9-0.2,1.3l1.2,2C2.7,12.8,3,13,3.4,13c0.1,0,0.2,0,0.3-0.1l1.2-0.4	c0.2,0.1,0.4,0.3,0.7,0.4l0.3,1.3c0.1,0.5,0.5,0.8,1,0.8h2.4c0.5,0,0.9-0.3,1-0.8l0.3-1.3c0.2-0.1,0.4-0.2,0.7-0.4l1.2,0.4	c0.1,0,0.2,0.1,0.3,0.1c0.4,0,0.7-0.2,0.9-0.5l1.1-2c0.2-0.4,0.2-0.9-0.2-1.3L13.5,8.4z M12.6,12l-1.7-0.6c-0.4,0.3-0.9,0.6-1.4,0.8	L9.2,14H6.8l-0.4-1.8c-0.5-0.2-0.9-0.5-1.4-0.8L3.4,12l-1.2-2l1.4-1.2c-0.1-0.5-0.1-1.1,0-1.6L2.2,6l1.2-2l1.7,0.6	C5.5,4.2,6,4,6.5,3.8L6.8,2h2.4l0.4,1.8c0.5,0.2,0.9,0.5,1.4,0.8L12.6,4l1.2,2l-1.4,1.2c0.1,0.5,0.1,1.1,0,1.6l1.4,1.2L12.6,12z"}"></path><path d="${"M8,11c-1.7,0-3-1.3-3-3s1.3-3,3-3s3,1.3,3,3C11,9.6,9.7,11,8,11C8,11,8,11,8,11z M8,6C6.9,6,6,6.8,6,7.9C6,7.9,6,8,6,8	c0,1.1,0.8,2,1.9,2c0,0,0.1,0,0.1,0c1.1,0,2-0.8,2-1.9c0,0,0-0.1,0-0.1C10,6.9,9.2,6,8,6C8.1,6,8,6,8,6z"}"></path>${slots.default ? slots.default({}) : `
    ${title ? `<title>${escape2(title)}</title>` : ``}
  `}</svg>`;
});
var OverflowMenuVertical16 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let ariaLabel;
  let ariaLabelledBy;
  let labelled;
  let attributes;
  let {class: className = void 0} = $$props;
  let {id = void 0} = $$props;
  let {tabindex = void 0} = $$props;
  let {focusable = false} = $$props;
  let {title = void 0} = $$props;
  let {style = void 0} = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.tabindex === void 0 && $$bindings.tabindex && tabindex !== void 0)
    $$bindings.tabindex(tabindex);
  if ($$props.focusable === void 0 && $$bindings.focusable && focusable !== void 0)
    $$bindings.focusable(focusable);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.style === void 0 && $$bindings.style && style !== void 0)
    $$bindings.style(style);
  ariaLabel = $$props["aria-label"];
  ariaLabelledBy = $$props["aria-labelledby"];
  labelled = ariaLabel || ariaLabelledBy || title;
  attributes = {
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    "aria-hidden": labelled ? void 0 : true,
    role: labelled ? "img" : void 0,
    focusable: tabindex === "0" ? true : focusable,
    tabindex
  };
  return `<svg${spread([
    {
      "data-carbon-icon": "OverflowMenuVertical16"
    },
    {xmlns: "http://www.w3.org/2000/svg"},
    {viewBox: "0 0 32 32"},
    {fill: "currentColor"},
    {width: "16"},
    {height: "16"},
    {class: escape2(className)},
    {preserveAspectRatio: "xMidYMid meet"},
    {style: escape2(style)},
    {id: escape2(id)},
    attributes
  ])}><circle cx="${"16"}" cy="${"8"}" r="${"2"}"></circle><circle cx="${"16"}" cy="${"16"}" r="${"2"}"></circle><circle cx="${"16"}" cy="${"24"}" r="${"2"}"></circle>${slots.default ? slots.default({}) : `
    ${title ? `<title>${escape2(title)}</title>` : ``}
  `}</svg>`;
});
var OverflowMenuHorizontal16 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let ariaLabel;
  let ariaLabelledBy;
  let labelled;
  let attributes;
  let {class: className = void 0} = $$props;
  let {id = void 0} = $$props;
  let {tabindex = void 0} = $$props;
  let {focusable = false} = $$props;
  let {title = void 0} = $$props;
  let {style = void 0} = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.tabindex === void 0 && $$bindings.tabindex && tabindex !== void 0)
    $$bindings.tabindex(tabindex);
  if ($$props.focusable === void 0 && $$bindings.focusable && focusable !== void 0)
    $$bindings.focusable(focusable);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.style === void 0 && $$bindings.style && style !== void 0)
    $$bindings.style(style);
  ariaLabel = $$props["aria-label"];
  ariaLabelledBy = $$props["aria-labelledby"];
  labelled = ariaLabel || ariaLabelledBy || title;
  attributes = {
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    "aria-hidden": labelled ? void 0 : true,
    role: labelled ? "img" : void 0,
    focusable: tabindex === "0" ? true : focusable,
    tabindex
  };
  return `<svg${spread([
    {
      "data-carbon-icon": "OverflowMenuHorizontal16"
    },
    {xmlns: "http://www.w3.org/2000/svg"},
    {viewBox: "0 0 32 32"},
    {fill: "currentColor"},
    {width: "16"},
    {height: "16"},
    {class: escape2(className)},
    {preserveAspectRatio: "xMidYMid meet"},
    {style: escape2(style)},
    {id: escape2(id)},
    attributes
  ])}><circle cx="${"8"}" cy="${"16"}" r="${"2"}"></circle><circle cx="${"16"}" cy="${"16"}" r="${"2"}"></circle><circle cx="${"24"}" cy="${"16"}" r="${"2"}"></circle>${slots.default ? slots.default({}) : `
    ${title ? `<title>${escape2(title)}</title>` : ``}
  `}</svg>`;
});
var formatStyle = (style) => ["<style>", style, "</style>"].join("");
var OverflowMenu = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let ariaLabel;
  let dynamicPseudoWidth;
  let styles;
  let $$restProps = compute_rest_props($$props, [
    "size",
    "direction",
    "open",
    "light",
    "flipped",
    "menuOptionsClass",
    "icon",
    "iconClass",
    "iconDescription",
    "id",
    "buttonRef",
    "menuRef"
  ]);
  let $currentIndex, $$unsubscribe_currentIndex;
  let $items, $$unsubscribe_items;
  let $currentId, $$unsubscribe_currentId;
  let {size = void 0} = $$props;
  let {direction: direction2 = "bottom"} = $$props;
  let {open = false} = $$props;
  let {light = false} = $$props;
  let {flipped = false} = $$props;
  let {menuOptionsClass = void 0} = $$props;
  let {icon = OverflowMenuVertical16} = $$props;
  let {iconClass = void 0} = $$props;
  let {iconDescription = "Open and close list of options"} = $$props;
  let {id = "ccs-" + Math.random().toString(36)} = $$props;
  let {buttonRef = null} = $$props;
  let {menuRef = null} = $$props;
  const ctxBreadcrumbItem = getContext("BreadcrumbItem");
  const dispatch = createEventDispatcher();
  const items = writable2([]);
  $$unsubscribe_items = subscribe(items, (value) => $items = value);
  const currentId = writable2(void 0);
  $$unsubscribe_currentId = subscribe(currentId, (value) => $currentId = value);
  const focusedId = writable2(void 0);
  const currentIndex = writable2(-1);
  $$unsubscribe_currentIndex = subscribe(currentIndex, (value) => $currentIndex = value);
  let buttonWidth = void 0;
  let onMountAfterUpdate = true;
  setContext("OverflowMenu", {
    focusedId,
    add: ({id: id2, text, primaryFocus}) => {
      items.update((_) => {
        if (primaryFocus) {
          currentIndex.set(_.length);
        }
        return [..._, {id: id2, text, primaryFocus, index: _.length}];
      });
    },
    update: (id2) => {
      currentId.set(id2);
    },
    change: (direction3) => {
      let index2 = $currentIndex + direction3;
      if (index2 < 0) {
        index2 = $items.length - 1;
      } else if (index2 >= $items.length) {
        index2 = 0;
      }
      currentIndex.set(index2);
    }
  });
  afterUpdate(() => {
    if ($currentId) {
      const {index: index2, text} = $items.filter((_) => _.id === $currentId)[0];
      dispatch("close", {index: index2, text});
      open = false;
    }
    if (open) {
      const {width, height} = buttonRef.getBoundingClientRect();
      buttonWidth = width;
      if (!onMountAfterUpdate && $currentIndex < 0) {
        menuRef.focus();
      }
      if (flipped) {
        menuRef.style.left = "auto";
        menuRef.style.right = 0;
      }
      if (direction2 === "top") {
        menuRef.style.top = "auto";
        menuRef.style.bottom = height + "px";
      } else if (direction2 === "bottom") {
        menuRef.style.top = height + "px";
      }
      if (ctxBreadcrumbItem) {
        menuRef.style.top = height + 10 + "px";
        menuRef.style.left = -11 + "px";
      }
    }
    if (!open) {
      items.set([]);
      currentId.set(void 0);
      currentIndex.set(0);
    }
    onMountAfterUpdate = false;
  });
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  if ($$props.direction === void 0 && $$bindings.direction && direction2 !== void 0)
    $$bindings.direction(direction2);
  if ($$props.open === void 0 && $$bindings.open && open !== void 0)
    $$bindings.open(open);
  if ($$props.light === void 0 && $$bindings.light && light !== void 0)
    $$bindings.light(light);
  if ($$props.flipped === void 0 && $$bindings.flipped && flipped !== void 0)
    $$bindings.flipped(flipped);
  if ($$props.menuOptionsClass === void 0 && $$bindings.menuOptionsClass && menuOptionsClass !== void 0)
    $$bindings.menuOptionsClass(menuOptionsClass);
  if ($$props.icon === void 0 && $$bindings.icon && icon !== void 0)
    $$bindings.icon(icon);
  if ($$props.iconClass === void 0 && $$bindings.iconClass && iconClass !== void 0)
    $$bindings.iconClass(iconClass);
  if ($$props.iconDescription === void 0 && $$bindings.iconDescription && iconDescription !== void 0)
    $$bindings.iconDescription(iconDescription);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.buttonRef === void 0 && $$bindings.buttonRef && buttonRef !== void 0)
    $$bindings.buttonRef(buttonRef);
  if ($$props.menuRef === void 0 && $$bindings.menuRef && menuRef !== void 0)
    $$bindings.menuRef(menuRef);
  {
    if (ctxBreadcrumbItem) {
      icon = OverflowMenuHorizontal16;
    }
  }
  ariaLabel = $$props["aria-label"] || "menu";
  {
    if ($items[$currentIndex]) {
      focusedId.set($items[$currentIndex].id);
    }
  }
  dynamicPseudoWidth = `#${id} .bx--overflow-menu-options.bx--overflow-menu-options:after {
      width: ${buttonWidth ? buttonWidth + "px" : "2rem"};
    }`;
  styles = formatStyle(dynamicPseudoWidth);
  $$unsubscribe_currentIndex();
  $$unsubscribe_items();
  $$unsubscribe_currentId();
  return `${$$result.head += `${styles}`, ""}



<button${spread([
    {"aria-haspopup": true},
    {"aria-expanded": escape2(open)},
    {"aria-label": escape2(ariaLabel)},
    {id: escape2(id)},
    $$restProps
  ], "bx--overflow-menu " + (open ? "bx--overflow-menu--open" : "") + " " + (light ? "bx--overflow-menu--light" : "") + " " + (size === "sm" ? "bx--overflow-menu--sm" : "") + " " + (size === "xl" ? "bx--overflow-menu--xl" : ""))}${add_attribute("this", buttonRef, 1)}>${slots.menu ? slots.menu({}) : `
    ${validate_component(icon || missing_component, "svelte:component").$$render($$result, {
    "aria-label": iconDescription,
    title: iconDescription,
    class: "bx--overflow-menu__icon " + iconClass
  }, {}, {})}
  `}
  ${open ? `<ul role="${"menu"}" tabindex="${"-1"}"${add_attribute("aria-label", ariaLabel, 0)}${add_attribute("data-floating-menu-direction", direction2, 0)}${add_classes([
    "bx--overflow-menu-options " + (flipped ? "bx--overflow-menu--flip" : "") + " " + (open ? "bx--overflow-menu-options--open" : "") + " " + (light ? "bx--overflow-menu-options--light" : "") + " " + (size === "sm" ? "bx--overflow-menu-options--sm" : "") + " " + (size === "xl" ? "bx--overflow-menu-options--xl" : "") + " " + (!!ctxBreadcrumbItem ? "bx--breadcrumb-menu-options" : "") + " " + (menuOptionsClass ? "menuOptionsClass" : "")
  ].join(" ").trim())}${add_attribute("this", menuRef, 1)}>${slots.default ? slots.default({}) : ``}</ul>` : ``}</button>`;
});
var OverflowMenuItem = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let buttonProps;
  let $$restProps = compute_rest_props($$props, [
    "text",
    "href",
    "primaryFocus",
    "disabled",
    "hasDivider",
    "danger",
    "requireTitle",
    "id",
    "ref"
  ]);
  let $focusedId, $$unsubscribe_focusedId;
  let {text = "Provide text"} = $$props;
  let {href = ""} = $$props;
  let {primaryFocus = false} = $$props;
  let {disabled = false} = $$props;
  let {hasDivider = false} = $$props;
  let {danger = false} = $$props;
  let {requireTitle = true} = $$props;
  let {id = "ccs-" + Math.random().toString(36)} = $$props;
  let {ref = null} = $$props;
  const {focusedId, add, update: update2, change} = getContext("OverflowMenu");
  $$unsubscribe_focusedId = subscribe(focusedId, (value) => $focusedId = value);
  add({id, text, primaryFocus});
  afterUpdate(() => {
    if (primaryFocus) {
      ref.focus();
    }
  });
  if ($$props.text === void 0 && $$bindings.text && text !== void 0)
    $$bindings.text(text);
  if ($$props.href === void 0 && $$bindings.href && href !== void 0)
    $$bindings.href(href);
  if ($$props.primaryFocus === void 0 && $$bindings.primaryFocus && primaryFocus !== void 0)
    $$bindings.primaryFocus(primaryFocus);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  if ($$props.hasDivider === void 0 && $$bindings.hasDivider && hasDivider !== void 0)
    $$bindings.hasDivider(hasDivider);
  if ($$props.danger === void 0 && $$bindings.danger && danger !== void 0)
    $$bindings.danger(danger);
  if ($$props.requireTitle === void 0 && $$bindings.requireTitle && requireTitle !== void 0)
    $$bindings.requireTitle(requireTitle);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.ref === void 0 && $$bindings.ref && ref !== void 0)
    $$bindings.ref(ref);
  primaryFocus = $focusedId === id;
  buttonProps = {
    tabindex: "-1",
    title: requireTitle ? text : void 0,
    class: "bx--overflow-menu-options__btn",
    disabled: href ? void 0 : disabled,
    href: href ? href : void 0
  };
  $$unsubscribe_focusedId();
  return `<li${spread([{role: "menuitem"}, {id: escape2(id)}, $$restProps], "bx--overflow-menu-options__option " + (hasDivider ? "bx--overflow-menu--divider" : "") + " " + (danger ? "bx--overflow-menu-options__option--danger" : "") + " " + (disabled ? "bx--overflow-menu-options__option--disabled" : ""))}>${href ? `
    <a${spread([buttonProps])}${add_attribute("this", ref, 1)}>${slots.default ? slots.default({}) : `
        <div${add_classes(["bx--overflow-menu-options__option-content"].join(" ").trim())}>${escape2(text)}</div>
      `}</a>` : `<button${spread([buttonProps])}${add_attribute("this", ref, 1)}>${slots.default ? slots.default({}) : `
        <div${add_classes(["bx--overflow-menu-options__option-content"].join(" ").trim())}>${escape2(text)}</div>
      `}</button>`}</li>`;
});
create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, []);
  const ctx = getContext("Toolbar");
  let menuRef = null;
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    {
      if (menuRef)
        menuRef.style.top = "100%";
    }
    {
      ctx.setOverflowVisible(menuRef != null);
    }
    $$rendered = `${validate_component(OverflowMenu, "OverflowMenu").$$render($$result, Object.assign({icon: Settings16}, $$restProps, {
      class: "bx--toolbar-action bx--overflow-menu " + $$restProps.class
    }, {flipped: true}, {menuRef}), {
      menuRef: ($$value) => {
        menuRef = $$value;
        $$settled = false;
      }
    }, {
      default: () => `${slots.default ? slots.default({}) : ``}`
    })}`;
  } while (!$$settled);
  return $$rendered;
});
create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, []);
  return `${validate_component(OverflowMenuItem, "OverflowMenuItem").$$render($$result, Object.assign($$restProps), {}, {
    default: () => `${slots.default ? slots.default({}) : ``}`
  })}`;
});
var HOOKS = [
  "onChange",
  "onClose",
  "onDayCreate",
  "onDestroy",
  "onKeyDown",
  "onMonthChange",
  "onOpen",
  "onParseConfig",
  "onReady",
  "onValueUpdate",
  "onYearChange",
  "onPreCalendarPosition"
];
var defaults = {
  _disable: [],
  allowInput: false,
  allowInvalidPreload: false,
  altFormat: "F j, Y",
  altInput: false,
  altInputClass: "form-control input",
  animate: typeof window === "object" && window.navigator.userAgent.indexOf("MSIE") === -1,
  ariaDateFormat: "F j, Y",
  autoFillDefaultTime: true,
  clickOpens: true,
  closeOnSelect: true,
  conjunction: ", ",
  dateFormat: "Y-m-d",
  defaultHour: 12,
  defaultMinute: 0,
  defaultSeconds: 0,
  disable: [],
  disableMobile: false,
  enableSeconds: false,
  enableTime: false,
  errorHandler: (err) => typeof console !== "undefined" && console.warn(err),
  getWeek: (givenDate) => {
    const date = new Date(givenDate.getTime());
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
    var week1 = new Date(date.getFullYear(), 0, 4);
    return 1 + Math.round(((date.getTime() - week1.getTime()) / 864e5 - 3 + (week1.getDay() + 6) % 7) / 7);
  },
  hourIncrement: 1,
  ignoredFocusElements: [],
  inline: false,
  locale: "default",
  minuteIncrement: 5,
  mode: "single",
  monthSelectorType: "dropdown",
  nextArrow: "<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 17 17'><g></g><path d='M13.207 8.472l-7.854 7.854-0.707-0.707 7.146-7.146-7.146-7.148 0.707-0.707 7.854 7.854z' /></svg>",
  noCalendar: false,
  now: new Date(),
  onChange: [],
  onClose: [],
  onDayCreate: [],
  onDestroy: [],
  onKeyDown: [],
  onMonthChange: [],
  onOpen: [],
  onParseConfig: [],
  onReady: [],
  onValueUpdate: [],
  onYearChange: [],
  onPreCalendarPosition: [],
  plugins: [],
  position: "auto",
  positionElement: void 0,
  prevArrow: "<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 17 17'><g></g><path d='M5.207 8.471l7.146 7.147-0.707 0.707-7.853-7.854 7.854-7.853 0.707 0.707-7.147 7.146z' /></svg>",
  shorthandCurrentMonth: false,
  showMonths: 1,
  static: false,
  time_24hr: false,
  weekNumbers: false,
  wrap: false
};
var english = {
  weekdays: {
    shorthand: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    longhand: [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ]
  },
  months: {
    shorthand: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ],
    longhand: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ]
  },
  daysInMonth: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
  firstDayOfWeek: 0,
  ordinal: (nth) => {
    const s2 = nth % 100;
    if (s2 > 3 && s2 < 21)
      return "th";
    switch (s2 % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  },
  rangeSeparator: " to ",
  weekAbbreviation: "Wk",
  scrollTitle: "Scroll to increment",
  toggleTitle: "Click to toggle",
  amPM: ["AM", "PM"],
  yearAriaLabel: "Year",
  monthAriaLabel: "Month",
  hourAriaLabel: "Hour",
  minuteAriaLabel: "Minute",
  time_24hr: false
};
var pad = (number, length = 2) => `000${number}`.slice(length * -1);
var int = (bool) => bool === true ? 1 : 0;
function debounce(fn, wait) {
  let t;
  return function() {
    clearTimeout(t);
    t = setTimeout(() => fn.apply(this, arguments), wait);
  };
}
var arrayify = (obj) => obj instanceof Array ? obj : [obj];
function toggleClass(elem, className, bool) {
  if (bool === true)
    return elem.classList.add(className);
  elem.classList.remove(className);
}
function createElement(tag, className, content) {
  const e = window.document.createElement(tag);
  className = className || "";
  content = content || "";
  e.className = className;
  if (content !== void 0)
    e.textContent = content;
  return e;
}
function clearNode(node) {
  while (node.firstChild)
    node.removeChild(node.firstChild);
}
function findParent(node, condition) {
  if (condition(node))
    return node;
  else if (node.parentNode)
    return findParent(node.parentNode, condition);
  return void 0;
}
function createNumberInput(inputClassName, opts) {
  const wrapper = createElement("div", "numInputWrapper"), numInput = createElement("input", "numInput " + inputClassName), arrowUp = createElement("span", "arrowUp"), arrowDown = createElement("span", "arrowDown");
  if (navigator.userAgent.indexOf("MSIE 9.0") === -1) {
    numInput.type = "number";
  } else {
    numInput.type = "text";
    numInput.pattern = "\\d*";
  }
  if (opts !== void 0)
    for (const key in opts)
      numInput.setAttribute(key, opts[key]);
  wrapper.appendChild(numInput);
  wrapper.appendChild(arrowUp);
  wrapper.appendChild(arrowDown);
  return wrapper;
}
function getEventTarget(event) {
  try {
    if (typeof event.composedPath === "function") {
      const path = event.composedPath();
      return path[0];
    }
    return event.target;
  } catch (error22) {
    return event.target;
  }
}
var doNothing = () => void 0;
var monthToStr = (monthNumber, shorthand, locale) => locale.months[shorthand ? "shorthand" : "longhand"][monthNumber];
var revFormat = {
  D: doNothing,
  F: function(dateObj, monthName, locale) {
    dateObj.setMonth(locale.months.longhand.indexOf(monthName));
  },
  G: (dateObj, hour) => {
    dateObj.setHours(parseFloat(hour));
  },
  H: (dateObj, hour) => {
    dateObj.setHours(parseFloat(hour));
  },
  J: (dateObj, day) => {
    dateObj.setDate(parseFloat(day));
  },
  K: (dateObj, amPM, locale) => {
    dateObj.setHours(dateObj.getHours() % 12 + 12 * int(new RegExp(locale.amPM[1], "i").test(amPM)));
  },
  M: function(dateObj, shortMonth, locale) {
    dateObj.setMonth(locale.months.shorthand.indexOf(shortMonth));
  },
  S: (dateObj, seconds) => {
    dateObj.setSeconds(parseFloat(seconds));
  },
  U: (_, unixSeconds) => new Date(parseFloat(unixSeconds) * 1e3),
  W: function(dateObj, weekNum, locale) {
    const weekNumber = parseInt(weekNum);
    const date = new Date(dateObj.getFullYear(), 0, 2 + (weekNumber - 1) * 7, 0, 0, 0, 0);
    date.setDate(date.getDate() - date.getDay() + locale.firstDayOfWeek);
    return date;
  },
  Y: (dateObj, year) => {
    dateObj.setFullYear(parseFloat(year));
  },
  Z: (_, ISODate) => new Date(ISODate),
  d: (dateObj, day) => {
    dateObj.setDate(parseFloat(day));
  },
  h: (dateObj, hour) => {
    dateObj.setHours(parseFloat(hour));
  },
  i: (dateObj, minutes) => {
    dateObj.setMinutes(parseFloat(minutes));
  },
  j: (dateObj, day) => {
    dateObj.setDate(parseFloat(day));
  },
  l: doNothing,
  m: (dateObj, month) => {
    dateObj.setMonth(parseFloat(month) - 1);
  },
  n: (dateObj, month) => {
    dateObj.setMonth(parseFloat(month) - 1);
  },
  s: (dateObj, seconds) => {
    dateObj.setSeconds(parseFloat(seconds));
  },
  u: (_, unixMillSeconds) => new Date(parseFloat(unixMillSeconds)),
  w: doNothing,
  y: (dateObj, year) => {
    dateObj.setFullYear(2e3 + parseFloat(year));
  }
};
var tokenRegex = {
  D: "(\\w+)",
  F: "(\\w+)",
  G: "(\\d\\d|\\d)",
  H: "(\\d\\d|\\d)",
  J: "(\\d\\d|\\d)\\w+",
  K: "",
  M: "(\\w+)",
  S: "(\\d\\d|\\d)",
  U: "(.+)",
  W: "(\\d\\d|\\d)",
  Y: "(\\d{4})",
  Z: "(.+)",
  d: "(\\d\\d|\\d)",
  h: "(\\d\\d|\\d)",
  i: "(\\d\\d|\\d)",
  j: "(\\d\\d|\\d)",
  l: "(\\w+)",
  m: "(\\d\\d|\\d)",
  n: "(\\d\\d|\\d)",
  s: "(\\d\\d|\\d)",
  u: "(.+)",
  w: "(\\d\\d|\\d)",
  y: "(\\d{2})"
};
var formats = {
  Z: (date) => date.toISOString(),
  D: function(date, locale, options2) {
    return locale.weekdays.shorthand[formats.w(date, locale, options2)];
  },
  F: function(date, locale, options2) {
    return monthToStr(formats.n(date, locale, options2) - 1, false, locale);
  },
  G: function(date, locale, options2) {
    return pad(formats.h(date, locale, options2));
  },
  H: (date) => pad(date.getHours()),
  J: function(date, locale) {
    return locale.ordinal !== void 0 ? date.getDate() + locale.ordinal(date.getDate()) : date.getDate();
  },
  K: (date, locale) => locale.amPM[int(date.getHours() > 11)],
  M: function(date, locale) {
    return monthToStr(date.getMonth(), true, locale);
  },
  S: (date) => pad(date.getSeconds()),
  U: (date) => date.getTime() / 1e3,
  W: function(date, _, options2) {
    return options2.getWeek(date);
  },
  Y: (date) => pad(date.getFullYear(), 4),
  d: (date) => pad(date.getDate()),
  h: (date) => date.getHours() % 12 ? date.getHours() % 12 : 12,
  i: (date) => pad(date.getMinutes()),
  j: (date) => date.getDate(),
  l: function(date, locale) {
    return locale.weekdays.longhand[date.getDay()];
  },
  m: (date) => pad(date.getMonth() + 1),
  n: (date) => date.getMonth() + 1,
  s: (date) => date.getSeconds(),
  u: (date) => date.getTime(),
  w: (date) => date.getDay(),
  y: (date) => String(date.getFullYear()).substring(2)
};
var createDateFormatter = ({config = defaults, l10n: l10n2 = english, isMobile = false}) => (dateObj, frmt, overrideLocale) => {
  const locale = overrideLocale || l10n2;
  if (config.formatDate !== void 0 && !isMobile) {
    return config.formatDate(dateObj, frmt, locale);
  }
  return frmt.split("").map((c, i, arr) => formats[c] && arr[i - 1] !== "\\" ? formats[c](dateObj, locale, config) : c !== "\\" ? c : "").join("");
};
var createDateParser = ({config = defaults, l10n: l10n2 = english}) => (date, givenFormat, timeless, customLocale) => {
  if (date !== 0 && !date)
    return void 0;
  const locale = customLocale || l10n2;
  let parsedDate;
  const dateOrig = date;
  if (date instanceof Date)
    parsedDate = new Date(date.getTime());
  else if (typeof date !== "string" && date.toFixed !== void 0)
    parsedDate = new Date(date);
  else if (typeof date === "string") {
    const format2 = givenFormat || (config || defaults).dateFormat;
    const datestr = String(date).trim();
    if (datestr === "today") {
      parsedDate = new Date();
      timeless = true;
    } else if (/Z$/.test(datestr) || /GMT$/.test(datestr))
      parsedDate = new Date(date);
    else if (config && config.parseDate)
      parsedDate = config.parseDate(date, format2);
    else {
      parsedDate = !config || !config.noCalendar ? new Date(new Date().getFullYear(), 0, 1, 0, 0, 0, 0) : new Date(new Date().setHours(0, 0, 0, 0));
      let matched, ops = [];
      for (let i = 0, matchIndex = 0, regexStr = ""; i < format2.length; i++) {
        const token = format2[i];
        const isBackSlash = token === "\\";
        const escaped3 = format2[i - 1] === "\\" || isBackSlash;
        if (tokenRegex[token] && !escaped3) {
          regexStr += tokenRegex[token];
          const match = new RegExp(regexStr).exec(date);
          if (match && (matched = true)) {
            ops[token !== "Y" ? "push" : "unshift"]({
              fn: revFormat[token],
              val: match[++matchIndex]
            });
          }
        } else if (!isBackSlash)
          regexStr += ".";
        ops.forEach(({fn, val}) => parsedDate = fn(parsedDate, val, locale) || parsedDate);
      }
      parsedDate = matched ? parsedDate : void 0;
    }
  }
  if (!(parsedDate instanceof Date && !isNaN(parsedDate.getTime()))) {
    config.errorHandler(new Error(`Invalid date provided: ${dateOrig}`));
    return void 0;
  }
  if (timeless === true)
    parsedDate.setHours(0, 0, 0, 0);
  return parsedDate;
};
function compareDates(date1, date2, timeless = true) {
  if (timeless !== false) {
    return new Date(date1.getTime()).setHours(0, 0, 0, 0) - new Date(date2.getTime()).setHours(0, 0, 0, 0);
  }
  return date1.getTime() - date2.getTime();
}
var isBetween = (ts, ts1, ts2) => {
  return ts > Math.min(ts1, ts2) && ts < Math.max(ts1, ts2);
};
var duration = {
  DAY: 864e5
};
function getDefaultHours(config) {
  let hours = config.defaultHour;
  let minutes = config.defaultMinute;
  let seconds = config.defaultSeconds;
  if (config.minDate !== void 0) {
    const minHour = config.minDate.getHours();
    const minMinutes = config.minDate.getMinutes();
    const minSeconds = config.minDate.getSeconds();
    if (hours < minHour) {
      hours = minHour;
    }
    if (hours === minHour && minutes < minMinutes) {
      minutes = minMinutes;
    }
    if (hours === minHour && minutes === minMinutes && seconds < minSeconds)
      seconds = config.minDate.getSeconds();
  }
  if (config.maxDate !== void 0) {
    const maxHr = config.maxDate.getHours();
    const maxMinutes = config.maxDate.getMinutes();
    hours = Math.min(hours, maxHr);
    if (hours === maxHr)
      minutes = Math.min(maxMinutes, minutes);
    if (hours === maxHr && minutes === maxMinutes)
      seconds = config.maxDate.getSeconds();
  }
  return {hours, minutes, seconds};
}
if (typeof Object.assign !== "function") {
  Object.assign = function(target, ...args) {
    if (!target) {
      throw TypeError("Cannot convert undefined or null to object");
    }
    for (const source of args) {
      if (source) {
        Object.keys(source).forEach((key) => target[key] = source[key]);
      }
    }
    return target;
  };
}
var DEBOUNCED_CHANGE_MS = 300;
function FlatpickrInstance(element, instanceConfig) {
  const self = {
    config: Object.assign(Object.assign({}, defaults), flatpickr.defaultConfig),
    l10n: english
  };
  self.parseDate = createDateParser({config: self.config, l10n: self.l10n});
  self._handlers = [];
  self.pluginElements = [];
  self.loadedPlugins = [];
  self._bind = bind;
  self._setHoursFromDate = setHoursFromDate;
  self._positionCalendar = positionCalendar;
  self.changeMonth = changeMonth;
  self.changeYear = changeYear;
  self.clear = clear;
  self.close = close;
  self._createElement = createElement;
  self.destroy = destroy;
  self.isEnabled = isEnabled;
  self.jumpToDate = jumpToDate;
  self.open = open;
  self.redraw = redraw;
  self.set = set;
  self.setDate = setDate;
  self.toggle = toggle;
  function setupHelperFunctions() {
    self.utils = {
      getDaysInMonth(month = self.currentMonth, yr = self.currentYear) {
        if (month === 1 && (yr % 4 === 0 && yr % 100 !== 0 || yr % 400 === 0))
          return 29;
        return self.l10n.daysInMonth[month];
      }
    };
  }
  function init2() {
    self.element = self.input = element;
    self.isOpen = false;
    parseConfig();
    setupLocale();
    setupInputs();
    setupDates();
    setupHelperFunctions();
    if (!self.isMobile)
      build();
    bindEvents();
    if (self.selectedDates.length || self.config.noCalendar) {
      if (self.config.enableTime) {
        setHoursFromDate(self.config.noCalendar ? self.latestSelectedDateObj : void 0);
      }
      updateValue(false);
    }
    setCalendarWidth();
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    if (!self.isMobile && isSafari) {
      positionCalendar();
    }
    triggerEvent("onReady");
  }
  function bindToInstance(fn) {
    return fn.bind(self);
  }
  function setCalendarWidth() {
    const config = self.config;
    if (config.weekNumbers === false && config.showMonths === 1) {
      return;
    } else if (config.noCalendar !== true) {
      window.requestAnimationFrame(function() {
        if (self.calendarContainer !== void 0) {
          self.calendarContainer.style.visibility = "hidden";
          self.calendarContainer.style.display = "block";
        }
        if (self.daysContainer !== void 0) {
          const daysWidth = (self.days.offsetWidth + 1) * config.showMonths;
          self.daysContainer.style.width = daysWidth + "px";
          self.calendarContainer.style.width = daysWidth + (self.weekWrapper !== void 0 ? self.weekWrapper.offsetWidth : 0) + "px";
          self.calendarContainer.style.removeProperty("visibility");
          self.calendarContainer.style.removeProperty("display");
        }
      });
    }
  }
  function updateTime(e) {
    if (self.selectedDates.length === 0) {
      const defaultDate = self.config.minDate === void 0 || compareDates(new Date(), self.config.minDate) >= 0 ? new Date() : new Date(self.config.minDate.getTime());
      const defaults2 = getDefaultHours(self.config);
      defaultDate.setHours(defaults2.hours, defaults2.minutes, defaults2.seconds, defaultDate.getMilliseconds());
      self.selectedDates = [defaultDate];
      self.latestSelectedDateObj = defaultDate;
    }
    if (e !== void 0 && e.type !== "blur") {
      timeWrapper(e);
    }
    const prevValue = self._input.value;
    setHoursFromInputs();
    updateValue();
    if (self._input.value !== prevValue) {
      self._debouncedChange();
    }
  }
  function ampm2military(hour, amPM) {
    return hour % 12 + 12 * int(amPM === self.l10n.amPM[1]);
  }
  function military2ampm(hour) {
    switch (hour % 24) {
      case 0:
      case 12:
        return 12;
      default:
        return hour % 12;
    }
  }
  function setHoursFromInputs() {
    if (self.hourElement === void 0 || self.minuteElement === void 0)
      return;
    let hours = (parseInt(self.hourElement.value.slice(-2), 10) || 0) % 24, minutes = (parseInt(self.minuteElement.value, 10) || 0) % 60, seconds = self.secondElement !== void 0 ? (parseInt(self.secondElement.value, 10) || 0) % 60 : 0;
    if (self.amPM !== void 0) {
      hours = ampm2military(hours, self.amPM.textContent);
    }
    const limitMinHours = self.config.minTime !== void 0 || self.config.minDate && self.minDateHasTime && self.latestSelectedDateObj && compareDates(self.latestSelectedDateObj, self.config.minDate, true) === 0;
    const limitMaxHours = self.config.maxTime !== void 0 || self.config.maxDate && self.maxDateHasTime && self.latestSelectedDateObj && compareDates(self.latestSelectedDateObj, self.config.maxDate, true) === 0;
    if (limitMaxHours) {
      const maxTime = self.config.maxTime !== void 0 ? self.config.maxTime : self.config.maxDate;
      hours = Math.min(hours, maxTime.getHours());
      if (hours === maxTime.getHours())
        minutes = Math.min(minutes, maxTime.getMinutes());
      if (minutes === maxTime.getMinutes())
        seconds = Math.min(seconds, maxTime.getSeconds());
    }
    if (limitMinHours) {
      const minTime = self.config.minTime !== void 0 ? self.config.minTime : self.config.minDate;
      hours = Math.max(hours, minTime.getHours());
      if (hours === minTime.getHours() && minutes < minTime.getMinutes())
        minutes = minTime.getMinutes();
      if (minutes === minTime.getMinutes())
        seconds = Math.max(seconds, minTime.getSeconds());
    }
    setHours(hours, minutes, seconds);
  }
  function setHoursFromDate(dateObj) {
    const date = dateObj || self.latestSelectedDateObj;
    if (date) {
      setHours(date.getHours(), date.getMinutes(), date.getSeconds());
    }
  }
  function setHours(hours, minutes, seconds) {
    if (self.latestSelectedDateObj !== void 0) {
      self.latestSelectedDateObj.setHours(hours % 24, minutes, seconds || 0, 0);
    }
    if (!self.hourElement || !self.minuteElement || self.isMobile)
      return;
    self.hourElement.value = pad(!self.config.time_24hr ? (12 + hours) % 12 + 12 * int(hours % 12 === 0) : hours);
    self.minuteElement.value = pad(minutes);
    if (self.amPM !== void 0)
      self.amPM.textContent = self.l10n.amPM[int(hours >= 12)];
    if (self.secondElement !== void 0)
      self.secondElement.value = pad(seconds);
  }
  function onYearInput(event) {
    const eventTarget = getEventTarget(event);
    const year = parseInt(eventTarget.value) + (event.delta || 0);
    if (year / 1e3 > 1 || event.key === "Enter" && !/[^\d]/.test(year.toString())) {
      changeYear(year);
    }
  }
  function bind(element2, event, handler, options2) {
    if (event instanceof Array)
      return event.forEach((ev) => bind(element2, ev, handler, options2));
    if (element2 instanceof Array)
      return element2.forEach((el) => bind(el, event, handler, options2));
    element2.addEventListener(event, handler, options2);
    self._handlers.push({
      remove: () => element2.removeEventListener(event, handler)
    });
  }
  function triggerChange() {
    triggerEvent("onChange");
  }
  function bindEvents() {
    if (self.config.wrap) {
      ["open", "close", "toggle", "clear"].forEach((evt) => {
        Array.prototype.forEach.call(self.element.querySelectorAll(`[data-${evt}]`), (el) => bind(el, "click", self[evt]));
      });
    }
    if (self.isMobile) {
      setupMobile();
      return;
    }
    const debouncedResize = debounce(onResize, 50);
    self._debouncedChange = debounce(triggerChange, DEBOUNCED_CHANGE_MS);
    if (self.daysContainer && !/iPhone|iPad|iPod/i.test(navigator.userAgent))
      bind(self.daysContainer, "mouseover", (e) => {
        if (self.config.mode === "range")
          onMouseOver(getEventTarget(e));
      });
    bind(window.document.body, "keydown", onKeyDown);
    if (!self.config.inline && !self.config.static)
      bind(window, "resize", debouncedResize);
    if (window.ontouchstart !== void 0)
      bind(window.document, "touchstart", documentClick);
    else
      bind(window.document, "mousedown", documentClick);
    bind(window.document, "focus", documentClick, {capture: true});
    if (self.config.clickOpens === true) {
      bind(self._input, "focus", self.open);
      bind(self._input, "click", self.open);
    }
    if (self.daysContainer !== void 0) {
      bind(self.monthNav, "click", onMonthNavClick);
      bind(self.monthNav, ["keyup", "increment"], onYearInput);
      bind(self.daysContainer, "click", selectDate);
    }
    if (self.timeContainer !== void 0 && self.minuteElement !== void 0 && self.hourElement !== void 0) {
      const selText = (e) => getEventTarget(e).select();
      bind(self.timeContainer, ["increment"], updateTime);
      bind(self.timeContainer, "blur", updateTime, {capture: true});
      bind(self.timeContainer, "click", timeIncrement);
      bind([self.hourElement, self.minuteElement], ["focus", "click"], selText);
      if (self.secondElement !== void 0)
        bind(self.secondElement, "focus", () => self.secondElement && self.secondElement.select());
      if (self.amPM !== void 0) {
        bind(self.amPM, "click", (e) => {
          updateTime(e);
          triggerChange();
        });
      }
    }
    if (self.config.allowInput) {
      bind(self._input, "blur", onBlur);
    }
  }
  function jumpToDate(jumpDate, triggerChange2) {
    const jumpTo = jumpDate !== void 0 ? self.parseDate(jumpDate) : self.latestSelectedDateObj || (self.config.minDate && self.config.minDate > self.now ? self.config.minDate : self.config.maxDate && self.config.maxDate < self.now ? self.config.maxDate : self.now);
    const oldYear = self.currentYear;
    const oldMonth = self.currentMonth;
    try {
      if (jumpTo !== void 0) {
        self.currentYear = jumpTo.getFullYear();
        self.currentMonth = jumpTo.getMonth();
      }
    } catch (e) {
      e.message = "Invalid date supplied: " + jumpTo;
      self.config.errorHandler(e);
    }
    if (triggerChange2 && self.currentYear !== oldYear) {
      triggerEvent("onYearChange");
      buildMonthSwitch();
    }
    if (triggerChange2 && (self.currentYear !== oldYear || self.currentMonth !== oldMonth)) {
      triggerEvent("onMonthChange");
    }
    self.redraw();
  }
  function timeIncrement(e) {
    const eventTarget = getEventTarget(e);
    if (~eventTarget.className.indexOf("arrow"))
      incrementNumInput(e, eventTarget.classList.contains("arrowUp") ? 1 : -1);
  }
  function incrementNumInput(e, delta, inputElem) {
    const target = e && getEventTarget(e);
    const input = inputElem || target && target.parentNode && target.parentNode.firstChild;
    const event = createEvent("increment");
    event.delta = delta;
    input && input.dispatchEvent(event);
  }
  function build() {
    const fragment = window.document.createDocumentFragment();
    self.calendarContainer = createElement("div", "flatpickr-calendar");
    self.calendarContainer.tabIndex = -1;
    if (!self.config.noCalendar) {
      fragment.appendChild(buildMonthNav());
      self.innerContainer = createElement("div", "flatpickr-innerContainer");
      if (self.config.weekNumbers) {
        const {weekWrapper, weekNumbers} = buildWeeks();
        self.innerContainer.appendChild(weekWrapper);
        self.weekNumbers = weekNumbers;
        self.weekWrapper = weekWrapper;
      }
      self.rContainer = createElement("div", "flatpickr-rContainer");
      self.rContainer.appendChild(buildWeekdays());
      if (!self.daysContainer) {
        self.daysContainer = createElement("div", "flatpickr-days");
        self.daysContainer.tabIndex = -1;
      }
      buildDays();
      self.rContainer.appendChild(self.daysContainer);
      self.innerContainer.appendChild(self.rContainer);
      fragment.appendChild(self.innerContainer);
    }
    if (self.config.enableTime) {
      fragment.appendChild(buildTime());
    }
    toggleClass(self.calendarContainer, "rangeMode", self.config.mode === "range");
    toggleClass(self.calendarContainer, "animate", self.config.animate === true);
    toggleClass(self.calendarContainer, "multiMonth", self.config.showMonths > 1);
    self.calendarContainer.appendChild(fragment);
    const customAppend = self.config.appendTo !== void 0 && self.config.appendTo.nodeType !== void 0;
    if (self.config.inline || self.config.static) {
      self.calendarContainer.classList.add(self.config.inline ? "inline" : "static");
      if (self.config.inline) {
        if (!customAppend && self.element.parentNode)
          self.element.parentNode.insertBefore(self.calendarContainer, self._input.nextSibling);
        else if (self.config.appendTo !== void 0)
          self.config.appendTo.appendChild(self.calendarContainer);
      }
      if (self.config.static) {
        const wrapper = createElement("div", "flatpickr-wrapper");
        if (self.element.parentNode)
          self.element.parentNode.insertBefore(wrapper, self.element);
        wrapper.appendChild(self.element);
        if (self.altInput)
          wrapper.appendChild(self.altInput);
        wrapper.appendChild(self.calendarContainer);
      }
    }
    if (!self.config.static && !self.config.inline)
      (self.config.appendTo !== void 0 ? self.config.appendTo : window.document.body).appendChild(self.calendarContainer);
  }
  function createDay(className, date, dayNumber, i) {
    const dateIsEnabled = isEnabled(date, true), dayElement = createElement("span", "flatpickr-day " + className, date.getDate().toString());
    dayElement.dateObj = date;
    dayElement.$i = i;
    dayElement.setAttribute("aria-label", self.formatDate(date, self.config.ariaDateFormat));
    if (className.indexOf("hidden") === -1 && compareDates(date, self.now) === 0) {
      self.todayDateElem = dayElement;
      dayElement.classList.add("today");
      dayElement.setAttribute("aria-current", "date");
    }
    if (dateIsEnabled) {
      dayElement.tabIndex = -1;
      if (isDateSelected(date)) {
        dayElement.classList.add("selected");
        self.selectedDateElem = dayElement;
        if (self.config.mode === "range") {
          toggleClass(dayElement, "startRange", self.selectedDates[0] && compareDates(date, self.selectedDates[0], true) === 0);
          toggleClass(dayElement, "endRange", self.selectedDates[1] && compareDates(date, self.selectedDates[1], true) === 0);
          if (className === "nextMonthDay")
            dayElement.classList.add("inRange");
        }
      }
    } else {
      dayElement.classList.add("flatpickr-disabled");
    }
    if (self.config.mode === "range") {
      if (isDateInRange(date) && !isDateSelected(date))
        dayElement.classList.add("inRange");
    }
    if (self.weekNumbers && self.config.showMonths === 1 && className !== "prevMonthDay" && dayNumber % 7 === 1) {
      self.weekNumbers.insertAdjacentHTML("beforeend", "<span class='flatpickr-day'>" + self.config.getWeek(date) + "</span>");
    }
    triggerEvent("onDayCreate", dayElement);
    return dayElement;
  }
  function focusOnDayElem(targetNode) {
    targetNode.focus();
    if (self.config.mode === "range")
      onMouseOver(targetNode);
  }
  function getFirstAvailableDay(delta) {
    const startMonth = delta > 0 ? 0 : self.config.showMonths - 1;
    const endMonth = delta > 0 ? self.config.showMonths : -1;
    for (let m = startMonth; m != endMonth; m += delta) {
      const month = self.daysContainer.children[m];
      const startIndex = delta > 0 ? 0 : month.children.length - 1;
      const endIndex = delta > 0 ? month.children.length : -1;
      for (let i = startIndex; i != endIndex; i += delta) {
        const c = month.children[i];
        if (c.className.indexOf("hidden") === -1 && isEnabled(c.dateObj))
          return c;
      }
    }
    return void 0;
  }
  function getNextAvailableDay(current, delta) {
    const givenMonth = current.className.indexOf("Month") === -1 ? current.dateObj.getMonth() : self.currentMonth;
    const endMonth = delta > 0 ? self.config.showMonths : -1;
    const loopDelta = delta > 0 ? 1 : -1;
    for (let m = givenMonth - self.currentMonth; m != endMonth; m += loopDelta) {
      const month = self.daysContainer.children[m];
      const startIndex = givenMonth - self.currentMonth === m ? current.$i + delta : delta < 0 ? month.children.length - 1 : 0;
      const numMonthDays = month.children.length;
      for (let i = startIndex; i >= 0 && i < numMonthDays && i != (delta > 0 ? numMonthDays : -1); i += loopDelta) {
        const c = month.children[i];
        if (c.className.indexOf("hidden") === -1 && isEnabled(c.dateObj) && Math.abs(current.$i - i) >= Math.abs(delta))
          return focusOnDayElem(c);
      }
    }
    self.changeMonth(loopDelta);
    focusOnDay(getFirstAvailableDay(loopDelta), 0);
    return void 0;
  }
  function focusOnDay(current, offset) {
    const dayFocused = isInView(document.activeElement || document.body);
    const startElem = current !== void 0 ? current : dayFocused ? document.activeElement : self.selectedDateElem !== void 0 && isInView(self.selectedDateElem) ? self.selectedDateElem : self.todayDateElem !== void 0 && isInView(self.todayDateElem) ? self.todayDateElem : getFirstAvailableDay(offset > 0 ? 1 : -1);
    if (startElem === void 0) {
      self._input.focus();
    } else if (!dayFocused) {
      focusOnDayElem(startElem);
    } else {
      getNextAvailableDay(startElem, offset);
    }
  }
  function buildMonthDays(year, month) {
    const firstOfMonth = (new Date(year, month, 1).getDay() - self.l10n.firstDayOfWeek + 7) % 7;
    const prevMonthDays = self.utils.getDaysInMonth((month - 1 + 12) % 12, year);
    const daysInMonth = self.utils.getDaysInMonth(month, year), days = window.document.createDocumentFragment(), isMultiMonth = self.config.showMonths > 1, prevMonthDayClass = isMultiMonth ? "prevMonthDay hidden" : "prevMonthDay", nextMonthDayClass = isMultiMonth ? "nextMonthDay hidden" : "nextMonthDay";
    let dayNumber = prevMonthDays + 1 - firstOfMonth, dayIndex = 0;
    for (; dayNumber <= prevMonthDays; dayNumber++, dayIndex++) {
      days.appendChild(createDay(prevMonthDayClass, new Date(year, month - 1, dayNumber), dayNumber, dayIndex));
    }
    for (dayNumber = 1; dayNumber <= daysInMonth; dayNumber++, dayIndex++) {
      days.appendChild(createDay("", new Date(year, month, dayNumber), dayNumber, dayIndex));
    }
    for (let dayNum = daysInMonth + 1; dayNum <= 42 - firstOfMonth && (self.config.showMonths === 1 || dayIndex % 7 !== 0); dayNum++, dayIndex++) {
      days.appendChild(createDay(nextMonthDayClass, new Date(year, month + 1, dayNum % daysInMonth), dayNum, dayIndex));
    }
    const dayContainer = createElement("div", "dayContainer");
    dayContainer.appendChild(days);
    return dayContainer;
  }
  function buildDays() {
    if (self.daysContainer === void 0) {
      return;
    }
    clearNode(self.daysContainer);
    if (self.weekNumbers)
      clearNode(self.weekNumbers);
    const frag = document.createDocumentFragment();
    for (let i = 0; i < self.config.showMonths; i++) {
      const d = new Date(self.currentYear, self.currentMonth, 1);
      d.setMonth(self.currentMonth + i);
      frag.appendChild(buildMonthDays(d.getFullYear(), d.getMonth()));
    }
    self.daysContainer.appendChild(frag);
    self.days = self.daysContainer.firstChild;
    if (self.config.mode === "range" && self.selectedDates.length === 1) {
      onMouseOver();
    }
  }
  function buildMonthSwitch() {
    if (self.config.showMonths > 1 || self.config.monthSelectorType !== "dropdown")
      return;
    const shouldBuildMonth = function(month) {
      if (self.config.minDate !== void 0 && self.currentYear === self.config.minDate.getFullYear() && month < self.config.minDate.getMonth()) {
        return false;
      }
      return !(self.config.maxDate !== void 0 && self.currentYear === self.config.maxDate.getFullYear() && month > self.config.maxDate.getMonth());
    };
    self.monthsDropdownContainer.tabIndex = -1;
    self.monthsDropdownContainer.innerHTML = "";
    for (let i = 0; i < 12; i++) {
      if (!shouldBuildMonth(i))
        continue;
      const month = createElement("option", "flatpickr-monthDropdown-month");
      month.value = new Date(self.currentYear, i).getMonth().toString();
      month.textContent = monthToStr(i, self.config.shorthandCurrentMonth, self.l10n);
      month.tabIndex = -1;
      if (self.currentMonth === i) {
        month.selected = true;
      }
      self.monthsDropdownContainer.appendChild(month);
    }
  }
  function buildMonth() {
    const container = createElement("div", "flatpickr-month");
    const monthNavFragment = window.document.createDocumentFragment();
    let monthElement;
    if (self.config.showMonths > 1 || self.config.monthSelectorType === "static") {
      monthElement = createElement("span", "cur-month");
    } else {
      self.monthsDropdownContainer = createElement("select", "flatpickr-monthDropdown-months");
      self.monthsDropdownContainer.setAttribute("aria-label", self.l10n.monthAriaLabel);
      bind(self.monthsDropdownContainer, "change", (e) => {
        const target = getEventTarget(e);
        const selectedMonth = parseInt(target.value, 10);
        self.changeMonth(selectedMonth - self.currentMonth);
        triggerEvent("onMonthChange");
      });
      buildMonthSwitch();
      monthElement = self.monthsDropdownContainer;
    }
    const yearInput = createNumberInput("cur-year", {tabindex: "-1"});
    const yearElement = yearInput.getElementsByTagName("input")[0];
    yearElement.setAttribute("aria-label", self.l10n.yearAriaLabel);
    if (self.config.minDate) {
      yearElement.setAttribute("min", self.config.minDate.getFullYear().toString());
    }
    if (self.config.maxDate) {
      yearElement.setAttribute("max", self.config.maxDate.getFullYear().toString());
      yearElement.disabled = !!self.config.minDate && self.config.minDate.getFullYear() === self.config.maxDate.getFullYear();
    }
    const currentMonth = createElement("div", "flatpickr-current-month");
    currentMonth.appendChild(monthElement);
    currentMonth.appendChild(yearInput);
    monthNavFragment.appendChild(currentMonth);
    container.appendChild(monthNavFragment);
    return {
      container,
      yearElement,
      monthElement
    };
  }
  function buildMonths() {
    clearNode(self.monthNav);
    self.monthNav.appendChild(self.prevMonthNav);
    if (self.config.showMonths) {
      self.yearElements = [];
      self.monthElements = [];
    }
    for (let m = self.config.showMonths; m--; ) {
      const month = buildMonth();
      self.yearElements.push(month.yearElement);
      self.monthElements.push(month.monthElement);
      self.monthNav.appendChild(month.container);
    }
    self.monthNav.appendChild(self.nextMonthNav);
  }
  function buildMonthNav() {
    self.monthNav = createElement("div", "flatpickr-months");
    self.yearElements = [];
    self.monthElements = [];
    self.prevMonthNav = createElement("span", "flatpickr-prev-month");
    self.prevMonthNav.innerHTML = self.config.prevArrow;
    self.nextMonthNav = createElement("span", "flatpickr-next-month");
    self.nextMonthNav.innerHTML = self.config.nextArrow;
    buildMonths();
    Object.defineProperty(self, "_hidePrevMonthArrow", {
      get: () => self.__hidePrevMonthArrow,
      set(bool) {
        if (self.__hidePrevMonthArrow !== bool) {
          toggleClass(self.prevMonthNav, "flatpickr-disabled", bool);
          self.__hidePrevMonthArrow = bool;
        }
      }
    });
    Object.defineProperty(self, "_hideNextMonthArrow", {
      get: () => self.__hideNextMonthArrow,
      set(bool) {
        if (self.__hideNextMonthArrow !== bool) {
          toggleClass(self.nextMonthNav, "flatpickr-disabled", bool);
          self.__hideNextMonthArrow = bool;
        }
      }
    });
    self.currentYearElement = self.yearElements[0];
    updateNavigationCurrentMonth();
    return self.monthNav;
  }
  function buildTime() {
    self.calendarContainer.classList.add("hasTime");
    if (self.config.noCalendar)
      self.calendarContainer.classList.add("noCalendar");
    const defaults2 = getDefaultHours(self.config);
    self.timeContainer = createElement("div", "flatpickr-time");
    self.timeContainer.tabIndex = -1;
    const separator = createElement("span", "flatpickr-time-separator", ":");
    const hourInput = createNumberInput("flatpickr-hour", {
      "aria-label": self.l10n.hourAriaLabel
    });
    self.hourElement = hourInput.getElementsByTagName("input")[0];
    const minuteInput = createNumberInput("flatpickr-minute", {
      "aria-label": self.l10n.minuteAriaLabel
    });
    self.minuteElement = minuteInput.getElementsByTagName("input")[0];
    self.hourElement.tabIndex = self.minuteElement.tabIndex = -1;
    self.hourElement.value = pad(self.latestSelectedDateObj ? self.latestSelectedDateObj.getHours() : self.config.time_24hr ? defaults2.hours : military2ampm(defaults2.hours));
    self.minuteElement.value = pad(self.latestSelectedDateObj ? self.latestSelectedDateObj.getMinutes() : defaults2.minutes);
    self.hourElement.setAttribute("step", self.config.hourIncrement.toString());
    self.minuteElement.setAttribute("step", self.config.minuteIncrement.toString());
    self.hourElement.setAttribute("min", self.config.time_24hr ? "0" : "1");
    self.hourElement.setAttribute("max", self.config.time_24hr ? "23" : "12");
    self.hourElement.setAttribute("maxlength", "2");
    self.minuteElement.setAttribute("min", "0");
    self.minuteElement.setAttribute("max", "59");
    self.minuteElement.setAttribute("maxlength", "2");
    self.timeContainer.appendChild(hourInput);
    self.timeContainer.appendChild(separator);
    self.timeContainer.appendChild(minuteInput);
    if (self.config.time_24hr)
      self.timeContainer.classList.add("time24hr");
    if (self.config.enableSeconds) {
      self.timeContainer.classList.add("hasSeconds");
      const secondInput = createNumberInput("flatpickr-second");
      self.secondElement = secondInput.getElementsByTagName("input")[0];
      self.secondElement.value = pad(self.latestSelectedDateObj ? self.latestSelectedDateObj.getSeconds() : defaults2.seconds);
      self.secondElement.setAttribute("step", self.minuteElement.getAttribute("step"));
      self.secondElement.setAttribute("min", "0");
      self.secondElement.setAttribute("max", "59");
      self.secondElement.setAttribute("maxlength", "2");
      self.timeContainer.appendChild(createElement("span", "flatpickr-time-separator", ":"));
      self.timeContainer.appendChild(secondInput);
    }
    if (!self.config.time_24hr) {
      self.amPM = createElement("span", "flatpickr-am-pm", self.l10n.amPM[int((self.latestSelectedDateObj ? self.hourElement.value : self.config.defaultHour) > 11)]);
      self.amPM.title = self.l10n.toggleTitle;
      self.amPM.tabIndex = -1;
      self.timeContainer.appendChild(self.amPM);
    }
    return self.timeContainer;
  }
  function buildWeekdays() {
    if (!self.weekdayContainer)
      self.weekdayContainer = createElement("div", "flatpickr-weekdays");
    else
      clearNode(self.weekdayContainer);
    for (let i = self.config.showMonths; i--; ) {
      const container = createElement("div", "flatpickr-weekdaycontainer");
      self.weekdayContainer.appendChild(container);
    }
    updateWeekdays();
    return self.weekdayContainer;
  }
  function updateWeekdays() {
    if (!self.weekdayContainer) {
      return;
    }
    const firstDayOfWeek = self.l10n.firstDayOfWeek;
    let weekdays = [...self.l10n.weekdays.shorthand];
    if (firstDayOfWeek > 0 && firstDayOfWeek < weekdays.length) {
      weekdays = [
        ...weekdays.splice(firstDayOfWeek, weekdays.length),
        ...weekdays.splice(0, firstDayOfWeek)
      ];
    }
    for (let i = self.config.showMonths; i--; ) {
      self.weekdayContainer.children[i].innerHTML = `
      <span class='flatpickr-weekday'>
        ${weekdays.join("</span><span class='flatpickr-weekday'>")}
      </span>
      `;
    }
  }
  function buildWeeks() {
    self.calendarContainer.classList.add("hasWeeks");
    const weekWrapper = createElement("div", "flatpickr-weekwrapper");
    weekWrapper.appendChild(createElement("span", "flatpickr-weekday", self.l10n.weekAbbreviation));
    const weekNumbers = createElement("div", "flatpickr-weeks");
    weekWrapper.appendChild(weekNumbers);
    return {
      weekWrapper,
      weekNumbers
    };
  }
  function changeMonth(value, isOffset = true) {
    const delta = isOffset ? value : value - self.currentMonth;
    if (delta < 0 && self._hidePrevMonthArrow === true || delta > 0 && self._hideNextMonthArrow === true)
      return;
    self.currentMonth += delta;
    if (self.currentMonth < 0 || self.currentMonth > 11) {
      self.currentYear += self.currentMonth > 11 ? 1 : -1;
      self.currentMonth = (self.currentMonth + 12) % 12;
      triggerEvent("onYearChange");
      buildMonthSwitch();
    }
    buildDays();
    triggerEvent("onMonthChange");
    updateNavigationCurrentMonth();
  }
  function clear(triggerChangeEvent = true, toInitial = true) {
    self.input.value = "";
    if (self.altInput !== void 0)
      self.altInput.value = "";
    if (self.mobileInput !== void 0)
      self.mobileInput.value = "";
    self.selectedDates = [];
    self.latestSelectedDateObj = void 0;
    if (toInitial === true) {
      self.currentYear = self._initialDate.getFullYear();
      self.currentMonth = self._initialDate.getMonth();
    }
    if (self.config.enableTime === true) {
      const {hours, minutes, seconds} = getDefaultHours(self.config);
      setHours(hours, minutes, seconds);
    }
    self.redraw();
    if (triggerChangeEvent)
      triggerEvent("onChange");
  }
  function close() {
    self.isOpen = false;
    if (!self.isMobile) {
      if (self.calendarContainer !== void 0) {
        self.calendarContainer.classList.remove("open");
      }
      if (self._input !== void 0) {
        self._input.classList.remove("active");
      }
    }
    triggerEvent("onClose");
  }
  function destroy() {
    if (self.config !== void 0)
      triggerEvent("onDestroy");
    for (let i = self._handlers.length; i--; ) {
      self._handlers[i].remove();
    }
    self._handlers = [];
    if (self.mobileInput) {
      if (self.mobileInput.parentNode)
        self.mobileInput.parentNode.removeChild(self.mobileInput);
      self.mobileInput = void 0;
    } else if (self.calendarContainer && self.calendarContainer.parentNode) {
      if (self.config.static && self.calendarContainer.parentNode) {
        const wrapper = self.calendarContainer.parentNode;
        wrapper.lastChild && wrapper.removeChild(wrapper.lastChild);
        if (wrapper.parentNode) {
          while (wrapper.firstChild)
            wrapper.parentNode.insertBefore(wrapper.firstChild, wrapper);
          wrapper.parentNode.removeChild(wrapper);
        }
      } else
        self.calendarContainer.parentNode.removeChild(self.calendarContainer);
    }
    if (self.altInput) {
      self.input.type = "text";
      if (self.altInput.parentNode)
        self.altInput.parentNode.removeChild(self.altInput);
      delete self.altInput;
    }
    if (self.input) {
      self.input.type = self.input._type;
      self.input.classList.remove("flatpickr-input");
      self.input.removeAttribute("readonly");
    }
    [
      "_showTimeInput",
      "latestSelectedDateObj",
      "_hideNextMonthArrow",
      "_hidePrevMonthArrow",
      "__hideNextMonthArrow",
      "__hidePrevMonthArrow",
      "isMobile",
      "isOpen",
      "selectedDateElem",
      "minDateHasTime",
      "maxDateHasTime",
      "days",
      "daysContainer",
      "_input",
      "_positionElement",
      "innerContainer",
      "rContainer",
      "monthNav",
      "todayDateElem",
      "calendarContainer",
      "weekdayContainer",
      "prevMonthNav",
      "nextMonthNav",
      "monthsDropdownContainer",
      "currentMonthElement",
      "currentYearElement",
      "navigationCurrentMonth",
      "selectedDateElem",
      "config"
    ].forEach((k) => {
      try {
        delete self[k];
      } catch (_) {
      }
    });
  }
  function isCalendarElem(elem) {
    if (self.config.appendTo && self.config.appendTo.contains(elem))
      return true;
    return self.calendarContainer.contains(elem);
  }
  function documentClick(e) {
    if (self.isOpen && !self.config.inline) {
      const eventTarget = getEventTarget(e);
      const isCalendarElement = isCalendarElem(eventTarget);
      const isInput = eventTarget === self.input || eventTarget === self.altInput || self.element.contains(eventTarget) || e.path && e.path.indexOf && (~e.path.indexOf(self.input) || ~e.path.indexOf(self.altInput));
      const lostFocus = e.type === "blur" ? isInput && e.relatedTarget && !isCalendarElem(e.relatedTarget) : !isInput && !isCalendarElement && !isCalendarElem(e.relatedTarget);
      const isIgnored = !self.config.ignoredFocusElements.some((elem) => elem.contains(eventTarget));
      if (lostFocus && isIgnored) {
        if (self.timeContainer !== void 0 && self.minuteElement !== void 0 && self.hourElement !== void 0 && self.input.value !== "" && self.input.value !== void 0) {
          updateTime();
        }
        self.close();
        if (self.config && self.config.mode === "range" && self.selectedDates.length === 1) {
          self.clear(false);
          self.redraw();
        }
      }
    }
  }
  function changeYear(newYear) {
    if (!newYear || self.config.minDate && newYear < self.config.minDate.getFullYear() || self.config.maxDate && newYear > self.config.maxDate.getFullYear())
      return;
    const newYearNum = newYear, isNewYear = self.currentYear !== newYearNum;
    self.currentYear = newYearNum || self.currentYear;
    if (self.config.maxDate && self.currentYear === self.config.maxDate.getFullYear()) {
      self.currentMonth = Math.min(self.config.maxDate.getMonth(), self.currentMonth);
    } else if (self.config.minDate && self.currentYear === self.config.minDate.getFullYear()) {
      self.currentMonth = Math.max(self.config.minDate.getMonth(), self.currentMonth);
    }
    if (isNewYear) {
      self.redraw();
      triggerEvent("onYearChange");
      buildMonthSwitch();
    }
  }
  function isEnabled(date, timeless = true) {
    var _a;
    const dateToCheck = self.parseDate(date, void 0, timeless);
    if (self.config.minDate && dateToCheck && compareDates(dateToCheck, self.config.minDate, timeless !== void 0 ? timeless : !self.minDateHasTime) < 0 || self.config.maxDate && dateToCheck && compareDates(dateToCheck, self.config.maxDate, timeless !== void 0 ? timeless : !self.maxDateHasTime) > 0)
      return false;
    if (!self.config.enable && self.config.disable.length === 0)
      return true;
    if (dateToCheck === void 0)
      return false;
    const bool = !!self.config.enable, array = (_a = self.config.enable) !== null && _a !== void 0 ? _a : self.config.disable;
    for (let i = 0, d; i < array.length; i++) {
      d = array[i];
      if (typeof d === "function" && d(dateToCheck))
        return bool;
      else if (d instanceof Date && dateToCheck !== void 0 && d.getTime() === dateToCheck.getTime())
        return bool;
      else if (typeof d === "string") {
        const parsed = self.parseDate(d, void 0, true);
        return parsed && parsed.getTime() === dateToCheck.getTime() ? bool : !bool;
      } else if (typeof d === "object" && dateToCheck !== void 0 && d.from && d.to && dateToCheck.getTime() >= d.from.getTime() && dateToCheck.getTime() <= d.to.getTime())
        return bool;
    }
    return !bool;
  }
  function isInView(elem) {
    if (self.daysContainer !== void 0)
      return elem.className.indexOf("hidden") === -1 && elem.className.indexOf("flatpickr-disabled") === -1 && self.daysContainer.contains(elem);
    return false;
  }
  function onBlur(e) {
    const isInput = e.target === self._input;
    if (isInput && (self.selectedDates.length > 0 || self._input.value.length > 0) && !(e.relatedTarget && isCalendarElem(e.relatedTarget))) {
      self.setDate(self._input.value, true, e.target === self.altInput ? self.config.altFormat : self.config.dateFormat);
    }
  }
  function onKeyDown(e) {
    const eventTarget = getEventTarget(e);
    const isInput = self.config.wrap ? element.contains(eventTarget) : eventTarget === self._input;
    const allowInput = self.config.allowInput;
    const allowKeydown = self.isOpen && (!allowInput || !isInput);
    const allowInlineKeydown = self.config.inline && isInput && !allowInput;
    if (e.keyCode === 13 && isInput) {
      if (allowInput) {
        self.setDate(self._input.value, true, eventTarget === self.altInput ? self.config.altFormat : self.config.dateFormat);
        return eventTarget.blur();
      } else {
        self.open();
      }
    } else if (isCalendarElem(eventTarget) || allowKeydown || allowInlineKeydown) {
      const isTimeObj = !!self.timeContainer && self.timeContainer.contains(eventTarget);
      switch (e.keyCode) {
        case 13:
          if (isTimeObj) {
            e.preventDefault();
            updateTime();
            focusAndClose();
          } else
            selectDate(e);
          break;
        case 27:
          e.preventDefault();
          focusAndClose();
          break;
        case 8:
        case 46:
          if (isInput && !self.config.allowInput) {
            e.preventDefault();
            self.clear();
          }
          break;
        case 37:
        case 39:
          if (!isTimeObj && !isInput) {
            e.preventDefault();
            if (self.daysContainer !== void 0 && (allowInput === false || document.activeElement && isInView(document.activeElement))) {
              const delta2 = e.keyCode === 39 ? 1 : -1;
              if (!e.ctrlKey)
                focusOnDay(void 0, delta2);
              else {
                e.stopPropagation();
                changeMonth(delta2);
                focusOnDay(getFirstAvailableDay(1), 0);
              }
            }
          } else if (self.hourElement)
            self.hourElement.focus();
          break;
        case 38:
        case 40:
          e.preventDefault();
          const delta = e.keyCode === 40 ? 1 : -1;
          if (self.daysContainer && eventTarget.$i !== void 0 || eventTarget === self.input || eventTarget === self.altInput) {
            if (e.ctrlKey) {
              e.stopPropagation();
              changeYear(self.currentYear - delta);
              focusOnDay(getFirstAvailableDay(1), 0);
            } else if (!isTimeObj)
              focusOnDay(void 0, delta * 7);
          } else if (eventTarget === self.currentYearElement) {
            changeYear(self.currentYear - delta);
          } else if (self.config.enableTime) {
            if (!isTimeObj && self.hourElement)
              self.hourElement.focus();
            updateTime(e);
            self._debouncedChange();
          }
          break;
        case 9:
          if (isTimeObj) {
            const elems = [
              self.hourElement,
              self.minuteElement,
              self.secondElement,
              self.amPM
            ].concat(self.pluginElements).filter((x) => x);
            const i = elems.indexOf(eventTarget);
            if (i !== -1) {
              const target = elems[i + (e.shiftKey ? -1 : 1)];
              e.preventDefault();
              (target || self._input).focus();
            }
          } else if (!self.config.noCalendar && self.daysContainer && self.daysContainer.contains(eventTarget) && e.shiftKey) {
            e.preventDefault();
            self._input.focus();
          }
          break;
      }
    }
    if (self.amPM !== void 0 && eventTarget === self.amPM) {
      switch (e.key) {
        case self.l10n.amPM[0].charAt(0):
        case self.l10n.amPM[0].charAt(0).toLowerCase():
          self.amPM.textContent = self.l10n.amPM[0];
          setHoursFromInputs();
          updateValue();
          break;
        case self.l10n.amPM[1].charAt(0):
        case self.l10n.amPM[1].charAt(0).toLowerCase():
          self.amPM.textContent = self.l10n.amPM[1];
          setHoursFromInputs();
          updateValue();
          break;
      }
    }
    if (isInput || isCalendarElem(eventTarget)) {
      triggerEvent("onKeyDown", e);
    }
  }
  function onMouseOver(elem) {
    if (self.selectedDates.length !== 1 || elem && (!elem.classList.contains("flatpickr-day") || elem.classList.contains("flatpickr-disabled")))
      return;
    const hoverDate = elem ? elem.dateObj.getTime() : self.days.firstElementChild.dateObj.getTime(), initialDate = self.parseDate(self.selectedDates[0], void 0, true).getTime(), rangeStartDate = Math.min(hoverDate, self.selectedDates[0].getTime()), rangeEndDate = Math.max(hoverDate, self.selectedDates[0].getTime());
    let containsDisabled = false;
    let minRange = 0, maxRange = 0;
    for (let t = rangeStartDate; t < rangeEndDate; t += duration.DAY) {
      if (!isEnabled(new Date(t), true)) {
        containsDisabled = containsDisabled || t > rangeStartDate && t < rangeEndDate;
        if (t < initialDate && (!minRange || t > minRange))
          minRange = t;
        else if (t > initialDate && (!maxRange || t < maxRange))
          maxRange = t;
      }
    }
    for (let m = 0; m < self.config.showMonths; m++) {
      const month = self.daysContainer.children[m];
      for (let i = 0, l = month.children.length; i < l; i++) {
        const dayElem = month.children[i], date = dayElem.dateObj;
        const timestamp = date.getTime();
        const outOfRange = minRange > 0 && timestamp < minRange || maxRange > 0 && timestamp > maxRange;
        if (outOfRange) {
          dayElem.classList.add("notAllowed");
          ["inRange", "startRange", "endRange"].forEach((c) => {
            dayElem.classList.remove(c);
          });
          continue;
        } else if (containsDisabled && !outOfRange)
          continue;
        ["startRange", "inRange", "endRange", "notAllowed"].forEach((c) => {
          dayElem.classList.remove(c);
        });
        if (elem !== void 0) {
          elem.classList.add(hoverDate <= self.selectedDates[0].getTime() ? "startRange" : "endRange");
          if (initialDate < hoverDate && timestamp === initialDate)
            dayElem.classList.add("startRange");
          else if (initialDate > hoverDate && timestamp === initialDate)
            dayElem.classList.add("endRange");
          if (timestamp >= minRange && (maxRange === 0 || timestamp <= maxRange) && isBetween(timestamp, initialDate, hoverDate))
            dayElem.classList.add("inRange");
        }
      }
    }
  }
  function onResize() {
    if (self.isOpen && !self.config.static && !self.config.inline)
      positionCalendar();
  }
  function open(e, positionElement = self._positionElement) {
    if (self.isMobile === true) {
      if (e) {
        e.preventDefault();
        const eventTarget = getEventTarget(e);
        if (eventTarget) {
          eventTarget.blur();
        }
      }
      if (self.mobileInput !== void 0) {
        self.mobileInput.focus();
        self.mobileInput.click();
      }
      triggerEvent("onOpen");
      return;
    } else if (self._input.disabled || self.config.inline) {
      return;
    }
    const wasOpen = self.isOpen;
    self.isOpen = true;
    if (!wasOpen) {
      self.calendarContainer.classList.add("open");
      self._input.classList.add("active");
      triggerEvent("onOpen");
      positionCalendar(positionElement);
    }
    if (self.config.enableTime === true && self.config.noCalendar === true) {
      if (self.config.allowInput === false && (e === void 0 || !self.timeContainer.contains(e.relatedTarget))) {
        setTimeout(() => self.hourElement.select(), 50);
      }
    }
  }
  function minMaxDateSetter(type) {
    return (date) => {
      const dateObj = self.config[`_${type}Date`] = self.parseDate(date, self.config.dateFormat);
      const inverseDateObj = self.config[`_${type === "min" ? "max" : "min"}Date`];
      if (dateObj !== void 0) {
        self[type === "min" ? "minDateHasTime" : "maxDateHasTime"] = dateObj.getHours() > 0 || dateObj.getMinutes() > 0 || dateObj.getSeconds() > 0;
      }
      if (self.selectedDates) {
        self.selectedDates = self.selectedDates.filter((d) => isEnabled(d));
        if (!self.selectedDates.length && type === "min")
          setHoursFromDate(dateObj);
        updateValue();
      }
      if (self.daysContainer) {
        redraw();
        if (dateObj !== void 0)
          self.currentYearElement[type] = dateObj.getFullYear().toString();
        else
          self.currentYearElement.removeAttribute(type);
        self.currentYearElement.disabled = !!inverseDateObj && dateObj !== void 0 && inverseDateObj.getFullYear() === dateObj.getFullYear();
      }
    };
  }
  function parseConfig() {
    const boolOpts = [
      "wrap",
      "weekNumbers",
      "allowInput",
      "allowInvalidPreload",
      "clickOpens",
      "time_24hr",
      "enableTime",
      "noCalendar",
      "altInput",
      "shorthandCurrentMonth",
      "inline",
      "static",
      "enableSeconds",
      "disableMobile"
    ];
    const userConfig = Object.assign(Object.assign({}, JSON.parse(JSON.stringify(element.dataset || {}))), instanceConfig);
    const formats2 = {};
    self.config.parseDate = userConfig.parseDate;
    self.config.formatDate = userConfig.formatDate;
    Object.defineProperty(self.config, "enable", {
      get: () => self.config._enable,
      set: (dates) => {
        self.config._enable = parseDateRules(dates);
      }
    });
    Object.defineProperty(self.config, "disable", {
      get: () => self.config._disable,
      set: (dates) => {
        self.config._disable = parseDateRules(dates);
      }
    });
    const timeMode = userConfig.mode === "time";
    if (!userConfig.dateFormat && (userConfig.enableTime || timeMode)) {
      const defaultDateFormat = flatpickr.defaultConfig.dateFormat || defaults.dateFormat;
      formats2.dateFormat = userConfig.noCalendar || timeMode ? "H:i" + (userConfig.enableSeconds ? ":S" : "") : defaultDateFormat + " H:i" + (userConfig.enableSeconds ? ":S" : "");
    }
    if (userConfig.altInput && (userConfig.enableTime || timeMode) && !userConfig.altFormat) {
      const defaultAltFormat = flatpickr.defaultConfig.altFormat || defaults.altFormat;
      formats2.altFormat = userConfig.noCalendar || timeMode ? "h:i" + (userConfig.enableSeconds ? ":S K" : " K") : defaultAltFormat + ` h:i${userConfig.enableSeconds ? ":S" : ""} K`;
    }
    Object.defineProperty(self.config, "minDate", {
      get: () => self.config._minDate,
      set: minMaxDateSetter("min")
    });
    Object.defineProperty(self.config, "maxDate", {
      get: () => self.config._maxDate,
      set: minMaxDateSetter("max")
    });
    const minMaxTimeSetter = (type) => (val) => {
      self.config[type === "min" ? "_minTime" : "_maxTime"] = self.parseDate(val, "H:i:S");
    };
    Object.defineProperty(self.config, "minTime", {
      get: () => self.config._minTime,
      set: minMaxTimeSetter("min")
    });
    Object.defineProperty(self.config, "maxTime", {
      get: () => self.config._maxTime,
      set: minMaxTimeSetter("max")
    });
    if (userConfig.mode === "time") {
      self.config.noCalendar = true;
      self.config.enableTime = true;
    }
    Object.assign(self.config, formats2, userConfig);
    for (let i = 0; i < boolOpts.length; i++)
      self.config[boolOpts[i]] = self.config[boolOpts[i]] === true || self.config[boolOpts[i]] === "true";
    HOOKS.filter((hook) => self.config[hook] !== void 0).forEach((hook) => {
      self.config[hook] = arrayify(self.config[hook] || []).map(bindToInstance);
    });
    self.isMobile = !self.config.disableMobile && !self.config.inline && self.config.mode === "single" && !self.config.disable.length && !self.config.enable && !self.config.weekNumbers && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    for (let i = 0; i < self.config.plugins.length; i++) {
      const pluginConf = self.config.plugins[i](self) || {};
      for (const key in pluginConf) {
        if (HOOKS.indexOf(key) > -1) {
          self.config[key] = arrayify(pluginConf[key]).map(bindToInstance).concat(self.config[key]);
        } else if (typeof userConfig[key] === "undefined")
          self.config[key] = pluginConf[key];
      }
    }
    if (!userConfig.altInputClass) {
      self.config.altInputClass = getInputElem().className + " " + self.config.altInputClass;
    }
    triggerEvent("onParseConfig");
  }
  function getInputElem() {
    return self.config.wrap ? element.querySelector("[data-input]") : element;
  }
  function setupLocale() {
    if (typeof self.config.locale !== "object" && typeof flatpickr.l10ns[self.config.locale] === "undefined")
      self.config.errorHandler(new Error(`flatpickr: invalid locale ${self.config.locale}`));
    self.l10n = Object.assign(Object.assign({}, flatpickr.l10ns.default), typeof self.config.locale === "object" ? self.config.locale : self.config.locale !== "default" ? flatpickr.l10ns[self.config.locale] : void 0);
    tokenRegex.K = `(${self.l10n.amPM[0]}|${self.l10n.amPM[1]}|${self.l10n.amPM[0].toLowerCase()}|${self.l10n.amPM[1].toLowerCase()})`;
    const userConfig = Object.assign(Object.assign({}, instanceConfig), JSON.parse(JSON.stringify(element.dataset || {})));
    if (userConfig.time_24hr === void 0 && flatpickr.defaultConfig.time_24hr === void 0) {
      self.config.time_24hr = self.l10n.time_24hr;
    }
    self.formatDate = createDateFormatter(self);
    self.parseDate = createDateParser({config: self.config, l10n: self.l10n});
  }
  function positionCalendar(customPositionElement) {
    if (typeof self.config.position === "function") {
      return void self.config.position(self, customPositionElement);
    }
    if (self.calendarContainer === void 0)
      return;
    triggerEvent("onPreCalendarPosition");
    const positionElement = customPositionElement || self._positionElement;
    const calendarHeight = Array.prototype.reduce.call(self.calendarContainer.children, (acc, child) => acc + child.offsetHeight, 0), calendarWidth = self.calendarContainer.offsetWidth, configPos = self.config.position.split(" "), configPosVertical = configPos[0], configPosHorizontal = configPos.length > 1 ? configPos[1] : null, inputBounds = positionElement.getBoundingClientRect(), distanceFromBottom = window.innerHeight - inputBounds.bottom, showOnTop = configPosVertical === "above" || configPosVertical !== "below" && distanceFromBottom < calendarHeight && inputBounds.top > calendarHeight;
    const top = window.pageYOffset + inputBounds.top + (!showOnTop ? positionElement.offsetHeight + 2 : -calendarHeight - 2);
    toggleClass(self.calendarContainer, "arrowTop", !showOnTop);
    toggleClass(self.calendarContainer, "arrowBottom", showOnTop);
    if (self.config.inline)
      return;
    let left = window.pageXOffset + inputBounds.left;
    let isCenter = false;
    let isRight = false;
    if (configPosHorizontal === "center") {
      left -= (calendarWidth - inputBounds.width) / 2;
      isCenter = true;
    } else if (configPosHorizontal === "right") {
      left -= calendarWidth - inputBounds.width;
      isRight = true;
    }
    toggleClass(self.calendarContainer, "arrowLeft", !isCenter && !isRight);
    toggleClass(self.calendarContainer, "arrowCenter", isCenter);
    toggleClass(self.calendarContainer, "arrowRight", isRight);
    const right = window.document.body.offsetWidth - (window.pageXOffset + inputBounds.right);
    const rightMost = left + calendarWidth > window.document.body.offsetWidth;
    const centerMost = right + calendarWidth > window.document.body.offsetWidth;
    toggleClass(self.calendarContainer, "rightMost", rightMost);
    if (self.config.static)
      return;
    self.calendarContainer.style.top = `${top}px`;
    if (!rightMost) {
      self.calendarContainer.style.left = `${left}px`;
      self.calendarContainer.style.right = "auto";
    } else if (!centerMost) {
      self.calendarContainer.style.left = "auto";
      self.calendarContainer.style.right = `${right}px`;
    } else {
      const doc = getDocumentStyleSheet();
      if (doc === void 0)
        return;
      const bodyWidth = window.document.body.offsetWidth;
      const centerLeft = Math.max(0, bodyWidth / 2 - calendarWidth / 2);
      const centerBefore = ".flatpickr-calendar.centerMost:before";
      const centerAfter = ".flatpickr-calendar.centerMost:after";
      const centerIndex = doc.cssRules.length;
      const centerStyle = `{left:${inputBounds.left}px;right:auto;}`;
      toggleClass(self.calendarContainer, "rightMost", false);
      toggleClass(self.calendarContainer, "centerMost", true);
      doc.insertRule(`${centerBefore},${centerAfter}${centerStyle}`, centerIndex);
      self.calendarContainer.style.left = `${centerLeft}px`;
      self.calendarContainer.style.right = "auto";
    }
  }
  function getDocumentStyleSheet() {
    let editableSheet = null;
    for (let i = 0; i < document.styleSheets.length; i++) {
      const sheet = document.styleSheets[i];
      try {
        sheet.cssRules;
      } catch (err) {
        continue;
      }
      editableSheet = sheet;
      break;
    }
    return editableSheet != null ? editableSheet : createStyleSheet();
  }
  function createStyleSheet() {
    const style = document.createElement("style");
    document.head.appendChild(style);
    return style.sheet;
  }
  function redraw() {
    if (self.config.noCalendar || self.isMobile)
      return;
    buildMonthSwitch();
    updateNavigationCurrentMonth();
    buildDays();
  }
  function focusAndClose() {
    self._input.focus();
    if (window.navigator.userAgent.indexOf("MSIE") !== -1 || navigator.msMaxTouchPoints !== void 0) {
      setTimeout(self.close, 0);
    } else {
      self.close();
    }
  }
  function selectDate(e) {
    e.preventDefault();
    e.stopPropagation();
    const isSelectable = (day) => day.classList && day.classList.contains("flatpickr-day") && !day.classList.contains("flatpickr-disabled") && !day.classList.contains("notAllowed");
    const t = findParent(getEventTarget(e), isSelectable);
    if (t === void 0)
      return;
    const target = t;
    const selectedDate = self.latestSelectedDateObj = new Date(target.dateObj.getTime());
    const shouldChangeMonth = (selectedDate.getMonth() < self.currentMonth || selectedDate.getMonth() > self.currentMonth + self.config.showMonths - 1) && self.config.mode !== "range";
    self.selectedDateElem = target;
    if (self.config.mode === "single")
      self.selectedDates = [selectedDate];
    else if (self.config.mode === "multiple") {
      const selectedIndex = isDateSelected(selectedDate);
      if (selectedIndex)
        self.selectedDates.splice(parseInt(selectedIndex), 1);
      else
        self.selectedDates.push(selectedDate);
    } else if (self.config.mode === "range") {
      if (self.selectedDates.length === 2) {
        self.clear(false, false);
      }
      self.latestSelectedDateObj = selectedDate;
      self.selectedDates.push(selectedDate);
      if (compareDates(selectedDate, self.selectedDates[0], true) !== 0)
        self.selectedDates.sort((a, b) => a.getTime() - b.getTime());
    }
    setHoursFromInputs();
    if (shouldChangeMonth) {
      const isNewYear = self.currentYear !== selectedDate.getFullYear();
      self.currentYear = selectedDate.getFullYear();
      self.currentMonth = selectedDate.getMonth();
      if (isNewYear) {
        triggerEvent("onYearChange");
        buildMonthSwitch();
      }
      triggerEvent("onMonthChange");
    }
    updateNavigationCurrentMonth();
    buildDays();
    updateValue();
    if (!shouldChangeMonth && self.config.mode !== "range" && self.config.showMonths === 1)
      focusOnDayElem(target);
    else if (self.selectedDateElem !== void 0 && self.hourElement === void 0) {
      self.selectedDateElem && self.selectedDateElem.focus();
    }
    if (self.hourElement !== void 0)
      self.hourElement !== void 0 && self.hourElement.focus();
    if (self.config.closeOnSelect) {
      const single = self.config.mode === "single" && !self.config.enableTime;
      const range = self.config.mode === "range" && self.selectedDates.length === 2 && !self.config.enableTime;
      if (single || range) {
        focusAndClose();
      }
    }
    triggerChange();
  }
  const CALLBACKS = {
    locale: [setupLocale, updateWeekdays],
    showMonths: [buildMonths, setCalendarWidth, buildWeekdays],
    minDate: [jumpToDate],
    maxDate: [jumpToDate],
    clickOpens: [
      () => {
        if (self.config.clickOpens === true) {
          bind(self._input, "focus", self.open);
          bind(self._input, "click", self.open);
        } else {
          self._input.removeEventListener("focus", self.open);
          self._input.removeEventListener("click", self.open);
        }
      }
    ]
  };
  function set(option, value) {
    if (option !== null && typeof option === "object") {
      Object.assign(self.config, option);
      for (const key in option) {
        if (CALLBACKS[key] !== void 0)
          CALLBACKS[key].forEach((x) => x());
      }
    } else {
      self.config[option] = value;
      if (CALLBACKS[option] !== void 0)
        CALLBACKS[option].forEach((x) => x());
      else if (HOOKS.indexOf(option) > -1)
        self.config[option] = arrayify(value);
    }
    self.redraw();
    updateValue(true);
  }
  function setSelectedDate(inputDate, format2) {
    let dates = [];
    if (inputDate instanceof Array)
      dates = inputDate.map((d) => self.parseDate(d, format2));
    else if (inputDate instanceof Date || typeof inputDate === "number")
      dates = [self.parseDate(inputDate, format2)];
    else if (typeof inputDate === "string") {
      switch (self.config.mode) {
        case "single":
        case "time":
          dates = [self.parseDate(inputDate, format2)];
          break;
        case "multiple":
          dates = inputDate.split(self.config.conjunction).map((date) => self.parseDate(date, format2));
          break;
        case "range":
          dates = inputDate.split(self.l10n.rangeSeparator).map((date) => self.parseDate(date, format2));
          break;
      }
    } else
      self.config.errorHandler(new Error(`Invalid date supplied: ${JSON.stringify(inputDate)}`));
    self.selectedDates = self.config.allowInvalidPreload ? dates : dates.filter((d) => d instanceof Date && isEnabled(d, false));
    if (self.config.mode === "range")
      self.selectedDates.sort((a, b) => a.getTime() - b.getTime());
  }
  function setDate(date, triggerChange2 = false, format2 = self.config.dateFormat) {
    if (date !== 0 && !date || date instanceof Array && date.length === 0)
      return self.clear(triggerChange2);
    setSelectedDate(date, format2);
    self.latestSelectedDateObj = self.selectedDates[self.selectedDates.length - 1];
    self.redraw();
    jumpToDate(void 0, triggerChange2);
    setHoursFromDate();
    if (self.selectedDates.length === 0) {
      self.clear(false);
    }
    updateValue(triggerChange2);
    if (triggerChange2)
      triggerEvent("onChange");
  }
  function parseDateRules(arr) {
    return arr.slice().map((rule) => {
      if (typeof rule === "string" || typeof rule === "number" || rule instanceof Date) {
        return self.parseDate(rule, void 0, true);
      } else if (rule && typeof rule === "object" && rule.from && rule.to)
        return {
          from: self.parseDate(rule.from, void 0),
          to: self.parseDate(rule.to, void 0)
        };
      return rule;
    }).filter((x) => x);
  }
  function setupDates() {
    self.selectedDates = [];
    self.now = self.parseDate(self.config.now) || new Date();
    const preloadedDate = self.config.defaultDate || ((self.input.nodeName === "INPUT" || self.input.nodeName === "TEXTAREA") && self.input.placeholder && self.input.value === self.input.placeholder ? null : self.input.value);
    if (preloadedDate)
      setSelectedDate(preloadedDate, self.config.dateFormat);
    self._initialDate = self.selectedDates.length > 0 ? self.selectedDates[0] : self.config.minDate && self.config.minDate.getTime() > self.now.getTime() ? self.config.minDate : self.config.maxDate && self.config.maxDate.getTime() < self.now.getTime() ? self.config.maxDate : self.now;
    self.currentYear = self._initialDate.getFullYear();
    self.currentMonth = self._initialDate.getMonth();
    if (self.selectedDates.length > 0)
      self.latestSelectedDateObj = self.selectedDates[0];
    if (self.config.minTime !== void 0)
      self.config.minTime = self.parseDate(self.config.minTime, "H:i");
    if (self.config.maxTime !== void 0)
      self.config.maxTime = self.parseDate(self.config.maxTime, "H:i");
    self.minDateHasTime = !!self.config.minDate && (self.config.minDate.getHours() > 0 || self.config.minDate.getMinutes() > 0 || self.config.minDate.getSeconds() > 0);
    self.maxDateHasTime = !!self.config.maxDate && (self.config.maxDate.getHours() > 0 || self.config.maxDate.getMinutes() > 0 || self.config.maxDate.getSeconds() > 0);
  }
  function setupInputs() {
    self.input = getInputElem();
    if (!self.input) {
      self.config.errorHandler(new Error("Invalid input element specified"));
      return;
    }
    self.input._type = self.input.type;
    self.input.type = "text";
    self.input.classList.add("flatpickr-input");
    self._input = self.input;
    if (self.config.altInput) {
      self.altInput = createElement(self.input.nodeName, self.config.altInputClass);
      self._input = self.altInput;
      self.altInput.placeholder = self.input.placeholder;
      self.altInput.disabled = self.input.disabled;
      self.altInput.required = self.input.required;
      self.altInput.tabIndex = self.input.tabIndex;
      self.altInput.type = "text";
      self.input.setAttribute("type", "hidden");
      if (!self.config.static && self.input.parentNode)
        self.input.parentNode.insertBefore(self.altInput, self.input.nextSibling);
    }
    if (!self.config.allowInput)
      self._input.setAttribute("readonly", "readonly");
    self._positionElement = self.config.positionElement || self._input;
  }
  function setupMobile() {
    const inputType = self.config.enableTime ? self.config.noCalendar ? "time" : "datetime-local" : "date";
    self.mobileInput = createElement("input", self.input.className + " flatpickr-mobile");
    self.mobileInput.tabIndex = 1;
    self.mobileInput.type = inputType;
    self.mobileInput.disabled = self.input.disabled;
    self.mobileInput.required = self.input.required;
    self.mobileInput.placeholder = self.input.placeholder;
    self.mobileFormatStr = inputType === "datetime-local" ? "Y-m-d\\TH:i:S" : inputType === "date" ? "Y-m-d" : "H:i:S";
    if (self.selectedDates.length > 0) {
      self.mobileInput.defaultValue = self.mobileInput.value = self.formatDate(self.selectedDates[0], self.mobileFormatStr);
    }
    if (self.config.minDate)
      self.mobileInput.min = self.formatDate(self.config.minDate, "Y-m-d");
    if (self.config.maxDate)
      self.mobileInput.max = self.formatDate(self.config.maxDate, "Y-m-d");
    if (self.input.getAttribute("step"))
      self.mobileInput.step = String(self.input.getAttribute("step"));
    self.input.type = "hidden";
    if (self.altInput !== void 0)
      self.altInput.type = "hidden";
    try {
      if (self.input.parentNode)
        self.input.parentNode.insertBefore(self.mobileInput, self.input.nextSibling);
    } catch (_a) {
    }
    bind(self.mobileInput, "change", (e) => {
      self.setDate(getEventTarget(e).value, false, self.mobileFormatStr);
      triggerEvent("onChange");
      triggerEvent("onClose");
    });
  }
  function toggle(e) {
    if (self.isOpen === true)
      return self.close();
    self.open(e);
  }
  function triggerEvent(event, data2) {
    if (self.config === void 0)
      return;
    const hooks = self.config[event];
    if (hooks !== void 0 && hooks.length > 0) {
      for (let i = 0; hooks[i] && i < hooks.length; i++)
        hooks[i](self.selectedDates, self.input.value, self, data2);
    }
    if (event === "onChange") {
      self.input.dispatchEvent(createEvent("change"));
      self.input.dispatchEvent(createEvent("input"));
    }
  }
  function createEvent(name) {
    const e = document.createEvent("Event");
    e.initEvent(name, true, true);
    return e;
  }
  function isDateSelected(date) {
    for (let i = 0; i < self.selectedDates.length; i++) {
      if (compareDates(self.selectedDates[i], date) === 0)
        return "" + i;
    }
    return false;
  }
  function isDateInRange(date) {
    if (self.config.mode !== "range" || self.selectedDates.length < 2)
      return false;
    return compareDates(date, self.selectedDates[0]) >= 0 && compareDates(date, self.selectedDates[1]) <= 0;
  }
  function updateNavigationCurrentMonth() {
    if (self.config.noCalendar || self.isMobile || !self.monthNav)
      return;
    self.yearElements.forEach((yearElement, i) => {
      const d = new Date(self.currentYear, self.currentMonth, 1);
      d.setMonth(self.currentMonth + i);
      if (self.config.showMonths > 1 || self.config.monthSelectorType === "static") {
        self.monthElements[i].textContent = monthToStr(d.getMonth(), self.config.shorthandCurrentMonth, self.l10n) + " ";
      } else {
        self.monthsDropdownContainer.value = d.getMonth().toString();
      }
      yearElement.value = d.getFullYear().toString();
    });
    self._hidePrevMonthArrow = self.config.minDate !== void 0 && (self.currentYear === self.config.minDate.getFullYear() ? self.currentMonth <= self.config.minDate.getMonth() : self.currentYear < self.config.minDate.getFullYear());
    self._hideNextMonthArrow = self.config.maxDate !== void 0 && (self.currentYear === self.config.maxDate.getFullYear() ? self.currentMonth + 1 > self.config.maxDate.getMonth() : self.currentYear > self.config.maxDate.getFullYear());
  }
  function getDateStr(format2) {
    return self.selectedDates.map((dObj) => self.formatDate(dObj, format2)).filter((d, i, arr) => self.config.mode !== "range" || self.config.enableTime || arr.indexOf(d) === i).join(self.config.mode !== "range" ? self.config.conjunction : self.l10n.rangeSeparator);
  }
  function updateValue(triggerChange2 = true) {
    if (self.mobileInput !== void 0 && self.mobileFormatStr) {
      self.mobileInput.value = self.latestSelectedDateObj !== void 0 ? self.formatDate(self.latestSelectedDateObj, self.mobileFormatStr) : "";
    }
    self.input.value = getDateStr(self.config.dateFormat);
    if (self.altInput !== void 0) {
      self.altInput.value = getDateStr(self.config.altFormat);
    }
    if (triggerChange2 !== false)
      triggerEvent("onValueUpdate");
  }
  function onMonthNavClick(e) {
    const eventTarget = getEventTarget(e);
    const isPrevMonth = self.prevMonthNav.contains(eventTarget);
    const isNextMonth = self.nextMonthNav.contains(eventTarget);
    if (isPrevMonth || isNextMonth) {
      changeMonth(isPrevMonth ? -1 : 1);
    } else if (self.yearElements.indexOf(eventTarget) >= 0) {
      eventTarget.select();
    } else if (eventTarget.classList.contains("arrowUp")) {
      self.changeYear(self.currentYear + 1);
    } else if (eventTarget.classList.contains("arrowDown")) {
      self.changeYear(self.currentYear - 1);
    }
  }
  function timeWrapper(e) {
    e.preventDefault();
    const isKeyDown = e.type === "keydown", eventTarget = getEventTarget(e), input = eventTarget;
    if (self.amPM !== void 0 && eventTarget === self.amPM) {
      self.amPM.textContent = self.l10n.amPM[int(self.amPM.textContent === self.l10n.amPM[0])];
    }
    const min = parseFloat(input.getAttribute("min")), max = parseFloat(input.getAttribute("max")), step = parseFloat(input.getAttribute("step")), curValue = parseInt(input.value, 10), delta = e.delta || (isKeyDown ? e.which === 38 ? 1 : -1 : 0);
    let newValue = curValue + step * delta;
    if (typeof input.value !== "undefined" && input.value.length === 2) {
      const isHourElem = input === self.hourElement, isMinuteElem = input === self.minuteElement;
      if (newValue < min) {
        newValue = max + newValue + int(!isHourElem) + (int(isHourElem) && int(!self.amPM));
        if (isMinuteElem)
          incrementNumInput(void 0, -1, self.hourElement);
      } else if (newValue > max) {
        newValue = input === self.hourElement ? newValue - max - int(!self.amPM) : min;
        if (isMinuteElem)
          incrementNumInput(void 0, 1, self.hourElement);
      }
      if (self.amPM && isHourElem && (step === 1 ? newValue + curValue === 23 : Math.abs(newValue - curValue) > step)) {
        self.amPM.textContent = self.l10n.amPM[int(self.amPM.textContent === self.l10n.amPM[0])];
      }
      input.value = pad(newValue);
    }
  }
  init2();
  return self;
}
function _flatpickr(nodeList, config) {
  const nodes = Array.prototype.slice.call(nodeList).filter((x) => x instanceof HTMLElement);
  const instances = [];
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];
    try {
      if (node.getAttribute("data-fp-omit") !== null)
        continue;
      if (node._flatpickr !== void 0) {
        node._flatpickr.destroy();
        node._flatpickr = void 0;
      }
      node._flatpickr = FlatpickrInstance(node, config || {});
      instances.push(node._flatpickr);
    } catch (e) {
      console.error(e);
    }
  }
  return instances.length === 1 ? instances[0] : instances;
}
if (typeof HTMLElement !== "undefined" && typeof HTMLCollection !== "undefined" && typeof NodeList !== "undefined") {
  HTMLCollection.prototype.flatpickr = NodeList.prototype.flatpickr = function(config) {
    return _flatpickr(this, config);
  };
  HTMLElement.prototype.flatpickr = function(config) {
    return _flatpickr([this], config);
  };
}
var flatpickr = function(selector, config) {
  if (typeof selector === "string") {
    return _flatpickr(window.document.querySelectorAll(selector), config);
  } else if (selector instanceof Node) {
    return _flatpickr([selector], config);
  } else {
    return _flatpickr(selector, config);
  }
};
flatpickr.defaultConfig = {};
flatpickr.l10ns = {
  en: Object.assign({}, english),
  default: Object.assign({}, english)
};
flatpickr.localize = (l10n2) => {
  flatpickr.l10ns.default = Object.assign(Object.assign({}, flatpickr.l10ns.default), l10n2);
};
flatpickr.setDefaults = (config) => {
  flatpickr.defaultConfig = Object.assign(Object.assign({}, flatpickr.defaultConfig), config);
};
flatpickr.parseDate = createDateParser({});
flatpickr.formatDate = createDateFormatter({});
flatpickr.compareDates = compareDates;
if (typeof jQuery !== "undefined" && typeof jQuery.fn !== "undefined") {
  jQuery.fn.flatpickr = function(config) {
    return _flatpickr(this, config);
  };
}
Date.prototype.fp_incr = function(days) {
  return new Date(this.getFullYear(), this.getMonth(), this.getDate() + (typeof days === "string" ? parseInt(days, 10) : days));
};
if (typeof window !== "undefined") {
  window.flatpickr = flatpickr;
}
function rangePlugin(config = {}) {
  return function(fp) {
    let dateFormat = "", secondInput, _secondInputFocused, _prevDates;
    const createSecondInput = () => {
      if (config.input) {
        secondInput = config.input instanceof Element ? config.input : window.document.querySelector(config.input);
        if (!secondInput) {
          fp.config.errorHandler(new Error("Invalid input element specified"));
          return;
        }
        if (fp.config.wrap) {
          secondInput = secondInput.querySelector("[data-input]");
        }
      } else {
        secondInput = fp._input.cloneNode();
        secondInput.removeAttribute("id");
        secondInput._flatpickr = void 0;
      }
      if (secondInput.value) {
        const parsedDate = fp.parseDate(secondInput.value);
        if (parsedDate)
          fp.selectedDates.push(parsedDate);
      }
      secondInput.setAttribute("data-fp-omit", "");
      if (fp.config.clickOpens) {
        fp._bind(secondInput, ["focus", "click"], () => {
          if (fp.selectedDates[1]) {
            fp.latestSelectedDateObj = fp.selectedDates[1];
            fp._setHoursFromDate(fp.selectedDates[1]);
            fp.jumpToDate(fp.selectedDates[1]);
          }
          _secondInputFocused = true;
          fp.isOpen = false;
          fp.open(void 0, config.position === "left" ? fp._input : secondInput);
        });
        fp._bind(fp._input, ["focus", "click"], (e) => {
          e.preventDefault();
          fp.isOpen = false;
          fp.open();
        });
      }
      if (fp.config.allowInput)
        fp._bind(secondInput, "keydown", (e) => {
          if (e.key === "Enter") {
            fp.setDate([fp.selectedDates[0], secondInput.value], true, dateFormat);
            secondInput.click();
          }
        });
      if (!config.input)
        fp._input.parentNode && fp._input.parentNode.insertBefore(secondInput, fp._input.nextSibling);
    };
    const plugin = {
      onParseConfig() {
        fp.config.mode = "range";
        dateFormat = fp.config.altInput ? fp.config.altFormat : fp.config.dateFormat;
      },
      onReady() {
        createSecondInput();
        fp.config.ignoredFocusElements.push(secondInput);
        if (fp.config.allowInput) {
          fp._input.removeAttribute("readonly");
          secondInput.removeAttribute("readonly");
        } else {
          secondInput.setAttribute("readonly", "readonly");
        }
        fp._bind(fp._input, "focus", () => {
          fp.latestSelectedDateObj = fp.selectedDates[0];
          fp._setHoursFromDate(fp.selectedDates[0]);
          _secondInputFocused = false;
          fp.jumpToDate(fp.selectedDates[0]);
        });
        if (fp.config.allowInput)
          fp._bind(fp._input, "keydown", (e) => {
            if (e.key === "Enter")
              fp.setDate([fp._input.value, fp.selectedDates[1]], true, dateFormat);
          });
        fp.setDate(fp.selectedDates, false);
        plugin.onValueUpdate(fp.selectedDates);
        fp.loadedPlugins.push("range");
      },
      onPreCalendarPosition() {
        if (_secondInputFocused) {
          fp._positionElement = secondInput;
          setTimeout(() => {
            fp._positionElement = fp._input;
          }, 0);
        }
      },
      onChange() {
        if (!fp.selectedDates.length) {
          setTimeout(() => {
            if (fp.selectedDates.length)
              return;
            secondInput.value = "";
            _prevDates = [];
          }, 10);
        }
        if (_secondInputFocused) {
          setTimeout(() => {
            secondInput.focus();
          }, 0);
        }
      },
      onDestroy() {
        if (!config.input)
          secondInput.parentNode && secondInput.parentNode.removeChild(secondInput);
      },
      onValueUpdate(selDates) {
        if (!secondInput)
          return;
        _prevDates = !_prevDates || selDates.length >= _prevDates.length ? [...selDates] : _prevDates;
        if (_prevDates.length > selDates.length) {
          const newSelectedDate = selDates[0];
          const newDates = _secondInputFocused ? [_prevDates[0], newSelectedDate] : [newSelectedDate, _prevDates[1]];
          fp.setDate(newDates, false);
          _prevDates = [...newDates];
        }
        [
          fp._input.value = "",
          secondInput.value = ""
        ] = fp.selectedDates.map((d) => fp.formatDate(d, dateFormat));
      }
    };
    return plugin;
  };
}
var l10n;
function updateClasses(instance) {
  const {
    calendarContainer,
    days,
    daysContainer,
    weekdayContainer,
    selectedDates
  } = instance;
  calendarContainer.classList.add("bx--date-picker__calendar");
  calendarContainer.querySelector(".flatpickr-month").classList.add("bx--date-picker__month");
  weekdayContainer.classList.add("bx--date-picker__weekdays");
  weekdayContainer.querySelectorAll(".flatpickr-weekday").forEach((node) => {
    node.classList.add("bx--date-picker__weekday");
  });
  daysContainer.classList.add("bx--date-picker__days");
  days.querySelectorAll(".flatpickr-day").forEach((node) => {
    node.classList.add("bx--date-picker__day");
    if (node.classList.contains("today") && selectedDates.length > 0) {
      node.classList.add("no-border");
    } else if (node.classList.contains("today") && selectedDates.length === 0) {
      node.classList.remove("no-border");
    }
  });
}
function updateMonthNode(instance) {
  const monthText = instance.l10n.months.longhand[instance.currentMonth];
  const staticMonthNode = instance.monthNav.querySelector(".cur-month");
  if (staticMonthNode) {
    staticMonthNode.textContent = monthText;
  } else {
    const monthSelectNode = instance.monthsDropdownContainer;
    const span = document.createElement("span");
    span.setAttribute("class", "cur-month");
    span.textContent = monthText;
    monthSelectNode.parentNode.replaceChild(span, monthSelectNode);
  }
}
function createCalendar({options: options2, base, input, dispatch}) {
  let locale = options2.locale;
  if (options2.locale === "en" && l10n && l10n.en) {
    l10n.en.weekdays.shorthand.forEach((_, index2) => {
      const shorthand = _.slice(0, 2);
      l10n.en.weekdays.shorthand[index2] = shorthand === "Th" ? "Th" : shorthand.charAt(0);
    });
    locale = l10n.en;
  }
  return new flatpickr(base, {
    ...options2,
    allowInput: true,
    disableMobile: true,
    clickOpens: true,
    locale,
    plugins: [
      options2.mode === "range" && new rangePlugin({position: "left", input})
    ].filter(Boolean),
    nextArrow: '<svg width="16px" height="16px" viewBox="0 0 16 16"><polygon points="11,8 6,13 5.3,12.3 9.6,8 5.3,3.7 6,3 "/><rect width="16" height="16" style="fill: none" /></svg>',
    prevArrow: '<svg width="16px" height="16px" viewBox="0 0 16 16"><polygon points="5,8 10,3 10.7,3.7 6.4,8 10.7,12.3 10,13 "/><rect width="16" height="16" style="fill: none" /></svg>',
    onChange: () => {
      dispatch("change");
    },
    onClose: () => {
      dispatch("close");
    },
    onMonthChange: (s2, d, instance) => {
      updateMonthNode(instance);
    },
    onOpen: (s2, d, instance) => {
      dispatch("open");
      updateClasses(instance);
      updateMonthNode(instance);
    }
  });
}
create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, [
    "datePickerType",
    "value",
    "appendTo",
    "dateFormat",
    "maxDate",
    "minDate",
    "locale",
    "short",
    "light",
    "id"
  ]);
  let $inputIds, $$unsubscribe_inputIds;
  let $hasCalendar, $$unsubscribe_hasCalendar;
  let $inputValue, $$unsubscribe_inputValue;
  let $mode, $$unsubscribe_mode;
  let $range, $$unsubscribe_range;
  let $labelTextEmpty, $$unsubscribe_labelTextEmpty;
  let {datePickerType = "simple"} = $$props;
  let {value = ""} = $$props;
  let {appendTo = document.body} = $$props;
  let {dateFormat = "m/d/Y"} = $$props;
  let {maxDate = null} = $$props;
  let {minDate = null} = $$props;
  let {locale = "en"} = $$props;
  let {short = false} = $$props;
  let {light = false} = $$props;
  let {id = "ccs-" + Math.random().toString(36)} = $$props;
  const dispatch = createEventDispatcher();
  const inputs = writable2([]);
  const inputIds = derived(inputs, (_) => _.map(({id: id2}) => id2));
  $$unsubscribe_inputIds = subscribe(inputIds, (value2) => $inputIds = value2);
  const labelTextEmpty = derived(inputs, (_) => _.filter(({labelText}) => !!labelText).length === 0);
  $$unsubscribe_labelTextEmpty = subscribe(labelTextEmpty, (value2) => $labelTextEmpty = value2);
  const inputValue = writable2(value);
  $$unsubscribe_inputValue = subscribe(inputValue, (value2) => $inputValue = value2);
  const mode = writable2(datePickerType);
  $$unsubscribe_mode = subscribe(mode, (value2) => $mode = value2);
  const range = derived(mode, (_) => _ === "range");
  $$unsubscribe_range = subscribe(range, (value2) => $range = value2);
  const hasCalendar = derived(mode, (_) => _ === "single" || _ === "range");
  $$unsubscribe_hasCalendar = subscribe(hasCalendar, (value2) => $hasCalendar = value2);
  let calendar = void 0;
  let datePickerRef = void 0;
  let inputRef = void 0;
  let inputRefTo = void 0;
  setContext("DatePicker", {
    range,
    inputValue,
    hasCalendar,
    add: (data2) => {
      inputs.update((_) => [..._, data2]);
    },
    declareRef: ({id: id2, ref}) => {
      if ($inputIds.indexOf(id2) === 0) {
        inputRef = ref;
      } else {
        inputRefTo = ref;
      }
    },
    updateValue: ({type, value: value2}) => {
      if (!calendar && type === "input" || type === "change") {
        inputValue.set(value2);
      }
      if (!calendar && type === "change") {
        dispatch("change", value2);
      }
    },
    blurInput: (relatedTarget) => {
      if (calendar && !calendar.calendarContainer.contains(relatedTarget)) {
        calendar.close();
      }
    },
    openCalendar: () => {
      calendar.open();
    },
    focusCalendar: () => {
      (calendar.selectedDateElem || calendar.todayDateElem || calendar.calendarContainer.querySelector(".flatpickr-day[tabindex]") || calendar.calendarContainer).focus();
    }
  });
  afterUpdate(() => {
    if ($hasCalendar && !calendar) {
      calendar = createCalendar({
        options: {
          appendTo,
          dateFormat,
          defaultDate: $inputValue,
          locale,
          maxDate,
          minDate,
          mode: $mode
        },
        base: inputRef,
        input: inputRefTo,
        dispatch: (event) => {
          const detail = {selectedDates: calendar.selectedDates};
          if ($range) {
            detail.dateStr = {
              from: inputRef.value,
              to: inputRefTo.value
            };
          } else {
            detail.dateStr = inputRef.value;
          }
          return dispatch(event, detail);
        }
      });
    }
    if (calendar && !$range) {
      calendar.setDate($inputValue);
    }
  });
  onDestroy(() => {
    if (calendar) {
      calendar.destroy();
    }
  });
  if ($$props.datePickerType === void 0 && $$bindings.datePickerType && datePickerType !== void 0)
    $$bindings.datePickerType(datePickerType);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  if ($$props.appendTo === void 0 && $$bindings.appendTo && appendTo !== void 0)
    $$bindings.appendTo(appendTo);
  if ($$props.dateFormat === void 0 && $$bindings.dateFormat && dateFormat !== void 0)
    $$bindings.dateFormat(dateFormat);
  if ($$props.maxDate === void 0 && $$bindings.maxDate && maxDate !== void 0)
    $$bindings.maxDate(maxDate);
  if ($$props.minDate === void 0 && $$bindings.minDate && minDate !== void 0)
    $$bindings.minDate(minDate);
  if ($$props.locale === void 0 && $$bindings.locale && locale !== void 0)
    $$bindings.locale(locale);
  if ($$props.short === void 0 && $$bindings.short && short !== void 0)
    $$bindings.short(short);
  if ($$props.light === void 0 && $$bindings.light && light !== void 0)
    $$bindings.light(light);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  value = $inputValue;
  {
    inputValue.set(value);
  }
  $$unsubscribe_inputIds();
  $$unsubscribe_hasCalendar();
  $$unsubscribe_inputValue();
  $$unsubscribe_mode();
  $$unsubscribe_range();
  $$unsubscribe_labelTextEmpty();
  return `

<div${spread([$$restProps], "bx--form-item")}><div${add_attribute("id", id, 0)} class="${[
    escape2(datePickerType && `bx--date-picker--${datePickerType}`) + "\n      " + escape2(datePickerType === "range" && $labelTextEmpty && "bx--date-picker--nolabel"),
    "bx--date-picker " + (short ? "bx--date-picker--short" : "") + " " + (light ? "bx--date-picker--light" : "")
  ].join(" ").trim()}"${add_attribute("this", datePickerRef, 1)}>${slots.default ? slots.default({}) : ``}</div></div>`;
});
var Calendar16 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let ariaLabel;
  let ariaLabelledBy;
  let labelled;
  let attributes;
  let {class: className = void 0} = $$props;
  let {id = void 0} = $$props;
  let {tabindex = void 0} = $$props;
  let {focusable = false} = $$props;
  let {title = void 0} = $$props;
  let {style = void 0} = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.tabindex === void 0 && $$bindings.tabindex && tabindex !== void 0)
    $$bindings.tabindex(tabindex);
  if ($$props.focusable === void 0 && $$bindings.focusable && focusable !== void 0)
    $$bindings.focusable(focusable);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.style === void 0 && $$bindings.style && style !== void 0)
    $$bindings.style(style);
  ariaLabel = $$props["aria-label"];
  ariaLabelledBy = $$props["aria-labelledby"];
  labelled = ariaLabel || ariaLabelledBy || title;
  attributes = {
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    "aria-hidden": labelled ? void 0 : true,
    role: labelled ? "img" : void 0,
    focusable: tabindex === "0" ? true : focusable,
    tabindex
  };
  return `<svg${spread([
    {"data-carbon-icon": "Calendar16"},
    {xmlns: "http://www.w3.org/2000/svg"},
    {viewBox: "0 0 32 32"},
    {fill: "currentColor"},
    {width: "16"},
    {height: "16"},
    {class: escape2(className)},
    {preserveAspectRatio: "xMidYMid meet"},
    {style: escape2(style)},
    {id: escape2(id)},
    attributes
  ])}><path d="${"M26,4h-4V2h-2v2h-8V2h-2v2H6C4.9,4,4,4.9,4,6v20c0,1.1,0.9,2,2,2h20c1.1,0,2-0.9,2-2V6C28,4.9,27.1,4,26,4z M26,26H6V12h20	V26z M26,10H6V6h4v2h2V6h8v2h2V6h4V10z"}"></path>${slots.default ? slots.default({}) : `
    ${title ? `<title>${escape2(title)}</title>` : ``}
  `}</svg>`;
});
create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, [
    "size",
    "type",
    "placeholder",
    "pattern",
    "disabled",
    "iconDescription",
    "id",
    "labelText",
    "hideLabel",
    "invalid",
    "invalidText",
    "warn",
    "warnText",
    "name",
    "ref"
  ]);
  let $range, $$unsubscribe_range;
  let $inputValue, $$unsubscribe_inputValue;
  let $hasCalendar, $$unsubscribe_hasCalendar;
  let {size = void 0} = $$props;
  let {type = "text"} = $$props;
  let {placeholder = ""} = $$props;
  let {pattern = "\\d{1,2}\\/\\d{1,2}\\/\\d{4}"} = $$props;
  let {disabled = false} = $$props;
  let {iconDescription = ""} = $$props;
  let {id = "ccs-" + Math.random().toString(36)} = $$props;
  let {labelText = ""} = $$props;
  let {hideLabel = false} = $$props;
  let {invalid = false} = $$props;
  let {invalidText = ""} = $$props;
  let {warn = false} = $$props;
  let {warnText = ""} = $$props;
  let {name = void 0} = $$props;
  let {ref = null} = $$props;
  const {range, add, hasCalendar, declareRef, updateValue, blurInput, openCalendar, focusCalendar, inputValue} = getContext("DatePicker");
  $$unsubscribe_range = subscribe(range, (value) => $range = value);
  $$unsubscribe_hasCalendar = subscribe(hasCalendar, (value) => $hasCalendar = value);
  $$unsubscribe_inputValue = subscribe(inputValue, (value) => $inputValue = value);
  add({id, labelText});
  onMount(() => {
    declareRef({id, ref});
  });
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  if ($$props.type === void 0 && $$bindings.type && type !== void 0)
    $$bindings.type(type);
  if ($$props.placeholder === void 0 && $$bindings.placeholder && placeholder !== void 0)
    $$bindings.placeholder(placeholder);
  if ($$props.pattern === void 0 && $$bindings.pattern && pattern !== void 0)
    $$bindings.pattern(pattern);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  if ($$props.iconDescription === void 0 && $$bindings.iconDescription && iconDescription !== void 0)
    $$bindings.iconDescription(iconDescription);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.labelText === void 0 && $$bindings.labelText && labelText !== void 0)
    $$bindings.labelText(labelText);
  if ($$props.hideLabel === void 0 && $$bindings.hideLabel && hideLabel !== void 0)
    $$bindings.hideLabel(hideLabel);
  if ($$props.invalid === void 0 && $$bindings.invalid && invalid !== void 0)
    $$bindings.invalid(invalid);
  if ($$props.invalidText === void 0 && $$bindings.invalidText && invalidText !== void 0)
    $$bindings.invalidText(invalidText);
  if ($$props.warn === void 0 && $$bindings.warn && warn !== void 0)
    $$bindings.warn(warn);
  if ($$props.warnText === void 0 && $$bindings.warnText && warnText !== void 0)
    $$bindings.warnText(warnText);
  if ($$props.name === void 0 && $$bindings.name && name !== void 0)
    $$bindings.name(name);
  if ($$props.ref === void 0 && $$bindings.ref && ref !== void 0)
    $$bindings.ref(ref);
  $$unsubscribe_range();
  $$unsubscribe_inputValue();
  $$unsubscribe_hasCalendar();
  return `<div${add_classes([
    "bx--date-picker-container " + (!labelText ? "bx--date-picker--nolabel" : "")
  ].join(" ").trim())}>${labelText ? `<label${add_attribute("for", id, 0)}${add_classes([
    "bx--label " + (hideLabel ? "bx--visually-hidden" : "") + " " + (disabled ? "bx--label--disabled" : "")
  ].join(" ").trim())}>${escape2(labelText)}</label>` : ``}
  <div${add_classes([
    "bx--date-picker-input__wrapper " + (invalid ? "bx--date-picker-input__wrapper--invalid" : "") + " " + (warn ? "bx--date-picker-input__wrapper--warn" : "")
  ].join(" ").trim())}><input${spread([
    {
      "data-invalid": escape2(invalid || void 0)
    },
    {id: escape2(id)},
    {name: escape2(name)},
    {placeholder: escape2(placeholder)},
    {type: escape2(type)},
    {pattern: escape2(pattern)},
    {disabled: disabled || null},
    $$restProps,
    {
      value: escape2(!$range ? $inputValue : void 0)
    },
    {
      class: escape2(size && `bx--date-picker__input--${size}`)
    }
  ], "bx--date-picker__input " + (invalid ? "bx--date-picker__input--invalid" : ""))}${add_attribute("this", ref, 1)}>
    ${!$hasCalendar ? `${invalid ? `${validate_component(WarningFilled16, "WarningFilled16").$$render($$result, {
    class: "bx--date-picker__icon bx--date-picker__icon--invalid"
  }, {}, {})}` : ``}
      ${!invalid && warn ? `${validate_component(WarningAltFilled16, "WarningAltFilled16").$$render($$result, {
    class: "bx--date-picker__icon bx--date-picker__icon--warn"
  }, {}, {})}` : ``}` : ``}
    ${$hasCalendar ? `${validate_component(Calendar16, "Calendar16").$$render($$result, {
    role: "img",
    class: "bx--date-picker__icon",
    "aria-label": iconDescription,
    title: iconDescription
  }, {}, {})}` : ``}</div>
  ${invalid ? `<div${add_classes(["bx--form-requirement"].join(" ").trim())}>${escape2(invalidText)}</div>` : ``}
  ${!invalid && warn ? `<div${add_classes(["bx--form-requirement"].join(" ").trim())}>${escape2(warnText)}</div>` : ``}</div>`;
});
create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["range", "id"]);
  let {range = false} = $$props;
  let {id = "ccs-" + Math.random().toString(36)} = $$props;
  if ($$props.range === void 0 && $$bindings.range && range !== void 0)
    $$bindings.range(range);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  return `<div${spread([$$restProps], "bx--form-item")}><div${add_classes([
    "bx--date-picker bx--skeleton bx--date-picker--range " + (!range ? "bx--date-picker--short" : "") + " " + (!range ? "bx--date-picker--simple" : "")
  ].join(" ").trim())}>${each(Array.from({length: range ? 2 : 1}, (_, i) => i), (input, i) => `<div${add_classes(["bx--date-picker-container"].join(" ").trim())}><label${add_attribute("for", id, 0)}${add_classes(["bx--label"].join(" ").trim())}></label>
        <div${add_classes(["bx--date-picker__input bx--skeleton"].join(" ").trim())}></div>
      </div>`)}</div></div>`;
});
create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let selectedItem;
  let $$restProps = compute_rest_props($$props, [
    "items",
    "itemToString",
    "selectedIndex",
    "type",
    "direction",
    "size",
    "open",
    "inline",
    "light",
    "disabled",
    "titleText",
    "invalid",
    "invalidText",
    "warn",
    "warnText",
    "helperText",
    "label",
    "hideLabel",
    "translateWithId",
    "id",
    "name",
    "ref"
  ]);
  let {items = []} = $$props;
  let {itemToString = (item) => item.text || item.id} = $$props;
  let {selectedIndex = -1} = $$props;
  let {type = "default"} = $$props;
  let {direction: direction2 = "bottom"} = $$props;
  let {size = void 0} = $$props;
  let {open = false} = $$props;
  let {inline = false} = $$props;
  let {light = false} = $$props;
  let {disabled = false} = $$props;
  let {titleText = ""} = $$props;
  let {invalid = false} = $$props;
  let {invalidText = ""} = $$props;
  let {warn = false} = $$props;
  let {warnText = ""} = $$props;
  let {helperText = ""} = $$props;
  let {label = void 0} = $$props;
  let {hideLabel = false} = $$props;
  let {translateWithId = void 0} = $$props;
  let {id = "ccs-" + Math.random().toString(36)} = $$props;
  let {name = void 0} = $$props;
  let {ref = null} = $$props;
  const dispatch = createEventDispatcher();
  let selectedId = void 0;
  let highlightedIndex = -1;
  if ($$props.items === void 0 && $$bindings.items && items !== void 0)
    $$bindings.items(items);
  if ($$props.itemToString === void 0 && $$bindings.itemToString && itemToString !== void 0)
    $$bindings.itemToString(itemToString);
  if ($$props.selectedIndex === void 0 && $$bindings.selectedIndex && selectedIndex !== void 0)
    $$bindings.selectedIndex(selectedIndex);
  if ($$props.type === void 0 && $$bindings.type && type !== void 0)
    $$bindings.type(type);
  if ($$props.direction === void 0 && $$bindings.direction && direction2 !== void 0)
    $$bindings.direction(direction2);
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  if ($$props.open === void 0 && $$bindings.open && open !== void 0)
    $$bindings.open(open);
  if ($$props.inline === void 0 && $$bindings.inline && inline !== void 0)
    $$bindings.inline(inline);
  if ($$props.light === void 0 && $$bindings.light && light !== void 0)
    $$bindings.light(light);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  if ($$props.titleText === void 0 && $$bindings.titleText && titleText !== void 0)
    $$bindings.titleText(titleText);
  if ($$props.invalid === void 0 && $$bindings.invalid && invalid !== void 0)
    $$bindings.invalid(invalid);
  if ($$props.invalidText === void 0 && $$bindings.invalidText && invalidText !== void 0)
    $$bindings.invalidText(invalidText);
  if ($$props.warn === void 0 && $$bindings.warn && warn !== void 0)
    $$bindings.warn(warn);
  if ($$props.warnText === void 0 && $$bindings.warnText && warnText !== void 0)
    $$bindings.warnText(warnText);
  if ($$props.helperText === void 0 && $$bindings.helperText && helperText !== void 0)
    $$bindings.helperText(helperText);
  if ($$props.label === void 0 && $$bindings.label && label !== void 0)
    $$bindings.label(label);
  if ($$props.hideLabel === void 0 && $$bindings.hideLabel && hideLabel !== void 0)
    $$bindings.hideLabel(hideLabel);
  if ($$props.translateWithId === void 0 && $$bindings.translateWithId && translateWithId !== void 0)
    $$bindings.translateWithId(translateWithId);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.name === void 0 && $$bindings.name && name !== void 0)
    $$bindings.name(name);
  if ($$props.ref === void 0 && $$bindings.ref && ref !== void 0)
    $$bindings.ref(ref);
  selectedId = items[selectedIndex] ? items[selectedIndex].id : void 0;
  selectedItem = items[selectedIndex];
  {
    if (selectedIndex > -1) {
      dispatch("select", {selectedId, selectedIndex, selectedItem});
    }
  }
  inline = type === "inline";
  {
    if (!open) {
      highlightedIndex = -1;
    }
  }
  return `

<div${spread([$$restProps], "bx--dropdown__wrapper bx--list-box__wrapper " + (inline ? "bx--dropdown__wrapper--inline" : "") + " " + (inline ? "bx--list-box__wrapper--inline" : "") + " " + (inline && invalid ? "bx--dropdown__wrapper--inline--invalid" : ""))}>${titleText ? `<label${add_attribute("for", id, 0)}${add_classes([
    "bx--label " + (disabled ? "bx--label--disabled" : "") + " " + (hideLabel ? "bx--visually-hidden" : "")
  ].join(" ").trim())}>${escape2(titleText)}</label>` : ``}
  ${validate_component(ListBox, "ListBox").$$render($$result, {
    type,
    size,
    id,
    name,
    "aria-label": $$props["aria-label"],
    class: "bx--dropdown " + (direction2 === "top" && "bx--list-box--up") + " " + (invalid && "bx--dropdown--invalid") + " " + (!invalid && warn && "bx--dropdown--warning") + " " + (open && "bx--dropdown--open") + "\n      " + (size === "sm" && "bx--dropdown--sm") + "\n      " + (size === "xl" && "bx--dropdown--xl") + "\n      " + (inline && "bx--dropdown--inline") + "\n      " + (disabled && "bx--dropdown--disabled") + "\n      " + (light && "bx--dropdown--light"),
    disabled,
    open,
    invalid,
    invalidText,
    light,
    warn,
    warnText
  }, {}, {
    default: () => `${invalid ? `${validate_component(WarningFilled16, "WarningFilled16").$$render($$result, {class: "bx--list-box__invalid-icon"}, {}, {})}` : ``}
    ${!invalid && warn ? `${validate_component(WarningAltFilled16, "WarningAltFilled16").$$render($$result, {
      class: "bx--list-box__invalid-icon bx--list-box__invalid-icon--warning"
    }, {}, {})}` : ``}
    <button tabindex="${"0"}" role="${"button"}"${add_attribute("aria-expanded", open, 0)} ${disabled ? "disabled" : ""}${add_attribute("translateWithId", translateWithId, 0)}${add_attribute("id", id, 0)}${add_classes(["bx--list-box__field"].join(" ").trim())}${add_attribute("this", ref, 1)}><span class="${"bx--list-box__label"}">${selectedItem ? `${escape2(itemToString(selectedItem))}` : `${escape2(label)}`}</span>
      ${validate_component(ListBoxMenuIcon, "ListBoxMenuIcon").$$render($$result, {open, translateWithId}, {}, {})}</button>
    ${open ? `${validate_component(ListBoxMenu, "ListBoxMenu").$$render($$result, {"aria-labelledby": id, id}, {}, {
      default: () => `${each(items, (item, i) => `${validate_component(ListBoxMenuItem, "ListBoxMenuItem").$$render($$result, {
        id: item.id,
        active: selectedIndex === i || selectedId === item.id,
        highlighted: highlightedIndex === i || selectedIndex === i
      }, {}, {
        default: () => `${escape2(itemToString(item))}
          `
      })}`)}`
    })}` : ``}`
  })}
  ${!inline && !invalid && !warn && helperText ? `<div${add_classes([
    "bx--form__helper-text " + (disabled ? "bx--form__helper-text--disabled" : "")
  ].join(" ").trim())}>${escape2(helperText)}</div>` : ``}</div>`;
});
create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["inline"]);
  let {inline = false} = $$props;
  if ($$props.inline === void 0 && $$bindings.inline && inline !== void 0)
    $$bindings.inline(inline);
  return `<div${spread([$$restProps], "bx--skeleton bx--dropdown-v2 bx--list-box bx--form-item " + (inline ? "bx--list-box--inline" : ""))}><div role="${"button"}"${add_classes(["bx--list-box__field"].join(" ").trim())}><span${add_classes(["bx--list-box__label"].join(" ").trim())}></span></div></div>`;
});
var CheckmarkFilled16 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let ariaLabel;
  let ariaLabelledBy;
  let labelled;
  let attributes;
  let {class: className = void 0} = $$props;
  let {id = void 0} = $$props;
  let {tabindex = void 0} = $$props;
  let {focusable = false} = $$props;
  let {title = void 0} = $$props;
  let {style = void 0} = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.tabindex === void 0 && $$bindings.tabindex && tabindex !== void 0)
    $$bindings.tabindex(tabindex);
  if ($$props.focusable === void 0 && $$bindings.focusable && focusable !== void 0)
    $$bindings.focusable(focusable);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.style === void 0 && $$bindings.style && style !== void 0)
    $$bindings.style(style);
  ariaLabel = $$props["aria-label"];
  ariaLabelledBy = $$props["aria-labelledby"];
  labelled = ariaLabel || ariaLabelledBy || title;
  attributes = {
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    "aria-hidden": labelled ? void 0 : true,
    role: labelled ? "img" : void 0,
    focusable: tabindex === "0" ? true : focusable,
    tabindex
  };
  return `<svg${spread([
    {"data-carbon-icon": "CheckmarkFilled16"},
    {xmlns: "http://www.w3.org/2000/svg"},
    {viewBox: "0 0 16 16"},
    {fill: "currentColor"},
    {width: "16"},
    {height: "16"},
    {class: escape2(className)},
    {preserveAspectRatio: "xMidYMid meet"},
    {style: escape2(style)},
    {id: escape2(id)},
    attributes
  ])}><path d="${"M8,1C4.1,1,1,4.1,1,8c0,3.9,3.1,7,7,7s7-3.1,7-7C15,4.1,11.9,1,8,1z M7,11L4.3,8.3l0.9-0.8L7,9.3l4-3.9l0.9,0.8L7,11z"}"></path><path d="${"M7,11L4.3,8.3l0.9-0.8L7,9.3l4-3.9l0.9,0.8L7,11z"}" data-icon-path="${"inner-path"}" opacity="${"0"}"></path>${slots.default ? slots.default({}) : `
    ${title ? `<title>${escape2(title)}</title>` : ``}
  `}</svg>`;
});
var Loading = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let spinnerRadius;
  let $$restProps = compute_rest_props($$props, ["small", "active", "withOverlay", "description", "id"]);
  let {small = false} = $$props;
  let {active = true} = $$props;
  let {withOverlay = true} = $$props;
  let {description = "Active loading indicator"} = $$props;
  let {id = "ccs-" + Math.random().toString(36)} = $$props;
  if ($$props.small === void 0 && $$bindings.small && small !== void 0)
    $$bindings.small(small);
  if ($$props.active === void 0 && $$bindings.active && active !== void 0)
    $$bindings.active(active);
  if ($$props.withOverlay === void 0 && $$bindings.withOverlay && withOverlay !== void 0)
    $$bindings.withOverlay(withOverlay);
  if ($$props.description === void 0 && $$bindings.description && description !== void 0)
    $$bindings.description(description);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  spinnerRadius = small ? "42" : "44";
  return `${withOverlay ? `<div${spread([$$restProps], "bx--loading-overlay " + (!active ? "bx--loading-overlay--stop" : ""))}><div aria-atomic="${"true"}"${add_attribute("aria-labelledby", id, 0)}${add_attribute("aria-live", active ? "assertive" : "off", 0)}${add_classes([
    "bx--loading " + (small ? "bx--loading--small" : "") + " " + (!active ? "bx--loading--stop" : "")
  ].join(" ").trim())}>
      <label${add_attribute("id", id, 0)}${add_classes(["bx--visually-hidden"].join(" ").trim())}>${escape2(description)}</label>
      <svg viewBox="${"0 0 100 100"}"${add_classes(["bx--loading__svg"].join(" ").trim())}><title>${escape2(description)}</title>${small ? `<circle cx="${"50%"}" cy="${"50%"}"${add_attribute("r", spinnerRadius, 0)}${add_classes(["bx--loading__background"].join(" ").trim())}></circle>` : ``}<circle cx="${"50%"}" cy="${"50%"}"${add_attribute("r", spinnerRadius, 0)}${add_classes(["bx--loading__stroke"].join(" ").trim())}></circle></svg></div></div>` : `<div${spread([
    {"aria-atomic": "true"},
    {"aria-labelledby": escape2(id)},
    {
      "aria-live": escape2(active ? "assertive" : "off")
    },
    $$restProps
  ], "bx--loading " + (small ? "bx--loading--small" : "") + " " + (!active ? "bx--loading--stop" : ""))}>
    <label${add_attribute("id", id, 0)}${add_classes(["bx--visually-hidden"].join(" ").trim())}>${escape2(description)}</label>
    <svg viewBox="${"0 0 100 100"}"${add_classes(["bx--loading__svg"].join(" ").trim())}><title>${escape2(description)}</title>${small ? `<circle cx="${"50%"}" cy="${"50%"}"${add_attribute("r", spinnerRadius, 0)}${add_classes(["bx--loading__background"].join(" ").trim())}></circle>` : ``}<circle cx="${"50%"}" cy="${"50%"}"${add_attribute("r", spinnerRadius, 0)}${add_classes(["bx--loading__stroke"].join(" ").trim())}></circle></svg></div>`}`;
});
var Filename = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["status", "iconDescription", "invalid"]);
  let {status = "uploading"} = $$props;
  let {iconDescription = ""} = $$props;
  let {invalid = false} = $$props;
  if ($$props.status === void 0 && $$bindings.status && status !== void 0)
    $$bindings.status(status);
  if ($$props.iconDescription === void 0 && $$bindings.iconDescription && iconDescription !== void 0)
    $$bindings.iconDescription(iconDescription);
  if ($$props.invalid === void 0 && $$bindings.invalid && invalid !== void 0)
    $$bindings.invalid(invalid);
  return `${status === "uploading" ? `${validate_component(Loading, "Loading").$$render($$result, Object.assign({description: iconDescription}, $$restProps, {small: true}, {withOverlay: false}), {}, {})}` : ``}

${status === "edit" ? `${invalid ? `${validate_component(WarningFilled16, "WarningFilled16").$$render($$result, {class: "bx--file-invalid"}, {}, {})}` : ``}
  ${validate_component(Close16, "Close16").$$render($$result, Object.assign({"aria-label": iconDescription}, {title: iconDescription}, {class: "bx--file-close"}, $$restProps), {}, {})}` : ``}

${status === "complete" ? `${validate_component(CheckmarkFilled16, "CheckmarkFilled16").$$render($$result, Object.assign({"aria-label": iconDescription}, {title: iconDescription}, {class: "bx--file-complete"}, $$restProps), {}, {})}` : ``}`;
});
var FileUploaderButton = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, [
    "accept",
    "multiple",
    "disabled",
    "disableLabelChanges",
    "kind",
    "labelText",
    "role",
    "tabindex",
    "id",
    "name",
    "ref"
  ]);
  let {accept = []} = $$props;
  let {multiple = false} = $$props;
  let {disabled = false} = $$props;
  let {disableLabelChanges = false} = $$props;
  let {kind = "primary"} = $$props;
  let {labelText = "Add file"} = $$props;
  let {role = "button"} = $$props;
  let {tabindex = "0"} = $$props;
  let {id = "ccs-" + Math.random().toString(36)} = $$props;
  let {name = ""} = $$props;
  let {ref = null} = $$props;
  if ($$props.accept === void 0 && $$bindings.accept && accept !== void 0)
    $$bindings.accept(accept);
  if ($$props.multiple === void 0 && $$bindings.multiple && multiple !== void 0)
    $$bindings.multiple(multiple);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  if ($$props.disableLabelChanges === void 0 && $$bindings.disableLabelChanges && disableLabelChanges !== void 0)
    $$bindings.disableLabelChanges(disableLabelChanges);
  if ($$props.kind === void 0 && $$bindings.kind && kind !== void 0)
    $$bindings.kind(kind);
  if ($$props.labelText === void 0 && $$bindings.labelText && labelText !== void 0)
    $$bindings.labelText(labelText);
  if ($$props.role === void 0 && $$bindings.role && role !== void 0)
    $$bindings.role(role);
  if ($$props.tabindex === void 0 && $$bindings.tabindex && tabindex !== void 0)
    $$bindings.tabindex(tabindex);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.name === void 0 && $$bindings.name && name !== void 0)
    $$bindings.name(name);
  if ($$props.ref === void 0 && $$bindings.ref && ref !== void 0)
    $$bindings.ref(ref);
  return `<label${add_attribute("aria-disabled", disabled, 0)}${add_attribute("for", id, 0)}${add_attribute("tabindex", disabled ? "-1" : tabindex, 0)} class="${[
    escape2(kind && `bx--btn--${kind}`),
    "bx--btn bx--btn--sm " + (disabled ? "bx--btn--disabled" : "")
  ].join(" ").trim()}"><span${add_attribute("role", role, 0)}>${escape2(labelText)}</span></label>
<input${spread([
    {type: "file"},
    {tabindex: "-1"},
    {accept: escape2(accept)},
    {disabled: disabled || null},
    {id: escape2(id)},
    {multiple: multiple || null},
    {name: escape2(name)},
    $$restProps
  ], "bx--visually-hidden")}>`;
});
create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let prevFiles;
  let $$restProps = compute_rest_props($$props, [
    "status",
    "accept",
    "files",
    "multiple",
    "clearFiles",
    "labelDescription",
    "labelTitle",
    "kind",
    "buttonLabel",
    "iconDescription",
    "name"
  ]);
  let {status = "uploading"} = $$props;
  let {accept = []} = $$props;
  let {files = []} = $$props;
  let {multiple = false} = $$props;
  const clearFiles = () => {
    files = [];
  };
  let {labelDescription = ""} = $$props;
  let {labelTitle = ""} = $$props;
  let {kind = "primary"} = $$props;
  let {buttonLabel = ""} = $$props;
  let {iconDescription = "Provide icon description"} = $$props;
  let {name = ""} = $$props;
  const dispatch = createEventDispatcher();
  afterUpdate(() => {
    if (files.length > prevFiles.length) {
      dispatch("add", files);
    } else {
      dispatch("remove", prevFiles.filter((_) => !files.includes(_)));
    }
    prevFiles = [...files];
  });
  if ($$props.status === void 0 && $$bindings.status && status !== void 0)
    $$bindings.status(status);
  if ($$props.accept === void 0 && $$bindings.accept && accept !== void 0)
    $$bindings.accept(accept);
  if ($$props.files === void 0 && $$bindings.files && files !== void 0)
    $$bindings.files(files);
  if ($$props.multiple === void 0 && $$bindings.multiple && multiple !== void 0)
    $$bindings.multiple(multiple);
  if ($$props.clearFiles === void 0 && $$bindings.clearFiles && clearFiles !== void 0)
    $$bindings.clearFiles(clearFiles);
  if ($$props.labelDescription === void 0 && $$bindings.labelDescription && labelDescription !== void 0)
    $$bindings.labelDescription(labelDescription);
  if ($$props.labelTitle === void 0 && $$bindings.labelTitle && labelTitle !== void 0)
    $$bindings.labelTitle(labelTitle);
  if ($$props.kind === void 0 && $$bindings.kind && kind !== void 0)
    $$bindings.kind(kind);
  if ($$props.buttonLabel === void 0 && $$bindings.buttonLabel && buttonLabel !== void 0)
    $$bindings.buttonLabel(buttonLabel);
  if ($$props.iconDescription === void 0 && $$bindings.iconDescription && iconDescription !== void 0)
    $$bindings.iconDescription(iconDescription);
  if ($$props.name === void 0 && $$bindings.name && name !== void 0)
    $$bindings.name(name);
  prevFiles = [];
  return `<div${spread([$$restProps], "bx--form-item")}><strong${add_classes(["bx--file--label"].join(" ").trim())}>${escape2(labelTitle)}</strong>
  <p${add_classes(["bx--label-description"].join(" ").trim())}>${escape2(labelDescription)}</p>
  ${validate_component(FileUploaderButton, "FileUploaderButton").$$render($$result, {
    disableLabelChanges: true,
    labelText: buttonLabel,
    accept,
    name,
    multiple,
    kind
  }, {}, {})}
  <div${add_classes(["bx--file-container"].join(" ").trim())}>${each(files, ({name: name2}, i) => `<span${add_classes(["bx--file__selected-file"].join(" ").trim())}><p${add_classes(["bx--file-filename"].join(" ").trim())}>${escape2(name2)}</p>
        <span${add_classes(["bx--file__state-container"].join(" ").trim())}>${validate_component(Filename, "Filename").$$render($$result, {iconDescription, status}, {}, {})}</span>
      </span>`)}</div></div>`;
});
create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["status", "iconDescription", "invalid", "errorSubject", "errorBody", "id", "name"]);
  let {status = "uploading"} = $$props;
  let {iconDescription = ""} = $$props;
  let {invalid = false} = $$props;
  let {errorSubject = ""} = $$props;
  let {errorBody = ""} = $$props;
  let {id = "ccs-" + Math.random().toString(36)} = $$props;
  let {name = ""} = $$props;
  createEventDispatcher();
  if ($$props.status === void 0 && $$bindings.status && status !== void 0)
    $$bindings.status(status);
  if ($$props.iconDescription === void 0 && $$bindings.iconDescription && iconDescription !== void 0)
    $$bindings.iconDescription(iconDescription);
  if ($$props.invalid === void 0 && $$bindings.invalid && invalid !== void 0)
    $$bindings.invalid(invalid);
  if ($$props.errorSubject === void 0 && $$bindings.errorSubject && errorSubject !== void 0)
    $$bindings.errorSubject(errorSubject);
  if ($$props.errorBody === void 0 && $$bindings.errorBody && errorBody !== void 0)
    $$bindings.errorBody(errorBody);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.name === void 0 && $$bindings.name && name !== void 0)
    $$bindings.name(name);
  return `<span${spread([{id: escape2(id)}, $$restProps], "bx--file__selected-file " + (invalid ? "bx--file__selected-file--invalid" : ""))}><p${add_classes(["bx--file-filename"].join(" ").trim())}>${escape2(name)}</p>
  <span${add_classes(["bx--file__state-container"].join(" ").trim())}>${validate_component(Filename, "Filename").$$render($$result, {iconDescription, status, invalid}, {}, {})}</span>
  ${invalid && errorSubject ? `<div${add_classes(["bx--form-requirement"].join(" ").trim())}><div${add_classes(["bx--form-requirement__title"].join(" ").trim())}>${escape2(errorSubject)}</div>
      ${errorBody ? `<p${add_classes(["bx--form-requirement__supplement"].join(" ").trim())}>${escape2(errorBody)}</p>` : ``}</div>` : ``}</span>`;
});
create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, [
    "accept",
    "multiple",
    "validateFiles",
    "labelText",
    "role",
    "disabled",
    "tabindex",
    "id",
    "name",
    "ref"
  ]);
  let {accept = []} = $$props;
  let {multiple = false} = $$props;
  let {validateFiles = (files) => files} = $$props;
  let {labelText = "Add file"} = $$props;
  let {role = "button"} = $$props;
  let {disabled = false} = $$props;
  let {tabindex = "0"} = $$props;
  let {id = "ccs-" + Math.random().toString(36)} = $$props;
  let {name = ""} = $$props;
  let {ref = null} = $$props;
  createEventDispatcher();
  if ($$props.accept === void 0 && $$bindings.accept && accept !== void 0)
    $$bindings.accept(accept);
  if ($$props.multiple === void 0 && $$bindings.multiple && multiple !== void 0)
    $$bindings.multiple(multiple);
  if ($$props.validateFiles === void 0 && $$bindings.validateFiles && validateFiles !== void 0)
    $$bindings.validateFiles(validateFiles);
  if ($$props.labelText === void 0 && $$bindings.labelText && labelText !== void 0)
    $$bindings.labelText(labelText);
  if ($$props.role === void 0 && $$bindings.role && role !== void 0)
    $$bindings.role(role);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  if ($$props.tabindex === void 0 && $$bindings.tabindex && tabindex !== void 0)
    $$bindings.tabindex(tabindex);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.name === void 0 && $$bindings.name && name !== void 0)
    $$bindings.name(name);
  if ($$props.ref === void 0 && $$bindings.ref && ref !== void 0)
    $$bindings.ref(ref);
  return `<div${spread([$$restProps], "bx--file")}><label${add_attribute("for", id, 0)}${add_attribute("tabindex", tabindex, 0)}${add_classes([
    "bx--file-browse-btn " + (disabled ? "bx--file-browse-btn--disabled" : "")
  ].join(" ").trim())}><div${add_attribute("role", role, 0)}${add_classes([
    "bx--file__drop-container "
  ].join(" ").trim())}>${escape2(labelText)}
      <input type="${"file"}" tabindex="${"-1"}"${add_attribute("id", id, 0)} ${disabled ? "disabled" : ""}${add_attribute("accept", accept, 0)}${add_attribute("name", name, 0)} ${multiple ? "multiple" : ""}${add_classes(["bx--file-input"].join(" ").trim())}></div></label></div>`;
});
create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, []);
  return `<div${spread([$$restProps], "bx--form-item")}>${validate_component(SkeletonText, "SkeletonText").$$render($$result, {heading: true, width: "100px"}, {}, {})}
  ${validate_component(SkeletonText, "SkeletonText").$$render($$result, {
    width: "225px",
    class: "bx--label-description"
  }, {}, {})}
  ${validate_component(ButtonSkeleton, "ButtonSkeleton").$$render($$result, {}, {}, {})}</div>`;
});
var Form = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, []);
  return `<form${spread([$$restProps], "bx--form")}>${slots.default ? slots.default({}) : ``}</form>`;
});
create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, []);
  setContext("Form", {isFluid: true});
  return `${validate_component(Form, "Form").$$render($$result, Object.assign($$restProps, {
    class: "bx--form--fluid " + $$restProps.class
  }), {}, {
    default: () => `${slots.default ? slots.default({}) : ``}`
  })}`;
});
create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["invalid", "message", "noMargin", "messageText", "legendText"]);
  let {invalid = false} = $$props;
  let {message = false} = $$props;
  let {noMargin = false} = $$props;
  let {messageText = ""} = $$props;
  let {legendText = ""} = $$props;
  if ($$props.invalid === void 0 && $$bindings.invalid && invalid !== void 0)
    $$bindings.invalid(invalid);
  if ($$props.message === void 0 && $$bindings.message && message !== void 0)
    $$bindings.message(message);
  if ($$props.noMargin === void 0 && $$bindings.noMargin && noMargin !== void 0)
    $$bindings.noMargin(noMargin);
  if ($$props.messageText === void 0 && $$bindings.messageText && messageText !== void 0)
    $$bindings.messageText(messageText);
  if ($$props.legendText === void 0 && $$bindings.legendText && legendText !== void 0)
    $$bindings.legendText(legendText);
  return `<fieldset${spread([
    {
      "data-invalid": escape2(invalid || void 0)
    },
    $$restProps
  ], "bx--fieldset " + (noMargin ? "bx--fieldset--no-margin" : ""))}><legend${add_classes(["bx--label"].join(" ").trim())}>${escape2(legendText)}</legend>
  ${slots.default ? slots.default({}) : ``}
  ${message ? `<div${add_classes(["bx--form__requirement"].join(" ").trim())}>${escape2(messageText)}</div>` : ``}</fieldset>`;
});
create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, []);
  return `<div${spread([$$restProps], "bx--form-item")}>${slots.default ? slots.default({}) : ``}</div>`;
});
create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["id"]);
  let {id = "ccs-" + Math.random().toString(36)} = $$props;
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  return `<label${spread([{for: escape2(id)}, $$restProps], "bx--label")}>${slots.default ? slots.default({}) : ``}</label>`;
});
var Grid = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let props;
  let $$restProps = compute_rest_props($$props, [
    "as",
    "condensed",
    "narrow",
    "fullWidth",
    "noGutter",
    "noGutterLeft",
    "noGutterRight",
    "padding"
  ]);
  let {as = false} = $$props;
  let {condensed = false} = $$props;
  let {narrow = false} = $$props;
  let {fullWidth = false} = $$props;
  let {noGutter = false} = $$props;
  let {noGutterLeft = false} = $$props;
  let {noGutterRight = false} = $$props;
  let {padding = false} = $$props;
  if ($$props.as === void 0 && $$bindings.as && as !== void 0)
    $$bindings.as(as);
  if ($$props.condensed === void 0 && $$bindings.condensed && condensed !== void 0)
    $$bindings.condensed(condensed);
  if ($$props.narrow === void 0 && $$bindings.narrow && narrow !== void 0)
    $$bindings.narrow(narrow);
  if ($$props.fullWidth === void 0 && $$bindings.fullWidth && fullWidth !== void 0)
    $$bindings.fullWidth(fullWidth);
  if ($$props.noGutter === void 0 && $$bindings.noGutter && noGutter !== void 0)
    $$bindings.noGutter(noGutter);
  if ($$props.noGutterLeft === void 0 && $$bindings.noGutterLeft && noGutterLeft !== void 0)
    $$bindings.noGutterLeft(noGutterLeft);
  if ($$props.noGutterRight === void 0 && $$bindings.noGutterRight && noGutterRight !== void 0)
    $$bindings.noGutterRight(noGutterRight);
  if ($$props.padding === void 0 && $$bindings.padding && padding !== void 0)
    $$bindings.padding(padding);
  props = {
    ...$$restProps,
    class: [
      $$restProps.class,
      "bx--grid",
      condensed && "bx--grid--condensed",
      narrow && "bx--grid--narrow",
      fullWidth && "bx--grid--full-width",
      noGutter && "bx--no-gutter",
      noGutterLeft && "bx--no-gutter--left",
      noGutterRight && "bx--no-gutter--right",
      padding && "bx--row-padding"
    ].filter(Boolean).join(" ")
  };
  return `${as ? `${slots.default ? slots.default({props}) : ``}` : `<div${spread([props])}>${slots.default ? slots.default({}) : ``}</div>`}`;
});
var Row = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let props;
  let $$restProps = compute_rest_props($$props, ["as", "condensed", "narrow", "noGutter", "noGutterLeft", "noGutterRight", "padding"]);
  let {as = false} = $$props;
  let {condensed = false} = $$props;
  let {narrow = false} = $$props;
  let {noGutter = false} = $$props;
  let {noGutterLeft = false} = $$props;
  let {noGutterRight = false} = $$props;
  let {padding = false} = $$props;
  if ($$props.as === void 0 && $$bindings.as && as !== void 0)
    $$bindings.as(as);
  if ($$props.condensed === void 0 && $$bindings.condensed && condensed !== void 0)
    $$bindings.condensed(condensed);
  if ($$props.narrow === void 0 && $$bindings.narrow && narrow !== void 0)
    $$bindings.narrow(narrow);
  if ($$props.noGutter === void 0 && $$bindings.noGutter && noGutter !== void 0)
    $$bindings.noGutter(noGutter);
  if ($$props.noGutterLeft === void 0 && $$bindings.noGutterLeft && noGutterLeft !== void 0)
    $$bindings.noGutterLeft(noGutterLeft);
  if ($$props.noGutterRight === void 0 && $$bindings.noGutterRight && noGutterRight !== void 0)
    $$bindings.noGutterRight(noGutterRight);
  if ($$props.padding === void 0 && $$bindings.padding && padding !== void 0)
    $$bindings.padding(padding);
  props = {
    ...$$restProps,
    class: [
      $$restProps.class,
      "bx--row",
      condensed && "bx--row--condensed",
      narrow && "bx--row--narrow",
      noGutter && "bx--no-gutter",
      noGutterLeft && "bx--no-gutter--left",
      noGutterRight && "bx--no-gutter--right",
      padding && "bx--row-padding"
    ].filter(Boolean).join(" ")
  };
  return `${as ? `${slots.default ? slots.default({props}) : ``}` : `<div${spread([props])}>${slots.default ? slots.default({}) : ``}</div>`}`;
});
var Column = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let columnClass;
  let props;
  let $$restProps = compute_rest_props($$props, [
    "as",
    "noGutter",
    "noGutterLeft",
    "noGutterRight",
    "padding",
    "aspectRatio",
    "sm",
    "md",
    "lg",
    "xlg",
    "max"
  ]);
  let {as = false} = $$props;
  let {noGutter = false} = $$props;
  let {noGutterLeft = false} = $$props;
  let {noGutterRight = false} = $$props;
  let {padding = false} = $$props;
  let {aspectRatio = void 0} = $$props;
  let {sm = void 0} = $$props;
  let {md = void 0} = $$props;
  let {lg = void 0} = $$props;
  let {xlg = void 0} = $$props;
  let {max = void 0} = $$props;
  const breakpoints = ["sm", "md", "lg", "xlg", "max"];
  if ($$props.as === void 0 && $$bindings.as && as !== void 0)
    $$bindings.as(as);
  if ($$props.noGutter === void 0 && $$bindings.noGutter && noGutter !== void 0)
    $$bindings.noGutter(noGutter);
  if ($$props.noGutterLeft === void 0 && $$bindings.noGutterLeft && noGutterLeft !== void 0)
    $$bindings.noGutterLeft(noGutterLeft);
  if ($$props.noGutterRight === void 0 && $$bindings.noGutterRight && noGutterRight !== void 0)
    $$bindings.noGutterRight(noGutterRight);
  if ($$props.padding === void 0 && $$bindings.padding && padding !== void 0)
    $$bindings.padding(padding);
  if ($$props.aspectRatio === void 0 && $$bindings.aspectRatio && aspectRatio !== void 0)
    $$bindings.aspectRatio(aspectRatio);
  if ($$props.sm === void 0 && $$bindings.sm && sm !== void 0)
    $$bindings.sm(sm);
  if ($$props.md === void 0 && $$bindings.md && md !== void 0)
    $$bindings.md(md);
  if ($$props.lg === void 0 && $$bindings.lg && lg !== void 0)
    $$bindings.lg(lg);
  if ($$props.xlg === void 0 && $$bindings.xlg && xlg !== void 0)
    $$bindings.xlg(xlg);
  if ($$props.max === void 0 && $$bindings.max && max !== void 0)
    $$bindings.max(max);
  columnClass = [sm, md, lg, xlg, max].map((breakpoint, i) => {
    const name = breakpoints[i];
    if (breakpoint === true) {
      return `bx--col-${name}`;
    } else if (typeof breakpoint === "number") {
      return `bx--col-${name}-${breakpoint}`;
    } else if (typeof breakpoint === "object") {
      let bp = [];
      if (typeof breakpoint.span === "number") {
        bp = [...bp, `bx--col-${name}-${breakpoint.span}`];
      } else if (breakpoint.span === true) {
        bp = [...bp, `bx--col-${name}`];
      }
      if (typeof breakpoint.offset === "number") {
        bp = [...bp, `bx--offset-${name}-${breakpoint.offset}`];
      }
      return bp.join(" ");
    }
  }).filter(Boolean).join(" ");
  props = {
    ...$$restProps,
    class: [
      $$restProps.class,
      columnClass,
      !columnClass && "bx--col",
      noGutter && "bx--no-gutter",
      noGutterLeft && "bx--no-gutter--left",
      noGutterRight && "bx--no-gutter--right",
      aspectRatio && `bx--aspect-ratio bx--aspect-ratio--${aspectRatio}`,
      padding && "bx--col-padding"
    ].filter(Boolean).join(" ")
  };
  return `${as ? `${slots.default ? slots.default({props}) : ``}` : `<div${spread([props])}>${slots.default ? slots.default({}) : ``}</div>`}`;
});
var IconSkeleton = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["size"]);
  let {size = 16} = $$props;
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  return `<div${spread([
    $$restProps,
    {
      style: escape2($$restProps.style) + "; width: " + escape2(size) + "px; height: " + escape2(size) + "px"
    }
  ], "bx--icon--skeleton")}></div>`;
});
var Icon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["render", "skeleton"]);
  let {render: render2 = void 0} = $$props;
  let {skeleton = false} = $$props;
  if ($$props.render === void 0 && $$bindings.render && render2 !== void 0)
    $$bindings.render(render2);
  if ($$props.skeleton === void 0 && $$bindings.skeleton && skeleton !== void 0)
    $$bindings.skeleton(skeleton);
  return `${skeleton ? `${validate_component(IconSkeleton, "IconSkeleton").$$render($$result, Object.assign($$restProps), {}, {})}` : `${validate_component(render2 || missing_component, "svelte:component").$$render($$result, Object.assign($$restProps), {}, {})}`}`;
});
create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["src", "alt", "ratio", "loading", "loaded", "error", "fadeIn", "loadImage"]);
  let {src: src2 = ""} = $$props;
  let {alt = ""} = $$props;
  let {ratio = void 0} = $$props;
  let {loading = false} = $$props;
  let {loaded = false} = $$props;
  let {error: error22 = false} = $$props;
  let {fadeIn = false} = $$props;
  const loadImage = (url) => {
    if (image != null)
      image = null;
    loaded = false;
    error22 = false;
    image = new Image();
    image.src = url || src2;
    image.onload = () => loaded = true;
    image.onerror = () => error22 = true;
  };
  const dispatch = createEventDispatcher();
  let image = null;
  onMount(() => {
    return () => image = null;
  });
  if ($$props.src === void 0 && $$bindings.src && src2 !== void 0)
    $$bindings.src(src2);
  if ($$props.alt === void 0 && $$bindings.alt && alt !== void 0)
    $$bindings.alt(alt);
  if ($$props.ratio === void 0 && $$bindings.ratio && ratio !== void 0)
    $$bindings.ratio(ratio);
  if ($$props.loading === void 0 && $$bindings.loading && loading !== void 0)
    $$bindings.loading(loading);
  if ($$props.loaded === void 0 && $$bindings.loaded && loaded !== void 0)
    $$bindings.loaded(loaded);
  if ($$props.error === void 0 && $$bindings.error && error22 !== void 0)
    $$bindings.error(error22);
  if ($$props.fadeIn === void 0 && $$bindings.fadeIn && fadeIn !== void 0)
    $$bindings.fadeIn(fadeIn);
  if ($$props.loadImage === void 0 && $$bindings.loadImage && loadImage !== void 0)
    $$bindings.loadImage(loadImage);
  loading = !loaded && !error22;
  {
    if (src2)
      loadImage();
  }
  {
    if (loaded)
      dispatch("load");
  }
  {
    if (error22)
      dispatch("error");
  }
  return `${ratio === void 0 ? `${loading ? `${slots.loading ? slots.loading({}) : ``}` : ``}
  ${loaded ? `<img${spread([
    $$restProps,
    {
      style: "width: 100%;" + escape2($$restProps.style)
    },
    {src: escape2(src2)},
    {alt: escape2(alt)}
  ])}>` : ``}
  ${error22 ? `${slots.error ? slots.error({}) : ``}` : ``}` : `${validate_component(AspectRatio, "AspectRatio").$$render($$result, {ratio}, {}, {
    default: () => `${loading ? `${slots.loading ? slots.loading({}) : ``}` : ``}
    ${loaded ? `<img${spread([
      $$restProps,
      {
        style: "width: 100%;" + escape2($$restProps.style)
      },
      {src: escape2(src2)},
      {alt: escape2(alt)}
    ])}>` : ``}
    ${error22 ? `${slots.error ? slots.error({}) : ``}` : ``}`
  })}`}`;
});
var Error20 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let ariaLabel;
  let ariaLabelledBy;
  let labelled;
  let attributes;
  let {class: className = void 0} = $$props;
  let {id = void 0} = $$props;
  let {tabindex = void 0} = $$props;
  let {focusable = false} = $$props;
  let {title = void 0} = $$props;
  let {style = void 0} = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.tabindex === void 0 && $$bindings.tabindex && tabindex !== void 0)
    $$bindings.tabindex(tabindex);
  if ($$props.focusable === void 0 && $$bindings.focusable && focusable !== void 0)
    $$bindings.focusable(focusable);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.style === void 0 && $$bindings.style && style !== void 0)
    $$bindings.style(style);
  ariaLabel = $$props["aria-label"];
  ariaLabelledBy = $$props["aria-labelledby"];
  labelled = ariaLabel || ariaLabelledBy || title;
  attributes = {
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    "aria-hidden": labelled ? void 0 : true,
    role: labelled ? "img" : void 0,
    focusable: tabindex === "0" ? true : focusable,
    tabindex
  };
  return `<svg${spread([
    {"data-carbon-icon": "Error20"},
    {xmlns: "http://www.w3.org/2000/svg"},
    {viewBox: "0 0 32 32"},
    {fill: "currentColor"},
    {width: "20"},
    {height: "20"},
    {class: escape2(className)},
    {preserveAspectRatio: "xMidYMid meet"},
    {style: escape2(style)},
    {id: escape2(id)},
    attributes
  ])}><path d="${"M2,16H2A14,14,0,1,0,16,2,14,14,0,0,0,2,16Zm23.15,7.75L8.25,6.85a12,12,0,0,1,16.9,16.9ZM8.24,25.16A12,12,0,0,1,6.84,8.27L23.73,25.16a12,12,0,0,1-15.49,0Z"}"></path>${slots.default ? slots.default({}) : `
    ${title ? `<title>${escape2(title)}</title>` : ``}
  `}</svg>`;
});
create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["status", "description", "iconDescription", "successDelay"]);
  let {status = "active"} = $$props;
  let {description = void 0} = $$props;
  let {iconDescription = void 0} = $$props;
  let {successDelay = 1500} = $$props;
  const dispatch = createEventDispatcher();
  let timeout = void 0;
  onMount(() => {
    return () => {
      clearTimeout(timeout);
    };
  });
  afterUpdate(() => {
    if (status === "finished") {
      timeout = setTimeout(() => {
        dispatch("success");
      }, successDelay);
    }
  });
  if ($$props.status === void 0 && $$bindings.status && status !== void 0)
    $$bindings.status(status);
  if ($$props.description === void 0 && $$bindings.description && description !== void 0)
    $$bindings.description(description);
  if ($$props.iconDescription === void 0 && $$bindings.iconDescription && iconDescription !== void 0)
    $$bindings.iconDescription(iconDescription);
  if ($$props.successDelay === void 0 && $$bindings.successDelay && successDelay !== void 0)
    $$bindings.successDelay(successDelay);
  return `<div${spread([{"aria-live": "assertive"}, $$restProps], "bx--inline-loading")}><div${add_classes(["bx--inline-loading__animation"].join(" ").trim())}>${status === "error" ? `${validate_component(Error20, "Error20").$$render($$result, {class: "bx--inline-loading--error"}, {}, {})}` : `${status === "finished" ? `${validate_component(CheckmarkFilled16, "CheckmarkFilled16").$$render($$result, {
    class: "bx--inline-loading__checkmark-container"
  }, {}, {})}` : `${status === "inactive" || status === "active" ? `${validate_component(Loading, "Loading").$$render($$result, {
    small: true,
    description: iconDescription,
    withOverlay: false,
    active: status === "active"
  }, {}, {})}` : ``}`}`}</div>
  ${description ? `<div${add_classes(["bx--inline-loading__text"].join(" ").trim())}>${escape2(description)}</div>` : ``}</div>`;
});
var Launch16 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let ariaLabel;
  let ariaLabelledBy;
  let labelled;
  let attributes;
  let {class: className = void 0} = $$props;
  let {id = void 0} = $$props;
  let {tabindex = void 0} = $$props;
  let {focusable = false} = $$props;
  let {title = void 0} = $$props;
  let {style = void 0} = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.tabindex === void 0 && $$bindings.tabindex && tabindex !== void 0)
    $$bindings.tabindex(tabindex);
  if ($$props.focusable === void 0 && $$bindings.focusable && focusable !== void 0)
    $$bindings.focusable(focusable);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.style === void 0 && $$bindings.style && style !== void 0)
    $$bindings.style(style);
  ariaLabel = $$props["aria-label"];
  ariaLabelledBy = $$props["aria-labelledby"];
  labelled = ariaLabel || ariaLabelledBy || title;
  attributes = {
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    "aria-hidden": labelled ? void 0 : true,
    role: labelled ? "img" : void 0,
    focusable: tabindex === "0" ? true : focusable,
    tabindex
  };
  return `<svg${spread([
    {"data-carbon-icon": "Launch16"},
    {xmlns: "http://www.w3.org/2000/svg"},
    {viewBox: "0 0 16 16"},
    {fill: "currentColor"},
    {width: "16"},
    {height: "16"},
    {class: escape2(className)},
    {preserveAspectRatio: "xMidYMid meet"},
    {style: escape2(style)},
    {id: escape2(id)},
    attributes
  ])}><path d="${"M13,14H3c-0.6,0-1-0.4-1-1V3c0-0.6,0.4-1,1-1h5v1H3v10h10V8h1v5C14,13.6,13.6,14,13,14z"}"></path><path d="${"M10 1L10 2 13.3 2 9 6.3 9.7 7 14 2.7 14 6 15 6 15 1z"}"></path>${slots.default ? slots.default({}) : `
    ${title ? `<title>${escape2(title)}</title>` : ``}
  `}</svg>`;
});
create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, []);
  return `${validate_component(Link, "Link").$$render($$result, Object.assign($$restProps, {target: "_blank"}, {icon: Launch16}), {}, {
    default: () => `${slots.default ? slots.default({}) : ``}`
  })}`;
});
create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, []);
  return `<li${spread([$$restProps], "bx--list__item")}>${slots.default ? slots.default({}) : ``}</li>`;
});
create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let {key = "local-storage-key"} = $$props;
  let {value = ""} = $$props;
  const dispatch = createEventDispatcher();
  let prevValue = value;
  function setItem() {
    if (typeof value === "object") {
      localStorage.setItem(key, JSON.stringify(value));
    } else {
      localStorage.setItem(key, value);
    }
  }
  onMount(() => {
    const item = localStorage.getItem(key);
    if (item != null) {
      try {
        value = JSON.parse(item);
      } catch (e) {
        value = item;
      }
    } else {
      setItem();
      dispatch("save");
    }
  });
  afterUpdate(() => {
    if (prevValue !== value) {
      setItem();
      dispatch("update", {prevValue, value});
    }
    prevValue = value;
  });
  if ($$props.key === void 0 && $$bindings.key && key !== void 0)
    $$bindings.key(key);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  return ``;
});
create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let menuId;
  let inline;
  let ariaLabel;
  let sortedItems;
  let checked;
  let unchecked;
  let filteredItems;
  let highlightedId;
  let $$restProps = compute_rest_props($$props, [
    "items",
    "itemToString",
    "selectedIds",
    "value",
    "size",
    "type",
    "direction",
    "selectionFeedback",
    "disabled",
    "filterable",
    "filterItem",
    "open",
    "light",
    "locale",
    "placeholder",
    "sortItem",
    "translateWithId",
    "titleText",
    "useTitleInItem",
    "invalid",
    "invalidText",
    "warn",
    "warnText",
    "helperText",
    "label",
    "id",
    "name",
    "inputRef"
  ]);
  let {items = []} = $$props;
  let {itemToString = (item) => item.text || item.id} = $$props;
  let {selectedIds = []} = $$props;
  let {value = ""} = $$props;
  let {size = void 0} = $$props;
  let {type = "default"} = $$props;
  let {direction: direction2 = "bottom"} = $$props;
  let {selectionFeedback = "top-after-reopen"} = $$props;
  let {disabled = false} = $$props;
  let {filterable = false} = $$props;
  let {filterItem = (item, value2) => item.text.toLowerCase().includes(value2.toLowerCase())} = $$props;
  let {open = false} = $$props;
  let {light = false} = $$props;
  let {locale = "en"} = $$props;
  let {placeholder = ""} = $$props;
  let {sortItem = (a, b) => a.text.localeCompare(b.text, locale, {numeric: true})} = $$props;
  let {translateWithId = void 0} = $$props;
  let {titleText = ""} = $$props;
  let {useTitleInItem = false} = $$props;
  let {invalid = false} = $$props;
  let {invalidText = ""} = $$props;
  let {warn = false} = $$props;
  let {warnText = ""} = $$props;
  let {helperText = ""} = $$props;
  let {label = ""} = $$props;
  let {id = "ccs-" + Math.random().toString(36)} = $$props;
  let {name = void 0} = $$props;
  let {inputRef = null} = $$props;
  const dispatch = createEventDispatcher();
  let multiSelectRef = null;
  let inputValue = "";
  let initialSorted = false;
  let highlightedIndex = -1;
  let prevChecked = [];
  setContext("MultiSelect", {
    declareRef: ({key, ref}) => {
    }
  });
  function sort() {
    return [
      ...checked.length > 1 ? checked.sort(sortItem) : checked,
      ...unchecked.sort(sortItem)
    ];
  }
  afterUpdate(() => {
    if (checked.length !== prevChecked.length) {
      if (selectionFeedback === "top") {
        sortedItems = sort();
      }
      prevChecked = checked;
      selectedIds = checked.map(({id: id2}) => id2);
      dispatch("select", {
        selectedIds,
        selected: checked,
        unselected: unchecked
      });
    }
    if (!open) {
      if (!initialSorted || selectionFeedback !== "fixed") {
        sortedItems = sort();
        initialSorted = true;
      }
      highlightedIndex = -1;
      inputValue = "";
    }
    items = sortedItems;
  });
  if ($$props.items === void 0 && $$bindings.items && items !== void 0)
    $$bindings.items(items);
  if ($$props.itemToString === void 0 && $$bindings.itemToString && itemToString !== void 0)
    $$bindings.itemToString(itemToString);
  if ($$props.selectedIds === void 0 && $$bindings.selectedIds && selectedIds !== void 0)
    $$bindings.selectedIds(selectedIds);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  if ($$props.type === void 0 && $$bindings.type && type !== void 0)
    $$bindings.type(type);
  if ($$props.direction === void 0 && $$bindings.direction && direction2 !== void 0)
    $$bindings.direction(direction2);
  if ($$props.selectionFeedback === void 0 && $$bindings.selectionFeedback && selectionFeedback !== void 0)
    $$bindings.selectionFeedback(selectionFeedback);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  if ($$props.filterable === void 0 && $$bindings.filterable && filterable !== void 0)
    $$bindings.filterable(filterable);
  if ($$props.filterItem === void 0 && $$bindings.filterItem && filterItem !== void 0)
    $$bindings.filterItem(filterItem);
  if ($$props.open === void 0 && $$bindings.open && open !== void 0)
    $$bindings.open(open);
  if ($$props.light === void 0 && $$bindings.light && light !== void 0)
    $$bindings.light(light);
  if ($$props.locale === void 0 && $$bindings.locale && locale !== void 0)
    $$bindings.locale(locale);
  if ($$props.placeholder === void 0 && $$bindings.placeholder && placeholder !== void 0)
    $$bindings.placeholder(placeholder);
  if ($$props.sortItem === void 0 && $$bindings.sortItem && sortItem !== void 0)
    $$bindings.sortItem(sortItem);
  if ($$props.translateWithId === void 0 && $$bindings.translateWithId && translateWithId !== void 0)
    $$bindings.translateWithId(translateWithId);
  if ($$props.titleText === void 0 && $$bindings.titleText && titleText !== void 0)
    $$bindings.titleText(titleText);
  if ($$props.useTitleInItem === void 0 && $$bindings.useTitleInItem && useTitleInItem !== void 0)
    $$bindings.useTitleInItem(useTitleInItem);
  if ($$props.invalid === void 0 && $$bindings.invalid && invalid !== void 0)
    $$bindings.invalid(invalid);
  if ($$props.invalidText === void 0 && $$bindings.invalidText && invalidText !== void 0)
    $$bindings.invalidText(invalidText);
  if ($$props.warn === void 0 && $$bindings.warn && warn !== void 0)
    $$bindings.warn(warn);
  if ($$props.warnText === void 0 && $$bindings.warnText && warnText !== void 0)
    $$bindings.warnText(warnText);
  if ($$props.helperText === void 0 && $$bindings.helperText && helperText !== void 0)
    $$bindings.helperText(helperText);
  if ($$props.label === void 0 && $$bindings.label && label !== void 0)
    $$bindings.label(label);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.name === void 0 && $$bindings.name && name !== void 0)
    $$bindings.name(name);
  if ($$props.inputRef === void 0 && $$bindings.inputRef && inputRef !== void 0)
    $$bindings.inputRef(inputRef);
  menuId = `menu-${id}`;
  inline = type === "inline";
  ariaLabel = $$props["aria-label"] || "Choose an item";
  sortedItems = items.map((item) => ({
    ...item,
    checked: selectedIds.includes(item.id)
  }));
  checked = sortedItems.filter(({checked: checked2}) => checked2);
  unchecked = sortedItems.filter(({checked: checked2}) => !checked2);
  value = inputValue;
  filteredItems = sortedItems.filter((item) => filterItem(item, value));
  highlightedId = sortedItems[highlightedIndex] ? sortedItems[highlightedIndex].id : void 0;
  return `

<div${add_classes([
    "bx--multi-select__wrapper bx--list-box__wrapper " + (inline ? "bx--multi-select__wrapper--inline" : "") + " " + (inline ? "bx--list-box__wrapper--inline" : "") + " " + (inline && invalid ? "bx--multi-select__wrapper--inline--invalid" : "")
  ].join(" ").trim())}${add_attribute("this", multiSelectRef, 1)}>${titleText ? `<label${add_attribute("for", id, 0)}${add_classes(["bx--label " + (disabled ? "bx--label--disabled" : "")].join(" ").trim())}>${escape2(titleText)}</label>` : ``}
  ${validate_component(ListBox, "ListBox").$$render($$result, {
    "aria-label": ariaLabel,
    id,
    disabled,
    invalid,
    invalidText,
    open,
    light,
    size,
    warn,
    warnText,
    class: "bx--multi-select " + (direction2 === "top" && "bx--list-box--up") + " " + (filterable && "bx--combo-box") + "\n      " + (filterable && "bx--multi-select--filterable") + "\n      " + (invalid && "bx--multi-select--invalid") + "\n      " + (inline && "bx--multi-select--inline") + "\n      " + (checked.length > 0 && "bx--multi-select--selected")
  }, {}, {
    default: () => `${invalid ? `${validate_component(WarningFilled16, "WarningFilled16").$$render($$result, {class: "bx--list-box__invalid-icon"}, {}, {})}` : ``}
    ${!invalid && warn ? `${validate_component(WarningAltFilled16, "WarningAltFilled16").$$render($$result, {
      class: "bx--list-box__invalid-icon bx--list-box__invalid-icon--warning"
    }, {}, {})}` : ``}
    ${validate_component(ListBoxField, "ListBoxField").$$render($$result, {
      role: "button",
      tabindex: "0",
      "aria-expanded": open,
      id,
      disabled,
      translateWithId
    }, {}, {
      default: () => `${checked.length > 0 ? `${validate_component(ListBoxSelection, "ListBoxSelection").$$render($$result, {
        selectionCount: checked.length,
        translateWithId,
        disabled
      }, {}, {})}` : ``}
      ${filterable ? `<input${spread([
        $$restProps,
        {role: "combobox"},
        {tabindex: "0"},
        {autocomplete: "off"},
        {"aria-autocomplete": "list"},
        {"aria-expanded": escape2(open)},
        {
          "aria-activedescendant": escape2(highlightedId)
        },
        {"aria-disabled": escape2(disabled)},
        {"aria-controls": escape2(menuId)},
        {disabled: disabled || null},
        {placeholder: escape2(placeholder)},
        {id: escape2(id)},
        {name: escape2(name)},
        {value: escape2(inputValue)}
      ], "bx--text-input " + (inputValue === "" ? "bx--text-input--empty" : "") + " " + (light ? "bx--text-input--light" : ""))}${add_attribute("this", inputRef, 1)}>
        ${invalid ? `${validate_component(WarningFilled16, "WarningFilled16").$$render($$result, {class: "bx--list-box__invalid-icon"}, {}, {})}` : ``}
        ${inputValue ? `${validate_component(ListBoxSelection, "ListBoxSelection").$$render($$result, {translateWithId, disabled, open}, {}, {})}` : ``}
        ${validate_component(ListBoxMenuIcon, "ListBoxMenuIcon").$$render($$result, {translateWithId, open}, {}, {})}` : ``}
      ${!filterable ? `<span class="${"bx--list-box__label"}">${escape2(label)}</span>
        ${validate_component(ListBoxMenuIcon, "ListBoxMenuIcon").$$render($$result, {open, translateWithId}, {}, {})}` : ``}`
    })}
    ${open ? `${validate_component(ListBoxMenu, "ListBoxMenu").$$render($$result, {"aria-label": ariaLabel, id}, {}, {
      default: () => `${each(filterable ? filteredItems : sortedItems, (item, i) => `${validate_component(ListBoxMenuItem, "ListBoxMenuItem").$$render($$result, {
        id: item.id,
        active: item.checked,
        highlighted: highlightedIndex === i
      }, {}, {
        default: () => `${validate_component(Checkbox, "Checkbox").$$render($$result, {
          readonly: true,
          tabindex: "-1",
          id: "checkbox-" + item.id,
          title: useTitleInItem ? itemToString(item) : void 0,
          name: itemToString(item),
          labelText: itemToString(item),
          checked: item.checked,
          disabled
        }, {}, {})}
          `
      })}`)}`
    })}` : ``}`
  })}
  ${!inline && !invalid && !warn && helperText ? `<div${add_classes([
    "bx--form__helper-text " + (disabled ? "bx--form__helper-text--disabled" : "")
  ].join(" ").trim())}>${escape2(helperText)}</div>` : ``}</div>`;
});
create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let modalLabelId;
  let modalHeadingId;
  let modalBodyId;
  let ariaLabel;
  let $$restProps = compute_rest_props($$props, [
    "size",
    "open",
    "danger",
    "alert",
    "passiveModal",
    "modalHeading",
    "modalLabel",
    "modalAriaLabel",
    "iconDescription",
    "hasForm",
    "hasScrollingContent",
    "primaryButtonText",
    "primaryButtonDisabled",
    "shouldSubmitOnEnter",
    "secondaryButtonText",
    "selectorPrimaryFocus",
    "preventCloseOnClickOutside",
    "id",
    "ref"
  ]);
  let {size = void 0} = $$props;
  let {open = false} = $$props;
  let {danger = false} = $$props;
  let {alert = false} = $$props;
  let {passiveModal = false} = $$props;
  let {modalHeading = void 0} = $$props;
  let {modalLabel = void 0} = $$props;
  let {modalAriaLabel = void 0} = $$props;
  let {iconDescription = "Close the modal"} = $$props;
  let {hasForm = false} = $$props;
  let {hasScrollingContent = false} = $$props;
  let {primaryButtonText = ""} = $$props;
  let {primaryButtonDisabled = false} = $$props;
  let {shouldSubmitOnEnter = true} = $$props;
  let {secondaryButtonText = ""} = $$props;
  let {selectorPrimaryFocus = "[data-modal-primary-focus]"} = $$props;
  let {preventCloseOnClickOutside = false} = $$props;
  let {id = "ccs-" + Math.random().toString(36)} = $$props;
  let {ref = null} = $$props;
  const dispatch = createEventDispatcher();
  let buttonRef = null;
  let innerModal = null;
  let opened = false;
  function focus(element) {
    const node = (element || innerModal).querySelector(selectorPrimaryFocus) || buttonRef;
    node.focus();
  }
  onMount(() => {
    return () => {
      document.body.classList.remove("bx--body--with-modal-open");
    };
  });
  afterUpdate(() => {
    if (opened) {
      if (!open) {
        opened = false;
        dispatch("close");
        document.body.classList.remove("bx--body--with-modal-open");
      }
    } else if (open) {
      opened = true;
      focus();
      dispatch("open");
      document.body.classList.add("bx--body--with-modal-open");
    }
  });
  let alertDialogProps = {};
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  if ($$props.open === void 0 && $$bindings.open && open !== void 0)
    $$bindings.open(open);
  if ($$props.danger === void 0 && $$bindings.danger && danger !== void 0)
    $$bindings.danger(danger);
  if ($$props.alert === void 0 && $$bindings.alert && alert !== void 0)
    $$bindings.alert(alert);
  if ($$props.passiveModal === void 0 && $$bindings.passiveModal && passiveModal !== void 0)
    $$bindings.passiveModal(passiveModal);
  if ($$props.modalHeading === void 0 && $$bindings.modalHeading && modalHeading !== void 0)
    $$bindings.modalHeading(modalHeading);
  if ($$props.modalLabel === void 0 && $$bindings.modalLabel && modalLabel !== void 0)
    $$bindings.modalLabel(modalLabel);
  if ($$props.modalAriaLabel === void 0 && $$bindings.modalAriaLabel && modalAriaLabel !== void 0)
    $$bindings.modalAriaLabel(modalAriaLabel);
  if ($$props.iconDescription === void 0 && $$bindings.iconDescription && iconDescription !== void 0)
    $$bindings.iconDescription(iconDescription);
  if ($$props.hasForm === void 0 && $$bindings.hasForm && hasForm !== void 0)
    $$bindings.hasForm(hasForm);
  if ($$props.hasScrollingContent === void 0 && $$bindings.hasScrollingContent && hasScrollingContent !== void 0)
    $$bindings.hasScrollingContent(hasScrollingContent);
  if ($$props.primaryButtonText === void 0 && $$bindings.primaryButtonText && primaryButtonText !== void 0)
    $$bindings.primaryButtonText(primaryButtonText);
  if ($$props.primaryButtonDisabled === void 0 && $$bindings.primaryButtonDisabled && primaryButtonDisabled !== void 0)
    $$bindings.primaryButtonDisabled(primaryButtonDisabled);
  if ($$props.shouldSubmitOnEnter === void 0 && $$bindings.shouldSubmitOnEnter && shouldSubmitOnEnter !== void 0)
    $$bindings.shouldSubmitOnEnter(shouldSubmitOnEnter);
  if ($$props.secondaryButtonText === void 0 && $$bindings.secondaryButtonText && secondaryButtonText !== void 0)
    $$bindings.secondaryButtonText(secondaryButtonText);
  if ($$props.selectorPrimaryFocus === void 0 && $$bindings.selectorPrimaryFocus && selectorPrimaryFocus !== void 0)
    $$bindings.selectorPrimaryFocus(selectorPrimaryFocus);
  if ($$props.preventCloseOnClickOutside === void 0 && $$bindings.preventCloseOnClickOutside && preventCloseOnClickOutside !== void 0)
    $$bindings.preventCloseOnClickOutside(preventCloseOnClickOutside);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.ref === void 0 && $$bindings.ref && ref !== void 0)
    $$bindings.ref(ref);
  modalLabelId = `bx--modal-header__label--modal-${id}`;
  modalHeadingId = `bx--modal-header__heading--modal-${id}`;
  modalBodyId = `bx--modal-body--${id}`;
  ariaLabel = modalLabel || $$props["aria-label"] || modalAriaLabel || modalHeading;
  {
    if (alert) {
      if (passiveModal) {
        alertDialogProps.role = "alert";
      }
      if (!passiveModal) {
        alertDialogProps.role = "alertdialog";
        alertDialogProps["aria-describedby"] = modalBodyId;
      }
    }
  }
  return `<div${spread([{role: "presentation"}, {id: escape2(id)}, $$restProps], "bx--modal " + (!passiveModal ? "bx--modal-tall" : "") + " " + (open ? "is-visible" : "") + " " + (danger ? "bx--modal--danger" : ""))}${add_attribute("this", ref, 1)}><div${spread([
    {role: "dialog"},
    {tabindex: "-1"},
    alertDialogProps,
    {"aria-modal": "true"},
    {"aria-label": escape2(ariaLabel)}
  ], "bx--modal-container " + (size === "xs" ? "bx--modal-container--xs" : "") + " " + (size === "sm" ? "bx--modal-container--sm" : "") + " " + (size === "lg" ? "bx--modal-container--lg" : ""))}${add_attribute("this", innerModal, 1)}><div${add_classes(["bx--modal-header"].join(" ").trim())}>${passiveModal ? `<button type="${"button"}"${add_attribute("aria-label", iconDescription, 0)}${add_attribute("title", iconDescription, 0)}${add_classes(["bx--modal-close"].join(" ").trim())}${add_attribute("this", buttonRef, 1)}>${validate_component(Close20, "Close20").$$render($$result, {
    "aria-label": iconDescription,
    class: "bx--modal-close__icon"
  }, {}, {})}</button>` : ``}
      ${modalLabel ? `<h2${add_attribute("id", modalLabelId, 0)}${add_classes(["bx--modal-header__label"].join(" ").trim())}>${slots.label ? slots.label({}) : `${escape2(modalLabel)}`}</h2>` : ``}
      <h3${add_attribute("id", modalHeadingId, 0)}${add_classes(["bx--modal-header__heading"].join(" ").trim())}>${slots.heading ? slots.heading({}) : `${escape2(modalHeading)}`}</h3>
      ${!passiveModal ? `<button type="${"button"}"${add_attribute("aria-label", iconDescription, 0)}${add_attribute("title", iconDescription, 0)}${add_classes(["bx--modal-close"].join(" ").trim())}${add_attribute("this", buttonRef, 1)}>${validate_component(Close20, "Close20").$$render($$result, {
    "aria-label": iconDescription,
    class: "bx--modal-close__icon"
  }, {}, {})}</button>` : ``}</div>
    <div${add_attribute("id", modalBodyId, 0)}${add_attribute("tabindex", hasScrollingContent ? "0" : void 0, 0)}${add_attribute("role", hasScrollingContent ? "region" : void 0, 0)}${add_attribute("aria-label", hasScrollingContent ? ariaLabel : void 0, 0)}${add_attribute("aria-labelledby", modalLabel ? modalLabelId : modalHeadingId, 0)}${add_classes([
    "bx--modal-content " + (hasForm ? "bx--modal-content--with-form" : "") + " " + (hasScrollingContent ? "bx--modal-scroll-content" : "")
  ].join(" ").trim())}>${slots.default ? slots.default({}) : ``}</div>
    ${hasScrollingContent ? `<div${add_classes(["bx--modal-content--overflow-indicator"].join(" ").trim())}></div>` : ``}
    ${!passiveModal ? `<div${add_classes(["bx--modal-footer"].join(" ").trim())}>${validate_component(Button, "Button").$$render($$result, {kind: "secondary"}, {}, {
    default: () => `${escape2(secondaryButtonText)}`
  })}
        ${validate_component(Button, "Button").$$render($$result, {
    kind: danger ? "danger" : "primary",
    disabled: primaryButtonDisabled
  }, {}, {
    default: () => `${escape2(primaryButtonText)}`
  })}</div>` : ``}</div></div>`;
});
var NotificationButton = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["notificationType", "icon", "title", "iconDescription"]);
  let {notificationType = "toast"} = $$props;
  let {icon = Close20} = $$props;
  let {title = void 0} = $$props;
  let {iconDescription = "Close icon"} = $$props;
  if ($$props.notificationType === void 0 && $$bindings.notificationType && notificationType !== void 0)
    $$bindings.notificationType(notificationType);
  if ($$props.icon === void 0 && $$bindings.icon && icon !== void 0)
    $$bindings.icon(icon);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.iconDescription === void 0 && $$bindings.iconDescription && iconDescription !== void 0)
    $$bindings.iconDescription(iconDescription);
  return `<button${spread([
    {type: "button"},
    {"aria-label": escape2(iconDescription)},
    {title: escape2(iconDescription)},
    $$restProps
  ], (notificationType === "toast" ? "bx--toast-notification__close-button" : "") + " " + (notificationType === "inline" ? "bx--inline-notification__close-button" : ""))}>${validate_component(icon || missing_component, "svelte:component").$$render($$result, {
    title,
    class: "bx--" + notificationType + "-notification__close-icon"
  }, {}, {})}</button>`;
});
var CheckmarkFilled20 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let ariaLabel;
  let ariaLabelledBy;
  let labelled;
  let attributes;
  let {class: className = void 0} = $$props;
  let {id = void 0} = $$props;
  let {tabindex = void 0} = $$props;
  let {focusable = false} = $$props;
  let {title = void 0} = $$props;
  let {style = void 0} = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.tabindex === void 0 && $$bindings.tabindex && tabindex !== void 0)
    $$bindings.tabindex(tabindex);
  if ($$props.focusable === void 0 && $$bindings.focusable && focusable !== void 0)
    $$bindings.focusable(focusable);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.style === void 0 && $$bindings.style && style !== void 0)
    $$bindings.style(style);
  ariaLabel = $$props["aria-label"];
  ariaLabelledBy = $$props["aria-labelledby"];
  labelled = ariaLabel || ariaLabelledBy || title;
  attributes = {
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    "aria-hidden": labelled ? void 0 : true,
    role: labelled ? "img" : void 0,
    focusable: tabindex === "0" ? true : focusable,
    tabindex
  };
  return `<svg${spread([
    {"data-carbon-icon": "CheckmarkFilled20"},
    {xmlns: "http://www.w3.org/2000/svg"},
    {viewBox: "0 0 20 20"},
    {fill: "currentColor"},
    {width: "20"},
    {height: "20"},
    {class: escape2(className)},
    {preserveAspectRatio: "xMidYMid meet"},
    {style: escape2(style)},
    {id: escape2(id)},
    attributes
  ])}><path d="${"M10,1c-4.9,0-9,4.1-9,9s4.1,9,9,9s9-4,9-9S15,1,10,1z M8.7,13.5l-3.2-3.2l1-1l2.2,2.2l4.8-4.8l1,1L8.7,13.5z"}"></path><path fill="${"none"}" d="${"M8.7,13.5l-3.2-3.2l1-1l2.2,2.2l4.8-4.8l1,1L8.7,13.5z"}" data-icon-path="${"inner-path"}" opacity="${"0"}"></path>${slots.default ? slots.default({}) : `
    ${title ? `<title>${escape2(title)}</title>` : ``}
  `}</svg>`;
});
var ErrorFilled20 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let ariaLabel;
  let ariaLabelledBy;
  let labelled;
  let attributes;
  let {class: className = void 0} = $$props;
  let {id = void 0} = $$props;
  let {tabindex = void 0} = $$props;
  let {focusable = false} = $$props;
  let {title = void 0} = $$props;
  let {style = void 0} = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.tabindex === void 0 && $$bindings.tabindex && tabindex !== void 0)
    $$bindings.tabindex(tabindex);
  if ($$props.focusable === void 0 && $$bindings.focusable && focusable !== void 0)
    $$bindings.focusable(focusable);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.style === void 0 && $$bindings.style && style !== void 0)
    $$bindings.style(style);
  ariaLabel = $$props["aria-label"];
  ariaLabelledBy = $$props["aria-labelledby"];
  labelled = ariaLabel || ariaLabelledBy || title;
  attributes = {
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    "aria-hidden": labelled ? void 0 : true,
    role: labelled ? "img" : void 0,
    focusable: tabindex === "0" ? true : focusable,
    tabindex
  };
  return `<svg${spread([
    {"data-carbon-icon": "ErrorFilled20"},
    {xmlns: "http://www.w3.org/2000/svg"},
    {viewBox: "0 0 20 20"},
    {fill: "currentColor"},
    {width: "20"},
    {height: "20"},
    {class: escape2(className)},
    {preserveAspectRatio: "xMidYMid meet"},
    {style: escape2(style)},
    {id: escape2(id)},
    attributes
  ])}><path d="${"M10,1c-5,0-9,4-9,9s4,9,9,9s9-4,9-9S15,1,10,1z M13.5,14.5l-8-8l1-1l8,8L13.5,14.5z"}"></path><path d="${"M13.5,14.5l-8-8l1-1l8,8L13.5,14.5z"}" data-icon-path="${"inner-path"}" opacity="${"0"}"></path>${slots.default ? slots.default({}) : `
    ${title ? `<title>${escape2(title)}</title>` : ``}
  `}</svg>`;
});
var InformationFilled20 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let ariaLabel;
  let ariaLabelledBy;
  let labelled;
  let attributes;
  let {class: className = void 0} = $$props;
  let {id = void 0} = $$props;
  let {tabindex = void 0} = $$props;
  let {focusable = false} = $$props;
  let {title = void 0} = $$props;
  let {style = void 0} = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.tabindex === void 0 && $$bindings.tabindex && tabindex !== void 0)
    $$bindings.tabindex(tabindex);
  if ($$props.focusable === void 0 && $$bindings.focusable && focusable !== void 0)
    $$bindings.focusable(focusable);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.style === void 0 && $$bindings.style && style !== void 0)
    $$bindings.style(style);
  ariaLabel = $$props["aria-label"];
  ariaLabelledBy = $$props["aria-labelledby"];
  labelled = ariaLabel || ariaLabelledBy || title;
  attributes = {
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    "aria-hidden": labelled ? void 0 : true,
    role: labelled ? "img" : void 0,
    focusable: tabindex === "0" ? true : focusable,
    tabindex
  };
  return `<svg${spread([
    {
      "data-carbon-icon": "InformationFilled20"
    },
    {xmlns: "http://www.w3.org/2000/svg"},
    {viewBox: "0 0 32 32"},
    {fill: "currentColor"},
    {width: "20"},
    {height: "20"},
    {class: escape2(className)},
    {preserveAspectRatio: "xMidYMid meet"},
    {style: escape2(style)},
    {id: escape2(id)},
    attributes
  ])}><path fill="${"none"}" d="${"M16,8a1.5,1.5,0,1,1-1.5,1.5A1.5,1.5,0,0,1,16,8Zm4,13.875H17.125v-8H13v2.25h1.875v5.75H12v2.25h8Z"}"></path><path d="${"M16,2A14,14,0,1,0,30,16,14,14,0,0,0,16,2Zm0,6a1.5,1.5,0,1,1-1.5,1.5A1.5,1.5,0,0,1,16,8Zm4,16.125H12v-2.25h2.875v-5.75H13v-2.25h4.125v8H20Z"}"></path>${slots.default ? slots.default({}) : `
    ${title ? `<title>${escape2(title)}</title>` : ``}
  `}</svg>`;
});
var InformationSquareFilled20 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let ariaLabel;
  let ariaLabelledBy;
  let labelled;
  let attributes;
  let {class: className = void 0} = $$props;
  let {id = void 0} = $$props;
  let {tabindex = void 0} = $$props;
  let {focusable = false} = $$props;
  let {title = void 0} = $$props;
  let {style = void 0} = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.tabindex === void 0 && $$bindings.tabindex && tabindex !== void 0)
    $$bindings.tabindex(tabindex);
  if ($$props.focusable === void 0 && $$bindings.focusable && focusable !== void 0)
    $$bindings.focusable(focusable);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.style === void 0 && $$bindings.style && style !== void 0)
    $$bindings.style(style);
  ariaLabel = $$props["aria-label"];
  ariaLabelledBy = $$props["aria-labelledby"];
  labelled = ariaLabel || ariaLabelledBy || title;
  attributes = {
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    "aria-hidden": labelled ? void 0 : true,
    role: labelled ? "img" : void 0,
    focusable: tabindex === "0" ? true : focusable,
    tabindex
  };
  return `<svg${spread([
    {
      "data-carbon-icon": "InformationSquareFilled20"
    },
    {xmlns: "http://www.w3.org/2000/svg"},
    {viewBox: "0 0 32 32"},
    {fill: "currentColor"},
    {width: "20"},
    {height: "20"},
    {class: escape2(className)},
    {preserveAspectRatio: "xMidYMid meet"},
    {style: escape2(style)},
    {id: escape2(id)},
    attributes
  ])}><path fill="${"none"}" d="${"M16,8a1.5,1.5,0,1,1-1.5,1.5A1.5,1.5,0,0,1,16,8Zm4,13.875H17.125v-8H13v2.25h1.875v5.75H12v2.25h8Z"}"></path><path d="${"M26,4H6A2,2,0,0,0,4,6V26a2,2,0,0,0,2,2H26a2,2,0,0,0,2-2V6A2,2,0,0,0,26,4ZM16,8a1.5,1.5,0,1,1-1.5,1.5A1.5,1.5,0,0,1,16,8Zm4,16.125H12v-2.25h2.875v-5.75H13v-2.25h4.125v8H20Z"}"></path>${slots.default ? slots.default({}) : `
    ${title ? `<title>${escape2(title)}</title>` : ``}
  `}</svg>`;
});
var WarningFilled20 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let ariaLabel;
  let ariaLabelledBy;
  let labelled;
  let attributes;
  let {class: className = void 0} = $$props;
  let {id = void 0} = $$props;
  let {tabindex = void 0} = $$props;
  let {focusable = false} = $$props;
  let {title = void 0} = $$props;
  let {style = void 0} = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.tabindex === void 0 && $$bindings.tabindex && tabindex !== void 0)
    $$bindings.tabindex(tabindex);
  if ($$props.focusable === void 0 && $$bindings.focusable && focusable !== void 0)
    $$bindings.focusable(focusable);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.style === void 0 && $$bindings.style && style !== void 0)
    $$bindings.style(style);
  ariaLabel = $$props["aria-label"];
  ariaLabelledBy = $$props["aria-labelledby"];
  labelled = ariaLabel || ariaLabelledBy || title;
  attributes = {
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    "aria-hidden": labelled ? void 0 : true,
    role: labelled ? "img" : void 0,
    focusable: tabindex === "0" ? true : focusable,
    tabindex
  };
  return `<svg${spread([
    {"data-carbon-icon": "WarningFilled20"},
    {xmlns: "http://www.w3.org/2000/svg"},
    {viewBox: "0 0 20 20"},
    {fill: "currentColor"},
    {width: "20"},
    {height: "20"},
    {class: escape2(className)},
    {preserveAspectRatio: "xMidYMid meet"},
    {style: escape2(style)},
    {id: escape2(id)},
    attributes
  ])}><path d="${"M10,1c-5,0-9,4-9,9s4,9,9,9s9-4,9-9S15,1,10,1z M9.2,5h1.5v7H9.2V5z M10,16c-0.6,0-1-0.4-1-1s0.4-1,1-1	s1,0.4,1,1S10.6,16,10,16z"}"></path><path d="${"M9.2,5h1.5v7H9.2V5z M10,16c-0.6,0-1-0.4-1-1s0.4-1,1-1s1,0.4,1,1S10.6,16,10,16z"}" data-icon-path="${"inner-path"}" opacity="${"0"}"></path>${slots.default ? slots.default({}) : `
    ${title ? `<title>${escape2(title)}</title>` : ``}
  `}</svg>`;
});
var WarningAltFilled20 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let ariaLabel;
  let ariaLabelledBy;
  let labelled;
  let attributes;
  let {class: className = void 0} = $$props;
  let {id = void 0} = $$props;
  let {tabindex = void 0} = $$props;
  let {focusable = false} = $$props;
  let {title = void 0} = $$props;
  let {style = void 0} = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.tabindex === void 0 && $$bindings.tabindex && tabindex !== void 0)
    $$bindings.tabindex(tabindex);
  if ($$props.focusable === void 0 && $$bindings.focusable && focusable !== void 0)
    $$bindings.focusable(focusable);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.style === void 0 && $$bindings.style && style !== void 0)
    $$bindings.style(style);
  ariaLabel = $$props["aria-label"];
  ariaLabelledBy = $$props["aria-labelledby"];
  labelled = ariaLabel || ariaLabelledBy || title;
  attributes = {
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    "aria-hidden": labelled ? void 0 : true,
    role: labelled ? "img" : void 0,
    focusable: tabindex === "0" ? true : focusable,
    tabindex
  };
  return `<svg${spread([
    {"data-carbon-icon": "WarningAltFilled20"},
    {xmlns: "http://www.w3.org/2000/svg"},
    {viewBox: "0 0 32 32"},
    {fill: "currentColor"},
    {width: "20"},
    {height: "20"},
    {class: escape2(className)},
    {preserveAspectRatio: "xMidYMid meet"},
    {style: escape2(style)},
    {id: escape2(id)},
    attributes
  ])}><path fill="${"none"}" d="${"M14.875,11h2.25V21h-2.25ZM16,27a1.5,1.5,0,1,1,1.5-1.5A1.5,1.5,0,0,1,16,27Z"}"></path><path d="${"M29.8872,28.5386l-13-25a1,1,0,0,0-1.7744,0l-13,25A1,1,0,0,0,3,30H29a1,1,0,0,0,.8872-1.4614ZM14.875,11h2.25V21h-2.25ZM16,27a1.5,1.5,0,1,1,1.5-1.5A1.5,1.5,0,0,1,16,27Z"}"></path>${slots.default ? slots.default({}) : `
    ${title ? `<title>${escape2(title)}</title>` : ``}
  `}</svg>`;
});
var NotificationIcon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let {kind = "error"} = $$props;
  let {notificationType = "toast"} = $$props;
  let {iconDescription = "Closes notification"} = $$props;
  const icons = {
    error: ErrorFilled20,
    "info-square": InformationSquareFilled20,
    info: InformationFilled20,
    success: CheckmarkFilled20,
    warning: WarningFilled20,
    "warning-alt": WarningAltFilled20
  };
  if ($$props.kind === void 0 && $$bindings.kind && kind !== void 0)
    $$bindings.kind(kind);
  if ($$props.notificationType === void 0 && $$bindings.notificationType && notificationType !== void 0)
    $$bindings.notificationType(notificationType);
  if ($$props.iconDescription === void 0 && $$bindings.iconDescription && iconDescription !== void 0)
    $$bindings.iconDescription(iconDescription);
  return `${validate_component(icons[kind] || missing_component, "svelte:component").$$render($$result, {
    title: iconDescription,
    class: "bx--" + notificationType + "-notification__icon"
  }, {}, {})}`;
});
var NotificationTextDetails = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let {notificationType = "toast"} = $$props;
  let {title = "Title"} = $$props;
  let {subtitle = ""} = $$props;
  let {caption = "Caption"} = $$props;
  if ($$props.notificationType === void 0 && $$bindings.notificationType && notificationType !== void 0)
    $$bindings.notificationType(notificationType);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.subtitle === void 0 && $$bindings.subtitle && subtitle !== void 0)
    $$bindings.subtitle(subtitle);
  if ($$props.caption === void 0 && $$bindings.caption && caption !== void 0)
    $$bindings.caption(caption);
  return `${notificationType === "toast" ? `<div${add_classes(["bx--toast-notification__details"].join(" ").trim())}><h3${add_classes(["bx--toast-notification__title"].join(" ").trim())}>${escape2(title)}</h3>
    <div${add_classes(["bx--toast-notification__subtitle"].join(" ").trim())}>${escape2(subtitle)}</div>
    <div${add_classes(["bx--toast-notification__caption"].join(" ").trim())}>${escape2(caption)}</div>
    ${slots.default ? slots.default({}) : ``}</div>` : ``}

${notificationType === "inline" ? `<div${add_classes(["bx--inline-notification__text-wrapper"].join(" ").trim())}><p${add_classes(["bx--inline-notification__title"].join(" ").trim())}>${escape2(title)}</p>
    <div${add_classes(["bx--inline-notification__subtitle"].join(" ").trim())}>${escape2(subtitle)}</div>
    ${slots.default ? slots.default({}) : ``}</div>` : ``}`;
});
create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, [
    "kind",
    "lowContrast",
    "timeout",
    "role",
    "title",
    "subtitle",
    "caption",
    "iconDescription",
    "hideCloseButton"
  ]);
  let {kind = "error"} = $$props;
  let {lowContrast = false} = $$props;
  let {timeout = 0} = $$props;
  let {role = "alert"} = $$props;
  let {title = ""} = $$props;
  let {subtitle = ""} = $$props;
  let {caption = ""} = $$props;
  let {iconDescription = "Closes notification"} = $$props;
  let {hideCloseButton = false} = $$props;
  const dispatch = createEventDispatcher();
  let open = true;
  let timeoutId = void 0;
  function close(closeFromTimeout) {
    open = false;
    dispatch("close", {timeout: closeFromTimeout === true});
  }
  onMount(() => {
    if (timeout) {
      timeoutId = setTimeout(() => close(true), timeout);
    }
    return () => {
      clearTimeout(timeoutId);
    };
  });
  if ($$props.kind === void 0 && $$bindings.kind && kind !== void 0)
    $$bindings.kind(kind);
  if ($$props.lowContrast === void 0 && $$bindings.lowContrast && lowContrast !== void 0)
    $$bindings.lowContrast(lowContrast);
  if ($$props.timeout === void 0 && $$bindings.timeout && timeout !== void 0)
    $$bindings.timeout(timeout);
  if ($$props.role === void 0 && $$bindings.role && role !== void 0)
    $$bindings.role(role);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.subtitle === void 0 && $$bindings.subtitle && subtitle !== void 0)
    $$bindings.subtitle(subtitle);
  if ($$props.caption === void 0 && $$bindings.caption && caption !== void 0)
    $$bindings.caption(caption);
  if ($$props.iconDescription === void 0 && $$bindings.iconDescription && iconDescription !== void 0)
    $$bindings.iconDescription(iconDescription);
  if ($$props.hideCloseButton === void 0 && $$bindings.hideCloseButton && hideCloseButton !== void 0)
    $$bindings.hideCloseButton(hideCloseButton);
  return `${open ? `<div${spread([{role: escape2(role)}, {kind: escape2(kind)}, $$restProps], "bx--toast-notification " + (lowContrast ? "bx--toast-notification--low-contrast" : "") + " " + (kind === "error" ? "bx--toast-notification--error" : "") + " " + (kind === "info" ? "bx--toast-notification--info" : "") + " " + (kind === "info-square" ? "bx--toast-notification--info-square" : "") + " " + (kind === "success" ? "bx--toast-notification--success" : "") + " " + (kind === "warning" ? "bx--toast-notification--warning" : "") + " " + (kind === "warning-alt" ? "bx--toast-notification--warning-alt" : ""))}>${validate_component(NotificationIcon, "NotificationIcon").$$render($$result, {kind, iconDescription}, {}, {})}
    ${validate_component(NotificationTextDetails, "NotificationTextDetails").$$render($$result, {title, subtitle, caption}, {}, {
    default: () => `${slots.default ? slots.default({}) : ``}`
  })}
    ${!hideCloseButton ? `${validate_component(NotificationButton, "NotificationButton").$$render($$result, {iconDescription}, {}, {})}` : ``}</div>` : ``}`;
});
create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, [
    "kind",
    "lowContrast",
    "timeout",
    "role",
    "title",
    "subtitle",
    "hideCloseButton",
    "iconDescription"
  ]);
  let {kind = "error"} = $$props;
  let {lowContrast = false} = $$props;
  let {timeout = 0} = $$props;
  let {role = "alert"} = $$props;
  let {title = ""} = $$props;
  let {subtitle = ""} = $$props;
  let {hideCloseButton = false} = $$props;
  let {iconDescription = "Closes notification"} = $$props;
  const dispatch = createEventDispatcher();
  let open = true;
  let timeoutId = void 0;
  function close(closeFromTimeout) {
    open = false;
    dispatch("close", {timeout: closeFromTimeout === true});
  }
  onMount(() => {
    if (timeout) {
      timeoutId = setTimeout(() => close(true), timeout);
    }
    return () => {
      clearTimeout(timeoutId);
    };
  });
  if ($$props.kind === void 0 && $$bindings.kind && kind !== void 0)
    $$bindings.kind(kind);
  if ($$props.lowContrast === void 0 && $$bindings.lowContrast && lowContrast !== void 0)
    $$bindings.lowContrast(lowContrast);
  if ($$props.timeout === void 0 && $$bindings.timeout && timeout !== void 0)
    $$bindings.timeout(timeout);
  if ($$props.role === void 0 && $$bindings.role && role !== void 0)
    $$bindings.role(role);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.subtitle === void 0 && $$bindings.subtitle && subtitle !== void 0)
    $$bindings.subtitle(subtitle);
  if ($$props.hideCloseButton === void 0 && $$bindings.hideCloseButton && hideCloseButton !== void 0)
    $$bindings.hideCloseButton(hideCloseButton);
  if ($$props.iconDescription === void 0 && $$bindings.iconDescription && iconDescription !== void 0)
    $$bindings.iconDescription(iconDescription);
  return `${open ? `<div${spread([{role: escape2(role)}, {kind: escape2(kind)}, $$restProps], "bx--inline-notification " + (lowContrast ? "bx--inline-notification--low-contrast" : "") + " " + (hideCloseButton ? "bx--inline-notification--hide-close-button" : "") + " " + (kind === "error" ? "bx--inline-notification--error" : "") + " " + (kind === "info" ? "bx--inline-notification--info" : "") + " " + (kind === "info-square" ? "bx--inline-notification--info-square" : "") + " " + (kind === "success" ? "bx--inline-notification--success" : "") + " " + (kind === "warning" ? "bx--inline-notification--warning" : "") + " " + (kind === "warning-alt" ? "bx--inline-notification--warning-alt" : ""))}><div${add_classes(["bx--inline-notification__details"].join(" ").trim())}>${validate_component(NotificationIcon, "NotificationIcon").$$render($$result, {
    notificationType: "inline",
    kind,
    iconDescription
  }, {}, {})}
      ${validate_component(NotificationTextDetails, "NotificationTextDetails").$$render($$result, {
    title,
    subtitle,
    notificationType: "inline"
  }, {}, {
    default: () => `${slots.default ? slots.default({}) : ``}`
  })}</div>
    ${slots.actions ? slots.actions({}) : ``}
    ${!hideCloseButton ? `${validate_component(NotificationButton, "NotificationButton").$$render($$result, {
    iconDescription,
    notificationType: "inline"
  }, {}, {})}` : ``}</div>` : ``}`;
});
create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, []);
  return `${validate_component(Button, "Button").$$render($$result, Object.assign({kind: "ghost"}, {size: "small"}, $$restProps, {
    class: "bx--inline-notification__action-button " + $$restProps.class
  }), {}, {
    default: () => `${slots.default ? slots.default({}) : ``}`
  })}`;
});
var Add16 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let ariaLabel;
  let ariaLabelledBy;
  let labelled;
  let attributes;
  let {class: className = void 0} = $$props;
  let {id = void 0} = $$props;
  let {tabindex = void 0} = $$props;
  let {focusable = false} = $$props;
  let {title = void 0} = $$props;
  let {style = void 0} = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.tabindex === void 0 && $$bindings.tabindex && tabindex !== void 0)
    $$bindings.tabindex(tabindex);
  if ($$props.focusable === void 0 && $$bindings.focusable && focusable !== void 0)
    $$bindings.focusable(focusable);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.style === void 0 && $$bindings.style && style !== void 0)
    $$bindings.style(style);
  ariaLabel = $$props["aria-label"];
  ariaLabelledBy = $$props["aria-labelledby"];
  labelled = ariaLabel || ariaLabelledBy || title;
  attributes = {
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    "aria-hidden": labelled ? void 0 : true,
    role: labelled ? "img" : void 0,
    focusable: tabindex === "0" ? true : focusable,
    tabindex
  };
  return `<svg${spread([
    {"data-carbon-icon": "Add16"},
    {xmlns: "http://www.w3.org/2000/svg"},
    {viewBox: "0 0 32 32"},
    {fill: "currentColor"},
    {width: "16"},
    {height: "16"},
    {class: escape2(className)},
    {preserveAspectRatio: "xMidYMid meet"},
    {style: escape2(style)},
    {id: escape2(id)},
    attributes
  ])}><path d="${"M17 15L17 8 15 8 15 15 8 15 8 17 15 17 15 24 17 24 17 17 24 17 24 15z"}"></path>${slots.default ? slots.default({}) : `
    ${title ? `<title>${escape2(title)}</title>` : ``}
  `}</svg>`;
});
var Subtract16 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let ariaLabel;
  let ariaLabelledBy;
  let labelled;
  let attributes;
  let {class: className = void 0} = $$props;
  let {id = void 0} = $$props;
  let {tabindex = void 0} = $$props;
  let {focusable = false} = $$props;
  let {title = void 0} = $$props;
  let {style = void 0} = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.tabindex === void 0 && $$bindings.tabindex && tabindex !== void 0)
    $$bindings.tabindex(tabindex);
  if ($$props.focusable === void 0 && $$bindings.focusable && focusable !== void 0)
    $$bindings.focusable(focusable);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.style === void 0 && $$bindings.style && style !== void 0)
    $$bindings.style(style);
  ariaLabel = $$props["aria-label"];
  ariaLabelledBy = $$props["aria-labelledby"];
  labelled = ariaLabel || ariaLabelledBy || title;
  attributes = {
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    "aria-hidden": labelled ? void 0 : true,
    role: labelled ? "img" : void 0,
    focusable: tabindex === "0" ? true : focusable,
    tabindex
  };
  return `<svg${spread([
    {"data-carbon-icon": "Subtract16"},
    {xmlns: "http://www.w3.org/2000/svg"},
    {viewBox: "0 0 32 32"},
    {fill: "currentColor"},
    {width: "16"},
    {height: "16"},
    {class: escape2(className)},
    {preserveAspectRatio: "xMidYMid meet"},
    {style: escape2(style)},
    {id: escape2(id)},
    attributes
  ])}><path d="${"M8 15H24V17H8z"}"></path>${slots.default ? slots.default({}) : `
    ${title ? `<title>${escape2(title)}</title>` : ``}
  `}</svg>`;
});
create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let incrementLabel;
  let decrementLabel;
  let error22;
  let errorId;
  let ariaLabel;
  let $$restProps = compute_rest_props($$props, [
    "size",
    "value",
    "step",
    "max",
    "min",
    "light",
    "readonly",
    "mobile",
    "allowEmpty",
    "disabled",
    "iconDescription",
    "invalid",
    "invalidText",
    "warn",
    "warnText",
    "helperText",
    "label",
    "hideLabel",
    "translateWithId",
    "translationIds",
    "id",
    "name",
    "ref"
  ]);
  let {size = void 0} = $$props;
  let {value = ""} = $$props;
  let {step = 1} = $$props;
  let {max = void 0} = $$props;
  let {min = void 0} = $$props;
  let {light = false} = $$props;
  let {readonly = false} = $$props;
  let {mobile = false} = $$props;
  let {allowEmpty = false} = $$props;
  let {disabled = false} = $$props;
  let {iconDescription = ""} = $$props;
  let {invalid = false} = $$props;
  let {invalidText = ""} = $$props;
  let {warn = false} = $$props;
  let {warnText = ""} = $$props;
  let {helperText = ""} = $$props;
  let {label = ""} = $$props;
  let {hideLabel = false} = $$props;
  let {translateWithId = (id2) => defaultTranslations[id2]} = $$props;
  const translationIds = {
    increment: "increment",
    decrement: "decrement"
  };
  let {id = "ccs-" + Math.random().toString(36)} = $$props;
  let {name = void 0} = $$props;
  let {ref = null} = $$props;
  const defaultTranslations = {
    [translationIds.increment]: "Increment number",
    [translationIds.decrement]: "Decrement number"
  };
  const dispatch = createEventDispatcher();
  afterUpdate(() => {
    dispatch("change", value);
  });
  let inputValue = value;
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  if ($$props.step === void 0 && $$bindings.step && step !== void 0)
    $$bindings.step(step);
  if ($$props.max === void 0 && $$bindings.max && max !== void 0)
    $$bindings.max(max);
  if ($$props.min === void 0 && $$bindings.min && min !== void 0)
    $$bindings.min(min);
  if ($$props.light === void 0 && $$bindings.light && light !== void 0)
    $$bindings.light(light);
  if ($$props.readonly === void 0 && $$bindings.readonly && readonly !== void 0)
    $$bindings.readonly(readonly);
  if ($$props.mobile === void 0 && $$bindings.mobile && mobile !== void 0)
    $$bindings.mobile(mobile);
  if ($$props.allowEmpty === void 0 && $$bindings.allowEmpty && allowEmpty !== void 0)
    $$bindings.allowEmpty(allowEmpty);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  if ($$props.iconDescription === void 0 && $$bindings.iconDescription && iconDescription !== void 0)
    $$bindings.iconDescription(iconDescription);
  if ($$props.invalid === void 0 && $$bindings.invalid && invalid !== void 0)
    $$bindings.invalid(invalid);
  if ($$props.invalidText === void 0 && $$bindings.invalidText && invalidText !== void 0)
    $$bindings.invalidText(invalidText);
  if ($$props.warn === void 0 && $$bindings.warn && warn !== void 0)
    $$bindings.warn(warn);
  if ($$props.warnText === void 0 && $$bindings.warnText && warnText !== void 0)
    $$bindings.warnText(warnText);
  if ($$props.helperText === void 0 && $$bindings.helperText && helperText !== void 0)
    $$bindings.helperText(helperText);
  if ($$props.label === void 0 && $$bindings.label && label !== void 0)
    $$bindings.label(label);
  if ($$props.hideLabel === void 0 && $$bindings.hideLabel && hideLabel !== void 0)
    $$bindings.hideLabel(hideLabel);
  if ($$props.translateWithId === void 0 && $$bindings.translateWithId && translateWithId !== void 0)
    $$bindings.translateWithId(translateWithId);
  if ($$props.translationIds === void 0 && $$bindings.translationIds && translationIds !== void 0)
    $$bindings.translationIds(translationIds);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.name === void 0 && $$bindings.name && name !== void 0)
    $$bindings.name(name);
  if ($$props.ref === void 0 && $$bindings.ref && ref !== void 0)
    $$bindings.ref(ref);
  incrementLabel = translateWithId("increment");
  decrementLabel = translateWithId("decrement");
  value = Number(inputValue);
  error22 = invalid || !allowEmpty && value === "" || value > max || value < min;
  errorId = `error-${id}`;
  ariaLabel = $$props["aria-label"] || "Numeric input field with increment and decrement buttons";
  return `<div${add_classes(["bx--form-item"].join(" ").trim())}><div${add_attribute("data-invalid", error22 || void 0, 0)} class="${[
    escape2(size && `bx--number--${size}`),
    "bx--number bx--number--helpertext " + (readonly ? "bx--number--readonly" : "") + " " + (light ? "bx--number--light" : "") + " " + (hideLabel ? "bx--number--nolabel" : "") + " " + (mobile ? "bx--number--mobile" : "")
  ].join(" ").trim()}">${mobile ? `${label ? `<label${add_attribute("for", id, 0)}${add_classes([
    "bx--label " + (disabled ? "bx--label--disabled" : "") + " " + (hideLabel ? "bx--visually-hidden" : "")
  ].join(" ").trim())}>${slots.label ? slots.label({}) : `${escape2(label)}`}</label>` : ``}
      <div${add_classes([
    "bx--number__input-wrapper " + (!invalid && warn ? "bx--number__input-wrapper--warning" : "")
  ].join(" ").trim())}><button type="${"button"}" aria-live="${"polite"}" aria-atomic="${"true"}"${add_attribute("title", decrementLabel, 0)}${add_attribute("aria-label", decrementLabel || iconDescription, 0)} ${disabled ? "disabled" : ""}${add_classes(["bx--number__control-btn down-icon"].join(" ").trim())}>${validate_component(Subtract16, "Subtract16").$$render($$result, {class: "down-icon"}, {}, {})}</button>
        <input${spread([
    {type: "number"},
    {pattern: "[0-9]*"},
    {
      "aria-label": escape2(label ? void 0 : ariaLabel)
    },
    {disabled: disabled || null},
    {id: escape2(id)},
    {name: escape2(name)},
    {max: escape2(max)},
    {min: escape2(min)},
    {step: escape2(step)},
    {value: escape2(value)},
    {readonly: readonly || null},
    $$restProps
  ])}${add_attribute("this", ref, 1)}>
        <button type="${"button"}" aria-live="${"polite"}" aria-atomic="${"true"}"${add_attribute("title", incrementLabel, 0)}${add_attribute("aria-label", incrementLabel || iconDescription, 0)} ${disabled ? "disabled" : ""}${add_classes(["bx--number__control-btn up-icon"].join(" ").trim())}>${validate_component(Add16, "Add16").$$render($$result, {class: "up-icon"}, {}, {})}</button></div>` : `${label ? `<label${add_attribute("for", id, 0)}${add_classes([
    "bx--label " + (disabled ? "bx--label--disabled" : "") + " " + (hideLabel ? "bx--visually-hidden" : "")
  ].join(" ").trim())}>${slots.label ? slots.label({}) : `${escape2(label)}`}</label>` : ``}
      <div${add_classes([
    "bx--number__input-wrapper " + (!invalid && warn ? "bx--number__input-wrapper--warning" : "")
  ].join(" ").trim())}><input${spread([
    {type: "number"},
    {pattern: "[0-9]*"},
    {"aria-describedby": escape2(errorId)},
    {
      "data-invalid": escape2(invalid || void 0)
    },
    {
      "aria-invalid": escape2(invalid || void 0)
    },
    {
      "aria-label": escape2(label ? void 0 : ariaLabel)
    },
    {disabled: disabled || null},
    {id: escape2(id)},
    {name: escape2(name)},
    {max: escape2(max)},
    {min: escape2(min)},
    {step: escape2(step)},
    {value: escape2(value)},
    {readonly: readonly || null},
    $$restProps
  ])}${add_attribute("this", ref, 1)}>
        ${invalid ? `${validate_component(WarningFilled16, "WarningFilled16").$$render($$result, {class: "bx--number__invalid"}, {}, {})}` : ``}
        ${!invalid && warn ? `${validate_component(WarningAltFilled16, "WarningAltFilled16").$$render($$result, {
    class: "bx--number__invalid bx--number__invalid--warning"
  }, {}, {})}` : ``}
        <div${add_classes(["bx--number__controls"].join(" ").trim())}><button type="${"button"}" tabindex="${"-1"}"${add_attribute("title", decrementLabel || iconDescription, 0)}${add_attribute("aria-label", decrementLabel || iconDescription, 0)} ${disabled ? "disabled" : ""}${add_classes(["bx--number__control-btn down-icon"].join(" ").trim())}>${validate_component(Subtract16, "Subtract16").$$render($$result, {class: "down-icon"}, {}, {})}</button>
          <div${add_classes(["bx--number__rule-divider"].join(" ").trim())}></div>
          <button type="${"button"}" tabindex="${"-1"}"${add_attribute("title", incrementLabel || iconDescription, 0)}${add_attribute("aria-label", incrementLabel || iconDescription, 0)} ${disabled ? "disabled" : ""}${add_classes(["bx--number__control-btn up-icon"].join(" ").trim())}>${validate_component(Add16, "Add16").$$render($$result, {class: "up-icon"}, {}, {})}</button>
          <div${add_classes(["bx--number__rule-divider"].join(" ").trim())}></div></div></div>`}
    ${!error22 && !warn && helperText ? `<div${add_classes([
    "bx--form__helper-text " + (disabled ? "bx--form__helper-text--disabled" : "")
  ].join(" ").trim())}>${escape2(helperText)}</div>` : ``}
    ${error22 ? `<div${add_attribute("id", errorId, 0)}${add_classes(["bx--form-requirement"].join(" ").trim())}>${escape2(invalidText)}</div>` : ``}
    ${!error22 && warn ? `<div${add_attribute("id", errorId, 0)}${add_classes(["bx--form-requirement"].join(" ").trim())}>${escape2(warnText)}</div>` : ``}</div></div>`;
});
create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["hideLabel"]);
  let {hideLabel = false} = $$props;
  if ($$props.hideLabel === void 0 && $$bindings.hideLabel && hideLabel !== void 0)
    $$bindings.hideLabel(hideLabel);
  return `<div${spread([$$restProps], "bx--form-item")}>${!hideLabel ? `<span${add_classes(["bx--label bx--skeleton"].join(" ").trim())}></span>` : ``}
  <div${add_classes(["bx--number bx--skeleton"].join(" ").trim())}></div></div>`;
});
create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["nested", "native"]);
  let {nested = false} = $$props;
  let {native = false} = $$props;
  if ($$props.nested === void 0 && $$bindings.nested && nested !== void 0)
    $$bindings.nested(nested);
  if ($$props.native === void 0 && $$bindings.native && native !== void 0)
    $$bindings.native(native);
  return `<ol${spread([$$restProps], (!native ? "bx--list--ordered" : "") + " " + (native ? "bx--list--ordered--native" : "") + " " + (nested ? "bx--list--nested" : ""))}>${slots.default ? slots.default({}) : ``}</ol>`;
});
var CaretLeft16 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let ariaLabel;
  let ariaLabelledBy;
  let labelled;
  let attributes;
  let {class: className = void 0} = $$props;
  let {id = void 0} = $$props;
  let {tabindex = void 0} = $$props;
  let {focusable = false} = $$props;
  let {title = void 0} = $$props;
  let {style = void 0} = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.tabindex === void 0 && $$bindings.tabindex && tabindex !== void 0)
    $$bindings.tabindex(tabindex);
  if ($$props.focusable === void 0 && $$bindings.focusable && focusable !== void 0)
    $$bindings.focusable(focusable);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.style === void 0 && $$bindings.style && style !== void 0)
    $$bindings.style(style);
  ariaLabel = $$props["aria-label"];
  ariaLabelledBy = $$props["aria-labelledby"];
  labelled = ariaLabel || ariaLabelledBy || title;
  attributes = {
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    "aria-hidden": labelled ? void 0 : true,
    role: labelled ? "img" : void 0,
    focusable: tabindex === "0" ? true : focusable,
    tabindex
  };
  return `<svg${spread([
    {"data-carbon-icon": "CaretLeft16"},
    {xmlns: "http://www.w3.org/2000/svg"},
    {viewBox: "0 0 32 32"},
    {fill: "currentColor"},
    {width: "16"},
    {height: "16"},
    {class: escape2(className)},
    {preserveAspectRatio: "xMidYMid meet"},
    {style: escape2(style)},
    {id: escape2(id)},
    attributes
  ])}><path d="${"M20 24L10 16 20 8z"}"></path>${slots.default ? slots.default({}) : `
    ${title ? `<title>${escape2(title)}</title>` : ``}
  `}</svg>`;
});
var Select = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let errorId;
  let $$restProps = compute_rest_props($$props, [
    "selected",
    "size",
    "inline",
    "light",
    "disabled",
    "id",
    "name",
    "invalid",
    "invalidText",
    "warn",
    "warnText",
    "helperText",
    "noLabel",
    "labelText",
    "hideLabel",
    "ref"
  ]);
  let $selectedValue, $$unsubscribe_selectedValue;
  let {selected = void 0} = $$props;
  let {size = void 0} = $$props;
  let {inline = false} = $$props;
  let {light = false} = $$props;
  let {disabled = false} = $$props;
  let {id = "ccs-" + Math.random().toString(36)} = $$props;
  let {name = void 0} = $$props;
  let {invalid = false} = $$props;
  let {invalidText = ""} = $$props;
  let {warn = false} = $$props;
  let {warnText = ""} = $$props;
  let {helperText = ""} = $$props;
  let {noLabel = false} = $$props;
  let {labelText = ""} = $$props;
  let {hideLabel = false} = $$props;
  let {ref = null} = $$props;
  const dispatch = createEventDispatcher();
  const selectedValue = writable2(selected);
  $$unsubscribe_selectedValue = subscribe(selectedValue, (value) => $selectedValue = value);
  setContext("Select", {selectedValue});
  afterUpdate(() => {
    selected = $selectedValue;
    dispatch("change", $selectedValue);
  });
  if ($$props.selected === void 0 && $$bindings.selected && selected !== void 0)
    $$bindings.selected(selected);
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  if ($$props.inline === void 0 && $$bindings.inline && inline !== void 0)
    $$bindings.inline(inline);
  if ($$props.light === void 0 && $$bindings.light && light !== void 0)
    $$bindings.light(light);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.name === void 0 && $$bindings.name && name !== void 0)
    $$bindings.name(name);
  if ($$props.invalid === void 0 && $$bindings.invalid && invalid !== void 0)
    $$bindings.invalid(invalid);
  if ($$props.invalidText === void 0 && $$bindings.invalidText && invalidText !== void 0)
    $$bindings.invalidText(invalidText);
  if ($$props.warn === void 0 && $$bindings.warn && warn !== void 0)
    $$bindings.warn(warn);
  if ($$props.warnText === void 0 && $$bindings.warnText && warnText !== void 0)
    $$bindings.warnText(warnText);
  if ($$props.helperText === void 0 && $$bindings.helperText && helperText !== void 0)
    $$bindings.helperText(helperText);
  if ($$props.noLabel === void 0 && $$bindings.noLabel && noLabel !== void 0)
    $$bindings.noLabel(noLabel);
  if ($$props.labelText === void 0 && $$bindings.labelText && labelText !== void 0)
    $$bindings.labelText(labelText);
  if ($$props.hideLabel === void 0 && $$bindings.hideLabel && hideLabel !== void 0)
    $$bindings.hideLabel(hideLabel);
  if ($$props.ref === void 0 && $$bindings.ref && ref !== void 0)
    $$bindings.ref(ref);
  errorId = `error-${id}`;
  {
    selectedValue.set(selected);
  }
  $$unsubscribe_selectedValue();
  return `<div${spread([$$restProps], "bx--form-item")}><div${add_classes([
    "bx--select " + (inline ? "bx--select--inline" : "") + " " + (light ? "bx--select--light" : "") + " " + (invalid ? "bx--select--invalid" : "") + " " + (disabled ? "bx--select--disabled" : "") + " " + (warn ? "bx--select--warning" : "")
  ].join(" ").trim())}>${!noLabel ? `<label${add_attribute("for", id, 0)}${add_classes([
    "bx--label " + (hideLabel ? "bx--visually-hidden" : "") + " " + (disabled ? "bx--label--disabled" : "")
  ].join(" ").trim())}>${escape2(labelText)}</label>` : ``}
    ${inline ? `<div${add_classes(["bx--select-input--inline__wrapper"].join(" ").trim())}><div${add_attribute("data-invalid", invalid || void 0, 0)}${add_classes(["bx--select-input__wrapper"].join(" ").trim())}><select${add_attribute("aria-describedby", invalid ? errorId : void 0, 0)}${add_attribute("aria-invalid", invalid || void 0, 0)} ${disabled || void 0 ? "disabled" : ""}${add_attribute("id", id, 0)}${add_attribute("name", name, 0)} class="${[escape2(size && `bx--select-input--${size}`), "bx--select-input"].join(" ").trim()}"${add_attribute("this", ref, 1)}>${slots.default ? slots.default({}) : ``}</select>
          ${validate_component(ChevronDown16, "ChevronDown16").$$render($$result, {class: "bx--select__arrow"}, {}, {})}
          ${invalid ? `${validate_component(WarningFilled16, "WarningFilled16").$$render($$result, {class: "bx--select__invalid-icon"}, {}, {})}` : ``}</div>
        ${invalid ? `<div${add_attribute("id", errorId, 0)}${add_classes(["bx--form-requirement"].join(" ").trim())}>${escape2(invalidText)}</div>` : ``}</div>
      ${helperText ? `<div${add_classes([
    "bx--form__helper-text " + (disabled ? "bx--form__helper-text--disabled" : "")
  ].join(" ").trim())}>${escape2(helperText)}</div>` : ``}` : ``}
    ${!inline ? `<div${add_attribute("data-invalid", invalid || void 0, 0)}${add_classes(["bx--select-input__wrapper"].join(" ").trim())}><select${add_attribute("id", id, 0)}${add_attribute("name", name, 0)}${add_attribute("aria-describedby", invalid ? errorId : void 0, 0)} ${disabled || void 0 ? "disabled" : ""}${add_attribute("aria-invalid", invalid || void 0, 0)} class="${[escape2(size && `bx--select-input--${size}`), "bx--select-input"].join(" ").trim()}"${add_attribute("this", ref, 1)}>${slots.default ? slots.default({}) : ``}</select>
        ${validate_component(ChevronDown16, "ChevronDown16").$$render($$result, {class: "bx--select__arrow"}, {}, {})}
        ${invalid ? `${validate_component(WarningFilled16, "WarningFilled16").$$render($$result, {class: "bx--select__invalid-icon"}, {}, {})}` : ``}
        ${!invalid && warn ? `${validate_component(WarningAltFilled16, "WarningAltFilled16").$$render($$result, {
    class: "bx--select__invalid-icon bx--select__invalid-icon--warning"
  }, {}, {})}` : ``}</div>
      ${!invalid && helperText ? `<div${add_classes([
    "bx--form__helper-text " + (disabled ? "bx--form__helper-text--disabled" : "")
  ].join(" ").trim())}>${escape2(helperText)}</div>` : ``}
      ${invalid ? `<div${add_attribute("id", errorId, 0)}${add_classes(["bx--form-requirement"].join(" ").trim())}>${escape2(invalidText)}</div>` : ``}
      ${!invalid && warn ? `<div${add_attribute("id", errorId, 0)}${add_classes(["bx--form-requirement"].join(" ").trim())}>${escape2(warnText)}</div>` : ``}` : ``}</div></div>`;
});
var SelectItem = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["value", "text", "hidden", "disabled"]);
  let {value = ""} = $$props;
  let {text = ""} = $$props;
  let {hidden = false} = $$props;
  let {disabled = false} = $$props;
  const ctx = getContext("Select") || getContext("TimePickerSelect");
  let selected = false;
  const unsubscribe = ctx.selectedValue.subscribe((currentValue) => {
    selected = currentValue === value;
  });
  onDestroy(() => {
    unsubscribe();
  });
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  if ($$props.text === void 0 && $$bindings.text && text !== void 0)
    $$bindings.text(text);
  if ($$props.hidden === void 0 && $$bindings.hidden && hidden !== void 0)
    $$bindings.hidden(hidden);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  return `<option${add_attribute("value", value, 0)} ${disabled ? "disabled" : ""} ${hidden ? "hidden" : ""} ${selected ? "selected" : ""} class="${[escape2($$restProps.class), "bx--select-option"].join(" ").trim()}"${add_attribute("style", $$restProps.style, 0)}>${escape2(text || value)}</option>`;
});
create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let totalPages;
  let selectItems;
  let backButtonDisabled;
  let forwardButtonDisabled;
  let $$restProps = compute_rest_props($$props, [
    "page",
    "totalItems",
    "disabled",
    "forwardText",
    "backwardText",
    "itemsPerPageText",
    "itemText",
    "itemRangeText",
    "pageInputDisabled",
    "pageSizeInputDisabled",
    "pageSize",
    "pageSizes",
    "pagesUnknown",
    "pageText",
    "pageRangeText",
    "id"
  ]);
  let {page = 1} = $$props;
  let {totalItems = 0} = $$props;
  let {disabled = false} = $$props;
  let {forwardText = "Next page"} = $$props;
  let {backwardText = "Previous page"} = $$props;
  let {itemsPerPageText = "Items per page:"} = $$props;
  let {itemText = (min, max) => `${min}\u2013${max} items`} = $$props;
  let {itemRangeText = (min, max, total) => `${min}\u2013${max} of ${total} items`} = $$props;
  let {pageInputDisabled = false} = $$props;
  let {pageSizeInputDisabled = false} = $$props;
  let {pageSize = 10} = $$props;
  let {pageSizes = [10]} = $$props;
  let {pagesUnknown = false} = $$props;
  let {pageText = (page2) => `page ${page2}`} = $$props;
  let {pageRangeText = (current, total) => `of ${total} page${total === 1 ? "" : "s"}`} = $$props;
  let {id = "ccs-" + Math.random().toString(36)} = $$props;
  const dispatch = createEventDispatcher();
  if ($$props.page === void 0 && $$bindings.page && page !== void 0)
    $$bindings.page(page);
  if ($$props.totalItems === void 0 && $$bindings.totalItems && totalItems !== void 0)
    $$bindings.totalItems(totalItems);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  if ($$props.forwardText === void 0 && $$bindings.forwardText && forwardText !== void 0)
    $$bindings.forwardText(forwardText);
  if ($$props.backwardText === void 0 && $$bindings.backwardText && backwardText !== void 0)
    $$bindings.backwardText(backwardText);
  if ($$props.itemsPerPageText === void 0 && $$bindings.itemsPerPageText && itemsPerPageText !== void 0)
    $$bindings.itemsPerPageText(itemsPerPageText);
  if ($$props.itemText === void 0 && $$bindings.itemText && itemText !== void 0)
    $$bindings.itemText(itemText);
  if ($$props.itemRangeText === void 0 && $$bindings.itemRangeText && itemRangeText !== void 0)
    $$bindings.itemRangeText(itemRangeText);
  if ($$props.pageInputDisabled === void 0 && $$bindings.pageInputDisabled && pageInputDisabled !== void 0)
    $$bindings.pageInputDisabled(pageInputDisabled);
  if ($$props.pageSizeInputDisabled === void 0 && $$bindings.pageSizeInputDisabled && pageSizeInputDisabled !== void 0)
    $$bindings.pageSizeInputDisabled(pageSizeInputDisabled);
  if ($$props.pageSize === void 0 && $$bindings.pageSize && pageSize !== void 0)
    $$bindings.pageSize(pageSize);
  if ($$props.pageSizes === void 0 && $$bindings.pageSizes && pageSizes !== void 0)
    $$bindings.pageSizes(pageSizes);
  if ($$props.pagesUnknown === void 0 && $$bindings.pagesUnknown && pagesUnknown !== void 0)
    $$bindings.pagesUnknown(pagesUnknown);
  if ($$props.pageText === void 0 && $$bindings.pageText && pageText !== void 0)
    $$bindings.pageText(pageText);
  if ($$props.pageRangeText === void 0 && $$bindings.pageRangeText && pageRangeText !== void 0)
    $$bindings.pageRangeText(pageRangeText);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    {
      {
        if (typeof page !== "number") {
          page = Number(page);
        }
        if (typeof pageSize !== "number") {
          pageSize = Number(pageSize);
        }
        dispatch("update", {pageSize, page});
      }
    }
    totalPages = Math.max(Math.ceil(totalItems / pageSize), 1);
    selectItems = Array.from({length: totalPages}, (_, i) => i);
    backButtonDisabled = disabled || page === 1;
    forwardButtonDisabled = disabled || page === totalPages;
    $$rendered = `<div${spread([{id: escape2(id)}, $$restProps], "bx--pagination")}><div${add_classes(["bx--pagination__left"].join(" ").trim())}>${!pageSizeInputDisabled ? `<label id="${"bx--pagination-select-" + escape2(id) + "-count-label"}" for="${"bx--pagination-select-" + escape2(id)}"${add_classes(["bx--pagination__text"].join(" ").trim())}>${escape2(itemsPerPageText)}</label>
      ${validate_component(Select, "Select").$$render($$result, {
      id: "bx--pagination-select-" + id,
      class: "bx--select__item-count",
      hideLabel: true,
      noLabel: true,
      inline: true,
      selected: pageSize
    }, {
      selected: ($$value) => {
        pageSize = $$value;
        $$settled = false;
      }
    }, {
      default: () => `${each(pageSizes, (size, i) => `${validate_component(SelectItem, "SelectItem").$$render($$result, {value: size, text: size.toString()}, {}, {})}`)}`
    })}` : ``}
    <span${add_classes([!pageSizeInputDisabled ? "bx--pagination__text" : ""].join(" ").trim())}>${pagesUnknown ? `${escape2(itemText(pageSize * (page - 1) + 1, page * pageSize))}` : `${escape2(itemRangeText(Math.min(pageSize * (page - 1) + 1, totalItems), Math.min(page * pageSize, totalItems), totalItems))}`}</span></div>
  <div${add_classes(["bx--pagination__right"].join(" ").trim())}>${!pageInputDisabled ? `${validate_component(Select, "Select").$$render($$result, {
      id: "bx--pagination-select-" + (id + 2),
      class: "bx--select__page-number",
      labelText: "Page number, of " + totalPages + " pages",
      inline: true,
      hideLabel: true,
      selected: page
    }, {
      selected: ($$value) => {
        page = $$value;
        $$settled = false;
      }
    }, {
      default: () => `${each(selectItems, (size, i) => `${validate_component(SelectItem, "SelectItem").$$render($$result, {
        value: size + 1,
        text: (size + 1).toString()
      }, {}, {})}`)}`
    })}
      <span${add_classes(["bx--pagination__text"].join(" ").trim())}>${pagesUnknown ? `${escape2(pageText(page))}` : `${escape2(pageRangeText(page, totalPages))}`}</span>` : ``}
    ${validate_component(Button, "Button").$$render($$result, {
      hasIconOnly: true,
      kind: "ghost",
      tooltipAlignment: "center",
      tooltipPosition: "top",
      icon: CaretLeft16,
      iconDescription: backwardText,
      disabled: backButtonDisabled,
      class: "bx--pagination__button bx--pagination__button--backward " + (backButtonDisabled ? "bx--pagination__button--no-index" : "")
    }, {}, {})}
    ${validate_component(Button, "Button").$$render($$result, {
      hasIconOnly: true,
      kind: "ghost",
      tooltipAlignment: "end",
      tooltipPosition: "top",
      icon: CaretRight16,
      iconDescription: forwardText,
      disabled: forwardButtonDisabled,
      class: "bx--pagination__button bx--pagination__button--forward " + (forwardButtonDisabled ? "bx--pagination__button--no-index" : "")
    }, {}, {})}</div></div>`;
  } while (!$$settled);
  return $$rendered;
});
create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, []);
  return `<div${spread([$$restProps], "bx--pagination bx--skeleton")}><div${add_classes(["bx--pagination__left"].join(" ").trim())}>${validate_component(SkeletonText, "SkeletonText").$$render($$result, {width: "70px"}, {}, {})}
    ${validate_component(SkeletonText, "SkeletonText").$$render($$result, {width: "35px"}, {}, {})}
    ${validate_component(SkeletonText, "SkeletonText").$$render($$result, {width: "105px"}, {}, {})}</div>
  <div${add_classes([
    "bx--pagination__right bx--pagination--inline"
  ].join(" ").trim())}>${validate_component(SkeletonText, "SkeletonText").$$render($$result, {width: "70px"}, {}, {})}</div></div>`;
});
var PaginationItem = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let {page = 0} = $$props;
  let {active = false} = $$props;
  if ($$props.page === void 0 && $$bindings.page && page !== void 0)
    $$bindings.page(page);
  if ($$props.active === void 0 && $$bindings.active && active !== void 0)
    $$bindings.active(active);
  return `<li${add_classes(["bx--pagination-nav__list-item"].join(" ").trim())}><button${add_attribute("data-page", page, 0)}${add_attribute("aria-current", active ? "page" : void 0, 0)}${add_classes([
    "bx--pagination-nav__page " + (active ? "bx--pagination-nav__page--active" : "")
  ].join(" ").trim())}><span${add_classes(["bx--pagination-nav__accessibility-label"].join(" ").trim())}>${slots.default ? slots.default({}) : ``}</span>
    ${escape2(page)}</button></li>`;
});
var PaginationOverflow = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let {fromIndex = 0} = $$props;
  let {count = 0} = $$props;
  createEventDispatcher();
  let value = "";
  if ($$props.fromIndex === void 0 && $$bindings.fromIndex && fromIndex !== void 0)
    $$bindings.fromIndex(fromIndex);
  if ($$props.count === void 0 && $$bindings.count && count !== void 0)
    $$bindings.count(count);
  return `${count > 1 ? `<li${add_classes(["bx--pagination-nav__list-item"].join(" ").trim())}><div${add_classes(["bx--pagination-nav__select"].join(" ").trim())}>
      <select aria-label="${"Select Page number"}"${add_attribute("value", value, 0)}${add_classes([
    "bx--pagination-nav__page bx--pagination-nav__page--select"
  ].join(" ").trim())}><option value="${""}" hidden></option>${each(Array.from({length: count}, (_, i) => i), (i) => `<option${add_attribute("value", fromIndex + i, 0)}${add_attribute("data-page", fromIndex + i + 1, 0)}>${escape2(fromIndex + i + 1)}
          </option>`)}</select>
      <div${add_classes(["bx--pagination-nav__select-icon-wrapper"].join(" ").trim())}>${validate_component(OverflowMenuHorizontal16, "OverflowMenuHorizontal16").$$render($$result, {class: "bx--pagination-nav__select-icon"}, {}, {})}</div></div></li>` : `${count === 1 ? `${validate_component(PaginationItem, "PaginationItem").$$render($$result, {page: fromIndex + 1}, {}, {
    default: () => `Page
  `
  })}` : ``}`}`;
});
var MIN = 4;
create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let fit;
  let startOffset;
  let items;
  let $$restProps = compute_rest_props($$props, ["page", "total", "shown", "loop", "forwardText", "backwardText"]);
  let {page = 0} = $$props;
  let {total = 10} = $$props;
  let {shown = 10} = $$props;
  let {loop = false} = $$props;
  let {forwardText = "Next page"} = $$props;
  let {backwardText = "Previous page"} = $$props;
  const dispatch = createEventDispatcher();
  afterUpdate(() => {
    dispatch("change", {page});
  });
  let front = 0;
  let back = 0;
  if ($$props.page === void 0 && $$bindings.page && page !== void 0)
    $$bindings.page(page);
  if ($$props.total === void 0 && $$bindings.total && total !== void 0)
    $$bindings.total(total);
  if ($$props.shown === void 0 && $$bindings.shown && shown !== void 0)
    $$bindings.shown(shown);
  if ($$props.loop === void 0 && $$bindings.loop && loop !== void 0)
    $$bindings.loop(loop);
  if ($$props.forwardText === void 0 && $$bindings.forwardText && forwardText !== void 0)
    $$bindings.forwardText(forwardText);
  if ($$props.backwardText === void 0 && $$bindings.backwardText && backwardText !== void 0)
    $$bindings.backwardText(backwardText);
  fit = shown >= MIN ? shown : MIN;
  startOffset = fit <= MIN && page > 1 ? 0 : 1;
  {
    if (fit >= total) {
      front = 0;
      back = 0;
    }
  }
  {
    if (fit < total) {
      const split = Math.ceil(fit / 2) - 1;
      front = page - split + 1;
      back = total - page - (fit - split) + 1;
      if (front <= 1) {
        back -= front <= 0 ? Math.abs(front) + 1 : 0;
        front = 0;
      }
      if (back <= 1) {
        front -= back <= 0 ? Math.abs(back) + 1 : 0;
        back = 0;
      }
    }
  }
  items = Array.from({length: total}).map((e, i) => i).slice(startOffset + front, (back + 1) * -1);
  return `<nav${spread([{"aria-label": "pagination"}, $$restProps], "bx--pagination-nav")}><ul${add_classes(["bx--pagination-nav__list"].join(" ").trim())}><li${add_classes(["bx--pagination-nav__list-item"].join(" ").trim())}>${validate_component(Button, "Button").$$render($$result, {
    hasIconOnly: true,
    kind: "ghost",
    tooltipAlignment: "center",
    tooltipPosition: "bottom",
    iconDescription: backwardText,
    disabled: !loop && page === 0,
    icon: CaretLeft16
  }, {}, {})}</li>
    ${fit > MIN || fit <= MIN && page <= 1 ? `${validate_component(PaginationItem, "PaginationItem").$$render($$result, {page: 1, active: page === 0}, {}, {
    default: () => `${escape2(page === 0 ? "Active, Page" : "Page")}`
  })}` : ``}
    ${validate_component(PaginationOverflow, "PaginationOverflow").$$render($$result, {fromIndex: startOffset, count: front}, {}, {})}
    ${each(items, (item) => `${validate_component(PaginationItem, "PaginationItem").$$render($$result, {page: item + 1, active: page === item}, {}, {
    default: () => `${escape2(page === item ? "Active, Page" : "Page")}
      `
  })}`)}
    ${validate_component(PaginationOverflow, "PaginationOverflow").$$render($$result, {fromIndex: total - back - 1, count: back}, {}, {})}
    ${total > 1 ? `${validate_component(PaginationItem, "PaginationItem").$$render($$result, {page: total, active: page === total - 1}, {}, {
    default: () => `${escape2(page === total - 1 ? "Active, Page" : "Page")}`
  })}` : ``}
    <li${add_classes(["bx--pagination-nav__list-item"].join(" ").trim())}>${validate_component(Button, "Button").$$render($$result, {
    hasIconOnly: true,
    kind: "ghost",
    tooltipAlignment: "center",
    tooltipPosition: "bottom",
    iconDescription: forwardText,
    disabled: !loop && page === total - 1,
    icon: CaretRight16
  }, {}, {})}</li></ul>
  <div aria-live="${"polite"}" aria-atomic="${"true"}"${add_classes(["bx--pagination-nav__accessibility-label"].join(" ").trim())}>Page
    ${escape2(page + 1)}
    of
    ${escape2(total)}</div></nav>`;
});
create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["open", "closeOnOutsideClick", "caret", "align", "light", "highContrast", "relative"]);
  let {open = false} = $$props;
  let {closeOnOutsideClick = false} = $$props;
  let {caret = false} = $$props;
  let {align = "top"} = $$props;
  let {light = false} = $$props;
  let {highContrast = false} = $$props;
  let {relative = false} = $$props;
  createEventDispatcher();
  let ref = null;
  if ($$props.open === void 0 && $$bindings.open && open !== void 0)
    $$bindings.open(open);
  if ($$props.closeOnOutsideClick === void 0 && $$bindings.closeOnOutsideClick && closeOnOutsideClick !== void 0)
    $$bindings.closeOnOutsideClick(closeOnOutsideClick);
  if ($$props.caret === void 0 && $$bindings.caret && caret !== void 0)
    $$bindings.caret(caret);
  if ($$props.align === void 0 && $$bindings.align && align !== void 0)
    $$bindings.align(align);
  if ($$props.light === void 0 && $$bindings.light && light !== void 0)
    $$bindings.light(light);
  if ($$props.highContrast === void 0 && $$bindings.highContrast && highContrast !== void 0)
    $$bindings.highContrast(highContrast);
  if ($$props.relative === void 0 && $$bindings.relative && relative !== void 0)
    $$bindings.relative(relative);
  return `

<div${spread([$$restProps], "bx--popover " + (caret ? "bx--popover--caret" : "") + " " + (light ? "bx--popover--light" : "") + " " + (highContrast ? "bx--popover--high-contrast" : "") + " " + (align === "top" ? "bx--popover--top" : "") + " " + (align === "top-left" ? "bx--popover--top-left" : "") + " " + (align === "top-right" ? "bx--popover--top-right" : "") + " " + (align === "bottom" ? "bx--popover--bottom" : "") + " " + (align === "bottom-left" ? "bx--popover--bottom-left" : "") + " " + (align === "bottom-right" ? "bx--popover--bottom-right" : "") + " " + (align === "left" ? "bx--popover--left" : "") + " " + (align === "left-bottom" ? "bx--popover--left-bottom" : "") + " " + (align === "left-top" ? "bx--popover--left-top" : "") + " " + (align === "right" ? "bx--popover--right" : "") + " " + (align === "right-bottom" ? "bx--popover--right-bottom" : "") + " " + (align === "right-top" ? "bx--popover--right-top" : "") + " " + (open ? "bx--popover--open" : "") + " " + (relative ? "bx--popover--relative" : ""))}${add_attribute("this", ref, 1)}><div${add_classes(["bx--popover-contents"].join(" ").trim())}>${slots.default ? slots.default({}) : ``}</div></div>`;
});
create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["currentIndex", "vertical", "spaceEqually", "preventChangeOnClick"]);
  let $stepsById, $$unsubscribe_stepsById;
  let {currentIndex = 0} = $$props;
  let {vertical = false} = $$props;
  let {spaceEqually = false} = $$props;
  let {preventChangeOnClick = false} = $$props;
  const dispatch = createEventDispatcher();
  const steps = writable2([]);
  const stepsById = derived(steps, ($) => $.reduce((a, c) => ({...a, [c.id]: c}), {}));
  $$unsubscribe_stepsById = subscribe(stepsById, (value) => $stepsById = value);
  setContext("ProgressIndicator", {
    steps,
    stepsById,
    add: (step) => {
      steps.update((_) => {
        if (step.id in $stepsById) {
          return _.map((_step) => {
            if (_step.id === step.id)
              return {..._step, ...step};
            return _step;
          });
        }
        return [
          ..._,
          {
            ...step,
            index: _.length,
            current: _.length === currentIndex,
            complete: step.complete
          }
        ];
      });
    },
    change: (index2) => {
      if (preventChangeOnClick)
        return;
      currentIndex = index2;
      dispatch("change", index2);
    }
  });
  if ($$props.currentIndex === void 0 && $$bindings.currentIndex && currentIndex !== void 0)
    $$bindings.currentIndex(currentIndex);
  if ($$props.vertical === void 0 && $$bindings.vertical && vertical !== void 0)
    $$bindings.vertical(vertical);
  if ($$props.spaceEqually === void 0 && $$bindings.spaceEqually && spaceEqually !== void 0)
    $$bindings.spaceEqually(spaceEqually);
  if ($$props.preventChangeOnClick === void 0 && $$bindings.preventChangeOnClick && preventChangeOnClick !== void 0)
    $$bindings.preventChangeOnClick(preventChangeOnClick);
  {
    steps.update((_) => _.map((step, i) => ({...step, current: i === currentIndex})));
  }
  $$unsubscribe_stepsById();
  return `<ul${spread([$$restProps], "bx--progress " + (vertical ? "bx--progress--vertical" : "") + " " + (spaceEqually && !vertical ? "bx--progress--space-equal" : ""))}>${slots.default ? slots.default({}) : ``}</ul>`;
});
create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["vertical", "count"]);
  let {vertical = false} = $$props;
  let {count = 4} = $$props;
  if ($$props.vertical === void 0 && $$bindings.vertical && vertical !== void 0)
    $$bindings.vertical(vertical);
  if ($$props.count === void 0 && $$bindings.count && count !== void 0)
    $$bindings.count(count);
  return `<ul${spread([$$restProps], "bx--progress " + (vertical ? "bx--progress--vertical" : "") + " bx--skeleton")}>${each(Array.from({length: count}, (_, i) => i), (item, i) => `<li${add_classes([
    "bx--progress-step bx--progress-step--incomplete"
  ].join(" ").trim())}><div${add_classes([
    "bx--progress-step-button bx--progress-step-button--unclickable"
  ].join(" ").trim())}><svg><path d="${"M 7, 7 m -7, 0 a 7,7 0 1,0 14,0 a 7,7 0 1,0 -14,0"}"></path></svg>
        <p${add_classes(["bx--progress-label"].join(" ").trim())}></p>
        <span${add_classes(["bx--progress-line"].join(" ").trim())}></span></div>
    </li>`)}</ul>`;
});
var CheckmarkOutline16 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let ariaLabel;
  let ariaLabelledBy;
  let labelled;
  let attributes;
  let {class: className = void 0} = $$props;
  let {id = void 0} = $$props;
  let {tabindex = void 0} = $$props;
  let {focusable = false} = $$props;
  let {title = void 0} = $$props;
  let {style = void 0} = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.tabindex === void 0 && $$bindings.tabindex && tabindex !== void 0)
    $$bindings.tabindex(tabindex);
  if ($$props.focusable === void 0 && $$bindings.focusable && focusable !== void 0)
    $$bindings.focusable(focusable);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.style === void 0 && $$bindings.style && style !== void 0)
    $$bindings.style(style);
  ariaLabel = $$props["aria-label"];
  ariaLabelledBy = $$props["aria-labelledby"];
  labelled = ariaLabel || ariaLabelledBy || title;
  attributes = {
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    "aria-hidden": labelled ? void 0 : true,
    role: labelled ? "img" : void 0,
    focusable: tabindex === "0" ? true : focusable,
    tabindex
  };
  return `<svg${spread([
    {"data-carbon-icon": "CheckmarkOutline16"},
    {xmlns: "http://www.w3.org/2000/svg"},
    {viewBox: "0 0 32 32"},
    {fill: "currentColor"},
    {width: "16"},
    {height: "16"},
    {class: escape2(className)},
    {preserveAspectRatio: "xMidYMid meet"},
    {style: escape2(style)},
    {id: escape2(id)},
    attributes
  ])}><path d="${"M14 21.414L9 16.413 10.413 15 14 18.586 21.585 11 23 12.415 14 21.414z"}"></path><path d="${"M16,2A14,14,0,1,0,30,16,14,14,0,0,0,16,2Zm0,26A12,12,0,1,1,28,16,12,12,0,0,1,16,28Z"}"></path>${slots.default ? slots.default({}) : `
    ${title ? `<title>${escape2(title)}</title>` : ``}
  `}</svg>`;
});
var Warning16 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let ariaLabel;
  let ariaLabelledBy;
  let labelled;
  let attributes;
  let {class: className = void 0} = $$props;
  let {id = void 0} = $$props;
  let {tabindex = void 0} = $$props;
  let {focusable = false} = $$props;
  let {title = void 0} = $$props;
  let {style = void 0} = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.tabindex === void 0 && $$bindings.tabindex && tabindex !== void 0)
    $$bindings.tabindex(tabindex);
  if ($$props.focusable === void 0 && $$bindings.focusable && focusable !== void 0)
    $$bindings.focusable(focusable);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.style === void 0 && $$bindings.style && style !== void 0)
    $$bindings.style(style);
  ariaLabel = $$props["aria-label"];
  ariaLabelledBy = $$props["aria-labelledby"];
  labelled = ariaLabel || ariaLabelledBy || title;
  attributes = {
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    "aria-hidden": labelled ? void 0 : true,
    role: labelled ? "img" : void 0,
    focusable: tabindex === "0" ? true : focusable,
    tabindex
  };
  return `<svg${spread([
    {"data-carbon-icon": "Warning16"},
    {xmlns: "http://www.w3.org/2000/svg"},
    {viewBox: "0 0 16 16"},
    {fill: "currentColor"},
    {width: "16"},
    {height: "16"},
    {class: escape2(className)},
    {preserveAspectRatio: "xMidYMid meet"},
    {style: escape2(style)},
    {id: escape2(id)},
    attributes
  ])}><path d="${"M8,1C4.1,1,1,4.1,1,8s3.1,7,7,7s7-3.1,7-7S11.9,1,8,1z M8,14c-3.3,0-6-2.7-6-6s2.7-6,6-6s6,2.7,6,6S11.3,14,8,14z"}"></path><path d="${"M7.5 4H8.5V9H7.5zM8 10.2c-.4 0-.8.3-.8.8s.3.8.8.8c.4 0 .8-.3.8-.8S8.4 10.2 8 10.2z"}"></path>${slots.default ? slots.default({}) : `
    ${title ? `<title>${escape2(title)}</title>` : ``}
  `}</svg>`;
});
create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, [
    "complete",
    "current",
    "disabled",
    "invalid",
    "description",
    "label",
    "secondaryLabel",
    "id"
  ]);
  let {complete = false} = $$props;
  let {current = false} = $$props;
  let {disabled = false} = $$props;
  let {invalid = false} = $$props;
  let {description = ""} = $$props;
  let {label = ""} = $$props;
  let {secondaryLabel = ""} = $$props;
  let {id = "ccs-" + Math.random().toString(36)} = $$props;
  let step = {};
  const {stepsById, add, change} = getContext("ProgressIndicator");
  const unsubscribe = stepsById.subscribe((value) => {
    if (value[id]) {
      step = value[id];
      current = step.current;
      complete = step.complete;
    }
  });
  onMount(() => {
    return () => {
      unsubscribe();
    };
  });
  if ($$props.complete === void 0 && $$bindings.complete && complete !== void 0)
    $$bindings.complete(complete);
  if ($$props.current === void 0 && $$bindings.current && current !== void 0)
    $$bindings.current(current);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  if ($$props.invalid === void 0 && $$bindings.invalid && invalid !== void 0)
    $$bindings.invalid(invalid);
  if ($$props.description === void 0 && $$bindings.description && description !== void 0)
    $$bindings.description(description);
  if ($$props.label === void 0 && $$bindings.label && label !== void 0)
    $$bindings.label(label);
  if ($$props.secondaryLabel === void 0 && $$bindings.secondaryLabel && secondaryLabel !== void 0)
    $$bindings.secondaryLabel(secondaryLabel);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  {
    add({id, complete, disabled});
  }
  return `<li${spread([{"aria-disabled": escape2(disabled)}, {id: escape2(id)}, $$restProps], "bx--progress-step " + (current ? "bx--progress-step--current" : "") + " " + (complete ? "bx--progress-step--complete" : "") + " " + (!complete && !current ? "bx--progress-step--incomplete" : "") + " " + (disabled ? "bx--progress-step--disabled" : ""))}><button ${disabled ? "disabled" : ""}${add_attribute("aria-disabled", disabled, 0)}${add_attribute("tabindex", !current && !disabled ? "0" : "-1", 0)}${add_classes([
    "bx--progress-step-button " + (current ? "bx--progress-step-button--unclickable" : "")
  ].join(" ").trim())}>${invalid ? `${validate_component(Warning16, "Warning16").$$render($$result, {
    class: "bx--progress__warning",
    title: description
  }, {}, {})}` : `${current ? `<svg><path d="${"M 7, 7 m -7, 0 a 7,7 0 1,0 14,0 a 7,7 0 1,0 -14,0"}"></path><title>${escape2(description)}</title></svg>` : `${complete ? `${validate_component(CheckmarkOutline16, "CheckmarkOutline16").$$render($$result, {title: description}, {}, {})}` : `<svg><title>${escape2(description)}</title><path d="${"M8 1C4.1 1 1 4.1 1 8s3.1 7 7 7 7-3.1 7-7-3.1-7-7-7zm0 13c-3.3\n          0-6-2.7-6-6s2.7-6 6-6 6 2.7 6 6-2.7 6-6 6z"}"></path></svg>`}`}`}
    ${slots.default ? slots.default({props: {class: "bx--progress-label"}}) : `
      <p${add_classes(["bx--progress-label"].join(" ").trim())}>${escape2(label)}</p>
    `}
    ${secondaryLabel ? `<p${add_classes(["bx--progress-optional"].join(" ").trim())}>${escape2(secondaryLabel)}</p>` : ``}
    <span${add_classes(["bx--progress-line"].join(" ").trim())}></span></button></li>`;
});
create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["selected", "disabled", "legendText", "labelPosition", "orientation", "id"]);
  let $$slots = compute_slots(slots);
  let $selectedValue, $$unsubscribe_selectedValue;
  let {selected = void 0} = $$props;
  let {disabled = false} = $$props;
  let {legendText = ""} = $$props;
  let {labelPosition = "right"} = $$props;
  let {orientation = "horizontal"} = $$props;
  let {id = void 0} = $$props;
  const dispatch = createEventDispatcher();
  const selectedValue = writable2(selected);
  $$unsubscribe_selectedValue = subscribe(selectedValue, (value) => $selectedValue = value);
  setContext("RadioButtonGroup", {
    selectedValue,
    add: ({checked, value}) => {
      if (checked) {
        selectedValue.set(value);
      }
    },
    update: (value) => {
      selected = value;
    }
  });
  onMount(() => {
    set_store_value(selectedValue, $selectedValue = selected, $selectedValue);
  });
  beforeUpdate(() => {
    set_store_value(selectedValue, $selectedValue = selected, $selectedValue);
  });
  selectedValue.subscribe((value) => {
    selected = value;
    dispatch("change", value);
  });
  if ($$props.selected === void 0 && $$bindings.selected && selected !== void 0)
    $$bindings.selected(selected);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  if ($$props.legendText === void 0 && $$bindings.legendText && legendText !== void 0)
    $$bindings.legendText(legendText);
  if ($$props.labelPosition === void 0 && $$bindings.labelPosition && labelPosition !== void 0)
    $$bindings.labelPosition(labelPosition);
  if ($$props.orientation === void 0 && $$bindings.orientation && orientation !== void 0)
    $$bindings.orientation(orientation);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  $$unsubscribe_selectedValue();
  return `<div${spread([{id: escape2(id)}, $$restProps], "bx--form-item")}><fieldset ${disabled ? "disabled" : ""}${add_classes([
    "bx--radio-button-group " + (orientation === "vertical" ? "bx--radio-button-group--vertical" : "") + " " + (labelPosition === "left" ? "bx--radio-button-group--label-left" : "") + " " + (labelPosition === "right" ? "bx--radio-button-group--label-right" : "")
  ].join(" ").trim())}>${legendText || $$slots.legendText ? `<legend${add_classes(["bx--label"].join(" ").trim())}>${slots.legendText ? slots.legendText({}) : `${escape2(legendText)}`}</legend>` : ``}
    ${slots.default ? slots.default({}) : ``}</fieldset></div>`;
});
create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["hideLabel"]);
  let {hideLabel = false} = $$props;
  if ($$props.hideLabel === void 0 && $$bindings.hideLabel && hideLabel !== void 0)
    $$bindings.hideLabel(hideLabel);
  return `<div${spread([$$restProps], "bx--form-item")}>${!hideLabel ? `<span${add_classes(["bx--label bx--skeleton"].join(" ").trim())}></span>` : ``}
  <div${add_classes(["bx--select bx--skeleton"].join(" ").trim())}><div${add_classes(["bx--select-input"].join(" ").trim())}></div></div></div>`;
});
create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["disabled", "label"]);
  let {disabled = false} = $$props;
  let {label = "Provide label"} = $$props;
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  if ($$props.label === void 0 && $$bindings.label && label !== void 0)
    $$bindings.label(label);
  return `<optgroup${spread([{label: escape2(label)}, {disabled: disabled || null}, $$restProps], "bx--select-optgroup")}>${slots.default ? slots.default({}) : ``}</optgroup>`;
});
create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, []);
  return `<div${spread([$$restProps], "bx--skeleton__placeholder")}></div>`;
});
create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let labelId;
  let range;
  let left;
  let $$restProps = compute_rest_props($$props, [
    "value",
    "max",
    "maxLabel",
    "min",
    "minLabel",
    "step",
    "stepMultiplier",
    "required",
    "inputType",
    "disabled",
    "light",
    "hideTextInput",
    "id",
    "invalid",
    "labelText",
    "name",
    "ref"
  ]);
  let {value = 0} = $$props;
  let {max = 100} = $$props;
  let {maxLabel = ""} = $$props;
  let {min = 0} = $$props;
  let {minLabel = ""} = $$props;
  let {step = 1} = $$props;
  let {stepMultiplier = 4} = $$props;
  let {required = false} = $$props;
  let {inputType = "number"} = $$props;
  let {disabled = false} = $$props;
  let {light = false} = $$props;
  let {hideTextInput = false} = $$props;
  let {id = "ccs-" + Math.random().toString(36)} = $$props;
  let {invalid = false} = $$props;
  let {labelText = ""} = $$props;
  let {name = ""} = $$props;
  let {ref = null} = $$props;
  const dispatch = createEventDispatcher();
  let trackRef = null;
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  if ($$props.max === void 0 && $$bindings.max && max !== void 0)
    $$bindings.max(max);
  if ($$props.maxLabel === void 0 && $$bindings.maxLabel && maxLabel !== void 0)
    $$bindings.maxLabel(maxLabel);
  if ($$props.min === void 0 && $$bindings.min && min !== void 0)
    $$bindings.min(min);
  if ($$props.minLabel === void 0 && $$bindings.minLabel && minLabel !== void 0)
    $$bindings.minLabel(minLabel);
  if ($$props.step === void 0 && $$bindings.step && step !== void 0)
    $$bindings.step(step);
  if ($$props.stepMultiplier === void 0 && $$bindings.stepMultiplier && stepMultiplier !== void 0)
    $$bindings.stepMultiplier(stepMultiplier);
  if ($$props.required === void 0 && $$bindings.required && required !== void 0)
    $$bindings.required(required);
  if ($$props.inputType === void 0 && $$bindings.inputType && inputType !== void 0)
    $$bindings.inputType(inputType);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  if ($$props.light === void 0 && $$bindings.light && light !== void 0)
    $$bindings.light(light);
  if ($$props.hideTextInput === void 0 && $$bindings.hideTextInput && hideTextInput !== void 0)
    $$bindings.hideTextInput(hideTextInput);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.invalid === void 0 && $$bindings.invalid && invalid !== void 0)
    $$bindings.invalid(invalid);
  if ($$props.labelText === void 0 && $$bindings.labelText && labelText !== void 0)
    $$bindings.labelText(labelText);
  if ($$props.name === void 0 && $$bindings.name && name !== void 0)
    $$bindings.name(name);
  if ($$props.ref === void 0 && $$bindings.ref && ref !== void 0)
    $$bindings.ref(ref);
  labelId = `label-${id}`;
  range = max - min;
  {
    {
      if (value <= min) {
        value = min;
      } else if (value >= max) {
        value = max;
      }
      if (!disabled) {
        dispatch("change", value);
      }
    }
  }
  left = (value - min) / range * 100;
  return `

<div${spread([$$restProps], "bx--form-item")}><label${add_attribute("for", id, 0)}${add_attribute("id", labelId, 0)}${add_classes(["bx--label " + (disabled ? "bx--label--disabled" : "")].join(" ").trim())}>${escape2(labelText)}</label>
  <div${add_classes(["bx--slider-container"].join(" ").trim())}><span${add_classes(["bx--slider__range-label"].join(" ").trim())}>${escape2(minLabel || min)}</span>
    <div role="${"presentation"}" tabindex="${"-1"}"${add_classes(["bx--slider " + (disabled ? "bx--slider--disabled" : "")].join(" ").trim())}${add_attribute("this", ref, 1)}><div role="${"slider"}" tabindex="${"0"}" style="${"left: " + escape2(left) + "%"}"${add_attribute("aria-labelledby", labelId, 0)}${add_attribute("aria-valuemax", max, 0)}${add_attribute("aria-valuemin", min, 0)}${add_attribute("aria-valuenow", value, 0)}${add_attribute("id", id, 0)}${add_classes(["bx--slider__thumb"].join(" ").trim())}></div>
      <div${add_classes(["bx--slider__track"].join(" ").trim())}${add_attribute("this", trackRef, 1)}></div>
      <div style="${"transform: translate(0, -50%) scaleX(" + escape2(left / 100) + ")"}"${add_classes(["bx--slider__filled-track"].join(" ").trim())}></div>
      <input type="${"hidden"}"${add_attribute("name", name, 0)}${add_attribute("value", value, 0)} ${required ? "required" : ""}${add_attribute("min", min, 0)}${add_attribute("max", max, 0)}${add_attribute("step", step, 0)}${add_classes(["bx--slider__input"].join(" ").trim())}></div>
    <span${add_classes(["bx--slider__range-label"].join(" ").trim())}>${escape2(maxLabel || max)}</span>
    <input${add_attribute("type", hideTextInput ? "hidden" : inputType, 0)}${add_attribute("style", hideTextInput ? "display: none" : void 0, 0)} id="${"input-" + escape2(id)}"${add_attribute("name", name, 0)}${add_attribute("value", value, 0)}${add_attribute("aria-label", $$props["aria-label"] || "Slider number input", 0)} ${disabled ? "disabled" : ""} ${required ? "required" : ""}${add_attribute("min", min, 0)}${add_attribute("max", max, 0)}${add_attribute("step", step, 0)}${add_attribute("data-invalid", invalid || null, 0)}${add_attribute("aria-invalid", invalid || null, 0)}${add_classes([
    "bx--text-input bx--slider-text-input " + (light ? "bx--text-input--light" : "") + " " + (invalid ? "bx--text-input--invalid" : "")
  ].join(" ").trim())}></div></div>`;
});
create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["hideLabel"]);
  let {hideLabel = false} = $$props;
  if ($$props.hideLabel === void 0 && $$bindings.hideLabel && hideLabel !== void 0)
    $$bindings.hideLabel(hideLabel);
  return `<div${spread([$$restProps], "bx--form-item")}>${!hideLabel ? `<span${add_classes(["bx--label bx--skeleton"].join(" ").trim())}></span>` : ``}
  <div${add_classes(["bx--slider-container bx--skeleton"].join(" ").trim())}><span${add_classes(["bx--slider__range-label"].join(" ").trim())}></span>
    <div${add_classes(["bx--slider"].join(" ").trim())}><div${add_classes(["bx--slider__track"].join(" ").trim())}></div>
      <div${add_classes(["bx--slider__filled-track"].join(" ").trim())}></div>
      <div${add_classes(["bx--slider__thumb"].join(" ").trim())}></div></div>
    <span${add_classes(["bx--slider__range-label"].join(" ").trim())}></span></div></div>`;
});
create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["selected", "border", "selection"]);
  let $selectedValue, $$unsubscribe_selectedValue;
  let {selected = void 0} = $$props;
  let {border = false} = $$props;
  let {selection = false} = $$props;
  const dispatch = createEventDispatcher();
  const selectedValue = writable2(selected);
  $$unsubscribe_selectedValue = subscribe(selectedValue, (value) => $selectedValue = value);
  setContext("StructuredListWrapper", {
    selectedValue,
    update: (value) => {
      selectedValue.set(value);
    }
  });
  if ($$props.selected === void 0 && $$bindings.selected && selected !== void 0)
    $$bindings.selected(selected);
  if ($$props.border === void 0 && $$bindings.border && border !== void 0)
    $$bindings.border(border);
  if ($$props.selection === void 0 && $$bindings.selection && selection !== void 0)
    $$bindings.selection(selection);
  selected = $selectedValue;
  {
    dispatch("change", $selectedValue);
  }
  $$unsubscribe_selectedValue();
  return `<div${spread([{"aria-label": "Structured list section"}, $$restProps], "bx--structured-list " + (border ? "bx--structured-list--border" : "") + " " + (selection ? "bx--structured-list--selection" : ""))}>${slots.default ? slots.default({}) : ``}</div>`;
});
create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["rows", "border"]);
  let {rows = 5} = $$props;
  let {border = false} = $$props;
  if ($$props.rows === void 0 && $$bindings.rows && rows !== void 0)
    $$bindings.rows(rows);
  if ($$props.border === void 0 && $$bindings.border && border !== void 0)
    $$bindings.border(border);
  return `<div${spread([$$restProps], "bx--skeleton bx--structured-list " + (border ? "bx--structured-list--border" : ""))}><div${add_classes(["bx--structured-list-thead"].join(" ").trim())}><div${add_classes([
    "bx--structured-list-row bx--structured-list-row--header-row"
  ].join(" ").trim())}><div${add_classes(["bx--structured-list-th"].join(" ").trim())}><span></span></div>
      <div${add_classes(["bx--structured-list-th"].join(" ").trim())}><span></span></div>
      <div${add_classes(["bx--structured-list-th"].join(" ").trim())}><span></span></div></div></div>
  <div${add_classes(["bx--structured-list-tbody"].join(" ").trim())}>${each(Array.from({length: rows}, (_, i) => i), (row, i) => `<div${add_classes(["bx--structured-list-row"].join(" ").trim())}><div${add_classes(["bx--structured-list-td"].join(" ").trim())}></div>
        <div${add_classes(["bx--structured-list-td"].join(" ").trim())}></div>
        <div${add_classes(["bx--structured-list-td"].join(" ").trim())}></div>
      </div>`)}</div></div>`;
});
create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, []);
  return `<div${spread([{role: "rowgroup"}, $$restProps], "bx--structured-list-tbody")}>${slots.default ? slots.default({}) : ``}</div>`;
});
create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, []);
  return `<div${spread([$$restProps], "bx--structured-list-thead")}>${slots.default ? slots.default({}) : ``}</div>`;
});
create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["head", "noWrap"]);
  let {head = false} = $$props;
  let {noWrap = false} = $$props;
  if ($$props.head === void 0 && $$bindings.head && head !== void 0)
    $$bindings.head(head);
  if ($$props.noWrap === void 0 && $$bindings.noWrap && noWrap !== void 0)
    $$bindings.noWrap(noWrap);
  return `<div${spread([$$restProps], (head ? "bx--structured-list-th" : "") + " " + (!head ? "bx--structured-list-td" : "") + " " + (noWrap ? "bx--structured-list-content--nowrap" : ""))}>${slots.default ? slots.default({}) : ``}</div>`;
});
create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["head", "label", "tabindex"]);
  let {head = false} = $$props;
  let {label = false} = $$props;
  let {tabindex = "0"} = $$props;
  if ($$props.head === void 0 && $$bindings.head && head !== void 0)
    $$bindings.head(head);
  if ($$props.label === void 0 && $$bindings.label && label !== void 0)
    $$bindings.label(label);
  if ($$props.tabindex === void 0 && $$bindings.tabindex && tabindex !== void 0)
    $$bindings.tabindex(tabindex);
  return `${label ? `
  <label${spread([{role: "presentation"}, {tabindex: escape2(tabindex)}, $$restProps], "bx--structured-list-row " + (head ? "bx--structured-list-row--header-row" : ""))}>${slots.default ? slots.default({}) : ``}</label>` : `<div${spread([$$restProps], "bx--structured-list-row " + (head ? "bx--structured-list-row--header-row" : ""))}>${slots.default ? slots.default({}) : ``}</div>`}`;
});
create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["checked", "title", "value", "id", "name", "ref"]);
  let $selectedValue, $$unsubscribe_selectedValue;
  let {checked = false} = $$props;
  let {title = "title"} = $$props;
  let {value = "value"} = $$props;
  let {id = "ccs-" + Math.random().toString(36)} = $$props;
  let {name = ""} = $$props;
  let {ref = null} = $$props;
  const {selectedValue, update: update2} = getContext("StructuredListWrapper");
  $$unsubscribe_selectedValue = subscribe(selectedValue, (value2) => $selectedValue = value2);
  if (checked) {
    update2(value);
  }
  if ($$props.checked === void 0 && $$bindings.checked && checked !== void 0)
    $$bindings.checked(checked);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.name === void 0 && $$bindings.name && name !== void 0)
    $$bindings.name(name);
  if ($$props.ref === void 0 && $$bindings.ref && ref !== void 0)
    $$bindings.ref(ref);
  checked = $selectedValue === value;
  $$unsubscribe_selectedValue();
  return `<input${spread([
    {type: "radio"},
    {tabindex: "-1"},
    {checked: checked || null},
    {id: escape2(id)},
    {name: escape2(name)},
    {title: escape2(title)},
    {value: escape2(value)},
    $$restProps
  ], "bx--structured-list-input")}${add_attribute("this", ref, 1)}>`;
});
var ChevronDownGlyph = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let ariaLabel;
  let ariaLabelledBy;
  let labelled;
  let attributes;
  let {class: className = void 0} = $$props;
  let {id = void 0} = $$props;
  let {tabindex = void 0} = $$props;
  let {focusable = false} = $$props;
  let {title = void 0} = $$props;
  let {style = void 0} = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.tabindex === void 0 && $$bindings.tabindex && tabindex !== void 0)
    $$bindings.tabindex(tabindex);
  if ($$props.focusable === void 0 && $$bindings.focusable && focusable !== void 0)
    $$bindings.focusable(focusable);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.style === void 0 && $$bindings.style && style !== void 0)
    $$bindings.style(style);
  ariaLabel = $$props["aria-label"];
  ariaLabelledBy = $$props["aria-labelledby"];
  labelled = ariaLabel || ariaLabelledBy || title;
  attributes = {
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    "aria-hidden": labelled ? void 0 : true,
    role: labelled ? "img" : void 0,
    focusable: tabindex === "0" ? true : focusable,
    tabindex
  };
  return `<svg${spread([
    {"data-carbon-icon": "ChevronDownGlyph"},
    {xmlns: "http://www.w3.org/2000/svg"},
    {viewBox: "0 0 10 6"},
    {fill: "currentColor"},
    {width: "10"},
    {height: "6"},
    {class: escape2(className)},
    {preserveAspectRatio: "xMidYMid meet"},
    {style: escape2(style)},
    {id: escape2(id)},
    attributes
  ])}><path d="${"M5 6L0 1 0.7 0.3 5 4.6 9.3 0.3 10 1z"}"></path>${slots.default ? slots.default({}) : `
    ${title ? `<title>${escape2(title)}</title>` : ``}
  `}</svg>`;
});
create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let currentTab;
  let currentContent;
  let $$restProps = compute_rest_props($$props, ["selected", "type", "iconDescription", "triggerHref"]);
  let $tabsById, $$unsubscribe_tabsById;
  let $tabs, $$unsubscribe_tabs;
  let $content, $$unsubscribe_content;
  let $selectedTab, $$unsubscribe_selectedTab;
  let {selected = 0} = $$props;
  let {type = "default"} = $$props;
  let {iconDescription = "Show menu options"} = $$props;
  let {triggerHref = "#"} = $$props;
  const dispatch = createEventDispatcher();
  const tabs = writable2([]);
  $$unsubscribe_tabs = subscribe(tabs, (value) => $tabs = value);
  const tabsById = derived(tabs, (_) => _.reduce((a, c) => ({...a, [c.id]: c}), {}));
  $$unsubscribe_tabsById = subscribe(tabsById, (value) => $tabsById = value);
  const selectedTab = writable2(void 0);
  $$unsubscribe_selectedTab = subscribe(selectedTab, (value) => $selectedTab = value);
  const content = writable2([]);
  $$unsubscribe_content = subscribe(content, (value) => $content = value);
  const contentById = derived(content, (_) => _.reduce((a, c) => ({...a, [c.id]: c}), {}));
  const selectedContent = writable2(void 0);
  setContext("Tabs", {
    tabs,
    contentById,
    selectedTab,
    selectedContent,
    add: (data2) => {
      tabs.update((_) => [..._, {...data2, index: _.length}]);
    },
    addContent: (data2) => {
      content.update((_) => [..._, {...data2, index: _.length}]);
    },
    update: (id) => {
      currentIndex = $tabsById[id].index;
    },
    change: (direction2) => {
      let index2 = currentIndex + direction2;
      if (index2 < 0) {
        index2 = $tabs.length - 1;
      } else if (index2 >= $tabs.length) {
        index2 = 0;
      }
      let disabled = $tabs[index2].disabled;
      while (disabled) {
        index2 = index2 + direction2;
        if (index2 < 0) {
          index2 = $tabs.length - 1;
        } else if (index2 >= $tabs.length) {
          index2 = 0;
        }
        disabled = $tabs[index2].disabled;
      }
      currentIndex = index2;
    }
  });
  afterUpdate(() => {
    selected = currentIndex;
  });
  let dropdownHidden = true;
  let currentIndex = selected;
  if ($$props.selected === void 0 && $$bindings.selected && selected !== void 0)
    $$bindings.selected(selected);
  if ($$props.type === void 0 && $$bindings.type && type !== void 0)
    $$bindings.type(type);
  if ($$props.iconDescription === void 0 && $$bindings.iconDescription && iconDescription !== void 0)
    $$bindings.iconDescription(iconDescription);
  if ($$props.triggerHref === void 0 && $$bindings.triggerHref && triggerHref !== void 0)
    $$bindings.triggerHref(triggerHref);
  currentIndex = selected;
  currentTab = $tabs[currentIndex] || void 0;
  currentContent = $content[currentIndex] || void 0;
  {
    {
      dispatch("change", currentIndex);
      if (currentTab) {
        selectedTab.set(currentTab.id);
      }
      if (currentContent) {
        selectedContent.set(currentContent.id);
      }
    }
  }
  {
    if ($selectedTab) {
      dropdownHidden = true;
    }
  }
  $$unsubscribe_tabsById();
  $$unsubscribe_tabs();
  $$unsubscribe_content();
  $$unsubscribe_selectedTab();
  return `<div${spread([{role: "navigation"}, $$restProps], "bx--tabs " + (type === "container" ? "bx--tabs--container" : ""))}><div role="${"listbox"}" tabindex="${"0"}"${add_attribute("aria-label", $$props["aria-label"] || "listbox", 0)}${add_classes(["bx--tabs-trigger"].join(" ").trim())}><a tabindex="${"-1"}"${add_attribute("href", triggerHref, 0)}${add_classes(["bx--tabs-trigger-text"].join(" ").trim())}>${currentTab ? `${escape2(currentTab.label)}` : ``}</a>
    ${validate_component(ChevronDownGlyph, "ChevronDownGlyph").$$render($$result, {
    "aria-hidden": "true",
    title: iconDescription
  }, {}, {})}</div>
  <ul role="${"tablist"}"${add_classes([
    "bx--tabs__nav " + (dropdownHidden ? "bx--tabs__nav--hidden" : "")
  ].join(" ").trim())}>${slots.default ? slots.default({}) : ``}</ul></div>
${slots.content ? slots.content({}) : ``}`;
});
create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let selected;
  let $$restProps = compute_rest_props($$props, ["label", "href", "disabled", "tabindex", "id", "ref"]);
  let $selectedTab, $$unsubscribe_selectedTab;
  let {label = ""} = $$props;
  let {href = "#"} = $$props;
  let {disabled = false} = $$props;
  let {tabindex = "0"} = $$props;
  let {id = "ccs-" + Math.random().toString(36)} = $$props;
  let {ref = null} = $$props;
  const {selectedTab, add, update: update2, change} = getContext("Tabs");
  $$unsubscribe_selectedTab = subscribe(selectedTab, (value) => $selectedTab = value);
  add({id, label, disabled});
  let didMount = false;
  onMount(() => {
    tick().then(() => {
      didMount = true;
    });
  });
  afterUpdate(() => {
    if (didMount && selected && ref) {
      ref.focus();
    }
  });
  if ($$props.label === void 0 && $$bindings.label && label !== void 0)
    $$bindings.label(label);
  if ($$props.href === void 0 && $$bindings.href && href !== void 0)
    $$bindings.href(href);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  if ($$props.tabindex === void 0 && $$bindings.tabindex && tabindex !== void 0)
    $$bindings.tabindex(tabindex);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.ref === void 0 && $$bindings.ref && ref !== void 0)
    $$bindings.ref(ref);
  selected = $selectedTab === id;
  $$unsubscribe_selectedTab();
  return `<li${spread([{tabindex: "-1"}, {role: "presentation"}, $$restProps], "bx--tabs__nav-item " + (disabled ? "bx--tabs__nav-item--disabled" : "") + " " + (selected ? "bx--tabs__nav-item--selected" : ""))}><a role="${"tab"}"${add_attribute("tabindex", disabled ? "-1" : tabindex, 0)}${add_attribute("aria-selected", selected, 0)}${add_attribute("aria-disabled", disabled, 0)}${add_attribute("id", id, 0)}${add_attribute("href", href, 0)}${add_classes(["bx--tabs__nav-link"].join(" ").trim())}${add_attribute("this", ref, 1)}>${slots.default ? slots.default({}) : `${escape2(label)}`}</a></li>`;
});
create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let selected;
  let index2;
  let tabId;
  let $$restProps = compute_rest_props($$props, ["id"]);
  let $selectedContent, $$unsubscribe_selectedContent;
  let $contentById, $$unsubscribe_contentById;
  let $tabs, $$unsubscribe_tabs;
  let {id = "ccs-" + Math.random().toString(36)} = $$props;
  const {selectedContent, addContent, tabs, contentById} = getContext("Tabs");
  $$unsubscribe_selectedContent = subscribe(selectedContent, (value) => $selectedContent = value);
  $$unsubscribe_tabs = subscribe(tabs, (value) => $tabs = value);
  $$unsubscribe_contentById = subscribe(contentById, (value) => $contentById = value);
  addContent({id});
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  selected = $selectedContent === id;
  index2 = $contentById[id].index;
  tabId = $tabs[index2].id;
  $$unsubscribe_selectedContent();
  $$unsubscribe_contentById();
  $$unsubscribe_tabs();
  return `<div${spread([
    {role: "tabpanel"},
    {"aria-labelledby": escape2(tabId)},
    {"aria-hidden": escape2(!selected)},
    {
      hidden: (selected ? void 0 : "") || null
    },
    {id: escape2(id)},
    $$restProps
  ], "bx--tab-content")}>${slots.default ? slots.default({}) : ``}</div>`;
});
create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["count", "type"]);
  let {count = 4} = $$props;
  let {type = "default"} = $$props;
  if ($$props.count === void 0 && $$bindings.count && count !== void 0)
    $$bindings.count(count);
  if ($$props.type === void 0 && $$bindings.type && type !== void 0)
    $$bindings.type(type);
  return `<div${spread([$$restProps], "bx--tabs bx--skeleton bx--tabs--scrollable " + (type === "container" ? "bx--tabs--scrollable--container" : ""))}><ul${add_classes(["bx--tabs--scrollable__nav"].join(" ").trim())}>${each(Array.from({length: count}, (_, i) => i), (item) => `<li${add_classes(["bx--tabs--scrollable__nav-item"].join(" ").trim())}><div${add_classes(["bx--tabs__nav-link"].join(" ").trim())}><span></span></div>
      </li>`)}</ul></div>`;
});
var TagSkeleton = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["size"]);
  let {size = "default"} = $$props;
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  return `<span${spread([$$restProps], "bx--tag " + (size === "sm" ? "bx--tag--sm" : "") + " bx--skeleton")}></span>`;
});
create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["type", "size", "filter", "disabled", "interactive", "skeleton", "title", "icon", "id"]);
  let {type = void 0} = $$props;
  let {size = "default"} = $$props;
  let {filter = false} = $$props;
  let {disabled = false} = $$props;
  let {interactive = false} = $$props;
  let {skeleton = false} = $$props;
  let {title = "Clear filter"} = $$props;
  let {icon = void 0} = $$props;
  let {id = "ccs-" + Math.random().toString(36)} = $$props;
  createEventDispatcher();
  if ($$props.type === void 0 && $$bindings.type && type !== void 0)
    $$bindings.type(type);
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  if ($$props.filter === void 0 && $$bindings.filter && filter !== void 0)
    $$bindings.filter(filter);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  if ($$props.interactive === void 0 && $$bindings.interactive && interactive !== void 0)
    $$bindings.interactive(interactive);
  if ($$props.skeleton === void 0 && $$bindings.skeleton && skeleton !== void 0)
    $$bindings.skeleton(skeleton);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.icon === void 0 && $$bindings.icon && icon !== void 0)
    $$bindings.icon(icon);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  return `${skeleton ? `${validate_component(TagSkeleton, "TagSkeleton").$$render($$result, Object.assign({size}, $$restProps), {}, {})}` : `${filter ? `<div${spread([{"aria-label": escape2(title)}, {id: escape2(id)}, $$restProps], "bx--tag " + (disabled ? "bx--tag--disabled" : "") + " " + (filter ? "bx--tag--filter" : "") + " " + (size === "sm" ? "bx--tag--sm" : "") + " " + (type === "red" ? "bx--tag--red" : "") + " " + (type === "magenta" ? "bx--tag--magenta" : "") + " " + (type === "purple" ? "bx--tag--purple" : "") + " " + (type === "blue" ? "bx--tag--blue" : "") + " " + (type === "cyan" ? "bx--tag--cyan" : "") + " " + (type === "teal" ? "bx--tag--teal" : "") + " " + (type === "green" ? "bx--tag--green" : "") + " " + (type === "gray" ? "bx--tag--gray" : "") + " " + (type === "cool-gray" ? "bx--tag--cool-gray" : "") + " " + (type === "warm-gray" ? "bx--tag--warm-gray" : "") + " " + (type === "high-contrast" ? "bx--tag--high-contrast" : ""))}>${slots.default ? slots.default({props: {class: "bx--tag__label"}}) : `
      <span${add_classes(["bx--tag__label"].join(" ").trim())}>${escape2(type)}</span>
    `}
    <button${add_attribute("aria-labelledby", id, 0)} ${disabled ? "disabled" : ""}${add_attribute("title", title, 0)}${add_classes(["bx--tag__close-icon"].join(" ").trim())}>${validate_component(Close16, "Close16").$$render($$result, {}, {}, {})}</button></div>` : `${interactive ? `<button${spread([
    {id: escape2(id)},
    {disabled: disabled || null},
    {"aria-disabled": escape2(disabled)},
    {
      tabindex: escape2(disabled ? "-1" : void 0)
    },
    $$restProps
  ], "bx--tag bx--tag--interactive " + (disabled ? "bx--tag--disabled" : "") + " " + (size === "sm" ? "bx--tag--sm" : "") + " " + (type === "red" ? "bx--tag--red" : "") + " " + (type === "magenta" ? "bx--tag--magenta" : "") + " " + (type === "purple" ? "bx--tag--purple" : "") + " " + (type === "blue" ? "bx--tag--blue" : "") + " " + (type === "cyan" ? "bx--tag--cyan" : "") + " " + (type === "teal" ? "bx--tag--teal" : "") + " " + (type === "green" ? "bx--tag--green" : "") + " " + (type === "gray" ? "bx--tag--gray" : "") + " " + (type === "cool-gray" ? "bx--tag--cool-gray" : "") + " " + (type === "warm-gray" ? "bx--tag--warm-gray" : "") + " " + (type === "high-contrast" ? "bx--tag--high-contrast" : ""))}>${icon ? `<div${add_classes(["bx--tag__custom-icon"].join(" ").trim())}>${validate_component(icon || missing_component, "svelte:component").$$render($$result, {}, {}, {})}</div>` : ``}
    <span>${slots.default ? slots.default({}) : ``}</span></button>` : `<div${spread([{id: escape2(id)}, $$restProps], "bx--tag " + (disabled ? "bx--tag--disabled" : "") + " " + (size === "sm" ? "bx--tag--sm" : "") + " " + (type === "red" ? "bx--tag--red" : "") + " " + (type === "magenta" ? "bx--tag--magenta" : "") + " " + (type === "purple" ? "bx--tag--purple" : "") + " " + (type === "blue" ? "bx--tag--blue" : "") + " " + (type === "cyan" ? "bx--tag--cyan" : "") + " " + (type === "teal" ? "bx--tag--teal" : "") + " " + (type === "green" ? "bx--tag--green" : "") + " " + (type === "gray" ? "bx--tag--gray" : "") + " " + (type === "cool-gray" ? "bx--tag--cool-gray" : "") + " " + (type === "warm-gray" ? "bx--tag--warm-gray" : "") + " " + (type === "high-contrast" ? "bx--tag--high-contrast" : ""))}>${icon ? `<div${add_classes(["bx--tag__custom-icon"].join(" ").trim())}>${validate_component(icon || missing_component, "svelte:component").$$render($$result, {}, {}, {})}</div>` : ``}
    <span>${slots.default ? slots.default({}) : ``}</span></div>`}`}`}`;
});
create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let errorId;
  let $$restProps = compute_rest_props($$props, [
    "value",
    "placeholder",
    "cols",
    "rows",
    "light",
    "disabled",
    "helperText",
    "labelText",
    "hideLabel",
    "invalid",
    "invalidText",
    "id",
    "name",
    "ref"
  ]);
  let {value = ""} = $$props;
  let {placeholder = ""} = $$props;
  let {cols = 50} = $$props;
  let {rows = 4} = $$props;
  let {light = false} = $$props;
  let {disabled = false} = $$props;
  let {helperText = ""} = $$props;
  let {labelText = ""} = $$props;
  let {hideLabel = false} = $$props;
  let {invalid = false} = $$props;
  let {invalidText = ""} = $$props;
  let {id = "ccs-" + Math.random().toString(36)} = $$props;
  let {name = void 0} = $$props;
  let {ref = null} = $$props;
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  if ($$props.placeholder === void 0 && $$bindings.placeholder && placeholder !== void 0)
    $$bindings.placeholder(placeholder);
  if ($$props.cols === void 0 && $$bindings.cols && cols !== void 0)
    $$bindings.cols(cols);
  if ($$props.rows === void 0 && $$bindings.rows && rows !== void 0)
    $$bindings.rows(rows);
  if ($$props.light === void 0 && $$bindings.light && light !== void 0)
    $$bindings.light(light);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  if ($$props.helperText === void 0 && $$bindings.helperText && helperText !== void 0)
    $$bindings.helperText(helperText);
  if ($$props.labelText === void 0 && $$bindings.labelText && labelText !== void 0)
    $$bindings.labelText(labelText);
  if ($$props.hideLabel === void 0 && $$bindings.hideLabel && hideLabel !== void 0)
    $$bindings.hideLabel(hideLabel);
  if ($$props.invalid === void 0 && $$bindings.invalid && invalid !== void 0)
    $$bindings.invalid(invalid);
  if ($$props.invalidText === void 0 && $$bindings.invalidText && invalidText !== void 0)
    $$bindings.invalidText(invalidText);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.name === void 0 && $$bindings.name && name !== void 0)
    $$bindings.name(name);
  if ($$props.ref === void 0 && $$bindings.ref && ref !== void 0)
    $$bindings.ref(ref);
  errorId = `error-${id}`;
  return `<div${add_classes(["bx--form-item"].join(" ").trim())}>${labelText && !hideLabel ? `<label${add_attribute("for", id, 0)}${add_classes([
    "bx--label " + (hideLabel ? "bx--visually-hidden" : "") + " " + (disabled ? "bx--label--disabled" : "")
  ].join(" ").trim())}>${escape2(labelText)}</label>` : ``}
  <div${add_attribute("data-invalid", invalid || void 0, 0)}${add_classes(["bx--text-area__wrapper"].join(" ").trim())}>${invalid ? `${validate_component(WarningFilled16, "WarningFilled16").$$render($$result, {class: "bx--text-area__invalid-icon"}, {}, {})}` : ``}
    <textarea${spread([
    {
      "aria-invalid": escape2(invalid || void 0)
    },
    {
      "aria-describedby": escape2(invalid ? errorId : void 0)
    },
    {disabled: disabled || null},
    {id: escape2(id)},
    {name: escape2(name)},
    {cols: escape2(cols)},
    {rows: escape2(rows)},
    {placeholder: escape2(placeholder)},
    $$restProps
  ], "bx--text-area " + (light ? "bx--text-area--light" : "") + " " + (invalid ? "bx--text-area--invalid" : ""))}${add_attribute("this", ref, 1)}>${escape2(value)}</textarea></div>
  ${!invalid && helperText ? `<div${add_classes([
    "bx--form__helper-text " + (disabled ? "bx--form__helper-text--disabled" : "")
  ].join(" ").trim())}>${escape2(helperText)}</div>` : ``}
  ${invalid ? `<div${add_attribute("id", errorId, 0)}${add_classes(["bx--form-requirement"].join(" ").trim())}>${escape2(invalidText)}</div>` : ``}</div>`;
});
create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["hideLabel"]);
  let {hideLabel = false} = $$props;
  if ($$props.hideLabel === void 0 && $$bindings.hideLabel && hideLabel !== void 0)
    $$bindings.hideLabel(hideLabel);
  return `<div${spread([$$restProps], "bx--form-item")}>${!hideLabel ? `<span${add_classes(["bx--label bx--skeleton"].join(" ").trim())}></span>` : ``}
  <div${add_classes(["bx--skeleton bx--text-area"].join(" ").trim())}></div></div>`;
});
create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let isFluid;
  let errorId;
  let warnId;
  let $$restProps = compute_rest_props($$props, [
    "size",
    "value",
    "type",
    "placeholder",
    "light",
    "disabled",
    "helperText",
    "id",
    "name",
    "labelText",
    "hideLabel",
    "invalid",
    "invalidText",
    "warn",
    "warnText",
    "ref",
    "required",
    "inline"
  ]);
  let {size = void 0} = $$props;
  let {value = ""} = $$props;
  let {type = ""} = $$props;
  let {placeholder = ""} = $$props;
  let {light = false} = $$props;
  let {disabled = false} = $$props;
  let {helperText = ""} = $$props;
  let {id = "ccs-" + Math.random().toString(36)} = $$props;
  let {name = void 0} = $$props;
  let {labelText = ""} = $$props;
  let {hideLabel = false} = $$props;
  let {invalid = false} = $$props;
  let {invalidText = ""} = $$props;
  let {warn = false} = $$props;
  let {warnText = ""} = $$props;
  let {ref = null} = $$props;
  let {required = false} = $$props;
  let {inline = false} = $$props;
  const ctx = getContext("Form");
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  if ($$props.type === void 0 && $$bindings.type && type !== void 0)
    $$bindings.type(type);
  if ($$props.placeholder === void 0 && $$bindings.placeholder && placeholder !== void 0)
    $$bindings.placeholder(placeholder);
  if ($$props.light === void 0 && $$bindings.light && light !== void 0)
    $$bindings.light(light);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  if ($$props.helperText === void 0 && $$bindings.helperText && helperText !== void 0)
    $$bindings.helperText(helperText);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.name === void 0 && $$bindings.name && name !== void 0)
    $$bindings.name(name);
  if ($$props.labelText === void 0 && $$bindings.labelText && labelText !== void 0)
    $$bindings.labelText(labelText);
  if ($$props.hideLabel === void 0 && $$bindings.hideLabel && hideLabel !== void 0)
    $$bindings.hideLabel(hideLabel);
  if ($$props.invalid === void 0 && $$bindings.invalid && invalid !== void 0)
    $$bindings.invalid(invalid);
  if ($$props.invalidText === void 0 && $$bindings.invalidText && invalidText !== void 0)
    $$bindings.invalidText(invalidText);
  if ($$props.warn === void 0 && $$bindings.warn && warn !== void 0)
    $$bindings.warn(warn);
  if ($$props.warnText === void 0 && $$bindings.warnText && warnText !== void 0)
    $$bindings.warnText(warnText);
  if ($$props.ref === void 0 && $$bindings.ref && ref !== void 0)
    $$bindings.ref(ref);
  if ($$props.required === void 0 && $$bindings.required && required !== void 0)
    $$bindings.required(required);
  if ($$props.inline === void 0 && $$bindings.inline && inline !== void 0)
    $$bindings.inline(inline);
  isFluid = !!ctx && ctx.isFluid;
  errorId = `error-${id}`;
  warnId = `warn-${id}`;
  return `<div${add_classes([
    "bx--form-item bx--text-input-wrapper " + (inline ? "bx--text-input-wrapper--inline" : "")
  ].join(" ").trim())}>${inline ? `<div class="${"bx--text-input__label-helper-wrapper"}">${labelText ? `<label${add_attribute("for", id, 0)} class="${[
    escape2(inline && !!size && `bx--label--inline--${size}`),
    "bx--label " + (hideLabel ? "bx--visually-hidden" : "") + " " + (disabled ? "bx--label--disabled" : "") + " " + (inline ? "bx--label--inline" : "")
  ].join(" ").trim()}">${escape2(labelText)}</label>` : ``}
      ${!isFluid && helperText ? `<div${add_classes([
    "bx--form__helper-text " + (disabled ? "bx--form__helper-text--disabled" : "") + " " + (inline ? "bx--form__helper-text--inline" : "")
  ].join(" ").trim())}>${escape2(helperText)}</div>` : ``}</div>` : ``}
  ${!inline && labelText ? `<label${add_attribute("for", id, 0)} class="${[
    escape2(inline && !!size && `bx--label--inline--${size}`),
    "bx--label " + (hideLabel ? "bx--visually-hidden" : "") + " " + (disabled ? "bx--label--disabled" : "") + " " + (inline ? "bx--label--inline" : "")
  ].join(" ").trim()}">${escape2(labelText)}</label>` : ``}
  <div${add_classes([
    "bx--text-input__field-outer-wrapper " + (inline ? "bx--text-input__field-outer-wrapper--inline" : "")
  ].join(" ").trim())}><div${add_attribute("data-invalid", invalid || void 0, 0)}${add_attribute("data-warn", warn || void 0, 0)}${add_classes([
    "bx--text-input__field-wrapper " + (!invalid && warn ? "bx--text-input__field-wrapper--warning" : "")
  ].join(" ").trim())}>${invalid ? `${validate_component(WarningFilled16, "WarningFilled16").$$render($$result, {class: "bx--text-input__invalid-icon"}, {}, {})}` : ``}
      ${!invalid && warn ? `${validate_component(WarningAltFilled16, "WarningAltFilled16").$$render($$result, {
    class: "bx--text-input__invalid-icon\n            bx--text-input__invalid-icon--warning"
  }, {}, {})}` : ``}
      <input${spread([
    {
      "data-invalid": escape2(invalid || void 0)
    },
    {
      "aria-invalid": escape2(invalid || void 0)
    },
    {"data-warn": escape2(warn || void 0)},
    {
      "aria-describedby": escape2(invalid ? errorId : warn ? warnId : void 0)
    },
    {disabled: disabled || null},
    {id: escape2(id)},
    {name: escape2(name)},
    {placeholder: escape2(placeholder)},
    {type: escape2(type)},
    {value: escape2(value)},
    {required: required || null},
    $$restProps,
    {
      class: escape2(size && `bx--text-input--${size}`)
    }
  ], "bx--text-input " + (light ? "bx--text-input--light" : "") + " " + (invalid ? "bx--text-input--invalid" : "") + " " + (warn ? "bx--text-input--warn" : ""))}${add_attribute("this", ref, 1)}>
      ${isFluid ? `<hr${add_classes(["bx--text-input__divider"].join(" ").trim())}>` : ``}
      ${isFluid && !inline && invalid ? `<div${add_attribute("id", errorId, 0)}${add_classes(["bx--form-requirement"].join(" ").trim())}>${escape2(invalidText)}</div>` : ``}
      ${isFluid && !inline && warn ? `<div${add_attribute("id", warnId, 0)}${add_classes(["bx--form-requirement"].join(" ").trim())}>${escape2(warnText)}</div>` : ``}</div>
    ${!invalid && !warn && !isFluid && !inline && helperText ? `<div${add_classes([
    "bx--form__helper-text " + (disabled ? "bx--form__helper-text--disabled" : "") + " " + (inline ? "bx--form__helper-text--inline" : "")
  ].join(" ").trim())}>${escape2(helperText)}</div>` : ``}
    ${!isFluid && invalid ? `<div${add_attribute("id", errorId, 0)}${add_classes(["bx--form-requirement"].join(" ").trim())}>${escape2(invalidText)}</div>` : ``}
    ${!isFluid && !invalid && warn ? `<div${add_attribute("id", warnId, 0)}${add_classes(["bx--form-requirement"].join(" ").trim())}>${escape2(warnText)}</div>` : ``}</div></div>`;
});
create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["hideLabel"]);
  let {hideLabel = false} = $$props;
  if ($$props.hideLabel === void 0 && $$bindings.hideLabel && hideLabel !== void 0)
    $$bindings.hideLabel(hideLabel);
  return `<div${spread([$$restProps], "bx--form-item")}>${!hideLabel ? `<span${add_classes(["bx--label bx--skeleton"].join(" ").trim())}></span>` : ``}
  <div${add_classes(["bx--skeleton bx--text-input"].join(" ").trim())}></div></div>`;
});
var View16 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let ariaLabel;
  let ariaLabelledBy;
  let labelled;
  let attributes;
  let {class: className = void 0} = $$props;
  let {id = void 0} = $$props;
  let {tabindex = void 0} = $$props;
  let {focusable = false} = $$props;
  let {title = void 0} = $$props;
  let {style = void 0} = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.tabindex === void 0 && $$bindings.tabindex && tabindex !== void 0)
    $$bindings.tabindex(tabindex);
  if ($$props.focusable === void 0 && $$bindings.focusable && focusable !== void 0)
    $$bindings.focusable(focusable);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.style === void 0 && $$bindings.style && style !== void 0)
    $$bindings.style(style);
  ariaLabel = $$props["aria-label"];
  ariaLabelledBy = $$props["aria-labelledby"];
  labelled = ariaLabel || ariaLabelledBy || title;
  attributes = {
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    "aria-hidden": labelled ? void 0 : true,
    role: labelled ? "img" : void 0,
    focusable: tabindex === "0" ? true : focusable,
    tabindex
  };
  return `<svg${spread([
    {"data-carbon-icon": "View16"},
    {xmlns: "http://www.w3.org/2000/svg"},
    {viewBox: "0 0 16 16"},
    {fill: "currentColor"},
    {width: "16"},
    {height: "16"},
    {class: escape2(className)},
    {preserveAspectRatio: "xMidYMid meet"},
    {style: escape2(style)},
    {id: escape2(id)},
    attributes
  ])}><path d="${"M15.5,7.8C14.3,4.7,11.3,2.6,8,2.5C4.7,2.6,1.7,4.7,0.5,7.8c0,0.1,0,0.2,0,0.3c1.2,3.1,4.1,5.2,7.5,5.3	c3.3-0.1,6.3-2.2,7.5-5.3C15.5,8.1,15.5,7.9,15.5,7.8z M8,12.5c-2.7,0-5.4-2-6.5-4.5c1-2.5,3.8-4.5,6.5-4.5s5.4,2,6.5,4.5	C13.4,10.5,10.6,12.5,8,12.5z"}"></path><path d="${"M8,5C6.3,5,5,6.3,5,8s1.3,3,3,3s3-1.3,3-3S9.7,5,8,5z M8,10c-1.1,0-2-0.9-2-2s0.9-2,2-2s2,0.9,2,2S9.1,10,8,10z"}"></path>${slots.default ? slots.default({}) : `
    ${title ? `<title>${escape2(title)}</title>` : ``}
  `}</svg>`;
});
var ViewOff16 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let ariaLabel;
  let ariaLabelledBy;
  let labelled;
  let attributes;
  let {class: className = void 0} = $$props;
  let {id = void 0} = $$props;
  let {tabindex = void 0} = $$props;
  let {focusable = false} = $$props;
  let {title = void 0} = $$props;
  let {style = void 0} = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.tabindex === void 0 && $$bindings.tabindex && tabindex !== void 0)
    $$bindings.tabindex(tabindex);
  if ($$props.focusable === void 0 && $$bindings.focusable && focusable !== void 0)
    $$bindings.focusable(focusable);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.style === void 0 && $$bindings.style && style !== void 0)
    $$bindings.style(style);
  ariaLabel = $$props["aria-label"];
  ariaLabelledBy = $$props["aria-labelledby"];
  labelled = ariaLabel || ariaLabelledBy || title;
  attributes = {
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    "aria-hidden": labelled ? void 0 : true,
    role: labelled ? "img" : void 0,
    focusable: tabindex === "0" ? true : focusable,
    tabindex
  };
  return `<svg${spread([
    {"data-carbon-icon": "ViewOff16"},
    {xmlns: "http://www.w3.org/2000/svg"},
    {viewBox: "0 0 16 16"},
    {fill: "currentColor"},
    {width: "16"},
    {height: "16"},
    {class: escape2(className)},
    {preserveAspectRatio: "xMidYMid meet"},
    {style: escape2(style)},
    {id: escape2(id)},
    attributes
  ])}><path d="${"M2.6,11.3l0.7-0.7C2.6,9.8,1.9,9,1.5,8c1-2.5,3.8-4.5,6.5-4.5c0.7,0,1.4,0.1,2,0.4l0.8-0.8C9.9,2.7,9,2.5,8,2.5	C4.7,2.6,1.7,4.7,0.5,7.8c0,0.1,0,0.2,0,0.3C1,9.3,1.7,10.4,2.6,11.3z"}"></path><path d="${"M6 7.9c.1-1 .9-1.8 1.8-1.8l.9-.9C7.2 4.7 5.5 5.6 5.1 7.2 5 7.7 5 8.3 5.1 8.8L6 7.9zM15.5 7.8c-.6-1.5-1.6-2.8-2.9-3.7L15 1.7 14.3 1 1 14.3 1.7 15l2.6-2.6c1.1.7 2.4 1 3.7 1.1 3.3-.1 6.3-2.2 7.5-5.3C15.5 8.1 15.5 7.9 15.5 7.8zM10 8c0 1.1-.9 2-2 2-.3 0-.7-.1-1-.3L9.7 7C9.9 7.3 10 7.6 10 8zM8 12.5c-1 0-2.1-.3-3-.8l1.3-1.3c1.4.9 3.2.6 4.2-.8.7-1 .7-2.4 0-3.4l1.4-1.4c1.1.8 2 1.9 2.6 3.2C13.4 10.5 10.6 12.5 8 12.5z"}"></path>${slots.default ? slots.default({}) : `
    ${title ? `<title>${escape2(title)}</title>` : ``}
  `}</svg>`;
});
create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let isFluid;
  let errorId;
  let $$restProps = compute_rest_props($$props, [
    "size",
    "value",
    "type",
    "placeholder",
    "hidePasswordLabel",
    "showPasswordLabel",
    "tooltipAlignment",
    "tooltipPosition",
    "light",
    "disabled",
    "helperText",
    "labelText",
    "hideLabel",
    "invalid",
    "invalidText",
    "id",
    "name",
    "ref"
  ]);
  let {size = void 0} = $$props;
  let {value = ""} = $$props;
  let {type = "password"} = $$props;
  let {placeholder = ""} = $$props;
  let {hidePasswordLabel = "Hide password"} = $$props;
  let {showPasswordLabel = "Show password"} = $$props;
  let {tooltipAlignment = "center"} = $$props;
  let {tooltipPosition = "bottom"} = $$props;
  let {light = false} = $$props;
  let {disabled = false} = $$props;
  let {helperText = ""} = $$props;
  let {labelText = ""} = $$props;
  let {hideLabel = false} = $$props;
  let {invalid = false} = $$props;
  let {invalidText = ""} = $$props;
  let {id = "ccs-" + Math.random().toString(36)} = $$props;
  let {name = void 0} = $$props;
  let {ref = null} = $$props;
  const ctx = getContext("Form");
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  if ($$props.type === void 0 && $$bindings.type && type !== void 0)
    $$bindings.type(type);
  if ($$props.placeholder === void 0 && $$bindings.placeholder && placeholder !== void 0)
    $$bindings.placeholder(placeholder);
  if ($$props.hidePasswordLabel === void 0 && $$bindings.hidePasswordLabel && hidePasswordLabel !== void 0)
    $$bindings.hidePasswordLabel(hidePasswordLabel);
  if ($$props.showPasswordLabel === void 0 && $$bindings.showPasswordLabel && showPasswordLabel !== void 0)
    $$bindings.showPasswordLabel(showPasswordLabel);
  if ($$props.tooltipAlignment === void 0 && $$bindings.tooltipAlignment && tooltipAlignment !== void 0)
    $$bindings.tooltipAlignment(tooltipAlignment);
  if ($$props.tooltipPosition === void 0 && $$bindings.tooltipPosition && tooltipPosition !== void 0)
    $$bindings.tooltipPosition(tooltipPosition);
  if ($$props.light === void 0 && $$bindings.light && light !== void 0)
    $$bindings.light(light);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  if ($$props.helperText === void 0 && $$bindings.helperText && helperText !== void 0)
    $$bindings.helperText(helperText);
  if ($$props.labelText === void 0 && $$bindings.labelText && labelText !== void 0)
    $$bindings.labelText(labelText);
  if ($$props.hideLabel === void 0 && $$bindings.hideLabel && hideLabel !== void 0)
    $$bindings.hideLabel(hideLabel);
  if ($$props.invalid === void 0 && $$bindings.invalid && invalid !== void 0)
    $$bindings.invalid(invalid);
  if ($$props.invalidText === void 0 && $$bindings.invalidText && invalidText !== void 0)
    $$bindings.invalidText(invalidText);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.name === void 0 && $$bindings.name && name !== void 0)
    $$bindings.name(name);
  if ($$props.ref === void 0 && $$bindings.ref && ref !== void 0)
    $$bindings.ref(ref);
  isFluid = !!ctx && ctx.isFluid;
  errorId = `error-${id}`;
  return `<div${add_classes([
    "bx--form-item bx--text-input-wrapper " + (!isFluid ? "bx--password-input-wrapper" : "")
  ].join(" ").trim())}>${labelText ? `<label${add_attribute("for", id, 0)}${add_classes([
    "bx--label " + (hideLabel ? "bx--visually-hidden" : "") + " " + (disabled ? "bx--label--disabled" : "")
  ].join(" ").trim())}>${escape2(labelText)}</label>` : ``}
  <div${add_attribute("data-invalid", invalid || void 0, 0)}${add_classes(["bx--text-input__field-wrapper"].join(" ").trim())}>${invalid ? `${validate_component(WarningFilled16, "WarningFilled16").$$render($$result, {class: "bx--text-input__invalid-icon"}, {}, {})}` : ``}
    <input${spread([
    {
      "data-invalid": escape2(invalid || void 0)
    },
    {
      "aria-invalid": escape2(invalid || void 0)
    },
    {
      "aria-describedby": escape2(invalid ? errorId : void 0)
    },
    {id: escape2(id)},
    {name: escape2(name)},
    {placeholder: escape2(placeholder)},
    {type: escape2(type)},
    {value: escape2(value)},
    {disabled: disabled || null},
    $$restProps,
    {
      class: escape2(size && `bx--text-input--${size}`)
    }
  ], "bx--text-input bx--password-input " + (light ? "bx--text-input--light" : "") + " " + (invalid ? "bx--text-input--invalid" : ""))}${add_attribute("this", ref, 1)}>
    <button type="${"button"}" ${disabled ? "disabled" : ""} class="${[
    escape2(tooltipPosition && `bx--tooltip--${tooltipPosition}`) + "\n        " + escape2(tooltipAlignment && `bx--tooltip--align-${tooltipAlignment}`),
    "bx--text-input--password__visibility__toggle bx--btn bx--btn--icon-only " + (disabled ? "bx--btn--disabled" : "") + " bx--tooltip__trigger bx--tooltip--a11y"
  ].join(" ").trim()}">${!disabled ? `<span${add_classes(["bx--assistive-text"].join(" ").trim())}>${type === "text" ? `${escape2(hidePasswordLabel)}` : `${escape2(showPasswordLabel)}`}</span>` : ``}
      ${type === "text" ? `${validate_component(ViewOff16, "ViewOff16").$$render($$result, {class: "bx--icon-visibility-off"}, {}, {})}` : `${validate_component(View16, "View16").$$render($$result, {class: "bx--icon-visibility-on"}, {}, {})}`}</button></div>
  ${!invalid && helperText ? `<div${add_classes([
    "bx--form__helper-text " + (disabled ? "bx--form__helper-text--disabled" : "")
  ].join(" ").trim())}>${escape2(helperText)}</div>` : ``}
  ${invalid ? `<div${add_attribute("id", errorId, 0)}${add_classes(["bx--form-requirement"].join(" ").trim())}>${escape2(invalidText)}</div>` : ``}</div>`;
});
create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["light"]);
  let {light = false} = $$props;
  if ($$props.light === void 0 && $$bindings.light && light !== void 0)
    $$bindings.light(light);
  return `<div${spread([$$restProps], "bx--tile " + (light ? "bx--tile--light" : ""))}>${slots.default ? slots.default({}) : ``}</div>`;
});
create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["clicked", "light", "disabled", "href"]);
  let {clicked = false} = $$props;
  let {light = false} = $$props;
  let {disabled = false} = $$props;
  let {href = void 0} = $$props;
  if ($$props.clicked === void 0 && $$bindings.clicked && clicked !== void 0)
    $$bindings.clicked(clicked);
  if ($$props.light === void 0 && $$bindings.light && light !== void 0)
    $$bindings.light(light);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  if ($$props.href === void 0 && $$bindings.href && href !== void 0)
    $$bindings.href(href);
  return `${validate_component(Link, "Link").$$render($$result, Object.assign($$restProps, {disabled}, {
    class: "bx--tile bx--tile--clickable " + (clicked && "bx--tile--is-clicked") + " " + (light && "bx--tile--light") + " " + $$restProps.class
  }, {href}), {}, {
    default: () => `${slots.default ? slots.default({}) : ``}`
  })}`;
});
create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, [
    "expanded",
    "light",
    "tileMaxHeight",
    "tilePadding",
    "tileCollapsedIconText",
    "tileExpandedIconText",
    "tileExpandedLabel",
    "tileCollapsedLabel",
    "tabindex",
    "id",
    "ref"
  ]);
  let {expanded = false} = $$props;
  let {light = false} = $$props;
  let {tileMaxHeight = 0} = $$props;
  let {tilePadding = 0} = $$props;
  let {tileCollapsedIconText = "Interact to expand Tile"} = $$props;
  let {tileExpandedIconText = "Interact to collapse Tile"} = $$props;
  let {tileExpandedLabel = ""} = $$props;
  let {tileCollapsedLabel = ""} = $$props;
  let {tabindex = "0"} = $$props;
  let {id = "ccs-" + Math.random().toString(36)} = $$props;
  let {ref = null} = $$props;
  let refContent = null;
  let refAbove = null;
  afterUpdate(() => {
    if (tileMaxHeight === 0) {
      tileMaxHeight = refAbove.getBoundingClientRect().height;
    }
    const style = getComputedStyle(ref);
    tilePadding = parseInt(style.getPropertyValue("padding-top"), 10) + parseInt(style.getPropertyValue("padding-bottom"), 10);
  });
  if ($$props.expanded === void 0 && $$bindings.expanded && expanded !== void 0)
    $$bindings.expanded(expanded);
  if ($$props.light === void 0 && $$bindings.light && light !== void 0)
    $$bindings.light(light);
  if ($$props.tileMaxHeight === void 0 && $$bindings.tileMaxHeight && tileMaxHeight !== void 0)
    $$bindings.tileMaxHeight(tileMaxHeight);
  if ($$props.tilePadding === void 0 && $$bindings.tilePadding && tilePadding !== void 0)
    $$bindings.tilePadding(tilePadding);
  if ($$props.tileCollapsedIconText === void 0 && $$bindings.tileCollapsedIconText && tileCollapsedIconText !== void 0)
    $$bindings.tileCollapsedIconText(tileCollapsedIconText);
  if ($$props.tileExpandedIconText === void 0 && $$bindings.tileExpandedIconText && tileExpandedIconText !== void 0)
    $$bindings.tileExpandedIconText(tileExpandedIconText);
  if ($$props.tileExpandedLabel === void 0 && $$bindings.tileExpandedLabel && tileExpandedLabel !== void 0)
    $$bindings.tileExpandedLabel(tileExpandedLabel);
  if ($$props.tileCollapsedLabel === void 0 && $$bindings.tileCollapsedLabel && tileCollapsedLabel !== void 0)
    $$bindings.tileCollapsedLabel(tileCollapsedLabel);
  if ($$props.tabindex === void 0 && $$bindings.tabindex && tabindex !== void 0)
    $$bindings.tabindex(tabindex);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.ref === void 0 && $$bindings.ref && ref !== void 0)
    $$bindings.ref(ref);
  return `<button${spread([
    {type: "button"},
    {id: escape2(id)},
    {"aria-expanded": escape2(expanded)},
    {tabindex: escape2(tabindex)},
    {
      title: escape2(expanded ? tileExpandedIconText : tileCollapsedIconText)
    },
    $$restProps,
    {
      style: escape2(expanded ? $$restProps.style : `${$$restProps.style}; max-height: ${tileMaxHeight + tilePadding}px`)
    }
  ], "bx--tile bx--tile--expandable " + (expanded ? "bx--tile--is-expanded" : "") + " " + (light ? "bx--tile--light" : ""))}${add_attribute("this", ref, 1)}><div${add_attribute("this", refContent, 1)}><div${add_classes(["bx--tile-content"].join(" ").trim())}${add_attribute("this", refAbove, 1)}><span${add_classes(["bx--tile-content__above-the-fold"].join(" ").trim())}>${slots.above ? slots.above({}) : ``}</span></div>
    <div${add_classes(["bx--tile__chevron"].join(" ").trim())}><span>${escape2(expanded ? tileExpandedLabel : tileCollapsedLabel)}</span>
      ${validate_component(ChevronDown16, "ChevronDown16").$$render($$result, {}, {}, {})}</div>
    <div${add_classes(["bx--tile-content"].join(" ").trim())}><span${add_classes(["bx--tile-content__below-the-fold"].join(" ").trim())}>${slots.below ? slots.below({}) : ``}</span></div></div></button>`;
});
create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, [
    "selected",
    "light",
    "disabled",
    "title",
    "value",
    "tabindex",
    "iconDescription",
    "id",
    "name",
    "ref"
  ]);
  let {selected = false} = $$props;
  let {light = false} = $$props;
  let {disabled = false} = $$props;
  let {title = "title"} = $$props;
  let {value = "value"} = $$props;
  let {tabindex = "0"} = $$props;
  let {iconDescription = "Tile checkmark"} = $$props;
  let {id = "ccs-" + Math.random().toString(36)} = $$props;
  let {name = ""} = $$props;
  let {ref = null} = $$props;
  const dispatch = createEventDispatcher();
  if ($$props.selected === void 0 && $$bindings.selected && selected !== void 0)
    $$bindings.selected(selected);
  if ($$props.light === void 0 && $$bindings.light && light !== void 0)
    $$bindings.light(light);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  if ($$props.tabindex === void 0 && $$bindings.tabindex && tabindex !== void 0)
    $$bindings.tabindex(tabindex);
  if ($$props.iconDescription === void 0 && $$bindings.iconDescription && iconDescription !== void 0)
    $$bindings.iconDescription(iconDescription);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.name === void 0 && $$bindings.name && name !== void 0)
    $$bindings.name(name);
  if ($$props.ref === void 0 && $$bindings.ref && ref !== void 0)
    $$bindings.ref(ref);
  {
    if (!disabled)
      dispatch(selected ? "select" : "deselect", id);
  }
  return `<input type="${"checkbox"}" tabindex="${"-1"}" ${selected ? "checked" : ""}${add_attribute("id", id, 0)}${add_attribute("value", value, 0)}${add_attribute("name", name, 0)}${add_attribute("title", title, 0)} ${disabled ? "disabled" : ""}${add_classes(["bx--tile-input"].join(" ").trim())}${add_attribute("this", ref, 1)}>
<label${spread([
    {for: escape2(id)},
    {
      tabindex: escape2(disabled ? void 0 : tabindex)
    },
    $$restProps
  ], "bx--tile bx--tile--selectable " + (selected ? "bx--tile--is-selected" : "") + " " + (light ? "bx--tile--light" : "") + " " + (disabled ? "bx--tile--disabled" : ""))}><span${add_classes(["bx--tile__checkmark"].join(" ").trim())}>${validate_component(CheckmarkFilled16, "CheckmarkFilled16").$$render($$result, {
    "aria-label": iconDescription,
    title: iconDescription
  }, {}, {})}</span>
  <span${add_classes(["bx--tile-content"].join(" ").trim())}>${slots.default ? slots.default({}) : ``}</span></label>`;
});
create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["checked", "light", "disabled", "value", "tabindex", "iconDescription", "id", "name"]);
  let $selectedValue, $$unsubscribe_selectedValue;
  let {checked = false} = $$props;
  let {light = false} = $$props;
  let {disabled = false} = $$props;
  let {value = ""} = $$props;
  let {tabindex = "0"} = $$props;
  let {iconDescription = "Tile checkmark"} = $$props;
  let {id = "ccs-" + Math.random().toString(36)} = $$props;
  let {name = ""} = $$props;
  const {add, update: update2, selectedValue} = getContext("TileGroup");
  $$unsubscribe_selectedValue = subscribe(selectedValue, (value2) => $selectedValue = value2);
  add({value, checked});
  if ($$props.checked === void 0 && $$bindings.checked && checked !== void 0)
    $$bindings.checked(checked);
  if ($$props.light === void 0 && $$bindings.light && light !== void 0)
    $$bindings.light(light);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  if ($$props.tabindex === void 0 && $$bindings.tabindex && tabindex !== void 0)
    $$bindings.tabindex(tabindex);
  if ($$props.iconDescription === void 0 && $$bindings.iconDescription && iconDescription !== void 0)
    $$bindings.iconDescription(iconDescription);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.name === void 0 && $$bindings.name && name !== void 0)
    $$bindings.name(name);
  checked = value === $selectedValue;
  $$unsubscribe_selectedValue();
  return `<input type="${"radio"}"${add_attribute("id", id, 0)}${add_attribute("name", name, 0)}${add_attribute("value", value, 0)} ${checked ? "checked" : ""}${add_attribute("tabindex", disabled ? void 0 : tabindex, 0)} ${disabled ? "disabled" : ""}${add_classes(["bx--tile-input"].join(" ").trim())}>
<label${spread([{for: escape2(id)}, $$restProps], "bx--tile bx--tile--selectable " + (checked ? "bx--tile--is-selected" : "") + " " + (light ? "bx--tile--light" : "") + " " + (disabled ? "bx--tile--disabled" : ""))}><span${add_classes(["bx--tile__checkmark"].join(" ").trim())}>${validate_component(CheckmarkFilled16, "CheckmarkFilled16").$$render($$result, {
    "aria-label": iconDescription,
    title: iconDescription
  }, {}, {})}</span>
  <span${add_classes(["bx--tile-content"].join(" ").trim())}>${slots.default ? slots.default({}) : ``}</span></label>`;
});
create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["selected", "disabled", "legend"]);
  let $selectedValue, $$unsubscribe_selectedValue;
  let {selected = void 0} = $$props;
  let {disabled = false} = $$props;
  let {legend = ""} = $$props;
  const dispatch = createEventDispatcher();
  const selectedValue = writable2(selected);
  $$unsubscribe_selectedValue = subscribe(selectedValue, (value) => $selectedValue = value);
  setContext("TileGroup", {
    selectedValue,
    add: ({checked, value}) => {
      if (checked) {
        selectedValue.set(value);
      }
    },
    update: (value) => {
      selectedValue.set(value);
    }
  });
  if ($$props.selected === void 0 && $$bindings.selected && selected !== void 0)
    $$bindings.selected(selected);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  if ($$props.legend === void 0 && $$bindings.legend && legend !== void 0)
    $$bindings.legend(legend);
  selected = $selectedValue;
  {
    dispatch("select", $selectedValue);
  }
  $$unsubscribe_selectedValue();
  return `<fieldset${spread([{disabled: disabled || null}, $$restProps], "bx--tile-group")}>${legend ? `<legend${add_classes(["bx--label"].join(" ").trim())}>${escape2(legend)}</legend>` : ``}
  <div>${slots.default ? slots.default({}) : ``}</div></fieldset>`;
});
create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, [
    "size",
    "value",
    "type",
    "placeholder",
    "pattern",
    "maxlength",
    "light",
    "disabled",
    "labelText",
    "hideLabel",
    "invalid",
    "invalidText",
    "id",
    "name",
    "ref"
  ]);
  let {size = void 0} = $$props;
  let {value = ""} = $$props;
  let {type = "text"} = $$props;
  let {placeholder = "hh:mm"} = $$props;
  let {pattern = "(1[012]|[1-9]):[0-5][0-9](\\s)?"} = $$props;
  let {maxlength = 5} = $$props;
  let {light = false} = $$props;
  let {disabled = false} = $$props;
  let {labelText = ""} = $$props;
  let {hideLabel = false} = $$props;
  let {invalid = false} = $$props;
  let {invalidText = ""} = $$props;
  let {id = "ccs-" + Math.random().toString(36)} = $$props;
  let {name = void 0} = $$props;
  let {ref = null} = $$props;
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  if ($$props.type === void 0 && $$bindings.type && type !== void 0)
    $$bindings.type(type);
  if ($$props.placeholder === void 0 && $$bindings.placeholder && placeholder !== void 0)
    $$bindings.placeholder(placeholder);
  if ($$props.pattern === void 0 && $$bindings.pattern && pattern !== void 0)
    $$bindings.pattern(pattern);
  if ($$props.maxlength === void 0 && $$bindings.maxlength && maxlength !== void 0)
    $$bindings.maxlength(maxlength);
  if ($$props.light === void 0 && $$bindings.light && light !== void 0)
    $$bindings.light(light);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  if ($$props.labelText === void 0 && $$bindings.labelText && labelText !== void 0)
    $$bindings.labelText(labelText);
  if ($$props.hideLabel === void 0 && $$bindings.hideLabel && hideLabel !== void 0)
    $$bindings.hideLabel(hideLabel);
  if ($$props.invalid === void 0 && $$bindings.invalid && invalid !== void 0)
    $$bindings.invalid(invalid);
  if ($$props.invalidText === void 0 && $$bindings.invalidText && invalidText !== void 0)
    $$bindings.invalidText(invalidText);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.name === void 0 && $$bindings.name && name !== void 0)
    $$bindings.name(name);
  if ($$props.ref === void 0 && $$bindings.ref && ref !== void 0)
    $$bindings.ref(ref);
  return `<div${add_classes(["bx--form-item"].join(" ").trim())}><div${add_classes([
    "bx--time-picker " + (light ? "bx--time-picker--light" : "") + " " + (invalid ? "bx--time-picker--invalid" : "") + " " + (size === "sm" ? "bx--time-picker--sm" : "") + " " + (size === "xl" ? "bx--time-picker--xl" : "") + " " + (light ? "bx--select--light" : "")
  ].join(" ").trim())}><div${add_classes(["bx--time-picker__input"].join(" ").trim())}>${labelText ? `<label${add_attribute("for", id, 0)}${add_classes([
    "bx--label " + (hideLabel ? "bx--visually-hidden" : "") + " " + (disabled ? "bx--label--disabled" : "")
  ].join(" ").trim())}>${escape2(labelText)}</label>` : ``}
      <input${spread([
    {
      "data-invalid": escape2(invalid || void 0)
    },
    {pattern: escape2(pattern)},
    {placeholder: escape2(placeholder)},
    {maxlength: escape2(maxlength)},
    {id: escape2(id)},
    {name: escape2(name)},
    {type: escape2(type)},
    {value: escape2(value)},
    {disabled: disabled || null},
    $$restProps
  ], "bx--time-picker__input-field bx--text-input " + (light ? "bx--text-input--light" : "") + " " + (invalid ? "bx--text-input--invalid" : ""))}${add_attribute("this", ref, 1)}></div>
    ${slots.default ? slots.default({}) : ``}</div>
  ${invalid ? `<div${add_classes(["bx--form-requirement"].join(" ").trim())}>${escape2(invalidText)}</div>` : ``}</div>`;
});
create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["value", "disabled", "iconDescription", "labelText", "hideLabel", "id", "name", "ref"]);
  let $selectedValue, $$unsubscribe_selectedValue;
  let {value = ""} = $$props;
  let {disabled = false} = $$props;
  let {iconDescription = "Open list of options"} = $$props;
  let {labelText = ""} = $$props;
  let {hideLabel = true} = $$props;
  let {id = "ccs-" + Math.random().toString(36)} = $$props;
  let {name = void 0} = $$props;
  let {ref = null} = $$props;
  const selectedValue = writable2(value);
  $$unsubscribe_selectedValue = subscribe(selectedValue, (value2) => $selectedValue = value2);
  setContext("TimePickerSelect", {selectedValue});
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  if ($$props.iconDescription === void 0 && $$bindings.iconDescription && iconDescription !== void 0)
    $$bindings.iconDescription(iconDescription);
  if ($$props.labelText === void 0 && $$bindings.labelText && labelText !== void 0)
    $$bindings.labelText(labelText);
  if ($$props.hideLabel === void 0 && $$bindings.hideLabel && hideLabel !== void 0)
    $$bindings.hideLabel(hideLabel);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.name === void 0 && $$bindings.name && name !== void 0)
    $$bindings.name(name);
  if ($$props.ref === void 0 && $$bindings.ref && ref !== void 0)
    $$bindings.ref(ref);
  value = $selectedValue;
  {
    selectedValue.set(value);
  }
  $$unsubscribe_selectedValue();
  return `<div${spread([$$restProps], "bx--select bx--time-picker__select")}>${labelText ? `<label${add_attribute("for", id, 0)}${add_classes(["bx--label " + (hideLabel ? "bx--visually-hidden" : "")].join(" ").trim())}>
      ${escape2(labelText)}</label>` : ``}
  
  <select${add_attribute("id", id, 0)}${add_attribute("name", name, 0)} ${disabled ? "disabled" : ""}${add_attribute("value", value, 0)}${add_classes(["bx--select-input"].join(" ").trim())}${add_attribute("this", ref, 1)}>${slots.default ? slots.default({}) : ``}</select>
  ${validate_component(ChevronDownGlyph, "ChevronDownGlyph").$$render($$result, {
    "aria-label": iconDescription,
    title: iconDescription,
    class: "bx--select__arrow"
  }, {}, {})}</div>`;
});
create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["size", "toggled", "disabled", "labelA", "labelB", "labelText", "id", "name"]);
  let {size = "default"} = $$props;
  let {toggled = false} = $$props;
  let {disabled = false} = $$props;
  let {labelA = "Off"} = $$props;
  let {labelB = "On"} = $$props;
  let {labelText = ""} = $$props;
  let {id = "ccs-" + Math.random().toString(36)} = $$props;
  let {name = void 0} = $$props;
  const dispatch = createEventDispatcher();
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  if ($$props.toggled === void 0 && $$bindings.toggled && toggled !== void 0)
    $$bindings.toggled(toggled);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  if ($$props.labelA === void 0 && $$bindings.labelA && labelA !== void 0)
    $$bindings.labelA(labelA);
  if ($$props.labelB === void 0 && $$bindings.labelB && labelB !== void 0)
    $$bindings.labelB(labelB);
  if ($$props.labelText === void 0 && $$bindings.labelText && labelText !== void 0)
    $$bindings.labelText(labelText);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.name === void 0 && $$bindings.name && name !== void 0)
    $$bindings.name(name);
  {
    dispatch("toggle", {toggled});
  }
  return `<div${spread([$$restProps], "bx--form-item")}><input type="${"checkbox"}" ${toggled ? "checked" : ""} ${disabled ? "disabled" : ""}${add_attribute("id", id, 0)}${add_attribute("name", name, 0)}${add_classes([
    "bx--toggle-input " + (size === "sm" ? "bx--toggle-input--small" : "")
  ].join(" ").trim())}>
  <label${add_attribute("aria-label", labelText ? void 0 : $$props["aria-label"] || "Toggle", 0)}${add_attribute("for", id, 0)}${add_classes(["bx--toggle-input__label"].join(" ").trim())}>${escape2(labelText)}
    <span${add_classes(["bx--toggle__switch"].join(" ").trim())}><span aria-hidden="${"true"}"${add_classes(["bx--toggle__text--off"].join(" ").trim())}>${escape2(labelA)}</span>
      <span aria-hidden="${"true"}"${add_classes(["bx--toggle__text--on"].join(" ").trim())}>${escape2(labelB)}</span></span></label></div>`;
});
create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["size", "labelText", "id"]);
  let {size = "default"} = $$props;
  let {labelText = ""} = $$props;
  let {id = "ccs-" + Math.random().toString(36)} = $$props;
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  if ($$props.labelText === void 0 && $$bindings.labelText && labelText !== void 0)
    $$bindings.labelText(labelText);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  return `<div${spread([$$restProps], "bx--form-item")}><input type="${"checkbox"}"${add_attribute("id", id, 0)}${add_classes([
    "bx--toggle " + (size === "sm" ? "bx--toggle--small" : "") + " bx--skeleton"
  ].join(" ").trim())}>
  <label${add_attribute("aria-label", labelText ? void 0 : $$props["aria-label"] || "Toggle is loading", 0)}${add_attribute("for", id, 0)}${add_classes(["bx--toggle__label bx--skeleton"].join(" ").trim())}>${labelText ? `<span${add_classes(["bx--toggle__label-text"].join(" ").trim())}>${escape2(labelText)}</span>` : ``}
    <span${add_classes(["bx--toggle__text--left"].join(" ").trim())}></span>
    <span${add_classes(["bx--toggle__appearance"].join(" ").trim())}></span>
    <span${add_classes(["bx--toggle__text--right"].join(" ").trim())}></span></label></div>`;
});
create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["toggled", "disabled", "labelA", "labelB", "labelText", "id", "name"]);
  let {toggled = false} = $$props;
  let {disabled = false} = $$props;
  let {labelA = "Off"} = $$props;
  let {labelB = "On"} = $$props;
  let {labelText = ""} = $$props;
  let {id = "ccs-" + Math.random().toString(36)} = $$props;
  let {name = void 0} = $$props;
  if ($$props.toggled === void 0 && $$bindings.toggled && toggled !== void 0)
    $$bindings.toggled(toggled);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  if ($$props.labelA === void 0 && $$bindings.labelA && labelA !== void 0)
    $$bindings.labelA(labelA);
  if ($$props.labelB === void 0 && $$bindings.labelB && labelB !== void 0)
    $$bindings.labelB(labelB);
  if ($$props.labelText === void 0 && $$bindings.labelText && labelText !== void 0)
    $$bindings.labelText(labelText);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.name === void 0 && $$bindings.name && name !== void 0)
    $$bindings.name(name);
  return `<div${spread([$$restProps], "bx--form-item")}><input type="${"checkbox"}" ${toggled ? "checked" : ""} ${disabled ? "disabled" : ""}${add_attribute("id", id, 0)}${add_attribute("name", name, 0)}${add_classes([
    "bx--toggle-input bx--toggle-input--small"
  ].join(" ").trim())}>
  <label${add_attribute("aria-label", labelText ? void 0 : $$props["aria-label"] || "Toggle", 0)}${add_attribute("for", id, 0)}${add_classes(["bx--toggle-input__label"].join(" ").trim())}>${escape2(labelText)}
    <span${add_classes(["bx--toggle__switch"].join(" ").trim())}><svg width="${"6"}" height="${"5"}" viewBox="${"0 0 6 5"}"${add_classes(["bx--toggle__check"].join(" ").trim())}><path d="${"M2.2 2.7L5 0 6 1 2.2 5 0 2.7 1 1.5z"}"></path></svg>
      <span aria-hidden="${"true"}"${add_classes(["bx--toggle__text--off"].join(" ").trim())}>${escape2(labelA)}</span>
      <span aria-hidden="${"true"}"${add_classes(["bx--toggle__text--on"].join(" ").trim())}>${escape2(labelB)}</span></span></label></div>`;
});
create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["labelText", "id"]);
  let {labelText = ""} = $$props;
  let {id = "ccs-" + Math.random().toString(36)} = $$props;
  if ($$props.labelText === void 0 && $$bindings.labelText && labelText !== void 0)
    $$bindings.labelText(labelText);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  return `<div${spread([$$restProps], "bx--form-item")}><input type="${"checkbox"}"${add_attribute("id", id, 0)}${add_classes([
    "bx--toggle bx--toggle--small bx--skeleton"
  ].join(" ").trim())}>
  <label${add_attribute("aria-label", labelText ? void 0 : $$props["aria-label"] || "Toggle is loading", 0)}${add_attribute("for", id, 0)}${add_classes(["bx--toggle__label bx--skeleton"].join(" ").trim())}>${labelText ? `<span${add_classes(["bx--toggle__label-text"].join(" ").trim())}>${escape2(labelText)}</span>` : ``}
    <span${add_classes(["bx--toggle__appearance"].join(" ").trim())}><svg width="${"6"}" height="${"5"}" viewBox="${"0 0 6 5"}"${add_classes(["bx--toggle__check"].join(" ").trim())}><path d="${"M2.2403 2.7299L4.9245 0 6 1.1117 2.2384 5 0 2.6863 1.0612 1.511z"}"></path></svg></span></label></div>`;
});
var Information16 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let ariaLabel;
  let ariaLabelledBy;
  let labelled;
  let attributes;
  let {class: className = void 0} = $$props;
  let {id = void 0} = $$props;
  let {tabindex = void 0} = $$props;
  let {focusable = false} = $$props;
  let {title = void 0} = $$props;
  let {style = void 0} = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.tabindex === void 0 && $$bindings.tabindex && tabindex !== void 0)
    $$bindings.tabindex(tabindex);
  if ($$props.focusable === void 0 && $$bindings.focusable && focusable !== void 0)
    $$bindings.focusable(focusable);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.style === void 0 && $$bindings.style && style !== void 0)
    $$bindings.style(style);
  ariaLabel = $$props["aria-label"];
  ariaLabelledBy = $$props["aria-labelledby"];
  labelled = ariaLabel || ariaLabelledBy || title;
  attributes = {
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    "aria-hidden": labelled ? void 0 : true,
    role: labelled ? "img" : void 0,
    focusable: tabindex === "0" ? true : focusable,
    tabindex
  };
  return `<svg${spread([
    {"data-carbon-icon": "Information16"},
    {xmlns: "http://www.w3.org/2000/svg"},
    {viewBox: "0 0 16 16"},
    {fill: "currentColor"},
    {width: "16"},
    {height: "16"},
    {class: escape2(className)},
    {preserveAspectRatio: "xMidYMid meet"},
    {style: escape2(style)},
    {id: escape2(id)},
    attributes
  ])}><path d="${"M8.5 11L8.5 6.5 6.5 6.5 6.5 7.5 7.5 7.5 7.5 11 6 11 6 12 10 12 10 11zM8 3.5c-.4 0-.8.3-.8.8S7.6 5 8 5c.4 0 .8-.3.8-.8S8.4 3.5 8 3.5z"}"></path><path d="${"M8,15c-3.9,0-7-3.1-7-7s3.1-7,7-7s7,3.1,7,7S11.9,15,8,15z M8,2C4.7,2,2,4.7,2,8s2.7,6,6,6s6-2.7,6-6S11.3,2,8,2z"}"></path>${slots.default ? slots.default({}) : `
    ${title ? `<title>${escape2(title)}</title>` : ``}
  `}</svg>`;
});
create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let buttonProps;
  let $$restProps = compute_rest_props($$props, [
    "align",
    "direction",
    "open",
    "hideIcon",
    "icon",
    "iconDescription",
    "iconName",
    "tabindex",
    "tooltipId",
    "triggerId",
    "triggerText",
    "ref",
    "refTooltip",
    "refIcon"
  ]);
  let {align = "center"} = $$props;
  let {direction: direction2 = "bottom"} = $$props;
  let {open = false} = $$props;
  let {hideIcon = false} = $$props;
  let {icon = Information16} = $$props;
  let {iconDescription = ""} = $$props;
  let {iconName = ""} = $$props;
  let {tabindex = "0"} = $$props;
  let {tooltipId = "ccs-" + Math.random().toString(36)} = $$props;
  let {triggerId = "ccs-" + Math.random().toString(36)} = $$props;
  let {triggerText = ""} = $$props;
  let {ref = null} = $$props;
  let {refTooltip = null} = $$props;
  let {refIcon = null} = $$props;
  const dispatch = createEventDispatcher();
  const tooltipOpen = writable2(open);
  setContext("Tooltip", {tooltipOpen});
  afterUpdate(() => {
    if (open) {
      const button = ref.getBoundingClientRect();
      const tooltip = refTooltip.getBoundingClientRect();
      let iconWidth = 16;
      let iconHeight = 16;
      if (refIcon) {
        const icon2 = refIcon.getBoundingClientRect();
        iconWidth = icon2.width;
        iconHeight = icon2.height;
      }
      let offsetX = 0;
      let offsetY = 0;
      switch (direction2) {
        case "bottom":
          if (hideIcon) {
            offsetX = -1 * (tooltip.width / 2 - button.width / 2);
          } else {
            offsetX = -1 * (tooltip.width / 2 - button.width + iconWidth / 2);
          }
          offsetY = iconHeight / 2;
          break;
        case "right":
          offsetX = button.width + 6;
          offsetY = -1 * (tooltip.height / 2 + iconWidth / 2 - 3);
          break;
        case "left":
          if (hideIcon) {
            offsetX = -1 * (tooltip.width + 6 + 1);
          } else {
            offsetX = -1 * (tooltip.width - button.width + iconWidth + 8);
          }
          offsetY = -1 * (tooltip.height / 2 + button.height) - 2;
          break;
        case "top":
          if (hideIcon) {
            offsetX = -1 * (tooltip.width / 2 - button.width / 2);
          } else {
            offsetX = -1 * (tooltip.width / 2 - button.width + iconWidth / 2 + 1);
          }
          offsetY = -1 * (tooltip.height + button.height + iconWidth / 2 - 1);
          break;
      }
      refTooltip.style.left = offsetX + "px";
      refTooltip.style.marginTop = offsetY + "px";
    }
  });
  if ($$props.align === void 0 && $$bindings.align && align !== void 0)
    $$bindings.align(align);
  if ($$props.direction === void 0 && $$bindings.direction && direction2 !== void 0)
    $$bindings.direction(direction2);
  if ($$props.open === void 0 && $$bindings.open && open !== void 0)
    $$bindings.open(open);
  if ($$props.hideIcon === void 0 && $$bindings.hideIcon && hideIcon !== void 0)
    $$bindings.hideIcon(hideIcon);
  if ($$props.icon === void 0 && $$bindings.icon && icon !== void 0)
    $$bindings.icon(icon);
  if ($$props.iconDescription === void 0 && $$bindings.iconDescription && iconDescription !== void 0)
    $$bindings.iconDescription(iconDescription);
  if ($$props.iconName === void 0 && $$bindings.iconName && iconName !== void 0)
    $$bindings.iconName(iconName);
  if ($$props.tabindex === void 0 && $$bindings.tabindex && tabindex !== void 0)
    $$bindings.tabindex(tabindex);
  if ($$props.tooltipId === void 0 && $$bindings.tooltipId && tooltipId !== void 0)
    $$bindings.tooltipId(tooltipId);
  if ($$props.triggerId === void 0 && $$bindings.triggerId && triggerId !== void 0)
    $$bindings.triggerId(triggerId);
  if ($$props.triggerText === void 0 && $$bindings.triggerText && triggerText !== void 0)
    $$bindings.triggerText(triggerText);
  if ($$props.ref === void 0 && $$bindings.ref && ref !== void 0)
    $$bindings.ref(ref);
  if ($$props.refTooltip === void 0 && $$bindings.refTooltip && refTooltip !== void 0)
    $$bindings.refTooltip(refTooltip);
  if ($$props.refIcon === void 0 && $$bindings.refIcon && refIcon !== void 0)
    $$bindings.refIcon(refIcon);
  {
    tooltipOpen.set(open);
  }
  {
    dispatch(open ? "open" : "close");
  }
  buttonProps = {
    role: "button",
    "aria-haspopup": "true",
    id: hideIcon ? triggerId : void 0,
    class: hideIcon ? "bx--tooltip__label" : "bx--tooltip__trigger",
    "aria-expanded": open,
    "aria-describedby": open ? tooltipId : void 0,
    "aria-labelledby": triggerText ? triggerId : void 0,
    "aria-label": triggerText ? iconDescription : void 0,
    tabindex,
    style: hideIcon ? $$restProps.style : void 0
  };
  return `

<div${spread([
    $$restProps,
    {
      style: escape2(open ? "z-index: 1;" : "") + escape2($$restProps.style) + "; position: relative;"
    }
  ])}>${!hideIcon ? `<div${add_attribute("id", triggerId, 0)}${add_classes(["bx--tooltip__label"].join(" ").trim())}${add_attribute("this", ref, 1)}>${slots.triggerText ? slots.triggerText({}) : `${escape2(triggerText)}`}
      <div${spread([buttonProps])}${add_attribute("this", refIcon, 1)}>${slots.icon ? slots.icon({}) : `
          ${validate_component(icon || missing_component, "svelte:component").$$render($$result, {name: iconName}, {}, {})}
        `}</div></div>` : `<div${spread([buttonProps])}${add_attribute("this", ref, 1)}>${slots.triggerText ? slots.triggerText({}) : `${escape2(triggerText)}`}</div>`}
  ${open ? `<div role="${"tooltip"}"${add_attribute("id", tooltipId, 0)}${add_attribute("data-floating-menu-direction", direction2, 0)}${add_classes([
    "bx--tooltip " + (open ? "bx--tooltip--shown" : "") + " " + (direction2 === "top" ? "bx--tooltip--top" : "") + " " + (direction2 === "right" ? "bx--tooltip--right" : "") + " " + (direction2 === "bottom" ? "bx--tooltip--bottom" : "") + " " + (direction2 === "left" ? "bx--tooltip--left" : "") + " " + (align === "center" ? "bx--tooltip--align-center" : "") + " " + (align === "start" ? "bx--tooltip--align-start" : "") + " " + (align === "end" ? "bx--tooltip--align-end" : "")
  ].join(" ").trim())}${add_attribute("this", refTooltip, 1)}><span${add_classes(["bx--tooltip__caret"].join(" ").trim())}></span>
      <div tabIndex="${"-1"}" role="${"dialog"}"${add_attribute("aria-describedby", $$props["tooltipBodyId"], 0)}${add_attribute("aria-labelledby", triggerId, 0)}${add_classes(["bx--tooltip__content"].join(" ").trim())}>${slots.default ? slots.default({}) : ``}</div></div>` : ``}</div>`;
});
create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let {selectorPrimaryFocus = "a[href], button:not([disabled])"} = $$props;
  let ref = null;
  let open = false;
  const ctx = getContext("Tooltip");
  const unsubscribe = ctx.tooltipOpen.subscribe((tooltipOpen) => {
    open = tooltipOpen;
  });
  onMount(() => {
    return () => {
      unsubscribe();
    };
  });
  if ($$props.selectorPrimaryFocus === void 0 && $$bindings.selectorPrimaryFocus && selectorPrimaryFocus !== void 0)
    $$bindings.selectorPrimaryFocus(selectorPrimaryFocus);
  {
    if (open && ref) {
      const node = ref.querySelector(selectorPrimaryFocus);
      if (node)
        node.focus();
    }
  }
  return `<div${add_classes(["bx--tooltip__footer"].join(" ").trim())}${add_attribute("this", ref, 1)}>${slots.default ? slots.default({}) : ``}</div>`;
});
create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["tooltipText", "align", "direction", "id", "ref"]);
  let {tooltipText = ""} = $$props;
  let {align = "center"} = $$props;
  let {direction: direction2 = "bottom"} = $$props;
  let {id = "ccs-" + Math.random().toString(36)} = $$props;
  let {ref = null} = $$props;
  if ($$props.tooltipText === void 0 && $$bindings.tooltipText && tooltipText !== void 0)
    $$bindings.tooltipText(tooltipText);
  if ($$props.align === void 0 && $$bindings.align && align !== void 0)
    $$bindings.align(align);
  if ($$props.direction === void 0 && $$bindings.direction && direction2 !== void 0)
    $$bindings.direction(direction2);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.ref === void 0 && $$bindings.ref && ref !== void 0)
    $$bindings.ref(ref);
  return `

<div${spread([$$restProps], "bx--tooltip--definition bx--tooltip--a11y")}><button${add_attribute("aria-describedby", id, 0)}${add_classes([
    "bx--tooltip--a11y bx--tooltip__trigger bx--tooltip__trigger--definition bx--tooltip--hidden  " + (direction2 === "top" ? "bx--tooltip--top" : "") + " " + (direction2 === "bottom" ? "bx--tooltip--bottom" : "") + " " + (align === "start" ? "bx--tooltip--align-start" : "") + " " + (align === "center" ? "bx--tooltip--align-center" : "") + " " + (align === "end" ? "bx--tooltip--align-end" : "")
  ].join(" ").trim())}${add_attribute("this", ref, 1)}>${slots.default ? slots.default({}) : ``}</button>
  <div role="${"tooltip"}"${add_attribute("id", id, 0)}${add_classes(["bx--assistive-text"].join(" ").trim())}>${slots.tooltip ? slots.tooltip({}) : `${escape2(tooltipText)}`}</div></div>`;
});
create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["tooltipText", "align", "direction", "id", "ref"]);
  let {tooltipText = ""} = $$props;
  let {align = "center"} = $$props;
  let {direction: direction2 = "bottom"} = $$props;
  let {id = "ccs-" + Math.random().toString(36)} = $$props;
  let {ref = null} = $$props;
  if ($$props.tooltipText === void 0 && $$bindings.tooltipText && tooltipText !== void 0)
    $$bindings.tooltipText(tooltipText);
  if ($$props.align === void 0 && $$bindings.align && align !== void 0)
    $$bindings.align(align);
  if ($$props.direction === void 0 && $$bindings.direction && direction2 !== void 0)
    $$bindings.direction(direction2);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.ref === void 0 && $$bindings.ref && ref !== void 0)
    $$bindings.ref(ref);
  return `

<button${spread([{"aria-describedby": escape2(id)}, $$restProps], "bx--tooltip__trigger bx--tooltip--a11y  " + (direction2 === "top" ? "bx--tooltip--top" : "") + " " + (direction2 === "right" ? "bx--tooltip--right" : "") + " " + (direction2 === "bottom" ? "bx--tooltip--bottom" : "") + " " + (direction2 === "left" ? "bx--tooltip--left" : "") + " " + (align === "start" ? "bx--tooltip--align-start" : "") + " " + (align === "center" ? "bx--tooltip--align-center" : "") + " " + (align === "end" ? "bx--tooltip--align-end" : ""))}${add_attribute("this", ref, 1)}><span${add_attribute("id", id, 0)}${add_classes(["bx--assistive-text"].join(" ").trim())}>${slots.tooltipText ? slots.tooltipText({}) : `${escape2(tooltipText)}`}</span>
  ${slots.default ? slots.default({}) : ``}</button>`;
});
create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["clamp"]);
  let {clamp = "end"} = $$props;
  if ($$props.clamp === void 0 && $$bindings.clamp && clamp !== void 0)
    $$bindings.clamp(clamp);
  return `<p${spread([$$restProps], (clamp === "end" ? "bx--text-truncate--end" : "") + " " + (clamp === "front" ? "bx--text-truncate--front" : ""))}>${slots.default ? slots.default({}) : ``}</p>`;
});
var shouldRenderHamburgerMenu = writable2(false);
var Menu20 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let ariaLabel;
  let ariaLabelledBy;
  let labelled;
  let attributes;
  let {class: className = void 0} = $$props;
  let {id = void 0} = $$props;
  let {tabindex = void 0} = $$props;
  let {focusable = false} = $$props;
  let {title = void 0} = $$props;
  let {style = void 0} = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.tabindex === void 0 && $$bindings.tabindex && tabindex !== void 0)
    $$bindings.tabindex(tabindex);
  if ($$props.focusable === void 0 && $$bindings.focusable && focusable !== void 0)
    $$bindings.focusable(focusable);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.style === void 0 && $$bindings.style && style !== void 0)
    $$bindings.style(style);
  ariaLabel = $$props["aria-label"];
  ariaLabelledBy = $$props["aria-labelledby"];
  labelled = ariaLabel || ariaLabelledBy || title;
  attributes = {
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    "aria-hidden": labelled ? void 0 : true,
    role: labelled ? "img" : void 0,
    focusable: tabindex === "0" ? true : focusable,
    tabindex
  };
  return `<svg${spread([
    {"data-carbon-icon": "Menu20"},
    {xmlns: "http://www.w3.org/2000/svg"},
    {viewBox: "0 0 20 20"},
    {fill: "currentColor"},
    {width: "20"},
    {height: "20"},
    {class: escape2(className)},
    {preserveAspectRatio: "xMidYMid meet"},
    {style: escape2(style)},
    {id: escape2(id)},
    attributes
  ])}><path d="${"M2 14.8H18V16H2zM2 11.2H18V12.399999999999999H2zM2 7.6H18V8.799999999999999H2zM2 4H18V5.2H2z"}"></path>${slots.default ? slots.default({}) : `
    ${title ? `<title>${escape2(title)}</title>` : ``}
  `}</svg>`;
});
var HamburgerMenu = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["ariaLabel", "isOpen", "ref"]);
  let {ariaLabel = void 0} = $$props;
  let {isOpen = false} = $$props;
  let {ref = null} = $$props;
  if ($$props.ariaLabel === void 0 && $$bindings.ariaLabel && ariaLabel !== void 0)
    $$bindings.ariaLabel(ariaLabel);
  if ($$props.isOpen === void 0 && $$bindings.isOpen && isOpen !== void 0)
    $$bindings.isOpen(isOpen);
  if ($$props.ref === void 0 && $$bindings.ref && ref !== void 0)
    $$bindings.ref(ref);
  return `<button${spread([
    {type: "button"},
    {title: "Open menu"},
    {"aria-label": escape2(ariaLabel)},
    $$restProps
  ], "bx--header__action bx--header__menu-trigger bx--header__menu-toggle")}${add_attribute("this", ref, 1)}>${validate_component(Icon, "Icon").$$render($$result, {
    title: isOpen ? "Close" : "Open Menu",
    render: isOpen ? Close20 : Menu20
  }, {}, {})}</button>`;
});
var Header = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let ariaLabel;
  let $$restProps = compute_rest_props($$props, [
    "expandedByDefault",
    "isSideNavOpen",
    "uiShellAriaLabel",
    "href",
    "company",
    "platformName",
    "persistentHamburgerMenu",
    "ref"
  ]);
  let $shouldRenderHamburgerMenu, $$unsubscribe_shouldRenderHamburgerMenu;
  $$unsubscribe_shouldRenderHamburgerMenu = subscribe(shouldRenderHamburgerMenu, (value) => $shouldRenderHamburgerMenu = value);
  let {expandedByDefault = true} = $$props;
  let {isSideNavOpen = false} = $$props;
  let {uiShellAriaLabel = void 0} = $$props;
  let {href = void 0} = $$props;
  let {company = void 0} = $$props;
  let {platformName = ""} = $$props;
  let {persistentHamburgerMenu = false} = $$props;
  let {ref = null} = $$props;
  let winWidth = void 0;
  if ($$props.expandedByDefault === void 0 && $$bindings.expandedByDefault && expandedByDefault !== void 0)
    $$bindings.expandedByDefault(expandedByDefault);
  if ($$props.isSideNavOpen === void 0 && $$bindings.isSideNavOpen && isSideNavOpen !== void 0)
    $$bindings.isSideNavOpen(isSideNavOpen);
  if ($$props.uiShellAriaLabel === void 0 && $$bindings.uiShellAriaLabel && uiShellAriaLabel !== void 0)
    $$bindings.uiShellAriaLabel(uiShellAriaLabel);
  if ($$props.href === void 0 && $$bindings.href && href !== void 0)
    $$bindings.href(href);
  if ($$props.company === void 0 && $$bindings.company && company !== void 0)
    $$bindings.company(company);
  if ($$props.platformName === void 0 && $$bindings.platformName && platformName !== void 0)
    $$bindings.platformName(platformName);
  if ($$props.persistentHamburgerMenu === void 0 && $$bindings.persistentHamburgerMenu && persistentHamburgerMenu !== void 0)
    $$bindings.persistentHamburgerMenu(persistentHamburgerMenu);
  if ($$props.ref === void 0 && $$bindings.ref && ref !== void 0)
    $$bindings.ref(ref);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    isSideNavOpen = expandedByDefault && winWidth >= 1056 && !persistentHamburgerMenu;
    ariaLabel = company ? `${company} ` : "" + (uiShellAriaLabel || $$props["aria-label"] || platformName);
    $$rendered = `

<header role="${"banner"}"${add_attribute("aria-label", ariaLabel, 0)}${add_classes(["bx--header"].join(" ").trim())}>${slots["skip-to-content"] ? slots["skip-to-content"]({}) : ``}
  ${$shouldRenderHamburgerMenu && winWidth < 1056 || persistentHamburgerMenu ? `${validate_component(HamburgerMenu, "HamburgerMenu").$$render($$result, {isOpen: isSideNavOpen}, {
      isOpen: ($$value) => {
        isSideNavOpen = $$value;
        $$settled = false;
      }
    }, {})}` : ``}
  <a${spread([{href: escape2(href)}, $$restProps], "bx--header__name")}${add_attribute("this", ref, 1)}>${company ? `<span${add_classes(["bx--header__name--prefix"].join(" ").trim())}>${escape2(company)}\xA0</span>` : ``}
    ${slots.platform ? slots.platform({}) : `${escape2(platformName)}`}</a>
  ${slots.default ? slots.default({}) : ``}</header>`;
  } while (!$$settled);
  $$unsubscribe_shouldRenderHamburgerMenu();
  return $$rendered;
});
var AppSwitcher20 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let ariaLabel;
  let ariaLabelledBy;
  let labelled;
  let attributes;
  let {class: className = void 0} = $$props;
  let {id = void 0} = $$props;
  let {tabindex = void 0} = $$props;
  let {focusable = false} = $$props;
  let {title = void 0} = $$props;
  let {style = void 0} = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.tabindex === void 0 && $$bindings.tabindex && tabindex !== void 0)
    $$bindings.tabindex(tabindex);
  if ($$props.focusable === void 0 && $$bindings.focusable && focusable !== void 0)
    $$bindings.focusable(focusable);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.style === void 0 && $$bindings.style && style !== void 0)
    $$bindings.style(style);
  ariaLabel = $$props["aria-label"];
  ariaLabelledBy = $$props["aria-labelledby"];
  labelled = ariaLabel || ariaLabelledBy || title;
  attributes = {
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    "aria-hidden": labelled ? void 0 : true,
    role: labelled ? "img" : void 0,
    focusable: tabindex === "0" ? true : focusable,
    tabindex
  };
  return `<svg${spread([
    {"data-carbon-icon": "AppSwitcher20"},
    {xmlns: "http://www.w3.org/2000/svg"},
    {viewBox: "0 0 32 32"},
    {fill: "currentColor"},
    {width: "20"},
    {height: "20"},
    {class: escape2(className)},
    {preserveAspectRatio: "xMidYMid meet"},
    {style: escape2(style)},
    {id: escape2(id)},
    attributes
  ])}><path d="${"M14 4H18V8H14zM4 4H8V8H4zM24 4H28V8H24zM14 14H18V18H14zM4 14H8V18H4zM24 14H28V18H24zM14 24H18V28H14zM4 24H8V28H4zM24 24H28V28H24z"}"></path>${slots.default ? slots.default({}) : `
    ${title ? `<title>${escape2(title)}</title>` : ``}
  `}</svg>`;
});
var css$5 = {
  code: ".action-text.svelte-19vx6se.svelte-19vx6se{font-size:16px;line-height:20px;text-decoration:none;color:#fff;width:100%;padding:0 1rem}.action-text.svelte-19vx6se>span.svelte-19vx6se{margin-left:0.75rem;vertical-align:top}",
  map: '{"version":3,"file":"HeaderAction.svelte","sources":["HeaderAction.svelte"],"sourcesContent":["<script>\\n  /**\\n   * @typedef {{ delay?: number; duration?: number; easing?: (t: number) => number; }} HeaderActionSlideTransition\\n   */\\n\\n  /** Set to `true` to open the panel */\\n  export let isOpen = false;\\n\\n  /**\\n   * Specify the icon from `carbon-icons-svelte` to render\\n   * @type {typeof import(\\"carbon-icons-svelte\\").CarbonIcon}\\n   */\\n  export let icon = undefined;\\n\\n  /**\\n   * Specify the text\\n   * Alternatively, use the named slot \\"text\\" (e.g., <div slot=\\"text\\">...</div>)\\n   * @type {string}\\n   */\\n  export let text = undefined;\\n\\n  /** Obtain a reference to the button HTML element */\\n  export let ref = null;\\n\\n  /**\\n   * Customize the panel transition (i.e., `transition:slide`)\\n   * Set to `false` to disable the transition\\n   * @type {false | HeaderActionSlideTransition}\\n   */\\n  export let transition = { duration: 200 };\\n\\n  import { createEventDispatcher } from \\"svelte\\";\\n  import { slide } from \\"svelte/transition\\";\\n  import Close20 from \\"carbon-icons-svelte/lib/Close20/Close20.svelte\\";\\n  import AppSwitcher20 from \\"carbon-icons-svelte/lib/AppSwitcher20/AppSwitcher20.svelte\\";\\n  import Icon from \\"../../Icon/Icon.svelte\\";\\n\\n  const dispatch = createEventDispatcher();\\n\\n  let refPanel = null;\\n</script>\\n\\n<svelte:window\\n  on:click=\\"{({ target }) => {\\n    if (isOpen && !ref.contains(target) && !refPanel.contains(target)) {\\n      isOpen = false;\\n      dispatch(\'close\');\\n    }\\n  }}\\"\\n/>\\n\\n<div>\\n  <button\\n    bind:this=\\"{ref}\\"\\n    type=\\"button\\"\\n    class:bx--header__action=\\"{true}\\"\\n    class:bx--header__action--active=\\"{isOpen}\\"\\n    class:action-text=\\"{text}\\"\\n    {...$$restProps}\\n    on:click\\n    on:click|stopPropagation=\\"{() => {\\n      isOpen = !isOpen;\\n      dispatch(isOpen ? \'open\' : \'close\');\\n    }}\\"\\n  >\\n    <Icon render=\\"{icon || (isOpen ? Close20 : AppSwitcher20)}\\" />\\n    <slot name=\\"text\\">\\n      {#if text}<span>{text}</span>{/if}\\n    </slot>\\n  </button>\\n  {#if isOpen}\\n    <div\\n      bind:this=\\"{refPanel}\\"\\n      class:bx--header-panel=\\"{true}\\"\\n      class:bx--header-panel--expanded=\\"{true}\\"\\n      transition:slide=\\"{{\\n        ...transition,\\n        duration: transition === false ? 0 : transition.duration,\\n      }}\\"\\n    >\\n      <slot />\\n    </div>\\n  {/if}\\n</div>\\n\\n<style>\\n  .action-text {\\n    font-size: 16px;\\n    line-height: 20px;\\n    text-decoration: none;\\n    color: #fff;\\n    width: 100%;\\n    padding: 0 1rem;\\n  }\\n\\n  .action-text > span {\\n    margin-left: 0.75rem;\\n    vertical-align: top;\\n  }\\n</style>\\n"],"names":[],"mappings":"AAsFE,YAAY,8BAAC,CAAC,AACZ,SAAS,CAAE,IAAI,CACf,WAAW,CAAE,IAAI,CACjB,eAAe,CAAE,IAAI,CACrB,KAAK,CAAE,IAAI,CACX,KAAK,CAAE,IAAI,CACX,OAAO,CAAE,CAAC,CAAC,IAAI,AACjB,CAAC,AAED,2BAAY,CAAG,IAAI,eAAC,CAAC,AACnB,WAAW,CAAE,OAAO,CACpB,cAAc,CAAE,GAAG,AACrB,CAAC"}'
};
create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["isOpen", "icon", "text", "ref", "transition"]);
  let {isOpen = false} = $$props;
  let {icon = void 0} = $$props;
  let {text = void 0} = $$props;
  let {ref = null} = $$props;
  let {transition = {duration: 200}} = $$props;
  createEventDispatcher();
  let refPanel = null;
  if ($$props.isOpen === void 0 && $$bindings.isOpen && isOpen !== void 0)
    $$bindings.isOpen(isOpen);
  if ($$props.icon === void 0 && $$bindings.icon && icon !== void 0)
    $$bindings.icon(icon);
  if ($$props.text === void 0 && $$bindings.text && text !== void 0)
    $$bindings.text(text);
  if ($$props.ref === void 0 && $$bindings.ref && ref !== void 0)
    $$bindings.ref(ref);
  if ($$props.transition === void 0 && $$bindings.transition && transition !== void 0)
    $$bindings.transition(transition);
  $$result.css.add(css$5);
  return `

<div><button${spread([{type: "button"}, $$restProps], "bx--header__action " + (isOpen ? "bx--header__action--active" : "") + " " + (text ? "action-text" : "") + " svelte-19vx6se")}${add_attribute("this", ref, 1)}>${validate_component(Icon, "Icon").$$render($$result, {
    render: icon || (isOpen ? Close20 : AppSwitcher20)
  }, {}, {})}
    ${slots.text ? slots.text({}) : `
      ${text ? `<span class="${"svelte-19vx6se"}">${escape2(text)}</span>` : ``}
    `}</button>
  ${isOpen ? `<div${add_classes([
    "bx--header-panel bx--header-panel--expanded"
  ].join(" ").trim())}${add_attribute("this", refPanel, 1)}>${slots.default ? slots.default({}) : ``}</div>` : ``}
</div>`;
});
var css$4 = {
  code: ".action-link.svelte-1viyq4q{text-align:center;align-items:center;vertical-align:middle;justify-content:center;padding-top:10px}",
  map: '{"version":3,"file":"HeaderActionLink.svelte","sources":["HeaderActionLink.svelte"],"sourcesContent":["<script>\\n  /** Set to `true` to use the active state */\\n  export let linkIsActive = false;\\n\\n  /**\\n   * Specify the `href` attribute\\n   * @type {string}\\n   */\\n  export let href = undefined;\\n\\n  /**\\n   * Specify the icon from `carbon-icons-svelte` to render\\n   * @type {typeof import(\\"carbon-icons-svelte\\").CarbonIcon}\\n   */\\n  export let icon = undefined;\\n\\n  /** Obtain a reference to the HTML anchor element */\\n  export let ref = null;\\n\\n  import Icon from \\"../../Icon/Icon.svelte\\";\\n</script>\\n\\n<a\\n  bind:this=\\"{ref}\\"\\n  class:bx--header__action=\\"{true}\\"\\n  class:bx--header__action--active=\\"{linkIsActive}\\"\\n  class:action-link=\\"{true}\\"\\n  href=\\"{href}\\"\\n  rel=\\"{$$restProps.target === \'_blank\' ? \'noopener noreferrer\' : undefined}\\"\\n  {...$$restProps}\\n>\\n  <Icon render=\\"{icon}\\" />\\n</a>\\n\\n<style>\\n  .action-link {\\n    text-align: center;\\n    align-items: center;\\n    vertical-align: middle;\\n    justify-content: center;\\n    padding-top: 10px;\\n  }\\n</style>\\n"],"names":[],"mappings":"AAmCE,YAAY,eAAC,CAAC,AACZ,UAAU,CAAE,MAAM,CAClB,WAAW,CAAE,MAAM,CACnB,cAAc,CAAE,MAAM,CACtB,eAAe,CAAE,MAAM,CACvB,WAAW,CAAE,IAAI,AACnB,CAAC"}'
};
create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["linkIsActive", "href", "icon", "ref"]);
  let {linkIsActive = false} = $$props;
  let {href = void 0} = $$props;
  let {icon = void 0} = $$props;
  let {ref = null} = $$props;
  if ($$props.linkIsActive === void 0 && $$bindings.linkIsActive && linkIsActive !== void 0)
    $$bindings.linkIsActive(linkIsActive);
  if ($$props.href === void 0 && $$bindings.href && href !== void 0)
    $$bindings.href(href);
  if ($$props.icon === void 0 && $$bindings.icon && icon !== void 0)
    $$bindings.icon(icon);
  if ($$props.ref === void 0 && $$bindings.ref && ref !== void 0)
    $$bindings.ref(ref);
  $$result.css.add(css$4);
  return `<a${spread([
    {href: escape2(href)},
    {
      rel: escape2($$restProps.target === "_blank" ? "noopener noreferrer" : void 0)
    },
    $$restProps
  ], "bx--header__action " + (linkIsActive ? "bx--header__action--active" : "") + " action-link svelte-1viyq4q")}${add_attribute("this", ref, 1)}>${validate_component(Icon, "Icon").$$render($$result, {render: icon}, {}, {})}
</a>`;
});
var Search20 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let ariaLabel;
  let ariaLabelledBy;
  let labelled;
  let attributes;
  let {class: className = void 0} = $$props;
  let {id = void 0} = $$props;
  let {tabindex = void 0} = $$props;
  let {focusable = false} = $$props;
  let {title = void 0} = $$props;
  let {style = void 0} = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.tabindex === void 0 && $$bindings.tabindex && tabindex !== void 0)
    $$bindings.tabindex(tabindex);
  if ($$props.focusable === void 0 && $$bindings.focusable && focusable !== void 0)
    $$bindings.focusable(focusable);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.style === void 0 && $$bindings.style && style !== void 0)
    $$bindings.style(style);
  ariaLabel = $$props["aria-label"];
  ariaLabelledBy = $$props["aria-labelledby"];
  labelled = ariaLabel || ariaLabelledBy || title;
  attributes = {
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    "aria-hidden": labelled ? void 0 : true,
    role: labelled ? "img" : void 0,
    focusable: tabindex === "0" ? true : focusable,
    tabindex
  };
  return `<svg${spread([
    {"data-carbon-icon": "Search20"},
    {xmlns: "http://www.w3.org/2000/svg"},
    {viewBox: "0 0 32 32"},
    {fill: "currentColor"},
    {width: "20"},
    {height: "20"},
    {class: escape2(className)},
    {preserveAspectRatio: "xMidYMid meet"},
    {style: escape2(style)},
    {id: escape2(id)},
    attributes
  ])}><path d="${"M29,27.5859l-7.5521-7.5521a11.0177,11.0177,0,1,0-1.4141,1.4141L27.5859,29ZM4,13a9,9,0,1,1,9,9A9.01,9.01,0,0,1,4,13Z"}"></path>${slots.default ? slots.default({}) : `
    ${title ? `<title>${escape2(title)}</title>` : ``}
  `}</svg>`;
});
var data = [
  {
    href: "#",
    title: "Test title search 1",
    menu: "Test menu 1",
    description: "This is a description for seach #1"
  },
  {
    href: "#",
    title: "Changing text to simulate search",
    menu: "Test menu 2",
    description: "This is a description for seach #2"
  },
  {
    href: "#",
    title: "More testing texts",
    menu: "Test menu 3",
    description: "This is a description for seach #3"
  },
  {
    href: "#",
    title: "We can find here another test text",
    menu: "Test menu 4",
    description: "This is a description for seach #4"
  }
];
var globalStore = writable2(void 0);
var store = {
  subscribe: globalStore.subscribe,
  search: (searchString) => {
    if (searchString.length > 1) {
      let resultSearch = [];
      data.forEach((item) => {
        if (item.title.toLowerCase().includes(searchString.toLowerCase())) {
          resultSearch.push(item);
        }
      });
      if (resultSearch.length > 0) {
        globalStore.set(resultSearch);
      } else {
        globalStore.set(void 0);
      }
    } else {
      globalStore.set(void 0);
    }
  },
  clear: () => {
    globalStore.set(void 0);
  }
};
var css$3 = {
  code: ".search-wrapper.svelte-16k0yud{position:relative;display:flex;max-width:28rem;width:100%;margin-left:0.5rem;height:3rem;background-color:#393939;color:#fff;transition:max-width 0.11s cubic-bezier(0.2, 0, 0.38, 0.9),\n      background 0.11s cubic-bezier(0.2, 0, 0.38, 0.9)}.search-wrapper-hidden.svelte-16k0yud{max-width:3rem;background-color:#161616}.search-focus.svelte-16k0yud{outline:2px solid #fff;outline-offset:-2px}.search-wrapper-2.svelte-16k0yud{display:flex;flex-grow:1;border-bottom:1px solid #393939}.btn-search.svelte-16k0yud{width:3rem;height:100%;padding:0;flex-shrink:0;opacity:1;transition:background-color 0.11s cubic-bezier(0.2, 0, 0.38, 0.9),\n      opacity 0.11s cubic-bezier(0.2, 0, 0.38, 0.9)}.btn-search-disabled.svelte-16k0yud{border:none;pointer-events:none}.input-search.svelte-16k0yud{font-size:1rem;font-weight:400;line-height:1.375rem;letter-spacing:0;color:#fff;caret-color:#fff;background-color:initial;border:none;outline:none;width:100%;height:3rem;padding:0;transition:opacity 0.11s cubic-bezier(0.2, 0, 0.38, 0.9)}.input-hidden.svelte-16k0yud{opacity:0;pointer-events:none}.btn-clear.svelte-16k0yud{width:3rem;height:100%;padding:0;flex-shrink:0;opacity:1;display:block;transition:background-color 0.11s cubic-bezier(0.2, 0, 0.38, 0.9),\n      opacity 0.11s cubic-bezier(0.2, 0, 0.38, 0.9)}.btn-clear.svelte-16k0yud:hover{background-color:#4c4c4c}.btn-clear-hidden.svelte-16k0yud{opacity:0;display:none}",
  map: `{"version":3,"file":"HeaderActionSearch.svelte","sources":["HeaderActionSearch.svelte"],"sourcesContent":["<script>\\n  /**\\n   * @deprecated\\n   * This component will be removed in version 1.0.0.\\n   * Use \`HeaderSearch\` instead\\n   */\\n\\n  /**\\n   * @event {{ action: \\"search\\"; textInput: string; }} inputSearch\\n   */\\n\\n  /** Set to \`true\` to focus the search */\\n  export let searchIsActive = false;\\n\\n  import { createEventDispatcher } from \\"svelte\\";\\n  import Close20 from \\"carbon-icons-svelte/lib/Close20\\";\\n  import Search20 from \\"carbon-icons-svelte/lib/Search20\\";\\n  import { Icon } from \\"../../Icon\\";\\n  import searchStore from \\"../searchStore\\";\\n\\n  const dispatch = createEventDispatcher();\\n\\n  let searchTabIndex = \\"0\\";\\n  let closeTabIndex = \\"-1\\";\\n  let elInput = undefined;\\n  let elTypeSearch = undefined;\\n  let isSearchFocus = false;\\n\\n  function dispatchInputs(event) {\\n    const params = {\\n      action: \\"search\\",\\n      textInput: event.target.value,\\n    };\\n\\n    dispatch(\\"inputSearch\\", params);\\n  }\\n\\n  $: if (!searchIsActive) {\\n    if (elInput) {\\n      elInput.value = \\"\\";\\n    }\\n    searchStore.clear();\\n  }\\n  $: if (searchIsActive) {\\n    searchTabIndex = \\"-1\\";\\n    closeTabIndex = \\"0\\";\\n  } else {\\n    searchTabIndex = \\"0\\";\\n    closeTabIndex = \\"-1\\";\\n  }\\n  $: if (isSearchFocus) {\\n    elInput.focus();\\n  }\\n  $: showResults = $searchStore ? true : false;\\n</script>\\n\\n<svelte:window\\n  on:mouseup=\\"{({ target }) => {\\n    if (target && elTypeSearch) {\\n      if (!elTypeSearch.contains(target)) {\\n        searchIsActive = false;\\n        isSearchFocus = false;\\n      }\\n    }\\n  }}\\"\\n/>\\n\\n<div\\n  bind:this=\\"{elTypeSearch}\\"\\n  role=\\"search\\"\\n  class=\\"search-wrapper\\"\\n  class:search-wrapper-hidden=\\"{!searchIsActive}\\"\\n  class:search-focus=\\"{isSearchFocus || searchIsActive}\\"\\n>\\n  <div\\n    id=\\"right-panel-action-search\\"\\n    class=\\"search-wrapper-2\\"\\n    role=\\"combobox\\"\\n    aria-expanded=\\"{searchIsActive}\\"\\n  >\\n    <button\\n      tabindex=\\"{searchTabIndex}\\"\\n      aria-label=\\"Search\\"\\n      class:bx--header__action=\\"{true}\\"\\n      class:btn-search=\\"{true}\\"\\n      class:btn-search-disabled=\\"{searchIsActive}\\"\\n      on:click=\\"{() => {\\n        isSearchFocus = true;\\n        searchIsActive = true;\\n        dispatch('focusInputSearch');\\n      }}\\"\\n      type=\\"button\\"\\n      on:keydown=\\"{({ key }) => {\\n        if (key === 'Enter') {\\n          searchIsActive = !searchIsActive;\\n        }\\n      }}\\"\\n    >\\n      <Icon title=\\"Search\\" tabindex=\\"0\\" render=\\"{Search20}\\" />\\n    </button>\\n    <input\\n      bind:this=\\"{elInput}\\"\\n      id=\\"input-search-field\\"\\n      type=\\"text\\"\\n      autocomplete=\\"off\\"\\n      tabindex=\\"{closeTabIndex}\\"\\n      class=\\"input-search\\"\\n      class:input-hidden=\\"{!searchIsActive}\\"\\n      placeholder=\\"Search\\"\\n      on:focus=\\"{() => dispatch('focusInputSearch')}\\"\\n      on:focusout=\\"{() => dispatch('focusOutInputSearch')}\\"\\n      on:input=\\"{dispatchInputs}\\"\\n    />\\n    <button\\n      id=\\"right-panel-close-search\\"\\n      tabindex=\\"{closeTabIndex}\\"\\n      class:bx--header__action=\\"{true}\\"\\n      class:btn-clear=\\"{true}\\"\\n      class:btn-clear-hidden=\\"{!searchIsActive}\\"\\n      type=\\"button\\"\\n      aria-label=\\"Clear search\\"\\n      on:click=\\"{() => {\\n        isSearchFocus = false;\\n        searchIsActive = false;\\n        searchStore.clear();\\n      }}\\"\\n      on:keydown=\\"{({ key }) => {\\n        if (key === 'Enter') {\\n          searchIsActive = !searchIsActive;\\n        }\\n      }}\\"\\n    >\\n      <Icon title=\\"Close\\" tabindex=\\"0\\" render=\\"{Close20}\\" />\\n    </button>\\n  </div>\\n</div>\\n\\n<style>\\n  .search-wrapper {\\n    position: relative;\\n    display: flex;\\n    max-width: 28rem;\\n    width: 100%;\\n    margin-left: 0.5rem;\\n    height: 3rem;\\n    background-color: #393939;\\n    color: #fff;\\n    transition: max-width 0.11s cubic-bezier(0.2, 0, 0.38, 0.9),\\n      background 0.11s cubic-bezier(0.2, 0, 0.38, 0.9);\\n  }\\n\\n  .search-wrapper-hidden {\\n    max-width: 3rem;\\n    background-color: #161616;\\n  }\\n\\n  .search-focus {\\n    outline: 2px solid #fff;\\n    outline-offset: -2px;\\n  }\\n\\n  .search-wrapper-2 {\\n    display: flex;\\n    flex-grow: 1;\\n    border-bottom: 1px solid #393939;\\n  }\\n\\n  .btn-search {\\n    width: 3rem;\\n    height: 100%;\\n    padding: 0;\\n    flex-shrink: 0;\\n    opacity: 1;\\n    transition: background-color 0.11s cubic-bezier(0.2, 0, 0.38, 0.9),\\n      opacity 0.11s cubic-bezier(0.2, 0, 0.38, 0.9);\\n  }\\n\\n  .btn-search-disabled {\\n    border: none;\\n    pointer-events: none;\\n  }\\n\\n  .input-search {\\n    font-size: 1rem;\\n    font-weight: 400;\\n    line-height: 1.375rem;\\n    letter-spacing: 0;\\n    color: #fff;\\n    caret-color: #fff;\\n    background-color: initial;\\n    border: none;\\n    outline: none;\\n    width: 100%;\\n    height: 3rem;\\n    padding: 0;\\n    transition: opacity 0.11s cubic-bezier(0.2, 0, 0.38, 0.9);\\n  }\\n\\n  .input-hidden {\\n    opacity: 0;\\n    pointer-events: none;\\n  }\\n\\n  .btn-clear {\\n    width: 3rem;\\n    height: 100%;\\n    padding: 0;\\n    flex-shrink: 0;\\n    opacity: 1;\\n    display: block;\\n    transition: background-color 0.11s cubic-bezier(0.2, 0, 0.38, 0.9),\\n      opacity 0.11s cubic-bezier(0.2, 0, 0.38, 0.9);\\n  }\\n\\n  .btn-clear:hover {\\n    background-color: #4c4c4c;\\n  }\\n\\n  .btn-clear-hidden {\\n    opacity: 0;\\n    display: none;\\n  }\\n</style>\\n"],"names":[],"mappings":"AA0IE,eAAe,eAAC,CAAC,AACf,QAAQ,CAAE,QAAQ,CAClB,OAAO,CAAE,IAAI,CACb,SAAS,CAAE,KAAK,CAChB,KAAK,CAAE,IAAI,CACX,WAAW,CAAE,MAAM,CACnB,MAAM,CAAE,IAAI,CACZ,gBAAgB,CAAE,OAAO,CACzB,KAAK,CAAE,IAAI,CACX,UAAU,CAAE,SAAS,CAAC,KAAK,CAAC,aAAa,GAAG,CAAC,CAAC,CAAC,CAAC,CAAC,IAAI,CAAC,CAAC,GAAG,CAAC,CAAC;MAC1D,UAAU,CAAC,KAAK,CAAC,aAAa,GAAG,CAAC,CAAC,CAAC,CAAC,CAAC,IAAI,CAAC,CAAC,GAAG,CAAC,AACpD,CAAC,AAED,sBAAsB,eAAC,CAAC,AACtB,SAAS,CAAE,IAAI,CACf,gBAAgB,CAAE,OAAO,AAC3B,CAAC,AAED,aAAa,eAAC,CAAC,AACb,OAAO,CAAE,GAAG,CAAC,KAAK,CAAC,IAAI,CACvB,cAAc,CAAE,IAAI,AACtB,CAAC,AAED,iBAAiB,eAAC,CAAC,AACjB,OAAO,CAAE,IAAI,CACb,SAAS,CAAE,CAAC,CACZ,aAAa,CAAE,GAAG,CAAC,KAAK,CAAC,OAAO,AAClC,CAAC,AAED,WAAW,eAAC,CAAC,AACX,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,CACZ,OAAO,CAAE,CAAC,CACV,WAAW,CAAE,CAAC,CACd,OAAO,CAAE,CAAC,CACV,UAAU,CAAE,gBAAgB,CAAC,KAAK,CAAC,aAAa,GAAG,CAAC,CAAC,CAAC,CAAC,CAAC,IAAI,CAAC,CAAC,GAAG,CAAC,CAAC;MACjE,OAAO,CAAC,KAAK,CAAC,aAAa,GAAG,CAAC,CAAC,CAAC,CAAC,CAAC,IAAI,CAAC,CAAC,GAAG,CAAC,AACjD,CAAC,AAED,oBAAoB,eAAC,CAAC,AACpB,MAAM,CAAE,IAAI,CACZ,cAAc,CAAE,IAAI,AACtB,CAAC,AAED,aAAa,eAAC,CAAC,AACb,SAAS,CAAE,IAAI,CACf,WAAW,CAAE,GAAG,CAChB,WAAW,CAAE,QAAQ,CACrB,cAAc,CAAE,CAAC,CACjB,KAAK,CAAE,IAAI,CACX,WAAW,CAAE,IAAI,CACjB,gBAAgB,CAAE,OAAO,CACzB,MAAM,CAAE,IAAI,CACZ,OAAO,CAAE,IAAI,CACb,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,CACZ,OAAO,CAAE,CAAC,CACV,UAAU,CAAE,OAAO,CAAC,KAAK,CAAC,aAAa,GAAG,CAAC,CAAC,CAAC,CAAC,CAAC,IAAI,CAAC,CAAC,GAAG,CAAC,AAC3D,CAAC,AAED,aAAa,eAAC,CAAC,AACb,OAAO,CAAE,CAAC,CACV,cAAc,CAAE,IAAI,AACtB,CAAC,AAED,UAAU,eAAC,CAAC,AACV,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,CACZ,OAAO,CAAE,CAAC,CACV,WAAW,CAAE,CAAC,CACd,OAAO,CAAE,CAAC,CACV,OAAO,CAAE,KAAK,CACd,UAAU,CAAE,gBAAgB,CAAC,KAAK,CAAC,aAAa,GAAG,CAAC,CAAC,CAAC,CAAC,CAAC,IAAI,CAAC,CAAC,GAAG,CAAC,CAAC;MACjE,OAAO,CAAC,KAAK,CAAC,aAAa,GAAG,CAAC,CAAC,CAAC,CAAC,CAAC,IAAI,CAAC,CAAC,GAAG,CAAC,AACjD,CAAC,AAED,yBAAU,MAAM,AAAC,CAAC,AAChB,gBAAgB,CAAE,OAAO,AAC3B,CAAC,AAED,iBAAiB,eAAC,CAAC,AACjB,OAAO,CAAE,CAAC,CACV,OAAO,CAAE,IAAI,AACf,CAAC"}`
};
create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_searchStore;
  $$unsubscribe_searchStore = subscribe(store, (value) => value);
  let {searchIsActive = false} = $$props;
  createEventDispatcher();
  let searchTabIndex = "0";
  let closeTabIndex = "-1";
  let elInput = void 0;
  let elTypeSearch = void 0;
  if ($$props.searchIsActive === void 0 && $$bindings.searchIsActive && searchIsActive !== void 0)
    $$bindings.searchIsActive(searchIsActive);
  $$result.css.add(css$3);
  {
    if (!searchIsActive) {
      store.clear();
    }
  }
  {
    if (searchIsActive) {
      searchTabIndex = "-1";
      closeTabIndex = "0";
    } else {
      searchTabIndex = "0";
      closeTabIndex = "-1";
    }
  }
  $$unsubscribe_searchStore();
  return `

<div role="${"search"}" class="${[
    "search-wrapper svelte-16k0yud",
    (!searchIsActive ? "search-wrapper-hidden" : "") + " " + (searchIsActive ? "search-focus" : "")
  ].join(" ").trim()}"${add_attribute("this", elTypeSearch, 1)}><div id="${"right-panel-action-search"}" class="${"search-wrapper-2 svelte-16k0yud"}" role="${"combobox"}"${add_attribute("aria-expanded", searchIsActive, 0)}><button${add_attribute("tabindex", searchTabIndex, 0)} aria-label="${"Search"}" type="${"button"}" class="${[
    "svelte-16k0yud",
    "bx--header__action btn-search " + (searchIsActive ? "btn-search-disabled" : "")
  ].join(" ").trim()}">${validate_component(Icon, "Icon").$$render($$result, {
    title: "Search",
    tabindex: "0",
    render: Search20
  }, {}, {})}</button>
    <input id="${"input-search-field"}" type="${"text"}" autocomplete="${"off"}"${add_attribute("tabindex", closeTabIndex, 0)} class="${["input-search svelte-16k0yud", !searchIsActive ? "input-hidden" : ""].join(" ").trim()}" placeholder="${"Search"}"${add_attribute("this", elInput, 1)}>
    <button id="${"right-panel-close-search"}"${add_attribute("tabindex", closeTabIndex, 0)} type="${"button"}" aria-label="${"Clear search"}" class="${[
    "svelte-16k0yud",
    "bx--header__action btn-clear " + (!searchIsActive ? "btn-clear-hidden" : "")
  ].join(" ").trim()}">${validate_component(Icon, "Icon").$$render($$result, {
    title: "Close",
    tabindex: "0",
    render: Close20
  }, {}, {})}</button></div>
</div>`;
});
create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let props;
  let $$restProps = compute_rest_props($$props, ["ariaLabel"]);
  let {ariaLabel = void 0} = $$props;
  if ($$props.ariaLabel === void 0 && $$bindings.ariaLabel && ariaLabel !== void 0)
    $$bindings.ariaLabel(ariaLabel);
  props = {
    "aria-label": ariaLabel || $$props["aria-label"],
    "aria-labelledby": $$props["aria-labelledby"]
  };
  return `<nav${spread([props, $$restProps], "bx--header__nav")}><ul${spread([props], "bx--header__menu-bar")}>${slots.default ? slots.default({}) : ``}</ul></nav>`;
});
create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["href", "text", "ref"]);
  let {href = void 0} = $$props;
  let {text = void 0} = $$props;
  let {ref = null} = $$props;
  if ($$props.href === void 0 && $$bindings.href && href !== void 0)
    $$bindings.href(href);
  if ($$props.text === void 0 && $$bindings.text && text !== void 0)
    $$bindings.text(text);
  if ($$props.ref === void 0 && $$bindings.ref && ref !== void 0)
    $$bindings.ref(ref);
  return `<li><a${spread([
    {role: "menuitem"},
    {tabindex: "0"},
    {href: escape2(href)},
    {
      rel: escape2($$restProps.target === "_blank" ? "noopener noreferrer" : void 0)
    },
    $$restProps
  ], "bx--header__menu-item")}${add_attribute("this", ref, 1)}><span${add_classes(["bx--text-truncate--end"].join(" ").trim())}>${escape2(text)}</span></a></li>`;
});
create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["expanded", "href", "text", "ref"]);
  let {expanded = false} = $$props;
  let {href = "/"} = $$props;
  let {text = void 0} = $$props;
  let {ref = null} = $$props;
  if ($$props.expanded === void 0 && $$bindings.expanded && expanded !== void 0)
    $$bindings.expanded(expanded);
  if ($$props.href === void 0 && $$bindings.href && href !== void 0)
    $$bindings.href(href);
  if ($$props.text === void 0 && $$bindings.text && text !== void 0)
    $$bindings.text(text);
  if ($$props.ref === void 0 && $$bindings.ref && ref !== void 0)
    $$bindings.ref(ref);
  return `

<li${add_classes(["bx--header__submenu"].join(" ").trim())}><a${spread([
    {role: "menuitem"},
    {tabindex: "0"},
    {"aria-haspopup": "menu"},
    {"aria-expanded": escape2(expanded)},
    {"aria-label": escape2(text)},
    {href: escape2(href)},
    $$restProps
  ], "bx--header__menu-item bx--header__menu-title")}${add_attribute("this", ref, 1)}>${escape2(text)}
    ${validate_component(ChevronDown16, "ChevronDown16").$$render($$result, {class: "bx--header__menu-arrow"}, {}, {})}</a>
  <ul role="${"menu"}"${add_attribute("aria-label", text, 0)}${add_classes(["bx--header__menu"].join(" ").trim())}>${slots.default ? slots.default({}) : ``}</ul></li>`;
});
var css$2 = {
  code: ".subject-divider.svelte-298l2.svelte-298l2{color:#525252;padding-bottom:4px;border-bottom:1px solid #525252;margin:32px 1rem 8px}.subject-divider.svelte-298l2 span.svelte-298l2{font-size:0.75rem;font-weight:400;line-height:1rem;letter-spacing:0.32px;color:#c6c6c6}",
  map: '{"version":3,"file":"HeaderPanelDivider.svelte","sources":["HeaderPanelDivider.svelte"],"sourcesContent":["<li class=\\"subject-divider\\">\\n  <span>\\n    <slot />\\n  </span>\\n</li>\\n\\n<style>\\n  .subject-divider {\\n    color: #525252;\\n    padding-bottom: 4px;\\n    border-bottom: 1px solid #525252;\\n    margin: 32px 1rem 8px;\\n  }\\n\\n  .subject-divider span {\\n    font-size: 0.75rem;\\n    font-weight: 400;\\n    line-height: 1rem;\\n    letter-spacing: 0.32px;\\n    color: #c6c6c6;\\n  }\\n</style>\\n"],"names":[],"mappings":"AAOE,gBAAgB,0BAAC,CAAC,AAChB,KAAK,CAAE,OAAO,CACd,cAAc,CAAE,GAAG,CACnB,aAAa,CAAE,GAAG,CAAC,KAAK,CAAC,OAAO,CAChC,MAAM,CAAE,IAAI,CAAC,IAAI,CAAC,GAAG,AACvB,CAAC,AAED,6BAAgB,CAAC,IAAI,aAAC,CAAC,AACrB,SAAS,CAAE,OAAO,CAClB,WAAW,CAAE,GAAG,CAChB,WAAW,CAAE,IAAI,CACjB,cAAc,CAAE,MAAM,CACtB,KAAK,CAAE,OAAO,AAChB,CAAC"}'
};
create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$2);
  return `<li class="${"subject-divider svelte-298l2"}"><span class="${"svelte-298l2"}">${slots.default ? slots.default({}) : ``}</span>
</li>`;
});
create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["href", "ref"]);
  let {href = void 0} = $$props;
  let {ref = null} = $$props;
  if ($$props.href === void 0 && $$bindings.href && href !== void 0)
    $$bindings.href(href);
  if ($$props.ref === void 0 && $$bindings.ref && ref !== void 0)
    $$bindings.ref(ref);
  return `<li${add_classes(["bx--switcher__item"].join(" ").trim())}><a${spread([
    {href: escape2(href)},
    {
      rel: escape2($$restProps.target === "_blank" ? "noopener noreferrer" : void 0)
    },
    $$restProps
  ], "bx--switcher__item-link")}${add_attribute("this", ref, 1)}>${slots.default ? slots.default({}) : ``}</a></li>`;
});
create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<ul${add_classes(["bx--switcher__item"].join(" ").trim())}>${slots.default ? slots.default({}) : ``}</ul>`;
});
create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div${add_classes(["bx--header__global"].join(" ").trim())}>${slots.default ? slots.default({}) : ``}</div>`;
});
create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["fixed", "ariaLabel", "isOpen"]);
  let {fixed = false} = $$props;
  let {ariaLabel = void 0} = $$props;
  let {isOpen = false} = $$props;
  onMount(() => {
    shouldRenderHamburgerMenu.set(true);
    return () => shouldRenderHamburgerMenu.set(false);
  });
  if ($$props.fixed === void 0 && $$bindings.fixed && fixed !== void 0)
    $$bindings.fixed(fixed);
  if ($$props.ariaLabel === void 0 && $$bindings.ariaLabel && ariaLabel !== void 0)
    $$bindings.ariaLabel(ariaLabel);
  if ($$props.isOpen === void 0 && $$bindings.isOpen && isOpen !== void 0)
    $$bindings.isOpen(isOpen);
  return `${!fixed ? `<div${add_classes([
    "bx--side-nav__overlay " + (isOpen ? "bx--side-nav__overlay-active" : "")
  ].join(" ").trim())}></div>` : ``}
<nav${spread([
    {"aria-hidden": escape2(!isOpen)},
    {"aria-label": escape2(ariaLabel)},
    $$restProps
  ], "bx--side-nav__navigation bx--side-nav bx--side-nav--ux " + (isOpen ? "bx--side-nav--expanded" : "") + " " + (!isOpen ? "bx--side-nav--collapsed" : ""))}>${slots.default ? slots.default({}) : ``}</nav>`;
});
create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<ul${add_classes(["bx--side-nav__items"].join(" ").trim())}>${slots.default ? slots.default({}) : ``}</ul>`;
});
create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["isSelected", "href", "text", "icon", "ref"]);
  let {isSelected = false} = $$props;
  let {href = void 0} = $$props;
  let {text = void 0} = $$props;
  let {icon = void 0} = $$props;
  let {ref = null} = $$props;
  if ($$props.isSelected === void 0 && $$bindings.isSelected && isSelected !== void 0)
    $$bindings.isSelected(isSelected);
  if ($$props.href === void 0 && $$bindings.href && href !== void 0)
    $$bindings.href(href);
  if ($$props.text === void 0 && $$bindings.text && text !== void 0)
    $$bindings.text(text);
  if ($$props.icon === void 0 && $$bindings.icon && icon !== void 0)
    $$bindings.icon(icon);
  if ($$props.ref === void 0 && $$bindings.ref && ref !== void 0)
    $$bindings.ref(ref);
  return `<li${add_classes(["bx--side-nav__item"].join(" ").trim())}><a${spread([
    {
      "aria-current": escape2(isSelected ? "page" : void 0)
    },
    {href: escape2(href)},
    {
      rel: escape2($$restProps.target === "_blank" ? "noopener noreferrer" : void 0)
    },
    $$restProps
  ], "bx--side-nav__link " + (isSelected ? "bx--side-nav__link--current" : ""))}${add_attribute("this", ref, 1)}>${icon ? `<div${add_classes([
    "bx--side-nav__icon bx--side-nav__icon--small"
  ].join(" ").trim())}>${validate_component(Icon, "Icon").$$render($$result, {render: icon}, {}, {})}</div>` : ``}
    <span${add_classes(["bx--side-nav__link-text"].join(" ").trim())}>${escape2(text)}</span></a></li>`;
});
create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["expanded", "text", "icon", "ref"]);
  let {expanded = false} = $$props;
  let {text = void 0} = $$props;
  let {icon = void 0} = $$props;
  let {ref = null} = $$props;
  if ($$props.expanded === void 0 && $$bindings.expanded && expanded !== void 0)
    $$bindings.expanded(expanded);
  if ($$props.text === void 0 && $$bindings.text && text !== void 0)
    $$bindings.text(text);
  if ($$props.icon === void 0 && $$bindings.icon && icon !== void 0)
    $$bindings.icon(icon);
  if ($$props.ref === void 0 && $$bindings.ref && ref !== void 0)
    $$bindings.ref(ref);
  return `<li${add_classes([
    "bx--side-nav__item " + (icon ? "bx--side-nav__item--icon" : "")
  ].join(" ").trim())}><button${spread([{type: "button"}, {"aria-expanded": escape2(expanded)}, $$restProps], "bx--side-nav__submenu")}${add_attribute("this", ref, 1)}>${icon ? `<div${add_classes(["bx--side-nav__icon"].join(" ").trim())}>${validate_component(Icon, "Icon").$$render($$result, {render: icon}, {}, {})}</div>` : ``}
    <span${add_classes(["bx--side-nav__submenu-title"].join(" ").trim())}>${escape2(text)}</span>
    <div${add_classes([
    "bx--side-nav__icon bx--side-nav__icon--small bx--side-nav__submenu-chevron"
  ].join(" ").trim())}>${validate_component(Icon, "Icon").$$render($$result, {
    title: "Open Menu",
    tabindex: "0",
    render: ChevronDown16
  }, {}, {})}</div></button>
  <ul role="${"menu"}"${add_classes(["bx--side-nav__menu"].join(" ").trim())}>${slots.default ? slots.default({}) : ``}</ul></li>`;
});
create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["isSelected", "href", "text", "ref"]);
  let {isSelected = void 0} = $$props;
  let {href = void 0} = $$props;
  let {text = void 0} = $$props;
  let {ref = null} = $$props;
  if ($$props.isSelected === void 0 && $$bindings.isSelected && isSelected !== void 0)
    $$bindings.isSelected(isSelected);
  if ($$props.href === void 0 && $$bindings.href && href !== void 0)
    $$bindings.href(href);
  if ($$props.text === void 0 && $$bindings.text && text !== void 0)
    $$bindings.text(text);
  if ($$props.ref === void 0 && $$bindings.ref && ref !== void 0)
    $$bindings.ref(ref);
  return `<li${add_classes(["bx--side-nav__menu-item"].join(" ").trim())}><a${spread([
    {
      "aria-current": escape2(isSelected ? "page" : void 0)
    },
    {href: escape2(href)},
    $$restProps
  ], "bx--side-nav__link")}${add_attribute("this", ref, 1)}><span${add_classes(["bx--side-nav__link-text"].join(" ").trim())}>${slots.default ? slots.default({}) : `${escape2(text)}`}</span></a></li>`;
});
var Content = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["id"]);
  let {id = "main-content"} = $$props;
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  return `<main${spread([{id: escape2(id)}, $$restProps], "bx--content")}>${slots.default ? slots.default({}) : ``}</main>`;
});
create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["href", "tabindex"]);
  let {href = "#main-content"} = $$props;
  let {tabindex = "0"} = $$props;
  if ($$props.href === void 0 && $$bindings.href && href !== void 0)
    $$bindings.href(href);
  if ($$props.tabindex === void 0 && $$bindings.tabindex && tabindex !== void 0)
    $$bindings.tabindex(tabindex);
  return `<a${spread([{href: escape2(href)}, {tabindex: escape2(tabindex)}, $$restProps], "bx--skip-to-content")}>${slots.default ? slots.default({}) : `Skip to main content`}</a>`;
});
create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["isActive", "icon", "ref"]);
  let {isActive = false} = $$props;
  let {icon = void 0} = $$props;
  let {ref = null} = $$props;
  if ($$props.isActive === void 0 && $$bindings.isActive && isActive !== void 0)
    $$bindings.isActive(isActive);
  if ($$props.icon === void 0 && $$bindings.icon && icon !== void 0)
    $$bindings.icon(icon);
  if ($$props.ref === void 0 && $$bindings.ref && ref !== void 0)
    $$bindings.ref(ref);
  return `<button${spread([{type: "button"}, $$restProps], "bx--header__action " + (isActive ? "bx--header__action--active" : ""))}${add_attribute("this", ref, 1)}>${slots.default ? slots.default({}) : `
    ${validate_component(icon || missing_component, "svelte:component").$$render($$result, {}, {}, {})}
  `}</button>`;
});
var css$1 = {
  code: 'label.svelte-qozwl4.svelte-qozwl4{position:absolute;width:1px;height:1px;margin:-1px;padding:0;overflow:hidden;white-space:nowrap;border:0;visibility:inherit;clip:rect(0, 0, 0, 0)}[role="search"].svelte-qozwl4.svelte-qozwl4{position:relative;display:flex;max-width:28rem;width:100%;margin-left:0.5rem;height:3rem;background-color:#393939;color:#fff;transition:max-width 0.11s cubic-bezier(0.2, 0, 0.38, 0.9),\n      background 0.11s cubic-bezier(0.2, 0, 0.38, 0.9)}[role="search"].svelte-qozwl4.svelte-qozwl4:not(.active){max-width:3rem;background-color:#161616}[role="search"].active.svelte-qozwl4.svelte-qozwl4{outline:2px solid #fff;outline-offset:-2px}[role="combobox"].svelte-qozwl4.svelte-qozwl4{display:flex;flex-grow:1;border-bottom:1px solid #393939}input.svelte-qozwl4.svelte-qozwl4{width:100%;height:3rem;padding:0;font-size:1rem;font-weight:400;line-height:1.375rem;letter-spacing:0;color:#fff;caret-color:#fff;background-color:initial;border:none;outline:none;transition:opacity 0.11s cubic-bezier(0.2, 0, 0.38, 0.9)}input.svelte-qozwl4.svelte-qozwl4:not(.active){opacity:0;pointer-events:none}button.svelte-qozwl4.svelte-qozwl4{width:3rem;height:100%;padding:0;flex-shrink:0;opacity:1;transition:background-color 0.11s cubic-bezier(0.2, 0, 0.38, 0.9),\n      opacity 0.11s cubic-bezier(0.2, 0, 0.38, 0.9)}.disabled.svelte-qozwl4.svelte-qozwl4{border:none;pointer-events:none}[aria-label="Clear search"].svelte-qozwl4.svelte-qozwl4:hover{background-color:#4c4c4c}.hidden.svelte-qozwl4.svelte-qozwl4{opacity:0;display:none}ul.svelte-qozwl4.svelte-qozwl4{position:absolute;z-index:10000;padding:1rem 0;left:0;right:0;top:3rem;background-color:#161616;border:1px solid #393939;border-top:none;box-shadow:0 4px 8px 0 rgba(0, 0, 0, 0.5)}[role="menuitem"].svelte-qozwl4.svelte-qozwl4{padding:6px 1rem;cursor:pointer;font-size:0.875rem;font-weight:600;line-height:1.29;letter-spacing:0.16px;transition:all 70ms cubic-bezier(0.2, 0, 0.38, 0.9);display:block;text-decoration:none;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;color:#c6c6c6}.selected.svelte-qozwl4.svelte-qozwl4,[role="menuitem"].svelte-qozwl4.svelte-qozwl4:hover{background-color:#353535;color:#f4f4f4}[role="menuitem"].svelte-qozwl4 span.svelte-qozwl4{font-size:0.75rem;font-weight:400;line-height:1.34;letter-spacing:0.32px;text-transform:lowercase;color:#c6c6c6}',
  map: `{"version":3,"file":"HeaderSearch.svelte","sources":["HeaderSearch.svelte"],"sourcesContent":["<script>\\n  /**\\n   * @typedef {{ href: string; text: string; description?: string; }} HeaderSearchResult\\n   * @event {any} active\\n   * @event {any} inactive\\n   * @event {any} clear\\n   * @event {{ value: string; selectedResultIndex: number; selectedResult: HeaderSearchResult }} select\\n   * @slot {{ result: HeaderSearchResult; index: number }}\\n   */\\n\\n  /** Specify the search input value */\\n  export let value = \\"\\";\\n\\n  /** Set to \`true\` to activate and focus the search bar */\\n  export let active = false;\\n\\n  /** Obtain a reference to the input HTML element */\\n  export let ref = null;\\n\\n  /**\\n   * Render a list of search results\\n   * @type {HeaderSearchResult[]}\\n   */\\n  export let results = [];\\n\\n  /** Specify the selected result index */\\n  export let selectedResultIndex = 0;\\n\\n  import { createEventDispatcher, tick } from \\"svelte\\";\\n  import Close20 from \\"carbon-icons-svelte/lib/Close20/Close20.svelte\\";\\n  import Search20 from \\"carbon-icons-svelte/lib/Search20/Search20.svelte\\";\\n\\n  const dispatch = createEventDispatcher();\\n\\n  let refSearch = null;\\n\\n  function reset() {\\n    active = false;\\n    value = \\"\\";\\n    selectedResultIndex = 0;\\n  }\\n\\n  function selectResult() {\\n    dispatch(\\"select\\", { value, selectedResultIndex, selectedResult });\\n    reset();\\n  }\\n\\n  $: if (active && ref) ref.focus();\\n  $: dispatch(active ? \\"active\\" : \\"inactive\\");\\n  $: selectedResult = results[selectedResultIndex];\\n  $: selectedId = selectedResult\\n    ? \`search-menuitem-\${selectedResultIndex}\`\\n    : undefined;\\n</script>\\n\\n<svelte:window\\n  on:mouseup=\\"{({ target }) => {\\n    if (active && !refSearch.contains(target)) active = false;\\n  }}\\"\\n/>\\n\\n<div bind:this=\\"{refSearch}\\" role=\\"search\\" class:active>\\n  <label for=\\"search-input\\" id=\\"search-label\\">Search</label>\\n  <div role=\\"combobox\\" aria-expanded=\\"{active}\\">\\n    <button\\n      type=\\"button\\"\\n      aria-label=\\"Search\\"\\n      tabindex=\\"{active ? '-1' : '0'}\\"\\n      class:bx--header__action=\\"{true}\\"\\n      class:disabled=\\"{active}\\"\\n      on:click=\\"{() => {\\n        active = true;\\n      }}\\"\\n    >\\n      <Search20 title=\\"Search\\" />\\n    </button>\\n    <input\\n      bind:this=\\"{ref}\\"\\n      type=\\"text\\"\\n      autocomplete=\\"off\\"\\n      placeholder=\\"Search...\\"\\n      tabindex=\\"{active ? '0' : '-1'}\\"\\n      class:active\\n      {...$$restProps}\\n      id=\\"search-input\\"\\n      aria-activedescendant=\\"{selectedId}\\"\\n      bind:value\\n      on:change\\n      on:input\\n      on:focus\\n      on:blur\\n      on:keydown\\n      on:keydown=\\"{(e) => {\\n        switch (e.key) {\\n          case 'Enter':\\n            selectResult();\\n            break;\\n          case 'ArrowDown':\\n            e.preventDefault();\\n            if (selectedResultIndex === results.length - 1) {\\n              selectedResultIndex = 0;\\n            } else {\\n              selectedResultIndex += 1;\\n            }\\n            break;\\n          case 'ArrowUp':\\n            e.preventDefault();\\n            if (selectedResultIndex === 0) {\\n              selectedResultIndex = results.length - 1;\\n            } else {\\n              selectedResultIndex -= 1;\\n            }\\n            break;\\n        }\\n      }}\\"\\n    />\\n    <button\\n      type=\\"button\\"\\n      aria-label=\\"Clear search\\"\\n      tabindex=\\"{active ? '0' : '-1'}\\"\\n      class:bx--header__action=\\"{true}\\"\\n      class:hidden=\\"{!active}\\"\\n      on:click=\\"{() => {\\n        reset();\\n        dispatch('clear');\\n      }}\\"\\n    >\\n      <Close20 title=\\"Close\\" />\\n    </button>\\n  </div>\\n\\n  {#if active && results.length > 0}\\n    <ul aria-labelledby=\\"search-label\\" role=\\"menu\\" id=\\"search-menu\\">\\n      {#each results as result, i}\\n        <li>\\n          <a\\n            tabindex=\\"-1\\"\\n            id=\\"search-menuitem-{i}\\"\\n            role=\\"menuitem\\"\\n            href=\\"{result.href}\\"\\n            class:selected=\\"{selectedId === \`search-menuitem-\${i}\`}\\"\\n            on:click|preventDefault=\\"{async () => {\\n              selectedResultIndex = i;\\n              await tick();\\n              selectResult();\\n            }}\\"\\n          >\\n            <slot result=\\"{result}\\" index=\\"{i}\\">\\n              {result.text}\\n              {#if result.description}<span>\u2013 {result.description}</span>{/if}\\n            </slot>\\n          </a>\\n        </li>\\n      {/each}\\n    </ul>\\n  {/if}\\n</div>\\n\\n<style>\\n  label {\\n    position: absolute;\\n    width: 1px;\\n    height: 1px;\\n    margin: -1px;\\n    padding: 0;\\n    overflow: hidden;\\n    white-space: nowrap;\\n    border: 0;\\n    visibility: inherit;\\n    clip: rect(0, 0, 0, 0);\\n  }\\n\\n  [role=\\"search\\"] {\\n    position: relative;\\n    display: flex;\\n    max-width: 28rem;\\n    width: 100%;\\n    margin-left: 0.5rem;\\n    height: 3rem;\\n    background-color: #393939;\\n    color: #fff;\\n    transition: max-width 0.11s cubic-bezier(0.2, 0, 0.38, 0.9),\\n      background 0.11s cubic-bezier(0.2, 0, 0.38, 0.9);\\n  }\\n\\n  [role=\\"search\\"]:not(.active) {\\n    max-width: 3rem;\\n    background-color: #161616;\\n  }\\n\\n  [role=\\"search\\"].active {\\n    outline: 2px solid #fff;\\n    outline-offset: -2px;\\n  }\\n\\n  [role=\\"combobox\\"] {\\n    display: flex;\\n    flex-grow: 1;\\n    border-bottom: 1px solid #393939;\\n  }\\n\\n  input {\\n    width: 100%;\\n    height: 3rem;\\n    padding: 0;\\n    font-size: 1rem;\\n    font-weight: 400;\\n    line-height: 1.375rem;\\n    letter-spacing: 0;\\n    color: #fff;\\n    caret-color: #fff;\\n    background-color: initial;\\n    border: none;\\n    outline: none;\\n    transition: opacity 0.11s cubic-bezier(0.2, 0, 0.38, 0.9);\\n  }\\n\\n  input:not(.active) {\\n    opacity: 0;\\n    pointer-events: none;\\n  }\\n\\n  button {\\n    width: 3rem;\\n    height: 100%;\\n    padding: 0;\\n    flex-shrink: 0;\\n    opacity: 1;\\n    transition: background-color 0.11s cubic-bezier(0.2, 0, 0.38, 0.9),\\n      opacity 0.11s cubic-bezier(0.2, 0, 0.38, 0.9);\\n  }\\n\\n  .disabled {\\n    border: none;\\n    pointer-events: none;\\n  }\\n\\n  [aria-label=\\"Clear search\\"]:hover {\\n    background-color: #4c4c4c;\\n  }\\n\\n  .hidden {\\n    opacity: 0;\\n    display: none;\\n  }\\n\\n  ul {\\n    position: absolute;\\n    z-index: 10000;\\n    padding: 1rem 0;\\n    left: 0;\\n    right: 0;\\n    top: 3rem;\\n    background-color: #161616;\\n    border: 1px solid #393939;\\n    border-top: none;\\n    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.5);\\n  }\\n\\n  [role=\\"menuitem\\"] {\\n    padding: 6px 1rem;\\n    cursor: pointer;\\n    font-size: 0.875rem;\\n    font-weight: 600;\\n    line-height: 1.29;\\n    letter-spacing: 0.16px;\\n    transition: all 70ms cubic-bezier(0.2, 0, 0.38, 0.9);\\n    display: block;\\n    text-decoration: none;\\n    white-space: nowrap;\\n    overflow: hidden;\\n    text-overflow: ellipsis;\\n    color: #c6c6c6;\\n  }\\n\\n  .selected,\\n  [role=\\"menuitem\\"]:hover {\\n    background-color: #353535;\\n    color: #f4f4f4;\\n  }\\n\\n  [role=\\"menuitem\\"] span {\\n    font-size: 0.75rem;\\n    font-weight: 400;\\n    line-height: 1.34;\\n    letter-spacing: 0.32px;\\n    text-transform: lowercase;\\n    color: #c6c6c6;\\n  }\\n</style>\\n"],"names":[],"mappings":"AA+JE,KAAK,4BAAC,CAAC,AACL,QAAQ,CAAE,QAAQ,CAClB,KAAK,CAAE,GAAG,CACV,MAAM,CAAE,GAAG,CACX,MAAM,CAAE,IAAI,CACZ,OAAO,CAAE,CAAC,CACV,QAAQ,CAAE,MAAM,CAChB,WAAW,CAAE,MAAM,CACnB,MAAM,CAAE,CAAC,CACT,UAAU,CAAE,OAAO,CACnB,IAAI,CAAE,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,AACxB,CAAC,AAED,CAAC,IAAI,CAAC,QAAQ,CAAC,4BAAC,CAAC,AACf,QAAQ,CAAE,QAAQ,CAClB,OAAO,CAAE,IAAI,CACb,SAAS,CAAE,KAAK,CAChB,KAAK,CAAE,IAAI,CACX,WAAW,CAAE,MAAM,CACnB,MAAM,CAAE,IAAI,CACZ,gBAAgB,CAAE,OAAO,CACzB,KAAK,CAAE,IAAI,CACX,UAAU,CAAE,SAAS,CAAC,KAAK,CAAC,aAAa,GAAG,CAAC,CAAC,CAAC,CAAC,CAAC,IAAI,CAAC,CAAC,GAAG,CAAC,CAAC;MAC1D,UAAU,CAAC,KAAK,CAAC,aAAa,GAAG,CAAC,CAAC,CAAC,CAAC,CAAC,IAAI,CAAC,CAAC,GAAG,CAAC,AACpD,CAAC,AAED,CAAC,IAAI,CAAC,QAAQ,6BAAC,KAAK,OAAO,CAAC,AAAC,CAAC,AAC5B,SAAS,CAAE,IAAI,CACf,gBAAgB,CAAE,OAAO,AAC3B,CAAC,AAED,CAAC,IAAI,CAAC,QAAQ,CAAC,OAAO,4BAAC,CAAC,AACtB,OAAO,CAAE,GAAG,CAAC,KAAK,CAAC,IAAI,CACvB,cAAc,CAAE,IAAI,AACtB,CAAC,AAED,CAAC,IAAI,CAAC,UAAU,CAAC,4BAAC,CAAC,AACjB,OAAO,CAAE,IAAI,CACb,SAAS,CAAE,CAAC,CACZ,aAAa,CAAE,GAAG,CAAC,KAAK,CAAC,OAAO,AAClC,CAAC,AAED,KAAK,4BAAC,CAAC,AACL,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,CACZ,OAAO,CAAE,CAAC,CACV,SAAS,CAAE,IAAI,CACf,WAAW,CAAE,GAAG,CAChB,WAAW,CAAE,QAAQ,CACrB,cAAc,CAAE,CAAC,CACjB,KAAK,CAAE,IAAI,CACX,WAAW,CAAE,IAAI,CACjB,gBAAgB,CAAE,OAAO,CACzB,MAAM,CAAE,IAAI,CACZ,OAAO,CAAE,IAAI,CACb,UAAU,CAAE,OAAO,CAAC,KAAK,CAAC,aAAa,GAAG,CAAC,CAAC,CAAC,CAAC,CAAC,IAAI,CAAC,CAAC,GAAG,CAAC,AAC3D,CAAC,AAED,iCAAK,KAAK,OAAO,CAAC,AAAC,CAAC,AAClB,OAAO,CAAE,CAAC,CACV,cAAc,CAAE,IAAI,AACtB,CAAC,AAED,MAAM,4BAAC,CAAC,AACN,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,CACZ,OAAO,CAAE,CAAC,CACV,WAAW,CAAE,CAAC,CACd,OAAO,CAAE,CAAC,CACV,UAAU,CAAE,gBAAgB,CAAC,KAAK,CAAC,aAAa,GAAG,CAAC,CAAC,CAAC,CAAC,CAAC,IAAI,CAAC,CAAC,GAAG,CAAC,CAAC;MACjE,OAAO,CAAC,KAAK,CAAC,aAAa,GAAG,CAAC,CAAC,CAAC,CAAC,CAAC,IAAI,CAAC,CAAC,GAAG,CAAC,AACjD,CAAC,AAED,SAAS,4BAAC,CAAC,AACT,MAAM,CAAE,IAAI,CACZ,cAAc,CAAE,IAAI,AACtB,CAAC,AAED,CAAC,UAAU,CAAC,cAAc,6BAAC,MAAM,AAAC,CAAC,AACjC,gBAAgB,CAAE,OAAO,AAC3B,CAAC,AAED,OAAO,4BAAC,CAAC,AACP,OAAO,CAAE,CAAC,CACV,OAAO,CAAE,IAAI,AACf,CAAC,AAED,EAAE,4BAAC,CAAC,AACF,QAAQ,CAAE,QAAQ,CAClB,OAAO,CAAE,KAAK,CACd,OAAO,CAAE,IAAI,CAAC,CAAC,CACf,IAAI,CAAE,CAAC,CACP,KAAK,CAAE,CAAC,CACR,GAAG,CAAE,IAAI,CACT,gBAAgB,CAAE,OAAO,CACzB,MAAM,CAAE,GAAG,CAAC,KAAK,CAAC,OAAO,CACzB,UAAU,CAAE,IAAI,CAChB,UAAU,CAAE,CAAC,CAAC,GAAG,CAAC,GAAG,CAAC,CAAC,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,AAC5C,CAAC,AAED,CAAC,IAAI,CAAC,UAAU,CAAC,4BAAC,CAAC,AACjB,OAAO,CAAE,GAAG,CAAC,IAAI,CACjB,MAAM,CAAE,OAAO,CACf,SAAS,CAAE,QAAQ,CACnB,WAAW,CAAE,GAAG,CAChB,WAAW,CAAE,IAAI,CACjB,cAAc,CAAE,MAAM,CACtB,UAAU,CAAE,GAAG,CAAC,IAAI,CAAC,aAAa,GAAG,CAAC,CAAC,CAAC,CAAC,CAAC,IAAI,CAAC,CAAC,GAAG,CAAC,CACpD,OAAO,CAAE,KAAK,CACd,eAAe,CAAE,IAAI,CACrB,WAAW,CAAE,MAAM,CACnB,QAAQ,CAAE,MAAM,CAChB,aAAa,CAAE,QAAQ,CACvB,KAAK,CAAE,OAAO,AAChB,CAAC,AAED,qCAAS,CACT,CAAC,IAAI,CAAC,UAAU,6BAAC,MAAM,AAAC,CAAC,AACvB,gBAAgB,CAAE,OAAO,CACzB,KAAK,CAAE,OAAO,AAChB,CAAC,AAED,CAAC,IAAI,CAAC,UAAU,eAAC,CAAC,IAAI,cAAC,CAAC,AACtB,SAAS,CAAE,OAAO,CAClB,WAAW,CAAE,GAAG,CAChB,WAAW,CAAE,IAAI,CACjB,cAAc,CAAE,MAAM,CACtB,cAAc,CAAE,SAAS,CACzB,KAAK,CAAE,OAAO,AAChB,CAAC"}`
};
create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let selectedResult;
  let selectedId;
  let $$restProps = compute_rest_props($$props, ["value", "active", "ref", "results", "selectedResultIndex"]);
  let {value = ""} = $$props;
  let {active = false} = $$props;
  let {ref = null} = $$props;
  let {results = []} = $$props;
  let {selectedResultIndex = 0} = $$props;
  const dispatch = createEventDispatcher();
  let refSearch = null;
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  if ($$props.active === void 0 && $$bindings.active && active !== void 0)
    $$bindings.active(active);
  if ($$props.ref === void 0 && $$bindings.ref && ref !== void 0)
    $$bindings.ref(ref);
  if ($$props.results === void 0 && $$bindings.results && results !== void 0)
    $$bindings.results(results);
  if ($$props.selectedResultIndex === void 0 && $$bindings.selectedResultIndex && selectedResultIndex !== void 0)
    $$bindings.selectedResultIndex(selectedResultIndex);
  $$result.css.add(css$1);
  {
    if (active && ref)
      ref.focus();
  }
  {
    dispatch(active ? "active" : "inactive");
  }
  selectedResult = results[selectedResultIndex];
  selectedId = selectedResult ? `search-menuitem-${selectedResultIndex}` : void 0;
  return `

<div role="${"search"}" class="${["svelte-qozwl4", active ? "active" : ""].join(" ").trim()}"${add_attribute("this", refSearch, 1)}><label for="${"search-input"}" id="${"search-label"}" class="${"svelte-qozwl4"}">Search</label>
  <div role="${"combobox"}"${add_attribute("aria-expanded", active, 0)} class="${"svelte-qozwl4"}"><button type="${"button"}" aria-label="${"Search"}"${add_attribute("tabindex", active ? "-1" : "0", 0)} class="${[
    "svelte-qozwl4",
    "bx--header__action " + (active ? "disabled" : "")
  ].join(" ").trim()}">${validate_component(Search20, "Search20").$$render($$result, {title: "Search"}, {}, {})}</button>
    <input${spread([
    {type: "text"},
    {autocomplete: "off"},
    {placeholder: "Search..."},
    {tabindex: escape2(active ? "0" : "-1")},
    $$restProps,
    {id: "search-input"},
    {
      "aria-activedescendant": escape2(selectedId)
    }
  ], (active ? "active" : "") + " svelte-qozwl4")}${add_attribute("this", ref, 1)}${add_attribute("value", value, 1)}>
    <button type="${"button"}" aria-label="${"Clear search"}"${add_attribute("tabindex", active ? "0" : "-1", 0)} class="${[
    "svelte-qozwl4",
    "bx--header__action " + (!active ? "hidden" : "")
  ].join(" ").trim()}">${validate_component(Close20, "Close20").$$render($$result, {title: "Close"}, {}, {})}</button></div>

  ${active && results.length > 0 ? `<ul aria-labelledby="${"search-label"}" role="${"menu"}" id="${"search-menu"}" class="${"svelte-qozwl4"}">${each(results, (result, i) => `<li><a tabindex="${"-1"}" id="${"search-menuitem-" + escape2(i)}" role="${"menuitem"}"${add_attribute("href", result.href, 0)} class="${["svelte-qozwl4", selectedId === `search-menuitem-${i}` ? "selected" : ""].join(" ").trim()}">${slots.default ? slots.default({result, index: i}) : `
              ${escape2(result.text)}
              ${result.description ? `<span class="${"svelte-qozwl4"}">\u2013 ${escape2(result.description)}</span>` : ``}
            `}</a>
        </li>`)}</ul>` : ``}
</div>`;
});
create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, []);
  return `<li${spread([{role: "separator"}, $$restProps], "bx--side-nav__divider")}></li>`;
});
create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["nested"]);
  let {nested = false} = $$props;
  if ($$props.nested === void 0 && $$bindings.nested && nested !== void 0)
    $$bindings.nested(nested);
  return `<ul${spread([$$restProps], "bx--list--unordered " + (nested ? "bx--list--nested" : ""))}>${slots.default ? slots.default({}) : ``}</ul>`;
});
var Header_1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(Header, "Header").$$render($$result, {
    company: "DFW",
    platformName: "Pro Cleaning",
    href: "/"
  }, {}, {})}`;
});
var _layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(Header_1, "Header").$$render($$result, {}, {}, {})}
${slots.default ? slots.default({}) : ``}`;
});
var __layout = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": _layout
});
function load({error: error22, status}) {
  return {props: {error: error22, status}};
}
var Error$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let {status} = $$props;
  let {error: error22} = $$props;
  if ($$props.status === void 0 && $$bindings.status && status !== void 0)
    $$bindings.status(status);
  if ($$props.error === void 0 && $$bindings.error && error22 !== void 0)
    $$bindings.error(error22);
  return `<h1>${escape2(status)}</h1>

<p>${escape2(error22.message)}</p>


${error22.stack ? `<pre>${escape2(error22.stack)}</pre>` : ``}`;
});
var error2 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Error$1,
  load
});
var css = {
  code: "img.svelte-16li89q{max-width:100%}p.svelte-16li89q{margin-bottom:1rem}",
  map: `{"version":3,"file":"index.svelte","sources":["index.svelte"],"sourcesContent":["<script>\\n\\timport { Content, Grid, Row, Column } from 'carbon-components-svelte';\\n</script>\\n\\n<Content>\\n\\t<Grid>\\n\\t\\t<Row>\\n\\t\\t\\t<Column>\\n\\t\\t\\t\\t<p>\\n\\t\\t\\t\\t\\tWith DFW pro cleaning professional staff detailed Cleaning, professional with long history\\n\\t\\t\\t\\t\\tas provider of personal housekeeping and cleaning gratified through the completion of\\n\\t\\t\\t\\t\\tCleaning with immaculate results excellent communicator with the ability to provide\\n\\t\\t\\t\\t\\tquality customer care.\\n\\t\\t\\t\\t</p>\\n\\n\\t\\t\\t\\t<p>\\n\\t\\t\\t\\t\\tWith Pro cleaning you can depend on us through our service so that you can enjoy your\\n\\t\\t\\t\\t\\tclean home or office without the hassle of cleaning it yourself or having one of your\\n\\t\\t\\t\\t\\tworkers do the cleaning.\\n\\t\\t\\t\\t</p>\\n\\t\\t\\t</Column>\\n\\t\\t</Row>\\n\\t\\t<Row>\\n\\t\\t\\t<Column>\\n\\t\\t\\t\\t<img src=\\"banner.jpg\\" alt=\\"banner\\" />\\n\\t\\t\\t</Column>\\n\\t\\t</Row>\\n\\t</Grid>\\n</Content>\\n\\n<style>\\n\\timg {\\n\\t\\tmax-width: 100%;\\n\\t}\\n\\n\\tp {\\n\\t\\tmargin-bottom: 1rem;\\n\\t}\\n</style>\\n"],"names":[],"mappings":"AA+BC,GAAG,eAAC,CAAC,AACJ,SAAS,CAAE,IAAI,AAChB,CAAC,AAED,CAAC,eAAC,CAAC,AACF,aAAa,CAAE,IAAI,AACpB,CAAC"}`
};
var Routes = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `${validate_component(Content, "Content").$$render($$result, {}, {}, {
    default: () => `${validate_component(Grid, "Grid").$$render($$result, {}, {}, {
      default: () => `${validate_component(Row, "Row").$$render($$result, {}, {}, {
        default: () => `${validate_component(Column, "Column").$$render($$result, {}, {}, {
          default: () => `<p class="${"svelte-16li89q"}">With DFW pro cleaning professional staff detailed Cleaning, professional with long history
					as provider of personal housekeeping and cleaning gratified through the completion of
					Cleaning with immaculate results excellent communicator with the ability to provide
					quality customer care.
				</p>

				<p class="${"svelte-16li89q"}">With Pro cleaning you can depend on us through our service so that you can enjoy your
					clean home or office without the hassle of cleaning it yourself or having one of your
					workers do the cleaning.
				</p>`
        })}`
      })}
		${validate_component(Row, "Row").$$render($$result, {}, {}, {
        default: () => `${validate_component(Column, "Column").$$render($$result, {}, {}, {
          default: () => `<img src="${"banner.jpg"}" alt="${"banner"}" class="${"svelte-16li89q"}">`
        })}`
      })}`
    })}`
  })}`;
});
var index = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Routes
});

// .svelte-kit/vercel/entry.js
var entry_default = async (req, res) => {
  const {pathname, searchParams} = new URL(req.url || "", "http://localhost");
  let body;
  try {
    body = await getRawBody(req);
  } catch (err) {
    res.statusCode = err.status || 400;
    return res.end(err.reason || "Invalid request body");
  }
  const rendered = await render({
    method: req.method,
    headers: req.headers,
    path: pathname,
    query: searchParams,
    rawBody: body
  });
  if (rendered) {
    const {status, headers, body: body2} = rendered;
    return res.writeHead(status, headers).end(body2);
  }
  return res.writeHead(404).end();
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/*! clipboard-copy. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */
