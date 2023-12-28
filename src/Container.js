const Container = ({ children }) => {
  return (
    <div
      style={{
        margin: 20,
        padding: 20,
        border: "1px solid gray",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {children}
    </div>
  );
};

export default Container;
