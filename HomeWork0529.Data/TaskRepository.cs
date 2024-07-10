using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.NetworkInformation;
using System.Text;
using System.Threading.Tasks;

namespace HomeWork0529.Data
{
    public class TaskRepository
    {
        private readonly string _connectionString;

        public TaskRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

        public List<TaskItem> GetAll()
        {
            using var context = new TasksDataContext(_connectionString);
            return context.TaskItems.ToList();
        }

        public TaskItem Add(string taskItem)
        {
            using var context = new TasksDataContext(_connectionString);
            context.Database.ExecuteSqlInterpolated($"INSERT INTO TaskItems (Title) VALUES ({taskItem})");
            return context.TaskItems.OrderByDescending(t1 => t1.Id).FirstOrDefault(t => t.Title == taskItem);
        }

        public TaskItem UpdateStatus(TaskItem ti)
        {
            using var context = new TasksDataContext(_connectionString);
            context.Database.ExecuteSqlInterpolated($"UPDATE TaskItems SET Status = {ti.Status}, UserID = {ti.UserId} WHERE Id = {ti.Id}");
            var t = context.TaskItems.FirstOrDefault(t => t.Id == ti.Id);
            Console.WriteLine($"t: { t.Id}, {t.Title}, {t.Status}, {t.UserId}");
            return t;
        }

        public void DeleteTask(int id)
        {
            using var context = new TasksDataContext(_connectionString);
            context.Database.ExecuteSqlInterpolated($"DELETE TaskItems WHERE Id = {id}");
        }
    }
}
