import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('your_publishable_key'); // Replace with your Stripe publishable key

function Checkout() {
  const { priceId } = useParams();

  useEffect(() => {
    const createCheckoutSession = async () => {
      try {
        const stripe = await stripePromise;
        
        // Call your backend endpoint to create a checkout session
        const response = await fetch('/api/create-checkout-session', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            priceId: priceId,
          }),
        });

        const session = await response.json();

        // Redirect to Stripe Checkout
        const result = await stripe.redirectToCheckout({
          sessionId: session.id,
        });

        if (result.error) {
          console.error(result.error);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    createCheckoutSession();
  }, [priceId]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl mb-4">Redirecting to checkout...</h2>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00FFB2] mx-auto"></div>
      </div>
    </div>
  );
}

export default Checkout;