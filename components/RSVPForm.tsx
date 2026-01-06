'use client';

import { useState, useCallback, FormEvent } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface FormData {
  name: string;
  email: string;
  attendance: string;
  guests: string;
  dietaryRestrictions: string;
  message: string;
}

export default function RSVPForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    attendance: '',
    guests: '1',
    dietaryRestrictions: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const showConditionalFields = formData.attendance === 'yes' || formData.attendance === 'maybe';

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      await addDoc(collection(db, 'rsvps'), {
        ...formData,
        submittedAt: serverTimestamp(),
      });

      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        attendance: '',
        guests: '1',
        dietaryRestrictions: '',
        message: '',
      });
    } catch (error) {
      console.error('Error submitting RSVP:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name and Email */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
            Nome Completo *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="input-card w-full"
            placeholder="Mario Rossi"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="input-card w-full"
            placeholder="mario.rossi@email.com"
          />
        </div>
      </div>

      {/* Attendance */}
      <div>
        <label htmlFor="attendance" className="block text-sm font-semibold text-gray-700 mb-2">
          Parteciperai? *
        </label>
        <select
          id="attendance"
          name="attendance"
          value={formData.attendance}
          onChange={handleChange}
          required
          className="input-card w-full"
        >
          <option value="">Seleziona una risposta...</option>
          <option value="yes">✅ Sì, ci sarò!</option>
          <option value="no">❌ No, non posso partecipare</option>
          <option value="maybe">❓ Forse</option>
        </select>
      </div>

      {/* Conditional fields for "yes" or "maybe" */}
      {showConditionalFields && (
        <>
          {/* Number of guests */}
          <div>
            <label htmlFor="guests" className="block text-sm font-semibold text-gray-700 mb-2">
              Numero di Ospiti (incluso te) *
            </label>
            <select
              id="guests"
              name="guests"
              value={formData.guests}
              onChange={handleChange}
              required
              className="input-card w-full"
            >
              <option value="1">1 persona</option>
              <option value="2">2 persone</option>
              <option value="3">3 persone</option>
              <option value="4">4 persone</option>
              <option value="5">5+ persone</option>
            </select>
          </div>

          {/* Dietary restrictions */}
          <div>
            <label htmlFor="dietaryRestrictions" className="block text-sm font-semibold text-gray-700 mb-2">
              Restrizioni Alimentari
            </label>
            <input
              type="text"
              id="dietaryRestrictions"
              name="dietaryRestrictions"
              value={formData.dietaryRestrictions}
              onChange={handleChange}
              className="input-card w-full"
              placeholder="Vegetariano, vegano, allergie, ecc."
            />
          </div>
        </>
      )}

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
          Messaggio (Facoltativo)
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={4}
          className="input-card w-full resize-none"
          placeholder="Lascia un messaggio di auguri o note speciali..."
        />
      </div>

      {/* Submit button */}
      <div className="flex justify-center">
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn primary text-lg px-8 py-4 hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? '⏳ Invio in corso...' : '🎉 Conferma Presenza'}
        </button>
      </div>

      {/* Status messages */}
      {submitStatus === 'success' && (
        <div className="p-4 bg-gradient-to-r from-green-50 to-green-100 border-2 border-green-300 rounded-2xl text-green-800 text-center shadow-lg animate-float">
          <div className="text-4xl mb-2">🎊</div>
          <p className="font-bold text-lg">Grazie per la conferma!</p>
          <p className="text-sm">La tua risposta è stata registrata con successo.</p>
        </div>
      )}
      
      {submitStatus === 'error' && (
        <div className="p-4 bg-gradient-to-r from-red-50 to-red-100 border-2 border-red-300 rounded-2xl text-red-800 text-center shadow-lg">
          <div className="text-4xl mb-2">😕</div>
          <p className="font-bold text-lg">Ops! Qualcosa è andato storto</p>
          <p className="text-sm">Per favore riprova tra qualche istante.</p>
        </div>
      )}
    </form>
  );
}