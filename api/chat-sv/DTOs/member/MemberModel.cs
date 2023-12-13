using Newtonsoft.Json;

namespace chat_sv.DTOs.member
{
    public class MemberModel
    {
        public MemberModel()
        {
            MemberId = Guid.NewGuid().ToString("N");
        }
        [JsonProperty ("member_id")]
        public string? MemberId {get; set;}
        [JsonProperty ("member_name")]
        public string? MemberName {get; set;}
    }
}