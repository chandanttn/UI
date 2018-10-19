using System;
using System.Security.Cryptography;

namespace kplus_silverlight_player
{
    public class SignatureCalculator
    {
        public static string CalculateHMAC(string secretKey, string stringToSign)
        {
            byte[] secretBytes = Convert.FromBase64String(secretKey);
            byte[] stringBytes = System.Text.Encoding.UTF8.GetBytes(stringToSign);

            string signature;

            using (var hmac = new HMACSHA256(secretBytes))
            {
                byte[] hash = hmac.ComputeHash(stringBytes);
                signature = Convert.ToBase64String(hash);
            }

            return signature;
        }
    }
}