import React, { useEffect, useState, useRef } from 'react';
import QRCode from 'qrcode';
import { X, Copy, Check, ExternalLink, Smartphone, Sparkles, Share2 } from 'lucide-react';
import { Attraction } from '../types/gardens';
import { ATTRACTIONS_DATA } from '../data/attractions';

interface QrShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  itineraryAttractionIds: string[];
  selectedAttractionId: string | null;
}

export const QrShareModal: React.FC<QrShareModalProps> = ({
  isOpen,
  onClose,
  itineraryAttractionIds,
  selectedAttractionId
}) => {
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Construct stateful URL
  const searchParams = new URLSearchParams();
  if (itineraryAttractionIds.length > 0) {
    searchParams.set('itinerary', itineraryAttractionIds.join(','));
  }
  if (selectedAttractionId) {
    searchParams.set('loc', selectedAttractionId);
  }
  searchParams.set('src', 'qr_continuation');

  const shareUrl = typeof window !== 'undefined'
    ? `${window.location.origin}${window.location.pathname}?${searchParams.toString()}`
    : '';

  useEffect(() => {
    if (isOpen && shareUrl) {
      QRCode.toDataURL(shareUrl, {
        width: 260,
        margin: 2,
        color: {
          dark: '#064e3b', // Deep emerald botanical green
          light: '#ffffff'
        }
      })
        .then(url => setQrDataUrl(url))
        .catch(err => console.error('QR code generation error:', err));
    }
  }, [isOpen, shareUrl]);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    });
  };

  const itineraryAttractions = itineraryAttractionIds
    .map(id => ATTRACTIONS_DATA.find(a => a.id === id))
    .filter((a): a is Attraction => a !== undefined);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        onClick={onClose}
        className="fixed inset-0"
        aria-hidden="true"
      />

      <div className="relative w-full max-w-md bg-white dark:bg-stone-900 rounded-3xl shadow-2xl border border-stone-200 dark:border-stone-800 p-6 z-10 space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100">
                Continue on Mobile
              </h3>
              <p className="text-xs text-stone-500">
                Seamless cross-device session handoff
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* QR Code Presentation Box */}
        <div className="flex flex-col items-center justify-center p-6 bg-stone-50 dark:bg-stone-800/40 rounded-2xl border border-stone-200/80 dark:border-stone-700/60">
          {qrDataUrl ? (
            <div className="p-3 bg-white rounded-2xl shadow-md border border-stone-100">
              <img
                src={qrDataUrl}
                alt="Scan QR code to open your Gardens by the Bay itinerary on mobile"
                className="w-48 h-48 rounded-xl object-contain"
              />
            </div>
          ) : (
            <div className="w-48 h-48 bg-stone-100 dark:bg-stone-800 rounded-2xl flex items-center justify-center text-xs text-stone-400">
              Generating secure QR...
            </div>
          )}

          <p className="text-xs text-center text-stone-600 dark:text-stone-400 mt-4 max-w-xs">
            Scan with your smartphone camera to instantly launch this itinerary on the move. No app install needed.
          </p>
        </div>

        {/* Synchronized Summary */}
        <div className="p-3 bg-emerald-50/70 dark:bg-emerald-950/30 rounded-xl border border-emerald-200/50 dark:border-emerald-900/50 text-xs text-emerald-900 dark:text-emerald-300 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              {itineraryAttractions.length > 0
                ? `${itineraryAttractions.length} Stops synchronised in this link`
                : 'Interactive park map & visitor guide'}
            </span>
          </div>
        </div>

        {/* Share Link Actions */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={shareUrl}
              className="flex-1 bg-stone-50 dark:bg-stone-800 text-xs text-stone-600 dark:text-stone-300 px-3 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 truncate font-mono"
            />
            <button
              onClick={handleCopy}
              className="px-4 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shrink-0 shadow-sm"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>

          <a
            href={shareUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 hover:bg-stone-50 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Test Mobile Session in New Window</span>
          </a>
        </div>
      </div>
    </div>
  );
};
