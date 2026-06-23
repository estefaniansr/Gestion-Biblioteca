import { Component, OnInit } from "@angular/core";

import { headerComponente } from "../../components/header/header.component";
import { BuscadorComponente } from "../../components/buscador/buscador.component";
import { BotonComponente } from "../../components/boton/boton.component";
import { TituloComponent } from "../../components/titulo/titulo.component";
import { TagComponent } from "../../components/tags/tags.component";
import { TablaComponent } from "../../components/tabla/tabla.component";

import { Prestamo } from "../../models/prestamo.interface";
import { EstadisticasPrestamos } from "../../models/estadisticasPrestamos.interface";
import { FilaTabla } from "../../models/filaTabla.type";
import { ModalComponent } from "../../components/modal/modal.component";

import { PrestamosService } from "../services/prestamos.services";
import { HttpClient } from "@angular/common/http";
import { Campo } from "../../models/campo.type";
import { UsuarioMin } from "../../models/usuarios.model";
import { LibroMin } from "../../models/libro";
import { TipoDato } from "../../models/TipoDato.type";

@Component({
  selector: 'app-prestamos',
  standalone: true,
  imports: [headerComponente, BuscadorComponente, BotonComponente, TituloComponent, TagComponent, TablaComponent, ModalComponent],
  templateUrl: './prestamos.pages.html',
  styleUrl: './prestamos.pages.css'
})
export class PrestamosPages implements OnInit {

  usuarios: UsuarioMin[] = []
  libros: LibroMin[] = []

  activo = 'prestamos'
  textoBusqueda = ''
  paginaActual = 1
  modalAbierto = false

  estadisticas: EstadisticasPrestamos = {
    total: 0,
    activos: 0,
    entregados: 0,
    vencidos: 0
  }

  columnas = [
    { key: 'libro', label: 'Libro' },
    { key: 'usuario', label: 'Usuario' },
    { key: 'fechaAlta', label: 'Fecha Alta' },
    { key: 'fechaVenc', label: 'Fecha Venc.' },
    { key: 'estado', label: 'Estado' },
  ]

  datosTablaArray: FilaTabla[] = []
  prestamosOriginales: Prestamo[] = []

  constructor(
    private prestamosService: PrestamosService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.cargarEstadisticas()
    this.cargarPrestamos()
    this.cargarUsuarios()
    this.cargarLibros()
  }

  cargarEstadisticas() {
    this.prestamosService.ObtenerEstadisticas().subscribe({
      next: (datos: EstadisticasPrestamos) => {
        console.log("LO QUE LLEGA DEL BACKEND:", datos);
        this.estadisticas = datos
        this.estadisticas.activos =datos.activos
        this.estadisticas.entregados = datos.entregados
        this.estadisticas.vencidos = datos.vencidos
      },
      error: (err) => {
        console.error(err)
      }
    })
  }

  cargarPrestamos() {
    this.prestamosService.ObtenerPrestamos().subscribe({
      next: (prestamos: Prestamo[]) => {
        this.prestamosOriginales = prestamos
        this.datosTablaArray = this.transformarParaTabla(prestamos)
      },
      error: (err) => {
        console.error(err)
      }
    })
  }

  Editar(id: string, datos: Record<string, unknown>) {
    const nuevoEstado = datos['estado'] as string;
    this.prestamosService.ActualizarEstado(id, nuevoEstado).subscribe({
      next: (res) => {
        this.cargarPrestamos()
        this.cargarEstadisticas()
      },
      error: (err) => {
        console.log('Error al actualizar estado', err)
      }
    })
  }

  transformarParaTabla(prestamos: Prestamo[]): FilaTabla[] {
    return prestamos.map(p => ({
      _id: p._id,
      libro: p.libroId?.libro ?? 'Sin datos',
      usuario: `${p.usuarioId?.nombre ?? ''} ${p.usuarioId?.apellido ?? ''}`.trim(),
      fechaAlta: new Date(p.fechaPrestamo).toLocaleDateString('es-AR'),
      fechaVenc: new Date(p.fechaVencimiento).toLocaleDateString('es-AR'),
      estado: this.calcularEstado(p)
    }))
  }

  calcularEstado(p: Prestamo): string {
    if (p.estado === 'Devuelto') return 'Devuelto'

    const hoy = new Date()
    const vencimiento = new Date(p.fechaVencimiento)

    if (vencimiento < hoy) return 'Vencido'

    return 'Activo'
  }

  get EjPaginado(): FilaTabla[] {
    const indice = (this.paginaActual - 1) * 10;
    return this.datosTablaArray.slice(indice, indice + 10);
  }

  Buscador(input: string) {
    this.textoBusqueda = input.toLowerCase()

    if (!input) {
      this.datosTablaArray = this.transformarParaTabla(this.prestamosOriginales)
      return
    }

    const filtrados = this.prestamosOriginales.filter(p => {
      const libro = p.libroId?.libro?.toLowerCase() ?? ''
      const usuario = `${p.usuarioId?.nombre ?? ''} ${p.usuarioId?.apellido ?? ''}`.toLowerCase()
      const estado = this.calcularEstado(p).toLowerCase()

      return libro.includes(this.textoBusqueda) ||
        usuario.includes(this.textoBusqueda) ||
        estado.includes(this.textoBusqueda)
    })

    this.datosTablaArray = this.transformarParaTabla(filtrados)
  }

  cargarUsuarios() {
    this.http.get<UsuarioMin[]>('http://localhost:3000/usuarios').subscribe({
        next: (data) => {
            this.usuarios = data
            this.actualizarCamposModal()
        },
        error: (err) => {
            console.error('Error al cargar usuarios', err)
        }
    })
  }

cargarLibros() {
    this.http.get<LibroMin[]>('http://localhost:3000/libros').subscribe({
        next: (data) => {
            this.libros = data
            this.actualizarCamposModal()
        },
        error: (err) => {
            console.error('Error al cargar libros', err)
        }
    })
  }

Guardar(datos: Record<string, unknown>) {
    const usuarioId = datos['usuarioId'] as string;
    const libroId = datos['libroId'] as string;
    this.prestamosService.CrearPrestamo(usuarioId, libroId).subscribe({
        next: (res) => {
            console.log('Préstamo creado', res)
            this.cargarPrestamos()
            this.cargarEstadisticas()
            this.modalAbierto = false
        },
        error: (err) => {
            console.log('Error al crear el préstamo', err)
        }
    })
  }

  actualizarCamposModal() {
    if (this.usuarios.length === 0 || this.libros.length === 0) return
    this.CamposModal = [
      {
        tipo: 'select',
        nombre: 'usuarioId',
        label: 'Usuario',
        requerido: true,
        opciones: this.usuarios.map(u => ({
          valor: u._id,
          texto: `${u.nombre} ${u.apellido}`
        }))
      },
      {
        tipo: 'select',
        nombre: 'libroId',
        label: 'Libro',
        requerido: true,
        opciones: this.libros.map(l => ({
          valor: l._id,
          texto: l.libro
        }))
      }
    ]
  }

  CamposModal: Campo[] = []
}
