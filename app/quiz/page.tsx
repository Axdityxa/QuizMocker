import Quiz from "@/components/Quiz";
import {client} from "@/sanity/lib/client"
import { fetchUsers } from "../(auth)/actions/fetchUsers";

export const dynamic = "force-dynamic"

async function getData() {
    const query = `*[_type == "questions"]{
        question,
        answers,
        correctAnswer
    }`;

    const data = await client.fetch(query);

    return data;
}

const page = async () => {
  let questions = [];
  let user;

  try {
    questions = await getData();
    user = await fetchUsers();
  } catch (error) {
    console.error("Error fetching data: ", error);
  }

  const userId = user?.data?.user?.id || ""; // Make sure userId is properly handled
  return (
    <>
      <Quiz questions={questions} userId={userId} />
    </>
  );
};

export default page;