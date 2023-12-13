using chat_sv.DTOs.member;

namespace chat_sv.Stores
{
    public static class MemberStore
    {
        public static List<MemberModel> Members = new List<MemberModel>
        {
            new MemberModel {MemberName = "Lisa"},
            new MemberModel {MemberName = "Jisoo"},
            new MemberModel {MemberName = "Jennie"},
            new MemberModel {MemberName = "Rose"},
        };
    }
}