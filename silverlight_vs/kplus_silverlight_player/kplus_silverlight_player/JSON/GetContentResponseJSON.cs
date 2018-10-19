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
    public class GetContentResponseJSON
    {

        public class Rootobject
        {
            public Content[] Contents { get; set; }
        }

        public class Content
        {
            public string ContentId { get; set; }
            public string Title { get; set; }
            public string Description { get; set; }
            public string Type { get; set; }
            public string ParentalControlLevel { get; set; }
            public string[] Genres { get; set; }
            public string DurationSeconds { get; set; }
            public DateTime? LinearStartDateTime { get; set; }
            public string IsAuthorized { get; set; }
            public string IsDownloadable { get; set; }
            public string DisplayOrder { get; set; }
            public string ChannelId { get; set; }
            public string ChannelName { get; set; }
            public string ChannelLogo { get; set; }
            public string AvailableStartDateTime { get; set; }
            public string AvailableEndDateTime { get; set; }
            public string TrackId { get; set; }
            public Policyoption[] PolicyOptions { get; set; }
            public string Rating { get; set; }
            public string Score { get; set; }
            public string SeriesId { get; set; }
            public string SeriesName { get; set; }
            public string IsMovie { get; set; }
            public string IsSeries { get; set; }
            public string IsCatchup { get; set; }
            public string yearOfRelease { get; set; }
            public string CountryOfOrigin { get; set; }
            public object[] Languages { get; set; }
            public object[] Subtitles { get; set; }
            public object[] Episodes { get; set; }
            public object[] Similar { get; set; }
            public string HasTrailer { get; set; }
            public object[] PurchaseOptions { get; set; }
            public string OttEnabled { get; set; }
            public string Rebroadcast { get; set; }
            public string SubTitle { get; set; }
            public Persons Persons { get; set; }
            public Images Images { get; set; }
            public Additionalinfo AdditionalInfo { get; set; }
        }

        public class Persons
        {
            public string[] Actor { get; set; }
            public string[] Director { get; set; }
        }

        public class Images
        {
        }

        public class Additionalinfo
        {
            public string DurationSeconds { get; set; }
            public string OTTEnabled { get; set; }
            public Rebroadcast[] Rebroadcast { get; set; }
            public string SubTitle { get; set; }
        }

        public class Rebroadcast
        {
            public string ChannelId { get; set; }
            public DateTime StartTime { get; set; }
        }

        public class Policyoption
        {
            public string PricingType { get; set; }
            public float OriginalPrice { get; set; }
            public float CurrentPrice { get; set; }
            public string CurrencyCode { get; set; }
        }

    }
}