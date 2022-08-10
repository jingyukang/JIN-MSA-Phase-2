using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using System;
using System.IO;
using backend.Model;
using System.Collections.Generic;
using Newtonsoft.Json;
using System.Linq;

namespace backend.Repositories
{
    public interface IDemonstrationRepository
    {
        public int GetSum(int a, int b);
        public double GetRandom();
        public List<DataModel> CreateData(string name, string description);
        public List<DataModel> ReadData();
        public List<DataModel> UpdateData(int id, string newName, string newDescription);
        public List<DataModel> DeleteData(int id);

    }

    public class DemonstrationRepository : IDemonstrationRepository
    {
        const string filePath = "Data/data.json";

        public int GetSum(int left, int right)
        {
            return (left + right);
        }

        public double GetRandom()
        {
            return new Random().NextDouble();
        }

        public List<DataModel> CreateData(string name, string description)
        {
            //Read Data
            var jsonObject = ReadData();

            //Create Data
            jsonObject.Add(new DataModel { Id = jsonObject.LastOrDefault().Id + 1, Name = name, Description = description });
            SaveData(jsonObject);

            //Read updated Data
            return ReadData();
        }

        public List<DataModel> ReadData()
        {
            //Read Data
            var text = File.ReadAllText(filePath);
            var jsonObject = JsonConvert.DeserializeObject<List<DataModel>>(text);
            return jsonObject;
        }

        public List<DataModel> UpdateData(int id, string newName, string newDescription)
        {
            //Read Data
            var jsonObject = ReadData();

            //Update Data
            var updateInfo = jsonObject.FirstOrDefault(item => item.Id == id);
            var index = jsonObject.IndexOf(updateInfo);
            jsonObject[index].Name = newName;
            jsonObject[index].Name = newDescription;
            SaveData(jsonObject);

            //Read updated Data
            return ReadData();
        }

        public List<DataModel> DeleteData(int id)
        {
            //Read Data
            var jsonObject = ReadData();

            //Delete Data
            jsonObject.Remove(jsonObject.FirstOrDefault(item => item.Id == id));
            SaveData(jsonObject);

            //Read updated Data
            return ReadData();
        }

        private void SaveData(List<DataModel> jsonObject)
        {
            File.WriteAllText(filePath, JsonConvert.SerializeObject(jsonObject));
        }
    }
}
