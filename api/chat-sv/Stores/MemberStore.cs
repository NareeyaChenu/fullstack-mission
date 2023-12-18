using chat_sv.DTOs.member;

namespace chat_sv.Stores
{
    public static class MemberStore
    {
        public static List<MemberModel> Members = new List<MemberModel>
        {
            new MemberModel {MemberName = "Lisa" , ImageUrl = "https://f.ptcdn.info/954/081/000/s2c32h11gb0QkX018xNGO-o.jpg"},
            new MemberModel {MemberName = "Jisoo" , ImageUrl = "https://cdn.shopify.com/s/files/1/0469/3927/5428/t/21/assets/bildschirmfoto20230102um142358--edited-1672668816767.jpg?v=1672668819"},
            new MemberModel {MemberName = "Jennie" , ImageUrl = "https://kpopping.com/documents/99/0/800/0000036936_001_20171015101026108.jpeg?v=f8d3c"},
            new MemberModel {MemberName = "Rose`" , ImageUrl = "https://qph.cf2.quoracdn.net/main-qimg-7cad1d080ffa61cfc62c9c9dfd4f2aad-lq"},
        };
    }
}