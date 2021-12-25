/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/worker-dom/dist/index.mjs":
/*!************************************************!*\
  !*** ./node_modules/worker-dom/dist/index.mjs ***!
  \************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"upgradeElement\": () => (/* binding */ upgradeElement)\n/* harmony export */ });\n/**\n * Copyright 2018 The AMP HTML Authors. All Rights Reserved.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS-IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\nlet count = 0;\nconst STRINGS = new Map();\n/**\n * Return a string for the specified index.\n * @param index string index to retrieve.\n * @returns string in map for the index.\n */\n\nfunction getString(index) {\n  return STRINGS.get(index) || '';\n}\n/**\n * Stores a string for parsing from mutation\n * @param value string to store from background thread.\n */\n\nfunction storeString(value) {\n  STRINGS.set(++count, value);\n}\n\n/**\n * Copyright 2018 The AMP HTML Authors. All Rights Reserved.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS-IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\nlet NODES;\nlet BASE_ELEMENT;\nfunction prepare(baseElement) {\n  NODES = new Map([[1, baseElement], [2, baseElement]]);\n  BASE_ELEMENT = baseElement;\n}\nfunction isTextNode(node) {\n  return ('nodeType' in node ? node.nodeType : node[0\n  /* nodeType */\n  ]) === 3\n  /* TEXT_NODE */\n  ;\n}\n/**\n * Create a real DOM Node from a skeleton Object (`{ nodeType, nodeName, attributes, children, data }`)\n * @example <caption>Text node</caption>\n *   createNode({ nodeType:3, data:'foo' })\n * @example <caption>Element node</caption>\n *   createNode({ nodeType:1, nodeName:'div', attributes:[{ name:'a', value:'b' }], childNodes:[ ... ] })\n */\n\nfunction createNode(skeleton) {\n  if (isTextNode(skeleton)) {\n    const node = document.createTextNode(getString(skeleton[5\n    /* textContent */\n    ]));\n    storeNode(node, skeleton[7\n    /* _index_ */\n    ]);\n    return node;\n  }\n\n  const namespace = skeleton[6\n  /* namespaceURI */\n  ] !== undefined ? getString(skeleton[6\n  /* namespaceURI */\n  ]) : undefined;\n  const node = namespace ? document.createElementNS(namespace, getString(skeleton[1\n  /* nodeName */\n  ])) : document.createElement(getString(skeleton[1\n  /* nodeName */\n  ])); // TODO(KB): Restore Properties\n  // skeleton.properties.forEach(property => {\n  //   node[`${property.name}`] = property.value;\n  // });\n  // ((skeleton as TransferrableElement)[TransferrableKeys.childNodes] || []).forEach(childNode => {\n  //   if (childNode[TransferrableKeys.transferred] === NumericBoolean.FALSE) {\n  //     node.appendChild(createNode(childNode as TransferrableNode));\n  //   }\n  // });\n\n  storeNode(node, skeleton[7\n  /* _index_ */\n  ]);\n  return node;\n}\n/**\n * Returns the real DOM Element corresponding to a serialized Element object.\n * @param id\n * @return\n */\n\nfunction getNode(id) {\n  const node = NODES.get(id);\n\n  if (node && node.nodeName === 'BODY') {\n    // If the node requested is the \"BODY\"\n    // Then we return the base node this specific <amp-script> comes from.\n    // This encapsulates each <amp-script> node.\n    return BASE_ELEMENT;\n  }\n\n  return node;\n}\n/**\n * Establish link between DOM `node` and worker-generated identifier `id`.\n *\n * These _shouldn't_ collide between instances of <amp-script> since\n * each element creates it's own pool on both sides of the worker\n * communication bridge.\n * @param node\n * @param id\n */\n\nfunction storeNode(node, id) {\n  node._index_ = id;\n  NODES.set(id, node);\n}\n\n/**\n * Copyright 2018 The AMP HTML Authors. All Rights Reserved.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS-IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n// TODO(KB): Fetch Polyfill for IE11.\nfunction createWorker(workerDomURL, authorScriptURL) {\n  return Promise.all([fetch(workerDomURL).then(response => response.text()), fetch(authorScriptURL).then(response => response.text())]).then(([workerScript, authorScript]) => {\n    // TODO(KB): Minify this output during build process.\n    const keys = [];\n\n    for (let key in document.body.style) {\n      keys.push(`'${key}'`);\n    }\n\n    const code = `\n        'use strict';\n        ${workerScript}\n        (function() {\n          var self = this;\n          var window = this;\n          var document = this.document;\n          var localStorage = this.localStorage;\n          var location = this.location;\n          var defaultView = document.defaultView;\n          var Node = defaultView.Node;\n          var Text = defaultView.Text;\n          var Element = defaultView.Element;\n          var SVGElement = defaultView.SVGElement;\n          var Document = defaultView.Document;\n          var Event = defaultView.Event;\n          var MutationObserver = defaultView.MutationObserver;\n\n          function addEventListener(type, handler) {\n            return document.addEventListener(type, handler);\n          }\n          function removeEventListener(type, handler) {\n            return document.removeEventListener(type, handler);\n          }\n          this.appendKeys([${keys}]);\n          ${authorScript}\n        }).call(WorkerThread.workerDOM);\n//# sourceURL=${encodeURI(authorScriptURL)}`;\n    return new Worker(URL.createObjectURL(new Blob([code])));\n  }).catch(error => {\n    return null;\n  });\n}\nfunction messageToWorker(worker, message) {\n  worker.postMessage(message);\n}\n\n/**\n * Copyright 2018 The AMP HTML Authors. All Rights Reserved.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS-IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\nconst KNOWN_LISTENERS = [];\n/**\n * Instead of a whitelist of elements that need their value tracked, use the existence\n * of a property called value to drive the decision.\n * @param node node to check if values should be tracked.\n * @return boolean if the node should have its value property tracked.\n */\n\nconst shouldTrackChanges = node => node && 'value' in node;\n/**\n * When a node that has a value needing synced doesn't already have an event listener\n * listening for changed values, ensure the value is synced with a default listener.\n * @param worker whom to dispatch value toward.\n * @param node node to listen to value changes on.\n */\n\n\nconst applyDefaultChangeListener = (worker, node) => {\n  shouldTrackChanges(node) && node.onchange === null && (node.onchange = () => fireValueChange(worker, node));\n};\n/**\n * Tell the worker DOM what the value is for a Node.\n * @param worker whom to dispatch value toward.\n * @param node where to get the value from.\n */\n\nconst fireValueChange = (worker, node) => {\n  messageToWorker(worker, {\n    [9\n    /* type */\n    ]: 5\n    /* SYNC */\n    ,\n    [38\n    /* sync */\n    ]: {\n      [7\n      /* _index_ */\n      ]: node._index_,\n      [18\n      /* value */\n      ]: node.value\n    }\n  });\n};\n/**\n * Register an event handler for dispatching events to worker thread\n * @param worker whom to dispatch events toward\n * @param _index_ node index the event comes from (used to dispatchEvent in worker thread).\n * @return eventHandler function consuming event and dispatching to worker thread\n */\n\n\nconst eventHandler = (worker, _index_) => event => {\n  if (shouldTrackChanges(event.currentTarget)) {\n    fireValueChange(worker, event.currentTarget);\n  }\n\n  messageToWorker(worker, {\n    [9\n    /* type */\n    ]: 1\n    /* EVENT */\n    ,\n    [37\n    /* event */\n    ]: {\n      [7\n      /* _index_ */\n      ]: _index_,\n      [22\n      /* bubbles */\n      ]: event.bubbles,\n      [23\n      /* cancelable */\n      ]: event.cancelable,\n      [24\n      /* cancelBubble */\n      ]: event.cancelBubble,\n      [25\n      /* currentTarget */\n      ]: {\n        [7\n        /* _index_ */\n        ]: event.currentTarget._index_,\n        [8\n        /* transferred */\n        ]: 1\n        /* TRUE */\n\n      },\n      [26\n      /* defaultPrevented */\n      ]: event.defaultPrevented,\n      [27\n      /* eventPhase */\n      ]: event.eventPhase,\n      [28\n      /* isTrusted */\n      ]: event.isTrusted,\n      [29\n      /* returnValue */\n      ]: event.returnValue,\n      [10\n      /* target */\n      ]: {\n        [7\n        /* _index_ */\n        ]: event.target._index_,\n        [8\n        /* transferred */\n        ]: 1\n        /* TRUE */\n\n      },\n      [30\n      /* timeStamp */\n      ]: event.timeStamp,\n      [9\n      /* type */\n      ]: event.type,\n      [32\n      /* keyCode */\n      ]: 'keyCode' in event ? event.keyCode : undefined\n    }\n  });\n};\n/**\n * Process commands transfered from worker thread to main thread.\n * @param nodesInstance nodes instance to execute commands against.\n * @param worker whom to dispatch events toward.\n * @param mutation mutation record containing commands to execute.\n */\n\n\nfunction process(worker, mutation) {\n  const _index_ = mutation[10\n  /* target */\n  ];\n  const target = getNode(_index_);\n  (mutation[21\n  /* removedEvents */\n  ] || []).forEach(eventSub => {\n    processListenerChange(worker, target, false, getString(eventSub[9\n    /* type */\n    ]), eventSub[33\n    /* index */\n    ]);\n  });\n  (mutation[20\n  /* addedEvents */\n  ] || []).forEach(eventSub => {\n    processListenerChange(worker, target, true, getString(eventSub[9\n    /* type */\n    ]), eventSub[33\n    /* index */\n    ]);\n  });\n}\n/**\n * If the worker requests to add an event listener to 'change' for something the foreground thread is already listening to\n * ensure that only a single 'change' event is attached to prevent sending values multiple times.\n * @param worker worker issuing listener changes\n * @param target node to change listeners on\n * @param addEvent is this an 'addEvent' or 'removeEvent' change\n * @param type event type requested to change\n * @param index number in the listeners array this event corresponds to.\n */\n\nfunction processListenerChange(worker, target, addEvent, type, index) {\n  let changeEventSubscribed = target.onchange !== null;\n  const shouldTrack = shouldTrackChanges(target);\n  const isChangeEvent = type === 'change';\n\n  if (addEvent) {\n    if (isChangeEvent) {\n      changeEventSubscribed = true;\n      target.onchange = null;\n    }\n\n    target.addEventListener(type, KNOWN_LISTENERS[index] = eventHandler(worker, target._index_));\n  } else {\n    if (isChangeEvent) {\n      changeEventSubscribed = false;\n    }\n\n    target.removeEventListener(type, KNOWN_LISTENERS[index]);\n  }\n\n  if (shouldTrack && !changeEventSubscribed) {\n    applyDefaultChangeListener(worker, target);\n  }\n}\n\n/**\n * Copyright 2018 The AMP HTML Authors. All Rights Reserved.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS-IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n\nfunction allTextNodes(nodes) {\n  return nodes.length > 0 && [].every.call(nodes, isTextNode);\n}\n/**\n * Replace all the children with the ones from the HydrateableNode.\n * Used when we're certain the content won't break the page.\n * @param nodes HydrateableNodes containing content to potentially overwrite main thread content.\n * @param parent Node in the main thread that will be the parent of the passed nodes.\n * @param worker worker that issued the request for hydration.\n */\n\n\nfunction replaceNodes(nodes, parent, worker) {\n  [].forEach.call(parent.childNodes, childNode => childNode.remove());\n  nodes.forEach((node, index) => {\n    const newNode = createNode(node);\n    (node[2\n    /* attributes */\n    ] || []).forEach(attribute => {\n      const namespaceURI = getString(attribute[0]);\n\n      if (namespaceURI !== 'null') {\n        newNode.setAttributeNS(namespaceURI, getString(attribute[1]), getString(attribute[2]));\n      } else {\n        newNode.setAttribute(getString(attribute[1]), getString(attribute[2]));\n      }\n    });\n    parent.appendChild(newNode);\n    applyDefaultChangeListener(worker, newNode);\n    replaceNodes(node[4\n    /* childNodes */\n    ] || [], parent.childNodes[index], worker);\n  });\n}\n/**\n * Hydrate a single node and it's children safely.\n * Attempt to ensure content is a rough match so content doesn't shift between the document representation\n * and client side generated content.\n * @param transferNode root of the background thread content (document.body from worker-thread).\n * @param node root for the foreground thread content (element upgraded to background driven).\n * @param worker worker that issued the request for hydration.\n */\n\n\nfunction hydrateNode(transferNode, node, worker) {\n  const transferIsText = isTextNode(transferNode);\n  const nodeIsText = isTextNode(node);\n\n  if (!transferIsText && !nodeIsText) {\n    const childNodes = transferNode[4\n    /* childNodes */\n    ] || [];\n\n    if (childNodes.length !== node.childNodes.length) {\n      // If this parent node has an unequal number of childNodes, we need to ensure its for an allowable reason.\n      if (allTextNodes(childNodes) && allTextNodes(node.childNodes)) {\n        // Offset due to a differing number of text nodes.\n        // replace the current DOM with the text nodes from the hydration.\n        replaceNodes(childNodes, node, worker);\n      } else {\n        const filteredTransfer = childNodes.filter(childNode => !isTextNode(childNode));\n        const filteredNodes = [].filter.call(node.childNodes, childNode => !isTextNode(childNode)); // Empty text nodes are used by frameworks as placeholders for future dom content.\n\n        if (filteredTransfer.length === filteredNodes.length) {\n          storeNode(node, transferNode[7\n          /* _index_ */\n          ]);\n          replaceNodes(childNodes, node, worker);\n        }\n      }\n    } else {\n      storeNode(node, transferNode[7\n      /* _index_ */\n      ]);\n      applyDefaultChangeListener(worker, node); // Same number of children, hydrate them.\n\n      childNodes.forEach((childNode, index) => hydrateNode(childNode, node.childNodes[index], worker));\n    }\n  } else if (transferIsText && nodeIsText) {\n    // Singular text node, no children.\n    storeNode(node, transferNode[7\n    /* _index_ */\n    ]);\n    node.textContent = getString(transferNode[5\n    /* textContent */\n    ]);\n    applyDefaultChangeListener(worker, node);\n  }\n}\n/**\n * Hydrate a root from the worker thread by comparing with the main thread representation.\n * @param skeleton root of the background thread content.\n * @param addEvents events needing subscription from the background thread content.\n * @param baseElement root of the main thread content to compare against.\n * @param worker worker issuing the upgrade request.\n */\n\n\nfunction hydrate(skeleton, stringValues, addEvents, baseElement, worker) {\n  // Process String Additions\n  stringValues.forEach(value => storeString(value)); // Process Node Addition / Removal\n\n  hydrateNode(skeleton, baseElement, worker); // Process Event Addition\n\n  addEvents.forEach(event => {\n    const node = getNode(event[7\n    /* _index_ */\n    ]);\n    node && processListenerChange(worker, node, true, getString(event[9\n    /* type */\n    ]), event[33\n    /* index */\n    ]);\n  });\n}\n\n/**\n * Copyright 2018 The AMP HTML Authors. All Rights Reserved.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS-IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\nlet MUTATION_QUEUE = [];\nlet PENDING_MUTATIONS = false;\nlet worker;\nfunction prepareMutate(passedWorker) {\n  worker = passedWorker;\n}\nconst mutators = {\n  [2\n  /* CHILD_LIST */\n  ](mutation, target, sanitizer) {\n    (mutation[12\n    /* removedNodes */\n    ] || []).forEach(node => getNode(node[7\n    /* _index_ */\n    ]).remove());\n    const addedNodes = mutation[11\n    /* addedNodes */\n    ];\n    const nextSibling = mutation[14\n    /* nextSibling */\n    ];\n\n    if (addedNodes) {\n      addedNodes.forEach(node => {\n        let newChild = getNode(node[7\n        /* _index_ */\n        ]);\n\n        if (!newChild) {\n          newChild = createNode(node);\n\n          if (sanitizer) {\n            sanitizer.sanitize(newChild); // TODO(choumx): Inform worker?\n          }\n        }\n\n        target.insertBefore(newChild, nextSibling && getNode(nextSibling[7\n        /* _index_ */\n        ]) || null);\n      });\n    }\n  },\n\n  [0\n  /* ATTRIBUTES */\n  ](mutation, target, sanitizer) {\n    const attributeName = mutation[15\n    /* attributeName */\n    ] !== undefined ? getString(mutation[15\n    /* attributeName */\n    ]) : null;\n    const value = mutation[18\n    /* value */\n    ] !== undefined ? getString(mutation[18\n    /* value */\n    ]) : null;\n\n    if (attributeName != null && value != null) {\n      if (!sanitizer || sanitizer.validAttribute(target.nodeName, attributeName, value)) {\n        target.setAttribute(attributeName, value);\n      }\n    }\n  },\n\n  [1\n  /* CHARACTER_DATA */\n  ](mutation, target) {\n    const value = mutation[18\n    /* value */\n    ];\n\n    if (value) {\n      // Sanitization not necessary for textContent.\n      target.textContent = getString(value);\n    }\n  },\n\n  [3\n  /* PROPERTIES */\n  ](mutation, target, sanitizer) {\n    const propertyName = mutation[17\n    /* propertyName */\n    ] !== undefined ? getString(mutation[17\n    /* propertyName */\n    ]) : null;\n    const value = mutation[18\n    /* value */\n    ] !== undefined ? getString(mutation[18\n    /* value */\n    ]) : null;\n\n    if (propertyName && value) {\n      if (!sanitizer || sanitizer.validProperty(target.nodeName, propertyName, value)) {\n        target[propertyName] = value;\n      }\n    }\n  },\n\n  [4\n  /* COMMAND */\n  ](mutation) {\n    process(worker, mutation);\n  }\n\n};\n/**\n * Process MutationRecords from worker thread applying changes to the existing DOM.\n * @param nodes New nodes to add in the main thread with the incoming mutations.\n * @param mutations Changes to apply in both graph shape and content of Elements.\n * @param sanitizer Sanitizer to apply to content if needed.\n */\n\nfunction mutate(nodes, stringValues, mutations, sanitizer) {\n  //mutations: TransferrableMutationRecord[]): void {\n  // TODO(KB): Restore signature requiring lastMutationTime. (lastGestureTime: number, mutations: TransferrableMutationRecord[])\n  // if (performance.now() || Date.now() - lastGestureTime > GESTURE_TO_MUTATION_THRESHOLD) {\n  //   return;\n  // }\n  // this.lastGestureTime = lastGestureTime;\n  stringValues.forEach(value => storeString(value));\n  nodes.forEach(node => createNode(node));\n  MUTATION_QUEUE = MUTATION_QUEUE.concat(mutations);\n\n  if (!PENDING_MUTATIONS) {\n    PENDING_MUTATIONS = true;\n    requestAnimationFrame(() => syncFlush(sanitizer));\n  }\n}\n/**\n * Apply all stored mutations syncronously. This method works well, but can cause jank if there are too many\n * mutations to apply in a single frame.\n *\n * Investigations in using asyncFlush to resolve are worth considering.\n */\n\nfunction syncFlush(sanitizer) {\n  MUTATION_QUEUE.forEach(mutation => {\n    mutators[mutation[9\n    /* type */\n    ]](mutation, getNode(mutation[10\n    /* target */\n    ]), sanitizer);\n  });\n  MUTATION_QUEUE = [];\n  PENDING_MUTATIONS = false;\n}\n\n/**\n * Copyright 2018 The AMP HTML Authors. All Rights Reserved.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS-IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\nfunction install(baseElement, workerDOMUrl, sanitizer) {\n  const authorURL = baseElement.getAttribute('src');\n\n  if (authorURL === null) {\n    return;\n  }\n\n  createWorker(workerDOMUrl, authorURL).then(worker => {\n    if (worker === null) {\n      return;\n    }\n\n    prepare(baseElement);\n    prepareMutate(worker);\n\n    worker.onmessage = ({\n      data\n    }) => {\n      switch (data[9\n      /* type */\n      ]) {\n        case 2\n        /* HYDRATE */\n        :\n          // console.info(`hydration from worker: ${data.type}`, data);\n          hydrate(data[35\n          /* nodes */\n          ], data[39\n          /* strings */\n          ], data[20\n          /* addedEvents */\n          ], baseElement, worker);\n          break;\n\n        case 3\n        /* MUTATE */\n        :\n          // console.info(`mutation from worker: ${data.type}`, data);\n          mutate(data[35\n          /* nodes */\n          ], data[39\n          /* strings */\n          ], data[34\n          /* mutations */\n          ], sanitizer);\n          break;\n      }\n    };\n  });\n}\n\n/**\n * Copyright 2018 The AMP HTML Authors. All Rights Reserved.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS-IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\nfunction upgradeElement(baseElement, workerDOMUrl) {\n  install(baseElement, workerDOMUrl);\n}\n\n\n//# sourceMappingURL=index.mjs.map\n\n\n//# sourceURL=webpack://worker-dom-mfe/./node_modules/worker-dom/dist/index.mjs?");

/***/ }),

/***/ "./src/index.mjs":
/*!***********************!*\
  !*** ./src/index.mjs ***!
  \***********************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var worker_dom_dist_index_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! worker-dom/dist/index.mjs */ \"./node_modules/worker-dom/dist/index.mjs\");\n\r\nmodule.exports = worker_dom_dist_index_mjs__WEBPACK_IMPORTED_MODULE_0__.upgradeElement;\n\n//# sourceURL=webpack://worker-dom-mfe/./src/index.mjs?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.mjs");
/******/ 	
/******/ })()
;