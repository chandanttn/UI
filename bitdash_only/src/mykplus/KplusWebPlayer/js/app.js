global.asmCrypto = require('./asmCrypto');


/** browser+version detection
 *  from http://stackoverflow.com/questions/5916900/how-can-you-detect-the-version-of-a-browser */
global.browserInfo = (function () {
    var ua = navigator.userAgent,
        tem, M = ua.match(/(edge|opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if (/trident/i.test(M[1])) {
        tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
        return {
            name: 'IE',
            version: (tem[1] || '')
        };
    }
    if (M[1] === 'Chrome') {
        tem = ua.match(/\bOPR\/(\d+)/);
        if (tem != null) {
            return {
                name: 'Opera',
                version: tem[1]
            };
        }
    }
    if (ua.indexOf('Edge') > 0) {
        tem = ua.match(/\bEdge\/(\d+)/);
        if (tem != null) {
            return {
                name: 'Edge',
                version: tem[1]
            };
        }
    }
    M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
    if ((tem = ua.match(/version\/(\d+)/i)) != null) {
        M.splice(1, 1, tem[1]);
    }
    return {
        name: M[0],
        version: M[1]
    };
})();

/*Google Analytics*/
(function (i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r;
    i[r] = i[r] || function () {
        (i[r].q = i[r].q || []).push(arguments)
    }, i[r].l = 1 * new Date();
    a = s.createElement(o),
        m = s.getElementsByTagName(o)[0];
    a.async = 1;
    a.src = g;
    m.parentNode.insertBefore(a, m)
})(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');
/***********************************/



/*
 * jQuery BlockUI; v20141123
 * http://jquery.malsup.com/block/
 * Copyright (c) 2014 M. Alsup; Dual licensed: MIT/GPL
 */
(function () {
    "use strict";
    function e(e) {
        function o(o, i) {
            var s, h, k = o == window, v = i && void 0 !== i.message ? i.message : void 0;
            if (i = e.extend({}, e.blockUI.defaults, i || {}), !i.ignoreIfBlocked || !e(o).data("blockUI.isBlocked")) {
                if (i.overlayCSS = e.extend({}, e.blockUI.defaults.overlayCSS, i.overlayCSS || {}), s = e.extend({}, e.blockUI.defaults.css, i.css || {}), i.onOverlayClick && (i.overlayCSS.cursor = "pointer"), h = e.extend({}, e.blockUI.defaults.themedCSS, i.themedCSS || {}), v = void 0 === v ? i.message : v, k && b && t(window, {fadeOut: 0}), v && "string" != typeof v && (v.parentNode || v.jquery)) {
                    var y = v.jquery ? v[0] : v, m = {};
                    e(o).data("blockUI.history", m), m.el = y, m.parent = y.parentNode, m.display = y.style.display, m.position = y.style.position, m.parent && m.parent.removeChild(y)
                }
                e(o).data("blockUI.onUnblock", i.onUnblock);
                var g, I, w, U, x = i.baseZ;
                g = r || i.forceIframe ? e('<iframe class="blockUI" style="z-index:' + x++ + ';display:none;border:none;margin:0;padding:0;position:absolute;width:100%;height:100%;top:0;left:0" src="' + i.iframeSrc + '"></iframe>') : e('<div class="blockUI" style="display:none"></div>'), I = i.theme ? e('<div class="blockUI blockOverlay ui-widget-overlay" style="z-index:' + x++ + ';display:none"></div>') : e('<div class="blockUI blockOverlay" style="z-index:' + x++ + ';display:none;border:none;margin:0;padding:0;width:100%;height:100%;top:0;left:0"></div>'), i.theme && k ? (U = '<div class="blockUI ' + i.blockMsgClass + ' blockPage ui-dialog ui-widget ui-corner-all" style="z-index:' + (x + 10) + ';display:none;position:fixed">', i.title && (U += '<div class="ui-widget-header ui-dialog-titlebar ui-corner-all blockTitle">' + (i.title || "&nbsp;") + "</div>"), U += '<div class="ui-widget-content ui-dialog-content"></div>', U += "</div>") : i.theme ? (U = '<div class="blockUI ' + i.blockMsgClass + ' blockElement ui-dialog ui-widget ui-corner-all" style="z-index:' + (x + 10) + ';display:none;position:absolute">', i.title && (U += '<div class="ui-widget-header ui-dialog-titlebar ui-corner-all blockTitle">' + (i.title || "&nbsp;") + "</div>"), U += '<div class="ui-widget-content ui-dialog-content"></div>', U += "</div>") : U = k ? '<div class="blockUI ' + i.blockMsgClass + ' blockPage" style="z-index:' + (x + 10) + ';display:none;position:fixed"></div>' : '<div class="blockUI ' + i.blockMsgClass + ' blockElement" style="z-index:' + (x + 10) + ';display:none;position:absolute"></div>', w = e(U), v && (i.theme ? (w.css(h), w.addClass("ui-widget-content")) : w.css(s)), i.theme || I.css(i.overlayCSS), I.css("position", k ? "fixed" : "absolute"), (r || i.forceIframe) && g.css("opacity", 0);
                var C = [g, I, w], S = k ? e("body") : e(o);
                e.each(C, function () {
                    this.appendTo(S)
                }), i.theme && i.draggable && e.fn.draggable && w.draggable({
                    handle: ".ui-dialog-titlebar",
                    cancel: "li"
                });
                var O = f && (!e.support.boxModel || e("object,embed", k ? null : o).length > 0);
                if (u || O) {
                    if (k && i.allowBodyStretch && e.support.boxModel && e("html,body").css("height", "100%"), (u || !e.support.boxModel) && !k)var E = d(o, "borderTopWidth"), T = d(o, "borderLeftWidth"), M = E ? "(0 - " + E + ")" : 0, B = T ? "(0 - " + T + ")" : 0;
                    e.each(C, function (e, o) {
                        var t = o[0].style;
                        if (t.position = "absolute", 2 > e)k ? t.setExpression("height", "Math.max(document.body.scrollHeight, document.body.offsetHeight) - (jQuery.support.boxModel?0:" + i.quirksmodeOffsetHack + ') + "px"') : t.setExpression("height", 'this.parentNode.offsetHeight + "px"'), k ? t.setExpression("width", 'jQuery.support.boxModel && document.documentElement.clientWidth || document.body.clientWidth + "px"') : t.setExpression("width", 'this.parentNode.offsetWidth + "px"'), B && t.setExpression("left", B), M && t.setExpression("top", M); else if (i.centerY)k && t.setExpression("top", '(document.documentElement.clientHeight || document.body.clientHeight) / 2 - (this.offsetHeight / 2) + (blah = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + "px"'), t.marginTop = 0; else if (!i.centerY && k) {
                            var n = i.css && i.css.top ? parseInt(i.css.top, 10) : 0, s = "((document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + " + n + ') + "px"';
                            t.setExpression("top", s)
                        }
                    })
                }
                if (v && (i.theme ? w.find(".ui-widget-content").append(v) : w.append(v), (v.jquery || v.nodeType) && e(v).show()), (r || i.forceIframe) && i.showOverlay && g.show(), i.fadeIn) {
                    var j = i.onBlock ? i.onBlock : c, H = i.showOverlay && !v ? j : c, z = v ? j : c;
                    i.showOverlay && I._fadeIn(i.fadeIn, H), v && w._fadeIn(i.fadeIn, z)
                } else i.showOverlay && I.show(), v && w.show(), i.onBlock && i.onBlock.bind(w)();
                if (n(1, o, i), k ? (b = w[0], p = e(i.focusableElements, b), i.focusInput && setTimeout(l, 20)) : a(w[0], i.centerX, i.centerY), i.timeout) {
                    var W = setTimeout(function () {
                        k ? e.unblockUI(i) : e(o).unblock(i)
                    }, i.timeout);
                    e(o).data("blockUI.timeout", W)
                }
            }
        }

        function t(o, t) {
            var s, l = o == window, a = e(o), d = a.data("blockUI.history"), c = a.data("blockUI.timeout");
            c && (clearTimeout(c), a.removeData("blockUI.timeout")), t = e.extend({}, e.blockUI.defaults, t || {}), n(0, o, t), null === t.onUnblock && (t.onUnblock = a.data("blockUI.onUnblock"), a.removeData("blockUI.onUnblock"));
            var r;
            r = l ? e("body").children().filter(".blockUI").add("body > .blockUI") : a.find(">.blockUI"), t.cursorReset && (r.length > 1 && (r[1].style.cursor = t.cursorReset), r.length > 2 && (r[2].style.cursor = t.cursorReset)), l && (b = p = null), t.fadeOut ? (s = r.length, r.stop().fadeOut(t.fadeOut, function () {
                0 === --s && i(r, d, t, o)
            })) : i(r, d, t, o)
        }

        function i(o, t, i, n) {
            var s = e(n);
            if (!s.data("blockUI.isBlocked")) {
                o.each(function () {
                    this.parentNode && this.parentNode.removeChild(this)
                }), t && t.el && (t.el.style.display = t.display, t.el.style.position = t.position, t.el.style.cursor = "default", t.parent && t.parent.appendChild(t.el), s.removeData("blockUI.history")), s.data("blockUI.static") && s.css("position", "static"), "function" == typeof i.onUnblock && i.onUnblock(n, i);
                var l = e(document.body), a = l.width(), d = l[0].style.width;
                l.width(a - 1).width(a), l[0].style.width = d
            }
        }

        function n(o, t, i) {
            var n = t == window, l = e(t);
            if ((o || (!n || b) && (n || l.data("blockUI.isBlocked"))) && (l.data("blockUI.isBlocked", o), n && i.bindEvents && (!o || i.showOverlay))) {
                var a = "mousedown mouseup keydown keypress keyup touchstart touchend touchmove";
                o ? e(document).bind(a, i, s) : e(document).unbind(a, s)
            }
        }

        function s(o) {
            if ("keydown" === o.type && o.keyCode && 9 == o.keyCode && b && o.data.constrainTabKey) {
                var t = p, i = !o.shiftKey && o.target === t[t.length - 1], n = o.shiftKey && o.target === t[0];
                if (i || n)return setTimeout(function () {
                    l(n)
                }, 10), !1
            }
            var s = o.data, a = e(o.target);
            return a.hasClass("blockOverlay") && s.onOverlayClick && s.onOverlayClick(o), a.parents("div." + s.blockMsgClass).length > 0 ? !0 : 0 === a.parents().children().filter("div.blockUI").length
        }

        function l(e) {
            if (p) {
                var o = p[e === !0 ? p.length - 1 : 0];
                o && o.focus()
            }
        }

        function a(e, o, t) {
            var i = e.parentNode, n = e.style, s = (i.offsetWidth - e.offsetWidth) / 2 - d(i, "borderLeftWidth"), l = (i.offsetHeight - e.offsetHeight) / 2 - d(i, "borderTopWidth");
            o && (n.left = s > 0 ? s + "px" : "0"), t && (n.top = l > 0 ? l + "px" : "0")
        }

        function d(o, t) {
            return parseInt(e.css(o, t), 10) || 0
        }

        e.fn._fadeIn = e.fn.fadeIn;
        var c = e.noop || function () {
        }, r = /MSIE/.test(navigator.userAgent), u = /MSIE 6.0/.test(navigator.userAgent) && !/MSIE 8.0/.test(navigator.userAgent);
        document.documentMode || 0;
        var f = e.isFunction(document.createElement("div").style.setExpression);
        e.blockUI = function (e) {
            o(window, e)
        }, e.unblockUI = function (e) {
            t(window, e)
        }, e.growlUI = function (o, t, i, n) {
            var s = e('<div class="growlUI"></div>');
            o && s.append("<h1>" + o + "</h1>"), t && s.append("<h2>" + t + "</h2>"), void 0 === i && (i = 3e3);
            var l = function (o) {
                o = o || {}, e.blockUI({
                    message: s,
                    fadeIn: o.fadeIn !== void 0 ? o.fadeIn : 700,
                    fadeOut: o.fadeOut !== void 0 ? o.fadeOut : 1e3,
                    timeout: o.timeout !== void 0 ? o.timeout : i,
                    centerY: !1,
                    showOverlay: !1,
                    onUnblock: n,
                    css: e.blockUI.defaults.growlCSS
                })
            };
            l(), s.css("opacity"), s.mouseover(function () {
                l({fadeIn: 0, timeout: 3e4});
                var o = e(".blockMsg");
                o.stop(), o.fadeTo(300, 1)
            }).mouseout(function () {
                e(".blockMsg").fadeOut(1e3)
            })
        }, e.fn.block = function (t) {
            if (this[0] === window)return e.blockUI(t), this;
            var i = e.extend({}, e.blockUI.defaults, t || {});
            return this.each(function () {
                var o = e(this);
                i.ignoreIfBlocked && o.data("blockUI.isBlocked") || o.unblock({fadeOut: 0})
            }), this.each(function () {
                "static" == e.css(this, "position") && (this.style.position = "relative", e(this).data("blockUI.static", !0)), this.style.zoom = 1, o(this, t)
            })
        }, e.fn.unblock = function (o) {
            return this[0] === window ? (e.unblockUI(o), this) : this.each(function () {
                t(this, o)
            })
        }, e.blockUI.version = 2.7, e.blockUI.defaults = {
            message: "<h1>Please wait...</h1>",
            title: null,
            draggable: !0,
            theme: !1,
            css: {
                padding: 0,
                margin: 0,
                width: "30%",
                top: "40%",
                left: "35%",
                textAlign: "center",
                color: "#000",
                border: "3px solid #aaa",
                backgroundColor: "#fff",
                cursor: "wait"
            },
            themedCSS: {width: "30%", top: "40%", left: "35%"},
            overlayCSS: {backgroundColor: "#000", opacity: .6, cursor: "wait"},
            cursorReset: "default",
            growlCSS: {
                width: "350px",
                top: "10px",
                left: "",
                right: "10px",
                border: "none",
                padding: "5px",
                opacity: .6,
                cursor: "default",
                color: "#fff",
                backgroundColor: "#000",
                "-webkit-border-radius": "10px",
                "-moz-border-radius": "10px",
                "border-radius": "10px"
            },
            iframeSrc: /^https/i.test(window.location.href || "") ? "javascript:false" : "about:blank",
            forceIframe: !1,
            baseZ: 1e3,
            centerX: !0,
            centerY: !0,
            allowBodyStretch: !0,
            bindEvents: !0,
            constrainTabKey: !0,
            fadeIn: 200,
            fadeOut: 400,
            timeout: 0,
            showOverlay: !0,
            focusInput: !0,
            focusableElements: ":input:enabled:visible",
            onBlock: null,
            onUnblock: null,
            onOverlayClick: null,
            quirksmodeOffsetHack: 4,
            blockMsgClass: "blockMsg",
            ignoreIfBlocked: !1
        };
        var b = null, p = []
    }

    "function" == typeof define && define.amd && define.amd.jQuery ? define(["jquery"], e) : e(jQuery)
})();


var kpAp = {};

kpAp.yes = false;
kpAp.timerErrorVisible = false;

global._wgsbneq = kpAp;
global.emotelsomwi = function (sender, args) {
    global._wgsbneq.config.silverlightObj = sender.getHost();
};

kpAp.globalTimeError = function(code){
    if(!kpAp.timerErrorVisible){
        kpAp.timerErrorVisible = true;
        if (kpAp.config.silverlightObj !== null) {
            //kpAp.config.silverlightObj.Content.kpSLapp.onDeviceTimeInCorrectError(code);
        }
        else {
            $('.plyr-err-msg-cnt').hide();
        }

        if(code != null && typeof code != 'undefined'){
            code = "["+code+"]";
        }
        alert(kpAp.MultiLangSupportModule.getErrorMsg(2, kpAp.config.userPrefLanguage) + ' ' + code);
        window.location = kpAp.config.kplusOTThomePageUrl;
    }
};

/**
 *  global configurations(preferences,strings, flags and global variables)
 *  for both Bitdash and Silverlight player
 */
kpAp.config = require('./config');

/**
 * Module responsible for CSM heart beat API calls for both types of players
 *
 */
kpAp.CSMheartBeatModule = function (exports) {

    exports.CSMheartbeatReqTimeoutId = '';
    var lastCSMreqType = 'PAUSE';

    exports.sndCSMheartbeatPauseReq = function () {
        if (lastCSMreqType === 'PAUSE') {
            clearTimeout(exports.CSMheartbeatReqTimeoutId);
            exports.CSMheartbeatReqTimeoutId = setTimeout(() => {
                exports.sndCSMheartbeatPlayReq();
        }, 3000);
        return;
    }

    lastCSMreqType = 'PAUSE';
    clearTimeout(exports.CSMheartbeatReqTimeoutId);
    kpAp.APIcallerModule.CSMchannelPausedCall().then(function (data) {
        if (kpAp.config.flags.isDebugMsgsEnabled === 'true') {
            if (typeof  data == 'object') {
                console.log('%cDebug - CSM heartbeat pause req response: ' + JSON.stringify(data), 'background:#008080;color:#fff')
            }
            else {
                console.log('%cDebug - CSM heartbeat pause req response: ' + data, 'background:#008080;color:#fff')
            }
        }
        exports.CSMheartbeatReqTimeoutId = setTimeout(() => {
            exports.sndCSMheartbeatPlayReq();
    }, 3000);
}, function () {
});
};

exports.rescheduleAndCheckCSM = function(){
    kpAp.maxRetriesAttempt--;
    
    if(!navigator.onLine){
        if(kpAp.maxRetriesAttempt < 1){
            if (kpAp.config.silverlightObj !== null) {
                kpAp.config.silverlightObj.Content.kpSLapp.onCSMrespNOKrcvd("APP-101");
            }else{
                kpAp.displayPlyrMsg(1,void 0,'APP-101');
            }
            return;
        }
    }else{
        if(kpAp.maxRetriesAttempt < 1){
            if (kpAp.config.silverlightObj !== null) {
                kpAp.config.silverlightObj.Content.kpSLapp.onCSMrespNOKrcvd("CSM-601");
            }else{
                kpAp.displayPlyrMsg(1,void 0,'CSM-601');
            }
            return;
        }
    }


    if(kpAp.maxRetriesAttempt > 0){
        clearTimeout(exports.CSMheartbeatReqTimeoutId);
        if(kpAp.config.CSMheartBeatResp && kpAp.config.CSMheartBeatResp.heartbeat.policy.heartbeatInterval){
            exports.CSMheartbeatReqTimeoutId = setTimeout(() => {
                exports.sndCSMheartbeatPlayReq('PLAY');
        }, parseInt(kpAp.config.CSMheartBeatResp.heartbeat.policy.heartbeatInterval) * 1000);
    }else if(kpAp.config.validateTokenResponse.IrdetoSession.ConcurrentStreamInfo.HeartbeatInterval){
        exports.CSMheartbeatReqTimeoutId = setTimeout(() => {
            exports.sndCSMheartbeatPlayReq('PLAY');
    }, parseInt(kpAp.config.validateTokenResponse.IrdetoSession.ConcurrentStreamInfo.HeartbeatInterval) * 1000);
} 
}

};

exports.sndCSMheartbeatPlayReq = function () {
    /*handling scenario when user paused the chnl*/
    if (kpAp.config.flags.isChnlPausedByUsr) {
        return;

        /*var timerMilli = '';
         try {
         timerMilli = kpAp.config.CSMheartBeatResp.heartbeat.policy.heartbeatInterval;
         } catch (e) {
         timerMilli = '60';
         }
         if (kpAp.config.crntChnlCSMPausCounter === 0) {
         kpAp.APIcallerModule.CSMchannelPausedCall();
         kpAp.config.crntChnlCSMPausCounter++;
         }

         CsmModule.CSMheartbeatReqTimeoutId = setTimeout(function () {
         CsmModule.sndCSMheartbeatPlayReq('PLAY');
         }, parseInt(timerMilli) * 1000);

         return;*/
    }
    /**************************************/

    lastCSMreqType = 'PLAY';
    kpAp.APIcallerModule.CSMheartBeatCall('PLAY').then(function (data) {
        if (kpAp.config.flags.isDebugMsgsEnabled === 'true') {
            if (typeof  data == 'object') {
                console.log('%cDebug - CSM heartbeat play req response: ' + JSON.stringify(data), 'background:#008080;color:#fff')
            }
            else {
                console.log('%cDebug - CSM heartbeat play req response: ' + data, 'background:#008080;color:#fff')
            }
        }

        if (typeof data == 'string') {
            data = JSON.parse(data);
        }

        if ('Error' in data || 'errorCode' in data) {
            if (kpAp.config.silverlightObj !== null) {
                kpAp.config.silverlightObj.Content.kpSLapp.onCSMrespNOKrcvd(null);
            }else{
                exports.rescheduleAndCheckCSM();
            }
                
            /*window.location = kpAp.config.kplusOTThomePageUrl;
             alert('response recieved containing error in CSM heartBeat API call \n Data recieved: ' + data);*/
            //kpAp.gAnalyticsModule.fireGoogleAnalyticsEvnt('REST API', 'Failure', JSON.stringify(data));
        } else {
            if (kpAp.config.silverlightObj !== null ) {
                kpAp.config.CSMheartBeatResp = data;
                if (data.heartbeat != undefined) {
                    if(kpAp.config.CSMheartBeatResp){
                        kpAp.maxRetriesAttempt = kpAp.config.CSMheartBeatResp.heartbeat.policy.maxMissedHeartbeats;
                    }
                    if (data.heartbeat.status === 'NOK') {
                        if (data.heartbeat.error.code !== 1004) {
                            kpAp.config.silverlightObj.Content.kpSLapp.onCSMrespNOKrcvd('NOK');
                            return;
                        }
                    }else{
                        kpAp.config.silverlightObj.Content.kpSLapp.onCSMrespNOKrcvd(JSON.stringify(data));
                        /*
                            CSM Refactor
                            Setting Content ID in cookie if OK and PLAY
                        */
                        //setCSMCookie("C_Content_Id", kpAp.config.channelsList[kpAp.config.crntPlayingChannelIndex].ChannelId);
                        var exp = (kpAp.config.CSMheartBeatResp.heartbeat.policy.maxMissedHeartbeats *  parseInt(kpAp.config.CSMheartBeatResp.heartbeat.policy.heartbeatInterval))/ (24 * 60 * 60);
                        setCSMCookie("C_Content_Id", kpAp.config.channelsList[kpAp.config.crntPlayingChannelIndex].ChannelId,null,exp);
                    }

                    clearTimeout(exports.CSMheartbeatReqTimeoutId);
                    exports.CSMheartbeatReqTimeoutId = setTimeout(() => {
                        exports.sndCSMheartbeatPlayReq('PLAY');
                }, parseInt(kpAp.config.CSMheartBeatResp.heartbeat.policy.heartbeatInterval) * 1000);
            }
        } else {
                kpAp.config.CSMheartBeatResp = data;
        if (data.heartbeat != undefined) {
            if(kpAp.config.CSMheartBeatResp){
                kpAp.maxRetriesAttempt = kpAp.config.CSMheartBeatResp.heartbeat.policy.maxMissedHeartbeats;
            }
                        
            if (data.heartbeat.status === 'NOK') {
                if (data.heartbeat.error.code !== 1004) {
                    kpAp.kpDash.isCSMheartbeatNOK = true;
                    return;
                }
            }else{
                /*
                CSM Refactor
                Setting Content ID in cookie if OK and PLAY
            */
                //setCSMCookie("C_Content_Id", kpAp.config.channelsList[kpAp.config.crntPlayingChannelIndex].ChannelId);
                var exp = (kpAp.config.CSMheartBeatResp.heartbeat.policy.maxMissedHeartbeats *  parseInt(kpAp.config.CSMheartBeatResp.heartbeat.policy.heartbeatInterval))/ (24 * 60 * 60);
                setCSMCookie("C_Content_Id", kpAp.config.channelsList[kpAp.config.crntPlayingChannelIndex].ChannelId,null,exp);
            }
            clearTimeout(exports.CSMheartbeatReqTimeoutId);
            exports.CSMheartbeatReqTimeoutId = setTimeout(() => {
                exports.sndCSMheartbeatPlayReq('PLAY');
        }, parseInt(kpAp.config.CSMheartBeatResp.heartbeat.policy.heartbeatInterval) * 1000);
    }
    }
}
}, function(jqXHR, textStatus, errorThrown){
    if (kpAp.config.silverlightObj !== null) {
        kpAp.config.silverlightObj.Content.kpSLapp.onCSMrespNOKrcvd(null);
    }else{
        exports.rescheduleAndCheckCSM();
    }
            
    // kpAp.gAnalyticsModule.fireGoogleAnalyticsEvnt('REST API', 'Failure', JSON.stringify(error));
    
    if (errorThrown != "") {
        kpAp.gAnalyticsModule.fireGoogleAnalyticsEvnt('REST API', 'CSM Heartbeat', jqXHR.status + ' - ' + errorThrown);
    }else{
        kpAp.gAnalyticsModule.fireGoogleAnalyticsEvnt('REST API', 'CSM Heartbeat', jqXHR.status + ' - ' + textStatus);
    }
});
};
exports.onCSMPlayChannelChange = function ()  {
    //if (getCookie("C_Tab_Id") == kpAp.tabId) {
    //    //Binding on before page unload
    //    $(window).bind('beforeunload', function () {
    //        if (getCookie("C_Tab_Id") == kpAp.tabId) {
    //            eraseCookie("C_Tab_Id");
    //        }
    //    });
    //} else {
    //    if (kpAp.config.silverlightObj !== null) {
    //        kpAp.config.silverlightObj.Content.kpSLapp.showCSMError();
    //    }
    //}
     
    ////////////////////////////////
    if (kpAp.tabId == null || kpAp.tabId == '') {
        kpAp.tabId = generateUUID();
    }
    //var tabId = generateUUID();// should be a global variable?
    if (getCookie("C_Tab_Id") === '') {
        setCSMCookie("C_Tab_Id", kpAp.tabId);
    }
    if (getCookie("C_Content_Id") !== '') {
        if (getCookie("C_Tab_Id") == kpAp.tabId) {
            //VOD Call
            CSMCall("PAUSED", getCookie("C_Content_Id"));
            kpAp.runPlayer = true;
           
            $(window).bind('beforeunload', function () {
                if (getCookie("C_Tab_Id") == kpAp.tabId) {
                    setCookieToNull("C_Tab_Id");
                }
            });
        } else {
            
            kpAp.runPlayer = false;
            if (kpAp.config.silverlightObj !== null) {
                kpAp.config.silverlightObj.Content.kpSLapp.showCSMError();
            } else {
                kpAp.displayPlyrMsg(3, void 0, "CSM-1004");
                if (bitmovin.player(this.dashContainerUniqueId).isPlaying()) {
                    bitmovin.player(this.dashContainerUniqueId).unload();
                }
            }
        }
    }else{
        if (getCookie("C_Tab_Id") == kpAp.tabId) {
            
            kpAp.runPlayer = true;
            
            $(window).bind('beforeunload', function () {
                if (getCookie("C_Tab_Id") == kpAp.tabId) {
                    setCookieToNull("C_Tab_Id");
                }
            });
        }
    }
}
exports.onCSMPlay = function ()  {
    if (kpAp.tabId == null || kpAp.tabId == '') {
        kpAp.tabId = generateUUID();
    }
    
    if (getCookie("C_Tab_Id") === '') {
        setCSMCookie("C_Tab_Id", kpAp.tabId);
    }
    if (getCookie("C_Content_Id") !== null) {
        if (getCookie("C_Tab_Id") == kpAp.tabId) {
            //VOD Call
            CSMCall("PAUSED", getCookie("C_Content_Id"));
        } else {
            if (kpAp.config.silverlightObj !== null) {
                kpAp.config.silverlightObj.Content.kpSLapp.showCSMError();
            } else {
                kpAp.displayPlyrMsg(3, void 0, "CSM-1004");
                if (bitmovin.player(this.dashContainerUniqueId).isPlaying()) {
                    bitmovin.player(this.dashContainerUniqueId).unload();
                }
            }
        }
    }
}
exports.Dispose = function ()  {
    //CSMCall("PAUSED", contentId);
    setCookieToNull("C_Content_Id");
    setCookieToNull("C_Tab_Id");
    //clearTimeout(csmSync);
}
exports.getCookie = function(cname){

    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
}
return exports;

}({});

kpAp.MultiLangSupportModule = require('./module-multiLangSupport');

kpAp.APIcallerModule = function (exports) {

    
    var baseUrl = '@@apiBasePath';
    var getChannelsAPIcallURL = baseUrl + 'Content/Channels';
    /*var getChannelEPGAPIcallURL = baseUrl + 'Content/ProgramGuide';*/
    var getChannelEPGAPIcallURL = '@@programGuideUrl';
    var getAccessKeyAPIcallURL = baseUrl + 'Service/GetAccessKeyId';
    var validateTokenAPIcallURL = baseUrl + 'User/ValidateToken';
    var getContentAPIcallURL = baseUrl + 'Content/GetContent';
    var getAppConfigDirectAPIcallURL = baseUrl + 'Service/GetAppConfigDirect';
    var fingerPrintnAPIcallURL = '@@FingerPrintApiPath';

    var key = "A93reRTUJHsCuQSHR+L3GxqOJyDmQpCgps102ciuabc=";
    var apiKeyId = '44CF9590006BF252F707';

    function isResponsTimeDiffMoreThanTenMints(rsponsTime) {
        var crntSysTimeMinusTenM = new Date();
        var crntSysTimePlusTenM = new Date();

        crntSysTimeMinusTenM.setMinutes(crntSysTimeMinusTenM.getMinutes() - 11);
        crntSysTimePlusTenM.setMinutes(crntSysTimePlusTenM.getMinutes() + 11);

        if (rsponsTime < crntSysTimeMinusTenM || rsponsTime > crntSysTimePlusTenM) {
            return true;
        }

        return false;
    }

    function getSignature(url, timeStamp) {

        var strToBeSigned = '' + apiKeyId + url + timeStamp;
        var asmCryptoResult = asmCrypto.HMAC_SHA256.base64(strToBeSigned, atob(key));
        return asmCryptoResult;

        /*var keyBase64 = CryptoJS.enc.Base64.parse(key);
         var hash = CryptoJS.HmacSHA256(strToBeSigned, keyBase64);
         var hashBase64 = hash.toString(CryptoJS.enc.Base64);
         console.log('CryptoJS calc: ' + hashBase64);
         return hashBase64;*/
    }

    exports.sheduleRevalidation = function () {
        kpAp.config.flags.isThisRevalidationReq = true;
        var revaldiationTime = kpAp.config.validateTokenResponse.BBSData.MustRevalidate;
        revaldiationTime = new Date(revaldiationTime * 1000);

        /* revaldiationTime = new Date();
         revaldiationTime.setMinutes(revaldiationTime.getMinutes()+1);*/


        revaldiationTime = revaldiationTime.getTime();

        var crntSysTime = new Date();
        crntSysTime = crntSysTime.getTime();

        var timeDiffInMilliScnd = revaldiationTime - crntSysTime;

        if (timeDiffInMilliScnd < 300000) {
            timeDiffInMilliScnd = 300000;
        }

        exports.revalidationTimerId = setTimeout(() => {
            exports.validateToken();
    }, timeDiffInMilliScnd);
};

var processFPapiRespns = function (staticRspns) {
    staticRspns.isAlive = exports.decryptUsingAES(staticRspns.isAlive, kpAp.config.validateTokenResponse.BBSData.FPData.FPKey);
    staticRspns.subList = exports.decryptUsingAES(staticRspns.subList, kpAp.config.validateTokenResponse.BBSData.FPData.FPKey);
    if (kpAp.config.flags.isDebugMsgsEnabled === 'true') {
        console.log('%cDebug - Blocked users: ' + staticRspns.subList, 'background:#008080;color:#fff');
        console.log('%cDebug - Finger print: ' + staticRspns.isAlive, 'background:#008080;color:#fff')
    }

    staticRspns.isAlive = JSON.parse(staticRspns.isAlive);

    /*kpAp.config.isForceBlockFPusr = true;*/

    if (kpAp.config.isForceBlockFPusr) {
        staticRspns.subList = [kpAp.config.validateTokenResponse.BBSData.UserData.SubscriberId];
    }
    else {
        staticRspns.subList = JSON.parse(staticRspns.subList);
    }

    //staticRspns.subList = JSON.parse(staticRspns.subList);


    kpAp.config.isAliveApiRspns = staticRspns;


    kpAp.config.isAliveApiRspns.subList.forEach((sbscrbr) => {
        if (kpAp.config.validateTokenResponse.BBSData.UserData.SubscriberId == sbscrbr) {
            kpAp.config.isFPusrBlkd = true;
    if (kpAp.config.silverlightObj !== null) {
        kpAp.config.silverlightObj.Content.kpSLapp.onFPBlockedUsrStatusConfirm('true');
    }
    else {
        kpAp.kpDash.deleteFingerPrint();
        /*var preMsg = kpAp.MultiLangSupportModule.getErrorMsg(11, kpAp.config.userPrefLanguage);*/
        //clearInterval(kpAp.mainTimer);
        //$("#player-container").unbind( "mousemove" );
        //kpAp.jqNodsCache.getNode(".kplus-video-overlay").show();
        //kpAp.jqNodsCache.getNode("#player-container").css('cursor', 'auto');
        kpAp.kpDash.onOverlayedCenteralPopUpCloseBttnClick();
        kpAp.displayPlyrMsg(11,void 0, "FPT-700");
        try {
            bitmovin.player(kpAp.kpDash.dashContainerUniqueId).destroy();
        }
        catch (e) {
        }

        /*$('.video-container').append(
         `<div class="finger-prnt-err-msg-cnt">
         <div class="finger-prnt-err-msg">${preMsg}</div>
         <br/><br/>
         <input style="color: #000;width: 60px;  height: 30px;" id="fpUsrBlkdMsgOkBtn" class="" type="button" value=" Ok "/>
         </div>`
         );*/


        /*$.blockUI.defaults.overlayCSS.backgroundColor = '#000000';
         $.blockUI.defaults.overlayCSS.opacity = 1;
         //$.blockUI({css: { backgroundColor: '#000000', color: '#fff' },message: `<br/><br/><br/><br/><span style="padding-left: 1px;font-size: medium">${preMsg}</span><br/><br/><br/><input style="color: #000;width: 60px;  height: 30px;" id="fpUsrBlkdMsgOkBtn" class="" type="button" value=" Ok "/><br/><br/><br/>`});

         $('div#player-container').block({
         overlayCSS: {
         opacity: 1,
         backgroundColor: '#000000',
         cursor: "default"
         },
         css: {backgroundColor: '#000000', color: '#fff', cursor: 'auto'},
         message: `<br/><br/><br/><br/><span style="padding-left: 1px;font-size: medium">${preMsg}</span><br/><br/><br/><input style="color: #000;width: 60px;  height: 30px;" id="fpUsrBlkdMsgOkBtn" class="" type="button" value=" Ok "/><br/><br/><br/>`
         });
         $('div.video-container').hide();*/

        /*$('#fpUsrBlkdMsgOkBtn').click(function () {
         try {
         document.getElementById('logoutForm').submit();
         } catch (e) {
         window.location = kpAp.config.kplusOTThomePageUrl;
         }
         });*/
    }

    /*    setTimeout(function () {

     }, 5000);
     */
}
});
};

exports.dummyCall = function(){
    $.ajax({
        url: baseUrl,
        method: 'GET',
        cache:false,
        timeout: 180000,
        success: function (data, textStatus, respn) {
            setTimeout(function(){
                var dateHeader = new Date(respn.getResponseHeader('Date'));
                if (isResponsTimeDiffMoreThanTenMints(dateHeader)) {
                    /*if (kpAp.config.silverlightObj !== null) {
                        kpAp.config.silverlightObj.Content.kpSLapp.onDeviceTimeInCorrectError('PLR-104');
                    }
                    else {
                        $('.plyr-err-msg-cnt').hide();
                    }
                    alert(kpAp.MultiLangSupportModule.getErrorMsg(2, kpAp.config.userPrefLanguage) + ' PLR-104');
                    window.location = kpAp.config.kplusOTThomePageUrl;
                    */
                    kpAp.globalTimeError('PLR-104');
                    return;
                }
            },500)
        },
        error: function (jqXHR, textStatus, errorThrown) {
            setTimeout(function(){
                var dateHeader = new Date(jqXHR.getResponseHeader('Date'));
                if(dateHeader.getYear() == new Date().getYear()){
                    if (isResponsTimeDiffMoreThanTenMints(dateHeader)) {
                        kpAp.globalTimeError('PLR-104');
                        return;
                    }
                }
            },500)
        }
    })
};

exports.callIsAliveApi = function () {

    if (kpAp.config.isFingerPrintEnabled === 'false') {
        return;
    }


    $.ajax({
        url: fingerPrintnAPIcallURL,
        method: 'GET',
        timeout: 180000,
        success: function (data, textStatus, respn) {

            /*var staticRspns = {
             "keyDate": 1468634473,
             "isAlive": [
             {
             "channelId": "400000001",
             "position": "4",
             "background": "#000000",
             "colorText": "#FFFFFF",
             "duration": "55"
             },
             {
             "channelId": "400000003",
             "position": "5",
             "background": "#000000",
             "colorText": "#FFFFFF",
             "duration": "55"
             },
             {
             "channelId": "4000000017",
             "position": "4",
             "background": "#000000",
             "colorText": "#FFFFFF",
             "duration": "55"
             }
             ],
             "subList": [
             20118083001,
             20312025001,
             20318012202
             ]
             };

             data = staticRspns; */


            if (typeof data == 'string') {
                data = JSON.parse(data);
            }

            if ('Error' in data || 'errorCode' in data) {
                if (kpAp.config.silverlightObj !== null) {
                    /*kpAp.config.silverlightObj.Content.kpSLapp.undoOverlayDisappear();*/
                }
                /*alert(kpAp.MultiLangSupportModule.getErrorMsg(9, kpAp.config.userPrefLanguage));*/
                //kpAp.gAnalyticsModule.fireGoogleAnalyticsEvnt('REST API', 'Failure', JSON.stringify(data));
            } else {

                var staticRspns = data;

                if (kpAp.config.silverlightObj !== null) {

                    if (kpAp.config.validateTokenResponse.BBSData.FPData.FPKeyGenDate != staticRspns.keyDate) {
                        exports.validateToken();
                    }
                    else {
                        processFPapiRespns(staticRspns);
                        kpAp.config.silverlightObj.Content.kpSLapp.onIsAliveApiRspnsRcvd(JSON.stringify(staticRspns));
                    }

                    clearTimeout(exports.isAliveApiCallerTimer);
                    exports.isAliveApiCallerTimer = setTimeout(() => {
                        exports.callIsAliveApi();
                }, 1000 * kpAp.config.validateTokenResponse.BBSData.FPData.FPTimeInterval);
            } else {

                    if (kpAp.config.validateTokenResponse.BBSData.FPData.FPKeyGenDate != staticRspns.keyDate) {
                        exports.validateToken();
                    }
        else {
                        processFPapiRespns(staticRspns);
            if (!kpAp.config.flags.isPlyrErrMsgVisible) {
                kpAp.kpDash.chkNdisplayFngrPrnt();
            }
        }

                    clearTimeout(exports.isAliveApiCallerTimer);
    exports.isAliveApiCallerTimer = setTimeout(() => {
        exports.callIsAliveApi();
}, 1000 * kpAp.config.validateTokenResponse.BBSData.FPData.FPTimeInterval);
}
}
},
error: function (jqXHR, textStatus, errorThrown) {

    /*var errorMsg = kpAp.MultiLangSupportModule.getErrorMsg(9, kpAp.config.userPrefLanguage);*/
    if (kpAp.config.silverlightObj !== null) {
        /*kpAp.config.silverlightObj.Content.kpSLapp.undoOverlayDisappear();*/
    }
    //kpAp.gAnalyticsModule.fireGoogleAnalyticsEvnt('REST API', 'Failure', 'Timeout or response recieved with wronge status code');
    
    if (errorThrown != "") {
        kpAp.gAnalyticsModule.fireGoogleAnalyticsEvnt('REST API', 'FingerPrint', jqXHR.status + ' - ' + errorThrown);
    }else{
        kpAp.gAnalyticsModule.fireGoogleAnalyticsEvnt('REST API', 'FingerPrint', jqXHR.status + ' - ' + textStatus);
    }
    if (kpAp.config.silverlightObj !== null) {
        var errorTxt = 'error';
        kpAp.config.silverlightObj.Content.kpSLapp.onGetChannelsResponseRecieved(errorTxt);
    }
}
});

/* var staticRspns = {
 "keyDate": 1442477242,
 "isAlive": [
 {
 "channelId": "400000001",
 "position": "4",
 "background": "#000000",
 "colorText": "#FFFFFF",
 "duration": "55"
 },
 {
 "channelId": "400000003",
 "position": "5",
 "background": "#000000",
 "colorText": "#FFFFFF",
 "duration": "55"
 },
 {
 "channelId": "4000000017",
 "position": "4",
 "background": "#000000",
 "colorText": "#FFFFFF",
 "duration": "55"
 }
 ],
 "subList": [
 20118083001,
 20312025001,
 20318012202
 ]
 };*/


/* var staticRspns = {
 "KeyDate": 1442477242,
 "isAlive": "3oYriEfh79ju9IXgAne895q6axoXSfisKe3dpThKOncRZr3KHzpfPKlwkCtN/ykJUmlIqm9NvVImGVIh272QNblUp//KSArWpfqqzaHnCPsmYOgQ0z0Yu7n8IFP8V+/jKPKcFB7PEstpyhJ+hxie/haQQSpwUbzAFnj15bJgbQDMdrZ4MomRBAcNCL63z/2gLmByLDo5pzqCCIv4bbx6DvJmOSka48ZgOh+0df9DgNlQQj8slCv7SoglryuWreBDZ8hB5/qjMUre3vszp/znz4S53v+lmcWLsa8UJA3UMM4=",
 "subList": "KQ35AIqqHzdhOS6YhIWE3Q=="
 };*/


};

exports.getChannels = function () {
    var irdetoUserSessionId = kpAp.config.validateTokenResponse.IrdetoSession.SessionId;
    var urlParams = '?SessionId=' + irdetoUserSessionId + '&t='+ (new Date().getTime()).toString();

    var timeInSeconds = Math.round(new Date().getTime() / 1000);
    var encodedURL = encodeURIComponent(getChannelsAPIcallURL + urlParams).toLowerCase();
    var signature = getSignature(encodedURL, timeInSeconds);

    var authHeaderVal = `sndplugin:${apiKeyId}:${signature}:${timeInSeconds}`;

    $.ajax({
        url: getChannelsAPIcallURL + urlParams,
        timeout: 180000,
        headers: {
            'Authorization': authHeaderVal,
        },
        method: 'GET',
        success: function (data, textStatus, respn) {
            if (typeof data == 'string') {
                data = JSON.parse(data);
            }

            var dateHeader = new Date(respn.getResponseHeader('Date'));
            if (isResponsTimeDiffMoreThanTenMints(dateHeader)) {
                /*if (kpAp.config.silverlightObj !== null) {
                    kpAp.config.silverlightObj.Content.kpSLapp.onDeviceTimeInCorrectError('CHL-104');
                }
                else {
                    $('.plyr-err-msg-cnt').hide();
                }
                alert(kpAp.MultiLangSupportModule.getErrorMsg(2, kpAp.config.userPrefLanguage) + ' CHL-104');
                window.location = kpAp.config.kplusOTThomePageUrl;*/
                kpAp.globalTimeError('CHL-104');
                return;
            }

            if ('Error' in data || 'errorCode' in data) {
                kpAp.kpDash.syncInternetDisconnection('CHL-101');
                if (kpAp.config.silverlightObj !== null) {
                    /*kpAp.config.silverlightObj.Content.kpSLapp.undoOverlayDisappear();*/
                }
                /*alert(kpAp.MultiLangSupportModule.getErrorMsg(9, kpAp.config.userPrefLanguage));*/
                //kpAp.gAnalyticsModule.fireGoogleAnalyticsEvnt('REST API', 'Failure', JSON.stringify(data));
            } else {

                data.Channels.sort(function (a, b) {
                    return a.DisplayOrder - b.DisplayOrder;
                });

                /*data.Channels[0].IsAuthorized = true;
                 data.Channels[0].ExtraAttributes[1].Value = 'http://playready.directtaps.net/pr/svc/rightsmanager.asmx?';
                 data.Channels[0].ExtraAttributes[5].Value = 'http://mediapm.edgesuite.net/ovp/content/test/video/supportplayer/wms/fist_bump_500k.wmv';
                 data.Channels[0].ExtraAttributes[4].Value = 'http://www-itec.uni-klu.ac.at/dash/js/content/bunny_ibmff_240.mpd';
                 */
                //https://kplus.stage.ott.irdeto.com/Widevine/GetLicense?CrmId=kplus&AccountId=kplus&ContentId=400000001&SessionId=63CE65A9049EAA06&Ticket=E9AF3B1AB59E9EB4
//https://ottstg-vt.kplus.vn/live/stag_kplus_1_hd/stag_kplus_1_hd.isml/stag_kplus_1_hd.mpd
                // console.log(JSON.stringify(data))

                //hardcoding a channel
                // data.Channels[3].ExtraAttributes[2].Value = "https://kplus.live.ott.irdeto.com/playready/rightsmanager.asmx?CrmId=kplus&AccountId=kplus&ContentId=400000017";
                // data.Channels[3].ExtraAttributes[6].Value = "https://ott-vt2.kplus.vn/live/prod_kplus_pm_hd/prod_kplus_pm_hd.isml/Manifest";

                // data.Channels[4].ExtraAttributes[2].Value = "https://kplus.live.ott.irdeto.com/playready/rightsmanager.asmx?CrmId=kplus&AccountId=kplus&ContentId=400000018";
                // data.Channels[4].ExtraAttributes[6].Value = "https://ott-vt2.kplus.vn/live/prod_kplus_pc_hd/prod_kplus_pc_hd.isml/Manifest";

                //hardcoding metadata
				//data.Channels[3].ExtraAttributes[0].Value = '2100';
				// data.Channels[3].ExtraAttributes[8].Value = '30';
				// data.Channels[3].ExtraAttributes[9].Value = '1800';
				// data.Channels[3].ExtraAttributes[10].Value = '30';


                if (kpAp.config.silverlightObj !== null) {
                    kpAp.config.channelsList = data.Channels;
                    kpAp.kpDash.userChannnels = data.Channels;
                    kpAp.config.silverlightObj.Content.kpSLapp.onGetChannelsResponseRecieved(JSON.stringify(data));
                } else {

                    kpAp.kpDash.userChannnels = data.Channels;
                    kpAp.config.channelsList = data.Channels;

                    $('#video-container > .preloading-splash-scrn-wrapper').css('display', 'none');

                    kpAp.kpDash.populateChannelsList();

                    /*if player default channel title avaialble in cookie then play that channel by default*/
                    if (kpAp.config.userPrefChannel !== '') {
                        var matchedMade = false;
                        kpAp.kpDash.userChannnels.forEach((chnl, idx) => {
                            if (chnl.Title.replace(/ /g, '') === kpAp.config.userPrefChannel.replace(/ /g, '')) {
                                matchedMade = true;
                        kpAp.kpDash.OnOverlayedChannelLogoClick(idx);
                    }
                });

                if (!matchedMade)
                    kpAp.kpDash.OnOverlayedChannelLogoClick(0);
            }
        else {
                        kpAp.kpDash.OnOverlayedChannelLogoClick(0);
        }
    }
    }
},
error: function (jqXHR, textStatus, errorThrown) {
    kpAp.kpDash.syncInternetDisconnection('CHL-101');
    if(textStatus === "timeout"){
        $('#video-container > .preloading-splash-scrn-wrapper').css('display', 'none');
        if (kpAp.config.silverlightObj !== null) {
            kpAp.config.silverlightObj.Content.kpSLapp.onAPITimeout('CHL-103');
        }else{
            kpAp.displayPlyrMsg(1,void 0,"CHL-103");
        }
        return;
    }

    var dateHeader = new Date(jqXHR.getResponseHeader('Date'));
    if(dateHeader.getYear() == new Date().getYear()){
        if (isResponsTimeDiffMoreThanTenMints(dateHeader)) {
            /*if (kpAp.config.silverlightObj !== null) {
                kpAp.config.silverlightObj.Content.kpSLapp.onDeviceTimeInCorrectError('CHL-104');
            }
            else {
                $('.plyr-err-msg-cnt').hide();
            }
            alert(kpAp.MultiLangSupportModule.getErrorMsg(2, kpAp.config.userPrefLanguage) + ' CHL-104');
            window.location = kpAp.config.kplusOTThomePageUrl;*/
            kpAp.globalTimeError('CHL-104');
            return;
        }
    }
                
    /*var errorMsg = kpAp.MultiLangSupportModule.getErrorMsg(9, kpAp.config.userPrefLanguage);*/
    if (kpAp.config.silverlightObj !== null) {
        /*kpAp.config.silverlightObj.Content.kpSLapp.undoOverlayDisappear();*/
    }

    //kpAp.gAnalyticsModule.fireGoogleAnalyticsEvnt('REST API', 'Failure', 'Timeout or response recieved with wronge status code');
    // KWEB-1143
    if (errorThrown != "") {
        kpAp.gAnalyticsModule.fireGoogleAnalyticsEvnt('REST API', 'EPG Channels', jqXHR.status + ' - ' + errorThrown);
    }else{
        kpAp.gAnalyticsModule.fireGoogleAnalyticsEvnt('REST API', 'EPG Channels', jqXHR.status + ' - ' + textStatus);
    }
    if (kpAp.config.silverlightObj !== null) {
        var errorTxt = 'error';
        kpAp.config.silverlightObj.Content.kpSLapp.onGetChannelsResponseRecieved(errorTxt);
    }else{
        kpAp.kpDash.syncInternetDisconnection('CHL-101');
    }
}
});
};

exports.getChannelEPG = function (channelId, language, startoverLength) {

    let epgStartTime = new Date();
    let epgDuration = 1440;


    if (typeof startoverLength != 'undefined' && startoverLength != '') {
        startoverLength = parseInt(startoverLength);
        startoverLength = startoverLength + 150;
        epgStartTime.setSeconds(epgStartTime.getSeconds() - startoverLength);
        epgDuration = 1920;
    }

    epgStartTime.setMinutes(0);
    epgStartTime.setSeconds(0);
    epgStartTime.setMilliseconds(0);


    let crntSysDate = new Date();

    if (kpAp.config.epgCallTParam < crntSysDate) {
        kpAp.config.epgCallTParam = new Date();
        kpAp.config.epgCallTParam.setMinutes(kpAp.config.epgCallTParam.getMinutes() + 5);
    }

    var dataToBsent = {
        channelIds: channelId,
        startDateTime: kpAp.kpDash.getSystemUTCtimestamp(epgStartTime),
        language: language,
        startWithinMinutes: epgDuration,
        t: kpAp.kpDash.getSystemUTCtimestamp(new Date(kpAp.config.epgCallTParam))
    };


    var urlParams = '?t='+ (new Date().getTime()).toString();

    /*var irdetoUserSessionId = kpAp.config.validateTokenResponse.IrdetoSession.SessionId;
    urlParams = '?SessionId=' + irdetoUserSessionId;
    var timeInSeconds = Math.round(new Date().getTime() / 1000);
    var encodedURL = encodeURIComponent(getChannelEPGAPIcallURL + urlParams).toLowerCase();
    var signature = getSignature(encodedURL, timeInSeconds);
    var authHeaderVal = 'sndplugin' + ':' + apiKeyId + ':' + signature + ':' + timeInSeconds;*/

    $.ajax({
        url: getChannelEPGAPIcallURL + urlParams,
        timeout: 180000,
        /*headers: {
            'Authorization': authHeaderVal
        },*/
        /*cache: false,*/
        method: 'GET',
        data: dataToBsent,
        success: function (data, textStatus, respn) {
            if (typeof data == 'string') {
                data = JSON.parse(data);
            }

            var dateHeader = new Date(respn.getResponseHeader('Date'));
            if (isResponsTimeDiffMoreThanTenMints(dateHeader)) {
                /*if (kpAp.config.silverlightObj !== null) {
                    kpAp.config.silverlightObj.Content.kpSLapp.onDeviceTimeInCorrectError('PGC-104');
                }
                else {
                    $('.plyr-err-msg-cnt').hide();
                }
                alert('-----' + kpAp.MultiLangSupportModule.getErrorMsg(2, kpAp.config.userPrefLanguage) + ' PGC-104');
                window.location = kpAp.config.kplusOTThomePageUrl;*/
                kpAp.globalTimeError('PGC-104');
                return;
            }

            if ('Error' in data || 'errorCode' in data) {
                /*window.location = kpAp.config.kplusOTThomePageUrl;*/
                if (kpAp.config.silverlightObj !== null) {
                    /*kpAp.config.silverlightObj.Content.kpSLapp.undoOverlayDisappear();*/
                }
                kpAp.config.flags.isChnlEpgAvailable = true;
                /*alert(kpAp.MultiLangSupportModule.getErrorMsg(9, kpAp.config.userPrefLanguage));*/
                //kpAp.gAnalyticsModule.fireGoogleAnalyticsEvnt('REST API', 'Failure', JSON.stringify(data));
            } else {

                /*var t1 = new Date(data.channels[0].Programs[0].LinearStartDateTime);
                 var t2 = new Date();
                 t2.setMinutes(t2.getMinutes()+1);
                 var dif = t1.getTime() - t2.getTime();
                 var Seconds_from_T1_to_T2 = dif / 1000;
                 var Seconds_Between_Dates = Math.floor(Math.abs(Seconds_from_T1_to_T2));

                 data.channels[0].Programs[0].DurationSeconds = ''+Seconds_Between_Dates;
                 data.channels[0].Programs[1].LinearStartDateTime = kpAp.kpDash.getSystemUTCtimestamp(t2);
                 data.channels[0].Programs[0].AdditionalInfo.OTTEnabled = 'false';*/

                /*data.channels[0].Programs.forEach((prog, idx) => {
                 if (idx % 2 == 0) {
                 prog.AdditionalInfo.OTTEnabled = 'true';
                 }
                 else {
                 prog.AdditionalInfo.OTTEnabled = 'false';
                 }
                 });*/





                if (kpAp.config.silverlightObj !== null) {
                    kpAp.kpDash.SLcurrentChannelPrograms = data.channels[0];
                    kpAp.config.silverlightObj.Content.kpSLapp.onGetChannelEPGResponseRecieved(JSON.stringify(data));
                } else {
                    kpAp.kpDash.currentChannelPrograms = data.channels[0];

                    kpAp.kpDash.setProgsStartEndTimes(kpAp.kpDash.currentChannelPrograms.Programs);

                    /*kpAp.kpDash.currentChannelPrograms.Programs = kpAp.kpDash.currentChannelPrograms.Programs.filter((prog, idx) => {
                        var progStartTime = prog.prog_start_time;
                        var progEndTime = prog.prog_end_time;

                        let crntSysTime = new Date();
                        if (crntSysTime >= progStartTime && crntSysTime < progEndTime) {
                            return false;
                        }
                        else{
                            return true;
                        }
                    });*/

                    kpAp.kpDash.findNSetCrntPlayringProgram();
                    kpAp.kpDash.isCrntProgramDetailsSynced = false;
                    kpAp.kpDash.isStartoverProgramDetailsSynced = false;
                    kpAp.config.flags.isChnlEpgAvailable = true;
                    kpAp.kpDash.populateStartoverBar();
                    kpAp.kpDash.populateEPGslideLeftBar();

                    if(kpAp.config.defaultContent != ''){
                        kpAp.kpDash.onStartoverProgramSelected(kpAp.config.defaultContent);
                    }

                }

                kpAp.config.defaultContent = '';

            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            kpAp.kpDash.syncInternetDisconnection('PGC-101');
            if(textStatus ==="timeout"){
                $('#video-container > .preloading-splash-scrn-wrapper').css('display', 'none');
                if (kpAp.config.silverlightObj !== null) {
                    kpAp.config.silverlightObj.Content.kpSLapp.onAPITimeout('PGC-103');
                }else{
                    kpAp.displayPlyrMsg(1,void 0,"PGC-103");
                }
                return;
            }

            kpAp.config.defaultContent = '';
            kpAp.kpDash.currentChannelPrograms = null;
            kpAp.kpDash.currentProgram = null;

            var dateHeader = new Date(jqXHR.getResponseHeader('Date'));
            if(dateHeader.getYear() == new Date().getYear()){
                if (isResponsTimeDiffMoreThanTenMints(dateHeader)) {
                    /*if (kpAp.config.silverlightObj !== null) {
                        kpAp.config.silverlightObj.Content.kpSLapp.onDeviceTimeInCorrectError('PGC-104');
                    }
                    else {
                        $('.plyr-err-msg-cnt').hide();
                    }
                    alert('-----' + kpAp.MultiLangSupportModule.getErrorMsg(2, kpAp.config.userPrefLanguage) + ' PGC-104');
                    window.location = kpAp.config.kplusOTThomePageUrl;*/
                    kpAp.globalTimeError('PGC-104');
                    return;
                }
            }


            var errorMsg = kpAp.MultiLangSupportModule.getErrorMsg(9, kpAp.config.userPrefLanguage);
            if (kpAp.config.silverlightObj !== null) {
                /*kpAp.config.silverlightObj.Content.kpSLapp.undoOverlayDisappear();*/
            }
            //kpAp.gAnalyticsModule.fireGoogleAnalyticsEvnt('REST API', 'Failure', 'Timeout or response recieved with wronge status code');
            // KWEB-1143
            if (errorThrown != "") {
                kpAp.gAnalyticsModule.fireGoogleAnalyticsEvnt('REST API', 'EPG Program Guide', jqXHR.status + ' - ' + errorThrown);
            }else{
                kpAp.gAnalyticsModule.fireGoogleAnalyticsEvnt('REST API', 'EPG Program Guide', jqXHR.status + ' - ' + textStatus);
            }
            if (kpAp.config.silverlightObj !== null) {
                var errorTxt = 'error';
                kpAp.config.silverlightObj.Content.kpSLapp.onGetChannelEPGResponseRecieved(errorTxt);
            }else{
                kpAp.kpDash.syncInternetDisconnection('PGC-101');
            }
        }
      
    });
};

exports.validateToken = function () {
    clearTimeout(exports.revalidationTimerId);

    if (kpAp.config.validationObj.AuthToken !== undefined) {
        var timeInSeconds = Math.round(new Date().getTime() / 1000);
        var encodedURL = encodeURIComponent(validateTokenAPIcallURL).toLowerCase();
        var signature = getSignature(encodedURL, timeInSeconds);
        var authHeaderVal = 'sndplugin' + ':' + apiKeyId + ':' + signature + ':' + timeInSeconds;

        var data2snd = {};


        if (kpAp.config.flags.isFirstValidationCall) {
            kpAp.config.flags.isFirstValidationCall = false;
        }
        else {
            kpAp.config.validationObj.SubscriberId = kpAp.config.validateTokenResponse.BBSData.UserData.SubscriberId;
        }


        return $.ajax({
            url: validateTokenAPIcallURL,
            timeout: 180000,
            headers: {
                'Authorization': authHeaderVal
            },
            method: 'POST',
            cache: false,
            data: kpAp.config.validationObj,
            success: function (data, textStatus, respn) {
                var respnObj = data;

                if (typeof respnObj === "string") {
                    respnObj = JSON.parse(respnObj);
                }

                var datestr = respn.getResponseHeader('Date');
                var dateHeader = new Date(datestr);
                if (isResponsTimeDiffMoreThanTenMints(dateHeader)) {
                    /*if (kpAp.config.silverlightObj !== null) {
                        kpAp.config.silverlightObj.Content.kpSLapp.onDeviceTimeInCorrectError('VDT-104');
                    }
                    else {
                        $('.plyr-err-msg-cnt').hide();
                    }
                    var errorMsg = kpAp.MultiLangSupportModule.getErrorMsg(2, kpAp.config.userPrefLanguage) + ' VDT-104';
                    alert(errorMsg);
                    window.location = kpAp.config.kplusOTThomePageUrl;*/
                    kpAp.globalTimeError('VDT-104');
                    return;
                }

                if ('Error' in respnObj || 'errorCode' in respnObj) {
                    if (kpAp.config.silverlightObj !== null) {
                        kpAp.config.silverlightObj.Content.kpSLapp.onValidateTokenResponseRecieved(null);
                    }else{
                        kpAp.kpDash.syncInternetDisconnection('VDT-101');
                    }
                        
                    if (!kpAp.config.flags.isThisRevalidationReq) {
                        /*alert(kpAp.MultiLangSupportModule.getErrorMsg(0, kpAp.config.userPrefLanguage));*/
                    }

                    /*alert('in body error');*/

                    try {
                        document.getElementById('logoutForm').submit();
                    } catch (e) {
                        window.location = kpAp.config.kplusOTThomePageUrl;
                    }
                    //kpAp.gAnalyticsModule.fireGoogleAnalyticsEvnt('REST API', 'Failure', JSON.stringify(data));
                } else {
                    if (kpAp.config.silverlightObj !== null) {
                        kpAp.config.validateTokenResponse = respnObj;
                        kpAp.config.validationObj.AuthToken = kpAp.config.validateTokenResponse.BBSData.AuthToken;
                        exports.sheduleRevalidation();
                        kpAp.config.silverlightObj.Content.kpSLapp.onValidateTokenResponseRecieved(JSON.stringify(respnObj));
                    } else {
                        kpAp.config.validateTokenResponse = respnObj;
                        kpAp.config.validationObj.AuthToken = kpAp.config.validateTokenResponse.BBSData.AuthToken;
                        kpAp.maxRetriesAttempt = kpAp.config.validateTokenResponse.IrdetoSession.ConcurrentStreamInfo.MaxMissedHeartbeats;
                        exports.sheduleRevalidation();
                    }
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                kpAp.kpDash.syncInternetDisconnection('VDT-101');
                if(textStatus ==="timeout"){
                    $('#video-container > .preloading-splash-scrn-wrapper').css('display', 'none');
                    if (kpAp.config.silverlightObj !== null) {
                        kpAp.config.silverlightObj.Content.kpSLapp.onAPITimeout('VDT-103');
                    }else{
                        kpAp.displayPlyrMsg(1,void 0,"VDT-103");
                    }
                    return;
                }

                var datestr = jqXHR.getResponseHeader('Date');
                var dateHeader = new Date(datestr);
                if(dateHeader.getYear() == new Date().getYear()){
                    if (isResponsTimeDiffMoreThanTenMints(dateHeader)) {
                        /*if (kpAp.config.silverlightObj !== null) {
                            kpAp.config.silverlightObj.Content.kpSLapp.onDeviceTimeInCorrectError('VDT-104');
                        }
                        else {
                            $('.plyr-err-msg-cnt').hide();
                        }
                        var errorMsg = kpAp.MultiLangSupportModule.getErrorMsg(2, kpAp.config.userPrefLanguage) + ' VDT-104';
                        alert(errorMsg);
                        window.location = kpAp.config.kplusOTThomePageUrl;*/
                        kpAp.globalTimeError('VDT-104');
                        return;
                    }
                }

                if (kpAp.config.flags.isThisRevalidationReq) {
                    exports.sheduleRevalidation();
                    return;
                }

                //kpAp.gAnalyticsModule.fireGoogleAnalyticsEvnt('REST API', 'Failure', 'Timeout or response recieved with wronge status code');

                
                if (errorThrown != "") {
                    kpAp.gAnalyticsModule.fireGoogleAnalyticsEvnt('REST API', 'Validate Token', jqXHR.status + ' - ' + errorThrown);
                }else{
                    kpAp.gAnalyticsModule.fireGoogleAnalyticsEvnt('REST API', 'Validate Token', jqXHR.status + ' - ' + textStatus);
                }
                if (kpAp.config.silverlightObj !== null) {
                    var errorTxt = 'error';
                    kpAp.config.silverlightObj.Content.kpSLapp.onValidateTokenResponseRecieved(errorTxt);
                }else{
                    kpAp.kpDash.syncInternetDisconnection('VDT-101');
                }

                try {
                    document.getElementById('logoutForm').submit();
                } catch (e) {
                    window.location = kpAp.config.kplusOTThomePageUrl;
                }
            }
        });
    } else {
        window.location = kpAp.config.kplusOTThomePageUrl;
    }
};

exports.getContentDetailsForCurrentProgram = function (contentId, language, size) {
    var dataToBeSent = {
        contentIds: contentId,
        language: language,
        size: size,
        filterEntitlements: 'OFF'
    };

    var timeInSeconds = Math.round(new Date().getTime() / 1000);
    var encodedURL = encodeURIComponent(getContentAPIcallURL).toLowerCase();
    var signature = getSignature(encodedURL, timeInSeconds);

    var authHeaderVal = 'sndplugin' + ':' + apiKeyId + ':' + signature + ':' + timeInSeconds;

    $.ajax({
        url: getContentAPIcallURL,
        timeout: 180000,
        headers: {
            'Authorization': authHeaderVal
        },
        method: 'POST',
        cache: false,
        data: dataToBeSent,
        success: function (data, textStatus, respn) {
            function formateInconsistentEntries(data) {
                var temp = data.Contents[0].AdditionalInfo.Rebroadcast;
                if (temp === undefined || temp === '') {
                    data.Contents[0].AdditionalInfo.Rebroadcast = [];
                } else {
                    temp = JSON.parse(temp);
                    temp.forEach((tmp) => {
                        tmp.StartTime = new Date(parseInt(tmp.StartTime) * 1000);
                });

                data.Contents[0].AdditionalInfo.Rebroadcast = temp;
            }
        }

            if (typeof data === 'string') {
                data = JSON.parse(data);
            }

    var dateHeader = new Date(respn.getResponseHeader('Date'));
    if (isResponsTimeDiffMoreThanTenMints(dateHeader)) {
        /*if (kpAp.config.silverlightObj !== null) {
            kpAp.config.silverlightObj.Content.kpSLapp.onDeviceTimeInCorrectError('CNT-104');
        }
        else {
            $('.plyr-err-msg-cnt').hide();
        }
        alert(kpAp.MultiLangSupportModule.getErrorMsg(2, kpAp.config.userPrefLanguage) + ' CNT-104');
        window.location = kpAp.config.kplusOTThomePageUrl;*/
        kpAp.globalTimeError('CNT-104');
        return;
    }

    if ('Error' in data || 'errorCode' in data) {
        /*window.location = kpAp.config.kplusOTThomePageUrl;*/
        if (kpAp.config.silverlightObj !== null) {
            /*kpAp.config.silverlightObj.Content.kpSLapp.undoOverlayDisappear();*/
        }
        /*alert(kpAp.MultiLangSupportModule.getErrorMsg(9, kpAp.config.userPrefLanguage));*/
        //kpAp.gAnalyticsModule.fireGoogleAnalyticsEvnt('REST API', 'Failure', JSON.stringify(data));
    } else {


        formateInconsistentEntries(data);

        if (kpAp.config.silverlightObj !== null) {

            kpAp.config.silverlightObj.Content.kpSLapp.onGetContentResponseRecieved(JSON.stringify(data));

            /*kpAp.kpDash.loadChannelStartoverEPG(kpAp.config.crntPlayingChannelIndex);*/

        } else {

            kpAp.kpDash.currentProgramDetails = data;

            kpAp.kpDash.onInfoScrnSubButtonclick(1);
            kpAp.kpDash.populateEPGslideLeftBar();
        }
    }
},
error: function (jqXHR, textStatus, errorThrown) {
    kpAp.kpDash.syncInternetDisconnection('CNT-101');
    if(textStatus ==="timeout"){
        $('#video-container > .preloading-splash-scrn-wrapper').css('display', 'none');
        if (kpAp.config.silverlightObj !== null) {
            kpAp.config.silverlightObj.Content.kpSLapp.onAPITimeout('CNT-103');
        }else{
            kpAp.displayPlyrMsg(1,void 0,"CNT-103");
        }
        return;
    }

                
    var dateHeader = new Date(jqXHR.getResponseHeader('Date'));
    if(dateHeader.getYear() == new Date().getYear()){
        if (isResponsTimeDiffMoreThanTenMints(dateHeader)) {
            /*if (kpAp.config.silverlightObj !== null) {
                kpAp.config.silverlightObj.Content.kpSLapp.onDeviceTimeInCorrectError('CNT-104');
            }
            else {
                $('.plyr-err-msg-cnt').hide();
            }
            setTimeout(function(){
                alert(kpAp.MultiLangSupportModule.getErrorMsg(2, kpAp.config.userPrefLanguage) + ' CNT-104');
            },0)
            window.location = kpAp.config.kplusOTThomePageUrl;*/
            kpAp.globalTimeError('CNT-104');
            return;
        }
    }


    var errorMsg = kpAp.MultiLangSupportModule.getErrorMsg(9, kpAp.config.userPrefLanguage);
    if (kpAp.config.silverlightObj !== null) {
        /*kpAp.config.silverlightObj.Content.kpSLapp.undoOverlayDisappear();*/
    }
    //kpAp.gAnalyticsModule.fireGoogleAnalyticsEvnt('REST API', 'Failure', 'Timeout or response recieved with wronge status code');
    

    
    if (errorThrown != "") {
        kpAp.gAnalyticsModule.fireGoogleAnalyticsEvnt('REST API', 'Program Detail', jqXHR.status + ' - ' + errorThrown);
    }else{
        kpAp.gAnalyticsModule.fireGoogleAnalyticsEvnt('REST API', 'Program Detail', jqXHR.status + ' - ' + textStatus);
    }
    if (kpAp.config.silverlightObj !== null) {
        var errorTxt = 'error';
        kpAp.config.silverlightObj.Content.kpSLapp.onGetContentResponseRecieved(errorTxt);
    }else{
        kpAp.kpDash.syncInternetDisconnection('CNT-101');
    }
}
});
};

exports.getContentDetailsForStartoverProgram = function (contentId, language, size) {
    var dataToBeSent = {
        contentIds: contentId,
        language: language,
        size: size,
        filterEntitlements: 'OFF'
    };

    var timeInSeconds = Math.round(new Date().getTime() / 1000);
    var encodedURL = encodeURIComponent(getContentAPIcallURL).toLowerCase();
    var signature = getSignature(encodedURL, timeInSeconds);

    var authHeaderVal = 'sndplugin' + ':' + apiKeyId + ':' + signature + ':' + timeInSeconds;
    $.ajax({
        url: getContentAPIcallURL,
        timeout: 180000,
        headers: {
            'Authorization': authHeaderVal
        },
        method: 'POST',
        cache: false,
        data: dataToBeSent,
        success: function (data, textStatus, respn) {
            function formateInconsistentEntries(data) {
                var temp = data.Contents[0].AdditionalInfo.Rebroadcast;
                if (temp === undefined || temp === '') {
                    data.Contents[0].AdditionalInfo.Rebroadcast = [];
                } else {
                    temp = JSON.parse(temp);
                    temp.forEach((tmp) => {
                        tmp.StartTime = new Date(parseInt(tmp.StartTime) * 1000);
                });

                data.Contents[0].AdditionalInfo.Rebroadcast = temp;
            }
        }

            if (typeof data === 'string') {
                data = JSON.parse(data);
            }

    var dateHeader = new Date(respn.getResponseHeader('Date'));
    if (isResponsTimeDiffMoreThanTenMints(dateHeader)) {
        /*if (kpAp.config.silverlightObj !== null) {
            kpAp.config.silverlightObj.Content.kpSLapp.onDeviceTimeInCorrectError('CNT-104');
        }
        else {
            $('.plyr-err-msg-cnt').hide();
        }
        alert(kpAp.MultiLangSupportModule.getErrorMsg(2, kpAp.config.userPrefLanguage) + ' CNT-104');
        window.location = kpAp.config.kplusOTThomePageUrl;*/
        kpAp.globalTimeError('CNT-104');
        return;
    }

    if ('Error' in data || 'errorCode' in data) {
        /*window.location = kpAp.config.kplusOTThomePageUrl;*/
        if (kpAp.config.silverlightObj !== null) {
            /*kpAp.config.silverlightObj.Content.kpSLapp.undoOverlayDisappear();*/
        }
        /*alert(kpAp.MultiLangSupportModule.getErrorMsg(9, kpAp.config.userPrefLanguage));*/
        //kpAp.gAnalyticsModule.fireGoogleAnalyticsEvnt('REST API', 'Failure', JSON.stringify(data));
    } else {


        formateInconsistentEntries(data);

        if (kpAp.config.silverlightObj !== null) {

            let s = JSON.stringify(data);
            kpAp.config.silverlightObj.Content.kpSLapp.onGetContentResponseRecievedForStartover(s);

            /*kpAp.kpDash.loadChannelStartoverEPG(kpAp.config.crntPlayingChannelIndex);*/

        } else {

            kpAp.kpDash.startoverProgramDetails = data;


            kpAp.kpDash.onInfoScrnSubButtonclick(1);
            kpAp.kpDash.populateEPGslideLeftBar();
        }
    }
},
error: function (jqXHR, textStatus, errorThrown) {
    kpAp.kpDash.syncInternetDisconnection('CNT-101');
    if(textStatus ==="timeout"){
        $('#video-container > .preloading-splash-scrn-wrapper').css('display', 'none');
        if (kpAp.config.silverlightObj !== null) {
            kpAp.config.silverlightObj.Content.kpSLapp.onAPITimeout('CNT-103');
        }else{
            kpAp.displayPlyrMsg(1,void 0,"CNT-103");
        }
        return;
    }

    var dateHeader = new Date(jqXHR.getResponseHeader('Date'));
    if(dateHeader.getYear() == new Date().getYear()){
        if (isResponsTimeDiffMoreThanTenMints(dateHeader)) {
            /*if (kpAp.config.silverlightObj !== null) {
                kpAp.config.silverlightObj.Content.kpSLapp.onDeviceTimeInCorrectError('CNT-104');
            }
            else {
                $('.plyr-err-msg-cnt').hide();
            }
            setTimeout(function(){
                alert(kpAp.MultiLangSupportModule.getErrorMsg(2, kpAp.config.userPrefLanguage) + ' CNT-104');
            },0)
            window.location = kpAp.config.kplusOTThomePageUrl;*/
            kpAp.globalTimeError('CNT-104');
            return;
        }
    }


    var errorMsg = kpAp.MultiLangSupportModule.getErrorMsg(9, kpAp.config.userPrefLanguage);
    if (kpAp.config.silverlightObj !== null) {
        /*kpAp.config.silverlightObj.Content.kpSLapp.undoOverlayDisappear();*/
    }
    //kpAp.gAnalyticsModule.fireGoogleAnalyticsEvnt('REST API', 'Failure', 'Timeout or response recieved with wronge status code');
    
    // KWEB-1143
    if (errorThrown != "") {
        kpAp.gAnalyticsModule.fireGoogleAnalyticsEvnt('REST API', 'Content Detail', jqXHR.status + ' - ' + errorThrown);
    }else{
        kpAp.gAnalyticsModule.fireGoogleAnalyticsEvnt('REST API', 'Content Detail', jqXHR.status + ' - ' + textStatus);
    }
    if (kpAp.config.silverlightObj !== null) {
        var errorTxt = 'error';
        kpAp.config.silverlightObj.Content.kpSLapp.onGetContentResponseRecieved(errorTxt);
    }else{
        kpAp.kpDash.syncInternetDisconnection('CNT-101');
    }
}
});
};


exports.CSMchannelPausedCall = function () {
    var CSRreqUrl = kpAp.config.validateTokenResponse.IrdetoSession.ConcurrentStreamInfo.Url;
    var deviceId = kpAp.config.validationObj.DeviceId;

   
    var temp = browserInfo.name + kpAp.config.validateTokenResponse.IrdetoSession.SessionId;
    if(deviceId != temp){
        deviceId = temp;
        kpAp.config.validationObj.DeviceId = temp;
        setCookie('kpluswebplayer_device_id', kpAp.config.validationObj.DeviceId, 730);
    }

    CSRreqUrl += deviceId;

    var timeInSeconds = Math.round(new Date().getTime() / 1000);
    var encodedURL = encodeURIComponent(CSRreqUrl).toLowerCase();
    var signature = getSignature(encodedURL, timeInSeconds);

    var heartBeatReqBody = {
        "heartbeat": {
            "nonce": kpAp.config.validateTokenResponse.IrdetoSession.ConcurrentStreamInfo.Nonce,
            "contentId": kpAp.config.channelsList[kpAp.config.crntPlayingChannelIndex].ChannelId,
            "status": "PAUSED",
            "sessionToken": kpAp.config.validateTokenResponse.IrdetoSession.ConcurrentStreamInfo.SessionToken
        }
    };

    var dataStr = JSON.stringify(heartBeatReqBody);

    var reqTime = new Date();
    return $.ajax({
        url: CSRreqUrl,
        method: 'POST',
        data: dataStr,
        timeout: 180000,
        contentType: 'application/json',
        success: function (data, textStatus, respn) {
            //
            //saveUsernameToLocalStorage(kpAp.config.validateTokenResponse.BBSData.UserData.Email)
            //logCSM("Live", kpAp.config.validateTokenResponse.IrdetoSession.ConcurrentStreamInfo.Nonce,deviceId, kpAp.config.channelsList[kpAp.config.crntPlayingChannelIndex].ChannelId, "PAUSED", kpAp.config.validateTokenResponse.IrdetoSession.ConcurrentStreamInfo.SessionToken, data, reqTime);

           
            
        },
        error: function (jqXHR, textStatus, errorThrown) {
            if (kpAp.config.silverlightObj !== null) {
                kpAp.config.silverlightObj.Content.kpSLapp.onCSMrespNOKrcvd(null);
            }
        }
    });
};

exports.CSMheartBeatCall = function (statusTxt) {
    var CSRreqUrl = kpAp.config.validateTokenResponse.IrdetoSession.ConcurrentStreamInfo.Url;
    var deviceId = kpAp.config.validationObj.DeviceId;

    
    var temp = browserInfo.name + kpAp.config.validateTokenResponse.IrdetoSession.SessionId;
    if(deviceId != temp){
        deviceId = temp;
        kpAp.config.validationObj.DeviceId = temp;
        setCookie('kpluswebplayer_device_id', kpAp.config.validationObj.DeviceId, 730);
    }

    CSRreqUrl = CSRreqUrl + deviceId;

    var timeInSeconds = Math.round(new Date().getTime() / 1000);
    var encodedURL = encodeURIComponent(CSRreqUrl).toLowerCase();
    var signature = getSignature(encodedURL, timeInSeconds);

    var heartBeatReqBody = {
        "heartbeat": {
            "nonce": kpAp.config.validateTokenResponse.IrdetoSession.ConcurrentStreamInfo.Nonce,
            "contentId": kpAp.config.channelsList[kpAp.config.crntPlayingChannelIndex].ChannelId,
            "status": statusTxt,
            "sessionToken": kpAp.config.validateTokenResponse.IrdetoSession.ConcurrentStreamInfo.SessionToken
        }
    };

    var dataStr = JSON.stringify(heartBeatReqBody);
    var reqTime = new Date();
    return $.ajax({
        url: CSRreqUrl,
        method: 'POST',
        data: dataStr,
        timeout: 180000,
        contentType: 'application/json',
        success: function (data, textStatus, respn) {
            //
            //
            //saveUsernameToLocalStorage(kpAp.config.validateTokenResponse.BBSData.UserData.Email)
            //logCSM("Live", kpAp.config.validateTokenResponse.IrdetoSession.ConcurrentStreamInfo.Nonce,deviceId, kpAp.config.channelsList[kpAp.config.crntPlayingChannelIndex].ChannelId, statusTxt, kpAp.config.validateTokenResponse.IrdetoSession.ConcurrentStreamInfo.SessionToken, data, reqTime);

            
        }
    });
};

exports.getAppConfigDirect = function () {
    var urlParams = '?ApiKeyId=' + apiKeyId + '&file=config' + '&attach=web';

    var timeInSeconds = Math.round(new Date().getTime() / 1000);
    var encodedURL = encodeURIComponent(getAppConfigDirectAPIcallURL + urlParams).toLowerCase();
    var signature = getSignature(encodedURL, timeInSeconds);

    var authHeaderVal = 'sndplugin' + ':' + apiKeyId + ':' + signature + ':' + timeInSeconds;

    $.ajax({
        url: getAppConfigDirectAPIcallURL + urlParams,
        timeout: 180000,
        headers: {
            'Authorization': authHeaderVal
        },
        method: 'GET',
        success: function (data, textStatus, respn) {
            if (typeof data == 'string') {
                data = JSON.parse(data);
            }

            var dateHeader = new Date(respn.getResponseHeader('Date'));
            if (isResponsTimeDiffMoreThanTenMints(dateHeader)) {
                return;
            }

            if ('Error' in data || 'errorCode' in data) {
                if (kpAp.config.silverlightObj != null) {
                        
                }else{
                    kpAp.kpDash.syncInternetDisconnection('CFG-101');
                }
                    
                /*window.location = kpAp.config.kplusOTThomePageUrl;*/
                /*alert('could not initialize Google analytics response recieved containing error in getAppConfig API call \n Data recieved: ' + data);*/
            } else {
                if (kpAp.config.silverlightObj !== null) {
                    kpAp.config.getAppConfigDirectResponse = data;
                    /*                        kpAp.gAnalyticsModule.gAnalyticsTrackingId = data.web.google.trackingid;*/
                } else {
                    kpAp.config.getAppConfigDirectResponse = data;
                    /*                       kpAp.gAnalyticsModule.gAnalyticsTrackingId = data.web.google.trackingid;*/                    }
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            if (errorThrown != "") {
                kpAp.gAnalyticsModule.fireGoogleAnalyticsEvnt('REST API', 'Configuration', jqXHR.status + ' - ' + errorThrown);
            }else{
                kpAp.gAnalyticsModule.fireGoogleAnalyticsEvnt('REST API', 'Configuration', jqXHR.status + ' - ' + textStatus);
            }
        }
    });
};


exports.decryptUsingAES = function (plainText, key) {

    function copy16Bytes(buffer) {
        var bytes = new Uint8Array(buffer);
        var output = new ArrayBuffer(16);
        var outputBytes = new Uint8Array(output);
        for (var i = 0; i < 16; i++)
            outputBytes[i] = bytes[i];
        return output;
    }

    var base64Text = plainText;
    var base64Key = key;

    var decodedKey = atob(base64Key);
    var keyBytes = new Array(decodedKey.length);
    for (var i = 0; i < decodedKey.length; i++) {
        keyBytes[i] = decodedKey.charCodeAt(i);
    }
    keyBytes = new Uint8Array(keyBytes);
    var iv = copy16Bytes(keyBytes);

    var decodedText = atob(base64Text);
    var textBytes = new Array(decodedText.length);
    for (var i = 0; i < decodedText.length; i++) {
        textBytes[i] = decodedText.charCodeAt(i);
    }
    textBytes = new Uint8Array(textBytes);

    var asmDycrptResultArray = asmCrypto.AES_CBC.decrypt(textBytes, keyBytes, 'PKCS#7', iv);

    var decryptedStr = '';
    for (var i = 0; i < asmDycrptResultArray.byteLength; i++) {
        decryptedStr += String.fromCharCode(asmDycrptResultArray[i]);
    }

    return decryptedStr;
};
return exports;
}({});


kpAp.gAnalyticsModule = require('./module-gAnalytics');


kpAp.HTMLtemplatesLoader = require('./module-htmlTplsLoader');

function readInfoFrmURLParams() {
    var qd = {};

    location.search.substr(1).split("&").forEach((item) => {
        var s = item.split("="),
        k = s[0],
        v = s[1] && decodeURIComponent(s[1]);
    (k in qd) ? qd[k].push(v) : qd[k] = [v]
});


if (qd.channel != undefined) {
    kpAp.config.userPrefChannel = qd.channel[0];
}

if (qd.content != undefined) {
    kpAp.config.defaultContent = qd.content[0];
}
}

function readInfoFrmCookies() {
    function generateUUID() {
        var d = new Date().getTime();
        if (window.performance && typeof window.performance.now === "function") {
            d += performance.now();
            
        }
        var uuid = 'xxxxxxxx4xxyxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
    }

    var playerDefaultChannel = getCookie('kpluswebplayer_default_channel');

    var deviceId = getCookie('kpluswebplayer_device_id');

    var authToken = getCookie('kpluswebplayer_authtoken');
    var subscriberId = getCookie('kpluswebplayer_subscriber_id');
    var mustRevalidate = getCookie('kpluswebplayer_must_revalidate');
    var expirationDate = getCookie('kpluswebplayer_expiration_date');
    var technicalOffer = getCookie('kpluswebplayer_technical_offer');
    var extensionWhenBSSDown = getCookie('kpluswebplayer_extension_when_BSS_down');

    if (playerDefaultChannel !== '') {
        if (kpAp.config.userPrefChannel === '') {
            kpAp.config.userPrefChannel = playerDefaultChannel;
        }
    }

    if (deviceId !== '') {
        kpAp.config.validationObj.DeviceId = deviceId;
    } else {
        //kpAp.config.validationObj.DeviceId = '' + browserInfo.name + generateUUID();
        kpAp.config.validationObj.DeviceId = browserInfo.name;
        setCookie('kpluswebplayer_device_id', kpAp.config.validationObj.DeviceId, 730);
    }

    if (authToken !== '') {
        kpAp.config.validationObj.AuthToken = authToken;
    }

    if (subscriberId !== '') {
        kpAp.config.validationObj.SubscriberId = subscriberId;
    }

    if (mustRevalidate !== '') {
        kpAp.config.validationObj.MustRevalidate = mustRevalidate;
    }

    if (expirationDate !== '') {
        kpAp.config.validationObj.ExpirationDate = expirationDate;
    }

    if (technicalOffer !== '') {
        kpAp.config.validationObj.TechnicalOffer = technicalOffer;
    }

    if (extensionWhenBSSDown !== '') {
        kpAp.config.validationObj.ExtensionWhenBSSDown = extensionWhenBSSDown;
    }
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";path=/;" + expires;
}

function eraseCookie(cname) {
    document.cookie = encodeURIComponent(cname) + "=deleted; expires=" + new Date(0).toUTCString();
}


function Dispose() {
    //CSMCall("PAUSED", contentId);
    setCookieToNull("C_Content_Id");
    setCookieToNull("C_Tab_Id");
    //clearTimeout(csmSync);
};

function onCSMPlay() {
    if (kpAp.tabId == null || kpAp.tabId == '') {
        kpAp.tabId = generateUUID();
    }
    
    if (getCookie("C_Tab_Id") === '') {
        setCSMCookie("C_Tab_Id", kpAp.tabId);
    }
    if (getCookie("C_Content_Id") !== '') {
        if (getCookie("C_Tab_Id") == kpAp.tabId) {
            //VOD Call
            CSMCall("PAUSED", getCookie("C_Content_Id"));
        } else {
            if (kpAp.config.silverlightObj !== null) {
                kpAp.config.silverlightObj.Content.kpSLapp.showCSMError();
            } else {
                kpAp.displayPlyrMsg(3, void 0, "CSM-1004");
                if (bitmovin.player(this.dashContainerUniqueId).isPlaying()) {
                    bitmovin.player(this.dashContainerUniqueId).unload();
                }
            }
        }
    }
};
function onCSMPlayChannelChange() {
    
    ////////////////////////////////
    if (kpAp.tabId == null || kpAp.tabId == '') {
        kpAp.tabId = generateUUID();
    }
    
    if (getCookie("C_Tab_Id") === '') {
        setCSMCookie("C_Tab_Id", kpAp.tabId);
    }
    if (getCookie("C_Content_Id") !== '') {
        if (getCookie("C_Tab_Id") == kpAp.tabId) {
            //VOD Call
            CSMCall("PAUSED", getCookie("C_Content_Id"));

            
            kpAp.runPlayer = true;
            
            $(window).bind('beforeunload', function () {
                if (getCookie("C_Tab_Id") == kpAp.tabId) {
                    setCookieToNull("C_Tab_Id");
                }
            });
        } else {
            
            kpAp.runPlayer = false;
            if (kpAp.config.silverlightObj !== null) {
                kpAp.config.silverlightObj.Content.kpSLapp.showCSMError();
            } else {
                kpAp.displayPlyrMsg(3, void 0, "CSM-1004");
                if (bitmovin.player(this.dashContainerUniqueId).isPlaying()) {
                    bitmovin.player(this.dashContainerUniqueId).unload();
                }
            }
        }
    }else{
        if (getCookie("C_Tab_Id") == kpAp.tabId) {
            
            kpAp.runPlayer = true;
            
            $(window).bind('beforeunload', function () {
                if (getCookie("C_Tab_Id") == kpAp.tabId) {
                    setCookieToNull("C_Tab_Id");
                }
            });
        }
    }
};
function generateUUID() {
    var d = new Date().getTime();
    if (window.performance && typeof window.performance.now === "function") {
        d += performance.now();
        
    }
    var uuid = 'xxxxxxxx4xxyxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : r & 0x3 | 0x8).toString(16);
    });
    return uuid;
}
function setCookieToNull(cname) {
    //document.cookie = encodeURIComponent(cname) + "=deleted; expires=" + new Date(0).toUTCString();
    setCSMCookie(cname, "");
}
function setCSMCookie(cname, cvalue, path, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    var expires = "; expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + expires + "; path=/";
}

function getSignature2(url, timeStamp) {
    var key = "A93reRTUJHsCuQSHR+L3GxqOJyDmQpCgps102ciuabc=";
    var apiKeyId = '44CF9590006BF252F707';
    var strToBeSigned = '' + apiKeyId + url + timeStamp;
    var asmCryptoResult = asmCrypto.HMAC_SHA256.base64(strToBeSigned, atob(key));
    return asmCryptoResult;

    /*var keyBase64 = CryptoJS.enc.Base64.parse(key);
     var hash = CryptoJS.HmacSHA256(strToBeSigned, keyBase64);
     var hashBase64 = hash.toString(CryptoJS.enc.Base64);
     console.log('CryptoJS calc: ' + hashBase64);
     return hashBase64;*/
}
function CSMCall(statusTxt, contentId) {
    var CSRreqUrl = kpAp.config.validateTokenResponse.IrdetoSession.ConcurrentStreamInfo.Url;
    var deviceId = kpAp.config.validationObj.DeviceId;
    
    var temp = browserInfo.name + kpAp.config.validateTokenResponse.IrdetoSession.SessionId;
    if(deviceId != temp){
        deviceId = temp;
        kpAp.config.validationObj.DeviceId = temp;
        setCookie('kpluswebplayer_device_id', kpAp.config.validationObj.DeviceId, 730);
    }
    
    CSRreqUrl = CSRreqUrl + deviceId;

    var timeInSeconds = Math.round(new Date().getTime() / 1000);
    var encodedURL = encodeURIComponent(CSRreqUrl).toLowerCase();
    var signature = getSignature2(encodedURL, timeInSeconds);

    var heartBeatReqBody = {
        "heartbeat": {
            "nonce": kpAp.config.validateTokenResponse.IrdetoSession.ConcurrentStreamInfo.Nonce,
            "contentId": parseInt(contentId),
            "status": statusTxt,
            "sessionToken": kpAp.config.validateTokenResponse.IrdetoSession.ConcurrentStreamInfo.SessionToken
        }
    };

    var dataStr = JSON.stringify(heartBeatReqBody);
    var reqTime = new Date();
    return $.ajax({
        url: CSRreqUrl,
        method: 'POST',
        async: false,
        data: dataStr,
        timeout: 180000,
        contentType: 'application/json',
        success: function (data, textStatus, respn) {
            //
            //saveUsernameToLocalStorage(kpAp.config.validateTokenResponse.BBSData.UserData.Email)
            //logCSM("Live", kpAp.config.validateTokenResponse.IrdetoSession.ConcurrentStreamInfo.Nonce,deviceId, parseInt(contentId), statusTxt, kpAp.config.validateTokenResponse.IrdetoSession.ConcurrentStreamInfo.SessionToken, data, reqTime);

        }
    });
}


kpAp.kpDash = {
    userChannnels: [],
    
    userPrefVideoBufferLength: 20,
    currentChannelPrograms: null,
    currentProgram: null,
    currentProgramDetails: null,
    isNextBroadcastBarDisplayed: false,
    isOverlayed: false,
    
    chartCurrentHorizontalPosition: 0,
    
    chartCurrentVerticlePosition: 0,

    chartPrevVerticlePosition: -1,
    currentBitrate: 0,
    mousehoverTimerId: null,
    maxRetriesAttempt: null,

    dashContainerUniqueId: undefined,

    isCentralPopupVisible: false,
    isMouseOverChannelsList: false,
    isMouseOverVideoCntrlBar: false,
    isMouseOverNextBttnEPGscrollBar: false,

    playerVolume: 100,
    ovrlayMousMovDisableCntr: 2,
    idleTimeKPoverlay: 0,
    cache: {},

    lastFngrPrntTag: "em",
    fngrPrnt: {
        shldFngrPrntVisible: false,
        chnlObj: null,
        fngrPrntPos: [
            "",
            "top:23%;left:2%",
            "top:23%;left:48%",
            "top:23%;right:2%",
            "top:43%;left:2%",
            "top:43%;left:48%",
            "top:43%;right:2%",
            "top:63%;left:2%",
            "top:63%;left:48%",
            "top:63%;right:2%"
        ]
    },

    lastDsplydErrMsgIndex: null,
    startoverProgramToBeSeekedVal: null,

    crntChannelStartoverParams: {},

    timeShiftParams: {
        timeShiftValue: null,
        timeShiftedToDate: null
    },

    isNoInfoNotificationClickedForCrntProg: false,

    lastEndedProgramContentId: '',

   
    getSystemUTCtimestamp(crntSysTime) {

        if (typeof crntSysTime == 'string') {
            crntSysTime = new Date(crntSysTime);
        }

crntSysTime = crntSysTime || new Date();
var crntUTCyear = crntSysTime.getUTCFullYear();
var crntUTCdate = crntSysTime.getUTCDate();
var crntUTCmnth = crntSysTime.getUTCMonth() + 1;
var crntUTChour = crntSysTime.getUTCHours();
var crntUTCmints = crntSysTime.getUTCMinutes();
var crntUTCscnds = crntSysTime.getUTCSeconds();

if (crntUTCdate.toString().length === 1) {
    crntUTCdate = "0" + crntUTCdate;
}
if (crntUTCmnth.toString().length === 1) {
    crntUTCmnth = "0" + crntUTCmnth;
}
if (crntUTChour.toString().length === 1) {
    crntUTChour = "0" + crntUTChour;
}
if (crntUTCmints.toString().length === 1) {
    crntUTCmints = "0" + crntUTCmints;
}
if (crntUTCscnds.toString().length === 1) {
    crntUTCscnds = "0" + crntUTCscnds;
}

var systemUTCString = '' + crntUTCyear + '-' + crntUTCmnth + '-' + crntUTCdate + 'T' + crntUTChour + ':' + crntUTCmints + ':' + crntUTCscnds + 'z';

return systemUTCString;
},

getUTCtimestampForStartoverVod(crntSysTime) {

    if (typeof crntSysTime == 'string') {
        crntSysTime = new Date(crntSysTime);
    }

    crntSysTime = crntSysTime || new Date();
    var crntUTCyear = crntSysTime.getUTCFullYear();
    var crntUTCdate = crntSysTime.getUTCDate();
    var crntUTCmnth = crntSysTime.getUTCMonth() + 1;
    var crntUTChour = crntSysTime.getUTCHours();
    var crntUTCmints = crntSysTime.getUTCMinutes();
    var crntUTCscnds = crntSysTime.getUTCSeconds();

    if (crntUTCdate.toString().length === 1) {
        crntUTCdate = "0" + crntUTCdate;
    }
    if (crntUTCmnth.toString().length === 1) {
        crntUTCmnth = "0" + crntUTCmnth;
    }
    if (crntUTChour.toString().length === 1) {
        crntUTChour = "0" + crntUTChour;
    }
    if (crntUTCmints.toString().length === 1) {
        crntUTCmints = "0" + crntUTCmints;
    }
    if (crntUTCscnds.toString().length === 1) {
        crntUTCscnds = "0" + crntUTCscnds;
    }

    var systemUTCString = '' + crntUTCyear + '-' + crntUTCmnth + '-' + crntUTCdate + 'T' + crntUTChour + ':' + crntUTCmints + ':' + crntUTCscnds;

    return systemUTCString;
},


    getProgramStartTimeNendTimeInUTCstr(programContentId, crntChnlIndex){

        let returnVal = '';

        let startOverArchiveLength = '';
        let startOverLength = '';
        let startOverStartBuffer = 0;
        let startOverEndBuffer = 0;

        kpAp.config.channelsList[crntChnlIndex].ExtraAttributes.forEach((extraAttri, idx) => {

            if (extraAttri.Name === 'ArchiveLength') {
                startOverArchiveLength = extraAttri.Value;
    }

if (extraAttri.Name === 'StartOverLength') {
    startOverLength = extraAttri.Value;
}

if (extraAttri.Name === 'StartOverStartBuffer') {
    startOverStartBuffer = extraAttri.Value;
}

if (extraAttri.Name === 'StartOverEndBuffer') {
    startOverEndBuffer = extraAttri.Value;
}

});


this.SLcurrentChannelPrograms.Programs.forEach((program) => {
    if (programContentId == program.ContentId) {

        let progDurationMints = parseInt(program.DurationSeconds) / 60;
let progStartTime = new Date(program.LinearStartDateTime);
let progEndTime = new Date(progStartTime.getTime() + progDurationMints * 60000);

progStartTime.setSeconds(progStartTime.getSeconds() - parseInt(startOverStartBuffer));
progEndTime.setSeconds(progStartTime.getSeconds() + parseInt(startOverEndBuffer));

returnVal = this.getUTCtimestampForStartoverVod(progStartTime) + '__o__' + this.getUTCtimestampForStartoverVod(progEndTime);

return returnVal;
}
});


return returnVal;


/*for(let program of this.SLcurrentChannelPrograms.Programs){
 if(programContentId == program.ContentId){

 alert(2);

 let prog_duration_mints = parseInt(program.DurationSeconds) / 60;
 let prog_start_time = new Date(program.LinearStartDateTime);
 let prog_end_time = new Date(prog_start_time.getTime() + prog_duration_mints * 60000);

 return this.getSystemUTCtimestamp(prog_start_time) + '__|__' + this.getSystemUTCtimestamp(prog_end_time);
 }
 }*/

},


printAspectRatio() {
    try {
        var plybkObj = bitmovin.player(this.dashContainerUniqueId).getPlaybackVideoData();

        if (plybkObj) {
            kpAp.jqNodsCache.getNode('.vidDetBps').text(plybkObj.bitrate + ' bps');
            var bb = plybkObj.width / plybkObj.height;
            kpAp.jqNodsCache.getNode('.vidDetAsP').text(bb.toFixed(2));
            kpAp.jqNodsCache.getNode('.vidDetAspCnt').show();
        }
        else {
            kpAp.jqNodsCache.getNode('.vidDetAspCnt').hide();
        }


    }
    catch (e) {

    }

},

    onFPusrBlkMsgBtnClk(){
        try {
            document.getElementById('logoutForm').submit();
        } catch (e) {
            window.location = kpAp.config.kplusOTThomePageUrl;
        }
    },

    onErrorNotificationOkBtnClk(){

        $('.plyr-err-msg-cnt').hide();
    },

    deleteFingerPrint(){
        try {
            this.fngrPrnt.shldFngrPrntVisible = false;
            $('.plyr-cnt-cnt > em').remove();
            $('.plyr-cnt-cnt > span').remove();

        }
        catch (e) {

        }

    },

    ensureFngrPrntVsblty() {
        if (this.fngrPrnt.shldFngrPrntVisible) {
            var obj = this.fngrPrnt.chnlObj;
            var subsId = kpAp.config.validateTokenResponse.BBSData.UserData.SubscriberId;
            var fpMarkupTxt;

            if (this.lastFngrPrntTag == 'span') {
                fpMarkupTxt = '<span style="font-size:24px; width:auto; height:auto; overflow:visible; display:block; padding:0; margin:0; position:absolute;' + this.fngrPrnt.fngrPrntPos[obj.position] + ';background-color:' + obj.background + ';color:' + obj.colorText + ';">' + subsId + '</span>';

                try {
                    
                    if ($('.plyr-cnt-cnt > span')[0].outerHTML !== fpMarkupTxt) {
                        $('.plyr-cnt-cnt > span').remove();

                        try {
                            kpAp.displayPlyrMsg(12,void 0, "FPT-701");
                            bitmovin.player(this.dashContainerUniqueId).unload();
                        }
                        catch (e) {

                        }

                        /*$('.plyr-cnt-cnt').append(fpMarkupTxt);*/
                        /*let childrenLength = $('.plyr-cnt-cnt').children().length;
                        let randomPosition = Math.floor((Math.random() * childrenLength));

                        $(fpMarkupTxt).insertAfter($(".plyr-cnt-cnt").children()[randomPosition]);*/
                    }
                }
                catch (e) {
                    /*$('.plyr-cnt-cnt').append(fpMarkupTxt);*/

                    let childrenLength = $('.plyr-cnt-cnt').children().length;
                    let randomPosition = Math.floor((Math.random() * childrenLength));

                    $(fpMarkupTxt).insertAfter($(".plyr-cnt-cnt").children()[randomPosition]);

                }
            }
            else if (this.lastFngrPrntTag == 'em') {
                fpMarkupTxt = '<em style="font-size:24px; font-style: normal; width:auto; height:auto; overflow:visible; display:block; padding:0; margin:0; position:absolute;' + this.fngrPrnt.fngrPrntPos[obj.position] + ';background-color:' + obj.background + ';color:' + obj.colorText + ';">' + subsId + '</em>';
                try {
                    if ($('.plyr-cnt-cnt > em')[0].outerHTML !== fpMarkupTxt) {
                        $('.plyr-cnt-cnt > em').remove();

                        try {
                            kpAp.displayPlyrMsg(12,void 0, "FPT-701");
                            bitmovin.player(this.dashContainerUniqueId).unload();
                        }
                        catch (e) {

                        }

                        /*$('.plyr-cnt-cnt').append(fpMarkupTxt);*/

                        let childrenLength = $('.plyr-cnt-cnt').children().length;
                        let randomPosition = Math.floor((Math.random() * childrenLength));

                        $(fpMarkupTxt).insertAfter($(".plyr-cnt-cnt").children()[randomPosition]);
                    }
                }
                catch (e) {
                    /*$('.plyr-cnt-cnt').append(fpMarkupTxt);*/

                    let childrenLength = $('.plyr-cnt-cnt').children().length;
                    let randomPosition = Math.floor((Math.random() * childrenLength));

                    /*$('.plyr-cnt-cnt').children()[randomPosition].after(fpMarkupTxt);*/

                    $(fpMarkupTxt).insertAfter($(".plyr-cnt-cnt").children()[randomPosition]);

                }
            }
        }


        if($(".plyr-cnt-cnt > span,em").length > 1){
            try {
                $('.plyr-cnt-cnt > span,em').remove();
                kpAp.displayPlyrMsg(12,void 0, "FPT-701");
                bitmovin.player(this.dashContainerUniqueId).unload();
            }
            catch (e) {

            }
        }else if($('.plyr-cnt-cnt >').length > 7){
            var checkStatus = true;
            for(var j = 0; $(".plyr-cnt-cnt >") && (j < ($(".plyr-cnt-cnt >").length)); j++){
                if( $($(".plyr-cnt-cnt >")[j]).hasClass("plyr-err-msg-cnt")){
                    checkStatus = false;
                }
            }
            if(checkStatus){
                try {
                    $('.plyr-cnt-cnt > span,em').remove();
                    kpAp.displayPlyrMsg(12, void 0, "FPT-701");
                    bitmovin.player(this.dashContainerUniqueId).unload();
                }
                catch (e) {

                }
            }
        }
        else{
            var checkCount = 0;
            for(var j = 0; $(".plyr-cnt-cnt >") && (j < ($(".plyr-cnt-cnt >").length)); j++){
                if($(".plyr-cnt-cnt > span,em") && $(".plyr-cnt-cnt > span,em").length > 0 && $($(".plyr-cnt-cnt > span,em")[0]).attr("style") == $($(".plyr-cnt-cnt >")[j]).attr("style")){
                    checkCount++;
                    if(checkCount > 1){
                        try {
                            $('.plyr-cnt-cnt > span,em').remove();
                            checkCount = 0;
                            kpAp.displayPlyrMsg(12,void 0, "FPT-701");
                            bitmovin.player(this.dashContainerUniqueId).unload();
                        }
                        catch (e) {

                        }
                    }
                }
            }
        }

    },
    dsplayFngrPrnt(obj) {
        /*obj = obj || {position:1,background:'yellow',colorText:'black', duration:50};*/

        clearTimeout(this.displayFngrPrntTimer);
        this.displayFngrPrntTimer = setTimeout(() => {
            this.fngrPrnt.shldFngrPrntVisible = false;
        $('.plyr-cnt-cnt > span').remove();
        $('.plyr-cnt-cnt > em').remove();
    }, 1000 * obj.duration);

var fngrPrntPos = [
    "",
    "top:23%;left:2%",
    "top:23%;left:48%",
    "top:23%;right:2%",
    "top:43%;left:2%",
    "top:43%;left:48%",
    "top:43%;right:2%",
    "top:63%;left:2%",
    "top:63%;left:48%",
    "top:63%;right:2%"
];

for (var i = 1; i <= 9; i++) {
    if (i == obj.position) {
        this.fngrPrnt.shldFngrPrntVisible = true;
        this.fngrPrnt.chnlObj = obj;
        var subsId = kpAp.config.validateTokenResponse.BBSData.UserData.SubscriberId;
        var fpMarkupTxt;

        if (!obj.background) {
            obj.background = 'rgba(0, 0, 0, 0)';
        }

        if (this.lastFngrPrntTag == 'em') {
            this.lastFngrPrntTag = 'span';
            fpMarkupTxt = '<span style="font-size:24px; width:auto; height:auto; overflow:visible; display:block; padding:0; margin:0; position:absolute;' + this.fngrPrnt.fngrPrntPos[obj.position] + ';background-color:' + obj.background + ';color:' + obj.colorText + ';">' + subsId + '</span>';
        }
        else if (this.lastFngrPrntTag == 'span') {
            this.lastFngrPrntTag = 'em';
            fpMarkupTxt = '<em style="font-size:24px; font-style: normal; width:auto; height:auto; overflow:visible; display:block; padding:0; margin:0; position:absolute;' + this.fngrPrnt.fngrPrntPos[obj.position] + ';background-color:' + obj.background + ';color:' + obj.colorText + ';">' + subsId + '</em>';
        }

        /*$('.plyr-cnt-cnt').append(fpMarkupTxt);*/

        let childrenLength = $('.plyr-cnt-cnt').children().length;
        let randomPosition = Math.floor((Math.random() * childrenLength));

        /*$('.plyr-cnt-cnt').children()[randomPosition].after(fpMarkupTxt);*/

        $(fpMarkupTxt).insertAfter($(".plyr-cnt-cnt").children()[randomPosition]);

    }
    else {
    }
}
},

chkNdisplayFngrPrnt() {

    this.fngrPrnt.shldFngrPrntVisible = false;
    $('.plyr-cnt-cnt > span').remove();
    $('.plyr-cnt-cnt > em').remove();

    if (kpAp.config.isAliveApiRspns) {
        kpAp.config.isAliveApiRspns.isAlive.forEach((obj, idx) => {
            try {
                let crntChnl = kpAp.config.channelsList[kpAp.config.crntPlayingChannelIndex];
        if (obj.channelId == crntChnl.ChannelId && crntChnl.IsAuthorized === true) {
            this.dsplayFngrPrnt(obj);
        }
    }
            catch (e) {
            }
});
}
},


changeLangOfAllUIlabels(langCode) {
    kpAp.MultiLangSupportModule.labelsObjArr.forEach((lbl, idx) => {
        $('.textid-' + idx).text(kpAp.MultiLangSupportModule.getLabel(idx, langCode));
});
},

onOverlayedLangVTselected(e) {
    if (e === undefined) {
        this.onAudioChannelSelected('vietnamese');
    }

    kpAp.gAnalyticsModule.fireGoogleAnalyticsEvnt('Live Player', 'Language', 'vie');
    kpAp.gAnalyticsModule.fireGoogleAnalyticsEvnt('Language', 'Selection', 'vie');

    var selecLang = 'vie';

    if (selecLang === 'eng') {
        $(".outer-lang-en-div").css("background-color", "rgba(255,255,255,0.5)");
        $(".lang-en-div img").attr("src", "/mykplus/KplusWebPlayer/img/buttons/check_radio_button.png");

        $(".outer-lang-vt-div").css("background-color", "");
        $(".lang-vt-div img").attr("src", "/mykplus/KplusWebPlayer/img/buttons/uncheck_radio_button.png");
    } else if (selecLang === 'vie') {
        $(".outer-lang-vt-div").css("background-color", "rgba(255,255,255,0.5)");
        $(".lang-vt-div img").attr("src", "/mykplus/KplusWebPlayer/img/buttons/check_radio_button.png");

        $(".outer-lang-en-div").css("background-color", "");
        $(".lang-en-div img").attr("src", "/mykplus/KplusWebPlayer/img/buttons/uncheck_radio_button.png");
    }
},

    onOverlayedLangENGselected(e) {
        if (e === undefined) {
            this.onAudioChannelSelected('original');
        }

        kpAp.gAnalyticsModule.fireGoogleAnalyticsEvnt('Live Player', 'Language', 'eng');
        kpAp.gAnalyticsModule.fireGoogleAnalyticsEvnt('Language', 'Selection', 'eng');

        var selecLang = 'eng';

        if (selecLang === 'eng') {
            $(".outer-lang-en-div").css("background-color", "rgba(255,255,255,0.5)");
            $(".lang-en-div img").attr("src", "/mykplus/KplusWebPlayer/img/buttons/check_radio_button.png");

            $(".outer-lang-vt-div").css("background-color", "");
            $(".lang-vt-div img").attr("src", "/mykplus/KplusWebPlayer/img/buttons/uncheck_radio_button.png");
        } else if (selecLang === 'vie') {
            $(".outer-lang-vt-div").css("background-color", "rgba(255,255,255,0.5)");
            $(".lang-vt-div img").attr("src", "/mykplus/KplusWebPlayer/img/buttons/check_radio_button.png");

            $(".outer-lang-en-div").css("background-color", "");
            $(".lang-en-div img").attr("src", "/mykplus/KplusWebPlayer/img/buttons/uncheck_radio_button.png");
        }
    },

    onOverlayedBroadcastShedulSliderCloseClick() {

        var cntWidth = $(".kplus-video-overlay .broadcast-schedule-container").width();
        var innerCntWidth = $(".kplus-video-overlay .next-button-container").width();
        var cntCssLeftPropVal = cntWidth - innerCntWidth;

        $(".kplus-video-overlay .broadcast-schedule-container").animate({
            left: cntCssLeftPropVal + 'px'
        }, 1000);

        this.isNextBroadcastBarDisplayed = false;

        if (typeof this.crntChannelStartoverParams.startoverLength != 'undefined') {
            $('.kweb-startover-container').css('visibility', 'visible');
        }
    },

        setProgsStartEndTimes(programs) {
            programs.forEach((prog) => {
                prog.prog_duration_mints = parseInt(prog.DurationSeconds) / 60;
            prog.prog_start_time = new Date(prog.LinearStartDateTime);
            prog.prog_end_time = new Date(prog.prog_start_time.getTime() + prog.prog_duration_mints * 60000);
        });
},
populateEPGslideLeftBar() {

    var jNode = $('.broadcast-schedule-container .broadcast-content');
    jNode.empty();

    var crntPlayingProgIndex = -1;
    if (this.currentChannelPrograms !== null) {
        let currentDateTime = new Date();
        let filteredPrograms = this.currentChannelPrograms.Programs.filter((prog) => {
            if (prog.prog_end_time >= currentDateTime) {
                return true;
    }
    else {
        return false;
    }
});

filteredPrograms.forEach((prog, idx) => {
    if (this.currentProgram !== null) {
        if (prog.ContentId === this.currentProgram.ContentId) {
            crntPlayingProgIndex = idx;
        }
}

var prog_start_hours = this.prependZero(prog.prog_start_time.getHours());
var prog_start_minutes = this.prependZero(prog.prog_start_time.getMinutes());
var prog_end_hours = this.prependZero(prog.prog_end_time.getHours());
var prog_end_minutes = this.prependZero(prog.prog_end_time.getMinutes());
var prog_timing_str = prog_start_hours + ':' + prog_start_minutes + ' - ' + prog_end_hours + ':' + prog_end_minutes;

var onNowTxt = kpAp.MultiLangSupportModule.getLabel(20, kpAp.config.userPrefLanguage);

if (idx === crntPlayingProgIndex) {
    jNode.append('<div class="content-div"><div class="broadcast-sch-content-title" data-state="crnt-prog-title">' + prog.Title + '</div><div class="broadcast-content-sch-timings" data-state="crnt-prog-timings">' + prog_timing_str + ' . ' + onNowTxt + '</div></div>');
} else if (crntPlayingProgIndex !== -1 && idx === crntPlayingProgIndex + 1) {
    jNode.append('<div class="content-div"><div class="broadcast-sch-content-title" data-state="next-to-crnt-prog-title">' + prog.Title + '</div><div class="broadcast-content-sch-timings" data-state="next-to-crnt-prog-timings">' + prog_timing_str + '</div></div>');
} else {
    jNode.append('<div class="content-div"><div class="broadcast-sch-content-title" data-state="next-next-to-crnt-prog-title">' + prog.Title + '</div><div class="broadcast-content-sch-timings" data-state="next-next-to-crnt-prog-timings">' + prog_timing_str + '</div></div>');
}
});

try {
    var epgNextCnt = $('.broadcast-schedule-container .nxt-btn-epg-scroll-cnt');
    var progDivIndx = crntPlayingProgIndex + 1;
    epgNextCnt.animate({scrollLeft: epgNextCnt.scrollLeft() + $('.nxt-btn-epg-scroll-cnt .content-div:nth-child(' + progDivIndx + ')').offset().left - epgNextCnt.offset().left}, 500);
}
catch (e) {

}
}
},

getStartoverParamsForCrntChannel(){
    let returnVal = {};
    if (kpAp.config.crntPlayingChannelIndex != -1) {
        this.userChannnels[kpAp.config.crntPlayingChannelIndex].ExtraAttributes.find((extraAttri, idx) => {

            if (extraAttri.Name === 'ArchiveLength' && extraAttri.Value != '' && extraAttri.Value != '0') {
                returnVal.archiveLength = extraAttri.Value;
        /*returnVal.archiveLength = '15000';*/
    }

    if (extraAttri.Name === 'StartOverLength' && extraAttri.Value != '' && extraAttri.Value != '0') {
        returnVal.startoverLength = extraAttri.Value;
        /*returnVal.startoverLength = '11000';*/
    }

    if (extraAttri.Name === 'StartOverStartBuffer') {
        returnVal.startOverStartBuffer = extraAttri.Value;
    }

    if (extraAttri.Name === 'StartOverEndBuffer') {
        returnVal.startOverEndBuffer = extraAttri.Value;
    }

});
}

return returnVal;
},


populateStartoverBar() {

    setTimeout(()=> {

        var jNode = $('.kweb-startover-contents-container');
    jNode.empty();

    let startoverLength = this.crntChannelStartoverParams.startoverLength;

    if (typeof  startoverLength == 'undefined') {
        return;
    }

    var crntPlayingProgIndex = -1;
    if (this.currentChannelPrograms !== null) 

    {
        let startoverLeft = new Date();
        let crntTime = new Date();

        startoverLeft.setSeconds(startoverLeft.getSeconds() - parseInt(startoverLength));

        this.availableStartoverPrograms = this.currentChannelPrograms.Programs.filter((prog) => {

            let programEpgDuration = Math.floor((prog.prog_end_time - prog.prog_start_time) / 1000);

        if ((prog.prog_start_time >= startoverLeft && prog.prog_start_time < crntTime) || (crntTime > prog.prog_start_time && crntTime < prog.prog_end_time && parseInt(startoverLength) <  programEpgDuration)) {
            return true;
        }
        else {
            return false;
        }
    });


    this.availableStartoverPrograms.forEach((prog, idx) => {

        if (kpAp.config.flags.isStartoverMode || kpAp.config.flags.isInTimeShiftMode) {
            if (prog.ContentId === this.startoverProgram.ContentId) {
                crntPlayingProgIndex = idx;
            }
}
/*else {
 if (this.currentProgram !== null) {
 if (prog.ContentId === this.currentProgram.ContentId) {
 crntPlayingProgIndex = idx;
 }
 }
 }*/

var prog_start_hours = this.prependZero(prog.prog_start_time.getHours());
var prog_start_minutes = this.prependZero(prog.prog_start_time.getMinutes());
var prog_end_hours = this.prependZero(prog.prog_end_time.getHours());
var prog_end_minutes = this.prependZero(prog.prog_end_time.getMinutes());
var prog_timing_str = prog_start_hours + ':' + prog_start_minutes + ' - ' + prog_end_hours + ':' + prog_end_minutes;

/*var onNowTxt = kpAp.MultiLangSupportModule.getLabel(20, kpAp.config.userPrefLanguage);*/

let isEnabled = prog.AdditionalInfo.OTTEnabled == 'true' ? '1' : '0';

if (idx === crntPlayingProgIndex) {
    jNode.append(`<div class="kweb-startover-content" data-is-on-now="1" data-startover-content-id="${prog.ContentId}" data-is-ott-enabled="${isEnabled}"><div class="kweb-startover-content-content-title" data-is-enabled="${isEnabled}" >${prog.Title}</div><div class="kweb-startover-content-sch-timings" data-is-enabled="${isEnabled}">${prog_timing_str}</div></div>`);
} else if (crntPlayingProgIndex !== -1 && idx === crntPlayingProgIndex + 1) {
    jNode.append(`<div class="kweb-startover-content" data-is-on-now="0" data-startover-content-id="${prog.ContentId}" data-is-ott-enabled="${isEnabled}"><div class="kweb-startover-content-content-title" data-is-enabled="${isEnabled}">${prog.Title}</div><div class="kweb-startover-content-sch-timings" data-is-enabled="${isEnabled}">${prog_timing_str}</div></div>`);
    /*jNode.append('<div class="kweb-startover-content"><div class="kweb-startover-content-content-title" data-state="startover-next-to-crnt-prog-title">' + prog.Title + '</div><div class="kweb-startover-content-sch-timings" data-state="startover-next-to-crnt-prog-timings">' + prog_timing_str + '</div></div>');*/
} else {
    jNode.append(`<div class="kweb-startover-content" data-is-on-now="0" data-startover-content-id="${prog.ContentId}" data-is-ott-enabled="${isEnabled}"><div class="kweb-startover-content-content-title" data-is-enabled="${isEnabled}">${prog.Title}</div><div class="kweb-startover-content-sch-timings" data-is-enabled="${isEnabled}" >${prog_timing_str}</div></div>`);
    /*jNode.append('<div class="kweb-startover-content"><div class="kweb-startover-content-content-title" data-state="startover-next-next-to-crnt-prog-title">' + prog.Title + '</div><div class="kweb-startover-content-sch-timings" data-state="startover-next-next-to-crnt-prog-timings">' + prog_timing_str + '</div></div>');*/
}


});

}


let scrollLeftVal = kpAp.jqNodsCache.getNode('.kweb-startover-contents-container').scrollLeft();
kpAp.jqNodsCache.getNode('.kweb-startover-contents-container').scrollLeft(scrollLeftVal + 3000);

/*kpAp.jqNodsCache.getNode('.kweb-startover-contents-container').animate({
 scrollLeft: '+=3000'
 }, 500);*/

}, 3000);

},

onOverlayedNextBttnClick() {

    var cntWidth = $(".kplus-video-overlay .broadcast-schedule-container").width();
    var innerCntWidth = $(".kplus-video-overlay .next-button-container").width();
    var cntCssLeftPropVal = cntWidth - innerCntWidth;

    if (this.isNextBroadcastBarDisplayed) {
        $(".kplus-video-overlay .broadcast-schedule-container").animate({
            left: cntCssLeftPropVal + "px"
        }, 1000);

        this.isNextBroadcastBarDisplayed = false;

        if (typeof this.crntChannelStartoverParams.startoverLength != 'undefined') {
            $('.kweb-startover-container').css('visibility', 'visible');
        }


    } else {
        $(".kplus-video-overlay .broadcast-schedule-container").animate({
            left: "0px"
        }, 1000);

        $('.kweb-startover-container').css('visibility', 'hidden');
        this.isNextBroadcastBarDisplayed = true;
    }
},

    onOverlayedCenteralPopUpCloseBttnClick() {
        $('.top-menu-lang-details-container').hide();
        $('.top-menu-quality-details-container').hide();
        $('.top-menu-info-details-container').hide();

        $('.kplus-video-overlay .central-content-popup').hide();

        $('.kplus-menu-button .top-menu-p').each(function (idx, val) {
            $(this).css('color', 'rgba(137, 199, 62, 1)');
        });
    },


    toggleTopMenuFontColor(clickedElemIndex) {
        $('.kplus-menu-button .top-menu-p').each(function (idx, val) {
            if (clickedElemIndex === idx) {
                $(this).css('color', 'white');
            } else {
                $(this).css('color', 'rgba(137, 199, 62, 1)');
            }
        });
    },

    onInfoScrnSubButtonclick(menu_index) {
        function getFormattedDateStr(d) {
            var daysObjEng = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            var daysObjVie = ['Chủ nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];
            var daysObj;
            if (kpAp.config.userPrefLanguage === 'eng') {
                daysObj = daysObjEng;
            } else {
                daysObj = daysObjVie;
            }

            var str = '';
            str = str + daysObj[d.getDay()] + ' ';
            str = str + d.getDate() + '/' + (d.getMonth() + 1);
            return str;
        }


        function getProgDateTimeForBrdSched(d) {
            var lang = kpAp.config.userPrefLanguage;
            var daysObj = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            var str = '';
            str = str + kpAp.MultiLangSupportModule.getWeekDayName(daysObj[d.getDay()], lang) + ' - ' + kpAp.MultiLangSupportModule.getMonthName(d.getMonth(), lang) + '   ' + d.getDate();
            str = str + ' - ' + this.prependZero(d.getHours()) + ':' + this.prependZero(d.getMinutes());
            return str;
        }

        function populateGenres(programDetails) {
            /*populating genres*/
            var genresStr = '';

            programDetails.Contents[0].Genres.forEach((genre, idx, genres) => {
                if (idx !== genres.length - 1) {
                    genresStr = genresStr + genre + ', ';
        } else {
                    genresStr = genresStr + genre;
    }
});

if (genresStr === '') {
    $('.info-dtals-prog-gnr-lbl').text('');
}
else {
    $('.info-dtals-prog-gnr-lbl').text(kpAp.MultiLangSupportModule.getLabel(17, kpAp.config.userPrefLanguage));
}

$('.info-dtals-prog-gnr-val').text(genresStr);
}

function populateBroadcastInfo(program, programDetails) {
    
    if (programDetails.Contents[0].AdditionalInfo !== undefined) {
        var rebroadCast = programDetails.Contents[0].AdditionalInfo.Rebroadcast;

        var bSched = '';
        if (program != null) {
            var crnt_prog_start_time = program.prog_start_time;
            var crnt_prog_start_time_hours = this.prependZero(crnt_prog_start_time.getHours());
            var crnt_prog_start_time_mints = this.prependZero(crnt_prog_start_time.getMinutes());
            bSched = this.userChannnels[kpAp.config.crntPlayingChannelIndex].Title;
            bSched = bSched + ' - ';
            bSched = bSched + getFormattedDateStr.call(this, crnt_prog_start_time) + ' - ';
            bSched = bSched + crnt_prog_start_time_hours + ':' + crnt_prog_start_time_mints;
            bSched = bSched + ' - ' + Math.floor(parseInt(program.DurationSeconds) / 60);

            var lblTxt = kpAp.MultiLangSupportModule.getLabel(19, kpAp.config.userPrefLanguage);
            bSched = bSched + lblTxt;

            if (bSched === '') {
                $('.info-details-prog-broadcast-info-label').text('');
            }
            else {
                $('.info-details-prog-broadcast-info-label').text(kpAp.MultiLangSupportModule.getLabel(12, kpAp.config.userPrefLanguage));
            }
            $('.info-details-prog-broadcast-info-val').text(bSched);

        }
    }
}

function populateDirectors(programDetails) {
    
    var str = '';

    programDetails.Contents[0].Persons.Director.forEach((director, idx, directors) => {
        if (idx !== directors.length - 1) {
            str = str + director + ', ';
} else {
                    str = str + director;
}
});

if (str === '') {
    $('.info-details-prog-director-label').text('');
}
else {
    $('.info-details-prog-director-label').text(kpAp.MultiLangSupportModule.getLabel(13, kpAp.config.userPrefLanguage));
}
$('.info-details-prog-director-val').text(str);
}

function populateCast(programDetails) {
    
    var castStr = '';

    programDetails.Contents[0].Persons.Actor.forEach((actor, idx, actors) => {
        if (idx !== actors.length - 1) {
            castStr += actor + ', ';
} else {
                    castStr += actor;
}
});

if (castStr === '') {
    $('.info-details-prog-cast-label').text('');
}
else {
    $('.info-details-prog-cast-label').text(kpAp.MultiLangSupportModule.getLabel(14, kpAp.config.userPrefLanguage));
}
$('.info-details-prog-cast-val').text(castStr);
}

function populateBroadcastSched(program, programDetails) {
    if (programDetails.Contents[0].AdditionalInfo !== undefined) {
        var rebroadCast = programDetails.Contents[0].AdditionalInfo.Rebroadcast;
        if (program !== null) {
            for (var i = 0; i < rebroadCast.length; i++) {
                /* var brDate = new Date(rebroadCast[i].StartTime);*/
                var brDate = rebroadCast[i].StartTime;
                if (brDate >= program.prog_end_time) {
                    var bSched = '';
                    bSched += '      ';
                    bSched += getProgDateTimeForBrdSched.call(this, brDate);
                    var imgUrl = "";
                    if(kpAp.config.crntPlayingChannelIndex && this.userChannnels[kpAp.config.crntPlayingChannelIndex] && this.userChannnels[kpAp.config.crntPlayingChannelIndex].Images && this.userChannnels[kpAp.config.crntPlayingChannelIndex].Images[0] ){
                        imgUrl = this.userChannnels[kpAp.config.crntPlayingChannelIndex].Images[0].Url;
                    }
                    $('.info-broadcast-sch-dates-cnt').append('<div><img style="max-height:45px" src="' + imgUrl + '" /><div class="brdschtxt">' + bSched + '</div></div>');
                }
            }
        }
    }
}

let program;
let programDetails;
if (kpAp.config.flags.isStartoverMode) {
    program = this.startoverProgram;
    programDetails = this.startoverProgramDetails;
}
else {
    program = this.currentProgram;
    programDetails = this.currentProgramDetails;
}

if (menu_index === 1) {

    $('.content-info-details').show();
    $('.content-info-broadcast-sch-details').hide();

    $('.top-menu-container .first-m').css('color', 'white').css('border-bottom', '');
    $('.top-menu-container .second-m').css('color', 'grey').css('border-bottom', 'solid thin grey');

    $('.info-details-prog-title').empty();
    $('.info-details-prog-subtitle').empty();

    $('.info-dtals-prog-gnr-lbl').empty();
    $('.info-dtals-prog-gnr-val').empty();

    $('.info-details-prog-broadcast-info-label').empty();
    $('.info-details-prog-broadcast-info-val').empty();

    $('.info-details-prog-director-label').empty();
    $('.info-details-prog-director-val').empty();

    $('.info-details-prog-cast-label').empty();
    $('.info-details-prog-cast-val').empty();

    $('.info-details-prog-synopsis-label').empty();
    $('.info-details-prog-synopsis-val').empty();

    if (programDetails) {
        $('.info-details-prog-title').text(programDetails.Contents[0].Title);

        $('.info-details-prog-subtitle').text(programDetails.Contents[0].AdditionalInfo.SubTitle);

        try {
            populateGenres.call(this, programDetails);
        } catch (e) {
            $('.info-dtals-prog-gnr-lbl').text('');
            $('.info-dtals-prog-gnr-val').text('');
        }
        try {
            populateBroadcastInfo.call(this, program, programDetails);
        } catch (e) {
            $('.info-details-prog-broadcast-info-label').text('');
            $('.info-details-prog-broadcast-info-val').text('');
        }
        try {
            populateDirectors.call(this, programDetails);
        } catch (e) {
            $('.info-details-prog-director-label').text('');
            $('.info-details-prog-director-val').text('');
        }
        try {
            populateCast.call(this, programDetails);
        } catch (e) {
            $('.info-details-prog-cast-label').text('');
            $('.info-details-prog-cast-val').text('');
        }
        /*populating synopys*/
        if (programDetails.Contents[0].Description == '') {
            $('.info-details-prog-synopsis-label').text('');
            $('.info-details-prog-synopsis-val').text('');
        }
        else {
            $('.info-details-prog-synopsis-label').text(kpAp.MultiLangSupportModule.getLabel(15, kpAp.config.userPrefLanguage));
            $('.info-details-prog-synopsis-val').text(programDetails.Contents[0].Description);
        }
    }
} else if (menu_index === 2) {
    kpAp.gAnalyticsModule.fireGoogleAnalyticsEvnt('Info', 'Broadcast Schedule');

    $('.content-info-details').hide();
    $('.content-info-broadcast-sch-details').show();

    $('.top-menu-container .second-m').css('color', 'white').css('border-bottom', '');
    $('.top-menu-container .first-m').css('color', 'grey').css('border-bottom', 'solid thin grey');

    if (programDetails) {
        $('.info-details-prog-title').text(programDetails.Contents[0].Title);
    } else {
        $('.info-details-prog-title').empty();
    }

    $('.info-broadcast-sch-dates-cnt').empty();

    populateBroadcastSched.call(this, program, programDetails);
}
},

onVideoBufferProgressBarClick(clicked_val) {
    this.userPrefVideoBufferLength = clicked_val;

    $('.buffer-inner-bars-container > div').css('background-color', '');

    var lblTxt = kpAp.MultiLangSupportModule.getLabel(18, kpAp.config.userPrefLanguage);
    $('.video-buffer-duration-container > .buffered-time').text(clicked_val + lblTxt);
    var jNodes = $('.buffer-inner-bars-container').children();
    for (var i = 0; i < clicked_val; i++) {
        $(jNodes[i]).css('background-color', 'white');
    }

    //    bitmovin.player(this.dashContainerUniqueId)
},

/* onVideoBandwidthProgressBarClick: function (clicked_val,ignoreStr) {
 var selected_bitrate = kpAp.config.availableBitRates[clicked_val - 1];

 if(selected_bitrate == kpAp.config.userPrefBitrate &&  ignoreStr !== 'dont-set-plyr-bitrate')
 {
 if(clicked_val > 1)
 {
 clicked_val--;
 selected_bitrate = kpAp.config.availableBitRates[clicked_val - 1];
 }
 }

 kpAp.config.userPrefBitrate = selected_bitrate;

 clearInterval(kpAp.gAnalyticsModule.oneMinBitrateRecordIntervalId);
 kpAp.gAnalyticsModule.oneMinBitrateRecordIntervalId = setInterval(function () {
 clearInterval(kpAp.gAnalyticsModule.oneMinBitrateRecordIntervalId);
 kpAp.gAnalyticsModule.fireGoogleAnalyticsEvnt('Bandwidth', 'Playback', selected_bitrate);
 }, 60000);

 kpAp.gAnalyticsModule.fireGoogleAnalyticsEvnt('Quality', 'Bit Rate Selection', selected_bitrate);
 kpAp.gAnalyticsModule.fireGoogleAnalyticsEvnt('Bandwidth', 'Bit Rate Change', selected_bitrate);

 $('.bandwidth-inner-bars-container > div').css('background-color', '');

 var jNodes = $('.bandwidth-inner-bars-container').children();

 for (var i = 0; i < clicked_val; i++) {
 $(jNodes[i]).css('background-color', 'white');
 }

 /!* for (var i = 1; i <= clicked_val; i++) {
 $('.bandwidth-inner-bars-container > .p-' + i).css('background-color', 'white');
 }*!/

 if(ignoreStr !== 'dont-set-plyr-bitrate')
 {
 this.setPlayerBitrate(selected_bitrate);
 }
 },*/

    setPlayerBitrate(selected_bitrate) {
        kpAp.config.flags.isBandwidthLimitSetByUsr = true;

        var bitrates = bitmovin.player(this.dashContainerUniqueId).getAvailableVideoQualities();
        for (var j = 0; j < bitrates.length; j++) {
            if (selected_bitrate <= bitrates[j].bitrate) {
                bitmovin.player(this.dashContainerUniqueId).setVideoQuality(bitrates[j].id);
                break;
            }
        }
    },

    onFullScreenChange(){

        var fullscreenElement = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement;

        if (fullscreenElement) {
            $(".kplus-video-overlay .next-button-container").width('10%');
            $(".broadcast-schedule-container .close-bar-button").width('10%');
            $(".broadcast-schedule-container .broadcast-content").width('72%');

            $(".kweb-startover-btn-container").width('10%');
            $(".kweb-startover-close-bar-btn").width('10%');
            $(".kweb-startover-contents-container").width('72%');
        }
        else {
            $(".kplus-video-overlay .next-button-container").width('15%');
            $(".broadcast-schedule-container .close-bar-button").width('10%');
            $(".broadcast-schedule-container .broadcast-content").width('67%');

            $(".kweb-startover-btn-container").width('15%');
            $(".kweb-startover-close-bar-btn").width('10%');
            $(".kweb-startover-contents-container").width('67%');
        }

        setTimeout(() => {
            $(".broadcast-schedule-container").css('visibility', 'visible');

        if (typeof this.crntChannelStartoverParams.startoverLength != 'undefined') {
            $('.kweb-startover-container').css('visibility', 'visible');
        }


        /*kpAp.jqNodsCache.getNode(".kplus-video-overlay .broadcast-schedule-container").show();*/
        let cntWidth1 = $(".kplus-video-overlay .broadcast-schedule-container").width();
        let innerCntWidth1 = $(".kplus-video-overlay .next-button-container").width();
        let cntCssLeftPropVal1 = cntWidth1 - innerCntWidth1;
        $(".kplus-video-overlay .broadcast-schedule-container").css('left', cntCssLeftPropVal1 + 'px');
        $(".broadcast-schedule-container").css('display', 'flex');
        this.isNextBroadcastBarDisplayed = false;

        /*kpAp.jqNodsCache.getNode(".kweb-startover-container").show();*/
        let cntWidth2 = $(".kweb-startover-container").width();
        let innerCntWidth2 = $(".kweb-startover-btn-container").width();
        let cntCssLeftPropVal2 = cntWidth2 - innerCntWidth2;
        $(".kweb-startover-container").css('left', -cntCssLeftPropVal2 + 'px');
        $(".kweb-startover-container").css('display', 'flex');
        this.isStartoverBarDisplayed = false;

    }, 1000);
},

onCustomVideoCntrlBttnClick(value) {
    if (value === "toggle_play_pause") {
        
        if (bitmovin.player(this.dashContainerUniqueId).isPlaying()) {
            kpAp.gAnalyticsModule.fireGoogleAnalyticsEvnt('Live Player', 'Playback', 'Pause');
            bitmovin.player(this.dashContainerUniqueId).pause();
            kpAp.config.flags.isChnlPausedByUsr = true;
            kpAp.CSMheartBeatModule.sndCSMheartbeatPauseReq();
           
            Dispose();
        } 
            
        else if (bitmovin.player(this.dashContainerUniqueId).isPaused()) {

            if (kpAp.config.flags.isStartoverMode)
            {
                let archiveLengthEndDate = new Date();
                archiveLengthEndDate.setSeconds(archiveLengthEndDate.getSeconds() - parseInt(this.crntChannelStartoverParams.archiveLength));
                let progCrntStreamDate = new Date(this.startoverProgram.prog_start_time);
                progCrntStreamDate.setSeconds(progCrntStreamDate.getSeconds() - parseInt(this.crntChannelStartoverParams.startOverStartBuffer));
                let vodElapsedTime = bitmovin.player(_wgsbneq.kpDash.dashContainerUniqueId).getCurrentTime();
                progCrntStreamDate.setSeconds(progCrntStreamDate.getSeconds() + vodElapsedTime);

                if (archiveLengthEndDate > progCrntStreamDate) {

                    if (!kpAp.config.flags.isPlyrErrMsgVisible) {
                        try {
                            kpAp.displayPlyrMsg(13,void 0, "APP-405");
                            return;
                        }
                        catch (e) {

                        }
                    }
                }

            }
            else if(kpAp.config.flags.isInTimeShiftMode){

                let diffBtwProgStartNTimeShiftTime = Math.floor((this.timeShiftParams.timeShiftedToDate - this.startoverProgram.prog_start_time) / 1000);
                let archiveLengthEndDate = new Date();
                archiveLengthEndDate.setSeconds(archiveLengthEndDate.getSeconds() - parseInt(this.crntChannelStartoverParams.archiveLength));
                let progCrntStreamDate = new Date(this.startoverProgram.prog_start_time);
                progCrntStreamDate.setSeconds(progCrntStreamDate.getSeconds() + diffBtwProgStartNTimeShiftTime + this.startoverProgram.timeShiftElapsedTime);


                if (archiveLengthEndDate > progCrntStreamDate) {

                    if (!kpAp.config.flags.isPlyrErrMsgVisible) {

                        try {
                            kpAp.displayPlyrMsg(13,void 0, "APP-405");
                            return;
                        }
                        catch (e) {

                        }

                    }
                }
            }
            else{

            }


            kpAp.gAnalyticsModule.fireGoogleAnalyticsEvnt('Live Player', 'Playback', 'Resume');
            bitmovin.player(this.dashContainerUniqueId).play();
            kpAp.config.flags.isChnlPausedByUsr = false;
            
            onCSMPlay();
            kpAp.CSMheartBeatModule.sndCSMheartbeatPlayReq();
        }
    } else if (value === "toggle_fullscreen") {

            
        /*kpAp.jqNodsCache.getNode(".broadcast-schedule-container").css('visibility', 'hidden');
        kpAp.jqNodsCache.getNode(".kweb-startover-container").css('visibility', 'hidden');

        if (kpAp.config.flags.isChromeBrowser || kpAp.config.flags.isEdgeBrowser) {
            if (document.webkitIsFullScreen) {
                document.webkitCancelFullScreen();

            } else {

                document.getElementsByClassName('plyr-cnt-cnt-outer')[0].webkitRequestFullscreen();

            }


        } else {
            if (bitmovin.player(this.dashContainerUniqueId).isFullscreen()) {
                bitmovin.player(this.dashContainerUniqueId).exitFullscreen();
            } else {
                bitmovin.player(this.dashContainerUniqueId).enterFullscreen();
            }
        }*/

    } else if (value === "toggle_volume") {
        if ($('.vol-vol-mute-btn').attr('data-state') === 'volume') {
            $(".progress-grn-prog-bar").height(0);
            bitmovin.player(this.dashContainerUniqueId).mute();
            $('.vol-vol-mute-btn').attr('data-state', 'mute');
        } else {
            $(".progress-grn-prog-bar").height(this.playerVolume + '%');
            bitmovin.player(this.dashContainerUniqueId).unmute();
            /*this.playerVolume = 99;*/
            bitmovin.player(this.dashContainerUniqueId).setVolume(this.playerVolume);
            $('.vol-vol-mute-btn').attr('data-state', 'volume');
        }
    } else if (value === "toggle_audio-channel") {
        var jNode = $('.video-cont-settings-cnt > .vi-co-se-popup');
        if (jNode.attr('data-state') === 'visible') {
            jNode.attr('data-state', 'hidden');
        } else {
            jNode.attr('data-state', 'visible');
        }
    }
},

    creatDOMforCntralPopupTemplates() {
        

        var jNode = $('.kplus-video-overlay .central-content-popup');
        jNode.append(kpAp.HTMLtemplatesLoader.languageTemplateHTML);

        if (kpAp.config.userPrefLanguage === 'eng') {
            $(".outer-lang-en-div").css("background-color", "rgba(255,255,255,0.5)");
            $(".lang-en-div img").attr("src", "/mykplus/KplusWebPlayer/img/buttons/check_radio_button.png");

            $(".outer-lang-vt-div").css("background-color", "");
            $(".lang-vt-div img").attr("src", "/mykplus/KplusWebPlayer/img/buttons/uncheck_radio_button.png");
        } else if (kpAp.config.userPrefLanguage === 'vie') {
            $(".outer-lang-vt-div").css("background-color", "rgba(255,255,255,0.5)");
            $(".lang-vt-div img").attr("src", "/mykplus/KplusWebPlayer/img/buttons/check_radio_button.png");

            $(".outer-lang-en-div").css("background-color", "");
            $(".lang-en-div img").attr("src", "/mykplus/KplusWebPlayer/img/buttons/uncheck_radio_button.png");
        }

        $('.top-menu-lang-details-container').hide();


        

        jNode.append(kpAp.HTMLtemplatesLoader.startoverVideoBtnsHTML);
        $('.kp-startover-btns-cnt').hide();

        /* - - - - - - - - - - - - - - - - - - - */

        

        jNode.append(kpAp.HTMLtemplatesLoader.qualityTemplateHTML);
        this.cache.bitrateChartRows = $('#realtime-bitrate-chart').children().get().reverse();

        $(".bandwidth-progressbar-container > div").css('background-color', '');
        for (var i = 1; i <= 10; i++) {
            $('.bandwidth-progressbar-container > .p-' + i).css('background-color', 'white');
        }

        $('.bandwidth-limit-container > .selected-bandwidth-rate').text(Math.floor(kpAp.config.userPrefBitrate / 1000) + ' kbps');
        $('.top-menu-quality-details-container').hide();

        /* - - - - - - - - - - - - - - - - - - - */

        

        $('.kplus-video-overlay .central-content-popup').append(kpAp.HTMLtemplatesLoader.infoTemplateHTML);
        $('.top-menu-info-details-container').hide();
    },

    populateBRchartDynam() {
        kpAp.jqNodsCache.getNode('.bitrate-text').empty();
        kpAp.jqNodsCache.getNode('#realtime-bitrate-chart').empty();

        kpAp.config.availableBitRates.forEach((bitrate, idx) => {
            kpAp.jqNodsCache.getNode('.bitrate-text').prepend('<div>' + Math.floor(bitrate / 1000) + ' K</div>');
        kpAp.jqNodsCache.getNode('#realtime-bitrate-chart').append(kpAp.HTMLtemplatesLoader.bitrateChartRowsHTML);
    });

$('#realtime-bitrate-chart > div:nth-last-child(1)').remove();

$('#chart-container').height(kpAp.config.availableBitRates.length * 23)


this.chartCurrentHorizontalPosition = 0;
this.chartCurrentVerticlePosition = 0;
this.chartPrevVerticlePosition = -1;
},

OnOverlayedTopMenuBttnClick(id) {

    if (kpAp.config.isFPusrBlkd && id) {
        return;
    }


    if (kpAp.jqNodsCache.getNode('.kp-startover-btns-cnt').is(":visible")) {
        return;
    }

    if (id === 1) {
        

        kpAp.gAnalyticsModule.fireGoogleAnalyticsEvnt('Language', 'Open');

        this.toggleTopMenuFontColor(id - 1);

        $('.top-menu-lang-details-container').show();
        $('.top-menu-quality-details-container').hide();
        $('.top-menu-info-details-container').hide();

        $('.kplus-video-overlay .central-content-popup').show();
    }
    if (id === 2) {
        

        kpAp.gAnalyticsModule.fireGoogleAnalyticsEvnt('Quality', 'Open');

        this.toggleTopMenuFontColor(id - 1);

        $('.top-menu-lang-details-container').hide();
        $('.top-menu-quality-details-container').show();
        $('.top-menu-info-details-container').hide();

        /* this.populateBRchartDynam();*/

        $('.kplus-video-overlay .central-content-popup').show();

        this.onVideoBufferProgressBarClick(this.userPrefVideoBufferLength);
    }
    if (id === 3) {
        

        kpAp.gAnalyticsModule.fireGoogleAnalyticsEvnt('Info', 'Open');

        this.toggleTopMenuFontColor(id - 1);

        $('.top-menu-lang-details-container').hide();
        $('.top-menu-quality-details-container').hide();
        $('.top-menu-info-details-container').show();

        /*$('.info-details-prog-title').text(this.currentProgram.Title);*/

        $('.kplus-video-overlay .central-content-popup').show();

        this.onInfoScrnSubButtonclick(1);
    }

    if (id === 4) {
        kpAp.gAnalyticsModule.fireGoogleAnalyticsEvnt('My K+', 'Open');
        kpAp.onMykPlusMenuItemClick();

        /* toggleTopMenuFontColor(id - 1);

         $('.kplus-video-overlay .central-content-popup').empty();

         $('.kplus-video-overlay .central-content-popup').append('<div class="close-button" onClick="onOverlayedCenteralPopUpCloseBttnClick()"><img src="img/buttons/close_popup_icon.png" /></div>' +
         '<div class="content">' +
         '<b style="color:white">House of Cards S3E05</b>' +
         '<p>TV Series (US)</p>' +
         '<br />' +
         '<b>design:</b>' +
         '<b>Daien Veien:</b>' +
         '<br />' +
         '<p><b>Not during</b> sssdfsdfssdfsdf</p>' +
         '</div>');

         $('.kplus-video-overlay .central-content-popup').show();
         */
    }
},

        setPlayerStream(channel_place, selectedStartoverProgram) {

            let streamSrc = '';
            let widevineDrmLAURL = '';
            let playreadyDrmLAURL = '';

            let startOverArchiveLength = '';
            let startOverLength = '';
            let startOverStartBuffer = 0;
            let startOverEndBuffer = 0;

            this.userChannnels[channel_place].ExtraAttributes.forEach((extraAttri, idx) => {
                if (extraAttri.Name === 'PC_DASH') {
                    streamSrc = extraAttri.Value;
        }

if (extraAttri.Name === 'laUrl_US_PlayReady_Widevine_playready') {
    playreadyDrmLAURL = extraAttri.Value;
}

if (extraAttri.Name === 'laUrl_US_PlayReady_Widevine_widevine') {
    widevineDrmLAURL = extraAttri.Value;
    widevineDrmLAURL = widevineDrmLAURL.replace('getlicense', 'GetLicense');
    //console.log(widevineDrmLAURL)
}

if (extraAttri.Name === 'ArchiveLength') {
    startOverArchiveLength = extraAttri.Value;
}

if (extraAttri.Name === 'StartOverLength') {
    startOverLength = extraAttri.Value;
}

if (extraAttri.Name === 'StartOverStartBuffer') {
    startOverStartBuffer = extraAttri.Value;
}

if (extraAttri.Name === 'StartOverEndBuffer') {
    startOverEndBuffer = extraAttri.Value;
}

});

if (streamSrc === '') {
    bitmovin.player(this.dashContainerUniqueId).unload();
    var imgUrl = "";
    if(this.userChannnels[channel_place] && this.userChannnels[channel_place].Images && this.userChannnels[channel_place].Images[0]){
        imgUrl = this.userChannnels[channel_place].Images[0].Url;
    }
    $('#top-bar-channel-logo').attr('src', imgUrl);
    /*this.onOverlayedBroadcastShedulSliderCloseClick();*/
    kpAp.displayPlyrMsg(1, void 0,'CHL-102');
    return;
}


var isDestroyError = false;
try {
    if(kpAp.config.flags.isPlyrErrMsgVisible){
        $('.plyr-err-msg-cnt').hide();
        kpAp.config.flags.isPlyrErrMsgVisible = false;
    }
            
    /*bitmovin.player(this.dashContainerUniqueId).destroy();*/
}
catch (e) {
    isDestroyError = true;
}

kpAp.config.isLicenseReqInProcess = true;


var irdetoUserSessionId = kpAp.config.validateTokenResponse.IrdetoSession.SessionId;
var irdetoUserTicket = kpAp.config.validateTokenResponse.IrdetoSession.Ticket;
var urlParams = '&SessionId=' + irdetoUserSessionId + '&Ticket=' + irdetoUserTicket;

if (typeof selectedStartoverProgram == 'object') {

    let progStartTime = new Date(this.startoverProgram.prog_start_time);
    let progEndTime = new Date(this.startoverProgram.prog_end_time);


    progStartTime.setSeconds(progStartTime.getSeconds() - parseInt(startOverStartBuffer));
    progEndTime.setSeconds(progEndTime.getSeconds() + parseInt(startOverEndBuffer));

    /*if (this.startoverProgram == this.currentProgram) {
     streamSrc = streamSrc + '?t=' + this.getUTCtimestampForStartoverVod(progStartTime);
     }
     else {
     streamSrc = streamSrc + '?t=' + this.getUTCtimestampForStartoverVod(progStartTime) + '-' + this.getUTCtimestampForStartoverVod(progEndTime);
     }*/


    kpAp.gAnalyticsModule.fireGoogleAnalyticsEvnt('Start Over', 'Open');
    streamSrc = streamSrc + '?t=' + this.getUTCtimestampForStartoverVod(progStartTime) + '-' + this.getUTCtimestampForStartoverVod(progEndTime);

    if (kpAp.config.flags.isDebugMsgsEnabled === 'true') {
        console.log('%cDebug - selected_starover_prog_start_time: ' + this.getSystemUTCtimestamp(progStartTime), 'background:#008080;color:#fff');
        console.log('%cDebug - selected_starover_prog_end_time: ' + this.getSystemUTCtimestamp(progEndTime), 'background:#008080;color:#fff');
    }

}
else if (kpAp.config.flags.isInTimeShiftMode) {

    this.startoverProgram.timeShiftPlayerStartTime = null;
    this.startoverProgram.timeShiftElapsedTime = null;
            
    if(this.timeShiftParams.timeShiftValue){
        let crntSysTime = new Date();
        crntSysTime.setSeconds(crntSysTime.getSeconds() - parseInt(this.crntChannelStartoverParams.archiveLength));

        let crntSysTimeWithShift = new Date();
        crntSysTimeWithShift.setSeconds(crntSysTimeWithShift.getSeconds() - this.timeShiftParams.timeShiftValue);
                
        if(crntSysTimeWithShift >= crntSysTime){
            streamSrc = streamSrc + '?time_shift=' + this.timeShiftParams.timeShiftValue;
        }else{
            var archiveDifference = this.crntChannelStartoverParams.archiveLength - 120;
            streamSrc = streamSrc + '?time_shift=' + archiveDifference;
        }
    }
        
    if (kpAp.config.flags.isDebugMsgsEnabled === 'true') {
        console.log('%cDebug - video time shifted in seconds: ' + this.startoverProgram.timeShiftValue, 'background:#008080;color:#fff');
    }
}
else {

    if (this.crntChannelStartoverParams.startoverLength && this.currentProgram != null) {
        this.startoverProgram = this.currentProgram;

        this.startoverProgram.timeShiftPlayerStartTime = null;
        this.startoverProgram.timeShiftElapsedTime = null;
        kpAp.config.flags.isInTimeShiftMode = true;
        kpAp.kpDash.populateStartoverBar();

        let crntSysTime = new Date();

        this.timeShiftParams.timeShiftValue = 0;
        this.timeShiftParams.timeShiftedToDate = new Date(crntSysTime);

        if (kpAp.config.flags.isDebugMsgsEnabled === 'true') {
            console.log('%cDebug - live program time shifted in seconds: ' + this.startoverProgram.timeShiftValue, 'background:#008080;color:#fff');
        }
    }

}

var srcVid = streamSrc;

var bitdashConfig = {
    key: 'f3746907-aa30-4548-a181-18ee366a8bb9',
    /*key: '459af1d82c5d074d1680c03ee85f163a',*/
    source: {
        dash: srcVid
    },
    style: {
        controls: false,
        mouse: false,
        autoHideControls: false,
        playOverlay: false,
        bufferingOverlay: true,
        showErrors: false,
    },
    skin: {
        screenLogoImage: ""
    },
    playback: {
        autoplay: true
    },
    events: {
        onStartBuffering: () => {
            kpAp.gAnalyticsModule.fireGoogleAnalyticsEvnt('Live Player', 'Buffering', 'Start');
},
onStopBuffering: () => {
    kpAp.gAnalyticsModule.fireGoogleAnalyticsEvnt('Live Player', 'Buffering', 'Stop');
},
onError: (a) => {
           
            Dispose();
        function ab2str(buf) {
            return String.fromCharCode.apply(null, new Uint8Array(buf));
        };

        function extractErrMsg(str) {
            var scndStr = '</CustomData>';
            var frstPos = str.indexOf('<StatusCode>');
            var scndPos = str.indexOf(scndStr);
            scndPos += scndStr.length;
            return str.substring(frstPos, scndPos);
        };

        if (a.code === 3000) {
            /*                            if (bitmovin.player(this.dashContainerUniqueId).isSetup()) {
             try{
             bitmovin.player(this.dashContainerUniqueId).destroy();
             }
             catch(e)
             {
             }
             }*/
            /* $('#' + this.dashContainerUniqueId).empty();
             bitmovin.player(this.dashContainerUniqueId).setup(this.bitdashConfig);
             $('.bitdash-vc').css('width', '100%');
             $('.bitdash-vc').css('height', '100%');*/
        }

        var servrRespBdy = ab2str(a.serverResponse);

        //alert(servrRespBdy);

        if(a.code === 3004){
            kpAp.displayPlyrMsg(1,void 0,'PLR-28');
            return;
        }
        // console.log("ERROR ----> ", servrRespBdy)
        if (a.code === 3011) {
            try {
                if (servrRespBdy.indexOf('<StatusCode>') !== -1) {
                    var extractedMsg = extractErrMsg(servrRespBdy);
                    if (extractedMsg.indexOf('100') !== -1) { //geo block
                        kpAp.displayPlyrMsg(1, void 0,'CTL-108');
                        /*alert('1-' + servrRespBdy);*/
                    }
                    else if (extractedMsg.indexOf('140') !== -1 || extractedMsg.indexOf('150') !== -1) { //Not authorized
                        kpAp.displayPlyrMsg(1, void 0,'CTL-201');
                        /*alert('1-' + servrRespBdy);*/
                    }
                    else if (extractedMsg.indexOf('ErrorCode=608') !== -1) { //device limit
                        kpAp.displayPlyrMsg(8,void 0,'CTL-608');
                        /*alert('2-' + servrRespBdy);*/
                    }
                    else if(a.message.indexOf('HTTP status 403') !== -1){
                        kpAp.displayPlyrMsg(15,void 0,'CTL-403');
                    }
                    else {
                        kpAp.displayPlyrMsg(1,void 0,'CTL-106');
                        /*alert('3-' + servrRespBdy);*/
                    }
                }
                else {
                    if (servrRespBdy.indexOf('invalid credentials') !== -1) {
                        kpAp.displayPlyrMsg(1,void 0,'CTL-107');
                        /*alert('4-' + servrRespBdy);*/
                    }
                    else if(a.message.indexOf('HTTP status 403') !== -1){
                        kpAp.displayPlyrMsg(15,void 0,'CTL-403');
                    }
                    else {
                        // console.log("OnError CTL-106: ", a.serverResponse)
                        // debugger
                        // $.ajax({
                        //    type: 'POST',
                        //    url: widevineDrmLAURL + urlParams,
                        //    success: function (a, b, c) {
                        //        debugger
                        //    },
                        //    error: function (a, b, c) {
                        //        debugger
                        //    }
                        // });
                        kpAp.displayPlyrMsg(1,void 0,'CTL-106');
                        /*alert('5-' + servrRespBdy);*/
                    }
                }
            }
            catch (e) {
            }
        }

        if (a.code === 3023) {
            $('#' + this.dashContainerUniqueId).empty();
            kpAp.displayPlyrMsg(14,void 0,'PLR-105');
            /*alert('6-' + servrRespBdy);*/
        }else if(!navigator.onLine){
            kpAp.kpDash.syncInternetDisconnection('PLR-101');
        }

        kpAp.config.isLicenseReqInProcess = false;
},
onVideoDownloadQualityChange: (e) => {
},
    onVideoAdaptation: (e) => {
        kpAp.config.isLicenseReqInProcess = false;

var availableVqualities = bitmovin.player(kpAp.kpDash.dashContainerUniqueId).getAvailableVideoQualities();
var sugestedBitrate = e.representationID.split('video=');

if (sugestedBitrate[1] <= kpAp.config.userPrefBitrate) {
    return e.representationID;
}
else {

    let bitrateC = availableVqualities[0].bitrate;
    for (let aBitrateObj of availableVqualities) {
        if (aBitrateObj.bitrate <= kpAp.config.userPrefBitrate) {
            bitrateC = aBitrateObj.bitrate;
    }
else {
                                break;
}
}

return 'video=' + bitrateC;

}

},
onAudioAdaptation: (e) => {
    kpAp.config.isLicenseReqInProcess = false;
return e.suggested;
}
}
};

var challengeCstmData = 'irdeto-urlencoded=v1&DMClient=' + browserInfo.name + '&DMClientVersion=' + browserInfo.version + '&DMDeviceModel=PC&DMOS=' + kpAp.getOSfromUAstr() + '&DMOSVersion=vt&DMIsRooted=no';
bitdashConfig.source.drm = {
    playready: {
        LA_URL: playreadyDrmLAURL + urlParams/*,customData: challengeCstmData*/
    },
    widevine: {
        LA_URL: widevineDrmLAURL + urlParams,
        mediaKeySystemConfig: {
            persistentState: 'required'
        } 
    }
};

if (bitmovin.player(this.dashContainerUniqueId).isSetup()) {
    bitmovin.player(this.dashContainerUniqueId).load(bitdashConfig.source);
}
else {
    $('#' + this.dashContainerUniqueId).empty();
    bitmovin.player(this.dashContainerUniqueId).setup(bitdashConfig);
}

bitmovin.player(this.dashContainerUniqueId).addEventHandler('onReady', (data) => {

    // console.log("onReady")
    bitmovin.player(this.dashContainerUniqueId).play();

if (this.startoverProgramToBeSeekedVal != null) {
    bitmovin.player(this.dashContainerUniqueId).seek(this.startoverProgramToBeSeekedVal);
    this.startoverProgramToBeSeekedVal = null;
}

if ($('.vol-vol-mute-btn').attr('data-state') === 'mute') {
    bitmovin.player(this.dashContainerUniqueId).mute();
}
else {
    bitmovin.player(this.dashContainerUniqueId).setVolume(this.playerVolume);
}
this.chkAudioLangsOfstream();


var arr = [];
var bitratesArr = bitmovin.player(this.dashContainerUniqueId).getAvailableVideoQualities();
bitratesArr.forEach((bitrateObj, idx) => {
    arr.push(bitrateObj.bitrate);
});
kpAp.config.availableBitRates = arr;
/***********************************************/

this.populateBRchartDynam();

/***          resetting bandwidth limit         ****/
function adjstBandwidthBar(i) {
    //kpAp.config.userPrefBitrate = kpAp.config.availableBitRates[i];
    var progBarWidth = (i + 1) * part;
    if (kpAp.config.flags.isBandwidthLimitSetByUsr) {
        this.bandwidthBarClickProcess(progBarWidth, 'dont-set-plyr-bitrate');
    }
    else {
        this.bandwidthBarClickProcess(progBarWidth);
    }
};



kpAp.jqNodsCache.getNode('.bandwidth-prgrss-bar').width(0);
var totalWidth = kpAp.jqNodsCache.getNode('.bandwidth-clikable-bar').width();
var part = Math.floor(totalWidth / kpAp.config.availableBitRates.length);

/*for (var i = 0; i < kpAp.config.availableBitRates.length; i++) {
 if (kpAp.config.availableBitRates[i] >= kpAp.config.userPrefBitrate) {
 adjstBandwidthBar.call(this, i)
 kpAp.config.isBRchrtLodedForChnl = true;
 break;
 }
 }

 adjstBandwidthBar.call(this, kpAp.config.availableBitRates.length - 1);*/

let bitrateIdx = 0;
if(typeof kpAp.config.flags.isBandwidthLimitSetByUsr !== "undefined" && kpAp.config.flags.isBandwidthLimitSetByUsr === true){

}else{
	
	kpAp.config.userPrefBitrate = 5500000;
}
for (let i = 0; i < kpAp.config.availableBitRates.length; i++) {
    if (kpAp.config.availableBitRates[i] >= kpAp.config.userPrefBitrate) {
        break;
    }
    else {
        bitrateIdx = i;
    }
}

adjstBandwidthBar.call(this, bitrateIdx);

kpAp.jqNodsCache.getNode('.bandwidth-limit-container > .selected-bandwidth-rate').text(Math.floor(kpAp.config.availableBitRates[bitrateIdx] / 1000) + ' kbps');

kpAp.config.isBRchrtLodedForChnl = true;

});

$('.bitdash-vc').css('width', '100%').css('height', '100%');

var imgUrl = "";
if(this.userChannnels[channel_place] && this.userChannnels[channel_place].Images && this.userChannnels[channel_place].Images[0]){
    imgUrl = this.userChannnels[channel_place].Images[0].Url;
}
$('#top-bar-channel-logo').attr('src', imgUrl);

},


findNSetCrntPlayringProgram() {
    var isCrntProgFound = false;
    var crntSysTime = new Date();
    if (this.currentChannelPrograms !== null && typeof this.currentChannelPrograms !== 'undefined') {
        isCrntProgFound = !this.currentChannelPrograms.Programs.every((prog, idx) => {

            var progStartTime = prog.prog_start_time;
        var progEndTime = prog.prog_end_time;

        if (crntSysTime >= progStartTime && crntSysTime < progEndTime) {

            this.currentProgram = prog;
            return false;
        }
        return true;
    });
}

if (isCrntProgFound) {
    return true;
}
else {
    this.currentProgram = null;
    return false;
}
},


loadProgramDetails(isStartoverProgram) {
    var contentId;
    var lang = kpAp.config.userPrefLanguage;
    var size = 'full';

    if (isStartoverProgram) {
        contentId = this.startoverProgram.ContentId;
        kpAp.APIcallerModule.getContentDetailsForStartoverProgram(contentId, lang, size);

    }
    else {
        contentId = this.currentProgram.ContentId;
        kpAp.APIcallerModule.getContentDetailsForCurrentProgram(contentId, lang, size);
    }

},


        loadChannelEPG(channel_place) {
            if (channel_place !== -1) {
                var selected_channel_id = this.userChannnels[channel_place].ChannelId;

                kpAp.APIcallerModule.getChannelEPG(selected_channel_id, kpAp.config.userPrefLanguage, this.crntChannelStartoverParams.startoverLength);
            }
        },

    checkIsChannelAuthoried() {
        if (this.userChannnels[kpAp.config.crntPlayingChannelIndex].IsAuthorized === false) {
            try {
                bitmovin.player(this.dashContainerUniqueId).stop();
            } catch (e) {
            }

            clearTimeout(kpAp.config.isAuthoDelayTimer);
            kpAp.config.isAuthoDelayTimer = setTimeout(() => {
                kpAp.displayPlyrMsg(6,void 0,'CHL-201');
        }, 4000);
    }
},


OnOverlayedChannelLogoClick(channel_place) {
    this.availableStartoverPrograms = null;
    this.isNoInfoNotificationClickedForCrntProg = false;

    kpAp.config.flags.isInTimeShiftMode = false;
    this.startoverProgramToBeSeekedVal = null;
    kpAp.config.flags.isStartoverMode = false;
    this.startoverProgram = null;
    this.startoverProgramDetails = null;


    if (kpAp.config.isFPusrBlkd) {
        return;
    }

    kpAp.config.isLicenseReqInProcess = false;
    kpAp.jqNodsCache.getNode('.broadcast-schedule-container .broadcast-content').empty();
    kpAp.jqNodsCache.getNode('.kweb-startover-contents-container').empty();
    this.onStartoverCloseBtnClick();
    /*this.onOverlayedBroadcastShedulSliderCloseClick();*/

    try {
        bitmovin.player(this.dashContainerUniqueId).unload();
    }
    catch (e) {
    }

    $('.plyr-err-msg-cnt').hide();
    kpAp.config.flags.isPlyrErrMsgVisible = false;
    kpAp.config.isBRchrtLodedForChnl = false;
    kpAp.config.crntChnlCSMPausCounter = 0;
    kpAp.config.flags.isChnlPausedByUsr = false;

    this.isCSMheartbeatNOK = false;
    if(kpAp.config.CSMheartBeatResp){
        this.maxRetriesAttempt = kpAp.config.CSMheartBeatResp.heartbeat.policy.maxMissedHeartbeats != null ? kpAp.config.CSMheartBeatResp.heartbeat.policy.maxMissedHeartbeats:kpAp.config.validateTokenResponse.IrdetoSession.ConcurrentStreamInfo.MaxMissedHeartbeats;     
    }else{
        this.maxRetriesAttempt = kpAp.config.validateTokenResponse.IrdetoSession.ConcurrentStreamInfo.MaxMissedHeartbeats;
    }
        
    clearTimeout(this.streamLoad2scndsDelayTimerId);
    clearTimeout(kpAp.CSMheartBeatModule.CSMheartbeatReqTimeoutId);
    clearInterval(kpAp.gAnalyticsModule.channelPlaybackRecordIntervalId);
    
    //onCSMPlayLiveTVOnly();
    //onCSMPlay();
    onCSMPlayChannelChange();
    if (!kpAp.config.flags.isPlayerFirstChnl) {
        /* kpAp.config.channelsList[kpAp.config.crntPlayingChannelIndex].audioChannelIndex = null;*/
        kpAp.CSMheartBeatModule.sndCSMheartbeatPauseReq();
    } else {
        kpAp.config.crntPlayingChannelIndex = channel_place;
       
        //onCSMPlay();
        kpAp.CSMheartBeatModule.sndCSMheartbeatPlayReq();
    }

    kpAp.config.flags.isPlayerFirstChnl = false;

    kpAp.config.crntPlayingChannelIndex = channel_place;

    this.crntChannelStartoverParams = this.getStartoverParamsForCrntChannel();

    if (kpAp.config.channelsList[kpAp.config.crntPlayingChannelIndex].IsAuthorized === true) {
        kpAp.APIcallerModule.callIsAliveApi();
    }


    if (typeof this.crntChannelStartoverParams.startoverLength != 'undefined') {

        if (!this.isNextBroadcastBarDisplayed) {
            kpAp.jqNodsCache.getNode('.kweb-startover-container').css('visibility', 'visible');
        }
    }
    else {
        kpAp.jqNodsCache.getNode('.kweb-startover-container').css('visibility', 'hidden');
    }


    /*this.chkNdisplayFngrPrnt();*/
    this.currentProgramDetails = null;

    kpAp.config.flags.isChnlStreamSet = false;
    kpAp.config.flags.isChnlEpgAvailable = false;

    this.onInfoScrnSubButtonclick(1);
    this.loadChannelEPG(channel_place);

    /* this.setPlayerStream(channel_place);*/
    kpAp.gAnalyticsModule.fireGoogleAnalyticsEvnt('Channel', 'Play', kpAp.config.channelsList[channel_place].Title, {
        dimension3: kpAp.config.validateTokenResponse.BBSData.UserData.SubscriberId
    });

    kpAp.gAnalyticsModule.channelPlaybackRecordIntervalId = setInterval(() => {
        clearInterval(kpAp.gAnalyticsModule.channelPlaybackRecordIntervalId);
    kpAp.gAnalyticsModule.fireGoogleAnalyticsEvnt('Live Player', 'Play', kpAp.config.channelsList[channel_place].Title);
}, 60000);

this.checkIsChannelAuthoried();

this.clearBitRateChart();
this.chartCurrentHorizontalPosition = 0;
this.chartPrevVerticlePosition = -1;

},

chkAudioLangsOfstream() {
    var availAudioObjs = bitmovin.player(this.dashContainerUniqueId).getAvailableAudio();
    var crntAudioObj = bitmovin.player(this.dashContainerUniqueId).getAudio();
    if (availAudioObjs.length > 1) {
        $('.lang-tp-menu-item').css('display', 'inline-block');
    } else {
        $('.lang-tp-menu-item').css('display', 'none');

        $('.top-menu-lang-details-container').hide();
    }
    if (availAudioObjs.length > 1) {
        if (kpAp.config.usrSlctdAudioLang !== '') {
            if (kpAp.config.usrSlctdAudioLang == 'vietnamese') {
                this.onOverlayedLangVTselected();
            }
            else {
                this.onOverlayedLangENGselected();
            }

            return;
        }
        else {
            if (availAudioObjs[1].label === 'vi') {
                this.onOverlayedLangVTselected();
            } else {
                this.onOverlayedLangENGselected();
            }

            return;
        }
    }

    if (crntAudioObj && crntAudioObj.length > 0 && (crntAudioObj.label === 'und' || crntAudioObj.label === 'en'|| crntAudioObj.label === 'eng')) {
        this.onOverlayedLangENGselected();
    } else if (crntAudioObj && crntAudioObj.length > 0) {
        this.onOverlayedLangVTselected();
    }
},


        clearBitRateChart() {
            var rows = $('#realtime-bitrate-chart').children();
            if (rows === undefined) {
                return;
            }

            $.each(rows, function (idx, row) {
                var cols = row.children;
                $.each(cols, function (idx, col) {
                    $(col).css('background-color', '').css('border-right', '');
                });
            });
        },


        calcNPopulateChartVerticleMarks() {
            if (this.chartPrevVerticlePosition !== -1) {
                var vertPos = this.chartCurrentVerticlePosition;

                var rows = $('#realtime-bitrate-chart').children().get().reverse();
                var cols;

                if (this.chartPrevVerticlePosition < this.chartCurrentVerticlePosition) {
                    while (this.chartPrevVerticlePosition <= vertPos) {
                        cols = $(rows[vertPos]).children();
                        $(cols[this.chartCurrentHorizontalPosition - 1]).css('border-right', '7px solid white');
                        vertPos--;
                    }
                } else if (this.chartPrevVerticlePosition > this.chartCurrentVerticlePosition) {
                    while (this.chartPrevVerticlePosition >= vertPos) {
                        cols = $(rows[vertPos]).children();
                        $(cols[this.chartCurrentHorizontalPosition - 1]).css('border-right', '7px solid white');
                        vertPos++;
                    }
                }
            }
        },


        calcNpopulateChartHorizonMark() {
            var rows = $('#realtime-bitrate-chart').children().get().reverse();
            if (rows.lenght == 0) {
                return;
            }

            var cols = rows[this.chartCurrentVerticlePosition].children;

            if (cols.lenght == 0) {
                return;
            }

            var col = cols[this.chartCurrentHorizontalPosition];
            $(col).css('background-color', 'white');
        },


        updateBitrateChart() {
            if (kpAp.config.availableBitRates.length > 0 && kpAp.jqNodsCache.getNode('#realtime-bitrate-chart').length && bitmovin.player(this.dashContainerUniqueId).isPlaying()) {

                this.currentBitrate = bitmovin.player(this.dashContainerUniqueId).getPlaybackVideoData().bitrate;
                if (!this.currentBitrate) {
                    this.currentBitrate = bitmovin.player(this.dashContainerUniqueId).getDownloadedVideoData().bitrate;
                }

                kpAp.jqNodsCache.getNode('.stream-bandwidth').text(kpAp.MultiLangSupportModule.getLabel(7, kpAp.config.userPrefLanguage) + ' ' + (this.currentBitrate / 1000) + ' kbps');

                // matching stream-bitrate with chart bitrates
                for (var i = 0; i < kpAp.config.availableBitRates.length; i++) {
                    if (this.currentBitrate <= kpAp.config.availableBitRates[i]) {
                        this.chartCurrentVerticlePosition = i * 2;
                        break;
                    }
                }

                if (this.chartCurrentHorizontalPosition === 9) {
                    this.clearBitRateChart();
                    this.chartCurrentHorizontalPosition = 0;
                    this.chartPrevVerticlePosition = -1;
                }

                this.calcNpopulateChartHorizonMark();

                this.calcNPopulateChartVerticleMarks();

                this.chartCurrentHorizontalPosition++;

                this.chartPrevVerticlePosition = this.chartCurrentVerticlePosition;
            } else {
                // try {
                //     kpAp.jqNodsCache.getNode('.bandwidth-limit-container > .selected-bandwidth-rate').text(Math.floor(kpAp.config.availableBitRates[kpAp.config.availableBitRates.length - 1] / 1000) + ' kbps');
                // }
                // catch (e) {
                //     kpAp.jqNodsCache.getNode('.bandwidth-limit-container > .selected-bandwidth-rate').text('');
                // }
                // KWEB-1180
                kpAp.jqNodsCache.getNode('.bandwidth-limit-container > .selected-bandwidth-rate').text('0 kbps');
                this.clearBitRateChart();
                kpAp.jqNodsCache.getNode('.stream-bandwidth').text(kpAp.MultiLangSupportModule.getLabel(7, kpAp.config.userPrefLanguage) + ' ' + 0 + ' kbps');

                /*clearing  X,Y positions of chart*/
                this.chartCurrentHorizontalPosition = 0;
                this.chartCurrentVerticlePosition = 0;
                this.chartPrevVerticlePosition = -1;
            }
        },


    populateChannelsList() {
        var jNode = $('.menu-container .channels-menu');
        jNode.empty();

        this.userChannnels.forEach((chnl, idx) => {
            var imgUrl = "";
        if(chnl && chnl.Images && chnl.Images[0]){
            imgUrl = chnl.Images[0].Url;
        }
        jNode.append('<div data-val="' + idx + '" class="channel-logo-button"><img src="' + imgUrl + '"></img>' +
            '</div>');
    });

$('.channel-logo-button').on('click', (e) => {
    let $this = $(e.currentTarget);
this.OnOverlayedChannelLogoClick($this.data('val'));
});

},

loadChannelsList() {
    if (this.userChannnels.length) {
        this.populateChannelsList();
    } else {
        kpAp.APIcallerModule.getChannels();
    }
},

    mainOverlayFadeEffectsTimer() {
        this.ovrlayMousMovDisableCntr++;
        this.idleTimeKPoverlay++;
        if (this.idleTimeKPoverlay > 2) { 
            if (!kpAp.jqNodsCache.getNode('.kplus-video-overlay').is(':hidden')) {
                if (kpAp.jqNodsCache.getNode('.kplus-video-overlay .central-content-popup').is(':hidden') && !this.isMouseOverChannelsList && !this.isMouseOverVideoCntrlBar && !this.isMouseOverNextBttnEPGscrollBar && !this.isMouseOverStartoverBar) {
                    this.ovrlayMousMovDisableCntr = 0;
                    kpAp.jqNodsCache.getNode(".kplus-video-overlay").fadeOut(800);
                    kpAp.jqNodsCache.getNode("#player-container").css('cursor', 'none');
                }
            }
        }

        if (this.idleTimeKPoverlay <= 2) { 
            kpAp.jqNodsCache.getNode(".kplus-video-overlay").show();
            kpAp.jqNodsCache.getNode("#player-container").css('cursor', 'auto');
        }
    },

/* private method */
    attachFadeInOutEffectsToMainOverlayContainer() {
        
        $("#player-container").mousemove((e) => {
            if (this.ovrlayMousMovDisableCntr >= 1)
                this.idleTimeKPoverlay = 0;
    });
},

setPlayerUIlblsLang() {
    this.changeLangOfAllUIlabels(kpAp.config.userPrefLanguage);
},

    setStreamAudioLanguage() {
        /*var getAudioObj = bitmovin.player(this.dashContainerUniqueId).getAudio();*/
    },

    attachVolmCntrlHoverEffect() {
        var jNode1 = $(".volume-progressbar-container");
        jNode1.mouseover(() => {
            $(".volume-progressbar-container").attr('data-state', 'visible');
    });
jNode1.mouseleave(() => {
    $(".volume-progressbar-container").attr('data-state', 'hidden');
});

var jNode2 = $(".volume-cntrl");
jNode2.mouseover(() => {
    $(".volume-progressbar-container").attr('data-state', 'visible');
});
jNode2.mouseleave(() => {
    $(".volume-progressbar-container").attr('data-state', 'hidden');
});
},

fullScreenBehavior(){ 
    /*$(".progress-bar-overlayed").show();*/
        
    var valueofElement = document.getElementById("playerstate");

    var docElm =  document.getElementsByClassName('plyr-cnt-cnt-outer')[0]; 

    if(valueofElement.innerHTML == "not"){
        if (docElm.requestFullscreen) {
            docElm.requestFullscreen();
        }
        else if (docElm.mozRequestFullScreen) {
            docElm.mozRequestFullScreen();
        }
        else if (docElm.webkitRequestFullScreen) {
            docElm.webkitRequestFullScreen();
        }
        else if (docElm.msRequestFullscreen) {
            docElm.msRequestFullscreen();
        }
    }else{
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
        else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        }
        else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
        }
        else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }
},

    bandwidthBarClickProcess(offset, mode) {
        var selected_bitrate;
        var offsetWidth = offset;
        if (kpAp.config.availableBitRates.length > 0) {
            var totalWidth = $('.bandwidth-clikable-bar').width();
            var part = totalWidth / kpAp.config.availableBitRates.length;
            part = Math.floor(part);

            for (var i = 1; i <= kpAp.config.availableBitRates.length; i++) {
                if (part * i >= offsetWidth || (i == kpAp.config.availableBitRates.length)) {
                    if (kpAp.config.userPrefBitrate == kpAp.config.availableBitRates[i - 1]) {
                        if (offsetWidth < part * i) {
                            if (i > 1 && kpAp.config.isBRchrtLodedForChnl) {
                                offsetWidth = part * (i - 1);
                                selected_bitrate = kpAp.config.availableBitRates[i - 2];
                                break;
                            }
                        }
                    }

                    offsetWidth = part * i;
                    selected_bitrate = kpAp.config.availableBitRates[i - 1];

                    break;
                }
            }

            /*adjusting to max width*/
            if (offsetWidth > totalWidth - 5)
                offsetWidth = totalWidth;

            kpAp.jqNodsCache.getNode('.bandwidth-prgrss-bar').width(offsetWidth);

            kpAp.config.userPrefBitrate = Math.floor(selected_bitrate);

            if(kpAp.config.userPrefBitrate){
                // bitmovin.player(this.dashContainerUniqueId).setVideoQuality("video="+kpAp.config.userPrefBitrate);
                bitmovin.player(this.dashContainerUniqueId).setVideoQuality(kpAp.config.userPrefBitrate.toString());
            }
            
            clearInterval(kpAp.gAnalyticsModule.oneMinBitrateRecordIntervalId);
            kpAp.gAnalyticsModule.oneMinBitrateRecordIntervalId = setInterval(() => {
                clearInterval(kpAp.gAnalyticsModule.oneMinBitrateRecordIntervalId);
            kpAp.gAnalyticsModule.fireGoogleAnalyticsEvnt('Bandwidth', 'Playback', selected_bitrate);
        }, 60000);

        kpAp.gAnalyticsModule.fireGoogleAnalyticsEvnt('Quality', 'Bit Rate Selection', selected_bitrate);
        kpAp.gAnalyticsModule.fireGoogleAnalyticsEvnt('Bandwidth', 'Bit Rate Change', selected_bitrate);

        if (mode == undefined)
            /*this.setPlayerBitrate(selected_bitrate);*/

            $('.selected-bandwidth-rate').text(Math.floor(selected_bitrate / 1000) + ' kbps');
        var lblTxt = kpAp.MultiLangSupportModule.getLabel(7, kpAp.config.userPrefLanguage);
        $('.stream-bandwidth').text(lblTxt + ' ' + 0 + ' kbps');
    }
},
onMouseEnterStartoverBar(){
    this.isMouseOverStartoverBar = true;
},
    onMouseLeaveStartoverBar(){
        this.isMouseOverStartoverBar = false;
    },
    onStartoverContainerBtnClick(){

        var cntWidth = kpAp.jqNodsCache.getNode(".kweb-startover-container").width();
        var innerCntWidth = kpAp.jqNodsCache.getNode(".kweb-startover-btn-container").width();
        var cntCssLeftPropVal = cntWidth - innerCntWidth;

        if (this.isStartoverBarDisplayed) {
            $(".kweb-startover-container").animate({
                left: -cntCssLeftPropVal + "px"
            }, 1000);

            this.isStartoverBarDisplayed = false;
            kpAp.jqNodsCache.getNode('.broadcast-schedule-container').css('visibility', 'visible');
        } else {
            $(".kweb-startover-container").animate({
                left: "0px"
            }, 1000);

            kpAp.jqNodsCache.getNode('.broadcast-schedule-container').css('visibility', 'hidden');
            this.isStartoverBarDisplayed = true;
        }
    },
    onStartoverCloseBtnClick(){
        this.startoverProgramToBeSeekedVal = null;
        setTimeout(function () {
            var cntWidth = $(".kweb-startover-container").width();
            if(cntWidth < 900){
                cntWidth = 900;
            }
            var innerCntWidth = $(".kweb-startover-btn-container").width();
            if(innerCntWidth < 136){
                innerCntWidth = 136;
            }
            var cntCssLeftPropVal = cntWidth - innerCntWidth;

            $(".kweb-startover-container").animate({
                left: -cntCssLeftPropVal + 'px'
            }, 1000);

            this.isStartoverBarDisplayed = false;
            $('.broadcast-schedule-container').css('visibility', 'visible');
        }, 1000)

    },
    onStartoverLeftScrollBtnClick(){
        $('.kweb-startover-contents-container').animate({
            scrollLeft: '-=300'
        }, 500);
    },
    onStartoverRightScrollBtnClick(){
        $('.kweb-startover-contents-container').animate({
            scrollLeft: '+=300'
        }, 500);
    },

    onVideoLeftProgressBarClick(e){

        let xPos;
        if (typeof e == 'number') {
            xPos = e;
        }
        else {
            xPos = e.offsetX;
        }

        let progressBarLeft = kpAp.jqNodsCache.getNode('.kp-vid-progressbar-left');
        let progressBarMiddle = kpAp.jqNodsCache.getNode('.kp-vid-progressbar-middle');

        let leftProgressBarWidth = progressBarLeft.width();
        let middleProgressBarWidth = progressBarMiddle.width();

        /*let leftProgressBarWidth = this.leftProgressBarWidth;
         let middleProgressBarWidth = this.middleProgressBarWidth;*/


        if (kpAp.config.flags.isStartoverMode) {

            let ratio = xPos / (leftProgressBarWidth + middleProgressBarWidth);

            /*console.log(xPos + 'in startover left ratio: ' + ratio);*/

            this.seekStartoverStream(ratio);

        }
        else if (kpAp.config.flags.isInTimeShiftMode) {

            let ratio = xPos / (leftProgressBarWidth + middleProgressBarWidth);

            let crntSysTime = new Date();
            let diffBtwProgStartNCrntSysTime = Math.floor((crntSysTime - this.startoverProgram.prog_start_time) / 1000);

            let newTimeShiftVal = Math.floor(diffBtwProgStartNCrntSysTime * ratio);
            newTimeShiftVal = diffBtwProgStartNCrntSysTime - newTimeShiftVal;

            this.startoverProgram.timeShiftPlayerStartTime = null;
            this.startoverProgram.timeShiftElapsedTime = null;

            if(typeof this.timeShiftParams.timeShiftValue == 'number'){
                if(newTimeShiftVal > this.timeShiftParams.timeShiftValue){
                    kpAp.gAnalyticsModule.fireGoogleAnalyticsEvnt('Live Player', 'Time Shift Left');
                }
                else{
                    kpAp.gAnalyticsModule.fireGoogleAnalyticsEvnt('Live Player', 'Time Shift Right');
                }
            }

            this.timeShiftParams.timeShiftValue = newTimeShiftVal;
            let dTemp = new Date();
            dTemp.setSeconds(dTemp.getSeconds() - newTimeShiftVal);
            this.timeShiftParams.timeShiftedToDate = dTemp;
            kpAp.config.flags.isChnlStreamSet = false;
        }
        else {
            if (this.currentProgram != null && this.crntChannelStartoverParams.startoverLength) {

                if (bitmovin.player(kpAp.kpDash.dashContainerUniqueId).isReady()) {

                    let ratio = xPos / progressBarLeft.width();

                    let crntSysTime = new Date();
                    let diffBtwProgStartNCrntSysTime = Math.floor((crntSysTime - this.currentProgram.prog_start_time) / 1000);

                    this.currentProgram.timeShiftPlayerStartTime = null;
                    this.currentProgram.timeShiftElapsedTime = null;

                    this.startoverProgram = this.currentProgram;

                    kpAp.config.flags.isInTimeShiftMode = true;
                    kpAp.kpDash.populateStartoverBar();


                    let newTimeShiftVal = Math.floor(diffBtwProgStartNCrntSysTime * ratio);
                    newTimeShiftVal = diffBtwProgStartNCrntSysTime - newTimeShiftVal;

                    this.timeShiftParams.timeShiftValue = newTimeShiftVal;
                    let dTemp = new Date();
                    dTemp.setSeconds(dTemp.getSeconds() - newTimeShiftVal);
                    this.timeShiftParams.timeShiftedToDate = dTemp;
                    kpAp.config.flags.isChnlStreamSet = false;
                }
            }
        }
    },

    onVideoMiddleProgressBarClick(e){

        let xPos;
        if (typeof e == 'number') {
            xPos = e;
        }
        else {
            xPos = e.offsetX;
        }

        let progressBarLeft = kpAp.jqNodsCache.getNode('.kp-vid-progressbar-left');
        let progressBarMiddle = kpAp.jqNodsCache.getNode('.kp-vid-progressbar-middle');

        /*let leftProgressBarWidth = this.leftProgressBarWidth;
         let middleProgressBarWidth = this.middleProgressBarWidth;*/

        let leftProgressBarWidth = progressBarLeft.width();
        let middleProgressBarWidth = progressBarMiddle.width();

        if (kpAp.config.flags.isStartoverMode) {

            let vodDuration = bitmovin.player(this.dashContainerUniqueId).getDuration();
            if (typeof vodDuration != 'number') {
                return;
            }

            let ratio = (leftProgressBarWidth + xPos) / (leftProgressBarWidth + middleProgressBarWidth);

            ratio = ratio > 1 ? 1 : ratio;

            this.seekStartoverStream(ratio);

        }
        else if (kpAp.config.flags.isInTimeShiftMode) {

            let ratio = (leftProgressBarWidth + xPos) / (leftProgressBarWidth + middleProgressBarWidth);

            let crntSysTime = new Date();

            let diffBtwProgStartNCrntSysTime = Math.floor((crntSysTime - this.startoverProgram.prog_start_time) / 1000);
            let progLengthInScnds = Math.floor((this.startoverProgram.prog_start_time - this.startoverProgram.prog_start_time) / 1000);
            let newTimeShiftVal = Math.floor(diffBtwProgStartNCrntSysTime * ratio);
            newTimeShiftVal = diffBtwProgStartNCrntSysTime - newTimeShiftVal;

            this.startoverProgram.timeShiftPlayerStartTime = null;
            this.startoverProgram.timeShiftElapsedTime = null;

            if(typeof this.timeShiftParams.timeShiftValue == 'number'){
                if(newTimeShiftVal > this.timeShiftParams.timeShiftValue){
                    kpAp.gAnalyticsModule.fireGoogleAnalyticsEvnt('Live Player', 'Time Shift Left');
                }
                else{
                    kpAp.gAnalyticsModule.fireGoogleAnalyticsEvnt('Live Player', 'Time Shift Right');
                }
            }

            this.timeShiftParams.timeShiftValue = newTimeShiftVal;
            let dTemp = new Date();
            dTemp.setSeconds(dTemp.getSeconds() - newTimeShiftVal);
            this.timeShiftParams.timeShiftedToDate = dTemp;

            kpAp.config.flags.isChnlStreamSet = false;
        }
    },

    onProgressBarKpClick(e){

        /*if (kpAp.config.flags.isStartoverMode) {

         let vodDuration = bitmovin.player(this.dashContainerUniqueId).getDuration();
         if(typeof vodDuration != 'number'){
         return;
         }

         console.log('onProgressBarClick');

         let progressBar = kpAp.jqNodsCache.getNode('.progress-bar-kp');

         let ratio = e.offsetX / progressBar.width();

         let ratio2 = ($('.kp-vid-progressbar-left').width() + $('.kp-vid-progressbar-middle').width()) / $('.progress-bar-kp').width();

         this.seekStartoverStream(ratio * ratio2);
         }*/
    },

    seekStartoverStream(ratio){

        let dur = Math.floor(bitmovin.player(this.dashContainerUniqueId).getDuration());
        let crntPos = Math.floor(bitmovin.player(this.dashContainerUniqueId).getCurrentTime());

        let endBoundary = dur - parseInt(this.crntChannelStartoverParams.startOverEndBuffer) - parseInt(this.crntChannelStartoverParams.startOverStartBuffer);

        let seekVal = Math.floor(endBoundary * ratio);

        /*if (dur == crntPos) {
            this.startoverProgramToBeSeekedVal = seekVal;
            kpAp.config.flags.isChnlStreamSet = false;
        }
        else {

            bitmovin.player(this.dashContainerUniqueId).seek(seekVal);
        }*/

        bitmovin.player(this.dashContainerUniqueId).seek(seekVal);


        if (bitmovin.player(this.dashContainerUniqueId).isPaused() || dur == crntPos) {
            bitmovin.player(this.dashContainerUniqueId).play();
        }
    },

    onStartoverBtnClick(){
        
        onCSMPlay();
        if (kpAp.config.isFPusrBlkd) {
            return;
        }

        if (this.userChannnels[kpAp.config.crntPlayingChannelIndex].IsAuthorized === false) {
            this.checkIsChannelAuthoried();
            return;
        }

        this.isNoInfoNotificationClickedForCrntProg = false;


        if (kpAp.config.flags.isStartoverMode) {

            if (this.startoverProgram.AdditionalInfo.OTTEnabled == 'false') {
                return;
            }


            if(kpAp.config.flags.isPlyrErrMsgVisible){
                return;
            }

            /*if(bitmovin.player(this.dashContainerUniqueId).isPaused()){

                let vodDuration = bitmovin.player(_wgsbneq.kpDash.dashContainerUniqueId).getDuration();
                let vodElapsedTime = bitmovin.player(_wgsbneq.kpDash.dashContainerUniqueId).getCurrentTime();
                let programEpgDuration = Math.floor((this.startoverProgram.prog_end_time - this.startoverProgram.prog_start_time) / 1000);


                if (typeof vodDuration != 'number') {
                    vodDuration = -1;
                }

                let archiveLengthEndDate = new Date();
                archiveLengthEndDate.setSeconds(archiveLengthEndDate.getSeconds() - parseInt(this.crntChannelStartoverParams.archiveLength));
                let progCrntStreamDate = new Date(this.startoverProgram.prog_start_time);
                progCrntStreamDate.setSeconds(progCrntStreamDate.getSeconds() - parseInt(this.crntChannelStartoverParams.startOverStartBuffer));
                progCrntStreamDate.setSeconds(progCrntStreamDate.getSeconds() + vodElapsedTime);

                if (archiveLengthEndDate > progCrntStreamDate) {
                    kpAp.displayPlyrMsg(13);
                    return;
                }
            }*/


            this.seekStartoverStream(0);

        }
        else if (kpAp.config.flags.isInTimeShiftMode) {

            this.startoverProgram.timeShiftPlayerStartTime = null;
            this.startoverProgram.timeShiftElapsedTime = null;

            let crntSysTime = new Date();
            let diffInScnds = Math.floor((crntSysTime - this.startoverProgram.prog_start_time) / 1000);


            let archiveLength = parseInt(this.crntChannelStartoverParams.archiveLength);

            if(diffInScnds > archiveLength + 100){
                diffInScnds = archiveLength + 100;
            }

            this.timeShiftParams.timeShiftValue = diffInScnds;
            this.timeShiftParams.timeShiftedToDate = new Date(this.startoverProgram.prog_start_time);

            if (this.startoverProgram.ContentId != this.currentProgram.ContentId) {
                this.onStartoverProgramSelected(this.startoverProgram.ContentId);
                return;
            }

            kpAp.config.flags.isChnlStreamSet = false;
        }
        else {

            if (this.currentProgram.AdditionalInfo.OTTEnabled == 'false') {
                return;
            }

            this.startoverProgram = this.currentProgram;

            this.startoverProgram.timeShiftPlayerStartTime = null;
            this.startoverProgram.timeShiftElapsedTime = null;
            kpAp.config.flags.isInTimeShiftMode = true;
            kpAp.kpDash.populateStartoverBar();

            let crntSysTime = new Date();
            let diffInScnds = Math.floor((crntSysTime - this.startoverProgram.prog_start_time) / 1000);

            this.timeShiftParams.timeShiftValue = diffInScnds;
            this.timeShiftParams.timeShiftedToDate = new Date(this.startoverProgram.prog_start_time);

            kpAp.config.flags.isChnlStreamSet = false;

        }

        this.adjustStartoverBarProgramsState();

        /*this.populateStartoverBar();*/

    },

    onStartoverPlayNextBtnClick(){

        
        onCSMPlay();
        if (kpAp.config.isFPusrBlkd) {
            return;
        }

        if (this.userChannnels[kpAp.config.crntPlayingChannelIndex].IsAuthorized === false) {
            this.checkIsChannelAuthoried();
            return;
        }


        let startoverLengthTimeInstant = new Date();
        startoverLengthTimeInstant.setSeconds(startoverLengthTimeInstant.getSeconds() - parseInt(this.crntChannelStartoverParams.startoverLength));
        let foundProg = null;

        foundProg = this.currentChannelPrograms.Programs.find((program, idx) => {
            if(this.currentProgram && (this.currentProgram.prog_end_time > new Date())){
                if (program.prog_start_time > startoverLengthTimeInstant && program.prog_start_time > this.startoverProgram.prog_start_time && program.prog_end_time <= this.currentProgram.prog_end_time) {
                    if (program.AdditionalInfo.OTTEnabled === 'true') {
                        return program;
                    }
                }
    }else{
                kpAp.kpDash.findNSetCrntPlayringProgram();
if (program.prog_start_time > startoverLengthTimeInstant && program.prog_start_time > this.startoverProgram.prog_start_time && program.prog_end_time <= this.currentProgram.prog_end_time) {
    if (program.AdditionalInfo.OTTEnabled === 'true') {
        return program;
    }
}
}
});


if (foundProg) {
    this.onOverlayedCenteralPopUpCloseBttnClick();
    this.onStartoverProgramSelected(foundProg.ContentId);
}
else {
    this.onOverlayedCenteralPopUpCloseBttnClick();
    this.OnOverlayedChannelLogoClick(kpAp.config.crntPlayingChannelIndex);
}
},

onStartoverPlayLiveBtnClick(){
    if (kpAp.config.isFPusrBlkd) {
        return;
    }

    this.onOverlayedCenteralPopUpCloseBttnClick();

    this.OnOverlayedChannelLogoClick(kpAp.config.crntPlayingChannelIndex);
},

/*  private method*/
    displayVideoOverlay() {

        if($('figure') && $('figure').length > 0){
            $('figure').attr('data-fullscreen',false);
        }

        if (!this.isOverlayed && kpAp.HTMLtemplatesLoader.isAllTmpltsLoaded()) {

            $('.plyr-cnt-cnt').append(kpAp.HTMLtemplatesLoader.overlayTempalteHTML);
            $('.base-container').append(kpAp.HTMLtemplatesLoader.nextButtonSlideLeftHTML)
                .append(kpAp.HTMLtemplatesLoader.videoControlsTempalteHTML)
                .append(kpAp.HTMLtemplatesLoader.channelListHTML)
                .append(kpAp.HTMLtemplatesLoader.startoverBtnHTML);

            if (kpAp.config.flags.isBuildNoVisible === 'true') {
                $('.plyr-build-no').text('Build Version ' + kpAp.config.buildVersion);
                $('.plyr-build-no').show();
            }
            else {
                $('.plyr-build-no').hide();
            }

            this.creatDOMforCntralPopupTemplates();

            this.setPlayerUIlblsLang();

            this.loadChannelsList();

            this.attachFadeInOutEffectsToMainOverlayContainer();

            this.attachVolmCntrlHoverEffect();


            $('.kplus-channels-menu').on('mouseover', () => {
                this.onMouseEnterChannelsListBar()
            });
            $('.kplus-channels-menu').on('mouseout', () => {
                this.onMouseLeaveChannelsListBar()
            });
            $('.scroll-left-channellist').on('click', () => {
                this.onChannelsListLeftScrollBtnClick()
            });
            $('.scroll-right-channellist').on('click', () => {
                this.onChannelsListRightScrollBtnClick()
            });

            $('.broadcast-schedule-container').on('mouseover', () => {
                this.onMouseEnterNextBttnEPGscrlBar();
        });
        $('.broadcast-schedule-container').on('mouseout', () => {
            this.onMouseLeaveNextBttnEPGscrlBar();
    });
$('.b-s-c-next-button').on('click', () => {
    this.onStartoverCloseBtnClick();
this.onOverlayedNextBttnClick();
kpAp.gAnalyticsModule.fireGoogleAnalyticsEvnt('Broadcast Schedule', 'Open');
});
$('.b-s-c-left-scroll-button').on('click', () => {
    this.onBroadcastSchLeftScrlBtnClck();
});
$('.b-s-c-right-scroll-button').on('click', () => {
    this.onBroadcastSchRightScrlBtnClck();
});
$('.b-s-c-close-bar-button').on('click', () => {
    kpAp.gAnalyticsModule.fireGoogleAnalyticsEvnt('Broadcast Schedule', 'Close');
this.onOverlayedBroadcastShedulSliderCloseClick();
});


$('.kweb-startover-container').on('mouseover', () => {
    this.onMouseEnterStartoverBar()
});
$('.kweb-startover-container').on('mouseout', () => {
    this.onMouseLeaveStartoverBar()
});
$('.kweb-startover-btn').on('click', () => {
    kpAp.gAnalyticsModule.fireGoogleAnalyticsEvnt('Start Over', 'Open');
this.onOverlayedBroadcastShedulSliderCloseClick();
this.onStartoverContainerBtnClick();
});
$('.kweb-startover-left-scroll-btn').on('click', () => {
    this.onStartoverLeftScrollBtnClick();
});
$('.kweb-startover-right-scroll-btn').on('click', () => {
    this.onStartoverRightScrollBtnClick();
});
$('.kweb-startover-close-bar-btn').on('click', () => {
    kpAp.gAnalyticsModule.fireGoogleAnalyticsEvnt('Start Over', 'Close');
this.onStartoverCloseBtnClick();
});


$('.custom-video-controls-w').on('mouseover', () => {
    this.onMouseEnterVideoCntrlBar()
});
$('.custom-video-controls-w').on('mouseout', () => {
    this.onMouseLeaveVideoCntrlBar()
});

$('.vid-cntrl-play-pause-bttn').on('click', () => {
    this.onCustomVideoCntrlBttnClick('toggle_play_pause')
});
$('.vol-vol-mute-btn').on('click', () => {
    this.onCustomVideoCntrlBttnClick('toggle_volume')
});

$('.kweb-vid-cntrls-startover-btn').on('click', () => {
    this.onStartoverBtnClick();
});


$('.kplus-menu-button-btn').on('click', (e) => {
    let $this = $(e.currentTarget);
this.OnOverlayedTopMenuBttnClick($this.data('val'));
});

$('.c-k-c-b-close-button').on('click', () => {
    this.onOverlayedCenteralPopUpCloseBttnClick()
});
$('.c-k-t-m-c-first-m').on('click', () => {
    this.onInfoScrnSubButtonclick(1)
});
$('.c-k-t-m-c-second-m').on('click', () => {
    this.onInfoScrnSubButtonclick(2)
});

$('.progress-buffer-bars-bars').on('click', (e) => {
    let $this = $(e.currentTarget);
this.onVideoBufferProgressBarClick($this.data('val'));
});

$('.lang-vt-div').on('click', () => {
    this.onOverlayedLangVTselected()
});
$('.lang-en-div').on('click', () => {
    this.onOverlayedLangENGselected()
});

$(document).on('click','.bandwidth-clikable-bar', function(ev){
	
    kpAp.config.flags.isBandwidthLimitSetByUsr = true;
    kpAp.config.bandwidthSelected = ev.offsetX;
    kpAp.kpDash.bandwidthBarClickProcess(ev.offsetX);
});


let performMouseMoveForProgressBar = function (xPos) {
    if (this.isVideoProgressBarMouseDown) {
        if (bitmovin.player(this.dashContainerUniqueId).isReady() && !kpAp.config.flags.isPlyrErrMsgVisible) {
            let temp = xPos - kpAp.jqNodsCache.getNode('.progress-bar-kp-cnt').offset().left;

            if (temp > kpAp.jqNodsCache.getNode('.progress-bar-kp-cnt').width() - 7) {
                temp = kpAp.jqNodsCache.getNode('.progress-bar-kp-cnt').width() - 7;
            }
            else if (temp < 1) {
                temp = 0;
            }


            let barsParentWidth = kpAp.jqNodsCache.getNode('.progress-bar-kp-cnt').width();
            let leftBarWidth = kpAp.jqNodsCache.getNode('.custom-video-controls-w .progress-bar-kp .kp-vid-progressbar-left').width();
            let middleBarWidth = kpAp.jqNodsCache.getNode('.custom-video-controls-w .progress-bar-kp .kp-vid-progressbar-middle').width();
            let rightBarWidth = kpAp.jqNodsCache.getNode('.custom-video-controls-w .progress-bar-kp .kp-vid-progressbar-right').width();

            this.leftProgressBarWidth = leftBarWidth;
            this.middleProgressBarWidth = middleBarWidth;
            this.rightProgressBarWidth = rightBarWidth;

            if (kpAp.config.flags.isStartoverMode) {
                this.videoProgressBarClickPosition = temp;
                let programEpgDuration = Math.floor((this.startoverProgram.prog_end_time - this.startoverProgram.prog_start_time) / 1000);
                let ratio = temp / barsParentWidth;
                let seconds = Math.floor(ratio * programEpgDuration);

                if (seconds > programEpgDuration) {
                    seconds = programEpgDuration;
                }

                if (seconds < 6) {
                    seconds = 0;
                }

                var t = new Date(new Date().setHours(0, 0, 0, 0));
                t.setSeconds(seconds);

                kpAp.jqNodsCache.getNode('.kp-vid-progressbar-timer').show();
                kpAp.jqNodsCache.getNode('.kp-vid-progressbar-timer').text(this.prependZero(t.getHours()) + ':' + this.prependZero(t.getMinutes()) + ':' + this.prependZero(t.getSeconds()));

                /*kpAp.jqNodsCache.getNode('.custom-video-controls-w .progress-bar-kp .kp-vid-progressbar-left').width(temp);*/
                /*kpAp.jqNodsCache.getNode('.custom-video-controls-w .progress-bar-kp .kp-vid-progressbar-middle').width(barsParentWidth - temp);
                 kpAp.jqNodsCache.getNode('.custom-video-controls-w .progress-bar-kp .kp-vid-progressbar-middle').css('left', temp+'px');*/

                kpAp.jqNodsCache.getNode('.kp-vid-progressbar-seek-pointer').css('left', temp + 'px');

                var ltWidth = $(".kp-vid-progressbar-left").width();
                var mdWidth = $(".kp-vid-progressbar-middle").width();

                $('.kp-vid-progressbar-middle-secondary').css('border-top-right-radius', '6px').css('border-bottom-right-radius', '6px');
                $(".progress-bar-overlayed").show();
                $('.kp-vid-progressbar-left-secondary').width(temp + 'px');
                /*$('.kp-vid-progressbar-left-secondary').css('background-color','blue');*/
                $('.kp-vid-progressbar-middle-secondary').width(ltWidth + mdWidth + 'px');
                /*$('.kp-vid-progressbar-middle-secondary').css('background-color','red');*/
            }
            else if (kpAp.config.flags.isInTimeShiftMode) {

                if (temp > (leftBarWidth + middleBarWidth)) {
                    temp = leftBarWidth + middleBarWidth - 5;
                }


                this.videoProgressBarClickPosition = temp;
                /*kpAp.jqNodsCache.getNode('.custom-video-controls-w .progress-bar-kp .kp-vid-progressbar-left').width(temp);*/
                kpAp.jqNodsCache.getNode('.kp-vid-progressbar-seek-pointer').css('left', temp + 'px');

                           
                var ltWidth = $(".kp-vid-progressbar-left").width();
                var mdWidth = $(".kp-vid-progressbar-middle").width();

                $('.kp-vid-progressbar-middle-secondary').css('border-top-right-radius', '0px').css('border-bottom-right-radius', '0px');
                            
                $(".progress-bar-overlayed").show();
                $('.kp-vid-progressbar-left-secondary').width(temp + 'px');
                /*$('.kp-vid-progressbar-left-secondary').css('background-color','blue');*/
                $('.kp-vid-progressbar-middle-secondary').width(ltWidth + mdWidth + 'px');
                /*$('.kp-vid-progressbar-middle-secondary').css('background-color','red');*/

                let programEpgDuration = Math.floor((this.startoverProgram.prog_end_time - this.startoverProgram.prog_start_time) / 1000);
                let ratio = temp / barsParentWidth;
                let seconds = Math.floor(ratio * programEpgDuration);

                if (seconds > programEpgDuration) {
                    seconds = programEpgDuration;
                }

                if (seconds < 6) {
                    seconds = 0;
                }


                var t = new Date(this.startoverProgram.prog_start_time);
                t.setSeconds(t.getSeconds() + seconds);

                kpAp.jqNodsCache.getNode('.kp-vid-progressbar-timer').show();
                kpAp.jqNodsCache.getNode('.kp-vid-progressbar-timer').text(this.prependZero(t.getHours()) + ':' + this.prependZero(t.getMinutes()));
            }
            else {

                if (temp > leftBarWidth) {
                    temp = leftBarWidth;
                }

                this.videoProgressBarClickPosition = temp;
                kpAp.jqNodsCache.getNode('.kp-vid-progressbar-seek-pointer').css('left', temp + 'px');

            }

        }
    }
};

$('.base-container').on('mousedown', '.progress-bar-kp-cnt', (e) => {

    e.preventDefault();

if (this.crntChannelStartoverParams.startoverLength) {
    if (bitmovin.player(this.dashContainerUniqueId).isReady() && bitmovin.player(this.dashContainerUniqueId).getCurrentTime() != 0) {
        this.isVideoProgressBarMouseDown = true;
    }
}

}).on('mouseup', (e) => {
    if (this.isVideoProgressBarMouseDown) {
        performMouseMoveForProgressBar.call(this, e.clientX);
}
$('.kp-vid-progressbar-timer').hide();
this.isVideoProgressBarMouseDown = false;
}).on('mousemove', (e) => {
    performMouseMoveForProgressBar.call(this, e.clientX);
});

$('.base-container').on('mouseleave', (e) => {
    $('.kp-vid-progressbar-timer').hide();
this.isVideoProgressBarMouseDown = false;
});


/*$('.kp-vid-progressbar-left').on('click', (e) => {
 this.onVideoLeftProgressBarClick(e)
 });
 $('.kp-vid-progressbar-middle').on('click', (e) => {
 this.onVideoMiddleProgressBarClick(e)
 });*/


$('.kp-startover-btns-playnext').on('click', (e) => {
    this.onStartoverPlayNextBtnClick()
});

$('.kp-startover-btns-playlive').on('click', (e) => {
    this.onStartoverPlayLiveBtnClick()
});


kpAp.jqNodsCache.getNode('.kp-vid-progressbar-timer').hide();

this.isOverlayed = true;


$('.prog-vol-clickable').on('click', (ev) => {
    $('.vol-vol-mute-btn').attr('data-state', 'volume');
var jNode = $('.prog-vol-clickable');
var ht = jNode.height() - ev.offsetY;
$(".progress-grn-prog-bar").animate({
    height: ht
}, 100, function () {
    
});

this.playerVolume = Math.floor(ht / jNode.height() * 100);
bitmovin.player(this.dashContainerUniqueId).unmute();
bitmovin.player(this.dashContainerUniqueId).setVolume(this.playerVolume);
});

var cntWidth = $(".kplus-video-overlay .broadcast-schedule-container").width();
var innerCntWidth = $(".kplus-video-overlay .next-button-container").width();
var cntCssLeftPropVal = cntWidth - innerCntWidth;
kpAp.jqNodsCache.getNode(".kplus-video-overlay .broadcast-schedule-container").css('left', cntCssLeftPropVal + 'px');
this.isNextBroadcastBarDisplayed = false;


cntWidth = $(".kweb-startover-container").width();
innerCntWidth = $(".kweb-startover-btn-container").width();
cntCssLeftPropVal = cntWidth - innerCntWidth;

this.isStartoverBarDisplayed = false;
var fullscreenState = document.getElementById("playerstate");

$(document).on('click', '.kweb-startover-content', (e) => {
    let $this = $(e.currentTarget);

$('.kweb-startover-contents-container').animate({scrollLeft: $('.kweb-startover-contents-container').scrollLeft() + $this.position().left - 131 }, 500);
this.onStartovereProgramClicked($this);
});

$(window).on('resize',function(){
    setTimeout(function(){
                    
        if (typeof kpAp.kpDash.crntChannelStartoverParams.startoverLength != 'undefined') {
            $('.kweb-startover-container').css('visibility', 'visible');
        }
        $(".broadcast-schedule-container").css('visibility', 'visible');

        $(".kweb-startover-container").css("left",(-1 * ($(".kweb-startover-container").width() - $(".kweb-startover-btn").width())) + "px");
        $(".broadcast-schedule-container").css("left",(($('.plyr-cnt-cnt').width() - $(".next-button").width() + "px")));
    },100)
});

document.addEventListener("fullscreenchange", ()=> {
    fullscreenState.innerHTML = (document.fullscreenElement)? "" : "not";
kpAp.kpDash.onFullScreenChange();
}, false);

document.addEventListener("msfullscreenchange", function () {
    fullscreenState.innerHTML = (document.msFullscreenElement)? "" : "not";
    kpAp.kpDash.onFullScreenChange();
}, false);

document.addEventListener("mozfullscreenchange", function () {
    fullscreenState.innerHTML = (document.mozFullScreen)? "" : "not";
    kpAp.kpDash.onFullScreenChange();
}, false);
        
document.addEventListener("webkitfullscreenchange", function () {
    fullscreenState.innerHTML = (document.webkitIsFullScreen)? "" : "not";
    kpAp.kpDash.onFullScreenChange();
}, false);
}

},

onStartovereProgramClicked(e){
    this.onStartoverProgramSelected(e.data('startover-content-id'));
},

    onStartoverProgramSelected(startoverProgId){

        kpAp.APIcallerModule.dummyCall();

        if (kpAp.config.isFPusrBlkd) {
            return;
        }

        if (this.userChannnels[kpAp.config.crntPlayingChannelIndex].IsAuthorized === false) {
            this.checkIsChannelAuthoried();
            return;
        }

        this.isNoInfoNotificationClickedForCrntProg = false;

        this.startoverProgramToBeSeekedVal = null;

        let startoverProgram = this.currentChannelPrograms.Programs.find((program) => {
            if (program.ContentId == startoverProgId) {
                return program;
    }
});

if(!startoverProgram){
    return;
}

if (startoverProgram.AdditionalInfo.OTTEnabled == 'false') {
    return;
}

$('.plyr-err-msg-cnt').hide();
kpAp.config.flags.isPlyrErrMsgVisible = false;

this.startoverProgram = startoverProgram;

// console.log("Start Over Selected --> ", this.startoverProgram)

ga('set', 'dimension4', this.startoverProgram.Title);
kpAp.gAnalyticsModule.fireGoogleAnalyticsEvnt('Start Over', 'Selected', kpAp.config.channelsList[kpAp.config.crntPlayingChannelIndex].Title, null, {
    'dimension4': this.startoverProgram.Title
});
// kpAp.gAnalyticsModule.fireGoogleAnalyticsEvnt('Start Over', 'Selected', kpAp.config.channelsList[kpAp.config.crntPlayingChannelIndex].Title);

kpAp.config.flags.isInTimeShiftMode = false;
kpAp.config.flags.isStartoverMode = false;

let crntProgramContentId = '';
if (this.currentProgram) {
    crntProgramContentId = this.currentProgram.ContentId;
}

if (this.startoverProgram.ContentId == crntProgramContentId) {
    this.startoverProgram.timeShiftPlayerStartTime = null;
    this.startoverProgram.timeShiftElapsedTime = null;
    let crntSysTime = new Date();

    kpAp.config.flags.isInTimeShiftMode = true;
    kpAp.kpDash.populateStartoverBar();

    if(this.availableStartoverPrograms && this.availableStartoverPrograms.length == 1){

        this.timeShiftParams.timeShiftValue = 0;
        this.timeShiftParams.timeShiftedToDate = new Date(crntSysTime);
    }
    else{
        let diffInScnds = Math.floor((crntSysTime - this.startoverProgram.prog_start_time) / 1000);
        this.timeShiftParams.timeShiftValue = diffInScnds;
        this.timeShiftParams.timeShiftedToDate = new Date(this.startoverProgram.prog_start_time);
    }

}
else {
    bitmovin.player(this.dashContainerUniqueId).unload();
    kpAp.config.flags.isStartoverMode = true;
}

kpAp.config.flags.isChnlStreamSet = false;


this.adjustStartoverBarProgramsState();

},

adjustStartoverBarProgramsState(){

    let self = this;

    $('.kweb-startover-content').each(function () {
        let $this = $(this);
        if ($this.data('startover-content-id') == self.startoverProgram.ContentId) {
            $this.attr("data-is-on-now", "1");
        }
        else {
            $this.attr("data-is-on-now", "0");
        }
    });
},


        syncVideoControlsButtonIcons() {

            if (typeof this.crntChannelStartoverParams.startoverLength != 'undefined' && this.startoverProgram != null ) {
                $('.custom-video-controls-w .progress-bar-kp-cnt').css('width','59%')
                kpAp.jqNodsCache.getNode('.kweb-vid-cntrls-startover-btn').show();
            }
            else {
                $('.custom-video-controls-w .progress-bar-kp-cnt').css('width','65%')
                kpAp.jqNodsCache.getNode('.kweb-vid-cntrls-startover-btn').hide();
            }


            var playPauseBttn = kpAp.jqNodsCache.getNode('.vid-cntrl-play-pause-bttn');
        

            try {
                if (bitmovin.player(this.dashContainerUniqueId).isPlaying() && playPauseBttn.length) {
                    playPauseBttn.attr('data-state', 'pause');
                } else if (bitmovin.player(this.dashContainerUniqueId).isPaused() && playPauseBttn.length) {
                    playPauseBttn.attr('data-state', 'play');
                }

            }
            catch (e) {

            }
        },


        updateVideoProgressBar(percent) {

            let progressBarsContainer = kpAp.jqNodsCache.getNode('.custom-video-controls-w .progress-bar-kp');
            let videoCntrlPrgrssStartTime = kpAp.jqNodsCache.getNode('.custom-video-controls-w > .progress-prog-start-time');
            let videoCntrlPrgrssEndTime = kpAp.jqNodsCache.getNode('.custom-video-controls-w > .progress-prog-end-time');
            let leftBar = kpAp.jqNodsCache.getNode('.custom-video-controls-w .progress-bar-kp .kp-vid-progressbar-left');
            let middleBar = kpAp.jqNodsCache.getNode('.custom-video-controls-w .progress-bar-kp .kp-vid-progressbar-middle');
            let rightBar = kpAp.jqNodsCache.getNode('.custom-video-controls-w .progress-bar-kp .kp-vid-progressbar-right');
            var seekPointerImg = kpAp.jqNodsCache.getNode('.kp-vid-progressbar-seek-pointer');

            if (percent > 99) {
                percent = 99;
            }

            if (percent < 1) {
                percent = 1;
            }


            if (kpAp.config.flags.isStartoverMode) {

                let vodDuration = bitmovin.player(_wgsbneq.kpDash.dashContainerUniqueId).getDuration();
                let vodElapsedTime = bitmovin.player(_wgsbneq.kpDash.dashContainerUniqueId).getCurrentTime();
                let programEpgDuration = Math.floor((this.startoverProgram.prog_end_time - this.startoverProgram.prog_start_time) / 1000);


                if (typeof vodDuration != 'number') {
                    vodDuration = -1;
                }

                if (vodDuration != -1) {

                    if (this.videoProgressBarClickPosition != -1) {

                        /*let leftBarWidth = this.leftProgressBarWidth;
                         let middleBarWidth = this.middleProgressBarWidth;*/

                        let leftBarWidth = leftBar.width();
                        let middleBarWidth = middleBar.width();

                        if (this.videoProgressBarClickPosition > leftBarWidth && this.videoProgressBarClickPosition < progressBarsContainer.width()) {
                            if(this.videoProgressBarClickPosition > leftBarWidth + middleBarWidth){
                                this.videoProgressBarClickPosition = leftBarWidth + middleBarWidth
                            }
                            this.onVideoMiddleProgressBarClick(this.videoProgressBarClickPosition - leftBarWidth);
                            this.videoProgressBarClickPosition = -1;
                            return;
                        }
                        else if (this.videoProgressBarClickPosition < leftBarWidth && this.videoProgressBarClickPosition >= 0) {
                            this.onVideoLeftProgressBarClick(this.videoProgressBarClickPosition);
                            this.videoProgressBarClickPosition = -1;
                            return;
                        }
                    }


                    let archiveLengthEndDate = new Date();
                    archiveLengthEndDate.setSeconds(archiveLengthEndDate.getSeconds() - parseInt(this.crntChannelStartoverParams.archiveLength));
                    let progCrntStreamDate = new Date(this.startoverProgram.prog_start_time);
                    progCrntStreamDate.setSeconds(progCrntStreamDate.getSeconds() - parseInt(this.crntChannelStartoverParams.startOverStartBuffer));
                    progCrntStreamDate.setSeconds(progCrntStreamDate.getSeconds() + vodElapsedTime);

                    let progStartTimeWithBuffer = new Date(this.startoverProgram.prog_start_time);
                    progStartTimeWithBuffer.setSeconds(progStartTimeWithBuffer.getSeconds() - parseInt(this.crntChannelStartoverParams.startOverStartBuffer));

                    let progEndTimeWithBuffer = new Date(this.startoverProgram.prog_end_time);
                    progEndTimeWithBuffer.setSeconds(progEndTimeWithBuffer.getSeconds() + parseInt(this.crntChannelStartoverParams.startOverEndBuffer));

                    if (archiveLengthEndDate > progCrntStreamDate) {

                        if (!kpAp.config.flags.isPlyrErrMsgVisible) {

                            if (archiveLengthEndDate < progEndTimeWithBuffer) {

                                let diffBtwProgStartNarchiveEndDate = Math.floor((archiveLengthEndDate - progStartTimeWithBuffer) / 1000);

                                let calculatedSeekTime = diffBtwProgStartNarchiveEndDate + 60;
                                calculatedSeekTime = (calculatedSeekTime >= (vodDuration - 2)) ? vodDuration - 2 : calculatedSeekTime;

                                try {
                                    if (bitmovin.player(this.dashContainerUniqueId).isPlaying()) {

                                        bitmovin.player(this.dashContainerUniqueId).seek(calculatedSeekTime);

                                        if (!this.isNoInfoNotificationClickedForCrntProg) {
                                            let displayAsNotification = true;
                                            kpAp.displayPlyrMsg(13, displayAsNotification,"APP-406");
                                        }

                                    }
                                }
                                catch (e) {

                                }

                            }
                            else {

                                try {
                                    if (bitmovin.player(this.dashContainerUniqueId).isPlaying()) {
                                        kpAp.displayPlyrMsg(13,void 0, "APP-406");
                                    }
                                }
                                catch (e) {

                                }

                            }

                        }


                    }


                    if (vodDuration < programEpgDuration) {

                        let vodDurationMinusBuffers = vodDuration - parseInt(this.crntChannelStartoverParams.startOverStartBuffer) - parseInt(this.crntChannelStartoverParams.startOverEndBuffer);
                        vodDurationMinusBuffers = vodDurationMinusBuffers < 0 ? 0 : vodDurationMinusBuffers;

                        let ratioOfLeft = vodDurationMinusBuffers / programEpgDuration;

                        let ratioOfLeftBar = Math.floor(vodElapsedTime) / Math.floor(vodDurationMinusBuffers) * ratioOfLeft;
                        if (isNaN(ratioOfLeftBar)) {
                            ratioOfLeftBar = 0;
                        }
                        let ratioOfMiddleBar = ratioOfLeft - ratioOfLeftBar;
                        let ratioOfRightBar = 1 - ratioOfLeft;

                        let percentOfLeftBar = Math.floor(ratioOfLeftBar * 100);
                        let percentOfMiddleBar = Math.floor(ratioOfMiddleBar * 100);
                        let percentOfRightBar = Math.floor(ratioOfRightBar * 100);

                        if(percentOfMiddleBar < 0 || percentOfMiddleBar == 0){
                            percentOfMiddleBar = 100;
                            percentOfRightBar = 0;
                        }


                        leftBar.show().width(percentOfLeftBar + '%');
                        middleBar.show().width(percentOfMiddleBar + '%').css('left', percentOfLeftBar + '%');
                        if(percentOfMiddleBar == 100){
                            middleBar.css('border-top-right-radius', '6px').css('border-bottom-right-radius', '6px');
                        }else{
                            middleBar.css('border-top-right-radius', '0px').css('border-bottom-right-radius', '0px');
                        }
                   
                        rightBar.show().width(percentOfRightBar + '%').css('left', (percentOfLeftBar + percentOfMiddleBar) + '%');

                        seekPointerImg.css('left', percentOfLeftBar + '%');
                        $(".progress-bar-overlayed").hide();

                    }
                    else {
                        /*leftBar.hide();
                         right1Bar.hide();
                         right2Bar.hide();
    
                         bar.css('background', `linear-gradient( to right, #8CC63E ${percent}%,  #B4B3B5 0)`);
                         vidCntrlPrgrssBarImg.css('left', percent + '%');*/

                        leftBar.show().width(percent + '%');
                        middleBar.css('border-top-right-radius', '6px').css('border-bottom-right-radius', '6px');
                        middleBar.show().width((100 - percent) + '%').css('left', percent + '%');
                        rightBar.hide();

                        seekPointerImg.css('left', percent + '%');
                        $(".progress-bar-overlayed").hide();
                    }
                }
                else {
                    /*leftBar.hide();
                     right1Bar.hide();
                     right2Bar.hide();
                     bar.css('background', `linear-gradient( to right, #8CC63E ${percent}%,  #B4B3B5 0)`);
                     vidCntrlPrgrssBarImg.css('left', percent + '%');*/

                    leftBar.show().width(percent + '%');
                    middleBar.css('border-top-right-radius', '6px').css('border-bottom-right-radius', '6px');
                    middleBar.show().width((100 - percent) + '%').css('left', percent + '%');
                    rightBar.hide();

                    seekPointerImg.css('left', percent + '%');
                    $(".progress-bar-overlayed").hide();
                }


                /*bar.css('background', `linear-gradient( to right, #8CC63E ${percent}%,  #B4B3B5 0)`);*/
            }
            else if (kpAp.config.flags.isInTimeShiftMode) {

                let crntSysTime = new Date();
                let progLengthInSeconds = Math.floor((this.startoverProgram.prog_end_time - this.startoverProgram.prog_start_time) / 1000);

                let endDate = crntSysTime > this.startoverProgram.prog_end_time ? this.startoverProgram.prog_end_time : crntSysTime;

                let diffBtwProgStartNCrntTime = Math.floor((endDate - this.startoverProgram.prog_start_time) / 1000);
                let diffBtwProgStartNTimeShiftTime = Math.floor((this.timeShiftParams.timeShiftedToDate - this.startoverProgram.prog_start_time) / 1000);

                if (this.startoverProgram.timeShiftPlayerStartTime) {

                    if (this.videoProgressBarClickPosition != -1) {

                        let leftBarWidth = leftBar.width();
                        let middleBarWidth = middleBar.width();

                        if (this.videoProgressBarClickPosition > (leftBarWidth + middleBarWidth - 1)) {
                            this.videoProgressBarClickPosition = leftBarWidth + middleBarWidth - 10;

                            if (!kpAp.config.flags.isPlyrErrMsgVisible) {
                                try {
                                    if (bitmovin.player(this.dashContainerUniqueId).isPlaying()) {
                                        if (!this.isNoInfoNotificationClickedForCrntProg) {
                                            let displayAsNotification = true;
                                            kpAp.displayPlyrMsg(9, displayAsNotification,'CHL-102');
                                        }
                                    }
                                }
                                catch (e) {

                                }

                            }
                        }

                        /*let leftBarWidth = this.leftProgressBarWidth;
                         let middleBarWidth = this.middleProgressBarWidth;*/

                        if (this.videoProgressBarClickPosition > leftBarWidth && this.videoProgressBarClickPosition < (leftBarWidth + middleBarWidth)) {
                            this.onVideoMiddleProgressBarClick(this.videoProgressBarClickPosition - leftBarWidth);
                            this.videoProgressBarClickPosition = -1;
                            return;
                        }
                        else if (this.videoProgressBarClickPosition < leftBarWidth && this.videoProgressBarClickPosition >= 0) {
                            this.onVideoLeftProgressBarClick(this.videoProgressBarClickPosition);
                            this.videoProgressBarClickPosition = -1;
                            return;
                        }
                    }


                    let ratioOfLeft = diffBtwProgStartNCrntTime / progLengthInSeconds;
                    let ratioOfLeftBar = (diffBtwProgStartNTimeShiftTime + this.startoverProgram.timeShiftElapsedTime) / diffBtwProgStartNCrntTime * ratioOfLeft;
                    if (isNaN(ratioOfLeftBar)) {
                        ratioOfLeftBar = 0;
                    }
                    let ratioOfMiddleBar = ratioOfLeft - ratioOfLeftBar;
                    let ratioOfRightBar = 1 - ratioOfLeft;


                    let percentOfLeftBar = Math.floor(ratioOfLeftBar * 100);
                    let percentOfMiddleBar = Math.floor(ratioOfMiddleBar * 100);
                    let percentOfRightBar = Math.floor(ratioOfRightBar * 100);

                    let archiveLengthEndDate = new Date();
                    archiveLengthEndDate.setSeconds(archiveLengthEndDate.getSeconds() - parseInt(this.crntChannelStartoverParams.archiveLength));
                    let progCrntStreamDate = new Date(this.startoverProgram.prog_start_time);
                    progCrntStreamDate.setSeconds(progCrntStreamDate.getSeconds() + diffBtwProgStartNTimeShiftTime + this.startoverProgram.timeShiftElapsedTime);


                    if (archiveLengthEndDate > progCrntStreamDate) {

                        if (!kpAp.config.flags.isPlyrErrMsgVisible) {

                            try {

                                if (archiveLengthEndDate < this.startoverProgram.prog_end_time) {

                                    let newTimeShiftValue = Math.floor((crntSysTime - archiveLengthEndDate) / 1000) - 100;


                                    if (newTimeShiftValue > (progLengthInSeconds - 20)) {

                                        if (bitmovin.player(this.dashContainerUniqueId).isPlaying()) {
                                            kpAp.displayPlyrMsg(13,void 0, "APP-406");
                                        }
                                    }
                                    else {
                                        if (bitmovin.player(this.dashContainerUniqueId).isPlaying()) {

                                            let newTimeShiftedToDate = new Date();
                                            newTimeShiftedToDate.setSeconds(newTimeShiftedToDate.getSeconds() - newTimeShiftValue);
                                            this.timeShiftParams.timeShiftValue = newTimeShiftValue;
                                            this.timeShiftParams.timeShiftedToDate = new Date(newTimeShiftedToDate);

                                            if (!this.isNoInfoNotificationClickedForCrntProg) {
                                                let displayAsNotification = true;
                                                kpAp.displayPlyrMsg(13, displayAsNotification,"APP-406");
                                            }

                                        }
                                    }


                                }
                                else {

                                    if (bitmovin.player(this.dashContainerUniqueId).isPlaying()) {
                                        kpAp.displayPlyrMsg(13,void 0, "APP-406");
                                    }
                                }
                            }
                            catch (e) {

                            }

                        }


                    }

                    if (percentOfLeftBar > 99) {
                        $('.kp-vid-progressbar-middle-secondary').css('border-top-right-radius', '6px').css('border-bottom-right-radius', '6px');
                            
                        if(!this.currentProgram){
                            kpAp.config.flags.isInTimeShiftMode = false;
                            this.startoverProgram = null;
                        }
                        else{

                            kpAp.gAnalyticsModule.fireGoogleAnalyticsEvnt('Playback End', 'Next', this.startoverProgram.Title);

                            this.startoverProgram = this.currentProgram;

                            let crntSysTime = new Date();
                            let diffInScnds = Math.floor((crntSysTime - this.startoverProgram.prog_start_time) / 1000);

                            this.timeShiftParams.timeShiftValue = diffInScnds;
                            this.timeShiftParams.timeShiftedToDate = new Date(this.startoverProgram.prog_start_time);
                        }

                        this.populateStartoverBar();

                    }

                    leftBar.show().width(percentOfLeftBar + '%');
                    middleBar.css('border-top-right-radius', '0').css('border-bottom-right-radius', '0');

                    middleBar.show().width(percentOfMiddleBar + '%').css('left', percentOfLeftBar + '%');
                    rightBar.show().width(percentOfRightBar + '%').css('left', (percentOfLeftBar + percentOfMiddleBar) + '%');

                    /*if (percentOfLeftBar + percentOfMiddleBar < 99) {
                     middleBar.show().width(percentOfMiddleBar + '%').css('left', percentOfLeftBar + '%');
                     rightBar.show().width(percentOfRightBar + '%').css('left', (percentOfLeftBar + percentOfMiddleBar) + '%');
                     }*/

                    seekPointerImg.css('left', percentOfLeftBar + '%');
                    $(".progress-bar-overlayed").hide();

                }
                else {

                    /*leftBar.css('cursor', 'auto');
                     leftBar.show().width(percent + '%');
                     middleBar.css('border-top-right-radius', '6px').css('border-bottom-right-radius', '6px').css('cursor', 'auto');
                     middleBar.show().width((100 - percent) + '%').css('left', percent + '%');
                     rightBar.hide();
    
                     seekPointerImg.css('left', percent + '%');*/


                    /*leftBar.show().width(0 + '%');
                     middleBar.hide();
                     rightBar.show().width((100 - 0) + '%').css('left', 0 + '%');
    
                     progressBarsContainer.css('background', `none`);
                     seekPointerImg.css('left', 0 + '%');*/
                }

            }
            else {

                if (this.videoProgressBarClickPosition != -1) {
                    let leftBarWidth = leftBar.width();
                    if (this.videoProgressBarClickPosition < leftBarWidth) {
                        this.onVideoLeftProgressBarClick(this.videoProgressBarClickPosition);
                        this.videoProgressBarClickPosition = -1;
                        return;
                    }

                }


                leftBar.show().width(percent + '%');
                middleBar.hide();
                rightBar.show().width((100 - percent) + '%').css('left', percent + '%');

                progressBarsContainer.css('background', `none`);
                seekPointerImg.css('left', percent + '%');
                $(".progress-bar-overlayed").hide();
            }
        
            this.videoProgressBarClickPosition = -1;

        },

    syncStartoverProgramTimeShift(){

        if (kpAp.config.flags.isInTimeShiftMode) {

            let vodCurrentTime = bitmovin.player(kpAp.kpDash.dashContainerUniqueId).getCurrentTime();

            if (typeof vodCurrentTime == 'number' && vodCurrentTime != 0) {
                vodCurrentTime = Math.floor(vodCurrentTime);
                if (!this.startoverProgram.timeShiftPlayerStartTime) {
                    this.startoverProgram.timeShiftPlayerStartTime = vodCurrentTime;
                }
                else {
                }

                this.startoverProgram.timeShiftElapsedTime = vodCurrentTime - this.startoverProgram.timeShiftPlayerStartTime;

                let progDuration = Math.floor((this.startoverProgram.prog_end_time - this.startoverProgram.prog_start_time) / 1000);

                if (this.startoverProgram.timeShiftElapsedTime > progDuration) {
                    this.startoverProgram.timeShiftElapsedTime = progDuration;
                }

            }
        }
    },


        syncVideoProgressbar() {

            let leftBar = kpAp.jqNodsCache.getNode('.custom-video-controls-w .progress-bar-kp .kp-vid-progressbar-left');
            let middleBar = kpAp.jqNodsCache.getNode('.custom-video-controls-w .progress-bar-kp .kp-vid-progressbar-middle');
            let rightBar = kpAp.jqNodsCache.getNode('.custom-video-controls-w .progress-bar-kp .kp-vid-progressbar-right');
            let seekPointerImg = kpAp.jqNodsCache.getNode('.kp-vid-progressbar-seek-pointer');

            /*    var d1 = this.currentTimeToCheckSync.getTime();
                var d2 = new Date().getTime();
                var d3 = Math.floor((d2 - d1)/1000);
            
            if(navigator.onLine && Math.abs(d3) > 60*5){
                if (kpAp.config.silverlightObj !== null) {
                    kpAp.config.silverlightObj.Content.kpSLapp.onDeviceTimeInCorrectError();
                }
                else {
                    $('.plyr-err-msg-cnt').hide();
                }
                alert('-----' + kpAp.MultiLangSupportModule.getErrorMsg(2, kpAp.config.userPrefLanguage));
                window.location = kpAp.config.kplusOTThomePageUrl;
                return;
            }else{
                this.currentTimeToCheckSync = new Date();
            }*/

            if (this.isVideoProgressBarMouseDown) {
                return;
            }

            let vidCntrlPrgrssStartTime = kpAp.jqNodsCache.getNode('.custom-video-controls-w > .progress-prog-start-time');
            let vidCntrlPrgrssEndTime = kpAp.jqNodsCache.getNode('.custom-video-controls-w > .progress-prog-end-time');
            let topbarProgTitle = kpAp.jqNodsCache.getNode('.program-epg .title');
            let topbarProgTimings = kpAp.jqNodsCache.getNode('.program-epg .timings');

            if (kpAp.config.flags.isStartoverMode) {
                /*vidCntrlPrgrssStartTime.text('00:00');
                 vidCntrlPrgrssEndTime.text('00:00');*/

                let vodDuration = bitmovin.player(_wgsbneq.kpDash.dashContainerUniqueId).getDuration();
                let vodDurationMinusBuffers = vodDuration - parseInt(this.crntChannelStartoverParams.startOverStartBuffer) - parseInt(this.crntChannelStartoverParams.startOverEndBuffer);
                vodDurationMinusBuffers = vodDurationMinusBuffers < 0 ? 0 : vodDurationMinusBuffers;

                let vodElapsedTime = bitmovin.player(_wgsbneq.kpDash.dashContainerUniqueId).getCurrentTime();
                let programEpgDuration = Math.floor((this.startoverProgram.prog_end_time - this.startoverProgram.prog_start_time) / 1000);

                let percentVal = Math.floor((vodElapsedTime / vodDurationMinusBuffers) * 100);

                percentVal = isNaN(percentVal) ? 0 : percentVal;
                percentVal = percentVal > 100 ? 100 : percentVal;


                let crnt_sys_time = new Date();

                let crnt_prog_start_time = this.startoverProgram.prog_start_time;
                let crnt_prog_end_time = this.startoverProgram.prog_end_time;


                let crnt_prog_start_time_hours = this.prependZero(crnt_prog_start_time.getHours());
                let crnt_prog_start_time_mints = this.prependZero(crnt_prog_start_time.getMinutes());
                let crnt_prog_end_time_hours = this.prependZero(crnt_prog_end_time.getHours());
                let crnt_prog_end_time_minutes = this.prependZero(crnt_prog_end_time.getMinutes());

                let formattedProgStartTimeStr = crnt_prog_start_time_hours + ':' + crnt_prog_start_time_mints;
                let formattedProgEngTimeStr = crnt_prog_end_time_hours + ':' + crnt_prog_end_time_minutes;

                let progressLeftTimeIntervalVal = vodElapsedTime;
                let progressRightTimeIntervalVal = programEpgDuration - vodElapsedTime;

                if (progressLeftTimeIntervalVal > programEpgDuration) {
                    progressLeftTimeIntervalVal = programEpgDuration;
                }

                if (progressRightTimeIntervalVal < 0) {
                    progressRightTimeIntervalVal = 0;
                }

                /* var leftTime = new Date(new Date().setHours(0, 0, 0, 0));
                 leftTime.setSeconds(vodElapsedTime);
     
                 var rightTime = new Date(new Date().setHours(0, 0, 0, 0));
                 rightTime.setSeconds(progressRightTimeIntervalVal);*/

                let lMinutes = Math.floor(progressLeftTimeIntervalVal / 60);
                let lSeconds = progressLeftTimeIntervalVal - lMinutes * 60;

                let rMinutes = Math.floor(progressRightTimeIntervalVal / 60);
                let rSeconds = progressRightTimeIntervalVal - rMinutes * 60;


                if (percentVal < 100) {
                    vidCntrlPrgrssStartTime.text( this.prependZero(Math.floor(lMinutes)) + ':' + this.prependZero(Math.floor(lSeconds)) );
                    vidCntrlPrgrssEndTime.text( this.prependZero(Math.floor(rMinutes)) + ':' + this.prependZero(Math.floor(rSeconds)) );
                }


                if(kpAp.config.flags.isPlyrErrMsgVisible){

                    /*formattedProgEngTimeStr = '00:00';
                    formattedProgStartTimeStr = '00:00';*/

                    leftBar.show().width(0 + '%');
                    middleBar.hide();
                    rightBar.show().width((100 - 0) + '%').css('left', 0 + '%');
                    seekPointerImg.css('left', 0 + '%');
                }
                else{
                    this.updateVideoProgressBar(percentVal);
                }
                topbarProgTitle.text(this.startoverProgram.Title);
                let onNowTxt = kpAp.MultiLangSupportModule.getLabel(20, kpAp.config.userPrefLanguage);
                topbarProgTimings.text(formattedProgStartTimeStr + ' - ' + formattedProgEngTimeStr);

            }
            else if (kpAp.config.flags.isInTimeShiftMode) {

                let crnt_sys_time = new Date();
                let crnt_prog_start_time = this.startoverProgram.prog_start_time;
                let crnt_prog_end_time = this.startoverProgram.prog_end_time;

                let crnt_prog_start_time_hours = this.prependZero(crnt_prog_start_time.getHours());
                let crnt_prog_start_time_mints = this.prependZero(crnt_prog_start_time.getMinutes());
                let crnt_prog_end_time_hours = this.prependZero(crnt_prog_end_time.getHours());
                let crnt_prog_end_time_minutes = this.prependZero(crnt_prog_end_time.getMinutes());

                let formattedProgStartTimeStr = crnt_prog_start_time_hours + ':' + crnt_prog_start_time_mints;
                let formattedProgEngTimeStr = crnt_prog_end_time_hours + ':' + crnt_prog_end_time_minutes;

                let progLengthInScnds = Math.floor((crnt_prog_end_time - crnt_prog_start_time) / 1000);
                let progElapsedTime = this.startoverProgram.timeShiftElapsedTime || 0;
                let progress_percent = progElapsedTime / progElapsedTime * 100;

                //let progress_percent = (crnt_sys_time.getTime() - crnt_prog_start_time.getTime()) / (crnt_prog_end_time.getTime() - crnt_prog_start_time.getTime()) * 100;


                vidCntrlPrgrssStartTime.text(formattedProgStartTimeStr);
                vidCntrlPrgrssEndTime.text(formattedProgEngTimeStr);

                if(kpAp.config.flags.isPlyrErrMsgVisible){

                    /*formattedProgEngTimeStr = '00:00';
                    formattedProgStartTimeStr = '00:00';*/

                    leftBar.show().width(0 + '%');
                    middleBar.hide();
                    rightBar.show().width((100 - 0) + '%').css('left', 0 + '%');
                    seekPointerImg.css('left', 0 + '%');
                }
                else{
                    this.updateVideoProgressBar(progress_percent);
                }


                try{
                    topbarProgTitle.text(this.startoverProgram.Title);
                    let onNowTxt = kpAp.MultiLangSupportModule.getLabel(20, kpAp.config.userPrefLanguage);
                    topbarProgTimings.text(formattedProgStartTimeStr + ' - ' + formattedProgEngTimeStr + ' . ' + onNowTxt);
                }
                catch(e){

                }

            }
            else {
                if (this.currentProgram !== null) {
                    let crnt_sys_time = new Date();
                    let crnt_prog_start_time = this.currentProgram.prog_start_time;
                    let crnt_prog_end_time = this.currentProgram.prog_end_time;

                    let crnt_prog_start_time_hours = this.prependZero(crnt_prog_start_time.getHours());
                    let crnt_prog_start_time_mints = this.prependZero(crnt_prog_start_time.getMinutes());
                    let crnt_prog_end_time_hours = this.prependZero(crnt_prog_end_time.getHours());
                    let crnt_prog_end_time_minutes = this.prependZero(crnt_prog_end_time.getMinutes());

                    let formattedProgStartTimeStr = crnt_prog_start_time_hours + ':' + crnt_prog_start_time_mints;
                    let formattedProgEngTimeStr = crnt_prog_end_time_hours + ':' + crnt_prog_end_time_minutes;

                    let progress_percent = (crnt_sys_time.getTime() - crnt_prog_start_time.getTime()) / (crnt_prog_end_time.getTime() - crnt_prog_start_time.getTime()) * 100;


                    vidCntrlPrgrssStartTime.text(formattedProgStartTimeStr);
                    vidCntrlPrgrssEndTime.text(formattedProgEngTimeStr);

                    if(kpAp.config.flags.isPlyrErrMsgVisible){

                        /*formattedProgEngTimeStr = '00:00';
                        formattedProgStartTimeStr = '00:00';*/

                        leftBar.show().width(0 + '%');
                        middleBar.hide();
                        rightBar.show().width((100 - 0) + '%').css('left', 0 + '%');
                        seekPointerImg.css('left', 0 + '%');
                    }
                    else{
                        this.updateVideoProgressBar(progress_percent);
                    }


                    topbarProgTitle.text(this.currentProgram.Title);
                    let onNowTxt = kpAp.MultiLangSupportModule.getLabel(20, kpAp.config.userPrefLanguage);
                    topbarProgTimings.text(formattedProgStartTimeStr + ' - ' + formattedProgEngTimeStr + ' . ' + onNowTxt);

                } else {

                    vidCntrlPrgrssStartTime.text('00:00');
                    vidCntrlPrgrssEndTime.text('00:00');
                    topbarProgTitle.empty();
                    topbarProgTimings.empty();

                    leftBar.show().width(0 + '%');
                    middleBar.hide();
                    rightBar.show().width((100 - 0) + '%').css('left', 0 + '%');
                    seekPointerImg.css('left', 0 + '%');

                }
            }


        },

    prependZero(str) {

        if (typeof str == 'number') {
            str = '' + str;
        }

        if (str.length === 1) {
            return '0' + str;
        }

        return str;
    },

    syncStartoverBar(){
        let contents = $('.kweb-startover-content');

        if (contents.length) {
            let firstProgramId = $(contents[0]).data('startover-content-id');

            let lastProgramId = $(contents[contents.length - 1]).data('startover-content-id');


            let firstStartoverProgram = this.currentChannelPrograms.Programs.find((program) => {
                if (program.ContentId == firstProgramId) {
                    return program;
        }
    });


let startOverLength = this.crntChannelStartoverParams.startoverLength || 0;

let timeBoundary = new Date();
timeBoundary.setSeconds(timeBoundary.getSeconds() - parseInt(startOverLength));

let testStr = '';
if (this.currentProgram != null) {
    testStr = this.currentProgram.ContentId;
}

if (firstStartoverProgram && firstStartoverProgram.prog_start_time < timeBoundary || lastProgramId != testStr) {
    this.populateStartoverBar();
}

}
},


syncCrntPlayingProgm() {

    if (this.currentProgram != null) {
        var crntSysTime = new Date();
        var progEndTime = this.currentProgram.prog_end_time;

        if (crntSysTime >= progEndTime) {
            this.findNSetCrntPlayringProgram();
            this.isCrntProgramDetailsSynced = false;
            this.populateStartoverBar();
            this.populateEPGslideLeftBar();

        }
    }
    else {
        if (this.findNSetCrntPlayringProgram()) {
            if (this.crntChannelStartoverParams.startoverLength && !kpAp.config.flags.isStartoverMode) {
                try {
                    if (bitmovin.player(this.dashContainerUniqueId).isReady()) {
                        bitmovin.player(this.dashContainerUniqueId).unload();
                        kpAp.config.flags.isChnlStreamSet = false;

                    }


                }
                catch (e) {
                }
            }
        }
    }
},


        syncCrntProgramDetails() {

            if (this.currentProgram !== null) {
                if (this.isCrntProgramDetailsSynced === false) {
                    this.isCrntProgramDetailsSynced = true;
                    this.loadProgramDetails(kpAp.config.flags.isStartoverMode);
                }
            } else {
                this.currentProgramDetails = null;
                this.isCrntProgramDetailsSynced = true;
            }
        },

    syncStartoverProgEndOverlay(){

        if (kpAp.config.flags.isStartoverMode) {
            $(bitmovin.player(this.dashContainerUniqueId).getFigure()).css('opacity', '1');
            let pDuration = Math.floor(bitmovin.player(this.dashContainerUniqueId).getDuration());
            let pCrntPos = Math.floor(bitmovin.player(this.dashContainerUniqueId).getCurrentTime());
            if (pCrntPos == pDuration && pDuration != 0) {


                if(this.lastEndedProgramContentId != this.startoverProgram.ContentId){
                    kpAp.gAnalyticsModule.fireGoogleAnalyticsEvnt('Playback End', 'Start Over', this.startoverProgram.Title);
                    this.lastEndedProgramContentId = this.startoverProgram.ContentId;
                }

                /*let foundProg = this.currentChannelPrograms.Programs.find((program, idx) => {
                 if (program.prog_start_time > this.startoverProgram.prog_start_time && program.prog_end_time <= this.currentProgram.prog_end_time) {
                 if (program.AdditionalInfo.OTTEnabled === 'true') {
                 return program;
                 }
                 }
                 });*/


                /*if (typeof foundProg != 'undefined') {
                 kpAp.jqNodsCache.getNode('.kp-startover-btns-playnext').attr('src', '/mykplus/KplusWebPlayer/img/buttons/play_active.png');
                 kpAp.jqNodsCache.getNode('.kp-startover-btns-playnext').attr('data-state', 'active');
                 }
                 else {
                 kpAp.jqNodsCache.getNode('.kp-startover-btns-playnext').attr('src', '/mykplus/KplusWebPlayer/img/buttons/play_inactive.png');
                 kpAp.jqNodsCache.getNode('.kp-startover-btns-playnext').attr('data-state', 'inactive');
                 }*/

                if (!kpAp.config.flags.isPlyrErrMsgVisible) {
                    $('.plyr-err-msg-cnt').hide();
                }


                $(bitmovin.player(this.dashContainerUniqueId).getFigure()).css('opacity', '0.3');

                /*kpAp.jqNodsCache.getNode('.top-menu-lang-details-container').hide();
                 kpAp.jqNodsCache.getNode('.top-menu-quality-details-container').hide();
                 kpAp.jqNodsCache.getNode('.top-menu-info-details-container').hide();

                 $('.kplus-menu-button .top-menu-p').each(function (idx, val) {
                 $(this).css('color', 'rgba(137, 199, 62, 1)');
                 });*/

                this.onOverlayedCenteralPopUpCloseBttnClick();

                kpAp.jqNodsCache.getNode(".kplus-video-overlay").show();
                kpAp.jqNodsCache.getNode("#player-container").css('cursor', 'auto');

                kpAp.jqNodsCache.getNode('.kplus-video-overlay .central-content-popup').show();
                kpAp.jqNodsCache.getNode('.kp-startover-btns-cnt').show();
            }
            else {
                kpAp.jqNodsCache.getNode('.kp-startover-btns-cnt').hide();
            }
        }
        else {
            $(bitmovin.player(this.dashContainerUniqueId).getFigure()).css('opacity', '1');
            kpAp.jqNodsCache.getNode('.kp-startover-btns-cnt').hide();
        }
    },


        syncStartoverProgramDetails() {

            if (this.startoverProgram) {
                if (this.isStartoverProgramDetailsSynced === false) {
                    this.isStartoverProgramDetailsSynced = true;
                    this.loadProgramDetails(kpAp.config.flags.isStartoverMode);
                }
            } else {
                this.startoverProgramDetails = null;
                this.isStartoverProgramDetailsSynced = true;
            }
        },

    syncCSMwithCrntStream() {
        //return
        if (this.isCSMheartbeatNOK) {
            if (kpAp.config.channelsList[kpAp.config.crntPlayingChannelIndex].IsAuthorized === true) {
                clearTimeout(kpAp.CSMheartBeatModule.CSMheartbeatReqTimeoutId);
                kpAp.displayPlyrMsg(3, void 0, "CSM-1003");
                if (bitmovin.player(this.dashContainerUniqueId).isPlaying()) {
                    bitmovin.player(this.dashContainerUniqueId).unload();
                }

            }
        }
    },
    syncFPblockedUsrMsg() {
        if (kpAp.config.isFPusrBlkd) {

            try {
                if (bitmovin.player(this.dashContainerUniqueId).isPlaying()) {
                    bitmovin.player(this.dashContainerUniqueId).unload();
                    kpAp.displayPlyrMsg(11,void 0, "APP-113");
                }
            }
            catch (e) {
            }

        }

    },

    syncDivsInFPContainer(){

        if ($('.plyr-cnt-cnt').children().length < 6) {
            $('.plyr-cnt-cnt').prepend('<div></div>');
            $('.plyr-cnt-cnt').prepend('<div></div>');
            $('.plyr-cnt-cnt').prepend('<div></div>');
            $('.plyr-cnt-cnt').prepend('<div></div>');
            $('.plyr-cnt-cnt').prepend('<p></p>');

        }

    },

    syncInternetDisconnection(errorCode){
        try {

            if (!navigator.onLine) {
                kpAp.displayPlyrMsg(10,void 0,errorCode);
                if (bitmovin.player(this.dashContainerUniqueId).isReady()) {
                    bitmovin.player(this.dashContainerUniqueId).unload();
                }
            }


        }
        catch (e) {
        }
    },

    syncPlayerAndErrorState(){
        try {
            if (kpAp.config.flags.isPlyrErrMsgVisible) {
                if (bitmovin.player(this.dashContainerUniqueId).isReady()) {
                    bitmovin.player(this.dashContainerUniqueId).unload();
                }
            }

        }
        catch (e) {
        }
    },

    syncOTTenabled() {

        try {
            if (kpAp.config.flags.isStartoverMode || kpAp.config.flags.isInTimeShiftMode) {
                if (this.startoverProgram.AdditionalInfo.OTTEnabled === 'false') {
                    if (bitmovin.player(this.dashContainerUniqueId).isReady()) {
                        bitmovin.player(this.dashContainerUniqueId).unload();
                        kpAp.displayPlyrMsg(4,void 0, "APP-202");
                    }
                }
                else {
                    if (kpAp.config.flags.isPlyrErrMsgVisible) {
                        if (this.lastDsplydErrMsgIndex == 4) {
                            $('.plyr-err-msg-cnt').hide();
                            kpAp.config.flags.isPlyrErrMsgVisible = false;
                            kpAp.config.flags.isChnlStreamSet = false;
                        }
                    }
                }

            }
            else {

                if (this.currentProgram.AdditionalInfo.OTTEnabled === 'false') {
                    if (bitmovin.player(this.dashContainerUniqueId).isReady()) {
                        bitmovin.player(this.dashContainerUniqueId).unload();
                        kpAp.displayPlyrMsg(4,void 0, "APP-202");
                    }
                }
                else {
                    if (kpAp.config.flags.isPlyrErrMsgVisible) {
                        if (this.lastDsplydErrMsgIndex == 4) {
                            $('.plyr-err-msg-cnt').hide();
                            kpAp.config.flags.isPlyrErrMsgVisible = false;
                            kpAp.config.flags.isChnlStreamSet = false;
                        }
                    }
                }
            }

        }
        catch (e) {
        }
    },
    onAudioChannelSelected(lang) {
        kpAp.config.usrSlctdAudioLang = lang;
        var obj = bitmovin.player(this.dashContainerUniqueId).getAvailableAudio();
        for (var i = 0; i < obj.length; i++) {
            if ((obj[i].label.indexOf('und') !== -1 || obj[i].label.indexOf('en') !== -1 || obj[i].label.indexOf('eng') !== -1) && lang === 'original') {
                bitmovin.player(this.dashContainerUniqueId).setAudio(obj[i].id);
                return;
            }

            if (obj[i].label.indexOf('vi') !== -1 && lang === 'vietnamese') {
                bitmovin.player(this.dashContainerUniqueId).setAudio(obj[i].id);
                return;
            }
        }
    }
    ,

    syncTokenExpiry() {
        try {
            
            var authToken = getCookie("kpluswebplayer_authtoken");
            if (!authToken) {
                if (authToken != kpAp.authTokenVal) {
                    //logOut();
                    
                    //alert("logout")
                    //writeToFile();
                    //clearLocalStorage();
                    clearTimeout(kpAp.CSMheartBeatModule.CSMheartbeatReqTimeoutId);
                    return;
                }
            }
            var tokenExpiryTime = kpAp.config.validateTokenResponse.BBSData.ExpirationDate;
            var crntSysTime = new Date();
            tokenExpiryTime = new Date(tokenExpiryTime * 1000);

            if (tokenExpiryTime <= crntSysTime && !kpAp.config.flags.isTokenExpChkDone) {
                kpAp.config.flags.isTokenExpChkDone = true;
                /*alert(kpAp.MultiLangSupportModule.getErrorMsg(0, kpAp.config.userPrefLanguage));*/

                try {
	            	if (bitmovin.player(kpAp.kpDash.dashContainerUniqueId).isPlaying()) {
	            		if (bitmovin.player(this.dashContainerUniqueId).isFullscreen()) {
		                	bitmovin.player(this.dashContainerUniqueId).exitFullscreen();
		            	}
                   		 bitmovin.player(kpAp.kpDash.dashContainerUniqueId).unload();
               		}
               		 var errorMsg = kpAp.MultiLangSupportModule.getErrorMsg(1, kpAp.config.userPrefLanguage)+ ' ' + '[VDT-302]';

                     bootbox.alert(errorMsg, function () {
                        var browserName = browserInfo.name.toLowerCase();
                        if (browserName == "chrome") {
                            event.preventDefault();
                            event.stopPropagation();
                            document.getElementById('logoutForm').submit();
                            return;
                        } else {
                            document.getElementById('logoutForm').submit();
                            return;
                        }
                       })

                    //document.getElementById('logoutForm').submit();
                } catch (e) {
                    window.location = kpAp.config.kplusOTThomePageUrl;
                }
            }
        } catch (e) {
        }
    },

    chkNsetChnlStrm() {
        if (!kpAp.config.flags.isChnlStreamSet) {
            try {
                var cIndex = kpAp.config.crntPlayingChannelIndex;
                var imgUrl = "";
                if(cIndex){
                    if(this.userChannnels){
                        if(this.userChannnels[cIndex].Images && this.userChannnels[cIndex].Images[0]){
                            imgUrl = this.userChannnels[cIndex].Images[0].Url;
                        }
                    }
                }
                $('#top-bar-channel-logo').attr('src', imgUrl);
                if (kpAp.config.flags.isChnlEpgAvailable && this.userChannnels[kpAp.config.crntPlayingChannelIndex].IsAuthorized) {

                    if (kpAp.config.flags.isStartoverMode) {
                        this.setPlayerStream(kpAp.config.crntPlayingChannelIndex, this.startoverProgram);
                    }
                    else {
                        this.setPlayerStream(kpAp.config.crntPlayingChannelIndex);
                    }

                    kpAp.config.flags.isChnlStreamSet = true;
                    this.loadProgramDetails(kpAp.config.flags.isStartoverMode);
                }
            }
            catch (e) {
            }
        }
        /*else{
         try {
         if (kpAp.config.flags.isChnlEpgAvailable && this.userChannnels[kpAp.config.crntPlayingChannelIndex].IsAuthorized && !kpAp.config.flags.isPlyrErrMsgVisible) {

         if(bitmovin.player(this.dashContainerUniqueId).)
         this.setPlayerStream(kpAp.config.crntPlayingChannelIndex)
         }
         }
         catch (e) {
         }
         }*/

    }
    ,

    onMouseEnterChannelsListBar() {
        this.isMouseOverChannelsList = true;
    }
    ,

    onMouseLeaveChannelsListBar() {
        this.isMouseOverChannelsList = false;
    }
    ,

    onMouseEnterVideoCntrlBar() {
        this.isMouseOverVideoCntrlBar = true;
    }
    ,

    onMouseLeaveVideoCntrlBar() {
        this.isMouseOverVideoCntrlBar = false;
    }
    ,

    onChannelsListLeftScrollBtnClick() {
        kpAp.jqNodsCache.getNode('.kplus-channels-menu .channels-menu').animate({
            scrollLeft: '-=300'
        }, 600);
    }
    ,

    onChannelsListRightScrollBtnClick() {
        kpAp.jqNodsCache.getNode('.kplus-channels-menu .channels-menu').animate({
            scrollLeft: '+=300'
        }, 600);
    }
    ,

    onBroadcastSchLeftScrlBtnClck() {
        kpAp.jqNodsCache.getNode('.broadcast-schedule-container .broadcast-content').animate({
            scrollLeft: '-=300'
        }, 500);
    }
    ,

    onBroadcastSchRightScrlBtnClck() {
        kpAp.jqNodsCache.getNode('.broadcast-schedule-container .broadcast-content').animate({
            scrollLeft: '+=300'
        }, 500);
    }
    ,

    onMouseEnterNextBttnEPGscrlBar() {
        this.isMouseOverNextBttnEPGscrollBar = true;
    }
    ,

    onMouseLeaveNextBttnEPGscrlBar() {
        this.isMouseOverNextBttnEPGscrollBar = false;
    }
};

kpAp.getOSfromUAstr = function () {
    var OSName = "Unknown OS";
    if (navigator.appVersion.indexOf("Win") != -1) OSName = "Windows";
    if (navigator.appVersion.indexOf("Mac") != -1) OSName = "MacOS";
    if (navigator.appVersion.indexOf("X11") != -1) OSName = "UNIX";
    if (navigator.appVersion.indexOf("Linux") != -1) OSName = "Linux";

    return OSName;
};

kpAp.onMykPlusMenuItemClick = function () {
    var open = window.open(kpAp.config.myKplusURL);
    if (open === null || typeof (open) === 'undefined') {
        if (kpAp.config.silverlightObj !== null) {
            /*kpAp.config.silverlightObj.Content.kpSLapp.undoOverlayDisappear();*/
        }
        /*alert(kpAp.MultiLangSupportModule.getErrorMsg(7, kpAp.config.userPrefLanguage));*/
    }
};

kpAp.showGeoBlockMsg = function () {
    alert(kpAp.MultiLangSupportModule.getErrorMsg(5, kpAp.config.userPrefLanguage) + " [APP-108]");
};


kpAp.displayPlyrMsg = function (errMsgIdx, displayAsNotification, code) {

    if (typeof  displayAsNotification == 'undefined') {
        displayAsNotification = false;
    }

    if (typeof  errMsgIdx === 'string') {
        var msg = '';
        if(typeof code != 'undefined'){
            msg = errMsgIdx + ' ' + '[' + code + ']';
        }else{
            msg = errMsgIdx;
        }
        
        kpAp.kpDash.lastDsplydErrMsgIndex = null;
    }
    else if (typeof  errMsgIdx === 'number') {
        var msg = '';
        if(typeof code != 'undefined'){
            msg = kpAp.MultiLangSupportModule.getErrorMsg(errMsgIdx, kpAp.config.userPrefLanguage)+ ' ' + '[' + code + ']';
        }else{
            msg = kpAp.MultiLangSupportModule.getErrorMsg(errMsgIdx, kpAp.config.userPrefLanguage);
        }
      
        if (!displayAsNotification) {
            kpAp.kpDash.lastDsplydErrMsgIndex = errMsgIdx;
        }

    }


    if (!kpAp.config.flags.isPlyrErrMsgVisible || errMsgIdx == 1 || errMsgIdx == 11) {

        if (errMsgIdx == 11) {
            if (!$('.plyr-err-msg-cnt').length) {
                $('.plyr-cnt-cnt').append('<div class="plyr-err-msg-cnt"><div class="plyr-err-msg-cnt-inner"></div></div>');
            }

            $('.plyr-err-msg-cnt-inner').empty();
            $('.plyr-err-msg-cnt-inner').css('background', 'black');
            $('.plyr-err-msg-cnt-inner').append(`
                <div class="plyr-err-msg-msg">${msg}</div>
                <br/>
                <div style="text-align:center"><div id="fpUsrBlkdMsgOkBtn"> OK </div></div>
                `);

            $('#fpUsrBlkdMsgOkBtn').on('click', kpAp.kpDash.onFPusrBlkMsgBtnClk);

            $('.plyr-err-msg-cnt').css('z-index', '1051');
            $('.plyr-err-msg-cnt').show();
            kpAp.config.flags.isPlyrErrMsgVisible = true;

            return;
        }

        if (displayAsNotification) {
            if (!$('.plyr-err-msg-cnt').length) {
                $('.plyr-cnt-cnt').append('<div class="plyr-err-msg-cnt"><div class="plyr-err-msg-cnt-inner"></div></div>');
            }

            $('.plyr-err-msg-cnt-inner').empty();
            $('.plyr-err-msg-cnt-inner').css('background', '#222222');
            $('.plyr-err-msg-cnt-inner').append(`
                <div class="plyr-err-msg-msg">${msg}</div>
                <br/>
                <div style="text-align:center"><div id="kpErrorNotificationOkBtn"> OK </div></div>
                `);

            $('#kpErrorNotificationOkBtn').on('click', kpAp.kpDash.onErrorNotificationOkBtnClk);

            $('.plyr-err-msg-cnt').css('z-index', '1051');
            $('.plyr-err-msg-cnt').show();
            kpAp.kpDash.deleteFingerPrint();

            return;
        }
        else {

            if (!$('.plyr-err-msg-cnt').length) {
                $('.plyr-cnt-cnt').append('<div class="plyr-err-msg-cnt"><div class="plyr-err-msg-cnt-inner"></div></div>');
            }

            $('.plyr-err-msg-cnt-inner').empty();
            $('.plyr-err-msg-cnt-inner').css('background', 'black');
            $('.plyr-err-msg-cnt-inner').append(`
                <div class="plyr-err-msg-msg">${msg}</div>
                `);


            $('.plyr-err-msg-cnt').show();
            kpAp.config.flags.isPlyrErrMsgVisible = true;
            kpAp.kpDash.deleteFingerPrint();
        }


    }
};

kpAp.onAuthTokenExpired = function () {
    try {
        document.getElementById('logoutForm').submit();
    } catch (e) {
        window.location = kpAp.config.kplusOTThomePageUrl;
    }
};

kpAp.disableBackground = function () {
	window.scrollTo(0, 200);
    $('.modal-backdrop-kplus').removeClass("hidden");
};

kpAp.getComaSprtedBitrates = function () {
    return '' + kpAp.config.availableBitRates
};

$(document).on('click','.vid-cntrl-fullScrn-bttn', function(){
    kpAp.kpDash.fullScreenBehavior();
});

kpAp.jqNodsCache = require('./jqueryNodesCache');



$.fn.KPlusWebPlayer = function (options) {
    var plugin = this,
        defaults = {};

    plugin._options = $.extend({}, defaults, options);
    kpAp.config.userPrefLanguage = plugin._options.userPrefLanguage || kpAp.config.userPrefLanguage;
    kpAp.config.userPrefChannel = plugin._options.userPrefChannel || kpAp.config.userPrefChannel;
    kpAp.config.defaultContent = plugin._options.userPrefContent || kpAp.config.userPrefContent;

    plugin._defaults = defaults;

    
    plugin.isChromeBrowser = false;
    plugin.isEdgeBrowser = false;
    plugin.isChromeBrowser = ('Chrome' === browserInfo.name);
    plugin.isEdgeBrowser = ('Edge' === browserInfo.name);

    kpAp.config.flags.isChromeBrowser = plugin.isChromeBrowser;
    kpAp.config.flags.isEdgeBrowser = plugin.isEdgeBrowser;
        

    if (plugin.isChromeBrowser || plugin.isEdgeBrowser || (browserInfo.name.toLowerCase() == "firefox" && browserInfo.version > 51))
        kpAp.HTMLtemplatesLoader.loadHTMLtemplates();

    kpAp.APIcallerModule.getAppConfigDirect();

    
    $('.player-container').append('<div class="before-authorization-splash-scr"></div>');

    readInfoFrmCookies();
    
    kpAp.authTokenVal = getCookie("kpluswebplayer_authtoken");
    kpAp.tabId = generateUUID();
    if (getCookie("C_Tab_Id") === '') {
        setCookie("C_Tab_Id", kpAp.tabId);
    }
    readInfoFrmURLParams();

    validateUserToken();

    function initializeBitdashPlayer() {
        
        $('.player-container').empty();
        plugin._uniquePlayerContainerId = "player-container-" + Math.round(new Date().getTime() + (Math.random() * 100));
        kpAp.kpDash.dashContainerUniqueId = plugin._uniquePlayerContainerId;

        var playerUITempate = $.ajax({
            type: "GET",
            timeout: 180000,
            url: '/mykplus/KplusWebPlayer/template/bitdash-plyr-tpl.html?version=@@project-version-placeholder',
            async: false
        }).responseText;

        playerUITempate = playerUITempate.replace('plyr-grid-2367', plugin._uniquePlayerContainerId);

        plugin.append(playerUITempate);

        kpAp.kpDash.currentTimeToCheckSync = new Date();

        
        kpAp.mainTimer = setInterval(() => {
            kpAp.kpDash.displayVideoOverlay();
        kpAp.kpDash.updateBitrateChart();
        kpAp.kpDash.syncVideoControlsButtonIcons();

        kpAp.kpDash.syncCrntPlayingProgm();
        kpAp.kpDash.syncCrntProgramDetails();
        kpAp.kpDash.syncVideoProgressbar();


        kpAp.kpDash.syncStartoverProgEndOverlay();
        kpAp.kpDash.syncStartoverProgramDetails();
        kpAp.kpDash.syncStartoverProgramTimeShift();

        kpAp.kpDash.syncCSMwithCrntStream();
        kpAp.kpDash.syncOTTenabled();

        kpAp.kpDash.syncPlayerAndErrorState();

        kpAp.kpDash.syncTokenExpiry();
        kpAp.kpDash.mainOverlayFadeEffectsTimer();
        kpAp.kpDash.chkNsetChnlStrm();
        kpAp.kpDash.ensureFngrPrntVsblty();
        kpAp.kpDash.syncFPblockedUsrMsg();

        kpAp.kpDash.syncDivsInFPContainer();
        
        if (!kpAp.runPlayer) {
            if (bitmovin.player(kpAp.kpDash.dashContainerUniqueId)) {
                kpAp.displayPlyrMsg(3, void 0, "CSM-1004");
                if (bitmovin.player(kpAp.kpDash.dashContainerUniqueId).isPlaying()) {
                    bitmovin.player(kpAp.kpDash.dashContainerUniqueId).unload();
                    clearInterval(kpAp.mainTimer);
                    return;
                }
            }
        }


        /*let txt = ['', ''];
        if (kpAp.kpDash.startoverProgram) {
            txt[0] = kpAp.kpDash.startoverProgram.timeShiftPlayerStartTime;
            txt[1] = kpAp.kpDash.startoverProgram.timeShiftElapsedTime;
        }


        $('.kweb-display-area').text(`
        videoDuration= ${Math.floor(bitmovin.player(kpAp.kpDash.dashContainerUniqueId).getDuration())}
        videoCurrentTime= ${Math.floor(bitmovin.player(kpAp.kpDash.dashContainerUniqueId).getCurrentTime())}
        TimeShifted Program StartTime= ${txt[0]}
        TimeShifted Program ElapsedTime= ${txt[1]}
        isInStartoverMode= ${kpAp.config.flags.isStartoverMode}
        isInTimeShiftMode= ${kpAp.config.flags.isInTimeShiftMode}
        isPlayerReady= ${bitmovin.player(kpAp.kpDash.dashContainerUniqueId).isReady()}
        isInternetConnected= ${navigator.onLine}`);*/

    }, 1000);

    kpAp.syncStartoverBarTimer = setInterval(() => {
        kpAp.kpDash.syncStartoverBar();
}, 10000);

/*kpAp.APIcallerModule.callIsAliveApi();*/

}

function initializeSilverLightPlayer() {
    $('.player-container').empty();

    var silverLightTemplate = $.ajax({
        type: "GET",
        timeout: 180000,
        url: '/mykplus/KplusWebPlayer/template/silverlight-plyr-tpl.html?version=@@project-version-placeholder',
        async: false
    }).responseText;

    plugin.append(silverLightTemplate);
    plugin.append('<div class="modal-backdrop-kplus hidden"></div>');
    
    if (!kpAp.runPlayer) {
        //if (kpAp.config.silverlightObj !== null) {
        kpAp.config.silverlightObj.Content.kpSLapp.showCSMError();
        //}
    }
}


function validateUserToken() {
    kpAp.APIcallerModule.validateToken().then(function (data) {
        if (typeof data == "string") {
            data = JSON.parse(data);
        }

        if ('Error' in data || 'errorCode' in data) {
            kpAp.kpDash.syncInternetDisconnection('VDT-101');
                
        } else {
           
            kpAp.runPlayer = true; 
            if (getCookie("C_Tab_Id") == kpAp.tabId) {
                
                $(window).bind('beforeunload', function () {
                    if (getCookie("C_Tab_Id") == kpAp.tabId) {
                        setCookieToNull("C_Tab_Id");
                    }
                });
            } else {
                kpAp.runPlayer = false; 
            }
            
            
            if (plugin.isChromeBrowser || plugin.isEdgeBrowser) {
                initializeBitdashPlayer();
                
                if (!kpAp.runPlayer) {
                    kpAp.displayPlyrMsg(3, void 0, "CSM-1004");
                    if (bitmovin.player(this.dashContainerUniqueId).isPlaying()) {
                        bitmovin.player(this.dashContainerUniqueId).unload();
                    }
                }
            } else {
                if (browserInfo.name.toLowerCase() == "firefox" && browserInfo.version > 51) {
                    initializeBitdashPlayer();
                    
                    if (!kpAp.runPlayer) {
                        kpAp.displayPlyrMsg(3, void 0, "CSM-1004");
                        if (bitmovin.player(this.dashContainerUniqueId).isPlaying()) {
                            bitmovin.player(this.dashContainerUniqueId).unload();
                        }
                    }
                } else {
                    initializeSilverLightPlayer();
                    
                    if (!kpAp.runPlayer) {
                        if (kpAp.config.silverlightObj !== null) {
                            kpAp.config.silverlightObj.Content.kpSLapp.showCSMError();
                        }
                    }
                }
            }
        }
    }, function(error,errorText,err){
        kpAp.kpDash.syncInternetDisconnection('VDT-101');
        if(errorText === "timeout"){
            var errorMsg = kpAp.MultiLangSupportModule.getErrorMsg(1, kpAp.config.userPrefLanguage) + ' [VDT-103]';
            alert(errorMsg);
            window.location = kpAp.config.kplusOTThomePageUrl;
        }
    });
}

};


module.exports = kpAp;