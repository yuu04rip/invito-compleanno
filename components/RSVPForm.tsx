'use client';

import { useState, FormEvent } from 'react';
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-2xl mx-auto bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-2xl">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-pastel-purple mb-2">RSVP</h2>
        <p className="text-gray-600">Conferma la tua presenza!</p>
      </div>

      <div>
        <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
          Nome Completo *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-xl border-2 border-pastel-purple/30 focus:border-pastel-purple focus:outline-none transition-colors"
          placeholder="Il tuo nome"
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
          required
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-xl border-2 border-pastel-pink/30 focus:border-pastel-pink focus:outline-none transition-colors"
          placeholder="tua@email.com"
        />
      </div>

      <div>
        <label htmlFor="attendance" className="block text-sm font-semibold text-gray-700 mb-2">
          Parteciperai? *
        </label>
        <select
          id="attendance"
          name="attendance"
          required
          value={formData.attendance}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-xl border-2 border-pastel-blue/30 focus:border-pastel-blue focus:outline-none transition-colors"
        >
          <option value="">Seleziona un'opzione</option>
          <option value="yes">Sì, ci sarò! 🎉</option>
          <option value="no">No, mi dispiace 😢</option>
          <option value="maybe">Forse</option>
        </select>
      </div>

      {formData.attendance === 'yes' && (
        <>
          <div>
            <label htmlFor="guests" className="block text-sm font-semibold text-gray-700 mb-2">
              Numero di ospiti (incluso te)
            </label>
            <input
              type="number"
              id="guests"
              name="guests"
              min="1"
              max="10"
              value={formData.guests}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border-2 border-pastel-mint/30 focus:border-pastel-mint focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label htmlFor="dietaryRestrictions" className="block text-sm font-semibold text-gray-700 mb-2">
              Restrizioni alimentari
            </label>
            <input
              type="text"
              id="dietaryRestrictions"
              name="dietaryRestrictions"
              value={formData.dietaryRestrictions}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border-2 border-pastel-peach/30 focus:border-pastel-peach focus:outline-none transition-colors"
              placeholder="Allergie, diete speciali, ecc."
            />
          </div>
        </>
      )}

      <div>
        <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
          Messaggio (opzionale)
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          value={formData.message}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-xl border-2 border-pastel-lavender/30 focus:border-pastel-lavender focus:outline-none transition-colors resize-none"
          placeholder="Lascia un messaggio di auguri..."
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-gradient-to-r from-pastel-pink via-pastel-purple to-pastel-blue text-white font-bold py-4 px-8 rounded-xl hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
      >
        {isSubmitting ? 'Invio in corso...' : 'Invia RSVP 🎊'}
      </button>

      {submitStatus === 'success' && (
        <div className="p-4 bg-green-100 border-2 border-green-300 rounded-xl text-green-800 text-center">
          ✨ Grazie! La tua risposta è stata registrata con successo! ✨
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="p-4 bg-red-100 border-2 border-red-300 rounded-xl text-red-800 text-center">
          ❌ Ops! Si è verificato un errore. Per favore riprova.
        </div>
      )}
    </form>
  );
}
