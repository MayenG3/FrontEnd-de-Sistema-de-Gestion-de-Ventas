import { Component } from '@angular/core';
import * as jsPDF from 'jspdf';

@Component({
  selector: 'app-vista-factura',
  templateUrl: './vista-factura.component.html',
  styleUrls: ['./vista-factura.component.css']
})
export class VistaFacturaComponent {

  generarPDF() {
    const doc = new jsPDF();
    doc.text('Contenido de la factura', 10, 10);
    // Agrega más contenido y personalización del PDF según tus necesidades
    doc.save('factura.pdf');
  }
}
