import { useState } from 'react';
import { FieldError, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { Title } from '../../Shared/Title';
import { useSession } from '../../../context/SessionContext';

import { LoginSchema } from '../../../schemas';

import styles from '../AuthScreen.module.scss';

const getPasswordError = (error: string | FieldError) => {
  if (error === 'Invalid credentials') {
    return 'common:auth.invalidCredentials';
  } else {
    return 'common:auth.passwordRequired';
  }
};

export const LoginForm: React.FC = () => {
  const { t } = useTranslation();
  const [apiErrors, setApiErrors] = useState<Record<string, string>>({});

  const { login } = useSession();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof LoginSchema>) => {
    setApiErrors({});
    try {
      await login(data);
      reset();
      toast.success(t('common:auth.successLogin'));
      navigate('/');
    } catch (error) {
      const validationErrors: Record<string, string> = {};
      if (Array.isArray(error)) {
        error.forEach((err: { path: string[]; message: string }) => {
          if (err.path.length) {
            validationErrors[err.path[0]] = err.message;
          }
        });
        setApiErrors(validationErrors);
      } else {
        const singleError = error as string;
        setApiErrors({ password: singleError });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Title titleTag="h2">{t('common:auth.signIn')}</Title>
      <div className={styles.socialIcons}>
        <a href="#" className="icon">
          <FontAwesomeIcon icon={faGithub} />
        </a>
        <a href="#" className="icon">
          <FontAwesomeIcon icon={faLinkedinIn} />
        </a>
      </div>
      <span className={styles.authDesc}>{t('common:auth.loginDesc')}</span>
      <input
        {...register('email')}
        className={styles.morph_input}
        disabled={isSubmitting}
        placeholder="Email"
      />
      {(errors.email || apiErrors.email) && (
        <span className={styles.error}>{t('common:auth.emailRequired')}</span>
      )}
      <input
        type="password"
        {...register('password')}
        className={styles.morph_input}
        placeholder="Password"
        disabled={isSubmitting}
      />
      {(errors.password || apiErrors.password) && (
        <span className={styles.error}>
          {t(getPasswordError(errors.password || apiErrors.password))}
        </span>
      )}
      <button disabled={isSubmitting} className={styles.morph_button}>
        {t('common:auth.login')}
      </button>
    </form>
  );
};
