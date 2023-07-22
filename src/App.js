import React, { useState } from 'react';

// TrainList component: Display a list of available trains
const TrainList = ({ trains, handleReservation }) => {
  return (
    <div>
      <h2>Available Trains</h2>
      <ul>
        {trains.map((train) => (
          <li key={train.id}>
            {train.name} - {train.departure} to {train.destination}
            <button onClick={() => handleReservation(train)}>Reserve</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

// ReservationForm component: Allow users to input their information
const ReservationForm = ({ selectedTrain, handleConfirm }) => {
  const [name, setName] = useState('');
  const [seatCount, setSeatCount] = useState(1);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Validate the form data, you can add more validation as needed
    if (name.trim() === '' || seatCount <= 0) {
      alert('Please fill in all fields correctly.');
      return;
    }
    handleConfirm({ name, seatCount, train: selectedTrain });
  };

  return (
    <div>
      <h2>Reservation Details</h2>
      <p>Train: {selectedTrain.name}</p>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label>
          Seat Count:
          <input
            type="number"
            value={seatCount}
            onChange={(e) => setSeatCount(parseInt(e.target.value))}
          />
        </label>
        <button type="submit">Confirm Reservation</button>
      </form>
    </div>
  );
};

// Confirmation component: Display reservation details after confirmation
const Confirmation = ({ reservation }) => {
  return (
    <div>
      <h2>Reservation Confirmed</h2>
      <p>Name: {reservation.name}</p>
      <p>Train: {reservation.train.name}</p>
      <p>Seat Count: {reservation.seatCount}</p>
    </div>
  );
};

const App = () => {
  // Sample train data
  const [trains] = useState([
    { id: 1, name: 'Express 123', departure: 'City A', destination: 'City B' },
    { id: 2, name: 'Local 456', departure: 'City C', destination: 'City D' },
    // Add more train data as needed
  ]);

  const [selectedTrain, setSelectedTrain] = useState(null);
  const [reservation, setReservation] = useState(null);

  const handleReservation = (train) => {
    setSelectedTrain(train);
  };

  const handleConfirm = (reservationDetails) => {
    setReservation(reservationDetails);
    setSelectedTrain(null); // Reset selected train after reservation confirmation
  };

  return (
    <div>
      {!selectedTrain && !reservation && <TrainList trains={trains} handleReservation={handleReservation} />}
      {selectedTrain && !reservation && (
        <ReservationForm selectedTrain={selectedTrain} handleConfirm={handleConfirm} />
      )}
      {reservation && <Confirmation reservation={reservation} />}
    </div>
  );
};

export default App;
