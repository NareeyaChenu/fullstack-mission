using Newtonsoft.Json;

namespace chat_sv.DTOs.message
{
    public class EventModel
    {
        [JsonProperty("type")]
        public string? Type { get; set; }
    }
}