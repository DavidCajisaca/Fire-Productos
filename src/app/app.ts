import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Producto } from './models/producto.model';
import { ProductoService } from './services/producto.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  productos: Producto[] = [];
  form: FormGroup;
  editandoId: string | null = null;
  mensajeError = '';
  cargando = false;

  constructor(private fb: FormBuilder, private productoService: ProductoService) {
    this.form = this.fb.group({
      nombre: ['', [Validators.required, Validators.pattern(/\S+/)]],
      precio: [0, [Validators.required, Validators.min(0)]],
      stock: [0, [Validators.required, Validators.min(0), Validators.pattern(/^-?\d+$/)]],
      categoria: ['', [Validators.required, Validators.pattern(/\S+/)]],
    });
  }

  ngOnInit(): void {
    this.cargarProductos();
  }

  async cargarProductos(): Promise<void> {
    this.mensajeError = '';
    this.cargando = true;
    try {
      this.productos = await this.productoService.obtenerProductos();
    } catch {
      this.mensajeError = 'No se pudieron cargar los productos desde Firestore.';
    } finally {
      this.cargando = false;
    }
  }

  async guardar(): Promise<void> {
    this.mensajeError = '';
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.mensajeError = 'Revisa los campos del formulario antes de guardar.';
      return;
    }

    const raw = this.form.value;
    const payload: Producto = {
      nombre: String(raw.nombre).trim(),
      precio: Number(raw.precio),
      stock: Number(raw.stock),
      categoria: String(raw.categoria).trim(),
    };

    try {
      if (this.editandoId) {
        await this.productoService.actualizarProducto(this.editandoId, payload);
      } else {
        await this.productoService.crearProducto(payload);
      }
      this.cancelarEdicion();
      await this.cargarProductos();
    } catch {
      this.mensajeError = 'Error al guardar el producto en Firestore.';
    }
  }

  editar(producto: Producto): void {
    this.mensajeError = '';
    this.editandoId = producto.id ?? null;
    this.form.patchValue({
      nombre: producto.nombre,
      precio: producto.precio,
      stock: producto.stock,
      categoria: producto.categoria,
    });
  }

  cancelarEdicion(): void {
    this.editandoId = null;
    this.form.reset({ nombre: '', precio: 0, stock: 0, categoria: '' });
  }

  async eliminar(producto: Producto): Promise<void> {
    if (!producto.id) return;
    const confirmado = window.confirm(`Deseas eliminar el producto "${producto.nombre}"?`);
    if (!confirmado) return;

    this.mensajeError = '';
    try {
      await this.productoService.eliminarProducto(producto.id);
      await this.cargarProductos();
    } catch {
      this.mensajeError = 'Error al eliminar el producto en Firestore.';
    }
  }
}