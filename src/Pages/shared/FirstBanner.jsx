import React from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';  

import img1 from '../../assets/1.png'; 
import img2 from '../../assets/2.png'; 
import img3 from '../../assets/3.png'; 
import img4 from '../../assets/4.png'; 
import img5 from '../../assets/5.png'; 

const bannerImages = [img1, img2, img3, img4, img5];

const FirstBanner = () => {
    return (
        <div className="w-full max-w-6xl mx-auto rounded-lg overflow-hidden shadow-xl my-8">
            <Swiper
                modules={[Autoplay, EffectFade, Pagination]}
                
                
                effect={'fade'} 
                slidesPerView={1}
                loop={true} 
                
                pagination={{ clickable: true }}
                
                autoplay={{
                    delay: 3000,  
                    disableOnInteraction: false, 
                }}
                
                className="first-banner-swiper h-96 md:h-[500px]" 
            >
                {bannerImages.map((image, index) => (
                    <SwiperSlide key={index}>
                        <div className="relative w-full h-full">
                            <img
                                src={image}
                                alt={`Banner slide ${index + 1}`}
                                className="w-full h-full object-cover" 
                            />
                            
                            <div className="absolute inset-0 bg-black opacity-30"></div> 
                            
                            <div className="absolute inset-0 flex items-center justify-center text-white text-center p-4">
                                <h2 className="text-4xl md:text-6xl font-extrabold drop-shadow-lg tracking-tight">
                                    Report Issues. Build Better Infrastructure.
                                </h2>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default FirstBanner;