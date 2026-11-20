import { Injectable } from '@angular/core';
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from 'firebase/firestore';
import { db } from '../config/firebase.config';
import { Producto } from '../models/producto.model';

@Injectable({ providedIn: 'root' })
export class ProductoService {
  private colRef = collection(db, 'productos');

  async obtenerProductos(): Promise<Producto[]> {
    const snap = await getDocs(this.colRef);
    return snap.docs.map((d) => ({
      id: d.id,
      ...(d.data() as Omit<Producto, 'id'>),
    }));
  }

  async crearProducto(producto: Producto): Promise<void> {
    const { id, ...data } = producto;
    await addDoc(this.colRef, data);
  }

  async actualizarProducto(id: string, producto: Producto): Promise<void> {
    const { id: _, ...data } = producto;
    const docRef = doc(db, 'productos', id);
    await updateDoc(docRef, data);
  }

  async eliminarProducto(id: string): Promise<void> {
    const docRef = doc(db, 'productos', id);
    await deleteDoc(docRef);
  }
}