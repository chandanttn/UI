using System;
using System.ComponentModel;

namespace kplus_silverlight_player
{
    public class ViewModel : INotifyPropertyChanged
    {
        private int _bitRateCartHorizontalPos = 0;
        private int _bitRateChartPrevVerticlePos = -1;
        private int _bitRateChartVerticlePos = 0;
        private GetChannelsJSON.Channel _crntPlayingChannel;
        private int _crntPlayingChannelIndex = -1;

        private GetChannelProgramGuideJSON.Program _crntPlayingProgram;

        private GetChannelProgramGuideJSON.Program _startoverProgram;
        private int _startoverProgramIndex = -1;

        private int _crntPlayingProgramIndex = -1;
        private GetChannelProgramGuideJSON.Rootobject _getChannelProgramGuideRootObj;
        private GetChannelsJSON.RootObject _getChannelsRespRootObj;
        private GetContentResponseJSON.Rootobject _getContentRespRootObj;

        private bool _isBitRateSet = false;

        private bool _isCenteralPopUpVisible = false;

        private bool _isChannelChanedFlag = false;

        private bool _isMouseOverChannelsListBar = false;

        private bool _isMouseOverEPGScrollBbar = false;

        private bool _isMouseOverVideoControlsBar = false;

        private bool _isVideoBufferSet = false;

        private double _maxAvailableVolumn = 10;

        private int _maxVideoBufferDuration = 6;

        private int _mouseCursorDormantCounter = 0;

        private long _playerBitRate = 0;

        // in seconds
        private double _playerFPS = -1;

        private String _playerLang = "vie";

        private int _playerVideoBufferDuration = -1;

        private double _playerVolumn = 1;

        private long[] _sysAvailableBitRates = { 110000, 190000, 300000, 500000, 750000, 1100000, 1500000 };

        private long _userSelectedBitRate = 300000;

        private int _userSelectedVideoBufferDuration = 2;

        private DateTime _userTokenRevalidatonTime;

        private ValidateTokenRespJSON.Rootobject _validateTokenRootObj;

        private kplus_silverlight_player.JSON.CsmJSONResponse.RootObject _csmData;

        public event PropertyChangedEventHandler PropertyChanged;

        public double startoverEndedProgramToBeSeekedValue = -1;

        public FingerPrintModel FingerPrintModel { get; set; }

        public int timeShiftValue = -1;

        public DateTime timeShiftedToDate;

        public int BitRateCartHorizontalPos
        {
            get { return _bitRateCartHorizontalPos; }
            set { _bitRateCartHorizontalPos = value; }
        }

        public int BitRateChartPrevVerticlePos
        {
            get { return _bitRateChartPrevVerticlePos; }
            set { _bitRateChartPrevVerticlePos = value; }
        }

        public int BitRateChartVerticlePos
        {
            get { return _bitRateChartVerticlePos; }
            set { _bitRateChartVerticlePos = value; }
        }

        public int HeartBeatInterval
        {
            get; set;
        }

        public GetChannelsJSON.Channel CrntPlayingChannel
        {
            get { return _crntPlayingChannel; }
            set
            {
                _crntPlayingChannel = value; if (PropertyChanged != null)
                {
                    PropertyChanged(this,
                        new PropertyChangedEventArgs("CrntPlayingChannel"));
                }
            }
        }

        public int CrntPlayingChannelIndex
        {
            get { return _crntPlayingChannelIndex; }
            set
            {
                _crntPlayingChannelIndex = value;
                if (PropertyChanged != null)
                {
                    PropertyChanged(this,
                        new PropertyChangedEventArgs("CrntPlayingChannelIndex"));
                }
            }
        }

        public GetChannelProgramGuideJSON.Program currentProgram
        {
            get { return _crntPlayingProgram; }
            set { _crntPlayingProgram = value; }
        }

        public int CrntPlayingProgramIndex
        {
            get { return _crntPlayingProgramIndex; }
            set { _crntPlayingProgramIndex = value; }
        }

        public GetChannelProgramGuideJSON.Program startoverProgram
        {
            get { return _startoverProgram; }
            set { _startoverProgram = value; }
        }

        public int startoverProgramIndex
        {
            get { return _startoverProgramIndex; }
            set { _startoverProgramIndex = value; }
        }

        public GetChannelProgramGuideJSON.Rootobject GetChannelProgramGuideRootObj
        {
            get { return _getChannelProgramGuideRootObj; }
            set
            {
                _getChannelProgramGuideRootObj = value;
                if (PropertyChanged != null)
                {
                    PropertyChanged(this,
                        new PropertyChangedEventArgs("GetChannelProgramGuideRootObj"));
                }
            }
        }

        public GetChannelsJSON.RootObject GetChannelsRespRootObj
        {
            get { return _getChannelsRespRootObj; }
            set
            {
                _getChannelsRespRootObj = value;
                if (PropertyChanged != null)
                {
                    PropertyChanged(this,
                        new PropertyChangedEventArgs("GetChannelsResp"));
                }
            }
        }

        public GetContentResponseJSON.Rootobject currentProgramDetails
        {
            get { return _getContentRespRootObj; }
            set { _getContentRespRootObj = value; }
        }

        public bool IsBitRateSet
        {
            get { return _isBitRateSet; }
            set { _isBitRateSet = value; }
        }

        public bool IsCenteralPopUpVisible
        {
            get { return _isCenteralPopUpVisible; }
            set { _isCenteralPopUpVisible = value; }
        }

        public bool IsChannelChangedFlag
        {
            get { return _isChannelChanedFlag; }
            set { _isChannelChanedFlag = value; }
        }

        public bool isCSMheartbeatNOKforCrntChnl { get; set; }

        public Int32 maxRetriesAttempt { get; set; }

        public bool isLicenseErrorDisplayed { get; set; }

        public bool IsMouseOverChannelsListBar
        {
            get { return _isMouseOverChannelsListBar; }
            set { _isMouseOverChannelsListBar = value; }
        }

        public bool IsMouseOverEPGScrollBbar
        {
            get { return _isMouseOverEPGScrollBbar; }
            set { _isMouseOverEPGScrollBbar = value; }
        }

        public bool IsMouseOverVideoControlsBar
        {
            get { return _isMouseOverVideoControlsBar; }
            set { _isMouseOverVideoControlsBar = value; }
        }

        public bool isMouseOverVolumeCntrl { get; set; }

        public bool IsVideoBufferSet
        {
            get { return _isVideoBufferSet; }
            set { _isVideoBufferSet = value; }
        }

        public bool isVolumeBtnVisible { get; set; }

        public double MaxAvailableVolumn
        {
            get { return _maxAvailableVolumn; }
            set { _maxAvailableVolumn = value; }
        }

        public int MaxVideoBufferDuration
        {
            get { return _maxVideoBufferDuration; }
            set { _maxVideoBufferDuration = value; }
        }

        public int MouseCursorDormantCounter
        {
            get { return _mouseCursorDormantCounter; }
            set { _mouseCursorDormantCounter = value; }
        }

        // in seconds
        public long PlayerBitRate
        {
            get { return _playerBitRate; }
            set
            {
                _playerBitRate = value;
                if (PropertyChanged != null)
                {
                    PropertyChanged(this,
                        new PropertyChangedEventArgs("PlayerBitRate"));
                }
            }
        }

        public double PlayerFPS
        {
            get { return _playerFPS; }
            set
            {
                _playerFPS = value;
                if (PropertyChanged != null)
                {
                    PropertyChanged(this,
                        new PropertyChangedEventArgs("PlayerFPS"));
                }
            }
        }

        public String PlayerLang
        {
            get { return _playerLang; }
            set
            {
                _playerLang = value;
                if (PropertyChanged != null)
                {
                    PropertyChanged(this,
                        new PropertyChangedEventArgs("PlayerLang"));
                }
            }
        }

        public int PlayerVideoBufferDuration
        {
            get { return _playerVideoBufferDuration; }
            set { _playerVideoBufferDuration = value; }
        }

        public double PlayerVolumn
        {
            get { return _playerVolumn; }
            set { _playerVolumn = value; }
        }

        public long[] SysAvailableBitRates
        {
            get { return _sysAvailableBitRates; }
            set { _sysAvailableBitRates = value; }
        }

        public long UserSelectedBitRate
        {
            get { return _userSelectedBitRate; }
            set { _userSelectedBitRate = value; }
        }

        public int UserSelectedVideoBufferDuration
        {
            get { return _userSelectedVideoBufferDuration; }
            set { _userSelectedVideoBufferDuration = value; }
        }

        public DateTime UserTokenRevalidatonTime
        {
            get { return _userTokenRevalidatonTime; }
            set { _userTokenRevalidatonTime = value; }
        }

        public ValidateTokenRespJSON.Rootobject ValidateTokenResponseRootObj
        {
            get { return _validateTokenRootObj; }
            set { _validateTokenRootObj = value; }
        }

        public kplus_silverlight_player.JSON.CsmJSONResponse.RootObject CSMResponseObj
        {
            get { return _csmData; }
            set { _csmData = value; }
        }

        public bool isManualLicenseAcquirerCreated { get; set; }

        public bool isOverlayHidingAllowed { get; set; }

        public bool isAuthTokenExpired { get; set; }

        public bool isPlyrErrMsgGrdVisible { get; set; }

        public bool isPlyrDefaultChnl { get; set; }

        public bool isChnlAllowedToPlay { get; set; }

        public bool isChnlPlyedFrstTime { get; set; }

        public string isBuildNoVisible { get; set; }

        public bool isChnlBitrateChartLoaded { get; set; }

        public string usrPrefAudioLang { get; set; }

        public int plyrErrMsgIndex { get; set; }

        public bool isLicenseReqInProcess { get; set; }

        public bool isUsrBlkdByFp { get; set; }

        public GetContentResponseJSON.Rootobject startoverProgramDetails { get; set; }

        public bool isGetChannelEpgCallInProcess { get; set; }

        public bool isStartoverProgramEnded { get; set; }

        public bool isMouseOverStartoverOverlayPlayNextImg { get; set; }

        public bool isMouseOverStartoverOverlayPlayLiveImg { get; set; }

        public bool isMouseOverStartoverBar { get; set; }

        public System.Collections.Generic.Dictionary<string, string> startoverParametersForCrntChnl = new System.Collections.Generic.Dictionary<string, string>();
        public string lastEndedProgramContentId = "";

        public bool isSizeJustChanged { get; set; }

        public bool wasStartoverBarHiddenBeforeFullScrnToggle { get; set; }

        public bool isInStartoverMode { get; set; }

        public bool isInTimeShiftMode { get; set; }

        public bool isProgressBarHalted { get; set; }

        public GetChannelProgramGuideJSON.Program[] availableStartoverPrograms = null;
    }
}