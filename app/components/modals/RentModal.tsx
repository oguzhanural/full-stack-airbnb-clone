'use client';

import useRentModal from "@/app/hooks/useRentModal";
import Modal from "./Modal";

import { useMemo, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";

import Heading from "../Heading";
import { categories } from "../navbar/Categories";
import CategoryInput from "../inputs/CategoryInput";
import CountrySelect from "../inputs/CountrySelect";
import Map from "../Map";


enum STEPS {
    CATEGORY = 0,
    LOCATION = 1,
    INFO = 2,
    IMAGES = 3,
    DESCRIPTION = 4,
    PRICE = 5
}

const RentModal = () => {
    const rentModal = useRentModal();
    const [step, setStep] = useState(STEPS.CATEGORY); // STEPS.CATEGORY = 0

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: {
            errors,
        },
        reset
    } = useForm<FieldValues>({
        defaultValues: {
            category: '',
            location: null, // it's gonna be object so right now just null
            guestCount: 1,
            roomCount: 1,
            bathroomCount: 1,
            imageSrc: '',
            price: 1,
            title: '',
            description: '',
        }
    });
    // first thing first category will create.
    const category = watch('category');
    const location = watch('location');

    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldValidate: true, // most important one.
            shouldDirty: true,
            shouldTouch: true,
        });

    }

    const onBack = () => {
        setStep((value:number) => value - 1);
    }

    const onNext = () => {
        setStep((value:number) => value + 1);
    }

    const actionLabel = useMemo( () => {
        if (step === STEPS.PRICE) {
            return 'Create';
        }
        return 'Next';
    }, [step]);

    const secondaryActionLabel = useMemo( () => {
        if (step === STEPS.CATEGORY) { // if we are first step, there is no back button.
            return undefined;
        }
        return 'Back';
    }, [step]);
    
    let bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading
            title="Which of these best describes of your place?"
            subtitle="Pick a category"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
                {/* // map fonksiyonu ile kategorileri buraya ekleyeceğiz */}
                {categories.map((item) => (
                    <div key={item.label} className="col-span-1">
                       <CategoryInput
                        onClick = {(category) => setCustomValue('category', category)}
                        selected = {category === item.label}
                        label = {item.label}
                        icon = {item.icon}
                       />
                    </div>
                ))} 
                
            </div>
        </div>
    )

    if (step === STEPS.LOCATION) {
        bodyContent = (
            <div className="flex flex-col gap-8 ">
                <Heading
                 title="Where is your place located?"
                 subtitle="Help guests find you!"
                />
                <CountrySelect
                value={location}
                onChange={ (value) => setCustomValue('location', value)}
                />
                {/* MAP COMPONENT. HARİTA EKLENECEK! */}
                <Map /> 
            </div>
        )
    }
    

  return (

    <Modal 
    onClose={rentModal.onClose}
    onSubmit={onNext} // we will change this later
    isOpen = {rentModal.isOpen}
    actionLabel={actionLabel}
    secondaryActionLabel={secondaryActionLabel}
    secondaryAction={step === STEPS.CATEGORY ? undefined : onBack } 
    title="Airbnb your home!"
    body={bodyContent}
    />

  );
}

export default RentModal