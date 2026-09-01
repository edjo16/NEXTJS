"use client"
import { useState } from 'react'
import { X, FileText, Clock } from 'lucide-react'

interface ProgressPopupProps {
  isOpen: boolean
  onAccept: () => void
  onCancel: () => void
  lastSaved?: Date
}

export function ProgressPopup({ isOpen, onAccept, onCancel, lastSaved }: ProgressPopupProps) {
  if (!isOpen) return null

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full mx-4 overflow-hidden">
        <div className="bg-gradient-to-r from-primary-500 to-primary-900 p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white bg-opacity-20 p-2 rounded-lg">
                <FileText className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">Form in Progress</h3>
                <p className="text-blue-100 text-sm">Continue where you left off</p>
              </div>
            </div>
            <button
              onClick={onCancel}
              className="text-white hover:bg-white hover:bg-opacity-20 p-1 rounded-lg transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-center gap-2 text-gray-600 mb-4">
            <Clock className="h-4 w-4" />
            <span className="text-sm">
              Last saved: {lastSaved ? formatDate(lastSaved) : 'Unknown'}
            </span>
          </div>

          <p className="text-gray-700 mb-6">
            You have a form in progress. Would you like to continue filling it out from where you left off?
          </p>

          <div className="flex gap-3">
            <button
              onClick={onCancel}
              className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Start Fresh
            </button>
            <button
              onClick={onAccept}
              className="flex-1 px-4 py-3 bg-gradient-to-r from-primary-500 to-primary-900 text-white rounded-lg hover:from-primary-900 hover:to-primary-500 transition-colors font-medium shadow-lg"
            >
              Continue Form
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}