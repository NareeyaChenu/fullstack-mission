using chat_sv.DTOs.message;
using chat_sv.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace chat_sv.Controllers
{
    [ApiController]
    [Route("api/v1/message")]
    public class MessageController : ControllerBase
    {
        private readonly IMessageService _messageService;
        public MessageController(IMessageService messageService)
        {
            _messageService = messageService;
        }


        [HttpGet]

        public ActionResult GetMessages ([FromQuery] MessageParam param)
        {
            return _messageService.GetMessage(param);
        }
    }
}