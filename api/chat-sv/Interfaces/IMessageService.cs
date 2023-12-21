using chat_sv.DTOs.message;
using Microsoft.AspNetCore.Mvc;

namespace chat_sv.Interfaces
{
    public interface IMessageService 
    {
        public ActionResult GetMessage (MessageParam param);
        public Task<ActionResult> CreateMessage (MessageModel model) ;
    }
}