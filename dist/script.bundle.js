/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/script.js":
/*!***********************!*\
  !*** ./src/script.js ***!
  \***********************/
/***/ (() => {

eval("function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}const ANIMATION_DURATION = 300;\n\nconst SIDEBAR_EL = document.getElementById(\"sidebar\");\n\nconst SUB_MENU_ELS = document.querySelectorAll(\n\".menu > ul > .menu-item.sub-menu\");\n\n\nconst FIRST_SUB_MENUS_BTN = document.querySelectorAll(\n\".menu > ul > .menu-item.sub-menu > a\");\n\n\nconst INNER_SUB_MENUS_BTN = document.querySelectorAll(\n\".menu > ul > .menu-item.sub-menu .menu-item.sub-menu > a\");\n\n\nclass PopperObject {\n\n\n\n\n  constructor(reference, popperTarget) {_defineProperty(this, \"instance\", null);_defineProperty(this, \"reference\", null);_defineProperty(this, \"popperTarget\", null);\n    this.init(reference, popperTarget);\n  }\n\n  init(reference, popperTarget) {\n    this.reference = reference;\n    this.popperTarget = popperTarget;\n    this.instance = Popper.createPopper(this.reference, this.popperTarget, {\n      placement: \"right\",\n      strategy: \"fixed\",\n      resize: true,\n      modifiers: [\n      {\n        name: \"computeStyles\",\n        options: {\n          adaptive: false } },\n\n\n      {\n        name: \"flip\",\n        options: {\n          fallbackPlacements: [\"left\", \"right\"] } }] });\n\n\n\n\n\n    document.addEventListener(\n    \"click\",\n    e => this.clicker(e, this.popperTarget, this.reference),\n    false);\n\n\n    const ro = new ResizeObserver(() => {\n      this.instance.update();\n    });\n\n    ro.observe(this.popperTarget);\n    ro.observe(this.reference);\n  }\n\n  clicker(event, popperTarget, reference) {\n    if (\n    SIDEBAR_EL.classList.contains(\"collapsed\") &&\n    !popperTarget.contains(event.target) &&\n    !reference.contains(event.target))\n    {\n      this.hide();\n    }\n  }\n\n  hide() {\n    this.instance.state.elements.popper.style.visibility = \"hidden\";\n  }}\n\n\nclass Poppers {\n\n\n  constructor() {_defineProperty(this, \"subMenuPoppers\", []);\n    this.init();\n  }\n\n  init() {\n    SUB_MENU_ELS.forEach(element => {\n      this.subMenuPoppers.push(\n      new PopperObject(element, element.lastElementChild));\n\n      this.closePoppers();\n    });\n  }\n\n  togglePopper(target) {\n    if (window.getComputedStyle(target).visibility === \"hidden\")\n    target.style.visibility = \"visible\";else\n    target.style.visibility = \"hidden\";\n  }\n\n  updatePoppers() {\n    this.subMenuPoppers.forEach(element => {\n      element.instance.state.elements.popper.style.display = \"none\";\n      element.instance.update();\n    });\n  }\n\n  closePoppers() {\n    this.subMenuPoppers.forEach(element => {\n      element.hide();\n    });\n  }}\n\n\nconst slideUp = (target, duration = ANIMATION_DURATION) => {\n  const { parentElement } = target;\n  parentElement.classList.remove(\"open\");\n  target.style.transitionProperty = \"height, margin, padding\";\n  target.style.transitionDuration = `${duration}ms`;\n  target.style.boxSizing = \"border-box\";\n  target.style.height = `${target.offsetHeight}px`;\n  target.offsetHeight;\n  target.style.overflow = \"hidden\";\n  target.style.height = 0;\n  target.style.paddingTop = 0;\n  target.style.paddingBottom = 0;\n  target.style.marginTop = 0;\n  target.style.marginBottom = 0;\n  window.setTimeout(() => {\n    target.style.display = \"none\";\n    target.style.removeProperty(\"height\");\n    target.style.removeProperty(\"padding-top\");\n    target.style.removeProperty(\"padding-bottom\");\n    target.style.removeProperty(\"margin-top\");\n    target.style.removeProperty(\"margin-bottom\");\n    target.style.removeProperty(\"overflow\");\n    target.style.removeProperty(\"transition-duration\");\n    target.style.removeProperty(\"transition-property\");\n  }, duration);\n};\nconst slideDown = (target, duration = ANIMATION_DURATION) => {\n  const { parentElement } = target;\n  parentElement.classList.add(\"open\");\n  target.style.removeProperty(\"display\");\n  let { display } = window.getComputedStyle(target);\n  if (display === \"none\") display = \"block\";\n  target.style.display = display;\n  const height = target.offsetHeight;\n  target.style.overflow = \"hidden\";\n  target.style.height = 0;\n  target.style.paddingTop = 0;\n  target.style.paddingBottom = 0;\n  target.style.marginTop = 0;\n  target.style.marginBottom = 0;\n  target.offsetHeight;\n  target.style.boxSizing = \"border-box\";\n  target.style.transitionProperty = \"height, margin, padding\";\n  target.style.transitionDuration = `${duration}ms`;\n  target.style.height = `${height}px`;\n  target.style.removeProperty(\"padding-top\");\n  target.style.removeProperty(\"padding-bottom\");\n  target.style.removeProperty(\"margin-top\");\n  target.style.removeProperty(\"margin-bottom\");\n  window.setTimeout(() => {\n    target.style.removeProperty(\"height\");\n    target.style.removeProperty(\"overflow\");\n    target.style.removeProperty(\"transition-duration\");\n    target.style.removeProperty(\"transition-property\");\n  }, duration);\n};\n\nconst slideToggle = (target, duration = ANIMATION_DURATION) => {\n  if (window.getComputedStyle(target).display === \"none\")\n  return slideDown(target, duration);\n  return slideUp(target, duration);\n};\n\nconst PoppersInstance = new Poppers();\n\n/**\n * wait for the current animation to finish and update poppers position\n */\nconst updatePoppersTimeout = () => {\n  setTimeout(() => {\n    PoppersInstance.updatePoppers();\n  }, ANIMATION_DURATION);\n};\n\n/**\n * sidebar collapse handler\n */\ndocument.getElementById(\"btn-collapse\").addEventListener(\"click\", () => {\n  SIDEBAR_EL.classList.toggle(\"collapsed\");\n  PoppersInstance.closePoppers();\n  if (SIDEBAR_EL.classList.contains(\"collapsed\"))\n  FIRST_SUB_MENUS_BTN.forEach(element => {\n    element.parentElement.classList.remove(\"open\");\n  });\n\n  updatePoppersTimeout();\n});\n\n/**\n * sidebar toggle handler (on break point )\n */\ndocument.getElementById(\"btn-toggle\").addEventListener(\"click\", () => {\n  SIDEBAR_EL.classList.toggle(\"toggled\");\n\n  updatePoppersTimeout();\n});\n\n/**\n * toggle sidebar on overlay click\n */\ndocument.getElementById(\"overlay\").addEventListener(\"click\", () => {\n  SIDEBAR_EL.classList.toggle(\"toggled\");\n});\n\nconst defaultOpenMenus = document.querySelectorAll(\".menu-item.sub-menu.open\");\n\ndefaultOpenMenus.forEach(element => {\n  element.lastElementChild.style.display = \"block\";\n});\n\n/**\n * handle top level submenu click\n */\nFIRST_SUB_MENUS_BTN.forEach(element => {\n  element.addEventListener(\"click\", () => {\n    if (SIDEBAR_EL.classList.contains(\"collapsed\"))\n    PoppersInstance.togglePopper(element.nextElementSibling);else\n    {\n      const parentMenu = element.closest(\".menu.open-current-submenu\");\n      if (parentMenu)\n      parentMenu.\n      querySelectorAll(\":scope > ul > .menu-item.sub-menu > a\").\n      forEach(\n      (el) =>\n      window.getComputedStyle(el.nextElementSibling).display !==\n      \"none\" && slideUp(el.nextElementSibling));\n\n      slideToggle(element.nextElementSibling);\n    }\n  });\n});\n\n/**\n * handle inner submenu click\n */\nINNER_SUB_MENUS_BTN.forEach(element => {\n  element.addEventListener(\"click\", () => {\n    slideToggle(element.nextElementSibling);\n  });\n});\n\n//# sourceURL=webpack://reservas/./src/script.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/script.js"]();
/******/ 	
/******/ })()
;