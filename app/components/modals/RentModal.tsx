"use client";

import useRentModal from "@/app/hooks/useRentModal";
import Modal from "./Modal";
import { Switch } from "@headlessui/react";
import { useMemo, useState, useEffect } from "react";
import Heading from "../Heading";
import { categories } from "../navbar/Categories";
import CategoryInput from "../Inputs/CategoryInput";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import CountrySelect from "../Inputs/CountrySelect";
import dynamic from "next/dynamic";
import Counter from "../Inputs/Counter";
import ImageUpload from "../Inputs/ImageUpload";
import Input from "../Inputs/Input";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface RentModalProps {
  isOpen: boolean;
  onClose: () => void;
  listing?: FieldValues;
}

const RentModal: React.FC<RentModalProps> = ({ isOpen, onClose, listing }) => {
  const [step, setStep] = useState(STEPS.CATEGORY);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const router = useRouter();

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  AMENITIES = 5,
  PRICE = 6,
}

const RentModal: React.FC = () => {
  const rentModal = useRentModal();
  const [step, setStep] = useState(STEPS.CATEGORY);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [garageEnabled, setGarageEnabled] = useState(false);
  const [arableLandEnabled, setArableLandEnabled] = useState(false);
  const [otherBuildingsEnabled, setOtherBuildingsEnabled] = useState(false);
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
      photos: [],
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
  const photos = watch("photos");

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (step !== STEPS.PRICE) {
      return onNext();
    }

    // Ensure correct data types
    const formattedData = {
      ...data,
      guestCount: Number(data.guestCount),
      roomCount: Number(data.roomCount),
      bathroomCount: Number(data.bathroomCount),
      price: Number(data.price),
      numberOfOtherBuildings: Number(data.numberOfOtherBuildings),
      numberOfHabitableBuildings: Number(data.numberOfHabitableBuildings),
      landSize: Number(data.landSize),
      arableLandSize: Number(data.arableLandSize),
    };

    setIsLoading(true);

    const request = axios.post("/api/listings", formattedData);

    request
      .then(() => {
        toast.success("Listing saved successfully");
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

  const Map = useMemo(
    () => dynamic(() => import("../Map"), { ssr: false }),
    [] // Remove location from dependency array
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
    if (isUploading) {
      toast.error("Please wait for the image upload to complete.");
      return;
    }
    setStep((prev) => prev + 1);
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
      <div className="flex items-center mt-4">
        <Switch
          checked={watch("isPublic")}
          onChange={(value) => setCustomValue("isPublic", value)}
          className={`${
            watch("isPublic") ? "bg-blue-600" : "bg-gray-200"
          } relative inline-flex h-6 w-11 items-center rounded-full`}
        >
          <span className="sr-only">Public</span>
          <span
            className={`${
              watch("isPublic") ? "translate-x-6" : "translate-x-1"
            } inline-block h-4 w-4 transform rounded-full bg-white transition`}
          />
        </Switch>
        <span className="ml-3 text-sm font-medium text-gray-900">
          {watch("isPublic") ? "Public" : "Private"}
        </span>
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
          label="Primary Image"
          value={imageSrc}
          setLoading={setIsUploading}
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

  if (step === STEPS.AMENITIES) {
    bodyContent = (
      <div className="flex flex-col gap-8 max-h-[50vh] overflow-y-auto">
        <Heading
          title="Information and Amenities"
          subtitle="Provide more information about your place"
        />
        <Input
          id="agentWebsite"
          label="Agent Website"
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
        <div className="flex items-center mt-4">
          <Switch
            checked={watch("hasSwimmingPool")}
            onChange={(value) => setCustomValue("hasSwimmingPool", value)}
            className={`${
              watch("hasSwimmingPool") ? "bg-blue-600" : "bg-gray-200"
            } relative inline-flex h-6 w-11 items-center rounded-full`}
          >
            <span className="sr-only">Swimming Pool</span>
            <span
              className={`${
                watch("hasSwimmingPool") ? "translate-x-6" : "translate-x-1"
              } inline-block h-4 w-4 transform rounded-full bg-white transition`}
            />
          </Switch>
          <span className="ml-3 text-sm font-medium text-gray-900">
            Swimming Pool
          </span>
        </div>
        <hr />
        <div className="flex items-center mt-4">
          <Switch
            checked={garageEnabled}
            onChange={(value) => setGarageEnabled(value)}
            className={`${
              garageEnabled ? "bg-blue-600" : "bg-gray-200"
            } relative inline-flex h-6 w-11 items-center rounded-full`}
          >
            <span className="sr-only">Garage</span>
            <span
              className={`${
                garageEnabled ? "translate-x-6" : "translate-x-1"
              } inline-block h-4 w-4 transform rounded-full bg-white transition`}
            />
          </Switch>
          <span className="ml-3 text-sm font-medium text-gray-900">Garage</span>
        </div>
        {garageEnabled && (
          <Input
            id="numberOfGarageSpaces"
            label="Number of Garage Spaces"
            type="number"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          />
        )}
        <hr />
        <div className="flex items-center mt-4">
          <Switch
            checked={arableLandEnabled}
            onChange={(value) => setArableLandEnabled(value)}
            className={`${
              arableLandEnabled ? "bg-blue-600" : "bg-gray-200"
            } relative inline-flex h-6 w-11 items-center rounded-full`}
          >
            <span className="sr-only">Arable Land</span>
            <span
              className={`${
                arableLandEnabled ? "translate-x-6" : "translate-x-1"
              } inline-block h-4 w-4 transform rounded-full bg-white transition`}
            />
          </Switch>
          <span className="ml-3 text-sm font-medium text-gray-900">
            Arable Land
          </span>
        </div>
        {arableLandEnabled && (
          <>
            <Input
              id="arableLandSize"
              label="Arable Land Size"
              type="number"
              disabled={isLoading}
              register={register}
              errors={errors}
              required
            />
            <select
              id="arableLandUnit"
              {...register("arableLandUnit")}
              className="border rounded p-2"
            >
              <option value="sqm">sqm</option>
              <option value="ac">ac</option>
              <option value="ha">ha</option>
            </select>
          </>
        )}
        <hr />
        <div className="flex items-center mt-4">
          <Switch
            checked={otherBuildingsEnabled}
            onChange={(value) => setOtherBuildingsEnabled(value)}
            className={`${
              otherBuildingsEnabled ? "bg-blue-600" : "bg-gray-200"
            } relative inline-flex h-6 w-11 items-center rounded-full`}
          >
            <span className="sr-only">Other Buildings</span>
            <span
              className={`${
                otherBuildingsEnabled ? "translate-x-6" : "translate-x-1"
              } inline-block h-4 w-4 transform rounded-full bg-white transition`}
            />
          </Switch>
          <span className="ml-3 text-sm font-medium text-gray-900">
            Other Buildings
          </span>
        </div>
        {otherBuildingsEnabled && (
          <>
            <Input
              id="numberOfOtherBuildings"
              label="Number of Other Buildings"
              type="number"
              disabled={isLoading}
              register={register}
              errors={errors}
              required
            />
            <Input
              id="numberOfHabitableBuildings"
              label="Number of Habitable Buildings"
              type="number"
              disabled={isLoading}
              register={register}
              errors={errors}
              required
            />
          </>
        )}
      </div>
    );
  }

  if (step === STEPS.PRICE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Now let's set up your price"
          subtitle="You can always edit this later"
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
      title="Add a Property"
      body={bodyContent}
    />
  );
};

export default RentModal;
