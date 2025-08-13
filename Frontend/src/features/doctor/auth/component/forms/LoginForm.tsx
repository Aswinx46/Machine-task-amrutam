import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { motion } from 'framer-motion';



// Validation schema using Yup
const validationSchema = Yup.object({
    email: Yup.string()
        .email('Please enter a valid email address')
        .required('Email is required'),
        password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
        .matches(/\d/, 'Password must contain at least one number')
});

interface DoctorLoginFormPropType {
    handleLogin: (values: { email: string, password: string }) => void
}

const DoctorLoginForm: React.FC<DoctorLoginFormPropType> = ({ handleLogin }) => {
    const [showPassword, setShowPassword] = useState(false);
    const handleSubmit = async (values: { email: string, password: string }) => {
        handleLogin(values)
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    };

    return (
        <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ isSubmitting }) => (
                <Form className="space-y-6">
                    {/* Email Field */}
                    <motion.div variants={itemVariants} className="space-y-2">
                        <Label htmlFor="email" className="text-medical-dark font-medium">
                            Email Address
                        </Label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                            <Field
                                as={Input}
                                id="email"
                                name="email"
                                type="email"
                                placeholder="doctor@hospital.com"
                                className="pl-10 bg-input border-border focus:border-medical-blue focus:ring-medical-blue"
                            />
                        </div>
                        <ErrorMessage
                            name="email"
                            component="div"
                            className="text-destructive text-sm"
                        />
                    </motion.div>

                    {/* Password Field */}
                    <motion.div variants={itemVariants} className="space-y-2">
                        <Label htmlFor="password" className="text-medical-dark font-medium">
                            Password
                        </Label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                            <Field
                                as={Input}
                                id="password"
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Enter your password"
                                className="pl-10 pr-10 bg-input border-border focus:border-medical-blue focus:ring-medical-blue"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-medical-blue"
                            >
                                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                        </div>
                        <ErrorMessage
                            name="password"
                            component="div"
                            className="text-destructive text-sm"
                        />
                    </motion.div>

                    {/* Submit Button */}
                    <motion.div variants={itemVariants}>
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full  text-white"
                        >
                            {isSubmitting ? (
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                                />
                            ) : (
                                'Sign In'
                            )}
                        </Button>
                    </motion.div>

                    {/* Forgot Password Link */}
                    <motion.div variants={itemVariants} className="text-center">
                        <a href="#" className="text-medical-blue text-sm font-medium">
                            Forgot your password?
                        </a>
                    </motion.div>
                </Form>
            )}
        </Formik>
    );
};

export default DoctorLoginForm;
