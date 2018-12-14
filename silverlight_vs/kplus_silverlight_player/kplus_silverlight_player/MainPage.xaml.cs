using Microsoft.Web.Media.SmoothStreaming;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.IO.IsolatedStorage;
using System.Linq;
using System.Windows;
using System.Windows.Browser;
using System.Windows.Controls;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Animation;
using System.Windows.Media.Imaging;

namespace kplus_silverlight_player
{
    public partial class MainPage : UserControl
    {
        private System.Windows.Threading.DispatcherTimer bufferingStatusChckerTimer = new System.Windows.Threading.DispatcherTimer();
        private bool isChannelsListRendered = false;
        //private bool isCurrentProgramDetailsSynced = false;
        //private bool isStartoverProgramDetailsSynced = false;
        private bool isTimerMessageVisible = false;
        private bool isGlobalPlayerConfigsLoaded = false;
        private int counter = 0;
        
        private KpSLappClass kpScriptable;

        // timer schedulers
        private System.Windows.Threading.DispatcherTimer languageChangeAdjustmentsTimer = new System.Windows.Threading.DispatcherTimer();

        // ordered list of multi language labels, used for changing lang translation
        private List<object> listOfLabelCntrols = new List<object>();

        private Label fingerPrintLastDspldLbl;

        private System.Windows.Threading.DispatcherTimer mainTimer = new System.Windows.Threading.DispatcherTimer();
        private System.Windows.Threading.DispatcherTimer mainTimer2 = new System.Windows.Threading.DispatcherTimer();



        private System.Windows.Threading.DispatcherTimer syncStartoverBarTimer = new System.Windows.Threading.DispatcherTimer();
        private System.Windows.Threading.DispatcherTimer oneMintContinuesChannelPlaybackTimer = new System.Windows.Threading.DispatcherTimer();
        private System.Windows.Threading.DispatcherTimer oneScndDelayGeoBlkMsgTimer = new System.Windows.Threading.DispatcherTimer();
        private System.Windows.Threading.DispatcherTimer oneScndDelayUIupdateTimer = new System.Windows.Threading.DispatcherTimer();
        private System.Windows.Threading.DispatcherTimer oneScndDelayStartoverBarScrollAdjstTimer = new System.Windows.Threading.DispatcherTimer();
        private System.Windows.Threading.DispatcherTimer fingerPrintDurationTimer = new System.Windows.Threading.DispatcherTimer();
        private System.Windows.Threading.DispatcherTimer twoSecondsLicenseDel = new System.Windows.Threading.DispatcherTimer();
        private System.Windows.Threading.DispatcherTimer oneSecondIsAuthMsgDsplyDelay = new System.Windows.Threading.DispatcherTimer();
        private System.Windows.Threading.DispatcherTimer csmRescheduleTimer = new System.Windows.Threading.DispatcherTimer();

        private BitmapImage pauseBttnImg;
        private String pauseBttnImgBase64 = "iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo0RUNEOUE3NzA2MzhFNDExOTVDQUJBMzRGM0QyQzJGRSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo3MkQ4NDZBNjM4MUExMUU0ODExM0I4RjRERDM1M0MyMSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo3MkQ4NDZBNTM4MUExMUU0ODExM0I4RjRERDM1M0MyMSIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjFDOEM5REQ3MTgzOEU0MTE5NUNBQkEzNEYzRDJDMkZFIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjRFQ0Q5QTc3MDYzOEU0MTE5NUNBQkEzNEYzRDJDMkZFIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+NABj4QAAAFtJREFUeNpi/P//PwMtARMDjcGoBQQBCzbB6dOnY4t5RiQ2VvnMzEzyfZCVlbWfHPnRSB61YNSCUQsGgwWM2KpMRkZwwYmt8HJEYmPIA81yJMqC0TigqwUAAQYAyw0XIRd+qCcAAAAASUVORK5CYII=";

        private BitmapImage playBttnImg;
        private String playBttnImgBase64 = "iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo0RUNEOUE3NzA2MzhFNDExOTVDQUJBMzRGM0QyQzJGRSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo3MkQ4NDZBMjM4MUExMUU0ODExM0I4RjRERDM1M0MyMSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo3MkQ4NDZBMTM4MUExMUU0ODExM0I4RjRERDM1M0MyMSIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjFDOEM5REQ3MTgzOEU0MTE5NUNBQkEzNEYzRDJDMkZFIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjRFQ0Q5QTc3MDYzOEU0MTE5NUNBQkEzNEYzRDJDMkZFIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+jETUpgAAAJhJREFUeNpi/P//PwMtARMDjcGoBQQBCzbB6dOng2J+FhCnk2pgZmYm0T5IA2KQRTNpHUQUWURKHJBlETmRTJJFlKQioiyiRjLFaxHV8sG5c+d8srKyionKByQa/GzOnDm3SMpoZBi8Zdq0ab1UsYBYg0m2gFSDibaAXIMJWkCpwXAAqjLRMRTsB+JiSs1jHK2TB9wCgAADACXhaqr74JPFAAAAAElFTkSuQmCC";
        private ViewModel viewModel = new ViewModel();
        private bool isProgressBarInnerWrapperMouseDown;
        private int progressBarInnerWrapperClickedXPosition;
        private DateTime currentTimeToCheckSync = DateTime.Now;
        private bool isTimeDifferenceValid = false;

        public MainPage()
        {
            mainTimer.Interval = TimeSpan.FromSeconds(1);
            mainTimer.Tick += new EventHandler(mainTimerMethod);

            mainTimer2.Interval = TimeSpan.FromSeconds(1);
            mainTimer2.Tick += new EventHandler(mainTimerMethodForBlockUser);


            syncStartoverBarTimer.Interval = TimeSpan.FromSeconds(10);
            syncStartoverBarTimer.Tick += new EventHandler(syncStartoverBar);

            languageChangeAdjustmentsTimer.Interval = TimeSpan.FromMilliseconds(100);
            languageChangeAdjustmentsTimer.Tick += new EventHandler(langChangeUIadjustments);

            oneMintContinuesChannelPlaybackTimer.Interval = TimeSpan.FromSeconds(60);
            oneMintContinuesChannelPlaybackTimer.Tick += new EventHandler(methodCalledAfterOneMintOfContinuesChannelPlayback);

            oneScndDelayUIupdateTimer.Interval = TimeSpan.FromSeconds(1);
            oneScndDelayUIupdateTimer.Tick += oneScndDelayTimer_Tick;

            oneScndDelayStartoverBarScrollAdjstTimer.Interval = TimeSpan.FromSeconds(2);
            oneScndDelayStartoverBarScrollAdjstTimer.Tick += oneScndDelayStartoverBarScrollAdjstTimerMethod;

            bufferingStatusChckerTimer.Interval = TimeSpan.FromSeconds(3);
            bufferingStatusChckerTimer.Tick += bufferStatusChckerTimerCallback;

            oneScndDelayGeoBlkMsgTimer.Interval = TimeSpan.FromSeconds(1);
            oneScndDelayGeoBlkMsgTimer.Tick += showGeoBlkMsg;

            fingerPrintDurationTimer.Tick += onfingerPrintDurationEnded;

            twoSecondsLicenseDel.Tick += onLicense2scndDelayEnded;

            oneSecondIsAuthMsgDsplyDelay.Tick += onSecondIsAuthMsgDsplyDelay;

            InitializeComponent();

            viewModel.isOverlayHidingAllowed = true;
            viewModel.isVolumeBtnVisible = true;
            viewModel.isPlyrDefaultChnl = true;

            VideoContainer.SizeChanged += onVideoContainerSizeChaned;

            listOfLabelCntrols.Add(TopMenuLang);
            listOfLabelCntrols.Add(TopMenuQuality);
            listOfLabelCntrols.Add(TopMenuInfo);
            listOfLabelCntrols.Add(TopMenuMyKplus);
            listOfLabelCntrols.Add(vieTxt);
            listOfLabelCntrols.Add(engTxt);
            listOfLabelCntrols.Add(videoQualit);
            listOfLabelCntrols.Add(videoQualityLabel);
            listOfLabelCntrols.Add(limitVideoBufferMainLabel);
            listOfLabelCntrols.Add(limitBandwidthMainLabel);
            listOfLabelCntrols.Add(infoInfoLabel);
            listOfLabelCntrols.Add(infoBroadcastSchLabel);
            listOfLabelCntrols.Add("empty");
            listOfLabelCntrols.Add(infoDirectorLbl);
            listOfLabelCntrols.Add("empty");
            listOfLabelCntrols.Add("empty");
            listOfLabelCntrols.Add(nextEPGNEXTlbl);
            listOfLabelCntrols.Add("empty");
            listOfLabelCntrols.Add("empty");
            listOfLabelCntrols.Add("empty");
            listOfLabelCntrols.Add("empty");
            listOfLabelCntrols.Add(startoverBarStartoverBtnLbl);

            bufferingStatusChckerTimer.Start();

            SmoothPlayer.MediaFailed += onSmoothPlayerError;
            SmoothPlayer.LicenseAcquirer = new ManualLicenseAcquirer(SmoothPlayer.Name);
            SmoothPlayer.LicenseAcquirer.AcquireLicenseCompleted += onDRMlicenseAcquisitionCompleted;

            //if (!viewModel.isManualLicenseAcquirerCreated)
            //{
            //    SmoothPlayer.LicenseAcquirer = new ManualLicenseAcquirer(SmoothPlayer.Name);
            //    viewModel.isManualLicenseAcquirerCreated = true;
            //}

            //SmoothPlayer.LicenseAcquirer.AcquireLicenseCompleted += licenseAcquireCompleted;

            var tbytes1 = Convert.FromBase64String(playBttnImgBase64);
            var tstream1 = new MemoryStream(tbytes1);
            playBttnImg = new BitmapImage();
            playBttnImg.SetSource(tstream1);

            var tbytes2 = Convert.FromBase64String(pauseBttnImgBase64);
            var tstream2 = new MemoryStream(tbytes2);
            pauseBttnImg = new BitmapImage();
            pauseBttnImg.SetSource(tstream2);

            playerBufferingGrid.Visibility = System.Windows.Visibility.Collapsed;

            playerBufferingImgStory.Begin();
        }

        private void mainTimerMethodForBlockUser(object sender, EventArgs e)
        {
            syncVideoProgressBar();
        }

        private void oneScndDelayStartoverBarScrollAdjstTimerMethod(object sender, EventArgs e)
        {
            oneScndDelayStartoverBarScrollAdjstTimer.Stop();

            if (startoverBarScrollContentGrid.ActualWidth > startoverScrollColumn.ActualWidth)
            {
                CompositeTransform cTranform = new CompositeTransform();
                cTranform.TranslateX = -(startoverBarScrollContentGrid.ActualWidth - startoverScrollColumn.ActualWidth);
                startoverBarEPGCanvas.RenderTransform = cTranform;
                startoverScrollAnim.To = cTranform.TranslateX;
            }
            else
            {
                
                CompositeTransform cTranform = new CompositeTransform();
                cTranform.TranslateX = 0;
                startoverBarEPGCanvas.RenderTransform = cTranform;
                startoverScrollAnim.To = 0;
            }
        }

        private void onSecondIsAuthMsgDsplyDelay(object sender, EventArgs e)
        {
            var errorMsg = (string)HtmlPage.Window.Eval("_wgsbneq.MultiLangSupportModule.getErrorMsg(6,_wgsbneq.config.userPrefLanguage)");
            viewModel.plyrErrMsgIndex = 6;
            displayPlyrErrorMsg(errorMsg, false, "CHL-201");
        }

        private void onfingerPrintDurationEnded(object sender, EventArgs e)
        {
            fingerPrintLastDspldLbl.Visibility = System.Windows.Visibility.Collapsed;
        }

        public static TOutput[] ConvertAll<TInput, TOutput>(TInput[] array, Converter<TInput, TOutput> converter)
        {
            if (array == null)
                throw new ArgumentException();

            return (from item in array select converter(item)).ToArray();
        }

        internal void onChannelEPGRecieved(string data)
        {
            viewModel.isGetChannelEpgCallInProcess = false;

            if (data.Equals("error"))
            {
                syncNoCrntProgState();
                syncInterentDisconnection("PGC-101");
                //chkNallowChnlPly();
                return;
            }

            viewModel.GetChannelProgramGuideRootObj = JsonConvert.DeserializeObject<GetChannelProgramGuideJSON.Rootobject>(data);

            //foreach (var prog in viewModel.GetChannelProgramGuideRootObj.channels[0].Programs) { }
            //List<GetChannelProgramGuideJSON.Program> filteredList = new List<GetChannelProgramGuideJSON.Program>();
            //var crntSysTime = DateTime.Now;
            //for (int i = 0; i < viewModel.GetChannelProgramGuideRootObj.channels[0].Programs.Length; i++)
            //{
            //    var progStartTime = viewModel.GetChannelProgramGuideRootObj.channels[0].Programs[i].LinearStartDateTime.ToLocalTime();
            //    var progEndTime = viewModel.GetChannelProgramGuideRootObj.channels[0].Programs[i].ProgEndTimeNonUTC;

            //    if (crntSysTime > progStartTime && crntSysTime <= progEndTime)
            //    {
            //    }
            //    else
            //    {
            //        filteredList.Add(viewModel.GetChannelProgramGuideRootObj.channels[0].Programs[i]);
            //    }
            //}
            //viewModel.GetChannelProgramGuideRootObj.channels[0].Programs = filteredList.ToArray();

            //viewModel.GetChannelProgramGuideRootObj.channels[0].Programs[0].AdditionalInfo.OTTEnabled = "false";

            try
            {
                if (viewModel.GetChannelProgramGuideRootObj.channels[0].Programs.Length > 0)
                { }
            }
            catch (Exception)
            {
                syncNoCrntProgState();
                //chkNallowChnlPly();
                return;
            }

            if (viewModel.GetChannelProgramGuideRootObj.channels[0].Programs.Length > 0)
            {
                if (findNsetCrntPlayingProgram())
                {
                    //if (viewModel.currentProgram.AdditionalInfo.OTTEnabled.Equals("true"))
                    //{
                    //    chkNallowChnlPly();
                    //}
                    //else
                    //{
                    //    var errorMsg = (string)HtmlPage.Window.Eval("_wgsbneq.MultiLangSupportModule.getErrorMsg(4,_wgsbneq.config.userPrefLanguage)");
                    //    viewModel.plyrErrMsgIndex = 4;
                    //    displayPlyrErrorMsg(errorMsg, false);
                    //}
                    //isCurrentProgramDetailsSynced = false;

                    populateEPGinScrollGrid();

                    populateCrntProgInTopBar();
                }
                else
                {
                    syncNoCrntProgState();
                    populateEPGinScrollGrid();

                    //chkNallowChnlPly();
                }

                populateStartoverEPGbar();

                string defaultContent = (string)HtmlPage.Window.Eval("_wgsbneq.config.defaultContent");

                if (defaultContent != null && !defaultContent.Equals(""))
                {
                    GetChannelProgramGuideJSON.Program foundProgram = null;

                    try
                    {
                        for (int i = 0; i < viewModel.GetChannelProgramGuideRootObj.channels[0].Programs.Length; i++)
                        {
                            if (viewModel.GetChannelProgramGuideRootObj.channels[0].Programs[i].ContentId.Equals(defaultContent))
                                foundProgram = viewModel.GetChannelProgramGuideRootObj.channels[0].Programs[i];
                        }
                    }
                    catch (Exception)
                    {
                    }

                    if (foundProgram != null)
                    {
                        performStartoverProgramSelected(foundProgram, null, true, true);
                    }
                }
            }
            else
            {
                syncNoCrntProgState();
                populateEPGinScrollGrid();

                //chkNallowChnlPly();
            }
        }

        internal void onChannelsListRecieved(string data)
        {
            if (!data.Equals("error"))
            {
                viewModel.GetChannelsRespRootObj = JsonConvert.DeserializeObject<GetChannelsJSON.RootObject>(data);

                LoadAndRenderChannelsList();

                if (viewModel.CrntPlayingChannel == null)
                {
                    string playerDefaultChnl = (string)HtmlPage.Window.Eval("_wgsbneq.config.userPrefChannel");
                    if (!playerDefaultChnl.Equals(""))
                    {
                        for (int i = 0; i < viewModel.GetChannelsRespRootObj.Channels.Length; i++)
                        {
                            var str1 = System.Text.RegularExpressions.Regex.Replace(viewModel.GetChannelsRespRootObj.Channels[i].Title, @"\s+", "");
                            var str2 = System.Text.RegularExpressions.Regex.Replace(playerDefaultChnl, @"\s+", "");
                            if (str1.Equals(str2))
                            {
                                channelChanged(i);
                                preloadingFlashScrnGrid.Visibility = System.Windows.Visibility.Collapsed;
                                //HtmlPage.Window.Eval("_wgsbneq.APIcallerModule.callIsAliveApi()");
                                return;
                            }
                        }
                    }
                    channelChanged(0);
                    //HtmlPage.Window.Eval("_wgsbneq.APIcallerModule.callIsAliveApi()");
                }
            }
            else
            {
                syncInterentDisconnection("CHL-101");
            }
            preloadingFlashScrnGrid.Visibility = System.Windows.Visibility.Collapsed;
        }

        internal void onCSMheartbeatNOKrcvd(string responseStr)
        {

            if (responseStr != null)
            {
                if (csmRescheduleTimer.IsEnabled)
                {
                    csmRescheduleTimer.Stop();
                }

                if (responseStr == "NOK")
                {
                    viewModel.isCSMheartbeatNOKforCrntChnl = true;
                }
                else
                {
                    viewModel.CSMResponseObj = JsonConvert.DeserializeObject<kplus_silverlight_player.JSON.CsmJSONResponse.RootObject>(responseStr);
                    if (viewModel.CSMResponseObj != null)
                    {
                        viewModel.maxRetriesAttempt = viewModel.CSMResponseObj.heartbeat.policy.maxMissedHeartbeats;
                        viewModel.HeartBeatInterval = viewModel.CSMResponseObj.heartbeat.policy.heartbeatInterval;
                    }
                }
            }
            else
            {
                if (viewModel.maxRetriesAttempt > 0)
                {
                    viewModel.maxRetriesAttempt--;
                }

                Boolean isOnline = (Boolean)HtmlPage.Window.Eval("navigator.onLine;");
                if (!isOnline)
                {
                    if (viewModel.maxRetriesAttempt < 1)
                    {
                        HtmlPage.Window.Eval("clearTimeout(_wgsbneq.CSMheartBeatModule.CSMheartbeatReqTimeoutId)");
                        if (SmoothPlayer.CurrentState != SmoothStreamingMediaElementState.Stopped)
                        {
                            //if (SmoothPlayer.CurrentState == SmoothStreamingMediaElementState.Playing ||
                            //    SmoothPlayer.CurrentState == SmoothStreamingMediaElementState.Paused)
                            //    SmoothPlayer.Dispose();

                            var errorMsg = (string)HtmlPage.Window.Eval("_wgsbneq.MultiLangSupportModule.getErrorMsg(1,_wgsbneq.config.userPrefLanguage)");
                            viewModel.plyrErrMsgIndex = 1;
                            displayPlyrErrorMsg(errorMsg, false, "APP-101");
                            if (csmRescheduleTimer.IsEnabled)
                            {
                                csmRescheduleTimer.Stop();
                            }
                            return;
                        }
                    }
                }
                else
                {
                    if (viewModel.maxRetriesAttempt < 1)
                    {
                        HtmlPage.Window.Eval("clearTimeout(_wgsbneq.CSMheartBeatModule.CSMheartbeatReqTimeoutId)");
                        if (SmoothPlayer.CurrentState != SmoothStreamingMediaElementState.Stopped)
                        {
                            //if (SmoothPlayer.CurrentState == SmoothStreamingMediaElementState.Playing ||
                            //    SmoothPlayer.CurrentState == SmoothStreamingMediaElementState.Paused)
                            //    SmoothPlayer.Dispose();

                            var errorMsg = (string)HtmlPage.Window.Eval("_wgsbneq.MultiLangSupportModule.getErrorMsg(1,_wgsbneq.config.userPrefLanguage)");
                            viewModel.plyrErrMsgIndex = 1;
                            displayPlyrErrorMsg(errorMsg, false, "CSM-601");
                            if (csmRescheduleTimer.IsEnabled)
                            {
                                csmRescheduleTimer.Stop();
                            }
                            return;
                        }
                    }
                }

                if (csmRescheduleTimer.IsEnabled)
                {
                    csmRescheduleTimer.Stop();
                }

                csmRescheduleTimer.Start();
            }
        }

        internal void rescheduleCSM(object sender, EventArgs e)
        {
            HtmlPage.Window.Eval("clearTimeout(_wgsbneq.CSMheartBeatModule.CSMheartbeatReqTimeoutId)");
            HtmlPage.Window.Eval("_wgsbneq.CSMheartBeatModule.sndCSMheartbeatPlayReq()");
        }

        internal void onGetContentRespRcvd(string responseStr)
        {
            if (!responseStr.Equals("error"))
            {
                viewModel.currentProgramDetails = JsonConvert.DeserializeObject<GetContentResponseJSON.Rootobject>(responseStr);
                populateCrntProgInTopBar();
                populateProgInfoDetailsCntralPopup();
                populateEPGinScrollGrid();
            }
            else
            {
                syncInterentDisconnection("CNT-101");
                viewModel.currentProgramDetails = null;
            }
        }

        internal void onTokenRecievedFromWebPage(string responseStr)
        {
            if (responseStr != null && responseStr != "error")
            {
                viewModel.ValidateTokenResponseRootObj = JsonConvert.DeserializeObject<ValidateTokenRespJSON.Rootobject>(responseStr);
                viewModel.maxRetriesAttempt = Int32.Parse(viewModel.ValidateTokenResponseRootObj.IrdetoSession.ConcurrentStreamInfo.MaxMissedHeartbeats);
                viewModel.HeartBeatInterval = Int32.Parse(viewModel.ValidateTokenResponseRootObj.IrdetoSession.ConcurrentStreamInfo.HeartbeatInterval);
            }
            else
            {
                syncInterentDisconnection("VDT-101");
            }

        }

        internal void undoMouseNOverlayDisappearnce()
        {
            showOverlayRoot();
            viewModel.isOverlayHidingAllowed = false;
        }

        private void adjustChannelsListGrid()
        {
            channelsScrollStoryBoard.Stop();

            CompositeTransform cTranform = new CompositeTransform();
            cTranform.TranslateX = 0;
            channelListCanvasGrid.RenderTransform = cTranform;

            channelsScrollAnim.To = 0;
            channelsScrollAnim.From = 0;

            channelListWrapperGrid.Clip = new RectangleGeometry()
            {
                Rect = new Rect(0, 0, channelListWrapperGrid.ActualWidth, channelListWrapperGrid.ActualHeight)
            };
        }

        private void adjustEpgBarGrid()
        {
            epgBarScrollContentStoryBoard.Stop();
            CompositeTransform cTranform = new CompositeTransform();
            cTranform.TranslateX = 0;
            epgBarScrollContentGrid.RenderTransform = cTranform;

            epgBarScrollContentAnim.From = 0;

            epgBarScrollContentColumn.Clip = new RectangleGeometry()
            {
                Rect = new Rect(0, 0, epgBarScrollContentColumn.ActualWidth, epgBarScrollContentColumn.ActualHeight)
            };
        }

        private void adjustVideoCntrlBttnImgs()
        {
            switch (SmoothPlayer.CurrentState)
            {
                case SmoothStreamingMediaElementState.Playing:
                    playPauseBttn.Source = pauseBttnImg;
                    break;

                case SmoothStreamingMediaElementState.Paused:
                    playPauseBttn.Source = playBttnImg;
                    break;
            }
        }

        private void audioChnlCanvCmb_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            changeAudioChannel("t");
        }

        private void bufferStatusChckerTimerCallback(object sender, EventArgs e)
        {
            if (SmoothPlayer.CurrentState == SmoothStreamingMediaElementState.Buffering)
            {
                HtmlPage.Window.Eval("_wgsbneq.gAnalyticsModule.fireGoogleAnalyticsEvnt('Live Player', 'Buffering', 'Start')");
            }
        }

        private void calcNrenderChartHorizMarks()
        {
            if (bitRateChartBars.Children.Count > 0)
            {
                var barRow = (Grid)VideoContainer.FindName("bGrid_r" + viewModel.BitRateChartVerticlePos);
                var barCol = (Border)VideoContainer.FindName("bGrid_r" + viewModel.BitRateChartVerticlePos + "c" + viewModel.BitRateCartHorizontalPos);
                barCol.Background = new SolidColorBrush(Colors.White);
            }
        }

        private void calcNrenderChartVerticleMarks()
        {
            if (bitRateChartBars.Children.Count > 0)
            {
                if (viewModel.BitRateChartPrevVerticlePos != -1)
                {
                    if (viewModel.BitRateChartPrevVerticlePos < viewModel.BitRateChartVerticlePos)
                    {
                        int vertPos = viewModel.BitRateChartVerticlePos;
                        while (viewModel.BitRateChartPrevVerticlePos <= vertPos)
                        {
                            var barRow = (Grid)VideoContainer.FindName("bGrid_r" + (vertPos));
                            var barCol = (Border)VideoContainer.FindName("bGrid_r" + (vertPos) + "c" + (viewModel.BitRateCartHorizontalPos - 1));
                            barCol.BorderBrush = new SolidColorBrush(Colors.White);
                            barCol.BorderThickness = new Thickness(0, 0, 5, 0);

                            vertPos = vertPos - 1;
                        }
                    }
                    else if (viewModel.BitRateChartPrevVerticlePos > viewModel.BitRateChartVerticlePos)
                    {
                        int vertPos = viewModel.BitRateChartVerticlePos;
                        while (viewModel.BitRateChartPrevVerticlePos >= vertPos)
                        {
                            var barRow = (Grid)VideoContainer.FindName("bGrid_r" + (vertPos));
                            var barCol = (Border)VideoContainer.FindName("bGrid_r" + (vertPos) + "c" + (viewModel.BitRateCartHorizontalPos - 1));
                            barCol.BorderBrush = new SolidColorBrush(Colors.White);
                            barCol.BorderThickness = new Thickness(0, 0, 5, 0);

                            vertPos = vertPos + 1;
                        }
                    }
                }
            }
        }

        private void calcNsetPlayerVolumn(double barHeight)
        {
            videoControlVolumBar.Height = barHeight;

            var totalHeight = videoControlVolumContainer.ActualHeight;
            var partHeight = totalHeight / viewModel.MaxAvailableVolumn;

            for (double i = 1; i <= viewModel.MaxAvailableVolumn; i++)
            {
                if (partHeight * i >= videoControlVolumBar.Height)
                {
                    if (i == 1.0)
                    {
                        i = 0.0;
                    }
                    SmoothPlayer.Volume = i / 10;
                    //viewModel.PlayerVolumn = SmoothPlayer.Volume;
                    return;
                }
            }
        }

        private void calcNsetSelectedVideoBufferDuration(double bufferDura)
        {
            var totalWidth = limitVideoBufferCanv.ActualWidth;
            var factor = totalWidth / viewModel.MaxVideoBufferDuration;

            for (int i = 1; i <= viewModel.MaxVideoBufferDuration; i++)
            {
                if (factor * i >= bufferDura)
                {
                    if (viewModel.UserSelectedVideoBufferDuration == i)
                    {
                        if (bufferDura < factor * i)
                        {
                            if (i > 1)
                            {
                                SmoothPlayer.BufferingTime = new TimeSpan(0, 0, i - 1);
                                viewModel.UserSelectedVideoBufferDuration = i - 1;
                                limitVideoBufferRect.Width = factor * (i - 1);
                                limitVideoBufferLabel.Content = i - 1;
                                return;
                            }
                        }
                    }

                    SmoothPlayer.BufferingTime = new TimeSpan(0, 0, i);
                    viewModel.UserSelectedVideoBufferDuration = i;
                    limitVideoBufferRect.Width = factor * i;
                    limitVideoBufferLabel.Content = i;
                    return;
                }
            }
        }

        private void calcNsetUserSelectedBitRate(double val)
        {
            var factor = limitBitRateWhiteCanv.ActualWidth / viewModel.SysAvailableBitRates.Length;

            for (int i = 1; i <= viewModel.SysAvailableBitRates.Length; i++)
            {
                if (factor * i >= val)
                {
                    if (viewModel.UserSelectedBitRate == viewModel.SysAvailableBitRates[i - 1])
                    {
                        if (val < factor * i)
                        {
                            if (i > 1 && viewModel.isChnlBitrateChartLoaded)
                            {
                                setPlayerBitRate(viewModel.SysAvailableBitRates[i - 2]);
                                viewModel.UserSelectedBitRate = viewModel.SysAvailableBitRates[i - 2];
                                limitBitRateWhiteRect.Width = factor * (i - 1);
                                limitBitRateLabel.Content = viewModel.UserSelectedBitRate / 1000;
                                return;
                            }
                        }
                    }

                    setPlayerBitRate(viewModel.SysAvailableBitRates[i - 1]);
                    viewModel.UserSelectedBitRate = viewModel.SysAvailableBitRates[i - 1];
                    limitBitRateWhiteRect.Width = factor * i;
                    limitBitRateLabel.Content = viewModel.UserSelectedBitRate / 1000;
                    return;
                }
            }
        }

        private void CallGlobalJSMethod(object sender, EventArgs e)
        {
            string strMS = DateTime.Now.Millisecond.ToString();

            string strTime = "Time came from managed code \n"
                + DateTime.Now.ToLongTimeString()
                + " MS = " + strMS;

            HtmlPage.Window.Invoke("globalJSMethod", strTime);
        }

        private void changeAudioChannel(string language)
        {
            viewModel.usrPrefAudioLang = language;
            var cmbSelectedVal = language;

            if (cmbSelectedVal != null)
            {
                if (SmoothPlayer.ManifestInfo != null)
                {
                    foreach (var segment in SmoothPlayer.ManifestInfo.Segments)
                    {
                        var availableStreams = segment.AvailableStreams;
                        var selectedStreams = new List<StreamInfo>();

                        if (availableStreams.Count > 2)
                        {
                            foreach (var stream in availableStreams)
                            {
                                if (stream.Type == MediaStreamType.Video)
                                {
                                    selectedStreams.Add(stream);
                                }
                                else if (stream.Type == MediaStreamType.Audio)
                                {
                                     
                                    if (cmbSelectedVal == "vi" || cmbSelectedVal == "vie")
                                    {
                                        
                                        if (stream.Attributes.ContainsKey("Language"))
                                        {
                                            
                                            if (stream.Attributes["Language"].Equals("vie") || stream.Attributes["Language"].Equals("vi"))
                                            {
                                                selectedStreams.Add(stream);
                                            }
                                        }
                                    }
                                    
                                    else
                                    {
                                        
                                        if (stream.Attributes.ContainsKey("Language"))
                                        {
                                            
                                            if (stream.Attributes["Language"].Equals("eng") || stream.Attributes["Language"].Equals("en") || stream.Attributes["Language"].Equals("mul"))
                                            {
                                                selectedStreams.Add(stream);
                                            }
                                        }
                                        
                                        else
                                        {
                                            selectedStreams.Add(stream);
                                        }
                                    }

                                }
                            }
                            segment.SelectStreamsAsync(selectedStreams);
                        }
                    }
                }
            }
        }

        private void changeTranslOfUIlabels()
        {
            for (int i = 0; i < listOfLabelCntrols.Count; i++)
            {
                var obj = listOfLabelCntrols[i];
                if (obj is System.Windows.Controls.Label)
                {
                    var labelCntrl = (System.Windows.Controls.Label)obj;
                    var labelTxt = "";
                    if (labelCntrl.Name.Equals("videoQualityLabel"))
                    {
                        labelTxt = (string)HtmlPage.Window.Eval("_wgsbneq.MultiLangSupportModule.getLabel('" + i + "','" + viewModel.PlayerLang + "')");
                        labelTxt = labelTxt + " " + viewModel.PlayerBitRate + " kbps";
                    }
                    else
                    {
                        labelTxt = (string)HtmlPage.Window.Eval("_wgsbneq.MultiLangSupportModule.getLabel('" + i + "','" + viewModel.PlayerLang + "')");
                    }

                    labelCntrl.Content = labelTxt;
                }
            }

            
            LangDetailLabel.Content = ((System.Windows.Controls.Label)listOfLabelCntrols[0]).Content;
            brdcastSchedInfo.Text = infoInfoLabel.Content.ToString();
            brdcastSchedBrdcastSched.Text = infoBroadcastSchLabel.Content.ToString();

            if (viewModel.PlayerLang.Equals("vie"))
            {
                videoBufferScndsLbl.Content = "  giây";
            }
            else
            {
                videoBufferScndsLbl.Content = "  seconds";
            }
        }

        private void channelChanged(int selectedChannelOrderNo)
        {

            if (csmRescheduleTimer.IsEnabled)
            {
                csmRescheduleTimer.Stop();
            }

            viewModel.PlayerBitRate = 0;
            if (viewModel.PlayerLang.Equals("eng"))
            {
                videoQualityLabel.Content = "Current Bandwidth " + viewModel.PlayerBitRate + " kbps";
            }
            else
            {
                videoQualityLabel.Content = "Băng thông hiện tại " + viewModel.PlayerBitRate + " kbps";
            }

            HtmlPage.Window.Eval("_wgsbneq.config.crntChnlCSMPausCounter = 0;_wgsbneq.config.flags.isChnlPausedByUsr = false;");
            viewModel.isCSMheartbeatNOKforCrntChnl = false;
            if (viewModel.CSMResponseObj != null)
            {
                viewModel.maxRetriesAttempt = viewModel.CSMResponseObj.heartbeat.policy.maxMissedHeartbeats;
            }

            var streamUrl = getChannelStreamUrl(selectedChannelOrderNo);

            HtmlPage.Window.Eval("clearTimeout(_wgsbneq.CSMheartBeatModule.CSMheartbeatReqTimeoutId)");
            
            HtmlPage.Window.Eval("_wgsbneq.CSMheartBeatModule.onCSMPlayChannelChange()");
            if (!viewModel.isPlyrDefaultChnl)
            {
                HtmlPage.Window.Eval("_wgsbneq.CSMheartBeatModule.sndCSMheartbeatPauseReq()");
            }

            viewModel.CrntPlayingChannel = viewModel.GetChannelsRespRootObj.Channels[selectedChannelOrderNo];
            viewModel.CrntPlayingChannelIndex = selectedChannelOrderNo;

            setStartoverParametersForCurrentChannel();

            adjustStartoverBarWhenChnlSwitched();

            

            viewModel.currentProgram = null;
            HtmlPage.Window.Eval("_wgsbneq.config.crntPlayingChannelIndex = " + selectedChannelOrderNo + ";");

            if (viewModel.isPlyrDefaultChnl)
            {
                
                HtmlPage.Window.Eval("_wgsbneq.CSMheartBeatModule.sndCSMheartbeatPlayReq()");
            }
            else
            {
                chkFingerPrintRspnsForNewChnl();
            }

            viewModel.isPlyrDefaultChnl = false;

            if (viewModel.CrntPlayingChannel.IsAuthorized == false)
            {
                oneSecondIsAuthMsgDsplyDelay.Stop();
                oneSecondIsAuthMsgDsplyDelay.Interval = TimeSpan.FromSeconds(4);
                oneSecondIsAuthMsgDsplyDelay.Start();
                loadChannelEPG();
                //loadStartoverEPG();
                return;
            }
            else
            {
                HtmlPage.Window.Eval("_wgsbneq.APIcallerModule.callIsAliveApi()");
            }

            if (streamUrl == null)
            {
                loadChannelEPG();
                //loadStartoverEPG();
                var errorMsg = (string)HtmlPage.Window.Eval("_wgsbneq.MultiLangSupportModule.getErrorMsg(1,_wgsbneq.config.userPrefLanguage)");
                viewModel.plyrErrMsgIndex = 1;
                displayPlyrErrorMsg(errorMsg, false, "CHL-102");
                return;
            }

            string url = getChannelDRMLicenseServerURL();
            var sessionId = viewModel.ValidateTokenResponseRootObj.IrdetoSession.SessionId;
            var ticket = viewModel.ValidateTokenResponseRootObj.IrdetoSession.Ticket;
            url = url + "&SessionId=" + sessionId + "&Ticket=" + ticket;
            url = url + "&t=" + "2016-10-13T04:15:15.000" + "-" + "2016-10-13T04:59:55.000";

            var stringToSnd2 = "irdeto-urlencoded=v1&DMClient=SilverLight&DMClientVersion=" + Environment.Version + "&";
            stringToSnd2 = stringToSnd2 + "DMDeviceModel=PC&DMOS=" + Environment.OSVersion.Platform.ToString() + "&";
            stringToSnd2 = stringToSnd2 + "DMOSVersion=" + Environment.OSVersion + "&";
            stringToSnd2 = stringToSnd2 + "DMIsRooted=" + "no";

            ((ManualLicenseAcquirer)SmoothPlayer.LicenseAcquirer).ErrorMessage = "";
            viewModel.isLicenseErrorDisplayed = false;
            try
            {
                SmoothPlayer.LicenseAcquirer.CancelAsync();
            }
            catch (Exception)
            {
            }

            viewModel.isLicenseReqInProcess = true;
            SmoothPlayer.LicenseAcquirer.ChallengeCustomData = stringToSnd2;
            SmoothPlayer.LicenseAcquirer.LicenseServerUriOverride = new Uri(url, UriKind.Absolute);
            SmoothPlayer.SmoothStreamingSource = streamUrl;

            SmoothPlayer.AutoPlay = false;

            viewModel.isChnlPlyedFrstTime = false;
            viewModel.IsChannelChangedFlag = true;

            oneMintContinuesChannelPlaybackTimer.Stop();
            oneMintContinuesChannelPlaybackTimer.Start();

            loadChannelEPG();

            var channelTitle = viewModel.GetChannelsRespRootObj.Channels[selectedChannelOrderNo].Title.Replace('\'', ' ').Replace('\"', ' ');
            HtmlPage.Window.Eval("_wgsbneq.gAnalyticsModule.fireGoogleAnalyticsEvnt('Channel','Play', '" + channelTitle + "')");

            string startoverLength = getCrntChnlStartOverLength();

            // HtmlPage.Window.Eval("_wgsbneq.onCSMPlayLiveTVOnly()");
            //HtmlPage.Window.Eval("_wgsbneq.CSMheartBeatModule.onCSMPlayLiveTVOnly()");
        }

        private void adjustVideoControlsStartoverBtn()
        {
            try
            {
                string startoverLength = getCrntChnlStartOverLength();
                string archiveLength = getCrntChnlArchiveLength();

                ColumnDefinition c1 = new ColumnDefinition();
                ColumnDefinition c2 = new ColumnDefinition();
                ColumnDefinition c3 = new ColumnDefinition();
                ColumnDefinition c4 = new ColumnDefinition();
                ColumnDefinition c5 = new ColumnDefinition();
                ColumnDefinition c6 = new ColumnDefinition();
                ColumnDefinition c7 = new ColumnDefinition();

                if (string.IsNullOrEmpty(startoverLength) || startoverLength == "0" || string.IsNullOrEmpty(archiveLength) || archiveLength == "0")
                {
                    c1.Width = new GridLength(0, GridUnitType.Star);

                    c2.Width = new GridLength(5, GridUnitType.Star);

                    c3.Width = new GridLength(7, GridUnitType.Star);

                    c4.Width = new GridLength(71, GridUnitType.Star);

                    c5.Width = new GridLength(7, GridUnitType.Star);

                    c6.Width = new GridLength(5, GridUnitType.Star);

                    c7.Width = new GridLength(5, GridUnitType.Star);
                }
                else if ((!string.IsNullOrEmpty(startoverLength) || !string.IsNullOrEmpty(archiveLength)) && viewModel.startoverProgram == null)
                {
                    c1.Width = new GridLength(0, GridUnitType.Star);

                    c2.Width = new GridLength(5, GridUnitType.Star);

                    c3.Width = new GridLength(7, GridUnitType.Star);

                    c4.Width = new GridLength(71, GridUnitType.Star);

                    c5.Width = new GridLength(7, GridUnitType.Star);

                    c6.Width = new GridLength(5, GridUnitType.Star);

                    c7.Width = new GridLength(5, GridUnitType.Star);
                }
                else
                {
                    c1.Width = new GridLength(5, GridUnitType.Star);

                    c2.Width = new GridLength(5, GridUnitType.Star);

                    c3.Width = new GridLength(7, GridUnitType.Star);

                    c4.Width = new GridLength(71, GridUnitType.Star);

                    c5.Width = new GridLength(7, GridUnitType.Star);

                    c6.Width = new GridLength(5, GridUnitType.Star);

                    c7.Width = new GridLength(5, GridUnitType.Star);
                }

                videoControlsGrid.ColumnDefinitions.Clear();
                videoControlsGrid.ColumnDefinitions.Add(c1);
                videoControlsGrid.ColumnDefinitions.Add(c2);
                videoControlsGrid.ColumnDefinitions.Add(c3);
                videoControlsGrid.ColumnDefinitions.Add(c4);
                videoControlsGrid.ColumnDefinitions.Add(c5);
                videoControlsGrid.ColumnDefinitions.Add(c6);
                videoControlsGrid.ColumnDefinitions.Add(c7);
            }
            catch (Exception)
            {
            }
        }

        private void onChannelLogoClicked(object sender, MouseButtonEventArgs e)
        {
            System.Windows.Controls.Image channelLogoImg = (System.Windows.Controls.Image)e.OriginalSource;
            int selectedChannelOrderNo = Int16.Parse(channelLogoImg.Name.Substring(12));

            performChannelLogoClicked(selectedChannelOrderNo);
        }

        private void performChannelLogoClicked(int selectedChannelOrderNo)
        {
            viewModel.isProgressBarHalted = false;

            if (viewModel.isUsrBlkdByFp)
            {
                return;
            }

            try
            {
                SmoothPlayer.Stop();
            }
            catch (Exception)
            {
            }

            viewModel.isInStartoverMode = false;
            viewModel.isInTimeShiftMode = false;

            if (viewModel.startoverProgram != null)
            {
                viewModel.startoverProgram.TimeShiftPlayerStartTime = -1;
                viewModel.startoverProgram.TimeShiftElapsedTime = -1;
            }

            viewModel.isStartoverProgramEnded = false;
            viewModel.startoverProgram = null;
            //isStartoverProgramDetailsSynced = false;
            viewModel.startoverProgramDetails = null;
            viewModel.isStartoverProgramEnded = false;
            viewModel.startoverEndedProgramToBeSeekedValue = -1;

            viewModel.isGetChannelEpgCallInProcess = false;

            viewModel.SysAvailableBitRates = new long[0];
            bitRateChartInnerCotainer.Visibility = System.Windows.Visibility.Collapsed;
            bitrateChartLblsContGrd.Children.Clear();
            viewModel.isChnlBitrateChartLoaded = false;
            viewModel.isChnlAllowedToPlay = false;
            SmoothPlayer.Visibility = System.Windows.Visibility.Collapsed;
            plyrErrorMsgGrid.Visibility = System.Windows.Visibility.Collapsed;
            plyrErrorMsgTxtBlk.Text = "";
            viewModel.isPlyrErrMsgGrdVisible = false;
            viewModel.GetChannelProgramGuideRootObj = null;
            channelChanged(selectedChannelOrderNo);
        }

        private void adjustStartoverBarWhenChnlSwitched()
        {
            if (!string.IsNullOrEmpty(getCrntChnlStartOverLength()))
            {
                var transform = (CompositeTransform)epgBar.RenderTransform;
                if (!isEqualForDoubles(transform.TranslateX, 0.0))
                {
                    startoverEPGbar.Visibility = System.Windows.Visibility.Visible;
                }
            }
            else
            {
                performOnStartoverBarCloseBtnClicked();
                startoverEPGbar.Visibility = System.Windows.Visibility.Collapsed;
            }
        }

        private void channelLstBottomGrid_MouseEnter(object sender, MouseEventArgs e)
        {
            viewModel.IsMouseOverChannelsListBar = true;
        }

        private void channelLstBottomGrid_MouseLeave(object sender, MouseEventArgs e)
        {
            viewModel.IsMouseOverChannelsListBar = false;
        }

        private void chkNallowChnlPly()
        {
            try
            {
                if (!viewModel.isAuthTokenExpired && viewModel.CrntPlayingChannel.IsAuthorized)
                {
                    if (!string.IsNullOrEmpty(getCrntChnlStartOverLength()))
                    {
                        if (viewModel.startoverProgram != null)
                        {
                            if (viewModel.startoverProgram.AdditionalInfo.OTTEnabled.Equals("true"))
                            {
                                viewModel.isChnlAllowedToPlay = true;
                            }
                            else
                            {
                                viewModel.isChnlAllowedToPlay = false;
                            }
                        }
                        else
                        {
                            viewModel.isChnlAllowedToPlay = true;
                        }
                    }
                    else
                    {
                        if (viewModel.currentProgram != null)
                        {
                            if (viewModel.currentProgram.AdditionalInfo.OTTEnabled.Equals("true"))
                            {
                                viewModel.isChnlAllowedToPlay = true;
                            }
                            else
                            {
                                viewModel.isChnlAllowedToPlay = false;
                            }
                        }
                        else
                        {
                            viewModel.isChnlAllowedToPlay = true;
                        }
                    }

                    //if (viewModel.isPlyrErrMsgGrdVisible)
                    //{
                    //    if (viewModel.plyrErrMsgIndex == 4)
                    //    {
                    //        if (viewModel.currentProgram.AdditionalInfo.OTTEnabled.Equals("true"))
                    //        {
                    //            SmoothPlayer.Visibility = System.Windows.Visibility.Visible;
                    //            plyrErrorMsgGrid.Visibility = System.Windows.Visibility.Collapsed;
                    //            viewModel.isPlyrErrMsgGrdVisible = false;

                    //        }

                    //    }
                    //}
                    //else
                    //{
                    //    if (viewModel.currentProgram.AdditionalInfo.OTTEnabled.Equals("true"))
                    //    {
                    //        SmoothPlayer.Visibility = System.Windows.Visibility.Visible;
                    //        plyrErrorMsgGrid.Visibility = System.Windows.Visibility.Collapsed;
                    //        viewModel.isPlyrErrMsgGrdVisible = false;
                    //        viewModel.isChnlAllowedToPlay = true;
                    //    }
                    //}
                }
            }
            catch (Exception)
            {
            }
        }

        private void syncOTTenabledForStartoverProgram()
        {
            if (viewModel.startoverProgram != null)
            {
                if (viewModel.startoverProgram.AdditionalInfo.OTTEnabled.Equals("true"))
                {
                    if (viewModel.isPlyrErrMsgGrdVisible)
                    {
                        if (viewModel.plyrErrMsgIndex == 4)
                        {
                            SmoothPlayer.Visibility = System.Windows.Visibility.Visible;
                            plyrErrorMsgGrid.Visibility = System.Windows.Visibility.Collapsed;
                            viewModel.isPlyrErrMsgGrdVisible = false;
                        }
                    }
                    else
                    {
                        SmoothPlayer.Visibility = System.Windows.Visibility.Visible;
                        plyrErrorMsgGrid.Visibility = System.Windows.Visibility.Collapsed;
                        viewModel.isPlyrErrMsgGrdVisible = false;
                    }
                }
                else
                {
                    var errorMsg = (string)HtmlPage.Window.Eval("_wgsbneq.MultiLangSupportModule.getErrorMsg(4,_wgsbneq.config.userPrefLanguage)");
                    viewModel.plyrErrMsgIndex = 4;
                    displayPlyrErrorMsg(errorMsg, false, "APP-202");
                }
            }
            else
            {
            }
        }

        private void syncOTTenabledForCurrentProgram()
        {
            if (viewModel.startoverProgram != null)
            {
                return;
            }

            if (viewModel.currentProgram != null)
            {
                if (viewModel.currentProgram.AdditionalInfo.OTTEnabled.Equals("true"))
                {
                    if (viewModel.isPlyrErrMsgGrdVisible)
                    {
                        if (viewModel.plyrErrMsgIndex == 4)
                        {
                            SmoothPlayer.Visibility = System.Windows.Visibility.Visible;
                            plyrErrorMsgGrid.Visibility = System.Windows.Visibility.Collapsed;
                            viewModel.isPlyrErrMsgGrdVisible = false;
                        }
                    }
                    else
                    {
                        SmoothPlayer.Visibility = System.Windows.Visibility.Visible;
                        plyrErrorMsgGrid.Visibility = System.Windows.Visibility.Collapsed;
                        viewModel.isPlyrErrMsgGrdVisible = false;
                    }
                }
                else
                {
                    var errorMsg = (string)HtmlPage.Window.Eval("_wgsbneq.MultiLangSupportModule.getErrorMsg(4,_wgsbneq.config.userPrefLanguage)");
                    viewModel.plyrErrMsgIndex = 4;
                    displayPlyrErrorMsg(errorMsg, false, "APP-202");
                }
            }
            else
            {
            }
        }

        private void chngPlayerBitRate()
        {
            var totalWidth = limitBitRateWhiteCanv.ActualWidth;
            var part = totalWidth / viewModel.SysAvailableBitRates.Length;

            for (int i = 1; i <= viewModel.SysAvailableBitRates.Length; i++)
            {
                if (viewModel.SysAvailableBitRates[i - 1] == viewModel.UserSelectedBitRate)
                {
                    limitBitRateWhiteRect.Width = part * i;
                    setPlayerBitRate(viewModel.SysAvailableBitRates[i - 1]);
                    limitBitRateLabel.Content = viewModel.UserSelectedBitRate / 1000;
                    viewModel.IsBitRateSet = true;
                    viewModel.IsChannelChangedFlag = false;
                    return;
                }
            }
        }

        private void chngPlayerVideoBufferDuration()
        {
            var totalWidth = limitVideoBufferCanv.ActualWidth;
            var part = totalWidth / viewModel.MaxVideoBufferDuration;
            limitVideoBufferRect.Width = part * viewModel.UserSelectedVideoBufferDuration;

            SmoothPlayer.BufferingTime = new TimeSpan(0, 0, viewModel.UserSelectedVideoBufferDuration);

            limitVideoBufferLabel.Content = viewModel.UserSelectedVideoBufferDuration;

            viewModel.IsVideoBufferSet = true;
        }

        private void chngPlayerVolume()
        {
            SmoothPlayer.Volume = viewModel.PlayerVolumn;
        }

        private void clearChart()
        {
            if (bitRateChartBars.Children.Count > 0)
            {
                for (int i = 0; i < viewModel.SysAvailableBitRates.Length * 2 - 1; i++)
                {
                    for (int j = 0; j < 10; j++)
                    {
                        var grid1 = (Border)VideoContainer.FindName("bGrid_r" + i + "c" + j);   

                        if (grid1 != null)
                        {
                            grid1.Background = null;
                            grid1.BorderThickness = new Thickness(0);
                        }
                    }
                }
            }
        }

        private DateTime convertFromUnixTimestamp(double timestamp)
        {
            DateTime origin = new DateTime(1970, 1, 1, 0, 0, 0, 0);
            return origin.AddSeconds(timestamp);
        }

        private void displayPlyrErrorMsg(string errorMsg, bool forcefullyDisplay, string code)
        {
            clearFingerPrints();
            //tt1.Content = "ErrorString: " + plyrErrorMsgTxtBlk.Text;
            if (String.IsNullOrWhiteSpace(plyrErrorMsgTxtBlk.Text))
            {
                if (!viewModel.isPlyrErrMsgGrdVisible || forcefullyDisplay)
                {
                    plyrErrorMsgGrid.Visibility = System.Windows.Visibility.Visible;
                    if (code != null)
                    {
                        code = "[" + code + "]";
                    }
                    plyrErrorMsgTxtBlk.Text = errorMsg + " " + code;
                    viewModel.isPlyrErrMsgGrdVisible = true;
                    plyrNotificationGrid.Visibility = System.Windows.Visibility.Collapsed;
                }
            }
        }

        private void doTokenRevalidation(object sender, EventArgs e)
        {
            HtmlPage.Window.Eval("_wgsbneq.APIcallerModule.validateToken()");
        }

        private void doTokenValidation()
        {
            HtmlPage.Window.Eval("_wgsbneq.APIcallerModule.validateToken()");
        }

        private bool findNsetCrntPlayingProgram()
        {
            //if (viewModel.isGetChannelEpgCallInProcess)
            //{
            //    return false;
            //}

            int crntProgIndex = 0;

            while (viewModel.GetChannelProgramGuideRootObj != null && crntProgIndex < viewModel.GetChannelProgramGuideRootObj.channels[0].Programs.Length)
            {
                var crntSysTime = DateTime.Now;
                var progStartTime = viewModel.GetChannelProgramGuideRootObj.channels[0].Programs[crntProgIndex].LinearStartDateTime.ToLocalTime();
                var progEndTime = viewModel.GetChannelProgramGuideRootObj.channels[0].Programs[crntProgIndex].ProgEndTimeNonUTC;

                if (crntSysTime >= progStartTime && crntSysTime < progEndTime)
                {
                    viewModel.currentProgram = viewModel.GetChannelProgramGuideRootObj.channels[0].Programs[crntProgIndex];
                    viewModel.CrntPlayingProgramIndex = crntProgIndex;

                    if (!viewModel.isInStartoverMode && !viewModel.isInTimeShiftMode && !getCrntChnlStartOverLength().Equals(""))
                    {
                        var newCrntSysTime = DateTime.Now;
                        viewModel.startoverProgram = viewModel.currentProgram;
                        viewModel.startoverProgramDetails = null;
                        viewModel.startoverProgram.TimeShiftPlayerStartTime = -1;
                        viewModel.startoverProgram.TimeShiftElapsedTime = -1;

                        viewModel.timeShiftValue = 0;
                        viewModel.timeShiftedToDate = newCrntSysTime;

                        viewModel.isInTimeShiftMode = true;
                        populateStartoverEPGbar();
                    }

                    return true;
                }

                crntProgIndex++;
            }

            viewModel.CrntPlayingProgramIndex = -1;
            viewModel.currentProgram = null;
            return false;
        }

        private void fullscreen_toggle_btn_Click(object sender, RoutedEventArgs e)
        {
            performOnStartoverBarCloseBtnClicked();
            performOnEpgBarCloseBtnClicked();

            viewModel.isSizeJustChanged = true;

            viewModel.wasStartoverBarHiddenBeforeFullScrnToggle = false;
            if (startoverEPGbar.Visibility == System.Windows.Visibility.Collapsed)
            {
                viewModel.wasStartoverBarHiddenBeforeFullScrnToggle = true;
                startoverEPGbar.Visibility = System.Windows.Visibility.Visible;
            }

            var isFullScrn = Application.Current.Host.Content.IsFullScreen;

            if (isFullScrn)
            {
                HtmlPage.Window.Eval("_wgsbneq.gAnalyticsModule.fireGoogleAnalyticsEvnt('Live Player','Size', 'Minimized')");
                Application.Current.Host.Content.IsFullScreen = false;
            }
            else
            {
                HtmlPage.Window.Eval("_wgsbneq.gAnalyticsModule.fireGoogleAnalyticsEvnt('Live Player','Size', 'Full Screen')");
                Application.Current.Host.Content.IsFullScreen = true;
            }
        }

        private string getChannelDRMLicenseServerURL()
        {
            for (int i = 0; i < viewModel.CrntPlayingChannel.ExtraAttributes.Length; i++)
            {
                if (viewModel.CrntPlayingChannel.ExtraAttributes[i].Name.Equals("laUrl_US_PlayReady_Widevine_playready"))
                {
                    return viewModel.CrntPlayingChannel.ExtraAttributes[i].Value;
                }
            }
            return "";
        }

        private Uri getChannelStreamUrlTimeShifted(int channelOrderNo, int timeShiftValue)
        {
            for (int i = 0; i < viewModel.GetChannelsRespRootObj.Channels[channelOrderNo].ExtraAttributes.Length; i++)
            {
                if (viewModel.GetChannelsRespRootObj.Channels[channelOrderNo].ExtraAttributes[i].Name.Equals("PC_SS"))
                {
                    return new Uri(viewModel.GetChannelsRespRootObj.Channels[channelOrderNo].ExtraAttributes[i].Value + "?time_shift=" + timeShiftValue, UriKind.Absolute);
                }
            }

            return null;
        }

        private Uri getChannelStreamUrl(int channelOrderNo)
        {
            for (int i = 0; i < viewModel.GetChannelsRespRootObj.Channels[channelOrderNo].ExtraAttributes.Length; i++)
            {
                if (viewModel.GetChannelsRespRootObj.Channels[channelOrderNo].ExtraAttributes[i].Name.Equals("PC_SS"))
                {
                    return new Uri(viewModel.GetChannelsRespRootObj.Channels[channelOrderNo].ExtraAttributes[i].Value, UriKind.Absolute);
                }
            }

            return null;
        }

        private void hideOverlayRoot()
        {
            if (!viewModel.IsMouseOverChannelsListBar
                && !viewModel.IsCenteralPopUpVisible
                && !viewModel.IsMouseOverVideoControlsBar
                && !viewModel.IsMouseOverEPGScrollBbar
                && viewModel.isOverlayHidingAllowed
                && !viewModel.isMouseOverStartoverBar
                && !viewModel.isMouseOverStartoverOverlayPlayLiveImg
                && !viewModel.isMouseOverStartoverOverlayPlayNextImg
                && StartoverBtnsOverlay.Visibility == System.Windows.Visibility.Collapsed)
            {
                OverlayRoot.Cursor = Cursors.None;
                overlayFadeInStoryBoard.Stop();
                overlayFadeOutStoryBoard.Begin();
            }
        }

        private void langChangeUIadjustments(object sender, EventArgs e)
        {
            List<System.Windows.Controls.Label> topMenuLabels = new List<System.Windows.Controls.Label>();

            topMenuLabels.Add(TopMenuLang);
            topMenuLabels.Add(TopMenuQuality);
            topMenuLabels.Add(TopMenuInfo);
            topMenuLabels.Add(TopMenuMyKplus);

            double leftMargin = 0;
            int i = 0;

            if (TopMenuLang.Visibility == System.Windows.Visibility.Collapsed)
            {
                i = 1;
            }

            for (; i < topMenuLabels.Count; i++)
            {
                var lb = topMenuLabels[i];
                lb.Margin = new Thickness(leftMargin, 0, 0, 0);
                leftMargin = leftMargin + lb.ActualWidth + 10;
            }

            if (viewModel.PlayerLang.Equals("eng"))
            {
                nextEPGNEXTlbl.FontSize = 14;
            }
            else
            {
                nextEPGNEXTlbl.FontSize = 12;
            }
        }

        private void LoadAndRenderChannelsList()
        {
            if (!isChannelsListRendered)
            {
                for (int i = 0; i < viewModel.GetChannelsRespRootObj.Channels.Length; i++)
                {
                    Grid grid = new Grid();
                    grid.Margin = new Thickness(115 * i, 0, 0, 0);
                    grid.HorizontalAlignment = System.Windows.HorizontalAlignment.Left;
                    grid.VerticalAlignment = System.Windows.VerticalAlignment.Center;
                    grid.Width = 90;
                    grid.Height = 70;
                    grid.Background = new SolidColorBrush(Color.FromArgb(255, 218, 218, 218));

                    System.Windows.Controls.Image channelLogo = new System.Windows.Controls.Image();
                    channelLogo.Name = "channelOrder" + i;

                    Uri uri = new Uri("https://kplus.vn", UriKind.Absolute);
                    if (viewModel != null && viewModel.GetChannelsRespRootObj != null)
                    {
                        if (viewModel.GetChannelsRespRootObj.Channels != null)
                        {
                            if (viewModel.GetChannelsRespRootObj.Channels[i] != null)
                            {
                                if (viewModel.GetChannelsRespRootObj.Channels[i].Images != null && viewModel.GetChannelsRespRootObj.Channels[i].Images.Length > 0)
                                {
                                    uri = new Uri(viewModel.GetChannelsRespRootObj.Channels[i].Images[0].Url, UriKind.Absolute);
                                }
                            }
                        }
                    }
                    BitmapImage image = new BitmapImage(uri);
                    image.ImageFailed += image_ImageFailed;
                    channelLogo.Source = image;
                    //channelLogo.Source = new BitmapImage(uri);
                    channelLogo.HorizontalAlignment = System.Windows.HorizontalAlignment.Center;
                    channelLogo.VerticalAlignment = System.Windows.VerticalAlignment.Center;
                    channelLogo.MaxWidth = 75;
                    channelLogo.Cursor = Cursors.Hand;
                    channelLogo.MouseLeftButtonDown += onChannelLogoClicked;

                    grid.Children.Add(channelLogo);
                    channelListCanvasGrid.Children.Add(grid);
                }

                isChannelsListRendered = true;
            }
        }

        private void image_ImageFailed(object sender, RoutedEventArgs e)
        {
            //var bitmapImage = (BitmapImage)sender;
            //var uri = new Uri("images/check_radio_button.png", UriKind.Relative);
            //bitmapImage.UriSource = uri;
        }

        private void loadAndRenderLanguageSelectionGrid()
        {
            if (viewModel.PlayerLang.Equals("") || viewModel.PlayerLang.Equals("eng"))
            {
                viewModel.PlayerLang = "eng";
                LangENGCheckBoxImage.Source = new BitmapImage(new Uri("images/check_radio_button.png", UriKind.Relative));
                LangENGCheckBoxImage.Width = 15;
                LangENGCheckBoxImage.Height = 15;
                LangVTCheckBoxImage.Source = new BitmapImage(new Uri("images/uncheck_radio_button.png", UriKind.Relative));
                LangVTCheckBoxImage.Width = 10;
                LangVTCheckBoxImage.Height = 10;
                LangDetailENGRowBorder.Background = new SolidColorBrush(Color.FromArgb(50, 180, 180, 180));
                LangDetailVTRowBorder.Background = new SolidColorBrush(Colors.Transparent);
            }
            else if (viewModel.PlayerLang.Equals("vie"))
            {
                viewModel.PlayerLang = "vie";
                LangVTCheckBoxImage.Source = new BitmapImage(new Uri("images/check_radio_button.png", UriKind.Relative));
                LangVTCheckBoxImage.Width = 15;
                LangVTCheckBoxImage.Height = 15;
                LangENGCheckBoxImage.Source = new BitmapImage(new Uri("images/uncheck_radio_button.png", UriKind.Relative));
                LangENGCheckBoxImage.Width = 10;
                LangENGCheckBoxImage.Height = 10;
                LangDetailVTRowBorder.Background = new SolidColorBrush(Color.FromArgb(50, 180, 180, 180));
                LangDetailENGRowBorder.Background = new SolidColorBrush(Colors.Transparent);
            }
        }

        private void loadAndRenderVideoControlsGrid()
        {
            var pBytes = Convert.FromBase64String(playBttnImgBase64);
            var pStream = new MemoryStream(pBytes);
            BitmapImage playBI = new BitmapImage();
            playBI.SetSource(pStream);
            playPauseBttn.Source = playBI;

            BitmapImage volumeBI = new BitmapImage(new Uri("images/volume_vol.png", UriKind.Relative));
            volumeBttn.Source = volumeBI;
        }

        private void loadChannelEPG()
        {
            viewModel.isGetChannelEpgCallInProcess = true;

            var dQoute = "\"";
            var channelId = viewModel.CrntPlayingChannel.ChannelId.ToString();
            var playerLang = viewModel.PlayerLang;
            var startoverLength = getCrntChnlStartOverLength();
            var joined = dQoute + channelId + dQoute + "," + dQoute + playerLang + dQoute + "," + dQoute + startoverLength + dQoute;
            HtmlPage.Window.Eval("_wgsbneq.APIcallerModule.getChannelEPG(" + joined + ")");
        }

        private void loadChannels()
        {
            //HtmlPage.Window.Eval("alert('eses')");
            HtmlPage.Window.Eval("_wgsbneq.APIcallerModule.getChannels()");
        }

        private void methodCalledAfterOneMintOfContinuesChannelPlayback(object sender, EventArgs e)
        {
            oneMintContinuesChannelPlaybackTimer.Stop();
            var chanelTitle = viewModel.GetChannelsRespRootObj.Channels[viewModel.CrntPlayingChannelIndex].Title;
            chanelTitle = chanelTitle.Replace('\'', ' ').Replace('\"', ' ');
            HtmlPage.Window.Eval("_wgsbneq.gAnalyticsModule.fireGoogleAnalyticsEvnt('Live Player','Play', '" + chanelTitle + "')");
            HtmlPage.Window.Eval("_wgsbneq.gAnalyticsModule.fireGoogleAnalyticsEvnt('Bandwidth','Playback', '" + viewModel.PlayerBitRate * 1000 + "')");
        }

        private void onChannelLstLeftBttnClick(object sender, MouseButtonEventArgs e)
        {
            if (channelsScrollAnim.To == null)
            {
                channelsScrollAnim.To = 0;
            }
            if (channelListCanvasGrid.ActualWidth > channelListWrapperGrid.ActualWidth)
            {
                channelsScrollAnim.From = channelsScrollAnim.To;
                channelsScrollAnim.To = channelsScrollAnim.To + 300;

                if (channelsScrollAnim.To <= 0)
                {
                    if (channelsScrollStoryBoard.GetCurrentState() != ClockState.Stopped)
                    {
                        channelsScrollStoryBoard.Stop();
                    }

                    channelsScrollStoryBoard.Begin();
                }
                else
                {
                    channelsScrollAnim.To = 0;
                    if (channelsScrollStoryBoard.GetCurrentState() != ClockState.Stopped)
                    {
                        channelsScrollStoryBoard.Stop();
                    }
                    channelsScrollStoryBoard.Begin();
                }
            }
        }

        private void onChannelLstRightBttnClick(object sender, MouseButtonEventArgs e)
        {
            if (channelsScrollAnim.To == null)
            {
                channelsScrollAnim.To = 0;
            }
            if (channelListCanvasGrid.ActualWidth > channelListWrapperGrid.ActualWidth)
            {
                channelsScrollAnim.From = channelsScrollAnim.To;
                channelsScrollAnim.To = channelsScrollAnim.To - 300;
                if (Math.Abs(channelsScrollAnim.To.Value) <= (channelListCanvasGrid.ActualWidth - channelListWrapperGrid.ActualWidth))
                {
                    if (channelsScrollStoryBoard.GetCurrentState() != ClockState.Stopped)
                    {
                        channelsScrollStoryBoard.Stop();
                    }
                    channelsScrollStoryBoard.Begin();
                }
                else
                {
                    channelsScrollAnim.To = -(channelListCanvasGrid.ActualWidth - channelListWrapperGrid.ActualWidth);
                    if (channelsScrollStoryBoard.GetCurrentState() != ClockState.Stopped)
                    {
                        channelsScrollStoryBoard.Stop();
                    }
                    channelsScrollStoryBoard.Begin();
                }
            }
        }

        private void onDRMlicenseAcquisitionCompleted(object sender, AcquireLicenseCompletedEventArgs e)
        {
            viewModel.isLicenseReqInProcess = false;
            if (!string.IsNullOrEmpty(((ManualLicenseAcquirer)SmoothPlayer.LicenseAcquirer).ErrorMessage))
            {
            }
            string errorMessage = ((ManualLicenseAcquirer)SmoothPlayer.LicenseAcquirer).ErrorMessage;
            if (errorMessage != null && errorMessage.Length > 0 && errorMessage != "undefined")
            {
                //HtmlPage.Window.Eval("_wgsbneq.APIcallerModule.dummyLog(" + str + ")");
                string errorMsg = (string)HtmlPage.Window.Eval("_wgsbneq.MultiLangSupportModule.getErrorMsg(1,_wgsbneq.config.userPrefLanguage)");
                string errorCode = "PLR-106";
                viewModel.plyrErrMsgIndex = 1;
                if (!viewModel.currentProgram.AdditionalInfo.OTTEnabled.Equals("false"))
                {
                    if (!String.IsNullOrEmpty(errorMsg))
                    {
                        displayPlyrErrorMsg(errorMsg, true, errorCode);
                        viewModel.isLicenseErrorDisplayed = true;
                    }
                }
            }
            try
            {
                //if (e.Error.Message.Contains("6002"))
                //{
                //    if (!isGeoBlkMsgDispForChnl)
                //    {
                //        oneScndDelayGeoBlkMsgTimer.Start();
                //        isGeoBlkMsgDispForChnl = true;
                //    }
                //}
            }
            catch (Exception)
            {
            }
            // var d = e.ResponseCustomData;
            //throw new NotImplementedException();
        }

        private void onEpgBarScrollLeftBtnClick(object sender, MouseButtonEventArgs e)
        {
            if (epgBarScrollContentAnim.To == null)
            {
                epgBarScrollContentAnim.To = 0;
            }

            if (epgBarScrollContentGrid.ActualWidth > epgBarScrollContentColumn.ActualWidth)
            {
                epgBarScrollContentStoryBoard.Stop();
                epgBarScrollContentAnim.To = epgBarScrollContentAnim.To + 200;

                if (epgBarScrollContentAnim.To.Value < 0)
                {
                    epgBarScrollContentAnim.From = epgBarScrollContentAnim.To - 200;
                    epgBarScrollContentStoryBoard.Begin();
                }
                else
                {
                    CompositeTransform cTranform = new CompositeTransform();
                    cTranform.TranslateX = 0;
                    epgBarContentCanvas.RenderTransform = cTranform;
                    epgBarScrollContentAnim.To = 0;
                }
            }
        }

        private void onEpgBarScrollRightBtnClick(object sender, MouseButtonEventArgs e)
        {
            if (epgBarScrollContentAnim.To == null)
            {
                epgBarScrollContentAnim.To = 0;
            }

            epgBarScrollContentStoryBoard.Stop();

            if (epgBarScrollContentGrid.ActualWidth > epgBarScrollContentColumn.ActualWidth)
            {
                epgBarScrollContentAnim.To = epgBarScrollContentAnim.To - 200;

                if (Math.Abs(epgBarScrollContentAnim.To.Value) <= (epgBarScrollContentGrid.ActualWidth - epgBarScrollContentColumn.ActualWidth))
                {
                    epgBarScrollContentStoryBoard.Stop();
                    epgBarScrollContentAnim.From = epgBarScrollContentAnim.To + 200;
                    epgBarScrollContentStoryBoard.Begin();
                }
                else
                {
                    CompositeTransform cTranform = new CompositeTransform();
                    cTranform.TranslateX = -(epgBarScrollContentGrid.ActualWidth - epgBarScrollContentColumn.ActualWidth);
                    epgBarContentCanvas.RenderTransform = cTranform;
                    epgBarScrollContentAnim.To = cTranform.TranslateX;
                }
            }
        }

        private void oneScndDelayTimer_Tick(object sender, EventArgs e)
        {
            chngPlayerVideoBufferDuration();
            chngPlayerBitRate();
            (sender as System.Windows.Threading.DispatcherTimer).Stop();
        }

        private void onFullScreenChanged(object sender, EventArgs e)
        {
            if (Application.Current.Host.Content.IsFullScreen)
            {
                topChannelBar.Visibility = Visibility.Collapsed;
                SmoothPlayer.Height = Application.Current.Host.Content.ActualHeight;
                SmoothPlayer.Margin = new Thickness(0, 0, 0, 0);
                OverlayRoot.Height = Application.Current.Host.Content.ActualHeight;
                OverlayRoot.Margin = new Thickness(0, 0, 0, 0);
                plyrErrorMsgGrid.Height = Application.Current.Host.Content.ActualHeight;
                plyrErrorMsgGrid.Margin = new Thickness(0, 0, 0, 0);
                BitmapImage playBI = new BitmapImage(new Uri("images/exit_fullscreen.png", UriKind.Relative));
                fullScrBttn.Source = playBI;
            }
            else
            {
                topChannelBar.Visibility = Visibility.Visible;
                SmoothPlayer.Height = 610;
                SmoothPlayer.Margin = new Thickness(0, 70, 0, 0);
                OverlayRoot.Height = 610;
                OverlayRoot.Margin = new Thickness(0, 70, 0, 0);
                plyrErrorMsgGrid.Height = 610;
                plyrErrorMsgGrid.Margin = new Thickness(0, 70, 0, 0);
                BitmapImage playBI = new BitmapImage(new Uri("images/fullscreen_player.png", UriKind.Relative));
                fullScrBttn.Source = playBI;
            }
        }

        private void onInfoDetailsBroadcastSchTabClick(object sender, MouseButtonEventArgs e)
        {
            HtmlPage.Window.Eval("_wgsbneq.gAnalyticsModule.fireGoogleAnalyticsEvnt('Info','Broadcast Schedule')");

            TopMenuInfoDetailInfo.Visibility = System.Windows.Visibility.Collapsed;
            TopMenuInfoBroadcastSch.Visibility = System.Windows.Visibility.Visible;
        }

        private void onInfoDetailsInfoTabClick(object sender, MouseButtonEventArgs e)
        {
            TopMenuInfoDetailInfo.Visibility = System.Windows.Visibility.Visible;
            TopMenuInfoBroadcastSch.Visibility = System.Windows.Visibility.Collapsed;
        }

        private void onLangDetailEngClick(object sender, MouseButtonEventArgs e)
        {
            changeAudioChannel("mul");
            onLangOriginalClick();
        }

        private void onLangDetailVTClick(object sender, MouseButtonEventArgs e)
        {
            changeAudioChannel("vie");
            onLangVieClicked();
        }

        private void onLangOriginalClick()
        {
            HtmlPage.Window.Eval("_wgsbneq.gAnalyticsModule.fireGoogleAnalyticsEvnt('Live Player','Language', 'eng')");
            HtmlPage.Window.Eval("_wgsbneq.gAnalyticsModule.fireGoogleAnalyticsEvnt('Language','Selection', 'eng')");

            LangENGCheckBoxImage.Source = new BitmapImage(new Uri("images/check_radio_button.png", UriKind.Relative));
            LangENGCheckBoxImage.Width = 15;
            LangVTCheckBoxImage.Source = new BitmapImage(new Uri("images/uncheck_radio_button.png", UriKind.Relative));
            LangVTCheckBoxImage.Width = 10;
            LangDetailENGRowBorder.Background = new SolidColorBrush(Color.FromArgb(50, 180, 180, 180));
            LangDetailVTRowBorder.Background = new SolidColorBrush(Colors.Transparent);
        }

        private void onLangVieClicked()
        {
            HtmlPage.Window.Eval("_wgsbneq.gAnalyticsModule.fireGoogleAnalyticsEvnt('Live Player','Language', 'vie')");
            HtmlPage.Window.Eval("_wgsbneq.gAnalyticsModule.fireGoogleAnalyticsEvnt('Language','Selection', 'vie')");

            LangVTCheckBoxImage.Source = new BitmapImage(new Uri("images/check_radio_button.png", UriKind.Relative));
            LangVTCheckBoxImage.Width = 15;
            LangENGCheckBoxImage.Source = new BitmapImage(new Uri("images/uncheck_radio_button.png", UriKind.Relative));
            LangENGCheckBoxImage.Width = 10;

            LangDetailVTRowBorder.Background = new SolidColorBrush(Color.FromArgb(50, 180, 180, 180));
            LangDetailENGRowBorder.Background = new SolidColorBrush(Colors.Transparent);
        }

        private void onLimitBitRateGreyRectClick(object sender, MouseButtonEventArgs e)
        {
            var p = e.GetPosition(limitBitRateWhiteCanv);

            if (p.X < 5)
            {
                p.X = 5;
            }

            calcNsetUserSelectedBitRate(p.X);
        }

        private void onLimitVideoBufferGreyRectClick(object sender, MouseButtonEventArgs e)
        {
            var p = e.GetPosition(limitVideoBufferCanv);
            calcNsetSelectedVideoBufferDuration(p.X);
        }

        private void onPlayPauseToggleBtnClick(object sender, MouseButtonEventArgs e)
        {
            if (viewModel.isPlyrErrMsgGrdVisible)
            {
                return;
            }

            if (SmoothPlayer.CurrentState == SmoothStreamingMediaElementState.Playing
                || SmoothPlayer.CurrentState == SmoothStreamingMediaElementState.Buffering)
            {
                HtmlPage.Window.Eval("_wgsbneq.gAnalyticsModule.fireGoogleAnalyticsEvnt('Live Player','Playback', 'Pause')");
                HtmlPage.Window.Eval("_wgsbneq.config.flags.isChnlPausedByUsr = true;");
                try
                {
                    SmoothPlayer.Pause();
                    var pBytes = Convert.FromBase64String(playBttnImgBase64);
                    var pStream = new MemoryStream(pBytes);
                    var pBI = new BitmapImage();
                    pBI.SetSource(pStream);
                    playPauseBttn.Source = pBI;
                    HtmlPage.Window.Eval("_wgsbneq.CSMheartBeatModule.sndCSMheartbeatPauseReq()");
                   
                    //HtmlPage.Window.Eval("_wgsbneq.Dispose()");
                    HtmlPage.Window.Eval("_wgsbneq.CSMheartBeatModule.Dispose()");
                }
                catch (Exception)
                {
                }
            }
            else if (SmoothPlayer.CurrentState == SmoothStreamingMediaElementState.Paused
                || SmoothPlayer.CurrentState == SmoothStreamingMediaElementState.Buffering)
            {
                if (viewModel.isInStartoverMode)
                {
                    var crntSysTime = DateTime.Now;

                    var playerStartTime = SmoothPlayer.StartPosition.TotalSeconds;
                    var playerEndTime = SmoothPlayer.EndPosition.TotalSeconds;
                    var playerCurrentTime = SmoothPlayer.Position.TotalSeconds;
                    var adjustedCurrentPosition = playerCurrentTime;

                    if (isEqualForDoubles(adjustedCurrentPosition, 0.0))
                    {
                        adjustedCurrentPosition = playerStartTime;
                    }

                    var videoElapsedTime = adjustedCurrentPosition - playerStartTime;
                    var videoStreamTotalDuration = (playerEndTime - playerStartTime);

                    if (adjustedCurrentPosition < 930000)
                    {
                        videoElapsedTime = adjustedCurrentPosition;
                    }

                    var str = getCrntChnlStartOverStartBuffer();
                    var tempDate = viewModel.startoverProgram.LinearStartDateTime.ToLocalTime().Subtract(TimeSpan.FromSeconds(Int64.Parse(str)));
                    var crntProgCrntPostionDateTime = tempDate.Add(TimeSpan.FromSeconds(videoElapsedTime));
                    var archiveEndDate = crntSysTime.Subtract(TimeSpan.FromSeconds(Int64.Parse(getCrntChnlArchiveLength())));

                    if (archiveEndDate > crntProgCrntPostionDateTime)
                    {
                        var errorMsg = (string)HtmlPage.Window.Eval("_wgsbneq.MultiLangSupportModule.getErrorMsg(13,_wgsbneq.config.userPrefLanguage)");

                        if (!viewModel.isPlyrErrMsgGrdVisible)
                        {
                            try
                            {
                                SmoothPlayer.Visibility = System.Windows.Visibility.Collapsed;
                                SmoothPlayer.Stop();
                            }
                            catch (Exception)
                            {
                            }
                            viewModel.plyrErrMsgIndex = 13;
                            displayPlyrErrorMsg(errorMsg, false, "APP-405");
                        }
                    }
                }
                else if (viewModel.isInTimeShiftMode)
                {
                    var crntSysTime = DateTime.Now;
                    var diffBtwProgStartNtimeShiftTime = (viewModel.timeShiftedToDate - viewModel.startoverProgram.LinearStartDateTime.ToLocalTime()).TotalSeconds;

                    var tempDate = viewModel.startoverProgram.LinearStartDateTime.ToLocalTime();
                    var crntProgCrntPostionDateTime = tempDate.Add(TimeSpan.FromSeconds(diffBtwProgStartNtimeShiftTime + viewModel.startoverProgram.TimeShiftElapsedTime));
                    var archiveEndDate = crntSysTime.Subtract(TimeSpan.FromSeconds(Int64.Parse(getCrntChnlArchiveLength())));

                    if (archiveEndDate > crntProgCrntPostionDateTime)
                    {
                        var errorMsg = (string)HtmlPage.Window.Eval("_wgsbneq.MultiLangSupportModule.getErrorMsg(13,_wgsbneq.config.userPrefLanguage)");

                        if (!viewModel.isPlyrErrMsgGrdVisible)
                        {
                            try
                            {
                                SmoothPlayer.Visibility = System.Windows.Visibility.Collapsed;
                                SmoothPlayer.Stop();
                            }
                            catch (Exception)
                            {
                            }
                            viewModel.plyrErrMsgIndex = 13;
                            displayPlyrErrorMsg(errorMsg, false, "APP-405");
                        }
                    }
                }

                HtmlPage.Window.Eval("_wgsbneq.gAnalyticsModule.fireGoogleAnalyticsEvnt('Live Player','Playback', 'Resume')");
                HtmlPage.Window.Eval("_wgsbneq.config.flags.isChnlPausedByUsr = false;");
                try
                {
                    SmoothPlayer.Play();
                    var pBytes = Convert.FromBase64String(pauseBttnImgBase64);
                    var pStream = new MemoryStream(pBytes);
                    var pBI = new BitmapImage();
                    pBI.SetSource(pStream);
                    playPauseBttn.Source = pBI;

                    
                    //HtmlPage.Window.Eval("_wgsbneq.onCSMPlay()");
                    HtmlPage.Window.Eval("_wgsbneq.CSMheartBeatModule.onCSMPlay()");
                    HtmlPage.Window.Eval("_wgsbneq.CSMheartBeatModule.sndCSMheartbeatPlayReq()");
                }
                catch (Exception)
                {
                }
            }

            
        }

        private void onSLappLoaded(object sender, RoutedEventArgs e)
        {
            kpScriptable = new KpSLappClass(this);
            HtmlPage.RegisterScriptableObject("kpSLapp", kpScriptable);

            string authTokenJsonString = (string)HtmlPage.Window.Eval("JSON.stringify(_wgsbneq.config.validateTokenResponse)");

            var userPrefBitrate = (double)HtmlPage.Window.Eval("_wgsbneq.config.userPrefBitrate");
            viewModel.UserSelectedBitRate = (long)userPrefBitrate;

            viewModel.ValidateTokenResponseRootObj = JsonConvert.DeserializeObject<ValidateTokenRespJSON.Rootobject>(authTokenJsonString);
            viewModel.maxRetriesAttempt = Int32.Parse(viewModel.ValidateTokenResponseRootObj.IrdetoSession.ConcurrentStreamInfo.MaxMissedHeartbeats);
            viewModel.HeartBeatInterval = Int32.Parse(viewModel.ValidateTokenResponseRootObj.IrdetoSession.ConcurrentStreamInfo.HeartbeatInterval);
            startScheduledTasks();

            Application.Current.Host.Content.FullScreenChanged += onFullScreenChanged;
        }

        private void onEpgBarCloseBtnClick(object sender, MouseButtonEventArgs e)
        {
            performOnEpgBarCloseBtnClicked();
        }

        private void performOnEpgBarCloseBtnClicked()
        {
            var transform = (CompositeTransform)epgBar.RenderTransform;
            if (transform.TranslateX == 0)
            {
                epgBarCloseEvntHndlr();
            }
        }

        private void onEpgBarNxtBtnClick(object sender, MouseButtonEventArgs e)
        {
            HtmlPage.Window.Eval("_wgsbneq.gAnalyticsModule.fireGoogleAnalyticsEvnt('Info','Broadcast Schedule')");

            var transform = (CompositeTransform)epgBar.RenderTransform;
            if (transform.TranslateX == 0)
            {
                epgBarCloseEvntHndlr();
                return;
            }

            startoverEPGbar.Visibility = System.Windows.Visibility.Collapsed;
            epgBarSlideLeftAnim.To = 0;
            epgBarSlideLeftStoryBoard.Begin();
        }

        private void onSlideLeftNextCloseBttnAdj(object sender, EventArgs e)
        {
            //slideLeftNextCloseEvntHndlr();
        }

        private void onSmoothPlayerError(object sender, ExceptionRoutedEventArgs e)
        {
            //tt1.Content = "inError";
            //tt2.Content = e.ErrorException.ToString();
            using (IsolatedStorageFile isoFile = IsolatedStorageFile.GetUserStoreForApplication())
            {
                using (IsolatedStorageFileStream isoStream =
                new IsolatedStorageFileStream("exceptionDetails.txt", FileMode.Create, isoFile))
                {
                    using (StreamWriter sw = new StreamWriter(isoStream))
                    {
                        sw.Write(e + Environment.NewLine + e.ErrorException.ToString());
                    }
                }
            }
            
            //HtmlPage.Window.Eval("_wgsbneq.Dispose()");
            if (HtmlPage.Window.Eval("_wgsbneq.CSMheartBeatModule.getCookie('C_Content_Id')") != "")
            {
                HtmlPage.Window.Eval("_wgsbneq.CSMheartBeatModule.Dispose()");
            }

            viewModel.isLicenseReqInProcess = false;
            string errorMessage = "";
            if (e.ErrorException.ToString().Contains(" 6001 "))
            {
                errorMessage = "The individualization component software failed to" +
                               " download to the user’s computer. This error would" +
                               " come up when Individualizing" +
                               " MediaElementState. One possible reason for this error is" +
                               " that the Silverlight client cannot connect the Microsoft" +
                               " Individualization Server.";
                System.Windows.Browser.HtmlPage.Window.Alert(errorMessage);
            }
            else if (e.ErrorException.ToString().Contains(" 6004 "))
            {
                errorMessage = " The installation of Silverlight on the client is" +
                               " out of date and needs to be updated.";
                System.Windows.Browser.HtmlPage.Window.Alert(errorMessage);
            }
            else if (e.ErrorException.ToString().Contains(" 3222 "))
            {
                //errorMessage = "Video Player crashed with error # 3222. This error often occurs when using internet behind a proxy server or on VPN. Low internet speed could also be a cause.";
                errorMessage = "Video Player crashed with error # 3222.";

                errorMessage = (string)HtmlPage.Window.Eval("_wgsbneq.MultiLangSupportModule.getErrorMsg(1,_wgsbneq.config.userPrefLanguage)");
                viewModel.plyrErrMsgIndex = 1;
                displayPlyrErrorMsg(errorMessage, false, "PLR-105");
            }
            else if (e.ErrorException.ToString().Contains("6024"))
            {
                errorMessage = (string)HtmlPage.Window.Eval("_wgsbneq.MultiLangSupportModule.getErrorMsg(8,_wgsbneq.config.userPrefLanguage)");
                viewModel.plyrErrMsgIndex = 1;
                displayPlyrErrorMsg(errorMessage, false, "CTL-608");
            }
            else
            {
                //errorMessage = "MediaFailed: " + e.ErrorException.Message + ".";
                //twoSecondsLicenseDel.Stop();
                //twoSecondsLicenseDel.Interval = TimeSpan.FromSeconds(1);
                //twoSecondsLicenseDel.Start();
                //return;
            }

            if (e.ErrorException.ToString().Contains("3050"))
            {
                errorMessage = (string)HtmlPage.Window.Eval("_wgsbneq.MultiLangSupportModule.getErrorMsg(1,_wgsbneq.config.userPrefLanguage)");
                viewModel.plyrErrMsgIndex = 1;
                displayPlyrErrorMsg(errorMessage, false, "PLR-105");
            }

            if (e.ErrorException.ToString().Contains("6002"))
            {
                //twoSecondsLicenseDel.Stop();
                //twoSecondsLicenseDel.Interval = TimeSpan.FromSeconds(1);
                //twoSecondsLicenseDel.Start();
            }
        }

        private void onLicense2scndDelayEnded(object sender, EventArgs e)
        {
            var str = ((ManualLicenseAcquirer)SmoothPlayer.LicenseAcquirer).ErrorMessage;
            if (String.IsNullOrEmpty(str))
            {
                var errorMessage = (string)HtmlPage.Window.Eval("_wgsbneq.MultiLangSupportModule.getErrorMsg(1,_wgsbneq.config.userPrefLanguage)");

                if (viewModel.isPlyrErrMsgGrdVisible)
                {
                    if (viewModel.plyrErrMsgIndex == 3)
                    {
                        viewModel.plyrErrMsgIndex = 1;
                        displayPlyrErrorMsg(errorMessage, true, "CHL-106");
                        return;
                    }
                }

                viewModel.plyrErrMsgIndex = 1;
                displayPlyrErrorMsg(errorMessage, false, "CHL-106");
            }
        }

        private void onTopBarMenuItemClick(object sender, MouseButtonEventArgs e)
        {
            if (viewModel.isUsrBlkdByFp || viewModel.isStartoverProgramEnded)
            {
                return;
            }

            var eventOrginMenuItem = (Label)sender;

            if (!eventOrginMenuItem.Name.Equals(TopMenuMyKplus.Name))
            {
                viewModel.IsCenteralPopUpVisible = true;
            }

            List<System.Windows.Controls.Label> topMenuLabels = new List<System.Windows.Controls.Label>();

            topMenuLabels.Add(TopMenuLang);
            topMenuLabels.Add(TopMenuQuality);
            topMenuLabels.Add(TopMenuInfo);
            topMenuLabels.Add(TopMenuMyKplus);

            foreach (var menuItem in topMenuLabels)  
            {
                var labelItem = (Label)menuItem;

                if (labelItem.Name.Equals(eventOrginMenuItem.Name))
                {
                    
                    if (labelItem.Name.Equals("TopMenuInfo"))
                    {
                        HtmlPage.Window.Eval("_wgsbneq.gAnalyticsModule.fireGoogleAnalyticsEvnt('Info','Open')");
                    }
                    else if (labelItem.Name.Equals("TopMenuQuality"))
                    {
                        HtmlPage.Window.Eval("_wgsbneq.gAnalyticsModule.fireGoogleAnalyticsEvnt('Quality','Open')");
                    }
                    else if (labelItem.Name.Equals("TopMenuLang"))
                    {
                        HtmlPage.Window.Eval("_wgsbneq.gAnalyticsModule.fireGoogleAnalyticsEvnt('Language','Open')");
                    }
                    else if (labelItem.Name.Equals("TopMenuMyKplus"))
                    {
                        HtmlPage.Window.Eval("_wgsbneq.gAnalyticsModule.fireGoogleAnalyticsEvnt('My K+','Open')");
                    }

                    if (!labelItem.Name.Equals("TopMenuMyKplus"))
                    {
                        labelItem.Foreground = new SolidColorBrush(Colors.White);
                        var detailsContainer = (Border)VideoContainer.FindName(labelItem.Name + "DetailBorder");
                        detailsContainer.Visibility = System.Windows.Visibility.Visible;
                    }
                    else
                    {
                        HtmlPage.Window.Eval("_wgsbneq.onMykPlusMenuItemClick()");
                    }
                }
                else
                {
                    labelItem.Foreground = new SolidColorBrush(Color.FromArgb(255, 137, 199, 62));
                    if (!labelItem.Name.Equals("TopMenuMyKplus"))
                    {
                        var detailsContainer = (Border)VideoContainer.FindName(labelItem.Name + "DetailBorder");
                        detailsContainer.Visibility = System.Windows.Visibility.Collapsed;
                    }
                }
            }

            if (eventOrginMenuItem.Name.Equals("TopMenuQuality"))
            {
                oneScndDelayUIupdateTimer.Stop();
                oneScndDelayUIupdateTimer.Start();
            }
        }

        private void onTopMenuDetailCloseBttnClick(object sender, MouseButtonEventArgs e)
        {
            performTopMenuDetailClose();
        }

        private void performTopMenuDetailClose()
        {
            viewModel.IsCenteralPopUpVisible = false;

            List<System.Windows.Controls.Label> topMenuLabels = new List<System.Windows.Controls.Label>();

            topMenuLabels.Add(TopMenuLang);
            topMenuLabels.Add(TopMenuQuality);
            topMenuLabels.Add(TopMenuInfo);
            topMenuLabels.Add(TopMenuMyKplus);

            foreach (var menuItem in topMenuLabels)  
            {
                var menuLabel = (Label)menuItem;

                menuLabel.Foreground = new SolidColorBrush(Color.FromArgb(255, 137, 199, 62));

                if (!menuLabel.Name.Equals("TopMenuMyKplus"))
                {
                    var detailsContainer = (Border)VideoContainer.FindName(menuLabel.Name + "DetailBorder");
                    detailsContainer.Visibility = System.Windows.Visibility.Collapsed;
                }
            }
        }

        private string getCrntChnlArchiveLength()
        {
            string ArchiveLength = "";
            viewModel.startoverParametersForCrntChnl.TryGetValue("ArchiveLength", out ArchiveLength);

            return ArchiveLength;
        }

        private string getCrntChnlStartOverLength()
        {
            string StartOverLength = "";
            if (viewModel.startoverParametersForCrntChnl.TryGetValue("StartOverLength", out StartOverLength))
            {
            }

            return StartOverLength;
        }

        private string getCrntChnlStartOverStartBuffer()
        {
            string StartOverStartBuffer = "";
            viewModel.startoverParametersForCrntChnl.TryGetValue("StartOverStartBuffer", out StartOverStartBuffer);

            if (StartOverStartBuffer.Equals(""))
            {
                StartOverStartBuffer = "0";
            }

            return StartOverStartBuffer;
        }

        private string getCrntChnlStartOverEndBuffer()
        {
            string StartOverEndBuffer = "";
            viewModel.startoverParametersForCrntChnl.TryGetValue("StartOverEndBuffer", out StartOverEndBuffer);

            if (StartOverEndBuffer.Equals(""))
            {
                StartOverEndBuffer = "0";
            }

            return StartOverEndBuffer;
        }

        private void onVideoContainerSizeChaned(object sender, SizeChangedEventArgs e)
        {
            preloadingImgStory.Begin();
            indivLoadingStry.Begin();

            if (!isGlobalPlayerConfigsLoaded)
            {
                loadChannels();
                loadAndRenderVideoControlsGrid();

                // SmoothPlayer.Height = Application.Current.Host.Content.ActualHeight - 70;
                SmoothPlayer.Margin = new Thickness(0, 70, 0, 0);

                syncProjBuildNoVisibility();

                viewModel.PlayerLang = (string)HtmlPage.Window.Eval("_wgsbneq.config.userPrefLanguage");
                loadAndRenderLanguageSelectionGrid();

                var stringArr = ((string)HtmlPage.Window.Eval("var temp = \"\" + _wgsbneq.config.availableBitRates; temp")).Split(',');
                var bitrates = new long[] { 110000, 300000, 500000, 750000, 900000, 1100000, 1500000 };
                //viewModel.SysAvailableBitRates = bitrates;
                isGlobalPlayerConfigsLoaded = true;

                calcNsetPlayerVolumn(videoControlVolumContainer.ActualHeight * viewModel.PlayerVolumn);
            }

            topBarChannelLogo.DataContext = viewModel;
            topBarCurrentProgramTitle.DataContext = viewModel;
            topBarCurrentProgramStartTime.DataContext = viewModel;
            topBarCurrentProgramEndTime.DataContext = viewModel;
            videoQualityLabel.DataContext = viewModel;
            limitBitRateLabel.DataContext = viewModel;
            videoQualityCrntFPSLabel.DataContext = viewModel;
            rebroadcastContProgTitle.DataContext = viewModel;

            if (!string.IsNullOrEmpty(getCrntChnlStartOverLength()))
            {
                //startoverEPGbar.Visibility = System.Windows.Visibility.Visible;
            }

            if (viewModel.isSizeJustChanged == true)
            {
                viewModel.isSizeJustChanged = false;

                if (viewModel.wasStartoverBarHiddenBeforeFullScrnToggle == true)
                {
                    viewModel.wasStartoverBarHiddenBeforeFullScrnToggle = false;
                    startoverEPGbar.Visibility = System.Windows.Visibility.Collapsed;
                }
            }

            if (epgBar.Visibility == System.Windows.Visibility.Visible && startoverEPGbar.Visibility == System.Windows.Visibility.Visible)
            {
                CompositeTransform cTranform = new CompositeTransform();
                cTranform.TranslateX = VideoContainer.ActualWidth - epgBarNextBtnGrid.ActualWidth;
                epgBar.RenderTransform = cTranform;

                CompositeTransform cTranform2 = new CompositeTransform();
                cTranform2.TranslateX = -(VideoContainer.ActualWidth - startoverBarStartoverBtnGrid.ActualWidth);
                startoverEPGbar.RenderTransform = cTranform2;
            }

            adjustChannelsListGrid();

            adjustEpgBarGrid();
            adjustStartoverEPGbar();

            changeTranslOfUIlabels();
            languageChangeAdjustmentsTimer.Start();
        }

        private void adjustStartoverEPGbar()
        {
            startoverScrollStoryBoard.Stop();
            CompositeTransform cTranform = new CompositeTransform();
            cTranform.TranslateX = 0;
            startoverBarScrollContentGrid.RenderTransform = cTranform;

            startoverScrollAnim.From = 0;

            startoverScrollColumn.Clip = new RectangleGeometry()
            {
                Rect = new Rect(0, 0, startoverScrollColumn.ActualWidth, startoverScrollColumn.ActualHeight)
            };
        }

        private void syncProjBuildNoVisibility()
        {
            var projBuildVrs = (string)HtmlPage.Window.Eval("_wgsbneq.config.buildVersion");
            projBuildVrsLbl.Content = "Build version " + projBuildVrs;
            var shdDisplayBuildNo = (string)HtmlPage.Window.Eval("_wgsbneq.config.flags.isBuildNoVisible");
            if (shdDisplayBuildNo.Equals("true"))
            {
                projBuildVrsLbl.Visibility = System.Windows.Visibility.Visible;
            }
            else
            {
                projBuildVrsLbl.Visibility = System.Windows.Visibility.Collapsed;
            }
        }

        private void onVolumeBarClick(object sender, MouseButtonEventArgs e)
        {
            viewModel.isVolumeBtnVisible = true;
            volumeBttn.Source = new BitmapImage(new Uri("images/volume_vol.png", UriKind.Relative));
            var p = e.GetPosition(videoControlVolumBarClickable);

            viewModel.PlayerVolumn = p.Y / videoControlVolumContainer.ActualHeight;
            calcNsetPlayerVolumn(p.Y);
        }

        private void onVolumeToggleBtnClick(object sender, MouseButtonEventArgs e)
        {
            if (viewModel.isVolumeBtnVisible)
            {
                viewModel.isVolumeBtnVisible = false;
                volumeBttn.Source = new BitmapImage(new Uri("images/volume_mute.png", UriKind.Relative));
                calcNsetPlayerVolumn(0);
            }
            else
            {
                viewModel.isVolumeBtnVisible = true;
                volumeBttn.Source = new BitmapImage(new Uri("images/volume_vol.png", UriKind.Relative));
                // viewModel.PlayerVolumn = 1.0;
                calcNsetPlayerVolumn(videoControlVolumContainer.ActualHeight * viewModel.PlayerVolumn);
            }
        }

        private void OverlayRoot_MouseEnter(object sender, MouseEventArgs e)
        {
            showOverlayRoot();
        }

        private void OverlayRoot_MouseLeave(object sender, MouseEventArgs e)
        {
            isProgressBarInnerWrapperMouseDown = false;
            hideOverlayRoot();
        }

        private void OverlayRoot_MouseMove(object sender, MouseEventArgs e)
        {
            viewModel.MouseCursorDormantCounter = 0;
            showOverlayRoot();
        }

        private void populateCrntProgInTopBar()
        {
            if (viewModel.startoverProgram != null && viewModel.isInStartoverMode)
            {
                try
                {
                    topBarCurrentProgramTitle.Content = viewModel.startoverProgram.Title;
                    topBarCurrentProgramStartTime.Content = viewModel.startoverProgram.ProgStartTimeNonUTCstr;
                    topBarCurrentProgramEndTime.Content = viewModel.startoverProgram.ProgEndTimeNonUTCstr;
                    var onNowTxt = (string)HtmlPage.Window.Eval("_wgsbneq.MultiLangSupportModule.getLabel(20,_wgsbneq.config.userPrefLanguage)");

                    onNowLbl.Content = "";
                    topBarRightContainer.Visibility = System.Windows.Visibility.Visible;
                }
                catch (Exception)
                {
                }
            }
            else if (viewModel.startoverProgram != null)
            {
                try
                {
                    topBarCurrentProgramTitle.Content = viewModel.startoverProgram.Title;
                    topBarCurrentProgramStartTime.Content = viewModel.startoverProgram.ProgStartTimeNonUTCstr;
                    topBarCurrentProgramEndTime.Content = viewModel.startoverProgram.ProgEndTimeNonUTCstr;
                    var onNowTxt = (string)HtmlPage.Window.Eval("_wgsbneq.MultiLangSupportModule.getLabel(20,_wgsbneq.config.userPrefLanguage)");

                    onNowLbl.Content = " . " + onNowTxt;
                    topBarRightContainer.Visibility = System.Windows.Visibility.Visible;
                }
                catch (Exception)
                {
                }
            }
            else
            {
                try
                {
                    topBarCurrentProgramTitle.Content = viewModel.currentProgram.Title;
                    topBarCurrentProgramStartTime.Content = viewModel.currentProgram.ProgStartTimeNonUTCstr;
                    topBarCurrentProgramEndTime.Content = viewModel.currentProgram.ProgEndTimeNonUTCstr;
                    var onNowTxt = (string)HtmlPage.Window.Eval("_wgsbneq.MultiLangSupportModule.getLabel(20,_wgsbneq.config.userPrefLanguage)");

                    onNowLbl.Content = " . " + onNowTxt;
                    topBarRightContainer.Visibility = System.Windows.Visibility.Visible;
                }
                catch (Exception)
                {
                }
            }
        }

        private void populateEPGinScrollGrid()
        {
            CompositeTransform cTranform = new CompositeTransform();
            cTranform.TranslateX = 0;
            epgBarContentCanvas.RenderTransform = cTranform;

            GetChannelProgramGuideJSON.Program[] filteredPrograms = null;

            try
            {
                filteredPrograms = filteroutCurrentNfuturePrograms(viewModel.GetChannelProgramGuideRootObj.channels[0].Programs);
            }
            catch (Exception)
            {
            }

            if (filteredPrograms != null && filteredPrograms.Length > 0)
            {
                bool isThisProgramCrnt = false;
                bool isThisProgramNextToCrnt = false;

                StackPanel sPanel = new StackPanel();
                sPanel.Orientation = Orientation.Horizontal;
                sPanel.HorizontalAlignment = System.Windows.HorizontalAlignment.Center;
                sPanel.VerticalAlignment = System.Windows.VerticalAlignment.Center;
                sPanel.Margin = new Thickness(0, 12, 0, 0);

                var crntSysTime = DateTime.Now;
                int i = 0;
                while (i < filteredPrograms.Length)
                {
                    var progStartTime = filteredPrograms[i].LinearStartDateTime.ToLocalTime();
                    var progEndTime = filteredPrograms[i].ProgEndTimeNonUTC;

                    if (crntSysTime >= progStartTime && crntSysTime < progEndTime)
                    {
                        isThisProgramCrnt = true;
                    }

                    Label EPGProgTitle = new Label();
                    Label EPGProgStartTimeInLocal = new Label();
                    Label EPGProgEndTimeInLocal = new Label();
                    Label EPGStaticDash = new Label();
                    Label EPGStaticText = new Label();

                    EPGStaticDash.Content = " - ";
                    var onNowTxt = (string)HtmlPage.Window.Eval("_wgsbneq.MultiLangSupportModule.getLabel(20,_wgsbneq.config.userPrefLanguage)");
                    EPGStaticText.Content = " . " + onNowTxt;

                    EPGProgTitle.DataContext = viewModel;
                    EPGProgStartTimeInLocal.DataContext = viewModel;
                    EPGProgEndTimeInLocal.DataContext = viewModel;

                    EPGStaticText.Foreground = new SolidColorBrush(Color.FromArgb(255, 140, 199, 57));
                    EPGStaticText.FontFamily = new FontFamily("/kplus_silverlight_player;component/fonts/OpenSans-BoldItalic.ttf#Open Sans");
                    EPGStaticText.FontSize = 11;
                    EPGProgEndTimeInLocal.FontFamily = new FontFamily("/kplus_silverlight_player;component/fonts/OpenSans-BoldItalic.ttf#Open Sans");
                    EPGProgEndTimeInLocal.FontSize = 11;

                    EPGProgTitle.FontSize = 13;

                    EPGProgTitle.FontFamily = new FontFamily("/kplus_silverlight_player;component/fonts/OpenSans-BoldItalic.ttf#Open Sans");
                    EPGProgTitle.HorizontalAlignment = System.Windows.HorizontalAlignment.Left;
                    EPGProgTitle.VerticalAlignment = System.Windows.VerticalAlignment.Center;

                    EPGProgStartTimeInLocal.FontStyle = FontStyles.Italic;

                    EPGProgStartTimeInLocal.FontSize = 11;
                    EPGProgStartTimeInLocal.FontFamily = new FontFamily("/kplus_silverlight_player;component/fonts/OpenSans-BoldItalic.ttf#Open Sans");
                    EPGProgStartTimeInLocal.HorizontalAlignment = System.Windows.HorizontalAlignment.Left;
                    EPGProgStartTimeInLocal.VerticalAlignment = System.Windows.VerticalAlignment.Center;

                    //Binding EPGProgTitleBinding = new Binding("GetChannelProgramGuideRootObj.channels[0].Programs[" + i + "].Title");
                    //Binding EPGProgStartTimeBinding = new Binding("GetChannelProgramGuideRootObj.channels[0].Programs[" + i + "].ProgStartTimeNonUTCstr");
                    //Binding EPGProgEndTimeBinding = new Binding("GetChannelProgramGuideRootObj.channels[0].Programs[" + i + "].ProgEndTimeNonUTCstr");

                    //EPGProgTitle.SetBinding(Label.ContentProperty, EPGProgTitleBinding);
                    //EPGProgStartTimeInLocal.SetBinding(Label.ContentProperty, EPGProgStartTimeBinding);
                    //EPGProgEndTimeInLocal.SetBinding(Label.ContentProperty, EPGProgEndTimeBinding);

                    EPGProgTitle.Content = filteredPrograms[i].Title; ;
                    EPGProgStartTimeInLocal.Content = filteredPrograms[i].ProgStartTimeNonUTCstr;
                    EPGProgEndTimeInLocal.Content = filteredPrograms[i].ProgEndTimeNonUTCstr;

                    StackPanel EPGInnerPanel = new StackPanel();
                    if (i != 0)
                        EPGInnerPanel.Margin = new Thickness(25, 0, 0, 0);

                    EPGInnerPanel.HorizontalAlignment = System.Windows.HorizontalAlignment.Left;
                    EPGInnerPanel.VerticalAlignment = System.Windows.VerticalAlignment.Center;

                    StackPanel EPGLowerPanel = new StackPanel();
                    EPGLowerPanel.Orientation = Orientation.Horizontal;
                    EPGLowerPanel.VerticalAlignment = System.Windows.VerticalAlignment.Center;
                    EPGLowerPanel.HorizontalAlignment = System.Windows.HorizontalAlignment.Left;

                    if (isThisProgramCrnt)
                    {
                        EPGProgTitle.Foreground = new SolidColorBrush(Color.FromArgb(255, 192, 192, 192));
                        EPGProgStartTimeInLocal.Foreground = new SolidColorBrush(Color.FromArgb(255, 140, 199, 57));
                        EPGStaticDash.Foreground = new SolidColorBrush(Color.FromArgb(255, 140, 199, 57));
                        EPGProgEndTimeInLocal.Foreground = new SolidColorBrush(Color.FromArgb(255, 140, 199, 57));

                        EPGInnerPanel.Children.Add(EPGProgTitle);
                        EPGLowerPanel.Children.Add(EPGProgStartTimeInLocal);
                        EPGLowerPanel.Children.Add(EPGStaticDash);
                        EPGLowerPanel.Children.Add(EPGProgEndTimeInLocal);
                        EPGLowerPanel.Children.Add(EPGStaticText);
                        EPGInnerPanel.Children.Add(EPGLowerPanel);

                        isThisProgramCrnt = false;
                        isThisProgramNextToCrnt = true;
                    }
                    else if (isThisProgramNextToCrnt)
                    {
                        EPGProgTitle.Foreground = new SolidColorBrush(Color.FromArgb(255, 192, 192, 192));
                        EPGProgStartTimeInLocal.Foreground = new SolidColorBrush(Color.FromArgb(255, 192, 192, 192));
                        EPGStaticDash.Foreground = new SolidColorBrush(Color.FromArgb(255, 192, 192, 192));
                        EPGProgEndTimeInLocal.Foreground = new SolidColorBrush(Color.FromArgb(255, 192, 192, 192));

                        EPGInnerPanel.Children.Add(EPGProgTitle);
                        EPGLowerPanel.Children.Add(EPGProgStartTimeInLocal);
                        EPGLowerPanel.Children.Add(EPGStaticDash);
                        EPGLowerPanel.Children.Add(EPGProgEndTimeInLocal);
                        EPGInnerPanel.Children.Add(EPGLowerPanel);

                        isThisProgramCrnt = false;
                        isThisProgramNextToCrnt = false;
                    }
                    else
                    {
                        EPGProgTitle.Foreground = new SolidColorBrush(Color.FromArgb(255, 100, 100, 100));
                        EPGProgStartTimeInLocal.Foreground = new SolidColorBrush(Color.FromArgb(255, 100, 100, 100));
                        EPGStaticDash.Foreground = new SolidColorBrush(Color.FromArgb(255, 100, 100, 100));
                        EPGProgEndTimeInLocal.Foreground = new SolidColorBrush(Color.FromArgb(255, 100, 100, 100));

                        EPGInnerPanel.Children.Add(EPGProgTitle);
                        EPGLowerPanel.Children.Add(EPGProgStartTimeInLocal);
                        EPGLowerPanel.Children.Add(EPGStaticDash);
                        EPGLowerPanel.Children.Add(EPGProgEndTimeInLocal);
                        EPGInnerPanel.Children.Add(EPGLowerPanel);
                    }

                    sPanel.Children.Add(EPGInnerPanel);

                    i++;
                }

                epgBarScrollContentGrid.Children.Clear();
                epgBarScrollContentGrid.Children.Add(sPanel);
                epgBarScrollContentGrid.Visibility = System.Windows.Visibility.Visible;
            }
            else
            {
                epgBarScrollContentGrid.Visibility = System.Windows.Visibility.Collapsed;
            }
        }

        private void populateProgInfoDetailsCntralPopup()
        {
            GetChannelProgramGuideJSON.Program program = null;
            GetContentResponseJSON.Rootobject programDetails = null;

            if (viewModel.startoverProgram != null && viewModel.startoverProgramDetails != null)
            {
                program = viewModel.startoverProgram;
                programDetails = viewModel.startoverProgramDetails;
            }
            else
            {
                program = viewModel.currentProgram;
                programDetails = viewModel.currentProgramDetails;
            }

            if (program != null)
            {
                if (programDetails != null && programDetails.Contents.Length > 0)
                {
                    titleValTxtBlk.Text = "";
                    subtitleValTxtBlk.Text = "";
                    genresValLabel.Text = "";
                    broadcastSchValLabel.Text = "";
                    infoDirectorLbl.Content = "";
                    directorValLabel.Content = "";
                    castValLabel.Text = "";
                    synopsysValueLabel.Text = "";
                    titleValTxtBlk.Text = programDetails.Contents[0].Title;
                    subtitleValTxtBlk.Text = programDetails.Contents[0].AdditionalInfo.SubTitle;
                    rebroadcastContProgTitle.Text = "";
                    brdcastSchedScrlVwrGrid.Children.Clear();

                    
                    if (programDetails.Contents[0].Persons.Director != null)
                    {
                        for (int i = 0; i < programDetails.Contents[0].Persons.Director.Length; i++)
                        {
                            directorValLabel.Content = directorValLabel.Content + programDetails.Contents[0].Persons.Director[i] + ", ";
                        }
                        infoDirectorLbl.Content = (string)HtmlPage.Window.Eval("_wgsbneq.MultiLangSupportModule.getLabel(13,_wgsbneq.config.userPrefLanguage)");
                    }

                    if (viewModel.PlayerLang.Equals("vie"))
                    {
                        
                        var r1 = new Run();
                        r1.FontWeight = FontWeights.Bold;
                        r1.Text = (string)HtmlPage.Window.Eval("_wgsbneq.MultiLangSupportModule.getLabel(15,_wgsbneq.config.userPrefLanguage)");
                        var descript = programDetails.Contents[0].Description;
                        if (!String.IsNullOrEmpty(descript))
                        {
                            synopsysValueLabel.Inlines.Add(r1);
                            synopsysValueLabel.Inlines.Add(descript);
                        }

                        
                        var genresStr = "";
                        for (int i = 0; i < programDetails.Contents[0].Genres.Length; i++)
                        {
                            genresStr = genresStr + programDetails.Contents[0].Genres[i] + ", ";
                        }
                        var r2 = new Run();
                        r2.FontWeight = FontWeights.Bold;
                        r2.Text = (string)HtmlPage.Window.Eval("_wgsbneq.MultiLangSupportModule.getLabel(17,_wgsbneq.config.userPrefLanguage)");
                        if (!String.IsNullOrEmpty(genresStr))
                        {
                            genresValLabel.Inlines.Add(r2);
                            genresValLabel.Inlines.Add(genresStr);
                        }

                        
                        var castStr = "";
                        if (programDetails.Contents[0].Persons.Actor != null)
                        {
                            for (int i = 0; i < programDetails.Contents[0].Persons.Actor.Length; i++)
                            {
                                castStr = castStr + programDetails.Contents[0].Persons.Actor[i] + ", ";
                            }
                        }
                        var r3 = new Run();
                        r3.FontWeight = FontWeights.Bold;
                        r3.Text = (string)HtmlPage.Window.Eval("_wgsbneq.MultiLangSupportModule.getLabel(14,_wgsbneq.config.userPrefLanguage)");
                        if (!String.IsNullOrEmpty(castStr))
                        {
                            castValLabel.Inlines.Add(r3);
                            castValLabel.Inlines.Add(castStr);
                        }

                        
                        var broadcastContntStr = viewModel.CrntPlayingChannel.Title;
                        broadcastContntStr = broadcastContntStr + " - ";
                        broadcastContntStr = broadcastContntStr + (string)HtmlPage.Window.Eval("_wgsbneq.MultiLangSupportModule.getWeekDayName('" + program.LinearStartDateTime.ToLocalTime().DayOfWeek.ToString() + "',_wgsbneq.config.userPrefLanguage)") + " ";
                        broadcastContntStr = broadcastContntStr + String.Format("{0:  d/M}", programDetails.Contents[0].LinearStartDateTime.Value.ToLocalTime());
                        broadcastContntStr = broadcastContntStr + " - ";
                        broadcastContntStr = broadcastContntStr + String.Format("{0:HH:mm}", program.LinearStartDateTime.ToLocalTime());
                        broadcastContntStr = broadcastContntStr + " - " + int.Parse(program.DurationSeconds) / 60 + "phút";
                        var r4 = new Run();
                        r4.FontWeight = FontWeights.Bold;
                        r4.Text = (string)HtmlPage.Window.Eval("_wgsbneq.MultiLangSupportModule.getLabel(12,_wgsbneq.config.userPrefLanguage)");
                        broadcastSchValLabel.Inlines.Add(r4);
                        broadcastSchValLabel.Inlines.Add(broadcastContntStr);
                    }
                    else
                    {
                        
                        var r1 = new Run();
                        r1.FontWeight = FontWeights.Bold;
                        r1.Text = (string)HtmlPage.Window.Eval("_wgsbneq.MultiLangSupportModule.getLabel(15,_wgsbneq.config.userPrefLanguage)");
                        var descript = programDetails.Contents[0].Description;
                        if (!String.IsNullOrEmpty(descript))
                        {
                            synopsysValueLabel.Inlines.Add(r1);
                            synopsysValueLabel.Inlines.Add(descript);
                        }

                        
                        var genresStr = "";
                        for (int i = 0; i < programDetails.Contents[0].Genres.Length; i++)
                        {
                            genresStr = genresStr + programDetails.Contents[0].Genres[i] + ", ";
                        }
                        var r2 = new Run();
                        r2.FontWeight = FontWeights.Bold;
                        r2.Text = (string)HtmlPage.Window.Eval("_wgsbneq.MultiLangSupportModule.getLabel(17,_wgsbneq.config.userPrefLanguage)");
                        genresValLabel.Inlines.Add(r2);
                        genresValLabel.Inlines.Add(genresStr);

                        
                        var castStr = "";
                        if (programDetails.Contents[0].Persons.Actor != null)
                        {
                            for (int i = 0; i < programDetails.Contents[0].Persons.Actor.Length; i++)
                            {
                                castStr = castStr + programDetails.Contents[0].Persons.Actor[i] + ", ";
                            }
                        }
                        var r3 = new Run();
                        r3.FontWeight = FontWeights.Bold;
                        r3.Text = (string)HtmlPage.Window.Eval("_wgsbneq.MultiLangSupportModule.getLabel(14,_wgsbneq.config.userPrefLanguage)");
                        if (!String.IsNullOrEmpty(castStr))
                        {
                            castValLabel.Inlines.Add(r3);
                            castValLabel.Inlines.Add(castStr);
                        }

                        
                        var broadcastContntStr = viewModel.CrntPlayingChannel.Title;
                        broadcastContntStr = broadcastContntStr + " - ";
                        broadcastContntStr = broadcastContntStr + (string)HtmlPage.Window.Eval("_wgsbneq.MultiLangSupportModule.getWeekDayName('" + program.LinearStartDateTime.ToLocalTime().DayOfWeek.ToString() + "',_wgsbneq.config.userPrefLanguage)") + " ";
                        broadcastContntStr = broadcastContntStr + String.Format("{0:  d/M}", programDetails.Contents[0].LinearStartDateTime.Value.ToLocalTime());
                        broadcastContntStr = broadcastContntStr + " - ";
                        broadcastContntStr = broadcastContntStr + String.Format("{0:HH:mm}", program.LinearStartDateTime.ToLocalTime());
                        broadcastContntStr = broadcastContntStr + " - " + int.Parse(program.DurationSeconds) / 60 + "mins";
                        var r4 = new Run();
                        r4.FontWeight = FontWeights.Bold;
                        r4.Text = (string)HtmlPage.Window.Eval("_wgsbneq.MultiLangSupportModule.getLabel(12,_wgsbneq.config.userPrefLanguage)");
                        broadcastSchValLabel.Inlines.Add(r4);
                        broadcastSchValLabel.Inlines.Add(broadcastContntStr);
                    }

                    
                    rebroadcastContProgTitle.Text = programDetails.Contents[0].Title;
                    var crntSysTime = DateTime.Now;
                    int topMargin = 0;
                    for (int i = 0; i < programDetails.Contents[0].AdditionalInfo.Rebroadcast.Length; i++)
                    {
                        var progDateTime = programDetails.Contents[0].AdditionalInfo.Rebroadcast[i].StartTime.ToLocalTime();

                        if (progDateTime > crntSysTime)
                        {
                            Grid gd = new Grid();
                            gd.HorizontalAlignment = System.Windows.HorizontalAlignment.Left;
                            gd.VerticalAlignment = System.Windows.VerticalAlignment.Top;
                            gd.Margin = new Thickness(0, topMargin, 0, 0);

                            Image img = new Image();
                            img.HorizontalAlignment = System.Windows.HorizontalAlignment.Left;
                            img.VerticalAlignment = System.Windows.VerticalAlignment.Center;
                            img.MaxHeight = 45;
                            if (viewModel != null && viewModel.GetChannelsRespRootObj != null)
                            {
                                if (viewModel.GetChannelsRespRootObj.Channels.Length > 0)
                                {
                                    if (viewModel.GetChannelsRespRootObj.Channels[viewModel.CrntPlayingChannelIndex] != null)
                                    {
                                        if (viewModel.GetChannelsRespRootObj.Channels[viewModel.CrntPlayingChannelIndex].Images != null && viewModel.GetChannelsRespRootObj.Channels[viewModel.CrntPlayingChannelIndex].Images.Length > 0)
                                        {
                                            img.Source = new BitmapImage(new Uri(viewModel.GetChannelsRespRootObj.Channels[viewModel.CrntPlayingChannelIndex].Images[0].Url, UriKind.Absolute));
                                        }
                                    }
                                }
                            }

                            TextBlock txtBlk = new TextBlock();
                            txtBlk.FontFamily = new FontFamily("/kplus_silverlight_player;component/fonts/OpenSans-Regular.ttf#Open Sans");
                            txtBlk.FontSize = 14;
                            txtBlk.Foreground = new SolidColorBrush(Colors.White);
                            txtBlk.HorizontalAlignment = System.Windows.HorizontalAlignment.Left;
                            txtBlk.VerticalAlignment = System.Windows.VerticalAlignment.Center;
                            txtBlk.Margin = new Thickness(85, 0, 0, 0);
                            txtBlk.Text = (string)HtmlPage.Window.Eval("_wgsbneq.MultiLangSupportModule.getWeekDayName('" + progDateTime.DayOfWeek.ToString() + "',_wgsbneq.config.userPrefLanguage)") + " - ";
                            txtBlk.Text = txtBlk.Text + (string)HtmlPage.Window.Eval("_wgsbneq.MultiLangSupportModule.getMonthName(" + (progDateTime.Month - 1) + ",_wgsbneq.config.userPrefLanguage)") + " ";
                            txtBlk.Text = txtBlk.Text + String.Format("{0:  d - HH:mm}", progDateTime);
                            topMargin = topMargin + 58;

                            gd.Children.Add(img);
                            gd.Children.Add(txtBlk);
                            brdcastSchedScrlVwrGrid.Children.Add(gd);
                        }
                    }

                    return;
                }
            }

            titleValTxtBlk.Text = "";
            subtitleValTxtBlk.Text = "";
            genresValLabel.Text = "";
            broadcastSchValLabel.Text = "";
            directorValLabel.Content = "";
            castValLabel.Text = "";
            synopsysValueLabel.Text = "";
            rebroadcastContProgTitle.Text = "";
            brdcastSchedScrlVwrGrid.Children.Clear();
        }

        private void setPlayerBitRate(long selectedBitRate)
        {
            if (selectedBitRate < 110000)
            {
                selectedBitRate = 110000;
            }

            HtmlPage.Window.Eval("_wgsbneq.gAnalyticsModule.fireGoogleAnalyticsEvnt('Quality','Bit Rate Selection', '" + selectedBitRate + "')");
            HtmlPage.Window.Eval("_wgsbneq.gAnalyticsModule.fireGoogleAnalyticsEvnt('Bandwidth','Bit Rate Change', '" + selectedBitRate + "')");

            if (SmoothPlayer.ManifestInfo != null)
            {
                foreach (SegmentInfo segment in SmoothPlayer.ManifestInfo.Segments)
                {
                    IList<StreamInfo> streamInfoList = segment.AvailableStreams;

                    foreach (StreamInfo stream in streamInfoList)
                    {
                        if (stream.Type == MediaStreamType.Video)
                        {
                            List<TrackInfo> tracks = new List<TrackInfo>();
                            ulong chosenBitrate = (ulong)selectedBitRate;
                            tracks = stream.AvailableTracks.ToList<TrackInfo>();
                            IList<TrackInfo> allowedTracks = tracks.Where((ti) => ti.Bitrate <= chosenBitrate).ToList();

                            if (allowedTracks.Count > 0)
                            {
                                stream.SelectTracks(allowedTracks, false);
                            }
                        }

                        if (stream.Type == MediaStreamType.Audio)
                        {
                            List<TrackInfo> tracks = new List<TrackInfo>();
                            tracks = stream.AvailableTracks.ToList<TrackInfo>();
                        }
                    }
                }
            }
        }

        private void mainTimerMethod(object sender, EventArgs e)
        {
            //fingerPrintGrid.Visibility = System.Windows.Visibility.Visible;
            //fp1Lbl.Content = 2005000040123234;
            //fp1Lbl.Visibility = System.Windows.Visibility.Visible;
            //fp2Lbl.Content = 2005000040123234;
            //fp2Lbl.Visibility = System.Windows.Visibility.Visible;
            //fp3Lbl.Content = 2005000040123234;
            //fp3Lbl.Visibility = System.Windows.Visibility.Visible;

            //fp4Lbl.Content = 2005000040123234;
            //fp4Lbl.Visibility = System.Windows.Visibility.Visible;
            //fp5Lbl.Content = 2005000040123234;
            //fp5Lbl.Visibility = System.Windows.Visibility.Visible;
            //fp6Lbl.Content = 2005000040123234;
            //fp6Lbl.Visibility = System.Windows.Visibility.Visible;

            //fp7Lbl.Content = 2005000040123234;
            //fp7Lbl.Visibility = System.Windows.Visibility.Visible;
            //fp8Lbl.Content = 2005000040123234;
            //fp8Lbl.Visibility = System.Windows.Visibility.Visible;
            //fp9Lbl.Content = 2005000040123234;
            //fp9Lbl.Visibility = System.Windows.Visibility.Visible;

            syncCrntProg();
            syncCrntProgramDetails();
            syncVideoProgressBar();

            syncStartoverProgramDetails();
            syncStartoverProgramEndedToBeSeeked();//
            syncStartoverArchiveLength();

            syncStartoverTimeShiftedProgram();

            syncOTTenabledForCurrentProgram();
            syncOTTenabledForStartoverProgram();//

            syncStartoverProgramEnd();

            chkNallowChnlPly();

            syncBitRateChart();
            syncVideoFPS();
            syncVolumeCntrlVisibility();
            syncTokenExpiry();
            syncPlayerIndividualizationMsg();

            
            syncCSMerrorDisplay();

            syncLicenseErrorDisplay();

            //syncStreamOTTEnabledstate();

            syncPlyrErrorShdPlay();

            syncChnlAllowedToPlay();

            //syncStartoverProgramEnd();

            //syncInterentDisconnection();

            adjustVideoControlsStartoverBtn();

            //tt1.Content = "Video Current Time: " + (SmoothPlayer.Position.TotalSeconds - SmoothPlayer.StartPosition.TotalSeconds);
            //tt2.Content = "Video Duration: " + (SmoothPlayer.EndPosition.TotalSeconds - SmoothPlayer.StartPosition.TotalSeconds);
            //tt3.Content = SmoothPlayer.StartPosition.TotalSeconds + "--" + SmoothPlayer.Position.TotalSeconds + "--" + SmoothPlayer.EndPosition.TotalSeconds;
            ////tt3.Content = SmoothPlayer.CurrentState.ToString();
            //tt4.Content = viewModel.ValidateTokenResponseRootObj.BBSData.UserData.Email;

            //tt5.Content = "timeShiftValue= " + viewModel.timeShiftValue;

            //if (viewModel.startoverProgram != null)
            //{
            //    tt6.Content = "timeshiftProgStartTime= " + viewModel.startoverProgram.TimeShiftPlayerStartTime;
            //    tt7.Content = "timeshiftProgElapsedTime= " + viewModel.startoverProgram.TimeShiftElapsedTime;
            //}

            //tt8.Content = "inStartoverMode= " + viewModel.isInStartoverMode + " inTimesiftMode= " + viewModel.isInTimeShiftMode;

            if (SmoothPlayer.CurrentState == SmoothStreamingMediaElementState.Buffering && !viewModel.isPlyrErrMsgGrdVisible)
            {
                playerBufferingGrid.Visibility = System.Windows.Visibility.Visible;
            }
            else
            {
                playerBufferingGrid.Visibility = System.Windows.Visibility.Collapsed;
            }

            viewModel.MouseCursorDormantCounter++;
            if (viewModel.MouseCursorDormantCounter >= 3)
            {
                hideOverlayRoot();
            }

            adjustVideoCntrlBttnImgs();
        }

        private void syncInterentDisconnection(string code)
        {
            Boolean isOnline = (Boolean)HtmlPage.Window.Eval("navigator.onLine;");

            try
            {
                if (!isOnline)
                {
                    var errorMsg = (string)HtmlPage.Window.Eval("_wgsbneq.MultiLangSupportModule.getErrorMsg(10,_wgsbneq.config.userPrefLanguage)");
                    viewModel.plyrErrMsgIndex = 10;
                    displayPlyrErrorMsg(errorMsg, false, code);

                    //if (SmoothPlayer.CurrentState != SmoothStreamingMediaElementState.Stopped)
                    //{
                    //    if (SmoothPlayer.CurrentState == SmoothStreamingMediaElementState.Playing ||
                    //        SmoothPlayer.CurrentState == SmoothStreamingMediaElementState.Paused)
                    //        SmoothPlayer.Dispose();
                    //}
                }
            }
            catch (Exception)
            {
            }
        }

        private void syncStartoverProgramDetails()
        {
            if (viewModel.startoverProgram != null)
            {
                if (viewModel.startoverProgramDetails != null)
                {
                    if (viewModel.startoverProgramDetails.Contents.Length > 0)
                    {
                        //if (!isStartoverProgramDetailsSynced)
                        //{
                        var dQoute = "\"";
                        var contentid = viewModel.startoverProgram.ContentId;
                        var language = viewModel.PlayerLang;
                        var size = "full";
                        var methodParams = dQoute + contentid + dQoute + "," + dQoute + language + dQoute + "," + dQoute + size + dQoute;
                        HtmlPage.Window.Eval("_wgsbneq.APIcallerModule.getContentDetailsForStartoverProgram(" + methodParams + ")");
                        //isStartoverProgramDetailsSynced = true;
                        //}
                    }
                }
                else
                {
                    var dQoute = "\"";
                    var contentid = viewModel.startoverProgram.ContentId;
                    var language = viewModel.PlayerLang;
                    var size = "full";
                    var methodParams = dQoute + contentid + dQoute + "," + dQoute + language + dQoute + "," + dQoute + size + dQoute;
                    //if (viewModel.currentProgram.ContentId != viewModel.startoverProgram.ContentId && !isStartoverProgramDetailsSynced)
                    if (viewModel.currentProgram.ContentId != viewModel.startoverProgram.ContentId)
                    {
                        HtmlPage.Window.Eval("_wgsbneq.APIcallerModule.getContentDetailsForStartoverProgram(" + methodParams + ")");
                    }
                    //isStartoverProgramDetailsSynced = true;
                }
            }
            else
            {
                //populateProgInfoDetailsCntralPopup();
            }
        }

        private void showGeoBlkMsg(object sender, EventArgs e)
        {
            oneScndDelayGeoBlkMsgTimer.Stop();
            HtmlPage.Window.Eval("_wgsbneq.showGeoBlockMsg()");
        }

        private void showOverlayRoot()
        {
            OverlayRoot.Cursor = Cursors.Arrow;
            overlayFadeOutStoryBoard.Stop();
            overlayFadeInStoryBoard.Begin();
        }

        private void slideLeftEPGGrid_MouseEnter(object sender, MouseEventArgs e)
        {
            viewModel.IsMouseOverEPGScrollBbar = true;
        }

        private void slideLeftEPGGrid_MouseLeave(object sender, MouseEventArgs e)
        {
            viewModel.IsMouseOverEPGScrollBbar = false;
        }

        private void epgBarCloseEvntHndlr()
        {
            epgBarSlideLeftStoryBoard.Completed -= onSlideLeftNextCloseBttnAdj;
            epgBarSlideRightAnim.To = VideoContainer.ActualWidth - epgBarNextBtnGrid.ActualWidth;

            if (!string.IsNullOrEmpty(getCrntChnlStartOverLength()))
            {
                startoverEPGbar.Visibility = System.Windows.Visibility.Visible;
            }

            epgBarSlideRightStoryBoard.Begin();
        }

        private void smoothStreamPlayBackTrackerEventHandler(object sender, TrackChangedEventArgs e)
        {
            if (!viewModel.isChnlBitrateChartLoaded)
            {
                bitRateChartInnerCotainer.Visibility = System.Windows.Visibility.Visible;
                //viewModel.isChnlBitrateChartLoaded = true;
                var newBitrates = new List<long>();
                foreach (var track in e.NewTrack.Stream.AvailableTracks)
                {
                    newBitrates.Add((long)track.Bitrate);
                }
                viewModel.SysAvailableBitRates = newBitrates.ToArray();

                populBRchrtLabels();

                populBRchrtRows();

                populNadjstLimtBRbar();

                viewModel.isChnlBitrateChartLoaded = true;
            }

            if (viewModel.isVolumeBtnVisible)
            {
                chngPlayerVolume();
            }
            syncAudioChnlUIdata();
            setPlayerBitRate(viewModel.UserSelectedBitRate);
            viewModel.PlayerBitRate = ((int)e.NewTrack.Bitrate) / 1000;

            if (viewModel.PlayerLang.Equals("eng"))
            {
                videoQualityLabel.Content = "Current Bandwidth " + viewModel.PlayerBitRate + " kbps";
            }
            else
            {
                videoQualityLabel.Content = "Băng thông hiện tại " + viewModel.PlayerBitRate + " kbps";
            }
        }

        private void populNadjstLimtBRbar()
        {
            limitBitRateWhiteRect.Width = 0;
            var totalWidth = limitBitRateWhiteCanv.Width;
            var part = Math.Floor(totalWidth / viewModel.SysAvailableBitRates.Length);
            for (int i = 0; i < viewModel.SysAvailableBitRates.Length; i++)
            {
                if (viewModel.SysAvailableBitRates[i] >= viewModel.UserSelectedBitRate)
                {
                    viewModel.UserSelectedBitRate = viewModel.SysAvailableBitRates[i];
                    var progBarWidth = (i + 1) * part;
                    calcNsetUserSelectedBitRate(progBarWidth);
                    return;
                }
            }

            var bitratesArrLength = viewModel.SysAvailableBitRates.Length;
            viewModel.UserSelectedBitRate = viewModel.SysAvailableBitRates[bitratesArrLength - 1];
            calcNsetUserSelectedBitRate((bitratesArrLength) * part);
        }

        private void populBRchrtRows()
        {
            if (viewModel.SysAvailableBitRates.Length > 0)
            {
                int calculatedMargin = 0;
                var chartRows = bitRateChartBars.Children.Reverse().ToList();

                for (int j = 0; j < chartRows.Count; j++)
                {
                    var gridRow = (Grid)chartRows[j];

                    gridRow.Margin = new Thickness(0, 0, 0, calculatedMargin);

                    
                    if (j % 2 == 0)
                    {
                        calculatedMargin = calculatedMargin + 6;
                    }
                    else
                    {
                        calculatedMargin = calculatedMargin + 13;
                    }

                    if (j > viewModel.SysAvailableBitRates.Length * 2 - 2)
                    {
                        gridRow.Visibility = System.Windows.Visibility.Collapsed;
                    }
                    else
                    {
                        gridRow.Visibility = System.Windows.Visibility.Visible;
                    }
                }

                bitRateChartInnerCotainer.Height = viewModel.SysAvailableBitRates.Length * 19;
                qualityScrnBttmCanvas.Margin = new Thickness(0, viewModel.SysAvailableBitRates.Length * 19 + (19 * 3), 0, 0);
            }
        }

        private void populBRchrtLabels()
        {
            Label lb;
            List<Label> labels = new List<Label>();
            for (int i = 0; i < viewModel.SysAvailableBitRates.Length; i++)
            {
                lb = new Label();
                lb.Name = "bitrateLabel" + i;
                lb.Content = viewModel.SysAvailableBitRates[i] / 1000 + " K";
                lb.Foreground = new SolidColorBrush(Colors.White);
                lb.FontSize = 13;
                lb.HorizontalAlignment = System.Windows.HorizontalAlignment.Left;
                lb.VerticalAlignment = System.Windows.VerticalAlignment.Bottom;
                lb.HorizontalContentAlignment = System.Windows.HorizontalAlignment.Left;
                labels.Add(lb);
            }

            //labels.Reverse();
            for (int j = 0; j < labels.Count; j++)
            {
                labels[j].Margin = new Thickness(0, 0, 0, j * 19);
                bitrateChartLblsContGrd.Children.Add(labels[j]);
            }
        }

        private void startScheduledTasks()
        {
            mainTimer.Start();
            syncStartoverBarTimer.Start();
            csmRescheduleTimer.Interval = TimeSpan.FromSeconds(viewModel.HeartBeatInterval);
            csmRescheduleTimer.Tick += new EventHandler(rescheduleCSM);
        }

        private void syncAudioChnlUIdata()
        {
            if (SmoothPlayer.ManifestInfo != null)
            {
                foreach (var segment in SmoothPlayer.ManifestInfo.Segments)
                {
                    var newStreams = new List<StreamInfo>();
                    var availableAudioStreams = segment.AvailableStreams.Where(i => i.Type == MediaStreamType.Audio).ToList();
                    var selectedAudioStream = segment.SelectedStreams.Where(i => i.Type == MediaStreamType.Audio).ToList();

                    if (availableAudioStreams.Count > 1)
                    {
                        TopMenuLang.Visibility = System.Windows.Visibility.Visible;
                    }
                    else
                    {
                        TopMenuLang.Visibility = System.Windows.Visibility.Collapsed;
                    }

                    if (availableAudioStreams.Count > 1)
                    {
                        if (!String.IsNullOrEmpty(viewModel.usrPrefAudioLang))
                        {
                            if (viewModel.usrPrefAudioLang.Equals("vie"))
                            {
                                onLangVieClicked();
                                changeAudioChannel("vie");
                            }
                            else
                            {
                                onLangOriginalClick();
                                changeAudioChannel("mul");
                            }

                            return;
                        }
                    }

                    if (selectedAudioStream.Count > 0 && selectedAudioStream[0].Attributes["Language"] != null)
                    {
                        if (selectedAudioStream[0].Attributes["Language"].Equals("mul"))
                        {
                            onLangOriginalClick();
                        }
                        else
                        {
                            onLangVieClicked();
                        }
                    }
                    else
                    {
                        onLangOriginalClick();
                    }
                }
            }
        }

        private void syncBitRateChart()
        {
            if (bitRateChartBars.Children.Count != 0)
            {
                for (int i = 0; i < viewModel.SysAvailableBitRates.Length; i++)
                {
                    if (viewModel.PlayerBitRate * 1000 <= viewModel.SysAvailableBitRates[i])
                    {
                        viewModel.BitRateChartVerticlePos = i * 2;
                        break;
                    }
                }

                if (viewModel.BitRateCartHorizontalPos == 9)
                {
                    clearChart();
                    viewModel.BitRateCartHorizontalPos = 0;
                    viewModel.BitRateChartPrevVerticlePos = -1;
                }

                calcNrenderChartHorizMarks();
                calcNrenderChartVerticleMarks();

                viewModel.BitRateCartHorizontalPos++;
                viewModel.BitRateChartPrevVerticlePos = viewModel.BitRateChartVerticlePos;
            }
            else
            {
                viewModel.BitRateCartHorizontalPos = 0;
                viewModel.BitRateChartPrevVerticlePos = -1;
            }
        }

        private void syncChnlAllowedToPlay()
        {
            if (viewModel.isChnlAllowedToPlay)
            {
                if (!viewModel.isPlyrErrMsgGrdVisible)
                {
                    SmoothPlayer.Visibility = System.Windows.Visibility.Visible;
                    if (SmoothPlayer.CurrentState == SmoothStreamingMediaElementState.Opening)
                    {
                        return;
                    }

                    if (SmoothPlayer.CurrentState == SmoothStreamingMediaElementState.Stopped
                        || SmoothPlayer.CurrentState == SmoothStreamingMediaElementState.Closed
                        || SmoothPlayer.CurrentState == SmoothStreamingMediaElementState.Paused)
                    {
                        Boolean isChnlPausedByUsr = (Boolean)HtmlPage.Window.Eval("_wgsbneq.config.flags.isChnlPausedByUsr;");
                        if (isChnlPausedByUsr)
                        {
                        }
                        else
                        {
                            try
                            {
                                SmoothPlayer.Play();
                            }
                            catch (Exception)
                            {
                            }
                        }

                        //if (!viewModel.isChnlPlyedFrstTime)
                        //{
                        //    viewModel.isChnlPlyedFrstTime = true;
                        //    SmoothPlayer.Play();
                        //}
                    }
                }
            }
        }

        private void syncCrntProg()
        {
            if (viewModel.currentProgram != null)
            {
                var crntSysTime = DateTime.Now;
                var progStartTime = viewModel.currentProgram.LinearStartDateTime.ToLocalTime();
                var progEndTime = viewModel.currentProgram.ProgEndTimeNonUTC;

                if (crntSysTime >= progEndTime)
                {
                    if (findNsetCrntPlayingProgram())
                    {
                        if (viewModel.startoverProgram != null)
                        {
                            //chkNallowChnlPly();

                            //if (viewModel.currentProgram.AdditionalInfo.OTTEnabled.Equals("true"))
                            //{
                            //}
                            //else
                            //{
                            //    var errorMsg = (string)HtmlPage.Window.Eval("_wgsbneq.MultiLangSupportModule.getErrorMsg(4,_wgsbneq.config.userPrefLanguage)");
                            //    viewModel.plyrErrMsgIndex = 4;
                            //    displayPlyrErrorMsg(errorMsg, false);
                            //}
                        }

                        //isCurrentProgramDetailsSynced = false;

                        populateEPGinScrollGrid();
                        populateStartoverEPGbar();
                        populateCrntProgInTopBar();
                    }
                    else
                    {
                        syncNoCrntProgState();
                        //chkNallowChnlPly();
                    }

                    //isCurrentProgramDetailsSynced = false;
                }
            }
            else
            {
                if (findNsetCrntPlayingProgram())
                {
                    if (!getCrntChnlStartOverLength().Equals("") && !viewModel.isInStartoverMode)
                    {
                        if (isPlayerLoadedWithStream())
                        {
                            attachTimeShiftToNakedStream();
                        }
                    }
                }
            }
        }

        private void syncCrntProgramDetails()
        {
            if (viewModel.currentProgram != null)
            {
                if (viewModel.currentProgramDetails != null)
                {
                    if (viewModel.currentProgramDetails.Contents.Length > 0)
                    {
                        //if (!isCurrentProgramDetailsSynced)
                        //{
                        var dQoute = "\"";
                        var contentid = viewModel.currentProgram.ContentId;
                        var language = viewModel.PlayerLang;
                        var size = "full";
                        var methodParams = dQoute + contentid + dQoute + "," + dQoute + language + dQoute + "," + dQoute + size + dQoute;
                        HtmlPage.Window.Eval("_wgsbneq.APIcallerModule.getContentDetailsForCurrentProgram(" + methodParams + ")");
                        //isCurrentProgramDetailsSynced = true;
                        //}
                    }
                }
                else
                {
                    var dQoute = "\"";
                    var contentid = viewModel.currentProgram.ContentId;
                    var language = viewModel.PlayerLang;
                    var size = "full";
                    var methodParams = dQoute + contentid + dQoute + "," + dQoute + language + dQoute + "," + dQoute + size + dQoute;
                    //if (viewModel.currentProgramDetails == null && !isCurrentProgramDetailsSynced)
                    if (viewModel.currentProgramDetails == null)
                    {
                        HtmlPage.Window.Eval("_wgsbneq.APIcallerModule.getContentDetailsForCurrentProgram(" + methodParams + ")");
                    }
                    //isCurrentProgramDetailsSynced = true;
                }
            }
            else
            {
                populateProgInfoDetailsCntralPopup();
            }
        }

        private void syncCSMerrorDisplay()
        {
            //return;

            try
            {
                if (viewModel.isCSMheartbeatNOKforCrntChnl)
                {
                    HtmlPage.Window.Eval("clearTimeout(_wgsbneq.CSMheartBeatModule.CSMheartbeatReqTimeoutId)");
                    if (SmoothPlayer.CurrentState != SmoothStreamingMediaElementState.Stopped)
                    {
                        //if (SmoothPlayer.CurrentState == SmoothStreamingMediaElementState.Playing ||
                        //    SmoothPlayer.CurrentState == SmoothStreamingMediaElementState.Paused)
                        //    SmoothPlayer.Dispose();

                        var errorMsg = (string)HtmlPage.Window.Eval("_wgsbneq.MultiLangSupportModule.getErrorMsg(3,_wgsbneq.config.userPrefLanguage)");
                        viewModel.plyrErrMsgIndex = 3;
                        displayPlyrErrorMsg(errorMsg, false, "CSM-1003");
                    }
                }
            }
            catch (Exception)
            {
            }
        }
        internal void forceCSMError()
        {
            HtmlPage.Window.Eval("clearTimeout(_wgsbneq.CSMheartBeatModule.CSMheartbeatReqTimeoutId)");
            //if (SmoothPlayer.CurrentState != SmoothStreamingMediaElementState.Stopped)
            //{
            preloadingFlashScrnGrid.Visibility = System.Windows.Visibility.Collapsed;
            //if (SmoothPlayer.CurrentState == SmoothStreamingMediaElementState.Playing ||
            //    SmoothPlayer.CurrentState == SmoothStreamingMediaElementState.Paused)
            //    SmoothPlayer.Dispose();
            //SmoothPlayer.Stop();
            var errorMsg = (string)HtmlPage.Window.Eval("_wgsbneq.MultiLangSupportModule.getErrorMsg(3,_wgsbneq.config.userPrefLanguage)");
            viewModel.plyrErrMsgIndex = 3;
            displayPlyrErrorMsg(errorMsg, false, "CSM-1004");
            if (csmRescheduleTimer.IsEnabled)
            {
                csmRescheduleTimer.Stop();
            }
            return;
            //    return;
            //}

        }
        private void syncLicenseErrorDisplay()
        {
            var str = "";

            try
            {
                str = ((ManualLicenseAcquirer)SmoothPlayer.LicenseAcquirer).ErrorMessage;
            }
            catch (Exception)
            {
                SmoothPlayer.LicenseAcquirer = new ManualLicenseAcquirer(SmoothPlayer.Name);
                SmoothPlayer.LicenseAcquirer.AcquireLicenseCompleted += onDRMlicenseAcquisitionCompleted;
            }

            var errorMsg = "";
            var errorCode = "";
            if (!string.IsNullOrEmpty(str))
            {
                if (!viewModel.isLicenseErrorDisplayed)
                {
                    if (str.Contains("590") || str.Contains("601") || str.Contains("608"))
                    {
                        //tt3.Content = "syncLicenseErrorDisplay: " + str;
                        errorMsg = (string)HtmlPage.Window.Eval("_wgsbneq.MultiLangSupportModule.getErrorMsg(8,_wgsbneq.config.userPrefLanguage)");
                        errorCode = "CTL-608";
                        viewModel.plyrErrMsgIndex = 8;
                    }

                    if (str.Contains("100"))
                    {
                        errorMsg = (string)HtmlPage.Window.Eval("_wgsbneq.MultiLangSupportModule.getErrorMsg(5,_wgsbneq.config.userPrefLanguage)");
                        errorCode = "CTL-108";
                        viewModel.plyrErrMsgIndex = 5;
                    }

                    if (str.Contains("500"))
                    {
                        errorMsg = (string)HtmlPage.Window.Eval("_wgsbneq.MultiLangSupportModule.getErrorMsg(1,_wgsbneq.config.userPrefLanguage)");
                        errorCode = "CTL-106";
                        viewModel.plyrErrMsgIndex = 1;
                    }

                    if (str.Contains("140") || str.Contains("150"))
                    {
                        errorMsg = (string)HtmlPage.Window.Eval("_wgsbneq.MultiLangSupportModule.getErrorMsg(1,_wgsbneq.config.userPrefLanguage)");
                        errorCode = "CTL-201";
                        viewModel.plyrErrMsgIndex = 1;
                    }

                    try
                    {
                        if (!viewModel.currentProgram.AdditionalInfo.OTTEnabled.Equals("false"))
                        {
                            if (!String.IsNullOrEmpty(errorMsg))
                            {
                                displayPlyrErrorMsg(errorMsg, true, errorCode);
                                viewModel.isLicenseErrorDisplayed = true;
                            }
                        }
                    }
                    catch (Exception)
                    {
                        if (!String.IsNullOrEmpty(errorMsg))
                        {
                            displayPlyrErrorMsg(errorMsg, true, errorCode);
                            viewModel.isLicenseErrorDisplayed = true;
                        }
                    }
                }
            }
        }

        private void syncNoCrntProgState()
        {
            viewModel.CrntPlayingProgramIndex = -1;
            viewModel.currentProgram = null;
            topBarRightContainer.Visibility = System.Windows.Visibility.Collapsed;
            epgBarScrollContentGrid.Children.Clear();
            startoverBarScrollContentGrid.Children.Clear();
        }

        private void syncPlayerIndividualizationMsg()
        {
            if (SmoothPlayer.CurrentState == SmoothStreamingMediaElementState.Individualizing)
            {
                if (viewModel.PlayerLang.Equals("eng"))
                {
                    //indivMsg.Text = "Loading......";
                }
                else
                {
                    //indivMsg.Text = "Đang tải.....";
                }
                playerIndividualizationGrid.Visibility = System.Windows.Visibility.Visible;
            }
            else
            {
                playerIndividualizationGrid.Visibility = System.Windows.Visibility.Collapsed;
            }
        }

        private void syncPlyrErrorShdPlay()
        {
            if (viewModel.isPlyrErrMsgGrdVisible)
            {
                if (SmoothPlayer.CurrentState == SmoothStreamingMediaElementState.Playing)
                {
                    try
                    {
                        SmoothPlayer.Pause();
                    }
                    catch (Exception)
                    {
                    }
                }
            }
        }

        private void syncTokenExpiry()
        {
            try
            {
                var crntSysTime = DateTime.Now;
                var expiryTimeUTC = convertFromUnixTimestamp(double.Parse(viewModel.ValidateTokenResponseRootObj.BBSData.ExpirationDate));
                var expiryTime = expiryTimeUTC.ToLocalTime();

                if (expiryTime <= crntSysTime && !viewModel.isAuthTokenExpired)
                {
                    viewModel.isAuthTokenExpired = true;
                    try
                    {
                        SmoothPlayer.Visibility = System.Windows.Visibility.Collapsed;
                        SmoothPlayer.Stop();
                    }
                    catch (Exception)
                    {
                    }
                    undoMouseNOverlayDisappearnce();
                    HtmlPage.Window.Eval("_wgsbneq.onAuthTokenExpired();");
                }
            }
            catch (Exception)
            {
            }
        }

        private void syncVideoFPS()
        {
            viewModel.PlayerFPS = SmoothPlayer.RenderedFramesPerSecond;
        }

        private void syncVideoProgressBar()
        {
            //DateTime current = DateTime.Now;
            //Double timeDifference = (current - currentTimeToCheckSync).TotalSeconds;
            //if (Math.Abs(timeDifference) > 60*5)
            //{
            //    if (!isTimeDifferenceValid)
            //    {
            //        this.onDeviceTimeInCorrectError();
            //        HtmlPage.Window.Eval("alert('-----' + _wgsbneq.MultiLangSupportModule.getErrorMsg(2, _wgsbneq.config.userPrefLanguage));window.location = _wgsbneq.config.kplusOTThomePageUrl;");
            //        isTimeDifferenceValid = true;
            //    }
            //    return;
            //}
            //else
            //{
            //    currentTimeToCheckSync = DateTime.Now;
            //}

            if (viewModel.isProgressBarHalted || isProgressBarInnerWrapperMouseDown)
            {
                return;
            }

            try
            {
                //performStartoverProgramSelected(viewModel.startoverProgram, null, true);
                if (viewModel.isInStartoverMode)
                {
                    updateProgressBarForStartoverProg();
                }
                else if (viewModel.isInTimeShiftMode)
                {
                    updateProgressBarForTimeShiftedProg();
                }
                else
                {
                    updateProgressBarForCrntProg();
                }
            }
            catch (Exception)
            {
                return;
            }
        }

        private void syncStartoverTimeShiftedProgram()
        {
            if (viewModel.isInTimeShiftMode)
            {
                var playerStartTime = SmoothPlayer.StartPosition.TotalSeconds;
                var playerEndTime = SmoothPlayer.EndPosition.TotalSeconds;
                var playerCurrentTime = SmoothPlayer.Position.TotalSeconds;

                if (!isEqualForDoubles(playerCurrentTime, 0.0))
                {
                    var programLength = (viewModel.startoverProgram.ProgEndTimeNonUTC - viewModel.startoverProgram.LinearStartDateTime.ToLocalTime()).TotalSeconds;

                    var adjustedCurrentPosition = playerCurrentTime;

                    if (viewModel.startoverProgram.TimeShiftPlayerStartTime == -1)
                    {
                        viewModel.startoverProgram.TimeShiftPlayerStartTime = (long)adjustedCurrentPosition;
                    }

                    viewModel.startoverProgram.TimeShiftElapsedTime = (long)(adjustedCurrentPosition - viewModel.startoverProgram.TimeShiftPlayerStartTime);

                    if (viewModel.startoverProgram.TimeShiftElapsedTime > programLength)
                    {
                        viewModel.startoverProgram.TimeShiftElapsedTime = (long)programLength;
                    }
                }
            }
        }

        private void updateProgressBarForTimeShiftedProg()
        {
            if (viewModel.isInTimeShiftMode && viewModel.startoverProgram != null)
            {
                var crntSysTime = DateTime.Now;

                DateTime refDateTime = new DateTime(1970, 1, 1, 0, 0, 0, 0);

                var programLength = (viewModel.startoverProgram.ProgEndTimeNonUTC - viewModel.startoverProgram.LinearStartDateTime.ToLocalTime()).TotalSeconds;

                
                var progStartTimeMilli = (viewModel.startoverProgram.LinearStartDateTime.ToLocalTime() - refDateTime).TotalMilliseconds;
                var progEndTimeMilli = (viewModel.startoverProgram.ProgEndTimeNonUTC - refDateTime).TotalMilliseconds;
                var crntSysTimeMilli = (crntSysTime - refDateTime).TotalMilliseconds;

                var playerStartTime = SmoothPlayer.StartPosition.TotalSeconds;
                var playerEndTime = SmoothPlayer.EndPosition.TotalSeconds;
                var playerCurrentTime = SmoothPlayer.Position.TotalSeconds;

                if (!isEqualForDoubles(playerEndTime, 0.0))
                {
                    if (viewModel.isPlyrErrMsgGrdVisible)
                    {
                        //tt0.Content = "updateProgressBarForTimeShiftedProg() ln:3793 Setting start time: " + viewModel.startoverProgram.LinearStartDateTime.ToLocalTime().ToString("HH:mm");
                        progressBarProgStarTime.Content = viewModel.startoverProgram.LinearStartDateTime.ToLocalTime().ToString("HH:mm");
                        progressBarProgEndTime.Content = viewModel.startoverProgram.ProgEndTimeNonUTC.ToString("HH:mm");

                        //progressBarLeft.Cursor = Cursors.Arrow;
                        progressBarLeft.Width = 0;
                        progressBarMiddle.Visibility = System.Windows.Visibility.Collapsed;
                        progressBarRight.Visibility = System.Windows.Visibility.Visible;
                        progressBarRight.Width = progressBarInnerWrapper.ActualWidth - 0;
                        progressBarRight.Margin = new Thickness(0, 0, 0, 0);
                        progressBarThumbImg.Margin = new Thickness(0 - 6, 0, 0, 0);
                        progressBarLeftSecondary.Visibility = System.Windows.Visibility.Collapsed;
                        progressBarMiddleSecondary.Visibility = System.Windows.Visibility.Collapsed;

                        return;
                    }

                    if (progressBarInnerWrapperClickedXPosition != -1)
                    {
                        if (progressBarInnerWrapperClickedXPosition > progressBarLeft.ActualWidth && progressBarInnerWrapperClickedXPosition < (progressBarLeft.ActualWidth + progressBarMiddle.ActualWidth))
                        {
                            performOnVideoMiddleProgressBarClick(progressBarInnerWrapperClickedXPosition - progressBarLeft.ActualWidth);
                            progressBarInnerWrapperClickedXPosition = -1;
                            return;
                        }
                        else if (progressBarInnerWrapperClickedXPosition < progressBarLeft.ActualWidth && progressBarInnerWrapperClickedXPosition >= 0)
                        {
                            performOnVideoLeftProgressBarClick(progressBarInnerWrapperClickedXPosition);
                            progressBarInnerWrapperClickedXPosition = -1;
                            return;
                        }
                    }

                    var endDate = crntSysTime;

                    if (crntSysTime > viewModel.startoverProgram.ProgEndTimeNonUTC)
                    {
                        endDate = viewModel.startoverProgram.ProgEndTimeNonUTC;
                    }

                    var diffBtwProgStartNCrntTime = (endDate - viewModel.startoverProgram.LinearStartDateTime.ToLocalTime()).TotalSeconds;
                    var diffBtwProgStartNtimeShiftTime = (viewModel.timeShiftedToDate - viewModel.startoverProgram.LinearStartDateTime.ToLocalTime()).TotalSeconds;

                    var ratioOfLeftPlusMiddleBar = diffBtwProgStartNCrntTime / programLength;

                    var timeshiftElapsedTemp = viewModel.startoverProgram.TimeShiftElapsedTime;
                    if (timeshiftElapsedTemp == -1)
                    {
                        timeshiftElapsedTemp = 0;
                    }

                    var progTotalElapsedTime = diffBtwProgStartNtimeShiftTime + timeshiftElapsedTemp;
                    var temp2 = progTotalElapsedTime / diffBtwProgStartNCrntTime;

                    if (temp2 < 0)
                    {
                        temp2 = 0;
                    }
                    if (temp2 > 1)
                    {
                        temp2 = 1;
                    }

                    var ratioOfLeftBar = temp2 * ratioOfLeftPlusMiddleBar;
                    var ratioOfMiddleBar = ratioOfLeftPlusMiddleBar - ratioOfLeftBar;
                    var ratioOfRightBar = 1 - ratioOfLeftPlusMiddleBar;

                    var tempDate = viewModel.startoverProgram.LinearStartDateTime.ToLocalTime();
                    var crntProgCrntPostionDateTime = tempDate.Add(TimeSpan.FromSeconds(diffBtwProgStartNtimeShiftTime + viewModel.startoverProgram.TimeShiftElapsedTime));
                    var archiveEndDate = crntSysTime.Subtract(TimeSpan.FromSeconds(Int64.Parse(getCrntChnlArchiveLength())));

                    if (archiveEndDate > crntProgCrntPostionDateTime)
                    {
                        var errorMsg = (string)HtmlPage.Window.Eval("_wgsbneq.MultiLangSupportModule.getErrorMsg(13,_wgsbneq.config.userPrefLanguage)");

                        if (!viewModel.isPlyrErrMsgGrdVisible)
                        {
                            if (archiveEndDate < viewModel.startoverProgram.ProgEndTimeNonUTC)
                            {
                                var diffBtwarchiveBoundaryNstartTime = (archiveEndDate - viewModel.startoverProgram.LinearStartDateTime.ToLocalTime()).TotalSeconds;

                                var newTimeShiftValue = (int)((crntSysTime - archiveEndDate).TotalSeconds - 100);

                                if (SmoothPlayer.CurrentState == SmoothStreamingMediaElementState.Playing)
                                {
                                    if (newTimeShiftValue > (programLength - 20))
                                    {
                                        try
                                        {
                                            SmoothPlayer.Visibility = System.Windows.Visibility.Collapsed;
                                            SmoothPlayer.Stop();
                                        }
                                        catch (Exception)
                                        {
                                        }
                                        viewModel.plyrErrMsgIndex = 13;
                                        displayPlyrErrorMsg(errorMsg, false, "APP-406");
                                    }
                                    else
                                    {
                                        viewModel.startoverProgram.TimeShiftElapsedTime = -1;
                                        viewModel.startoverProgram.TimeShiftPlayerStartTime = -1;

                                        //var diffInScnds = (int)(crntSysTime - viewModel.currentProgram.LinearStartDateTime.ToLocalTime()).TotalSeconds;

                                        var newCrntSysTime = DateTime.Now;
                                        viewModel.timeShiftValue = newTimeShiftValue;
                                        viewModel.timeShiftedToDate = newCrntSysTime.Subtract(TimeSpan.FromSeconds(viewModel.timeShiftValue));

                                        plyrNotificationTxtBlk.Text = errorMsg + " " + "[APP-406]";
                                        plyrNotificationGrid.Visibility = System.Windows.Visibility.Visible;
                                    }
                                }
                            }
                            else
                            {
                                try
                                {
                                    if (SmoothPlayer.CurrentState == SmoothStreamingMediaElementState.Playing)
                                    {
                                        SmoothPlayer.Stop();
                                        SmoothPlayer.Visibility = System.Windows.Visibility.Collapsed;

                                        viewModel.plyrErrMsgIndex = 13;
                                        displayPlyrErrorMsg(errorMsg, false, "APP-406");
                                    }
                                }
                                catch (Exception)
                                {
                                }
                            }

                            return;
                        }
                    }

                    if (progTotalElapsedTime > programLength)
                    {
                        if (viewModel.currentProgram == null)
                        {
                            viewModel.isInTimeShiftMode = false;
                            viewModel.startoverProgram = null;
                        }
                        else
                        {
                            attachTimeShiftToNakedStream();
                        }

                        //performStartoverProgramSelected(viewModel.currentProgram, null);
                        populateStartoverEPGbar();
                    }

                    var leftBarWidth = Math.Floor(progressBarInnerWrapper.ActualWidth * ratioOfLeftBar);
                    var middleBarWidth = Math.Floor(progressBarInnerWrapper.ActualWidth * ratioOfMiddleBar);
                    var rightBarWidth = progressBarInnerWrapper.ActualWidth - (leftBarWidth + middleBarWidth);
                    progressBarLeftSecondary.Visibility = System.Windows.Visibility.Collapsed;
                    progressBarMiddleSecondary.Visibility = System.Windows.Visibility.Collapsed;

                    //progressBarLeft.Cursor = Cursors.Hand;
                    progressBarLeft.Width = leftBarWidth;

                    progressBarMiddle.Visibility = System.Windows.Visibility.Visible;
                    if (isEqualForDoubles(leftBarWidth, 0.0))
                    {
                        progressBarMiddle.CornerRadius = new CornerRadius(8, 0, 0, 8);
                    }
                    else
                    {
                        progressBarMiddle.CornerRadius = new CornerRadius(0, 0, 0, 0);
                    }
                    progressBarMiddle.Width = middleBarWidth;
                    progressBarMiddle.Margin = new Thickness(leftBarWidth, 0, 0, 0);

                    progressBarRight.Visibility = System.Windows.Visibility.Visible;
                    progressBarRight.Width = progressBarInnerWrapper.ActualWidth - (leftBarWidth + middleBarWidth);
                    progressBarRight.Margin = new Thickness(leftBarWidth + middleBarWidth, 0, 0, 0);

                    if (leftBarWidth > progressBarInnerWrapper.ActualWidth - 20)
                    {
                        leftBarWidth = progressBarInnerWrapper.ActualWidth - 20;
                    }

                    progressBarThumbImg.Margin = new Thickness(leftBarWidth - 5, 0, 0, 0);
                    progressBarThumbImg.Cursor = Cursors.Hand;

                    //tt11.Content = "updateProgressBarForTimeShiftedProg() ln:3977 Setting start time: " + viewModel.startoverProgram.LinearStartDateTime.ToLocalTime().ToString("HH:mm");
                    progressBarProgStarTime.Content = viewModel.startoverProgram.LinearStartDateTime.ToLocalTime().ToString("HH:mm");
                    progressBarProgEndTime.Content = viewModel.startoverProgram.ProgEndTimeNonUTC.ToString("HH:mm");
                }
                else
                {
                    progressBarProgStarTime.Content = "00:00";
                    progressBarProgEndTime.Content = "00:00";

                    //progressBarLeft.Cursor = Cursors.Arrow;
                    progressBarLeft.Width = 0;
                    progressBarMiddle.Visibility = System.Windows.Visibility.Collapsed;
                    progressBarRight.Visibility = System.Windows.Visibility.Visible;
                    progressBarLeftSecondary.Visibility = System.Windows.Visibility.Collapsed;
                    progressBarMiddleSecondary.Visibility = System.Windows.Visibility.Collapsed;

                    progressBarRight.Width = progressBarInnerWrapper.ActualWidth - 0;
                    progressBarRight.Margin = new Thickness(0, 0, 0, 0);
                    progressBarThumbImg.Margin = new Thickness(0 - 6, 0, 0, 0);
                }

                //if (progressBarPercent > 0.97)
                //{
                //    progressBarPercent = 0.97;
                //}
                //if (progressBarPercent < 0)
                //{
                //    progressBarPercent = 0.0;
                //}

                //progressBarCalcWidth = Math.Floor(progressBarInnerWrapper.ActualWidth * progressBarPercent);

                //progressBarLeftFill.Width = progressBarCalcWidth;
                //progressBarRightFill.Width = progressBarInnerWrapper.ActualWidth - progressBarCalcWidth;
                //progressBarRightFill.Margin = new Thickness(progressBarCalcWidth, 0, 0, 0);

                //progressBarThumb.Margin = new Thickness(progressBarCalcWidth - 6, 0, 0, 0);

                //progressBarProgStarTime.Content = viewModel.currentProgram.LinearStartDateTime.ToLocalTime().ToString("HH:mm");
                //progressBarProgEndTime.Content = viewModel.currentProgram.ProgEndTimeNonUTC.ToString("HH:mm");

                //progressBarCrntTime.Content = viewModel.CrntPlayingProgram.ElapsedTimeSpan.ToString("HH:mm");
                //progressBarProgEndTime.Content = viewModel.CrntPlayingProgram.DurationTimeSpan.ToString("HH:mm");
                //viewModel.CrntPlayingProgram.ElapsedTimeSpan.Subtract(new TimeSpan(0,0,0,1));
                //progressBarRightFill.Background = new SolidColorBrush(Color.FromArgb(255, 180, 179, 181));
            }
            else
            {
                progressBarProgStarTime.Content = "00:00";
                progressBarProgEndTime.Content = "00:00";

                //progressBarLeft.Cursor = Cursors.Arrow;
                progressBarLeft.Width = 0;
                progressBarMiddle.Visibility = System.Windows.Visibility.Collapsed;
                progressBarRight.Visibility = System.Windows.Visibility.Visible;
                progressBarRight.Width = progressBarInnerWrapper.ActualWidth - 0;
                progressBarRight.Margin = new Thickness(0, 0, 0, 0);
                progressBarThumbImg.Margin = new Thickness(0 - 6, 0, 0, 0);

                //progressBarRightFill.Background = new SolidColorBrush(Color.FromArgb(255, 48, 48, 48));
            }

            progressBarInnerWrapperClickedXPosition = -1;
        }

        private void attachTimeShiftToNakedStream()
        {
            if (viewModel.startoverProgram != null)
            {
                HtmlPage.Window.Eval("_wgsbneq.gAnalyticsModule.fireGoogleAnalyticsEvnt('Playback End', 'Next', '" + viewModel.startoverProgram.Title + "')");
            }

            var crntSysTime = DateTime.Now;
            viewModel.startoverProgram = viewModel.currentProgram;
            viewModel.startoverProgramDetails = null;

            viewModel.startoverProgram.TimeShiftElapsedTime = -1;
            viewModel.startoverProgram.TimeShiftPlayerStartTime = -1;

            var diffInScnds = (int)(crntSysTime - viewModel.currentProgram.LinearStartDateTime.ToLocalTime()).TotalSeconds;

            var newCrntSysTime = DateTime.Now;
            viewModel.timeShiftValue = diffInScnds;
            viewModel.timeShiftedToDate = newCrntSysTime.Subtract(TimeSpan.FromSeconds(viewModel.timeShiftValue));
        }

        private bool isEqualForDoubles(double a, double b)
        {
            if ((a - b) < 0.99)
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        private void updateProgressBarForStartoverProg()
        {
            if (viewModel.isInStartoverMode && viewModel.startoverProgram != null)
            {
                var crntSysTime = DateTime.Now;

                DateTime refDateTime = new DateTime(1970, 1, 1, 0, 0, 0, 0);

                var programLength = (viewModel.startoverProgram.ProgEndTimeNonUTC - viewModel.startoverProgram.LinearStartDateTime.ToLocalTime()).TotalSeconds;

                
                var progStartTimeMilli = (viewModel.startoverProgram.LinearStartDateTime.ToLocalTime() - refDateTime).TotalMilliseconds;
                var progEndTimeMilli = (viewModel.startoverProgram.ProgEndTimeNonUTC - refDateTime).TotalMilliseconds;
                var crntSysTimeMilli = (crntSysTime - refDateTime).TotalMilliseconds;

                var playerStartTime = SmoothPlayer.StartPosition.TotalSeconds;
                var playerEndTime = SmoothPlayer.EndPosition.TotalSeconds;
                var playerCurrentTime = SmoothPlayer.Position.TotalSeconds;

                //tt5.Content = playerStartTime;
                //tt6.Content = playerEndTime;
                //tt7.Content = playerCurrentTime;

                if (!isEqualForDoubles(playerEndTime, 0.0))
                {
                    //tt3.Content = "Program is playing" + counter++;
                    if (progressBarInnerWrapperClickedXPosition != -1)
                    {
                        if (progressBarInnerWrapperClickedXPosition > progressBarLeft.ActualWidth && progressBarInnerWrapperClickedXPosition < progressBarInnerWrapper.ActualWidth)
                        {
                            performOnVideoMiddleProgressBarClick(progressBarInnerWrapperClickedXPosition - progressBarLeft.ActualWidth);
                            progressBarInnerWrapperClickedXPosition = -1;
                            return;
                        }
                        else if (progressBarInnerWrapperClickedXPosition < progressBarLeft.ActualWidth && progressBarInnerWrapperClickedXPosition >= 0)
                        {
                            performOnVideoLeftProgressBarClick(progressBarInnerWrapperClickedXPosition);
                            progressBarInnerWrapperClickedXPosition = -1;
                            return;
                        }
                    }

                    var adjustedCurrentPosition = playerCurrentTime;

                    if (isEqualForDoubles(adjustedCurrentPosition, 0.0))
                    {
                        adjustedCurrentPosition = playerStartTime;
                        //return;
                    }

                    var videoElapsedTime = adjustedCurrentPosition - playerStartTime;
                    var videoStreamTotalDuration = (playerEndTime - playerStartTime);

                    if (adjustedCurrentPosition < 930000)
                    {
                        videoElapsedTime = adjustedCurrentPosition;
                    }

                    var str = getCrntChnlStartOverStartBuffer();
                    var tempDate = viewModel.startoverProgram.LinearStartDateTime.ToLocalTime().Subtract(TimeSpan.FromSeconds(Int64.Parse(str)));
                    var crntProgCrntPostionDateTime = tempDate.Add(TimeSpan.FromSeconds(videoElapsedTime));
                    var archiveEndDate = crntSysTime.Subtract(TimeSpan.FromSeconds(Int64.Parse(getCrntChnlArchiveLength())));

                    var progStartTimeWithBuffer = viewModel.startoverProgram.LinearStartDateTime.ToLocalTime().Subtract(TimeSpan.FromSeconds(Int64.Parse(getCrntChnlStartOverStartBuffer())));
                    var progEndTimeWithBuffer = viewModel.startoverProgram.ProgEndTimeNonUTC.Add(TimeSpan.FromSeconds(Int64.Parse(getCrntChnlStartOverEndBuffer())));
                    if (archiveEndDate > crntProgCrntPostionDateTime)
                    {
                        var errorMsg = (string)HtmlPage.Window.Eval("_wgsbneq.MultiLangSupportModule.getErrorMsg(13,_wgsbneq.config.userPrefLanguage)");

                        if (!viewModel.isPlyrErrMsgGrdVisible)
                        {
                            if (archiveEndDate < progEndTimeWithBuffer)
                            {
                                var diffBtwarchiveBoundaryNstartTime = (archiveEndDate - progStartTimeWithBuffer).TotalSeconds;

                                var calculatedSeekTime = diffBtwarchiveBoundaryNstartTime;

                                calculatedSeekTime = calculatedSeekTime + 60;

                                if (calculatedSeekTime > videoStreamTotalDuration - 2)
                                {
                                    calculatedSeekTime = videoStreamTotalDuration - 2;
                                }

                                if (SmoothPlayer.CurrentState == SmoothStreamingMediaElementState.Playing)
                                {
                                    var newSeekPosition = TimeSpan.FromSeconds(SmoothPlayer.StartPosition.TotalSeconds + calculatedSeekTime + 120);

                                    SmoothPlayer.Position = newSeekPosition;

                                    plyrNotificationTxtBlk.Text = errorMsg + " " + "[APP-406]";
                                    plyrNotificationGrid.Visibility = System.Windows.Visibility.Visible;
                                    return;
                                }
                            }
                            else
                            {
                                try
                                {
                                    if (SmoothPlayer.CurrentState == SmoothStreamingMediaElementState.Playing)
                                    {
                                        SmoothPlayer.Visibility = System.Windows.Visibility.Collapsed;
                                        SmoothPlayer.Stop();

                                        viewModel.plyrErrMsgIndex = 13;
                                        displayPlyrErrorMsg(errorMsg, false, "APP-406");
                                    }

                                }
                                catch (Exception)
                                {
                                }

                                return;
                            }
                        }
                    }

                    var normalizedDuration = SmoothPlayer.EndPosition.TotalSeconds - SmoothPlayer.StartPosition.TotalSeconds;
                    normalizedDuration = normalizedDuration - Int16.Parse(getCrntChnlStartOverStartBuffer()) - Int16.Parse(getCrntChnlStartOverEndBuffer());


                    if (normalizedDuration < 0)
                    {
                        normalizedDuration = 1;
                    }

                    if (videoElapsedTime > normalizedDuration)
                    {
                        //videoElapsedTime = normalizedDuration;
                    }

                    if (videoStreamTotalDuration < programLength)
                    {
                        //tt3.Content = "playback time of stram is LESSER than its buffered added videoStreamTotalDuration: " + videoStreamTotalDuration + " programLength: " + programLength;
                        var ratio = videoElapsedTime / normalizedDuration;
                        if (ratio > 1)
                        {
                            ratio = 1;
                        }
                        var ratioOfLeftPlusMiddleBar = normalizedDuration / programLength;
                        var ratioOfLeftBar = ratio * ratioOfLeftPlusMiddleBar;
                        var ratioOfMiddleBar = ratioOfLeftPlusMiddleBar - ratioOfLeftBar;
                        var ratioOfRightBar = 1 - ratioOfLeftPlusMiddleBar;

                        var leftBarWidth = Math.Floor(progressBarInnerWrapper.ActualWidth * ratioOfLeftBar);
                        var middleBarWidth = Math.Floor(progressBarInnerWrapper.ActualWidth * ratioOfMiddleBar);
                        var rightBarWidth = progressBarInnerWrapper.ActualWidth - (leftBarWidth + middleBarWidth);

                        progressBarLeftSecondary.Visibility = System.Windows.Visibility.Collapsed;
                        progressBarMiddleSecondary.Visibility = System.Windows.Visibility.Collapsed;

                        //progressBarLeft.Cursor = Cursors.Hand;
                        progressBarLeft.Width = leftBarWidth;

                        progressBarMiddle.Visibility = System.Windows.Visibility.Visible;
                        if (isEqualForDoubles(leftBarWidth, 0.0))
                        {
                            progressBarMiddle.CornerRadius = new CornerRadius(8, 0, 0, 8);
                        }
                        else
                        {
                            progressBarMiddle.CornerRadius = new CornerRadius(0, 0, 0, 0);
                        }
                        progressBarMiddle.Width = middleBarWidth;
                        progressBarMiddle.Margin = new Thickness(leftBarWidth, 0, 0, 0);

                        progressBarRight.Visibility = System.Windows.Visibility.Visible;
                        progressBarRight.Width = progressBarInnerWrapper.ActualWidth - (leftBarWidth + middleBarWidth);
                        progressBarRight.Margin = new Thickness(leftBarWidth + middleBarWidth, 0, 0, 0);

                        if (leftBarWidth > progressBarInnerWrapper.ActualWidth - 26)
                        {
                            progressBarThumbImg.Margin = new Thickness(progressBarInnerWrapper.ActualWidth - 26, 0, 0, 0);
                        }
                        else
                        {
                            progressBarThumbImg.Margin = new Thickness(leftBarWidth, 0, 0, 0);
                        }
                    }
                    else
                    {
                        //tt3.Content = "playback time of stram is now GREATER than its buffered added videoElapsedTime: " + videoElapsedTime + " normalizedDuration: " + normalizedDuration;
                        var ratioOfLeftBar = (videoElapsedTime) / normalizedDuration;

                        if (ratioOfLeftBar > 1)
                        {
                            ratioOfLeftBar = 1;
                        }

                        var leftBarWidth = Math.Floor(progressBarInnerWrapper.ActualWidth * ratioOfLeftBar);
                        var middleBarWidth = progressBarInnerWrapper.ActualWidth - leftBarWidth;

                        progressBarLeftSecondary.Visibility = System.Windows.Visibility.Collapsed;
                        progressBarMiddleSecondary.Visibility = System.Windows.Visibility.Collapsed;

                        //progressBarLeft.Cursor = Cursors.Hand;
                        progressBarLeft.Width = leftBarWidth;

                        progressBarMiddle.Visibility = System.Windows.Visibility.Visible;
                        progressBarMiddle.CornerRadius = new CornerRadius(0, 8, 8, 0);
                        progressBarMiddle.Width = middleBarWidth;
                        progressBarMiddle.Margin = new Thickness(leftBarWidth, 0, 0, 0);

                        progressBarRight.Visibility = System.Windows.Visibility.Collapsed;

                        if (leftBarWidth > progressBarInnerWrapper.ActualWidth - 26)
                        {
                            progressBarThumbImg.Margin = new Thickness(progressBarInnerWrapper.ActualWidth - 26, 0, 0, 0);
                        }
                        else
                        {
                            progressBarThumbImg.Margin = new Thickness(leftBarWidth - 6, 0, 0, 0);
                        }
                    }

                    int progressLeftTimeIntervalVal = (int)videoElapsedTime;
                    int progressRightTimeIntervalVal = (int)(programLength - videoElapsedTime);

                    if (progressLeftTimeIntervalVal > programLength)
                    {
                        progressLeftTimeIntervalVal = (int)programLength;
                    }

                    if (progressRightTimeIntervalVal < 0)
                    {
                        progressRightTimeIntervalVal = 0;
                    }

                    //var leftMinutes = (int)Math.Floor(progressLeftTimeIntervalVal / 60);
                    //var leftSeconds = (int)Math.Floor(progressLeftTimeIntervalVal - leftMinutes * 60);

                    //var rightMinutes = (int)Math.Floor(progressRightTimeIntervalVal / 60);
                    //var rightSeconds = (int)Math.Floor(progressRightTimeIntervalVal - rightMinutes * 60);
                    var leftTime = DateTime.Today;
                    var tempLeftTime = leftTime.AddSeconds(videoElapsedTime);
                    var rightTime = DateTime.Today;
                    var tempRightTime = rightTime.AddSeconds(progressRightTimeIntervalVal);

                    var percentVal = (videoElapsedTime) / normalizedDuration;

                    //TimeSpan ts = TimeSpan.Parse(progressBarProgEndTime.Content.ToString());
                    //double totalSeconds = ts.TotalSeconds;

                    var lMinutes = (int)Math.Floor(progressLeftTimeIntervalVal / 60);
                    var lSeconds = (int)Math.Floor(progressLeftTimeIntervalVal - lMinutes * 60);

                    var rMinutes = (int)Math.Floor(progressRightTimeIntervalVal / 60);
                    var rSeconds = (int)Math.Floor(progressRightTimeIntervalVal - rMinutes * 60);


                    progressBarProgStarTime.Content = lMinutes.ToString().PadLeft(2, '0') + ":" + lSeconds.ToString().PadLeft(2, '0');
                    progressBarProgEndTime.Content = rMinutes.ToString().PadLeft(2, '0') + ":" + rSeconds.ToString().PadLeft(2, '0');

                    //if ((tempRightTime.Hour > -1 || tempRightTime.Minute > -1 || tempRightTime.Second > -1))
                    //{
                    //    if (totalSeconds > 0 || (progressLeftTimeIntervalVal != (int)programLength))
                    //    {
                    //        progressBarProgStarTime.Content = tempLeftTime.Hour.ToString("00") + ":" + tempLeftTime.Minute.ToString("00") + ":" + tempLeftTime.Second.ToString("00");
                    //        progressBarProgEndTime.Content = tempRightTime.Hour.ToString("00") + ":" + tempRightTime.Minute.ToString("00") + ":" + tempRightTime.Second.ToString("00");

                    //    }
                    //}

                    //progressBarProgStarTime.Content = viewModel.startoverProgram.LinearStartDateTime.ToLocalTime().ToString("HH:mm");
                    //progressBarProgEndTime.Content = viewModel.startoverProgram.ProgEndTimeNonUTC.ToString("HH:mm");
                }
                else
                {
                    //tt7.Content = "Program reached to end, end and start time = 0.0";
                    progressBarProgStarTime.Content = "00:00";
                    progressBarProgEndTime.Content = "00:00";

                    //progressBarLeft.Cursor = Cursors.Arrow;
                    progressBarLeft.Width = 0;
                    progressBarLeftSecondary.Visibility = System.Windows.Visibility.Collapsed;
                    progressBarMiddleSecondary.Visibility = System.Windows.Visibility.Collapsed;
                    progressBarMiddle.Visibility = System.Windows.Visibility.Collapsed;
                    progressBarRight.Visibility = System.Windows.Visibility.Visible;
                    progressBarRight.Width = progressBarInnerWrapper.ActualWidth - 0;
                    progressBarRight.Margin = new Thickness(0, 0, 0, 0);
                    progressBarThumbImg.Margin = new Thickness(0 - 6, 0, 0, 0);
                }

                //if (progressBarPercent > 0.97)
                //{
                //    progressBarPercent = 0.97;
                //}
                //if (progressBarPercent < 0)
                //{
                //    progressBarPercent = 0.0;
                //}

                //progressBarCalcWidth = Math.Floor(progressBarInnerWrapper.ActualWidth * progressBarPercent);

                //progressBarLeftFill.Width = progressBarCalcWidth;
                //progressBarRightFill.Width = progressBarInnerWrapper.ActualWidth - progressBarCalcWidth;
                //progressBarRightFill.Margin = new Thickness(progressBarCalcWidth, 0, 0, 0);

                //progressBarThumb.Margin = new Thickness(progressBarCalcWidth - 6, 0, 0, 0);

                //progressBarProgStarTime.Content = viewModel.currentProgram.LinearStartDateTime.ToLocalTime().ToString("HH:mm");
                //progressBarProgEndTime.Content = viewModel.currentProgram.ProgEndTimeNonUTC.ToString("HH:mm");

                //progressBarCrntTime.Content = viewModel.CrntPlayingProgram.ElapsedTimeSpan.ToString("HH:mm");
                //progressBarProgEndTime.Content = viewModel.CrntPlayingProgram.DurationTimeSpan.ToString("HH:mm");
                //viewModel.CrntPlayingProgram.ElapsedTimeSpan.Subtract(new TimeSpan(0,0,0,1));
                //progressBarRightFill.Background = new SolidColorBrush(Color.FromArgb(255, 180, 179, 181));
            }
            else
            {
                //tt2.Content = "Program Ended, end and start time = 0.0";
                progressBarProgStarTime.Content = "00:00";
                progressBarProgEndTime.Content = "00:00";

                //progressBarLeft.Cursor = Cursors.Arrow;
                progressBarLeft.Width = 0;
                progressBarLeftSecondary.Visibility = System.Windows.Visibility.Collapsed;
                progressBarMiddleSecondary.Visibility = System.Windows.Visibility.Collapsed;
                progressBarMiddle.Visibility = System.Windows.Visibility.Collapsed;
                progressBarRight.Visibility = System.Windows.Visibility.Visible;
                progressBarRight.Width = progressBarInnerWrapper.ActualWidth - 0;
                progressBarRight.Margin = new Thickness(0, 0, 0, 0);
                progressBarThumbImg.Margin = new Thickness(0 - 6, 0, 0, 0);

                //progressBarRightFill.Background = new SolidColorBrush(Color.FromArgb(255, 48, 48, 48));
            }

            progressBarInnerWrapperClickedXPosition = -1;
        }

        private bool isPlayerLoadedWithStream()
        {
            if (
                    SmoothPlayer.CurrentState == SmoothStreamingMediaElementState.Playing ||
                    SmoothPlayer.CurrentState == SmoothStreamingMediaElementState.Paused ||
                    SmoothPlayer.CurrentState == SmoothStreamingMediaElementState.Buffering ||
                    SmoothPlayer.CurrentState == SmoothStreamingMediaElementState.Stopped
                    )
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        private void updateProgressBarForCrntProg()
        {
            if (isPlayerLoadedWithStream() && !viewModel.isPlyrErrMsgGrdVisible)
            {
                //progressBarLeft.Cursor = Cursors.Hand;
            }
            else
            {
                //progressBarLeft.Cursor = Cursors.Arrow;
            }

            progressBarInnerWrapper.Cursor = Cursors.Arrow;

            if (viewModel.currentProgram != null)
            {
                if (progressBarInnerWrapperClickedXPosition != -1)
                {
                    if (progressBarInnerWrapperClickedXPosition < progressBarLeft.ActualWidth)
                    {
                        performOnVideoLeftProgressBarClick(progressBarInnerWrapperClickedXPosition);
                        progressBarInnerWrapperClickedXPosition = -1;
                        return;
                    }
                }

                var crntSysTime = DateTime.Now;

                DateTime refDateTime = new DateTime(1970, 1, 1, 0, 0, 0, 0);

                
                var progStartTimeMilli = (viewModel.currentProgram.LinearStartDateTime.ToLocalTime() - refDateTime).TotalMilliseconds;
                var progEndTimeMilli = (viewModel.currentProgram.ProgEndTimeNonUTC - refDateTime).TotalMilliseconds;
                var crntSysTimeMilli = (crntSysTime - refDateTime).TotalMilliseconds;

                double progressBarRatio = ((crntSysTimeMilli - progStartTimeMilli) / (progEndTimeMilli - progStartTimeMilli));

                if (progressBarRatio > .97)
                {
                    progressBarRatio = .97;
                }
                if (progressBarRatio < 0.0)
                {
                    progressBarRatio = 0.0;
                }

                double progressBarCalcWidth = (progressBarInnerWrapper.ActualWidth * progressBarRatio);

                var leftProgrsessBarWidth = Math.Floor(progressBarInnerWrapper.ActualWidth * progressBarRatio);
                progressBarLeft.Width = leftProgrsessBarWidth;

                progressBarMiddle.Visibility = System.Windows.Visibility.Collapsed;

                progressBarRight.Visibility = System.Windows.Visibility.Visible;
                progressBarRight.Width = progressBarInnerWrapper.ActualWidth - leftProgrsessBarWidth;
                progressBarRight.Margin = new Thickness(leftProgrsessBarWidth, 0, 0, 0);


                progressBarProgStarTime.Content = viewModel.currentProgram.LinearStartDateTime.ToLocalTime().ToString("HH:mm");
                progressBarProgEndTime.Content = viewModel.currentProgram.ProgEndTimeNonUTC.ToString("HH:mm");

                progressBarThumbImg.Margin = new Thickness(leftProgrsessBarWidth - 6, 0, 0, 0);
            }
            else
            {
                progressBarProgStarTime.Content = "00:00";
                progressBarProgEndTime.Content = "00:00";

                progressBarLeft.Width = 0;
                progressBarMiddle.Visibility = System.Windows.Visibility.Collapsed;
                progressBarRight.Width = progressBarInnerWrapper.ActualWidth - 0;
                progressBarRight.Margin = new Thickness(0, 0, 0, 0);
                progressBarThumbImg.Margin = new Thickness(0 - 6, 0, 0, 0);
            }

            //progressBarRightFill.Background = new SolidColorBrush(Color.FromArgb(255, 48, 48, 48));
        }

        private void syncVolumeCntrlVisibility()
        {
            if (!viewModel.isMouseOverVolumeCntrl)
            {
                volumBarGridContainer.Visibility = System.Windows.Visibility.Collapsed;
            }
            else
            {
                volumBarGridContainer.Visibility = System.Windows.Visibility.Visible;
            }
        }

        private void videoControlsGrid_MouseEnter(object sender, MouseEventArgs e)
        {
            viewModel.IsMouseOverVideoControlsBar = true;
        }

        private void videoControlsGrid_MouseLeave(object sender, MouseEventArgs e)
        {
            viewModel.IsMouseOverVideoControlsBar = false;
        }

        private void volCntrlGrid_MouseEnter(object sender, MouseEventArgs e)
        {
            viewModel.isMouseOverVolumeCntrl = true;
        }

        private void volCntrlGrid_MouseLeave(object sender, MouseEventArgs e)
        {
            viewModel.isMouseOverVolumeCntrl = false;
        }

        private void volumenCanvas_MouseEnter(object sender, MouseEventArgs e)
        {
            viewModel.IsMouseOverVideoControlsBar = true;
            viewModel.isMouseOverVolumeCntrl = true;
        }

        private void volumenCanvas_MouseLeave(object sender, MouseEventArgs e)
        {
            viewModel.isMouseOverVolumeCntrl = false;
            viewModel.IsMouseOverVideoControlsBar = false;
        }

        private void chkFingerPrintRspnsForNewChnl()
        {
            bool chnlFoundtoDsplyFP = false;
            if (viewModel.FingerPrintModel != null)
            {
                foreach (FingerPrintChnl fpChnlObj in viewModel.FingerPrintModel.isAlive)
                {
                    if (Int64.Parse(fpChnlObj.channelId) == viewModel.CrntPlayingChannel.ChannelId)
                    {
                        chnlFoundtoDsplyFP = true;
                        displayFingerPrint(fpChnlObj.position, fpChnlObj.background, fpChnlObj.colorText, fpChnlObj.duration);
                    }
                }
            }

            if (!chnlFoundtoDsplyFP)
            {
                clearFingerPrints();
            }
        }

        internal void onFngrPrntApiRspnsRcvd(string data)
        {
            if (viewModel.isPlyrErrMsgGrdVisible)
            {
                clearFingerPrints();
                return;
            }

            viewModel.FingerPrintModel = JsonConvert.DeserializeObject<FingerPrintModel>(data);

            bool chnlFoundtoDsplyFP = false;
            foreach (FingerPrintChnl fpChnlObj in viewModel.FingerPrintModel.isAlive)
            {
                if (Int64.Parse(fpChnlObj.channelId) == viewModel.CrntPlayingChannel.ChannelId)
                {
                    chnlFoundtoDsplyFP = true;
                    displayFingerPrint(fpChnlObj.position, fpChnlObj.background, fpChnlObj.colorText, fpChnlObj.duration);
                }
            }

            if (!chnlFoundtoDsplyFP)
            {
                clearFingerPrints();
            }
        }

        private void displayFingerPrint(string position, string background, string colorText, string duration)
        {
            clearFingerPrints();

            fingerPrintDurationTimer.Stop();
            fingerPrintDurationTimer.Interval = TimeSpan.FromSeconds(int.Parse(duration));
            fingerPrintDurationTimer.Start();

            if (position.Equals("1"))
            {
                alterFPLblPrprties(fp1Lbl, background, colorText);
            }
            else if (position.Equals("2"))
            {
                alterFPLblPrprties(fp2Lbl, background, colorText);
            }
            else if (position.Equals("3"))
            {
                alterFPLblPrprties(fp3Lbl, background, colorText);
            }
            else if (position.Equals("4"))
            {
                alterFPLblPrprties(fp4Lbl, background, colorText);
            }
            else if (position.Equals("5"))
            {
                alterFPLblPrprties(fp5Lbl, background, colorText);
            }
            else if (position.Equals("6"))
            {
                alterFPLblPrprties(fp6Lbl, background, colorText);
            }
            else if (position.Equals("7"))
            {
                alterFPLblPrprties(fp7Lbl, background, colorText);
            }
            else if (position.Equals("8"))
            {
                alterFPLblPrprties(fp8Lbl, background, colorText);
            }
            else if (position.Equals("9"))
            {
                alterFPLblPrprties(fp9Lbl, background, colorText);
            }
        }

        private void clearFingerPrints()
        {
            fp1Lbl.Visibility = System.Windows.Visibility.Collapsed;
            fp2Lbl.Visibility = System.Windows.Visibility.Collapsed;
            fp3Lbl.Visibility = System.Windows.Visibility.Collapsed;
            fp4Lbl.Visibility = System.Windows.Visibility.Collapsed;
            fp5Lbl.Visibility = System.Windows.Visibility.Collapsed;
            fp6Lbl.Visibility = System.Windows.Visibility.Collapsed;
            fp7Lbl.Visibility = System.Windows.Visibility.Collapsed;
            fp8Lbl.Visibility = System.Windows.Visibility.Collapsed;
            fp9Lbl.Visibility = System.Windows.Visibility.Collapsed;
        }

        private void alterFPLblPrprties(Label lbl, String background, String colorText)
        {
            lbl.Content = viewModel.ValidateTokenResponseRootObj.BBSData.UserData.SubscriberId;
            lbl.Background = new SolidColorBrush(background == null ? Colors.Transparent : convertHexToColor(background));
            lbl.Foreground = new SolidColorBrush(convertHexToColor(colorText));
            lbl.Visibility = System.Windows.Visibility.Visible;
            fingerPrintLastDspldLbl = lbl;
        }

        private Color convertHexToColor(string hexStr)
        {
            string hex = hexStr;
            hex = hex.Replace("#", string.Empty);
            byte r = (byte)(Convert.ToUInt32(hex.Substring(0, 2), 16));
            byte g = (byte)(Convert.ToUInt32(hex.Substring(2, 2), 16));
            byte b = (byte)(Convert.ToUInt32(hex.Substring(4, 2), 16));
            return Color.FromArgb(255, r, g, b);
        }

        internal void onFPBlockedUsrStatusConfirm(string responseStr)
        {
            viewModel.isCSMheartbeatNOKforCrntChnl = true;
            viewModel.isUsrBlkdByFp = true;
            mainTimer.Stop();
            mainTimer2.Start();

            TopMenuLang.Foreground = new SolidColorBrush(Color.FromArgb(255, 137, 199, 62));
            TopMenuQuality.Foreground = new SolidColorBrush(Color.FromArgb(255, 137, 199, 62));
            TopMenuInfo.Foreground = new SolidColorBrush(Color.FromArgb(255, 137, 199, 62));
            TopMenuMyKplus.Foreground = new SolidColorBrush(Color.FromArgb(255, 137, 199, 62));
            TopMenuLangDetailBorder.Visibility = System.Windows.Visibility.Collapsed;
            TopMenuQualityDetailBorder.Visibility = System.Windows.Visibility.Collapsed;
            TopMenuInfoDetailBorder.Visibility = System.Windows.Visibility.Collapsed;

            viewModel.plyrErrMsgIndex = 6;
            var errorMsg = (string)HtmlPage.Window.Eval("_wgsbneq.MultiLangSupportModule.getErrorMsg(11,_wgsbneq.config.userPrefLanguage)");
            //displayPlyrErrorMsg(errorMsg, true, "APP-113");
            displayPlyrErrorMsg(errorMsg, true, "FPT-700");
            plyrFPmsgGrd.Visibility = System.Windows.Visibility.Visible;
            //plyrFpMsgTxt.Text = errorMsg + " [APP-113]";
            plyrFpMsgTxt.Text = errorMsg + " [FPT-700]";
            try
            {
                clearFingerPrints();
                SmoothPlayer.Stop();
            }
            catch (Exception)
            {
            }
        }

        private void onFPmsgOkBtnClck(object sender, RoutedEventArgs e)
        {
            HtmlPage.Window.Eval("_wgsbneq.onAuthTokenExpired();");
        }

        public GetChannelProgramGuideJSON.Program[] filteroutCurrentNfuturePrograms(GetChannelProgramGuideJSON.Program[] programs)
        {
            List<GetChannelProgramGuideJSON.Program> filteredList = new List<GetChannelProgramGuideJSON.Program>();
            var crntSysTime = DateTime.Now;

            for (int i = 0; i < programs.Length; i++)
            {
                var progStartTime = programs[i].LinearStartDateTime.ToLocalTime();
                var progEndTime = programs[i].ProgEndTimeNonUTC;

                if (progEndTime >= crntSysTime)
                    filteredList.Add(programs[i]);
            }

            GetChannelProgramGuideJSON.Program[] filtered = filteredList.ToArray();

            return filtered;
        }

        public GetChannelProgramGuideJSON.Program[] filteroutStartoverPrograms(GetChannelProgramGuideJSON.Program[] programs, string startoverLength)
        {
            List<GetChannelProgramGuideJSON.Program> filteredList = new List<GetChannelProgramGuideJSON.Program>();
            var crntSysTime = DateTime.Now;
            var startoverLengthTimeTmp = DateTime.Now;
            var intStartoverLength = int.Parse(startoverLength);

            var startoverLengthTime = startoverLengthTimeTmp.Subtract(TimeSpan.FromSeconds(intStartoverLength));

            var convertedStartoverLength = int.Parse(startoverLength);

            for (int i = 0; i < programs.Length; i++)
            {
                var programLength = 0d;

                if (viewModel.startoverProgram != null)
                {
                    programLength = (viewModel.startoverProgram.ProgEndTimeNonUTC - viewModel.startoverProgram.LinearStartDateTime.ToLocalTime()).TotalSeconds;
                }

                var progStartTime = programs[i].LinearStartDateTime.ToLocalTime();
                var progEndTime = programs[i].ProgEndTimeNonUTC;
                //prog.prog_start_time >= startoverLeft && prog.prog_start_time < crntTime
                if ((progStartTime >= startoverLengthTime && progStartTime < crntSysTime))
                {
                    filteredList.Add(programs[i]);
                }
                else if (viewModel.startoverProgram != null && (crntSysTime > progStartTime && crntSysTime < progEndTime && intStartoverLength < programLength))
                {
                    filteredList.Add(programs[i]);
                }
            }

            GetChannelProgramGuideJSON.Program[] filtered = filteredList.ToArray();

            return filtered;
        }

        private GetChannelProgramGuideJSON.Program getMatchedStartoverProgram(string p)
        {
            var splited = System.Text.RegularExpressions.Regex.Split(p, "_startover_program_");
            var programContentId = splited[1];

            try
            {
                for (int i = 0; i < viewModel.GetChannelProgramGuideRootObj.channels[0].Programs.Length; i++)
                {
                    if (viewModel.GetChannelProgramGuideRootObj.channels[0].Programs[i].ContentId.Equals(programContentId))
                        return viewModel.GetChannelProgramGuideRootObj.channels[0].Programs[i];
                }
            }
            catch (Exception)
            {
            }

            return null;
        }

        private System.Collections.Generic.Dictionary<string, string> setStartoverParametersForCurrentChannel()
        {
            viewModel.startoverParametersForCrntChnl["ArchiveLength"] = "";
            viewModel.startoverParametersForCrntChnl["StartOverLength"] = "";
            viewModel.startoverParametersForCrntChnl["StartOverStartBuffer"] = "";
            viewModel.startoverParametersForCrntChnl["StartOverEndBuffer"] = "";

            foreach (var attri in viewModel.GetChannelsRespRootObj.Channels[viewModel.CrntPlayingChannelIndex].ExtraAttributes)
            {

                if (attri.Name.Equals("ArchiveLength") && !attri.Value.Equals("") && !attri.Value.Equals("0"))
                {
                    viewModel.startoverParametersForCrntChnl["ArchiveLength"] = attri.Value;
                    //viewModel.startoverParametersForCrntChnl["ArchiveLength"] = "1000";
                }
                if (attri.Name.Equals("StartOverLength") && !attri.Value.Equals("") && !attri.Value.Equals("0"))
                {
                    viewModel.startoverParametersForCrntChnl["StartOverLength"] = attri.Value;
                    //viewModel.startoverParametersForCrntChnl["StartOverLength"] = "15000";
                }
                if (attri.Name.Equals("StartOverStartBuffer"))
                {
                    viewModel.startoverParametersForCrntChnl["StartOverStartBuffer"] = attri.Value;
                }
                if (attri.Name.Equals("StartOverEndBuffer"))
                {
                    viewModel.startoverParametersForCrntChnl["StartOverEndBuffer"] = attri.Value;
                }
            }

            return viewModel.startoverParametersForCrntChnl;
        }

        private void populateStartoverEPGbar()
        {
            startoverBarScrollContentGrid.Children.Clear();

            string startoverLength = getCrntChnlStartOverLength();

            if (string.IsNullOrEmpty(startoverLength))
            {
                return;
            }

            try
            {
                viewModel.availableStartoverPrograms = filteroutStartoverPrograms(viewModel.GetChannelProgramGuideRootObj.channels[0].Programs, startoverLength);
            }
            catch (Exception)
            {
                viewModel.availableStartoverPrograms = null;
            }

            if (viewModel.availableStartoverPrograms != null && viewModel.availableStartoverPrograms.Length > 0)
            {
                bool isThisProgramCrnt = false;
                bool isThisProgramNextToCrnt = false;
                bool isThisProgOTTenabled = true;

                StackPanel sPanel = new StackPanel();
                sPanel.Orientation = Orientation.Horizontal;
                sPanel.HorizontalAlignment = System.Windows.HorizontalAlignment.Center;
                sPanel.VerticalAlignment = System.Windows.VerticalAlignment.Center;
                sPanel.Height = 60;

                var crntSysTime = DateTime.Now;
                int i = 0;
                while (i < viewModel.availableStartoverPrograms.Length)
                {
                    if ((viewModel.isInStartoverMode || viewModel.isInTimeShiftMode) && viewModel.startoverProgram != null)
                    {
                        if (viewModel.availableStartoverPrograms[i].ContentId.Equals(viewModel.startoverProgram.ContentId))
                        {
                            isThisProgramCrnt = true;
                        }
                    }

                    if (viewModel.availableStartoverPrograms[i].AdditionalInfo.OTTEnabled.Equals("false"))
                    {
                        isThisProgOTTenabled = false;
                    }
                    else
                    {
                        isThisProgOTTenabled = true;
                    }

                    Label EPGProgTitle = new Label();
                    Label EPGProgStartTimeInLocal = new Label();
                    Label EPGProgEndTimeInLocal = new Label();
                    Label EPGStaticDash = new Label();
                    Label EPGStaticText = new Label();

                    EPGStaticDash.Content = " - ";

                    EPGProgTitle.DataContext = viewModel;
                    EPGProgStartTimeInLocal.DataContext = viewModel;
                    EPGProgEndTimeInLocal.DataContext = viewModel;

                    EPGStaticText.Foreground = new SolidColorBrush(Color.FromArgb(255, 140, 199, 57));
                    EPGStaticText.FontFamily = new FontFamily("/kplus_silverlight_player;component/fonts/OpenSans-BoldItalic.ttf#Open Sans");
                    EPGStaticText.FontSize = 11;
                    EPGProgEndTimeInLocal.FontFamily = new FontFamily("/kplus_silverlight_player;component/fonts/OpenSans-BoldItalic.ttf#Open Sans");
                    EPGProgEndTimeInLocal.FontSize = 11;

                    EPGProgTitle.FontSize = 13;

                    EPGProgTitle.FontFamily = new FontFamily("/kplus_silverlight_player;component/fonts/OpenSans-BoldItalic.ttf#Open Sans");
                    EPGProgTitle.HorizontalAlignment = System.Windows.HorizontalAlignment.Left;
                    EPGProgTitle.VerticalAlignment = System.Windows.VerticalAlignment.Center;

                    EPGProgStartTimeInLocal.FontStyle = FontStyles.Italic;

                    EPGProgStartTimeInLocal.FontSize = 11;
                    EPGProgStartTimeInLocal.FontFamily = new FontFamily("/kplus_silverlight_player;component/fonts/OpenSans-BoldItalic.ttf#Open Sans");
                    EPGProgStartTimeInLocal.HorizontalAlignment = System.Windows.HorizontalAlignment.Left;
                    EPGProgStartTimeInLocal.VerticalAlignment = System.Windows.VerticalAlignment.Center;

                    //Binding EPGProgTitleBinding = new Binding("ChannelStartoverEPGrootObj.channels[0].Programs[" + i + "].Title");
                    //Binding EPGProgStartTimeBinding = new Binding("ChannelStartoverEPGrootObj.channels[0].Programs[" + i + "].ProgStartTimeNonUTCstr");
                    //Binding EPGProgEndTimeBinding = new Binding("ChannelStartoverEPGrootObj.channels[0].Programs[" + i + "].ProgEndTimeNonUTCstr");

                    EPGProgTitle.Content = viewModel.availableStartoverPrograms[i].Title; ;
                    EPGProgStartTimeInLocal.Content = viewModel.availableStartoverPrograms[i].ProgStartTimeNonUTCstr;
                    EPGProgEndTimeInLocal.Content = viewModel.availableStartoverPrograms[i].ProgEndTimeNonUTCstr;

                    //EPGProgTitle.SetBinding(Label.ContentProperty, EPGProgTitleBinding);
                    //EPGProgStartTimeInLocal.SetBinding(Label.ContentProperty, EPGProgStartTimeBinding);
                    //EPGProgEndTimeInLocal.SetBinding(Label.ContentProperty, EPGProgEndTimeBinding);

                    Border EPGinnerPanelBorder = new Border();
                    EPGinnerPanelBorder.HorizontalAlignment = System.Windows.HorizontalAlignment.Center;
                    EPGinnerPanelBorder.VerticalAlignment = System.Windows.VerticalAlignment.Center;

                    EPGinnerPanelBorder.Padding = new Thickness(10, 7, 10, 7);

                    if (i != 0)
                        EPGinnerPanelBorder.Margin = new Thickness(25, 0, 0, 0);

                    StackPanel EPGinnerPanel = new StackPanel();

                    EPGinnerPanelBorder.Child = EPGinnerPanel;

                    EPGinnerPanel.HorizontalAlignment = System.Windows.HorizontalAlignment.Left;
                    EPGinnerPanel.VerticalAlignment = System.Windows.VerticalAlignment.Center;

                    StackPanel EPGLowerPanel = new StackPanel();
                    EPGLowerPanel.Orientation = Orientation.Horizontal;
                    EPGLowerPanel.VerticalAlignment = System.Windows.VerticalAlignment.Center;
                    EPGLowerPanel.HorizontalAlignment = System.Windows.HorizontalAlignment.Left;

                    if (isThisProgramCrnt)
                    {
                        EPGinnerPanelBorder.Background = new SolidColorBrush(Color.FromArgb(255, 74, 74, 74));

                        //var onNowTxt = (string)HtmlPage.Window.Eval("_wgsbneq.MultiLangSupportModule.getLabel(20,_wgsbneq.config.userPrefLanguage)");
                        //EPGStaticText.Content = " . " + onNowTxt;

                        EPGinnerPanel.Children.Add(EPGProgTitle);
                        EPGLowerPanel.Children.Add(EPGProgStartTimeInLocal);
                        EPGLowerPanel.Children.Add(EPGStaticDash);
                        EPGLowerPanel.Children.Add(EPGProgEndTimeInLocal);
                        EPGLowerPanel.Children.Add(EPGStaticText);
                        EPGinnerPanel.Children.Add(EPGLowerPanel);

                        isThisProgramCrnt = false;
                        isThisProgramNextToCrnt = true;
                    }
                    else if (isThisProgramNextToCrnt)
                    {
                        EPGinnerPanelBorder.Background = new SolidColorBrush(Colors.Transparent);

                        EPGinnerPanel.Children.Add(EPGProgTitle);
                        EPGLowerPanel.Children.Add(EPGProgStartTimeInLocal);
                        EPGLowerPanel.Children.Add(EPGStaticDash);
                        EPGLowerPanel.Children.Add(EPGProgEndTimeInLocal);
                        EPGinnerPanel.Children.Add(EPGLowerPanel);

                        isThisProgramCrnt = false;
                        isThisProgramNextToCrnt = false;
                    }
                    else
                    {
                        EPGinnerPanelBorder.Background = new SolidColorBrush(Colors.Transparent);

                        EPGinnerPanel.Children.Add(EPGProgTitle);
                        EPGLowerPanel.Children.Add(EPGProgStartTimeInLocal);
                        EPGLowerPanel.Children.Add(EPGStaticDash);
                        EPGLowerPanel.Children.Add(EPGProgEndTimeInLocal);
                        EPGinnerPanel.Children.Add(EPGLowerPanel);
                    }

                    if (isThisProgOTTenabled)
                    {
                        EPGProgTitle.Foreground = new SolidColorBrush(Color.FromArgb(255, 192, 192, 192));
                        EPGProgStartTimeInLocal.Foreground = new SolidColorBrush(Color.FromArgb(255, 140, 199, 57));
                        EPGStaticDash.Foreground = new SolidColorBrush(Color.FromArgb(255, 140, 199, 57));
                        EPGProgEndTimeInLocal.Foreground = new SolidColorBrush(Color.FromArgb(255, 140, 199, 57));

                        EPGinnerPanelBorder.Cursor = Cursors.Hand;
                    }
                    else
                    {
                        EPGProgTitle.Foreground = new SolidColorBrush(Color.FromArgb(173, 163, 160, 160));
                        EPGProgStartTimeInLocal.Foreground = new SolidColorBrush(Color.FromArgb(133, 137, 199, 62));
                        EPGStaticDash.Foreground = new SolidColorBrush(Color.FromArgb(133, 137, 199, 62));
                        EPGProgEndTimeInLocal.Foreground = new SolidColorBrush(Color.FromArgb(133, 137, 199, 62));

                        EPGinnerPanelBorder.Background = new SolidColorBrush(Color.FromArgb(209, 5, 5, 5));
                        EPGinnerPanelBorder.Cursor = Cursors.Arrow;
                    }

                    EPGinnerPanelBorder.Name = "_startover_program_" + viewModel.availableStartoverPrograms[i].ContentId;
                    EPGinnerPanelBorder.MouseLeftButtonDown += onStartoverProgramSelected;

                    EPGinnerPanel.Background = new SolidColorBrush(Colors.Transparent);

                    sPanel.Children.Add(EPGinnerPanelBorder);

                    i++;
                }

                startoverBarScrollContentGrid.Children.Add(sPanel);
                startoverBarScrollContentGrid.Visibility = System.Windows.Visibility.Visible;
            }
            else
            {
                startoverBarScrollContentGrid.Visibility = System.Windows.Visibility.Collapsed;
            }

            oneScndDelayStartoverBarScrollAdjstTimer.Stop();
            oneScndDelayStartoverBarScrollAdjstTimer.Start();
        }

        private Uri getChannelStreamUrlWithStartoverProg(string contentId)
        {
            string mergedTime = (string)HtmlPage.Window.Eval("_wgsbneq.kpDash.getProgramStartTimeNendTimeInUTCstr('" + contentId + "'," + viewModel.CrntPlayingChannelIndex + ")");

            string[] splited = System.Text.RegularExpressions.Regex.Split(mergedTime, "__o__");

            for (int i = 0; i < viewModel.GetChannelsRespRootObj.Channels[viewModel.CrntPlayingChannelIndex].ExtraAttributes.Length; i++)
            {
                if (viewModel.GetChannelsRespRootObj.Channels[viewModel.CrntPlayingChannelIndex].ExtraAttributes[i].Name.Equals("PC_SS"))
                {
                    string url = viewModel.GetChannelsRespRootObj.Channels[viewModel.CrntPlayingChannelIndex].ExtraAttributes[i].Value;
                    url = url + "?t=" + splited[0] + "-" + splited[1];
                    return new Uri(url, UriKind.Absolute);
                }
            }

            return null;
        }

        private void onStartoverProgramSelected(object sender, MouseButtonEventArgs e)
        {
            var startoverProgBorder = (Border)sender;

            var transform = startoverProgBorder.TransformToVisual(Application.Current.RootVisual as FrameworkElement);
            var horizontalOffset = startoverBarScrollContentGrid.TransformToVisual(Application.Current.RootVisual as FrameworkElement).Transform(new Point()).X;
            var position = transform.Transform(new Point(0, 0));

            var selectedStartoverProgram = getMatchedStartoverProgram(startoverProgBorder.Name);

            if (selectedStartoverProgram.AdditionalInfo.OTTEnabled.Equals("false"))
            {
                return;
            }

            var crntSysTime = DateTime.Now;
            viewModel.timeShiftValue = (int)(crntSysTime - selectedStartoverProgram.LinearStartDateTime.ToLocalTime()).TotalSeconds;
            viewModel.timeShiftedToDate = crntSysTime.Subtract(TimeSpan.FromSeconds(viewModel.timeShiftValue));

            var channelTitle = viewModel.GetChannelsRespRootObj.Channels[viewModel.CrntPlayingChannelIndex].Title.Replace('\'', ' ').Replace('\"', ' ');
            var programTitle = selectedStartoverProgram.Title;
            HtmlPage.Window.Eval("_wgsbneq.gAnalyticsModule.fireGoogleAnalyticsEvnt('Start Over', 'Selected', '" + channelTitle + "' , {dimension3: '" + programTitle + "'});");

            performStartoverProgramSelected(selectedStartoverProgram, null, false, false);

            startoverScrollAnim.From = horizontalOffset;
            startoverScrollAnim.To = horizontalOffset + (-1 * position.X);

            if (horizontalOffset != position.X && (Math.Abs(startoverScrollAnim.To.Value) <= (startoverBarScrollContentGrid.ActualWidth - startoverScrollColumn.ActualWidth)))
            {
                startoverScrollStoryBoard.Begin();
            }
            else if (Math.Abs(startoverScrollAnim.To.Value) > 0 && (Math.Abs(startoverScrollAnim.To.Value) > (Math.Abs(startoverBarScrollContentGrid.ActualWidth - startoverScrollColumn.ActualWidth))))
            {
                CompositeTransform cTranform = new CompositeTransform();
                cTranform.TranslateX = -(startoverBarScrollContentGrid.ActualWidth - startoverScrollColumn.ActualWidth);
                startoverBarEPGCanvas.RenderTransform = cTranform;
                startoverScrollAnim.To = cTranform.TranslateX;
            }
            else
            {
                CompositeTransform cTranform = new CompositeTransform();
                cTranform.TranslateX = 0;
                startoverBarEPGCanvas.RenderTransform = cTranform;
                startoverScrollAnim.To = 0;
            }
        }

        private void performStartoverProgramSelected(GetChannelProgramGuideJSON.Program selectedStartoverProgram, string isCalledWhenProgramEnded, bool dontStartFromCrntPosition, bool startOverLiveProg)
        {
            HtmlPage.Window.Eval("_wgsbneq.config.crntChnlCSMPausCounter = 0;_wgsbneq.config.flags.isChnlPausedByUsr = false;_wgsbneq.APIcallerModule.dummyCall()");
            viewModel.isProgressBarHalted = true;

            if (viewModel.startoverProgram != null)
            {
                viewModel.startoverProgram.TimeShiftPlayerStartTime = -1;
                viewModel.startoverProgram.TimeShiftElapsedTime = -1;
            }

            selectedStartoverProgram.TimeShiftPlayerStartTime = -1;
            selectedStartoverProgram.TimeShiftElapsedTime = -1;

            if (viewModel.isUsrBlkdByFp)
            {
                viewModel.isProgressBarHalted = false;
                return;
            }

            if (selectedStartoverProgram.AdditionalInfo.OTTEnabled.Equals("false"))
            {
                viewModel.isProgressBarHalted = false;
                return;
            }

            plyrNotificationGrid.Visibility = System.Windows.Visibility.Collapsed;

            try
            {
                SmoothPlayer.Stop();
            }
            catch (Exception)
            {
            }

            viewModel.isInStartoverMode = false;
            viewModel.isInTimeShiftMode = false;

            viewModel.startoverProgram = null;
            viewModel.startoverProgramDetails = null;
            
            viewModel.isStartoverProgramEnded = false;

            if (string.IsNullOrEmpty(isCalledWhenProgramEnded))
            {
                viewModel.startoverEndedProgramToBeSeekedValue = -1;
            }

            viewModel.startoverProgram = selectedStartoverProgram;

            string crntProgramContentId = "";
            if (viewModel.currentProgram != null)
            {
                crntProgramContentId = viewModel.currentProgram.ContentId;
            }

            if (viewModel.startoverProgram.ContentId.Equals(crntProgramContentId))
            {
                if (!dontStartFromCrntPosition && viewModel.availableStartoverPrograms != null && viewModel.availableStartoverPrograms.Length == 1)
                {
                    viewModel.timeShiftValue = 0;
                    viewModel.timeShiftedToDate = DateTime.Now;
                }

                
                if (startOverLiveProg)
                {
                    viewModel.isInStartoverMode = true;
                }
                else
                {
                    viewModel.isInTimeShiftMode = true;
                }
                //populateStartoverEPGbar();
            }
            else
            {
                viewModel.isInStartoverMode = true;
                //populateStartoverEPGbar();
            }

            adjustStartoverProgramsBordersInStartoverBar();

            //populateStartoverEPGbar();

            viewModel.isChnlAllowedToPlay = false;
            SmoothPlayer.Visibility = System.Windows.Visibility.Collapsed;
            plyrErrorMsgGrid.Visibility = System.Windows.Visibility.Collapsed;
            viewModel.isPlyrErrMsgGrdVisible = false;

            if (viewModel.CrntPlayingChannel.IsAuthorized == false)
            {
                var errorMsg = (string)HtmlPage.Window.Eval("_wgsbneq.MultiLangSupportModule.getErrorMsg(6,_wgsbneq.config.userPrefLanguage)");
                viewModel.plyrErrMsgIndex = 6;
                displayPlyrErrorMsg(errorMsg, false, "APP-201");
                loadChannelEPG();
                viewModel.isProgressBarHalted = false;
                return;
            }

            var streamUrl = getChannelStreamUrl(viewModel.CrntPlayingChannelIndex);

            if (viewModel.isInStartoverMode)
            {
                streamUrl = getChannelStreamUrlWithStartoverProg(viewModel.startoverProgram.ContentId);
            }
            else
            {
                var archiveLength = int.Parse(getCrntChnlArchiveLength());

                DateTime currentTime = DateTime.Now;

                Int32 subtractedArchiveTime = archiveLength * -1;
                currentTime = currentTime.AddSeconds(subtractedArchiveTime);

                DateTime currentTimeWithShift = DateTime.Now;

                Int32 subtractedTimeShift = viewModel.timeShiftValue * -1;
                currentTimeWithShift = currentTimeWithShift.AddSeconds(subtractedTimeShift);

                int result = DateTime.Compare(currentTime, currentTimeWithShift);

                if (result < 0)
                {
                    streamUrl = getChannelStreamUrlTimeShifted(viewModel.CrntPlayingChannelIndex, viewModel.timeShiftValue);
                }
                else
                {
                    streamUrl = getChannelStreamUrlTimeShifted(viewModel.CrntPlayingChannelIndex, archiveLength - 120);
                }
            }

            //var streamUrl = getChannelStreamUrlWithStartoverProg(viewModel.startoverProgram.ContentId);
            //var streamUrl = getChannelStreamSrc(viewModel.CrntPlayingChannelIndex);

            if (streamUrl == null)
            {
                loadChannelEPG();
                //loadStartoverEPG();
                var errorMsg = (string)HtmlPage.Window.Eval("_wgsbneq.MultiLangSupportModule.getErrorMsg(1,_wgsbneq.config.userPrefLanguage)");
                viewModel.plyrErrMsgIndex = 1;
                displayPlyrErrorMsg(errorMsg, false, "CHL-102");
                viewModel.isProgressBarHalted = false;
                return;
            }
            else
            {
            }

            SmoothPlayer.SmoothStreamingSource = streamUrl;

            SmoothPlayer.AutoPlay = false;

            populateCrntProgInTopBar();
        }

        private GetChannelProgramGuideJSON.Program findNextStartoverProgram()
        {
            if (viewModel.currentProgram == null)
            {
                return null;
            }

            string startoverLength = getCrntChnlStartOverLength();
            if (startoverLength.Equals(""))
            {
                startoverLength = "0";
            }
            var startoverLengthTimeTmp = DateTime.Now;
            var startoverLengthTime = startoverLengthTimeTmp.Subtract(TimeSpan.FromSeconds(int.Parse(startoverLength)));

            foreach (var program in viewModel.GetChannelProgramGuideRootObj.channels[0].Programs)
            {
                if (program.LinearStartDateTime.ToLocalTime() > startoverLengthTime && program.LinearStartDateTime.ToLocalTime() > viewModel.startoverProgram.LinearStartDateTime.ToLocalTime() && program.ProgEndTimeNonUTC <= viewModel.currentProgram.ProgEndTimeNonUTC)
                {
                    if (program.AdditionalInfo.OTTEnabled.Equals("true"))
                    {
                        return program;
                    }
                }
            }

            return null;
        }

        private void findNextStartoverProgramPredicate()
        {
        }

        private void onStartoverBarCloseBttnClick(object sender, MouseButtonEventArgs e)
        {
            HtmlPage.Window.Eval("_wgsbneq.gAnalyticsModule.fireGoogleAnalyticsEvnt('Start Over', 'Close')");

            performOnStartoverBarCloseBtnClicked();
        }

        private void performOnStartoverBarCloseBtnClicked()
        {
            var transform = (CompositeTransform)startoverEPGbar.RenderTransform;
            if (transform.TranslateX == 0)
            {
                startoverSlideRightStoryBoard.Completed -= onSlideLeftNextCloseBttnAdj;
                epgBar.Visibility = System.Windows.Visibility.Visible;
                startoverSlideLeftAnim.To = -(VideoContainer.ActualWidth - startoverBarStartoverBtnGrid.ActualWidth);
                startoverSlideLeftStoryBoard.Begin();
            }
        }

        private void onStartoverBarStartoverBtnClick(object sender, MouseButtonEventArgs e)
        {
            HtmlPage.Window.Eval("_wgsbneq.gAnalyticsModule.fireGoogleAnalyticsEvnt('Start Over', 'Open')");
            var transform = (CompositeTransform)startoverEPGbar.RenderTransform;
            if (transform.TranslateX == 0)
            {
                startoverSlideRightStoryBoard.Completed -= onSlideLeftNextCloseBttnAdj;
                startoverSlideLeftAnim.To = -(VideoContainer.ActualWidth - startoverBarStartoverBtnGrid.ActualWidth);
                startoverSlideLeftStoryBoard.Begin();
                epgBar.Visibility = System.Windows.Visibility.Visible;
                return;
            }
            epgBar.Visibility = System.Windows.Visibility.Collapsed;
            startoverSlideRightAnim.To = 0;
            startoverSlideRightStoryBoard.Begin();
        }

        private void onStartoverBarScrollLeftImgClick(object sender, MouseButtonEventArgs e)
        {
            if (startoverScrollAnim.To == null)
            {
                startoverScrollAnim.To = 0;
            }

            if (startoverBarScrollContentGrid.ActualWidth > startoverScrollColumn.ActualWidth)
            {
                startoverScrollStoryBoard.Stop();
                startoverScrollAnim.To = startoverScrollAnim.To + 200;

                if (startoverScrollAnim.To.Value < 0)
                {
                    startoverScrollAnim.From = startoverScrollAnim.To - 200;
                    startoverScrollStoryBoard.Begin();
                }
                else
                {
                    CompositeTransform cTranform = new CompositeTransform();
                    cTranform.TranslateX = 0;
                    startoverBarEPGCanvas.RenderTransform = cTranform;
                    startoverScrollAnim.To = 0;
                }
            }
        }

        private void onStartoverBarScrollRightBttnClick(object sender, MouseButtonEventArgs e)
        {
            if (startoverScrollAnim.To == null)
            {
                startoverScrollAnim.To = 0;
            }

            startoverScrollStoryBoard.Stop();

            if (startoverBarScrollContentGrid.ActualWidth > startoverScrollColumn.ActualWidth)
            {
                startoverScrollAnim.To = startoverScrollAnim.To - 200;

                if (Math.Abs(startoverScrollAnim.To.Value) <= (startoverBarScrollContentGrid.ActualWidth - startoverScrollColumn.ActualWidth))
                {
                    startoverScrollStoryBoard.Stop();
                    startoverScrollAnim.From = startoverScrollAnim.To + 200;
                    startoverScrollStoryBoard.Begin();
                }
                else
                {
                    CompositeTransform cTranform = new CompositeTransform();
                    cTranform.TranslateX = -(startoverBarScrollContentGrid.ActualWidth - startoverScrollColumn.ActualWidth);
                    startoverBarEPGCanvas.RenderTransform = cTranform;
                    startoverScrollAnim.To = cTranform.TranslateX;
                }
            }
        }

        private void startoverProgramEndOverlayPlayNextImg_MouseEnter(object sender, MouseEventArgs e)
        {
            viewModel.isMouseOverStartoverOverlayPlayLiveImg = true;
        }

        private void startoverProgramEndOverlayPlayNextImg_MouseLeave(object sender, MouseEventArgs e)
        {
            viewModel.isMouseOverStartoverOverlayPlayLiveImg = false;
        }

        private void startoverProgramEndOverlayPlayLiveImg_MouseEnter(object sender, MouseEventArgs e)
        {
            viewModel.isMouseOverStartoverOverlayPlayNextImg = true;
        }

        private void startoverProgramEndOverlayPlayLiveImg_MouseLeave(object sender, MouseEventArgs e)
        {
            viewModel.isMouseOverStartoverOverlayPlayNextImg = false;
        }

        private void startoverBar_MouseEnter(object sender, MouseEventArgs e)
        {
            viewModel.isMouseOverStartoverBar = true;
        }

        private void startoverBar_MouseLeave(object sender, MouseEventArgs e)
        {
            viewModel.isMouseOverStartoverBar = false;
        }

        internal void onGetContentResponseRecievedForStartover(string responseStr)
        {
            if (!responseStr.Equals("error"))
            {
                viewModel.startoverProgramDetails = JsonConvert.DeserializeObject<GetContentResponseJSON.Rootobject>(responseStr);

                populateCrntProgInTopBar();
                populateProgInfoDetailsCntralPopup();
                //populateStartoverEPGbar();
            }
            else
            {
                viewModel.startoverProgramDetails = null;
            }
        }

        private void onVideoStreamProgressbarClicked(object sender, MouseButtonEventArgs e)
        {
            var p = e.GetPosition(progressBarInnerWrapper);

            performStartoverBarClicked(p.X);
        }

        private void performStartoverBarClicked(double x)
        {
            if (viewModel.isInStartoverMode && viewModel.startoverProgram != null)
            {
                var d = x / progressBarInnerWrapper.ActualWidth;

                if (!isEqualForDoubles(SmoothPlayer.StartPosition.TotalSeconds, 0.0))
                {
                    var v = Math.Floor(SmoothPlayer.EndPosition.TotalSeconds - SmoothPlayer.StartPosition.TotalSeconds) * d;


                    SmoothPlayer.Position = TimeSpan.FromSeconds(SmoothPlayer.StartPosition.TotalSeconds + v);
                }
                else
                {
                    if (viewModel.isStartoverProgramEnded == true)
                    {
                        performStartoverProgramSelected(viewModel.startoverProgram, "calledWhenProgramEnded", false, false);
                    }
                }

                viewModel.isStartoverProgramEnded = false;
            }
        }

        private void onSmoothPlayerMediaEnded(object sender, RoutedEventArgs e)
        {
            //tt1.Content = "";
            //tt2.Content = "";
            //tt3.Content = "";
            viewModel.isStartoverProgramEnded = true;

            performTopMenuDetailClose();
        }

        private void onStartoverPlayNextBtnClicked(object sender, MouseButtonEventArgs e)
        {
            GetChannelProgramGuideJSON.Program selectedStartoverProgram = findNextStartoverProgram();

            if (selectedStartoverProgram != null)
            {
                performStartoverProgramSelected(selectedStartoverProgram, null, false, false);
            }
            else
            {
                performChannelLogoClicked(viewModel.CrntPlayingChannelIndex);
            }
        }

        private void onStartoverPlayLiveBtnClicked(object sender, MouseButtonEventArgs e)
        {
            performChannelLogoClicked(viewModel.CrntPlayingChannelIndex);
        }

        private void syncStartoverProgramSeekPosition()
        {
        }

        private void syncStartoverProgramEnd()
        {
            if (viewModel.isStartoverProgramEnded == true)
            {
                if (plyrNotificationGrid.Visibility == System.Windows.Visibility.Visible)
                {
                    plyrNotificationGrid.Visibility = System.Windows.Visibility.Collapsed;
                }

                showOverlayRoot();
                if (viewModel.lastEndedProgramContentId != viewModel.startoverProgram.ContentId)
                {
                    HtmlPage.Window.Eval("_wgsbneq.gAnalyticsModule.fireGoogleAnalyticsEvnt('Playback End', 'Start Over', '" + viewModel.startoverProgram.Title + "')");
                    viewModel.lastEndedProgramContentId = viewModel.startoverProgram.ContentId;
                }

                StartoverBtnsOverlay.Visibility = System.Windows.Visibility.Visible;
                //GetChannelProgramGuideJSON.Program selectedStartoverProgram = findNextStartoverProgram();
                //if (selectedStartoverProgram != null)
                //{
                //    startoverProgramEndOverlayPlayNextImg.Source = new BitmapImage(new Uri("images/startover/web_play_big_active.png", UriKind.Relative)); ;
                //    startoverProgramEndOverlayPlayNextImg.Cursor = Cursors.Hand;
                //}
                //else
                //{
                //    startoverProgramEndOverlayPlayNextImg.Source = new BitmapImage(new Uri("images/startover/web_play_big.png", UriKind.Relative)); ;
                //    startoverProgramEndOverlayPlayNextImg.Cursor = Cursors.Arrow;
                //}
            }
            else
            {
                StartoverBtnsOverlay.Visibility = System.Windows.Visibility.Collapsed;
            }
        }

        private void syncStartoverProgramEndedToBeSeeked()
        {
            if (viewModel.isInStartoverMode && viewModel.startoverProgram != null)
            {
                if (viewModel.startoverEndedProgramToBeSeekedValue != -1)
                {
                    if (!isEqualForDoubles(SmoothPlayer.StartPosition.TotalSeconds, 0.0))
                    {
                        var v = Math.Floor(SmoothPlayer.EndPosition.TotalSeconds - SmoothPlayer.StartPosition.TotalSeconds) * viewModel.startoverEndedProgramToBeSeekedValue;

                        SmoothPlayer.Position = TimeSpan.FromSeconds(SmoothPlayer.StartPosition.TotalSeconds + v);
                        viewModel.startoverEndedProgramToBeSeekedValue = -1;
                    }
                }
            }
        }

        private void onStartoverBtnClicked(object sender, MouseButtonEventArgs e)
        {
            if (viewModel.isInStartoverMode)
            {

                if (viewModel.isPlyrErrMsgGrdVisible && viewModel.plyrErrMsgIndex == 13)
                {
                    return;
                }


                performStartoverProgramSelected(viewModel.startoverProgram, null, true, false);
            }
            else if (viewModel.isInTimeShiftMode)
            {

                var crntSysTime = DateTime.Now;

                var archiveLength = int.Parse(getCrntChnlArchiveLength());

                viewModel.timeShiftValue = (int)(crntSysTime - viewModel.startoverProgram.LinearStartDateTime.ToLocalTime()).TotalSeconds;


                if (viewModel.timeShiftValue > archiveLength + 100)
                {
                    viewModel.timeShiftValue = archiveLength + 100;
                }

                viewModel.timeShiftedToDate = crntSysTime.Subtract(TimeSpan.FromSeconds(viewModel.timeShiftValue));

                performStartoverProgramSelected(viewModel.startoverProgram, null, true, false);
            }
            else
            {
                var crntSysTime = DateTime.Now;
                viewModel.timeShiftValue = (int)(crntSysTime - viewModel.currentProgram.LinearStartDateTime.ToLocalTime()).TotalSeconds;
                viewModel.timeShiftedToDate = crntSysTime.Subtract(TimeSpan.FromSeconds(viewModel.timeShiftValue));

                performStartoverProgramSelected(viewModel.currentProgram, null, true, false);
            }
            /*
              CSM Refactor
              onCSMPlay
          */
            HtmlPage.Window.Eval("_wgsbneq.CSMheartBeatModule.onCSMPlay()");
        }


        private void adjustStartoverProgramsBordersInStartoverBar()
        {
            string startoverLength = getCrntChnlStartOverLength();

            if (string.IsNullOrEmpty(startoverLength))
            {
                return;
            }

            GetChannelProgramGuideJSON.Program[] filteredPrograms = null;

            try
            {
                filteredPrograms = filteroutStartoverPrograms(viewModel.GetChannelProgramGuideRootObj.channels[0].Programs, startoverLength);

                if (filteredPrograms != null && filteredPrograms.Length > 0)
                {
                    for (int i = 0; i < filteredPrograms.Length; i++)
                    {
                        if ((viewModel.isInStartoverMode || viewModel.isInTimeShiftMode) && viewModel.startoverProgram != null)
                        {
                            if (filteredPrograms[i].ContentId.Equals(viewModel.startoverProgram.ContentId))
                            {
                                startOverProgramme_setBorderColor(filteredPrograms[i].ContentId, "selected");
                            }
                            else if (filteredPrograms[i].AdditionalInfo.OTTEnabled == "true")
                            {
                                startOverProgramme_setBorderColor(filteredPrograms[i].ContentId, "enable");
                            }
                            else if (filteredPrograms[i].AdditionalInfo.OTTEnabled == "false")
                            {
                                startOverProgramme_setBorderColor(filteredPrograms[i].ContentId, "disable");
                            }
                        }
                    }
                }
            }
            catch (Exception)
            {
            }
        }

        private void startOverProgramme_setBorderColor(string id, string type)
        {
            if (startoverBarScrollContentGrid.Children.Count > 0)
            {
                var stackPanel = (System.Windows.Controls.StackPanel)startoverBarScrollContentGrid.Children[0];

                foreach (var control in stackPanel.Children)
                {
                    var startoverProgramBorder = (System.Windows.Controls.Border)control;

                    var splited = System.Text.RegularExpressions.Regex.Split(startoverProgramBorder.Name, "_startover_program_");
                    var programContentId = splited[1];

                    if (id.Equals(programContentId) && type == "selected")
                    {
                        startoverProgramBorder.Background = new SolidColorBrush(Color.FromArgb(255, 74, 74, 74));
                    }
                    else if (id.Equals(programContentId) && type == "enable")
                    {
                        startoverProgramBorder.Background = new SolidColorBrush(Colors.Transparent);
                    }
                    else if (id.Equals(programContentId) && type == "disable")
                    {
                        startoverProgramBorder.Background = new SolidColorBrush(Color.FromArgb(209, 5, 5, 5));
                    }
                }
            }
        }

        private void syncStartoverBar(object sender, EventArgs e)
        {
            if (startoverBarScrollContentGrid.Children.Count > 0)
            {
                var stackPanel = (System.Windows.Controls.StackPanel)startoverBarScrollContentGrid.Children[0];

                if (stackPanel.Children.Count > 0)
                {
                    string startoverLength = getCrntChnlStartOverLength();
                    if (startoverLength.Equals(""))
                    {
                        startoverLength = "0";
                    }
                    var startoverLengthTimeTmp = DateTime.Now;
                    var startoverLengthTime = startoverLengthTimeTmp.Subtract(TimeSpan.FromSeconds(int.Parse(startoverLength)));

                    var firstProgramBorder = (System.Windows.Controls.Border)stackPanel.Children.First();

                    var mergedString = (System.Windows.Controls.Border)stackPanel.Children.Last();
                    var splited = System.Text.RegularExpressions.Regex.Split(mergedString.Name, "_startover_program_");
                    var lastProgramId = splited[1];

                    var startoverProgram = getMatchedStartoverProgram(firstProgramBorder.Name);

                    if (startoverProgram != null && startoverProgram.LinearStartDateTime.ToLocalTime() <= startoverLengthTime)
                    {
                        populateStartoverEPGbar();
                    }
                    else if (viewModel.currentProgram != null)
                    {
                        if (!lastProgramId.Equals(viewModel.currentProgram.ContentId))
                        {
                            populateStartoverEPGbar();
                        }
                    }
                }
            }
        }

        private void onVideoLeftProgressBarClick(object sender, MouseButtonEventArgs e)
        {
            var clickedPoint = e.GetPosition(progressBarLeft);

            double xPos = clickedPoint.X;
        }

        private void performOnVideoLeftProgressBarClick(double clickedXpos)
        {
            if (viewModel.isInStartoverMode && viewModel.startoverProgram != null)
            {
                var ratio = clickedXpos / (progressBarLeft.ActualWidth + progressBarMiddle.ActualWidth);

                performVideoSeekPositionChange(ratio);
            }
            else if (viewModel.isInTimeShiftMode && viewModel.startoverProgram != null)
            {
                var ratio = clickedXpos / (progressBarLeft.ActualWidth + progressBarMiddle.ActualWidth);

                var crntSysTime = DateTime.Now;
                var programLength = (viewModel.startoverProgram.ProgEndTimeNonUTC - viewModel.startoverProgram.LinearStartDateTime.ToLocalTime()).TotalSeconds;

                var diffBtwProgStartNcrntSysTime = (int)(crntSysTime - viewModel.startoverProgram.LinearStartDateTime.ToLocalTime()).TotalSeconds;
                var temp = (int)(diffBtwProgStartNcrntSysTime * ratio);
                var newtimeShiftValue = diffBtwProgStartNcrntSysTime - temp;

                if (newtimeShiftValue > viewModel.timeShiftValue)
                {
                    HtmlPage.Window.Eval("_wgsbneq.gAnalyticsModule.fireGoogleAnalyticsEvnt('Live Player', 'Time Shift Left')");
                }
                else
                {
                    HtmlPage.Window.Eval("_wgsbneq.gAnalyticsModule.fireGoogleAnalyticsEvnt('Live Player', 'Time Shift Right')");
                }

                viewModel.timeShiftValue = newtimeShiftValue;
                viewModel.timeShiftedToDate = crntSysTime.Subtract(TimeSpan.FromSeconds(viewModel.timeShiftValue));

                performStartoverProgramSelected(viewModel.startoverProgram, null, true, false);
            }
            else
            {
                if (
                    SmoothPlayer.CurrentState == SmoothStreamingMediaElementState.Playing ||
                    SmoothPlayer.CurrentState == SmoothStreamingMediaElementState.Paused ||
                    SmoothPlayer.CurrentState == SmoothStreamingMediaElementState.Buffering ||
                    SmoothPlayer.CurrentState == SmoothStreamingMediaElementState.Stopped
                    )
                {
                    if (!viewModel.isPlyrErrMsgGrdVisible)
                    {
                        var ratio = clickedXpos / (progressBarLeft.ActualWidth);

                        var crntSysTime = DateTime.Now;
                        var programLength = (viewModel.currentProgram.ProgEndTimeNonUTC - viewModel.currentProgram.LinearStartDateTime.ToLocalTime()).TotalSeconds;

                        var diffBtwProgStartNcrntSysTime = (int)(crntSysTime - viewModel.currentProgram.LinearStartDateTime.ToLocalTime()).TotalSeconds;
                        var temp = (int)(diffBtwProgStartNcrntSysTime * ratio);
                        var newtimeShiftValue = diffBtwProgStartNcrntSysTime - temp;

                        viewModel.timeShiftValue = newtimeShiftValue;
                        viewModel.timeShiftedToDate = crntSysTime.Subtract(TimeSpan.FromSeconds(viewModel.timeShiftValue));

                        performStartoverProgramSelected(viewModel.currentProgram, null, true, false);
                    }
                }
            }
        }

        private void onVideoMiddleProgressBarClick(object sender, MouseButtonEventArgs e)
        {
            var clickedPoint = e.GetPosition(progressBarMiddle);

            double xPos = clickedPoint.X;
        }

        private void performOnVideoMiddleProgressBarClick(double xPos)
        {
            var ratio = (progressBarLeft.ActualWidth + xPos) / (progressBarLeft.ActualWidth + progressBarMiddle.ActualWidth);

            if (viewModel.isInStartoverMode && viewModel.startoverProgram != null)
            {
                performVideoSeekPositionChange(ratio);
            }
            else if (viewModel.isInTimeShiftMode && viewModel.startoverProgram != null)
            {
                var crntSysTime = DateTime.Now;
                var programLength = (viewModel.startoverProgram.ProgEndTimeNonUTC - viewModel.startoverProgram.LinearStartDateTime.ToLocalTime()).TotalSeconds;

                var diffBtwProgStartNcrntSysTime = (int)(crntSysTime - viewModel.startoverProgram.LinearStartDateTime.ToLocalTime()).TotalSeconds;
                var temp = (int)(diffBtwProgStartNcrntSysTime * ratio);
                var newtimeShiftValue = diffBtwProgStartNcrntSysTime - temp;

                if (newtimeShiftValue > viewModel.timeShiftValue)
                {
                    HtmlPage.Window.Eval("_wgsbneq.gAnalyticsModule.fireGoogleAnalyticsEvnt('Live Player', 'Time Shift Left')");
                }
                else
                {
                    HtmlPage.Window.Eval("_wgsbneq.gAnalyticsModule.fireGoogleAnalyticsEvnt('Live Player', 'Time Shift Right')");
                }

                viewModel.timeShiftValue = newtimeShiftValue;
                viewModel.timeShiftedToDate = crntSysTime.Subtract(TimeSpan.FromSeconds(viewModel.timeShiftValue));

                performStartoverProgramSelected(viewModel.startoverProgram, null, true, false);
            }
        }

        private void performVideoSeekPositionChange(double ratio)
        {

            if (!isEqualForDoubles(SmoothPlayer.StartPosition.TotalSeconds, 0.0))
            {
                var normalizedDuration = SmoothPlayer.EndPosition.TotalSeconds - SmoothPlayer.StartPosition.TotalSeconds;
                normalizedDuration = normalizedDuration - Int16.Parse(getCrntChnlStartOverStartBuffer()) - Int16.Parse(getCrntChnlStartOverEndBuffer());
                if (normalizedDuration < 0)
                {
                    normalizedDuration = 0;
                }
                var v = Math.Floor(normalizedDuration) * ratio;
                var newSeekPosition = TimeSpan.FromSeconds(SmoothPlayer.StartPosition.TotalSeconds + v);

                SmoothPlayer.Position = newSeekPosition;
            }
            else
            {
                if (viewModel.isStartoverProgramEnded == true)
                {
                    viewModel.startoverEndedProgramToBeSeekedValue = ratio;
                    performStartoverProgramSelected(viewModel.startoverProgram, "calledWhenProgramEnded", false, false);
                }
            }

            if (SmoothPlayer.CurrentState == SmoothStreamingMediaElementState.Paused)
            {
                SmoothPlayer.Play();
            }

            
            viewModel.isStartoverProgramEnded = false;
        }

        private void syncStartoverArchiveLength()
        {
            if (viewModel.startoverProgram != null)
            {
            }
        }

        private void SmoothPlayer_MediaOpened(object sender, RoutedEventArgs e)
        {
            viewModel.isProgressBarHalted = false;
        }

        private void SmoothPlayer_SmoothStreamingErrorOccurred(object sender, SmoothStreamingErrorEventArgs e)
        {
            viewModel.isProgressBarHalted = false;
        }

        private void progressBarInnerWrapper_MouseLeftButtonDown(object sender, MouseButtonEventArgs e)
        {
            var startoverLength = getCrntChnlStartOverLength();

            if (isPlayerLoadedWithStream() && !startoverLength.Equals(""))
            {
                isProgressBarInnerWrapperMouseDown = true;
            }
        }

        private void progressBarInnerWrapper_MouseLeftButtonUp(object sender, MouseButtonEventArgs e)
        {
            if (isProgressBarInnerWrapperMouseDown)
            {
                Point point = e.GetPosition(progressBarInnerWrapper);
                performMouseMoveOnProgressBar(point.X);
            }

            isProgressBarInnerWrapperMouseDown = false;
            volumBarGridOutterContainer.Background = null;

            progressBarCentralTimer.Visibility = System.Windows.Visibility.Collapsed;
        }

        private void progressBarInnerWrapper_MouseMove(object sender, MouseEventArgs e)
        {
            Point point = e.GetPosition(progressBarInnerWrapper);

            performMouseMoveOnProgressBar(point.X);
        }

        private void performMouseMoveOnProgressBar(double xPos)
        {
            if (isProgressBarInnerWrapperMouseDown)
            {
                volumBarGridOutterContainer.Background = new SolidColorBrush(Colors.Transparent);

                if (xPos < 1)
                {
                    xPos = 0;
                }
                else if (xPos > progressBarInnerWrapper.ActualWidth - 1)
                {
                    xPos = progressBarInnerWrapper.ActualWidth - 1;
                }

                if (isPlayerLoadedWithStream() && !viewModel.isPlyrErrMsgGrdVisible)
                {
                    var temp = xPos;

                    if (temp > progressBarInnerWrapper.ActualWidth - 25)
                    {
                        //temp = (progressBarInnerWrapper.ActualWidth - 5);
                    }

                    if (viewModel.isInStartoverMode)
                    {
                        progressBarInnerWrapperClickedXPosition = (int)temp;

                        progressBarLeft.CornerRadius = new CornerRadius(8, 0, 0, 8);
                        progressBarMiddle.CornerRadius = new CornerRadius(0, 8, 8, 0);

                        if (temp > progressBarInnerWrapper.ActualWidth - 26)
                        {
                            progressBarLeftSecondary.Visibility = System.Windows.Visibility.Visible;
                            progressBarLeftSecondary.Width = progressBarInnerWrapper.ActualWidth - 15;
                            progressBarMiddleSecondary.Visibility = System.Windows.Visibility.Visible;
                            progressBarMiddleSecondary.Width = progressBarLeft.Width + progressBarMiddle.Width;
                            progressBarMiddleSecondary.Margin = new Thickness(temp + 10, 0, 0, 0);

                            progressBarLeftSecondary.CornerRadius = new CornerRadius(8, 8, 8, 8);
                            progressBarMiddleSecondary.CornerRadius = new CornerRadius(8, 8, 8, 8);

                            progressBarThumbImg.Margin = new Thickness(progressBarInnerWrapper.ActualWidth - 26, 0, 0, 0);
                        }
                        else
                        {

                            progressBarLeftSecondary.Visibility = System.Windows.Visibility.Visible;
                            progressBarLeftSecondary.Width = temp + 10;
                            progressBarMiddleSecondary.Visibility = System.Windows.Visibility.Visible;
                            progressBarMiddleSecondary.Width = progressBarLeft.Width + progressBarMiddle.Width - temp - 10;
                            progressBarMiddleSecondary.Margin = new Thickness(temp + 10, 0, 0, 0);

                            progressBarLeftSecondary.CornerRadius = new CornerRadius(8, 8, 8, 8);
                            progressBarMiddleSecondary.CornerRadius = new CornerRadius(8, 8, 8, 8);

                            progressBarThumbImg.Margin = new Thickness(temp - 2, 0, 0, 0);
                        }

                        var programLength = (viewModel.startoverProgram.ProgEndTimeNonUTC - viewModel.startoverProgram.LinearStartDateTime.ToLocalTime()).TotalSeconds;
                        var ratio = temp / progressBarInnerWrapper.ActualWidth;

                        int seconds = (int)Math.Floor(ratio * programLength);

                        if (seconds > programLength)
                        {
                            seconds = (int)programLength;
                        }

                        //var leftMinutes = (int)Math.Floor(seconds / 60);
                        //var leftSeconds = (int)Math.Floor(seconds - leftMinutes * 60);
                        DateTime today = DateTime.Today;
                        DateTime dt = today.AddSeconds(seconds);

                        progressBarCentralTimer.Visibility = System.Windows.Visibility.Visible;
                        progressBarCentralTimerText.Text = dt.Hour.ToString("00") + ":" + dt.Minute.ToString("00") + ":" + dt.Second.ToString("00");
                    }
                    else if (viewModel.isInTimeShiftMode)
                    {
                        if (temp > progressBarLeft.ActualWidth + progressBarMiddle.ActualWidth - 10)
                        {
                            temp = progressBarLeft.ActualWidth + progressBarMiddle.ActualWidth - 10;
                            progressBarThumbImg.Margin = new Thickness(temp, 0, 0, 0);
                        }
                        else
                        {
                            progressBarThumbImg.Margin = new Thickness(temp - 2, 0, 0, 0);
                        }

                        progressBarLeftSecondary.Visibility = System.Windows.Visibility.Visible;
                        progressBarLeftSecondary.Width = temp + 10;
                        progressBarMiddleSecondary.Visibility = System.Windows.Visibility.Visible;
                        progressBarMiddleSecondary.Width = progressBarLeft.Width + progressBarMiddle.Width - temp - 10;
                        progressBarMiddleSecondary.Margin = new Thickness(temp + 10, 0, 0, 0);

                        var programLength = (viewModel.startoverProgram.ProgEndTimeNonUTC - viewModel.startoverProgram.LinearStartDateTime.ToLocalTime()).TotalSeconds;
                        var ratio = temp / progressBarInnerWrapper.ActualWidth;

                        int seconds = (int)Math.Floor(ratio * programLength);

                        if (seconds > programLength)
                        {
                            seconds = (int)programLength;
                        }

                        //var leftMinutes = (int)Math.Floor(seconds / 60);
                        //var leftSeconds = (int)Math.Floor(seconds - leftMinutes * 60);
                        Double tempSeconds = (Double)seconds;
                        DateTime tempStartTime = viewModel.startoverProgram.LinearStartDateTime.ToLocalTime();
                        DateTime newDate = tempStartTime.AddSeconds(tempSeconds);

                        progressBarCentralTimer.Visibility = System.Windows.Visibility.Visible;
                        progressBarCentralTimerText.Text = newDate.Hour.ToString("00") + ":" + newDate.Minute.ToString("00");
                        progressBarInnerWrapperClickedXPosition = (int)temp;
                    }
                    else
                    {
                        if (temp > progressBarLeft.ActualWidth)
                        {
                            temp = progressBarLeft.ActualWidth;
                        }

                        progressBarInnerWrapperClickedXPosition = (int)temp;
                        progressBarThumbImg.Margin = new Thickness(temp, 0, 0, 0);
                    }
                }
            }
        }

        private void progressBarInnerWrapper_MouseLeave(object sender, MouseEventArgs e)
        {
            isProgressBarInnerWrapperMouseDown = false;
            volumBarGridOutterContainer.Background = null;
            progressBarCentralTimer.Visibility = System.Windows.Visibility.Collapsed;
        }

        private void onPlyrNotificationTxtBlk(object sender, RoutedEventArgs e)
        {
            plyrNotificationGrid.Visibility = System.Windows.Visibility.Collapsed;
        }

        private void SmoothPlayer_ChunkDownloadFailed(object sender, ChunkDownloadedEventArgs e)
        {
        }

        private void SmoothPlayer_MediaFailed(object sender, ExceptionRoutedEventArgs e)
        {
        }

        internal void onDeviceTimeInCorrectError(string responseStr)
        {
            if (!isTimerMessageVisible)
            {
                isTimerMessageVisible = true;
                mainTimer.Stop();
                plyrErrorMsgGrid.Visibility = System.Windows.Visibility.Collapsed;
                plyrNotificationGrid.Visibility = System.Windows.Visibility.Collapsed;
                if (responseStr != null)
                {
                    responseStr = "[" + responseStr + "]";
                    string errorMsg = (string)HtmlPage.Window.Eval("_wgsbneq.MultiLangSupportModule.getErrorMsg(2,_wgsbneq.config.userPrefLanguage)");
                    string alertMsg = errorMsg + " " + responseStr;
                    HtmlPage.Window.Eval("alert('" + alertMsg + "');window.location = _wgsbneq.config.kplusOTThomePageUrl;");
                }
                else
                {
                    HtmlPage.Window.Eval("alert(_wgsbneq.MultiLangSupportModule.getErrorMsg(2,_wgsbneq.config.userPrefLanguage));window.location = _wgsbneq.config.kplusOTThomePageUrl;");
                }
            }
        }

        private void SmoothPlayer_ManifestReady(object sender, EventArgs e)
        {
            viewModel.isProgressBarHalted = false;
        }


        internal void showTimeoutError(string responseStr)
        {
            preloadingFlashScrnGrid.Visibility = System.Windows.Visibility.Collapsed;
            var errorMsg = (string)HtmlPage.Window.Eval("_wgsbneq.MultiLangSupportModule.getErrorMsg(1,_wgsbneq.config.userPrefLanguage)");
            viewModel.plyrErrMsgIndex = 1;
            displayPlyrErrorMsg(errorMsg, false, responseStr);
            return;
        }
    }
}