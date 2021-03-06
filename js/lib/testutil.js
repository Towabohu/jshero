if (typeof jshero === "undefined") {
  var jshero = {};
}

/**
 * Contains frequently used test cases.
 */
jshero.testutil = (function (i18n) {

  'use strict';

  /** ------------- copied and adpated from escape-html/index.js
   *  BEGIN ------------- */

  /*!
   * escape-html
   * Copyright(c) 2012-2013 TJ Holowaychuk
   * Copyright(c) 2015 Andreas Lubbe
   * Copyright(c) 2015 Tiancheng "Timothy" Gu
   * MIT Licensed
   */

  var matchHtmlRegExp = /["'&<>]/;

  /**
   * Escape special characters in the given string of html.
   *
   * @param  {string} string The string to escape for inserting into HTML
   * @return {string}
   * @public
   */

  function escapeHtml(string) {
    var str = '' + string;
    var match = matchHtmlRegExp.exec(str);

    if (!match) {
      return str;
    }

    var escape;
    var html = '';
    var index = 0;
    var lastIndex = 0;

    for (index = match.index; index < str.length; index++) {
      switch (str.charCodeAt(index)) {
        case 34: // "
          escape = '&quot;';
          break;
        case 38: // &
          escape = '&amp;';
          break;
        case 39: // '
          escape = '&#39;';
          break;
        case 60: // <
          escape = '&lt;';
          break;
        case 62: // >
          escape = '&gt;';
          break;
        default:
          continue;
      }

      if (lastIndex !== index) {
        html += str.substring(lastIndex, index);
      }

      lastIndex = index + 1;
      html += escape;
    }

    return lastIndex !== index
      ? html + str.substring(lastIndex, index)
      : html;
  }

  /** ------------- copied and adpated from escape-html/index.js
   *  END ------------- */


  /**
   * Example usage:
   *
   * jshero.testutil.assert_isFunction('a')
   *
   * We expect a function named "a".
   */
  var assert_isFunction = function (f_name) {
    var ok = typeof eval(f_name) === 'function';
    var msg;
    if (ok) {
      msg = '<code>' + f_name + '</code> ' + i18n.get("isAFunction") + ".";
    } else {
      msg = '<code>' + f_name + '</code> ' + i18n.get("isNotAFunction") + ".";
    }
    return {
      ok: ok,
      msg: msg
    };
  };

  /**
   * We expect that calling a function
   * with the call f_call (e.g. 'f()' or 'f("Hallo")')
   * returns the value expectedReturnValue.
   * @param {function} f_call
   * @param {object} expectedReturnValue
   */
  var assert_functionReturns = function (f_call, expectedReturnValue) {
    var ok, msg, e;
    try {
      var result = eval(f_call);
      ok = result === expectedReturnValue;
      if (ok) {
        msg = jshero.util.formatMessage(i18n.get("functionReturns"), [f_call, JSON.stringify(expectedReturnValue) ]);
      } else {
        msg = jshero.util.formatMessage(i18n.get("functionNotReturns"), [f_call, JSON.stringify(expectedReturnValue), escapeHtml(JSON.stringify(result)) ]);
      }
    } catch (exc) {
      ok = false;
      msg = i18n.get("errorAtCallOf") + ' <code>' + f_call + '</code>.';
      e = exc;
    }
    return {
      ok: ok,
      msg: msg,
      e: e
    };
  };

  /**
   * Bei der Variable v müssen wir noch mitgeben wie sie heißt (name)
   */
  var assert_variableDefined = function (v, name) {
    var ok = typeof v !== 'undefined';
    var msg;
    if (ok) {
      msg = jshero.util.formatMessage(i18n.get("varHasValue"), [name]);
    } else {
      msg = jshero.util.formatMessage(i18n.get("varHasNoValue"), [name]);
    }
    return {
      ok: ok,
      msg: msg
    };
  };

  /**
   * Prüfen, ob eine Variable einen Wert hat
   */
  var assert_variableHasValue = function (v, name, expValue) {
    var ok = v === expValue;
    var msg;
    if (ok) {
      msg = jshero.util.formatMessage(i18n.get("varHasValueOf"), [name, escapeHtml(JSON.stringify(v))]);
    } else {
      msg = jshero.util.formatMessage(i18n.get("varHasWrongValue"), [name, JSON.stringify(expValue), escapeHtml(JSON.stringify(v))]);
    }
    return {
      ok: ok,
      msg: msg
    };
  };

  /**
   * Prüfen, ob die Function die geforderte ANzahl Parameter hat.
   *
   * @param {string} f_name Name der Funktion.
   * @param {int} numOfParam Anzahl der geforderten Parameter.
   */
  var assert_functionHasNumOfParameter = function (f_name, numOfParam) {
      var fun = eval(f_name);
      var ok = fun.length === numOfParam;
      var msg;
      if (ok) {
        msg = jshero.util.formatMessage(i18n.get("correctNumOfParam"), [f_name, numOfParam]);
      } else {
        msg = jshero.util.formatMessage(i18n.get("wrongNumOfParam"), [f_name, numOfParam, fun.length]);
      }
      return {
        ok: ok,
        msg: msg
      };
    };

  return {
    assert_isFunction: assert_isFunction,
    assert_functionReturns: assert_functionReturns,
    assert_functionHasNumOfParameter: assert_functionHasNumOfParameter,
    assert_variableDefined: assert_variableDefined,
    assert_variableHasValue: assert_variableHasValue,
    assert_de_functionReturns: assert_functionReturns,
    assert_en_functionReturns: assert_functionReturns,
    assert_de_variableDefined: assert_variableDefined,
    assert_en_variableDefined: assert_variableDefined,
    assert_de_variableHasValue: assert_variableHasValue,
    assert_en_variableHasValue: assert_variableHasValue,
    assert_de_functionHasNumOfParameter: assert_functionHasNumOfParameter,
    assert_en_functionHasNumOfParameter: assert_functionHasNumOfParameter
  };

})(jshero.i18n);
