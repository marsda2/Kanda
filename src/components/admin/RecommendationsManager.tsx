'use client';
import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Plus, Pencil, Trash2, Save, X, Loader2, Image as ImageIcon, Upload } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { compressImageToWebp } from '../../utils/imageCompression';

interface Recommendation {
  id: string;
  title: string;
  description: string | null;
  price: string;
  image_url: string;
  sort_order: number;
}

type EditingRecommendation = Partial<Recommendation> & { _isNew?: boolean; _file?: File | null };

export default function RecommendationsManager() {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingRec, setEditingRec] = useState<EditingRecommendation | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchRecommendations = async () => {
    setLoading(true);
    const { data } = await supabase.from('recommendations').select('*').order('sort_order');
    setRecommendations(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchRecommendations();
  }, []);

  const handleImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      // Compress image to WebP
      const compressedFile = await compressImageToWebp(file, 800, 0.8);
      
      // Update local state to show preview
      const previewUrl = URL.createObjectURL(compressedFile);
      setEditingRec((prev) => prev ? { ...prev, image_url: previewUrl, _file: compressedFile } : null);
    } catch (error) {
      console.error('Error compressing image:', error);
      alert('Error al procesar la imagen.');
    }
  };

  const uploadImage = async (file: File): Promise<string | null> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
    const filePath = `recommendations/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('kanda-images')
      .upload(filePath, file);

    if (uploadError) {
      console.error('Upload error:', uploadError);
      return null;
    }

    const { data } = supabase.storage.from('kanda-images').getPublicUrl(filePath);
    return data.publicUrl;
  };

  const saveRecommendation = async () => {
    if (!editingRec?.title || !editingRec.price) return;
    setSaving(true);

    let imageUrl = editingRec.image_url;

    if (editingRec._file) {
      const uploadedUrl = await uploadImage(editingRec._file);
      if (uploadedUrl) {
        imageUrl = uploadedUrl;
      } else {
        alert('Error al subir la imagen.');
        setSaving(false);
        return;
      }
    }

    const payload = {
      title: editingRec.title,
      description: editingRec.description || null,
      price: editingRec.price,
      image_url: imageUrl,
      sort_order: editingRec.sort_order || recommendations.length + 1,
    };

    if (editingRec._isNew) {
      await supabase.from('recommendations').insert(payload);
    } else {
      await supabase.from('recommendations').update(payload).eq('id', editingRec.id!);
    }

    setEditingRec(null);
    setSaving(false);
    fetchRecommendations();
  };

  const deleteRecommendation = async (id: string) => {
    await supabase.from('recommendations').delete().eq('id', id);
    setDeleteConfirm(null);
    fetchRecommendations();
  };

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-[#173018]" /></div>;

  return (
    <div className="space-y-6 mb-12">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-headline font-bold text-2xl text-[#173018] uppercase tracking-tight">Recomendaciones Destacadas</h2>
        <button onClick={() => setEditingRec({ _isNew: true, title: '', price: '', description: '', image_url: '' })} className="flex items-center gap-2 bg-[#705d00] text-white px-5 py-2.5 rounded-xl font-headline font-bold text-xs uppercase tracking-widest hover:bg-[#5a4a00] transition-colors">
          <Plus className="w-4 h-4" /> Nueva
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {recommendations.map((rec) => (
          <div key={rec.id} className="bg-white rounded-2xl border border-[#173018]/10 overflow-hidden shadow-sm flex flex-col group">
            <div className="relative h-48 w-full bg-[#eeeeee]">
              {rec.image_url ? (
                <img src={rec.image_url} alt={rec.title} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-[#434841]/30">
                  <ImageIcon className="w-12 h-12" />
                </div>
              )}
              <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 backdrop-blur p-1.5 rounded-xl">
                <button onClick={() => setEditingRec({ ...rec })} className="p-1.5 text-[#434841] hover:text-[#705d00] transition-colors"><Pencil className="w-4 h-4" /></button>
                <button onClick={() => setDeleteConfirm(rec.id)} className="p-1.5 text-[#434841] hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
            <div className="p-5 flex flex-col flex-grow">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-headline font-bold text-lg text-[#173018] leading-tight">{rec.title}</h4>
                <span className="font-headline font-bold text-[#705d00] whitespace-nowrap">{rec.price}</span>
              </div>
              <p className="font-body text-sm text-[#434841] line-clamp-3 mt-auto">{rec.description}</p>
            </div>
          </div>
        ))}
        {recommendations.length === 0 && (
          <div className="col-span-1 md:col-span-3 text-center py-12 text-[#434841] border border-dashed border-[#173018]/20 rounded-2xl">
            No hay recomendaciones configuradas.
          </div>
        )}
      </div>

      {/* Modal */}
      {editingRec && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setEditingRec(null)}></div>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="relative w-full max-w-md bg-white rounded-2xl p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
            <button onClick={() => setEditingRec(null)} className="absolute top-5 right-5 text-[#434841] hover:text-[#173018] transition-colors"><X className="w-5 h-5" /></button>
            <h3 className="font-headline font-bold text-xl text-[#173018] mb-6">{editingRec._isNew ? 'Nueva Recomendación' : 'Editar Recomendación'}</h3>
            
            <div className="space-y-4">
              {/* Image Upload Area */}
              <div>
                <label className="font-headline font-bold text-[10px] uppercase tracking-widest text-[#173018] mb-1.5 block">Imagen</label>
                <div 
                  className="w-full h-40 bg-[#f9f9f9] border-2 border-dashed border-[#173018]/20 rounded-xl overflow-hidden relative cursor-pointer hover:border-[#705d00] transition-colors group"
                  onClick={() => fileInputRef.current?.click()}
                >
                  {editingRec.image_url ? (
                    <>
                      <img src={editingRec.image_url} alt="Preview" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="text-white font-headline font-bold text-xs uppercase tracking-widest flex items-center gap-2"><Upload className="w-4 h-4"/> Cambiar</span>
                      </div>
                    </>
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-[#434841]/50">
                      <ImageIcon className="w-8 h-8 mb-2" />
                      <span className="text-xs font-body">Click para subir foto</span>
                    </div>
                  )}
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    accept="image/*"
                    onChange={handleImageSelect}
                  />
                </div>
                <p className="text-[10px] text-[#434841] mt-1 italic">La imagen se optimizará a formato WebP automáticamente.</p>
              </div>

              <div>
                <label className="font-headline font-bold text-[10px] uppercase tracking-widest text-[#173018] mb-1.5 block">Nombre</label>
                <input type="text" value={editingRec.title || ''} onChange={e => setEditingRec({ ...editingRec, title: e.target.value })} placeholder="Ej: Toast Benedicto" className="w-full bg-[#f9f9f9] border border-[#173018]/10 rounded-xl px-4 py-3 font-body text-sm outline-none focus:border-[#705d00] transition-colors" />
              </div>
              
              <div>
                <label className="font-headline font-bold text-[10px] uppercase tracking-widest text-[#173018] mb-1.5 block">Precio</label>
                <input type="text" value={editingRec.price || ''} onChange={e => setEditingRec({ ...editingRec, price: e.target.value })} placeholder="Ej: $1600" className="w-full bg-[#f9f9f9] border border-[#173018]/10 rounded-xl px-4 py-3 font-body text-sm outline-none focus:border-[#705d00] transition-colors" />
              </div>

              <div>
                <label className="font-headline font-bold text-[10px] uppercase tracking-widest text-[#173018] mb-1.5 block">Descripción</label>
                <textarea value={editingRec.description || ''} onChange={e => setEditingRec({ ...editingRec, description: e.target.value })} placeholder="Descripción del plato..." rows={3} className="w-full bg-[#f9f9f9] border border-[#173018]/10 rounded-xl px-4 py-3 font-body text-sm outline-none focus:border-[#705d00] transition-colors resize-none" />
              </div>

              <button onClick={saveRecommendation} disabled={saving} className="w-full bg-gradient-to-br from-[#173018] to-[#2D472C] text-white py-3.5 rounded-xl font-headline font-bold text-xs uppercase tracking-widest hover:shadow-lg transition-all disabled:opacity-70 flex items-center justify-center gap-2 mt-2">
                {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Save className="w-4 h-4" /> Guardar</>}
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setDeleteConfirm(null)}></div>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="relative w-full max-w-sm bg-white rounded-2xl p-8 shadow-2xl">
            <h3 className="font-headline font-bold text-xl text-[#173018] mb-4">¿Eliminar recomendación?</h3>
            <p className="text-sm text-[#434841] mb-6">Esta acción no se puede deshacer.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteConfirm(null)} className="flex-1 py-3 rounded-xl border border-[#173018]/10 font-headline font-bold text-xs uppercase tracking-widest text-[#434841] hover:bg-[#eeeeee] transition-colors">Cancelar</button>
              <button onClick={() => deleteRecommendation(deleteConfirm)} className="flex-1 py-3 rounded-xl bg-red-500 text-white font-headline font-bold text-xs uppercase tracking-widest hover:bg-red-600 transition-colors">Eliminar</button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
