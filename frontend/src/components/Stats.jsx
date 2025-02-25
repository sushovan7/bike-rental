import { statsData } from "../data/Landing";

function Stats() {
  return (
    <section className="flex mb-20 px-4 items-center justify-around gap-3 py-16 ">
      {statsData &&
        statsData.length > 0 &&
        statsData.map((stat, index) => {
          return (
            <div
              key={index}
              className="flex flex-col items-center justify-center"
            >
              <p className="text-lg md:text-3xl  text-[#605DFF] font-bold text-center">
                {stat.value}
              </p>
              <p className=" text-sm  md:text-lg text-center">{stat.label}</p>
            </div>
          );
        })}
    </section>
  );
}

export default Stats;
