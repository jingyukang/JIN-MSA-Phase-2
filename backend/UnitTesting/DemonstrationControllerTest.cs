using NUnit.Framework;
using backend.Controllers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;

namespace UnitTesting
{
    public class Tests
    {
        private DemonstrationController _demonstrationController;
        [SetUp]
        public void Setup()
        {
            _demonstrationController = new DemonstrationController();
        }

        [Test]
        public void DemonstrationControllerSuccessGetSum()
        {
            // Arrange
            var num1 = 1;
            var num2 = 2;

            // Act
            var okResult = _demonstrationController.GetSum(num1, num2) as ObjectResult;

            // Assert
            Assert.IsNotNull(okResult);
            Assert.True(okResult is OkObjectResult);
            Assert.AreEqual(okResult.StatusCode, StatusCodes.Status200OK);
            Assert.AreEqual(num1 + num2, okResult.Value);
        }

        [Test]
        public void DemonstrationControllerFailureGetSum()
        {
            // Arrange
            var num1 = -1;
            var num2 = 2;

            // Act
            var badRequestResult = _demonstrationController.GetSum(num1, num2) as ObjectResult;

            // Assert
            Assert.IsNotNull(badRequestResult);
            Assert.True(badRequestResult is BadRequestObjectResult);
            Assert.AreEqual(badRequestResult.StatusCode, StatusCodes.Status400BadRequest);
        }
    }
}