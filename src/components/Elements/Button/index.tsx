import clsx from 'clsx';
import { ButtonHTMLAttributes, useState } from 'react';
import styles from './styles.module.scss';

export { styles as buttonStyles };

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  submittingClassName?: string;
};
export const PrimaryButton = ({ className, ...props }: ButtonProps) => (
  <SubmitButton className={clsx(className, styles.primary)} {...props} />
);

export const SecondaryButton = ({ className, ...props }: ButtonProps) => (
  <SubmitButton className={clsx(className, styles.secondary)} {...props} />
);

export const SubmitButton = ({
  className,
  submittingClassName,
  onClick,
  disabled,
  ...props
}: ButtonProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  return (
    <button
      {...props}
      className={clsx(
        className,
        isSubmitting && clsx(submittingClassName, styles.submitting),
      )}
      onClick={async (e) => {
        setIsSubmitting(true);
        await onClick?.(e);
        setIsSubmitting(false);
      }}
      disabled={isSubmitting || disabled}
    />
  );
};
