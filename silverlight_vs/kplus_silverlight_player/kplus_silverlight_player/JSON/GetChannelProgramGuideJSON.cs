using System;
using System.ComponentModel;

namespace kplus_silverlight_player
{
    public class GetChannelProgramGuideJSON
    {
        public class Channel : INotifyPropertyChanged
        {
            private Program[] _program;

            public event PropertyChangedEventHandler PropertyChanged;

            public string ChannelId { get; set; }
            public string Description { get; set; }
            public string Image { get; set; }

            public Program[] Programs
            {
                get { return _program; }
                set
                {
                    _program = value;

                    if (PropertyChanged != null)
                    {
                        PropertyChanged(this,
                            new PropertyChangedEventArgs("Programs"));
                    }
                }
            }

            public string Title { get; set; }
            public string Type { get; set; }
        }

        public class Program : INotifyPropertyChanged
        {
            private string _description;
            private string _DurationSeconds;
            private TimeSpan _durationTimeSpan;
            private TimeSpan _elapsedTimeSpan;
            private DateTime _LinearStartDateTime;
            private DateTime _progEndTime;
            private string _progEndTimeNonUTCstr;
            private string _progStartTimeNonUTCstr;
            private string _title;

            private long _timeShiftPlayerStartTime = -1;
            private long _timeShiftElapsedTime = -1;

            public event PropertyChangedEventHandler PropertyChanged;

            public long TimeShiftPlayerStartTime
            {
                get { return _timeShiftPlayerStartTime; }
                set { _timeShiftPlayerStartTime = value; }
            }

            public long TimeShiftElapsedTime
            {
                get { return _timeShiftElapsedTime; }
                set { _timeShiftElapsedTime = value; }
            }

            public Additionalinfo AdditionalInfo { get; set; }
            public string ContentId { get; set; }

            public string Description
            {
                get { return _description; }
                set
                {
                    _description = value;

                    if (PropertyChanged != null)
                    {
                        PropertyChanged(this,
                            new PropertyChangedEventArgs("Description"));
                    }
                }
            }

            public string DurationSeconds
            {
                get { return _DurationSeconds; }
                set
                {
                    _DurationSeconds = value;
                    ProgEndTimeNonUTCstr = _LinearStartDateTime.AddSeconds(Convert.ToDouble(this._DurationSeconds)).ToLocalTime().ToString("HH:mm");
                    ProgEndTimeNonUTC = _LinearStartDateTime.AddSeconds(Convert.ToDouble(this._DurationSeconds)).ToLocalTime();
                    DurationTimeSpan = new TimeSpan(0, 0, 0, Convert.ToInt32(_DurationSeconds));
                    ElapsedTimeSpan = new TimeSpan(0, 0, 0, Convert.ToInt32(_DurationSeconds));

                    if (PropertyChanged != null)
                    {
                        PropertyChanged(this,
                            new PropertyChangedEventArgs("DurationSeconds"));
                    }
                }
            }

            public TimeSpan DurationTimeSpan
            {
                get { return _durationTimeSpan; }
                set { _durationTimeSpan = value; }
            }

            public TimeSpan ElapsedTimeSpan
            {
                get { return _elapsedTimeSpan; }
                set
                {
                    _elapsedTimeSpan = value;
                    if (PropertyChanged != null)
                    {
                        PropertyChanged(this,
                            new PropertyChangedEventArgs("ElapsedTimeSpan"));
                    }
                }
            }

            public string[] Genres { get; set; }

            public DateTime LinearStartDateTime
            {
                get { return _LinearStartDateTime; }
                set
                {
                    _LinearStartDateTime = value;
                    ProgStartTimeNonUTCstr = _LinearStartDateTime.ToLocalTime().ToString("HH:mm");

                    if (PropertyChanged != null)
                    {
                        PropertyChanged(this,
                            new PropertyChangedEventArgs("LinearStartDateTime"));
                    }
                }
            }

            public DateTime ProgEndTimeNonUTC
            {
                get { return _progEndTime; }
                set { _progEndTime = value; }
            }

            public string ProgEndTimeNonUTCstr
            {
                get { return _progEndTimeNonUTCstr; }
                set
                {
                    _progEndTimeNonUTCstr = value;

                    if (PropertyChanged != null)
                    {
                        PropertyChanged(this,
                            new PropertyChangedEventArgs("ProgEndTimeNonUTCstr"));
                    }
                }
            }

            public string ProgStartTimeNonUTCstr
            {
                get { return _progStartTimeNonUTCstr; }
                set
                {
                    _progStartTimeNonUTCstr = value;

                    if (PropertyChanged != null)
                    {
                        PropertyChanged(this,
                            new PropertyChangedEventArgs("ProgStartTimeNonUTCstr"));
                    }
                }
            }

            public string Title
            {
                get { return _title; }
                set
                {
                    _title = value;

                    if (PropertyChanged != null)
                    {
                        PropertyChanged(this,
                            new PropertyChangedEventArgs("Title"));
                    }
                }
            }

            public string Year { get; set; }

            public class Additionalinfo
            {
                public string DurationSeconds { get; set; }
                public string OTTEnabled { get; set; }
            }
        }

        public class Rootobject : INotifyPropertyChanged
        {
            private Channel[] _channels;

            public event PropertyChangedEventHandler PropertyChanged;

            public Channel[] channels
            {
                get { return _channels; }
                set
                {
                    _channels = value;

                    if (PropertyChanged != null)
                    {
                        PropertyChanged(this,
                            new PropertyChangedEventArgs("channels"));
                    }
                }
            }
        }
    }
}