using Newtonsoft.Json;

namespace chat_sv.DTOs.message
{
    public class MessageModel
    {
        public MessageModel()
        {
            Event = new EventModel();
        }
        [JsonProperty("message_id")]
        public string? MessageId { get; set; }
        [JsonProperty("member_id")]
        public string? MemberId { get; set; }

        [JsonProperty("event")]
        public EventModel Event {get; set;}
    }
}