using chat_sv.DTOs.message;
using MongoDB.Bson.Serialization.Attributes;
using Newtonsoft.Json;

namespace chat_sv.Models
{
    public class Message : MessageModel
    {
        public Message()
        {
            MessageId = Guid.NewGuid().ToString();
        }
        [JsonProperty("_id")]
        [BsonElement("_id")]
        public virtual string? MessageId { get; set; }
    }
}