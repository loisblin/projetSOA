import { importShared } from './__federation_fn_import-tzVtmkwF.js';

var jsxRuntime = {exports: {}};

var reactJsxRuntime_production = {};

/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var hasRequiredReactJsxRuntime_production;

function requireReactJsxRuntime_production () {
	if (hasRequiredReactJsxRuntime_production) return reactJsxRuntime_production;
	hasRequiredReactJsxRuntime_production = 1;
	var REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"),
	  REACT_FRAGMENT_TYPE = Symbol.for("react.fragment");
	function jsxProd(type, config, maybeKey) {
	  var key = null;
	  undefined !== maybeKey && (key = "" + maybeKey);
	  undefined !== config.key && (key = "" + config.key);
	  if ("key" in config) {
	    maybeKey = {};
	    for (var propName in config)
	      "key" !== propName && (maybeKey[propName] = config[propName]);
	  } else maybeKey = config;
	  config = maybeKey.ref;
	  return {
	    $$typeof: REACT_ELEMENT_TYPE,
	    type: type,
	    key: key,
	    ref: undefined !== config ? config : null,
	    props: maybeKey
	  };
	}
	reactJsxRuntime_production.Fragment = REACT_FRAGMENT_TYPE;
	reactJsxRuntime_production.jsx = jsxProd;
	reactJsxRuntime_production.jsxs = jsxProd;
	return reactJsxRuntime_production;
}

var hasRequiredJsxRuntime;

function requireJsxRuntime () {
	if (hasRequiredJsxRuntime) return jsxRuntime.exports;
	hasRequiredJsxRuntime = 1;
	{
	  jsxRuntime.exports = requireReactJsxRuntime_production();
	}
	return jsxRuntime.exports;
}

var jsxRuntimeExports = requireJsxRuntime();

const React = await importShared('react');
const {useState,useEffect} = React;

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch("http://localhost:3001/orders").then((response) => response.json()).then((data) => {
      console.log("Commandes récupérées:", data);
      setOrders(data);
      setLoading(false);
    }).catch((error) => {
      console.error("Error fetching orders:", error);
      setLoading(false);
    });
  }, []);
  const handleInformationChange = (index, event) => {
    const newOrders = [...orders];
    const updatedOrder = { ...newOrders[index], information: event.target.value };
    newOrders[index] = updatedOrder;
    setOrders(newOrders);
  };
  const handleUpdateInformation = (id, information) => {
    console.log("id de la commande", id);
    fetch(`http://localhost:3001/orders/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        information
      })
    }).then((response) => response.json()).then((data) => {
      console.log("order update:", data);
    }).catch((error) => {
      console.error("Erroor update:", error);
    });
  };
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "loading order" });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "min-w-full border-collapse", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "border px-8 py-6 text-xl", children: "product" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "border px-8 py-6 text-xl", children: "quantity" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "border px-8 py-6 text-xl", children: "buyer" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "border px-8 py-6 text-xl", children: "Information to return" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: orders.map((order, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "tr",
      {
        className: index % 2 === 0 ? "bg-gray-100" : "bg-white",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "border px-8 py-6 text-xl", children: order.product }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "border px-8 py-6 text-xl", children: order.quantity }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "border px-8 py-6 text-xl", children: order.buyer }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "border px-8 py-6 text-xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "text",
                value: order.information || "",
                onChange: (event) => handleInformationChange(index, event),
                placeholder: "Modifier l'information",
                className: "border p-4 w-full text-xl"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: () => handleUpdateInformation(order._id, order.information),
                className: "px-6 py-4 bg-blue-500 text-white rounded text-xl",
                children: "Validate"
              }
            )
          ] }) })
        ]
      },
      order.id
    )) })
  ] }) });
};

export { Order as default, jsxRuntimeExports as j };
