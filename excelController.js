

const ExcelData = require('../models/ExcelData');
const xlsx = require('xlsx');

function normalizeDate(value) {
  if (!value) return null;

  // Handle Excel serial numbers
  if (typeof value === "number") {
    const epoch = new Date(Date.UTC(1899, 11, 30)); // Excel base date
    return new Date(epoch.getTime() + value * 86400000);
  }

  // Handle strings or Date objects
  const parsed = new Date(value);
  return isNaN(parsed) ? null : parsed;
}

exports.uploadExcel = async (req, res) => {
  try {
    const workbook = xlsx.readFile(req.file.path);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = xlsx.utils.sheet_to_json(sheet);

    const data = rows.map(row => ({
      date: normalizeDate(row.Date),   // ✅ fixed here
      name: row.Name,
      number: row.Number,
      location: row.Location,
      status: 'Pick Call'
    }));

    await ExcelData.insertMany(data);
    res.json({ message: 'File uploaded and data saved!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getData = async (req, res) => {
  const data = await ExcelData.find();
  res.json(data);
};

exports.getOne = async (req, res) => {
  const { id } = req.params;
  const row = await ExcelData.findById(id);
  res.json(row);
};

exports.updateData = async (req, res) => {
  const { id } = req.params;
  const updated = await ExcelData.findByIdAndUpdate(id, req.body, { new: true });
  res.json(updated);
};

exports.deleteData = async (req, res) => {
  const { id } = req.params;
  await ExcelData.findByIdAndDelete(id);
  res.json({ message: 'Row deleted successfully' });
};