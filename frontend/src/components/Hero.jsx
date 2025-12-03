import React from 'react';
import { Sparkles } from 'lucide-react';

const Hero = () => {
    return (
        <div className="relative overflow-hidden bg-brand-peach pt-16 pb-32">
            <div className="container mx-auto px-4 text-center relative z-10">
                <div className="inline-flex items-center space-x-2 bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full mb-8 shadow-sm border border-white/20">
                    <Sparkles className="w-4 h-4 text-brand-accent" />
                    <span className="text-sm font-medium text-brand-dark/70">AI-Powered Creative Engine</span>
                </div>

                <h1 className="text-5xl md:text-7xl font-bold text-brand-dark mb-6 tracking-tight">
                    Generate <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-pink-500">Infinite</span><br />
                    Brand Creatives
                </h1>

                <p className="text-xl text-brand-dark/60 max-w-2xl mx-auto mb-10 leading-relaxed">
                    Upload your assets and let our AI generate stunning, high-converting ad creatives in seconds. No design skills required.
                </p>
            </div>

            {/* Abstract Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-0 pointer-events-none">
                <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-brand-accent/10 rounded-full blur-3xl"></div>
                <div className="absolute top-[40%] -right-[10%] w-[40%] h-[40%] bg-pink-500/10 rounded-full blur-3xl"></div>
            </div>
        </div>
    );
};

export default Hero;
