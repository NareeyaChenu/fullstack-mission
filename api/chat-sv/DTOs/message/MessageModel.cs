using Newtonsoft.Json;

namespace chat_sv.DTOs.message
{
    public class MessageModel
    {
        public MessageModel()
        {
            MessageId = Guid.NewGuid().ToString();
            Event = new EventModel();
            MessageObjects = new List<MessageObjectModel>();
        }
        [JsonProperty("message_id")]
        public string? MessageId { get; set; }
        [JsonProperty("member_id")]
        public string? MemberId { get; set; }
        [JsonProperty("channel_id")]
        public string? ChannelId { get; set; }

        [JsonProperty("event")]
        public EventModel Event {get; set;}

        [JsonProperty("message_objects")]
        public List<MessageObjectModel> MessageObjects {get; set;}
    }
}