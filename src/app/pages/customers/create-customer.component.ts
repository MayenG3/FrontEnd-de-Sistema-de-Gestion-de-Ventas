import { Component } from '@angular/core';
import { CustomerService } from './customer.service';
import { Customer } from './customer';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.css']
})
export class CreateCustomerComponent {
  
  customer: Customer = {
    id: 0,
    name: '',
    email: '',
    phone: '',
    address: '',
    status: 'Active',
  };

  customerForm: FormGroup;

  constructor(private fb: FormBuilder, private customerService: CustomerService, private router: Router) {
    this.customerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      status: ['Active']
    });
  }

  ngOnInit(): void {

  }

  registerCustomer() {
    if (this.customerForm.valid) {
      const customerData = this.customerForm.value;
      this.customerService.insertCustomer(customerData).subscribe(
        (customer) => {
          console.log('Cliente creado con éxito:', customer);
          this.router.navigate(['/customers']);
        },
        (error) => {
          console.error('Error al crear el cliente:', error);
        }
      );
    } else {
      console.log('Formulario inválido');
    }
  }
}
