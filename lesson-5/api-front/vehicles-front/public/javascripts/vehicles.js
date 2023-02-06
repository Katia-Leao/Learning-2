function getAllVehicles() {
  const endpoint = `http://localhost:1234/`;

  const config = {
    method: "GET",
  };

  fetch(endpoint, config)
    .then((res) => res.json())
    .then((vehicles) => {
      document.querySelector("tbody").innerHTML = vehicles
        .map(function (vehicle, index) {
          return `<tr>
                    <th scope="row">${vehicle.id}</th>
                    <td>${vehicle.model}</td>
                    <td>${vehicle.brand}</td>
                    <td>${vehicle.price}</td>
                </tr>`;
        })
        .join("");
    })
    .catch(() => console.error("Falha na comunicação"))
    .catch(() => console.error("Falha na comunicação"));
}

getAllVehicles();
