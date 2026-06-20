import React, { useState, useEffect } from 'react';
import { services as defaultCategories } from '../data/content';
import { auth, db } from '../lib/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged, updatePassword } from 'firebase/auth';
import { collection, onSnapshot, doc, setDoc, deleteDoc } from 'firebase/firestore';
import AdminCategories, { CategoryItem } from '../components/admin/AdminCategories';

export interface ServiceItem {
  id: string;
  categoryId?: string;
  title: string;
  description: string;
  price: number;
  discountPrice?: number;
  rating: number;
  isTrendy?: boolean;
  isSeasonal?: boolean;
  showOnHome?: boolean;
  slug: string;
  imageUrl?: string;
}

export default function AdminServices() {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<ServiceItem>>({});
  const [uploading, setUploading] = useState(false);

  const [activeTab, setActiveTab] = useState<'services' | 'categories'>('services');
  const [categories, setCategories] = useState<CategoryItem[]>([]);

  // Auth states
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [notification, setNotification] = useState<{message: string, type: 'success' | 'error' | 'info'} | null>(null);

  const showNotification = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 5000);
  };

  useEffect(() => {
    let unsubscribe: any;
    try {
      unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          setIsAuthenticated(true);
          loadServices();
        } else {
          setIsAuthenticated(false);
          setLoading(false);
        }
      });
    } catch (e: any) {
      console.error("Auth init error:", e);
      setLoading(false);
    }
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, emailInput, passwordInput);
      showNotification('Successfully logged in!', 'success');
    } catch (error: any) {
      if (error.code === 'auth/invalid-credential' || error.code === 'auth/user-not-found') {
        try {
          await createUserWithEmailAndPassword(auth, emailInput, passwordInput);
          showNotification('Admin account created and logged in!', 'success');
        } catch (createError: any) {
          if (createError.code === 'auth/email-already-in-use') {
            showNotification('Incorrect password! That email is already registered.', 'error');
          } else {
            showNotification(`Login failed: ${createError.message} (Code: ${createError.code})`, 'error');
          }
          console.error(createError);
        }
      } else {
        showNotification(`Login error: ${error.message} (Code: ${error.code})`, 'error');
        console.error(error);
      }
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      showNotification('Successfully logged out.', 'info');
    } catch (error) {
      showNotification('Error logging out.', 'error');
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      showNotification('Passwords do not match!', 'error');
      return;
    }
    if (newPassword.length < 6) {
      showNotification('Password must be at least 6 characters long.', 'error');
      return;
    }
    try {
      if (auth.currentUser) {
        await updatePassword(auth.currentUser, newPassword);
        showNotification('Password changed successfully!', 'success');
        setShowPasswordChange(false);
        setNewPassword('');
        setConfirmPassword('');
      }
    } catch (error: any) {
      showNotification('Error changing password: ' + error.message, 'error');
    }
  };

  const handleForgotPassword = () => {
    showNotification("If you forgot your password, please reset it from the Firebase Auth Console.", 'info');
  };

  const loadServices = () => {
    try {
      let isFirstRender = true;
      const timeoutId = setTimeout(() => {
        if (loading || isFirstRender) {
           console.warn("Firestore snapshot took too long. Forcing load to finish.");
           setLoading(false);
        }
      }, 3000);

      const unsubscribe = onSnapshot(collection(db, 'services'), (snapshot) => {
        isFirstRender = false;
        clearTimeout(timeoutId);
        const servicesList: ServiceItem[] = [];
        snapshot.forEach((doc) => {
          servicesList.push({ id: doc.id, ...doc.data() } as ServiceItem);
        });
        setServices(servicesList);
        setLoading(false);
      }, (error) => {
         isFirstRender = false;
         clearTimeout(timeoutId);
         console.error("Error fetching services: ", error);
         showNotification("Error loading services. Check permissions.", "error");
         setLoading(false);
      });

      const unsubCategories = onSnapshot(collection(db, 'categories'), (snapshot) => {
        const catList: CategoryItem[] = [];
        snapshot.forEach(doc => catList.push({ id: doc.id, ...doc.data() } as CategoryItem));
        setCategories(catList);
      });

      return () => {
         clearTimeout(timeoutId);
         unsubscribe();
         unsubCategories();
      };
    } catch (err: any) {
      console.error("Error setting up snapshot: ", err);
      showNotification("Error setting up services: " + err.message, "error");
      setLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const cloudName = 'dmzoiq7yg';
    const uploadPreset = 'plgxfpbk';

    setUploading(true);
    
    const uploadFormData = new FormData();
    uploadFormData.append('file', file);
    uploadFormData.append('upload_preset', uploadPreset);
    uploadFormData.append('folder', 'IslamabadTechnician');

    try {
      const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: 'POST',
        body: uploadFormData,
      });

      const data = await response.json();
      console.log('Cloudinary response:', data);

      if (response.ok) {
        setFormData((prev) => ({ ...prev, imageUrl: data.secure_url }));
        showNotification('Image uploaded successfully!', 'success');
      } else {
        console.error('Cloudinary upload error:', data);
        showNotification('Error uploading image: ' + (data.error?.message || 'Unknown error'), 'error');
      }
    } catch (error: any) {
      console.error('Upload catch block error:', error);
      showNotification('Upload failed. Check your network or Cloudinary configuration.', 'error');
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    if (!formData.title) return;
    
    let updatedService: ServiceItem;
    if (editingId && editingId !== 'new') {
      updatedService = { ...services.find(s => s.id === editingId), ...formData } as ServiceItem;
    } else {
      updatedService = { 
        ...formData, 
        id: formData.id || Date.now().toString(),
        slug: formData.slug || formData.title.toLowerCase().replace(/ /g, '-'),
        rating: formData.rating || 4.5
      } as ServiceItem;
    }

    try {
      // Exclude id property for saving the fields
      const { id, ...dataToSave } = updatedService;
      await setDoc(doc(db, 'services', updatedService.id), dataToSave);
      showNotification('Service saved successfully!', 'success');
      setEditingId(null);
      setFormData({});
    } catch (error: any) {
      console.error(error);
      showNotification("Error saving service: " + error.message, "error");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this service?')) return;
    try {
      await deleteDoc(doc(db, 'services', id));
      showNotification('Service deleted successfully.', 'info');
    } catch (error: any) {
      showNotification("Error deleting service: " + error.message, "error");
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 flex-col gap-4">
      <svg className="animate-spin h-10 w-10 text-blue-600" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      <div className="text-slate-500 font-medium">Initializing Admin Access...</div>
    </div>
  );

  if (!isAuthenticated) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-4 relative flex-col">
        {/* Notification Toast */}
        {notification && (
          <div className={`fixed top-4 right-4 z-50 p-4 rounded-xl shadow-2xl flex items-center gap-3 transform transition-all duration-300 translate-y-0 opacity-100 border ${
            notification.type === 'success' ? 'bg-green-50 text-green-800 border-green-200' : 
            notification.type === 'error' ? 'bg-red-50 text-red-800 border-red-200' : 
            'bg-blue-50 text-blue-800 border-blue-200'
          }`}>
            <div className="font-semibold text-sm max-w-xs">{notification.message}</div>
            <button onClick={() => setNotification(null)} className="opacity-50 hover:opacity-100 text-lg font-bold">&times;</button>
          </div>
        )}

        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-slate-100">
          <h2 className="text-2xl font-extrabold text-slate-900 mb-6 text-center">Admin Access</h2>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Email</label>
              <input
                type="email"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
                placeholder="Enter admin email"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Password</label>
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
                placeholder="Enter admin password"
                autoFocus
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition shadow-lg shadow-blue-600/20"
            >
              Login
            </button>
            <div className="text-center mt-4">
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-sm font-semibold text-slate-500 hover:text-blue-600 transition"
              >
                Forgot Password?
              </button>
            </div>
          </form>
        </div>
        
        {auth.app?.options?.projectId && (
          <div className="mt-8 text-center text-xs font-bold text-slate-400 bg-slate-100 px-4 py-2 rounded-full shadow-sm">
            Connected to Firebase Project: <span className="text-blue-600">{auth.app.options.projectId}</span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 relative">
      {/* Notification Toast */}
      {notification && (
        <div className={`fixed top-4 right-4 z-50 p-4 rounded-xl shadow-2xl flex items-center gap-3 transform transition-all duration-300 translate-y-0 opacity-100 border ${
          notification.type === 'success' ? 'bg-green-50 text-green-800 border-green-200' : 
          notification.type === 'error' ? 'bg-red-50 text-red-800 border-red-200' : 
          'bg-blue-50 text-blue-800 border-blue-200'
        }`}>
          <div className="font-semibold text-sm max-w-xs">{notification.message}</div>
          <button onClick={() => setNotification(null)} className="opacity-50 hover:opacity-100 text-lg font-bold">&times;</button>
        </div>
      )}

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold text-slate-900">Admin Dashboard</h2>
        <div className="flex gap-3">
          <button 
            onClick={() => setShowPasswordChange(!showPasswordChange)}
            className="bg-white border border-slate-200 text-slate-700 px-4 py-2.5 rounded-xl text-sm font-bold shadow-sm hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
          >
            Change Password
          </button>
          <button 
            onClick={handleLogout}
            className="bg-white border border-red-100 text-red-600 px-4 py-2.5 rounded-xl text-sm font-bold shadow-sm hover:bg-red-50 transition-all flex items-center justify-center"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="mb-8 flex gap-2 border-b border-slate-200">
        <button 
          onClick={() => setActiveTab('services')}
          className={`px-6 py-3 font-bold text-sm tracking-wide border-b-2 transition-all ${activeTab === 'services' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
        >
          Manage Services
        </button>
        <button 
          onClick={() => setActiveTab('categories')}
          className={`px-6 py-3 font-bold text-sm tracking-wide border-b-2 transition-all ${activeTab === 'categories' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
        >
          Manage Categories
        </button>
      </div>

      {showPasswordChange && (
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 mb-8 shadow-sm max-w-md mx-auto sm:mx-0 relative">
          <button onClick={() => setShowPasswordChange(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 text-xl font-bold">&times;</button>
          <h3 className="font-bold text-xl mb-6 text-slate-900 border-b border-slate-100 pb-4">Change Admin Password</h3>
          <form onSubmit={handleChangePassword} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">New Password (Min 6 chars)</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:bg-white focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Confirm New Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:bg-white focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all text-sm"
                required
              />
            </div>
            <div className="flex gap-3 pt-4">
              <button type="submit" className="flex-1 bg-blue-600 text-white font-bold px-4 py-3 rounded-xl hover:bg-blue-700 transition-all shadow-sm shadow-blue-600/20">Update Password</button>
              <button type="button" onClick={() => setShowPasswordChange(false)} className="flex-1 bg-white border border-slate-200 text-slate-800 font-bold px-4 py-3 rounded-xl hover:bg-slate-50 transition-all">Cancel</button>
            </div>
          </form>
        </div>
      )}

      {activeTab === 'categories' ? (
        <AdminCategories showNotification={showNotification} />
      ) : (
      <>
        <div className="flex justify-end mb-6">
          <button 
            onClick={() => { setEditingId('new'); setFormData({}); setShowPasswordChange(false); }}
            className="bg-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm shadow-blue-600/20 hover:bg-blue-700 transition-all flex items-center justify-center"
          >
            + Add New Service
          </button>
        </div>

      {editingId && (
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 mb-8 shadow-sm relative">
          <h3 className="font-bold text-xl mb-6 text-slate-900 border-b border-slate-100 pb-4">{editingId === 'new' ? 'Create New Service' : 'Edit Service'}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Title <span className="text-red-500">*</span></label>
              <input 
                type="text" 
                value={formData.title || ''} 
                onChange={e => setFormData({...formData, title: e.target.value})}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:bg-white focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all text-sm"
                placeholder="e.g. AC General Service"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Category <span className="text-red-500">*</span></label>
              <select 
                value={formData.categoryId || ''} 
                onChange={e => setFormData({...formData, categoryId: e.target.value})}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:bg-white focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all text-sm"
              >
                <option value="">-- Select Category --</option>
                {categories.map(c => (
                  <option key={c.id} value={c.slug}>{c.title}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Price (Rs) <span className="text-red-500">*</span></label>
              <input 
                type="number" 
                value={formData.price || ''} 
                onChange={e => setFormData({...formData, price: Number(e.target.value)})}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:bg-white focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all text-sm"
                placeholder="0"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Original Price / Compare At (Optional)</label>
              <input 
                type="number" 
                value={formData.discountPrice || ''} 
                onChange={e => setFormData({...formData, discountPrice: Number(e.target.value)})}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:bg-white focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all text-sm"
                placeholder="Leave blank if none"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Description / Option Details</label>
              <input 
                type="text" 
                value={formData.description || ''} 
                onChange={e => setFormData({...formData, description: e.target.value})}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:bg-white focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all text-sm"
                placeholder="Brief details or bullet points..."
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Image URL or Upload (Optional)</label>
              <div className="flex flex-col sm:flex-row gap-3">
                <input 
                  type="text" 
                  value={formData.imageUrl || ''} 
                  onChange={e => setFormData({...formData, imageUrl: e.target.value})}
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:bg-white focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all text-sm"
                  placeholder="https://example.com/image.jpg"
                />
                <div className="relative shrink-0">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={uploading}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                  />
                  <div className={`px-4 py-3 rounded-xl border font-bold text-sm text-center flex items-center justify-center gap-2 transition-all ${uploading ? 'bg-slate-100 border-slate-200 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-white hover:border-blue-300'}`}>
                    {uploading ? (
                      <>
                        <svg className="animate-spin h-4 w-4 text-slate-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Uploading...
                      </>
                    ) : (
                        'Upload Image'
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-6 mb-8 p-4 bg-slate-50 rounded-xl border border-slate-100">
            <label className="flex items-center gap-3 cursor-pointer group">
              <div className="relative flex items-center justify-center">
                <input 
                  type="checkbox" 
                  checked={formData.isTrendy || false}
                  onChange={e => setFormData({...formData, isTrendy: e.target.checked})}
                  className="w-5 h-5 border-2 border-slate-300 rounded text-blue-600 focus:ring-blue-600 focus:ring-offset-0 transition-all cursor-pointer"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-slate-800 group-hover:text-blue-600 transition-colors">Mark as Trendy</span>
                <span className="text-xs text-slate-500">Shows on the homepage featured section</span>
              </div>
            </label>
            <label className="flex items-center gap-3 cursor-pointer group">
              <div className="relative flex items-center justify-center">
                <input 
                  type="checkbox" 
                  checked={formData.isSeasonal || false}
                  onChange={e => setFormData({...formData, isSeasonal: e.target.checked})}
                  className="w-5 h-5 border-2 border-slate-300 rounded text-blue-600 focus:ring-blue-600 focus:ring-offset-0 transition-all cursor-pointer"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-slate-800 group-hover:text-amber-600 transition-colors">Mark as Seasonal</span>
                <span className="text-xs text-slate-500">Highlights the service with a seasonal badge</span>
              </div>
            </label>
            <label className="flex items-center gap-3 cursor-pointer group">
              <div className="relative flex items-center justify-center">
                <input 
                  type="checkbox" 
                  checked={formData.showOnHome !== false} 
                  onChange={e => setFormData({...formData, showOnHome: e.target.checked})}
                  className="w-5 h-5 border-2 border-slate-300 rounded text-green-600 focus:ring-green-600 focus:ring-offset-0 transition-all cursor-pointer"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-slate-800 group-hover:text-green-600 transition-colors">Show on Homepage</span>
                <span className="text-xs text-slate-500">Displays this service on the main homepage</span>
              </div>
            </label>
          </div>
          
          <div className="flex gap-4 border-t border-slate-100 pt-6">
            <button onClick={handleSave} disabled={uploading} className="bg-green-600 text-white font-bold px-8 py-3 rounded-xl hover:bg-green-700 transition-all shadow-sm shadow-green-600/20 disabled:opacity-50 disabled:cursor-not-allowed">
              Save Service Details
            </button>
            <button onClick={() => setEditingId(null)} className="bg-white border border-slate-200 text-slate-700 font-bold px-8 py-3 rounded-xl hover:bg-slate-50 transition-all">
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-150">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-xs text-slate-500 uppercase tracking-wider">
                <th className="p-5 font-bold">Service Details</th>
                <th className="p-5 font-bold whitespace-nowrap">Pricing</th>
                <th className="p-5 font-bold text-center">Tags</th>
                <th className="p-5 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {services.map(s => (
                <tr key={s.id} className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
                  <td className="p-5">
                    <div className="font-bold text-slate-900 text-base mb-1">{s.title}</div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md">
                        {categories.find(c => c.slug === s.categoryId)?.title || s.categoryId || 'Uncategorized'}
                      </span>
                    </div>
                    <div className="text-sm text-slate-500 line-clamp-1">{s.description || 'No description provided.'}</div>
                  </td>
                  <td className="p-5 whitespace-nowrap">
                    {s.discountPrice ? (
                      <div className="flex flex-col">
                        <span className="font-extrabold text-lg text-blue-600">Rs. {s.price}</span>
                        <span className="text-xs font-bold text-slate-400 line-through">Rs. {s.discountPrice}</span>
                      </div>
                    ) : (
                      <span className="font-bold text-slate-800 text-base">Rs. {s.price}</span>
                    )}
                  </td>
                  <td className="p-5">
                    <div className="flex gap-2 flex-wrap items-center justify-center">
                      {s.isTrendy ? (
                        <span className="bg-purple-50 text-purple-700 border border-purple-100 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider">Trendy</span>
                      ) : null}
                      {s.isSeasonal ? (
                        <span className="bg-amber-50 text-amber-700 border border-amber-100 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider">Seasonal</span>
                      ) : null}
                      {!s.isTrendy && !s.isSeasonal && <span className="text-slate-300 text-xs">-</span>}
                    </div>
                  </td>
                  <td className="p-5 text-right whitespace-nowrap">
                    <button 
                      onClick={() => { setEditingId(s.id); setFormData(s); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                      className="inline-flex items-center justify-center text-blue-600 bg-blue-50 px-3 py-2 rounded-lg hover:bg-blue-100 hover:text-blue-700 font-bold text-sm mr-2 transition-colors"
                      title="Edit Service"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(s.id)}
                      className="inline-flex items-center justify-center text-red-600 bg-red-50 px-3 py-2 rounded-lg hover:bg-red-100 hover:text-red-700 font-bold text-sm transition-colors"
                      title="Delete Service"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {services.length === 0 && <div className="p-12 text-center text-slate-500 font-medium">No services found. Add one above!</div>}
        </div>
      </div>
      </>
      )}
    </div>
  </div>
  );
}
