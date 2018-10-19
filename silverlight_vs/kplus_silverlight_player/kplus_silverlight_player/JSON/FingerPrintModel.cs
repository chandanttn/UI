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

namespace kplus_silverlight_player
{
    public class FingerPrintModel
    {
        public int keyDate { get; set; }
        public FingerPrintChnl[] isAlive { get; set; }
        public Int64[] subList { get; set; }
    }
}
