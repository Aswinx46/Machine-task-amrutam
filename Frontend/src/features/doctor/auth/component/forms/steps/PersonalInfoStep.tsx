/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { motion } from 'framer-motion';
import { Field, ErrorMessage } from 'formik';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Mail, Phone } from 'lucide-react';
import type {DoctorSignupFormType } from '../../../interfaces/DoctorSignupEntity';

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

interface PersonalInfoStepProps {
  values: DoctorSignupFormType;
  errors: any;
  setFieldValue: (field: string, value: string | number) => void;
}

 const PersonalInfoStep: React.FC<PersonalInfoStepProps> = ({
 
  errors,
}) => {
  return (
    <motion.div
      key="step1"
      variants={stepVariants}
      initial="enter"
      animate="center"
      exit="exit"
      className="space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name"> Name</Label>
          <Field
            as={Input}
            id="name"
            name="name"
            className={errors.name ? 'border-destructive' : ''}
          />
          <ErrorMessage name="name" component="p" className="text-sm text-destructive" />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Field
            as={Input}
            id="email"
            name="email"
            type="email"
            className={`pl-10 ${errors.email ? 'border-destructive' : ''}`}
          />
        </div>
        <ErrorMessage name="email" component="p" className="text-sm text-destructive" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Phone Number</Label>
        <div className="relative">
          <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Field
            as={Input}
            id="phone"
            name="phone"
            type="tel"
            className={`pl-10 ${errors.phone ? 'border-destructive' : ''}`}
          />
        </div>
        <ErrorMessage name="phone" component="p" className="text-sm text-destructive" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Field
            as={Input}
            id="password"
            name="password"
            type="password"
            className={errors.password ? 'border-destructive' : ''}
          />
          <ErrorMessage name="password" component="p" className="text-sm text-destructive" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Field
            as={Input}
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            className={errors.confirmPassword ? 'border-destructive' : ''}
          />
          <ErrorMessage name="confirmPassword" component="p" className="text-sm text-destructive" />
        </div>
      </div>
    </motion.div>
  );
};

export default React.memo(PersonalInfoStep)