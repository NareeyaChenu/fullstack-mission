using System.Text;
using Microsoft.AspNetCore.Mvc;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;

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
        public ActionResult Post([FromRoute] string clientId, [FromBody] object content)
        {
        
            return Ok();
        }
    }
}