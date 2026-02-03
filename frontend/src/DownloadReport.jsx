import { Button } from "@mui/material";
import jsPDF from "jspdf";

export default function DownloadReport({ data }) {
  const download = () => {
    const doc = new jsPDF();
    doc.text(`Name: ${data.name}`, 10, 10);
    doc.text(`BP: ${data.bp}`, 10, 20);
    doc.text(`Heart Rate: ${data.heartRate}`, 10, 30);
    doc.save("health-report.pdf");
  };

  return (
    <Button fullWidth variant="outlined" onClick={download}>
      Download Report
    </Button>
  );
}
