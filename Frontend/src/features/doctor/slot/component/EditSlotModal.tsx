import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { X, Clock, DollarSign, Calendar, Monitor } from 'lucide-react';
import type { IavailabilityTime, SlotFormValues } from '@/types/appointment/appointment';
import { Button } from '@/components/ui/button';

interface SlotEditModalProps {
    isOpen: boolean;
    onClose: () => void;
    slot: IavailabilityTime | null;
    onSave: (values: SlotFormValues) => void;
}

export const SlotEditModal: React.FC<SlotEditModalProps> = ({
    isOpen,
    onClose,
    slot,
    onSave,
}) => {
    if (!slot) return null;

    const formatTimeForInput = (date: Date) => {
        return new Date(date).toTimeString().slice(0, 5);
    };

    const initialValues: SlotFormValues = {
        startTime: formatTimeForInput(slot.startTime),
        endTime: formatTimeForInput(slot.endTime),
        consultationDuration: slot.consultationDuration.toString(),
        price: slot.price,
        mode: slot.mode,
        status: slot.status,
    };

    const validate = (values: SlotFormValues) => {
        const errors: Partial<SlotFormValues> = {};

        // Price validation
        if (!values.price) {
            errors.price = 'Price is required';
        } else if (parseFloat(values.price) < 0) {
            errors.price = 'Price cannot be less than 0';
        }

        // Time validation
        if (!values.startTime) {
            errors.startTime = 'Start time is required';
        }
        if (!values.endTime) {
            errors.endTime = 'End time is required';
        }

        if (values.startTime && values.endTime) {
            const start = new Date(`2000-01-01T${values.startTime}`);
            const end = new Date(`2000-01-01T${values.endTime}`);

            if (start >= end) {
                errors.endTime = 'End time must be after start time';
            }
        }

        // Duration validation
        if (!values.consultationDuration || Number(values.consultationDuration) <= 0) {
            errors.consultationDuration = 'Duration must be greater than 0';
        }

        return errors;
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.95, opacity: 0 }}
                        transition={{ type: "spring", duration: 0.3 }}
                        className="bg-card rounded-xl shadow-strong w-full max-w-md"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-semibold text-card-foreground flex items-center gap-2">
                                    <Calendar className="w-5 h-5 text-primary" />
                                    Edit Slot
                                </h2>
                                <button
                                    onClick={onClose}
                                    className="p-2 hover:bg-muted rounded-lg transition-colors"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>

                            <Formik
                                initialValues={initialValues}
                                validate={validate}
                                onSubmit={(values) => {
                                    onSave(values);
                                    onClose();
                                }}
                            >
                                {({ isSubmitting, errors, touched }) => (
                                    <Form className="space-y-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <motion.div
                                                initial={{ x: -20, opacity: 0 }}
                                                animate={{ x: 0, opacity: 1 }}
                                                transition={{ delay: 0.1 }}
                                            >
                                                <label className="text-sm font-medium text-card-foreground mb-2 flex items-center gap-2">
                                                    <Clock className="w-4 h-4 text-primary" />
                                                    Start Time
                                                </label>
                                                <Field
                                                    name="startTime"
                                                    type="time"
                                                    className={`medical-input w-full ${errors.startTime && touched.startTime
                                                        ? 'border-destructive focus:ring-destructive'
                                                        : ''
                                                        }`}
                                                />
                                                <ErrorMessage
                                                    name="startTime"
                                                    component="div"
                                                    className="text-destructive text-xs mt-1"
                                                />
                                            </motion.div>

                                            <motion.div
                                                initial={{ x: 20, opacity: 0 }}
                                                animate={{ x: 0, opacity: 1 }}
                                                transition={{ delay: 0.2 }}
                                            >
                                                <label className="text-sm font-medium text-card-foreground mb-2 flex items-center gap-2">
                                                    <Clock className="w-4 h-4 text-primary" />
                                                    End Time
                                                </label>
                                                <Field
                                                    name="endTime"
                                                    type="time"
                                                    className={`medical-input w-full ${errors.endTime && touched.endTime
                                                        ? 'border-destructive focus:ring-destructive'
                                                        : ''
                                                        }`}
                                                />
                                                <ErrorMessage
                                                    name="endTime"
                                                    component="div"
                                                    className="text-destructive text-xs mt-1"
                                                />
                                            </motion.div>
                                        </div>

                                        <motion.div
                                            initial={{ y: 20, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{ delay: 0.3 }}
                                        >
                                            <label className="text-sm font-medium text-card-foreground mb-2 flex items-center gap-2">
                                                <DollarSign className="w-4 h-4 text-primary" />
                                                Price
                                            </label>
                                            <Field
                                                name="price"
                                                type="number"
                                                step="0.01"
                                                min="0"
                                                className={`border-4 rounded-2xl border-gray-300 medical-input w-full ${errors.price && touched.price
                                                    ? 'border-destructive focus:ring-destructive'
                                                    : ''
                                                    }`}
                                            />
                                            <ErrorMessage
                                                name="price"
                                                component="div"
                                                className="text-destructive text-xs mt-1"
                                            />
                                        </motion.div>

                                        <motion.div
                                            initial={{ y: 20, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{ delay: 0.4 }}
                                        >
                                            <label className="text-sm font-medium text-card-foreground mb-2 flex items-center gap-2">
                                                <Clock className="w-4 h-4 text-primary" />
                                                Duration (minutes)
                                            </label>
                                            <Field
                                                name="consultationDuration"
                                                type="number"
                                                min="1"
                                                className={`border-4 rounded-2xl border-gray-300 medical-input w-full ${errors.consultationDuration && touched.consultationDuration
                                                    ? 'border-destructive focus:ring-destructive'
                                                    : ''
                                                    }`}
                                            />
                                            <ErrorMessage
                                                name="consultationDuration"
                                                component="div"
                                                className="text-destructive text-xs mt-1"
                                            />
                                        </motion.div>

                                        <motion.div
                                            initial={{ y: 20, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{ delay: 0.5 }}
                                        >
                                            <label className="text-sm font-medium text-card-foreground mb-2 flex items-center gap-2">
                                                <Monitor className="w-4 h-4 text-primary" />
                                                Mode
                                            </label>
                                            <Field
                                                as="select"
                                                name="mode"
                                                className="medical-input w-full border-4 rounded-2xl border-gray-300"
                                            >
                                                <option value="online">
                                                    🌐 Online
                                                </option>
                                                <option value="in-person">
                                                    🏥 In-Person
                                                </option>
                                            </Field>
                                        </motion.div>

                                        <motion.div
                                            initial={{ y: 20, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{ delay: 0.6 }}
                                        >
                                            <label className="block text-sm font-medium text-card-foreground mb-2">
                                                Status
                                            </label>
                                            <Field
                                                as="select"
                                                name="status"
                                                className="medical-input w-full border-4 rounded-2xl border-gray-300"
                                            >
                                                <option value="active">✅ Active</option>
                                                <option value="inactive">⏸️ Inactive</option>
                                                <option value="expired">❌ Expired</option>
                                            </Field>
                                        </motion.div>

                                        <motion.div
                                            initial={{ y: 20, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{ delay: 0.7 }}
                                            className="flex gap-3 pt-4"
                                        >
                                            <Button
                                                type="button"
                                                onClick={onClose}
                                                className="medical-button-outline flex-1"
                                                disabled={isSubmitting}
                                            >
                                                Cancel
                                            </Button>
                                            <Button
                                                type="submit"
                                                className="medical-button-primary flex-1"
                                                disabled={isSubmitting}
                                            >
                                                {isSubmitting ? 'Saving...' : 'Save Changes'}
                                            </Button>
                                        </motion.div>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};