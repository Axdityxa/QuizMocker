import { prisma } from "@/lib/prisma";
import Image from "next/image";
import { FaMedal} from "react-icons/fa";

const page = async () => {
  const users = await prisma.user.findMany({
    include: { quizResults: true },
  });

  users.sort(
    (a, b) =>
      b.quizResults.reduce(
        (acc, curr) => acc + curr.quizScore,
        0
      ) -
      a.quizResults.reduce(
        (acc, curr) => acc + curr.quizScore,
        0
      )
  );
  return (
    <div className=" absolute top-12 left-1/2 transform -translate-x-1/2 max-w-[1000px] mx-auto w-[90%] py-10 
     "style={{ top: '100px' }}>
      <h1 className="font-bold mb-4 text-center text-2xl uppercase">
        Leaderboards 🏆
      </h1>
      <ol>
        {users.map((user, index) => (
          <li
            key={user.id}
            className={`py-4 ${
              index < 3 ? "font-bold" : ""
            }`}
          >
            <div className="flex items-center gap-5 w-full">
              <div className="flex sm:flex-row flex-col gap-1 justify-between w-full items-center">
                <div className="flex gap-3 items-center">
                  <span className="text-xl mb-1">
                    {index + 1}
                  </span>
                  <Image
                    src={user.profilePic}
                    width={30}
                    height={30}
                    alt={`Image of ${user.username}`}
                    className="rounded-full"
                  />
                  <span className="text-xl">
                    {user.username}
                  </span>
                  {index === 0 && (
                    <FaMedal className="inline-block w-6 h-6 text-yellow-500 mb-1" />
                  )}
                  {index === 1 && (
                    <FaMedal className="inline-block w-6 h-6 text-gray-400 mb-1" />
                  )}
                  {index === 2 && (
                    <FaMedal className="inline-block w-6 h-6 text-amber-700 mb-1" />
                  )}
                </div>
                <span>
                  Total Quiz Score:{" "}
                  {user.quizResults.reduce(
                    (acc, curr) => acc + curr.quizScore,
                    0
                  )}
                </span>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default page;