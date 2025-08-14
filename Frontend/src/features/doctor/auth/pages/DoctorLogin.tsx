import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Stethoscope } from 'lucide-react';
import DoctorLoginForm from '../component/forms/LoginForm';
import { useDoctorLogin } from '../hooks/doctorAuthenticationHooks';
import { toast } from 'sonner';
import { useDispatch } from 'react-redux';
import { addDoctor } from '@/reduxstrore/slices/doctorSlice';
import { addToken } from '@/reduxstrore/slices/tokenSlice';
import { useNavigate } from 'react-router-dom';

const DoctorLogin = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const doctorLoginMutation = useDoctorLogin()
  const handleSubmit = async (values: { email: string, password: string }) => {
    doctorLoginMutation.mutate({ email: values.email, password: values.password }, {
      onSuccess: (data) => {
        toast(`Welcome Back ${data.doctor.name}`)
        dispatch(addDoctor(data.doctor))
        dispatch(addToken(data.accessToken))
        localStorage.setItem('role', data.doctor.role)
        navigate('/doctor/home', { replace: true })
      },
      onError: (err) => {
        console.log('error while handling the login of the doctor', err)
        toast(err.message)
      }
    })
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  const pulseAnimation = {
    scale: [1, 1.05, 1],
    transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' as const },
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-medical-gray to-background p-4">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-md"
      >
        <Card className="border-0 shadow-[var(--shadow-medical)] bg-card/80 backdrop-blur-sm">
          <CardHeader className="text-center">
            <motion.div
              animate={pulseAnimation}
              className="mx-auto mb-4 w-16 h-16 bg-black from-medical-blue to-medical-teal rounded-full flex items-center justify-center"
            >
              <Stethoscope className="w-8 h-8 text-white" />
            </motion.div>
            <motion.div variants={itemVariants}>
              <CardTitle className="text-2xl font-bold text-medical-dark">
                Doctor Portal
              </CardTitle>
              <CardDescription className="text-muted-foreground mt-2">
                Sign in to access your medical dashboard
              </CardDescription>
            </motion.div>
          </CardHeader>

          <CardContent>
            <DoctorLoginForm handleLogin={handleSubmit} />
          </CardContent>
        </Card>

        <motion.div variants={itemVariants} className="text-center mt-6 text-sm text-muted-foreground">
          Need access? Contact your{' '}
          <span className="text-medical-blue font-medium">system administrator</span>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default DoctorLogin;
