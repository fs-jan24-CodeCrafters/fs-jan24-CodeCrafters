import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { Title } from '../../Shared/Title';
import { useTranslation } from 'react-i18next';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegistrationSchema } from '../../../schemas';
import { createUser } from '../../../api/user';
import { useState } from 'react';
import toast from 'react-hot-toast';

import styles from '../AuthScreen.module.scss';
export const RegisterForm: React.FC = () => {
  const [apiErrors, setApiErrors] = useState<Record<string, string>>({});

  const { t } = useTranslation();

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
    } catch (error) {
      if (Array.isArray(error)) {
        const validationErrors: Record<string, string> = {};
        error.forEach((err: { path: string[]; message: string }) => {
          if (err.path.length) {
            validationErrors[err.path[0]] = err.message;
          }
        });
        setApiErrors(validationErrors);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Title titleTag="h2">{t('common:auth.createAccount')}</Title>
      <div className={styles.socialIcons}>
        <a href="#" className="icon">
          <FontAwesomeIcon icon={faGithub} />
        </a>
        <a href="#" className="icon">
          <FontAwesomeIcon icon={faLinkedinIn} />
        </a>
      </div>
      <span>or use your email for registeration</span>
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
        Sign Up
      </button>
    </form>
  );
};
