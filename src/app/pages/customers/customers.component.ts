import { Component } from '@angular/core';
import { Customer } from './customer';
import Swal from 'sweetalert2';
import { CustomerService } from './customer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent {
  customers: Customer[] = [];

  editCustomer: Customer = {
    id: 0,
    name: '',
    email: '',
    phone: '',
    address: '',
    status: 'Active',
    createdAt: new Date(),  
    updatedAt: new Date()   
  };

  constructor(private customerService: CustomerService, private router: Router) {}

  ngOnInit(): void {
    this.customerService.getAll().subscribe((data) => {
      this.customers = data.filter((customer) => customer.status === 'Active');
    });
  }

  update() {
    // Obtener la fecha actual en formato 'yyyy-MM-dd'
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Asignar la fecha actual al objeto editarCustomer
    this.editCustomer.updatedAt = today;

    // Enviar la solicitud de actualización al backend
    this.customerService.updateCustomer(this.editCustomer).subscribe((customer) => {
      console.log('Customer actualizado con éxito:', customer);
      // Realiza cualquier acción adicional después de la actualización
    });
  }

  delete(customerEliminado: Customer) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esto.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, bórralo',
    }).then((result) => {
      if (result.isConfirmed) {
        // Obtener la fecha actual en formato 'yyyy-MM-dd'
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Marcar el customer como inactivo
        customerEliminado.status = 'Inactive';
        customerEliminado.updatedAt = today;

        // Enviar la solicitud de actualización al backend
        this.customerService.updateCustomer(customerEliminado).subscribe(
          (customer) => {
            console.log('Cliente eliminado con éxito:', customer);
            Swal.fire('¡Eliminado!', 'El Cliente ha sido eliminado.', 'success');
            this.customers = this.customers.filter((p) => p.id !== customerEliminado.id);
          },
          (error) => {
            console.error('Error al eliminar el Cliente', error);
          }
        );
      }
    });
  }

}
