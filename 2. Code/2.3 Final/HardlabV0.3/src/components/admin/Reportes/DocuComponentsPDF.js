import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import Cookies from "universal-cookie";
import logo from '../../../img/logo_factura.png'; // importar la imagen del logo

const DocuPDF = ({ componentes }) => {

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
    texto:{
      fontFamily:'Consolas',
      size: '20px'

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
    tableTitle:{
      fontWeight: 'bold' ,
    }
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
          <Text > Nombre: {cookies.get('firstName')+' '+cookies.get('lastName')}</Text>
          <Text>{fecha()}</Text>
        </View>
        <Text style={styles.title}>Reportes Componentes Pedidos</Text>
        
        <Text style={styles.title}>Informacion Equipo</Text>
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
                {componentes && componentes.map((componente, index) => (
                    
                <View style={styles.tableRow} key={index}>
                    <View style={styles.tableCol}> 
                        <Text style={styles.tableCell}>{componente.COD_EQUIPO || "..."}</Text>
                    </View> 
                    <View style={styles.tableCol}> 
                        <Text style={styles.tableCell}>{componente.COD_DETALLE || "..."}</Text>
                    </View> 
                    <View style={styles.tableCol}> 
                        <Text style={styles.tableCell}>{componente.COD_ESTACION || "..."}</Text>
                    </View> 
                    <View style={styles.tableCol}> 
                        <Text style={styles.tableCell}>{componente.MARCA|| "..."}</Text>
                    </View> 
                    <View style={styles.tableCol}> 
                        <Text style={styles.tableCell}>{FormatearFecha(componente.FECHA_INGRESO|| "...")}</Text>
                    </View> 
                    <View style={styles.tableCol}> 
                        <Text style={styles.tableCell}>{componente.ESTADO|| "..."}</Text>
                    </View> 
                    <View style={styles.tableCol}> 
                        <Text style={styles.tableCell}>{FormatearFecha(componente.FECHA_SALIDA|| "...")}</Text>
                    </View> 
                     
                </View>
                ))}
         </View>
         

         <Text style={styles.title}>Informacion Detalle del Equipo</Text>
        <View style={styles.table}>
        <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>MAIN BOARD</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>SERIAL</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>PROCESADOR</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>RAM</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>DISCO_DURO</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>UNIDAD_CD</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>PUERTOS PCI EXPRESS</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>PUERTOS USB</Text>
            </View>
            </View>

            {componentes && componentes.map((componente, index) => (
                    
                    <View style={styles.tableRow} key={index}>
                        <View style={styles.tableCol}> 
                            <Text style={styles.tableCell}>{componente.MAIN_BOARD || "..."}</Text>
                        </View> 
                        <View style={styles.tableCol}> 
                            <Text style={styles.tableCell}>{componente.SERIAL || "..."}</Text>
                        </View> 
                        <View style={styles.tableCol}> 
                            <Text style={styles.tableCell}>{componente.PROCESADOR || "..."}</Text>
                        </View> 
                        <View style={styles.tableCol}> 
                            <Text style={styles.tableCell}>{componente.RAM|| "..."}</Text>
                        </View> 
                        <View style={styles.tableCol}> 
                            <Text style={styles.tableCell}>{componente.DISCO_DURO|| "..."}</Text>
                        </View> 
                        <View style={styles.tableCol}> 
                            <Text style={styles.tableCell}>{componente.UNIDAD_CD|| "..."}</Text>
                        </View> 
                        <View style={styles.tableCol}> 
                            <Text style={styles.tableCell}>{componente.PUERTOS_PCI_EXPRESS|| "..."}</Text>
                        </View> 
                        <View style={styles.tableCol}> 
                            <Text style={styles.tableCell}>{componente.PUERTOS_USB || "..."}</Text>
                        </View> 
                        
                    </View>
                    ))}
            
            
            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>PUERTOS PS2</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>UNIDAD DE DISQUETE</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>TARJETA DE RED</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>TARJETA DE VIDEO</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>PUERTOS PCI</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>PUERTOS VGA</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>TARJETA DE SONIDO</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>COMENTARIOS</Text>
              </View>
            </View>
          
                {componentes && componentes.map((componente, index) => (
                    
                <View style={styles.tableRow} key={index}>
                    
                    <View style={styles.tableCol}> 
                        <Text style={styles.tableCell}>{componente.PUERTOS_PS2 || "..."}</Text>
                    </View> 
                    <View style={styles.tableCol}> 
                        <Text style={styles.tableCell}>{componente.UNIDAD_DISQUETE || "..."}</Text>
                    </View> 
                    <View style={styles.tableCol}> 
                        <Text style={styles.tableCell}>{componente.TARJETA_RED|| "..."}</Text>
                    </View> 
                    <View style={styles.tableCol}> 
                        <Text style={styles.tableCell}>{componente.TARJETA_VIDEO|| "..."}</Text>
                    </View> 
                    <View style={styles.tableCol}> 
                        <Text style={styles.tableCell}>{componente.PUERTOS_PCI|| "..."}</Text>
                    </View> 
                    <View style={styles.tableCol}> 
                        <Text style={styles.tableCell}>{componente.PUERTOS_VGA|| "..."}</Text>
                    </View> 
                    <View style={styles.tableCol}> 
                        <Text style={styles.tableCell}>{componente.TARJETA_SONIDO|| "..."}</Text>
                    </View> 
                    <View style={styles.tableCol}> 
                        <Text style={styles.tableCell}>{componente.COMENTARIOS|| "..."}</Text>
                    </View> 
                     
                </View>
                ))}
         </View>
         <Text style={styles.title}>Informacion Componentes Pedidos</Text>
        <View style={styles.table}>
          
        <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>SERIAL DEL EQUIPO</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>DISCO</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>PANTALLA</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>TOUCHPAD</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>BATERIA</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>TECLADO</Text>
            </View>
            
            </View>
                {componentes && componentes.map((componente, index) => (
                    
                <View style={styles.tableRow} key={index}>
                    <View style={styles.tableCol}> 
                        <Text style={styles.tableCell}>{componente.SERIAL_EQUIPO || "..."}</Text>
                    </View> 
                    <View style={styles.tableCol}> 
                        <Text style={styles.tableCell}>{componente.DISCO || "..."}</Text>
                    </View> 
                    <View style={styles.tableCol}> 
                        <Text style={styles.tableCell}>{componente.PANTALLA || "..."}</Text>
                    </View> 
                    <View style={styles.tableCol}> 
                        <Text style={styles.tableCell}>{componente.TOUCHPAD|| "..."}</Text>
                    </View> 
                    <View style={styles.tableCol}> 
                        <Text style={styles.tableCell}>{componente.BATERIA_SERIE|| "..."}</Text>
                    </View> 
                    <View style={styles.tableCol}> 
                        <Text style={styles.tableCell}>{componente.TECLADO|| "..."}</Text>
                    </View> 
                     
                </View>
                ))}
                </View>

            <View style={styles.table}>

            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>BISAGRAS</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>MARCO DE PANTALA</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>VENTILADOR</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>CASE DISCO DURO</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>CASE BASE COVER</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>ENCARGADO</Text>
              </View>
            </View>

                 {componentes && componentes.map((componente, index) => (
                    
                    <View style={styles.tableRow} key={index}>
                        
                        <View style={styles.tableCol}> 
                            <Text style={styles.tableCell}>{componente.BISAGRAS|| "..."}</Text>
                        </View> 
                        <View style={styles.tableCol}> 
                            <Text style={styles.tableCell}>{componente.MARCO_PANTALLA|| "..."}</Text>
                        </View> 
                        <View style={styles.tableCol}> 
                            <Text style={styles.tableCell}>{componente.VENTILADOR|| "..."}</Text>
                        </View> 
                        <View style={styles.tableCol}> 
                            <Text style={styles.tableCell}>{componente.CASE_DISCO_DURO|| "..."}</Text>
                        </View> 
                        <View style={styles.tableCol}> 
                            <Text style={styles.tableCell}>{componente.CASE_BASE_COVER|| "..."}</Text>
                        </View> 
                        <View style={styles.tableCol}> 
                            <Text style={styles.tableCell}>{componente.ENCARGADO|| "..."}</Text>
                        </View> 
                         
                    </View>
                    ))}
         </View>
         
      </Page>
    </Document>
  );
};

export default DocuPDF;
