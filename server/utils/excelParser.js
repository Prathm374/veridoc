const XLSX = require('xlsx');
const Certificate = require('../models/Certificate');

const parseExcel = (file) => {
  const workbook = XLSX.read(file.buffer, { type: 'buffer' });
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const data = XLSX.utils.sheet_to_json(sheet);

  return data.map(row => ({
    studentName: row['Student Name'],
    studentId: row['Student ID'],
    course: row['Course'],
    startDate: new Date(row['Start Date']),
    endDate: new Date(row['End Date']),
    issueDate: new Date(row['Issue Date']),
    certificateNumber: row['Certificate Number']
  }));
};

const saveCertificates = async (certificates) => {
  try {
    await Certificate.insertMany(certificates);
  } catch (error) {
    throw new Error('Error saving certificates: ' + error.message);
  }
};

module.exports = { parseExcel, saveCertificates };