import CarDetailPage from "./CarDetailPage";

const SolutoContent = () => {
  return (
    <>
      <div className="mt-20 max-w-8xl mx-auto ">
        <img
          src="/Soluto/soluto.jpg"
          alt="soluto"
          className="mx-auto mt-8 rounded-lg shadow-lg"
        />
      </div>
    </>
  );
};

const Soluto = () => (
  <CarDetailPage carKey="soluto" displayName="KIA SOLUTO">
    <SolutoContent />
  </CarDetailPage>
);

export default Soluto;
