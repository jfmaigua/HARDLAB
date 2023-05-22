import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import Cookies from "universal-cookie";
import logo from '../../../img/logo_factura.png'; // importar la imagen del logo

const DocuEquiposAltaPDF = ({ equiposA }) => {

  const cookies = new Cookies();
  const styles = StyleSheet.create({
    page: {
      padding: 40, // agregamos un margen a la página
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20,
    },
    logo: {
      width: 800,
      height: 100,
      marginRight: 10,
    },
    titlelogo: {
      color: '#8D48C7',
      fontSize: 20,
      textAlign: 'center', // alinear el título al centro
      marginTop: 12,
      marginBottom: 20, // agregar un margen inferior
      fontWeight: 'bold' ,
    },
    title:{
        textAlign: 'center',
        marginBottom: 20,
        

    },
    table: {
      display: 'table',
      width: 'auto',
      borderRightWidth: 0,
      borderBottomWidth: 0,
    },
    tableRow: {
      margin: 'auto',
      flexDirection: 'row',
    },
    tableCol: {
      width: '12%',
      borderStyle: 'solid',
      borderWidth: 1,
      borderLeftWidth: 1,
      borderTopWidth: 1,
    },
    tableCell: {
      margin: 'auto',
      marginTop: 5,
      fontSize: 6,
    },
  });

  function FormatearFecha(fecha) {
    let fechaFormateada = new Date(fecha);
    return fechaFormateada.toLocaleDateString();
  }
  function fecha(){
    const fechaActual = new Date();
  const dia = fechaActual.getDate().toString().padStart(2, "0");
  const mes = (fechaActual.getMonth() + 1).toString().padStart(2, "0");
  const anio = fechaActual.getFullYear().toString();
  const fecha = `${dia}/${mes}/${anio}`;

  return <div>Fecha: {fecha}</div>;
  }

  return (
    <Document>
      <Page size="A4" orientation="landscape" style={styles.page}>
        <View style={styles.header}>
          <Image source={logo} style={styles.logo} /> {/* insertar el logo */}
          
        </View>
        <View>
          <Text> Nombre: {cookies.get('firstName')+' '+cookies.get('lastName')}</Text>
          <Text>{fecha()}</Text>
        </View>
        <Text style={styles.title}>Reportes Equipos</Text>

        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>CODIGO EQUIPO</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>CODIGO DETALLE</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>CODIGO ESTACION</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>MARCA</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>FECHA DE INGRESO</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>ESTADO</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>FECHA DE SALIDA</Text>
            </View>
          </View>
                {equiposA && equiposA.map((equipo, index) => (
                    
                <View style={styles.tableRow} key={index}>
                    <View style={styles.tableCol}> 
                        <Text style={styles.tableCell}>{equipo.COD_EQUIPO || "..."}</Text>
                    </View> 
                    <View style={styles.tableCol}> 
                        <Text style={styles.tableCell}>{equipo.COD_DETALLE || "..."}</Text>
                    </View> 
                    <View style={styles.tableCol}> 
                        <Text style={styles.tableCell}>{equipo.COD_ESTACION|| "..."}</Text>
                    </View> 
                    <View style={styles.tableCol}> 
                        <Text style={styles.tableCell}>{equipo.MARCA || "..."}</Text>
                    </View> 
                    <View style={styles.tableCol}> 
                        <Text style={styles.tableCell}>{FormatearFecha(equipo.FECHA_INGRESO || "...")}</Text>
                    </View> 
                    <View style={styles.tableCol}> 
                        <Text style={styles.tableCell}>{equipo.ESTADO || "..."}</Text>
                    </View> 
                    <View style={styles.tableCol}> 
                        <Text style={styles.tableCell}>{FormatearFecha(equipo.FECHA_SALIDA || "...")}</Text> 
                    </View>   
                </View>
                ))}
         </View>
      </Page>
    </Document>
  );
};

export default DocuEquiposAltaPDF;
