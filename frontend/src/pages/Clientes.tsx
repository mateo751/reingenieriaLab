import React, { useEffect, useState } from 'react'
import { listClientes, addCliente } from '../api'
import Button from '../components/Button'
import Input from '../components/Input'
import Card from '../components/Card'
import Badge from '../components/Badge'
import SearchInput from '../components/SearchInput'

type Cliente = { id?: number, nombres: string, apellidos: string, razonSocial?: string, ruc?: string, direccion?: string, telefono?: string, correo?: string }

export default function Clientes(){
  const [clientes, setClientes] = useState<Cliente[]>([])
  const [filteredClientes, setFilteredClientes] = useState<Cliente[]>([])
  const [form, setForm] = useState<Cliente>({ nombres:'', apellidos:'', correo:'', telefono:'' })
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  
  const load = async () => { 
    setLoading(true)
    try {
      const page = await listClientes(0,50)
      setClientes(page.content || [])
      setFilteredClientes(page.content || [])
    } finally {
      setLoading(false)
    }
  }
  
  useEffect(() => { load() }, [])
  
  useEffect(() => {
    const filtered = clientes.filter(cliente => 
      cliente.nombres.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cliente.apellidos.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (cliente.correo && cliente.correo.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    setFilteredClientes(filtered)
  }, [searchTerm, clientes])
  
  const submit = async (e: React.FormEvent) => { 
    e.preventDefault()
    setLoading(true)
    try {
      await addCliente(form)
      setForm({nombres:'', apellidos:'', correo:'', telefono:''})
      await load()
    } finally {
      setLoading(false)
    }
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Gestión de Clientes
          </h1>
          <p className="mt-1 text-gray-600">Administra la información de tus clientes</p>
        </div>
        
        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg shadow-md p-4 text-white">
            <div className="flex items-center">
              <div className="ml-3">
                <h3 className="text-sm font-medium">Total Clientes</h3>
                <p className="text-xl font-bold">{clientes.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg shadow-md p-4 text-white">
            <div className="flex items-center">
              <div className="ml-3">
                <h3 className="text-sm font-medium">Con Email</h3>
                <p className="text-xl font-bold">{clientes.filter(c => c.correo).length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg shadow-md p-4 text-white">
            <div className="flex items-center">
              <div className="ml-3">
                <h3 className="text-sm font-medium">Con Teléfono</h3>
                <p className="text-xl font-bold">{clientes.filter(c => c.telefono).length}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-4">
                <h3 className="text-lg font-semibold text-white flex items-center">
                  Agregar Cliente
                </h3>
              </div>
              <div className="p-6">
                <form onSubmit={submit} className="space-y-4">
                  <Input
                    label="Nombres"
                    placeholder="Ingresa los nombres"
                    value={form.nombres}
                    onChange={e => setForm({...form, nombres: e.target.value})}
                    required
                  />
                  <Input
                    label="Apellidos" 
                    placeholder="Ingresa los apellidos"
                    value={form.apellidos}
                    onChange={e => setForm({...form, apellidos: e.target.value})}
                    required
                  />
                  <Input
                    label="Correo Electrónico"
                    type="email"
                    placeholder="ejemplo@correo.com"
                    value={form.correo || ''}
                    onChange={e => setForm({...form, correo: e.target.value})}
                  />
                  <Input
                    label="Teléfono"
                    placeholder="Número de teléfono"
                    value={form.telefono || ''}
                    onChange={e => setForm({...form, telefono: e.target.value})}
                  />
                  <Button 
                    type="submit" 
                    variant="primary" 
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-200"
                  >
                    {loading ? (
                      <span className="flex items-center">
                        Agregando...
                      </span>
                    ) : 'Agregar Cliente'}
                  </Button>
                </form>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-white flex items-center">
                    Lista de Clientes
                  </h3>
                  <Badge variant="info" className="bg-white bg-opacity-20 text-white border-white border-opacity-30">
                    {filteredClientes.length} clientes
                  </Badge>
                </div>
              </div>
              
              <div className="p-6">
                <div className="mb-6">
                  <SearchInput
                    placeholder="Buscar clientes por nombre o email..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="w-full"
                  />
                </div>
                
                {loading && clientes.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-200 border-t-blue-600"></div>
                    <p className="mt-4 text-gray-500 font-medium">Cargando clientes...</p>
                  </div>
                ) : filteredClientes.length === 0 ? (
                  <div className="text-center py-12">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      {searchTerm ? 'No se encontraron clientes' : 'No hay clientes registrados'}
                    </h3>
                    <p className="text-gray-500">
                      {searchTerm ? 'Intenta con otros términos de búsqueda' : 'Agrega tu primer cliente usando el formulario'}
                    </p>
                  </div>
                ) : (
                  <div className="grid gap-4">
                    {filteredClientes.map((cliente, index) => (
                      <div 
                        key={cliente.id} 
                        className="bg-gradient-to-r from-white to-gray-50 border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-blue-200 transition-all duration-200 transform hover:-translate-y-1"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                              {cliente.nombres[0]}{cliente.apellidos[0]}
                            </div>
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900">
                                {cliente.nombres} {cliente.apellidos}
                              </h3>
                              <div className="mt-1 space-y-1">
                                {cliente.correo && (
                                  <div className="flex items-center text-sm text-gray-600">
                                    {cliente.correo}
                                  </div>
                                )}
                                {cliente.telefono && (
                                  <div className="flex items-center text-sm text-gray-600">
                                    {cliente.telefono}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <Button variant="secondary" size="sm" className="hover:bg-blue-50 hover:text-blue-600">
                              Editar
                            </Button>
                            <Button variant="danger" size="sm" className="hover:bg-red-50">
                              Eliminar
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
