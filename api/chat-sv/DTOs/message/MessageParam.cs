using Microsoft.AspNetCore.Mvc;

namespace chat_sv.DTOs.message
{
    public class MessageParam
    {
        [FromQuery(Name = "member_id")]
        public string? MemberId { get; set; }
        [FromQuery(Name = "channel_id")]
        public string? ChannelId { get; set; }
    }
}