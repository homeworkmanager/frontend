import { Component, ReactNode } from 'react';

import styles from './ErrorBoundary.module.css';
import { UniHelperLogo } from '@/components/ui/Icons/UniHelper';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return { hasError: true, error };
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className={styles['error-container']}>
          <UniHelperLogo className={styles.logo} />
          <h2 className={styles.title}>Ошибка загрузки страницы</h2>
          <p className={styles.message}>
            Наши специалисты уже решают проблему. Попробуйте обновить страницу чуть позже.
          </p>

          {process.env.NODE_ENV === 'development' && this.state.error && (
            <pre className={styles.devError}>{this.state.error.message}</pre>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}
