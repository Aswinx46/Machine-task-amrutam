import React from 'react';
import { motion } from 'framer-motion';
import { User, Stethoscope, MapPin, FileText } from 'lucide-react';

interface FormProgressProps {
  currentStep: number;
  totalSteps: number;
}

export const FormProgress: React.FC<FormProgressProps> = ({ currentStep }) => {
  const steps = [
    { title: 'Personal Info', icon: User },
    { title: 'Professional Details', icon: Stethoscope },
    { title: 'Practice Information', icon: MapPin },
    { title: 'Documents & Review', icon: FileText }
  ];

  return (
    <div className="flex justify-between items-center mb-8">
      {steps.map((step, index) => {
        const StepIcon = step.icon;
        const isActive = currentStep === index + 1;
        const isCompleted = currentStep > index + 1;
        
        return (
          <div key={step.title} className="flex items-center">
            <motion.div
              className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300 ${
                isActive
                  ? 'border-primary bg-primary text-primary-foreground shadow-medium'
                  : isCompleted
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-muted-foreground bg-background text-muted-foreground'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <StepIcon className="h-5 w-5" />
            </motion.div>
            <div className="ml-3 hidden md:block">
              <p className={`text-sm font-medium ${isActive ? 'text-primary' : 'text-muted-foreground'}`}>
                {step.title}
              </p>
            </div>
            {index < steps.length - 1 && (
              <div className={`ml-6 mr-6 h-0.5 w-16 ${isCompleted ? 'bg-primary' : 'bg-muted'} transition-colors duration-300`} />
            )}
          </div>
        );
      })}
    </div>
  );
};