'use strict';

var filter = require('../../lib/filter');
var utilLibrary = require('../../lib/utilLibrary');
var wechatApi = require('../../lib/wechat/wechat-api');
var ResponseError = require('../../errors/ResponseError');
var Logger = require('../../lib/logger');
var operatelogService = require('../../services/operatelogService');
var t_menu_data = require('../../models/menu_data');
var t_autoreply_conf = require('../../models/autoreply_conf');
var log = Logger.getLogger();

module.exports = function (router) {

    var fns = filter(['checkperm'], {
        perms: ['zdycd']
    });

    router.get('/', fns, function (req, res) {
        res.render('login/index');
    });
};
