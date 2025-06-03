import ThemeProvider from "./theme-provider";

const MainProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider>
        {children}
    </ThemeProvider>
  );
}

export default MainProvider;