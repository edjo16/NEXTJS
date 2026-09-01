"use client";

import { useEffect, useCallback } from 'react'
import { UseFormReturn } from 'react-hook-form'

const COOKIE_NAME = 'due_diligence_form_progress'
const COOKIE_EXPIRY_DAYS = 14

interface FormProgressData {
  formData: any
  currentStep: number
  timestamp: number
}

export function useFormProgress(methods: UseFormReturn<any>, currentStep: number) {
  // Save progress to cookie
  const saveProgress = useCallback(() => {
    if (typeof document === 'undefined') return;
    
    try {
      const formData = methods.getValues()
      
      // Create serializable data (excluding files)
      const serializableData = {
        ...formData,
        documents: {
          uploaded_files: [], // Don't save files to cookies
        },
      }

      const progressData: FormProgressData = {
        formData: serializableData,
        currentStep,
        timestamp: Date.now(),
      }

      const jsonData = JSON.stringify(progressData)
      const expiryDate = new Date()
      expiryDate.setDate(expiryDate.getDate() + COOKIE_EXPIRY_DAYS)
      
      document.cookie = `${COOKIE_NAME}=${encodeURIComponent(jsonData)}; expires=${expiryDate.toUTCString()}; path=/; SameSite=Strict`
    } catch (error) {
      console.error('Error saving form progress:', error)
    }
  }, [methods, currentStep])

  // Load progress from cookie
  const loadProgress = useCallback((): FormProgressData | null => {
    if (typeof document === 'undefined') return null;
    
    try {
      const cookies = document.cookie.split(';')
      const progressCookie = cookies.find(cookie => 
        cookie.trim().startsWith(`${COOKIE_NAME}=`)
      )

      if (!progressCookie) return null

      const cookieValue = progressCookie.split('=')[1]
      const decodedValue = decodeURIComponent(cookieValue)
      const progressData: FormProgressData = JSON.parse(decodedValue)

      // Check if cookie is still valid (within 2 weeks)
      const now = Date.now()
      const cookieAge = now - progressData.timestamp
      const maxAge = COOKIE_EXPIRY_DAYS * 24 * 60 * 60 * 1000 // 2 weeks in milliseconds

      if (cookieAge > maxAge) {
        clearProgress()
        return null
      }

      return progressData
    } catch (error) {
      console.error('Error loading form progress:', error)
      return null
    }
  }, [])

  // Clear progress from cookie
  const clearProgress = useCallback(() => {
    if (typeof document === 'undefined') return;
    document.cookie = `${COOKIE_NAME}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
  }, [])

  // Check if there's saved progress
  const hasSavedProgress = useCallback((): boolean => {
    return loadProgress() !== null
  }, [loadProgress])

  // Restore progress to form
  const restoreProgress = useCallback(() => {
    const progressData = loadProgress()
    if (progressData) {
      methods.reset(progressData.formData)
      return progressData.currentStep
    }
    return 0
  }, [loadProgress, methods])

  return {
    saveProgress,
    loadProgress,
    clearProgress,
    hasSavedProgress,
    restoreProgress,
  }
}