#!/usr/bin/env node
/* 从 assets/style.css 生成 assets/style.embed.css:把所有选择器作用域到 .pan-lesson-embed,
 * 供 App 内嵌讲解正文使用(独立讲解页仍用原 style.css)。改了 style.css 后重跑:node scripts/build-embed-css.js */
const fs = require("fs");
const path = require("path");
const ROOT = path.join(__dirname, "..");
const SCOPE = ".pan-lesson-embed";

function stripComments(s) { return s.replace(/\/\*[\s\S]*?\*\//g, ""); }

function prefixSelector(selList) {
  return selList.split(",").map(function (part) {
    var s = part.trim();
    if (!s) return part;
    if (s === ":root" || s === "html" || s === "body" || s === "html, body") return SCOPE;
    if (/^html\b/.test(s)) return s.replace(/^html\b/, SCOPE);
    if (/^body\b/.test(s)) return s.replace(/^body\b/, SCOPE);
    if (s === "*") return SCOPE + " *";
    return SCOPE + " " + s;
  }).join(", ");
}

// 按最外层花括号把规则列表切成一条条(style.css 无字符串含花括号,简单切分即可)
function splitRules(css) {
  var out = [], depth = 0, buf = "";
  for (var i = 0; i < css.length; i++) {
    var c = css[i]; buf += c;
    if (c === "{") depth++;
    else if (c === "}") { depth--; if (depth === 0) { out.push(buf); buf = ""; } }
  }
  if (buf.trim()) out.push(buf);
  return out;
}

function processRuleList(css) {
  return splitRules(css).map(function (chunk) {
    chunk = chunk.trim();
    if (!chunk) return "";
    if (chunk[0] === "@") {
      var b = chunk.indexOf("{");
      if (b < 0) return chunk; // @import / @charset
      var head = chunk.slice(0, b).trim();
      if (/^@(media|supports)/i.test(head)) {
        var body = chunk.slice(b + 1, chunk.lastIndexOf("}"));
        return head + " {\n" + processRuleList(body) + "\n}";
      }
      return chunk; // @keyframes / @font-face 原样保留
    }
    var b2 = chunk.indexOf("{");
    if (b2 < 0) return chunk;
    return prefixSelector(chunk.slice(0, b2)) + " " + chunk.slice(b2);
  }).filter(Boolean).join("\n");
}

var src = fs.readFileSync(path.join(ROOT, "assets/style.css"), "utf8");
var out = "/* AUTO-GENERATED from style.css by scripts/build-embed-css.js — 勿手改;改 style.css 后重跑此脚本 */\n"
  + processRuleList(stripComments(src)) + "\n";
fs.writeFileSync(path.join(ROOT, "assets/style.embed.css"), out);
console.log("wrote assets/style.embed.css (" + out.length + " bytes)");
