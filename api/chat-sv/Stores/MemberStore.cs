using chat_sv.DTOs.member;

namespace chat_sv.Stores
{
    public static class MemberStore
    {
        public static List<MemberModel> Members = new List<MemberModel>
        {
            new MemberModel {MemberId = "f90c2730-9ef0-11ee-8c90-0242ac120002" ,MemberName = "Lisa" , ImageUrl = "https://f.ptcdn.info/954/081/000/s2c32h11gb0QkX018xNGO-o.jpg"},
            new MemberModel {MemberId = "f90c29ec-9ef0-11ee-8c90-0242ac120002" ,MemberName = "Jisoo" , ImageUrl = "https://cdn.shopify.com/s/files/1/0469/3927/5428/t/21/assets/bildschirmfoto20230102um142358--edited-1672668816767.jpg?v=1672668819"},
            new MemberModel {MemberId = "f90c2b36-9ef0-11ee-8c90-0242ac120002" ,MemberName = "Jennie" , ImageUrl = "https://kpopping.com/documents/99/0/800/0000036936_001_20171015101026108.jpeg?v=f8d3c"},
            new MemberModel {MemberId = "f90c2cbc-9ef0-11ee-8c90-0242ac120002" ,MemberName = "Rose`" , ImageUrl = "https://qph.cf2.quoracdn.net/main-qimg-7cad1d080ffa61cfc62c9c9dfd4f2aad-lq"},
        };
    }
}