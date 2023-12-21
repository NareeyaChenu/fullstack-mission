using chat_sv.Interfaces;
using chat_sv.Stores;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using MongoDB.Driver;

namespace chat_sv.Services
{
    public class MemberService : ControllerBase ,IMemberService
    {
        private readonly ILogger<MemberService> _logger;

        private readonly IMongoCollection<BsonDocument>  _memberCols;
        public MemberService(ILogger<MemberService> logger)
        {
            _logger = logger;
            var client = new MongoClient("mongodb://192.168.49.2:30017/?authSource=admin");
            var db = client.GetDatabase("example");
            _memberCols = db.GetCollection<BsonDocument>("member_cols");
        }

        public ActionResult Create(string name)
        {
            var newMember = new BsonDocument
            {
                {"name" , name}
            };

            _memberCols.InsertOne(newMember);

            return Ok(newMember.ToJson());
        }

        public ActionResult GetMemberbyId(string id)
        {
            if(string.IsNullOrEmpty(id))
            {
                var message = "<center><h1>id is required.</h1>/center>";

                return BadRequest(message);
               
            }

            var user = MemberStore.Members.FirstOrDefault(x => x.MemberId == id);
            if(user == null)
            {
                var message = $"<center>user with id {id} does not exist</center>";
                return Content(message, "text/html");

            }

            return Ok(user);
        }

        public ActionResult QueryMembers()
        {
            // var users = _memberCols.Find(_ => true).ToEnumerable();
            var users = MemberStore.Members;

            return Ok(users);
        }
    }
}