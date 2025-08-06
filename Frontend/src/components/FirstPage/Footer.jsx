import { HomeIcon } from "@heroicons/react/24/solid"; // ✅ v2 syntax
import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-[#12131C] text-[#C5C8D7] pt-24 pb-8 mt-24">
            <div className="max-w-7xl mx-auto px-8">
                <div className="grid grid-cols-2 md:grid-cols-6 gap-10">
                    <div className="col-span-2">
                        <div className="flex items-center gap-2">
                            <HomeIcon className="w-7 h-7 text-[#5A80E9] bouncing-icon" />
                            <span className="text-2xl font-bold text-white">StayEase</span>
                        </div>
                        <p className="mt-4 text-sm max-w-xs">The world's most extraordinary homes with five-star service.</p>
                        <div className="flex gap-4 mt-6">
                            <a href="#" className="social-icon"><i className="fab fa-instagram"></i></a>
                            <a href="#" className="social-icon"><i className="fab fa-twitter"></i></a>
                            <a href="#" className="social-icon"><i className="fab fa-youtube"></i></a>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-bold text-white mb-4">About StayEase</h4>
                        <ul className="space-y-3 text-sm">
                            <li><a href="#" className="hover:text-white transition-colors">Our Story</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Press</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-white mb-4">Destinations</h4>
                        <ul className="space-y-3 text-sm">
                            <li><a href="#" className="hover:text-white transition-colors">Goa</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Bali</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Maldives</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Tuscany</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-white mb-4">Hosting</h4>
                        <ul className="space-y-3 text-sm">
                            <li><a href="#" className="hover:text-white transition-colors">Become a Host</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Host Resources</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Community Forum</a></li>
                        </ul>
                    </div>

                    <div className="col-span-2 md:col-span-1">
                        <h4 className="font-bold text-white mb-4">Subscribe</h4>
                        <form className="flex">
                            <input
                                type="email"
                                placeholder="Your Email"
                                className="bg-white/5 p-2 rounded-l-lg text-sm w-full outline-none focus:ring-2 focus:ring-[#5A80E9]/50 transition-all"
                            />
                            <button className="bg-[#5A80E9] p-2 rounded-r-lg text-white font-bold text-lg hover:bg-[#4e71d0] transition-colors">
                                &rarr;
                            </button>
                        </form>
                    </div>
                </div>

                <div className="mt-20 pt-8 border-t border-white/10 glowing-divider-footer flex flex-col md:flex-row justify-between items-center text-sm">
                    <p className="text-center md:text-left text-[#C5C8D7]/70">&copy; 2025 StayEase. All Rights Reserved.</p>
                    <div className="flex items-center gap-6 mt-4 md:mt-0">
                        <a href="#" className="hover:text-white transition-colors">Privacy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms</a>
                        <a href="#" className="hover:text-white transition-colors">Sitemap</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
