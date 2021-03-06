﻿using System;
using System.IO;
using System.Net;
using System.Net.Browser;
using System.Windows.Media;

namespace kplus_silverlight_player
{
    public class ManualLicenseAcquirer : LicenseAcquirer
    {
        public string ErrorMessage = string.Empty;
        private string _mediaElementName;
        private string challengeString;

        public ManualLicenseAcquirer(string mediaElementName)
        {
            _mediaElementName = mediaElementName;
        }

        
        protected override void OnAcquireLicense(System.IO.Stream licenseChallenge, Uri licenseServerUri)
        {
            System.Diagnostics.Debug.WriteLine("+++++++++++++++++++++++++");
            ErrorMessage = "";
            StreamReader sr = new StreamReader(licenseChallenge);

            challengeString = sr.ReadToEnd();
            
            Uri resolvedLicenseServerUri;
            if (LicenseServerUriOverride == null)
            {
                string testuri = licenseServerUri.ToString().Replace("&amp;", "&");
                testuri = testuri + "&SessionId=D7D45D8D7090ACD4&Ticket=AFE578D8E05E22DE";

                Uri myUri = new Uri(testuri, UriKind.Absolute);
                resolvedLicenseServerUri = myUri;
            }
            else if (!LicenseServerUriOverride.IsAbsoluteUri)
            {
                string testuri = licenseServerUri.ToString().Replace("&amp;", "&");
                testuri = testuri + LicenseServerUriOverride.ToString();

                Uri myUri = new Uri(testuri, UriKind.Absolute);
                resolvedLicenseServerUri = myUri;
            }
            else
                resolvedLicenseServerUri = LicenseServerUriOverride;
            bool registerResult = WebRequest.RegisterPrefix("http://", WebRequestCreator.ClientHttp);
            
            HttpWebRequest request = WebRequest.Create(resolvedLicenseServerUri) as HttpWebRequest;
            //HttpWebRequest request = (HttpWebRequest)System.Net.Browser.WebRequestCreator.ClientHttp.Create(resolvedLicenseServerUri);

            request.Method = "POST";
            
            request.ContentType = "application/xml";
            
            request.Headers["msprdrm_server_redirect_compat"] = "false";
            request.Headers["msprdrm_server_exception_compat"] = "false";
            
            IAsyncResult asyncResult = request.BeginGetRequestStream(new AsyncCallback(RequestStreamCallback), request);
        }

        protected override void OnCancel()
        {
            base.OnCancel();
        }

       
        private void RequestStreamCallback(IAsyncResult ar)
        {
            HttpWebRequest request = ar.AsyncState as HttpWebRequest;
            
            request.ContentType = "text/xml";
            Stream requestStream = request.EndGetRequestStream(ar);
            StreamWriter streamWriter = new StreamWriter(requestStream, System.Text.Encoding.UTF8);
            streamWriter.Write(challengeString);
            streamWriter.Close();
            
            request.BeginGetResponse(new AsyncCallback(ResponseCallback), request);
        }

        private void ResponseCallback(IAsyncResult ar)
        {
            try
            {
                HttpWebRequest request = ar.AsyncState as HttpWebRequest;
                WebResponse response = request.EndGetResponse(ar);

                StreamReader streamReader = new StreamReader(response.GetResponseStream());
                string responseString = streamReader.ReadToEnd();
                if(responseString.Contains("<StatusCode>"))
                {
                    string secondString = "</CustomData>";
                    int firstPos = responseString.IndexOf("<StatusCode>");
                    int secondpos = responseString.IndexOf(secondString);
                    secondpos += secondString.Length;
                    ErrorMessage = responseString.Substring(firstPos, secondpos - firstPos);
                }


                response.GetResponseStream().Seek(0, SeekOrigin.Begin);               

                SetLicenseResponse(response.GetResponseStream());
                  
                
            }
            catch (ArgumentNullException ex)
            {
                if (ex.InnerException == null)
                    ErrorMessage = ex.Message;
                else
                    ErrorMessage = ex.InnerException.Message;
            }
            catch (WebException webex)
            {
                HttpWebResponse ttt = ((HttpWebResponse)webex.Response);

                //if (webex.Status == WebExceptionStatus.ProtocolError)
                {
                    Console.WriteLine("Status Code : {0}", ((HttpWebResponse)webex.Response).StatusCode);
                    Console.WriteLine("Status Description : {0}", ((HttpWebResponse)webex.Response).StatusDescription);
                }

                if (webex.InnerException == null)
                    ErrorMessage = webex.Message;
                else
                    ErrorMessage = webex.InnerException.Message;
                WebResponse errResp = ((WebException)webex).Response;
                var respStream = errResp.GetResponseStream();
                if (respStream == null)
                {
                    this.CancelAsync();
                    return;
                }
                StreamReader test = new StreamReader(respStream);
                string responseString = test.ReadToEnd();
                string secondString = "</CustomData>";
                int firstPos = responseString.IndexOf("<StatusCode>");
                int secondpos = responseString.IndexOf(secondString);
                if(secondpos == -1)
                {
                    secondString = "</StatusCode>";
                    secondpos = responseString.IndexOf(secondString);
                    secondpos += secondString.Length;
                    ErrorMessage = responseString.Substring(firstPos, secondpos - firstPos);
                }
                else
                {
                    secondpos += secondString.Length;
                    ErrorMessage = responseString.Substring(firstPos, secondpos - firstPos);
                }
                
                SetLicenseResponse(errResp.GetResponseStream());
            }
            catch (InvalidOperationException ex)
            {
                if (ex.InnerException == null)
                    ErrorMessage = ex.Message;
                else
                    ErrorMessage = ex.InnerException.Message;
            }
            catch (NotImplementedException ex)
            {
                if (ex.InnerException == null)
                    ErrorMessage = ex.Message;
                else
                    ErrorMessage = ex.InnerException.Message;
            }
            catch (ArgumentException ex)
            {
                if (ex.InnerException == null)
                    ErrorMessage = ex.Message;
                else
                    ErrorMessage = ex.InnerException.Message;
            }
            catch (Exception ex)
            {
                if (ex.InnerException == null)
                    ErrorMessage = ex.Message;
                else
                    ErrorMessage = ex.InnerException.Message;
            }
        }
    }
}