module.exports = [
"[project]/src/app/admin-login/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AdminLoginPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client';
;
;
function AdminLoginPage() {
    const [formData, setFormData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        email: '',
        password: ''
    });
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const handleSubmit = async (e)=>{
        e.preventDefault();
        setIsLoading(true);
        // Add your login logic here
        console.log('Login attempt:', formData);
        // Simulate API call
        setTimeout(()=>{
            setIsLoading(false);
        }, 1500);
    };
    const handleChange = (e)=>{
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-orchids-id": "src/app/admin-login/page.tsx:33:4",
        "data-orchids-name": "div",
        className: "relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#580B57] via-[#6B0F6B] to-[#8B1A8A] p-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                "data-orchids-id": "src/app/admin-login/page.tsx:35:6",
                "data-orchids-name": "div",
                className: "absolute top-20 left-20 w-72 h-72 bg-accent/20 rounded-full blur-3xl"
            }, void 0, false, {
                fileName: "[project]/src/app/admin-login/page.tsx",
                lineNumber: 35,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                "data-orchids-id": "src/app/admin-login/page.tsx:36:6",
                "data-orchids-name": "div",
                className: "absolute bottom-20 right-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl"
            }, void 0, false, {
                fileName: "[project]/src/app/admin-login/page.tsx",
                lineNumber: 36,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                "data-orchids-id": "src/app/admin-login/page.tsx:37:6",
                "data-orchids-name": "div",
                className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 rounded-full blur-3xl"
            }, void 0, false, {
                fileName: "[project]/src/app/admin-login/page.tsx",
                lineNumber: 37,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                "data-orchids-id": "src/app/admin-login/page.tsx:40:6",
                "data-orchids-name": "div",
                className: "relative z-10 w-full max-w-md",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    "data-orchids-id": "src/app/admin-login/page.tsx:41:8",
                    "data-orchids-name": "div",
                    className: "backdrop-blur-2xl bg-white/10 border border-white/20 rounded-3xl p-10 md:p-12 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            "data-orchids-id": "src/app/admin-login/page.tsx:43:10",
                            "data-orchids-name": "div",
                            className: "text-center mb-10",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                    "data-orchids-id": "src/app/admin-login/page.tsx:44:12",
                                    "data-orchids-name": "h1",
                                    className: "font-display text-5xl font-bold text-white mb-3 tracking-tight",
                                    children: "ADMIN"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admin-login/page.tsx",
                                    lineNumber: 44,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    "data-orchids-id": "src/app/admin-login/page.tsx:47:12",
                                    "data-orchids-name": "div",
                                    className: "w-16 h-0.5 bg-white/30 mx-auto mb-4"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admin-login/page.tsx",
                                    lineNumber: 47,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    "data-orchids-id": "src/app/admin-login/page.tsx:48:12",
                                    "data-orchids-name": "p",
                                    className: "font-body text-sm text-white/70 uppercase tracking-widest",
                                    children: "Mysore International School"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admin-login/page.tsx",
                                    lineNumber: 48,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/admin-login/page.tsx",
                            lineNumber: 43,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                            "data-orchids-id": "src/app/admin-login/page.tsx:54:10@handleSubmit",
                            "data-orchids-name": "form",
                            onSubmit: handleSubmit,
                            className: "space-y-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    "data-orchids-id": "src/app/admin-login/page.tsx:56:12",
                                    "data-orchids-name": "div",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            "data-orchids-id": "src/app/admin-login/page.tsx:57:14",
                                            "data-orchids-name": "label",
                                            htmlFor: "email",
                                            className: "block font-body text-sm font-medium text-white/90 mb-2.5 ml-1",
                                            children: "Email Address"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/admin-login/page.tsx",
                                            lineNumber: 57,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            "data-orchids-id": "src/app/admin-login/page.tsx:63:14@handleChange",
                                            "data-orchids-name": "input",
                                            type: "email",
                                            id: "email",
                                            name: "email",
                                            value: formData.email,
                                            onChange: handleChange,
                                            required: true,
                                            className: "w-full px-5 py-3.5 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/40 backdrop-blur-xl focus:outline-none focus:bg-white/10 focus:border-white/40 transition-all duration-300",
                                            placeholder: "admin@mis.edu.in"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/admin-login/page.tsx",
                                            lineNumber: 63,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/admin-login/page.tsx",
                                    lineNumber: 56,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    "data-orchids-id": "src/app/admin-login/page.tsx:76:12",
                                    "data-orchids-name": "div",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            "data-orchids-id": "src/app/admin-login/page.tsx:77:14",
                                            "data-orchids-name": "label",
                                            htmlFor: "password",
                                            className: "block font-body text-sm font-medium text-white/90 mb-2.5 ml-1",
                                            children: "Password"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/admin-login/page.tsx",
                                            lineNumber: 77,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            "data-orchids-id": "src/app/admin-login/page.tsx:83:14@handleChange",
                                            "data-orchids-name": "input",
                                            type: "password",
                                            id: "password",
                                            name: "password",
                                            value: formData.password,
                                            onChange: handleChange,
                                            required: true,
                                            className: "w-full px-5 py-3.5 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/40 backdrop-blur-xl focus:outline-none focus:bg-white/10 focus:border-white/40 transition-all duration-300",
                                            placeholder: "••••••••"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/admin-login/page.tsx",
                                            lineNumber: 83,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/admin-login/page.tsx",
                                    lineNumber: 76,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    "data-orchids-id": "src/app/admin-login/page.tsx:96:12",
                                    "data-orchids-name": "button",
                                    type: "submit",
                                    disabled: isLoading,
                                    className: "w-full py-4 px-4 bg-white/90 text-primary font-body font-semibold rounded-xl hover:bg-white hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-transparent transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed mt-8",
                                    children: isLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        "data-orchids-id": "src/app/admin-login/page.tsx:102:16",
                                        "data-orchids-name": "span",
                                        className: "flex items-center justify-center",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                "data-orchids-id": "src/app/admin-login/page.tsx:103:18",
                                                "data-orchids-name": "svg",
                                                className: "animate-spin -ml-1 mr-3 h-5 w-5 text-primary",
                                                xmlns: "http://www.w3.org/2000/svg",
                                                fill: "none",
                                                viewBox: "0 0 24 24",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                                        "data-orchids-id": "src/app/admin-login/page.tsx:104:20",
                                                        "data-orchids-name": "circle",
                                                        className: "opacity-25",
                                                        cx: "12",
                                                        cy: "12",
                                                        r: "10",
                                                        stroke: "currentColor",
                                                        strokeWidth: "4"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/admin-login/page.tsx",
                                                        lineNumber: 104,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                        "data-orchids-id": "src/app/admin-login/page.tsx:105:20",
                                                        "data-orchids-name": "path",
                                                        className: "opacity-75",
                                                        fill: "currentColor",
                                                        d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/admin-login/page.tsx",
                                                        lineNumber: 105,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/admin-login/page.tsx",
                                                lineNumber: 103,
                                                columnNumber: 19
                                            }, this),
                                            "Signing in..."
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/admin-login/page.tsx",
                                        lineNumber: 102,
                                        columnNumber: 17
                                    }, this) : 'Sign In'
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admin-login/page.tsx",
                                    lineNumber: 96,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/admin-login/page.tsx",
                            lineNumber: 54,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            "data-orchids-id": "src/app/admin-login/page.tsx:116:10",
                            "data-orchids-name": "div",
                            className: "mt-8 pt-6 border-t border-white/10",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                "data-orchids-id": "src/app/admin-login/page.tsx:117:12",
                                "data-orchids-name": "p",
                                className: "text-center font-body text-xs text-white/60",
                                children: "Need help? Contact IT support"
                            }, void 0, false, {
                                fileName: "[project]/src/app/admin-login/page.tsx",
                                lineNumber: 117,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/admin-login/page.tsx",
                            lineNumber: 116,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/admin-login/page.tsx",
                    lineNumber: 41,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/admin-login/page.tsx",
                lineNumber: 40,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/admin-login/page.tsx",
        lineNumber: 33,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=src_app_admin-login_page_tsx_6065074f._.js.map