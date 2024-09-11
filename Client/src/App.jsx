import React, { useRef } from "react";

function App() {
  const componentRef = useRef();

  const handleExportPdf = async () => {
    const html2pdf = (await import("html2pdf.js")).default;
    
    const element = componentRef.current;
    const opt = {
      margin: 1,
      filename: "myPage.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    html2pdf().from(element).set(opt).save();
  };

  return (
    <div>
      <div ref={componentRef} style={{ padding: 20 }}>
        <h1>My Page Content</h1>
        <p>This content will be exported as a PDF.</p>
      </div>
      <button onClick={handleExportPdf}>Export as PDF</button>
    </div>
  );
}

export default App;
