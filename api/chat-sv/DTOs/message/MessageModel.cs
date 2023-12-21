using MongoDB.Bson.Serialization.Attributes;
using Newtonsoft.Json;

namespace chat_sv.DTOs.message
{
    public class MessageModel
    {
        public MessageModel()
        {
           
            Event = new EventModel();
            MessageObjects = new List<MessageObjectModel>();
        }
        
        [JsonProperty("member_id")]
        [BsonElement("member_id")]
        public string? MemberId { get; set; }
        [JsonProperty("channel_id")]
        [BsonElement("channel_id")]
        public string? ChannelId { get; set; }

        [JsonProperty("event")]
        [BsonElement("event")]
        public EventModel Event {get; set;}

        [JsonProperty("message_objects")]
        [BsonElement("message_objects")]
        public List<MessageObjectModel> MessageObjects {get; set;}
    }
}