using Microsoft.AspNetCore.Mvc;

namespace chat_sv.Interfaces
{
    public interface IMemberService
    {
        public ActionResult QueryMembers ();

        public ActionResult GetMemberbyId (string id);

        public ActionResult Create (string name);
    }
}