import React, { useState } from 'react';
import { Upload, Loader2, Sparkles } from 'lucide-react';
import axios from 'axios';

const CreativeForm = ({ onGenerate, isGenerating }) => {
    const [formData, setFormData] = useState({
        brandName: '',
        tagline: '',
        tone: 'Premium',
        numCreatives: 10
    });
    const [files, setFiles] = useState({
        logo: null,
        product: null
    });

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setFiles({ ...files, [e.target.name]: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!files.logo || !files.product) {
            alert("Please upload both logo and product images.");
            return;
        }

        const data = new FormData();
        data.append('logo', files.logo);
        data.append('product', files.product);
        data.append('brand_name', formData.brandName);
        data.append('tagline', formData.tagline);
        data.append('tone', formData.tone);
        data.append('num_creatives', formData.numCreatives);

        onGenerate(data);
    };

    return (
        <div className="w-full max-w-2xl mx-auto bg-white rounded-3xl shadow-xl p-8 -mt-20 relative z-20 border border-gray-100">
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* File Uploads */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Brand Logo</label>
                        <div className="relative border-2 border-dashed border-gray-200 rounded-xl p-6 hover:border-brand-accent transition-colors text-center cursor-pointer bg-gray-50/50">
                            <input
                                type="file"
                                name="logo"
                                onChange={handleFileChange}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                accept="image/*"
                            />
                            <Upload className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                            <span className="text-xs text-gray-500">{files.logo ? files.logo.name : "Upload Logo"}</span>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Product Image</label>
                        <div className="relative border-2 border-dashed border-gray-200 rounded-xl p-6 hover:border-brand-accent transition-colors text-center cursor-pointer bg-gray-50/50">
                            <input
                                type="file"
                                name="product"
                                onChange={handleFileChange}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                accept="image/*"
                            />
                            <Upload className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                            <span className="text-xs text-gray-500">{files.product ? files.product.name : "Upload Product"}</span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Brand Name</label>
                        <input
                            type="text"
                            name="brandName"
                            value={formData.brandName}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent outline-none transition-all"
                            placeholder="e.g. Acme Corp"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Tagline (Optional)</label>
                        <input
                            type="text"
                            name="tagline"
                            value={formData.tagline}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent outline-none transition-all"
                            placeholder="e.g. Innovation for all"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Tone Style</label>
                    <div className="flex flex-wrap gap-3">
                        {['Premium', 'Playful', 'Minimal', 'Bold', 'Festive'].map((t) => (
                            <button
                                key={t}
                                type="button"
                                onClick={() => setFormData({ ...formData, tone: t })}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${formData.tone === t
                                        ? 'bg-brand-dark text-white shadow-lg scale-105'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                            >
                                {t}
                            </button>
                        ))}
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={isGenerating}
                    className="w-full bg-gradient-to-r from-brand-accent to-pink-500 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                    {isGenerating ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            <span>Generating Magic...</span>
                        </>
                    ) : (
                        <>
                            <Sparkles className="w-5 h-5" />
                            <span>Generate Creatives</span>
                        </>
                    )}
                </button>
            </form>
        </div>
    );
};

export default CreativeForm;
