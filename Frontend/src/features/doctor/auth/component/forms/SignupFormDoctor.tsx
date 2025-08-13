/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { UserPlus } from 'lucide-react';
import type { DoctorSignupFormType } from '../../interfaces/DoctorSignupEntity';
import { FormProgress } from './FormProgress';
import PersonalInfoStep from './steps/PersonalInfoStep';
import ProfessionalDetailsStep from './steps/ProfessionalDetailsStep';
import PracticeInfoStep from './steps/PracticeInfoStep';
import DocumentsReviewStep from './steps/DocumentReviewStep';
import { toast } from 'sonner'
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.95
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 300,
      damping: 24
    }
  }
};

interface DoctorSignupFormProps {
  onSubmit: (data: DoctorSignupFormType) => void;
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'Password must include uppercase, lowercase, number, and special character'
    ),

  phone: Yup.string()
    .required('Phone number is required')
    .matches(/^[6-9]\d{9}$/, 'Phone number must start with 6-9 and be 10 digits long'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required'),
  bio: Yup.string().required('Bio is required'),
  specialization: Yup.array().min(1, 'Please select at least one specialization').required(),
  qualification: Yup.array().min(1, 'Please select at least one qualification').required(),
  experienceYears: Yup.number().min(0, 'Experience years must be positive').required(),
  clinicName: Yup.string().required('Clinic name is required'),
  address: Yup.string().required('Address is required'),
  mode: Yup.string().required('Consultation mode is required'),
  languages: Yup.array().min(1, 'Please specify at least one language').required()
});

export const DoctorSignupForm: React.FC<DoctorSignupFormProps> = ({ onSubmit }) => {
  const [currentStep, setCurrentStep] = useState(1);

  const initialValues: DoctorSignupFormType = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    bio: '',
    specialization: [],
    mode: 'online',
    experienceYears: 0,
    qualification: [],
    clinicName: '',
    address: '',
    languages: [],

  };

  const steps = [
    { title: 'Personal Info', fields: ['name', 'email', 'phone', 'password', 'confirmPassword'] },
    { title: 'Professional Details', fields: ['bio', 'specialization', 'qualification', 'experienceYears'] },
    { title: 'Practice Information', fields: ['clinicName', 'address', 'mode', 'languages'] },
    { title: 'Documents & Review', fields: ['profileImage', 'documents'] }
  ];

  const validateStep = async (values: DoctorSignupFormType, step: number) => {
    const stepFields = steps[step - 1].fields;
    try {
      await Promise.all(
        stepFields.map(field =>
          validationSchema.validateAt(field, values)
        )
      );
      return true;
    } catch (error) {
      toast(error instanceof Error ? error.message : 'Please enter all field')
      return false;
    }
  };

  const handleNext = async (values: DoctorSignupFormType) => {
    const isValid = await validateStep(values, currentStep);
    if (isValid) {
      setCurrentStep(prev => Math.min(prev + 1, steps.length));
    }
  };

  const handlePrev = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = (values: DoctorSignupFormType) => {
    onSubmit(values);
    toast('Your doctor account application has been submitted for review');
  };

  const renderStep = (values: DoctorSignupFormType, errors: any, setFieldValue: any) => {
    switch (currentStep) {
      case 1:
        return <PersonalInfoStep values={values} errors={errors} setFieldValue={setFieldValue} />;
      case 2:
        return <ProfessionalDetailsStep values={values} errors={errors} setFieldValue={setFieldValue} />;
      case 3:
        return <PracticeInfoStep values={values} errors={errors} setFieldValue={setFieldValue} />;
      case 4:
        return <DocumentsReviewStep values={values} />;
      default:
        return null;
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, errors, setFieldValue }) => (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto space-y-8"
        >
          <motion.div variants={itemVariants}>
            <FormProgress currentStep={currentStep} totalSteps={steps.length} />
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="shadow-medium border-0 bg-card/50 backdrop-blur-sm">
              <CardHeader className="text-center pb-6">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring" as const, stiffness: 300, delay: 0.5 }}
                >
                  <UserPlus className="mx-auto h-8 w-8 text-primary mb-2" />
                </motion.div>
                <CardTitle className="text-2xl bg-gradient-primary bg-clip-text text-transparent">
                  Doctor Registration - Step {currentStep}
                </CardTitle>
                <CardDescription>
                  {steps[currentStep - 1].title}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AnimatePresence mode="wait">
                  {renderStep(values, errors, setFieldValue)}
                </AnimatePresence>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants} className="flex justify-between pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={handlePrev}
              disabled={currentStep === 1}
              className="hover:shadow-soft transition-all duration-300"
            >
              Previous
            </Button>

            {currentStep < steps.length ? (
              <Button
                type="button"
                onClick={() => handleNext(values)}
                className=" hover:shadow-medium transition-all duration-300"
              >
                Next Step
              </Button>
            ) : (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Form>
                  <Button
                    type="submit"
                    className=" hover:shadow-strong transition-all duration-300"
                  >
                    Submit Application
                  </Button>
                </Form>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </Formik>
  );
};