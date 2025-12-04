import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { X, Loader2, Lock } from 'lucide-react';

// Initialize Stripe outside of the component to avoid recreating the object on every render
// REPLACE with your actual Publishable Key (pk_test_...)
const PUBLIC_KEY = "pk_test_51SaWC4Rq4Ufs9K0n5sXwNp6kFeG44oq3f5lCe8XKyFhknrx1NaxzIl83dOYByKJ7RPd5CFJuBSRI6S8KYxoLAqsB009FX8cD3T";
const stripePromise = loadStripe(PUBLIC_KEY);

// --- Internal Component: The Form ---
const CheckoutForm = ({ onSuccess, amount }) => {
  const stripe = useStripe();
  const elements = useElements();
  
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      return;
    }

    setLoading(true);
    setErrorMessage(null);

    try {
      // Confirm the payment
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          // This return_url is required by Stripe, even if we don't redirect (e.g. for simple cards)
          return_url: window.location.origin + "/payment-success",
        },
        redirect: 'if_required' // PREVENTS redirect if not strictly necessary (like 3D secure)
      });

      if (error) {
        // Show error to your customer (e.g., insufficient funds)
        setErrorMessage(error.message);
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        // Success!
        console.log("Payment Succeeded:", paymentIntent);
        onSuccess(paymentIntent.id);
      } else {
        setErrorMessage("Unexpected payment status.");
      }
    } catch (e) {
      setErrorMessage("An unexpected error occurred.");
      console.error(e);
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 mt-4">
      <PaymentElement />
      
      {errorMessage && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg">
          {errorMessage}
        </div>
      )}

      <button 
        disabled={!stripe || loading} 
        type="submit"
        className="w-full bg-[#023545] text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#022a36] disabled:bg-gray-300 disabled:cursor-not-allowed transition-all shadow-md"
      >
        {loading ? <Loader2 className="animate-spin" size={20} /> : `Pay LKR ${amount.toLocaleString()}`} 
      </button>
    </form>
  );
};

// --- Main Component: The Modal Wrapper ---
const StripePaymentModal = ({ clientSecret, onClose, onSuccess, amount }) => {
  
  // 1. If clientSecret is missing, we cannot load the form.
  if (!clientSecret) {
    return null; 
  }

  // 2. Stripe Element Options
  const options = {
    clientSecret,
    appearance: {
      theme: 'stripe', // 'stripe', 'night', 'flat'
      variables: {
        colorPrimary: '#023545',
      },
    },
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-md p-6 rounded-3xl shadow-2xl relative transform transition-all scale-100">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2 text-[#023545]">
            <Lock size={20} />
            <h2 className="text-xl font-bold">Secure Payment</h2>
          </div>
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-gray-900 transition-colors bg-gray-100 p-1 rounded-full"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="max-h-[80vh] overflow-y-auto pr-1">
          <Elements options={options} stripe={stripePromise}>
            <CheckoutForm 
              onSuccess={onSuccess} 
              amount={amount} 
            />
          </Elements>
        </div>

        {/* Footer / Trust badges could go here */}
        <div className="mt-6 text-center text-xs text-gray-400">
          Powered by Stripe
        </div>
      </div>
    </div>
  );
};

export default StripePaymentModal;