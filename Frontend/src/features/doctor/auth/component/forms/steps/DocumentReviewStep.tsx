import React from 'react';
import { motion } from 'framer-motion';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {  Star } from 'lucide-react';
import type { DoctorSignupFormType } from '../../../interfaces/DoctorSignupEntity'

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

interface DocumentsReviewStepProps {
  values: DoctorSignupFormType;
}

 const DocumentsReviewStep: React.FC<DocumentsReviewStepProps> = ({ values }) => {
  return (
    <motion.div
      key="step4"
      variants={stepVariants}
      initial="enter"
      animate="center"
      exit="exit"
      className="space-y-6"
    >
      <div className="space-y-4">
        

        <Card className="bg-gradient-soft border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5 text-primary" />
              Review Your Information
            </CardTitle>
            <CardDescription>
              Please review your details before submitting your application
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-medium">Name:</p>
                <p>{values.name}</p>
              </div>
              <div>
                <p className="font-medium">Email:</p>
                <p>{values.email}</p>
              </div>
              <div>
                <p className="font-medium">Experience:</p>
                <p>{values.experienceYears} years</p>
              </div>
              <div>
                <p className="font-medium">Mode:</p>
                <p>{values.mode}</p>
              </div>
            </div>
            <div>
              <p className="font-medium mb-2">Specializations:</p>
              <div className="flex flex-wrap gap-2">
                {values.specialization.map((spec) => (
                  <Badge key={spec} variant="secondary">{spec}</Badge>
                ))}
              </div>
            </div>
            <div>
              <p className="font-medium mb-2">Qualifications:</p>
              <div className="flex flex-wrap gap-2">
                {values.qualification.map((qual) => (
                  <Badge key={qual} variant="outline">{qual}</Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
};

export default React.memo(DocumentsReviewStep)