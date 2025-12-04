// src/Pages/PaymentPage.jsx
import React, { useState } from 'react';
import axios from 'axios';
import StripePaymentModal from './StripePaymentModal';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import { CreditCard, ShieldCheck, Lock, ShoppingBag, Truck } from 'lucide-react';
import Footer from '../Header&Footer/Footer';
import Navbar from '../Header&Footer/Navbar';
import { useNavigate } from 'react-router-dom';

const PaymentPage = () => {
  const [isPaymentModalOpen, setPaymentModalOpen] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const { items, subtotal } = useCart();
  const { token } = useAuth();
  const navigate = useNavigate();

  // Calculate item counts for display
  const totalItems = items.reduce((sum, item) => sum + item.qty, 0);

  const handleCheckout = async () => {
    if (items.length === 0) {
      alert("Your cart is empty!");
      navigate("/cart");
      return;
    }

    setIsLoading(true);
    const amountInCents = Math.round(subtotal * 100);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/payment/create-payment-intent",
        {
          amount: amountInCents,
          currency: "lkr"
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      if (response.data && response.data.clientSecret) {
        setClientSecret(response.data.clientSecret);
        setPaymentModalOpen(true);
      }

    } catch (error) {
      console.error("Error creating payment intent:", error);
      alert("Failed to initialize payment. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePaymentSuccess = () => {
    alert("Payment Successful!");
    setPaymentModalOpen(false);
    // Add logic here to clear cart and save order to database
  };

  const handleBackToCart = () => {
    navigate("/cart");
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen p-4 md:p-10 bg-[#f6f2eaff] mt-17">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-[#604a03ff]">
            Secure Checkout
          </h1>
          <p className="text-gray-600 mb-8">Complete your purchase with confidence</p>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Order Summary */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-gray-100">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold flex items-center gap-2 text-[#604a03ff]">
                    <ShoppingBag size={20} />
                    Order Summary ({totalItems} {totalItems === 1 ? 'item' : 'items'})
                  </h2>
                  <button 
                    onClick={handleBackToCart}
                    className="text-sm text-[#604a03ff] hover:underline font-medium"
                  >
                    ← Back to Cart
                  </button>
                </div>
                
                <div className="space-y-4">
                  {items.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-gray-500">Your cart is empty</p>
                      <button 
                        onClick={handleBackToCart}
                        className="mt-4 px-4 py-2 bg-[#604a03ff] text-white rounded-lg hover:opacity-90"
                      >
                        Return to Cart
                      </button>
                    </div>
                  ) : (
                    <>
                      {items.map((item) => (
                        <div key={`${item.id}-${item.size}`} className="flex justify-between items-center py-4 border-b border-gray-100">
                          <div className="flex items-center gap-4">
                            <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                              {item.imageUrl ? (
                                <img 
                                  src={item.imageUrl} 
                                  alt={item.clothName} 
                                  className="w-full h-full object-cover" 
                                />
                              ) : (
                                <ShoppingBag size={24} className="text-gray-400" />
                              )}
                            </div>
                            <div>
                              <h3 className="font-medium">{item.clothName}</h3>
                              <p className="text-sm text-gray-500">Size: {item.size}</p>
                              <p className="text-sm text-gray-500">Quantity: {item.qty}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-medium text-[#604a03ff]">
                              LKR {(item.price * item.qty).toLocaleString()}
                            </div>
                            <div className="text-sm text-gray-500">
                              LKR {item.price.toLocaleString()} each
                            </div>
                          </div>
                        </div>
                      ))}
                      
                      {/* Order Summary Totals */}
                      <div className="pt-4">
                        <div className="flex justify-between items-center py-3">
                          <span className="text-gray-600">Subtotal ({totalItems} items)</span>
                          <span className="font-medium">LKR {subtotal.toLocaleString()}</span>
                        </div>
                        
                        <div className="flex justify-between items-center py-3 border-t border-gray-200">
                          <div className="flex items-center gap-2">
                            <Truck size={16} className="text-gray-500" />
                            <span className="font-medium">Delivery</span>
                          </div>
                          <div>
                            <span className="font-medium text-green-600">Free</span>
                            <p className="text-xs text-gray-500">Standard delivery (3-5 business days)</p>
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center py-4 border-t border-gray-200">
                          <div>
                            <span className="text-xl font-bold text-[#604a03ff]">Total Amount</span>
                            <p className="text-sm text-gray-500">Including all taxes</p>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-[#604a03ff]">
                              LKR {subtotal.toLocaleString()}
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Security Features */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <h2 className="text-xl font-semibold mb-6 flex items-center gap-2 text-[#604a03ff]">
                  <ShieldCheck size={20} />
                  Secure Payment Guarantee
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex flex-col items-center text-center p-4">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center mb-3 bg-[#f6f2eaff]">
                      <Lock size={24} className="text-[#604a03ff]" />
                    </div>
                    <h3 className="font-semibold mb-2">Bank-Level Security</h3>
                    <p className="text-sm text-gray-600">256-bit SSL encryption for all transactions</p>
                  </div>
                  
                  <div className="flex flex-col items-center text-center p-4">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center mb-3 bg-[#f6f2eaff]">
                      <CreditCard size={24} className="text-[#604a03ff]" />
                    </div>
                    <h3 className="font-semibold mb-2">Secure Payment</h3>
                    <p className="text-sm text-gray-600">Your card details are never stored on our servers</p>
                  </div>
                  
                  <div className="flex flex-col items-center text-center p-4">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center mb-3 bg-[#f6f2eaff]">
                      <ShieldCheck size={24} className="text-[#604a03ff]" />
                    </div>
                    <h3 className="font-semibold mb-2">100% Protected</h3>
                    <p className="text-sm text-gray-600">Guaranteed refund if service not delivered</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Payment Action */}
            <div className="lg:col-span-1">
              <div className="sticky top-6">
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                  <div className="flex items-center justify-center gap-2 mb-6 p-3 rounded-lg bg-[#f6f2eaff]">
                    <CreditCard size={24} className="text-[#604a03ff]" />
                    <span className="font-semibold text-[#604a03ff]">
                      Payment Details
                    </span>
                  </div>
                  
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600">Total Items</span>
                      <span className="font-medium">{totalItems}</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600">Unique Products</span>
                      <span className="font-medium">{items.length}</span>
                    </div>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-gray-600">Order Total</span>
                      <span className="text-2xl font-bold text-[#604a03ff]">
                        LKR {subtotal.toLocaleString()}
                      </span>
                    </div>
                    
                    <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-4 mb-6">
                      <p className="text-sm text-yellow-800">
                        <span className="font-semibold">Note:</span> You'll be redirected to a secure Stripe payment page to complete your transaction.
                      </p>
                    </div>
                  </div>

                  <button 
                    onClick={handleCheckout}
                    disabled={isLoading || items.length === 0}
                    className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-2
                      ${isLoading || items.length === 0 
                        ? 'opacity-50 cursor-not-allowed' 
                        : 'hover:scale-[1.02] active:scale-[0.98] hover:shadow-lg'}`}
                    style={{ 
                      backgroundColor: '#604a03ff',
                      color: '#ffffff'
                    }}
                  >
                    {isLoading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Processing...
                      </>
                    ) : (
                      <>
                        <CreditCard size={20} />
                        {items.length === 0 ? 'Cart is Empty' : `Pay LKR ${subtotal.toLocaleString()}`}
                      </>
                    )}
                  </button>
                  
                  <p className="text-xs text-center text-gray-500 mt-4 flex items-center justify-center gap-1">
                    <Lock size={12} />
                    Your payment is secured with Stripe
                  </p>
                  
                  {/* Accepted Payment Methods */}
                  <div className="mt-8 pt-6 border-t border-gray-100">
                    <p className="text-sm text-gray-500 text-center mb-3">We Accept</p>
                    <div className="flex justify-center gap-4 opacity-70">
                      <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center">
                        <span className="text-xs font-semibold">VISA</span>
                      </div>
                      <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center">
                        <span className="text-xs font-semibold">MC</span>
                      </div>
                      <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center">
                        <span className="text-xs">Amex</span>
                      </div>
                    </div>
                  </div>

                  {/* Return Policy */}
                  <div className="mt-6 pt-6 border-t border-gray-100">
                    <p className="text-xs text-gray-500 text-center">
                      By completing your purchase, you agree to our{' '}
                      <a href="/terms" className="text-[#604a03ff] hover:underline">Terms of Service</a>{' '}
                      and{' '}
                      <a href="/privacy" className="text-[#604a03ff] hover:underline">Privacy Policy</a>
                    </p>
                  </div>
                </div>
                
                {/* Need Help Section */}
                <div className="mt-4 text-center">
                  <p className="text-sm text-gray-600">
                    Need help? <a href="/contact" className="font-medium hover:underline text-[#604a03ff]">Contact Support</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Conditionally render the modal only if Open AND we have a Secret */}
        {isPaymentModalOpen && clientSecret && (
          <StripePaymentModal 
            clientSecret={clientSecret} 
            amount={subtotal}
            onClose={() => setPaymentModalOpen(false)}
            onSuccess={handlePaymentSuccess}
          />
        )}
      </div>
      <Footer />
    </div>
  );
};

export default PaymentPage;