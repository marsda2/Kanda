'use client';
import React, { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Pencil, Trash2, Save, X, Loader2, Star, Leaf, ChevronDown, ChevronRight } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import RecommendationsManager from './RecommendationsManager';

interface Category { id: string; title: string; description: string | null; sort_order: number; }
interface Subcategory { id: string; category_id: string; title: string; description: string | null; sort_order: number; }
interface MenuItem { id: string; category_id: string; subcategory_id: string | null; name: string; price: string; description: string | null; is_featured: boolean; is_vegan: boolean; sort_order: number; }

type EditingItem = Partial<MenuItem> & { _isNew?: boolean };
type EditingCategory = Partial<Category> & { _isNew?: boolean };
type EditingSubcategory = Partial<Subcategory> & { _isNew?: boolean };

export default function MenuManager() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [expandedCats, setExpandedCats] = useState<Set<string>>(new Set());
  const [editingItem, setEditingItem] = useState<EditingItem | null>(null);
  const [editingCat, setEditingCat] = useState<EditingCategory | null>(null);
  const [editingSub, setEditingSub] = useState<EditingSubcategory | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<{ type: string; id: string } | null>(null);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    const [cRes, sRes, iRes] = await Promise.all([
      supabase.from('menu_categories').select('*').order('sort_order'),
      supabase.from('menu_subcategories').select('*').order('sort_order'),
      supabase.from('menu_items').select('*').order('sort_order'),
    ]);
    setCategories(cRes.data || []);
    setSubcategories(sRes.data || []);
    setItems(iRes.data || []);
    setLoading(false);
  }, []);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  const toggleCat = (id: string) => {
    setExpandedCats(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });
  };

  // ---- CATEGORY CRUD ----
  const saveCategory = async () => {
    if (!editingCat?.title) return;
    setSaving(true);
    if (editingCat._isNew) {
      await supabase.from('menu_categories').insert({ title: editingCat.title, description: editingCat.description || null, sort_order: categories.length + 1 });
    } else {
      await supabase.from('menu_categories').update({ title: editingCat.title, description: editingCat.description || null }).eq('id', editingCat.id!);
    }
    setEditingCat(null); setSaving(false); fetchAll();
  };

  const deleteCategory = async (id: string) => {
    await supabase.from('menu_categories').delete().eq('id', id);
    setDeleteConfirm(null); fetchAll();
  };

  // ---- SUBCATEGORY CRUD ----
  const saveSubcategory = async () => {
    if (!editingSub?.title || !editingSub.category_id) return;
    setSaving(true);
    const subs = subcategories.filter(s => s.category_id === editingSub.category_id);
    if (editingSub._isNew) {
      await supabase.from('menu_subcategories').insert({ category_id: editingSub.category_id, title: editingSub.title, description: editingSub.description || null, sort_order: subs.length + 1 });
    } else {
      await supabase.from('menu_subcategories').update({ title: editingSub.title, description: editingSub.description || null }).eq('id', editingSub.id!);
    }
    setEditingSub(null); setSaving(false); fetchAll();
  };

  const deleteSubcategory = async (id: string) => {
    await supabase.from('menu_subcategories').delete().eq('id', id);
    setDeleteConfirm(null); fetchAll();
  };

  // ---- ITEM CRUD ----
  const saveItem = async () => {
    if (!editingItem?.name || !editingItem.price || !editingItem.category_id) return;
    setSaving(true);
    const payload = {
      category_id: editingItem.category_id,
      subcategory_id: editingItem.subcategory_id || null,
      name: editingItem.name,
      price: editingItem.price,
      description: editingItem.description || null,
      is_featured: editingItem.is_featured || false,
      is_vegan: editingItem.is_vegan || false,
      sort_order: editingItem.sort_order || 0,
    };
    if (editingItem._isNew) {
      await supabase.from('menu_items').insert(payload);
    } else {
      await supabase.from('menu_items').update(payload).eq('id', editingItem.id!);
    }
    setEditingItem(null); setSaving(false); fetchAll();
  };

  const deleteItem = async (id: string) => {
    await supabase.from('menu_items').delete().eq('id', id);
    setDeleteConfirm(null); fetchAll();
  };

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-[#173018]" /></div>;

  return (
    <div className="space-y-12">
      <RecommendationsManager />
      
      <div className="space-y-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-headline font-bold text-2xl text-[#173018] uppercase tracking-tight">Categorías del Menú</h2>
          <button onClick={() => setEditingCat({ _isNew: true, title: '', description: '' })} className="flex items-center gap-2 bg-[#173018] text-white px-5 py-2.5 rounded-xl font-headline font-bold text-xs uppercase tracking-widest hover:bg-[#2D472C] transition-colors">
            <Plus className="w-4 h-4" /> Nueva Categoría
          </button>
        </div>

      {/* Categories List */}
      {categories.map(cat => {
        const catSubs = subcategories.filter(s => s.category_id === cat.id);
        const catItems = items.filter(i => i.category_id === cat.id && !i.subcategory_id);
        const isExpanded = expandedCats.has(cat.id);

        return (
          <div key={cat.id} className="bg-white rounded-2xl border border-[#173018]/10 overflow-hidden shadow-sm">
            {/* Category Header */}
            <div className="flex items-center justify-between p-5 cursor-pointer hover:bg-[#f9f9f9] transition-colors" onClick={() => toggleCat(cat.id)}>
              <div className="flex items-center gap-3">
                {isExpanded ? <ChevronDown className="w-5 h-5 text-[#705d00]" /> : <ChevronRight className="w-5 h-5 text-[#434841]" />}
                <div>
                  <h3 className="font-headline font-bold text-xl text-[#173018] uppercase tracking-tight">{cat.title}</h3>
                  {cat.description && <p className="text-xs text-[#434841] mt-0.5">{cat.description}</p>}
                </div>
              </div>
              <div className="flex items-center gap-2" onClick={e => e.stopPropagation()}>
                <span className="text-[10px] bg-[#eeeeee] text-[#434841] px-2 py-1 rounded-full font-bold">
                  {items.filter(i => i.category_id === cat.id).length} items
                </span>
                <button onClick={() => setEditingCat({ ...cat })} className="p-2 text-[#434841] hover:text-[#705d00] transition-colors"><Pencil className="w-4 h-4" /></button>
                <button onClick={() => setDeleteConfirm({ type: 'category', id: cat.id })} className="p-2 text-[#434841] hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>

            {/* Expanded Content */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                  <div className="px-5 pb-5 space-y-4">
                    {/* Direct items (no subcategory) */}
                    {catItems.length > 0 && (
                      <div className="space-y-2">
                        {catItems.map(item => (
                          <ItemRow key={item.id} item={item} onEdit={() => setEditingItem({ ...item })} onDelete={() => setDeleteConfirm({ type: 'item', id: item.id })} />
                        ))}
                      </div>
                    )}

                    {/* Subcategories */}
                    {catSubs.map(sub => {
                      const subItems = items.filter(i => i.subcategory_id === sub.id);
                      return (
                        <div key={sub.id} className="bg-[#f9f9f9] rounded-xl p-4 space-y-3">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-headline font-bold text-sm text-[#173018] uppercase tracking-wider">{sub.title}</h4>
                              {sub.description && <p className="text-[11px] text-[#434841] italic">{sub.description}</p>}
                            </div>
                            <div className="flex gap-1">
                              <button onClick={() => setEditingSub({ ...sub })} className="p-1.5 text-[#434841] hover:text-[#705d00] transition-colors"><Pencil className="w-3.5 h-3.5" /></button>
                              <button onClick={() => setDeleteConfirm({ type: 'subcategory', id: sub.id })} className="p-1.5 text-[#434841] hover:text-red-500 transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                              <button onClick={() => setEditingItem({ _isNew: true, category_id: cat.id, subcategory_id: sub.id, name: '', price: '', description: '', is_featured: false, is_vegan: false, sort_order: subItems.length + 1 })} className="p-1.5 text-[#705d00] hover:text-[#173018] transition-colors"><Plus className="w-3.5 h-3.5" /></button>
                            </div>
                          </div>
                          {subItems.map(item => (
                            <ItemRow key={item.id} item={item} compact onEdit={() => setEditingItem({ ...item })} onDelete={() => setDeleteConfirm({ type: 'item', id: item.id })} />
                          ))}
                        </div>
                      );
                    })}

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      <button onClick={() => setEditingSub({ _isNew: true, category_id: cat.id, title: '', description: '' })} className="flex items-center gap-1.5 text-[#705d00] hover:text-[#173018] text-xs font-bold uppercase tracking-widest transition-colors">
                        <Plus className="w-3.5 h-3.5" /> Subcategoría
                      </button>
                      <button onClick={() => setEditingItem({ _isNew: true, category_id: cat.id, subcategory_id: null, name: '', price: '', description: '', is_featured: false, is_vegan: false, sort_order: catItems.length + 1 })} className="flex items-center gap-1.5 text-[#705d00] hover:text-[#173018] text-xs font-bold uppercase tracking-widest transition-colors">
                        <Plus className="w-3.5 h-3.5" /> Plato directo
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}

      {/* ---- MODALS ---- */}

      {/* Category Modal */}
      {editingCat && (
        <Modal title={editingCat._isNew ? 'Nueva Categoría' : 'Editar Categoría'} onClose={() => setEditingCat(null)}>
          <div className="space-y-4">
            <Field label="Nombre" value={editingCat.title || ''} onChange={v => setEditingCat({ ...editingCat, title: v })} placeholder="Ej: Café" />
            <Field label="Descripción (opcional)" value={editingCat.description || ''} onChange={v => setEditingCat({ ...editingCat, description: v })} placeholder="Ej: Disponible de 9 AM - 9 PM" />
            <SaveButton saving={saving} onClick={saveCategory} />
          </div>
        </Modal>
      )}

      {/* Subcategory Modal */}
      {editingSub && (
        <Modal title={editingSub._isNew ? 'Nueva Subcategoría' : 'Editar Subcategoría'} onClose={() => setEditingSub(null)}>
          <div className="space-y-4">
            <Field label="Nombre" value={editingSub.title || ''} onChange={v => setEditingSub({ ...editingSub, title: v })} placeholder="Ej: Caliente" />
            <Field label="Descripción (opcional)" value={editingSub.description || ''} onChange={v => setEditingSub({ ...editingSub, description: v })} placeholder="Ej: 8 oz / 12 oz" />
            <SaveButton saving={saving} onClick={saveSubcategory} />
          </div>
        </Modal>
      )}

      {/* Item Modal */}
      {editingItem && (
        <Modal title={editingItem._isNew ? 'Nuevo Plato' : 'Editar Plato'} onClose={() => setEditingItem(null)}>
          <div className="space-y-4">
            <Field label="Nombre" value={editingItem.name || ''} onChange={v => setEditingItem({ ...editingItem, name: v })} placeholder="Ej: Matcha Latte" />
            <Field label="Precio" value={editingItem.price || ''} onChange={v => setEditingItem({ ...editingItem, price: v })} placeholder="Ej: $850" />
            <Field label="Descripción (opcional)" value={editingItem.description || ''} onChange={v => setEditingItem({ ...editingItem, description: v })} placeholder="Ej: Matcha premium de Japón" />
            <div className="flex gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={editingItem.is_featured || false} onChange={e => setEditingItem({ ...editingItem, is_featured: e.target.checked })} className="accent-[#705d00] w-4 h-4" />
                <Star className="w-4 h-4 text-[#705d00]" />
                <span className="text-sm font-body">Destacado</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={editingItem.is_vegan || false} onChange={e => setEditingItem({ ...editingItem, is_vegan: e.target.checked })} className="accent-[#705d00] w-4 h-4" />
                <Leaf className="w-4 h-4 text-[#c3c8be]" />
                <span className="text-sm font-body">Vegano</span>
              </label>
            </div>
            {/* Category selector for new items */}
            {editingItem._isNew && !editingItem.subcategory_id && (
              <div>
                <label className="font-headline font-bold text-[10px] uppercase tracking-widest text-[#173018] mb-1.5 block">Categoría</label>
                <select value={editingItem.category_id || ''} onChange={e => setEditingItem({ ...editingItem, category_id: e.target.value })} className="w-full bg-[#f9f9f9] border border-[#173018]/10 rounded-xl px-4 py-3 font-body text-sm outline-none focus:border-[#705d00] transition-colors">
                  {categories.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
                </select>
              </div>
            )}
            <SaveButton saving={saving} onClick={saveItem} />
          </div>
        </Modal>
      )}

      {/* Delete Confirmation */}
      {deleteConfirm && (
        <Modal title="¿Estás seguro?" onClose={() => setDeleteConfirm(null)}>
          <p className="text-sm text-[#434841] mb-6">Esta acción no se puede deshacer. {deleteConfirm.type === 'category' && 'Se eliminarán también todas las subcategorías y platos asociados.'}</p>
          <div className="flex gap-3">
            <button onClick={() => setDeleteConfirm(null)} className="flex-1 py-3 rounded-xl border border-[#173018]/10 font-headline font-bold text-xs uppercase tracking-widest text-[#434841] hover:bg-[#eeeeee] transition-colors">Cancelar</button>
            <button onClick={() => {
              if (deleteConfirm.type === 'category') deleteCategory(deleteConfirm.id);
              else if (deleteConfirm.type === 'subcategory') deleteSubcategory(deleteConfirm.id);
              else deleteItem(deleteConfirm.id);
            }} className="flex-1 py-3 rounded-xl bg-red-500 text-white font-headline font-bold text-xs uppercase tracking-widest hover:bg-red-600 transition-colors">Eliminar</button>
          </div>
        </Modal>
      )}
      </div>
    </div>
  );
}

// ---- Reusable Sub-Components ----

function ItemRow({ item, compact, onEdit, onDelete }: { item: MenuItem; compact?: boolean; onEdit: () => void; onDelete: () => void }) {
  return (
    <div className={`flex items-center justify-between group ${compact ? 'py-2 border-b border-[#173018]/5 last:border-0' : 'bg-[#f9f9f9] rounded-xl px-4 py-3'}`}>
      <div className="flex items-center gap-2 min-w-0">
        <span className={`font-body font-semibold text-[#173018] truncate ${compact ? 'text-sm' : 'text-base'}`}>{item.name}</span>
        {item.is_featured && <Star className="w-3.5 h-3.5 text-[#705d00] fill-[#705d00] shrink-0" />}
        {item.is_vegan && <Leaf className="w-3.5 h-3.5 text-[#c3c8be] shrink-0" />}
      </div>
      <div className="flex items-center gap-3 shrink-0">
        <span className="font-headline text-sm text-[#173018]">{item.price}</span>
        <div className="flex gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
          <button onClick={onEdit} className="p-1.5 text-[#434841] hover:text-[#705d00] transition-colors"><Pencil className="w-3.5 h-3.5" /></button>
          <button onClick={onDelete} className="p-1.5 text-[#434841] hover:text-red-500 transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
        </div>
      </div>
    </div>
  );
}

function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose}></div>
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="relative w-full max-w-md bg-white rounded-2xl p-8 shadow-2xl">
        <button onClick={onClose} className="absolute top-5 right-5 text-[#434841] hover:text-[#173018] transition-colors"><X className="w-5 h-5" /></button>
        <h3 className="font-headline font-bold text-xl text-[#173018] mb-6">{title}</h3>
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

function SaveButton({ saving, onClick }: { saving: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick} disabled={saving} className="w-full bg-gradient-to-br from-[#173018] to-[#2D472C] text-white py-3.5 rounded-xl font-headline font-bold text-xs uppercase tracking-widest hover:shadow-lg transition-all disabled:opacity-70 flex items-center justify-center gap-2 mt-2">
      {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Save className="w-4 h-4" /> Guardar</>}
    </button>
  );
}
