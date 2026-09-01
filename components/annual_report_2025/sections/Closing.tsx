'use client'

import { Download, User, Mail, Loader, CircleCheck, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import type { ClosingData } from '@/types/annualReport2025';
import Image from "next/image"

export default function Closing({ data, onOpenReport }: { data?: ClosingData; onOpenReport?: () => void }) {
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [email, setEmail] = useState('');
  const [validationError, setValidationError] = useState('');
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const apiUrl = process.env.NEXT_PUBLIC_DIRECTUS_URL;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleDownloadClick = () => {
    setEmail('');
    setValidationError('');
    setSubmitStatus('idle');
    setErrorMessage('');
    setShowEmailModal(true);
  };

  const handleSubmit = async () => {
    const trimmed = email.trim();
    if (!trimmed) {
      setValidationError('Email is required');
      return;
    }
    if (!emailRegex.test(trimmed)) {
      setValidationError('Invalid email address');
      return;
    }
    setValidationError('');
    setSubmitStatus('loading');

    try {
      const endpoint = "https://ade577a92a8d4f93aace1d374e2500.22.environment.api.powerplatform.com:443/powerautomate/automations/direct/workflows/d6221748051c4571b6664faeb877772c/triggers/manual/paths/invoke?api-version=1&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=pP3KXC-Uon06XoDPo8wWpp3E8fybfSiQBQ-4_4rBqTk";
      if (!endpoint) {
        setSubmitStatus('error');
        setErrorMessage('Download endpoint not configured.');
        return;
      }
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: trimmed }),
      });

      if (res.ok) {
        setSubmitStatus('success');
        setTimeout(() => {
          setShowEmailModal(false);
          onOpenReport?.();
        }, 1500);
      } else {
        const body = await res.json().catch(() => ({}));
        setSubmitStatus('error');
        setErrorMessage(body.message || body.error || 'Something went wrong. Please try again.');
      }
    } catch {
      setSubmitStatus('error');
      setErrorMessage('Network error. Please check your connection and try again.');
    }
  };

  if (!data) return null;

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
  }

  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.2, 0.7, 0.2, 1] as const } },
  }

  const fadeLeft = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.2, 0.7, 0.2, 1] as const } },
  }

  const fadeRight = {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.2, 0.7, 0.2, 1] as const } },
  }

  return (
    <section id="closing" aria-labelledby="closing-lead" className="relative bg-ar-paper pb-10 pt-6 max-[1080px]:pt-6 max-[1080px]:pb-10" style={{ fontFamily: 'Poppins' }}>
      <div className="mx-auto max-w-content px-6">
        <motion.hr
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.2, 0.7, 0.2, 1] }}
          className="mx-auto h-2 w-[min(86%,920px)] rounded-full bg-secondary-500 border-0 mb-16 origin-center"
        />
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
          className="grid grid-cols-[6fr_4fr] gap-10 max-[860px]:grid-cols-1"
        >
          <motion.div variants={fadeLeft}>
            {data.lead && (
              <h2
                id="closing-lead"
                className="text-4xl font-medium leading-[1.08] tracking-[-0.015em] text-primary-500"
              >
                {data.lead}
              </h2>
            )}

            {data.wordmark && (
              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }} aria-hidden className="relative -mb-4 mt-6 select-none overflow-hidden">
                <span className="text-celeste-300 block whitespace-nowrap text-[clamp(40px,8vw,115px)] font-bold leading-[0.8] tracking-[-0.02em]">
                  {data.wordmark}
                </span>
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-16 border-l-4 border-primary-500 pl-6"
            >
              {data.quote && (
                <blockquote className="text-xl leading-snug">
                  {data.quote}
                </blockquote>
              )}
              {data.authorName && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="my-5 flex items-center gap-3"
                >
                  {data.authorPhotoUrl ? (
                    <img
                      src={data.authorPhotoUrl}
                      alt={data.authorName}
                      className="h-12 w-12 rounded-full object-cover"
                    />
                  ) : (
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-ar-navy-100 text-ar-navy-600">
                      <Image src={`${apiUrl}/assets/811aa361-e9e6-4c91-85a0-f0951f464111?format=webp&quality=75`} className='rounded-full'  alt='Ramón Martínez'/>
                    </span>
                  )}
                  <div>
                    <p className="font-semibold text-ar-ink">{data.authorName}</p>
                    {data.authorRole && <p className="text-sm text-ar-muted">{data.authorRole}</p>}
                  </div>
                </motion.div>
              )}
            </motion.div>
          </motion.div>

          <motion.div variants={fadeRight} className="relative flex flex-col items-center justify-center overflow-hidden rounded-2xl bg-white p-6 mb-8 shadow-sh-sm text-center">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative z-10 flex flex-col items-center"
            >
              <span className="inline-flex h-14 w-14 p-2 items-center justify-center rounded-full bg-celeste-300 text-primary-500">
                <svg width="80px" height="80px" viewBox="-7.2 -7.2 38.40 38.40" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M19 15V21M19 21L17 19M19 21L21 19M13 3H8.2C7.0799 3 6.51984 3 6.09202 3.21799C5.71569 3.40973 5.40973 3.71569 5.21799 4.09202C5 4.51984 5 5.0799 5 6.2V17.8C5 18.9201 5 19.4802 5.21799 19.908C5.40973 20.2843 5.71569 20.5903 6.09202 20.782C6.51984 21 7.0799 21 8.2 21H14M13 3L19 9M13 3V7.4C13 7.96005 13 8.24008 13.109 8.45399C13.2049 8.64215 13.3578 8.79513 13.546 8.89101C13.7599 9 14.0399 9 14.6 9H19M19 9V11M9 17H13M9 13H15M9 9H10" stroke="#00586f" stroke-width="1.296" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
              </span>
              {data.downloadTitle && (
                <h3 className="mt-4 text-lg font-extrabold">{data.downloadTitle}</h3>
              )}
              {data.downloadCopy && <p className="mt-1 text-sm text-ar-muted">{data.downloadCopy}</p>}
              <motion.button
                type="button"
                onClick={handleDownloadClick}
                whileHover={{ scale: 1.02, boxShadow: '0 6px 20px rgba(0,0,0,0.15)' }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="mt-6 inline-flex items-center gap-2 rounded-sm bg-secondary-500 px-5 py-2.5 text-sm font-medium text-white shadow-sh-md"
              >
                DOWNLOAD FULL REPORT <Download size={16} aria-hidden />
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0 opacity-60">
        <div className="absolute bottom-0 -right-24 h-80 w-96 bg-celeste-100" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }} />
        <div className="absolute bottom-0 -right-16 h-60 w-80 bg-celeste-200" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }} />
        <div className="absolute bottom-0 -right-12 h-48 w-72 bg-white" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }} />
        <div className="absolute bottom-0 -right-6 h-40 w-60 bg-celeste-300" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }} />
      </div>

      <Dialog open={showEmailModal} onOpenChange={setShowEmailModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{data.modal_title}</DialogTitle>
            <DialogDescription className='my-4 mb-4'>{data.modal_subtitle}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="relative">
              <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-ar-muted" />
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setValidationError(''); }}
                placeholder="you@example.com"
                disabled={submitStatus === 'loading' || submitStatus === 'success'}
                className="w-full rounded-md border border-gray-300 bg-white py-2.5 pl-10 pr-3 text-sm outline-none focus:border-secondary-500 focus:ring-1 focus:ring-secondary-500 disabled:opacity-50"
              />
              {validationError && (
                <p className="mt-1 text-xs text-red-500">{validationError}</p>
              )}
            </div>

            {submitStatus === 'error' && (
              <div className="flex items-start gap-2 rounded-md bg-red-50 p-3 text-sm text-red-600">
                <AlertCircle size={16} className="mt-0.5 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {submitStatus === 'success' && (
              <div className="flex items-center gap-2 rounded-md bg-green-50 p-3 text-sm text-green-700">
                <CircleCheck size={16} className="shrink-0" />
                <span>Check your email for the download link!</span>
              </div>
            )}

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowEmailModal(false)}
                disabled={submitStatus === 'loading'}
                className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-ar-ink hover:bg-gray-50 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={submitStatus === 'loading' || submitStatus === 'success'}
                className="inline-flex items-center gap-2 rounded-md bg-secondary-500 px-4 py-2 text-sm font-medium text-white hover:bg-secondary-600 disabled:opacity-50"
              >
                {submitStatus === 'loading' && <Loader size={16} className="animate-spin" />}
                {submitStatus === 'loading' ? 'Sending...' : 'Send'}
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
