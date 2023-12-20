using Newtonsoft.Json;

namespace chat_sv.DTOs.message
{
    public class MessageObjectModel
    {
        [JsonProperty("type")]
        public string?  Type { get; set; }
        [JsonProperty("text")]
        public string?  Text { get; set; }
        [JsonProperty("image")]
        public string?  Image { get; set; }
    }
}