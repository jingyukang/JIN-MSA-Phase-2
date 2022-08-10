using backend.Repositories;
using Microsoft.AspNetCore.Mvc;
using System;

namespace backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class DemonstrationController : Controller
    {
        private readonly IDemonstrationRepository _demonstrationRepository;

        public DemonstrationController(IDemonstrationRepository demonstrationRepository)
        {
            _demonstrationRepository = demonstrationRepository;
        }

        /// <summary>
        /// Adds two numbers together
        /// </summary>
        /// <param name="left">The number on the left, which must be a positive integer</param>
        /// <param name="right">The number on the right, which must be a positive integer</param>
        /// <returns>The sum of the input numbers</returns>
        [HttpGet]
        [Route("add")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        public IActionResult GetSum(int left, int right)
        {
            if (left < 0 || right < 0) {
                return BadRequest("The inputs must be greater than zero");
            }
            else
            {
                return Ok(_demonstrationRepository.GetSum(left, right));
            }
        }

        /// <summary>
        /// Generates a random number
        /// </summary>
        /// <returns>A random number</returns>
        [HttpGet]
        [ProducesResponseType(200)]
        public IActionResult GetNumber() {
            return Ok(_demonstrationRepository.GetRandom());
        }

        /// <summary>
        /// Demonstrates Posting action
        /// </summary>
        /// <param name="name"></param>
        /// <param name="discription"></param>
        /// <returns>A 201 Created response</returns>
        [HttpPost]
        [ProducesResponseType(201)]
        public IActionResult CreateData(string name, string discription)
        {
            if (name == null || discription == null)
            {
                return BadRequest("Name and description text areas must be filled");
            }
            return Ok(_demonstrationRepository.CreateData(name, discription));
        }

        /// <summary>
        /// Demonstrates Reading action
        /// </summary>
        /// <returns>Data</returns>
        [HttpGet]
        [Route("ReadData")]
        [ProducesResponseType(200)]
        public IActionResult ReadData()
        {
            return Ok(_demonstrationRepository.ReadData());
        }

        /// <summary>
        /// Demonstrates Updating action
        /// </summary>
        /// <param name="id">Positive integer for ID</param>
        /// <param name="newName">String for new Name</param>
        /// <param name="newDescription">String for new Description</param>
        /// <returns>A 201 Created data response (PUT)</returns>
        [HttpPut]
        [Route("UpdateData")]
        [ProducesResponseType(201)]
        [ProducesResponseType(400)]
        public IActionResult UpdateData(int id, string newName, string newDescription)
        {
            
            if (id <= 0)
            {
                return BadRequest("The ID must be greater than zero");
            }
            else if (newName == null || newDescription == null)
            {
                return BadRequest("New name and description text areas must be filled");
            }
            return Ok(_demonstrationRepository.UpdateData(id, newName, newDescription));
        }

        /// <summary>
        /// Demonstrates a delete action
        /// </summary>
        /// <param name="id">Positive integer for ID to delete</param>
        /// <returns>A 204 No Content Response</returns>
        [HttpDelete]
        [ProducesResponseType(204)]
        public IActionResult DeleteData(int id)
        {
            if (id <= 0)
            {
                return BadRequest("The ID must be greater than zero");
            }
            return Ok(_demonstrationRepository.DeleteData(id));
            //return NoContent();
        }
    }
}
