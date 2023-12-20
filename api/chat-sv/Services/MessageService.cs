using chat_sv.DTOs.message;
using chat_sv.Interfaces;
using chat_sv.Stores;
using Microsoft.AspNetCore.Mvc;

namespace chat_sv.Services
{
    public class MessageService : ControllerBase , IMessageService
    {
        public ActionResult GetMessage(MessageParam param)
        {
            var messages = MessageStore.Messages;

            messages = messages.Where(x => x.MemberId == param.MemberId).ToList();

            return Ok(messages);
        }
    }
}