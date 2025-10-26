export default function BusList({ buses }) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>STT</th>
          <th>Biển số</th>
          <th>Tài xế</th>
          <th>Tuyến</th>
        </tr>
      </thead>
      <tbody>
        {buses.map((bus, idx) => (
          <tr key={bus.id}>
            <td>{idx+1}</td>
            <td>{bus.licensePlate}</td>
            <td>{bus.driverName}</td>
            <td>{bus.routeName}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
