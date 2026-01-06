'use client';

import { useState, FormEvent } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

type Option = { id: string; text: string };

export default function RSVPForm() {
  // Mantengo il form base ma lo presento come blocchi domanda/opzioni
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Stato demo del questionario (puoi invece caricarlo da DB)
  const [questions, setQuestions] = useState([
    {
      id: 'q-1',
      type: 'multiple', // multiple | text
      required: true,
      text: 'Cosa vuoi mangiare?',
      options: [
        { id: 'o-1', text: 'Sopa de mani - halal' },
        { id: 'o-2', text: 'Sopa de mani - made Iris' },
        { id: 'o-3', text: 'Sopa de mani - grrrr' },
      ] as Option[],
    },
    {
      id: 'q-2',
      type: 'multiple',
      required: false,
      text: 'Vuoi un dolce',
      options: [
        { id: 'o-4', text: 'Si' },
        { id: 'o-5', text: 'No' },
        { id: 'o-6', text: 'Boh' },
      ] as Option[],
    },
  ]);

  const addOption = (qId: string) => {
    setQuestions((prev) =>
        prev.map((q) =>
            q.id === qId
                ? { ...q, options: [...q.options, { id: `${qId}-o-${Date.now()}`, text: 'Nuova opzione' }] }
                : q
        )
    );
  };

  const removeOption = (qId: string, optionId: string) => {
    setQuestions((prev) => prev.map((q) => (q.id === qId ? { ...q, options: q.options.filter((o) => o.id !== optionId) } : q)));
  };

  const updateOptionText = (qId: string, optionId: string, value: string) => {
    setQuestions((prev) =>
        prev.map((q) =>
            q.id === qId ? { ...q, options: q.options.map((o) => (o.id === optionId ? { ...o, text: value } : o)) } : q
        )
    );
  };

  const toggleRequired = (qId: string) => {
    setQuestions((prev) => prev.map((q) => (q.id === qId ? { ...q, required: !q.required } : q)));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      await addDoc(collection(db, 'rsvps'), {
        name,
        email,
        submittedAt: serverTimestamp(),
        answers: [], // integra le risposte se le raccogli
      });

      setSubmitStatus('success');
      setName('');
      setEmail('');
    } catch (error) {
      console.error('Error submitting RSVP:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Parte anagrafica semplice */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
              className="input-card"
              placeholder="Nome completo"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
          />
          <input
              className="input-card"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
          />
        </div>

        {/* Questionario builder style */}
        <div>
          {questions.map((q) => (
              <div key={q.id} className="question-block">
                <div className="question-header">
                  <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                    <select
                        className="input-card"
                        value={q.type}
                        onChange={(e) =>
                            setQuestions((prev) => prev.map((qq) => (qq.id === q.id ? { ...qq, type: e.target.value } : qq)))
                        }
                    >
                      <option value="multiple">Risposta multipla</option>
                      <option value="text">Risposta aperta</option>
                    </select>

                    <label className="flex items-center gap-2 text-sm text-gray-700">
                      <input type="checkbox" checked={q.required} onChange={() => toggleRequired(q.id)} />
                      <span>Necessario</span>
                    </label>
                  </div>

                  <button
                      type="button"
                      className="option-remove"
                      onClick={() => setQuestions((prev) => prev.filter((qq) => qq.id !== q.id))}
                      title="Rimuovi domanda"
                  >
                    ✕
                  </button>
                </div>

                {/* Testo domanda */}
                <textarea
                    className="input-card w-full"
                    rows={2}
                    value={q.text}
                    onChange={(e) => setQuestions((prev) => prev.map((qq) => (qq.id === q.id ? { ...qq, text: e.target.value } : qq)))}
                />

                {/* Opzioni (se multiple) */}
                {q.type === 'multiple' && (
                    <>
                      <div className="options-list">
                        {q.options.map((opt) => (
                            <div key={opt.id} className="option-item">
                              <div className="option-bullet" />
                              <input
                                  className="option-text bg-transparent border-0 focus:outline-none"
                                  value={opt.text}
                                  onChange={(e) => updateOptionText(q.id, opt.id, e.target.value)}
                              />
                              <button type="button" aria-label="Rimuovi opzione" className="option-remove" onClick={() => removeOption(q.id, opt.id)}>
                                ✕
                              </button>
                            </div>
                        ))}
                      </div>

                      <div className="mt-3">
                        <button type="button" className="btn ghost" onClick={() => addOption(q.id)}>
                          + Nuova opzione
                        </button>
                      </div>
                    </>
                )}
              </div>
          ))}
        </div>

        {/* Aggiungi domanda / submit */}
        <div className="form-footer">
          <div className="flex items-center gap-3">
            <button
                type="button"
                className="btn"
                onClick={() =>
                    setQuestions((prev) => [
                      ...prev,
                      {
                        id: `q-${Date.now()}`,
                        type: 'multiple',
                        required: false,
                        text: 'Nuova domanda',
                        options: [{ id: `o-${Date.now()}`, text: 'Nuova opzione' }],
                      },
                    ])
                }
            >
              + Aggiungi domanda
            </button>
            <div className="text-sm text-gray-600">Le modifiche qui sono a scopo dimostrativo — salva su DB se necessario</div>
          </div>

          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <button type="submit" disabled={isSubmitting} className="btn primary">
              {isSubmitting ? 'Invio...' : 'Get on the list'}
            </button>
          </div>
        </div>

        {submitStatus === 'success' && (
            <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-center">
              ✨ Grazie! La tua risposta è stata registrata.
            </div>
        )}
        {submitStatus === 'error' && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-center">
              ❌ Si è verificato un errore — riprova.
            </div>
        )}
      </form>
  );
}