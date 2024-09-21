import React from 'react';
import { Bar } from 'react-chartjs-2';

const Charts = ({ todos }) => {
  const getStatusCounts = () => {
    const counts = { Pending: 0, "In Progress": 0, Completed: 0 };
    todos.forEach(todo => {
      counts[todo.status]++;
    });
    return counts;
  };

  const statusCounts = getStatusCounts();

  const data = {
    labels: ['Pending', 'In Progress', 'Completed'],
    datasets: [
      {
        label: 'Todos',
        data: [statusCounts.Pending, statusCounts["In Progress"], statusCounts.Completed],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(75, 192, 192, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="my-4">
      <h2 className="text-center text-2xl font-semibold">Todo Status Visualization</h2>
      <Bar data={data} />
    </div>
  );
};

export default Charts;
