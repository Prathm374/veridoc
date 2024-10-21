const XLSX = require('xlsx');

exports.parseCertificates = (fileBuffer) => {
  const workbook = XLSX.read(fileBuffer, { type: 'buffer' });
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const data = XLSX.utils.sheet_to_json(sheet);

  return data.map((row) => ({
    id: row['Certificate ID'],
    studentName: row['Student Name'],
    internshipDomain: row['Internship Domain'],
    startDate: new Date(row['Start Date']),
    endDate: new Date(row['End Date']),
  }));
};