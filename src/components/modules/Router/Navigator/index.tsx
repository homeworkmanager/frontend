import { NavigateFunction, NavigateOptions, useNavigate } from 'react-router-dom';

export type HistoryType = {
  navigate: null | NavigateFunction;
  to: (page: string, ...rest: NavigateOptions[] | undefined[]) => void;
};

const routerNavigator: HistoryType = {
  navigate: null,
  to: (page, ...rest) => {
    if (routerNavigator.navigate) {
      routerNavigator.navigate(page, ...rest);
      return;
    }

    window.location.replace(page);
  }
};

const NavigationInitializer = () => {
  routerNavigator.navigate = useNavigate();

  return null;
};

export { routerNavigator, NavigationInitializer };
