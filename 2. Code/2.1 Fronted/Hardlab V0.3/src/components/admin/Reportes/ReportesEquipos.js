import { Button } from 'react-bootstrap';
import React, { useState } from "react";
import { VistaWeb } from './VistaWeb';
import DocuPDF from './DocuPDF';
import { PDFViewer,PDFDownloadLink } from '@react-pdf/renderer';

function ReportesEquipos  () {

    const[equipos,setEquipo]=useState(null);
    const[verWeb,setVerWeb]=useState(false);
    const[verPdf,setVerPdf]=useState(false);

    function fetchEquipo(){
        fetch("http://localhost:4000/api/equipo")
        .then((response)=> response.json())
        .then((data)=>{
            setEquipo(data);
        });
    }

    React.useEffect(()=>{
        fetchEquipo();
    },[]);
    const Menu = () => (
        <nav
          style={{
            display: "flex",
            borderBottom: "1px solid black",
            paddingBottom: "5px",
            justifyContent: "space-around",
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
          <PDFDownloadLink document={<DocuPDF equipos={equipos}/>} fileName="Reporte_Equipos.pdf">
          <Button>Descargar PDF</Button>
          </PDFDownloadLink>
          
          
        </nav>
      );

  return (
    <div className="d-flex align-items-center vh-100">
      <Menu/>
      {equipos ?
      <>
        {verWeb ? <VistaWeb equipos={equipos}/> : null}
        {verPdf ? <PDFViewer style={{width: "100%", height: "90vh"}}> <DocuPDF equipos={equipos}/></PDFViewer> : null}
      </>
      : null }
    </div>
  );
};

export default ReportesEquipos;
