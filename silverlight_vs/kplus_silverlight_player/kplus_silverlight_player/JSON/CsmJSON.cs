using System;
using System.Net;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Documents;
using System.Windows.Ink;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Animation;
using System.Windows.Shapes;

namespace kplus_silverlight_player.JSON
{
    public class CsmJSONResponse
    {
        public class Policy
        {
            public int heartbeatInterval { get; set; }
            public int maxMissedHeartbeats { get; set; }
        }

        public class Signature
        {
            public string keyId { get; set; }
            public string method { get; set; }
            public string value { get; set; }
        }

        public class Heartbeat
        {
            public string status { get; set; }
            public Policy policy { get; set; }
            public Signature signature { get; set; }
        }

        public class RootObject
        {
            public Heartbeat heartbeat { get; set; }
        }
    }
}
