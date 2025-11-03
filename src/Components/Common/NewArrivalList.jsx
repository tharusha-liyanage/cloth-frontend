import React from "react";


const NewArrivalList = ({ clothes, onHide, isAdmin }) => {
    return (
        <div className="grid grid-cols-4 gap-6">
            {clothes.map(item => (
                <div key={item.id} className="bg-white shadow-lg rounded-xl overflow-hidden">
                    <img src={item.imageUrl} className="w-full h-56 object-cover" alt="" />

                    <div className="p-4">
                        <h3 className="font-bold text-lg">{item.clothName}</h3>
                        <p className="text-gray-600">Rs. {item.price}</p>

                        {isAdmin && (
                            <button
                                onClick={() => onHide(item.id)}
                                className="mt-3 bg-red-600 text-white px-3 py-1 rounded"
                            >
                                Remove from Display
                            </button>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default NewArrivalList;
