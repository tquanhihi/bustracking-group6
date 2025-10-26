import BusList from '../../components/BusList';
import MapView from '../../components/MapView';

export default async function Buses() {
  // fetch buses from our mock API on the server
  let buses = [];
  try {
    const res = await fetch('http://localhost:3000/api/buses');
    if (res.ok) buses = await res.json();
  } catch (e) {
    // fallback to local sample
    buses = [
      { id: 1, licensePlate: '51B-00001', driverName: 'Trần Công', routeName: 'Tuyến 1', lat: 10.7769, lng: 106.7009 },
      { id: 2, licensePlate: '51B-00002', driverName: 'Lê Bình', routeName: 'Tuyến 2', lat: 10.78, lng: 106.695 },
    ];
  }

  const markers = buses.map((b) => ({ id: b.id, lat: b.lat, lng: b.lng, label: `${b.licensePlate} - ${b.driverName}` }));

  return (
    <div className="container mt-4">
      <h2>Danh sách xe buýt</h2>

      <div style={{ marginBottom: 20 }}>
        <MapView markers={markers} height={360} />
      </div>

      <BusList buses={buses} />
    </div>
  );
}

