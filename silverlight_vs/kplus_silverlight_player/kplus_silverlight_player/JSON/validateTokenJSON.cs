using System;

namespace kplus_silverlight_player
{

    public class ValidateTokenRespJSON
    {

        public class Rootobject
        {
            public Bbsdata BBSData { get; set; }
            public Irdetosession IrdetoSession { get; set; }
        }

        public class Bbsdata
        {
            public string AuthToken { get; set; }
            public string CreationDate { get; set; }
            public string ExpirationDate { get; set; }
            public string MustRevalidate { get; set; }
            public Userdata UserData { get; set; }
        }

        public class Userdata
        {
            public string SubscriberId { get; set; }
            public bool IsOkLiveTv { get; set; }
            public string Email { get; set; }
            public string FullName { get; set; }
            public string EndOfSubs { get; set; }
            public Packagename[] PackageName { get; set; }
            public string MobileNumber { get; set; }
            public Technicaloffer[] TechnicalOffer { get; set; }
        }

        public class Packagename
        {
            public string Lang { get; set; }
            public string Text { get; set; }
        }

        public class Technicaloffer
        {
            public string DRMPackageId { get; set; }
            public string DRMPolicyId { get; set; }
        }

        public class Irdetosession
        {
            public string AffiliateId { get; set; }
            public string AgentHost { get; set; }
            public string AgentId { get; set; }
            public string Country { get; set; }
            public DateTime CreateTime { get; set; }
            public string CrmId { get; set; }
            public string DeviceId { get; set; }
            public object DeviceType { get; set; }
            public int Error { get; set; }
            public object ErrorMessage { get; set; }
            public DateTime ExpTime { get; set; }
            public int IpCountryConfidence { get; set; }
            public string LeadId { get; set; }
            public int MaxStreams { get; set; }
            public int NoStreams { get; set; }
            public object PGOverwrite { get; set; }
            public int PGRate { get; set; }
            public Regioninfo RegionInfo { get; set; }
            public Concurrentstreaminfo ConcurrentStreamInfo { get; set; }
            public Devicelimitsinfo DeviceLimitsInfo { get; set; }
            public string SessionId { get; set; }
            public string Ticket { get; set; }
            public object Token { get; set; }
            public string UserId { get; set; }
            public string UserIp { get; set; }
        }

        public class Regioninfo
        {
            public string City { get; set; }
            public string CityCode { get; set; }
            public string Connection { get; set; }
            public string ContinentCode { get; set; }
            public string CountryCode { get; set; }
            public string MetroCode { get; set; }
            public string PostalCode { get; set; }
            public string Region { get; set; }
            public string RegionCode { get; set; }
        }

        public class Concurrentstreaminfo
        {
            public string Nonce { get; set; }
            public string SessionToken { get; set; }
            public string Url { get; set; }
            public object MaxStreamsPerUser { get; set; }
            public string MaxMissedHeartbeats { get; set; }
            public string HeartbeatInterval { get; set; }
        }

        public class Devicelimitsinfo
        {
            public int NrOfRegisteredDevices { get; set; }
            public int MaxNrOfDevices { get; set; }
        }

    }
}