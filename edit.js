const params = new URLSearchParams(window.location.search);
const id = params.get('id');

async function loadRow() {
  const res = await fetch(`http://localhost:5000/api/data/${id}`);
  const row = await res.json();

  document.getElementById('date').value = row.date ? row.date.split('T')[0] : '';
  document.getElementById('name').value = row.name;
  document.getElementById('number').value = row.number;
  document.getElementById('location').value = row.location;
  document.getElementById('status').value = row.status;
}

document.getElementById('editForm').addEventListener('submit', async e => {
  e.preventDefault();

  const updated = {
    date: document.getElementById('date').value,
    name: document.getElementById('name').value,
    number: document.getElementById('number').value,
    location: document.getElementById('location').value,
    status: document.getElementById('status').value
  };

  await fetch(`http://localhost:5000/api/data/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updated)
  });

  window.location.href = 'index.html';
});

loadRow();