"use server";

import Feedback from "@/components/sections/feedback";
import { insertIn } from "@/utils/data/data-cruds";
import { Roles } from "@/utils/types/roles";

export const addFeedback = async (formData: FormData) => {
    return "this feature can not be used at the moment";
    
    const feedback: Feedback = {
        username: formData.get("name") as string,
        email: formData.get("email") as string,
        message: formData.get("message") as string,
        rating: formData.get("rating") as string || "5",
    };

    // TODO: Implement feedback submission logic
    const { data } = await insertIn("feedback", feedback, "*", Roles.anone);
    console.log("Feedback added:", data);
}