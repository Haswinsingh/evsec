function UsageChart() {
  const data = [80, 78, 75, 73, 70, 68, 65];

  return (
    <div className="card">
      <h3>Last 7 Days Battery Usage</h3>
      <ul>
        {data.map((d, i) => (
          <li key={i}>Day {i + 1}: {d}%</li>
        ))}
      </ul>
    </div>
  );
}

export default UsageChart;
