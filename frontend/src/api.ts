import axios from 'axios'
export const api = axios.create({ baseURL: '/api' })
export async function getEspacios(estado?: string){ const url = estado ? `/espacios?estado=${estado}` : '/espacios'; return (await api.get(url)).data }
export async function ocuparEspacio(id:number){ return (await api.put(`/espacios/${id}/ocupar`)).data }
export async function liberarEspacio(id:number){ return (await api.put(`/espacios/${id}/liberar`)).data }
export async function listClientes(page=0,size=10){ return (await api.get(`/clientes?page=${page}&size=${size}`)).data }
export async function addCliente(cliente:any){ return (await api.post('/clientes', cliente)).data }
