module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/src/visual-edits/VisualEditsMessenger.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* eslint-disable @typescript-eslint/no-explicit-any */ __turbopack_context__.s([
    "CHANNEL",
    ()=>CHANNEL,
    "default",
    ()=>HoverReceiver
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
const CHANNEL = "ORCHIDS_HOVER_v1";
const VISUAL_EDIT_MODE_KEY = "orchids_visual_edit_mode";
const FOCUSED_ELEMENT_KEY = "orchids_focused_element";
// Deduplicate helper for high-frequency traffic (HIT / FOCUS_MOVED / SCROLL)
// -----------------------------------------------------------------------------
let _orchidsLastMsg = "";
const postMessageDedup = (data)=>{
    try {
        const key = JSON.stringify(data);
        if (key === _orchidsLastMsg) return; // identical – drop
        _orchidsLastMsg = key;
    } catch  {
    // if stringify fails, fall through
    }
    window.parent.postMessage(data, "*");
};
const BOX_PADDING = 4; // Pixels to expand the box on each side
// Helper to check if element can be made contentEditable
const isTextEditable = (element)=>{
    const tagName = element.tagName.toLowerCase();
    // Elements that typically contain text and can be made contentEditable
    const editableTags = [
        "p",
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "span",
        "div",
        "li",
        "td",
        "th",
        "label",
        "a",
        "button"
    ];
    // Check if it's already contentEditable or an input/textarea
    if (element.contentEditable === "true" || tagName === "input" || tagName === "textarea") {
        return true;
    }
    // Allow editing if element contains text and is an editable tag
    // Only allow editing if element has at most 1 child OR has direct text content
    if (editableTags.includes(tagName) && element.textContent?.trim()) {
        // Check if element has direct text nodes (not just text from children)
        const hasDirectText = Array.from(element.childNodes).some((node)=>node.nodeType === Node.TEXT_NODE && node.textContent?.trim());
        // Allow editing if:
        // 1. Element has no children (pure text element)
        // 2. Element has 1 or fewer children AND has direct text content
        if (element.childElementCount === 0 || element.childElementCount <= 1 && hasDirectText) {
            return true;
        }
    }
    return false;
};
// Helper to extract only text nodes from an element (excluding child element text)
const extractDirectTextContent = (element)=>{
    let text = "";
    for (const node of element.childNodes){
        if (node.nodeType === Node.TEXT_NODE) {
            text += node.textContent || "";
        }
    }
    return text;
};
// Helper to parse data-orchids-id to extract file path, line, and column
const parseOrchidsId = (orchidsId)=>{
    // Format: "filepath:line:column"
    const parts = orchidsId.split(":");
    if (parts.length < 3) return null;
    // The file path might contain colons, so we need to handle that
    const column = parseInt(parts.pop() || "0");
    const line = parseInt(parts.pop() || "0");
    const filePath = parts.join(":"); // Rejoin the remaining parts as the file path
    if (isNaN(line) || isNaN(column)) return null;
    return {
        filePath,
        line,
        column
    };
};
// Helper to get current styles of an element (including inline styles)
const getCurrentStyles = (element)=>{
    const computed = window.getComputedStyle(element);
    // Helper to normalize values and provide defaults
    const normalizeValue = (value, property)=>{
        // Handle background color - if it's transparent or rgba(0,0,0,0), return "transparent"
        if (property === "backgroundColor") {
            if (value === "rgba(0, 0, 0, 0)" || value === "rgb(0, 0, 0, 0)" || value === "transparent" || value === "") {
                return "transparent";
            }
        }
        // Handle background image - if none, return "none"
        if (property === "backgroundImage" && (value === "none" || value === "")) {
            return "none";
        }
        // Handle text decoration - if none, return "none"
        if (property === "textDecoration") {
            // Some browsers return complex values like "none solid rgb(0, 0, 0)"
            if (value.includes("none") || value === "") {
                return "none";
            }
        }
        // Handle font style - if normal, return "normal"
        if (property === "fontStyle" && (value === "normal" || value === "")) {
            return "normal";
        }
        // Handle font weight - normalize to standard values
        if (property === "fontWeight") {
            const weight = parseInt(value);
            if (!isNaN(weight)) {
                return String(weight);
            }
            return value || "400";
        }
        // Handle opacity - if 1, return "1"
        if (property === "opacity" && (value === "1" || value === "")) {
            return "1";
        }
        // Handle spacing values (padding/margin) - if 0px, return "0"
        if ((property.includes("padding") || property.includes("margin")) && (value === "0px" || value === "0")) {
            return "0";
        }
        // Handle border radius - if 0px, return "0"
        if (property === "borderRadius" && (value === "0px" || value === "0")) {
            return "0";
        }
        // Handle letter spacing - if normal, return "normal"
        if (property === "letterSpacing" && (value === "normal" || value === "0px")) {
            return "normal";
        }
        // Handle gap - if normal, return "normal"
        if (property === "gap" && (value === "normal" || value === "0px")) {
            return "normal";
        }
        return value;
    };
    return {
        fontSize: normalizeValue(computed.fontSize, "fontSize"),
        color: normalizeValue(computed.color, "color"),
        fontWeight: normalizeValue(computed.fontWeight, "fontWeight"),
        fontStyle: normalizeValue(computed.fontStyle, "fontStyle"),
        textDecoration: normalizeValue(computed.textDecoration, "textDecoration"),
        textAlign: normalizeValue(computed.textAlign, "textAlign"),
        lineHeight: normalizeValue(computed.lineHeight, "lineHeight"),
        letterSpacing: normalizeValue(computed.letterSpacing, "letterSpacing"),
        paddingLeft: normalizeValue(computed.paddingLeft, "paddingLeft"),
        paddingRight: normalizeValue(computed.paddingRight, "paddingRight"),
        paddingTop: normalizeValue(computed.paddingTop, "paddingTop"),
        paddingBottom: normalizeValue(computed.paddingBottom, "paddingBottom"),
        marginLeft: normalizeValue(computed.marginLeft, "marginLeft"),
        marginRight: normalizeValue(computed.marginRight, "marginRight"),
        marginTop: normalizeValue(computed.marginTop, "marginTop"),
        marginBottom: normalizeValue(computed.marginBottom, "marginBottom"),
        backgroundColor: normalizeValue(computed.backgroundColor, "backgroundColor"),
        backgroundImage: normalizeValue(computed.backgroundImage, "backgroundImage"),
        borderRadius: normalizeValue(computed.borderRadius, "borderRadius"),
        fontFamily: normalizeValue(computed.fontFamily, "fontFamily"),
        opacity: normalizeValue(computed.opacity, "opacity"),
        display: normalizeValue(computed.display, "display"),
        flexDirection: normalizeValue(computed.flexDirection, "flexDirection"),
        alignItems: normalizeValue(computed.alignItems, "alignItems"),
        justifyContent: normalizeValue(computed.justifyContent, "justifyContent"),
        gap: normalizeValue(computed.gap, "gap")
    };
};
// Normalize image src for comparison (handles Next.js optimization wrappers)
const normalizeImageSrc = (input)=>{
    if (!input) return "";
    try {
        const url = new URL(input, window.location.origin);
        // Handle Next.js <Image> optimization wrapper
        if (url.pathname === "/_next/image") {
            const real = url.searchParams.get("url");
            if (real) return decodeURIComponent(real);
        }
        return url.href; // absolute form
    } catch  {
        return input;
    }
};
// Helper to wrap multiline text only when it contains line breaks
const wrapMultiline = (text)=>{
    if (text.includes("\n")) {
        const escaped = text.replace(/\n/g, "\\n");
        // Wrap in {` ... `} so JSX will interpret it as a template literal
        return `{\`${escaped}\`}`;
    }
    return text;
};
function HoverReceiver() {
    const [hoverBox, setHoverBox] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [hoverBoxes, setHoverBoxes] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [focusBox, setFocusBox] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [focusedElementId, setFocusedElementId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isVisualEditMode, setIsVisualEditMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(()=>{
        // Initialize from localStorage if available
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        return false;
    });
    const [isResizing, setIsResizing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [resizeHandle, setResizeHandle] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [resizeStart, setResizeStart] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isScrolling, setIsScrolling] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    // Tag labels for hover and focus overlays
    const [hoverTag, setHoverTag] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [focusTag, setFocusTag] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const isResizingRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(false);
    const lastHitElementRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const lastHitIdRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const focusedElementRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const isVisualEditModeRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(false);
    const scrollTimeoutRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const originalContentRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])("");
    const originalSrcRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(""); // track original img src
    const focusedImageElementRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null); // track the actual img element
    const editingElementRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const wasEditableRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(false);
    const styleElementRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const originalStylesRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])({});
    const appliedStylesRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(new Map());
    const hasStyleChangesRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(false);
    const lastClickTimeRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(0);
    const pendingCleanupRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Cache of loaded fonts
    const loadedFontFamilies = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(new Set());
    // Map of elementId that already has a persistent font set
    const persistentFontMap = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(new Map());
    // Timeout refs for clearing persistent font map
    const persistentFontTimeouts = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(new Map());
    // Keep ref in sync with state and persist to localStorage
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        isVisualEditModeRef.current = isVisualEditMode;
        // Persist to localStorage
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
    }, [
        isVisualEditMode
    ]);
    // On mount, notify parent if visual edit mode was restored from localStorage
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (isVisualEditMode) {
            // Send acknowledgement to parent that visual edit mode is active
            // This will sync the parent's state with our restored state
            window.parent.postMessage({
                type: CHANNEL,
                msg: "VISUAL_EDIT_MODE_ACK",
                active: true
            }, "*");
            // Also send a special message to indicate this was restored from localStorage
            window.parent.postMessage({
                type: CHANNEL,
                msg: "VISUAL_EDIT_MODE_RESTORED",
                active: true
            }, "*");
            // Restore focused element after a short delay to ensure DOM is ready
            setTimeout(()=>{
                if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
                ;
            }, 500); // Wait 500ms for DOM to be fully ready
        }
    }, []); // Run only on mount
    // Helper function to expand box dimensions
    const expandBox = (rect)=>({
            top: rect.top - BOX_PADDING,
            left: rect.left - BOX_PADDING,
            width: rect.width + BOX_PADDING * 2,
            height: rect.height + BOX_PADDING * 2
        });
    // Helper to update focus box position
    const updateFocusBox = ()=>{
        if (focusedElementRef.current) {
            const r = focusedElementRef.current.getBoundingClientRect();
            setFocusBox(expandBox(r));
        }
    };
    // Add global styles for contentEditable elements
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (isVisualEditMode && !styleElementRef.current) {
            const style = document.createElement("style");
            style.textContent = `
        [contenteditable="true"]:focus {
          outline: none !important;
          box-shadow: none !important;
          border-color: inherit !important;
        }
        [contenteditable="true"] {
          cursor: text !important;
        }
        /* Prevent the default blue highlight on contenteditable */
        [contenteditable="true"]::selection {
          background-color: rgba(59, 130, 246, 0.3);
        }
        [contenteditable="true"]::-moz-selection {
          background-color: rgba(59, 130, 246, 0.3);
        }
        /* Prevent child elements from being editable */
        [contenteditable="true"] [contenteditable="false"] {
          user-select: none !important;
          -webkit-user-select: none !important;
          -moz-user-select: none !important;
          -ms-user-select: none !important;
          opacity: 0.7 !important;
          cursor: default !important;
        }
        /* Ensure protected elements can't be selected */
        [data-orchids-protected="true"] {
          user-select: none !important;
          -webkit-user-select: none !important;
          -moz-user-select: none !important;
          -ms-user-select: none !important;
        }
      `;
            document.head.appendChild(style);
            styleElementRef.current = style;
        } else if (!isVisualEditMode && styleElementRef.current) {
            styleElementRef.current.remove();
            styleElementRef.current = null;
        }
        return ()=>{
            if (styleElementRef.current) {
                styleElementRef.current.remove();
                styleElementRef.current = null;
            }
        };
    }, [
        isVisualEditMode
    ]);
    // Helper to make only text nodes editable and protect child elements
    const protectChildElements = (element)=>{
        // Make all child elements non-editable
        const childElements = element.querySelectorAll("*");
        childElements.forEach((child)=>{
            const childEl = child;
            childEl.contentEditable = "false";
            // Add a data attribute to mark protected elements
            childEl.setAttribute("data-orchids-protected", "true");
            // Only prevent text selection within the child elements when parent is being edited
            // But still allow pointer events for hovering and clicking
            childEl.style.userSelect = "none";
            childEl.style.webkitUserSelect = "none";
        // Don't set pointerEvents to none - we want to allow hover and click
        });
    };
    // Helper to restore child elements after editing
    const restoreChildElements = (element)=>{
        const protectedElements = element.querySelectorAll('[data-orchids-protected="true"]');
        protectedElements.forEach((child)=>{
            const childEl = child;
            childEl.removeAttribute("contenteditable");
            childEl.removeAttribute("data-orchids-protected");
            // Restore original styles
            childEl.style.userSelect = "";
            childEl.style.webkitUserSelect = "";
        });
    };
    // Handle text changes and send to parent
    const handleTextChange = (element)=>{
        // Double-check this is still the editing element to avoid stale closures
        if (element !== editingElementRef.current) {
            console.warn("Attempting to handle text change for non-editing element");
            return;
        }
        // Get the orchids ID from the element to ensure we're working with the right one
        const orchidsId = element.getAttribute("data-orchids-id");
        if (!orchidsId) return;
        // For elements with children, only extract direct text content
        let newText;
        let oldText;
        if (element.childElementCount > 0) {
            // Element has children - only track direct text nodes
            newText = extractDirectTextContent(element);
            // We need to compare against the original direct text content
            // Since originalContentRef stores the full text, we need to handle this differently
            oldText = originalContentRef.current;
        } else {
            // No children - use innerText to preserve line breaks
            newText = element.innerText || element.textContent || "";
            oldText = originalContentRef.current;
        }
        if (newText !== oldText) {
            const parsed = parseOrchidsId(orchidsId);
            if (!parsed) return;
            // Send text change message to parent
            const msg = {
                type: CHANNEL,
                msg: "TEXT_CHANGED",
                id: orchidsId,
                oldText: wrapMultiline(oldText),
                newText: wrapMultiline(newText),
                filePath: parsed.filePath,
                line: parsed.line,
                column: parsed.column
            };
            postMessageDedup(msg);
            // Update the original content reference
            originalContentRef.current = newText;
        }
    };
    // Handle style changes and send to parent
    const handleStyleChange = (element, styles)=>{
        const orchidsId = element.getAttribute("data-orchids-id");
        if (!orchidsId) return;
        const parsed = parseOrchidsId(orchidsId);
        if (!parsed) return;
        // Find ALL elements with the same orchids ID
        const allMatchingElements = document.querySelectorAll(`[data-orchids-id="${orchidsId}"]`);
        // Apply styles to ALL matching elements for visual feedback
        allMatchingElements.forEach((el)=>{
            Object.entries(styles).forEach(([property, value])=>{
                // Convert camelCase to kebab-case for CSS property names
                const cssProp = property.replace(/([A-Z])/g, "-$1").toLowerCase();
                // Handle special cases for default values
                let finalValue = value;
                // If backgroundColor is being set to transparent, use transparent keyword
                if (property === "backgroundColor" && (value === "transparent" || value === "rgba(0, 0, 0, 0)" || value === "rgb(0, 0, 0, 0)")) {
                    finalValue = "transparent";
                }
                // If removing styles (setting to default), remove the property
                if (property === "backgroundColor" && finalValue === "transparent" || property === "backgroundImage" && value === "none" || property === "textDecoration" && value === "none" || property === "fontStyle" && value === "normal" || property === "opacity" && value === "1" || (property.includes("padding") || property.includes("margin")) && value === "0" || property === "borderRadius" && value === "0" || property === "letterSpacing" && value === "normal" || property === "gap" && value === "normal") {
                    // Remove the property to let the stylesheet value show through
                    el.style.removeProperty(cssProp);
                } else {
                    // Apply with !important so it overrides existing rules
                    el.style.setProperty(cssProp, finalValue, "important");
                }
            });
        });
        // Store the applied styles
        const existingStyles = appliedStylesRef.current.get(orchidsId) || {};
        appliedStylesRef.current.set(orchidsId, {
            ...existingStyles,
            ...styles
        });
        hasStyleChangesRef.current = true;
        // Update the focus box after style change
        requestAnimationFrame(()=>{
            updateFocusBox();
        });
    // Don't send to parent yet - wait for blur
    };
    // Send style changes on blur
    const handleStyleBlur = (element)=>{
        if (!hasStyleChangesRef.current) return;
        const orchidsId = element.getAttribute("data-orchids-id");
        if (!orchidsId) return;
        const parsed = parseOrchidsId(orchidsId);
        if (!parsed) return;
        const appliedStyles = appliedStylesRef.current.get(orchidsId);
        if (!appliedStyles || Object.keys(appliedStyles).length === 0) return;
        // Get className for breakpoint detection
        const className = element.getAttribute("class") || "";
        // Send style blur message to parent for Tailwind conversion
        const msg = {
            type: CHANNEL,
            msg: "STYLE_BLUR",
            id: orchidsId,
            styles: appliedStyles,
            className,
            filePath: parsed.filePath,
            line: parsed.line,
            column: parsed.column
        };
        postMessageDedup(msg);
        // Reset style changes flag
        hasStyleChangesRef.current = false;
    };
    // Flush image src updates on blur/focus change
    const flushImageSrcChange = ()=>{
        // Use the stored image element reference if available
        const imgElement = focusedImageElementRef.current;
        if (!imgElement) return;
        const orchidsId = imgElement.getAttribute("data-orchids-id");
        if (!orchidsId) return;
        const parsed = parseOrchidsId(orchidsId);
        if (!parsed) return;
        const newSrc = normalizeImageSrc(imgElement.src);
        const oldSrc = normalizeImageSrc(originalSrcRef.current);
        if (!newSrc || newSrc === oldSrc) return; // nothing changed
        const msg = {
            type: CHANNEL,
            msg: "IMAGE_BLUR",
            id: orchidsId,
            oldSrc,
            newSrc,
            filePath: parsed.filePath,
            line: parsed.line,
            column: parsed.column
        };
        postMessageDedup(msg);
        originalSrcRef.current = newSrc; // reset baseline
        focusedImageElementRef.current = null; // clear reference
    };
    // Listen for style and image updates from parent
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        function handleMessage(e) {
            if (e.data?.type === "ORCHIDS_STYLE_UPDATE") {
                const { elementId, styles } = e.data;
                // Find ALL elements with the same orchids ID
                const allMatchingElements = document.querySelectorAll(`[data-orchids-id="${elementId}"]`);
                if (allMatchingElements.length > 0) {
                    // If fontFamily is present ensure stylesheet loaded first
                    const fam = styles.fontFamily || styles["fontFamily"];
                    if (fam) {
                        const familyKey = fam.replace(/['\s]+/g, "+");
                        if (!loadedFontFamilies.current.has(familyKey)) {
                            const link = document.createElement("link");
                            link.rel = "stylesheet";
                            link.href = `https://fonts.googleapis.com/css2?family=${familyKey}:wght@400&display=swap`;
                            document.head.appendChild(link);
                            loadedFontFamilies.current.add(familyKey);
                        }
                    }
                    // If fontFamily made persistent via style update, remember so previews don't override
                    if (fam) {
                        persistentFontMap.current.set(elementId, fam);
                        // Clear any existing timeout
                        const existingTimeout = persistentFontTimeouts.current.get(elementId);
                        if (existingTimeout) {
                            clearTimeout(existingTimeout);
                        }
                        // Set timeout to clear persistent font after 2 seconds, allowing previews again
                        const timeoutId = window.setTimeout(()=>{
                            persistentFontMap.current.delete(elementId);
                            persistentFontTimeouts.current.delete(elementId);
                        }, 2000);
                        persistentFontTimeouts.current.set(elementId, timeoutId);
                    }
                    // Apply styles to ALL matching elements
                    allMatchingElements.forEach((element)=>{
                        // Only update handleStyleChange for the focused element to track changes
                        if (focusedElementRef.current === element) {
                            handleStyleChange(element, styles);
                        } else {
                            // For other elements, apply styles directly
                            Object.entries(styles).forEach(([property, value])=>{
                                const cssProp = property.replace(/([A-Z])/g, "-$1").toLowerCase();
                                // Handle special cases for default values
                                let finalValue = String(value);
                                // If backgroundColor is being set to transparent, use transparent keyword
                                if (property === "backgroundColor" && (value === "transparent" || value === "rgba(0, 0, 0, 0)" || value === "rgb(0, 0, 0, 0)")) {
                                    finalValue = "transparent";
                                }
                                // If removing styles (setting to default), remove the property
                                if (property === "backgroundColor" && finalValue === "transparent" || property === "backgroundImage" && value === "none" || property === "textDecoration" && value === "none" || property === "fontStyle" && value === "normal" || property === "opacity" && value === "1" || (property.includes("padding") || property.includes("margin")) && value === "0" || property === "borderRadius" && value === "0" || property === "letterSpacing" && value === "normal" || property === "gap" && value === "normal") {
                                    // Remove the property to let the stylesheet value show through
                                    element.style.removeProperty(cssProp);
                                } else {
                                    element.style.setProperty(cssProp, finalValue, "important");
                                }
                            });
                        }
                    });
                }
            } else if (e.data?.type === "ORCHIDS_IMAGE_UPDATE") {
                const { elementId, src, oldSrc } = e.data;
                let element = null;
                const candidates = document.querySelectorAll(`[data-orchids-id="${elementId}"]`);
                candidates.forEach((el)=>{
                    if (el.tagName.toLowerCase() === "img") {
                        const img = el;
                        const norm = normalizeImageSrc(img.src);
                        if (!element) element = img; // first fallback
                        if (oldSrc && normalizeImageSrc(oldSrc) === norm) {
                            element = img;
                        }
                    }
                });
                if (!element) return;
                if (element.tagName.toLowerCase() === "img") {
                    const imgEl = element;
                    {
                        /*
             * Clear any existing responsive sources so the newly uploaded image
             * always displays.  Some frameworks (e.g. Next.js) add a `srcset`
             * attribute which can override `src` in certain viewport/device
             * scenarios, so we strip it out before setting the new source.
             */ imgEl.removeAttribute("srcset");
                        imgEl.srcset = "";
                        imgEl.src = src;
                        // Update baseline src so flush doesn't treat this as pending change
                        originalSrcRef.current = normalizeImageSrc(src);
                        focusedImageElementRef.current = imgEl;
                        imgEl.onload = ()=>updateFocusBox();
                    }
                }
            } else if (e.data?.type === "RESIZE_ELEMENT") {
                const { elementId, width, height } = e.data;
                const element = document.querySelector(`[data-orchids-id="${elementId}"]`);
                if (element && focusedElementRef.current === element) {
                    // Apply temporary resize styles
                    element.style.setProperty("width", `${width}px`, "important");
                    element.style.setProperty("height", `${height}px`, "important");
                    // Update focus box
                    updateFocusBox();
                }
            }
        }
        window.addEventListener("message", handleMessage);
        return ()=>window.removeEventListener("message", handleMessage);
    }, []);
    // Handle resize
    const handleResizeStart = (e, handle)=>{
        if (!focusedElementRef.current) return;
        e.preventDefault();
        e.stopPropagation();
        const rect = focusedElementRef.current.getBoundingClientRect();
        // Clear any hover overlay when starting resize
        setHoverBox(null);
        lastHitElementRef.current = null;
        // Disable pointer events on body to prevent hover detection
        document.body.style.pointerEvents = "none";
        // Keep resize handles interactive
        const resizeHandles = document.querySelectorAll(".resize-handle");
        resizeHandles.forEach((handle)=>{
            handle.style.pointerEvents = "auto";
        });
        setIsResizing(true);
        isResizingRef.current = true;
        setResizeHandle(handle);
        setResizeStart({
            x: e.clientX,
            y: e.clientY,
            width: rect.width,
            height: rect.height
        });
    };
    // Handle resize move
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!isResizing || !resizeStart || !resizeHandle || !focusedElementRef.current) return;
        const handleMouseMove = (e)=>{
            const dx = e.clientX - resizeStart.x;
            const dy = e.clientY - resizeStart.y;
            let newWidth = resizeStart.width;
            let newHeight = resizeStart.height;
            // Calculate new dimensions based on handle
            if (resizeHandle.includes("e")) newWidth = resizeStart.width + dx;
            if (resizeHandle.includes("w")) newWidth = resizeStart.width - dx;
            if (resizeHandle.includes("s")) newHeight = resizeStart.height + dy;
            if (resizeHandle.includes("n")) newHeight = resizeStart.height - dy;
            // Get parent container for constraints
            const parent = focusedElementRef.current?.parentElement;
            if (parent) {
                const parentRect = parent.getBoundingClientRect();
                const parentStyles = window.getComputedStyle(parent);
                const parentPaddingLeft = parseFloat(parentStyles.paddingLeft) || 0;
                const parentPaddingRight = parseFloat(parentStyles.paddingRight) || 0;
                const parentPaddingTop = parseFloat(parentStyles.paddingTop) || 0;
                const parentPaddingBottom = parseFloat(parentStyles.paddingBottom) || 0;
                const maxWidth = parentRect.width - parentPaddingLeft - parentPaddingRight;
                const maxHeight = parentRect.height - parentPaddingTop - parentPaddingBottom;
                /*
         * Soft-clamp strategy: we respect the parent’s max size until the
         * user’s cursor actually travels beyond that limit.  As soon as the
         * drag distance would produce a dimension larger than the container
         * can accommodate we stop clamping and let the element follow the
         * cursor, effectively allowing it to “spill” out of its parent.
         */ const exceedsWidth = newWidth > maxWidth;
                const exceedsHeight = newHeight > maxHeight;
                newWidth = Math.max(20, exceedsWidth ? newWidth : Math.min(newWidth, maxWidth));
                newHeight = Math.max(20, exceedsHeight ? newHeight : Math.min(newHeight, maxHeight));
            } else {
                // Fallback to minimum dimensions if no parent
                newWidth = Math.max(20, newWidth);
                newHeight = Math.max(20, newHeight);
            }
            // Ensure hover box stays hidden during resize
            if (hoverBox) {
                setHoverBox(null);
            }
            // Send resize message to parent
            if (focusedElementId) {
                window.parent.postMessage({
                    type: CHANNEL,
                    msg: "RESIZE_ELEMENT",
                    elementId: focusedElementId,
                    width: Math.round(newWidth),
                    height: Math.round(newHeight)
                }, "*");
            }
        };
        const handleMouseUp = ()=>{
            if (focusedElementRef.current && focusedElementId) {
                const element = focusedElementRef.current;
                const computedStyle = window.getComputedStyle(element);
                const width = parseFloat(computedStyle.width) || element.offsetWidth;
                const height = parseFloat(computedStyle.height) || element.offsetHeight;
                // Check if element has max-width/max-height constraints
                const maxWidth = computedStyle.maxWidth;
                const maxHeight = computedStyle.maxHeight;
                const hasMaxWidth = maxWidth && maxWidth !== "none" && maxWidth !== "initial";
                const hasMaxHeight = maxHeight && maxHeight !== "none" && maxHeight !== "initial";
                // Try to use relative units when possible
                const parent = element.parentElement;
                let widthValue = `${Math.round(width)}px`;
                let heightValue = `${Math.round(height)}px`;
                if (parent) {
                    const parentRect = parent.getBoundingClientRect();
                    const parentStyles = window.getComputedStyle(parent);
                    const parentPaddingLeft = parseFloat(parentStyles.paddingLeft) || 0;
                    const parentPaddingRight = parseFloat(parentStyles.paddingRight) || 0;
                    const parentPaddingTop = parseFloat(parentStyles.paddingTop) || 0;
                    const parentPaddingBottom = parseFloat(parentStyles.paddingBottom) || 0;
                    const parentInnerWidth = parentRect.width - parentPaddingLeft - parentPaddingRight;
                    const parentInnerHeight = parentRect.height - parentPaddingTop - parentPaddingBottom;
                    // If the element takes up a significant portion of parent, use percentage
                    const widthPercent = width / parentInnerWidth * 100;
                    const heightPercent = height / parentInnerHeight * 100;
                    // Use percentage if it's a round number or close to common values
                    if (Math.abs(widthPercent - Math.round(widthPercent)) < 0.1 || [
                        25,
                        33.333,
                        50,
                        66.667,
                        75,
                        100
                    ].some((v)=>Math.abs(widthPercent - v) < 0.5)) {
                        widthValue = `${Math.round(widthPercent * 10) / 10}%`;
                    }
                    // For height, be more conservative with percentages (often px is preferred)
                    if (Math.abs(heightPercent - Math.round(heightPercent)) < 0.1 && [
                        25,
                        50,
                        75,
                        100
                    ].includes(Math.round(heightPercent))) {
                        heightValue = `${Math.round(heightPercent)}%`;
                    }
                }
                // Build styles object
                const styles = {};
                // Always set a fixed width and height to break out of responsive classes.
                styles.width = widthValue;
                styles.height = heightValue;
                // If the element had a max-width constraint (e.g. from `max-w-full`),
                // we update it to the new width to ensure the resize is not capped.
                if (hasMaxWidth) {
                    styles.maxWidth = widthValue;
                }
                // Same for height.
                if (hasMaxHeight) {
                    styles.maxHeight = heightValue;
                }
                // Send final dimensions as style change
                const msg = {
                    type: CHANNEL,
                    msg: "STYLE_BLUR",
                    id: focusedElementId,
                    styles,
                    filePath: "",
                    line: 0,
                    column: 0,
                    className: element.getAttribute("class") || ""
                };
                // Extract file info from data-orchids-id
                const orchidsId = element.getAttribute("data-orchids-id");
                if (orchidsId) {
                    const parsed = parseOrchidsId(orchidsId);
                    if (parsed) {
                        msg.filePath = parsed.filePath;
                        msg.line = parsed.line;
                        msg.column = parsed.column;
                    }
                }
                window.parent.postMessage(msg, "*");
            }
            setIsResizing(false);
            isResizingRef.current = false;
            setResizeHandle(null);
            setResizeStart(null);
            // Re-enable pointer events
            document.body.style.pointerEvents = "";
            // Clear the last hit element to force re-detection after resize
            lastHitElementRef.current = null;
        };
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
        return ()=>{
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        };
    }, [
        isResizing,
        resizeStart,
        resizeHandle,
        focusedElementId,
        hoverBox
    ]); // Added focusedElementId and hoverBox as dependencies
    // Cleanup function to restore element state
    const cleanupEditingElement = ()=>{
        if (editingElementRef.current) {
            const element = editingElementRef.current;
            // Immediately clear the ref to prevent any further operations
            editingElementRef.current = null;
            // Flush pending style edits first for the same reason described above
            handleStyleBlur(element);
            // Now process text changes
            handleTextChange(element);
            // Restore child elements if they were protected
            if (element.childElementCount > 0) {
                restoreChildElements(element);
            }
            // Only set contentEditable to false if we made it true
            if (!wasEditableRef.current) {
                element.contentEditable = "false";
            }
            // Don't restore original styles - keep the applied styles
            // Remove the outline suppression styles only
            const currentStyle = element.getAttribute("style") || "";
            const cleanedStyle = currentStyle.replace(/outline:\s*none\s*!important;?/gi, "").replace(/box-shadow:\s*none\s*!important;?/gi, "").trim().replace(/;\s*;/g, ";").replace(/^;|;$/g, "");
            if (cleanedStyle) {
                element.setAttribute("style", cleanedStyle);
            } else {
                element.removeAttribute("style");
            }
            element.blur();
            // Remove event handlers
            const handlers = element._editHandlers;
            if (handlers) {
                element.removeEventListener("focus", handlers.focus);
                element.removeEventListener("blur", handlers.blur);
                element.removeEventListener("input", handlers.input);
                delete element._editHandlers;
            }
            wasEditableRef.current = false;
            // Clear the original content reference
            originalContentRef.current = "";
        }
    };
    // Prevent all navigation in visual edit mode
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!isVisualEditMode) return;
        // Prevent link clicks
        const preventLinkClick = (e)=>{
            const target = e.target;
            const link = target.closest("a");
            if (link && !link.isContentEditable) {
                e.preventDefault();
                e.stopPropagation();
            }
        };
        // Prevent form submissions
        const preventFormSubmit = (e)=>{
            e.preventDefault();
            e.stopPropagation();
        };
        // Add listeners in capture phase to catch events early
        document.addEventListener("click", preventLinkClick, true);
        document.addEventListener("submit", preventFormSubmit, true);
        return ()=>{
            document.removeEventListener("click", preventLinkClick, true);
            document.removeEventListener("submit", preventFormSubmit, true);
        };
    }, [
        isVisualEditMode
    ]);
    // Clean up when exiting visual edit mode
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!isVisualEditMode) {
            cleanupEditingElement();
            // Clear applied styles tracking
            appliedStylesRef.current.clear();
            hasStyleChangesRef.current = false;
            // Clear image element reference
            focusedImageElementRef.current = null;
        }
    }, [
        isVisualEditMode
    ]);
    // Update focus box position when scrolling or resizing
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (focusedElementRef.current) {
            const handleUpdate = ()=>{
                updateFocusBox();
                if (focusedElementRef.current && focusedElementId) {
                    const fr = focusedElementRef.current.getBoundingClientRect();
                    const fBox = expandBox(fr);
                    if ("TURBOPACK compile-time truthy", 1) {
                        const focMsg = {
                            type: CHANNEL,
                            msg: "FOCUS_MOVED",
                            id: focusedElementId,
                            rect: {
                                top: fBox.top,
                                left: fBox.left,
                                width: fBox.width,
                                height: fBox.height
                            }
                        };
                        postMessageDedup(focMsg);
                    }
                }
            };
            window.addEventListener("scroll", handleUpdate, true);
            window.addEventListener("resize", handleUpdate);
            // Also observe the focused element for size changes
            const resizeObserver = new ResizeObserver(handleUpdate);
            resizeObserver.observe(focusedElementRef.current);
            return ()=>{
                window.removeEventListener("scroll", handleUpdate, true);
                window.removeEventListener("resize", handleUpdate);
                resizeObserver.disconnect();
            };
        }
    }, [
        focusedElementId
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        // Handle pointer movement directly in the iframe
        function onPointerMove(e) {
            if (isResizingRef.current) {
                return;
            }
            // Only track pointer when visual edit mode is active
            if (!isVisualEditModeRef.current) return;
            // Don't show hover boxes while scrolling
            if (isScrolling) return;
            // Hit-testing at pointer position
            const hit = document.elementFromPoint(e.clientX, e.clientY)?.closest("[data-orchids-id]") ?? null;
            if (hit !== lastHitElementRef.current) {
                lastHitElementRef.current = hit;
                if (!hit) {
                    setHoverBox(null);
                    setHoverBoxes([]);
                    setHoverTag(null);
                    lastHitIdRef.current = null;
                    // If we were previously focused on an image, ensure its src is flushed
                    flushImageSrcChange();
                    const msg = {
                        type: CHANNEL,
                        msg: "HIT",
                        id: null,
                        tag: null,
                        rect: null
                    };
                    postMessageDedup(msg);
                    return;
                }
                // Don't show hover box if this is the focused element
                const hitId = hit.getAttribute("data-orchids-id");
                // Check if we're already showing boxes for this ID
                if (hitId === lastHitIdRef.current) {
                    return;
                }
                lastHitIdRef.current = hitId;
                const tagName = hit.getAttribute("data-orchids-name") || hit.tagName.toLowerCase();
                // Update hover boxes immediately for instant feedback
                // Find ALL elements with the same orchids ID
                const allMatchingElements = document.querySelectorAll(`[data-orchids-id="${hitId}"]`);
                // Create hover boxes for all matching elements except the focused one
                const boxes = [];
                allMatchingElements.forEach((element)=>{
                    // Skip if this element is the focused one
                    const elementId = element.getAttribute("data-orchids-id");
                    if (elementId === focusedElementId) {
                        return;
                    }
                    const rect = element.getBoundingClientRect();
                    boxes.push(expandBox(rect));
                });
                // Set multiple hover boxes
                setHoverBoxes(boxes);
                // Set single hover box for the primary element (for compatibility)
                // Only set if it's not the focused element
                if (hitId !== focusedElementId) {
                    const r = hit.getBoundingClientRect();
                    const expandedBox = expandBox(r);
                    setHoverBox(expandedBox);
                } else {
                    setHoverBox(null);
                }
                setHoverTag(tagName);
                const msg = {
                    type: CHANNEL,
                    msg: "HIT",
                    id: hitId,
                    tag: tagName,
                    rect: hitId !== focusedElementId ? expandBox(hit.getBoundingClientRect()) : null
                };
                postMessageDedup(msg);
            }
        }
        // Handle pointer leaving the document
        function onPointerLeave() {
            if (!isVisualEditModeRef.current) return;
            if (isResizingRef.current) return;
            setHoverBox(null);
            setHoverBoxes([]);
            setHoverTag(null);
            // Flush image src change when cursor leaves iframe altogether
            flushImageSrcChange();
            lastHitElementRef.current = null;
            lastHitIdRef.current = null;
            const msg = {
                type: CHANNEL,
                msg: "HIT",
                id: null,
                tag: null,
                rect: null
            };
            postMessageDedup(msg);
        }
        // Handle mousedown to prepare element for editing
        function onMouseDownCapture(e) {
            if (isResizingRef.current) return;
            // Only handle if visual edit mode is active
            if (!isVisualEditModeRef.current) return;
            const hit = e.target?.closest("[data-orchids-id]");
            if (hit && isTextEditable(hit)) {
                // Store whether it was already editable
                wasEditableRef.current = hit.contentEditable === "true";
                // Make element editable BEFORE the click goes through
                if (!wasEditableRef.current) {
                    // Apply inline styles to remove focus ring
                    const currentStyle = hit.getAttribute("style") || "";
                    hit.setAttribute("style", `${currentStyle}; outline: none !important; box-shadow: none !important;`);
                    hit.contentEditable = "true";
                    // If the element has children, protect them from being edited
                    if (hit.childElementCount > 0) {
                        protectChildElements(hit);
                    }
                }
            }
        }
        // Handle clicks to focus elements
        function onClickCapture(e) {
            if (isResizingRef.current) return;
            // Only handle if visual edit mode is active
            if (!isVisualEditModeRef.current) return;
            // Debounce rapid clicks
            const now = Date.now();
            if (now - lastClickTimeRef.current < 100) {
                return; // Ignore clicks within 100ms of each other
            }
            lastClickTimeRef.current = now;
            const target = e.target;
            const hit = target.closest("[data-orchids-id]");
            if (hit) {
                const tagName = hit.getAttribute("data-orchids-name") || hit.tagName.toLowerCase();
                const hitId = hit.getAttribute("data-orchids-id");
                const isEditable = isTextEditable(hit);
                // Always prevent default for non-text interactions
                const isLink = hit.tagName.toLowerCase() === "a" || !!hit.closest("a");
                const isButton = hit.tagName.toLowerCase() === "button" || hit.getAttribute("role") === "button";
                // Prevent navigation and button actions
                if (isLink || isButton || !isEditable) {
                    e.preventDefault();
                    e.stopPropagation();
                }
                // Capture previously focused element before updating
                const prevFocused = focusedElementRef.current;
                // Update focused element
                focusedElementRef.current = hit;
                setFocusedElementId(hitId);
                setFocusTag(tagName);
                // Save focused element info to localStorage
                if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
                ;
                // Find ALL other elements with the same orchids ID and show hover boxes
                const allMatchingElements = document.querySelectorAll(`[data-orchids-id="${hitId}"]`);
                // Create hover boxes for all matching elements except the focused one
                const boxes = [];
                allMatchingElements.forEach((element)=>{
                    // Skip the focused element itself
                    if (element === hit) {
                        return;
                    }
                    const rect = element.getBoundingClientRect();
                    boxes.push(expandBox(rect));
                });
                // Set hover boxes for other matching elements
                setHoverBoxes(boxes);
                // Set the hover tag to show on other elements
                if (boxes.length > 0) {
                    setHoverTag(tagName);
                }
                // Track image element specifically
                if (hit.tagName.toLowerCase() === "img") {
                    focusedImageElementRef.current = hit;
                } else {
                    focusedImageElementRef.current = null;
                }
                // Store original styles for the focused element
                originalStylesRef.current = getCurrentStyles(hit);
                // If this is an editable element, set it up
                if (isEditable) {
                    // Cancel any pending cleanup
                    if (pendingCleanupRef.current) {
                        clearTimeout(pendingCleanupRef.current);
                        pendingCleanupRef.current = null;
                    }
                    // Clean up any previous editing element first
                    if (editingElementRef.current && editingElementRef.current !== hit) {
                        // Force blur on the previous element to trigger handlers
                        editingElementRef.current.blur();
                        cleanupEditingElement();
                    }
                    // Only set up if this is a new element
                    if (hit !== editingElementRef.current) {
                        editingElementRef.current = hit;
                        // Store original content - for elements with children, only store direct text
                        if (hit.childElementCount > 0) {
                            originalContentRef.current = extractDirectTextContent(hit);
                        } else {
                            originalContentRef.current = hit.innerText || hit.textContent || "";
                        }
                        // Create handlers with current element reference
                        const createHandlers = (element)=>{
                            const handleFocus = ()=>{
                                // Double-check this is still the editing element
                                if (element !== editingElementRef.current) return;
                                // If the user applied inline style edits **before** entering text
                                // editing mode, make sure we commit them right away so that the
                                // subsequent text edits operate on the updated source.
                                handleStyleBlur(element);
                                // Update original content - for elements with children, only store direct text
                                if (element.childElementCount > 0) {
                                    originalContentRef.current = extractDirectTextContent(element);
                                } else {
                                    originalContentRef.current = element.innerText || element.textContent || "";
                                }
                                // Style blur above resets the flag – keep it in sync.
                                hasStyleChangesRef.current = false;
                            };
                            const handleBlur = ()=>{
                                // Double-check this is still the editing element
                                if (element !== editingElementRef.current) return;
                                // Flush style changes *before* text changes so that the style
                                // update is committed with the original line/column offsets.
                                // A subsequent text update may shift the source code which would
                                // otherwise cause the later style edit to fail.
                                handleStyleBlur(element);
                                handleTextChange(element);
                            };
                            const handleInput = ()=>{
                                // Double-check this is still the editing element
                                if (element !== editingElementRef.current) return;
                            // Optionally handle real-time updates
                            // handleTextChange(element);
                            };
                            return {
                                handleFocus,
                                handleBlur,
                                handleInput
                            };
                        };
                        const handlers = createHandlers(hit);
                        hit.addEventListener("focus", handlers.handleFocus);
                        hit.addEventListener("blur", handlers.handleBlur);
                        hit.addEventListener("input", handlers.handleInput);
                        // Store handlers for cleanup
                        hit._editHandlers = {
                            focus: handlers.handleFocus,
                            blur: handlers.handleBlur,
                            input: handlers.handleInput
                        };
                    }
                }
                // Update focus box with expanded dimensions
                const r = hit.getBoundingClientRect();
                const expandedBox = expandBox(r);
                setFocusBox(expandedBox);
                // Clear hover box since we're focusing
                setHoverBox(null);
                // Get className for Tailwind extraction
                const className = hit.getAttribute("class") || "";
                // Get src for images & track original
                const srcRaw = hit.tagName.toLowerCase() === "img" ? hit.src : undefined;
                if (srcRaw) {
                    originalSrcRef.current = normalizeImageSrc(srcRaw);
                }
                // Get current styles immediately
                const computedStyles = getCurrentStyles(hit);
                // Send click event to parent with coordinates and current styles
                const msg = {
                    type: CHANNEL,
                    msg: "ELEMENT_CLICKED",
                    id: hitId,
                    tag: tagName,
                    rect: ("TURBOPACK compile-time truthy", 1) ? {
                        top: expandedBox.top,
                        left: expandedBox.left,
                        width: expandedBox.width,
                        height: expandedBox.height
                    } : "TURBOPACK unreachable",
                    clickPosition: {
                        x: e.clientX,
                        y: e.clientY
                    },
                    isEditable,
                    currentStyles: computedStyles,
                    className,
                    src: srcRaw
                };
                // Send message with all data at once
                postMessageDedup(msg);
                // Move cleanup operations to after message is sent
                setTimeout(()=>{
                    // Before changing focus, flush pending image src change
                    flushImageSrcChange();
                    // Flush style changes for the previously focused element (if any)
                    if (prevFocused && prevFocused !== hit) {
                        handleStyleBlur(prevFocused);
                    }
                    // Clean up any previous editing element (if it's different)
                    if (editingElementRef.current && editingElementRef.current !== hit) {
                        cleanupEditingElement();
                    }
                }, 0);
            } else {
                // Clicked on empty space or element without data-orchids-id
                // Clear focus and hover boxes
                if (focusedElementRef.current) {
                    // Flush any pending changes
                    flushImageSrcChange();
                    handleStyleBlur(focusedElementRef.current);
                    cleanupEditingElement();
                    // Clear all focus and hover states
                    focusedElementRef.current = null;
                    setFocusedElementId(null);
                    setFocusTag(null);
                    setFocusBox(null);
                    setHoverBox(null);
                    setHoverBoxes([]);
                    setHoverTag(null);
                    // Clear focused element from localStorage
                    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
                    ;
                    // Notify parent that focus was cleared
                    const msg = {
                        type: CHANNEL,
                        msg: "ELEMENT_CLICKED",
                        id: null,
                        tag: null,
                        rect: {
                            top: 0,
                            left: 0,
                            width: 0,
                            height: 0
                        },
                        clickPosition: {
                            x: e.clientX,
                            y: e.clientY
                        },
                        isEditable: false,
                        currentStyles: {},
                        className: ""
                    };
                    postMessageDedup(msg);
                }
            }
        }
        // Handle messages from parent
        function onMsg(e) {
            if (e.data?.type !== CHANNEL) return;
            // Handle preview font request from parent
            if (e.data.msg === "PREVIEW_FONT" && "elementId" in e.data) {
                const { elementId, fontFamily } = e.data;
                // Skip if font already persisted for this element to avoid race condition
                if (persistentFontMap.current.has(elementId)) {
                    return;
                }
                const element = document.querySelector(`[data-orchids-id="${elementId}"]`);
                if (!element) return;
                // Ensure font stylesheet is loaded
                const familyKey = fontFamily.replace(/\s+/g, "+");
                if (!loadedFontFamilies.current.has(familyKey)) {
                    const link = document.createElement("link");
                    link.rel = "stylesheet";
                    link.href = `https://fonts.googleapis.com/css2?family=${familyKey}:wght@400&display=swap`;
                    document.head.appendChild(link);
                    loadedFontFamilies.current.add(familyKey);
                }
                // Apply font family to element inline for preview
                element.style.fontFamily = `'${fontFamily}', sans-serif`;
                return;
            }
            // Handle scroll messages from parent
            if (e.data.msg === "SCROLL" && "dx" in e.data && "dy" in e.data) {
                window.scrollBy(e.data.dx, e.data.dy);
            }
            // Handle visual edit mode state changes
            if (e.data.msg === "VISUAL_EDIT_MODE" && "active" in e.data) {
                const newMode = e.data.active;
                setIsVisualEditMode(newMode);
                // Clear localStorage if visual edit mode is being turned off
                if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
                ;
                // Send acknowledgement back to parent so it knows we received the mode change
                window.parent.postMessage({
                    type: CHANNEL,
                    msg: "VISUAL_EDIT_MODE_ACK",
                    active: newMode
                }, "*");
                if (!newMode) {
                    // already handled, flush too
                    // Flush image src change for current focus
                    flushImageSrcChange();
                    // Clean up any editing element
                    cleanupEditingElement();
                    // Clear image element reference
                    focusedImageElementRef.current = null;
                    // Clear everything when exiting visual edit mode
                    setHoverBox(null);
                    setHoverBoxes([]);
                    setFocusBox(null);
                    setFocusedElementId(null);
                    lastHitElementRef.current = null;
                    focusedElementRef.current = null;
                    hasStyleChangesRef.current = false;
                    setHoverTag(null);
                    setFocusTag(null);
                    // Notify parent that we've cleared the selection
                    const msg = {
                        type: CHANNEL,
                        msg: "HIT",
                        id: null,
                        tag: null,
                        rect: null
                    };
                    postMessageDedup(msg);
                }
            }
            // Handle clear inline styles message
            if (e.data.msg === "CLEAR_INLINE_STYLES" && "elementId" in e.data) {
                // Find ALL elements with the same orchids ID
                const allMatchingElements = document.querySelectorAll(`[data-orchids-id="${e.data.elementId}"]`);
                allMatchingElements.forEach((element)=>{
                    // Clear only the inline styles we track (typography, spacing, and background)
                    const stylesToClear = [
                        "fontSize",
                        "color",
                        "fontWeight",
                        "fontStyle",
                        "textDecoration",
                        "textAlign",
                        "paddingLeft",
                        "paddingRight",
                        "paddingTop",
                        "paddingBottom",
                        "marginLeft",
                        "marginRight",
                        "marginTop",
                        "marginBottom",
                        "backgroundColor",
                        "backgroundImage"
                    ];
                    stylesToClear.forEach((prop)=>{
                        element.style[prop] = "";
                    });
                });
                // Clear from our tracking
                appliedStylesRef.current.delete(e.data.elementId);
            }
            // Handle show element hover message
            if (e.data.msg === "SHOW_ELEMENT_HOVER" && "elementId" in e.data) {
                const { elementId } = e.data;
                if (!elementId) {
                    // Clear hover boxes if no element ID
                    setHoverBoxes([]);
                    setHoverTag(null);
                    return;
                }
                // Find ALL elements with the same orchids ID
                const allMatchingElements = document.querySelectorAll(`[data-orchids-id="${elementId}"]`);
                if (allMatchingElements.length > 0) {
                    const boxes = [];
                    let tagName = "";
                    allMatchingElements.forEach((element)=>{
                        // Skip if this element is the focused one
                        if (element === focusedElementRef.current) {
                            return;
                        }
                        const rect = element.getBoundingClientRect();
                        boxes.push(expandBox(rect));
                        if (!tagName) {
                            tagName = element.getAttribute("data-orchids-name") || element.tagName.toLowerCase();
                        }
                    });
                    // Set hover boxes for all matching elements
                    setHoverBoxes(boxes);
                    setHoverTag(boxes.length > 0 ? tagName : null);
                }
            }
        }
        // Handle scroll events to update hover box position
        function onScroll() {
            if (isResizingRef.current) return;
            // Only update hover box if visual edit mode is active
            if (!isVisualEditModeRef.current) return;
            // Hide hover boxes while scrolling
            setIsScrolling(true);
            setHoverBox(null);
            setHoverBoxes([]);
            // Notify parent that scrolling has started
            const scrollMsg = {
                type: CHANNEL,
                msg: "SCROLL_STARTED"
            };
            postMessageDedup(scrollMsg);
            // Reset the notification flag after scrolling stops
            if (scrollTimeoutRef.current) {
                clearTimeout(scrollTimeoutRef.current);
            }
            scrollTimeoutRef.current = window.setTimeout(()=>{
                setIsScrolling(false);
                const scrollStopMsg = {
                    type: CHANNEL,
                    msg: "SCROLL_STOPPED"
                };
                postMessageDedup(scrollStopMsg);
            }, 16); // One frame (16ms) for instant restoration
        }
        // Add event listeners
        document.addEventListener("pointermove", onPointerMove, {
            passive: true
        });
        document.addEventListener("pointerleave", onPointerLeave);
        document.addEventListener("mousedown", onMouseDownCapture, {
            capture: true
        });
        document.addEventListener("click", onClickCapture, {
            capture: true
        });
        window.addEventListener("message", onMsg);
        window.addEventListener("scroll", onScroll, true);
        return ()=>{
            document.removeEventListener("pointermove", onPointerMove);
            document.removeEventListener("pointerleave", onPointerLeave);
            document.removeEventListener("mousedown", onMouseDownCapture, true);
            document.removeEventListener("click", onClickCapture, true);
            window.removeEventListener("message", onMsg);
            window.removeEventListener("scroll", onScroll, true);
            if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
        };
    }, [
        focusedElementId,
        isResizing
    ]); // Added focusedElementId and isResizing as dependencies
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            isVisualEditMode && !isResizing && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                children: hoverBoxes.filter((box)=>box !== null).map((box, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        "data-orchids-id": "src/visual-edits/VisualEditsMessenger.tsx:2019:14",
                        "data-orchids-name": "div",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                "data-orchids-id": "src/visual-edits/VisualEditsMessenger.tsx:2020:16",
                                "data-orchids-name": "div",
                                className: "fixed pointer-events-none border-[0.5px] border-[#38bdf8] bg-blue-200/20 border-dashed rounded-sm",
                                style: {
                                    zIndex: 100000,
                                    left: box.left,
                                    top: box.top,
                                    width: box.width,
                                    height: box.height
                                }
                            }, void 0, false, {
                                fileName: "[project]/src/visual-edits/VisualEditsMessenger.tsx",
                                lineNumber: 2020,
                                columnNumber: 17
                            }, this),
                            hoverTag && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                "data-orchids-id": "src/visual-edits/VisualEditsMessenger.tsx:2032:18",
                                "data-orchids-name": "div",
                                className: "fixed pointer-events-none text-[10px] text-white bg-[#38bdf8] px-1 py-0.5 rounded-sm",
                                style: {
                                    zIndex: 100001,
                                    left: box.left,
                                    top: box.top - 20
                                },
                                children: hoverTag
                            }, void 0, false, {
                                fileName: "[project]/src/visual-edits/VisualEditsMessenger.tsx",
                                lineNumber: 2032,
                                columnNumber: 19
                            }, this)
                        ]
                    }, index, true, {
                        fileName: "[project]/src/visual-edits/VisualEditsMessenger.tsx",
                        lineNumber: 2019,
                        columnNumber: 15
                    }, this))
            }, void 0, false),
            isVisualEditMode && focusBox && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    focusTag && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        "data-orchids-id": "src/visual-edits/VisualEditsMessenger.tsx:2052:12",
                        "data-orchids-name": "div",
                        className: "fixed text-[10px] font-semibold text-white bg-[#3b82f6] px-1 rounded-sm pointer-events-none select-none",
                        style: {
                            zIndex: 100003,
                            left: focusBox.left - 4,
                            top: focusBox.top - 16
                        },
                        children: focusTag
                    }, void 0, false, {
                        fileName: "[project]/src/visual-edits/VisualEditsMessenger.tsx",
                        lineNumber: 2052,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        "data-orchids-id": "src/visual-edits/VisualEditsMessenger.tsx:2064:10",
                        "data-orchids-name": "div",
                        className: "fixed pointer-events-none border-[1.5px] border-[#38bdf8] rounded-sm",
                        style: {
                            zIndex: 100001,
                            left: focusBox.left,
                            top: focusBox.top,
                            width: focusBox.width,
                            height: focusBox.height
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/visual-edits/VisualEditsMessenger.tsx",
                        lineNumber: 2064,
                        columnNumber: 11
                    }, this),
                    !isResizing && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                "data-orchids-id": "src/visual-edits/VisualEditsMessenger.tsx:2079:14",
                                "data-orchids-name": "div",
                                className: "fixed w-2 h-2 bg-[#38bdf8] rounded-full cursor-nw-resize pointer-events-auto resize-handle",
                                style: {
                                    zIndex: 100002,
                                    left: focusBox.left - 4,
                                    top: focusBox.top - 4
                                },
                                onMouseDown: (e)=>handleResizeStart(e, "nw")
                            }, void 0, false, {
                                fileName: "[project]/src/visual-edits/VisualEditsMessenger.tsx",
                                lineNumber: 2079,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                "data-orchids-id": "src/visual-edits/VisualEditsMessenger.tsx:2088:14",
                                "data-orchids-name": "div",
                                className: "fixed w-2 h-2 bg-[#38bdf8] rounded-full cursor-ne-resize pointer-events-auto resize-handle",
                                style: {
                                    zIndex: 100002,
                                    left: focusBox.left + focusBox.width - 4,
                                    top: focusBox.top - 4
                                },
                                onMouseDown: (e)=>handleResizeStart(e, "ne")
                            }, void 0, false, {
                                fileName: "[project]/src/visual-edits/VisualEditsMessenger.tsx",
                                lineNumber: 2088,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                "data-orchids-id": "src/visual-edits/VisualEditsMessenger.tsx:2097:14",
                                "data-orchids-name": "div",
                                className: "fixed w-2 h-2 bg-[#38bdf8] rounded-full cursor-sw-resize pointer-events-auto resize-handle",
                                style: {
                                    zIndex: 100002,
                                    left: focusBox.left - 4,
                                    top: focusBox.top + focusBox.height - 4
                                },
                                onMouseDown: (e)=>handleResizeStart(e, "sw")
                            }, void 0, false, {
                                fileName: "[project]/src/visual-edits/VisualEditsMessenger.tsx",
                                lineNumber: 2097,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                "data-orchids-id": "src/visual-edits/VisualEditsMessenger.tsx:2106:14",
                                "data-orchids-name": "div",
                                className: "fixed w-2 h-2 bg-[#38bdf8] rounded-full cursor-se-resize pointer-events-auto resize-handle",
                                style: {
                                    zIndex: 100002,
                                    left: focusBox.left + focusBox.width - 4,
                                    top: focusBox.top + focusBox.height - 4
                                },
                                onMouseDown: (e)=>handleResizeStart(e, "se")
                            }, void 0, false, {
                                fileName: "[project]/src/visual-edits/VisualEditsMessenger.tsx",
                                lineNumber: 2106,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                "data-orchids-id": "src/visual-edits/VisualEditsMessenger.tsx:2117:14",
                                "data-orchids-name": "div",
                                className: "fixed w-2 h-2 bg-[#38bdf8] rounded-full cursor-n-resize pointer-events-auto resize-handle",
                                style: {
                                    zIndex: 100002,
                                    left: focusBox.left + focusBox.width / 2 - 4,
                                    top: focusBox.top - 4
                                },
                                onMouseDown: (e)=>handleResizeStart(e, "n")
                            }, void 0, false, {
                                fileName: "[project]/src/visual-edits/VisualEditsMessenger.tsx",
                                lineNumber: 2117,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                "data-orchids-id": "src/visual-edits/VisualEditsMessenger.tsx:2126:14",
                                "data-orchids-name": "div",
                                className: "fixed w-2 h-2 bg-[#38bdf8] rounded-full cursor-s-resize pointer-events-auto resize-handle",
                                style: {
                                    zIndex: 100002,
                                    left: focusBox.left + focusBox.width / 2 - 4,
                                    top: focusBox.top + focusBox.height - 4
                                },
                                onMouseDown: (e)=>handleResizeStart(e, "s")
                            }, void 0, false, {
                                fileName: "[project]/src/visual-edits/VisualEditsMessenger.tsx",
                                lineNumber: 2126,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                "data-orchids-id": "src/visual-edits/VisualEditsMessenger.tsx:2135:14",
                                "data-orchids-name": "div",
                                className: "fixed w-2 h-2 bg-[#38bdf8] rounded-full cursor-w-resize pointer-events-auto resize-handle",
                                style: {
                                    zIndex: 100002,
                                    left: focusBox.left - 4,
                                    top: focusBox.top + focusBox.height / 2 - 4
                                },
                                onMouseDown: (e)=>handleResizeStart(e, "w")
                            }, void 0, false, {
                                fileName: "[project]/src/visual-edits/VisualEditsMessenger.tsx",
                                lineNumber: 2135,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                "data-orchids-id": "src/visual-edits/VisualEditsMessenger.tsx:2144:14",
                                "data-orchids-name": "div",
                                className: "fixed w-2 h-2 bg-[#38bdf8] rounded-full cursor-e-resize pointer-events-auto resize-handle",
                                style: {
                                    zIndex: 100002,
                                    left: focusBox.left + focusBox.width - 4,
                                    top: focusBox.top + focusBox.height / 2 - 4
                                },
                                onMouseDown: (e)=>handleResizeStart(e, "e")
                            }, void 0, false, {
                                fileName: "[project]/src/visual-edits/VisualEditsMessenger.tsx",
                                lineNumber: 2144,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true)
                ]
            }, void 0, true)
        ]
    }, void 0, true);
}
}),
"[project]/src/components/ErrorReporter.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ErrorReporter
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
function ErrorReporter({ error, reset }) {
    /* ─ instrumentation shared by every route ─ */ const lastOverlayMsg = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])("");
    const pollRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const inIframe = window.parent !== window;
        if (!inIframe) return;
        const send = (payload)=>window.parent.postMessage(payload, "*");
        const onError = (e)=>send({
                type: "ERROR_CAPTURED",
                error: {
                    message: e.message,
                    stack: e.error?.stack,
                    filename: e.filename,
                    lineno: e.lineno,
                    colno: e.colno,
                    source: "window.onerror"
                },
                timestamp: Date.now()
            });
        const onReject = (e)=>send({
                type: "ERROR_CAPTURED",
                error: {
                    message: e.reason?.message ?? String(e.reason),
                    stack: e.reason?.stack,
                    source: "unhandledrejection"
                },
                timestamp: Date.now()
            });
        const pollOverlay = ()=>{
            const overlay = document.querySelector("[data-nextjs-dialog-overlay]");
            const node = overlay?.querySelector("h1, h2, .error-message, [data-nextjs-dialog-body]") ?? null;
            const txt = node?.textContent ?? node?.innerHTML ?? "";
            if (txt && txt !== lastOverlayMsg.current) {
                lastOverlayMsg.current = txt;
                send({
                    type: "ERROR_CAPTURED",
                    error: {
                        message: txt,
                        source: "nextjs-dev-overlay"
                    },
                    timestamp: Date.now()
                });
            }
        };
        window.addEventListener("error", onError);
        window.addEventListener("unhandledrejection", onReject);
        pollRef.current = setInterval(pollOverlay, 1000);
        return ()=>{
            window.removeEventListener("error", onError);
            window.removeEventListener("unhandledrejection", onReject);
            pollRef.current && clearInterval(pollRef.current);
        };
    }, []);
    /* ─ extra postMessage when on the global-error route ─ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!error) return;
        window.parent.postMessage({
            type: "global-error-reset",
            error: {
                message: error.message,
                stack: error.stack,
                digest: error.digest,
                name: error.name
            },
            timestamp: Date.now(),
            userAgent: navigator.userAgent
        }, "*");
    }, [
        error
    ]);
    /* ─ ordinary pages render nothing ─ */ if (!error) return null;
    /* ─ global-error UI ─ */ return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("html", {
        "data-orchids-id": "src/components/ErrorReporter.tsx:99:4",
        "data-orchids-name": "html",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("body", {
            "data-orchids-id": "src/components/ErrorReporter.tsx:100:6",
            "data-orchids-name": "body",
            className: "min-h-screen bg-background text-foreground flex items-center justify-center p-4",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                "data-orchids-id": "src/components/ErrorReporter.tsx:101:8",
                "data-orchids-name": "div",
                className: "max-w-md w-full text-center space-y-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        "data-orchids-id": "src/components/ErrorReporter.tsx:102:10",
                        "data-orchids-name": "div",
                        className: "space-y-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                "data-orchids-id": "src/components/ErrorReporter.tsx:103:12",
                                "data-orchids-name": "h1",
                                className: "text-2xl font-bold text-destructive",
                                children: "Something went wrong!"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ErrorReporter.tsx",
                                lineNumber: 103,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                "data-orchids-id": "src/components/ErrorReporter.tsx:106:12",
                                "data-orchids-name": "p",
                                className: "text-muted-foreground",
                                children: "An unexpected error occurred. Please try again fixing with Orchids"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ErrorReporter.tsx",
                                lineNumber: 106,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ErrorReporter.tsx",
                        lineNumber: 102,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        "data-orchids-id": "src/components/ErrorReporter.tsx:110:10",
                        "data-orchids-name": "div",
                        className: "space-y-2",
                        children: ("TURBOPACK compile-time value", "development") === "development" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("details", {
                            "data-orchids-id": "src/components/ErrorReporter.tsx:112:14",
                            "data-orchids-name": "details",
                            className: "mt-4 text-left",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("summary", {
                                    "data-orchids-id": "src/components/ErrorReporter.tsx:113:16",
                                    "data-orchids-name": "summary",
                                    className: "cursor-pointer text-sm text-muted-foreground hover:text-foreground",
                                    children: "Error details"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ErrorReporter.tsx",
                                    lineNumber: 113,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("pre", {
                                    "data-orchids-id": "src/components/ErrorReporter.tsx:116:16",
                                    "data-orchids-name": "pre",
                                    className: "mt-2 text-xs bg-muted p-2 rounded overflow-auto",
                                    children: [
                                        error.message,
                                        error.stack && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            "data-orchids-id": "src/components/ErrorReporter.tsx:119:20",
                                            "data-orchids-name": "div",
                                            className: "mt-2 text-muted-foreground",
                                            children: error.stack
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/ErrorReporter.tsx",
                                            lineNumber: 119,
                                            columnNumber: 21
                                        }, this),
                                        error.digest && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            "data-orchids-id": "src/components/ErrorReporter.tsx:124:20",
                                            "data-orchids-name": "div",
                                            className: "mt-2 text-muted-foreground",
                                            children: [
                                                "Digest: ",
                                                error.digest
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/ErrorReporter.tsx",
                                            lineNumber: 124,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/ErrorReporter.tsx",
                                    lineNumber: 116,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/ErrorReporter.tsx",
                            lineNumber: 112,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/ErrorReporter.tsx",
                        lineNumber: 110,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ErrorReporter.tsx",
                lineNumber: 101,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/ErrorReporter.tsx",
            lineNumber: 100,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/ErrorReporter.tsx",
        lineNumber: 99,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/mobile-news-events-bar.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
"use client";
;
const MobileNewsEventsBar = ({ onClick })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-orchids-id": "src/components/mobile-news-events-bar.tsx:9:4",
        "data-orchids-name": "div",
        className: "fixed bottom-0 left-0 right-0 z-40 md:hidden",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            "data-orchids-id": "src/components/mobile-news-events-bar.tsx:10:6",
            "data-orchids-name": "button",
            onClick: onClick,
            className: "w-full bg-secondary hover:bg-secondary/90 transition-colors",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                "data-orchids-id": "src/components/mobile-news-events-bar.tsx:14:8",
                "data-orchids-name": "div",
                className: "flex items-center justify-center h-12 px-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    "data-orchids-id": "src/components/mobile-news-events-bar.tsx:15:10",
                    "data-orchids-name": "span",
                    className: "font-display font-bold text-primary text-sm tracking-[2px] uppercase",
                    children: "NEWS & EVENTS"
                }, void 0, false, {
                    fileName: "[project]/src/components/mobile-news-events-bar.tsx",
                    lineNumber: 15,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/components/mobile-news-events-bar.tsx",
                lineNumber: 14,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/src/components/mobile-news-events-bar.tsx",
            lineNumber: 10,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/components/mobile-news-events-bar.tsx",
        lineNumber: 9,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const __TURBOPACK__default__export__ = MobileNewsEventsBar;
}),
"[project]/src/components/sections/news-events-sidebar.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-ssr] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/play.js [app-ssr] (ecmascript) <export default as Play>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/calendar.js [app-ssr] (ecmascript) <export default as Calendar>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/map-pin.js [app-ssr] (ecmascript) <export default as MapPin>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/clock.js [app-ssr] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-right.js [app-ssr] (ecmascript) <export default as ArrowRight>");
"use client";
;
;
;
;
const newsItems = [
    {
        type: "news",
        title: "The Mysore International School Roots of No. 1 Recruit and UNC Commit James Holbrough '27",
        imageUrl: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/87859ba7-84c9-4d54-a99e-419b59339f88-Mysore International Schoolschool-org/assets/icons/James-1.jpg",
        excerpt: "James Holbrough's journey from Mysore International School to becoming the nation's top basketball recruit.",
        date: "March 15, 2024",
        link: "#",
        fullContent: "James Holbrough '27 has taken the basketball world by storm, rising to become the nation's No. 1 recruit and committing to the University of North Carolina. His journey began right here at Mysore International School School, where he developed not only his athletic prowess but also his character and academic foundation.\n\nUnder the guidance of our coaching staff, James honed his skills on the court while maintaining academic excellence. His dedication to both his sport and his studies exemplifies the Mysore International School spirit of pursuing excellence in all endeavors.\n\n\"Mysore International School gave me the tools to succeed both on and off the court,\" James shared. \"The support from coaches, teachers, and my fellow students made all the difference in my development as a player and a person.\"\n\nWe couldn't be prouder of James and look forward to watching his continued success at UNC and beyond. Go Bears!"
    },
    {
        type: "news",
        title: "Alumni Spotlight: John Harker '97",
        imageUrl: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/87859ba7-84c9-4d54-a99e-419b59339f88-Mysore International Schoolschool-org/assets/icons/JohnHarkerphoto1-2.jpg",
        excerpt: "Catching up with John Harker on his career journey and memories of life at Mysore International School.",
        date: "March 12, 2024",
        link: "#",
        fullContent: "John Harker '97 recently returned to campus to share his incredible career journey with current students. After graduating from Mysore International School, John went on to pursue environmental science at Yale University and has since become a leading voice in sustainable business practices.\n\nDuring his visit, John reflected on how his time at Mysore International School shaped his path. \"The Advanced Environmental Science Research program opened my eyes to the intersection of science and stewardship,\" he recalled. \"Those lessons stayed with me throughout my career.\"\n\nJohn now serves as the Chief Sustainability Officer at a Fortune 500 company, where he leads initiatives that have reduced carbon emissions by 40% over the past five years.\n\nHis message to current students: \"Take advantage of every opportunity Mysore International School offers. The connections you make and the skills you develop here will serve you well throughout your life.\""
    },
    {
        type: "news",
        title: "Dr. Wysocki Brings Mindfulness To The Mountain",
        imageUrl: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/87859ba7-84c9-4d54-a99e-419b59339f88-Mysore International Schoolschool-org/assets/icons/Wysockitrainingtoom-3.jpg",
        excerpt: "New mindfulness program launched to support student wellness and mental health.",
        date: "March 10, 2024",
        link: "#",
        fullContent: "Mysore International School School is thrilled to announce the launch of a comprehensive mindfulness program led by Dr. Sarah Wysocki. This initiative represents our ongoing commitment to supporting the holistic well-being of our students.\n\nThe program includes daily meditation sessions, stress management workshops, and integration of mindfulness practices into the academic curriculum. Students have already reported positive impacts on their focus, sleep quality, and overall sense of well-being.\n\n\"In today's fast-paced world, teaching our students to pause, breathe, and center themselves is more important than ever,\" Dr. Wysocki explained. \"These skills will serve them well beyond their time at Mysore International School.\"\n\nThe mindfulness center, located in the newly renovated wellness wing, offers a peaceful retreat space where students can practice meditation and participate in group sessions.\n\nParents interested in learning more about the program are encouraged to attend our upcoming information session during Parents' Weekend."
    }
];
const eventsItems = [
    {
        type: "events",
        title: "Spring Arts Showcase",
        imageUrl: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/87859ba7-84c9-4d54-a99e-419b59339f88-Mysore International Schoolschool-org/assets/icons/Bear-10.jpg",
        excerpt: "Join us for an evening celebrating student creativity across all artistic disciplines.",
        date: "April 20, 2024",
        time: "7:00 PM",
        location: "Allen Theater",
        link: "#",
        fullContent: "The Spring Arts Showcase is Mysore International School's premier celebration of student creativity and artistic achievement. This year's event promises to be our most spectacular yet, featuring performances and exhibitions from all areas of our arts program.\n\nHighlights include:\n• Student theater productions\n• Orchestra and choir performances\n• Visual arts exhibition in the gallery\n• Dance ensemble performances\n• Film screenings from our media arts students\n\nThe evening will begin with a reception in the arts center lobby at 6:00 PM, where you can view student artwork and enjoy light refreshments before the main performances begin at 7:00 PM.\n\nTickets are complimentary for all Mysore International School community members. Please RSVP by April 15th to ensure seating availability.\n\nWe look forward to celebrating our talented student artists with you!"
    },
    {
        type: "events",
        title: "Admitted Students Day",
        imageUrl: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/87859ba7-84c9-4d54-a99e-419b59339f88-Mysore International Schoolschool-org/assets/icons/AHRHomepage-12.jpg",
        excerpt: "Experience a day in the life of a Mysore International School student with campus tours and activities.",
        date: "April 5, 2024",
        time: "9:00 AM - 3:00 PM",
        location: "Campus Wide",
        link: "#",
        fullContent: "Congratulations on your admission to Mysore International School School! We invite you and your family to join us for Admitted Students Day, an immersive experience designed to help you envision your future at Mysore International School.\n\nSchedule:\n9:00 AM - Check-in and Continental Breakfast\n9:30 AM - Welcome Address from Head of School\n10:00 AM - Student-led Campus Tours\n11:30 AM - Academic Department Open Houses\n12:30 PM - Lunch with Current Students\n1:30 PM - Athletics and Arts Demonstrations\n2:30 PM - Closing Session and Q&A\n3:00 PM - Optional Dormitory Tours\n\nThis is your opportunity to:\n• Meet current students and faculty\n• Explore our 400-acre campus\n• Attend sample classes\n• Learn about our signature programs\n• Connect with other admitted families\n\nPlease register by April 1st. We can't wait to welcome you to the Mountain!"
    },
    {
        type: "events",
        title: "Mountain Day Celebration",
        imageUrl: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/87859ba7-84c9-4d54-a99e-419b59339f88-Mysore International Schoolschool-org/assets/icons/RKMP_2-17.jpg",
        excerpt: "Annual tradition of hiking, outdoor activities, and community building.",
        date: "May 15, 2024",
        time: "All Day",
        location: "Various Locations",
        link: "#",
        fullContent: "Mountain Day is one of Mysore International School's most treasured traditions—a surprise day when classes are cancelled and the entire community comes together for outdoor adventure and celebration.\n\nWhile the official date is kept secret until the morning of, we've provided a tentative date for planning purposes. When the bells ring and Mountain Day is announced, students and faculty will embark on an unforgettable day of activities.\n\nTypical Mountain Day activities include:\n• Group hikes to Mount Everett summit\n• Canoeing and kayaking on local lakes\n• Mountain biking on campus trails\n• Community picnic lunch\n• Traditional bonfire and s'mores\n• Student vs. Faculty volleyball tournament\n\nMountain Day embodies the Mysore International School spirit—our connection to nature, our sense of community, and our belief that learning extends far beyond the classroom.\n\nFor parents: If your student mentions \"Mountain Day might be coming soon,\" you'll know something special is in the air!"
    }
];
// Detail Modal Component
const DetailModal = ({ item, isOpen, onClose })=>{
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return ()=>{
            document.body.style.overflow = 'unset';
        };
    }, [
        isOpen
    ]);
    if (!item) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                "data-orchids-id": "src/components/sections/news-events-sidebar.tsx:130:6",
                "data-orchids-name": "div",
                className: `fixed inset-0 bg-black z-[60] transition-opacity duration-300 ${isOpen ? 'opacity-70' : 'opacity-0 pointer-events-none'}`,
                onClick: onClose,
                "aria-hidden": "true"
            }, void 0, false, {
                fileName: "[project]/src/components/sections/news-events-sidebar.tsx",
                lineNumber: 130,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                "data-orchids-id": "src/components/sections/news-events-sidebar.tsx:139:6",
                "data-orchids-name": "div",
                className: `fixed inset-0 z-[70] flex items-center justify-center p-4 transition-all duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`,
                onClick: onClose,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    "data-orchids-id": "src/components/sections/news-events-sidebar.tsx:145:8",
                    "data-orchids-name": "div",
                    className: `bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden transform transition-all duration-300 ${isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'}`,
                    onClick: (e)=>e.stopPropagation(),
                    role: "dialog",
                    "aria-modal": "true",
                    "aria-labelledby": "modal-title",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            "data-orchids-id": "src/components/sections/news-events-sidebar.tsx:155:10",
                            "data-orchids-name": "div",
                            className: "relative h-56 md:h-72 w-full",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    "data-orchids-id": "src/components/sections/news-events-sidebar.tsx:156:12",
                                    "data-orchids-name": "img",
                                    src: item.imageUrl,
                                    alt: item.title,
                                    fill: true,
                                    className: "object-cover"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/sections/news-events-sidebar.tsx",
                                    lineNumber: 156,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    "data-orchids-id": "src/components/sections/news-events-sidebar.tsx:162:12",
                                    "data-orchids-name": "div",
                                    className: "absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/sections/news-events-sidebar.tsx",
                                    lineNumber: 162,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    "data-orchids-id": "src/components/sections/news-events-sidebar.tsx:165:12",
                                    "data-orchids-name": "button",
                                    onClick: onClose,
                                    className: "absolute top-4 right-4 p-2 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all hover:scale-105",
                                    "aria-label": "Close modal",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                        "data-orchids-id": "src/components/sections/news-events-sidebar.tsx:170:14",
                                        "data-orchids-name": "X",
                                        className: "h-5 w-5 text-brand-primary-purple"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/sections/news-events-sidebar.tsx",
                                        lineNumber: 170,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/sections/news-events-sidebar.tsx",
                                    lineNumber: 165,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    "data-orchids-id": "src/components/sections/news-events-sidebar.tsx:174:12",
                                    "data-orchids-name": "div",
                                    className: "absolute top-4 left-4",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        "data-orchids-id": "src/components/sections/news-events-sidebar.tsx:175:14",
                                        "data-orchids-name": "span",
                                        className: `px-3 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase shadow-lg ${item.type === "news" ? "bg-brand-primary-purple text-white" : "bg-brand-accent-lime text-brand-primary-purple"}`,
                                        children: item.type === "news" ? "News" : "Event"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/sections/news-events-sidebar.tsx",
                                        lineNumber: 175,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/sections/news-events-sidebar.tsx",
                                    lineNumber: 174,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    "data-orchids-id": "src/components/sections/news-events-sidebar.tsx:185:12",
                                    "data-orchids-name": "div",
                                    className: "absolute bottom-0 left-0 right-0 p-6",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        "data-orchids-id": "src/components/sections/news-events-sidebar.tsx:186:14",
                                        "data-orchids-name": "h2",
                                        id: "modal-title",
                                        className: "font-display font-bold text-xl md:text-2xl text-white leading-tight drop-shadow-lg",
                                        children: item.title
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/sections/news-events-sidebar.tsx",
                                        lineNumber: 186,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/sections/news-events-sidebar.tsx",
                                    lineNumber: 185,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/sections/news-events-sidebar.tsx",
                            lineNumber: 155,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            "data-orchids-id": "src/components/sections/news-events-sidebar.tsx:196:10",
                            "data-orchids-name": "div",
                            className: "p-6 overflow-y-auto max-h-[calc(90vh-18rem)]",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    "data-orchids-id": "src/components/sections/news-events-sidebar.tsx:198:12",
                                    "data-orchids-name": "div",
                                    className: "flex flex-wrap gap-4 mb-6 pb-4 border-b border-brand-light-gray",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            "data-orchids-id": "src/components/sections/news-events-sidebar.tsx:199:14",
                                            "data-orchids-name": "div",
                                            className: "flex items-center gap-2 text-sm text-brand-medium-gray",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__["Calendar"], {
                                                    "data-orchids-id": "src/components/sections/news-events-sidebar.tsx:200:16",
                                                    "data-orchids-name": "Calendar",
                                                    className: "h-4 w-4 text-brand-primary-purple"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/sections/news-events-sidebar.tsx",
                                                    lineNumber: 200,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    "data-orchids-id": "src/components/sections/news-events-sidebar.tsx:201:16",
                                                    "data-orchids-name": "span",
                                                    children: item.date
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/sections/news-events-sidebar.tsx",
                                                    lineNumber: 201,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/sections/news-events-sidebar.tsx",
                                            lineNumber: 199,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        item.type === "events" && item.time && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            "data-orchids-id": "src/components/sections/news-events-sidebar.tsx:204:16",
                                            "data-orchids-name": "div",
                                            className: "flex items-center gap-2 text-sm text-brand-medium-gray",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                                                    "data-orchids-id": "src/components/sections/news-events-sidebar.tsx:205:18",
                                                    "data-orchids-name": "Clock",
                                                    className: "h-4 w-4 text-brand-primary-purple"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/sections/news-events-sidebar.tsx",
                                                    lineNumber: 205,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    "data-orchids-id": "src/components/sections/news-events-sidebar.tsx:206:18",
                                                    "data-orchids-name": "span",
                                                    children: item.time
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/sections/news-events-sidebar.tsx",
                                                    lineNumber: 206,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/sections/news-events-sidebar.tsx",
                                            lineNumber: 204,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        item.type === "events" && item.location && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            "data-orchids-id": "src/components/sections/news-events-sidebar.tsx:210:16",
                                            "data-orchids-name": "div",
                                            className: "flex items-center gap-2 text-sm text-brand-medium-gray",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"], {
                                                    "data-orchids-id": "src/components/sections/news-events-sidebar.tsx:211:18",
                                                    "data-orchids-name": "MapPin",
                                                    className: "h-4 w-4 text-brand-primary-purple"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/sections/news-events-sidebar.tsx",
                                                    lineNumber: 211,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    "data-orchids-id": "src/components/sections/news-events-sidebar.tsx:212:18",
                                                    "data-orchids-name": "span",
                                                    children: item.location
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/sections/news-events-sidebar.tsx",
                                                    lineNumber: 212,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/sections/news-events-sidebar.tsx",
                                            lineNumber: 210,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/sections/news-events-sidebar.tsx",
                                    lineNumber: 198,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    "data-orchids-id": "src/components/sections/news-events-sidebar.tsx:218:12",
                                    "data-orchids-name": "div",
                                    className: "prose prose-sm max-w-none",
                                    children: item.fullContent ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        "data-orchids-id": "src/components/sections/news-events-sidebar.tsx:220:16",
                                        "data-orchids-name": "div",
                                        className: "space-y-4",
                                        children: item.fullContent.split('\n\n').map((paragraph, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                "data-orchids-id": "src/components/sections/news-events-sidebar.tsx:222:20",
                                                "data-orchids-name": "p",
                                                className: "text-brand-dark-gray font-body leading-relaxed",
                                                children: paragraph.split('\n').map((line, lineIdx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        "data-orchids-id": "src/components/sections/news-events-sidebar.tsx:224:24",
                                                        "data-orchids-name": "span",
                                                        children: [
                                                            line,
                                                            lineIdx < paragraph.split('\n').length - 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {
                                                                "data-orchids-id": "src/components/sections/news-events-sidebar.tsx:226:73",
                                                                "data-orchids-name": "br"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/sections/news-events-sidebar.tsx",
                                                                lineNumber: 226,
                                                                columnNumber: 74
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, lineIdx, true, {
                                                        fileName: "[project]/src/components/sections/news-events-sidebar.tsx",
                                                        lineNumber: 224,
                                                        columnNumber: 25
                                                    }, ("TURBOPACK compile-time value", void 0)))
                                            }, idx, false, {
                                                fileName: "[project]/src/components/sections/news-events-sidebar.tsx",
                                                lineNumber: 222,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0)))
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/sections/news-events-sidebar.tsx",
                                        lineNumber: 220,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        "data-orchids-id": "src/components/sections/news-events-sidebar.tsx:233:16",
                                        "data-orchids-name": "p",
                                        className: "text-brand-dark-gray font-body leading-relaxed",
                                        children: item.excerpt
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/sections/news-events-sidebar.tsx",
                                        lineNumber: 233,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/sections/news-events-sidebar.tsx",
                                    lineNumber: 218,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    "data-orchids-id": "src/components/sections/news-events-sidebar.tsx:240:12",
                                    "data-orchids-name": "div",
                                    className: "mt-8 pt-4 border-t border-brand-light-gray",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        "data-orchids-id": "src/components/sections/news-events-sidebar.tsx:241:14",
                                        "data-orchids-name": "button",
                                        className: "w-full md:w-auto flex items-center justify-center gap-2 bg-brand-accent-lime hover:bg-[#B3C229] text-brand-primary-purple font-semibold py-3 px-6 rounded-full transition-all hover:shadow-lg hover:-translate-y-0.5",
                                        children: [
                                            item.type === "news" ? "Read Full Article" : "Register for Event",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                                                "data-orchids-id": "src/components/sections/news-events-sidebar.tsx:245:16",
                                                "data-orchids-name": "ArrowRight",
                                                className: "h-4 w-4"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/sections/news-events-sidebar.tsx",
                                                lineNumber: 245,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/sections/news-events-sidebar.tsx",
                                        lineNumber: 241,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/sections/news-events-sidebar.tsx",
                                    lineNumber: 240,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/sections/news-events-sidebar.tsx",
                            lineNumber: 196,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/sections/news-events-sidebar.tsx",
                    lineNumber: 145,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/components/sections/news-events-sidebar.tsx",
                lineNumber: 139,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true);
};
const FeaturedVideo = ()=>{
    const [isPlaying, setIsPlaying] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const videoRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const handlePlay = ()=>{
        if (videoRef.current) {
            setIsPlaying(true);
            videoRef.current.play().catch((error)=>{
                console.error("Video play failed:", error);
                setIsPlaying(false);
            });
        }
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const videoElement = videoRef.current;
        if (videoElement) {
            const handleVideoEnd = ()=>setIsPlaying(false);
            videoElement.addEventListener('ended', handleVideoEnd);
            return ()=>{
                videoElement.removeEventListener('ended', handleVideoEnd);
            };
        }
    }, []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-orchids-id": "src/components/sections/news-events-sidebar.tsx:281:4",
        "data-orchids-name": "div",
        className: "mb-8",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                "data-orchids-id": "src/components/sections/news-events-sidebar.tsx:282:6",
                "data-orchids-name": "div",
                className: "mb-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        "data-orchids-id": "src/components/sections/news-events-sidebar.tsx:283:8",
                        "data-orchids-name": "h3",
                        className: "font-display text-xl font-semibold text-brand-primary-purple mb-2",
                        children: "Featured Video"
                    }, void 0, false, {
                        fileName: "[project]/src/components/sections/news-events-sidebar.tsx",
                        lineNumber: 283,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        "data-orchids-id": "src/components/sections/news-events-sidebar.tsx:286:8",
                        "data-orchids-name": "p",
                        className: "text-sm text-brand-medium-gray font-body leading-relaxed",
                        children: "Mornings with Mr. Mulder"
                    }, void 0, false, {
                        fileName: "[project]/src/components/sections/news-events-sidebar.tsx",
                        lineNumber: 286,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/sections/news-events-sidebar.tsx",
                lineNumber: 282,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                "data-orchids-id": "src/components/sections/news-events-sidebar.tsx:290:6",
                "data-orchids-name": "div",
                className: "relative aspect-video w-full overflow-hidden rounded-lg shadow-md",
                children: [
                    !isPlaying && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                "data-orchids-id": "src/components/sections/news-events-sidebar.tsx:293:12",
                                "data-orchids-name": "img",
                                src: "https://resources.finalsite.net/images/f_auto,q_auto,t_image_size_5/v1758560946/Mysore International School/mnh4f799uabm8q8n4o7k/GoodMorningwithHOSPieterMulder-optimized.jpg",
                                alt: "Mornings with Mr. Mulder thumbnail",
                                fill: true,
                                className: "object-cover"
                            }, void 0, false, {
                                fileName: "[project]/src/components/sections/news-events-sidebar.tsx",
                                lineNumber: 293,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                "data-orchids-id": "src/components/sections/news-events-sidebar.tsx:299:12@handlePlay",
                                "data-orchids-name": "button",
                                onClick: handlePlay,
                                "aria-label": "Play video: Mornings with Mr. Mulder",
                                className: "absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 z-10 group hover:bg-opacity-50 transition-all",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    "data-orchids-id": "src/components/sections/news-events-sidebar.tsx:304:14",
                                    "data-orchids-name": "div",
                                    className: "bg-brand-accent-lime p-4 rounded-full transition-transform group-hover:scale-110 shadow-lg",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__["Play"], {
                                        "data-orchids-id": "src/components/sections/news-events-sidebar.tsx:305:16",
                                        "data-orchids-name": "Play",
                                        className: "h-6 w-6 text-brand-primary-purple fill-brand-primary-purple"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/sections/news-events-sidebar.tsx",
                                        lineNumber: 305,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/sections/news-events-sidebar.tsx",
                                    lineNumber: 304,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/src/components/sections/news-events-sidebar.tsx",
                                lineNumber: 299,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("video", {
                        "data-orchids-id": "src/components/sections/news-events-sidebar.tsx:310:8@videoRef",
                        "data-orchids-name": "video",
                        ref: videoRef,
                        className: `w-full h-full object-cover transition-opacity duration-300 ${isPlaying ? 'opacity-100' : 'opacity-0 absolute pointer-events-none'}`,
                        controls: isPlaying,
                        preload: "metadata",
                        playsInline: true,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("source", {
                                "data-orchids-id": "src/components/sections/news-events-sidebar.tsx:317:10",
                                "data-orchids-name": "source",
                                src: "https://resources.finalsite.net/videos/t_video_mp4_1080/v1758560625/Mysore International School/cfydvcawjqkuuem9wbk4/GoodMorningwithHOSPieterMulder-optimized.mp4",
                                type: "video/mp4"
                            }, void 0, false, {
                                fileName: "[project]/src/components/sections/news-events-sidebar.tsx",
                                lineNumber: 317,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            "Your browser does not support the video tag."
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/sections/news-events-sidebar.tsx",
                        lineNumber: 310,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/sections/news-events-sidebar.tsx",
                lineNumber: 290,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/sections/news-events-sidebar.tsx",
        lineNumber: 281,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const NewsEventsSidebar = ({ isOpen, onClose })=>{
    const [activeFilter, setActiveFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("all");
    const [selectedItem, setSelectedItem] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isModalOpen, setIsModalOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const filteredItems = [
        ...newsItems,
        ...eventsItems
    ].filter((item)=>{
        if (activeFilter === "all") return true;
        return item.type === activeFilter;
    });
    const handleItemClick = (item)=>{
        setSelectedItem(item);
        setIsModalOpen(true);
    };
    const handleCloseModal = ()=>{
        setIsModalOpen(false);
        setTimeout(()=>setSelectedItem(null), 300);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                "data-orchids-id": "src/components/sections/news-events-sidebar.tsx:348:6",
                "data-orchids-name": "div",
                className: `fixed inset-0 bg-black z-40 transition-opacity duration-300 ${isOpen ? 'opacity-50' : 'opacity-0 pointer-events-none'}`,
                onClick: onClose,
                "aria-hidden": "true"
            }, void 0, false, {
                fileName: "[project]/src/components/sections/news-events-sidebar.tsx",
                lineNumber: 348,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                "data-orchids-id": "src/components/sections/news-events-sidebar.tsx:355:6",
                "data-orchids-name": "aside",
                className: `fixed top-0 right-0 h-full w-full bg-white z-50 shadow-2xl transition-transform duration-300 ease-out ${isOpen ? "translate-x-0" : "translate-x-full"}`,
                "aria-label": "News & Events",
                role: "dialog",
                "aria-modal": "true",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    "data-orchids-id": "src/components/sections/news-events-sidebar.tsx:361:8",
                    "data-orchids-name": "div",
                    className: "h-full flex flex-col",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            "data-orchids-id": "src/components/sections/news-events-sidebar.tsx:363:10",
                            "data-orchids-name": "div",
                            className: "bg-brand-primary-purple px-6 py-6 flex-shrink-0",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    "data-orchids-id": "src/components/sections/news-events-sidebar.tsx:364:12",
                                    "data-orchids-name": "div",
                                    className: "flex items-start justify-between mb-6",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            "data-orchids-id": "src/components/sections/news-events-sidebar.tsx:365:14",
                                            "data-orchids-name": "div",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                    "data-orchids-id": "src/components/sections/news-events-sidebar.tsx:366:16",
                                                    "data-orchids-name": "h2",
                                                    className: "font-display font-bold text-2xl md:text-3xl text-white mb-2",
                                                    children: "News & Events"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/sections/news-events-sidebar.tsx",
                                                    lineNumber: 366,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    "data-orchids-id": "src/components/sections/news-events-sidebar.tsx:369:16",
                                                    "data-orchids-name": "p",
                                                    className: "text-brand-off-white text-sm font-body",
                                                    children: "Stay connected with the Mysore International School community"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/sections/news-events-sidebar.tsx",
                                                    lineNumber: 369,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/sections/news-events-sidebar.tsx",
                                            lineNumber: 365,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            "data-orchids-id": "src/components/sections/news-events-sidebar.tsx:373:14",
                                            "data-orchids-name": "button",
                                            onClick: onClose,
                                            "aria-label": "Close news & events",
                                            className: "text-white hover:text-brand-accent-lime transition-colors p-1 flex-shrink-0",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                                "data-orchids-id": "src/components/sections/news-events-sidebar.tsx:378:16",
                                                "data-orchids-name": "X",
                                                size: 28
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/sections/news-events-sidebar.tsx",
                                                lineNumber: 378,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/sections/news-events-sidebar.tsx",
                                            lineNumber: 373,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/sections/news-events-sidebar.tsx",
                                    lineNumber: 364,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    "data-orchids-id": "src/components/sections/news-events-sidebar.tsx:383:12",
                                    "data-orchids-name": "div",
                                    className: "flex gap-2 flex-wrap",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            "data-orchids-id": "src/components/sections/news-events-sidebar.tsx:384:14",
                                            "data-orchids-name": "button",
                                            onClick: ()=>setActiveFilter("all"),
                                            className: `px-4 py-2 rounded-full font-body font-semibold text-sm transition-all ${activeFilter === "all" ? "bg-brand-accent-lime text-white shadow-md" : "bg-white bg-opacity-20 text-primary hover:bg-opacity-30"}`,
                                            children: "All"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/sections/news-events-sidebar.tsx",
                                            lineNumber: 384,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            "data-orchids-id": "src/components/sections/news-events-sidebar.tsx:394:14",
                                            "data-orchids-name": "button",
                                            onClick: ()=>setActiveFilter("news"),
                                            className: `px-4 py-2 rounded-full font-body font-semibold text-sm transition-all ${activeFilter === "news" ? "bg-brand-accent-lime text-white shadow-md" : "bg-white bg-opacity-20 text-primary hover:bg-opacity-30"}`,
                                            children: "News"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/sections/news-events-sidebar.tsx",
                                            lineNumber: 394,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            "data-orchids-id": "src/components/sections/news-events-sidebar.tsx:404:14",
                                            "data-orchids-name": "button",
                                            onClick: ()=>setActiveFilter("events"),
                                            className: `px-4 py-2 rounded-full font-body font-semibold text-sm transition-all ${activeFilter === "events" ? "bg-brand-accent-lime text-white shadow-md" : "bg-white bg-opacity-20 text-primary hover:bg-opacity-30"}`,
                                            children: "Events"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/sections/news-events-sidebar.tsx",
                                            lineNumber: 404,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/sections/news-events-sidebar.tsx",
                                    lineNumber: 383,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/sections/news-events-sidebar.tsx",
                            lineNumber: 363,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            "data-orchids-id": "src/components/sections/news-events-sidebar.tsx:418:10",
                            "data-orchids-name": "div",
                            className: "flex-1 overflow-y-auto",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                "data-orchids-id": "src/components/sections/news-events-sidebar.tsx:419:12",
                                "data-orchids-name": "div",
                                className: "px-6 py-8",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(FeaturedVideo, {
                                        "data-orchids-id": "src/components/sections/news-events-sidebar.tsx:421:14",
                                        "data-orchids-name": "FeaturedVideo"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/sections/news-events-sidebar.tsx",
                                        lineNumber: 421,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        "data-orchids-id": "src/components/sections/news-events-sidebar.tsx:424:14",
                                        "data-orchids-name": "div",
                                        className: "border-t border-brand-light-gray my-8"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/sections/news-events-sidebar.tsx",
                                        lineNumber: 424,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        "data-orchids-id": "src/components/sections/news-events-sidebar.tsx:427:14",
                                        "data-orchids-name": "div",
                                        className: "space-y-6",
                                        children: filteredItems.map((item, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                                                "data-map-index": index,
                                                "data-orchids-id": "src/components/sections/news-events-sidebar.tsx:429:18@filteredItems",
                                                "data-orchids-name": "article",
                                                className: "group cursor-pointer",
                                                onClick: ()=>handleItemClick(item),
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        "data-map-index": index,
                                                        "data-orchids-id": "src/components/sections/news-events-sidebar.tsx:434:20@filteredItems",
                                                        "data-orchids-name": "div",
                                                        className: "block",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            "data-map-index": index,
                                                            "data-orchids-id": "src/components/sections/news-events-sidebar.tsx:435:22@filteredItems",
                                                            "data-orchids-name": "div",
                                                            className: "flex gap-4",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    "data-map-index": index,
                                                                    "data-orchids-id": "src/components/sections/news-events-sidebar.tsx:437:24@filteredItems",
                                                                    "data-orchids-name": "div",
                                                                    className: "relative w-32 h-24 flex-shrink-0 rounded-lg overflow-hidden shadow-sm",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                                            "data-map-index": index,
                                                                            "data-orchids-id": "src/components/sections/news-events-sidebar.tsx:438:26@filteredItems",
                                                                            "data-orchids-name": "img",
                                                                            src: item.imageUrl,
                                                                            alt: item.title,
                                                                            fill: true,
                                                                            className: "object-cover transition-transform duration-300 group-hover:scale-105"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/sections/news-events-sidebar.tsx",
                                                                            lineNumber: 438,
                                                                            columnNumber: 27
                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            "data-map-index": index,
                                                                            "data-orchids-id": "src/components/sections/news-events-sidebar.tsx:444:26@filteredItems",
                                                                            "data-orchids-name": "div",
                                                                            className: "absolute top-2 left-2",
                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                "data-map-index": index,
                                                                                "data-orchids-id": "src/components/sections/news-events-sidebar.tsx:445:28@filteredItems",
                                                                                "data-orchids-name": "span",
                                                                                className: `px-2 py-1 rounded text-xs font-bold tracking-wider uppercase ${item.type === "news" ? "bg-brand-primary-purple text-white" : "bg-brand-accent-lime text-brand-primary-purple"}`,
                                                                                children: item.type
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/components/sections/news-events-sidebar.tsx",
                                                                                lineNumber: 445,
                                                                                columnNumber: 29
                                                                            }, ("TURBOPACK compile-time value", void 0))
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/sections/news-events-sidebar.tsx",
                                                                            lineNumber: 444,
                                                                            columnNumber: 27
                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/sections/news-events-sidebar.tsx",
                                                                    lineNumber: 437,
                                                                    columnNumber: 25
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    "data-map-index": index,
                                                                    "data-orchids-id": "src/components/sections/news-events-sidebar.tsx:456:24@filteredItems",
                                                                    "data-orchids-name": "div",
                                                                    className: "flex-1 min-w-0",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                                            "data-map-index": index,
                                                                            "data-orchids-id": "src/components/sections/news-events-sidebar.tsx:457:26@filteredItems",
                                                                            "data-orchids-name": "h3",
                                                                            className: "font-display font-semibold text-base leading-tight text-brand-primary-purple mb-2 group-hover:text-brand-accent-lime transition-colors line-clamp-2",
                                                                            children: item.title
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/sections/news-events-sidebar.tsx",
                                                                            lineNumber: 457,
                                                                            columnNumber: 27
                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            "data-map-index": index,
                                                                            "data-orchids-id": "src/components/sections/news-events-sidebar.tsx:460:26@filteredItems",
                                                                            "data-orchids-name": "div",
                                                                            className: "flex flex-col gap-1 text-xs text-brand-medium-gray font-body",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    "data-map-index": index,
                                                                                    "data-orchids-id": "src/components/sections/news-events-sidebar.tsx:461:28@filteredItems",
                                                                                    "data-orchids-name": "div",
                                                                                    className: "flex items-center gap-1.5",
                                                                                    children: [
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__["Calendar"], {
                                                                                            "data-map-index": index,
                                                                                            "data-orchids-id": "src/components/sections/news-events-sidebar.tsx:462:30@filteredItems",
                                                                                            "data-orchids-name": "Calendar",
                                                                                            className: "h-3 w-3"
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/src/components/sections/news-events-sidebar.tsx",
                                                                                            lineNumber: 462,
                                                                                            columnNumber: 31
                                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                            "data-map-index": index,
                                                                                            "data-orchids-id": "src/components/sections/news-events-sidebar.tsx:463:30@filteredItems",
                                                                                            "data-orchids-name": "span",
                                                                                            children: item.date
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/src/components/sections/news-events-sidebar.tsx",
                                                                                            lineNumber: 463,
                                                                                            columnNumber: 31
                                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/src/components/sections/news-events-sidebar.tsx",
                                                                                    lineNumber: 461,
                                                                                    columnNumber: 29
                                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                                item.type === "events" && item.time && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    "data-orchids-id": "src/components/sections/news-events-sidebar.tsx:466:30",
                                                                                    "data-orchids-name": "div",
                                                                                    className: "flex items-center gap-1.5",
                                                                                    children: [
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                                                                                            "data-orchids-id": "src/components/sections/news-events-sidebar.tsx:467:32",
                                                                                            "data-orchids-name": "Clock",
                                                                                            className: "h-3 w-3"
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/src/components/sections/news-events-sidebar.tsx",
                                                                                            lineNumber: 467,
                                                                                            columnNumber: 33
                                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                            "data-orchids-id": "src/components/sections/news-events-sidebar.tsx:468:32",
                                                                                            "data-orchids-name": "span",
                                                                                            children: item.time
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/src/components/sections/news-events-sidebar.tsx",
                                                                                            lineNumber: 468,
                                                                                            columnNumber: 33
                                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/src/components/sections/news-events-sidebar.tsx",
                                                                                    lineNumber: 466,
                                                                                    columnNumber: 31
                                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                                item.type === "events" && item.location && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    "data-orchids-id": "src/components/sections/news-events-sidebar.tsx:472:30",
                                                                                    "data-orchids-name": "div",
                                                                                    className: "flex items-center gap-1.5",
                                                                                    children: [
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"], {
                                                                                            "data-orchids-id": "src/components/sections/news-events-sidebar.tsx:473:32",
                                                                                            "data-orchids-name": "MapPin",
                                                                                            className: "h-3 w-3"
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/src/components/sections/news-events-sidebar.tsx",
                                                                                            lineNumber: 473,
                                                                                            columnNumber: 33
                                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                            "data-orchids-id": "src/components/sections/news-events-sidebar.tsx:474:32",
                                                                                            "data-orchids-name": "span",
                                                                                            className: "truncate",
                                                                                            children: item.location
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/src/components/sections/news-events-sidebar.tsx",
                                                                                            lineNumber: 474,
                                                                                            columnNumber: 33
                                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/src/components/sections/news-events-sidebar.tsx",
                                                                                    lineNumber: 472,
                                                                                    columnNumber: 31
                                                                                }, ("TURBOPACK compile-time value", void 0))
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/src/components/sections/news-events-sidebar.tsx",
                                                                            lineNumber: 460,
                                                                            columnNumber: 27
                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/sections/news-events-sidebar.tsx",
                                                                    lineNumber: 456,
                                                                    columnNumber: 25
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/sections/news-events-sidebar.tsx",
                                                            lineNumber: 435,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/sections/news-events-sidebar.tsx",
                                                        lineNumber: 434,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    index < filteredItems.length - 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        "data-map-index": index,
                                                        "data-orchids-id": "src/components/sections/news-events-sidebar.tsx:482:22@filteredItems",
                                                        "data-orchids-name": "div",
                                                        className: "border-t border-brand-light-gray mt-6"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/sections/news-events-sidebar.tsx",
                                                        lineNumber: 482,
                                                        columnNumber: 23
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, index, true, {
                                                fileName: "[project]/src/components/sections/news-events-sidebar.tsx",
                                                lineNumber: 429,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)))
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/sections/news-events-sidebar.tsx",
                                        lineNumber: 427,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    filteredItems.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        "data-orchids-id": "src/components/sections/news-events-sidebar.tsx:490:16",
                                        "data-orchids-name": "div",
                                        className: "text-center py-12",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            "data-orchids-id": "src/components/sections/news-events-sidebar.tsx:491:18",
                                            "data-orchids-name": "p",
                                            className: "text-brand-medium-gray font-body text-sm",
                                            children: [
                                                "No ",
                                                activeFilter === "all" ? "items" : activeFilter,
                                                " to display."
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/sections/news-events-sidebar.tsx",
                                            lineNumber: 491,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/sections/news-events-sidebar.tsx",
                                        lineNumber: 490,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/sections/news-events-sidebar.tsx",
                                lineNumber: 419,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/src/components/sections/news-events-sidebar.tsx",
                            lineNumber: 418,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/sections/news-events-sidebar.tsx",
                    lineNumber: 361,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/components/sections/news-events-sidebar.tsx",
                lineNumber: 355,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(DetailModal, {
                "data-orchids-id": "src/components/sections/news-events-sidebar.tsx:502:6@handleCloseModal",
                "data-orchids-name": "DetailModal",
                item: selectedItem,
                isOpen: isModalOpen,
                onClose: handleCloseModal
            }, void 0, false, {
                fileName: "[project]/src/components/sections/news-events-sidebar.tsx",
                lineNumber: 502,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true);
};
const __TURBOPACK__default__export__ = NewsEventsSidebar;
}),
"[project]/src/components/mobile-news-events-wrapper.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$mobile$2d$news$2d$events$2d$bar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/mobile-news-events-bar.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$sections$2f$news$2d$events$2d$sidebar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/sections/news-events-sidebar.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
const MobileNewsEventsWrapper = ()=>{
    const [isSidebarOpen, setIsSidebarOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$mobile$2d$news$2d$events$2d$bar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                "data-orchids-id": "src/components/mobile-news-events-wrapper.tsx:12:6",
                "data-orchids-name": "MobileNewsEventsBar",
                onClick: ()=>setIsSidebarOpen(true)
            }, void 0, false, {
                fileName: "[project]/src/components/mobile-news-events-wrapper.tsx",
                lineNumber: 12,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$sections$2f$news$2d$events$2d$sidebar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                "data-orchids-id": "src/components/mobile-news-events-wrapper.tsx:13:6",
                "data-orchids-name": "NewsEventsSidebar",
                isOpen: isSidebarOpen,
                onClose: ()=>setIsSidebarOpen(false)
            }, void 0, false, {
                fileName: "[project]/src/components/mobile-news-events-wrapper.tsx",
                lineNumber: 13,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true);
};
const __TURBOPACK__default__export__ = MobileNewsEventsWrapper;
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[project]/src/components/NewsEventsTab.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>NewsEventsTab
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$sections$2f$news$2d$events$2d$sidebar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/sections/news-events-sidebar.tsx [app-ssr] (ecmascript)");
'use client';
;
;
;
;
function NewsEventsTab() {
    const [isSidebarOpen, setIsSidebarOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePathname"])();
    // Don't show on admin pages
    if (pathname?.startsWith('/admin')) {
        return null;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                "data-orchids-id": "src/components/NewsEventsTab.tsx:19:6",
                "data-orchids-name": "button",
                onClick: ()=>setIsSidebarOpen(true),
                className: "hidden md:block fixed top-1/2 right-0 -translate-y-1/2 z-30 bg-[#D1A3FF] hover:bg-[#C0A2FF] text-[#580B57] font-display font-semibold text-sm tracking-[0.1em] py-4 px-3 transition-all duration-300 hover:px-4 shadow-lg",
                style: {
                    writingMode: 'vertical-rl',
                    textOrientation: 'mixed'
                },
                "aria-label": "Open News & Events",
                children: "NEWS & EVENTS"
            }, void 0, false, {
                fileName: "[project]/src/components/NewsEventsTab.tsx",
                lineNumber: 19,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$sections$2f$news$2d$events$2d$sidebar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                "data-orchids-id": "src/components/NewsEventsTab.tsx:29:6",
                "data-orchids-name": "NewsEventsSidebar",
                isOpen: isSidebarOpen,
                onClose: ()=>setIsSidebarOpen(false)
            }, void 0, false, {
                fileName: "[project]/src/components/NewsEventsTab.tsx",
                lineNumber: 29,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/dynamic-access-async-storage.external.js [external] (next/dist/server/app-render/dynamic-access-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/dynamic-access-async-storage.external.js", () => require("next/dist/server/app-render/dynamic-access-async-storage.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__05f95597._.js.map