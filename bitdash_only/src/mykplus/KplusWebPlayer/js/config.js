

module.exports = {
    flags: {
        isStartoverMode: false,
        isChromeBrowser: false,
        isEdgeBrowser: false,
        isPlayerFirstChnl: true,
        isChnlEpgAvailable: false,
        isChnlStreamSet: false,
        isFirstValidationCall: true,
        isBuildNoVisible: '@@should-display-buildNo',
        isDebugMsgsEnabled: '@@display-Debug-Msgs'
    },

    
    availableBitRates: [],

    
    userPrefLanguage: 'vie',
    
    userPrefChannel: '',
    defaultContent: '',
    userPrefBitrate: 5500000,
    usrSlctdAudioLang: '',

    kplusOTThomePageUrl: '@@kplusOTThomePageUrl',
    myKplusURL: '@@myKplusURL',

    silverlightObj: null,

    epgCallTParam: new Date(),

    
    validationObj: {
        AuthToken: '@@AuthToken',
        
        SubscriberId: '@@SubscriberId',

        DeviceType: browserInfo.name,
        DeviceBrand: browserInfo.name,
        DeviceId: '',
        OsVersion: navigator.platform,
        IpAddress: '192.168.6.1',
    },

    validateTokenResponse: '',
    getAppConfigDirectResponse: '',
    isAliveApiRspns: null,

    channelsList: null,
    crntPlayingChannelIndex: -1,
    buildVersion: '@@project-version-placeholder',
    isFingerPrintEnabled: '@@fingerPrintSwitch',
    today:5
};