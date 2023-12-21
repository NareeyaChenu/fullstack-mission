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
            var rabbitMqHost = "amqp://guest:guest@192.168.49.2:30672";
            var queueName = "webhook_to_chat_queue"; // Choose a queue name

            var factory = new ConnectionFactory
            {
                Uri = new Uri(rabbitMqHost),
            };

            using (var connection = factory.CreateConnection())
            using (var channel = connection.CreateModel())
            {
                channel.QueueDeclare(queue: queueName, durable: false, exclusive: false, autoDelete: false, arguments: null);

                string message = "Data from webhook service";
                var body = Encoding.UTF8.GetBytes(message);

                channel.BasicPublish(exchange: "", routingKey: queueName, basicProperties: null, body: body);

                Console.WriteLine($" [x] Sent '{message}' to {queueName}");
            }
            return Ok();
        }
    }
}