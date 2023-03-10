import { Button, Container, Row, Col } from 'react-bootstrap';
import React, { useState } from "react";
import { VistaWeb } from './VistaWeb';
import DocuPDF from './DocuPDF';
import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';
import DocuEquiposDañadosPDF from './DocuEquiposDañadosPDF';
import DocuEquiposRefactorizarPDF from './DocuEquiposRefactorizarPDF';

function ReportesEquipos() {
  const [equipos, setEquipo] = useState(null);
  const [equiposD, setEquipoD] = useState(null);
  const [equiposR, setEquipoR] = useState(null);
  const [verWeb, setVerWeb] = useState(false);
  const [verPdf, setVerPdf] = useState(false);

  function fetchEquipo() {
    fetch("http://localhost:4000/api/equipo")
      .then((response) => response.json())
      .then((data) => {
        setEquipo(data);
      });
  }
  function fetchEquipoDanados() {
    fetch("http://localhost:4000/api/equiposDanados")
      .then((response) => response.json())
      .then((data) => {
        setEquipoD(data);
      });
  }
  function fetchEquipoRefactorizar() {
    fetch("http://localhost:4000/api/equipoRefactorizar")
      .then((response) => response.json())
      .then((data) => {
        setEquipoR(data);
      });
  }

  React.useEffect(() => {
    fetchEquipo();
    fetchEquipoDanados();
    fetchEquipoRefactorizar();
  }, []);

  const Menu = () => (
    <Container fluid className="bg-light">
      <Row className="justify-content-center align-items-center py-3">
        <Col xs="auto" className="mx-3 my-2">
          <Button
            variant="dark"
            onClick={() => {
              setVerWeb(!verWeb);
              setVerPdf(false);
            }}
          >
            {verWeb ? "Ocultar Web" : "Ver Web"}
          </Button>
        </Col>
        <Col xs="auto" className="mx-3 my-2">
          <Button
            variant="dark"
            onClick={() => {
              setVerWeb(false);
              setVerPdf(!verPdf);
            }}
          >
            {verPdf ? "Ocultar Pdf" : "Ver Pdf"}
          </Button>
        </Col>
        <Col xs="auto" className="mx-3 my-2">
          <PDFDownloadLink
            document={<DocuPDF equipos={equipos} />}
            fileName="Reporte_Equipos.pdf"
          >
            <Button>Descargar PDF</Button>
          </PDFDownloadLink>
          
          
        </Col>
        <Col xs="auto" className="mx-3 my-2">
        <PDFDownloadLink
            document={<DocuEquiposDañadosPDF equiposD={equiposD} />}
            fileName="Reporte_Equipos_Dañados.pdf"
          ><Button variant="dark">Reporte Equipos Dañados</Button></PDFDownloadLink>
        </Col>
        <Col xs="auto" className="mx-3 my-2">
        <PDFDownloadLink
            document={<DocuEquiposRefactorizarPDF equiposR={equiposR} />}
            fileName="Reporte_Equipos_Repotenciar.pdf"
          ><Button variant="dark">Reporte Equipos Repotenciar</Button></PDFDownloadLink>
        </Col>
      </Row>
    </Container>
  );

  return (
    <>
      <Menu />
      {equipos ? (
        <>
          {verWeb ? <VistaWeb equipos={equipos} /> : null}
          {verPdf ? (
            <PDFViewer style={{ width: "100%", height: "90vh" }}>
              {" "}
              <DocuPDF equipos={equipos} />
            </PDFViewer>
          ) : null}
        </>
      ) : null}
    </>
  );
}

export default ReportesEquipos;
