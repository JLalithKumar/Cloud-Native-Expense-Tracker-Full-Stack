const Skeleton = ({ height = 20, width = "100%" }) => {
  return (
    <div
      style={{
        height,
        width,
        borderRadius: "10px",
        background:
          "linear-gradient(90deg, #e5e7eb 25%, #f3f4f6 37%, #e5e7eb 63%)",
        backgroundSize: "400% 100%",
        animation: "skeleton-loading 1.4s ease infinite",
      }}
    />
  );
};

export default Skeleton;
