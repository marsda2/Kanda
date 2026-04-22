'use client';
import React, { useEffect, useState, useCallback } from 'react';
import { motion } from 'motion/react';
import { Plus, Pencil, Trash2, Save, X, Loader2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface EventItem {
  id: string;
  title: string;
  collaborator: string | null;
  image: string | null;
  icon: string | null;
  description: string | null;
  date: string;
  time: string;
  included: string[] | null;
}

type EditingEvent = Partial<EventItem> & { _isNew?: boolean };

export default function EventsManager() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingEvent, setEditingEvent] = useState<EditingEvent | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const fetchEvents = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase.from('events').select('*').order('date', { ascending: true });
    setEvents(data || []);
    setLoading(false);
  }, []);

  useEffect(() => { fetchEvents(); }, [fetchEvents]);

  const saveEvent = async () => {
    if (!editingEvent?.title || !editingEvent?.date || !editingEvent?.time) return;
    setSaving(true);
    
    // Parse included back into array if it's a string, or keep it as is if array
    let parsedIncluded = editingEvent.included;
    if (typeof editingEvent.included === 'string') {
        parsedIncluded = (editingEvent.included as string).split('\n').filter(s => s.trim() !== '');
    }

    const payload = {
      title: editingEvent.title,
      collaborator: editingEvent.collaborator || null,
      image: editingEvent.image || null,
      icon: editingEvent.icon || 'Star', // Default to star if none provided
      description: editingEvent.description || null,
      date: editingEvent.date,
      time: editingEvent.time,
      included: parsedIncluded || [],
    };
    
    if (editingEvent._isNew) {
      await supabase.from('events').insert(payload);
    } else {
      await supabase.from('events').update(payload).eq('id', editingEvent.id!);
    }
    setEditingEvent(null); setSaving(false); fetchEvents();
  };

  const deleteEvent = async (id: string) => {
    await supabase.from('events').delete().eq('id', id);
    setDeleteConfirm(null); fetchEvents();
  };

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-[#173018]" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <button onClick={() => setEditingEvent({ _isNew: true, title: '', collaborator: '', image: '', icon: 'Star', description: '', date: '', time: '', included: [] })} className="flex items-center gap-2 bg-[#173018] text-white px-5 py-2.5 rounded-xl font-headline font-bold text-xs uppercase tracking-widest hover:bg-[#2D472C] transition-colors">
          <Plus className="w-4 h-4" /> Nuevo Evento
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {events.map(event => (
          <div key={event.id} className="bg-white rounded-2xl border border-[#173018]/10 overflow-hidden shadow-sm flex flex-col">
             {event.image && (
                <div className="h-32 w-full relative">
                    <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                </div>
            )}
            <div className="p-5 flex flex-col flex-grow">
              <div className="flex justify-between items-start mb-2">
                 <h3 className="font-headline font-bold text-xl text-[#173018] uppercase tracking-tight">{event.title}</h3>
                 <div className="flex gap-1 shrink-0 ml-2">
                    <button onClick={() => setEditingEvent({ ...event })} className="p-1.5 text-[#434841] hover:text-[#705d00] transition-colors"><Pencil className="w-4 h-4" /></button>
                    <button onClick={() => setDeleteConfirm(event.id)} className="p-1.5 text-[#434841] hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
                 </div>
              </div>
              
              <div className="text-sm font-body text-[#434841] space-y-1 mb-4 flex-grow">
                {event.collaborator && <p><strong>Colaborador:</strong> {event.collaborator}</p>}
                <p><strong>Fecha:</strong> {event.date}</p>
                <p><strong>Hora:</strong> {event.time}</p>
                <p className="line-clamp-2">{event.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Event Modal */}
      {editingEvent && (
        <Modal title={editingEvent._isNew ? 'Nuevo Evento' : 'Editar Evento'} onClose={() => setEditingEvent(null)}>
          <div className="space-y-4 max-h-[70vh] overflow-y-auto px-1 -mx-1">
            <Field label="Título *" value={editingEvent.title || ''} onChange={v => setEditingEvent({ ...editingEvent, title: v })} placeholder="Ej: Taller de Cerámica" />
            <div className="grid grid-cols-2 gap-4">
              <Field label="Fecha *" value={editingEvent.date || ''} onChange={v => setEditingEvent({ ...editingEvent, date: v })} placeholder="Ej: Domingo 12 de Abril" />
              <Field label="Hora *" value={editingEvent.time || ''} onChange={v => setEditingEvent({ ...editingEvent, time: v })} placeholder="Ej: 3:00 PM - 5:00 PM" />
            </div>
            <Field label="Colaborador (opcional)" value={editingEvent.collaborator || ''} onChange={v => setEditingEvent({ ...editingEvent, collaborator: v })} placeholder="Ej: @arca_ceramics" />
            <Field label="URL Imagen (opcional)" value={editingEvent.image || ''} onChange={v => setEditingEvent({ ...editingEvent, image: v })} placeholder="Ej: https://..." />
            <div>
              <label className="font-headline font-bold text-[10px] uppercase tracking-widest text-[#173018] mb-1.5 block">Ícono (Lucide) *</label>
              <select value={editingEvent.icon || 'Star'} onChange={e => setEditingEvent({ ...editingEvent, icon: e.target.value })} className="w-full bg-[#f9f9f9] border border-[#173018]/10 rounded-xl px-4 py-3 font-body text-sm outline-none focus:border-[#705d00] transition-colors">
                <option value="Star">Estrella</option>
                <option value="Dog">Perro</option>
                <option value="PenTool">Pincel/Herramienta</option>
                <option value="CalendarDays">Calendario</option>
                <option value="Music">Música</option>
              </select>
            </div>
            <TextArea label="Descripción (opcional)" value={editingEvent.description || ''} onChange={v => setEditingEvent({ ...editingEvent, description: v })} placeholder="Detalles del evento..." />
            <TextArea 
                label="¿Qué incluye? (Un ítem por línea)" 
                value={Array.isArray(editingEvent.included) ? editingEvent.included.join('\n') : (editingEvent.included || '')} 
                onChange={v => setEditingEvent({ ...editingEvent, included: v as any })} 
                placeholder="Materiales\nBebida\nGalleta" 
            />
            
            <SaveButton saving={saving} onClick={saveEvent} />
          </div>
        </Modal>
      )}

      {/* Delete Confirmation */}
      {deleteConfirm && (
        <Modal title="¿Estás seguro?" onClose={() => setDeleteConfirm(null)}>
          <p className="text-sm text-[#434841] mb-6">Esta acción no se puede deshacer. Se eliminará el evento de forma permanente.</p>
          <div className="flex gap-3">
            <button onClick={() => setDeleteConfirm(null)} className="flex-1 py-3 rounded-xl border border-[#173018]/10 font-headline font-bold text-xs uppercase tracking-widest text-[#434841] hover:bg-[#eeeeee] transition-colors">Cancelar</button>
            <button onClick={() => deleteEvent(deleteConfirm)} className="flex-1 py-3 rounded-xl bg-red-500 text-white font-headline font-bold text-xs uppercase tracking-widest hover:bg-red-600 transition-colors">Eliminar</button>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ---- Reusable Sub-Components ----
function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose}></div>
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="relative w-full max-w-lg bg-white rounded-2xl p-8 shadow-2xl max-h-[90vh] flex flex-col">
        <button onClick={onClose} className="absolute top-5 right-5 text-[#434841] hover:text-[#173018] transition-colors"><X className="w-5 h-5" /></button>
        <h3 className="font-headline font-bold text-xl text-[#173018] mb-6 shrink-0">{title}</h3>
        {children}
      </motion.div>
    </div>
  );
}

function Field({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (v: string) => void; placeholder: string }) {
  return (
    <div>
      <label className="font-headline font-bold text-[10px] uppercase tracking-widest text-[#173018] mb-1.5 block">{label}</label>
      <input type="text" value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} className="w-full bg-[#f9f9f9] border border-[#173018]/10 rounded-xl px-4 py-3 font-body text-sm outline-none focus:border-[#705d00] transition-colors" />
    </div>
  );
}

function TextArea({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (v: string) => void; placeholder: string }) {
  return (
    <div>
      <label className="font-headline font-bold text-[10px] uppercase tracking-widest text-[#173018] mb-1.5 block">{label}</label>
      <textarea value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} rows={4} className="w-full bg-[#f9f9f9] border border-[#173018]/10 rounded-xl px-4 py-3 font-body text-sm outline-none focus:border-[#705d00] transition-colors resize-none" />
    </div>
  );
}

function SaveButton({ saving, onClick }: { saving: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick} disabled={saving} className="w-full bg-gradient-to-br from-[#173018] to-[#2D472C] text-white py-3.5 rounded-xl font-headline font-bold text-xs uppercase tracking-widest hover:shadow-lg transition-all disabled:opacity-70 flex items-center justify-center gap-2 mt-4 shrink-0">
      {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Save className="w-4 h-4" /> Guardar</>}
    </button>
  );
}
