using System;
using System.Collections.Generic;
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
    public class InterfaceLabelsHolder
    {

        private Dictionary<string, Dictionary<string, string>> englishLabels = new Dictionary<string, Dictionary<string, string>>();
        private Dictionary<string, Dictionary<string, string>> vietnameseLabels = new Dictionary<string, Dictionary<string, string>>();
 

        public InterfaceLabelsHolder()
        {
            loadInterfaceLabelsInAllLangs();
        }

        public string getLabel(string labelTextInEng, string returnedLanguage)
        {
            return "";
        }

        private void loadInterfaceLabelsInAllLangs()
        {
            throw new NotImplementedException();
        }
    }
}
