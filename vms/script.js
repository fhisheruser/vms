const vendorForm = document.getElementById('vendorForm');
const vendorList = document.getElementById('vendorList');

vendorForm.addEventListener('submit', addVendor);

function addVendor(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const vendor = {};
  formData.forEach((value, key) => (vendor[key] = value));
  displayVendor(vendor);
  event.target.reset();
}

function displayVendor(vendor) {
  const listItem = document.createElement('li');
  listItem.innerHTML = `
    <strong>${vendor.name}</strong><br>
    <strong>Shop Name:</strong> ${vendor.shopName || 'N/A'}<br>
    <strong>Address:</strong> ${vendor.address}<br>
    <strong>Phone:</strong> ${vendor.phone}<br>
    <strong>Email:</strong> ${vendor.email}<br>
    <strong>Type:</strong> ${vendor.type}<br>
  `;
  vendorList.appendChild(listItem);
}
function showUPIInput() {
      const vendorUPI = document.getElementById("vendorUPI");
      const upiInputContainer = document.getElementById("upiInputContainer");
      const upiInput = document.getElementById("upiInput");

      const selectedOption = vendorUPI.value;
      upiInput.value = ""; // Clear the input field on change

      if (selectedOption) {
        upiInputContainer.style.display = "block";
        upiInput.disabled = false;
        upiInput.placeholder = `Enter ${selectedOption} UPI Number`;
      } else {
        upiInputContainer.style.display = "none";
        upiInput.disabled = true;
      }
    }

    function setExactDate() {
      const dateOfExitInput = document.getElementById("dateOfExit");
      const currentDate = new Date();
      const formattedDate = currentDate.toISOString().slice(0, 10);
      dateOfExitInput.value = formattedDate;
    }








    document.getElementById("vendorForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const vendorData = {
      name: formData.get("vendorName"),
      type: formData.get("vendorType"),
      dateOfExit: formData.get("dateOfExit")
    };

    // Call a function to update the pie chart with the vendorData
    updatePieChart(vendorData);
  });

  function updatePieChart(vendorData) {
    const pieChartCanvas = document.getElementById("pieChart");
    const pieChartData = {
      labels: ["Services", "Goods"],
      datasets: [{
        data: [0, 0], // Initial values, will be updated based on the form input
        backgroundColor: ["#FF6384", "#36A2EB"],
      }],
    };

    // Update the dataset with the form input
    if (vendorData.type === "Services") {
      pieChartData.datasets[0].data[0]++;
    } else if (vendorData.type === "Goods") {
      pieChartData.datasets[0].data[1]++;
    }

    // Create or update the pie chart
    if (window.pieChart) {
      window.pieChart.data = pieChartData;
      window.pieChart.update();
    } else {
      window.pieChart = new Chart(pieChartCanvas, {
        type: "pie",
        data: pieChartData,
        options: {
          responsive: true,
        },
      });
    }
  }