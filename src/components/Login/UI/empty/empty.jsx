import imageEmpty from "../../../../images/assets/Group 9.png";
const Empty = () => {
  return (
    <div className="flex flex-col pt-10 items-center">
      <div className="mx-0 my-auto">
        <img src={imageEmpty} alt={imageEmpty} className="text-center" />
      </div>
      <div className="mt-4 p-2 font-bold">Ooops</div>
      <div>There is no question here yet</div>
    </div>
  );
};

export default Empty;
