import React, { useEffect, useState } from 'react'
import { getEspacios, ocuparEspacio, liberarEspacio } from '../api'
import Button from '../components/Button'
import Card from '../components/Card'
import Badge from '../components/Badge'

type Espacio = { id: number, zona: string, estado: string }

export default function Espacios(){
  const [espacios, setEspacios] = useState<Espacio[]>([])
  const [filtro, setFiltro] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const [actionLoading, setActionLoading] = useState<number | null>(null)
  
  const load = async () => { 
    setLoading(true)
    try {
      setEspacios(await getEspacios(filtro || undefined))
    } finally {
      setLoading(false)
    }
  }
  
  useEffect(() => { load() }, [filtro])
  
  const handleOcupar = async (id: number) => {
    setActionLoading(id)
    try {
      await ocuparEspacio(id)
      await load()
    } finally {
      setActionLoading(null)
    }
  }
  
  const handleLiberar = async (id: number) => {
    setActionLoading(id)
    try {
      await liberarEspacio(id)
      await load()
    } finally {
      setActionLoading(null)
    }
  }
  
  const estadosCount = espacios.reduce((acc, espacio) => {
    acc[espacio.estado] = (acc[espacio.estado] || 0) + 1
    return acc
  }, {} as Record<string, number>)
  
  const porcentajeOcupacion = espacios.length > 0 ? Math.round((estadosCount.ocupado || 0) / espacios.length * 100) : 0
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Control de Estacionamiento
          </h1>
          <p className="mt-1 text-gray-600">Gestiona la ocupación de espacios en tiempo real</p>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg shadow-md p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-xs font-medium">Total Espacios</p>
                <p className="text-xl font-bold">{espacios.length}</p>
              </div>
              <div className="p-2 bg-white bg-opacity-20 rounded-lg">
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg shadow-md p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-xs font-medium">Espacios Libres</p>
                <p className="text-xl font-bold">{estadosCount.libre || 0}</p>
              </div>
              <div className="p-2 bg-white bg-opacity-20 rounded-lg">
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-lg shadow-md p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-100 text-xs font-medium">Espacios Ocupados</p>
                <p className="text-xl font-bold">{estadosCount.ocupado || 0}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg shadow-md p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-xs font-medium">Ocupación</p>
                <p className="text-xl font-bold">{porcentajeOcupacion}%</p>
              </div>
            </div>
            <div className="mt-2">
              <div className="bg-white bg-opacity-20 rounded-full h-1.5">
                <div 
                  className="bg-white rounded-full h-1.5 transition-all duration-500"
                  style={{ width: `${porcentajeOcupacion}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-green-500 to-blue-600 px-6 py-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white flex items-center">
                Control de Espacios
              </h3>
              <Badge variant="info" className="bg-white bg-opacity-20 text-white border-white border-opacity-30">
                {filtro ? `Filtro: ${filtro}` : 'Todos los espacios'}
              </Badge>
            </div>
          </div>
          
          <div className="p-6">
            {/* Enhanced Filters */}
            <div className="mb-6 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-4">
              <div className="flex flex-col sm:flex-row gap-4 items-center">
                <div className="flex items-center space-x-3">
                  <label className="text-sm font-medium text-gray-700 flex items-center">
                    Filtrar por estado:
                  </label>
                  <select 
                    value={filtro} 
                    onChange={e => setFiltro(e.target.value)}
                    className="rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white"
                  >
                    <option value=''>🔵 Todos los estados</option>
                    <option value='libre'>🟢 Solo espacios libres</option>
                    <option value='ocupado'>🔴 Solo espacios ocupados</option>
                  </select>
                </div>
                <Button 
                  onClick={load} 
                  variant="secondary" 
                  disabled={loading}
                  className="hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
                >
                  {loading ? (
                    <span className="flex items-center">
                      Cargando...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      Refrescar
                    </span>
                  )}
                </Button>
              </div>
            </div>
          
            {/* Enhanced Espacios Grid */}
            {loading && espacios.length === 0 ? (
              <div className="text-center py-16">
                <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600 mx-auto"></div>
                <p className="mt-6 text-gray-500 font-medium text-lg">Cargando espacios...</p>
              </div>
            ) : espacios.length === 0 ? (
              <div className="text-center py-16">
                <h3 className="text-xl font-medium text-gray-900 mb-3">No hay espacios disponibles</h3>
                <p className="text-gray-500 mb-6">No se encontraron espacios que coincidan con el filtro seleccionado</p>
                <Button onClick={() => setFiltro('')} variant="primary">
                  Ver todos los espacios
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {espacios.map((espacio, index) => (
                  <div
                    key={espacio.id}
                    className={`
                      relative rounded-lg shadow-md transition-all duration-200 hover:shadow-lg cursor-pointer
                      ${espacio.estado === 'libre' 
                        ? 'bg-gradient-to-br from-green-400 to-green-500' 
                        : 'bg-gradient-to-br from-red-400 to-red-500'
                      }
                    `}
                  >
                    <div className="relative p-4 text-white text-center">
                      {/* Status Indicator */}
                      <div className="absolute top-2 right-2">
                        <div className={`
                          w-3 h-3 rounded-full
                          ${espacio.estado === 'libre' ? 'bg-green-200' : 'bg-red-200'}
                        `}></div>
                      </div>
                      
                      {/* Space Info */}
                      <h3 className="text-lg font-bold mb-1">
                        #{espacio.id}
                      </h3>
                      
                      <p className="text-xs opacity-90 mb-3">
                        Zona {espacio.zona}
                      </p>
                      
                      {/* Status Badge */}
                      <div className="mb-3">
                        <Badge 
                          variant={espacio.estado === 'libre' ? 'success' : 'danger'}
                          className="bg-white bg-opacity-20 text-white border-white border-opacity-30 text-xs"
                        >
                          {espacio.estado === 'libre' ? '✓ LIBRE' : '✗ OCUPADO'}
                        </Badge>
                      </div>
                      
                      {/* Action Button */}
                      <div className="w-full">
                        {espacio.estado === 'libre' ? (
                          <Button
                            onClick={() => handleOcupar(espacio.id)}
                            variant="danger"
                            size="sm"
                            disabled={actionLoading === espacio.id}
                            className="w-full bg-white bg-opacity-20 text-white text-xs"
                          >
                            {actionLoading === espacio.id ? 'Ocupando...' : 'Ocupar'}
                          </Button>
                        ) : (
                          <Button
                            onClick={() => handleLiberar(espacio.id)}
                            variant="success"
                            size="sm"
                            disabled={actionLoading === espacio.id}
                            className="w-full bg-white bg-opacity-20 text-white text-xs"
                          >
                            {actionLoading === espacio.id ? 'Liberando...' : 'Liberar'}
                          </Button>
                        )}
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
  )
}
