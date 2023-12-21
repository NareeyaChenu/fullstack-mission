using System;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.Hosting;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;

namespace chat_sv.BgService
{
    public class BgService : IHostedService
    {
        private readonly CancellationTokenSource _stoppingCts = new CancellationTokenSource();

        public Task StartAsync(CancellationToken cancellationToken)
        {
            var rabbitMqHost = "amqp://guest:guest@192.168.49.2:30672";
            var queueName = "webhook_to_chat_queue"; // Should match the queue name used by the publisher

            var factory = new ConnectionFactory
            {
                Uri = new Uri(rabbitMqHost),
            };

            var completionSource = new TaskCompletionSource<object>();

            Task.Run(() =>
            {
                using (var connection = factory.CreateConnection())
                using (var channel = connection.CreateModel())
                {
                    channel.QueueDeclare(queue: queueName, durable: false, exclusive: false, autoDelete: false, arguments: null);

                    var consumer = new EventingBasicConsumer(channel);
                    consumer.Received += (model, ea) =>
                    {
                        var body = ea.Body;
                        var message = Encoding.UTF8.GetString(body.ToArray());

                        Console.WriteLine($" [x] Received '{message}' from {queueName}");
                    };

                    channel.BasicConsume(queue: queueName, autoAck: true, consumer: consumer);

                    Console.WriteLine($"Waiting for messages from {queueName}. Press [enter] to exit.");

                    completionSource.SetResult(null!);
                }
            }, _stoppingCts.Token);

            // Return the task that represents the service startup
            return completionSource.Task;
        }

        public async Task StopAsync(CancellationToken cancellationToken)
        {
            // Implement graceful shutdown if needed
            _stoppingCts.Cancel();

            // Wait for the background task to complete
            await Task.CompletedTask;
        }
    }
}
