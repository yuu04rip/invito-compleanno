'use client';

import { useState, FormEvent } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface QuizData {
  name: string;
  age: string;
  food: string;
  dessert: string;
}

export default function RSVPForm() {
  const [formData, setFormData] = useState<QuizData>({
    name: '',
    age: '',
    food: '',
    dessert: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.age || !formData.food || !formData.dessert) {
      alert('Per favore completa tutte le domande per poter inviare il modulo!');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      await addDoc(collection(db, 'rsvps'), {
        ...formData,
        submittedAt: serverTimestamp(),
      });

      setSubmitStatus('success');
      setFormData({ name: '', age: '', food: '', dessert: '' });
    } catch (error) {
      console.error('Error submitting RSVP:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Nome */}
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
              placeholder=""
          />
        </div>

        {/* Età */}
        <div>
          <p className="font-semibold mb-2">Quanti anni compio? *</p>
          <div className="flex flex-col gap-2">
            {['16 (perchè li dimostro)', '22 (purtroppo)', '35 (problemi al ginocchio)', '23 (lo metto a caso'].map((age) => (
                <label key={age} className="flex items-center gap-2">
                  <input
                      type="radio"
                      name="age"
                      value={age}
                      checked={formData.age === age}
                      onChange={handleChange}
                      className="accent-pastel-pink"
                  />
                  {age} anni
                </label>
            ))}
          </div>
        </div>

        {/* Cibo */}
        <div>
          <p className="font-semibold mb-2">Cosa vuoi mangiare? *</p>
          <div className="flex flex-col gap-2">
            {['Sopa de mani - halal', 'Sopa de mani - made iris', 'Sopa de mani - grrrr', 'Sopa de mani'].map((food) => (
                <label key={food} className="flex items-center gap-2">
                  <input
                      type="radio"
                      name="food"
                      value={food}
                      checked={formData.food === food}
                      onChange={handleChange}
                      className="accent-pastel-blue"
                  />
                  {food}
                </label>
            ))}
          </div>
        </div>

        {/* Dolce */}
        <div>
          <p className="font-semibold mb-2">Vuoi un dolce? *</p>
          <div className="flex flex-col gap-2">
            {['Sì', 'No', 'Boh'].map((dessert) => (
                <label key={dessert} className="flex items-center gap-2">
                  <input
                      type="radio"
                      name="dessert"
                      value={dessert}
                      checked={formData.dessert === dessert}
                      onChange={handleChange}
                      className="accent-pastel-yellow"
                  />
                  {dessert}
                </label>
            ))}
          </div>
        </div>

        {/* Submit button */}
        <div className="flex justify-center">
          <button
              type="submit"
              disabled={isSubmitting}
              className="btn primary text-lg px-8 py-4 hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? '⏳ Invio in corso...' : '🎉 Invia Risposte'}
          </button>
        </div>

        {/* Status messages */}
        {submitStatus === 'success' && (
            <div className="p-4 bg-gradient-to-r from-green-50 to-green-100 border-2 border-green-300 rounded-2xl text-green-800 text-center shadow-lg animate-float">
              <div className="text-4xl mb-2">🎊</div>
              <p className="font-bold text-lg">Grazie per le tue risposte!</p>
              <p className="text-sm">La tua registrazione è stata completata con successo.</p>
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
