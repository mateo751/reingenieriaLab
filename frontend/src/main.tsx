import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Espacios from './pages/Espacios'
import Clientes from './pages/Clientes'
import './index.css'
function App(){
  const [currentPath, setCurrentPath] = useState('/')
  
  useEffect(() => {
    setCurrentPath(window.location.pathname)
  }, [])
  
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
        <nav className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50 backdrop-blur-sm bg-opacity-95">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center space-x-8">
                <div className="flex-shrink-0 group">
                  <div className="flex items-center space-x-2">
                    <div>
                      <h1 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        ParkingPro
                      </h1>
                    </div>
                  </div>
                </div>
                
                <div className="hidden md:flex space-x-1">
                  <Link 
                    to='/' 
                    onClick={() => setCurrentPath('/')}
                    className={`
                      inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 transform hover:scale-105
                      ${currentPath === '/' 
                        ? 'bg-gradient-to-r from-green-500 to-blue-600 text-white shadow-lg' 
                        : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                      }
                    `}
                  >

                    Espacios
                  </Link>
                  <Link 
                    to='/clientes' 
                    onClick={() => setCurrentPath('/clientes')}
                    className={`
                      inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 transform hover:scale-105
                      ${currentPath === '/clientes' 
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg' 
                        : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                      }
                    `}
                  >
                    Clientes
                  </Link>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="hidden md:flex items-center space-x-4">
                  <div className="flex items-center space-x-2 px-3 py-1 bg-gradient-to-r from-gray-100 to-blue-100 rounded-full">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-sm text-gray-600 font-medium">Sistema Online</span>
                  </div>
                  <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-md">
                    v2.0
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Enhanced Mobile menu */}
          <div className="md:hidden border-t border-gray-200 bg-white bg-opacity-90 backdrop-blur-sm">
            <div className="px-4 pt-2 pb-3 space-y-2">
              <Link 
                to='/' 
                onClick={() => setCurrentPath('/')}
                className={`
                  flex items-center px-3 py-3 rounded-lg text-base font-medium transition-all duration-200
                  ${currentPath === '/' 
                    ? 'bg-gradient-to-r from-green-500 to-blue-600 text-white shadow-lg transform scale-105' 
                    : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                  }
                `}
              >

                Espacios de Estacionamiento
              </Link>
              <Link 
                to='/clientes' 
                onClick={() => setCurrentPath('/clientes')}
                className={`
                  flex items-center px-3 py-3 rounded-lg text-base font-medium transition-all duration-200
                  ${currentPath === '/clientes' 
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transform scale-105' 
                    : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                  }
                `}
              >

                Gestión de Clientes
              </Link>
            </div>
          </div>
        </nav>
        
        <main className="relative">
          <Routes>
            <Route path='/' element={<Espacios/>} />
            <Route path='/clientes' element={<Clientes/>} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}
ReactDOM.createRoot(document.getElementById('root')!).render(<App/>)
