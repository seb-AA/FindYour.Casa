
"use client"
import { useMemo, useState } from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import useRentModal from "@/app/hooks/useRentModal";
import Modal from "./Modal";
import Heading from "../Heading";
import CategoryInput from "../Inputs/CategoryInput";
import CountrySelect from "../Inputs/CountrySelect";
import Counter from "../Inputs/Counter";
import ImageUpload from "../Inputs/ImageUpload";
import Input from "../Inputs/Input";
import { categories } from "../navbar/Categories";

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  DETAILS = 5,
  AMENITIES = 6,
  PRICE = 7,
}

const RentModal = () => {
  const rentModal = useRentModal();
  const [step, setStep] = useState(STEPS.CATEGORY);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      category: "",
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: "",
      price: 1,
      title: "",
      description: "",
      agentWebsite: "",
      notes: "",
      hasSwimmingPool: false,
      hasGarage: false,
      numberOfOtherBuildings: 0,
      numberOfHabitableBuildings: 0,
      landSize: 0,
      arableLandSize: 0,
      isPublic: false,
    },
  });

  const category = watch("category");
  const location = watch("location");
  const guestCount = watch("guestCount");
  const roomCount = watch("roomCount");
  const bathroomCount = watch("bathroomCount");
  const imageSrc = watch("imageSrc");

  const Map = useMemo(
    () => dynamic(() => import("../Map"), { ssr: false }),
    [location]
  );

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const onBack = () => {
    setStep((prev) => prev - 1);
  };

  const onNext = () => {
    setStep((prev) => prev + 1);
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (step !== STEPS.PRICE) {
      return onNext();
    }

    setIsLoading(true);

    axios
      .post("/api/listings", data)
      .then(() => {
        toast.success("Listing created successfully");
        router.refresh();
        reset();
        setStep(STEPS.CATEGORY);
        rentModal.onClose();
      })
      .catch(() => {
        toast.error("Something went wrong");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return "Publish";
    }

    return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined;
    }

    return "Back";
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title="Which category best describes your place?"
        subtitle="You can change this later"
      />
      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          lg:grid-cols-3
          gap-3
          max-h-[50vh]
          overflow-y-auto
        "
      >
        {categories.map((item) => (
          <div key={item.label} className="col-span-1">
            <CategoryInput
              onClick={(category) => setCustomValue("category", category)}
              selected={category === item.label}
              label={item.label}
              icon={item.icon}
            />
          </div>
        ))}
      </div>
    </div>
  );

  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Where's your place located?"
          subtitle="Exact address will be shared with guests after booking is confirmed"
        />
        <CountrySelect
          onChange={(value) => setCustomValue("location", value)}
          value={location}
        />
        <Map center={location?.latlng} />
      </div>
    );
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Share some details about your place"
          subtitle="You can always change this later"
        />
        <Counter
          title="Guests"
          subtitle="How many guests can your place accommodate?"
          value={guestCount}
          onChange={(value) => setCustomValue("guestCount", value)}
        />
        <hr />
        <Counter
          title="Rooms"
          subtitle="How many rooms can guests use?"
          value={roomCount}
          onChange={(value) => setCustomValue("roomCount", value)}
        />
        <hr />
        <Counter
          title="Bathrooms"
          subtitle="How many bathrooms can guests use?"
          value={bathroomCount}
          onChange={(value) => setCustomValue("bathroomCount", value)}
        />
      </div>
    );
  }

  if (step === STEPS.IMAGES) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Upload some photos of your place"
          subtitle="You can always add more later"
        />
        <ImageUpload
          value={imageSrc}
          onChange={(value) => setCustomValue("imageSrc", value)}
        />
      </div>
    );
  }

  if (step === STEPS.DESCRIPTION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Describe your place to guests"
          subtitle="You can always edit this later"
        />
        <Input
          id="title"
          label="Title"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <hr />
        <Input
          id="description"
          label="Description"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    );
  }

  if (step === STEPS.DETAILS) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Add additional details about your property"
          subtitle="You can always edit this later"
        />
        <Input
          id="agentWebsite"
          label="Real Estate Agent's Website"
          disabled={isLoading}
          register={register}
          errors={errors}
        />
        <hr />
        <Input
          id="notes"
          label="Notes"
          disabled={isLoading}
          register={register}
          errors={errors}
        />
        <hr />
        <ImageUpload
          id="photos"
          label="Additional Photos"
          multiple
          value={watch("photos")}
          onChange={(value) => setCustomValue("photos", value)}
/>
</div>
);
}

if (step === STEPS.AMENITIES) {
bodyContent = (
<div className="flex flex-col gap-8">
<Heading
title="List the amenities of your place"
subtitle="Specify the amenities your property offers"
/>
<label className="flex items-center">
<input
type="checkbox"
id="hasSwimmingPool"
className="mr-2"
disabled={isLoading}
{...register("hasSwimmingPool")}
/>
<span>Swimming Pool</span>
</label>
<hr />
<label className="flex items-center">
<input
type="checkbox"
id="hasGarage"
className="mr-2"
disabled={isLoading}
{...register("hasGarage")}
/>
<span>Garage</span>
</label>
<hr />
<Input
id="numberOfOtherBuildings"
label="Number of Other Buildings"
type="number"
disabled={isLoading}
register={register}
errors={errors}
/>
<hr />
<Input
id="numberOfHabitableBuildings"
label="Number of Habitable Buildings"
type="number"
disabled={isLoading}
register={register}
errors={errors}
/>
<hr />
<Input
id="landSize"
label="Size of Land (sq meters)"
type="number"
disabled={isLoading}
register={register}
errors={errors}
/>
<hr />
<Input
id="arableLandSize"
label="Size of Arable Land (sq meters)"
type="number"
disabled={isLoading}
register={register}
errors={errors}
/>
<hr />
<label className="flex items-center">
<input
type="checkbox"
id="isPublic"
className="mr-2"
disabled={isLoading}
{...register("isPublic")}
/>
<span>Make this property public</span>
</label>
</div>
);
}

if (step === STEPS.PRICE) {
bodyContent = (
<div className="flex flex-col gap-8">
<Heading
title="Set your price"
subtitle="You can always change this later"
/>
<Input
id="price"
label="Price"
formatPrice
type="number"
disabled={isLoading}
register={register}
errors={errors}
required
/>
</div>
);
}

return (
<Modal
isOpen={rentModal.isOpen}
onClose={rentModal.onClose}
onSubmit={handleSubmit(onSubmit)}
actionLabel={actionLabel}
secondaryActionLabel={secondaryActionLabel}
secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
title="List your property"
body={bodyContent}
/>
);
};

export default RentModal;
