import { Button } from 'react-bootstrap';
import React, { useState } from "react";
import { ViewReportComponent} from './ViewReportComponent';
import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';

import DocuComponentsPDF from './DocuComponentsPDF';

function ReportesComponentes  () {

    const[componentes,setComponentes]=useState(null);
    const[verWeb,setVerWeb]=useState(false);
    const[verPdf,setVerPdf]=useState(false);

    function fetchEquipo(){
        fetch("http://localhost:4000/api/equipoPeticion")
        .then((response)=> response.json())
        .then((data)=>{
            setComponentes(data);
        });
    }

    React.useEffect(()=>{
        fetchEquipo();
    },[]);
    const Menu = () => (
        <nav
        style={{
          display: "flex",
          paddingBottom: "5px",
          justifyContent: "space-around",
          alignItems: "center",
          width: "100%",
          position: "fixed",
          margin: "10px",
          top: "0",
        }}
        >
          <Button
            variant="dark"
            onClick={() => {
                setVerWeb(!verWeb);
                setVerPdf(false);
              
            }}
          >
            {verWeb ? "Ocultar Web" : "Ver Web"}
          </Button>
          <Button variant='dark'
          onClick={()=>{
            setVerWeb(false);
            setVerPdf(!verPdf);


          }}>{verPdf ? "Ocultar Pdf" : "Ver Pdf"}</Button>
          <PDFDownloadLink document={<DocuComponentsPDF componentes={componentes}/>} fileName="Reporte_Componentes.pdf">
          <Button>Descargar PDF</Button>
          </PDFDownloadLink>
          
          
        </nav>
      );
      

  return (
    <div className="d-flex align-items-center  m-5 vh-100">
      <Menu/>
      {componentes ?
      <>
        {verWeb ? <ViewReportComponent componentes={componentes}/> : null}
        {verPdf ? <PDFViewer style={{width: "100%", height: "90vh"}}> <DocuComponentsPDF componentes={componentes}/></PDFViewer> : null}
      </>
      : null }
    </div>
  );
};

export default ReportesComponentes;
