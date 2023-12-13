using chat_sv.Interfaces;
using chat_sv.Stores;
using Microsoft.AspNetCore.Mvc;

namespace chat_sv.Services
{
    public class MemberService : ControllerBase ,IMemberService
    {
        private readonly ILogger<MemberService> _logger;
        public MemberService(ILogger<MemberService> logger)
        {
            _logger = logger;
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
            var users = MemberStore.Members;

            return Ok(users);
        }
    }
}