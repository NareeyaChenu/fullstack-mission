using chat_sv.BgService;
using chat_sv.Interfaces;
using chat_sv.Services;
using Newtonsoft.Json.Serialization;
using RabbitMQ.Client;

var builder = WebApplication.CreateBuilder(args);
var configuration = builder.Configuration;

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddControllers()
    .AddNewtonsoftJson(options =>
    {
        options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
        options.SerializerSettings.ContractResolver = new DefaultContractResolver();
    });
builder.Services.AddOptions();
builder.Services.AddCors(options =>
        {
            options.AddPolicy("chat-sv-core"!, build =>
            {
                build.WithOrigins("*")
                .AllowAnyHeader()
                .AllowAnyMethod();
            });
        });


builder.Services.AddSingleton(sp =>
        {
            var factory = new ConnectionFactory
            {
                Uri = new Uri(configuration["RabbitMq:Host"]!)
                // Add other configuration options as needed
            };
            return factory.CreateConnection();
        });
builder.Services.AddHostedService<BgService>();
// Register RabbitMQService without using it immediately
// services.AddSingleton<RabbitMQService>();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddScoped<IMemberService, MemberService>();
builder.Services.AddScoped<IMessageService, MessageService>();

// builder.Services.AddSingleton<IBasicConnection>(new BasicConnection(configuration["RabbitMq:Host"]!, true));

// // Register message subscriber
// builder.Services.AddSingleton<IMessageSubscriber>(x =>
//     new MessageSubscriber(
//         x.GetRequiredService<IBasicConnection>(),
//         "chat-exhange", // exhange name
//         "chat-queue"!, // queue name
//         "chat.routingKey", // routing key
//         ExchangeType.Fanout, // exchange type
//         autoAck: false,
//         prefetchCount: 100
//     ));

// // Register message publisher
// builder.Services.AddScoped<IMessagePublisher>(x =>
//     new MessagePublisher(
//         x.GetRequiredService<IBasicConnection>(),
//         configuration["chat-exhange"]!, // exhange name
//         ExchangeType.Fanout // exchange type
//     ));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// app.UseHttpsRedirection();

// app.UseAuthorization();

app.UseCors("chat-sv-core");

app.MapControllers();

app.Run();
