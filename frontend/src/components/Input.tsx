import React from 'react'

interface InputProps {
  placeholder?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  type?: string
  required?: boolean
  disabled?: boolean
  className?: string
  label?: string
}

export default function Input({ 
  placeholder, 
  value, 
  onChange, 
  type = 'text', 
  required = false,
  disabled = false,
  className = '',
  label
}: InputProps) {
  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        className={`
          block w-full rounded-md border-gray-300 shadow-sm 
          focus:border-blue-500 focus:ring-blue-500 
          disabled:bg-gray-50 disabled:text-gray-500
          ${className}
        `}
      />
    </div>
  )
}