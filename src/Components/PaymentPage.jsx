import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  "pk_test_51OGcQXSHZSct4ug9eu44GpCEVyhRkYEKU7LhRqfFKAkA7OsL9I3Ct6VFE8o2AFwE0fOcboqK7ronYc8UPk37akXc00R2qdAKpo"
);

export default function PaymentPage() {
  const options = {
    // passing the client secret obtained from the server
    clientSecret: "{{CLIENT_SECRET}}",
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm />
    </Elements>
  );
}
