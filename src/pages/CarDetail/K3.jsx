import CarDetailPage from "./CarDetailPage";

const K3Content = () => {
  return (
    <>
      <div className="mt-20 max-w-8xl mx-auto ">
        <img
          src="/K3/k3.jpg"
          alt="K3"
          className="mx-auto mt-8 rounded-lg shadow-lg"
        />
      </div>
    </>
  );
};

const K3 = () => (
  <CarDetailPage carKey="k3" displayName="KIA K3">
    <K3Content />
  </CarDetailPage>
);

export default K3;
