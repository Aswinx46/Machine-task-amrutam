import { motion } from 'framer-motion';
import { DoctorSignupForm } from '../component/forms/SignupFormDoctor'
import type { DoctorSignupFormType } from '../interfaces/DoctorSignupEntity';
import { Stethoscope, Heart, Shield, Users } from 'lucide-react';

const DoctorSignup = () => {
    const handleFormSubmit = (data: DoctorSignupFormType) => {
        console.log('Doctor signup data:', data);
        // Here you would typically send the data to your backend
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: {
            opacity: 0,
            y: 30,
            scale: 0.9
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

    const floatingIcons = [
        { Icon: Stethoscope, delay: 0, x: 100, y: 200 },
        { Icon: Heart, delay: 1, x: -80, y: 150 },
        { Icon: Shield, delay: 2, x: 120, y: 400 },
        { Icon: Users, delay: 0.5, x: -100, y: 350 }
    ];

    return (
        <div className="min-h-screen bg-gradient-soft relative overflow-hidden">
            {/* Floating Background Icons */}
            {floatingIcons.map(({ Icon, delay, x, y }, index) => (
                <motion.div
                    key={index}
                    className="absolute opacity-5 text-primary pointer-events-none hidden lg:block"
                    style={{ left: `${50 + x}px`, top: `${50 + y}px` }}
                    animate={{
                        y: [0, -20, 0],
                        rotate: [0, 5, 0],
                        scale: [1, 1.1, 1]
                    }}
                    transition={{
                        duration: 4,
                        delay,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                >
                    <Icon size={64} />
                </motion.div>
            ))}

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="container mx-auto px-4 py-12"
            >
                {/* Header Section */}
                <motion.div variants={itemVariants} className="text-center mb-12">
                    <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{
                            type: "spring" as const,
                            stiffness: 200,
                            damping: 15,
                            delay: 0.2
                        }}
                        className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-black mb-6 shadow-strong"
                    >
                        <Stethoscope className="h-10 w-10 text-primary-foreground" />
                    </motion.div>

                    <motion.h1
                        className="text-4xl md:text-5xl font-bold bg-gradient-primary text-black bg-clip-text  mb-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                    >
                        Join Our Medical Network
                    </motion.h1>

                    <motion.p
                        className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7, duration: 0.8 }}
                    >
                        Register as a certified Ayurvedic doctor and start helping patients achieve better health through traditional medicine.
                    </motion.p>
                </motion.div>

                {/* Benefits Cards */}
                <motion.div
                    variants={itemVariants}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
                >
                    {[
                        {
                            icon: Heart,
                            title: "Help Heal",
                            description: "Make a meaningful impact on patients' lives through Ayurvedic medicine"
                        },
                        {
                            icon: Shield,
                            title: "Trusted Platform",
                            description: "Join a verified network of healthcare professionals"
                        },
                        {
                            icon: Users,
                            title: "Grow Practice",
                            description: "Expand your reach and connect with more patients online"
                        }
                    ].map((benefit, index) => (
                        <motion.div
                            key={benefit.title}
                            whileHover={{
                                scale: 1.05,
                                y: -5,
                                transition: { type: "spring" as const, stiffness: 300 }
                            }}
                            className="bg-card/60 backdrop-blur-sm rounded-xl p-6 border border-border/50 shadow-soft hover:shadow-medium transition-all duration-300"
                        >
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{
                                    delay: 0.8 + (index * 0.1),
                                    type: "spring" as const,
                                    stiffness: 300
                                }}
                                className="w-12 h-12 rounded-lg bg-gradient-accent flex items-center justify-center mb-4"
                            >
                                <benefit.icon className="h-6 w-6 text-accent-foreground" />
                            </motion.div>
                            <h3 className="font-semibold text-lg mb-2">{benefit.title}</h3>
                            <p className="text-muted-foreground text-sm">{benefit.description}</p>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Main Form */}
                <motion.div variants={itemVariants}>
                    <DoctorSignupForm onSubmit={handleFormSubmit} />
                </motion.div>

                {/* Footer */}
                <motion.div
                    variants={itemVariants}
                    className="text-center mt-12 text-sm text-muted-foreground"
                >
                    <p>
                        By registering, you agree to our terms of service and privacy policy.
                        Your application will be reviewed within 24-48 hours.
                    </p>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default DoctorSignup;