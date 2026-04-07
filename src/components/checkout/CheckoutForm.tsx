import { type UseFormRegister, type FieldErrors } from "react-hook-form";
import type { CheckoutFormValues } from "../../lib/schemas";
import Input from "../ui/Input";
import FormError from "../ui/FormError";

type CheckoutFormProps = {
  register: UseFormRegister<CheckoutFormValues>;
  errors: FieldErrors<CheckoutFormValues>;
  apiErrors: string[];
};

 const CheckoutForm = ({ register, errors, apiErrors }: CheckoutFormProps) => {
  return (
    <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
      <h2 className="text-base font-bold text-gray-900">Delivery Address</h2>

      <FormError errors={apiErrors} />

      <div className="grid sm:grid-cols-2 gap-4">
        <Input
          label="Full Name"
          required
          placeholder="John Smith"
          error={errors.full_name?.message}
          {...register("full_name")}
        />
        <Input
          label="Phone"
          required
          placeholder="+971 50 000 0000"
          error={errors.phone?.message}
          {...register("phone")}
        />
      </div>

      <Input
        label="Street Address"
        required
        placeholder="Building, street name"
        error={errors.street?.message}
        {...register("street")}
      />

      <div className="grid sm:grid-cols-2 gap-4">
        <Input
          label="City"
          required
          placeholder="Dubai"
          error={errors.city?.message}
          {...register("city")}
        />
        <Input
          label="State / Emirate"
          placeholder="Optional"
          {...register("state")}
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <Input
          label="Country"
          required
          placeholder="UAE"
          error={errors.country?.message}
          {...register("country")}
        />
        <Input
          label="Postal Code"
          placeholder="Optional"
          {...register("postal_code")}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Delivery Notes
          <span className="ml-1 text-gray-400 font-normal">(optional)</span>
        </label>
        <textarea
          rows={3}
          placeholder="Special delivery instructions…"
          className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl outline-none focus:border-[#feee00] focus:ring-2 focus:ring-[#feee00]/30 transition resize-none"
          {...register("notes")}
        />
      </div>
    </div>
  );
};



export default CheckoutForm;