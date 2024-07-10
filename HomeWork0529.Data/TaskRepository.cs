using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
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
            Console.WriteLine("in function");
            using var context = new TasksDataContext(_connectionString);
            return context.TaskItems.ToList();
        }

        public void Add(TaskItem taskItem)
        {
            using var context = new TasksDataContext(_connectionString);
            context.TaskItems.Add(taskItem);
            context.SaveChanges();
        }

        public TaskItem UpdateStatus(string status, int id, int userId)
        {
            using var context = new TasksDataContext(_connectionString);
            context.Database.ExecuteSqlInterpolated($"UPDATE TaskItems SET Status = {status}, UserID = {userId} WHERE Id = {id}");
            return context.TaskItems.FirstOrDefault(t => t.Id == id);
        }

        public void DeleteTask(int id)
        {
            using var context = new TasksDataContext(_connectionString);
            context.Database.ExecuteSqlInterpolated($"DELETE TaskItems WHERE Id = {id}");
        }
    }
}
