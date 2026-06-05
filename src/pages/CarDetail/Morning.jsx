import CarDetailPage from "./CarDetailPage";

const MorningContent = () => {
  return (
    <>
      <div className="mt-20 max-w-6xl mx-auto ">
        <img
          src="/Morning/morning.jpg"
          alt="soluto"
          className="mx-auto mt-8 rounded-lg shadow-lg"
        />
      </div>
    </>
  );
};

const Morning = () => (
  <CarDetailPage carKey="morning" displayName="KIA MORNING">
    <MorningContent />
  </CarDetailPage>
);

export default Morning;
