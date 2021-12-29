import { AlertProvider } from "./alert/AlertContext";
import { GithubProvider } from "./github/GithubContext";

export * from './alert/AlertContext'
export * from './github/GithubContext'

const ContextProvider = ({ children }) => {
  return (
    <AlertProvider>
      <GithubProvider>{children}</GithubProvider>
    </AlertProvider>
  );
};

export default ContextProvider;
