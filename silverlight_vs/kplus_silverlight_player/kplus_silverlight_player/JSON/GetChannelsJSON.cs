using System;
using System.ComponentModel;
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
    public class GetChannelsJSON
    {
        public class RootObject : INotifyPropertyChanged
        {
            private Channel[] _channels;
            public Channel[] Channels
            {
                get { return _channels; }
                set
                {
                    _channels = value;

                    if (PropertyChanged != null)
                    {
                        PropertyChanged(this,
                            new PropertyChangedEventArgs("Channels"));
                    }
                }
            }

            public event PropertyChangedEventHandler PropertyChanged;
        }

        public class Channel : INotifyPropertyChanged
        {
            private Image[] _images;
            private Extraattribute[] _extraAttributes;



            public Int64 ChannelId { get; set; }
            //public int PolicyGroupId { get; set; }
            public string Title { get; set; }
            public object Type { get; set; }
            public string Description { get; set; }
            public bool IsPromotional { get; set; }
            public bool HasCatchup { get; set; }
            public bool HasChildren { get; set; }
            public Image[] Images
            {
                get
                {
                    return _images;
                }
                set
                {
                    _images = value;

                    if (PropertyChanged != null)
                    {
                        PropertyChanged(this,
                            new PropertyChangedEventArgs("Images"));
                    }
                }
            }
            public object[] ChildCategories { get; set; }
            public Extraattribute[] ExtraAttributes
            {
                get
                {
                    return _extraAttributes;
                }
                set
                {
                    _extraAttributes = value;

                    if (PropertyChanged != null)
                    {
                        PropertyChanged(this,
                            new PropertyChangedEventArgs("ExtraAttributes"));
                    }
                }
            }
            public object[] Genres { get; set; }
            public bool IsAuthorized { get; set; }
            public int DisplayOrder { get; set; }

            public event PropertyChangedEventHandler PropertyChanged;
        }

        public class Image : INotifyPropertyChanged
        {
            private String _type;
            private String _url;

            public string Type
            {
                get
                {
                    return _type;
                }
                set
                {
                    _type = value;

                    if (PropertyChanged != null)
                    {
                        PropertyChanged(this,
                            new PropertyChangedEventArgs("Type"));
                    }
                }
            }
            public string Url
            {
                get { return _url; }
                set
                {
                    _url = value;
                    if (PropertyChanged != null)
                    {
                        PropertyChanged(this,
                            new PropertyChangedEventArgs("Url"));
                    }
                }
            }

            public event PropertyChangedEventHandler PropertyChanged;
        }

        public class Extraattribute : INotifyPropertyChanged
        {
            private String _name;
            private String _value;


            public string Name
            {
                get { return _name; }
                set
                {
                    _name = value;
                    if (PropertyChanged != null)
                    {
                        PropertyChanged(this,
                            new PropertyChangedEventArgs("Name"));
                    }
                }
            }
            public string Value
            {
                get { return _value; }
                set
                {
                    _value = value;
                    if (PropertyChanged != null)
                    {
                        PropertyChanged(this,
                            new PropertyChangedEventArgs("Value"));
                    }
                }
            }

            public event PropertyChangedEventHandler PropertyChanged;
        }
    }
   

}