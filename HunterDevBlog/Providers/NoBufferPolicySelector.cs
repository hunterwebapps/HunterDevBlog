using System.Net.Http;
using System.Web;
using System.Web.Http.WebHost;

namespace HunterDevBlog.Providers
{
    public class NoBufferPolicySelector : WebHostBufferPolicySelector
    {
        public override bool UseBufferedInputStream(object hostContext)
        {
            if (hostContext is HttpContextBase context)
                if (context.Request.Url.AbsolutePath.ToLower().Contains("api/images"))
                    return false;

            return true;
        }

        public override bool UseBufferedOutputStream(HttpResponseMessage response)
        {
            return base.UseBufferedOutputStream(response);
        }
    }
}