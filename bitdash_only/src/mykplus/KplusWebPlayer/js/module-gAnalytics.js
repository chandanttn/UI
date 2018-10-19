
var self = {};
var isTrackerObjCreated = false;

self.gAnalyticsTrackingId = '';
self.channelPlaybackRecordIntervalId = {};
self.oneMinBitrateRecordIntervalId = {};
self.gAnalyticsTrackingId = '@@gid';
self.fireGoogleAnalyticsEvnt = function (eCat, eAction, eLabel, eValue, dimensionObj) {
    var trackObj = {
        hitType: 'event',
        eventCategory: eCat,
        eventAction: eAction,
        eventLabel: eLabel,
        dimObj: dimensionObj
    };

    if (eValue !== undefined) {
        trackObj.eventValue = eValue;
    }

    if (!isTrackerObjCreated) {
        ga('create', self.gAnalyticsTrackingId, 'auto');
        isTrackerObjCreated = true;
    }

    if (self.gAnalyticsTrackingId !== '') {
        ga('send', trackObj);
    }
};

module.exports = self;
