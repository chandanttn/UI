using System;
using System.Windows.Browser;

namespace kplus_silverlight_player
{
    public class KpSLappClass
    {
        private MainPage mainPage;

        public KpSLappClass(MainPage uc)
        {
            mainPage = uc;
        }

        [ScriptableMember()]
        public void onGetChannelsResponseRecieved(String responseStr)
        {
            mainPage.onChannelsListRecieved(responseStr);
        }

        [ScriptableMember()]
        public void onGetChannelEPGResponseRecieved(String responseStr)
        {
            mainPage.onChannelEPGRecieved(responseStr);
        }

        [ScriptableMember()]
        public void onAPITimeout(String responseStr)
        {
            mainPage.showTimeoutError(responseStr);
        }

        [ScriptableMember()]
        public void onValidateTokenResponseRecieved(String responseStr)
        {
            mainPage.onTokenRecievedFromWebPage(responseStr);
        }

        [ScriptableMember()]
        public void onGetContentResponseRecieved(String responseStr)
        {
            mainPage.onGetContentRespRcvd(responseStr);
        }

        [ScriptableMember()]
        public void onGetContentResponseRecievedForStartover(String responseStr)
        {
            mainPage.onGetContentResponseRecievedForStartover(responseStr);
        }

        [ScriptableMember()]
        public void setUserToken(String responseStr)
        {
            mainPage.onTokenRecievedFromWebPage(responseStr);
        }

        [ScriptableMember()]
        public void onCSMrespNOKrcvd(String responseStr)
        {
            mainPage.onCSMheartbeatNOKrcvd(responseStr);
        }

        /*
         * CSM Refactor
         * show CSM Error
         */
        [ScriptableMember()]
        public void showCSMError()
        {
            mainPage.forceCSMError();
        }
        [ScriptableMember()]
        public void undoOverlayDisappear()
        {
            mainPage.undoMouseNOverlayDisappearnce();
        }

        [ScriptableMember()]
        public void onIsAliveApiRspnsRcvd(String responseStr)
        {
            mainPage.onFngrPrntApiRspnsRcvd(responseStr);
        }

        [ScriptableMember()]
        public void onFPBlockedUsrStatusConfirm(String responseStr)
        {
            mainPage.onFPBlockedUsrStatusConfirm(responseStr);
        }

        [ScriptableMember()]
        public void onDeviceTimeInCorrectError(string responseStr)
        {
            mainPage.onDeviceTimeInCorrectError(responseStr);
        }
    }
}