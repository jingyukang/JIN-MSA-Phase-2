using Microsoft.AspNetCore.Mvc;
using System;

namespace backend.Repositories
{
    public interface IDemonstrationRepository
    {
        public int GetSum(int a, int b);
        public double GetRandom();
    }

    public class DemonstrationRepository : IDemonstrationRepository
    {
        public int GetSum(int left, int right)
        {
            return (left + right);
        }

        public double GetRandom()
        {
            return new Random().NextDouble();
        }
    }
}
