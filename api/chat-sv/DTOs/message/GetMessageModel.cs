using chat_sv.Models;
using MongoDB.Bson.Serialization.Attributes;
using Newtonsoft.Json;

namespace chat_sv.DTOs.message
{
    public class GetMessageModel : Message
    {
        [JsonProperty("message_id")]
        [BsonElement("message_id")]
        public override string? MessageId { get => base.MessageId; set => base.MessageId = value; }
    }
}