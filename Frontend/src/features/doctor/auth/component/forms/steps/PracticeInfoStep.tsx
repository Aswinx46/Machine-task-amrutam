/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Field, ErrorMessage } from 'formik';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { DoctorSignupFormType } from '../../../interfaces/DoctorSignupEntity';

const stepVariants = {
  enter: { x: 300, opacity: 0, scale: 0.9 },
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 300, damping: 30 }
  },
  exit: {
    x: -300,
    opacity: 0,
    scale: 0.9,
    transition: { type: "spring" as const, stiffness: 300, damping: 30 }
  }
};

interface PracticeInfoStepProps {
  values: DoctorSignupFormType;
  errors: any;
  setFieldValue: (field: string, value: string | number | boolean | string[]) => void;
}

 const PracticeInfoStep: React.FC<PracticeInfoStepProps> = ({
  values,
  errors,
  setFieldValue
  
}) => {
  const [languageInput, setLanguageInput] = useState(values.languages!.join(', '));

  return (
    <motion.div
      key="step3"
      variants={stepVariants}
      initial="enter"
      animate="center"
      exit="exit"
      className="space-y-6"
    >
      <div className="space-y-2">
        <Label htmlFor="clinicName">Clinic/Practice Name</Label>
        <Field
          as={Input}
          id="clinicName"
          name="clinicName"
          className={errors.clinicName ? 'border-destructive' : ''}
        />
        <ErrorMessage name="clinicName" component="p" className="text-sm text-destructive" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="address">Practice Address</Label>
        <Field
          as={Textarea}
          id="address"
          name="address"
          placeholder="Full address of your practice/clinic"
          className={errors.address ? 'border-destructive' : ''}
        />
        <ErrorMessage name="address" component="p" className="text-sm text-destructive" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="mode">Consultation Mode</Label>
        <Select value={values.mode} onValueChange={(value) => setFieldValue('mode', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select consultation mode" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="online">Online Consultations</SelectItem>
            <SelectItem value="In-person">In-Person Consultations</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="languages">Languages Spoken (comma-separated)</Label>
        <Field
          as={Input}
          id="languages"
          placeholder="e.g., English, Hindi, Sanskrit"
          value={languageInput}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setLanguageInput(e.target.value);
            setFieldValue(
              'languages',
              e.target.value.split(',').map(lang => lang.trim()).filter(Boolean)
            );
          }
            
          }
        />
      </div>
    </motion.div>
  );
};

export default React.memo(PracticeInfoStep)