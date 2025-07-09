interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <div className='bg-foreground flex h-screen w-screen flex-col'>
      {children}
    </div>
  );
};
export default Layout;
