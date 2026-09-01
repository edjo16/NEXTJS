'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import Script from 'next/script';
import { Cookie } from 'lucide-react';

type ConsentDecision = 'accepted' | 'declined';
type ConsentMode = 'opt-in' | 'opt-out';

const CONSENT_STORAGE_KEY = 'active-re-cookie-consent';
const GTM_ID = 'GTM-MPPZ7W45';

function isDoNotTrackEnabled() {
    if (typeof navigator === 'undefined') {
        return false;
    }

    return (
        navigator.doNotTrack === '1' ||
        navigator.doNotTrack === 'yes' ||
        (window as Window & { doNotTrack?: string }).doNotTrack === '1'
    );
}

export default function CookieConsent() {
    const [consent, setConsent] = useState<ConsentDecision | null | 'loading'>('loading');

    const consentMode: ConsentMode =
        process.env.NEXT_PUBLIC_COOKIE_CONSENT_MODE === 'opt-out' ? 'opt-out' : 'opt-in';

    useEffect(() => {
        if (isDoNotTrackEnabled()) {
            localStorage.setItem(CONSENT_STORAGE_KEY, 'declined');
            setConsent('declined');
            return;
        }

        const storedValue = localStorage.getItem(CONSENT_STORAGE_KEY);

        if (storedValue === 'accepted' || storedValue === 'declined') {
            setConsent(storedValue);
            return;
        }

        // GDPR-like default: no tracking until explicit acceptance.
        // CCPA-like mode can be enabled with NEXT_PUBLIC_COOKIE_CONSENT_MODE=opt-out.
        setConsent(null);
    }, [consentMode]);

    const shouldShowModal = consent === null;

    const trackingAllowed = useMemo(() => {
        if (consent === 'accepted') {
            return true;
        }

        if (consent === 'loading') {
            return false;
        }

        if (consentMode === 'opt-out' && consent !== 'declined') {
            return true;
        }

        return false;
    }, [consent, consentMode]);

    const handleDecision = (decision: ConsentDecision) => {
        localStorage.setItem(CONSENT_STORAGE_KEY, decision);
        setConsent(decision);
    };

    return (
        <>
            {trackingAllowed && (
                <>
                    <Script
                        id="gtm-script"
                        strategy="afterInteractive"
                        dangerouslySetInnerHTML={{
                            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`,
                        }}
                    />
                    <noscript>
                        <iframe
                            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
                            height="0"
                            width="0"
                            style={{ display: 'none', visibility: 'hidden' }}
                        />
                    </noscript>
                </>
            )}

            {shouldShowModal && (
                <>
                    <div className="fixed inset-0 z-40 bg-black/50" />
                    <div className="fixed bottom-20 right-4 z-50 pl-4">
                    <div className="w-full max-w-md rounded-lg border border-gray-200 bg-[#f5f5f5] p-6 shadow-xl">
                        <div className="flex gap-4">
                            <div className="flex-shrink-0">
                                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#00586f] to-[#4a9a9a] shadow-md">
                                    <Cookie className="h-9 w-9 text-white" />
                                </div>
                            </div>

                            <div className="flex-1">
                                <h2 className="mb-2 text-xl font-semibold text-gray-800">We Use Cookies</h2>
                                <p className="mb-3 text-sm leading-relaxed text-gray-700">
                                    This site uses cookies and tracking technologies to improve user experience and
                                    to analyze performance and traffic on our website. 
                                    <Link href="/cookies" className="ml-1 font-medium text-[#00586f] hover:underline hover:text-[#318792]">
                                        More information on our Cookies
                                    </Link>
                                </p>
                            </div>
                        </div>

                        <div className="mt-4 flex justify-center gap-3">
                            <button
                                onClick={() => handleDecision('accepted')}
                                className="rounded-md bg-[#00586f] px-8 py-2 font-medium text-white transition-colors hover:bg-[#318792]"
                            >
                                Accept
                            </button>
                            <button
                                onClick={() => handleDecision('declined')}
                                className="rounded-md border border-gray-300 bg-white px-8 py-2 font-medium text-gray-700 transition-colors hover:bg-gray-50"
                            >
                                Decline
                            </button>
                        </div>
                    </div>
                </div>
                </>
            )}
        </>
    );
}
