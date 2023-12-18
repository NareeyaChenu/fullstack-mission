using Microsoft.AspNetCore.Mvc;

namespace webhook_sv.Controllers
{
    [ApiController]
    [Route("webhook/v1")]
    public class WebhookController : ControllerBase
    {
        private ILogger<WebhookController> _logger;
        public WebhookController(ILogger<WebhookController> logger)
        {
            _logger = logger;
        }

        [HttpPost]
        [Route("line/{clientId}")]
        public ActionResult Post ([FromRoute]string clientId , [FromBody] object content)
        {
            _logger.LogInformation($"client is is {clientId}");
            _logger.LogInformation($"content : {content}");

            return Ok();
        }
    }
}