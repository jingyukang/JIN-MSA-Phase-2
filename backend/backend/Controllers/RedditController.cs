using Microsoft.AspNetCore.Mvc;
using System;
using System.Net.Http;
using System.Threading.Tasks;

namespace backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class RedditController : Controller
    {
        private readonly HttpClient _client;

        public RedditController(IHttpClientFactory clientFactory)
        {
            if (clientFactory == null) {
                throw new ArgumentNullException(nameof(clientFactory));
            }
            _client = clientFactory.CreateClient("reddit");
        }

        /// <summary>
        /// Gets the raw JSON for the fot feed in reddit
        /// </summary>
        /// <returns>A JSON object representing the hot feed in reddit</returns>
        [HttpGet]
        [Route("raw")]
        [ProducesResponseType(200)]
        public async Task<IActionResult> GetRawReddit() {
            var res = await _client.GetAsync("");
            var content = await res.Content.ReadAsStringAsync();
            return Ok(content);
        }
    }
}
