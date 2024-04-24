import supabase from "./getSupabase";

const getBusiness = async (data) => {
  // schema에 맞게 가공된 데이터를 받아서 db에 insert
  try {
    const { error } = await supabase.from("BUSINESS_SAMPLE").insert(data);

    if (error) throw error;
    console.log("Data saved to Supabase!");
  } catch (error) {
    console.error("Error fetching or storing data:", error);
  }
};

export default getBusiness;
