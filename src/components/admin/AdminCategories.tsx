import React, { useState, useEffect } from 'react';
import { db } from '../../lib/firebase';
import { collection, onSnapshot, doc, setDoc, deleteDoc } from 'firebase/firestore';
import { services as defaultCategories } from '../../data/content';

export interface CategoryItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  slug: string;
  features?: string[];
}

export default function AdminCategories({ showNotification }: { showNotification: (msg: string, type: 'success' | 'error' | 'info') => void }) {
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<CategoryItem>>({});

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'categories'), (snapshot) => {
      const list: CategoryItem[] = [];
      snapshot.forEach(doc => list.push({ id: doc.id, ...doc.data() } as CategoryItem));
      setCategories(list);
      setLoading(false);
    }, (error) => {
      console.error(error);
      showNotification("Error loading categories.", "error");
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleSave = async () => {
    if (!formData.title || !formData.slug || !formData.icon) {
      showNotification('Title, Slug, and Icon are required.', 'error');
      return;
    }
    
    const id = formData.id || Date.now().toString();
    const dataToSave = {
      title: formData.title,
      description: formData.description || '',
      icon: formData.icon,
      slug: formData.slug
    };

    try {
      await setDoc(doc(db, 'categories', id), dataToSave);
      showNotification('Category saved successfully!', 'success');
      setEditingId(null);
      setFormData({});
    } catch (error: any) {
      showNotification("Error saving category: " + error.message, "error");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this category?')) return;
    try {
      await deleteDoc(doc(db, 'categories', id));
      showNotification('Category deleted successfully.', 'info');
    } catch (error: any) {
      showNotification("Error deleting category: " + error.message, "error");
    }
  };

  const loadDefaults = async () => {
    if (!confirm('This will load default categories into your database. Continue?')) return;
    try {
      for (const cat of defaultCategories) {
        await setDoc(doc(db, 'categories', cat.id), {
          title: cat.title,
          description: cat.description,
          icon: cat.icon,
          slug: cat.slug
        });
      }
      showNotification('Default categories loaded successfully!', 'success');
    } catch (error: any) {
      showNotification('Error loading defaults: ' + error.message, 'error');
    }
  };

  if (loading) return <div className="p-8 text-center text-slate-500">Loading categories...</div>;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4 border-b border-slate-100 pb-4">
        <h3 className="text-xl font-bold text-slate-900">Manage Categories</h3>
        <div className="flex gap-3">
          {categories.length === 0 && (
            <button 
              onClick={loadDefaults}
              className="bg-amber-100 text-amber-700 px-4 py-2 rounded-xl text-sm font-bold shadow-sm hover:bg-amber-200 transition-all flex items-center justify-center"
            >
              Load Defaults
            </button>
          )}
          <button 
            onClick={() => { setEditingId('new'); setFormData({}); }}
            className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-sm shadow-blue-600/20 hover:bg-blue-700 transition-all flex items-center justify-center"
          >
            + Add Category
          </button>
        </div>
      </div>

      {editingId && (
        <div className="mb-8 p-6 bg-slate-50 rounded-xl border border-slate-200 relative">
          <h4 className="font-bold mb-4">{editingId === 'new' ? 'Create Category' : 'Edit Category'}</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Title</label>
              <input type="text" value={formData.title || ''} onChange={e => setFormData({...formData, title: e.target.value, slug: formData.slug || e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-')})} className="w-full border rounded-lg px-3 py-2 text-sm" placeholder="e.g. Plumbing Services" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Slug URL</label>
              <input type="text" value={formData.slug || ''} onChange={e => setFormData({...formData, slug: e.target.value})} className="w-full border rounded-lg px-3 py-2 text-sm" placeholder="e.g. plumbing-services" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Lucide Icon Name</label>
              <input type="text" value={formData.icon || ''} onChange={e => setFormData({...formData, icon: e.target.value})} className="w-full border rounded-lg px-3 py-2 text-sm" placeholder="e.g. Wrench, Zap, Snow" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Description</label>
              <textarea value={formData.description || ''} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full border rounded-lg px-3 py-2 text-sm" rows={2} placeholder="Category description..." />
            </div>
          </div>
          <div className="flex gap-3">
            <button onClick={handleSave} className="bg-green-600 text-white font-bold px-5 py-2 rounded-lg text-sm hover:bg-green-700 transition-colors">Save Category</button>
            <button onClick={() => setEditingId(null)} className="bg-white border text-slate-700 font-bold px-5 py-2 rounded-lg text-sm hover:bg-slate-50 transition-colors">Cancel</button>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-xs text-slate-500 uppercase">
              <th className="p-4 font-bold">Category</th>
              <th className="p-4 font-bold">Icon</th>
              <th className="p-4 font-bold text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map(c => (
              <tr key={c.id} className="border-b border-slate-100 hover:bg-slate-50">
                <td className="p-4">
                  <div className="font-bold text-slate-900">{c.title}</div>
                  <div className="text-xs text-slate-500">/{c.slug}</div>
                </td>
                <td className="p-4"><span className="px-2 py-1 bg-slate-100 rounded text-xs font-mono">{c.icon}</span></td>
                <td className="p-4 text-right">
                  <button onClick={() => { setEditingId(c.id); setFormData(c); }} className="text-blue-600 font-bold text-xs mr-3">Edit</button>
                  <button onClick={() => handleDelete(c.id)} className="text-red-600 font-bold text-xs">Delete</button>
                </td>
              </tr>
            ))}
            {categories.length === 0 && (
              <tr><td colSpan={3} className="p-8 text-center text-slate-500">No categories found. Load defaults to get started!</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
