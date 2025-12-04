import React from 'react';
import { Twitter, Linkedin, Globe, Github, Mail, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-gray-900 border-t border-gray-800 pt-20 pb-10">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    <div className="col-span-1 md:col-span-2">
                        <Link to="/" className="flex items-center gap-2 mb-6 group">
                            <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-indigo-900/50">
                                <Sparkles size={16} />
                            </div>
                            <span className="text-xl font-bold text-white">
                                AdCraft Studio
                            </span>
                        </Link>
                        <p className="text-gray-400 max-w-sm mb-8">
                            Studio-grade AI headshots and ad creatives in seconds.
                            Perfect for professionals who need high-quality assets.
                        </p>

                        {/* Social Links */}
                        <div className="flex gap-4">
                            <a href="https://x.com/NKarthikSagar1" className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-800 rounded-full">
                                <Twitter size={20} />
                            </a>
                            <a href="https://www.linkedin.com/in/karthik-sagar-nallagula/" className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-800 rounded-full">
                                <Linkedin size={20} />
                            </a>
                            <a href="https://karthiknallagula.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-800 rounded-full">
                                <Globe size={20} />
                            </a>
                            <a href="https://github.com/karthiksagarn" className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-800 rounded-full">
                                <Github size={20} />
                            </a>
                            <a href="mailto:karthik.nallagula@proton.me" className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-800 rounded-full">
                                <Mail size={20} />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-semibold text-white mb-6">Product</h4>
                        <ul className="space-y-4 text-sm text-gray-400">
                            <li><Link to="/#features" className="hover:text-indigo-400 transition-colors">Features</Link></li>
                            <li><Link to="/pricing" className="hover:text-indigo-400 transition-colors">Pricing</Link></li>
                            <li><Link to="/#how-it-works" className="hover:text-indigo-400 transition-colors">How it Works</Link></li>
                            <li><Link to="/demo" className="hover:text-indigo-400 transition-colors">Demo</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-white mb-6">Support</h4>
                        <ul className="space-y-4 text-sm text-gray-400">
                            <li><Link to="/#faq" className="hover:text-indigo-400 transition-colors">Help Center</Link></li>
                            <li><Link to="/#contact" className="hover:text-indigo-400 transition-colors">Contact Us</Link></li>
                            <li><a href="#" className="hover:text-indigo-400 transition-colors">Status</a></li>
                            <li><a href="#" className="hover:text-indigo-400 transition-colors">Terms of Service</a></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-gray-500">
                        © 2025 AdCraft Studio. Powered by NanoBananaPro & GPT-4o.
                    </p>
                    <div className="flex gap-6 text-sm text-gray-500">
                        <a href="#" className="hover:text-gray-300 transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-gray-300 transition-colors">Cookie Policy</a>
                        <a href="#" className="hover:text-gray-300 transition-colors">GDPR</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
