using chat_sv.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace chat_sv.Controllers
{
    [ApiController]
    [Route("api/v1/member")]
    public class MemberController : ControllerBase
    {
        private readonly IMemberService _memberService;
        public MemberController(IMemberService memberService)
        {
            _memberService = memberService;
        }

        [HttpGet]
        public ActionResult QueryMember ()
        {
            return _memberService.QueryMembers();
        }
        [HttpGet]
        [Route("{id}")]
        public ActionResult QueryMember ([FromRoute] string id)
        {
            return _memberService.GetMemberbyId(id);
        }
    }
}