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

    public class Rootobject
    {
        public Additionalinfo AdditionalInfo { get; set; }
    }

    public class Additionalinfo
    {
        public string DurationSeconds { get; set; }
        public string OTTEnabled { get; set; }
    }

}
