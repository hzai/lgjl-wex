
'use strict';

var _ = require('lodash');
var log = require('./logger').getLogger();

var _lib = {
    /**
     * 存储localStorage
     */
    setStore: function(name, content) {
        if (!name) return null
        if (typeof content !== 'string') {
            content = JSON.stringify(content)
        }
        localStorage.setItem(name, content)
    },

    /**
     * 获取localStorage
     */
    getStore: function(name){
        if (!name) return null
        return localStorage.getItem(name)
    },

    /**
     * 删除localStorage
     */
    removeStore:function(name){
        if (!name) return null
        localStorage.removeItem(name)
    },
    /**
     * 清空localStroage
     */
    clearStore:function() {
        localStorage.clear()
    }

};
module.exports = _lib;