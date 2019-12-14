import jsPDF from "jspdf";
import "jspdf-autotable";

export default function PdfWrapper(reportTitle, reportData) {
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape

    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(15);

    const title = reportTitle;
    const headers = [["Loan Date", "Due Date", "Loan Code", "Loan Amount", "Status", "Station", "Customer"]];

    const data = reportData.map(elt=> [
        elt.loanDate, 
        elt.dueDate, 
        elt.loanCode, 
        elt.loanAmount, 
        elt.LoanStatus.status, 
        elt.UnitStation.stationName,
        elt.customerId
    ]);

    let content = {
      startY: 50,
      head: headers,
      body: data
    };

    doc.text(title, marginLeft, 40);
    doc.autoTable(content);
    doc.save("LoanReport.pdf")
}
