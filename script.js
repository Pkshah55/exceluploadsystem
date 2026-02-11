async function uploadFile() {
  const fileInput = document.getElementById('fileInput');
  const formData = new FormData();
  formData.append('file', fileInput.files[0]);

  await fetch('http://localhost:5000/api/upload', {
    method: 'POST',
    body: formData
  });

  loadData();
}

async function loadData() {
  const res = await fetch('http://localhost:5000/api/data');
  const data = await res.json();

  const table = document.getElementById('dataTable');
  table.innerHTML = `
    <tr>
      <th>Date</th><th>Name</th><th>Number</th><th>Location</th><th>Status</th><th>Action</th>
    </tr>
  `;

  data.forEach(row => {
    table.innerHTML += `
      <tr>
        <td>${row.date ? row.date.split('T')[0] : ''}</td>
        <td>${row.name}</td>
        <td>${row.number}</td>
        <td>${row.location}</td>
        <td>${row.status}</td>
        <td>
          <button onclick="editRow('${row._id}')">Edit</button>
          <button onclick="deleteRow('${row._id}')">Delete</button>
        </td>
      </tr>
    `;
  });
}

function editRow(id) {
  window.location.href = `edit.html?id=${id}`;
}

async function deleteRow(id) {
  await fetch(`http://localhost:5000/api/data/${id}`, { method: 'DELETE' });
  loadData();
}

loadData();