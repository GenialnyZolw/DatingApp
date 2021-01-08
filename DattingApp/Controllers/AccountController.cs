using DattingApp.Data;
using DattingApp.DTOs;
using DattingApp.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace DattingApp.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly DataContext context;

        public AccountController(DataContext context)
        {
            this.context = context;
        }

        [HttpPost("register")]
        public async Task<ActionResult<AppUser>> Register(RegisterDto register)
        {
            if (await UserExists(register.UserName)) return BadRequest("User name is taken, change yours user name");

            using var hmac = new HMACSHA512();

            var user = new AppUser
            {
                UserName = register.UserName.ToLower(),
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(register.Password)),
                PasswordSalt = hmac.Key
            };

            context.Add(user);
            await context.SaveChangesAsync();

            return user;
        }

        [HttpPost("login")]
        public async Task<ActionResult<AppUser>> Login([FromBody] LoginDto login)
        {
            var user = await context.Users.SingleOrDefaultAsync(x => x.UserName == login.UserName);

            if (user == null)
            {
                return Unauthorized("Invalied user");
            }

            using var hmac = new HMACSHA512(user.PasswordSalt);

            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(login.Password));

            for (int i = 0; i < computedHash.Length; i++)
            {
                if (computedHash[i] != user.PasswordHash[i] )
                {
                    return Unauthorized("Invalied password");
                }
            }

            return user;
        }

        private async Task<bool> UserExists(string userName)
        {
            return await context.Users.AnyAsync(x => x.UserName == userName.ToLower());
        }
    }
}
