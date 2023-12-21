using chat_sv.DTOs.message;
using chat_sv.Interfaces;
using chat_sv.Models;
using chat_sv.Stores;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using MongoDB.Driver;
using Newtonsoft.Json;

namespace chat_sv.Services
{
    public class MessageService : ControllerBase , IMessageService
    {
        private readonly IMongoCollection<BsonDocument> _messageCols;
        public MessageService()
        {
            var client = new MongoClient("mongodb://192.168.49.2:30017/?authSource=admin");
            var db = client.GetDatabase("example");
            _messageCols = db.GetCollection<BsonDocument>("message_cols");
        }
        public async Task<ActionResult> CreateMessage(MessageModel model)
        {
            var message = JsonConvert.DeserializeObject<Message>(JsonConvert.SerializeObject(model));
            var newMsg = BsonDocument.Parse(JsonConvert.SerializeObject(message));
            await _messageCols.InsertOneAsync(newMsg);

            return Ok();
        }

        public ActionResult GetMessage(MessageParam param)
        {
            var messages = MessageStore.Messages;

            messages = messages.Where(x => x.MemberId == param.MemberId).ToList();

            return Ok(messages);
        }
    }
}