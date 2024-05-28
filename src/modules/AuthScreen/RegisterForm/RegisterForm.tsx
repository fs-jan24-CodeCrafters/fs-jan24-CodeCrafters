import { useState } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import * as z from 'zod';
import { FieldError, useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { zodResolver } from '@hookform/resolvers/zod';

import { useSession } from '../../../context/SessionContext';
import { Title } from '../../Shared/Title';
import { RegistrationSchema } from '../../../schemas';
import { createUser } from '../../../api/user';

import styles from '../AuthScreen.module.scss';

const getEmailError = (error: string | FieldError) => {
  if (error === 'Email already exists') {
    return 'common:auth.emailAlreadyExists';
  } else {
    return 'common:auth.emailRequired';
  }
};

export const RegisterForm: React.FC = () => {
  const [apiErrors, setApiErrors] = useState<Record<string, string>>({});

  const { t } = useTranslation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof RegistrationSchema>>({
    resolver: zodResolver(RegistrationSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof RegistrationSchema>) => {
    setApiErrors({});
    try {
      await createUser(data);
      reset();
      toast.success(t('common:auth.successRegister'));
      navigate('/');
    } catch (error) {
      if (Array.isArray(error)) {
        const validationErrors: Record<string, string> = {};
        error.forEach((err: { path: string[]; message: string }) => {
          if (err.path.length) {
            validationErrors[err.path[0]] = err.message;
          }
        });
        setApiErrors(validationErrors);
      } else {
        const singleError = error as string;
        setApiErrors({ email: singleError });
      }
    }
  };

  const { googleLogin } = useSession();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Title titleTag="h2">{t('common:auth.createAccount')}</Title>
      <div className={styles.socialIcons}>
        <a href="#" className="icon">
          <FontAwesomeIcon icon={faGithub} />
        </a>
        <a href="#" className="icon" onClick={googleLogin}>
          <FontAwesomeIcon icon={faGoogle} />
        </a>
      </div>
      <span className={styles.authDesc}>{t('common:auth.signupDesc')}</span>
      <input
        {...register('email')}
        className={styles.morph_input}
        disabled={isSubmitting}
        placeholder="Email"
      />
      {(errors.email || apiErrors.email) && (
        <span className={styles.error}>
          {t(getEmailError(errors.email || apiErrors.email))}
        </span>
      )}
      <input
        disabled={isSubmitting}
        type="password"
        {...register('password')}
        className={styles.morph_input}
        placeholder="Password"
      />
      {(errors.password || apiErrors.password) && (
        <span className={styles.error}>{t('common:auth.passwordValid')}</span>
      )}
      <button disabled={isSubmitting} className={styles.morph_button}>
        {t('common:auth.signUp')}
      </button>
    </form>
  );
};
