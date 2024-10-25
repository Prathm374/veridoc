const PDFDocument = require('pdfkit');

const generatePDF = (certificate) => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument();
    let buffers = [];
    doc.on('data', buffers.push.bind(buffers));
    doc.on('end', () => {
      let pdfData = Buffer.concat(buffers);
      resolve(pdfData);
    });

    // Add content to the PDF
    doc.fontSize(25).text('Certificate of Completion', 100, 80);
    doc.fontSize(15).text(`This is to certify that`, 100, 130);
    doc.fontSize(20).text(certificate.studentName, 100, 160);
    doc.fontSize(15).text(`has successfully completed the course`, 100, 190);
    doc.fontSize(20).text(certificate.course, 100, 220);
    doc.fontSize(15).text(`from ${certificate.startDate.toDateString()} to ${certificate.endDate.toDateString()}`, 100, 250);
    doc.fontSize(15).text(`Certificate Number: ${certificate.certificateNumber}`, 100, 280);
    doc.fontSize(15).text(`Issue Date: ${certificate.issueDate.toDateString()}`, 100, 310);

    doc.end();
  });
};

module.exports = { generatePDF };