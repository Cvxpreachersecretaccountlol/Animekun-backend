import { fetchAndSaveData } from "./fetchAndSaveData.js";

let date = "Not updated yet";

// Function to format date in "Month Day, Year. HH:MM AM/PM" format in IST
const formatDate = date => {
    const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
        timeZone: "Asia/Kolkata" // Set to IST
    };
    return new Intl.DateTimeFormat("en-US", options).format(new Date(date));
};


const updateData = async () => {
    try {
        await fetchAndSaveData();
        date = formatDate(new Date());
    } catch (error) {
        console.error("Error fetching and saving data:", error);
    }
};


export { date, updateData };