/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { motion } from 'framer-motion';
import { Field, ErrorMessage } from 'formik';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import type { DoctorSignupFormType } from '../../../interfaces/DoctorSignupEntity';
import { DoctorQualification, DoctorSpecialization } from '@/types/Doctor/DoctorType';


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

interface ProfessionalDetailsStepProps {
  values: DoctorSignupFormType;
  errors: any;
  setFieldValue: (field: string, value: string | number | boolean | string[]) => void;
}

 const ProfessionalDetailsStep: React.FC<ProfessionalDetailsStepProps> = ({
  values,
  errors,
  setFieldValue
}) => {

  return (
    <motion.div
      key="step2"
      variants={stepVariants}
      initial="enter"
      animate="center"
      exit="exit"
      className="space-y-6"
    >
      <div className="space-y-2">
        <Label htmlFor="bio">Professional Bio</Label>
        <Field
          as={Textarea}
          id="bio"
          name="bio"
          placeholder="Tell us about your experience and approach to Ayurvedic medicine..."
          className={errors.bio ? 'border-destructive' : ''}
        />
        <ErrorMessage name="bio" component="p" className="text-sm text-destructive" />
      </div>

      <div className="space-y-3">
        <Label>Specializations</Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {Object.values(DoctorSpecialization).map((spec) => (
            <motion.div
              key={spec}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center space-x-2 p-3 rounded-lg border hover:bg-accent/50 transition-colors cursor-pointer"
            >
              <Checkbox
                checked={values.specialization.includes(spec)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setFieldValue('specialization', [...values.specialization, spec]);
                  } else {
                    setFieldValue('specialization', values.specialization.filter(s => s !== spec));
                  }
                }}
              />
              <span className="text-sm">{spec}</span>
            </motion.div>
          ))}
        </div>
        <ErrorMessage name="specialization" component="p" className="text-sm text-destructive" />
      </div>

      <div className="space-y-3">
        <Label>Qualifications</Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {Object.values(DoctorQualification).map((qual) => (
            <motion.div
              key={qual}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center space-x-2 p-3 rounded-lg border hover:bg-accent/50 transition-colors cursor-pointer"
            >
              <Checkbox
                checked={values.qualification.includes(qual)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setFieldValue('qualification', [...values.qualification, qual]);
                  } else {
                    setFieldValue('qualification', values.qualification.filter(q => q !== qual));
                  }
                }}
              />
              <span className="text-sm">{qual}</span>
            </motion.div>
          ))}
        </div>
        <ErrorMessage name="qualification" component="p" className="text-sm text-destructive" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="experienceYears">Years of Experience</Label>
        <Field
          as={Input}
          id="experienceYears"
          name="experienceYears"
          type="number"
          min="0"
          className={errors.experienceYears ? 'border-destructive' : ''}
        />
        <ErrorMessage name="experienceYears" component="p" className="text-sm text-destructive" />
      </div>
    </motion.div>
  );
};

export default React.memo(ProfessionalDetailsStep)