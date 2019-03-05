'use strict';

var filter = require('../../lib/filter');
var utilLibrary = require('../../lib/utilLibrary');
var ResponseError = require('../../errors/ResponseError');
var Logger = require('../../lib/logger');
var operatelogService = require('../../services/operatelogService');
var t_account = require('../../models/account');
var log = Logger.getLogger();

module.exports = function (router) {

    var fns = filter(['checkperm'], {
        perms: ['zdycd']
    });

    router.post('/login', function (req, res) {
        var username = req.body.username;
        var password = req.body.password;
        t_account.findOne({
            where: {
                username: username,
                password: password
            }
        }).then(function(ret){
            try {
                if(!ret) {
                    var error = '用户名不存在';
                    req.session.error = error
                    utilLibrary.outputJsonResult(req, res, new ResponseError(error.toString()));
                }else{
                    var jsondata = {'username': ret.get('username')};
                    console.log('jsondata = ', jsondata)
                    req.session.user = jsondata;
                    utilLibrary.outputJsonResult(req, res, jsondata);
                }
            }catch(e){
                utilLibrary.outputJsonResult(req, res, new ResponseError(e.toString()));
                console.log(e);
            }
        }).catch(function(err){
            utilLibrary.outputJsonResult(req, res, new ResponseError(err.toString()));
        });
    });
    router.post('/logout', function (req, res) {
        var jsondata = {}
        req.session.user = jsondata;
        utilLibrary.outputJsonResult(req, res, jsondata);
    });
};
