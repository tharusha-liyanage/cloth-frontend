import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:8080/api/offers/all";


const TypewriterText = ({ text, durationSeconds = 10, className = "" }) => {
  if (!text) return null;

  const steps = text.length;
  
  const totalDuration = durationSeconds + 3; // 1 second for pause/reset

  // Custom style to apply the dynamic animation properties
  const animationStyle = {
    // The animation string is now a single infinite loop
    animation: 
      // 1. Typing: Uses 80% of the cycle time to type the text
      `typing ${durationSeconds}s steps(${steps}) infinite, 
      /* 2. Cursor: Blinks only during the typing phase */
      blink-caret .75s steps(1) infinite`, 
    
    // Set an initial fixed width (optional, depends on look)
    width: 'fit-content',
    // We remove 'forwards' to allow it to reset after each loop
  };

  // To achieve the perfect loop, we use a wrapper span to control the entire cycle duration
  const wrapperStyle = {
    // This controls the timing of the entire sequence: type, pause, reset.
    animation: `typing-wrapper ${totalDuration * 2}s steps(1) infinite`,
  };

  // NOTE: For perfect looping, a more complex setup is usually required, 
  // but this simplified version often works visually:

  return (
    <span 
      className={`typing-animation ${className}`}
      // Use the calculated time for the animation
      style={{
        animation: 
            `typing ${durationSeconds}s steps(${steps}) infinite, 
             blink-caret .75s step-end infinite`,
        width: 'fit-content'
      }}
    >
      {text}
    </span>
  );
};

// =================================================================
// 2. MAIN OFFER BANNER COMPONENT (Usage remains the same)
// =================================================================

export default function OfferBanner() {
    const [offer, setOffer] = useState(null);

    // ... (useEffect and fetchOffer functions remain the same) ...
    useEffect(() => {
        fetchOffer();
    }, []);

    const fetchOffer = async () => {
        try {
            const res = await axios.get(API_URL);

            if (res.data.length > 0) {
                setOffer(res.data[0]);
            }
        } catch (err) {
            console.error("Error loading offer:", err);
        }
    };

    if (!offer) return null;

    return (
        <div className="container mx-auto p-4">
        <div className="relative w-full mt-6 rounded-2xl overflow-hidden shadow-xl">
            <img
                src={offer.imageUrl}
                alt="Offer Banner"
                className="w-full h-[600px] md:h-[720px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
            
            <div className="absolute inset-0 flex flex-col items-start justify-center px-10">
                <p className="text-4xl md:text-4xl font-bold text-[#b1afafff] drop-shadow-lg">Special offer</p>
                <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
                    {offer.title1}
                </h1>

                {/* Applying Typewriter to title2 with infinite loop */}
                <p className="text-2xl md:text-3xl text-gray-200 mt-2 drop-shadow-lg">
                    <TypewriterText 
                        text={offer.title2} 
                        durationSeconds={6}
                        className="text-gray-200"
                    />
                </p>

                <p className="text-2xl md:text-3xl text-gray-200 -mb-70 mt-50 drop-shadow-lg">Mahinda Trade Center-Imaduwa</p>
            </div>
        </div>
        </div>
    );
}